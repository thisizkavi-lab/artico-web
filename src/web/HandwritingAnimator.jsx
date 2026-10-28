import { useState } from 'react'
import { useLanguage } from './Language'
import Glyph from './Glyph'
import {
  GUIDES, LETTERS, getLetterStrokes, getStartPosition,
} from './handwritingStrokes.js'
import './handwriting-animator.css'

const strings = {
  en: {
    title: 'Watch how to write',
    intro: 'Choose a letter. Watch the pen strokes, then try them on paper.',
    capital: 'Capital',
    small: 'Small',
    play: 'Play strokes',
    replay: 'Replay',
    choose: 'Choose a letter',
    print: 'Open printable worksheets',
    lines: 'The two middle guides are dotted. Watch where each stroke starts.',
    graphic: 'Stroke-order guide for',
  },
  ja: {
    title: '文字の書き方を見る',
    intro: '文字を選び、線を書く順番を見ましょう。そのあと紙で試してください。',
    capital: '大文字',
    small: '小文字',
    play: '書き順を見る',
    replay: 'もう一度見る',
    choose: '文字を選ぶ',
    print: '印刷用ワークシートを開く',
    lines: '真ん中の２本は点線です。書き始めの位置も見てください。',
    graphic: '書き順のガイド：',
  },
}

export default function HandwritingAnimator() {
  const { language } = useLanguage()
  const l = strings[language] ?? strings.en
  const [letter, setLetter] = useState('A')
  const [form, setForm] = useState('capital')
  const [playRun, setPlayRun] = useState(0)
  const strokes = getLetterStrokes(letter, form)
  const displayLetter = form === 'small' ? letter.toLowerCase() : letter
  const chooseLetter = value => { setLetter(value); setPlayRun(0) }
  const chooseForm = value => { setForm(value); setPlayRun(0) }
  const durations = strokes.map(path => /[CQ]/.test(path) ? 1050 : 760)
  let elapsed = 0

  return (
    <div className="hw-animator" aria-label={l.title}>
      <div className="hw-animator-heading">
        <div>
          <h3>{l.title}</h3>
          <p>{l.intro}</p>
        </div>
        <div className="hw-animator-forms" role="group" aria-label={l.choose}>
          {[
            { id: 'capital', label: l.capital },
            { id: 'small', label: l.small },
          ].map(item => (
            <button type="button" key={item.id} aria-pressed={form === item.id}
              onClick={() => chooseForm(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hw-animator-stage">
        <svg viewBox="0 0 160 164" role="img"
          aria-label={`${l.graphic} ${displayLetter}`} className="hw-animator-svg">
          {GUIDES.map((y, index) =>
            <line key={y} x1="12" x2="148" y1={y} y2={y}
              className={index === 0 || index === 3
                ? 'hw-animator-guide-outer'
                : 'hw-animator-guide-middle'}/>
          )}
          {strokes.map((d, index) =>
            <path key={`ghost-${index}`} d={d} className="hw-animator-ghost" />
          )}
          <g key={`${letter}-${form}-${playRun}`} className="hw-animator-animated">
            {strokes.map((d, index) => {
              const delay = elapsed
              const duration = durations[index]
              elapsed += duration + 180
              return playRun > 0 && (
                <path key={index} d={d} pathLength={1} className="hw-animator-stroke"
                  style={{
                    animationDelay: `${delay}ms`,
                    animationDuration: `${duration}ms`,
                  }}/>
              )
            })}
          </g>
          {strokes.map((d, index) => {
            const [x, y] = getStartPosition(d)
            return <g key={`start-${index}`} className="hw-animator-start">
              <circle cx={x} cy={y} r="7.5"/>
              <text x={x} y={y + 2.8} textAnchor="middle">{index + 1}</text>
            </g>
          })}
        </svg>
      </div>
      <div className="hw-animator-actions">
        <button type="button" className="ip-primary" onClick={() => setPlayRun(value => value + 1)}>
          <Glyph name="play" size={18}/>
          {playRun ? l.replay : l.play}
        </button>
        <p>{l.lines}</p>
      </div>

      <div className="hw-animator-select">
        <p className="ip-kicker">{l.choose}</p>
        <div className="hw-animator-letters" role="group" aria-label={l.choose}>
          {LETTERS.map(value =>
            <button key={value} type="button" aria-pressed={letter === value}
              onClick={() => chooseLetter(value)}>
              {value}
            </button>
          )}
        </div>
      </div>
      <a className="hw-animator-print" href="#/foundation/write/practice">
        {l.print} <Glyph name="arrow" size={16}/>
      </a>
    </div>
  )
}
