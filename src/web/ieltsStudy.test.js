import test from 'node:test'
import assert from 'node:assert/strict'
import { ALL_STUDY_UNITS, MODULE_METADATA } from './ielts-study/units/index.js'
import {
  commonConcepts50,
  vocabPatterns59,
  topicPhrases16,
  optionalIdioms18,
  registerExpressions10,
  grammarRepairs19,
  commonClaims29,
  officialReferences19,
} from './ielts-study/wordBanks.js'
import { GLOSSARY } from './ielts-study/glossary.js'
import { DIAGRAM_IDS } from './ielts-study/diagramManifest.js'
import { MEDIA_SLOTS } from './ielts-study/mediaManifest.js'
import { ieltsStudyPath } from './ieltsNavigation.js'
import { parseRoute } from './learning.js'
import { validateBlock } from './ielts-study/schema.js'

test('COV01 & COV02: All 85 IELTS Study units exist with valid metadata and module distribution', () => {
  assert.equal(ALL_STUDY_UNITS.length, 85, 'Total study units must be exactly 85')

  const unitIds = new Set()
  const areaCounts = { overview: 0, listening: 0, reading: 0, writing: 0, speaking: 0 }

  for (const unit of ALL_STUDY_UNITS) {
    assert.ok(unit.id, 'Unit must have an id')
    assert.ok(!unitIds.has(unit.id), `Duplicate unit id: ${unit.id}`)
    unitIds.add(unit.id)

    assert.ok(['overview', 'listening', 'reading', 'writing', 'speaking'].includes(unit.area), `Invalid area: ${unit.area}`)
    areaCounts[unit.area]++

    assert.ok(['shared', 'academic', 'gt'].includes(unit.track), `Invalid track: ${unit.track} in ${unit.id}`)
    assert.ok(unit.partId, `Unit ${unit.id} missing partId`)
    assert.ok(unit.partTitle, `Unit ${unit.id} missing partTitle`)
    assert.ok(unit.title, `Unit ${unit.id} missing title`)
    assert.ok(typeof unit.minutes === 'number' && unit.minutes > 0, `Unit ${unit.id} invalid minutes`)
    assert.ok(Array.isArray(unit.blocks) && unit.blocks.length >= 6, `Unit ${unit.id} must have >= 6 blocks`)
    assert.equal(unit.blocks[0].type, 'lead', `Unit ${unit.id} first block must be lead`)
  }

  assert.equal(areaCounts.overview, 21, 'Overview module must have 21 units')
  assert.equal(areaCounts.listening, 11, 'Listening module must have 11 units')
  assert.equal(areaCounts.reading, 14, 'Reading module must have 14 units')
  assert.equal(areaCounts.writing, 29, 'Writing module must have 29 units')
  assert.equal(areaCounts.speaking, 10, 'Speaking module must have 10 units')
})

test('COV03: All 8 Reference Banks are complete and untruncated in wordBanks.js', () => {
  assert.equal(commonConcepts50.length, 50, 'commonConcepts50 must have 50 items')
  assert.equal(vocabPatterns59.length, 59, 'vocabPatterns59 must have 59 items')
  assert.equal(topicPhrases16.length, 16, 'topicPhrases16 must have 16 items')
  assert.equal(optionalIdioms18.length, 18, 'optionalIdioms18 must have 18 items')
  assert.equal(registerExpressions10.length, 10, 'registerExpressions10 must have 10 items')
  assert.equal(grammarRepairs19.length, 19, 'grammarRepairs19 must have 19 items')
  assert.equal(commonClaims29.length, 29, 'commonClaims29 must have 29 items')
  assert.equal(officialReferences19.length, 19, 'officialReferences19 must have 19 items')
})

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
        pieces.push(opt.text || opt.label, opt.rationale)
      }
    } else if (block.type === 'selfCheck') {
      pieces.push(...block.items)
    }
  }
  return pieces.filter(Boolean).join(' ')
}

test('COV04 & COV05: Unit schema, block structures, and instructional text boundaries', () => {
  for (const unit of ALL_STUDY_UNITS) {
    unit.blocks.forEach((block, idx) => {
      validateBlock(block, idx, unit.id)
    })

    const nonProse = unit.blocks.filter((b) => !['lead', 'section', 'prose'].includes(b.type))
    assert.ok(nonProse.length >= 2, `Unit ${unit.id} has only ${nonProse.length} structured blocks (min 2)`)

    const text = extractInstructionalText(unit)
    const words = text.trim().split(/\s+/).filter(Boolean).length
    assert.ok(words >= 280, `Unit ${unit.id} has ${words} words, below 280 minimum`)
    assert.ok(words <= 1500, `Unit ${unit.id} has ${words} words, exceeds 1500 maximum`)
  }
})

test('COV06: Glossary contains >= 40 defined terms', () => {
  const terms = Object.values(GLOSSARY)
  assert.ok(terms.length >= 40, `Glossary has ${terms.length} terms (min 40)`)
  for (const item of terms) {
    assert.ok(item.term, 'Glossary item must have term')
    assert.ok(item.definition && item.definition.length > 10, `Glossary item ${item.term} definition too short`)
  }
})

test('VIS01: Exactly 23 constructive SVG diagrams are registered and accessible', () => {
  assert.equal(DIAGRAM_IDS.length, 23, 'Must register exactly 23 diagrams')
  const expected = [
    'diag-score-rounding',
    'diag-raw-to-band',
    'diag-9step-cycle',
    'diag-synonym-5gate',
    'diag-listening-timeline',
    'diag-listening-map-bellford',
    'diag-reading-5ops',
    'diag-claim-anatomy',
    'diag-tfng-logic',
    'diag-task1-4part-blueprint',
    'diag-task1-line-phases',
    'diag-pct-vs-points',
    'diag-task1-bar-static-dynamic',
    'diag-task1-pie-pair',
    'diag-task1-dual-visual',
    'diag-task1-map-before-after',
    'diag-task1-process-cycle',
    'diag-task2-3layers',
    'diag-task2-essay-structures',
    'diag-task2-paragraph-chain',
    'diag-gt-letter-registers',
    'diag-speaking-3parts',
    'diag-speaking-stress-contrast',
  ]
  for (const id of expected) {
    assert.ok(DIAGRAM_IDS.includes(id), `Missing diagram ${id}`)
  }
})

test('VIS03: Exactly 10 media slots are defined with valid transcripts', () => {
  const slots = Object.values(MEDIA_SLOTS)
  assert.equal(slots.length, 10, 'Must define exactly 10 media slots')
  const readySlots = slots.filter((s) => s.status === 'ready')
  const reservedSlots = slots.filter((s) => s.status === 'reserved')

  assert.equal(readySlots.length, 2, 'Exactly 2 ready media slots')
  assert.equal(reservedSlots.length, 8, 'Exactly 8 reserved media slots')

  for (const slot of slots) {
    assert.ok(slot.id, 'Media slot must have an id')
    assert.ok(slot.title, `Media slot ${slot.id} missing title`)
    assert.ok(slot.script && Array.isArray(slot.script.turns) && slot.script.turns.length > 0, `Media slot ${slot.id} missing script turns`)
  }
})

test('NOGAME01–03: Zero gamification tokens in curriculum units', () => {
  const bannedKeywords = /\b(streak|streaks|xp|leaderboard|badge|badges|confetti)\b/i
  for (const unit of ALL_STUDY_UNITS) {
    assert.ok(!bannedKeywords.test(unit.title), `Unit title contains gamification: ${unit.title}`)
    for (const b of unit.blocks) {
      if (b.type === 'lead') {
        assert.ok(!bannedKeywords.test(b.summary), `Lead summary has gamification in ${unit.id}`)
      }
    }
  }
})

test('ROUTING & GT SEPARATION: Study path generation and General Training isolation', () => {
  // Test study path generator
  assert.equal(ieltsStudyPath('home'), '/application/tests/ielts/home/study')
  assert.equal(ieltsStudyPath('reading', 'r-passage-map'), '/application/tests/ielts/reading/study?unit=r-passage-map')
  assert.equal(ieltsStudyPath('writing', 'w-t2-opinion-and-discussion'), '/application/tests/ielts/writing/study?unit=w-t2-opinion-and-discussion')

  // Test route parsing
  const parsed = parseRoute('#/application/tests/ielts/listening/study?unit=l-preview-period')
  assert.equal(parsed.area, 'listening')
  assert.equal(parsed.view, 'study')
  assert.equal(parsed.unit, 'l-preview-period')

  // Verify GT units are strictly categorized with track: 'gt'
  const gtUnits = ALL_STUDY_UNITS.filter((u) => u.track === 'gt')
  assert.equal(gtUnits.length, 4, 'Must have exactly 4 GT track units')
  const gtIds = gtUnits.map((u) => u.id)
  assert.ok(gtIds.includes('r-gt-reading-comparison'))
  assert.ok(gtIds.includes('w-gt-purpose-reader-register'))
  assert.ok(gtIds.includes('w-gt-structure-openings-details'))
  assert.ok(gtIds.includes('w-gt-conventions-informal-check'))
})
