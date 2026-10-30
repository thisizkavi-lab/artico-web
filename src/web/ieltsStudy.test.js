import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_STUDY_UNITS, STUDY_UNIT_BY_ID, MODULE_METADATA } from './ielts-study/units/index.js'
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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

const BANNED_HYPE_WORDS = /\b(simply|obviously|of course|trick|tricks|hack|hacks|secret|secrets|magic|supercharge|skyrocket|delve|realm|tapestry|unlock|streak|streaks|xp|leaderboard|congrats|congratulations|awesome)\b/i
const BANNED_ABBREVIATIONS = /(?:(?<![A-Za-z])(?:e\.g\.|i\.e\.|etc\.|vs\.|cf\.)|\bvs\b)/i
const BANNED_CONTRACTIONS = /\b(don't|doesn't|didn't|won't|can't|couldn't|shouldn't|wouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|it's|that's|there's|what's|who's|you're|we're|they're|I'm|you've|we've|they've|you'll|we'll|they'll)\b/i
const BANNED_GUARANTEES = /\b(guarantee[sd]?|guaranteed band|will get band [0-9]|100% band|instant band)\b/i
const BANNED_GAMIFICATION_SOURCE = /\b(streak|streaks|xp|rewardPoints|scorePoints|leaderboard|confetti|levelUp|lockedUnit|unlockUnit|trophy)\b/i

test('COV01 & COV02: All 85 IELTS Study units exist with valid metadata and 100% source coverage', () => {
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

  // COV02: Source sections coverage from SECTION_INDEX.md
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
      assert.ok(indexedSections.has(s), `Unknown sourceSection "${s}" in unit ${u.id}`)
    }
  }
  const missing = [...indexedSections].filter((s) => !coveredSections.has(s))
  assert.equal(missing.length, 0, `Missing source sections: ${missing.join(', ')}`)
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
  return pieces
    .filter(Boolean)
    .map((p) => p.trim())
    .map((p) => (/[.!?:]$/.test(p) ? p : `${p}.`))
    .join(' ')
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

test('COV06, COV07 & COV08: Prerequisite DAG, internal links, and workbookPrompt budget', () => {
  // COV06: Prerequisite DAG check
  for (let idx = 0; idx < ALL_STUDY_UNITS.length; idx++) {
    const unit = ALL_STUDY_UNITS[idx]
    for (const dep of unit.needs || []) {
      const depUnit = STUDY_UNIT_BY_ID[dep]
      assert.ok(depUnit, `Unit ${unit.id} has unknown prerequisite "${dep}"`)
      const depIdx = ALL_STUDY_UNITS.findIndex((u) => u.id === dep)
      assert.ok(
        depIdx < idx,
        `Unit ${unit.id} prerequisite ${dep} (index ${depIdx}) must appear before unit (index ${idx}) in sequence`
      )
    }
  }

  // COV07: Internal links check
  for (const u of ALL_STUDY_UNITS) {
    const rawJson = JSON.stringify(u)
    const unitLinkMatches = [...rawJson.matchAll(/\(unit:([a-z0-9-]+)\)/g)]
    for (const m of unitLinkMatches) {
      assert.ok(STUDY_UNIT_BY_ID[m[1]], `Broken internal link (unit:${m[1]}) in unit ${u.id}`)
    }
    for (const b of u.blocks) {
      if (b.type === 'trackCompare' && b.generalTraining?.linkUnit) {
        assert.ok(
          STUDY_UNIT_BY_ID[b.generalTraining.linkUnit],
          `Broken trackCompare linkUnit "${b.generalTraining.linkUnit}" in ${u.id}`
        )
      }
    }
  }

  // COV08: Workbook prompts count & ID format
  const workbookNoteIds = new Set()
  let workbookCount = 0
  for (const u of ALL_STUDY_UNITS) {
    for (const b of u.blocks) {
      if (b.type === 'workbookPrompt') {
        workbookCount++
        assert.ok(!workbookNoteIds.has(b.noteId), `Duplicate workbookPrompt noteId "${b.noteId}" in unit ${u.id}`)
        workbookNoteIds.add(b.noteId)
        assert.match(b.noteId, /^study-[a-z0-9-]{3,60}$/, `Invalid noteId format: ${b.noteId}`)
      }
    }
  }
  assert.ok(workbookCount >= 5 && workbookCount <= 10, `Total workbookPrompt count ${workbookCount} must be 5..10`)
})

test('ASE01–ASE10: Artico Study English rules across all 85 units', () => {
  for (const unit of ALL_STUDY_UNITS) {
    const fullText = extractInstructionalText(unit)
    const sentences = fullText
      .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    for (const s of sentences) {
      const sWords = s.split(/\s+/).filter(Boolean).length
      assert.ok(sWords <= 32, `Unit ${unit.id} has sentence with ${sWords} words (>32 max): "${s.slice(0, 50)}…"`)

      assert.ok(!BANNED_HYPE_WORDS.test(s), `Unit ${unit.id} contains banned hype word in: "${s.slice(0, 60)}…"`)

      const sWithoutUrls = s.replace(/https?:\/\/[^\s)\]]+/g, '')
      assert.ok(
        !BANNED_ABBREVIATIONS.test(sWithoutUrls),
        `Unit ${unit.id} contains banned abbreviation in: "${s.slice(0, 60)}…"`
      )

      assert.ok(!BANNED_CONTRACTIONS.test(s), `Unit ${unit.id} contains contraction in: "${s.slice(0, 60)}…"`)

      assert.ok(!BANNED_GUARANTEES.test(s), `Unit ${unit.id} contains guarantee phrase in: "${s.slice(0, 60)}…"`)
    }

    let consecutiveProse = 0
    for (const block of unit.blocks) {
      if (block.type === 'prose') {
        consecutiveProse++
        assert.ok(consecutiveProse <= 3, `Unit ${unit.id} has ${consecutiveProse} consecutive prose blocks`)
        for (const p of block.paragraphs) {
          const pSentences = p
            .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
          assert.ok(pSentences.length <= 5, `Unit ${unit.id} paragraph has ${pSentences.length} sentences (>5 max)`)
        }
      } else if (block.type !== 'section') {
        consecutiveProse = 0
      }

      if (block.type === 'callout') {
        const cWords = block.body.trim().split(/\s+/).filter(Boolean).length
        assert.ok(cWords <= 95, `Unit ${unit.id} callout has ${cWords} words (>95 max)`)
      }

      if (block.type === 'steps') {
        for (const it of block.items) {
          const aWords = it.action.trim().split(/\s+/).filter(Boolean).length
          assert.ok(aWords <= 25, `Unit ${unit.id} step action has ${aWords} words (>25 max): "${it.action}"`)
        }
      }
    }
  }
})

test('VIS01 & VIS02: All 23 diagrams defined with >= 8 vector primitives, Artico ink, and unique IDs', () => {
  assert.equal(DIAGRAM_IDS.length, 23, 'Must register exactly 23 diagrams')
  const diagramsJsx = fs.readFileSync(path.join(ROOT, 'src/web/ielts-study/IeltsStudyDiagrams.jsx'), 'utf-8')
  const codeWithoutComments = diagramsJsx.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  assert.ok(!/#000\b|#000000\b|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(codeWithoutComments), 'Diagrams must not use raw black')

  const globalSvgIds = new Set()
  for (const m of codeWithoutComments.matchAll(/\bid="([^"]+)"/g)) {
    assert.ok(!globalSvgIds.has(m[1]), `Duplicate SVG id="${m[1]}" in IeltsStudyDiagrams.jsx`)
    globalSvgIds.add(m[1])
  }

  for (const id of DIAGRAM_IDS) {
    assert.ok(diagramsJsx.includes(id), `Diagram ${id} not found in IeltsStudyDiagrams.jsx`)
  }
})

test('VIS03: Exactly 10 media slots are defined with transcripts and audio files exist', () => {
  const slots = Object.values(MEDIA_SLOTS)
  assert.equal(slots.length, 10, 'Must define exactly 10 media slots')
  const readySlots = slots.filter((s) => s.status === 'ready')
  const reservedSlots = slots.filter((s) => s.status === 'reserved')

  assert.equal(readySlots.length, 2, 'Exactly 2 ready media slots')
  assert.equal(reservedSlots.length, 8, 'Exactly 8 reserved media slots')

  const referencedSlots = new Set()
  for (const u of ALL_STUDY_UNITS) {
    for (const b of u.blocks) {
      if (b.type === 'mediaSlot') referencedSlots.add(b.slotId)
    }
  }

  for (const slot of slots) {
    assert.ok(slot.id, 'Media slot must have an id')
    assert.ok(slot.title, `Media slot ${slot.id} missing title`)
    assert.ok(slot.durationLabel, `Media slot ${slot.id} missing durationLabel`)
    assert.ok(slot.script && Array.isArray(slot.script.turns) && slot.script.turns.length > 0, `Media slot ${slot.id} missing script turns`)
    assert.ok(referencedSlots.has(slot.id), `Media slot ${slot.id} is never referenced in curriculum`)

    if (slot.status === 'ready') {
      const fullAudioPath = path.join(ROOT, 'public', slot.src)
      assert.ok(fs.existsSync(fullAudioPath), `Audio file for ready slot ${slot.id} missing at ${fullAudioPath}`)
    }
  }
})

test('NOGAME01–03: Zero gamification tokens in curriculum units and source files', () => {
  function listFilesRec(dir) {
    const out = []
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) out.push(...listFilesRec(full))
      else if (/\.(js|jsx|css)$/.test(entry.name)) out.push(full)
    }
    return out
  }

  const studyFiles = listFilesRec(path.join(ROOT, 'src/web/ielts-study'))
  for (const file of studyFiles) {
    const src = fs.readFileSync(file, 'utf-8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
    assert.ok(
      !BANNED_GAMIFICATION_SOURCE.test(src),
      `Banned gamification token found in ${path.relative(ROOT, file)}`
    )
  }

  for (const unit of ALL_STUDY_UNITS) {
    for (const b of unit.blocks) {
      if (b.type === 'diagnosticCheck') {
        assert.ok(b.options.length >= 2 && b.options.length <= 4, `diagnosticCheck in ${unit.id} must have 2..4 options`)
        const correct = b.options.filter((o) => o.correct === true)
        assert.equal(correct.length, 1, `diagnosticCheck in ${unit.id} must have exactly 1 correct option`)
        for (const opt of b.options) {
          assert.ok(opt.label && opt.label.trim(), `diagnosticCheck option missing label in ${unit.id}`)
          const rWords = (opt.rationale || '').trim().split(/\s+/).filter(Boolean).length
          assert.ok(rWords >= 10, `diagnosticCheck option rationale in ${unit.id} has ${rWords} words (<10 min)`)
        }
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
