import { CourseDirectory } from './CourseNavigation'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import { readingCollections as collections, readingTexts as texts, readingTextById as byId, readingTiers as tiers } from './readingContent'
import './reading.css'

const key='artico.reading.v1'
const blank=()=>({version:1,read:{},done:{},answers:{},saved:{},last:null})
const load=()=>{try{const x=JSON.parse(localStorage.getItem(key));if(x?.version===1)return {...blank(),...x}}catch{}return blank()}
const path=(id='home',mode='study',text)=>'/application/reading/'+id+'/'+mode+(text?'?text='+encodeURIComponent(text):'')
const collectionFor=id=>collections.find(c=>c.id===id)
const words=t=>t.paragraphs.join(' ').trim().split(/\s+/).length
const time=t=>Math.max(1,Math.ceil(words(t)/160))
const copy={
 en:{back:'Back to Application',study:'Study',practice:'Practice',all:'All collections',intro:'Read something worth reading. Understand what it says, what it means, and what you can do with it.',start:'Browse the reading library',continue:'Continue',reader:'Read',read:'Read',practised:'Practised',difficulty:'Difficulty',any:'All difficulties',noTexts:'No readings at this difficulty yet.',gloss:'Tap a word to explore it. Underlined expressions have contextual meanings.',lookup:'Look up any word',meaning:'Word meaning',save:'Save word',remove:'Remove',none:'No saved words yet.',saved:'Saved words & expressions',unavailable:'No contextual explanation yet. Try the passage again or listen to the word.',online:'Looking up an English dictionary meaning…',failed:'The online dictionary is unavailable for this word.',general:'General dictionary meaning; the context may differ.',listen:'Listen',stop:'Stop',browser:'Device voice preview; pronunciation may vary.',focus:'What to notice',use:'Useful words in context',mark:'Mark as read',toPractice:'Go to Practice',support:'Show reading help',hide:'Hide reading help',help:'Reading help is visible',questions:'Check your understanding',instruction:'Make your choice before seeing the explanation. This checks one passage, not general proficiency.',summary:'Your one-sentence summary (optional)',submit:'Check answers',answerFirst:'Answer both questions first.',again:'Try again',correct:'correct',why:'Why',note:'Your progress stays on this device. Completion is practice, not a CEFR score.',fictional:'Original practice document. Organizations, posts, notices and reviews here are fictional.',choose:'Choose a reading',next:'Next reading',end:'Back to collection'},
 ja:{back:'実践に戻る',study:'学ぶ',practice:'練習',all:'すべてのジャンル',intro:'英語を読み、内容と意図を理解し、必要な情報を見つける練習です。',start:'読書ライブラリーへ',continue:'続きを読む',reader:'読む',read:'読了',practised:'練習済み',difficulty:'難易度',any:'すべての難易度',noTexts:'この難易度の文章はまだありません。',gloss:'単語をタップして意味を調べられます。下線の表現には文脈に合った説明があります。',lookup:'単語を検索',meaning:'単語の意味',save:'単語を保存',remove:'削除',none:'まだ保存した表現はありません。',saved:'保存した単語と表現',unavailable:'この文脈に合った説明はまだありません。発音を聞くことはできます。',online:'英英辞典で調べています…',failed:'オンライン辞典に接続できませんでした。',general:'一般的な辞書の意味です。文脈と異なる場合があります。',listen:'聞く',stop:'停止',browser:'端末の音声読み上げです。品質は端末によって異なります。',focus:'ここに注目',use:'役立つ表現',mark:'読了として記録',toPractice:'練習に進む',support:'読解サポート表示',hide:'読解サポートを隠す',help:'読解サポートが表示されています',questions:'理解を確認',instruction:'先に考えてから説明を確認しましょう。英語力全体を測るテストではありません。',summary:'一文で要約（任意）',submit:'答えを確認',answerFirst:'2問に答えてください。',again:'もう一度',correct:'正解',why:'理由',note:'進捗はこの端末に保存されます。修了は英語力認定ではありません。',fictional:'学習用のオリジナル文章です。団体や広告、投稿などは架空の例です。',choose:'読む文章を選ぶ',next:'次の文章',end:'一覧に戻る'}
}
function useStore(){
 const [state,setState]=useState(load),ref=useRef(state),[error,setError]=useState(false)
 const change=fn=>{const n=fn(ref.current);ref.current=n;setState(n);try{localStorage.setItem(key,JSON.stringify(n));setError(false)}catch{setError(true)}}
 useEffect(()=>{const sync=e=>{if(e.key!==key)return;const n=load();ref.current=n;setState(n)};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[])
 return {state,change,error}
}
function Directory({mode,lang}) {
 return <CourseDirectory label="Reading collections" items={[
  ...collections.map(collection => ({ id:collection.id, title:lang === 'ja' ? collection.ja : collection.title, summary:collection.intro, icon:collection.icon, href:'#' + path(collection.id, mode) })),
  { id:'saved', title:copy[lang].saved, summary:lang === 'ja' ? '保存した単語と表現を復習する。' : 'Revisit the language you have saved.', icon:'bookmark', href:'#' + path('saved', mode), wide:true },
 ]}/>
}

const readingLevels = [
 {id:1,stage:'beginner',cefr:'A1',tier:'Starter',title:'First Stories',ja:'はじめての物語',summary:'Short stories with clear people, places and events.',summaryJa:'短い物語で「誰が・どこで・何をしたか」を読み取る。',skill:'Who? Where? What happened?',skillJa:'誰が？どこで？何が起きた？'},
 {id:2,stage:'beginner',cefr:'A2',tier:'Easy',title:'Everyday Stories',ja:'日常のストーリー',summary:'Everyday situations, simple fables and useful messages.',summaryJa:'日常の出来事やメッセージを読み、流れをつかむ。',skill:'What changed, and why?',skillJa:'何が変わった？なぜ？'},
 {id:3,stage:'intermediate',cefr:'B1',tier:'Developing',title:'Stories & Real Life',ja:'物語と実生活',summary:'Longer stories, reviews and practical information.',summaryJa:'少し長い物語やレビューから要点を見つける。',skill:'How do the details connect?',skillJa:'情報はどうつながる？'},
 {id:4,stage:'intermediate',cefr:'B2',tier:'Confident',title:'Beyond the Surface',ja:'言葉の奥を読む',summary:'Read implied meaning, motives and contrasting views.',summaryJa:'書かれていない意図や異なる意見を読み取る。',skill:'What is implied but not stated?',skillJa:'直接書かれていない意味は？'},
 {id:5,stage:'advanced',cefr:'C1',tier:'Advanced',title:'Complex Ideas',ja:'複雑な考えを読む',summary:'Explore essays, layered fiction and ambiguity.',summaryJa:'論説や文学の視点・細かな意味を考える。',skill:'What assumptions shape the text?',skillJa:'どんな前提がある？'},
 {id:6,stage:'advanced',cefr:'C2',tier:null,title:'Masterful Reading',ja:'深く読み解く',summary:'Subtle literature, style and demanding arguments.',summaryJa:'高度な文学や議論の文体と含意を読み解く。',skill:'How do style and nuance change meaning?',skillJa:'文体や微妙な表現が意味をどう変える？'}
]
const readingStages = [
 {id:'beginner',title:'Beginner',ja:'初級',aim:'Understand the story',aimJa:'物語の内容をつかむ'},
 {id:'intermediate',title:'Intermediate',ja:'中級',aim:'Read beyond the words',aimJa:'言葉の奥を読む'},
 {id:'advanced',title:'Advanced',ja:'上級',aim:'Interpret and evaluate',aimJa:'意味を解釈し、考える'}
]
const getLevel = tier => readingLevels.find(level => level.tier === tier)
function Home({mode,lang,state,t}) {
 const ja=lang==='ja'
 const ordered=readingLevels.flatMap(level=>texts.filter(item=>item.tier===level.tier))
 const complete=item=>!!(state.done[item.id]||state.read[item.id])
 const totalDone=texts.filter(complete).length
 const current=byId[state.last] || ordered.find(item=>!complete(item)) || ordered[0]
 const suggested=ordered.find(item=>!complete(item)) || current
 const [tab,setTab]=useState('path')
 const [active,setActive]=useState(()=>getLevel(suggested?.tier)?.id||1)
 const percentage=(done,total)=>total?Math.round(done/total*100):0
 return <div className="rd-home">
  <header className="rd-home-hero">
   <p className="rd-eyebrow">{ja?'READING PATH · 読解':'YOUR READING JOURNEY'}</p>
   <h1>Reading &amp; Understanding</h1>
   <p>{ja?'物語を楽しみながら、少しずつ深く読めるようになる。好きなレベルから始められます。':'Follow stories. Notice more. Grow from understanding simple events to interpreting complex ideas.'}</p>
  </header>
  <section className="rd-continue" aria-label={ja?'読書の進捗':'Reading progress'}>
   <div className="rd-continue-top"><span>{ja?'これまでの読書':'YOUR PROGRESS'}</span><strong>{totalDone} / {texts.length} {ja?'読了':'readings'}</strong></div>
   <div className="rd-progress-track" role="progressbar" aria-label={ja?'読書の進捗':'Reading progress'} aria-valuenow={totalDone} aria-valuemin="0" aria-valuemax={texts.length}><span style={{width:percentage(totalDone,texts.length)+'%'}}/></div>
   <div className="rd-continue-action"><div><small>{state.last?(ja?'前回の続き':'PICK UP WHERE YOU LEFT OFF'):(ja?'まずはこの物語から':'A GOOD PLACE TO START')}</small><strong>{current?.title||'The Red Umbrella'}</strong><p>{ja?'読むほど、少しずつ世界が広がります。':'Keep reading at your own pace. No levels are locked.'}</p></div>
    {current&&<a className="rd-primary" href={'#'+path(current.collection,mode,current.id)}>{state.last?(ja?'続きを読む':'Continue reading'):(ja?'読み始める':'Start reading')} <span aria-hidden="true">→</span></a>}
   </div>
  </section>
  <div className="rd-home-tabs" role="group" aria-label={ja?'表示を選ぶ':'Choose reading view'}>
   <button type="button" aria-pressed={tab==='path'} className={tab==='path'?'is-current':''} onClick={()=>setTab('path')}>{ja?'レベル別に読む':'Reading Path'}</button>
   <button type="button" aria-pressed={tab==='explore'} className={tab==='explore'?'is-current':''} onClick={()=>setTab('explore')}>{ja?'ジャンルから探す':'Explore by Type'}</button>
  </div>
  {tab==='explore' ? <section className="rd-explore"><div className="rd-home-section-head"><h2>{ja?'好きなジャンルから探す':'Browse anything that interests you'}</h2><p>{ja?'それぞれのジャンルには、複数の難易度の読み物があります。':'Each collection has its own mix of difficulty levels.'}</p></div><Directory mode={mode} lang={lang}/></section> :
   <div className="rd-path">
    <p className="rd-level-note">{ja?'CEFR（A1〜C2）は目安です。文章を読んだだけで英語力を認定するものではありません。':'A1–C2 are approximate learning targets, not certified ratings of these texts or your English ability.'}</p>
    {readingStages.map(stage=>{
     const group=readingLevels.filter(level=>level.stage===stage.id)
     const selected=group.find(level=>level.id===active)
     const selection=selected?texts.filter(item=>item.tier===selected.tier):[]
     return <section key={stage.id} className="rd-stage">
      <div className="rd-stage-heading"><div><p className="rd-eyebrow">{ja?stage.ja:stage.title}</p><h2>{ja?stage.aimJa:stage.aim}</h2></div><span>{group.map(level=>'0'+level.id).join(' · ')}</span></div>
      <div className="rd-level-grid">{group.map(level=>{
       const books=texts.filter(item=>item.tier===level.tier),done=books.filter(complete).length
       const open=active===level.id
       return <button key={level.id} type="button" className={'rd-level-card'+(open?' is-active':'')} aria-expanded={open} onClick={()=>setActive(open?null:level.id)}>
        <div className="rd-level-top"><span>{ja?'レベル':'LEVEL'} {String(level.id).padStart(2,'0')}</span><span>{level.cefr} <span aria-hidden="true">↗</span></span></div>
        <strong>{ja?level.ja:level.title}</strong>
        <p>{ja?level.summaryJa:level.summary}</p>
        <div className="rd-level-bottom"><small>{books.length?done+' / '+books.length+' '+(ja?'読了':'readings'):ja?'準備中':'In development'}</small><span aria-hidden="true">{open?'−':'+'}</span></div>
        <div className="rd-progress-track rd-progress-small"><span style={{width:percentage(done,books.length)+'%'}}/></div>
       </button>
      })}</div>
      {selected&&<div className="rd-level-detail">
       <div className="rd-detail-heading"><div><p className="rd-eyebrow">{ja?'レベル':'LEVEL'} {selected.id} · {selected.cefr}</p><h3>{ja?selected.ja:selected.title}</h3><p>{ja?selected.skillJa:selected.skill}</p></div><button type="button" onClick={()=>setActive(null)} aria-label={ja?'閉じる':'Close level'}>×</button></div>
       {selection.length?<div className="rd-text-list">{selection.map((item,index)=><a key={item.id} className="rd-text-row" href={'#'+path(item.collection,mode,item.id)}>
        <span className="rd-index">{String(index+1).padStart(2,'0')}</span><span className="rd-text-copy"><strong>{item.title}</strong><span>{item.subtitle}</span><small>{collectionFor(item.collection)?.title} · {time(item)} min · {item.format}</small></span><span className="rd-row-action">{state.done[item.id]?t.practised:state.read[item.id]?t.read:t.reader} ›</span>
       </a>)}</div>:<p className="rd-empty">{ja?'このレベルの文章は現在準備中です。':'New readings for this level are being developed. Explore other levels in the meantime.'}</p>}
      </div>}
     </section>
    })}
    <div className="rd-saved-shortcut"><a href={'#'+path('saved',mode)}><CurriculumIcon name="bookmark" size={20}/><span>{t.saved}</span><span aria-hidden="true">→</span></a></div>
   </div>}
 </div>
}
function SavedWords({state,change,t,mode}) {
 const [revealed,setRevealed] = useState({})
 const {language} = useLanguage(), ja = language === 'ja'
 const saved = Object.entries(state.saved)
 return <section className="rd-wordbank"><div className="rd-section-heading"><h1>{t.saved} <small>{saved.length}</small></h1></div>
 {saved.length === 0 ? <p className="rd-muted">{t.none}</p> : <div className="rd-saved-list">{saved.map(([id,entry]) => <div key={id}><strong>{entry.word}</strong>{mode === 'practice' ? <><button type="button" onClick={() => setRevealed(previous => ({ ...previous, [id]:!previous[id] }))}>{revealed[id] ? (ja ? '意味を隠す' : 'Hide meaning') : (ja ? '意味を確認' : 'Reveal meaning')}</button>{revealed[id] && <span className="rd-recalled-meaning">{entry.meaning}</span>}</> : <><span>{entry.meaning}</span><button type="button" onClick={() => change(previous => {
  const words = {...previous.saved}; delete words[id]; return {...previous,saved:words}
 })}>{t.remove}</button></>}</div>)}</div>}</section>
}
function Collection({c,mode,state,t,lang}){
 const [tier,setTier]=useState('All'),items=texts.filter(v=>v.collection===c.id),available=tiers.filter(level=>items.some(v=>v.tier===level)),shown=tier==='All'?items:items.filter(v=>v.tier===tier)
 return <><header className="rd-heading"><p className="rd-eyebrow">READING COLLECTION</p><h1>{c.title}</h1><p>{lang==='ja'?c.ja+' · ':''}{c.intro} {c.goal}</p></header>
 <div className="rd-filter"><label htmlFor="rd-tier">{t.difficulty}</label><select id="rd-tier" value={tier} onChange={e=>setTier(e.target.value)}><option value="All">{t.any}</option>{available.map(x=><option key={x} value={x}>{getLevel(x)?'Level '+getLevel(x).id+' · '+getLevel(x).cefr:x}</option>)}</select><span>{shown.length} readings</span></div>
 <div className="rd-text-list">{shown.map(v=><a key={v.id} className="rd-text-row" href={'#'+path(c.id,mode,v.id)}><span className="rd-index">{String(items.indexOf(v)+1).padStart(2,'0')}</span><span className="rd-text-copy"><strong>{v.title}</strong><span>{v.subtitle}</span><small>{getLevel(v.tier)?'Level '+getLevel(v.tier).id+' · '+getLevel(v.tier).cefr:v.tier} · {time(v)} min · {v.format}</small></span><span className="rd-row-action">{state.done[v.id]?t.practised:state.read[v.id]?t.read:t.reader} ›</span></a>)}
 {!shown.length&&<p className="rd-empty">{t.noTexts}</p>}</div></>
}
const escapeRx=s=>s.replace(/[\x24.*+?^{}()|[\]\\]/g,'\\$&')
const letters=/^[\p{L}\p{N}][\p{L}\p{N}'’\-]*$/u
function InlineText({text,glossary,onPick}){
 const terms=Object.keys(glossary).sort((a,b)=>b.length-a.length)
 const regex=new RegExp('\\b('+terms.map(escapeRx).join('|')+')\\b','gi')
 return <>{text.split(regex).map((part,i)=>{
   if(terms.some(t=>t.toLowerCase()===part.toLowerCase()))return <button type="button" className="rd-word rd-glossed" key={i} onClick={()=>onPick(part)} aria-label={'Explain '+part}>{part}</button>
   return part.split(/(\s+|[^\p{L}\p{N}'’\-]+)/u).map((token,j)=>letters.test(token)?<button type="button" className="rd-word" tabIndex={-1} key={i+'-'+j} onClick={()=>onPick(token)}>{token}</button>:<span key={i+'-'+j}>{token}</span>)
 })}</>
}
function useVoice(){
 const [playing,setPlaying]=useState(false),[error,setError]=useState(false)
 useEffect(()=>()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel()},[])
 const stop=()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel();setPlaying(false)}
 const speak=text=>{if(!('speechSynthesis'in window)){setError(true);return}window.speechSynthesis.cancel();setPlaying(false)
  const utter=new SpeechSynthesisUtterance(text);utter.lang='en-US';utter.rate=.9;utter.onend=()=>setPlaying(false);utter.onerror=()=>{setPlaying(false);setError(true)}
  window.speechSynthesis.speak(utter);setPlaying(true);setError(false)}
 return {speak,stop,playing,error}
}
function Definition({word,glossary,store,change,speak,t}){
 const [remote,setRemote]=useState(null),[loading,setLoading]=useState(false),[failed,setFailed]=useState(false),cache=useRef({})
 const normalized=word.toLowerCase()
 const local=Object.entries(glossary).find(([k])=>k.toLowerCase()===normalized)?.[1]
 useEffect(()=>{setRemote(null);setLoading(false);setFailed(false);if(!word||local)return
  if(cache.current[normalized]){setRemote(cache.current[normalized]);return}
  if(!/^[a-z]+(?:['’-][a-z]+)*$/i.test(word)){setFailed(true);return}
  const controller=new AbortController();setLoading(true)
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(normalized),{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('not found');return r.json()}).then(x=>{
   const meaning=x?.[0]?.meanings?.flatMap(m=>m.definitions||[])?.[0]?.definition
   if(!meaning)throw Error('empty');cache.current[normalized]=meaning;setRemote(meaning)
  }).catch(e=>{if(e.name!=='AbortError')setFailed(true)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
  return()=>controller.abort()
 },[normalized,word,local])
 if(!word)return <div className="rd-word-help"><p className="rd-eyebrow">{t.meaning.toUpperCase()}</p><p>{t.gloss}</p></div>
 const meaning=local?.[0]||remote||'',saved=!!store.saved[normalized]
 return <div className="rd-word-help" aria-live="polite"><p className="rd-eyebrow">{t.meaning.toUpperCase()}</p><div className="rd-word-head"><strong>{word}</strong><button type="button" onClick={()=>speak(word)}>▶ {t.listen}</button></div>
 {meaning?<p>{meaning}</p>:<p className="rd-muted">{loading?t.online:failed?t.failed:t.unavailable}</p>}
 {local?.[1]&&<p className="rd-japanese" lang="ja">{local[1]}</p>}
 {remote&&!local&&<small>{t.general}</small>}
 <button type="button" className="rd-save" disabled={!meaning} onClick={()=>change(p=>{const saved={...p.saved};if(saved[normalized])delete saved[normalized];else saved[normalized]={word,meaning};return {...p,saved}})}>{saved?t.remove:t.save}</button></div>
}
function Quiz({text,state,change,t}){
 const existing=state.answers[text.id]
 const [choice,setChoice]=useState(Array.isArray(existing?.values)?existing.values:[null,null])
 const [checked,setChecked]=useState(!!existing?.checked)
 const [summary,setSummary]=useState(existing?.summary||'')
 const remember=(values,review,notes=summary)=>change(p=>({...p,answers:{...p.answers,[text.id]:{values,checked:review,summary:notes.slice(0,1200)}},done:{...p.done,[text.id]:review||!!p.done[text.id]}}))
 return <section className="rd-quiz"><div className="rd-section-heading"><p className="rd-eyebrow">PRACTICE</p><h2>{t.questions}</h2></div><p className="rd-muted">{t.instruction}</p>
 {text.questions.map((q,i)=><fieldset key={i} disabled={checked} className="rd-question"><legend>{String(i+1).padStart(2,'0')} · {q.q}</legend>
 {q.options.map((answer,j)=><label key={j} className={'rd-option'+(choice[i]===j?' is-selected':'')+(checked&&j===q.answer?' is-correct':'')+(checked&&choice[i]===j&&j!==q.answer?' is-incorrect':'')}>
 <input type="radio" name={'rd-'+text.id+'-'+i} value={j} checked={choice[i]===j} onChange={()=>{const next=choice.map((v,k)=>i===k?j:v);setChoice(next);remember(next,false)}}/>{answer}</label>)}
 {checked&&<div className="rd-answer"><strong>{choice[i]===q.answer?'✓ '+t.correct:'→ '+t.why}</strong><p>{q.why}</p></div>}</fieldset>)}
 <div className="rd-summary"><label htmlFor="rd-summary">{t.summary}</label><textarea id="rd-summary" rows={3} maxLength={1200} value={summary} onChange={e=>{setSummary(e.target.value);remember(choice,checked,e.target.value)}} placeholder="Write what you understood in your own words…"/></div>
 <div className="rd-actions">{checked?<><strong>{choice.filter((v,i)=>v===text.questions[i].answer).length} / {text.questions.length} {t.correct}</strong><button className="rd-secondary" type="button" onClick={()=>{setChoice([null,null]);setChecked(false);remember([null,null],false)}}>{t.again}</button></>:
 <><button className="rd-primary" type="button" disabled={choice.some(v=>v===null)} onClick={()=>{setChecked(true);remember(choice,true)}}>{t.submit}</button>{choice.some(v=>v===null)&&<span className="rd-muted">{t.answerFirst}</span>}</>}</div></section>
}
function Reader({text,mode,state,change,t,lang}){
 const [word,setWord]=useState(''),[help,setHelp]=useState(mode==='study'),[search,setSearch]=useState('')
 const voice=useVoice()
 useEffect(()=>{if(state.last!==text.id)change(p=>({...p,last:text.id}))},[text.id])
 useEffect(()=>{setWord('');setHelp(mode==='study');voice.stop()},[text.id,mode])
 const all=texts.filter(v=>v.collection===text.collection),i=all.findIndex(v=>v.id===text.id),previous=all[i-1],next=all[i+1]
 const supported=mode==='study'||help
 return <>
 <header className="rd-reader-header"><p className="rd-eyebrow">{collectionFor(text.collection)?.title.toUpperCase()} / {getLevel(text.tier)?'LEVEL '+getLevel(text.tier).id+' · '+getLevel(text.tier).cefr:text.tier.toUpperCase()}</p><h1>{text.title}</h1><p>{text.subtitle}</p><div className="rd-facts"><span>{time(text)} min</span><span>{text.format}</span><span>{state.done[text.id]?t.practised:state.read[text.id]?t.read:''}</span></div></header>
 <div className="rd-reader-grid"><div className="rd-reader-main">
 <div className="rd-reader-tools"><button type="button" onClick={()=>voice.playing?voice.stop():voice.speak(text.paragraphs.join(' '))}>{voice.playing?'■ '+t.stop:'▶ '+t.listen}</button><small>{voice.error?t.failed:t.browser}</small></div>
 {mode==='practice'&&<div className="rd-assistance"><button type="button" aria-pressed={help} onClick={()=>{setHelp(!help);setWord('')}}>{help?t.hide:t.support}</button>{help&&<span>{t.help}</span>}</div>}
 <article className={'rd-document rd-document-'+text.format} lang="en">{text.paragraphs.map((p,i)=><p key={i}>{supported?<InlineText text={p} glossary={text.glossary} onPick={setWord}/>:p}</p>)}</article>
 {['notice','email','post','message','news','review'].includes(text.format)&&<p className="rd-fineprint">{t.fictional}</p>}
 {mode==='study'?<><section className="rd-study-focus"><p className="rd-eyebrow">{t.focus.toUpperCase()}</p><p>{text.study}</p></section>
 <section className="rd-study-terms"><div className="rd-section-heading"><p className="rd-eyebrow">LANGUAGE</p><h2>{t.use}</h2></div><div className="rd-terms">{Object.entries(text.glossary).map(([word,def])=><button key={word} type="button" onClick={()=>setWord(word)}><strong>{word}</strong><span>{lang==='ja'?def[1]:def[0]}</span></button>)}</div></section>
 <div className="rd-actions"><a className="rd-primary" href={'#'+path(text.collection,'practice',text.id)}>{t.toPractice} →</a><button type="button" className="rd-secondary" onClick={()=>change(p=>({...p,read:{...p.read,[text.id]:true}}))}>{state.read[text.id]?'✓ '+t.read:t.mark}</button></div></>:<Quiz text={text} state={state} change={change} t={t}/>}
 </div>
 {supported&&<aside className={'rd-inspector'+(!word?' rd-empty-inspector':'')}><button type="button" className="rd-inspector-close" onClick={()=>setWord('')} aria-label="Close word explanation">×</button><Definition word={word} glossary={text.glossary} store={state} change={change} speak={voice.speak} t={t}/><form onSubmit={e=>{e.preventDefault();if(search.trim())setWord(search.trim().slice(0,60))}} className="rd-lookup"><label htmlFor="rd-search">{t.lookup}</label><div><input id="rd-search" value={search} maxLength={60} onChange={e=>setSearch(e.target.value)} placeholder="word"/><button type="submit" aria-label={t.lookup}>↗</button></div></form></aside>}
 </div>
 <nav className="rd-text-nav" aria-label="Reading navigation">{previous?<a href={'#'+path(text.collection,mode,previous.id)}>← {previous.title}</a>:<span/>}
 <a href={'#'+path(text.collection,mode,next?.id)}>{next?next.title:t.end} →</a></nav>
 </>
}
export default function ReadingCourse({route}){
 const {language}=useLanguage(),lang=language==='ja'?'ja':'en',t=copy[lang],{state,change,error}=useStore()
 const c=collectionFor(route.collection),mode=route.view==='practice'?'practice':'study'
 const text=byId[route.text]?.collection===c?.id?byId[route.text]:null
 return <div className={'aw-page rd-page'+(text?' rd-wide':!c && route.collection !== 'saved' ? ' cn-index':'')}>
 {(c || route.collection === 'saved') && <nav className="rd-breadcrumb" aria-label="Reading breadcrumb"><a href="#/courses?application">{t.back}</a><span>/</span>{c?<a href={'#'+path('home',mode)}>Reading & Understanding</a>:<span>Reading & Understanding</span>}{c&&<><span>/</span>{text?<a href={'#'+path(c.id,mode)}>{c.title}</a>:<span>{c.title}</span>}</>}</nav>}
 {route.collection === 'saved' ? <SavedWords state={state} change={change} t={t} mode={mode}/> : text?<Reader key={text.id+'-'+mode} text={text} mode={mode} state={state} change={change} t={t} lang={lang}/>:
 c?<Collection key={c.id} c={c} mode={mode} state={state} t={t} lang={lang}/>:
 <Home state={state} change={change} mode={mode} t={t} lang={lang}/>}
 {(c || route.collection === 'saved') && <footer className="rd-footer">{t.note}{error?' · '+(lang==='ja'?'保存できませんでした。':'Device storage unavailable.'):''}</footer>}
 </div>
}
