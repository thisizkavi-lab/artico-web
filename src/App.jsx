import { useEffect, useMemo, useRef, useState } from 'react'
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

function PrimaryButton({ children, onClick, className = '' }) {
  return <button className={`primary-button ${className}`} type="button" onClick={onClick}>{children}<ArrowIcon /></button>
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
      <LessonTitle eyebrow="Alphabets & sounds · 03" title="Meet the 26 letters" ja="英語のすべては、26文字から始まります。まずは大文字と小文字の形・名前に慣れましょう。" />
      <div className="letters-layout">
        <div className="letters-explain"><div className="number-card"><strong>26 letters</strong><b>2 forms</b><span>大文字と小文字は、同じ文字の二つの形です。</span></div><div className="matter-card"><h3>What matters now</h3><p>文字の形を見る</p><p>文字の名前を聞く</p><p>声に出してまねる</p></div></div>
        <div className="alphabet-board"><div><h3>Uppercase + lowercase</h3><span>同じ文字を、二つの形で見てみましょう</span></div><div className="alphabet-grid">{alphabet.map((letter) => <button key={letter} type="button" onClick={() => speakWithBrowser(letter)}><strong>{letter}</strong><span>{letter.toLowerCase()}</span></button>)}</div></div>
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

function HearLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Alphabets & sounds · 04" title="Hear the Alphabet" ja="動画は音のお手本です。見終わったら、Articoの手順で口を動かします。" />
      <div className="media-layout">
        <VideoReference label="External reference" title="The Super Simple Alphabet Song · lowercase" source="Super Simple · slow alphabet model" externalUrl="https://supersimple.com/phonics-fun/the-super-simple-alphabet-song-lowercase/" />
        <div className="guided-panel"><h3>Use the video in three passes</h3>{[['1', 'Listen', '最初は歌わず、リズムと音を聞く。'], ['2', 'Repeat', '止めずに、一緒に5回まで声に出す。'], ['3', 'Recall', '音を止めて、AからZまで思い出す。']].map(([n, title, copy]) => <div key={n}><b>{n}</b><span><strong>{title}</strong><small>{copy}</small></span></div>)}</div>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Write the Alphabet" onNext={onNext} />
    </section>
  )
}

function WriteLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Alphabets & sounds · 05" title="Write the Alphabet" ja="画面をタップするだけでなく、紙に書いて文字の形を手と目に覚えさせます。" />
      <div className="media-layout">
        <VideoReference videoId="7yMlDJg2IZw" label="YouTube reference" title="Learn to Write the ABCs" source="Bri Reads · handwriting practice" />
        <div className="writing-panel"><h3>Paper practice</h3><p>鉛筆、消しゴム、罫線のあるノートを用意してください。</p><ol><li>大文字と小文字を数回なぞる</li><li>見本を隠して、自分で書く</li><li>その文字で始まる短い単語を3つ書く</li></ol><a href="https://teachprints.com/letter-tracing-worksheets/" target="_blank" rel="noreferrer">Free tracing sheets ↗</a></div>
      </div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Letters & sounds" onNext={onNext} />
    </section>
  )
}

function SoundsLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Side note · letters versus sounds · 06" title="26 letters. About 44 sounds." ja="IPAを暗記する必要はありません。文字と音がいつも一対一ではないことを、ここで知っておきましょう。" />
      <div className="sound-explainer"><div className="comparison-table"><div><strong>System</strong><strong>Represents</strong><strong>Example</strong></div><div><span>Alphabet</span><span>Letters</span><span>“a”, “b”, “c”</span></div><div><span>IPA</span><span>Sounds</span><span>/æ/, /b/, /k/</span></div></div><div className="sound-note"><h3>Awareness, not mastery</h3><p>同じ文字でも、単語によって音が変わることがあります。辞書でIPAを見たときに「発音を表す記号」だと分かれば、今は十分です。</p></div></div>
      <div className="compact-video"><VideoReference videoId="z5nWOwM5HsI" label="YouTube reference" title="Learn all 44 British English sounds" source="English for Traveling · IPA overview" /><div><h3>One viewing is enough for now.</h3><p>すべての記号を覚えようとせず、英語には文字より多くの音があることを耳で確認します。</p></div></div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} label="Tongue Twisters" onNext={onNext} />
    </section>
  )
}

function TongueIntro({ onPrevious, previousLabel, onPractice }) {
  return (
    <section className="lesson-page tongue-intro-page">
      <LessonTitle eyebrow="Tongue twisters · introduction · 07" title="Train transitions, not speed." ja="早口で言う競争ではありません。英語の音から次の音へ、正確に切り替える練習です。" />
      <div className="tongue-intro-layout"><div className="set-summary"><div><b>12</b><span>classic lines</span></div><div><b>4</b><span>training groups</span></div><div><b>1</b><span>repeatable loop</span></div><p>会話練習の代わりではありません。選んだ音の動きを、繰り返せる形にします。</p></div><div className="group-preview">{tongueGroups.map((group) => <article key={group.id}><b>{group.number}</b><div><h3>{group.title}</h3><p>{group.ja}</p><span>3 classics</span></div></article>)}</div></div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} note="Learn complete · 練習はPracticeから始まります" label="Open the classic set" onNext={onPractice} />
    </section>
  )
}

function SecondaryButton({ children, onClick, disabled = false }) {
  return <button className="secondary-button" type="button" onClick={onClick} disabled={disabled}><span aria-hidden="true">←</span>{children}</button>
}

function LessonFooter({ previousLabel = 'Previous', onPrevious, label, note = 'Accuracy before speed.', onNext }) {
  return <div className="lesson-footer"><span>{note}</span><div className="lesson-footer-actions"><SecondaryButton onClick={onPrevious} disabled={!onPrevious}>{previousLabel}</SecondaryButton><PrimaryButton onClick={onNext}>{label}</PrimaryButton></div></div>
}

const theoryOutlines = {
  orientation: orientationSections.map((section) => section.title),
  'how-it-works': howItWorksSections.map((section) => section.title),
  letters: ['Meet the 26 letters', 'Uppercase and lowercase', 'What matters now'],
  hear: ['Hear the alphabet', 'Listen', 'Repeat', 'Recall'],
  write: ['Write the alphabet', 'Paper practice', 'Move on'],
  sounds: ['Letters versus sounds', 'Awareness, not mastery', 'One viewing is enough'],
  'tongue-intro': ['Why tongue twisters', 'A small focused set', 'Practice begins here'],
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

function PracticeSidebar({ view, setView, selected, selectTwister, onSelectGroup, pendingGroupId, activeGroupId, curriculum }) {
  return (
    <aside className="practice-sidebar">
      <CurriculumNav {...curriculum} />
      <div className="sidebar-heading sidebar-tool-heading"><small>Practice mode</small><h2>Tongue Twisters</h2><p>12本の定番セット</p></div>
      <nav>
        <button
          className={view === 'library' && !selected && !pendingGroupId && !activeGroupId ? 'active' : ''}
          aria-current={view === 'library' && !selected && !pendingGroupId && !activeGroupId ? 'page' : undefined}
          type="button"
          onClick={() => { setView('library'); onSelectGroup(null); }}
        >
          All classics
        </button>
        {tongueGroups.map((group) => {
          const isGroupActive = view === 'library' && !selected && (pendingGroupId === group.id || activeGroupId === group.id)
          return (
            <button
              key={group.id}
              className={isGroupActive ? 'active' : ''}
              aria-current={isGroupActive ? 'page' : undefined}
              type="button"
              onClick={() => onSelectGroup(group.id)}
            >
              {group.title.replace('Japanese-priority ', '')}
            </button>
          )
        })}
        <button
          className={view === 'routine' ? 'active' : ''}
          aria-current={view === 'routine' ? 'page' : undefined}
          type="button"
          onClick={() => { setView('routine'); onSelectGroup(null); }}
        >
          Four-week routine
        </button>
      </nav>
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
  const timer = useRef(null)

  const stop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    window.clearInterval(timer.current)
    setPlaying(false)
    setProgress(0)
  }

  const play = (text, rate) => {
    stop()
    const started = Date.now()
    const estimated = Math.max(2600, (text.split(' ').length * 520) / rate)

    const success = speakWithBrowser(text, {
      rate,
      onend: () => {
        window.clearInterval(timer.current)
        setPlaying(false)
        setProgress(100)
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
    }
  }

  useEffect(() => () => stop(), [])
  return { playing, progress, play, stop }
}

function TwisterDrill({ item, onPrevious, previousLabel, onNext, nextLabel }) {
  const [speed, setSpeed] = useState('model')
  const [stage, setStage] = useState(1)
  const player = useSpeechPlayer()
  const rate = speed === 'slow' ? 0.58 : speed === 'natural' ? 1.05 : 0.82

  return (
    <section className="practice-page drill-page">
      <LessonTitle eyebrow={`${item.groupTitle} · ${item.target}`} title={item.phrase} ja="音が崩れたら速度を戻します。覚えることより、動きを整えます。" />
      <div className="drill-layout">
        <div className="drill-player-card">
          <div className="audio-player">
            <small>Device voice preview · replace with approved audio</small>
            <div><button type="button" onClick={() => player.play(item.phrase, rate)} aria-label="Play model"><PlayIcon pause={player.playing} /></button><strong>{speed === 'slow' ? 'Slow model' : speed === 'natural' ? 'Natural model' : 'Model · clear'}</strong><div className="waveform" aria-hidden="true">{[22,34,47,28,42,51,24,40,55,36,46,31,54,28,44,49,33,57,27,41,52].map((height, i) => <i key={i} style={{ height }} />)}</div></div><div className="audio-track"><span style={{ width: `${player.progress}%` }} /></div>
          </div>
          <div className="speed-tabs">{['model', 'slow', 'natural'].map((option) => <button aria-pressed={speed === option} className={speed === option ? 'active' : ''} key={option} type="button" onClick={() => setSpeed(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}</div>
          <div className="mouth-cue"><small>Mouth cue</small><h3>{item.target}</h3><p>{item.cue}</p></div>
        </div>
        <div className="drill-guidance"><div className="why-card"><small>Why this matters</small><p>{item.why}</p></div><div className="sequence-card"><h2>Today’s guided sequence</h2>{[['Listen once', 'まだ話さない'], ['Slow ×3', '区切って明確に'], ['With rhythm ×3', '明瞭さを保つ'], ['Transfer ×2', '日常文へ移す']].map(([label, ja], i) => <button aria-pressed={stage === i + 1} className={stage === i + 1 ? 'active' : stage > i + 1 ? 'done' : ''} key={label} type="button" onClick={() => setStage(i + 1)}><b>{i + 1}</b><strong>{label}</strong><span>{ja}</span></button>)}</div></div>
      </div>
      <div className="transfer-card"><small>Transfer to normal English</small>{item.transfer.map((phrase) => <button type="button" key={phrase} onClick={() => player.play(phrase, 0.86)}>“{phrase}” <PlayIcon /></button>)}<span>同じ口の動きを、普通の文でも2回ずつ使います。</span></div>
      <LessonFooter previousLabel={previousLabel} onPrevious={onPrevious} note="One drill at a time · 速度より明瞭さ" label={nextLabel} onNext={onNext} />
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

function PracticeMode({ selected, setSelected, view, setView, curriculum, onBackToLearn }) {
  const [pendingGroupId, setPendingGroupId] = useState(null)
  const [activeGroupId, setActiveGroupId] = useState(null)

  useEffect(() => {
    if (view === 'library' && !selected && pendingGroupId) {
      const element = document.getElementById(`group-${pendingGroupId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setActiveGroupId(pendingGroupId)
      }
      setPendingGroupId(null)
    }
  }, [view, selected, pendingGroupId])

  const selectTwister = (item) => {
    setSelected(item)
    setView(item ? 'drill' : 'library')
    if (item) {
      setActiveGroupId(null)
      setPendingGroupId(null)
    }
  }

  const changeView = (next) => {
    setSelected(null)
    setPendingGroupId(null)
    setActiveGroupId(null)
    setView(next)
  }

  const handleGroupSelect = (groupId) => {
    setSelected(null)
    if (!groupId) {
      setActiveGroupId(null)
      setPendingGroupId(null)
      return
    }
    setView('library')
    setActiveGroupId(null)
    setPendingGroupId(groupId)
  }

  const selectedIndex = selected ? allTwisters.findIndex((item) => item.id === selected.id) : -1
  const nextItem = selectedIndex >= 0 ? allTwisters[selectedIndex + 1] : null
  const selectNextDrill = () => {
    if (nextItem) {
      selectTwister(nextItem)
      return
    }
    changeView('routine')
  }

  return (
    <div className="app-body">
      <PracticeSidebar
        view={view}
        setView={changeView}
        selected={selected}
        selectTwister={selectTwister}
        onSelectGroup={handleGroupSelect}
        pendingGroupId={pendingGroupId}
        activeGroupId={activeGroupId}
        curriculum={curriculum}
      />
      <main className="lesson-main practice-main">
        {selected ? (
          <TwisterDrill item={selected} onPrevious={() => changeView('library')} previousLabel="All classics" onNext={selectNextDrill} nextLabel={nextItem ? `Next: ${nextItem.target}` : 'Four-week routine'} />
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

  const openPractice = () => { setMode('practice'); setPracticeView('library'); setSelected(null); setEverydayPracticeStep('substitute'); }
  const backToTongueIntro = () => { setMode('learn'); setCourseLayer('foundation'); setActiveStep('tongue-intro'); setSelected(null); }
  const changeMode = (next) => {
    setMode(next)
    if (next === 'practice') {
      setSelected(null)
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
    setEverydayModuleId(id)
    setEverydayLessonId(id)
    setEverydayLearnStep('context')
    setEverydayPracticeStep('substitute')
  }

  const selectEverydayLesson = (id) => {
    setEverydayLessonId(id)
    setEverydayLearnStep('context')
    setEverydayPracticeStep('substitute')
  }

  const currentEverydayModule = socialFluencyChapters.find((chapter) => chapter.id === everydayModuleId)
  const currentEverydayLesson = currentEverydayModule?.lessons?.find((lesson) => lesson.id === everydayLessonId) || currentEverydayModule?.lessons?.[0]
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
          <PracticeMode selected={selected} setSelected={setSelected} view={practiceView} setView={setPracticeView} curriculum={curriculum} onBackToLearn={backToTongueIntro} />
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
            {currentEverydayModule?.status === 'coming_soon' ? (
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
            ) : (
              <EverydayPracticeView
                key={currentEverydayLesson?.id}
                lesson={currentEverydayLesson}
                step={everydayPracticeStep}
                setStep={setEverydayPracticeStep}
                speakWithBrowser={speakWithBrowser}
                PlayIcon={PlayIcon}
                LessonTitle={LessonTitle}
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
