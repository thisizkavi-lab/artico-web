import { vocabularyCourseArt, vocabularyCourseTextOnly } from './vocabularyCourseArt'
import { vocabularyDimensionsArt } from './vocabularyDimensionsArt'
import { vocabularyAiGrooming } from './vocabularyAiGrooming'
import { vocabularyAiFood } from './vocabularyAiFood'
import { vocabularyAiScene } from './vocabularyAiScene'
import { vocabularyActionPng } from './vocabularyActionPng'
import { combinedVocabulary } from './vocabularyDedup'
import { vocabularyTimePng } from './vocabularyTimePng'
import { vocabularyPngIllustration } from './vocabularyPngArtwork'
import { vocabularyDailyRoutineExtra } from './vocabularyDailyRoutineExtra'
import { vocabularyDailyRoutineInternet } from './vocabularyDailyRoutineInternet'
import { vocabularyOriginalScene } from './vocabularyOriginalScenes'
import { vocabularyLibraryIllustration } from './vocabularyLibraryArtwork'
import { vocabularyBodyIllustration } from './VocabularyBodyArt'
import { vocabularyBodySprite } from './vocabularyBodySprite'
import { vocabularyBodyMotion } from './VocabularyBodyMotion'

// Lesson 05 uses simple inline SVG swatches, matching the visual reference.
const colorSwatches = {
  black: { color: '#202124', variant: 0 },
  blue: { color: '#2e6cf2', variant: 1 },
  brown: { color: '#755030', variant: 3 },
  'cream (color)': { color: '#f1e6d1', variant: 2 },
  'dark green': { color: '#1e6847', variant: 0 },
  gray: { color: '#9b9b9b', variant: 1 },
  green: { color: '#258d50', variant: 2 },
  'navy blue': { color: '#263c70', variant: 3 },
  'orange (color)': { color: '#ee8b27', variant: 0 },
  'pale green': { color: '#bdd7a7', variant: 1 },
  pink: { color: '#e6a1b6', variant: 2 },
  purple: { color: '#8354b5', variant: 3 },
  red: { color: '#c02b2d', variant: 0 },
  yellow: { color: '#f8d849', variant: 2 },
}

// Artwork for Lessons 3–78 uses dedicated course illustrations, approved raster sprites,
// or reviewed PNG illustrations.
// Dedicated course illustrations take precedence over all legacy art.
function artworkFor(term, chapter) {
  if (vocabularyCourseTextOnly(term, chapter)) return null
  const bodyMotion = vocabularyBodyMotion(term, chapter)
  if (bodyMotion) return bodyMotion
  const course = vocabularyCourseArt(term, chapter)
  if (course) return course
  const dimension = vocabularyDimensionsArt(term, chapter)
  if (dimension) return dimension
  const curatedInternet = vocabularyDailyRoutineInternet(term, chapter)
  if (curatedInternet) return curatedInternet
  const dailyEditorial = vocabularyDailyRoutineExtra(term, chapter)
  if (dailyEditorial) return dailyEditorial
  const approvedBody = vocabularyBodySprite(term, chapter)
  if (approvedBody) return approvedBody
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
  if (chapter === 5 && colorSwatches[term]) {
    const swatch = colorSwatches[term]
    return { type: 'color-swatch', term: term.replace(/ \(color\)$/i, ''), ...swatch }
  }
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
