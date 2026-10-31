// Chapter 98 labels are written for learners, not for a text-to-speech model.
// Preserve the visible card exactly; turn alternatives and editorial notes into
// a separate, natural reading script for the vocabulary speaker only.
const exactReadings = new Map([
  ['u.s./usa, america', 'the United States. U S A. America.'],
  ['u.s./usa', 'the United States. U S A.'],
  ['u.s.', 'the United States.'],
  ['usa', 'U S A.'],
  ['u.k.', 'the United Kingdom.'],
  ['uk', 'the United Kingdom.'],
  ['24/7', 'twenty-four seven'],
  ['1/2', 'one half'],
  ['1/3', 'one third'],
  ['2/3', 'two thirds'],
  ['1/4', 'one quarter'],
  ['3/4', 'three quarters'],
])

export function vocabularySpokenText(label) {
  const original = String(label ?? '').trim()
  if (!original) return ''
  const exact = exactReadings.get(original.toLowerCase())
  if (exact) return exact

  const cleaned = original
    // Parentheses explain spelling, register, or meaning; they aren't speech.
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\bU\.S\.A\.?(?=\W|$)/gi, 'U S A')
    .replace(/\bU\.S\.(?=\W|$)/gi, 'the United States')
    .replace(/\bUSA\b/gi, 'U S A')
    .replace(/\bU\.K\.(?=\W|$)/gi, 'the United Kingdom')
    .replace(/\bUK\b/g, 'the United Kingdom')
    .replace(/\bR\s*&\s*D\b/gi, 'R and D')
    .replace(/\bHR\b/g, 'H R')
    // Slash means a list of alternatives, not the word "slash".
    .replace(/\s*\/\s*/g, '. ')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s+/g, ' ')
    .replace(/(?:\.\s*){2,}/g, '. ')
    .trim()

  // A label such as "bowl / bowl (container)" needs just one reading.
  const parts = cleaned.split(/\.\s+/).filter(Boolean)
  if (parts.length > 1) {
    const unique = []
    const known = new Set()
    for (const part of parts) {
      const normalized = part.trim().toLowerCase()
      if (!known.has(normalized)) {
        known.add(normalized)
        unique.push(part.trim())
      }
    }
    return unique.join('. ')
  }
  return cleaned
}
