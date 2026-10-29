#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const loadJSON = (relPath) => JSON.parse(readFileSync(resolve(ROOT, relPath), 'utf8'))

const organized = loadJSON('src/web/vocabularyOrganized.json')
const courseArt = loadJSON('src/web/vocabularyCourseArt.json')
const aToM = loadJSON('src/web/vocabularyJapaneseAM.json')
const nToZ = loadJSON('src/web/vocabularyJapaneseNZ.json')
const reviewed = loadJSON('src/web/vocabularyJapaneseOverrides.json')
const common = loadJSON('src/web/vocabularyJapaneseCommon.json')

const glossary = { ...aToM, ...nToZ, ...reviewed, ...common }

// Extract contextual map from vocabularySupport.js
const supportCode = readFileSync(resolve(ROOT, 'src/web/vocabularySupport.js'), 'utf8')
const contextualMatch = supportCode.match(/const contextual = Object\.freeze\(\{([\s\S]*?)\}\)/) ||
                        supportCode.match(/const contextual = \{([\s\S]*?)\}/)

const contextual = {}
if (contextualMatch) {
  const lines = contextualMatch[1].split('\n')
  for (const line of lines) {
    const m = line.match(/'([^']+)':\s*'([^']+)'/)
    if (m) contextual[m[1]] = m[2]
  }
}

function cleanJapanese(value) {
  if (!value || typeof value !== 'string') return ''
  const first = value.split(/[;；]/)[0].replace(/\([^)]{30,}\)/g, '').trim()
  return first.length > 66 ? '' : first
}

function getJapanese(term, lesson) {
  const exact = contextual[lesson + ':' + term]
  if (exact) return exact
  const choices = [
    term,
    term.replace(/^the /i, ''),
    term.split(' / ')[0],
    term.split(' / ')[0].replace(/\s*\([^)]*\)/g, ''),
    term.replace(/\s*\([^)]*\)/g, '')
  ]
  for (const text of choices) {
    const res = cleanJapanese(glossary[text])
    if (res) return res
  }
  return ''
}

const inventory = []
let totalEntries = 0

for (const lesson of organized.lessons) {
  const lessonNum = lesson.sourceLesson
  if (lessonNum < 3 || lessonNum > 78) continue
  const lessonTitle = lesson.title || ''

  for (let gIndex = 0; gIndex < lesson.groups.length; gIndex++) {
    const group = lesson.groups[gIndex]
    const groupName = group.name || `Group ${gIndex + 1}`
    const groupTerms = group.items.map(item => item[0])

    for (const item of group.items) {
      const term = item[0]
      const key = `${lessonNum}:${term.toLowerCase().trim()}`
      const siblings = groupTerms.filter(t => t !== term)
      const ja = getJapanese(term, lessonNum)
      const newArt = Boolean(courseArt.entries && courseArt.entries[key])

      inventory.push({
        key,
        lesson: lessonNum,
        lessonTitle,
        group: groupName,
        siblings,
        term,
        ja,
        newArt
      })
      totalEntries++
    }
  }
}

mkdirSync(resolve(ROOT, 'work/vocab-art'), { recursive: true })
const outPath = resolve(ROOT, 'work/vocab-art/inventory.json')
writeFileSync(outPath, JSON.stringify(inventory, null, 2), 'utf8')

console.log(`Generated inventory for ${totalEntries} entries across lessons 3–78 into ${outPath}`)
