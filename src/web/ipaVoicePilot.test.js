import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Piper pilot is a single US-English model trained on public-domain LJ Speech', () => {
  const source = readFileSync(new URL('../../scripts/generate_ipa_voice_pilot.py', import.meta.url), 'utf8')
  const workflow = readFileSync(new URL('../../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8')
  assert.match(source, /MODEL = "en_US-ljspeech-medium"/)
  assert.match(source, /"seat"/)
  assert.match(source, /"sit"/)
  assert.match(source, /"thin"/)
  assert.match(source, /"this"/)
  assert.match(source, /voice\.synthesize_wav\(/)
  assert.match(workflow, /python3 -m piper\.download_voices en_US-ljspeech-medium/)
  assert.match(workflow, /generate_ipa_voice_pilot\.py/)
  assert.match(workflow, /-eq 12/)
})

test('Pilot only replaces prior Hamburg trial in Study, not regular IPA practice', () => {
  const ui = readFileSync(new URL('./IpaVoicePilot.jsx', import.meta.url), 'utf8')
  const host = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  assert.match(host, /<IpaVoicePilot \/>/)
  assert.doesNotMatch(host, /<IpaHamburgPilot \/>/)
  assert.match(ui, /voiceSamples/)
  assert.match(ui, /new Audio\(pilotAudioUrl/)
  assert.doesNotMatch(ui, /speechSynthesis|SpeechSynthesisUtterance/)
  const practice = host.slice(host.indexOf("if (mode === 'practice')"), host.indexOf('return (\n    <div className="ipa-reference ipa-study">'))
  assert.doesNotMatch(practice, /IpaVoicePilot/)
})
