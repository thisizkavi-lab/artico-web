// Orientation goals, future English-speaking selves, and a deliberately
// transparent scoring rule. This is a prompt for reflection, not a personality test.
export const ORIENTATION_RESPONSE_KEY = 'foundation-orientation-profile'

export const choices = {
  context: [
    { id:'friends', ja:'友人や新しい人との会話', en:'Friends & new people', sceneJa:'人との会話', sceneEn:'conversations with people', weights:{ conversationalist:2, storyteller:1 } },
    { id:'travel', ja:'旅行や初めての場所', en:'Travel & new places', sceneJa:'旅先', sceneEn:'while travelling', weights:{ explorer:2, conversationalist:1 } },
    { id:'ideas', ja:'学び・アイデア・議論', en:'Learning & exchanging ideas', sceneJa:'学びや議論', sceneEn:'while learning and discussing ideas', weights:{ thinker:2, storyteller:1 } },
    { id:'work', ja:'仕事や共同作業', en:'Work & collaboration', sceneJa:'仕事や共同作業', sceneEn:'at work', weights:{ collaborator:2, thinker:1 } },
    { id:'online', ja:'オンラインのつながり', en:'Online communities', sceneJa:'オンラインでの交流', sceneEn:'online', weights:{ storyteller:1, thinker:1, conversationalist:1 } },
    { id:'daily', ja:'毎日の生活', en:'Everyday life', sceneJa:'日常生活', sceneEn:'in everyday life', weights:{ explorer:1, conversationalist:1 } },
  ],
  goal: [
    { id:'connect', ja:'人と自然に打ち解けたい', en:'Connect naturally with people', wantJa:'相手と自然に話し、つながりを深める', wantEn:'connect with people naturally', weights:{ conversationalist:4 } },
    { id:'exchange', ja:'考えを交わしてみたい', en:'Exchange ideas and opinions', wantJa:'自分の考えを伝え、相手の意見を聞く', wantEn:'exchange ideas and opinions', weights:{ thinker:4 } },
    { id:'share', ja:'自分の話を面白く伝えたい', en:'Tell stories that sound like me', wantJa:'自分の経験や話を伝える', wantEn:'tell stories in my own voice', weights:{ storyteller:4 } },
    { id:'explore', ja:'知らない場面でも自分で動きたい', en:'Find my way in new situations', wantJa:'初めての場面でも自分で行動する', wantEn:'find my way through new situations', weights:{ explorer:4 } },
    { id:'build', ja:'人と一緒に何かを進めたい', en:'Work through things together', wantJa:'人と協力して考え、行動する', wantEn:'collaborate with other people', weights:{ collaborator:4 } },
  ],
  voice: [
    { id:'warm', ja:'あたたかく、親しみやすく', en:'Warm and approachable', adjective:'Warm', weights:{ conversationalist:2 } },
    { id:'curious', ja:'好奇心を持って質問する', en:'Curious and questioning', adjective:'Curious', weights:{ thinker:2 } },
    { id:'lively', ja:'生き生きと、表情豊かに', en:'Lively and expressive', adjective:'Expressive', weights:{ storyteller:2 } },
    { id:'clear', ja:'落ち着いて、わかりやすく', en:'Calm and clear', adjective:'Thoughtful', weights:{ collaborator:1, thinker:1 } },
    { id:'brave', ja:'間違いを恐れず、積極的に', en:'Willing to give it a try', adjective:'Brave', weights:{ explorer:2 } },
  ],
  friction: [
    { id:'listening', ja:'話す速さについていけない', en:'Following spoken English', practice:'/foundation/hear/study', actionJa:'まず、短い英語を聞いてまねする。', actionEn:'Begin by listening to and echoing short English.' },
    { id:'words', ja:'知っている言葉が出てこない', en:'Finding the words in time', practice:'/lesson/03/study', actionJa:'会話をつなぐ短い表現を、一つ使ってみる。', actionEn:'Try one short phrase that keeps a conversation going.' },
    { id:'confidence', ja:'間違いが気になって話せない', en:'Speaking without overthinking', practice:'/lesson/01/study', actionJa:'まずは Hi. と声に出してみる。', actionEn:'Start by saying “Hi.” aloud.' },
    { id:'sounds', ja:'発音やリズムに自信がない', en:'Pronunciation and rhythm', practice:'/foundation/sounds/study', actionJa:'一つの音に集中して、ゆっくり練習する。', actionEn:'Practise one sound slowly and clearly.' },
    { id:'conversation', ja:'何を聞き、どう返すか迷う', en:'Knowing what to ask or say next', practice:'/lesson/02/study', actionJa:'短い自己紹介のやりとりを見てみる。', actionEn:'Explore one short introduction exchange.' },
  ],
}

export const roles = {
  conversationalist: { en:'Conversationalist', ja:'人との会話を楽しむ人',
    line:'Hey, how have you been?', reply:'Pretty good! What about you?',
    situationJa:'知り合いに会って、自然に話しかけている自分。', situationEn:'You meet someone you know and open a conversation naturally.',
  },
  thinker: { en:'Thinker', ja:'考えを交わす人',
    line:"That's interesting. What makes you think so?", reply:'Let me explain what I mean.',
    situationJa:'相手の話に興味を持ち、自分の考えも伝える自分。', situationEn:'You explore an idea with someone and share your point of view.',
  },
  storyteller: { en:'Storyteller', ja:'自分の話を伝える人',
    line:"You won't believe what happened yesterday.", reply:'Really? Tell me!',
    situationJa:'自分の経験を、生き生きと話している自分。', situationEn:'You bring a personal story to life in conversation.',
  },
  explorer: { en:'Explorer', ja:'新しい場所で行動する人',
    line:'Excuse me, could I ask you something?', reply:'Of course. How can I help?',
    situationJa:'初めての場所でも、自分から話しかけている自分。', situationEn:'You confidently approach someone in an unfamiliar place.',
  },
  collaborator: { en:'Collaborator', ja:'一緒に考え、進める人',
    line:'What if we tried a different approach?', reply:"That's a good idea. Let's try it.",
    situationJa:'誰かとアイデアを出し合い、前へ進める自分。', situationEn:'You work through an idea and move forward with someone.',
  },
}

export const defaultAnswers = { context:[], goal:null, voice:null, friction:null, roleOverride:null }

const allowed = (key, id) => choices[key].some(option => option.id === id)

export function normalizeOrientationAnswers(value) {
  if (!value || typeof value !== 'object' || value.v !== 1) return { ...defaultAnswers, context:[] }
  return {
    context: Array.isArray(value.context)
      ? [...new Set(value.context.filter(id => typeof id === 'string' && allowed('context', id)))].slice(0, 2)
      : [],
    goal: allowed('goal', value.goal) ? value.goal : null,
    voice: allowed('voice', value.voice) ? value.voice : null,
    friction: allowed('friction', value.friction) ? value.friction : null,
    roleOverride: Object.hasOwn(roles, value.roleOverride) ? value.roleOverride : null,
  }
}
export function parseOrientationAnswers(raw) {
  if (typeof raw !== 'string' || raw.length > 2000) return normalizeOrientationAnswers(null)
  try { return normalizeOrientationAnswers(JSON.parse(raw)) }
  catch { return normalizeOrientationAnswers(null) }
}
export const orientationComplete = (a) => a.context.length > 0 && !!a.goal && !!a.voice && !!a.friction

// The chosen conversational goal leads; contexts and imagined voice adjust it.
// No psychology claims, training model, or hidden scoring. Scores are only a
// way to recommend a *future practice role*, not identify someone's personality.
export function buildOrientationResult(input) {
  const answers = normalizeOrientationAnswers({ ...input, v:1 })
  if (!orientationComplete(answers)) return null
  const scores = Object.fromEntries(Object.keys(roles).map(id => [id, 0]))
  const selected = [
    ...answers.context.map(id => choices.context.find(o => o.id === id)),
    choices.goal.find(o => o.id === answers.goal),
    choices.voice.find(o => o.id === answers.voice),
  ]
  for(const item of selected) for(const [role, weight] of Object.entries(item.weights)) scores[role] += weight
  const preferredRole = Object.keys(choices.goal.find(o => o.id === answers.goal).weights)[0]
  const suggestedRole = Object.keys(scores).sort((a,b) => scores[b] - scores[a] || (a === preferredRole ? -1 : b === preferredRole ? 1 : 0))[0]
  const roleId = answers.roleOverride ?? suggestedRole
  const contexts = answers.context.map(id => choices.context.find(o => o.id === id))
  const goal = choices.goal.find(o => o.id === answers.goal)
  const voice = choices.voice.find(o => o.id === answers.voice)
  const friction = choices.friction.find(o => o.id === answers.friction)
  const contextJa = contexts.map(x => x.sceneJa).join('や')
  const contextEn = contexts.map(x => x.sceneEn).join(' or ')
  return {
    roleId,
    suggestedRole,
    role: roles[roleId],
    titleEn: 'The ' + voice.adjective + ' ' + roles[roleId].en,
    tentativeWhyJa: contextJa + 'で、' + goal.wantJa + 'ため。',
    tentativeWhyEn: 'To ' + goal.wantEn + ' ' + contextEn + '.',
    actionJa: friction.actionJa,
    actionEn: friction.actionEn,
    nextPath: friction.practice,
  }
}
