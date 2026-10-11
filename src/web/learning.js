export const STORAGE_KEY = 'artico.web.learning.v1'
export const emptyLearning = {
  version: 1,
  last: null,
  lastPractice: null,
  positions: {},
  saved: [],
  indices: {},
  mode: 'shadow',
  speed: 1,
  soundSpeed: 0.75,
}
const validView =
  /^(?:\/lesson\/(?:0[1-9]|[1-8]\d|9[0-6])\/(?:study|practice|reader|words|phrases)(?:\/(?:first|friend))?(?:\?phrase=phrase-(?:friend|coworker))?|\/foundation\/(?:orientation|how-it-works|letters|hear|write|sounds|tongue-intro|lr)(?:\/(?:study|chunks|whole))?)$/
const isPractice = (path) =>
  /\/practice(?:\/|$)/.test(path) || /\/foundation\/lr\/(?:chunks|whole)/.test(path)

export function sanitizeLearning(input) {
  if (!input || input.version !== 1) return { ...emptyLearning }
  const positions = Object.fromEntries(
    Object.entries(input.positions ?? {}).filter(
      ([path, value]) =>
        validView.test(path) && Number.isFinite(value) && value >= 0 && value < 1000000,
    ),
  )
  const indices = Object.fromEntries(
    Object.entries(input.indices ?? {}).filter(
      ([key, value]) =>
        ['first', 'friend', 'lr'].includes(key) &&
        Number.isInteger(value) &&
        value >= 0 &&
        value < 3,
    ),
  )
  return {
    version: 1,
    last: typeof input.last === 'string' && validView.test(input.last) ? input.last : null,
    lastPractice:
      typeof input.lastPractice === 'string' &&
      validView.test(input.lastPractice) &&
      isPractice(input.lastPractice)
        ? input.lastPractice
        : null,
    positions,
    indices,
    saved: Array.isArray(input.saved)
      ? [...new Set(input.saved.filter((value) => typeof value === 'string').slice(0, 200))]
      : [],
    mode: ['listen', 'repeat', 'shadow'].includes(input.mode) ? input.mode : 'shadow',
    speed: [0.75, 0.9, 1, 1.1].includes(input.speed) ? input.speed : 1,
    soundSpeed: [0.75, 0.9, 1, 1.1].includes(input.soundSpeed) ? input.soundSpeed : 0.75,
  }
}

export function loadLearning(storage) {
  try {
    return sanitizeLearning(JSON.parse(storage.getItem(STORAGE_KEY)))
  } catch {
    return { ...emptyLearning }
  }
}

export function parseRoute(hash) {
  let path
  try {
    path = decodeURI(hash.replace(/^#/, '') || '/home')
  } catch {
    return { path: '/home', page: 'home' }
  }
  if (path === 'course' || path === '/course') return { path: '/courses', page: 'courses' }
  const [page, id, view, scene] = path.split('?')[0].split('/').filter(Boolean)
  if (['home', 'courses', 'practice', 'saved'].includes(page)) return { path, page }
  if (
    page === 'lesson' &&
    /^(?:0[1-9]|[1-8]\d|9[0-6])$/.test(id) &&
    ['study', 'practice', 'reader', 'words', 'phrases'].includes(view)
  ) {
    const phrase = new URLSearchParams(path.split('?')[1] ?? '').get('phrase')
    return {
      path,
      page,
      id,
      view,
      scene: scene === 'friend' ? 'friend' : 'first',
      ...(view === 'practice' && ['phrase-friend', 'phrase-coworker'].includes(phrase)
        ? { phrase }
        : {}),
    }
  }
  if (
    page === 'foundation' &&
    /^(?:orientation|how-it-works|letters|hear|write|sounds|tongue-intro|lr)$/.test(id)
  ) {
    return { path, page, id, view: ['study', 'chunks', 'whole'].includes(view) ? view : 'study' }
  }
  return { path: '/home', page: 'home' }
}

export function visit(learning, path) {
  return validView.test(path)
    ? { ...learning, last: path, lastPractice: isPractice(path) ? path : learning.lastPractice }
    : learning
}

export function toggleSaved(saved, id) {
  return saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
}
