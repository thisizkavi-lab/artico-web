import test from 'node:test'
import assert from 'node:assert/strict'
import {
  presentationLessons as lessons,
  presentationCases as cases,
  presentationSituations as situations,
  presentationBlueprintFields as fields,
  presentationSources as sources,
} from './presentationCourseData.js'
import { parseRoute, sanitizeLearning } from './learning.js'

test('Presentation course is complete and covers contrasting purposes', () => {
  assert.equal(lessons.length, 15)
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length)
  assert.ok(lessons.every(lesson =>
    lesson.title && lesson.rule && lesson.teach && lesson.before && lesson.after &&
    lesson.practice && lesson.contrast && lesson.criteria.length >= 2 &&
    lesson.options.length === 3 && lesson.options[lesson.answer]
  ))
  assert.ok(cases.length >= 6)
  for(const item of cases) {
    assert.ok(item.audience && item.purpose && item.message && item.logic.length >= 4)
    assert.ok(item.opening && item.evidence && item.visual && item.limits && item.ending && item.question && item.revise)
  }
  assert.ok(cases.some(item => item.id === 'science' && item.evidence.includes('ILLUSTRATIVE')))
  assert.ok(situations.length >= 10)
  assert.ok(fields.length >= 12)
  assert.ok(sources.some(item => item.title.includes('iBiology')))
  assert.ok(sources.every(item => /^https:\/\//.test(item.url)))
})
test('Presentation routes preserve study, practice, cases and blueprint', () => {
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
test('Presenter drafts survive local learning sanitization', () => {
  const responses={
    'application-presentations-context':'science',
    'application-presentations-blueprint-science-message':'The takeaway is clear.',
    'application-presentations-blueprint-custom-audience':'My lab group',
    'application-presentations-note-01':'First practice draft.',
    'application-presentations-done-01':'yes',
    'application-presentations-blueprint-science-injected-field':'should be filtered',
  }
  const state=sanitizeLearning({version:1,responses,last:'/application/presentations/01/study'})
  assert.equal(state.last,'/application/presentations/01/study')
  for(const [key,value] of Object.entries(responses)) {
    if(key.endsWith('injected-field'))assert.equal(state.responses[key],undefined)
    else assert.equal(state.responses[key],value)
  }
})
