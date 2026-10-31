import { useState } from 'react'
import { speakKokoroSpeech, stopKokoroSpeech, prefetchKokoroSpeech } from './kokoroSpeech'
import { vocabularySpokenText, vocabularyPrefersDeviceVoice } from './vocabularySpokenText'
import './kokoro-speech.css'

// Keeps a pronunciation control separate from cards' reveal/click actions.
export default function KokoroSpeakButton({ text, japanese = false, rate = 0.95, className = '', upcoming = [] }) {
  const [phase, setPhase] = useState('idle')
  const spoken = vocabularySpokenText(text)
  const preferDevice = vocabularyPrefersDeviceVoice(text)
  const play = (event) => {
    event.stopPropagation()
    if (phase === 'loading' || phase === 'playing') {
      stopKokoroSpeech()
      return
    }
    void speakKokoroSpeech(spoken, {
      rate,
      preferDevice,
      onLoading: () => setPhase('loading'),
      onStart: () => setPhase('playing'),
      onCancel: () => setPhase('idle'),
      onEnd: () => setPhase('idle'),
      onError: () => setPhase('error'),
    })
    prefetchKokoroSpeech(upcoming.filter(label => !vocabularyPrefersDeviceVoice(label)).map(vocabularySpokenText))
  }
  const title = phase === 'loading'
    ? (japanese ? '音声の準備中。初回はダウンロードが必要です。' : 'Preparing voice. The first use downloads the model.')
    : phase === 'playing'
      ? (japanese ? '音声を停止' : 'Stop pronunciation')
      : (japanese ? 'アメリカ英語の発音を聞く' : 'Hear American English pronunciation')
  return (
    <button
      type="button"
      className={'artico-speak ' + className + (phase === 'loading' ? ' is-loading' : '') + (phase === 'playing' ? ' is-playing' : '')}
      title={title}
      aria-label={title + ': ' + text}
      aria-busy={phase === 'loading'}
      onClick={play}
      onMouseEnter={() => { if (!preferDevice) prefetchKokoroSpeech([spoken]) }}
      onFocus={() => { if (!preferDevice) prefetchKokoroSpeech([spoken]) }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M15 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12" />
      </svg>
    </button>
  )
}
