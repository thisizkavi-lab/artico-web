import manifest from './vocabularyCourseArt.json'

// Dedicated Artico course illustrations.
// Overrides third-party symbols and legacy images for a consistent visual style.
export function vocabularyCourseArt(term, chapter) {
  const key = String(chapter) + ':' + term.toLowerCase().trim()
  const file = manifest.entries[key]
  if (!file) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-course/' + file + '.webp',
  }
}
