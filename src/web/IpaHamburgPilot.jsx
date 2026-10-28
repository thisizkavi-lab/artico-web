import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { hamburgAmericanSamples, HAMBURG_SOURCE } from './ipaHamburgPilot'
import './ipa-hamburg-pilot.css'

const labels = {
  en: {
    heading: 'Try American recordings · audio preview',
    subtitle: '10 real samples from the University of Hamburg. Compare them before we choose a single voice for Artico.',
    caution: 'Temporary comparison only. The files play from the university website; they are not copied into Artico. Reuse rights for a permanent course have not been granted.',
    source: 'Original university sound chart',
    play: 'Listen',
    stop: 'Stop',
    playing: 'Playing the original recording…',
    ready: 'Choose a symbol to play the American sample.',
    error: 'This recording could not play here. Open its original file to test it.',
    file: 'Open original audio',
    distinction: 'On the university chart, the first vowel recording is American; the second is Irish. This preview uses only the first.',
  },
  ja: {
    heading: 'アメリカ英語の録音を試す · 音声プレビュー',
    subtitle: 'ハンブルク大学の10種類の録音を聞き比べて、Articoで使う音声の方向性を確かめます。',
    caution: 'これは比較用です。音声は大学のサイトから直接再生し、Articoには保存していません。正式利用の許可はまだ確認できていません。',
    source: '大学の元の音声表',
    play: '聞く',
    stop: '停止',
    playing: '大学の録音を再生中…',
    ready: '記号を選ぶと、アメリカ英語の録音を聞けます。',
    error: 'ここでは音声を再生できませんでした。元のファイルを開いて確認してください。',
    file: '元の音声を開く',
    distinction: '大学の表では、母音の１つ目がアメリカ英語、２つ目がアイルランド英語です。ここでは１つ目だけを使っています。',
  },
}

export default function IpaHamburgPilot() {
  const { language } = useLanguage()
  const l = labels[language] ?? labels.en
  const player = useRef(null)
  const [active, setActive] = useState(null)
  const [status, setStatus] = useState('ready')
  const [opened, setOpened] = useState(false)

  const stop = () => {
    if (player.current) {
      const previous = player.current
      player.current = null
      previous.onplaying = null
      previous.onended = null
      previous.onerror = null
      previous.pause()
      previous.removeAttribute('src')
    }
  }

  useEffect(() => () => {
    if (player.current) {
      player.current.pause()
      player.current.removeAttribute('src')
    }
  }, [])

  const play = item => {
    if (active === item.ipa && status === 'playing') {
      stop()
      setActive(null)
      setStatus('ready')
      return
    }
    stop()
    setActive(item.ipa)
    setStatus('loading')
    const audio = new Audio(item.url)
    player.current = audio
    audio.onplaying = () => {
      if (player.current === audio) setStatus('playing')
    }
    audio.onended = () => {
      if (player.current === audio) {
        player.current = null
        setStatus('ready')
        setActive(null)
      }
    }
    const failed = () => {
      if (player.current !== audio) return
      player.current = null
      setStatus('error')
    }
    audio.onerror = failed
    try {
      const request = audio.play()
      request?.catch(failed)
    } catch {
      failed()
    }
  }

  const current = hamburgAmericanSamples.find(item => item.ipa === active)
  return (
    <details className="ipa-hamburg-pilot" open={opened}
      onToggle={event => {
        if (!event.currentTarget.open) {
          stop()
          setActive(null)
          setStatus('ready')
        }
        setOpened(event.currentTarget.open)
      }}>
      <summary>{l.heading} <span className="ipa-hamburg-count">10</span></summary>
      <div className="ipa-hamburg-content">
        <p className="ipa-hamburg-subtitle">{l.subtitle}</p>
        <div className="ipa-hamburg-grid">
          {hamburgAmericanSamples.map(item => (
            <button type="button" key={item.ipa}
              className={`ipa-hamburg-sample${active === item.ipa ? ' is-active' : ''}`}
              aria-pressed={active === item.ipa && status === 'playing'}
              onClick={() => play(item)}>
              <span className="ipa-hamburg-symbol" lang="en">/{item.ipa}/</span>
              <span className="ipa-hamburg-example" lang="en">{item.example}</span>
              <span className="ipa-hamburg-action">
                {active === item.ipa && status === 'playing' ? l.stop : l.play}
              </span>
            </button>
          ))}
        </div>
        <div className="ipa-hamburg-status" role="status" aria-live="polite">
          {status === 'error' ? l.error : status === 'playing' ? l.playing : l.ready}
          {status === 'error' && current && (
            <a href={current.url} target="_blank" rel="noopener noreferrer">
              {l.file}
            </a>
          )}
        </div>
        <p className="ipa-hamburg-caution">{l.caution}</p>
        <p className="ipa-hamburg-small">{l.distinction}</p>
        <a className="ipa-hamburg-source" href={HAMBURG_SOURCE}
          target="_blank" rel="noopener noreferrer">{l.source}</a>
      </div>
    </details>
  )
}
