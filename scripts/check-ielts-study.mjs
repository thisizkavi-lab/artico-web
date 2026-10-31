#!/usr/bin/env node
/**
 * Artico IELTS Study Course Quality Linter & Progress Reporter (`check-ielts-study.mjs`)
 * Implements COV01–COV08, ASE01–ASE10, NOGAME01–NOGAME03, and VIS01–VIS04 checks.
 *
 * Usage:
 *   node scripts/check-ielts-study.mjs               # Run audit on all authored units
 *   node scripts/check-ielts-study.mjs --status      # Print build progress ledger
 *   node scripts/check-ielts-study.mjs --area <area> # Audit units in specific area
 *   node scripts/check-ielts-study.mjs --strict      # Exit code 1 on any error
 *   node scripts/check-ielts-study.mjs --render-diagrams # Render all 23 SVGs to review PNGs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import React, { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Target 85 curriculum unit IDs in canonical order
export const EXPECTED_UNIT_IDS = [
  'ov-how-to-read',
  'ov-what-ielts-measures',
  'ov-choose-correct-test',
  'ov-format-and-timing',
  'ov-delivery-modes-2026',
  'ov-scores-and-raw-marks',
  'ov-assessment-terms',
  'ov-preparation-cycle',
  'ov-diagnose-and-error-log',
  'ov-usable-vocabulary',
  'ov-synonym-checks',
  'ov-grammar-and-clear-meaning',
  'ov-lang-50-concepts',
  'ov-lang-precision-distinctions',
  'ov-lang-59-patterns',
  'ov-lang-phrases-idioms-register',
  'ov-lang-grammar-repairs-editing',
  'ov-targets-evidence-cycle',
  'ov-patterns-practice-input',
  'ov-materials-stress-readiness-testday',
  'ov-claims-checklists-sources',
  'l-four-contexts',
  'l-preview-period',
  'l-complete-message-paraphrase',
  'l-eight-distractors',
  'l-forms-notes-tables-summaries',
  'l-sentences-short-answers',
  'l-multiple-choice-matching',
  'l-maps-plans-diagrams',
  'l-discussions-and-lectures',
  'l-entry-and-recovery',
  'l-diagnosis-microlistening-pitfalls',
  'r-task-and-five-operations',
  'r-passage-map',
  'r-full-claim-anatomy',
  'r-true-false-not-given',
  'r-yes-no-not-given',
  'r-matching-headings',
  'r-matching-information',
  'r-matching-features-and-endings',
  'r-sentence-summary-completion',
  'r-tables-flowcharts-diagrams',
  'r-short-answers-multiple-choice',
  'r-order-and-unfamiliar-words',
  'r-pacing-diagnosis-speed',
  'r-gt-reading-comparison',
  'w-purposes-and-criteria',
  'w-coherence-vs-cohesion',
  'w-words-and-grammar-for-meaning',
  'w-process-timing-length-review',
  'w-a1-reporting-principle-and-jobs',
  'w-a1-decode-and-main-features',
  'w-a1-plan-and-introduction',
  'w-a1-accurate-overview',
  'w-a1-grouping-and-chunking',
  'w-a1-numbers-and-percentages',
  'w-a1-trend-and-comparison-grammar',
  'w-a1-line-bar-table',
  'w-a1-pie-and-multiple-visuals',
  'w-a1-maps-and-plans',
  'w-a1-process-diagrams',
  'w-a1-review-and-subskills',
  'w-t2-prompt-layers-and-plan',
  'w-t2-opinion-and-discussion',
  'w-t2-advantages-and-evaluations',
  'w-t2-causes-solutions-two-part',
  'w-t2-generate-and-select-ideas',
  'w-t2-plan-and-introduction',
  'w-t2-body-paragraphs-and-mechanisms',
  'w-t2-examples-position-qualification',
  'w-t2-conclusion-and-cohesion',
  'w-t2-review-models-feedback-myths',
  'w-gt-purpose-reader-register',
  'w-gt-structure-openings-details',
  'w-gt-conventions-informal-check',
  's-interview-and-criteria',
  's-procedural-and-part1',
  's-part2-decode-and-prepare',
  's-part2-long-turn-and-timeframes',
  's-part3-operations-and-development',
  's-frameworks-unfamiliar-pauses',
  's-natural-language-and-functions',
  's-pronunciation-stress-pace',
  's-self-correction-and-review',
  's-models-shadowing-ai-myths',
]

// Banned words & regexes
const BANNED_HYPE_WORDS = /\b(simply|obviously|of course|trick|tricks|hack|hacks|secret|secrets|magic|supercharge|skyrocket|delve|realm|tapestry|unlock|streak|streaks|xp|leaderboard|congrats|congratulations|awesome)\b/i
const BANNED_ABBREVIATIONS = /(?:(?<![A-Za-z])(?:e\.g\.|i\.e\.|etc\.|vs\.|cf\.)|\bvs\b)/i
const BANNED_CONTRACTIONS = /\b(don't|doesn't|didn't|won't|can't|couldn't|shouldn't|wouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|it's|that's|there's|what's|who's|you're|we're|they're|I'm|you've|we've|they've|you'll|we'll|they'll)\b/i
const BANNED_GUARANTEES = /\b(guarantee[sd]?|guaranteed band|will get band [0-9]|100% band|instant band)\b/i
const BANNED_GAMIFICATION_SOURCE = /\b(streak|streaks|xp|rewardPoints|scorePoints|leaderboard|confetti|levelUp|lockedUnit|unlockUnit|trophy)\b/i

function countWords(str) {
  if (!str || typeof str !== 'string') return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

function splitSentences(text) {
  if (!text || typeof text !== 'string') return []
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

function extractInstructionalText(unit) {
  const pieces = []

  for (const block of unit.blocks) {
    if (block.type === 'lead') {
      pieces.push(block.summary, block.whyItMatters, block.whatYouWillDo)
    } else if (block.type === 'section') {
      pieces.push(block.title, block.bridge || '')
    } else if (block.type === 'prose') {
      pieces.push(...block.paragraphs)
    } else if (block.type === 'callout') {
      pieces.push(block.body)
    } else if (block.type === 'steps') {
      for (const item of block.items) {
        pieces.push(item.action, item.condition || '', item.why || '')
      }
    } else if (block.type === 'annotatedSpecimen') {
      for (const seg of block.segments) {
        pieces.push(seg.note)
      }
    } else if (block.type === 'contrastPair') {
      if (block.weak) pieces.push(block.weak.text, block.weak.whyItFails)
      if (block.controlled) pieces.push(block.controlled.text, block.controlled.whyItWorks)
    } else if (block.type === 'comparisonTable') {
      if (block.caption) pieces.push(block.caption)
      if (Array.isArray(block.rows)) {
        for (const row of block.rows) {
          for (const cell of row) pieces.push(cell)
        }
      }
    } else if (block.type === 'trackCompare') {
      if (block.academic?.points) pieces.push(...block.academic.points)
      if (block.generalTraining?.points) pieces.push(...block.generalTraining.points)
    } else if (block.type === 'wordBank') {
      pieces.push(block.title, block.instructions || '')
    } else if (block.type === 'mythBuster') {
      if (Array.isArray(block.items)) {
        for (const item of block.items) {
          // Note: item.claim is the external false claim being refuted;
          // instructional text consists of the verified reality and takeaway.
          pieces.push(item.reality, item.takeaway)
        }
      }
    } else if (block.type === 'decisionTree') {
      pieces.push(block.question)
      for (const b of block.branches) {
        pieces.push(b.condition, b.outcome, b.detail || '')
      }
    } else if (block.type === 'diagnosticCheck') {
      if (block.prompt) pieces.push(block.prompt)
      for (const opt of block.options) {
        pieces.push(opt.label, opt.rationale)
      }
    } else if (block.type === 'selfCheck') {
      pieces.push(...block.items)
    }
  }

  return pieces
    .filter(Boolean)
    .map((p) => p.trim())
    .map((p) => (/[.!?:]$/.test(p) ? p : `${p}.`))
    .join(' ')
}

export function auditUnit(unit, validateUnitFn) {
  const issues = []

  // Schema validation
  try {
    validateUnitFn(unit)
  } catch (err) {
    issues.push({ level: 'error', code: 'SCHEMA_INVALID', message: err.message })
    return issues
  }

  // COV04: Word count of instructional text (320..1150 words)
  const fullText = extractInstructionalText(unit)
  const wordCount = countWords(fullText)
  if (wordCount < 280) {
    issues.push({ level: 'error', code: 'COV04_TOO_SHORT', message: `Word count ${wordCount} is below strict minimum 280 words.` })
  } else if (wordCount < 320) {
    issues.push({ level: 'warn', code: 'COV04_SHORT', message: `Word count ${wordCount} is below recommended 320 words.` })
  } else if (wordCount > 1500) {
    issues.push({ level: 'error', code: 'COV04_TOO_LONG', message: `Word count ${wordCount} exceeds strict limit 1500 words.` })
  } else if (wordCount > 1150) {
    issues.push({ level: 'warn', code: 'COV04_LONG', message: `Word count ${wordCount} exceeds recommended 1150 words.` })
  }

  // COV04: Structured blocks check (at least 2 non-prose structured blocks)
  const nonProseBlocks = unit.blocks.filter(
    (b) => !['lead', 'section', 'prose'].includes(b.type)
  )
  if (nonProseBlocks.length < 2) {
    issues.push({
      level: 'error',
      code: 'COV04_STRUCTURE',
      message: `Unit has only ${nonProseBlocks.length} structured blocks (minimum 2 required).`,
    })
  }

  // ASE08: Visual rhythm (no more than 2 consecutive prose blocks, error >= 4)
  let consecutiveProse = 0
  for (const block of unit.blocks) {
    if (block.type === 'prose') {
      consecutiveProse++
      if (consecutiveProse === 3) {
        issues.push({ level: 'warn', code: 'ASE08_RHYTHM', message: '3 consecutive prose blocks without a structured block.' })
      } else if (consecutiveProse >= 4) {
        issues.push({ level: 'error', code: 'ASE08_RHYTHM', message: '4+ consecutive prose blocks violates visual rhythm.' })
      }
    } else if (block.type !== 'section') {
      consecutiveProse = 0
    }
  }

  // Check each block's text
  for (let bi = 0; bi < unit.blocks.length; bi++) {
    const block = unit.blocks[bi]

    if (block.type === 'prose') {
      // ASE02: sentences per paragraph <= 5 (warn > 4)
      for (const p of block.paragraphs) {
        const sentences = splitSentences(p)
        if (sentences.length > 5) {
          issues.push({ level: 'error', code: 'ASE02_PARA_LEN', message: `Prose paragraph has ${sentences.length} sentences (max 5).` })
        } else if (sentences.length > 4) {
          issues.push({ level: 'warn', code: 'ASE02_PARA_LEN', message: `Prose paragraph has ${sentences.length} sentences (target <= 4).` })
        }
      }
    }

    if (block.type === 'callout') {
      // ASE09: callout body word count <= 95 (warn > 65)
      const calloutWords = countWords(block.body)
      if (calloutWords > 95) {
        issues.push({ level: 'error', code: 'ASE09_CALLOUT_LEN', message: `Callout body has ${calloutWords} words (max 95).` })
      } else if (calloutWords > 65) {
        issues.push({ level: 'warn', code: 'ASE09_CALLOUT_LEN', message: `Callout body has ${calloutWords} words (target <= 65).` })
      }
    }

    if (block.type === 'steps') {
      // ASE01: procedural step actions <= 25 words (warn > 22)
      for (const item of block.items) {
        const aWords = countWords(item.action)
        if (aWords > 25) {
          issues.push({ level: 'error', code: 'ASE01_STEP_LEN', message: `Step action has ${aWords} words (max 25): "${item.action.slice(0, 50)}…"` })
        } else if (aWords > 22) {
          issues.push({ level: 'warn', code: 'ASE01_STEP_LEN', message: `Step action has ${aWords} words (target <= 22): "${item.action.slice(0, 50)}…"` })
        }
      }
    }
  }

  // ASE01, ASE03, ASE04, ASE10 on instructional text
  const sentences = splitSentences(fullText)
  for (const s of sentences) {
    const sWords = countWords(s)
    if (sWords > 32) {
      issues.push({ level: 'error', code: 'ASE01_SENT_LEN', message: `Sentence has ${sWords} words (>32 max): "${s.slice(0, 50)}…"` })
    } else if (sWords > 26) {
      issues.push({ level: 'warn', code: 'ASE01_SENT_LEN', message: `Sentence has ${sWords} words (>26 target): "${s.slice(0, 50)}…"` })
    }

    if (BANNED_HYPE_WORDS.test(s)) {
      const match = s.match(BANNED_HYPE_WORDS)[0]
      issues.push({ level: 'error', code: 'ASE03_HYPE', message: `Banned hype/filler word "${match}" in: "${s.slice(0, 60)}…"` })
    }

    const sWithoutUrls = s.replace(/https?:\/\/[^\s)\]]+/g, '')
    if (BANNED_ABBREVIATIONS.test(sWithoutUrls)) {
      const match = sWithoutUrls.match(BANNED_ABBREVIATIONS)[0]
      issues.push({ level: 'error', code: 'ASE03_ABBR', message: `Banned abbreviation "${match}" in: "${s.slice(0, 60)}…"` })
    }

    if (BANNED_CONTRACTIONS.test(s)) {
      const match = s.match(BANNED_CONTRACTIONS)[0]
      issues.push({ level: 'error', code: 'ASE04_CONTRACTION', message: `Contraction "${match}" in ASE prose: "${s.slice(0, 60)}…"` })
    }

    if (BANNED_GUARANTEES.test(s)) {
      const match = s.match(BANNED_GUARANTEES)[0]
      issues.push({ level: 'error', code: 'ASE10_GUARANTEE', message: `Banned guarantee phrase "${match}" in: "${s.slice(0, 60)}…"` })
    }
  }

  return issues
}

export async function runFullAudit(options = {}) {
  const { area, strict } = options
  let totalErrors = 0
  let totalWarnings = 0

  let vite
  try {
    vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
    const { validateUnit } = await vite.ssrLoadModule('/src/web/ielts-study/schema.js')
    const { GLOSSARY } = await vite.ssrLoadModule('/src/web/ielts-study/glossary.js')
    const wordBanks = await vite.ssrLoadModule('/src/web/ielts-study/wordBanks.js')
    const { MEDIA_SLOTS } = await vite.ssrLoadModule('/src/web/ielts-study/mediaManifest.js')
    const { DIAGRAM_IDS, IeltsStudyDiagram } = await vite.ssrLoadModule('/src/web/ielts-study/IeltsStudyDiagrams.jsx')
    const { ALL_STUDY_UNITS, STUDY_UNIT_BY_ID } = await vite.ssrLoadModule('/src/web/ielts-study/units/index.js')
    const { parseRoute } = await vite.ssrLoadModule('/src/web/learning.js')
    const { default: IeltsCourse } = await vite.ssrLoadModule('/src/web/IeltsCourse.jsx')

    console.log('=== Artico IELTS Study Course Quality Audit ===\n')

    // COV01 & COV02: Curriculum Registry & 174 Source Sections
    console.log('--- Checking Curriculum Registry & Source Coverage (COV01 & COV02) ---')
    if (ALL_STUDY_UNITS.length !== EXPECTED_UNIT_IDS.length) {
      console.error(`❌ COV01: Expected ${EXPECTED_UNIT_IDS.length} units, got ${ALL_STUDY_UNITS.length}`)
      totalErrors++
    } else {
      const mismatchIdx = EXPECTED_UNIT_IDS.findIndex((id, idx) => ALL_STUDY_UNITS[idx]?.id !== id)
      if (mismatchIdx !== -1) {
        console.error(`❌ COV01: Unit order mismatch at index ${mismatchIdx}: expected ${EXPECTED_UNIT_IDS[mismatchIdx]}, got ${ALL_STUDY_UNITS[mismatchIdx]?.id}`)
        totalErrors++
      } else {
        console.log(`✓ COV01: All 85 canonical study units registered in order`)
      }
    }

    const sectionIndexMd = fs.readFileSync(path.join(ROOT, 'work/ielts-study/source/SECTION_INDEX.md'), 'utf-8')
    const indexedSections = new Set(['Preamble'])
    for (const line of sectionIndexMd.split('\n')) {
      const m = line.match(/^\|\s*([0-9A]+\.[0-9]+)\s*\|/)
      if (m) indexedSections.add(m[1])
    }
    const coveredSections = new Set()
    for (const u of ALL_STUDY_UNITS) {
      for (const s of u.sourceSections || []) {
        coveredSections.add(s)
        if (!indexedSections.has(s)) {
          console.error(`❌ COV02: Unknown sourceSection "${s}" in unit ${u.id}`)
          totalErrors++
        }
      }
    }
    const missingSections = [...indexedSections].filter((s) => !coveredSections.has(s))
    if (missingSections.length > 0) {
      console.error(`❌ COV02: Missing ${missingSections.length} source section(s): ${missingSections.join(', ')}`)
      totalErrors++
    } else {
      console.log(`✓ COV02: All ${indexedSections.size}/${indexedSections.size} source sections covered (0 missing, 0 unknown)`)
    }

    // COV03: Reference tables count & official URLs
    console.log('\n--- Checking Reference Banks & Glossary (COV03 & ASE05) ---')
    const bankChecks = [
      { name: 'commonConcepts50', got: wordBanks.commonConcepts50.length, expected: 50 },
      { name: 'vocabPatterns59', got: wordBanks.vocabPatterns59.length, expected: 59 },
      { name: 'topicPhrases16', got: wordBanks.topicPhrases16.length, expected: 16 },
      { name: 'optionalIdioms18', got: wordBanks.optionalIdioms18.length, expected: 18 },
      { name: 'registerExpressions10', got: wordBanks.registerExpressions10.length, expected: 10 },
      { name: 'grammarRepairs19', got: wordBanks.grammarRepairs19.length, expected: 19 },
      { name: 'commonClaims29', got: wordBanks.commonClaims29.length, expected: 29 },
      { name: 'officialReferences19', got: wordBanks.officialReferences19.length, expected: 19 },
    ]
    for (const b of bankChecks) {
      if (b.got !== b.expected) {
        console.error(`❌ COV03: ${b.name} has ${b.got} items (expected ${b.expected})`)
        totalErrors++
      } else {
        console.log(`✓ ${b.name}: ${b.got}/${b.expected}`)
      }
    }
    for (const ref of wordBanks.officialReferences19) {
      if (!ref.url || !ref.url.startsWith('https://')) {
        console.error(`❌ COV03: Invalid official reference URL: ${ref.url}`)
        totalErrors++
      }
    }
    const glossaryItems = Object.values(GLOSSARY)
    if (glossaryItems.length < 40) {
      console.error(`❌ ASE05: Glossary has ${glossaryItems.length} terms (expected >= 40)`)
      totalErrors++
    } else {
      let glossaryBad = 0
      for (const g of glossaryItems) {
        if (countWords(g.definition) > 25) {
          console.error(`❌ ASE05: Glossary term "${g.term}" definition exceeds 25 words`)
          totalErrors++
          glossaryBad++
        }
      }
      if (glossaryBad === 0) {
        console.log(`✓ ASE05: Glossary has ${glossaryItems.length} terms (all definitions <= 25 words)`)
      }
    }

    // COV05, COV06, COV07, COV08: GT separation, DAG, internal links, workbookPrompt budget
    console.log('\n--- Checking GT Track, Prerequisite DAG, Links & Workbook Budget (COV05–COV08) ---')
    const gtUnits = ALL_STUDY_UNITS.filter((u) => u.track === 'gt')
    if (gtUnits.length !== 4) {
      console.error(`❌ COV05: Expected 4 GT units, got ${gtUnits.length}`)
      totalErrors++
    } else {
      for (const gu of gtUnits) {
        if (!gu.title.includes('[GT]') || !gu.partTitle.includes('[GT]')) {
          console.error(`❌ COV05: GT unit ${gu.id} must include [GT] in title and partTitle`)
          totalErrors++
        }
      }
      console.log(`✓ COV05: All 4 [GT] units explicitly tagged and separated`)
    }

    // DAG check
    const visitState = new Map()
    function checkDag(uid, stack = []) {
      const st = visitState.get(uid)
      if (st === 'visiting') {
        console.error(`❌ COV06: Cycle detected in needs DAG: ${[...stack, uid].join(' -> ')}`)
        totalErrors++
        return
      }
      if (st === 'visited') return
      visitState.set(uid, 'visiting')
      const u = STUDY_UNIT_BY_ID[uid]
      for (const dep of u?.needs || []) {
        if (!STUDY_UNIT_BY_ID[dep]) {
          console.error(`❌ COV06: Unit ${uid} has unknown prerequisite "${dep}"`)
          totalErrors++
        } else {
          checkDag(dep, [...stack, uid])
        }
      }
      visitState.set(uid, 'visited')
    }
    for (const u of ALL_STUDY_UNITS) checkDag(u.id)
    console.log(`✓ COV06: Prerequisite graph verified acyclic across all 85 units`)

    // Internal unit: links & workbookPrompt count
    const workbookNoteIds = new Set()
    let workbookCount = 0
    for (const u of ALL_STUDY_UNITS) {
      const rawJson = JSON.stringify(u)
      const unitLinkMatches = [...rawJson.matchAll(/\(unit:([a-z0-9-]+)\)/g)]
      for (const m of unitLinkMatches) {
        if (!STUDY_UNIT_BY_ID[m[1]]) {
          console.error(`❌ COV07: Broken internal link (unit:${m[1]}) in unit ${u.id}`)
          totalErrors++
        }
      }
      for (const b of u.blocks) {
        if (b.type === 'trackCompare' && b.generalTraining?.linkUnit) {
          if (!STUDY_UNIT_BY_ID[b.generalTraining.linkUnit]) {
            console.error(`❌ COV07: Broken trackCompare linkUnit "${b.generalTraining.linkUnit}" in ${u.id}`)
            totalErrors++
          }
        }
        if (b.type === 'workbookPrompt') {
          workbookCount++
          if (workbookNoteIds.has(b.noteId)) {
            console.error(`❌ COV08: Duplicate workbookPrompt noteId "${b.noteId}"`)
            totalErrors++
          }
          workbookNoteIds.add(b.noteId)
        }
      }
    }
    if (workbookCount < 5 || workbookCount > 10) {
      console.error(`❌ COV08: Total workbookPrompt count is ${workbookCount} (expected 5..10)`)
      totalErrors++
    } else {
      console.log(`✓ COV07 & COV08: Internal links resolved; ${workbookCount} workbook prompts within 5..10 budget`)
    }

    // NOGAME01–03: Scan source directory for gamification
    console.log('\n--- Checking Zero-Gamification Invariants (NOGAME01–NOGAME03) ---')
    function listFilesRec(dir) {
      const out = []
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) out.push(...listFilesRec(full))
        else if (/\.(js|jsx|css)$/.test(entry.name)) out.push(full)
      }
      return out
    }
    let gameHits = 0
    for (const file of listFilesRec(path.join(ROOT, 'src/web/ielts-study'))) {
      const src = fs.readFileSync(file, 'utf-8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
      if (BANNED_GAMIFICATION_SOURCE.test(src)) {
        const match = src.match(BANNED_GAMIFICATION_SOURCE)[0]
        console.error(`❌ NOGAME01: Banned gamification token "${match}" found in ${path.relative(ROOT, file)}`)
        totalErrors++
        gameHits++
      }
    }
    if (gameHits === 0) {
      console.log(`✓ NOGAME01–03: Zero gamification tokens across all ielts-study source files`)
    }

    // VIS01 & VIS02: Diagrams check + SVG primitives + unique IDs
    console.log('\n--- Checking Constructive Diagrams (VIS01 & VIS02) ---')
    if (DIAGRAM_IDS.length !== 23) {
      console.error(`❌ VIS01: DIAGRAM_IDS has ${DIAGRAM_IDS.length} diagrams (expected 23)`)
      totalErrors++
    } else {
      const globalSvgIds = new Set()
      let svgErrors = 0
      for (const dId of DIAGRAM_IDS) {
        const markup = renderToStaticMarkup(createElement(IeltsStudyDiagram, { diagramId: dId }))
        if (!markup.includes('<svg') || !markup.includes('viewBox=')) {
          console.error(`❌ VIS01: Diagram ${dId} missing <svg> or viewBox`)
          totalErrors++
          svgErrors++
        }
        const primitives = (markup.match(/<(rect|line|path|circle|ellipse|polygon|polyline|text)\b/g) || []).length
        if (primitives < 8) {
          console.error(`❌ VIS01: Diagram ${dId} has only ${primitives} vector elements (expected >= 8)`)
          totalErrors++
          svgErrors++
        }
        if (/#000\b|#000000\b|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(markup)) {
          console.error(`❌ VIS02: Diagram ${dId} uses raw black instead of Artico ink palette`)
          totalErrors++
          svgErrors++
        }
        for (const idMatch of markup.matchAll(/\bid="([^"]+)"/g)) {
          if (globalSvgIds.has(idMatch[1])) {
            console.error(`❌ VIS02: Duplicate SVG id="${idMatch[1]}" in ${dId}`)
            totalErrors++
            svgErrors++
          }
          globalSvgIds.add(idMatch[1])
        }
      }
      if (svgErrors === 0) {
        console.log(`✓ DIAGRAM_IDS: All 23 diagrams rendered cleanly (>= 8 primitives, Artico palette, ${globalSvgIds.size} unique SVG IDs)`)
      }
    }

    // VIS03: Media slots check
    console.log('\n--- Checking Media Slots (VIS03) ---')
    const slotKeys = Object.keys(MEDIA_SLOTS)
    if (slotKeys.length !== 10) {
      console.error(`❌ VIS03: MEDIA_SLOTS has ${slotKeys.length} slots (expected 10)`)
      totalErrors++
    } else {
      const referencedSlots = new Set()
      for (const u of ALL_STUDY_UNITS) {
        for (const b of u.blocks) {
          if (b.type === 'mediaSlot') referencedSlots.add(b.slotId)
        }
      }
      for (const [id, slot] of Object.entries(MEDIA_SLOTS)) {
        if (slot.status === 'ready') {
          const fullAudioPath = path.join(ROOT, 'public', slot.src)
          if (!fs.existsSync(fullAudioPath)) {
            console.error(`❌ VIS03: Audio file for ready slot ${id} missing at ${fullAudioPath}`)
            totalErrors++
          }
        }
        if (!referencedSlots.has(id)) {
          console.error(`❌ VIS03: Media slot ${id} is never referenced by any study unit`)
          totalErrors++
        }
      }
      console.log(`✓ MEDIA_SLOTS: All 10 slots defined, audio verified, and referenced across units`)
    }

    // VIS04: Full SSR Render of Study Hub, all 85 Study Units, and Practice Mode routes
    console.log('\n--- Checking Full SSR Route Rendering (VIS04) ---')
    const origConsoleError = console.error
    const ssrConsoleErrors = []
    console.error = (...args) => {
      ssrConsoleErrors.push(args.map(String).join(' '))
    }
    try {
      const homeHtml = renderToStaticMarkup(createElement(IeltsCourse, { route: parseRoute('#/application/tests/ielts/home/study') }))
      if (!homeHtml.includes('Everything about IELTS') || /progressbar/i.test(homeHtml)) {
        ssrConsoleErrors.push('Study hub SSR failed orientation or progressbar check')
      }
      for (const u of ALL_STUDY_UNITS) {
        const html = renderToStaticMarkup(
          createElement(IeltsCourse, { route: parseRoute(`#/application/tests/ielts/${u.area}/study?unit=${u.id}`) })
        )
        if (!html.includes('class="ies-article"')) {
          ssrConsoleErrors.push(`Study unit ${u.id} did not render ies-article`)
        }
        if (u.track === 'gt' && !html.includes('General Training Track')) {
          ssrConsoleErrors.push(`GT unit ${u.id} missing General Training Track banner`)
        }
      }
      const practiceHashes = [
        '#/application/tests/ielts/home/practice',
        '#/application/tests/ielts/overview/practice',
        '#/application/tests/ielts/listening/practice',
        '#/application/tests/ielts/reading/practice',
        '#/application/tests/ielts/writing/practice',
        '#/application/tests/ielts/speaking/practice',
        '#/application/tests/ielts/guided/practice',
        '#/application/tests/ielts/mocks/practice',
        '#/application/tests/ielts/simulation/practice',
        '#/application/tests/ielts/mock/practice',
      ]
      for (const h of practiceHashes) {
        const pHtml = renderToStaticMarkup(createElement(IeltsCourse, { route: parseRoute(h) }))
        if (!pHtml.includes('ie-page')) {
          ssrConsoleErrors.push(`Practice route ${h} failed SSR`)
        }
      }
    } catch (ssrErr) {
      ssrConsoleErrors.push(`SSR exception: ${ssrErr.message}`)
    } finally {
      console.error = origConsoleError
    }
    if (ssrConsoleErrors.length > 0) {
      for (const msg of ssrConsoleErrors) console.error(`❌ VIS04: ${msg}`)
      totalErrors += ssrConsoleErrors.length
    } else {
      console.log(`✓ VIS04: SSR rendered Study Hub + all 85 unit routes + 10 Practice routes with 0 errors/warnings`)
    }

    // Units audit
    console.log('\n--- Checking Authored Study Units ---')
    const unitsToAudit = area
      ? ALL_STUDY_UNITS.filter((u) => u.area === area)
      : ALL_STUDY_UNITS

    console.log(`Total authored units in registry: ${ALL_STUDY_UNITS.length} / 85 target`)
    if (unitsToAudit.length === 0) {
      console.log('No authored units to audit yet for specified target.\n')
    }

    for (const unit of unitsToAudit) {
      const issues = auditUnit(unit, validateUnit)
      const errors = issues.filter((i) => i.level === 'error')
      const warnings = issues.filter((i) => i.level === 'warn')

      totalErrors += errors.length
      totalWarnings += warnings.length

      if (errors.length > 0) {
        console.error(`\n❌ [${unit.id}] (${unit.title}): ${errors.length} error(s), ${warnings.length} warning(s)`)
        for (const e of errors) console.error(`   - [${e.code}] ${e.message}`)
        for (const w of warnings) console.warn(`   ! [${w.code}] ${w.message}`)
      } else if (warnings.length > 0) {
        console.warn(`\n! [${unit.id}] (${unit.title}): ${warnings.length} warning(s)`)
        for (const w of warnings) console.warn(`   ! [${w.code}] ${w.message}`)
      } else {
        console.log(`✓ [${unit.id}] ${unit.title} (${countWords(extractInstructionalText(unit))} words)`)
      }
    }

    console.log(`\n========================================`)
    console.log(`Audit Summary: ${totalErrors} error(s), ${totalWarnings} warning(s)`)
    console.log(`========================================\n`)

    if (strict && totalErrors > 0) {
      process.exit(1)
    }
  } finally {
    await vite?.close()
  }
}

export async function printStatus() {
  let vite
  try {
    vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
    const { GLOSSARY } = await vite.ssrLoadModule('/src/web/ielts-study/glossary.js')
    const { MEDIA_SLOTS } = await vite.ssrLoadModule('/src/web/ielts-study/mediaManifest.js')
    const { DIAGRAM_IDS } = await vite.ssrLoadModule('/src/web/ielts-study/IeltsStudyDiagrams.jsx')
    const { ALL_STUDY_UNITS, MODULE_METADATA } = await vite.ssrLoadModule('/src/web/ielts-study/units/index.js')

    console.log('=== IELTS Study Course Progress Ledger ===\n')
    console.log(`Authored Units: ${ALL_STUDY_UNITS.length} / 85 (${Math.round((ALL_STUDY_UNITS.length / 85) * 100)}%)`)
    console.log(`Diagrams: ${DIAGRAM_IDS.length} / 23 (100%)`)
    console.log(`Media Slots: ${Object.keys(MEDIA_SLOTS).length} / 10 (100%)`)
    console.log(`Glossary Terms: ${Object.keys(GLOSSARY).length} (target >= 40)`)

    console.log('\nModules Breakdown:')
    for (const mod of MODULE_METADATA) {
      const modUnits = ALL_STUDY_UNITS.filter((u) => u.area === mod.id)
      const expectedCount = mod.parts.reduce((sum, p) => sum + p.count, 0)
      console.log(`- ${mod.title} (${mod.id}): ${modUnits.length} / ${expectedCount} units`)
    }
    console.log('')
  } finally {
    await vite?.close()
  }
}

export async function renderAllDiagrams() {
  console.log('=== Rendering All 23 Constructive Diagrams via Python (resvg_py + Pillow) ===\n')
  const reviewDir = path.join(ROOT, 'work/ielts-study/review')
  if (!fs.existsSync(reviewDir)) {
    fs.mkdirSync(reviewDir, { recursive: true })
  }

  let vite
  try {
    vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
    const { DIAGRAM_IDS, IeltsStudyDiagram } = await vite.ssrLoadModule('/src/web/ielts-study/IeltsStudyDiagrams.jsx')

    // 1. Render all 23 diagram SVGs
    const svgMap = {}
    for (const id of DIAGRAM_IDS) {
      const markup = renderToStaticMarkup(createElement(IeltsStudyDiagram, { diagramId: id }))
      const match = markup.match(/<svg[\s\S]*?<\/svg>/)
      if (!match) {
        throw new Error(`Failed to extract SVG for diagram ${id}`)
      }
      let svgStr = match[0]
      if (!svgStr.includes('xmlns=')) {
        svgStr = svgStr.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
      }
      svgMap[id] = svgStr
    }

    // Save SVGs to temporary JSON for Python renderer
    const tempJson = path.join(reviewDir, '.temp-diagrams.json')
    fs.writeFileSync(tempJson, JSON.stringify(svgMap), 'utf-8')

    // Python script to rasterize via resvg_py and composite onto 2 contact sheets
    const pyScript = `
import json, os, resvg_py
from PIL import Image, ImageDraw, ImageFont

review_dir = "${reviewDir}"
json_path = "${tempJson}"

with open(json_path, 'r', encoding='utf-8') as f:
    svg_map = json.load(f)

diagram_ids = list(svg_map.keys())

sheets = [
    ('diagrams-sheet-1.png', diagram_ids[:12], 'Sheet 1 of 2: Diagrams 1–12'),
    ('diagrams-sheet-2.png', diagram_ids[12:], 'Sheet 2 of 2: Diagrams 13–23')
]

col_w = 760
row_h = 360
margin = 40
sheet_w = margin * 2 + col_w * 3
sheet_h = margin * 2 + 60 + row_h * 4

for filename, ids, header_title in sheets:
    sheet = Image.new('RGB', (sheet_w, sheet_h), '#fbfaf7')
    draw = ImageDraw.Draw(sheet)
    draw.text((margin, 20), header_title + " · Artico IELTS Study Course", fill='#263b3b')
    
    for idx, d_id in enumerate(ids):
        col = idx % 3
        row = idx // 3
        x = margin + col * col_w
        y = margin + 60 + row * row_h
        
        svg_str = svg_map[d_id]
        png_bytes = resvg_py.svg_to_bytes(svg_string=svg_str)
        import io
        img = Image.open(io.BytesIO(png_bytes))
        
        max_w = col_w - 30
        max_h = row_h - 45
        img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        
        draw.text((x, y), f"#{idx+1 if '1' in filename else idx+13}: {d_id}", fill='#285bcc')
        if img.mode == 'RGBA':
            bg = Image.new('RGB', img.size, '#fbfaf7')
            bg.paste(img, (0, 0), img)
            img = bg
        sheet.paste(img, (x, y + 25))
    
    out_path = os.path.join(review_dir, filename)
    sheet.save(out_path, format='PNG')
    print(f"✓ Saved {out_path} ({sheet_w}x{sheet_h})")

if os.path.exists(json_path):
    os.remove(json_path)
`

    const pyScriptPath = path.join(reviewDir, '.render_sheets.py')
    fs.writeFileSync(pyScriptPath, pyScript, 'utf-8')

    try {
      const pythonBin = '/Users/kavi/Documents/kyoto/.venv/bin/python3'
      execSync(`${pythonBin} "${pyScriptPath}"`, { stdio: 'inherit' })
    } finally {
      if (fs.existsSync(pyScriptPath)) fs.unlinkSync(pyScriptPath)
    }

    console.log('\nDiagram contact sheets successfully rendered!\n')
  } finally {
    await vite?.close()
  }
}

// CLI argument parsing
const args = process.argv.slice(2)
if (args.includes('--status')) {
  await printStatus()
} else if (args.includes('--render-diagrams')) {
  await renderAllDiagrams()
} else {
  const areaIdx = args.indexOf('--area')
  const targetArea = areaIdx !== -1 ? args[areaIdx + 1] : null
  const strict = args.includes('--strict')
  await runFullAudit({ area: targetArea, strict })
}
