import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  GUIDES, LETTERS, CAPITAL_STROKES, SMALL_STROKES, getLetterStrokes, getStartPosition,
} from './handwritingStrokes.js'

test('handwriting animation has all 52 original letter forms and correct four guide heights', () => {
  assert.equal(LETTERS.length, 26)
  assert.deepEqual(GUIDES, [18, 60, 102, 144])
  for (const letter of LETTERS) {
    for (const form of ['capital', 'small']) {
      const strokes = getLetterStrokes(letter, form)
      assert.ok(Array.isArray(strokes) && strokes.length >= 1, letter + ' ' + form)
      assert.equal(strokes, form === 'small' ? SMALL_STROKES[letter.toLowerCase()] : CAPITAL_STROKES[letter])
      for (const stroke of strokes) {
        assert.match(stroke, /^M\s*\d+\s+\d+/, letter + ' ' + form + ' must specify pen down')
        assert.match(stroke, /[LCQZ]/, letter + ' ' + form + ' has no pen movement')
        assert.doesNotMatch(stroke, /[^MLCQZ0-9\s.\-]/, letter + ' ' + form + ' has unsupported SVG commands')
        const point = getStartPosition(stroke)
        assert.ok(point.every(Number.isFinite))
        assert.ok(point[0] >= 10 && point[0] <= 145 && point[1] >= 12 && point[1] <= 144)
      }
    }
  }
})

test('handwriting positions demonstrate lowercase bodies, tall letters, descenders and Q tail', () => {
  assert.match(SMALL_STROKES.a.join(' '), /M95 60 L95 102/)
  assert.match(SMALL_STROKES.g.join(' '), /L99 120/)
  assert.match(SMALL_STROKES.p.join(' '), /L40 143/)
  assert.match(SMALL_STROKES.q.join(' '), /L100 143/)
  assert.match(SMALL_STROKES.y.join(' '), /L62 128/)
  assert.match(CAPITAL_STROKES.Q.join(' '), /L129 116/)
})

test('writing lesson replaces video with SVG stroke-order animation, not a font-outline reveal', () => {
  const component = readFileSync(new URL('./HandwritingAnimator.jsx', import.meta.url), 'utf8')
  const page = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  const english = readFileSync(new URL('../course/foundations-en.js', import.meta.url), 'utf8')
  const japanese = readFileSync(new URL('../course/locales/ja/02-foundations.md', import.meta.url), 'utf8')
  const cached = JSON.parse(readFileSync(new URL('../course/locales/ja/foundations.json', import.meta.url), 'utf8'))
  assert.match(page, /section\.id === 'write-model' && <HandwritingAnimator \/>/)
  assert.match(component, /getLetterStrokes/)
  assert.match(component, /className="hw-animator-stroke"/)
  assert.match(component, /pathLength=\{1\}/)
  assert.match(component, /aria-pressed=\{form === item.id\}/)
  assert.match(component, /setPlayRun/)
  assert.doesNotMatch(english, /DnNqoEXoGdg/)
  assert.doesNotMatch(japanese, /DnNqoEXoGdg/)
  assert.equal(cached.write.sections.find(section => section.id === 'write-model').video, undefined)
  assert.match(page, /if \(id === 'write'\) return <HandwritingWorksheets \/>/)
})
