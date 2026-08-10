import { useEffect, useState } from 'react'
import { socialFluencyChapterCount } from './socialFluencyCurriculum'
import { SourceBookLearnView, SourceBookPracticeView } from './sourceBookViews'

export function EverydaySidebar({ activeModuleId, onSelectModule, activeLessonId, onSelectLesson, curriculum, CurriculumNav }) {
  return (
    <aside className="everyday-sidebar">
      {CurriculumNav && <CurriculumNav {...curriculum} activeEverydayModuleId={activeModuleId} onSelectEverydayModule={onSelectModule} activeEverydayLessonId={activeLessonId} onSelectEverydayLesson={onSelectLesson} />}
      <div className="sidebar-note"><small>Social Fluency</small><strong>人とつながる英会話</strong><span>96章の場面と理論を、理解してから声に出し、自分の状況に置き換えます。</span></div>
    </aside>
  )
}

function RegisterChip({ children, tone = 'neutral' }) {
  return <span className={`greetings-register-chip greetings-register-chip-${tone}`}>{children}</span>
}

function GreetingSceneImage({ src, alt = '' }) {
  return (
    <div className="greetings-scene-image">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function GreetingPhraseCard({ item, speakWithBrowser, PlayIcon }) {
  return (
    <article className="greeting-phrase-card">
      <div className="greeting-phrase-copy">
        <div className="greeting-phrase-topline">
          <RegisterChip tone={item.register}>{item.register}</RegisterChip>
          <span className="greeting-phrase-context">{item.context}</span>
        </div>
        <h3>{item.phrase}</h3>
        <p>{item.meaning}</p>
      </div>
      <button
        type="button"
        className="greeting-play-button"
        aria-label={`Listen to ${item.phrase}`}
        onClick={() => speakWithBrowser(item.phrase)}
      >
        <PlayIcon />
      </button>
    </article>
  )
}

function SocialSignalStrip() {
  return (
    <div className="greetings-signal-strip" aria-label="What a greeting signals">
      {[
        ['01', 'あなたに気づいています'],
        ['02', '話しても大丈夫です'],
        ['03', '友好的です'],
      ].map(([number, label]) => (
        <div key={number} className="greetings-signal-item">
          <span>{number}</span>
          <strong>{label}</strong>
        </div>
      ))}
    </div>
  )
}

function GreetingVocabularySection({ section, speakWithBrowser, PlayIcon }) {
  return (
    <div className="greetings-vocab-section">
      <div className="greetings-vocab-head">
        <GreetingSceneImage src={section.image} alt="" />
        <div>
          <span className="section-kicker">{section.enTitle}</span>
          <h3>{section.title}</h3>
          <p>{section.intro}</p>
        </div>
      </div>
      <div className="greetings-phrase-grid">
        {section.phrases.map((item) => (
          <GreetingPhraseCard key={item.phrase} item={item} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
        ))}
      </div>
      <details className="greetings-recognition">
        <summary>聞いたら分かればよい表現 <span>Recognition shelf</span></summary>
        <div className="greetings-recognition-list">
          {section.recognition.map((item) => (
            <div key={item.phrase}>
              <strong>{item.phrase}</strong>
              <span>{item.meaning}</span>
              {item.note && <small>{item.note}</small>}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

function GreetingDialogueCard({ pattern, speakWithBrowser, PlayIcon }) {
  return (
    <article className="greeting-dialogue-card">
      <div className="greeting-dialogue-header">
        <div>
          <span className="section-kicker">{pattern.label}</span>
          <h3>{pattern.title}</h3>
        </div>
        <button
          type="button"
          className="greeting-listen-dialogue"
          onClick={() => speakWithBrowser(pattern.lines.map((line) => line.en).join(' '))}
        >
          <PlayIcon /> <span>会話を聞く</span>
        </button>
      </div>
      <div className="greeting-dialogue-lines">
        {pattern.lines.map((line, index) => (
          <div key={`${pattern.id}-${index}`} className={`greeting-dialogue-line speaker-${line.speaker.toLowerCase()}`}>
            <span className="greeting-speaker">{line.speaker}</span>
            <div className="greeting-speech-bubble">
              <strong>{line.en}</strong>
              <small>{line.ja}</small>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function GreetingsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('greetings-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['greetings-why', 'greetings-registers', 'greetings-exchanges', 'greetings-natural']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['greetings-why', 'あいさつの役割'],
    ['greetings-registers', '場面で変わる表現'],
    ['greetings-exchanges', 'あいさつを交わす'],
    ['greetings-natural', '自然な会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="greetings-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>あいさつは、会話のドアを開く。</h2>
              {learn.why.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">「こんにちは」は、会話を始めるための小さなドアです。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="人と人が会話を始める場面" />
          </section>

          <SocialSignalStrip />

          <section className="greetings-content-section greetings-relationship-section">
            <span className="section-kicker">関係と場面 · Context matters</span>
            <h2>同じ英語でも、距離感で選び方が変わります。</h2>
            {learn.relationship.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="greetings-context-grid">
              <div><RegisterChip tone="casual">casual</RegisterChip><strong>親しい人</strong><p>Hi! / Hey! など、短くて温かい表現。</p></div>
              <div><RegisterChip tone="polite">polite</RegisterChip><strong>初対面・仕事</strong><p>Good morning. / It’s good to meet you. など。</p></div>
            </div>
          </section>

          <section id="greetings-registers" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">使える表現 · Produce first</span>
              <h2>まず使える、基本のあいさつ。</h2>
              <p>たくさん覚えるより、場面を思い浮かべて、使う表現を少しずつ自分のものにします。</p>
            </div>
            <GreetingVocabularySection section={learn.informal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <GreetingVocabularySection section={learn.formal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="greetings-exchanges" className="greetings-content-section">
            <div className="greetings-exchange-heading">
              <GreetingSceneImage src={learn.exchanges.image} alt="二人が自然に会話を交わす場面" />
              <div><span className="section-kicker">会話の流れ · In conversation</span><h2>{learn.exchanges.title}</h2><p>{learn.exchanges.intro}</p></div>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.exchanges.patterns.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="greetings-natural" className="greetings-content-section">
            <span className="section-kicker">自然な会話のポイント · Natural speech</span>
            <h2>会話では、言葉が少し短くなります。</h2>
            <p>カジュアルな日常英語では、短縮形や文頭の省略がよく起こります。まずは、完全な形と自然な形を声に出して比べてみましょう。</p>
            <div className="greetings-natural-list">
              {learn.naturalSpeech.map((row) => (
                <div className="greetings-natural-row" key={row.full}>
                  <div><small>Full</small><strong>{row.full}</strong></div>
                  <span aria-hidden="true">→</span>
                  <div><small>Natural</small><strong>{row.natural}</strong><p>{row.ja}</p></div>
                </div>
              ))}
            </div>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Hi! · Hey! · Hello! · Morning! · Good morning. · It’s good to meet you.</p></div>
              <div><span className="section-kicker">聞いたら分かればよい</span><p>Alright? · Hiya! · How do you do? · It’s been ages!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function IntroductionsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('introductions-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['introductions-why', 'introductions-informal', 'introductions-formal', 'introductions-others', 'introductions-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['introductions-why', '自己紹介の役割'],
    ['introductions-informal', 'カジュアルに紹介する'],
    ['introductions-formal', '丁寧に紹介する'],
    ['introductions-others', 'ほかの人を紹介する'],
    ['introductions-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page introductions-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="introductions-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>自分が誰なのかを、相手に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">自己紹介は、その場に必要な情報を渡すための短い橋です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が会話を始める場面" />
          </section>

          <section id="introductions-informal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">自分を紹介する · Informal</span>
              <h2>まずは、自然に名前を伝える。</h2>
              <p>友人同士の集まりやカジュアルな場では、短いあいさつに名前を添えるだけで十分です。</p>
            </div>
            <GreetingVocabularySection section={learn.informal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="introductions-formal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">職場・初対面 · Formal</span>
              <h2>場面が変われば、丁寧さを足す。</h2>
              <p>職場やビジネスの場では、名前をはっきり伝え、相手の歓迎や促しにも応えます。</p>
            </div>
            <GreetingVocabularySection section={learn.formal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id === 'new-starter').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
          </section>

          <section id="introductions-others" className="greetings-content-section">
            <div className="greetings-exchange-heading">
              <GreetingSceneImage src={learn.others.image} alt="二人の知り合いを紹介する場面" />
              <div>
                <span className="section-kicker">人をつなぐ · Introduce others</span>
                <h2>{learn.others.title}</h2>
                <p>{learn.others.intro}</p>
              </div>
            </div>
            <GreetingVocabularySection section={learn.others} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-section-heading introductions-more-heading">
              <span className="section-kicker">その他の便利な表現 · More phrases</span>
              <h2>関係や役割を、ひと言足す。</h2>
              <p>友人、同僚、家族など、相手との関係を添えると紹介がより具体的になります。</p>
            </div>
            <div className="greetings-phrase-grid introductions-more-grid">
              {learn.more.map((item) => <GreetingPhraseCard key={item.phrase} item={item} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id === 'introduce-others').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
          </section>

          <section id="introductions-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>名前だけで終わらせない。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Hey, I’m … · I don’t think we’ve met. · You can call me …</p></div>
              <div><span className="section-kicker">返せるようにする</span><p>Lovely to meet you. · Great to meet you! · You, too!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FillerFunctionStrip({ items, ariaLabel = '会話のつなぎ言葉の役割' }) {
  return (
    <div className="greetings-signal-strip filler-function-strip" aria-label={ariaLabel}>
      {items.map(([number, label]) => (
        <div key={number} className="greetings-signal-item">
          <span>{number}</span>
          <strong>{label}</strong>
        </div>
      ))}
    </div>
  )
}

function FillersLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('fillers-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['fillers-why', 'fillers-start', 'fillers-middle', 'fillers-end', 'fillers-tags', 'fillers-listening', 'fillers-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['fillers-why', 'つなぎ言葉の役割'],
    ['fillers-start', '文の始め'],
    ['fillers-middle', '文の途中'],
    ['fillers-end', '文の終わり'],
    ['fillers-tags', '付加疑問文'],
    ['fillers-listening', '相槌を打つ'],
    ['fillers-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page fillers-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="fillers-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>沈黙ではなく、会話の流れを選ぶ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">短い言葉で、考える時間と相手とのつながりを守ります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が会話を続ける場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} />

          <section id="fillers-start" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">文の始め · Starting a sentence</span>
              <h2>話し始める前に、ひと呼吸。</h2>
              <p>何かを始めるときや、話題を切り出すときに、短い言葉を先に置きます。</p>
            </div>
            <GreetingVocabularySection section={learn.starting} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="fillers-middle" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">文の途中 · In the middle</span>
              <h2>言葉と言葉のあいだを、自然につなぐ。</h2>
              <p>断定を少しやわらげたり、次の言葉を探す時間を作ったりします。</p>
            </div>
            <GreetingVocabularySection section={learn.middle} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="fillers-end" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">文の終わり · At the end</span>
              <h2>言い切らずに、気持ちを添える。</h2>
              <p>文の最後に小さな一言を加えると、意見や本音が会話らしく聞こえます。</p>
            </div>
            <GreetingVocabularySection section={learn.ending} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="fillers-tags" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">確認する · Tag questions</span>
              <h2>「〜だよね？」を短く足す。</h2>
              <p>相手の同意や確認を求めるときは、文の最後に短い疑問形を付けます。</p>
            </div>
            <GreetingVocabularySection section={learn.tags} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id === 'tag-question').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
          </section>

          <section id="fillers-listening" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">相槌 · Show you’re listening</span>
              <h2>短く返して、相手の話を前へ進める。</h2>
              <p>長い返事を作らなくても、反応を返すだけで「聞いています」と伝えられます。</p>
            </div>
            <GreetingVocabularySection section={learn.listening} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id === 'listener-response').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
          </section>

          <section id="fillers-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>完璧な文章より、自然な間。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Well… · So… · You know… · I guess…</p></div>
              <div><span className="section-kicker">聞いて返す</span><p>Really? · Right… · Oh no! · Sounds fab!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function RepairLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('repair-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['repair-why', 'repair-understand', 'repair-hear', 'repair-repeat', 'repair-dialogues', 'repair-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['repair-why', '分からないときの考え方'],
    ['repair-understand', '理解できないと伝える'],
    ['repair-hear', '聞こえないと伝える'],
    ['repair-repeat', 'もう一度お願いする'],
    ['repair-dialogues', '会話で確認する'],
    ['repair-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page repair-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="repair-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>分からないときこそ、会話を続ける。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">分かったふりをせず、短く止めて、もう一度たずねます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="二人が会話を止めて確認する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="理解できないときの会話の進め方" />

          <section id="repair-understand" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">内容が分からない · I don’t understand</span>
              <h2>まず、分からないことを正直に伝える。</h2>
              <p>自分を責めるのではなく、相手にもう少し助けてもらう入口を作ります。</p>
            </div>
            <GreetingVocabularySection section={learn.understand} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="repair-hear" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">音が届かない · I can’t hear you</span>
              <h2>聞こえなかったのか、意味が分からないのか。</h2>
              <p>状況に合う短い聞き返しを選ぶと、会話を自然に止められます。</p>
            </div>
            <GreetingVocabularySection section={learn.hear} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="repair-repeat" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">具体的に頼む · Ask for help</span>
              <h2>もう一度、必要な形でお願いする。</h2>
              <p>「もう一度」「ゆっくり」「順を追って」など、相手にしてほしいことを具体的に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.repeat} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="repair-dialogues" className="greetings-content-section">
            <div className="greetings-exchange-heading">
              <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="会話の中で聞き返す場面" />
              <div>
                <span className="section-kicker">会話の流れ · Repair in conversation</span>
                <h2>止める、確認する、また続ける。</h2>
                <p>聞き返しは会話の失敗ではありません。必要な情報をもう一度受け取るための、自然な一手です。</p>
              </div>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="repair-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>丁寧に聞き返せば、会話は続けられる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Excuse me? · Sorry, I didn’t catch that. · Could you say that again?</p></div>
              <div><span className="section-kicker">場面に合わせる</span><p>What? は親しい相手に。仕事や初対面では丁寧な表現を。</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function OpinionsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('opinions-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['opinions-why', 'opinions-likes', 'opinions-dislikes', 'opinions-formal', 'opinions-questions', 'opinions-preferences', 'opinions-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['opinions-why', '意見や好みの役割'],
    ['opinions-likes', '好きなものを伝える'],
    ['opinions-dislikes', '好きではないと伝える'],
    ['opinions-formal', '丁寧に意見を言う'],
    ['opinions-questions', '相手の意見を尋ねる'],
    ['opinions-preferences', '好みを選ぶ・任せる'],
    ['opinions-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="opinions-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>意見は、相手との距離を近づける。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">言葉の強さと丁寧さを選ぶと、自分らしく、相手にも届く意見になります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が意見を交わす場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="意見や好みを伝える方法" />

          <section id="opinions-likes" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">好きの強さ · Saying what you like</span>
              <h2>「好き」を、気持ちの強さごと伝える。</h2>
              <p>like だけでなく、熱中しているのか、昔から好きなのかも言葉にできます。</p>
            </div>
            <GreetingVocabularySection section={learn.likes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="opinions-dislikes" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">苦手・拒否 · Saying what you don’t like</span>
              <h2>「好きではない」を、場面に合わせて伝える。</h2>
              <p>遠回しに言う表現と、強い拒否を表す表現を区別して使います。</p>
            </div>
            <GreetingVocabularySection section={learn.dislikes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="opinions-formal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会議・仕事 · Giving opinions formally</span>
              <h2>考えを整理して、丁寧に意見を述べる。</h2>
              <p>職場や会議では、断定しすぎず、自分の見解として伝える形が役立ちます。</p>
            </div>
            <GreetingVocabularySection section={learn.formal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="opinions-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">相手にも聞く · Ask for someone’s view</span>
              <h2>意見を交換するために、相手にも尋ねる。</h2>
              <p>会話を一方通行にせず、相手の考えや気持ちを受け取るための表現です。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="opinions-preferences" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">選ぶ・任せる · Preferences</span>
              <h2>選んでも、任せても、自分の答えになる。</h2>
              <p>どちらかを選ぶ言い方と、「どちらでもいい」と伝える言い方を練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.preferences} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id === 'preference-choice').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
          </section>

          <section id="opinions-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>強い言葉は、意味と場面をセットで覚える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.filter((pattern) => pattern.id !== 'preference-choice').map((pattern) => (
                <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
              ))}
            </div>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I absolutely love it! · It’s not really my thing. · I’d say…</p></div>
              <div><span className="section-kicker">選択を伝える</span><p>I’d much rather… · I don’t really mind. · Happy either way.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function AgreementLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('agreement-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['agreement-why', 'agreement-agree', 'agreement-disagree', 'agreement-closure', 'agreement-dialogues', 'agreement-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['agreement-why', '同意と反対の役割'],
    ['agreement-agree', '意見に同意する'],
    ['agreement-disagree', '意見に反対する'],
    ['agreement-closure', '違いを認めて終える'],
    ['agreement-dialogues', '会話の練習'],
    ['agreement-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page agreement-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="agreement-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>意見が違っても、会話は続けられる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">同意の強さと反対の伝え方を選ぶと、考えを守りながら相手との関係も守れます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が意見を交わす場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="同意と反対を伝える方法" />

          <section id="agreement-agree" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">共感・賛成 · Agreeing with opinions</span>
              <h2>「その通り」を、強さごと伝える。</h2>
              <p>完全な賛成、軽い相づち、相手の気持ちへの共感を場面に合わせて選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.agreeing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="agreement-disagree" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">反対の伝え方 · Disagreeing with opinions</span>
              <h2>違う考えを、会話のドアを閉めずに伝える。</h2>
              <p>丁寧に保留する言い方と、親しい相手に使う強い言い方を区別します。</p>
            </div>
            <GreetingVocabularySection section={learn.disagreeing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="agreement-closure" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">話を続ける・終える · Agreeing to disagree</span>
              <h2>勝ち負けではなく、違いを認めて次へ進む。</h2>
              <p>意見が平行線になったときも、関係を壊さずに話題を切り替えられます。</p>
            </div>
            <GreetingVocabularySection section={learn.closure} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="agreement-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>相手の言葉を受けて、自分の立場を返す。</h2>
              <p>同意、共感、反対、話の終え方を、短い会話の中で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="agreement-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>まず気持ちを受け止めてから、意見を伝える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Absolutely. · I hear you. · I’m not convinced, to be honest.</p></div>
              <div><span className="section-kicker">違いを扱う</span><p>We might have to agree to disagree. · Shall we drop it and move on?</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SuggestionsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('suggestions-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['suggestions-why', 'suggestions-making', 'suggestions-accepting', 'suggestions-rejecting', 'suggestions-dialogues', 'suggestions-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['suggestions-why', '提案の役割'],
    ['suggestions-making', '予定を立てる・提案する'],
    ['suggestions-accepting', '提案を受け入れる'],
    ['suggestions-rejecting', '提案をやんわり断る'],
    ['suggestions-dialogues', '会話の練習'],
    ['suggestions-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page suggestions-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="suggestions-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>提案は、次の一歩を一緒に考えること。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">相手に選択肢を渡し、受け入れることも断ることもできると、会話はもっと自由になります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が次の予定を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="提案と返事の方法" />

          <section id="suggestions-making" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">提案する · Making plans</span>
              <h2>強さを変えながら、次の案を出す。</h2>
              <p>はっきり誘う形、軽い選択肢、相手の気分を尋ねる形を使い分けます。</p>
            </div>
            <GreetingVocabularySection section={learn.making} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="suggestions-accepting" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">受け入れる · Accepting suggestions</span>
              <h2>「いいね」を、短く明るく返す。</h2>
              <p>参加する、準備を引き受ける、約束するなど、前向きな返事を選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.accepting} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="suggestions-rejecting" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">やんわり断る · Rejecting suggestions</span>
              <h2>今回は断っても、会話のドアは閉めない。</h2>
              <p>提案を否定せず、自分の気分やタイミングとして見送る言い方を練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.rejecting} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="suggestions-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>提案して、受けて、必要なら見送る。</h2>
              <p>次の予定を相談する短い会話で、提案と返事のリズムを聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="suggestions-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>前向きな返事と、やさしい断り方を覚える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">参加する</span><p>I’m in. · Count me in! · Sounds good.</p></div>
              <div><span className="section-kicker">今回は見送る</span><p>I don’t really feel like it. · I’ll give it a miss. · I’d rather not.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ThanksLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('thanks-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['thanks-why', 'thanks-basics', 'thanks-situations', 'thanks-replies', 'thanks-dialogues', 'thanks-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['thanks-why', '感謝を伝える意味'],
    ['thanks-basics', '感謝の基本と強調'],
    ['thanks-situations', '場面ごとの表現'],
    ['thanks-replies', '自然な返し方'],
    ['thanks-dialogues', '会話の練習'],
    ['thanks-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page thanks-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="thanks-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>ありがとうは、相手の行動に気づくこと。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">感謝の深さと丁寧さを選ぶと、相手の親切がきちんと届いたと伝えられます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が感謝を伝え合う場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="感謝と返事の方法" />

          <section id="thanks-basics" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">基本と強調 · Ways to thank people</span>
              <h2>「ありがとう」を、気持ちの深さごと伝える。</h2>
              <p>軽いお礼、強い感謝、丁寧で心のこもった表現を場面に合わせて選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.basics} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="thanks-situations" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">場面ごとの表現 · More phrases</span>
              <h2>招待、助け、プレゼントに、ぴったりのお礼を返す。</h2>
              <p>決まり文句を場面ごとに覚えると、必要なときに自然に出てきます。</p>
            </div>
            <GreetingVocabularySection section={learn.situations} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="thanks-replies" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">返し方 · Replying to “Thank you”</span>
              <h2>「どういたしまして」も、場面に合わせて返す。</h2>
              <p>基本の “You’re welcome” から、気軽な返事、丁寧な返事までを聞き比べます。</p>
            </div>
            <GreetingVocabularySection section={learn.replies} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="thanks-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>感謝を伝えて、自然な返事を受け取る。</h2>
              <p>助け、プレゼント、褒め言葉の三つの場面で、会話のキャッチボールを聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="thanks-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>まず感謝を返し、相手にも同じ気持ちを返す。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Thanks a lot. · I really appreciate it. · That’s so kind!</p></div>
              <div><span className="section-kicker">返事をする</span><p>No worries! · My pleasure! · Any time!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SorryLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('sorry-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['sorry-why', 'sorry-apologies', 'sorry-more', 'sorry-sympathy', 'sorry-dialogues', 'sorry-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['sorry-why', 'Sorryの役割'],
    ['sorry-apologies', '謝罪する・受け入れる'],
    ['sorry-more', '便利な謝罪と返答'],
    ['sorry-sympathy', '同情やお悔やみ'],
    ['sorry-dialogues', '会話の練習'],
    ['sorry-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page sorry-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="sorry-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>Sorryは、関係を修復し、相手に寄り添う言葉。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">自分のミスを認めるときも、相手の気持ちを受け止めるときも、Sorryは会話をつなぎます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が謝り、相手を気づかう場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="謝罪と同情を伝える方法" />

          <section id="sorry-apologies" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">謝罪・受け入れ · Making and accepting apologies</span>
              <h2>短く謝って、相手を安心させる。</h2>
              <p>小さな失敗なら短い “Sorry” で十分です。相手も、状況に合わせて自然に受け止めます。</p>
            </div>
            <GreetingVocabularySection section={learn.apologies} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sorry-more" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">場面に合わせる · More phrases</span>
              <h2>カジュアルなミスから、真剣な謝罪まで。</h2>
              <p>親しい相手への “My bad!” と、改まった “I owe you an apology.” を使い分けます。</p>
            </div>
            <GreetingVocabularySection section={learn.more} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sorry-sympathy" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">思いやり · Expressing sympathy</span>
              <h2>自分が悪くなくても、相手に寄り添う。</h2>
              <p>“Sorry” は謝罪だけでなく、病気や大切な人との別れに心を寄せる言葉にもなります。</p>
            </div>
            <GreetingVocabularySection section={learn.sympathy} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sorry-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>謝る、受け止める、心配に返す。</h2>
              <p>小さなミス、日常のトラブル、相手への思いやりを、短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="sorry-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>Sorryの意味は、場面で変わる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Oops! Sorry! · My bad! · I’m sorry to bother you.</p></div>
              <div><span className="section-kicker">相手に返す・寄り添う</span><p>No worries! · You don’t have to apologize. · I’m sorry for your loss.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GoodbyeLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('goodbye-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['goodbye-why', 'goodbye-informal', 'goodbye-formal', 'goodbye-reunion', 'goodbye-dialogues', 'goodbye-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['goodbye-why', '別れの役割'],
    ['goodbye-informal', 'カジュアルな別れ'],
    ['goodbye-formal', 'フォーマルな別れ'],
    ['goodbye-reunion', '再会につなげる'],
    ['goodbye-dialogues', '会話の練習'],
    ['goodbye-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page goodbye-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="goodbye-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>別れのあいさつは、会話を次の時間へつなぐ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">会話をきれいに締めくくると、また会いたい、また話したいという気持ちまで伝えられます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が別れのあいさつを交わす場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="別れと再会を伝える方法" />

          <section id="goodbye-informal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">カジュアルな別れ · Informal goodbyes</span>
              <h2>親しい相手には、軽く自然に別れを伝える。</h2>
              <p>短い “Bye!” から、次に会う日や相手の旅を気づかう言葉まで、距離感に合わせて使います。</p>
            </div>
            <GreetingVocabularySection section={learn.informal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="goodbye-formal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">丁寧な別れ · Formal goodbyes</span>
              <h2>相手と場面に合わせて、きちんと締めくくる。</h2>
              <p>仕事、初対面、面談の終わりには、感謝や再会の気持ちを添えた表現が役立ちます。</p>
            </div>
            <GreetingVocabularySection section={learn.formal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="goodbye-reunion" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">再会につなげる · Making future plans</span>
              <h2>「またね」を、次の約束まで具体的にする。</h2>
              <p>急いでいるときも、旧友と別れるときも、次の機会を一言残すと会話が続いていきます。</p>
            </div>
            <GreetingVocabularySection section={learn.reunion} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="goodbye-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>急いで出る、また会う、丁寧に終える。</h2>
              <p>別れの理由と次の予定を、短い会話の中で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="goodbye-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>まず基本を使い、地域や世代の表現は聞いて楽しむ。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Bye! · I'm off! · It was a pleasure meeting you.</p></div>
              <div><span className="section-kicker">再会につなげる</span><p>Catch you then! · Great to catch up! · Let’s do it again soon!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function DatesWeatherLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('dates-weather-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['dates-weather-why', 'dates-weather-dates', 'dates-weather-time', 'dates-weather-frequency', 'dates-weather-weather', 'dates-weather-dialogues', 'dates-weather-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['dates-weather-why', 'いつ・今の状況を話す'],
    ['dates-weather-dates', '日付と年'],
    ['dates-weather-time', '時間の伝え方'],
    ['dates-weather-frequency', '頻度を伝える'],
    ['dates-weather-weather', '天気と気温'],
    ['dates-weather-dialogues', '会話の練習'],
    ['dates-weather-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page dates-weather-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="dates-weather-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>いつ、どれくらい、今どんな状況かを伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">日付と時間が予定をつくり、天気の言葉が今日の行動や気分をつくります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="二人が予定と天気について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="日付、時間、頻度、天気の使い方" />

          <section id="dates-weather-dates" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">日付と年 · Discussing dates</span>
              <h2>カレンダーの数字を、英語のまとまりで読む。</h2>
              <p>日付には序数を使い、年は時代によって読み方が変わります。まずは音のまとまりに慣れます。</p>
            </div>
            <GreetingVocabularySection section={learn.dates} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dates-weather-time" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">時間の伝え方 · Telling the time</span>
              <h2>past と to で、時計の位置を言葉にする。</h2>
              <p>30分までは “past”、30分を過ぎたら次の時刻までの “to” を使う言い方を聞き比べます。</p>
            </div>
            <GreetingVocabularySection section={learn.time} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dates-weather-frequency" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">頻度 · Talking about frequency</span>
              <h2>習慣や予定の間隔を、短く伝える。</h2>
              <p>once、twice、times、every を使うと、どれくらいの頻度かを自然に説明できます。</p>
            </div>
            <GreetingVocabularySection section={learn.frequency} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dates-weather-weather" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">天気と気温 · Describing the weather</span>
              <h2>空の様子と、体で感じる天気を伝える。</h2>
              <p>sunny や cloudy だけでなく、boiling、freezing、pouring のような感情のこもる表現も学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.weather} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dates-weather-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>時刻、天気、頻度を会話の中で返す。</h2>
              <p>予定を確認し、今の状況を説明し、習慣の頻度を伝える短い会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="dates-weather-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>まずは半分と4分の1の時刻から慣れる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Half past one. · Twice a week. · It’s sunny today.</p></div>
              <div><span className="section-kicker">状況を広げる</span><p>Quarter to two. · It’s pouring. · It’s freezing out there.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ArrangementsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('arrangements-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['arrangements-why', 'arrangements-times', 'arrangements-days', 'arrangements-dates', 'arrangements-dialogues', 'arrangements-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['arrangements-why', '予定を調整する意味'],
    ['arrangements-times', '時間を調整する'],
    ['arrangements-days', '曜日と都合'],
    ['arrangements-dates', '日付を決める'],
    ['arrangements-dialogues', '会話の練習'],
    ['arrangements-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page arrangements-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="arrangements-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>予定は、相手と一緒につくるもの。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">都合を聞き、別の案を出し、変更を伝えられると、予定はもっと安心して実現できます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が予定を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="予定を調整する方法" />

          <section id="arrangements-times" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">時間の調整 · Times</span>
              <h2>時間を提案し、遅れも先に伝える。</h2>
              <p>half three のような英国式の時刻と、念のため少し調整する言い方を聞き比べます。</p>
            </div>
            <GreetingVocabularySection section={learn.times} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="arrangements-days" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">日にちの調整 · Days</span>
              <h2>相手の都合を聞いて、別の案を返す。</h2>
              <p>suit you、work for me、instead を使って、予定の候補をすり合わせます。</p>
            </div>
            <GreetingVocabularySection section={learn.days} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="arrangements-dates" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">日付の決定 · Dates</span>
              <h2>大事な日を決めて、相手に予定を空けてもらう。</h2>
              <p>特別な日の質問、確定した日程、予定を確保してもらう表現をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.dates} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="arrangements-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>提案して、条件を伝えて、別の案を返す。</h2>
              <p>時間、曜日、特別な日を決める3つの会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="arrangements-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>使いやすい形を一つ覚え、他の形は聞いて分かる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Are you free on Tuesday? · Friday works for me. · Keep it free!</p></div>
              <div><span className="section-kicker">調整する</span><p>I might be five minutes late. · Shall we do Sunday instead? · May the 31st.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function WeatherLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('weather-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['weather-why', 'weather-describe', 'weather-small-talk', 'weather-forecast', 'weather-dialogues', 'weather-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['weather-why', '天気を話す意味'],
    ['weather-describe', '天気を説明する'],
    ['weather-small-talk', 'スモールトーク'],
    ['weather-forecast', '天気予報'],
    ['weather-dialogues', '会話の練習'],
    ['weather-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page weather-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="weather-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>天気の話は、会話のドアを開く。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">天気は、情報だけでなく、「あなたと話したい」という小さな合図にもなります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が天気について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="天気について話す方法" />

          <section id="weather-describe" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">天気を説明する · Describing the weather</span>
              <h2>空の様子と、体で感じる天気を伝える。</h2>
              <p>天気をたずねる言葉と、暑さ・寒さ・雨や風の強さを感情を込めて答える表現を学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.describe} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="weather-small-talk" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">スモールトーク · Making small talk</span>
              <h2>天気を入口に、相手との会話を続ける。</h2>
              <p>付加疑問文を使うと、感想を共有しながら自然に相手の返事を促せます。</p>
            </div>
            <GreetingVocabularySection section={learn.smallTalk} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="weather-forecast" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">天気予報 · The weather forecast</span>
              <h2>予報のまとまりを、聞き取る。</h2>
              <p>天気アプリやニュースで使われる表現を、全部暗記するのではなく、音の流れとして聞いてみましょう。</p>
            </div>
            <GreetingVocabularySection section={learn.forecast} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="weather-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>たずねて、返して、次の一言につなげる。</h2>
              <p>今の天気、スモールトーク、明日の予報を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="weather-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>短い返事を一つ、いつでも使えるようにする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What's the weather like? · It's boiling! · It's freezing outside!</p></div>
              <div><span className="section-kicker">会話を続ける</span><p>Lovely weather, isn't it? · Yes, beautiful! · Here's the forecast for tomorrow.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FamilyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('family-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['family-why', 'family-terms', 'family-inlaws', 'family-relationships', 'family-life-events', 'family-dialogues', 'family-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['family-why', '関係を表す言葉'],
    ['family-terms', '家族・親戚'],
    ['family-inlaws', '義理の家族'],
    ['family-relationships', '人間関係ときょうだい'],
    ['family-life-events', '人生のイベント'],
    ['family-dialogues', '会話の練習'],
    ['family-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page family-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="family-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>人とのつながりを、言葉で見えるようにする。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">家族の言葉は、誰が自分の世界にいるのかを伝える小さな地図です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="人との関係について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="家族と人間関係を話す方法" />

          <section id="family-terms" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">家族・親戚 · My family</span>
              <h2>まずは、身近な家族を紹介する。</h2>
              <p>英語で一つの単語にまとめられる関係にも注目しながら、家族と親戚の名前を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.family} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="family-inlaws" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">義理の家族 · In-laws & stepfamily</span>
              <h2>語尾や接頭辞で、関係の種類を示す。</h2>
              <p>-in-law、step-、half-、ex- がつくと、結婚・再婚・片方の親・以前の関係を具体的に表せます。</p>
            </div>
            <GreetingVocabularySection section={learn.inlaws} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="family-relationships" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">人間関係 · Relationships</span>
              <h2>きょうだいの順番と、生活の中の関係を話す。</h2>
              <p>必要なときだけ older や younger を足し、partner、colleague、neighbour なども使って関係を説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.relationships} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="family-life-events" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">人生のイベント · Life events & growing up</span>
              <h2>人生の節目を、ひとつのまとまりで話す。</h2>
              <p>生まれてから成長し、仕事や結婚、退職などを迎えるまでの出来事と段階を表します。</p>
            </div>
            <GreetingVocabularySection section={learn.lifeEvents} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="family-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>関係をたずねて、具体的に返す。</h2>
              <p>きょうだい、親戚、人間関係、人生の出来事を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="family-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>必要なときだけ、年齢の情報を足す。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>my parents · my cousin · my partner · my siblings</p></div>
              <div><span className="section-kicker">詳しくする</span><p>my older brother · my younger sister · Do you have any siblings?</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function TalkingFamilyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('talking-family-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['talking-family-why', 'talking-family-immediate', 'talking-family-closeness', 'talking-family-extended', 'talking-family-dialogues', 'talking-family-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['talking-family-why', '家族について話す意味'],
    ['talking-family-immediate', 'きょうだいと自分'],
    ['talking-family-closeness', '家族との関係・子ども'],
    ['talking-family-extended', '親戚について'],
    ['talking-family-dialogues', '会話の練習'],
    ['talking-family-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page talking-family-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="talking-family-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>家族を、名前だけでなく生活の中で話す。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">家族の話は、誰がいるかだけでなく、どんな毎日を一緒に過ごしているかを伝えます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="家族について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="家族について話す方法" />

          <section id="talking-family-immediate" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">きょうだいと自分 · Immediate family</span>
              <h2>きょうだいをたずねて、自分の位置を伝える。</h2>
              <p>Have you got...? で質問し、oldest、middle child、youngest、only child で自分の立ち位置を説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.immediate} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="talking-family-closeness" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">家族との関係 · Family relationships</span>
              <h2>親しさや子どものことを、相手に合わせて聞く。</h2>
              <p>家族との距離や子どもの話は、相手との関係を見ながら、自然な質問と具体的な返答で続けます。</p>
            </div>
            <GreetingVocabularySection section={learn.closeness} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="talking-family-extended" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">親戚について · Extended family</span>
              <h2>親戚の予定や人数を、会話に足していく。</h2>
              <p>祖父母、おじ・おば、いとこの話を、今日の予定や家族への気持ちと一緒に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.extended} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="talking-family-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>質問して、答えて、もう一つ返す。</h2>
              <p>きょうだい、家族との距離、親戚についての短い会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="talking-family-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>地域による呼び方も、聞いて分かるようにする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Have you got any siblings? · I'm the oldest. · Are you close to your family?</p></div>
              <div><span className="section-kicker">会話を続ける</span><p>How about you? · on the way · I adore them!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function LifeEventsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('life-events-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['life-events-why', 'life-events-celebrations', 'life-events-milestones', 'life-events-other', 'life-events-dialogues', 'life-events-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['life-events-why', '出来事に合う言葉'],
    ['life-events-celebrations', 'お祝い事'],
    ['life-events-milestones', '人生の節目'],
    ['life-events-other', '退職・お悔やみ'],
    ['life-events-dialogues', '会話の練習'],
    ['life-events-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page life-events-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="life-events-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>出来事に合わせて、言葉を選ぶ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">一緒に喜ぶことも、そっと寄り添うことも、言葉の選び方から始まります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="人生の出来事について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="人生の出来事に応じた伝え方" />

          <section id="life-events-celebrations" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">お祝い事 · Celebrations</span>
              <h2>良い知らせを聞いたら、喜びを返す。</h2>
              <p>誕生日、昇進、結婚など、相手の嬉しい出来事に合う短い言葉から始めます。</p>
            </div>
            <GreetingVocabularySection section={learn.celebrations} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="life-events-milestones" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">人生の節目 · Milestones</span>
              <h2>大きなステップを、具体的に祝う。</h2>
              <p>出産、卒業、新居など、相手の努力や変化に合わせてお祝いの言葉を足します。</p>
            </div>
            <GreetingVocabularySection section={learn.milestones} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="life-events-other" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">その他の出来事 · Other events</span>
              <h2>祝う場面と、寄り添う場面を区別する。</h2>
              <p>記念日や退職には祝福を、悲しい知らせには静かな思いやりを伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.otherEvents} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="life-events-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>状況を見て、喜びや思いやりを返す。</h2>
              <p>良い知らせ、人生の節目、お悔やみの3つの場面を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="life-events-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>Here’s to の後ろに、祝いたいものを置く。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">お祝い</span><p>Happy birthday! · Congratulations! · Here's to us!</p></div>
              <div><span className="section-kicker">思いやり</span><p>I'm so sorry for your loss. · Let me know if there's anything I can do.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SocializingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('socializing-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['socializing-why', 'socializing-party', 'socializing-connections', 'socializing-compliments', 'socializing-more', 'socializing-dialogues', 'socializing-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['socializing-why', '社交の会話の役割'],
    ['socializing-party', '再会と近況'],
    ['socializing-connections', 'つながりを見つける'],
    ['socializing-compliments', '褒め言葉'],
    ['socializing-more', '会話を続ける表現'],
    ['socializing-dialogues', '会話の練習'],
    ['socializing-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page socializing-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="socializing-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>会話の最初に、心地よいつながりをつくる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">社交の会話は、重要な話題を探す前に、人と人の距離を少し近づけます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="社交の場で会話を始める場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="社交の会話を広げる方法" />

          <section id="socializing-party" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">偶然の再会 · At a party</span>
              <h2>驚きと喜びから、近況の質問へ。</h2>
              <p>知り合いにばったり会ったら、再会を喜び、相手の最近の様子を聞きます。</p>
            </div>
            <GreetingVocabularySection section={learn.party} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="socializing-connections" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">つながりを見つける · Making connections</span>
              <h2>「誰と知り合い？」から共通点を探す。</h2>
              <p>主催者との関係や職業を聞くと、初対面の人とも無理なく話を続けられます。</p>
            </div>
            <GreetingVocabularySection section={learn.connections} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="socializing-compliments" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">褒め言葉 · Complimenting</span>
              <h2>気づいたことを、自然に言葉にする。</h2>
              <p>服装や持ち物を褒め、Where’d you get it? のような質問で話題を一つ広げます。</p>
            </div>
            <GreetingVocabularySection section={learn.compliments} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="socializing-more" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">その他の表現 · More phrases</span>
              <h2>一言で終わらず、相手に返して続ける。</h2>
              <p>近況、過去のつながり、主催者としての歓迎など、場面に合わせて次の一言を足します。</p>
            </div>
            <GreetingVocabularySection section={learn.more} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="socializing-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>再会、つながり、褒め言葉を会話にする。</h2>
              <p>社交の場で使える3つの短い会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="socializing-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>驚きの表現と地域の言葉を、耳で楽しむ。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>How do you know Gemma? · What do you do? · How's it going?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>Fancy seeing you here! · quid · We used to work together.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function DatingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('dating-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['dating-why', 'dating-asking', 'dating-declining', 'dating-first-date', 'dating-ending', 'dating-dialogues', 'dating-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['dating-why', 'デートと恋愛の会話'],
    ['dating-asking', '誘う・受ける'],
    ['dating-declining', '意思を丁寧に伝える'],
    ['dating-first-date', '初デートの会話'],
    ['dating-ending', 'また会う・帰り道'],
    ['dating-dialogues', '会話の練習'],
    ['dating-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page dating-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="dating-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>気持ちと意思を尊重しながら、少しずつ知り合う。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">デートの会話は、相手を急がせず、自分も無理をせず、二人のペースを見つける時間です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="デートで会話を始める二人" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="デートと恋愛の会話を進める方法" />

          <section id="dating-asking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">誘う・受ける · Ask someone out</span>
              <h2>軽い提案を、相手が選べる形で伝える。</h2>
              <p>具体的な日や小さな予定を提案し、相手の返事を急かさずに受け取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.asking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dating-declining" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">断る・伝える · Say no with care</span>
              <h2>相手を尊重しながら、自分の意思をはっきり伝える。</h2>
              <p>受けたくないときや、まだ関係を求めていないときも、無理に理由を作らず丁寧に断れます。</p>
            </div>
            <GreetingVocabularySection section={learn.declining} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dating-first-date" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">初デート · On a first date</span>
              <h2>緊張を共有して、相手の世界を知る。</h2>
              <p>待ち合わせのあいさつから、興味や関係への希望をたずねる会話へ進みます。</p>
            </div>
            <GreetingVocabularySection section={learn.firstDate} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dating-ending" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">終わりと次の一歩 · End the date</span>
              <h2>楽しかったかどうかを、自分の言葉で返す。</h2>
              <p>また会いたい気持ちも、帰る必要があることも、どちらも自然な意思表示です。</p>
            </div>
            <GreetingVocabularySection section={learn.ending} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="dating-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>誘う、知る、次につなげる。</h2>
              <p>デートの前、デート中、デートの終わりの3つの場面を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="dating-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“I’m seeing someone” は、関係を自然に伝える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Do you fancy…? · I’d love to! · I’d really like to see you again.</p></div>
              <div><span className="section-kicker">意思を尊重する</span><p>That’s really kind, but… · I’m not looking for a relationship. · Same here.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SupportLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('support-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['support-why', 'support-encouraging', 'support-offering', 'support-thanks', 'support-dialogues', 'support-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['support-why', 'サポートする言葉の役割'],
    ['support-encouraging', '励ます・背中を押す'],
    ['support-offering', '力になると伝える'],
    ['support-thanks', '感謝を返す'],
    ['support-dialogues', '会話の練習'],
    ['support-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page support-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="support-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>解決できなくても、そばにいる言葉は届けられる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">サポートは、相手を変えることではなく、「ひとりではない」と伝えることから始まります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="二人が互いに支え合う場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="サポートする会話の進め方" />

          <section id="support-encouraging" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">励ます · Being encouraging</span>
              <h2>大変さを認めてから、背中を押す。</h2>
              <p>「頑張って」と急がせるだけでなく、相手の力を信じていることを伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.encouraging} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="support-offering" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">力になる · Offering support</span>
              <h2>「必要なら、ここにいる」と具体的に伝える。</h2>
              <p>相手の代わりに決めるのではなく、話を聞くことや手を貸すことを選べる形で申し出ます。</p>
            </div>
            <GreetingVocabularySection section={learn.offering} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="support-thanks" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">感謝を返す · Saying thanks</span>
              <h2>支えてもらったことを、言葉で返す。</h2>
              <p>短い Thanks から、心強かったことを伝える That means a lot まで、気持ちに合う表現を選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.thanks} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="support-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>励ます、申し出る、感謝を返す。</h2>
              <p>不安なとき、助けが必要なとき、そして支えてもらったときの3つの短い会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="support-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“got” で、連帯感を短く伝える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">励ます</span><p>Hang in there. · We’ve got this! · It’s worth a shot.</p></div>
              <div><span className="section-kicker">寄り添う・返す</span><p>We’re here for you. · We’ve got your back. · That means a lot.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function EatingDrinkingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('eating-drinking-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['eating-drinking-why', 'eating-drinking-drinks', 'eating-drinking-verbs', 'eating-drinking-equipment', 'eating-drinking-preparation', 'eating-drinking-out', 'eating-drinking-dialogues', 'eating-drinking-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['eating-drinking-why', '飲食の言葉の役割'],
    ['eating-drinking-drinks', '飲み物とミルク'],
    ['eating-drinking-verbs', '料理の動作'],
    ['eating-drinking-equipment', 'キッチンの道具'],
    ['eating-drinking-preparation', '調理法'],
    ['eating-drinking-out', '外食と食のルール'],
    ['eating-drinking-dialogues', '会話の練習'],
    ['eating-drinking-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page eating-drinking-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="eating-drinking-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>食べる、飲む、注文するを、生活の英語にする。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">飲食の言葉を知ると、メニューを読むことも、自分に合うものを選ぶことも、少し安心になります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="カフェや食事について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="飲食の英語を使う場面" />

          <section id="eating-drinking-drinks" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">飲み物 · Coffees, teas, and soft drinks</span>
              <h2>飲み物とミルクを組み合わせて選ぶ。</h2>
              <p>カフェでは、飲み物の種類と milk の種類を一緒に伝えると、希望が具体的になります。</p>
            </div>
            <GreetingVocabularySection section={learn.drinks} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="eating-drinking-verbs" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">料理の動作 · Kitchen verbs</span>
              <h2>レシピの動きを、動詞で追う。</h2>
              <p>peel、chop、pour のような動作の言葉を知ると、レシピや料理番組の流れが見えやすくなります。</p>
            </div>
            <GreetingVocabularySection section={learn.verbs} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="eating-drinking-equipment" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">道具 · Kitchen equipment</span>
              <h2>キッチンにあるものを、英語で見分ける。</h2>
              <p>カタカナと少し違う colander や saucepan も、実物と一緒に覚えると定着します。</p>
            </div>
            <GreetingVocabularySection section={learn.equipment} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="eating-drinking-preparation" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">調理法 · Food preparation</span>
              <h2>メニューの一語から、料理を想像する。</h2>
              <p>fried、steamed、roasted など、料理がどのように作られたかを表す言葉です。</p>
            </div>
            <GreetingVocabularySection section={learn.preparation} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="eating-drinking-out" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">外食 · Eating out</span>
              <h2>予約、注文、制限、お会計をつなげる。</h2>
              <p>食べられないものや食事のスタイルも、遠慮せず早めに伝えることが大切です。</p>
            </div>
            <GreetingVocabularySection section={learn.eatingOut} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="eating-drinking-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>選ぶ、注文する、確認する。</h2>
              <p>カフェ、レストラン、食事の制限を伝える3つの短い会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="eating-drinking-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>イギリス英語の食卓語彙にも慣れる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Could I have…? · Is this dish gluten-free? · Can we split the bill?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>white coffee · pudding · starter · side order</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CafesLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('cafes-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['cafes-why', 'cafes-ordering', 'cafes-phrases', 'cafes-seating', 'cafes-dialogues', 'cafes-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['cafes-why', 'カフェ英語の役割'],
    ['cafes-ordering', '注文の流れ'],
    ['cafes-phrases', 'よく使うフレーズ'],
    ['cafes-seating', '席とおかわり'],
    ['cafes-dialogues', '会話の練習'],
    ['cafes-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page cafes-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="cafes-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>短い注文で、目的のある会話を練習する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">カフェの会話は短いからこそ、聞く、選ぶ、伝えるを一つの流れで練習できます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="カフェのカウンターで注文する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="カフェで英語を使う場面" />

          <section id="cafes-ordering" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">注文の流れ · At the coffee shop</span>
              <h2>店員の質問を聞いて、順番に答える。</h2>
              <p>飲み物、食べ物、店内か持ち帰りかを、短いまとまりで伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.ordering} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cafes-phrases" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">よく使う表現 · More phrases</span>
              <h2>自分の好みと、店員の確認を聞き分ける。</h2>
              <p>サイズ、ミルク、砂糖、ポイントカードなど、カウンターでよく出る短い表現です。</p>
            </div>
            <GreetingVocabularySection section={learn.phrases} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cafes-seating" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">席とおかわり · Finding a seat and refills</span>
              <h2>注文のあとも、カフェの会話は続く。</h2>
              <p>空席を確認したり、友達に追加の飲み物を尋ねたりする自然なやり取りです。</p>
            </div>
            <GreetingVocabularySection section={learn.seating} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cafes-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>注文、席、おかわりを声にする。</h2>
              <p>カウンターでの注文、空席の確認、追加注文の3場面を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="cafes-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“Could I have…?” で丁寧に注文する。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Could I have…? · Can I get…? · To take away, please.</p></div>
              <div><span className="section-kicker">聞いて返す</span><p>To have in or take away? · Regular or large? · Any milk or sugar?</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function TakeawayLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('takeaway-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['takeaway-why', 'takeaway-pickup', 'takeaway-delivery', 'takeaway-vocabulary', 'takeaway-dialogues', 'takeaway-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['takeaway-why', 'テイクアウトの役割'],
    ['takeaway-pickup', '持ち帰りをする'],
    ['takeaway-delivery', 'デリバリーを頼む'],
    ['takeaway-vocabulary', '料理と注文の単語'],
    ['takeaway-dialogues', '会話の練習'],
    ['takeaway-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page takeaway-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="takeaway-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>注文の場所と時間を、はっきり伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">Takeaway と delivery は、欲しいものを正しく受け取るための実用的な会話です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="テイクアウトやデリバリーについて話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="テイクアウトとデリバリーの会話を進める方法" />

          <section id="takeaway-pickup" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">持ち帰り · Getting a takeaway</span>
              <h2>提案、注文、受け取りをつなげる。</h2>
              <p>店頭で to go と伝え、予約した商品は pick up すると伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.pickup} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="takeaway-delivery" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">配達 · Ordering a delivery</span>
              <h2>配達先と注文の状況を確認する。</h2>
              <p>住所や postcode を伝え、届かないときは落ち着いて状況を問い合わせます。</p>
            </div>
            <GreetingVocabularySection section={learn.delivery} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="takeaway-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Takeaway meals vocabulary</span>
              <h2>注文したい料理を、具体的に言う。</h2>
              <p>料理名と takeaway・delivery の言葉を組み合わせると、注文が明確になります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="takeaway-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>受け取る、届けてもらう、問い合わせる。</h2>
              <p>持ち帰り、配達先の確認、遅れた注文の3場面を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="takeaway-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>Takeaway と takeout を、場所に合わせて聞き分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Two burgers to go, please. · I’ve come to pick up my order. · What’s your postcode?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>takeaway · takeout · get a pizza in · zip code</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function BarsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('bars-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['bars-why', 'bars-buying', 'bars-questions', 'bars-rounds', 'bars-vocabulary', 'bars-dialogues', 'bars-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['bars-why', 'バー・パブ英語の役割'],
    ['bars-buying', '飲み物を注文する'],
    ['bars-questions', 'パブ特有の質問'],
    ['bars-rounds', 'ラウンドとラストオーダー'],
    ['bars-vocabulary', '飲み物の単語'],
    ['bars-dialogues', '会話の練習'],
    ['bars-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page bars-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="bars-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>注文だけでなく、社交の場の英語を使う。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">バーやパブでは、飲み物の名前だけでなく、場の習慣も会話になります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="バーやパブで飲み物について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="バーとパブの会話を進める方法" />

          <section id="bars-buying" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">注文 · Buying drinks</span>
              <h2>飲み物を選び、好みを確認する。</h2>
              <p>カウンターで注文し、氷やレモン、おすすめについて短く尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.buying} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="bars-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問 · More questions</span>
              <h2>分からない仕組みは、短く尋ねる。</h2>
              <p>on tap、支払い、ノンアルコール、ラストオーダーを確認して、安心して注文します。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="bars-rounds" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">文化 · Rounds and last orders</span>
              <h2>友人の分を買う文化を知る。</h2>
              <p>round の習慣と、追加注文・ラストオーダーの流れを会話として捉えます。</p>
            </div>
            <GreetingVocabularySection section={learn.rounds} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="bars-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Drinks vocabulary</span>
              <h2>メニューの分類を見分ける。</h2>
              <p>アルコールを飲まない選択も含めて、メニューの言葉を落ち着いて読みます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="bars-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>注文、確認、ラウンドを声にする。</h2>
              <p>店員との注文、パブの仕組みの確認、友人への一言を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="bars-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“Can I get…?” で自然に注文する。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Can I get…? · What have you got on tap? · Do you serve mocktails?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>It&apos;s my round · last orders · alcohol-free lager · spirits</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function RestaurantLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('restaurant-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['restaurant-why', 'restaurant-booking', 'restaurant-meal', 'restaurant-bill', 'restaurant-vocabulary', 'restaurant-dialogues', 'restaurant-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['restaurant-why', 'レストラン英語の役割'],
    ['restaurant-booking', '予約と注文'],
    ['restaurant-meal', '食事の感想とクレーム'],
    ['restaurant-bill', 'お会計と支払い'],
    ['restaurant-vocabulary', 'テーブルの単語'],
    ['restaurant-dialogues', '会話の練習'],
    ['restaurant-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page restaurant-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="restaurant-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>予約から会計まで、希望をはっきり伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">レストランでは、丁寧な一言が食事の流れをスムーズにします。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="レストランで注文について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="レストランの会話を進める方法" />

          <section id="restaurant-booking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">予約と注文 · Booking a table & ordering</span>
              <h2>席、料理、アレルギーを確認する。</h2>
              <p>予約名や人数を伝え、席の希望と安全に関わる情報を先に共有します。</p>
            </div>
            <GreetingVocabularySection section={learn.booking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="restaurant-meal" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">食事 · Discussing your meal</span>
              <h2>感想も問題も、クッションを置いて伝える。</h2>
              <p>おいしさを共有するときも、料理やグラスに問題があるときも、相手に届く言い方を選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.meal} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="restaurant-bill" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会計 · Paying the bill</span>
              <h2>支払い方法と割り勘を決める。</h2>
              <p>デザートを断り、会計をお願いし、誰がどのように支払うかを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.bill} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="restaurant-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · A restaurant table</span>
              <h2>テーブルの上のものを具体的に言う。</h2>
              <p>小さなお願いほど、必要なものの名前を言えると会話が早く進みます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="restaurant-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>予約、食事、会計を一つの流れで聞く。</h2>
              <p>レストランで起こる3つの場面を、短い会話として聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="restaurant-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“Actually” と “to be honest” で本音をやわらげる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;ll have… · I&apos;m allergic to… · Just the bill, please.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>in your party · actually · on me · split the bill</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CookingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('cooking-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['cooking-why', 'cooking-recipe', 'cooking-together', 'cooking-dietary', 'cooking-dialogues', 'cooking-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['cooking-why', '料理と食事の役割'],
    ['cooking-recipe', 'レシピと調理方法'],
    ['cooking-together', '一緒に作って食べる'],
    ['cooking-dietary', '味と食事制限'],
    ['cooking-dialogues', '会話の練習'],
    ['cooking-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page cooking-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="cooking-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>料理をしながら、相手への気づかいも伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">料理と食事は、手順を伝えることと相手を思いやることが一つになる場面です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="キッチンで料理について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="料理と食事の会話を進める方法" />

          <section id="cooking-recipe" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">レシピ · Following a recipe</span>
              <h2>手順と火加減を、次の動作につなげる。</h2>
              <p>It says to… でレシピを読み、時間や温度、調理方法を一緒に確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.recipe} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cooking-together" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">食卓 · Cooking together & sharing</span>
              <h2>作る人を決め、できた料理をすすめる。</h2>
              <p>料理を迎え入れ、取り分け、相手が何を食べたいかを自然に尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.together} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cooking-dietary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">配慮 · Enjoying food & dietary requirements</span>
              <h2>味の感想と、食べられないものを伝える。</h2>
              <p>美味しさを表現しながら、アレルギーや食事の方針は遠慮なく明確に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.dietary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cooking-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>作る、分ける、安心して食べる。</h2>
              <p>キッチンと食卓で起こる3つの場面を、短い会話として聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="cooking-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“Fancy …?” と調理方法の違いを知る。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What are you making? · Food&apos;s ready! · I&apos;m allergic to…</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>Fancy …? · simmer · pescatarian · fry / grill / roast / bake</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FreeTimeLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('free-time-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['free-time-why', 'free-time-outdoor', 'free-time-games', 'free-time-creative', 'free-time-entertainment', 'free-time-dialogues', 'free-time-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['free-time-why', '余暇と趣味の役割'],
    ['free-time-outdoor', 'アウトドア活動'],
    ['free-time-games', 'ゲームと室内遊び'],
    ['free-time-creative', '創作的な趣味'],
    ['free-time-entertainment', '音楽とエンターテインメント'],
    ['free-time-dialogues', '会話の練習'],
    ['free-time-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page free-time-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="free-time-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>好きなことから、会話の共通点を見つける。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">趣味は、相手のことを知りながら会話を自然に続ける入口になります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="余暇や趣味について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="余暇と趣味の会話を進める方法" />

          <section id="free-time-outdoor" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">外で楽しむ · Outdoor activities</span>
              <h2>公園、自然、山、海で過ごす。</h2>
              <p>週末の過ごし方を話すときに、活動をまとまりで思い出せるようにします。</p>
            </div>
            <GreetingVocabularySection section={learn.outdoor} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="free-time-games" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">室内で遊ぶ · Games</span>
              <h2>友人や家族と遊ぶものを話す。</h2>
              <p>カード、ボードゲーム、ゲーム機など、家の中の活動を具体的に言います。</p>
            </div>
            <GreetingVocabularySection section={learn.games} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="free-time-creative" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">作る · Creative hobbies</span>
              <h2>描く、作る、育てるを自分の言葉にする。</h2>
              <p>創作的な活動は、どんなことに時間をかけるのかを伝えるきっかけになります。</p>
            </div>
            <GreetingVocabularySection section={learn.creative} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="free-time-entertainment" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">観る・聴く · Entertainment & music</span>
              <h2>作品や音楽の好みを話す。</h2>
              <p>劇場、映画、コンサート、音楽ジャンルの単語を、好きなものと結びつけます。</p>
            </div>
            <GreetingVocabularySection section={learn.entertainment} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="free-time-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>尋ねる、共感する、誘う。</h2>
              <p>趣味を尋ね、共通点を見つけ、次の予定につなげる3つの会話を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="free-time-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>地域の違いと、趣味の言い分けを知る。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What do you do in your free time? · I love… · I&apos;m really into…</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>skipping · funfair · cards · cooking / baking</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CinemaLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('cinema-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['cinema-why', 'cinema-tickets', 'cinema-access', 'cinema-reactions', 'cinema-dialogues', 'cinema-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['cinema-why', '映画館英語の役割'],
    ['cinema-tickets', 'チケットと上映'],
    ['cinema-access', '字幕とアクセス'],
    ['cinema-reactions', '映画の感想'],
    ['cinema-dialogues', '会話の練習'],
    ['cinema-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page cinema-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="cinema-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>観る前に確認し、観たあとに感想を話す。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">映画館では、必要な情報を尋ねることと、感じたことを分かち合うことがつながっています。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="映画館で上映について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="映画館の会話を進める方法" />

          <section id="cinema-tickets" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">上映 · Getting tickets</span>
              <h2>上映時間、席、チケットを確認する。</h2>
              <p>窓口で希望を伝え、スクリーンや売り切れを短く尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.tickets} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cinema-access" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">アクセス · Subtitles and access</span>
              <h2>字幕、年齢制限、行き方を確認する。</h2>
              <p>自分や一緒に行く人が安心して観られるように、必要な情報を先に尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.access} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cinema-reactions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">感想 · Discussing the film</span>
              <h2>感動も不満も、自分の言葉で伝える。</h2>
              <p>映画をほめる表現と、少し厳しい感想をやわらかく伝える表現を比べます。</p>
            </div>
            <GreetingVocabularySection section={learn.reactions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cinema-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>確認して、観て、感想を交換する。</h2>
              <p>映画館へ入る前と、見終わったあとに起こる3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="cinema-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>film と movie、rubbish の地域差を知る。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What time is the next screening? · Is this the subtitled screening? · How good was that?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>cinema · film · movie theater · blow me away · rubbish</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function TheatreLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('theatre-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['theatre-why', 'theatre-tickets', 'theatre-before', 'theatre-vocabulary', 'theatre-dialogues', 'theatre-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['theatre-why', '劇場英語の役割'],
    ['theatre-tickets', 'チケット窓口'],
    ['theatre-before', '開演前と休憩'],
    ['theatre-vocabulary', '劇場内の単語'],
    ['theatre-dialogues', '会話の練習'],
    ['theatre-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page theatre-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="theatre-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>公演の前と途中に、必要な情報を確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">劇場の言葉が分かると、案内を聞きながら舞台の世界に入りやすくなります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="劇場で席や公演について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="劇場の会話を進める方法" />

          <section id="theatre-tickets" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">窓口 · At the box office</span>
              <h2>チケット、席、クロークを確認する。</h2>
              <p>予約番号や空席を尋ね、公演に入る前の小さな疑問を解決します。</p>
            </div>
            <GreetingVocabularySection section={learn.tickets} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="theatre-before" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">開演前 · Before the performance</span>
              <h2>席へ進み、休憩時間を聞き取る。</h2>
              <p>チケットを見せ、開演前の案内と interval の情報を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.before} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="theatre-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Inside the theatre</span>
              <h2>舞台と客席の場所を具体的に言う。</h2>
              <p>audience、stage、set、stalls など、案内や感想に出てくる言葉をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="theatre-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>受け取って、座って、舞台を楽しむ。</h2>
              <p>チケット窓口、開演前、劇場内の3つの場面を短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="theatre-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>劇場用語の地域差を、聞いて分かるようにする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m picking up the tickets… · Is there an interval? · Where is the cloakroom?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>theatre / theater · stalls / orchestra seats · interval / intermission</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ConcertsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('concerts-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['concerts-why', 'concerts-concert', 'concerts-festival', 'concerts-classical', 'concerts-dialogues', 'concerts-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['concerts-why', '音楽イベントの役割'],
    ['concerts-concert', 'コンサート会場'],
    ['concerts-festival', '野外フェス'],
    ['concerts-classical', 'クラシックコンサート'],
    ['concerts-dialogues', '会話の練習'],
    ['concerts-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page concerts-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="concerts-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>音楽を楽しみながら、必要な情報を確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">音楽イベントでは、案内を聞くことと感動を分かち合うことが一つになります。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="コンサートやフェスで話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="コンサートとフェスティバルの会話を進める方法" />

          <section id="concerts-concert" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">コンサート · At a concert</span>
              <h2>入場、出演時間、待ち合わせを確認する。</h2>
              <p>入り口で手荷物検査に対応し、出演時間や会場内の場所を短く尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.concert} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="concerts-festival" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">野外フェス · Open-air festival</span>
              <h2>フェスの場所と案内を共有する。</h2>
              <p>出演者、キャンプサイト、テント、フードトラック、列などを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.festival} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="concerts-classical" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">クラシック · Classical concert</span>
              <h2>予約して、演奏の感動を伝える。</h2>
              <p>無料の演奏会に誘い、予約の必要を確認し、演奏への感想を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.classical} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="concerts-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>入場して、合流して、感動を分かち合う。</h2>
              <p>スタッフの案内を聞き、友人と場所や出演時間を確認し、演奏の感想を交換します。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="concerts-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“gig” と “queue” を聞き取って、現場で使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What time does the main gig start? · I&apos;ll meet you back in the main arena. · That was really impressive!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>gig · turn up · queue / queue up · line-up</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GymLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('gym-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['gym-why', 'gym-membership', 'gym-classes', 'gym-vocabulary', 'gym-dialogues', 'gym-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['gym-why', 'ジム英語の役割'],
    ['gym-membership', '入会と見学'],
    ['gym-classes', 'クラス参加'],
    ['gym-vocabulary', 'ジムの単語'],
    ['gym-dialogues', '会話の練習'],
    ['gym-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page gym-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="gym-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>運動を始める前に、必要なことを確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">ジムの英語は、情報を得ることと、活動に参加することをつなぎます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="ジムの利用について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="ジムの会話を進める方法" />

          <section id="gym-membership" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">入会 · Joining a gym</span>
              <h2>料金、施設、クラスを確認する。</h2>
              <p>入会前に知っておきたい条件を尋ね、見学をして、自分に合うプランを選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.membership} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="gym-classes" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">クラス · Attending a class</span>
              <h2>クラスに参加し、必要なことを尋ねる。</h2>
              <p>初めてのクラスでも、参加方法や器具の使い方を短く確認できます。</p>
            </div>
            <GreetingVocabularySection section={learn.classes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="gym-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Vocabulary at the gym</span>
              <h2>運動の種類と、ジムで聞く言葉を知る。</h2>
              <p>work out、spin class、HIIT など、会話や案内に出てくる基本語彙をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="gym-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>見学して、参加して、器具を譲り合う。</h2>
              <p>スタッフや他の利用者との3つの場面を、短い会話で聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="gym-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>work out と sign me up を聞き取って使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>How much does it cost to join? · I&apos;m here for the spin class. · Are you using this machine?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>work out · sign me up · show you round · HIIT</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SportsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('sports-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['sports-why', 'sports-team', 'sports-centre', 'sports-vocabulary', 'sports-dialogues', 'sports-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['sports-why', 'スポーツ英語の役割'],
    ['sports-team', 'チームスポーツ'],
    ['sports-centre', 'スポーツセンター'],
    ['sports-vocabulary', 'スポーツの単語'],
    ['sports-dialogues', '会話の練習'],
    ['sports-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page sports-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="sports-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>状況に合わせて、短く明確に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">スポーツでは、短い一言がチームの動きと安全を支えます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="スポーツの予定やプレイについて話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="スポーツの会話を進める方法" />

          <section id="sports-team" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">チーム · Team games</span>
              <h2>誘って、練習を確認し、試合中に声をかける。</h2>
              <p>友人を誘う表現から、Pass it! や Man on! のような短い掛け声までをまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.team} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-centre" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">施設 · At the sports centre</span>
              <h2>レッスン、セッション、コートを予約する。</h2>
              <p>受付で必要なことを尋ね、場所が分からないときにも短く助けを求めます。</p>
            </div>
            <GreetingVocabularySection section={learn.centre} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Sports vocabulary</span>
              <h2>競技名の違いを聞き取る。</h2>
              <p>football、cricket、athletics など、英語圏でよく聞くスポーツ名をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>誘って、予約して、必要なときに短く声をかける。</h2>
              <p>チームの予定、施設の受付、コートの場所という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="sports-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“I’m up for that” と “Man on!” を使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Wanna join us for a game of baseball? · I&apos;m up for that. · Pass it! · Over here!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>football · athletics · cricket · Man on!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SportsEventsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('sports-events-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['sports-events-why', 'sports-events-tickets', 'sports-events-watching', 'sports-events-vocabulary', 'sports-events-dialogues', 'sports-events-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['sports-events-why', '観戦英語の役割'],
    ['sports-events-tickets', 'チケットと質問'],
    ['sports-events-watching', '観戦と応援'],
    ['sports-events-vocabulary', 'イベントの単語'],
    ['sports-events-dialogues', '会話の練習'],
    ['sports-events-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page sports-events-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="sports-events-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>情報を得て、同じ瞬間を応援する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">スポーツイベントの英語は、情報を得ることと感情を分かち合うことをつなぎます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="スポーツイベントを観戦しながら話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="スポーツイベントの会話を進める方法" />

          <section id="sports-events-tickets" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">チケット · Buying tickets</span>
              <h2>発売日、残席、座席や割引を確認する。</h2>
              <p>観戦の計画を立て、窓口で必要な情報を短く尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.tickets} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-events-watching" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">観戦 · Watching sport</span>
              <h2>放送を見つけて、チームを力強く応援する。</h2>
              <p>試合が見られるかを確認し、始まったら短い声で気持ちを表します。</p>
            </div>
            <GreetingVocabularySection section={learn.watching} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-events-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Sports-event vocabulary</span>
              <h2>チケットと観戦に出てくる言葉を知る。</h2>
              <p>tournament、final、spectator、sell out など、案内や会話の基本語彙をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="sports-events-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>チケットを取り、放送を見つけ、チームを応援する。</h2>
              <p>観戦の計画、スポーツバーでの確認、試合中の応援という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="sports-events-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“You bet!” と “sell out” を観戦の場で使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>When do tickets go on sale? · Are you showing the football here? · Come on, guys!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>You bet! · sell out · season ticket · spectator</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HobbiesLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('hobbies-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['hobbies-why', 'hobbies-starting', 'hobbies-asking', 'hobbies-talking', 'hobbies-dialogues', 'hobbies-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['hobbies-why', '趣味を話す意味'],
    ['hobbies-starting', '新しい趣味'],
    ['hobbies-asking', '趣味を尋ねる'],
    ['hobbies-talking', '続けた期間'],
    ['hobbies-dialogues', '会話の練習'],
    ['hobbies-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page hobbies-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="hobbies-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>自分が選んだ楽しみを、言葉にする。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">趣味について話すと、その人が何を楽しみ、自由な時間をどう過ごすかが見えてきます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="趣味について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="趣味の会話を進める方法" />

          <section id="hobbies-starting" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">始める · Starting a new hobby</span>
              <h2>新しい挑戦を紹介し、相手を応援する。</h2>
              <p>Guess what? や give it a go のような、会話を明るく始める表現を学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.starting} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hobbies-asking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">尋ねる · Asking about hobbies</span>
              <h2>趣味と自由時間の共通点を見つける。</h2>
              <p>相手の趣味を聞き、自分の活動も動詞を使って自然に答えます。</p>
            </div>
            <GreetingVocabularySection section={learn.asking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hobbies-talking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">期間 · Talking about experience</span>
              <h2>いつから、どれくらい続けているかを伝える。</h2>
              <p>for は期間の長さ、since は始めた時点に使います。</p>
            </div>
            <GreetingVocabularySection section={learn.talking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
            <div className="greetings-recap">
              <div><span className="section-kicker">for · 長さ</span><p>for 10 years · for three years · for six months</p></div>
              <div><span className="section-kicker">since · 起点</span><p>since I was 11 · since I was a child · since last year</p></div>
            </div>
          </section>

          <section id="hobbies-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>始めて、尋ねて、続けている期間を話す。</h2>
              <p>新しい趣味、自由時間、長く続けている活動という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="hobbies-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>“My hobby is…” より、動詞で生き生きと話す。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I play tennis. · I like reading. · I&apos;ve been playing the sax for 10 years.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>give it a go · take up · for + a period · since + a starting point</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ShopsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('shops-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['shops-why', 'shops-city', 'shops-types', 'shops-money', 'shops-dialogues', 'shops-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['shops-why', '街の言葉の地図'],
    ['shops-city', '街の場所'],
    ['shops-types', 'お店の種類'],
    ['shops-money', '支払いと返品'],
    ['shops-dialogues', '会話の練習'],
    ['shops-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page shops-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="shops-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>街を歩くための、言葉の地図を持つ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">場所の名前が分かると、必要な助けやサービスへ自分で近づけます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="街の店とサービスについて話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="店とサービスの会話を進める方法" />

          <section id="shops-city" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">場所 · The city centre</span>
              <h2>必要なサービスがどこにあるかを見つける。</h2>
              <p>地図、案内、街での会話に出てくる施設の名前をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.city} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="shops-types" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">店 · Types of shop</span>
              <h2>「何を買える場所か」を英語で分かるようにする。</h2>
              <p>昔ながらの専門店から、街でよく見る店まで、名前と役割をつなげます。</p>
            </div>
            <GreetingVocabularySection section={learn.types} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="shops-money" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">支払い · Money matters</span>
              <h2>支払い、返品、交換、返金をはっきり伝える。</h2>
              <p>レジでの小さな確認から、商品に問題があったときの依頼まで練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.money} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="shops-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>場所を見つけ、支払い、必要なら返品する。</h2>
              <p>街でサービスを探す、レジで支払う、店員に依頼するという3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="shops-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>小さな単語が、街での安心につながる。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Where is the cash machine? · Can I pay by contactless? · Could I have a refund?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>petrol station · loyalty card · receipt · queue</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function MarketLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('market-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['market-why', 'market-bargain', 'market-produce', 'market-units', 'market-dialogues', 'market-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['market-why', '市場の会話の役割'],
    ['market-bargain', '値段の交渉'],
    ['market-produce', '食材を買う'],
    ['market-units', '数え方と単位'],
    ['market-dialogues', '会話の練習'],
    ['market-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page market-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="market-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>欲しいものを、値段と量まで伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">市場の英語は、欲しいものを選び、条件を一緒に決める会話です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="市場で買い物をしながら話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="市場の会話を進める方法" />

          <section id="market-bargain" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">交渉 · Getting a bargain</span>
              <h2>丁寧に価格を相談し、条件を決める。</h2>
              <p>市場やフリーマーケットで、予算と相手の提示額をすり合わせます。</p>
            </div>
            <GreetingVocabularySection section={learn.bargain} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="market-produce" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">食材 · Buying fresh produce</span>
              <h2>値段、重さ、個数を確認して注文する。</h2>
              <p>量り売りや箱入りの商品を、欲しい量に合わせて選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.produce} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="market-units" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単位 · Food market vocabulary</span>
              <h2>食材の形や容器に合わせて数える。</h2>
              <p>ひと房、ひと瓶、1キロなど、食材に合う単位を使います。</p>
            </div>
            <GreetingVocabularySection section={learn.units} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="market-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>値段を聞き、量を選び、買うと決める。</h2>
              <p>交渉、食材の注文、単位と価格の確認という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="market-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>please を添えて、自然にお願いする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What&apos;s your best price? · Could I have a box of eggs? · I&apos;ll take it!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>punnet · per kilo · You&apos;ve got a deal! · final offer</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SupermarketLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('supermarket-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['supermarket-why', 'supermarket-asking', 'supermarket-checkout', 'supermarket-vocabulary', 'supermarket-dialogues', 'supermarket-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['supermarket-why', '買い物英語の役割'],
    ['supermarket-asking', '商品を尋ねる'],
    ['supermarket-checkout', 'レジとセルフレジ'],
    ['supermarket-vocabulary', '売り場の単語'],
    ['supermarket-dialogues', '会話の練習'],
    ['supermarket-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page supermarket-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="supermarket-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>日常の買い物を、自分の力で進める。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">小さな質問ができると、スーパーで選べるものが増えていきます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="スーパーで買い物をしながら話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="スーパーの会話を進める方法" />

          <section id="supermarket-asking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">商品 · Asking for things</span>
              <h2>売り場と在庫を尋ね、必要な量をお願いする。</h2>
              <p>aisle、stock、deli など、スーパーで実際に聞こえる表現を使います。</p>
            </div>
            <GreetingVocabularySection section={learn.asking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="supermarket-checkout" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">レジ · At the checkout</span>
              <h2>袋、カード、レシートを落ち着いて確認する。</h2>
              <p>有人レジとセルフレジで、聞かれたことに短く答えます。</p>
            </div>
            <GreetingVocabularySection section={learn.checkout} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="supermarket-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Aisles</span>
              <h2>売り場の看板を読めるようにする。</h2>
              <p>食材、日用品、健康・美容用品など、通路の案内をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="supermarket-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>商品を見つけ、レジを通り、問題を解決する。</h2>
              <p>売り場を尋ねる、レジで答える、店員に問題を知らせるという3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="supermarket-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>aisle と checkout を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Where are the cereals? · Do you stock oat milk? · This barcode won&apos;t scan.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>aisle · checkout · self-checkout · go through</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GardenLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('garden-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['garden-why', 'garden-buying', 'garden-care', 'garden-vocabulary', 'garden-dialogues', 'garden-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['garden-why', '園芸英語の役割'],
    ['garden-buying', '植物を選ぶ'],
    ['garden-care', 'お手入れを尋ねる'],
    ['garden-vocabulary', '道具と土の単語'],
    ['garden-dialogues', '会話の練習'],
    ['garden-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page garden-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="garden-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>植物に合う場所とお世話を、言葉で確かめる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">植物を選ぶことは、植物が必要とする条件を一緒に見つけることです。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="園芸店で植物について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="園芸店の会話を進める方法" />

          <section id="garden-buying" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">選ぶ · Buying plants</span>
              <h2>自分の家に合う植物を相談する。</h2>
              <p>日当たり、置き場所、初心者向きかどうかを伝えて選びます。</p>
            </div>
            <GreetingVocabularySection section={learn.buying} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garden-care" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">手入れ · Plant care</span>
              <h2>水、日光、肥料、土について尋ねる。</h2>
              <p>植える時期や冬越し、雑草の対処まで、具体的な質問を練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.care} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garden-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Gardening</span>
              <h2>道具と土の名前を使い分ける。</h2>
              <p>spade と trowel など、大きさや用途の違いにも注目します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garden-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>植物を選び、育て方を聞き、道具を決める。</h2>
              <p>植物の希望、手入れ、土と道具という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="garden-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>spade と trowel を用途で選ぶ。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>How much sunlight do they need? · How often should I feed it? · What&apos;s a good compost to use?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>be after · look after · get rid of · trowel</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function DiyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('diy-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['diy-why', 'diy-advice', 'diy-tools', 'diy-vocabulary', 'diy-dialogues', 'diy-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['diy-why', 'DIY英語の役割'],
    ['diy-advice', '作業を相談する'],
    ['diy-tools', '工具を探す'],
    ['diy-vocabulary', '工具と動詞の単語'],
    ['diy-dialogues', '会話の練習'],
    ['diy-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page diy-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="diy-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>作業の目的を説明して、必要なものを相談する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">何をしたいかを伝えられれば、必要な道具への道が開きます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="DIYストアで作業について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="DIYストアの会話を進める方法" />

          <section id="diy-advice" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">相談する · Asking for advice</span>
              <h2>作業を説明し、合う材料を相談する。</h2>
              <p>やすりがけ、タイル貼り、塗装など、目的を具体的に伝えて助言をもらいます。</p>
            </div>
            <GreetingVocabularySection section={learn.advice} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="diy-tools" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">探す · Buying tools</span>
              <h2>工具売り場で場所と種類を確認する。</h2>
              <p>売り場、担当者、コードレス工具、購入時のIDなどを尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.tools} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="diy-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Tools and home improvements</span>
              <h2>工具と作業の動詞を使い分ける。</h2>
              <p>hammer、screwdriver、saw などの道具と、paint、sand、fill などの作業を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="diy-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>作業を説明し、道具を選び、安全を確認する。</h2>
              <p>アドバイス、工具探し、購入条件という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="diy-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>ID と for + -ing を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What would you recommend for sanding a table? · Can you show me to the tools section? · Will I need ID to buy this saw?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>I'm after... · cordless · power tools · fill a crack</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ClothesLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('clothes-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['clothes-why', 'clothes-shop', 'clothes-shoes', 'clothes-vocabulary', 'clothes-dialogues', 'clothes-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['clothes-why', '買い物英語の役割'],
    ['clothes-shop', '洋服を試す'],
    ['clothes-shoes', '靴の在庫を尋ねる'],
    ['clothes-vocabulary', '服と靴の単語'],
    ['clothes-dialogues', '会話の練習'],
    ['clothes-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page clothes-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="clothes-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>サイズ、着心地、好みを言葉で確かめる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">自分に合うかを確かめることも、買い物の大切な会話です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="洋服店でサイズと試着について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="洋服と靴の買い物を進める方法" />

          <section id="clothes-shop" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">試す · At the clothes shop</span>
              <h2>洋服のサイズを変えて、試着をお願いする。</h2>
              <p>大きさや着心地を伝え、別のサイズや試着室について尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.clothes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="clothes-shoes" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">確認する · At the shoe shop</span>
              <h2>靴のサイズ、在庫、セールを確認する。</h2>
              <p>ウェブサイトの情報も使いながら、店員に自然に尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.shoes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="clothes-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Clothes and shoes</span>
              <h2>イギリス英語の服と靴の名前を覚える。</h2>
              <p>trousers、jumper、trainers など、買い物でよく聞く単語に慣れます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="clothes-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>サイズを試し、在庫を確認し、セールを尋ねる。</h2>
              <p>洋服、靴、セールという3つの買い物の場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="clothes-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>trousers、jumper、trainers を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Have you got this shirt in a larger size? · Can I try these dresses on, please? · Are these boots in the sale?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>trousers · jumper · trainers · in stock</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ReturnsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('returns-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['returns-why', 'returns-problem', 'returns-refund', 'returns-vocabulary', 'returns-dialogues', 'returns-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['returns-why', '返品英語の役割'],
    ['returns-problem', '問題を説明する'],
    ['returns-refund', '返金と交換'],
    ['returns-vocabulary', '返品の単語'],
    ['returns-dialogues', '会話の練習'],
    ['returns-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page returns-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="returns-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>問題と希望する対応を、はっきり伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">何が起きたかを説明できれば、次の対応を一緒に探せます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="返品カウンターで商品について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="返品の会話を進める方法" />

          <section id="returns-problem" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">説明する · Explaining the problem</span>
              <h2>返品の理由を短く、具体的に伝える。</h2>
              <p>色、サイズ、フィット感、不具合、破損など、何が問題かを説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.problem} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="returns-refund" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">選択肢を確認する · Refunds and exchanges</span>
              <h2>返金、交換、商品券について尋ねる。</h2>
              <p>オンライン購入、注文番号、レシートがない場合の対応も確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.refund} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="returns-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Returns</span>
              <h2>return、refund、exchange を使い分ける。</h2>
              <p>返品したいのか、返金してほしいのか、別の商品に替えたいのかを言葉で分けます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="returns-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>理由を説明し、返金や交換の方法を確認する。</h2>
              <p>返品理由、返金、レシートなしという3つのカウンターの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="returns-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>return、refund、exchange を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I need to return these trousers. · Can I get a refund? · I lost my receipt.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>returns desk · order number · voucher · in exchange</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HairBeautyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('hair-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['hair-why', 'hair-appointment', 'hair-styling', 'hair-beauty', 'hair-dialogues', 'hair-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['hair-why', 'サロン英語の役割'],
    ['hair-appointment', '予約を取る'],
    ['hair-styling', '髪型を相談する'],
    ['hair-beauty', '美容サービス'],
    ['hair-dialogues', '会話の練習'],
    ['hair-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page hair-beauty-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="hair-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>希望を伝えて、専門家の提案を理解する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">自分に似合うスタイルは、会話しながら一緒に見つけられます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="サロンで髪型について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="サロンの会話を進める方法" />

          <section id="hair-appointment" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">予約する · Making an appointment</span>
              <h2>空き時間とメニューを確認する。</h2>
              <p>希望の日時を伝え、予約でいっぱいなら別の時間を提案します。</p>
            </div>
            <GreetingVocabularySection section={learn.appointment} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hair-styling" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">相談する · Consulting the stylist</span>
              <h2>長さ、前髪、トップの希望を具体的に伝える。</h2>
              <p>いつものスタイル、軽いトリム、写真を見せた相談まで練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.styling} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hair-beauty" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">整える · Beauty and grooming</span>
              <h2>ネイルやフェイシャルの施術を確認する。</h2>
              <p>色を選び、予約しているサービスを自然に確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.beauty} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hair-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>予約を取り、髪型と施術の希望を確認する。</h2>
              <p>予約、スタイリング、ビューティーサービスという3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="hair-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>trim、fringe、I&apos;m afraid を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I just need a quick trim. · Not too much off the top, please. · I&apos;d like a manicure and polish.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>fully booked · fit me in · fringe · blow-dry</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function PostLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('post-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['post-why', 'post-office', 'post-delivery', 'post-vocabulary', 'post-dialogues', 'post-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['post-why', '郵便英語の役割'],
    ['post-office', '郵便局で送る'],
    ['post-delivery', '料金と宅配'],
    ['post-vocabulary', '郵便の単語'],
    ['post-dialogues', '会話の練習'],
    ['post-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page post-office-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="post-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>送る場所、速さ、料金を英語で確かめる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">目的地と希望する速さを伝えれば、発送方法を一緒に選べます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="郵便局で小包について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="郵便と宅配便の会話を進める方法" />

          <section id="post-office" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">発送と受け取り · At the post office</span>
              <h2>荷物を送り、受け取り、切手を尋ねる。</h2>
              <p>小包を発送する、切手を買う、窓口で荷物を受け取る流れを練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.postOffice} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="post-delivery" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">料金と宅配 · Courier service</span>
              <h2>料金、日数、宅配便の方法を確認する。</h2>
              <p>最速の方法や集荷、当日配達、受け取りのサインについて尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.delivery} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="post-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Sending and receiving</span>
              <h2>parcel、scales、courier を使い分ける。</h2>
              <p>郵便局や配送会社の案内でよく見る単語を、場面と一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="post-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>荷物を送り、受け取り、問題を伝える。</h2>
              <p>発送、受け取り、配達トラブルという3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="post-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>pop と parcel を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I need to send this parcel. · How soon will my parcel arrive? · My parcel hasn&apos;t arrived.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>first class · special delivery · courier · sign for</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FinanceLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('finance-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['finance-why', 'finance-bank', 'finance-currency', 'finance-payments', 'finance-vocabulary', 'finance-dialogues', 'finance-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['finance-why', '金融英語の役割'],
    ['finance-bank', '銀行の手続き'],
    ['finance-currency', '外貨とカード'],
    ['finance-payments', '支払いと割り勘'],
    ['finance-vocabulary', '金融の単語'],
    ['finance-dialogues', '会話の練習'],
    ['finance-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page finance-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="finance-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>お金のことを、正確に安全に確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">方法、金額、相手を確認できれば、お金のやり取りも落ち着いて進められます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="銀行でお金について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="お金と金融の会話を進める方法" />

          <section id="finance-bank" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">銀行の手続き · Opening an account</span>
              <h2>口座を開き、入金と引き出しを確認する。</h2>
              <p>身分証明書、オンラインアクセス、預金口座への入金、現金の引き出しを練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.bank} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finance-currency" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">外貨とカード · Currency and card problems</span>
              <h2>紙幣、両替レート、カードの問題を伝える。</h2>
              <p>外貨の受け取り、紙幣の希望、ATMやカード紛失のトラブルを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.currency} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finance-payments" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">支払いと割り勘 · Ways to pay</span>
              <h2>現金、カード、チップ、割り勘を相談する。</h2>
              <p>支払い方法を伝え、立て替えや送金を自然に相談します。</p>
            </div>
            <GreetingVocabularySection section={learn.payments} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finance-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Money and finance</span>
              <h2>account、currency、cash machine を使い分ける。</h2>
              <p>銀行や支払いの案内でよく見る単語を、場面と一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finance-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>口座、カード、支払いの場面で話す。</h2>
              <p>銀行口座、ATMのトラブル、割り勘という3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="finance-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>notes、cash machine、swallow を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I'd like to open a bank account. · I'll pay by card. · Shall we split it three ways?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>small or large notes · exchange rate · bank details · swallow my card</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function LibraryLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('library-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['library-why', 'library-joining', 'library-using', 'library-more', 'library-vocabulary', 'library-dialogues', 'library-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['library-why', '図書館英語の役割'],
    ['library-joining', '利用登録をする'],
    ['library-using', '本と設備を使う'],
    ['library-more', '返却と検索'],
    ['library-vocabulary', '図書館の単語'],
    ['library-dialogues', '会話の練習'],
    ['library-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page library-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="library-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>図書館を、英語で自分の場所にする。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">登録、貸出、返却を尋ねられれば、必要な資料や場所へ自分で進めます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="図書館でスタッフに相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="図書館の会話を進める方法" />

          <section id="library-joining" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">登録する · Joining the library</span>
              <h2>利用登録と講座について尋ねる。</h2>
              <p>身分証明書、住所証明、コンピューター講座について確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.joining} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="library-using" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">利用する · Using the library</span>
              <h2>本を借り、音声資料とパソコンを使う。</h2>
              <p>セルフスキャナー、オーディオブック、自習スペースの利用を練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.using} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="library-more" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">窓口で尋ねる · More phrases</span>
              <h2>返却、延長、本探しを具体的に尋ねる。</h2>
              <p>貸出期限を延長し、返却場所やおすすめの本を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.more} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="library-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Library services</span>
              <h2>take out、renew、due back を使い分ける。</h2>
              <p>図書館の案内やスタッフとの会話でよく見る単語を、場面と一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="library-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>登録、貸出、延長の場面で話す。</h2>
              <p>利用登録、本を借りる、返却期限を延長する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="library-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>take out と renew を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>How do I join the library? · I&apos;d like to take these books out. · I need to renew these books.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>proof of address · library card · due back · archive</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function WorkStudyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('work-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['work-why', 'work-jobs', 'work-education', 'work-world', 'work-vocabulary', 'work-dialogues', 'work-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['work-why', '仕事と学習の役割'],
    ['work-jobs', '職業を説明する'],
    ['work-education', '学校と大学'],
    ['work-world', '働き方と給与'],
    ['work-vocabulary', '仕事の単語'],
    ['work-dialogues', '会話の練習'],
    ['work-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page work-study-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="work-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>何を学び、どのように働くかを説明する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">職業、学び方、働き方を言葉にできれば、自分の毎日を相手に伝えられます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="仕事と学習について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="仕事と学習の会話を進める方法" />

          <section id="work-jobs" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">職業 · Jobs and occupations</span>
              <h2>自分や相手の職業を具体的に伝える。</h2>
              <p>サービス、医療、建築、販売、ケアなど、さまざまな仕事の名前を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.jobs} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="work-education" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">学校と大学 · School and college</span>
              <h2>授業、試験、学位について話す。</h2>
              <p>時間割、講義、試験の結果、卒業や学位に関する表現を学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.education} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="work-world" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">仕事の世界 · The world of work</span>
              <h2>雇用形態、給与、勤務時間、休暇を確認する。</h2>
              <p>正社員かパートか、給与や福利厚生、残業や休暇について話します。</p>
            </div>
            <GreetingVocabularySection section={learn.work} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="work-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Work and study</span>
              <h2>take an exam、salary、annual leave を使い分ける。</h2>
              <p>仕事や学習の案内でよく見る単語を、場面と一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="work-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>職業、学校、給与と休暇の場面で話す。</h2>
              <p>働き方を説明する、試験について話す、雇用条件を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="work-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>take、salary、wages を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I work full-time. · I&apos;m taking a degree in engineering. · I get annual leave.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>employer · employee · hourly rate · payslip · benefits</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function SchoolLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('school-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['school-why', 'school-info', 'school-first-day', 'school-subjects', 'school-vocabulary', 'school-dialogues', 'school-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['school-why', '学校英語の役割'],
    ['school-info', '学校を選ぶ'],
    ['school-first-day', '初登校と面談'],
    ['school-subjects', '学校の科目'],
    ['school-vocabulary', '学校の単語'],
    ['school-dialogues', '会話の練習'],
    ['school-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page school-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="school-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>学校の仕組みと、子どもの成長を支える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">授業や学校生活について尋ねられれば、先生と一緒に子どもの成長を見守れます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="学校で先生と保護者が話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="学校の会話を進める方法" />

          <section id="school-info" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">学校を選ぶ · Choosing a school</span>
              <h2>カリキュラム、宿題、活動について尋ねる。</h2>
              <p>授業の頻度、クラス人数、制服、クラブなど、学校生活の仕組みを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.schoolInfo} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="school-first-day" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">初登校と面談 · Starting school</span>
              <h2>初日の不安をやわらげ、学習状況を確認する。</h2>
              <p>新しい生徒を迎え、学校への適応や英語の進歩を保護者面談で話します。</p>
            </div>
            <GreetingVocabularySection section={learn.firstDay} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="school-subjects" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">科目 · School subjects</span>
              <h2>maths、science、PE などの科目を確認する。</h2>
              <p>時間割や学校の説明でよく使う科目名を、イギリス英語の形で学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.subjects} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="school-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · At school</span>
              <h2>curriculum、settle in、make progress を使い分ける。</h2>
              <p>学校の案内や先生との会話でよく見る単語を、場面と一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="school-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>学校選び、初登校、保護者面談の場面で話す。</h2>
              <p>学校の質問、子どもを迎える会話、学習の進み具合を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="school-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>maths、settle in、get on with を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Is music part of the curriculum? · How much homework is there? · She&apos;s making good progress.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>Parents&apos; evening · settle in · get on with English · maths</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HigherEducationLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('higher-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['higher-why', 'higher-courses', 'higher-campus', 'higher-life', 'higher-vocabulary', 'higher-dialogues', 'higher-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['higher-why', '高等教育の役割'],
    ['higher-courses', 'コースを選ぶ'],
    ['higher-campus', 'キャンパスで話す'],
    ['higher-life', '学生生活と支援'],
    ['higher-vocabulary', '大学の単語'],
    ['higher-dialogues', '会話の練習'],
    ['higher-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page higher-education-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="higher-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>情報を探し、人とつながり、学びを選ぶ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">必要な質問ができれば、広いキャンパスでも自分の学び方を見つけられます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="大学のキャンパスで学生同士が話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="大学と専門学校の会話を進める方法" />

          <section id="higher-courses" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">コースを選ぶ · Choosing a course</span>
              <h2>期間、資格、入学要件、実習を確認する。</h2>
              <p>どこに相談すればよいか、どのように出願するか、留学の機会があるかを尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.courses} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="higher-campus" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">キャンパス · First day and finding your way</span>
              <h2>初日に出会い、教室や学部への道を尋ねる。</h2>
              <p>講義で自己紹介し、自転車置き場や biology department の場所を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.campus} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="higher-life" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">学生生活 · Settling in and support</span>
              <h2>専攻、ホームシック、支援、クラブ活動について話す。</h2>
              <p>最初の週の近況を話し、友達作りや金銭的援助について相談します。</p>
            </div>
            <GreetingVocabularySection section={learn.studentLife} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="higher-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Higher education</span>
              <h2>course、department、sign up を使い分ける。</h2>
              <p>大学や専門学校の案内、学生サポート、クラブ活動でよく見る単語を学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="higher-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>コース、キャンパス、学生生活の場面で話す。</h2>
              <p>コースを問い合わせる、道を聞く、クラブに参加する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="higher-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>do、Freshers&apos; Fair、give it a miss を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m doing medicine. · Who can I talk to about financial help? · I&apos;d be up for that!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>entry requirements · study abroad · Freshers&apos; Fair · give it a miss</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function LookingForWorkLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('job-search-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['job-search-why', 'job-searching', 'job-agency', 'job-questions', 'job-vocabulary', 'job-dialogues', 'job-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['job-search-why', '仕事探しの役割'],
    ['job-searching', '求人を探す'],
    ['job-agency', '紹介所で相談する'],
    ['job-questions', 'よく聞かれる質問'],
    ['job-vocabulary', '仕事探しの単語'],
    ['job-dialogues', '会話の練習'],
    ['job-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page looking-for-work-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="job-search-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>仕事と自分の経験を、適切につなげる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">求人の条件と自分の強みを言葉にできれば、よりよいマッチを探せます。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="仕事探しについて相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="仕事探しの会話を進める方法" />

          <section id="job-searching" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">求人を探す · Job searching</span>
              <h2>求人広告の条件と応募方法を確認する。</h2>
              <p>柔軟な時間、経験不要、店頭の vacancy、CV の提出について尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.searching} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-agency" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">職業紹介所 · Employment agency</span>
              <h2>希望職種とこれまでの職歴を伝える。</h2>
              <p>パートの販売職、飲食店での server 経験、働ける時間を相談します。</p>
            </div>
            <GreetingVocabularySection section={learn.agency} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問に答える · Questions you may hear</span>
              <h2>スキル、時間、経験、給与の希望を答える。</h2>
              <p>応募先からの質問に、できることと希望条件を具体的に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Looking for work</span>
              <h2>CV、vacant、skills を使い分ける。</h2>
              <p>求人サイト、履歴書、紹介所、面談でよく見る単語を場面と一緒に学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>求人、紹介所、面談の場面で話す。</h2>
              <p>店頭求人を尋ねる、職歴を伝える、希望条件に答える3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="job-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>CV、vacancy、server を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m looking for a part-time sales job. · I worked as a server last summer. · What salary are you looking for?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>CV · vacancy · flexible hours · no experience needed</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function ApplyingForJobLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('job-application-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['job-application-why', 'job-application-cv', 'job-application-forms', 'job-application-vocabulary', 'job-application-dialogues', 'job-application-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['job-application-why', '応募プロセスの役割'],
    ['job-application-cv', 'CVを準備する'],
    ['job-application-forms', '応募フォームに記入する'],
    ['job-application-vocabulary', '応募の単語'],
    ['job-application-dialogues', '会話の練習'],
    ['job-application-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page applying-for-job-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="job-application-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>自分が提供できることを、応募書類で伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">正確な情報と必要な書類を、締め切りまでに届けることが応募の一歩です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="応募書類について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="求人に応募する会話を進める方法" />

          <section id="job-application-cv" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">履歴書を準備する · Preparing a CV</span>
              <h2>CVを更新し、締め切りと必要書類を確認する。</h2>
              <p>オンラインの参考例を見ながら、履歴書と covering letter を提出する準備をします。</p>
            </div>
            <GreetingVocabularySection section={learn.preparing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-application-forms" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">応募フォーム · Application forms</span>
              <h2>個人情報を記入し、長いフォームを一度保存する。</h2>
              <p>fill in、taking ages、take a break を使って、入力の進み具合を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.forms} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-application-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Job applications</span>
              <h2>CV、deadline、application form を使い分ける。</h2>
              <p>求人広告を見つけてから、応募書類を提出するまでの基本語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-application-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>準備、入力、提出前の確認を声に出す。</h2>
              <p>CVを更新する、応募フォームを完成させる、必要書類を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="job-application-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>CV、covering letter、fill in を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I must update my CV! · It says the deadline is tomorrow. · I need to fill in my personal details.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>loads of · covering letter · taking ages · ready to go</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function JobInterviewsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('job-interview-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['job-interview-why', 'job-interview-motivation', 'job-interview-strengths', 'job-interview-questions', 'job-interview-vocabulary', 'job-interview-dialogues', 'job-interview-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['job-interview-why', '面接の役割'],
    ['job-interview-motivation', '志望動機と貢献'],
    ['job-interview-strengths', '自己アピール'],
    ['job-interview-questions', 'その他の質問'],
    ['job-interview-vocabulary', '面接の単語'],
    ['job-interview-dialogues', '会話の練習'],
    ['job-interview-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page job-interviews-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="job-interview-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>経験と強みを、会社への貢献につなげる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">面接は、正解を当てる場ではなく、自分が提供できる価値を伝える場です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="面接で経験と強みを伝える場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="面接で自分を伝える方法" />

          <section id="job-interview-motivation" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">志望動機と貢献 · Motivation and contribution</span>
              <h2>なぜ合うのか、何をもたらせるのかを答える。</h2>
              <p>資格、経験、熱意、アイデア、planning skills を具体的に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.motivation} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-interview-strengths" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">自己アピール · Talking about yourself</span>
              <h2>強みを、I am... と I have... で伝える。</h2>
              <p>reliable、organized、self-motivated、track record などの言葉で働き方を説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.strengths} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-interview-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">その他の質問 · More questions you may hear</span>
              <h2>将来の目標、給与、開始時期まで準備する。</h2>
              <p>経験、強み、転職理由、notice period、salary、start date に答えます。</p>
            </div>
            <GreetingVocabularySection section={learn.moreQuestions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-interview-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Job interviews</span>
              <h2>position、qualifications、track record を使い分ける。</h2>
              <p>面接官の質問と自己アピールでよく使う語彙を、働く場面と一緒に学びます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="job-interview-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>質問を聞き、強みと希望条件を答える。</h2>
              <p>志望動機、自己アピール、給与と開始時期の3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="job-interview-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>強みは、具体的に、自信を持って伝える。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I'm reliable and organized. · I'm self-motivated. · I have an excellent track record.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>be keen to · qualifications · notice period · salary expectations</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function StartingNewJobLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('new-job-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['new-job-why', 'new-job-setting-up', 'new-job-colleagues', 'new-job-routines', 'new-job-vocabulary', 'new-job-dialogues', 'new-job-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['new-job-why', '新しい職場の役割'],
    ['new-job-setting-up', '初日の挨拶と準備'],
    ['new-job-colleagues', '同僚との会話'],
    ['new-job-routines', 'ルールと安全'],
    ['new-job-vocabulary', '職場の単語'],
    ['new-job-dialogues', '会話の練習'],
    ['new-job-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page starting-new-job-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="new-job-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>質問しながら、新しい職場に入っていく。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">最初から全部を知る必要はありません。分からないことを尋ねることも仕事のスキルです。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="新しい職場で案内を受ける場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="新しい職場で会話を進める方法" />

          <section id="new-job-setting-up" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">初日の挨拶と準備 · Setting up</span>
              <h2>受付、入館証、ロッカー、メールを確認する。</h2>
              <p>初日の挨拶をして、supervisor、locker、email accountについて尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.settingUp} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="new-job-colleagues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">同僚との会話 · Meeting colleagues</span>
              <h2>慣れてきたことを伝え、必要なら助けを求める。</h2>
              <p>I'm getting there!、get stuck、ランチへの誘いを、同僚との自然な会話で練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.colleagues} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="new-job-routines" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">ルールと安全 · Health & Safety</span>
              <h2>休憩、clock out、安全装備を確認する。</h2>
              <p>仕事の流れを理解し、安全規則が分からないときは質問します。</p>
            </div>
            <GreetingVocabularySection section={learn.routines} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="new-job-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Starting a new job</span>
              <h2>pass、supervisor、shift、hard hat を使い分ける。</h2>
              <p>初日の案内、仕事の設定、同僚との会話、安全ルールで使う語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="new-job-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>初日、同僚、ルール確認の場面で話す。</h2>
              <p>初日の挨拶、同僚との声かけ、安全と勤務ルールの3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="new-job-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>I'm getting there、get stuck、clock out を味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I'm getting there! · Let me know if you get stuck. · I'm stuck.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>pass · supervisor · clock in / clock out · hard hat</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function WorkplaceLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('workplace-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['workplace-why', 'workplace-routines', 'workplace-issues', 'workplace-vocabulary', 'workplace-dialogues', 'workplace-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['workplace-why', '職場の役割'],
    ['workplace-routines', '日常ルーティン'],
    ['workplace-issues', 'トラブルと要望'],
    ['workplace-vocabulary', '職場の単語'],
    ['workplace-dialogues', '会話の練習'],
    ['workplace-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page workplace-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="workplace-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>必要な情報を共有し、周りの人と調整する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">職場の英語は、難しい言葉より、予定と問題を分かりやすく伝える力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="職場で予定を共有する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="職場で会話を進める方法" />

          <section id="workplace-routines" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">日常ルーティン · Workplace routines</span>
              <h2>会議、休憩、予定を一緒に管理する。</h2>
              <p>team meeting、staff meeting、diary、lunch break、tea breakを使って予定を共有します。</p>
            </div>
            <GreetingVocabularySection section={learn.routines} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="workplace-issues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">トラブルと要望 · Workplace issues</span>
              <h2>シフト変更と機械の不具合を伝える。</h2>
              <p>be down for、till is down、keeps crashingを使って、変更や問題を報告します。</p>
            </div>
            <GreetingVocabularySection section={learn.issues} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="workplace-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · At work</span>
              <h2>meeting、shift、supervisor、colleagueを使い分ける。</h2>
              <p>職場のスケジュール、役職、設備、勤務時間に関する語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="workplace-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>ルーティン、シフト、トラブルを短く報告する。</h2>
              <p>会議と休憩、シフト変更、レジの不具合の3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="workplace-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>diary、be down for、till、keeps crashingを味方にする。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I'll put it in my diary. · Could I change to the afternoon? · This till is down again.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>full staff meeting · be down for · clock in / clock out · keeps crashing</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function WorkMeetingsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('meeting-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['meeting-why', 'meeting-agenda', 'meeting-turns', 'meeting-ending', 'meeting-vocabulary', 'meeting-dialogues', 'meeting-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['meeting-why', '会議の役割'],
    ['meeting-agenda', 'アジェンダ'],
    ['meeting-turns', '発言と意見'],
    ['meeting-ending', '締めくくりと交流'],
    ['meeting-vocabulary', '会議の単語'],
    ['meeting-dialogues', '会話の練習'],
    ['meeting-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page work-meetings-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="meeting-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>会議に参加し、グループとして結論に近づく。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">会議の英語は、たくさん話すことより、話し合いを前に進める力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="職場の会議で意見を共有する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="会議で会話を進める方法" />

          <section id="meeting-agenda" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">アジェンダ · Setting the agenda</span>
              <h2>会議を始め、議題と順番を共有する。</h2>
              <p>get started、agenda、First up、move onを使って、全員に会議の地図を渡します。</p>
            </div>
            <GreetingVocabularySection section={learn.agenda} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="meeting-turns" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">発言と意見 · Taking turns</span>
              <h2>確認し、割り込み、全員の考えを聞く。</h2>
              <p>Just to clarify、Could I just jump in?、on boardで自然に議論へ参加します。</p>
            </div>
            <GreetingVocabularySection section={learn.turns} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="meeting-ending" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">締めくくりと交流 · Wrap-up & networking</span>
              <h2>決定事項をまとめ、次の行動と関係をつなぐ。</h2>
              <p>wrap up、action points、stay in touchで会議後まで話を進めます。</p>
            </div>
            <GreetingVocabularySection section={learn.ending} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="meeting-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Work meetings</span>
              <h2>agenda、input、action points、follow upを使い分ける。</h2>
              <p>会議の進行、発言、合意、フォローアップに関する語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="meeting-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a meeting</span>
              <h2>議題、発言、締めくくりを一つの会議につなげる。</h2>
              <p>アジェンダを設定する、意見交換に入る、決定事項と交流をまとめる3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="meeting-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>クッションと比喩表現で、会議を前に進める。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Could I just jump in? · I'm 100% on board with this. · Any questions before we wrap up?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>agenda · non-starter · action points · Here's my card.</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function OnlineMeetingsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('online-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['online-why', 'online-start', 'online-connection', 'online-next', 'online-vocabulary', 'online-dialogues', 'online-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['online-why', 'オンライン会議の役割'],
    ['online-start', '始め方'],
    ['online-connection', '接続トラブル'],
    ['online-next', '次回の予定'],
    ['online-vocabulary', '会議の単語'],
    ['online-dialogues', '会話の練習'],
    ['online-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page online-meetings-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="online-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>技術的な問題があっても、会話を分かりやすく保つ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">オンライン会議の英語は、接続の状態を短く伝え、全員を会話に戻す力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="オンライン会議で画面と音声を確認する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="オンライン会議で会話を進める方法" />

          <section id="online-start" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">始め方 · Getting started</span>
              <h2>画面、音声、参加者を確認して始める。</h2>
              <p>get going、share my screen、on mute、run throughで、会議の最初の流れを整えます。</p>
            </div>
            <GreetingVocabularySection section={learn.start} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="online-connection" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">接続トラブル · Connection problems</span>
              <h2>音声や画面の状態を短く共有する。</h2>
              <p>drop out、frozen、lose someoneを使って、接続の変化をすぐに伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.connection} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="online-next" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">次回の予定 · The next meeting</span>
              <h2>次の会議を組み、招待を送る。</h2>
              <p>put in a meeting、follow-up、inviteで、会議の続きを具体的な予定にします。</p>
            </div>
            <GreetingVocabularySection section={learn.next} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="online-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Online meetings</span>
              <h2>mute、connection、screen share、rejoinを使い分ける。</h2>
              <p>音声、映像、接続、予定調整に関する語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="online-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into an online meeting</span>
              <h2>始める、直す、次回につなげる。</h2>
              <p>会議を立ち上げる、接続不良に対応する、次回の予定を決める3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="online-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>短い状態説明で、会議を止めない。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Can you hear me? · I&apos;ll share my screen. · Try leaving the meeting and joining again.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>drop out · frozen · put in a meeting · invite</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HomeLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('home-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['home-why', 'home-homes', 'home-rooms', 'home-improvements', 'home-vocabulary', 'home-dialogues', 'home-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['home-why', '家について話す役割'],
    ['home-homes', '住宅の種類'],
    ['home-rooms', '部屋と場所'],
    ['home-improvements', '修繕とリフォーム'],
    ['home-vocabulary', '家電と家具'],
    ['home-dialogues', '会話の練習'],
    ['home-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page home-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="home-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>住まいを説明し、暮らしを具体的に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">家について話す英語は、場所、もの、作業をつないで、自分の暮らしを見せる力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="家や暮らしについて話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="家について会話を進める方法" />

          <section id="home-homes" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">住宅 · Homes and neighbourhoods</span>
              <h2>どんな家に住んでいるかを説明する。</h2>
              <p>flat、detached、semi-detached、terracedなど、住まいの形を具体的に伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.homes} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="home-rooms" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">場所 · Rooms and home areas</span>
              <h2>部屋と家の中の場所を案内する。</h2>
              <p>upstairs、downstairs、hallway、balconyなどを使って、家の中を順番に説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.rooms} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="home-improvements" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">修繕 · Home improvements</span>
              <h2>直す場所と、する作業をはっきり伝える。</h2>
              <p>paint、grout、fill、rewire、put up、buildを使って、DIYやリフォームの予定を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.improvements} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="home-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Appliances & furniture</span>
              <h2>家電と家具の名前を使い分ける。</h2>
              <p>家の中にあるものを言えると、場所の説明や故障の相談がもっと具体的になります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="home-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>住まい、案内、修繕を一つの流れで話す。</h2>
              <p>どんな家に住んでいるか話す、家の中を案内する、修繕を相談する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="home-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>flat、住宅形態、cot、wardrobeの地域差を知る。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I live in a flat. · The bedrooms are upstairs. · I&apos;m going to paint the door.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>semi-detached · terraced · cot · wardrobe · block of flats</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FindingHomeLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('finding-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['finding-why', 'finding-requirements', 'finding-viewing', 'finding-tenancy', 'finding-vocabulary', 'finding-dialogues', 'finding-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['finding-why', '新居探しの役割'],
    ['finding-requirements', '希望条件'],
    ['finding-viewing', '内見とオファー'],
    ['finding-tenancy', '賃貸とトラブル'],
    ['finding-vocabulary', '新居探しの単語'],
    ['finding-dialogues', '会話の練習'],
    ['finding-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page finding-home-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="finding-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>希望を伝え、契約前に大切なことを確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">新居探しの英語は、条件、感想、契約をつないで、自分に合う場所を選ぶ力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-online-wishes.svg" alt="新しい家について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="新居探しの会話を進める方法" />

          <section id="finding-requirements" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">条件 · Saying what you want</span>
              <h2>立地、階、寝室数を具体的に伝える。</h2>
              <p>property、ground floor、one-bedroom、at leastを使って、譲れない条件を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.requirements} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-viewing" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">内見 · Viewing & offers</span>
              <h2>物件の感想を言い、オファーにつなげる。</h2>
              <p>location、layout、needs work、under the asking priceで、気に入った点と交渉を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.viewing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-tenancy" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">契約 · Renting a home</span>
              <h2>家賃、契約、入居後の不具合を確認する。</h2>
              <p>tenancy agreement、deposit、furnished、utility billsを契約前に尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.tenancy} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Finding a home</span>
              <h2>広告、内見、契約で見る単語を整理する。</h2>
              <p>物件探しから大家とのやり取りまで、必要な語彙をひとまとまりで覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>条件、内見、契約を一つの流れで話す。</h2>
              <p>希望物件を伝える、内見後にオファーを相談する、賃貸条件と不具合を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="finding-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>ground floor、furnished、asking priceの意味を正確に。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m looking for a flat on the ground floor. · Are utility bills included? · The washing machine is leaking.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>put in an offer · under the asking price · tenancy agreement · deposit</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function MovingHouseLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('moving-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['moving-why', 'moving-packing', 'moving-day', 'moving-unpacking', 'moving-vocabulary', 'moving-dialogues', 'moving-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['moving-why', '引っ越しの役割'],
    ['moving-packing', '荷造りと準備'],
    ['moving-day', '引っ越し当日'],
    ['moving-unpacking', '荷解き'],
    ['moving-vocabulary', '引っ越しの単語'],
    ['moving-dialogues', '会話の練習'],
    ['moving-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page moving-house-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="moving-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>今何をしているか、何をしてほしいかを伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">引っ越しの英語は、荷物、場所、順番を共有して、みんなで作業を進める力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="引っ越しの準備について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="引っ越しの会話を進める方法" />

          <section id="moving-packing" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">準備 · Packing up</span>
              <h2>箱を集め、荷造りと積み込みを確認する。</h2>
              <p>move house、spare boxes、pack up、load the vanで、引っ越しの準備を共有します。</p>
            </div>
            <GreetingVocabularySection section={learn.packing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="moving-day" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">当日 · Moving day</span>
              <h2>鍵を受け取り、どこから作業するか指示する。</h2>
              <p>pick up the keys、Where do you want us to start?、take the boxesで、当日の流れを進めます。</p>
            </div>
            <GreetingVocabularySection section={learn.movingDay} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="moving-unpacking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">新居 · Unpacking & settling in</span>
              <h2>荷解きを終え、作業をねぎらう。</h2>
              <p>unpack、move in、settle inを使って、作業の完了と次の予定を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.unpacking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="moving-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Moving house</span>
              <h2>日付、箱、鍵、車両を使い分ける。</h2>
              <p>引っ越しの予定と作業に関する基本語彙をまとめて覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="moving-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a moving day</span>
              <h2>準備、当日、荷解きを一つの流れで話す。</h2>
              <p>箱を集めて積み込む、鍵を受け取って作業を指示する、荷解きを終えて休む3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="moving-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>move house、move in、move outを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m moving house! · Let&apos;s load the removal van! · That&apos;s the unpacking done!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>move out · move in · spare boxes · removal van · by the weekend</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function NeighboursLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('neighbours-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['neighbours-why', 'neighbours-introductions', 'neighbours-socializing', 'neighbours-information', 'neighbours-vocabulary', 'neighbours-dialogues', 'neighbours-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['neighbours-why', '近所づきあいの役割'],
    ['neighbours-introductions', '自己紹介と挨拶'],
    ['neighbours-socializing', '社交とお誘い'],
    ['neighbours-information', '情報共有'],
    ['neighbours-vocabulary', '近所の単語'],
    ['neighbours-dialogues', '会話の練習'],
    ['neighbours-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page neighbours-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="neighbours-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>親しみを持って、地域との関係を始める。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">近所づきあいの英語は、完璧さより、挨拶と小さな親切をつなぐ力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="近所の人に挨拶する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="近所の人との会話を進める方法" />

          <section id="neighbours-introductions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">挨拶 · Introducing yourself</span>
              <h2>新しい隣人として、短く自己紹介する。</h2>
              <p>next door、downstairs、moved here fromを使って、住んでいる場所や出身地を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.introductions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="neighbours-socializing" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">社交 · Socializing</span>
              <h2>お茶、ランチ、パーティーに自然に誘う。</h2>
              <p>housewarming、pop over、come over、I&apos;d love toで、負担の少ない誘いと返事を練習します。</p>
            </div>
            <GreetingVocabularySection section={learn.socializing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="neighbours-information" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">地域情報 · Sharing information</span>
              <h2>グループチャットと地域の情報を活用する。</h2>
              <p>local group chat、plumber、around hereを使って、近所の情報を尋ねたり共有したりします。</p>
            </div>
            <GreetingVocabularySection section={learn.information} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="neighbours-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Neighbourhood life</span>
              <h2>人、場所、集まり、助けを表す単語を整理する。</h2>
              <p>近所の暮らしで見聞きする言葉を、挨拶や誘いと結びつけて覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="neighbours-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>挨拶、招待、情報交換を一つの流れで話す。</h2>
              <p>新しい隣人として自己紹介する、家での集まりに誘う、地域の情報を交換する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="neighbours-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>pop over、housewarming、kind of youを温かく使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;ve just moved in next door. · Would you like to pop over? · Does anyone know a good plumber?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>housewarming gift · local group chat · get to know · That&apos;s so kind of you!</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HouseholdChoresLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('chores-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['chores-why', 'chores-sharing', 'chores-cleaning', 'chores-routines', 'chores-vocabulary', 'chores-dialogues', 'chores-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['chores-why', '家事の役割'],
    ['chores-sharing', '家事の分担'],
    ['chores-cleaning', '大掃除'],
    ['chores-routines', '日常の家事'],
    ['chores-vocabulary', '家事の単語'],
    ['chores-dialogues', '会話の練習'],
    ['chores-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page chores-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="chores-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>家事の内容と役割を、分かりやすく調整する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">家事の英語は、作業の名前だけでなく、誰の番か、何を手伝ってほしいかを共有する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="家事の分担について話す場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="家事の会話を進める方法" />

          <section id="chores-sharing" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">分担 · Sharing tasks</span>
              <h2>家事の当番と、前回の担当を確認する。</h2>
              <p>rota、whose turn、washing-up、put awayで、家事の順番と手伝いを自然に調整します。</p>
            </div>
            <GreetingVocabularySection section={learn.sharing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="chores-cleaning" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">大掃除 · Spring cleaning</span>
              <h2>掃除の成果と、家の状態を振り返る。</h2>
              <p>There we go、proper spring clean、tidier、in a right stateで、作業前後の変化を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.cleaning} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="chores-routines" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">日常 · Everyday chores</span>
              <h2>洗濯、掃除、ゴミ出しを具体的に頼む。</h2>
              <p>do the laundry、do the vacuuming、make the bedなど、毎日の動作を分かりやすく言います。</p>
            </div>
            <GreetingVocabularySection section={learn.routines} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="chores-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Housework vocabulary</span>
              <h2>do と make、掃除と片付けの語彙を整理する。</h2>
              <p>家事の動作を短いフレーズで覚え、当番や依頼の会話にすぐ使えるようにします。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="chores-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>分担、大掃除、日常の依頼を一つの流れで話す。</h2>
              <p>当番表を確認する、大掃除の成果を話す、洗濯物を片付ける3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="chores-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>do と make、turn と put away を使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Whose turn is it? · Can you help me put it away? · I need to do the laundry.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>rota · a proper spring clean · in a right state · make the bed</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HomeImprovementsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('improvements-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['improvements-why', 'improvements-diy', 'improvements-professional', 'improvements-vocabulary', 'improvements-dialogues', 'improvements-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['improvements-why', 'リフォームの役割'],
    ['improvements-diy', 'DIYの進め方'],
    ['improvements-professional', '業者への依頼'],
    ['improvements-vocabulary', 'リフォームの単語'],
    ['improvements-dialogues', '会話の練習'],
    ['improvements-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page home-improvements-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="improvements-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>何を直したいか、どこまで進んだかを伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">リフォームの英語は、作業、費用、材料を共有して、安心して家を変えていく力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="住宅のリフォームについて相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="住宅リフォームの会話を進める方法" />

          <section id="improvements-diy" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">DIY · Decorating</span>
              <h2>進み具合と、残っている作業を共有する。</h2>
              <p>How are you getting on?、all up、grouting、one more coatで、作業の現在地を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.diy} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="improvements-professional" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">業者 · Hiring a professional</span>
              <h2>作業内容を説明し、訪問見積もりを頼む。</h2>
              <p>put up、come round、give us a quoteを使って、業者との条件を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.professional} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="improvements-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Home improvements</span>
              <h2>quote、fit、put up、I reckonを使い分ける。</h2>
              <p>施工方法と費用の言葉を、DIYや業者への依頼と結びつけて覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="improvements-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>DIY、業者への電話、見積もり確認をつなげる。</h2>
              <p>作業の進捗を話す、訪問見積もりを頼む、材料と価格を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="improvements-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>quote、put up、fit、I reckonを自然に使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>How are you getting on? · Give us a quote · Will you supply the materials?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>grouting · one more coat · put up · I reckon</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function PetsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('pets-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['pets-why', 'pets-adopting', 'pets-vet', 'pets-care', 'pets-vocabulary', 'pets-dialogues', 'pets-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['pets-why', 'ペットとの責任'],
    ['pets-adopting', '保護動物を迎える'],
    ['pets-vet', '動物病院で伝える'],
    ['pets-care', '日常のケア'],
    ['pets-vocabulary', 'ペットの単語'],
    ['pets-dialogues', '会話の練習'],
    ['pets-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page pets-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="pets-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>ペットの状態と必要なケアを、正確に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">ペットの英語は、かわいさだけでなく、相性、症状、ケアを共有して守る力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="ペットについて相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="ペットについての会話を進める方法" />

          <section id="pets-adopting" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">里親 · Adopting a rescue animal</span>
              <h2>動物の性格と家庭環境との相性を尋ねる。</h2>
              <p>adopt、home a dog、good with children、be afterで、迎えたいペットの希望を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.adopting} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pets-vet" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">診察 · Seeing the vet</span>
              <h2>症状、変化、検査の必要を具体的に伝える。</h2>
              <p>gone off her food、broken leg、keeps being sick、losing furで、ペットの様子を説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.vet} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pets-care" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">ケア · Pet care</span>
              <h2>予防接種、ノミ駆除、渡航手続きを確認する。</h2>
              <p>microchip、flea treatment、pet passport、vaccinationsを、順番に手配します。</p>
            </div>
            <GreetingVocabularySection section={learn.care} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pets-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Pets &amp; healthcare</span>
              <h2>症状、動物病院、家庭環境の語彙を整理する。</h2>
              <p>he / she、X-ray、groomingなど、ペットとの暮らしで見聞きする言葉をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pets-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>里親相談、診察、ケアの手続きをつなげる。</h2>
              <p>相性を尋ねる、症状を説明する、必要な手続きを確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="pets-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>he / she、be sick、go off foodを自然に使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Is she good with children? · My cat keeps being sick. · Will we need an X-ray?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>rescue animal · go off her food · flea treatment · pet passport</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HomeEmergenciesLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('emergency-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['emergency-why', 'emergency-power', 'emergency-professional', 'emergency-problems', 'emergency-vocabulary', 'emergency-dialogues', 'emergency-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['emergency-why', '緊急トラブルの役割'],
    ['emergency-power', '電気のトラブル'],
    ['emergency-professional', '業者への依頼'],
    ['emergency-problems', 'その他の故障'],
    ['emergency-vocabulary', 'トラブルの単語'],
    ['emergency-dialogues', '会話の練習'],
    ['emergency-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page home-emergencies-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="emergency-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>問題の場所と状態を、できるだけ分かりやすく伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">緊急トラブルの英語は、落ち着いて症状を伝え、必要な助けにつなげる力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="家のトラブルについて相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="家の緊急トラブルの会話を進める方法" />

          <section id="emergency-power" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">電気 · Power problems</span>
              <h2>停電を確認し、復旧したかを伝える。</h2>
              <p>power has gone off、fuse box、switch has flipped、back onで、電気の状態を共有します。</p>
            </div>
            <GreetingVocabularySection section={learn.power} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="emergency-professional" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">修理 · Professional help</span>
              <h2>水漏れの症状と、訪問時間・料金を確認する。</h2>
              <p>leaking、callout charge、has been dripping、keeps going coldで、業者に状況を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.professional} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="emergency-problems" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">その他 · More problems</span>
              <h2>水回り、屋根、暖房、窓の故障を指し示す。</h2>
              <p>leaking roof、overflowing toilet、no hot water、heating won&apos;t come onで場所と状態を具体化します。</p>
            </div>
            <GreetingVocabularySection section={learn.emergencies} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="emergency-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Home emergencies</span>
              <h2>壊れた場所と状態を、短い語句で整理する。</h2>
              <p>broken window、burst pipe、blocked sink、power cutなど、修理依頼で役立つ語彙を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="emergency-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>停電、修理依頼、設備トラブルをつなげる。</h2>
              <p>電気を確認する、水漏れの業者を呼ぶ、給湯や暖房の問題を説明する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="emergency-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>power cut、callout charge、keep -ingを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>The power has gone off. · My dishwasher&apos;s leaking. · There&apos;s no hot water.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>power cut · callout charge · burst pipe · broken-down boiler</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HomeEntertainmentLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('entertainment-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['entertainment-why', 'entertainment-watching', 'entertainment-gaming', 'entertainment-controls', 'entertainment-vocabulary', 'entertainment-dialogues', 'entertainment-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['entertainment-why', '楽しみ方を相談する'],
    ['entertainment-watching', 'テレビ・動画'],
    ['entertainment-gaming', 'ゲーム'],
    ['entertainment-controls', '操作とトラブル'],
    ['entertainment-vocabulary', 'エンタメの単語'],
    ['entertainment-dialogues', '会話の練習'],
    ['entertainment-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page home-entertainment-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="entertainment-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>楽しみながら、自分の希望や反応を自然に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">ホームエンターテインメントの英語は、見るもの、遊ぶもの、機器の状態を一緒に楽しむ力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="家でテレビやゲームを楽しむ場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="ホームエンターテインメントの会話を進める方法" />

          <section id="entertainment-watching" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">テレビ · Watching TV</span>
              <h2>番組を選び、感想と音量を共有する。</h2>
              <p>What shall we watch?、check out、streaming、turn it upで、見るものを一緒に決めます。</p>
            </div>
            <GreetingVocabularySection section={learn.watching} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="entertainment-gaming" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">ゲーム · Gaming</span>
              <h2>勝負の反応、時間のルール、休憩を伝える。</h2>
              <p>so gonna、screen time、Just five more minutes、grab a bite to eatで、ゲーム中の気持ちを表します。</p>
            </div>
            <GreetingVocabularySection section={learn.gaming} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="entertainment-controls" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">操作 · Controls &amp; problems</span>
              <h2>字幕、コントローラー、画面の不具合を確認する。</h2>
              <p>turn on the subtitles、another controller、frozen、plugged inで、機器の状態を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.controls} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="entertainment-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Home entertainment</span>
              <h2>テレビ、音声、ゲーム、スマート機器を整理する。</h2>
              <p>remote、subtitles、console、controllerなど、家のエンタメで使う単語を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="entertainment-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>番組選び、ゲーム、機器の操作をつなげる。</h2>
              <p>見る番組と音量を決める、ゲームの勝負と休憩を話す、字幕や機器を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="entertainment-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>so gonna、frozen、grab a bite、screen timeを使う。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What shall we watch tonight? · My tablet has frozen! · Shall we play the next level?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>so gonna · screen time · grab a bite to eat · plugged in</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GettingAroundLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('getting-around-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['getting-around-why', 'getting-around-transport', 'getting-around-verbs', 'getting-around-essentials', 'getting-around-vocabulary', 'getting-around-dialogues', 'getting-around-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['getting-around-why', '移動の役割'],
    ['getting-around-transport', '乗り物の種類'],
    ['getting-around-verbs', '移動の動詞'],
    ['getting-around-essentials', '切符と案内表示'],
    ['getting-around-vocabulary', '交通の単語'],
    ['getting-around-dialogues', '会話の練習'],
    ['getting-around-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page getting-around-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="getting-around-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>どこへ、どうやって、今どうなっているかを伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">移動の英語は、乗り物、切符、乗り場、運行情報をつないで目的地へ進む力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="移動手段について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="移動の会話を進める方法" />

          <section id="getting-around-transport" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">乗り物 · Transport</span>
              <h2>道路、鉄道、空港、港の乗り物を見分ける。</h2>
              <p>lorry、coach、taxi rank、car parkなど、イギリス英語の交通語彙も一緒に覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.transport} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="getting-around-verbs" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">動詞 · Getting on and off</span>
              <h2>乗る、降りる、タッチする、送るを表現する。</h2>
              <p>board、take off、tap in / tap out、give someone a liftで、移動の動作を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.verbs} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="getting-around-essentials" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">案内 · Travel essentials</span>
              <h2>切符、出発時刻、案内板、遅延を確認する。</h2>
              <p>single / return、e-ticket、departure board、On Time、delayed、cancelledを読み取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.essentials} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="getting-around-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Transport signs</span>
              <h2>駅や空港で見聞きする表示を整理する。</h2>
              <p>platform number、destinations、passengers、queueなど、移動中の案内に慣れます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="getting-around-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>交通手段、切符、遅延への対応をつなげる。</h2>
              <p>乗り場と送迎を決める、切符とホームを確認する、遅延に対応する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="getting-around-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>lorry、coach、single ticket、tap inを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Where&apos;s the taxi rank? · A single ticket, please. · Is the train on time?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>lorry · coach · tap in / tap out · power cut</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function BusesCoachesLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('buses-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['buses-why', 'buses-getting', 'buses-questions', 'buses-coach', 'buses-vocabulary', 'buses-dialogues', 'buses-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['buses-why', 'バス移動の役割'],
    ['buses-getting', 'バスに乗る'],
    ['buses-questions', 'バスの質問'],
    ['buses-coach', '長距離バス'],
    ['buses-vocabulary', 'バスの単語'],
    ['buses-dialogues', '会話の練習'],
    ['buses-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page buses-coaches-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="buses-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>このバスで合っているか、どこで降りるかを確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">バスの英語は、行き先、停留所、運賃、時間をつないで、知らない場所でも安心して移動する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="バスの行き先について尋ねる場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="バス移動の会話を進める方法" />

          <section id="buses-getting" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">乗車 · Getting the bus</span>
              <h2>行き先、経由地、運賃、降車場所を確認する。</h2>
              <p>go to、via、a single to、contactless、next stopで、路線バスに乗る流れを話します。</p>
            </div>
            <GreetingVocabularySection section={learn.gettingBus} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="buses-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問 · More questions</span>
              <h2>バス停、運賃、次の便、最終便を尋ねる。</h2>
              <p>nearest bus stop、right stop for、fare、last busで、必要な情報を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="buses-coach" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">長距離 · Coach journeys</span>
              <h2>到着時刻と、トイレやWi-Fiなどの設備を尋ねる。</h2>
              <p>coach、right at the back、on board、log on toで、長距離移動を快適にします。</p>
            </div>
            <GreetingVocabularySection section={learn.coach} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="buses-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Buses &amp; coaches</span>
              <h2>路線バスと長距離バスの語彙を整理する。</h2>
              <p>bus、coach、single、return、contactless、on boardを、実際の移動と結びつけて覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="buses-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>路線バス、時刻確認、長距離バスの設備をつなげる。</h2>
              <p>行き先と運賃を確認する、停留所と時間を尋ねる、車内設備を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="buses-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>bus と coach、single と return、via と on boardを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Does this bus go to the town centre? · Can I have a single? · Is there Wi-Fi on board?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>via · contactless · right at the back · log on to</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function TrainMetroLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('train-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['train-why', 'train-tickets', 'train-station', 'train-onboard', 'train-vocabulary', 'train-dialogues', 'train-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['train-why', '鉄道移動の役割'],
    ['train-tickets', '切符の購入'],
    ['train-station', '駅での情報確認'],
    ['train-onboard', '車内・地下鉄'],
    ['train-vocabulary', '鉄道の単語'],
    ['train-dialogues', '会話の練習'],
    ['train-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page train-metro-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="train-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>どの電車に乗り、どこで乗り降りするかを確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">電車と地下鉄の英語は、切符、ホーム、停車駅、運行情報をつないで目的地へ進む力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="駅で電車の情報を尋ねる場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="電車と地下鉄の会話を進める方法" />

          <section id="train-tickets" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">切符 · Buying tickets</span>
              <h2>片道・往復、座席、改札の方法を確認する。</h2>
              <p>single、return、reserve a seat、ticket barrier、tap inで切符の購入を進めます。</p>
            </div>
            <GreetingVocabularySection section={learn.tickets} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="train-station" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">駅 · Asking for information</span>
              <h2>ホーム、発車時刻、停車駅、次の便を尋ねる。</h2>
              <p>platform、massive queue、due、left yetで、駅の状況を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.station} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="train-onboard" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">車内 · On the train &amp; metro</span>
              <h2>車内設備、乗り換え、停車駅、安全案内を理解する。</h2>
              <p>buffet car、carriage、mind the gap、strong windsによる遅延を聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.onboard} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="train-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Train &amp; metro travel</span>
              <h2>駅、車両、改札、遅延表示の語彙を整理する。</h2>
              <p>ticket barrier、waiting room、carriage、gap、stopsなど、鉄道利用で見聞きする単語を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="train-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>切符購入、駅の質問、車内案内をつなげる。</h2>
              <p>切符とホームを確認する、停車駅と乗り換えを尋ねる、車内設備と安全案内を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="train-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>single、return、due、mind the gapを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>A single to Leeds, please. · Which platform? · How many stops is it to Victoria?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>due · ticket barrier · buffet car · carriage</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function AirportLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('airport-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['airport-why', 'airport-departures', 'airport-cabin', 'airport-arrivals', 'airport-vocabulary', 'airport-dialogues', 'airport-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['airport-why', '空港移動の役割'],
    ['airport-departures', '出発・保安検査'],
    ['airport-cabin', '搭乗・機内'],
    ['airport-arrivals', '到着・レンタカー'],
    ['airport-vocabulary', '空港の単語'],
    ['airport-dialogues', '会話の練習'],
    ['airport-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page airport-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="airport-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>空港の手続きを理解し、次に何をすればいいか確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">空港の英語は、出発前から到着後まで、場所と手続きをつないで安心して旅を進める力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="空港でフライトの情報を尋ねる場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="空港で会話を進める方法" />

          <section id="airport-departures" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">出発 · Departures &amp; security</span>
              <h2>フライト、荷物、保安検査、ゲートを確認する。</h2>
              <p>on time、bag drop、scanner、boarding、gate closeで、出発前の流れを話します。</p>
            </div>
            <GreetingVocabularySection section={learn.departures} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="airport-cabin" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">機内 · Boarding &amp; in the cabin</span>
              <h2>搭乗券、荷物、機内アナウンス、着陸前の指示を理解する。</h2>
              <p>boarding pass、overhead locker、turbulence、seat belt、upright positionを聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.cabin} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="airport-arrivals" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">到着 · Arrivals &amp; car hire</span>
              <h2>入国審査、手荷物受け取り、両替、レンタカーを進める。</h2>
              <p>purpose of your trip、baggage reclaim、trolley、hire car、Bayを使って到着後の案内を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.arrivals} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="airport-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Airport &amp; cabin</span>
              <h2>座席、機内設備、空港の案内語彙を整理する。</h2>
              <p>window seat、aisle seat、tray table、life jacketなど、空港や機内で見聞きする単語を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="airport-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>出発、機内、到着後のやり取りをつなげる。</h2>
              <p>フライトと保安検査を確認する、機内の指示を聞く、入国審査と手荷物受け取りを進める3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="airport-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>bag drop、trolley、hire car、aisle seatを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Is the flight on time? · Which gate is it for Athens? · What is the purpose of your trip?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>bag drop · trolley · hire car · Bay · turbulence</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CyclingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('cycling-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['cycling-why', 'cycling-buying', 'cycling-hiring', 'cycling-problems', 'cycling-parts', 'cycling-dialogues', 'cycling-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['cycling-why', '自転車の役割'],
    ['cycling-buying', '購入と質問'],
    ['cycling-hiring', 'レンタサイクル'],
    ['cycling-problems', 'トラブル'],
    ['cycling-parts', 'パーツの単語'],
    ['cycling-dialogues', '会話の練習'],
    ['cycling-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page cycling-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="cycling-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>用途と状態を伝えて、自転車を安心して使う。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">自転車の英語は、何に使うか、どこに返すか、どこが壊れたかをつないで移動を支える力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="自転車店で用途を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="自転車の会話を進める方法" />

          <section id="cycling-buying" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">購入 · Buying a bike</span>
              <h2>用途、タイプ、予算、試乗について相談する。</h2>
              <p>commuter bike、e-bike、budget、test rideで、自分に合う自転車を探します。</p>
            </div>
            <GreetingVocabularySection section={learn.buying} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cycling-hiring" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">レンタル · Hiring a bike</span>
              <h2>アプリで借りて、決められた場所へ返す。</h2>
              <p>hire、download the app、parking baysを使って、シェアサイクルの流れを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.hiring} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cycling-problems" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">トラブル · Bike problems</span>
              <h2>チェーン、タイヤ、ブレーキ、バッテリーの状態を説明する。</h2>
              <p>broken、flat、loose、needs chargingで、修理に必要な情報を短く伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.problems} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cycling-parts" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Parts of a bicycle</span>
              <h2>自転車のパーツと修理の動詞を整理する。</h2>
              <p>saddle、handlebars、spokes、gears、tyre、brakeなど、修理や購入で使う語彙を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.parts} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="cycling-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>購入、レンタル、トラブルのやり取りをつなげる。</h2>
              <p>用途と試乗を相談する、シェアサイクルを借りる、故障の状態を説明する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="cycling-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>flat tyre、hire、commuter bikeを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I need a bike to get to and from work. · How do I hire this city bike? · The front tyre is flat.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>commuter bike · e-bike · parking bays · spokes · gears</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function TaxisLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('taxis-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['taxis-why', 'taxis-taking', 'taxis-booking', 'taxis-extras', 'taxis-vocabulary', 'taxis-dialogues', 'taxis-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['taxis-why', 'タクシー移動の役割'],
    ['taxis-taking', '乗車・降車'],
    ['taxis-booking', '事前予約'],
    ['taxis-extras', '追加フレーズ'],
    ['taxis-vocabulary', 'タクシーの単語'],
    ['taxis-dialogues', '会話の練習'],
    ['taxis-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page taxis-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="taxis-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>行き先と希望を、短くはっきり伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">タクシーの英語は、乗り場、行き先、荷物、支払いをつないで、知らない場所でも安心して移動する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="タクシーの行き先を伝える場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="タクシーで会話を進める方法" />

          <section id="taxis-taking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">乗車 · Taking a taxi</span>
              <h2>乗り場、住所、荷物、降車場所、料金を確認する。</h2>
              <p>taxi rank、address、boot、drop me、fareを使って、乗車から支払いまで話します。</p>
            </div>
            <GreetingVocabularySection section={learn.taking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="taxis-booking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">予約 · Booking in advance</span>
              <h2>人数、時間、行き先、荷物の数を伝えて予約する。</h2>
              <p>book a taxi、four of us、travelling to、pieces of luggage、all bookedで予約の流れを確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.booking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="taxis-extras" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">追加のお願い · More phrases</span>
              <h2>所要時間、途中の立ち寄り、支払い、忘れ物を伝える。</h2>
              <p>extra stop、keep the change、contactless、ride-share、assistance dogなど、乗車中の希望を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.extras} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="taxis-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Taxis</span>
              <h2>乗り物、荷物、支払い、配車の語彙を整理する。</h2>
              <p>taxi、cab、boot、luggage、fare、contactlessなど、タクシーで見聞きする単語を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="taxis-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>乗車、事前予約、追加のお願いをつなげる。</h2>
              <p>住所と所要時間を確認する、人数と荷物を伝えて予約する、支払いと途中の要望を伝える3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="taxis-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>taxi、cab、boot、Keep the changeを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Can you take me to this address? · How long will it take to get there? · Can I pay with contactless?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>taxi rank · cab · boot · fare · ride-share</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GarageLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('garage-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['garage-why', 'garage-service', 'garage-faults', 'garage-problems', 'garage-parts', 'garage-dialogues', 'garage-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['garage-why', '整備の役割'],
    ['garage-service', '点検の予約'],
    ['garage-faults', '故障と修理'],
    ['garage-problems', 'その他のトラブル'],
    ['garage-parts', '車のパーツ'],
    ['garage-dialogues', '会話の練習'],
    ['garage-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page garage-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="garage-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>車の症状を、いつからかも含めて具体的に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">整備工場の英語は、症状、部品、時間をつないで、必要な点検や修理へ進む力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="整備工場で車の症状を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="整備工場で会話を進める方法" />

          <section id="garage-service" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">予約 · Booking a service</span>
              <h2>点検を予約し、仕上がりと引き取り時間を確認する。</h2>
              <p>book my car in、service、ready to pick upで整備の予約を進めます。</p>
            </div>
            <GreetingVocabularySection section={learn.service} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garage-faults" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">故障 · Faults &amp; repairs</span>
              <h2>警告灯、オイル、エンジンの状態を説明する。</h2>
              <p>warning light、keep flashing、oil level、overheatingで、整備士に症状を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.faults} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garage-problems" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">症状 · More problems</span>
              <h2>ライト、オイル、ハンドル、ガラス、タイヤの不具合を伝える。</h2>
              <p>isn&apos;t working、needs changing、jammed、cracked、keeps going downで故障を具体化します。</p>
            </div>
            <GreetingVocabularySection section={learn.problems} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garage-parts" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Car parts</span>
              <h2>車のパーツと英米の呼び方を整理する。</h2>
              <p>windscreen、bonnet、boot、steering wheel、tyreなど、修理で使う語彙を覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.parts} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="garage-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>点検予約、故障相談、具体的な症状をつなげる。</h2>
              <p>点検と引き取り時間を確認する、警告灯とエンジンを説明する、ライトやガラスやタイヤの症状を伝える3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="garage-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>service、windscreen、bonnet、boot、tyreを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Could I book my car in for a service, please? · What does this warning light mean? · The tyre keeps going down.</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>windscreen · bonnet · boot · jammed · overheating</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HolidayLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('holiday-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['holiday-why', 'holiday-accommodation', 'holiday-verbs', 'holiday-activities', 'holiday-sightseeing', 'holiday-dialogues', 'holiday-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['holiday-why', '休暇の役割'],
    ['holiday-accommodation', '宿泊と持ち物'],
    ['holiday-verbs', '旅行の動詞'],
    ['holiday-activities', 'アクティビティ'],
    ['holiday-sightseeing', '観光名所'],
    ['holiday-dialogues', '会話の練習'],
    ['holiday-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page holiday-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="holiday-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>予定と希望を伝えて、安心して旅を楽しむ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">休暇の英語は、泊まる場所、持ち物、活動、観光をつないで、旅の選択肢を広げる力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="旅行の予定を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="休暇の会話を進める方法" />

          <section id="holiday-accommodation" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">宿泊 · Accommodation &amp; essentials</span>
              <h2>宿泊先の種類、設備、旅行の持ち物を選ぶ。</h2>
              <p>bed and breakfast、accessible、pet-friendly、passport、travel adaptorなど、旅の準備を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.accommodation} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-verbs" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">動詞 · Verbs</span>
              <h2>予約、荷造り、両替、滞在、チェックアウトを伝える。</h2>
              <p>book、make a reservation、go on holiday、pack、change money、hire、check in / outで旅の流れを整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.verbs} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-activities" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">活動 · Holiday activities</span>
              <h2>海、山、雪のアクティビティからやりたいことを選ぶ。</h2>
              <p>kayaking、snorkelling、scuba diving、hiking、rock climbing、skiingなど、休暇の活動を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.activities} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-sightseeing" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">観光 · Sightseeing &amp; attractions</span>
              <h2>観光案内所で情報を集め、名所やツアーを回る。</h2>
              <p>tourist map、tourist office、guided tour、castle、gardens、pierなど、旅先の見どころを整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.sightseeing} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>宿泊、アクティビティ、観光の予定をつなげる。</h2>
              <p>宿泊先と設備を選ぶ、休暇の活動を決める、観光名所を回る3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="holiday-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>holiday、pitch、cot、hire a carを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>We&apos;d like to stay in a bed and breakfast. · Let&apos;s go kayaking tomorrow. · Where is the tourist office?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>pet-friendly · travel adaptor · book a pitch · guided tour · pier</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function BookingHolidayLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('booking-holiday-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['booking-holiday-why', 'booking-holiday-agent', 'booking-holiday-questions', 'booking-holiday-types', 'booking-holiday-terms', 'booking-holiday-dialogues', 'booking-holiday-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['booking-holiday-why', '予約の役割'],
    ['booking-holiday-agent', '代理店で相談'],
    ['booking-holiday-questions', '予約前の質問'],
    ['booking-holiday-types', '旅行スタイル'],
    ['booking-holiday-terms', '予約のキーワード'],
    ['booking-holiday-dialogues', '会話の練習'],
    ['booking-holiday-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page booking-holiday-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="booking-holiday-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>希望と条件を確認して、納得して予約する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">旅行予約の英語は、行き先だけでなく、含まれるものと条件を確認して、自分に合う旅を選ぶ力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="旅行代理店でプランを相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="旅行予約の会話を進める方法" />

          <section id="booking-holiday-agent" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">相談 · Talking to the travel agent</span>
              <h2>希望する旅、食事、評価、割引を相談する。</h2>
              <p>safari、cruise、all-inclusive、full board、five-star reviews、discountでプランを比較します。</p>
            </div>
            <GreetingVocabularySection section={learn.agent} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="booking-holiday-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問 · More questions to ask</span>
              <h2>設備、キャンセル、ビザ、同行者の条件を確認する。</h2>
              <p>facilities、cancellation policy、visa、suitable for、guide dogで予約前の疑問を解消します。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="booking-holiday-types" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">旅行スタイル · Types of holiday</span>
              <h2>自分に合う休暇の過ごし方を選ぶ。</h2>
              <p>beach holiday、city break、spa break、cruise、safariなど、旅行スタイルを整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.types} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="booking-holiday-terms" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Booking terms</span>
              <h2>食事プラン、評価、割引、条件の語彙を整理する。</h2>
              <p>full board、half board、adults only、20% discount、cancellation policyを読み取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.terms} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="booking-holiday-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>代理店相談、条件確認、予約決定をつなげる。</h2>
              <p>旅行の希望と内容を相談する、設備とキャンセル条件を確認する、レビューと割引を見て予約する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="booking-holiday-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>all-inclusive、full board、half board、city breakを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Is it all-inclusive? · What facilities are there? · What&apos;s your cancellation policy?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>full board · half board · adults only · five-star reviews · city break</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HotelLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('hotel-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['hotel-why', 'hotel-checkin', 'hotel-requests', 'hotel-problems', 'hotel-breakfast', 'hotel-checkout', 'hotel-dialogues', 'hotel-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['hotel-why', '滞在の役割'],
    ['hotel-checkin', 'チェックイン'],
    ['hotel-requests', 'リクエスト'],
    ['hotel-problems', 'トラブル'],
    ['hotel-breakfast', '朝食'],
    ['hotel-checkout', 'チェックアウト'],
    ['hotel-dialogues', '会話の練習'],
    ['hotel-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page hotel-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="hotel-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>必要なことを伝えて、安心して滞在する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">ホテルの英語は、確認・依頼・問題の報告をつないで、滞在を自分で整える力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="ホテルのフロントで滞在を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="ホテルでの会話を進める方法" />

          <section id="hotel-checkin" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">到着 · Arrival and check-in</span>
              <h2>予約、書類、部屋の情報をフロントで確認する。</h2>
              <p>reservation、registration form、passport、key card、check-outなど、到着時の流れを整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.checkin} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hotel-requests" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">依頼 · Asking for things</span>
              <h2>タオル、備品、ルームサービスを丁寧に頼む。</h2>
              <p>fresh towels、sent up、brought to my room、extra pillows、wake-up callを使って希望を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.requests} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hotel-problems" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">不具合 · Describing problems</span>
              <h2>部屋の設備や接続のトラブルを具体的に伝える。</h2>
              <p>won&apos;t switch on、broken、doesn&apos;t close properly、leaking、isn&apos;t workingを使い分けます。</p>
            </div>
            <GreetingVocabularySection section={learn.problems} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hotel-breakfast" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">朝食 · At breakfast</span>
              <h2>朝食の時間、席、ビュッフェ、飲み物を確認する。</h2>
              <p>just in time、room number、sit anywhere、help yourselves、bring it to your tableを聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.breakfast} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hotel-checkout" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">退館 · Checking out</span>
              <h2>感想、請求書、支払い、次の移動を整える。</h2>
              <p>a bit、a little bit、bill、extra night、luggage、taxiで丁寧に感想や希望を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.checkout} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="hotel-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>到着、滞在中、退館までの会話をつなげる。</h2>
              <p>チェックインする、サービスとトラブルを伝える、朝食とチェックアウトを進める3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="hotel-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>a bit、sent up、won&apos;t switch onを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Could I have some fresh towels, please? · The TV won&apos;t switch on. · Could you call me a taxi, please?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>registration form · key card · wake-up call · help yourselves · bill</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CitySightseeingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('city-sightseeing-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['city-sightseeing-why', 'city-sightseeing-sights', 'city-sightseeing-questions', 'city-sightseeing-bus', 'city-sightseeing-vocab', 'city-sightseeing-dialogues', 'city-sightseeing-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['city-sightseeing-why', '観光の役割'],
    ['city-sightseeing-sights', '観光名所'],
    ['city-sightseeing-questions', 'その他の質問'],
    ['city-sightseeing-bus', 'ツアーバス'],
    ['city-sightseeing-vocab', '観光語彙'],
    ['city-sightseeing-dialogues', '会話の練習'],
    ['city-sightseeing-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page city-sightseeing-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="city-sightseeing-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>必要な情報を集めて、街の見どころを楽しむ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">市内観光の英語は、時間・料金・アクセスを確認して、限られた旅の時間を有効に使う力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="観光地の地図を見ながら予定を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="市内観光の会話を進める方法" />

          <section id="city-sightseeing-sights" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">名所 · Visiting the sights</span>
              <h2>開館時間、チケット、ツアーを現地で確認する。</h2>
              <p>palace、museum、entrance fee、guided tour、audio guide、wheelchair accessを使います。</p>
            </div>
            <GreetingVocabularySection section={learn.sights} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="city-sightseeing-questions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問 · More phrases</span>
              <h2>料金、時間、音声ガイド、バリアフリーを尋ねる。</h2>
              <p>短い質問で、見学に必要な条件をすばやく確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.questions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="city-sightseeing-bus" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">移動 · On a tour bus</span>
              <h2>車窓の案内を聞き、地図と降車場所を確認する。</h2>
              <p>on your right、Check that out!、take a picture、get offを使って景色と移動を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.bus} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="city-sightseeing-vocab" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Tourist essentials</span>
              <h2>観光案内、チケット、地図、お土産の語彙を整理する。</h2>
              <p>tour bus、queue、ticket、tourist office、map、guidebook、souvenirを聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocab} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="city-sightseeing-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>名所、窓口、ツアーバスの会話をつなげる。</h2>
              <p>時間とチケットを確認する、料金とアクセスを尋ねる、ツアーバスで景色と降車を話す3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="city-sightseeing-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>Check that out!、queue、souvenirを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>What time does the palace open? · How much is the entrance fee? · Is there wheelchair access?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>guided tour · audio guide · tourist office · guidebook · souvenir</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function CampingLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('camping-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['camping-why', 'camping-arrival', 'camping-shop', 'camping-vocab', 'camping-dialogues', 'camping-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['camping-why', 'キャンプの役割'],
    ['camping-arrival', '到着と受付'],
    ['camping-shop', '売店での会話'],
    ['camping-vocab', 'キャンプ語彙'],
    ['camping-dialogues', '会話の練習'],
    ['camping-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page camping-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="camping-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>場所と必要なものを確認して、キャンプを楽しむ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">キャンプの英語は、区画・設備・ルールを確認して、自分たちで快適な拠点を作る力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="キャンプ場で区画と予定を相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="キャンプの会話を進める方法" />

          <section id="camping-arrival" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">受付 · Arriving at the campsite</span>
              <h2>予約、テントの区画、車の場所を受付で確認する。</h2>
              <p>book a pitch、pitch our tent、caravan、camper van、set up campを使って到着後の流れを話します。</p>
            </div>
            <GreetingVocabularySection section={learn.arrival} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="camping-shop" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">売店 · At the site shop</span>
              <h2>焚き火の許可を聞き、燃料やマッチをそろえる。</h2>
              <p>light a campfire、firewood、camping gas、a box of matchesで必要な用品を頼みます。</p>
            </div>
            <GreetingVocabularySection section={learn.shop} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="camping-vocab" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Vocabulary camping</span>
              <h2>テント、共同設備、車、調理用品の語彙を整理する。</h2>
              <p>tent、campfire、shower block、site shop、camping stoveなど、キャンプ場で目にする単語を聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocab} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="camping-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>受付、設営、売店での会話をつなげる。</h2>
              <p>予約と区画を確認する、駐車と設営の予定を話す、焚き火と用品を尋ねる3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="camping-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>pitch、set up camp、caravan、camper vanを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Where can we pitch our tent? · Can we light a campfire? · Have you got any camping gas?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>pitch · shower block · site shop · camping stove · loads to do</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function BeachLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('beach-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['beach-why', 'beach-safety', 'beach-activities', 'beach-vocab', 'beach-dialogues', 'beach-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['beach-why', 'ビーチの役割'],
    ['beach-safety', '到着と安全'],
    ['beach-activities', 'アクティビティ'],
    ['beach-vocab', 'ビーチ語彙'],
    ['beach-dialogues', '会話の練習'],
    ['beach-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page beach-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="beach-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>安全と必要なものを確認して、海辺を楽しむ。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">ビーチの英語は、楽しさと安全を両立させながら、道具やアクティビティを自分で選ぶ力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="ビーチで安全とアクティビティを相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="ビーチの会話を進める方法" />

          <section id="beach-safety" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">安全 · Arriving at the beach &amp; safety</span>
              <h2>泳ぐ場所、日陰、安全ルールを確認する。</h2>
              <p>can&apos;t wait to、shady spot、safe to swim、between the flagsで到着時の気持ちと安全を話します。</p>
            </div>
            <GreetingVocabularySection section={learn.safety} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="beach-activities" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">活動 · Beach activities</span>
              <h2>レッスン、レンタル、買い物を海辺で手配する。</h2>
              <p>surfing lessons、hire a pedalo、wet suits、bodyboard、bucket and spadeで希望を尋ねます。</p>
            </div>
            <GreetingVocabularySection section={learn.activities} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="beach-vocab" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Vocabulary at the beach</span>
              <h2>水上スポーツ、安全、休憩、砂遊びの語彙を整理する。</h2>
              <p>lifeguard、surfboard、deck chair、sun lounger、spade、bucketなど、海辺の単語を聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocab} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="beach-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>安全、アクティビティ、ビーチショップの会話をつなげる。</h2>
              <p>泳ぐ場所と日陰を確認する、マリンアクティビティを借りる、砂遊び用品を探す3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="beach-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>can&apos;t wait to、spade、pedalo、between the flagsを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Is it safe to swim today? · Can we hire a pedalo here? · Where can we buy a bucket and spade?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>shady spot · lifeguard · sun lounger · wet suit · paddleboard</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function FindingWayLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('finding-way-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['finding-way-why', 'finding-way-ask', 'finding-way-follow', 'finding-way-vocab', 'finding-way-dialogues', 'finding-way-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['finding-way-why', '道案内の役割'],
    ['finding-way-ask', '道を尋ねる'],
    ['finding-way-follow', '案内に従う'],
    ['finding-way-vocab', '方向の語彙'],
    ['finding-way-dialogues', '会話の練習'],
    ['finding-way-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page finding-way-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="finding-way-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>目的地を伝えて、道案内を正しく理解する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">道を尋ねる英語は、目的地と目印をつなぎ、知らない街でも自分で移動する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="街角で道を尋ねる場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="道案内の会話を進める方法" />

          <section id="finding-way-ask" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">質問 · Asking for directions</span>
              <h2>Excuse me から始めて、目的地への行き方を尋ねる。</h2>
              <p>the way to、how to get to、go straight ahead、roundaboutを使って質問と返答を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.ask} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-way-follow" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">案内 · Following directions</span>
              <h2>曲がる、渡る、通り過ぎる順番を聞き取る。</h2>
              <p>go past、first left、cross the road、traffic lights、next toを使って道順を追います。</p>
            </div>
            <GreetingVocabularySection section={learn.follow} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-way-vocab" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Vocabulary directions</span>
              <h2>曲がる方向と目印との位置関係を整理する。</h2>
              <p>turn left、turn right、first right、second left、behind、in front of、oppositeを聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.vocab} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="finding-way-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>質問、道案内、位置説明の会話をつなげる。</h2>
              <p>目的地への道を尋ねる、ステップごとの案内を理解する、目印との位置関係を説明する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="finding-way-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>Excuse me、take the first left、Thanks for your help!を使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Do you know the way to the bus station? · Can you tell me how to get to the museum? · Is the bank this way?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>roundabout · go past · traffic lights · next to · opposite</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HolidayProblemsLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('holiday-problems-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['holiday-problems-why', 'holiday-problems-belongings', 'holiday-problems-delays', 'holiday-problems-transport', 'holiday-problems-illness', 'holiday-problems-dialogues', 'holiday-problems-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['holiday-problems-why', 'トラブルの役割'],
    ['holiday-problems-belongings', '紛失・盗難'],
    ['holiday-problems-delays', '遅延・キャンセル'],
    ['holiday-problems-transport', '交通トラブル'],
    ['holiday-problems-illness', '病気とけが'],
    ['holiday-problems-dialogues', '会話の練習'],
    ['holiday-problems-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page holiday-problems-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="holiday-problems-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>状況を落ち着いて説明して、必要な助けにつなげる。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">トラブル時の英語は、何が起きたか、何に困っているか、何が必要かを具体的に伝える力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="旅行中のトラブルについて相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="旅行中のトラブル会話を進める方法" />

          <section id="holiday-problems-belongings" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">荷物 · Lost belongings</span>
              <h2>盗難、未着、置き忘れをスタッフに報告する。</h2>
              <p>has been stolen、hasn&apos;t shown up、leave behind、take some detailsで紛失や盗難を説明します。</p>
            </div>
            <GreetingVocabularySection section={learn.belongings} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-problems-delays" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">運行情報 · Delays and cancellations</span>
              <h2>フライトの遅延と電車の運休を確認する。</h2>
              <p>delayed、cancelled、as soon as we can、platform numberで最新情報を聞き取ります。</p>
            </div>
            <GreetingVocabularySection section={learn.delays} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-problems-transport" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">交通 · More phrases</span>
              <h2>超過料金、ゲート閉鎖、ストライキ、運休理由を理解する。</h2>
              <p>excess charge、gate、baggage handlers、on strike、lack of available train crewを整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.transport} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-problems-illness" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">体調 · Illness and injury</span>
              <h2>病気やけが、帰国困難、保険の条件を相談する。</h2>
              <p>put my back out、tummy bug、won&apos;t make、doctor&apos;s noteで体調と必要な手続きを伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.illness} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="holiday-problems-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>荷物、交通、体調のトラブルを順番に説明する。</h2>
              <p>紛失や未着を報告する、遅延や運休を確認する、病気やけがと保険を相談する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="holiday-problems-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>hasn&apos;t shown up、put my back out、tummy bugを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>My suitcase hasn&apos;t shown up. · The flight is delayed. · I&apos;ve got a tummy bug!</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>leave behind · excess charge · on strike · doctor&apos;s note</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function HealthMedicineLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('health-medicine-why')
  const { learn } = lesson
  const isSourceVocabularyLesson = lesson.number === '80'

  useEffect(() => {
    const sections = ['health-medicine-why', 'health-medicine-general', 'health-medicine-pain', 'health-medicine-conditions', ...(isSourceVocabularyLesson ? ['health-medicine-emergencies'] : ['health-medicine-dialogues']), 'health-medicine-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isSourceVocabularyLesson])

  const outline = [
    ['health-medicine-why', '健康を伝える役割'],
    [ 'health-medicine-general', isSourceVocabularyLesson ? '人体の部位' : '基本の症状'],
    [ 'health-medicine-pain', isSourceVocabularyLesson ? '病気とけが' : '痛み・けが'],
    [ 'health-medicine-conditions', isSourceVocabularyLesson ? '医療専門職' : '持病・処置'],
    ...(isSourceVocabularyLesson ? [['health-medicine-emergencies', '緊急・診断・治療']] : [['health-medicine-dialogues', '会話の練習']]),
    ['health-medicine-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page health-medicine-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="health-medicine-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>症状の場所・強さ・続いている期間を、具体的に伝える。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">健康に関する英語は、体の状態と必要な薬・処置を、相手が判断できる形で伝える力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="健康状態について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="健康や医療の会話を進める方法" />

          <section id="health-medicine-general" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceVocabularyLesson ? '人体の部位 · The human body' : '症状 · General symptoms'}</span>
              <h2>{isSourceVocabularyLesson ? '体の部位を英語で確認する。' : '吐き気、頭痛、鼻づまりなどを説明する。'}</h2>
              <p>{isSourceVocabularyLesson ? 'head、shoulder、wrist、ankleなど、体の部位を正確に区別します。' : 'feel sick、have been -ing、congested、ache、diarrhoea、constipatedを使って体調の変化を伝えます。'}</p>
            </div>
            <GreetingVocabularySection section={learn.general} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="health-medicine-pain" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceVocabularyLesson ? '病気とけが · Illnesses and injuries' : '痛みとけが · Pain and injuries'}</span>
              <h2>{isSourceVocabularyLesson ? '病気とけがの基本語彙を整理する。' : '痛む場所、腫れ、強さ、動作中の痛みを伝える。'}</h2>
              <p>{isSourceVocabularyLesson ? 'cough、fever、rash、sprain、broken boneなどを確認します。' : 'swollen、in a lot of pain、a pain in my、pull a muscle、sprainで具体的な状態を説明します。'}</p>
            </div>
            <GreetingVocabularySection section={learn.pain} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="health-medicine-conditions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceVocabularyLesson ? '医療専門職 · Medical professionals' : '持病と処置 · Chronic conditions'}</span>
              <h2>{isSourceVocabularyLesson ? '医療に関わる専門職の名前を覚える。' : '持病、息苦しさ、必要な薬や器具を知らせる。'}</h2>
              <p>{isSourceVocabularyLesson ? 'nurse、surgeon、paramedic、pharmacistなど、医療専門職の語彙です。' : 'diabetic、insulin、breathless、asthmatic、inhalerを質問と返答の形で練習します。'}</p>
            </div>
            <GreetingVocabularySection section={learn.conditions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          {isSourceVocabularyLesson && <section id="health-medicine-emergencies" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">緊急・診断・治療 · Emergencies, diagnoses, and treatment</span>
              <h2>緊急時や検査・治療で使う語彙を確認する。</h2>
              <p>ambulance、A&amp;E、blood pressure、X-ray、bandage、antibioticsなどをまとめて覚えます。</p>
            </div>
            <GreetingVocabularySection section={learn.emergencies} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>}

          {!isSourceVocabularyLesson && <section id="health-medicine-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>症状、けが、持病の情報を順番に伝える。</h2>
              <p>一般的な症状を説明する、痛みやけがの状態を伝える、持病と必要な薬・器具を相談する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>}

          <section id="health-medicine-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>{isSourceVocabularyLesson ? '人体・医療・治療の語彙を使い分ける。' : 'feel sick、ache、pull a muscleを使い分ける。'}</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              {learn.tips.map((tip) => <div key={tip.title}><span className="section-kicker">{tip.title}</span><p>{tip.body}</p></div>)}
            </div>
            <div className="greetings-recap">
              {isSourceVocabularyLesson ? <>
                <div><span className="section-kicker">自分で使う</span><p>head · shoulder · wrist · ankle · cough · fever · rash · ambulance</p></div>
                <div><span className="section-kicker">聞いたら分かる</span><p>A&amp;E · blood pressure · X-ray · bandage · medication · antibiotics</p></div>
              </> : <>
                <div><span className="section-kicker">自分で使う</span><p>I&apos;ve been feeling sick. · I&apos;ve got a swollen ankle. · I&apos;m asthmatic. I need another inhaler.</p></div>
                <div><span className="section-kicker">聞いたら分かる</span><p>diarrhoea · congested · breathless · insulin · inhaler</p></div>
              </>}
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function PharmacyLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('pharmacy-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['pharmacy-why', 'pharmacy-prescription', 'pharmacy-symptoms', 'pharmacy-vocabulary', 'pharmacy-dialogues', 'pharmacy-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['pharmacy-why', '薬局で伝える役割'],
    ['pharmacy-prescription', '処方箋と薬'],
    ['pharmacy-symptoms', '症状と市販薬'],
    ['pharmacy-vocabulary', '薬局の単語'],
    ['pharmacy-dialogues', '会話の練習'],
    ['pharmacy-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page pharmacy-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="pharmacy-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>症状と薬の情報を正確に伝えて、分からないことを確認する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">薬局での英語は、症状・アレルギー・服用中の薬を伝え、安心して使うために質問する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="薬局で薬について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="薬局での会話を進める方法" />

          <section id="pharmacy-prescription" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">処方箋 · Picking up a prescription</span>
              <h2>処方箋、アレルギー、服用中の薬を確認する。</h2>
              <p>get a prescription filled、pick up a prescription、side effects、before or after mealsで薬の受け取りと使い方を伝えます。</p>
            </div>
            <GreetingVocabularySection section={learn.prescription} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pharmacy-symptoms" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">症状と市販薬 · Symptoms</span>
              <h2>湿疹やのどの痛みを伝えて、市販薬を相談する。</h2>
              <p>itchy rash、sore throat、How long have you had ...?、other symptoms、do the trickで症状と提案を確認します。</p>
            </div>
            <GreetingVocabularySection section={learn.symptoms} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pharmacy-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Pharmacy vocabulary</span>
              <h2>薬局で見かける基本語を整理する。</h2>
              <p>薬剤師、処方箋、薬、副作用、消毒薬など、薬局で役立つ語をまとめます。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="pharmacy-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>処方箋、症状、薬の使い方を順番に確認する。</h2>
              <p>処方箋を受け取る、症状に合う市販薬を相談する、飲み方や併用を確認する3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="pharmacy-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>do the trick、sore、chemist&apos;sを使い分ける。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              {learn.tips.map((tip) => <div key={tip.title}><span className="section-kicker">{tip.title}</span><p>{tip.body}</p></div>)}
            </div>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>I&apos;m here to pick up a prescription. · I have an itchy rash on my arm. · How often should I take it?</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>pharmacist · side effects · over-the-counter · do the trick · chemist&apos;s</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function AppointmentLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('appointment-why')
  const { learn } = lesson
  const isSourceAppointmentLesson = lesson.number === '82'

  useEffect(() => {
    const sections = ['appointment-why', 'appointment-booking', 'appointment-availability', 'appointment-rearranging', 'appointment-dialogues', 'appointment-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['appointment-why', '予約で伝える役割'],
    ['appointment-booking', isSourceAppointmentLesson ? '診療所で予約' : '診察の予約'],
    ['appointment-availability', isSourceAppointmentLesson ? '歯科で予約' : '緊急と空き状況'],
    ['appointment-rearranging', isSourceAppointmentLesson ? '緊急予約' : '変更とキャンセル'],
    ['appointment-dialogues', '会話の練習'],
    ['appointment-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page appointment-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="appointment-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>必要な診察を、必要なタイミングで予約する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">診察予約の英語は、緊急度と希望日時を伝え、受診の予定を安心して調整する力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="診察の予約について相談する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="診察予約の会話を進める方法" />

          <section id="appointment-booking" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceAppointmentLesson ? "診療所 · At the doctor's surgery" : '予約 · Booking an appointment'}</span>
              <h2>{isSourceAppointmentLesson ? '医師・看護師の予約と症状を伝える。' : '医師の予約と患者情報を確認する。'}</h2>
              <p>{isSourceAppointmentLesson ? 'book an appointment、chest infection、squeeze you in、available slotで相談します。' : 'book / make an appointment、registered、date of birth、openingで予約を確保します。'}</p>
            </div>
            <GreetingVocabularySection section={learn.booking} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="appointment-availability" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceAppointmentLesson ? '歯科 · At the dentist' : '緊急と空き状況 · Availability'}</span>
              <h2>{isSourceAppointmentLesson ? '検診・歯痛・新規患者の予約を確認する。' : '今日の予約枠と緊急度を相談する。'}</h2>
              <p>{isSourceAppointmentLesson ? 'check-up、toothache、new patients、slotで歯科の予約を調整します。' : 'available today、urgent、fully booked、fit you in、earliest appointmentで時間を調整します。'}</p>
            </div>
            <GreetingVocabularySection section={learn.availability} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="appointment-rearranging" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">{isSourceAppointmentLesson ? '緊急予約 · Emergency appointments' : '変更とキャンセル · Rearranging and cancelling'}</span>
              <h2>{isSourceAppointmentLesson ? '緊急予約とトリアージの流れを理解する。' : '予約を変更し、次回の診察枠を取る。'}</h2>
              <p>{isSourceAppointmentLesson ? 'emergency appointment、urgent appointment、triage listを使って対応を確認します。' : 'cancel、rearrange、reschedule、double appointment、follow-up appointmentを使い分けます。'}</p>
            </div>
            <GreetingVocabularySection section={learn.rearranging} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="appointment-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a conversation</span>
              <h2>{isSourceAppointmentLesson ? '診療所、歯科、緊急予約の流れを聞く。' : '予約、緊急枠、変更の手続きを順番に伝える。'}</h2>
              <p>{isSourceAppointmentLesson ? '医師の診療所、歯科、緊急時の3つの場面を聞いてみましょう。' : '診察を予約する、今日の空きと緊急度を相談する、予約を変更して次回枠を取る3つの場面を聞いてみましょう。'}</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="appointment-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>{isSourceAppointmentLesson ? 'available、sooner、squeeze you in、triage listを使い分ける。' : 'book、That works for me、fit you inを使い分ける。'}</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              {learn.tips.map((tip) => <div key={tip.title}><span className="section-kicker">{tip.title}</span><p>{tip.body}</p></div>)}
            </div>
            <div className="greetings-recap">
              {isSourceAppointmentLesson ? <>
                <div><span className="section-kicker">自分で使う</span><p>I&apos;d like to book an appointment with Doctor Cole. · I&apos;d like to book a check-up, please. · I need an emergency appointment.</p></div>
                <div><span className="section-kicker">聞いたら分かる</span><p>chest infection · toothache · squeeze you in · triage list · new patients</p></div>
              </> : <>
                <div><span className="section-kicker">自分で使う</span><p>I&apos;d like to book an appointment. · Do you have any appointments available today? · I have to reschedule my appointment.</p></div>
                <div><span className="section-kicker">聞いたら分かる</span><p>registered · an opening · fully booked · fit you in · follow-up appointment</p></div>
              </>}
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function PresentationLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [activeSection, setActiveSection] = useState('presentation-why')
  const { learn } = lesson

  useEffect(() => {
    const sections = ['presentation-why', 'presentation-start', 'presentation-transitions', 'presentation-finish', 'presentation-vocabulary', 'presentation-dialogues', 'presentation-tips']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const outline = [
    ['presentation-why', '発表の役割'],
    ['presentation-start', '始め方'],
    ['presentation-transitions', '話題の切り替え'],
    ['presentation-finish', '締めくくり'],
    ['presentation-vocabulary', 'プレゼンの単語'],
    ['presentation-dialogues', '会話の練習'],
    ['presentation-tips', '会話のポイント'],
  ]

  return (
    <div className="lesson-page greetings-page opinions-page presentation-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="presentation-why" className="greetings-hero-section greetings-content-section">
            <div className="greetings-hero-copy">
              <span className="section-kicker">はじめに · Start with the big picture</span>
              <h2>聞き手を迷わせず、話を最後まで案内する。</h2>
              {learn.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="greetings-pull-quote">プレゼンの英語は、難しい単語より、話の道筋を示す力です。</p>
            </div>
            <GreetingSceneImage src="/assets/illustrations/greeting-casual-chat.svg" alt="プレゼンテーションの流れを案内する場面" />
          </section>

          <FillerFunctionStrip items={learn.functions} ariaLabel="プレゼンテーションで会話を進める方法" />

          <section id="presentation-start" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">始め方 · Getting started</span>
              <h2>テーマと目的を示して、聞き手を迎える。</h2>
              <p>Today、focus、Firstly、To kick things offを使って、発表の地図を渡します。</p>
            </div>
            <GreetingVocabularySection section={learn.start} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="presentation-transitions" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">話題の切り替え · Changing the subject</span>
              <h2>話が次へ進むことを、言葉で知らせる。</h2>
              <p>Moving on to、bring to your attention、This leads me on toで聞き手を案内します。</p>
            </div>
            <GreetingVocabularySection section={learn.transitions} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="presentation-finish" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">締めくくり · Finishing up</span>
              <h2>要約し、質問を受けて、発表を閉じる。</h2>
              <p>Lastly、to sum up、Any questions?で終わりをはっきり示します。</p>
            </div>
            <GreetingVocabularySection section={learn.finish} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="presentation-vocabulary" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">単語 · Presentations</span>
              <h2>focus、audience、slide、Q&amp;Aを使い分ける。</h2>
              <p>発表の構成、聞き手、資料、話題の流れに関する語彙を整理します。</p>
            </div>
            <GreetingVocabularySection section={learn.vocabulary} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />
          </section>

          <section id="presentation-dialogues" className="greetings-content-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">会話の流れ · Put it into a presentation</span>
              <h2>始まり、話題転換、締めくくりをつなげる。</h2>
              <p>発表を始める、次の項目に移る、要約して質問を受ける3つの場面を聞いてみましょう。</p>
            </div>
            <div className="greetings-dialogue-grid">
              {learn.dialogues.map((pattern) => <GreetingDialogueCard key={pattern.id} pattern={pattern} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} />)}
            </div>
          </section>

          <section id="presentation-tips" className="greetings-content-section">
            <span className="section-kicker">会話のポイント · Good to know</span>
            <h2>サインポストで、聞き手を迷わせない。</h2>
            <p>{learn.tip}</p>
            <div className="greetings-recap">
              <div><span className="section-kicker">自分で使う</span><p>Today, I'm going to talk about... · Moving on to... · So, to sum up, I'd say...</p></div>
              <div><span className="section-kicker">聞いたら分かる</span><p>focus · bring to your attention · Q&amp;A · lastly</p></div>
            </div>
            <p className="greetings-next-cue">Practiceで声を重ねる →</p>
          </section>
        </div>

        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>
            {outline.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  )
}

function GreetingsPracticeView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const [loopingPhrase, setLoopingPhrase] = useState(null)
  const [role, setRole] = useState('A')
  const { practice } = lesson

  const speakPhrase = (phrase, rate = 1) => speakWithBrowser(phrase, { rate })

  useEffect(() => {
    if (!loopingPhrase || typeof window === 'undefined') return undefined
    const item = practice.corePhrases.find((phrase) => phrase.phrase === loopingPhrase)
    const interval = window.setInterval(() => speakPhrase(loopingPhrase, item?.rate || 0.9), 3500)
    return () => window.clearInterval(interval)
  }, [loopingPhrase, practice.corePhrases])

  return (
    <div className="practice-page greetings-practice-page">
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title={practice.title || '声を重ねて、あいさつを自分のものにする'} ja={practice.instructions} />
      <div className="greetings-practice-flow" aria-label="Practice flow">
        <div><b>01</b><span>Listen</span><small>まず聞く</small></div><i aria-hidden="true">→</i>
        <div><b>02</b><span>Shadow</span><small>少し遅れて重ねる</small></div><i aria-hidden="true">→</i>
        <div><b>03</b><span>Role-play</span><small>会話で使う</small></div>
      </div>

      <section className="greetings-practice-section">
        <div className="greetings-section-heading"><span className="section-kicker">Core phrases</span><h2>{practice.coreHeading || 'まずは、短いあいさつから。'}</h2><p>日本語訳は見ずに、英語の音とリズムに集中します。</p></div>
        <div className="greetings-shadow-grid">
          {practice.corePhrases.map((item) => (
            <article className={`greetings-shadow-card ${loopingPhrase === item.phrase ? 'is-looping' : ''}`} key={item.phrase}>
              <div className="greeting-shadow-meta"><span>{item.context}</span><small>{item.phrase.length < 12 ? 'short' : 'connected'}</small></div>
              <h3>{item.phrase}</h3>
              <div className="greetings-shadow-controls">
                <button type="button" onClick={() => speakPhrase(item.phrase, 1)}><PlayIcon /> Normal</button>
                <button type="button" onClick={() => speakPhrase(item.phrase, item.rate)}><PlayIcon /> Shadow</button>
                <button type="button" aria-pressed={loopingPhrase === item.phrase} onClick={() => { const next = loopingPhrase === item.phrase ? null : item.phrase; setLoopingPhrase(next); if (next) speakPhrase(next, item.rate) }}>↻ Loop</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="greetings-practice-section greetings-dialogue-practice">
        <div className="greetings-section-heading"><span className="section-kicker">Role-play</span><h2>{practice.dialogueHeading || '会話の順番を感じる。'}</h2><p>{practice.dialogueDescription || '自分の役を選び、相手の声のあとに入ります。'}</p></div>
        <div className="greetings-role-toggle" role="group" aria-label="Choose practice role">
          {['A', 'B'].map((speaker) => <button key={speaker} type="button" aria-pressed={role === speaker} className={role === speaker ? 'active' : ''} onClick={() => setRole(speaker)}>{speaker}を練習</button>)}
        </div>
        <div className="greetings-dialogue-practice-list">
          {practice.dialogues.map((dialogue) => (
            <article key={dialogue.title} className="greetings-dialogue-practice-card">
              <div><span className="section-kicker">{dialogue.title}</span><button type="button" className="greeting-listen-dialogue" onClick={() => speakWithBrowser(dialogue.lines.join(' '))}><PlayIcon /> 会話を聞く</button></div>
              {dialogue.lines.map((line, index) => <button key={`${dialogue.title}-${index}`} type="button" className={`greetings-practice-line ${index % 2 === 0 ? 'speaker-a' : 'speaker-b'} ${((role === 'A' && index % 2 === 0) || (role === 'B' && index % 2 === 1)) ? 'your-line' : ''}`} onClick={() => speakPhrase(line, 0.84)}><span>{index % 2 === 0 ? 'A' : 'B'}</span><strong>{line}</strong><PlayIcon /></button>)}
            </article>
          ))}
        </div>
      </section>

      <section className="greetings-practice-section greetings-natural-practice">
        <div className="greetings-section-heading"><span className="section-kicker">Natural speed</span><h2>最後に、自然な形へ。</h2></div>
        {practice.natural.map((row) => <div className="greetings-natural-practice-row" key={row.full}><span>{row.full}</span><b>→</b><strong>{row.natural}</strong><button type="button" aria-label={`Listen to ${row.natural}`} onClick={() => speakPhrase(row.natural, 1)}><PlayIcon /></button></div>)}
      </section>

      <div className="greetings-finish-card"><span className="section-kicker">今日はここまで</span><h2>{practice.finishTitle || '明日、3〜5分だけ戻りましょう。'}</h2><p>完璧さより、短い練習を何度も続けること。次に会った人へ、ひとつ使ってみます。</p></div>
    </div>
  )
}

export function EverydayLearnView({ lesson, step, setStep, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (lesson?.kind === 'source-book') return <SourceBookLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'greetings') return <GreetingsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'introductions') return <IntroductionsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'fillers') return <FillersLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'repair') return <RepairLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'opinions') return <OpinionsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'agreement') return <AgreementLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'suggestions') return <SuggestionsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'thanks') return <ThanksLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'sorry') return <SorryLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'goodbye') return <GoodbyeLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'dates-weather') return <DatesWeatherLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'arrangements') return <ArrangementsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'weather') return <WeatherLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'family') return <FamilyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'talking-family') return <TalkingFamilyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'life-events') return <LifeEventsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'socializing') return <SocializingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'dating') return <DatingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'support') return <SupportLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'eating-drinking') return <EatingDrinkingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'cafes') return <CafesLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'takeaway') return <TakeawayLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'bars') return <BarsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'restaurant') return <RestaurantLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'cooking') return <CookingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'free-time') return <FreeTimeLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'cinema') return <CinemaLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'theatre') return <TheatreLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'concerts') return <ConcertsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'gym') return <GymLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'sports') return <SportsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'sports-events') return <SportsEventsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'hobbies') return <HobbiesLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'shops-services') return <ShopsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'market') return <MarketLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'supermarket') return <SupermarketLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'garden-centre') return <GardenLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'diy-store') return <DiyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'clothes-shoes') return <ClothesLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'returns-goods') return <ReturnsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'hair-beauty') return <HairBeautyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'post-office') return <PostLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'money-finance') return <FinanceLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'library') return <LibraryLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'work-study') return <WorkStudyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'school') return <SchoolLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'higher-education') return <HigherEducationLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'looking-for-work') return <LookingForWorkLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'applying-for-job') return <ApplyingForJobLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'job-interviews') return <JobInterviewsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'starting-new-job') return <StartingNewJobLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'workplace') return <WorkplaceLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'presentation') return <PresentationLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'work-meetings') return <WorkMeetingsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'online-meetings') return <OnlineMeetingsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'home') return <HomeLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'finding-home') return <FindingHomeLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'moving-house') return <MovingHouseLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'neighbours') return <NeighboursLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'chores') return <HouseholdChoresLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'home-improvements') return <HomeImprovementsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'pets') return <PetsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'home-emergencies') return <HomeEmergenciesLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'home-entertainment') return <HomeEntertainmentLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'getting-around') return <GettingAroundLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'buses-coaches') return <BusesCoachesLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'train-metro-travel') return <TrainMetroLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'airport') return <AirportLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'cycling') return <CyclingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'taxis') return <TaxisLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'garage') return <GarageLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'holiday') return <HolidayLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'booking-holiday') return <BookingHolidayLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'staying-hotel') return <HotelLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'city-sightseeing') return <CitySightseeingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'camping') return <CampingLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'beach') return <BeachLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'finding-way') return <FindingWayLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'holiday-problems') return <HolidayProblemsLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'health-medicine') return <HealthMedicineLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'pharmacy') return <PharmacyLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'booking-appointment') return <AppointmentLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
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
  if (lesson?.kind === 'source-book') return <SourceBookPracticeView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  if (lesson?.kind === 'greetings' || lesson?.kind === 'introductions' || lesson?.kind === 'fillers' || lesson?.kind === 'repair' || lesson?.kind === 'opinions' || lesson?.kind === 'agreement' || lesson?.kind === 'suggestions' || lesson?.kind === 'thanks' || lesson?.kind === 'sorry' || lesson?.kind === 'goodbye' || lesson?.kind === 'dates-weather' || lesson?.kind === 'arrangements' || lesson?.kind === 'weather' || lesson?.kind === 'family' || lesson?.kind === 'talking-family' || lesson?.kind === 'life-events' || lesson?.kind === 'socializing' || lesson?.kind === 'dating' || lesson?.kind === 'support' || lesson?.kind === 'eating-drinking' || lesson?.kind === 'cafes' || lesson?.kind === 'takeaway' || lesson?.kind === 'bars' || lesson?.kind === 'restaurant' || lesson?.kind === 'cooking' || lesson?.kind === 'free-time' || lesson?.kind === 'cinema' || lesson?.kind === 'theatre' || lesson?.kind === 'concerts' || lesson?.kind === 'gym' || lesson?.kind === 'sports' || lesson?.kind === 'sports-events' || lesson?.kind === 'hobbies' || lesson?.kind === 'shops-services' || lesson?.kind === 'market' || lesson?.kind === 'supermarket' || lesson?.kind === 'garden-centre' || lesson?.kind === 'diy-store' || lesson?.kind === 'clothes-shoes' || lesson?.kind === 'returns-goods' || lesson?.kind === 'hair-beauty' || lesson?.kind === 'post-office' || lesson?.kind === 'money-finance' || lesson?.kind === 'library' || lesson?.kind === 'work-study' || lesson?.kind === 'school' || lesson?.kind === 'higher-education' || lesson?.kind === 'looking-for-work' || lesson?.kind === 'applying-for-job' || lesson?.kind === 'job-interviews' || lesson?.kind === 'starting-new-job' || lesson?.kind === 'workplace' || lesson?.kind === 'presentation' || lesson?.kind === 'work-meetings' || lesson?.kind === 'online-meetings' || lesson?.kind === 'home' || lesson?.kind === 'finding-home' || lesson?.kind === 'moving-house' || lesson?.kind === 'neighbours' || lesson?.kind === 'chores' || lesson?.kind === 'home-improvements' || lesson?.kind === 'pets' || lesson?.kind === 'home-emergencies' || lesson?.kind === 'home-entertainment' || lesson?.kind === 'getting-around' || lesson?.kind === 'buses-coaches' || lesson?.kind === 'train-metro-travel' || lesson?.kind === 'airport' || lesson?.kind === 'cycling' || lesson?.kind === 'taxis' || lesson?.kind === 'garage' || lesson?.kind === 'holiday' || lesson?.kind === 'booking-holiday' || lesson?.kind === 'staying-hotel' || lesson?.kind === 'city-sightseeing' || lesson?.kind === 'camping' || lesson?.kind === 'beach' || lesson?.kind === 'finding-way' || lesson?.kind === 'holiday-problems' || lesson?.kind === 'health-medicine' || lesson?.kind === 'pharmacy' || lesson?.kind === 'booking-appointment') return <GreetingsPracticeView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
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
