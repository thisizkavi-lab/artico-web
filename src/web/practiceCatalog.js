// Study keeps every source occurrence. Practice uses individual speaking targets,
// with aliases back to those stable Study anchors and saved selections.
export const normalizePracticeText = (text = '') => text.toLowerCase()
  .replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
  .replace(/[.!?…]+$/, '').replace(/\s+/g, ' ').trim()

function partId(item, text) {
  let hash = 2166136261
  for (const char of `practice-part:${item.id}:${text}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return `${item.id.split('-')[0]}-p${hash >>> 0}`
}

export function practiceParts(item) {
  if (item.speaker) return [item.en]
  if (item.id === 'ch80-p263324456941496')
    return ['head', 'ears', 'neck', 'shoulders', 'chest', 'back', 'arms', 'hands', 'hips', 'legs', 'knees', 'ankles', 'feet']
  if (item.en === "It's sunny / cloudy / windy / foggy.")
    return ["It's sunny.", "It's cloudy.", "It's windy.", "It's foggy."]
  if (item.en === "It's getting better / worse")
    return ["It's getting better.", "It's getting worse."]
  if (item.en.includes(' / ')) {
    const [prompt, responses] = item.en.split(' — ')
    return responses ? [prompt, ...responses.split(' / ')] : item.en.split(/\s*;\s*|\s+\/\s+/)
  }
  if (/^ch(?:14|20)-/.test(item.id) && item.en.includes(';')) return item.en.split(/;\s*/)
  return [item.en]
}

export function buildPracticeCatalog(model) {
  const items = [], aliases = {}, byKey = new Map()
  // Glossary-only entries are not independent practice targets. Process them
  // afterward only to preserve links and artwork for words already taught.
  const teaching = model.phrases.filter((item) => item.section !== 'words')
  const glossary = model.phrases.filter((item) => item.section === 'words')
  for (const source of [...teaching, ...glossary]) {
    // This is explicitly a counterexample in Greetings, not a greeting to rehearse.
    if (source.id.startsWith('ch01-') && normalizePracticeText(source.en) === 'i lost my phone') continue
    const parts = practiceParts(source)
    const targets = []
    for (const en of parts) {
      const normalized = normalizePracticeText(en)
      const key = `${source.section}|${normalized}`
      // An illustrated glossary entry can refer back to its already-taught word.
      const equivalent = byKey.get(key) ?? (source.section === 'words'
        ? items.find((item) => normalizePracticeText(item.en) === normalized)?.id : undefined)
      // A word that exists only in the redundant glossary is intentionally
      // absent from both the chooser and the shadowing session.
      if (source.section === 'words' && !equivalent) continue
      if (equivalent) {
        const existing = items.find((item) => item.id === equivalent)
        if (!existing.art && source.art && parts.length === 1) existing.art = source.art
        if (source.section === 'words' && existing.kind === 'word') existing.context = source.context
        targets.push(equivalent)
      }
      else {
        const id = parts.length === 1 ? source.id : partId(source, en)
        items.push({ ...source, id, en: en.trim(), studyId: source.id,
          ...(parts.length > 1 ? { art: undefined, kind: en.trim().split(/\s+/).length < 3 ? 'word' : 'phrase' } : {}) })
        byKey.set(key, id)
        targets.push(id)
      }
    }
    aliases[source.id] = [...new Set(targets)]
  }
  // Curated lessons replace source IDs while keeping saved practice compatible.
  for (const [previous, replacement] of Object.entries(model.aliases ?? {})) {
    const sources = Array.isArray(replacement) ? replacement : [replacement]
    aliases[previous] = [...new Set(sources.flatMap((id) => aliases[id] ?? []))]
  }
  // Begin with one complete scene where available; vocabulary lessons use their
  // authored illustrated subset. A presentation starts with its connected model.
  const firstConversation = model.sections.flatMap((section) => section.blocks)
    .find((block) => block.type === 'conversation')
  let candidates = model.starterIds ?? firstConversation?.phrases
  if (!model.starterIds && model.id === '01') candidates = ['ch01-line17', 'ch01-line18', 'ch01-line40', 'ch01-line41', 'ch01-line42']
  if (model.id === '53') candidates = model.phrases.filter((item) => /^ch53-b/.test(item.id)).map((item) => item.id)
  if (!candidates?.length) candidates = model.phrases.filter((item) => item.section === 'words').map((item) => item.id)
  const starterIds = [...new Set((candidates ?? []).flatMap((id) => aliases[id] ?? []))].slice(0, 8)
  if (!starterIds.length) starterIds.push(...items.slice(0, 6).map((item) => item.id))
  return { items, aliases, starterIds }
}
