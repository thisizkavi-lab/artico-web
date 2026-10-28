import organized from './vocabularyOrganized.json'

// Text-free, lesson-specific original PNG diagrams: one for every time term.
// The drawings are rasterized in the Pages build, never rendered as inline SVG.
const lesson = organized.lessons.find(item => item.sourceLesson === 3)
const index = new Map(lesson.groups.flatMap(group => group.items.map(([term]) => term))
  .map((term, i) => [term, i]))

export function vocabularyTimePng(term, chapter) {
  if (chapter !== 3 || !index.has(term)) return null
  return {
    type: 'png',
    src: import.meta.env.BASE_URL + 'vocabulary-ai/ch03/03-' +
      String(index.get(term)).padStart(3, '0') + '.png',
  }
}
