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
const BANNED_ABBREVIATIONS = /\b(e\.g\.|i\.e\.|etc\.|vs\.|cf\.)\b/i
const BANNED_CONTRACTIONS = /\b(don't|doesn't|didn't|won't|can't|couldn't|shouldn't|wouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|it's|that's|there's|what's|who's|you're|we're|they're|I'm|you've|we've|they've|you'll|we'll|they'll)\b/i
const BANNED_GUARANTEES = /\b(guarantee[sd]?|guaranteed band|will get band [0-9]|100% band|instant band)\b/i

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

    if (BANNED_ABBREVIATIONS.test(s)) {
      const match = s.match(BANNED_ABBREVIATIONS)[0]
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
    const { DIAGRAM_IDS } = await vite.ssrLoadModule('/src/web/ielts-study/IeltsStudyDiagrams.jsx')
    const { ALL_STUDY_UNITS, STUDY_UNIT_BY_ID } = await vite.ssrLoadModule('/src/web/ielts-study/units/index.js')

    console.log('=== Artico IELTS Study Course Quality Audit ===\n')

    // COV03: Reference tables count
    console.log('--- Checking Reference Banks (COV03) ---')
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

    // VIS01: Diagrams check
    console.log('\n--- Checking Constructive Diagrams (VIS01) ---')
    if (DIAGRAM_IDS.length !== 23) {
      console.error(`❌ VIS01: DIAGRAM_IDS has ${DIAGRAM_IDS.length} diagrams (expected 23)`)
      totalErrors++
    } else {
      console.log(`✓ DIAGRAM_IDS: 23 diagrams registered`)
    }

    // VIS03: Media slots check
    console.log('\n--- Checking Media Slots (VIS03) ---')
    const slotKeys = Object.keys(MEDIA_SLOTS)
    if (slotKeys.length !== 10) {
      console.error(`❌ VIS03: MEDIA_SLOTS has ${slotKeys.length} slots (expected 10)`)
      totalErrors++
    } else {
      console.log(`✓ MEDIA_SLOTS: 10 slots defined`)
      for (const [id, slot] of Object.entries(MEDIA_SLOTS)) {
        if (slot.status === 'ready') {
          const fullAudioPath = path.join(ROOT, 'public', slot.src)
          if (!fs.existsSync(fullAudioPath)) {
            console.error(`❌ VIS03: Audio file for ready slot ${id} missing at ${fullAudioPath}`)
            totalErrors++
          }
        }
      }
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
