import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { usesSharedStudyLayout, studyIllustrations, studyPhraseAnchors, isStudyIntroduction } from '../src/web/socialStudyLayout.js'
import { selectTeachingNotes } from '../src/web/teachingNotes.js'
import { illustratedStudyPresentation } from '../src/web/illustratedStudyPresentation.js'
import { emphasizeNoteRuns } from '../src/web/studyTextPresentation.js'

const visibleText = (html) => html.replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ').trim()
const plain = (runs) => runs.map((run) => run.text).join('').replace(/\s+/g, ' ').trim()

test('every shared study chapter renders both languages with its complete source and unique phrase anchors', { timeout: 60000 }, async () => {
  let language = 'en'
  const oldWindow = globalThis.window
  globalThis.window = { localStorage: { getItem: () => language } }
  let vite
  let chapters = 0
  let blocks = 0
  try {
    vite = await createServer({ appType: 'custom', server: { middlewareMode: true, hmr: false }, logLevel: 'error' })
    const { default: StudySection } = await vite.ssrLoadModule('/src/web/SocialStudySection.jsx')
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    for (language of ['en', 'ja']) {
      for (let number = 1; number <= 96; number++) {
        const id = String(number).padStart(2, '0')
        if (!usesSharedStudyLayout(id)) continue
        const root = language === 'ja' ? '../src/course/locales/ja/lessons/' : '../src/course/lessons/'
        const source = JSON.parse(readFileSync(new URL(`${root}${id}.json`, import.meta.url), 'utf8'))
        const notes = selectTeachingNotes(source.study)
        const byId = Object.fromEntries(source.phraseBank.map((item) => [item.id, item]))
        const sections = source.study.map((section, sectionIndex) => ({
          ...section,
          blocks: section.blocks.map((block, blockIndex) => block.type === 'conversation' ? block : {
            type: 'source', id: block.id,
            source: { ...block, teachingNote: notes[`${sectionIndex}:${blockIndex}`] },
          }),
        })).map((section) => ({ ...section,
          blocks: illustratedStudyPresentation(section, id, language, byId).blocks,
        }))
        const anchors = studyPhraseAnchors(sections)
        for (const section of sections) {
          if (!isStudyIntroduction(section)) assert.ok(studyIllustrations[section.id], `${language}:${id}: teaching card ${section.id} needs an illustration`)
        }
        const html = renderToStaticMarkup(createElement(LanguageProvider, null,
          sections.map((section) => createElement(StudySection, {
            key: section.id, section, chapterId: id, byId, anchors,
            audioProps: { byId, audio: { playing: false }, onPlay: () => {} },
            renderConversation: (block) => {
              assert.equal(block.art, null, `${language}:${id}: conversations keep text and portraits without a scene illustration`)
              return createElement('div', { key: block.id, 'data-conversation': block.id },
                block.studyTitle && createElement('h3', { 'data-source-block': block.captionSourceId }, block.studyTitle))
            },
            renderDiagram: () => null,
          }))))
        const text = visibleText(html)
        if (id === '88') {
          assert.ok(html.includes('study-objects/appmenu.svg'), 'software vocabulary shows an application menu')
          assert.equal(html.includes('study-objects/menu.svg'), false, 'the restaurant menu is reserved for restaurant vocabulary')
        }
        for (const section of source.study) {
          for (const block of section.blocks) {
            if (block.type === 'conversation') continue
            blocks++
            assert.equal(html.split(`data-source-block="${block.id}"`).length - 1, 1, `${language}:${id}: source block ${block.id} must appear exactly once`)
            const presented = sections.flatMap((section) => section.blocks).find((entry) => entry.id === block.id || entry.source?.sourceBlockIds?.includes(block.id))?.source
            if (presented?.editorialRewrite) {
              for (const phraseId of block.phraseIds ?? []) assert.ok(anchors[phraseId], `${language}:${id}: edited reference keeps ${phraseId}`)
              continue
            }
            if (presented?.reformattedDefinition) {
              for (const run of block.runs.filter((run) => run.emphasis)) {
                assert.ok(text.includes(plain([run])), `${language}:${id}: definition target retained: ${run.text}`)
              }
              continue
            }
            const runs = block.runs ? [block.runs]
              : block.rows ? block.rows.flat()
                : block.items ? block.items.map((item) => item.runs)
                  : block.paragraphs ?? []
            for (const run of runs) {
              const expected = plain(run)
              assert.ok(!expected || text.includes(expected), `${language}:${id}: lost source text in ${block.id}: ${expected.slice(0, 90)}`)
            }
          }
        }
        for (const phraseId of Object.keys(anchors)) {
          assert.equal(html.split(`id="study-${phraseId}"`).length - 1, 1, `${language}:${id}: unique deep link for ${phraseId}`)
        }
        assert.ok(!html.includes('Illustration coming soon'), `${language}:${id}: no unfinished illustration panel`)
        chapters++
      }
    }
    assert.equal(chapters, 166)
    assert.ok(blocks > 1000)
  } finally {
    await vite?.close()
    if (oldWindow === undefined) delete globalThis.window
    else globalThis.window = oldWindow
  }
})

test('every curated study illustration is a bundled local asset', () => {
  assert.ok(studyIllustrations['13-study-0'] && studyIllustrations['96-study-2'])
  for (const [section, image] of Object.entries(studyIllustrations)) {
    assert.ok(image.en && image.ja, `${section} has bilingual alternative text`)
    assert.ok(existsSync(new URL(`../public/assets/course/${image.file}`, import.meta.url)), `${section}: missing ${image.file}`)
    assert.ok(image.width > 0 && image.height > 0, `${section}: reserve the artwork's native ratio`)
    if (image.file.endsWith('.svg')) {
      const svg = readFileSync(new URL(`../public/assets/course/${image.file}`, import.meta.url), 'utf8')
      assert.ok(svg.includes('<svg') && svg.includes('<title>'), `${section}: accessible vector artwork`)
      assert.equal(/<(?:script|foreignObject)|(?:href|xlink:href)=["']https?:|data:image/.test(svg), false,
        `${section}: self-contained native vector, with no remote dependencies`)
    }
  }
})

test('the marked weather, family, and life-events cards ship distinct native RGBA illustrations', () => {
  const hashes = new Set()
  for (const id of ['13', '15', '16']) {
    const source = JSON.parse(readFileSync(new URL(`../src/course/lessons/${id}.json`, import.meta.url)))
    for (const section of source.study) {
      const art = studyIllustrations[section.id]
      const bytes = readFileSync(new URL(`../public/assets/course/${art.file}`, import.meta.url))
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      assert.equal(bytes[25], 6, `${section.id}: RGBA cutout required`)
      assert.equal(bytes.readUInt32BE(16), art.width)
      assert.equal(bytes.readUInt32BE(20), art.height)
      hashes.add(createHash('sha256').update(bytes).digest('hex'))
    }
  }
  assert.equal(hashes.size, 11)
})

test('Chapter 14 replaces all 47 emoji placeholders with relationship and life-stage figures in both languages', async () => {
  let language = 'en'
  const oldWindow = globalThis.window
  globalThis.window = { localStorage: { getItem: () => language } }
  const vite = await createServer({ appType: 'custom', server: { middlewareMode: true, hmr: false }, logLevel: 'error' })
  try {
    const { default: FamilyBoard } = await vite.ssrLoadModule('/src/web/Chapter14VisualBoard.jsx')
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    for (language of ['en', 'ja']) {
      const html = renderToStaticMarkup(createElement(LanguageProvider, null, createElement(FamilyBoard)))
      const pictures = [...html.matchAll(/src="([^"]*family-symbols\/[^"/]+\.svg)"/g)]
      assert.equal(pictures.length, 47)
      assert.equal(html.includes('ar-f14-picture-icon'), false)
      assert.equal(visibleText(html).includes('You share one birth parent.'), false)
      assert.equal(visibleText(html).includes('Your stepparent’s child from another relationship is your stepbrother or stepsister.'), false)
      assert.equal(visibleText(html).includes('生みの親を一人共有する兄弟姉妹です。'), false)
      assert.equal(visibleText(html).includes('継親の別の関係で生まれた子は、あなたの義理の兄弟姉妹です。'), false)
      for (const [, path] of pictures) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${language}: ${path}`)
      assert.ok(html.includes('Listen to siblings') || html.includes('siblingsの発音を聞く'), 'word audio stays available')
    }
    const files = readdirSync(new URL('../public/assets/course/family-symbols/', import.meta.url))
    assert.equal(files.length, 47)
    const siblings = ['oldest-child', 'middle-child', 'youngest-child'].map((slug) =>
      readFileSync(new URL(`../public/assets/course/family-symbols/${slug}.svg`, import.meta.url), 'utf8'))
    assert.equal(new Set(siblings).size, 3, 'birth-order diagrams highlight different children')
  } finally {
    await vite.close()
    if (oldWindow === undefined) delete globalThis.window
    else globalThis.window = oldWindow
  }
})

test('Chapter 10 removes the selected accent requirement while retaining its familiar closings', () => {
  const en = readFileSync(new URL('../src/course/chapters/10-saying-goodbye.md', import.meta.url), 'utf8')
  const ja = readFileSync(new URL('../src/course/locales/ja/chapters/10-saying-goodbye.md', import.meta.url), 'utf8')
  assert.equal(en.includes('none is a required way to sound American'), false)
  assert.equal(ja.includes('アメリカらしく話すために、どれかが必須'), false)
  for (const phrase of ['Catch you later', 'See ya', 'I gotta go', "I'm out"]) {
    assert.ok(en.includes(phrase) && ja.includes(phrase))
  }
})

test('notes emphasize explained English phrases in either language without changing text or unrelated words', () => {
  let checked = 0
  for (const language of ['en', 'ja']) for (const id of ['90', '91', '92', '93', '94']) {
    const root = language === 'ja' ? '../src/course/locales/ja/lessons/' : '../src/course/lessons/'
    const chapter = JSON.parse(readFileSync(new URL(`${root}${id}.json`, import.meta.url)))
    const byId = Object.fromEntries(chapter.phraseBank.map((item) => [item.id, item]))
    for (const block of chapter.study.flatMap((section) => section.blocks)) {
      if (!block.runs) continue
      const before = JSON.stringify(block.runs)
      const result = emphasizeNoteRuns(block.runs, byId)
      const text = block.runs.map((run) => run.text).join('')
      assert.equal(result.map((run) => run.text).join(''), text)
      assert.equal(JSON.stringify(block.runs), before)
      const bold = result.filter((run) => run.emphasis).map((run) => run.text).join('\n')
      for (const match of text.matchAll(/[“"]([^”"\n]+)[”"]/g)) {
        if (!/[a-z]/i.test(match[1])) continue
        assert.ok(bold.includes(match[1]), `${language}:${block.id}: ${match[1]} should be bold`)
        checked++
      }
    }
  }
  assert.ok(checked > 100)
  const unrelated = emphasizeNoteRuns([{ text: 'A useful reply is below. Confirm the contact details.' }], {
    reply: { en: 'reply' }, contact: { en: 'contact' },
  })
  assert.ok(unrelated.every((run) => !run.emphasis), 'ordinary mentions are not definition targets')
  const subjects = emphasizeNoteRuns([{ text: 'Breaking up here means interrupted sound. Drop can describe a call ending.' }])
  assert.deepEqual(subjects.filter((run) => run.emphasis).map((run) => run.text), ['Breaking up', 'Drop'])
  for (const text of ['So moves the conversation to the next step.', 'So で次の行動へ進みます。']) {
    const explicit = emphasizeNoteRuns([{ text }], {}, ['So'])
    assert.equal(explicit.find((run) => run.text === 'So')?.emphasis, true)
    assert.equal(explicit.map((run) => run.text).join(''), text)
  }
  assert.ok(emphasizeNoteRuns([{ text: 'Someone else explains it.' }], {}, ['So']).every((run) => !run.emphasis))
})

test('marked late-course references use complete paired tables and retain merged source identities', () => {
  const expected = {
    '88-study-1': [11], '88-study-2': [16], '88-study-3': [12], '88-study-4': [24],
    '89-study-0': [4], '90-study-0': [2], '90-study-3': [5],
    '91-study-0': [9], '91-study-2': [6, 7], '92-study-0': [5], '92-study-2': [4],
    '93-study-0': [11], '95-study-0': [4], '95-study-1': [4], '95-study-2': [4],
    '96-study-0': [6], '96-study-2': [5],
  }
  for (const language of ['en', 'ja']) for (const [sectionId, rowCounts] of Object.entries(expected)) {
    const id = sectionId.slice(0, 2)
    const chapter = JSON.parse(readFileSync(new URL(`../src/course/${language === 'ja' ? 'locales/ja/' : ''}lessons/${id}.json`, import.meta.url)))
    const original = chapter.study.find((section) => section.id === sectionId)
    const section = { ...original, blocks: original.blocks.map((block) => block.type === 'conversation' ? block : { id: block.id, type: 'source', source: block }) }
    const tables = illustratedStudyPresentation(section, id, language).blocks.filter((block) => block.source?.type === 'table' && block.source.editorialRewrite)
    assert.deepEqual(tables.map((block) => block.source.rows.length), rowCounts, `${language}:${sectionId}`)
    for (const table of tables) {
      assert.equal(table.source.header.length, 2)
      assert.ok(table.source.rows.every((row) => row.length === 2 && row.every((cell) => plain(cell).length > 0)))
      const originalIds = table.source.sourceBlockIds.flatMap((id) => original.blocks.find((block) => block.id === id)?.phraseIds ?? [])
      assert.deepEqual(new Set(table.source.phraseIds), new Set(originalIds))
    }
  }
})

test('email and form examples show complete supplied content and explanatory parts in both languages', async () => {
  let language = 'en'
  const oldWindow = globalThis.window
  globalThis.window = { localStorage: { getItem: () => language } }
  const vite = await createServer({ appType: 'custom', server: { middlewareMode: true, hmr: false }, logLevel: 'error' })
  try {
    const { StudyEmail, StudyForm } = await vite.ssrLoadModule('/src/web/StudyDocuments.jsx')
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    const { default: Home } = await vite.ssrLoadModule('/src/web/Home.jsx')
    const render = (element) => renderToStaticMarkup(createElement(LanguageProvider, null, element))
    for (language of ['en', 'ja']) {
      const chapter = JSON.parse(readFileSync(new URL(`../src/course/${language === 'ja' ? 'locales/ja/' : ''}lessons/93.json`, import.meta.url)))
      const section = chapter.study.find((section) => section.id === '93-study-1')
      for (const block of section.blocks.filter((block) => block.paragraphs)) {
        const reply = block.type !== 'email'
        const html = render(createElement(StudyEmail, { block: { ...block, presentation: reply ? 'email-reply' : 'email-anatomy' } }))
        for (const paragraph of block.paragraphs) assert.ok(visibleText(html).includes(plain(paragraph)))
        assert.equal((html.match(/class="ar-email-annotation"/g) ?? []).length, reply ? 3 : 5)
        assert.ok(html.includes(reply ? 'Re: Tuesday workshop: new room' : 'From') || language === 'ja')
      }
      const form = render(createElement(StudyForm))
      for (const text of ['Name', 'Email address', 'Course choice', 'Submit', 'Registration received. A confirmation will be sent.']) assert.ok(visibleText(form).includes(text))
      assert.equal(/<form|<input|<button/.test(form), false, 'the supplied example cannot send personal information')
      const home = render(createElement(Home))
      assert.equal((home.match(/class="ah-option ah-option--/g) ?? []).length, 4)
      assert.equal(home.includes('ah-action'), false)
      for (const href of ['#/foundation/orientation/study', '#/courses?foundation', '#/courses?social', '#/courses?application']) assert.ok(home.includes(`href="${href}"`))
    }
  } finally {
    await vite.close()
    if (oldWindow === undefined) delete globalThis.window
    else globalThis.window = oldWindow
  }
})
