import manifest from './vocabularyDailyRoutineSources.json'

// Real-life photos with source links and licensing kept in the companion catalog.
// Every requested Lesson 04 vocabulary card maps to a specific photo; exact
// merged expressions share the same scene as their original headword.
export function vocabularyDailyRoutineInternet(term, chapter) {
  if (chapter !== 4) return null
  const key = String(term).toLocaleLowerCase('en').trim()
  const original = manifest.aliases[key] || key
  const photo = manifest.entries[original]
  if (!photo) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-curated-04/' + photo.file + '.webp',
  }
}
