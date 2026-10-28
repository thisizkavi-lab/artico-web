import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { selectReviewQueue } from './reviewEngine'
import { listReviewItems, submitReview, suspendReviewItem } from './reviewStore'
import './review.css'

export default function Review() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [working, setWorking] = useState(false)
  const busy = useRef(false)

  const reload = async () => {
    const records = await listReviewItems()
    setItems(records)
  }
  useEffect(() => {
    let active = true
    listReviewItems().then((records) => { if (active) setItems(records) })
      .catch((reason) => { if (active) setError(reason.message) })
    return () => { active = false }
  }, [])
  const queue = useMemo(() => selectReviewQueue(items ?? [], new Date()), [items])
  const current = queue[0]
  const vocabulary = current?.origin === 'vocabulary'
  const dueCount = (items ?? []).filter((item) =>
    item.active && item.card.reps > 0 && new Date(item.card.due) <= new Date()).length
  const unseenCount = (items ?? []).filter((item) => item.active && item.card.reps === 0).length

  const grade = async (value) => {
    if (busy.current || !current) return
    busy.current = true
    setWorking(true)
    setError('')
    try {
      await submitReview(current.id, value, new Date(), current.card.reps)
      await reload()
      setRevealed(false)
    } catch (reason) {
      setError(reason.message)
    } finally {
      busy.current = false
      setWorking(false)
    }
  }
  const suspend = async () => {
    if (busy.current || !current) return
    busy.current = true
    setWorking(true)
    try {
      await suspendReviewItem(current.id)
      await reload()
      setRevealed(false)
    } catch (reason) {
      setError(reason.message)
    } finally {
      busy.current = false
      setWorking(false)
    }
  }

  return <div className="aw-page ar-review">
    <header className="ar-review-header">
      <p className="ar-eyebrow">{ja ? '練習 / 記憶の復習' : 'PRACTICE / MEMORY'}</p>
      <h1>{ja ? '今日の復習' : 'Your Review'}</h1>
      <p>{ja
        ? '覚えたい表現を、忘れかける頃にもう一度。'
        : 'Bring back useful expressions at the right time.'}</p>
    </header>
    {error && <div className="ar-error" role="alert">{error}</div>}
    {items === null && !error && <p role="status">{ja ? '読み込み中…' : 'Loading your review items…'}</p>}
    {items !== null && <>
      <div className="ar-stats">
        <span><strong>{dueCount}</strong>{ja ? '復習待ち' : 'Due'}</span>
        <span><strong>{unseenCount}</strong>{ja ? '新しい項目' : 'New'}</span>
        <span><strong>{items.filter((item) => item.active).length}</strong>{ja ? '合計' : 'In review'}</span>
      </div>
      {!current ? <section className="ar-empty">
        <h2>{ja ? '今は復習する項目がありません' : 'All caught up for now.'}</h2>
        <p>{ja
          ? 'レッスンの練習画面から、覚えたい言葉や表現を追加しましょう。'
          : 'Add words or phrases from a lesson’s Practice section. Items will reappear when due.'}</p>
        <a className="ar-button" href="#/practice">{ja ? '練習に戻る' : 'Browse Practice'}</a>
      </section> : <section className="ar-session" aria-live="polite">
        <div className="ar-meta">
          <span>{current.kind === 'word' ? (ja ? '単語' : 'WORD') : (ja ? 'フレーズ' : 'PHRASE')}</span>
          <span>{ja ? 'このセッションの残り' : 'In this session'}: {queue.length}</span>
        </div>
        <div className="ar-card" key={current.id}>
          <p className="ar-prompt">{vocabulary
            ? (ja ? '日本語の意味から、英語を思い出して声に出しましょう。' : 'Recall the English expression from this Japanese cue.')
            : (ja ? 'この表現の意味と使い方を思い出してください。' : 'Recall what this means and when you would use it.')}</p>
          <h2 lang={vocabulary ? 'ja' : 'en'}>{vocabulary ? current.ja : current.en}</h2>
          {revealed ? <div className="ar-answer">
            <p>{ja ? '答え・使い方' : 'ANSWER / USAGE'}</p>
            {vocabulary ? <div lang="en" className="ar-answer-main">{current.en}</div>
              : current.ja && <div lang="ja">{current.ja}</div>}
            {current.context && <div>{current.context}</div>}
            {!current.ja && !current.context && <div>{ja
              ? 'この表現を使う場面を説明してみましょう。'
              : 'Explain a situation in which you would use this expression.'}</div>}
          </div> : <button type="button" className="ar-button" onClick={() => setRevealed(true)}>
            {ja ? '答えを表示' : (vocabulary ? 'Reveal English' : 'Reveal meaning and usage')}
          </button>}
        </div>
        {revealed && <div className="ar-grades" aria-label={ja ? '思い出せた度合い' : 'Recall quality'}>
          {[['again', ja ? '忘れた' : 'Again'],['hard',ja ? '難しい' : 'Hard'],['good',ja ? '思い出せた' : 'Good'],['easy',ja ? '簡単' : 'Easy']].map(([value,label]) =>
            <button type="button" key={value} disabled={working} onClick={() => grade(value)}>{label}</button>
          )}
        </div>}
        <div className="ar-bottom">
          <a href={vocabulary
            ? `#/lesson/98/study/${current.vocabularyLesson ?? '01'}`
            : `#/lesson/${current.displayChapter ?? current.chapter}/study?line=${encodeURIComponent(current.sourceId)}`}>
            {ja ? '元のレッスンへ' : 'View original lesson'}
          </a>
          <button type="button" disabled={working} onClick={suspend}>
            {ja ? '復習から外す' : 'Remove from review'}
          </button>
        </div>
      </section>}
      <p className="ar-disclaimer">{ja
        ? '評価は自己申告です。音声や会話力の自動判定ではありません。進捗はこのブラウザーに保存されます。'
        : 'Rate your actual recall, not just familiarity. Artico does not automatically judge your speaking. Review history is saved in this browser.'}</p>
    </>}
  </div>
}
