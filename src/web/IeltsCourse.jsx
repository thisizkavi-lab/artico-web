import { useCallback, useEffect, useRef, useState } from 'react'
import CurriculumIcon from './CurriculumIcon'
import { Icon, Segments } from './components'
import { ieltsAreas, ieltsArea, ieltsPath } from './ieltsNavigation'
import { guidedSets, officialResources, skillInfo, skillTasks, taskById, writingMock } from './ieltsContent'
import { IELTS_STORAGE_KEY, emptyIelts, exposeTask, hasSeenTask, loadIelts, sanitiseIelts, updateAttempt } from './ieltsState'
import IeltsWorkspace from './IeltsWorkspace'
import IeltsStudyView from './ielts-study/IeltsStudyView'
import './ielts.css'

const go = (path) => { window.location.hash = path }
function useWorkbook() {
  const [state, setState] = useState(() => {
    try { return loadIelts(window.localStorage) } catch { return emptyIelts() }
  })
  const [saveState, setSaveState] = useState('saved')
  const latest = useRef(state)
  useEffect(() => {
    try { window.localStorage.setItem(IELTS_STORAGE_KEY, window.localStorage.getItem(IELTS_STORAGE_KEY) ?? JSON.stringify(latest.current)); setSaveState('saved') }
    catch { setSaveState('unavailable') }
  }, [])
  useEffect(() => {
    const flush = () => {
      try { window.localStorage.setItem(IELTS_STORAGE_KEY, JSON.stringify(latest.current)) } catch { /* The visible status already explains unavailable storage. */ }
    }
    const receive = (event) => {
      if (event.key !== IELTS_STORAGE_KEY) return
      try {
        const incoming = sanitiseIelts(JSON.parse(event.newValue))
        latest.current = incoming; setState(incoming)
      } catch { /* Ignore a malformed external update; do not clear current work. */ }
    }
    window.addEventListener('pagehide', flush)
    window.addEventListener('storage', receive)
    return () => { window.removeEventListener('pagehide', flush); window.removeEventListener('storage', receive) }
  }, [])
  const change = useCallback((updater) => {
    // Commit before changing the hash. The app's route boundary may unmount us.
    let current = latest.current
    try {
      const saved = JSON.parse(window.localStorage.getItem(IELTS_STORAGE_KEY))
      if (saved?.version === 1) current = sanitiseIelts(saved)
    } catch { /* Continue in memory if storage is blocked. */ }
    const next = updater(current)
    latest.current = next
    try { window.localStorage.setItem(IELTS_STORAGE_KEY, JSON.stringify(next)); setSaveState('saved') }
    catch { setSaveState('unavailable') }
    setState(next)
  }, [])
  return { state, change, saveState }
}
function SaveNotice({ status }) {
  return <p className={`ie-save ${status === 'unavailable' ? 'ie-warning' : ''}`} role="status">{status === 'unavailable'
    ? 'Device storage is unavailable. Keep this tab open and copy your work before leaving.'
    : status === 'saving' ? 'Saving on this device…' : 'Workbook saved on this device. Not synced to an account.'}</p>
}
function Directory({ items, mode = 'study' }) {
  return <div className="ie-directory">{items.map((item, index) => <a className="ie-branch" key={item.id} href={`#${item.href ?? ieltsPath(item.id, ['mocks', 'simulation'].includes(item.id) ? 'practice' : mode)}`}>
    <span className="ie-branch-icon" aria-hidden="true"><CurriculumIcon name={item.icon ?? 'book'} size={25}/></span>
    <span className="ie-branch-copy"><small>{String(index + 1).padStart(2, '0')}</small><strong>{item.title}</strong><span>{item.summary}</span></span>
    <Icon name="next"/>
  </a>)}</div>
}
function Note({ id, label, state, change, rows = 4, placeholder }) {
  return <div className="ie-note"><label htmlFor={`ie-note-${id}`}>{label}</label><textarea id={`ie-note-${id}`} rows={rows} maxLength={12000} value={state.notes[id] ?? ''} placeholder={placeholder ?? 'Use your own words. A short, specific note is enough.'}
    onChange={(event) => { const value = event.target.value; change((prev) => ({ ...prev, notes: { ...prev.notes, [id]: value } })) }}/></div>
}
function Workbook({ area, state, change, saveState }) {
  return <section className="ie-workbook" aria-labelledby={`ie-workbook-${area}`}>
    <div className="ie-section-head"><CurriculumIcon name="pencil"/><h2 id={`ie-workbook-${area}`}>Your workbook</h2></div>
    <p>Leave with a decision, not just another page read.</p>
    <Note id={`${area}-takeaway`} label="What did you notice, and what will you try next?" state={state} change={change}/>
    <SaveNotice status={saveState}/>
  </section>
}
function TestsHome() {
  return <div className="aw-page ie-page" lang="en">
    <a className="ie-back" href="#/application">Back to Application</a>
    <header className="ie-heading"><h1>English Tests</h1><p>Use your English for the result you need. Choose a test to begin.</p></header>
    <Directory items={[{ id: 'ielts', title: 'IELTS Academic', icon: 'school', summary: 'Study the test. Practise each skill. Build toward an independent rehearsal.', href: ieltsPath() }]}/>
    <p className="ie-fineprint">IELTS Academic is the first test course available here. Other exam tracks will be added separately.</p>
  </div>
}
function History({ state }) {
  const attempts = state.attempts.filter((attempt) => taskById[attempt.taskId]).slice().reverse().slice(0, 8)
  if (!attempts.length) return null
  return <section className="ie-history"><h2>Your recent work</h2><ul>{attempts.map((attempt) => {
    const task = taskById[attempt.taskId]
    return <li key={attempt.id}><a href={`#${ieltsPath(task.skill, 'practice', task.id, attempt.id)}`}><span><strong>{task.title}</strong><small>{new Date(attempt.startedAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })} · {attempt.mode === 'guided' ? 'Guided' : attempt.mode === 'mock' ? 'Timed rehearsal' : 'Practice'}{attempt.seenBefore ? ' · Seen material' : ''}</small></span><b>{attempt.status === 'completed' ? 'Review' : 'Resume'}</b></a></li>
  })}</ul></section>
}
function IeltsHome({ route, store }) {
  return <><header className="ie-heading"><h1>IELTS Academic</h1><p>Know what the test asks. Practise doing it. Use the evidence to improve.</p></header>
    <Directory items={ieltsAreas} mode={route.view}/>
    <History state={store.state}/>
    <p className="ie-fineprint">An independent Artico preparation course. Not affiliated with IELTS. Original activities are training material, not official tests or a Band 9 guarantee.</p>
  </>
}
function Overview({ route, store }) {
  if (route.view === 'practice') return <>
    <header className="ie-heading"><h1>Make your preparation plan.</h1><p>Start with the outcome you need. Then collect evidence from all four skills.</p></header>
    <section className="ie-prose"><h2>Before you practise</h2><p>Check the organisation that will receive your score. Write down its overall requirement, any minimum in each skill, the accepted test type, and your deadline. Do not assume that an overall score can make up for a required skill minimum.</p></section>
    <div className="ie-plan"><Note id="goal" label="What do you need IELTS for, and what score is required?" {...store}/><Note id="deadline" label="What is your deadline, and how much practice time can you protect?" {...store}/><Note id="baseline" label="What evidence do you have for your current level in each skill?" {...store}/></div>
    <section className="ie-prose"><h2>Your first practice loop</h2><ol><li>Try a short activity in each skill.</li><li>Review an actual answer or recording—not a feeling about your English.</li><li>Choose one repair and practise it.</li><li>Test the change with a new task.</li></ol></section>
    <Directory items={ieltsAreas.filter((a) => ['speaking', 'writing', 'listening', 'reading'].includes(a.id))} mode="practice"/>
    <SaveNotice status={store.saveState}/>
  </>
  return <>
    <header className="ie-heading"><h1>Everything about IELTS</h1><p>You need a score for a reason. This course connects that goal to work you can actually do.</p></header>
    <section className="ie-prose"><h2>What is IELTS?</h2><p>IELTS assesses Listening, Reading, Writing, and Speaking. Academic and General Training share Listening and Speaking, while their Reading and Writing tests differ. This course focuses on Academic, commonly used for higher education and professional registration. Check the requirement of your receiving organisation.</p><h2>Knowing English and showing it</h2><p>You may understand more than you can retrieve under pressure. You may also have gaps in language, not only exam technique. We will use actual work to find the difference. Familiarity with the format helps, but it cannot replace the English skills the test assesses.</p></section>
    <div className="ie-table-wrap"><table><caption>The Academic test at a glance</caption><thead><tr><th scope="col">Skill</th><th scope="col">Time</th><th scope="col">Work</th></tr></thead><tbody>{Object.entries(skillInfo).map(([id, info]) => <tr key={id}><th scope="row"><a href={`#${ieltsPath(id)}`}>{info.title}</a></th><td>{info.duration}</td><td>{info.structure}</td></tr>)}</tbody></table></div>
    <section className="ie-prose"><h2>What does Band 9 mean?</h2><p>It is the top of the IELTS scale: expert performance. It is not a collection of rare words or a reward for finishing a course. Build accurate understanding, precise meaning, coherent responses, and reliable control. Use official criteria and fresh work to judge progress. This website does not certify a band.</p><h2>Study and Practice do different jobs</h2><p>Study explains the task and decodes examples. Practice asks you to act: answer, write, speak, listen, review, and transfer. You can move between them without completing a long theory gate first.</p><h2>Prepare for the delivery mode you will take</h2><p>IELTS announced a move away from fully paper-based delivery from mid-2026, with timing varying by market. A Writing on Paper option is available in selected markets within computer-delivered testing. Verify local availability and access arrangements before booking.</p></section>
    <Resources/>
    <Workbook area="overview" {...store}/>
  </>
}
function Resources() {
  return <section className="ie-resources"><h2>Check the official source</h2><ul>{officialResources.map((resource) => <li key={resource.url}><a href={resource.url} target="_blank" rel="noreferrer">{resource.title}<span className="ie-sr"> (opens in a new tab)</span></a></li>)}</ul><p className="ie-fineprint">Format guidance checked 28 October 2026. Official examples stay on the provider’s site; they are not copied into this course.</p></section>
}
function DecodedExample({ skill, store }) {
  const info = skillInfo[skill]
  const [selected, setSelected] = useState(null)
  const audio = useRef(null)
  useEffect(() => { const element = audio.current; return () => element?.pause() }, [])
  return <section className="ie-decoded" aria-labelledby="ie-decode-title"><h2 id="ie-decode-title">Notice the choices.</h2><p>{info.model.question}</p>
    {skill === 'speaking' ? <div className="ie-media"><audio ref={audio} controls preload="none" src={`${import.meta.env.BASE_URL}audio/ielts/speaking-example.wav`}/><small>Original illustrative response · synthetic voice, not an assessed candidate recording.</small></div> : null}
    <div className="ie-example-parts">{info.model.segments.map(([label, sample, explanation], index) => <div key={label}><button type="button" aria-expanded={selected === index} onClick={() => {
      setSelected(selected === index ? null : index)
      store.change((prev) => skillTasks(skill).slice(0, 1).reduce(exposeTask, prev))
    }}><span>{sample}</span><small>{selected === index ? 'Close annotation' : 'Explain this choice'}</small></button>{selected === index ? <aside><strong>{label}</strong><p>{explanation}</p></aside> : null}</div>)}</div>
    <p className="ie-fineprint">Tap a section to decode it. This is an original teaching example—not a required script or a certified band model.</p>
  </section>
}
function TaskList({ tasks, area, state }) {
  return <div className="ie-task-list">{tasks.map((task) => <a key={task.id} href={`#${ieltsPath(area ?? task.skill, 'practice', task.id)}`}>
    <span><strong>{task.title}</strong><small>{task.label}</small></span><span className="ie-task-status">{hasSeenTask(state, task) ? 'Seen material' : 'Not attempted here'}<b>Open workbook</b></span>
  </a>)}</div>
}
function Skill({ route, store }) {
  const info = skillInfo[route.area]
  return <>
    <header className="ie-heading"><h1>{info.title}</h1><p>{info.goal}</p><div className="ie-facts"><span>{info.duration}</span><span>{info.structure}</span></div></header>
    {route.view === 'study' ? <><section className="ie-prose"><p className="ie-lead">{info.intro}</p>{info.sections.map((section) => <div key={section.title}><h2>{section.title}</h2><p>{section.body}</p></div>)}</section><DecodedExample key={route.area} skill={route.area} store={store}/>
      <section className="ie-prose"><h2>Review with a purpose</h2><ul>{info.check.map((check) => <li key={check}>{check}</li>)}</ul></section>
      {route.area === 'speaking' ? <section className="ie-prose"><h2>Watch a real test example</h2><p>Use the official sample hub to watch an examiner/candidate example. First watch for the task and response. Then use the public commentary to compare your judgment. Do not infer a band from confidence, an accent, or one impressive phrase.</p><a href={officialResources[1].url} target="_blank" rel="noreferrer">Open official Speaking examples</a></section> : null}
      <a className="ie-button" href={`#${ieltsPath(route.area, 'practice')}`}>Put it into practice</a>
      <Workbook area={route.area} {...store}/>
    </> : <><section className="ie-prose"><h2>Choose a topic or task</h2><p>Short, focused work. Your first answer is preserved; review comes after you finish. Select a workbook to choose timed or untimed practice.</p></section><TaskList tasks={skillTasks(route.area)} state={store.state}/>
      <div className="ie-next-links"><a href={`#${ieltsPath('guided')}`}>Need a worked approach? Open Guided Sets</a><a href={`#${ieltsPath('mocks', 'practice')}`}>Ready for a complete skill? Open Skill Mocks</a></div><History state={store.state}/>
    </>}
  </>
}
function Guided({ route, store }) {
  return <><header className="ie-heading"><h1>Guided Sets</h1><p>Four workshops, not four compulsory exams. Open one skill at a time.</p></header><p className="ie-lead">{route.view === 'study' ? 'See the approach, try the work, and reveal annotations when you need them.' : 'Make your own decisions first. Sets C and D keep the coaching until review.'}</p>
    <div className="ie-guided-list">{guidedSets.map((set, index) => <section className="ie-guided-set" key={set.id}><span className="ie-set-letter" aria-hidden="true">{set.id.toUpperCase()}</span><div><h2>{set.title}</h2><p>{set.summary}</p><small>{set.support}</small><ul>{set.taskIds.map((id) => {
      const task = taskById[id]
      return <li key={id}><a href={`#${ieltsPath('guided', index < 2 ? 'study' : 'practice', id)}`}><strong>{skillInfo[task.skill].title}</strong><span>{task.title}</span><span>{task.minutes} min</span></a></li>
    })}</ul></div></section>)}</div>
    <p className="ie-fineprint">Shared passages and previously opened tasks are labelled as seen. These workshops do not cover every possible task type; the practice bank will expand separately.</p><Workbook area="guided" {...store}/></>
}
function Mocks({ route, store }) {
  return <><header className="ie-heading"><h1>Individual Skill Mocks</h1><p>One skill, clear conditions, no teaching help while the clock runs.</p></header>
    <section className="ie-prose"><h2>Check what a set actually contains</h2><p>A short drill is not a full mock. This first release has a complete two-task Writing rehearsal. Reading, Listening, and Speaking have focused workshops; their full-length mock forms are still in production. No shortened exercise is converted to an IELTS band.</p></section>
    <div className="ie-mock-list">{Object.entries(skillInfo).map(([id, info]) => <section key={id}><CurriculumIcon name={ieltsArea(id).icon} size={26}/><div><h2>{info.title}</h2><p>{info.structure} · {info.duration}</p>{id === 'writing' ? <><strong className="ie-available">Original rehearsal available</strong><TaskList tasks={[writingMock]} area="mocks" state={store.state}/></> : <><span className="ie-fineprint">Full-length form in production. Focused practice is available now.</span><a className="ie-button ie-button-secondary" href={`#${ieltsPath(id, 'practice')}`}>Practise {info.title.toLowerCase()}</a></>}</div></section>)}</div>
    <Resources/><History state={store.state}/><Workbook area="mocks" {...store}/>
  </>
}
function Simulation({ route, store }) {
  return <><header className="ie-heading"><h1>Full Simulations</h1><p>Rehearse the event, not just a collection of familiar questions.</p></header>
    <section className="ie-prose"><h2>One linked rehearsal</h2><p>Listening, Reading, and Writing run in sequence without teaching explanations between them. Speaking is a complete separate session attached to the same rehearsal record. A standard simulation does not offer pause, hints, model answers, or audio replay.</p></section>
    <ol className="ie-simulation-steps">{['Listening', 'Reading', 'Writing', 'Speaking'].map((name) => <li key={name}><strong>{name}</strong><span>{skillInfo[name.toLowerCase()].duration}</span><small>{name === 'Speaking' ? 'Separate session' : 'No mid-test feedback'}</small></li>)}</ol>
    <section className="ie-availability" role="note"><h2>No complete simulation set is released yet.</h2><p>The navigation and preparation workbook are ready. A linked simulation will be enabled only when a complete, checked Reading and Listening form and its recordings are available. Starting a 2½-hour clock over a few sample questions would give you a misleading rehearsal.</p><a className="ie-button" href={`#${ieltsPath('mocks', 'practice')}`}>Open available skill practice</a></section>
    <section className="ie-prose"><h2>Your rehearsal checklist</h2><ul><li>Use a quiet place and a desktop or laptop for computer-test practice.</li><li>Check sound, keyboard, and the connection before the clock starts.</li><li>Reserve unfamiliar material. Retakes are useful but not fresh diagnostics.</li><li>Finish the attempt before reading explanations.</li><li>Review the evidence and choose the next repair.</li></ul></section>
    <Workbook area="simulation" {...store}/>
  </>
}
export default function IeltsCourse({ route }) {
  const store = useWorkbook()
  const previousRun = useRef(null)
  useEffect(() => {
    if (previousRun.current && previousRun.current !== route.attempt) {
      const id = previousRun.current
      store.change((prev) => updateAttempt(prev, id, (attempt) => attempt.status === 'active' ? { ...attempt, interrupted: true } : attempt))
    }
    previousRun.current = route.attempt ?? null
  }, [route.attempt, store.change])
  if (!route.exam) return <TestsHome/>
  const activeAttempt = store.state.attempts.find((attempt) => attempt.id === route.attempt && attempt.taskId === route.task)
  const task = taskById[route.task]
  const area = ieltsArea(route.area)
  const isRunning = activeAttempt?.status === 'active'
  const isStudyReader = route.view === 'study' && ['overview', 'speaking', 'writing', 'listening', 'reading'].includes(route.area)
  return <div className={`aw-page ie-page ${route.task || isStudyReader ? 'ie-page-wide' : ''}`} lang="en">
    <nav className="ie-breadcrumb" aria-label="IELTS breadcrumb"><a href="#/application/tests">English Tests</a><span aria-hidden="true">/</span><a href={`#${ieltsPath('home', route.view)}`}>IELTS Academic</a>{area ? <><span aria-hidden="true">/</span><span>{area.title}</span></> : null}</nav>
    <div className="ie-modebar"><Segments items={[{ value: 'study', label: 'Study' }, { value: 'practice', label: 'Practice' }]} label="IELTS Study or Practice" active={route.view} disabled={isRunning} onChange={(mode) => {
      if (isRunning) return
      go(ieltsPath(route.area, mode, route.task))
    }}/>{isRunning ? <span>Finish or leave this attempt before changing modes.</span> : <a href={`#${ieltsPath('home', route.view)}`}>All IELTS sections</a>}</div>
    {route.task ? task ? <IeltsWorkspace key={activeAttempt?.id ?? `${task.id}-${route.view}-${route.area}`} route={route} task={task} attempt={activeAttempt} store={store}/> : <section className="ie-prose"><h1>That workbook is not available.</h1><a href={`#${ieltsPath('home')}`}>Return to IELTS</a></section> : route.view === 'study' && ['home', 'overview', 'speaking', 'writing', 'listening', 'reading'].includes(route.area) ? <IeltsStudyView route={route} store={store} /> : route.area === 'home' ? <IeltsHome route={route} store={store}/> : route.area === 'overview' ? <Overview route={route} store={store}/> : skillInfo[route.area] ? <Skill route={route} store={store}/> : route.area === 'guided' ? <Guided route={route} store={store}/> : route.area === 'mocks' ? <Mocks route={route} store={store}/> : <Simulation route={route} store={store}/>}
  </div>
}
