import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import {
  ORIENTATION_RESPONSE_KEY, choices, roles, parseOrientationAnswers,
  orientationComplete, buildOrientationResult, canAdvanceOrientation, nextOrientationStep,
} from './orientationProfile'
import { personaArtwork } from './personaArtwork'
import { getPersonaConfetti, getPersonaConfettiPieces } from './personaConfetti'
import './orientation-practice.css'

const questions = [
  { id:'context',
    ja:'どんな場面で英語を話したい？', en:'Where do you want to speak English?',
    jaTip:'好きなものを２つまで', enTip:'Choose up to two' },
  { id:'goal',
    ja:'何ができるようになりたい？', en:'What would you love to do?',
    jaTip:'いちばん近いものをひとつ', enTip:'Choose what feels closest' },
  { id:'voice',
    ja:'英語を話す自分は、どんな感じ？', en:'How do you want to sound?',
    jaTip:'「今の自分」ではなく「なりたい自分」', enTip:'Imagine the person you want to become' },
  { id:'friction',
    ja:'今、いちばん困っているのは？', en:'What holds you back the most?',
    jaTip:'今の気持ちで選んでみよう', enTip:'Just choose how you feel today' },
]

const copy = {
  ja: {
    intro:'英語で、どんな自分になる？', start:'YOUR ENGLISH SELF', counter:'STEP',
    next:'つぎへ',back:'戻る',skip:'スキップ',show:'結果を見る',
    resultEyebrow:'IMAGINE YOURSELF', resultTitle:'英語を話す、未来の自分。',
    why:'あなたが英語を学ぶ理由（仮）', imagine:'こんな会話をしている自分を想像してみて。',
    you:'YOU', other:'THEM', otherSelves:'ほかの可能性も見てみる',
    suggested:'おすすめ', edit:'回答を変更する',
  },
  en: {
    intro:'Meet your English-speaking self.',start:'YOUR ENGLISH SELF',counter:'STEP',
    next:'Continue',back:'Back',skip:'Skip',show:'See my result',
    resultEyebrow:'IMAGINE YOURSELF',resultTitle:'A future you, speaking English.',
    why:'A possible reason to learn',imagine:'Picture yourself saying this.',
    you:'YOU',other:'THEM',otherSelves:'Explore other possibilities',
    suggested:'Suggested', edit:'Edit my answers',
  },
}

const iconName = {
  conversationalist:'messages', thinker:'lightbulb', storyteller:'book',
  explorer:'compass', collaborator:'users',
}

function PersonaImage({ roleId, language, small = false }) {
  const [error, setError] = useState(false)
  useEffect(() => setError(false), [roleId])
  const artwork = personaArtwork[roleId]
  const alt = language === 'ja' ? roles[roleId].ja + 'のイラスト' : 'Illustration for ' + roles[roleId].en
  if (error) return <CurriculumIcon name={iconName[roleId]} size={small ? 30 : 64} />
  // The small picker needs a single portrait with the same visual size
  // as the other options. The larger result may show a two-person scene.
  if (Array.isArray(artwork)) {
    if (small) return <img src={artwork[0]} alt={alt} width="132" height="132"
      loading="lazy" decoding="async" onError={() => setError(true)} />
    return (
      <div className="rf-persona-duo" role="img" aria-label={alt}>
        {artwork.map(src => <img key={src} src={src} alt="" loading="eager"
          decoding="async" onError={() => setError(true)} />)}
      </div>
    )
  }
  return <img src={artwork} alt={alt} loading={small ? 'lazy' : 'eager'}
    decoding="async" width={small ? 132 : 320} height={small ? 132 : 320}
    onError={() => setError(true)} />
}

function PersonaConfetti({ roleId }) {
  const theme = getPersonaConfetti(roleId)
  const pieces = getPersonaConfettiPieces(roleId)
  return (
    <div className={`rf-persona-confetti rf-persona-confetti--${theme.shape}`} aria-hidden="true">
      {pieces.map((piece, i) => (
        <span key={i} className="rf-persona-confetti-piece" style={{
          '--piece-color': piece.color,
          '--piece-dx': piece.drift,
          '--piece-rise': piece.rise,
          '--piece-fall': piece.fall,
          '--piece-delay': piece.delay,
          '--piece-duration': piece.duration,
          '--piece-spin': piece.spin,
          '--piece-size': piece.size,
        }} />
      ))}
    </div>
  )
}

export default function OrientationPractice({ learning, update }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const answers = parseOrientationAnswers(learning.responses?.[ORIENTATION_RESPONSE_KEY])
  const [step, setStep] = useState(() => orientationComplete(answers) ? 4 : 0)
  const [celebration, setCelebration] = useState(null)
  const titleRef = useRef(null)
  useEffect(() => { titleRef.current?.focus({ preventScroll: true }) }, [step])
  useEffect(() => {
    if (!celebration) return
    const timeout = window.setTimeout(() => setCelebration(null), 2200)
    return () => window.clearTimeout(timeout)
  }, [celebration])
  const result = orientationComplete(answers) ? buildOrientationResult(answers) : null
  const current = questions[step]
  const isContext = current?.id === 'context'
  const selectedCount = answers.context.length
  const valid = canAdvanceOrientation(answers, step)
  const celebrate = (roleId) => {
    // Motion-sensitive learners see the result without animation.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    setCelebration(previous => ({ roleId, sequence: (previous?.sequence ?? 0) + 1 }))
  }
  const advance = () => {
    const next = nextOrientationStep(answers, step)
    if (step === questions.length - 1 && next === questions.length) {
      const chosenRole = buildOrientationResult(answers)?.roleId
      if (chosenRole) celebrate(chosenRole)
    }
    setStep(next)
  }
  const save = (values) => update(previous => ({
    ...previous,
    responses: { ...previous.responses, [ORIENTATION_RESPONSE_KEY]: JSON.stringify({ v:1, ...values }) },
  }))
  const choose = (question, option) => {
    if (question === 'context') {
      const exists = answers.context.includes(option)
      if (!exists && selectedCount === 2) return
      save({ ...answers, roleOverride:null,
        context:exists ? answers.context.filter(x => x !== option) : [...answers.context,option] })
    } else {
      // Keep the selected answer visible. The learner moves on using Next.
      save({ ...answers, roleOverride:null, [question]:option })
    }
  }
  return (
    <section className="rf-profile" aria-label={l.intro}>
      {step < 4 ? (
        <>
          <header className="rf-profile-header">
            <span className="rf-profile-eyebrow">{l.start}</span>
            <a href="#/foundation/how-it-works/study" className="rf-profile-skip">{l.skip}</a>
          </header>
          <div className="rf-profile-progress" aria-label={l.counter + ' ' + (step+1) + ' / 4'}>
            {questions.map((q,i) => <span key={q.id} className={i <= step ? 'is-current' : ''}/>)}
          </div>
          <p className="rf-profile-count">{l.counter} {step+1} / 4</p>
          <h2 ref={titleRef} tabIndex={-1} className="rf-profile-question">{language==='ja' ? current.ja : current.en}</h2>
          <p className="rf-profile-instruction">{language==='ja' ? current.jaTip : current.enTip}</p>
          <div className="rf-profile-options" role="group" aria-label={language==='ja' ? current.ja : current.en}>
            {choices[current.id].map((option) => {
              const checked = isContext ? answers.context.includes(option.id) : answers[current.id] === option.id
              const blocked = isContext && selectedCount === 2 && !checked
              return <button
                type="button"
                key={option.id}
                aria-pressed={checked}
                disabled={blocked}
                className={'rf-profile-option' + (checked ? ' is-selected' : '')}
                onClick={() => choose(current.id,option.id)}
              >
                <span>{language==='ja' ? option.ja : option.en}</span>
                <span className="rf-profile-radio" aria-hidden="true">{checked ? '✓' : ''}</span>
              </button>
            })}
          </div>
          <footer className="rf-profile-actions">
            <button className="rf-profile-back" type="button" onClick={() => setStep(Math.max(0,step-1))} disabled={step===0}>← {l.back}</button>
            <button type="button" className="rf-profile-next" disabled={!valid}
              onClick={advance}>
              {step === questions.length - 1 ? l.show : l.next} →
            </button>
          </footer>
        </>
      ) : result && (
        <div className="rf-persona">
          {celebration && (
            <PersonaConfetti key={celebration.roleId + '-' + celebration.sequence} roleId={celebration.roleId} />
          )}
          <p className="rf-profile-eyebrow">{l.resultEyebrow}</p>
          <h2 ref={titleRef} tabIndex={-1}>{l.resultTitle}</h2>
          <div className="rf-persona-hero">
            <div className="rf-persona-illustration">
              <PersonaImage roleId={result.roleId} language={language}/>
            </div>
            <div className="rf-persona-intro">
              <span className="rf-persona-hint">{l.start}</span>
              <h3 lang="en">{result.titleEn}</h3>
              {language === 'ja' && <p className="rf-persona-name">{result.role.ja}</p>}
              <p className="rf-persona-style">{language==='ja' ? '話し方：' + result.styleJa : 'Your style: ' + result.styleEn}</p>
              <p className="rf-persona-situation">{language==='ja' ? result.role.situationJa : result.role.situationEn}</p>
              <div className="rf-persona-phrase">
                <small>{l.you}</small>
                <strong lang="en">“{result.role.line}”</strong>
              </div>
            </div>
          </div>
          <div className="rf-persona-why">
            <span>{l.why}</span>
            <p>{language==='ja' ? result.tentativeWhyJa : result.tentativeWhyEn}</p>
          </div>
          <button type="button" className="rf-persona-edit" onClick={() => setStep(0)}>{l.edit} →</button>
          <div className="rf-persona-collection">
            <h4>{l.otherSelves}</h4>
            <div className="rf-persona-strip" role="group" aria-label={l.otherSelves}>
              {Object.entries(roles).map(([id,role]) =>
                <button
                  type="button"
                  key={id}
                  aria-pressed={result.roleId===id}
                  className={'rf-persona-option' + (result.roleId===id ? ' is-selected' : '')}
                  onClick={() => {
                    if (id === result.roleId) return
                    save({ ...answers, roleOverride:id })
                    celebrate(id)
                  }}
                >
                  <span className="rf-persona-mini"><PersonaImage roleId={id} language={language} small /></span>
                  <span className="rf-persona-label">
                    <strong lang="en">{role.en}</strong>
                    {language === 'ja' && <small lang="ja">{role.ja}</small>}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
