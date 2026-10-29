import { useEffect, useRef, useState } from 'react'
import { asset, Button, Portrait } from './components'
import { useLanguage } from './Language'
import { learningStages } from './pathway'
import CurriculumIcon, { stageIcon } from './CurriculumIcon'
import { landingCopy } from './landingCopy'
import './landing.css'

export default function Landing() {
  const { language, setLanguage } = useLanguage()
  const copy = landingCopy[language]
  const methodRef = useRef(null)
  const pathRef = useRef(null)
  const mainRef = useRef(null)
  const [selected, setSelected] = useState([false, true])
  // Enter the app through Home; learners choose their next step there.
  const startHref = '/home'
  const startLabel = copy.open

  useEffect(() => {
    document.title = 'Artico — One language. Infinite possibilities.'
  }, [])

  function scrollTo(ref) {
    const target = ref.current
    target.focus({ preventScroll: true })
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="aw-landing" data-language={language}>
      <a className="al-skip" href="#al-content" onClick={(event) => { event.preventDefault(); scrollTo(mainRef) }}>{copy.skip}</a>
      <header className="al-header">
        <nav className="al-container al-nav" aria-label={copy.navigation}>
          <a className="al-wordmark artico-wordmark" href="#/home" aria-label={copy.open}>artico<span className="artico-wordmark-dot" aria-hidden="true">.</span></a>
          <div className="al-nav-links">
            <button type="button" onClick={() => scrollTo(methodRef)}>{copy.how}</button>
            <button type="button" onClick={() => scrollTo(pathRef)}>{copy.course}</button>
          </div>
          <button className="al-language" type="button" lang={language === 'ja' ? 'en' : 'ja'}
            aria-label={language === 'ja' ? 'Switch to English' : '日本語に切り替える'}
            onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}>
            {language === 'ja' ? 'EN' : '日本語'}
          </button>
          <Button className="al-nav-start" href={startHref}>
            <span className="al-wide-label">{startLabel}</span>
            <span className="al-short-label">{copy.shortStart}</span>
          </Button>
        </nav>
      </header>
      <main ref={mainRef} id="al-content" tabIndex={-1}>
        <section className="al-container al-hero" aria-labelledby="al-title">
          <div className="al-hero-copy">
            <p className="al-kicker" lang="en">ENGLISH FOR EVERYDAY LIFE</p>
            <h1 id="al-title" className="al-title" lang="en">
              <span>One language.</span><span>Infinite possibilities.</span>
            </h1>
            <p className="al-subtitle">{copy.subtitle}</p>
            <p className="al-intro">{copy.intro.map((line) => <span key={line}>{line}</span>)}</p>
            <div className="al-actions">
              <Button href={startHref}>{startLabel}</Button>
              <Button variant="quiet" onClick={() => scrollTo(methodRef)}>{copy.seeHow}</Button>
            </div>
            <p className="al-fine">{copy.reassurance}</p>
          </div>
          <figure className="al-vignette">
            <div className="al-scene">
              <img src={asset('e0652.svg')} width="520" height="260" alt={copy.sceneAlt} fetchPriority="high" />
            </div>
            <div className="al-phrase">
              <p lang="en">Nice to meet you.</p>
              <p>{copy.phraseSupport}</p>
            </div>
            <figcaption className="al-fine">{copy.caption}</figcaption>
          </figure>
        </section>
        <section className="al-method" aria-labelledby="al-method-title">
          <div className="al-container al-method-inner">
            <header className="al-section-heading">
              <p className="al-kicker" lang="en">TWO MODES. ONE CONTINUOUS LESSON.</p>
              <h2 ref={methodRef} tabIndex={-1} id="al-method-title">{copy.methodTitle.map((line) => <span key={line}>{line}</span>)}</h2>
              <p className="al-section-intro">{copy.methodIntro}</p>
            </header>
            <div className="al-previews">
              <article className="al-preview" aria-labelledby="al-study-title">
                <p className="al-kicker" lang="en">01 / STUDY</p>
                <h3 id="al-study-title">{copy.study}</h3>
                <div className="al-conversation">
                  {[
                    { name: 'Maya', phrase: 'Hi, I’m Maya.', support: copy.maya },
                    { name: 'Eli', phrase: 'Nice to meet you.', support: copy.eli },
                  ].map((turn) => (
                    <div className="al-turn" key={turn.name}>
                      <Portrait name={turn.name} size={32} />
                      <div className="al-turn-copy">
                        <p className="al-kicker" lang="en">{turn.name.toUpperCase()}</p>
                        <p className="al-spoken" lang="en">{turn.phrase}</p>
                        <p className="al-support">{turn.support}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="al-note al-study-note">{copy.studyNote}</p>
              </article>
              <article className="al-preview" aria-labelledby="al-practice-title">
                <p className="al-kicker" lang="en">02 / PRACTICE</p>
                <h3 id="al-practice-title">{copy.practice.map((line) => <span key={line}>{line}</span>)}</h3>
                <fieldset className="al-choices">
                  <legend className="al-sr-only">{copy.choose}</legend>
                  {[
                    { phrase: 'Hi, I’m Maya.', support: copy.introduce },
                    { phrase: 'Nice to meet you.', support: copy.greet },
                  ].map((item, index) => (
                    <label key={item.phrase} className={`al-choice ${selected[index] ? 'is-selected' : ''}`}>
                      <input type="checkbox" checked={selected[index]}
                        onChange={() => setSelected((previous) => previous.map((value, i) => i === index ? !value : value))} />
                      <span className="al-checkbox" aria-hidden="true"><img src={asset('203e3.svg')} width="10.4667" height="7.8" alt="" /></span>
                      <span className="al-choice-copy"><span lang="en">{item.phrase}</span><span className="al-support">{item.support}</span></span>
                    </label>
                  ))}
                </fieldset>
                <p className="al-note">{copy.practiceNote}</p>
              </article>
            </div>
          </div>
        </section>
        <section className="al-container al-path" aria-labelledby="al-path-title">
          <p className="al-kicker" lang="en">A CLEAR PATH. YOUR OWN PACE.</p>
          <h2 ref={pathRef} tabIndex={-1} id="al-path-title">{copy.pathTitle.map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="al-stages">
            {learningStages.map((stage, index) => (
              <a key={stage.id} href={`#${index === 0 ? stage.start : stage.overview}`} className="al-stage">
                <div className="al-stage-top"><CurriculumIcon name={stageIcon(stage.id)} size={29} /><span className="al-kicker">0{index + 1}</span></div>
                <h3 lang="en">{index === 0 ? 'Start here' : stage.title}</h3>
                {language === 'ja' && <span className="al-stage-support">{stage.ja}</span>}
                <p>{copy.stages[index]}</p>
              </a>
            ))}
          </div>
          <p className="al-note">{copy.pathNote}</p>
        </section>
        <section className="al-closing" aria-labelledby="al-closing-title">
          <div className="al-container al-closing-inner">
            <h2 id="al-closing-title" lang="en"><span>Your next conversation</span><span>starts here.</span></h2>
            <p>{copy.closing}</p>
            <Button href={startHref}>{startLabel}</Button>
            <p className="al-fine">{copy.saving}</p>
          </div>
        </section>
      </main>
      <footer className="al-container al-footer">
        <p className="al-wordmark artico-wordmark">artico<span className="artico-wordmark-dot" aria-hidden="true">.</span></p>
        <p className="al-fine">© {new Date().getFullYear()} Artico</p>
        <div className="al-footer-links">
          <a href={`#${learningStages[0].start}`}>{copy.startHere}</a>
          <a href="#/home">{copy.open}</a>
        </div>
      </footer>
    </div>
  )
}
