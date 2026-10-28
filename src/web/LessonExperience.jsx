import { useLanguage } from './Language'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { approvedAudio, useAudio } from './components'
import Glyph from './Glyph'
import LessonFooter from './LessonFooter'
import { buildPracticeCatalog, practiceParts } from './practiceCatalog'
import { toReviewContent } from './reviewEngine'
import { findReviewItem, saveReviewItem, suspendReviewItem } from './reviewStore'
import {
  familiarityOptions,
  filterPracticePhrases,
  getPracticeSet,
  startPractice,
  stepPractice,
  togglePracticePhrase,
} from './phrasePractice'
import './introductions.css'
import './learning-flow.css'
import CurriculumIcon, { chapterIcon } from './CurriculumIcon'

const LessonContext = createContext(null)
const useLesson = () => useContext(LessonContext)
const art = (file) => `${import.meta.env.BASE_URL}assets/course/${file}`
const portraits = {
  Alex: '8508101',
  Casey: '265283458',
  Maya: '8855619',
  Eli: '278299',
  Priya: '277786664',
  Daniel: '3957303430',
  Sam: '291416',
}
const familiarLabel = (value) => familiarityOptions.find((option) => option.value === value)?.label
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })

export { default as Glyph } from './Glyph'

export function PhraseAudio({ item, audio, activeId, onPlay }) {
  const { t, language } = useLanguage()
  const ready = Boolean(approvedAudio[item.id])
  const playing = activeId === item.id && audio.playing
  return (
    <button
      type="button"
      className="ip-audio"
      disabled={!ready}
      title={ready ? t("Listen to this phrase") : t("Recording coming soon")}
      aria-label={
        ready
          ? t(playing ? 'Pause: {phrase}' : 'Listen to: {phrase}', { phrase: item.en })
          : t('Audio not yet available: {phrase}', { phrase: item.en })
      }
      onClick={() => onPlay(item.id)}
    >
      <Glyph name={playing ? 'pause' : 'play'} size={18} />
    </button>
  )
}

export function PhraseCard({ id, audioProps, conversation = false, focusedId }) {
  const { language } = useLanguage()
  const { byId: introductionById, catalog } = useLesson()
  const item = introductionById[id]
  const parts = practiceParts(item)
  const individual = parts.length > 1 ? catalog.items.filter((part) => catalog.aliases[id]?.includes(part.id)) : []
  return (
    <article
      id={`study-${id}`}
      className={`ip-phrase ${conversation ? 'ip-spoken' : ''} ${id === focusedId ? 'is-focused' : ''}`}
      data-phrase-id={id}
      tabIndex={-1}
    >
      {!conversation && item.art && (
        <img
          className="rc-phrase-art"
          src={art(item.art)}
          alt=""
          width="72"
          height="64"
          loading="lazy"
        />
      )}
      <div className="ip-phrase-copy">
        {item.register && <span className="ip-register">{item.register}</span>}
        {individual.length ? <ul className="ip-word-alternatives">
          {individual.map((part) => <li key={part.id}><span className="ip-phrase-text" lang="en">{part.en}</span><PhraseAudio item={part} {...audioProps} /></li>)}
        </ul> : <p className="ip-phrase-text" lang="en">{item.en}</p>}
        {!conversation && <p className="ip-context">{item.context}</p>}
        {conversation && language === 'ja' && item.ja && <p className="ip-phrase-support" lang="ja">{item.ja}</p>}
      </div>
      {!individual.length && <PhraseAudio item={item} {...audioProps} />}
    </article>
  )
}

function Conversation({ block, audioProps, focusedId }) {
  const { byId: introductionById } = useLesson()
  return (
    <div className={`ip-scene ${block.art ? '' : 'ip-scene-short'}`}>
      <div className="ip-scene-setting">
        {block.art && (
          <img src={art(block.art)} alt={block.alt} width="560" height="280" loading="lazy" />
        )}
        <p className="ip-scene-caption">{block.title}</p>
      </div>
      <div className="ip-conversation" aria-label={block.title}>
        {block.phrases.map((id) => {
          const item = introductionById[id]
          return (
            <div key={id} className="ip-turn">
              <img
                className="ip-person"
                src={art(item.portrait ?? `portrait-${portraits[item.speaker]}.svg`)}
                width="32"
                height="32"
                alt=""
              />
              <div className="ip-turn-content">
                <span className="ip-speaker">{item.speaker}</span>
                <PhraseCard id={id} audioProps={audioProps} focusedId={focusedId} conversation />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Study({ audioProps, focusedId }) {
  const { t, language } = useLanguage()
  const {
    sections: introductionSections,
    byId: introductionById,
    SourceContent,
    Diagram,
  } = useLesson()
  return (
    <div className="ip-reading">
      {introductionSections.map((section, index) => (
        <section
          className="ip-section"
          key={section.id}
          id={`study-${section.id}`}
          aria-labelledby={`heading-${section.id}`}
        >
          <div className="ip-section-heading">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2 id={`heading-${section.id}`}>{section.title}</h2>
          </div>
          {section.blocks.map((block, blockIndex) => {
            if (block.type === 'source')
              return (
                <SourceContent
                  key={block.id}
                  block={block.source}
                  audioProps={audioProps}
                  focusedId={focusedId}
                />
              )
            if (block.type === 'diagram') return <Diagram key={blockIndex} type={block.diagram} />
            if (block.type === 'text')
              return (
                <p className="ip-prose" key={blockIndex}>
                  {block.text}
                </p>
              )
            if (block.type === 'label')
              return (
                <h3 className="ip-small-heading" key={blockIndex}>
                  {block.text}
                </h3>
              )
            if (block.type === 'note')
              return (
                <aside className="ip-note" key={blockIndex}>
                  <strong>{block.title}</strong>
                  <p>{block.text}</p>
                </aside>
              )
            if (block.type === 'comparison')
              return (
                <aside className="ip-comparison" key={blockIndex} aria-label={block.title}>
                  <strong className="ip-comparison-title">{block.title}</strong>
                  <div className="ip-comparison-grid">
                    {block.items.map((entry, entryIndex) => (
                      <div
                        key={entryIndex}
                        className={`ip-comparison-card ${entry.contrast ? 'is-contrast' : ''}`}
                      >
                        <span className="ip-comparison-badge">{entry.badge}</span>
                        <p className="ip-comparison-phrase" lang="en">{entry.en}</p>
                        <p className="ip-comparison-text">{entry.text}</p>
                      </div>
                    ))}
                  </div>
                </aside>
              )
            if (block.type === 'conversation')
              return (
                <Conversation
                  key={blockIndex}
                  block={block}
                  audioProps={audioProps}
                  focusedId={focusedId}
                />
              )
            if (block.type === 'words')
              return (
                <div className="ip-words" key={blockIndex}>
                  {block.phrases.map((id) => {
                    const item = introductionById[id]
                    return (
                      <article
                        id={`study-${id}`}
                        data-phrase-id={id}
                        className={`ip-word ${id === focusedId ? 'is-focused' : ''}`}
                        key={id}
                      >
                        <img src={art(item.art)} width="140" height="110" alt="" loading="lazy" />
                        <div>
                          <h3 lang="en">{item.en}</h3>
                          <PhraseAudio item={item} {...audioProps} />
                        </div>
                        <p>{item.context}</p>
                      </article>
                    )
                  })}
                </div>
              )
            return (
              <div className="ip-phrase-grid" key={blockIndex}>
                {block.phrases.map((id) => (
                  <PhraseCard key={id} id={id} audioProps={audioProps} focusedId={focusedId} />
                ))}
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
}

function PracticeChooser({ set, change, audioProps, onStart }) {
  const { t, language } = useLanguage()
  const { catalog: { items: introductionPhrases }, sections: introductionSections, studyPath } = useLesson()
  const barRef = useRef(null)
  const frameRef = useRef(null)
  useEffect(() => {
    const viewport = barRef.current?.closest('.aw-viewport')
    const measure = () => viewport?.style.setProperty('--practice-bar-height', `${barRef.current?.offsetHeight ?? 0}px`)
    const observer = new ResizeObserver(measure)
    observer.observe(barRef.current)
    measure()
    return () => { observer.disconnect(); viewport?.style.removeProperty('--practice-bar-height'); cancelAnimationFrame(frameRef.current) }
  }, [])
  const revealFocus = (event) => {
    const target = event.target
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const viewport = target.closest('.aw-viewport')
      if (!viewport || !barRef.current || barRef.current.contains(target)) return
      const bounds = target.getBoundingClientRect()
      const top = viewport.getBoundingClientRect().top + (viewport.querySelector('.ip-mode-bar')?.offsetHeight ?? 0) + 16
      const bottom = Math.min(viewport.getBoundingClientRect().bottom, barRef.current.getBoundingClientRect().top) - 16
      if (bounds.bottom > bottom) viewport.scrollBy({ top: bounds.bottom - bottom, behavior: 'instant' })
      else if (bounds.top < top) viewport.scrollBy({ top: bounds.top - top, behavior: 'instant' })
    })
  }
  const shown = filterPracticePhrases(introductionPhrases, set)
  const selected = new Set(set.selected)
  const hasFilter = set.filter !== 'all' || set.search.trim() !== ''
  const hiddenSelected = set.selected.filter((id) => !shown.some((item) => item.id === id)).length
  return (
    <div className="ip-custom-bank" onFocusCapture={revealFocus}>
      <div className="ip-selection-tools">
        <label className="ip-search">
          <Glyph name="search" />
          <span className="ip-sr-only">{t("Search phrases")}</span>
          <input
            type="search"
            placeholder={t("Find a phrase or word…")}
            value={set.search}
            onChange={(event) =>
              change((current) => ({ ...current, search: event.target.value.slice(0, 100) }))
            }
          />
        </label>
        <div className="ip-filters" role="group" aria-label={t("Filter by familiarity")}>
          {[{ value: 'all', label: t("All") }, ...familiarityOptions].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={set.filter === option.value}
              onClick={() => change((current) => ({ ...current, filter: option.value }))}
            >
              {t(option.label)}
              <span>
                {option.value === 'all'
                  ? introductionPhrases.length
                  : introductionPhrases.filter((item) => set.ratings[item.id] === option.value)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <div className="ip-selection-actions">
          <span>
            {t('{shown} of {total} items', { shown: shown.length, total: introductionPhrases.length })}
          </span>
          <button
            type="button"
            onClick={() =>
              change((current) => ({
                ...current,
                selected: introductionPhrases.map((item) => item.id),
              }))
            }
          > {t("Select all")} </button>
          <button type="button" onClick={() => change((current) => ({ ...current, selected: [] }))}> {t("Clear selection")} </button>
          {hasFilter && shown.length > 0 && (
            <button
              type="button"
              onClick={() =>
                change((current) => ({
                  ...current,
                  selected: [...new Set([...current.selected, ...shown.map((item) => item.id)])],
                }))
              }
            > {t("Select shown")} </button>
          )}
          {hiddenSelected > 0 && <button type="button" onClick={() => change((current) => ({ ...current, filter: 'all', search: '' }))}>{t('See all selected items')}</button>}
        </div>
      </div>
      <div className="ip-phrase-list">
        {introductionSections.map((section) => {
          const items = shown.filter((item) => item.section === section.id)
          return items.length ? (
            <section key={section.id} aria-label={section.title}>
              <div className="ip-list-heading">
                <h3>{section.title}</h3>
                <span>{items.length}</span>
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`ip-check-row ${selected.has(item.id) ? 'is-selected' : ''}`}
                >
                  <label className="ip-check-label">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => change((current) => togglePracticePhrase(current, item.id))}
                      aria-label={t('Include: {phrase}', { phrase: item.en })}
                    />
                    <span className="ip-check-copy">
                      <span className="ip-list-phrase" lang="en">{item.en}</span>
                      <span className="ip-context">{item.context}</span>
                    </span>
                  </label>
                  <div className="ip-row-actions">
                    <PhraseAudio item={item} {...audioProps} />
                    <a
                      href={`${studyPath}?line=${item.studyId ?? item.id}`}
                      aria-label={t('View in Study: {phrase}', { phrase: item.en })}
                      title={t("View in Study")}
                    >
                      <Glyph name="book" size={18} />
                    </a>
                  </div>
                  {set.ratings[item.id] && (
                    <span className={`ip-rating-label is-${set.ratings[item.id]}`}>
                      {t(familiarLabel(set.ratings[item.id]))}
                    </span>
                  )}
                </div>
              ))}
            </section>
          ) : null
        })}
        {!shown.length && (
          <div className="ip-empty">
            <Glyph name="search" size={28} />
            <h3>{t("No phrases in this view yet.")}</h3>
            <p>
              {set.search.trim()
                ? t("Try a different search, or show all phrases.")
                : t("Your self-ratings will appear here after practice.")}
            </p>
            <button
              className="ip-secondary"
              type="button"
              onClick={() => change((current) => ({ ...current, filter: 'all', search: '' }))}
            > {t("Show all phrases")} </button>
          </div>
        )}
      </div>
      <div className="ip-selection-bar" ref={barRef}>
        <div role="status" aria-live="polite">
          <strong>{t('{count} selected', { count: set.selected.length })}</strong>
          <span>
            {set.selected.length === 0
              ? t("Choose at least one phrase.")
              : hiddenSelected > 0
                ? t('{count} selected outside this view', { count: hiddenSelected })
                : t("Your selection is saved on this device.")}
          </span>
        </div>
        <button
          type="button"
          className="ip-primary"
          disabled={!set.selected.length}
          onClick={onStart}
        > {t("Practice selected")} <span className="ip-button-count">{set.selected.length}</span>
          <Glyph name="arrow" />
        </button>
      </div>
    </div>
  )
}

function PracticeEntry({ set, change, audioProps, onStart }) {
  const { t } = useLanguage()
  const { catalog } = useLesson()
  const [custom, setCustom] = useState(false)
  const starter = catalog.starterIds.map((id) => catalog.items.find((item) => item.id === id))
  return <>
    <section className="ip-starter">
      <p className="ip-kicker">{t('01 / SAY IT AGAIN')}</p>
      <h2 id="practice-entry-heading" tabIndex={-1}>{t('Start with a short set.')}</h2>
      <p>{t('Say each expression aloud. Repeat the ones you need, then try a situation below.')}</p>
      <ul className="ip-starter-preview" aria-label={t('Your starting set')}>
        {starter.map((item) => <li key={item.id} lang="en">{item.en}</li>)}
      </ul>
      <button className="ip-primary" onClick={() => onStart(catalog.starterIds)}>{t('Practice {count} expressions', { count: starter.length })}<Glyph name="arrow" /></button>
      {set.session.ids.length > 0 && !set.session.completed && <button className="ip-text-button ip-resume-set" onClick={() => {
        change((current) => ({ ...current, session: { ...current.session, active: true } }))
        scrollTo('ip-practice-start')
      }}>{t('Resume your previous set')} · {set.session.index + 1}/{set.session.ids.length}<Glyph name="arrow" size={16} /></button>}
    </section>
    <details className="ip-custom-choice" open={custom} onToggle={(event) => setCustom(event.currentTarget.open)}>
      <summary><span>{t('Choose your own expressions')}<small>{t('{count} available · your choices stay saved', { count: catalog.items.length })}</small></span><Glyph name="chevron" /></summary>
      {custom && <PracticeChooser set={set} change={change} audioProps={audioProps} onStart={() => onStart()} />}
    </details>
  </>
}

function PracticeComplete({ set, change, onStart }) {
  const { t } = useLanguage()
  const needsWork = set.session.ids.filter((id) => set.ratings[id] === 'needs-work')
  return <section className="ip-complete" aria-labelledby="practice-complete-heading">
    <span className="ip-complete-icon"><Glyph name="check" size={24} /></span>
    <p className="ip-kicker">{t('SET FINISHED')}</p>
    <h2 id="practice-complete-heading" tabIndex={-1}>{t('Now make it your own.')}</h2>
    <p>{t(set.session.ids.length === 1 ? 'You reached the end of 1 expression. Try using it in a situation.' : 'You reached the end of {count} expressions. Try using them in a situation.', { count: set.session.ids.length })}</p>
    <button className="ip-primary" onClick={() => {
      scrollTo('ip-situations')
      document.getElementById('ip-situations-heading')?.focus({ preventScroll: true })
    }}>{t('Try a situation')}<Glyph name="arrow" /></button>
    <div className="ip-complete-actions">
      {needsWork.length > 0 && <button className="ip-secondary" onClick={() => onStart(needsWork)}>{t('Review needs work ({count})', { count: needsWork.length })}</button>}
      <button className="ip-text-button" onClick={() => onStart(set.session.ids)}>{t('Repeat this set')}</button>
      <button className="ip-text-button" onClick={() => change((current) => ({ ...current, session: { ...current.session, active: false } }))}>{t('Choose another set')}</button>
    </div>
    <p className="ip-context">{t('Your ratings are your own reflection, not a test score.')}</p>
  </section>
}

function PracticeSession({ set, change, audioProps, learning, save }) {
  const { t, language } = useLanguage()
  const { practiceById: introductionById, sectionById, studyPath, id: chapterId, displayId: displayChapter } = useLesson()
  const item = introductionById[set.session.ids[set.session.index]]
  const [covered, setCovered] = useState(false)
  const [reviewAdded, setReviewAdded] = useState(false)
  const [reviewBusy, setReviewBusy] = useState(true)
  const [reviewError, setReviewError] = useState('')
  const headingRef = useRef(null)
  useEffect(() => {
    let active = true
    setReviewBusy(true)
    setReviewAdded(false)
    setReviewError('')
    findReviewItem(item.id).then((record) => {
      if (active) setReviewAdded(record?.active === true)
    }).catch((error) => {
      if (active) setReviewError(error.message)
    }).finally(() => {
      if (active) setReviewBusy(false)
    })
    return () => { active = false }
  }, [item.id])
  const toggleReview = async () => {
    if (reviewBusy) return
    setReviewBusy(true)
    setReviewError('')
    try {
      if (reviewAdded) await suspendReviewItem(item.id)
      else await saveReviewItem(toReviewContent(item, chapterId, displayChapter ?? chapterId))
      setReviewAdded(!reviewAdded)
    } catch (error) {
      setReviewError(error.message)
    } finally {
      setReviewBusy(false)
    }
  }
  useEffect(() => {
    setCovered(false)
    audioProps.audio.stop()
    headingRef.current?.focus({ preventScroll: true })
  }, [item.id])
  const ready = Boolean(approvedAudio[item.id])
  const saved = learning.saved.includes(item.id)
  const move = (direction) => {
    audioProps.audio.stop()
    setCovered(false)
    change((current) => stepPractice(current, direction))
    scrollTo('ip-practice-start')
    headingRef.current?.focus({ preventScroll: true })
  }
  return (
    <div className="ip-session">
      <div className="ip-session-top">
        <button
          type="button"
          className="ip-text-button"
          onClick={() => {
            audioProps.audio.stop()
            change((current) => ({ ...current, session: { ...current.session, active: false } }))
          }}
        >
          <Glyph name="back" /> {t("Choose phrases")} </button>
        <span>
          {t('Phrase {current} of {total}', { current: set.session.index + 1, total: set.session.ids.length })}
        </span>
      </div>
      <div
        className="ip-session-position"
        role="progressbar"
        aria-label={t("Position in practice set")}
        aria-valuemin={1}
        aria-valuemax={set.session.ids.length}
        aria-valuenow={set.session.index + 1}
      >
        <span style={{ width: `${((set.session.index + 1) / set.session.ids.length) * 100}%` }} />
      </div>
      <div className="ip-focus-card">
        <div className="ip-focus-top">
          <span>{sectionById[item.section].short}</span>
          <button
            type="button"
            className={`ip-save ${saved ? 'is-saved' : ''}`}
            aria-pressed={saved}
            aria-label={`${saved ? t("Unsave") : t("Save")} phrase`}
            onClick={() => save({ ...item, chapter: chapterId })}
          >
            <Glyph name="save" size={18} />
            <span>{saved ? t("Saved") : t("Save")}</span>
          </button>
          <button type="button" className={`ip-save ${reviewAdded ? 'is-saved' : ''}`}
            aria-pressed={reviewAdded} disabled={reviewBusy}
            onClick={toggleReview}
            aria-label={reviewAdded ? (language === 'ja' ? '復習から外す' : 'Remove from review') : (language === 'ja' ? '復習に追加' : 'Add to review')}>
            <Glyph name="repeat" size={18} />
            <span>{language === 'ja' ? (reviewAdded ? '復習中' : '復習に追加') : (reviewAdded ? 'In Review' : 'Add to Review')}</span>
          </button>
        </div>
        {reviewError && <p role="alert" className="ip-context">{reviewError}</p>}
        <p className="ip-focus-context" id="practice-phrase-context">{item.context}</p>
        {item.art && (
          <img className="ip-focus-art" src={art(item.art)} width="140" height="110" alt="" />
        )}
        <h2
          ref={headingRef}
          tabIndex={-1}
          lang={covered ? language : 'en'}
          className={`ip-focus-phrase ${covered ? 'is-covered' : ''}`}
          aria-live="polite"
          aria-describedby="practice-phrase-context"
        >
          {covered ? t("Say it from memory.") : item.en}
        </h2>
        <button
          type="button"
          className="ip-text-button ip-cover"
          aria-pressed={covered}
          onClick={() => setCovered((value) => !value)}
        >
          {covered ? t("Show phrase") : t("Hide phrase")}
        </button>
        <div className="ip-session-audio">
          <button
            type="button"
            className="ip-listen"
            disabled={!ready}
            onClick={() => audioProps.onPlay(item.id)}
          >
            <Glyph name={audioProps.audio.playing ? 'pause' : 'play'} />
            {audioProps.audio.playing ? t("Pause") : t("Listen")}
          </button>
          <button
            type="button"
            className="ip-secondary"
            disabled={!ready}
            onClick={() => audioProps.onPlay(item.id, true)}
          >
            <Glyph name="repeat" /> {t("Replay")} </button>
        </div>
        <p className="ip-audio-note">
          {ready
            ? t("Listen, then say it with the same rhythm.")
            : t("Recording coming soon. You can read it aloud for now.")}
        </p>
      </div>
      <fieldset className="ip-self-rating">
        <legend>{t("How does it feel to say?")}</legend>
        <div>
          {familiarityOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              aria-pressed={set.ratings[item.id] === option.value}
              className={`is-${option.value}`}
              onClick={() =>
                change((current) => ({
                  ...current,
                  ratings: { ...current.ratings, [item.id]: option.value },
                }))
              }
            >
              <span className="ip-rating-dot" />
              {t(option.label)}
              {set.ratings[item.id] === option.value && <Glyph name="check" size={16} />}
            </button>
          ))}
        </div>
        <p>{t("Your own assessment. This phrase stays in the current set.")}</p>
      </fieldset>
      <div className="ip-session-nav">
        <button className="ip-secondary" type="button" disabled={set.session.index === 0} onClick={() => move(-1)}>
          <Glyph name="back" /> {t("Previous")} </button>
        <a href={`${studyPath}?line=${item.studyId ?? item.id}`}>{t("View in Study")}</a>
        <button className="ip-primary" type="button" onClick={() => move(1)}>
          {set.session.index === set.session.ids.length - 1 ? t('Finish set') : t("Next phrase")}
          <Glyph name={set.session.index === set.session.ids.length - 1 ? 'check' : 'arrow'} />
        </button>
      </div>
    </div>
  )
}

function YourTurn({ learning, update }) {
  const { t, language } = useLanguage()
  const { scenarios: introductionScenarios, scenarioCheck } = useLesson()
  const fallbackTitles = [
    t("Meet someone at a gathering"),
    t("Introduce yourself at work"),
    t("Bring two people together"),
    t("Recognize someone you have met"),
    t("Try it with your own details"),
  ]
  return (
    <section className="ip-your-turn">
      <p className="ip-kicker">{t("02 / USE IT IN A CONVERSATION")}</p>
      <h2 id="ip-situations-heading" tabIndex={-1}>{t("When the phrases feel familiar.")}</h2>
      <p className="ip-prose"> {t("Try these situations in your own words. Speak both sides, then swap roles. A sample is one possibility, not the only correct answer.")} </p>
      {introductionScenarios.map((scenario, index) => (
        <details className="ip-scenario" key={scenario.id}>
          <summary>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {scenario.title ?? fallbackTitles[index]}
            <Glyph name="chevron" />
          </summary>
          <div className="ip-scenario-body">
            <p>{scenario.prompt}</p>
            <label> {t("Your notes")} <span>{t("(optional)")}</span>
              <textarea
                maxLength={2000}
                rows={3}
                value={learning.responses[scenario.id] ?? ''}
                placeholder={t("Try saying it first. Jot down anything you want to remember.")}
                onChange={(event) =>
                  update((previous) => ({
                    ...previous,
                    responses: { ...previous.responses, [scenario.id]: event.target.value },
                  }))
                }
              />
            </label>
            <details className="ip-sample">
              <summary>{t("Show a sample response")}</summary>
              <p>{scenario.sample}</p>
            </details>
          </div>
        </details>
      ))}
      <p className="ip-context"> {scenarioCheck ?? t("Check: did both people receive an introduction? Did you respond to what they actually said?")} </p>
    </section>
  )
}

function Experience({ route, learning, update, save, notify }) {
  const { t, language } = useLanguage()
  const {
    id,
    displayId,
    title,
    titleJa,
    subtitle,
    eyebrow,
    aliases: introductionAliases = {},
    phrases: introductionPhrases,
    sections: introductionSections,
    byId: introductionById,
    studyPath,
    practicePath,
    Scenarios,
    scenarioSource,
    legacyPhraseIds,
    catalog,
    practiceById,
  } = useLesson()
  const practice = route.view === 'practice'
  const legacySet = (state) => ({
    ids: legacyPhraseIds,
    index: legacyPhraseIds ? state.indices[`chapter-${id}`] : undefined,
  })
  const set = getPracticeSet(learning.practiceSets?.[id], catalog.items, legacySet(learning), catalog)
  const [activeId, setActiveId] = useState(null)
  const audio = useAudio(notify)
  const audioProps = {
    audio,
    activeId,
    onPlay: (id, restart = false) => {
      setActiveId(id)
      audio.play(id, 1, restart)
    },
  }
  const rawFocus = introductionAliases[route.line] ?? route.line
  const focusedId = practiceById[rawFocus]?.studyId ?? rawFocus
  const contentsRef = useRef(null)
  const practiceStartRef = useRef(null)
  const wasActive = useRef(set.session.active)
  useEffect(() => {
    if (practice && set.session.active && set.session.completed)
      document.getElementById('practice-complete-heading')?.focus({ preventScroll: true })
    if (practice && wasActive.current && !set.session.active) {
      scrollTo('ip-practice-start')
      document.getElementById('practice-entry-heading')?.focus({ preventScroll: true })
    }
    wasActive.current = set.session.active
  }, [practice, set.session.active, set.session.completed])
  const change = (transform) =>
    update((previous) => ({
      ...previous,
      practiceSets: {
        ...previous.practiceSets,
        [id]: transform(
          getPracticeSet(previous.practiceSets?.[id], catalog.items, legacySet(previous), catalog),
        ),
      },
    }))
  useEffect(() => {
    const raw = route.line ?? route.phrase
    const canonical = introductionAliases[raw] ?? raw
    const target = practiceById[canonical]?.studyId ?? canonical
    const practiceIds = catalog.aliases[canonical] ?? (practiceById[canonical] ? [canonical] : [])
    if (practice && practiceIds.length)
      change((current) => ({ ...current, session: { ids: practiceIds, index: 0, active: true, completed: false } }))
    if (!practice) {
      const id = introductionById[target]
        ? `study-${target}`
        : ['words', 'phrases'].includes(route.view)
          ? 'study-words'
          : route.path.endsWith('/friend')
            ? 'study-connect'
            : null
      if (id) {
        const frame = requestAnimationFrame(() => scrollTo(id))
        return () => cancelAnimationFrame(frame)
      }
    }
  }, [route.path])
  const start = (ids) => {
    audio.stop()
    change((current) => {
      const round = startPractice(current, catalog.items, ids)
      return { ...round, selected: current.selected }
    })
    scrollTo('ip-practice-start')
  }
  return (
    <div className="ip-page" lang={language}>
      <header className="ip-lesson-heading">
        <p className="ip-kicker">
          {eyebrow ?? (
            <> {t("SOCIAL FLUENCY")} <span>/</span> {t('CHAPTER {id}', { id: displayId ?? id })}
            </>
          )}
        </p>
        <div className="ip-heading-title">
          <CurriculumIcon name={chapterIcon(displayId ?? id)} size={30} />
          <h1>
            <span lang="en">{title}</span>
            {language === 'ja' && titleJa && <span className="ip-title-ja" lang="ja">{titleJa}</span>}
          </h1>
        </div>
        <p>{subtitle}</p>
      </header>
      <div className="ip-mode-bar">
        <nav className="ip-mode-switch" aria-label={t("Lesson mode")}>
          <a href={studyPath} aria-current={!practice ? 'page' : undefined}>
            <Glyph name="book" size={18} /> {t("Study")} </a>
          <a href={practicePath} aria-current={practice ? 'page' : undefined}>
            <Glyph name="headphones" size={18} /> {t("Practice")} </a>
        </nav>
        {!practice ? (
          <details ref={contentsRef} className="ip-contents">
            <summary> {t("In this chapter")} <Glyph name="chevron" size={16} />
            </summary>
            <nav aria-label={t("Chapter contents")}>
              {introductionSections.map((section, index) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => {
                    contentsRef.current.open = false
                    scrollTo(`study-${section.id}`)
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                  <span>{section.short}</span>
                </button>
              ))}
            </nav>
          </details>
        ) : (
          <span className="ip-mode-detail">
            {set.session.active
              ? t('{count} in your set', { count: set.session.ids.length })
              : t('{count} expressions to explore', { count: catalog.items.length })}
          </span>
        )}
      </div>
      <div className="ip-recording-notice">
        <Glyph name="headphones" size={16} />
        <span>{t("Audio recordings are coming soon.")}</span>
      </div>
      {practice ? (
        <div
          id="ip-practice-start"
          ref={practiceStartRef}
          tabIndex={-1}
          className="ip-practice-content"
        >
          {set.session.active && set.session.completed ? <PracticeComplete set={set} change={change} onStart={start} /> : set.session.active ? (
            <PracticeSession
              set={set}
              change={change}
              audioProps={audioProps}
              learning={learning}
              save={save}
            />
          ) : (
            <PracticeEntry set={set} change={change} audioProps={audioProps} onStart={start} />
          )}
          <div id="ip-situations">
          {Scenarios ? (
            <Scenarios source={scenarioSource} learning={learning} update={update} />
          ) : (
            <YourTurn learning={learning} update={update} />
          )}
          </div>
        </div>
      ) : (
        <Study audioProps={audioProps} focusedId={focusedId} />
      )}
      <LessonFooter route={route} practice={practice} />
    </div>
  )
}

export default function LessonExperience({ model, ...props }) {
  const catalog = useMemo(() => buildPracticeCatalog(model), [model])
  const context = {
    ...model,
    byId: Object.fromEntries(model.phrases.map((item) => [item.id, item])),
    catalog,
    practiceById: Object.fromEntries(catalog.items.map((item) => [item.id, item])),
    sectionById: Object.fromEntries(model.sections.map((section) => [section.id, section])),
    studyPath: `#${model.basePath ?? `/lesson/${model.id}`}/study`,
    practicePath: `#${model.basePath ?? `/lesson/${model.id}`}/practice`,
  }
  return (
    <LessonContext.Provider value={context}>
      <Experience {...props} />
    </LessonContext.Provider>
  )
}
