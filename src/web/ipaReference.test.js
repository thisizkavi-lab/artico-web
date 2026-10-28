import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ipaGroups, allIpaSounds, getIpaSound, IPA_VOICE, IPA_VOICE_SOURCE } from './ipaSounds.js'

test('American English IPA chart covers consonants, vowels and glides with unique sound labels', () => {
  assert.deepEqual(ipaGroups.map(group => group.id), ['consonants', 'vowels', 'diphthongs'])
  assert.equal(ipaGroups[0].sounds.length, 24)
  assert.ok(ipaGroups[1].sounds.length >= 10)
  assert.equal(ipaGroups[2].sounds.length, 5)
  const ids = allIpaSounds.map(sound => sound.ipa)
  assert.equal(new Set(ids).size, ids.length)
  for (const sound of allIpaSounds) {
    assert.ok(sound.word && sound.clue && sound.ja)
    assert.equal(getIpaSound(sound.ipa).word, sound.word)
    if (sound.audioFile) assert.match(sound.audioFile, /^En-us-[A-Za-z-]+\.ogg$/)
  }
})

test('paired sounds and important General American notation distinctions remain visible', () => {
  for (const sound of ['i', 'ɪ', 'æ', 'ɛ', 'ʌ', 'ə', 'ɹ', 'θ', 'ð', 'ʃ', 'ʒ', 'tʃ', 'dʒ', 'aɪ', 'ɝ', 'ɚ', 'ɑ', 'ɔ'])
    assert.ok(getIpaSound(sound), sound)
  assert.match(IPA_SOURCE_BASE, /^https:\/\/commons\.wikimedia\.org\//)
  assert.equal(getIpaSound('i').word, 'seat')
  assert.equal(getIpaSound('ɪ').word, 'sit')
  assert.ok(allIpaSounds.every(sound => sound.audioFile.endsWith('.wav')))
  assert.equal(getIpaSound('eɪ').word, 'day')
  assert.equal(getIpaSound('aɪ').word, 'my')
})

test('Sounds Study and Practice use the same IPA guide without the old YouTube embed', () => {
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  const foundation = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  const en = readFileSync(new URL('../course/foundations-en.js', import.meta.url), 'utf8')
  const ja = readFileSync(new URL('../course/locales/ja/02-foundations.md', import.meta.url), 'utf8')
  const jaData = JSON.parse(readFileSync(new URL('../course/locales/ja/foundations.json', import.meta.url), 'utf8'))
  assert.match(ui, /mode === 'practice'/)
  assert.match(ui, /audio\\/ipa-one-voice/)
  assert.doesNotMatch(ui, /speechSynthesis|SpeechSynthesisUtterance|commons\\.wikimedia|IPA_SOURCE_BASE/)
  assert.match(ui, /onerror/)
  assert.match(foundation, /section\.id === 'sounds-listen' && <IpaReference mode="study"/)
  assert.match(foundation, /id === 'sounds'\) return <IpaReference mode="practice"/)
  assert.doesNotMatch(en, /JwTDPu2TE6k/)
  assert.doesNotMatch(ja, /JwTDPu2TE6k/)
  assert.equal(jaData.sounds.sections.find(section => section.id === 'sounds-listen').video, undefined)
})
