import catalog from './vocabularyCatalog.json'
import organized from './vocabularyOrganized.json'
import { vocabularyTermKey, normalizeVocabularyTerm as normalize } from './vocabularyIdentity.js'

// A spelling is not automatically a meaning. These are explicitly reviewed
// homographs and food/animal distinctions; all other exact repeats are
// referenced, not taught as another new card.
// Related expressions that teach the same action are combined on one card,
// retaining both useful American-English forms instead of repeating a picture.
const editorialFamilies = {
 4: [
  ['eat breakfast','have breakfast'],
  ['eat lunch','have lunch'],
  ['eat dinner','have dinner'],
  ['do the dishes','wash the dishes'],
  ['drink tea or coffee','have tea or coffee'],
  ['check your emails','check email'],
 ],
 8: [
  ['be on the fence','on the fence','sit on the fence'],
  ['cold feet','get cold feet'],
  ['have a heart of gold','heart of gold'],
 ],
}
export const combinedVocabulary = Object.fromEntries(
 Object.entries(editorialFamilies).flatMap(([chapter,families]) =>
   families.map(family => [chapter+':'+family[0],family.join(' / ')])),
)
function mergeLessonSynonyms(items,chapter) {
 const groups=editorialFamilies[chapter] || []
 if(!groups.length)return items
 const byTerm=new Map(items.map(item=>[normalize(item[0]),item]))
 const hidden=new Set()
 const results=[]
 for(const entry of items) {
  const key=normalize(entry[0])
  if(hidden.has(key))continue
  const family=groups.find(group=>group[0]===key && group.every(member=>byTerm.has(member)))
  if(family){
   family.forEach(word=>hidden.add(word))
   results.push([family.join(' / '),...entry.slice(1)])
  }else if(!groups.some(group=>group[0]!==key&&group.includes(key)&&group.every(member=>byTerm.has(member)))){
   results.push(entry)
  }
 }
 return results
}

const registry = new Map()
function insert(term, chapter, group, index) {
  const key = vocabularyTermKey(term,chapter)
  if (!registry.has(key)) registry.set(key,{chapter,group,index,term})
}
for (const lesson of catalog.topics.slice(0,2)) {
  const items=[...lesson.core,...lesson.extra]
  items.forEach((term,index)=>insert(term,lesson.sourceLesson,'Source vocabulary',index))
}
for (const lesson of organized.lessons)
  for (const [groupIndex,group] of lesson.groups.entries())
    group.items.forEach(([term],index)=>insert(term,lesson.sourceLesson,group.title,index))

export function vocabularyFirstOccurrence(term, chapter) {
  return registry.get(vocabularyTermKey(term,chapter)) || null
}
export function organizeVocabularyGroup(items, chapter) {
  const fresh=[],revisited=[]
  for(const item of mergeLessonSynonyms(items,chapter)) {
    const first=vocabularyFirstOccurrence(item[0],chapter)
    if (!first || first.chapter === chapter) fresh.push(item)
    else revisited.push({ term:item[0],firstChapter:first.chapter })
  }
  return {fresh,revisited}
}
export function vocabularyDedupSummary() {
  return organized.lessons.map(lesson=>{
    let newWords=0,reviewWords=0
    for (const group of lesson.groups) {
      const {fresh,revisited}=organizeVocabularyGroup(group.items,lesson.sourceLesson)
      newWords+=fresh.length;reviewWords+=revisited.length
    }
    return {lesson:lesson.sourceLesson,newWords,reviewWords}
  })
}
