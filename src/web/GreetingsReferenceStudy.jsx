import { useCallback, useEffect, useRef, useState } from 'react'
import './GreetingsReferenceStudy.css'
import { approvedAudio } from './components'
import { useLanguage } from './Language'

// Chapter 01 study artwork follows the approved five-page Artico reference.
// Seven original transparent Chapter 01 greeting illustrations.
const VOICE_RATE = 0.91

/* Japanese supports meaning and register; spoken English stays dominant. */
const jpPhrase = {
  'Hi.':'こんにちは／やあ', 'Hello.':'こんにちは', 'Hey.':'やあ／ねえ',
  'Good morning.':'おはようございます／おはよう', 'Morning.':'おはよう（くだけた形）',
  'Good afternoon.':'こんにちは（午後のあいさつ）',
  'Good evening.':'こんばんは（会ったとき）', 'Good night.':'おやすみ／お先に失礼します（別れるとき）',
  'Hi, everyone.':'みなさん、こんにちは', 'Hello, everyone.':'みなさん、こんにちは',
  'Good morning, everyone.':'みなさん、おはようございます',
  'Good evening, everyone.':'みなさん、こんばんは',
  'How are you?':'お元気ですか？／調子はどう？',
  'How are you doing?':'最近どう？／元気にしてる？',
  "How's it going?":'調子どう？／最近どう？（くだけた言い方）',
  'Good, thanks.':'元気だよ、ありがとう', 'Fine, thanks.':'元気です、ありがとう',
  'Pretty good.':'けっこういい感じ', 'Not bad.':'悪くないよ（たいてい前向き）',
  "I'm okay.":'大丈夫だよ／まあまあだよ',
  'Not great.':'あまりよくない', 'How about you?':'あなたはどう？',
  'You?':'そっちは？',
  'Good to see you.':'また会えてうれしいよ',
  "It's been a while.":'久しぶりだね',
  'How have you been?':'（会っていなかった間）どうしてた？',
  "How've you been?":'（会っていなかった間）どうしてた？（短縮形）',
  "I've been good.":'ずっと元気にしてたよ',
  "I've been okay.":'まあまあだったよ',
  "What's up?":'どうした？／最近どう？（とてもくだけた言い方）',
  'Not much.':'特に変わりないよ／別に何も',
  'Yo.':'よっ！（ごく親しい間柄で）',
}
const jpContext = {
  'Hi.':'親しみやすく、友人から職場まで幅広く使える自然なあいさつ。',
  'Hello.':'中立的で幅広く使える。声の調子によっては Hi より少し丁寧に聞こえる。',
  'Hey.':'親しい人へのくだけたあいさつ。呼びかけにもなるので声の調子に注意。',
  'Good morning.':'朝、会話を始めるときや、朝のあいさつへの返事に使う。',
  'Morning.':'Good morning の短い形。親しい相手や同僚との会話で自然。',
  'Good afternoon.':'午後に会ったときのあいさつ。Hi よりやや改まった響きもある。',
  'Good evening.':'夕方から夜、人に会ったときのあいさつ。別れ際は通常 Good night。',
  'Good night.':'夜の別れ際や寝る前の表現。会話を始めるときには通常使わない。',
  'Hi, everyone.':'友人・同僚・クラスメートなど、集まった人たちに親しみやすくあいさつする。',
  'Hello, everyone.':'集団に向けた中立的なあいさつ。',
  'Good morning, everyone.':'朝、集まった人たちにあいさつするときに使う。',
  'Good evening, everyone.':'夕方・夜の集まりを始めるときに使える。',
  'Good to see you.':'以前から知っている人と再会して、うれしさを伝える。',
  "It's been a while.":'最後に会ったり連絡したりしてから時間がたったことを伝える。',
  'How have you been?':'今この瞬間だけでなく、前回会ってからの期間について尋ねる。',
  "How've you been?":'How have you been? の自然な短縮形。意味は同じ。',
  "I've been good.":'前回会ってから、だいたい元気に過ごしていたという返事。',
  "I've been okay.":'前回会ってから、まあまあ過ごしていたという控えめな返事。',
  "What's up?":'友達への軽いあいさつにも、「何かあった？」という本当の質問にもなる。',
  'Not much.':'What’s up? への自然な返答。「特に新しいことはない」という意味で、気分が悪いわけではない。',
  'Yo.':'ごくくだけたあいさつ・呼びかけ。友人同士でも全員が使う言い方ではない。',
}
const jpCheckinContext = {
  'How are you?':'最も幅広く使える定番の質問。短い社交的なあいさつにも、本気で様子を尋ねる質問にもなる。',
  'How are you doing?':'How are you? に近いが、少し会話的で温かい響き。親しみを出したいときにも自然。',
  "How's it going?":'「物事はどう進んでいる？」に近い感覚の、よりくだけた近況確認。友人や同僚とよく使う。',
  'Good, thanks.':'短く明るい肯定的な返事。幅広い場面で自然。',
  'Fine, thanks.':'落ち着いた丁寧な返事。声の調子によっては少し事務的にも聞こえる。',
  'Pretty good.':'「けっこう調子がいい」。強い絶好調ではなく、気軽な前向きの返事。',
  'Not bad.':'直訳は「悪くない」だが、会話では「まずまずいいよ」という前向きな返事が多い。',
  "I'm okay.":'「大丈夫」「まあまあ」の両方になり得る。言い方や状況で、安心させる返事にも控えめな返事にもなる。',
  'Not great.':'調子があまりよくないことを正直に短く伝える。',
  'How about you?':'自分の返事の後で、相手にも同じことを尋ねる。',
  'You?':'同じ質問を短く相手に返す。前の文脈が明らかなときに自然。',
}
const jpCheckinLabels = {
  '1. Ask how someone is doing':'1. 相手の調子を尋ねる',
  '2. Positive and everyday replies':'2. 前向きな日常の返事',
  '3. Neutral or honest replies when things are difficult':'3. 中立的な返事・調子が悪いときの返事',
  '4. Return the question':'4. 相手に質問を返す',
  'Add after your answer':'自分の返事の後に続ける',
}
const noteEveryday = {
  en:'Hi is friendly and works in most situations. Hello is neutral and can feel slightly more formal. Hey is more casual, especially with people you know.',
  ja:'Hi は親しみやすく幅広い場面で使えます。Hello は中立的で少し丁寧に響くこともあります。Hey はもっとくだけた言い方で、親しい相手に向いています。',
}
const noteTime = {
  en:'Good evening is for meeting someone in the evening. Good night is usually for leaving or going to bed—not for starting a conversation.',
  ja:'Good evening は夕方・夜に会ったときのあいさつ。Good night は夜に別れるときや寝る前に使います。通常、会話の始まりには使いません。',
}
const noteReunion = {
  en:'Good to see you is for someone you already know. Nice to meet you is usually for a first meeting. You will practise introductions in Chapter 02.',
  ja:'Good to see you はすでに知っている人と再会したとき。Nice to meet you は初対面の人に使うのが普通です。自己紹介は Chapter 02 で学びます。',
}


function Speaker({ name }) {
  return <span className={'ar-avatar ' + (name === 'Casey' ? 'ar-casey' : '')}>{name === 'Casey' ? 'C' : 'A'}</span>
}

const SCENE_ASSETS = {
  people: 'everyday.png',
  time: 'time.png',
  morning: 'morning.png',
  group: 'group.png',
  reunion: 'reunion.png',
  apart: 'apart.png',
  friendly: 'friendly.png',
}
function PeopleScene({ kind = 'people', compact = false }) {
  return (
    <div className={'ar-scene ar-illustrated-scene ar-scene-' + kind + (compact ? ' ar-compact' : '')}>
      <img
        className="ar-scene-illustration"
        src={`${import.meta.env.BASE_URL}assets/greetings/${SCENE_ASSETS[kind] || SCENE_ASSETS.people}`}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function PlaySymbol({ full = false }) {
  return full ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>
    : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a5 5 0 0 1 0 6"/><path d="M18 6a9 9 0 0 1 0 12"/></svg>
}

function Conversation({ title, titleJa, lines, scene = 'people', note, compact = false, play }) {
  const { language } = useLanguage()
  return <article className={'ar-card ar-conversation' + (compact ? ' ar-compact-conversation' : '')}>
    <div className="ar-conversation-heading">
      <p className="ar-overline">{title}{language === 'ja' && titleJa && <small lang="ja">{titleJa}</small>}</p>
    </div>
    <div className="ar-conversation-content">
      <PeopleScene kind={scene} compact={compact}/>
      <div className="ar-dialogue">
        <button type="button" className="ar-play" onClick={() => play(lines.map(l=>l.text))} aria-label={'Play '+title}><PlaySymbol full/></button>
        <div className="ar-turns">
          {lines.map((line,i)=><div className={'ar-turn'+(line.who === 'Casey'?' ar-right':'')} key={i}>
            <Speaker name={line.who}/>
            <div className="ar-line-body"><small>{line.who}</small><span className="ar-dialogue-bubble" lang="en">{line.text}</span>{language === 'ja' && line.ja && <small className="ar-translation" lang="ja">{line.ja}</small>}</div>
          </div>)}
        </div>
        {note && <aside className="ar-note ar-conversation-note"><strong>Note</strong>{language === 'ja' ? note.ja : note.en}</aside>}
      </div>
    </div>
  </article>
}

function SectionHead({ index, title, titleJa, description, descriptionJa }) {
  const { language } = useLanguage()
  return <header className="ar-section-heading">
    <h2 id={"ar-head-"+Number(index)}><span>{index}</span> {title}</h2>
    {language === 'ja' && titleJa && <small className="ar-section-ja" lang="ja">{titleJa}</small>}
    <p>{language === 'ja' && descriptionJa ? descriptionJa : description}</p>
  </header>
}

function PhraseShelf({ title, titleJa, options, scene = 'people', initial = 0, captions = false, note, play }) {
  const { language } = useLanguage()
  const [selected, setSelected] = useState(initial)
  const option = options[selected] || options[0]
  return <article className="ar-card ar-phrase-shelf">
    <PeopleScene kind={scene}/>
    <div className="ar-shelf-body">
      <div className="ar-shelf-heading"><h3>{title}{language === 'ja' && titleJa && <small lang="ja">{titleJa}</small>}</h3>{captions && <span>{options.length} expressions</span>}</div>
      <div className="ar-speech-choices">
        {options.map((item,i)=><button key={item.text} type="button" className={'ar-speech' + (selected===i?' ar-selected':'')} aria-pressed={selected===i} onClick={()=>{setSelected(i);play(item.text)}}>
          <span className="ar-choice-content"><span lang="en">{item.text}</span>{language === 'ja' && jpPhrase[item.text] && <small lang="ja">{jpPhrase[item.text]}</small>}</span><PlaySymbol/><span className="ar-tail" aria-hidden="true"/>
        </button>)}
      </div>
      <div className="ar-context" aria-live="polite">{language === 'ja' ? jpContext[option.text] || option.description : option.description}</div>
      {note && <aside className="ar-note ar-shelf-note"><strong>Note</strong>{language === 'ja' ? note.ja : note.en}</aside>}
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
  const { language } = useLanguage()
  return <div className={'ar-flow-group ar-flow-'+color}>
    {labels && <p className="ar-overline">{title}</p>}
    {options.map((item,i)=><div key={item.text}>
      {item.label && <p className="ar-flow-label">{language === 'ja' ? jpCheckinLabels[item.label] || item.label : item.label}{item.extra && <span>{language === 'ja' ? jpCheckinLabels[item.extra] || item.extra : item.extra}</span>}</p>}
      <button className={'ar-flow-choice'+(selected===item.text?' ar-on':'')} type="button" onClick={()=>{onSelect(item.text);play(item.text)}} aria-pressed={selected===item.text}><span className="ar-choice-content"><span lang="en">{item.text}</span>{language === 'ja' && <small lang="ja">{jpPhrase[item.text]}</small>}</span><PlaySymbol/></button>
    </div>)}
  </div>
}

function CheckInFlow({ play }) {
  const { language } = useLanguage()
  const [selected, setSelected]=useState("I'm okay.")
  const [selectedAsk, setSelectedAsk]=useState("How are you?")
  const [selectedReturn, setSelectedReturn]=useState("How about you?")
  const descriptions = {
    'How are you?':'A neutral, common way to ask how someone is doing.',
    'How are you doing?':'A warmer, more conversational everyday check-in.',
    "How's it going?":'A more casual check-in, often about how things are going.',
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
    <div className="ar-flow-header"><p className="ar-overline">{language === 'ja' ? '短い近況確認の会話を作る' : 'BUILD A SHORT CHECK-IN'}</p><button className="ar-play" type="button" onClick={()=>play([selectedAsk,selected,selectedReturn])} aria-label="Play your check-in"><PlaySymbol full/></button></div>
    <div className="ar-flow-layout">
      <div className="ar-flow-question-side">
        <div className="ar-flow-avatar"><Speaker name="Alex"/><b>Alex</b></div>
        <div className="ar-flow-question-stack">
          <FlowGroup color="blue" options={ask} selected={selectedAsk} onSelect={setSelectedAsk} play={play}/>
          <aside className="ar-note ar-question-note"><strong>Note</strong>{language === 'ja' ? 'How are you? は幅広く使える定番。How are you doing? は少し温かく会話的。How’s it going? はさらにくだけた近況確認です。どれも短いあいさつにも本当の質問にもなります。' : 'How are you? is the broad standard. How are you doing? sounds warmer and conversational. How’s it going? is more casual. All three can be quick greetings or genuine questions.'}</aside>
        </div>
      </div>
      <div className="ar-flow-arrow">↓</div>
      <div className="ar-flow-reply-side">
        <div className="ar-flow-response"><div className="ar-flow-stacked"><FlowGroup color="coral" options={[...answer,...neutral]} selected={selected} onSelect={setSelected} play={play}/><FlowGroup color="coral" options={back} selected={selectedReturn} onSelect={setSelectedReturn} play={play}/></div><div className="ar-flow-avatar"><b>Casey</b><Speaker name="Casey"/></div></div>
        <aside className="ar-note ar-honest"><strong>Note</strong>{language === 'ja' ? 'いつも「元気」と答える必要はありません。Not bad は多くの場合、前向きな返事です。I’m okay は「大丈夫」とも「まあまあ」とも受け取れます。Not great は正直に調子の悪さを伝えます。詳しい事情を話す必要はありません。' : 'You do not have to say everything is good. These replies are not a fixed scale of emotions. Not bad is usually positive; I’m okay depends on tone. Not great can be an honest short answer. You do not have to share private details.'}</aside>
      </div>
    </div>
    <div className="ar-context ar-flow-context" aria-live="polite"><strong>{language === 'ja' ? '選択中' : 'SELECTED'} · {selected}</strong> {language === 'ja' ? jpCheckinContext[selected] : descriptions[selected]}</div>
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
      <SectionHead index="01" title="Start the conversation" titleJa="会話を始める" description={'Most conversations begin with something small: a greeting. It is a simple way to acknowledge someone and open the door to a conversation. Sometimes, all you need is a friendly “Hi.” Greetings can change depending on who you are talking to and when you meet.'} descriptionJa="会話は、小さなあいさつから始まることがよくあります。相手の存在を認めて、話し始めるきっかけを作る言葉です。Hi だけで十分なこともあります。相手との関係や時間帯によって表現を選びます。"/>
      <PhraseShelf title="Everyday greetings" titleJa="日常のあいさつ" options={shelfEveryday} note={noteEveryday} play={play}/>
      <PhraseShelf title="Greetings throughout the day" titleJa="時間帯に合わせたあいさつ" options={shelfTime} scene="time" note={noteTime} play={play}/>
      <Conversation title="A MORNING GREETING" titleJa="朝のあいさつ" scene="morning" lines={[{who:'Alex',text:'Good morning.',ja:'おはようございます。'},{who:'Casey',text:'Morning.',ja:'おはよう。（短い返事）'}]} note={{en:'Morning is a shortened morning greeting. You can also answer with the full Good morning.',ja:'Morning は Good morning の短い形です。相手に Good morning と返しても自然です。'}} play={play}/>
      <PhraseShelf title="Greeting a group" titleJa="複数の人へのあいさつ" options={shelfGroup} scene="group" play={play}/>
    </section>
    <section id="study-check-in" className="ar-section" aria-labelledby="ar-head-2">
      <SectionHead index="02" title="Check in and answer" titleJa="調子を尋ねて答える" description={'“How are you?”, “How are you doing?”, and “How’s it going?” can be short social check-ins or genuine questions about someone’s situation. What happens next helps show the intention.'} descriptionJa="How are you?、How are you doing?、How’s it going? は、軽いあいさつにも、相手の様子を本当に尋ねる質問にもなります。言葉そのものだけでなく、その後の会話や声の調子が意図を示します。"/>
      <CheckInFlow play={play}/>
    </section>
    <section id="study-reunion" className="ar-section" aria-labelledby="ar-head-3">
      <SectionHead index="03" title="Meet again" titleJa="久しぶりに会う" description={'“Good to see you” expresses pleasure at seeing someone again. “It’s been a while” acknowledges time apart, and “How have you been?” asks about the period since your earlier contact. Learn it as a single usable phrase—you do not need to explain present-perfect grammar to use it.'} descriptionJa="Good to see you は再会のうれしさ、It’s been a while は会わなかった時間を表します。How have you been? は「前回から今までどうしていた？」という質問です。まずは一つの使える表現として覚えましょう。"/>
      <PhraseShelf title="Seeing someone again" titleJa="再会を喜ぶ" scene="reunion" options={shelfReunion} note={noteReunion} play={play}/>
      <PhraseShelf title="Ask about the time apart" titleJa="会わなかった間について尋ねる" scene="apart" options={shelfApart} play={play}/>
    </section>
    <section id="study-casual" className="ar-section" aria-labelledby="ar-head-4">
      <SectionHead index="04" title="Optional: Casual choices" titleJa="追加：くだけた表現" description={'With friends and close peers, “What’s up?” can work as an informal greeting or as a real question about what is happening.'} descriptionJa="友達や親しい同年代の相手には、What’s up? を軽いあいさつとして使えます。状況によっては、本当に「どうしたの？」と尋ねる意味にもなります。"/>
      <PhraseShelf title="Casual greetings and replies" titleJa="くだけたあいさつと返事" scene="friendly" options={shelfCasual} note={{en:'Not much means there is little new to report, not that you feel bad. Yo is very informal, varies by social group, and is not suitable for every setting.',ja:'Not much は「特に変わりない」という返事で、「気分が悪い」という意味ではありません。Yo はごくくだけた言い方で、使う人や場面が限られます。'}} play={play}/>
    </section>
  </div>
}
