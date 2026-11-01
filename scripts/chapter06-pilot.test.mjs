import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { chapter06Presentation } from '../src/web/chapter06Presentation.js'
import { sectionPhraseIds } from '../src/web/phraseSceneData.js'
import { selectTeachingNotes } from '../src/web/teachingNotes.js'

const plain = (runs = []) => runs.map((run) => run.text).join('').replace(/\s+/g, ' ').trim()
const visible = (html) => html.replace(/<[^>]*>/g, '').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const read = (language) => JSON.parse(readFileSync(new URL(
  `../src/course/${language === 'ja' ? 'locales/ja/' : ''}lessons/06.json`, import.meta.url), 'utf8'))

test('chapter 6 comparison tables preserve all reply forms and Japanese row explanations', () => {
  for (const language of ['en', 'ja']) {
    const source = read(language)
    const byId = Object.fromEntries(source.phraseBank.map((phrase) => [phrase.id, phrase]))
    const section = { ...source.study[0], blocks: source.study[0].blocks.map((block) =>
      block.type === 'conversation' ? block : { type: 'source', id: block.id, source: block }) }
    const original = JSON.stringify(section)
    const { entries, boardIds } = chapter06Presentation(section, byId)
    const rows = entries.find((entry) => entry.type === 'reply-table').groups.flatMap((group) => group.rows)
    assert.deepEqual(rows.map((row) => [row.statement, row.reply]), [
      ['I love this song.', 'Me too. / So do I.'],
      ["I don't like crowded rooms.", 'Me neither. / Neither do I.'],
      ["I don't think this is a good plan.", "I don't think so either."],
    ])
    assert.equal(rows.every((row) => byId[row.phraseId]?.en === `${row.statement} — ${row.reply}`), true)
    if (language === 'ja') assert.equal(rows.filter((row) => row.annotation?.runs.length).length, 3)
    assert.equal(boardIds.length, 5)
    assert.equal(JSON.stringify(section), original, 'presentation must not mutate the source lesson')
  }
})

test('chapter 6 renders both languages with complete teaching content, conversations and unique phrase anchors', async () => {
  let language = 'en'
  const oldWindow = globalThis.window
  globalThis.window = { localStorage: { getItem: () => language } }
  const vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' })
  try {
    const { default: StudySection } = await vite.ssrLoadModule('/src/web/Chapter06StudySection.jsx')
    const { LanguageProvider } = await vite.ssrLoadModule('/src/web/Language.jsx')
    for (language of ['en', 'ja']) {
      const source = read(language)
      const byId = Object.fromEntries(source.phraseBank.map((phrase) => [phrase.id, phrase]))
      const notes = selectTeachingNotes(source.study)
      const sections = source.study.map((section, si) => ({ ...section,
        blocks: section.blocks.map((block, bi) => block.type === 'conversation' ? block : {
          type: 'source', id: block.id, source: { ...block, teachingNote: notes[`${si}:${bi}`] },
        }),
      }))
      const html = renderToStaticMarkup(createElement(LanguageProvider, null, sections.map((section) =>
        createElement(StudySection, {
          key: section.id, section, byId,
          audioProps: { byId, audio: { playing: false }, onPlay: () => {} },
          Audio: () => null,
          renderBoard: (ids) => createElement('div', null, sectionPhraseIds(section, byId, ids).map((id) =>
            createElement('span', { key: id, id: `study-${id}` }, byId[id].en))),
        }))))
      const text = visible(html)
      for (const section of source.study) {
        for (const block of section.blocks) {
          if (['ch06-b1', 'ch06-b11', 'ja-06-study-0-1', 'ja-06-study-2-2'].includes(block.id)) {
            assert.equal(text.includes(plain(block.runs)), false, `remove redundant scene label ${block.id}`)
            continue
          }
          const runs = block.runs ? [block.runs] : block.rows ? block.rows.flat()
            : block.items ? block.items.flatMap((item) => item.runs.map((run) => [run]))
              : block.turns?.map((turn) => [{ text: turn.en }]) ?? []
          for (const run of runs) {
            // The reply-table columns deliberately replace the typographic em dash.
            for (const part of plain(run).split(' — '))
              assert.ok(text.includes(part), `${language}: missing ${block.id}: ${part}`)
          }
        }
        const ids = [...sectionPhraseIds(section, byId), ...section.blocks.flatMap((block) => block.turns?.map((turn) => turn.id) ?? [])]
        for (const id of ids) assert.equal(html.split(`id="study-${id}"`).length - 1, 1, `${language}: anchor ${id}`)
      }
      assert.match(html, /ar-ch06-reply-table/)
      assert.match(html, /ar-ch06-intention-table/)
      assert.equal(html.includes('Good to know'), false)
      const reasonId = language === 'en' ? 'ch06-b10' : 'ja-06-study-2-1'
      const closeId = language === 'en' ? 'ch06-b15' : 'ja-06-study-3-1'
      for (const id of [reasonId, closeId]) assert.ok(html.includes(`class="ar-ch06-note" data-source-block="${id}"`))
    }
  } finally {
    await vite.close()
    if (oldWindow === undefined) delete globalThis.window
    else globalThis.window = oldWindow
  }
})
