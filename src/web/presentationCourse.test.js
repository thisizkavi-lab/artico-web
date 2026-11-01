import test from 'node:test'
import assert from 'node:assert/strict'
import {
  presentationLessons as lessons,
  presentationCases as cases,
  presentationSituations as situations,
  presentationBlueprintFields as fields,
  presentationSources as sources,
  presentationSourceVideos as videos,
  presentationWorksheets as worksheets,
} from './presentationCourseData.js'
import { parseRoute, sanitizeLearning } from './learning.js'

test('Research-led curriculum has complete lesson, case and source coverage', () => {
  assert.equal(lessons.length, 18)
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length)
  assert.ok(lessons.every(lesson =>
    lesson.title && lesson.goal && lesson.rule && lesson.teach &&
    lesson.before && lesson.after && lesson.note && lesson.contrast &&
    lesson.practice && lesson.criteria.length >= 3 &&
    lesson.options.length === 3 && lesson.options[lesson.answer] &&
    lesson.sourceBasis
  ))
  assert.deepEqual([...new Set(lessons.map(x=>x.part))],['FRAME','ARCHITECT','RENDER','DELIVER & LEARN'])
  assert.equal(cases.length,8)
  for(const item of cases) {
    assert.ok(item.audience && item.purpose && item.message && item.logic.length >= 5)
    assert.ok(item.opening && item.evidence && item.visual && item.limits && item.ending && item.question && item.revise)
  }
  assert.ok(cases.some(item => item.id === 'science' && item.evidence.includes('SYNTHETIC')))
  assert.equal(videos.length,22)
  assert.equal(worksheets.length,8)
  assert.equal(fields.length,26)
  assert.ok(situations.length >= 10)
  assert.ok(sources.some(item => item.title.includes('iBiology')))
  assert.ok(sources.some(item => item.title.includes('Mayer')))
  assert.ok(sources.some(item => item.title.includes('ASA')))
  assert.ok(sources.every(item => /^https:\/\//.test(item.url)))
  assert.ok(videos.every(item => /^https:\/\//.test(item.video) && /^https:\/\//.test(item.transcript)))
  assert.ok(worksheets.every(item => /^https:\/\//.test(item.url)))
})
test('Presentation routes preserve all study, practice, cases and blueprint pages', () => {
  for(const lesson of lessons) {
    for(const mode of ['study','practice']) {
      const path='/application/presentations/' + lesson.id + '/' + mode
      assert.deepEqual(parseRoute('#'+path), {path,page:'application',id:'presentations',lesson:lesson.id,mode})
    }
  }
  for(const lesson of ['blueprint','cases']) {
    const path='/application/presentations/'+lesson
    assert.deepEqual(parseRoute('#'+path),{path,page:'application',id:'presentations',lesson})
  }
  assert.equal(parseRoute('#/application/presentations/99/study').page,'application')
  assert.equal(parseRoute('#/application/presentations/99/study').id,undefined)
})
test('Presenter drafts and Half-Life rounds survive local learning sanitization', () => {
  const responses={
    'application-presentations-context':'science',
    'application-presentations-blueprint-science-message':'The takeaway is clear.',
    'application-presentations-blueprint-custom-audienceNeeds':'My lab group needs a method-level explanation.',
    'application-presentations-half-life-60':'The one-minute version.',
    'application-presentations-half-life-8':'The short version.',
    'application-presentations-note-18':'Capstone reflection.',
    'application-presentations-done-18':'yes',
    'application-presentations-blueprint-science-injected-field':'should be filtered',
  }
  const state=sanitizeLearning({version:1,responses,last:'/application/presentations/18/study'})
  assert.equal(state.last,'/application/presentations/18/study')
  for(const [key,value] of Object.entries(responses)) {
    if(key.endsWith('injected-field'))assert.equal(state.responses[key],undefined)
    else assert.equal(state.responses[key],value)
  }
})
