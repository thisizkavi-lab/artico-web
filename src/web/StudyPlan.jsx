import { useState } from 'react'
import { useLanguage } from './Language'
import {
  PLAN_RESPONSE_KEY, DEFAULT_PLAN, MINUTE_OPTIONS, DAY_OPTIONS,
  FOCUSES, LEVELS, readStudyPlan, serializeStudyPlan, buildStudyPlan,
} from './studyPlan'
import './study-plan.css'

const copy = {
  ja: {
    eyebrow:'YOUR 12-WEEK PLAN', title:'自分に合う学び方を決めよう。',
    subtitle:'続けられる時間を選び、今の英語力を教えてください。',
    minutes:'1日に何分？', days:'週に何日？', focus:'時間の使い方', level:'今の英語は？',
    study:'Study · 理解', practice:'Practice · 声に出す',
    perDay:'1日の学習', perWeek:'1週間', total:'12週間',
    week:'週目', save:'保存して、3か月後の目安を見る',
    saved:'計画を保存しました', edit:'計画を変更する', hourUnit:'時間', minUnit:'分',
    outcomeTitle:'3か月後、こんな英語を目指せる。',
    outcomeLabel:'続けた場合の目安',
    exampleLabel:'できるように練習すること',
    milestones:'途中の練習目標',
    basis:'予定した練習時間',
    effort:'ただ時間を使うだけでは、話せるようになりません。声に出す、繰り返す、人と話す、間違いを直す。この積み重ねが大切です。',
    caution:'これは英語力の診断や上達の保証ではありません。今のレベルは自己申告で、時間は実績ではなく予定です。上達の速さは学習の質や会話の機会によって変わります。',
  },
  en: {
    eyebrow:'YOUR 12-WEEK PLAN', title:'Make a plan you can actually keep.',
    subtitle:'Choose a realistic routine and tell us where you are starting.',
    minutes:'Minutes per day', days:'Days per week', focus:'How to spend your time', level:'Your English today',
    study:'Study · understand', practice:'Practice · speak',
    perDay:'Daily routine', perWeek:'Per week', total:'Over 12 weeks',
    week:'weeks', save:'Save & see my three-month outlook',
    saved:'Your plan is saved', edit:'Edit my plan', hourUnit:'hours', minUnit:'min',
    outcomeTitle:'What you could work towards in three months.',
    outcomeLabel:'A possible outcome if you keep going',
    exampleLabel:'A speaking challenge to aim for',
    milestones:'Practice goals along the way',
    basis:'Planned speaking practice',
    effort:'Time alone is not enough. Say things aloud, repeat, talk to real people, and use feedback to improve. That is where the work happens.',
    caution:'This is not a proficiency assessment or a promise. Your starting level is self-reported, and these are scheduled hours, not tracked study. Results depend on how you practise and how often you use English.',
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
function Routine({ plan, t }) {
  return <div className="rf-plan-result">
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
}

export default function StudyPlan({ learning, update }) {
  const { language } = useLanguage()
  const t = copy[language] ?? copy.en
  const stored = readStudyPlan(learning.responses?.[PLAN_RESPONSE_KEY])
  const [settings, setSettings] = useState(() => stored ?? DEFAULT_PLAN)
  const [showOutlook, setShowOutlook] = useState(() => Boolean(stored))
  const plan = buildStudyPlan(settings)
  const patch = (key,value) => setSettings(previous => ({ ...previous, [key]:value }))
  const save = () => {
    update(previous => ({
      ...previous, responses:{
        ...previous.responses, [PLAN_RESPONSE_KEY]:serializeStudyPlan(settings),
      },
    }))
    setShowOutlook(true)
  }

  return <section className="rf-plan" aria-label={language === 'ja' ? '12週間の学習計画' : '12-week learning plan'}>
    {showOutlook ? (
      <div className="rf-plan-outlook">
        <p className="rf-plan-eyebrow">{t.saved}</p>
        <h2>{t.outcomeTitle}</h2>
        <p className="rf-plan-outlook-target">{language === 'ja' ? plan.outlook.ja : plan.outlook.en}</p>
        <div className="rf-plan-example">
          <span>{t.exampleLabel}</span>
          <p>{language === 'ja' ? plan.outlook.exampleJa : plan.outlook.exampleEn}</p>
        </div>
        <Routine plan={plan} t={t} />
        <div className="rf-plan-milestones">
          <h3>{t.milestones}</h3>
          {plan.milestones.map(m => <div className="rf-plan-milestone" key={m.weeks}>
            <div className="rf-plan-week"><strong>{m.weeks}</strong><span>{t.week}</span></div>
            <div><strong>{language === 'ja' ? m.challengeJa : m.challengeEn}</strong>
              <span>{m.totalHours} {t.hourUnit} · {m.sessions} {language === 'ja' ? '回の予定' : 'planned sessions'}</span>
            </div>
          </div>)}
        </div>
        <p className="rf-plan-effort">{t.effort}</p>
        <p className="rf-plan-caveat">{t.caution}</p>
        <button type="button" className="rf-plan-edit" onClick={() => setShowOutlook(false)}>{t.edit}</button>
      </div>
    ) : (
      <>
        <header className="rf-plan-head">
          <p className="rf-plan-eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </header>
        <div className="rf-plan-inputs">
          <PlanChoices label={t.minutes}>
            {MINUTE_OPTIONS.map(minutes => <PlanButton key={minutes} pressed={settings.minutes === minutes}
              onClick={() => patch('minutes',minutes)}>{minutes}{language === 'ja' ? '分' : 'm'}</PlanButton>)}
          </PlanChoices>
          <PlanChoices label={t.days}>
            {DAY_OPTIONS.map(days => <PlanButton key={days} pressed={settings.days === days}
              onClick={() => patch('days',days)}>{days}{language === 'ja' ? '日' : 'd'}</PlanButton>)}
          </PlanChoices>
          <PlanChoices label={t.focus}>
            {Object.entries(FOCUSES).map(([id,focus]) => <PlanButton key={id} pressed={settings.focus === id}
              onClick={() => patch('focus',id)}>{language === 'ja' ? focus.ja : focus.en}</PlanButton>)}
          </PlanChoices>
          <PlanChoices label={t.level}>
            {Object.entries(LEVELS).map(([id,level]) => <PlanButton key={id} pressed={settings.level === id}
              onClick={() => patch('level',id)}>{language === 'ja' ? level.ja : level.en}</PlanButton>)}
          </PlanChoices>
        </div>
        <Routine plan={plan} t={t} />
        <div className="rf-plan-actions">
          <button className="rf-plan-start" type="button" onClick={save}>{t.save} →</button>
        </div>
      </>
    )}
  </section>
}
