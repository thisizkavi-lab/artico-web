export const learningStages = [
  {
    id: 'orientation',
    title: 'Orientation',
    ja: 'はじめに',
    tone: 'lilac',
    description: "Understand how you'll learn.",
    support: '学ぶ理由と、Articoの進め方を知る。',
    topics: ['Your reason to learn', 'How Study & Practice work'],
    lessonIds: ['orientation', 'how-it-works'],
    count: '2 lessons',
    overview: '/courses?orientation',
    start: '/foundation/orientation/study',
    action: 'Explore orientation',
  },
  {
    id: 'foundation',
    title: 'Foundations',
    ja: '文字・音・リズム',
    tone: 'yellow',
    description: 'Get a feel for the sounds.',
    support: '文字を知り、耳で聞き、口を動かす。',
    topics: ['Letters · listening · writing', 'Sounds · tongue twisters'],
    lessonIds: ['letters', 'hear', 'write', 'sounds', 'tongue-intro', 'lr'],
    count: '6 lessons',
    overview: '/courses?foundation',
    start: '/foundation/letters/study',
    action: 'Explore foundations',
  },
  {
    id: 'social',
    title: 'Social Fluency',
    ja: '日常のやりとり',
    tone: 'green',
    description: 'Bring it into a conversation.',
    support: '場面を学び、声にして、自分の言葉で試す。',
    topics: ['Everyday conversations', 'Study · shadowing · scenarios'],
    lessonIds: [],
    count: '96 chapters',
    overview: '/courses?social',
    start: '/lesson/01/study',
    action: 'Explore conversations',
  },
]

export function getLearningStage(path) {
  if (/^\/lesson\//.test(path ?? '')) return learningStages[2]
  const id = path?.match(/^\/foundation\/([^/?]+)/)?.[1]
  return learningStages.find((stage) => stage.lessonIds.includes(id))
}

export function getFoundationNavigation(id) {
  const stage = getLearningStage(`/foundation/${id}/study`)
  if (!stage) return null
  const steps = learningStages.flatMap((item) => item.lessonIds)
  const position = steps.indexOf(id)
  return {
    stage,
    index: stage.lessonIds.indexOf(id),
    previous: position > 0 ? `/foundation/${steps[position - 1]}/study` : stage.overview,
    next:
      position < steps.length - 1
        ? `/foundation/${steps[position + 1]}/study`
        : learningStages[2].start,
  }
}

export function getLessonNavigation({ page, id }) {
  if (page === 'foundation') {
    const navigation = getFoundationNavigation(id)
    if (!navigation) return null
    return {
      previous: navigation.previous,
      next: navigation.next,
      practice: `/foundation/${id}/${id === 'lr' ? 'chunks' : 'practice'}`,
    }
  }
  if (page !== 'lesson' || !/^(?:0[1-9]|[1-8]\d|9[0-6])$/.test(id)) return null
  const chapter = Number(id)
  const chapterPath = (number) => `/lesson/${String(number).padStart(2, '0')}/study`
  const foundationIds = learningStages.flatMap((stage) => stage.lessonIds)
  return {
    previous: chapter === 1
      ? `/foundation/${foundationIds.at(-1)}/study`
      : chapterPath(chapter - 1),
    next: chapter === 96 ? '/progress' : chapterPath(chapter + 1),
    practice: `/lesson/${id}/practice`,
  }
}
