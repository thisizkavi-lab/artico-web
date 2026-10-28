import { vocabularyActionPng } from './vocabularyActionPng'
import { combinedVocabulary } from './vocabularyDedup'
import { vocabularyTimePng } from './vocabularyTimePng'
import { vocabularyPngIllustration } from './vocabularyPngArtwork'
import { vocabularyOriginalScene } from './vocabularyOriginalScenes'
import { vocabularyLibraryIllustration } from './vocabularyLibraryArtwork'

// Artwork for Lessons 3–78 is now image-only. No inline SVG, generated
// icon, procedural symbol, or cross-topic guessed image reaches a card.
// Original educational PNGs take precedence over third-party raster art.
function artworkFor(term, chapter) {
  const action = vocabularyActionPng(term, chapter)
  if (action) return action
  const time = vocabularyTimePng(term, chapter)
  if (time) return time
  const existing = vocabularyPngIllustration(term, chapter)
  if (existing) return existing
  const original = vocabularyOriginalScene(term, chapter)
  if (original) return original
  return vocabularyLibraryIllustration(term, chapter)
}

export function vocabularyVisual(term, chapter) {
  const direct = artworkFor(term, chapter)
  if (direct) return direct

  // The vocabulary editor combines *reviewed equivalent expressions* into
  // one card (eat breakfast / have breakfast, etc.). Resolve the original
  // editorial headword so its picture stays on the combined card. Never split
  // arbitrary slash expressions: those may contrast different meanings.
  const match = Object.entries(combinedVocabulary).find(([key, combined]) =>
    key.startsWith(chapter + ':') && combined === term)
  return match ? artworkFor(match[0].slice(String(chapter).length + 1), chapter) : null
}
