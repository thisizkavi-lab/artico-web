import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from './Language'
import { academicStages, academicLessons, academicGuidedActivities, riverbend, getAcademicLesson } from './academicCourseData'
import { academicJapanese } from './academicCourseJa'
import { readAcademicDraft, saveAcademicDraft, downloadAcademicDraft } from './academicDrafts'
import './jobs-course.css'
import './academic-course.css'

const repoKey = (kind, id) => 'application-academic-' + kind + (id ? '-' + id : '')
const text = {
  en: {
    back:'Back to Application', title:'Academic & Research Writing',
    intro:'Read research with care. Learn how scholarly arguments work. Write and revise your own academic English.',
    begin:'Start from the beginning', resume:'Resume your lesson', overview:'Course overview',
    stages:'Course stages', study:'Study', practice:'Practice',
    idea:'Understand the idea', worked:'Worked example', phrases:'Useful academic English',
    caution:'A common mistake', dossier:'Fictional research case', dataset:'The data',
    task:'Your writing task', output:'Write in your own words', checklist:'Review your work',
    review:'Compare with a model response', hide:'Hide model response', model:'One possible response',
    completed:'Practice marked complete', mark:'Mark practice complete', refine:'Keep revising',
    prev:'Previous lesson', next:'Next lesson', home:'Back to stages',
    attempt:'Write your response before comparing it with an example.',
    checkItems:'Before marking complete, review all three criteria.',
    empty:'Write a response to complete this practice.',
    words:'words', saved:'Draft saved on this device', unsaved:'Local storage is unavailable. Copy or export your draft before leaving.',
    export:'Export draft', done:'practised', count:'lessons practised',
    guide:'Guided check', guidedWhy:'Why this matters', tryCheck:'Check order',
    moveUp:'Move up', moveDown:'Move down', correct:'Correct', retry:'Not quite. Try another order.',
    nextStep:'Go to practice', note:'Course progress records practice, not an externally assessed writing score.',
    never:'The case is invented and is not a real research publication.',
    auto:'Your writing stays on this browser unless you export it. Do not enter confidential research data.',
    outline:'Stage outcome', reviewed:'I reviewed this criterion', nextLesson:'Continue to next lesson',
    first:'Start this stage', nothing:'No lesson selected', out:'See course overview',
    noMatch:'No matching lesson. Return to the course overview.',
    progress:'Progress', canUse:'You can read lessons and practice in any order.',
    write:'Write here. Use evidence, not memorized formulas.',
    before:'You can revise your answer even after marking practice complete.'
  },
  ja: {
    back:'Applicationに戻る',title:'Academic & Research Writing',
    intro:'研究を正確に読み、根拠のある議論を理解し、自分の学術文章を書いて推敲する。',
    begin:'最初から始める',resume:'続きから学ぶ',overview:'コース一覧',
    stages:'学習ステージ',study:'学ぶ',practice:'練習',
    idea:'基本的な考え方',worked:'具体例',phrases:'使える学術英語',
    caution:'注意する点',dossier:'架空の研究ケース',dataset:'データ',
    task:'ライティング課題',output:'自分の言葉で書く',checklist:'自分の文章を確認',
    review:'回答例と比較する',hide:'回答例を閉じる',model:'回答例の一つ',
    completed:'練習済み',mark:'練習済みにする',refine:'編集を続ける',
    prev:'前のレッスン',next:'次のレッスン',home:'ステージに戻る',
    attempt:'まず自分で書いてから回答例を確認しましょう。',
    checkItems:'完了前に３つの観点を確認してください。',
    empty:'回答を入力してから完了してください。',
    words:'語',saved:'下書きはこの端末に保存されます',unsaved:'保存できません。移動する前に文章をコピーまたは書き出してください。',
    export:'下書きを書き出す',done:'練習済み',count:'レッスン練習済み',
    guide:'理解度チェック',guidedWhy:'解説',tryCheck:'順序を確認',
    moveUp:'上へ',moveDown:'下へ',correct:'正解',retry:'まだ違います。順序を変えてみましょう。',
    nextStep:'練習してみる',note:'進捗は練習の記録であり、文章能力の採点ではありません。',
    never:'この研究は学習用の架空の例で、実在する論文ではありません。',
    auto:'文章は書き出さない限り、このブラウザに保存されます。機密研究データを入力しないでください。',
    outline:'ステージの成果物',reviewed:'この項目を確認した',nextLesson:'次のレッスンへ',
    first:'このステージを始める',nothing:'レッスンが選択されていません',out:'コース一覧を見る',
    noMatch:'レッスンが見つかりません。コース一覧に戻ってください。',
    progress:'進捗',canUse:'どのレッスンからでも学習できます。',
    write:'自分の言葉で書きましょう。定型文の暗記ではなく、根拠を大切にします。',
    before:'練習済みにしても、文章は何度でも編集できます。'
  }
}
const countWords = value => value.trim() ? value.trim().split(/\s+/u).length : 0

function GuidedCheck({ item, locale }) {
  const [answer, setAnswer] = useState(null)
  const [items, setItems] = useState(item.kind === 'order' ? item.items.map((label,index)=>({label,index})) : [])
  const [checked, setChecked] = useState(false)
  const ja = locale === 'ja'
  const t = text[locale]
  const move = (from, direction) => {
    const to = from + direction
    if (to < 0 || to >= items.length) return
    setItems(previous => {
      const next = [...previous]
      const tmp = next[from]; next[from] = next[to]; next[to] = tmp
      return next
    })
    setChecked(false)
  }
  const correct = item.kind === 'order' && items.every((part,i) => part.index === item.correct[i])
  return <section className="ac-guided" aria-label={t.guide}>
    <p className="jc-kicker">{t.guide}</p>
    <h3>{item.question}</h3>
    {item.kind === 'choice' ?
      <div className="ac-guided-options">{item.options.map((option,i)=>
        <button key={i} type="button" onClick={()=>setAnswer(i)}
          aria-pressed={answer === i} className={'ac-option' + (answer === i ? ' is-picked' : '')}>
          <span className="ac-option-number">{String.fromCharCode(65+i)}</span>{option}
        </button>)}</div> :
      <div className="ac-sort" role="list" aria-label={item.question}>{items.map((part,i)=>
        <div role="listitem" className="ac-sort-row" key={part.index}>
          <span className="ac-sort-index">{i+1}.</span><span className="ac-sort-label">{part.label}</span>
          <div className="ac-sort-actions">
            <button type="button" aria-label={t.moveUp+': '+part.label} disabled={i===0} onClick={()=>move(i,-1)}>↑</button>
            <button type="button" aria-label={t.moveDown+': '+part.label} disabled={i===items.length-1} onClick={()=>move(i,1)}>↓</button>
          </div>
        </div>)}
        <button type="button" className="jc-secondary ac-check-order" onClick={()=>setChecked(true)}>{t.tryCheck}</button>
      </div>
    }
    {(answer !== null || checked) && <div role="status" className="ac-check-feedback">
      <strong>{(item.kind==='choice' ? answer === item.correct : correct) ? '✓ '+t.correct : t.retry}</strong>
      <p>{t.guidedWhy}: {item.why}</p>
    </div>}
    {ja && <p className="ac-guide-note" lang="ja">選択や順序を確認したら、下の文章作成にも挑戦しましょう。</p>}
  </section>
}

function FictionalCase({ t }) {
  const [open,setOpen] = useState(false)
  return <section className="ac-case">
    <button type="button" className="ac-case-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}>
      <span><span className="ac-case-kicker">{t.dossier}</span><strong>{riverbend.name}</strong></span>
      <span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    {open && <div className="ac-case-body">
      <p>{riverbend.background}</p>
      <div className="ac-dataset" aria-label={t.dataset}>
        <div><strong>Checklist class</strong><span>29 / 40</span><strong>72.5%</strong></div>
        <div><strong>Comparison class</strong><span>24 / 40</span><strong>60%</strong></div>
      </div>
      <p><strong>Interpretation:</strong> {riverbend.result}</p>
      <p><strong>Limitation:</strong> {riverbend.limitation}</p>
      <small>{riverbend.disclaimer}</small>
    </div>}
  </section>
}

export default function AcademicCourse({ learning, update }) {
  const { language } = useLanguage()
  const locale = language === 'ja' ? 'ja' : 'en'
  const ja = locale === 'ja'
  const t = text[locale]
  const responses = learning.responses || {}
  const storedLocation = responses[repoKey('location')]
  const [active,setActive] = useState(() => getAcademicLesson(storedLocation)?.id || null)
  const [mode,setMode] = useState('study')
  const [opened,setOpened] = useState('01')
  const [draft,setDraft] = useState(() => active ? readAcademicDraft(window.localStorage,active) : '')
  const [stored,setStored] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [review,setReview] = useState([false,false,false])
  const [warning,setWarning] = useState('')
  const current = active ? getAcademicLesson(active) : null
  const stage = current ? academicStages.find(s=>s.id===current.stage) : null
  const guided = current && academicGuidedActivities[current.id]
  const completed = useMemo(()=>academicLessons.filter(l=>responses[repoKey('done',l.id)]==='1').length,[responses])
  const setResponse = (key,value) => update(prev=>({...prev,responses:{...prev.responses,[key]:value}}))
  const focus = () => {
    const pane = document.querySelector('.aw-main') || document.querySelector('main')
    if(pane && pane.scrollTo) pane.scrollTo({top:0,behavior:'instant'})
  }
  const select = (id,tab='study') => {
    if(!getAcademicLesson(id)) return
    setActive(id);setMode(tab);setOpened(id.split('.')[0])
    setDraft(readAcademicDraft(window.localStorage,id))
    setStored(true);setShowModel(false);setReview([false,false,false]);setWarning('')
    setResponse(repoKey('location'),id);focus()
  }
  const home = () => {
    setActive(null);setWarning('');setResponse(repoKey('location'),'');focus()
  }
  const edit = value => {
    const limited=value.slice(0,16000)
    setDraft(limited)
    setStored(saveAcademicDraft(window.localStorage,active,limited))
    if(warning) setWarning('')
  }
  const finish = () => {
    if (!draft.trim()) {setWarning(t.empty);return}
    if (review.some(value=>!value)) {setWarning(t.checkItems);return}
    setWarning('')
    setResponse(repoKey('done',active),'1')
  }
  const navigateTab = tab => {setMode(tab);setWarning('');focus()}
  const index=academicLessons.findIndex(l=>l.id===active)
  const currentJa=academicJapanese[active] || null

  useEffect(()=>{document.title=current ? current.title+' · Artico' : 'Academic & Research Writing · Artico'},[current])
  if(!current)return <div className="aw-page jc-page ac-page">
    <a className="ap-back" href="#/application">← {t.back}</a>
    <header className="jc-hero ac-hero">
      <p className="ap-eyebrow">ARTICO / APPLICATION</p>
      <h1>{t.title}</h1>
      <p>{t.intro}</p>
      <div className="jc-hero-actions">
        <button type="button" className="jc-primary" onClick={()=>select(academicLessons[0].id)}>{t.begin} <span aria-hidden="true">→</span></button>
        {storedLocation && getAcademicLesson(storedLocation) && <button type="button" className="jc-secondary" onClick={()=>select(storedLocation)}>{t.resume}</button>}
      </div>
      <p className="jc-meta">{completed} / {academicLessons.length} {t.count} · {t.canUse}</p>
    </header>
    <div className="ac-overview-heading"><h2>{t.stages}</h2><span>{academicStages.length} {ja?'ステージ':'stages'}</span></div>
    <div className="jc-course-map">
      {academicStages.map(s=>{
        const ls=academicLessons.filter(l=>l.stage===s.id)
        const count=ls.filter(l=>responses[repoKey('done',l.id)]==='1').length
        return <section key={s.id} className="jc-stage">
          <button type="button" className="jc-stage-top" aria-expanded={opened===s.id} onClick={()=>setOpened(opened===s.id?'':s.id)}>
            <span className="jc-stage-index">{s.id}</span>
            <span className="jc-stage-copy"><strong>{s.title}</strong>
              {ja && <small className="ac-ja-name" lang="ja">{s.ja}</small>}
              <small>{ja?s.jaPromise:s.promise}</small>
            </span><span className="jc-stage-count">{count}/{ls.length}</span><span className="jc-chevron">{opened===s.id?'−':'+'}</span>
          </button>
          {opened===s.id && <div className="jc-stage-detail">
            {ls.map(l=><button type="button" className="jc-lesson-row" key={l.id} onClick={()=>select(l.id)}>
              <span className={'jc-mini-dot '+(responses[repoKey('done',l.id)]==='1'?'is-done':'')}/>
              <span><strong>{l.id} · {l.title}</strong>{ja && <small lang="ja">{l.ja}</small>}<small>{l.question}</small></span><span aria-hidden="true">›</span>
            </button>)}
            <div className="jc-workbook"><span>{t.outline}</span><strong>{s.artifact}</strong><p>{s.promise}</p></div>
          </div>}
        </section>
      })}
    </div>
    <p className="ac-course-fine">{t.note}</p>
  </div>

  return <div className="aw-page jc-page ac-page">
    <nav className="jc-crumb" aria-label={ja?'現在の学習位置':'Course position'}>
      <button type="button" onClick={home}>← {t.overview}</button><span>/</span>
      <span>{ja?stage.ja:stage.title}</span><span>/</span><span>{current.id}</span>
    </nav>
    <div className="jc-layout">
      <aside className="jc-sidebar" aria-label={t.stages}>
        <p className="jc-side-label">{t.stages}</p>
        {academicStages.map(s=><div key={s.id}>
          <button type="button" onClick={()=>select(academicLessons.find(l=>l.stage===s.id).id)}
            className={'jc-side-unit '+(s.id===stage.id?'is-active':'')}>
            {s.id}. {ja?s.ja:s.title}</button>
          {stage.id===s.id && <div className="jc-side-lessons">
            {academicLessons.filter(l=>l.stage===s.id).map(l=><button type="button"
              key={l.id} onClick={()=>select(l.id)} aria-current={l.id===active?'page':undefined}
              className={'jc-side-lesson '+(active===l.id?'is-current':'')}>
              {responses[repoKey('done',l.id)]==='1'?'✓ ':''}{l.id} {ja?l.ja:l.title}
            </button>)}
          </div>}
        </div>)}
      </aside>
      <div className="jc-main ac-main">
        <p className="ap-eyebrow">{ja?'ステージ':'STAGE'} {stage.id} / 06 · {current.id}</p>
        <h1>{current.title}</h1>
        {ja && <p lang="ja" className="ac-lesson-ja">{current.ja}</p>}
        <p className="jc-question">{current.question}</p>
        <div className="jc-switch" role="group" aria-label={ja?'学習モード':'Learning mode'}>
          <button type="button" aria-pressed={mode==='study'} className={mode==='study'?'is-active':''} onClick={()=>navigateTab('study')}>{t.study}</button>
          <button type="button" aria-pressed={mode==='practice'} className={mode==='practice'?'is-active':''} onClick={()=>navigateTab('practice')}>
            {t.practice} {responses[repoKey('done',active)]==='1'?'✓':''}
          </button>
        </div>
        {mode==='study'?<div className="jc-reading">
          <section className="jc-section">
            <h2>{t.idea}</h2>
            {ja && currentJa && <p lang="ja" className="jc-ja-summary">{currentJa.summary}</p>}
            <p>{current.idea}</p>
          </section>
          <section className="jc-example"><p className="jc-kicker">{t.worked}</p><p className="jc-preline">{current.example}</p></section>
          <section className="jc-phrase"><div><p className="jc-kicker">{t.phrases}</p><strong lang="en">{current.language}</strong></div></section>
          <section className="jc-caution"><strong>{t.caution}</strong><p>{current.caution}</p></section>
          <FictionalCase t={t}/>
          <button type="button" className="jc-primary jc-wide" onClick={()=>navigateTab('practice')}>{t.nextStep} →</button>
        </div>:<div className="jc-reading">
          <FictionalCase t={t}/>
          {guided && <GuidedCheck key={current.id} item={guided} locale={locale}/>}
          <section className="jc-section">
            <h2>{t.task}</h2>
            {ja && currentJa?.task && <p lang="ja" className="jc-ja-summary">{currentJa.task}</p>}
            <p>{current.task}</p>
            <p className="jc-small">{t.never}</p>
          </section>
          <label className="jc-answer-label" htmlFor="ac-draft">{t.output}</label>
          <textarea id="ac-draft" className="jc-answer ac-answer" rows={11} value={draft}
            onChange={e=>edit(e.target.value)} placeholder={t.write} maxLength={16000}/>
          <div className="ac-draft-tools">
            <span role="status" className={stored?'':'ac-storage-error'}>{stored?t.saved:t.unsaved}</span>
            <span>{countWords(draft)} {t.words}</span>
            <button type="button" className="jc-plain" onClick={()=>downloadAcademicDraft(current,draft)} disabled={!draft.trim()}>{t.export}</button>
          </div>
          <section className="ac-criteria"><h3>{t.checklist}</h3>
            {current.criteria.map((criterion,i)=><label key={i} className="ac-criterion">
              <input type="checkbox" checked={review[i]} onChange={e=>setReview(previous=>previous.map((v,j)=>i===j?e.target.checked:v))}/>
              <span>{criterion}</span>
            </label>)}
          </section>
          <section className="jc-feedback">
            <button type="button" className="jc-plain" onClick={()=>setShowModel(!showModel)} disabled={!draft.trim()}>
              {showModel?t.hide:t.review} {showModel?'−':'+'}
            </button>
            {!draft.trim() && <p className="jc-small">{t.attempt}</p>}
            {showModel && <div><p className="jc-kicker">{t.model}</p><p className="jc-preline">{current.model}</p>
              <p className="jc-small">{t.before}</p></div>}
          </section>
          {warning && <p className="jc-warning" role="alert">{warning}</p>}
          <button type="button" className="jc-primary jc-wide" onClick={finish}>
            {responses[repoKey('done',active)]==='1'?'✓ '+t.completed:t.mark}
          </button>
          <p className="jc-small">{t.note} {t.auto}</p>
        </div>}
        <div className="jc-footer">
          <button type="button" className="jc-secondary" onClick={()=>index>0?select(academicLessons[index-1].id):home()}>
            ← {index>0?t.prev:t.home}
          </button>
          {index<academicLessons.length-1?
            <button type="button" className="jc-secondary" onClick={()=>select(academicLessons[index+1].id)}>{t.next} →</button>:
            <button type="button" className="jc-secondary" onClick={home}>{t.home} →</button>}
        </div>
      </div>
    </div>
  </div>
}
