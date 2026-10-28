import test from 'node:test'
import assert from 'node:assert/strict'
import { ideasLessons, ideasLesson, ideasPath } from './ideasContent.js'
import { parseRoute, visit, emptyLearning } from './learning.js'

test('Ideas & Expression has eight distinct lessons and useful study/practice material', () => {
  assert.deepEqual(ideasLessons.map((lesson) => lesson.id), ['01','02','03','04','05','06','07','08'])
  const tasks = ideasLessons.flatMap((lesson) => lesson.tasks)
  assert.equal(tasks.length,17)
  assert.equal(new Set(tasks.map((task) => task.id)).size,tasks.length)
  for (const lesson of ideasLessons) {
    assert.ok(lesson.title && lesson.goal && lesson.intro)
    assert.ok(lesson.principles.length >= 3)
    assert.ok(lesson.example.steps.length >= 3)
    assert.ok(lesson.example.final)
    assert.ok(lesson.frames.length >= 3)
    for (const task of lesson.tasks) {
      assert.ok(task.id.startsWith(lesson.id + '-'))
      assert.ok(task.prompt.length > 40)
      assert.equal(task.checks.length,3)
      assert.ok(['speak','write'].includes(task.kind))
      if (task.kind === 'speak') assert.ok(task.seconds >= 30)
    }
  }
  assert.equal(ideasLesson('08').tasks.length,3)
})

test('Ideas routes preserve Study/Practice and deep-linked practice tasks', () => {
  const study=parseRoute('#' + ideasPath('01','study'))
  assert.equal(study.page,'application')
  assert.equal(study.id,'ideas')
  assert.equal(study.lesson,'01')
  assert.equal(study.mode,'study')
  const practice=parseRoute('#' + ideasPath('08','practice','08-c'))
  assert.equal(practice.mode,'practice')
  assert.equal(practice.task,'08-c')
  assert.equal(practice.path,'/application/ideas/08/practice?task=08-c')
  const bad=parseRoute('#/application/ideas/08/practice?task=01-a')
  assert.equal(bad.task,undefined)
  const home=parseRoute('#/application/ideas')
  assert.equal(home.id,'ideas')
  assert.equal(home.lesson,undefined)
})

test('Ideas Study/Practice pages are valid resume locations', () => {
  const lesson=ideasPath('02','study')
  const practice=ideasPath('02','practice','02-b')
  const afterStudy=visit(emptyLearning, lesson)
  assert.equal(afterStudy.last,lesson)
  const afterPractice=visit(afterStudy,practice)
  assert.equal(afterPractice.last,practice)
  assert.equal(afterPractice.lastPractice,practice)
})
