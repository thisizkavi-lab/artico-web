import manifest from './vocabularyMulberryManifest.json'
import openmoji from './vocabularyOpenmojiManifest.json'

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

// Secondary library: only exact, concrete, context-reviewed OpenMoji pictures.
export function vocabularyLibraryIllustration(term, chapter) {
  const mulberry = vocabularyMulberryIllustration(term, chapter)
  if (mulberry) return mulberry
  const key = chapter + ':' + term.toLocaleLowerCase('en').trim()
  const hexcode = openmoji.entries[key]
  return hexcode ? {
    type: 'library-png',
    src: import.meta.env.BASE_URL + 'vocabulary-symbols/openmoji/' + hexcode + '.png',
  } : null
}
