import test from 'node:test'
import assert from 'node:assert/strict'
import { selectTeachingNotes } from './teachingNotes.js'

const textBlock = (id, text, phraseIds = []) => ({
  type: 'explanation', id, phraseIds, runs: [{ text }],
})

test('highlights an important clarification after the dialogue, without altering its content', () => {
  const study = [{
    blocks: [
      textBlock('open', 'Start with an ordinary explanation about your situation and the person you are talking to.'),
      { type: 'conversation', id: 'dialogue' },
      textBlock('ch90-b7', 'Breaking up here means the sound keeps being interrupted, not ending a relationship. A call can drop without warning.'),
    ],
  }]
  assert.deepEqual(selectTeachingNotes(study), { '0:2': '“Breaking up” on the phone' })
  assert.equal(study[0].blocks[2].runs[0].text.startsWith('Breaking up here'), true)
})

test('keeps ordinary definitions, section introductions, and headings as normal prose', () => {
  const study = [{
    blocks: [
      textBlock('intro', 'A greeting can open a conversation between two friends who have not spoken for some time.'),
      textBlock('definition', 'A basket is a container that people use to carry items. It has handles and can be made from different materials.'),
      { type: 'answerHeading', runs:[{ text: 'Useful expressions', emphasis:true }] },
    ],
  }]
  assert.deepEqual(selectTeachingNotes(study), {})
})

test('respects one callout per section and the chapter-wide limit', () => {
  const study = Array.from({ length: 5 }, (_, i) => ({
    blocks: [
      textBlock('intro-' + i, 'The meaning of an expression sometimes changes with the people and the particular situation.'),
      { type: 'conversation' },
      textBlock('caveat-' + i, 'The same words can have different meanings depending on context. The speaker is not always expressing agreement.'),
      textBlock('second-' + i, 'Another meaning here may be possible, but the context does not prove it.'),
    ],
  }))
  const notes = selectTeachingNotes(study)
  assert.equal(Object.keys(notes).length, 3)
  assert.equal(Object.keys(notes).every(key => key.endsWith(':2')), true)
})

test('selects Japanese-language explanatory distinctions with Japanese headings', () => {
  const study = [{
    blocks: [
      textBlock('ja-intro', 'この場面では、友達が電話で話しています。何が起きたかを確認します。'),
      { type: 'conversation' },
      textBlock('ja-explain', 'この表現は、文脈によって意味が変わることがあります。同じ言葉でも、相手の反応が違います。'),
    ],
  }]
  const notes = selectTeachingNotes(study)
  assert.equal(typeof notes['0:2'], 'string')
  assert.match(notes['0:2'], /[\u3040-\u30ff\u3400-\u9fff]/)
})

test('never creates callouts when lesson sections are empty', () => {
  assert.deepEqual(selectTeachingNotes([]), {})
  assert.deepEqual(selectTeachingNotes(undefined), {})
  assert.deepEqual(selectTeachingNotes([{ blocks: [] }]), {})
})
