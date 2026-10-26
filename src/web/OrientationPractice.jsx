import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import {
  ORIENTATION_RESPONSE_KEY, choices, roles, parseOrientationAnswers,
  orientationComplete, buildOrientationResult,
} from './orientationProfile'
import './orientation-practice.css'

const steps = [
  { id:'context', ja:'どんな場面で英語を使いたい？', en:'Where would you like to use English?',
    subJa:'今、気になる場面を最大２つ。', subEn:'Choose up to two situations that matter to you now.' },
  { id:'goal', ja:'英語で何ができるようになりたい？', en:'What would you like to do with English?',
    subJa:'いちばん近いものを１つ。', subEn:'Choose the one that feels closest.' },
  { id:'voice', ja:'英語を話す自分は、どんな感じ？', en:'How do you imagine your English-speaking self?',
    subJa:'今の性格ではなく、これから育てたい話し方。', subEn:'Not who you are now—how you would like to speak.' },
  { id:'friction', ja:'今、いちばん難しそうなのは？', en:'What feels hardest right now?',
    subJa:'次の練習を選ぶための質問です。', subEn:'This helps suggest a useful first step.' },
]
const roleIcons = {
  conversationalist:'messages', thinker:'lightbulb',
  storyteller:'book', explorer:'compass', collaborator:'users',
}
const locale = {
  ja:{
    kicker:'YOUR REASON · YOUR FUTURE VOICE',
    heading:'英語で、どんな自分になりたい？',
    intro:'答えに正解はありません。いくつか選ぶと、英語を学ぶ「今の理由」と、これから練習してみたい自分の姿が見えてきます。',
    optional:'いつでも回答を変えられます。診断や評価ではありません。',
    count:'質問',previous:'戻る',next:'次へ',result:'結果を見る',skip:'あとで考える',
    resultKicker:'A POSSIBLE YOU · ひとつの可能性',
    resultHeading:'英語を話す、未来の自分',
    why:'英語を学ぶ理由（仮）',
    scene:'こんな場面を想像してみよう',
    you:'YOU',someone:'OTHER PERSON',
    nextStep:'今日の、小さな一歩',
    explore:'この練習から始める',continue:'次のレッスンへ',
    revise:'回答を変える',disclaimer:'これは性格診断ではありません。今の選択から作った仮の姿です。話し方も目標も、あとから自由に変えられます。',
    roles:'ほかの自分も想像してみる',suggested:'おすすめ',
    selected:'選択済み',pick:'選択する',
  },
  en:{
    kicker:'YOUR REASON · YOUR FUTURE VOICE',
    heading:'Who could you become in English?',
    intro:'There are no right answers. A few choices can help you imagine a reason to learn and the English-speaking self you want to practise becoming.',
    optional:'Change your answers anytime. This is not a personality test.',
    count:'Question',previous:'Back',next:'Next',result:'See my result',skip:'Maybe later',
    resultKicker:'A POSSIBLE YOU',
    resultHeading:'A future version of you, speaking English',
    why:'A possible reason to learn',
    scene:'Imagine yourself in this conversation',
    you:'YOU',someone:'OTHER PERSON',
    nextStep:'One small step today',
    explore:'Try this lesson',continue:'Continue to next lesson',
    revise:'Change answers',disclaimer:'This is not a diagnosis or fixed personality type. It is one possible future self based on your choices. You can revise it anytime.',
    roles:'Try imagining another version of yourself',suggested:'Suggested',
    selected:'Selected',pick:'Select',
  },
}

export default function OrientationPractice({ learning, update }) {
  const { language } = useLanguage()
  const l = locale[language] ?? locale.en
  const answers = parseOrientationAnswers(learning.responses?.[ORIENTATION_RESPONSE_KEY])
  const [step, setStep] = useState(() => orientationComplete(answers) ? 4 : 0)
  const headingRef = useRef(null)
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [step])
  const complete = orientationComplete(answers)
  const result = complete ? buildOrientationResult(answers) : null
  const change = (next) => {
    update(previous => ({
      ...previous,
      responses: {
        ...previous.responses,
        [ORIENTATION_RESPONSE_KEY]: JSON.stringify({ v:1, ...next }),
      },
    }))
  }
  const toggle = (question, id) => {
    if (question === 'context') {
      let context
      if (answers.context.includes(id)) context = answers.context.filter(x => x !== id)
      else context = [...answers.context.slice(-1), id].slice(0, 2)
      change({ ...answers, context })
    } else change({ ...answers, [question]: id })
  }
  const active = steps[step]
  const valid = active ? (active.id === 'context' ? answers.context.length > 0 : !!answers[active.id]) : true
  const advance = () => {
    if (!valid) return
    setStep(previous => Math.min(4, previous + 1))
  }
  return (
    <section className="rf-profile" aria-label={language === 'ja' ? '英語でなりたい自分を考える' : 'Discover your future English-speaking self'}>
      {step < 4 ? (
        <>
          <header className="rf-profile-head">
            <p className="ip-kicker">{l.kicker}</p>
            <h2>{l.heading}</h2>
            <p>{l.intro}</p>
            <small>{l.optional}</small>
          </header>
          <div className="rf-profile-progress" aria-label={l.count + ' ' + (step + 1) + ' / 4'}>
            {steps.map((item,i) => <span key={item.id} className={i <= step ? 'is-filled' : ''} />)}
          </div>
          <div className="rf-profile-question">
            <p className="rf-profile-index">{l.count} {String(step + 1).padStart(2, '0')} / 04</p>
            <h3 ref={headingRef} tabIndex={-1} id="rf-profile-question-title">{language === 'ja' ? active.ja : active.en}</h3>
            <p className="rf-profile-support">{language === 'ja' ? active.subJa : active.subEn}</p>
            <div role="group" aria-labelledby="rf-profile-question-title" className="rf-profile-choices">
              {choices[active.id].map((option,i) => {
                const checked = active.id === 'context' ? answers.context.includes(option.id) : answers[active.id] === option.id
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={'rf-profile-choice' + (checked ? ' is-chosen' : '')}
                    aria-pressed={checked}
                    onClick={() => toggle(active.id,option.id)}
                  >
                    <span className="rf-profile-choice-mark" aria-hidden="true">{checked ? '✓' : String(i+1).padStart(2,'0')}</span>
                    <span>{language === 'ja' ? option.ja : option.en}</span>
                    <span className="rf-profile-check" aria-hidden="true">{checked ? '✓' : ''}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <footer className="rf-profile-controls">
            <button type="button" className="rf-profile-back" disabled={step===0} onClick={() => setStep(step-1)}>{l.previous}</button>
            <a className="rf-profile-skip" href="#/foundation/how-it-works/study">{l.skip}</a>
            <button type="button" className="rf-profile-continue" disabled={!valid} onClick={advance}>
              {step===3 ? l.result : l.next}<span aria-hidden="true"> →</span>
            </button>
          </footer>
        </>
      ) : result && (
        <div className="rf-profile-result">
          <p className="ip-kicker">{l.resultKicker}</p>
          <h2 ref={headingRef} tabIndex={-1}>{l.resultHeading}</h2>
          <div className="rf-profile-identity">
            <span className="rf-profile-identity-icon"><CurriculumIcon name={roleIcons[result.roleId]} size={31} /></span>
            <div>
              <strong lang="en">{result.titleEn}</strong>
              <p>{language === 'ja' ? result.role.ja : result.role.en}</p>
            </div>
          </div>
          <div className="rf-profile-roles" role="group" aria-label={l.roles}>
            <p>{l.roles}</p>
            <div>
              {Object.entries(roles).map(([id, role]) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={result.roleId === id}
                  className={result.roleId === id ? 'is-chosen' : ''}
                  onClick={() => change({ ...answers, roleOverride: id })}
                >
                  {language === 'ja' ? role.ja : role.en}
                  {result.suggestedRole === id && <span>{l.suggested}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="rf-profile-why">
            <span>{l.why}</span>
            <p>{language === 'ja' ? result.tentativeWhyJa : result.tentativeWhyEn}</p>
          </div>
          <div className="rf-profile-scene">
            <h3>{l.scene}</h3>
            <p>{language === 'ja' ? result.role.situationJa : result.role.situationEn}</p>
            <div className="rf-profile-chat">
              <div className="rf-profile-message rf-profile-message-me">
                <small>{l.you}</small><span lang="en">{result.role.line}</span>
              </div>
              <div className="rf-profile-message rf-profile-message-them">
                <small>{l.someone}</small><span lang="en">{result.role.reply}</span>
              </div>
            </div>
          </div>
          <div className="rf-profile-next">
            <div><h3>{l.nextStep}</h3><p>{language === 'ja' ? result.actionJa : result.actionEn}</p></div>
            <a href={'#' + result.nextPath}>{l.explore}<span aria-hidden="true"> →</span></a>
          </div>
          <p className="rf-profile-disclaimer">{l.disclaimer}</p>
          <footer className="rf-profile-final-actions">
            <button type="button" onClick={() => setStep(0)}>{l.revise}</button>
            <a href="#/foundation/how-it-works/study">{l.continue}<span aria-hidden="true"> →</span></a>
          </footer>
        </div>
      )}
    </section>
  )
}
