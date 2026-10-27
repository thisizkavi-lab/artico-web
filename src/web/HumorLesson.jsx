import { useMemo, useState } from 'react'
import { useLanguage } from './Language'
import { getLessonNavigation } from './pathway'
import CurriculumIcon from './CurriculumIcon'
import { moves, scenes, chats, memes, videos, exercises, starterIds, branches, writingPrompts, usefulPhrases } from './humorContent'
import './humor.css'

const progressKey = 'application-humor-2'
const categories = [
  ['notice', 'Notice the joke', '冗談に気づく'],
  ['decode', 'Read the meaning', '意味を読み取る'],
  ['respond', 'Choose a reply', '返し方を選ぶ'],
  ['digital', 'Texts & memes', 'メッセージとミーム'],
  ['delivery', 'Timing & tone', '間と声（文字版）'],
]
const clusters = [
  ['start', '01', 'What is humor?', 'ユーモアとは？'],
  ['moves', '02', 'How it works', '笑いの仕組み'],
  ['banter', '03', 'Joining the conversation', '会話に参加する'],
  ['judgment', '04', 'Timing & judgment', '間と判断'],
  ['online', '05', 'Texts & memes', 'メッセージとミーム'],
  ['watch', '06', 'Watch & learn', '映像で観察する'],
]
const copy = (en, ja, japanese) => japanese ? ja : en

function Figure({ variant = 'late' }) {
  return <svg className="hm-figure" viewBox="0 0 570 260" role="img" aria-label={variant === 'rain' ? 'Two contrasting weather situations' : 'Two friends meeting at a station'}>
    <rect x="1" y="1" width="568" height="258" rx="18" fill="#f3f5f5" stroke="#e3e8e7"/>
    <path d="M20 198H550" stroke="#dae1e5" strokeWidth="2"/>
    <rect x="385" y="42" width="130" height="145" rx="8" fill="#e4e9ed"/>
    <rect x="402" y="58" width="98" height="102" rx="4" fill="#fbfaf7"/>
    {variant === 'rain' ? <>
      <g stroke="#79a5cc" strokeWidth="3" strokeLinecap="round"><path d="M65 35l-9 17M112 29l-9 17M160 37l-9 17M207 29l-9 17M255 40l-9 17M297 31l-9 17"/></g>
      <path d="M110 82Q177 14 245 82" fill="#a9bfd4" stroke="#6185b1" strokeWidth="4"/><path d="M177 82v99q0 15 14 15" stroke="#6185b1" strokeWidth="4" fill="none"/>
    </> : <><circle cx="450" cy="91" r="25" fill="#fff" stroke="#9dabb7" strokeWidth="3"/><path d="M450 91V76M450 91l12 8" stroke="#9dabb7" strokeWidth="3" strokeLinecap="round"/></>}
    <g transform="translate(128 72)"><ellipse cx="40" cy="41" rx="31" ry="35" fill="#f1c9ae"/><path d="M13 37q0-45 30-38t28 40l-7-17-13-5-30 9z" fill="#4f515e"/><path d="M3 115q7-49 37-49t37 49v73H3z" fill="#7293a9"/><path d="M28 189v-20M56 189v-20" stroke="#596b85" strokeWidth="13" strokeLinecap="round"/><path d="M16 106l-25 37M66 106l25 30" stroke="#7293a9" strokeWidth="14" strokeLinecap="round"/></g>
    <g transform="translate(295 77)"><ellipse cx="40" cy="41" rx="31" ry="35" fill="#e1bba0"/><path d="M8 40q-4-38 34-39t27 34l-14-12-26 4z" fill="#444854"/><path d="M0 113q6-45 40-45t40 45v71H0z" fill="#c6a87d"/><path d="M28 187v-18M56 187v-18" stroke="#6f6f79" strokeWidth="13" strokeLinecap="round"/><path d="M12 100l-26 27M68 100l20 38" stroke="#c6a87d" strokeWidth="14" strokeLinecap="round"/></g>
    <path d="M209 89q39-28 69-8" fill="none" stroke="#adbccc" strokeWidth="2" strokeDasharray="4 6"/>
    <circle cx="220" cy="75" r="4" fill="#6f8fb2"/>
    <circle cx="237" cy="63" r="3" fill="#6f8fb2"/>
  </svg>
}

function Dialogue({ scene, ja }) {
  return <article className="hm-scene">
    <div className="hm-scene-visual"><Figure variant={scene.id === 'late' ? 'late' : 'rain'}/></div>
    <div className="hm-scene-copy">
      <p className="hm-micro">{copy(scene.setting, scene.settingJa, ja)}</p>
      <p className="hm-context">{copy(scene.background, scene.backgroundJa, ja)}</p>
      <div className="hm-conversation">{scene.turns.map(([speaker,line,meaning],i)=>
        <div className="hm-turn" key={i}><span className="hm-speaker">{speaker}</span><p lang="en">{line}</p>{ja && <small lang="ja">{meaning}</small>}</div>)}</div>
      <p className="hm-explain">{copy(scene.insight, scene.insightJa, ja)}</p>
    </div>
  </article>
}

function Chat({ data, ja }) {
  return <article className="hm-chat-card"><div className="hm-chat-top"><span className="hm-chat-dot"/><strong>{copy(data.title,data.ja,ja)}</strong><span className="hm-chat-sub">TEXT MESSAGE</span></div><div className="hm-chat-log">
    {data.messages.map(([name,message],i)=><div key={i} className={'hm-chat-line '+(i%2?'hm-chat-left':'hm-chat-right')}><span className="hm-chat-name">{name}</span><p lang="en">{message}</p></div>)}
  </div><p className="hm-chat-explain">{copy(data.explain,data.explainJa,ja)}</p></article>
}

function Meme({ data, ja }) {
  return <article className="hm-meme-card">
    <p className="hm-micro">{copy(data.tag,data.tagJa,ja)}</p>
    <h3>{data.name}</h3>
    <div className={'hm-meme-visual hm-meme-'+data.diagram} aria-label={data.scene+' / '+data.caption}>
      {data.diagram === 'fine' ? <>
        <span className="hm-meme-small">REALITY</span><div className="hm-meme-stacked"><span>Deadline 1</span><span>Deadline 2</span><span>Deadline 3</span></div>
        <div className="hm-meme-thinking"><span>ME</span><strong>This is fine.</strong></div>
      </> : data.diagram === 'surprise' ? <>
        <div className="hm-meme-step">Stay up until 3 a.m.</div><span className="hm-meme-arrow">→</span><div className="hm-meme-step">Wake up exhausted</div><span className="hm-meme-arrow">→</span><div className="hm-meme-step hm-meme-last">Me: What?!</div>
      </> : <>
        <div className="hm-meme-step">My study plan</div><div className="hm-meme-choice"><span>ME</span><b>→ One more video</b></div>
        <span className="hm-meme-small">Attention goes somewhere else.</span>
      </>}
    </div>
    <p className="hm-meme-caption" lang="en">{data.caption}</p>
    <p className="hm-explain">{copy(data.insight,data.ja,ja)}</p>
    <a href={data.source} target="_blank" rel="noopener noreferrer">{copy('About the original format','元のミームについて',ja)}</a>
    <small>{data.credit} · Original Artico teaching diagram, not a reproduction</small>
  </article>
}

function Media({ video, ja, featured=false }) {
  const [playing, setPlaying] = useState(false)
  return <article className={'hm-video '+(featured?'hm-featured':'')}>
    <p className="hm-micro">{video.kind}</p><h3>{video.title}</h3><p className="hm-publisher">{video.publisher}</p>
    <p>{copy(video.prompt,video.ja,ja)}</p>
    {featured && (playing ? <div className="hm-iframe-wrap">
      <iframe src={'https://www.youtube-nocookie.com/embed/'+video.id+'?rel=0'} title={video.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
    </div> : <button className="hm-media-play" type="button" onClick={()=>setPlaying(true)}>
      <span className="hm-play-triangle" aria-hidden="true">▶</span><span>{copy('Load official video','公式動画を読み込む',ja)}</span>
      <small>{copy('Only loads YouTube after you choose to watch.','操作したときだけ YouTube を読み込みます。',ja)}</small>
    </button>)}
    <a href={'https://www.youtube.com/watch?v='+video.id} target="_blank" rel="noopener noreferrer">{copy('Open original on YouTube','YouTubeで公式動画を見る',ja)}</a>
  </article>
}

function Study({ja,onPractice}) {
  const jump = id => document.getElementById('hm-'+id)?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  return <div className="hm-study">
    <nav className="hm-contents" aria-label={copy('Chapter sections','章の目次',ja)}><p className="hm-micro">{copy('IN THIS CHAPTER','この章の内容',ja)}</p><div>
      {clusters.map(([id,n,en,jp])=><button key={id} type="button" onClick={()=>jump(id)}><span>{n}</span>{copy(en,jp,ja)}</button>)}
    </div></nav>
    <section id="hm-start" className="hm-section">
      <p className="hm-kicker">01 / START HERE</p><h2>{copy('A sentence can mean more than it says.','言葉どおりとは限らない',ja)}</h2>
      <p>{copy('When a friend says “You’re practically early” after you arrive late, they may mean the opposite of the literal words. The joke depends on your shared experience.','遅れて来た友達に「ほとんど早いね」と言うと、実際には「また遅れたね」という意味になることがあります。二人が事情を知っているからこそ成立します。',ja)}</p>
      <Dialogue scene={scenes[0]} ja={ja}/>
      <div className="hm-concept"><strong>{copy('Humor is not a vocabulary category.','ユーモアは単語の種類ではありません。',ja)}</strong><p>{copy('It is something people find amusing: sometimes surprise, contradiction, a familiar mistake, or clever wording. Banter is the playful exchange between people—not a contest for the fastest comeback.','ユーモアは意外な展開、言葉と現実のずれ、身近な失敗などから生まれます。Banter は会話で冗談をやり取りすること。早い返しを競うものではありません。',ja)}</p></div>
      <p>{copy('Ask: What happened? What was said? What do these people already know? What attitude might the speaker be showing? If you cannot tell, uncertainty is a valid answer.','考える順番は「何が起きた？」「何と言った？」「二人は何を知っている？」「どんな気持ちを表している？」です。わからないときは、無理に決めつけなくて大丈夫です。',ja)}</p>
    </section>
    <section id="hm-moves" className="hm-section">
      <p className="hm-kicker">02 / RECOGNIZE THE PATTERN</p><h2>{copy('Seven ways playful English works','よく見られる7つの仕組み',ja)}</h2><p>{copy('The point is to notice the mismatch, not memorize seven joke recipes.','７種類を暗記するより、「言葉と現実のどこがずれているか」に注目しましょう。',ja)}</p>
      <div className="hm-move-grid">{moves.map((item,i)=><article key={item.id} className="hm-move"><span className="hm-index">{String(i+1).padStart(2,'0')}</span><h3>{copy(item.en,item.ja,ja)}</h3><p className="hm-micro">{item.context}</p><p className="hm-quote" lang="en">“{item.line}”</p><p>{copy(item.explain,item.explainJa,ja)}</p></article>)}</div>
      <p className="hm-note">{copy('Other forms include deadpan (straight-faced delivery), parody (comic imitation), satire (criticism through humor), absurdity and physical comedy. These categories overlap.','ほかにも真顔で言う deadpan、まねる parody、社会を批評する satire、ナンセンス、動きによる笑いなどがあります。境界ははっきり分かれません。',ja)}</p>
    </section>
    <section id="hm-banter" className="hm-section">
      <p className="hm-kicker">03 / BACK-AND-FORTH</p><h2>{copy('Banter is a two-person game.','Banter は二人で作る会話',ja)}</h2>
      <Dialogue scene={scenes[1]} ja={ja}/>
      <p>{copy('You can acknowledge a joke, extend it, answer sincerely, or decline. All can be good communication. You do not owe anyone a punchline.','冗談を受ける、続ける、普通に答える、参加しない。どれも自然な選択肢です。面白い返しをしなければならないわけではありません。',ja)}</p>
      <div className="hm-expressions">{usefulPhrases.map(([phrase,translation],i)=><div key={i}><strong lang="en">{phrase}</strong><span lang="ja">{translation}</span></div>)}</div>
      <p className="hm-note">{copy('These are optional useful responses, not automatic “copy and say” instructions. Meaning depends on relationship and tone.','表現は状況に合わせて選びます。音や人間関係によって印象が変わります。',ja)}</p>
    </section>
    <section id="hm-judgment" className="hm-section">
      <p className="hm-kicker">04 / READ THE ROOM</p><h2>{copy('Timing matters. Judgment matters more.','間も大切。でも相手への配慮はもっと大切。',ja)}</h2>
      <div className="hm-timeline"><div><small>SETUP</small><strong>I spent an hour planning dinner.</strong></div><div className="hm-beat"><small>BEAT</small><strong>…</strong></div><div><small>REVEAL</small><strong>I burned the toast.</strong></div></div>
      <p>{copy('A brief pause lets the listener form an expectation before the reveal. But there is no universal pause length that makes something funny. Speak clearly rather than quickly.','短い間があると、聞き手は結末を予想できます。ただし、必ず面白くなる「正しい間」はありません。早口よりも伝わる速さが大切です。',ja)}</p>
      <div className="hm-safety"><article><strong>{copy('Usually lower risk','比較的リスクが低い',ja)}</strong><p>{copy('A harmless mistake you made, a shared inconvenience, an obviously imaginary exaggeration.','自分の小さな失敗、共通の不便、明らかに大げさな架空の話。',ja)}</p></article><article><strong>{copy('Be especially careful','特に注意する',ja)}</strong><p>{copy('Body, accent, money, identity, personal problems, a public mistake, or someone with less power than you.','体、アクセント、お金、個人的な問題、人前での失敗、立場の弱い相手。',ja)}</p></article></div>
      <Dialogue scene={scenes[2]} ja={ja}/>
      <p className="hm-note">{copy('“I was just joking” does not erase hurt. A useful repair is: “Sorry. That came out wrong.” If you miss a reference, ask: “Wait, what’s the joke?”','「冗談のつもりだった」だけでは相手の気持ちは消えません。「ごめん、言い方がよくなかった」と訂正できます。内輪ネタが不明なら「どういう冗談？」と聞いても大丈夫です。',ja)}</p>
    </section>
    <section id="hm-online" className="hm-section">
      <p className="hm-kicker">05 / ONLINE ENGLISH</p><h2>{copy('Texts and memes carry invisible context.','メッセージとミームの文脈を読む',ja)}</h2>
      <p>{copy('Text has no audible tone. “Great job” can be genuine praise or sarcasm; the situation matters. A meme often compresses an attitude into a familiar visual format.','文字には声の調子がありません。“Great job” がほめ言葉なのか皮肉なのかは、背景によって変わります。ミームでは、画像と短い文で気持ちを共有します。',ja)}</p>
      <div className="hm-chat-grid">{chats.map(c=><Chat key={c.id} data={c} ja={ja}/>)}</div>
      <h3 className="hm-subheading">{copy('Read the logic, not just the meme','ミームの形ではなく意味を読む',ja)}</h3>
      <div className="hm-meme-grid">{memes.map(m=><Meme key={m.id} data={m} ja={ja}/>)}</div>
      <p className="hm-note">{copy('Original Artico diagrams explain familiar meme patterns without copying copyrighted comic panels, Pokémon characters or stock photographs.','ここでは著作権のある漫画・キャラクター・写真をコピーせず、Artico独自の図で仕組みを説明しています。',ja)}</p>
    </section>
    <section id="hm-watch" className="hm-section">
      <p className="hm-kicker">06 / REAL ENGLISH</p><h2>{copy('Watch the moment, not just the joke.','冗談だけでなく、場面を見る',ja)}</h2><p>{copy('First enjoy the clip. Then notice the relationship, expectation, surprise, pause or response. Entertainment is scripted to amuse an audience; do not treat every character as a role model.','まず動画を楽しんでから、人間関係、予想、意外な展開、間、反応を観察します。コメディの人物の態度を、そのまま日常でまねる必要はありません。',ja)}</p>
      <div className="hm-video-grid">{videos.map((v,i)=><Media key={v.id} video={v} ja={ja} featured={i<2}/>)}</div>
      <div className="hm-study-end"><h3>{copy('Ready to try it?','練習してみましょう',ja)}</h3><p>{copy('Start with a few situations. The goal is understanding and judgment, not being the funniest person in the room.','最初は少数の場面から始めます。目標は「面白い人になる」ことではなく、理解し、適切に返すことです。',ja)}</p><button type="button" className="hm-primary" onClick={onPractice}>{copy('Go to Practice','練習へ進む',ja)} <span aria-hidden="true">→</span></button></div>
    </section>
  </div>
}
function readProgress(value) {
  try {
    const raw=JSON.parse(value||'{}')
    if(!raw||typeof raw!=='object'||Array.isArray(raw)) return {}
    return { attempts: typeof raw.attempts==='object'&&raw.attempts ? raw.attempts:{}, mode: typeof raw.mode==='string'?raw.mode:'starter', index:Number.isInteger(raw.index)?raw.index:0, branches:typeof raw.branches==='object'&&raw.branches?raw.branches:{} }
  } catch { return {} }
}
function Practice({ja,learning,update}) {
  const stored = useMemo(()=>readProgress(learning.responses?.[progressKey]),[learning.responses])
  const [mode,setMode]=useState(stored.mode||'starter')
  const [index,setIndex]=useState(stored.index||0)
  const [picked,setPicked]=useState(null)
  const [checked,setChecked]=useState(false)
  const [branchId,setBranchId]=useState(branches[0].id)
  const [branchPick,setBranchPick]=useState(null)
  const [opened,setOpened]=useState(false)
  const [view,setView]=useState('quiz')
  const setStore = (patch) => update(previous => {
    const current=readProgress(previous.responses?.[progressKey])
    return { ...previous, responses:{ ...previous.responses, [progressKey]:JSON.stringify({...current,...patch}) } }
  })
  const ids = mode==='starter' ? starterIds : mode==='all' ? exercises.map(x=>x.id) : exercises.filter(x=>x.category===mode).map(x=>x.id)
  const list = ids.map(id=>exercises.find(x=>x.id===id)).filter(Boolean)
  const done = index>=list.length
  const item = list[Math.min(index,list.length-1)]
  const chooseMode=(next)=>{setMode(next);setIndex(0);setPicked(null);setChecked(false);setStore({mode:next,index:0})}
  const check=()=>{
    if(picked===null)return
    setChecked(true)
    setStore({attempts:{...(stored.attempts||{}),[item.id]:{choice:picked,correct:picked===item.correct}}})
  }
  const next=()=>{const i=index+1;setIndex(i);setPicked(null);setChecked(false);setStore({index:i})}
  const restart=()=>{setIndex(0);setPicked(null);setChecked(false);setStore({index:0})}
  const activeBranch=branches.find(b=>b.id===branchId)||branches[0]
  const notes=(learning.responses||{})
  const saveNotes=(i,value)=>{const id='application-humor-'+i;update(prev=>({...prev,responses:{...prev.responses,[id]:value}}))}
  return <div className="hm-practice">
    <div className="hm-practice-tabs" role="group" aria-label={copy('Practice type','練習の種類',ja)}>
      <button type="button" aria-pressed={view==='quiz'} onClick={()=>setView('quiz')}>{copy('Situations','場面の練習',ja)}</button>
      <button type="button" aria-pressed={view==='branches'} onClick={()=>setView('branches')}>{copy('Conversations','会話',ja)}</button>
      <button type="button" aria-pressed={view==='open'} onClick={()=>setView('open')}>{copy('Your words','自分の言葉',ja)}</button>
    </div>
    {view==='quiz' && <>
      <header className="hm-practice-heading"><p className="hm-kicker">NOTICE / INTERPRET / RESPOND</p><h2>{copy('Read the moment. Choose what fits.','場面を読んで、合う答えを選ぼう。',ja)}</h2><p>{copy('These are language decisions, not a test of whether you are funny. You can change an answer before checking.','面白さを採点するテストではありません。確認する前なら答えを変えられます。',ja)}</p></header>
      <div className="hm-sessions" aria-label={copy('Choose a practice set','練習内容を選ぶ',ja)}>
        <button type="button" aria-pressed={mode==='starter'} onClick={()=>chooseMode('starter')}>{copy('Short set · 8','短い練習 · 8問',ja)}</button>
        {categories.map(([key,en,jp])=><button key={key} type="button" aria-pressed={mode===key} onClick={()=>chooseMode(key)}>{copy(en,jp,ja)}</button>)}
        <button type="button" aria-pressed={mode==='all'} onClick={()=>chooseMode('all')}>{copy('All 28','全28問',ja)}</button>
      </div>
      {done ? <section className="hm-complete" aria-live="polite"><p className="hm-kicker">SET COMPLETE</p><h3>{copy('You have seen every situation in this set.','このセットの練習が終わりました。',ja)}</h3><p>{copy('Understanding is not the same as memorizing a punchline. You can repeat the set or try another kind of situation.','冗談の意味を理解することと、セリフを暗記することは別です。もう一度練習することも、別の場面に進むこともできます。',ja)}</p><button type="button" className="hm-primary" onClick={restart}>{copy('Repeat this set','もう一度練習する',ja)}</button></section> : <section className="hm-question" key={item.id}>
        <div className="hm-question-meta"><span>{copy(item.category.toUpperCase(),item.categoryJa,ja)}</span><span>{index+1} / {list.length}</span></div>
        <div className="hm-progress-track" aria-hidden="true"><span style={{width:(index/list.length*100)+'%'}}/></div>
        <div className="hm-prompt"><p className="hm-micro">THE SITUATION</p><p lang="en">{item.scene}</p></div>
        <h3 lang="en">{item.question}</h3>
        <fieldset className="hm-options" disabled={checked}><legend className="hm-sr-only">{item.question}</legend>
          {item.options.map((option,i)=><label key={i} className={'hm-option'+(picked===i?' is-picked':'')+(checked&&i===item.correct?' is-supported':'')}>
            <input type="radio" name={item.id} value={i} checked={picked===i} onChange={()=>setPicked(i)}/><span className="hm-choice-letter">{String.fromCharCode(65+i)}</span><span lang="en">{option}</span>
          </label>)}
        </fieldset>
        {checked && <div className="hm-feedback" role="status"><strong>{picked===item.correct ? copy('A supported reading','この場面に合う読み方です',ja) : copy('Consider the context','場面をもう一度考えましょう',ja)}</strong><p>{copy(item.why,item.whyJa,ja)}</p><p className="hm-feedback-clarity">{copy('Most likely or best default—not a claim that all people react the same way.','ここでの答えは、最も自然と思われる解釈です。すべての人に当てはまるわけではありません。',ja)}</p></div>}
        <div className="hm-actions">{checked ? <button type="button" className="hm-primary" onClick={next}>{index===list.length-1?copy('Finish set','終了',ja):copy('Next situation','次の場面',ja)} <span aria-hidden="true">→</span></button> : <button type="button" className="hm-primary" disabled={picked===null} onClick={check}>{copy('Check answer','答えを確認',ja)}</button>}
          <button type="button" className="hm-secondary" onClick={()=>setOpened(v=>!v)} aria-expanded={opened}>{copy('How to think about it','考え方のヒント',ja)}</button>
        </div>
        {opened&&<p className="hm-note">{copy('Ask what actually happened, which words stand out, and what the speakers know about each other. A sentence by itself often is not enough.','何が起きたか、どの言葉が不自然か、二人は何を知っているかを考えてみましょう。',ja)}</p>}
      </section>}
      {mode==='delivery'&&<p className="hm-note">{copy('These are text-based adaptations. Original reviewed recordings will be needed to train actual voice and timing recognition.','この4問は文字版です。声や間を聞き分ける練習には、確認済みのオリジナル音声が必要です。',ja)}</p>}
    </>}
    {view==='branches' && <div className="hm-branch-wrap"><p className="hm-kicker">TRY A CONVERSATION</p><h2>{copy('Different replies change the moment.','返し方で会話が変わる',ja)}</h2><p>{copy('Some situations have more than one good response. Choose what you would do, then see how the other person might continue.','自然な返しは一つではありません。自分ならどうするかを選び、会話の続きを見ましょう。',ja)}</p>
      <div className="hm-branch-picker">{branches.map((b,i)=><button key={b.id} type="button" aria-pressed={b.id===branchId} onClick={()=>{setBranchId(b.id);setBranchPick(null)}}>{String(i+1).padStart(2,'0')} · {copy(b.name,b.ja,ja)}</button>)}</div>
      <article className="hm-branch"><p className="hm-micro">{activeBranch.scene}</p><blockquote lang="en">“{activeBranch.line}”</blockquote><h3>{copy('What would you say?','どう返しますか？',ja)}</h3>
        {activeBranch.choices.map((c,i)=><button className={'hm-branch-choice'+(branchPick===i?' is-picked':'')} key={i} onClick={()=>setBranchPick(i)} type="button">{c[0]}</button>)}
        {branchPick!==null && <div className="hm-branch-feedback" role="status"><p className="hm-micro">WHAT MIGHT HAPPEN</p><p lang="en">“{activeBranch.choices[branchPick][1]}”</p><p>{copy(activeBranch.choices[branchPick][2],activeBranch.choices[branchPick][3],ja)}</p><button type="button" className="hm-secondary" onClick={()=>setBranchPick(null)}>{copy('Try another reply','別の返しを試す',ja)}</button></div>}
      </article>
    </div>}
    {view==='open'&&<div className="hm-open"><p className="hm-kicker">MAKE IT YOURS</p><h2>{copy('Your words, your judgment.','自分の言葉で考えよう',ja)}</h2><p>{copy('Speak first if you like. Notes are optional. There is no automatic “funniness” score.','まず声に出しても構いません。メモは任意です。面白さの自動採点はありません。',ja)}</p>
      {writingPrompts.map((p,i)=><article className="hm-open-task" key={p.id}><span className="hm-index">0{i+1}</span><h3>{copy(p.title,p.ja,ja)}</h3><p>{copy(p.prompt,p.promptJa,ja)}</p><details><summary>{copy('See a possible example','例を見る',ja)}</summary><p lang="en">{p.example}</p></details><label htmlFor={'hm-write-'+i}>{copy('Your notes (optional)','あなたのメモ（任意）',ja)}</label><textarea id={'hm-write-'+i} rows={3} maxLength={1800} value={notes['application-humor-'+i]||''} onChange={e=>saveNotes(i,e.target.value)} placeholder={copy('Try a response in your own words…','自分の言葉で書いてみましょう…',ja)} /></article>)}
      <p className="hm-note">{copy('Notes are kept in your existing device-only Artico learning data. They are not sent for AI scoring.','メモは既存のArticoの端末内データとして保存されます。AI採点には送信されません。',ja)}</p>
    </div>}
  </div>
}

export default function HumorLesson({route,learning,update}) {
  const {language}=useLanguage()
  const ja=language==='ja'
  const practice=route.view==='practice'
  const navigation=getLessonNavigation(route)
  return <div className="aw-page hm-page">
    <header className="hm-header"><p className="hm-eyebrow">SOCIAL FLUENCY / CHAPTER 34</p><div className="hm-heading"><CurriculumIcon name="smile" size={30}/><h1 lang="en">Humor &amp; Banter</h1></div>
      {ja && <p className="hm-ja" lang="ja">ユーモア・軽い冗談</p>}
      <p>{copy('Recognize the joke, understand the moment, choose your response.','冗談を理解し、場面に合った返し方を選ぶ。',ja)}</p>
    </header>
    <nav className="hm-mode" aria-label={copy('Lesson mode','レッスンモード',ja)}>
      <a href="#/lesson/34/study" aria-current={!practice?'page':undefined}>{copy('Study','学ぶ',ja)}</a>
      <a href="#/lesson/34/practice" aria-current={practice?'page':undefined}>{copy('Practice','練習',ja)}</a>
    </nav>
    {practice?<Practice ja={ja} learning={learning} update={update}/>:<Study ja={ja} onPractice={()=>{window.location.hash='#/lesson/34/practice'}}/>}
    <nav className="hm-footer" aria-label={copy('Chapter navigation','章を移動',ja)}>
      <a href={'#'+navigation.previous}>← {copy('Previous chapter','前の章',ja)}</a>
      <a href={'#'+navigation.next}>{copy('Next chapter','次の章',ja)} →</a>
    </nav>
  </div>
}
