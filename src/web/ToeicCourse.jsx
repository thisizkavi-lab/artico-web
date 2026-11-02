import ApplicationPractice, { PracticeText, PracticePicture } from './ApplicationPractice'
import { toeicPractice } from './toeicPractice'
import { applicationMode, applicationPath } from './applicationNavigation'
import { CourseDirectory } from './CourseNavigation'
import './ielts.css'

const TOEIC_BASE = '/application/tests/toeic'

// Course outline with original guided examples and short practice sets.
const sections = [
  { id: 'overview', title: 'Everything about TOEIC', icon: 'compass', summary: 'Exam format, scoring, and how to prepare.' },
  { id: 'listening', title: 'Listening', icon: 'ear', summary: 'Parts 1–4 · Photographs, responses, conversations, and short talks.' },
  { id: 'reading', title: 'Reading', icon: 'book', summary: 'Parts 5–7 · Sentences, texts, and reading comprehension.' },
  { id: 'mocks', title: 'Mock Tests', icon: 'clock', summary:'Try a short rehearsal and review your evidence.' },
]

const parts = {
  listening: [
    { number: 1, name: 'Photographs', count: 6, summary: 'Choose the statement that best describes a picture.' },
    { number: 2, name: 'Question–Response', count: 25, summary: 'Hear a question or statement and choose the best response.' },
    { number: 3, name: 'Conversations', count: 39, summary: 'Listen to conversations and answer questions.' },
    { number: 4, name: 'Short Talks', count: 30, summary: 'Listen to announcements and talks and answer questions.' },
  ],
  reading: [
    { number: 5, name: 'Incomplete Sentences', count: 30, summary: 'Choose the word or phrase that completes a sentence.' },
    { number: 6, name: 'Text Completion', count: 16, summary: 'Complete short texts using context and grammar.' },
    { number: 7, name: 'Reading Comprehension', count: 54, summary: 'Read one or more documents and answer questions.' },
  ],
}

function CourseHome({ mode }) {
  return <><h1 className="cn-sr-only">TOEIC Listening &amp; Reading</h1>
    <CourseDirectory label="TOEIC course outline" items={sections.map(section => ({ ...section,
      summary:section.summary, href:'#' + TOEIC_BASE + '/' + section.id + '/' + mode,
    }))}/>
  </>
}

function CourseSection({ area, mode }) {
  const section = sections.find((item) => item.id === area)
  return <>
    <header className="ie-heading">
      <span className="ie-eyebrow">TOEIC L&amp;R · COURSE OUTLINE</span>
      <h1>{section.title}</h1>
      <p>{section.summary}</p>
    </header>
    {area === 'overview' ? <section className="ie-prose">
      <h2>Test at a glance</h2>
      <p>Listening has 100 questions (approximately 45 minutes). Reading has 100 questions (75 minutes). Both are multiple-choice. Each section is scored from 5–495, for a combined score of 10–990. There is no pass or fail.</p>
      <h2>Course plan</h2>
      <p>This section will explain registration, scoring, timing, test-day rules, and how to build a study plan.</p>
    </section> : area === 'mocks' ? <section className="ie-prose">
      <h2>Rehearse, then review</h2>
      <p>Use Practice to try a short original rehearsal and review the evidence for each answer. A full-length TOEIC simulation is not part of this starter course, and these exercises do not predict a test score.</p>
    </section> : <section className="ie-prose">
      <h2>{area === 'listening' ? '45 minutes · 100 questions' : '75 minutes · 100 questions'}</h2>
      <ol>{parts[area].map((part) =>
        <li key={part.number}>
          <strong>Part {part.number}: {part.name}</strong> · {part.count} questions
          <p>{part.summary}</p>
        </li>
      )}</ol>
      <p className="ie-fineprint">The guided examples below illustrate the task types. Use Practice to make your own choice before checking the explanation.</p>
    </section>}
    <section className="ac-toeic-examples"><h2>See the task in context</h2>{toeicPractice[area].questions.map(question => <article className="ac-toeic-example" key={question.id}>
      <h3>{question.part}</h3>{question.picture && <PracticePicture/>}<p className="ac-practice-context"><PracticeText text={question.context || question.audio || ''}/></p><p><strong>{question.prompt}</strong></p>
      <table><tbody><tr><th scope="row">One answer</th><td>{question.options[question.answer]}</td></tr><tr><th scope="row">Why it fits</th><td><PracticeText text={question.explanation}/></td></tr></tbody></table>
    </article>)}</section>
    <a className="ie-back" href={`#${TOEIC_BASE}/home/${mode}`}>← All TOEIC sections</a>
  </>
}

export default function ToeicCourse({ route }) {
  const mode = applicationMode(route)
  const area = sections.some((item) => item.id === route.area) ? route.area : 'home'
  return <div className={'aw-page ie-page' + (area === 'home' ? ' cn-index' : '')} lang="en">
    {area !== 'home' && <nav className="ie-breadcrumb" aria-label="TOEIC breadcrumb">
      <a href="#/application/tests">English Tests</a>
      <span aria-hidden="true">/</span>
      {area === 'home' ? <span>TOEIC L&amp;R</span> : <a href={`#${TOEIC_BASE}/home/${mode}`}>TOEIC L&amp;R</a>}
      {area !== 'home' ? <><span aria-hidden="true">/</span><span>{sections.find((item) => item.id === area).title}</span></> : null}
    </nav>}
    {area === 'home' ? <CourseHome mode={mode}/> : mode === 'practice' ? <ApplicationPractice {...toeicPractice[area]} title={sections.find(section => section.id === area).title}/> : <CourseSection area={area} mode={mode}/>}
    {area !== 'home' && <p className="ie-fineprint">Independent learning materials. Artico is not affiliated with or endorsed by ETS or the TOEIC program.</p>}
  </div>
}
