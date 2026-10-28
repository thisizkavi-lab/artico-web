import { useEffect, useRef, useState } from 'react'
import { listReviewItems, saveReviewItem, suspendReviewItem } from './reviewStore'
import './review-action.css'

// One IndexedDB read per vocabulary *page*, not one transaction for each card.
export function useReviewCollection() {
  const [active, setActive] = useState(() => new Set())
  const [ready, setReady] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')
  const pending = useRef(new Set())
  useEffect(() => {
    let live = true
    listReviewItems()
      .then(items => {
        if (live) {
          setActive(new Set(items.filter(item => item.active).map(item => item.id)))
          setReady(true)
        }
      })
      .catch(err => { if (live) { setError(err.message); setReady(false) } })
    return () => { live = false }
  }, [])

  async function toggle(content) {
    if (!ready || !content?.id || pending.current.has(content.id)) return
    pending.current.add(content.id)
    setBusyId(content.id)
    setError('')
    try {
      if (active.has(content.id)) await suspendReviewItem(content.id)
      else await saveReviewItem(content)
      setActive(current => {
        const next = new Set(current)
        if (next.has(content.id)) next.delete(content.id)
        else next.add(content.id)
        return next
      })
    } catch (err) {
      setError(err.message)
    } finally {
      pending.current.delete(content.id)
      setBusyId(null)
    }
  }
  return { active, ready, busyId, error, toggle }
}

export function ReviewToggle({ content, collection, japanese }) {
  if (!content) return null
  const added = collection.active.has(content.id)
  return <button className={'ar-add-toggle' + (added ? ' is-active' : '')}
    type="button" aria-pressed={added} disabled={!collection.ready || collection.busyId === content.id}
    onClick={() => collection.toggle(content)}
    aria-label={japanese
      ? (added ? content.en + 'を復習から外す' : content.en + 'を復習に追加')
      : (added ? 'Remove ' + content.en + ' from review' : 'Add ' + content.en + ' to review')}>
    <span aria-hidden="true">{added ? '✓' : '+'}</span>
    {japanese ? (added ? '復習中' : '復習に追加') : (added ? 'In Review' : 'Add to Review')}
  </button>
}
