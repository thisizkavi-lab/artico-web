import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import designs from '../src/course/chapter-designs.js'
import { addPhraseBank } from './phrase-bank.mjs'
import { parseLesson } from './lesson-parser.mjs'
import { introductionAliases, introductionById } from '../src/course/introductions.js'
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
  assert.ok(speakers.includes('Priya'))
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
  assert.equal(Object.keys(foundationReading).length, 7)
  assert.deepEqual(
    foundationReading.orientation.sections.map(({ id }) => id),
    ['orientation-language', 'orientation-english', 'orientation-answer'],
  )
  assert.deepEqual(
    foundationReading['how-it-works'].sections.map(({ id }) => id),
    ['how-start-line', 'how-two-by-two', 'how-chapter-loop'],
  )
  assert.doesNotMatch(JSON.stringify(foundationReading), /[\u3040-\u30ff\u4e00-\u9fff]/)
  for (const item of allTwisters) {
    assert.equal(twisterGuidance[item.id].length, 2)
    assert.ok(existsSync(new URL(`public/audio/${item.id}.wav`, root)))
    for (let i = 0; i < item.buildSteps.length - 1; i++)
      assert.ok(existsSync(new URL(`public/audio/segments/${item.id}-${i + 1}.wav`, root)))
  }
})
