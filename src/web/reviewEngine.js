import { createEmptyCard, fsrs, Rating } from 'ts-fsrs'

// The FSRS implementation is deliberately isolated here. All lesson/UI code
// works with Artico's stable content IDs and serializable records.
export const REVIEW_VERSION = 1
export const REVIEW_GRADES = Object.freeze(['again', 'hard', 'good', 'easy'])
const ratingCodes = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
}
const scheduler = fsrs({
  request_retention: 0.9,
  maximum_interval: 36500,
  enable_fuzz: false,
  enable_short_term: true,
  learning_steps: ['1m', '10m'],
  relearning_steps: ['10m'],
})

function validDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid review date')
  return date
}

function serializeCard(card) {
  return {
    ...card,
    due: validDate(card.due).toISOString(),
    ...(card.last_review ? { last_review: validDate(card.last_review).toISOString() } : {}),
  }
}

function deserializeCard(record) {
  if (!record?.card || typeof record.card !== 'object') throw new Error('Missing review card')
  return {
    ...record.card,
    due: validDate(record.card.due),
    ...(record.card.last_review ? { last_review: validDate(record.card.last_review) } : {}),
  }
}

export function toReviewContent(item, chapter, displayChapter = chapter) {
  if (!item || typeof item.id !== 'string' || !/^ch(?:0[1-9]|[1-8]\d|9[0-9])-(?:p|v|line|b)\d+$/.test(item.id))
    throw new Error('Review item requires a stable Artico phrase ID')
  if (typeof item.en !== 'string' || !item.en.trim()) throw new Error('Review item needs English text')
  if (!/^(?:0[1-9]|[1-8]\d|9[0-9])$/.test(chapter) || !item.id.startsWith(`ch${chapter}-`))
    throw new Error('Review item chapter does not match its ID')
  if (!/^(?:0[1-9]|[1-9]\\d)$/.test(displayChapter))
    throw new Error('Invalid public chapter number')
  // Recognition is the safe default. Context is a usage hint, NOT an
  // automatically-generated translation or a verified production cue.
  return {
    id: item.id,
    sourceId: item.studyId ?? item.id,
    chapter,
    displayChapter,
    en: item.en.trim().slice(0, 500),
    ja: typeof item.ja === 'string' ? item.ja.trim().slice(0, 1000) : '',
    context: typeof item.context === 'string' ? item.context.trim().slice(0, 1000) : '',
    kind: item.kind === 'word' ? 'word' : 'phrase',
  }
}

export function createReviewRecord(content, now = new Date()) {
  const date = validDate(now)
  if (!content?.id || !content?.en) throw new Error('Invalid review content')
  return {
    ...content,
    version: REVIEW_VERSION,
    active: true,
    addedAt: date.toISOString(),
    updatedAt: date.toISOString(),
    card: serializeCard(createEmptyCard(date)),
  }
}

export function refreshReviewContent(record, content, now = new Date()) {
  if (!record || record.id !== content?.id) throw new Error('Cannot change the identity of a review item')
  return {
    ...record,
    ...content,
    version: REVIEW_VERSION,
    active: true,
    updatedAt: validDate(now).toISOString(),
  }
}

export function scheduleReview(record, grade, now = new Date()) {
  if (!REVIEW_GRADES.includes(grade)) throw new Error('Invalid review grade')
  if (record?.version !== REVIEW_VERSION || record.active !== true) throw new Error('Inactive or incompatible review item')
  const date = validDate(now)
  // Never allow a clock rollback to masquerade as successful long-term recall.
  if (record.card.last_review && date < validDate(record.card.last_review))
    throw new Error('Review time precedes the previous review')
  const result = scheduler.next(deserializeCard(record), date, ratingCodes[grade])
  return {
    record: {
      ...record,
      card: serializeCard(result.card),
      updatedAt: date.toISOString(),
    },
    log: {
      itemId: record.id,
      reviewedAt: date.toISOString(),
      grade,
      model: 'fsrs-5.4.2',
      wasNew: Number(record.card.reps) === 0,
      dueBeforeReview: record.card.due,
      dueAfterReview: validDate(result.card.due).toISOString(),
      stateBefore: record.card.state,
      stateAfter: result.card.state,
    },
  }
}

export function isReviewDue(record, now = new Date()) {
  return Boolean(record?.active && record.card && validDate(record.card.due) <= validDate(now))
}

export function selectReviewQueue(records, now = new Date(), { newLimit = 10 } = {}) {
  const date = validDate(now)
  if (!Number.isInteger(newLimit) || newLimit < 0) throw new Error('Invalid new-card limit')
  const ready = records.filter((record) => isReviewDue(record, date))
  const due = ready.filter((record) => Number(record.card.reps) > 0)
    .sort((a, b) => validDate(a.card.due) - validDate(b.card.due) || a.id.localeCompare(b.id))
  const fresh = ready.filter((record) => Number(record.card.reps) === 0)
    .sort((a, b) => validDate(a.addedAt) - validDate(b.addedAt) || a.id.localeCompare(b.id))
    .slice(0, newLimit)
  return [...due, ...fresh]
}
