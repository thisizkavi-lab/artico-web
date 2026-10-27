// Public chapter numbers are distinct from the stable 96 source lesson IDs.
// Inserting Humor & Banter at 34 leaves recordings, practice phrase IDs,
// chapter artwork, and pre-existing source lesson data unchanged.
export const HUMOR_CHAPTER = '34'
export const SOCIAL_CHAPTER_COUNT = 97
export const VOCABULARY_CHAPTER = '98'
export const twoDigits = number => String(number).padStart(2, '0')

export function sourceChapterId(publicId) {
  const number = Number(publicId)
  return Number.isInteger(number) && number >= 1 && number <= SOCIAL_CHAPTER_COUNT && number !== 34
    ? twoDigits(number > 34 ? number - 1 : number)
    : null
}

export function publicChapterId(sourceId) {
  const number = Number(sourceId)
  return Number.isInteger(number) && number >= 1 && number <= 96
    ? twoDigits(number >= 34 ? number + 1 : number)
    : null
}

// One-time migration for old local lesson URLs. Content identifiers for phrases
// remain stable; only the public lesson number changes.
export function migrateLegacyLessonPath(path) {
  if (typeof path !== 'string') return path
  return path.replace(/^\/lesson\/(\d{2})(?=\/)/, (full, digits) => {
    const moved = Number(digits)
    if (moved === 97) return full // previous vocabulary path, redirected separately
    return moved >= 34 && moved <= 96 ? '/lesson/' + twoDigits(moved + 1) : full
  })
}
