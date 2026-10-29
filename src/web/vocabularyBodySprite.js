// Curated HD raster drawings: individual cropped assets from four matching
// educational illustration sheets, arranged in an 8x4 raster atlas.
// Each 408x254 tile is about twice the old resolution, with labels separate.
const terms = [
  "head",
  "face",
  "forehead",
  "eyes",
  "eyebrow",
  "eyelashes",
  "eyelid",
  "pupil",
  "iris",
  "nose",
  "nostrils",
  "cheek",
  "mouth",
  "lips",
  "chin",
  "tooth / teeth (plural)",
  "neck",
  "shoulder (body)",
  "arm",
  "elbow",
  "wrist",
  "hand",
  "finger",
  "thumb",
  "leg",
  "thigh",
  "knee",
  "shin",
  "ankle",
  "foot",
  "toe"
]
const positions = new Map(terms.map((term,index)=>[term,index]))
export function vocabularyBodySprite(term, chapter) {
  if (chapter !== 14) return null
  const key = String(term).trim().toLowerCase()
  const index = positions.get(key)
  return index === undefined ? null : {
    type: 'body-sprite', term: key, index,
    src: import.meta.env.BASE_URL + 'vocabulary-art/body-14-hd.webp',
  }
}
