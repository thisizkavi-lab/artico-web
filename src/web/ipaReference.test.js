import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ipaGroups, allIpaSounds, getIpaSound, IPA_VOICE, IPA_VOICE_SOURCE } from './ipaSounds.js'
import { ipaCurriculum } from './ipaCurriculum.js'

test('American IPA lesson has 41 symbols and one predictable local voice file per example', () => {
  assert.deepEqual(ipaGroups.map(group => group.id), ['consonants', 'vowels', 'diphthongs'])
  assert.equal(ipaGroups[0].sounds.length, 24)
  assert.equal(ipaGroups[1].sounds.length, 12)
  assert.equal(ipaGroups[2].sounds.length, 5)
  assert.equal(allIpaSounds.length, 41)
  assert.equal(new Set(allIpaSounds.map(item => item.ipa)).size, 41)
  for (const sound of allIpaSounds) {
    assert.ok(sound.word && sound.clue && sound.ja)
    assert.equal(getIpaSound(sound.ipa).word, sound.word)
    assert.equal(sound.audioFile, sound.word.toLowerCase() + '.wav')
  }
  assert.equal(IPA_VOICE, 'en_US-ljspeech-medium')
  assert.match(IPA_VOICE_SOURCE, /piper-voices/)
})

test('American vowel contrasts and sensible synthesizer input words remain in place', () => {
  for (const phoneme of ['i','ɪ','æ','ɛ','ʌ','ə','ɹ','θ','ð','ʃ','ʒ','tʃ','dʒ','aɪ','ɝ','ɚ','ɑ','ɔ'])
    assert.ok(getIpaSound(phoneme), phoneme)
  assert.equal(getIpaSound('i').word, 'seat')
  assert.equal(getIpaSound('ɪ').word, 'sit')
  assert.equal(getIpaSound('eɪ').word, 'day')
  assert.equal(getIpaSound('aɪ').word, 'my')
  assert.equal(getIpaSound('ð').word, 'this')
})

test('Study and Practice use same local WAV playback without YouTube or fallback audio', () => {
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  const foundation = readFileSync(new URL('./Foundation.jsx', import.meta.url), 'utf8')
  const en = readFileSync(new URL('../course/foundations-en.js', import.meta.url), 'utf8')
  const ja = readFileSync(new URL('../course/locales/ja/02-foundations.md', import.meta.url), 'utf8')
  const jaData = JSON.parse(readFileSync(new URL('../course/locales/ja/foundations.json', import.meta.url), 'utf8'))
  assert.match(ui, /mode === 'practice'/)
  assert.ok(ui.includes('audio/ipa-one-voice/'))
  assert.ok(ui.includes('new Audio('))
  assert.doesNotMatch(ui, /speechSynthesis|SpeechSynthesisUtterance|commons.wikimedia|IPA_SOURCE_BASE|IpaVoicePilot|IpaHamburgPilot/)
  assert.match(foundation, /section\.id === 'sounds-listen' && <IpaReference mode="study"/)
  assert.match(foundation, /id === 'sounds'\) return <IpaReference mode="practice"/)
  assert.doesNotMatch(en, /JwTDPu2TE6k/)
  assert.doesNotMatch(ja, /JwTDPu2TE6k/)
  assert.equal(jaData.sounds.sections.find(section => section.id === 'sounds-listen').video, undefined)
})

test('General American syllabus explains selection, chart counts, variants, and connected speech in both languages', () => {
  for (const locale of ['en','ja']) {
    const lesson = ipaCurriculum[locale]
    assert.ok(lesson.heading && lesson.eyebrow && lesson.overview.length >= 2)
    for (const group of ipaGroups) assert.ok(lesson.groupDescriptions[group.id])
    assert.ok(lesson.countsNote && lesson.howToText && lesson.closing)
    assert.equal(lesson.beyond.length, 5)
    const readerText = JSON.stringify(lesson)
    for (const ipa of ['/ə/', '/ɝ/', '/ɚ/', '/ɑ/', '/ɔ/', '[ɾ]']) {
      assert.ok(readerText.includes(ipa), locale + ' missing ' + ipa)
    }
    assert.doesNotMatch(readerText, /piper|qwen|gemini|tts|synthesis|generated|huggingface|wav|model cards/i)
  }
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  assert.ok(ui.includes("scope.overview.map("))
  assert.ok(ui.includes("scope.groupDescriptions[group.id]"))
  assert.ok(ui.includes("scope.beyond.map("))
  assert.ok(ui.includes("ipa-scope-counts"))
  assert.doesNotMatch(ui, /SourceDisclosure|recordingNote|Piper|LJ Speech|IPA_VOICE_SOURCE|synthetic/i)
  const doc = readFileSync(new URL('../../docs/general-american-pronunciation-syllabus.md', import.meta.url), 'utf8')
  assert.match(doc, /24 foundational categories/)
  assert.match(doc, /Stage 6/)
  assert.match(doc, /cot.caught/i)
})
