import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

// Execute the same speech-player source against controlled browser APIs.
// No model download or real audio device is required for these regressions.
const source = readFileSync(new URL('./kokoroSpeech.js', import.meta.url), 'utf8')
  .replaceAll('export async function ', 'async function ')
  .replaceAll('export function ', 'function ')

function speechHarness(behavior) {
  let cancelCount = 0
  let id = 0
  const timers = new Map()
  const spoken = []
  const events = []
  const setTimeout = (fn) => { const key = ++id; timers.set(key, fn); return key }
  const clearTimeout = (key) => { timers.delete(key) }
  const synth = {
    paused: false,
    cancel() { cancelCount += 1 },
    getVoices() { return [{ name: 'US local voice', lang: 'en-US', localService: true }] },
    speak(utterance) {
      spoken.push(utterance)
      if (behavior === 'works' || (behavior === 'retry' && spoken.length === 2)) {
        utterance.onstart?.()
      }
    },
  }
  const window = {
    speechSynthesis: synth,
    SpeechSynthesisUtterance: class {
      constructor(text) { this.text = text }
    },
  }
  const engine = runInNewContext(
    source + '\n({ speakKokoroSpeech, stopKokoroSpeech })',
    { window, navigator: {}, setTimeout, clearTimeout, console, performance: { now: () => 0 } },
  )
  function flushTimers() {
    const queued = [...timers.values()]
    timers.clear()
    queued.forEach(fn => fn())
  }
  return { engine, spoken, events, synth, flushTimers, get cancelCount() { return cancelCount } }
}

test('first vocabulary click speaks without first cancelling the browser speech queue', async () => {
  const h = speechHarness('works')
  assert.equal(await h.engine.speakKokoroSpeech('tea', {
    onLoading: () => h.events.push('loading'),
    onStart: () => h.events.push('start'),
    onEnd: () => h.events.push('end'),
  }), true)
  assert.equal(h.cancelCount, 0)
  assert.equal(h.spoken.length, 1)
  assert.equal(h.spoken[0].voice.name, 'US local voice')
  assert.deepEqual(h.events, ['loading', 'start'])
  h.spoken[0].onend()
  assert.deepEqual(h.events, ['loading', 'start', 'end'])
})

test('a silent first attempt retries another installed voice', async () => {
  const h = speechHarness('retry')
  await h.engine.speakKokoroSpeech('coffee', {
    onLoading: () => h.events.push('loading'),
    onStart: () => h.events.push('start'),
    onError: () => h.events.push('error'),
  })
  assert.deepEqual(h.events, ['loading'])
  h.flushTimers()
  h.flushTimers()
  assert.equal(h.spoken.length, 2)
  assert.equal(h.cancelCount, 1)
  assert.deepEqual(h.events, ['loading', 'start'])
})

test('a browser with permanently silent speech reports an error', async () => {
  const h = speechHarness('silent')
  await h.engine.speakKokoroSpeech('orange', {
    onLoading: () => h.events.push('loading'),
    onStart: () => h.events.push('start'),
    onError: () => h.events.push('error'),
  })
  for (let i = 0; i < 7; i++) h.flushTimers()
  assert.equal(h.spoken.length, 3)
  assert.deepEqual(h.events, ['loading', 'error'])
})
