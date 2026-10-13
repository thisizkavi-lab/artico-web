import { useLanguage } from './Language'
import { useEffect, useRef, useState } from 'react'

const icons = {
  home: 'e1438.svg',
  book: 'fe196.svg',
  audio: '2fd37.svg',
  cloud: '7d61f.svg',
  user: '18916.svg',
  check: '62d9a.svg',
  next: '21b6f.svg',
  play: '716d1.svg',
  repeat: 'e9d56.svg',
  whitePlay: '4ce5b.svg',
}
export const asset = (file) => `${import.meta.env.BASE_URL}assets/figma/${file}`
export function Icon({ name, className = '' }) {
  return (
    <img
      className={`aw-icon ${className}`}
      src={asset(icons[name])}
      width="24"
      height="24"
      alt=""
      aria-hidden="true"
    />
  )
}
export function Button({ children, onClick, href, variant = 'brand', className = '', ...props }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      className={`aw-button aw-button-${variant} ${className}`}
      href={href ? `#${href}` : undefined}
      onClick={onClick}
      type={href ? undefined : 'button'}
      {...props}
    >
      {children}
    </Tag>
  )
}
export function IconButton({ name, label, onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`aw-icon-button ${className}`}
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      <Icon name={name} />
    </button>
  )
}
export function Heading({ eyebrow, title, ja, japanese = false }) {
  const { language } = useLanguage()
  return (
    <header className={`aw-heading ${japanese ? 'aw-heading-jp' : ''}`}>
      <p className="aw-eyebrow">{eyebrow}</p>
      <h1 lang={japanese ? 'ja' : language}>{title}</h1>
      {ja && (
        <p className={japanese ? 'aw-heading-support' : 'aw-jp'} lang="ja">
          {ja}
        </p>
      )}
    </header>
  )
}
export function Segments({ items, active, onChange, className = '', label }) {
  return (
    <div className={`aw-segments ${className}`} role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={active === item.value}
          className={active === item.value ? 'is-active' : ''}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export function LessonMode({ active, study, practice, children }) {
  const { t, language } = useLanguage()
  return (
    <div className="aw-lesson-mode">
      <Segments
        items={[
          { value: 'study', label: t("Study") },
          { value: 'practice', label: t("Practice") },
        ]}
        active={active}
        label={t("Study or practice")}
        onChange={(mode) => {
          window.location.hash = mode === 'study' ? study : practice
        }}
      />
      {children}
    </div>
  )
}

const portraits = {
  Maya: {
    32: ['c1b2b.svg', '2f40a.svg'],
    40: ['df1ae.svg', '53776.svg'],
    48: ['bd2a6.svg', '74338.svg'],
    top: '12.83%',
    inset: '-0.56%',
  },
  Eli: {
    32: ['916e7.svg', 'e2554.svg'],
    40: ['0890a.svg', '58f16.svg'],
    48: ['5a879.svg', 'c5449.svg'],
    top: '12.51%',
    inset: '-0.55%',
  },
  Jordan: {
    32: ['15c79.svg', '75543.svg'],
    40: ['53687.svg', '9d3e8.svg'],
    48: ['15c79.svg', '75543.svg'],
    top: '8.03%',
    inset: '-0.54%',
  },
}
export function Portrait({ name, size = 40 }) {
  const data = portraits[name]
  return (
    <span className="aw-portrait" style={{ width: size, height: size }} aria-hidden="true">
      <img className="aw-portrait-bg" src={asset(data[size][0])} alt="" />
      <span className="aw-portrait-crop" style={{ top: data.top }}>
        <span style={{ inset: `${data.inset} -8.93%` }}>
          <img src={asset(data[size][1])} alt="" />
        </span>
      </span>
    </span>
  )
}
export function Artwork({ file, width, height, alt }) {
  return <img className="aw-artwork" src={asset(file)} width={width} height={height} alt={alt} />
}
export function Cast({ people }) {
  return (
    <div className="aw-cast">
      {people.map((person) => (
        <div key={person}>
          <Portrait name={person} />
          <span lang="en">{person}</span>
        </div>
      ))}
    </div>
  )
}
export function Turn({ turn, index, compact = false, onSelect, selected, onListen }) {
  const Copy = onSelect ? 'button' : 'span'
  return (
    <div className={`aw-turn ${compact ? 'aw-turn-compact' : ''}`}>
      <Portrait name={turn.speaker} size={48} />
      <div className={`aw-bubble aw-bubble-${turn.speaker.toLowerCase()}`}>
        <div className="aw-turn-top">
          <span className="aw-turn-label">
            {turn.speaker.toUpperCase()} · {String(index + 1).padStart(2, '0')}
          </span>
          <IconButton
            name="play"
            label={`Listen to ${turn.speaker}, phrase ${index + 1}`}
            onClick={onListen}
          />
        </div>
        <Copy
          className="aw-turn-copy"
          type={onSelect ? 'button' : undefined}
          onClick={onSelect}
          aria-pressed={onSelect ? selected : undefined}
          aria-label={onSelect ? `${turn.speaker}: ${turn.en}` : undefined}
        >
          <span className="aw-turn-en" lang="en">
            {compact ? (turn.excerpt ?? turn.en) : turn.en}
          </span>
          <span className="aw-jp" lang="ja">
            {compact ? (turn.shortJa ?? turn.ja) : turn.ja}
          </span>
        </Copy>
      </div>
    </div>
  )
}

// Only approved, downloaded recordings belong here. No generation API is used.
export const approvedAudio = {}
export function useAudio(notify) {
  const { t, language } = useLanguage()
  const audioRef = useRef(null)
  const currentId = useRef(null)
  const [playing, setPlaying] = useState(false)
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlaying(false)
  }
  useEffect(() => () => audioRef.current?.pause(), [])
  const play = async (id, speed = 1, restart = false) => {
    const source = approvedAudio[id]
    if (!source) {
      stop()
      notify(t("Audio is coming soon. Recordings will be added after the phrases are finalized."))
      return
    }
    if (currentId.current === id && audioRef.current && !audioRef.current.paused && !restart) {
      stop()
      return
    }
    const audio = new Audio(`${import.meta.env.BASE_URL}${source}`)
    audioRef.current?.pause()
    audioRef.current = audio
    currentId.current = id
    audio.playbackRate = speed
    audio.preservesPitch = true
    audio.onended = () => setPlaying(false)
    audio.onerror = () => {
      setPlaying(false)
      notify(t("The recording could not be loaded. Please try again."))
    }
    try {
      await audio.play()
      if (audioRef.current === audio && !audio.paused) setPlaying(true)
    } catch {
      setPlaying(false)
      notify(t("The recording could not be played. Please try again."))
    }
  }
  return { playing, play, stop }
}
export function Player({ item, label, speed, setSpeed, next, audio }) {
  const { t, language } = useLanguage()
  const speeds = [0.75, 0.9, 1, 1.1]
  useEffect(() => {
    audio.stop()
  }, [item.id]) // A phrase change always stops the previous recording.
  return (
    <section className="aw-player" aria-label="Audio player">
      <div className="aw-player-status">
        <span>{label}</span>
        <button
          type="button"
          className="aw-speed"
          aria-label={`Playback speed ${speed}. Change speed`}
          onClick={() => setSpeed(speeds[(speeds.indexOf(speed) + 1) % speeds.length])}
        >
          {speed === 1 ? '1.0' : speed}×
        </button>
      </div>
      <div className="aw-transport">
        <IconButton
          name="repeat"
          label="Replay this phrase"
          onClick={() => {
            audio.stop()
            audio.play(item.id, speed)
          }}
        />
        <button
          type="button"
          className="aw-play"
          aria-label={audio.playing ? 'Pause audio' : 'Play audio'}
          onClick={() => audio.play(item.id, speed)}
        >
          {audio.playing ? <span className="aw-pause" /> : <Icon name="whitePlay" />}
        </button>
        <IconButton name="next" label={t("Next phrase")} onClick={next} />
      </div>
    </section>
  )
}

export function Modal({ onClose, children, title }) {
  const { t } = useLanguage()
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return (
    <dialog
      className="aw-dialog"
      ref={ref}
      aria-labelledby="aw-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
    >
      <h2 id="aw-dialog-title">{title}</h2>
      {children}
      <Button variant="outline" onClick={onClose} className="aw-full">
        {t('Close')}
      </Button>
    </dialog>
  )
}
