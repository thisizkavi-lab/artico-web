import { chapterPhraseIllustrations } from './chapterPhraseIllustrations.js'

// Keep the chapter's own ordering and identifiers: audio, progress, and deep links
// depend on these IDs. Conversation turns remain in the conversation below.
export function sectionPhraseIds(section, byId, preferredIds) {
  const ids = preferredIds ?? section.blocks.flatMap((block) => {
    if (block.type === 'source') return block.source.phraseIds ?? []
    if (block.type === 'phrases') return block.phrases ?? []
    return []
  })
  return [...new Set(ids)].filter((id) => byId[id] && !/-line\d+$/.test(id))
}

// Prefer curated art, then existing conversation scenes. An explicit null
// fallback keeps section artwork separate from conversation artwork.
export function sectionPhraseArtwork(section, sectionIndex, chapterId, override) {
  const scene = section.blocks.find((block) => block.type === 'conversation' && block.art)
  const existingScene = scene?.art || section.blocks.find((block) => block.sceneArt || block.source?.art)?.sceneArt ||
    section.blocks.find((block) => block.type === 'source' && block.source?.art)?.source.art
  const curated = override ?? chapterPhraseIllustrations[chapterId]?.[sectionIndex]
  if (curated?.file) {
    const fallbackFile = Object.prototype.hasOwnProperty.call(curated, 'fallbackFile')
      ? curated.fallbackFile
      : existingScene
    return { file: curated.file, fallbackFile, alt: curated.alt ?? section.title }
  }
  if (existingScene) return { file: existingScene, alt: scene?.alt ?? section.title }
  return null
}
