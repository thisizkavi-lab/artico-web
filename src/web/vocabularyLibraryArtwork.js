import manifest from './vocabularyMulberryManifest.json'

// These are real, locally deployed PNG reproductions of licensed Mulberry SVGs.
// No external image host is used by the browser, and matches are chapter-specific.
export function vocabularyMulberryIllustration(term, chapter) {
  const key = chapter + ':' + term.toLocaleLowerCase('en').trim()
  const file = manifest.entries[key]
  if (!file) return null
  return {
    type: 'library-png',
    src: import.meta.env.BASE_URL + 'vocabulary-symbols/mulberry/' + encodeURIComponent(file.slice(0, -4)) + '.png',
  }
}
