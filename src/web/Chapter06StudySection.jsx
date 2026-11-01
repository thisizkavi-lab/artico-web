import { useLanguage } from './Language'
import { RichText, SourceContent } from './ContentBlocks'
import { conversationSide } from './conversationLayout'
import { chapter06Presentation } from './chapter06Presentation'
import { sectionPhraseIds } from './phraseSceneData'
import './chapter06-pilot.css'

function Chapter06Conversation({ block, byId, audioProps, Audio, focusedId }) {
  const { language } = useLanguage()
  const speakers = [...new Set(block.turns.map((turn) => turn.speaker))]
  return <section className="ar-ch06-conversation" aria-labelledby={`conversation-${block.id}`}>
    <h3 id={`conversation-${block.id}`}>{language === 'ja' ? '会話例' : 'Example conversation'}</h3>
    <ol className="ar-ch06-turns">
      {block.turns.map((turn, index) => {
        const item = byId[turn.id]
        const english = turn.en ?? item?.en
        const japanese = turn.ja || item?.ja
        const side = conversationSide(speakers, turn.speaker, index)
        return <li key={turn.id} className={`ar-ch06-turn is-${side}${focusedId === turn.id ? ' is-focused' : ''}`}
          id={`study-${turn.id}`} data-phrase-id={turn.id} tabIndex={-1}>
          <span className="ar-ch06-avatar" aria-hidden="true">{turn.speaker?.slice(0, 1)}</span>
          <div className="ar-ch06-message">
            <span className="ar-ch06-speaker">{turn.speaker}</span>
            <div className="ar-ch06-bubble">
              <div className="ar-ch06-message-copy">
                <p lang="en">{english}</p>
                {language === 'ja' && japanese && <p className="ar-ch06-gloss" lang="ja">{japanese}</p>}
              </div>
              {item && <Audio item={item} {...audioProps} />}
            </div>
          </div>
        </li>
      })}
    </ol>
  </section>
}

export default function Chapter06StudySection({ section, byId, audioProps, Audio, focusedId, renderBoard }) {
  const { language } = useLanguage()
  const { entries, boardIds } = chapter06Presentation(section, byId)
  const candidates = sectionPhraseIds(section, byId, boardIds)
  const displayedIds = candidates.some((id) => byId[id]?.kind !== 'word')
    ? candidates.filter((id) => byId[id]?.kind !== 'word') : candidates
  const anchored = new Set(displayedIds)
  const anchors = (ids = []) => ids.filter((id) => {
    if (anchored.has(id)) return false
    anchored.add(id)
    return true
  }).map((id) => <span className="ar-ch06-anchor" id={`study-${id}`} data-phrase-id={id} key={id} tabIndex={-1} />)
  const lead = entries[0]?.type === 'source' && entries[0].source.type === 'explanation' ? entries[0] : null
  return <div className="ar-phrase-study ar-ch06-content">
    {lead && <SourceContent block={lead.source} audioProps={audioProps} focusedId={focusedId} examples={false} />}
    {renderBoard(displayedIds)}
    {entries.filter((entry) => entry !== lead).map((entry) => {
      if (entry.type === 'conversation') return <Chapter06Conversation key={entry.id} block={entry}
        byId={byId} audioProps={audioProps} Audio={Audio} focusedId={focusedId} />
      if (entry.type === 'note') return <aside key={entry.id} className="ar-ch06-note" data-source-block={entry.id}>
        {anchors(entry.source.phraseIds)}
        <span className="ar-ch06-note-label">{language === 'ja' ? 'メモ' : 'Note'}</span>
        <p><RichText runs={entry.source.runs} /></p>
      </aside>
      if (entry.type === 'reply-table') return <div key={entry.id} className="rc-table ar-ch06-reply-table"
        role="region" aria-label={language === 'ja' ? '同じ気持ちを伝える返し方' : 'Sharing the same feeling'} tabIndex={0}>
        <table>
          <thead><tr><th scope="col">{language === 'ja' ? '相手の言葉' : 'You hear'}</th>
            <th scope="col">{language === 'ja' ? '返し方' : 'You can say'}</th></tr></thead>
          {entry.groups.map(({ source, rows }) => <tbody key={source.id} data-source-block={source.id}>
            {rows.map((row, index) => <tr key={index}>
              <th scope="row" lang="en">{row.statement}</th>
              <td>
                {anchors([row.phraseId].filter(Boolean))}
                {index === rows.length - 1 && anchors(source.phraseIds)}
                <span className="ar-ch06-reply" lang="en">{row.reply}</span>
                {row.annotation && <small className="ar-ch06-row-note" lang="ja" data-source-block={row.annotation.id}>
                  <RichText runs={row.annotation.runs} />
                </small>}
              </td>
            </tr>)}
          </tbody>)}
        </table>
      </div>
      if (entry.type === 'intention-table') return <div key={entry.id} className="rc-table ar-ch06-intention-table"
        data-source-block={entry.id} role="region" aria-label={language === 'ja' ? '話し合いを続ける・終える表現' : 'Ways to continue or close'} tabIndex={0}>
        <table><thead><tr><th scope="col">{language === 'ja' ? '表現' : 'Expression'}</th>
          <th scope="col">{language === 'ja' ? '伝えること' : 'What it does'}</th></tr></thead>
          <tbody>{entry.rows.map((row, index) => <tr key={index}>
            <th scope="row" lang="en"><RichText runs={row.expression} /></th>
            <td lang={language}><RichText runs={row.meaning} /></td>
          </tr>)}</tbody>
        </table>
      </div>
      return <SourceContent key={entry.id} block={entry.source} audioProps={audioProps} focusedId={focusedId} examples={false} />
    })}
  </div>
}
