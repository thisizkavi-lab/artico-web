// Lesson 04: curated, scalable illustrations from OpenMoji 17.0.
// CC BY-SA 4.0, https://openmoji.org/ — attribution in
// public/vocabulary-art-internet/ATTRIBUTION.md.
// "solo" = an object, "set" = related objects, "path" = an action or transition.
// Source terms remain unchanged. Icons are decoration, not substitute vocabulary text.
const SCENES = {
  // Getting ready: distinguish a facility/object from using it.
  'bath':['solo','1F6C1'],
  'shower':['solo','1F6BF'],
  'take a bath / have a bath (also common in uk)':['solo','1F6C0'],
  'take a shower / have a shower (also common in uk)':['path','1F9D1','1F6BF'],

  // Meals: noun = food; action = a meal/utensil or preparation.
  'breakfast':['set','1F950','1F963'],
  'lunch':['set','1F96A','1F34E'],
  'dinner':['set','1F372','1F37D'],
  'coffee':['solo','2615'],
  'tea':['solo','1F375'],
  'eat breakfast':['path','1F374','1F963'],
  'have breakfast':['path','1F374','1F963'],
  'eat lunch':['path','1F374','1F96A'],
  'have lunch':['path','1F374','1F96A'],
  'eat dinner':['path','1F374','1F372'],
  'have dinner':['path','1F374','1F372'],
  'make breakfast':['path','1F95A','1F373'],
  'cook dinner':['path','1F373','1F372'],
  'drink tea or coffee':['set','1F375','2615'],
  'have tea or coffee':['set','1F375','2615'],

  // Work and travel: actions are separated from the places or vehicles.
  'arrive late':['path','1F3C3','1F553'],
  'catch the bus':['path','1F3C3','1F68C'],
  'catch the train':['path','1F3C3','1F686'],
  'commute':['path','1F3E0','1F68C','1F3E2'],
  'drive':['set','1F9D1','1F697'],
  'go to school':['path','1F6B6','1F3EB'],
  'go to work':['path','1F6B6','1F3E2'],
  'start work':['path','1F551','1F4BB'],
  'finish work':['path','1F4BB','2705'],
  'leave work':['path','1F3E2','1F6B6'],
  'work from home':['set','1F3E0','1F4BB'],
  'overtime':['set','1F319','1F4BB'],
  'school':['solo','1F3EB'],
  'do homework':['path','270F','1F4D6'],
  'homework':['set','1F4DA','1F4DD'],
  'have a break':['set','1F375','1F551'],
  'leave the house':['path','1F3E0','1F6B6'],
  'go home':['path','1F6B6','1F3E0'],

  // Household: tools + target object make the verb legible.
  'buy groceries':['set','1F6D2','1F955','1F34E'],
  'run errands':['path','1F4DD','1F6CD'],
  'clear the table':['path','1F37D','2705'],
  'dishes':['solo','1F37D'],
  'do the dishes':['set','1F37D','1F9FD'],
  'wash the dishes':['set','1F37D','1F9FD'],
  'do the housework':['path','1F9F9','2705'],
  'housework':['set','1F9F9','1F9FA'],
  'iron a shirt':['iron','1F455'],
  'make the bed':['path','1F6CF','2705'],
  'take out the trash':['path','1F5D1','1F6AA'],
  'feed the cat':['set','1F408','1F963'],
  'feed the dog':['set','1F415','1F963'],
  'walk the dog':['set','1F6B6','1F415'],

  // People, places and evening.
  'café':['set','2615','1F950'],
  'go to a café':['path','1F6B6','2615'],
  'friends':['solo','1F46B'],
  'call a friend':['set','1F4F1','1F9D1'],
  'call your family':['set','1F4F1','1F46A'],
  'check your emails':['set','1F4E7','2705'],
  'check email':['set','1F4E7','2705'],
  'go out':['path','1F6AA','1F6B6'],
  'listen to the radio':['solo','1F4FB'],
  'read a newspaper':['solo','1F4F0'],
  'bed':['solo','1F6CF'],
  'go to bed':['path','1F634','1F6CF'],
  'put the children to bed':['path','1F9D2','1F6CF'],
}

// Pinned release of an openly licensed, consistent vector illustration library.
// These remain crisp at every screen density. Do not scrape or hotlink random art.
const ROOT = 'https://cdn.jsdelivr.net/npm/openmoji@17.0.0/color/svg/'
const JOINED = {
  'eat breakfast / have breakfast':'eat breakfast',
  'eat lunch / have lunch':'eat lunch',
  'eat dinner / have dinner':'eat dinner',
  'do the dishes / wash the dishes':'do the dishes',
  'drink tea or coffee / have tea or coffee':'drink tea or coffee',
  'check your emails / check email':'check your emails',
}
export function vocabularyDailyRoutineInternet(term, chapter) {
  if (chapter !== 4) return null
  const key = String(term).toLowerCase().trim()
  const scene = SCENES[key] ?? SCENES[JOINED[key]]
  if (!scene) return null
  return { type: 'routine-web', mode: scene[0], icons: scene.slice(1).map(code => ROOT + code + '.svg') }
}
