import { useState } from 'react'
import { useLanguage } from './Language'
import { Button, Heading } from './components'
import { chapterById, foundationSteps } from './content'
import { ORIENTATION_RESPONSE_KEY, choices, buildOrientationResult, parseOrientationAnswers } from './orientationProfile'
import { PLAN_RESPONSE_KEY, buildStudyPlan, readStudyPlan } from './studyPlan'
import { personaArtwork } from './personaArtwork'
import CalendarPlanner from './CalendarPlanner'
import { CHECKIN_RESPONSE_KEY, checkinOptions, parseCheckins, saveCheckin } from './progressCheckin'
import './progress.css'

const copy = {
  en: {
    eyebrow: 'YOUR LEARNING', title: 'Your progress',
    intro: 'Pick up where you stopped. Keep sight of why you started.',
    resume: 'CONTINUE LEARNING', continue: 'Continue →',
    study: 'Study', practice: 'Practice', start: 'Start with Orientation',
    mySpace: 'My Space', target: 'MY TARGET', alterEgo: 'MY ENGLISH SELF',
    plan: 'MY PLAN', calendar: 'Schedule in Google Calendar', closeCalendar: 'Close schedule', addTarget: 'Choose my target', editTarget: 'Review my target',
    addSelf: 'Discover my English self', editSelf: 'Explore my English self',
    addPlan: 'Make a study plan', editPlan: 'Adjust my plan',
    noPlan: 'Make a routine you can keep.',
    planned: 'A plan, not tracked study time.',
    perDay: 'min/day', perWeek: 'days/week',
    checkin: 'Self-assessment', checkinTitle: 'What can you do today?',
    instruction: 'Try this aloud without reading a script. Then choose what actually happened.',
    question: 'How did it go?', save: 'Save check-in', saved: 'Saved today',
    last: 'Last check-in', previous: 'Before that',
    reflection: 'Your own assessment, not a test score.',
    savedPhrases: 'Saved phrases',
    chapter: 'Chapter', orientation: 'Orientation', application: 'Application',
  },
  ja: {
    eyebrow: '学習の記録', title: '今の学習状況',
    intro: '続きから学び、目標を確かめましょう。',
    resume: '学習を再開', continue: '続きから →',
    study: '学ぶ', practice: '練習', start: 'オリエンテーションから始める',
    mySpace: 'マイスペース', target: '目標', alterEgo: '英語を話す未来の自分',
    plan: '学習プラン', calendar: 'Googleカレンダーに予定を追加', closeCalendar: '予定の設定を閉じる', addTarget: '目標を決める', editTarget: '目標を確認・変更する',
    addSelf: '未来の自分を見つける', editSelf: '未来の自分を見る・変更する',
    addPlan: '学習プランを作る', editPlan: 'プランを調整する',
    noPlan: '続けられる学習習慣を決めましょう。',
    planned: '予定の時間です。学習実績ではありません。',
    perDay: '分/日', perWeek: '日/週',
    checkin: '自己評価', checkinTitle: '今、どこまでできる？',
    instruction: '台本を見ずに声に出して挑戦しましょう。その結果を選んでください。',
    question: 'やってみて、どうでしたか？', save: '自己評価を保存', saved: '今日の記録を保存済み',
    last: '前回の自己評価', previous: 'その前',
    reflection: 'これは自己評価であり、テストの点数ではありません。',
    savedPhrases: '保存したフレーズ',
    chapter: 'チャプター', orientation: 'オリエンテーション', application: '応用',
  },
}

const challenges = {
  starter: {
    en: 'Introduce yourself and ask one simple question.',
    ja: '短く自己紹介して、質問を一つしてみる。',
  },
  conversationalist: {
    en: 'Start a conversation and ask one follow-up question.',
    ja: '話しかけて、続けて質問を一つしてみる。',
  },
  thinker: {
    en: 'Share an opinion and explain one reason.',
    ja: '自分の意見と、その理由を一つ伝えてみる。',
  },
  storyteller: {
    en: 'Tell a one-minute story about something that happened.',
    ja: '最近あったことを一分間話してみる。',
  },
  explorer: {
    en: 'Ask for help and explain what you need.',
    ja: '助けを求め、何が必要か説明してみる。',
  },
  collaborator: {
    en: 'Suggest a plan and ask for someone’s opinion.',
    ja: '計画を提案し、相手の意見を聞いてみる。',
  },
}

const applicationTitles = {
  ideas: { en: 'Ideas & Expression', ja: '考えと表現' },
  storytelling: { en: 'Storytelling', ja: 'ストーリーテリング' },
  smalltalk: { en: 'Small Talk', ja: '雑談' },
  reading: { en: 'Reading', ja: '読解' },
}

const todayKey = () => {
  const date = new Date()
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')
}

const displayDate = (day, language) =>
  new Date(day + 'T12:00:00').toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

export default function Progress({ learning, update }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const [calendarOpen, setCalendarOpen] = useState(false)
  const chapter = chapterById[learning.last?.match(/\/lesson\/(\d+)/)?.[1]]
  const foundation = foundationSteps.find(step => learning.last?.startsWith('/foundation/' + step.id + '/'))
  const app = learning.last?.match(/^\/application\/([^/]+)/)?.[1]
  const appTitle = applicationTitles[app]?.[language] ?? (app ? l.application : null)
  const resumedTitle =
    (language === 'ja' ? chapter?.ja : chapter?.title) ??
    (language === 'ja' ? foundation?.ja : foundation?.en) ??
    appTitle ?? l.start
  const resumedSection = chapter ? l.chapter + ' ' + chapter.id
    : foundation ? l.orientation : app ? l.application : l.orientation
  const resumedMode = /\/(practice|chunks|whole)(?:[/?]|$)/.test(learning.last ?? '') ? l.practice : l.study

  const answers = parseOrientationAnswers(learning.responses?.[ORIENTATION_RESPONSE_KEY])
  const goal = choices.goal.find(item => item.id === answers.goal)
  const persona = buildOrientationResult(answers)
  const artwork = persona && personaArtwork[persona.roleId]
  const portrait = Array.isArray(artwork) ? artwork[0] : artwork
  const planSettings = readStudyPlan(learning.responses?.[PLAN_RESPONSE_KEY])
  const plan = planSettings ? buildStudyPlan(planSettings) : null

  const challengeId = persona?.roleId ?? 'starter'
  const challenge = challenges[challengeId] ?? challenges.starter
  const checkins = parseCheckins(learning.responses?.[CHECKIN_RESPONSE_KEY])
  const relevant = checkins.filter(entry => entry.challenge === challengeId)
  const latest = relevant.at(-1)
  const previous = relevant.at(-2)
  const [selected, setSelected] = useState(null)
  const alreadySaved = latest?.date === todayKey() && latest?.rating === selected

  const record = () => {
    if (!checkinOptions.some(option => option.value === selected)) return
    const date = todayKey()
    update(current => ({
      ...current,
      responses: {
        ...current.responses,
        [CHECKIN_RESPONSE_KEY]: JSON.stringify({
          v: 1,
          history: saveCheckin(
            parseCheckins(current.responses?.[CHECKIN_RESPONSE_KEY]),
            { date, challenge: challengeId, rating: selected },
          ),
        }),
      },
    }))
  }
  const ratingText = value => checkinOptions.find(option => option.value === value)?.[language] ?? ''

  return (
    <div className="aw-page aw-library-page aw-progress">
      <Heading eyebrow={l.eyebrow} title={l.title} />
      <p className="aw-progress-intro">{l.intro}</p>

      <section className="aw-progress-resume" aria-label={l.resume}>
        <div className="aw-progress-resume-copy">
          <span className="aw-progress-kicker">{l.resume}</span>
          <h2>{resumedTitle}</h2>
          <p>{resumedSection} · {resumedMode}</p>
        </div>
        <Button href={learning.last ?? '/foundation/orientation/study'}>{l.continue}</Button>
      </section>

      <section className="aw-progress-space" aria-labelledby="aw-progress-space-title">
        <h2 id="aw-progress-space-title">{l.mySpace}</h2>
        <div className="aw-progress-space-grid">
          <article className="aw-progress-space-card">
            <span className="aw-progress-kicker">{l.target}</span>
            <h3>{goal ? goal[language] : l.addTarget}</h3>
            <a href="#/foundation/orientation/practice">{goal ? l.editTarget : l.addTarget} <span aria-hidden="true">→</span></a>
          </article>
          <article className="aw-progress-space-card aw-progress-persona">
            <div className="aw-progress-space-card-copy">
              <span className="aw-progress-kicker">{l.alterEgo}</span>
              <h3>{persona ? (language === 'ja' ? persona.role.ja : persona.titleEn) : l.addSelf}</h3>
              <a href="#/foundation/orientation/practice">{persona ? l.editSelf : l.addSelf} <span aria-hidden="true">→</span></a>
            </div>
            {portrait && <img src={portrait} alt="" loading="lazy" onError={event => { event.currentTarget.hidden = true }} />}
          </article>
          <article className="aw-progress-space-card">
            <span className="aw-progress-kicker">{l.plan}</span>
            {plan ? (
              <>
                <h3>{plan.minutes} {l.perDay} · {plan.days} {l.perWeek}</h3>
                <p>{l.planned}</p>
              </>
            ) : <h3>{l.noPlan}</h3>}
            <a href="#/foundation/how-it-works/practice">{plan ? l.editPlan : l.addPlan} <span aria-hidden="true">→</span></a>
            <button type="button" className="aw-progress-calendar-trigger"
              aria-expanded={calendarOpen} aria-controls="aw-progress-calendar-editor"
              onClick={() => setCalendarOpen(open => !open)}>
              {calendarOpen ? l.closeCalendar : l.calendar} <span aria-hidden="true">{calendarOpen ? '↑' : '↗'}</span>
            </button>
          </article>
        </div>
        {calendarOpen && <CalendarPlanner learning={learning} update={update} plan={plan} />}
      </section>

      <section className="aw-progress-checkin" aria-labelledby="aw-progress-checkin-title">
        <span className="aw-progress-kicker">{l.checkin}</span>
        <h2 id="aw-progress-checkin-title">{l.checkinTitle}</h2>
        <p className="aw-progress-checkin-instruction">{l.instruction}</p>
        <div className="aw-progress-challenge" lang={language}>{challenge[language]}</div>
        <div className="aw-progress-answer" role="group" aria-label={l.question}>
          <p>{l.question}</p>
          <div className="aw-progress-answer-options">
            {checkinOptions.map(option => (
              <button key={option.value} type="button"
                aria-pressed={selected === option.value}
                className={selected === option.value ? 'is-selected' : ''}
                onClick={() => setSelected(option.value)}
              >{option[language]}</button>
            ))}
          </div>
        </div>
        <div className="aw-progress-checkin-actions">
          <button className="aw-progress-save" type="button" onClick={record}
            disabled={!selected || alreadySaved}>
            {alreadySaved ? l.saved : l.save}
          </button>
          <span>{l.reflection}</span>
        </div>
        {latest && (
          <div className="aw-progress-history" aria-live="polite">
            <span>{l.last}: <strong>{ratingText(latest.rating)}</strong> · {displayDate(latest.date, language)}</span>
            {previous && <span>{l.previous}: <strong>{ratingText(previous.rating)}</strong> · {displayDate(previous.date, language)}</span>}
          </div>
        )}
      </section>

      <a className="aw-progress-saved" href="#/saved">{l.savedPhrases}<span>{learning.saved.length} <span aria-hidden="true">→</span></span></a>
    </div>
  )
}
