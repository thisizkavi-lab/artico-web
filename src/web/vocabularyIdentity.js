// One canonical identity per English expression AND meaning. Keep this stable:
// learners' review histories are keyed by these values, not by UI card positions.
// Explicit polysemy overrides are shared with the course deduplicator.
const senses = {
  polish: { 1:'nationality', 11:'clean' },
  turkey: { 1:'country',54:'bird' },
  second: { 2:'ordinal',3:'duration' },
  date: { 3:'calendar',21:'romance',29:'fruit' },
  chicken: { 28:'food',54:'animal',56:'animal' },
  fish: { 28:'food',54:'animal',57:'animal' },
  crab: { 28:'food',50:'animal',57:'animal' },
  shell: { 28:'food',50:'beach',57:'animal' },
  nuts: { 12:'hardware',28:'food',29:'food' },
  light: { 5:'weight',9:'lighting' },
  burn: { 14:'injury',68:'injury',78:'process' },
  coach: { 44:'vehicle',60:'occupation' },
  court: { 27:'legal',62:'sport' },
  ticket: { 27:'citation',44:'fare',48:'fare',65:'admission' },
  interview: { 34:'job',42:'job',66:'media',67:'media' },
  bat: { 55:'animal',62:'sport-equipment' },
  leg: { 14:'body',28:'meat-cut' },
  bath: { 4:'activity',9:'fixture' },
  mean: { 18:'unkind',25:'meaning' },
  record: { 64:'audio-recording',66:'video-recording',78:'research-notes' },
  train: { 39:'instruction',44:'vehicle',71:'instruction' },
}

export function normalizeVocabularyTerm(term) {
  if (typeof term !== 'string' || !term.trim()) throw new Error('Vocabulary term required')
  return term.normalize('NFKC').toLocaleLowerCase('en')
    .replace(/[‘’]/g, "'").replace(/\s+/g, ' ')
    .replace(/[.!?]+$/, '').trim()
}

export function vocabularyTermKey(term, lesson) {
  if (!Number.isInteger(Number(lesson)) || Number(lesson) < 1 || Number(lesson) > 78)
    throw new Error('Invalid vocabulary lesson')
  const normalized = normalizeVocabularyTerm(term)
  return normalized + ':' + (senses[normalized]?.[Number(lesson)] || 'default')
}

export function vocabularyReviewId(term, lesson) {
  return 'vocab:' + encodeURIComponent(vocabularyTermKey(term, lesson))
}
