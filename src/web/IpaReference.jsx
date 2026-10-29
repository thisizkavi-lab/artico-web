import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { ipaGroups, allIpaSounds } from './ipaSounds'
import ipaExamples from './ipaExamples.json'
import { ipaCurriculum } from './ipaCurriculum'
import './ipa-reference.css'

// Keep the full sound inventory, but show learners just two familiar families.
// Vowel glides belong inside the Vowels section, not in a third table.
const ipaDisplayGroups = [
  ipaGroups[0],
  {
    ...ipaGroups[1],
    sounds: [...ipaGroups[1].sounds, ...ipaGroups[2].sounds],
  },
]

const copy = {
  en: {
    symbol: 'IPA sound', word: 'Examples', listen: 'Hear', audio: 'Audio',
    playingRecording: 'Playing an example word',
    unavailable: 'This example could not play. Please try again.',
    choose: 'Choose a sound', practiceTitle: 'Listen. Say. Compare.',
    practiceIntro: 'Each symbol shows a sound. The highlighted letters show one way to spell that sound. Tap a word to hear the whole word.',
    practiceStep: 'Listen to both examples. Say each word aloud. Notice the highlighted sound.',
    studyIntro: 'Tap a sound symbol or any example. Highlighted letters show where you hear that sound in the word.',
    sample: 'Hear it in real words',
    soundIn: 'Hear the sound in',
  },
  ja: {
    symbol: 'IPAの音', word: '単語の例', listen: '聞く', audio: '音声',
    playingRecording: '単語の音声を再生中',
    unavailable: 'この音声を再生できませんでした。もう一度お試しください。',
    choose: '音を選ぶ', practiceTitle: '聞く・言う・比べる',
    practiceIntro: 'IPA記号は音を表します。色のついた文字は、その音を表すつづりです。単語を押すと、単語全体の発音が聞けます。',
    practiceStep: '2つの単語を聞き、声に出しましょう。色のついた部分の音に注目してください。',
    studyIntro: 'IPA記号や単語を押すと、音声が流れます。色のついた文字が、その音を表しています。',
    sample: '単語の中で聞く',
    soundIn: 'この単語で音を聞く：',
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
  // These are complete-word WAV recordings from the same US voice, not
  // artificial attempts to pronounce an IPA symbol by text-to-speech.
  const play = (sound, l, word = sound.word) => {
    stop()
    setMessage('')
    const filename = word.toLowerCase().replace(/[^a-z]/g, '') + '.wav'
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
  return { play, stop, message }
}

function SoundButton({ sound, l, play, className = '' }) {
  return <button type="button" className={`ipa-play ${className}`}
    onClick={(event) => {
      // The whole table row and practice card play on click too.
      event.stopPropagation()
      play(sound, l)
    }}
    title={`${l.listen}: /${sound.ipa}/ — ${sound.word}`}
    aria-label={`${l.listen}: /${sound.ipa}/, ${sound.word}`}>
    <Glyph name="speaker" size={19}/>
  </button>
}

function HighlightedExample({ example, sound, l, play }) {
  const parts = /^(.*?)\[([^\]]+)\](.*)$/.exec(example)
  if (!parts) return null
  const word = parts[1] + parts[2] + parts[3]
  return (
    <button type="button" className="ipa-example"
      onClick={event => { event.stopPropagation(); play(sound, l, word) }}
      title={`${l.listen}: ${word}`}
      aria-label={`${l.soundIn} ${word} (/${sound.ipa}/)`}
      lang="en">
      {parts[1]}<mark>{parts[2]}</mark>{parts[3]}
      <Glyph name="speaker" size={14}/>
    </button>
  )
}

function SoundExamples({ sound, l, play }) {
  return <div className="ipa-examples">
    {(ipaExamples[sound.ipa] || []).map(example => (
      <HighlightedExample key={example} example={example} sound={sound} l={l} play={play}/>
    ))}
  </div>
}

export default function IpaReference({ mode = 'study' }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const scope = ipaCurriculum[language] ?? ipaCurriculum.en
  const [selected, setSelected] = useState('i')
  const { play, message } = useIpaPlayback()
  const sound = allIpaSounds.find(item => item.ipa === selected) ?? allIpaSounds[0]

  if (mode === 'practice') return (
    <section className="rf-practice ipa-reference ipa-practice">
      <p className="ip-kicker">{language === 'ja' ? 'レベルゼロ · 発音' : 'LEVEL ZERO · PRONUNCIATION'}</p>
      <h2>{l.practiceTitle}</h2>
      <p className="ip-context">{l.practiceIntro}</p>
      <div className="ipa-focus ipa-focus--playable" onClick={() => play(sound, l)}>
        <div className="ipa-focus-top">
          <span className="ipa-focus-symbol" lang="en">/{sound.ipa}/</span>
          <div>
            <span className="ip-kicker">{l.sample}</span>
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
        {ipaDisplayGroups.map(group => (
          <section key={group.id}>
            <h4>{language === 'ja' ? group.ja : group.title}</h4>
            <div className="ipa-symbol-selector">
              {group.sounds.map(item => <button key={item.ipa} type="button"
                aria-pressed={sound.ipa === item.ipa}
                onClick={() => { setSelected(item.ipa); play(item, l) }}>
                /{item.ipa}/
              </button>)}
            </div>
          </section>
        ))}
      </div>
    </section>
  )

  return (
    <div className="ipa-reference ipa-study">
      <p className="ipa-study-hint">{l.studyIntro}</p>
      {ipaDisplayGroups.map(group => (
        <section className="ipa-table-section" key={group.id} id={`ipa-${group.id}`}>
          <div className="ipa-table-heading">
            <h3>{language === 'ja' ? group.ja : group.title}</h3>
            <span className="ipa-table-count">{group.sounds.length}</span>
          </div>
          {scope.groupDescriptions[group.id].map((paragraph, index) => (
            <p className="ipa-group-description" key={index}>{paragraph}</p>
          ))}
          {group.id === 'vowels' && scope.groupDescriptions.diphthongs.map((paragraph, index) => (
            <p className="ipa-group-description" key={`glides-${index}`}>{paragraph}</p>
          ))}
          <div className="ipa-table-scroll" role="region"
            aria-label={language === 'ja' ? group.ja : group.title} tabIndex={0}>
            <table className="ipa-table">
              <thead>
                <tr><th scope="col">{l.symbol}</th><th scope="col">{l.word}</th></tr>
              </thead>
              <tbody>
                {group.sounds.map(item => (
                  <tr key={item.ipa} className="ipa-sound-row"
                    onClick={() => play(item, l)}>
                    <th scope="row" className="ipa-symbol-cell" lang="en">
                      <span>/{item.ipa}/</span>
                      <SoundButton sound={item} l={l} play={play}/>
                    </th>
                    <td className="ipa-word" lang="en">
                      <SoundExamples sound={item} l={l} play={play}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <p className="ipa-status" role="status" aria-live="polite">{message}</p>
    </div>
  )
}
