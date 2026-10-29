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
import { publicChapterId, sourceChapterId, migrateLegacyLessonPath } from './chapterNumbers.js'
import { landingPageCopy } from './landingCopy.js'

test('the public URL always opens Landing before Home, without breaking direct lesson links', () => {
  const returning = visit(emptyLearning, '/lesson/02/practice/friend')
  for (const hash of ['', '#', '#/', '#/?ref=shared']) {
    assert.equal(shouldShowLanding(hash, emptyLearning), true)
    assert.equal(shouldShowLanding(hash, returning), true)
  }
  for (const hash of ['#/home', '#/courses?foundation', '#/lesson/02/practice/friend', '#course']) {
    assert.equal(shouldShowLanding(hash, emptyLearning), false)
    assert.equal(shouldShowLanding(hash, returning), false)
  }
  assert.equal(shouldShowLanding('#/landing', returning), true)
  assert.equal(shouldShowLanding('#/landing/', emptyLearning), true)
  assert.equal(shouldShowLanding('', loadLearning({ getItem: () => '{bad json' })), true)
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  assert.match(landing, /className="al-header-start" href="#\/home">\{copy\.start\}/)
  assert.match(landing, /className="al-splash-cta" href="#\/home">\{copy\.start\}/)
  const app = readFileSync(new URL('./ArticoApp.jsx', import.meta.url), 'utf8')
  assert.match(app, /initialPath === '\/home'/)
  assert.match(app, /useState\(readInitialEntry\)/)
  assert.match(app, /window\.history\.replaceState\(/)
})

test('landing uses a full-height illustrated hero with a working blue entry and preserved philosophy', () => {
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  const index = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  const art = readFileSync(new URL('../../public/assets/landing/artico-mountain-journey.webp', import.meta.url))
  assert.match(landing, /className="al-splash"/)
  assert.match(landing, /assets\/landing\/artico-mountain-journey\.webp/)
  assert.match(landing, /href="#\/home">\{copy\.start\}/)
  assert.match(css, /\.al-splash\s*\{/)
  assert.match(css, /min-height: 100svh/)
  assert.match(css, /\.al-splash-cta\s*\{/)
  assert.match(css, /background: #285bcc/)
  assert.equal(art.subarray(0, 4).toString(), 'RIFF')
  assert.equal(art.subarray(8, 12).toString(), 'WEBP')
  assert.ok(art.length > 20000)
  assert.doesNotMatch(landing, /landing-hero-background\.svg/)
  assert.match(index, /family=Poppins/)
  assert.match(landing, /id="al-why-title">\{copy\.whyTitle\}/)
  const source = landingPageCopy.en.whyParagraphs.flatMap(paragraph => paragraph.runs)
  for (const phrase of ['real learning needs effort', 'flow', 'perfect middle', 'trained like a skill',
    'sound, rhythm, movement', 'train expression', 'communication', 'universal interface',
    'people feel it']) assert.ok(source.some(run => typeof run === 'string' ? run.includes(phrase) : run.mark.includes(phrase)), phrase)
  assert.equal(source.filter(run => typeof run !== 'string').length, 9)
  assert.match(landing, /<mark key=\{runIndex\}>\{run\.mark\}<\/mark>/)
})

test('landing drops the study/practice mockup and introduction footnote and has a working header', () => {
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  const language = readFileSync(new URL('./Language.jsx', import.meta.url), 'utf8')
  assert.match(landing, /className="al-site-header"/)
  assert.match(landing, /className="al-header-logo artico-wordmark"/)
  assert.match(landing, /href="#\/landing"/)
  assert.match(landing, /className="al-language-picker"/)
  assert.match(landing, /className="al-language-trigger"/)
  assert.match(landing, /aria-expanded=\{languageOpen\}/)
  assert.match(landing, /aria-controls="al-language-options"/)
  assert.match(landing, /🇯🇵/)
  assert.match(landing, /🇺🇸/)
  assert.match(landing, /onClick=\{\(\) => chooseLanguage\('ja'\)\}/)
  assert.match(landing, /onClick=\{\(\) => chooseLanguage\('en'\)\}/)
  assert.match(landing, /document\.addEventListener\('pointerdown', closeOnOutside\)/)
  assert.match(landing, /event\.key === 'Escape'/)
  assert.match(language, /window\.localStorage\.setItem\(LANGUAGE_KEY, value\)/)
  assert.match(landing, /className="al-header-start" href="#\/home">\{copy\.start\}/)
  assert.match(css, /\.al-site-header\s*\{/)
  assert.match(css, /\.al-language-popover button\[aria-pressed="true"\]/)
  assert.doesNotMatch(landing, /className="al-method"|TWO MODES\. ONE CONTINUOUS LESSON\.|al-previews|className="al-conversation"|al-choices/)
  assert.doesNotMatch(landing, /New here\? Begin with Orientation\.|Or choose the stage that fits you\.|al-journey-footnote/)
  assert.doesNotMatch(landing, /Login|Sign Up|Sign in/)
  assert.match(landing, /\{copy\.journeyLink\}<\/a>/)
})

test('landing journey maps active stages to real routes and identifies the aspirational destination', () => {
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  // Learning-stage descriptions are informational, never routing links.
  assert.match(landing, /copy\.stages\.map\(\(stage, index\)/)
  assert.equal(landingPageCopy.en.stages.length, 4)
  assert.equal(landingPageCopy.ja.stages.length, 4)
  assert.doesNotMatch(landing, /<a href="#\/(?:courses|application)"[^>]*className="al-journey-card"/)
  assert.doesNotMatch(landing, /href="#\/courses\?foundation" className="al-journey-card"/)
  assert.equal(landingPageCopy.en.journeyTitle, 'The Artico learning journey')
  assert.match(landing, /\{copy\.journeyTitle\}/)
  assert.match(landingPageCopy.en.stages[0].title, /Foundations \/ Raw mechanics/)
  assert.match(landingPageCopy.en.stages[1].title, /Social Fluency/)
  assert.match(landingPageCopy.en.stages[3].title, /Well-Versed Communicator/)
  assert.equal(landingPageCopy.en.stages[3].note, undefined)
  assert.equal(landingPageCopy.ja.stages[3].note, undefined)
  assert.doesNotMatch(landing, /al-journey-vision/)
  assert.match(landing, /className="al-journey-illustration"/)
  assert.match(landing, /className="al-route-scene"/)
  assert.match(landing, /className="al-route-lines al-route-lines-desktop"/)
  assert.match(landing, /className="al-route-lines al-route-lines-mobile"/)
  assert.match(landing, /copy.illustrationLabels\[index\]/)
  for (let i = 0; i < 4; i++) assert.ok(landingPageCopy.ja.illustrationLabels[i].length > 0)
  for (const name of ['raw-mechanics', 'social-fluency', 'application', 'apex-communicator']) {
    const png = readFileSync(new URL('../../public/assets/landing/artico-' + name + '.png', import.meta.url))
    assert.ok(png.length > 10000, name)
    assert.equal(png.subarray(1, 4).toString(), 'PNG', name)
    assert.ok(png.includes(Buffer.from('tRNS')), name + ' must preserve transparency')
  }
  assert.match(css, /\.al-route-stop img[^]*?background: transparent/)
  assert.match(css, /\.al-route-stop-4/)
  assert.match(css, /\.al-journey-illustration svg\.al-route-lines/)
  assert.match(css, /\.al-journey-cards/)
  assert.match(css, /\.al-journey-card/)
  assert.match(css, /@media \(max-width: 740px\)/)
  assert.equal(landingPageCopy.en.closing, 'your English journey starts now...')
  assert.match(landing, /\{copy\.closing\}/)
  assert.match(landing, /className="al-final-cta-button">\{copy\.start\}/)
  assert.match(css, /\.al-final-cta-button[^]*?background: #285bcc/)
  assert.equal(landingPageCopy.en.footerTagline, 'english but better...')
  assert.match(landing, /\{copy\.footerTagline\}/)
  assert.match(landing, /© \{new Date\(\)\.getFullYear\(\)\} Artico/)
  assert.doesNotMatch(landing, /Android|iOS|Terms of service|Artico, Inc\./)
  assert.doesNotMatch(landing, /English for everyday life\./)
  assert.doesNotMatch(landing, /al-footer-lang-wrap|al-footer-language/)
})

test('landing uses one-time motion with reduced-motion support and aligned route geometry', () => {
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  assert.match(css, /@keyframes al-title-reveal/)
  assert.match(css, /al-splash-title > span:nth-child\(2\)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /\.al-journey-card, \.al-journey-card:nth-child\(n\)/)
  assert.match(css, /cursor: default/)
  assert.match(css, /\.al-journey-illustration svg[^{]*\{[^}]*overflow: hidden/s)
})

test('English and Japanese landing copy translates every visible area with matching highlight structure', () => {
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  const needed = [
    'pageTitle', 'skip', 'open', 'backToLanding', 'navigation', 'whyLink',
    'journeyLink', 'selectLanguage', 'languageTrigger', 'start', 'heroTitle',
    'heroDescription', 'whyEyebrow', 'whyTitle', 'journeyTitle', 'journeyAria',
    'closing', 'footerTagline', 'footerNavigation', 'footerAbout',
    'footerResources', 'footerSupport', 'footerHowTo', 'footerFeedback',
    'feedbackTitle', 'feedbackClose', 'feedbackNote', 'feedbackPrompt',
    'feedbackPlaceholder', 'feedbackShare', 'feedbackShared',
    'feedbackCopied', 'feedbackCopyFailed',
  ]
  for (const key of needed) {
    assert.ok(landingPageCopy.en[key], 'Missing English ' + key)
    assert.ok(landingPageCopy.ja[key], 'Missing Japanese ' + key)
  }
  for (const locale of ['en', 'ja']) {
    const page = landingPageCopy[locale]
    assert.equal(page.heroTitle.length, 2)
    assert.equal(page.whyParagraphs.length, 4)
    assert.equal(page.illustrationLabels.length, 4)
    assert.equal(page.stages.length, 4)
    assert.ok(page.stages.every(stage => stage.title && stage.tagline && stage.description))
    assert.ok(page.whyParagraphs.every(paragraph => paragraph.runs.length >= 3))
    assert.equal(page.whyParagraphs.flatMap(paragraph => paragraph.runs).filter(run => typeof run !== 'string').length, 9)
  }
  assert.notEqual(landingPageCopy.en.heroTitle[0], landingPageCopy.ja.heroTitle[0])
  assert.notEqual(landingPageCopy.en.whyTitle, landingPageCopy.ja.whyTitle)
  assert.notEqual(landingPageCopy.en.closing, landingPageCopy.ja.closing)
  assert.notEqual(landingPageCopy.en.start, landingPageCopy.ja.start)
  for (const token of [
    'copy.heroTitle[0]', 'copy.heroTitle[1]', 'copy.heroDescription',
    'copy.whyParagraphs.map', 'copy.stages.map', 'copy.illustrationLabels[index]',
    'copy.whyLink', 'copy.journeyLink', 'copy.closing', 'copy.footerTagline',
    'copy.footerHowTo', 'copy.footerFeedback', 'copy.pageTitle',
  ]) assert.ok(landing.includes(token), token)
  assert.match(landing, /lang=\{language\}/)
  assert.match(css, /\.aw-landing\[data-language="ja"\]/)
  assert.match(css, /Noto Sans JP/)
})

test('language changes preserve the hero layout and the footer points to working destinations', () => {
  const landing = readFileSync(new URL('./Landing.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./landing.css', import.meta.url), 'utf8')
  assert.match(landing, /<h1 className="al-splash-title"/)
  assert.match(landing, /<p className="al-splash-description"/)
  assert.doesNotMatch(landing, /<h1 key=\{language\}|<p key=\{language\}/)
  assert.match(css, /\.al-splash-title\s*\{\s*display: grid;/)
  assert.match(css, /\.al-splash-title > span,\s*\.aw-landing\[data-language="ja"\] \.al-splash-title > span/)
  assert.match(css, /\.al-splash-title > span[^{]*\{[^}]*display: block;/s)
  assert.match(landing, /className="al-footer-logo artico-wordmark" href="#\/landing"/)
  assert.match(landing, /onClick=\{\(\) => window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)\}/)
  assert.match(landing, /className="al-footer-directory"/)
  assert.doesNotMatch(landing, /copy\.footerExplore|copy\.footerSocial|copy\.footerApplication|copy\.footerGithub|copy\.footerIssue/)
  assert.match(landing, /href="#\/foundation\/how-it-works\/study">\{copy\.footerHowTo\}/)
  assert.equal(parseRoute('#/foundation/how-it-works/study').id, 'how-it-works')
  assert.match(landing, /setFeedbackOpen\(true\)/)
  assert.match(landing, /role="dialog" aria-modal="true"/)
  assert.match(landing, /navigator\.share/)
  assert.match(landing, /navigator\.clipboard\.writeText/)
  for (const language of ['en', 'ja']) {
    const copy = landingPageCopy[language]
    assert.ok(copy.footerHowTo && copy.footerFeedback && copy.feedbackNote)
    assert.match(copy.feedbackNote, language === 'ja' ? /直接送信はできません/ : /does not collect messages directly/)
  }
})

test('the learning path crosses stage boundaries without skipping a foundation or trapping the last lesson', () => {
  const steps = learningStages.flatMap((stage) => stage.lessonIds)
  assert.equal(new Set(steps).size, steps.length)
  assert.equal(getFoundationNavigation('orientation').previous, '/home')
  assert.equal(getFoundationNavigation('how-it-works').next, '/foundation/letters/study')
  assert.equal(getFoundationNavigation('letters').previous, '/foundation/how-it-works/study')
  assert.equal(getFoundationNavigation('tongue-intro').next, '/lesson/01/study')
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

test('all 103 lessons have a reversible path from Orientation through Chapter 97 in both modes', () => {
  const chapters = JSON.parse(readFileSync(new URL('../course/catalog.json', import.meta.url)))
  const routes = [
    ...learningStages.flatMap((stage) => stage.lessonIds).map((id) => `/foundation/${id}/study`),
    ...['34', ...chapters.map(chapter => publicChapterId(chapter.id))].sort().map(id => `/lesson/${id}/study`),
  ]
  assert.equal(routes.length, 103)
  assert.equal(new Set(routes).size, routes.length)
  routes.forEach((path, index) => {
    const route = parseRoute(`#${path}`)
    const navigation = getLessonNavigation(route)
    assert.equal(navigation.previous, routes[index - 1] ?? '/home', path)
    assert.equal(navigation.next, routes[index + 1] ?? '/lesson/98/study', path)
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
  assert.equal(getLessonNavigation({ page: 'lesson', id: '98' }), null)
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
test('old course URLs, Foundation links, and all 97 chapter URLs resolve', () => {
  assert.equal(parseRoute('#course').page, 'courses')
  assert.equal(parseRoute('#/courses?foundation').page, 'courses')
  assert.equal(parseRoute('#/lesson/02/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/01/reader').view, 'study')
  assert.equal(parseRoute('#/lesson/02/practice/friend').scene, 'friend')
  assert.equal(
    parseRoute('#/lesson/02/practice/first?phrase=phrase-coworker').phrase,
    'phrase-coworker',
  )
  assert.equal(parseRoute('#/foundation/lr/chunks').view, 'practice')
  assert.deepEqual(parseRoute('#/foundation/hear/study'), parseRoute('#/foundation/letters/study'))
  assert.deepEqual(parseRoute('#/foundation/hear/practice'), parseRoute('#/foundation/letters/practice'))
  assert.equal(parseRoute('#/lesson/98/study').page, 'vocabulary')
  assert.equal(parseRoute('#/lesson/02/practice?line=ch02-line3').line, 'ch02-line3')
  assert.equal(parseRoute('#/lesson/02/practice?line=ch03-line3').line, undefined)
  assert.equal(
    visit(emptyLearning, '/lesson/02/practice?line=ch02-v1').lastPractice,
    '/lesson/02/practice?line=ch02-v1',
  )
  assert.equal(parseRoute('#/%invalid').page, 'home')
  for (let number = 1; number <= 97; number++)
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
  assert.match(landing, /al-footer-logo artico-wordmark" href="#\/landing"/)
  assert.equal((home.match(/id:'(?:orientation|foundation|social|application)'/g) ?? []).length, 4)
  for(const href of ['#/foundation/orientation/study', '#/courses?foundation', '#/courses?social', '#/application'])
    assert.ok(home.includes("href:'" + href + "'"), href)
  assert.doesNotMatch(home, /Unlock|lock-icon|disabled button/i)
})

test('Learn keeps Foundations and Social Fluency and expands nine Application tracks', () => {
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

test('Application tracks use valid routes; Jobs has its own full course', () => {
  const ids = ['tests','smalltalk','interviews','presentations','academic','storytelling','writing','reading','ideas']
  assert.deepEqual(applicationTracks.map(track=>track.id), ids)
  assert.equal(parseRoute('#/application').page, 'application')
  assert.equal(parseRoute('#/application/unknown').path, '/application')
  for(const track of applicationTracks) {
    assert.equal(parseRoute('#/application/'+track.id).id, track.id)
    assert.ok(track.icon && track.en && track.ja && track.enSummary && track.jaSummary)
    assert.equal(track.tasks.length, ['smalltalk','interviews','storytelling','academic','reading','ideas'].includes(track.id) ? 0 : 2)
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
  assert.equal(applicationTracks.reduce((count,track)=>count+track.tasks.length,0),6)
  const jobs=readFileSync(new URL('./Application.jsx', import.meta.url),'utf8')
  assert.match(jobs, /route\.id === 'interviews'.*JobsCourse/)
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

test('Small Talk is a complete dedicated course, with valid deep links and saved reflection', () => {
  const talk=applicationTracks.find(track=>track.id==='smalltalk')
  assert.equal(talk.en,'Small Talk')
  assert.equal(talk.tasks.length,0)
  assert.equal(parseRoute('#/application/smalltalk').id,'smalltalk')
  const data=readFileSync(new URL('./smallTalkContent.js', import.meta.url),'utf8')
  const ui=readFileSync(new URL('./SmallTalkCourse.jsx', import.meta.url),'utf8')
  assert.match(data, /export const smallTalkLessons/)
  assert.match(data, /export const smallTalkScenarios/)
  assert.match(ui, /ScenarioLab/)
  assert.match(ui, /aria-current=\{mode===/)
  assert.doesNotMatch(ui, /likeability score|contact points|AI confidence score/i)
  for (let n=1;n<=12;n++){
    const id=String(n).padStart(2,'0')
    for(const mode of ['study','practice']){
      const path='/application/smalltalk/'+id+'/'+mode
      assert.equal(parseRoute('#'+path).lesson,id)
      assert.equal(parseRoute('#'+path).mode,mode)
      assert.equal(visit(emptyLearning,path).last,path)
    }
  }
  assert.equal(parseRoute('#/application/smalltalk/99/practice').path,'/application')
  const notes={'application-smalltalk-note-01':'An opener for class','application-smalltalk-reflection-01':'Fact: person said goodbye','application-smalltalk-done-01':'1'}
  assert.deepEqual(sanitizeLearning({...emptyLearning,responses:notes}).responses,notes)
  const legacy={ [applicationResponseKey('smalltalk',0)]:'Old notes' }
  assert.deepEqual(sanitizeLearning({...emptyLearning,responses:legacy}).responses,legacy)
})
test('Academic and Ideas remain in Application; Humor is moved to Social Fluency', () => {
  assert.ok(applicationTracks.some(track=>track.id==='academic'))
  assert.equal(applicationTracks.some(track=>track.id==='humor'), false)
  const ideas=applicationTracks.find(track=>track.id==='ideas')
  assert.equal(ideas.tasks.length,0)
  assert.equal(applicationTracks.find(track=>track.id==='reading').tasks.length,0)
  assert.equal(parseRoute('#/application/reading/short/study?text=red-umbrella').id,'reading')
  assert.equal(parseRoute('#/application/ideas/home/study').id,'ideas')
  assert.match(ideas.enSummary,/express your own thinking/)
  assert.equal(parseRoute('#/application/humor').path,'/lesson/34/study')
  assert.equal(sanitizeLearning({...emptyLearning,responses:{'application-humor-0':'My previous answer'}}).responses['application-humor-0'],'My previous answer')
})

test('learning tree is grayscale with blue selection while other views retain blue', () => {
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
  assert.match(path, /--rl-v-trunk:#9c9c9c/)
  assert.match(path, /--rl-v-branch:#c5c5c5/)
  assert.match(path, /--rl-v-leaf:#dedede/)
  assert.match(path, /background:#285bcc; color:white; border-color:#285bcc/)
  assert.match(path, /--rl-v-ink:#242424/)
  assert.match(path, /color:#242424; font-size:22px/)
  assert.match(path, /\.rl-vertical-lesson\.is-current[^\n]*\{ color:#285bcc; background:#eef3ff;/)
  assert.match(path, /\.rl-vertical-lesson\.is-current \.curriculum-icon/)
  assert.match(path, /border-left:3px solid var\(--rl-v-leaf\)/)
  assert.match(path, /width:3px; background:var\(--rl-v-branch\)/)
  assert.doesNotMatch(path, /--rl-v-trunk:#7198d2|--rl-v-branch:#a1bae4|--rl-v-leaf:#bfd1ee/)

  assert.match(home, /background:#285bcc; color:white/)
  assert.match(application, /\.ap-exercise-tabs button\.is-selected/)
  assert.match(writing, /\.ws-prompt-item\.is-selected/)
  assert.match(vocab, /background: #285bcc/)
  for (const source of [path,home,application,writing,vocab]) {
    assert.doesNotMatch(source, /#(?:355d46|426d50|588157|83a78d|9cbc9f|aac8ad|dce5dc|edf4eb)\b/i)
  }
})

test('Home keeps the main heading and cards without redundant introductory copy', () => {
  const home = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8')
  assert.match(home, /Pick your starting point\./)
  assert.doesNotMatch(home, /ARTICO · YOUR STARTING POINT/)
  assert.doesNotMatch(home, /Choose the path that fits you today\./)
  assert.doesNotMatch(home, /今の自分に合うところから始めましょう。/)
  assert.match(home, /className="ah-options"/)
})

test('Home cards are compact grayscale and Foundations displays as Level Zero', () => {
  const home = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./home.css', import.meta.url), 'utf8')
  const progress = readFileSync(new URL('./Progress.jsx', import.meta.url), 'utf8')
  const locale = readFileSync(new URL('./locales/ja.js', import.meta.url), 'utf8')
  assert.match(home, /label:'Level Zero'/)
  assert.match(home, /ja:'レベルゼロ'/)
  assert.match(home, /href:'#\/courses\?foundation'/)
  assert.doesNotMatch(home, /label:'Foundations'/)
  assert.equal(learningStages[1].id, 'foundation')
  assert.equal(learningStages[1].title, 'Level Zero')
  assert.equal(learningStages[1].ja, 'レベルゼロ')
  assert.equal(getLearningStage('/foundation/letters/study')?.title, 'Level Zero')
  assert.equal(parseRoute('#/foundation/letters/study').page, 'foundation')
  assert.equal(parseRoute('#/courses?foundation').page, 'courses')
  assert.match(locale, /"Level Zero": "レベルゼロ"/)
  // Progress no longer lists every opened Foundation or chapter.
  assert.match(progress, /CONTINUE LEARNING/)
  assert.match(progress, /My Space/)
  assert.match(progress, /Self-assessment/)
  assert.doesNotMatch(progress, /Chapters you have opened/)
  assert.match(css, /grid-template-columns:70px minmax\(0,1fr\) auto/)
  assert.match(css, /min-height:96px; box-sizing:border-box/)
  assert.match(css, /width:64px; height:64px/)
  assert.match(css, /border:1px solid #e0e0e0/)
  assert.match(css, /color:#242424/)
  assert.match(css, /background:#f5f5f5/)
  assert.match(css, /background:#285bcc; color:white/)
  assert.match(css, /\.ah-action:focus-visible/)
})

test('Level Zero shows a compact illustrated ABC mark without altering letter lesson icons', () => {
  const icon = readFileSync(new URL('./CurriculumIcon.jsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8')
  const homeCSS = readFileSync(new URL('./home.css', import.meta.url), 'utf8')
  const treeCSS = readFileSync(new URL('./library-readable.css', import.meta.url), 'utf8')
  assert.match(home, /id:'foundation',[\s\S]*?icon:'levelZero'/)
  assert.match(icon, /foundation: 'levelZero'/)
  assert.match(icon, /letters: 'abc'/)
  assert.match(icon, /name === 'levelZero'/)
  assert.match(icon, /viewBox="0 0 90 58"/)
  assert.match(icon, /fill="#f34955"/)
  assert.match(icon, /fill="#42b9e3"/)
  assert.match(icon, /fill="#ffcb30"/)
  assert.match(icon, /fillRule="evenodd"/)
  assert.match(icon, /aria-hidden="true"/)
  assert.match(homeCSS, /\.ah-option--foundation \.curriculum-icon--level-zero/)
  assert.match(treeCSS, /\.rl-vertical-stage-button > \.curriculum-icon--level-zero/)
  assert.equal(getLearningStage('/foundation/letters/study')?.title, 'Level Zero')
})

test('Social Fluency uses illustrated people and Home actions stay close', () => {
  const icon = readFileSync(new URL('./CurriculumIcon.jsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('./Home.jsx', import.meta.url), 'utf8')
  const homeCSS = readFileSync(new URL('./home.css', import.meta.url), 'utf8')
  const treeCSS = readFileSync(new URL('./library-readable.css', import.meta.url), 'utf8')
  assert.match(icon, /social: 'socialDuo'/)
  assert.match(icon, /name === 'socialDuo'/)
  assert.match(icon, /viewBox="0 0 92 62"/)
  assert.match(icon, /fill="#399fda"/)
  assert.match(icon, /fill="#f2bd43"/)
  assert.match(icon, /stroke="#ed735d"/)
  assert.match(icon, /aria-hidden="true"/)
  assert.match(home, /id:'social',[\s\S]*?icon:'socialDuo'/)
  assert.match(homeCSS, /\.ah-page \{ width:min\(100%,830px\)/)
  assert.match(homeCSS, /\.ah-option--social \.curriculum-icon--social-duo/)
  assert.match(treeCSS, /\.rl-vertical-stage-button > \.curriculum-icon--social-duo/)
  assert.match(homeCSS, /\.ah-action:focus-visible/)
  assert.match(home, /href:'#\/courses\?social'/)
})

test('Learning Path stage cards stay compact with connected nodes and mobile layout', () => {
  const css = readFileSync(new URL('./library-readable.css', import.meta.url), 'utf8')
  const library = readFileSync(new URL('./Library.jsx', import.meta.url), 'utf8')
  assert.match(css, /\.is-english-pilot \.aw-page\.aw-library-page\.rl-vertical-page \{\s*max-width:920px;/)
  assert.match(css, /\.rl-vertical-stage-button \{\s*width:100%; min-height:72px; padding:14px 16px;/)
  assert.match(css, /\.rl-vertical-stages \{ position:relative; display:grid; gap:14px;/)
  assert.match(css, /\.rl-vertical-stage:not\(:last-child\)::after/)
  assert.match(css, /top:36px; bottom:-50px; left:19px;/)
  assert.doesNotMatch(css, /\.rl-vertical-stages::before/)
  assert.match(css, /\.rl-vertical-stage::before/)
  assert.match(css, /@media \(max-width:600px\)/)
  assert.match(css, /min-height:66px; padding:12px; gap:11px;/)
  assert.match(css, /\.rl-vertical-stage-panel\[hidden\]/)
  assert.match(library, /aria-expanded=\{open\}/)
  assert.match(library, /hidden=\{!open\}/)
  assert.match(library, /aria-expanded=\{expandedStage === 'application'\}/)
  assert.match(css, /--rl-v-trunk:#9c9c9c/)
  assert.match(css, /--rl-v-branch:#c5c5c5/)
  assert.match(css, /#285bcc/)
})

test('Humor chapter numbering preserves existing source lessons and local progress', () => {
  const expectedSource = ['33', null, '34', '35', '96']
  const publicIds = ['33','34','35','36','97']
  assert.deepEqual(publicIds.map(sourceChapterId), expectedSource)
  assert.deepEqual(['33','34','35','96'].map(publicChapterId),['33','35','36','97'])
  assert.equal(parseRoute('#/lesson/34/study').page,'lesson')
  assert.equal(parseRoute('#/lesson/97/study').page,'lesson')
  assert.equal(parseRoute('#/lesson/98/study').page,'vocabulary')
  assert.equal(getLessonNavigation({page:'lesson',id:'34'}).next,'/lesson/35/study')
  assert.equal(getLessonNavigation({page:'lesson',id:'97'}).next,'/lesson/98/study')
  assert.equal(migrateLegacyLessonPath('/lesson/33/study'),'/lesson/33/study')
  assert.equal(migrateLegacyLessonPath('/lesson/34/study'),'/lesson/35/study')
  assert.equal(migrateLegacyLessonPath('/lesson/96/practice'),'/lesson/97/practice')
  assert.equal(migrateLegacyLessonPath('/foundation/letters/study'),'/foundation/letters/study')
  const storage = new Map([['artico.web.learning.v1',JSON.stringify({
    ...emptyLearning,last:'/lesson/36/study',lastPractice:'/lesson/34/practice',
    positions:{'/lesson/35/study':142},responses:{'application-humor-0':'My funny reply'},
    saved:['ch34-line4'],
  })]])
  const store = {
    getItem:key=>storage.get(key)??null,
    setItem:(key,value)=>storage.set(key,value),
  }
  const result = loadLearning(store)
  assert.equal(result.last,'/lesson/37/study')
  assert.equal(result.lastPractice,'/lesson/35/practice')
  assert.equal(result.positions['/lesson/36/study'],142)
  assert.equal(result.responses['application-humor-0'],'My funny reply')
  assert.deepEqual(result.saved,['ch34-line4'])
  assert.equal(storage.get('artico.web.chapter34-inserted.v1'),'1')
  assert.deepEqual(loadLearning(store),result)
  const fresh = new Map()
  const newStorage = {
    getItem:key=>fresh.get(key)??null,
    setItem:(key,value)=>fresh.set(key,value),
  }
  assert.equal(loadLearning(newStorage).last,null)
  assert.equal(fresh.get('artico.web.chapter34-inserted.v1'),'1')
  fresh.set('artico.web.learning.v1',JSON.stringify({...emptyLearning,last:'/lesson/34/study'}))
  assert.equal(loadLearning(newStorage).last,'/lesson/34/study')
})

test('Humor is chapter 34 in Free Time, not an Application track',()=>{
  const content=readFileSync(new URL('./content.js',import.meta.url),'utf8')
  const application=readFileSync(new URL('./applicationTracks.js',import.meta.url),'utf8')
  const humor=readFileSync(new URL('./HumorLesson.jsx',import.meta.url),'utf8')
  const web=readFileSync(new URL('./ArticoWeb.jsx',import.meta.url),'utf8')
  const icons=readFileSync(new URL('./CurriculumIcon.jsx',import.meta.url),'utf8')
  assert.match(content,/\{ start: 26, end: 34, title: 'Free time & interests' \}/)
  assert.match(content,/\{ start: 35, end: 45, title: 'Shopping & services' \}/)
  assert.match(content,/\{ start: 89, end: 97, title: 'Communication & media' \}/)
  assert.match(content,/title: 'Humor & Banter', ja: 'ユーモア・軽い冗談'/)
  assert.match(web,/route.id === '34'/)
  assert.match(web,/const HumorLesson = lazy/)
  assert.match(humor,/getLessonNavigation\(route\)/)
  assert.match(humor,/\/lesson\/34\/study/)
  assert.match(humor,/\/lesson\/34\/practice/)
  assert.match(humor,/application-humor-/)
  assert.doesNotMatch(application,/id:'humor'/)
  for(const [start,icon] of [[35,'storefront'],[46,'briefcase'],[57,'house'],[66,'route'],[81,'firstAid'],[89,'newspaper']])
    assert.ok(icons.includes(start + ": '" + icon + "'"),start+' group icon')
})

test('storytelling deep links and saved practice survive reload without accepting invented lessons', () => {
  const lesson = parseRoute('#/application/storytelling/05/practice')
  assert.deepEqual([lesson.page,lesson.id,lesson.lesson,lesson.mode],
    ['application','storytelling','05','practice'])
  assert.equal(parseRoute('#/application/storytelling/16/study').path, '/application')
  assert.equal(parseRoute('#/application/storytelling/05/wrong').path, '/application')
  assert.equal(parseRoute('#/application/storytelling').id, 'storytelling')
  const state = sanitizeLearning({
    ...emptyLearning, last:'/application/storytelling/05/practice',
    lastPractice:'/application/storytelling/05/practice',
    positions:{ '/application/storytelling/05/practice':125 },
    responses:{
      'application-storytelling-note-05':'I found myself in the wrong room.',
      'application-storytelling-retry-05':'I clarified the expectation.',
      'application-storytelling-choice-05':'0',
      'application-storytelling-done-05':'1',
      'application-storytelling-location':'05',
      'application-storytelling-done-20':'1',
    },
  })
  assert.equal(state.last, '/application/storytelling/05/practice')
  assert.equal(state.lastPractice, '/application/storytelling/05/practice')
  assert.equal(state.positions[state.last],125)
  assert.equal(state.responses['application-storytelling-note-05'],'I found myself in the wrong room.')
  assert.equal(state.responses['application-storytelling-done-05'],'1')
  assert.equal(state.responses['application-storytelling-done-20'],undefined)
})

test('storytelling has five coherent units and fifteen distinct lessons', async () => {
  const { storytellingLessons, storytellingUnits } = await import('./storytellingContent.js')
  assert.equal(storytellingUnits.length,5)
  assert.equal(storytellingLessons.length,15)
  assert.equal(new Set(storytellingLessons.map(x=>x.id)).size,15)
  for (const [index, lesson] of storytellingLessons.entries()) {
    assert.equal(lesson.id,String(index+1).padStart(2,'0'))
    assert.ok(storytellingUnits.some(unit=>unit.id===lesson.unit))
    assert.equal(lesson.beats.length,3)
    assert.equal(lesson.check.options.length,2)
    assert.ok([0,1].includes(lesson.check.correct))
    for(const property of ['title','jaTitle','story','sceneJa','principle','principleJa','task','taskJa'])
      assert.ok(lesson[property].length > (['story','principle','task'].includes(property) ? 15 : 1),lesson.id+' missing '+property)
  }
})
