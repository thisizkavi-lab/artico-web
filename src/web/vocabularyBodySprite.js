// Cropped from the approved Artico body-vocabulary illustration sheet.
// Each tile is raster art (not an SVG); labels remain separate for translation.
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
    src: import.meta.env.BASE_URL + 'vocabulary-art/body-14.webp',
  }
}
