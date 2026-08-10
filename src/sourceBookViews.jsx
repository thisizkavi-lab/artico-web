import { useMemo, useState } from 'react'
import { SourceBookAudio } from './sourceBookAudio'

function SourcePhraseCard({ item }) {
  return (
    <article className="greeting-phrase-card source-book-phrase-card">
      <div className="greeting-phrase-copy">
        <div className="greeting-phrase-topline">
          <span className="greetings-register-chip greetings-register-chip-neutral">原書</span>
          <span className="greeting-phrase-context">{item.context || ''}</span>
        </div>
        <h3>{item.phrase}</h3>
        <p>{item.meaning}</p>
      </div>
      {item.audio && <SourceBookAudio file={item.audio} label="この語の音声" />}
    </article>
  )
}

function SourceBookSection({ item }) {
  return (
    <section className="greetings-content-section source-book-section" id={item.id}>
      <div className="greetings-section-heading">
        <span className="section-kicker">{item.enTitle}</span>
        <h2>{item.title}</h2>
        <p>{item.intro}</p>
      </div>
      {item.audioFiles?.length > 0 && (
        <div className="source-book-audio-shelf" aria-label={`${item.title} audio`}>
          <span className="section-kicker">音声 · Audio</span>
          <div className="source-book-audio-list">
            {item.audioFiles.map((file) => <SourceBookAudio key={file} file={file} />)}
          </div>
        </div>
      )}
      <div className="greetings-phrase-grid source-book-phrase-grid">
        {item.phrases.map((phrase, index) => <SourcePhraseCard key={`${item.id}-${phrase.phrase}-${index}`} item={phrase} />)}
      </div>
    </section>
  )
}

function SourceBookDialogue({ dialogue }) {
  return (
    <article className="greeting-dialogue-card source-book-dialogue">
      <div className="greeting-dialogue-header">
        <div>
          <span className="section-kicker">原書の会話</span>
          <h3>{dialogue.title}</h3>
        </div>
      </div>
      <div className="greeting-dialogue-lines">
        {dialogue.lines.map((line, index) => (
          <div key={`${dialogue.id || dialogue.title}-${index}`} className={`greeting-dialogue-line speaker-${String(line.speaker || (index % 2 ? 'B' : 'A')).toLowerCase()}`}>
            <span className="greeting-speaker">{line.speaker || (index % 2 ? 'B' : 'A')}</span>
            <div className="greeting-speech-bubble">
              <strong>{line.en || line.phrase || line}</strong>
              {line.ja && <small>{line.ja}</small>}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export function SourceBookLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const { learn } = lesson
  const [activeSection, setActiveSection] = useState(learn.sections?.[0]?.id)
  const outline = useMemo(() => (learn.sections || []).map((item) => [item.id, item.title]), [learn.sections])

  return (
    <div className="lesson-page greetings-page source-book-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section className="greetings-hero-section greetings-content-section source-book-intro">
            <div className="greetings-hero-copy">
              <span className="section-kicker">原書に沿って学ぶ · Source book</span>
              <h2>{lesson.enTitle}</h2>
              {learn.intro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
          {learn.functions?.length > 0 && (
            <div className="greetings-signal-strip source-book-functions" aria-label="学習項目">
              {learn.functions.map(([number, label]) => <div key={number} className="greetings-signal-item"><span>{number}</span><strong>{label}</strong></div>)}
            </div>
          )}
          {(learn.sections || []).map((item) => <SourceBookSection key={item.id} item={item} />)}
          {learn.dialogues?.length > 0 && (
            <section className="greetings-content-section source-book-dialogues">
              <div className="greetings-section-heading"><span className="section-kicker">Source dialogues</span><h2>原書の会話</h2><p>原書に掲載された会話を確認します。</p></div>
              <div className="greetings-dialogue-grid">{learn.dialogues.map((dialogue) => <SourceBookDialogue key={dialogue.id || dialogue.title} dialogue={dialogue} />)}</div>
            </section>
          )}
          {learn.tip && <section className="greetings-content-section source-book-tip"><span className="section-kicker">Good to know</span><h2>学習メモ</h2><p>{learn.tip}</p></section>}
        </div>
        <aside className="greetings-outline" aria-label="このページの項目">
          <span>On this page</span>
          <nav>{outline.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setActiveSection(id)}>{label}</a>)}</nav>
        </aside>
      </div>
    </div>
  )
}

export function SourceBookPracticeView({ lesson, LessonTitle }) {
  const [selectedSection, setSelectedSection] = useState(0)
  const sections = lesson.learn?.sections || []
  const active = sections[selectedSection] || sections[0]
  return (
    <div className="practice-page greetings-practice-page source-book-practice-page">
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title={lesson.practice?.title || lesson.title} ja={lesson.practice?.instructions} />
      <div className="greetings-practice-flow" aria-label="Practice flow">
        <div><b>01</b><span>Listen</span><small>まず聞く</small></div><i aria-hidden="true">→</i>
        <div><b>02</b><span>Read</span><small>意味を確認する</small></div><i aria-hidden="true">→</i>
        <div><b>03</b><span>Repeat</span><small>声に出す</small></div>
      </div>
      <section className="greetings-practice-section">
        <div className="greetings-section-heading"><span className="section-kicker">Source phrases</span><h2>{active?.title || '原書フレーズ'}</h2><p>原書の英文だけを使って、聞いてから声に出します。</p></div>
        <div className="source-book-practice-tabs" role="tablist">
          {sections.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={selectedSection === index} className={selectedSection === index ? 'active' : ''} onClick={() => setSelectedSection(index)}>{item.title}</button>)}
        </div>
        {active?.audioFiles?.map((file) => <SourceBookAudio key={file} file={file} />)}
        <div className="greetings-shadow-grid source-book-practice-grid">
          {(active?.phrases || []).map((item, index) => <SourcePhraseCard key={`${active.id}-${index}`} item={item} />)}
        </div>
      </section>
      {lesson.learn?.tip && <div className="greetings-finish-card"><span className="section-kicker">学習メモ</span><p>{lesson.learn.tip}</p></div>}
    </div>
  )
}
