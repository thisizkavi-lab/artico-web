import { useState } from 'react'
import { everydayModules } from './data'

export function EverydaySidebar({ activeModuleId, onSelectModule, activeLessonId, onSelectLesson, courseLayer, setCourseLayer, LayerNav }) {
  return (
    <aside className="everyday-sidebar">
      {LayerNav && <LayerNav courseLayer={courseLayer} setCourseLayer={setCourseLayer} />}
      <div className="sidebar-heading">
        <small>Everyday Fluency</small>
        <h2>8 Core Modules</h2>
        <p>状況から入る英会話</p>
      </div>
      <nav className="everyday-nav">
        {everydayModules.map((mod) => {
          const isActive = activeModuleId === mod.id
          const isInteractive = mod.status === 'interactive'
          return (
            <div key={mod.id}>
              <button
                type="button"
                className={`everyday-module-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectModule(mod.id)}
              >
                <b>{mod.number}</b>
                <div>
                  <strong>{mod.title}</strong>
                  <small>{mod.enTitle}</small>
                </div>
                <span className="everyday-status-text">
                  {isInteractive ? 'Available' : 'Coming next'}
                </span>
              </button>
              {isActive && isInteractive && mod.lessons && (
                <div className="everyday-lessons-rail">
                  {mod.lessons.map((les) => (
                    <button
                      key={les.id}
                      type="button"
                      className={`everyday-lesson-btn ${activeLessonId === les.id ? 'active' : ''}`}
                      aria-current={activeLessonId === les.id ? 'step' : undefined}
                      onClick={() => onSelectLesson(les.id)}
                    >
                      <strong>{les.title}</strong>
                      <small>{les.ja}</small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export function EverydayLearnView({ lesson, step, setStep, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (!lesson || !lesson.learn) return null
  const { learn } = lesson

  return (
    <div className="lesson-page">
      <LessonTitle eyebrow={`Everyday Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      
      <div className="everyday-step-selector">
        {[
          ['context', '1. Context'],
          ['notice', '2. Notice'],
          ['breakdown', '3. Breakdown'],
          ['imitate', '4. Imitate'],
        ].map(([s, label]) => (
          <button
            key={s}
            type="button"
            aria-pressed={step === s}
            className={`everyday-step-btn ${step === s ? 'active' : ''}`}
            onClick={() => setStep(s)}
          >
            {label}
          </button>
        ))}
      </div>

      {step === 'context' && (
        <div className="everyday-card">
          <span className="section-kicker">Can-do Outcome</span>
          <h3>{lesson.cando}</h3>
          <p>{learn.context}</p>
        </div>
      )}

      {step === 'notice' && (
        <div className="everyday-card">
          <span className="section-kicker">Listen & Notice</span>
          <h3>First pass — listen without rules</h3>
          <p>ルールを覚える前に、フレーズ全体の響きとリズムを聞きます。</p>
          <div className="notice-phrase-list">
            {learn.notice.map((item) => (
              <div key={item.text} className="notice-phrase-card">
                <div>
                  <strong>“{item.text}”</strong>
                  <span>{item.note}</span>
                </div>
                <button
                  type="button"
                  className="primary-button notice-play-btn"
                  onClick={() => speakWithBrowser(item.text)}
                >
                  <PlayIcon /> Play
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'breakdown' && (
        <div className="everyday-card">
          <span className="section-kicker">Listen + Breakdown</span>
          <h3>High-mileage chunks</h3>
          <div className="breakdown-list">
            {learn.breakdown.map((b) => (
              <div key={b.phrase} className="breakdown-item">
                <strong>{b.phrase}</strong>
                <p>{b.ja}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'imitate' && (
        <div className="everyday-card">
          <span className="section-kicker">Imitate & Shadow</span>
          <h3>Shadow stress & rhythm</h3>
          <p>音をまねて、声に出してみましょう。</p>
          <div className="imitate-grid">
            {learn.imitate.map((phrase) => (
              <div key={phrase} className="imitate-row">
                <strong>“{phrase}”</strong>
                <button
                  type="button"
                  className="primary-button imitate-play-btn"
                  onClick={() => speakWithBrowser(phrase)}
                >
                  <PlayIcon /> Listen & Repeat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function EverydayPracticeView({ lesson, step, setStep, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (!lesson || !lesson.practice) return null
  const { practice } = lesson
  const [selectedSub, setSelectedSub] = useState(0)
  const [selectedStarter, setSelectedStarter] = useState(null)
  const [showModel, setShowModel] = useState(false)

  return (
    <div className="practice-page">
      <LessonTitle eyebrow={`Everyday Practice · ${lesson.number}`} title={lesson.title} ja="学んだフレーズを自分の状況に合わせて使います。" />
      
      <div className="everyday-step-selector">
        {[
          ['substitute', '5. Substitute'],
          ['personalize', '6. Personalize'],
          ['mission', '7. Mission'],
          ['spaced', '8. Spaced Return'],
        ].map(([s, label]) => (
          <button
            key={s}
            type="button"
            aria-pressed={step === s}
            className={`everyday-step-btn ${step === s ? 'active' : ''}`}
            onClick={() => setStep(s)}
          >
            {label}
          </button>
        ))}
      </div>

      {step === 'substitute' && (
        <div className="everyday-card">
          <span className="section-kicker">Frame Substitution</span>
          <h3>{practice.substitute.label}</h3>
          <p>枠組み（フレーム）を保ったまま、スロットの表現を入れ替えます。</p>
          <div className="substitute-options-list">
            {practice.substitute.options.map((opt, i) => (
              <button
                key={opt.phrase}
                type="button"
                aria-pressed={selectedSub === i}
                className={`substitute-option ${selectedSub === i ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSub(i)
                  speakWithBrowser(opt.phrase.replace('___', 'Ken'))
                }}
              >
                <strong>“{opt.phrase}”</strong>
                <span>{opt.note}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'personalize' && (
        <div className="everyday-card">
          <span className="section-kicker">Personalize</span>
          <h3>Make it yours</h3>
          <p>{practice.personalize}</p>
          <div className="personalize-practice-box">
            <p className="personalize-heading">声に出して練習:</p>
            <p className="personalize-phrase">“{practice.substitute.options[selectedSub]?.phrase.replace('___', '[Your Info]')}”</p>
          </div>
        </div>
      )}

      {step === 'mission' && (
        <div className="everyday-card mission-card">
          <span className="section-kicker">Real-world Mission</span>
          <h3>Open Speaking Practice</h3>
          <div className="mission-scenario">
            <p>{practice.mission.scenario}</p>
          </div>
          {practice.mission.prompt && (
            <p className="mission-prompt">{practice.mission.prompt}</p>
          )}

          {practice.mission.starters && (
            <div className="mission-starters-list">
              <span className="section-subkicker">Useful response starters</span>
              {practice.mission.starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  aria-pressed={selectedStarter === starter}
                  className={`mission-starter-btn ${selectedStarter === starter ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedStarter(starter)
                    speakWithBrowser(starter)
                  }}
                >
                  “{starter}”
                </button>
              ))}
            </div>
          )}

          {practice.mission.modelResponse && (
            <div className="mission-model-wrapper">
              <button
                type="button"
                className="model-reveal-btn"
                aria-expanded={showModel}
                aria-controls="mission-model-box"
                onClick={() => setShowModel(!showModel)}
              >
                {showModel ? 'Hide model response' : 'Reveal model response'}
              </button>
              {showModel && (
                <div id="mission-model-box" className="mission-model-box">
                  <p>“{practice.mission.modelResponse}”</p>
                  <button
                    type="button"
                    className="primary-button model-listen-btn"
                    onClick={() => speakWithBrowser(practice.mission.modelResponse)}
                  >
                    <PlayIcon /> Listen to model
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 'spaced' && (
        <div className="everyday-card">
          <span className="section-kicker">Spaced Return</span>
          <h3>Learning loop connection</h3>
          <p>{practice.spaced}</p>
        </div>
      )}
    </div>
  )
}

export function EverydayOverviewView({ modules = everydayModules, onSelectModule, LessonTitle }) {
  return (
    <div className="lesson-page everyday-overview-page">
      <LessonTitle
        eyebrow="Everyday Fluency · 8 Core Modules"
        title="Everyday English for Real Contexts"
        ja="場面・目的別の実用英会話。理解してから、声に出し、自分の状況に置き換えます。"
      />
      <div className="everyday-module-rail-list">
        {modules.map((mod) => (
          <div key={mod.id} className={`everyday-rail-item ${mod.status}`}>
            <div className="rail-item-num">{mod.number}</div>
            <div className="rail-item-content">
              <div className="rail-item-header">
                <h3>{mod.title}</h3>
                <span className="rail-item-en">{mod.enTitle}</span>
                <span className="rail-status-text">
                  {mod.status === 'interactive' ? 'Available' : 'Coming next'}
                </span>
              </div>
              <p className="rail-item-cando"><strong>Can-do:</strong> {mod.cando}</p>
              {mod.lessons && (
                <ol className="overview-lesson-list">
                  {mod.lessons.map((les) => (
                    <li key={les.id}>
                      <strong>{les.number} {les.title}</strong>
                      <small>{les.ja}</small>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {mod.status === 'interactive' && onSelectModule && (
              <button
                type="button"
                className="primary-button rail-start-btn"
                onClick={() => onSelectModule(mod.id)}
              >
                Start Module
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
