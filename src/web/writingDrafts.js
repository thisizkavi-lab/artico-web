// Writing drafts are stored locally, separate from lesson progress.
// Every prompt has a stable ID; no draft text is sent to a server.
import writingSource from './writingPrompts.json'

export const WRITING_DRAFT_PREFIX = 'artico.web.writing.draft.v1.'
export const WRITING_DRAFT_LIMIT = 16000
const validIds = new Set(writingSource.prompts.map(prompt => prompt.id))

export function readWritingDraft(storage, id) {
  if (!validIds.has(id)) return ''
  try {
    const value = storage?.getItem(WRITING_DRAFT_PREFIX + id)
    return typeof value === 'string' ? value.slice(0, WRITING_DRAFT_LIMIT) : ''
  } catch {
    return ''
  }
}

export function saveWritingDraft(storage, id, text) {
  if (!validIds.has(id) || typeof text !== 'string' || text.length > WRITING_DRAFT_LIMIT) return false
  try {
    if (text.trim()) storage.setItem(WRITING_DRAFT_PREFIX + id, text)
    else storage.removeItem(WRITING_DRAFT_PREFIX + id)
    return true
  } catch {
    return false
  }
}

export function listWritingDraftIds(storage) {
  const ids = new Set()
  for (const prompt of writingSource.prompts) {
    if (readWritingDraft(storage, prompt.id).trim()) ids.add(prompt.id)
  }
  return ids
}

export function writingWordCount(text) {
  return text.trim() ? text.trim().split(/\s+/u).length : 0
}
