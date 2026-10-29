import { vocabularyAiGrooming } from './vocabularyAiGrooming'
import { vocabularyAiFood } from './vocabularyAiFood'
import { vocabularyAiScene } from './vocabularyAiScene'
import { vocabularyActionPng } from './vocabularyActionPng'
import { combinedVocabulary } from './vocabularyDedup'
import { vocabularyTimePng } from './vocabularyTimePng'
import { vocabularyPngIllustration } from './vocabularyPngArtwork'
import { vocabularyOriginalScene } from './vocabularyOriginalScenes'
import { vocabularyLibraryIllustration } from './vocabularyLibraryArtwork'
import { vocabularyBodyIllustration } from './VocabularyBodyArt'

// Most vocabulary cards use reviewed PNG illustrations. Lesson 14 is the
// intentional exception: semantic vector drawings allow subtle, accessible
// motions for gestures and breathing without raster/GIF sprite artifacts.
// No cross-topic guessed picture reaches a card.
function artworkFor(term, chapter) {
  const body = vocabularyBodyIllustration(term, chapter)
  if (body) return body
  const grooming = vocabularyAiGrooming(term, chapter)
  if (grooming) return grooming
  const painted = vocabularyAiScene(term, chapter)
  if (painted) return painted
  const food = vocabularyAiFood(term, chapter)
  if (food) return food
  const action = vocabularyActionPng(term, chapter)
  if (action) return action
  const time = vocabularyTimePng(term, chapter)
  if (time) return time
  const existing = vocabularyPngIllustration(term, chapter)
  if (existing) return existing
  const original = vocabularyOriginalScene(term, chapter)
  if (original) return original
  // Daily Routines is transitioning to original scene artwork. Do not display
  // converted icon/SVG pictograms in this lesson: ambiguous visuals misteach actions.
  if (chapter === 4) return null
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
