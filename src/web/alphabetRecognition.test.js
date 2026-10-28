import test from 'node:test'
import assert from 'node:assert/strict'
import { LETTERS_PER_CHECK, makeAlphabetRecognitionCards } from './alphabetRecognition.js'
import { readFileSync } from 'node:fs'

test('Alphabet checks include both media types and three distinct answer options', () => {
  for (let round = 0; round < 4; round++) {
    const cards = makeAlphabetRecognitionCards(round)
    assert.equal(cards.length, LETTERS_PER_CHECK)
    assert.equal(new Set(cards.map(card => card.letter)).size, 10)
    assert.ok(cards.some(card => card.media === 'visual'))
    assert.ok(cards.some(card => card.media === 'audio'))
    for (const [index, card] of cards.entries()) {
      assert.equal(card.choices.length, 3)
      assert.equal(new Set(card.choices).size, 3)
      assert.equal(card.choices.filter(choice => choice === card.answer).length, 1)
      assert.equal(card.letter.toUpperCase(), card.answer.toUpperCase())
      assert.equal(card.media, index % 3 === 2 ? 'audio' : 'visual')
      assert.equal(card.direction, card.media === 'audio' ? 'upper' : index % 2 === 0 ? 'lower' : 'upper')
      if (card.media === 'audio') {
        assert.equal(card.shown, null, 'audio cards must not display a letter')
        assert.equal(card.answer, card.answer.toUpperCase())
      } else {
        assert.equal(card.shown.toUpperCase(), card.answer.toUpperCase())
        assert.notEqual(card.shown, card.answer, 'visual cards ask for the matching case')
      }
    }
  }
})

test('three short checks cover all 26 letters without a timer or points', () => {
  const seen = new Set([0, 1, 2].flatMap(round => makeAlphabetRecognitionCards(round).map(card => card.letter)))
  assert.equal(seen.size, 26)
  const interfaceSource = readFileSync(new URL('./AlphabetRecognition.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(interfaceSource, /confetti|streak|points|leaderboard|score|setTimeout/i)
})

test('Alphabet Practice separates media from question and options and keeps the Foundation shell', () => {
  const source = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  const practice = readFileSync(new URL('./AlphabetRecognition.jsx', import.meta.url), 'utf8')
  assert.match(source, /if \(id === 'letters'\) return <AlphabetRecognition \/>/)
  assert.match(source, /route\.id === 'letters' \? <AlphabetLessonStudy model=\{model\} \/>/)
  assert.match(practice, /audioOnly \? \(/)
  assert.match(practice, /className="rf-letter-check-listen"/)
  assert.match(practice, /rf-letter-check-letter/)
  assert.ok(practice.indexOf('rf-letter-check-card') < practice.indexOf('rf-letter-check-question'))
  assert.ok(practice.indexOf('rf-letter-check-question') < practice.indexOf('rf-letter-check-choices'))
  assert.match(practice, /aria-live="polite"/)
})
