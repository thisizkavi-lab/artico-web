// Original, independently illustrated action scenes; never fall back to an unrelated icon.
const actions = new Set(['arrive late','catch the bus','catch the train','commute'])
export function vocabularyActionPng(term,chapter) {
  const key=term.toLowerCase().trim()
  if (chapter!==4 || !actions.has(key)) return null
  return {type:'png',src:import.meta.env.BASE_URL+'vocabulary-ai/ch04/'+key.replaceAll(' ','-')+'.png'}
}
