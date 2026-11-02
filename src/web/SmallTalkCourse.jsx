import { CourseIndex, CourseDirectory, CourseTree } from './CourseNavigation'
import { useEffect, useMemo, useState } from 'react'
import { smallTalkUnits as units, smallTalkLessons as lessons, smallTalkScenarios as scenes } from './smallTalkContent'
import './storytelling.css'
import './small-talk.css'

const guideHref = (import.meta.env.BASE_URL || '/') + 'smalltalk-field-guide.html'
const foundationCards = [
  {no:'01',title:'What is small talk?',detail:'The subject can be ordinary. The purpose is social contact.',anchor:'foundation-01-what-is-small-talk'},
  {no:'02',title:'Why it matters',detail:'Recognition, ease, familiarity, discovery, maintenance, and transition.',anchor:'foundation-02-why-small-talk-matters'},
  {no:'03',title:'Why fluency is not enough',detail:'Language, social judgment, and interaction are different skills.',anchor:'foundation-03-why-fluency-is-not-enough'},
  {no:'04',title:'What good small talk looks like',detail:'An exchange can be brief, grow naturally, or end respectfully.',anchor:'foundation-04-what-good-small-talk-looks-like'},
]
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
function Overview({ mode }) {
  return <CourseIndex title="Small Talk">
    <CourseDirectory label="Small Talk field guide" items={[
      { id:'guide', title:'The complete field guide', summary:'Read the foundations, lessons, and conversation map.', icon:'book', href:guideHref, wide:true },
      { id:'conversations', title:'Six complete conversations', summary:'See how everyday exchanges unfold.', icon:'messages', href:guideHref + '#capstone-six-complete-real-life-conversations' },
      { id:'phrases', title:'Phrase library', summary:'Find language for the moment.', icon:'message', href:guideHref + '#the-small-talk-phrase-library' },
    ]}/>
    <CourseTree label="Small Talk lessons" groups={[
      { id:'foundations', title:'Understanding small talk', icon:'compass', items:foundationCards.map(item => ({ id:item.no, title:item.title, href:guideHref + '#' + item.anchor })) },
      ...units.map((unit, index) => ({ id:unit.id, title:unit.title, icon:'messages', open:index === 0,
        items:unit.lessons.map(id => ({ id, number:id, title:lessons.find(lesson => lesson.id === id).title, href:'#' + pathFor(id, mode) })),
      })),
    ]}/>
  </CourseIndex>
}
function CourseNav({active,learning,mode}) {
  return <nav className="st-side" aria-label="Small Talk lessons">
    <p className="st-side-label">Small Talk / Contents</p>
    {units.map(unit=><div key={unit.id}>
      <a className={'st-side-unit'+(unit.lessons.includes(active.id)?' is-active':'')} href={'#'+pathFor(unit.lessons[0],mode)}>{unit.title}</a>
      {unit.lessons.includes(active.id)&&<div className="st-side-lessons">{unit.lessons.map(id=>{
        const l=lessons.find(v=>v.id===id)
        return <a className={'st-side-lesson'+(active.id===id?' is-current':'')} href={'#'+pathFor(id,mode)} key={id}>
        {learning.responses?.[doneKey(id)]==='1'?'✓ ':''}{l.title}</a>})}</div>}
    </div>)}
    <a className="st-side-unit" href={'#'+pathFor('home',mode)}>← All lessons</a>
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
  if (!active) return <Overview mode={mode} learning={learning}/>
  const index=lessons.findIndex(l=>l.id===active.id)
  const previous=lessons[index-1]??null
  const next=lessons[index+1]??null
  return <div className="aw-page st-page sm-page">
    <div className="st-breadcrumb"><a href="#/courses?application">Application</a><span>›</span><a href={'#'+pathFor('home',mode)}>Small Talk</a><span>›</span><span>{active.title}</span></div>
    <div className="st-layout">
      <CourseNav active={active} learning={learning} mode={mode}/>
      <main className="st-main sm-main">
        <Label>SMALL TALK / LESSON {active.id} OF {String(lessons.length).padStart(2,'0')}</Label>
        <h1>{active.title}</h1>
        <p className="st-goal">{active.goal}</p>
        {mode==='study'?<Study active={active}/>:<Practice active={active} learning={learning} update={update}/>}
        <nav className="sm-lesson-footer" aria-label="Lesson navigation">
          {previous?<a className="st-secondary" href={'#'+pathFor(previous.id,mode)}>← Previous lesson</a>:<a className="st-secondary" href={'#'+pathFor('home',mode)}>← Course overview</a>}
          {next?<a className="st-secondary" href={'#'+pathFor(next.id,mode)}>Next lesson →</a>:<a className="st-secondary" href={'#'+pathFor('home',mode)}>All lessons →</a>}
        </nav>
      </main>
    </div>
  </div>
}
