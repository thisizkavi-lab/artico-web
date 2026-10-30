/**
 * Artico IELTS Study Units Master Registry (`artico-ielts-study-v1`)
 * Connects all 85 modular units across the 5 Study Modules.
 */

import { overviewBasicsUnits } from './overview-basics'
import { overviewLanguageUnits } from './overview-language'
import { overviewPlanUnits } from './overview-plan'
import { listeningUnits } from './listening'
import { readingUnits } from './reading'
import { writingFoundationsUnits } from './writing-foundations'
import { writingAcademicTask1Units } from './writing-academic-task1'
import { writingTask2Units } from './writing-task2'
import { writingGtTask1Units } from './writing-gt-task1'
import { speakingUnits } from './speaking'

export const MODULE_METADATA = [
  {
    id: 'overview',
    num: '01',
    title: 'Everything about IELTS',
    icon: 'compass',
    fact: 'Assessment framework · Strategy · Language reference',
    scope: 'Understand the test format, official band scoring, preparation routines, and core language reference banks.',
    parts: [
      { id: 'ov-part-1-1', title: 'Part 1.1 · Test Architecture & Conditions', count: 6 },
      { id: 'ov-part-1-2', title: 'Part 1.2 · The Preparation Method', count: 6 },
      { id: 'ov-part-1-3', title: 'Part 1.3 · Reference Language Banks', count: 5 },
      { id: 'ov-part-1-4', title: 'Part 1.4 · Diagnosis, Plan & Quality Control', count: 4 },
    ],
  },
  {
    id: 'listening',
    num: '02',
    title: 'Listening',
    icon: 'ear',
    fact: '4 parts · 40 questions · ~30 min (+ 2 or 10 min entry)',
    scope: 'Follow meaning across 4 spoken contexts, navigate distractors, and track live self-corrections.',
    parts: [
      { id: 'l-part-2-1', title: 'Part 2.1 · Listening Architecture & Conditions', count: 2 },
      { id: 'l-part-2-2', title: 'Part 2.2 · The Core Listening Operations', count: 2 },
      { id: 'l-part-2-3', title: 'Part 2.3 · Question Families', count: 5 },
      { id: 'l-part-2-4', title: 'Part 2.4 · Execution, Error Recovery & Diagnosis', count: 2 },
    ],
  },
  {
    id: 'reading',
    num: '03',
    title: 'Reading',
    icon: 'book',
    fact: '3 sections · 40 questions · 60 min (no extra transfer time)',
    scope: 'Master the 5 reading operations, differentiate claims from silence, and navigate academic texts.',
    parts: [
      { id: 'r-part-3-1', title: 'Part 3.1 · Reading Architecture & Core Operations', count: 2 },
      { id: 'r-part-3-2', title: 'Part 3.2 · Truth, Views & Matching', count: 6 },
      { id: 'r-part-3-3', title: 'Part 3.3 · Completion, Tables & Diagrams', count: 5 },
      { id: 'r-part-3-4', title: 'Part 3.4 · [GT] General Training Reading Differences', count: 1, isGt: true },
    ],
  },
  {
    id: 'writing',
    num: '04',
    title: 'Writing',
    icon: 'pencil',
    fact: '2 tasks · 60 min shared clock (Task 2 has double weight)',
    scope: 'Report visual data objectively in Task 1, construct developed arguments in Task 2, and handle GT letters.',
    parts: [
      { id: 'w-part-4-1', title: 'Part 4.1 · Writing Foundations & Scoring Criteria', count: 4 },
      { id: 'w-part-4-2', title: 'Part 4.2 · Academic Task 1: Reporting Visuals', count: 12 },
      { id: 'w-part-4-3', title: 'Part 4.3 · Task 2: Academic & General Training Essays', count: 10 },
      { id: 'w-part-4-4', title: 'Part 4.4 · [GT] General Training Task 1: Letters', count: 3, isGt: true },
    ],
  },
  {
    id: 'speaking',
    num: '05',
    title: 'Speaking',
    icon: 'microphone',
    fact: '3 parts · 11–14 min face-to-face or video call interview',
    scope: 'Deliver direct answers in Part 1, speak for 2 minutes from notes in Part 2, and develop abstract ideas in Part 3.',
    parts: [
      { id: 's-part-5-1', title: 'Part 5.1 · Interview Architecture & Criteria', count: 1 },
      { id: 's-part-5-2', title: 'Part 5.2 · Three-Part Delivery & Strategy', count: 5 },
      { id: 's-part-5-3', title: 'Part 5.3 · Language Range, Phonology & Fluency', count: 2 },
      { id: 's-part-5-4', title: 'Part 5.4 · Diagnosis, Training & Repertoire', count: 2 },
    ],
  },
]

export const ALL_STUDY_UNITS = [
  ...overviewBasicsUnits,
  ...overviewLanguageUnits,
  ...overviewPlanUnits,
  ...listeningUnits,
  ...readingUnits,
  ...writingFoundationsUnits,
  ...writingAcademicTask1Units,
  ...writingTask2Units,
  ...writingGtTask1Units,
  ...speakingUnits,
]

export const STUDY_UNIT_BY_ID = ALL_STUDY_UNITS.reduce((acc, unit) => {
  acc[unit.id] = unit
  return acc
}, {})

export function getUnitsForArea(area) {
  return ALL_STUDY_UNITS.filter((u) => u.area === area)
}

export function getDefaultUnitForArea(area) {
  const areaUnits = getUnitsForArea(area)
  return areaUnits[0] ?? null
}

export function getNextUnit(unitId) {
  const index = ALL_STUDY_UNITS.findIndex((u) => u.id === unitId)
  if (index === -1 || index === ALL_STUDY_UNITS.length - 1) return null
  return ALL_STUDY_UNITS[index + 1]
}

export function getPrevUnit(unitId) {
  const index = ALL_STUDY_UNITS.findIndex((u) => u.id === unitId)
  if (index <= 0) return null
  return ALL_STUDY_UNITS[index - 1]
}
