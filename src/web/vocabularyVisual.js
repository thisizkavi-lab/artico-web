import { vocabularyTimePng } from './vocabularyTimePng'
import { vocabularyPngIllustration } from './vocabularyPngArtwork'
import { vocabularyOriginalScene } from './vocabularyOriginalScenes'
import { vocabularyLibraryIllustration } from './vocabularyLibraryArtwork'

// Artwork for Lessons 3–78 is now image-only. No inline SVG, generated
// icon, procedural symbol, or cross-topic guessed image reaches a card.
// Original educational PNGs take precedence over third-party raster art.
export function vocabularyVisual(term, chapter) {
  const time = vocabularyTimePng(term, chapter)
  if (time) return time
  const existing = vocabularyPngIllustration(term, chapter)
  if (existing) return existing
  const original = vocabularyOriginalScene(term, chapter)
  if (original) return original
  const library = vocabularyLibraryIllustration(term, chapter)
  if (library) return library
  return null
}
