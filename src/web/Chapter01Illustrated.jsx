import { useState } from 'react'
import { approvedAudio } from './components'
import { chapter01Atlas } from './chapter01Atlas'
import './chapter01-illustrated.css'

// The artwork is a reusable transparent PNG sprite atlas. All language, bubble
// outlines, and play targets remain real DOM/SVG elements, not baked into PNGs.
const layouts = {
  'ch01-p3': ['everyday', 'Everyday greetings'],
  'ch01-p6': ['time', 'Choose the time of day'],
  'ch01-p10': ['group', 'Greeting a group'],
  'ch01-p18': ['checkin', 'Ask how someone is doing'],
  'ch01-p21': ['reply', 'Positive and everyday replies'],
  'ch01-p25': ['reply', 'Neutral and honest replies'],
  'ch01-p27': ['checkin', 'Return the question'],
  'ch01-p34': ['reunion', 'Seeing someone again'],
  'ch01-p36': ['reunion', 'Ask about the time apart'],
  'ch01-p45': ['casual', 'Casual choices'],
}
const persons = { Alex: 0, Casey: 2, Maya: 4, Eli: 6 }

function Character({ name, wave = false }) {
  const index = persons[name] + (wave ? 1 : 0)
  return (
    <span
      className={'ip-ch01-person ip-ch01-' + name.toLowerCase()}
      role="img"
      aria-label={name}
      style={{
        backgroundImage: 'url(' + chapter01Atlas + ')',
        backgroundPosition: (index * 100 / 7) + '% bottom',
      }}
    />
  )
}

function Atmosphere({ vibe }) {
  return (
    <svg className="ip-ch01-atmosphere" viewBox="0 0 360 230" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={'ch01-sky-' + vibe} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={vibe === 'evening' ? '#d7d5ef' : '#e5f3f5'} />
          <stop offset="100%" stopColor={vibe === 'evening' ? '#f5dfd2' : '#f5f8f2'} />
        </linearGradient>
      </defs>
      <rect width="360" height="230" rx="22" fill={'url(#ch01-sky-' + vibe + ')'} />
      <circle cx="287" cy="55" r="23" fill={vibe === 'evening' ? '#f2d8a4' : '#efd58c'} opacity=".88" />
      {vibe === 'evening' && <circle cx="297" cy="48" r="20" fill="#d8d7ef" />}
      <path d="M0 171 Q70 150 138 170 T290 164 T360 168 V230 H0 Z" fill={vibe === 'evening' ? '#d6dcd9' : '#dbe9dd'} />
      <path d="M30 164 V114 Q30 109 35 109 H82 Q87 109 87 114 V164 M41 126 H51 M64 126 H74 M41 144 H51 M64 144 H74" stroke="#b7cbc7" strokeWidth="6" fill="none" opacity=".65" />
      <path d="M279 169 V124 H331 V169 M292 136 H301 M312 136 H321" stroke="#b7cbc7" strokeWidth="7" fill="none" opacity=".55" />
      <path d="M0 198 H360" stroke="#a8bcb6" strokeWidth="2" opacity=".4" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.7 9H3v6h3.7l4.3 4V5Z" />
      <path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" />
    </svg>
  )
}
function SpeechBubble({ item, side, selected, focused, onPlay }) {
  return (
    <button
      id={'study-' + item.id}
      type="button"
      data-phrase-id={item.id}
      className={'ip-ch01-bubble ' + (side === 'right' ? 'is-right ' : '') + (selected ? 'is-selected ' : '') + (focused ? 'is-focused' : '')}
      aria-label={'Listen to: ' + item.en}
      aria-pressed={selected}
      onClick={() => onPlay(item)}
    >
      <svg className="ip-ch01-bubble-shape" viewBox="0 0 420 112" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M26 3 H393 Q417 3 417 27 V76 Q417 97 393 97 H75 L26 109 L45 97 H26 Q3 97 3 76 V27 Q3 3 26 3 Z" />
      </svg>
      <span className="ip-ch01-bubble-content">
        <span lang="en" className="ip-ch01-english">{item.en}</span>
        <span className="ip-ch01-listen"><SoundIcon /></span>
      </span>
    </button>
  )
}

export default function Chapter01Illustrated({ block, byId, focusedId, onPlay }) {
  const ids = block.phrases
  const [scene, label] = layouts[ids[0]] || ['everyday', 'Everyday expressions']
  const [selectedId, select] = useState(ids.includes(focusedId) ? focusedId : ids[0])
  const selected = byId[selectedId] || byId[ids[0]]
  const isGroup = scene === 'group'
  const casual = scene === 'casual'
  const vibe = /evening/i.test(selected.en) ? 'evening' : /afternoon/i.test(selected.en) ? 'afternoon' : /morning/i.test(selected.en) ? 'morning' : scene
  const speak = (item) => { select(item.id); onPlay(item) }
  return (
    <section className={'ip-ch01-panel ip-ch01-scene-' + scene} aria-label={label}>
      <div className="ip-ch01-panel-top">
        <span className="ip-ch01-panel-label">{label}</span>
        <span className="ip-ch01-panel-count">{ids.length} expressions</span>
      </div>
      <div className="ip-ch01-panel-body">
        <div className="ip-ch01-stage" data-vibe={vibe}>
          <Atmosphere vibe={vibe} />
          <div className={'ip-ch01-people' + (isGroup ? ' has-group' : '')}>
            {isGroup ? (
              <>
                <Character name="Alex" wave />
                <Character name="Casey" />
                <Character name="Maya" wave />
                <Character name="Eli" />
              </>
            ) : casual ? (
              <>
                <Character name="Maya" wave />
                <Character name="Eli" wave={vibe !== 'casual'} />
              </>
            ) : (
              <>
                <Character name="Alex" wave={scene !== 'reply'} />
                <Character name="Casey" wave={scene === 'everyday' || scene === 'reunion'} />
              </>
            )}
          </div>
        </div>
        <div className="ip-ch01-phrase-zone">
          <div className="ip-ch01-bubble-grid">
            {ids.map((id, index) => (
              <SpeechBubble
                key={id}
                item={byId[id]}
                side={index % 2 ? 'right' : 'left'}
                selected={id === selectedId}
                focused={id === focusedId}
                onPlay={speak}
              />
            ))}
          </div>
          <p className="ip-ch01-context" aria-live="polite">{selected.context}</p>
          <small className="ip-ch01-voice-note">
            {approvedAudio[selected.id] ? 'Tap a bubble to hear its recording.' : 'Tap a bubble to hear a browser-generated English voice.'}
          </small>
        </div>
      </div>
    </section>
  )
}
