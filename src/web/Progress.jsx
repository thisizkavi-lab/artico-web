import { useLanguage } from './Language'
import { Button, Heading } from './components'
import { chapterById, foundationSteps } from './content'
import { familiarityOptions } from './phrasePractice'
import './progress.css'

export default function Progress({ learning }) {
  const { t, language } = useLanguage()
  const chapter = chapterById[learning.last?.match(/\/lesson\/(\d+)/)?.[1]]
  const foundation = foundationSteps.find((step) =>
    learning.last?.startsWith(`/foundation/${step.id}/`),
  )
  const ratings = Object.values(learning.practiceSets ?? {}).flatMap((set) =>
    Object.values(set.ratings ?? {}),
  )
  const foundationOpened = foundationSteps.filter((step) =>
    [...Object.keys(learning.positions), learning.last].some((path) =>
      path?.startsWith(`/foundation/${step.id}/`),
    ),
  )
  const opened = [
    ...new Set(
      [...Object.keys(learning.positions), learning.last]
        .filter(Boolean)
        .map((path) => path.match(/\/lesson\/(\d+)/)?.[1])
        .filter(Boolean),
    ),
  ].sort()
  return (
    <div className="aw-page aw-library-page aw-progress">
      <Heading eyebrow={t("YOUR LEARNING")} title={t("A little more familiar.")} />
      <p className="aw-progress-intro"> {t("Pick up where you left off. Your place and practice choices stay in this browser.")} </p>
      <section className="aw-progress-resume">
        <div>
          <span>{t("CONTINUE LEARNING")}</span>
          <h2>{(language === 'ja' ? chapter?.ja : chapter?.title) ?? (language === 'ja' ? foundation?.ja : foundation?.en) ?? t("Start with the big picture")}</h2>
          <p>
            {chapter
              ? t('Chapter {id}', { id: chapter.id })
              : foundation
                ? t("Foundations & orientation")
                : t("Orientation")}{' '}
            ·{' '}
            {/\/(practice|chunks|whole)(?:[/?]|$)/.test(learning.last ?? '') ? t("Practice") : t("Study")}
          </p>
        </div>
        <Button href={learning.last ?? '/foundation/orientation/study'}>{t("Continue →")}</Button>
      </section>
      <section className="aw-progress-phrases">
        <h2>{t("Your phrase check-in")}</h2>
        <p>{t("Across the chapters you have practiced")}</p>
        <div className="aw-progress-ratings">
          {familiarityOptions.map((option) => (
            <div key={option.value}>
              <strong>{ratings.filter((value) => value === option.value).length}</strong>
              <span>{t(option.label)}</span>
            </div>
          ))}
        </div>
        <p>{t("These are your own ratings, not a test score.")}</p>
        <Button variant="outline" href={learning.lastPractice ?? '/courses?social'}> {t("Choose phrases to practice")} </Button>
      </section>
      <section className="aw-progress-opened">
        <h2>{t("Chapters you have opened")}</h2>
        {opened.length ? (
          opened.map((id) => (
            <a key={id} href={`#/lesson/${id}/study`}>
              <span>{id}</span>
              <strong>{language === 'ja' ? chapterById[id].ja : chapterById[id].title}</strong>
              <span>{t("Continue →")}</span>
            </a>
          ))
        ) : (
          <p>{t("Your chapters will appear here as you explore.")}</p>
        )}
      </section>
      {foundationOpened.length > 0 && (
        <section className="aw-progress-opened">
          <h2>{t("Orientation & foundations")}</h2>
          {foundationOpened.map((step) => (
            <a key={step.id} href={`#/foundation/${step.id}/study`}>
              <strong>{language === 'ja' ? step.ja : step.en}</strong>
              <span>{t("Continue →")}</span>
            </a>
          ))}
        </section>
      )}
      <a className="aw-progress-saved" href="#/saved"> {t("Saved phrases")} <span>{learning.saved.length} →</span>
      </a>
    </div>
  )
}
