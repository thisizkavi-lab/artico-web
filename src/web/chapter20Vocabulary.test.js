import test from 'node:test'
import assert from 'node:assert/strict'
import { chapter20VocabularyCount, chapter20VocabularySections } from './chapter20Vocabulary.js'

const sections = chapter20VocabularySections
const items = sections.flatMap((section) => section.groups.flatMap((group) => group.items))

test('Chapter 20 has four vocabulary-first sections', () => {
  assert.deepEqual(sections.map((section) => section.id), [
    '20-study-0', '20-study-1', '20-study-2', '20-study-3',
  ])
})

test('every vocabulary card has a unique ID and complete English/Japanese support', () => {
  assert.equal(items.length, chapter20VocabularyCount)
  assert.equal(chapter20VocabularyCount, 86)
  assert.equal(new Set(items.map((item) => item.id)).size, items.length)
  for (const item of items) {
    assert.ok(item.en.trim(), 'English term is required')
    assert.ok(item.ja.trim(), item.en + ' needs a Japanese translation')
    assert.ok(item.definition.trim(), item.en + ' needs an English definition')
    assert.ok(item.jaDefinition.trim(), item.en + ' needs a Japanese definition')
  }
})

test('the atlas retains existing stable practice IDs for linked vocabulary', () => {
  const ids = new Set(items.map((item) => item.id))
  for (const id of [
    'ch20-p5062270939475', 'ch20-p150193828440383', 'ch20-p274860317030883',
    'ch20-p165492869605220', 'ch20-p101607893681287', 'ch20-p4397906018824',
    'ch20-p43501266964968', 'ch20-p90038313019597', 'ch20-p83725282103968',
    'ch20-p234765972321340',
  ]) assert.ok(ids.has(id), 'Missing stable practice ID: ' + id)
})

test('the chapter includes separate cards for the original combined vocabulary groups', () => {
  const english = new Set(items.map((item) => item.en))
  for (const term of [
    'coffee with milk', 'coffee with cream', 'latte', 'cappuccino',
    'iced coffee', 'iced tea', 'juice', 'soda', 'sparkling water',
    'knife', 'cutting board', 'peeler', 'grater', 'main course', 'entrée',
  ]) assert.ok(english.has(term), 'Missing individual card: ' + term)
})
