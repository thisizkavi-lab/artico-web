import { useCallback, useEffect, useRef, useState } from 'react'
import CurriculumIcon from './CurriculumIcon'
import { Icon, Segments } from './components'
import { ideasLessons, ideasLesson, ideasPath } from './ideasContent'
import './ielts.css'
import './ideas.css'

const STORE = 'artico.ideas.workbook.v1'
const allTasks = ideasLessons.flatMap((lesson) => lesson.tasks)
const empty = () => ({ version:1, mainIdea:'', drafts:{}, revisions:{}, reflections:{}, completed:{}, checks:{} })
function cleanMap(value, max = 12000) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).filter(([key, v]) => /^[a-z0-9-]{2,80}$/.test(key) && typeof v === 'string').map(([key, v]) => [key, v.slice(0, max)]))
}
function readWorkbook(value) {
  if (!value || value.version !== 1) return empty()
  const drafts = cleanMap(value.drafts)
  const revisions = cleanMap(value.revisions)
  const reflections = cleanMap(value.reflections, 5000)
  const completed = Object.fromEntries(Object.entries(value.completed || {}).filter(([key, v]) => allTasks.some((t) => t.id === key) && v === true))
  const checks = Object.fromEntries(Object.entries(value.checks || {}).filter(([key, v]) => /^[0-9]{2}-[a-z]-[0-9]+$/.test(key) && v === true))
  return { version:1, mainIdea:typeof value.mainIdea === 'string' ? value.mainIdea.slice(0,3000) : '', drafts, revisions, reflections, completed, checks }
}
function loadWorkbook() {
  try { return readWorkbook(JSON.parse(window.localStorage.getItem(STORE))) }
  catch { return empty() }
}
function useWorkbook() {
  const [state, setState] = useState(loadWorkbook)
  const [status, setStatus] = useState('saved')
  const latest = useRef(state)
  const change = useCallback((fn) => {
    const next = fn(latest.current)
    latest.current = next
    try { window.localStorage.setItem(STORE, JSON.stringify(next)); setStatus('saved') }
    catch { setStatus('unavailable') }
    setState(next)
  }, [])
  useEffect(() => {
    const sync = (event) => {
      if (event.key !== STORE) return
      try {
        const next = readWorkbook(JSON.parse(event.newValue))
        latest.current = next
        setState(next)
      } catch { /* Leave the current workbook alone. */ }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  return { state, change, status }
}

const go = (path) => { window.location.hash = path }
function SaveStatus({ status }) {
  return <p className={'ie-save' + (status === 'unavailable' ? ' ie-warning' : '')} role="status">
    {status === 'unavailable' ? 'Device storage is unavailable. Copy your work before you leave.' : 'Text is saved on this device, not in an account. Voice recordings are not saved automatically.'}
  </p>
}
function Directory({ mode, completed }) {
  const icons = ['lightbulb', 'pencil', 'compass', 'school', 'route', 'messages', 'pencil', 'microphone']
  return <div className="ie-directory">
    {ideasLessons.map((lesson, index) => {
      const count = lesson.tasks.filter((task) => completed[task.id]).length
      return <a className="ie-branch" key={lesson.id} href={'#' + ideasPath(lesson.id, mode)}>
        <span className="ie-branch-icon" aria-hidden="true"><CurriculumIcon name={icons[index]} size={25}/></span>
        <span className="ie-branch-copy"><small>{lesson.id} · {count} of {lesson.tasks.length} exercises reviewed</small><strong>{lesson.title}</strong><span>{lesson.summary}</span></span>
        <Icon name="next"/>
      </a>
    })}
  </div>
}
function IdeaSeed({ store, collapsed = false }) {
  const body = <div className="id-seed-body">
    <label className="ie-field-label" htmlFor="id-seed">What question or thought are you working on?</label>
    <textarea id="id-seed" rows={3} maxLength={3000} value={store.state.mainIdea}
      placeholder="A thought that interests you. It can be incomplete, uncertain, or contradictory."
      onChange={(event) => store.change((prev) => ({ ...prev, mainIdea:event.target.value }))}/>
    <p className="ie-fineprint">This is your personal thread across lessons. You can replace it whenever your thinking changes.</p>
  </div>
  return collapsed
    ? <details className="id-seed id-seed-fold"><summary>Your idea workspace <span>{store.state.mainIdea ? '· idea saved' : '· optional'}</span></summary>{body}</details>
    : <section className="id-seed"><h2>Your idea workspace</h2><p>Keep one question alive while you learn. It does not have to be original or impressive.</p>{body}</section>
}
function Home({ route, store }) {
  const total = allTasks.length
  const done = Object.keys(store.state.completed).length
  return <>
    <header className="ie-heading"><h1>Ideas &amp; Expression</h1><p>Find out what you think. Test it. Then express it in clear, natural English.</p></header>
    <section className="id-path" aria-label="Course approach">
      <div><span>01</span><strong>Explore</strong><small>Get the thought out</small></div>
      <div><span>02</span><strong>Refine</strong><small>Question and structure it</small></div>
      <div><span>03</span><strong>Express</strong><small>Write, speak, revise</small></div>
    </section>
    <section className="ie-prose">
      <h2>Thinking is not a straight line.</h2>
      <p>An idea may start as an observation, a doubt, or a feeling. Writing and speaking can reveal gaps you had not noticed. You can return to an earlier step when the reasoning changes. The goal is not to sound certain; it is to know what you mean.</p>
      <p>A useful short-answer frame is <strong>point → support → implication</strong>. But a question, comparison, explanation, or personal reflection may need another structure. The eight lessons show you when to use each.</p>
    </section>
    <IdeaSeed store={store}/>
    <div className="id-directory-top"><h2>{route.mode === 'practice' ? 'Choose a lesson to practise' : 'Follow the thinking process'}</h2><span>{done} of {total} exercises reviewed</span></div>
    <Directory mode={route.mode} completed={store.state.completed}/>
    <SaveStatus status={store.status}/>
  </>
}
function Example({ lesson }) {
  const [open, setOpen] = useState([])
  const toggle = (i) => setOpen((current) => current.includes(i) ? current.filter((x) => x !== i) : [...current, i])
  return <section className="ie-decoded">
    <h2>Watch a thought change</h2>
    <p className="id-example-question">{lesson.example.question}</p>
    <div className="id-raw"><small>Unfinished thought</small><p>{lesson.example.raw}</p></div>
    <div className="ie-example-parts">{lesson.example.steps.map((step, i) => <div key={i}>
      <button type="button" aria-expanded={open.includes(i)} onClick={() => toggle(i)}>
        <strong>{String(i+1).padStart(2,'0')} · {step.name}</strong><span>{step.text}</span>
        <small>{open.includes(i) ? 'Hide the reasoning' : 'Why this change?'}</small>
      </button>
      {open.includes(i) && <aside><p>{step.why}</p></aside>}
    </div>)}</div>
    <div className="id-final"><small>One possible final expression</small><p>{lesson.example.final}</p></div>
    <p className="ie-fineprint">This is an illustrative process, not a perfect answer or a script to memorise. Tap each step to examine why it changed.</p>
  </section>
}
function Study({ lesson, store }) {
  return <>
    <header className="ie-heading"><p className="id-overline">LESSON {lesson.id} / STUDY</p><h1>{lesson.title}</h1><p>{lesson.goal}</p></header>
    <section className="ie-prose"><p className="ie-lead">{lesson.intro}</p>
      {lesson.principles.map((point) => <div key={point.title}><h2>{point.title}</h2><p>{point.body}</p></div>)}
    </section>
    <Example key={lesson.id} lesson={lesson}/>
    <section className="ie-prose"><h2>Language to make your own</h2><p>These are flexible sentence openings, not fixed scripts. Change or omit them to suit your actual meaning.</p>
      <ul className="id-frames">{lesson.frames.map((frame) => <li key={frame}>{frame}</li>)}</ul>
    </section>
    <div className="ie-actions"><a href={'#' + ideasPath(lesson.id, 'practice')} className="ie-button">Put it into practice</a>
      <a href={'#' + ideasPath('home','study')} className="ie-button ie-button-secondary">All lessons</a></div>
    <IdeaSeed store={store} collapsed/>
    <SaveStatus status={store.status}/>
  </>
}
function Timer({ seconds }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const endAt = useRef(null)
  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000))
      setRemaining(next)
      if (!next) setRunning(false)
    }, 200)
    return () => window.clearInterval(id)
  }, [running])
  const start = () => { endAt.current = Date.now() + remaining * 1000; setRunning(true) }
  const pause = () => { setRemaining(Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000))); setRunning(false) }
  const reset = () => { setRunning(false); setRemaining(seconds) }
  return <div className="id-timer" aria-label="Optional speaking timer">
    <span aria-live="off">{String(Math.floor(remaining/60)).padStart(2,'0')}:{String(remaining%60).padStart(2,'0')}</span>
    <button type="button" onClick={running ? pause : remaining ? start : reset}>{running ? 'Pause' : remaining ? 'Start timer' : 'Restart'}</button>
    <button type="button" onClick={reset}>Reset</button><small>Optional · {seconds} seconds</small>
  </div>
}
function VoiceRecorder({ taskId }) {
  const [stage, setStage] = useState('ready')
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [fileType, setFileType] = useState('webm')
  const recorder = useRef(null)
  const stream = useRef(null)
  const activeUrl = useRef('')
  useEffect(() => () => {
    if (recorder.current?.state === 'recording') recorder.current.stop()
    stream.current?.getTracks().forEach((track) => track.stop())
    if (activeUrl.current) URL.revokeObjectURL(activeUrl.current)
  }, [])
  const start = async () => {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setError('Recording is unavailable in this browser. You can still practise aloud.'); return }
    try {
      const mic = await navigator.mediaDevices.getUserMedia({ audio:true })
      stream.current = mic
      const chunks = []
      const recording = new MediaRecorder(mic)
      recorder.current = recording
      recording.ondataavailable = (event) => { if (event.data?.size) chunks.push(event.data) }
      recording.onstop = () => {
        mic.getTracks().forEach((track) => track.stop())
        stream.current = null
        if (chunks.length) {
          const blob = new Blob(chunks, { type:recording.mimeType || 'audio/webm' })
          if (activeUrl.current) URL.revokeObjectURL(activeUrl.current)
          activeUrl.current = URL.createObjectURL(blob)
          setUrl(activeUrl.current)
          setFileType(blob.type.includes('mp4') ? 'm4a' : blob.type.includes('ogg') ? 'ogg' : 'webm')
          setStage('review')
        } else setStage('ready')
      }
      recording.start()
      setStage('recording')
    } catch { setError('Microphone access was not granted or recording could not start. You can still practise aloud.'); micCleanup() }
  }
  const micCleanup = () => { stream.current?.getTracks().forEach((track) => track.stop()); stream.current = null }
  const stop = () => { if (recorder.current?.state === 'recording') recorder.current.stop() }
  return <section className="id-recorder" aria-label="Optional voice recorder">
    <h3>Speak and listen back</h3><p>Optional microphone recording stays in this tab. It is not uploaded or saved with your notes. Download it before leaving if you want to keep it.</p>
    <div className="ie-actions">
      {stage !== 'recording' ? <button type="button" className="ie-button" onClick={start}>Record my answer</button> : <button type="button" className="ie-button" onClick={stop}>Stop recording</button>}
      {stage === 'recording' && <span role="status">Recording…</span>}
    </div>
    {error && <p className="id-error" role="alert">{error}</p>}
    {url && <div className="id-listen"><audio controls src={url}/><a href={url} download={'artico-ideas-' + taskId + '.' + fileType}>Download this recording</a></div>}
  </section>
}
function Field({ id, label, value, onChange, placeholder, rows = 5 }) {
  return <div className="id-field"><label htmlFor={id}>{label}</label><textarea id={id} rows={rows} maxLength={12000} value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)}/></div>
}
function Exercise({ task, lesson, store }) {
  const get = (group) => store.state[group][task.id] || ''
  const set = (group, value) => store.change((prev) => ({ ...prev, [group]:{ ...prev[group], [task.id]:value } }))
  const mark = (next) => store.change((prev) => ({ ...prev, completed:{...prev.completed, [task.id]:next} }))
  return <section className="id-exercise" aria-labelledby="id-exercise-title">
    <div className="id-exercise-head"><span>{task.kind === 'speak' ? 'SPEAK · IMPROMPTU' : 'WRITE · THINK'}</span><span>{lesson.title}</span></div>
    <h2 id="id-exercise-title">{task.title}</h2>
    <p className="ie-lead">{task.prompt}</p>
    <details className="id-hint"><summary>Need a starting point?</summary><p>{task.starting}</p><p>Use it only if it helps you begin. You do not need to follow these words.</p></details>
    {task.kind === 'speak' && <><Timer key={task.id} seconds={task.seconds}/><VoiceRecorder key={task.id} taskId={task.id}/></>}
    <Field id={'id-draft-' + task.id} label={task.kind === 'speak' ? 'Your speaking outline or notes (optional)' : 'Your first attempt'} value={get('drafts')}
      placeholder={task.kind === 'speak' ? 'A few key words are enough. Do not write a full script unless you are deliberately comparing scripted and unscripted speech.' : 'Start with your own words. This is not graded.'}
      onChange={(v) => set('drafts',v)}/>
    <div className="id-review">
      <h3>Review before you retry</h3>
      <p>Check your actual answer or recording. Use these questions to identify one thing to improve.</p>
      {task.checks.map((check, i) => {
        const key = task.id + '-' + i
        return <label className="id-check" key={key}><input type="checkbox" checked={!!store.state.checks[key]} onChange={(e) => store.change((prev) => ({ ...prev, checks:{...prev.checks, [key]:e.target.checked} }))}/><span>{check}</span></label>
      })}
      <Field id={'id-revision-' + task.id} label={task.kind === 'speak' ? 'What would you change on the next attempt?' : 'Your revised answer'} value={get('revisions')} onChange={(v) => set('revisions',v)}
        placeholder={task.kind === 'speak' ? 'Name one precise change. Then try speaking again without a script.' : 'Revise the thought first, then its English.'} rows={4}/>
      <Field id={'id-reflection-' + task.id} label="What changed in your thinking?" value={get('reflections')} onChange={(v) => set('reflections',v)}
        placeholder="For example: I noticed that my example did not actually support my claim." rows={3}/>
      <div className="ie-actions">
        <button type="button" className={'ie-button' + (store.state.completed[task.id] ? ' ie-button-secondary' : '')}
          onClick={() => mark(!store.state.completed[task.id])}>{store.state.completed[task.id] ? 'Reviewed ✓ · Mark not reviewed' : 'Mark as reviewed'}</button>
        <span className="ie-fineprint">Self-assessment only; no automatic score or AI judgment.</span>
      </div>
    </div>
    <SaveStatus status={store.status}/>
  </section>
}
function Practice({ route, lesson, store }) {
  const selected = lesson.tasks.find((task) => task.id === route.task) || lesson.tasks[0]
  return <>
    <header className="ie-heading"><p className="id-overline">LESSON {lesson.id} / PRACTICE</p><h1>{lesson.title}</h1><p>Try it yourself. Review the actual result. Revise one thing and try again.</p></header>
    <nav className="id-task-nav" aria-label="Choose an exercise">
      {lesson.tasks.map((task, index) => <a key={task.id} className={task.id === selected.id ? 'is-active' : ''}
        aria-current={task.id === selected.id ? 'page' : undefined} href={'#' + ideasPath(lesson.id,'practice',task.id)}>
        <span>{String(index+1).padStart(2,'0')} · {task.title}</span>
        <small>{store.state.completed[task.id] ? 'Reviewed' : task.kind === 'speak' ? 'Speaking' : 'Writing'}</small>
      </a>)}
    </nav>
    <IdeaSeed store={store} collapsed/>
    <Exercise key={selected.id} task={selected} lesson={lesson} store={store}/>
    <div className="id-bottom-nav">
      <a href={'#' + ideasPath(lesson.id,'study')}>Review the lesson</a>
      <a href={'#' + ideasPath('home','practice')}>All exercises</a>
    </div>
  </>
}
export default function IdeasCourse({ route }) {
  const store = useWorkbook()
  const lesson = ideasLesson(route.lesson)
  const mode = route.mode === 'practice' ? 'practice' : 'study'
  return <div className="aw-page ie-page id-page" lang="en">
    <nav className="ie-breadcrumb" aria-label="Ideas & Expression breadcrumb">
      <a href="#/application">Application</a><span aria-hidden="true">/</span>
      <a href={'#' + ideasPath('home',mode)}>Ideas &amp; Expression</a>
      {lesson && <><span aria-hidden="true">/</span><span>{lesson.title}</span></>}
    </nav>
    <div className="ie-modebar"><Segments items={[{value:'study',label:'Study'},{value:'practice',label:'Practice'}]}
      label="Ideas & Expression Study or Practice" active={mode} onChange={(next) => go(ideasPath(lesson?.id || 'home', next))}/>
      <a href={'#' + ideasPath('home',mode)}>All lessons</a></div>
    {!lesson ? <Home route={{mode}} store={store}/> : mode === 'study'
      ? <Study key={lesson.id} lesson={lesson} store={store}/>
      : <Practice key={lesson.id} route={route} lesson={lesson} store={store}/>}
  </div>
}
