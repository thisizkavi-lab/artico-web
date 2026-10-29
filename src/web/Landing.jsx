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
      <main ref={mainRef} id="al-content" tabIndex={-1}>
        <section className="al-splash" aria-labelledby="al-title">
          <img
            className="al-splash-art"
            src={`${import.meta.env.BASE_URL}landing-hero-background.svg`}
            width="2048"
            height="996"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="al-splash-content">
            <h1 className="al-splash-title" id="al-title" lang="en">
              <span>One language, infinite</span>{' '}
              <span>possibilities.</span>
            </h1>
            <p className="al-splash-description" lang="en">
              Turn English from a barrier into a multiplier — giving people in the world, the freedom to communicate, connect, and create in the most powerful language of our age.
            </p>
            <a className="al-splash-cta" href="#/home">Get Started</a>
          </div>
        </section>
        <section className="al-why" lang="en" aria-labelledby="al-why-title">
          <div className="al-why-inner">
            <header className="al-why-heading">
              <p className="al-why-overline">THE IDEA BEHIND ARTICO</p>
              <h2 id="al-why-title">why artico?</h2>
              <span className="al-why-accent" aria-hidden="true" />
            </header>
            <div className="al-why-story">
              <p className="al-why-lead">
                real learning needs effort. but effort shouldn’t feel like pain — it should feel like <mark>flow</mark>. if something’s too easy, you don’t grow. if it’s too hard, you quit. this app sits in that <mark>perfect middle</mark> — where you’re challenged, but never lost. you grow without noticing you’re grinding.
              </p>
              <p>
                English here isn’t taught like a subject. it’s <mark>trained like a skill</mark> — like an athlete sharpening control, or an artist refining craft. you build the mechanics first — <mark>sound, rhythm, movement</mark> — then you perform. you don’t memorize rules; you <mark>train expression</mark>.
              </p>
              <p>
                and beyond all that, <mark>communication</mark> is the core of everything. it’s how you think, connect, and lead. English just happens to be the <mark>universal interface</mark> — the key that opens almost every door in today’s world.
              </p>
              <p className="al-why-finish">
                this app doesn’t just teach you English. it shapes how you <mark>speak, think, and carry yourself</mark> — so that when you talk, <mark>people feel it</mark>.
              </p>
            </div>
          </div>
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
        <section className="al-journey" aria-labelledby="al-path-title">
          <h2 ref={pathRef} tabIndex={-1} id="al-path-title" className="al-sr-only">The Artico learning journey</h2>
          <div className="al-journey-inner">
            <div className="al-journey-illustration">
              <svg viewBox="0 0 720 610" role="img" aria-label="A winding journey from letters to conversation, real-life English and expressive mastery" xmlns="http://www.w3.org/2000/svg">
                <path d="M95 490 C180 565 265 552 270 416 C273 314 343 290 412 337 C500 399 578 430 638 235" fill="none" stroke="#252725" strokeWidth="5.5" strokeLinecap="round" strokeDasharray="13 13"/>
                <g transform="translate(35 405)">
                  <rect x="37" y="48" width="98" height="68" rx="34" fill="#f8e6c7" opacity=".6"/>
                  <path d="M49 90Q68 70 92 90L102 152H42Z" fill="#f2c957" stroke="#29302d" strokeWidth="2.5"/>
                  <path d="M56 151v40m27-40 4 40" stroke="#253b39" strokeWidth="9" strokeLinecap="round"/>
                  <circle cx="69" cy="53" r="23" fill="#f8d0ac" stroke="#29302d" strokeWidth="2"/>
                  <path d="M45 52q-5-33 30-30 22 1 18 24-21-9-29-18-2 19-19 24Z" fill="#33333b"/>
                  <path d="M63 55h2m15 0h2M69 65q7 6 12-1" stroke="#29302d" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M47 97 23 122m69-21 25 14" stroke="#f2c957" strokeWidth="12" strokeLinecap="round"/>
                  <g stroke="#46554a" strokeWidth="1.3"><rect x="104" y="132" width="30" height="24" fill="#d7e2f2"/><rect x="124" y="106" width="29" height="25" fill="#f8df81"/><rect x="149" y="133" width="31" height="25" fill="#a9d1c7"/><rect x="134" y="158" width="32" height="23" fill="#eaa995"/></g>
                  <text x="112" y="150" fontSize="13" fontWeight="700" fill="#38555f">A</text><text x="133" y="124" fontSize="13" fontWeight="700" fill="#38555f">B</text><text x="158" y="150" fontSize="13" fontWeight="700" fill="#38555f">C</text>
                  <text x="100" y="215" fontSize="17" fontWeight="700" textAnchor="middle" fill="#30332e">raw mechanics</text>
                </g>
                <g transform="translate(225 221)">
                  <rect x="28" y="0" width="64" height="31" rx="10" fill="#d0e7da"/>
                  <circle cx="45" cy="15" r="3" fill="#649b86"/><circle cx="61" cy="15" r="3" fill="#649b86"/><circle cx="77" cy="15" r="3" fill="#649b86"/>
                  <path d="M48 30 40 39v-9" fill="#d0e7da"/>
                  <rect x="102" y="-8" width="64" height="30" rx="10" fill="#d0e7da"/>
                  <circle cx="119" cy="7" r="3" fill="#649b86"/><circle cx="136" cy="7" r="3" fill="#649b86"/><circle cx="151" cy="7" r="3" fill="#649b86"/>
                  <path d="M143 21 152 29v-8" fill="#d0e7da"/>
                  <path d="M35 99Q41 67 74 72Q106 73 107 110v29H35Z" fill="#5a9787"/>
                  <path d="M100 105Q105 78 134 80Q163 81 165 110v29h-65Z" fill="#4a7998"/>
                  <circle cx="75" cy="58" r="23" fill="#dfaa7c"/><circle cx="135" cy="66" r="22" fill="#e7b88b"/>
                  <path d="M52 53Q50 26 71 29Q95 26 98 52 75 45 65 36 63 48 52 53Z" fill="#382e29"/>
                  <path d="M113 61Q110 35 132 37Q154 35 157 60 139 51 130 44 128 56 113 61Z" fill="#342f2c"/>
                  <path d="M72 63q7 7 13 0m47 9q7 7 12 0" fill="none" stroke="#513b32" strokeWidth="2.5" strokeLinecap="round"/>
                  <text x="103" y="169" fontSize="17" fontWeight="700" textAnchor="middle" fill="#30332e">social fluency</text>
                </g>
                <g transform="translate(438 257)">
                  <path d="M60 58q-36 7-38 62l-10 40h102l-10-40q-6-55-44-62Z" fill="#8b99b3"/>
                  <path d="M46 57 60 99 74 57l-9-8H56Z" fill="#fff"/>
                  <path d="M59 85 52 121h18L63 85Z" fill="#e3ab69"/>
                  <path d="M42 152l-5 53m48-53 5 53" stroke="#37485d" strokeWidth="14" strokeLinecap="round"/>
                  <path d="M27 205h25m28 0h28" stroke="#202729" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="60" cy="32" r="25" fill="#edc1a0"/>
                  <path d="M36 24Q36 -2 61 5Q91 2 84 32l-7-5-9-16q-12 12-32 13Z" fill="#353538"/>
                  <path d="M54 37h2m16 0h2m-17 9q6 5 11 0" stroke="#42362f" strokeWidth="2" fill="none"/>
                  <path d="M21 83-3 121m101-38 25 40" stroke="#8b99b3" strokeWidth="13" strokeLinecap="round"/>
                  <rect x="105" y="112" width="39" height="38" rx="5" fill="#7a5c3e" stroke="#463b34" strokeWidth="2"/>
                  <path d="M116 112v-10q9-9 17 0v10" stroke="#463b34" strokeWidth="3" fill="none"/>
                  <text x="63" y="233" fontSize="17" fontWeight="700" textAnchor="middle" fill="#30332e">application</text>
                </g>
                <g transform="translate(568 70)">
                  <path d="M30 99Q45 72 81 72Q117 72 134 100l8 69H18Z" fill="#f3c451" stroke="#59472a" strokeWidth="2"/>
                  <circle cx="80" cy="52" r="33" fill="#ecc29d"/>
                  <path d="M47 51q-3-39 33-39 41 2 34 43-13-6-23-21-10 12-41 17Z" fill="#332c28"/>
                  <path d="M47 55q-10-34 12-44m51 7q17 16 8 40" fill="none" stroke="#25282e" strokeWidth="9" strokeLinecap="round"/>
                  <rect x="34" y="46" width="17" height="39" rx="8" fill="#4e5964"/><rect x="112" y="45" width="17" height="39" rx="8" fill="#4e5964"/>
                  <path d="M112 76q0 19-25 22" fill="none" stroke="#4e5964" strokeWidth="4"/>
                  <circle cx="84" cy="98" r="6" fill="#4e5964"/>
                  <path d="M68 62h3m23 0h3m-19 14q10 5 17-2" fill="none" stroke="#503c32" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 115-7 134m144-20 22 20" stroke="#f3c451" strokeWidth="14" strokeLinecap="round"/>
                  <g transform="translate(-30 80)" stroke="#32373b" strokeWidth="3" fill="#3d444d">
                    <rect x="0" y="0" width="25" height="37" rx="11"/><path d="M12 37v15m-13 0h26" fill="none"/>
                    <path d="M25 10h20l16 7" fill="none"/>
                  </g>
                  <text x="80" y="203" fontSize="17" fontWeight="700" textAnchor="middle" fill="#30332e">apex communicator</text>
                </g>
              </svg>
            </div>
            <div className="al-journey-cards">
              <a href="#/courses?foundation" className="al-journey-card">
                <h3>[ Foundations / Raw mechanics ]</h3>
                <p className="al-journey-tagline">build the base before the voice</p>
                <p>learn from zero — sounds, letters, words, and rhythm. master the mechanics of English like a craftsperson sharpening tools.</p>
              </a>
              <a href="#/courses?social" className="al-journey-card">
                <h3>[ Social Fluency ]</h3>
                <p className="al-journey-tagline">talk like a human, not a textbook</p>
                <p>practice real conversations. greetings, emotions, everyday talk. learn to connect — not just translate.</p>
              </a>
              <a href="#/application" className="al-journey-card">
                <h3>[ Application ]</h3>
                <p className="al-journey-tagline">English that works in real life</p>
                <p>train for what matters: job interviews, storytelling, debates, public speaking, writing — whatever your world needs.</p>
              </a>
              <div className="al-journey-card al-journey-card-future">
                <h3>[ Apex Communicator ]</h3>
                <p className="al-journey-tagline">language becomes art.</p>
                <p>go beyond fluency. think clearly, speak with flow, and express truth with precision. English becomes part of who you are.</p>
                <span className="al-journey-vision">the destination, not a separate course</span>
              </div>
            </div>
          </div>
          <p className="al-journey-footnote"><a href="#/foundation/orientation/study">New here? Begin with Orientation.</a> Or choose the stage that fits you.</p>
        </section>
        <section className="al-final-cta" aria-labelledby="al-closing-title">
          <div className="al-final-cta-inner">
            <h2 id="al-closing-title">your English journey starts now...</h2>
            <a href="#/home" className="al-final-cta-button">Get Started</a>
          </div>
        </section>
      </main>
      <footer className="al-footer">
        <div className="al-footer-main">
          <div className="al-footer-brand">
            <a className="al-footer-logo artico-wordmark" href="#/home" aria-label={copy.open}>artico<span className="artico-wordmark-dot" aria-hidden="true">.</span></a>
            <p className="al-footer-tagline">english but better...</p>
            <div className="al-footer-lang-wrap">
              <button className="al-footer-language" type="button" lang={language === 'ja' ? 'en' : 'ja'}
                aria-label={language === 'ja' ? 'Switch to English' : '日本語に切り替える'}
                onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}>
                {language === 'ja' ? 'EN' : '日本語'}
              </button>
            </div>
          </div>
          <nav className="al-footer-directory" aria-label="Footer navigation">
            <div className="al-footer-column">
              <h3>Explore</h3>
              <a href="#/home">Get Started</a>
              <a href="#/foundation/orientation/study">Orientation</a>
              <a href="#/courses?foundation">Level Zero</a>
            </div>
            <div className="al-footer-column">
              <h3>About us</h3>
              <a href="#al-why-title" onClick={(event) => { event.preventDefault(); document.getElementById('al-why-title')?.scrollIntoView({ behavior: 'smooth' }) }}>Why Artico</a>
              <a href="#al-method-title" onClick={(event) => { event.preventDefault(); scrollTo(methodRef) }}>How it works</a>
            </div>
            <div className="al-footer-column">
              <h3>Resources</h3>
              <a href="#/courses?social">Social Fluency</a>
              <a href="#/application">Application</a>
            </div>
            <div className="al-footer-column">
              <h3>Support</h3>
              <a href="https://github.com/thisizkavi-lab/artico-web" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/thisizkavi-lab/artico-web/issues" target="_blank" rel="noopener noreferrer">Report an issue</a>
            </div>
          </nav>
        </div>
        <div className="al-footer-bottom">
          <span>© {new Date().getFullYear()} Artico</span>
          <span>English for everyday life.</span>
        </div>
      </footer>
    </div>
  )
}
