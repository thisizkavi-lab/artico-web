import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { approvedAudio } from './components'

const art = (file) => `${import.meta.env.BASE_URL}assets/course/${file}`

// Shared visible phrase cards for Social Fluency Chapters 02–96.
// English target phrases remain primary; explanatory text stays secondary.
export default function ReferencePhraseShelf({ ids = [], byId, audioProps, title, focusedId, note }) {
  const { language } = useLanguage()
  const items = ids.map(id => byId[id]).filter(Boolean)
  const [selected, setSelected] = useState(() => Math.max(0, ids.indexOf(focusedId)))
  const speechRef = useRef(null)
  const current = items[selected] || items[0]
  // Do not substitute generic placeholder figures for missing lesson artwork.
  const hasCompleteArt = items.length > 0 && items.every(item => Boolean(item.art))

  useEffect(() => () => {
    if (typeof window !== 'undefined' && speechRef.current)
      window.speechSynthesis?.cancel()
  }, [])

  function play(item, index) {
    setSelected(index)
    if (approvedAudio[item.id]) {
      speechRef.current = null
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
      audioProps.onPlay(item.id)
      return
    }
    if (typeof window === 'undefined' || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return
    audioProps?.audio?.stop?.()
    window.speechSynthesis.cancel()
    const utterance = new window.SpeechSynthesisUtterance(item.en)
    utterance.lang = 'en-US'
    utterance.rate = 0.91
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(candidate => candidate.lang.toLowerCase() === 'en-us')
      || voices.find(candidate => candidate.lang.toLowerCase().startsWith('en'))
    if (voice) utterance.voice = voice
    speechRef.current = utterance
    utterance.onend = () => { if (speechRef.current === utterance) speechRef.current = null }
    window.speechSynthesis.speak(utterance)
  }

  if (!items.length) return null

  return (
    <section className={'ar-reference-shelf' + (hasCompleteArt ? '' : ' ar-reference-no-art') + (note ? ' ar-reference-with-note' : '')}
      aria-label={title || (language === 'ja' ? 'フレーズ' : 'Phrases')}>
      <h3 className="ar-reference-heading">{title || (language === 'ja' ? 'フレーズ' : 'Phrases')}</h3>
      {hasCompleteArt && <div className="ar-reference-stage" aria-hidden="true">
        <img src={art(current.art)} alt="" loading="lazy" />
      </div>}
      <div className="ar-reference-shelf-main">
        <div className="ar-reference-choices" role="group" aria-label={language === 'ja' ? 'フレーズを選んで発音を聞く' : 'Listen to a phrase'}>
          {items.map((item, index) => (
            <button type="button" key={item.id}
              className={'ar-reference-choice' + (selected === index ? ' is-selected' : '')}
              aria-pressed={selected === index} onClick={() => play(item, index)}>
              <span lang="en">{item.en}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z M15 9a5 5 0 0 1 0 6 M18 6a9 9 0 0 1 0 12"/></svg>
            </button>
          ))}
        </div>
        {current && (current.context || (language === 'ja' && (current.ja || current.contextJa))) && (
          <div className="ar-reference-detail" aria-live="polite">
            {language === 'ja' && current.ja && <p lang="ja">{current.ja}</p>}
            {language === 'ja' && current.contextJa
              ? <p lang="ja">{current.contextJa}</p>
              : current.context && <p>{current.context}</p>}
          </div>
        )}
      </div>
      {note && <aside className="ar-reference-note">
        <span className="ar-reference-note-label">Note</span>
        <p>{note.title && <strong>{note.title} </strong>}{note.text}</p>
      </aside>}
    </section>
  )
}
