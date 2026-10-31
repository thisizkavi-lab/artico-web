import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import designs from '../src/course/chapter-designs.js'
import { addPhraseBank } from './phrase-bank.mjs'
import { parseLesson } from './lesson-parser.mjs'
import { introductionAliases, introductionById, introductionSections } from '../src/course/introductions.js'
import { foundationReading, twisterGuidance } from '../src/course/foundations-en.js'
import { allTwisters } from '../src/data.js'

const root = new URL('../', import.meta.url)
const catalog = JSON.parse(readFileSync(new URL('src/course/catalog.json', root), 'utf8'))
const readLesson = (id) =>
  JSON.parse(readFileSync(new URL(`src/course/lessons/${id}.json`, root), 'utf8'))
const words = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
const runs = (values) => values.map((value) => value.text).join('')
function blockText(block) {
  if (block.turns)
    return block.turns.map((turn) => `${turn.speaker}: ${runs(turn.runs)}`).join('\n')
  if (block.header)
    return [block.header, ...block.rows].map((row) => row.map(runs).join(' ')).join('\n')
  if (block.paragraphs) return block.paragraphs.map(runs).join('\n')
  if (block.items)
    return block.items.map((item) => `${item.number ?? ''} ${runs(item.runs)}`).join('\n')
  return runs(block.runs)
}
test('all 96 chapters preserve every source block, not only the opening dialogue', () => {
  assert.equal(Object.keys(designs).length, 96)
  for (const chapter of catalog) {
    const source = readFileSync(new URL(`src/course/chapters/${chapter.filename}`, root), 'utf8')
    const model = readLesson(chapter.id)
    assert.equal(model.sourceHash, createHash('sha256').update(source).digest('hex'), chapter.id)
    assert.ok(model.goal.length > 30, `${chapter.id}: meaningful goal`)
    assert.ok(model.study.length, `${chapter.id}: Study content`)
    assert.ok(model.practice.length, `${chapter.id}: Practice content`)
    const lines = source.split('\n')
    for (const section of [...model.study, ...model.practice])
      for (const block of section.blocks) {
        const original = lines.slice(block.span[0], block.span[1] + 1).join('\n')
        assert.equal(
          words(blockText(block)),
          words(original),
          `${chapter.id} ${block.id}: source text was lost or changed`,
        )
      }
    const covered = new Set(model.coveredLines)
    lines.forEach((line, index) => {
      if (line.trim()) assert.ok(covered.has(index), `${chapter.id}: omitted source line ${index}`)
    })
  }
})
test('every scene uses its actual cast and every referenced illustration exists', () => {
  let conversations = 0
  const image = (file) => assert.ok(existsSync(new URL(`public/assets/course/${file}`, root)), file)
  for (const chapter of catalog) {
    const model = readLesson(chapter.id)
    image(model.hero)
    model.vocabulary.forEach((item) => {
      image(item.art)
      assert.ok(item.ja)
      assert.ok(item.en)
      assert.ok(
        model.rehearsal.some((line) => line.id === item.id),
        `${chapter.id}: saved word must be available in practice`,
      )
    })
    for (const section of model.study)
      for (const block of section.blocks)
        if (block.type === 'conversation') {
          conversations++
          assert.deepEqual(block.people, [
            ...new Set(block.turns.map((turn) => turn.person ?? turn.speaker)),
          ])
          assert.ok(
            block.people.length >= 2 && block.people.length <= 4,
            `${chapter.id}: cast cannot be truncated`,
          )
          image(block.art)
          block.turns.forEach((turn) => {
            image(turn.portrait)
            assert.ok(turn.en)
          })
        }
  }
  assert.ok(conversations > 300)
})
test('vocabulary chapters rehearse a usable subset and introduction practice includes all three contexts', () => {
  for (const id of ['14', '20', '26', '45', '56', '65', '72', '80', '88']) {
    const model = readLesson(id)
    assert.ok(model.vocabulary.length >= 4)
    assert.ok(model.rehearsal.length >= 4)
    assert.ok(model.note)
  }
  const introduction = readLesson('02')
  const speakers = introduction.rehearsal.map((line) => line.speaker)
  assert.ok(speakers.includes('Satoshi'))
  assert.ok(speakers.includes('Daniel'))
  assert.ok(speakers.includes('Sam'))
  assert.equal(introduction.rehearsalAliases.friend, 7)
  assert.ok(readLesson('53').rehearsal.some((line) => line.section === 'Connected model'))
})

test('every shared practice item has exactly one Study anchor and a valid illustration', () => {
  for (const chapter of catalog) {
    const model = readLesson(chapter.id)
    const bank = model.phraseBank
    const ids = bank.map((item) => item.id)
    assert.equal(new Set(ids).size, ids.length, `${chapter.id}: duplicate IDs`)
    for (const item of model.rehearsal)
      assert.ok(
        ids.includes(item.id) ||
          (chapter.id === '02' && introductionById[introductionAliases[item.id]]),
        `${chapter.id}: legacy practice item ${item.id} missing`,
      )
    const anchors = model.study.flatMap((section) =>
      section.blocks.flatMap((block) => block.phraseIds),
    )
    anchors.push(...bank.filter((item) => item.section === 'words').map((item) => item.id))
    assert.deepEqual([...anchors].sort(), [...ids].sort(), `${chapter.id}: Study/Practice coverage`)
    for (const item of bank) {
      assert.ok(item.en && item.context, `${chapter.id}: context missing`)
      assert.ok(
        item.section === 'words' || model.study.some((section) => section.id === item.section),
      )
      if (item.art)
        assert.ok(existsSync(new URL(`public/assets/course/${item.art}`, root)), item.art)
      if (item.portrait)
        assert.ok(existsSync(new URL(`public/assets/course/${item.portrait}`, root)), item.portrait)
    }
    for (const section of model.study)
      for (const block of section.blocks)
        if (block.type === 'conversation')
          assert.deepEqual(
            block.phraseIds,
            block.turns.map((turn) => turn.id),
            `${chapter.id}: every speaker turn remains present`,
          )
  }
})

test('Chapter 04 teaches conversational repair in context without isolated phrase cards', () => {
  const model = readLesson('04')
  assert.equal(model.title, "When Something Isn't Clear")
  assert.deepEqual(model.study.map((section) => section.title), [
    "When you didn't catch something",
    "When you heard it but don't understand",
    "When you need a different explanation",
  ])
  assert.equal(model.vocabulary.length, 0)
  assert.equal(model.study.flatMap((section) => section.blocks).filter((block) => block.type === 'table').length, 0)
  assert.equal(model.study.flatMap((section) => section.blocks).filter((block) => block.type === 'conversation').length, 3)
  assert(model.study.every((section) => section.blocks.some((block) => block.type === 'conversation')))
  const conversationIds = new Set(model.study.flatMap((section) =>
    section.blocks.filter((block) => block.type === 'conversation').flatMap((block) => block.phraseIds),
  ))
  assert.equal(model.phraseBank.length, conversationIds.size)
  assert(model.phraseBank.every((item) => conversationIds.has(item.id)))
  assert.deepEqual(
    model.study.flatMap((section) => section.blocks.filter((block) => block.type === 'explanation').flatMap((block) => block.phraseIds)),
    [],
  )
})

test('a Study subsection about practice keeps its teaching examples in Study', () => {
  const source = readFileSync(new URL('src/course/chapters/40-returning-goods.md', root), 'utf8')
  const lesson = parseLesson(source, '40')
  const section = lesson.study.find(
    (item) => item.title === 'Practice with a complete fictional policy',
  )
  assert.ok(section)
  assert.equal(section.blocks.find((block) => block.type === 'conversation').turns.length, 6)
  assert.equal(
    lesson.study.flatMap((item) => item.blocks).filter((block) => block.type === 'conversation')
      .length,
    3,
  )
  assert.equal(
    lesson.practice.flatMap((item) => item.blocks).filter((block) => block.type === 'conversation')
      .length,
    0,
  )
})

test('phrase identities survive an unrelated preceding example and keep different contexts separate', () => {
  const make = (extra) => ({
    id: '01',
    vocabulary: [],
    study: [
      {
        id: 's1',
        title: 'Greeting',
        blocks: [
          ...extra,
          { type: 'explanation', runs: [{ text: 'Say ' }, { text: 'Hello.', emphasis: true }] },
        ],
      },
      {
        id: 's2',
        title: 'On the phone',
        blocks: [
          { type: 'explanation', runs: [{ text: 'Say ' }, { text: 'Hello.', emphasis: true }] },
        ],
      },
    ],
  })
  const before = addPhraseBank(make([])).phraseBank
  const after = addPhraseBank(
    make([{ type: 'explanation', runs: [{ text: 'Try ' }, { text: 'Hi.', emphasis: true }] }]),
  ).phraseBank
  assert.equal(before[0].id, after.find((item) => item.en === 'Hello.' && item.section === 's1').id)
  assert.notEqual(before[0].id, before[1].id)
})

test('all foundation topics and existing pronunciation recordings remain available in English', () => {
  assert.equal(Object.keys(foundationReading).length, 6)
  assert.deepEqual(
    foundationReading.orientation.sections.map(({ id }) => id),
    ['orientation-language', 'orientation-english', 'orientation-answer'],
  )
  assert.deepEqual(
    foundationReading['how-it-works'].sections.map(({ id }) => id),
    ['how-philosophy', 'how-start-line', 'how-two-by-two', 'how-chapter-loop'],
  )
  assert.deepEqual(
    foundationReading.letters.sections.map(({ id }) => id),
    ['letters-start', 'letters-board', 'letters-try'],
  )
  assert.equal(foundationReading.letters.sections[2].video[0], 'MgmIHtp-ZQM')
  assert.equal(foundationReading.letters.sections[2].items.length, 3)
  assert.equal(foundationReading.hear, undefined)
  assert.doesNotMatch(JSON.stringify(foundationReading), /[\u3040-\u30ff\u4e00-\u9fff]/)
  for (const item of allTwisters) {
    assert.equal(twisterGuidance[item.id].length, 2)
    assert.ok(existsSync(new URL(`public/audio/${item.id}.wav`, root)))
    for (let i = 0; i < item.buildSteps.length - 1; i++)
      assert.ok(existsSync(new URL(`public/audio/segments/${item.id}-${i + 1}.wav`, root)))
  }
})

test('Chapter 02 begins with an everyday exchange and teaches additional phrases in context', () => {
  const phraseShelf = readFileSync(new URL('src/web/GreetingsReferenceStudy.jsx', root), 'utf8')
  const experience = readFileSync(new URL('src/web/LessonExperience.jsx', root), 'utf8')
  const styles = readFileSync(new URL('src/web/introductions.css', root), 'utf8')
  assert.match(phraseShelf, /export function PhraseShelf/)
  assert.match(experience, /Chapter02PhraseTable/)
  assert.match(experience, /Chapter02Expression/)
  assert.match(experience, /SituationalPhrases/)
  assert.match(experience, /ar-ch02-situation-table/)
  assert.match(experience, /<PhraseAudio item={item}/)
  assert.match(experience, /conversation \? \(lessonId === '02'/)
  assert.match(experience, /ar-ch02-spoken-line/)
  assert.match(styles, /ar-ch02-expression \.ip-audio/)
  assert.match(experience, /scope="rowgroup"/)
  assert.match(experience, /scope="col"/)
  // The last turn is expressed as two genuine reply branches, not repeated above them.
  assert.match(experience, /block\.replyAlternatives\?\.choices\.some/)
  assert.match(experience, /ar-ch02-branch-choices/)
  assert.match(experience, /ar-ch02-branch-fork/)
  assert.match(experience, /data-phrase-id=\{item\.id\}/)
  assert.match(styles, /max-width: 320px/)
  assert.match(styles, /ar-ch02-branch-choice/)
  assert.match(styles, /ar-ch02-study \.ip-scene-setting img/)
  assert.doesNotMatch(styles, /max-width: 130px/)
  assert.match(styles, /ar-ch02-table-scroll/)
  assert.match(styles, /ar-ch02-english/)

  const images = (filename) => existsSync(new URL(`public/assets/course/${filename}`, root))
  const blocks = introductionSections.flatMap((section) => section.blocks)
  const phraseBlocks = blocks.filter((block) => block.type === 'phrases')
  const conversations = blocks.filter((block) => block.type === 'conversation')
  const situations = blocks.filter((block) => block.type === 'situations')
  const [introduce, work, connect] = introductionSections

  assert.deepEqual(introductionSections.map((section) => section.id), ['introduce', 'work', 'connect'])
  assert.equal(introduce.title, 'Introduce yourself')
  assert.equal(work.title, 'Meet someone at work')
  assert.equal(connect.title, 'Introduce two people')
  assert.equal(phraseBlocks.length, 7)
  assert.equal(conversations.length, 4)
  assert.equal(situations.length, 1)
  assert.equal(introduce.blocks[1].type, 'conversation')
  assert.equal(introduce.blocks[1].title, 'A natural first introduction')
  assert.deepEqual(introduce.blocks[1].phrases, ['ch02-p27', 'ch02-p2', 'ch02-p3'])
  assert.equal(introduce.blocks[2].title, 'Other ways to begin')
  assert.deepEqual(introduce.blocks[2].phrases, ['ch02-p4', 'ch02-p38'])
  assert.equal(introduce.blocks[3].type, 'situations')
  assert.equal(introduce.blocks[3].examples.length, 4)
  assert.deepEqual(introduce.blocks[3].examples[0].phrases, ['ch02-p1', 'ch02-p29', 'ch02-p6'])
  assert.deepEqual(introduce.blocks[3].examples[3].phrases, ['ch02-p25', 'ch02-p26'])
  assert.equal(work.blocks.filter((block) => block.type === 'phrases').length, 4)
  const workplaceConversation = conversations.find((block) => block.title === 'Meeting the project team')
  assert.deepEqual(workplaceConversation.phrases, ['ch02-p39', 'ch02-p40', 'ch02-p41', 'ch02-p42', 'ch02-p43'])
  assert.deepEqual(work.blocks[2].phrases, ['ch02-p15', 'ch02-p33', 'ch02-p37', 'ch02-p13'])
  assert.deepEqual(work.blocks[3].phrases, ['ch02-p11', 'ch02-p14', 'ch02-p7', 'ch02-p8'])
  assert.deepEqual(work.blocks[4].phrases, ['ch02-p44', 'ch02-p45', 'ch02-p46', 'ch02-p32'])
  assert.deepEqual(work.blocks[5].phrases, ['ch02-p12', 'ch02-p31', 'ch02-p16'])
  assert.equal(connect.blocks.filter((block) => block.type === 'conversation').length, 2)

  const first = introduce.blocks[1]
  assert.equal(first.replyAlternatives.title, 'Other natural replies')
  assert.equal(first.replyAlternatives.promptId, 'ch02-p30')
  assert.deepEqual(first.replyAlternatives.choices.map((choice) => choice.id), ['ch02-p3', 'ch02-p5'])
  assert.ok(blocks.every((block) => !block.collapsed))
  assert.ok(!blocks.some((block) => ['words', 'vocabulary'].includes(block.type)))

  for (const block of phraseBlocks)
    if (block.sceneArt) assert.ok(images(block.sceneArt), block.sceneArt)
  for (const block of conversations) assert.ok(images(block.art), block.art)

  const displayed = new Set(blocks.flatMap((block) => [
    ...(block.phrases ?? []),
    ...(block.examples ?? []).flatMap((example) => example.phrases),
    ...(block.replyAlternatives?.choices ?? []).map((choice) => choice.id),
    ...(block.replyAlternatives?.promptId ? [block.replyAlternatives.promptId] : []),
  ]))
  const spoken = Object.values(introductionById).filter((item) => item.section !== 'words').map((item) => item.id)
  assert.deepEqual([...displayed].sort(), spoken.sort(), 'Every target phrase remains in Study')

  const turns = conversations.flatMap((block) => block.phrases.map((id) => introductionById[id]))
  assert.ok(turns.every((item) => item.speaker && item.portrait?.startsWith('portrait-ch02-')))
  for (const item of turns) {
    assert.ok(images(item.portrait), item.portrait)
    const portrait = readFileSync(new URL(`public/assets/course/${item.portrait}`, root), 'utf8')
    assert.ok(portrait.includes(`<title>${item.speaker}</title>`))
  }
})
