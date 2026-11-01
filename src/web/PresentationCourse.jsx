import { useEffect, useState } from 'react'
import {
  presentationLessons as lessons, presentationCases as cases, presentationSituations as situations,
  presentationPhrases as phrases, presentationSources as sources, presentationParts as parts,
  presentationBlueprintFields as fields, presentationSourceVideos as sourceVideos,
  presentationWorksheets as worksheets, presentationDiscussionPrompts as discussions,
} from './presentationCourseData'
import './presentation-course.css'

const root = '#/application/presentations'
const blueprintKey = (caseId, field) => 'application-presentations-blueprint-' + caseId + '-' + field
const noteKey = (id) => 'application-presentations-note-' + id
const doneKey = (id) => 'application-presentations-done-' + id
const contextKey = 'application-presentations-context'
const pathFor = (id, mode = 'study') => root + '/' + id + '/' + mode
const caseNames = { custom: 'My own talk', ...Object.fromEntries(cases.map(item => [item.id, item.type])) }
const sourceLinks = sources.map(item => item.url)

function Mark({children}) { return <mark className="ps-marker">{children}</mark> }
function BlueprintStatus({ learning, caseId }) {
  const filled = fields.filter(([key]) => (learning.responses?.[blueprintKey(caseId,key)] || '').trim()).length
  return <span className="ps-completion">{filled} / {fields.length} blueprint fields</span>
}
function SavedText({ learning, update, responseKey, placeholder, rows = 5, label }) {
  const value = learning.responses?.[responseKey] || ''
  const onChange = (event) => update(prev => ({
    ...prev,
    responses: { ...prev.responses, [responseKey]: event.target.value.slice(0,4900) },
  }))
  return <label className="ps-textarea-label">
    <span>{label || 'Your notes'}</span>
    <textarea value={value} onChange={onChange} placeholder={placeholder || 'Write in your own words…'} rows={rows} maxLength={4900} />
    <small>Saved on this device as you type. Do not enter confidential information.</small>
  </label>
}
function CaseSwitcher({caseId,onChange}) {
  return <label className="ps-select-label">Presentation context
    <select value={caseId} onChange={e => onChange(e.target.value)}>
      <option value="custom">My own talk</option>
      {cases.map(item=><option key={item.id} value={item.id}>{item.type}</option>)}
    </select>
  </label>
}
function VisualCompare() {
 const [showBetter,setShowBetter]=useState(true)
 return <section className="ps-visual" aria-label="Slide design comparison">
  <div className="ps-visual-head"><div><span className="ps-kicker">SAME SYNTHETIC DATA · DIFFERENT DESIGN</span><h3>Help the audience see the claim.</h3></div>
   <div className="ps-switch" role="group" aria-label="Select slide design"><button className={!showBetter?'active':''} onClick={()=>setShowBetter(false)} aria-pressed={!showBetter}>Before</button><button className={showBetter?'active':''} onClick={()=>setShowBetter(true)} aria-pressed={showBetter}>After</button></div>
  </div>
  {showBetter?<div className="ps-slide ps-slide-good">
    <p className="ps-slide-label">SYNTHETIC TRAINING DATA · NOT REAL CUSTOMER DATA</p><h4>Verification is where most users leave the example workflow.</h4>
    <div className="ps-funnel">{[[100,'Started'],[71,'Profile'],[43,'Verification'],[39,'Finished']].map(([value,label])=><div key={label}><span>{label}</span><div className="ps-bar-track"><i style={{width:value+'%'}}/></div><b>{value}%</b></div>)}</div>
    <small>Illustrative percentages; common denominator is 100 users who started. This chart shows where drop-off occurs, not why.</small>
   </div>:<div className="ps-slide ps-slide-bad">
    <p className="ps-slide-label">RESULTS · SAME SYNTHETIC DATA</p><h4>RESULTS</h4>
    <p>100 users started. 71 reached profile setup. 43 reached verification. 39 finished.</p>
    <ul><li>Started: 100</li><li>Profile: 71</li><li>Verification: 43</li><li>Finished: 39</li></ul>
    <small>The values are present, but the slide does not show the main comparison clearly.</small>
   </div>}
  <p className="ps-annotation"><strong>Notice:</strong> {showBetter?'The title states a defensible observation. The bars make the comparison visible. The speaker must still avoid claiming why users leave without further evidence.':'The same numbers are listed, but the audience must reconstruct the pattern while listening.'}</p>
 </section>
}
function GraphExample() {
  return <section className="ps-chart" aria-label="Illustrative protein conformations bar chart">
    <span className="ps-kicker">SYNTHETIC TRAINING DATA · NOT EXPERIMENTAL DATA</span>
    <h3>Share of 100 simulated snapshots</h3>
    <div className="ps-bars">
      {[[62,'A'],[27,'B'],[11,'C']].map(([value,label])=><div className="ps-bar-col" key={label}><span>{value}%</span><div style={{height: value/62*165+'px'}} /><b>Conformation {label}</b></div>)}
    </div>
    <p>Vertical quantity: share of snapshots (%). The three bars sum to 100%. The simulation may not have sampled rare states adequately; do not infer equilibrium or function from this graphic.</p>
  </section>
}
function Decision({lesson}) {
  const [selected,setSelected] = useState(null)
  return <section className="ps-decision"><span className="ps-kicker">NOTICE · MAKE A DECISION</span>
    <h3>{lesson.question}</h3>
    <div className="ps-options">{lesson.options.map((option,index)=><button key={option} type="button" aria-pressed={selected===index}
      className={selected===index?'selected':''} onClick={()=>setSelected(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>
    {selected!==null && <div className="ps-answer" role="status"><strong>{selected===lesson.answer?'This fits the purpose.':'Look at the audience’s actual need.'}</strong><p>{lesson.reason}</p></div>}
    <p className="ps-small">No points or automatic speaking evaluation. Use the reasoning to revise your own work.</p>
  </section>
}
function CaseDetails({item}) {
  return <article className="ps-case-details">
    <header><span className="ps-kicker">{item.type}</span><h3>{item.title}</h3><p><Mark>{item.message}</Mark></p></header>
    <div className="ps-case-meta"><div><b>Audience</b><p>{item.audience}</p></div><div><b>Purpose</b><p>{item.purpose}</p></div></div>
    <h4>How the talk is built</h4><ol className="ps-numbered">{item.logic.map(s=><li key={s}>{s}</li>)}</ol>
    <h4>Opening · what the speaker actually says</h4><blockquote className="ps-spoken">{item.opening}</blockquote>
    <h4>Evidence and visual plan</h4><p>{item.evidence}</p><p>{item.visual}</p>
    {item.id==='science' && <GraphExample/>}
    <div className="ps-caution"><b>Uncertainty / limitation</b><p>{item.limits}</p></div>
    <h4>Ending</h4><blockquote className="ps-spoken">{item.ending}</blockquote>
    <h4>Question and answer</h4><p className="ps-dialogue">{item.question}</p>
    <div className="ps-improvement"><b>Revision · before → after</b><p>{item.revise}</p></div>
    <small className="ps-kicker">{item.style}</small>
  </article>
}

function AudienceStudio(){
 const examples=[
  ['Same-field researcher','What are the sampled cluster populations, transition pathways, and convergence diagnostics?','Methods, uncertainties and comparisons to the field'],
  ['Scientist in another discipline','The structure is one frame of a moving molecule. Our simulations sample other possible frames.','Define ensemble, then show what can be inferred'],
  ['Undergraduate student','A protein changes shape, like a flexible object. A collection of its shapes gives a better picture than one model.','Start with a concrete motion example'],
  ['Business decision-maker','A single static image may miss shape changes relevant to drug binding. We need evidence before treating those changes as useful targets.','Decision relevance, cost and limits'],
  ['General audience','Proteins are tiny moving machines. One picture may show only one of the shapes they take.','Simple meaning without claiming every shape is functional'],
 ]
 const [index,setIndex]=useState(0)
 return <section className="ps-audience-studio">
  <span className="ps-kicker">INTERACTIVE · ONE IDEA, FIVE AUDIENCES</span><h3>Watch the explanation change.</h3>
  <div className="ps-audience-tabs" role="group" aria-label="Choose the audience">{examples.map(([name],i)=><button key={name} className={index===i?'active':''} aria-pressed={index===i} onClick={()=>setIndex(i)}>{name}</button>)}</div>
  <blockquote className="ps-spoken">“{examples[index][1]}”</blockquote>
  <p className="ps-annotation"><strong>What changed:</strong> {examples[index][2]}. The underlying claim remains limited: one static structure cannot characterize a full ensemble.</p>
 </section>
}
function QuestionLab(){
 const situations=[
  {name:'Research objection',prompt:'“Your simulation is too short. Why should I trust those populations?”',answers:['The numbers are precise, so they must be right.','That is a real limitation. I need independent runs and convergence checks before treating these as stable populations.','Everyone uses simulations this short.'],best:1,note:'Accept the relevant criticism; propose a discriminating test rather than defending the indefensible.'},
  {name:'Business objection',prompt:'“Your recommendation assumes Monday represents a normal week. Does it?”',answers:['Monday is always representative.','We cannot tell yet. I recommend measuring comparable days before a permanent decision.','The numbers are close enough.'],best:1,note:'Find the disputed assumption, not a way to win the exchange.'},
  {name:'Live demo fails',prompt:'“The booking button did nothing. Is this product ready?”',answers:['It worked in rehearsal, so it definitely works.','The action failed here. This is a prototype, and we need to fix it before deployment. I can show the documented intended flow.','That is just your internet.'],best:1,note:'Describe the observed failure and the known limit; do not present a screenshot as proof that the live step worked.'},
  {name:'Unexpected question',prompt:'“What happens to participants six months later?” (You only measured one week.)',answers:['They almost certainly keep improving.','We did not follow them for six months, so I cannot answer from these data.','There were no problems that I remember.'],best:1,note:'Distinguish what is not measured from what is measured.'},
 ]
 const [s,setS]=useState(0),[answer,setAnswer]=useState(null)
 return <section className="ps-question-lab"><span className="ps-kicker">LIVE PRESSURE · THINK BEFORE YOU ANSWER</span><h3>What would you say?</h3>
 <div className="ps-audience-tabs">{situations.map((q,i)=><button key={q.name} onClick={()=>{setS(i);setAnswer(null)}} className={s===i?'active':''}>{q.name}</button>)}</div>
 <p className="ps-question-prompt">{situations[s].prompt}</p>
 <div className="ps-options">{situations[s].answers.map((text,i)=><button key={i} onClick={()=>setAnswer(i)} className={answer===i?'selected':''}>{text}</button>)}</div>
 {answer!==null&&<p className="ps-annotation" role="status"><strong>{answer===situations[s].best?'Evidence-respecting response.':'Reconsider the evidence boundary.'}</strong> {situations[s].note}</p>}
 </section>
}


function PhraseReference(){
 const [filter,setFilter]=useState('All')
 const functions=[...new Set(phrases.map(([name])=>name))]
 const filtered=filter==='All'?phrases:phrases.filter(([name])=>name===filter)
 return <section className="ps-phrases" id="spoken-language"><span className="ps-kicker">WORDS YOU CAN ACTUALLY SAY</span><h2>A small phrase reference.</h2><p>Use the wording for its purpose and context, not as a script to memorize. Select a communication job to see an example and a caution.</p>
 <label className="ps-select-label">Communication job<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="All">All useful expressions</option>{functions.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
 <div className="ps-phrase-list">{filtered.map(([name,expression,context,note])=><div key={name}><small>{name} · {context}</small><blockquote>“{expression}”</blockquote><p>{note}</p></div>)}</div>
 </section>
}

function HalfLifeLab({learning,update}) {
 const durations=[60,30,15,8]
 const [round,setRound]=useState(0)
 const [seconds,setSeconds]=useState(60)
 const [running,setRunning]=useState(false)
 const [complete,setComplete]=useState(false)
 useEffect(()=>{
  if(!running)return
  const timer=window.setInterval(()=>setSeconds(value=>Math.max(0,value-1)),1000)
  return ()=>window.clearInterval(timer)
 },[running])
 useEffect(()=>{
  if(!running||seconds!==0)return
  if(round<durations.length-1){
   setRound(round+1)
   setSeconds(durations[round+1])
  }else{
   setRunning(false)
   setComplete(true)
  }
 },[running,seconds,round])
 const reset=()=>{setRunning(false);setRound(0);setSeconds(60);setComplete(false)}
 const format=value=>String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0')
 return <section className="ps-half-life">
  <span className="ps-kicker">MESSAGE DISCOVERY · 3-MINUTE EXERCISE</span>
  <h3>Half-Life Your Message</h3>
  <p>First, free-associate briefly about the topic without outlining or judging ideas. Then stand or move if comfortable and speak spontaneously for 60 seconds, followed by 30, 15 and 8 seconds. The timer moves directly between rounds. Do not stop to edit and do not simply speak faster. A partner can give time cues if you prefer. They should not evaluate you during the rounds. The point is private message discovery, not a sound-bite contest. This is not an icebreaker or a judged speech; a partner is only there to keep time, not critique the message during the rounds.</p>
  <SavedText learning={learning} update={update} responseKey="application-presentations-half-life-brainstorm" label="Quick free-association (optional)" rows={2} placeholder="Jot down ideas without organising or editing them…"/>
  <div className="ps-half-life-timer">
   <div><span className="ps-kicker">ROUND {round+1} OF 4 · {durations[round]} SECONDS</span><strong aria-label={seconds+' seconds remaining'}>{format(seconds)}</strong><div className="ps-half-life-track"><i style={{width:((durations[round]-seconds)/durations[round]*100)+'%'}}/></div></div>
   <div className="ps-half-life-controls">
    {!running&&!complete&&<button type="button" className="ps-primary" onClick={()=>setRunning(true)}>{round===0?'Start 60-second round':'Resume '+durations[round]+'-second round'}</button>}
    {running&&<button type="button" className="ps-secondary" onClick={()=>setRunning(false)}>Pause</button>}
    {complete&&<span className="ps-half-life-complete">All four rounds complete</span>}
    <button type="button" className="ps-secondary" onClick={reset}>Reset</button>
   </div>
  </div>
  <div className="ps-annotation"><strong>Now debrief:</strong> What survived each round? What disappeared? Which version is most useful for this audience and goal? Restore any qualification needed to keep the message accurate. The shortest version is not automatically the best final version.</div>
  <div className="ps-half-life-grid">{durations.map(duration=><SavedText key={duration} learning={learning} update={update} responseKey={'application-presentations-half-life-'+duration} label={duration+'-second version'} rows={3} placeholder="After the exercise, jot down or transcribe what you said…"/>)}</div>
  <p className="ps-small">The source article recommends a quick, spontaneous sequence, then reflection and optional recording. Artico does not record your voice. You can use a phone or computer recorder if you want to review the actual delivery.</p>
 </section>
}
function FeedbackRubric({learning,update,caseId}){
 const read=key=>(learning.responses?.[blueprintKey(caseId,key)]||'').trim()
 const value=(key)=>read(key)||'Not set yet — add this in your Presentation Blueprint.'
 const rows=[
  ["Audience and purpose","Could the listener identify why this talk mattered? Did it achieve the stated goal?"],
  ["Core message","Ask the listener to state the main takeaway in their own words. Is it accurate?"],
  ["Title and opening","Did the title set an accurate expectation? Did the opening give enough relevant background and earn attention without exaggeration?"],
  ["Body and evidence","Were methods, data, controls and comparisons clear enough to judge the claim? Were important limitations visible?"],
  ["Structure and flow","Did each section follow logically? Were transitions clear? Did any section feel unnecessary or out of order?"],
  ["Story and examples","Did a vignette, analogy or example make the idea clearer? Did it distract, distort or overstate?"],
  ["Language and jargon","Which terms needed defining? Was any wording ambiguous or too dense to follow aloud?"],
  ["Slides and figures","Did titles state useful messages? Were figures readable, labelled and uncluttered? Were colours, scales and text accessible?"],
  ["Delivery and connection","Could the listener hear and follow the speaker? Were pauses, pace, emphasis and interaction useful for this setting?"],
  ["Timing","Did the talk fit the actual limit and leave appropriate time for discussion?"],
  ["Ending and next step","Did the conclusion reinforce the message and explain its implication, next question or requested action?"],
  ["Access, credits and readiness","Were captions, contrast, room/remote needs, acknowledgements, funding, image/source credits and a technical fallback handled?"],
  ["Q&A","Did the speaker listen, clarify, answer from evidence and acknowledge what remains unknown?"]
 ]
 return <section className="ps-feedback-rubric">
  <span className="ps-kicker">REHEARSAL TOOL · FORMATIVE FEEDBACK</span>
  <h3>Give your reviewer the context first.</h3>
  <p>Before the rehearsal, tell the reviewer who the talk is for, what it should achieve, how long it should take and where/how it will be delivered. Tell them which part you especially want them to examine. If you are reviewing slides, ask them to note the slide number or moment.</p>
  <div className="ps-reviewer-brief">
   {[['Audience','audience'],['Goal','goal'],['Occasion, format and time','occasion']].map(([label,key])=><div key={key}><b>{label}</b><p>{value(key)}</p></div>)}
  </div>
  <h4>What to listen and look for</h4>
  <div className="ps-rubric-list">{rows.map(([name,question])=><div key={name}><b>{name}</b><p>{question}</p></div>)}</div>
  <div className="ps-reviewer-notes">
   <SavedText learning={learning} update={update} responseKey={blueprintKey(caseId,'review')} label="Feedback received" placeholder="What did the listener understand? Where did they lose the thread? Which explanation, figure or transition needs work?"/>
   <SavedText learning={learning} update={update} responseKey={blueprintKey(caseId,'revision')} label="Revision to make and retest" placeholder="Name one substantive change, why it should help, and how you will check it in the next run."/>
  </div>
  <p className="ps-small">Ask for one specific moment that worked and one moment that became difficult to follow. This is not a charisma score: feedback should describe observable effects on the audience.</p>
 </section>
}
function EthicsLab(){
 const [choice,setChoice]=useState(null)
 const options=[
  "Use the most dramatic chart and leave the small sample size in backup.",
  "Show the chart with its sample size and uncertainty, then explain why the result is still preliminary.",
  "Use a vivid anecdote as proof that the treatment works."
 ]
 return <section className="ps-ethics-lab"><span className="ps-kicker">ETHICS CHECK · SCIENCE AND PERSUASION</span><h3>You have one slide and a preliminary result. What do you do?</h3>
  <div className="ps-options">{options.map((option,i)=><button key={option} onClick={()=>setChoice(i)} className={choice===i?'selected':''} aria-pressed={choice===i}>{option}</button>)}</div>
  {choice!==null&&<p className="ps-annotation" role="status"><strong>{choice===1?'The defensible choice.':'This risks misleading the audience.'}</strong> A story can illustrate a case, but it cannot replace representative evidence. A chart should preserve the information needed to judge its strength.</p>}
 </section>
}
function DiscussionPrompts(){
 return <section className="ps-discussion"><span className="ps-kicker">DISCUSS · REFLECT · TEST YOUR THINKING</span><h2>Good speaking improves through exchange.</h2><p>Use these original prompts with a partner, colleague, mentor or journal. They are designed to make the ideas personal rather than turn the course into passive video watching.</p>
  <div className="ps-discussion-grid">{discussions.map(group=><article key={group.module}><span className="ps-kicker">{group.module}</span>{group.prompts.map((prompt,i)=><p key={i}>{prompt}</p>)}</article>)}</div>
 </section>
}

function ResourceLinks() {
 const moduleNames={"01":"Module 1 · Framing your talk","02":"Module 2 · Building your talk","03":"Module 3 · Rounding out your talk","04":"Module 4 · Giving your talk"}
 return <section className="ps-resources" id="sources"><span className="ps-kicker">RESEARCH & CREDITS</span><h2>What the course is built on</h2>
   <p>Artico's explanations, examples and exercises are original. The research sources below are not treated as interchangeable: peer-reviewed findings, university teaching guidance and practitioner frameworks are labelled separately. iBiology's original materials are linked, not copied.</p>
   {sources.map(s=><div className="ps-resource" key={s.url}><div className="ps-resource-head"><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a><span>{s.kind}</span></div><p>{s.summary}</p><p><b>How Artico uses it:</b> {s.use}</p><small><b>Boundary:</b> {s.limit}</small></div>)}
   <div className="ps-original-pack">
    <a href="https://www.youtube.com/watch?v=wf9QrrRzJys" target="_blank" rel="noopener noreferrer">Course platform orientation video ↗</a>
    <a href="https://www.ibiology.org/educator-resources/syr/resources_how-to-use-this-website-transcript-ibiov2_RPGWAnY.txt" target="_blank" rel="noopener noreferrer">Orientation transcript ↗</a>
    <a href="https://docs.google.com/document/d/1N6aAm6vKYgmgPfdokhO4yc3o-3evuTjz00X_eFwkcfA/export?format=txt" target="_blank" rel="noopener noreferrer">Full course document ↗</a>
    <a href="https://www.ibiology.org/educators-resources/online-course/share-your-research/" target="_blank" rel="noopener noreferrer">Educator resource page ↗</a>
    <a href="https://www.youtube.com/playlist?list=PL5zi65Byv2hj3D0TYhy508qPwsTruwLUm" target="_blank" rel="noopener noreferrer">Full video playlist ↗</a>
   </div>
   <div className="ps-source-library">
    <span className="ps-kicker">ORIGINAL iBIOLOGY COURSE · 22 CORE VIDEOS + ORIENTATION</span><h3>Study the source material</h3>
    <p>The full course has four modules. Each link opens the original video or its public transcript. Use it to compare the source's approach with Artico's independent exercises.</p>
    {Object.entries(moduleNames).map(([module,name])=><div className="ps-source-module" key={module}><h4>{name}</h4>{sourceVideos.filter(v=>v.module===module).map(v=><div className="ps-source-video" key={v.video}><span>{v.title}</span><div><a href={v.video} target="_blank" rel="noopener noreferrer">Video ↗</a><a href={v.transcript} target="_blank" rel="noopener noreferrer">Transcript ↗</a></div></div>)}</div>)}
   </div>
   <div className="ps-source-library">
    <span className="ps-kicker">ORIGINAL WORKSHEETS · 8 RESOURCES</span><h3>Optional source worksheets</h3>
    <p>These belong to the original iBiology course. Artico does not reproduce or modify them.</p>
    {worksheets.map(w=><div className="ps-source-video" key={w.url}><span><b>{w.title}</b><small>{w.role}</small></span><a href={w.url} target="_blank" rel="noopener noreferrer">Open PDF ↗</a></div>)}
   </div>
   <p className="ps-small">Research synthesis, scope and evidence limitations: <a href="https://github.com/thisizkavi-lab/artico-web/blob/main/docs/presentations-research-synthesis.md" target="_blank" rel="noopener noreferrer">Read the full research and curriculum rationale ↗</a>.</p>
 </section>
}

function Overview({learning,update,caseId,setCaseId}) {
 const completed=lessons.filter(l=>learning.responses?.[doneKey(l.id)]==='yes').length
 return <div className="ps-page aw-page">
    <a className="ps-back" href="#/application">← Application</a>
    <header className="ps-cover">
      <span className="ps-kicker">ARTICO · THE PRACTICAL FIELD GUIDE</span>
      <h1>Public speaking<br/><em>& presentations.</em></h1>
      <p>Help a real audience <Mark>understand, judge, decide, learn or recognise.</Mark></p>
      <small>Choose the message, evidence, structure and delivery that fit the occasion.</small>
      <div className="ps-actions"><a className="ps-primary" href={pathFor('01')}>Start the course <span>→</span></a>
        <a className="ps-secondary" href={root+'/blueprint'}>Open your blueprint</a></div>
      <div className="ps-cover-foot"><span>18 focused lessons</span><span>8 worked cases</span><span>{completed} lessons self-marked complete</span></div>
    </header>
    <section className="ps-course-goal">
      <span className="ps-kicker">START HERE · YOUR OWN LEARNING GOAL</span>
      <h2>What do you want to get better at?</h2>
      <p>Name one real speaking situation and one skill you want to improve. Return to this note after the final presentation and see what changed. This is your goal for taking the course, separate from the goal of any individual talk.</p>
      <SavedText learning={learning} update={update} responseKey="application-presentations-course-goal" label="My goal for this course" rows={3} placeholder="For example: explain my research clearly in a ten-minute lab meeting, or answer questions without bluffing…"/>
    </section>
    <section className="ps-principles" aria-label="The core framework">
      <span className="ps-kicker">THE WHOLE PICTURE</span>
      <h2>A talk is an <Mark>audience problem first.</Mark></h2>
      <p>Frame the situation, focus the message, build the reasoning, make evidence legible, deliver and respond, then revise. The process is iterative—not a fixed speech formula.</p>
      <div className="ps-process">{[['01','FRAME','Audience, occasion and goal'],['02','FOCUS','One claim and its evidence boundary'],['03','ARCHITECT','A logical path through the ideas'],['04','RENDER','Words, visuals and accessible evidence'],['05','DELIVER','Voice, interaction and Q&A'],['06','LEARN','Practice, feedback and revision']].map(([n,t,d])=><div key={n}><small>{n}</small><strong>{t}</strong><span>{d}</span></div>)}</div>
      <p className="ps-annotation">The goal changes the form. A scientific talk must let people judge evidence; a lesson must help people apply an idea; a briefing must support a decision; a toast must honour a person.</p>
    </section>
    <section className="ps-syllabus" id="syllabus"><div className="ps-heading"><div><span className="ps-kicker">STUDY → NOTICE → PRACTISE → APPLY</span><h2>The course</h2></div><BlueprintStatus learning={learning} caseId={caseId}/></div>
    {parts.map(part=>{const group=lessons.filter(l=>l.part===part);return <div key={part} className="ps-unit"><h3>{part}</h3><div className="ps-unit-list">{group.map(l=><a href={pathFor(l.id)} className="ps-unit-row" key={l.id}><span>{l.id}</span><div><b>{l.title}</b><small>{l.goal}</small></div><i aria-hidden="true">{learning.responses?.[doneKey(l.id)]==='yes'?'✓':'↗'}</i></a>)}</div></div>})}
    </section>
    <DiscussionPrompts/>
    <section className="ps-case-teaser"><span className="ps-kicker">SAME SKILL · DIFFERENT SITUATIONS</span><h2>What changes in a different room?</h2><p>Read complete examples, not a list of presentation formulas. Every case includes audience, purpose, message, structure, opening, evidence, visual plan, limitations, Q&A and a before/after revision.</p><a href={root+'/cases'} className="ps-secondary">Explore eight worked presentations →</a></section>
    <section className="ps-blueprint-teaser"><span className="ps-kicker">YOUR CUMULATIVE PROJECT</span><h2>One presentation, built as you learn.</h2><CaseSwitcher caseId={caseId} onChange={setCaseId}/><p>The blueprint keeps decisions and practice notes on this device. Switch contexts to keep separate drafts. No account or audio upload is required.</p><a href={root+'/blueprint'} className="ps-primary">Edit presentation blueprint →</a></section>
    <PhraseReference/>
    <ResourceLinks/>
  </div>
}
function CasesView({learning,caseId,setCaseId}) {
 const [selected,setSelected] = useState(cases.some(c=>c.id===caseId)?caseId:'science')
 const c = cases.find(c=>c.id===selected) || cases[0]
 return <div className="ps-page aw-page">
 <nav className="ps-crumb"><a href={root}>← Course</a><span>/</span>Case library</nav>
 <header className="ps-intro"><span className="ps-kicker">CROSS-CONTEXT LIBRARY</span><h1>Eight presentation situations.</h1><p>The communication principles stay the same. The evidence, structure, language and success criteria change.</p></header>
 <div className="ps-case-picks" role="group" aria-label="Select a presentation example">{cases.map(item=><button key={item.id} className={selected===item.id?'active':''} onClick={()=>setSelected(item.id)}>{item.type}</button>)}</div>
 <CaseDetails item={c}/>
 <section className="ps-matrix"><span className="ps-kicker">12 COMMON OCCASIONS</span><h2>Choose the structure for the job.</h2><div className="ps-matrix-scroll"><table><thead><tr><th>Situation</th><th>Audience</th><th>Job</th><th>Possible structure</th><th>Watch for</th></tr></thead><tbody>{situations.map(([s,a,j,st,w])=><tr key={s}><th>{s}</th><td>{a}</td><td>{j}</td><td>{st}</td><td>{w}</td></tr>)}</tbody></table></div></section>
 <div className="ps-next"><a href={root+'/blueprint'}>Apply a case to your own blueprint →</a><a href={root}>Course overview</a></div>
 </div>
}
function makeExport(learning,caseId) {
 const title=caseNames[caseId] || 'My presentation'
 const blocks=fields.map(([key,label])=>'## '+label+'\n\n'+(learning.responses?.[blueprintKey(caseId,key)]||'Not yet drafted')+'\n')
 return '# Artico Presentation Blueprint\n\nContext: '+title+'\n\n'+blocks.join('\n')+'\nOriginal preparation by the learner. Exported locally from Artico.\n'
}
function Blueprint({learning,update,caseId,setCaseId}) {
 const download = makeExport(learning,caseId)
 return <div className="ps-page aw-page">
  <nav className="ps-crumb"><a href={root}>← Course</a><span>/</span>Blueprint</nav>
  <header className="ps-intro"><span className="ps-kicker">A LIVING TALK PLAN</span><h1>Your presentation blueprint.</h1><p>Plan the audience's experience before making slides. The plan stays editable; different contexts keep separate drafts.</p></header>
  <div className="ps-blueprint-tools"><CaseSwitcher caseId={caseId} onChange={setCaseId}/><BlueprintStatus learning={learning} caseId={caseId}/>
    <a className="ps-secondary" download={'artico-presentation-'+caseId+'.md'} href={'data:text/markdown;charset=utf-8,'+encodeURIComponent(download)}>Export Markdown ↓</a>
    <button className="ps-secondary" type="button" onClick={()=>window.print()}>Print</button></div>
  <div className="ps-blueprint-grid">{fields.map(([key,label],index)=><section className="ps-field" key={key}><span className="ps-field-index">{String(index+1).padStart(2,'0')}</span><SavedText learning={learning} update={update} responseKey={blueprintKey(caseId,key)} label={label} rows={3} placeholder={key==='occasion'?'Scientific talk, team update, product demonstration…':key==='message'?'Try a 15-word working version; keep any qualification needed for accuracy…':key==='soWhat'?'Why should this audience care?':'Write a first working version…'} /></section>)}</div>
  <div className="ps-next"><a href={pathFor('01')}>Return to lessons →</a><a href={root+'/cases'}>See worked examples</a></div>
 </div>
}
function LessonView({lesson,learning,update,caseId,setCaseId,mode}) {
 const [comparison,setComparison]=useState('after')
 const currentIndex=lessons.findIndex(l=>l.id===lesson.id)
 const previous=lessons[currentIndex-1], next=lessons[currentIndex+1]
 const completed=learning.responses?.[doneKey(lesson.id)]==='yes'
 return <div className="ps-page aw-page">
    <nav className="ps-crumb"><a href={root}>← The course</a><span>/</span><span>{lesson.part}</span><span>/</span><span>Lesson {lesson.id}</span></nav>
    <div className="ps-lesson-layout">
      <aside className="ps-sidebar"><span className="ps-kicker">THE COURSE</span>{parts.map(part=><div key={part}><strong>{part}</strong>{lessons.filter(l=>l.part===part).map(l=><a href={pathFor(l.id)} aria-current={l.id===lesson.id?'page':undefined} key={l.id}>{l.id} · {l.title}</a>)}</div>)}</aside>
      <main className="ps-lesson-main">
        <header className="ps-lesson-header"><span className="ps-kicker">LESSON {lesson.id} / {lessons.length} · {lesson.part}</span><h1>{lesson.title}</h1><p>{lesson.goal}</p><div className="ps-tabs"><a href={pathFor(lesson.id,'study')} aria-current={mode==='study'?'page':undefined}>Study</a><a href={pathFor(lesson.id,'practice')} aria-current={mode==='practice'?'page':undefined}>Practice</a></div></header>
        {mode==='practice' ? <>
         <section className="ps-lesson-section"><span className="ps-kicker">YOUR TASK</span><h2>Try it in your own words.</h2><p className="ps-practice-prompt">{lesson.practice}</p><ul className="ps-checks">{lesson.criteria.map(t=><li key={t}>{t}</li>)}</ul><SavedText learning={learning} update={update} responseKey={noteKey(lesson.id)} label="Draft, outline, or reflection" placeholder="A short outline is enough. Say the full version aloud." /></section>
         <Decision lesson={lesson}/>
         {lesson.id==='04' && <HalfLifeLab learning={learning} update={update}/>}
         {lesson.id==='15' && <FeedbackRubric learning={learning} update={update} caseId={caseId}/>}
         <section className="ps-speak"><span className="ps-kicker">SPEAK IT ALOUD</span><h2>Deliver, then revise.</h2><p>{lesson.say}</p><p>Try a first version. Identify one thing your listener could not follow, revise, and speak again. This page does not pretend to assess your voice or speaking ability.</p></section>
         <section className="ps-blueprint-inline"><h3>Carry this into your blueprint.</h3><CaseSwitcher caseId={caseId} onChange={setCaseId}/><a href={root+'/blueprint'}>Open editable talk plan →</a></section>
         <button className={'ps-complete '+(completed?'is-complete':'')} onClick={()=>update(prev=>({...prev,responses:{...prev.responses,[doneKey(lesson.id)]:completed?'':'yes'}}))}>{completed?'✓ Marked complete · undo':'Mark complete after practising'}</button>
        </> : <>
          <section className="ps-lesson-section"><span className="ps-kicker">UNDERSTAND</span><h2><Mark>{lesson.rule}</Mark></h2><p>{lesson.teach}</p><p className="ps-caution">{lesson.note}</p></section>
          <details className="ps-lesson-source">
            <summary>Source basis for this lesson</summary>
            <p>{lesson.sourceBasis}</p>
            <a href={root+'#sources'}>Open the full research and source library →</a>
          </details>
          <section className="ps-lesson-section"><span className="ps-kicker">SEE THE DIFFERENCE</span><h2>Before & after</h2>
            <div className="ps-switch" role="group" aria-label="Comparison versions"><button onClick={()=>setComparison('before')} className={comparison==='before'?'active':''} aria-pressed={comparison==='before'}>Less useful</button><button onClick={()=>setComparison('after')} className={comparison==='after'?'active':''} aria-pressed={comparison==='after'}>Improved</button></div>
            <blockquote className={'ps-example '+(comparison==='before'?'ps-weak':'ps-strong')}>{comparison==='before'?lesson.before:lesson.after}</blockquote>
            <p className="ps-annotation">{comparison==='before'?'What does this fail to help the listener do? Try improving it before switching.':'Notice the more specific audience task, explanation, or evidence boundary.'}</p>
          </section>
          {lesson.id==='02' && <AudienceStudio/>}
          {lesson.id==='10' && <VisualCompare/>}
          {lesson.id==='11' && <GraphExample/>}
          {lesson.id==='13' && <EthicsLab/>}
          {lesson.id==='17' && <QuestionLab/>}
          <section className="ps-transfer"><span className="ps-kicker">TRANSFER</span><h2>Same principle, different context.</h2><p>{lesson.contrast}</p></section>
          <section className="ps-phrase"><span className="ps-kicker">SAY IT NATURALLY</span><p>“{lesson.say}”</p></section>
          <Decision lesson={lesson}/>
          <section className="ps-next-task"><span className="ps-kicker">NOW PRACTISE</span><h2>Don't stop at recognition.</h2><p>{lesson.practice}</p><a className="ps-primary" href={pathFor(lesson.id,'practice')}>Start this practice →</a></section>
        </>}
        <footer className="ps-next"><a href={previous?pathFor(previous.id):root}>← {previous?previous.title:'Overview'}</a><a href={next?pathFor(next.id):root+'/cases'}>{next?next.title:'Worked examples'} →</a></footer>
      </main>
    </div>
 </div>
}
export default function PresentationCourse({route,learning,update}) {
 useEffect(()=>{
  const responses=learning.responses||{}
  const legacyFields={type:'occasion',purpose:'goal',background:'narrative',explanation:'language',contingency:'fallback'}
  const casesToMigrate=['science','business','product','teaching','proposal','toast','custom']
  const migration={}
  for(const caseId of casesToMigrate){
   for(const [oldKey,newKey] of Object.entries(legacyFields)){
    const value=responses['application-presentations-blueprint-'+caseId+'-'+oldKey]
    const destination='application-presentations-blueprint-'+caseId+'-'+newKey
    if(value&&!responses[destination])migration[destination]=value
   }
  }
  if(Object.keys(migration).length)update(prev=>({...prev,responses:{...prev.responses,...migration}}))
 },[learning.responses,update])
 const savedCase=learning.responses?.[contextKey]
 const caseId=Object.prototype.hasOwnProperty.call(caseNames,savedCase)?savedCase:'science'
 const setCaseId=(value)=>update(prev=>({...prev,responses:{...prev.responses,[contextKey]:value}}))
 if(route.lesson==='blueprint')return <Blueprint learning={learning} update={update} caseId={caseId} setCaseId={setCaseId}/>
 if(route.lesson==='cases')return <CasesView learning={learning} caseId={caseId} setCaseId={setCaseId}/>
 const lesson=lessons.find(item=>item.id===route.lesson)
 if(lesson)return <LessonView key={lesson.id} lesson={lesson} mode={route.mode||'study'} learning={learning} update={update} caseId={caseId} setCaseId={setCaseId}/>
 return <Overview learning={learning} update={update} caseId={caseId} setCaseId={setCaseId}/>
}

export { sourceLinks }
