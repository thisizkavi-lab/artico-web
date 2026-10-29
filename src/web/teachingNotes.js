// Social Fluency editorial note selection.
//
// Do not turn every explanation into a callout. A note must clarify a
// distinction, caveat, situational meaning, or an easily misunderstood detail.
// This module only selects existing lesson text; it never rewrites or invents it.
//
// Keys are the permanent source block IDs. The sparse manual titles below
// capture important distinctions without requiring one-off JSX for every lesson.
const editorialTitles = {
  'ch03-b2': 'Small words, different jobs',
  'ch03-b11': 'Listening is not the same as agreeing',
  'ch04-b2': 'What these expressions really mean',
  'ch05-b4': 'Two uses of “I’m good”',
  'ch06-b8': 'Understanding is not necessarily agreeing',
  'ch08-b11': '“You shouldn’t have” can express gratitude',
  'ch10-b6': '“Good evening” vs. “Good night”',
  'ch14-b4': 'Step- and half- describe different relationships',
  'ch21-b6': '“For here” vs. “To go”',
  'ch21-b11': 'Preferences and allergies are different',
  'ch24-b10': 'Ingredients and allergen cross-contact',
  'ch24-b19': 'Splitting a check in two different ways',
  'ch52-b5': 'Discussed does not mean approved',
  'ch68-b5': 'Departure, boarding, and gate closing',
  'ch80-b6': 'A symptom is not the same as a cause',
  'ch90-b7': '“Breaking up” on the phone',
  'ch96-b5': 'An idiom is never required',
}

const strongEnglish = /\b(?:not|doesn't|don't|isn't|aren't|cannot|can't|rather than|instead|different|depends?|not always|never|without|not every|not the same|does not|do not|not a|unless|but|however)\b/i
const weakEnglish = /\b(?:means?|can also|may|might|often|sometimes|usually|in this (?:case|scene|exchange)|here)\b/i
const specialEnglish = /\b(?:has different uses|have different uses|the same words|different meaning|two uses|depends on the (?:context|situation)|not interchangeable)\b/i
const strongJapanese = /(?:とは限ら|ではありません|ではない|ではなく|異な|違い|違う|別の|区別|同じでは|必ずしも|誤解|という意味では|とは別|一方|逆に|ただし|とは違)/
const weakJapanese = /(?:意味|表す|指す|ことも|場合|この場面|この会話|ここでは|状況によって|文脈)/
const specialJapanese = /(?:二つの意味|異なる意味|意味が変|使い分け|同じ表現でも|場面によって|使い方が異な)/

const toText = (block) => (block.runs || []).map(run => run.text || '').join('').trim()

function scoreExplanation(block, previous) {
  if (block?.type !== 'explanation') return -1
  const text = toText(block)
  // Short subheadings and long reference essays remain ordinary content.
  if (text.length < 65 || text.length > 680) return -1

  const isJapanese = /[\u3040-\u30ff\u3400-\u9fff]/.test(text)
  const strong = isJapanese ? strongJapanese.test(text) : strongEnglish.test(text)
  const weak = isJapanese ? weakJapanese.test(text) : weakEnglish.test(text)
  const special = isJapanese ? specialJapanese.test(text) : specialEnglish.test(text)

  let score = previous?.type === 'conversation' || previous?.type === 'table' ? 3 :
    previous?.type === 'list' ? 2 : 0
  if (strong) score += 3
  else if (weak) score += 1
  if (special) score += 3
  if (/(?:\bmeans?\b|\brefers to\b|\bin this (?:scene|exchange|case)\b)/i.test(text)) score += 1
  if ((block.phraseIds || []).length > 4) score -= 1
  if (editorialTitles[block.id]) score += 4
  return score
}

function defaultTitle(block, previous, language) {
  const text = toText(block)
  const isJapanese = language === 'ja' || /[\u3040-\u30ff\u3400-\u9fff]/.test(text)
  if (editorialTitles[block.id]) return editorialTitles[block.id]
  if (specialEnglish.test(text) || specialJapanese.test(text))
    return isJapanese ? '同じ表現でも意味が変わる' : 'The meaning depends on context'
  if (/(?:\bdifferent\b|\bnot the same\b|\bnot interchangeable\b|区別|異な|別の|違い)/i.test(text))
    return isJapanese ? '大切な違い' : 'An important distinction'
  if (previous?.type === 'conversation')
    return isJapanese ? 'この会話のポイント' : 'What to notice in this conversation'
  return isJapanese ? '知っておきたいこと' : 'Good to know'
}

/**
 * Return a map of "sectionIndex:blockIndex" to concise note headings.
 * Select at most one genuine clarification per section and three per lesson.
 * This keeps the yellow treatment meaningful rather than visually repetitive.
 */
export function selectTeachingNotes(study, { maxPerChapter = 3 } = {}) {
  const candidates = []
  if (!Array.isArray(study)) return {}
  study.forEach((section, sectionIndex) => {
    const blocks = section.blocks || []
    const choices = []
    blocks.forEach((block, blockIndex) => {
      // Section-opening context belongs in normal prose, not a warning box.
      if (blockIndex === 0) return
      const score = scoreExplanation(block, blocks[blockIndex - 1])
      if (score < 5) return
      choices.push({
        sectionIndex, blockIndex, block, score,
        title: defaultTitle(block, blocks[blockIndex - 1],
          /[\u3040-\u30ff\u3400-\u9fff]/.test(toText(block)) ? 'ja' : 'en'),
      })
    })
    choices.sort((a,b) => b.score - a.score || a.blockIndex - b.blockIndex)
    if (choices.length) candidates.push(choices[0])
  })
  // Select the most distinctive explanations first, without stacking several
  // yellow boxes in a chapter. Render selected notes in their source order.
  candidates.sort((a,b) => b.score - a.score || a.sectionIndex - b.sectionIndex)
  return Object.fromEntries(candidates.slice(0, maxPerChapter).map(note =>
    [`${note.sectionIndex}:${note.blockIndex}`, note.title]))
}
