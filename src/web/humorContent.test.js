import test from 'node:test'
import assert from 'node:assert/strict'
import { moves, scenes, chats, memes, videos, exercises, starterIds, branches, writingPrompts, usefulPhrases } from './humorContent.js'

test('Humor chapter has complete and stable editorial sections', () => {
  assert.equal(moves.length, 7)
  assert.ok(scenes.length >= 3)
  assert.ok(chats.length >= 3)
  assert.ok(memes.length >= 3)
  assert.equal(videos.length, 5)
  assert.equal(writingPrompts.length, 4)
  assert.ok(usefulPhrases.length >= 6)
})
test('Every contextual question has a unique stable ID and supported answer', () => {
  assert.equal(exercises.length, 28)
  assert.equal(new Set(exercises.map(q => q.id)).size, exercises.length)
  for (const q of exercises) {
    assert.match(q.id, /^ch34-p(?:0[1-9]|1[0-9]|2[0-8])$/)
    assert.ok(['notice','decode','respond','digital','delivery'].includes(q.category))
    assert.ok(q.scene && q.question && q.why && q.whyJa)
    assert.ok(Array.isArray(q.options) && q.options.length === 3)
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length)
    assert.ok(q.options.every(x => x.length > 5))
  }
})
test('Short set and branching paths reference valid content', () => {
  assert.equal(starterIds.length, 8)
  assert.equal(new Set(starterIds).size, starterIds.length)
  const ids = new Set(exercises.map(x => x.id))
  assert.ok(starterIds.every(id => ids.has(id)))
  assert.equal(branches.length, 4)
  for (const branch of branches) {
    assert.ok(branch.id && branch.name && branch.ja && branch.line && branch.scene)
    assert.ok(branch.choices.length >= 3)
    assert.ok(branch.choices.every(c => c.length === 4 && c.every(x => x.length > 1)))
  }
})
test('Meme references use source links and original teaching diagrams', () => {
  for (const meme of memes) {
    assert.match(meme.source, /^https:\/\//)
    assert.ok(meme.diagram && meme.caption && meme.ja)
  }
  for (const video of videos) {
    assert.match(video.id, /^[\w-]{11}$/)
    assert.ok(video.publisher && video.prompt && video.ja)
  }
})
