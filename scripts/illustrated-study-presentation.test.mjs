import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { illustratedStudyPresentation, isExpressionMeaningList } from '../src/web/illustratedStudyPresentation.js'
import { chapterPhraseIllustrations } from '../src/web/chapterPhraseIllustrations.js'

const plain = (runs = []) => runs.map((run) => run.text).join('')
const read = (id, language) => JSON.parse(readFileSync(new URL(
  `../src/course/${language === 'ja' ? 'locales/ja/' : ''}lessons/${id}.json`, import.meta.url), 'utf8'))
const sectionModel = (section) => ({ ...section, blocks: section.blocks.map((block) => block.type === 'conversation'
  ? block : { id: block.id, type: 'source', source: block }) })

test('Chapter 07 uses contextual conversation headings, a refusal table, and notes in reading order', () => {
  for (const language of ['en', 'ja']) {
    const source = read('07', language)
    const byId = Object.fromEntries(source.phraseBank.map((phrase) => [phrase.id, phrase]))
    const sections = source.study.map(sectionModel)
    const original = JSON.stringify(sections)
    const prepared = sections.map((section) => illustratedStudyPresentation(section, '07', language, byId))
    const captions = language === 'en'
      ? ['Choosing what to do', 'An invitation and an alternative', 'A clearer boundary']
      : ['何をするかを選ぶ場面', '誘いを断り、別の案を出す場面', '希望を直接伝える場面']
    assert.deepEqual(prepared.flatMap(({ blocks }) => blocks.filter((block) => block.studyTitle).map((block) => block.studyTitle)), captions)
    assert.ok(prepared.flatMap(({ blocks }) => blocks).every((block) =>
      !['ch07-b15', 'ja-07-study-2-8'].includes(block.id)), 'requested commentary is removed in both languages')
    const refusal = prepared[2].blocks.find((block) => block.source?.presentation === 'expression-meaning').source
    assert.equal(refusal.rows.length, 6)
    assert.equal(prepared[1].lead, null, 'invitation guidance follows the illustration rather than preceding it')
    assert.equal(prepared[1].blocks[0].source.teachingNote, 'Note')
    assert.equal(prepared[1].blocks[1].type, 'conversation', 'invitation guidance stays immediately above the conversation')
    assert.equal(prepared[1].blocks.at(-1).source.teachingNote, 'Note')
    assert.equal(JSON.stringify(sections), original)
  }
})

test('matching editorial changes preserve bilingual source content throughout the course', () => {
  const custom = new Set(['01', '02', '03', '06', '11', '14'])
  let tables = 0
  let captions = 0
  for (const language of ['en', 'ja']) for (let number = 1; number <= 96; number++) {
    const id = String(number).padStart(2, '0')
    const source = read(id, language)
    const byId = Object.fromEntries(source.phraseBank.map((phrase) => [phrase.id, phrase]))
    for (const raw of source.study) {
      const section = sectionModel(raw)
      const original = JSON.stringify(section)
      const { blocks } = illustratedStudyPresentation(section, id, language, byId)
      assert.equal(JSON.stringify(section), original, `${language}:${id}: source stays immutable`)
      assert.deepEqual(illustratedStudyPresentation({ ...section, blocks }, id, language, byId).blocks, blocks,
        `${language}:${id}: presentation is idempotent`)
      if (custom.has(id)) {
        assert.deepEqual(blocks, section.blocks, `${language}:${id}: approved custom layout stays intact`)
        continue
      }
      for (const block of section.blocks) {
        if (id === '07' && ['ch07-b15', 'ja-07-study-2-8'].includes(block.id)) continue
        const presented = blocks.find((entry) => entry.id === block.id)
        if (!presented) {
          const conversation = blocks.find((entry) => entry.captionSourceId === block.id)
          assert.equal(conversation?.studyTitle, plain(block.source.runs), `${language}:${id}: caption remains as a heading`)
          captions++
          continue
        }
        if (isExpressionMeaningList(block.source)) {
          assert.equal(presented.source.type, 'table')
          assert.deepEqual(presented.source.phraseIds, block.source.phraseIds)
          assert.deepEqual(presented.source.rows.map((row) => row.map(plain).join('')), block.source.items.map((item) => plain(item.runs)))
          tables++
        } else {
          assert.deepEqual(presented.source?.runs, block.source?.runs, `${language}:${id}: explanation wording stays intact`)
        }
      }
    }
  }
  // Compiled chapters and checked-in snapshots can contain different numbers
  // of scene labels; the preservation assertions above apply to every match.
  assert.ok(tables > 0, 'fixtures exercise comparison-table preservation')
  assert.ok(captions > 0, 'fixtures exercise scene-heading preservation')
})

test('a new vocabulary definition stays prominent beside quieter conversation guidance', () => {
  const byId = { word: { id: 'word', kind: 'word', en: 'saddle' } }
  const guidance = { id: 'guidance', type: 'source', source: {
    type: 'explanation', phraseIds: [], runs: [{ text: 'The speaker acknowledges the suggestion and adds a practical alternative for the group.' }],
  } }
  const definition = { id: 'definition', type: 'source', source: {
    type: 'explanation', phraseIds: ['word'], runs: [{ text: 'The saddle is the seat on the bicycle. This definition introduces a new part of the bike.' }],
  } }
  const { blocks } = illustratedStudyPresentation({ blocks: [{ id: 'conversation', type: 'conversation', turns: [] }, guidance, definition] }, '69', 'en', byId)
  assert.equal(blocks[1].source.teachingNote, 'Note')
  assert.equal(blocks[2].source.teachingNote, undefined)
})

test('the Chapter 08 and 10 comparison tables retain every English expression and bilingual explanation', () => {
  for (const language of ['en', 'ja']) for (const id of ['08', '10']) {
    const source = read(id, language)
    const section = sectionModel(source.study[0])
    const original = JSON.stringify(section)
    const list = section.blocks.find((block) => block.source?.type === 'list').source
    const { blocks } = illustratedStudyPresentation(section, id, language)
    const table = blocks.find((block) => block.id === list.id).source
    assert.equal(table.type, 'table')
    assert.equal(table.rows.length, id === '08' ? 5 : 4)
    table.rows.forEach((row, index) => {
      assert.equal(row.map(plain).join(''), plain(list.items[index].runs))
      assert.ok(row.every((cell) => plain(cell).trim()))
    })
    assert.deepEqual(table.phraseIds, list.phraseIds)
    assert.equal(JSON.stringify(section), original, 'source lesson stays unchanged')
  }
})

test('Chapter 08 keeps scene titles with conversations and places optional interpretation below the illustration', () => {
  for (const language of ['en', 'ja']) {
    const source = read('08', language)
    const first = sectionModel(source.study[0])
    const scene = first.blocks.find((block) => block.id === (language === 'en' ? 'ch08-b3' : 'ja-08-study-0-3'))
    const { blocks, preferredIds } = illustratedStudyPresentation(first, '08', language)
    assert.equal(blocks.find((block) => block.type === 'conversation').studyTitle, plain(scene.source.runs))
    assert.equal(blocks.filter((block) => block.id === scene.id).length, 0)
    assert.equal(blocks.find((block) => block.id === (language === 'en' ? 'ch08-b2' : 'ja-08-study-0-2')).source.teachingNote, 'Note')
    assert.equal(preferredIds.length, 7, 'complete expressions are prominent; grammar examples stay in their note')
    const optional = illustratedStudyPresentation(sectionModel(source.study[3]), '08', language)
    assert.equal(optional.lead, null)
    assert.equal(optional.blocks.every((block) => block.source.teachingNote === 'Note'), true)
  }
})

test('converted lists render semantic reference tables and grammar guidance renders one note box', async () => {
  let language = 'en'
  const oldWindow = globalThis.window
  globalThis.window = { localStorage: { getItem: () => language } }
  const vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
  try {
    const { SourceContent } = await vite.ssrLoadModule('/src/web/ContentBlocks.jsx')
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    for (language of ['en', 'ja']) {
      const source = read('08', language)
      const byId = Object.fromEntries(source.phraseBank.map((phrase) => [phrase.id, phrase]))
      const { blocks } = illustratedStudyPresentation(sectionModel(source.study[0]), '08', language)
      const render = (block) => renderToStaticMarkup(createElement(LanguageProvider, null,
        createElement(SourceContent, { block, audioProps: { byId }, examples: false })))
      const table = render(blocks.find((block) => block.source?.type === 'table').source)
      assert.equal((table.match(/scope="row"/g) ?? []).length, 5)
      assert.equal(table.includes('<ul'), false)
      const note = render(blocks.find((block) => block.source?.teachingNote).source)
      assert.equal((note.match(/<aside/g) ?? []).length, 1)
      assert.equal(note.includes('Keep in mind'), false)
      assert.equal(note.includes('ar-teaching-note-copy'), true)
    }
  } finally {
    await vite.close()
    if (oldWindow === undefined) delete globalThis.window
    else globalThis.window = oldWindow
  }
})

test('Chapter 08 ships four distinct native RGBA PNG illustrations', () => {
  const hashes = new Set()
  for (const image of chapterPhraseIllustrations['08']) {
    const data = readFileSync(new URL(`../public/assets/course/${image.file}`, import.meta.url))
    assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
    assert.equal(data[25], 6, `${image.file}: RGBA PNG required`)
    assert.ok(data.readUInt32BE(16) >= 1500 && data.readUInt32BE(20) >= 700)
    assert.equal(image.fallbackFile, null)
    hashes.add(createHash('sha256').update(data).digest('hex'))
  }
  assert.equal(hashes.size, 4)
})
