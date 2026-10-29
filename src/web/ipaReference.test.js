import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ipaGroups, allIpaSounds, getIpaSound, IPA_VOICE, IPA_VOICE_SOURCE } from './ipaSounds.js'
import { ipaCurriculum } from './ipaCurriculum.js'
import { foundationReading } from '../course/foundations-en.js'

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

test('F03 guides the learner from 26 letters to General American sounds and five reading sections', () => {
  const ids = ['sounds-difference', 'sounds-reference', 'sounds-ipa', 'sounds-listen', 'sounds-routine']
  const en = foundationReading.sounds
  const ja = JSON.parse(readFileSync(new URL('../course/locales/ja/foundations.json', import.meta.url), 'utf8')).sounds
  assert.deepEqual(en.sections.map(section => section.id), ids)
  assert.deepEqual(ja.sections.map(section => section.id), ids)
  assert.match(en.sections[0].paragraphs.join(' '), /26 letters/)
  assert.match(en.sections[1].paragraphs.join(' '), /General American English/)
  assert.match(en.sections[2].paragraphs.join(' '), /symbols look so strange/)
  assert.match(en.sections[2].paragraphs.join(' '), /Latin letters/)
  assert.match(en.sections[3].paragraphs.join(' '), /24 consonant entries.*12 vowel entries.*5 vowel glides/)
  assert.match(en.sections[4].paragraphs.join(' '), /seat.*sit/)
  assert.ok(ja.sections.every(section => section.blocks.length > 0))
  const jaText = JSON.stringify(ja)
  assert.match(jaText, /41項目/)
  assert.match(jaText, /一般米語/)
  for (const phrase of [JSON.stringify(en),jaText])
    assert.doesNotMatch(phrase, /Piper|Gemini|Qwen|synthetic|recordingNote|voice model|HuggingFace/)
})

test('Study places exactly three narrated sound groups inline, with no duplicated prose or source notes', () => {
  for (const locale of ['en', 'ja']) {
    const groupDescriptions = ipaCurriculum[locale].groupDescriptions
    for (const group of ipaGroups) {
      assert.ok(Array.isArray(groupDescriptions[group.id]))
      assert.ok(groupDescriptions[group.id].length > 0)
      assert.ok(groupDescriptions[group.id].every(paragraph => paragraph.length > 20))
    }
    const combined = JSON.stringify(groupDescriptions)
    assert.match(combined, /\/ʃ\//)
    assert.match(combined, /\/ə\//)
    assert.match(combined, /\/ɝ\//)
    assert.match(combined, /\/ɚ\//)
    assert.match(combined, /\/ɑ\//)
    assert.match(combined, /\/ɔ\//)
    assert.doesNotMatch(combined, /piper|qwen|gemini|tts|synthesis|generated|huggingface|wav/i)
  }
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  assert.match(ui, /scope\.groupDescriptions\[group\.id\]\.map/)
  assert.ok(ui.includes('ipa-table-section'))
  assert.ok(ui.includes('ipa-one-voice'))
  assert.doesNotMatch(ui, /ipa-scope-counts|ipa-beyond|SourceDisclosure|recordingNote|Piper|LJ Speech|IPA_VOICE_SOURCE|synthetic/i)
  const doc = readFileSync(new URL('../../docs/general-american-pronunciation-syllabus.md', import.meta.url), 'utf8')
  assert.match(doc, /24 foundational categories/)
  assert.match(doc, /Stage 6/)
})

test('Each IPA example is clickable across its entire row while retaining one accessible speaker control', () => {
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./ipa-reference.css', import.meta.url), 'utf8')
  const glyph = readFileSync(new URL('./Glyph.jsx', import.meta.url), 'utf8')
  assert.match(ui, /<tr key=\{item\.ipa\} className="ipa-sound-row"\s+onClick=\{\(\) => play\(item, l\)\}/)
  assert.match(ui, /<SoundButton sound=\{item\} l=\{l\} play=\{play\}\/>/)
  assert.match(ui, /event\.stopPropagation\(\)/)
  assert.match(ui, /<Glyph name="speaker"/)
  assert.doesNotMatch(ui, /<Glyph name="play"/)
  assert.match(glyph, /speaker:/)
  assert.match(css, /\.ipa-table tbody \.ipa-sound-row \{ cursor: pointer;/)
  assert.match(css, /\.ipa-table tbody \.ipa-sound-row:hover/)
  assert.match(css, /\.ipa-play:focus-visible/)
  assert.match(ui, /aria-label=\{\x60\$\{l\.listen\}/)
  // Practice selectors immediately pronounce the selected sound.
  assert.match(ui, /onClick=\{\(\) => \{ setSelected\(item\.ipa\); play\(item, l\) \}\}/)
  assert.match(ui, /ipa-focus ipa-focus--playable" onClick=\{\(\) => play\(sound, l\)\}/)
})

test('IPA reference shows two groups and every highlighted word can play its own recording', () => {
  const ui = readFileSync(new URL('./IpaReference.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./ipa-reference.css', import.meta.url), 'utf8')
  const annotations = JSON.parse(readFileSync(new URL('./ipaExamples.json', import.meta.url), 'utf8'))
  assert.deepEqual(Object.keys(annotations).sort(), allIpaSounds.map(item => item.ipa).sort())
  assert.match(ui, /const ipaDisplayGroups = \[/)
  assert.match(ui, /sounds: \[\.\.\.ipaGroups\[1\]\.sounds, \.\.\.ipaGroups\[2\]\.sounds\]/)
  assert.match(ui, /<HighlightedExample key=\{example\}/)
  assert.match(ui, /event\.stopPropagation\(\); play\(sound, l, word\)/)
  assert.match(ui, /<mark>\{parts\[2\]\}<\/mark>/)
  assert.match(css, /\.ipa-example mark/)
  const audioFiles = new Set()
  for (const item of allIpaSounds) {
    const examples = annotations[item.ipa]
    assert.equal(examples.length, 2, item.ipa)
    const words = examples.map(marked => {
      assert.match(marked, /^[a-z]*\[[a-z]+\][a-z]*$/)
      const word = marked.replace(/[\[\]]/g, '')
      audioFiles.add(word + '.wav')
      return word
    })
    assert.ok(words.includes(item.word), item.ipa)
  }
  assert.ok(audioFiles.size > 41)
  assert.deepEqual(annotations.i, ['s[ea]t', 'b[ee]t'])
  assert.deepEqual(annotations['ɪ'], ['s[i]t', 'l[i]p'])
})
