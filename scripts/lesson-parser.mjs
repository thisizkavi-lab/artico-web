// Source manuscripts are editorial inputs. The app consumes teaching blocks,
// never a Markdown reader. Keep spans so omissions can be audited per chapter.
export function textRuns(value) {
  return value
    .trimEnd()
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**')) return { text: part.slice(2, -2), emphasis: true }
      if (part.startsWith('*')) return { text: part.slice(1, -1), italic: true }
      if (part.startsWith('`')) return { text: part.slice(1, -1), code: true }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      return link ? { text: link[1], href: link[2] } : { text: part }
    })
}
export const plain = (runs) => runs.map((run) => run.text).join('')
const cells = (line) =>
  line
    .replace(/^\|\s*/, '')
    .replace(/\s*\|$/, '')
    .split('|')
    .map((cell) => textRuns(cell.trim()))
const unquote = (line) => line.replace(/^>\s?/, '')
const roleLine = (line) => unquote(line).match(/^\*\*([^*:\n]{1,40}):\*\*\s+(.+)/)
const metadata =
  /^(?:Your goal|Outcome|You can|Check|Solo route|Possible responses|Sample|Possib|Experience|Education|Availability|Skills|Clock time|Duration|Subject|Name support|Scene facts|An invented family|U\.S\.)/i

export function parseLesson(source, id) {
  const lines = source.replace(/\r/g, '').split('\n')
  const title = lines[0].replace(/^#\s*CH\d+\s*[—–-]\s*/, '')
  let goal = '',
    mode = 'study',
    section,
    count = 0
  const study = [],
    practice = [],
    covered = new Set([0])
  const pushSection = (heading, line) => {
    section = {
      id: `${id}-${mode}-${mode === 'study' ? study.length : practice.length}`,
      title: heading,
      blocks: [],
      line,
    }
    ;(mode === 'study' ? study : practice).push(section)
  }
  const push = (type, data, start, end) => {
    if (!section) pushSection(mode === 'study' ? 'Start here' : 'Take your turn', start)
    const block = { id: `ch${id}-b${count++}`, type, ...data, span: [start, end] }
    section.blocks.push(block)
    for (let line = start; line <= end; line++) covered.add(line)
  }
  for (let index = 1; index < lines.length; ) {
    const line = lines[index]
    if (!line.trim() || /^---+$/.test(line)) {
      covered.add(index++)
      continue
    }
    const goalMatch = line.match(/^\*\*(?:Your goal|Outcome|You can):\*\*\s*(.*)/)
    if (goalMatch) {
      goal = plain(textRuns(goalMatch[1])).trim()
      covered.add(index++)
      continue
    }
    const heading = line.match(/^(#{2,4})\s+(.+)/)
    if (heading) {
      covered.add(index)
      // Only top-level sections switch modes. A Study subsection can describe
      // practice without moving the remaining teaching examples out of Study.
      if (heading[1] === '##' && /^Practice(?:\b|:)/.test(heading[2])) mode = 'practice'
      if (heading[1] === '##' && /^Study(?:\b|:)/.test(heading[2])) mode = 'study'
      const label =
        heading[1] === '##' ? heading[2].replace(/^(?:Study|Practice):?\s*/, '').trim() : heading[2]
      if (mode === 'practice' && /^(?:Sample|Possible|Example|Answer)/i.test(label)) {
        push('answerHeading', { runs: textRuns(label) }, index, index)
      } else if (label) pushSection(label, index)
      else section = undefined
      index++
      continue
    }
    // Dialogue is a continuous exchange between roles, not any bold label.
    const first = roleLine(line)
    if (first && !metadata.test(first[1])) {
      const start = index,
        turns = []
      while (index < lines.length) {
        const match = roleLine(lines[index])
        if (!match || metadata.test(match[1])) break
        turns.push({ speaker: match[1], runs: textRuns(match[2]), id: `ch${id}-line${index}` })
        index++
      }
      if (turns.length >= 2 && new Set(turns.map((turn) => turn.speaker)).size >= 2) {
        push('conversation', { turns }, start, index - 1)
        continue
      }
      index = start
    }
    if (line.startsWith('|') && /^\|\s*[-:]/.test(lines[index + 1] ?? '')) {
      const start = index,
        header = cells(line),
        rows = []
      index += 2
      while (lines[index]?.startsWith('|')) rows.push(cells(lines[index++]))
      push('table', { header, rows }, start, index - 1)
      continue
    }
    if (/^>/.test(line)) {
      const start = index,
        paragraphs = [],
        buffer = []
      const flush = () => {
        if (buffer.length) {
          paragraphs.push(textRuns(buffer.join('\n')))
          buffer.length = 0
        }
      }
      while (/^>/.test(lines[index] ?? '')) {
        const value = unquote(lines[index++])
        if (!value.trim()) flush()
        else buffer.push(value.trimEnd())
      }
      flush()
      push(
        paragraphs.some((runs) => /^Subject:/.test(plain(runs))) ? 'email' : 'quote',
        { paragraphs },
        start,
        index - 1,
      )
      continue
    }
    const list = line.match(/^(?:- |\d+\. )/)
    if (list) {
      const start = index,
        ordered = /^\d/.test(line),
        items = []
      while (lines[index]?.match(ordered ? /^\d+\. / : /^- /)) {
        items.push({
          number: ordered ? Number(lines[index].match(/^\d+/)[0]) : null,
          runs: textRuns(lines[index].replace(ordered ? /^\d+\. / : /^- /, '')),
        })
        index++
      }
      push('list', { ordered, items }, start, index - 1)
      continue
    }
    const start = index,
      paragraph = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(?:#{1,4} |\||>|---+$|- |\d+\. )/.test(lines[index])
    ) {
      if (paragraph.length && roleLine(lines[index]) && !metadata.test(roleLine(lines[index])[1]))
        break
      paragraph.push(lines[index++].trimEnd())
    }
    if (!paragraph.length) paragraph.push(lines[index++])
    const runs = textRuns(paragraph.join('\n'))
    push(
      mode === 'practice' &&
        /^(?:Sample|Possible|Possibilities|One possibility|Possible exchange)/i.test(plain(runs))
        ? 'answer'
        : 'explanation',
      { runs },
      start,
      index - 1,
    )
  }
  const uncovered = lines
    .map((line, index) => (!covered.has(index) && line.trim() ? index : null))
    .filter((index) => index !== null)
  if (uncovered.length) throw new Error(`${id}: unhandled source lines ${uncovered.join(', ')}`)
  return {
    id,
    title,
    goal,
    study: study.filter((section) => section.blocks.length),
    practice: practice.filter((section) => section.blocks.length),
    sourceLines: lines.length,
    coveredLines: [...covered].sort((a, b) => a - b),
  }
}
