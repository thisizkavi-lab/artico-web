import { useLanguage } from './Language'
import { useState } from 'react'
import { Button, Heading, Icon } from './components'
import CurriculumIcon, { chapterIcon, foundationIcon, groupIcon, stageIcon } from './CurriculumIcon'
import { introductionAliases } from '../course/introductions'
import { getLearningStage, learningStages } from './pathway'
import { catalog, foundationSteps, groups, savedItems } from './content'
import './library-readable.css'

export function Courses({ learning, route }) {
  const { t, language } = useLanguage()
  const category =
    learningStages.find((stage) => route.path.endsWith(`?${stage.id}`))?.id ??
    getLearningStage(learning.last)?.id ??
    'orientation'
  const [groupIndex, setGroupIndex] = useState(0)
  const [search, setSearch] = useState('')
  const stage = learningStages.find((item) => item.id === category)
  const group = groups[groupIndex]
  const chapters = catalog.filter((chapter) =>
    search.trim()
      ? `${chapter.id} ${language === 'ja' ? chapter.ja : chapter.title} ${chapter.goal}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      : Number(chapter.id) >= group.start && Number(chapter.id) <= group.end,
  )
  const currentId = learning.last?.match(/\/lesson\/(\d+)/)?.[1]
  return (
    <div className="aw-page aw-library-page">
      <Heading eyebrow={t("YOUR LEARNING PATH")} title={t("Choose your next step.")} />
      <p className="rl-intro">{t("A clear path, with room to follow your curiosity.")}</p>
      <nav className="rl-stage-tabs" aria-label={t("Learning stages")}>
        {learningStages.map((item, i) => (
          <a
            key={item.id}
            href={`#/courses?${item.id}`}
            aria-current={category === item.id ? 'page' : undefined}
          >
            <CurriculumIcon name={stageIcon(item.id)} size={18} />
            {t(item.title)}
          </a>
        ))}
      </nav>
      <div className="rl-course-heading">
        <div className="rl-course-title"><CurriculumIcon name={stageIcon(stage.id)} size={26} /><h2>{t(stage.title)}</h2></div>
        <p>{t(stage.description)}</p>
      </div>
      {category === 'social' ? (
        <>
          <label className="rl-search">
            <span>{t("Find a chapter")}</span>
            <input
              type="search"
              placeholder={t("A topic, phrase, or chapter number…")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="rl-catalog">
            <aside aria-label={t("Chapter groups")}>
              {groups.map((item, i) => (
                <button
                  key={item.start}
                  type="button"
                  aria-pressed={!search && groupIndex === i}
                  onClick={() => {
                    setGroupIndex(i)
                    setSearch('')
                  }}
                >
                  <span className="rl-group-range">
                    {String(item.start).padStart(2, '0')}–{item.end}
                  </span>
                  <CurriculumIcon name={groupIcon(item.start)} size={20} />
                  <span className="rl-group-name">{t(item.title)}</span>
                </button>
              ))}
            </aside>
            <div className="rl-chapter-list">
              <p className="rl-list-label">
                {search ? t('{count} chapters found', { count: chapters.length }) : t(group.title)}
              </p>
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#/lesson/${chapter.id}/study`}
                  className={chapter.id === currentId ? 'is-current' : ''}
                >
                  <span className="rl-number">{chapter.id}</span>
                  <CurriculumIcon className="rl-topic-icon" name={chapterIcon(chapter.id)} size={22} />
                  <span className="rl-lesson-copy">
                    <strong>{language === 'ja' ? chapter.ja : chapter.title}</strong>
                    <small>{chapter.id === currentId ? t("Continue learning") : language === 'ja' ? chapter.goalJa : chapter.goal}</small>
                  </span>
                  <Icon name="next" />
                </a>
              ))}
              {!chapters.length && (
                <p className="rl-empty">{t("No chapters match. Try a shorter search.")}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rl-chapter-list">
          {stage.lessonIds.map((id, i) => {
            const step = foundationSteps.find((item) => item.id === id)
            return (
              <a
                key={id}
                href={`#/foundation/${id}/study`}
                className={learning.last?.startsWith(`/foundation/${id}/`) ? 'is-current' : ''}
              >
                <span className="rl-number">{String(i + 1).padStart(2, '0')}</span>
                <CurriculumIcon className="rl-topic-icon" name={foundationIcon(id)} size={22} />
                <span className="rl-lesson-copy">
                  <strong>{language === 'ja' ? step.ja : step.en}</strong>
                  <small>{t(step.description)}</small>
                </span>
                <Icon name="next" />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function PracticeLibrary({ learning }) {
  const { t, language } = useLanguage()
  return (
    <div className="aw-page aw-library-page">
      <Heading eyebrow={t("PRACTICE")} title={t("Give the words another go.")} />
      <p className="rl-intro"> {t("Choose a lesson, build your phrase set, and come back to it whenever you like.")} </p>
      <div className="rl-chapter-list">
        {learning.lastPractice && (
          <a href={`#${learning.lastPractice}`}>
            <strong>{t("Resume your last practice")}</strong>
            <Icon name="next" />
          </a>
        )}
        <a href="#/courses?social">
          <strong>{t("Conversation phrases")}</strong>
          <Icon name="next" />
        </a>
        <a href="#/foundation/lr/chunks">
          <strong>{t("Sounds & tongue twisters")}</strong>
          <Icon name="next" />
        </a>
        <a href="#/saved">
          <strong>{t("Saved phrases")}</strong>
          <span>{learning.saved.length}</span>
          <Icon name="next" />
        </a>
      </div>
    </div>
  )
}

export function Saved({ learning, save, notify }) {
  const { t, language } = useLanguage()
  const items = learning.saved
    .map((id) => learning.savedDetails[id] ?? savedItems[id])
    .filter(Boolean)
  return (
    <div className="aw-page aw-library-page">
      <Heading eyebrow={t("YOUR PHRASES")} title={t("Keep a useful phrase.")} />
      <p className="rl-intro">{t("A small collection of words you want to come back to.")}</p>
      {items.length ? (
        <div className="aw-saved-list">
          {items.map((item) => (
            <article key={item.id}>
              <p lang="en">{item.en}</p>
              <div className="aw-actions">
                {(item.chapter || introductionAliases[item.id]) && (
                  <Button
                    href={`/lesson/${item.chapter ?? '02'}/practice?line=${introductionAliases[item.id] ?? item.id}`}
                    variant="outline"
                  >
                    {t('Practice')} · {t('Chapter {id}', { id: item.chapter ?? '02' })}
                  </Button>
                )}
                <Button variant="quiet" onClick={() => save(item.id)}> {t("Remove")} </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="aw-empty">
          <h2>{t("No saved phrases yet.")}</h2>
          <p>{t("Save a phrase during practice to keep it here.")}</p>
          <Button href="/courses?social">{t("Explore lessons")}</Button>
        </div>
      )}
    </div>
  )
}
