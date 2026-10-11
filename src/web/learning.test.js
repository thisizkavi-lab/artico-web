import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import {
  emptyLearning,
  loadLearning,
  parseRoute,
  sanitizeLearning,
  toggleSaved,
  visit,
} from './learning.js'
import { getFoundationNavigation, getLearningStage, learningStages } from './pathway.js'

test('the learning path crosses stage boundaries without skipping a foundation or trapping the last lesson', () => {
  const steps = learningStages.flatMap((stage) => stage.lessonIds)
  assert.equal(new Set(steps).size, steps.length)
  assert.equal(getFoundationNavigation('orientation').previous, '/courses?orientation')
  assert.equal(getFoundationNavigation('how-it-works').next, '/foundation/letters/study')
  assert.equal(getFoundationNavigation('letters').previous, '/foundation/how-it-works/study')
  assert.equal(getFoundationNavigation('lr').next, '/lesson/01/study')
  steps.slice(0, -1).forEach((id, index) => {
    const next = getFoundationNavigation(id).next
    assert.equal(parseRoute(`#${next}`).id, steps[index + 1])
    assert.equal(parseRoute(`#${next}`).view, 'study')
  })
  assert.equal(getFoundationNavigation('not-a-lesson'), null)
})
test('new guests start at Orientation and returning guests keep their actual study or practice stage', () => {
  const cases = [
    [null, 'orientation'],
    ['/foundation/how-it-works/study', 'orientation'],
    ['/foundation/letters/study', 'foundation'],
    ['/foundation/lr/chunks', 'foundation'],
    ['/foundation/lr/whole', 'foundation'],
    ['/lesson/02/practice/friend', 'social'],
    ['/lesson/96/study', 'social'],
  ]
  cases.forEach(([path, stage]) => {
    assert.equal((getLearningStage(path) ?? learningStages[0]).id, stage)
  })
  assert.equal(parseRoute(`#${learningStages[0].start}`).id, 'orientation')
})

test('guest progress survives a storage round trip with the selected phrase and reading position', () => {
  const learning = {
    ...emptyLearning,
    last: '/lesson/02/practice/friend',
    lastPractice: '/lesson/02/practice/friend',
    indices: { friend: 1 },
    positions: { '/lesson/96/study': 780 },
    saved: ['friend-1'],
    mode: 'repeat',
    speed: 0.9,
    soundSpeed: 1,
  }
  assert.deepEqual(loadLearning({ getItem: () => JSON.stringify(learning) }), learning)
  assert.equal(visit(learning, '/home').last, learning.last)
  assert.equal(visit(learning, '/foundation/lr/whole').last, '/foundation/lr/whole')
  assert.equal(visit(learning, '/lesson/02/words/first').lastPractice, '/lesson/02/practice/friend')
})
test('unavailable and corrupt storage cannot prevent starting as a guest', () => {
  assert.deepEqual(
    loadLearning({
      getItem: () => {
        throw new Error('disabled')
      },
    }),
    emptyLearning,
  )
  assert.deepEqual(loadLearning({ getItem: () => '{broken' }), emptyLearning)
  const restored = sanitizeLearning({
    version: 1,
    last: '/lesson/999/study',
    indices: { first: 5, lr: 1 },
    positions: { '/lesson/02/study/first': -2, '/lesson/01/study': 120 },
    saved: ['first-1', 'first-1', 42],
    speed: 20,
  })
  assert.equal(restored.last, null)
  assert.deepEqual(restored.indices, { lr: 1 })
  assert.deepEqual(restored.positions, { '/lesson/01/study': 120 })
  assert.deepEqual(restored.saved, ['first-1'])
  assert.equal(restored.speed, 1)
})
test('old course URLs, Foundation links, and all 96 chapter URLs resolve', () => {
  assert.equal(parseRoute('#course').page, 'courses')
  assert.equal(parseRoute('#/courses?foundation').page, 'courses')
  assert.equal(parseRoute('#/lesson/02/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/01/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/02/practice/friend').scene, 'friend')
  assert.equal(
    parseRoute('#/lesson/02/practice/first?phrase=phrase-coworker').phrase,
    'phrase-coworker',
  )
  assert.equal(parseRoute('#/foundation/lr/chunks').view, 'chunks')
  assert.equal(parseRoute('#/lesson/97/study').page, 'home')
  assert.equal(parseRoute('#/%invalid').page, 'home')
  for (let number = 1; number <= 96; number++)
    assert.equal(parseRoute(`#/lesson/${String(number).padStart(2, '0')}/study`).page, 'lesson')
})
test('saving and unsaving phrases is reversible and never duplicates a saved item', () => {
  assert.deepEqual(toggleSaved(['first-0'], 'first-1'), ['first-0', 'first-1'])
  assert.deepEqual(toggleSaved(['first-0', 'first-1'], 'first-0'), ['first-1'])
})
test('the web course includes every original chapter, study and practice, without local editorial paths', () => {
  const directory = new URL('../course/chapters/', import.meta.url)
  const catalog = JSON.parse(
    readFileSync(new URL('../course/catalog.json', import.meta.url), 'utf8'),
  )
  assert.equal(catalog.length, 96)
  assert.equal(readdirSync(directory).filter((file) => file.endsWith('.md')).length, 96)
  catalog.forEach((chapter, index) => {
    assert.equal(chapter.id, String(index + 1).padStart(2, '0'))
    const text = readFileSync(new URL(chapter.filename, directory), 'utf8')
    assert.match(text, /^## Study/m, chapter.filename)
    assert.match(text, /^## Practice/m, chapter.filename)
    assert.doesNotMatch(text, /\/Users\//, chapter.filename)
  })
})
