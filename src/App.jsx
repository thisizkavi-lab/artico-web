import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { allTwisters, alphabet, learnSteps, tongueGroups } from './data'
import { socialFluencyChapters, socialFluencyParts } from './socialFluencyCurriculum'
import { orientationSections } from './orientationContent'
import { howItWorksSections } from './howItWorksContent'
import { EverydaySidebar, EverydayLearnView, EverydayPracticeView, EverydayOverviewView } from './EverydayFluency'

function speakWithBrowser(text, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  const { rate = 1.0, onend, onerror } = options
  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    if (onend) utterance.onend = onend
    if (onerror) utterance.onerror = onerror
    window.speechSynthesis.speak(utterance)
    return true
  } catch (e) {
    if (onerror) onerror(e)
    return false
  }
}

// Keep every lesson audio source in one shared playback lane. A new source
// claims the lane and stops the previous one, even when the two clips live in
// different lesson cards or practice sections.
let activePlayback = null

function claimPlayback(token, stop) {
  if (activePlayback && activePlayback !== token) {
    const previous = activePlayback
    activePlayback = null
    previous.stop()
  }
  token.stop = stop
  activePlayback = token
}

function releasePlayback(token) {
  if (activePlayback === token) activePlayback = null
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
)

const PlayIcon = ({ pause = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {pause ? <><path d="M8 6v12M16 6v12" /></> : <path d="m9 6 9 6-9 6Z" />}
  </svg>
)

const ProfileIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21"/><circle cx="24" cy="18" r="7"/><path d="M11 38c2-9 7-13 13-13s11 4 13 13"/></svg>
)

function Logo({ onClick }) {
  return (
    <button className="logo" type="button" onClick={onClick} aria-label="Artico home">
      <span>artiCo</span>
      <small>english but better...</small>
    </button>
  )
}

function PrimaryButton({ children, onClick, className = '', disabled = false }) {
  return <button className={`primary-button ${className}`} type="button" onClick={onClick} disabled={disabled}>{children}<ArrowIcon /></button>
}

function LandingHeader({ onStart, language, setLanguage, onLogin }) {
  return (
    <header className="landing-header">
      <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <nav aria-label="Main navigation">
        <a href="#why">Why Artico</a>
        <a href="#how">How it works</a>
      </nav>
      <div className="header-actions">
        <button className="language-button" type="button" onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')} aria-label={language === 'ja' ? 'Switch to English' : 'Switch to Japanese'}>
          <span>{language === 'ja' ? 'JA' : 'EN'}</span>
        </button>
        <PrimaryButton onClick={onStart}>Get Started</PrimaryButton>
        <button className="login-button" type="button" onClick={onLogin}>Log in</button>
      </div>
    </header>
  )
}

function ConversationScene() {
  return (
    <svg className="conversation-scene" viewBox="0 0 1440 760" aria-hidden="true">
      <g className="scene-fill">
        <path d="M610 70c0-44 51-76 122-76 83 0 144 44 144 102 0 51-49 93-120 101l-40 39 7-43c-68-13-113-60-113-123Z"/>
        <circle cx="728" cy="339" r="56"/><path d="M582 574c28-106 78-169 151-169 76 0 132 64 161 169v186H582Z"/>
        <circle cx="344" cy="390" r="58"/><path d="M152 642c44-113 111-173 199-173 74 0 130 41 172 124L407 760H182Z"/>
        <circle cx="1038" cy="365" r="58"/><path d="M884 618c26-103 79-163 160-163 84 0 151 65 198 194l-66 111H915Z"/>
        <circle cx="92" cy="524" r="48"/><path d="M-70 728c37-105 96-157 179-157 62 0 113 34 155 101l-74 88H0Z"/>
        <circle cx="1330" cy="500" r="49"/><path d="M1202 653c38-72 89-108 153-108 80 0 144 56 191 168l-17 47h-259Z"/>
      </g>
      <g className="scene-lines"><path d="M480 300c41-44 80-66 117-65M871 257c36-44 73-66 108-66M1150 405c52-28 100-35 142-21M244 416c-48-27-94-32-137-14"/><path d="m808 538 91 149M778 563l70 114M1000 520l121 130M332 570l99 88"/></g>
    </svg>
  )
}

function ProductPreview({ type }) {
  if (type === 'why') {
    return (
      <div className="product-preview why-preview">
        <div className="preview-top"><span>Social fluency</span><span className="preview-plus">+</span></div>
        <div className="phrase-card">
          <small>Make it yours</small>
          <strong>“Nice to meet you.”</strong>
          <p>はじめまして。でも、あなたらしく。</p>
          <div className="mini-wave" aria-hidden="true">{[24,38,18,50,29,16,43,27,33].map((h, i) => <i key={i} style={{ height: h }} />)}</div>
          <button type="button">Try it aloud</button>
        </div>
        <p className="preview-caption">listen → repeat → personalize</p>
      </div>
    )
  }

  return (
    <div className="product-preview path-preview">
      <small>Your learning path</small>
      <p>understand → practice → return → use</p>
      <div className="path-line">
        {[
          ['1', 'Understand', 'short theory'],
          ['2', 'Practice', 'guided aloud'],
          ['3', 'Return', 'spaced review'],
          ['4', 'Use', 'real life'],
        ].map(([n, label, hint]) => <div key={n}><b>{n}</b><strong>{label}</strong><span>{hint}</span></div>)}
      </div>
      <div className="today-guidance"><small>Today’s guidance</small><span>Find a quiet place. Put on headphones. Speak without rushing.</span></div>
    </div>
  )
}

function LandingPage({ onStart }) {
  const [language, setLanguage] = useState('ja')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <div className="landing-page">
      <LandingHeader onStart={onStart} language={language} setLanguage={setLanguage} onLogin={() => setNotice(language === 'ja' ? 'ログインは次の開発段階で接続します。' : 'Login will be connected in the next build phase.')} />
      <main>
        <section className="hero-section">
          <ConversationScene />
          <div className="hero-content">
            <h1>One language, infinite<br />possibilities.</h1>
            <p>{language === 'ja' ? '英語を「壁」ではなく、世界とつながり、自分を伝えるための力に変える。' : 'Turn English from a barrier into a multiplier—the freedom to communicate, connect, and create.'}</p>
            <PrimaryButton onClick={onStart}>Get Started</PrimaryButton>
          </div>
        </section>

        <section className="landing-feature" id="why">
          <div className="feature-copy feature-copy-centered">
            <h2>why artiCo?</h2>
            <p>this app doesn’t just teach you English. it shapes how you speak, think, and carry yourself — so that when you talk, people feel it.</p>
          </div>
          <ProductPreview type="why" />
        </section>

        <section className="landing-feature how-section" id="how">
          <div className="feature-copy">
            <h2>How artiCo<br />works?</h2>
            <p>you start from scratch — sounds, letters, tongue movement, and rhythm. the basics most people skip, but the real foundation of clear speech.</p>
            <p>from there, you move into social fluency: greetings, emotions, stories, and everyday talk. you stop memorizing and start connecting.</p>
          </div>
          <ProductPreview type="path" />
        </section>

        <section className="landing-cta">
          <h2>your English journey starts here.</h2>
          <PrimaryButton onClick={onStart}>Get Started</PrimaryButton>
        </section>
      </main>
      <footer className="landing-footer">
        <div><Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} /><p>© 2026 Artico</p></div>
        <div><strong>Explore</strong><a href="#how">How it works</a><button type="button" onClick={onStart}>Course</button><a href="#why">Philosophy</a></div>
        <div><strong>About us</strong><span>About Artico</span><span>Contact</span></div>
        <div><strong>Resources</strong><span>Learning guide</span><span>FAQs</span></div>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

function AppHeader({ mode, setMode, onHome, onProfileClick }) {
  return (
    <header className="app-header">
      <Logo onClick={onHome} />
      <div className="mode-switch" aria-label="Learning mode">
        <button aria-pressed={mode === 'learn'} className={mode === 'learn' ? 'active' : ''} type="button" onClick={() => setMode('learn')}><span className="book-symbol">◆</span>Learn</button>
        <button aria-pressed={mode === 'practice'} className={mode === 'practice' ? 'active' : ''} type="button" onClick={() => setMode('practice')}><span className="mouth-symbol">◌</span>Practice</button>
      </div>
      <button className="profile-button" type="button" aria-label="Profile" onClick={onProfileClick}><ProfileIcon /></button>
    </header>
  )
}

function DisclosureIcon({ expanded }) {
  return (
    <svg className={`disclosure-icon ${expanded ? 'expanded' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 6 4 4 4-4" />
    </svg>
  )
}

function CurriculumNav({
  courseLayer,
  setCourseLayer,
  foundationOpen,
  setFoundationOpen,
  everydayOpen,
  setEverydayOpen,
  activeFoundationId,
  onSelectFoundation,
  activeEverydayModuleId,
  onSelectEverydayModule,
  activeEverydayLessonId,
  onSelectEverydayLesson,
}) {
  const chooseFoundation = (id) => {
    setCourseLayer('foundation')
    onSelectFoundation?.(id)
  }

  const chooseEveryday = (id) => {
    setCourseLayer('fluency')
    onSelectEverydayModule?.(id)
  }

  return (
    <nav className="curriculum-tree" aria-label="Course curriculum">
      <section className={`curriculum-section ${courseLayer === 'foundation' ? 'current' : ''}`}>
        <button
          type="button"
          className="curriculum-section-toggle"
          aria-expanded={foundationOpen}
          onClick={() => setFoundationOpen((open) => !open)}
        >
          <DisclosureIcon expanded={foundationOpen} />
          <span>Part 1: Foundation</span>
        </button>
        {foundationOpen && (
          <ol className="curriculum-list">
            {learnSteps.map((step, index) => (
              <li key={step.id}>
                <button
                  type="button"
                  className={`curriculum-item ${courseLayer === 'foundation' && activeFoundationId === step.id ? 'active' : ''}`}
                  aria-current={courseLayer === 'foundation' && activeFoundationId === step.id ? 'page' : undefined}
                  onClick={() => chooseFoundation(step.id)}
                >
                  <span className="curriculum-number">{index + 1}.</span>
                  <span className="curriculum-item-copy"><strong>{step.label}</strong><small>{step.ja}</small></span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className={`curriculum-section ${courseLayer === 'fluency' ? 'current' : ''}`}>
        <button
          type="button"
          className="curriculum-section-toggle"
          aria-expanded={everydayOpen}
          onClick={() => setEverydayOpen((open) => !open)}
        >
          <DisclosureIcon expanded={everydayOpen} />
          <span>Part 2: Social Fluency</span>
        </button>
        {everydayOpen && (
          <ol className="curriculum-list curriculum-list-everyday">
            {socialFluencyChapters.map((chapter) => {
              const moduleActive = courseLayer === 'fluency' && activeEverydayModuleId === chapter.id
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    className={`curriculum-item ${moduleActive ? 'active' : ''}`}
                    aria-current={moduleActive ? 'page' : undefined}
                    onClick={() => chooseEveryday(chapter.id)}
                  >
                    <span className="curriculum-number">{chapter.number}.</span>
                    <span className="curriculum-item-copy"><strong>{chapter.enTitle}</strong><small>{chapter.ja}</small></span>
                  </button>
                </li>
              )
            })}
          </ol>
        )}
      </section>
    </nav>
  )
}

function LessonSidebar({ active, onSelect, curriculum }) {
  return (
    <aside className="lesson-sidebar">
      <CurriculumNav {...curriculum} activeFoundationId={active} onSelectFoundation={onSelect} />
      <div className="sidebar-note"><small>Learning loop</small><strong>Understand → practise → return</strong><span>理解してから、口を動かし、時間をあけて戻ります。</span></div>
    </aside>
  )
}

function LessonTitle({ eyebrow, title, ja }) {
  return <div className="lesson-title"><small>{eyebrow}</small><h1>{title}</h1><p>{ja}</p></div>
}

function PracticeUnavailable({ lessonLabel, lessonJa, onBackToLearn }) {
  return (
    <section className="lesson-page practice-unavailable-page">
      <LessonTitle
        eyebrow="Practice · this lesson is learn-only"
        title="There is no practice section here yet."
        ja={`${lessonLabel}（${lessonJa}）は、今はLearnだけのレッスンです。`}
      />
      <div className="practice-unavailable-card">
        <span className="section-kicker">Learn first</span>
        <h2>このレッスンにはPracticeがありません。</h2>
        <p>ここでは理論や学び方を読むことに集中します。Practiceは、練習が用意されているレッスンだけに表示されます。</p>
        <p className="practice-unavailable-note">Practice is lesson-specific. Tongue Twisters has its own guided drill; other lessons will open their own practice when they are ready.</p>
        <div className="practice-unavailable-actions">
          <SecondaryButton onClick={onBackToLearn}>Back to Learn</SecondaryButton>
        </div>
      </div>
    </section>
  )
}

const theorySectionSets = {
  orientation: orientationSections,
  'how-it-works': howItWorksSections,
}

function TheoryBookLesson({ onPrevious, previousLabel, onNext, activeSectionId, eyebrow, title, ja, sections, closingTitle = '理解したら、次は口を動かします。', closingCopy = 'ここで覚えるのは答えではありません。あなたが英語を学ぶ理由と、これからの学び方の地図です。', footerLabel, footerNote }) {
  return (
    <section className="lesson-page orientation-page">
      <LessonTitle eyebrow={eyebrow} title={title} ja={ja} />
      <div className="orientation-reader">
        {sections.map((section, index) => (
          <article className={`orientation-section ${activeSectionId === section.id ? 'is-active' : ''}`} id={section.id} key={section.id}>
            <header className="orientation-section-header">
              <span>{section.number}</span>
              <div><small>{index === 0 ? 'はじめに' : `セクション ${section.number}`}</small><h2>{index === 0 ? section.subtitle : section.title}</h2><p>{index === 0 ? section.title : section.subtitle}</p></div>
            </header>
            <div className="orientation-section-body">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && <ul className="theory-section-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.callout && <aside className="orientation-callout"><strong>{section.callout.label}</strong><p>{section.callout.text}</p></aside>}
              {section.emphasis && <p className="orientation-emphasis">{section.emphasis}</p>}
            </div>
          </article>
        ))}
      </div>
      <div className="orientation-closing"><strong>{closingTitle}</strong><p>{closingCopy}</p></div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label={footerLabel} note={footerNote} onNext={onNext} />
    </section>
  )
}

function Orientation({ onPrevious, previousLabel, onNext, activeSectionId }) {
  return <TheoryBookLesson onPrevious={onPrevious} previousLabel={previousLabel} onNext={onNext} activeSectionId={activeSectionId} eyebrow="オリエンテーション · 01" title="言葉って、なぜ大切なのでしょうか？" ja="英語を学ぶ前に、言葉と人間、そしてあなた自身の理由を考えます。" sections={orientationSections} closingTitle="理解したら、次は学び方を選びます。" closingCopy="ここで覚えるのは答えではありません。あなたが英語を学ぶ理由と、これからの学び方の地図です。" footerLabel="Articoの仕組み" footerNote="急がず、全体の地図をつかみましょう。" />
}

function HowArticoWorksLesson({ onPrevious, previousLabel, onNext, activeSectionId }) {
  return <TheoryBookLesson onPrevious={onPrevious} previousLabel={previousLabel} onNext={onNext} activeSectionId={activeSectionId} eyebrow="ARTICO · 02" title="Articoの仕組み" ja="あなたの現在地に合わせて、LearnとPracticeをどう使うかを案内します。" sections={howItWorksSections} closingTitle="地図が見えたら、最初の一歩へ。" closingCopy="基礎を確認しながら、今日のあなたに必要な会話から始めましょう。Articoは、理解と練習を何度でも行き来できます。" footerLabel="26文字に出会う" footerNote="次は、英語の最小単位へ。" />
}

const emptyTheorySections = []

function useActiveTheorySection(activeStep) {
  const sections = theorySectionSets[activeStep] || emptyTheorySections
  const [activeSectionId, setActiveSectionId] = useState(orientationSections[0].id)

  useEffect(() => {
    if (!sections.length) return undefined

    const updateReadingState = () => {
      let nextSection = sections[0].id
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.34) nextSection = section.id
      })
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      if (atBottom) nextSection = sections[sections.length - 1].id
      setActiveSectionId(nextSection)
    }

    setActiveSectionId(sections[0].id)
    window.addEventListener('scroll', updateReadingState, { passive: true })
    window.addEventListener('resize', updateReadingState)
    updateReadingState()
    return () => {
      window.removeEventListener('scroll', updateReadingState)
      window.removeEventListener('resize', updateReadingState)
    }
  }, [activeStep, sections])

  return activeSectionId
}

function LettersLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page letters-page">
      <LessonTitle eyebrow="Alphabets · 03" title="Alphabets" ja="英語のスタートラインへ。26個の文字と、大文字・小文字の形に出会います。" />
      <div className="letters-layout">
        <div className="letters-copy">
          <h2>英語のスタートラインへ、ようこそ！</h2>
          <p>あなたが今までに聞いたことがある英語の言葉はすべて、たった<strong>26個の文字</strong>からできています。それだけです。26個の記号があり、それぞれ大文字と小文字という2つの形があります。</p>
          <p>これらの文字は、イギリスで生まれたわけではありません。<strong>旅をしてきたのです。</strong> 英語のアルファベットはラテン語から来て、ラテン語はギリシャ語から来て、さらにそれは何千年も前の古代フェニキアの商人たちから来ました。つまり、あなたが文字を書いたり発音したりするたびに、<strong>3000年以上も受け継がれてきた歴史の一部</strong>を使っていることになります。</p>
          <p>文字を<strong>レンガ</strong>のように考えてみてください。1つだけでは小さくてシンプルです。でも、組み合わせることで、何でも作ることができます。名前、冗談、歌、ストーリー、そして新しい世界まで作ることができます。</p>
          <p>今日は、英語の26個の文字から始めましょう。見て、聞いて、声に出して、<strong>口が自然に覚えるまで体で感じてみてください。</strong> この音を自分のものにすれば、これからの英語はずっと簡単になります。</p>
          <strong className="letters-closing">それでは、まずはすべての文字に出会いましょう！</strong>
        </div>
        <div className="alphabet-board">
          <section className="alphabet-case-section" aria-labelledby="uppercase-title">
            <h3 id="uppercase-title">uppercase <span>(capital) letters</span></h3>
            <div className="alphabet-case-grid">{alphabet.map((letter) => <button key={letter} type="button" aria-label={`Say uppercase ${letter}`} onClick={() => speakWithBrowser(letter)}>{letter}</button>)}</div>
          </section>
          <div className="alphabet-case-divider" />
          <section className="alphabet-case-section" aria-labelledby="lowercase-title">
            <h3 id="lowercase-title">lowercase <span>(small) letters</span></h3>
            <div className="alphabet-case-grid">{alphabet.map((letter) => <button key={letter} type="button" aria-label={`Say lowercase ${letter.toLowerCase()}`} onClick={() => speakWithBrowser(letter.toLowerCase())}>{letter.toLowerCase()}</button>)}</div>
          </section>
        </div>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Hear the Alphabet" onNext={onNext} />
    </section>
  )
}

function VideoReference({ videoId, label, title, source, externalUrl }) {
  return (
    <div className="video-reference">
      <div className="video-copy"><small>{label}</small><h3>{title}</h3><p>{source}</p></div>
      {videoId ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1&hl=ja`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <a className="external-video" href={externalUrl} target="_blank" rel="noreferrer"><span><PlayIcon /></span><strong>Open the reference video</strong><small>外部クリエイターのページで開きます</small></a>}
    </div>
  )
}

function formatVideoTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

function YouTubeLessonPlayer({ videoId, title, credit, startAt = 0, endAt = 0, loopSegment = false, autoplay = true }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const iframe = iframeRef.current
    if (!container || !iframe) return undefined

    let playerLoaded = false
    let isVisible = false
    const hasSegment = loopSegment && endAt > startAt

    const sendCommand = (func, args = []) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*')
    }

    const restartSegment = () => {
      if (!hasSegment || !isVisible) return
      sendCommand('seekTo', [startAt, true])
      sendCommand('playVideo')
    }

    const playWhenReady = () => {
      if (!playerLoaded) return
      if (!hasStartedRef.current) {
        sendCommand('seekTo', [startAt, true])
        hasStartedRef.current = true
      }
      sendCommand('playVideo')
    }

    const handleLoad = () => {
      playerLoaded = true
      if (hasSegment) sendCommand('addEventListener', ['onStateChange'])
      if (isVisible && autoplay) playWhenReady()
    }

    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow || !hasSegment) return
      let data
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      } catch {
        return
      }
      if (data?.event === 'onStateChange' && Number(data.info) === 0) restartSegment()
      if (data?.event === 'infoDelivery' && Number(data.info?.currentTime) >= endAt - 0.25) restartSegment()
    }

    iframe.addEventListener('load', handleLoad)
    window.addEventListener('message', handleMessage)

    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45
        if (isVisible && autoplay) playWhenReady()
        else sendCommand('pauseVideo')
      }, { threshold: [0, 0.45, 0.8] })
      : null

    observer?.observe(container)

    const handleVisibilityChange = () => {
      if (document.hidden) sendCommand('pauseVideo')
      else if (isVisible && autoplay) playWhenReady()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      sendCommand('pauseVideo')
      observer?.disconnect()
      iframe.removeEventListener('load', handleLoad)
      window.removeEventListener('message', handleMessage)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [autoplay, endAt, loopSegment, startAt])

  const origin = typeof window === 'undefined' ? '' : `&origin=${encodeURIComponent(window.location.origin)}`
  const start = startAt > 0 ? `&start=${startAt}` : ''
  const end = endAt > startAt ? `&end=${endAt}` : ''
  const source = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}${start}${end}&rel=0&playsinline=1&hl=ja&modestbranding=1&enablejsapi=1${origin}`
  const segmentLabel = endAt > startAt
    ? `${formatVideoTime(startAt)}–${formatVideoTime(endAt)} をループ · スクロール中は一時停止`
    : autoplay
      ? `${startAt > 0 ? `${startAt}秒から再生 · ` : ''}スクロール中は一時停止`
      : 'クリックして再生 · スクロール中は一時停止'

  return (
    <div className="youtube-lesson-player" ref={containerRef}>
      <div className="youtube-player-frame">
        <iframe
          ref={iframeRef}
          src={source}
          title={title}
          loading="eager"
          allow="autoplay; accelerometer; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="youtube-player-caption">
        <span>{credit}</span>
        <small>{segmentLabel}</small>
      </div>
    </div>
  )
}

function HearLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Alphabets · 04" title="Hear the Alphabet" ja="歌でアルファベットを覚えましょう。文字の順番と名前を、音楽に合わせて体に入れます。" />
      <div className="alphabet-song-layout">
        <div className="alphabet-song-main">
          <article className="alphabet-song-intro" id="theory-hear-0">
            <h2>歌でアルファベットを覚えましょう</h2>
            <p>英語のアルファベットを覚える一番簡単で楽しい方法の1つは、<strong>「ABCの歌」</strong>です。たくさんの子どもたちが、最初にこの歌を聞いて、真似して、一緒に歌うことで、アルファベットを覚えます。</p>
            <p>インターネットにはたくさんのアルファベットの歌がありますが、初心者にとってシンプルで分かりやすく、真似しやすいこの動画を選びました。</p>
            <p className="alphabet-song-focus">前のレッスンでは、大文字と小文字を見分ける練習をしました。今回の目標は、アルファベット全体に慣れることです。特に、<strong>文字の順番と発音（音）</strong>を意識してみましょう。</p>
          </article>
          <div id="theory-hear-1">
            <YouTubeLessonPlayer videoId="MgmIHtp-ZQM" title="The Alphabet Song | Lower Case Letters | Super Simple ABCs" credit="動画：Super Simple ABCs / Super Simple Songs" startAt={20} />
          </div>
          <article className="alphabet-song-after" id="theory-hear-3">
            <strong>すぐに全部を覚える必要はありません。</strong>
            <p>まずは動画を再生して、よく聞き、できるだけ一緒に歌ってみましょう。何度も戻ってくるうちに、文字の順番と名前が少しずつ自然になります。</p>
          </article>
        </div>
        <aside className="alphabet-song-guide" id="theory-hear-2">
          <h3>やってみること</h3>
          <ol>
            <li><b>01</b><span><strong>まず、目で追う</strong><small>動画を再生して、アルファベットの文字を目で追いましょう。</small></span></li>
            <li><b>02</b><span><strong>一緒に歌う</strong><small>歌を何度も聞いて、一緒に歌う練習をしましょう。必要なだけ繰り返してください。</small></span></li>
            <li><b>03</b><span><strong>AからZまで思い出す</strong><small>練習を続けると、文字を見分け、名前を発音し、AからZまで歌えるようになります。</small></span></li>
          </ol>
          <div className="alphabet-song-callout"><strong>焦らず、楽しんで進めてください。</strong><p>このレッスンは完全な初心者のために作られています。音楽に合わせて何度も繰り返すことで、アルファベットがずっと覚えやすくなります。</p></div>
        </aside>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Write the Alphabet" onNext={onNext} />
    </section>
  )
}

function WriteLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page writing-lesson-page">
      <LessonTitle eyebrow="Alphabets · 05" title="Write the Alphabet" ja="アルファベットを書いてみましょう。文字の形を、目だけでなく手にも覚えさせます。" />
      <div className="writing-lesson-layout">
        <div className="writing-lesson-main">
          <article className="writing-lesson-card writing-intro-card" id="theory-write-0">
            <h2>アルファベットを書いてみましょう</h2>
            <p>「ABCの歌」を聞いたり歌ったりすることは、アルファベットに慣れるためのとても良い方法です。でも、聞くだけでは足りないことがよくあります。文字を本当に自分のものにするために、手で書いて練習してみましょう。</p>
            <p>実際に書くことで、一つひとつの文字をもっと丁寧に見ることができます。文字の形、書く方向、線を引く順番に気づけます。これにより、アルファベットを覚えるのが早くなり、次に文字を見たときに、もっと親しみを感じられるようになります。</p>
            <p>今の段階では、美しい字を書く練習をしているわけではありません。英語の文字の基本的な形と、普段どのように書かれているかを学ぶだけで十分です。</p>
          </article>

          <article className="writing-lesson-card writing-method-card" id="theory-write-2">
            <div className="writing-section-heading"><span>02</span><div><small>練習の方法</small><h2>早く書こうとしなくても大丈夫です。</h2></div></div>
            <p>まずは書き方の動画を見て、それぞれの文字がどのように作られているかを確認しましょう。文字がどこから始まるか、線を引く方向に注目してください。</p>
            <div className="writing-video-wrap"><YouTubeLessonPlayer videoId="DnNqoEXoGdg" title="How to Write Letters A-Z | Learn to Write the ABCs" credit="動画：DorufaVSArt / YouTube" /></div>
            <p>その後、紙の上で練習します。次のようなシンプルな順番で進めてみましょう。</p>
            <ol className="writing-step-list">
              <li><b>01</b><span>文字を何回かなぞって書く。</span></li>
              <li><b>02</b><span>見本を見ずに、自分で何回か書いてみる。</span></li>
              <li><b>03</b><span>大文字と小文字の両方を練習する。</span></li>
              <li><b>04</b><span>慣れてきたら、その文字から始まるシンプルな言葉を書く。</span></li>
            </ol>
            <div className="writing-example"><small>例：A と a を練習したら</small><strong>apple — ant — animal</strong></div>
            <p>完璧を目指さなくても大丈夫です。最初は書くのが遅かったり、線の太さがバラバラだったりするかもしれません。それは完全に普通のことです。文字をはっきりと書き、自分が何を書いているかを意識することに集中しましょう。</p>
          </article>

          <article className="writing-lesson-card writing-names-card" id="theory-write-3">
            <h2>練習：知っている名前を書いてみよう</h2>
            <p>アルファベットの基本的な形がわかったら、今度はそれを実際に使ってみましょう。ただ「A, B, C, D...」と練習する代わりに、あなたにとって身近な名前を書きます。</p>
            <div className="writing-name-grid">
              <section><span>01</span><h3>自分の名前を書く</h3><p>まずは自分の名前から始めましょう。英語で名前を書くとき、通常、名前の最初の文字は大文字（頭文字）で書きます。</p><div className="writing-name-example"><small>例</small><strong>Taro Yamada</strong><strong>Hanako Suzuki</strong><em>Taro → T – A – R – O</em></div><p>日本語では伝統的に名字が先ですが、多くの英語圏では名前が先、名字が後に来ます。今は両方のスタイルを知っていれば十分です。</p></section>
              <section><span>02</span><h3>家族の名前を書く</h3><p>家族のことを思い浮かべて、名前を書いてみましょう。最初の文字を大文字にすることを忘れないでください。</p><div className="writing-word-list"><span>mother</span><span>father</span><span>brother</span><span>sister</span><span>grandmother</span><span>grandfather</span></div><p>書いた後は、それぞれの名前を声に出し、1文字ずつスペルアウトします。</p></section>
              <section><span>03</span><h3>友達の名前を書く</h3><p>親友、クラスメイト、同僚など、あなたがよく知っている人の名前をいくつか書いてみましょう。</p><p>同じように、まず名前を書いてから、声に出して1文字ずつ発音してみます。</p></section>
            </div>
          </article>

          <article className="writing-lesson-card writing-purpose-card" id="theory-write-4">
            <h2>なぜこの練習が役に立つのか</h2>
            <p>アルファベットの文字だけを練習するのも役に立ちますが、身近な名前を使うことで、文字がとても意味のあるものに変わります。</p>
            <p>自分の名前は、新しい言葉で書く最も大切な言葉の一つです。書類、申請書、予約、自己紹介、アカウント作成など、多くの場所で自分の名前を書くことになります。</p>
            <p>この練習が終わる頃には、単にアルファベットを覚える以上のことができているはずです。あなたの人生につながる「本物の言葉」を書くために、英語の文字を使い始めているのです。</p>
            <div className="writing-assignment"><h3>あなたの課題</h3><p>次のものを書いてみましょう。</p><ul><li>自分の名前</li><li>家族の名前</li><li>3〜5人の友達や知人の名前</li></ul><p>それぞれの名前を書いた後、1文字ずつ声に出して発音してください。目標はシンプルです。</p><strong>書く。読む。発音する。</strong></div>
          </article>

          <article className="writing-lesson-card writing-finish-card" id="theory-write-5">
            <h2>筆記体について</h2>
            <p>英語の書き方には、文字がつながって流れるように書く「筆記体」というスタイルもあります。知っておくことは役に立ちますが、この初心者向けコースでは筆記体の練習は行いません。</p>
            <p>今は、本、ウェブサイト、看板、アプリ、教材などで最もよく目にする、通常の「ブロック体（プリント体）」に集中しましょう。普通の書き方に慣れてから、興味があれば筆記体や英語のカリグラフィーに挑戦してください。</p>
            <h2>焦らず進めましょう</h2>
            <p>大人の学習者は、すでに別の言葉の書き方を知っているため、子どもより早く進めることがあります。定期的に練習すれば、数日または1週間ほどで基本的なアルファベットに慣れることもできますが、急ぐ必要はありません。</p>
            <p>大切なのは、しっかりとした基礎を作ることです。鉛筆とノートを用意して、動画を見ながら練習問題に挑戦し、アルファベットを1文字ずつ自分のものにしていきましょう。</p>
          </article>
        </div>

        <aside className="writing-lesson-aside">
          <article className="writing-supplies-card" id="theory-write-1">
            <small>まず、これだけ</small><h2>準備するもの</h2>
            <p>必要なものは、とてもシンプルです。</p>
            <ul className="writing-supplies-list"><li>鉛筆</li><li>消しゴム</li><li>鉛筆削り</li><li>英語の練習用ノート（または線が入ったノート）</li></ul>
            <p>練習中は、ペンよりも鉛筆がおすすめです。間違えても簡単に直すことができるからです。</p>
            <p>できれば、初心者向けのガイド線が入ったノートを使いましょう。無料でプリントできる練習シートを使っても構いません。</p>
            <a href="https://teachprints.com/letter-tracing-worksheets/" target="_blank" rel="noreferrer">無料の練習シートを見る ↗</a>
          </article>
          <div className="writing-paper-note"><strong>紙と手で練習する</strong><p>キーボード入力や画面のタップは、手で書く練習の代わりにはなりません。今日だけは、紙と鉛筆を使ってください。</p></div>
        </aside>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Letters & sounds" onNext={onNext} />
    </section>
  )
}

function SoundsLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page sound-lesson-page">
      <LessonTitle eyebrow="Alphabets · 06" title="26 letters. About 44 sounds." ja="英語には26個の文字があります。でも、話すときの音はそれよりも多くあります。" />
      <div className="sound-lesson-layout">
        <div className="sound-lesson-main">
          <article className="sound-lesson-card sound-intro-card" id="theory-sounds-0">
            <div className="sound-section-heading"><span>01</span><div><small>まず知っておくこと</small><h2>文字と音は同じではありません</h2></div></div>
            <p>ここまでで、あなたは英語の26個のアルファベットを学びました。文字の形、書き方、そして名前の言い方が分かりましたね。ここで、もう1つ知っておくべき大切なアイデアがあります。</p>
            <p>英語の文字は26個ですが、話すときの音は文字の数よりもたくさんあります。話し方（アクセント）や音の数え方によって違いますが、英語にはよく使われる音が<strong>約44個</strong>あると言われています。これを<strong>音素（phoneme）</strong>と呼びます。</p>
            <div className="sound-count-callout"><div><strong>26</strong><span>letters<br />書くための文字</span></div><b>≠</b><div><strong>about 44</strong><span>sounds<br />話すときの音</span></div></div>
            <p>これが、英語の発音がときどき難しく、混乱しやすい理由の1つです。今は数字を暗記しなくても大丈夫です。「文字の数と音の数は同じではない」と知っておきましょう。</p>
          </article>

          <article className="sound-lesson-card sound-spelling-card" id="theory-sounds-1">
            <div className="sound-section-heading"><span>02</span><div><small>つづりを見たとき</small><h2>なぜ、英語は見た目どおりに発音しないのでしょうか？</h2></div></div>
            <p>いくつかの言語では、文字と発音の関係がとても分かりやすく、予想しやすいことがあります。しかし、英語では同じ文字でも単語によって違う音になったり、いくつかの文字が組み合わさって1つの音になったりします。文字は書かれているのに、まったく発音されないこともあります。</p>
            <div className="sound-example-grid">
              <div><strong>knife</strong><span>kは書かれていますが、ふつうは発音しません。</span><em>silent k</em></div>
              <div><strong>knight</strong><span>ここでもkは音になりません。つづりと音が一致しない例です。</span><em>silent letter</em></div>
            </div>
            <p className="sound-emphasis">英語のつづりと発音は、いつも1対1で同じになるわけではありません。このことを今知っておくだけで、これから先の勉強がずっと簡単になります。</p>
          </article>

          <article className="sound-lesson-card sound-video-card" id="theory-sounds-2">
            <div className="sound-section-heading"><span>03</span><div><small>英語の音に出会う</small><h2>まずは、聞いて気づくだけで十分です。</h2></div></div>
            <p>この段階では、英語の音をすべて暗記する必要はありません。難しい発音のルールを勉強する必要もありません。今はただ、そのような音があることを知って、注意して聞き始めるだけで大丈夫です。</p>
            <div className="sound-video-wrap"><YouTubeLessonPlayer videoId="JwTDPu2TE6k" title="Sounds of English Vowels and Consonants (with phonetic symbols)" credit="動画：YouTube（音声紹介）" /></div>
            <p>動画を見て、よく聞いて、聞こえた音を真似して声に出してみましょう。最初はうまくできなくても気にしないでください。目標は<strong>「慣れること」</strong>であり、「完璧にマスターすること」ではありません。</p>
          </article>
        </div>

        <aside className="sound-lesson-aside">
          <article className="sound-lesson-card sound-ipa-card" id="theory-sounds-3">
            <small>発音の地図</small><h2>IPAって何ですか？</h2>
            <p>発音を学ぶとき、<strong>/æ/　/ʃ/　/θ/　/ŋ/</strong>のような不思議な記号を見ることがあります。これらは国際音声記号、ふつうは<strong>IPA</strong>と呼ばれるものです。</p>
            <p>ふつうのアルファベットは「書くために使う文字」を表します。一方で、IPAは「話すときに使う音」を表します。</p>
            <div className="ipa-table" role="table" aria-label="アルファベットとIPAの違い"><div role="row"><strong>システム</strong><strong>表すもの</strong><strong>例</strong></div><div role="row"><span>英語のアルファベット</span><span>書くための文字</span><span>a, b, c</span></div><div role="row"><span>IPA</span><span>話すときの音</span><span>/æ/, /b/, /k/</span></div></div>
            <p>IPAの便利なところは、つづりがややこしい単語でも、どのように発音されるかを正確に示してくれることです。</p>
          </article>
          <div className="sound-map-note" id="theory-sounds-4"><strong>IPAは「発音の地図」</strong><p>今は地図のすべてを読めなくても大丈夫です。「この地図が存在する」と知っていれば十分です。</p><div><span>/kæt/</span><small>cat の音</small></div><a href="https://www.ipachart.com" target="_blank" rel="noreferrer">インタラクティブなIPAチャートを見る ↗</a></div>
        </aside>
      </div>

      <article className="sound-lesson-card sound-routine-card" id="theory-sounds-5">
        <div className="sound-section-heading"><span>04</span><div><small>今、何をすればいいですか？</small><h2>難しく考えず、シンプルにいきましょう。</h2></div></div>
        <div className="sound-routine-grid"><div><b>01</b><strong>見る</strong><span>英語の音の短い紹介動画を見る。</span></div><div><b>02</b><strong>聞く</strong><span>それぞれの音を注意して聞く。</span></div><div><b>03</b><strong>真似する</strong><span>聞こえた音を声に出してみる。</span></div><div><b>04</b><strong>戻る</strong><span>練習用の歌や動画を何度か繰り返す。</span></div></div>
        <p className="sound-routine-close">IPAの記号を覚える心配はしなくて大丈夫です。今は、聞いて、気づいて、真似してみる。それだけで十分です。</p>
      </article>

      <article className="sound-reminder-card" id="theory-sounds-6"><strong>忘れないでください</strong><p>26個の文字があるからといって、音が26個だけというわけではありません。英語は、比較的少ないアルファベットを使って、たくさんの話し言葉の音を表しています。</p><b>聞いて、気づいて、真似してみる。</b><span>進んでいくうちに、少しずつ詳しいことを学んでいきましょう。</span></article>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Tongue Twisters" onNext={onNext} />
    </section>
  )
}

function TheoryAudioSample({ phrase, target, src }) {
  const audioRef = useRef(null)
  const playbackToken = useRef({ stop: () => {} })
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [looping, setLooping] = useState(false)

  const stopPlayback = () => {
    const audio = audioRef.current
    if (audio) audio.pause()
    setPlaying(false)
    releasePlayback(playbackToken.current)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return undefined
    const updateProgress = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const finish = () => {
      setPlaying(false)
      releasePlayback(playbackToken.current)
    }
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', finish)
    return () => {
      stopPlayback()
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', finish)
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate
  }, [playbackRate, src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = looping
  }, [looping, src])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !src) return
    if (audio.paused) {
      claimPlayback(playbackToken.current, stopPlayback)
      try {
        await audio.play()
        if (activePlayback === playbackToken.current && !audio.paused) setPlaying(true)
      } catch {
        releasePlayback(playbackToken.current)
        setPlaying(false)
      }
    } else {
      stopPlayback()
    }
  }

  const rewind = () => {
    const audio = audioRef.current
    if (audio && src) audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const cycleSpeed = () => {
    if (!src) return
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
    setPlaybackRate((rate) => speeds[(speeds.indexOf(rate) + 1) % speeds.length])
  }

  const toggleLoop = () => {
    if (!src) return
    setLooping((value) => !value)
  }

  const speedLabel = `${playbackRate.toFixed(2).replace(/0$/, '')}x`

  const formatTime = (value) => {
    if (!value) return '0:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className={`theory-audio-sample ${src ? '' : 'is-pending'}`}>
      {src && <audio ref={audioRef} src={src} preload="metadata" />}
      <div className="theory-audio-head"><button type="button" className="theory-audio-play" onClick={toggle} disabled={!src} aria-label={src ? `${phrase}を再生` : `${phrase}の音声は準備中`}><PlayIcon pause={playing} /></button><div className="theory-audio-waveform" aria-hidden="true">{[20, 33, 47, 28, 55, 38, 64, 34, 50, 26, 43, 58, 31, 48, 37, 54, 29, 44, 22, 39, 52, 32, 46, 26].map((height, index) => <i key={index} style={{ height }} />)}</div><div className="theory-audio-times"><span>{formatTime((progress / 100) * duration)}</span><span>{duration ? formatTime(duration) : '--:--'}</span></div></div>
      <div className="theory-audio-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="theory-audio-controls"><button type="button" onClick={rewind} disabled={!src} aria-label="10秒戻る">↶ <span>-10s</span></button><button type="button" onClick={cycleSpeed} disabled={!src} aria-label={`再生速度 ${speedLabel}`}>{speedLabel}</button><button type="button" className={looping ? 'active' : ''} onClick={toggleLoop} disabled={!src} aria-label={looping ? 'ループをオフ' : 'ループをオン'} aria-pressed={looping}>↻ <span>Loop</span></button><small>{src ? '音声サンプル' : '音声サンプルを準備中'}</small></div>
    </div>
  )
}

const tongueIntroGroups = [
  { id: 'priority', number: '01', title: '日本の学習者が優先して練習したい音の違い', intro: '多くの日本の学習者にとって、最初に身につけると便利な音の違いに焦点を当てます。', itemIds: ['red-lorry', 'seashells', 'free-throws'] },
  { id: 'consonants', number: '02', title: 'はっきりとした子音の音', intro: '言葉の最初や最後にある、はっきりとした子音を、余分な母音なしで出す練習です。', itemIds: ['peter-piper', 'big-black-bug', 'two-witches'] },
  { id: 'clusters', number: '03', title: '子音が連続する音', intro: '英語でよく起こる子音のかたまりを、分解せずにつなげる感覚に慣れます。', itemIds: ['ice-cream', 'slippery-snails', 'fresh-flesh'] },
  { id: 'rhythm', number: '04', title: 'リズムと音のつながり', intro: '個々の音だけでなく、英語の強弱と、音から音への自然な流れを感じます。', itemIds: ['betty-botter', 'woodchuck', 'unique-new-york'] },
]

function TongueIntro({ onPrevious, previousLabel, onPractice }) {
  const findItem = (id) => allTwisters.find((item) => item.id === id)
  return (
    <section className="lesson-page tongue-intro-page">
      <LessonTitle eyebrow="Tongue twisters · introduction · 07" title="Train your mouth with tongue twisters." ja="音を理解したら、次は口を動かし、英語の音に慣れていきます。" />
      <div className="tongue-theory-reader">
        <article className="tongue-theory-card tongue-theory-intro" id="theory-tongue-intro-0">
          <div className="tongue-section-heading"><span>01</span><div><small>音の理解から、口のトレーニングへ</small><h2>早口言葉で口をトレーニングしましょう！</h2></div></div>
          <p>これまでは「音を理解すること」について考えてきました。これからは、実際に「その音を出すための口のトレーニング」に進みましょう。そのための最も効果的な方法の一つが、<strong>早口言葉（tongue twister）</strong>です。</p>
          <p>早口言葉は、似ている音や難しい音が近くに並んでいる短いフレーズです。唇、舌、あご、そして息の出し方を細かく正確にコントロールする必要があるため、いわば<strong>口の小さな筋トレ</strong>のようなものです。</p>
          <p>俳優、歌手、スピーチをする人、アナウンサー、そして語学の学習者など、多くの人が、はっきり話すため、リズムやコントロールを良くするために使っています。</p>
        </article>

        <article className="tongue-theory-card tongue-japan-card" id="theory-tongue-intro-1">
          <div className="tongue-section-heading"><span>02</span><div><small>なぜ日本の学習者にとって大切なのか</small><h2>耳と口が、音の違いに慣れるまで</h2></div></div>
          <p>日本語と英語では、音の作り方や整理の仕方が違います。そのため、英語を始めたばかりのとき、いくつかの音を正しく発音し分けるのが難しく感じることがあります。</p>
          <div className="tongue-minimal-pairs"><div><strong>right / light</strong><span>右・正しい / 光・軽い</span></div><div><strong>road / load</strong><span>道 / 荷物</span></div><div><strong>rice / lice</strong><span>お米 / シラミ</span></div></div>
          <p>最初は、これらの言葉が同じように聞こえたり、同じように感じられたりするかもしれません。でも、諦める必要はありません。耳と口が動きの違いに慣れるまで、少し時間が必要なだけです。</p>
          <div className="tongue-sound-strip"><strong>R / L</strong><span>S / SH</span><span>TH / F</span><span>W / CH</span><span>語尾の子音</span></div>
        </article>

        <article className="tongue-theory-card tongue-purpose-card" id="theory-tongue-intro-2">
          <div className="tongue-section-heading"><span>03</span><div><small>目的は「覚えること」ではありません</small><h2>あなたの口を、英語の動きに慣れさせる</h2></div></div>
          <p>何百個もの早口言葉を暗記する必要はありません。インターネットには何千個もの文があり、AIを使えばいくらでも作れます。しかし、たくさん練習すれば良いというわけではありません。</p>
          <p>このコースでは、日常的によく使われ、慣れておくと役に立つ発音パターンを集めた、少数の定番を選びました。面白い文を覚えることではなく、英語の音をスムーズに出せるようにすることが目的です。</p>
          <div className="tongue-listen-callout"><strong>まずは、聞き、気づき、音に慣れること。</strong><span>具体的な練習方法は、この後のPracticeセクションで丁寧に説明します。</span></div>
        </article>

        <article className="tongue-theory-card tongue-set-card" id="theory-tongue-intro-3">
          <div className="tongue-section-heading"><span>04</span><div><small>これから練習する早口言葉</small><h2>4つのグループから、音を聞いてみましょう。</h2></div></div>
          <p className="tongue-set-lead">「破裂音」や「二重母音」といった専門用語を理解する必要はありません。まずは注目する音を意識して、各フレーズの音声サンプルを聞いてみましょう。</p>
          <div className="tongue-theory-groups">{tongueIntroGroups.map((group) => <section className="tongue-theory-group" key={group.id}><header><b>{group.number}</b><div><h3>{group.title}</h3><p>{group.intro}</p></div></header><div className="tongue-theory-items">{group.itemIds.map((itemId) => { const item = findItem(itemId); if (!item) return null; return <article className="tongue-theory-item" key={item.id}><div className="tongue-item-copy"><span>{item.target}</span><strong><HighlightedPhrase item={item} /></strong><p>{item.why}</p></div><TheoryAudioSample phrase={item.phrase} target={item.target} src={`${import.meta.env.BASE_URL}audio/${item.id}.wav`} /></article> })}</div></section>)}</div>
        </article>

        <article className="tongue-theory-card tongue-listen-card" id="theory-tongue-intro-4">
          <div className="tongue-section-heading"><span>05</span><div><small>今は、聞くだけで大丈夫です</small><h2>早く言う必要も、暗記する必要もありません。</h2></div></div>
          <p>このページで、早口言葉を完璧に言えるようになる必要はありません。これから練習していく音や口の動きを紹介するためのページです。</p>
          <div className="tongue-listen-steps"><div><b>01</b><span>文を読む</span></div><i>→</i><div><b>02</b><span>音声を聞く</span></div><i>→</i><div><b>03</b><span>音に集中する</span></div><i>→</i><div><b>04</b><span>1〜2回試す</span></div></div>
          <p className="tongue-listen-finish">今はこれだけで十分です。本格的なステップ別トレーニングは、次のPracticeで行います。</p>
        </article>

        <article className="tongue-theory-card tongue-finish-card" id="theory-tongue-intro-5">
          <div className="tongue-section-heading"><span>06</span><div><small>最後に忘れないでください</small><h2>早口言葉は、実用的な道具です。</h2></div></div>
          <p>早口言葉は、ただ「おかしな文を早く言うためのゲーム」ではありません。英語の音を思い通りにコントロールするための、とても実用的なツールです。</p>
          <div className="tongue-final-cues"><strong>音を聞きましょう。</strong><strong>動きに気づきましょう。</strong><strong>自分で少し試してみましょう。</strong></div>
          <p>次のセクションで、本格的な練習を一緒に始めます。</p>
        </article>
        <div className="tongue-practice-transition" id="theory-tongue-intro-6"><strong>次はPracticeへ</strong><span>音声を聞き、口の動きを一つずつ練習します。</span></div>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} note="Learn complete · 練習はPracticeから始まります" label="Open the classic set" onNext={onPractice} />
    </section>
  )
}

function SecondaryButton({ children, onClick, disabled = false }) {
  return <button className="secondary-button" type="button" onClick={onClick} disabled={disabled}><span aria-hidden="true">←</span>{children}</button>
}

function LessonFooter({ previousLabel = 'Previous', onPrevious, label, note = 'Accuracy before speed.', onNext, nextDisabled = false }) {
  return <div className="lesson-footer"><span>{note}</span><div className="lesson-footer-actions"><SecondaryButton onClick={onPrevious} disabled={!onPrevious}>{previousLabel}</SecondaryButton><PrimaryButton onClick={onNext} disabled={nextDisabled}>{label}</PrimaryButton></div></div>
}

const theoryOutlines = {
  orientation: orientationSections.map((section) => section.title),
  'how-it-works': howItWorksSections.map((section) => section.title),
  letters: ['Meet the 26 letters', 'Uppercase and lowercase', 'What matters now'],
  hear: ['Hear the alphabet', 'Listen', 'Repeat', 'Recall'],
  write: ['Write the alphabet', 'Prepare', 'Practice', 'Write real names', 'Why this matters', 'Cursive & pace'],
  sounds: ['Letters versus sounds', 'Why spelling surprises us', 'Meet the sounds', 'What is IPA?', 'IPA as a map', 'Try it now', 'Remember'],
  'tongue-intro': ['Why tongue twisters', 'Japanese-priority sounds', 'Purpose: train the mouth', 'The focused classic set', 'Listen for now', 'Remember', 'Practice begins here'],
}

function TheoryOutline({ activeStep, activeSectionId }) {
  const items = theoryOutlines[activeStep] || []
  const links = theorySectionSets[activeStep]
    ? theorySectionSets[activeStep].map((section) => ({ label: section.title, href: `#${section.id}`, active: activeSectionId === section.id }))
    : items.map((item, index) => ({ label: item, href: `#theory-${activeStep}-${index}` }))
  return (
    <aside className="theory-outline" aria-label={theorySectionSets[activeStep] ? 'このページ' : 'On this page'}>
      <strong>{theorySectionSets[activeStep] ? 'このページ' : 'On this page'}</strong>
      <ol>{links.map((item) => <li key={item.href}><a className={item.active ? 'active' : undefined} aria-current={item.active ? 'location' : undefined} href={item.href}>{item.label}</a></li>)}</ol>
    </aside>
  )
}

function LearnMode({ activeStep, setActiveStep, openPractice, curriculum }) {
  const index = learnSteps.findIndex((step) => step.id === activeStep)
  const activeTheorySectionId = useActiveTheorySection(activeStep)
  const previousStep = learnSteps[index - 1]
  const previous = previousStep ? () => setActiveStep(previousStep.id) : undefined
  const previousLabel = previousStep?.label || 'Previous'
  const next = () => setActiveStep(learnSteps[Math.min(index + 1, learnSteps.length - 1)].id)
  const content = {
    orientation: <Orientation onPrevious={previous} previousLabel={previousLabel} onNext={next} activeSectionId={activeTheorySectionId} />,
    'how-it-works': <HowArticoWorksLesson onPrevious={previous} previousLabel={previousLabel} onNext={next} activeSectionId={activeTheorySectionId} />,
    letters: <LettersLesson onPrevious={previous} previousLabel={previousLabel} onNext={next} />,
    hear: <HearLesson onPrevious={previous} previousLabel={previousLabel} onNext={next} />,
    write: <WriteLesson onPrevious={previous} previousLabel={previousLabel} onNext={next} />,
    sounds: <SoundsLesson onPrevious={previous} previousLabel={previousLabel} onNext={next} />,
    'tongue-intro': <TongueIntro onPrevious={previous} previousLabel={previousLabel} onPractice={openPractice} />,
  }[activeStep]

  return <div className="app-body"><LessonSidebar active={activeStep} onSelect={setActiveStep} curriculum={curriculum} /><main className="lesson-main"><div className="theory-layout"><div className="theory-content">{content}</div><TheoryOutline activeStep={activeStep} activeSectionId={activeTheorySectionId} /></div></main></div>
}

function PracticeSidebar({ selected, selectTwister, curriculum }) {
  return (
    <aside className="practice-sidebar">
      <CurriculumNav {...curriculum} />
      {selected && <div className="selected-sidebar"><small>Current drill</small><strong>{selected.phrase}</strong><span>{selected.target} · {selected.duration}</span><button type="button" onClick={() => selectTwister(null)}>Back to library</button></div>}
      {!selected && <div className="sidebar-note"><small>Suggested session</small><strong>One focus + two mixed</strong><span>目安 8–10分 · 速度より明瞭さ</span></div>}
    </aside>
  )
}

function TwisterLibrary({ onSelect, onPrevious, onNext }) {
  return (
    <section className="practice-page library-page">
      <LessonTitle eyebrow="Classic set · 12 drills" title="12 classics. Nothing random." ja="定番の言い回しだけを、発音の目的別に整理しました。最初はゆっくり、明瞭さを保てたら自然な速さへ。" />
      <div className="twister-group-grid">{tongueGroups.map((group) => <article id={`group-${group.id}`} className="twister-group" key={group.id}><header><b>{group.number}</b><div><h2>{group.title}</h2><p>{group.ja}</p></div></header><div>{group.items.map((item) => <button key={item.id} type="button" onClick={() => onSelect({ ...item, groupId: group.id, groupTitle: group.title })}><span>{item.target}</span><strong>{item.phrase}</strong><small>{item.duration}</small><ArrowIcon /></button>)}</div></article>)}</div>
      <LessonFooter previousLabel="Tongue Twisters" onPrevious={onPrevious} note="Practice begins here · 口の動きを整えます" label="Four-week routine" onNext={onNext} />
    </section>
  )
}

function useSpeechPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [looping, setLooping] = useState(false)
  const timer = useRef(null)
  const runRef = useRef(0)
  const loopRef = useRef(false)
  const playbackToken = useRef({ stop: () => {} })

  const setLoop = (value) => {
    loopRef.current = value
    setLooping(value)
  }

  const toggleLoop = () => setLoop(!loopRef.current)

  const stop = () => {
    runRef.current += 1
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    window.clearInterval(timer.current)
    setPlaying(false)
    setProgress(0)
    releasePlayback(playbackToken.current)
  }

  const play = (text, rate) => {
    stop()
    const run = runRef.current
    const started = Date.now()
    const estimated = Math.max(2600, (text.split(' ').length * 520) / rate)

    claimPlayback(playbackToken.current, stop)

    const success = speakWithBrowser(text, {
      rate,
      onend: () => {
        if (run !== runRef.current) return
        window.clearInterval(timer.current)
        if (loopRef.current) {
          play(text, rate)
        } else {
          setPlaying(false)
          setProgress(100)
          releasePlayback(playbackToken.current)
        }
      },
      onerror: stop,
    })

    if (success) {
      setPlaying(true)
      setProgress(4)
      timer.current = window.setInterval(
        () => setProgress(Math.min(94, ((Date.now() - started) / estimated) * 100)),
        120
      )
    } else {
      releasePlayback(playbackToken.current)
    }
  }

  useEffect(() => () => { loopRef.current = false; stop() }, [])
  return { playing, progress, looping, play, stop, toggleLoop, setLoop }
}

const practiceAudioIds = new Set(['red-lorry', 'seashells', 'free-throws', 'peter-piper', 'big-black-bug', 'two-witches', 'ice-cream', 'slippery-snails', 'fresh-flesh', 'betty-botter', 'woodchuck', 'unique-new-york'])
const practiceSegmentAudioVersion = '2'

const phraseHighlightRules = {
  'red-lorry': [{ source: 'R', className: 'phrase-focus-red', caseSensitive: true }, { source: 'l', className: 'phrase-focus-gold' }],
  seashells: [{ source: 'sh', className: 'phrase-focus-gold' }, { source: 's', className: 'phrase-focus-red' }],
  'free-throws': [{ source: 'th', className: 'phrase-focus-red' }, { source: 'f', className: 'phrase-focus-gold' }],
  'peter-piper': [{ source: 'p', className: 'phrase-focus-red' }],
  'big-black-bug': [{ source: 'b', className: 'phrase-focus-red' }, { source: '[gkdrt](?=\\b)', className: 'phrase-focus-gold' }],
  'two-witches': [{ source: 'ch', className: 'phrase-focus-gold' }, { source: 'w', className: 'phrase-focus-red' }],
  'ice-cream': [{ source: 'scr', className: 'phrase-focus-red' }],
  'slippery-snails': [{ source: 'sl', className: 'phrase-focus-red' }, { source: 'sn', className: 'phrase-focus-gold' }],
  'fresh-flesh': [{ source: 'fr', className: 'phrase-focus-red' }, { source: 'fl', className: 'phrase-focus-gold' }],
  'betty-botter': [{ source: 'b', className: 'phrase-focus-red' }, { source: 't', className: 'phrase-focus-gold' }],
  woodchuck: [{ source: 'ch', className: 'phrase-focus-gold' }, { source: 'w', className: 'phrase-focus-red' }],
  'unique-new-york': [{ source: 'u', className: 'phrase-focus-red' }, { source: 'k', className: 'phrase-focus-gold' }, { source: 'n', className: 'phrase-focus-gold' }],
}

function HighlightedPhrase({ item, phrase = item.phrase }) {
  const rules = phraseHighlightRules[item.id]
  if (!rules) return <span>{phrase}</span>
  const matcher = new RegExp(`(${rules.map((rule) => rule.source).join('|')})`, 'gi')
  return <span>{phrase.split(matcher).map((part, index) => {
    const rule = rules.find((candidate) => {
      const matches = new RegExp(`^${candidate.source}$`, 'i').test(part)
      return matches && (!candidate.caseSensitive || part === candidate.source)
    })
    return rule ? <b className={rule.className} key={`${part}-${index}`}>{part}</b> : <Fragment key={`${part}-${index}`}>{part}</Fragment>
  })}</span>
}

function PracticePhrase({ item, phrase = item.phrase }) {
  return <HighlightedPhrase item={item} phrase={phrase} />
}

function LoopToggle({ looping, onToggle, compact = false }) {
  return <button type="button" className={`loop-toggle ${looping ? 'active' : ''} ${compact ? 'compact' : ''}`} onClick={onToggle} aria-pressed={looping} aria-label={looping ? 'Turn loop off' : 'Turn loop on'}>↻ <span>{looping ? 'Loop on' : 'Loop'}</span></button>
}

function getPracticeAudioSrc(item, text) {
  if (text === item.phrase && practiceAudioIds.has(item.id)) {
    return `${import.meta.env.BASE_URL}audio/${item.id}.wav`
  }

  const stepIndex = item.buildSteps?.findIndex((step) => step === text) ?? -1
  if (stepIndex < 0) return ''
  return `${import.meta.env.BASE_URL}audio/segments/${item.id}-${stepIndex + 1}.wav?v=${practiceSegmentAudioVersion}`
}

function usePracticeAudio(item) {
  const audioRef = useRef(null)
  const playbackToken = useRef({ stop: () => {} })
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [looping, setLooping] = useState(false)
  const src = practiceAudioIds.has(item.id) ? `${import.meta.env.BASE_URL}audio/${item.id}.wav` : ''

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    if (src) {
      audio.src = src
      audio.load()
    }
    const onTime = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onEnd = () => {
      setAudioPlaying(false)
      setProgress(100)
      releasePlayback(playbackToken.current)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = looping
  }, [looping])

  const stop = () => {
    const audio = audioRef.current
    if (audio) audio.pause()
    setAudioPlaying(false)
    releasePlayback(playbackToken.current)
  }

  const toggleLoop = () => setLooping((value) => !value)

  const play = (rate = 1, text = item.phrase) => {
    const audio = audioRef.current
    const targetSrc = getPracticeAudioSrc(item, text)
    if (!audio || !targetSrc) return

    audio.pause()
    audio.currentTime = 0
    setAudioPlaying(false)
    setProgress(0)
    setDuration(0)
    audio.src = targetSrc
    audio.load()

    const stopNativePlayback = () => {
      audio.pause()
      setAudioPlaying(false)
      releasePlayback(playbackToken.current)
    }
    claimPlayback(playbackToken.current, stopNativePlayback)
    audio.loop = looping
    audio.playbackRate = rate
    audio.play().then(() => {
      if (activePlayback === playbackToken.current && !audio.paused) setAudioPlaying(true)
    }).catch(() => {
      stopNativePlayback()
    })
  }

  return { audioRef, src, playing: audioPlaying, looping, toggleLoop, progress, duration, play, stop }
}

function PracticeTwisterRail({ item, twisters, onSelect }) {
  return (
    <aside className="practice-flow-rail twister-select-rail" aria-label="Tongue twisters">
      <small className="practice-flow-rail-title">12 TONGUE TWISTERS</small>
      <ol>
        {twisters.map((twister, index) => {
          const active = item.id === twister.id
          return (
            <li key={twister.id}>
              <button type="button" className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} onClick={() => onSelect(twister)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{twister.phrase}</strong>
                <small>{twister.target.replace('·', ' / ')}</small>
              </button>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

function TwisterDrill({ item, twisters, twisterIndex, onSelectTwister, onPrevious, previousLabel, onNext, nextLabel }) {
  const [buildIndex, setBuildIndex] = useState(0)
  const [cleanReps, setCleanReps] = useState(0)
  const [speedReps, setSpeedReps] = useState(0)
  const [review, setReview] = useState('')
  const [activeSection, setActiveSection] = useState('listen')
  const player = usePracticeAudio(item)
  const buildSteps = item.buildSteps || [item.phrase]
  const targetLabel = item.target.replace('·', ' / ')
  const currentSet = Math.min(3, Math.floor(cleanReps / 5) + 1)
  const repsInSet = cleanReps >= 15 ? 5 : cleanReps % 5
  const sectionRefs = useRef({})
  const activeSectionRef = useRef('listen')
  const playbackIntentRef = useRef(null)
  const hasInteractedRef = useRef(false)
  const playerRef = useRef(player)

  playerRef.current = player

  const setSectionRef = (id) => (node) => {
    if (node) sectionRefs.current[id] = node
    else delete sectionRefs.current[id]
  }

  const playTrainingAudio = (text = item.phrase, rate = 0.86) => {
    hasInteractedRef.current = true
    playbackIntentRef.current = { text, rate }
    player.play(rate, text)
  }

  useEffect(() => {
    player.stop()
    setBuildIndex(0)
    setCleanReps(0)
    setSpeedReps(0)
    setReview('')
    setActiveSection('listen')
    activeSectionRef.current = 'listen'
    playbackIntentRef.current = null
    hasInteractedRef.current = false
  }, [item.id])

  const resetLesson = () => {
    player.stop()
    setBuildIndex(0)
    setCleanReps(0)
    setSpeedReps(0)
    setReview('')
    setActiveSection('listen')
    activeSectionRef.current = 'listen'
    playbackIntentRef.current = null
    hasInteractedRef.current = false
  }

  useEffect(() => {
    const sections = Object.values(sectionRefs.current)
    if (!sections.length || typeof IntersectionObserver !== 'function') return undefined

    const idsByNode = new Map(sections.map((node) => [node, node.dataset.practiceSection]))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)
      if (!visible.length) return
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const nextSection = idsByNode.get(visible[0].target)
      if (!nextSection || nextSection === activeSectionRef.current) return

      activeSectionRef.current = nextSection
      setActiveSection(nextSection)
      const intent = playbackIntentRef.current
      if (hasInteractedRef.current && intent) playerRef.current.play(intent.rate, intent.text)
      else playerRef.current.stop()
    }, { threshold: [0.35, 0.6, 0.85], rootMargin: '-96px 0px -16% 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [item.id])

  const sectionNav = [
    ['listen', 'Listen & understand', '聞く・今日のやり方'],
    ['build', 'Build it', '短く → 全文へ'],
    ['reps', '15 clean reps', '5回 × 3セット'],
    ['speed', 'Speed challenge', '速さの中で保つ'],
    ['finish', 'Finish & return', '復習につなげる'],
  ]

  return (
    <section className="practice-page drill-page">
      {player.src && <audio ref={player.audioRef} preload="metadata" />}
      <div className="practice-flow-meta"><small>TONGUE TWISTER · {String(twisterIndex + 1).padStart(2, '0')}</small><span>{item.duration}</span></div>
      <div className="practice-flow-layout">
        <PracticeTwisterRail item={item} twisters={twisters} onSelect={onSelectTwister} />
        <div className="practice-flow-workspace">
          {item.id === 'red-lorry' && (
            <article className="practice-welcome-card">
              <div className="practice-stage-kicker">HOW TO USE THIS TRAINING</div>
              <h1>Make the movement easy before you make it fast.</h1>
              <p>このページは、ひとつの早口言葉を最後まで練習するための場所です。上から順に進んでも、必要なところへ直接移っても構いません。音声を聞き、短いかたまりを作り、普通の速さで繰り返してから、最後に少し速くします。</p>
              <div className="practice-welcome-points"><span><b>01</b>Listen first</span><span><b>02</b>Build from the hard movement</span><span><b>03</b>Keep it clean, then add speed</span></div>
            </article>
          )}

          <div className="practice-lesson-nav" aria-label="Sections in this lesson">
            {sectionNav.map(([id, title, ja]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#practice-${id}`}><span>{String(sectionNav.findIndex((section) => section[0] === id) + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{ja}</small></a>)}
          </div>

          <article className="practice-stage-card" id="practice-listen" data-practice-section="listen" ref={setSectionRef('listen')}>
        <div className="practice-stage-kicker">① LISTEN &amp; UNDERSTAND</div>
        <h2>First, know what you&apos;re training.</h2>
        <p className="practice-stage-intro">今日はただ速く言う練習ではありません。<b>{targetLabel}</b>を切り替えながら、フレーズ全体を一つのリズムとして言えるようにします。</p>
        {item.id === 'red-lorry' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="GAhdinFrTps"
              title="Red lorry, yellow lorry pronunciation reference"
              credit="発音参考：YouTube · Red lorry, yellow lorry"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'seashells' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="K9IC9GbHX4Q"
              title="She sells seashells by the seashore pronunciation reference"
              credit="発音参考：YouTube · She sells seashells by the seashore"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'free-throws' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="zAxOpFUKAYw"
              title="Three free throws pronunciation reference"
              credit="発音参考：YouTube · Three free throws"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'peter-piper' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="3e1tB9m0eSg"
              title="Peter Piper picked a peck of pickled peppers pronunciation reference"
              credit="発音参考：YouTube · Peter Piper picked a peck of pickled peppers"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'big-black-bug' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="vdg8QBpyBDY"
              title="A big black bug bit a big black bear pronunciation reference"
              credit="発音参考：YouTube · A big black bug bit a big black bear"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'two-witches' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="sr6Vgxn67a4"
              title="If two witches were watching two watches pronunciation reference"
              credit="発音参考：YouTube · If two witches were watching two watches"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'ice-cream' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="52rEBee1jkc"
              title="I scream, you scream, we all scream for ice cream pronunciation reference"
              credit="発音参考：YouTube · I scream, you scream, we all scream for ice cream"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'slippery-snails' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="rUVjfdI3q7k"
              title="Six slippery snails slid slowly seaward pronunciation reference"
              credit="発音参考：YouTube · Six slippery snails slid slowly seaward"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'fresh-flesh' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="N_lay3-7kKQ"
              title="Freshly fried fresh flesh pronunciation reference"
              credit="発音参考：YouTube · Freshly fried fresh flesh"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'betty-botter' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="CPXbrFmP1Sg"
              title="Betty Botter bought some butter pronunciation reference"
              credit="発音参考：YouTube · Betty Botter bought some butter"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'woodchuck' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="HltcZKJ-Yf4"
              title="How much wood would a woodchuck chuck pronunciation reference"
              credit="発音参考：YouTube · How much wood would a woodchuck chuck"
              autoplay={false}
            />
          </div>
        )}
        {item.id === 'unique-new-york' && (
          <div className="practice-reference-video">
            <YouTubeLessonPlayer
              videoId="RAr-48JusHM"
              title="Unique New York pronunciation reference"
              credit="発音参考：YouTube · Unique New York"
              autoplay={false}
            />
          </div>
        )}
        <div className="practice-phrase"><PracticePhrase item={item} /></div>
        <div className="practice-model-actions"><button type="button" className="model-button" onClick={() => playTrainingAudio(item.phrase, 0.86)}><PlayIcon pause={player.playing && activeSection === 'listen'} /> {player.playing && activeSection === 'listen' ? 'Playing model' : 'Listen to model'}</button><button type="button" className="quiet-button" onClick={() => playTrainingAudio(item.phrase, 0.62)}>Slow model</button><LoopToggle looping={player.looping} onToggle={player.toggleLoop} /></div>
        <div className="practice-three-cues"><div><b>Listen</b><span>まず正しい音とリズムを耳に入れる。</span></div><div><b>Build</b><span>短い単位から全文までつなぐ。</span></div><div><b>Repeat</b><span>正確さを保って繰り返し、最後に速度を上げる。</span></div></div>
          </article>

          <article className="practice-stage-card" id="practice-build" data-practice-section="build" ref={setSectionRef('build')}>
        <div className="practice-stage-kicker">② BUILD IT</div>
        <h2>Build from the hardest movement.</h2>
        <p className="practice-stage-intro">いきなり全文ではなく、口が迷わないところまで小さくしてから足していきます。各行をタップして音を確認してください。</p>
        <div className="practice-build-guidance"><strong>短いかたまりから少しずつ長くする</strong><span>Start with a short chunk and gradually make it longer.</span><small>止まりすぎず、ひとかたまりで · Try to say each step as one connected chunk rather than stopping between every word.</small><LoopToggle looping={player.looping} onToggle={player.toggleLoop} /></div>
        <div className="practice-build-ladder" aria-label="Progressive pronunciation ladder">{buildSteps.map((phrase, index) => <Fragment key={`${phrase}-${index}`}><button type="button" aria-pressed={buildIndex === index} className={`practice-build-step ${buildIndex === index ? 'active' : ''} ${buildIndex > index ? 'done' : ''} ${index === buildSteps.length - 1 ? 'final' : ''}`} onClick={() => { setBuildIndex(index); playTrainingAudio(phrase, 0.72) }}><span className="practice-build-step-number">{String(index + 1).padStart(2, '0')}</span><span className="practice-build-step-phrase"><PracticePhrase item={item} phrase={phrase} /></span><span className="practice-build-step-play"><PlayIcon pause={player.playing && activeSection === 'build' && buildIndex === index} /></span></button>{index < buildSteps.length - 1 && <span className="practice-build-arrow" aria-hidden="true">↓</span>}</Fragment>)}</div>
        <div className="practice-technique-grid"><div><b>{targetLabel.split(' / ')[0]}</b><span>{item.cue}</span></div><div><b>Whole phrase</b><span>音を止めず、短い単位を一つの流れにまとめます。</span></div></div>
          </article>

          <article className="practice-stage-card" id="practice-reps" data-practice-section="reps" ref={setSectionRef('reps')}>
        <div className="practice-stage-kicker">③ 15 CLEAN REPS</div>
        <h2>5 times. Pause. Repeat.</h2>
        <p className="practice-stage-intro">ここでは速くしません。普通のゆっくりしたテンポで、同じ発音を5回 × 3セット保ちます。セットの間では少し口を休めてください。</p>
        <div className="clean-reps-card"><div className="clean-reps-heading"><b>SET {currentSet} · 5 repetitions</b><strong>{cleanReps} / 15</strong></div><div className="practice-phrase small"><PracticePhrase item={item} /></div><div className="rep-pills" aria-label="Clean repetitions">{Array.from({ length: 5 }, (_, index) => <span className={index < repsInSet ? 'done' : index === repsInSet && cleanReps < 15 ? 'current' : ''} key={index}>{index + 1}</span>)}</div><div className="rep-actions"><button type="button" className="model-button" onClick={() => playTrainingAudio(item.phrase, 0.72)}><PlayIcon pause={player.playing && activeSection === 'reps'} /> Hear model</button><LoopToggle looping={player.looping} onToggle={player.toggleLoop} compact /><button type="button" className="primary-small-button" disabled={cleanReps >= 15} onClick={() => setCleanReps((value) => Math.min(15, value + 1))}>✓ I said it</button></div></div>
          </article>

          <article className="practice-stage-card" id="practice-speed" data-practice-section="speed" ref={setSectionRef('speed')}>
        <div className="practice-stage-kicker">④ SPEED CHALLENGE</div>
        <h2>Now let it run.</h2>
        <p className="practice-stage-intro">ここでは少し速くします。最低5回。その後は <b>{targetLabel}</b> が崩れない限り、何回続けてもOKです。</p>
        <div className="speed-challenge-card"><div className="speed-count">{speedReps}<small>clean fast repetitions</small></div><div className="practice-phrase small"><PracticePhrase item={item} /></div><div className="rep-actions"><button type="button" className="model-button" onClick={() => playTrainingAudio(item.phrase, 1.08)}><PlayIcon pause={player.playing && activeSection === 'speed'} /> Hear faster model</button><LoopToggle looping={player.looping} onToggle={player.toggleLoop} compact /><button type="button" className="primary-small-button" onClick={() => setSpeedReps((value) => value + 1)}>+ Clean repetition</button><button type="button" className="quiet-button" disabled={!speedReps} onClick={() => setSpeedReps((value) => Math.max(0, value - 1))}>Undo</button></div><p className={`challenge-status ${speedReps >= 5 ? 'ready' : ''}`}>{speedReps >= 5 ? 'Minimum reached. Keep going if the sound stays clean.' : `${5 - speedReps} more to reach the minimum.`}</p><small className="challenge-note">崩れたら回数に入れず、一度ゆっくり戻る。</small></div>
          </article>

          <article className="practice-stage-card finish-stage-card" id="practice-finish" data-practice-section="finish" ref={setSectionRef('finish')}>
        <div className="practice-stage-kicker">⑤ FINISH &amp; RETURN</div>
        <h2>You trained the movement, not just the sentence.</h2>
        <p className="practice-stage-intro">今日覚えたのはこの一文だけではありません。<b>{targetLabel}</b>を切り替えながら、止まらずに音をつなげる動きを練習しました。</p>
        <div className="practice-phrase"><PracticePhrase item={item} /></div>
        <div className="finish-columns"><div><strong>Today&apos;s takeaway</strong>{[`${targetLabel}を別々の口の動きとして使う`, '短い単位から全文へ止まらず切り替える', '正確さを保ったまま少し速度を上げる'].map((text) => <span key={text}>✓ {text}</span>)}</div><div><strong>Come back before you forget.</strong><p>一度で完成させる必要はありません。短く戻る方が、長く一度だけ練習するより実用的です。</p>{[['1 day', '5回だけ復習'], ['3 days', '普通 → 少し速く'], ['7 days', '最終チェック']].map(([label, text]) => <button type="button" className={review === label ? 'selected' : ''} onClick={() => setReview(label)} key={label}><b>+{label}</b><span>{text}</span></button>)}</div></div>
        <div className="finish-actions"><button type="button" className="quiet-button" onClick={resetLesson}>↻ Repeat this lesson</button></div>
          </article>

          <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} note="Scroll freely · 音声は表示中の練習に合わせて止まります" label={nextLabel || 'Next tongue twister'} onNext={onNext} />
        </div>
      </div>
    </section>
  )
}

function RoutinePage({ onStart, onPrevious }) {
  const weeks = [
    ['Week 1', 'Sound contrasts', tongueGroups[0].items, 'Focused first'],
    ['Week 2', 'Clean consonants', tongueGroups[1].items, 'Begin to mix'],
    ['Week 3', 'Consonant clusters', tongueGroups[2].items, 'More mixing'],
    ['Week 4', 'Rhythm + mixed review', tongueGroups[3].items, 'Mixed review'],
  ]
  return (
    <section className="practice-page routine-page">
      <LessonTitle eyebrow="Suggested rotation · 4 weeks" title="Repeat the set. Change the order." ja="最初は同じ音をまとめて練習し、慣れたら違うグループを混ぜます。4週間は繰り返すための型です。" />
      <div className="week-grid">{weeks.map(([week, title, items, label]) => <article key={week}><header><small>{week}</small><h2>{title}</h2></header>{items.map((item) => <span key={item.id}>{item.phrase}</span>)}<p>{week === 'Week 1' ? '同じグループを集中して練習。' : week === 'Week 4' ? '全グループから順番を変えて選ぶ。' : '重点練習の後に、前の週から1本混ぜる。'}</p><b>{label}</b></article>)}</div>
      <div className="daily-routine"><div><small>Today · 8–10 minutes</small><h2>One focus card, then two mixed cards</h2><p>週5日を目安に。休んでも記録は失われません。</p></div><ol>{[['Prepare', '30秒'], ['Model', '1回聞く'], ['Slow', '3回'], ['Rhythm', '3回'], ['Transfer', '普通の文 ×2'], ['Return', '次回また行う']].map(([label, ja], i) => <li key={label}><b>{i + 1}</b><strong>{label}</strong><span>{ja}</span></li>)}</ol></div>
      <LessonFooter previousLabel="All classics" onPrevious={onPrevious} note="Suggested, not required · 同じ週を繰り返しても大丈夫です" label="Start with Red lorry" onNext={onStart} />
    </section>
  )
}

function PracticeMode({ selected, setSelected, view, setView, curriculum, onBackToLearn, practiceAvailable, activeStep }) {
  const selectTwister = (item) => {
    setSelected(item)
    setView(item ? 'drill' : 'library')
    if (item) window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const changeView = (next) => {
    setSelected(null)
    setView(next)
  }

  const selectedIndex = selected ? allTwisters.findIndex((item) => item.id === selected.id) : -1
  const nextItem = selectedIndex >= 0 ? allTwisters[selectedIndex + 1] : null
  const selectNextDrill = () => {
    if (nextItem) {
      selectTwister(nextItem)
      return
    }
    changeView('library')
  }

  if (!practiceAvailable) {
    const currentStep = learnSteps.find((step) => step.id === activeStep) || learnSteps[0]
    return (
      <div className="app-body">
        <LessonSidebar active={activeStep} onSelect={curriculum.onSelectFoundation} curriculum={curriculum} />
        <main className="lesson-main practice-main">
          <PracticeUnavailable lessonLabel={currentStep.label} lessonJa={currentStep.ja} onBackToLearn={onBackToLearn} />
        </main>
      </div>
    )
  }

  return (
    <div className="app-body">
      <PracticeSidebar
        selected={selected}
        selectTwister={selectTwister}
        curriculum={curriculum}
      />
      <main className="lesson-main practice-main">
        {selected ? (
          <TwisterDrill item={selected} twisters={allTwisters} twisterIndex={selectedIndex} onSelectTwister={selectTwister} onPrevious={() => changeView('library')} previousLabel="All classics" onNext={selectNextDrill} nextLabel={nextItem ? `Next: ${nextItem.target}` : 'Back to tongue twisters'} />
        ) : view === 'routine' ? (
          <RoutinePage onPrevious={() => changeView('library')} onStart={() => selectTwister(allTwisters[0])} />
        ) : (
          <TwisterLibrary onSelect={selectTwister} onPrevious={onBackToLearn} onNext={() => changeView('routine')} />
        )}
      </main>
    </div>
  )
}

function CourseApp({ onHome }) {
  const [courseLayer, setCourseLayer] = useState('foundation')
  const [mode, setMode] = useState('learn')
  const [activeStep, setActiveStep] = useState('orientation')
  const [selected, setSelected] = useState(null)
  const [practiceView, setPracticeView] = useState('library')
  const [notice, setNotice] = useState('')
  const [foundationOpen, setFoundationOpen] = useState(true)
  const [everydayOpen, setEverydayOpen] = useState(true)

  // Social Fluency state (chapter map is sourced from the book manuscript)
  const [everydayModuleId, setEverydayModuleId] = useState('social-01')
  const [everydayLessonId, setEverydayLessonId] = useState('social-01')
  const [everydayLearnStep, setEverydayLearnStep] = useState('context')
  const [everydayPracticeStep, setEverydayPracticeStep] = useState('substitute')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mode, activeStep, selected, practiceView, courseLayer, everydayModuleId, everydayLessonId])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const openPractice = () => { setMode('practice'); setPracticeView('drill'); setSelected(allTwisters[0]); setEverydayPracticeStep('substitute'); }
  const changeMode = (next) => {
    setMode(next)
    if (next === 'practice') {
      setSelected(null)
      setPracticeView(practiceAvailable ? 'drill' : 'unavailable')
      if (practiceAvailable && courseLayer === 'foundation') setSelected(allTwisters[0])
      setEverydayPracticeStep('substitute')
    } else {
      setEverydayLearnStep('context')
    }
  }
  const showProfileNotice = () => setNotice('学習プロファイル: 無料基礎コース進行中')

  const selectFoundationStep = (id) => {
    setCourseLayer('foundation')
    setMode('learn')
    setActiveStep(id)
    setSelected(null)
  }

  const selectEverydayModule = (id) => {
    setCourseLayer('fluency')
    setMode('learn')
    setSelected(null)
    setEverydayModuleId(id)
    setEverydayLessonId(id)
    setEverydayLearnStep('context')
    setEverydayPracticeStep('substitute')
  }

  const selectEverydayLesson = (id) => {
    setMode('learn')
    setSelected(null)
    setEverydayLessonId(id)
    setEverydayLearnStep('context')
    setEverydayPracticeStep('substitute')
  }

  const currentEverydayModule = socialFluencyChapters.find((chapter) => chapter.id === everydayModuleId)
  const currentEverydayLesson = currentEverydayModule?.lessons?.find((lesson) => lesson.id === everydayLessonId) || currentEverydayModule?.lessons?.[0]
  const foundationPracticeAvailable = activeStep === 'tongue-intro'
  const everydayPracticeAvailable = Boolean(currentEverydayLesson?.practice)
  const practiceAvailable = courseLayer === 'foundation' ? foundationPracticeAvailable : everydayPracticeAvailable
  const curriculum = {
    courseLayer,
    setCourseLayer,
    foundationOpen,
    setFoundationOpen,
    everydayOpen,
    setEverydayOpen,
    activeFoundationId: activeStep,
    onSelectFoundation: selectFoundationStep,
    activeEverydayModuleId: everydayModuleId,
    onSelectEverydayModule: selectEverydayModule,
    activeEverydayLessonId: everydayLessonId,
    onSelectEverydayLesson: selectEverydayLesson,
  }

  return (
    <div className="course-app">
      <AppHeader mode={mode} setMode={changeMode} onHome={onHome} onProfileClick={showProfileNotice} />
      {courseLayer === 'foundation' ? (
        mode === 'learn' ? (
          <LearnMode activeStep={activeStep} setActiveStep={setActiveStep} openPractice={openPractice} curriculum={curriculum} />
        ) : (
          <PracticeMode selected={selected} setSelected={setSelected} view={practiceView} setView={setPracticeView} curriculum={curriculum} onBackToLearn={() => setMode('learn')} practiceAvailable={foundationPracticeAvailable} activeStep={activeStep} />
        )
      ) : (
        <div className="app-body">
          <EverydaySidebar
            activeModuleId={everydayModuleId}
            onSelectModule={selectEverydayModule}
            activeLessonId={everydayLessonId}
            onSelectLesson={selectEverydayLesson}
            curriculum={curriculum}
            CurriculumNav={CurriculumNav}
          />
          <main className="lesson-main">
            {mode === 'learn' && currentEverydayModule?.status === 'coming_soon' ? (
              <EverydayOverviewView
                parts={socialFluencyParts}
                activeModuleId={everydayModuleId}
                onSelectModule={selectEverydayModule}
                LessonTitle={LessonTitle}
              />
            ) : mode === 'learn' ? (
              <EverydayLearnView
                lesson={currentEverydayLesson}
                step={everydayLearnStep}
                setStep={setEverydayLearnStep}
                speakWithBrowser={speakWithBrowser}
                PlayIcon={PlayIcon}
                LessonTitle={LessonTitle}
              />
            ) : practiceAvailable ? (
              <EverydayPracticeView
                key={currentEverydayLesson?.id}
                lesson={currentEverydayLesson}
                step={everydayPracticeStep}
                setStep={setEverydayPracticeStep}
                speakWithBrowser={speakWithBrowser}
                PlayIcon={PlayIcon}
                LessonTitle={LessonTitle}
              />
            ) : (
              <PracticeUnavailable
                lessonLabel={currentEverydayModule?.enTitle || 'This lesson'}
                lessonJa={currentEverydayModule?.ja || 'このレッスン'}
                onBackToLearn={() => setMode('learn')}
              />
            )}
          </main>
        </div>
      )}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default function App() {
  const [surface, setSurface] = useState(() => window.location.hash === '#course' ? 'course' : 'landing')

  useEffect(() => {
    window.location.hash = surface === 'course' ? 'course' : ''
    window.scrollTo(0, 0)
  }, [surface])

  return surface === 'course' ? <CourseApp onHome={() => setSurface('landing')} /> : <LandingPage onStart={() => setSurface('course')} />
}
