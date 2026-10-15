import { useLanguage } from './Language'
// Existing foundation lessons, preserved and loaded independently of the old course app.
import { Fragment, useEffect, useRef, useState } from 'react'
import { allTwisters, alphabet } from '../data'
import { orientationSections } from '../orientationContent'
import { howItWorksSections } from '../howItWorksContent'
import { Heading } from './components'

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
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
)

const PlayIcon = ({ pause = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {pause ? (
      <>
        <path d="M8 6v12M16 6v12" />
      </>
    ) : (
      <path d="m9 6 9 6-9 6Z" />
    )}
  </svg>
)

function PrimaryButton({ children, onClick, className = '', disabled = false }) {
  return (
    <button
      className={`primary-button ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <ArrowIcon />
    </button>
  )
}

function LessonTitle({ eyebrow, title, ja }) {
  return <Heading eyebrow={eyebrow} title={title} ja={ja} />
}

const studyTerminology = (text) => text?.replace(/\bLearn\b/g, 'Study')

// Keep the original book intact; describe the navigation used by this web edition.
const webHowItWorksSections = howItWorksSections.map((section) => {
  if (section.id === 'how-two-by-two')
    return {
      ...section,
      title: '学習の道順と、2つのモード',
      subtitle: '学び方を知り、基礎を確かめ、会話へ',
      paragraphs: [
        '学習マップは、Orientation（はじめに）→ Foundations（基礎）→ Social Fluency（日常会話）の順番です。はじめに学ぶ理由と進め方を知り、文字と音を確かめ、それから会話へ進みます。知っているところは飛ばしても、必要なところへ戻っても大丈夫です。',
        section.paragraphs[1],
      ],
      items: [
        'オリエンテーション（はじめに） — 英語を学ぶ理由と、Articoの進め方を知ります。',
        ...section.items,
      ],
    }
  if (section.id === 'how-foundation')
    return { ...section, title: '基礎：文字と音、体のトレーニング' }
  if (section.id === 'how-social-fluency') return { ...section, title: '日常会話：生きたやりとり' }
  if (section.id === 'how-audio')
    return {
      ...section,
      paragraphs: [
        'このコースでは、聞くための自然な音声と、声に出して練習するための音声を分けて使います。音声は現在、準備中です。',
        ...section.paragraphs.slice(1),
      ],
    }
  return section
})

function TheoryBookLesson({
  onPrevious,
  previousLabel,
  onNext,
  activeSectionId,
  eyebrow,
  title,
  ja,
  sections,
  closingTitle = '理解したら、次は口を動かします。',
  closingCopy = 'ここで覚えるのは答えではありません。あなたが英語を学ぶ理由と、これからの学び方の地図です。',
  footerLabel,
  footerNote,
}) {
  const outline = (
    <nav aria-label="In this lesson">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => document.getElementById(section.id)?.scrollIntoView({ block: 'start' })}
        >
          <span>{section.number}</span>
          <span lang="ja">{studyTerminology(section.title)}</span>
        </button>
      ))}
    </nav>
  )
  return (
    <section className="lesson-page orientation-page">
      <LessonTitle eyebrow={eyebrow} title={title} ja={ja} />
      <div className="aw-reader-grid">
        <aside className="aw-reader-outline aw-theory-outline">
          <div className="aw-theory-desktop-outline">
            <p className="aw-eyebrow" lang="en">
              IN THIS LESSON
            </p>
            {outline}
          </div>
          <details className="aw-theory-mobile-outline">
            <summary>
              In this lesson <span lang="ja">目次</span>
            </summary>
            {outline}
          </details>
        </aside>
        <div className="orientation-reader">
          {sections.map((section, index) => (
            <article
              className={`orientation-section ${activeSectionId === section.id ? 'is-active' : ''}`}
              id={section.id}
              key={section.id}
            >
              <header className="orientation-section-header">
                <span>{section.number}</span>
                <div>
                  <small>{index === 0 ? 'はじめに' : `セクション ${section.number}`}</small>
                  <h2>{studyTerminology(index === 0 ? section.subtitle : section.title)}</h2>
                  <p>{studyTerminology(index === 0 ? section.title : section.subtitle)}</p>
                </div>
              </header>
              <div className="orientation-section-body">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{studyTerminology(paragraph)}</p>
                ))}
                {section.items && (
                  <ul className="theory-section-list">
                    {section.items.map((item) => (
                      <li key={item}>{studyTerminology(item)}</li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <aside className="orientation-callout">
                    <strong>{section.callout.label}</strong>
                    <p>{studyTerminology(section.callout.text)}</p>
                  </aside>
                )}
                {section.emphasis && (
                  <p className="orientation-emphasis">{studyTerminology(section.emphasis)}</p>
                )}
              </div>
            </article>
          ))}
          <div className="orientation-closing">
            <strong>{closingTitle}</strong>
            <p>{closingCopy}</p>
          </div>
        </div>
      </div>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        label={footerLabel}
        note={footerNote}
        onNext={onNext}
      />
    </section>
  )
}

export function Orientation({ onPrevious, previousLabel, onNext, activeSectionId }) {
  return (
    <TheoryBookLesson
      onPrevious={onPrevious}
      previousLabel={previousLabel}
      onNext={onNext}
      activeSectionId={activeSectionId}
      eyebrow="ORIENTATION / LESSON 01"
      title="Why learn a language?"
      ja="英語を学ぶ前に、言葉と人間、そしてあなた自身の理由を考えます。"
      sections={orientationSections}
      closingTitle="理解したら、次は学び方を選びます。"
      closingCopy="ここで覚えるのは答えではありません。あなたが英語を学ぶ理由と、これからの学び方の地図です。"
      footerLabel="How Artico works"
      footerNote="急がず、全体の地図をつかみましょう。"
    />
  )
}

export function HowArticoWorksLesson({ onPrevious, previousLabel, onNext, activeSectionId }) {
  return (
    <TheoryBookLesson
      onPrevious={onPrevious}
      previousLabel={previousLabel}
      onNext={onNext}
      activeSectionId={activeSectionId}
      eyebrow="ORIENTATION / LESSON 02"
      title="How Artico works"
      ja="あなたの現在地に合わせて、StudyとPracticeをどう使うかを案内します。"
      sections={webHowItWorksSections}
      closingTitle="地図が見えたら、最初の一歩へ。"
      closingCopy="基礎を確認しながら、今日のあなたに必要な会話から始めましょう。Articoは、理解と練習を何度でも行き来できます。"
      footerLabel="Meet the 26 letters"
      footerNote="次は、英語の最小単位へ。"
    />
  )
}

export function LettersLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page letters-page">
      <LessonTitle
        eyebrow="FOUNDATIONS / LESSON 01"
        title="Meet the 26 letters"
        ja="英語のスタートラインへ。26個の文字と、大文字・小文字の形に出会います。"
      />
      <div className="letters-layout">
        <div className="letters-copy" id="theory-letters-0">
          <h2>英語のスタートラインへ、ようこそ！</h2>
          <p>
            あなたが今までに聞いたことがある英語の言葉はすべて、たった<strong>26個の文字</strong>
            からできています。それだけです。26個の記号があり、それぞれ大文字と小文字という2つの形があります。
          </p>
          <p>
            これらの文字は、イギリスで生まれたわけではありません。
            <strong>旅をしてきたのです。</strong>{' '}
            英語のアルファベットはラテン語から来て、ラテン語はギリシャ語から来て、さらにそれは何千年も前の古代フェニキアの商人たちから来ました。つまり、あなたが文字を書いたり発音したりするたびに、
            <strong>3000年以上も受け継がれてきた歴史の一部</strong>を使っていることになります。
          </p>
          <p>
            文字を<strong>レンガ</strong>
            のように考えてみてください。1つだけでは小さくてシンプルです。でも、組み合わせることで、何でも作ることができます。名前、冗談、歌、ストーリー、そして新しい世界まで作ることができます。
          </p>
          <p>
            今日は、英語の26個の文字から始めましょう。見て、聞いて、声に出して、
            <strong>口が自然に覚えるまで体で感じてみてください。</strong>{' '}
            この音を自分のものにすれば、これからの英語はずっと簡単になります。
          </p>
          <strong className="letters-closing" id="theory-letters-2">
            それでは、まずはすべての文字に出会いましょう！
          </strong>
        </div>
        <div className="alphabet-board" id="theory-letters-1">
          <section className="alphabet-case-section" aria-labelledby="uppercase-title">
            <h3 id="uppercase-title">
              uppercase <span>(capital) letters</span>
            </h3>
            <div className="alphabet-case-grid">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  aria-label={`Say uppercase ${letter}`}
                  onClick={() => speakWithBrowser(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </section>
          <div className="alphabet-case-divider" />
          <section className="alphabet-case-section" aria-labelledby="lowercase-title">
            <h3 id="lowercase-title">
              lowercase <span>(small) letters</span>
            </h3>
            <div className="alphabet-case-grid">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  aria-label={`Say lowercase ${letter.toLowerCase()}`}
                  onClick={() => speakWithBrowser(letter.toLowerCase())}
                >
                  {letter.toLowerCase()}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        label="Hear the alphabet"
        onNext={onNext}
      />
    </section>
  )
}

function formatVideoTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

export function YouTubeLessonPlayer({
  videoId,
  title,
  credit,
  startAt = 0,
  endAt = 0,
  loopSegment = false,
  autoplay = true,
}) {
  const { t, language } = useLanguage()
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
      if (data?.event === 'infoDelivery' && Number(data.info?.currentTime) >= endAt - 0.25)
        restartSegment()
    }

    iframe.addEventListener('load', handleLoad)
    window.addEventListener('message', handleMessage)

    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45
              if (isVisible && autoplay) playWhenReady()
              else sendCommand('pauseVideo')
            },
            { threshold: [0, 0.45, 0.8] },
          )
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

  const origin =
    typeof window === 'undefined' ? '' : `&origin=${encodeURIComponent(window.location.origin)}`
  const start = startAt > 0 ? `&start=${startAt}` : ''
  const end = endAt > startAt ? `&end=${endAt}` : ''
  const source = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}${start}${end}&rel=0&playsinline=1&hl=${language}&modestbranding=1&enablejsapi=1${origin}`
  const segmentLabel =
    endAt > startAt
      ? `${formatVideoTime(startAt)}–${formatVideoTime(endAt)} loop · Pauses off screen`
      : autoplay
        ? `${startAt > 0 ? `${startAt} seconds · ` : ''}Pauses off screen`
        : t("Press play · Pauses off screen")

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

export function HearLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page media-page">
      <LessonTitle
        eyebrow="FOUNDATIONS / LESSON 02"
        title="Hear the alphabet"
        ja="歌でアルファベットを覚えましょう。文字の順番と名前を、音楽に合わせて体に入れます。"
      />
      <div className="alphabet-song-layout">
        <div className="alphabet-song-main">
          <article className="alphabet-song-intro" id="theory-hear-0">
            <h2>歌でアルファベットを覚えましょう</h2>
            <p>
              英語のアルファベットを覚える一番簡単で楽しい方法の1つは、<strong>「ABCの歌」</strong>
              です。たくさんの子どもたちが、最初にこの歌を聞いて、真似して、一緒に歌うことで、アルファベットを覚えます。
            </p>
            <p>
              インターネットにはたくさんのアルファベットの歌がありますが、初心者にとってシンプルで分かりやすく、真似しやすいこの動画を選びました。
            </p>
            <p className="alphabet-song-focus">
              前のレッスンでは、大文字と小文字を見分ける練習をしました。今回の目標は、アルファベット全体に慣れることです。特に、
              <strong>文字の順番と発音（音）</strong>を意識してみましょう。
            </p>
          </article>
          <div id="theory-hear-1">
            <YouTubeLessonPlayer
              videoId="MgmIHtp-ZQM"
              title="The Alphabet Song | Lower Case Letters | Super Simple ABCs"
              credit="動画：Super Simple ABCs / Super Simple Songs"
              startAt={20}
            />
          </div>
          <article className="alphabet-song-after" id="theory-hear-3">
            <strong>すぐに全部を覚える必要はありません。</strong>
            <p>
              まずは動画を再生して、よく聞き、できるだけ一緒に歌ってみましょう。何度も戻ってくるうちに、文字の順番と名前が少しずつ自然になります。
            </p>
          </article>
        </div>
        <aside className="alphabet-song-guide" id="theory-hear-2">
          <h3>やってみること</h3>
          <ol>
            <li>
              <b>01</b>
              <span>
                <strong>まず、目で追う</strong>
                <small>動画を再生して、アルファベットの文字を目で追いましょう。</small>
              </span>
            </li>
            <li>
              <b>02</b>
              <span>
                <strong>一緒に歌う</strong>
                <small>
                  歌を何度も聞いて、一緒に歌う練習をしましょう。必要なだけ繰り返してください。
                </small>
              </span>
            </li>
            <li>
              <b>03</b>
              <span>
                <strong>AからZまで思い出す</strong>
                <small>
                  練習を続けると、文字を見分け、名前を発音し、AからZまで歌えるようになります。
                </small>
              </span>
            </li>
          </ol>
          <div className="alphabet-song-callout">
            <strong>焦らず、楽しんで進めてください。</strong>
            <p>
              このレッスンは完全な初心者のために作られています。音楽に合わせて何度も繰り返すことで、アルファベットがずっと覚えやすくなります。
            </p>
          </div>
        </aside>
      </div>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        label="Write the alphabet"
        onNext={onNext}
      />
    </section>
  )
}

export function WriteLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page writing-lesson-page">
      <LessonTitle
        eyebrow="FOUNDATIONS / LESSON 03"
        title="Write the alphabet"
        ja="アルファベットを書いてみましょう。文字の形を、目だけでなく手にも覚えさせます。"
      />
      <div className="writing-lesson-layout">
        <div className="writing-lesson-main">
          <article className="writing-lesson-card writing-intro-card" id="theory-write-0">
            <h2>アルファベットを書いてみましょう</h2>
            <p>
              「ABCの歌」を聞いたり歌ったりすることは、アルファベットに慣れるためのとても良い方法です。でも、聞くだけでは足りないことがよくあります。文字を本当に自分のものにするために、手で書いて練習してみましょう。
            </p>
            <p>
              実際に書くことで、一つひとつの文字をもっと丁寧に見ることができます。文字の形、書く方向、線を引く順番に気づけます。これにより、アルファベットを覚えるのが早くなり、次に文字を見たときに、もっと親しみを感じられるようになります。
            </p>
            <p>
              今の段階では、美しい字を書く練習をしているわけではありません。英語の文字の基本的な形と、普段どのように書かれているかを学ぶだけで十分です。
            </p>
          </article>

          <article className="writing-lesson-card writing-method-card" id="theory-write-2">
            <div className="writing-section-heading">
              <span>02</span>
              <div>
                <small>練習の方法</small>
                <h2>早く書こうとしなくても大丈夫です。</h2>
              </div>
            </div>
            <p>
              まずは書き方の動画を見て、それぞれの文字がどのように作られているかを確認しましょう。文字がどこから始まるか、線を引く方向に注目してください。
            </p>
            <div className="writing-video-wrap">
              <YouTubeLessonPlayer
                videoId="DnNqoEXoGdg"
                title="How to Write Letters A-Z | Learn to Write the ABCs"
                credit="動画：DorufaVSArt / YouTube"
              />
            </div>
            <p>その後、紙の上で練習します。次のようなシンプルな順番で進めてみましょう。</p>
            <ol className="writing-step-list">
              <li>
                <b>01</b>
                <span>文字を何回かなぞって書く。</span>
              </li>
              <li>
                <b>02</b>
                <span>見本を見ずに、自分で何回か書いてみる。</span>
              </li>
              <li>
                <b>03</b>
                <span>大文字と小文字の両方を練習する。</span>
              </li>
              <li>
                <b>04</b>
                <span>慣れてきたら、その文字から始まるシンプルな言葉を書く。</span>
              </li>
            </ol>
            <div className="writing-example">
              <small>例：A と a を練習したら</small>
              <strong>apple — ant — animal</strong>
            </div>
            <p>
              完璧を目指さなくても大丈夫です。最初は書くのが遅かったり、線の太さがバラバラだったりするかもしれません。それは完全に普通のことです。文字をはっきりと書き、自分が何を書いているかを意識することに集中しましょう。
            </p>
          </article>

          <article className="writing-lesson-card writing-names-card" id="theory-write-3">
            <h2>練習：知っている名前を書いてみよう</h2>
            <p>
              アルファベットの基本的な形がわかったら、今度はそれを実際に使ってみましょう。ただ「A,
              B, C, D...」と練習する代わりに、あなたにとって身近な名前を書きます。
            </p>
            <div className="writing-name-grid">
              <section>
                <span>01</span>
                <h3>自分の名前を書く</h3>
                <p>
                  まずは自分の名前から始めましょう。英語で名前を書くとき、通常、名前の最初の文字は大文字（頭文字）で書きます。
                </p>
                <div className="writing-name-example">
                  <small>例</small>
                  <strong>Taro Yamada</strong>
                  <strong>Hanako Suzuki</strong>
                  <em>Taro → T – A – R – O</em>
                </div>
                <p>
                  日本語では伝統的に名字が先ですが、多くの英語圏では名前が先、名字が後に来ます。今は両方のスタイルを知っていれば十分です。
                </p>
              </section>
              <section>
                <span>02</span>
                <h3>家族の名前を書く</h3>
                <p>
                  家族のことを思い浮かべて、名前を書いてみましょう。最初の文字を大文字にすることを忘れないでください。
                </p>
                <div className="writing-word-list">
                  <span>mother</span>
                  <span>father</span>
                  <span>brother</span>
                  <span>sister</span>
                  <span>grandmother</span>
                  <span>grandfather</span>
                </div>
                <p>書いた後は、それぞれの名前を声に出し、1文字ずつスペルアウトします。</p>
              </section>
              <section>
                <span>03</span>
                <h3>友達の名前を書く</h3>
                <p>
                  親友、クラスメイト、同僚など、あなたがよく知っている人の名前をいくつか書いてみましょう。
                </p>
                <p>同じように、まず名前を書いてから、声に出して1文字ずつ発音してみます。</p>
              </section>
            </div>
          </article>

          <article className="writing-lesson-card writing-purpose-card" id="theory-write-4">
            <h2>なぜこの練習が役に立つのか</h2>
            <p>
              アルファベットの文字だけを練習するのも役に立ちますが、身近な名前を使うことで、文字がとても意味のあるものに変わります。
            </p>
            <p>
              自分の名前は、新しい言葉で書く最も大切な言葉の一つです。書類、申請書、予約、自己紹介、アカウント作成など、多くの場所で自分の名前を書くことになります。
            </p>
            <p>
              この練習が終わる頃には、単にアルファベットを覚える以上のことができているはずです。あなたの人生につながる「本物の言葉」を書くために、英語の文字を使い始めているのです。
            </p>
            <div className="writing-assignment">
              <h3>あなたの課題</h3>
              <p>次のものを書いてみましょう。</p>
              <ul>
                <li>自分の名前</li>
                <li>家族の名前</li>
                <li>3〜5人の友達や知人の名前</li>
              </ul>
              <p>
                それぞれの名前を書いた後、1文字ずつ声に出して発音してください。目標はシンプルです。
              </p>
              <strong>書く。読む。発音する。</strong>
            </div>
          </article>

          <article className="writing-lesson-card writing-finish-card" id="theory-write-5">
            <h2>筆記体について</h2>
            <p>
              英語の書き方には、文字がつながって流れるように書く「筆記体」というスタイルもあります。知っておくことは役に立ちますが、この初心者向けコースでは筆記体の練習は行いません。
            </p>
            <p>
              今は、本、ウェブサイト、看板、アプリ、教材などで最もよく目にする、通常の「ブロック体（プリント体）」に集中しましょう。普通の書き方に慣れてから、興味があれば筆記体や英語のカリグラフィーに挑戦してください。
            </p>
            <h2>焦らず進めましょう</h2>
            <p>
              大人の学習者は、すでに別の言葉の書き方を知っているため、子どもより早く進めることがあります。定期的に練習すれば、数日または1週間ほどで基本的なアルファベットに慣れることもできますが、急ぐ必要はありません。
            </p>
            <p>
              大切なのは、しっかりとした基礎を作ることです。鉛筆とノートを用意して、動画を見ながら練習問題に挑戦し、アルファベットを1文字ずつ自分のものにしていきましょう。
            </p>
          </article>
        </div>

        <aside className="writing-lesson-aside">
          <article className="writing-supplies-card" id="theory-write-1">
            <small>まず、これだけ</small>
            <h2>準備するもの</h2>
            <p>必要なものは、とてもシンプルです。</p>
            <ul className="writing-supplies-list">
              <li>鉛筆</li>
              <li>消しゴム</li>
              <li>鉛筆削り</li>
              <li>英語の練習用ノート（または線が入ったノート）</li>
            </ul>
            <p>
              練習中は、ペンよりも鉛筆がおすすめです。間違えても簡単に直すことができるからです。
            </p>
            <p>
              できれば、初心者向けのガイド線が入ったノートを使いましょう。無料でプリントできる練習シートを使っても構いません。
            </p>
            <a
              href="https://teachprints.com/letter-tracing-worksheets/"
              target="_blank"
              rel="noreferrer"
            >
              無料の練習シートを見る ↗
            </a>
          </article>
          <div className="writing-paper-note">
            <strong>紙と手で練習する</strong>
            <p>
              キーボード入力や画面のタップは、手で書く練習の代わりにはなりません。今日だけは、紙と鉛筆を使ってください。
            </p>
          </div>
        </aside>
      </div>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        label="Letters & sounds"
        onNext={onNext}
      />
    </section>
  )
}

export function SoundsLesson({ onPrevious, previousLabel, onNext }) {
  return (
    <section className="lesson-page sound-lesson-page">
      <LessonTitle
        eyebrow="FOUNDATIONS / LESSON 04"
        title="Letters & sounds"
        ja="英語には26個の文字があります。でも、話すときの音はそれよりも多くあります。"
      />
      <div className="sound-lesson-layout">
        <div className="sound-lesson-main">
          <article className="sound-lesson-card sound-intro-card" id="theory-sounds-0">
            <div className="sound-section-heading">
              <span>01</span>
              <div>
                <small>まず知っておくこと</small>
                <h2>文字と音は同じではありません</h2>
              </div>
            </div>
            <p>
              ここまでで、あなたは英語の26個のアルファベットを学びました。文字の形、書き方、そして名前の言い方が分かりましたね。ここで、もう1つ知っておくべき大切なアイデアがあります。
            </p>
            <p>
              英語の文字は26個ですが、話すときの音は文字の数よりもたくさんあります。話し方（アクセント）や音の数え方によって違いますが、英語にはよく使われる音が
              <strong>約44個</strong>あると言われています。これを<strong>音素（phoneme）</strong>
              と呼びます。
            </p>
            <div className="sound-count-callout">
              <div>
                <strong>26</strong>
                <span>
                  letters
                  <br />
                  書くための文字
                </span>
              </div>
              <b>≠</b>
              <div>
                <strong>about 44</strong>
                <span>
                  sounds
                  <br />
                  話すときの音
                </span>
              </div>
            </div>
            <p>
              これが、英語の発音がときどき難しく、混乱しやすい理由の1つです。今は数字を暗記しなくても大丈夫です。「文字の数と音の数は同じではない」と知っておきましょう。
            </p>
          </article>

          <article className="sound-lesson-card sound-spelling-card" id="theory-sounds-1">
            <div className="sound-section-heading">
              <span>02</span>
              <div>
                <small>つづりを見たとき</small>
                <h2>なぜ、英語は見た目どおりに発音しないのでしょうか？</h2>
              </div>
            </div>
            <p>
              いくつかの言語では、文字と発音の関係がとても分かりやすく、予想しやすいことがあります。しかし、英語では同じ文字でも単語によって違う音になったり、いくつかの文字が組み合わさって1つの音になったりします。文字は書かれているのに、まったく発音されないこともあります。
            </p>
            <div className="sound-example-grid">
              <div>
                <strong>knife</strong>
                <span>kは書かれていますが、ふつうは発音しません。</span>
                <em>silent k</em>
              </div>
              <div>
                <strong>knight</strong>
                <span>ここでもkは音になりません。つづりと音が一致しない例です。</span>
                <em>silent letter</em>
              </div>
            </div>
            <p className="sound-emphasis">
              英語のつづりと発音は、いつも1対1で同じになるわけではありません。このことを今知っておくだけで、これから先の勉強がずっと簡単になります。
            </p>
          </article>

          <article className="sound-lesson-card sound-video-card" id="theory-sounds-2">
            <div className="sound-section-heading">
              <span>03</span>
              <div>
                <small>英語の音に出会う</small>
                <h2>まずは、聞いて気づくだけで十分です。</h2>
              </div>
            </div>
            <p>
              この段階では、英語の音をすべて暗記する必要はありません。難しい発音のルールを勉強する必要もありません。今はただ、そのような音があることを知って、注意して聞き始めるだけで大丈夫です。
            </p>
            <div className="sound-video-wrap">
              <YouTubeLessonPlayer
                videoId="JwTDPu2TE6k"
                title="Sounds of English Vowels and Consonants (with phonetic symbols)"
                credit="動画：YouTube（音声紹介）"
              />
            </div>
            <p>
              動画を見て、よく聞いて、聞こえた音を真似して声に出してみましょう。最初はうまくできなくても気にしないでください。目標は
              <strong>「慣れること」</strong>であり、「完璧にマスターすること」ではありません。
            </p>
          </article>
        </div>

        <aside className="sound-lesson-aside">
          <article className="sound-lesson-card sound-ipa-card" id="theory-sounds-3">
            <small>発音の地図</small>
            <h2>IPAって何ですか？</h2>
            <p>
              発音を学ぶとき、<strong>/æ/　/ʃ/　/θ/　/ŋ/</strong>
              のような不思議な記号を見ることがあります。これらは国際音声記号、ふつうは
              <strong>IPA</strong>と呼ばれるものです。
            </p>
            <p>
              ふつうのアルファベットは「書くために使う文字」を表します。一方で、IPAは「話すときに使う音」を表します。
            </p>
            <div className="ipa-table" role="table" aria-label="アルファベットとIPAの違い">
              <div role="row">
                <strong>システム</strong>
                <strong>表すもの</strong>
                <strong>例</strong>
              </div>
              <div role="row">
                <span>英語のアルファベット</span>
                <span>書くための文字</span>
                <span>a, b, c</span>
              </div>
              <div role="row">
                <span>IPA</span>
                <span>話すときの音</span>
                <span>/æ/, /b/, /k/</span>
              </div>
            </div>
            <p>
              IPAの便利なところは、つづりがややこしい単語でも、どのように発音されるかを正確に示してくれることです。
            </p>
          </article>
          <div className="sound-map-note" id="theory-sounds-4">
            <strong>IPAは「発音の地図」</strong>
            <p>
              今は地図のすべてを読めなくても大丈夫です。「この地図が存在する」と知っていれば十分です。
            </p>
            <div>
              <span>/kæt/</span>
              <small>cat の音</small>
            </div>
            <a href="https://www.ipachart.com" target="_blank" rel="noreferrer">
              インタラクティブなIPAチャートを見る ↗
            </a>
          </div>
        </aside>
      </div>

      <article className="sound-lesson-card sound-routine-card" id="theory-sounds-5">
        <div className="sound-section-heading">
          <span>04</span>
          <div>
            <small>今、何をすればいいですか？</small>
            <h2>難しく考えず、シンプルにいきましょう。</h2>
          </div>
        </div>
        <div className="sound-routine-grid">
          <div>
            <b>01</b>
            <strong>見る</strong>
            <span>英語の音の短い紹介動画を見る。</span>
          </div>
          <div>
            <b>02</b>
            <strong>聞く</strong>
            <span>それぞれの音を注意して聞く。</span>
          </div>
          <div>
            <b>03</b>
            <strong>真似する</strong>
            <span>聞こえた音を声に出してみる。</span>
          </div>
          <div>
            <b>04</b>
            <strong>戻る</strong>
            <span>練習用の歌や動画を何度か繰り返す。</span>
          </div>
        </div>
        <p className="sound-routine-close">
          IPAの記号を覚える心配はしなくて大丈夫です。今は、聞いて、気づいて、真似してみる。それだけで十分です。
        </p>
      </article>

      <article className="sound-reminder-card" id="theory-sounds-6">
        <strong>忘れないでください</strong>
        <p>
          26個の文字があるからといって、音が26個だけというわけではありません。英語は、比較的少ないアルファベットを使って、たくさんの話し言葉の音を表しています。
        </p>
        <b>聞いて、気づいて、真似してみる。</b>
        <span>進んでいくうちに、少しずつ詳しいことを学んでいきましょう。</span>
      </article>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        label="Why tongue twisters?"
        onNext={onNext}
      />
    </section>
  )
}

export function TheoryAudioSample({ phrase, target, src }) {
  const { t, language } = useLanguage()
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
    const updateProgress = () =>
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
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
    if (audio && src) {
      audio.currentTime = 0
      if (audio.paused) toggle()
    }
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
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className={`theory-audio-sample ${src ? '' : 'is-pending'}`}>
      {src && <audio ref={audioRef} src={src} preload="metadata" />}
      <div className="theory-audio-head">
        <button
          type="button"
          className="theory-audio-play"
          onClick={toggle}
          disabled={!src}
          aria-label={src ? t(playing ? 'Pause: {phrase}' : 'Listen to: {phrase}', { phrase }) : t('Audio not yet available: {phrase}', { phrase })}
        >
          <PlayIcon pause={playing} />
        </button>
        <div className="theory-audio-waveform" aria-hidden="true">
          {[
            20, 33, 47, 28, 55, 38, 64, 34, 50, 26, 43, 58, 31, 48, 37, 54, 29, 44, 22, 39, 52, 32,
            46, 26,
          ].map((height, index) => (
            <i key={index} style={{ height }} />
          ))}
        </div>
        <div className="theory-audio-times">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{duration ? formatTime(duration) : '--:--'}</span>
        </div>
      </div>
      <div className="theory-audio-track">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="theory-audio-controls">
        <button type="button" onClick={rewind} disabled={!src} aria-label={t('Replay')}>
          ↶ <span>{t('Replay')}</span>
        </button>
        <button
          type="button"
          onClick={cycleSpeed}
          disabled={!src}
          aria-label={t('Playback speed {speed}', { speed: speedLabel })}
        >
          {speedLabel}
        </button>
        <button
          type="button"
          className={looping ? 'active' : ''}
          onClick={toggleLoop}
          disabled={!src}
          aria-label={looping ? t("Turn loop off") : t("Turn loop on")}
          aria-pressed={looping}
        >
          ↻ <span>{t("Loop")}</span>
        </button>
        <small>{src ? t("Existing audio sample") : t("Recording coming soon")}</small>
      </div>
    </div>
  )
}

const tongueIntroGroups = [
  {
    id: 'priority',
    number: '01',
    title: '日本の学習者が優先して練習したい音の違い',
    intro: '多くの日本の学習者にとって、最初に身につけると便利な音の違いに焦点を当てます。',
    itemIds: ['red-lorry', 'seashells', 'free-throws'],
  },
  {
    id: 'consonants',
    number: '02',
    title: 'はっきりとした子音の音',
    intro: '言葉の最初や最後にある、はっきりとした子音を、余分な母音なしで出す練習です。',
    itemIds: ['peter-piper', 'big-black-bug', 'two-witches'],
  },
  {
    id: 'clusters',
    number: '03',
    title: '子音が連続する音',
    intro: '英語でよく起こる子音のかたまりを、分解せずにつなげる感覚に慣れます。',
    itemIds: ['ice-cream', 'slippery-snails', 'fresh-flesh'],
  },
  {
    id: 'rhythm',
    number: '04',
    title: 'リズムと音のつながり',
    intro: '個々の音だけでなく、英語の強弱と、音から音への自然な流れを感じます。',
    itemIds: ['betty-botter', 'woodchuck', 'unique-new-york'],
  },
]

export function TongueIntro({ onPrevious, previousLabel, onPractice }) {
  const findItem = (id) => allTwisters.find((item) => item.id === id)
  return (
    <section className="lesson-page tongue-intro-page">
      <LessonTitle
        eyebrow="FOUNDATIONS / LESSON 05"
        title="Why tongue twisters?"
        ja="音を理解したら、次は口を動かし、英語の音に慣れていきます。"
      />
      <div className="tongue-theory-reader">
        <article className="tongue-theory-card tongue-theory-intro" id="theory-tongue-intro-0">
          <div className="tongue-section-heading">
            <span>01</span>
            <div>
              <small>音の理解から、口のトレーニングへ</small>
              <h2>早口言葉で口をトレーニングしましょう！</h2>
            </div>
          </div>
          <p>
            これまでは「音を理解すること」について考えてきました。これからは、実際に「その音を出すための口のトレーニング」に進みましょう。そのための最も効果的な方法の一つが、
            <strong>早口言葉（tongue twister）</strong>です。
          </p>
          <p>
            早口言葉は、似ている音や難しい音が近くに並んでいる短いフレーズです。唇、舌、あご、そして息の出し方を細かく正確にコントロールする必要があるため、いわば
            <strong>口の小さな筋トレ</strong>のようなものです。
          </p>
          <p>
            俳優、歌手、スピーチをする人、アナウンサー、そして語学の学習者など、多くの人が、はっきり話すため、リズムやコントロールを良くするために使っています。
          </p>
        </article>

        <article className="tongue-theory-card tongue-japan-card" id="theory-tongue-intro-1">
          <div className="tongue-section-heading">
            <span>02</span>
            <div>
              <small>なぜ日本の学習者にとって大切なのか</small>
              <h2>耳と口が、音の違いに慣れるまで</h2>
            </div>
          </div>
          <p>
            日本語と英語では、音の作り方や整理の仕方が違います。そのため、英語を始めたばかりのとき、いくつかの音を正しく発音し分けるのが難しく感じることがあります。
          </p>
          <div className="tongue-minimal-pairs">
            <div>
              <strong>right / light</strong>
              <span>右・正しい / 光・軽い</span>
            </div>
            <div>
              <strong>road / load</strong>
              <span>道 / 荷物</span>
            </div>
            <div>
              <strong>rice / lice</strong>
              <span>お米 / シラミ</span>
            </div>
          </div>
          <p>
            最初は、これらの言葉が同じように聞こえたり、同じように感じられたりするかもしれません。でも、諦める必要はありません。耳と口が動きの違いに慣れるまで、少し時間が必要なだけです。
          </p>
          <div className="tongue-sound-strip">
            <strong>R / L</strong>
            <span>S / SH</span>
            <span>TH / F</span>
            <span>W / CH</span>
            <span>語尾の子音</span>
          </div>
        </article>

        <article className="tongue-theory-card tongue-purpose-card" id="theory-tongue-intro-2">
          <div className="tongue-section-heading">
            <span>03</span>
            <div>
              <small>目的は「覚えること」ではありません</small>
              <h2>あなたの口を、英語の動きに慣れさせる</h2>
            </div>
          </div>
          <p>
            何百個もの早口言葉を暗記する必要はありません。インターネットには何千個もの文があり、AIを使えばいくらでも作れます。しかし、たくさん練習すれば良いというわけではありません。
          </p>
          <p>
            このコースでは、日常的によく使われ、慣れておくと役に立つ発音パターンを集めた、少数の定番を選びました。面白い文を覚えることではなく、英語の音をスムーズに出せるようにすることが目的です。
          </p>
          <div className="tongue-listen-callout">
            <strong>まずは、聞き、気づき、音に慣れること。</strong>
            <span>具体的な練習方法は、この後のPracticeセクションで丁寧に説明します。</span>
          </div>
        </article>

        <article className="tongue-theory-card tongue-set-card" id="theory-tongue-intro-3">
          <div className="tongue-section-heading">
            <span>04</span>
            <div>
              <small>これから練習する早口言葉</small>
              <h2>4つのグループから、音を聞いてみましょう。</h2>
            </div>
          </div>
          <p className="tongue-set-lead">
            「破裂音」や「二重母音」といった専門用語を理解する必要はありません。まずは注目する音を意識して、各フレーズの音声サンプルを聞いてみましょう。
          </p>
          <div className="tongue-theory-groups">
            {tongueIntroGroups.map((group) => (
              <section className="tongue-theory-group" key={group.id}>
                <header>
                  <b>{group.number}</b>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.intro}</p>
                  </div>
                </header>
                <div className="tongue-theory-items">
                  {group.itemIds.map((itemId) => {
                    const item = findItem(itemId)
                    if (!item) return null
                    return (
                      <article className="tongue-theory-item" key={item.id}>
                        <div className="tongue-item-copy">
                          <span>{item.target}</span>
                          <strong>
                            <HighlightedPhrase item={item} />
                          </strong>
                          <p>{item.why}</p>
                        </div>
                        <TheoryAudioSample
                          phrase={item.phrase}
                          target={item.target}
                          src={`${import.meta.env.BASE_URL}audio/${item.id}.wav`}
                        />
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="tongue-theory-card tongue-listen-card" id="theory-tongue-intro-4">
          <div className="tongue-section-heading">
            <span>05</span>
            <div>
              <small>今は、聞くだけで大丈夫です</small>
              <h2>早く言う必要も、暗記する必要もありません。</h2>
            </div>
          </div>
          <p>
            このページで、早口言葉を完璧に言えるようになる必要はありません。これから練習していく音や口の動きを紹介するためのページです。
          </p>
          <div className="tongue-listen-steps">
            <div>
              <b>01</b>
              <span>文を読む</span>
            </div>
            <i>→</i>
            <div>
              <b>02</b>
              <span>音声を聞く</span>
            </div>
            <i>→</i>
            <div>
              <b>03</b>
              <span>音に集中する</span>
            </div>
            <i>→</i>
            <div>
              <b>04</b>
              <span>1〜2回試す</span>
            </div>
          </div>
          <p className="tongue-listen-finish">
            今はこれだけで十分です。本格的なステップ別トレーニングは、次のPracticeで行います。
          </p>
        </article>

        <article className="tongue-theory-card tongue-finish-card" id="theory-tongue-intro-5">
          <div className="tongue-section-heading">
            <span>06</span>
            <div>
              <small>最後に忘れないでください</small>
              <h2>早口言葉は、実用的な道具です。</h2>
            </div>
          </div>
          <p>
            早口言葉は、ただ「おかしな文を早く言うためのゲーム」ではありません。英語の音を思い通りにコントロールするための、とても実用的なツールです。
          </p>
          <div className="tongue-final-cues">
            <strong>音を聞きましょう。</strong>
            <strong>動きに気づきましょう。</strong>
            <strong>自分で少し試してみましょう。</strong>
          </div>
          <p>次のセクションで、本格的な練習を一緒に始めます。</p>
        </article>
        <div className="tongue-practice-transition" id="theory-tongue-intro-6">
          <strong>次は、LとRをひとつの文で。</strong>
          <span>音声を聞き、口の動きを一つずつ練習します。</span>
        </div>
      </div>
      <LessonFooter
        previousLabel={previousLabel}
        onPrevious={onPrevious}
        note="LとRの動きを知り、短い文で試してみましょう。"
        label="L & R, in rhythm."
        onNext={onPractice}
      />
    </section>
  )
}

function SecondaryButton({ children, onClick, disabled = false }) {
  return (
    <button className="secondary-button" type="button" onClick={onClick} disabled={disabled}>
      <span aria-hidden="true">←</span>
      {children}
    </button>
  )
}

function BilingualLessonAction({ direction, label }) {
  const isNext = direction === 'next'
  const fallback = isNext ? 'Next Lesson' : 'Previous Lesson'
  return (
    <>
      <span className="lesson-action-en" lang="en">
        {label || fallback}
      </span>
      <span className="lesson-action-ja" lang="ja">
        {isNext ? '次へ' : '前へ'}
      </span>
    </>
  )
}

function LessonFooter({
  previousLabel = 'Previous',
  onPrevious,
  label,
  note = 'Accuracy before speed.',
  onNext,
  nextDisabled = false,
  className = '',
}) {
  return (
    <div className={`lesson-footer ${className}`.trim()}>
      <span>{note}</span>
      <div className="lesson-footer-actions">
        <SecondaryButton onClick={onPrevious} disabled={!onPrevious}>
          <BilingualLessonAction
            direction="previous"
            label={previousLabel === 'Previous' ? 'Previous Lesson' : previousLabel}
          />
        </SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={nextDisabled || !onNext}>
          <BilingualLessonAction direction="next" label={label || 'Next Lesson'} />
        </PrimaryButton>
      </div>
    </div>
  )
}

const phraseHighlightRules = {
  'red-lorry': [
    { source: 'R', className: 'phrase-focus-red', caseSensitive: true },
    { source: 'l', className: 'phrase-focus-gold' },
  ],
  seashells: [
    { source: 'sh', className: 'phrase-focus-gold' },
    { source: 's', className: 'phrase-focus-red' },
  ],
  'free-throws': [
    { source: 'th', className: 'phrase-focus-red' },
    { source: 'f', className: 'phrase-focus-gold' },
  ],
  'peter-piper': [{ source: 'p', className: 'phrase-focus-red' }],
  'big-black-bug': [
    { source: 'b', className: 'phrase-focus-red' },
    { source: '[gkdrt](?=\\b)', className: 'phrase-focus-gold' },
  ],
  'two-witches': [
    { source: 'ch', className: 'phrase-focus-gold' },
    { source: 'w', className: 'phrase-focus-red' },
  ],
  'ice-cream': [{ source: 'scr', className: 'phrase-focus-red' }],
  'slippery-snails': [
    { source: 'sl', className: 'phrase-focus-red' },
    { source: 'sn', className: 'phrase-focus-gold' },
  ],
  'fresh-flesh': [
    { source: 'fr', className: 'phrase-focus-red' },
    { source: 'fl', className: 'phrase-focus-gold' },
  ],
  'betty-botter': [
    { source: 'b', className: 'phrase-focus-red' },
    { source: 't', className: 'phrase-focus-gold' },
  ],
  woodchuck: [
    { source: 'ch', className: 'phrase-focus-gold' },
    { source: 'w', className: 'phrase-focus-red' },
  ],
  'unique-new-york': [
    { source: 'u', className: 'phrase-focus-red' },
    { source: 'k', className: 'phrase-focus-gold' },
    { source: 'n', className: 'phrase-focus-gold' },
  ],
}

function HighlightedPhrase({ item, phrase = item.phrase }) {
  const rules = phraseHighlightRules[item.id]
  if (!rules) return <span>{phrase}</span>
  const matcher = new RegExp(`(${rules.map((rule) => rule.source).join('|')})`, 'gi')
  return (
    <span>
      {phrase.split(matcher).map((part, index) => {
        const rule = rules.find((candidate) => {
          const matches = new RegExp(`^${candidate.source}$`, 'i').test(part)
          return matches && (!candidate.caseSensitive || part === candidate.source)
        })
        return rule ? (
          <b className={rule.className} key={`${part}-${index}`}>
            {part}
          </b>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        )
      })}
    </span>
  )
}
