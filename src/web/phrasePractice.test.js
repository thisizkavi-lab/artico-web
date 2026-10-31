import test from 'node:test'
import assert from 'node:assert/strict'
import {
  introductionAliases,
  introductionPhrases,
  introductionSections,
} from '../course/introductions.js'
import { emptyLearning, loadLearning, parseRoute, sanitizeLearning } from './learning.js'
import {
  filterPracticePhrases,
  getPracticeSet,
  startPractice,
  stepPractice,
  togglePracticePhrase,
} from './phrasePractice.js'

test('separate chapters and foundation notes survive reload without resetting pilot progress', () => {
  const make = (id) => ({
    selected: [id],
    ratings: { [id]: 'needs-work' },
    session: { ids: [id], index: 0, active: true },
  })
  const learning = sanitizeLearning({
    ...emptyLearning,
    last: '/foundation/write/practice',
    lastPractice: '/foundation/write/practice',
    positions: {
      '/foundation/write/practice': 350,
      '/lesson/01/study?line=ch01-p112829969009517': 680,
    },
    responses: { 'foundation-write': 'Try lowercase a again.', 'foundation-unknown': 'Discard' },
    practiceSets: {
      '01': make('ch01-p112829969009517'),
      '02': make('ch02-p1'),
      '03': make('ch03-line25'),
      53: make('ch53-b2'),
    },
  })
  assert.equal(learning.lastPractice, '/foundation/write/practice')
  assert.equal(learning.responses['foundation-write'], 'Try lowercase a again.')
  assert.equal(learning.responses['foundation-unknown'], undefined)
  assert.equal(Object.keys(learning.practiceSets).length, 4)
  assert.deepEqual(learning.practiceSets['02'].selected, ['ch02-p1'])
  assert.equal(learning.practiceSets['03'].session.active, true)
  assert.equal(parseRoute('#/foundation/write/practice').view, 'practice')
  assert.equal(
    parseRoute('#/lesson/01/study?line=ch01-p112829969009517').line,
    'ch01-p112829969009517',
  )
})

test('every Chapter 02 spoken example is a shared Study and Practice record', () => {
  const displayed = introductionSections.flatMap((section) =>
    section.blocks.flatMap((block) => [
      ...(block.phrases ?? []),
      ...(block.choices?.map((choice) => choice.id) ?? []),
      ...(block.promptId ? [block.promptId] : []),
    ]),
  )
  const ids = introductionPhrases.map((item) => item.id)
  const spoken = introductionPhrases.filter((item) => item.section !== 'words')
  assert.equal(new Set(ids).size, 41)
  // Conversations, phrase shelves and the reply prompt share one stable phrase bank.
  // Every spoken target must appear in Study and remain reachable in Practice.
  assert.ok(displayed.every(id => ids.includes(id)))
  assert.deepEqual(
    new Set(displayed.filter(id => spoken.some(item => item.id === id))),
    new Set(spoken.map(item => item.id)),
  )
  for (const item of spoken) {
    assert.ok(item.en && item.context)
    assert.ok(introductionSections.some((section) => section.id === item.section))
  }
  for (const target of Object.values(introductionAliases)) assert.ok(ids.includes(target))
  assert.ok(introductionPhrases.some((item) => item.en === 'I go by Dan.'))
  assert.ok(introductionPhrases.some((item) => item.en === 'This is ...'))
  assert.ok(introductionPhrases.some((item) => item.en === 'What should I call you?'))
  const restoredExpressions = [
    "I'm ...", 'My name is ...', "A friend of Cassie's", 'Nice to meet you.',
    "It's a pleasure to meet you.", 'Likewise.', 'Please call me Satoshi.', 'Hi',
    'This is ...', "I'd like you to meet ...",
  ]
  for (const expression of restoredExpressions)
    assert.ok(introductionPhrases.some((item) => item.en === expression), `Missing restored expression: ${expression}`)
  assert.ok(introductionPhrases.some((item) => item.en === 'Could you say your name again?'))
})

test('selection does not change familiarity and an active set stays fixed as ratings change', () => {
  const initial = getPracticeSet(undefined, introductionPhrases)
  assert.equal(initial.selected.length, 0)
  const choice = { ...initial, selected: ['ch02-p6', 'ch02-p2', 'ch02-p1'] }
  const active = startPractice(choice, introductionPhrases)
  assert.deepEqual(active.session.ids, ['ch02-p1', 'ch02-p2', 'ch02-p6'])
  const rated = { ...active, ratings: { 'ch02-p1': 'familiar' } }
  const deselected = togglePracticePhrase(rated, 'ch02-p1')
  assert.deepEqual(deselected.session, active.session)
  assert.equal(deselected.ratings['ch02-p1'], 'familiar')
  assert.equal(stepPractice(stepPractice(stepPractice(rated, 1), 1), 1).session.completed, true)
  assert.equal(stepPractice(rated, -1).session.index, 0)
  assert.equal(
    startPractice({ ...initial, selected: [] }, introductionPhrases).session.active,
    false,
  )
})

test('an older rehearsal position remains resumable after new phrases are added', () => {
  const legacy = { ids: ['ch01-line8', 'ch01-line9', 'ch01-v1'], index: 1 }
  const items = ['ch01-p123', ...legacy.ids].map((id) => ({ id }))
  const set = getPracticeSet(undefined, items, legacy)
  assert.deepEqual(set.selected, [])
  assert.deepEqual(set.session, { ...legacy, active: false, completed: false })
  assert.equal(set.session.ids[set.session.index], 'ch01-line9')

  const chosen = { ...set, selected: [], session: { ids: [], index: 0, active: false, completed: false } }
  assert.deepEqual(getPracticeSet(chosen, items, legacy).session, chosen.session)
  assert.deepEqual(getPracticeSet(chosen, items, legacy).selected, [])
})

test('search and familiarity filters preserve selected items outside the view', () => {
  const set = {
    ...getPracticeSet(undefined, introductionPhrases),
    ratings: { 'ch02-p15': 'needs-work', 'ch02-p2': 'familiar' },
    filter: 'needs-work',
    search: 'dan',
  }
  assert.deepEqual(
    filterPracticePhrases(introductionPhrases, set).map((item) => item.id),
    ['ch02-p15'],
  )
  assert.equal(set.selected.length, 0)
  assert.equal(
    filterPracticePhrases(introductionPhrases, { ...set, search: 'no matching phrase' }).length,
    0,
  )
  assert.equal(
    filterPracticePhrases(introductionPhrases, {
      ...set,
      filter: 'all',
      search: 'I’m a teacher',
    })[0].id,
    'ch02-p8',
  )
})

test('empty selections, ratings, and an active position survive reload with corrupt entries discarded', () => {
  const set = {
    ...getPracticeSet(undefined, introductionPhrases),
    selected: [],
    ratings: { 'ch02-p1': 'familiar', 'ch03-p1': 'familiar', bad: 'familiar' },
    session: { ids: ['ch02-p1', 'ch02-p6', 'ch02-p6', 'ch03-p1'], index: 1, active: true },
    search: 'Jordan',
    filter: 'all',
  }
  const loaded = loadLearning({
    getItem: () => JSON.stringify({ ...emptyLearning, practiceSets: { '02': set, invalid: set } }),
  })
  const restored = getPracticeSet(loaded.practiceSets['02'], introductionPhrases)
  assert.deepEqual(restored.selected, [])
  assert.deepEqual(restored.ratings, { 'ch02-p1': 'familiar' })
  assert.deepEqual(restored.session, { ids: ['ch02-p1', 'ch02-p6'], index: 1, active: true, completed: false })
  assert.equal(restored.search, 'Jordan')
  assert.equal(loaded.practiceSets.invalid, undefined)
  assert.deepEqual(
    getPracticeSet(
      { selected: ['ch02-p999'], session: { ids: ['ch02-p999'], index: 0, active: true } },
      introductionPhrases,
    ).session,
    { ids: [], index: 0, active: false, completed: false },
  )
})

test('new stable phrase URLs and saved phrases coexist with legacy links', () => {
  for (const view of ['study', 'practice']) {
    const path = `/lesson/02/${view}?line=ch02-p15`
    assert.equal(parseRoute(`#${path}`).line, 'ch02-p15')
    assert.equal(sanitizeLearning({ ...emptyLearning, last: path }).last, path)
  }
  assert.equal(parseRoute('#/lesson/02/study?line=ch03-p15').line, undefined)
  const saved = sanitizeLearning({
    ...emptyLearning,
    saved: ['ch02-p15'],
    savedDetails: { 'ch02-p15': { en: 'I go by Dan.', ja: '', chapter: '02' } },
  })
  assert.equal(saved.savedDetails['ch02-p15'].en, 'I go by Dan.')
  assert.equal(parseRoute('#/lesson/02/practice?line=ch02-line10').line, 'ch02-line10')
})

test('finishing a set persists a recap and repeating starts at the beginning', () => {
  let set = startPractice({ ...getPracticeSet(undefined, introductionPhrases), selected: ['ch02-p1'] }, introductionPhrases)
  set = stepPractice(set, 1)
  const stored = sanitizeLearning({ ...emptyLearning, practiceSets: { '02': set } }).practiceSets['02']
  const restored = getPracticeSet(stored, introductionPhrases)
  assert.equal(restored.session.completed, true)
  assert.equal(restored.session.index, 0)
  assert.equal(startPractice(restored, introductionPhrases).session.completed, false)
})

test('recommended scenes and repeated sets retain their authored turn order', () => {
  const set = getPracticeSet(undefined, introductionPhrases)
  const ids = ['ch02-p6', 'ch02-p2', 'ch02-p1']
  assert.deepEqual(startPractice(set, introductionPhrases, ids).session.ids, ids)
  assert.deepEqual(startPractice(set, introductionPhrases, ids).selected, set.selected)
})
