import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CurriculumIcon from './CurriculumIcon'
import { IELTS_CONTENT_VERSION, skillInfo } from './ieltsContent'
import { ieltsPath } from './ieltsNavigation'
import { applyAttemptChange, clockSeconds, completeAttempt, exposeTask, formatClock, hasSeenTask, makeAttempt, markQuestions, pauseAttempt, updateAttempt, wordCount } from './ieltsState'

function Timer({ attempt, finish, patch }) {
  const [now, setNow] = useState(Date.now)
  const onFinish = useRef(finish)
  onFinish.current = finish
  useEffect(() => {
    if (attempt.status !== 'active') return
    const tick = () => {
      const current = Date.now()
      setNow(current)
      if (attempt.deadline !== null && attempt.pausedAt === null && current >= attempt.deadline) onFinish.current('timeout')
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [attempt.deadline, attempt.pausedAt, attempt.status])
  const seconds = clockSeconds(attempt, now)
  return <div className={`ie-timer ${attempt.deadline !== null && seconds < 60 ? 'ie-timer-low' : ''}`}>
    <CurriculumIcon name="clock" size={20}/><span><small>{attempt.deadline !== null ? 'Time remaining' : 'Time spent'}</small><strong role="timer" aria-label={attempt.deadline !== null ? 'Time remaining' : 'Elapsed time'}>{formatClock(seconds)}</strong></span>
    {attempt.status === 'active' && attempt.mode !== 'mock' ? <button type="button" className="ie-text-button" onClick={() => { patch((current) => pauseAttempt(current)); setNow(Date.now()) }}>{attempt.pausedAt !== null ? 'Resume' : 'Pause'}</button> : null}
  </div>
}
function Confirmation({ action, close, submit, unanswered, flagged, writingCounts, speaking }) {
  const ref = useRef(null)
  useEffect(() => { const previous = document.activeElement; ref.current.showModal(); return () => previous?.focus?.() }, [])
  return <dialog className="ie-dialog" ref={ref} aria-labelledby="ie-confirm-title" onCancel={(event) => { event.preventDefault(); close() }}>
    <h2 id="ie-confirm-title">{action === 'finish' ? 'Finish this attempt?' : 'Leave this attempt?'}</h2>
    <p>{action === 'finish' ? 'Your original work will be kept for review. You cannot change that submitted version.' : 'Your saved work stays on this device. A running timed attempt keeps counting while you are away.'}</p>
    {action === 'finish' && unanswered !== null ? <p>{unanswered} unanswered · {flagged} flagged for review</p> : null}
    {action === 'finish' && writingCounts?.length ? <ul>{writingCounts.map((item) => <li key={item.id}>{item.title}: {item.words} words · task minimum {item.minimum}</li>)}</ul> : null}
    {action === 'leave' && speaking ? <p>Download any recording first. Undownloaded recordings do not survive leaving this workbook.</p> : null}
    <div className="ie-actions"><button className="ie-button ie-button-secondary" type="button" onClick={close}>Keep working</button><button className="ie-button" type="button" onClick={submit}>{action === 'finish' ? 'Finish and review' : 'Leave; keep my work'}</button></div>
  </dialog>
}
function TaskSetup({ route, task, store }) {
  const mock = task.kind === 'writing-mock'
  const guided = route.area === 'guided' && route.view === 'study'
  const [timed, setTimed] = useState(true)
  const seen = hasSeenTask(store.state, task)
  const mode = mock ? 'mock' : guided ? 'guided' : 'drill'
  const start = () => {
    const id = globalThis.crypto?.randomUUID?.() ?? `run-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const attempt = makeAttempt(task, { id, mode, timed: mock || timed, seenBefore: seen, version: IELTS_CONTENT_VERSION })
    store.change((previous) => {
      const exposed = exposeTask(previous, task)
      return { ...exposed, attempts: [...exposed.attempts, attempt] }
    })
    window.location.hash = ieltsPath(route.area, route.view, task.id, id)
  }
  return <>
    <header className="ie-heading"><h1>{task.title}</h1><p>{task.label}</p></header>
    {route.attempt ? <p className="ie-warning" role="status">That saved attempt is not on this device. Your other work is unchanged. You can start a new attempt below.</p> : null}
    <section className="ie-prose"><h2>What you will get out of this</h2><ul>{task.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section>
    <section className="ie-setup"><h2>Choose your conditions</h2><p>{seen ? 'You have opened this task or shared material before. This attempt will be labelled as seen material.' : 'This material has not been opened in this browser’s IELTS workbook. That does not establish that you have never seen it elsewhere.'}</p>
      {!mock ? <fieldset><legend>Timing</legend><label><input type="radio" name="ie-timing" checked={timed} onChange={() => setTimed(true)}/><span>Timed practice <small>{task.minutes} minutes · pausing allowed</small></span></label><label><input type="radio" name="ie-timing" checked={!timed} onChange={() => setTimed(false)}/><span>Untimed practice <small>Elapsed time remains visible</small></span></label></fieldset> : <p><strong>60 minutes, one shared clock.</strong> No pause or coaching. Changing tabs, refreshing, or leaving does not reset the deadline.</p>}
      <p>{guided ? 'Coaching and evidence are available on request. Assisted work is learning evidence, not an independent assessment.' : 'Answers and review guidance appear after you finish. There is no automatic band score.'}</p>
      {task.kind === 'listening' ? <p>The short recording uses a synthetic training voice. Replay is allowed in this workshop; this is not a full Listening mock.</p> : null}
      {task.kind === 'speaking' ? <p>Prepare for one minute, then speak for up to two minutes. Recording is optional and stays in this tab until you download it. No microphone is opened automatically.</p> : null}
      {store.saveState === 'unavailable' ? <p className="ie-warning">Device storage is unavailable. Your answers may be lost if you leave. Use a browser with storage enabled before starting a mock.</p> : null}
      <button type="button" className="ie-button" onClick={start} disabled={mock && store.saveState === 'unavailable'}>{mock ? 'Start 60-minute Writing rehearsal' : guided ? 'Start guided workbook' : 'Start practice'}</button>
    </section>
  </>
}
function DataTable({ table }) {
  return <div className="ie-table-wrap"><table><caption>{table.caption}</caption><thead><tr>{table.headings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
}
function WritingArea({ task, attempt, patch, complete }) {
  const tasks = task.tasks ?? [task]
  const [index, setIndex] = useState(0)
  const current = tasks[index]
  return <>
    {tasks.length > 1 ? <div className="ie-task-tabs" role="group" aria-label="Writing tasks">{tasks.map((item, i) => <button type="button" key={item.id} aria-pressed={index === i} onClick={() => setIndex(i)}>Task {i + 1}<small>{wordCount(attempt.answers[item.id])} words</small></button>)}</div> : null}
    <div className="ie-split ie-writing"><section className="ie-source" aria-label="Writing prompt"><h2>{current.title}</h2><p className="ie-task-label">{current.label}</p><p>{current.prompt}</p>{current.table ? <DataTable table={current.table}/> : null}
      {!complete && attempt.mode === 'guided' ? <details className="ie-coach"><summary>Open the planning coach · assisted practice</summary><p>{current.review}</p><ul>{current.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul><p>Try a first response before reading more. The aim is to understand the choice, not copy a model.</p></details> : null}
    </section>
      <section className="ie-answer-pane"><label className="ie-field-label" htmlFor={`ie-writing-${current.id}`}>{complete ? 'Your submitted response' : 'Your response'}</label><textarea id={`ie-writing-${current.id}`} rows={16} maxLength={40000} readOnly={complete} value={attempt.answers[current.id] ?? ''} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" onChange={(event) => {
        const value = event.target.value
        patch((run) => ({ ...run, answers: { ...run.answers, [current.id]: value } }))
      }}/><p className="ie-wordcount">{wordCount(attempt.answers[current.id])} words <span>· task minimum {current.minimum}</span></p>
      {complete ? <section className="ie-review-guidance"><h3>Review the task, not just the word count</h3><p>{current.review}</p><label className="ie-field-label" htmlFor={`ie-revision-${current.id}`}>Your revised response (kept separately)</label><textarea id={`ie-revision-${current.id}`} rows={8} maxLength={40000} value={attempt.answers[`revision-${current.id}`] ?? ''} onChange={(event) => { const value = event.target.value; patch((run) => ({ ...run, answers: { ...run.answers, [`revision-${current.id}`]: value } })) }}/></section> : null}
    </section></div>
  </>
}
function QuestionReview({ task, attempt, revealEvidence }) {
  return <div className="ie-question-reviews">{markQuestions(task, attempt.answers).map((question, i) => <section key={question.id} id={`ie-question-${question.id}`} tabIndex={-1} className="ie-question-review"><div><strong>Question {i + 1}</strong><span className={question.correct ? 'ie-correct' : 'ie-needs-review'}>{question.correct ? 'Correct' : question.entered ? 'Review this answer' : 'Unanswered'}</span></div><p>{question.text}</p><dl><div><dt>Your answer</dt><dd>{question.entered || 'No answer'}</dd></div><div><dt>Accepted answer</dt><dd>{question.answer}</dd></div></dl><p>{question.why}</p><button type="button" className="ie-text-button" onClick={() => revealEvidence(question.paragraph)}>Show evidence in {task.kind === 'listening' ? 'transcript' : 'passage'}</button></section>)}</div>
}
function QuestionsArea({ task, attempt, patch, complete, paused }) {
  const [mobileTab, setMobileTab] = useState('questions')
  const [coach, setCoach] = useState(false)
  const [evidence, setEvidence] = useState(null)
  const [transcript, setTranscript] = useState(complete)
  const source = useRef(null)
  const questions = useRef(null)
  const audio = useRef(null)
  const positions = useRef({ passage: 0, questions: 0 })
  const pagePositions = useRef({ passage: null, questions: null })
  const tabs = useRef(null)
  useEffect(() => { if (paused) audio.current?.pause() }, [paused])
  useEffect(() => { const element = audio.current; return () => element?.pause() }, [])
  const switchPane = (pane) => {
    const viewport = document.getElementById('aw-content')
    if (viewport) pagePositions.current[mobileTab] = viewport.scrollTop
    const toolbarHeight = Number.parseFloat(tabs.current?.closest('.ie-attempt')?.style.getPropertyValue('--ie-toolbar-height')) || 95
    const firstPosition = viewport && tabs.current ? viewport.scrollTop + tabs.current.getBoundingClientRect().top - viewport.getBoundingClientRect().top - toolbarHeight : 0
    setMobileTab(pane)
    requestAnimationFrame(() => {
      const element = pane === 'passage' ? source.current : questions.current
      if (element) element.scrollTop = positions.current[pane]
      if (viewport) viewport.scrollTop = pagePositions.current[pane] ?? firstPosition
    })
  }
  const sourceItems = task.passage ?? task.transcript
  const canCoach = attempt.mode === 'guided' || complete
  const revealEvidence = (paragraph) => {
    setEvidence(paragraph); setMobileTab('passage'); setTranscript(true)
    requestAnimationFrame(() => source.current?.querySelector(`[data-paragraph="${paragraph}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
  }
  return <>
    {task.kind === 'listening' ? <div className="ie-listening-player"><h2>Workshop recording</h2><audio ref={audio} controls preload="metadata" src={`${import.meta.env.BASE_URL}${task.audio}`} onPlay={() => patch((run) => ({ ...run, audioStarted: true }))} onEnded={() => patch((run) => ({ ...run, audioCompleted: true }))} onError={() => patch((run) => ({ ...run, audioError: true }))}/><p>Original script · synthetic voice · replay allowed in this short workshop.</p>{attempt.audioError ? <p className="ie-warning" role="alert">The recording could not load. Your answers are preserved. Check the connection before continuing; this attempt records the audio problem.</p> : null}
      {canCoach ? <button className="ie-text-button" type="button" aria-expanded={transcript} onClick={() => { setTranscript(!transcript); if (!complete) patch((run) => ({ ...run, assisted: true })) }}>{transcript ? 'Hide transcript' : 'Show transcript (teaching help)'}</button> : <p>The transcript becomes available after you finish.</p>}</div> : null}
    {task.kind !== 'listening' || transcript ? <div ref={tabs} className="ie-mobile-panes" role="group" aria-label="Reading workspace pane"><button type="button" aria-pressed={mobileTab === 'passage'} onClick={() => switchPane('passage')}>{task.kind === 'listening' ? 'Transcript' : 'Passage'}</button><button type="button" aria-pressed={mobileTab === 'questions'} onClick={() => switchPane('questions')}>Questions</button></div> : null}
    <div className={`ie-split ie-question-workspace ${task.kind === 'listening' && !transcript ? 'ie-split-questions-only' : ''}`}>
      <section className={`ie-source ${mobileTab !== 'passage' ? 'ie-hide-mobile' : ''}`} aria-label={task.kind === 'listening' ? 'Transcript' : 'Reading passage'} ref={source} hidden={task.kind === 'listening' && !transcript} onScroll={(event) => { if (mobileTab === 'passage') positions.current.passage = event.currentTarget.scrollTop }}>
        <h2>{task.kind === 'listening' ? 'Transcript' : task.title}</h2>{sourceItems.map((part) => <p key={part.id} data-paragraph={part.id} className={evidence === part.id ? 'ie-evidence' : ''}><strong>{part.label}</strong> {part.text}</p>)}
      </section>
      <section className={`ie-answer-pane ${mobileTab !== 'questions' ? 'ie-hide-mobile' : ''}`} aria-label="Questions" ref={questions} onScroll={(event) => { if (mobileTab === 'questions') positions.current.questions = event.currentTarget.scrollTop }}>
        <p>{task.prompt}</p>
        <div className="ie-question-nav" role="group" aria-label="Question navigator">{task.questions.map((question, i) => <button type="button" key={question.id} className={attempt.answers[question.id] ? 'ie-answered' : ''} aria-label={`Question ${i + 1}, ${attempt.answers[question.id] ? 'answered' : 'unanswered'}${attempt.flags.includes(question.id) ? ', flagged' : ''}`} onClick={() => document.getElementById(`ie-question-${question.id}`)?.focus()}>{i + 1}{attempt.flags.includes(question.id) ? <span aria-hidden="true">*</span> : null}</button>)}</div>
        {complete ? <QuestionReview task={task} attempt={attempt} revealEvidence={revealEvidence}/> : <div className="ie-question-list">{task.questions.map((question, i) => <fieldset key={question.id} id={`ie-question-${question.id}`} tabIndex={-1}><legend>{i + 1}. {question.text}</legend><label className="ie-sr" htmlFor={`ie-answer-${question.id}`}>Answer to question {i + 1}: {question.text}</label><select id={`ie-answer-${question.id}`} value={attempt.answers[question.id] ?? ''} onChange={(event) => {
          const value = event.target.value
          patch((run) => ({ ...run, answers: { ...run.answers, [question.id]: value } }))
        }}><option value="">Choose an answer</option>{(question.options ?? ['TRUE', 'FALSE', 'NOT GIVEN']).map((option) => <option key={option} value={option}>{option}</option>)}</select><button className="ie-text-button" type="button" aria-pressed={attempt.flags.includes(question.id)} onClick={() => patch((run) => ({ ...run, flags: run.flags.includes(question.id) ? run.flags.filter((id) => id !== question.id) : [...run.flags, question.id] }))}>{attempt.flags.includes(question.id) ? 'Flagged · remove flag' : 'Flag for review'}</button></fieldset>)}</div>}
        {!complete && canCoach ? <div className="ie-coach"><button className="ie-button ie-button-secondary" type="button" aria-expanded={coach} onClick={() => { setCoach(!coach); patch((run) => ({ ...run, assisted: true })) }}>{coach ? 'Close coach' : 'Open coach · reveal explanations'}</button>{coach ? <><p>This is assisted practice. Try each question before reading its explanation.</p>{task.questions.map((question, i) => <details key={question.id}><summary>Question {i + 1} · evidence and explanation</summary><p><strong>{question.answer}.</strong> {question.why}</p><button className="ie-text-button" type="button" onClick={() => revealEvidence(question.paragraph)}>Find the evidence</button></details>)}</> : null}</div> : null}
      </section>
    </div>
  </>
}
function Recorder({ complete }) {
  const recorder = useRef(null)
  const stream = useRef(null)
  const urlRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [url, setUrl] = useState(null)
  const [error, setError] = useState('')
  const mounted = useRef(true)
  const finished = useRef(complete)
  finished.current = complete
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; recorder.current?.state === 'recording' && recorder.current.stop(); stream.current?.getTracks().forEach((track) => track.stop()); if (urlRef.current) URL.revokeObjectURL(urlRef.current) }
  }, [])
  useEffect(() => { if (complete && recorder.current?.state === 'recording') recorder.current.stop() }, [complete])
  const start = async () => {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setError('Recording is not supported here. You can practise aloud and use your own recorder.'); return }
    setStatus('requesting')
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!mounted.current || finished.current) { media.getTracks().forEach((track) => track.stop()); if (mounted.current) setStatus('idle'); return }
      stream.current = media
      const recording = new MediaRecorder(media)
      const chunks = []
      recorder.current = recording
      recording.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data) }
      recording.onstop = () => {
        media.getTracks().forEach((track) => track.stop())
        if (!mounted.current) return
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const objectUrl = URL.createObjectURL(new Blob(chunks, { type: recording.mimeType }))
        urlRef.current = objectUrl; setUrl(objectUrl); setStatus('ready')
      }
      recording.onerror = () => { media.getTracks().forEach((track) => track.stop()); if (mounted.current) { setError('Recording failed. Your workbook notes are unaffected.'); setStatus('idle') } }
      recording.start(); setStatus('recording')
    } catch { stream.current?.getTracks().forEach((track) => track.stop()); if (mounted.current) { setError('Microphone access was not available. You can still practise aloud and write a short reflection.'); setStatus('idle') } }
  }
  return <section className="ie-recorder"><h3>Listen to yourself</h3><p>Optional recording. No audio is uploaded. Download it before leaving or refreshing; recordings are not saved in the workbook.</p>
    {!complete ? <button className="ie-button ie-button-secondary" type="button" disabled={status === 'requesting'} onClick={status === 'recording' ? () => recorder.current.stop() : start}>{status === 'recording' ? 'Stop recording' : status === 'requesting' ? 'Waiting for microphone permission…' : url ? 'Record another take (replaces this recording)' : 'Record on this device'}</button> : null}
    <p role="status">{status === 'recording' ? 'Recording is on.' : status === 'ready' ? 'Recording ready. Download it to keep a copy.' : 'Microphone is off.'}</p>
    {error ? <p role="alert" className="ie-warning">{error}</p> : null}
    {url ? <><audio controls src={url}/><a className="ie-text-button" href={url} download={`artico-speaking.${recorder.current?.mimeType.includes('mp4') ? 'm4a' : 'webm'}`}>Download recording</a></> : null}
  </section>
}
function SpeakingPhase({ attempt }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => { const interval = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(interval) }, [])
  const elapsed = Math.max(0, ((attempt.pausedAt ?? now) - attempt.startedAt - attempt.pausedTotal) / 1000)
  return <p className="ie-speaking-stage" role="status">{elapsed < 60 ? 'Preparation · make brief notes for up to one minute.' : 'Speaking · develop your answer for up to two minutes.'}</p>
}
function SpeakingArea({ task, attempt, patch, complete, paused }) {
  return <div className="ie-split ie-speaking"><section className="ie-source"><h2>Your cue card</h2><p className="ie-lead">{task.prompt}</p><p>You should say:</p><ul>{task.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{!complete ? <SpeakingPhase attempt={attempt}/> : null}
    {!complete && attempt.mode === 'guided' ? <details className="ie-coach"><summary>Open the speaking coach · assisted practice</summary><p>Choose one real example. Put a keyword beside each cue, then add a specific moment or detail. Use the notes to guide your meaning; do not read a written speech.</p><ul>{task.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul><p>If you lose your thread, return to the question. Afterward, listen to one moment and choose a change to test with a new topic.</p></details> : null}
    <label className="ie-field-label" htmlFor="ie-speaking-notes">{complete ? 'Your original preparation notes' : 'Your preparation notes'}</label><textarea id="ie-speaking-notes" rows={6} maxLength={12000} value={attempt.notes} readOnly={complete} onChange={(event) => { const value = event.target.value; patch((run) => ({ ...run, notes: value })) }}/>
    {complete ? <div className="ie-review-guidance"><h3>Transfer to a general question</h3><p>{task.followUp}</p><p>{task.review}</p></div> : null}</section><div className="ie-answer-pane"><Recorder complete={complete || paused}/>{complete ? <section className="ie-prose"><h3>Self-review, not an automatic band</h3><ul>{skillInfo.speaking.check.map((item) => <li key={item}>{item}</li>)}</ul><p>A written transcript cannot establish pronunciation. Use your recording and, where possible, feedback from a qualified teacher.</p></section> : null}</div></div>
}
export default function IeltsWorkspace({ route, task, attempt, store }) {
  const [confirmation, setConfirmation] = useState(null)
  const toolbar = useRef(null)
  const article = useRef(null)
  useLayoutEffect(() => {
    if (!toolbar.current) return
    const measure = () => article.current?.style.setProperty('--ie-toolbar-height', `${Math.ceil(toolbar.current.getBoundingClientRect().height)}px`)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(toolbar.current)
    return () => observer.disconnect()
  }, [attempt?.id])
  const patch = useCallback((updater) => store.change((previous) => updateAttempt(previous, attempt?.id, (run) => applyAttemptChange(run, updater))), [store.change, attempt?.id])
  const finish = useCallback((reason) => patch((run) => completeAttempt(run, reason)), [patch])
  if (!attempt) return <TaskSetup route={route} task={task} store={store}/>
  const complete = attempt.status === 'completed'
  const marked = markQuestions(task, attempt.answers)
  const paused = attempt.pausedAt !== null && !complete
  const unanswered = task.questions ? task.questions.filter((question) => !attempt.answers[question.id]).length : null
  return <article ref={article} className={`ie-attempt ${complete ? 'ie-completed' : ''}`}>
    <header ref={toolbar} className="ie-attempt-header"><div><span>{complete ? 'Review your work' : attempt.mode === 'guided' ? 'Guided workbook' : attempt.mode === 'mock' ? 'Independent rehearsal' : 'Practice workbook'}</span><h1>{task.title}</h1></div><Timer attempt={attempt} finish={finish} patch={patch}/></header>
    <div className="ie-attempt-meta"><span>{attempt.seenBefore ? 'Seen material / retake' : 'First opening recorded here'}</span><span>{attempt.assisted ? 'Teaching support enabled' : 'No teaching hints'}</span>{attempt.interrupted ? <span>Interrupted attempt</span> : null}<span role="status">{store.saveState === 'saving' ? 'Saving…' : store.saveState === 'saved' ? 'Saved on this device' : 'Not saved · storage unavailable'}</span></div>
    {store.saveState === 'unavailable' ? <p className="ie-warning" role="alert">Your current work is only in this tab. Copy it before leaving or refreshing.</p> : null}
    {complete ? <section className="ie-result-summary" role="status"><h2>{attempt.finishReason === 'timeout' ? 'Time is up. Your work is preserved.' : 'Attempt saved. Now do the useful part.'}</h2>{task.questions ? <p><strong>{marked.filter((question) => question.correct).length} / {marked.length} correct</strong> on this short exercise. This is a raw practice result, not an IELTS band.</p> : <p>Review your original response, make a targeted repair, then try a fresh task. There is no AI-generated band score.</p>}{task.kind === 'listening' && !attempt.audioCompleted ? <p>The recording was not played to the end in this attempt. Treat this as incomplete listening practice.</p> : null}</section> : null}
    {paused ? <section className="ie-paused"><h2>Practice paused</h2><p>The working area is hidden until you resume.</p><button type="button" className="ie-button" onClick={() => patch((run) => pauseAttempt(run))}>Resume practice</button></section> : null}
    <div hidden={paused}>
      {['reading', 'listening'].includes(task.kind) ? <QuestionsArea task={task} attempt={attempt} patch={patch} complete={complete} paused={paused}/> : task.kind === 'speaking' ? <SpeakingArea task={task} attempt={attempt} patch={patch} complete={complete} paused={paused}/> : <WritingArea task={task} attempt={attempt} patch={patch} complete={complete}/>}
      {complete ? <section className="ie-workbook"><h2>Repair, then transfer.</h2><label className="ie-field-label" htmlFor="ie-attempt-reflection">What went wrong, what will you change, and what will you try next?</label><textarea id="ie-attempt-reflection" rows={4} maxLength={12000} value={attempt.reflection} onChange={(event) => { const value = event.target.value; patch((run) => ({ ...run, reflection: value })) }}/><div className="ie-actions"><a className="ie-button" href={`#${ieltsPath(task.skill, 'practice')}`}>Choose a fresh task</a><a className="ie-button ie-button-secondary" href={`#${ieltsPath(route.area, route.view, task.id)}`}>Repeat as seen material</a><a className="ie-text-button" href={`#${ieltsPath(task.skill)}`}>Revisit the study guide</a></div></section> : null}
    </div>
    <footer className="ie-attempt-footer">{complete ? <a className="ie-button ie-button-secondary" href={`#${ieltsPath('home', 'practice')}`}>Back to IELTS</a> : <><button className="ie-button ie-button-secondary" type="button" onClick={() => setConfirmation('leave')}>Leave attempt</button><button className="ie-button" type="button" disabled={paused} onClick={() => setConfirmation('finish')}>Finish and review</button></>}</footer>
    {confirmation ? <Confirmation action={confirmation} unanswered={unanswered} flagged={attempt.flags.length} speaking={task.kind === 'speaking'} writingCounts={['essay', 'data', 'writing-mock'].includes(task.kind) ? (task.tasks ?? [task]).map((item) => ({ id: item.id, title: item.title, minimum: item.minimum, words: wordCount(attempt.answers[item.id]) })) : null} close={() => setConfirmation(null)} submit={() => {
      if (confirmation === 'finish') finish('submitted')
      else { patch((run) => ({ ...run, interrupted: true })); window.location.hash = ieltsPath('home', 'practice') }
      setConfirmation(null)
    }}/> : null}
  </article>
}
