import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { allIeltsTasks, guidedSets, skillInfo, skillTasks, taskById, writingMock } from './ieltsContent.js'
import { ieltsAreas, ieltsPath } from './ieltsNavigation.js'
import { parseRoute } from './learning.js'
import { IELTS_STORAGE_KEY, applyAttemptChange, clockSeconds, completeAttempt, emptyIelts, exposeTask, formatClock, hasSeenTask, loadIelts, makeAttempt, markQuestions, pauseAttempt, sanitiseIelts, updateAttempt, wordCount } from './ieltsState.js'

test('English Tests branches to all six learner-facing IELTS areas in both modes and preserves direct task links', () => {
  assert.equal(ieltsAreas.length, 6)
  assert.deepEqual(ieltsAreas.map((area) => area.id), ['overview', 'listening', 'reading', 'writing', 'speaking', 'mock'])
  assert.equal(parseRoute('#/application/tests').id, 'tests')
  assert.equal(parseRoute('#/application/tests/ielts').area, 'home')
  for (const area of ['home', ...ieltsAreas.map((item) => item.id)]) for (const mode of ['study', 'practice']) {
    const path = ieltsPath(area, mode)
    const route = parseRoute(`#${path}`)
    assert.equal(route.path, path)
    assert.equal(route.exam, 'ielts')
    assert.equal(route.area, area)
    assert.equal(route.view, mode)
  }
  // Older saved routes remain valid, although they no longer crowd the home screen.
  for (const area of ['guided', 'mocks', 'simulation']) {
    const retainedRoute = parseRoute('#' + ieltsPath(area,'practice'))
    assert.equal(retainedRoute.area, area)
  }
  const path = ieltsPath('reading', 'practice', 'r-tool-library', 'run-123')
  assert.equal(parseRoute(`#${path}`).task, 'r-tool-library')
  assert.equal(parseRoute(`#${path}`).attempt, 'run-123')
  for (const input of ['#/application/tests/ielts/bad', '#/application/tests/ielts/home/wrong', '#/application/tests/ielts/home/study/extra']) assert.equal(parseRoute(input).path, '/application/tests')
  assert.equal(parseRoute('#/application/tests/ielts/home/study?attempt=%3Cscript%3E').attempt, undefined)
})
test('every skill has actual Study content, a decoded example and reachable practice workbooks', () => {
  for (const [id, info] of Object.entries(skillInfo)) {
    assert.equal(info.sections.length, 4)
    assert.equal(info.model.segments.length, 3)
    assert.ok(info.goal && info.intro && info.check.length)
    assert.ok(skillTasks(id).length > 0)
  }
  assert.equal(new Set(allIeltsTasks.map((task) => task.id)).size, allIeltsTasks.length)
  allIeltsTasks.forEach((task) => {
    assert.ok(skillInfo[task.skill])
    assert.ok(task.prompt && task.label && task.minutes > 0 && task.objectives.length)
    assert.equal(parseRoute('#' + ieltsPath(task.skill, 'practice', task.id)).task, task.id)
  })
})
test('four guided sets use existing tasks without pretending to be four calibrated exams', () => {
  assert.equal(guidedSets.length, 4)
  guidedSets.forEach((set) => set.taskIds.forEach((id) => assert.ok(taskById[id])))
  assert.deepEqual(new Set(guidedSets[0].taskIds.map((id) => taskById[id].skill)), new Set(['reading', 'listening', 'writing', 'speaking']))
})
test('question keys match permitted options and actual evidence paragraphs', () => {
  allIeltsTasks.filter((task) => task.questions).forEach((task) => {
    const paragraphs = new Set((task.passage ?? task.transcript).map((part) => part.id))
    assert.equal(new Set(task.questions.map((question) => question.id)).size, task.questions.length)
    task.questions.forEach((question) => {
      assert.ok((question.options ?? ['TRUE', 'FALSE', 'NOT GIVEN']).includes(question.answer))
      assert.ok(paragraphs.has(question.paragraph))
      assert.ok(question.why.length > 30)
    })
    const answers = Object.fromEntries(task.questions.map((question) => [question.id, question.answer.toLowerCase() + ' ']))
    assert.ok(markQuestions(task, answers).every((question) => question.correct))
    assert.ok(markQuestions(task, {}).every((question) => !question.correct))
  })
})
test('seen status includes shared reading paragraphs and component writing tasks', () => {
  const state = exposeTask(emptyIelts(), taskById['r-library-hours'])
  assert.equal(hasSeenTask(state, taskById['r-tool-library']), true)
  assert.equal(hasSeenTask(state, taskById['s-learning']), false)
  const written = exposeTask(state, taskById['w-library-data'])
  assert.equal(hasSeenTask(written, writingMock), true)
})
test('timed deadlines survive refresh and do not restart from the full duration', () => {
  const task = taskById['r-tool-library']
  const attempt = makeAttempt(task, { id: 'run-1' }, 1000)
  const state = { ...emptyIelts(), attempts: [attempt] }
  const storage = { getItem: (key) => { assert.equal(key, IELTS_STORAGE_KEY); return JSON.stringify(state) } }
  const restored = loadIelts(storage).attempts[0]
  assert.equal(clockSeconds(restored, 121000), 600)
  assert.equal(clockSeconds(restored, 10000000), 0)
  assert.equal(restored.deadline, attempt.deadline)
})
test('guided and drill clocks pause correctly, including untimed elapsed clocks', () => {
  const timed = makeAttempt(taskById['r-tool-library'], { id: 'pause' }, 1000)
  const paused = pauseAttempt(timed, 11000)
  assert.equal(clockSeconds(paused, 50000), 710)
  const resumed = pauseAttempt(paused, 61000)
  assert.equal(clockSeconds(resumed, 71000), 700)
  const untimed = makeAttempt(taskById['r-tool-library'], { id: 'untimed', timed: false }, 1000)
  const resumedUntimed = pauseAttempt(pauseAttempt(untimed, 11000), 61000)
  assert.equal(clockSeconds(resumedUntimed, 71000), 20)
})
test('a mock cannot pause and Writing uses one shared sixty-minute clock', () => {
  const attempt = makeAttempt(writingMock, { id: 'mock', mode: 'mock' }, 1000)
  assert.equal(attempt.duration, 3600)
  assert.equal(writingMock.tasks.length, 2)
  assert.equal(pauseAttempt(attempt, 2000), attempt)
  assert.equal(makeAttempt(writingMock, { id: 'mock-untimed', mode: 'mock', timed: false }, 1000).duration, 3600)
  const changed = { ...attempt, answers: { [writingMock.tasks[0].id]: 'First draft', [writingMock.tasks[1].id]: 'Second draft' } }
  assert.equal(clockSeconds(changed, 1201000), 2400)
})
test('a delayed timer cannot accept a new answer after the saved deadline', () => {
  const attempt = makeAttempt(taskById['r-tool-library'], { id: 'deadline' }, 1000)
  const changed = applyAttemptChange(attempt, (run) => ({ ...run, answers: { r1: 'TRUE' } }), attempt.deadline + 1)
  assert.equal(changed.status, 'completed')
  assert.equal(changed.finishReason, 'timeout')
  assert.deepEqual(changed.answers, {})
})
test('finish is idempotent and original answers remain separate from revision and reflection', () => {
  const original = { ...makeAttempt(writingMock, { id: 'finish', mode: 'mock' }, 1000), answers: { 'w-library-data': 'Original' } }
  const finished = completeAttempt(original, 'submitted', 2000)
  assert.equal(completeAttempt(finished, 'timeout', 8000), finished)
  const state = updateAttempt({ ...emptyIelts(), attempts: [finished] }, 'finish', (attempt) => ({ ...attempt, answers: { ...attempt.answers, 'revision-w-library-data': 'Revised' }, reflection: 'Check the units.' }))
  assert.equal(state.attempts[0].answers['w-library-data'], 'Original')
  assert.equal(state.attempts[0].answers['revision-w-library-data'], 'Revised')
  assert.equal(state.attempts[0].finishReason, 'submitted')
})
test('corrupt or unavailable IELTS storage never discards the separate existing course store', () => {
  assert.deepEqual(loadIelts({ getItem() { throw new Error('blocked') } }), emptyIelts())
  assert.deepEqual(loadIelts({ getItem() { return '{bad json' } }), emptyIelts())
  assert.deepEqual(sanitiseIelts({ version: 999 }), emptyIelts())
  assert.deepEqual(sanitiseIelts({ version: 1, attempts: [{ id: 'bad' }], notes: { plan: 20, valid: 'My plan' } }).notes, { valid: 'My plan' })
  assert.notEqual(IELTS_STORAGE_KEY, 'artico.web.learning.v1')
})
test('timers and word counts handle blank responses and over-an-hour durations', () => {
  assert.equal(wordCount(''), 0)
  assert.equal(wordCount('  A clear\nanswer. '), 3)
  assert.equal(formatClock(3600), '60:00')
  assert.equal(formatClock(9), '00:09')
})
test('all released audio is committed locally and mocks disclose incomplete forms', () => {
  const audioTask = taskById['l-workshop']
  assert.ok(existsSync(new URL('../../public/' + audioTask.audio, import.meta.url)))
  assert.ok(existsSync(new URL('../../public/audio/ielts/speaking-example.wav', import.meta.url)))
  const ui = readFileSync(new URL('./IeltsCourse.jsx', import.meta.url), 'utf8')
  assert.match(ui, /No complete simulation set is released yet/)
  assert.match(ui, /Full-length form in production/)
  assert.doesNotMatch(ui, /Your IELTS band is|Guaranteed Band 9/)
  const workspace = readFileSync(new URL('./IeltsWorkspace.jsx', import.meta.url), 'utf8')
  assert.match(workspace, /spellCheck=\{false\}/)
  assert.match(workspace, /No audio is uploaded/)
  assert.match(workspace, /No teaching hints/)
  const app = readFileSync(new URL('./ArticoWeb.jsx', import.meta.url), 'utf8')
  assert.match(app, /key=\{route\.exam === 'ielts' \? 'ielts' : route\.path\}/)
  assert.match(ui, /Commit before changing the hash/)
  assert.match(ui, /addEventListener\('storage', receive\)/)
})
