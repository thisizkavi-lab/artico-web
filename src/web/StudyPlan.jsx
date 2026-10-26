import { useState } from 'react'
import { useLanguage } from './Language'
import {
  PLAN_RESPONSE_KEY, DEFAULT_PLAN, MINUTE_OPTIONS, DAY_OPTIONS,
  FOCUSES, STARTS, readStudyPlan, serializeStudyPlan, buildStudyPlan,
} from './studyPlan'
import './study-plan.css'

const copy = {
  ja: {
    eyebrow:'YOUR 12-WEEK PLAN',
    title:'3か月後、どこまで話したい？',
    subtitle:'続けられる時間を選ぼう。計算した学習時間から、挑戦できる会話の目標をつくります。',
    minutes:'1日に何分？', days:'週に何日？', focus:'時間の使い方', from:'どこから始める？',
    study:'Study · 理解', practice:'Practice · 声に出す',
    perDay:'1日の学習', perWeek:'1週間', total:'12週間の合計',
    week:'週目', target:'練習の目標',
    assumption:'予定どおり続けた場合の学習時間です。会話の目標は練習の目安で、英語力やCEFRレベルを保証する予測ではありません。',
    save:'この計画を保存', saved:'計画を保存しました', start:'今日から始める',
    daysUnit:'日', minUnit:'分', hourUnit:'時間',
  },
  en: {
    eyebrow:'YOUR 12-WEEK PLAN',
    title:'What could you practise in three months?',
    subtitle:'Choose a routine you can keep. See your scheduled hours and a practical speaking challenge to work towards.',
    minutes:'Minutes per day', days:'Days per week', focus:'How to spend your time', from:'Where to begin',
    study:'Study · understand', practice:'Practice · speak',
    perDay:'Daily routine', perWeek:'Each week', total:'12-week total',
    week:'weeks', target:'Practice target',
    assumption:'These hours assume you follow your schedule. The speaking challenges are targets to practise, not predicted proficiency or CEFR levels.',
    save:'Save this plan', saved:'Plan saved', start:'Start today',
    daysUnit:'days', minUnit:'min', hourUnit:'hours',
  },
}

function PlanChoices({ label, children }) {
  return <div className="rf-plan-field">
    <h3>{label}</h3>
    <div className="rf-plan-options" role="group" aria-label={label}>{children}</div>
  </div>
}
function PlanButton({ pressed, onClick, children }) {
  return <button type="button" className={'rf-plan-choice' + (pressed ? ' is-active' : '')}
    aria-pressed={pressed} onClick={onClick}>{children}</button>
}

export default function StudyPlan({ learning, update }) {
  const { language } = useLanguage()
  const t = copy[language] ?? copy.en
  const rawSaved = learning.responses?.[PLAN_RESPONSE_KEY]
  const saved = readStudyPlan(rawSaved)
  const [settings, setSettings] = useState(() => saved ?? DEFAULT_PLAN)
  const plan = buildStudyPlan(settings)
  const currentSerialized = serializeStudyPlan(settings)
  const isSaved = Boolean(rawSaved) && rawSaved === currentSerialized
  const patch = (key, value) => setSettings(previous => ({ ...previous, [key]:value }))
  const save = () => update(previous => ({
    ...previous, responses:{
      ...previous.responses, [PLAN_RESPONSE_KEY]:currentSerialized,
    },
  }))
  const starts = Object.entries(STARTS)
  return (
    <section className="rf-plan" aria-label={language === 'ja' ? '12週間の学習計画' : '12-week learning plan'}>
      <header className="rf-plan-head">
        <p className="rf-plan-eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </header>
      <div className="rf-plan-inputs">
        <PlanChoices label={t.minutes}>
          {MINUTE_OPTIONS.map(minutes => <PlanButton key={minutes} pressed={settings.minutes === minutes}
            onClick={() => patch('minutes',minutes)}>{minutes}{language==='ja' ? '分' : 'm'}</PlanButton>)}
        </PlanChoices>
        <PlanChoices label={t.days}>
          {DAY_OPTIONS.map(days => <PlanButton key={days} pressed={settings.days === days}
            onClick={() => patch('days',days)}>{days}{language==='ja'?'日':'d'}</PlanButton>)}
        </PlanChoices>
        <PlanChoices label={t.focus}>
          {Object.entries(FOCUSES).map(([id,focus]) => <PlanButton key={id} pressed={settings.focus === id}
            onClick={() => patch('focus',id)}>{language==='ja' ? focus.ja : focus.en}</PlanButton>)}
        </PlanChoices>
      </div>

      <div className="rf-plan-result" aria-live="polite">
        <p className="rf-plan-eyebrow">{t.perDay}</p>
        <div className="rf-plan-split">
          <div><strong>{plan.studyMinutes}<small> {t.minUnit}</small></strong><span>{t.study}</span></div>
          <span className="rf-plan-plus" aria-hidden="true">+</span>
          <div><strong>{plan.practiceMinutes}<small> {t.minUnit}</small></strong><span>{t.practice}</span></div>
        </div>
        <div className="rf-plan-bar" role="img" aria-label={t.study + ' ' + plan.studyMinutes + ', ' + t.practice + ' ' + plan.practiceMinutes}>
          <span style={{ width:(plan.studyMinutes / plan.minutes * 100) + '%' }} />
        </div>
        <div className="rf-plan-totals">
          <span>{t.perWeek}: <strong>{plan.weeklyHours} {t.hourUnit}</strong></span>
          <span>{t.total}: <strong>{plan.totalHours} {t.hourUnit}</strong></span>
        </div>
      </div>
      <div className="rf-plan-milestones">
        <h3>{language === 'ja' ? '続けると、こんな練習に挑戦できる' : 'Speaking challenges along the way'}</h3>
        {plan.milestones.map(m => <div className="rf-plan-milestone" key={m.weeks}>
          <div className="rf-plan-week"><strong>{m.weeks}</strong><span>{t.week}</span></div>
          <div><strong>{language === 'ja' ? m.challengeJa : m.challengeEn}</strong>
            <span>{m.totalHours} {t.hourUnit} · {m.sessions} {language==='ja'?'回の学習':'sessions'}</span>
          </div>
        </div>)}
      </div>
      <p className="rf-plan-caveat">{t.assumption}</p>

      <div className="rf-plan-launch">
        <PlanChoices label={t.from}>
          {starts.map(([id,item]) => <PlanButton key={id} pressed={settings.start === id}
            onClick={() => patch('start',id)}>{language==='ja' ? item.ja : item.en}</PlanButton>)}
        </PlanChoices>
        <div className="rf-plan-actions">
          <button type="button" className="rf-plan-save" onClick={save} disabled={isSaved}>
            {isSaved ? t.saved : t.save}
          </button>
          <a className="rf-plan-start" href={'#' + plan.route} onClick={save}>{t.start} →</a>
        </div>
      </div>
    </section>
  )
}
