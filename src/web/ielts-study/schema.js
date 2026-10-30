/**
 * Artico IELTS Study Course Schema & Validation Engine (`artico-ielts-study-v1`)
 * Enforces the 16-block schema, track discipline, and prerequisite DAG.
 */

import { DIAGRAM_IDS } from './diagramManifest.js'
import { MEDIA_SLOTS } from './mediaManifest.js'
import { WORD_BANKS } from './wordBanks.js'

export const STUDY_AREAS = ['overview', 'listening', 'reading', 'writing', 'speaking']
export const STUDY_TRACKS = ['academic', 'shared', 'gt']

export const BLOCK_TYPES = [
  'lead',
  'section',
  'prose',
  'callout',
  'steps',
  'comparisonTable',
  'trackCompare',
  'annotatedSpecimen',
  'contrastPair',
  'decisionTree',
  'svgDiagram',
  'mediaSlot',
  'wordBank',
  'mythBuster',
  'diagnosticCheck',
  'selfCheck',
  'workbookPrompt',
]

export const CALLOUT_VARIANTS = ['requirement', 'method', 'option', 'trap']
export const SPECIMEN_KINDS = ['passage', 'transcript', 'prompt', 'report', 'letter', 'essay', 'word-record', 'note-card']

export function validateBlock(block, index, unitId = 'unknown') {
  if (!block || typeof block !== 'object') {
    throw new Error(`Unit ${unitId} block[${index}] must be an object.`)
  }
  if (!BLOCK_TYPES.includes(block.type)) {
    throw new Error(`Unit ${unitId} block[${index}] has unknown type "${block.type}".`)
  }

  if (index === 0 && block.type !== 'lead') {
    throw new Error(`Unit ${unitId} blocks[0] must have type "lead", found "${block.type}".`)
  }

  switch (block.type) {
    case 'lead':
      if (!block.summary || typeof block.summary !== 'string') {
        throw new Error(`Unit ${unitId} lead block requires non-empty summary.`)
      }
      if (!block.whyItMatters || typeof block.whyItMatters !== 'string') {
        throw new Error(`Unit ${unitId} lead block requires non-empty whyItMatters.`)
      }
      if (!block.whatYouWillDo || typeof block.whatYouWillDo !== 'string') {
        throw new Error(`Unit ${unitId} lead block requires non-empty whatYouWillDo.`)
      }
      break

    case 'section':
      if (!block.id || typeof block.id !== 'string') {
        throw new Error(`Unit ${unitId} section block requires an id string.`)
      }
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} section block requires a title string.`)
      }
      break

    case 'prose':
      if (!Array.isArray(block.paragraphs) || block.paragraphs.length === 0) {
        throw new Error(`Unit ${unitId} prose block requires a non-empty paragraphs array.`)
      }
      break

    case 'callout':
      if (!CALLOUT_VARIANTS.includes(block.variant)) {
        throw new Error(`Unit ${unitId} callout block has invalid variant "${block.variant}".`)
      }
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} callout block requires a title string.`)
      }
      if (!block.body || typeof block.body !== 'string') {
        throw new Error(`Unit ${unitId} callout block requires a body string.`)
      }
      if (block.link !== undefined) {
        throw new Error(`Unit ${unitId} callout block must use sourceUrl and sourceLabel instead of link.`)
      }
      if (block.sourceUrl !== undefined && (typeof block.sourceUrl !== 'string' || !block.sourceUrl.startsWith('https://'))) {
        throw new Error(`Unit ${unitId} callout sourceUrl must be a valid https:// URL.`)
      }
      break

    case 'steps':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} steps block requires a title string.`)
      }
      if (!Array.isArray(block.items) || block.items.length < 2) {
        throw new Error(`Unit ${unitId} steps block requires at least 2 items.`)
      }
      for (let i = 0; i < block.items.length; i++) {
        const item = block.items[i]
        if (!item.action || typeof item.action !== 'string') {
          throw new Error(`Unit ${unitId} steps item[${i}] requires an action string.`)
        }
      }
      break

    case 'comparisonTable':
      if (!block.caption || typeof block.caption !== 'string') {
        throw new Error(`Unit ${unitId} comparisonTable requires a caption string.`)
      }
      if (!Array.isArray(block.headers) || block.headers.length < 2) {
        throw new Error(`Unit ${unitId} comparisonTable requires at least 2 headers.`)
      }
      if (!Array.isArray(block.rows) || block.rows.length < 1) {
        throw new Error(`Unit ${unitId} comparisonTable requires at least 1 row.`)
      }
      break

    case 'trackCompare':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} trackCompare requires a title string.`)
      }
      if (!block.academic || !Array.isArray(block.academic.points)) {
        throw new Error(`Unit ${unitId} trackCompare requires academic.points array.`)
      }
      if (!block.generalTraining || !Array.isArray(block.generalTraining.points)) {
        throw new Error(`Unit ${unitId} trackCompare requires generalTraining.points array.`)
      }
      break

    case 'annotatedSpecimen':
      if (!SPECIMEN_KINDS.includes(block.kind)) {
        throw new Error(`Unit ${unitId} annotatedSpecimen has invalid kind "${block.kind}".`)
      }
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} annotatedSpecimen requires a title string.`)
      }
      if (!Array.isArray(block.segments) || block.segments.length < 1) {
        throw new Error(`Unit ${unitId} annotatedSpecimen requires at least 1 segment.`)
      }
      for (let i = 0; i < block.segments.length; i++) {
        const seg = block.segments[i]
        if (!seg.id || typeof seg.id !== 'string' || !seg.label || typeof seg.label !== 'string') {
          throw new Error(`Unit ${unitId} annotatedSpecimen segment[${i}] requires explicit id and label strings.`)
        }
        if (!seg.text || !seg.note) {
          throw new Error(`Unit ${unitId} annotatedSpecimen segment[${i}] requires text and note.`)
        }
      }
      break

    case 'contrastPair':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} contrastPair requires a title string.`)
      }
      if (!block.weak || !block.weak.text || !block.weak.whyItFails) {
        throw new Error(`Unit ${unitId} contrastPair requires weak.text and weak.whyItFails.`)
      }
      if (!block.controlled || !block.controlled.text || !block.controlled.whyItWorks) {
        throw new Error(`Unit ${unitId} contrastPair requires controlled.text and controlled.whyItWorks.`)
      }
      break

    case 'decisionTree':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} decisionTree requires a title string.`)
      }
      if (!block.question || typeof block.question !== 'string') {
        throw new Error(`Unit ${unitId} decisionTree requires a question string.`)
      }
      if (!Array.isArray(block.branches) || block.branches.length < 2) {
        throw new Error(`Unit ${unitId} decisionTree requires at least 2 branches.`)
      }
      break

    case 'svgDiagram':
      if (!block.diagramId || typeof block.diagramId !== 'string') {
        throw new Error(`Unit ${unitId} svgDiagram requires a diagramId string.`)
      }
      if (!DIAGRAM_IDS.includes(block.diagramId)) {
        throw new Error(`Unit ${unitId} svgDiagram "${block.diagramId}" is not registered in DIAGRAM_IDS.`)
      }
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} svgDiagram requires a title string.`)
      }
      if (!block.caption || typeof block.caption !== 'string') {
        throw new Error(`Unit ${unitId} svgDiagram requires a caption string.`)
      }
      if (!block.alt || typeof block.alt !== 'string') {
        throw new Error(`Unit ${unitId} svgDiagram requires an alt string.`)
      }
      break

    case 'mediaSlot':
      if (!block.slotId || typeof block.slotId !== 'string') {
        throw new Error(`Unit ${unitId} mediaSlot requires a slotId string.`)
      }
      if (!MEDIA_SLOTS[block.slotId]) {
        throw new Error(`Unit ${unitId} mediaSlot "${block.slotId}" is not registered in MEDIA_SLOTS.`)
      }
      break

    case 'wordBank':
      if (!block.bankId || typeof block.bankId !== 'string') {
        throw new Error(`Unit ${unitId} wordBank requires a bankId string.`)
      }
      if (!WORD_BANKS[block.bankId]) {
        throw new Error(`Unit ${unitId} wordBank "${block.bankId}" is not registered in WORD_BANKS.`)
      }
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} wordBank requires a title string.`)
      }
      break

    case 'mythBuster':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} mythBuster requires a title string.`)
      }
      if (!Array.isArray(block.items) || block.items.length < 1) {
        throw new Error(`Unit ${unitId} mythBuster requires at least 1 item.`)
      }
      for (let i = 0; i < block.items.length; i++) {
        const it = block.items[i]
        if (!it.claim || typeof it.claim !== 'string' || !it.reality || typeof it.reality !== 'string') {
          throw new Error(`Unit ${unitId} mythBuster item[${i}] requires claim and reality strings.`)
        }
      }
      break

    case 'diagnosticCheck':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} diagnosticCheck requires a title string.`)
      }
      if (!block.prompt || typeof block.prompt !== 'string') {
        throw new Error(`Unit ${unitId} diagnosticCheck requires a prompt string.`)
      }
      if (!Array.isArray(block.options) || block.options.length < 2 || block.options.length > 4) {
        throw new Error(`Unit ${unitId} diagnosticCheck requires 2 to 4 options.`)
      }
      const correctCount = block.options.filter((o) => o.correct === true).length
      if (correctCount !== 1) {
        throw new Error(`Unit ${unitId} diagnosticCheck must have exactly 1 correct option (found ${correctCount}).`)
      }
      for (let i = 0; i < block.options.length; i++) {
        const opt = block.options[i]
        if (!opt.label || typeof opt.label !== 'string' || !opt.label.trim()) {
          throw new Error(`Unit ${unitId} diagnosticCheck option[${i}] requires a non-empty label string.`)
        }
        if (!opt.rationale || typeof opt.rationale !== 'string') {
          throw new Error(`Unit ${unitId} diagnosticCheck option[${i}] requires a rationale string.`)
        }
        const rWords = opt.rationale.trim().split(/\s+/).filter(Boolean).length
        if (rWords < 10) {
          throw new Error(`Unit ${unitId} diagnosticCheck option[${i}] rationale must have >= 10 words (got ${rWords}).`)
        }
      }
      break

    case 'selfCheck':
      if (!block.title || typeof block.title !== 'string') {
        throw new Error(`Unit ${unitId} selfCheck requires a title string.`)
      }
      if (!Array.isArray(block.items) || block.items.length < 2) {
        throw new Error(`Unit ${unitId} selfCheck requires at least 2 items.`)
      }
      break

    case 'workbookPrompt':
      if (!block.noteId || !/^study-[a-z0-9-]{3,60}$/.test(block.noteId)) {
        throw new Error(`Unit ${unitId} workbookPrompt noteId "${block.noteId}" must match /^study-[a-z0-9-]{3,60}$/.`)
      }
      if (!block.label || typeof block.label !== 'string') {
        throw new Error(`Unit ${unitId} workbookPrompt requires a label string.`)
      }
      break

    default:
      break
  }
  return true
}

export function validateUnit(unit) {
  if (!unit || typeof unit !== 'object') {
    throw new Error('Study unit must be an object.')
  }
  if (!unit.id || !/^[a-z0-9-]{3,60}$/.test(unit.id)) {
    throw new Error(`Unit id "${unit.id}" is invalid. Must be lowercase kebab-case.`)
  }
  if (!STUDY_AREAS.includes(unit.area)) {
    throw new Error(`Unit ${unit.id} has invalid area "${unit.area}". Must be one of ${STUDY_AREAS.join(', ')}.`)
  }
  if (!STUDY_TRACKS.includes(unit.track)) {
    throw new Error(`Unit ${unit.id} has invalid track "${unit.track}". Must be one of ${STUDY_TRACKS.join(', ')}.`)
  }
  if (!unit.partId || typeof unit.partId !== 'string') {
    throw new Error(`Unit ${unit.id} requires partId string.`)
  }
  if (!unit.partTitle || typeof unit.partTitle !== 'string') {
    throw new Error(`Unit ${unit.id} requires partTitle string.`)
  }
  if (!unit.title || typeof unit.title !== 'string') {
    throw new Error(`Unit ${unit.id} requires title string.`)
  }
  if (typeof unit.minutes !== 'number' || unit.minutes < 3 || unit.minutes > 15) {
    throw new Error(`Unit ${unit.id} minutes must be a number between 3 and 15 (got ${unit.minutes}).`)
  }
  if (!Array.isArray(unit.sourceSections) || unit.sourceSections.length === 0) {
    throw new Error(`Unit ${unit.id} sourceSections must be a non-empty array.`)
  }
  if (!Array.isArray(unit.needs)) {
    throw new Error(`Unit ${unit.id} needs must be an array of prerequisite unit IDs.`)
  }
  if (!Array.isArray(unit.blocks) || unit.blocks.length < 6) {
    throw new Error(`Unit ${unit.id} blocks must have at least 6 blocks (got ${unit.blocks ? unit.blocks.length : 0}).`)
  }

  unit.blocks.forEach((block, index) => validateBlock(block, index, unit.id))
  return true
}
