import organized from './vocabularyOrganized.json'

// Text-free, lesson-specific original PNG diagrams: one for every time term.
// The drawings are rasterized in the Pages build, never rendered as inline SVG.
const lesson = organized.lessons.find(item => item.sourceLesson === 3)
const index = new Map(lesson.groups.flatMap(group => group.items.map(([term]) => term))
  .map((term, i) => [term, i]))


// Reviewed, term-specific visual storytelling for the nine relative-time cards.
// These are committed assets rather than expiring remote image links.
const relativeTimeArt = {
  'now / right now': 'now-right-now',
  'earlier / later': 'earlier-later',
  'before / after': 'before-after',
  'yesterday / today / tomorrow': 'yesterday-today-tomorrow',
  'this morning / this afternoon / this evening': 'this-morning-this-afternoon-this-evening',
  'tonight': 'tonight',
  'last week / this week / next week': 'last-week-this-week-next-week',
  'ago': 'ago',
  'soon': 'soon',
}

export function vocabularyTimePng(term, chapter) {
  if (chapter !== 3 || !index.has(term)) return null
  if (relativeTimeArt[term]) {
    return {
      type: 'png',
      src: import.meta.env.BASE_URL + 'vocabulary-ai/ch03/relative-time/' +
        relativeTimeArt[term] + '.webp',
    }
  }
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-ai/ch03/03-' +
      String(index.get(term)).padStart(3, '0') + '.png',
  }
}
