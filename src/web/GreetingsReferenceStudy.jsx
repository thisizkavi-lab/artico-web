import { useCallback, useEffect, useRef, useState } from 'react'
import './GreetingsReferenceStudy.css'
import { approvedAudio } from './components'

// Chapter 01 study artwork follows the approved five-page Artico reference.
// Illustrations intentionally remain placeholders until the artwork pass.
const VOICE_RATE = 0.91

function Speaker({ name }) {
  return <span className={'ar-avatar ' + (name === 'Casey' ? 'ar-casey' : '')}>{name === 'Casey' ? 'C' : 'A'}</span>
}

function PeopleScene({ kind = 'people', compact = false }) {
  return (
    <div className={'ar-scene ar-scene-' + kind + (compact ? ' ar-compact' : '')}>
      <span className="ar-placeholder">placeholder art</span>
      {kind === 'morning' && <span className="ar-sun" aria-hidden="true">☀</span>}
      {kind === 'time' && <span className="ar-times" aria-hidden="true"><i /><i /><i /></span>}
      {kind === 'reunion' && <span className="ar-reunion-line" aria-hidden="true"><i /><i /></span>}
      {kind === 'question' && <span className="ar-question" aria-hidden="true">?</span>}
      <svg className="ar-people" viewBox={kind === 'group' ? '0 0 300 145' : '0 0 260 160'} aria-hidden="true">
        <g transform={kind === 'group' ? 'translate(10 0)' : 'translate(44 0)'}>
          <rect x="0" y="78" width="65" height="81" rx="28" fill="#2f5bea"/>
          <circle cx="32" cy="59" r="24" fill="#f0c7a5"/>
          <path d="M8 54 C8 19 58 19 57 54 Q35 41 8 54" fill="#14213d"/>
          <circle cx="24" cy="61" r="2.7" fill="#14213d"/><circle cx="42" cy="61" r="2.7" fill="#14213d"/>
          <path d="M26 71 Q33 78 41 70" fill="none" stroke="#14213d" strokeWidth="2.4" strokeLinecap="round"/>
        </g>
        {kind === 'group' ? [101,170,239].map((x,i)=><g transform={'translate('+x+' 35)'} key={i}><circle cx="24" cy="51" r="18" fill="#ebc9aa"/><rect x="0" y="73" width="48" height="72" rx="22" fill="#93a4c7"/></g>) :
          <g transform="translate(145 0)">
            <rect x="0" y="78" width="65" height="81" rx="28" fill="#c4452c"/>
            <circle cx="32" cy="59" r="24" fill="#eab58b"/>
            <path d="M8 54 Q7 23 31 26 L31 17 Q31 13 37 13 L48 13 Q52 13 52 18 L52 27 Q59 32 57 54 Q31 41 8 54" fill="#3b2c24"/>
            <circle cx="24" cy="61" r="2.7" fill="#14213d"/><circle cx="42" cy="61" r="2.7" fill="#14213d"/>
            <path d="M26 71 Q33 78 41 70" fill="none" stroke="#14213d" strokeWidth="2.4" strokeLinecap="round"/>
          </g>}
      </svg>
    </div>
  )
}

function PlaySymbol({ full = false }) {
  return full ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>
    : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a5 5 0 0 1 0 6"/><path d="M18 6a9 9 0 0 1 0 12"/></svg>
}

function Conversation({ title, lines, scene = 'people', note, compact = false, play }) {
  return <article className={'ar-card ar-conversation' + (compact ? ' ar-compact-conversation' : '')}>
    {compact && <p className="ar-overline">{title}</p>}
    <div className="ar-conversation-content">
      <PeopleScene kind={scene} compact={compact}/>
      <div className="ar-dialogue">
        {!compact && <p className="ar-overline">{title}</p>}
        <button type="button" className="ar-play" onClick={() => play(lines.map(l=>l.text))} aria-label={'Play '+title}><PlaySymbol full/></button>
        <div className="ar-turns">
          {lines.map((line,i)=><div className={'ar-turn'+(line.who === 'Casey'?' ar-right':'')} key={i}>
            <Speaker name={line.who}/>
            <div className="ar-line-body"><small>{line.who}</small><span className="ar-dialogue-bubble">{line.text}</span></div>
          </div>)}
        </div>
        {note && <p className="ar-note">{note}</p>}
      </div>
    </div>
  </article>
}

function SectionHead({ index, title, description }) {
  return <header className="ar-section-heading"><h2 id={"ar-head-"+Number(index)}><span>{index}</span> {title}</h2><p>{description}</p></header>
}

function PhraseShelf({ title, options, scene = 'people', initial = 0, captions = false, play }) {
  const [selected, setSelected] = useState(initial)
  const option = options[selected] || options[0]
  return <article className="ar-card ar-phrase-shelf">
    <PeopleScene kind={scene}/>
    <div className="ar-shelf-body">
      <div className="ar-shelf-heading"><h3>{title}</h3>{captions && <span>{options.length} expressions</span>}</div>
      <div className="ar-speech-choices">
        {options.map((item,i)=><button key={item.text} type="button" className={'ar-speech' + (selected===i?' ar-selected':'')} aria-pressed={selected===i} onClick={()=>{setSelected(i);play(item.text)}}>
          <span>{item.text}</span><PlaySymbol/><span className="ar-tail" aria-hidden="true"/>
        </button>)}
      </div>
      <div className="ar-context" aria-live="polite">{option.description}</div>
    </div>
  </article>
}

const shelfEveryday = [
  {text:'Hi.',description:'A short, natural greeting to open contact in almost any everyday or workplace situation.'},
  {text:'Hello.',description:'A neutral greeting that works in almost any situation.'},
  {text:'Hey.',description:'A casual and friendly opening, especially with people you know.'},
]
const shelfTime = [
  {text:'Good morning.',description:'A full morning greeting. Use it to open contact or to return someone else’s morning greeting.'},
  {text:'Morning.',description:'A shortened morning greeting. It is friendly and natural with familiar people.'},
  {text:'Good afternoon.',description:'A greeting when meeting somebody during the afternoon.'},
  {text:'Good evening.',description:'Use this when you meet someone in the evening, not usually when saying goodbye.'},
  {text:'Good night.',description:'Say this when leaving someone at night or going to bed—not when first meeting them.'},
]
const shelfGroup = [
  {text:'Hi, everyone.',description:'A friendly, natural way to greet a group of colleagues, classmates, or friends.'},
  {text:'Hello, everyone.',description:'A neutral way to greet several people at once.'},
  {text:'Good morning, everyone.',description:'Greet a group in the morning.'},
  {text:'Good evening, everyone.',description:'A polite way to greet a group in the evening.'},
]
const shelfReunion = [
  {text:'Good to see you.',description:'Express pleasure at seeing someone you know.'},
  {text:"It's been a while.",description:'Acknowledge that you have not met or spoken for some time.'},
]
const shelfApart = [
  {text:'How have you been?',description:'Asks about the period since your last contact. Learn it as a single usable phrase.'},
  {text:"How've you been?",description:'The natural contracted form of “How have you been?”'},
  {text:"I've been good.",description:'A simple positive reply about the time since you last met.'},
  {text:"I've been okay.",description:'A more restrained reply about the time since you last met.'},
]
const shelfCasual = [
  {text:"What's up?",description:'An informal greeting for friends, or a real question about what is happening.'},
  {text:'Not much.',description:'A common brief reply: there is little new to report.'},
  {text:'Yo.',description:'A very casual way to get a friend’s attention or say hello.'},
]

function FlowGroup({ color, title, options, selected, onSelect, play, labels }) {
  return <div className={'ar-flow-group ar-flow-'+color}>
    {labels && <p className="ar-overline">{title}</p>}
    {options.map((item,i)=><div key={item.text}>
      {item.label && <p className="ar-flow-label">{item.label}{item.extra && <span>{item.extra}</span>}</p>}
      <button className={'ar-flow-choice'+(selected===item.text?' ar-on':'')} type="button" onClick={()=>{onSelect(item.text);play(item.text)}} aria-pressed={selected===item.text}><span>{item.text}</span><PlaySymbol/></button>
    </div>)}
  </div>
}

function CheckInFlow({ play }) {
  const [selected, setSelected]=useState("I'm okay.")
  const [selectedAsk, setSelectedAsk]=useState("How are you?")
  const [selectedReturn, setSelectedReturn]=useState("How about you?")
  const descriptions = {
    'How are you?':'A neutral, common way to ask how someone is doing.',
    'How are you doing?':'Another natural everyday check-in.',
    "How's it going?":'A casual check-in, especially with someone familiar.',
    'Good, thanks.':'A brief positive reply.',
    'Fine, thanks.':'A simple, neutral-positive reply.',
    'Pretty good.':'Things are going reasonably well.',
    'Not bad.':'A relaxed, generally positive reply.',
    "I'm okay.":'You are all right, managing, or reassuring the other person. Context matters.',
    'Not great.':'An honest answer when things are difficult.',
    'How about you?':'Return the question to the other person.',
    'You?':'An even shorter way to return the question.',
  }
  const ask = ["How are you?","How are you doing?","How's it going?"].map((text,i)=>({text,label:i===0?'1. Ask how someone is doing':null}))
  const answer = ['Good, thanks.','Fine, thanks.','Pretty good.','Not bad.'].map((text,i)=>({text,label:i===0?'2. Positive and everyday replies':null}))
  const neutral = ["I'm okay.",'Not great.'].map((text,i)=>({text,label:i===0?'3. Neutral or honest replies when things are difficult':null}))
  const back = ['How about you?','You?'].map((text,i)=>({text,label:i===0?'4. Return the question':null,extra:i===0?'Add after your answer':null}))
  return <article className="ar-card ar-flow-card">
    <div className="ar-flow-header"><p className="ar-overline">BUILD A SHORT CHECK-IN</p><button className="ar-play" type="button" onClick={()=>play([selectedAsk,selected,selectedReturn])} aria-label="Play your check-in"><PlaySymbol full/></button></div>
    <div className="ar-flow-layout">
      <div className="ar-flow-question-side"><div className="ar-flow-avatar"><Speaker name="Alex"/><b>Alex</b></div><FlowGroup color="blue" options={ask} selected={selectedAsk} onSelect={setSelectedAsk} play={play}/></div>
      <div className="ar-flow-arrow">↓</div>
      <div className="ar-flow-reply-side">
        <div className="ar-flow-response"><div className="ar-flow-stacked"><FlowGroup color="coral" options={[...answer,...neutral]} selected={selected} onSelect={setSelected} play={play}/><FlowGroup color="coral" options={back} selected={selectedReturn} onSelect={setSelectedReturn} play={play}/></div><div className="ar-flow-avatar"><b>Casey</b><Speaker name="Casey"/></div></div>
        <aside className="ar-note ar-honest"><strong>You do not have to say everything is good.</strong><br/>These replies are not a fixed scale of emotions. “Not great” is a valid honest answer. Someone who stops and makes time for you may invite more explanation, or you can keep your answer short without sharing private details.</aside>
      </div>
    </div>
    <div className="ar-context ar-flow-context"><strong>SELECTED · {selected}</strong> {descriptions[selected]}</div>
  </article>
}

export default function GreetingsReferenceStudy({ audioProps, phrases = [] }) {
  const utteranceRef=useRef(null)
  useEffect(()=>()=>{if(typeof window!=='undefined')window.speechSynthesis?.cancel()},[])
  const play=useCallback((texts)=>{
    if(typeof window==='undefined'||!('speechSynthesis' in window))return
    const lines=(Array.isArray(texts)?texts:[texts]).filter(Boolean)
    if(!lines.length)return
    // Prefer Artico's approved phrase recordings before the TTS fallback.
    if(lines.length===1){const match=phrases.find(p=>p.en===lines[0]);if(match&&approvedAudio[match.id]){window.speechSynthesis.cancel();audioProps?.onPlay(match.id);return}}
    audioProps?.audio?.stop?.()
    window.speechSynthesis.cancel()
    const voices=window.speechSynthesis.getVoices()
    const voice=voices.find(v=>v.lang.toLowerCase()==='en-us')||voices.find(v=>v.lang.toLowerCase().startsWith('en'))
    const next=(i)=>{if(i>=lines.length)return;const u=new SpeechSynthesisUtterance(lines[i]);utteranceRef.current=u;u.lang='en-US';u.rate=VOICE_RATE;if(voice)u.voice=voice;u.onend=()=>{if(utteranceRef.current===u)next(i+1)};window.speechSynthesis.speak(u)}
    next(0)
  },[audioProps,phrases])
  return <div className="ip-reading ar-page">
    <section id="study-open" className="ar-section" aria-labelledby="ar-head-1">
      <SectionHead index="01" title="Start the conversation" description={'Most conversations begin with something small: a greeting. It is a simple way to acknowledge someone and open the door to a conversation. Sometimes, all you need is a friendly “Hi.” Greetings can change depending on who you are talking to and when you meet.'}/>
      <PhraseShelf title="Everyday greetings" options={shelfEveryday} play={play}/>
      <aside className="ar-note ar-full-note"><strong>A little nuance</strong><b>Hi</b> is friendly and works in most situations. <b>Hello</b> is neutral and can feel slightly more formal. <b>Hey</b> is more casual, especially with people you know.</aside>
      <PhraseShelf title="Greetings throughout the day" options={shelfTime} scene="time" play={play}/>
      <aside className="ar-note ar-full-note"><strong>Good evening ≠ Good night</strong>Say <b>“Good evening”</b> when you meet someone in the evening. Say <b>“Good night”</b> when you are leaving or going to bed. We do not normally use “Good night” to start a conversation.</aside>
      <Conversation title="A MORNING GREETING" scene="morning" lines={[{who:'Alex',text:'Good morning.'},{who:'Casey',text:'Morning.'}]} note={'“Morning” is a shortened morning greeting. You can also answer with the full “Good morning.”'} play={play}/>
      <PhraseShelf title="Greeting a group" options={shelfGroup} scene="group" play={play}/>
    </section>
    <section id="study-check-in" className="ar-section" aria-labelledby="ar-head-2">
      <SectionHead index="02" title="Check in and answer" description={'“How are you?”, “How are you doing?”, and “How’s it going?” can be short social check-ins or genuine questions about someone’s situation. What happens next helps show the intention.'}/>
      <CheckInFlow play={play}/>
    </section>
    <section id="study-reunion" className="ar-section" aria-labelledby="ar-head-3">
      <SectionHead index="03" title="Meet again" description={'“Good to see you” expresses pleasure at seeing someone again. “It’s been a while” acknowledges time apart, and “How have you been?” asks about the period since your earlier contact. Learn it as a single usable phrase—you do not need to explain present-perfect grammar to use it.'}/>
      <PhraseShelf title="Seeing someone again" scene="reunion" options={shelfReunion} play={play}/>
      <PhraseShelf title="Ask about the time apart" scene="reunion" options={shelfApart} play={play}/>
      <aside className="ar-note ar-full-note"><strong>A little nuance · Good to see you vs. Nice to meet you</strong><b>“Good to see you”</b> is common when you meet someone you already know. <b>“Nice to meet you”</b> is the usual expression when meeting someone for the first time. You will practise introductions in Chapter 02.</aside>
    </section>
    <section id="study-casual" className="ar-section" aria-labelledby="ar-head-4">
      <SectionHead index="04" title="Optional: Casual choices" description={'With friends and close peers, “What’s up?” can work as an informal greeting or as a real question about what is happening.'}/>
      <PhraseShelf title="Casual greetings and replies" scene="friendly" options={shelfCasual} play={play}/>
    </section>
  </div>
}
