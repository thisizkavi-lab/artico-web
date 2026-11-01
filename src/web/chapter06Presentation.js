// Chapter 06 pilot decisions. Keep these local until the pilot is reviewed.
const hiddenSceneLabels = new Set([
  'ch06-b1', 'ja-06-study-0-1',
  'ch06-b11', 'ja-06-study-2-2',
])
const noteBlocks = new Set([
  'ch06-b5', 'ja-06-study-0-3', 'ja-06-study-0-11',
  'ch06-b8', 'ja-06-study-1-2',
  'ch06-b10', 'ja-06-study-2-1',
  'ch06-b13', 'ja-06-study-2-4', 'ja-06-study-2-5',
  'ch06-b15', 'ja-06-study-3-1',
])
const plain = (runs = []) => runs.map((run) => run.text).join('')

export function chapter06Presentation(section, byId) {
  const entries = []
  let replies
  for (const block of section.blocks) {
    if (hiddenSceneLabels.has(block.id)) continue
    const source = block.source
    if (section.id === '06-study-0' && source?.type === 'list') {
      if (!replies) {
        replies = { type: 'reply-table', id: '06-replies', groups: [] }
        entries.push(replies)
      }
      replies.groups.push({ source, rows: source.items.map((item, index) => {
        const text = plain(item.runs)
        const divider = text.indexOf(' — ')
        const ids = item.phraseIds ?? source.phraseIds ?? []
        const phraseId = ids.find((id) => byId[id]?.en === text) ?? ids[index]
        return { statement: text.slice(0, divider), reply: text.slice(divider + 3), phraseId }
      }) })
      continue
    }
    // Japanese source has an explanation immediately after each reply example.
    // Keep it beside that reply, rather than leaving three disconnected lists.
    if (replies && source?.type === 'explanation' && /^\s{2}/.test(plain(source.runs))) {
      replies.groups.at(-1).rows.at(-1).annotation = source
      continue
    }
    if (section.id === '06-study-3' && source?.type === 'list') {
      entries.push({ type: 'intention-table', id: block.id, source,
        rows: source.items.map((item) => ({
          expression: item.runs.filter((run) => run.emphasis),
          meaning: item.runs.filter((run) => !run.emphasis),
        })),
      })
      continue
    }
    entries.push(noteBlocks.has(block.id) ? { ...block, type: 'note' } : block)
  }
  const firstTable = section.blocks.find((block) => block.source?.type === 'table')
  return {
    entries,
    // Reply pairs are taught in their comparison table, not repeated as long pills.
    boardIds: section.id === '06-study-0' ? firstTable?.source.phraseIds : undefined,
  }
}
