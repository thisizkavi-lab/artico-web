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
      if (area !== 'home') assert.ok(markup.includes('English Tests'), area + ': breadcrumb missing')
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
      ['#/application/presentations/guide','What do you want to get better at?'],
      ['#/application/presentations/01/study','What makes a talk effective?'],
      ['#/application/presentations/02/study','Read the room'],
      ['#/application/presentations/04/practice','Half-Life Your Message'],
      ['#/application/presentations/10/study','Slides that make a point'],
      ['#/application/presentations/11/study','Data people can inspect'],
      ['#/application/presentations/13/study','Story, attention and ethical persuasion'],
      ['#/application/presentations/15/practice','Give your reviewer the context first.'],
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
      if(hash==='#/application/presentations/01/study') {
        assert.ok(html.includes('Source basis for this lesson'),'lesson source basis missing')
        assert.ok(html.includes('Open the full research and source library'),'lesson source link missing')
      }
      if(hash==='#/application/presentations/blueprint') assert.ok(html.includes('Acknowledgements, funding, collaborators and image/source credits'),'acknowledgements field missing')
      if(hash==='#/application/presentations/15/practice') {
        assert.ok(html.includes('Audience and purpose'),'review checklist missing audience criteria')
        assert.ok(html.includes('Feedback received'),'review notes are not connected to the saved blueprint')
        assert.ok(html.includes('Revision to make and retest'),'revision notes are not connected to the saved blueprint')
      }
      if(hash==='#/application/presentations/guide') {
        assert.ok(html.includes('My goal for this course'),'course-level learning goal missing')
        assert.ok(html.includes('What do you want to get better at?'),'course-level reflection prompt missing')
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
        assert.ok(markup.includes('chapter text is absent'), hash + ': do not invent the missing source chapter')
        assert.ok(markup.includes('Continue to Chapter 11'), hash + ': provide a safe navigation path')
      } else {
        assert.ok(markup.length > 900, hash + ': empty course screen')
      }
      assert.ok(markup.includes(expected), hash + ': missing heading or source-gap marker')
      assert.ok(!markup.includes('This page could not be loaded'), hash)
    }
    const overview = renderToStaticMarkup(createElement(OtherHalfCourse, { route:parseRoute('#/application/other-half') }))
    const introduction = renderToStaticMarkup(createElement(OtherHalfCourse, { route:parseRoute('#/application/other-half/introduction') }))
    assert.ok(introduction.includes('Recognition, not imitation.'), 'course introduction remains accessible')
    assert.ok(overview.includes('other-half/introduction'), 'directory links to the introduction')
    assert.ok(overview.includes('Chapter text not supplied'), 'missing Chapter 10 should be visible in the chapter map')
    const glossary = renderToStaticMarkup(createElement(OtherHalfCourse, { route:parseRoute('#/application/other-half/02') }))
    assert.ok(glossary.includes('oh-glossary-card'), 'slang reference tables should render as searchable cards')
    assert.ok(glossary.includes('SEARCH THE REFERENCE'), 'slang reference should expose its search control')
    assert.ok(!glossary.includes('href="##/application'), 'chapter navigation should not contain malformed double-hash links')
  } finally {
    await vite?.close()
  }
})

test('Application directories preserve course access with minimal navigation', { timeout:45000 }, async () => {
  const originalWindow = globalThis.window
  const storage = new Map([['artico.explanation-language.v1', 'en']])
  globalThis.window = { localStorage:{ getItem:key => storage.get(key) ?? null, setItem:(key,value) => storage.set(key,value) } }
  let vite
  try {
    vite = await createServer({ appType:'custom', server:{ middlewareMode:true }, logLevel:'error' })
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    const render = async (file, hash) => {
      const { default:Component } = await vite.ssrLoadModule('/src/web/' + file + '.jsx')
      return renderToStaticMarkup(createElement(LanguageProvider, null, createElement(Component, { route:parseRoute(hash), learning:{ responses:{} }, update:() => {} })))
    }
    for (const mode of ['study', 'practice']) {
      const html = await render('IeltsCourse', '#/application/tests/ielts/home/' + mode)
      assert.equal((html.match(/class="cn-card /g) || []).length, 6, 'IELTS has exactly the six requested choices')
      for (const area of ['listening','reading','writing','speaking']) assert.ok(html.includes('/' + area + '/' + mode), area + ' retains the requested mode')
      assert.ok(html.includes('/mock/practice'), 'Mock Tests remain accessible from Study and Practice')
      assert.ok(!html.includes('ie-modebar'), 'home has no redundant toolbar')
      assert.ok(!html.includes('ies-start'), 'home is navigation only')
    }
    const other = await render('OtherHalfCourse', '#/application/other-half')
    for (let number = 1; number <= 13; number++) assert.ok(other.includes('href="#/application/other-half/' + String(number).padStart(2,'0') + '"'), 'chapter ' + number + ' remains accessible')
    assert.equal((other.match(/<summary>/g) || []).length, 5, 'chapters are grouped into five branches')
    assert.ok(!other.includes('oh-cover'), 'no cover on the directory')
    const chapter = await render('OtherHalfCourse', '#/application/other-half/01')
    assert.ok(chapter.includes('In this chapter'), 'reader has local section navigation')
    assert.ok(!chapter.includes('oh-sidebar'), 'reader has no chapter sidebar')
    assert.ok(!chapter.includes('oh-mobile-nav'), 'reader has no duplicate mobile chapter list')
    const presentations = await render('PresentationCourse', '#/application/presentations')
    for (let number = 1; number <= 18; number++) assert.ok(presentations.includes('/presentations/' + String(number).padStart(2,'0') + '/study'), 'presentation lesson ' + number)
    for (const page of ['guide','cases','blueprint']) assert.ok(presentations.includes('/presentations/' + page), page + ' remains accessible')
    assert.ok(!presentations.includes('ps-cover'), 'presentation home is navigation only')
    const smallTalk = await render('SmallTalkCourse', '#/application/smalltalk')
    for (let number = 1; number <= 12; number++) assert.ok(smallTalk.includes('/smalltalk/' + String(number).padStart(2,'0') + '/practice'), 'Small Talk practice ' + number)
    assert.ok(smallTalk.includes('smalltalk-field-guide.html'), 'complete field guide is accessible')
    for (const [file, hash, label, count] of [
      ['JobsCourse', '#/application/interviews', 'All stages', 61],
      ['AcademicCourse', '#/application/academic', 'Course stages', 33],
    ]) {
      const html = await render(file, hash)
      assert.ok(html.includes('aria-label="' + label + '"'))
      assert.equal((html.match(/<li><button /g) || []).length, count, file + ' retains every lesson')
      assert.ok(!html.includes('jc-hero'), 'no large cover on ' + file)
    }
    const ideas = await render('IdeasCourse', '#/application/ideas')
    assert.equal((ideas.match(/class="cn-card /g) || []).length, 8, 'all eight Ideas lessons remain accessible')
    const reading = await render('ReadingCourse', '#/application/reading')
    assert.ok(reading.includes('/reading/saved/study'), 'saved vocabulary has its own destination')
    const writing = await render('WritingStudio', '#/application/writing')
    assert.ok(writing.includes('Writing categories'))
    assert.ok(writing.includes('My drafts'), 'saved writing has an explicit destination')
    assert.ok(!writing.includes('<textarea'), 'writing home is a directory rather than an open editor')
    const { Courses } = await vite.ssrLoadModule('/src/web/Library.jsx')
    const { applicationTracks } = await vite.ssrLoadModule('/src/web/applicationTracks.js')
    const entry = parseRoute('#/application')
    assert.deepEqual(entry, { path:'/courses?application', page:'courses' }, 'the old Application entry opens Learn')
    const learn = renderToStaticMarkup(createElement(LanguageProvider, null,
      createElement(Courses, { route:entry, learning:{ last:null } })))
    assert.match(learn, /aria-controls="rl-stage-panel-application" aria-expanded="true"/, 'Application is expanded on arrival')
    const panel = learn.match(/<div id="rl-stage-panel-application"[^>]*>/)?.[0]
    assert.ok(panel, 'the existing Application branch is present')
    assert.doesNotMatch(panel, /hidden/, 'the course choices are visible')
    for (const track of applicationTracks) assert.ok(learn.includes('href="#/application/' + track.id + '"'), track.id + ' is still reachable')
    assert.ok(!learn.includes('cn-directory'), 'there is no duplicate Application card directory')
  } finally {
    await vite?.close()
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
  }
})

test('breadcrumbs link to real parents across course and lesson routes', { timeout:45000 }, async () => {
  let vite
  try {
    vite = await createServer({ appType:'custom', server:{ middlewareMode:true }, logLevel:'error' })
    const { breadcrumbItems } = await vite.ssrLoadModule('/src/web/breadcrumbPaths.js')
    for (const [hash, parents] of [
      ['#/application/other-half/01', ['#/courses', '#/courses?application', '#/application/other-half']],
      ['#/application/tests/ielts/listening/study', ['#/courses', '#/courses?application', '#/application/tests', '#/application/tests/ielts/home/study']],
      ['#/application/presentations/guide', ['#/courses', '#/courses?application', '#/application/presentations']],
      ['#/lesson/06/study', ['#/courses', '#/courses?social']],
      ['#/foundation/letters/study', ['#/courses', '#/courses?foundation']],
      ['#/saved', ['#/progress']],
    ]) {
      const items = breadcrumbItems(parseRoute(hash))
      assert.deepEqual(items.slice(0,-1).map(item => item.href), parents, hash)
      assert.equal(items.at(-1).href, undefined, 'current location is not a redundant link')
      for (const parent of parents) assert.notEqual(parseRoute(parent).page, 'home', 'parent must not fall back to Home')
    }
    const ja = breadcrumbItems(parseRoute('#/application/other-half/01'), { language:'ja' })
    assert.equal(ja[1].label, '実践')
    assert.equal(ja[2].href, '#/application/other-half')
  } finally { await vite?.close() }
})
