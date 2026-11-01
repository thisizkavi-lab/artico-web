import courseSource from './other-half-source.md?raw'

export const otherHalfGroups = [
  { id:'words', label:'WORDS IN MOTION', title:'Words in motion', description:'Slang, its origins, its social life, and the expressions people actually encounter.' },
  { id:'context', label:'CONTEXT & CONVERSATION', title:'Context and conversation', description:'Formality, implied meaning, and the small patterns that hold spoken English together.' },
  { id:'social', label:'SOCIAL MEANING', title:'Social meaning', description:'Humor, taboo language, and the cultural knowledge speakers assume is shared.' },
  { id:'culture', label:'CULTURE & VARIATION', title:'Culture and variation', description:'The language of communities, workplaces, and specialized domains.' },
  { id:'living', label:'THE LIVING SYSTEM', title:'The living system', description:'How language changes, and how voice and body shape what people mean.' },
]

const chapterMeta = [
  { number:1, group:'words', title:'The map of slang', shortTitle:'Complete map of slang', subtitle:'What slang is, where it begins, and how it spreads.', takeaway:'Understand the life cycle of informal words before deciding whether to use them.' },
  { number:2, group:'words', title:'Slang in everyday use', shortTitle:'Exhaustive slang list', subtitle:'A broad, searchable reference to common General American English slang.', takeaway:'Meaning is only half the story. Origin, audience, and register matter too.' },
  { number:3, group:'words', title:'Adult & explicit slang', shortTitle:'18+ / explicit slang', subtitle:'An uncensored recognition guide to vulgar, sexual, and adult expressions.', takeaway:'Recognize the meaning and social weight. Production is optional.', tag:'ADULT LANGUAGE' },
  { number:4, group:'context', title:'Register & social calibration', shortTitle:'Register and social calibration', subtitle:'Why the same sentence changes with the situation.', takeaway:'Match language to power, distance, solidarity, setting, and channel.' },
  { number:5, group:'context', title:'Meaning beyond words', shortTitle:'Pragmatics', subtitle:'How speakers imply more than they say.', takeaway:'Interpret words together with context, relationships, and shared knowledge.' },
  { number:6, group:'context', title:'The grammar of conversation', shortTitle:'Discourse and spoken grammar', subtitle:'The small patterns that organize actual speech.', takeaway:'Natural speech is planned in real time. Fillers, fragments, and self-repair are normal.' },
  { number:7, group:'social', title:'Humor, sarcasm & playfulness', shortTitle:'Humor, sarcasm, and playfulness', subtitle:'How non-literal language can connect, tease, soften, or offend.', takeaway:'Read tone, context, facial expression, and relationship before taking a remark literally.' },
  { number:8, group:'social', title:'Taboo language & swearing', shortTitle:'Taboo language and swearing', subtitle:'What restricted words do, and why their social force changes.', takeaway:'Function, intensity, direction, audience, and setting determine social risk.' },
  { number:9, group:'social', title:'Cultural references & shared knowledge', shortTitle:'Cultural references and shared knowledge', subtitle:'How a short reference can carry a much larger meaning.', takeaway:'Recognize when a comprehension gap is cultural rather than grammatical.' },
  { number:10, group:'culture', title:'Regional & social variation', shortTitle:'Regional and social variation', subtitle:'How English differs across regions and social groups.', takeaway:'This topic appears in the source contents, but its chapter text was not supplied.', missing:true },
  { number:11, group:'culture', title:'Language of domains & subcultures', shortTitle:'Domains and subcultures', subtitle:'The specialized language that helps groups work, coordinate, and belong.', takeaway:'Learn the language of the domains you enter. General English is not enough.' },
  { number:12, group:'living', title:'How language changes', shortTitle:'Language change in real time', subtitle:'Why a living language never stays fixed.', takeaway:'Notice new forms, meaning shifts, frequency changes, and obsolescence.' },
  { number:13, group:'living', title:'Voice, gesture & silence', shortTitle:'Nonverbal and paralinguistic signals', subtitle:'The signals that shape meaning beyond the words.', takeaway:'Tone, timing, face, gesture, posture, and distance all contribute to interpretation.' },
]

const sourceMarkers = {
  1:'# 1. Complete Map of Slangs',
  2:'# 2. Exhaustive Slang List',
  3:'# 3. 18+ / Explicit Slang List',
  4:'# 4. Register and Social Calibration',
  5:'# 5. Pragmatics: Meaning Beyond Words',
  6:'# 6. Discourse Markers, Fillers, and Spoken Grammar',
  7:'# 7. Humor, Sarcasm, and Playfulness',
  8:'# 8. Taboo Language and Swearing',
  9:'# Cultural References and Shared Knowledge in General American English',
  11:'# Language of Specific Domains and Subcultures in American English',
  12:'# 12. How Language Changes in Real Time',
  13:'# 13. Nonverbal and Paralinguistic Signals',
}
const sourceOrder = [1,2,3,4,5,6,7,8,9,11,12,13]

function extractChapter(number) {
  const marker = sourceMarkers[number]
  if (!marker) return ''
  const start = courseSource.indexOf(marker)
  if (start < 0) return ''
  const position = sourceOrder.indexOf(number)
  const nextNumber = sourceOrder[position + 1]
  const nextStart = nextNumber ? courseSource.indexOf(sourceMarkers[nextNumber], start + marker.length) : -1
  return courseSource.slice(start, nextStart < 0 ? courseSource.length : nextStart).trim()
}

export const otherHalfChapters = chapterMeta.map(chapter => ({
  ...chapter,
  markdown: chapter.missing ? '' : extractChapter(chapter.number),
}))

export const otherHalfIntro = [
  {
    label:'THE TEXTBOOK HALF',
    title:'The system is necessary.',
    paragraphs:[
      'Most English materials teach one half of the language.',
      'They teach grammar. They teach vocabulary. They teach the forms that appear in textbooks.',
      'That half is necessary. It gives you the system. It lets you build sentences that are clear and standard.',
    ],
  },
  {
    label:'THE OTHER HALF',
    title:'Meaning changes with the situation.',
    paragraphs:[
      'A large part of real English never appears in that half. People adjust their language according to the situation. They leave meaning unstated. They use forms that shift or disappear. They rely on knowledge that is never explained in class. They signal attitude through tone, timing, and small choices.',
      'If you only know the textbook half, you can understand the words and still miss what is happening. You can follow the grammar and still feel outside the conversation.',
    ],
  },
  {
    label:'THE PURPOSE',
    title:'Recognition, not imitation.',
    paragraphs:[
      'This section is the other half.',
      'It does not teach you how to speak. It does not train pace, delivery, or performance. It informs you. It shows you what exists in real American English that most materials leave out. The purpose is recognition. When you encounter something a textbook never mentioned, you will have a clearer idea of what it is and what it is doing.',
      'You are not expected to start using these forms. Many of them are better understood than produced. Some change quickly. Some belong only to certain groups or moments. Knowing they exist is already useful.',
    ],
  },
  {
    label:'THE TERRITORY',
    title:'The parts that usually stay invisible.',
    paragraphs:[
      'In this section we look at slang and how it moves. We look at how speakers adjust formality. We look at meaning that is implied rather than said. We look at the patterns that hold spoken English together. We look at humor, sarcasm, and play. We look at taboo language and its uses. We look at cultural knowledge that speakers assume is shared. We look at differences by region and social group. We look at specialized language in work and communities. We look at how English changes while people are using it. We look at tone, face, gesture, and silence.',
      'These are the parts that usually stay invisible in regular materials. They are not a replacement for grammar or vocabulary study. They are the information that helps the other half make sense in real life.',
    ],
  },
  {
    label:'HOW TO USE IT',
    title:'Read in any order.',
    paragraphs:[
      'You can read the parts in any order. Start with whatever you already notice around you. The goal is simply to see more of what is already there.',
    ],
  },
]

export const otherHalfTopics = [
  ['Slang and how it moves','Where informal words begin, how they spread, and what happens to them.'],
  ['Register and social calibration','How speakers adjust formality to the relationship and situation.'],
  ['Meaning beyond words','Requests, refusals, implications, and information left unstated.'],
  ['The grammar of conversation','Markers, fillers, backchannels, turn-taking, and spoken patterns.'],
  ['Humor and play','Teasing, irony, sarcasm, and the cues that make them recognizable.'],
  ['Taboo language','The functions, intensity, and social limits of swearing.'],
  ['Shared cultural knowledge','References that speakers expect other people to recognize.'],
  ['Regional and social variation','Differences across places and social groups.'],
  ['Domains and subcultures','Specialized language in work, research, sports, gaming, and hobbies.'],
  ['Voice and body','Tone, timing, facial expression, gesture, posture, and silence.'],
]
