import test from 'node:test'
import assert from 'node:assert/strict'
import { LETTERS_PER_CHECK, makeAlphabetRecognitionCards } from './alphabetRecognition.js'
import { readFileSync } from 'node:fs'

test('each Alphabet check presents ten distinct uppercase/lowercase recognition prompts', () => {
  for (let round = 0; round < 4; round++) {
    const cards = makeAlphabetRecognitionCards(round)
    assert.equal(cards.length, LETTERS_PER_CHECK)
    assert.equal(new Set(cards.map(card => card.shown.toUpperCase())).size, 10)
    for (const [index, card] of cards.entries()) {
      assert.equal(card.choices.length, 3)
      assert.equal(new Set(card.choices).size, 3)
      assert.equal(card.choices.filter(choice => choice === card.answer).length, 1)
      assert.equal(card.shown.toUpperCase(), card.answer.toUpperCase())
      assert.equal(card.direction, index % 2 === 0 ? 'lower' : 'upper')
      assert.equal(card.answer, card.direction === 'lower' ? card.answer.toLowerCase() : card.answer.toUpperCase())
    }
  }
})

test('three short consecutive checks expose all 26 letters without a score or timer', () => {
  const seen = new Set([0, 1, 2].flatMap(round => makeAlphabetRecognitionCards(round).map(card => card.shown.toUpperCase())))
  assert.equal(seen.size, 26)
  const interfaceSource = readFileSync(new URL('./AlphabetRecognition.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(interfaceSource, /confetti|streak|points|leaderboard|score|setTimeout/i)
})

test('Alphabet Practice uses the existing foundation shell without repeating the alphabet board', () => {
  const source = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  assert.match(source, /if \(id === 'letters'\) return <AlphabetRecognition \/>/)
  assert.match(source, /route\.id === 'letters' \? <AlphabetLessonStudy model=\{model\} \/>/)
})
