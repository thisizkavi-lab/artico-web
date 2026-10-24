import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildPracticeCatalog, normalizePracticeText } from '../src/web/practiceCatalog.js'
import { getPracticeSet } from '../src/web/phrasePractice.js'
import { greetingsModel } from '../src/course/greetings.js'
import { localizeGreetings } from '../src/course/locales/ja/greetings.js'

const read = (id, language = 'en') => JSON.parse(readFileSync(new URL(`../src/course/${language === 'ja' ? 'locales/ja/' : ''}lessons/${id}.json`, import.meta.url)))
const model = (source) => ({ ...source, phrases: source.phraseBank, sections: source.study.map((section) => ({ ...section, blocks: section.blocks.map((block) => ({ ...block, phrases: block.phraseIds })) })) })
const catalogFor = (id, language) => buildPracticeCatalog(model(read(id, language)))

test('curated greetings preserve existing selections, ratings and the current expression in both languages', () => {
  for (const lesson of [greetingsModel, localizeGreetings(greetingsModel)]) {
    const catalog = buildPracticeCatalog(lesson)
    assert.deepEqual(catalog.starterIds, greetingsModel.starterIds)
    assert.ok(!catalog.items.some((item) => normalizePracticeText(item.en) === 'i lost my phone'))
    const previous = {
      selected: ['ch01-line17', 'ch01-line41', 'ch01-line58'],
      ratings: { 'ch01-line41': 'needs-work' },
      session: { ids: ['ch01-line17', 'ch01-line41', 'ch01-line58'], index: 1, active: true },
    }
    const migrated = getPracticeSet(previous, catalog.items, undefined, catalog)
    assert.deepEqual(migrated.selected, ['ch01-p1', 'ch01-p13', 'ch01-p29'])
    assert.deepEqual(migrated.session.ids, migrated.selected)
    assert.equal(migrated.session.index, 1)
    assert.equal(migrated.session.active, true)
    assert.equal(migrated.ratings['ch01-p13'], 'needs-work')
    for (const phrase of read('01').phraseBank) {
      if (normalizePracticeText(phrase.en) !== 'i lost my phone')
        assert.ok(catalog.aliases[phrase.id]?.length, `Missing saved expression: ${phrase.id}`)
    }
  }
})

test('all 96 chapters have bounded starting sets, unique targets and reachable Study sources in both languages', () => {
  for (let chapter = 1; chapter <= 96; chapter++) {
    const id = String(chapter).padStart(2, '0'), source = read(id), catalog = catalogFor(id)
    const originalIds = new Set(source.phraseBank.map((item) => item.id))
    assert.ok(catalog.starterIds.length > 0 && catalog.starterIds.length <= 8, id)
    assert.equal(new Set(catalog.items.map((item) => item.id)).size, catalog.items.length, id)
    for (const item of catalog.items) {
      assert.ok(originalIds.has(item.studyId), `${id}: missing source for ${item.en}`)
      assert.ok(!item.en.includes(' / '), `${id}: unsplit alternatives: ${item.en}`)
      assert.ok(!item.context.startsWith('A useful word for'), `${id}: placeholder meaning`)
    }
    assert.deepEqual(catalogFor(id, 'ja').items.map((item) => item.id), catalog.items.map((item) => item.id), id)
    assert.deepEqual(catalogFor(id, 'ja').starterIds, catalog.starterIds, id)
  }
})

test('known teaching commentary and incidental examples never become speaking targets', () => {
  assert.ok(!catalogFor('53').items.some((item) => item.en.startsWith('Notice that the transitions')))
  assert.ok(!catalogFor('01').items.some((item) => item.en === 'I lost my phone.'))
  assert.ok(catalogFor('14').items.some((item) => item.en === 'mother'))
  assert.ok(catalogFor('14').items.some((item) => item.en === 'dad'))
  assert.ok(catalogFor('80').items.some((item) => item.en === 'head'))
  assert.ok(catalogFor('80').items.some((item) => item.en === 'feet'))
  assert.ok(read('93').phraseBank.some((item) => item.en.startsWith('“Tuesday workshop: new room.”')))
  assert.equal(read('53').phraseBank.filter((item) => /^ch53-b/.test(item.id)).length, 5)
})

test('canonical selections preserve ratings and positions; compound selections expand without losing their Study link', () => {
  const catalog = catalogFor('14')
  const sourceId = 'ch14-p21383231660741', targets = catalog.aliases[sourceId]
  assert.ok(targets.length >= 5)
  const migrated = getPracticeSet({ selected: [sourceId], ratings: { [sourceId]: 'needs-work' }, session: { ids: [sourceId], index: 0, active: true } }, catalog.items, undefined, catalog)
  assert.deepEqual(migrated.selected, targets)
  assert.deepEqual(migrated.session.ids, targets)
  assert.ok(targets.every((id) => migrated.ratings[id] === 'needs-work'))
  assert.ok(targets.every((id) => catalog.items.find((item) => item.id === id).studyId === sourceId))
  assert.deepEqual(getPracticeSet({ selected: [] }, catalog.items, undefined, catalog).selected, [])
  assert.deepEqual(getPracticeSet(undefined, catalog.items, undefined, catalog).selected, catalog.starterIds)
})

test('equivalent punctuation within a section is merged while distinct teaching contexts remain', () => {
  const catalog = catalogFor('01')
  const morning = catalog.items.filter((item) => item.section === '01-study-1' && normalizePracticeText(item.en) === 'good morning')
  assert.equal(morning.length, 1)
  const split = buildPracticeCatalog({ id: '01', sections: [], phrases: [
    { id: 'ch01-p1', en: "What's up?", section: 'greeting', context: 'Greeting' },
    { id: 'ch01-p2', en: "What's up?", section: 'problem', context: 'Ask about a problem' },
  ] })
  assert.equal(split.items.length, 2)
})

test('numbered samples stay beside the correct situation in English and Japanese', async () => {
  const { pairScenarioResponses } = await import('../src/web/scenarioResponses.js')
  for (const language of ['en', 'ja']) {
    const blocks = read('01', language).practice[0].blocks
    const split = blocks.findIndex((block) => block.type === 'answerHeading')
    const paired = pairScenarioResponses(blocks.slice(0, split), blocks.slice(split))
    assert.equal(paired.responses.length, 8)
    assert.match(paired.responses[0].map((run) => run.text).join(''), /Morning/)
    const wrongOrder = { ...paired.block, items: [...paired.block.items].reverse() }
    assert.equal(pairScenarioResponses(blocks.slice(0, split), [wrongOrder]), null)
  }
})

test('deduplication retains illustrated glossary support without assigning a group image to every word', () => {
  const source = read('14'), catalog = catalogFor('14')
  const parent = catalog.items.find((item) => normalizePracticeText(item.en) === 'parent')
  const glossary = source.phraseBank.find((item) => item.section === 'words' && item.en === 'parent')
  assert.equal(parent.art, glossary.art)
  assert.equal(parent.context, glossary.context)
  const mother = catalog.items.find((item) => item.en === 'mother')
  assert.equal(mother.art, undefined)
})
