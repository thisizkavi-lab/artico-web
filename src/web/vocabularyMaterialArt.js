// Lesson 05 materials: direct, commercially reusable internet artwork and material textures.
// Meshy textures are CC0; the material collage is CC0; SVG Repo bottle vectors are CC0.
// Images stay in the standard vocabulary card. English/Japanese labels and audio remain separate.
const art = {
  'material / materials (plural)': {
    type: 'library-png',
    src: 'https://www.publicdomainpictures.net/pictures/780000/velka/material-texture-collage-1776848321uoZ.jpg',
  },
  denim: {
    type: 'png',
    src: 'https://cdn.meshy.ai/landing-assets/textures/fabric/washed-blue-denim/washed-blue-denim-2k.jpg',
  },
  fabric: {
    type: 'png',
    src: 'https://cdn.meshy.ai/landing-assets/textures/fabric/natural-linen-weave/natural-linen-weave-2k.jpg',
  },
  glass: {
    type: 'library-png',
    src: 'https://www.svgrepo.com/download/166157/drink-in-transparent-glass-bottle.svg',
  },
  leather: {
    type: 'png',
    src: 'https://cdn.meshy.ai/landing-assets/textures/leather/brown-leather/brown-leather-2k.jpg',
  },
  metal: {
    type: 'png',
    src: 'https://cdn.meshy.ai/landing-assets/textures/metal/brushed-stainless-steel/brushed-stainless-steel-2k.jpg',
  },
  paper: {
    type: 'png',
    src: 'https://cdn.meshy.ai/landing-assets/textures/paper/crumpled-white-paper/crumpled-white-paper-2k.jpg',
  },
  plastic: {
    type: 'library-png',
    src: 'https://www.svgrepo.com/download/462300/plastic-bottle.svg',
  },
  silk: {
    type: 'png',
    src: 'https://www.publicdomainpictures.net/pictures/620000/velka/textil-seide-hintergrund-textur-1717793189VVB.jpg',
  },
}

export function vocabularyMaterialArt(term, chapter) {
  if (chapter !== 5) return null
  return art[term] ?? null
}
