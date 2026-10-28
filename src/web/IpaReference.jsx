import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { Glyph } from './LessonExperience'
import { ipaGroups, allIpaSounds, IPA_SOURCE_BASE, IPA_LICENSE_NOTE } from './ipaSounds'
import './ipa-reference.css'

const copy = {
  en: {
    title: 'Hear the sounds of English',
    intro: 'The symbols show sounds, not spelling. Select Listen to hear an example word in U.S. English.',
    symbol: 'IPA', word: 'Example', clue: 'How it sounds', listen: 'Listen',
    playingRecording: 'Playing U.S. English recording',
    deviceVoice: 'Device-generated U.S. English voice (recording unavailable)',
    unavailable: 'Playback unavailable. Try saying the example word aloud.',
    choose: 'Choose a sound', practiceTitle: 'Listen. Say. Compare.',
    practiceIntro: 'Listen to one word. Say it aloud, then choose a different sound to compare.',
    practiceStep: 'Listen once, then repeat the word without the recording.',
    audio: 'Hear the example',
    sample: 'Example word', source: 'Audio sources and licenses', notes: 'About this chart',
    chartNote: 'This is a practical General American reference, not every sound in every accent. Some speakers merge /ɑ/ and /ɔ/ (cot–caught). /ə/ marks an unstressed vowel. The symbol /ˈ/ marks primary stress; /ˌ/ marks secondary stress. Dictionaries may use /r/ instead of /ɹ/. IPA is not a spelling system.',
    recordingNote: 'Verified Commons files are recordings of U.S. English words, not isolated phonemes. Recordings vary by speaker and may not match every American accent. Other examples use your browser’s en-US speech voice when supported.',
  },
  ja: {
    title: '英語の音を聞いてみよう',
    intro: 'IPAの記号は、文字ではなく音を表します。「聞く」を押して、アメリカ英語の単語を聞いてみましょう。',
    symbol: 'IPA', word: '単語', clue: '音のヒント', listen: '聞く',
    playingRecording: '米語の録音を再生しています',
    deviceVoice: '端末のアメリカ英語音声です（録音を利用できません）',
    unavailable: '再生できません。例の単語を声に出してみましょう。',
    choose: '音を選ぶ', practiceTitle: '聞く・言う・比べる',
    practiceIntro: '単語を聞いて、声に出してみましょう。次は別の音と比べます。',
    practiceStep: '１回聞き、音声を止めてから同じ単語を言ってみましょう。',
    audio: '単語を聞く', sample: '例の単語', source: '録音の出典とライセンス', notes: 'この表について',
    chartNote: 'これは一般的なアメリカ英語の目安です。すべてのアクセントを表すわけではありません。/ɑ/ と /ɔ/ を区別しない話者もいます（cot–caught）。/ə/ は弱い母音です。/ˈ/ は第一強勢、/ˌ/ は第二強勢を表します。辞書によって /ɹ/ を /r/ と書く場合もあります。IPAはつづりではありません。',
    recordingNote: 'Wikimediaの録音は米語で話された単語で、単独の音ではありません。話者による違いがあります。録音のない単語は、対応端末の英語合成音声を使います。',
  },
}
const sources = [
  ['En-us-pen.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-cat.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-thin.ogg','Muke Tever','Public domain'],
  ['En-us-feather.ogg','Dvortygirl','Public domain'],
  ['En-us-ship.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-seat.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-sit.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-A.ogg','Muke Tever','Public domain'],
  ['En-us-I.ogg','Muke Tever','Public domain'],
  ['En-us-ball.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-go.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-moon.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-fish.ogg','Dvortygirl','Public domain'],
  ['En-us-Sun.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-zoo.ogg','Neoglitch','CC BY-SA'],
  ['En-us-hat.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-yes.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-red.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-book.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-mouse.ogg','Dvortygirl','CC BY-SA / GFDL'],
  ['En-us-boy.ogg','Dvortygirl','CC BY-SA / GFDL'],
]
const sourcePage = name => `https://commons.wikimedia.org/wiki/File:${name}`

function useIpaPlayback(language) {
  const audioRef = useRef(null)
  const [message, setMessage] = useState('')
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  }
  useEffect(() => () => stop(), [])
  const browserSpeech = (word, l) => {
    if (typeof window === 'undefined' ||
        !window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setMessage(l.unavailable)
      return
    }
    try {
      const utterance = new window.SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      utterance.rate = .87
      const us = window.speechSynthesis.getVoices?.().find(v => /^en[-_]US/i.test(v.lang))
      if (us) utterance.voice = us
      utterance.onerror = () => setMessage(l.unavailable)
      window.speechSynthesis.speak(utterance)
      setMessage(l.deviceVoice)
    } catch {
      setMessage(l.unavailable)
    }
  }
  const play = (sound, l) => {
    stop()
    setMessage('')
    if (!sound.audioFile) {
      browserSpeech(sound.word, l)
      return
    }
    const local = `${import.meta.env.BASE_URL}audio/ipa/${sound.audioFile}`
    const remote = IPA_SOURCE_BASE + encodeURIComponent(sound.audioFile)
    // Try the Artico-hosted copy first, then Commons, then a labeled device voice.
    const attempt = (url, remoteFallback) => {
      const audio = new Audio(url)
      audioRef.current = audio
      const failed = () => {
        if (audioRef.current !== audio) return
        audioRef.current = null
        if (remoteFallback) attempt(remote, false)
        else browserSpeech(sound.word, l)
      }
      audio.onended = () => { if (audioRef.current === audio) audioRef.current = null }
      audio.onerror = failed
      audio.play().catch(failed)
    }
    setMessage(l.playingRecording)
    attempt(local, true)
  }
  return { play, stop, message }
}
function SoundButton({ sound, l, play, className = '' }) {
  return <button type="button" className={`ipa-play ${className}`}
    onClick={() => play(sound, l)} aria-label={`${l.listen}: /${sound.ipa}/, ${sound.word}`}>
    <Glyph name="play" size={15} /><span>{l.listen}</span>
  </button>
}
function SourceDisclosure({ l }) {
  return (
    <details className="ipa-sources">
      <summary>{l.source}</summary>
      <p>{IPA_LICENSE_NOTE}</p>
      <ul>
        {sources.map(([file, author, license]) =>
          <li key={file}><a href={sourcePage(file)} target="_blank" rel="noopener noreferrer">
            {file.replace('En-us-','').replace('.ogg','')}
          </a> — {author}, {license}</li>
        )}
      </ul>
    </details>
  )
}
export default function IpaReference({ mode = 'study' }) {
  const { language } = useLanguage()
  const l = copy[language] ?? copy.en
  const [selected, setSelected] = useState('i')
  const { play, stop, message } = useIpaPlayback(language)
  const sound = allIpaSounds.find(item => item.ipa === selected) ?? allIpaSounds[0]

  if (mode === 'practice') return (
    <section className="rf-practice ipa-reference ipa-practice">
      <p className="ip-kicker">{language === 'ja' ? 'レベルゼロ · 発音' : 'LEVEL ZERO · PRONUNCIATION'}</p>
      <h2>{l.practiceTitle}</h2>
      <p className="ip-context">{l.practiceIntro}</p>
      <div className="ipa-focus">
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
                aria-pressed={sound.ipa === item.ipa} onClick={() => { stop(); setSelected(item.ipa) }}>
                /{item.ipa}/
              </button>)}
            </div>
          </section>
        ))}
      </div>
      <SourceDisclosure l={l}/>
    </section>
  )

  return (
    <div className="ipa-reference ipa-study">
      <div className="ipa-intro">
        <h3>{l.title}</h3>
        <p>{l.intro}</p>
      </div>
      {ipaGroups.map(group => (
        <section className="ipa-table-section" key={group.id}>
          <h4>{language === 'ja' ? group.ja : group.title}</h4>
          <div className="ipa-table-scroll" role="region"
            aria-label={language === 'ja' ? group.ja : group.title} tabIndex={0}>
            <table className="ipa-table">
              <thead>
                <tr><th scope="col">{l.symbol}</th><th scope="col">{l.word}</th>
                  <th scope="col">{l.clue}</th><th scope="col">{l.listen}</th></tr>
              </thead>
              <tbody>
                {group.sounds.map(item => (
                  <tr key={item.ipa}>
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
      <div className="ipa-notes">
        <h4>{l.notes}</h4>
        <p>{l.chartNote}</p>
        <p>{l.recordingNote}</p>
      </div>
      <SourceDisclosure l={l}/>
    </div>
  )
}
