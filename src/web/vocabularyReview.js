import { vocabularyReviewId } from './vocabularyIdentity.js'

// A review has one stable sense-aware ID, regardless of how often a word
// appears in lessons. Never key memory by group index, translated text or art.
export function toVocabularyReviewContent(term, lesson, ja, note = '') {
  const english = typeof term === 'string' ? term.trim() : ''
  const meaning = typeof ja === 'string' ? ja.trim() : ''
  if (!english || !meaning) throw new Error('A reviewable vocabulary item needs a verified English term and Japanese cue')
  const number = Number(lesson)
  const display = String(number).padStart(2, '0')
  return {
    id: vocabularyReviewId(english, number),
    sourceId: 'topic-' + display,
    chapter: '98',
    displayChapter: '98',
    vocabularyLesson: display,
    origin: 'vocabulary',
    reviewDirection: 'ja-to-en',
    en: english.slice(0, 500),
    ja: meaning.slice(0, 1000),
    context: typeof note === 'string' ? note.trim().slice(0, 1000) : '',
    kind: english.split(/\s+/).length > 1 ? 'phrase' : 'word',
  }
}

// Unlike "Japan" and "Japanese", the *relationship* country -> nationality
// is a distinct skill. Do not collapse it into either plain vocabulary card.
export function toNationalityReviewContent(country) {
  if (!country || !/^[a-z]{2}$/.test(country.code) || !country.nationality || !country.ja)
    throw new Error('Incomplete country/nationality card')
  return {
    id: 'vocab:country-nationality:' + country.code,
    sourceId: 'country-' + country.code,
    chapter: '98',
    displayChapter: '98',
    vocabularyLesson: '01',
    origin: 'vocabulary',
    reviewDirection: 'ja-to-en',
    en: country.nationality,
    ja: country.ja + ' · 国籍 / nationality',
    context: country.country,
    kind: 'word',
  }
}
