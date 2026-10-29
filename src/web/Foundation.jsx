import japaneseFoundation from '../course/locales/ja/foundations.json'
import { RichText, SourceContent } from './ContentBlocks'
import { useLanguage } from './Language'
import { Fragment, useEffect, useRef, useState } from 'react'
import { foundationReading, twisterGuidance } from '../course/foundations-en'
import { alphabet, tongueGroups, allTwisters } from '../data'
import { getFoundationNavigation } from './pathway'
import { TheoryAudioSample, YouTubeLessonPlayer } from './FoundationContent'
import { Glyph } from './LessonExperience'
import LessonFooter from './LessonFooter'
import CurriculumIcon, { foundationIcon } from './CurriculumIcon'
import OrientationFigure, { orientationFigures } from './OrientationFigures'
import OrientationPractice from './OrientationPractice'
import StudyPlan from './StudyPlan.jsx'
import AlphabetRecognition from './AlphabetRecognition.jsx'
import HandwritingWorksheets from './HandwritingWorksheets.jsx'
import IpaReference from './IpaReference.jsx'
import HandwritingAnimator from './HandwritingAnimator.jsx'
import './foundation-readable.css'
import './tongue-twisters.css'
import { TongueTwisterStudy, TongueTwisterPractice } from './TongueTwisters'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
export function FoundationShell({ route, title, subtitle, sections = [], children, practicePath }) {
  const { t, language } = useLanguage()
  const navigation = getFoundationNavigation(route.id)
  const practice = route.view !== 'study'
  const contents = useRef(null)
  return (
    <div className={`ip-page rf-page${['orientation', 'how-it-works'].includes(route.id) ? ' rf-orientation-lesson' : route.id === 'letters' ? ' rf-alphabet-lesson' : route.id === 'tongue-intro' ? ' rf-tongue-lesson' : ''}`} lang={language}>
      <header className="ip-lesson-heading">
        <p className="ip-kicker">
          {t(navigation.stage.title)} <span>/</span> {language === 'ja' ? 'レッスン' : 'LESSON'}{' '}
          {String(navigation.index + 1).padStart(2, '0')}
        </p>
        <div className="ip-heading-title"><CurriculumIcon name={foundationIcon(route.id)} size={30} /><h1>{title}</h1></div>
        <p>{subtitle}</p>
      </header>
      <div className="ip-mode-bar">
        <nav className="ip-mode-switch" aria-label={t("Lesson mode")}>
          <a href={`#/foundation/${route.id}/study`} aria-current={!practice ? 'page' : undefined}>
            <Glyph name="book" size={18} /> {t("Study")} </a>
          <a
            href={`#${practicePath ?? `/foundation/${route.id}/practice`}`}
            aria-current={practice ? 'page' : undefined}
          >
            <Glyph name="headphones" size={18} /> {t("Practice")} </a>
        </nav>
        {!practice && sections.length > 0 ? (
          <details className="ip-contents" ref={contents}>
            <summary> {t("In this lesson")} <Glyph name="chevron" size={16} />
            </summary>
            <nav aria-label={t("Lesson contents")}>
              {sections.map((section, i) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => {
                    contents.current.open = false
                    scrollTo(section.id)
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </details>
        ) : route.id === 'tongue-intro' && practice ? null : (
          <span className="ip-mode-detail">{t(navigation.stage.title)}</span>
        )}
      </div>
      {children}
      <LessonFooter route={route} practice={practice} practicePath={practicePath} />
    </div>
  )
}

function AlphabetBoard({ showcase = false }) {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  const speak = (letter) => {
    setSelected(letter)
    if (!('speechSynthesis' in window)) {
      setMessage(
        t("Your browser does not support letter playback. Use the alphabet video below."),
      )
      return
    }
    window.speechSynthesis.cancel()
    const voice = new SpeechSynthesisUtterance(letter.toUpperCase())
    voice.lang = 'en-US'
    voice.onerror = (event) => {
      if (!['canceled', 'interrupted'].includes(event.error))
        setMessage(
          t("Letter playback is unavailable on this device. You can use the alphabet video instead."),
        )
    }
    window.speechSynthesis.speak(voice)
    setMessage(`Letter ${letter}. Device voice.`)
  }
  return (
    <div className={`rf-alphabet${showcase ? " rf-alphabet--showcase" : ""}`}>
      {[t("Uppercase"), t("Lowercase")].map((label, i) => (
        <section key={label}>
          <h3>
            {showcase ? (language === "ja" ? (i ? "小文字（small letters）" : "大文字（capital letters）") : (i ? "lowercase (small) letters" : "uppercase (capital) letters")) : <>{label} <span>{i ? t("small letters") : t("capital letters")}</span></>}
          </h3>
          <div>
            {alphabet.map((letter) => {
              const value = i ? letter.toLowerCase() : letter
              return (
                <button
                  type="button"
                  key={value}
                  aria-label={`Hear ${label.toLowerCase()} ${value}`}
                  aria-pressed={selected === value}
                  onClick={() => speak(value)}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </section>
      ))}
      <p className="ip-context" role="status">
        {message || (showcase ? (language === "ja" ? "文字を押して名前を聞いてみよう。" : "Choose a letter to hear its name.") : t("Select a letter to hear its name. Uses your device’s speech voice."))}
      </p>
    </div>
  )
}

function TwisterCollection() {
  const { t, language } = useLanguage()
  return (
    <div className="rf-twister-groups">
      {tongueGroups.map((group, index) => (
        <section key={group.id}>
          <h3>
            {
              [
                t("Sound contrasts"),
                t("Clear consonants"),
                t("Clusters without extra vowels"),
                t("Rhythm & vowel movement"),
              ][index]
            }
          </h3>
          {group.items.map((item) => (
            <TwisterDetails key={item.id} item={item}>
              <span className="ip-register">{item.target}</span>
              <p className="rf-spoken" lang="en">{item.phrase}</p>
              <p className="ip-context">{twisterGuidance[item.id][0]}</p>
              <TheoryAudioSample
                phrase={item.phrase}
                target={item.target}
                src={`${import.meta.env.BASE_URL}audio/${item.id}.wav`}
              />
            </TwisterDetails>
          ))}
        </section>
      ))}
    </div>
  )
}

function TwisterDetails({ item, children }) {
  const [open, setOpen] = useState(item.id === allTwisters[0].id)
  return <details className="rf-twister-example rf-twister-choice" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary><span><small>{item.target}</small><span lang="en">{item.phrase}</span></span><Glyph name="chevron" size={18} /></summary>
    {open && <div className="rf-twister-body">{children}</div>}
  </details>
}

function LocalizedTwister({ block }) {
  const item = allTwisters.find((item) => item.id === block.id)
  return <TwisterDetails item={item}>
    {block.blocks.map((part) => <SourceContent key={part.id} block={part} examples={false} />)}
    <TheoryAudioSample phrase={item.phrase} target={item.target} src={`${import.meta.env.BASE_URL}audio/${item.id}.wav`} />
  </TwisterDetails>
}

// Editorial emphasis is explicit: **key idea**. No Markdown HTML is injected.
const highlightReadingKeywords = (value) =>
  value.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  )

export function Reading({ model }) {
  const { language } = useLanguage()
  const orientationFigure = (section, index) => {
    const config = orientationFigures[section.id]
    if (!config || index !== (language === 'ja' ? config.afterJa : config.afterEn)) return null
    return <OrientationFigure config={config} />
  }
  return (
    <div className="ip-reading">
      {model.sections.map((section, index) => (
        <section className={`ip-section${orientationFigures[section.id] ? " rf-illustrated-section" : ""}`} key={section.id} id={section.id}>
          <div className="ip-section-heading">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{section.title}</h2>
          </div>
          {section.blocks?.map((block, i) => (
            <Fragment key={block.id}>
              {block.type === 'twister' ? <LocalizedTwister block={block} /> : <SourceContent block={block} examples={false} />}
              {orientationFigure(section, i)}
            </Fragment>
          ))}
          {section.paragraphs?.map((text, i) => (
            <Fragment key={i}>
              <p className="ip-prose">{highlightReadingKeywords(text)}</p>
              {orientationFigure(section, i)}
            </Fragment>
          ))}
          {section.items && (
            <ol className="rf-steps">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
          {section.note && (
            <aside className="ip-note">
              <strong>{section.note[0]}</strong>
              <p>{section.note[1]}</p>
            </aside>
          )}
          {section.examples && (
            <div className="ip-phrase-grid">
              {section.examples.map(([en, context]) => (
                <article className="ip-phrase" key={en}>
                  <div className="ip-phrase-copy">
                    <p className="ip-phrase-text">{en}</p>
                    <p className="ip-context">{context}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          {section.id === 'write-model' && <HandwritingAnimator />}
          {section.id === 'sounds-listen' && <IpaReference mode="study" />}
          {section.video && (
            <YouTubeLessonPlayer
              videoId={section.video[0]}
              title={section.video[1]}
              credit={section.video[2]}
              startAt={section.video[3]}
              autoplay={false}
            />
          )}
          {section.link && (
            <a className="rf-resource" href={section.link[0]} target="_blank" rel="noreferrer">
              {section.link[1]} ↗
            </a>
          )}
          {section.widget === 'alphabet' && <AlphabetBoard />}
          {section.widget === 'twisters' && <TwisterCollection />}
        </section>
      ))}
    </div>
  )
}

function AlphabetLessonStudy({ model }) {
  const { language } = useLanguage()
  const [welcome, , tryIt] = model.sections
  const japaneseSteps = tryIt.blocks?.find((block) => block.type === 'list')?.items
  const intro = tryIt.blocks?.find((block) => block.type !== 'list')
  const note = tryIt.blocks?.filter((block) => block.type !== 'list').slice(1) ?? []
  const video = tryIt.video ?? ['MgmIHtp-ZQM', 'The Alphabet Song | Super Simple ABCs', 'Super Simple ABCs / Super Simple Songs', 20]

  return (
    <div className="rf-alphabet-journey">
      <div className="rf-alphabet-hero">
        <section className="rf-alphabet-copy" id="letters-start">
          <h2>{welcome.title}</h2>
          {welcome.paragraphs?.map((paragraph, index) => (
            <p className="ip-prose" key={index}>{highlightReadingKeywords(paragraph)}</p>
          ))}
          {welcome.blocks?.map((block) => <SourceContent key={block.id} block={block} examples={false} />)}
        </section>
        <section className="rf-alphabet-panel" id="letters-board" aria-label={language === 'ja' ? 'アルファベット26文字' : 'All 26 letters'}>
          <AlphabetBoard showcase />
        </section>
      </div>
      <section className="rf-alphabet-watch" id="letters-try">
        <p className="ip-kicker">{language === 'ja' ? '見る・言う・書く' : 'WATCH · SAY · WRITE'}</p>
        <h2>{tryIt.title}</h2>
        {tryIt.paragraphs?.slice(0, 1).map((paragraph, index) => <p className="ip-prose" key={index}>{highlightReadingKeywords(paragraph)}</p>)}
        {intro && <SourceContent block={intro} examples={false} />}
        <YouTubeLessonPlayer
          videoId={video[0]}
          title={video[1]}
          credit={video[2]}
          startAt={video[3]}
          autoplay={false}
        />
        <ol className="rf-alphabet-three-steps">
          {japaneseSteps
            ? japaneseSteps.map((item, index) => <li key={index}><span className="rf-alphabet-step-number">0{index + 1}</span><span><RichText runs={item.runs} /></span></li>)
            : tryIt.items?.map((item, index) => {
              const [verb, rest] = item.split(' — ')
              return <li key={index}><span className="rf-alphabet-step-number">0{index + 1}</span><span><strong>{verb}.</strong> {rest}</span></li>
            })}
        </ol>
        {tryIt.paragraphs?.slice(1).map((paragraph, index) => <p className="ip-context rf-alphabet-note" key={index}>{highlightReadingKeywords(paragraph)}</p>)}
        {note.map((block) => <SourceContent key={block.id} block={block} examples={false} />)}
      </section>
    </div>
  )
}

function Reflection({ id, learning, update, label }) {
  const { t, language } = useLanguage()
  return (
    <label className="rf-reflection">
      {label}
      <span className="ip-context">{t("Optional · saved on this device")}</span>
      <textarea
        rows={4}
        maxLength={2000}
        placeholder={t("A short note is enough.")}
        value={learning.responses[`foundation-${id}`] ?? ''}
        onChange={(event) =>
          update((previous) => ({
            ...previous,
            responses: { ...previous.responses, [`foundation-${id}`]: event.target.value },
          }))
        }
      />
    </label>
  )
}
function FoundationPractice({ id, learning, update, initialTwister }) {
  const { t, language } = useLanguage()
  if (id === 'tongue-intro') return <TongueTwisterPractice initialId={initialTwister} />
  if (id === 'orientation') return <OrientationPractice learning={learning} update={update} />
  if (id === 'how-it-works') return <StudyPlan learning={learning} update={update} />
  if (id === 'letters') return <AlphabetRecognition />
  if (id === 'write') return <HandwritingWorksheets />
  if (id === 'sounds') return <IpaReference mode="practice" />
  const titles = {
    orientation: t("Find your reason."),
    'how-it-works': t("Choose a useful starting point."),
    write: t("Use a page of your own."),
    sounds: t("Notice one sound at a time."),
  }
  return (
    <section className="rf-practice">
      <p className="ip-kicker">{t("TRY IT YOURSELF")}</p>
      <h2>{titles[id]}</h2>

    </section>
  )
}

export default function Foundation({ route, learning, update }) {
  const { t, language } = useLanguage()
  const sourceModel = language === 'ja' ? japaneseFoundation[route.id] : foundationReading[route.id]
  const model = route.id === 'tongue-intro' ? { title: 'Tongue Twisters', subtitle: language === 'ja' ? 'ちょっと言いにくい言葉で、英語の音に慣れよう。' : 'A playful way to practice speaking clearly.', sections: [{ id: 'tt-intro', title: language === 'ja' ? '早口言葉って何？' : 'Why tongue twisters?' }, { id: 'tt-collection', title: language === 'ja' ? '24の早口言葉' : '24 classics' }] } : sourceModel
  return (
    <FoundationShell
      route={route}
      title={model.title}
      subtitle={model.subtitle}
      sections={model.sections}
    >
      {route.view === 'study' ? (
        route.id === 'tongue-intro' ? <TongueTwisterStudy /> :
          route.id === 'letters' ? <AlphabetLessonStudy model={model} /> : <Reading model={model} />
      ) : (
        <FoundationPractice id={route.id} learning={learning} update={update} initialTwister={route.legacyTwister} />
      )}
    </FoundationShell>
  )
}
