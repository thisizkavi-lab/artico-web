import { useLanguage } from './Language'
import { useState } from 'react'
import { Button, Heading, Icon } from './components'
import CurriculumIcon, { chapterIcon, foundationIcon, groupIcon, stageIcon } from './CurriculumIcon'
import { introductionAliases } from '../course/introductions'
import { getLearningStage, learningStages } from './pathway'
import { catalog, foundationSteps, groups, savedItems } from './content'
import { applicationTracks } from './applicationTracks'
import './library-readable.css'

function CourseLesson({ href, number, iconName, title, active = false }) {
  return (
    <a className={'rl-vertical-lesson' + (active ? ' is-current' : '')} href={href}
      aria-current={active ? 'location' : undefined}>
      <span className="rl-tree-node rl-tree-node--lesson" aria-hidden="true" />
      <span className="rl-vertical-lesson-number">{number}</span>
      <CurriculumIcon name={iconName} size={19} />
      <span className="rl-vertical-lesson-title">{title}</span>
      <span className="rl-vertical-arrow" aria-hidden="true">›</span>
    </a>
  )
}

export function Courses({ learning, route }) {
  const { t, language } = useLanguage()
  const learnStages = learningStages.filter(stage => stage.id !== 'orientation')
  const requestedStage = route.path.endsWith('?application')
    ? 'application'
    : learnStages.find(stage => route.path.endsWith('?' + stage.id))?.id
  const initialStage = requestedStage ??
    (getLearningStage(learning.last)?.id === 'social' ? 'social' : 'foundation')
  const currentId = learning.last?.match(/\/lesson\/(\d+)/)?.[1]
  const initialGroup = groups.findIndex((group) =>
    currentId && Number(currentId) >= group.start && Number(currentId) <= group.end,
  )
  const [expandedStage, setExpandedStage] = useState(initialStage)
  const [expandedGroup, setExpandedGroup] = useState(initialGroup >= 0 ? initialGroup : 0)
  const [search, setSearch] = useState('')
  const query = search.trim().toLowerCase()
  const visibleGroups = groups.map((group, i) => {
    const chapters = catalog.filter((chapter) => {
      const number = Number(chapter.id)
      const inRange = number >= group.start && number <= group.end
      if (!inRange) return false
      if (!query) return true
      // Keep chapter explanations searchable without displaying them as subtext.
      const searchable = [
        chapter.id, chapter.title, chapter.ja, chapter.goal, chapter.goalJa,
      ].filter(Boolean).join(' ').toLowerCase()
      return group.title.toLowerCase().includes(query) || searchable.includes(query)
    })
    return { ...group, i, chapters }
  }).filter((group) => !query || group.chapters.length > 0)

  return (
    <div className="aw-page aw-library-page rl-vertical-page">
      <Heading eyebrow={t('YOUR LEARNING PATH')} title={t('Choose your next step.')} />
      <div className="rl-vertical-stages">
        {learnStages.map((stage, index) => {
          const open = expandedStage === stage.id
          return (
            <section className={'rl-vertical-stage' + (open ? ' is-open' : '')}
              key={stage.id}>
              <span className="rl-vertical-step" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="rl-vertical-shell">
                <button type="button" className="rl-vertical-stage-button"
                  aria-controls={'rl-stage-panel-' + stage.id}
                  aria-expanded={open}
                  onClick={() => setExpandedStage(open ? null : stage.id)}>
                  <CurriculumIcon name={stageIcon(stage.id)} size={26} />
                  <span className="rl-vertical-stage-title">
                    <strong>{t(stage.title)}</strong>
                  </span>
                  <span className="rl-vertical-chevron" aria-hidden="true" />
                </button>
                <div id={'rl-stage-panel-' + stage.id}
                  className="rl-vertical-stage-panel" hidden={!open}>
                  {stage.id !== 'social' ? (
                    <div className="rl-vertical-lessons rl-vertical-foundation">
                      {stage.lessonIds.map((id, i) => {
                        const lesson = foundationSteps.find((item) => item.id === id)
                        if (!lesson) return null
                        return <CourseLesson key={id}
                          href={'#/foundation/' + id + '/study'}
                          number={String(i + 1).padStart(2, '0')}
                          iconName={foundationIcon(id)}
                          title={language === 'ja' ? lesson.ja : lesson.en}
                          active={learning.last?.startsWith('/foundation/' + id + '/')} />
                      })}
                    </div>
                  ) : (
                    <div className="rl-vertical-social">
                      <label className="rl-vertical-search">
                        <CurriculumIcon className="rl-vertical-search-icon" name="search" size={19} />
                        <input type="search" value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          placeholder={t('Find a chapter')}
                          aria-label={t('Find a chapter')} />
                      </label>
                      <div className="rl-vertical-group-tree">
                        {visibleGroups.length ? visibleGroups.map((group) => {
                        const groupOpen = Boolean(query) || expandedGroup === group.i
                        return (
                          <section className={'rl-vertical-group' + (groupOpen ? ' is-open' : '')}
                            key={group.start}>
                            <button type="button" className="rl-vertical-group-button"
                              aria-controls={'rl-group-panel-' + group.start}
                              aria-expanded={groupOpen}
                              onClick={() => {
                                if (query) {
                                  setSearch('')
                                  setExpandedGroup(group.i)
                                } else setExpandedGroup(groupOpen ? null : group.i)
                              }}>
                              <span className="rl-tree-node rl-tree-node--group" aria-hidden="true" />
                              <CurriculumIcon name={groupIcon(group.start)} size={20} />
                              <span className="rl-vertical-group-title">{t(group.title)}</span>
                              <span className="rl-vertical-chevron" aria-hidden="true" />
                            </button>
                            <div id={'rl-group-panel-' + group.start}
                              className="rl-vertical-lessons rl-vertical-group-lessons"
                              hidden={!groupOpen}>
                              {group.chapters.map((chapter) => (
                                <CourseLesson key={chapter.id}
                                  href={'#/lesson/' + chapter.id + '/study'}
                                  number={chapter.id}
                                  iconName={chapterIcon(chapter.id)}
                                  title={language === 'ja' ? chapter.ja : chapter.title}
                                  active={chapter.id === currentId} />
                              ))}
                            </div>
                          </section>
                        )
                      }) : <p className="rl-vertical-empty">
                        {t('No chapters match. Try a shorter search.')}
                        </p>}
                      </div>
                      <div className="rl-vertical-lessons rl-vocabulary-end">
                        <CourseLesson href="#/lesson/97/study" number="97"
                          iconName="book" title={language === 'ja' ? '語彙 · 78テーマ' : 'Vocabulary · 78 topics'} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })}
        <section className={'rl-vertical-stage' + (expandedStage === 'application' ? ' is-open' : '')}>
          <span className="rl-vertical-step" aria-hidden="true">03</span>
          <div className="rl-vertical-shell">
            <button type="button" className="rl-vertical-stage-button"
              aria-controls="rl-stage-panel-application"
              aria-expanded={expandedStage === 'application'}
              onClick={() => setExpandedStage(expandedStage === 'application' ? null : 'application')}>
              <CurriculumIcon name="globe" size={26} />
              <span className="rl-vertical-stage-title">
                <strong>{language === 'ja' ? '実践' : 'Application'}</strong>
              </span>
              <span className="rl-vertical-chevron" aria-hidden="true"/>
            </button>
            <div id="rl-stage-panel-application" className="rl-vertical-stage-panel"
              hidden={expandedStage !== 'application'}>
              <div className="rl-vertical-lessons rl-vertical-foundation">
                {applicationTracks.map((track,i) => (
                  <CourseLesson key={track.id} href={'#/application/' + track.id}
                    number={String(i+1).padStart(2,'0')} iconName={track.icon}
                    title={language === 'ja' ? track.ja : track.en} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
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
