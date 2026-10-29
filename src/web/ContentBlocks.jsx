import './readable-course.css'
import { useLanguage } from './Language'
import ReferencePhraseShelf from './ReferencePhraseShelf'
const plain = (runs) => runs.map((run) => run.text).join('')
export function RichText({ runs = [] }) {
  return runs.map((run, index) =>
    run.emphasis ? (
      <strong key={index} lang={/[a-z]/i.test(run.text) && !/[\u3040-\u30ff\u3400-\u9fff]/.test(run.text) ? 'en' : undefined}>{run.text}</strong>
    ) : run.italic ? (
      <em key={index}>{run.text}</em>
    ) : run.href && /^https:\/\//.test(run.href) ? (
      <a key={index} href={run.href} target="_blank" rel="noreferrer">
        {run.text}
      </a>
    ) : (
      <span key={index}>{run.text}</span>
    ),
  )
}

export function SourceContent({ block, audioProps, focusedId, examples = true }) {
  const { t, language } = useLanguage()
  let content
  const phraseTable =
    examples &&
    block.type === 'table' &&
    block.phraseIds?.length > 0 &&
    block.phraseCells?.every((row) => row.some((id) => id && block.phraseIds.includes(id)))
  if (phraseTable)
    content = (
      <>
        <p className="ip-kicker">{block.header.map(plain).join(' · ')}</p>
        <ReferencePhraseShelf ids={block.phraseIds} byId={audioProps.byId} audioProps={audioProps} focusedId={focusedId} title={block.header.map(plain).join(' · ')} />
        <details className="ar-reference-source-table">
          <summary>{language === 'ja' ? '元の表を表示' : 'View the full reference table'}</summary>
          <div className="rc-table" role="region" aria-label={block.header.map(plain).join(' / ')} tabIndex={0}>
            <table>
              <thead><tr>{block.header.map((cell, i) => <th scope="col" key={i}><RichText runs={cell} /></th>)}</tr></thead>
              <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell,j) => j===0
                ? <th scope="row" key={j}><RichText runs={cell} /></th>
                : <td key={j}><RichText runs={cell} /></td>)}</tr>)}</tbody>
            </table>
          </div>
        </details>
      </>
    )
  else if (block.type === 'table')
    content = (
      <div
        className="rc-table"
        role="region"
        aria-label={block.header.map(plain).join(' / ')}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              {block.header.map((cell, i) => (
                <th scope="col" key={i}>
                  <RichText runs={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th scope="row" key={j}>
                      <RichText runs={cell} />
                    </th>
                  ) : (
                    <td key={j}>
                      <RichText runs={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  else if (block.type === 'conversation')
    content = (
      <div className="rc-sample-conversation">
        {block.turns.map((turn) => (
          <p key={turn.id}>
            <span className="ip-speaker">{turn.speaker}</span>
            <br />
            {turn.en}
          </p>
        ))}
      </div>
    )
  else if (block.items) {
    const List = block.ordered ? 'ol' : 'ul'
    content = (
      <List className="rc-list">
        {block.items.map((item, i) => (
          <li key={i}>
            <RichText runs={item.runs} />
          </li>
        ))}
      </List>
    )
  } else if (block.paragraphs)
    content = (
      <div className={`rc-example ${block.type === 'email' ? 'rc-email' : ''}`}>
        {block.type === 'email' && <span className="ip-kicker">{t("EXAMPLE EMAIL")}</span>}
        {block.paragraphs.map((runs, i) => (
          <p key={i}>
            <RichText runs={runs} />
          </p>
        ))}
      </div>
    )
  else if (block.type === 'answerHeading')
    content = (
      <h3 className="ip-small-heading">
        <RichText runs={block.runs} />
      </h3>
    )
  else if (!examples && block.runs?.length === 1 && block.runs[0].emphasis && /[a-z]/i.test(block.runs[0].text) && !/[\u3040-\u30ff\u3400-\u9fff]/.test(block.runs[0].text))
    content = <article className="ip-phrase"><p className="ip-phrase-text" lang="en">{block.runs[0].text}</p></article>
  else if (block.runs?.length === 1 && block.runs[0].emphasis && !/[.!?]/.test(block.runs[0].text))
    content = (
      <h3 className="ip-small-heading">
        <RichText runs={block.runs} />
      </h3>
    )
  else
    content = block.runs?.length ? (
      <p className="ip-prose">
        <RichText runs={block.runs} />
      </p>
    ) : null
  return (
    <div className="rc-source" data-source-block={block.id}>
      {content}
      {examples && !phraseTable && block.phraseIds?.length > 0 && (
        <ReferencePhraseShelf ids={block.phraseIds} byId={audioProps.byId} audioProps={audioProps} focusedId={focusedId} />
      )}
    </div>
  )
}
