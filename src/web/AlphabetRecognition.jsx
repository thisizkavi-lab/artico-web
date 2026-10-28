import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { LETTERS_PER_CHECK, makeAlphabetRecognitionCards } from './alphabetRecognition'
import './alphabet-recognition.css'

const copy = {
  en: {
    eyebrow: 'ALPHABET · RECOGNITION',
    progress: 'Letter',
    lower: 'Which lowercase letter matches this capital letter?',
    upper: 'Which capital letter matches this lowercase letter?',
    audio: 'Which letter do you hear?',
    listen: 'Listen',
    replay: 'Listen again',
    right: 'That’s right.',
    wrong: 'The matching letter is',
    previous: 'Previous',
    next: 'Next letter',
    finish: 'Finish',
    done: 'That’s it.',
    complete: 'You checked 10 letters.',
    clear: 'You recognized all the letters in this short check.',
    revisit: 'Letters worth another look:',
    another: 'Try another 10',
  },
  ja: {
    eyebrow: 'アルファベット · 文字の確認',
    progress: '文字',
    lower: 'この大文字と同じ小文字はどれ？',
    upper: 'この小文字と同じ大文字はどれ？',
    audio: '聞こえた文字はどれ？',
    listen: '音を聞く',
    replay: 'もう一度聞く',
    right: '正解です。',
    wrong: '対応する文字は',
    previous: '戻る',
    next: '次の文字',
    finish: '終わる',
    done: 'おしまい。',
    complete: '10文字を確認しました。',
    clear: '今回の10文字は、すべて見分けられました。',
    revisit: 'もう一度確認したい文字：',
    another: '別の10文字を試す',
  },
}

export default function AlphabetRecognition() {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [audioAvailable, setAudioAvailable] = useState(() =>
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance !== 'undefined')
  const promptRef = useRef(null)
  const cards = makeAlphabetRecognitionCards(round)
  const finished = index === cards.length
  const current = finished ? null : cards[index]
  const selected = responses[index] ?? null
  const misses = cards.filter((item, i) => responses[i] && responses[i] !== item.answer)
  const audioOnly = current?.media === 'audio' && audioAvailable
  const question = audioOnly ? l.audio : current?.direction === 'lower' ? l.lower : l.upper

  // Changing questions must not leave a previous letter playing over a new card.
  useEffect(() => {
    return () => window.speechSynthesis?.cancel()
  }, [round, index])

  useEffect(() => {
    if (index > 0 || round > 0) promptRef.current?.focus({ preventScroll: true })
  }, [index, round])

  const playLetter = () => {
    if (!current || !audioOnly) return
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setAudioAvailable(false)
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new window.SpeechSynthesisUtterance(current.letter)
    utterance.lang = 'en-US'
    utterance.rate = 0.88
    const americanVoice = window.speechSynthesis.getVoices?.().find(voice => /^en[-_]US/i.test(voice.lang))
    if (americanVoice) utterance.voice = americanVoice
    utterance.onerror = event => {
      if (!['canceled', 'interrupted'].includes(event.error)) setAudioAvailable(false)
    }
    try {
      window.speechSynthesis.speak(utterance)
    } catch {
      setAudioAvailable(false)
    }
  }
  const choose = value => {
    if (selected !== null || finished) return
    setResponses(previous => ({ ...previous, [index]: value }))
  }
  const another = () => {
    setRound(previous => previous + 1)
    setIndex(0)
    setResponses({})
  }

  return (
    <section className="rf-practice rf-letter-check" aria-label={l.eyebrow}>
      <div className="rf-letter-check-topline">
        <p className="ip-kicker">{l.eyebrow}</p>
        <span className="rf-letter-check-count">{Math.min(index + 1, LETTERS_PER_CHECK)} / {LETTERS_PER_CHECK}</span>
      </div>
      <div className="rf-letter-check-progress" aria-hidden="true">
        <span style={{ width: `${(index / LETTERS_PER_CHECK) * 100}%` }} />
      </div>
      {!finished ? (
        <div className="rf-letter-check-body">
          {/* Only the media appears inside the card: a glyph OR a sound button. */}
          <div className={'rf-letter-check-card' + (audioOnly ? ' is-audio' : ' is-visual')}>
            {audioOnly ? (
              <button type="button" className="rf-letter-check-listen" onClick={playLetter}
                aria-label={l.replay}>
                <Glyph name="play" size={30} />
                <span>{l.listen}</span>
              </button>
            ) : (
              <span className="rf-letter-check-letter" lang="en" aria-label={current.shown ?? current.letter.toLowerCase()}>
                {current.shown ?? current.letter.toLowerCase()}
              </span>
            )}
          </div>
          {/* The question is intentionally outside, UNDER the media card. */}
          <h2 className="rf-letter-check-question" ref={promptRef} tabIndex={-1}>{question}</h2>
          <div className="rf-letter-check-choices" role="group" aria-label={question}>
            {current.choices.map((option, optionIndex) => (
              <button type="button" key={option} lang="en" onClick={() => choose(option)}
                aria-label={`${optionIndex + 1}. ${option}`}
                className={'rf-letter-check-choice' +
                  (selected !== null && option === current.answer ? ' is-match' : '') +
                  (selected === option && option !== current.answer ? ' is-missed' : '')}
                disabled={selected !== null}>
                {option}
              </button>
            ))}
          </div>
          <div className="rf-letter-check-feedback" role="status" aria-live="polite">
            {selected !== null && (
              <p>
                {selected === current.answer ? l.right : `${l.wrong} ${current.answer}.`}
                <span className="rf-letter-check-pair" lang="en"> {current.pair}</span>
              </p>
            )}
          </div>
          <nav className="rf-letter-check-nav" aria-label={l.eyebrow}>
            <button type="button" className="ip-secondary" disabled={index === 0} onClick={() => setIndex(previous => previous - 1)}>
              <Glyph name="back" size={18} /> {l.previous}
            </button>
            <button type="button" className="ip-primary" disabled={selected === null} onClick={() => setIndex(previous => previous + 1)}>
              {index === cards.length - 1 ? l.finish : l.next} <Glyph name="arrow" size={18} />
            </button>
          </nav>
        </div>
      ) : (
        <div className="rf-letter-check-end" role="status">
          <h2 ref={promptRef} tabIndex={-1}>{l.done}</h2>
          <p>{l.complete}</p>
          {misses.length ? (
            <p>{l.revisit} <strong lang="en">{misses.map(card => card.pair).join('　 ')}</strong></p>
          ) : (
            <p>{l.clear}</p>
          )}
          <button type="button" className="ip-secondary" onClick={another}>
            {l.another} <Glyph name="arrow" size={18} />
          </button>
        </div>
      )}
    </section>
  )
}
