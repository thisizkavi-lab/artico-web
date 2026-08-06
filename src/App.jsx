import { useEffect, useMemo, useRef, useState } from 'react'
import { allTwisters, alphabet, everydayModules, learnSteps, tongueGroups } from './data'
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

function LayerNav({ courseLayer, setCourseLayer }) {
  return (
    <div className="sidebar-layer-nav" aria-label="Course selection">
      <button
        type="button"
        aria-pressed={courseLayer === 'foundation'}
        className={courseLayer === 'foundation' ? 'active' : ''}
        onClick={() => setCourseLayer('foundation')}
      >
        Foundation
      </button>
      <button
        type="button"
        aria-pressed={courseLayer === 'fluency'}
        className={courseLayer === 'fluency' ? 'active' : ''}
        onClick={() => setCourseLayer('fluency')}
      >
        Everyday Fluency
      </button>
    </div>
  )
}

function LessonSidebar({ active, onSelect, courseLayer, setCourseLayer }) {
  return (
    <aside className="lesson-sidebar">
      <LayerNav courseLayer={courseLayer} setCourseLayer={setCourseLayer} />
      <div className="sidebar-heading"><small>Free foundation</small><h2>Foundation</h2><p>理解してから、口を動かす</p></div>
      <ol>
        {learnSteps.map((step, index) => (
          <li key={step.id}>
            <button className={active === step.id ? 'active' : ''} aria-current={active === step.id ? 'step' : undefined} type="button" onClick={() => onSelect(step.id)}>
              <span>{index + 1}</span><span><strong>{step.label}</strong><small>{step.ja}</small></span>
            </button>
          </li>
        ))}
      </ol>
      <div className="sidebar-note"><small>Next in practice</small><strong>Tongue Twisters</strong><span>発音練習はここから始まります</span></div>
    </aside>
  )
}

function LessonTitle({ eyebrow, title, ja }) {
  return <div className="lesson-title"><small>{eyebrow}</small><h1>{title}</h1><p>{ja}</p></div>
}

function Orientation({ onNext }) {
  return (
    <section className="lesson-page orientation-page">
      <LessonTitle eyebrow="Orientation · 01" title="Prepare to learn aloud." ja="Articoは、読むだけのコースではありません。短く理解し、声に出し、時間をあけて戻ります。" />
      <div className="orientation-layout">
        <div className="orientation-list">
          {[
            ['01', 'Find a private place', '恥ずかしさを感じずに声を出せる場所を選ぶ。'],
            ['02', 'Use headphones', '音のお手本と自分の声を、落ち着いて聞く。'],
            ['03', 'Keep water and paper nearby', '口を休め、必要なときだけ手で書く。'],
            ['04', 'Stop before accuracy breaks', '速さや回数ではなく、明瞭さを守る。'],
          ].map(([n, title, copy]) => <div className="orientation-row" key={n}><b>{n}</b><div><h3>{title}</h3><p>{copy}</p></div></div>)}
        </div>
        <div className="session-card"><small>Your learning loop</small><h3>Understand → Practise → Return</h3><p>一度で覚え切る必要はありません。今日の動きを短く練習して、別の日に同じ動きへ戻ります。</p><div className="quiet-visual"><span /><span /><span /><span /></div></div>
      </div>
      <LessonFooter label="Meet the 26 letters" onNext={onNext} />
    </section>
  )
}

function LettersLesson({ onNext }) {
  return (
    <section className="lesson-page letters-page">
      <LessonTitle eyebrow="Alphabets & sounds · 02" title="Meet the 26 letters" ja="英語のすべては、26文字から始まります。まずは大文字と小文字の形・名前に慣れましょう。" />
      <div className="letters-layout">
        <div className="letters-explain"><div className="number-card"><strong>26 letters</strong><b>2 forms</b><span>大文字と小文字は、同じ文字の二つの形です。</span></div><div className="matter-card"><h3>What matters now</h3><p>文字の形を見る</p><p>文字の名前を聞く</p><p>声に出してまねる</p></div></div>
        <div className="alphabet-board"><div><h3>Uppercase + lowercase</h3><span>同じ文字を、二つの形で見てみましょう</span></div><div className="alphabet-grid">{alphabet.map((letter) => <button key={letter} type="button" onClick={() => speakWithBrowser(letter)}><strong>{letter}</strong><span>{letter.toLowerCase()}</span></button>)}</div></div>
      </div>
      <LessonFooter label="Hear the Alphabet" onNext={onNext} />
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

function HearLesson({ onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Alphabets & sounds · 03" title="Hear the Alphabet" ja="動画は音のお手本です。見終わったら、Articoの手順で口を動かします。" />
      <div className="media-layout">
        <VideoReference label="External reference" title="The Super Simple Alphabet Song · lowercase" source="Super Simple · slow alphabet model" externalUrl="https://supersimple.com/phonics-fun/the-super-simple-alphabet-song-lowercase/" />
        <div className="guided-panel"><h3>Use the video in three passes</h3>{[['1', 'Listen', '最初は歌わず、リズムと音を聞く。'], ['2', 'Repeat', '止めずに、一緒に5回まで声に出す。'], ['3', 'Recall', '音を止めて、AからZまで思い出す。']].map(([n, title, copy]) => <div key={n}><b>{n}</b><span><strong>{title}</strong><small>{copy}</small></span></div>)}</div>
      </div>
      <LessonFooter label="Write the Alphabet" onNext={onNext} />
    </section>
  )
}

function WriteLesson({ onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Alphabets & sounds · 04" title="Write the Alphabet" ja="画面をタップするだけでなく、紙に書いて文字の形を手と目に覚えさせます。" />
      <div className="media-layout">
        <VideoReference videoId="7yMlDJg2IZw" label="YouTube reference" title="Learn to Write the ABCs" source="Bri Reads · handwriting practice" />
        <div className="writing-panel"><h3>Paper practice</h3><p>鉛筆、消しゴム、罫線のあるノートを用意してください。</p><ol><li>大文字と小文字を数回なぞる</li><li>見本を隠して、自分で書く</li><li>その文字で始まる短い単語を3つ書く</li></ol><a href="https://teachprints.com/letter-tracing-worksheets/" target="_blank" rel="noreferrer">Free tracing sheets ↗</a></div>
      </div>
      <LessonFooter label="Letters & sounds" onNext={onNext} />
    </section>
  )
}

function SoundsLesson({ onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle eyebrow="Side note · letters versus sounds" title="26 letters. About 44 sounds." ja="IPAを暗記する必要はありません。文字と音がいつも一対一ではないことを、ここで知っておきましょう。" />
      <div className="sound-explainer"><div className="comparison-table"><div><strong>System</strong><strong>Represents</strong><strong>Example</strong></div><div><span>Alphabet</span><span>Letters</span><span>“a”, “b”, “c”</span></div><div><span>IPA</span><span>Sounds</span><span>/æ/, /b/, /k/</span></div></div><div className="sound-note"><h3>Awareness, not mastery</h3><p>同じ文字でも、単語によって音が変わることがあります。辞書でIPAを見たときに「発音を表す記号」だと分かれば、今は十分です。</p></div></div>
      <div className="compact-video"><VideoReference videoId="z5nWOwM5HsI" label="YouTube reference" title="Learn all 44 British English sounds" source="English for Traveling · IPA overview" /><div><h3>One viewing is enough for now.</h3><p>すべての記号を覚えようとせず、英語には文字より多くの音があることを耳で確認します。</p></div></div>
      <LessonFooter label="Tongue Twisters" onNext={onNext} />
    </section>
  )
}

function TongueIntro({ onPractice }) {
  return (
    <section className="lesson-page tongue-intro-page">
      <LessonTitle eyebrow="Tongue twisters · introduction" title="Train transitions, not speed." ja="早口で言う競争ではありません。英語の音から次の音へ、正確に切り替える練習です。" />
      <div className="tongue-intro-layout"><div className="set-summary"><div><b>12</b><span>classic lines</span></div><div><b>4</b><span>training groups</span></div><div><b>1</b><span>repeatable loop</span></div><p>会話練習の代わりではありません。選んだ音の動きを、繰り返せる形にします。</p></div><div className="group-preview">{tongueGroups.map((group) => <article key={group.id}><b>{group.number}</b><div><h3>{group.title}</h3><p>{group.ja}</p><span>3 classics</span></div></article>)}</div></div>
      <div className="lesson-footer"><span>Learn complete · 練習はPracticeから始まります</span><PrimaryButton onClick={onPractice}>Open the classic set</PrimaryButton></div>
    </section>
  )
}

function LessonFooter({ label, onNext }) {
  return <div className="lesson-footer"><span>Accuracy before speed.</span><PrimaryButton onClick={onNext}>{label}</PrimaryButton></div>
}

function LearnMode({ activeStep, setActiveStep, openPractice, courseLayer, setCourseLayer }) {
  const index = learnSteps.findIndex((step) => step.id === activeStep)
  const next = () => setActiveStep(learnSteps[Math.min(index + 1, learnSteps.length - 1)].id)
  const content = {
    orientation: <Orientation onNext={next} />,
    letters: <LettersLesson onNext={next} />,
    hear: <HearLesson onNext={next} />,
    write: <WriteLesson onNext={next} />,
    sounds: <SoundsLesson onNext={next} />,
    'tongue-intro': <TongueIntro onPractice={openPractice} />,
  }[activeStep]

  return <div className="app-body"><LessonSidebar active={activeStep} onSelect={setActiveStep} courseLayer={courseLayer} setCourseLayer={setCourseLayer} /><main className="lesson-main">{content}</main></div>
}

function PracticeSidebar({ view, setView, selected, selectTwister, onSelectGroup, pendingGroupId, activeGroupId, courseLayer, setCourseLayer }) {
  return (
    <aside className="practice-sidebar">
      <LayerNav courseLayer={courseLayer} setCourseLayer={setCourseLayer} />
      <div className="sidebar-heading"><small>Practice mode</small><h2>Tongue Twisters</h2><p>12本の定番セット</p></div>
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

function TwisterLibrary({ onSelect }) {
  return (
    <section className="practice-page library-page">
      <LessonTitle eyebrow="Classic set · 12 drills" title="12 classics. Nothing random." ja="定番の言い回しだけを、発音の目的別に整理しました。最初はゆっくり、明瞭さを保てたら自然な速さへ。" />
      <div className="twister-group-grid">{tongueGroups.map((group) => <article id={`group-${group.id}`} className="twister-group" key={group.id}><header><b>{group.number}</b><div><h2>{group.title}</h2><p>{group.ja}</p></div></header><div>{group.items.map((item) => <button key={item.id} type="button" onClick={() => onSelect({ ...item, groupId: group.id, groupTitle: group.title })}><span>{item.target}</span><strong>{item.phrase}</strong><small>{item.duration}</small><ArrowIcon /></button>)}</div></article>)}</div>
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

function TwisterDrill({ item }) {
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
    </section>
  )
}

function RoutinePage({ onStart }) {
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
      <div className="lesson-footer"><span>Suggested, not required · 同じ週を繰り返しても大丈夫です</span><PrimaryButton onClick={onStart}>Start with Red lorry</PrimaryButton></div>
    </section>
  )
}

function PracticeMode({ selected, setSelected, view, setView, courseLayer, setCourseLayer }) {
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
        courseLayer={courseLayer}
        setCourseLayer={setCourseLayer}
      />
      <main className="lesson-main practice-main">
        {selected ? (
          <TwisterDrill item={selected} />
        ) : view === 'routine' ? (
          <RoutinePage onStart={() => selectTwister(allTwisters[0])} />
        ) : (
          <TwisterLibrary onSelect={selectTwister} />
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

  // Everyday Fluency state
  const [everydayModuleId, setEverydayModuleId] = useState('icebreakers')
  const [everydayLessonId, setEverydayLessonId] = useState('check-in')
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

  const selectEverydayModule = (id) => {
    setEverydayModuleId(id)
    const mod = everydayModules.find((m) => m.id === id)
    if (mod && mod.lessons) {
      setEverydayLessonId(mod.lessons[0].id)
      setEverydayLearnStep('context')
      setEverydayPracticeStep('substitute')
    }
  }

  const selectEverydayLesson = (id) => {
    setEverydayLessonId(id)
    setEverydayLearnStep('context')
    setEverydayPracticeStep('substitute')
  }

  const currentEverydayModule = everydayModules.find((m) => m.id === everydayModuleId)
  const currentEverydayLesson = currentEverydayModule?.lessons?.find((l) => l.id === everydayLessonId) || currentEverydayModule?.lessons?.[0]

  return (
    <div className="course-app">
      <AppHeader mode={mode} setMode={changeMode} onHome={onHome} onProfileClick={showProfileNotice} />
      {courseLayer === 'foundation' ? (
        mode === 'learn' ? (
          <LearnMode activeStep={activeStep} setActiveStep={setActiveStep} openPractice={openPractice} courseLayer={courseLayer} setCourseLayer={setCourseLayer} />
        ) : (
          <PracticeMode selected={selected} setSelected={setSelected} view={practiceView} setView={setPracticeView} courseLayer={courseLayer} setCourseLayer={setCourseLayer} />
        )
      ) : (
        <div className="app-body">
          <EverydaySidebar
            activeModuleId={everydayModuleId}
            onSelectModule={selectEverydayModule}
            activeLessonId={everydayLessonId}
            onSelectLesson={selectEverydayLesson}
            courseLayer={courseLayer}
            setCourseLayer={setCourseLayer}
            LayerNav={LayerNav}
          />
          <main className="lesson-main">
            {currentEverydayModule?.status === 'coming_soon' ? (
              <EverydayOverviewView
                modules={everydayModules}
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
