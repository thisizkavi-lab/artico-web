import manifest from './vocabularyDailyRoutineSources.json'
// Only meaningful, verified images are used. Others retain existing Artico art.
const aliases={
 'eat breakfast / have breakfast':'eat breakfast',
 'eat lunch / have lunch':'eat lunch',
 'eat dinner / have dinner':'eat dinner',
 'do the dishes / wash the dishes':'do the dishes',
}
export function vocabularyDailyRoutineInternet(term,chapter){
 if(chapter!==4) return null
 const key=String(term).toLocaleLowerCase('en').trim()
 const art=manifest.entries[key]||manifest.entries[aliases[key]]
 return art?{type:'png',src:import.meta.env.BASE_URL+'vocabulary-curated-04/'+art.file+'.webp'}:null
}
