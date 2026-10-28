import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { LETTERS_PER_CHECK, makeAlphabetRecognitionCards } from './alphabetRecognition'
import './alphabet-recognition.css'

const copy = {
  en: {
    eyebrow: 'ALPHABET · PRACTICE',
    heading: 'Recognize the letters.',
    description: 'Match a capital letter with its small form, or the other way around.',
    upper: 'Which capital letter matches?',
    lower: 'Which small letter matches?',
    right: 'That’s right.',
    wrong: 'The matching letter is',
    next: 'Next letter',
    finish: 'Finish',
    done: 'That’s it.',
    complete: 'You checked 10 letters.',
    clear: 'You matched each letter in this short check.',
    revisit: 'Letters to look at again:',
    another: 'Check another 10',
  },
  ja: {
    eyebrow: 'アルファベット · 練習',
    heading: '文字を見分けよう。',
    description: '大文字と小文字の組み合わせを選びましょう。',
    upper: '同じ文字の大文字はどれ？',
    lower: '同じ文字の小文字はどれ？',
    right: '正解です。',
    wrong: '対応する文字は',
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
  const [selected, setSelected] = useState(null)
  const [missed, setMissed] = useState([])
  const promptRef = useRef(null)
  const cards = makeAlphabetRecognitionCards(round)
  const finished = index === cards.length
  const current = !finished ? cards[index] : null

  useEffect(() => {
    if (index > 0 || round > 0) promptRef.current?.focus({ preventScroll: true })
  }, [index, round])

  const choose = (value) => {
    if (selected !== null || finished) return
    setSelected(value)
    if (value !== current.answer) setMissed(previous => [...previous, current.pair])
  }
  const advance = () => {
    if (selected === null) return
    setSelected(null)
    setIndex(previous => previous + 1)
  }
  const another = () => {
    setRound(previous => previous + 1)
    setIndex(0)
    setSelected(null)
    setMissed([])
  }

  return (
    <section className="rf-practice rf-letter-check" aria-label={l.heading}>
      <p className="ip-kicker">{l.eyebrow}</p>
      <h2>{l.heading}</h2>
      <p className="ip-context rf-letter-check-intro">{l.description}</p>
      {!finished ? (
        <div className="rf-letter-check-body">
          <div className="rf-letter-check-topline">
            <p ref={promptRef} tabIndex={-1} className="rf-letter-check-prompt">
              {current.direction === 'lower' ? l.lower : l.upper}
            </p>
            <span className="rf-letter-check-count">{index + 1} / {LETTERS_PER_CHECK}</span>
          </div>
          <div className="rf-letter-check-face" lang="en" aria-label={current.shown}>
            {current.shown}
          </div>
          <div className="rf-letter-check-choices" role="group" aria-label={current.direction === 'lower' ? l.lower : l.upper}>
            {current.choices.map(option => (
              <button type="button" key={option} lang="en"
                className={'rf-letter-check-choice' +
                  (selected !== null && option === current.answer ? ' is-match' : '') +
                  (selected === option && option !== current.answer ? ' is-missed' : '')}
                disabled={selected !== null}
                onClick={() => choose(option)}>
                {option}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="rf-letter-check-feedback">
              <p role="status">
                {selected === current.answer ? l.right : `${l.wrong} ${current.answer}.`}
                <span className="rf-letter-check-pair" lang="en"> {current.pair}</span>
              </p>
              <button type="button" className="ip-primary" onClick={advance}>
                {index === cards.length - 1 ? l.finish : l.next}
                <Glyph name="arrow" size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rf-letter-check-end" role="status">
          <h3 ref={promptRef} tabIndex={-1}>{l.done}</h3>
          <p>{l.complete}</p>
          {missed.length ? (
            <p>{l.revisit} <strong lang="en">{missed.join('　 ')}</strong></p>
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
