import { useLanguage } from './Language'
import { lazy, Suspense, useState } from 'react'
import topics from './vocabularyTopics.json'
import { readVocabularyVoiceMode, writeVocabularyVoiceMode } from './vocabularyVoiceMode'
// Chapter 98's directory should not load hundreds of vocabulary scenes,
// country flags or number illustrations before a topic is selected.
const VocabularyCountriesLesson = lazy(() => import('./VocabularyCountriesLesson'))
const VocabularyNumbersLesson = lazy(() => import('./VocabularyNumbersLesson'))
const VocabularyTopicLesson = lazy(() => import('./VocabularyTopicLesson'))
import { CurriculumIcon } from './CurriculumIcon'
import KokoroSpeakButton from './KokoroSpeakButton'
import './vocabulary.css'


/** Match each of the 78 topic titles with an illustration-free, semantic vector icon.
 * The title remains the accessible label; icons are decorative.
 */
const vocabularyTopicIcons = [
  'globe', 'hash', 'clock', 'sunCloud', 'tag', 'thumbsUp', 'messages', 'quote', 'house', 'utensils',
  'broom', 'hammer', 'truck', 'body', 'shirt', 'watch', 'eye', 'brain', 'smile', 'family',
  'heart', 'baby', 'graduation', 'pencil', 'languages', 'message', 'scales', 'utensils', 'apple', 'carrot',
  'cake', 'coffee', 'chef', 'briefcase', 'calendarCheck', 'building', 'laptop', 'wallet', 'briefcase', 'presentation',
  'quote', 'interview', 'trophy', 'plane', 'car', 'mapPin', 'bed', 'camera', 'bike', 'waves',
  'cloudSun', 'mountain', 'leaf', 'paw', 'rabbit', 'bird', 'fish', 'palette', 'activity', 'ball',
  'soccer', 'dumbbell', 'book', 'music', 'film', 'tv', 'newspaper', 'thermometer', 'stethoscope', 'salad',
  'activity', 'storefront', 'bag', 'basket', 'building', 'phone', 'cpu', 'atom'
]

const vocabularyIndex = '#/lesson/98/study'
const topicHref = (number) => `${vocabularyIndex}/${String(number).padStart(2, '0')}`

function VoiceSettings({ japanese }) {
  const [mode, setMode] = useState(readVocabularyVoiceMode)
  const select = (event) => {
    const next = event.target.value === 'device' ? 'device' : 'kokoro'
    setMode(next)
    writeVocabularyVoiceMode(next)
  }
  return (
    <details className="vl-voice-settings">
      <summary>{japanese ? '音声設定' : 'Audio settings'}</summary>
      <div className="vl-voice-settings-panel">
        <label htmlFor="vl-voice-mode">{japanese ? '単語の発音方法' : 'Vocabulary pronunciation'}</label>
        <select id="vl-voice-mode" value={mode} onChange={select}>
          <option value="kokoro">{japanese ? 'Kokoro（標準）' : 'Kokoro (default)'}</option>
          <option value="device">{japanese ? '端末の音声（高速）' : 'Device voice (faster)'}</option>
        </select>
        <p>{mode === 'kokoro'
          ? (japanese ? '初回の再生時にモデルを読み込みます。古い端末では音声の生成に時間がかかる場合があります。' : 'Loads Kokoro when you first play audio. Older laptops may generate speech slowly.')
          : (japanese ? '端末の音声を優先します。音声が使えない場合はKokoroに切り替えます。' : 'Uses the built-in system voice. Falls back to Kokoro if it cannot speak.')}
        </p>
      </div>
    </details>
  )
}


function LessonLink({ topic, japanese }) {
  return (
    <li className="vl-lesson-item">
      <a className="vl-lesson-link" href={topicHref(topic.sourceLesson)}
        aria-label={japanese ? `レッスン${topic.sourceLesson}：${topic.ja}` : `Lesson ${topic.sourceLesson}: ${topic.topic}`}>
        <span className="vl-lesson-icon" aria-hidden="true"><CurriculumIcon name={vocabularyTopicIcons[topic.sourceLesson - 1] ?? 'book'} size={27} /></span>
        <span className="vl-lesson-titles">
          <strong lang={japanese ? 'ja' : 'en'}>{japanese ? topic.ja : topic.topic}</strong>
          <small lang={japanese ? 'en' : 'ja'}>{japanese ? topic.topic : topic.ja}</small>
        </span>
        <span className="vl-lesson-arrow" aria-hidden="true">→</span>
      </a>
      <KokoroSpeakButton text={topic.topic} japanese={japanese} className="vl-directory-audio" />
    </li>
  )
}

function VocabularyIndex({ japanese }) {
  return (
    <div className="aw-page vl-page">
      <a className="vl-back" href="#/courses?social">
        <span aria-hidden="true">←</span> {japanese ? '学習コースへ' : 'Back to Learn'}
      </a>
      <header className="vl-heading">
        <p className="vl-eyebrow">CHAPTER 98 · VOCABULARY</p>
        <h1>{japanese ? '語彙のレッスン' : 'Vocabulary lessons'}</h1>
        <p>{japanese
          ? '学びたいトピックを選びましょう。78のトピックから、学びたいレッスンを選びましょう。'
          : 'Choose a topic to explore. All 78 vocabulary lessons are ready to explore.'}</p>
      </header>

      <section className="vl-directory" aria-labelledby="vl-directory-heading">
        <div className="vl-directory-heading">
          <div>
            <p className="vl-section-label">YOUR VOCABULARY LIBRARY</p>
            <h2 id="vl-directory-heading">{japanese ? 'すべてのレッスン' : 'All lessons'}</h2>
          </div>
          <span className="vl-count">{topics.length} {japanese ? 'レッスン' : 'lessons'}</span>
        </div>
        <ol className="vl-lesson-list">
          {topics.map((topic) => <LessonLink key={topic.sourceLesson} topic={topic} japanese={japanese} />)}
        </ol>
      </section>
      <nav className="vl-bottom-nav" aria-label={japanese ? '学習ナビゲーション' : 'Learning navigation'}>
        <a href="#/lesson/97/study">← {japanese ? '第97課' : 'Chapter 97'}</a>
        <a href="#/progress">{japanese ? '進捗を見る' : 'My Progress'} →</a>
      </nav>
    </div>
  )
}

function VocabularyLesson({ topic, japanese }) {
  const number = String(topic.sourceLesson).padStart(2, '0')
  const previous = topics[topic.sourceLesson - 2]
  const next = topics[topic.sourceLesson]

  return (
    <div className="aw-page vl-page vl-detail-page">
      <a className="vl-back" href={vocabularyIndex}>
        <span aria-hidden="true">←</span> {japanese ? '語彙のレッスン一覧へ' : 'All vocabulary lessons'}
      </a>
      <header className="vl-heading vl-detail-heading">
        <p className="vl-eyebrow">VOCABULARY · LESSON {number}</p>
        <div className="vl-detail-title-row">
          <h1 lang={japanese ? 'ja' : 'en'}>{japanese ? topic.ja : topic.topic}</h1>
          <KokoroSpeakButton text={topic.topic} japanese={japanese} className="vl-topic-audio" />
        </div>
        <p className="vl-subtitle" lang={japanese ? 'en' : 'ja'}>{japanese ? topic.topic : topic.ja}</p>
        <VoiceSettings japanese={japanese} />
      </header>

      <Suspense fallback={<p className="vlt-empty" role="status">{japanese ? 'レッスンを読み込んでいます…' : 'Loading vocabulary…'}</p>}>
        {topic.sourceLesson === 1
          ? <VocabularyCountriesLesson japanese={japanese} />
          : topic.sourceLesson === 2
            ? <VocabularyNumbersLesson japanese={japanese} />
            : <VocabularyTopicLesson key={topic.sourceLesson} topic={topic} japanese={japanese} />}
      </Suspense>


      <nav className="vl-lesson-navigation" aria-label={japanese ? '語彙レッスンの移動' : 'Vocabulary lesson navigation'}>
        {previous ? (
          <a className="vl-step-card vl-step-previous" href={topicHref(previous.sourceLesson)}>
            <span className="vl-step-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
            </span>
            <span className="vl-step-copy">
              <small>{japanese ? '前のレッスン' : 'Previous lesson'} <span className="vl-step-separator">·</span> {String(previous.sourceLesson).padStart(2, '0')}</small>
              <strong lang={japanese ? 'ja' : 'en'}>{japanese ? previous.ja : previous.topic}</strong>
            </span>
          </a>
        ) : <span className="vl-step-spacer" aria-hidden="true" />}
        {next ? (
          <a className="vl-step-card vl-step-next" href={topicHref(next.sourceLesson)}>
            <span className="vl-step-copy">
              <small>{japanese ? '次のレッスン' : 'Next lesson'} <span className="vl-step-separator">·</span> {String(next.sourceLesson).padStart(2, '0')}</small>
              <strong lang={japanese ? 'ja' : 'en'}>{japanese ? next.ja : next.topic}</strong>
            </span>
            <span className="vl-step-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </span>
          </a>
        ) : <span className="vl-step-spacer" aria-hidden="true" />}
      </nav>
    </div>
  )
}

export default function Vocabulary({ route }) {
  const { language } = useLanguage()
  const japanese = language === 'ja'
  const selected = topics.find((topic) => topic.sourceLesson === Number(route.topic))

  return selected
    ? <VocabularyLesson topic={selected} japanese={japanese} />
    : <VocabularyIndex japanese={japanese} />
}
