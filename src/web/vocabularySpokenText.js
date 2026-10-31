// Chapter 98 labels are written for learners, not for a text-to-speech model.
// Preserve the visible card exactly; turn alternatives and editorial notes into
// a separate, natural reading script for the vocabulary speaker only.
const exactReadings = new Map([
  ['u.s./usa, america', 'U S. U S A. America.'],
  ['u.s./usa', 'U S. U S A.'],
  ['u.s.', 'U S.'],
  ['usa', 'U S A.'],
  ['u.k.', 'U K.'],
  ['uk', 'U K.'],
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
    .replace(/\bU\.S\.(?=\W|$)/gi, 'U S')
    .replace(/\bUSA\b/gi, 'U S A')
    .replace(/\bU\.K\.(?=\W|$)/gi, 'U K')
    .replace(/\bUK\b/g, 'U K')
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


// Some extremely short, isolated words are unstable in Kokoro's generative
// synthesis even when their phonemes are correct. These learner-critical
// exceptions use the browser's en-US speech voice rather than guess a spelling.
const deviceVoiceExceptions = new Set(['tea'])

export function vocabularyPrefersDeviceVoice(label) {
  const spoken = vocabularySpokenText(label).toLowerCase().replace(/[.!?]+$/, '').trim()
  return deviceVoiceExceptions.has(spoken)
}
