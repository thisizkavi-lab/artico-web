/**
 * Artico IELTS Study Block Renderers (`artico-ielts-study-v1`)
 * Accessible, ungamified React renderers for all 16 block types.
 */

import React, { useState } from 'react'
import CurriculumIcon from '../CurriculumIcon'
import { getGlossaryTerm } from './glossary'
import { getMediaSlot } from './mediaManifest'
import { WORD_BANKS } from './wordBanks'
import { IeltsStudyDiagram } from './IeltsStudyDiagrams'
import { STUDY_UNIT_BY_ID } from './units'
import { ieltsStudyPath } from '../ieltsNavigation'

// --- StudyRichText & Glossary ---

export function GlossaryTerm({ id, children }) {
  const [open, setOpen] = useState(false)
  const item = getGlossaryTerm(id)
  if (!item) return <strong>{children}</strong>

  return (
    <span className="ies-glossary-wrap">
      <button
        type="button"
        className={`ies-glossary-trigger ${open ? 'ies-open' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        title="Click to view definition"
      >
        {children}
      </button>
      {open && (
        <span className="ies-glossary-popover" role="tooltip">
          <strong className="ies-popover-term">{item.term}</strong>
          <span className="ies-popover-def">{item.definition}</span>
          <button
            type="button"
            className="ies-popover-close"
            aria-label="Close definition"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          >
            ×
          </button>
        </span>
      )}
    </span>
  )
}

export function StudyRichText({ text }) {
  if (!text || typeof text !== 'string') return null

  // Tokenize: ==mark==, `code`, [text](url), **term**
  const pattern = /(==[^=]+==|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null

        // Highlight ==phrase==
        if (part.startsWith('==') && part.endsWith('==') && part.length >= 4) {
          return (
            <mark key={index} className="ies-mark">
              {part.slice(2, -2)}
            </mark>
          )
        }

        // Literal code `sample`
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code key={index} className="ies-literal">
              {part.slice(1, -1)}
            </code>
          )
        }

        // Link [label](target)
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const split = part.indexOf('](')
          const label = part.slice(1, split)
          const rawTarget = part.slice(split + 2, -1)

          if (rawTarget.startsWith('unit:')) {
            const targetUnitId = rawTarget.slice(5)
            const targetUnit = STUDY_UNIT_BY_ID[targetUnitId]
            const targetArea = targetUnit ? targetUnit.area : 'overview'
            return (
              <a key={index} className="ies-link ies-internal" href={`#${ieltsStudyPath(targetArea, targetUnitId)}`}>
                {label}
              </a>
            )
          }

          return (
            <a key={index} className="ies-link ies-external" href={rawTarget} target="_blank" rel="noreferrer">
              {label}
              <span className="ie-sr"> (opens official reference)</span>
            </a>
          )
        }

        // Strong / Glossary **word**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const rawContent = part.slice(2, -2).trim()
          const glossaryItem = getGlossaryTerm(rawContent)
          if (glossaryItem) {
            return (
              <GlossaryTerm key={index} id={rawContent}>
                {rawContent}
              </GlossaryTerm>
            )
          }
          return (
            <strong key={index} className="ies-strong">
              {rawContent}
            </strong>
          )
        }

        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </>
  )
}

// --- 16 Block Renderers ---

export function LeadBlock({ block }) {
  return (
    <div className="ies-lead-block">
      <p className="ies-lead-summary">
        <StudyRichText text={block.summary} />
      </p>
      <div className="ies-lead-meta">
        <div className="ies-lead-item">
          <span className="ies-lead-tag">Why it matters:</span>
          <span>
            <StudyRichText text={block.whyItMatters} />
          </span>
        </div>
        <div className="ies-lead-item">
          <span className="ies-lead-tag">What you will do:</span>
          <span>
            <StudyRichText text={block.whatYouWillDo} />
          </span>
        </div>
      </div>
    </div>
  )
}

export function SectionBlock({ block }) {
  return (
    <header className="ies-section-header" id={block.id}>
      <h3 className="ies-section-title">
        <StudyRichText text={block.title} />
      </h3>
      {block.bridge && (
        <p className="ies-section-bridge">
          <StudyRichText text={block.bridge} />
        </p>
      )}
    </header>
  )
}

export function ProseBlock({ block }) {
  return (
    <div className="ies-prose">
      {block.paragraphs.map((p, i) => (
        <p key={i}>
          <StudyRichText text={p} />
        </p>
      ))}
    </div>
  )
}

export function CalloutBlock({ block }) {
  const variant = block.variant || 'method'
  const pillLabels = {
    requirement: 'Requirement',
    method: 'Method',
    option: 'Option',
    trap: 'Trap',
  }
  const sourceUrl = block.sourceUrl || block.link?.url
  const sourceLabel = block.sourceLabel || block.link?.text || 'Check official source'

  return (
    <aside className={`ies-callout ies-callout-${variant}`} role="note">
      <div className="ies-callout-header">
        <span className={`ies-callout-pill ies-pill-${variant}`}>{pillLabels[variant]}</span>
        <strong className="ies-callout-title">{block.title}</strong>
      </div>
      <p className="ies-callout-body">
        <StudyRichText text={block.body} />
      </p>
      {sourceUrl && (
        <a className="ies-callout-source" href={sourceUrl} target="_blank" rel="noreferrer">
          {sourceLabel} →
        </a>
      )}
    </aside>
  )
}

function cleanStepCondition(raw) {
  if (!raw || typeof raw !== 'string') return ''
  return raw
    .replace(/^(?:Step|Move|Point|Rule|Pass|Stage|Phase|Pillar|Source|Condition|Gate)\s+\d+(?:\s+of\s+\d+)?\s*(?::\s*)?/i, '')
    .trim()
}

function cleanStepAction(raw) {
  if (!raw || typeof raw !== 'string') return ''
  return raw
    .replace(/^(?:\d+[.)]\s+|(?:Step|Move|Point)\s+\d+\s*:\s*)/i, '')
    .trim()
}

export function StepsBlock({ block }) {
  return (
    <div className="ies-steps">
      <h4 className="ies-steps-title">{block.title}</h4>
      <ol className="ies-steps-list">
        {block.items.map((item, i) => {
          const cond = cleanStepCondition(item.condition)
          const act = cleanStepAction(item.action)
          return (
            <li key={i} className="ies-step-item">
              {cond && (
                <span className="ies-step-condition">
                  <StudyRichText text={cond} />:{' '}
                </span>
              )}
              <span className="ies-step-action">
                <StudyRichText text={act} />
              </span>
              {item.why && (
                <small className="ies-step-why">
                  {' '}
                  (<StudyRichText text={item.why} />)
                </small>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function ComparisonTableBlock({ block }) {
  return (
    <div className="ies-table-wrap">
      <table className="ies-table">
        <caption>{block.caption}</caption>
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>
                  <StudyRichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TrackCompareBlock({ block }) {
  const acadLabel = block.academic.label || block.academic.title || ''
  const gtLabel = block.generalTraining.label || block.generalTraining.title || ''
  const gtLinkUnit = block.generalTraining.linkUnit
  const gtTargetArea = gtLinkUnit ? STUDY_UNIT_BY_ID[gtLinkUnit]?.area || 'writing' : 'writing'

  return (
    <div className="ies-track-compare">
      <h4 className="ies-track-compare-title">{block.title}</h4>
      <div className="ies-track-grid">
        <div className="ies-track-card ies-track-academic">
          <div className="ies-track-header">
            <span className="ies-badge ies-badge-academic">Academic</span>
            {acadLabel && <strong>{acadLabel}</strong>}
          </div>
          <ul>
            {block.academic.points.map((pt, i) => (
              <li key={i}>
                <StudyRichText text={pt} />
              </li>
            ))}
          </ul>
        </div>
        <div className="ies-track-card ies-track-gt">
          <div className="ies-track-header">
            <span className="ies-badge ies-badge-gt">General Training</span>
            {gtLabel && <strong>{gtLabel}</strong>}
          </div>
          <ul>
            {block.generalTraining.points.map((pt, i) => (
              <li key={i}>
                <StudyRichText text={pt} />
              </li>
            ))}
          </ul>
          {gtLinkUnit && (
            <a
              className="ies-track-gt-link"
              href={`#${ieltsStudyPath(gtTargetArea, gtLinkUnit)}`}
            >
              {block.generalTraining.linkLabel || 'Open General Training unit'} →
            </a>
          )}
        </div>
      </div>
      {block.shared && (
        <p className="ies-track-shared">
          <strong>Shared:</strong> <StudyRichText text={block.shared} />
        </p>
      )}
    </div>
  )
}

export function AnnotatedSpecimenBlock({ block }) {
  const [activeSegmentId, setActiveSegmentId] = useState(null)

  return (
    <div className={`ies-specimen ies-specimen-${block.kind || 'report'}`}>
      <div className="ies-specimen-header">
        <strong className="ies-specimen-title">{block.title}</strong>
        {block.provenance && <small className="ies-specimen-provenance">{block.provenance}</small>}
      </div>
      <div className="ies-specimen-layout">
        {/* Left Column: Highlighted Specimen Text */}
        <div className="ies-specimen-text">
          {block.segments.map((seg, idx) => {
            const segId = seg.id || String(idx + 1)
            const isActive = activeSegmentId === segId
            return (
              <span
                key={segId}
                className={`ies-specimen-span ${isActive ? 'ies-active' : ''}`}
                onMouseEnter={() => setActiveSegmentId(segId)}
                onClick={() => setActiveSegmentId(isActive ? null : segId)}
              >
                <sup className="ies-span-num">[{segId}]</sup>
                {seg.text}{' '}
              </span>
            )
          })}
        </div>

        {/* Right Column: Margin Annotations */}
        <div className="ies-specimen-margin">
          {block.segments.map((seg, idx) => {
            const segId = seg.id || String(idx + 1)
            const isActive = activeSegmentId === segId
            const labelText = seg.label ? `[${segId}] ${seg.label}` : `[${segId}]`
            return (
              <div
                key={segId}
                className={`ies-margin-card ${isActive ? 'ies-active' : ''}`}
                onMouseEnter={() => setActiveSegmentId(segId)}
                onClick={() => setActiveSegmentId(isActive ? null : segId)}
              >
                <div className="ies-margin-head">
                  <span className="ies-margin-tag">{labelText}</span>
                </div>
                <p className="ies-margin-note">
                  <StudyRichText text={seg.note} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ContrastPairBlock({ block }) {
  const weakTag = block.weak.tag || block.weak.label || 'Weak / Misleading'
  const controlledTag = block.controlled.tag || block.controlled.label || 'Controlled / Accurate'

  return (
    <div className="ies-contrast-pair">
      <h4 className="ies-contrast-title">{block.title}</h4>
      <div className="ies-contrast-grid">
        <div className="ies-contrast-card ies-contrast-weak">
          <div className="ies-contrast-header">
            <span className="ies-contrast-tag ies-tag-weak">{weakTag}</span>
          </div>
          <blockquote className="ies-contrast-text">
            <StudyRichText text={block.weak.text} />
          </blockquote>
          <p className="ies-contrast-analysis ies-analysis-weak">
            <strong>Why it fails:</strong> <StudyRichText text={block.weak.whyItFails} />
          </p>
        </div>
        <div className="ies-contrast-card ies-contrast-controlled">
          <div className="ies-contrast-header">
            <span className="ies-contrast-tag ies-tag-controlled">{controlledTag}</span>
          </div>
          <blockquote className="ies-contrast-text">
            <StudyRichText text={block.controlled.text} />
          </blockquote>
          <p className="ies-contrast-analysis ies-analysis-controlled">
            <strong>Why it works:</strong> <StudyRichText text={block.controlled.whyItWorks} />
          </p>
        </div>
      </div>
    </div>
  )
}

export function DecisionTreeBlock({ block }) {
  return (
    <div className="ies-decision-tree">
      <h4 className="ies-decision-title">{block.title}</h4>
      <div className="ies-decision-question">
        <span className="ies-decision-qtag">Decision Question:</span>
        <strong>{block.question}</strong>
      </div>
      <div className="ies-decision-branches">
        {block.branches.map((b, i) => (
          <div key={i} className="ies-branch-card">
            <div className="ies-branch-condition">
              <span className="ies-branch-label">Condition:</span>
              <StudyRichText text={b.condition} />
            </div>
            <div className="ies-branch-outcome">
              <span className="ies-branch-label">Action:</span>
              <strong><StudyRichText text={b.outcome} /></strong>
            </div>
            {b.detail && (
              <p className="ies-branch-detail">
                <StudyRichText text={b.detail} />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SvgDiagramBlock({ block }) {
  return (
    <IeltsStudyDiagram
      diagramId={block.diagramId}
      title={block.title}
      caption={block.caption}
      alt={block.alt}
    />
  )
}

export function MediaSlotBlock({ block }) {
  const slot = getMediaSlot(block.slotId)
  if (!slot) {
    return <p className="ies-error">Media slot "{block.slotId}" not registered.</p>
  }

  const isReady = slot.status === 'ready'

  return (
    <aside className="ies-media-slot" data-media-slot={slot.id} data-media-status={slot.status}>
      <div className="ies-media-header">
        <div className="ies-media-icon">
          <CurriculumIcon name={slot.id.startsWith('slot-s') ? 'microphone' : 'ear'} size={24} />
        </div>
        <div className="ies-media-info">
          <strong className="ies-media-title">{slot.title}</strong>
          <div className="ies-media-pills">
            <span className={`ies-media-badge ${isReady ? 'ies-badge-ready' : 'ies-badge-reserved'}`}>
              {isReady ? 'Audio recording available' : 'Audio script · Recording slot reserved'}
            </span>
            <span className="ies-media-pill">{slot.durationLabel}</span>
            <span className="ies-media-pill">{slot.voices}</span>
          </div>
        </div>
      </div>

      <div className="ies-media-focus">
        <strong>Teaching focus:</strong> <StudyRichText text={slot.teachingFocus} />
      </div>

      {isReady && slot.src && (
        <div className="ies-audio-player-wrap">
          <audio controls preload="none" src={import.meta.env.BASE_URL + slot.src} />
          <small className="ies-audio-caption">
            Original Artico training recording · synthetic voice, not an official test or band sample.
          </small>
        </div>
      )}

      {/* Script display: details toggle if ready; open if reserved */}
      {isReady ? (
        <details className="ies-media-details">
          <summary>View spoken script and linguistic notes</summary>
          <div className="ies-media-turns">
            {slot.script.turns.map((turn, t) => (
              <div key={t} className="ies-turn">
                <span className="ies-turn-speaker">{turn.speaker}:</span>
                <span className="ies-turn-text">
                  <StudyRichText text={turn.text} />
                </span>
                {turn.note && <span className="ies-turn-note">[{turn.note}]</span>}
              </div>
            ))}
          </div>
        </details>
      ) : (
        <div className="ies-media-turns-open">
          <div className="ies-turns-header">Annotated Spoken Script:</div>
          {slot.script.turns.map((turn, t) => (
            <div key={t} className="ies-turn">
              <span className="ies-turn-speaker">{turn.speaker}:</span>
              <span className="ies-turn-text">
                <StudyRichText text={turn.text} />
              </span>
              {turn.note && <span className="ies-turn-note">[{turn.note}]</span>}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

function getWordBankCategory(item, bankId) {
  if (item.category) return item.category
  if ((bankId === 'vocab-59-patterns' || bankId === 'vocabPatterns59') && item.meaningAndUse) {
    const m = item.meaningAndUse.toLowerCase()
    if (m.startsWith('verb')) return 'Verb'
    if (m.startsWith('adjective')) return 'Adjective'
    if (m.includes('noun')) return 'Noun'
    return 'Other'
  }
  return null
}

export function WordBankBlock({ block }) {
  const bank = WORD_BANKS[block.bankId]
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  if (!bank) {
    return <p className="ies-error">Word bank "{block.bankId}" not found.</p>
  }

  const items = bank.data || []
  const categories = Array.from(
    new Set(items.map((it) => getWordBankCategory(it, block.bankId)).filter(Boolean))
  )

  const filtered = items.filter((item) => {
    if (activeCat !== 'All' && getWordBankCategory(item, block.bankId) !== activeCat) {
      return false
    }
    if (query.trim()) {
      const text = JSON.stringify(item).toLowerCase()
      return text.includes(query.toLowerCase())
    }
    return true
  })

  return (
    <div className="ies-word-bank">
      <div className="ies-bank-header">
        <div>
          <h4 className="ies-bank-title">{block.title || bank.title}</h4>
          {block.instructions && <p className="ies-bank-instructions">{block.instructions}</p>}
        </div>
        <div className="ies-bank-search">
          <input
            type="search"
            placeholder="Search entries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter word bank entries"
          />
        </div>
      </div>

      {categories.length > 1 && (
        <div className="ies-filter-pills" role="group" aria-label="Filter entries by category">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ies-filter-pill ${activeCat === cat ? 'ies-active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="ies-bank-count">
        Showing {filtered.length} of {items.length} entries
      </div>

      <div className="ies-bank-entries">
        {filtered.map((item, idx) => (
          <div key={idx} className="ies-bank-card">
            {item.no && <span className="ies-bank-num">#{item.no}</span>}
            <div className="ies-bank-card-content">
              {item.concept && (
                <strong className="ies-bank-headword">{item.concept}</strong>
              )}
              {item.item && (
                <strong className="ies-bank-headword">{item.item}</strong>
              )}
              {item.phrase && (
                <strong className="ies-bank-headword">{item.phrase}</strong>
              )}
              {item.expression && (
                <strong className="ies-bank-headword">{item.expression}</strong>
              )}
              {item.problem && (
                <strong className="ies-bank-headword ies-problem">{item.problem}</strong>
              )}
              {item.claim && (
                <strong className="ies-bank-headword ies-claim">"{item.claim}"</strong>
              )}
              {item.title && item.url && (
                <a className="ies-bank-headword ies-link" href={item.url} target="_blank" rel="noreferrer">
                  {item.title} ↗
                </a>
              )}

              {item.notes && <p className="ies-bank-desc"><StudyRichText text={item.notes} /></p>}
              {item.meaningAndUse && (
                <p className="ies-bank-desc"><StudyRichText text={item.meaningAndUse} /></p>
              )}
              {item.example && (
                <blockquote className="ies-bank-example"><StudyRichText text={item.example} /></blockquote>
              )}
              {item.check && <p className="ies-bank-desc"><StudyRichText text={item.check} /></p>}
              {item.meaning && <p className="ies-bank-desc"><StudyRichText text={item.meaning} /></p>}
              {item.note && <p className="ies-bank-subnote"><StudyRichText text={item.note} /></p>}
              {item.use && <p className="ies-bank-desc"><StudyRichText text={item.use} /></p>}
              {item.decision && <p className="ies-bank-desc ies-decision"><StudyRichText text={item.decision} /></p>}
              {item.reality && <p className="ies-bank-desc ies-reality"><StudyRichText text={item.reality} /></p>}
              {item.description && <p className="ies-bank-desc"><StudyRichText text={item.description} /></p>}
            </div>
          </div>
        ))}
      </div>

      {bank.notes && (
        <div className="ies-bank-footnotes">
          {bank.notes.informalNote && <p>{bank.notes.informalNote}</p>}
          {bank.notes.slangNote && <p>{bank.notes.slangNote}</p>}
        </div>
      )}
    </div>
  )
}

export function MythBusterBlock({ block }) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const showFilter = Boolean(block.filterable || block.items.length >= 10)
  const categories = Array.from(new Set(block.items.map((it) => it.category).filter(Boolean)))

  const filteredItems = showFilter
    ? block.items.filter((item) => {
        if (activeCat !== 'All' && item.category !== activeCat) return false
        if (query.trim()) {
          const q = query.toLowerCase()
          return (
            item.claim.toLowerCase().includes(q) ||
            item.reality.toLowerCase().includes(q) ||
            (item.category && item.category.toLowerCase().includes(q))
          )
        }
        return true
      })
    : block.items

  return (
    <div className="ies-myth-buster">
      <div className="ies-myth-header">
        <h4 className="ies-myth-title">{block.title}</h4>
        {showFilter && (
          <div className="ies-bank-search">
            <input
              type="search"
              placeholder="Filter claims…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter common claims"
            />
          </div>
        )}
      </div>

      {showFilter && categories.length > 1 && (
        <div className="ies-filter-pills" role="group" aria-label="Filter claims by skill">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ies-filter-pill ${activeCat === cat ? 'ies-active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {showFilter && (
        <div className="ies-bank-count">
          Showing {filteredItems.length} of {block.items.length} claims
        </div>
      )}

      <div className="ies-myth-list">
        {filteredItems.map((item, i) => (
          <div key={i} className="ies-myth-card">
            <div className="ies-myth-row">
              <span className="ies-myth-badge">Common Claim</span>
              {item.category && <span className="ies-myth-cat">{item.category}</span>}
              <strong className="ies-myth-claim">"{item.claim}"</strong>
            </div>
            <div className="ies-reality-row">
              <span className="ies-reality-badge">Working Reality</span>
              <p className="ies-reality-text">
                <StudyRichText text={item.reality} />
              </p>
            </div>
            {item.takeaway && (
              <div className="ies-takeaway-row">
                <span className="ies-takeaway-badge">Action</span>
                <p className="ies-takeaway-text">
                  <StudyRichText text={item.takeaway} />
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DiagnosticCheckBlock({ block }) {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <div className="ies-diagnostic-check">
      <div className="ies-diag-header">
        <span className="ies-diag-pill">Check the distinction</span>
        <strong className="ies-diag-title">{block.title}</strong>
      </div>
      <p className="ies-diag-prompt">
        <StudyRichText text={block.prompt} />
      </p>

      <div className="ies-diag-options">
        {block.options.map((opt, i) => {
          const isSelected = selectedIndex === i
          return (
            <button
              key={i}
              type="button"
              className={`ies-diag-option ${isSelected ? 'ies-selected' : ''}`}
              onClick={() => setSelectedIndex(i)}
            >
              <span className="ies-opt-label">{opt.label || opt.text}</span>
            </button>
          )
        })}
      </div>

      {selectedIndex !== null && (
        <div
          className={`ies-diag-feedback ${
            block.options[selectedIndex].correct ? 'ies-feedback-correct' : 'ies-feedback-incorrect'
          }`}
        >
          <strong className="ies-feedback-status">
            {block.options[selectedIndex].correct
              ? 'Correct — supported by the rule'
              : 'Not supported — check the distinction'}
          </strong>
          <p className="ies-feedback-rationale">
            <StudyRichText text={block.options[selectedIndex].rationale} />
          </p>
        </div>
      )}
    </div>
  )
}

export function SelfCheckBlock({ block }) {
  return (
    <div className="ies-self-check">
      <h4 className="ies-check-title">{block.title}</h4>
      <ul className="ies-check-list">
        {block.items.map((item, i) => (
          <li key={i} className="ies-check-item">
            <span className="ies-check-bullet" aria-hidden="true">✓</span>
            <span><StudyRichText text={item} /></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WorkbookPromptBlock({ block, store }) {
  const noteId = block.noteId
  const value = store?.state?.notes?.[noteId] ?? ''

  return (
    <div className="ies-workbook-prompt">
      <label htmlFor={`ies-note-${noteId}`} className="ies-wb-label">
        {block.label}
      </label>
      <textarea
        id={`ies-note-${noteId}`}
        rows={block.rows || 3}
        maxLength={12000}
        value={value}
        placeholder={block.placeholder || 'Record your note here…'}
        onChange={(e) => {
          const val = e.target.value
          store?.change?.((prev) => ({
            ...prev,
            notes: { ...prev.notes, [noteId]: val },
          }))
        }}
      />
    </div>
  )
}

// Master Block Dispatcher
export function StudyBlock({ block, store }) {
  if (!block || !block.type) return null

  switch (block.type) {
    case 'lead':
      return <LeadBlock block={block} />
    case 'section':
      return <SectionBlock block={block} />
    case 'prose':
      return <ProseBlock block={block} />
    case 'callout':
      return <CalloutBlock block={block} />
    case 'steps':
      return <StepsBlock block={block} />
    case 'comparisonTable':
      return <ComparisonTableBlock block={block} />
    case 'trackCompare':
      return <TrackCompareBlock block={block} />
    case 'annotatedSpecimen':
      return <AnnotatedSpecimenBlock block={block} />
    case 'contrastPair':
      return <ContrastPairBlock block={block} />
    case 'decisionTree':
      return <DecisionTreeBlock block={block} />
    case 'svgDiagram':
      return <SvgDiagramBlock block={block} />
    case 'mediaSlot':
      return <MediaSlotBlock block={block} />
    case 'wordBank':
      return <WordBankBlock block={block} />
    case 'mythBuster':
      return <MythBusterBlock block={block} />
    case 'diagnosticCheck':
      return <DiagnosticCheckBlock block={block} />
    case 'selfCheck':
      return <SelfCheckBlock block={block} />
    case 'workbookPrompt':
      return <WorkbookPromptBlock block={block} store={store} />
    default:
      return null
  }
}
