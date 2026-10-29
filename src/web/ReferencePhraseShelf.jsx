import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { approvedAudio } from './components'

const art = (file) => `${import.meta.env.BASE_URL}assets/course/${file}`

// A reusable teaching panel for Chapters 02–96. Every phrase retains its
// original ID, context and translation; this component changes only its view.
export default function ReferencePhraseShelf({ ids = [], byId, audioProps, title }) {
  const { language, t } = useLanguage()
  const items = ids.map(id => byId[id]).filter(Boolean)
  const [selected, setSelected] = useState(0)
  const speechRef = useRef(null)
  const current = items[selected] || items[0]
  const visible = items.slice(0, 4)
  const additional = items.slice(4)

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
    <section className="ar-reference-shelf" aria-label={title || (language === 'ja' ? 'フレーズの選択' : 'Choose a phrase')}>
      <div className="ar-reference-stage" aria-hidden="true">
        {current.art
          ? <img src={art(current.art)} alt="" loading="lazy" />
          : <div className="ar-reference-figures"><i/><i/></div>}
        <small>{language === 'ja' ? '場面イラスト（準備中）' : 'Placeholder art'}</small>
      </div>
      <div className="ar-reference-shelf-main">
        <h3>{title || (language === 'ja' ? '表現を選んで聞く' : 'Choose an expression')}</h3>
        <div className="ar-reference-choices" role="group" aria-label={language === 'ja' ? '表現を選ぶ' : 'Select phrase'}>
          {visible.map((item, index) => (
            <button type="button" key={item.id} className={'ar-reference-choice' + (selected === index ? ' is-selected' : '')}
              aria-pressed={selected === index}
              onClick={() => play(item, index)}>
              <span lang="en">{item.en}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z M15 9a5 5 0 0 1 0 6 M18 6a9 9 0 0 1 0 12"/></svg>
            </button>
          ))}
        </div>
        {current && <div className="ar-reference-detail" aria-live="polite">
          <strong lang="en">{current.en}</strong>
          {language === 'ja' && current.ja && <p lang="ja">{current.ja}</p>}
          {current.context && <p>{current.context}</p>}
        </div>}
        {additional.length > 0 && <details className="ar-reference-more">
          <summary>{language === 'ja' ? 'その他の表現' : 'More phrases'} <span>+{additional.length}</span></summary>
          <div className="ar-reference-more-list">
            {additional.map((item,index)=><button type="button" key={item.id}
                className={'ar-reference-more-item' + (selected === index + visible.length ? ' is-selected' : '')}
                aria-pressed={selected === index + visible.length}
                onClick={() => play(item, index + visible.length)}>
                <span><strong lang="en">{item.en}</strong>
                  {language === 'ja' && item.ja && <small lang="ja">{item.ja}</small>}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z M15 9a5 5 0 0 1 0 6"/></svg>
              </button>)}
          </div>
        </details>}
      </div>
    </section>
  )
}
