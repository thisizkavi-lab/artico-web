// Stable left/right positions and visual pairing for spoken exchanges.
export function conversationSide(speakers, speaker, index) {
  const position = speaker ? speakers.indexOf(speaker) : index
  return (position < 0 ? index : position) % 2 === 1 ? 'outgoing' : 'incoming'
}

// Short headings can sit above the second illustration without losing
// their original reading order or moving substantive explanations.
const isBridge = (block) => {
  if (!block) return false
  if (block.type === 'label') return String(block.text ?? '').length <= 90
  if (block.type !== 'source' || block.source?.type !== 'explanation') return false
  const source = block.source
  const text = (source.runs ?? []).map((run) => run.text ?? '').join('')
  return (source.phraseIds ?? []).length === 0 && text.length > 0 && text.length <= 90
}

// Pair consecutive illustrated dialogues, optionally separated by a
// short title. Never swallow or reorder explanatory lesson material.
export function groupConversationScenes(blocks) {
  const grouped = []
  for (let i = 0; i < blocks.length; i++) {
    const first = blocks[i], following = blocks[i + 1]
    if (first.type === 'conversation' && first.art) {
      if (following?.type === 'conversation' && following.art) {
        grouped.push({ type: 'conversation-pair', conversations: [first, following] })
        i++
        continue
      }
      const afterHeading = blocks[i + 2]
      if (isBridge(following) && afterHeading?.type === 'conversation' && afterHeading.art) {
        grouped.push({ type: 'conversation-pair', conversations: [first, afterHeading], bridge: following })
        i += 2
        continue
      }
    }
    grouped.push(first)
  }
  return grouped
}
