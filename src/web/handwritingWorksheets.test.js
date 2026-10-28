import test from 'node:test'
import assert from 'node:assert/strict'
import { LETTERS, WORDS, worksheetName } from './handwritingWorksheets.js'
import { readFileSync } from 'node:fs'

test('handwriting catalogue points to all 26 letter tracing and word PDFs', () => {
  assert.equal(LETTERS.length, 26)
  assert.equal(new Set(LETTERS).size, 26)
  for (const letter of LETTERS) {
    assert.equal(WORDS[letter].length, 3)
    assert.equal(worksheetName('trace', letter), `Letter_${letter}_Trace.pdf`)
    assert.equal(worksheetName('words', letter), `Words_${letter}_Write.pdf`)
  }
  assert.equal(worksheetName('trace', '*'), null)
  assert.equal(worksheetName('words', '*'), null)
})

test('download catalogue has the prebuilt A-Z, combined-book and complete ZIP file names', () => {
  assert.match(worksheetName('overview'), /^00_Alphabet.*\.pdf$/)
  assert.match(worksheetName('complete'), /Complete_Handwriting_Workbook\.pdf$/)
  assert.match(worksheetName('upper'), /Capitals\.pdf$/)
  assert.match(worksheetName('lower'), /Small_Letters\.pdf$/)
  assert.match(worksheetName('tracing-book'), /Tracing_Book_A-Z\.pdf$/)
  assert.match(worksheetName('word-book'), /Writing_Book_A-Z\.pdf$/)
  assert.match(worksheetName('zip'), /\.zip$/)
})

test('Artico handwriting is available in Practice and no longer sends learners to third party worksheets', () => {
  const shell = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  const english = readFileSync(new URL('../course/foundations-en.js', import.meta.url), 'utf8')
  const japanese = readFileSync(new URL('../course/locales/ja/02-foundations.md', import.meta.url), 'utf8')
  const picker = readFileSync(new URL('./HandwritingWorksheets.jsx', import.meta.url), 'utf8')
  assert.match(shell, /if \(id === 'write'\) return <HandwritingWorksheets \/>/)
  assert.doesNotMatch(english, /teachprints\.com/)
  assert.doesNotMatch(japanese, /teachprints\.com/)
  assert.match(picker, /import\.meta\.env\.BASE_URL/)
  assert.match(picker, /target="_blank"/)
  assert.match(picker, /download/)
})
