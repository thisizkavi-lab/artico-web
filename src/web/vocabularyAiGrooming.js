// Context-reviewed artwork cropped from the original 4×4 AI-painted
// personal-care and morning-routine picture sheet. PNG only, no SVG.
const entries={
  '4:alarm goes off':'alarm-goes-off',
  '4:wake up':'wake-up',
  '4:get up':'get-up',
  '4:get ready':'get-ready',
  '4:get dressed':'get-dressed',
  '4:brush your hair':'brush-your-hair',
  '4:brush your teeth':'brush-your-teeth',
  '4:dry your hair':'dry-your-hair',
  '4:put on make-up':'put-on-makeup',
  '4:shave':'shave',
  '4:bath':'take-a-bath',
  '4:shower':'take-a-shower',
  '4:take a bath / have a bath (also common in uk)':'take-a-bath',
  '4:take a shower / have a shower (also common in uk)':'take-a-shower',
  '4:make breakfast':'make-breakfast',
  '4:breakfast':'eat-breakfast',
  '4:eat breakfast':'eat-breakfast',
  '4:lunch':'eat-lunch',
  '4:eat lunch':'eat-lunch',
  '4:dinner':'eat-dinner',
  '4:eat dinner':'eat-dinner',
}
export function vocabularyAiGrooming(term,chapter){
  const file=entries[chapter+':'+term.toLowerCase().trim()]
  return file?{type:'png',src:import.meta.env.BASE_URL+'vocabulary-ai/grooming/'+file+'.png'}:null
}
