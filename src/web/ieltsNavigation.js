export const IELTS_BASE = '/application/tests/ielts'
export const ieltsAreas = [
  { id: 'overview', title: 'Everything about IELTS', icon: 'compass', summary: 'Understand the test, your target, and how to prepare.' },
  { id: 'speaking', title: 'Speaking', icon: 'microphone', summary: 'Develop an answer. Listen to yourself. Try again.' },
  { id: 'writing', title: 'Writing', icon: 'pencil', summary: 'Read the task, build a response, and revise with purpose.' },
  { id: 'listening', title: 'Listening', icon: 'ear', summary: 'Follow meaning, notice corrections, and check the evidence.' },
  { id: 'reading', title: 'Reading', icon: 'book', summary: 'Find the evidence. Separate what is said from what you assume.' },
  { id: 'guided', title: 'Guided Sets', icon: 'lightbulb', summary: 'Four annotated workshops. Less help as you progress.' },
  { id: 'mocks', title: 'Individual Skill Mocks', icon: 'clock', summary: 'Choose a skill and check the conditions before you begin.' },
  { id: 'simulation', title: 'Full Simulations', icon: 'route', summary: 'Prepare for a linked exam rehearsal without teaching interruptions.' },
]
export const ieltsArea = (id) => ieltsAreas.find((area) => area.id === id)
export function ieltsPath(area = 'home', mode = 'study', task, attempt) {
  const query = new URLSearchParams()
  if (task) query.set('task', task)
  if (attempt) query.set('attempt', attempt)
  return `${IELTS_BASE}/${area}/${mode}${query.size ? `?${query}` : ''}`
}
