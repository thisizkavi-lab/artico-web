// Curated, meaning-specific pictures cropped from Artico's original
// AI-painted six-panel food sheets. Assets are generated locally on CI.
const pictures = {
  '28:meat':'meat',
  '28:fish':'fish',
  '28:chicken':'chicken',
  '28:egg / eggs (plural)':'egg',
  '28:milk':'milk',
  '28:cheese':'cheese',
  '28:yogurt':'yogurt',
  '28:butter':'butter',
  '29:fruit':'fruit',
  '30:vegetables':'vegetables',
  '30:potato / potatoes':'potato',
  '30:onion / onions':'onion',
  '30:garlic':'garlic',
  '30:tomato / tomatoes':'tomato',
  '30:cucumber / cucumbers':'cucumber',
  '30:lettuce':'lettuce',
  '30:carrot / carrots':'carrot',
  '30:pepper / peppers':'pepper',
  '30:eggplants':'eggplant',
  '31:rice':'rice',
  '31:bread':'bread',
  '31:pasta':'pasta',
  '31:spaghetti':'pasta',
  '31:noodles':'noodles',
  '31:ginger':'ginger',
  '31:butter':'butter',
}
export function vocabularyAiFood(term,chapter) {
  const image=pictures[chapter+':'+term.toLowerCase().trim()]
  return image ? {type:'png',src:import.meta.env.BASE_URL+'vocabulary-ai/food/'+image+'.png'} : null
}
