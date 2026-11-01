const comparisonLists = new Set(['ch08-b1', 'ja-08-study-0-1', 'ch10-b1', 'ja-10-study-0-1'])
const chapter08Notes = new Set(['ch08-b2', 'ja-08-study-0-2', 'ch08-b15', 'ja-08-study-3-0', 'ja-08-study-3-1'])
const chapter08Captions = new Set(['ch08-b3', 'ja-08-study-0-3', 'ch08-b7', 'ja-08-study-1-1'])
const plain = (runs = []) => runs.map((run) => run.text).join('')

// Presentation changes preserve source wording, IDs, and the bilingual lessons.
export function illustratedStudyPresentation(section, chapterId, language) {
  let caption
  const blocks = []
  for (const block of section.blocks) {
    if (chapterId === '08' && chapter08Captions.has(block.id)) {
      caption = plain(block.source.runs)
      continue
    }
    if (block.type === 'conversation') {
      blocks.push(caption ? { ...block, studyTitle: caption } : block)
      caption = undefined
      continue
    }
    if (comparisonLists.has(block.id)) {
      const source = block.source
      const rows = source.items.map((item) => [
        item.runs.filter((run) => run.emphasis),
        item.runs.filter((run) => !run.emphasis),
      ])
      // Leave an unfamiliar future list intact rather than dropping its text.
      if (rows.every(([expression, meaning]) => expression.length && meaning.length)) {
        blocks.push({ ...block, source: { ...source, type: 'table', presentation: 'expression-meaning', items: undefined,
          header: [[{ text: language === 'ja' ? '表現' : 'Expression' }],
            [{ text: language === 'ja' ? '伝えること' : 'What it means' }]],
          rows,
          phraseCells: rows.map((row, index) => [source.items[index].phraseIds?.[0] ?? source.phraseIds?.[index], null]),
        } })
        continue
      }
    }
    blocks.push(chapterId === '08' && chapter08Notes.has(block.id)
      ? { ...block, source: { ...block.source, teachingNote: 'Note' } } : block)
  }
  const first = blocks[0]
  const lead = first?.type === 'source' && first.source.type === 'explanation' && !first.source.teachingNote
    ? first : null
  // Grammar examples belong in their note rather than among the main phrases.
  const preferredIds = chapterId === '08' && section.id === '08-study-0'
    ? blocks.filter((block) => block.source?.type === 'table' || ['ch08-b5', 'ja-08-study-0-6'].includes(block.id))
      .flatMap((block) => block.source.type === 'table'
        ? block.source.phraseCells.flat().filter(Boolean) : block.source.phraseIds ?? [])
    : undefined
  return { blocks, lead, preferredIds }
}
