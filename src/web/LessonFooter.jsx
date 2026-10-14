import { useLanguage } from './Language'
import { chapterById, foundationSteps } from './content'
import { parseRoute } from './learning'
import { getLessonNavigation } from './pathway'
import Glyph from './Glyph'
import './lesson-navigation.css'

export default function LessonFooter({ route, practice, practicePath }) {
  const { t, language } = useLanguage()
  const navigation = getLessonNavigation(route)
  if (!navigation) return null

  function destinationTitle(path) {
    const destination = parseRoute(`#${path}`)
    if (destination.page === 'lesson') {
      const chapter = chapterById[destination.id]
      return `${t('Chapter {id}', { id: chapter.id })} · ${language === 'ja' ? chapter.ja : chapter.title}`
    }
    if (destination.page === 'foundation') {
      const lesson = foundationSteps.find((step) => step.id === destination.id)
      return language === 'ja' ? lesson.ja : lesson.en
    }
    return t(destination.page === 'progress' ? 'Your progress' : 'Orientation')
  }

  return (
    <footer className="ln-footer">
      {!practice && (
        <div className="ip-study-end">
          <div>
            <h2>{t('Give it a try.')}</h2>
            <p>{t('Practice what you learned in this lesson.')}</p>
          </div>
          <a className="ip-primary" href={`#${practicePath ?? navigation.practice}`}>
            {t('Go to Practice')} <Glyph name="arrow" />
          </a>
        </div>
      )}
      <nav className="ln-navigation" aria-label={t('Lesson navigation')}>
        {['previous', 'next'].map((direction) => {
          const path = navigation[direction]
          const title = destinationTitle(path)
          const back = direction === 'previous'
          const label = back
            ? path.startsWith('/courses') ? 'Back to course' : 'Previous'
            : 'Next'
          return (
            <a key={direction} href={`#${path}`} rel={back ? 'prev' : 'next'}
              aria-label={t(back ? 'Previous: {title}' : 'Next: {title}', { title })}>
              {back && <Glyph name="back" size={18} />}
              <span><span>{t(label)}</span><strong>{title}</strong></span>
              {!back && <Glyph name="arrow" size={18} />}
            </a>
          )
        })}
      </nav>
    </footer>
  )
}
