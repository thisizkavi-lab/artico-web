import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { contextQuestions, questionsForPilot, makeScenarioQuiz } from '../src/course/scenarioQuiz.js'

const root = fileURLToPath(new URL('../src/course/', import.meta.url))

const checkQuestions = (questions) => {
  assert.ok(questions.length >= 1 && questions.length <= 6)
  for (const question of questions) {
    assert.ok(question.prompt.length > 15)
    assert.ok(Array.isArray(question.options) && question.options.length === 3)
    assert.equal(new Set(question.options).size, 3)
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 3)
    assert.ok(question.options[question.answer]?.trim())
    assert.ok(question.explanation?.trim())
  }
  assert.equal(new Set(questions.map((item) => item.id)).size, questions.length)
}

test('Greetings and Introductions have curated context-sensitive questions in both languages', () => {
  for (const id of ['01', '02']) {
    const en = questionsForPilot(id, 'en'), ja = questionsForPilot(id, 'ja')
    assert.equal(en.length, id === '01' ? 6 : 5)
    checkQuestions(en); checkQuestions(ja)
    assert.deepEqual(en.map((q) => q.options), ja.map((q) => q.options))
    assert.ok(ja.every((q) => /[ぁ-んァ-ン一-龯]/.test(q.prompt)))
  }
})

test('each general chapter has grounded, distinct English-option recognition questions', () => {
  const files = readdirSync(root + 'lessons/').filter((name) => /^\d\d\.json$/.test(name))
  assert.ok(files.length >= 85)
  for (const file of files) {
    const data = JSON.parse(readFileSync(root + 'lessons/' + file, 'utf8'))
    // Chapters 01–02 use dedicated pilot data, tested above.
    if (data.id === '01' || data.id === '02') continue
    const questions = makeScenarioQuiz({ id: data.id, phrases: data.phraseBank }, 'en')
    // A vocabulary-only chapter can have no contextual recognition quiz.
    if (questions.length === 0 && data.id === '65') {
      // The transport vocabulary overview has no three distinct contextual
      // clues after glossary-only examples are removed from the quiz pool.
      // Its following conversation chapters provide the recognition checks.
      continue
    }
    checkQuestions(questions)
    const expressions = new Set(data.phraseBank.map((item) => item.en))
    assert.ok(questions.every((q) => expressions.has(q.options[q.answer])), file + ' ungrounded answer')
    assert.ok(questions.every((q) => !q.detail || !q.detail.toLowerCase().includes(q.options[q.answer].toLowerCase())), file + ' answer leaked in prompt')
    const jp = JSON.parse(readFileSync(root + 'locales/ja/lessons/' + file, 'utf8'))
    const jpQuestions = contextQuestions(jp.phraseBank, 'ja')
    assert.ok(jpQuestions.length >= 1, file + ' Japanese quiz missing')
    checkQuestions(jpQuestions)
  }
})
