import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ipaGroups, allIpaSounds, getIpaSound, IPA_VOICE, IPA_VOICE_SOURCE } from './ipaSounds.js'
import { ipaCurriculum } from './ipaCurriculum.js'
import { foundationReading } from '../course/foundations-en.js'

const source = name => readFileSync(new URL(name, import.meta.url), 'utf8')
const examples = JSON.parse(source('./ipaExamples.json'))

test('Original American sound inventory and one-voice source remain stable', () => {
  assert.deepEqual(ipaGroups.map(group => group.id), ['consonants', 'vowels', 'diphthongs'])
  assert.deepEqual(ipaGroups.map(group => group.sounds.length), [24, 12, 5])
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

test('IPA chart matches the screenshot: 24 consonants, 15 vowels, 2 rare sounds', () => {
  const ui = source('./IpaReference.jsx')
  assert.match(ui, /const consonants = ipaGroups\[0\]/)
  assert.match(ui, /const vowels = \{/)
  assert.match(ui, /const lessCommon = \{/)
  assert.match(ui, /const displayGroups = \[consonants, vowels, lessCommon\]/)
  assert.match(ui, /<SoundTable group=\{consonants\}/)
  assert.match(ui, /<SoundTable group=\{vowels\}/)
  assert.match(ui, /<SoundTable group=\{lessCommon\}/)
  assert.match(ui, /ipa-chart-grid/)
  assert.match(ui, /ipa-chart-right/)
  assert.match(ui, /displaySymbol = ipa => ipa === 'ɹ' \? 'r' : ipa === 'eɪ' \? 'e \/ eɪ'/)
  const vowels = ['i','ɪ','eɪ','ɛ','æ','ʌ','ə','u','ʊ','oʊ','ɔ','ɑ','aɪ','aʊ','ɔɪ']
  assert.equal(vowels.length, 15)
  for (const ipa of vowels) assert.ok(getIpaSound(ipa), ipa)
  assert.ok(ui.includes("ipa: 'x'") && ui.includes("ipa: 'ʔ'"))
  assert.equal(24 + vowels.length + 2, 41)
})

test('Exact example words and green highlights are available for every screenshot row', () => {
  assert.equal(Object.keys(examples).length, 43) // 41 original symbols plus x and ʔ
  assert.deepEqual(examples.p, ['[p]it', 'li[p]'])
  assert.deepEqual(examples.k, ['[c]up','s[k]y','[c]li[ck]'])
  assert.deepEqual(examples['dʒ'], ['[j]ust','[g]iant','[j]u[dg]e','a[g]e'])
  assert.deepEqual(examples.i, ['f[ee]t','s[ea]t','m[e]','happ[y]'])
  assert.deepEqual(examples['ɪ'], ['s[i]t','g[y]m'])
  assert.deepEqual(examples['ɔɪ'], ['s[oi]l','b[oy]'])
  assert.deepEqual(examples.x, ['lo[ch]', '[ch]allah'])
  assert.deepEqual(examples['ʔ'], ['uh-oh', 'a’a'])
  const names = new Set()
  for (const [ipa, words] of Object.entries(examples)) {
    assert.ok(words.length >= 2 && words.length <= 4, ipa)
    for (const marked of words) {
      assert.ok(/^(?:[a-z]|\[[a-z]+\])+$/.test(marked) || ['uh-oh', 'a’a'].includes(marked), ipa)
      names.add(marked.replace(/[\[\]]/g, '').replace(/[^a-z]/g, '') + '.wav')
    }
  }
  assert.ok(names.size > 90)
})

test('Reference visuals match blue-heading, gray-header, green-spelling sample', () => {
  const ui = source('./IpaReference.jsx')
  const css = source('./ipa-reference.css')
  assert.match(css, /--ipa-blue: #0777b9/)
  assert.match(css, /--ipa-heading: #0641a7/)
  assert.match(css, /--ipa-green: #20ac09/)
  assert.match(css, /--ipa-gray: #c4cfd7/)
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\)/)
  assert.match(css, /border-right: 5px solid #9ba0a4/)
  assert.match(css, /\.ipa-reference \.ipa-example mark/)
  assert.match(ui, /<mark key=\{index\}>/)
  assert.match(ui, /<span className="ipa-comma"/)
  assert.match(ui, /<Glyph name="speaker"/)
  assert.doesNotMatch(ui, /<Glyph name="play"/)
})

test('IPA symbols and words are clickable with separate recordings and accessible controls', () => {
  const ui = source('./IpaReference.jsx')
  const foundation = source('./Foundation.jsx')
  assert.ok(ui.includes("audio/ipa-one-voice/"))
  assert.ok(ui.includes('new Audio('))
  assert.match(ui, /onClick=\{event => \{ event\.stopPropagation\(\); play\(sound, l, word\) \}\}/)
  assert.match(ui, /onClick=\{event => \{ event\.stopPropagation\(\); play\(sound, l\) \}\}/)
  assert.match(ui, /onClick=\{\(\) => play\(item, l\)\}/)
  assert.match(ui, /aria-label=\{/)
  assert.match(ui, /if \(mode === 'practice'\)/)
  assert.match(foundation, /section\.id === 'sounds-listen' && <IpaReference mode="study"/)
  assert.match(foundation, /id === 'sounds'\) return <IpaReference mode="practice"/)
  assert.doesNotMatch(ui, /speechSynthesis|SpeechSynthesisUtterance|commons.wikimedia|IPA_SOURCE_BASE|IpaVoicePilot|IpaHamburgPilot/)
})

test('F03 reading remains five sections and explains the revised chart', () => {
  const ids = ['sounds-difference', 'sounds-reference', 'sounds-ipa', 'sounds-listen', 'sounds-routine']
  const en = foundationReading.sounds
  const ja = JSON.parse(readFileSync(new URL('../course/locales/ja/foundations.json', import.meta.url), 'utf8')).sounds
  assert.deepEqual(en.sections.map(section => section.id), ids)
  assert.deepEqual(ja.sections.map(section => section.id), ids)
  assert.match(en.sections[0].paragraphs.join(' '), /26 letters/)
  assert.match(en.sections[1].paragraphs.join(' '), /General American English/)
  assert.match(en.sections[2].paragraphs.join(' '), /Latin letters/)
  assert.match(en.sections[3].paragraphs.join(' '), /24 consonant entries.*15 vowel entries.*2 less-common entries/)
  assert.match(JSON.stringify(ja), /41項目/)
  assert.ok(ja.sections.every(section => section.blocks.length > 0))
  assert.equal(ja.sections.find(section => section.id === 'sounds-listen').video, undefined)
  for (const group of ipaGroups) {
    assert.ok(ipaCurriculum.en.groupDescriptions[group.id].length)
    assert.ok(ipaCurriculum.ja.groupDescriptions[group.id].length)
  }
  const doc = readFileSync(new URL('../../docs/general-american-pronunciation-syllabus.md', import.meta.url), 'utf8')
  assert.match(doc, /24 foundational categories/)
  assert.match(doc, /Stage 6/)
})

test('IPA speaker buttons play all 41 provided sounds immediately; word examples retain Artico WAV', () => {
  const ui = source('./IpaReference.jsx')
  const clips = source('./ipaIsolatedAudio.js')
  const urls = Object.fromEntries([...clips.matchAll(/^\s*"([^"]+)": "([^"]+\.mp3)"/gm)].map(([,symbol, file]) => [symbol,file]))
  assert.equal(Object.keys(urls).length, 41)
  assert.equal(new Set(Object.values(urls)).size, 40)
  assert.ok(allIpaSounds.filter(item => !['ɝ', 'ɚ'].includes(item.ipa)).every(item => item.ipa in urls), 'Every chart IPA symbol mapped')
  assert.ok('x' in urls && 'ʔ' in urls)
  assert.ok(urls.i.includes('/vowels/i-'))
  assert.ok(urls['ɹ'].includes('/consonants/r-'))
  assert.ok(urls['ɪ'].includes('/vowels/small_cap_i-'))
  assert.match(ui, /ipaIsolatedAudio\[sound\.ipa\]/)
  assert.match(ui, /audio\/ipa-one-voice\//)
  assert.match(ui, /play\(sound, l, word\)/)
  assert.doesNotMatch(ui, /IpaAudioTestImporter|loadTestZip|testUrlsRef|readIpaTestZip/)
})
