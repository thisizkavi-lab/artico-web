import { useLanguage } from './Language'
import { useEffect, useMemo, useState } from 'react'
import LessonExperience from './LessonExperience'
import { LessonDiagram } from './LessonDiagrams'
import { SourceContent } from './ContentBlocks'
import './chapter.css'
import './readable-course.css'
import { sourceChapterId } from './chapterNumbers.js'
import { selectTeachingNotes } from './teachingNotes.js'

const lessons = import.meta.glob('../course/lessons/*.json', { import: 'default' })
const japaneseLessons = import.meta.glob('../course/locales/ja/lessons/*.json', { import: 'default' })
const pending = new Map(),
  resolved = new Map()

function makeModel(source, t) {
  const teachingNotes = selectTeachingNotes(source.study)
  const sections = source.study.map((section, sectionIndex) => ({
    id: section.id,
    title: section.title,
    short: section.title,
    blocks: section.blocks.map((block, blockIndex) =>
      block.type === 'conversation'
        ? {
            type: 'conversation',
            id: block.id,
            art: block.art,
            title: block.caption,
            alt: `${block.people.join(', ')} — ${section.title}`,
            phrases: block.phraseIds,
          }
        : {
            type: 'source',
            id: block.id,
            source: teachingNotes[`${sectionIndex}:${blockIndex}`]
              ? { ...block, teachingNote: teachingNotes[`${sectionIndex}:${blockIndex}`] }
              : block,
          },
    ),
  }))
  // Chapter 03 teaches each expression inside the exchange that gives it meaning.
  if (source.id === '03') {
    const chapter03Titles = source.title.includes('会話') || source.title.includes('考える')
      ? ['返事を始め、話を進める', '言いたいことを調整する', '聞き手として反応する', '短い質問で確認する']
      : ['Start and guide your answer', 'Shape what you mean', 'Respond as a listener', 'Check with the listener']
    sections.forEach((section, index) => {
      if (chapter03Titles[index]) section.title = chapter03Titles[index]
    })
  }
  // Show the complete email and its purpose before the delivery vocabulary.
  if (source.id === '93' && sections.length > 1) sections.unshift(...sections.splice(1, 1))
  if (source.diagram)
    sections.splice(Math.min({ calendar: 2, family: 1, sequence: 0, presentation: 2, home: 2, directions: 2, body: 1 }[source.diagram] ?? 1, sections.length), 0, {
      id: 'visual',
      title: t('Look & understand'),
      short: t('Visual guide'),
      blocks: [{ type: 'diagram', diagram: source.diagram }],
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
  }
}

export default function ChapterLesson(props) {
  const { t, language } = useLanguage()
  const id = sourceChapterId(props.route.id)
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
  const model = useMemo(() => source
    ? { ...makeModel(source, t), displayId: props.route.id, basePath: '/lesson/' + props.route.id }
    : null, [source, t, props.route.id])
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
