// Longer academic compositions are stored separately from short lesson progress.
// Stable IDs are used so editing a lesson does not overwrite another draft.
export const ACADEMIC_DRAFT_PREFIX = 'artico.web.academic.draft.v1.'
export const ACADEMIC_DRAFT_LIMIT = 16000
const valid = id => /^0[1-6]\.\d{2}$/.test(id)

export function readAcademicDraft(storage,id) {
  if(!valid(id)) return ''
  try {
    const value=storage?.getItem(ACADEMIC_DRAFT_PREFIX+id)
    return typeof value==='string' ? value.slice(0,ACADEMIC_DRAFT_LIMIT) : ''
  } catch { return '' }
}
export function saveAcademicDraft(storage,id,value) {
  if(!valid(id) || typeof value!=='string' || value.length>ACADEMIC_DRAFT_LIMIT) return false
  try {
    if(value) storage?.setItem(ACADEMIC_DRAFT_PREFIX+id,value)
    else storage?.removeItem(ACADEMIC_DRAFT_PREFIX+id)
    return !!storage
  } catch { return false }
}
export function downloadAcademicDraft(lesson,value) {
  if(!lesson?.id || !valid(lesson.id) || !value) return
  const content = lesson.id+' — '+lesson.title+'\n\n'+value+'\n'
  const blob = new Blob([content],{type:'text/plain;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const link=document.createElement('a')
  link.href=url
  link.download='artico-academic-'+lesson.id.replace('.','-')+'.txt'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(()=>URL.revokeObjectURL(url),1000)
}
