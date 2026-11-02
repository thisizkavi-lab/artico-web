import { vocabularyChapters } from './socialStudyLayout.js'

const chapter08Notes = new Set(['ch08-b2', 'ja-08-study-0-2', 'ch08-b15', 'ja-08-study-3-0', 'ja-08-study-3-1'])
const chapter07Notes = new Set([
  'ch07-b4', 'ch07-b5', 'ch07-b7', 'ch07-b12',
  'ja-07-study-0-4', 'ja-07-study-0-5', 'ja-07-study-1-0',
  'ja-07-study-1-2', 'ja-07-study-1-3', 'ja-07-study-2-4', 'ja-07-study-2-5',
])
const hiddenChapter07Blocks = new Set(['ch07-b15', 'ja-07-study-2-8'])
const customLayouts = new Set(['01', '02', '03', '06', '11', '14'])
const vocabularyTables = new Set(['20', '65', '69', '72', '78', '80'])
const plain = (runs = []) => runs.map((run) => run.text).join('')
const normalize = (value = '') => value.normalize('NFKC').replace(/[‘’]/g, "'").toLowerCase()
const sourceText = (block) => block.type === 'conversation'
  ? (block.turns ?? []).map((turn) => turn.en ?? plain(turn.runs)).join(' ')
  : block.source?.runs ? plain(block.source.runs)
    : block.source?.rows ? block.source.rows.flat().map(plain).join(' ')
      : (block.source?.items ?? []).map((item) => plain(item.runs)).join(' ')

export function isExpressionMeaningList(source) {
  return source?.type === 'list' && !source.ordered && source.items.length > 1 &&
    source.items.every((item) => item.runs[0]?.emphasis &&
      item.runs.slice(1).some((run) => !run.emphasis && run.text.trim()))
}

function comparisonTable(source, chapterId, language) {
  const vocabulary = vocabularyTables.has(chapterId)
  const options = chapterId === '73'
  const labels = language === 'ja'
    ? options ? ['プラン', '詳細'] : vocabulary ? ['語句', '意味'] : ['表現', '伝えること']
    : options ? ['Option', 'Details'] : vocabulary ? ['Term', 'Meaning'] : ['Expression', 'What it means']
  return { ...source, type: 'table', presentation: 'expression-meaning', items: undefined,
    header: labels.map((text) => [{ text }]),
    rows: source.items.map((item) => [item.runs.slice(0, 1), item.runs.slice(1)]),
    phraseCells: source.items.map((item, index) => [item.phraseIds?.[0] ?? source.phraseIds?.[index], null]),
  }
}

function supportingExplanation(block, chapterId, earlierText, byId) {
  const source = block.source
  if (!byId || source?.type !== 'explanation') return false
  const text = plain(source.runs)
  if (text.trim().length < 65 || text.length > 680) return false
  // Keep a term's first definition at normal reading size. Complete phrases in
  // other chapters also remain prominent in their separate expression board.
  return !(source.phraseIds ?? []).some((id) => {
    const item = byId[id]
    return item && (item.kind === 'word' || vocabularyChapters.has(chapterId)) &&
      !normalize(earlierText).includes(normalize(item.en))
  })
}

// Presentation changes preserve source wording, IDs, and the bilingual lessons.
export function illustratedStudyPresentation(section, chapterId, language, byId) {
  let caption
  const blocks = []
  let earlierText = ''
  let followingConversation = false
  const custom = customLayouts.has(chapterId)
  for (const [index, block] of section.blocks.entries()) {
    if (chapterId === '07' && hiddenChapter07Blocks.has(block.id)) continue
    const source = block.source
    const next = section.blocks[index + 1]
    if (!custom && source?.type === 'explanation' && !source.phraseIds?.length &&
      source.runs.length === 1 && source.runs[0].emphasis && plain(source.runs).length <= 100 &&
      next?.type === 'conversation') {
      caption = { title: plain(source.runs), id: block.id }
      followingConversation = false
      continue
    }
    if (block.type === 'conversation') {
      blocks.push(caption ? { ...block, studyTitle: caption.title, captionSourceId: caption.id } : block)
      caption = undefined
      earlierText += ' ' + sourceText(block)
      followingConversation = true
      continue
    }
    if (!custom && isExpressionMeaningList(source)) {
      blocks.push({ ...block, source: comparisonTable(source, chapterId, language) })
      earlierText += ' ' + sourceText(block)
      followingConversation = false
      continue
    }
    const note = !custom && (chapterId === '07' && chapter07Notes.has(block.id) ||
      chapterId === '08' && chapter08Notes.has(block.id) ||
      followingConversation && supportingExplanation(block, chapterId, earlierText, byId))
    blocks.push(note
      ? { ...block, source: { ...block.source, teachingNote: 'Note' } } : block)
    earlierText += ' ' + sourceText(block)
    if (source?.type !== 'explanation') followingConversation = false
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
