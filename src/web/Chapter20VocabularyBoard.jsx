import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from './Language'
import Glyph from './Glyph'
import { chapter20VocabularySections, chapter20VocabularyCount } from './chapter20Vocabulary'
import './chapter20-vocabulary.css'

function speakEnglish(phrase, onFailure) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    onFailure()
    return
  }
  const speech = window.speechSynthesis
  speech.cancel()
  const utterance = new SpeechSynthesisUtterance(phrase)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  utterance.pitch = 1
  utterance.onerror = onFailure
  const voices = speech.getVoices()
  const voice = voices.find((item) => /^en[-_]US$/i.test(item.lang) && item.localService)
    || voices.find((item) => /^en[-_]US$/i.test(item.lang))
    || voices.find((item) => /^en\b/i.test(item.lang))
  if (voice) utterance.voice = voice
  try {
    speech.speak(utterance)
  } catch {
    onFailure()
  }
}

export default function Chapter20VocabularyBoard({ sections, focusedId }) {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [speechError, setSpeechError] = useState(false)
  const normalizedQuery = query.trim().toLocaleLowerCase()

  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
  }, [])

  const filtered = useMemo(() => chapter20VocabularySections.map((content) => {
    const groups = content.groups.map((group) => ({
      ...group,
      items: group.items.filter((item) => !normalizedQuery || [
        item.en, item.ja, item.definition, item.jaDefinition,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
      ),
    })).filter((group) => group.items.length)
    return { ...content, groups }
  }), [normalizedQuery])

  const visibleCount = filtered.reduce((total, section) =>
    total + section.groups.reduce((count, group) => count + group.items.length, 0), 0)
  const speak = (phrase) => {
    setSpeechError(false)
    speakEnglish(phrase, () => setSpeechError(true))
  }

  return (
    <div className="ar-ch20-atlas">
      <div className="ar-ch20-toolbar">
        <label className="ar-ch20-search">
          <Glyph name="search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={language === 'ja' ? '英語・日本語で語彙を検索…' : 'Search words and meanings…'}
            aria-label={language === 'ja' ? '語彙を検索' : 'Search vocabulary'}
          />
          {query && (
            <button type="button" className="ar-ch20-clear" onClick={() => setQuery('')}
              aria-label={language === 'ja' ? '検索をクリア' : 'Clear search'}>×</button>
          )}
        </label>
        <span className="ar-ch20-count" aria-live="polite">
          {language === 'ja'
            ? `${visibleCount} / ${chapter20VocabularyCount} 語・表現`
            : `${visibleCount} of ${chapter20VocabularyCount} words & phrases`}
        </span>
      </div>
      <p className="ar-ch20-audio-hint">
        {language === 'ja'
          ? 'スピーカーを押すと、英語の発音を聞けます。'
          : 'Select the speaker to hear each word in English.'}
      </p>

      {filtered.map((content, sectionIndex) => {
        const sourceSection = sections.find((section) => section.id === content.id)
        if (!sourceSection) return null
        const sectionCount = content.groups.reduce((count, group) => count + group.items.length, 0)
        return (
          <section className="ip-section ar-ch20-section" key={content.id}
            id={`study-${content.id}`} aria-labelledby={`heading-${content.id}`}>
            <div className="ip-section-heading">
              <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
              <h2 id={`heading-${content.id}`}>{sourceSection.title}</h2>
              <small>{language === 'ja' ? `${sectionCount}語・表現` : `${sectionCount} terms`}</small>
            </div>
            <div className="ar-ch20-groups">
              {content.groups.map((group) => (
                <section className="ar-ch20-group" key={group.title}>
                  <h3 className="ar-ch20-group-title">
                    <span>{language === 'ja' ? group.jaTitle : group.title}</span>
                    <small>{group.items.length}</small>
                  </h3>
                  <div className="ar-ch20-grid">
                    {group.items.map((item) => (
                      <article
                        className={`ar-ch20-card${focusedId === item.id ? ' is-focused' : ''}`}
                        id={`study-${item.id}`}
                        data-phrase-id={item.id}
                        key={item.id}
                      >
                        <div className="ar-ch20-card-top">
                          <h4 lang="en">{item.en}</h4>
                          <button type="button" className="ar-ch20-sound"
                            title={language === 'ja' ? '英語の発音を聞く' : 'Listen to pronunciation'}
                            aria-label={language === 'ja' ? `${item.en} の発音を聞く` : `Listen to ${item.en}`}
                            onClick={() => speak(item.en)}>
                            <Glyph name="speaker" size={17} />
                          </button>
                        </div>
                        {language === 'ja' && <p className="ar-ch20-japanese" lang="ja">{item.ja}</p>}
                        <p className="ar-ch20-definition" lang={language === 'ja' ? 'ja' : 'en'}>
                          {language === 'ja' ? item.jaDefinition : item.definition}
                        </p>
                        {item.kind === 'phrase' && (
                          <span className="ar-ch20-kind">{language === 'ja' ? '使える表現' : 'Useful expression'}</span>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        )
      })}

      {visibleCount === 0 && (
        <p className="ar-ch20-empty" role="status">
          {language === 'ja' ? '一致する語彙がありません。別の言葉で検索してください。' : 'No matching vocabulary. Try another search.'}
        </p>
      )}
      {speechError && (
        <p className="ar-ch20-error" role="status">
          {language === 'ja' ? 'この端末では音声を利用できません。' : 'English speech is unavailable on this device.'}
        </p>
      )}
    </div>
  )
}
