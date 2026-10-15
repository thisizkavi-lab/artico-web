import { createHash } from 'node:crypto'
import { termArt } from './term-art.mjs'
import { plain } from './lesson-parser.mjs'
import { normalizeTerm, vocabularyMeanings } from './vocabulary-meanings.mjs'

// Only explicit teaching examples are collected. Ordinary prose is never split
// into invented speaking lines. IDs use content + section, not array position.
export function addPhraseBank(lesson) {
  const phrases = [],
    byKey = new Map(),
    ids = new Set()
  const add = (en, section, context, extra = {}) => {
    en = en.trim()
    // Strip only a complete enclosing quote pair, never the opening of a quoted title.
    if (en.startsWith('“') && en.endsWith('”')) en = en.slice(1, -1)
    if (!en || /^(?:Check|Outcome|Your goal|Sample|Support|Note):?$/.test(en)) return null
    const key = `${section.id}|${en.toLowerCase()}`
    if (byKey.has(key)) return byKey.get(key)
    const number = parseInt(createHash('sha256').update(key).digest('hex').slice(0, 12), 16)
    const id = extra.id ?? `ch${lesson.id}-p${number}`
    if (ids.has(id)) throw new Error(`Duplicate phrase ID: ${id}`)
    ids.add(id)
    const wordArt =
      lesson.vocabulary.find((word) => word.en.toLowerCase() === en.toLowerCase())?.art ??
      (en.split(/\s+/).length <= 3 ? termArt.find(([pattern]) => pattern.test(en))?.[1] : null)
    phrases.push({
      ...(wordArt ? { art: wordArt.endsWith('.svg') ? wordArt : `word-${wordArt}.svg` } : {}),
      id,
      en,
      section: section.id,
      context: context || section.title,
      kind: en.split(/\s+/).length < 3 && !/[.!?]/.test(en) ? 'word' : 'phrase',
      ...extra,
    })
    byKey.set(key, id)
    return id
  }
  const extract = (runs, section, context) => {
    const found = runs
      .filter((run) => run.emphasis && !/:$/.test(run.text))
      .map((run) => add(run.text, section, context))
      .filter(Boolean)
    // Quoted examples that were not bolded are also explicit source material.
    if (!found.length) {
      for (const match of plain(runs).matchAll(/“([^”\n]{2,250})”/g))
        found.push(add(match[1], section, context))
    }
    return [...new Set(found.filter(Boolean))]
  }
  for (const section of lesson.study) {
    for (const block of section.blocks) {
      block.phraseIds = []
      if (block.type === 'conversation') {
        for (const turn of block.turns) {
          // Preserve each turn and its role, even when two people say the same word.
          const keySection = { ...section, id: `${section.id}|${turn.id}` }
          const id = add(turn.en, keySection, `${turn.speaker} · ${section.title}`, {
            id: turn.id,
            section: section.id,
            speaker: turn.speaker,
            portrait: turn.portrait,
            kind: 'phrase',
          })
          block.phraseIds.push(id)
        }
      } else if (block.type === 'table') {
        const headers = block.header.map(plain)
        const columns = headers.flatMap((header, index) =>
          /^(?:words?|expression|reply|response|pattern|term|form|action|sport|tool|activity words|original example|example|useful phrase|phrase|spoken form|a clear way to say it|something you can say|possible response|place|at the table)$/i.test(
            header,
          ) ||
          (header === 'Choice' && headers[1] === 'Meaning in this setting')
            ? [index]
            : [],
        )
        block.phraseCells = block.rows.map((row) =>
          row.map((cell, index) => {
            if (!columns.includes(index)) return null
            const context = row
              .filter((_, i) => !columns.includes(i))
              .map(plain)
              .join(' · ')
            const id = add(plain(cell), section, context)
            if (id) block.phraseIds.push(id)
            return id
          }),
        )
      } else if (block.items) {
        for (const item of block.items) {
          item.phraseIds = extract(item.runs, section, section.title)
          block.phraseIds.push(...item.phraseIds)
        }
      } else if (lesson.id === '53' && section.title === 'Connected model' && block.runs) {
        if (!plain(block.runs).startsWith('“')) continue
        block.phraseIds = [
          add(plain(block.runs).replace(/^“|”$/g, ''), section, 'Presenter · Connected model', {
            id: block.id,
            kind: 'phrase',
          }),
        ]
      } else if (block.runs) {
        const label =
          block.runs.length === 1 && block.runs[0].emphasis && !/[.!?]/.test(block.runs[0].text)
        if (!label) block.phraseIds = extract(block.runs, section, section.title)
      } else if (block.paragraphs && block.type !== 'email') {
        block.phraseIds = block.paragraphs.flatMap((runs) => extract(runs, section, section.title))
      }
      block.phraseIds = [...new Set(block.phraseIds)]
    }
  }
  // One exact source location per phrase. Repeated mentions still remain in the
  // explanation, but do not create duplicate DOM anchors or checklist entries.
  const anchored = new Set()
  for (const section of lesson.study)
    for (const block of section.blocks) {
      block.phraseIds = block.phraseIds.filter((id) => {
        if (anchored.has(id)) return false
        anchored.add(id)
        return true
      })
    }
  for (const word of lesson.vocabulary) {
    const equivalent = phrases.find((item) => item.en.toLowerCase() === word.en.toLowerCase())
    add(
      word.en,
      { id: 'words', title: 'Words & phrases' },
      vocabularyMeanings[normalizeTerm(word.en)] ?? equivalent?.context ?? (() => { throw new Error(`Missing English meaning: ${lesson.id} / ${word.en}`) })(),
      {
        id: word.id,
        art: word.art,
        kind: 'word',
      },
    )
  }
  lesson.phraseBank = phrases
  return lesson
}
