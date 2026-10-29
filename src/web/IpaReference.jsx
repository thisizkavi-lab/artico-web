import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { ipaGroups, allIpaSounds } from './ipaSounds'
import { ipaCurriculum } from './ipaCurriculum'
import './ipa-reference.css'

const copy = {
  en: {
    symbol: 'IPA', word: 'Example', clue: 'How it sounds', listen: 'Hear', audio: 'Audio',
    playingRecording: 'Playing example word',
    unavailable: 'This example could not play. Please try again.',
    choose: 'Choose a sound', practiceTitle: 'Listen. Say. Compare.',
    practiceIntro: 'Practise the main sounds of General American, one example at a time. A symbol represents a sound, not an English letter.',
    practiceStep: 'Listen once, then repeat the word without the recording.',
    sample: 'Example word',
  },
  ja: {
    symbol: 'IPA', word: '単語', clue: '音のヒント', listen: '聞く', audio: '音声',
    playingRecording: '例の単語を再生中',
    unavailable: 'この音声を再生できませんでした。もう一度お試しください。',
    choose: '音を選ぶ', practiceTitle: '聞く・言う・比べる',
    practiceIntro: '一般米語の主な音を、例の単語を使って一つずつ練習しましょう。記号は文字ではなく音を表します。',
    practiceStep: '１回聞き、音声なしで同じ単語を言ってみましょう。',
    sample: '例の単語',
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
  const play = (sound, l) => {
    stop()
    setMessage('')
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/ipa-one-voice/${sound.audioFile}`)
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
      // Table rows and the practice card also play when clicked.
      // Stop bubbling so the icon never starts the recording twice.
      event.stopPropagation()
      play(sound, l)
    }}
    title={`${l.listen}: /${sound.ipa}/ — ${sound.word}`}
    aria-label={`${l.listen}: /${sound.ipa}/, ${sound.word}`}>
    <Glyph name="speaker" size={19}/>
  </button>
}

export default function IpaReference({ mode = 'study' }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const scope = ipaCurriculum[language] ?? ipaCurriculum.en
  const [selected, setSelected] = useState('i')
  const { play, stop, message } = useIpaPlayback()
  const sound = allIpaSounds.find(item => item.ipa === selected) ?? allIpaSounds[0]

  if (mode === 'practice') return (
    <section className="rf-practice ipa-reference ipa-practice">
      <p className="ip-kicker">{language === 'ja' ? 'レベルゼロ · 発音' : 'LEVEL ZERO · PRONUNCIATION'}</p>
      <h2>{l.practiceTitle}</h2>
      <p className="ip-context">{l.practiceIntro}</p>
      <div className="ipa-focus ipa-focus--playable" onClick={() => play(sound, l)}>
        <div className="ipa-focus-top">
          <span className="ipa-focus-symbol" lang="en">/{sound.ipa}/</span>
          <div><span className="ip-kicker">{l.sample}</span><h3 lang="en">{sound.word}</h3></div>
        </div>
        <p>{language === 'ja' ? sound.ja : sound.clue}</p>
        <SoundButton sound={sound} l={l} play={play} className="ipa-main-play"/>
        <p className="ipa-instruction">{l.practiceStep}</p>
      </div>
      <p className="ipa-status" role="status" aria-live="polite">{message}</p>
      <div className="ipa-pick">
        <h3>{l.choose}</h3>
        {ipaGroups.map(group => (
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
      {ipaGroups.map(group => (
        <section className="ipa-table-section" key={group.id} id={`ipa-${group.id}`}>
          <div className="ipa-table-heading">
            <h3>{language === 'ja' ? group.ja : group.title}</h3>
            <span className="ipa-table-count">{group.sounds.length}</span>
          </div>
          {scope.groupDescriptions[group.id].map((paragraph, index) => (
            <p className="ipa-group-description" key={index}>{paragraph}</p>
          ))}
          <div className="ipa-table-scroll" role="region"
            aria-label={language === 'ja' ? group.ja : group.title} tabIndex={0}>
            <table className="ipa-table">
              <thead>
                <tr><th scope="col">{l.symbol}</th><th scope="col">{l.word}</th>
                  <th scope="col">{l.clue}</th><th scope="col" className="ipa-audio-heading">{l.audio}</th></tr>
              </thead>
              <tbody>
                {group.sounds.map(item => (
                  <tr key={item.ipa} className="ipa-sound-row"
                    onClick={() => play(item, l)}>
                    <th scope="row" className="ipa-symbol-cell" lang="en">/{item.ipa}/</th>
                    <td className="ipa-word" lang="en">{item.word}</td>
                    <td className="ipa-hint">{language === 'ja' ? item.ja : item.clue}</td>
                    <td className="ipa-button-cell"><SoundButton sound={item} l={l} play={play}/></td>
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
