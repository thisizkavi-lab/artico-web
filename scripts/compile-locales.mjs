import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseLesson, plain } from './lesson-parser.mjs'
import { foundationReading } from '../src/course/foundations-en.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const base = resolve(root, 'src/course/locales/ja')
const catalog = JSON.parse(await readFile(resolve(root, 'src/course/catalog.json'), 'utf8'))
const norm = (text) => text.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim()
const hasJapanese = (text) => /[\u3040-\u30ff\u3400-\u9fff]/.test(text)
const textOf = (block) => block.runs ? plain(block.runs) : block.items ? block.items.map((item) => plain(item.runs)).join('\n') : block.rows ? block.rows.map((row) => row.map(plain).join(' ')).join('\n') : block.paragraphs ? block.paragraphs.map(plain).join('\n') : ''

export function parseJapaneseChapter(source, english) {
  const labels = new Map()
  let heading = null
  // Associate headings before removing editorial comments; prose is never translated at runtime.
  heading = null
  const cooked = []
  for (let line of source.split('\n')) {
    const marker = line.match(/<!-- source-heading: (.+) -->/)
    if (marker) { heading = marker[1]; continue }
    if (/^<!--/.test(line)) continue
    const h = line.match(/^(#{2,4})\s+(.+)/)
    if (h && heading) {
      const key = h[1] === '##' ? heading.replace(/^(?:Study|Practice):?\s*/, '').trim() : heading
      labels.set(key, h[2].replace(/^(?:学習|学ぶ|練習|Study|Practice)(?:\s*[：:—–-]\s*|\s+)/, ''))
      line = `${h[1]} ${heading}`
      heading = null
    }
    line = line.replace(/^\*\*この章でできるようになること[:：]\*\*/, '**Your goal:**')
    if (/^\s{2,}\S/.test(line) && /^\d+\. /.test(cooked.at(-1) ?? '')) cooked[cooked.length - 1] += ` ${line.trim()}`
    else cooked.push(line)
  }
  const parsed = parseLesson(cooked.join('\n').trim(), english.id)
  const jaTitle = source.match(/^# CH\d+\s*[—–-]\s*(.+?)\s*\/\s*.+$/m)?.[1] ?? english.ja
  const phrases = english.phraseBank.map((item) => ({ ...item, context: '', ja: item.ja ?? '' }))
  const usedPhrases = new Set()
  const conversationIds = new Set(english.study.flatMap((section) => section.blocks.filter((block) => block.type === 'conversation').flatMap((block) => block.phraseIds)))
  for (const mode of ['study', 'practice']) {
    const originals = english[mode]
    parsed[mode].forEach((section, sectionIndex) => {
      const original = originals.find((item) => item.title === section.title) ?? originals[sectionIndex]
      section.id = original?.id ?? `${english.id}-${mode}-ja-${sectionIndex}`
      section.title = labels.get(section.title) ?? ({ 'Start here': 'この章のはじめに', 'Take your turn': '自分で試す' }[section.title]) ?? section.title
      const conversations = original?.blocks.filter((block) => block.type === 'conversation') ?? []
      const lists = original?.blocks.filter((block) => block.type === 'list' && block.ordered) ?? []
      let conversationIndex = 0, listIndex = 0
      section.blocks.forEach((block, blockIndex) => {
        block.id = `ja-${section.id}-${blockIndex}`
        if (block.type === 'answerHeading') block.runs = [{ text: labels.get(plain(block.runs)) ?? plain(block.runs) }]
        if (mode === 'practice' && /^(?:答えの例|返答例|言い方の例|短い発表の例|答えが分からない場合の例|返答・書き直しの例|手紙の本文の例|会話の例|書き直しの例)[：:]/.test(textOf(block))) block.type = 'answer'
        if (block.type === 'list' && block.ordered && lists[listIndex]) block.id = lists[listIndex++].id
        if (block.type === 'conversation') {
          const conversation = conversations[conversationIndex++]
          if (!conversation || block.turns.some((turn, index) => norm(plain(turn.runs)) !== norm(conversation.turns[index]?.en ?? '')))
            throw new Error(`${english.id}: Japanese conversation does not match its English recording identity (${section.title})`)
          Object.assign(block, { ...conversation, caption: section.title })
          block.phraseIds?.forEach((id) => usedPhrases.add(id))
          return
        }
        const content = norm(textOf(block))
        const candidates = phrases.filter((item) => {
          if (item.section !== section.id || conversationIds.has(item.id)) return false
          if (block.type === 'table') return block.rows.some((row) => row.some((cell) => norm(plain(cell)).toLowerCase() === norm(item.en).toLowerCase()))
          return content.toLowerCase().includes(norm(item.en).toLowerCase())
        })
        block.phraseIds = mode === 'study' ? candidates.filter((item) => !usedPhrases.has(item.id)).map((item) => item.id) : []
        for (const item of candidates) {
          item.context ||= section.title
          if (block.type === 'table') {
            const row = block.rows.find((row) => row.some((cell) => norm(plain(cell)).toLowerCase() === norm(item.en).toLowerCase()))
            const gloss = row?.map(plain).filter(hasJapanese).join(' · ')
            if (gloss) item.context = gloss
          }
        }
        block.phraseIds.forEach((id) => usedPhrases.add(id))
        if (block.type === 'table' && block.phraseIds.length) {
          block.phraseCells = block.rows.map((row) => row.map((cell) => candidates.find((item) => norm(item.en).toLowerCase() === norm(plain(cell)).toLowerCase())?.id ?? null))
        }
      })
    })
  }
  for (const item of phrases) {
    const section = parsed.study.find((section) => section.id === item.section)
    item.context ||= item.ja || section?.title || 'この章の関連語'
    if (item.section === 'words') {
      const equivalent = phrases.find((other) => other.section !== 'words' && norm(other.en).toLowerCase() === norm(item.en).toLowerCase())
      item.context = equivalent?.context ?? english.vocabulary.find((word) => word.id === item.id)?.ja ?? 'この章の関連語'
    }
    // Keep every established practice ID available and reachable in both languages.
    if (section && !conversationIds.has(item.id) && !usedPhrases.has(item.id)) {
      section.blocks.push({ type: 'explanation', id: `ja-card-${item.id}`, runs: [], phraseIds: [item.id] })
      usedPhrases.add(item.id)
    }
  }
  return { ...english, study: parsed.study, practice: parsed.practice, goal: parsed.goal, ja: jaTitle, phraseBank: phrases, language: 'ja' }
}

await mkdir(resolve(base, 'lessons'), { recursive: true })
const titles = {}
for (const chapter of catalog) {
  const source = await readFile(resolve(base, 'chapters', chapter.filename), 'utf8')
  const english = JSON.parse(await readFile(resolve(root, 'src/course/lessons', `${chapter.id}.json`), 'utf8'))
  const lesson = parseJapaneseChapter(source, english)
  titles[chapter.id] = { title: lesson.ja, goal: lesson.goal }
  await writeFile(resolve(base, 'lessons', `${chapter.id}.json`), `${JSON.stringify(lesson)}\n`)
}
await writeFile(resolve(base, 'catalog.json'), `${JSON.stringify(titles, null, 2)}\n`)

const foundation = {}
const files = ['00-orientation.md', '01-how-artico-works.md', '02-foundations.md', '03-tongue-twisters-and-lr.md']
const blocks = (body, id) => parseLesson(`# CH${id} — Foundation\n## Study: Content\n${body.replace(/<!--.*?-->/g, '').replace(/^#{4,5} (.+)$/gm, '**$1**')}`, id).study.flatMap((section) => section.blocks)
for (const file of files) {
  const source = await readFile(resolve(base, file), 'utf8')
  for (const unit of source.split(/(?=<!-- lesson: )/).filter((part) => part.startsWith('<!-- lesson:'))) {
    const id = unit.match(/<!-- lesson: ([^ |]+)/)[1]
    const title = unit.match(/^# .+? — (.+?) \/ /m)[1]
    const subtitle = unit.match(/^\*\*このレッスンで(?:できるようになること|考えること)[:：]\*\*\s*(.*)/m)?.[1] ?? ''
    const [study, practice = ''] = unit.split(/^## Practice[^\n]*\n/m)
    const sections = []
    for (const part of study.split(/(?=<!-- section: )/).slice(1)) {
      const sectionId = part.match(/<!-- section: ([^ ]+) -->/)[1]
      const sectionTitle = part.match(/^### \d+ (.+)/m)[1]
      const body = part.replace(/^<!--[^\n]*\n###[^\n]*\n/, '')
      const original = foundationReading[id]?.sections.find((section) => section.id === sectionId)
      const content = []
      if (sectionId === 'tongue-collection') {
        const [intro, ...twisters] = body.split(/(?=<!-- twister: )/)
        content.push(...blocks(intro, sectionId))
        for (const segment of twisters) {
          const twisterId = segment.match(/<!-- twister: ([^ ]+) -->/)[1]
          content.push({ type: 'twister', id: twisterId, blocks: blocks(segment, twisterId) })
        }
      } else content.push(...blocks(body, sectionId))
      sections.push({ id: sectionId, title: sectionTitle, blocks: content, video: original?.video, widget: original?.widget === 'alphabet' ? 'alphabet' : undefined })
    }
    foundation[id] = { title, subtitle, sections, practice: blocks(practice.replace(/^\*\*次のレッスン[^\n]*$/gm, ''), `${id}-practice`) }
  }
}
await writeFile(resolve(base, 'foundations.json'), `${JSON.stringify(foundation)}\n`)
console.log(`Prepared Japanese explanations for ${catalog.length} chapters and ${Object.keys(foundation).length} foundation/orientation lessons.`)
