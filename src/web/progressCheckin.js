// Private, local, self-reported speaking check-ins. These are not proficiency scores.
export const CHECKIN_RESPONSE_KEY = 'progress-self-check'
export const checkinOptions = [
  { value: 'not-yet', en: 'Not yet', ja: 'まだ難しい' },
  { value: 'with-help', en: 'With a prompt', ja: 'ヒントがあれば' },
  { value: 'on-my-own', en: 'On my own', ja: '自分でできた' },
]

const validRatings = new Set(checkinOptions.map(option => option.value))
const validChallenges = new Set([
  'starter', 'conversationalist', 'thinker', 'storyteller', 'explorer', 'collaborator',
])
const validDate = value => typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(new Date(value + 'T12:00:00').getTime()) &&
  new Date(value + 'T12:00:00').getFullYear() === Number(value.slice(0, 4)) &&
  new Date(value + 'T12:00:00').getMonth() + 1 === Number(value.slice(5, 7)) &&
  new Date(value + 'T12:00:00').getDate() === Number(value.slice(8, 10))

export function saveCheckin(previous, next) {
  const entries = Array.isArray(previous) ? previous : []
  const all = [...entries, next].filter(item =>
    item && validDate(item.date) && validChallenges.has(item.challenge) && validRatings.has(item.rating),
  )
  // One answer per exercise per day. A second check-in corrects that day's answer.
  const unique = new Map(all.map(item => [item.date + ':' + item.challenge, {
    date: item.date, challenge: item.challenge, rating: item.rating,
  }]))
  return [...unique.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-24)
}
export function parseCheckins(raw) {
  if (typeof raw !== 'string' || raw.length > 5000) return []
  try {
    const value = JSON.parse(raw)
    return value?.v === 1 && Array.isArray(value.history)
      ? value.history.slice(-100).reduce((history, entry) => saveCheckin(history, entry), [])
      : []
  } catch {
    return []
  }
}
