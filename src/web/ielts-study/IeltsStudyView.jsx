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


/* The Study landing screen follows the clarity and restrained color of Greetings. */
export function StudyHome({ store }) {
  const lastUnitId = store?.state?.notes?.['study-last-unit']
  const lastUnit = lastUnitId && lastUnitId !== 'ov-how-to-read' ? STUDY_UNIT_BY_ID[lastUnitId] : null
  const skills = MODULE_METADATA.filter((mod) => mod.id !== 'overview')
  const descriptions = {
    listening: 'Hear the answer and notice what changes.',
    reading: 'Find evidence and understand the question types.',
    writing: 'Study examples, then write with clarity.',
    speaking: 'Learn the interview, then practise aloud.',
  }

  return <div className="ies-home ies-simple-home">
    <header className="ies-simple-intro">
      <span className="ies-simple-eyebrow">ARTICO · EXAM PREPARATION</span>
      <h1>IELTS Academic</h1>
      <p>Understand the exam. Learn each skill. Practise when you are ready.</p>
      {lastUnit && <a className="ies-resume-link" href={'#' + ieltsStudyPath(lastUnit.area, lastUnit.id)}>
        <span>Continue: {lastUnit.title}</span><span aria-hidden="true">→</span>
      </a>}
    </header>

    <section className="ies-simple-overview" aria-labelledby="ies-start-heading">
      <div className="ies-overview-mark"><CurriculumIcon name="compass" size={28}/></div>
      <div className="ies-overview-copy">
        <span className="ies-simple-eyebrow">START HERE</span>
        <h2 id="ies-start-heading">Everything about IELTS</h2>
        <p>What IELTS is, Academic and General Training, the format, band scores, and what to expect on test day.</p>
        <a className="ies-simple-action" href={'#' + ieltsStudyPath('overview','ov-what-ielts-measures')}>Explore IELTS <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section className="ies-simple-group" aria-labelledby="ies-skills-heading">
      <div className="ies-simple-group-head"><h2 id="ies-skills-heading">The four skills</h2>
        <p>Choose any skill. Each has Study lessons and separate Practice exercises.</p></div>
      <div className="ies-skill-grid">
        {skills.map((mod, index) => <a key={mod.id} className={'ies-skill-card ies-skill-' + mod.id} href={'#' + ieltsStudyPath(mod.id)}>
          <span className="ies-skill-icon"><CurriculumIcon name={mod.icon} size={26}/></span>
          <span className="ies-skill-number">0{index + 1}</span>
          <strong>{mod.title}</strong>
          <span className="ies-skill-description">{descriptions[mod.id]}</span>
          <span className="ies-skill-link">Study lessons <span aria-hidden="true">→</span></span>
        </a>)}
      </div>
    </section>

    <section className="ies-simple-group" aria-labelledby="ies-mock-heading">
      <div className="ies-simple-group-head"><h2 id="ies-mock-heading">Mock tests</h2>
        <p>Learn with help first. Test yourself without help later.</p></div>
      <div className="ies-mock-grid">
        <a className="ies-mock-tile" href={'#' + ieltsPath('guided','study')}>
          <span className="ies-mock-icon"><CurriculumIcon name="lightbulb" size={24}/></span>
          <strong>Guided test</strong><span>Short annotated workshops are available now.</span>
          <em>Explore guided work <span aria-hidden="true">→</span></em>
        </a>
        <a className="ies-mock-tile" href={'#' + ieltsPath('simulation','practice')}>
          <span className="ies-mock-icon"><CurriculumIcon name="clock" size={24}/></span>
          <strong>Simulated test</strong><span>Full-length exam simulation is still in preparation.</span>
          <em>See test format <span aria-hidden="true">→</span></em>
        </a>
      </div>
    </section>
    <p className="ies-simple-disclaimer">Artico is independent of the official IELTS providers.</p>
  </div>
}

export function StudyReader({ area, unitId, store }) {
  const modMeta = MODULE_METADATA.find((m) => m.id === area) || MODULE_METADATA[0]
  const allAreaUnits = getUnitsForArea(area)
  // Keep the original editorial manual unit addressable by bookmarked links,
  // but do not make it part of the learner-facing lesson sequence.
  const areaUnits = allAreaUnits.filter((u) => u.id !== 'ov-how-to-read')
  const requestedUnit = unitId && STUDY_UNIT_BY_ID[unitId]?.area === area ? STUDY_UNIT_BY_ID[unitId] : null
  const currentUnit = requestedUnit || (area === 'overview' ? STUDY_UNIT_BY_ID['ov-what-ielts-measures'] : areaUnits[0]) || null

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
  }, [currentUnit?.id, store?.change])

  const filteredUnits = filterQuery.trim()
    ? areaUnits.filter((u) => u.title.toLowerCase().includes(filterQuery.toLowerCase()))
    : areaUnits

  const prevUnit = currentUnit?.id === 'ov-what-ielts-measures' ? null : currentUnit ? getPrevUnit(currentUnit.id) : null
  const nextUnit = currentUnit ? getNextUnit(currentUnit.id) : null
  const unitIndex = currentUnit ? areaUnits.findIndex((u) => u.id === currentUnit.id) : -1
  const lessonNumber = unitIndex < 0 ? 'Reference' : unitIndex + 1
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
            {part.title.replace(/^Part \d+\.\d+\s*·\s*/, '')}
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
        {area !== 'overview' && <div className="ie-facts"><span>{modMeta.fact}</span></div>}
      </header>

      {/* Mobile / Narrow-Tablet Compact Contents Drawer (< 880px) */}
      {currentUnit && (
        <details className="ies-mobile-toc">
          <summary>
            {unitIndex < 0 ? 'Contents · Course reference: ' : 'Contents · Lesson ' + lessonNumber + ' of ' + areaUnits.length + ': '}{currentUnit.title}
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
                  <span>{unitIndex < 0 ? 'Course reference' : 'Lesson ' + lessonNumber + ' of ' + areaUnits.length}</span>
                  {currentUnit.track === 'gt' && <span className="ies-badge ies-badge-gt">General Training</span>}
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
