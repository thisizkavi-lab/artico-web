// Original AI-painted instructional scenes cropped from a coherent 20-panel
// daily-routine illustration sheet. Each PNG is committed to the repository.
// Map only if the depicted action actually supports the vocabulary meaning.
const scenes = {
  '4:wake up': 'wake-up',
  '4:get up': 'get-up',
  '4:brush your teeth': 'brush-your-teeth',
  '4:take a shower / have a shower (also common in uk)': 'take-a-shower',
  '4:shower': 'take-a-shower',
  '4:get dressed': 'get-dressed',
  '4:breakfast': 'eat-breakfast',
  '4:eat breakfast': 'eat-breakfast',
  '4:lunch': 'have-lunch',
  '4:eat lunch': 'have-lunch',
  '4:dinner': 'eat-dinner',
  '4:eat dinner': 'eat-dinner',
  '4:go to work': 'go-to-work',
  '4:have a break': 'take-a-break',
  '4:go home': 'go-home',
  '4:cook dinner': 'cook-dinner',
  '4:do homework': 'do-homework',
  '4:homework': 'do-homework',
  '4:go to bed': 'go-to-bed',
  '4:leave the house': 'leave-home',
  '4:catch the bus': 'catch-the-bus',
  '4:dishes': 'do-the-dishes',
  '4:do the dishes': 'do-the-dishes',
  '11:dishes': 'do-the-dishes',
  '11:do the dishes': 'do-the-dishes',
  '11:do the laundry': 'do-laundry',
  '11:laundry': 'do-laundry',
  '21:coworker': 'work-with-coworker',
  '34:coworker': 'work-with-coworker',
  '35:co-worker': 'work-with-coworker',
  '4:bed': 'go-to-bed',
  '34:work': 'work',
}

// Old converted-symbol PNGs should not override these original scenes.
export function vocabularyAiScene(term, chapter) {
  const asset = scenes[String(chapter) + ':' + term.toLowerCase().trim()]
  return asset ? {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-ai/ch04/sheet/' + asset + '.png',
  } : null
}
