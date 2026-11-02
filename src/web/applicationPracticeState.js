export const APPLICATION_PRACTICE_KEY = 'artico.application.practice.v1'
const validId = id => /^[a-z0-9-]{1,120}$/.test(id)
export function cleanApplicationPractice(input) {
  const result = { version:1, answers:{}, notes:{} }
  if (input?.version !== 1) return result
  for (const [id, value] of Object.entries(input.answers || {}).slice(-400)) {
    if (validId(id) && Number.isInteger(value?.choice) && value.choice >= 0 && value.choice < 6)
      result.answers[id] = { choice:value.choice, checked:value.checked === true }
  }
  for (const [id, value] of Object.entries(input.notes || {}).slice(-100))
    if (validId(id) && typeof value === 'string') result.notes[id] = value.slice(0,6000)
  return result
}
export function readApplicationPractice(storage) {
  try { return cleanApplicationPractice(JSON.parse(storage.getItem(APPLICATION_PRACTICE_KEY))) }
  catch { return cleanApplicationPractice(null) }
}
