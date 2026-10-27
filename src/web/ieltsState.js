export const IELTS_STORAGE_KEY = 'artico.ielts.workbook.v1'
export const emptyIelts = () => ({ version: 1, notes: {}, exposed: {}, attempts: [] })
const text = (value, max = 40000) => typeof value === 'string' ? value.slice(0, max) : ''
const stringMap = (value) => Object.fromEntries(Object.entries(value && typeof value === 'object' ? value : {})
  .filter(([key, item]) => /^[a-zA-Z0-9-]{1,100}$/.test(key) && typeof item === 'string')
  .map(([key, item]) => [key, text(item)]))

export function sanitiseIelts(value) {
  if (value?.version !== 1) return emptyIelts()
  return {
    version: 1,
    notes: stringMap(value.notes),
    exposed: Object.fromEntries(Object.entries(value.exposed ?? {}).filter(([key, seen]) => /^[a-zA-Z0-9-]{1,100}$/.test(key) && seen === true)),
    attempts: (Array.isArray(value.attempts) ? value.attempts : []).filter((attempt) =>
      attempt && /^[a-zA-Z0-9-]{1,100}$/.test(attempt.id ?? '') && /^[a-zA-Z0-9-]{1,100}$/.test(attempt.taskId ?? '') &&
      Number.isFinite(attempt.startedAt) && Number.isFinite(attempt.duration) && attempt.duration >= 0 && attempt.duration <= 14400 &&
      (attempt.deadline === null || Number.isFinite(attempt.deadline)) && ['active', 'completed'].includes(attempt.status) &&
      (attempt.status !== 'completed' || Number.isFinite(attempt.completedAt)) &&
      ['guided', 'drill', 'mock'].includes(attempt.mode)
    ).map((attempt) => ({
      ...attempt, answers: stringMap(attempt.answers), notes: text(attempt.notes), reflection: text(attempt.reflection),
      flags: Array.isArray(attempt.flags) ? attempt.flags.filter((id) => typeof id === 'string').slice(0, 100) : [],
      pausedAt: attempt.mode !== 'mock' && Number.isFinite(attempt.pausedAt) ? attempt.pausedAt : null,
      pausedTotal: Number.isFinite(attempt.pausedTotal) ? Math.max(0, attempt.pausedTotal) : 0,
    })),
  }
}
export function loadIelts(storage) {
  try { return sanitiseIelts(JSON.parse(storage.getItem(IELTS_STORAGE_KEY))) }
  catch { return emptyIelts() }
}
export function exposureKeys(task) {
  return [task.id, ...(task.passage ?? []).map((p) => `${task.materialId ?? task.id}-paragraph-${p.id}`), ...(task.tasks ?? []).flatMap(exposureKeys)]
}
export function hasSeenTask(state, task) {
  return exposureKeys(task).some((id) => state.exposed[id])
}
export function exposeTask(state, task) {
  return { ...state, exposed: { ...state.exposed, ...Object.fromEntries(exposureKeys(task).map((id) => [id, true])) } }
}
export function makeAttempt(task, { id, mode = 'drill', timed = true, seenBefore = false, version = '' }, now = Date.now()) {
  const duration = timed || mode === 'mock' ? task.minutes * 60 : 0
  return {
    id, taskId: task.id, mode, status: 'active', contentVersion: version, startedAt: now,
    duration, deadline: duration ? now + duration * 1000 : null, pausedAt: null, pausedTotal: 0,
    answers: {}, flags: [], notes: '', reflection: '', seenBefore, assisted: mode === 'guided', interrupted: false,
    audioStarted: false, audioCompleted: false, audioError: false,
  }
}
export function clockSeconds(attempt, now = Date.now()) {
  const current = attempt.status === 'completed' ? attempt.completedAt : attempt.pausedAt ?? now
  return attempt.deadline !== null
    ? Math.max(0, Math.ceil((attempt.deadline - current) / 1000))
    : Math.max(0, Math.floor((current - attempt.startedAt - attempt.pausedTotal) / 1000))
}
export function pauseAttempt(attempt, now = Date.now()) {
  if (attempt.mode === 'mock' || attempt.status !== 'active') return attempt
  if (attempt.pausedAt !== null) {
    const paused = Math.max(0, now - attempt.pausedAt)
    return { ...attempt, pausedAt: null, pausedTotal: attempt.pausedTotal + paused, deadline: attempt.deadline === null ? null : attempt.deadline + paused }
  }
  return { ...attempt, pausedAt: now }
}
export function completeAttempt(attempt, reason = 'submitted', now = Date.now()) {
  if (attempt.status === 'completed') return attempt
  return { ...attempt, status: 'completed', completedAt: attempt.pausedAt ?? now, finishReason: reason, pausedAt: null }
}
export function applyAttemptChange(attempt, updater, now = Date.now()) {
  // A throttled background interval must not permit answers after the deadline.
  if (attempt.status === 'active' && attempt.deadline !== null && attempt.pausedAt === null && now >= attempt.deadline)
    return completeAttempt(attempt, 'timeout', now)
  return updater(attempt)
}
export function normaliseAnswer(value) { return String(value ?? '').trim().toUpperCase().replace(/\s+/g, ' ') }
export function markQuestions(task, answers) {
  return (task.questions ?? []).map((question) => ({
    ...question, entered: answers[question.id] ?? '', correct: normaliseAnswer(answers[question.id]) === normaliseAnswer(question.answer),
  }))
}
export const wordCount = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length
export const formatClock = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
export function updateAttempt(state, id, updater) {
  return { ...state, attempts: state.attempts.map((attempt) => attempt.id === id ? updater(attempt) : attempt) }
}
