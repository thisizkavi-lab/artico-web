import { CourseDirectory } from './CourseNavigation'
import './ielts.css'

const TOEIC_BASE = '/application/tests/toeic'

// Course structure only. Learning content and test questions will be added later.
const sections = [
  { id: 'overview', title: 'Everything about TOEIC', icon: 'compass', summary: 'Exam format, scoring, and how to prepare.' },
  { id: 'listening', title: 'Listening', icon: 'ear', summary: 'Parts 1–4 · Photographs, responses, conversations, and short talks.' },
  { id: 'reading', title: 'Reading', icon: 'book', summary: 'Parts 5–7 · Sentences, texts, and reading comprehension.' },
  { id: 'mocks', title: 'Mock Tests', icon: 'clock', summary: 'Timed practice and full-length simulations · Planned.' },
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

function CourseHome() {
  return <><h1 className="cn-sr-only">TOEIC Listening &amp; Reading</h1>
    <CourseDirectory label="TOEIC course outline" items={sections.map(section => ({ ...section,
      summary:section.summary + ' Outline only; lessons are planned.', href:'#' + TOEIC_BASE + '/' + section.id,
    }))}/>
  </>
}

function CourseSection({ area }) {
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
      <h2>Planned practice</h2>
      <p>Full-length timed tests, shorter section rehearsals, answer explanations, and error review will be added here. No simulated score is available yet.</p>
    </section> : <section className="ie-prose">
      <h2>{area === 'listening' ? '45 minutes · 100 questions' : '75 minutes · 100 questions'}</h2>
      <ol>{parts[area].map((part) =>
        <li key={part.number}>
          <strong>Part {part.number}: {part.name}</strong> · {part.count} questions
          <p>{part.summary}</p>
        </li>
      )}</ol>
      <p className="ie-fineprint">Lessons, examples, and question-by-question practice are planned for each part.</p>
    </section>}
    <a className="ie-back" href={`#${TOEIC_BASE}/home`}>← All TOEIC sections</a>
  </>
}

export default function ToeicCourse({ route }) {
  const area = sections.some((item) => item.id === route.area) ? route.area : 'home'
  return <div className={'aw-page ie-page' + (area === 'home' ? ' cn-index' : '')} lang="en">
    {area !== 'home' && <nav className="ie-breadcrumb" aria-label="TOEIC breadcrumb">
      <a href="#/application/tests">English Tests</a>
      <span aria-hidden="true">/</span>
      {area === 'home' ? <span>TOEIC L&amp;R</span> : <a href={`#${TOEIC_BASE}/home`}>TOEIC L&amp;R</a>}
      {area !== 'home' ? <><span aria-hidden="true">/</span><span>{sections.find((item) => item.id === area).title}</span></> : null}
    </nav>}
    {area === 'home' ? <CourseHome/> : <CourseSection area={area}/>}
    {area !== 'home' && <p className="ie-fineprint">Independent preparation outline. Artico is not affiliated with or endorsed by ETS or the TOEIC program.</p>}
  </div>
}
