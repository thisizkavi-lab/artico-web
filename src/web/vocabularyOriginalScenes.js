import manifest from './vocabularyOriginalScenes.json'

// Per-term, chapter-specific original illustrations, rasterized to PNG during CI.
// Only a curated scene spec can resolve: never infer a picture from a loose substring.
export function vocabularyOriginalScene(term, chapter) {
  const spec = manifest.entries[chapter + ':' + term]
  if (!spec) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-symbols/original/' +
      chapter + '-' + spec.kind + '-' + spec.scene + '.png',
  }
}
