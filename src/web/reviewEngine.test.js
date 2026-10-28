import test from 'node:test'
import assert from 'node:assert/strict'
import {
  REVIEW_VERSION,
  REVIEW_GRADES,
  toReviewContent,
  createReviewRecord,
  refreshReviewContent,
  scheduleReview,
  isReviewDue,
  selectReviewQueue,
} from './reviewEngine.js'

const NOW = new Date('2026-10-28T10:00:00.000Z')
const phrase = { id: 'ch01-p112829969009517', en: 'Hi.', context: 'A short greeting', kind: 'phrase' }
const other = { id: 'ch01-v0', en: 'Good morning.', context: 'A morning greeting', kind: 'word' }
const later = (minutes) => new Date(NOW.getTime() + minutes * 60_000)

test('Artico practice content maps to a single stable review identity', () => {
  assert.deepEqual(toReviewContent(phrase, '01'), {
    id: phrase.id, sourceId: phrase.id, chapter: '01', en: 'Hi.',
    ja: '', context: phrase.context, kind: 'phrase',
  })
  assert.equal(toReviewContent({ ...other, studyId: 'ch01-p123' }, '01').sourceId, 'ch01-p123')
  assert.throws(() => toReviewContent(phrase, '02'), /chapter/)
  assert.throws(() => toReviewContent({ ...phrase, id: 'random' }, '01'), /stable/)
  assert.throws(() => toReviewContent({ ...phrase, en: '' }, '01'), /English/)
})

test('New cards serialize safely and are ready immediately without pretending a recall happened', () => {
  const record = createReviewRecord(toReviewContent(phrase, '01'), NOW)
  assert.equal(record.version, REVIEW_VERSION)
  assert.equal(record.active, true)
  assert.equal(record.card.reps, 0)
  assert.equal(record.addedAt, NOW.toISOString())
  assert.equal(isReviewDue(record, NOW), true)
  assert.equal(JSON.parse(JSON.stringify(record)).card.due, record.card.due)
})

test('Every rating uses the FSRS model, records an auditable event, and schedules a real date', () => {
  for (const grade of REVIEW_GRADES) {
    const record = createReviewRecord(toReviewContent(phrase, '01'), NOW)
    const { record: result, log } = scheduleReview(record, grade, NOW)
    assert.equal(log.itemId, record.id)
    assert.equal(log.grade, grade)
    assert.equal(log.wasNew, true)
    assert.equal(log.model, 'fsrs-5.4.2')
    assert.equal(result.card.reps, 1)
    assert.ok(Date.parse(result.card.due) > NOW.getTime(), grade)
    assert.equal(result.card.last_review, NOW.toISOString())
    assert.equal(record.card.reps, 0, 'scheduler never mutates input')
  }
})

test('Reviewing an existing card advances history; content edits preserve its memory', () => {
  const initial = createReviewRecord(toReviewContent(phrase, '01'), NOW)
  const first = scheduleReview(initial, 'good', NOW).record
  const refreshed = refreshReviewContent(first, { ...toReviewContent(phrase, '01'), context: 'Updated lesson explanation' }, later(60))
  assert.equal(refreshed.context, 'Updated lesson explanation')
  assert.deepEqual(refreshed.card, first.card)
  assert.equal(refreshed.addedAt, first.addedAt)
  const secondTime = new Date(Math.max(Date.parse(first.card.due), later(60).getTime()))
  const second = scheduleReview(refreshed, 'easy', secondTime)
  assert.equal(second.log.wasNew, false)
  assert.equal(second.record.card.reps, 2)
  assert.equal(second.log.dueBeforeReview, first.card.due)
})

test('Invalid ratings, clock rollback and mismatched identities fail closed', () => {
  const item = createReviewRecord(toReviewContent(phrase, '01'), NOW)
  assert.throws(() => scheduleReview(item, 'perfect', NOW), /grade/)
  assert.throws(() => refreshReviewContent(item, toReviewContent(other, '01')), /identity/)
  const reviewed = scheduleReview(item, 'good', NOW).record
  assert.throws(() => scheduleReview(reviewed, 'good', later(-1)), /precedes/)
  assert.throws(() => scheduleReview({ ...item, active: false }, 'good', NOW), /Inactive/)
})

test('Due reviews precede new cards; duplicate content is not created by the queue', () => {
  const fresh = createReviewRecord(toReviewContent(phrase, '01'), NOW)
  const newSecond = createReviewRecord(toReviewContent(other, '01'), later(-1))
  const reviewed = scheduleReview(fresh, 'good', NOW).record
  assert.deepEqual(selectReviewQueue([fresh, newSecond], NOW, { newLimit: 1 }).map((x) => x.id), [other.id])
  assert.deepEqual(selectReviewQueue([reviewed, newSecond], NOW, { newLimit: 0 }), [])
  const date = new Date(Date.parse(reviewed.card.due) + 60_000)
  assert.deepEqual(selectReviewQueue([newSecond, reviewed], date, { newLimit: 1 }).map((x) => x.id), [phrase.id, other.id])
  assert.deepEqual(selectReviewQueue([{ ...fresh, active: false }], NOW), [])
  assert.throws(() => selectReviewQueue([], NOW, { newLimit: -1 }), /limit/)
})
