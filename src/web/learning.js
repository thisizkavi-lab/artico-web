import { sanitizePracticeSets } from './phrasePractice.js'
import { migrateLegacyLessonPath, sourceChapterId } from './chapterNumbers.js'

export const STORAGE_KEY = 'artico.web.learning.v1'
const RENUMBER_MARKER = 'artico.web.chapter34-inserted.v1'
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
  /^(?:\/lesson\/(?:0[1-9]|[1-8]\d|9[0-7])\/(?:study|practice|reader|words|phrases)(?:\/(?:first|friend))?(?:\?(?:phrase=phrase-(?:friend|coworker)|line=ch(?:0[1-9]|[1-8]\d|9[0-7])-(?:line|v|b|p)\d+))?|\/foundation\/(?:orientation|how-it-works|letters|hear|write|sounds|tongue-intro|lr)(?:\/(?:study|practice|chunks|whole))?)$/
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
          /^chapter-(?:0[1-9]|[1-8]\d|9[0-7])$/.test(key)) &&
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
          /^(?:0[1-9]|[1-8]\d|9[0-7])$/.test(item.chapter),
      )
      .map(([id, item]) => [id, { id, en: item.en, ja: item.ja, chapter: item.chapter }]),
  )
  const responses = Object.fromEntries(
    Object.entries(input.responses ?? {})
      .filter(
        ([id, value]) =>
          /^(?:ch(?:0[1-9]|[1-8]\d|9[0-7])-b\d+-\d+|foundation-(?:orientation(?:-profile)?|how-it-works(?:-plan)?|letters|hear|write|sounds|tongue-intro)|application-(?:tests|smalltalk|interviews|presentations|academic|storytelling|humor|writing|reading|ideas)-[0-2])$/.test(
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
    const stored = JSON.parse(storage.getItem(STORAGE_KEY))
    if (!stored || storage.getItem(RENUMBER_MARKER) === '1' || typeof storage.setItem !== 'function')
      return sanitizeLearning(stored)
    // Migrate only old public lesson paths. Source phrase IDs and ratings stay stable.
    const migrated = {
      ...stored,
      last: migrateLegacyLessonPath(stored.last),
      lastPractice: migrateLegacyLessonPath(stored.lastPractice),
      positions: Object.fromEntries(
        Object.entries(stored.positions ?? {}).map(([key,value]) => [migrateLegacyLessonPath(key),value]),
      ),
    }
    const cleaned = sanitizeLearning(migrated)
    storage.setItem(STORAGE_KEY, JSON.stringify(cleaned))
    storage.setItem(RENUMBER_MARKER, '1')
    return cleaned
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
  if (path === '/courses?orientation') return { path: '/home', page: 'home' }
  const [page, id, view, scene] = path.split('?')[0].split('/').filter(Boolean)
  if ((page === 'lesson' && id === '98' && view === 'study') || page === 'vocabulary') {
    const requestedTopic = page === 'vocabulary' ? id : scene
    const topic = /^(?:0?[1-9]|[1-6]\d|7[0-8])$/.test(requestedTopic ?? '')
      ? String(Number(requestedTopic)).padStart(2, '0')
      : null
    return {
      path: topic ? `/lesson/98/study/${topic}` : '/lesson/98/study',
      page: 'vocabulary',
      id: '98',
      ...(topic ? { topic } : {}),
    }
  }
  if (page === 'application') {
    if (id === 'humor') return parseRoute('#/lesson/34/study')
    if (!id) return { path: '/application', page:'application' }
    if (/^(?:tests|smalltalk|interviews|presentations|academic|storytelling|writing|reading|ideas)$/.test(id) && !view)
      return { path:'/application/' + id, page:'application', id }
    return { path: '/application', page:'application' }
  }
  if (page === 'home') return { path: '/home', page: 'home' }
  if (['courses', 'practice', 'progress', 'saved'].includes(page)) return { path, page }
  if (
    page === 'lesson' &&
    /^(?:0[1-9]|[1-8]\d|9[0-7])$/.test(id) &&
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
      new RegExp(`^ch${sourceChapterId(id) ?? id}-(?:line|v|b|p)\\d+$`).test(line)
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
