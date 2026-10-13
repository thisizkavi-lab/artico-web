import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import designs from '../src/course/chapter-designs.js'
import { addPhraseBank } from './phrase-bank.mjs'
import { parseLesson, plain } from './lesson-parser.mjs'
import { objectSvg, portraitName, portraitSvg, sceneSvg } from './course-art.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const dataDir = resolve(root, 'src/course/lessons')
const artDir = resolve(root, 'public/assets/course')
await mkdir(dataDir, { recursive: true })
await mkdir(artDir, { recursive: true })
const catalog = JSON.parse(await readFile(resolve(root, 'src/course/catalog.json'), 'utf8'))
const audit = [],
  objects = new Set(),
  portraits = new Set()
for (const chapter of catalog) {
  const source = await readFile(resolve(root, 'src/course/chapters', chapter.filename), 'utf8')
  const lesson = parseLesson(source, chapter.id)
  const design = designs[chapter.id]
  if (!design) throw new Error(`No visual editorial plan for chapter ${chapter.id}`)
  let sceneIndex = 0
  const dialogues = []
  for (const section of [...lesson.study, ...lesson.practice]) {
    section.ja = design.sectionNotes?.[section.title] ?? ''
    section.theme = design.theme
    for (const block of section.blocks) {
      if (block.type !== 'conversation') continue
      const people = [
        ...new Set(block.turns.map((turn) => design.people?.[turn.speaker] ?? turn.speaker)),
      ]
      const theme = design.sceneThemes?.[sceneIndex] ?? design.theme
      block.art = `ch${chapter.id}-scene-${sceneIndex}.svg`
      block.theme = theme
      block.people = people
      block.caption = `${section.title} · ${people.join(' & ')}`
      for (const turn of block.turns) {
        turn.person = design.people?.[turn.speaker] ?? turn.speaker
        turn.en = plain(turn.runs).trim()
        turn.ja = design.translations?.[turn.en] ?? ''
        turn.portrait = `portrait-${portraitName(turn.person, chapter.id)}.svg`
        if (!portraits.has(turn.portrait)) {
          await writeFile(
            resolve(artDir, turn.portrait),
            portraitSvg(
              turn.person,
              ['A', 'B', 'You', 'Friend'].includes(turn.person) ? chapter.id : '',
            ),
          )
          portraits.add(turn.portrait)
        }
      }
      if (design.approvedScenes?.[sceneIndex])
        await copyFile(
          resolve(root, 'public/assets/figma', design.approvedScenes[sceneIndex]),
          resolve(artDir, block.art),
        )
      else
        await writeFile(
          resolve(artDir, block.art),
          sceneSvg(
            theme,
            people,
            ['A', 'B', 'You', 'Friend'].some((name) => people.includes(name)) ? chapter.id : '',
            `${lesson.title}: ${people.join(', ')}`,
          ),
        )
      dialogues.push(block)
      sceneIndex++
    }
  }
  const first = dialogues[0]
  lesson.hero = first?.art ?? `ch${chapter.id}-overview.svg`
  if (!first)
    await writeFile(
      resolve(artDir, lesson.hero),
      sceneSvg(design.theme, [], chapter.id, lesson.title),
    )
  lesson.vocabulary = design.vocabulary.map((item, index) => {
    objects.add(item.art)
    return { ...item, id: `ch${chapter.id}-v${index}`, art: `word-${item.art}.svg` }
  })
  lesson.ja = design.ja
  lesson.note = design.note
  lesson.diagram = design.diagram ?? null
  lesson.conversationStyle = design.conversationStyle ?? 'spoken'
  lesson.sourceHash = createHash('sha256').update(source).digest('hex')
  // Shadowing starts from complete turns; vocabulary-led chapters use their
  // chosen small subset. No generated dialogue or guessed audio is introduced.
  lesson.rehearsal = dialogues.flatMap((block) =>
    block.turns.map((turn) => ({
      id: turn.id,
      en: turn.en,
      ja: turn.ja,
      speaker: turn.speaker,
      person: turn.person,
      portrait: turn.portrait,
      art: block.art,
      section: block.caption,
    })),
  )
  if (!lesson.rehearsal.length)
    lesson.rehearsal = lesson.vocabulary.map((item) => ({ ...item, section: 'Words & phrases' }))
  if (chapter.id === '53') {
    const connected = lesson.study.find((section) => section.title === 'Connected model')
    if (connected)
      lesson.rehearsal = [
        ...connected.blocks
          .filter((block) => block.type === 'explanation')
          .slice(0, 5)
          .map((block) => ({
            id: block.id,
            en: plain(block.runs),
            ja: '目的と、次に続く内容を意識して話します。',
            speaker: 'Presenter',
            art: lesson.hero,
            section: 'Connected model',
          })),
        ...lesson.rehearsal,
      ]
  }
  if (chapter.id === '02') {
    const coworker = lesson.rehearsal.length
    const file = 'ch02-coworker-phrase.svg'
    await writeFile(
      resolve(artDir, file),
      sceneSvg('office', ['Maya', 'Jordan'], '', 'I work with Jordan.'),
    )
    lesson.rehearsal.push({
      id: 'ch02-v4',
      en: 'I work with Jordan.',
      ja: 'ジョーダンと仕事をしています。',
      speaker: 'Maya',
      portrait: lesson.rehearsal[0].portrait,
      art: file,
      section: 'Useful personal details',
    })
    lesson.rehearsalAliases = {
      first: 0,
      friend: 7,
      'phrase-friend': 0,
      'phrase-coworker': coworker,
    }
  }
  const rehearsalIds = new Set(lesson.rehearsal.map((line) => line.id))
  lesson.rehearsal.push(
    ...lesson.vocabulary
      .filter((item) => !rehearsalIds.has(item.id))
      .map((item) => ({ ...item, section: 'Words & phrases' })),
  )
  addPhraseBank(lesson)
  await writeFile(resolve(dataDir, `${chapter.id}.json`), `${JSON.stringify(lesson)}\n`)
  chapter.goal = lesson.goal
  chapter.hero = lesson.hero
  audit.push({
    id: lesson.id,
    title: lesson.title,
    theme: design.theme,
    diagram: lesson.diagram,
    scenes: dialogues.length,
    casts: dialogues.map((dialogue) => dialogue.people),
    vocabulary: lesson.vocabulary.map((item) => item.en),
    studySections: lesson.study.map((section) => section.title),
    practiceSections: lesson.practice.map((section) => section.title),
    rehearsalItems: lesson.rehearsal.length,
    practiceItems: lesson.phraseBank.length,
    sourceHash: lesson.sourceHash,
  })
}
for (const name of objects) await writeFile(resolve(artDir, `word-${name}.svg`), objectSvg(name))
await writeFile(resolve(root, 'src/course/catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`)
await writeFile(
  resolve(root, 'src/course/lesson-design-audit.json'),
  `${JSON.stringify(audit, null, 2)}\n`,
)
console.log(
  `Prepared ${audit.length} illustrated chapters, ${audit.reduce((sum, chapter) => sum + chapter.scenes, 0)} conversations, ${objects.size} vocabulary illustrations and ${portraits.size} character portraits.`,
)
