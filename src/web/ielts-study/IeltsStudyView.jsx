/**
 * Artico IELTS Study View Component (`artico-ielts-study-v1`)
 * Renders:
 * - Screen A: 5-Module Study Manual Index (#/application/tests/ielts/home/study)
 * - Screen B: Two-Column Skill Study Reader (#/application/tests/ielts/<area>/study?unit=<unitId>)
 */

import React, { useState, useEffect } from 'react'
import CurriculumIcon from '../CurriculumIcon'
import {
  MODULE_METADATA,
  ALL_STUDY_UNITS,
  STUDY_UNIT_BY_ID,
  getUnitsForArea,
  getDefaultUnitForArea,
  getNextUnit,
  getPrevUnit,
} from './units'
import { StudyBlock } from './IeltsStudyBlocks'
import { ieltsStudyPath, ieltsPath } from '../ieltsNavigation'
import './ielts-study.css'

export function StudyHome({ store }) {
  const lastUnitId = store?.state?.notes?.['study-last-unit']
  const lastUnit = lastUnitId ? STUDY_UNIT_BY_ID[lastUnitId] : null
  const lastMod = lastUnit ? MODULE_METADATA.find((m) => m.id === lastUnit.area) : null

  return (
    <div className="ies-home">
      <header className="ies-home-masthead">
        <h1>IELTS Academic</h1>
        <p className="ies-home-lead">
          A technical study manual for IELTS Academic, with General Training differences marked side by side. Read in
          order or open the exact skill you need.
        </p>
        <div className="ies-track-legend" role="note" aria-label="Track designations">
          <span className="ies-legend-item">
            <span className="ies-badge ies-badge-academic">Academic</span> Primary track
          </span>
          <span className="ies-legend-item">
            <span className="ies-badge ies-badge-shared">Shared</span> Both Academic &amp; General Training
          </span>
          <span className="ies-legend-item">
            <span className="ies-badge ies-badge-gt">[GT]</span> Separated General Training sections
          </span>
        </div>

        <div className="ies-orientation-bar" role="region" aria-label="Manual orientation">
          <div>
            <strong>New to this manual?</strong> Learn how{' '}
            <span className="ies-inline-pill ies-pill-requirement">Requirement</span>,{' '}
            <span className="ies-inline-pill ies-pill-method">Method</span>, and{' '}
            <span className="ies-inline-pill ies-pill-option">Option</span> labels distinguish official test rules from
            coaching procedures.
          </div>
          <a className="ies-orientation-link" href={`#${ieltsStudyPath('overview', 'ov-how-to-read')}`}>
            Start here: How this manual works →
          </a>
        </div>
      </header>

      {lastUnit && (
        <aside className="ies-bookmark-bar" aria-label="Last opened study unit">
          <span>
            <strong>Last opened:</strong> {lastMod ? `${lastMod.title} · ` : ''}
            {lastUnit.title}
          </span>
          <a className="ies-bookmark-link" href={`#${ieltsStudyPath(lastUnit.area, lastUnit.id)}`}>
            Continue reading →
          </a>
        </aside>
      )}

      <div className="ies-module-spine" aria-label="Five study modules">
        {MODULE_METADATA.map((mod) => {
          const modUnits = getUnitsForArea(mod.id)
          const firstUnit = modUnits[0]

          return (
            <section key={mod.id} className="ies-module-card" aria-labelledby={`ies-mod-${mod.id}`}>
              <div className="ies-module-card-head">
                <div>
                  <span className="ies-mod-num">MODULE {mod.num}</span>
                  <div className="ies-mod-title-group">
                    <CurriculumIcon name={mod.icon} size={24} />
                    <h2 id={`ies-mod-${mod.id}`} className="ies-mod-title">
                      {mod.title}
                    </h2>
                  </div>
                </div>
                <div className="ies-mod-head-actions">
                  <span className="ies-mod-fact">{mod.fact}</span>
                  {firstUnit && (
                    <a className="ies-mod-start" href={`#${ieltsStudyPath(mod.id, firstUnit.id)}`}>
                      Start module →
                    </a>
                  )}
                </div>
              </div>

              <p className="ies-mod-scope">{mod.scope}</p>

              <div className="ies-mod-parts">
                {mod.parts.map((part) => {
                  // Find first unit belonging to this part
                  const partUnit = modUnits.find((u) => u.partId === part.id) || firstUnit
                  const linkHref = partUnit
                    ? `#${ieltsStudyPath(mod.id, partUnit.id)}`
                    : `#${ieltsStudyPath(mod.id)}`

                  return (
                    <a key={part.id} className="ies-part-link" href={linkHref}>
                      <span>
                        {part.isGt && <span className="ies-badge ies-badge-gt" style={{ marginRight: '6px' }}>GT</span>}
                        {part.title}
                      </span>
                      <span className="ies-part-count">{part.count} units →</span>
                    </a>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <div className="ies-home-footer-note">
        <strong>Ready to test an operation under a clock?</strong> Switch to{' '}
        <a href={`#${ieltsPath('home', 'practice')}`}>Practice mode</a> above for guided sets, skill rehearsals, and
        workbooks.
      </div>
    </div>
  )
}

export function StudyReader({ area, unitId, store }) {
  const modMeta = MODULE_METADATA.find((m) => m.id === area) || MODULE_METADATA[0]
  const areaUnits = getUnitsForArea(area)
  const currentUnit = (unitId && STUDY_UNIT_BY_ID[unitId]) || areaUnits[0] || null

  const [filterQuery, setFilterQuery] = useState('')

  // Persist last-read unit in store notes
  useEffect(() => {
    if (currentUnit && store?.change) {
      store.change((prev) => ({
        ...prev,
        notes: {
          ...prev.notes,
          'study-last-unit': currentUnit.id,
        },
      }))
    }
  }, [currentUnit?.id, store])

  const filteredUnits = filterQuery.trim()
    ? areaUnits.filter((u) => u.title.toLowerCase().includes(filterQuery.toLowerCase()))
    : areaUnits

  const prevUnit = currentUnit ? getPrevUnit(currentUnit.id) : null
  const nextUnit = currentUnit ? getNextUnit(currentUnit.id) : null
  const unitIndex = currentUnit ? areaUnits.findIndex((u) => u.id === currentUnit.id) : -1
  const isLastInModule = unitIndex >= 0 && unitIndex === areaUnits.length - 1

  const isRead = currentUnit ? Boolean(store?.state?.notes?.[`study-read-${currentUnit.id}`]) : false

  const renderTocParts = () =>
    modMeta.parts.map((part) => {
      const partUnits = filteredUnits.filter((u) => u.partId === part.id)
      if (partUnits.length === 0 && filterQuery.trim()) return null

      return (
        <div key={part.id} className={`ies-toc-part ${part.isGt ? 'ies-toc-part-gt' : ''}`}>
          <div className="ies-toc-part-title">
            {part.isGt && <span className="ies-badge ies-badge-gt" style={{ marginRight: '4px' }}>GT</span>}
            {part.title}
          </div>
          <ul className="ies-toc-list">
            {partUnits.map((u) => {
              const isActive = currentUnit && currentUnit.id === u.id
              const unitRead = Boolean(store?.state?.notes?.[`study-read-${u.id}`])

              return (
                <li key={u.id} className={`ies-toc-item ${isActive ? 'ies-active' : ''}`}>
                  <a
                    href={`#${ieltsStudyPath(area, u.id)}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{u.title}</span>
                    {unitRead && (
                      <span className="ies-toc-read-mark" title="Marked read" aria-label="Marked read">
                        ✓
                      </span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })

  return (
    <div className="ies-reader">
      <header className="ies-reader-header">
        <div className="ies-reader-module-title">
          <CurriculumIcon name={modMeta.icon} size={28} />
          <h1>{modMeta.title}</h1>
        </div>
        <div className="ie-facts">
          <span>{modMeta.fact}</span>
        </div>
      </header>

      {/* Mobile / Narrow-Tablet Compact Contents Drawer (< 880px) */}
      {currentUnit && (
        <details className="ies-mobile-toc">
          <summary>
            Contents · Unit {unitIndex + 1} of {areaUnits.length}: {currentUnit.title}
          </summary>
          <div className="ies-mobile-toc-body">{renderTocParts()}</div>
        </details>
      )}

      <div className="ies-reader-grid">
        {/* Left Column: Outline Table of Contents */}
        <nav className="ies-outline" aria-label={`${modMeta.title} study units`}>
          <div className="ies-outline-head">Module Contents</div>

          {areaUnits.length >= 8 && (
            <input
              type="search"
              className="ies-toc-filter"
              placeholder="Filter units…"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              aria-label="Filter units in this module"
            />
          )}

          {renderTocParts()}
        </nav>

        {/* Right Column: Main Unit Article */}
        <main className="ies-main-content">
          {currentUnit ? (
            <article className="ies-article" aria-labelledby={`ies-unit-h2-${currentUnit.id}`}>
              <header className="ies-unit-header">
                <div className="ies-unit-kicker">
                  <span>
                    Unit {unitIndex + 1} of {areaUnits.length}
                  </span>
                  <span>·</span>
                  <span>{currentUnit.partTitle}</span>
                  <span>·</span>
                  <span>~{currentUnit.minutes} min study</span>
                  <span>·</span>
                  <span
                    className={`ies-badge ${
                      currentUnit.track === 'gt'
                        ? 'ies-badge-gt'
                        : currentUnit.track === 'shared'
                        ? 'ies-badge-shared'
                        : 'ies-badge-academic'
                    }`}
                  >
                    {currentUnit.track === 'gt'
                      ? 'General Training'
                      : currentUnit.track === 'shared'
                      ? 'Shared'
                      : 'Academic'}
                  </span>
                </div>

                {currentUnit.track === 'gt' && (
                  <div className="ies-gt-banner" role="region" aria-label="General Training track distinction">
                    <strong>General Training Track.</strong> This unit covers General Training tasks.{' '}
                    {area === 'writing' && (
                      <a href={`#${ieltsStudyPath('writing', 'w-a1-reporting-principle-and-jobs')}`}>
                        Preparing for IELTS Academic? Go to Academic Task 1: Reporting Visuals →
                      </a>
                    )}
                    {area === 'reading' && (
                      <a href={`#${ieltsStudyPath('reading', 'r-task-and-five-operations')}`}>
                        Preparing for IELTS Academic? Go to Academic Reading Operations →
                      </a>
                    )}
                  </div>
                )}

                <h2 id={`ies-unit-h2-${currentUnit.id}`} className="ies-unit-title">
                  {currentUnit.title}
                </h2>

                <div className="ies-unit-provenance">
                  Covers source section{currentUnit.sourceSections.length > 1 ? 's' : ''}{' '}
                  {currentUnit.sourceSections.join(', ')}
                </div>
              </header>

              <div className="ies-unit-blocks">
                {currentUnit.blocks.map((block, idx) => (
                  <StudyBlock key={idx} block={block} store={store} />
                ))}
              </div>

              <footer className="ies-unit-footer">
                <label className="ies-unit-read-toggle">
                  <input
                    type="checkbox"
                    checked={isRead}
                    onChange={(e) => {
                      const checked = e.target.checked
                      store?.change?.((prev) => ({
                        ...prev,
                        notes: {
                          ...prev.notes,
                          [`study-read-${currentUnit.id}`]: checked ? 'true' : '',
                        },
                      }))
                    }}
                  />
                  <span>Mark unit as read</span>
                </label>

                <div className="ies-nav-cards">
                  {prevUnit ? (
                    <a className="ies-nav-card ies-nav-card-prev" href={`#${ieltsStudyPath(prevUnit.area, prevUnit.id)}`}>
                      <span className="ies-nav-card-label">← Previous Unit</span>
                      <span className="ies-nav-card-title">{prevUnit.title}</span>
                    </a>
                  ) : (
                    <div />
                  )}

                  {nextUnit ? (
                    <a className="ies-nav-card ies-nav-card-next" href={`#${ieltsStudyPath(nextUnit.area, nextUnit.id)}`}>
                      <span className="ies-nav-card-label">
                        {nextUnit.area !== area ? 'Next Module →' : 'Next Unit →'}
                      </span>
                      <span className="ies-nav-card-title">{nextUnit.title}</span>
                    </a>
                  ) : (
                    <a className="ies-nav-card ies-nav-card-next" href={`#${ieltsPath(area, 'practice')}`}>
                      <span className="ies-nav-card-label">End of Manual →</span>
                      <span className="ies-nav-card-title">Practise {modMeta.title}</span>
                    </a>
                  )}
                </div>

                {isLastInModule && area !== 'overview' && nextUnit && (
                  <div className="ies-module-practice-bridge">
                    <span>Finished reading {modMeta.title}?</span>
                    <a href={`#${ieltsPath(area, 'practice')}`}>Practise {modMeta.title} under timed conditions →</a>
                  </div>
                )}
              </footer>
            </article>
          ) : (
            <article className="ies-article">
              <header className="ies-unit-header">
                <h2 className="ies-unit-title">{modMeta.title} Study Units</h2>
                <p className="ies-lead-summary">{modMeta.scope}</p>
              </header>
              <div className="ies-prose">
                <p>
                  This module contains {modMeta.parts.reduce((sum, p) => sum + p.count, 0)} units structured across{' '}
                  {modMeta.parts.length} parts. Select any authored unit from the left outline to begin reading.
                </p>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  )
}

export default function IeltsStudyView({ route, store }) {
  if (route.area === 'home') {
    return <StudyHome store={store} />
  }

  return <StudyReader area={route.area} unitId={route.unit} store={store} />
}
