import { useLanguage } from './Language'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { approvedAudio, useAudio } from './components'
import Glyph from './Glyph'
import LessonFooter from './LessonFooter'
import {
  familiarityOptions,
  filterPracticePhrases,
  getPracticeSet,
  startPractice,
  stepPractice,
  togglePracticePhrase,
} from './phrasePractice'
import './introductions.css'

const LessonContext = createContext(null)
const useLesson = () => useContext(LessonContext)
const art = (file) => `${import.meta.env.BASE_URL}assets/course/${file}`
const portraits = {
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
  const { byId: introductionById } = useLesson()
  const item = introductionById[id]
  return (
    <article
      id={`study-${id}`}
      className={`ip-phrase ${conversation ? 'ip-spoken' : ''} ${id === focusedId ? 'is-focused' : ''}`}
      data-phrase-id={id}
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
        <p className="ip-phrase-text" lang="en">{item.en}</p>
        {!conversation && <p className="ip-context">{item.context}</p>}
        {conversation && language === 'ja' && item.ja && <p className="ip-phrase-support" lang="ja">{item.ja}</p>}
      </div>
      <PhraseAudio item={item} {...audioProps} />
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
  const { phrases: introductionPhrases, sections: introductionSections, studyPath } = useLesson()
  const shown = filterPracticePhrases(introductionPhrases, set)
  const selected = new Set(set.selected)
  const hasFilter = set.filter !== 'all' || set.search.trim() !== ''
  const hiddenSelected = set.selected.filter((id) => !shown.some((item) => item.id === id)).length
  return (
    <>
      <div className="ip-practice-intro">
        <div>
          <p className="ip-kicker">{t("01 / SAY IT AGAIN")}</p>
          <h2>{t("Choose what to practice.")}</h2>
          <p>{t("Keep the phrases you need. Leave the ones you know for another day.")}</p>
        </div>
      </div>
      {set.session.ids.length > 0 && (
        <button
          type="button"
          className="ip-resume-set"
          onClick={() => {
            change((current) => ({ ...current, session: { ...current.session, active: true } }))
            scrollTo('ip-practice-start')
          }}
        >
          <Glyph name="repeat" size={17} />
          <span> {t("Resume your previous set")}{' '}
            <small>
              {t('Phrase {current} of {total}', { current: set.session.index + 1, total: set.session.ids.length })}
            </small>
          </span>
          <Glyph name="arrow" size={17} />
        </button>
      )}
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
                      href={`${studyPath}?line=${item.id}`}
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
      <div className="ip-selection-bar">
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
    </>
  )
}

function PracticeSession({ set, change, audioProps, learning, save }) {
  const { t, language } = useLanguage()
  const { byId: introductionById, sectionById, studyPath, id: chapterId } = useLesson()
  const item = introductionById[set.session.ids[set.session.index]]
  const [covered, setCovered] = useState(false)
  const headingRef = useRef(null)
  useEffect(() => {
    setCovered(false)
    audioProps.audio.stop()
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
        </div>
        <p className="ip-focus-context">{item.context}</p>
        {item.art && (
          <img className="ip-focus-art" src={art(item.art)} width="140" height="110" alt="" />
        )}
        <h2
          ref={headingRef}
          tabIndex={-1}
          lang={covered ? language : 'en'}
          className={`ip-focus-phrase ${covered ? 'is-covered' : ''}`}
          aria-live="polite"
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
        <button className="ip-secondary" type="button" onClick={() => move(-1)}>
          <Glyph name="back" /> {t("Previous")} </button>
        <a href={`${studyPath}?line=${item.id}`}>{t("View in Study")}</a>
        <button className="ip-primary" type="button" onClick={() => move(1)}>
          {set.session.index === set.session.ids.length - 1 ? t("Start another round") : t("Next phrase")}
          <Glyph name={set.session.index === set.session.ids.length - 1 ? 'repeat' : 'arrow'} />
        </button>
      </div>
    </div>
  )
}

function YourTurn({ learning, update }) {
  const { t, language } = useLanguage()
  const { scenarios: introductionScenarios } = useLesson()
  return (
    <section className="ip-your-turn">
      <p className="ip-kicker">{t("02 / USE IT IN A CONVERSATION")}</p>
      <h2>{t("When the phrases feel familiar.")}</h2>
      <p className="ip-prose"> {t("Try these situations in your own words. Speak both sides, then swap roles. A sample is one possibility, not the only correct answer.")} </p>
      {introductionScenarios.map((scenario, index) => (
        <details className="ip-scenario" key={scenario.id}>
          <summary>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {
              [
                t("Meet someone at a gathering"),
                t("Introduce yourself at work"),
                t("Bring two people together"),
                t("Recognize someone you have met"),
                t("Try it with your own details"),
              ][index]
            }
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
      <p className="ip-context"> {t("Check: did both people receive an introduction? Did you respond to what they actually said?")} </p>
    </section>
  )
}

function Experience({ route, learning, update, save, notify }) {
  const { t, language } = useLanguage()
  const {
    id,
    title,
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
  } = useLesson()
  const practice = route.view === 'practice'
  const legacySet = (state) => ({
    ids: legacyPhraseIds,
    index: legacyPhraseIds ? state.indices[`chapter-${id}`] : undefined,
  })
  const set = getPracticeSet(learning.practiceSets?.[id], introductionPhrases, legacySet(learning))
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
  const focusedId = introductionAliases[route.line] ?? route.line
  const contentsRef = useRef(null)
  const practiceStartRef = useRef(null)
  const change = (transform) =>
    update((previous) => ({
      ...previous,
      practiceSets: {
        ...previous.practiceSets,
        [id]: transform(
          getPracticeSet(previous.practiceSets?.[id], introductionPhrases, legacySet(previous)),
        ),
      },
    }))
  useEffect(() => {
    const raw = route.line ?? route.phrase
    const target = introductionAliases[raw] ?? raw
    if (practice && introductionById[target])
      change((current) => ({ ...current, session: { ids: [target], index: 0, active: true } }))
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
  const start = () => {
    audio.stop()
    change((current) => startPractice(current, introductionPhrases))
    scrollTo('ip-practice-start')
    practiceStartRef.current?.focus({ preventScroll: true })
  }
  return (
    <div className="ip-page" lang={language}>
      <header className="ip-lesson-heading">
        <p className="ip-kicker">
          {eyebrow ?? (
            <> {t("SOCIAL FLUENCY")} <span>/</span> {t('CHAPTER {id}', { id })}
            </>
          )}
        </p>
        <h1 lang="en">{title}</h1>
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
              : t('{phrases} phrases · {words} words', { phrases: introductionPhrases.filter((item) => item.kind !== 'word').length, words: introductionPhrases.filter((item) => item.kind === 'word').length })}
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
          {set.session.active ? (
            <PracticeSession
              set={set}
              change={change}
              audioProps={audioProps}
              learning={learning}
              save={save}
            />
          ) : (
            <PracticeChooser set={set} change={change} audioProps={audioProps} onStart={start} />
          )}
          {Scenarios ? (
            <Scenarios source={scenarioSource} learning={learning} update={update} />
          ) : (
            <YourTurn learning={learning} update={update} />
          )}
        </div>
      ) : (
        <Study audioProps={audioProps} focusedId={focusedId} />
      )}
      <LessonFooter route={route} practice={practice} />
    </div>
  )
}

export default function LessonExperience({ model, ...props }) {
  const context = {
    ...model,
    byId: Object.fromEntries(model.phrases.map((item) => [item.id, item])),
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
