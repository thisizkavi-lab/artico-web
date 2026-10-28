// One original visual scene for each distinct workplace/commuting action.
// Artco language labels live outside the image for Study and Practice reuse.
export const actionSceneTerms = [
 'arrive late','catch the bus','catch the train','commute',
 'drive','go to school','go to work','start work',
 'finish work','leave work','work from home','overtime',
 'do homework','have a break','leave the house','go home',
]
const actions = new Set(actionSceneTerms)

export function vocabularyActionPng(term, chapter) {
  const key=term.toLowerCase().trim()
  if (chapter!==4 || !actions.has(key)) return null
  return {
    type:'png',
    src:import.meta.env.BASE_URL+'vocabulary-ai/ch04/'+key.replaceAll(' ','-')+'.png',
  }
}
