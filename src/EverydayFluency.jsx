import { useState } from 'react'
import { socialFluencyChapterCount } from './socialFluencyCurriculum'

export function EverydaySidebar({ activeModuleId, onSelectModule, activeLessonId, onSelectLesson, curriculum, CurriculumNav }) {
  return (
    <aside className="everyday-sidebar">
      {CurriculumNav && <CurriculumNav {...curriculum} activeEverydayModuleId={activeModuleId} onSelectEverydayModule={onSelectModule} activeEverydayLessonId={activeLessonId} onSelectEverydayLesson={onSelectLesson} />}
      <div className="sidebar-note"><small>Social Fluency</small><strong>人とつながる英会話</strong><span>96章の場面と理論を、理解してから声に出し、自分の状況に置き換えます。</span></div>
    </aside>
  )
}

export function EverydayLearnView({ lesson, step, setStep, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (!lesson || !lesson.learn) return null
  const { learn } = lesson

  return (
    <div className="lesson-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      
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
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title={lesson.title} ja="学んだフレーズを自分の状況に合わせて使います。" />
      
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

export function EverydayOverviewView({ parts = [], activeModuleId, onSelectModule, LessonTitle }) {
  return (
    <div className="lesson-page everyday-overview-page">
      <LessonTitle
        eyebrow={`Social Fluency · ${socialFluencyChapterCount} chapters · ${parts.length} parts`}
        title="English for real social life"
        ja="96章の場面・目的別の英会話。理解してから、声に出し、自分の状況に置き換えます。"
      />
      <div className="everyday-module-rail-list">
        {parts.map((part) => (
          <section key={part.id} className="everyday-rail-item social-fluency-part">
            <div className="rail-item-num">{part.number}</div>
            <div className="rail-item-content">
              <div className="rail-item-header">
                <h3>{part.title}</h3>
                <span className="rail-item-en">{part.ja}</span>
                <span className="rail-status-text">{part.chapters.length} chapters</span>
              </div>
              <ol className="overview-lesson-list social-fluency-chapters">
                {part.chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      className={`social-chapter-link ${activeModuleId === chapter.id ? 'active' : ''}`}
                      aria-current={activeModuleId === chapter.id ? 'page' : undefined}
                      onClick={() => onSelectModule?.(chapter.id)}
                    >
                      <strong>{chapter.number}. {chapter.enTitle}</strong>
                      <small>{chapter.ja}</small>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
