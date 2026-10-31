// Lesson 05 — nine deliberately paired editorial illustrations.
// They use scalable image files instead of inline SVG, so edges stay sharp.
// Resolve "cold (temperature)" to the illustration named cold.svg.
const physicalPropertyWords = new Set([
  'clean', 'dirty', 'cold', 'hot', 'loose', 'tight', 'loud', 'quiet', 'sharp',
])

export function vocabularyPhysicalPropertiesArt(term, chapter) {
  if (chapter !== 5) return null
  const slug = term === 'cold (temperature)' ? 'cold' : term
  if (!physicalPropertyWords.has(slug)) return null
  return {
    type: 'library-png', // existing card renderer: object-fit contain, no clipping
    src: import.meta.env.BASE_URL + 'vocabulary-physical-properties/05/' + slug + '.svg',
  }
}
