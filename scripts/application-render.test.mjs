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
      ['#/application/presentations/17/study','Q&amp;A as dialogue'],
      ['#/application/presentations/18/study','Build, present and revise'],
      ['#/application/presentations/cases','Eight presentation situations'],
      ['#/application/presentations/blueprint','Your presentation blueprint'],
    ]){
      const route=parseRoute(hash)
      const html=renderToStaticMarkup(createElement(PresentationCourse,{route,learning:emptyLearning,update:()=>{}}))
      assert.ok(html.length>1200,hash+' has little content')
      assert.ok(html.includes(expected),hash+' missing heading '+expected)
      assert.ok(!html.includes('could not be loaded'),hash)
      if(hash==='#/application/presentations/blueprint') assert.ok(html.includes('Acknowledgements, funding, collaborators and image/source credits'),'acknowledgements field missing')
      if(hash==='#/application/presentations') {
        assert.ok(html.includes('22 CORE VIDEOS'),'full source video index missing')
        assert.ok(html.includes('8 RESOURCES'),'original worksheets index missing')
        assert.ok(html.includes('Good speaking improves through exchange.'),'module discussion prompts missing')
      }
    }
  } finally {
    await vite?.close()
    if(originalWindow===undefined)delete globalThis.window
    else globalThis.window=originalWindow
  }
})


test('The Other Half of English overview and source chapters render as a visual reference course', { timeout: 45000 }, async () => {
  let vite
  try {
    vite = await createServer({ appType:'custom', server:{ middlewareMode:true }, logLevel:'error' })
    const { default:OtherHalfCourse } = await vite.ssrLoadModule('/src/web/OtherHalfCourse.jsx')
    for (const [hash, expected] of [
      ['#/application/other-half', 'The Other Half'],
      ['#/application/other-half/01', 'The map of slang'],
      ['#/application/other-half/02', 'Slang in everyday use'],
      ['#/application/other-half/03', 'Adult &amp; explicit slang'],
      ['#/application/other-half/04', 'Register &amp; social calibration'],
      ['#/application/other-half/05', 'Meaning beyond words'],
      ['#/application/other-half/06', 'The grammar of conversation'],
      ['#/application/other-half/07', 'Humor, sarcasm &amp; playfulness'],
      ['#/application/other-half/08', 'Taboo language &amp; swearing'],
      ['#/application/other-half/09', 'Cultural references &amp; shared knowledge'],
      ['#/application/other-half/10', 'Source gap'],
      ['#/application/other-half/11', 'Language of domains &amp; subcultures'],
      ['#/application/other-half/12', 'How language changes'],
      ['#/application/other-half/13', 'Voice, gesture &amp; silence'],
    ]) {
      const route = parseRoute(hash)
      assert.equal(route.page, 'application', hash)
      assert.equal(route.id, 'other-half', hash)
      const markup = renderToStaticMarkup(createElement(OtherHalfCourse, { route }))
      if (hash === '#/application/other-half/10') {
        assert.ok(markup.length > 500, hash + ': missing-source state is empty')
        assert.ok(markup.includes('Source gap'), hash + ': missing-source state must be explicit')
        assert.ok(markup.includes('source set does not include its lesson text'), hash + ': do not invent the missing source chapter')
        assert.ok(markup.includes('Continue to Chapter 11'), hash + ': provide a safe navigation path')
      } else {
        assert.ok(markup.length > 900, hash + ': empty course screen')
      }
      assert.ok(markup.includes(expected), hash + ': missing heading or source-gap marker')
      assert.ok(!markup.includes('This page could not be loaded'), hash)
    }
    const overview = renderToStaticMarkup(createElement(OtherHalfCourse, { route:parseRoute('#/application/other-half') }))
    assert.ok(overview.includes('Recognition, not imitation.'), 'course purpose should be explicit')
    assert.ok(overview.includes('NOT IN THE SUPPLIED SOURCE'), 'missing Chapter 10 should be visible in the chapter map')
    const glossary = renderToStaticMarkup(createElement(OtherHalfCourse, { route:parseRoute('#/application/other-half/02') }))
    assert.ok(glossary.includes('oh-glossary-card'), 'slang reference tables should render as searchable cards')
    assert.ok(glossary.includes('SEARCH THE REFERENCE'), 'slang reference should expose its search control')
    assert.ok(!glossary.includes('href="##/application'), 'chapter navigation should not contain malformed double-hash links')
  } finally {
    await vite?.close()
  }
})
