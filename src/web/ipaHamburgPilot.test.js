import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hamburgAmericanSamples, HAMBURG_SOURCE } from './ipaHamburgPilot.js'
import { allIpaSounds } from './ipaSounds.js'

test('Hamburg trial has ten American July 2019 recordings mapped to Artico IPA', () => {
  assert.equal(hamburgAmericanSamples.length, 10)
  assert.equal(new Set(hamburgAmericanSamples.map(item => item.ipa)).size, 10)
  assert.equal(new Set(hamburgAmericanSamples.map(item => item.url)).size, 10)
  for (const item of hamburgAmericanSamples) {
    assert.ok(allIpaSounds.some(sound => sound.ipa === item.ipa), item.ipa)
    assert.match(item.url, /^https:\/\/englishexplorations\.check\.uni-hamburg\.de\/wp-content\/uploads\/2019\/07\/[a-z]+\.mp3$/)
    assert.ok(item.example && item.category)
  }
  assert.match(HAMBURG_SOURCE, /basic-concepts-of-english-phonetics-and-pronunciation/)
})

test('UHH clips are streamed only on user request; no copying or synthetic audio is added', () => {
  const ui = readFileSync(new URL('./IpaHamburgPilot.jsx', import.meta.url), 'utf8')
  const host = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(host, /<IpaHamburgPilot \/>/)
  assert.match(ui, /<details/)
  assert.match(ui, /new Audio\(item\.url\)/)
  assert.match(ui, /onClick=\{\(\) => play\(item\)\}/)
  assert.match(ui, /HAMBURG_SOURCE/)
  assert.doesNotMatch(ui, /speechSynthesis|SpeechSynthesisUtterance|BASE_URL|audio\/ipa\//)
  const practiceBranch = host.slice(host.indexOf("if (mode === 'practice')"), host.indexOf('return (\n    <div className="ipa-reference ipa-study">'))
  assert.doesNotMatch(practiceBranch, /IpaHamburgPilot/)
})
