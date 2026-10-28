import japaneseCatalog from '../course/locales/ja/catalog.json'
import chapters from '../course/catalog.json'
import { socialFluencyChapters } from '../socialFluencyCurriculum'
import { publicChapterId } from './chapterNumbers.js'

const japaneseTitles = {
  '02': '自己紹介',
  '03': '会話をつなぐ言葉',
  '04': 'わからないと伝える',
  '05': '意見と好み',
  96: '本と読書',
}
const originalCatalog = chapters.map((chapter) => ({
  ...chapter,
  goalJa: japaneseCatalog[chapter.id]?.goal,
  ja: japaneseTitles[chapter.id] ??
    japaneseCatalog[chapter.id]?.title ??
    socialFluencyChapters.find((item) => item.number === chapter.id)?.ja ??
    chapter.title,
}))
export const catalog = originalCatalog.flatMap((chapter) => {
  const display = { ...chapter, sourceId: chapter.id, id: publicChapterId(chapter.id) }
  return chapter.id === '34'
    ? [
        { id: '34', title: 'Humor & Banter', ja: 'ユーモア・軽い冗談',
          goal: 'Recognize friendly teasing, respond playfully, and use timing without making someone uncomfortable.',
          goalJa: '親しい人の冗談を理解し、自然に返し、相手を傷つけないユーモアを使う。' },
        display,
      ]
    : [display]
})
export const chapterById = Object.fromEntries(catalog.map((chapter) => [chapter.id, chapter]))
export const groups = [
  { start: 1, end: 10, title: 'Conversation basics' },
  { start: 11, end: 19, title: 'People & plans' },
  { start: 20, end: 25, title: 'Food & drink' },
  { start: 26, end: 34, title: 'Free time & interests' },
  { start: 35, end: 45, title: 'Shopping & services' },
  { start: 46, end: 56, title: 'Study & work' },
  { start: 57, end: 65, title: 'At home' },
  { start: 66, end: 80, title: 'Travel & getting around' },
  { start: 81, end: 88, title: 'Health & care' },
  { start: 89, end: 97, title: 'Communication & media' },
]

export const scenes = {
  first: {
    title: 'Meet someone new.',
    ja: '名前と、つながりを伝える。',
    caption: 'Jordanの家で、MayaとEliが初めて会いました。',
    detail: 'One useful detail.',
    explanation: '名前のあとに、ここにいる理由を一つ。相手が次の話題を見つけやすくなります。',
    art: 'd5e3b.svg',
    practiceArt: '59c32.svg',
    people: ['Maya', 'Eli'],
    turns: [
      {
        id: 'first-0',
        speaker: 'Maya',
        en: 'Hi, I’m Maya.\nI’m a friend of Jordan’s.',
        ja: 'マヤです。ジョーダンの友人です。',
        excerpt: 'Hi, I’m Maya.',
        shortJa: 'マヤです。',
      },
      {
        id: 'first-1',
        speaker: 'Eli',
        en: 'I’m Eli. Nice to meet you.',
        focus: 'I’m Eli.\nNice to meet you.',
        ja: 'イーライです。はじめまして。',
        excerpt: 'Nice to meet you.',
        shortJa: 'はじめまして。',
      },
      { id: 'first-2', speaker: 'Maya', en: 'You too.', ja: 'こちらこそ。' },
    ],
  },
  friend: {
    title: 'Introduce a friend.',
    ja: '友人を紹介する。',
    caption: 'Mayaが、友人のJordanをEliに紹介しています。',
    detail: 'Bring someone in.',
    explanation: '名前を伝えて、二人が話し始めるきっかけをつくります。',
    art: 'c7e54.svg',
    practiceArt: '41f1f.svg',
    people: ['Maya', 'Jordan', 'Eli'],
    turns: [
      {
        id: 'friend-0',
        speaker: 'Maya',
        en: 'Eli, this is Jordan.',
        ja: 'イーライ、こちらはジョーダンです。',
      },
      {
        id: 'friend-1',
        speaker: 'Jordan',
        en: 'Hi, Eli. Nice to meet you.',
        focus: 'Hi, Eli.\nNice to meet you.',
        ja: 'こんにちは、イーライ。はじめまして。',
      },
      { id: 'friend-2', speaker: 'Eli', en: 'You too.', ja: 'こちらこそ。' },
    ],
  },
}

export const words = [
  { id: 'word-friend', en: 'a friend', ja: '友人', art: 'd037f.svg' },
  { id: 'word-coworker', en: 'a coworker', ja: '同僚', art: '0606a.svg' },
  { id: 'word-name-tag', en: 'a name tag', ja: '名札', art: '4ef88.svg' },
  { id: 'word-coffee', en: 'coffee', ja: 'コーヒー', art: 'b1549.svg' },
]
export const phrases = [
  {
    id: 'phrase-friend',
    en: 'I’m a friend of Jordan’s.',
    ja: 'ジョーダンの友人です。',
    caption: 'Maya & Jordan · friends',
    art: '320a8.svg',
  },
  {
    id: 'phrase-coworker',
    en: 'I work with Jordan.',
    ja: 'ジョーダンと一緒に働いています。',
    caption: 'Eli & Jordan · coworkers',
    art: '711fc.svg',
  },
]
export const chunks = [
  { id: 'twister-lr-0', en: 'Lily', ja: 'リリー' },
  {
    id: 'twister-lr-1',
    en: 'really likes',
    ja: '大好き',
    instruction: '「大好き」の部分を、ひとかたまりで。',
  },
  { id: 'twister-lr-2', en: 'red roses', ja: '赤いバラ' },
]
export const twister = {
  id: 'twister-lr-whole',
  en: 'Lily really likes\nred roses.',
  ja: 'リリーは赤いバラが大好きです。',
}

export const foundationSteps = [
  {
    id: 'orientation',
    en: 'Why learn a language?',
    description: 'Find your reason to learn.',
    ja: '言葉と、学ぶ理由',
  },
  {
    id: 'how-it-works',
    en: 'How Artico works',
    description: 'Understand Study, Practice, and your learning path.',
    ja: 'Articoの使い方',
  },
  {
    id: 'letters',
    en: 'The Alphabet',
    description: 'Meet, hear, and try all 26 letters.',
    ja: 'アルファベット',
  },
  {
    id: 'write',
    en: 'Write the alphabet',
    description: 'Build familiar letter shapes on paper.',
    ja: '文字を書いてみる',
  },
  {
    id: 'sounds',
    en: 'Letters & sounds',
    description: 'Notice how written letters relate to spoken sounds.',
    ja: '文字と音の違い',
  },
  {
    id: 'tongue-intro',
    en: 'Why tongue twisters?',
    description: 'Learn how to practice clearly, one movement at a time.',
    ja: '口とリズムを練習する',
  },
  {
    id: 'lr',
    en: 'L & R, in rhythm.',
    description: 'Build a tongue twister in short, clear chunks.',
    ja: 'ゆっくり、はっきり言う',
  },
]

export const savedItems = Object.fromEntries(
  [...Object.values(scenes).flatMap((scene) => scene.turns), ...words, ...phrases].map((item) => [
    item.id,
    item,
  ]),
)
