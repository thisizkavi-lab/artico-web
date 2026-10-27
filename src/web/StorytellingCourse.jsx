import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { storytellingLessons as lessons, storytellingUnits as units } from './storytellingContent'
import './storytelling.css'

const prefix = '/application/storytelling'
const keyFor = (field, id) => 'application-storytelling-' + field + (id ? '-' + id : '')
const pathFor = (id, mode = 'study') => prefix + '/' + id + '/' + mode

const labels = {
  en: {
    back: 'Back to Application', subtitle: 'Notice how stories work. Find the English. Tell your own.', start: 'Start the course',
    resume: 'Continue where you left off', practiced: 'lessons practiced', overview: 'Course overview',
    study: 'Study', practice: 'Practice', sample: 'A story to experience', structure: 'Look beneath the story',
    lesson: 'What to notice', language: 'Useful English', caution: 'Keep in mind', try: 'Your turn',
    words: 'Read or say the story in your own words. Do not memorize it.', comprehension: 'Check your understanding',
    rebuild: 'Rebuild the example', rebuildHelp: 'Put these three parts into their original order. Use the arrows to move them.',
    correct: 'That order matches the example.', reorder: 'Not yet. Compare with the story and try again.',
    anchor: 'Three story anchors', anchorHelp: 'These are memory cues, not a script. Try retelling the example without rereading every line.',
    show: 'Show the anchors', hide: 'Hide the anchors', yourStory: 'Tell a story of your own',
    yourStoryHint: 'Speak naturally, or write your version. These questions are optional prompts, not a required formula.',
    outline: 'Your notes (optional)', placeholder: 'A few keywords or a short draft are enough …',
    record: 'Record your telling', stopRecord: 'Stop recording', recordHelp: 'Recordings stay in this browser session and are not uploaded. Leaving this lesson discards the recording.',
    recordUnsupported: 'Recording is unavailable in this browser or microphone access was denied. You can still practice by speaking aloud or writing.',
    listen: 'Listen to the sample', listenPreview: 'Device voice preview · pronunciation varies by browser',
    voiceUnavailable: 'Device voice playback is unavailable here. Read the story instead.',
    stopAudio: 'Stop playback', reflection: 'Reflect and retell', reflectionHelp: 'Change one specific thing, then tell the story again. Do not add detail just to make it longer.',
    retry: 'What changed in your second telling? (optional)', retryPlaceholder: 'For example: I made the order clearer, or I removed a distracting detail.',
    ask: 'Things to check', check1: 'Could someone follow my sequence of events?',
    check2: 'Did I choose details that helped?', check3: 'Did I use English I would actually say?',
    self: 'I tried telling or writing my version', done: 'Mark as practiced', doneAlready: 'Practiced ✓',
    success: 'Practice recorded for this lesson. Return anytime to improve it.',
    honest: 'This records practice, not mastery. No automatic score is assigned to a personal story.',
    note: 'Written notes are saved only on this device. Avoid sensitive personal details.',
    previous: 'Previous lesson', next: 'Next lesson', all: 'All units', course: 'Storytelling', selected: 'Selected answer',
    chosen: 'Why', showModel: 'Look at the model again', before: 'First telling', after: 'Second telling / improvement notes',
  },
  ja: {
    back: '実践へ戻る', subtitle: 'ストーリーの仕組みを理解し、英語表現を学び、自分の話を語る。', start: '最初から学ぶ',
    resume: '前回の続きから', practiced: 'レッスン練習済み', overview: 'コース一覧',
    study: '学ぶ', practice: '練習', sample: '実際のストーリーを読む', structure: '話の組み立てを見る',
    lesson: 'ここがポイント', language: '使える英語', caution: '気をつけること', try: 'やってみよう',
    words: '全文を暗記せず、自分の言葉で語り直しましょう。', comprehension: '理解を確認する',
    rebuild: '話の順番を組み立てる', rebuildHelp: '三つの部分を元の順番に並べましょう。矢印で移動できます。',
    correct: '元の話と同じ順番です。', reorder: 'まだ違います。元の話を確認して再挑戦しましょう。',
    anchor: '三つの手がかり', anchorHelp: '暗記用の原稿ではなく、記憶の目印です。全文を読まずに語りましょう。',
    show: '手がかりを見る', hide: '手がかりを隠す', yourStory: '自分の話を語る',
    yourStoryHint: '自然に話すか、文章を書いてみましょう。質問はヒントであり、決まった型ではありません。',
    outline: '自分のメモ（任意）', placeholder: 'キーワードや短い下書きで十分です…',
    record: '録音する', stopRecord: '録音を終了', recordHelp: '録音はこのブラウザで一時的に再生するだけで、アップロードされません。ページ移動で破棄されます。',
    recordUnsupported: 'このブラウザでは録音できないか、マイクの許可がありません。声に出すか書いて練習できます。',
    listen: '例を聞く', listenPreview: '端末の音声プレビュー · 読み方はブラウザによります',
    voiceUnavailable: 'この端末では音声を再生できません。文章を読んでください。',
    stopAudio: '再生停止', reflection: '振り返って、もう一度', reflectionHelp: '直したい点を一つ選んで語り直します。長くすることが目的ではありません。',
    retry: '二度目は何を変えましたか？（任意）', retryPlaceholder: '例：順番を分かりやすくした、不要な描写を減らした。',
    ask: '振り返るポイント', check1: '出来事の順番が分かるか？', check2: '必要な細部を選べたか？',
    check3: '自分が実際に使う自然な英語か？', self: '話すか書く練習をした',
    done: '練習済みにする', doneAlready: '練習済み ✓', success: '練習を記録しました。いつでも語り直せます。',
    honest: 'これは練習記録であり、習得度の点数ではありません。自由なストーリーを自動採点しません。',
    note: '文章メモはこの端末にのみ保存されます。個人情報を書かないでください。',
    previous: '前のレッスン', next: '次のレッスン', all: 'すべてのユニット', course: 'Storytelling',
    selected: '選んだ答え', chosen: '理由', showModel: '例をもう一度見る', before: '一度目の話',
    after: '二度目の話・改善メモ',
  }
}

function useAudioRecording(lessonId) {
  const recorder = useRef(null)
  const stream = useRef(null)
  const chunks = useRef([])
  const urlRef = useRef('')
  const [url, setUrl] = useState('')
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState(false)

  const release = () => {
    if (stream.current) stream.current.getTracks().forEach(track => track.stop())
    stream.current = null
  }
  const clear = () => {
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.onstop = null
      recorder.current.stop()
    }
    recorder.current = null
    release()
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = ''
    chunks.current = []
  }
  useEffect(() => {
    setUrl('')
    setError(false)
    setRecording(false)
    return () => clear()
  }, [lessonId])

  const toggle = async () => {
    if (recorder.current?.state === 'recording') {
      recorder.current.stop()
      setRecording(false)
      release()
      return
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError(true)
      return
    }
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.current = media
      chunks.current = []
      const next = new MediaRecorder(media)
      recorder.current = next
      next.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data) }
      next.onstop = () => {
        if (chunks.current.length) {
          if (urlRef.current) URL.revokeObjectURL(urlRef.current)
          urlRef.current = URL.createObjectURL(new Blob(chunks.current, { type: next.mimeType || 'audio/webm' }))
          setUrl(urlRef.current)
        }
        release()
      }
      next.onerror = () => { setError(true); setRecording(false); release() }
      next.start()
      setError(false)
      setRecording(true)
    } catch {
      release()
      setRecording(false)
      setError(true)
    }
  }
  return { url, recording, error, toggle }
}

function ModelAudio({ text, t }) {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [text])
  const play = () => {
    if (!('speechSynthesis' in window)) { setFailed(true); return }
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => { setPlaying(false); setFailed(true) }
    window.speechSynthesis.speak(utterance)
    setPlaying(true)
  }
  return <div className="st-audio"><button type="button" className="st-secondary" onClick={play}>{playing ? '■ ' + t.stopAudio : '▶ ' + t.listen}</button><span>{failed ? t.voiceUnavailable : t.listenPreview}</span></div>
}

function CourseOverview({ t, ja, responses }) {
  const [opened, setOpened] = useState('01')
  const complete = lessons.filter(l => responses[keyFor('done',l.id)] === '1').length
  const last = responses[keyFor('location')]
  const lastLesson = lessons.find(l => l.id === last)
  return <div className="aw-page st-page">
    <a className="ap-back" href="#/application">← {t.back}</a>
    <header className="st-hero">
      <p className="ap-eyebrow">ARTICO / APPLICATION</p>
      <h1>Storytelling</h1>
      <p>{t.subtitle}</p>
      <div className="st-actions"><a className="st-primary" href={'#'+pathFor('01')}>{t.start} <span aria-hidden="true">→</span></a>
        {lastLesson && <a className="st-secondary" href={'#'+pathFor(lastLesson.id,'practice')}>{t.resume}</a>}</div>
      <p className="st-meta">{complete} / {lessons.length} {t.practiced}</p>
    </header>
    <div className="st-map">{units.map((u,index) => {
      const group = lessons.filter(l=>l.unit===u.id)
      const done = group.filter(l=>responses[keyFor('done',l.id)]==='1').length
      return <section key={u.id} className="st-unit">
        <button type="button" className="st-unit-heading" aria-expanded={opened===u.id} aria-controls={'st-unit-'+u.id} onClick={()=>setOpened(opened===u.id?'':u.id)}>
          <span className="st-unit-number">{String(index+1).padStart(2,'0')}</span>
          <span className="st-unit-text"><strong>{ja?u.ja:u.title}</strong><small>{ja?u.jaDescription:u.description}</small></span>
          <span className="st-unit-progress">{done}/{group.length}</span>
          <span className="st-chevron" aria-hidden="true">{opened===u.id?'−':'+'}</span>
        </button>
        <div id={'st-unit-'+u.id} hidden={opened!==u.id} className="st-unit-lessons">
          {group.map(l=><a key={l.id} className="st-lesson-link" href={'#'+pathFor(l.id)}>
            <span className={'st-dot'+(responses[keyFor('done',l.id)]==='1'?' is-done':'')} aria-hidden="true"/>
            <span><strong>{l.id} · {ja?l.jaTitle:l.title}</strong><small>{ja?l.jaGoal:l.goal}</small></span><span className="st-chevron" aria-hidden="true">›</span>
          </a>)}
        </div>
      </section>
    })}</div>
  </div>
}

function Comprehension({ lesson, responses, update, t, ja }) {
  const key = keyFor('choice',lesson.id)
  const picked = responses[key] === undefined ? null : Number(responses[key])
  const choose = index => update(prev=>({...prev,responses:{...prev.responses,[key]:String(index)}}))
  return <section className="st-task">
    <p className="st-eyebrow">01 / {t.comprehension}</p>
    <h2>{lesson.check.q}</h2>
    <div className="st-choices">{lesson.check.options.map((option,index)=><button type="button"
      className={'st-choice'+(picked===index?' is-picked':'')} aria-pressed={picked===index}
      key={option} onClick={()=>choose(index)}><span>{index===0?'A':'B'}</span>{option}</button>)}</div>
    {picked!==null&&<p className="st-answer" role="status"><strong>{picked===lesson.check.correct?'✓ ':'↺ '}</strong>{ja?lesson.check.jaWhy:lesson.check.why}</p>}
  </section>
}

function StoryAnchors({ lesson, t, ja }) {
  const reorderable = lesson.unit === '01' || lesson.unit === '02' || lesson.id === '13'
  const [order, setOrder] = useState([1,0,2])
  const [show, setShow] = useState(false)
  const shift = (at,delta) => setOrder(old => {
    const next=[...old], to=at+delta
    if (to<0||to>=next.length) return old
    ;[next[at],next[to]]=[next[to],next[at]]
    return next
  })
  return <section className="st-task">
    <p className="st-eyebrow">02 / {reorderable?t.rebuild:t.anchor}</p>
    <p className="st-helper">{reorderable?t.rebuildHelp:t.anchorHelp}</p>
    {reorderable ? <>
      <div className="st-order">{order.map((beatIndex,pos)=><div className="st-order-item" key={beatIndex}>
        <span className="st-order-index">{pos+1}</span><span className="st-order-label">{ja?lesson.beats[beatIndex][3]:lesson.beats[beatIndex][2]}</span>
        <div className="st-arrows"><button type="button" onClick={()=>shift(pos,-1)} disabled={pos===0} aria-label={'Move part '+(pos+1)+' up'}>↑</button><button type="button" onClick={()=>shift(pos,1)} disabled={pos===2} aria-label={'Move part '+(pos+1)+' down'}>↓</button></div>
      </div>)}</div>
      <p className={'st-order-feedback'+(order.every((x,i)=>x===i)?' is-correct':'')}>{order.every((x,i)=>x===i)?t.correct:t.reorder}</p>
    </> : <>
      <button type="button" className="st-secondary" aria-expanded={show} onClick={()=>setShow(v=>!v)}>{show?t.hide:t.show} {show?'−':'+'}</button>
      {show&&<ol className="st-cues">{lesson.beats.map((beat,i)=><li key={i}><strong>{ja?beat[1]:beat[0]}</strong><span>{ja?beat[3]:beat[2]}</span></li>)}</ol>}
    </>}
  </section>
}

function LessonView({ lesson, mode, ja, t, learning, update }) {
  const responses = learning.responses || {}
  const notesKey = keyFor('note',lesson.id)
  const retryKey = keyFor('retry',lesson.id)
  const doneKey = keyFor('done',lesson.id)
  const draft = responses[notesKey] || ''
  const retry = responses[retryKey] || ''
  const done = responses[doneKey] === '1'
  const index = lessons.findIndex(l=>l.id===lesson.id)
  const unit = units.find(u=>u.id===lesson.unit)
  const [showStructure,setShowStructure] = useState(true)
  const [tried,setTried] = useState(done)
  const [selfChecks,setSelfChecks] = useState([false,false,false])
  const recording = useAudioRecording(lesson.id)
  const edit = (key,value) => update(prev=>({...prev,responses:{...prev.responses,[key]:value.slice(0,4900),[keyFor('location')]:lesson.id}}))
  const mark = () => update(prev=>({...prev,responses:{...prev.responses,[doneKey]:'1',[keyFor('location')]:lesson.id}}))
  useEffect(()=> {
    update(prev => prev.responses?.[keyFor('location')]===lesson.id?prev:{...prev,responses:{...prev.responses,[keyFor('location')]:lesson.id}})
  },[lesson.id,update])
  return <div className="aw-page st-page">
    <nav className="st-breadcrumb" aria-label="Course position">
      <a href={'#'+prefix}>← {t.overview}</a><span>/</span><span>{ja?unit.ja:unit.title}</span><span>/</span><span>{lesson.id}</span>
    </nav>
    <div className="st-layout">
      <aside className="st-side" aria-label={t.all}>
        <p className="st-side-label">{t.all}</p>
        {units.map(u=><div key={u.id}>
          <a className={'st-side-unit'+(u.id===unit.id?' is-active':'')} href={'#'+pathFor(lessons.find(l=>l.unit===u.id).id)}>{u.id}. {ja?u.ja:u.title}</a>
          {u.id===unit.id&&<div className="st-side-lessons">{lessons.filter(l=>l.unit===u.id).map(l=><a key={l.id}
            className={'st-side-lesson'+(l.id===lesson.id?' is-current':'')} href={'#'+pathFor(l.id)}>{responses[keyFor('done',l.id)]==='1'?'✓ ':''}{l.id} {ja?l.jaTitle:l.title}</a>)}</div>}
        </div>)}
      </aside>
      <div className="st-main">
        <p className="ap-eyebrow">{ja?'ユニット':'UNIT'} {lesson.unit} / 05 · {lesson.id} / 15</p>
        <h1>{ja?lesson.jaTitle:lesson.title}</h1>
        <p className="st-goal">{ja?lesson.jaGoal:lesson.goal}</p>
        <nav className="st-tabs" aria-label="Learning mode">
          <a href={'#'+pathFor(lesson.id,'study')} aria-current={mode==='study'?'page':undefined}>{t.study}</a>
          <a href={'#'+pathFor(lesson.id,'practice')} aria-current={mode==='practice'?'page':undefined}>{t.practice}{done?' ✓':''}</a>
        </nav>
        {mode==='study'?<div className="st-flow">
          <section>
            <p className="st-eyebrow">01 / {t.sample}</p>
            <div className="st-story" lang="en"><p>{lesson.story}</p></div>
            {ja&&<p lang="ja" className="st-ja-context">{lesson.sceneJa}</p>}
            <ModelAudio text={lesson.story} t={t}/>
          </section>
          <section>
            <button type="button" className="st-disclosure" onClick={()=>setShowStructure(v=>!v)} aria-expanded={showStructure}>
              <span>{t.structure}</span><span aria-hidden="true">{showStructure?'−':'+'}</span>
            </button>
            {showStructure&&<div className="st-beats">{lesson.beats.map((beat,i)=><div className="st-beat" key={i}>
              <span className="st-beat-index">{String(i+1).padStart(2,'0')}</span>
              <div><h3>{ja?beat[1]:beat[0]}</h3><p>{ja?beat[3]:beat[2]}</p></div>
            </div>)}</div>}
          </section>
          <section className="st-principle">
            <p className="st-eyebrow">02 / {t.lesson}</p>
            <p>{ja?lesson.principleJa:lesson.principle}</p>
          </section>
          <section>
            <p className="st-eyebrow">03 / {t.language}</p>
            <ul className="st-expressions">{lesson.language.map(line=><li lang="en" key={line}>{line}</li>)}</ul>
          </section>
          <aside className="st-caution"><strong>{t.caution}</strong><p>{ja?lesson.watchJa:lesson.watch}</p></aside>
          <a className="st-primary st-cta" href={'#'+pathFor(lesson.id,'practice')}>{t.practice} <span aria-hidden="true">→</span></a>
        </div>:<div className="st-flow">
          <Comprehension lesson={lesson} responses={responses} update={update} t={t} ja={ja}/>
          <StoryAnchors key={lesson.id} lesson={lesson} t={t} ja={ja}/>
          <section className="st-task">
            <p className="st-eyebrow">03 / {t.yourStory}</p>
            <h2>{ja?lesson.taskJa:lesson.task}</h2>
            <p className="st-helper">{t.yourStoryHint}</p>
            <ul className="st-guides">{lesson.cues.map((c,i)=><li key={i}>{c}</li>)}</ul>
            <label className="st-field-label" htmlFor="st-draft">{t.outline}</label>
            <textarea id="st-draft" rows={5} maxLength={4900} value={draft} onChange={e=>edit(notesKey,e.target.value)} placeholder={t.placeholder}/>
            <div className="st-record-box"><button type="button" className="st-secondary" onClick={recording.toggle} aria-pressed={recording.recording}>
              {recording.recording?'■ '+t.stopRecord:'● '+t.record}</button>
              {recording.url&&<audio controls src={recording.url} aria-label={ja?'自分の録音を再生':'Replay your telling'}/>}
              <p>{recording.error?t.recordUnsupported:t.recordHelp}</p>
            </div>
          </section>
          <section className="st-task">
            <p className="st-eyebrow">04 / {t.reflection}</p>
            <h2>{t.reflection}</h2><p className="st-helper">{t.reflectionHelp}</p>
            <div className="st-reflection">{[t.check1,t.check2,t.check3].map((v,i)=><label key={i}><input type="checkbox" checked={selfChecks[i]} onChange={e=>setSelfChecks(old=>old.map((x,j)=>i===j?e.target.checked:x))}/><span>{v}</span></label>)}</div>
            <label className="st-field-label" htmlFor="st-retry">{t.retry}</label>
            <textarea id="st-retry" rows={3} maxLength={4900} value={retry} onChange={e=>edit(retryKey,e.target.value)} placeholder={t.retryPlaceholder}/>
            <label className="st-attest"><input type="checkbox" checked={tried} onChange={e=>setTried(e.target.checked)}/><span>{t.self}</span></label>
            <button type="button" className="st-primary st-cta" disabled={!tried || done} onClick={mark}>{done?t.doneAlready:t.done} {!done&&'→'}</button>
            {done&&<p className="st-success" role="status">✓ {t.success}</p>}
            <p className="st-small">{t.honest} {t.note}</p>
            <details className="st-model"><summary>{t.showModel}</summary><p lang="en">{lesson.story}</p></details>
          </section>
        </div>}
        <nav className="st-footer" aria-label="Lesson navigation">
          <a className="st-secondary" href={'#'+(index>0?pathFor(lessons[index-1].id):prefix)}>← {index>0?t.previous:t.overview}</a>
          <a className="st-secondary" href={'#'+(index<lessons.length-1?pathFor(lessons[index+1].id):prefix)}>{index<lessons.length-1?t.next:t.overview} →</a>
        </nav>
      </div>
    </div>
  </div>
}

export default function StorytellingCourse({ route, learning, update }) {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const t = labels[ja?'ja':'en']
  const lesson = useMemo(()=>lessons.find(l=>l.id===route.lesson),[route.lesson])
  if (!lesson) return <CourseOverview ja={ja} t={t} responses={learning.responses||{}} />
  return <LessonView key={lesson.id} lesson={lesson} mode={route.mode==='practice'?'practice':'study'} ja={ja} t={t} learning={learning} update={update}/>
}
