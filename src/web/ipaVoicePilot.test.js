import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { allIpaSounds } from './ipaSounds.js'

test('Single-voice generator derives the whole chart from current source symbols', () => {
  const source = readFileSync(new URL('../../scripts/generate_ipa_single_voice.py', import.meta.url), 'utf8')
  const workflow = readFileSync(new URL('../../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8')
  assert.match(source, /MODEL = "en_US-ljspeech-medium"/)
  assert.match(source, /ENTRY\.findall\(text\)/)
  assert.match(source, /voice\.synthesize_wav\(/)
  assert.match(source, /EXPECTED_ENTRIES = 41/)
  assert.match(workflow, /python3 -m piper\.download_voices en_US-ljspeech-medium/)
  assert.match(workflow, /generate_ipa_single_voice\.py/)
  assert.match(workflow, /Verify every IPA word example has its locally hosted WAV/)
  assert.match(workflow, /len\(entries\)==41/)
  assert.equal(new Set(allIpaSounds.map(sound => sound.word.toLowerCase())).size,
    new Set(allIpaSounds.map(sound => sound.audioFile)).size)
})

test('Entire study and practice use one WAV path with no TTS or preview overrides', () => {
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  assert.match(ui, /mode === 'practice'/)
  assert.match(ui, /<SoundButton sound=\{sound\}/)
  assert.match(ui, /<SoundButton sound=\{item\}/)
  assert.match(ui, /audio\/ipa-one-voice/)
  assert.doesNotMatch(ui, /<IpaVoicePilot|<IpaHamburgPilot|speechSynthesis|commons\.wikimedia/)
  assert.doesNotMatch(ui, /synthetic word examples|Piper|LJ Speech|合成音声|source recording|voice model/i)
  assert.match(ui, /ipa-chart-grid/)\n  assert.match(ui, /<SoundTable group=\\{lessCommon\\}/)
})
