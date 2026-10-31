import manifest from './vocabularyDailyRoutineSources.json'

// Original Artico illustrations take precedence for the requested Daily Routines cards.
// "wash the dishes" is an editorial alias of "do the dishes", so both use one scene.
const articoScenes = {
  'run errands': 'run-errands-artico-v3.webp',
  'clear the table': 'clear-the-table-artico-v1.webp',
  'dishes': 'dishes-artico-v1.webp',
  'do the dishes': 'do-the-dishes-artico-v1.webp',
  'do the laundry': 'do-laundry-artico-v1.webp',
}

export function vocabularyDailyRoutineInternet(term, chapter) {
  if (chapter !== 4) return null
  const key = String(term).toLocaleLowerCase('en').trim()
  const original = manifest.aliases[key] || key
  const illustration = articoScenes[original]
  if (illustration) {
    return {
      type: 'png',
      src: import.meta.env.BASE_URL + 'vocabulary-curated-04/' + illustration,
    }
  }
  const photo = manifest.entries[original]
  if (!photo) return null
  const artFile = photo.generationBatch === 'work-errands-10'
    ? photo.file + '-illustrated-v2.webp'
    : photo.file + '.webp'
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-curated-04/' + artFile,
  }
}
