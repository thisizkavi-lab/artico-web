// Twenty self-contained comparative images composed from commercially reusable Kitbitz CC0 drawings.
const words = new Set(["big","little","small","deep","shallow","high","low","long","short","narrow","thick","thin","heavy","light","far","near","height","size","weight","shape"])
export function vocabularyDimensionsArt(term, chapter) {
  if (chapter !== 5 || !words.has(term)) return null
  return {type:'png',src:import.meta.env.BASE_URL+'vocabulary-dimensions/05/'+term+'.svg'}
}
