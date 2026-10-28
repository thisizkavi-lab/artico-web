import test from 'node:test'
import assert from 'node:assert/strict'
import { vocabularyReviewId, vocabularyTermKey, normalizeVocabularyTerm } from './vocabularyIdentity.js'
import { toVocabularyReviewContent, toNationalityReviewContent } from './vocabularyReview.js'
import { createReviewRecord, refreshReviewContent, scheduleReview, selectReviewQueue } from './reviewEngine.js'

test('same vocabulary sense has the same ID in repeated topics and spelling variants', () => {
  assert.equal(vocabularyReviewId('Coffee.', 4), vocabularyReviewId('coffee', 28))
  assert.equal(vocabularyReviewId('Hello! ', 4), vocabularyReviewId('hello', 7))
  assert.equal(vocabularyReviewId("I'm here", 7), vocabularyReviewId("I’m here", 7))
  assert.equal(normalizeVocabularyTerm('  GOOD   MORNING!  '), 'good morning')
  assert.equal(vocabularyReviewId('chicken', 54), vocabularyReviewId('chicken', 56))
  assert.equal(vocabularyReviewId('fish', 54), vocabularyReviewId('fish', 57))
})

test('homographs with genuinely different meanings retain different review histories', () => {
  for (const [word, a, b] of [
    ['Polish',1,11], ['turkey',1,54], ['second',2,3],
    ['date',3,21], ['date',21,29], ['bat',55,62],
    ['light',5,9], ['chicken',28,54], ['ticket',27,65],
  ]) assert.notEqual(vocabularyTermKey(word,a), vocabularyTermKey(word,b), word)
})

test('vocabulary review uses an explicit Japanese cue and stable original lesson', () => {
  const a=toVocabularyReviewContent('coffee',4,'コーヒー')
  const b=toVocabularyReviewContent('Coffee',28,'コーヒー')
  assert.equal(a.id,b.id)
  assert.equal(a.reviewDirection,'ja-to-en')
  assert.equal(a.origin,'vocabulary')
  assert.equal(a.vocabularyLesson,'04')
  assert.equal(b.vocabularyLesson,'28')
  assert.equal(a.chapter,'98')
  assert.throws(() => toVocabularyReviewContent('word',5,''), /Japanese cue/)
  assert.throws(() => toVocabularyReviewContent('word',79,'意味'), /Invalid vocabulary lesson/)
  assert.throws(() => toVocabularyReviewContent('',5,'意味'), /verified/)
})

test('nationality relationship has its own identity and is not a plain country card', () => {
  const japan = {code:'jp',country:'Japan',ja:'日本',nationality:'Japanese'}
  const content=toNationalityReviewContent(japan)
  assert.equal(content.id,'vocab:country-nationality:jp')
  assert.notEqual(content.id,vocabularyReviewId('Japan',1))
  assert.match(content.ja,/国籍/)
  assert.equal(content.en,'Japanese')
  assert.throws(()=>toNationalityReviewContent({code:'jp'}),/Incomplete/)
})

test('resaving vocabulary from a second lesson preserves FSRS state instead of duplicating a card', () => {
  const now=new Date('2026-10-28T10:00:00Z')
  const first=toVocabularyReviewContent('coffee',4,'コーヒー')
  const second=toVocabularyReviewContent('Coffee',28,'コーヒー')
  const record=createReviewRecord(first,now)
  const graded=scheduleReview(record,'good',now).record
  const refreshed=refreshReviewContent(graded,second,new Date(now.getTime()+60_000))
  assert.equal(refreshed.id,graded.id)
  assert.equal(refreshed.card.reps,1)
  assert.deepEqual(refreshed.card,graded.card)
  assert.equal(refreshed.addedAt,graded.addedAt)
  assert.equal(selectReviewQueue([refreshed],now).length,0)
})
