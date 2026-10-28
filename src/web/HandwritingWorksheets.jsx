import { useState } from 'react'
import { useLanguage } from './Language'
import Glyph from './Glyph'
import { LETTERS, WORDS, worksheetName } from './handwritingWorksheets'
import './handwriting-worksheets.css'

const copy = {
  en: {
    kicker: 'HANDWRITING · PRINTABLE WORKSHEETS',
    title: 'Write the alphabet',
    intro: 'Choose a worksheet, print it, and practise on paper.',
    overview: '1. Start with A–Z',
    overviewDescription: 'All 26 capital and small letters together, on four-line handwriting guides.',
    openOverview: 'Open / Print A–Z',
    upper: 'Capital letters only',
    lower: 'Small letters only',
    choose: '2. Choose a letter',
    chooseDescription: 'Print one letter at a time, or practise words that use it.',
    selected: 'Letter',
    trace: 'Trace the letters',
    traceDetail: 'Capital and small · dotted tracing',
    words: 'Write words',
    wordsDetail: 'Trace and copy familiar words',
    open: 'Open / Print',
    download: 'Download PDF',
    books: '3. Print a complete book',
    booksDescription: 'Prefer everything together? Use one complete A4 workbook.',
    full: 'Complete workbook',
    tracing: 'All letter pages',
    wordBook: 'All word pages',
    zip: 'Download every worksheet (ZIP)',
    printNote: 'For the correct line spacing, print on A4 at 100% / Actual size. Use a pencil.',
  },
  ja: {
    kicker: 'アルファベット · 印刷用ワークシート',
    title: 'アルファベットを書く',
    intro: 'シートを選んで印刷し、紙に書いて練習しましょう。',
    overview: '1. まずは A〜Z',
    overviewDescription: '大文字と小文字、26文字をまとめて練習します。４本のガイド線付きです。',
    openOverview: 'A〜Zを開く・印刷',
    upper: '大文字だけ',
    lower: '小文字だけ',
    choose: '2. 文字を選ぶ',
    chooseDescription: '１文字ずつなぞる練習と、単語を書く練習ができます。',
    selected: '文字',
    trace: '文字をなぞる',
    traceDetail: '大文字・小文字の点線',
    words: '単語を書く',
    wordsDetail: '身近な単語をなぞって写す',
    open: '開く・印刷',
    download: 'PDFを保存',
    books: '3. まとめて印刷',
    booksDescription: 'すべて練習したい場合は、A4のワークブックを使えます。',
    full: 'すべてのワークシート',
    tracing: '文字の練習帳',
    wordBook: '単語の練習帳',
    zip: '全シートをまとめて保存（ZIP）',
    printNote: '正しい罫線の間隔を保つため、A4用紙に「実際のサイズ / 100%」で印刷してください。',
  },
}

const pdfUrl = (kind, letter) => `${import.meta.env.BASE_URL}worksheets/${worksheetName(kind, letter)}`

function WritingGuides({ letter }) {
  return (
    <svg className="hw-visual" viewBox="0 0 200 108" aria-hidden="true">
      {[15, 39, 69, 93].map((y, i) =>
        <line key={y} x1="13" x2="187" y1={y} y2={y}
          stroke={i === 0 || i === 3 ? '#96a39f' : '#b4c2bf'}
          strokeWidth="1.2" strokeDasharray={i === 1 || i === 2 ? '2 4' : undefined}/>
      )}
      <text x="48" y="68" fontSize="66" textAnchor="middle" fontFamily="sans-serif" fill="#253c38">{letter}</text>
      <text x="118" y="68" fontSize="44" textAnchor="middle" fontFamily="sans-serif" fill="#253c38">{letter.toLowerCase()}</text>
    </svg>
  )
}

function PdfActions({ kind, letter, title, detail, l }) {
  const url = pdfUrl(kind, letter)
  return (
    <article className="hw-document">
      <div className="hw-document-copy">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <div className="hw-document-actions">
        <a className="hw-open" href={url} target="_blank" rel="noopener noreferrer">
          <Glyph name="book" size={17} /> {l.open}
        </a>
        <a className="hw-download" href={url} download>
          <Glyph name="save" size={16} /> {l.download}
        </a>
      </div>
    </article>
  )
}

export default function HandwritingWorksheets() {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const [letter, setLetter] = useState('A')

  return (
    <section className="rf-practice hw-library" aria-label={l.title}>
      <header className="hw-heading">
        <p className="ip-kicker">{l.kicker}</p>
        <h2>{l.title}</h2>
        <p className="ip-context">{l.intro}</p>
      </header>

      <section className="hw-section" aria-labelledby="hw-overview-heading">
        <div className="hw-overview">
          <div className="hw-overview-symbol" aria-hidden="true">Aa–Zz</div>
          <div className="hw-overview-main">
            <h3 id="hw-overview-heading">{l.overview}</h3>
            <p>{l.overviewDescription}</p>
            <a className="ip-primary" href={pdfUrl('overview')} target="_blank" rel="noopener noreferrer">
              {l.openOverview}<Glyph name="arrow" size={17}/>
            </a>
            <div className="hw-alternates">
              <a href={pdfUrl('upper')} target="_blank" rel="noopener noreferrer">{l.upper}</a>
              <span aria-hidden="true">·</span>
              <a href={pdfUrl('lower')} target="_blank" rel="noopener noreferrer">{l.lower}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="hw-section" aria-labelledby="hw-choose-heading">
        <h3 id="hw-choose-heading">{l.choose}</h3>
        <p className="hw-section-hint">{l.chooseDescription}</p>
        <div className="hw-letters" role="group" aria-label={l.choose}>
          {LETTERS.map(value => (
            <button type="button" key={value} aria-pressed={letter === value}
              className={'hw-letter-choice' + (letter === value ? ' is-selected' : '')}
              onClick={() => setLetter(value)}>
              {value}
            </button>
          ))}
        </div>
        <div className="hw-selected">
          <div className="hw-selected-preview">
            <span>{l.selected} {letter}</span>
            <WritingGuides letter={letter}/>
            <small>{WORDS[letter].join(' · ')}</small>
          </div>
          <div className="hw-selected-documents">
            <PdfActions kind="trace" letter={letter} l={l}
              title={l.trace} detail={l.traceDetail} />
            <PdfActions kind="words" letter={letter} l={l}
              title={l.words} detail={`${l.wordsDetail} · ${WORDS[letter].join(', ')}`} />
          </div>
        </div>
      </section>

      <section className="hw-section hw-books" aria-labelledby="hw-books-heading">
        <h3 id="hw-books-heading">{l.books}</h3>
        <p className="hw-section-hint">{l.booksDescription}</p>
        <div className="hw-book-links">
          <a href={pdfUrl('complete')} target="_blank" rel="noopener noreferrer">{l.full}<Glyph name="arrow" size={17}/></a>
          <a href={pdfUrl('tracing-book')} target="_blank" rel="noopener noreferrer">{l.tracing}<Glyph name="arrow" size={17}/></a>
          <a href={pdfUrl('word-book')} target="_blank" rel="noopener noreferrer">{l.wordBook}<Glyph name="arrow" size={17}/></a>
        </div>
        <a className="hw-zip-link" href={pdfUrl('zip')} download>{l.zip}</a>
      </section>

      <p className="hw-print-note">{l.printNote}</p>
    </section>
  )
}
