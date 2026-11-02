const plain = (runs = []) => runs.map((run) => run.text).join('')
const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Preserve every character while making the expression, rather than the whole
// explanation, visually prominent. Quotes and existing practice targets both
// work even when the original paragraph was saved as one plain-text run.
export function emphasizeNoteRuns(runs = [], byId = {}, explainedTerms = []) {
  const text = plain(runs)
  const normalized = text.replace(/[‘’]/g, "'")
  const ranges = []
  for (const term of explainedTerms.filter(Boolean)) {
    const candidate = term.replace(/[‘’]/g, "'")
    const pattern = new RegExp(`(?<![a-z0-9])${escaped(candidate)}(?![a-z0-9])`, 'gi')
    for (const match of normalized.matchAll(pattern)) ranges.push([match.index, match.index + match[0].length])
  }
  for (const match of text.matchAll(/[“"]([^”"\n]+)[”"]/g)) {
    if (/[a-z]/i.test(match[1])) ranges.push([match.index + 1, match.index + match[0].length - 1])
  }
  for (const term of new Set(Object.values(byId).map((item) => item.en?.trim()).filter((term) => term?.length >= 3))) {
    const candidate = term.replace(/[‘’]/g, "'").replace(/[.!?,;:]+$/, '')
    if (!candidate || !/[a-z]/i.test(candidate)) continue
    const pattern = new RegExp(`(?<![a-z0-9])${escaped(candidate)}(?![a-z0-9])`, 'gi')
    for (const match of normalized.matchAll(pattern)) {
      const after = normalized.slice(match.index + match[0].length)
      const before = normalized.slice(0, match.index).split(/[.!?。]\s*/).at(-1).trim()
      if (/^(?:a|an|the|to|here|this|この|ここでは)?$/i.test(before) && /^\s*(?:here\s+)?(?:means?|describes?|can (?:describe|ask)|reports?|is |are |は|とは)/i.test(after)) {
        ranges.push([match.index, match.index + match[0].length])
      }
    }
  }
  for (const match of text.matchAll(/(?:^|[.!?]\s+)([A-Z][a-z]+(?:\s+(?:up|out|in|off))?)(?=\s+(?:here\s+)?(?:means|describes|can describe|reports))/g)) {
    const start = match.index + match[0].length - match[1].length
    ranges.push([start, start + match[1].length])
  }
  let offset = 0
  return runs.flatMap((run) => {
    const start = offset
    offset += run.text.length
    const cuts = [...new Set([start, offset, ...ranges.flat().filter((point) => point > start && point < offset)])].sort((a, b) => a - b)
    return cuts.slice(0, -1).map((point, index) => ({ ...run,
      text: text.slice(point, cuts[index + 1]),
      emphasis: Boolean(run.emphasis || ranges.some(([a, b]) => point >= a && cuts[index + 1] <= b)),
    }))
  }).reduce((result, run) => {
    const previous = result.at(-1)
    if (previous && previous.emphasis === run.emphasis && previous.italic === run.italic && previous.href === run.href) previous.text += run.text
    else result.push({ ...run })
    return result
  }, [])
}
