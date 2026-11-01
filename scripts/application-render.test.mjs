import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { parseRoute } from '../src/web/learning.js'

// Compilation and data tests alone cannot detect a React render exception
// hidden behind the app's error boundary. Render real IELTS screens as a smoke test.
test('English Tests, IELTS directory, and individual skill pages render', { timeout: 45000 }, async () => {
  const originalWindow = globalThis.window
  const memory = new Map()
  globalThis.window = { localStorage: {
    getItem: key => memory.get(key) ?? null,
    setItem: (key,value) => memory.set(key,value),
  } }
  let vite
  try {
    vite = await createServer({ appType:'custom', server: { middlewareMode: true }, logLevel:'error' })
    const { default: IeltsCourse } = await vite.ssrLoadModule('/src/web/IeltsCourse.jsx')
    const { default: ToeicCourse } = await vite.ssrLoadModule('/src/web/ToeicCourse.jsx')
    for (const [hash, text] of [
      ['#/application/tests','English Tests'],
      ['#/application/tests/ielts/home/study','IELTS Academic'],
      ['#/application/tests/ielts/home/practice','IELTS Practice'],
      ['#/application/tests/ielts/mock/practice','Mock tests'],
      ['#/application/tests/ielts/guided/study','Guided test'],
      ['#/application/tests/ielts/simulation/practice','Simulated test'],
      ['#/application/tests/ielts/overview/study','Everything about IELTS'],
      ['#/application/tests/ielts/listening/study','Listening'],
      ['#/application/tests/ielts/reading/study','Reading'],
      ['#/application/tests/ielts/writing/study','Writing'],
      ['#/application/tests/ielts/speaking/study','Speaking'],
      ['#/application/tests/ielts/overview/study?unit=ov-how-to-read','How this study manual works'],
      ['#/application/tests/ielts/writing/study?unit=w-a1-line-bar-table','Line graphs, bar charts, and tables'],
      ['#/application/tests/ielts/reading/study?unit=r-gt-reading-comparison','General Training Reading'],
      ['#/application/tests/ielts/writing/practice','Writing'],
    ]) {
      const route = parseRoute(hash)
      assert.equal(route.page,'application',hash)
      const markup = renderToStaticMarkup(createElement(IeltsCourse,{route}))
      assert.ok(markup.length > 300, hash + ': empty HTML')
      assert.ok(markup.includes(text), hash + ': missing heading')
      if (hash === '#/application/tests') assert.ok(markup.includes('TOEIC Listening'), 'TOEIC should appear below IELTS')
      assert.ok(!markup.includes('This page could not be loaded'),hash)
    }
    for (const [area, expected] of [
      ['home', 'TOEIC Listening'],
      ['overview', 'Everything about TOEIC'],
      ['listening', 'Part 4: Short Talks'],
      ['reading', 'Part 7: Reading Comprehension'],
      ['mocks', 'Mock Tests'],
    ]) {
      const route = parseRoute('#/application/tests/toeic/' + area)
      const markup = renderToStaticMarkup(createElement(ToeicCourse, { route }))
      assert.ok(markup.includes(expected), area + ': TOEIC skeleton missing')
      assert.ok(markup.includes('English Tests'), area + ': breadcrumb missing')
    }
  } finally {
    await vite?.close()
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
  }
})


test('presentation course screens render across the full curriculum', { timeout: 45000 }, async () => {
  const originalWindow=globalThis.window
  const storage=new Map()
  globalThis.window={localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,val)=>storage.set(key,val)}}
  let vite
  try {
    vite=await createServer({appType:'custom',server:{middlewareMode:true},logLevel:'error'})
    const {default:PresentationCourse}=await vite.ssrLoadModule('/src/web/PresentationCourse.jsx')
    const {emptyLearning}=await vite.ssrLoadModule('/src/web/learning.js')
    for(const [hash,expected] of [
      ['#/application/presentations','Public speaking'],
      ['#/application/presentations/01/study','What makes a talk effective?'],
      ['#/application/presentations/02/study','Read the room'],
      ['#/application/presentations/04/practice','Half-Life Your Message'],
      ['#/application/presentations/10/study','Slides that make a point'],
      ['#/application/presentations/11/study','Data people can inspect'],
      ['#/application/presentations/13/study','Story, attention and ethical persuasion'],
      ['#/application/presentations/15/practice','Ask your listener these questions'],
      ['#/application/presentations/17/study','Q&A as dialogue'],
      ['#/application/presentations/18/study','Build, present and revise'],
      ['#/application/presentations/cases','Eight presentation situations'],
      ['#/application/presentations/blueprint','Your presentation blueprint'],
    ]){
      const route=parseRoute(hash)
      const html=renderToStaticMarkup(createElement(PresentationCourse,{route,learning:emptyLearning,update:()=>{}}))
      assert.ok(html.length>1200,hash+' has little content')
      assert.ok(html.includes(expected),hash+' missing heading '+expected)
      assert.ok(!html.includes('could not be loaded'),hash)
      if(hash==='#/application/presentations') {
        assert.ok(html.includes('22 VIDEOS'),'full source video index missing')
        assert.ok(html.includes('8 RESOURCES'),'original worksheets index missing')
      }
    }
  } finally {
    await vite?.close()
    if(originalWindow===undefined)delete globalThis.window
    else globalThis.window=originalWindow
  }
})
