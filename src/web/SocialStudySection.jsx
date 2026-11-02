import { useState } from 'react'
import { useLanguage } from './Language'
import { RichText } from './ContentBlocks'
import { approvedAudio } from './components'
import Glyph from './Glyph'
import { normalizeStudyText, studyExpressions, studyIllustrations, vocabularyChapters } from './socialStudyLayout'
import './social-study-layout.css'

const plain = (runs = []) => runs.map((run) => run.text).join('')

function StudyIllustration({ sectionId }) {
  const { language } = useLanguage()
  const image = studyIllustrations[sectionId]
  const [failed, setFailed] = useState(false)
  if (!image || failed) return null
  return (
    <figure className="ar-study-illustration">
      <img src={`${import.meta.env.BASE_URL}assets/course/${image.file}`}
        alt={image[language]} width={image.width} height={image.height} loading="lazy"
        onError={() => setFailed(true)} />
    </figure>
  )
}

function StudyExpressions({ items, audioProps }) {
  const { language, t } = useLanguage()
  if (!items.length) return null
  return <ul className="ar-study-expressions" aria-label={language === 'ja' ? '使える表現' : 'Useful expressions'}>
    {items.map((item) => <li key={item.id}>
      <div><span lang="en">{item.en}</span>{language === 'ja' && item.ja && <small lang="ja">{item.ja}</small>}</div>
      {approvedAudio[item.id] && <button type="button" className="ar-study-inline-audio"
        aria-label={t('Listen to: {phrase}', { phrase: item.en })} onClick={() => audioProps.onPlay(item.id)}>
        <Glyph name={audioProps.activeId === item.id && audioProps.audio.playing ? 'pause' : 'speaker'} size={16} />
      </button>}
    </li>)}
  </ul>
}

// The original source remains visible once, in its original reading order.
// Targets are anchored in context instead of being repeated in a second cloud.
function StudySourceBlock({ block, byId, anchors, audioProps, focusedId }) {
  const { language, t } = useLanguage()
  const rendered = new Set()
  const items = (block.phraseIds ?? []).map((id) => byId[id]).filter(Boolean)
  const byText = new Map(items.map((item) => [normalizeStudyText(item.en), item]))
  const text = (runs = []) => runs.map((run, index) => {
    const item = byText.get(normalizeStudyText(run.text))
    const ownsAnchor = item && anchors[item.id] === block.id && !rendered.has(item.id)
    if (item) rendered.add(item.id)
    const copy = <RichText runs={[run]} />
    if (!item) return <span key={index}>{copy}</span>
    return (
      <span key={index} id={ownsAnchor ? `study-${item.id}` : undefined}
        data-phrase-id={item.id} tabIndex={ownsAnchor ? -1 : undefined}
        className={`ar-study-target${item.id === focusedId ? ' is-focused' : ''}`}>
        {copy}
        {approvedAudio[item.id] && (
          <button type="button" className="ar-study-inline-audio"
            aria-label={t(audioProps.activeId === item.id && audioProps.audio.playing ? 'Pause: {phrase}' : 'Listen to: {phrase}', { phrase: item.en })}
            onClick={() => audioProps.onPlay(item.id)}>
            <Glyph name={audioProps.activeId === item.id && audioProps.audio.playing ? 'pause' : 'speaker'} size={15} />
          </button>
        )}
      </span>
    )
  })
  let content
  if (block.type === 'table' && block.header.length === 2 && block.presentation !== 'expression-meaning') {
    content = (
      <dl className="ar-study-definitions" aria-label={block.header.map(plain).join(' / ')}>
        {block.rows.map((row, index) => (
          <div className="ar-study-definition" key={index}>
            <dt>{text(row[0])}</dt>
            <dd>{text(row[1])}</dd>
          </div>
        ))}
      </dl>
    )
  } else if (block.type === 'table') {
    content = (
      <div className="ar-study-table" role="region" aria-label={block.header.map(plain).join(' / ')} tabIndex={0}>
        <table>
          <thead><tr>{block.header.map((cell, index) => <th scope="col" key={index}>{text(cell)}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0
              ? <th scope="row" key={cellIndex} data-label={plain(block.header[cellIndex])}>{text(cell)}</th>
              : <td key={cellIndex} data-label={plain(block.header[cellIndex])}>{text(cell)}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    )
  } else if (block.items) {
    const List = block.ordered ? 'ol' : 'ul'
    content = <List className="ar-study-list">{block.items.map((item, index) => <li key={index}>{text(item.runs)}</li>)}</List>
  } else if (block.paragraphs) {
    const Tag = block.type === 'quote' ? 'blockquote' : 'div'
    content = <Tag className={`ar-study-document${block.type === 'email' ? ' ar-study-email' : ''}`}>
      {block.paragraphs.map((runs, index) => <p key={index}>{text(runs)}</p>)}
    </Tag>
  } else if (block.teachingNote) {
    content = <aside className="ar-study-note">
      <span className="ar-study-note-label">Note</span>
      <p>{block.teachingNote !== 'Note' && <strong>{block.teachingNote} </strong>}{text(block.runs)}</p>
    </aside>
  } else {
    content = <p className="ar-study-prose">{text(block.runs)}</p>
  }
  const unplaced = items.filter((item) => anchors[item.id] === block.id && !rendered.has(item.id))
  return (
    <div className={`ar-study-source${block.presentation === 'expression-meaning' ? ' ar-expression-meaning-source' : ''}${items.some((item) => item.id === focusedId) ? ' is-focused' : ''}`}
      data-source-block={block.id} lang={language}>
      {unplaced.map((item) => <span className="ar-study-anchor" key={item.id} id={`study-${item.id}`} tabIndex={-1} />)}
      {content}
    </div>
  )
}

export default function SocialStudySection({ section, chapterId, byId, anchors, audioProps, focusedId, renderConversation, renderDiagram }) {
  const blocks = section.blocks
  const vocabulary = vocabularyChapters.has(chapterId)
  const lead = blocks[0]?.type === 'source' && blocks[0].source.type === 'explanation' &&
    !blocks[0].source.teachingNote ? blocks[0] : null
  const renderBlock = (block) => {
    if (block.type === 'source') return <StudySourceBlock key={block.id} block={block.source}
      byId={byId} anchors={anchors} audioProps={audioProps} focusedId={focusedId} />
    if (block.type === 'conversation') return renderConversation(block)
    if (block.type === 'diagram') return renderDiagram(block)
    return null
  }
  return (
    <div className={`ar-study-content${vocabulary ? ' ar-vocabulary-study' : ''}`}>
      {lead && renderBlock(lead)}
      <StudyIllustration key={section.id} sectionId={section.id} />
      {!vocabulary && <StudyExpressions items={studyExpressions(section, byId)} audioProps={audioProps} />}
      {blocks.filter((block) => block !== lead).map(renderBlock)}
    </div>
  )
}
