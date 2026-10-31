export const IELTS_BASE = '/application/tests/ielts'

// Six learner-facing destinations. Older routes are retained for bookmarks and
// saved practice attempts; they are not competing top-level menu choices.
export const ieltsAreas = [
  { id: 'overview', title: 'Everything about IELTS', icon: 'compass', summary: 'Understand the exam, test types, scores, and timing.' },
  { id: 'listening', title: 'Listening', icon: 'ear', summary: 'Listen, find answers, and understand mistakes.' },
  { id: 'reading', title: 'Reading', icon: 'book', summary: 'Read passages and find the evidence.' },
  { id: 'writing', title: 'Writing', icon: 'pencil', summary: 'Learn from examples, then write your own responses.' },
  { id: 'speaking', title: 'Speaking', icon: 'microphone', summary: 'Hear examples, speak, and review recordings.' },
  { id: 'mock', title: 'Mock Tests', icon: 'clock', summary: 'Guided examples and realistic timed rehearsals.' },
]

const retainedAreas = [
  { id: 'guided', title: 'Guided Tests', icon: 'lightbulb' },
  { id: 'mocks', title: 'Skill Rehearsals', icon: 'clock' },
  { id: 'simulation', title: 'Simulated Test', icon: 'route' },
]

export const ieltsArea = (id) => [...ieltsAreas, ...retainedAreas].find((area) => area.id === id)
export function ieltsPath(area = 'home', mode = 'study', task, attempt) {
  const query = new URLSearchParams()
  if (task) query.set('task', task)
  if (attempt) query.set('attempt', attempt)
  return `${IELTS_BASE}/${area}/${mode}${query.size ? `?${query}` : ''}`
}
export function ieltsStudyPath(area = 'overview', unit) {
  return `${IELTS_BASE}/${area}/study${unit ? `?unit=${encodeURIComponent(unit)}` : ''}`
}
