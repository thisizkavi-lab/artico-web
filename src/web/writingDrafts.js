// Writing drafts are stored locally, separate from lesson progress.
// Every prompt has a stable ID; no draft text is sent to a server.
export const WRITING_DRAFT_PREFIX = 'artico.web.writing.draft.v1.'
export const WRITING_DRAFT_LIMIT = 16000
const validId = id => /^c(?:0[1-9]|1[0-4])-\d{3}$/.test(id)

export function readWritingDraft(storage, id) {
  if (!validId(id)) return ''
  try {
    const value = storage?.getItem(WRITING_DRAFT_PREFIX + id)
    return typeof value === 'string' ? value.slice(0, WRITING_DRAFT_LIMIT) : ''
  } catch {
    return ''
  }
}

export function saveWritingDraft(storage, id, text) {
  if (!validId(id) || typeof text !== 'string' || text.length > WRITING_DRAFT_LIMIT) return false
  try {
    if (text.trim()) storage.setItem(WRITING_DRAFT_PREFIX + id, text)
    else storage.removeItem(WRITING_DRAFT_PREFIX + id)
    return true
  } catch {
    return false
  }
}

export function listWritingDraftIds(storage, promptIds) {
  const ids = new Set()
  for (const id of promptIds) {
    if (readWritingDraft(storage, id).trim()) ids.add(id)
  }
  return ids
}

export function writingWordCount(text) {
  return text.trim() ? text.trim().split(/\s+/u).length : 0
}
