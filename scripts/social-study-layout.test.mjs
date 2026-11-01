import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { usesSharedStudyLayout, studyIllustrations, studyPhraseAnchors } from '../src/web/socialStudyLayout.js'
import { selectTeachingNotes } from '../src/web/teachingNotes.js'

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
    vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
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
        }))
        const anchors = studyPhraseAnchors(sections)
        const html = renderToStaticMarkup(createElement(LanguageProvider, null,
          sections.map((section) => createElement(StudySection, {
            key: section.id, section, chapterId: id, byId, anchors,
            audioProps: { byId, audio: { playing: false }, onPlay: () => {} },
            renderConversation: (block) => createElement('div', { key: block.id, 'data-conversation': block.id }),
            renderDiagram: () => null,
          }))))
        const text = visibleText(html)
        for (const section of source.study) {
          for (const block of section.blocks) {
            if (block.type === 'conversation') continue
            blocks++
            assert.equal(html.split(`data-source-block="${block.id}"`).length - 1, 1, `${language}:${id}: source block ${block.id} must appear exactly once`)
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
  assert.equal(Object.keys(studyIllustrations).length, 10)
  for (const [section, image] of Object.entries(studyIllustrations)) {
    assert.ok(image.en && image.ja, `${section} has bilingual alternative text`)
    assert.ok(existsSync(new URL(`../public/assets/course/${image.file}`, import.meta.url)), `${section}: missing ${image.file}`)
  }
})
