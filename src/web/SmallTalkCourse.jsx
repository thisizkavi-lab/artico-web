import { useEffect, useMemo, useState } from 'react'
import { smallTalkUnits as units, smallTalkLessons as lessons, smallTalkScenarios as scenes, fieldLadder, fieldWeek } from './smallTalkContent'
import './storytelling.css'
import './small-talk.css'

const root = '/application/smalltalk'
const pathFor = (id, mode='study') => root + '/' + id + '/' + mode
const noteKey = id => 'application-smalltalk-note-' + id
const doneKey = id => 'application-smalltalk-done-' + id
const reflectKey = id => 'application-smalltalk-reflection-' + id
const criteria = [
  'I chose a moment where the other person could engage or decline.',
  'My opener connected to the shared context.',
  'I listened for a detail instead of planning every next line.',
  'I responded to something the partner actually said.',
  'I shared the floor instead of interviewing or monologuing.',
  'I accepted a neutral or closed response.',
  'I repaired a missed word or pause without panic.',
  'I ended honestly when it was time.',
  'I can name one fact without guessing what the other person thought.',
]
const models = [
  { title:'Shared context, shared interest', lines:[
    ['Learner','Have you been to this neighborhood workshop before?'],
    ['Partner','No, it’s my first time. I moved here a few months ago.'],
    ['Learner','Welcome to the neighborhood, then. How are you finding it so far?'],
    ['Partner','Pretty good. I’m still figuring out where everything is.'],
    ['Learner','I remember that stage. The weekend market is an easy place to start.'],
    ['Partner','Oh, I haven’t been. Is it any good?'],
    ['Learner','I like the food stalls. I should get back inside, but maybe I’ll see you at another workshop.'],
   ],why:'The learner follows a volunteered detail, shares something relevant, and ends without demanding contact information.' },
  { title:'A neutral response',lines:[
    ['Learner','That was an interesting demonstration. Have you tried that activity before?'],
    ['Partner','A couple of times.'],
    ['Learner','Nice. I haven’t tried it yet. (Pause.) Well, I hope you enjoy the rest of the event.'],
  ],why:'One light contribution and an easy close are better than five new questions.' },
  { title:'A busy person',lines:[
    ['Learner','Is this seat taken?'],
    ['Partner','No, but I’m waiting for a call.'],
    ['Learner','No problem. I’ll let you get on with it.'],
  ],why:'Accepting a clearly stated constraint is a successful social choice.' },
]
const answers = [
  ['Open','The partner offers a detail or asks something back. Continue if you want to.'],
  ['Neutral','The partner replies politely without much invitation. You can share one small detail, pause, or close.'],
  ['Busy','The partner names a constraint. Accept it; do not keep trying to extend the exchange.'],
]
function Label({children}) { return <p className="st-eyebrow">{children}</p> }
function ProgressDot({done}) {return <span className={'st-dot'+(done?' is-done':'')} aria-label={done?'Practised':'Not yet practised'} />}
function Overview({learning}) {
  const completed = lessons.filter(l => learning.responses?.[doneKey(l.id)] === '1').length
  const resume = lessons.find(l => learning.responses?.[doneKey(l.id)] !== '1') ?? lessons.at(-1)
  const [expanded,setExpanded]=useState('starting')
  return <div className="aw-page st-page sm-page">
    <a className="st-breadcrumb sm-return" href="#/application">← Back to Application</a>
    <header className="st-hero">
      <p className="ap-eyebrow">APPLICATION / CONVERSATION</p>
      <h1>Small Talk</h1>
      <p>Learn the choices that make everyday conversations natural. Practise without performing, pressuring, or memorizing a perfect script.</p>
      <div className="st-actions">
        <a className="st-primary" href={'#'+pathFor(resume.id,'study')}>{completed===0?'Start the course':'Continue learning'} <span aria-hidden="true">→</span></a>
        {completed>0&&<a className="st-secondary" href={'#'+pathFor('12','practice')}>Open conversation lab</a>}
      </div>
      <p className="st-meta">{completed} of {lessons.length} lessons practised · 11 skills + 1 conversation lab</p>
    </header>
    <section className="sm-intro" aria-labelledby="sm-what">
      <Label>START HERE</Label>
      <h2 id="sm-what">What is small talk?</h2>
      <p>Small talk is a short, low-stakes exchange with someone you do not know well. It often starts from a situation you share: a class, an event, a line, or an activity. It helps people acknowledge each other, explore a safe common topic, or build familiarity through ordinary encounters.</p>
      <p>It is not a speech, a trick to make someone like you, or a requirement to become friends. Sometimes a pleasant thirty-second chat is the whole interaction. Quiet is allowed. Neither person owes the other a conversation.</p>
      <div className="sm-intro-divider"><strong>Knowing the words is not the same as using them.</strong><span>Timing, attention, uncertainty, and the willingness to try an imperfect exchange are all part of the skill. Role-play helps; real conversations provide a different kind of practice.</span></div>
      <Label>THE PRACTICE LOOP</Label>
      <ol className="sm-loop">
        {['Learn one small move','Rehearse it in a safe scene','Try one suitable real exchange (optional)','Review facts rather than guesses','Adjust one thing'].map((s,i)=><li key={s}><span>{String(i+1).padStart(2,'0')}</span>{s}</li>)}
      </ol>
      <p className="sm-muted">A greeting plus one exchange counts. Measure your choices and practice—not whether somebody became your friend.</p>
    </section>
    <div className="sm-section-header"><Label>COURSE CONTENTS</Label><h2>Build the skill, one decision at a time.</h2></div>
    <div className="st-map">
      {units.map((unit,i) => {
        const done=unit.lessons.filter(id=>learning.responses?.[doneKey(id)]==='1').length
        const open=expanded===unit.id
        return <section className="st-unit" key={unit.id}>
          <button type="button" className="st-unit-heading" aria-expanded={open} onClick={()=>setExpanded(open?'':unit.id)}>
            <span className="st-unit-number">{String(i+1).padStart(2,'0')}</span>
            <span className="st-unit-text"><strong>{unit.title}</strong><small>{unit.subtitle}</small></span>
            <span className="st-unit-progress">{done}/{unit.lessons.length}</span>
            <span className="st-chevron" aria-hidden="true">{open?'−':'+'}</span>
          </button>
          {open&&<div className="st-unit-lessons">
            {unit.lessons.map(id=>{const l=lessons.find(v=>v.id===id);return <a className="st-lesson-link" href={'#'+pathFor(id)} key={id}>
              <ProgressDot done={learning.responses?.[doneKey(id)]==='1'}/>
              <span><strong>{id} · {l.title}</strong><small>{l.goal}</small></span><span aria-hidden="true">›</span></a>})}
          </div>}
        </section>
      })}
    </div>
    <section className="sm-aftercourse">
      <Label>AFTER THE LAB</Label>
      <h2>Take it into real life—at your pace.</h2>
      <p>A real interaction is optional, never a compulsory test. Start with observing. Repeat a step or skip one. Do not use people who must be polite as your default practice targets.</p>
      <details className="sm-disclosure"><summary>See the seven-step real-world ladder</summary><ol>{fieldLadder.map(([title,copy])=><li key={title}><strong>{title}</strong><p>{copy}</p></li>)}</ol></details>
      <details className="sm-disclosure"><summary>Optional seven-day practice plan</summary><div className="sm-week">{fieldWeek.map(([d,t])=><div key={d}><span>Day {d}</span>{t}</div>)}</div><p className="sm-muted">This is an invitation, not a streak. Missing a day erases nothing.</p></details>
    </section>
  </div>
}
function CourseNav({active,learning}) {
  return <nav className="st-side" aria-label="Small Talk lessons">
    <p className="st-side-label">Small Talk / Contents</p>
    {units.map(unit=><div key={unit.id}>
      <a className={'st-side-unit'+(unit.lessons.includes(active.id)?' is-active':'')} href={'#'+pathFor(unit.lessons[0])}>{unit.title}</a>
      {unit.lessons.includes(active.id)&&<div className="st-side-lessons">{unit.lessons.map(id=>{
        const l=lessons.find(v=>v.id===id)
        return <a className={'st-side-lesson'+(active.id===id?' is-current':'')} href={'#'+pathFor(id)} key={id}>
        {learning.responses?.[doneKey(id)]==='1'?'✓ ':''}{l.title}</a>})}</div>}
    </div>)}
    <a className="st-side-unit" href={'#'+root}>← All lessons</a>
  </nav>
}
function Study({active}) {
  return <div className="st-flow sm-study">
    <section>
      <Label>THE CORE IDEA</Label>
      <p className="sm-core">{active.principle}</p>
      <p className="sm-body">{active.study}</p>
    </section>
    <section>
      <Label>SEE IT IN CONTEXT</Label>
      <div className="st-story sm-example">
        {active.example.map((line,i)=><p key={i}>{line}</p>)}
      </div>
      <div className="sm-notice"><strong>What to notice</strong><p>{active.notice}</p></div>
    </section>
    <section className="st-caution"><strong>KEEP IN MIND</strong><p>{active.caution}</p></section>
    {active.id==='12'&&<section>
      <Label>THREE POSSIBLE INTERACTIONS</Label>
      {models.map(m=><details className="sm-disclosure" key={m.title}>
        <summary>{m.title}</summary>
        <div className="sm-transcript">{m.lines.map(([who,line],i)=><p key={i}><strong>{who}</strong><span>{line}</span></p>)}</div>
        <p className="sm-muted">{m.why}</p>
      </details>)}
    </section>}
    <a className="st-primary st-cta" href={'#'+pathFor(active.id,'practice')}>Go to Practice <span aria-hidden="true">→</span></a>
  </div>
}
function ScenarioLab() {
  const [sceneIndex,setSceneIndex]=useState(0)
  const [style,setStyle]=useState(null)
  const [move,setMove]=useState('')
  const scene=scenes[sceneIndex]
  const changeScene = index => {setSceneIndex(index);setStyle(null);setMove('')}
  const reveal = () => {setStyle(Math.floor(Math.random()*3));setMove('')}
  const replay = () => {setStyle(previous => previous===null?Math.floor(Math.random()*3):(previous+1)%3);setMove('')}
  const branch=style===0?'open':style===1?'neutral':'busy'
  return <section className="sm-lab">
    <Label>SIMULATED CONVERSATION · 10 SCENES</Label>
    <h2>Make the next move.</h2>
    <p className="st-helper">The partner has one of three response styles. You will not know which until after your opener. This is a scripted exercise, not a live AI partner.</p>
    <label className="st-field-label" htmlFor="sm-scene">Choose a situation</label>
    <select className="sm-select" id="sm-scene" value={sceneIndex} onChange={e=>changeScene(Number(e.target.value))}>
      {scenes.map((s,i)=><option key={s.id} value={i}>{String(i+1).padStart(2,'0')} · {s.title}</option>)}
    </select>
    <div className="sm-scene"><span className="sm-scene-kicker">YOUR SITUATION</span><p>{scene.situation}</p><small>{scene.goal}</small></div>
    <div className="sm-turn">
      <span>01 · Observe</span><p>{scene.start}</p>
      <strong>What would you say first?</strong>
      <small>Say your own opener aloud. You can write brief notes below if you prefer.</small>
    </div>
    {style===null?
      <button className="st-primary sm-lab-button" onClick={reveal} type="button">I tried an opener · Reveal partner's reply →</button>:
      <div className="sm-branch">
        <div className="sm-turn sm-partner"><span>02 · The partner replies</span><p>{scene[branch]}</p></div>
        <fieldset className="sm-moves"><legend>03 · What is your next move?</legend>
          {['Continue lightly','Pause / give space','Close kindly'].map(choice=><label key={choice} className={move===choice?'is-picked':''}><input type="radio" name="sm-next-move" value={choice} checked={move===choice} onChange={()=>setMove(choice)}/>{choice}</label>)}
        </fieldset>
        {move&&<div className="sm-feedback" role="status">
          <strong>Review the evidence</strong>
          <p>{answers[style][1]}</p>
          {style===2&&move!=='Close kindly'&&<p>A person who says they need to go has already given a clear boundary. End the exchange.</p>}
          {style===0&&move==='Close kindly'&&<p>You can still end a welcoming conversation when you need or want to leave.</p>}
          <p><strong>Now say your next line aloud.</strong> If you close, make it clear and short.</p>
        </div>}
        <button className="st-secondary sm-lab-button" type="button" onClick={replay}>Replay with a different reply ↻</button>
      </div>}
  </section>
}
function Reflection({active,learning,update}) {
  const value=learning.responses?.[reflectKey(active.id)]??''
  return <section className="sm-reflection">
    <Label>REVIEW REALITY, NOT GUESSES</Label>
    <label className="st-field-label" htmlFor="sm-reflect">What happened? What did you assume? What would you change?</label>
    <textarea id="sm-reflect" rows={3} maxLength={1900} value={value} placeholder="Fact: They gave one short answer. Guess: They disliked my opener. Next time: I'll give space sooner." onChange={e=>update(prev=>({...prev,responses:{...prev.responses,[reflectKey(active.id)]:e.target.value}}))}/>
    <p className="sm-muted">Your notes stay in this browser. No personality score, accent rating, or social-success points.</p>
  </section>
}
function Scorecard() {
  const [ratings,setRatings]=useState({})
  return <details className="sm-disclosure sm-scorecard"><summary>Optional self-review · 9 observable skills</summary>
    <p className="sm-muted">Choose “not yet,” “sometimes,” or “usually” for each skill. There is no overall score.</p>
    {criteria.map((item,i)=><label key={item}><span>{item}</span><select aria-label={'Self-review: '+item} value={ratings[i]??''} onChange={e=>setRatings(v=>({...v,[i]:e.target.value}))}>
      <option value="">Choose</option><option>Not yet</option><option>Sometimes</option><option>Usually</option>
    </select></label>)}
  </details>
}
function Practice({active,learning,update}) {
  const [picked,setPicked]=useState(null)
  const [attempted,setAttempted]=useState(false)
  useEffect(()=>{setPicked(null);setAttempted(false)},[active.id])
  const notes=learning.responses?.[noteKey(active.id)]??''
  const completed=learning.responses?.[doneKey(active.id)]==='1'
  const rotate=Number(active.id)%active.options.length
  const ordered=active.options.map((value,index)=>({value,index})).slice(rotate).concat(active.options.map((value,index)=>({value,index})).slice(0,rotate))
  const save=(key,value)=>update(prev=>({...prev,responses:{...prev.responses,[key]:value}}))
  return <div className="st-flow sm-practice">
    <section className="sm-check">
      <Label>01 · NOTICE THE SITUATION</Label>
      <h2>Choose the next move.</h2>
      <div className="sm-scene"><span className="sm-scene-kicker">THE SITUATION</span><p>{active.scene}</p></div>
      <div className="st-choices" role="group" aria-label="Choose a response">
        {ordered.map(({value,index})=><button key={index} type="button" className={'st-choice'+(picked===index?' is-picked':'')} aria-pressed={picked===index} onClick={()=>setPicked(index)}>
          <span aria-hidden="true">{String.fromCharCode(65+ordered.findIndex(v=>v.index===index))}</span>{value}
        </button>)}
      </div>
      {picked!==null&&<div className="sm-feedback" role="status"><strong>{picked===active.correct?'A reasonable choice':'Try a smaller, more respectful move'}</strong><p>{active.why}</p><p>Choices depend on context. This checks your reasoning, not your personality.</p></div>}
    </section>
    <section>
      <Label>02 · REHEARSE IN YOUR OWN ENGLISH</Label>
      <h2>Your turn.</h2>
      <p className="sm-body">{active.practice}</p>
      <div className="sm-constraint"><strong>Change one condition</strong><p>{active.variation}</p></div>
      <label className="st-field-label" htmlFor={'sm-note-'+active.id}>Your response or speaking notes (optional)</label>
      <textarea id={'sm-note-'+active.id} rows={5} maxLength={1900} value={notes} onChange={e=>save(noteKey(active.id),e.target.value)} placeholder="A few words in your own voice are enough. Or practise aloud without typing."/>
      <p className="sm-muted">Speaking aloud counts. This app does not claim to judge an unscripted answer automatically.</p>
    </section>
    {active.id==='12'&&<ScenarioLab />}
    <Reflection active={active} learning={learning} update={update}/>
    {active.id==='12'&&<Scorecard/>}
    <section className="sm-complete">
      <label className="st-attest"><input type="checkbox" checked={attempted||completed} onChange={e=>setAttempted(e.target.checked)}/>I practised a response aloud or in writing.</label>
      <button type="button" className="st-primary sm-mark" disabled={!attempted&&!completed} onClick={()=>save(doneKey(active.id),'1')}>
        {completed?'Practised ✓':'Mark practice complete'}
      </button>
      <p className="sm-muted">{completed?'Your practice is recorded on this device. Revisit and improve it anytime.':'This records an honest attempt, not mastery or social approval.'}</p>
    </section>
  </div>
}
export default function SmallTalkCourse({route,learning,update}) {
  const active=useMemo(()=>lessons.find(l=>l.id===route.lesson)??null,[route.lesson])
  const mode=route.mode==='practice'?'practice':'study'
  if (!active) return <Overview learning={learning}/>
  const index=lessons.findIndex(l=>l.id===active.id)
  const previous=lessons[index-1]??null
  const next=lessons[index+1]??null
  return <div className="aw-page st-page sm-page">
    <div className="st-breadcrumb"><a href="#/application">Application</a><span>›</span><a href={'#'+root}>Small Talk</a><span>›</span><span>{active.title}</span></div>
    <div className="st-layout">
      <CourseNav active={active} learning={learning}/>
      <main className="st-main sm-main">
        <Label>SMALL TALK / LESSON {active.id} OF {String(lessons.length).padStart(2,'0')}</Label>
        <h1>{active.title}</h1>
        <p className="st-goal">{active.goal}</p>
        <nav className="st-tabs" aria-label="Study or Practice">
          <a href={'#'+pathFor(active.id,'study')} aria-current={mode==='study'?'page':undefined}>Study</a>
          <a href={'#'+pathFor(active.id,'practice')} aria-current={mode==='practice'?'page':undefined}>Practice {learning.responses?.[doneKey(active.id)]==='1'?'✓':''}</a>
        </nav>
        {mode==='study'?<Study active={active}/>:<Practice active={active} learning={learning} update={update}/>}
        <nav className="sm-lesson-footer" aria-label="Lesson navigation">
          {previous?<a className="st-secondary" href={'#'+pathFor(previous.id,'study')}>← Previous lesson</a>:<a className="st-secondary" href={'#'+root}>← Course overview</a>}
          {next?<a className="st-secondary" href={'#'+pathFor(next.id,'study')}>Next lesson →</a>:<a className="st-secondary" href={'#'+root}>All lessons →</a>}
        </nav>
      </main>
    </div>
  </div>
}
