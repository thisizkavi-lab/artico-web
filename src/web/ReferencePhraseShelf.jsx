import { useEffect, useState } from 'react'
import { useLanguage } from './Language'
import { approvedAudio } from './components'
import { speakKokoroSpeech, stopKokoroSpeech, prefetchKokoroSpeech } from './kokoroSpeech'

const art = (file) => `${import.meta.env.BASE_URL}assets/course/${file}`

// Shared visible phrase cards for Social Fluency Chapters 02–96.
// English target phrases remain primary; explanatory text stays secondary.
export default function ReferencePhraseShelf({ ids = [], byId, audioProps, title, focusedId, note, sceneArt }) {
  const { language } = useLanguage()
  const items = ids.map(id => byId[id]).filter(Boolean)
  const [selected, setSelected] = useState(() => Math.max(0, ids.indexOf(focusedId)))
  const current = items[selected] || items[0]
  const hasCompleteArt = Boolean(sceneArt) || (items.length > 0 && items.every(item => Boolean(item.art)))

  useEffect(() => () => stopKokoroSpeech(), [])

  function play(item, index) {
    setSelected(index)
    if (approvedAudio[item.id]) {
      stopKokoroSpeech()
      audioProps.onPlay(item.id)
      return
    }
    audioProps?.audio?.stop?.()
    void speakKokoroSpeech(item.en, { rate: 0.91 })
    prefetchKokoroSpeech(items.slice(index + 1, index + 3).map(next => next.en))
  }

  if (!items.length) return null

  return (
    <section className={'ar-reference-shelf' + (hasCompleteArt ? '' : ' ar-reference-no-art') + (note ? ' ar-reference-with-note' : '')}
      aria-label={title || (language === 'ja' ? 'フレーズ' : 'Phrases')}>
      <h3 className="ar-reference-heading">{title || (language === 'ja' ? 'フレーズ' : 'Phrases')}</h3>
      {hasCompleteArt && <div className="ar-reference-stage" aria-hidden="true">
        <img src={art(sceneArt || current.art)} alt="" loading="lazy" />
      </div>}
      <div className="ar-reference-shelf-main">
        <div className="ar-reference-choices" role="group" aria-label={language === 'ja' ? 'フレーズを選んで発音を聞く' : 'Listen to a phrase'}>
          {items.map((item, index) => (
            <button type="button" key={item.id}
              className={'ar-reference-choice' + (selected === index ? ' is-selected' : '')}
              aria-pressed={selected === index} onClick={() => play(item, index)} onMouseEnter={() => prefetchKokoroSpeech([item.en])} onFocus={() => prefetchKokoroSpeech([item.en])}>
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
