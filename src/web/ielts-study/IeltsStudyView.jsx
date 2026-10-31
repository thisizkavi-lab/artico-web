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
  STUDY_UNIT_BY_ID,
  getUnitsForArea,
  getNextUnit,
  getPrevUnit,
} from './units'
import { StudyBlock } from './IeltsStudyBlocks'
import { ieltsStudyPath, ieltsPath } from '../ieltsNavigation'
import './ielts-study.css'

const partLabel = (title) => title.replace(/^Part [\d.]+ · /, '').replace('[GT] ', '')

export function StudyHome({ store, toolbar }) {
  const lastUnit = STUDY_UNIT_BY_ID[store?.state?.notes?.['study-last-unit']]
  return (
    <div className="ies-home">
      <header className="ies-home-masthead">
        <span className="ies-eyebrow">English tests / Study course</span>
        <h1><CurriculumIcon name="book" size={32} />IELTS Academic</h1>
        <p className="ies-home-lead">Understand the test. Learn each skill. Put it into practice.</p>
      </header>
      {toolbar}
      <section className="ies-start" aria-label="Start here">
        <div>
          <span className="ies-eyebrow">Start here</span>
          <h2>A clear path through IELTS.</h2>
          <p>Begin with the test format and scoring. Then work through Listening, Reading, Writing, and Speaking. Each lesson connects an explanation to examples, common errors, and a check of your understanding.</p>
          <a className="ies-start-link" href={`#${ieltsStudyPath('overview', 'ov-how-to-read')}`}>How this course works <span aria-hidden="true">→</span></a>
        </div>
        <aside className="ies-course-note">
          <strong>Study, then practise</strong>
          <p>Use Study to understand a method. Switch to Practice within each skill to try it.</p>
          <p>Academic is the main track. Shared lessons apply to both tests. General Training differences are marked separately.</p>
        </aside>
      </section>
      {lastUnit && <aside className="ies-bookmark-bar" aria-label="Last opened study unit">
        <span><strong>Continue reading</strong><br />{lastUnit.title}</span>
        <a href={`#${ieltsStudyPath(lastUnit.area, lastUnit.id)}`}>Open lesson →</a>
      </aside>}
      <div className="ies-index-heading"><h2>Your course</h2><span>5 sections · 85 lessons</span></div>
      <div className="ies-module-spine" aria-label="Five study modules">
        {MODULE_METADATA.map((mod) => {
          const units = getUnitsForArea(mod.id)
          return <section key={mod.id} className={`ies-module-card ies-module-${mod.id}`} aria-labelledby={`ies-mod-${mod.id}`}>
            <div className="ies-module-card-head">
              <div className="ies-mod-title-group">
                <CurriculumIcon name={mod.icon} size={25} />
                <h2 id={`ies-mod-${mod.id}`}><a href={`#${ieltsStudyPath(mod.id, units[0].id)}`}>{mod.title}</a></h2>
              </div>
              <span className="ies-mod-num">{mod.num}</span>
            </div>
            <p className="ies-mod-scope">{mod.scope}</p>
            <div className="ies-mod-parts">
              {mod.parts.map((part) => <a key={part.id} className="ies-part-link" href={`#${ieltsStudyPath(mod.id, units.find(u => u.partId === part.id)?.id)}`}>
                <span>{part.isGt && <span className="ies-badge ies-badge-gt">GT</span>} {partLabel(part.title)}</span>
                <span className="ies-part-count">{part.count}<span className="ies-sr-only"> lessons</span> →</span>
              </a>)}
            </div>
            <a className="ies-mod-start" href={`#${ieltsStudyPath(mod.id, units[0].id)}`}>Open {mod.id === 'overview' ? 'introduction' : mod.title.toLowerCase()} →</a>
          </section>
        })}
      </div>
      <p className="ies-home-footer-note">Ready to use what you have learned? <a href={`#${ieltsPath('home', 'practice')}`}>Explore practice →</a></p>
    </div>
  )
}

export function StudyReader({ area, unitId, store, toolbar }) {
  const modMeta = MODULE_METADATA.find((m) => m.id === area) || MODULE_METADATA[0]
  const areaUnits = getUnitsForArea(area)
  const requestedUnit = unitId && STUDY_UNIT_BY_ID[unitId]
  const currentUnit = (requestedUnit?.area === area ? requestedUnit : null) || areaUnits[0] || null

  const [filterQuery, setFilterQuery] = useState('')
  const [contentsOpen, setContentsOpen] = useState(false)
  useEffect(() => { setFilterQuery(''); setContentsOpen(false) }, [currentUnit?.id])

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
  }, [currentUnit?.id, store?.change])

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
            {partLabel(part.title)}
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
        <span className="ies-eyebrow">IELTS / Section {modMeta.num}</span>
        <div className="ies-reader-module-title">
          <CurriculumIcon name={modMeta.icon} size={32} />
          <h1>{modMeta.title}</h1>
        </div>
        <p className="ies-reader-scope">{modMeta.scope}</p>
      </header>
      {toolbar}
      <details className="ies-contents" open={contentsOpen} onToggle={(event) => setContentsOpen(event.currentTarget.open)}>
        <summary><span>Lessons in {modMeta.title === 'Everything about IELTS' ? 'this section' : modMeta.title}</span><span>{unitIndex + 1} / {areaUnits.length}</span></summary>
        <nav aria-label={`${modMeta.title} study units`}>
          <label className="ies-filter-label">Find a lesson
            <input type="search" className="ies-toc-filter" placeholder="Search lesson titles…" value={filterQuery} onChange={event => setFilterQuery(event.target.value)} />
          </label>
          {filteredUnits.length ? <div className="ies-contents-parts">{renderTocParts()}</div> : <p role="status">No lessons match “{filterQuery}”. Try another word.</p>}
        </nav>
      </details>
      <div className="ies-reader-grid">
        <div className="ies-main-content">
          {currentUnit ? (
            <article className="ies-article" aria-labelledby={`ies-unit-h2-${currentUnit.id}`}>
              <header className="ies-unit-header">
                <div className="ies-unit-kicker">
                  <span>
                    Lesson {unitIndex + 1} of {areaUnits.length}
                  </span>
                  <span>·</span>
                  <span>{partLabel(currentUnit.partTitle)}</span>
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

              </header>

              <div className="ies-unit-blocks">
                {currentUnit.blocks.map((block, idx) => (
                  <StudyBlock key={`${currentUnit.id}-${idx}`} block={block} store={store} />
                ))}
              </div>

              <footer className="ies-unit-footer">
                <div className="ies-unit-provenance">
                  Covers source section{currentUnit.sourceSections.length > 1 ? 's' : ''}{' '}
                  {currentUnit.sourceSections.join(', ')}
                </div>

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
                  <span>Mark lesson as read</span>
                </label>

                <div className="ies-nav-cards">
                  {prevUnit ? (
                    <a className="ies-nav-card ies-nav-card-prev" href={`#${ieltsStudyPath(prevUnit.area, prevUnit.id)}`}>
                      <span className="ies-nav-card-label">← Previous lesson</span>
                      <span className="ies-nav-card-title">{prevUnit.title}</span>
                    </a>
                  ) : (
                    <div />
                  )}

                  {nextUnit ? (
                    <a className="ies-nav-card ies-nav-card-next" href={`#${ieltsStudyPath(nextUnit.area, nextUnit.id)}`}>
                      <span className="ies-nav-card-label">
                        {nextUnit.area !== area ? 'Next section →' : 'Next lesson →'}
                      </span>
                      <span className="ies-nav-card-title">{nextUnit.title}</span>
                    </a>
                  ) : (
                    <a className="ies-nav-card ies-nav-card-next" href={`#${ieltsPath(area, 'practice')}`}>
                      <span className="ies-nav-card-label">End of course →</span>
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
        </div>
      </div>
    </div>
  )
}

export default function IeltsStudyView({ route, store, toolbar }) {
  if (route.area === 'home') {
    return <StudyHome store={store} toolbar={toolbar} />
  }

  return <StudyReader area={route.area} unitId={route.unit} store={store} toolbar={toolbar} />
}
