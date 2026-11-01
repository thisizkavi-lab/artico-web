import { useState } from 'react'
import {
  presentationLessons as lessons, presentationCases as cases, presentationSituations as situations,
  presentationPhrases as phrases, presentationSources as sources, presentationParts as parts,
  presentationBlueprintFields as fields,
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
  const [showBetter, setShowBetter] = useState(true)
  return <section className="ps-visual" aria-label="Slide design comparison">
    <div className="ps-visual-head">
      <div><span className="ps-kicker">EXAMINE THE SLIDE</span><h3>Same evidence. Different explanation.</h3></div>
      <div className="ps-switch" role="group" aria-label="Select slide design">
        <button className={!showBetter?'active':''} onClick={()=>setShowBetter(false)} aria-pressed={!showBetter}>Before</button>
        <button className={showBetter?'active':''} onClick={()=>setShowBetter(true)} aria-pressed={showBetter}>After</button>
      </div>
    </div>
    {showBetter ? <div className="ps-slide ps-slide-good">
      <p className="ps-slide-label">ILLUSTRATIVE DATA · completion funnel</p>
      <h4>Most trial users leave before account verification.</h4>
      <div className="ps-funnel">
        {[[100,'Started'],[71,'Profile'],[43,'Verification'],[39,'Finished']].map(([value,label])=>
          <div key={label}><span>{label}</span><div className="ps-bar-track"><i style={{width:value+'%'}} /></div><b>{value}%</b></div>)}
      </div>
      <small>Illustrative percentages; no real customer data. Same denominator: users who started.</small>
    </div> : <div className="ps-slide ps-slide-bad">
      <h4>RESULTS</h4><p>Users entered the interface, set up their account, went through identity verification, completed the necessary onboarding tasks, and we saw changes across multiple steps.</p>
      <ul><li>Data and findings</li><li>Our success</li><li>Several observations</li><li>Details of each funnel stage</li></ul>
      <small>No denominator, clear comparison or visual direction.</small>
    </div>}
    <p className="ps-annotation"><strong>Notice:</strong> {showBetter ? 'The title makes a claim. Direct labels and a common denominator let the viewer evaluate it. The speaker still needs to discuss missing data and causes.' : 'Listeners must read a paragraph while hearing the speaker. The audience cannot tell which result matters.'}</p>
  </section>
}
function GraphExample() {
  return <section className="ps-chart" aria-label="Illustrative protein conformations bar chart">
    <span className="ps-kicker">ILLUSTRATIVE SCIENTIFIC FIGURE · NOT EXPERIMENTAL DATA</span>
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

function ResourceLinks() {
 return <section className="ps-resources" id="sources"><span className="ps-kicker">RESEARCH & CREDITS</span><h2>Where the principles come from</h2>
   <p>Artico's explanations, examples and exercises are original. Source materials are linked rather than reproduced. These are inputs to instructional judgment, not universal speaking laws.</p>
   {sources.map(s=><div className="ps-resource" key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a><p><b>Relevant principle:</b> {s.principle}</p><p><b>Artico use:</b> {s.use}</p><small>{s.limit}</small></div>)}
   <div className="ps-video-notes" id="watch-and-notice"><h3>Watch and notice · iBiology (Module 1)</h3>
   <p><a href="https://www.youtube.com/watch?v=CNcj2y03naE" target="_blank" rel="noopener noreferrer">The First Step in Building a Research Talk ↗</a> · <a href="https://www.ibiology.org/educator-resources/syr/resources_first_step_in_building_a_research_talk.txt" target="_blank" rel="noopener noreferrer">Public transcript ↗</a></p>
   <p><b>Observe:</b> What do the speakers decide before opening slide software? <b>Apply:</b> Write your own audience, purpose and main message before selecting a design.</p>
   <p><a href="https://www.youtube.com/watch?v=Nk62hE7xG_A" target="_blank" rel="noopener noreferrer">Know and Distill Your Message ↗</a> · <a href="https://www.ibiology.org/educator-resources/syr/resources_know_and_distill_your_message.txt" target="_blank" rel="noopener noreferrer">Public transcript ↗</a></p>
   <p><b>Observe:</b> How does the explanation change when it becomes shorter? <b>Apply:</b> Give a 60-second and a 15-second version, and identify what had to remain true.</p>
   <small>Links open the source media; no video is copied or embedded. Timestamps are deliberately omitted because precise chapter points were not verified.</small>
   </div>
   <p className="ps-small">Public iBiology lesson transcripts and educator index were consulted for the foundational model and message distillation. A complete transcript-by-transcript audit of the whole course and some registration/download materials was not possible; this page does not claim otherwise.</p>
 </section>
}
function Overview({learning,update,caseId,setCaseId}) {
 const completed=lessons.filter(l=>learning.responses?.[doneKey(l.id)]==='yes').length
 return <div className="ps-page aw-page">
    <a className="ps-back" href="#/application">← Application</a>
    <header className="ps-cover">
      <span className="ps-kicker">ARTICO · THE PRACTICAL FIELD GUIDE</span>
      <h1>Public speaking<br/><em>& presentations.</em></h1>
      <p>Turn what you know into something another person can <Mark>understand and use.</Mark></p>
      <small>Not a confidence course. A course in audience, explanation, evidence, delivery and response.</small>
      <div className="ps-actions"><a className="ps-primary" href={pathFor('01')}>Start the course <span>→</span></a>
        <a className="ps-secondary" href={root+'/blueprint'}>Open your blueprint</a></div>
      <div className="ps-cover-foot"><span>15 focused lessons</span><span>6 worked cases</span><span>{completed} lessons self-marked complete</span></div>
    </header>
    <section className="ps-principles" aria-label="The core framework">
      <span className="ps-kicker">THE WHOLE PICTURE</span>
      <h2>A talk is a <Mark>design problem.</Mark></h2>
      <p>First decide what listeners need. Then choose the explanation and evidence. Deliver it, notice what happened, and improve.</p>
      <div className="ps-process">{[['01','FRAME','Who, why, what changes?'],['02','BUILD','What makes the idea understandable?'],['03','DELIVER','How will people follow it live?'],['04','RESPOND & REVISE','What changed for the audience?']].map(([n,t,d])=><div key={n}><small>{n}</small><strong>{t}</strong><span>{d}</span></div>)}</div>
      <p className="ps-annotation">Same principle. Different task: a research talk is judged by evidence and clarity; a toast by its sincerity and fit to the occasion.</p>
    </section>
    <section className="ps-syllabus" id="syllabus"><div className="ps-heading"><div><span className="ps-kicker">STUDY → NOTICE → PRACTISE → APPLY</span><h2>The course</h2></div><BlueprintStatus learning={learning} caseId={caseId}/></div>
    {parts.map(part=>{const group=lessons.filter(l=>l.part===part);return <div key={part} className="ps-unit"><h3>{part}</h3><div className="ps-unit-list">{group.map(l=><a href={pathFor(l.id)} className="ps-unit-row" key={l.id}><span>{l.id}</span><div><b>{l.title}</b><small>{l.goal}</small></div><i aria-hidden="true">{learning.responses?.[doneKey(l.id)]==='yes'?'✓':'↗'}</i></a>)}</div></div>})}
    </section>
    <section className="ps-case-teaser"><span className="ps-kicker">SAME SKILL · DIFFERENT SITUATIONS</span><h2>What changes in a different room?</h2><p>Read complete examples, not a list of presentation formulas. Every case includes audience, goal, opening, structure, evidence, a limitation, Q&A, and an improved version.</p><a href={root+'/cases'} className="ps-secondary">Explore six worked presentations →</a></section>
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
 <header className="ps-intro"><span className="ps-kicker">CROSS-CONTEXT LIBRARY</span><h1>Six ways to speak well.</h1><p>The communication principles stay the same. The evidence, structure, language and success criteria change.</p></header>
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
  <div className="ps-blueprint-grid">{fields.map(([key,label],index)=><section className="ps-field" key={key}><span className="ps-field-index">{String(index+1).padStart(2,'0')}</span><SavedText learning={learning} update={update} responseKey={blueprintKey(caseId,key)} label={label} rows={3} placeholder={index===0?'Scientific talk, team update, product demonstration…':index===3?'One complete, defensible takeaway sentence…':'What will this audience need to know or do?'} /></section>)}</div>
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
         <section className="ps-speak"><span className="ps-kicker">SPEAK IT ALOUD</span><h2>Deliver, then revise.</h2><p>{lesson.say}</p><p>Try a first version. Identify one thing your listener could not follow, revise, and speak again. This page does not pretend to assess your voice or speaking ability.</p></section>
         <section className="ps-blueprint-inline"><h3>Carry this into your blueprint.</h3><CaseSwitcher caseId={caseId} onChange={setCaseId}/><a href={root+'/blueprint'}>Open editable talk plan →</a></section>
         <button className={'ps-complete '+(completed?'is-complete':'')} onClick={()=>update(prev=>({...prev,responses:{...prev.responses,[doneKey(lesson.id)]:completed?'':'yes'}}))}>{completed?'✓ Marked complete · undo':'Mark complete after practising'}</button>
        </> : <>
          <section className="ps-lesson-section"><span className="ps-kicker">UNDERSTAND</span><h2><Mark>{lesson.rule}</Mark></h2><p>{lesson.teach}</p><p className="ps-caution">{lesson.note}</p></section>
          <section className="ps-lesson-section"><span className="ps-kicker">SEE THE DIFFERENCE</span><h2>Before & after</h2>
            <div className="ps-switch" role="group" aria-label="Comparison versions"><button onClick={()=>setComparison('before')} className={comparison==='before'?'active':''} aria-pressed={comparison==='before'}>Less useful</button><button onClick={()=>setComparison('after')} className={comparison==='after'?'active':''} aria-pressed={comparison==='after'}>Improved</button></div>
            <blockquote className={'ps-example '+(comparison==='before'?'ps-weak':'ps-strong')}>{comparison==='before'?lesson.before:lesson.after}</blockquote>
            <p className="ps-annotation">{comparison==='before'?'What does this fail to help the listener do? Try improving it before switching.':'Notice the more specific audience task, explanation, or evidence boundary.'}</p>
          </section>
          {lesson.id==='02' && <AudienceStudio/>}
          {lesson.id==='08' && <GraphExample/>}
          {lesson.id==='09' && <VisualCompare/>}
          {lesson.id==='13' && <QuestionLab/>}
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
