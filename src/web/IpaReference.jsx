import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { ipaGroups, allIpaSounds } from './ipaSounds'
import ipaExamples from './ipaExamples.json'
import { ipaCurriculum } from './ipaCurriculum'
import './ipa-reference.css'

// The reference uses two main tables, with the less-common sounds below Vowels.
// American /r/ is displayed as "r"; General American /ɹ/ is its IPA value.
const consonants = ipaGroups[0]
const vowels = {
  id: 'vowels', title: 'Vowels', ja: '母音',
  sounds: [
    'i', 'ɪ', 'eɪ', 'ɛ', 'æ', 'ʌ', 'ə', 'u', 'ʊ', 'oʊ',
    'ɔ', 'ɑ', 'aɪ', 'aʊ', 'ɔɪ',
  ].map(ipa => allIpaSounds.find(item => item.ipa === ipa)),
}
const lessCommon = {
  id: 'less-common', title: 'Less common sounds', ja: 'あまり使われない音',
  sounds: [
    { ipa: 'x', word: 'loch', clue: 'A fricative often heard in loanwords.', ja: '主に借用語で聞く摩擦音。' },
    { ipa: 'ʔ', word: 'uh-oh', clue: 'A brief closure in the throat.', ja: 'のどで息を一瞬止める音。' },
  ],
}
const displayGroups = [consonants, vowels, lessCommon]
const displaySymbol = ipa => ipa === 'ɹ' ? 'r' : ipa === 'eɪ' ? 'e / eɪ' : ipa

const copy = {
  en: {
    symbol: 'IPA', word: 'Examples', listen: 'Hear',
    playingRecording: 'Playing example word',
    unavailable: 'Audio could not play. Please try again.',
    choose: 'Choose a sound', practiceTitle: 'Listen. Say. Compare.',
    practiceIntro: 'Tap a symbol or word to hear it. Green letters show the sound inside each example.',
    practiceStep: 'Listen to the examples, then repeat them aloud.',
    studyNote: 'Tap a blue speaker to hear the first example, or click any word to hear that word. The recording plays the complete word.',
    sourceNote: 'The r row represents the American /ɹ/ sound. Actual pronunciation can vary by accent; /ɑ/ and /ɔ/ are merged for many speakers.',
    specialNote: 'Less-common sounds and loanwords may not be pronounced reliably by a standard American synthetic voice.',
    stress: '(stressed positions)', unstress: '(unstressed positions)',
    soundIn: 'Hear the word',
  },
  ja: {
    symbol: 'IPA', word: '単語の例', listen: '聞く',
    playingRecording: '単語の音声を再生中',
    unavailable: '音声を再生できませんでした。もう一度お試しください。',
    choose: '音を選ぶ', practiceTitle: '聞く・言う・比べる',
    practiceIntro: 'IPA記号や単語を押すと発音を聞けます。緑色の文字が、その音を表すつづりです。',
    practiceStep: '例の単語を聞き、声に出してみましょう。',
    studyNote: '青いスピーカーを押すと最初の例の単語、各単語を押すとその単語全体の発音が聞けます。',
    sourceNote: 'r はアメリカ英語の /ɹ/ を表します。発音は地域や話者によって異なり、/ɑ/ と /ɔ/ を区別しない人も多くいます。',
    specialNote: '珍しい音や借用語は、一般米語の合成音声では正確に再現されないことがあります。',
    stress: '（強勢のある位置）', unstress: '（強勢のない位置）',
    soundIn: '単語の音声：',
  },
}

function useIpaPlayback() {
  const audioRef = useRef(null)
  const [message, setMessage] = useState('')
  const stop = () => {
    if (!audioRef.current) return
    const audio = audioRef.current
    audioRef.current = null
    audio.onended = null
    audio.onerror = null
    audio.onplaying = null
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }
  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeAttribute('src')
    }
  }, [])
  // All audio is offline-generated word audio from one US voice; a blue
  // speaker plays the first example word, not an isolated IPA phoneme.
  const play = (sound, l, word = null) => {
    stop()
    setMessage('')
    const first = (ipaExamples[sound.ipa] || [sound.word])[0]
    const spoken = word || first.replace(/[\[\]]/g, '')
    const filename = spoken.toLowerCase().replace(/[^a-z]/g, '') + '.wav'
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/ipa-one-voice/${filename}`)
    audioRef.current = audio
    const failed = () => {
      if (audioRef.current !== audio) return
      audioRef.current = null
      setMessage(l.unavailable)
    }
    audio.onplaying = () => {
      if (audioRef.current === audio) setMessage(l.playingRecording)
    }
    audio.onended = () => {
      if (audioRef.current !== audio) return
      audioRef.current = null
      setMessage('')
    }
    audio.onerror = failed
    try { audio.play().catch(failed) } catch { failed() }
  }
  return { play, message }
}

function SoundButton({ sound, l, play, className = '' }) {
  return <button type="button" className={`ipa-play ${className}`}
    onClick={event => { event.stopPropagation(); play(sound, l) }}
    title={`${l.listen}: ${displaySymbol(sound.ipa)}`}
    aria-label={`${l.listen} /${displaySymbol(sound.ipa)}/, ${(ipaExamples[sound.ipa] || [sound.word])[0].replace(/[\[\]]/g, '')}`}>
    <Glyph name="speaker" size={20}/>
  </button>
}

function HighlightedExample({ example, sound, l, play }) {
  const word = example.replace(/[\[\]]/g, '')
  const segments = example.split(/(\[[^\]]+\])/g).filter(Boolean)
  return <button type="button" className="ipa-example" lang="en"
    onClick={event => { event.stopPropagation(); play(sound, l, word) }}
    title={`${l.listen}: ${word}`}
    aria-label={`${l.soundIn} ${word} (/${displaySymbol(sound.ipa)}/)`}>
    {segments.map((segment, index) => segment.startsWith('[')
      ? <mark key={index}>{segment.slice(1, -1)}</mark>
      : <span key={index}>{segment}</span>)}
  </button>
}

function SoundExamples({ sound, l, play }) {
  return <div className="ipa-examples">
    {(ipaExamples[sound.ipa] || []).map((example, index) => (
      <span className="ipa-example-entry" key={example}>
        {index > 0 && <span className="ipa-comma" aria-hidden="true">, </span>}
        <HighlightedExample example={example} sound={sound} l={l} play={play}/>
      </span>
    ))}
    {sound.ipa === 'ʌ' && <span className="ipa-context-note">{l.stress}</span>}
    {sound.ipa === 'ə' && <span className="ipa-context-note">{l.unstress}</span>}
  </div>
}

function SoundTable({ group, l, play }) {
  return (
    <section className="ipa-table-section" id={`ipa-${group.id}`}>
      <h3 className="ipa-table-heading">{l === copy.ja ? group.ja : group.title}</h3>
      <div className="ipa-table-scroll">
        <table className="ipa-table">
          <thead><tr><th scope="col">{l.symbol}</th><th scope="col">{l.word}</th></tr></thead>
          <tbody>
            {group.sounds.map(item => (
              <tr className="ipa-sound-row" key={item.ipa} onClick={() => play(item, l)}>
                <th scope="row" className="ipa-symbol-cell">
                  <SoundButton sound={item} l={l} play={play}/>
                  <span lang="en">{displaySymbol(item.ipa)}</span>
                </th>
                <td className="ipa-word"><SoundExamples sound={item} l={l} play={play}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function IpaReference({ mode = 'study' }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const scope = ipaCurriculum[language] ?? ipaCurriculum.en
  const [selected, setSelected] = useState('i')
  const { play, message } = useIpaPlayback()
  const sound = displayGroups.flatMap(group => group.sounds).find(item => item.ipa === selected) || vowels.sounds[0]

  if (mode === 'practice') return (
    <section className="rf-practice ipa-reference ipa-practice">
      <p className="ip-kicker">{language === 'ja' ? 'レベルゼロ · 発音' : 'LEVEL ZERO · PRONUNCIATION'}</p>
      <h2>{l.practiceTitle}</h2>
      <p className="ip-context">{l.practiceIntro}</p>
      <div className="ipa-focus ipa-focus--playable" onClick={() => play(sound, l)}>
        <div className="ipa-focus-top">
          <span className="ipa-focus-symbol" lang="en">{displaySymbol(sound.ipa)}</span>
          <div>
            <span className="ip-kicker">{l.word}</span>
            <SoundExamples sound={sound} l={l} play={play}/>
          </div>
        </div>
        <p>{language === 'ja' ? sound.ja : sound.clue}</p>
        <SoundButton sound={sound} l={l} play={play} className="ipa-main-play"/>
        <p className="ipa-instruction">{l.practiceStep}</p>
      </div>
      <p className="ipa-status" role="status" aria-live="polite">{message}</p>
      <div className="ipa-pick">
        <h3>{l.choose}</h3>
        {displayGroups.map(group => (
          <section key={group.id}>
            <h4>{language === 'ja' ? group.ja : group.title}</h4>
            <div className="ipa-symbol-selector">
              {group.sounds.map(item => <button type="button" key={item.ipa}
                aria-pressed={sound.ipa === item.ipa}
                onClick={() => { setSelected(item.ipa); play(item, l) }}>
                {displaySymbol(item.ipa)}
              </button>)}
            </div>
          </section>
        ))}
      </div>
    </section>
  )

  return (
    <div className="ipa-reference ipa-study">
      <div className="ipa-chart-grid">
        <SoundTable group={consonants} l={l} play={play}/>
        <div className="ipa-chart-right">
          <SoundTable group={vowels} l={l} play={play}/>
          <SoundTable group={lessCommon} l={l} play={play}/>
        </div>
      </div>
      <p className="ipa-study-hint">{l.studyNote}</p>
      <p className="ipa-study-hint">{l.sourceNote}</p>
      <p className="ipa-study-hint ipa-study-caveat">{l.specialNote}</p>
      <p className="ipa-status" role="status" aria-live="polite">{message}</p>
    </div>
  )
}
