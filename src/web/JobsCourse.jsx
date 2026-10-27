import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from './Language'
import outline from './jobsCourseOutline.json'
import c1 from './jobsCopy01.json'
import c2 from './jobsCopy02.json'
import c3 from './jobsCopy03.json'
import c4 from './jobsCopy04.json'
import c5 from './jobsCopy05.json'
import './jobs-course.css'

const copy = { ...c1, ...c2, ...c3, ...c4, ...c5 }
const units = outline.units
const lessons = outline.lessons
const roles = [
  { id:'support', name:'Customer Support Assistant', duties:'Reply to customer questions, track cases and escalate difficult issues.', required:'Clear written English, careful records, patient communication.', task:'A customer reports that an order is late. How would you investigate and reply?' },
  { id:'operations', name:'Operations Assistant', duties:'Coordinate deliveries, update records and organize schedules.', required:'Accurate records, prioritization and teamwork.', task:'Two deliveries are delayed but there is only one driver available. How would you prioritize?' },
  { id:'developer', name:'Junior Software Developer', duties:'Maintain a delivery dashboard, investigate bugs and test changes.', required:'Basic coding, debugging and clear technical explanations.', task:'The delivery dashboard shows an incorrect status. How would you investigate the issue?' },
]
const emails = {
  '2.3':{ from:'Jordan Lee · Northstar', subject:'Team information', body:'You found Jordan on Northstar’s public careers page. You have not spoken before. Write a respectful first message asking a small, relevant question.' },
  '2.4':{ from:'Jordan Lee · Northstar',subject:'A week after your introduction',body:'You sent a short question about opportunities seven days ago. There has been no response. Decide whether to send one final follow-up.' },
  '5.3':{ from:'Jordan Lee · Recruiting',subject:'Question about your application',body:'Hello Maya, thank you for applying. Could you confirm your current availability and the earliest date you could start?' },
  '5.5':{ from:'Jordan Lee · Recruiting',subject:'Interview invitation',body:'Hello Maya, we would like to arrange a 20-minute call on Thursday at 3:00 p.m. JST. Please let us know whether you can attend.' },
  '5.7':{ from:'Jordan Lee · Hiring Manager',subject:'Conversation completed',body:'You have just interviewed with Jordan. You discussed how the team helps small businesses solve order problems. Consider whether to write a short thank-you note.' },
  '5.8':{ from:'Jordan Lee · Recruiting',subject:'No update after the expected date',body:'The recruiter told you a decision would arrive last Friday. It is now the following Wednesday, and you have heard nothing.' },
  '5.9':{ from:'Jordan Lee · Recruiting',subject:'Your application',body:'Thank you for meeting our team. We have chosen another candidate. We appreciated learning about your experience and welcome future applications.' },
  '5.10':{ from:'Northstar · Hiring Team',subject:'Offer — Support Assistant',body:'We would like to offer you a position. The start date is next month. Weekly hours and overtime arrangements are not stated in this message.' },
  '5.11':{ from:'Northstar · Hiring Team',subject:'Offer response requested',body:'Northstar has made an offer. After comparing the conditions with your needs, you decide not to accept.' },
  '8.4':{ from:'Jordan Lee · Recruiting',subject:'Update on your application',body:'Thank you for taking part in the Northstar hiring process. We would like to discuss the next steps and the conditions of a possible offer.' },
}
const checks = {
  '1.1':{q:'A person spends an afternoon repairing their own bicycle. Is this necessarily a paid job?',opts:['Yes, all work is a job','No, work and a paid job are different concepts'],correct:1,why:'Work can happen without an employment relationship. A job normally involves a defined role and agreed conditions.'},
  '1.5':{q:'Which claim gives more useful evidence?',opts:['I am very hardworking','I tracked and resolved customer requests during busy shifts'],correct:1,why:'A specific action lets the reader judge the claim rather than take an adjective on trust.'},
  '2.6':{q:'A job requires a license you do not hold. What should you do?',opts:['Claim you have it','Check whether it is truly required and apply only if eligible'],correct:1,why:'Hard legal or safety requirements cannot be replaced with enthusiasm.'},
  '3.1':{q:'Is a CV always longer than a résumé?',opts:['Yes, everywhere','No, the term and format depend on country and context'],correct:1,why:'In US academia a CV is commonly longer; in other contexts CV and résumé may be used interchangeably.'},
  '4.1':{q:'Must every application include a cover letter?',opts:['Always','No, follow the application instructions'],correct:1,why:'Some employers request one; others do not. The instructions are decisive.'},
  '5.2':{q:'Does repeating a keyword guarantee an ATS will select you?',opts:['Yes','No, screening software and rules vary'],correct:1,why:'Keywords may improve relevance, but they cannot create qualifications or guarantee an interview.'},
  '5.9':{q:'Does every rejection notice require a response?',opts:['Yes, always reply','No, assess whether a brief response would be useful'],correct:1,why:'Routine automated notices need no response. A genuine professional connection may justify a short, gracious note.'},
  '6.6':{q:'Which answer is more informative?',opts:['We are a great team','I reorganized the queue and informed customers about delays'],correct:1,why:'A concrete personal action makes your contribution understandable.'},
  '7.5':{q:'You do not know a technical answer. What is best?',opts:['Invent a confident answer','State what you know and explain how you would investigate'],correct:1,why:'Honest uncertainty and sound reasoning are more credible than fabricated certainty.'},
}
const labels = {
  en:{ back:'Back to Application', course:'Jobs & Interviews', sub:'Understand the hiring journey. Learn the English. Practise making real decisions.',start:'Start from the beginning',resume:'Resume your lesson',study:'Study',practice:'Practice',overview:'Course overview',learn:'What this means',example:'A worked example',words:'Useful English',watch:'Keep in mind',task:'Your workbook task',answer:'Your own response',placeholder:'Write your reasoning, draft or speaking notes here. Your words—not a copied script.',save:'Mark practice complete',done:'Practised',clear:'Keep editing',model:'Review the example',hide:'Hide example',previous:'Previous lesson',next:'Next lesson',unit:'Stage',note:'Your work is stored on this device. Avoid entering sensitive personal data.',question:'Check your understanding',hear:'Hear the English',mic:'Dictate answer',stop:'Stop dictation',voice:'Uses your browser’s speech service if available. Audio may be processed by your browser provider.',noMic:'Typing is always available.',role:'Choose a fictional role',sample:'Document examples',close:'Back to course',prompt:'Interview prompt',all:'All stages',of:'of',leave:'Review the stage workbook',empty:'Write at least a brief response to mark this practice complete.',capstone:'Northstar is fictional. Nothing here is submitted to an employer.'},
  ja:{back:'実践に戻る',course:'Jobs & Interviews',sub:'採用の流れを理解し、必要な英語を学び、実際の判断を練習する。',start:'最初から始める',resume:'続きから学ぶ',study:'学ぶ',practice:'練習',overview:'コース一覧',learn:'大切な考え方',example:'具体例',words:'使える英語',watch:'注意点',task:'ワークブック',answer:'自分の答え',placeholder:'自分の言葉で書きましょう。答えの丸暗記は必要ありません。',save:'練習済みにする',done:'練習済み',clear:'編集を続ける',model:'例を確認する',hide:'例を隠す',previous:'前のレッスン',next:'次のレッスン',unit:'ステージ',note:'回答はこの端末に保存されます。個人情報は入力しないでください。',question:'理解を確認',hear:'英語を聞く',mic:'音声入力',stop:'音声入力を停止',voice:'対応ブラウザの音声機能を利用します。音声が外部サービスで処理される場合があります。',noMic:'文字入力も利用できます。',role:'架空の職種を選ぶ',sample:'書類の例',close:'コース一覧に戻る',prompt:'面接の質問',all:'全ステージ',of:'/',leave:'ステージのまとめ',empty:'少し書いてから練習を完了してください。',capstone:'Northstarは架空の会社です。実際の企業に送信されません。'}
}
const jobKey = (type,id) => 'application-jobs-'+type+(id ? '-'+id : '')
const sampleResumeEarly = 'ALEX RIVERA\nCity · email@example.com\n\nEDUCATION\nHigh school diploma, 2026\n\nPROJECT EXPERIENCE\nSchool event volunteer · 2025\n• Greeted visitors and answered directions questions.\n• Coordinated schedules with a six-person student team.\n\nSKILLS\nEnglish communication · Spreadsheets · Organization'
const sampleResumeExp = 'MAYA CHEN\nCity · email@example.com\n\nEXPERIENCE\nStore Assistant · 2024–2026\n• Answered customer questions and helped resolve order problems.\n• Logged unresolved cases and updated the shift manager.\n• Coordinated schedules during busy weekends.\n\nEDUCATION\nDiploma · 2024\n\nSKILLS\nCustomer support · Record keeping · English'
const draftLetter = 'Hello Hiring Team,\n\nI am applying for the [role] position at [company]. [One genuine reason this role fits you.]\n\nIn [experience or project], I [your specific action]. This is relevant because your team needs [duty from the job advertisement].\n\nThank you for considering my application. I would welcome a conversation about the role.\n\nKind regards,\n[Your name]'

function speak(text){
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.9
  window.speechSynthesis.speak(u)
  return true
}
function TextBlock({text}) { return <p className="jc-preline">{text}</p> }

export default function JobsCourse({learning,update}) {
  const {language} = useLanguage()
  const ja = language === 'ja'
  const t=labels[ja?'ja':'en']
  const responses=learning.responses || {}
  const [active,setActive]=useState(()=>lessons.some(x=>x.id===responses[jobKey('location')])?responses[jobKey('location')]:null)
  const [mode,setMode]=useState('study')
  const [openedUnit,setOpenedUnit]=useState('U01')
  const [reveal,setReveal]=useState(false)
  const [checked,setChecked]=useState(null)
  const [micState,setMicState]=useState('')
  const [warn,setWarn]=useState('')
  const recognition=useRef(null)
  const current=lessons.find(x=>x.id===active)
  const unit=current && units.find(x=>x.id===current.unit_id)
  const info=current && copy[current.id]
  const roleId=responses[jobKey('role')] || 'support'
  const role=roles.find(x=>x.id===roleId)||roles[0]
  const draft=current ? (responses[jobKey('note',current.id)]||''):''
  const finished=useMemo(()=>lessons.filter(x=>responses[jobKey('done',x.id)]==='1').length,[responses])
  const setResponse=(key,value)=>update(prev=>({...prev,responses:{...prev.responses,[key]:value}}))
  const edit=(value)=>{if(current)setResponse(jobKey('note',current.id),value.slice(0,4900))}
  const focusPage=()=>{const viewport=document.querySelector('.aw-main')||document.querySelector('main');if(viewport&&viewport.scrollTo)viewport.scrollTo({top:0,behavior:'instant'})}
  const select=(id,tab='study')=>{if(recognition.current){recognition.current.stop();recognition.current=null;}setMicState('');setActive(id);setMode(tab);setReveal(false);setChecked(null);setWarn('');setResponse(jobKey('location'),id);focusPage()}
  const home=()=>{setActive(null);setWarn('');setResponse(jobKey('location'),'');focusPage()}
  const completion=()=>{if(!draft.trim()){setWarn(t.empty);return}setWarn('');setResponse(jobKey('done',current.id),'1')}
  const dictate=()=>{
    if(recognition.current){recognition.current.stop();recognition.current=null;setMicState('');return}
    const Speech=window.SpeechRecognition||window.webkitSpeechRecognition
    if(!Speech){setMicState('unavailable');return}
    try{
      const rec=new Speech()
      rec.lang='en-US';rec.continuous=false;rec.interimResults=false
      rec.onresult=e=>{const transcript=Array.from(e.results).map(r=>r[0].transcript).join(' ');setResponse(jobKey('note',current.id),((responses[jobKey('note',current.id)]||'')+' '+transcript).trim().slice(0,4900))}
      rec.onend=()=>{recognition.current=null;setMicState('')}
      rec.onerror=()=>{recognition.current=null;setMicState('error')}
      recognition.current=rec;setMicState('listening');rec.start()
    }catch{setMicState('error')}
  }
  useEffect(()=>()=>{if(recognition.current)recognition.current.stop();if('speechSynthesis' in window)window.speechSynthesis.cancel()},[])
  const index=current?lessons.findIndex(x=>x.id===current.id):-1
  const interview=!!current&&(['U06','U07'].includes(current.unit_id)||current.id==='8.3'||current.id==='5.4')
  const email=current&&emails[current.id]
  const interviewQuestion=current&&(current.id==='8.3'?role.task:current.question)

  if(!current)return <div className="aw-page jc-page">
    <a className="ap-back" href="#/application">← {t.back}</a>
    <header className="jc-hero"><p className="ap-eyebrow">ARTICO / APPLICATION</p><h1>{t.course}</h1><p>{t.sub}</p>
      <div className="jc-hero-actions">
        <button type="button" className="jc-primary" onClick={()=>select('1.1')}>{t.start} <span aria-hidden="true">→</span></button>
        {responses[jobKey('location')]&&<button type="button" className="jc-secondary" onClick={()=>select(responses[jobKey('location')])}>{t.resume}</button>}
      </div>
      <p className="jc-meta">{finished} / {lessons.length} {ja?'レッスン練習済み':'lessons practised'}</p>
    </header>
    <div className="jc-course-map">
      {units.map((u,i)=>{const ls=lessons.filter(l=>l.unit_id===u.id);const count=ls.filter(l=>responses[jobKey('done',l.id)]==='1').length;return <section className="jc-stage" key={u.id}>
        <button type="button" className="jc-stage-top" aria-expanded={openedUnit===u.id} onClick={()=>setOpenedUnit(openedUnit===u.id?'':u.id)}>
          <span className="jc-stage-index">{String(i+1).padStart(2,'0')}</span><span className="jc-stage-copy"><strong>{u.title}</strong><small>{u.promise}</small></span><span className="jc-stage-count">{count}/{ls.length}</span><span className="jc-chevron">{openedUnit===u.id?'−':'+'}</span>
        </button>
        {openedUnit===u.id&&<div className="jc-stage-detail">{ls.map(l=><button type="button" className="jc-lesson-row" key={l.id} onClick={()=>select(l.id)}>
          <span className={'jc-mini-dot '+(responses[jobKey('done',l.id)]==='1'?'is-done':'')}/><span><strong>{l.id} · {l.title}</strong><small>{l.question}</small></span><span aria-hidden="true">›</span>
        </button>)}<div className="jc-workbook"> <span>{t.leave}</span><strong>{u.workbook.title}</strong><p>{u.workbook.task}</p></div></div>}
      </section>})}
    </div>
  </div>

  return <div className="aw-page jc-page">
    <nav className="jc-crumb" aria-label="Course position"><button type="button" onClick={home}>← {t.overview}</button><span>/</span><span>{unit.title}</span><span>/</span><span>{current.id}</span></nav>
    <div className="jc-layout">
      <aside className="jc-sidebar" aria-label={t.all}>
        <p className="jc-side-label">{t.all}</p>
        {units.map((u,i)=><div key={u.id}>
          <button type="button" className={'jc-side-unit '+(unit.id===u.id?'is-active':'')} onClick={()=>{const first=lessons.find(l=>l.unit_id===u.id);select(first.id)}}>{i+1}. {u.title}</button>
          {unit.id===u.id&&<div className="jc-side-lessons">{lessons.filter(l=>l.unit_id===u.id).map(l=><button type="button" key={l.id} className={'jc-side-lesson '+(active===l.id?'is-current':'')} onClick={()=>select(l.id)}>{responses[jobKey('done',l.id)]==='1'?'✓ ':''}{l.id} {l.title}</button>)}</div>}
        </div>)}
      </aside>
      <div className="jc-main">
        <p className="ap-eyebrow">{t.unit} {Number(unit.id.slice(1))} / 8 · {current.id}</p>
        <h1>{current.title}</h1>
        <p className="jc-question">{current.question}</p>
        <div className="jc-switch" role="group" aria-label="Learning mode"><button type="button" aria-pressed={mode==='study'} className={mode==='study'?'is-active':''} onClick={()=>{setMode('study');setWarn('')}}>{t.study}</button><button type="button" aria-pressed={mode==='practice'} className={mode==='practice'?'is-active':''} onClick={()=>{setMode('practice');setWarn('')}}>{t.practice}{responses[jobKey('done',current.id)]==='1'?' ✓':''}</button></div>

        {mode==='study'?<div className="jc-reading">
          <section className="jc-section"><h2>{t.learn}</h2><TextBlock text={info.intro}/></section>
          <section className="jc-example"><p className="jc-kicker">{t.example}</p><TextBlock text={info.example}/></section>
          {['3.2','3.7','3.6'].includes(current.id)&&<section className="jc-section"><h2>{t.sample}</h2><div className="jc-documents"><article><h3>{ja?'初めての仕事':'First job'}</h3><pre>{sampleResumeEarly}</pre></article><article><h3>{ja?'経験者':'Experienced applicant'}</h3><pre>{sampleResumeExp}</pre></article></div></section>}
          {current.id==='4.3'&&<section className="jc-section"><h2>{ja?'編集できる構成':'An adaptable structure'}</h2><pre className="jc-document">{draftLetter}</pre></section>}
          <section className="jc-phrase"><div><p className="jc-kicker">{t.words}</p><strong lang="en">{info.language}</strong></div><button type="button" aria-label={t.hear} title={t.hear} onClick={()=>speak(info.language)}>▶ <span className="jc-play-label">{t.hear}</span></button></section>
          <section className="jc-caution"><strong>{t.watch}</strong><p>{info.watch}</p></section>
          <button type="button" className="jc-primary jc-wide" onClick={()=>{setMode('practice');focusPage()}}>{t.practice} <span aria-hidden="true">→</span></button>
        </div>:<div className="jc-reading">
          {current.unit_id==='U08'&&<p className="jc-disclaimer">{t.capstone}</p>}
          {current.id==='8.1'&&<section className="jc-section"><h2>{t.role}</h2><div className="jc-role-list">{roles.map(r=><button key={r.id} type="button" className={roleId===r.id?'is-selected':''} onClick={()=>setResponse(jobKey('role'),r.id)}><strong>{r.name}</strong><span>{r.duties}</span><small>{r.required}</small></button>)}</div></section>}
          {current.unit_id==='U08'&&current.id!=='8.1'&&<section className="jc-scenario"><span>Northstar · {role.name}</span><p>{role.duties}</p><p><strong>{ja?'必須条件':'Required'}:</strong> {role.required}</p></section>}
          {email&&<section className="jc-inbox"><div className="jc-email-top"><span>✉</span><div><strong>{email.subject}</strong><small>{email.from}</small></div></div><p>{email.body}</p></section>}
          {interview&&<section className="jc-scenario"><span>{t.prompt}</span><strong>{interviewQuestion}</strong><button type="button" className="jc-plain" onClick={()=>speak(interviewQuestion)}>▶ {t.hear}</button></section>}
          <section className="jc-section"><h2>{t.task}</h2><p>{current.action}</p><p className="jc-small">{ja?'作成するもの':'What you will produce'}: {current.artifact}</p></section>
          {current.id==='3.7'&&<div className="jc-hintbar"><button type="button" onClick={()=>edit(sampleResumeEarly)}>{ja?'初めての仕事のひな型を使う':'Start from first-job template'}</button><button type="button" onClick={()=>edit(sampleResumeExp)}>{ja?'経験者のひな型を使う':'Start from experienced template'}</button></div>}
          {current.id==='4.6'&&<div className="jc-hintbar"><button type="button" onClick={()=>edit(draftLetter)}>{ja?'レターのひな型を使う':'Start from cover letter structure'}</button></div>}
          <label className="jc-answer-label" htmlFor="jc-answer">{t.answer}</label>
          <textarea id="jc-answer" className="jc-answer" rows={interview?6:9} value={draft} maxLength={4900} onChange={e=>edit(e.target.value)} placeholder={t.placeholder}/>
          <div className="jc-tools">{interview&&<button type="button" className="jc-secondary" onClick={dictate}>{micState==='listening'?t.stop:t.mic}</button>}<span>{draft.length}/4900</span></div>
          {interview&&<p className="jc-small">{t.voice} {micState==='error'||micState==='unavailable'?(ja?'音声入力は利用できません。':'Speech input is unavailable.'):''}</p>}
          {checks[current.id]&&<section className="jc-check"><p className="jc-kicker">{t.question}</p><strong>{checks[current.id].q}</strong><div className="jc-check-options">{checks[current.id].opts.map((o,i)=><button type="button" key={i} aria-pressed={checked===i} className={checked===i?'is-picked':''} onClick={()=>setChecked(i)}>{o}</button>)}</div>{checked!==null&&<p>{checked===checks[current.id].correct?'✓ ':''}{checks[current.id].why}</p>}</section>}
          <div className="jc-feedback"><button className="jc-plain" type="button" onClick={()=>setReveal(v=>!v)}>{reveal?t.hide:t.model} {reveal?'−':'+'}</button>{reveal&&<div><p className="jc-kicker">{t.example}</p><TextBlock text={info.example}/><p className="jc-small">{t.watch}: {info.watch}</p></div>}</div>
          <p className="jc-small">{t.note}</p>
          {warn&&<p className="jc-warning" role="alert">{warn}</p>}
          <button type="button" className="jc-primary jc-wide" onClick={completion}>{responses[jobKey('done',current.id)]==='1'?'✓ '+t.done:t.save}</button>
        </div>}
        <div className="jc-footer">
          <button type="button" className="jc-secondary" onClick={()=>index>0?select(lessons[index-1].id):home()}>{index>0?'← '+t.previous:'← '+t.close}</button>
          {index<lessons.length-1&&<button type="button" className="jc-secondary" onClick={()=>select(lessons[index+1].id)}>{t.next} →</button>}
          {index===lessons.length-1&&<button type="button" className="jc-secondary" onClick={home}>{t.close} →</button>}
        </div>
      </div>
    </div>
  </div>
}
