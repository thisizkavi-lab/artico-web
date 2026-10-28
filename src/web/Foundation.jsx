import japaneseFoundation from '../course/locales/ja/foundations.json'
import { SourceContent } from './ContentBlocks'
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
import './foundation-readable.css'

function OrientationGuide({ id }) {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const first = id === 'orientation'
  return (
    <aside className="rf-orientation-guide" aria-label={ja ? 'オリエンテーションの進め方' : 'Orientation guide'}>
      <p className="rf-orientation-guide-label">{ja ? 'はじめに · 2つのステップ' : 'ORIENTATION · TWO STEPS'}</p>
      <h2>{first
        ? (ja ? '英語を学ぶ理由は、人それぞれ。' : 'Start with your own reason.')
        : (ja ? '理解したら、学び方を決めよう。' : 'Make a simple plan. Then begin.')}</h2>
      <p>{first
        ? (ja ? '下の文章は、自分のペースで読んでください。4つの質問で、英語を使いたい場面を考えることもできます。'
          : 'Read the ideas below at your own pace. Or try four short questions to picture where you want English to take you.')
        : (ja ? 'Studyで学び方を知り、Practiceで続けられる学習計画を作れます。計画を立てずに学習を始めても大丈夫です。'
          : 'Study explains the approach. Practice helps you choose a realistic routine. You can also start learning without making a plan.')}</p>
      <div className="rf-orientation-guide-actions">
        <a className="rf-orientation-guide-primary" href={first ? '#/foundation/orientation/practice' : '#/foundation/how-it-works/practice'}>
          {first ? (ja ? '自分の理由を見つける' : 'Explore my reason') : (ja ? '学習計画を立てる' : 'Make my study plan')}
          <span aria-hidden="true">→</span>
        </a>
        <a className="rf-orientation-guide-secondary" href={first ? '#/foundation/how-it-works/study' : '#/courses?foundation'}>
          {first ? (ja ? 'Articoの使い方へ' : 'How Artico works') : (ja ? 'レベルゼロへ進む' : 'Explore Level Zero')}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  )
}

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
    <div className="ip-page rf-page" lang={language}>
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
        ) : (
          <span className="ip-mode-detail">{t(navigation.stage.title)}</span>
        )}
      </div>
      {route.view === 'study' && ['orientation', 'how-it-works'].includes(route.id) && <OrientationGuide id={route.id} />}
      {children}
      <LessonFooter route={route} practice={practice} practicePath={practicePath} />
    </div>
  )
}

function AlphabetBoard() {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  const speak = (letter) => {
    setSelected(letter)
    if (!('speechSynthesis' in window)) {
      setMessage(
        t("Your browser does not support letter playback. Use the alphabet video in the next lesson."),
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
    <div className="rf-alphabet">
      {[t("Uppercase"), t("Lowercase")].map((label, i) => (
        <section key={label}>
          <h3>
            {label} <span>{i ? t("small letters") : t("capital letters")}</span>
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
        {message || t("Select a letter to hear its name. Uses your device’s speech voice.")}
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
              <p className="ip-prose">{text}</p>
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
function TwisterPractice() {
  const { t, language } = useLanguage()
  const [id, setId] = useState(allTwisters[0].id)
  const [step, setStep] = useState(0)
  const item = allTwisters.find((item) => item.id === id)
  const phrase = item.buildSteps[step]
  const japaneseTwister = japaneseFoundation['tongue-intro'].sections.flatMap((section) => section.blocks).find((block) => block.id === id)
  const japaneseTip = japaneseTwister?.blocks.find((block) => /^口と耳の目印[:：]/.test(block.runs?.[0]?.text ?? ''))?.runs.slice(1).map((run) => run.text).join('')
  const whole = step === item.buildSteps.length - 1
  return (
    <section className="rf-practice">
      <p className="ip-kicker">{t("ONE MOVEMENT AT A TIME")}</p>
      <h2>{t("Build a clear phrase.")}</h2>
      <p className="ip-prose"> {t("Choose a sound to work on. Repeat one short chunk, then add the next part when it feels clear.")} </p>
      <label className="rf-select"> {t("Choose a tongue twister")} <select
          value={id}
          onChange={(event) => {
            setId(event.target.value)
            setStep(0)
          }}
        >
          {allTwisters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.target} · {item.phrase}
            </option>
          ))}
        </select>
      </label>
      <div className="rf-focus">
        <span className="ip-register">
          {item.target} · {step + 1} / {item.buildSteps.length}
        </span>
        <h3 lang="en">{phrase}</h3>
        <p>{language === 'ja' ? japaneseTip : twisterGuidance[id][1]}</p>
        <TheoryAudioSample
          key={`${id}-${step}`}
          phrase={phrase}
          target={item.target}
          src={`${import.meta.env.BASE_URL}audio/${whole ? id : `segments/${id}-${step + 1}`}.wav`}
        />
      </div>
      <div className="ip-session-nav">
        <button
          className="ip-secondary"
          type="button"
          disabled={step === 0}
          onClick={() => setStep((value) => value - 1)}
        >
          <Glyph name="back" /> {t("Previous chunk")} </button>
        <button
          className="ip-primary"
          type="button"
          onClick={() => setStep((value) => (value + 1) % item.buildSteps.length)}
        >
          {whole ? t("Start again") : t("Add the next part")}
          <Glyph name="arrow" />
        </button>
      </div>
      <aside className="ip-note">
        <strong>{t("Now, try an everyday phrase.")}</strong>
        <p>{item.transfer.join(' / ')}</p>
        <p>{t("Keep the same movement. Clarity comes before speed.")}</p>
      </aside>
    </section>
  )
}
function FoundationPractice({ id, learning, update }) {
  const { t, language } = useLanguage()
  if (id === 'tongue-intro') return <TwisterPractice />
  if (id === 'orientation') return <OrientationPractice learning={learning} update={update} />
  if (id === 'how-it-works') return <StudyPlan learning={learning} update={update} />
  const titles = {
    orientation: t("Find your reason."),
    'how-it-works': t("Choose a useful starting point."),
    letters: t("Look, say, and check."),
    hear: t("Find the rhythm of A to Z."),
    write: t("Use a page of your own."),
    sounds: t("Notice one sound at a time."),
  }
  return (
    <section className="rf-practice">
      <p className="ip-kicker">{t("TRY IT YOURSELF")}</p>
      <h2>{titles[id]}</h2>
      {['letters', 'hear'].includes(id) && (
        <>
          <p className="ip-prose"> {t("Say a letter’s name before selecting it. Listen and compare. Then try a short sequence without looking.")} </p>
          <AlphabetBoard />
          {id === 'hear' && (
            <YouTubeLessonPlayer
              videoId="MgmIHtp-ZQM"
              title="The Alphabet Song | Super Simple ABCs"
              credit="Super Simple ABCs / Super Simple Songs"
              startAt={20}
              autoplay={false}
            />
          )}
        </>
      )}
      {id === 'write' && (
        <>
          <p className="ip-prose"> {t("Use paper and a pencil. Copy a shape, look away, and write it again. Then give those letters something familiar to spell.")} </p>
          <ol className="rf-steps">
            <li>{t("Write your name with a capital initial.")}</li>
            <li>{t("Write a few family members’ names.")}</li>
            <li>{t("Write the names of three to five friends.")}</li>
            <li>{t("Read each name aloud and spell it letter by letter.")}</li>
          </ol>
          <Reflection
            id={id}
            learning={learning}
            update={update}
            label={t("Which letters would I like to try again?")}
          />
        </>
      )}
      {id === 'sounds' && (
        <>
          <p className="ip-prose"> {t("Choose one sound from the video. Watch the mouth movement, listen, pause, and imitate it. Repeat a short part before trying a longer word.")} </p>
          <YouTubeLessonPlayer
            videoId="JwTDPu2TE6k"
            title="An introduction to English speech sounds"
            credit="YouTube / sound introduction"
            autoplay={false}
          />
          <Reflection
            id={id}
            learning={learning}
            update={update}
            label={t("A sound I want to return to")}
          />
        </>
      )}
    </section>
  )
}

export default function Foundation({ route, learning, update }) {
  const { t, language } = useLanguage()
  const model = language === 'ja' ? japaneseFoundation[route.id] : foundationReading[route.id]
  return (
    <FoundationShell
      route={route}
      title={model.title}
      subtitle={model.subtitle}
      sections={model.sections}
    >
      {route.view === 'study' ? (
        <>
          {route.id === 'tongue-intro' && <aside className="rf-quick-start">
            <h2>{t('Clarity before speed.')}</h2>
            <p>{t('Choose one sound. Listen, repeat a short chunk, and add the next part when it feels comfortable.')}</p>
            <a className="ip-primary" href="#/foundation/tongue-intro/practice">{t('Try one tongue twister')}<Glyph name="arrow" /></a>
            <p className="ip-context">{t('The complete guide and all examples are below.')}</p>
          </aside>}
          <Reading model={model} />
        </>
      ) : (
        <FoundationPractice id={route.id} learning={learning} update={update} />
      )}
    </FoundationShell>
  )
}
