// Original, separately reviewed Daily Routines lesson PNGs.
// Kept separate from legacy scene art so only the approved words are replaced.
const editorialSlugs = new Set([
  "bed",
  "buy-groceries",
  "cafe",
  "call-a-friend",
  "call-your-family",
  "check-your-emails",
  "clear-the-table",
  "dishes",
  "do-homework",
  "do-the-dishes",
  "do-the-housework",
  "feed-the-cat",
  "feed-the-dog",
  "friends",
  "go-home",
  "go-out",
  "go-to-a-cafe",
  "go-to-bed",
  "have-a-break",
  "homework",
  "housework",
  "iron-a-shirt",
  "leave-the-house",
  "listen-to-the-radio",
  "make-the-bed",
  "put-the-children-to-bed",
  "read-a-newspaper",
  "run-errands",
  "take-out-the-trash",
  "walk-the-dog"
])

export function vocabularyDailyRoutineExtra(term, chapter) {
  if (chapter !== 4) return null
  const slug = String(term).toLocaleLowerCase('en')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (!editorialSlugs.has(slug)) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-art/04-' + slug + '.png',
  }
}
