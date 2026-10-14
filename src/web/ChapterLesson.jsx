import { useLanguage } from './Language'
import { useEffect, useMemo, useState } from 'react'
import LessonExperience, { Glyph } from './LessonExperience'
import { LessonDiagram } from './LessonDiagrams'
import { RichText, SourceContent } from './ContentBlocks'
import './chapter.css'
import './readable-course.css'

const lessons = import.meta.glob('../course/lessons/*.json', { import: 'default' })
const japaneseLessons = import.meta.glob('../course/locales/ja/lessons/*.json', { import: 'default' })
const pending = new Map(),
  resolved = new Map()

function ChapterScenarios({ source, learning, update }) {
  const { t, language } = useLanguage()
  return (
    <section className="ip-your-turn">
      <p className="ip-kicker">{t("02 / PUT IT INTO WORDS")}</p>
      <h2>{t("When the phrases feel familiar.")}</h2>
      <p className="ip-prose"> {t("Try the situations in your own words. Use the sample responses when you need a little support.")} </p>
      {source.practice.map((section) => {
        let answering = false
        const prompts = [],
          answers = []
        for (const block of section.blocks) {
          if (block.type === 'answerHeading' || block.type === 'answer') answering = true
          ;(answering ? answers : prompts).push(block)
        }
        return (
          <div key={section.id} className="rc-practice-section">
            <h3>{section.title}</h3>
            {prompts.map((block) =>
              block.type === 'list' && block.ordered ? (
                block.items.map((item, i) => {
                  const id = `${block.id}-${i}`
                  return (
                    <details className="ip-scenario" key={id}>
                      <summary>
                        <span>{String(item.number).padStart(2, '0')}</span>
                        <span>
                          <RichText runs={item.runs} />
                        </span>
                        <Glyph name="chevron" />
                      </summary>
                      <div className="ip-scenario-body">
                        <label> {t("Your notes")} <span>{t("(optional)")}</span>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            value={learning.responses[id] ?? ''}
                            placeholder={t("Try saying it first. Keep a note if it helps.")}
                            onChange={(event) =>
                              update((previous) => ({
                                ...previous,
                                responses: { ...previous.responses, [id]: event.target.value },
                              }))
                            }
                          />
                        </label>
                      </div>
                    </details>
                  )
                })
              ) : (
                <SourceContent key={block.id} block={block} examples={false} />
              ),
            )}
            {answers.length > 0 && (
              <details className="ip-sample rc-answers">
                <summary>{t("Show sample responses")}</summary>
                {answers.map((block) => (
                  <SourceContent key={block.id} block={block} examples={false} />
                ))}
              </details>
            )}
          </div>
        )
      })}
    </section>
  )
}

function makeModel(source, t) {
  const sections = source.study.map((section) => ({
    id: section.id,
    title: section.title,
    short: section.title,
    blocks: section.blocks.map((block) =>
      block.type === 'conversation'
        ? {
            type: 'conversation',
            id: block.id,
            art: block.art,
            title: block.caption,
            alt: `${block.people.join(', ')} — ${section.title}`,
            phrases: block.phraseIds,
          }
        : { type: 'source', id: block.id, source: block },
    ),
  }))
  if (source.diagram)
    sections.push({
      id: 'visual',
      title: t('Look & understand'),
      short: t('Visual guide'),
      blocks: [{ type: 'diagram', diagram: source.diagram }],
    })
  sections.push({
    id: 'words',
    title: t('Words & phrases'),
    short: t('Words & phrases'),
    blocks: [
      {
        type: 'words',
        phrases: source.phraseBank
          .filter((item) => item.section === 'words')
          .map((item) => item.id),
      },
    ],
  })
  return {
    id: source.id,
    title: source.title,
    subtitle: source.goal,
    language: source.language ?? 'en',
    phrases: source.phraseBank,
    legacyPhraseIds: source.rehearsal.map((item) => item.id),
    sections,
    SourceContent,
    Diagram: LessonDiagram,
    Scenarios: ChapterScenarios,
    scenarioSource: source,
  }
}

export default function ChapterLesson(props) {
  const { t, language } = useLanguage()
  const id = props.route.id
  const cacheKey = `${language}:${id}`
  const [state, setState] = useState(() => ({ id: cacheKey, source: resolved.get(cacheKey), error: false }))
  useEffect(() => {
    let active = true
    if (!pending.has(cacheKey)) {
      const load = language === 'ja' ? japaneseLessons[`../course/locales/ja/lessons/${id}.json`] : lessons[`../course/lessons/${id}.json`]
      pending.set(cacheKey, load())
    }
    const other = language === 'ja' ? 'en' : 'ja'
    const otherKey = `${other}:${id}`
    if (!pending.has(otherKey)) {
      const load = other === 'ja' ? japaneseLessons[`../course/locales/ja/lessons/${id}.json`] : lessons[`../course/lessons/${id}.json`]
      pending.set(otherKey, load().then((source) => { resolved.set(otherKey, source); return source }).catch(() => { pending.delete(otherKey); return null }))
    }
    pending
      .get(cacheKey)
      .then((source) => {
        if (!source) throw new Error('Lesson unavailable')
        resolved.set(cacheKey, source)
        if (active) setState({ id: cacheKey, source, error: false })
      })
      .catch(() => {
        pending.delete(cacheKey)
        if (active) setState({ id: cacheKey, error: true })
      })
    return () => {
      active = false
    }
  }, [id, language, cacheKey])
  const source = resolved.get(cacheKey) ?? (state.id?.endsWith(`:${id}`) ? state.source : null)
  const model = useMemo(() => (source ? makeModel(source, t) : null), [source, t])
  if (state.error && state.id === cacheKey)
    return (
      <div className="ip-page">
        <h1>{t("We couldn’t load this lesson.")}</h1>
        <button className="ip-primary" onClick={() => window.location.reload()}> {t("Try again")} </button>
      </div>
    )
  if (!model)
    return (
      <div className="ip-page" role="status"> {t("Loading your lesson…")} </div>
    )
  return <LessonExperience model={model} {...props} />
}
