import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import { Segments } from './components'
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
function Directory({state,mode,lang}){
 return <div className="rd-directory">{collections.map((c,i)=>{const items=texts.filter(t=>t.collection===c.id),done=items.filter(t=>state.done[t.id]).length
  return <a className="rd-directory-item" key={c.id} href={'#'+path(c.id,mode)}>
   <span className="rd-directory-icon"><CurriculumIcon name={c.icon} size={24}/></span>
   <span className="rd-directory-copy"><small>{String(i+1).padStart(2,'0')} · {items.length} readings · {done} {copy[lang].practised.toLowerCase()}</small><strong>{lang==='ja'?c.ja:c.title}</strong><span>{c.intro}</span></span><span className="rd-arrow" aria-hidden="true">›</span></a>})}</div>
}
function Home({state,change,mode,t,lang}){
 const last=byId[state.last],saved=Object.entries(state.saved)
 return <>
 <header className="rd-heading"><p className="rd-eyebrow">ARTICO / APPLICATION</p><h1>Reading & Understanding</h1><p>{t.intro}</p><div className="rd-heading-actions">
 <a href={'#'+path('short',mode)} className="rd-primary">{t.start} →</a>{last&&<a href={'#'+path(last.collection,mode,last.id)} className="rd-secondary">{t.continue} · {last.title}</a>}</div></header>
 <div className="rd-intro"><strong>{lang==='ja'?'読みたいものと難易度を別々に選ぶ。':'Choose what to read and how challenging it should be.'}</strong><p>{lang==='ja'?'メッセージを読むために、最初から物語を全部終える必要はありません。':'A beginner can read a simple message today. You do not need to finish every story before trying practical English.'}</p></div>
 <div className="rd-section-heading"><p className="rd-eyebrow">READING LIBRARY</p><h2>{t.choose}</h2></div><Directory state={state} mode={mode} lang={lang}/>
 <section className="rd-wordbank"><div className="rd-section-heading"><p className="rd-eyebrow">VOCABULARY</p><h2>{t.saved} <small>{saved.length}</small></h2></div>
 {saved.length===0?<p className="rd-muted">{t.none}</p>:<div className="rd-saved-list">{saved.map(([id,entry])=><div key={id}><strong>{entry.word}</strong><span>{entry.meaning}</span><button type="button" onClick={()=>change(p=>{const s={...p.saved};delete s[id];return {...p,saved:s}})}>{t.remove}</button></div>)}</div>}</section>
 </>
}
function Collection({c,mode,state,t,lang}){
 const [tier,setTier]=useState('All'),items=texts.filter(v=>v.collection===c.id),available=tiers.filter(level=>items.some(v=>v.tier===level)),shown=tier==='All'?items:items.filter(v=>v.tier===tier)
 return <><header className="rd-heading"><p className="rd-eyebrow">READING COLLECTION</p><h1>{c.title}</h1><p>{lang==='ja'?c.ja+' · ':''}{c.intro} {c.goal}</p></header>
 <div className="rd-filter"><label htmlFor="rd-tier">{t.difficulty}</label><select id="rd-tier" value={tier} onChange={e=>setTier(e.target.value)}><option value="All">{t.any}</option>{available.map(x=><option key={x}>{x}</option>)}</select><span>{shown.length} readings</span></div>
 <div className="rd-text-list">{shown.map(v=><a key={v.id} className="rd-text-row" href={'#'+path(c.id,mode,v.id)}><span className="rd-index">{String(items.indexOf(v)+1).padStart(2,'0')}</span><span className="rd-text-copy"><strong>{v.title}</strong><span>{v.subtitle}</span><small>{v.tier} · {time(v)} min · {v.format}</small></span><span className="rd-row-action">{state.done[v.id]?t.practised:state.read[v.id]?t.read:t.reader} ›</span></a>)}
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
 <header className="rd-reader-header"><p className="rd-eyebrow">{collectionFor(text.collection)?.title.toUpperCase()} / {text.tier.toUpperCase()}</p><h1>{text.title}</h1><p>{text.subtitle}</p><div className="rd-facts"><span>{time(text)} min</span><span>{text.format}</span><span>{state.done[text.id]?t.practised:state.read[text.id]?t.read:''}</span></div></header>
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
 return <div className={'aw-page rd-page'+(text?' rd-wide':'')}>
 <nav className="rd-breadcrumb" aria-label="Reading breadcrumb"><a href="#/application">{t.back}</a><span>/</span>{c?<a href={'#'+path('home',mode)}>Reading & Understanding</a>:<span>Reading & Understanding</span>}{c&&<><span>/</span>{text?<a href={'#'+path(c.id,mode)}>{c.title}</a>:<span>{c.title}</span>}</>}</nav>
 <div className="rd-modebar"><Segments items={[{value:'study',label:t.study},{value:'practice',label:t.practice}]} label="Reading Study or Practice" active={mode} onChange={v=>window.location.hash=path(c?.id||'home',v,text?.id)}/><a href={'#'+path('home',mode)}>{t.all}</a></div>
 {text?<Reader key={text.id+'-'+mode} text={text} mode={mode} state={state} change={change} t={t} lang={lang}/>:
 c?<Collection key={c.id} c={c} mode={mode} state={state} t={t} lang={lang}/>:
 <Home state={state} change={change} mode={mode} t={t} lang={lang}/>}
 <footer className="rd-footer">{t.note}{error?' · '+(lang==='ja'?'保存できませんでした。':'Device storage unavailable.'):''}</footer>
 </div>
}
