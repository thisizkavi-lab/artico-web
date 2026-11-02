import test, { before, after, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { PassThrough } from 'node:stream'
import { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { createServer } from 'vite'

let vite, Application, LanguageProvider, parseRoute, applicationPath, applicationMode
const memory = new Map()
const originalWindow = globalThis.window
const storage = { getItem:key => memory.get(key) ?? null, setItem:(key,value) => memory.set(key,value), removeItem:key => memory.delete(key) }

before(async () => {
  globalThis.window = { localStorage:storage, location:{ hash:'#/home' } }
  vite = await createServer({ appType:'custom', server:{ middlewareMode:true }, logLevel:'error' })
  ;({ default:Application } = await vite.ssrLoadModule('/src/web/Application.jsx'))
  ;({ LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx'))
  ;({ parseRoute } = await vite.ssrLoadModule('/src/web/learning.js'))
  ;({ applicationPath, applicationMode } = await vite.ssrLoadModule('/src/web/applicationNavigation.js'))
})
beforeEach(() => { memory.clear(); memory.set('artico.explanation-language.v1','en') })
after(async () => { await vite?.close(); if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow })

function html(element) {
  return new Promise((resolve,reject) => {
    const output = new PassThrough(), chunks = []
    output.on('data', chunk => chunks.push(chunk))
    output.on('end', () => resolve(Buffer.concat(chunks).toString()))
    output.on('error', reject)
    const stream = renderToPipeableStream(createElement(LanguageProvider,null,element), {
      onAllReady:() => stream.pipe(output), onError:reject,
    })
  })
}
const render = (path, learning = { responses:{} }) => html(createElement(Application, { route:parseRoute('#' + path), learning, update:() => {} }))

test('all ten Application courses have one shared Study/Practice bar in both modes', { timeout:45000 }, async () => {
  for (const base of ['other-half','smalltalk','interviews','academic','presentations','writing','reading','ideas','tests/ielts','tests/toeic']) {
    for (const mode of ['study','practice']) {
      const path = '/application/' + base + '/home/' + mode
      const route = parseRoute('#' + path)
      assert.equal(route.page,'application',path)
      assert.equal(applicationMode(route),mode,path)
      const result = await render(path)
      assert.equal((result.match(/class="ac-mode-bar"/g) || []).length,1,path + ': exactly one bar')
      assert.ok(result.includes('>Study</') && result.includes('>Practice</'),path + ': both modes are named')
      assert.ok(result.includes('data-mode="' + mode + '"'),path + ': the active mode is correct')
      assert.ok(!result.includes('This page could not be loaded'),path)
      assert.ok(!/class="(?:st-tabs|ps-tabs|jc-switch|ie-modebar|rd-modebar)"/.test(result),path + ': no competing switch')
    }
  }
})

test('switching modes keeps the same chapter, lesson, reading, or writing prompt', async () => {
  for (const path of [
    '/application/other-half/11/study', '/application/other-half/introduction/study',
    '/application/smalltalk/07/study', '/application/interviews/5.4/study', '/application/academic/05.03/study',
    '/application/presentations/04/study', '/application/presentations/cases/study',
    '/application/writing/c12/study?prompt=c12-001&q=friend', '/application/reading/stories/study?text=red-umbrella',
    '/application/ideas/03/study', '/application/tests/ielts/reading/study', '/application/tests/toeic/listening/study',
  ]) {
    const study = parseRoute('#' + path), practice = parseRoute('#' + applicationPath(study,'practice'))
    assert.equal(practice.page,'application',path)
    assert.equal(applicationMode(practice),'practice',path)
    for (const key of ['id','exam','chapter','lesson','category','prompt','search','collection','text','area']) assert.equal(practice[key],study[key],path + ': ' + key)
    assert.equal(applicationPath(practice,'study'),path,path + ': round trip')
  }
})

test('every Small Talk lesson opens in both modes and keeps its mode in lesson navigation', async () => {
  for (let number = 1; number <= 12; number++) {
    for (const mode of ['study','practice']) {
      const id = String(number).padStart(2,'0')
      const result = await render('/application/smalltalk/' + id + '/' + mode)
      assert.ok(result.includes('<h1>'),id + '/' + mode + ': lesson opens')
      assert.ok(result.includes('data-mode="' + mode + '"'),id + '/' + mode)
      if (number < 12) assert.ok(result.includes('/smalltalk/' + String(number + 1).padStart(2,'0') + '/' + mode),id + ': next lesson keeps mode')
    }
  }
})

test('deep readers and workbooks render the shared controls as well as the course indexes', async () => {
  for (const destination of ['other-half/11','smalltalk/02','interviews/1.1','academic/01.01','presentations/01','presentations/guide','presentations/cases','presentations/blueprint','writing/c12','reading/everyday','ideas/03','tests/ielts/reading','tests/toeic/listening']) {
    for (const mode of ['study','practice']) {
      const path = '/application/' + destination + '/' + mode
      const result = await render(path)
      assert.equal((result.match(/class="ac-mode-bar"/g) || []).length,1,path)
      assert.ok(result.includes('<h1'),path + ': the content opens')
      assert.ok(result.includes('data-mode="' + mode + '"'),path)
    }
  }
})

test('Other Half has original recognition practice for every supplied chapter and its introduction', async () => {
  const { otherHalfChapters } = await vite.ssrLoadModule('/src/web/otherHalfContent.js')
  const { otherHalfPractice } = await vite.ssrLoadModule('/src/web/otherHalfPractice.js')
  const ids = new Set()
  for (const chapter of [...otherHalfChapters.filter(chapter => !chapter.missing).map(chapter => String(chapter.number).padStart(2,'0')), 'introduction']) {
    const practice = otherHalfPractice[chapter]
    assert.ok(practice?.questions.length >= 3,chapter)
    assert.ok(practice.reflection.length > 50,chapter)
    for (const question of practice.questions) {
      assert.ok(!ids.has(question.id),question.id); ids.add(question.id)
      assert.ok(question.answer >= 0 && question.answer < question.options.length,question.id)
      assert.ok(question.explanation.length > 40,question.id)
      assert.equal(new Set(question.options).size,question.options.length,question.id)
    }
  }
  assert.equal(otherHalfPractice['10'],undefined,'the missing chapter source is not invented')
  const study = await render('/application/other-half/11/study'), practice = await render('/application/other-half/11/practice')
  assert.ok(study.includes('Domain language and subcultural language'))
  assert.ok(practice.includes('efficient for insiders and unclear to newcomers'))
  assert.equal((practice.match(/<fieldset>/g) || []).length,3)
  assert.ok(!practice.includes('ac-practice-feedback'),'answers are not revealed before an attempt')
  assert.ok(practice.includes('Try it in your own situation'))
})

test('new practice answers and notes survive mode changes without accepting corrupt stored entries', async () => {
  const { cleanApplicationPractice, readApplicationPractice, APPLICATION_PRACTICE_KEY } = await vite.ssrLoadModule('/src/web/applicationPracticeState.js')
  const original = { version:1, answers:{ 'other-half-11-01':{ choice:1, checked:true }, 'bad.id':{ choice:0 }, 'toeic-invalid':{ choice:20 } }, notes:{ 'other-half-11':'My own domain example.', invalid:123 } }
  storage.setItem(APPLICATION_PRACTICE_KEY,JSON.stringify(original))
  const cleaned = readApplicationPractice(storage)
  assert.deepEqual(cleaned.answers,{ 'other-half-11-01':{ choice:1,checked:true } })
  assert.deepEqual(cleaned.notes,{ 'other-half-11':'My own domain example.' })
  const checked = await render('/application/other-half/11/practice')
  assert.ok(checked.includes('ac-practice-feedback'))
  assert.ok(checked.includes('My own domain example.'))
  assert.deepEqual(cleanApplicationPractice({ version:99 }),{ version:1,answers:{},notes:{} })
  assert.deepEqual(readApplicationPractice({ getItem:() => { throw new Error('blocked') } }),{ version:1,answers:{},notes:{} })
})

test('Writing has category-specific Study guidance and preserves the same prompt and saved draft in Practice', async () => {
  const { default:data } = await vite.ssrLoadModule('/src/web/writingPrompts.json')
  const { writingStudyGuides } = await vite.ssrLoadModule('/src/web/writingStudyGuides.js')
  const { WRITING_DRAFT_PREFIX } = await vite.ssrLoadModule('/src/web/writingDrafts.js')
  for (const category of data.categories) assert.ok(writingStudyGuides[category.id]?.[2].length > 100,category.id)
  const prompt = data.prompts.find(prompt => prompt.category === 'c12')
  storage.setItem(WRITING_DRAFT_PREFIX + prompt.id,'This is my original letter draft.')
  const study = await render('/application/writing/c12/study?prompt=' + prompt.id)
  const practice = await render('/application/writing/c12/practice?prompt=' + prompt.id)
  assert.ok(study.includes('A short example in this category'))
  assert.ok(study.includes('Read the task'))
  assert.ok(!study.includes('class="ws-textarea"'))
  assert.ok(practice.includes('This is my original letter draft.'))
  assert.ok(practice.includes('class="ws-textarea"'))
  assert.ok(practice.includes('/writing/c12/study?prompt=' + prompt.id))
  assert.equal((study.match(/<h1[ >]/g) || []).length,1)
  assert.equal((practice.match(/<h1[ >]/g) || []).length,1)
})

test('Jobs and Academic lesson routes expose the existing saved workbook in the matching Practice mode', async () => {
  const jobs = await render('/application/interviews/1.1/practice',{ responses:{ 'application-jobs-note-1.1':'My job reflection stays here.' } })
  assert.ok(jobs.includes('My job reflection stays here.'))
  assert.ok(jobs.includes('What is a job?'))
  storage.setItem('artico.web.academic.draft.v1.01.01','My longer academic draft stays here.')
  const academic = await render('/application/academic/01.01/practice')
  assert.ok(academic.includes('My longer academic draft stays here.'))
  assert.ok(academic.includes('Why academic writing exists'))
})

test('TOEIC Practice has original Listening, Reading and rehearsal tasks rather than an empty outline', async () => {
  const { toeicPractice } = await vite.ssrLoadModule('/src/web/toeicPractice.js')
  assert.equal(toeicPractice.listening.questions.length,4)
  assert.equal(toeicPractice.reading.questions.length,3)
  assert.ok(toeicPractice.listening.questions.every(question => question.audio))
  for (const area of ['overview','listening','reading','mocks']) {
    const result = await render('/application/tests/toeic/' + area + '/practice')
    assert.ok(result.includes('ac-practice-question'),area)
    assert.ok(!result.includes('ac-practice-feedback'),area + ': review follows the choice')
  }
})

test('the shared IELTS switch stays disabled during an active attempt', async () => {
  const { emptyIelts, makeAttempt, IELTS_STORAGE_KEY } = await vite.ssrLoadModule('/src/web/ieltsState.js')
  const { taskById } = await vite.ssrLoadModule('/src/web/ieltsContent.js')
  const task = taskById['l-workshop']
  const attempt = makeAttempt(task,{ id:'mode-guard-test', mode:'drill', timed:false })
  storage.setItem(IELTS_STORAGE_KEY,JSON.stringify({ ...emptyIelts(),attempts:[attempt] }))
  const result = await render('/application/tests/ielts/listening/practice?task=l-workshop&attempt=mode-guard-test')
  const bar = result.slice(result.indexOf('class="ac-mode-bar"'),result.indexOf('class="aw-page ie-page'))
  assert.equal((bar.match(/disabled=""/g) || []).length,2)
  assert.ok(bar.includes('Finish or leave this attempt'))
})

test('Application routes keep their own learning stage and sidebar instead of the last Social Fluency label', async () => {
  const { getLearningStage } = await vite.ssrLoadModule('/src/web/pathway.js')
  const { emptyLearning, sanitizeLearning, STORAGE_KEY } = await vite.ssrLoadModule('/src/web/learning.js')
  const path = '/application/other-half/11/practice'
  assert.equal(getLearningStage(path).id,'application')
  const saved = sanitizeLearning({ ...emptyLearning,last:path,lastPractice:path })
  assert.equal(saved.last,path); assert.equal(saved.lastPractice,path)
  storage.setItem(STORAGE_KEY,JSON.stringify({ ...emptyLearning,last:'/lesson/06/study' }))
  globalThis.window.location.hash = '#' + path
  const { default:ArticoWeb } = await vite.ssrLoadModule('/src/web/ArticoWeb.jsx')
  const result = await html(createElement(ArticoWeb))
  const sidebar = result.slice(result.indexOf('<aside'),result.indexOf('</aside>'))
  assert.ok(sidebar.includes('The Other Half of English'))
  assert.ok(sidebar.includes('Practice · Chapter 11'))
  assert.ok(!sidebar.includes('Chapter 06'))
})

test('blocked browser storage does not prevent opening the new Practice views or existing draft editors', async () => {
  Object.defineProperty(globalThis.window,'localStorage',{ configurable:true, get:() => { throw new Error('blocked') } })
  try {
    for (const path of ['/application/other-half/11/practice','/application/writing/c12/practice','/application/academic/01.01/practice']) {
      const result = await render(path)
      assert.ok(result.includes('<textarea'),path)
      assert.ok(result.includes('ac-mode-bar'),path)
    }
  } finally { Object.defineProperty(globalThis.window,'localStorage',{ configurable:true,writable:true,value:storage }) }
})
