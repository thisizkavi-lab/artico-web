import { useLanguage } from './Language'
import topics from './vocabularyTopics.json'
import VocabularyCountriesLesson from './VocabularyCountriesLesson'
import VocabularyNumbersLesson from './VocabularyNumbersLesson'
import './vocabulary.css'

const vocabularyIndex = '#/lesson/97/study'
const topicHref = (number) => `${vocabularyIndex}/${String(number).padStart(2, '0')}`

function LessonLink({ topic, japanese }) {
  const number = String(topic.sourceLesson).padStart(2, '0')
  return (
    <li>
      <a className="vl-lesson-link" href={topicHref(topic.sourceLesson)}
        aria-label={japanese ? `レッスン${topic.sourceLesson}：${topic.ja}` : `Lesson ${topic.sourceLesson}: ${topic.topic}`}>
        <span className="vl-lesson-number" aria-hidden="true">{number}</span>
        <span className="vl-lesson-titles">
          <strong lang={japanese ? 'ja' : 'en'}>{japanese ? topic.ja : topic.topic}</strong>
          <small lang={japanese ? 'en' : 'ja'}>{japanese ? topic.topic : topic.ja}</small>
        </span>
        <span className="vl-lesson-arrow" aria-hidden="true">→</span>
      </a>
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
        <p className="vl-eyebrow">CHAPTER 97 · VOCABULARY</p>
        <h1>{japanese ? '語彙のレッスン' : 'Vocabulary lessons'}</h1>
        <p>{japanese
          ? '学びたいトピックを選びましょう。レッスン1と2を学習できます。その他の内容は順次追加されます。'
          : 'Choose a topic to explore. Lessons 1 and 2 are ready; more content will be added later.'}</p>
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
        <a href="#/lesson/96/study">← {japanese ? '第96課' : 'Chapter 96'}</a>
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
        <h1 lang={japanese ? 'ja' : 'en'}>{japanese ? topic.ja : topic.topic}</h1>
        <p className="vl-subtitle" lang={japanese ? 'en' : 'ja'}>{japanese ? topic.topic : topic.ja}</p>
      </header>

      {topic.sourceLesson === 1
        ? <VocabularyCountriesLesson japanese={japanese} />
        : topic.sourceLesson === 2
          ? <VocabularyNumbersLesson japanese={japanese} />
          : <section className="vl-placeholder" aria-labelledby="vl-placeholder-title">
        <div className="vl-placeholder-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M5 7.5c3.8-1.3 7.7-.8 11 1.6 3.3-2.4 7.2-2.9 11-1.6v16c-3.8-1.3-7.7-.8-11 1.6-3.3-2.4-7.2-2.9-11-1.6v-16Z" />
            <path d="M16 9.1v16M8.5 11.3c1.8-.4 3.4-.1 4.7.6M19 11.9c1.3-.7 2.9-1 4.5-.6" />
          </svg>
        </div>
        <p className="vl-section-label">COMING SOON</p>
        <h2 id="vl-placeholder-title">{japanese ? 'レッスンの内容は準備中です' : 'This lesson is being prepared'}</h2>
        <p>{japanese
          ? 'このトピックの語彙は、後から追加されます。'
          : 'Vocabulary for this topic will be added later.'}</p>
        <a className="vl-return" href={vocabularyIndex}>
          {japanese ? 'レッスン一覧に戻る' : 'Back to all lessons'}
        </a>
      </section>}

      <nav className="vl-lesson-navigation" aria-label={japanese ? '語彙レッスンの移動' : 'Vocabulary lesson navigation'}>
        {previous ? (
          <a href={topicHref(previous.sourceLesson)}>
            <span aria-hidden="true">←</span>
            <span><small>{japanese ? '前のレッスン' : 'Previous lesson'}</small>
              <strong>{japanese ? previous.ja : previous.topic}</strong></span>
          </a>
        ) : <span aria-hidden="true" />}
        {next ? (
          <a className="vl-next-lesson" href={topicHref(next.sourceLesson)}>
            <span><small>{japanese ? '次のレッスン' : 'Next lesson'}</small>
              <strong>{japanese ? next.ja : next.topic}</strong></span>
            <span aria-hidden="true">→</span>
          </a>
        ) : <span aria-hidden="true" />}
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
