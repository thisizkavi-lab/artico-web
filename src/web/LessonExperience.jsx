import { useLanguage } from './Language'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { approvedAudio, useAudio } from './components'
import Glyph from './Glyph'
import LessonFooter from './LessonFooter'
import ScenarioQuiz from './ScenarioQuiz'
import { makeScenarioQuiz } from '../course/scenarioQuiz'
import { buildPracticeCatalog, practiceParts } from './practiceCatalog'
import {
  familiarityOptions,
  filterPracticePhrases,
  getPracticeSet,
  startPractice,
  stepPractice,
  togglePracticePhrase,
} from './phrasePractice'
import Chapter01Illustrated from './Chapter01Illustrated'
import GreetingsReferenceStudy from './GreetingsReferenceStudy'
import ReferencePhraseShelf from './ReferencePhraseShelf'
import Chapter03StudySection from './Chapter03Context'
import './social-reference-study.css'
import './phrase-study-context.css'
import './introductions.css'
import './learning-flow.css'
import CurriculumIcon, { chapterIcon } from './CurriculumIcon'
import { conversationSide, groupConversationScenes } from './conversationLayout'
import { chapterPhraseIllustrations } from './chapterPhraseIllustrations'

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
const chapter02Portraits = {
  Alex: 'portrait-ch02-alex.svg',
  Anna: 'portrait-ch02-anna.svg',
  Satoshi: 'portrait-ch02-satoshi.svg',
  Daniel: 'portrait-ch02-daniel.svg',
  Sam: 'portrait-ch02-sam.svg',
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
      title={ready ? t("Listen to this phrase") : t("Audio unavailable")}
      aria-label={
        ready
          ? t(playing ? 'Pause: {phrase}' : 'Listen to: {phrase}', { phrase: item.en })
          : t('Audio not yet available: {phrase}', { phrase: item.en })
      }
      onClick={() => onPlay(item.id)}
    >
      <Glyph name={playing ? 'pause' : 'speaker'} size={18} />
    </button>
  )
}

export function PhraseCard({ id, audioProps, conversation = false, focusedId }) {
  const { language } = useLanguage()
  const { byId: introductionById, catalog, id: lessonId } = useLesson()
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
        {conversation ? (lessonId === '02'
            ? <div className="ar-ch02-spoken-line">
                <span className="ip-phrase-text" lang="en">{item.en}</span>
                <PhraseAudio item={item} {...audioProps} />
              </div>
            : <p className="ip-phrase-text" lang="en">{item.en}</p>) :
          individual.length ? <ul className="ip-word-alternatives">
            {individual.map((part) => <li key={part.id}><span className="ip-phrase-text" lang="en">{part.en}</span><PhraseAudio item={part} {...audioProps} /></li>)}
          </ul> : <p className="ip-phrase-text" lang="en">{item.en}</p>}
        {!conversation && <p className="ip-context">{item.context}</p>}
        {conversation && language === 'ja' && item.ja && <p className="ip-phrase-support" lang="ja">{item.ja}</p>}
      </div>
      {!conversation && !individual.length && <PhraseAudio item={item} {...audioProps} />}
    </article>
  )
}

// A single play control belongs to the complete exchange, not each turn.
function ConversationAudio({ block, audioProps }) {
  const { t } = useLanguage()
  const id = block.audioId ?? block.id ?? `dialogue-${block.phrases[0]}`
  const ready = Boolean(approvedAudio[id])
  const playing = ready && audioProps.activeId === id && audioProps.audio.playing
  const listen = () => {
    if (ready) audioProps.onPlay(id)
  }
  if (!ready) return null
  return (
    <button
      type="button"
      className="ip-conversation-audio"
      aria-label={playing ? t('Pause conversation audio') : t('Play full conversation')}
      title={ready ? t('Listen to the full conversation') : t('Recording coming soon')}
      onClick={listen}
      disabled={!ready}
    >
      <Glyph name={playing ? 'pause' : 'play'} size={16} />
    </button>
  )
}

function Conversation({ block, audioProps, focusedId }) {
  const { byId: introductionById } = useLesson()
  // A person stays on the same side for the entire exchange.
  const speakers = [...new Set(block.phrases.map((id) => introductionById[id]?.speaker).filter(Boolean))]
  return (
    <div className={`ip-scene ${block.art ? '' : 'ip-scene-short'}${block.replyAlternatives ? ' ip-scene-branching' : ''}`}>
      <header className="ar-scene-heading">
        <h3>{block.title}</h3>
        <ConversationAudio block={block} audioProps={audioProps} />
      </header>
      {block.art && <div className="ip-scene-setting">
        <img src={art(block.art)} alt={block.alt} width="760" height="476" loading="lazy" />
      </div>}
      <div className="ip-conversation" aria-label={block.title}>
        {block.phrases.map((id, index) => {
          // The final reply is displayed as one of the two branches below, not repeated as a fixed third turn.
          if (block.replyAlternatives?.choices.some((choice) => choice.id === id)) return null
          const item = introductionById[id]
          const outgoing = conversationSide(speakers, item.speaker, index) === 'outgoing'
          const portrait = item.portrait ?? chapter02Portraits[item.speaker] ?? (portraits[item.speaker] ? `portrait-${portraits[item.speaker]}.svg` : null)
          return (
            <div key={id} className={`ip-turn ${outgoing ? 'is-outgoing' : 'is-incoming'}`}>
              {portrait && <img className="ip-person" src={art(portrait)} width="32" height="32" alt="" />}
              <div className="ip-turn-content">
                <span className="ip-speaker">{item.speaker}</span>
                <PhraseCard id={id} audioProps={audioProps} focusedId={focusedId} conversation />
              </div>
            </div>
          )
        })}
        {block.replyAlternatives && (
          <ReplyAlternatives
            block={block.replyAlternatives}
            audioProps={audioProps}
            focusedId={focusedId}
            embedded
          />
        )}
      </div>
    </div>
  )
}


function ReplyAlternatives({ block, audioProps, embedded = false, focusedId }) {
  const { language } = useLanguage()
  const { byId } = useLesson()
  const promptItem = block.promptId ? byId[block.promptId] : null

  if (embedded) return (
    <section className="ar-ch02-branch" aria-label={block.title}>
      <div className="ar-ch02-branch-speaker">
        <img src={art('portrait-ch02-alex.svg')} alt="" width="27" height="27" />
        <span>{language === 'ja' ? 'アレックスはどちらでも答えられます' : 'Alex can reply either way'}</span>
      </div>
      <div className="ar-ch02-branch-fork" aria-hidden="true" />
      <div className="ar-ch02-branch-choices">
        {block.choices.map((choice) => {
          const item = byId[choice.id]
          if (!item) return null
          return (
            <article id={`study-${item.id}`} data-phrase-id={item.id} key={item.id}
              className={`ar-ch02-branch-choice${focusedId === item.id ? ' is-focused' : ''}`}>
              <span className="ar-ch02-branch-label">{choice.label}</span>
              <div className="ar-ch02-branch-line">
                <p lang="en">{item.en}</p>
                <PhraseAudio item={item} {...audioProps} />
              </div>
              {language === 'ja' && item.ja && <p className="ar-ch02-branch-ja" lang="ja">{item.ja}</p>}
            </article>
          )
        })}
      </div>
      <p className="ar-ch02-branch-note">
        {language === 'ja'
          ? 'どちらも自然な返事です。長さが違うだけです。'
          : 'Both are natural. The second simply says it in full.'}
      </p>
    </section>
  )

  return (
    <section className={`ar-ch02-replies${embedded ? ' ar-ch02-replies-embedded' : ''}`} aria-label={block.title}>
      <header className="ar-ch02-reply-heading">
        <h3>{block.title}</h3>
      </header>
      {!embedded && <>
        <div className="ar-ch02-reply-question">
          <div className="ar-ch02-reply-avatar">
            <img src={art('portrait-ch02-anna.svg')} alt="" width="36" height="36" />
            <span>{language === 'ja' ? '相手' : 'The other person'}</span>
          </div>
          <p lang="en">{promptItem?.en ?? block.prompt}</p>
          {language === 'ja' && promptItem?.ja && <p className="ar-ch02-reply-ja" lang="ja">{promptItem.ja}</p>}
        </div>
        <div className="ar-ch02-reply-connector" aria-hidden="true"><span>↓</span></div>
      </>}
      <div className="ar-ch02-reply-options">
        <div className="ar-ch02-reply-options-head">
          <img src={art('portrait-ch02-alex.svg')} alt="" width="36" height="36" />
          <span>{embedded
            ? (language === 'ja' ? 'アレックスの返事' : 'Alex can reply')
            : (language === 'ja' ? 'こう返せます' : 'Two natural replies')}</span>
        </div>
        <div className="ar-ch02-reply-columns">
          {block.choices.map((choice) => {
            const item = byId[choice.id]
            return (
              <div key={choice.id} className="ar-ch02-reply-option">
                <span className="ar-ch02-reply-label">{choice.label}</span>
                <p lang="en">{item.en}</p>
                {language === 'ja' && item.ja && <p className="ar-ch02-reply-ja" lang="ja">{item.ja}</p>}
                <PhraseAudio item={item} {...audioProps} />
              </div>
            )
          })}
        </div>
      </div>
      <p className="ar-ch02-reply-foot">{language === 'ja'
        ? 'どちらも「はじめまして」に気持ちを返す、自然な言い方です。'
        : 'Both replies return the feeling. Choose the length that fits the conversation.'}</p>
    </section>
  )
}


// Chapter 02: the expression is the lesson. Context stays in quiet table columns.
function Chapter02Expression({ item, audioProps }) {
  return (
    <div className="ar-ch02-expression">
      <span lang="en" className="ar-ch02-english">{item.en}</span>
      <PhraseAudio item={item} {...audioProps} />
    </div>
  )
}

function Chapter02PhraseTable({ block, audioProps }) {
  const { language } = useLanguage()
  const { byId } = useLesson()
  return (
    <section className="ar-ch02-reference" aria-label={block.title}>
      <h3 className="ip-small-heading">{block.title}</h3>
      <div className="ar-ch02-table-scroll">
        <table className="ar-ch02-table ar-ch02-alternatives-table">
          <thead><tr>
            <th scope="col">{language === 'ja' ? '英語のフレーズ' : 'English phrase'}</th>
            <th scope="col">{language === 'ja' ? '使う場面・意味' : 'When to use it'}</th>
          </tr></thead>
          <tbody>
            {block.phrases.map((id) => {
              const item = byId[id]
              if (!item) return null
              return <tr key={id}>
                <td className="ar-ch02-phrase-cell"><Chapter02Expression item={item} audioProps={audioProps} /></td>
                <td className="ar-ch02-explanation-cell" lang={language === 'ja' ? 'ja' : 'en'}>
                  {language === 'ja' ? item.ja : item.context}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      {block.note && <p className="ar-ch02-table-note">
        {block.note.title && <strong>{block.note.title} </strong>}{block.note.text}
      </p>}
    </section>
  )
}

function SituationalPhrases({ block, audioProps }) {
  const { language } = useLanguage()
  const { byId } = useLesson()
  return (
    <section className="ar-ch02-situations" aria-label={block.title}>
      <h3 className="ip-small-heading">{block.title}</h3>
      <div className="ar-ch02-table-scroll">
        <table className="ar-ch02-table ar-ch02-situation-table">
          <thead><tr>
            <th scope="col">{language === 'ja' ? '場面' : 'Situation'}</th>
            <th scope="col">{language === 'ja' ? '英語のフレーズ' : 'English phrase'}</th>
            <th scope="col">{language === 'ja' ? '使い方・意味' : 'When to use it'}</th>
          </tr></thead>
          {block.examples.map((example, index) => {
            const items = example.phrases.map((id) => byId[id]).filter(Boolean)
            return <tbody key={index}>
              {items.map((item, itemIndex) => (
                <tr key={item.id}>
                  {itemIndex === 0 && <th scope="rowgroup" rowSpan={items.length} className="ar-ch02-situation-cell">
                    <span>{example.label}</span>
                    <small>{example.hint}</small>
                  </th>}
                  <td className="ar-ch02-phrase-cell"><Chapter02Expression item={item} audioProps={audioProps} /></td>
                  <td className="ar-ch02-explanation-cell" lang={language === 'ja' ? 'ja' : 'en'}>
                    {language === 'ja' ? item.ja : item.context}
                  </td>
                </tr>
              ))}
            </tbody>
          })}
        </table>
      </div>
    </section>
  )
}

function Study({ audioProps, focusedId }) {
  const { t, language } = useLanguage()
  const {
    sections: introductionSections,
    byId: introductionById,
    id: lessonId,
    SourceContent,
    Diagram,
  } = useLesson()
  const playIllustratedPhrase = (item) => {
    if (approvedAudio[item.id]) audioProps.onPlay(item.id)
  }
  return (
    <div className={`ip-reading ar-shared-study${lessonId === '02' ? ' ar-ch02-study' : ''}`}>
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
          {lessonId === '03'
            ? <Chapter03StudySection sectionIndex={index} audioProps={audioProps} />
            : lessonId === '04'
              ? <ChapterPhraseStudySection section={section} audioProps={audioProps} focusedId={focusedId} />
              : lessonId === '05'
                ? <Chapter05PhraseStudySection section={section} sectionIndex={index} audioProps={audioProps} focusedId={focusedId} />
                : ['06', '07', '08', '09', '10'].includes(lessonId)
                  ? <ChapterIllustratedPhraseStudySection section={section} sectionIndex={index} audioProps={audioProps} focusedId={focusedId} />
                  : (lessonId === '02' ? section.blocks : groupConversationScenes(section.blocks)).map((block, blockIndex) => {
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
            if (lessonId === '02' && block.type === 'situations')
              return <SituationalPhrases key={blockIndex} block={block} audioProps={audioProps} />
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
            if (block.type === 'note') {
              if (lessonId === '02' && section.blocks[blockIndex - 1]?.type === 'phrases') return null
              return (
                <aside className="ip-note" key={blockIndex}>
                  <span className="ar-note-label">Note</span>
                  <p>{block.title && <strong>{block.title} </strong>}{block.text}</p>
                </aside>
              )
            }
            if (block.type === 'reply-alternatives')
              return <ReplyAlternatives key={blockIndex} block={block} audioProps={audioProps} />
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
            if (block.type === 'conversation-pair')
              return (
                <div className="ip-scene-pair" key={blockIndex}>
                  <Conversation block={block.conversations[0]} audioProps={audioProps} focusedId={focusedId} />
                  <div className="ip-scene-pair-second">
                    {block.bridge?.type === 'source'
                      ? <SourceContent block={block.bridge.source} audioProps={audioProps} focusedId={focusedId} />
                      : block.bridge?.type === 'label'
                        ? <h3 className="ip-small-heading">{block.bridge.text}</h3>
                        : block.bridge?.type === 'text'
                          ? <p className="ip-prose">{block.bridge.text}</p>
                          : null}
                    <Conversation block={block.conversations[1]} audioProps={audioProps} focusedId={focusedId} />
                  </div>
                </div>
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
            if (block.type === 'vocabulary' && lessonId === '02')
              return (
                <section className="ar-word-section" key={blockIndex} aria-label={block.title}>
                  <h3 className="ip-small-heading">{block.title}</h3>
                  <div className="ip-words">
                    {block.phrases.map((id) => {
                      const item = introductionById[id]
                      return (
                        <article id={`study-${id}`} data-phrase-id={id}
                          className={`ip-word ${id === focusedId ? 'is-focused' : ''}`} key={id}>
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
                </section>
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
            if (lessonId === '02' && block.type === 'phrases')
              return <Chapter02PhraseTable key={blockIndex} block={block} audioProps={audioProps} />
            if (lessonId === '01' && block.type === 'phrases') {
              return (
                <Chapter01Illustrated
                  key={blockIndex}
                  block={block}
                  byId={introductionById}
                  focusedId={focusedId}
                  onPlay={playIllustratedPhrase}
                />
              )
            }
            return block.type === 'phrases' ? (
              <ReferencePhraseShelf key={blockIndex} ids={block.phrases}
                byId={introductionById} audioProps={audioProps} focusedId={focusedId}
                title={lessonId === '02' ? block.title : undefined}
                sceneArt={lessonId === '02' ? block.sceneArt : undefined}
                note={lessonId === '02' && section.blocks[blockIndex + 1]?.type === 'note'
                  ? section.blocks[blockIndex + 1] : undefined} />
            ) : (
              <div className="ip-phrase-grid" key={blockIndex}>
                {block.phrases?.map((id) => (
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

const chapter05PhraseIllustrations = [
  {
    file: 'ch05-01-likes-dislikes.png',
    alt: 'A woman choosing between the outdoor photography and hiking she loves and an activity she dislikes',
  },
  {
    file: 'ch05-02-asking-opinions.png',
    alt: 'Three people looking at an interior design plan and sharing their opinions',
  },
  {
    file: 'ch05-03-choosing-options.png',
    alt: 'A woman comparing eating pasta at a restaurant with taking a burger meal home',
  },
  {
    file: 'ch05-04-strong-reactions.png',
    alt: 'One person delighted by a surprise gift while another reacts with shock',
  },
]

function Chapter05PhraseStudySection({ section, sectionIndex, audioProps, focusedId }) {
  const { byId, SourceContent } = useLesson()
  const { language } = useLanguage()
  const intro = section.blocks.find((block) => block.type === 'source' && block.source.type === 'explanation')
  const table = section.blocks.find((block) => block.type === 'source' && block.source.type === 'table')
  const conversation = section.blocks.find((block) => block.type === 'conversation')
  const notes = section.blocks.filter((block) =>
    block.type === 'source' &&
    block.source.type === 'explanation' &&
    block !== intro,
  )
  if (!table || !conversation) return null
  const illustration = chapter05PhraseIllustrations[sectionIndex] ?? chapter05PhraseIllustrations[0]
  const phraseIds = (table.source.phraseCells ?? []).map((row) => row[0]).filter(Boolean)
  return (
    <div className="ar-phrase-study ar-ch05-phrase-study">
      {intro && <SourceContent block={intro.source} audioProps={audioProps} focusedId={focusedId} examples={false} />}
      <div className="ar-ch05-phrase-card">
        <div className="ar-ch05-illustration">
          <img
            src={art(illustration.file)}
            alt={illustration.alt}
            width="1774"
            height="887"
            loading="lazy"
            onError={(event) => {
              if (!conversation.art || event.currentTarget.dataset.fallback === 'true') return
              event.currentTarget.dataset.fallback = 'true'
              event.currentTarget.src = art(conversation.art)
            }}
          />
        </div>
        <div
          className="ar-ch05-phrase-cloud"
          aria-label={language === 'ja' ? 'このセクションで学ぶ表現' : 'Phrases in this section'}
        >
          {phraseIds.map((id) => {
            const item = byId[id]
            if (!item) return null
            return (
              <div className="ar-ch05-phrase-chip" key={id}>
                <span lang="en">{item.en}</span>
                <PhraseAudio item={item} {...audioProps} />
              </div>
            )
          })}
        </div>
      </div>
      <section className="ar-phrase-table">
        <h3>{language === 'ja' ? '使えるフレーズ' : 'Useful phrases'}</h3>
        <SourceContent block={table.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
      </section>
      <section className="ar-phrase-example">
        <h3>{language === 'ja' ? '会話例' : 'Example conversation'}</h3>
        <div className="ar-phrase-example-lines">
          {conversation.turns.map((turn, index) => {
            const item = byId[turn.id]
            if (!item) return null
            const outgoing = conversationSide(
              [...new Set(conversation.turns.map((entry) => entry.speaker))],
              turn.speaker,
              index,
            ) === 'outgoing'
            return (
              <div className={`ar-phrase-example-row ${outgoing ? 'is-outgoing' : 'is-incoming'}`} key={turn.id}>
                {turn.portrait && <img className="ar-phrase-example-avatar" src={art(turn.portrait)} alt="" width="30" height="30" />}
                <div className="ar-phrase-example-bubble">
                  <span className="ar-phrase-example-speaker">{turn.speaker}</span>
                  <p lang="en">{(turn.runs ?? [{ text: item.en }]).map((run, runIndex) => run.emphasis
                    ? <strong key={runIndex}>{run.text}</strong>
                    : <span key={runIndex}>{run.text}</span>)}</p>
                  {language === 'ja' && item.ja && <p className="ar-phrase-example-ja" lang="ja">{item.ja}</p>}
                  <PhraseAudio item={item} {...audioProps} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {notes.map((note, index) => (
        <aside className="ar-phrase-note" key={note.id ?? index}>
          <span className="ar-phrase-note-label">{language === 'ja' ? 'ポイント' : 'Keep in mind'}</span>
          <SourceContent block={note.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
        </aside>
      ))}
    </div>
  )
}

function ChapterPhraseConversation({ block, audioProps, conversationIndex }) {
  const { byId } = useLesson()
  const { language } = useLanguage()
  const speakers = [...new Set(block.turns.map((turn) => turn.speaker))]
  return (
    <section className="ar-phrase-example">
      <h3>{language === 'ja'
        ? (conversationIndex === 0 ? '会話例' : 'もう一つの会話例')
        : (conversationIndex === 0 ? 'Example conversation' : 'Another example')}</h3>
      <div className="ar-phrase-example-lines">
        {block.turns.map((turn, index) => {
          const item = byId[turn.id]
          const english = turn.en ?? item?.en
          if (!english) return null
          const outgoing = conversationSide(speakers, turn.speaker, index) === 'outgoing'
          return (
            <div className={`ar-phrase-example-row ${outgoing ? 'is-outgoing' : 'is-incoming'}`} key={turn.id}>
              {turn.portrait && <img className="ar-phrase-example-avatar" src={art(turn.portrait)} alt="" width="30" height="30" />}
              <div className="ar-phrase-example-bubble">
                <span className="ar-phrase-example-speaker">{turn.speaker}</span>
                <p lang="en">{english}</p>
                {language === 'ja' && (turn.ja ?? item?.ja) && (
                  <p className="ar-phrase-example-ja" lang="ja">{turn.ja ?? item.ja}</p>
                )}
                {item && <PhraseAudio item={item} {...audioProps} />}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ChapterIllustratedPhraseStudySection({ section, sectionIndex, audioProps, focusedId }) {
  const { byId, SourceContent } = useLesson()
  const { language } = useLanguage()
  const chapterId = section.id.slice(0, 2)
  const illustration = chapterPhraseIllustrations[chapterId]?.[sectionIndex]
  const leadBlock = section.blocks[0]?.type === 'source' && section.blocks[0].source.type === 'explanation'
    ? section.blocks[0]
    : null
  const phraseIds = [...new Set(section.blocks.flatMap((block) =>
    block.type === 'source' ? (block.source.phraseIds ?? []) : [],
  ))].filter((id) => byId[id]?.section === section.id && !id.includes('-line'))
  const fallbackFile = illustration?.fallbackFile ?? section.blocks.find((block) => block.type === 'conversation')?.art
  let conversationIndex = 0
  return (
    <div className="ar-phrase-study ar-illustrated-phrase-study">
      {leadBlock && (
        <SourceContent block={leadBlock.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
      )}
      {illustration && (
        <div className="ar-illustrated-phrase-card">
          <div className="ar-illustrated-illustration">
            <img
              src={art(illustration.file)}
              alt={illustration.alt}
              width="1774"
              height="887"
              loading="lazy"
              onError={(event) => {
                if (!fallbackFile || event.currentTarget.dataset.fallback === 'true') return
                event.currentTarget.dataset.fallback = 'true'
                event.currentTarget.src = art(fallbackFile)
              }}
            />
          </div>
          <div
            className="ar-illustrated-phrase-cloud"
            aria-label={language === 'ja' ? 'このセクションで学ぶ表現' : 'Phrases in this section'}
          >
            {phraseIds.map((id) => {
              const item = byId[id]
              return (
                <div className="ar-illustrated-phrase-chip" key={id}>
                  <span lang="en">{item.en}</span>
                  <PhraseAudio item={item} {...audioProps} />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {section.blocks.filter((block) => block !== leadBlock).map((block) => {
        if (block.type === 'source')
          return (
            <SourceContent
              key={block.id}
              block={block.source}
              audioProps={audioProps}
              focusedId={focusedId}
              examples={false}
            />
          )
        if (block.type === 'conversation')
          return (
            <ChapterPhraseConversation
              key={block.id}
              block={block}
              audioProps={audioProps}
              conversationIndex={conversationIndex++}
            />
          )
        return null
      })}
    </div>
  )
}

function ChapterPhraseStudySection({ section, audioProps, focusedId }) {
  const { byId, SourceContent } = useLesson()
  const { language } = useLanguage()
  const intro = section.blocks.find((block) => block.type === 'source' && block.source.type === 'explanation')
  const table = section.blocks.find((block) => block.type === 'source' && block.source.type === 'table')
  const conversation = section.blocks.find((block) => block.type === 'conversation')
  const notes = section.blocks.filter((block) =>
    block.type === 'source' &&
    block.source.type === 'explanation' &&
    block !== intro,
  )
  if (!table || !conversation) return null
  // Keep the illustration panel calm. The full phrase set remains in the table.
  const phraseIds = (table.source.phraseCells ?? []).map((row) => row[0]).filter(Boolean).slice(0, 5)
  const speakers = [...new Set(conversation.turns.map((turn) => turn.speaker))]
  const portraits = conversation.turns.slice(0, 2).map((turn) => turn.portrait)
  return (
    <div className="ar-phrase-study">
      {intro && <SourceContent block={intro.source} audioProps={audioProps} focusedId={focusedId} examples={false} />}
      <div className="ar-phrase-scene">
        <div className="ar-phrase-scene-art">
          <img src={art(conversation.art)} alt={conversation.alt} width="560" height="280" loading="lazy" />
        </div>
        <div className="ar-phrase-bubbles" aria-label={language === 'ja' ? 'この場面で使える表現' : 'Phrases you can use'}>
          {phraseIds.map((id, index) => {
            const item = byId[id]
            if (!item) return null
            const portrait = portraits[index % Math.max(1, portraits.length)]
            return (
              <div className={`ar-phrase-bubble-row ${index % 2 ? 'is-right' : 'is-left'}`} key={id}>
                {portrait && <img className="ar-phrase-bubble-avatar" src={art(portrait)} alt="" width="28" height="28" />}
                <div className="ar-phrase-bubble">
                  <p lang="en">{item.en}</p>
                  <PhraseAudio item={item} {...audioProps} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <section className="ar-phrase-table">
        <h3>{language === 'ja' ? '使えるフレーズ' : 'Useful phrases'}</h3>
        <SourceContent block={table.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
      </section>
      <section className="ar-phrase-example">
        <h3>{language === 'ja' ? '会話例' : 'Example conversation'}</h3>
        <div className="ar-phrase-example-lines">
          {conversation.turns.map((turn, index) => {
            const item = byId[turn.id]
            if (!item) return null
            const outgoing = conversationSide(speakers, turn.speaker, index) === 'outgoing'
            return (
              <div className={`ar-phrase-example-row ${outgoing ? 'is-outgoing' : 'is-incoming'}`} key={turn.id}>
                {turn.portrait && <img className="ar-phrase-example-avatar" src={art(turn.portrait)} alt="" width="30" height="30" />}
                <div className="ar-phrase-example-bubble">
                  <span className="ar-phrase-example-speaker">{turn.speaker}</span>
                  <p lang="en">{(turn.runs ?? [{ text: item.en }]).map((run, runIndex) => run.emphasis
                    ? <strong key={runIndex}>{run.text}</strong>
                    : <span key={runIndex}>{run.text}</span>)}</p>
                  {language === 'ja' && item.ja && <p className="ar-phrase-example-ja" lang="ja">{item.ja}</p>}
                  <PhraseAudio item={item} {...audioProps} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {notes.map((note, index) => (
        <aside className="ar-phrase-note" key={note.id ?? index}>
          <span className="ar-phrase-note-label">{language === 'ja' ? 'ポイント' : 'Keep in mind'}</span>
          <SourceContent block={note.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
        </aside>
      ))}
    </div>
  )
}

function PracticeChooser({ set, change, audioProps, onStart }) {
  const { t, language } = useLanguage()
  const { catalog: { items: introductionPhrases }, sections: introductionSections, studyPath, id: chapterId } = useLesson()
  const barRef = useRef(null)
  const frameRef = useRef(null)
  useEffect(() => {
    const viewport = barRef.current?.closest('.aw-viewport')
    const measure = () => viewport?.style.setProperty('--practice-bar-height', String(barRef.current?.offsetHeight ?? 0) + 'px')
    const observer = new ResizeObserver(measure)
    if (barRef.current) observer.observe(barRef.current)
    measure()
    return () => {
      observer.disconnect()
      viewport?.style.removeProperty('--practice-bar-height')
      cancelAnimationFrame(frameRef.current)
    }
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
  // A scene illustration supplies context when an individual phrase has no artwork.
  const sceneArtBySection = Object.fromEntries(introductionSections.map((section) => {
    const scene = section.blocks.find((block) => block.art || block.sceneArt || block.source?.art)
    return [section.id, scene?.art ?? scene?.sceneArt ?? scene?.source?.art]
  }))
  const shown = filterPracticePhrases(introductionPhrases, set)
  const selected = new Set(set.selected)
  const hasFilter = set.filter !== 'all' || set.search.trim() !== ''
  const hiddenSelected = set.selected.filter((id) => !shown.some((item) => item.id === id)).length
  return (
    <div className="ip-custom-bank ip-card-picker" onFocusCapture={revealFocus}>
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
                  : introductionPhrases.filter((item) => set.ratings[item.id] === option.value).length}
              </span>
            </button>
          ))}
        </div>
        <div className="ip-selection-actions">
          <span>{t('{shown} of {total} items', { shown: shown.length, total: introductionPhrases.length })}</span>
          <button type="button" onClick={() => change((current) => ({
            ...current, selected: introductionPhrases.map((item) => item.id),
          }))}>{t("Select all")}</button>
          <button type="button" onClick={() => change((current) => ({ ...current, selected: [] }))}>
            {t("Clear selection")}
          </button>
          {hasFilter && shown.length > 0 && (
            <button type="button" onClick={() => change((current) => ({
              ...current, selected: [...new Set([...current.selected, ...shown.map((item) => item.id)])],
            }))}>{t("Select shown")}</button>
          )}
          {hiddenSelected > 0 && (
            <button type="button" onClick={() => change((current) => ({
              ...current, filter: 'all', search: '',
            }))}>{t('See all selected items')}</button>
          )}
        </div>
      </div>
      <div className="ip-card-sections">
        {introductionSections.map((section) => {
          const items = shown.filter((item) => item.section === section.id)
          if (!items.length) return null
          return (
            <section key={section.id} aria-label={section.title} className="ip-card-section">
              <div className="ip-list-heading">
                <h3>{chapterId === '01' && language === 'ja' ? ({ open: '会話を始める', 'check-in': '調子を尋ねて答える', reunion: '久しぶりに会う', casual: 'くだけた表現' }[section.id] || section.title) : section.title}</h3>
                <span>{items.length}</span>
              </div>
              <div className="ip-card-grid">
                {items.map((item) => {
                  const illustration = item.art || sceneArtBySection[section.id]
                  return (
                    <article key={item.id} className={'ip-select-card' + (selected.has(item.id) ? ' is-selected' : '')}>
                      <label className="ip-card-select">
                        <input
                          type="checkbox"
                          className="ip-card-checkbox"
                          checked={selected.has(item.id)}
                          onChange={() => change((current) => togglePracticePhrase(current, item.id))}
                          aria-label={t('Include: {phrase}', { phrase: item.en })}
                        />
                        <span className="ip-card-visual" aria-hidden="true">
                          {illustration
                            ? <img src={art(illustration)} loading="lazy" alt="" />
                            : <CurriculumIcon name={chapterIcon(chapterId)} size={46} />}
                        </span>
                        <span className="ip-card-phrase" lang="en">{item.en}</span>
                        {chapterId === '01' && language === 'ja' && item.ja && <span className="ip-card-translation" lang="ja">{item.ja}</span>}
                      </label>
                      <div className="ip-card-footer">
                        {set.ratings[item.id] ? (
                          <span className={'ip-rating-label is-' + set.ratings[item.id]}>
                            {t(familiarLabel(set.ratings[item.id]))}
                          </span>
                        ) : <span className="ip-card-footer-spacer" />}
                        <div className="ip-card-actions">
                          <PhraseAudio item={item} {...audioProps} />
                          <a
                            href={studyPath + '?line=' + (item.studyId ?? item.id)}
                            aria-label={t('View in Study: {phrase}', { phrase: item.en })}
                            title={t("View in Study")}
                          ><Glyph name="book" size={18} /></a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
        {!shown.length && (
          <div className="ip-empty">
            <Glyph name="search" size={28} />
            <h3>{t("No phrases in this view yet.")}</h3>
            <p>{set.search.trim()
              ? t("Try a different search, or show all phrases.")
              : t("Your self-ratings will appear here after practice.")}</p>
            <button className="ip-secondary" type="button" onClick={() => change((current) => ({
              ...current, filter: 'all', search: '',
            }))}>{t("Show all phrases")}</button>
          </div>
        )}
      </div>
      <div className="ip-selection-bar" ref={barRef}>
        <div role="status" aria-live="polite">
          <strong>{t('{count} selected', { count: set.selected.length })}</strong>
          <span>{set.selected.length === 0
            ? t("Choose at least one phrase.")
            : hiddenSelected > 0
              ? t('{count} selected outside this view', { count: hiddenSelected })
              : t("Your selection is saved on this device.")}</span>
        </div>
        <button type="button" className="ip-primary" disabled={!set.selected.length} onClick={onStart}>
          {t("Practice selected")} <span className="ip-button-count">{set.selected.length}</span><Glyph name="arrow" />
        </button>
      </div>
    </div>
  )
}

function PracticeEntry({ set, change, audioProps, onStart }) {
  const { t } = useLanguage()
  return (
    <>
      <section className="ip-picker-intro">
        <div className="ip-picker-heading">
          <span className="ip-picker-number">01</span>
          <h2 id="practice-entry-heading" tabIndex={-1}>{t('Choose your practice set.')}</h2>
        </div>
      </section>
      <PracticeChooser set={set} change={change} audioProps={audioProps} onStart={() => onStart()} />
    </>
  )
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
  const { practiceById: introductionById, sectionById, studyPath, id: chapterId } = useLesson()
  const item = introductionById[set.session.ids[set.session.index]]
  const [covered, setCovered] = useState(false)
  const headingRef = useRef(null)
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
          <span>{chapterId === '01' && language === 'ja' ? ({ open: 'あいさつ', 'check-in': '調子を尋ねる', reunion: '再会', casual: 'くだけた表現' }[item.section] || sectionById[item.section].short) : sectionById[item.section].short}</span>
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
        <p className="ip-focus-context" id="practice-phrase-context">{chapterId === '01' && language === 'ja' && item.contextJa ? item.contextJa : item.context}</p>
        {chapterId === '01' && language === 'ja' && item.ja && <p className="ip-focus-translation" lang="ja">{item.ja}</p>}
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
    legacyPhraseIds,
    catalog,
    practiceById,
  } = useLesson()
  const practice = route.view === 'practice'
  const quizQuestions = useMemo(
    () => makeScenarioQuiz({ id, phrases: introductionPhrases }, language),
    [id, introductionPhrases, language],
  )
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
    byId: introductionById,
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
      <header className="ip-lesson-heading ip-lesson-heading-social">
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
        <p>{id === '01' && language === 'ja' ? '英語であいさつをし、相手の調子を尋ね、久しぶりに会った人と話す練習をします。' : subtitle}</p>
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
                  <span>{id === '01' && language === 'ja' ? ({ open: 'あいさつする', 'check-in': '調子を尋ねる', reunion: '再会する', casual: 'くだけた表現' }[section.id] || section.short) : section.short}</span>
                </button>
              ))}
            </nav>
          </details>
        ) : null}
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
            <ScenarioQuiz key={id + '-' + language} questions={quizQuestions} />
          </div>
        </div>
      ) : (
        <>{id === '01' ? <GreetingsReferenceStudy audioProps={audioProps} phrases={introductionPhrases} /> : <Study audioProps={audioProps} focusedId={focusedId} />}</>
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
