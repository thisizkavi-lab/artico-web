import manifest from './vocabularyCourseArt.json'

// Dedicated Artico course illustrations.
// Overrides third-party symbols and legacy images for a consistent visual style.
const TEXT_ONLY_REASONS = new Set(['ABSTRACT', 'FUNCTION', 'IDIOM', 'SENSE', 'SENSITIVE'])

export function vocabularyCourseTextOnly(term, chapter) {
  const key = String(chapter) + ':' + term.toLowerCase().trim()
  const reason = manifest.textOnly?.[key]
  return Boolean(reason && TEXT_ONLY_REASONS.has(reason))
}

export function vocabularyCourseArt(term, chapter) {
  const key = String(chapter) + ':' + term.toLowerCase().trim()
  const file = manifest.entries[key]
  if (!file) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-course/' + file + '.webp',
  }
}
