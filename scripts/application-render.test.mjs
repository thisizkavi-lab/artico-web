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
      assert.ok(!markup.includes('This page could not be loaded'),hash)
    }
  } finally {
    await vite?.close()
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
  }
})
