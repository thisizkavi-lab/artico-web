import { useEffect, useState } from 'react'
import { speakKokoroSpeech, stopKokoroSpeech, prefetchKokoroSpeech } from './kokoroSpeech'
import { vocabularySpokenText, vocabularyPrefersDeviceVoice } from './vocabularySpokenText'
import { readVocabularyVoiceMode } from './vocabularyVoiceMode'
import './kokoro-speech.css'

// Keeps a pronunciation control separate from cards' reveal/click actions.
export default function KokoroSpeakButton({ text, japanese = false, rate = 0.95, className = '', upcoming = [] }) {
  const [phase, setPhase] = useState('idle')
  const [slowLoading, setSlowLoading] = useState(false)
  useEffect(() => {
    if (phase !== 'loading') { setSlowLoading(false); return }
    const timer = setTimeout(() => setSlowLoading(true), 2600)
    return () => clearTimeout(timer)
  }, [phase])
  async function testSpeaker(event) {
    event.stopPropagation()
    // A short tone tests the browser's actual audio output, independent of
    // speechSynthesis, WebGPU, and neural model downloads.
    try {
      const Context = window.AudioContext || window.webkitAudioContext
      if (!Context) throw new Error('Web Audio unsupported')
      const context = new Context()
      await context.resume()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const now = context.currentTime
      oscillator.type = 'sine'
      oscillator.frequency.value = 660
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.onended = () => { void context.close() }
      oscillator.start(now)
      oscillator.stop(now + 0.3)
    } catch (error) {
      console.warn('Artico: audio output check unavailable.', error)
    }
  }
  const spoken = vocabularySpokenText(text)
  const preferDevice = vocabularyPrefersDeviceVoice(text)
  const play = (event) => {
    event.stopPropagation()
    if (phase === 'loading' || phase === 'playing') {
      stopKokoroSpeech()
      return
    }
    const useOfflineVoice = readVocabularyVoiceMode() === 'offline'
    void speakKokoroSpeech(spoken, {
      rate,
      preferDevice: !useOfflineVoice && preferDevice,
      forceModel: useOfflineVoice,
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
      : phase === 'error'
        ? (japanese ? '音声を再試行。聞こえない場合は端末の英語音声を確認してください。' : 'Retry pronunciation. If silent, check your system English speech voices.')
        : (japanese ? 'アメリカ英語の発音を聞く' : 'Hear American English pronunciation')
  return (
    <>
    <button
      type="button"
      className={'artico-speak ' + className + (phase === 'loading' ? ' is-loading' : '') + (phase === 'playing' ? ' is-playing' : '') + (phase === 'error' ? ' is-error' : '')}
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
    {phase === 'loading' && slowLoading && (
      <span className="artico-speak-status" role="status">
        {japanese ? '音声を準備中です。初回はモデルの取得に時間がかかる場合があります。' : 'Preparing offline voice. The first download can take some time.'}
      </span>
    )}
    {phase === 'error' && (
      <span className="artico-speak-status is-error" role="status">
        {japanese ? '音声が再生できませんでした。' : 'Speech could not start.'}
        <button type="button" onClick={testSpeaker}>
          {japanese ? '音声出力を確認' : 'Test speaker'}
        </button>
      </span>
    )}
    </>
  )
}
