import { sanitizePracticeSets } from './phrasePractice.js'

export const STORAGE_KEY = 'artico.web.learning.v1'
export const emptyLearning = {
  version: 1,
  last: null,
  lastPractice: null,
  positions: {},
  saved: [],
  savedDetails: {},
  responses: {},
  indices: {},
  practiceSets: {},
  mode: 'shadow',
  speed: 1,
  soundSpeed: 0.75,
}
const validView =
  /^(?:\/lesson\/(?:0[1-9]|[1-8]\d|9[0-6])\/(?:study|practice|reader|words|phrases)(?:\/(?:first|friend))?(?:\?(?:phrase=phrase-(?:friend|coworker)|line=ch(?:0[1-9]|[1-8]\d|9[0-6])-(?:line|v|b|p)\d+))?|\/foundation\/(?:orientation|how-it-works|letters|hear|write|sounds|tongue-intro|lr)(?:\/(?:study|practice|chunks|whole))?)$/
const isPractice = (path) =>
  /\/practice(?:[/?]|$)/.test(path) || /\/foundation\/lr\/(?:chunks|whole)/.test(path)

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
        (['first', 'friend', 'lr'].includes(key) ||
          /^chapter-(?:0[1-9]|[1-8]\d|9[0-6])$/.test(key)) &&
        Number.isInteger(value) &&
        value >= 0 &&
        value < (/^chapter-/.test(key) ? 500 : 3),
    ),
  )
  const saved = Array.isArray(input.saved)
    ? [...new Set(input.saved.filter((value) => typeof value === 'string').slice(0, 200))]
    : []
  const savedDetails = Object.fromEntries(
    Object.entries(input.savedDetails ?? {})
      .filter(
        ([key, item]) =>
          saved.includes(key) &&
          /^ch\d{2}-(?:line\d+|v\d+|b\d+|p\d+)$/.test(key) &&
          item &&
          typeof item.en === 'string' &&
          item.en.length < 5000 &&
          typeof item.ja === 'string' &&
          item.ja.length < 2000 &&
          /^(?:0[1-9]|[1-8]\d|9[0-6])$/.test(item.chapter),
      )
      .map(([id, item]) => [id, { id, en: item.en, ja: item.ja, chapter: item.chapter }]),
  )
  const responses = Object.fromEntries(
    Object.entries(input.responses ?? {})
      .filter(
        ([id, value]) =>
          /^(?:ch(?:0[1-9]|[1-8]\d|9[0-6])-b\d+-\d+|foundation-(?:orientation(?:-profile)?|how-it-works|letters|hear|write|sounds|tongue-intro))$/.test(
            id,
          ) &&
          typeof value === 'string' &&
          value.length <= 2000,
      )
      .slice(-384),
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
    practiceSets: sanitizePracticeSets(input.practiceSets),
    saved,
    savedDetails,
    responses,
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

// Keep direct lesson links intact. Only the public entry point depends on progress.
export function shouldShowLanding(hash, learning) {
  const path = hash.replace(/^#/, '').split('?')[0].replace(/\/$/, '')
  return path === '/landing' || (path === '' && !learning.last)
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
  if (['home', 'courses', 'practice', 'progress', 'saved'].includes(page)) return { path, page }
  if (
    page === 'lesson' &&
    /^(?:0[1-9]|[1-8]\d|9[0-6])$/.test(id) &&
    ['study', 'practice', 'reader', 'words', 'phrases'].includes(view)
  ) {
    const query = new URLSearchParams(path.split('?')[1] ?? '')
    const phrase = query.get('phrase')
    const line = query.get('line')
    return {
      path,
      page,
      id,
      view: view === 'reader' ? 'study' : view,
      scene: scene === 'friend' ? 'friend' : 'first',
      ...(view === 'practice' && ['phrase-friend', 'phrase-coworker'].includes(phrase)
        ? { phrase }
        : {}),
      ...(['practice', 'study', 'reader'].includes(view) &&
      new RegExp(`^ch${id}-(?:line|v|b|p)\\d+$`).test(line)
        ? { line }
        : {}),
    }
  }
  if (
    page === 'foundation' &&
    /^(?:orientation|how-it-works|letters|hear|write|sounds|tongue-intro|lr)$/.test(id)
  ) {
    return {
      path,
      page,
      id,
      view: ['study', 'practice', 'chunks', 'whole'].includes(view) ? view : 'study',
    }
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
