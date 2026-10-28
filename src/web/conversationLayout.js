// Stable left/right positions and visual pairing for spoken exchanges.
export function conversationSide(speakers, speaker, index) {
  const position = speaker ? speakers.indexOf(speaker) : index
  return (position < 0 ? index : position) % 2 === 1 ? 'outgoing' : 'incoming'
}

// Only adjacent illustrated dialogues are paired. Content between them
// separates the scenes, preserving the original study order.
export function groupConversationScenes(blocks) {
  const grouped = []
  for (let i = 0; i < blocks.length; i++) {
    const first = blocks[i], second = blocks[i + 1]
    if (first.type === 'conversation' && first.art && second?.type === 'conversation' && second.art) {
      grouped.push({ type: 'conversation-pair', conversations: [first, second] })
      i++
    } else grouped.push(first)
  }
  return grouped
}
