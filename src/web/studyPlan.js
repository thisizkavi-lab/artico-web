// Twelve-week planning arithmetic, kept separate from UI for testability.
// Targets are practice challenges, not predicted language proficiency levels.
export const PLAN_RESPONSE_KEY = 'foundation-how-it-works-plan'
export const DEFAULT_PLAN = Object.freeze({ minutes:30, days:5, focus:'speaking', start:'conversation' })
export const MINUTE_OPTIONS = [15, 30, 45, 60, 90]
export const DAY_OPTIONS = [3, 5, 7]

export const FOCUSES = Object.freeze({
  speaking: { studyPart:1, totalParts:3, ja:'声に出す時間を多めに', en:'More speaking time' },
  balanced: { studyPart:1, totalParts:2, ja:'理解と練習を半分ずつ', en:'Study and practice equally' },
  studying: { studyPart:2, totalParts:3, ja:'まず理解をじっくり', en:'More time understanding' },
})
export const STARTS = Object.freeze({
  conversation: { path:'/lesson/01/study', ja:'会話から', en:'Conversations' },
  sounds: { path:'/foundation/tongue-intro/practice', ja:'音から', en:'Sounds' },
  letters: { path:'/foundation/letters/study', ja:'文字から', en:'Letters' },
})

export function normalizeStudyPlan(input) {
  const value = input && typeof input === 'object' ? input : {}
  return {
    minutes:MINUTE_OPTIONS.includes(value.minutes) ? value.minutes : DEFAULT_PLAN.minutes,
    days:DAY_OPTIONS.includes(value.days) ? value.days : DEFAULT_PLAN.days,
    focus:Object.hasOwn(FOCUSES, value.focus) ? value.focus : DEFAULT_PLAN.focus,
    start:Object.hasOwn(STARTS, value.start) ? value.start : DEFAULT_PLAN.start,
  }
}
export function readStudyPlan(raw) {
  if (typeof raw !== 'string' || raw.length > 1000) return null
  try {
    const data = JSON.parse(raw)
    return data?.v === 1 ? normalizeStudyPlan(data) : null
  } catch { return null }
}
export function serializeStudyPlan(input) {
  return JSON.stringify({ v:1, ...normalizeStudyPlan(input) })
}

// Targets demand that the learner actively rehearse the specified task.
// Hours are a *planning input*, not evidence that the skill is already acquired.
const challenges = [
  { hours:0, ja:'あいさつして、短く返事をする', en:'Greet someone and give a short reply' },
  { hours:3, ja:'30秒の自己紹介を声に出す', en:'Say a 30-second self-introduction aloud' },
  { hours:7, ja:'好きなことを1分話し、質問を1つする', en:'Talk about a hobby for one minute and ask a question' },
  { hours:15, ja:'身近な場面で2分のやりとりを練習する', en:'Rehearse a two-minute everyday exchange' },
  { hours:30, ja:'質問を返しながら、3分の会話を練習する', en:'Practise a three-minute conversation with follow-ups' },
  { hours:50, ja:'話題を変えながら、5分の会話に挑戦する', en:'Attempt a five-minute conversation across familiar topics' },
]

export function buildStudyPlan(input) {
  const settings = normalizeStudyPlan(input)
  const ratio = FOCUSES[settings.focus]
  // Rounding to five-minute blocks keeps each daily routine practical.
  const studyMinutes = Math.max(5, Math.min(settings.minutes - 5,
    Math.round((settings.minutes * ratio.studyPart / ratio.totalParts) / 5) * 5))
  const practiceMinutes = settings.minutes - studyMinutes
  const minutesPerWeek = settings.minutes * settings.days
  const milestones = [4, 8, 12].map(weeks => {
    const sessions = weeks * settings.days
    const totalMinutes = minutesPerWeek * weeks
    const practiceHours = sessions * practiceMinutes / 60
    const challenge = challenges.reduce((candidate,item) =>
      practiceHours >= item.hours ? item : candidate, challenges[0])
    return {
      weeks, sessions,
      totalHours:Math.round(totalMinutes / 60 * 10) / 10,
      studyHours:Math.round(sessions * studyMinutes / 60 * 10) / 10,
      practiceHours:Math.round(practiceHours * 10) / 10,
      challengeJa:challenge.ja, challengeEn:challenge.en,
    }
  })
  return {
    ...settings, studyMinutes, practiceMinutes,
    weeklyHours:Math.round(minutesPerWeek / 60 * 10) / 10,
    milestones, totalHours:milestones[2].totalHours,
    route:STARTS[settings.start].path,
  }
}
