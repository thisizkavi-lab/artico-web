// Twelve-week planning arithmetic, kept separate from UI for testability.
// Targets are practice challenges, not predicted language proficiency levels.
export const PLAN_RESPONSE_KEY = 'foundation-how-it-works-plan'
export const DEFAULT_PLAN = Object.freeze({ minutes:30, days:5, focus:'speaking', level:'new' })
export const MINUTE_OPTIONS = [15, 30, 45, 60, 90]
export const DAY_OPTIONS = [3, 5, 7]

export const FOCUSES = Object.freeze({
  speaking: { studyPart:1, totalParts:3, ja:'声に出す時間を多めに', en:'More speaking time' },
  balanced: { studyPart:1, totalParts:2, ja:'理解と練習を半分ずつ', en:'Study and practice equally' },
  studying: { studyPart:2, totalParts:3, ja:'まず理解をじっくり', en:'More time understanding' },
})
export const LEVELS = Object.freeze({
  new: { ja:'これから始める', en:'Just starting', detailJa:'まだ英語での会話は難しい', detailEn:'Conversations still feel difficult' },
  basics: { ja:'短い表現なら話せる', en:'I know some basics', detailJa:'あいさつや自己紹介なら少しできる', detailEn:'I can greet and introduce myself a little' },
  talking: { ja:'短い会話ならできる', en:'I can have simple conversations', detailJa:'身近な話題は、ゆっくりなら話せる', detailEn:'I can talk slowly about familiar topics' },
})

export function normalizeStudyPlan(input) {
  const value = input && typeof input === 'object' ? input : {}
  return {
    minutes:MINUTE_OPTIONS.includes(value.minutes) ? value.minutes : DEFAULT_PLAN.minutes,
    days:DAY_OPTIONS.includes(value.days) ? value.days : DEFAULT_PLAN.days,
    focus:Object.hasOwn(FOCUSES, value.focus) ? value.focus : DEFAULT_PLAN.focus,
    level:Object.hasOwn(LEVELS, value.level) ? value.level : DEFAULT_PLAN.level,
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
    outlook:buildStudyOutlook(settings.level, milestones[2].practiceHours),
  }
}

// Outcomes are cautiously framed *practice aims*. They are not scientifically
// validated probabilities, guaranteed abilities, or CEFR predictions.
// Self-reported baseline and planned active speaking time only determine which
// challenge the learner could reasonably work towards. Success must be checked
// by actually attempting the conversation.
const outlooks = {
  new: [
    { at:0, ja:'英語であいさつし、短く返す', en:'Greet someone and give a short reply',
      exampleJa:'短いあいさつを、見ながら声に出す。', exampleEn:'Say a short greeting, using a prompt if needed.' },
    { at:10, ja:'自分のことを短い英語で伝える', en:'Talk briefly about yourself',
      exampleJa:'30秒の自己紹介と、質問をひとつ練習する。', exampleEn:'Practise a 30-second introduction and one question.' },
    { at:25, ja:'身近な場面で短いやりとりをする', en:'Try short exchanges in familiar situations',
      exampleJa:'用意した言葉を使って、1〜2分の会話に挑戦する。', exampleEn:'Try a 1–2-minute conversation with prepared phrases.' },
    { at:50, ja:'身近な話題の会話を、少し長く続ける', en:'Build longer conversations on familiar topics',
      exampleJa:'言葉を探しながら、3〜5分の会話練習に挑戦する。', exampleEn:'Attempt 3–5 minutes of conversation, with pauses.' },
  ],
  basics: [
    { at:0, ja:'短い受け答えを、もう少し自然にする', en:'Make basic exchanges feel more natural',
      exampleJa:'簡単な質問をし、答えを返す。', exampleEn:'Ask and answer simple questions.' },
    { at:10, ja:'短い会話で、質問を返せるように練習する', en:'Practise keeping a short conversation going',
      exampleJa:'身近な話題で、質問をひとつ返す。', exampleEn:'Ask a follow-up question on a familiar topic.' },
    { at:25, ja:'自分の経験や好みを少し詳しく話す', en:'Share experiences and preferences',
      exampleJa:'理由も添えて、2〜3分のやりとりに挑戦する。', exampleEn:'Attempt 2–3 minutes of conversation, adding a reason.' },
    { at:50, ja:'身近な話題で、会話を広げる', en:'Develop familiar conversations further',
      exampleJa:'質問を返しながら、5分ほどの会話に挑戦する。', exampleEn:'Try a five-minute conversation with follow-up questions.' },
  ],
  talking: [
    { at:0, ja:'知っている話題を、よりわかりやすく伝える', en:'Express familiar ideas more clearly',
      exampleJa:'簡単な意見と理由を、短く伝える。', exampleEn:'Give a brief opinion and one reason.' },
    { at:10, ja:'理由や具体例を加えて話す', en:'Explain ideas with reasons and examples',
      exampleJa:'身近な話題について3分間、話す練習をする。', exampleEn:'Practise talking for three minutes about a familiar topic.' },
    { at:25, ja:'質問を深めながら、意見を交わす', en:'Explore opinions through follow-up questions',
      exampleJa:'相手に質問しながら、5分の会話を練習する。', exampleEn:'Attempt five minutes of discussion with follow-up questions.' },
    { at:50, ja:'身近な話題を、自分の言葉で説明する', en:'Explain familiar topics in your own words',
      exampleJa:'一例や理由も添えて、5〜10分の会話に挑戦する。', exampleEn:'Attempt a 5–10-minute exchange with reasons and examples.' },
  ],
}
export function buildStudyOutlook(level, practiceHours) {
  const key = Object.hasOwn(LEVELS, level) ? level : DEFAULT_PLAN.level
  const hours = Number.isFinite(practiceHours) && practiceHours >= 0 ? practiceHours : 0
  const target = outlooks[key].reduce((best,item) => hours >= item.at ? item : best, outlooks[key][0])
  return { ...target, level:key, basisPracticeHours:Math.round(hours * 10) / 10 }
}
