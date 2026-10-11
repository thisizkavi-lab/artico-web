import { useEffect, useState } from 'react'
import { Button, Heading, Segments } from './components'
import { catalog, chapterById } from './content'

const manuscripts = import.meta.glob('../course/chapters/*.md', {
  query: '?raw',
  import: 'default',
})
const cache = new Map()
function loadChapter(chapter) {
  if (!cache.has(chapter.id))
    cache.set(chapter.id, manuscripts[`../course/chapters/${chapter.filename}`]())
  return cache.get(chapter.id)
}
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link)
      return /^https:\/\//.test(link[2]) ? (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      ) : (
        <span key={index}>{link[1]}</span>
      )
    return part
  })
}
const tableCells = (line) =>
  line
    .replace(/^\|\s*/, '')
    .replace(/\s*\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
export function Markdown({ text }) {
  const lines = text.trim().split('\n')
  const blocks = []
  for (let index = 0; index < lines.length; ) {
    const line = lines[index]
    const key = index
    if (!line.trim() || /^---+$/.test(line)) {
      index++
      continue
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      const Tag = `h${Math.max(2, Math.min(heading[1].length, 4))}`
      blocks.push(
        <Tag key={key} id={`section-${key}`}>
          {inline(heading[2])}
        </Tag>,
      )
      index++
      continue
    }
    if (/^>/.test(line)) {
      const quote = []
      while (/^>/.test(lines[index] ?? '')) quote.push(lines[index++].replace(/^>\s?/, ''))
      blocks.push(
        <blockquote key={key}>
          <p>{inline(quote.join('\n'))}</p>
        </blockquote>,
      )
      continue
    }
    if (line.startsWith('|') && /^\|\s*[-:]/.test(lines[index + 1] ?? '')) {
      const header = tableCells(line)
      index += 2
      const rows = []
      while (lines[index]?.startsWith('|')) rows.push(tableCells(lines[index++]))
      blocks.push(
        <div className="aw-table-scroll" key={key}>
          <table>
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex}>{inline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }
    const list = line.match(/^(?:- |\d+\. )/)
    if (list) {
      const ordered = /^\d/.test(line)
      const Tag = ordered ? 'ol' : 'ul'
      const items = []
      while (lines[index]?.match(ordered ? /^\d+\. / : /^- /))
        items.push(lines[index++].replace(ordered ? /^\d+\. / : /^- /, ''))
      blocks.push(
        <Tag key={key}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{inline(item)}</li>
          ))}
        </Tag>,
      )
      continue
    }
    const paragraph = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(?:#{1,4} |\| |>|---+$|- |\d+\. )/.test(lines[index])
    )
      paragraph.push(lines[index++].trimEnd())
    if (!paragraph.length) {
      paragraph.push(lines[index++])
    }
    blocks.push(<p key={key}>{inline(paragraph.join('\n'))}</p>)
  }
  return (
    <div className="aw-manuscript" lang="en">
      {blocks}
    </div>
  )
}

export default function Reader({ route }) {
  const chapter = chapterById[route.id]
  const [result, setResult] = useState({ id: null, text: '', error: false })
  const practice = route.view === 'practice'
  const [showAnswers, setShowAnswers] = useState(false)
  useEffect(() => {
    let active = true
    setShowAnswers(false)
    loadChapter(chapter)
      .then((text) => {
        if (active) setResult({ id: chapter.id, text, error: false })
      })
      .catch(() => {
        if (active) setResult({ id: chapter.id, text: '', error: true })
      })
    return () => {
      active = false
    }
  }, [chapter.id])
  const text = result.id === chapter.id ? result.text.replace(/^# .+\n/, '') : ''
  const practiceStart = text.search(/^## Practice\b/m)
  const studyText = practiceStart < 0 ? text : text.slice(0, practiceStart)
  const practiceText = practiceStart < 0 ? '' : text.slice(practiceStart)
  const answerStart = practiceText.search(/^### (?:Sample|Possible|Example|One possible|Answer)/im)
  const current = practice
    ? answerStart >= 0 && !showAnswers
      ? practiceText.slice(0, answerStart)
      : practiceText
    : studyText
  const outline = current
    .trim()
    .split('\n')
    .flatMap((line, index) =>
      /^#{2,3} /.test(line) ? [{ id: `section-${index}`, title: line.replace(/^#+\s*/, '') }] : [],
    )
  const previous = catalog[Number(chapter.id) - 2]
  const next = catalog[Number(chapter.id)]
  return (
    <div className="aw-page aw-reader-page">
      <Heading
        eyebrow={`SOCIAL FLUENCY / CHAPTER ${chapter.id}`}
        title={chapter.title}
        ja={chapter.ja}
      />
      <Segments
        items={[
          { value: 'study', label: 'Study' },
          { value: 'practice', label: 'Practice' },
        ]}
        active={practice ? 'practice' : 'study'}
        onChange={(view) => {
          window.location.hash = `/lesson/${chapter.id}/${view}${chapter.id === '02' && view === 'study' ? '/first' : ''}`
        }}
        label="Chapter mode"
        className="aw-reader-tabs"
      />
      {practice && (
        <aside className="aw-reader-instruction">
          <h2>First, make the words familiar.</h2>
          <p className="aw-jp">
            短い表現を声にしてから、下の場面を試しましょう。音声は文章の確認後に追加します。
          </p>
          {chapter.id === '02' && (
            <Button href="/lesson/02/practice/first" variant="outline">
              Back to shadowing
            </Button>
          )}
        </aside>
      )}
      {result.error ? (
        <div className="aw-empty">
          <h2>章を読み込めませんでした。</h2>
          <Button onClick={() => window.location.reload()}>もう一度読み込む</Button>
        </div>
      ) : !text ? (
        <p role="status">Loading the chapter…</p>
      ) : (
        <div className="aw-reader-grid">
          <nav className="aw-reader-outline" aria-label="Chapter contents">
            <p className="aw-eyebrow">IN THIS CHAPTER</p>
            {outline.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
                }
              >
                {item.title}
              </button>
            ))}
          </nav>
          <article className="aw-reader-body">
            <Markdown text={current} />
            {practice && answerStart >= 0 && (
              <Button
                variant="outline"
                onClick={() => setShowAnswers((value) => !value)}
                aria-expanded={showAnswers}
              >
                {showAnswers ? 'Hide sample answers' : 'Show sample answers'}
              </Button>
            )}
            {!practice && (
              <Button href={`/lesson/${chapter.id}/practice${chapter.id === '02' ? '/first' : ''}`}>
                Listen & practice
              </Button>
            )}
            <div className="aw-reader-footer">
              {previous ? (
                <Button href={`/lesson/${previous.id}/study`} variant="quiet">
                  ← {previous.title}
                </Button>
              ) : (
                <Button href="/courses" variant="quiet">
                  ← All chapters
                </Button>
              )}
              {next && (
                <Button href={`/lesson/${next.id}/study`} variant="quiet">
                  {next.title} →
                </Button>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
