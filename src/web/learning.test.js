import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import {
  emptyLearning,
  loadLearning,
  parseRoute,
  sanitizeLearning,
  shouldShowLanding,
  toggleSaved,
  visit,
} from './learning.js'
import { getFoundationNavigation, getLearningStage, getLessonNavigation, learningStages } from './pathway.js'
import { applicationTracks, applicationResponseKey } from './applicationTracks.js'

test('the public entry welcomes new guests without blocking returning learners or direct lesson links', () => {
  const returning = visit(emptyLearning, '/lesson/02/practice/friend')
  for (const hash of ['', '#', '#/', '#/?ref=shared']) {
    assert.equal(shouldShowLanding(hash, emptyLearning), true)
    assert.equal(shouldShowLanding(hash, returning), false)
  }
  for (const hash of ['#/home', '#/courses?foundation', '#/lesson/02/practice/friend', '#course']) {
    assert.equal(shouldShowLanding(hash, emptyLearning), false)
  }
  assert.equal(shouldShowLanding('#/landing', returning), true)
  assert.equal(shouldShowLanding('#/landing/', emptyLearning), true)
  assert.equal(shouldShowLanding('', loadLearning({ getItem: () => '{bad json' })), true)
})

test('the learning path crosses stage boundaries without skipping a foundation or trapping the last lesson', () => {
  const steps = learningStages.flatMap((stage) => stage.lessonIds)
  assert.equal(new Set(steps).size, steps.length)
  assert.equal(getFoundationNavigation('orientation').previous, '/home')
  assert.equal(getFoundationNavigation('how-it-works').next, '/foundation/letters/study')
  assert.equal(getFoundationNavigation('letters').previous, '/foundation/how-it-works/study')
  assert.equal(getFoundationNavigation('lr').next, '/lesson/01/study')
  steps.slice(0, -1).forEach((id, index) => {
    const next = getFoundationNavigation(id).next
    assert.equal(parseRoute(`#${next}`).id, steps[index + 1])
    assert.equal(parseRoute(`#${next}`).view, 'study')
  })
  assert.equal(getFoundationNavigation('not-a-lesson'), null)
})
test('new guests start at Orientation and returning guests keep their actual study or practice stage', () => {
  const cases = [
    [null, 'orientation'],
    ['/foundation/how-it-works/study', 'orientation'],
    ['/foundation/letters/study', 'foundation'],
    ['/foundation/lr/chunks', 'foundation'],
    ['/foundation/lr/whole', 'foundation'],
    ['/lesson/02/practice/friend', 'social'],
    ['/lesson/96/study', 'social'],
  ]
  cases.forEach(([path, stage]) => {
    assert.equal((getLearningStage(path) ?? learningStages[0]).id, stage)
  })
  assert.equal(parseRoute(`#${learningStages[0].start}`).id, 'orientation')
})

test('all 104 lessons have a reversible path from Orientation through Chapter 96 in both modes', () => {
  const chapters = JSON.parse(readFileSync(new URL('../course/catalog.json', import.meta.url)))
  const routes = [
    ...learningStages.flatMap((stage) => stage.lessonIds).map((id) => `/foundation/${id}/study`),
    ...chapters.map((chapter) => `/lesson/${chapter.id}/study`),
  ]
  assert.equal(routes.length, 104)
  assert.equal(new Set(routes).size, routes.length)
  routes.forEach((path, index) => {
    const route = parseRoute(`#${path}`)
    const navigation = getLessonNavigation(route)
    assert.equal(navigation.previous, routes[index - 1] ?? '/home', path)
    assert.equal(navigation.next, routes[index + 1] ?? '/lesson/97/study', path)
    const practice = parseRoute(`#${navigation.practice}`)
    assert.equal(practice.id, route.id)
    assert.equal(practice.page, route.page)
    assert.notEqual(practice.view, 'study')
    assert.deepEqual(getLessonNavigation(practice), navigation)
    if (index < routes.length - 1) {
      assert.equal(getLessonNavigation(parseRoute(`#${navigation.next}`)).previous, path)
    }
  })
  for (const view of ['reader', 'words', 'phrases']) {
    assert.equal(getLessonNavigation(parseRoute(`#/lesson/02/${view}/friend`)).next, '/lesson/03/study')
  }
  assert.equal(getLessonNavigation({ page: 'lesson', id: '97' }), null)
  assert.equal(getLessonNavigation({ page: 'lesson', id: '2' }), null)
  assert.equal(getLessonNavigation({ page: 'foundation', id: 'unknown' }), null)
  assert.equal(getLessonNavigation({ page: 'home' }), null)
})

test('guest progress survives a storage round trip with the selected phrase and reading position', () => {
  const learning = {
    ...emptyLearning,
    last: '/lesson/02/practice/friend',
    lastPractice: '/lesson/02/practice/friend',
    indices: { friend: 1 },
    positions: { '/lesson/96/study': 780 },
    saved: ['friend-1'],
    mode: 'repeat',
    speed: 0.9,
    soundSpeed: 1,
  }
  assert.deepEqual(loadLearning({ getItem: () => JSON.stringify(learning) }), learning)
  assert.equal(visit(learning, '/home').last, learning.last)
  assert.equal(visit(learning, '/foundation/lr/whole').last, '/foundation/lr/whole')
  assert.equal(visit(learning, '/lesson/02/words/first').lastPractice, '/lesson/02/practice/friend')
})
test('unavailable and corrupt storage cannot prevent starting as a guest', () => {
  assert.deepEqual(
    loadLearning({
      getItem: () => {
        throw new Error('disabled')
      },
    }),
    emptyLearning,
  )
  assert.deepEqual(loadLearning({ getItem: () => '{broken' }), emptyLearning)
  const restored = sanitizeLearning({
    version: 1,
    last: '/lesson/999/study',
    indices: { first: 5, lr: 1 },
    positions: { '/lesson/02/study/first': -2, '/lesson/01/study': 120 },
    saved: ['first-1', 'first-1', 42],
    speed: 20,
  })
  assert.equal(restored.last, null)
  assert.deepEqual(restored.indices, { lr: 1 })
  assert.deepEqual(restored.positions, { '/lesson/01/study': 120 })
  assert.deepEqual(restored.saved, ['first-1'])
  assert.equal(restored.speed, 1)
})
test('old course URLs, Foundation links, and all 96 chapter URLs resolve', () => {
  assert.equal(parseRoute('#course').page, 'courses')
  assert.equal(parseRoute('#/courses?foundation').page, 'courses')
  assert.equal(parseRoute('#/lesson/02/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/01/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/02/practice/friend').scene, 'friend')
  assert.equal(
    parseRoute('#/lesson/02/practice/first?phrase=phrase-coworker').phrase,
    'phrase-coworker',
  )
  assert.equal(parseRoute('#/foundation/lr/chunks').view, 'chunks')
  assert.equal(parseRoute('#/lesson/97/study').page, 'vocabulary')
  assert.equal(parseRoute('#/lesson/02/practice?line=ch02-line3').line, 'ch02-line3')
  assert.equal(parseRoute('#/lesson/02/practice?line=ch03-line3').line, undefined)
  assert.equal(
    visit(emptyLearning, '/lesson/02/practice?line=ch02-v1').lastPractice,
    '/lesson/02/practice?line=ch02-v1',
  )
  assert.equal(parseRoute('#/%invalid').page, 'home')
  for (let number = 1; number <= 96; number++)
    assert.equal(parseRoute(`#/lesson/${String(number).padStart(2, '0')}/study`).page, 'lesson')
})
test('saving and unsaving phrases is reversible and never duplicates a saved item', () => {
  assert.deepEqual(toggleSaved(['first-0'], 'first-1'), ['first-0', 'first-1'])
  assert.deepEqual(toggleSaved(['first-0', 'first-1'], 'first-0'), ['first-1'])
})
test('new chapter phrase selection and saved text survive reload without accepting arbitrary stored objects', () => {
  const stored = {
    ...emptyLearning,
    indices: { 'chapter-94': 8 },
    responses: { 'ch94-b15-0': 'I’m running ten minutes late.', invalid: 'discard' },
    saved: ['ch94-line13'],
    savedDetails: {
      'ch94-line13': {
        id: 'wrong',
        en: 'Traffic’s barely moving.',
        ja: '車がほとんど進みません。',
        chapter: '94',
        extra: 'discard',
      },
    },
  }
  const restored = sanitizeLearning(stored)
  assert.deepEqual(restored.indices, { 'chapter-94': 8 })
  assert.deepEqual(restored.responses, { 'ch94-b15-0': 'I’m running ten minutes late.' })
  assert.deepEqual(restored.savedDetails['ch94-line13'], {
    id: 'ch94-line13',
    en: 'Traffic’s barely moving.',
    ja: '車がほとんど進みません。',
    chapter: '94',
  })
  assert.deepEqual(sanitizeLearning({ ...stored, saved: [] }).savedDetails, {})
})
test('the web course includes every original chapter, study and practice, without local editorial paths', () => {
  const directory = new URL('../course/chapters/', import.meta.url)
  const catalog = JSON.parse(
    readFileSync(new URL('../course/catalog.json', import.meta.url), 'utf8'),
  )
  assert.equal(catalog.length, 96)
  assert.equal(readdirSync(directory).filter((file) => file.endsWith('.md')).length, 96)
  catalog.forEach((chapter, index) => {
    assert.equal(chapter.id, String(index + 1).padStart(2, '0'))
    const text = readFileSync(new URL(chapter.filename, directory), 'utf8')
    assert.match(text, /^## Study/m, chapter.filename)
    assert.match(text, /^## Practice/m, chapter.filename)
    assert.doesNotMatch(text, /\/Users\//, chapter.filename)
  })
})


test('Home is restored while lesson, Learn and Progress routes keep working', () => {
  for (const hash of ['#/home', '#/home/', '#', '#/'])
    assert.equal(parseRoute(hash).page, 'home')
  assert.equal(parseRoute('#/home').path, '/home')
  assert.equal(parseRoute('#/courses?orientation').page, 'home')
  assert.equal(parseRoute('#/courses?foundation').page, 'courses')
  assert.equal(parseRoute('#/courses?social').page, 'courses')
  assert.equal(parseRoute('#/courses?application').page, 'courses')
  assert.equal(parseRoute('#/progress').page, 'progress')
  const continued = visit(emptyLearning, '/foundation/how-it-works/practice')
  assert.equal(continued.last, '/foundation/how-it-works/practice')
  assert.equal(visit(continued, '/home').last, continued.last)
})

test('Home has four functional starting points, including Application', () => {
  const shell = readFileSync(new URL('./ArticoWeb.jsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8')
  const progress = readFileSync(new URL('./Progress.jsx', import.meta.url), 'utf8')
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  assert.match(shell, /id: 'home', label: 'Home'/)
  assert.match(shell, /id: 'courses', label: 'Learn'/)
  assert.match(shell, /id: 'progress', label: 'Progress'/)
  assert.match(shell, /route.page === 'application'/)
  assert.match(shell, /<Application route=\{route\}/)
  assert.match(shell, /href="#\/home" aria-label=\{t\("Home"\)\}/)
  assert.match(progress, /aw-progress-resume/)
  assert.match(landing, /al-wordmark artico-wordmark" href="#\/home"/)
  assert.equal((home.match(/id:'(?:orientation|foundation|social|application)'/g) ?? []).length, 4)
  for(const href of ['#/foundation/orientation/study', '#/courses?foundation', '#/courses?social', '#/application'])
    assert.ok(home.includes("href:'" + href + "'"), href)
  assert.doesNotMatch(home, /Unlock|lock-icon|disabled button/i)
})

test('Learn keeps Foundations and Social Fluency and expands ten Application tracks', () => {
  const library = readFileSync(new URL('./Library.jsx', import.meta.url), 'utf8')
  const style = readFileSync(new URL('./library-readable.css', import.meta.url), 'utf8')
  const catalog = JSON.parse(readFileSync(new URL('../course/catalog.json', import.meta.url), 'utf8'))
  assert.equal(catalog.length, 96)
  assert.match(library, /learningStages\.filter\(stage => stage\.id !== 'orientation'\)/)
  assert.match(library, /learnStages\.map\(\(stage, index\) =>/)
  assert.match(library, /applicationTracks\.map\(\(track,i\) =>/)
  assert.match(library, /href=\{'#\/application\/' \+ track\.id\}/)
  assert.match(library, /aria-controls="rl-stage-panel-application"/)
  assert.match(library, /href=\{'#\/foundation\/' \+ id \+ '\/study'\}/)
  assert.match(library, /href=\{'#\/lesson\/' \+ chapter\.id \+ '\/study'\}/)
  assert.match(library, /className="rl-vertical-group-tree"/)
  assert.match(library, /hidden=\{!open\}/)
  assert.match(library, /hidden=\{!groupOpen\}/)
  assert.match(library, /chapter\.goalJa/)
  assert.match(style, /\.rl-vertical-lesson::before/)
  assert.doesNotMatch(library, /Apex Communicator|Unlock|Coming later/)
})

test('all ten Application tracks have usable, bilingual practice tasks and valid deep links', () => {
  const ids = ['tests','smalltalk','interviews','presentations','academic','storytelling','humor','writing','reading','ideas']
  assert.deepEqual(applicationTracks.map(track=>track.id), ids)
  assert.equal(parseRoute('#/application').page, 'application')
  assert.equal(parseRoute('#/application/unknown').path, '/application')
  for(const track of applicationTracks) {
    assert.equal(parseRoute('#/application/'+track.id).id, track.id)
    assert.ok(track.icon && track.en && track.ja && track.enSummary && track.jaSummary)
    assert.equal(track.tasks.length, track.id === 'ideas' ? 3 : 2)
    track.tasks.forEach((task,i) => {
      assert.ok(['speaking','reading','writing'].includes(task.kind))
      for(const key of ['en','ja','promptEn','promptJa','example']) assert.ok(task[key])
      assert.equal(task.checkpointsEn.length,3)
      assert.equal(task.checkpointsJa.length,3)
      const responseKey=applicationResponseKey(track.id,i)
      const saved=sanitizeLearning({...emptyLearning,responses:{[responseKey]:'Original practice notes'}})
      assert.equal(saved.responses[responseKey], 'Original practice notes')
    })
  }
  assert.equal(applicationTracks.reduce((count,track)=>count+track.tasks.length,0),21)
})

test('Application exercises use learner notes, not fake scores or unlocks',()=>{
  const ui=readFileSync(new URL('./Application.jsx', import.meta.url),'utf8')
  const css=readFileSync(new URL('./application.css', import.meta.url),'utf8')
  assert.match(ui, /applicationTracks\.map\(\(track, index\) =>/)
  assert.match(ui, /href=\{'#\/application\/' \+ track\.id\}/)
  assert.match(ui, /applicationResponseKey\(track\.id, selected\)/)
  assert.match(ui, /maxLength=\{1900\}/)
  assert.match(ui, /onChange=\{e=>changes\(e\.target\.value\)\}/)
  assert.match(ui, /aria-pressed=\{selected===i\}/)
  assert.match(css, /\.ap-draft:focus-visible/)
  assert.doesNotMatch(ui, /locked|unlock|CEFR score|AI score/i)
})

test('Small Talk uses real two-sided exchanges and saves both independent practice notes', () => {
  const talk=applicationTracks.find(track=>track.id==='smalltalk')
  assert.equal(talk.en,'Small Talk')
  assert.equal(talk.ja,'ちょっとした会話')
  assert.equal(talk.tasks.length,2)
  assert.ok(talk.tasks.every(task=>task.kind==='speaking'))
  assert.ok(talk.tasks.every(task=>task.example.includes('A:') && task.example.includes('B:')))
  assert.equal(parseRoute('#/application/smalltalk').id,'smalltalk')
  const notes={
    [applicationResponseKey('smalltalk',0)]:'My opening question',
    [applicationResponseKey('smalltalk',1)]:'My follow-up'
  }
  const clean=sanitizeLearning({...emptyLearning,responses:notes})
  assert.deepEqual(
    Object.fromEntries(Object.entries(clean.responses).filter(([key])=>key.startsWith('application-smalltalk-'))),
    notes
  )
})

test('Academic and Humor routes are working and deep conversations remain in Ideas', () => {
  for(const id of ['academic','humor']){
    const track=applicationTracks.find(entry=>entry.id===id)
    assert.ok(track)
    assert.equal(parseRoute('#/application/'+id).id,id)
    assert.equal(track.tasks.length,2)
    assert.ok(track.tasks.every(task=>task.kind==='speaking'))
    const key=applicationResponseKey(id,1)
    assert.equal(sanitizeLearning({...emptyLearning,responses:{[key]:'My own practice answer'}}).responses[key],'My own practice answer')
  }
  const ideas=applicationTracks.find(entry=>entry.id==='ideas')
  assert.equal(ideas.tasks.length,3)
  assert.match(ideas.enSummary,/meaningful conversations/)
  assert.match(ideas.tasks[2].en,/meaningful conversation/)
  const key=applicationResponseKey('ideas',2)
  assert.equal(sanitizeLearning({...emptyLearning,responses:{[key]:'A thoughtful question'}}).responses[key],'A thoughtful question')
  assert.equal(applicationTracks.filter(track=>track.id==='relationships').length,0)
})

test('language switch and learning views share a coherent blue palette', () => {
  const language = readFileSync(new URL('./Language.jsx', import.meta.url), 'utf8')
  const selectorStyle = readFileSync(new URL('./language.css', import.meta.url), 'utf8')
  const shell = readFileSync(new URL('./english-shell.css', import.meta.url), 'utf8')
  const path = readFileSync(new URL('./library-readable.css', import.meta.url), 'utf8')
  const home = readFileSync(new URL('./home.css', import.meta.url), 'utf8')
  const application = readFileSync(new URL('./application.css', import.meta.url), 'utf8')
  const writing = readFileSync(new URL('./writing-studio.css', import.meta.url), 'utf8')
  const vocab = readFileSync(new URL('./vocabulary.css', import.meta.url), 'utf8')
  assert.match(language, /className="aw-language-toggle"/)
  assert.match(language, /role="group" aria-label=\{t\('Explanation language'\)\}/)
  assert.match(language, /aria-pressed=\{language === item\.id\}/)
  assert.match(language, /setLanguage\(item\.id\)/)
  assert.match(language, /item\.id === 'en' \? 'EN' : item\.label/)
  assert.doesNotMatch(language, /<select/)
  assert.match(shell, /--brand: #285bcc/)
  assert.match(selectorStyle, /\.aw-language-option\[aria-pressed="true"\]/)
  assert.match(selectorStyle, /background:#285bcc; color:#fff/)
  assert.match(selectorStyle, /\.aw-language-option:focus-visible/)
  assert.match(path, /--rl-v-trunk:#7198d2/)
  assert.match(path, /--rl-v-branch:#a1bae4/)
  assert.match(path, /--rl-v-leaf:#bfd1ee/)
  assert.match(path, /background:#285bcc; color:white; border-color:#285bcc/)
  assert.match(home, /background:#285bcc; color:white/)
  assert.match(application, /\.ap-exercise-tabs button\.is-selected/)
  assert.match(writing, /\.ws-prompt-item\.is-selected/)
  assert.match(vocab, /background: #285bcc/)
  for (const source of [path,home,application,writing,vocab]) {
    assert.doesNotMatch(source, /#(?:355d46|426d50|588157|83a78d|9cbc9f|aac8ad|dce5dc|edf4eb)\b/i)
  }
})
