import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './greetingsInteractive.css'
import { ResponsiveOutline } from './ResponsiveOutline'

const MASTERY_STORAGE_KEY = 'artico-vocabulary-mastery-v1'

const STATUS_META = {
  unsorted: { ja: '未整理', en: 'Unsorted', short: '未整理' },
  difficult: { ja: '難しい', en: 'Difficult', short: '難しい' },
  learning: { ja: '学習中', en: 'Learning', short: '学習中' },
  known: { ja: '覚えた', en: 'Already know', short: '覚えた' },
  all: { ja: 'すべて', en: 'All cards', short: 'すべて' },
}

const STATUS_ORDER = ['unsorted', 'difficult', 'learning', 'known', 'all']
const CLASSIFY_ORDER = ['difficult', 'learning', 'known']

const normalizeText = (value) => String(value || '')
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

function readMasteryRecords() {
  if (typeof window === 'undefined') return {}
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MASTERY_STORAGE_KEY) || '{}')
    return parsed?.schemaVersion === 1 && parsed.items && typeof parsed.items === 'object'
      ? parsed.items
      : {}
  } catch {
    return {}
  }
}

function useVocabularyMastery() {
  const [records, setRecords] = useState(readMasteryRecords)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify({ schemaVersion: 1, items: records }))
    } catch {
      // Learning still works when private browsing blocks local storage.
    }
  }, [records])

  const setStatus = useCallback((itemId, status) => {
    setRecords((current) => {
      const next = { ...current }
      if (!status || status === 'unsorted') delete next[itemId]
      else next[itemId] = { status, updatedAt: Date.now() }
      return next
    })
  }, [])

  const statusFor = useCallback((itemId) => records[itemId]?.status || 'unsorted', [records])

  return { records, setStatus, statusFor }
}

function useSpeechQueue(speakWithBrowser) {
  const runRef = useRef(0)
  const timerRef = useRef(null)
  const playingRef = useRef(null)
  const [playingId, setPlayingId] = useState(null)

  const stop = useCallback(() => {
    runRef.current += 1
    playingRef.current = null
    if (timerRef.current && typeof window !== 'undefined') window.clearTimeout(timerRef.current)
    timerRef.current = null
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    setPlayingId(null)
  }, [])

  const play = useCallback((id, texts, rate = 0.92) => {
    const queue = (Array.isArray(texts) ? texts : [texts]).filter(Boolean)
    if (!queue.length || typeof speakWithBrowser !== 'function') return
    if (playingRef.current === id) {
      stop()
      return
    }

    runRef.current += 1
    const run = runRef.current
    if (timerRef.current && typeof window !== 'undefined') window.clearTimeout(timerRef.current)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    playingRef.current = id
    setPlayingId(id)

    const finish = () => {
      if (runRef.current !== run) return
      playingRef.current = null
      setPlayingId(null)
    }

    const next = (index) => {
      if (runRef.current !== run) return
      if (index >= queue.length) {
        finish()
        return
      }
      const started = speakWithBrowser(queue[index], {
        rate,
        onend: () => {
          if (runRef.current !== run || typeof window === 'undefined') return
          timerRef.current = window.setTimeout(() => next(index + 1), 240)
        },
        onerror: finish,
      })
      if (!started) finish()
    }

    next(0)
  }, [speakWithBrowser, stop])

  useEffect(() => () => {
    runRef.current += 1
    if (timerRef.current && typeof window !== 'undefined') window.clearTimeout(timerRef.current)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  return { playingId, play, stop }
}

function visualKeyFor(phrase) {
  const normalized = normalizeText(phrase)
  if (normalized.includes('morning')) return 'morning'
  if (normalized.includes('afternoon')) return 'afternoon'
  if (normalized.includes('evening')) return 'evening'
  if (normalized.includes('face-to-face')) return 'face-to-face'
  if (normalized.includes('lovely-to-meet-you-all')) return 'group-meeting'
  if (normalized.includes('meet-you')) return 'meeting'
  if (normalized.startsWith('alright')) return 'alright'
  if (normalized.startsWith('hiya')) return 'hiya'
  if (normalized.startsWith('hey')) return 'hey'
  if (normalized.startsWith('hello')) return 'hello'
  return 'hi'
}

function normalizeVocabularySection(lesson, section) {
  return (section?.phrases || []).map((item) => {
    const textKey = normalizeText(item.phrase)
    const wordCount = String(item.phrase || '').trim().split(/\s+/).filter(Boolean).length
    return {
      ...item,
      id: `${lesson.id || `social-${lesson.number}`}/${section.sourceKey || section.id}/${textKey}`,
      sectionId: section.id,
      kind: wordCount > 1 ? 'phrase' : 'word',
      visualKey: visualKeyFor(item.phrase),
    }
  })
}

function normalizeRecognitionSection(lesson, section) {
  return (section?.recognition || []).map((item) => {
    const textKey = normalizeText(item.phrase)
    return {
      ...item,
      id: `${lesson.id || `social-${lesson.number}`}/${section.sourceKey || section.id}/recognition-${textKey}`,
      sectionId: section.id,
      kind: 'phrase',
      visualKey: visualKeyFor(item.phrase),
      context: item.context || item.note || '補足表現',
    }
  })
}

function wrapBubbleText(text) {
  const words = String(text || '').split(/\s+/)
  if (words.length <= 2) return [text]
  const lines = []
  let current = ''
  const max = text.length > 30 ? 18 : 21
  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > max && current) {
      lines.push(current)
      current = word
    } else current = candidate
  })
  if (current) lines.push(current)
  return lines.slice(0, 3)
}

function ScenePerson({ x, y, color, flip = false, wave = false, muted = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} opacity={muted ? 0.55 : 1}>
      <circle cx="0" cy="-45" r="15" fill={color} />
      <path d="M-15-24 Q0-34 15-24 L12 24 H-12Z" fill={color} />
      <path d="M-7 22 L-9 58 M7 22 L10 58" fill="none" stroke={color} strokeLinecap="round" strokeWidth="8" />
      <path d={wave ? 'M-12-17 Q-29-25-32-48 M12-17 Q25-5 34-1' : 'M-12-15 Q-27-2-34 11 M12-15 Q27-2 34 8'} fill="none" stroke={color} strokeLinecap="round" strokeWidth="7" />
      {wave && <path d="M-39-54 l-8-7 M-35-60 l-2-10 M-45-48 l-10-1" fill="none" stroke="#d7a74d" strokeLinecap="round" strokeWidth="3" />}
    </g>
  )
}

function SpeechBubble({ text, x = 120, y = 18, width = 220 }) {
  const lines = wrapBubbleText(text)
  const height = 40 + Math.max(0, lines.length - 1) * 18
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height={height} rx="10" fill="#fff" stroke="#8aa584" strokeWidth="2" />
      <path d={`M30 ${height} l11 13 10-13`} fill="#fff" stroke="#8aa584" strokeLinejoin="round" strokeWidth="2" />
      {lines.map((line, index) => (
        <text key={`${line}-${index}`} x={width / 2} y={26 + index * 18} fill="#2d3436" fontFamily="Hanken Grotesk, sans-serif" fontSize={lines.length > 2 ? 12 : 13.5} fontWeight="700" textAnchor="middle">{line}</text>
      ))}
    </g>
  )
}

function TimeCue({ type }) {
  if (type === 'evening') return (
    <g transform="translate(40 34)">
      <path d="M22 0a22 22 0 1 0 22 30A19 19 0 0 1 22 0Z" fill="#72849a" />
      <circle cx="60" cy="2" r="3" fill="#d7a74d" /><circle cx="75" cy="20" r="2.5" fill="#d7a74d" />
    </g>
  )
  const y = type === 'afternoon' ? 28 : 58
  return (
    <g transform={`translate(52 ${y})`}>
      <circle r="19" fill="#e6b85c" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line key={angle} x1="0" y1="-28" x2="0" y2="-36" stroke="#d59c36" strokeLinecap="round" strokeWidth="3" transform={`rotate(${angle})`} />
      ))}
      {type === 'morning' && <path d="M-42 25 Q0 4 42 25" fill="none" stroke="#a3b18a" strokeWidth="4" />}
    </g>
  )
}

function GreetingVocabularySVG({ item }) {
  const phraseScene = item.kind === 'phrase'
  const isGroup = item.visualKey === 'group-meeting'
  const isMeeting = ['meeting', 'face-to-face', 'group-meeting'].includes(item.visualKey)
  const hasTimeCue = ['morning', 'afternoon', 'evening'].includes(item.visualKey)
  return (
    <svg className="greetings-card-svg" viewBox="0 0 360 190" role="img" aria-label={`${item.phrase} の場面イラスト`}>
      <rect x="1" y="1" width="358" height="188" rx="3" fill="#f7f9f5" />
      <path d="M0 151 Q90 132 180 151 T360 151 V190 H0Z" fill="#e6eee3" />
      {hasTimeCue && <TimeCue type={item.visualKey} />}
      {item.visualKey === 'face-to-face' && (
        <g transform="translate(24 22)">
          <rect width="70" height="48" rx="4" fill="#fff" stroke="#8aa584" strokeWidth="2" />
          <circle cx="35" cy="21" r="8" fill="#5e7c8b" />
          <path d="M20 43 Q35 28 50 43" fill="#5e7c8b" />
          <path d="M22 55 H49" stroke="#667174" strokeLinecap="round" strokeWidth="4" />
        </g>
      )}
      {isMeeting && (
        <g transform="translate(157 139)">
          <path d="M0 2 Q17-12 34 2 Q17 19 0 2Z" fill="#d7a74d" />
          <path d="M-5-4 l12-8 M39-4 l-12-8" stroke="#b57c27" strokeLinecap="round" strokeWidth="4" />
        </g>
      )}
      <ScenePerson x={phraseScene || isMeeting ? 92 : 108} y={126} color="#588157" wave={!isMeeting} />
      <ScenePerson x={isGroup ? 252 : 262} y={128} color="#5e7c8b" flip muted={!phraseScene && !isMeeting} />
      {isGroup && <ScenePerson x={304} y={137} color="#a67c52" flip muted />}
      {item.visualKey === 'alright' && <text x="295" y="98" fill="#d08a40" fontFamily="Hanken Grotesk, sans-serif" fontSize="36" fontWeight="800">?</text>}
      {item.visualKey === 'hiya' && <circle cx="45" cy="100" r="5" fill="#d7a74d" opacity=".9" />}
      <SpeechBubble text={item.phrase} x={phraseScene ? 112 : 145} y={14} width={phraseScene ? 224 : 176} />
    </svg>
  )
}

function GreetingSceneArtwork({ tone }) {
  const informal = tone === 'informal'
  return (
    <svg className={`greetings-scene-artwork tone-${tone}`} viewBox="0 0 760 390" role="img" aria-label={informal ? '車のそばで友人同士がカジュアルにあいさつする場面' : '仕事の場で丁寧にあいさつする場面'}>
      <rect width="760" height="390" fill="#fff" />
      {informal ? (
        <>
          <path d="M0 315 Q190 281 380 315 T760 315 V390 H0Z" fill="#f4f7fb" />
          <g transform="translate(102 178)">
            <path d="M0 99 Q8 39 58 28 H182 Q218 39 233 99Z" fill="#b9c7d8" />
            <rect y="99" width="239" height="54" rx="10" fill="#94a5bb" />
            <path d="M61 39 H175 Q191 43 204 83 H34 Q45 45 61 39Z" fill="#d8e4ee" />
            <circle cx="53" cy="154" r="31" fill="#46556b" stroke="#fff" strokeWidth="7" />
            <circle cx="198" cy="154" r="31" fill="#46556b" stroke="#fff" strokeWidth="7" />
          </g>
          <g transform="translate(428 178) scale(-1 1)">
            <path d="M0 99 Q8 39 58 28 H182 Q218 39 233 99Z" fill="#b9c7d8" />
            <rect y="99" width="239" height="54" rx="10" fill="#94a5bb" />
            <path d="M61 39 H175 Q191 43 204 83 H34 Q45 45 61 39Z" fill="#d8e4ee" />
            <circle cx="53" cy="154" r="31" fill="#46556b" stroke="#fff" strokeWidth="7" />
            <circle cx="198" cy="154" r="31" fill="#46556b" stroke="#fff" strokeWidth="7" />
          </g>
          <ScenePerson x={322} y={294} color="#753cf2" wave />
          <ScenePerson x={454} y={294} color="#753cf2" flip wave />
          <path d="M378 268 Q388 247 399 268 M399 268 Q410 247 421 268" fill="none" stroke="#753cf2" strokeLinecap="round" strokeWidth="8" />
        </>
      ) : (
        <>
          <ellipse cx="300" cy="298" rx="222" ry="59" fill="#dff2ff" stroke="#72b7df" strokeWidth="5" />
          {[190, 240, 300, 360, 420].map((x) => <rect key={x} x={x} y="253" width="18" height="42" rx="6" fill="#087fb9" />)}
          <ScenePerson x={465} y={287} color="#087fb9" />
          <ScenePerson x={585} y={287} color="#087fb9" flip />
          <circle cx="524" cy="247" r="10" fill="#40b8e8" />
          <path d="M495 254 Q522 238 548 254" fill="none" stroke="#087fb9" strokeLinecap="round" strokeWidth="7" />
          <path d="M430 191 Q522 155 615 191" fill="none" stroke="#a7ddf6" strokeDasharray="8 10" strokeLinecap="round" strokeWidth="5" />
        </>
      )}
    </svg>
  )
}

const INFORMAL_BUBBLE_POSITIONS = ['top-left', 'top-center', 'top-right', 'middle-left', 'bottom-left', 'bottom-right']
const FORMAL_BUBBLE_POSITIONS = ['top-center', 'top-right', 'bottom-center']

function ScenePhraseBubble({ item, position, tone, selected, isPlaying, onClick }) {
  return (
    <button
      type="button"
      className={`greetings-scene-bubble tone-${tone} position-${position} ${selected ? 'is-selected' : ''} ${isPlaying ? 'is-playing' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${item.phrase}（${item.meaning}）を聞く`}
    >
      <span lang="en">{item.phrase}</span>
      <span className="greetings-scene-bubble-sound"><SoundGlyph /></span>
    </button>
  )
}

function GreetingVocabularySceneSection({ lesson, section, mastery, speech, PlayIcon }) {
  const tone = section.sourceKey === 'formal' ? 'formal' : 'informal'
  const phrases = useMemo(() => normalizeVocabularySection(lesson, section), [lesson, section])
  const recognition = useMemo(() => normalizeRecognitionSection(lesson, section), [lesson, section])
  const sceneItems = tone === 'formal' ? phrases.slice(0, 3) : phrases
  const moreItems = tone === 'formal' ? [...phrases.slice(3), ...recognition] : recognition
  const [selectedItem, setSelectedItem] = useState(sceneItems[0] || moreItems[0] || null)
  const selectedId = selectedItem?.id
  const [detailOpen, setDetailOpen] = useState(false)
  useEffect(() => {
    if (!selectedItem || ![...sceneItems, ...moreItems].some((item) => item.id === selectedItem.id)) {
      setSelectedItem(sceneItems[0] || moreItems[0] || null)
    }
  }, [moreItems, sceneItems, selectedItem])

  const playItem = useCallback((item) => {
    if (!item) return
    setSelectedItem(item)
    speech.play(item.id, [item.phrase], 0.92)
  }, [speech])
  const playAllId = `${section.id}:scene-all`
  const allItems = [...sceneItems, ...moreItems]
  const isPlayingAll = speech.playingId === playAllId

  return (
    <section id={`greetings-${section.sourceKey}`} className={`greetings-vocabulary-section tone-${tone}`}>
      <div className="greetings-vocabulary-scene-panel">
        <header className="greetings-vocabulary-panel-header">
          <div>
            <div className="greetings-vocabulary-panel-title">
              <span className="greetings-vocabulary-panel-number">{tone === 'informal' ? '1.1' : '1.3'}</span>
              <h2>{tone === 'informal' ? 'INFORMAL GREETINGS' : 'FORMAL GREETINGS'}</h2>
            </div>
            <p lang="ja">{section.intro}</p>
          </div>
          <span className={`greetings-vocabulary-tone-pill tone-${tone}`}>{tone === 'informal' ? 'Casual / Friends' : 'Business / Professional'}</span>
        </header>
        <div className="greetings-vocabulary-stage">
          <GreetingSceneArtwork tone={tone} />
          <div className="greetings-scene-bubbles">
            {sceneItems.map((item, index) => (
              <ScenePhraseBubble
                key={item.id}
                item={item}
                tone={tone}
                position={(tone === 'informal' ? INFORMAL_BUBBLE_POSITIONS : FORMAL_BUBBLE_POSITIONS)[index] || 'middle-center'}
                selected={selectedId === item.id}
                isPlaying={speech.playingId === item.id}
                onClick={() => playItem(item)}
              />
            ))}
          </div>
          <button type="button" className={`greetings-vocabulary-stage-play ${isPlayingAll ? 'is-playing' : ''}`} onClick={() => speech.play(playAllId, allItems.map((item) => item.phrase), 0.9)} disabled={!allItems.length} aria-label={isPlayingAll ? 'あいさつを停止' : 'このセクションをすべて聞く'}>
            {isPlayingAll ? <span aria-hidden="true">■</span> : <SoundGlyph />}
          </button>
        </div>
        {selectedItem && (
          <div className="greetings-vocabulary-selected" aria-live="polite">
            <div>
              <span className="section-kicker">Selected phrase · 選択中の表現</span>
              <strong lang="en">{selectedItem.phrase}</strong>
              <p lang="ja">{selectedItem.meaning}</p>
              <small lang="ja">使う場面：{selectedItem.context || selectedItem.note || '原書の表現'}</small>
            </div>
            <div className="greetings-vocabulary-selected-actions">
              <button type="button" className={speech.playingId === selectedItem.id ? 'is-playing' : ''} onClick={() => playItem(selectedItem)}><SoundGlyph /> {speech.playingId === selectedItem.id ? '停止' : '聞く'}</button>
              <button type="button" onClick={() => setDetailOpen(true)}>詳細・整理</button>
            </div>
          </div>
        )}
      </div>

      <aside className="greetings-vocabulary-more" aria-label={`${section.title}の追加表現`}>
        <header className="greetings-vocabulary-panel-header greetings-vocabulary-more-header">
          <div className="greetings-vocabulary-panel-title">
            <span className="greetings-vocabulary-panel-number">{tone === 'informal' ? '1.2' : '1.4'}</span>
            <h2>MORE PHRASES</h2>
          </div>
          <p lang="ja">追加表現 · 英語を押すと音声と意味を確認できます。</p>
        </header>
        <div className="greetings-vocabulary-more-list">
          {moreItems.map((item) => (
            <button key={item.id} type="button" className={`greetings-vocabulary-more-item ${selectedId === item.id ? 'is-selected' : ''}`} onClick={() => playItem(item)} aria-label={`${item.phrase}（${item.meaning}）を聞く`}>
              <span>
                <strong lang="en">{item.phrase}</strong>
                <small lang="ja">{item.meaning}</small>
              </span>
              <SoundGlyph />
            </button>
          ))}
        </div>
        {tone === 'formal' && recognition.length > 0 && <p className="greetings-vocabulary-recognition-note" lang="ja">※ <strong>How do you do?</strong> は原書の補足表現です。伝統的で非常にフォーマルなため、今は聞いて分かれば十分です。</p>}
      </aside>

      {detailOpen && selectedItem && (
        <VocabularyDetailDialog
          item={selectedItem}
          status={mastery.statusFor(selectedItem.id)}
          onStatus={(status) => mastery.setStatus(selectedItem.id, status)}
          onClose={() => setDetailOpen(false)}
          onPlay={() => playItem(selectedItem)}
          isPlaying={speech.playingId === selectedItem.id}
          PlayIcon={PlayIcon}
        />
      )}
    </section>
  )
}

function PlayGlyph({ PlayIcon }) {
  return PlayIcon ? <PlayIcon /> : <span aria-hidden="true">▶</span>
}

function VocabularyCard({ item, status, onPlay, onDetail, isPlaying, PlayIcon, artwork = 'greeting' }) {
  const meta = STATUS_META[status]
  return (
    <article className={`greetings-master-card status-${status}`}>
      <span className={`greetings-status-badge status-${status}`}>{meta.short}</span>
      <button type="button" className="greetings-master-card-main" onClick={onPlay} aria-label={`${item.phrase} を聞く`}>
        {artwork === 'source' ? <SourceBookSceneArtwork phraseCount={String(item.phrase || '').length} /> : <GreetingVocabularySVG item={item} />}
        <span className="greetings-master-copy">
          <strong lang="en">{item.phrase}</strong>
          <small lang="ja">{item.meaning}</small>
        </span>
      </button>
      <div className="greetings-master-card-footer">
        <span>{item.kind === 'phrase' ? 'Phrase · フレーズ' : 'Word · 単語'}</span>
        <div>
          <button type="button" className={isPlaying ? 'is-playing' : ''} onClick={onPlay}><PlayGlyph PlayIcon={PlayIcon} /> {isPlaying ? '停止' : '聞く'}</button>
          <button type="button" onClick={onDetail}>詳細・整理</button>
        </div>
      </div>
    </article>
  )
}

function VocabularyDetailDialog({ item, status, onStatus, onClose, onPlay, isPlaying, PlayIcon, artwork = 'greeting' }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === '1') onStatus('difficult')
      if (event.key === '2') onStatus('learning')
      if (event.key === '3') onStatus('known')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onStatus])

  return (
    <div className="greetings-detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="greetings-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="greetings-detail-title">
        <button type="button" className="greetings-detail-close" onClick={onClose} aria-label="閉じる">×</button>
        <div className="greetings-detail-visual">{artwork === 'source' ? <SourceBookSceneArtwork phraseCount={String(item.phrase || '').length} /> : <GreetingVocabularySVG item={item} />}</div>
        <span className="section-kicker">原書の語句 · Source phrase</span>
        <h2 id="greetings-detail-title" lang="en">{item.phrase}</h2>
        <p className="greetings-detail-meaning" lang="ja">{item.meaning}</p>
        <p className="greetings-detail-context">使う場面：{item.context}</p>
        <button type="button" className={`greetings-detail-listen ${isPlaying ? 'is-playing' : ''}`} onClick={onPlay}><PlayGlyph PlayIcon={PlayIcon} /> {isPlaying ? '停止する' : '英語を聞く'}</button>
        <div className="greetings-classify-block">
          <div>
            <span className="section-kicker">How well do you know this?</span>
            <h3>この表現を整理する</h3>
          </div>
          <div className="greetings-classify-options">
            {CLASSIFY_ORDER.map((value, index) => (
              <button key={value} type="button" className={`status-${value}`} aria-pressed={status === value} onClick={() => onStatus(value)}>
                <b>{index + 1}</b><span>{STATUS_META[value].ja}<small>{STATUS_META[value].en}</small></span>
              </button>
            ))}
          </div>
          {status !== 'unsorted' && <button type="button" className="greetings-reset-status" onClick={() => onStatus('unsorted')}>未整理に戻す</button>}
          <p>キーボードでは 1・2・3 でも選べます。</p>
        </div>
      </section>
    </div>
  )
}

function VocabularyMasteryBoard({ lesson, section, mastery, speech, PlayIcon, artwork = 'greeting' }) {
  const items = useMemo(() => normalizeVocabularySection(lesson, section), [lesson, section])
  const [filter, setFilter] = useState('unsorted')
  const [selectedItem, setSelectedItem] = useState(null)
  const counts = useMemo(() => {
    const next = { unsorted: 0, difficult: 0, learning: 0, known: 0, all: items.length }
    items.forEach((item) => { next[mastery.statusFor(item.id)] += 1 })
    return next
  }, [items, mastery.records, mastery.statusFor])
  const visibleItems = filter === 'all' ? items : items.filter((item) => mastery.statusFor(item.id) === filter)
  const playAllId = `${section.id}:${filter}:all`

  return (
    <div className="greetings-mastery-board">
      <div className="greetings-mastery-toolbar">
        <div className="greetings-status-tabs" role="tablist" aria-label={`${section.title} 学習状況`}>
          {STATUS_ORDER.map((value) => (
            <button key={value} type="button" role="tab" aria-selected={filter === value} className={`status-${value} ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>
              <span>{STATUS_META[value].ja}<small>{STATUS_META[value].en}</small></span><b>{counts[value]}</b>
            </button>
          ))}
        </div>
        <button type="button" className={`greetings-play-all ${speech.playingId === playAllId ? 'is-playing' : ''}`} disabled={!visibleItems.length} onClick={() => speech.play(playAllId, visibleItems.map((item) => item.phrase), 0.9)}>
          <PlayGlyph PlayIcon={PlayIcon} /> {speech.playingId === playAllId ? '停止' : '表示中をすべて聞く'}
        </button>
      </div>

      {visibleItems.length ? (
        <div className="greetings-master-grid">
          {visibleItems.map((item) => (
            <VocabularyCard
              key={item.id}
              item={item}
              status={mastery.statusFor(item.id)}
              isPlaying={speech.playingId === item.id}
              onPlay={() => speech.play(item.id, [item.phrase], 0.92)}
              onDetail={() => setSelectedItem(item)}
              PlayIcon={PlayIcon}
              artwork={artwork}
            />
          ))}
        </div>
      ) : (
        <div className="greetings-empty-filter"><strong>{STATUS_META[filter].ja}の項目はありません。</strong><button type="button" onClick={() => setFilter('all')}>すべてを見る</button></div>
      )}

      {selectedItem && (
        <VocabularyDetailDialog
          item={selectedItem}
          status={mastery.statusFor(selectedItem.id)}
          onStatus={(status) => mastery.setStatus(selectedItem.id, status)}
          onClose={() => setSelectedItem(null)}
          onPlay={() => speech.play(selectedItem.id, [selectedItem.phrase], 0.88)}
          isPlaying={speech.playingId === selectedItem.id}
          PlayIcon={PlayIcon}
          artwork={artwork}
        />
      )}
    </div>
  )
}

function GreetingHeroIllustration() {
  return (
    <svg className="greetings-hero-svg" viewBox="0 0 520 300" role="img" aria-label="あいさつから会話が始まる場面">
      <rect width="520" height="300" rx="4" fill="#eef3eb" />
      <path d="M0 244 Q130 215 260 244 T520 244 V300 H0Z" fill="#dce8d8" />
      <rect x="207" y="46" width="108" height="194" rx="3" fill="#fff" stroke="#8aa584" strokeWidth="5" />
      <path d="M261 49 V238" stroke="#d7dfd4" strokeWidth="3" />
      <circle cx="282" cy="145" r="5" fill="#d39b46" />
      <path d="M238 75 Q260 57 282 75" fill="none" stroke="#a3b18a" strokeWidth="4" />
      <ScenePerson x={128} y={205} color="#588157" wave />
      <ScenePerson x={392} y={207} color="#5e7c8b" flip wave />
      <SpeechBubble text="Hello!" x={42} y={26} width={150} />
      <SpeechBubble text="Hi!" x={331} y={42} width={130} />
      <path d="M196 150 H323" stroke="#d39b46" strokeDasharray="7 8" strokeLinecap="round" strokeWidth="4" />
    </svg>
  )
}

function ConversationSceneSVG({ variant }) {
  const reunion = variant === 'reunion'
  return (
    <svg className="greetings-conversation-svg" viewBox="0 0 560 230" role="img" aria-label={reunion ? '久しぶりに再会してあいさつする二人' : '近況を尋ね合う二人'}>
      <rect x="1" y="1" width="558" height="228" rx="3" fill="#f7f9f5" stroke="#d8dfd5" />
      <path d="M0 179 Q140 154 280 179 T560 179 V230 H0Z" fill="#e5eee2" />
      {reunion ? (
        <g transform="translate(258 45)">
          <circle r="31" fill="#fff" stroke="#8aa584" strokeWidth="4" />
          <path d="M0-20 V2 L15 12" fill="none" stroke="#588157" strokeLinecap="round" strokeWidth="4" />
          <path d="M-38 35 Q0 58 38 35" fill="none" stroke="#d39b46" strokeDasharray="5 7" strokeWidth="3" />
        </g>
      ) : (
        <g transform="translate(238 35)">
          <rect width="85" height="50" rx="4" fill="#fff" stroke="#8aa584" strokeWidth="3" />
          <path d="M20 21 H65 M20 32 H52" stroke="#a3b18a" strokeLinecap="round" strokeWidth="4" />
        </g>
      )}
      <ScenePerson x={145} y={166} color="#588157" wave />
      <ScenePerson x={414} y={168} color="#5e7c8b" flip wave={reunion} />
      <path d="M209 142 Q280 105 351 142" fill="none" stroke="#d39b46" strokeDasharray="7 8" strokeWidth="4" />
      <circle cx="280" cy="111" r="6" fill="#d39b46" />
    </svg>
  )
}

function SoundGlyph() {
  return (
    <svg className="greetings-sound-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  )
}

function ConversationBubble({ line, placement, dialogueId, index, speech }) {
  const speaker = line.speaker || (index ? 'B' : 'A')
  const playId = `${dialogueId}:${index}`
  const isPlaying = speech.playingId === playId
  return (
    <button
      type="button"
      className={`greetings-dialogue-bubble bubble-${placement} ${isPlaying ? 'is-playing' : ''}`}
      onClick={() => speech.play(playId, [line.en], 0.92)}
      aria-label={`${line.en}を聞く`}
    >
      <span className="greetings-dialogue-speaker"><b>PERSON {speaker}</b><small>話者 {speaker}</small></span>
      <span className="greetings-dialogue-english" lang="en">“{line.en}”</span>
      <span className="greetings-dialogue-sound"><SoundGlyph /></span>
      <small className="greetings-dialogue-japanese" lang="ja">{line.ja}</small>
    </button>
  )
}

function ConversationCard({ dialogue, speech, PlayIcon }) {
  const playId = `dialogue:${dialogue.id}`
  const firstLine = dialogue.lines[0]
  const lastLine = dialogue.lines[dialogue.lines.length - 1]
  const middleLines = dialogue.lines.slice(1, -1)
  return (
    <article className="greetings-conversation-card">
      <header className="greetings-conversation-card-header">
        <div>
          <span className="section-kicker">{dialogue.label || 'Source dialogue'}</span>
          <h3>{dialogue.title}</h3>
        </div>
        <span className="greetings-conversation-turns">{dialogue.lines.length} turns</span>
      </header>
      <div className="greetings-conversation-stage">
        {firstLine && <ConversationBubble line={firstLine} placement="top" dialogueId={dialogue.id} index={0} speech={speech} />}
        <button type="button" className="greetings-conversation-scene" onClick={() => speech.play(playId, dialogue.lines.map((line) => line.en), 0.9)} aria-label={`${dialogue.title}をすべて聞く`}>
          <ConversationSceneSVG variant={dialogue.id} />
        </button>
        <button type="button" className={`greetings-play-dialogue ${speech.playingId === playId ? 'is-playing' : ''}`} onClick={() => speech.play(playId, dialogue.lines.map((line) => line.en), 0.9)}>
          <span className="greetings-play-dialogue-icon"><PlayGlyph PlayIcon={PlayIcon} /></span>
          <span lang="en">{speech.playingId === playId ? 'Stop conversation' : 'Play full conversation'}</span>
          <small lang="ja">{speech.playingId === playId ? '停止' : '会話全体を聞く'}</small>
        </button>
        {middleLines.map((line, index) => <ConversationBubble key={`${dialogue.id}-middle-${index}`} line={line} placement="middle" dialogueId={dialogue.id} index={index + 1} speech={speech} />)}
        {lastLine && <ConversationBubble line={lastLine} placement="bottom" dialogueId={dialogue.id} index={dialogue.lines.length - 1} speech={speech} />}
      </div>
    </article>
  )
}

function VocabularyLessonSection({ lesson, section, mastery, speech, PlayIcon }) {
  if (['informal', 'formal'].includes(section.sourceKey)) {
    return <GreetingVocabularySceneSection lesson={lesson} section={section} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />
  }
  return (
    <section id={`greetings-${section.sourceKey}`} className="greetings-content-section greetings-learning-panel">
      <div className="greetings-learning-panel-head">
        <div>
          <span className="section-kicker">{section.enTitle}</span>
          <h2>{section.title}</h2>
          <p>{section.intro}</p>
        </div>
        <span className="greetings-item-count">{section.phrases.length}<small>items</small></span>
      </div>
      <VocabularyMasteryBoard lesson={lesson} section={section} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />
    </section>
  )
}

function GoodToKnow({ rows }) {
  return (
    <section id="greetings-good-to-know" className="greetings-content-section greetings-good-to-know">
      <div className="greetings-section-heading">
        <span className="section-kicker">Good to know · 原書のポイント</span>
        <h2>短くすると、会話らしい流れになる。</h2>
        <p>インフォーマルな英語では、長い形を短縮したり、文頭の <strong>It&apos;s</strong> を省略したりすることがあります。</p>
      </div>
      <div className="greetings-natural-table">
        {rows.map((row) => (
          <div key={row.natural}>
            <span lang="en">{row.full}</span><b aria-hidden="true">→</b><strong lang="en">{row.natural}</strong><small lang="ja">{row.ja}</small>
          </div>
        ))}
      </div>
      <p className="greetings-good-note"><strong lang="en">Good to see you. · Nice to meet you. · Been too long!</strong><br />このように、会話では文頭の <span lang="en">It&apos;s</span> が省かれることがあります。</p>
    </section>
  )
}

export function GreetingsInteractiveLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const sections = (lesson.learn?.sections || []).filter((section) => ['informal', 'formal'].includes(section.sourceKey))
  const dialogues = lesson.learn?.dialogues || []
  const background = lesson.learn?.background || lesson.learn?.intro || []
  const naturalSpeech = lesson.learn?.naturalSpeech || []
  const [activeSection, setActiveSection] = useState('greetings-why')
  const outline = [
    ['greetings-why', 'なぜ、あいさつ？'],
    ...sections.map((section) => [`greetings-${section.sourceKey}`, section.title]),
    ['greetings-conversations', 'あいさつを交わす'],
    ['greetings-good-to-know', 'Good to know'],
  ]

  return (
    <div className="lesson-page greetings-page source-book-page greetings-interactive-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="greetings-why" className="greetings-content-section greetings-interactive-hero">
            <div className="greetings-hero-copy">
              <span className="section-kicker">Chapter 01 · Start with the big picture</span>
              <h2>あいさつは、会話のドアを開く小さなサイン。</h2>
              {background.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <GreetingHeroIllustration />
          </section>

          {sections.map((section) => <VocabularyLessonSection key={section.id} lesson={lesson} section={section} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />)}

          <section id="greetings-conversations" className="greetings-content-section greetings-conversation-section">
            <div className="greetings-section-heading">
              <span className="section-kicker">Exchanging greetings · 実際の会話</span>
              <h2>単語やフレーズを、会話の順番で見る。</h2>
              <p>ここは語彙カードではなく、原書にある2人のやり取りです。各発話と会話全体を分けて確認できます。</p>
            </div>
            <div className="greetings-conversation-grid">{dialogues.map((dialogue) => <ConversationCard key={dialogue.id} dialogue={dialogue} speech={speech} PlayIcon={PlayIcon} />)}</div>
          </section>

          <GoodToKnow rows={naturalSpeech} />
        </div>
        <ResponsiveOutline className="greetings-outline" ariaLabel="このページの項目">
          {outline.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setActiveSection(id)}>{label}</a>)}
        </ResponsiveOutline>
      </div>
    </div>
  )
}

const INTRODUCTION_BUBBLE_POSITIONS = {
  informal: ['top-left', 'top-center', 'middle-left', 'top-right'],
  formal: ['top-center', 'top-right', 'bottom-center'],
  others: ['top-left', 'top-right', 'bottom-center'],
}

function IntroductionSceneArtwork({ tone = 'informal' }) {
  const formal = tone === 'formal'
  const others = tone === 'others'
  return (
    <svg className="greetings-scene-artwork introduction-scene-artwork" viewBox="0 0 760 390" role="img" aria-label={formal ? '職場で自己紹介をする場面' : others ? '知り合い同士を紹介する場面' : 'カジュアルに自己紹介をする場面'}>
      <rect width="760" height="390" fill="#fff" />
      <path d="M0 315 Q190 281 380 315 T760 315 V390 H0Z" fill={formal ? '#eef5f8' : '#f4f7fb'} />
      {formal ? (
        <>
          <rect x="75" y="205" width="310" height="28" rx="5" fill="#d5e8ee" />
          <rect x="108" y="233" width="28" height="80" fill="#b3cdd7" />
          <rect x="325" y="233" width="28" height="80" fill="#b3cdd7" />
          {[100, 175, 250, 325].map((x) => <rect key={x} x={x} y="160" width="18" height="45" rx="3" fill="#b3cdd7" />)}
          <ScenePerson x={487} y={294} color="#087fb9" />
          <ScenePerson x={610} y={294} color="#087fb9" flip />
          <path d="M532 268 Q548 252 565 268 M565 268 Q582 252 598 268" fill="none" stroke="#40b8e8" strokeLinecap="round" strokeWidth="7" />
        </>
      ) : others ? (
        <>
          <ellipse cx="380" cy="284" rx="180" ry="48" fill="#f7e8d9" stroke="#d7a74d" strokeWidth="4" />
          <ScenePerson x={210} y={294} color="#d66b3d" wave />
          <ScenePerson x={380} y={294} color="#753cf2" />
          <ScenePerson x={550} y={294} color="#5e7c8b" flip wave />
          <path d="M271 255 Q380 211 489 255" fill="none" stroke="#d7a74d" strokeDasharray="7 9" strokeLinecap="round" strokeWidth="4" />
          <circle cx="380" cy="228" r="6" fill="#d7a74d" />
        </>
      ) : (
        <>
          <path d="M135 278 Q235 242 335 278 T535 278" fill="none" stroke="#d8e4ee" strokeWidth="20" strokeLinecap="round" />
          <ScenePerson x={276} y={294} color="#753cf2" wave />
          <ScenePerson x={457} y={294} color="#5e7c8b" flip wave />
          <path d="M328 256 Q366 229 405 256" fill="none" stroke="#d7a74d" strokeDasharray="7 9" strokeLinecap="round" strokeWidth="4" />
          <circle cx="366" cy="231" r="6" fill="#d7a74d" />
        </>
      )}
    </svg>
  )
}

function IntroductionVocabularySceneSection({ lesson, section, panelNumber, tone, moreItemsOverride, moreNumber }) {
  const mastery = section.mastery
  const speech = section.speech
  const PlayIcon = section.PlayIcon
  const phrases = useMemo(() => normalizeVocabularySection(lesson, section), [lesson, section])
  const recognition = useMemo(() => normalizeRecognitionSection(lesson, section), [lesson, section])
  const sceneCount = tone === 'formal' ? 3 : phrases.length
  const sceneItems = useMemo(() => phrases.slice(0, sceneCount), [phrases, sceneCount])
  const moreItems = useMemo(() => {
    if (moreItemsOverride) {
      const moreSection = { id: `${section.id}-more`, sourceKey: `${section.sourceKey}-more`, phrases: moreItemsOverride }
      return normalizeVocabularySection(lesson, moreSection)
    }
    return [...phrases.slice(sceneCount), ...recognition]
  }, [lesson, moreItemsOverride, phrases, recognition, sceneCount, section.id, section.sourceKey])
  const [selectedItem, setSelectedItem] = useState(sceneItems[0] || moreItems[0] || null)
  const selectedId = selectedItem?.id
  const [detailOpen, setDetailOpen] = useState(false)
  useEffect(() => {
    if (!selectedItem || ![...sceneItems, ...moreItems].some((item) => item.id === selectedItem.id)) setSelectedItem(sceneItems[0] || moreItems[0] || null)
  }, [moreItems, sceneItems, selectedItem])

  const playItem = useCallback((item) => {
    if (!item) return
    setSelectedItem(item)
    speech.play(item.id, [item.phrase], 0.92)
  }, [speech])
  const playAllId = `${section.id}:scene-all`
  const allItems = [...sceneItems, ...moreItems]
  const panelTitle = tone === 'formal' ? 'INTRODUCING YOURSELF FORMALLY' : tone === 'others' ? 'INTRODUCING OTHER PEOPLE' : 'INTRODUCING YOURSELF INFORMALLY'
  const toneLabel = tone === 'formal' ? 'Business / Professional' : tone === 'others' ? 'Connecting people' : 'Casual / Friends'

  return (
    <section id={`introductions-${section.sourceKey}`} className={`greetings-vocabulary-section introductions-vocabulary-section tone-${tone}`}>
      <div className="greetings-vocabulary-scene-panel">
        <header className="greetings-vocabulary-panel-header">
          <div>
            <div className="greetings-vocabulary-panel-title"><span className="greetings-vocabulary-panel-number">{panelNumber}</span><h2>{panelTitle}</h2></div>
            <p lang="ja">{section.intro}</p>
          </div>
          <span className={`greetings-vocabulary-tone-pill tone-${tone}`}>{toneLabel}</span>
        </header>
        <div className="greetings-vocabulary-stage">
          <IntroductionSceneArtwork tone={tone} />
          <div className="greetings-scene-bubbles">
            {sceneItems.map((item, index) => <ScenePhraseBubble key={item.id} item={item} tone={tone} position={INTRODUCTION_BUBBLE_POSITIONS[tone][index] || 'middle-center'} selected={selectedId === item.id} isPlaying={speech.playingId === item.id} onClick={() => playItem(item)} />)}
          </div>
          <button type="button" className={`greetings-vocabulary-stage-play ${speech.playingId === playAllId ? 'is-playing' : ''}`} onClick={() => speech.play(playAllId, allItems.map((item) => item.phrase), 0.9)} disabled={!allItems.length} aria-label={speech.playingId === playAllId ? '自己紹介を停止' : 'このセクションをすべて聞く'}>
            {speech.playingId === playAllId ? <span aria-hidden="true">■</span> : <SoundGlyph />}
          </button>
        </div>
        {selectedItem && <div className="greetings-vocabulary-selected" aria-live="polite">
          <div><span className="section-kicker">Selected phrase · 選択中の表現</span><strong lang="en">{selectedItem.phrase}</strong><p lang="ja">{selectedItem.meaning}</p><small lang="ja">使う場面：{selectedItem.context || selectedItem.note || '原書の表現'}</small></div>
          <div className="greetings-vocabulary-selected-actions"><button type="button" className={speech.playingId === selectedItem.id ? 'is-playing' : ''} onClick={() => playItem(selectedItem)}><SoundGlyph /> {speech.playingId === selectedItem.id ? '停止' : '聞く'}</button><button type="button" onClick={() => setDetailOpen(true)}>詳細・整理</button></div>
        </div>}
      </div>

      <aside className="greetings-vocabulary-more" aria-label={`${section.title}の追加表現`}>
        <header className="greetings-vocabulary-panel-header greetings-vocabulary-more-header">
          <div className="greetings-vocabulary-panel-title">{moreNumber && <span className="greetings-vocabulary-panel-number">{moreNumber}</span>}<h2>MORE PHRASES</h2></div>
          <p lang="ja">追加表現 · 英語を押すと音声と意味を確認できます。</p>
        </header>
        <div className="greetings-vocabulary-more-list">{moreItems.map((item) => <button key={item.id} type="button" className={`greetings-vocabulary-more-item ${selectedId === item.id ? 'is-selected' : ''}`} onClick={() => playItem(item)} aria-label={`${item.phrase}（${item.meaning}）を聞く`}><span><strong lang="en">{item.phrase}</strong><small lang="ja">{item.meaning}</small></span><SoundGlyph /></button>)}</div>
      </aside>

      {detailOpen && selectedItem && <VocabularyDetailDialog item={selectedItem} status={mastery.statusFor(selectedItem.id)} onStatus={(status) => mastery.setStatus(selectedItem.id, status)} onClose={() => setDetailOpen(false)} onPlay={() => playItem(selectedItem)} isPlaying={speech.playingId === selectedItem.id} PlayIcon={PlayIcon} />}
    </section>
  )
}

export function IntroductionsInteractiveLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const learn = lesson.learn || {}
  const sections = useMemo(() => [
    { ...learn.informal, id: 'intro-informal', sourceKey: 'informal', mastery, speech, PlayIcon },
    { ...learn.formal, id: 'intro-formal', sourceKey: 'formal', mastery, speech, PlayIcon },
    { ...learn.others, id: 'intro-others', sourceKey: 'others', mastery, speech, PlayIcon },
  ], [PlayIcon, learn.formal, learn.informal, learn.others, mastery, speech])
  const [activeSection, setActiveSection] = useState('introductions-why')
  const outline = [['introductions-why', '自己紹介の役割'], ...sections.map((section) => [`introductions-${section.sourceKey}`, section.title]), ['introductions-conversations', '会話を交わす'], ['introductions-tips', 'Good to know']]

  return (
    <div className="lesson-page greetings-page source-book-page greetings-interactive-page introductions-interactive-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader">
        <div className="greetings-reader-main">
          <section id="introductions-why" className="greetings-content-section greetings-interactive-hero">
            <div className="greetings-hero-copy"><span className="section-kicker">Chapter 02 · Start with the big picture</span><h2>自分が誰なのかを、相手に伝える。</h2>{(learn.intro || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <IntroductionSceneArtwork tone="informal" />
          </section>

          <section className="greetings-content-section introductions-context-strip"><div><span className="section-kicker">Context matters · 場面で変わる</span><h2>名前だけでなく、関係や役割も伝えます。</h2><p>友人、職場、初対面など、相手との距離に合わせて自己紹介の形を選びます。</p></div><div className="greetings-recap"><div><span className="section-kicker">Casual</span><p>Hey, I&apos;m Tao.</p></div><div><span className="section-kicker">Professional</span><p>Hello, I&apos;m Daniyal Ali.</p></div></div></section>

          <IntroductionVocabularySceneSection lesson={lesson} section={sections[0]} panelNumber="2.1" tone="informal" />
          <IntroductionVocabularySceneSection lesson={lesson} section={sections[1]} panelNumber="2.2" tone="formal" />
          <IntroductionVocabularySceneSection lesson={lesson} section={sections[2]} panelNumber="2.3" tone="others" moreItemsOverride={learn.more || []} moreNumber="2.4" />

          <section id="introductions-conversations" className="greetings-content-section greetings-conversation-section">
            <div className="greetings-section-heading"><span className="section-kicker">Introducing people · 実際の会話</span><h2>紹介の順番を、会話の流れで見る。</h2><p>一人ずつの発話を押して聞いたり、会話全体を続けて聞いたりできます。日本語の意味も残しています。</p></div>
            <div className="greetings-conversation-grid">{(learn.dialogues || []).map((dialogue) => <ConversationCard key={dialogue.id} dialogue={dialogue} speech={speech} PlayIcon={PlayIcon} />)}</div>
          </section>

          <section id="introductions-tips" className="greetings-content-section greetings-good-to-know introductions-good-to-know"><div className="greetings-section-heading"><span className="section-kicker">Good to know · 原書のポイント</span><h2>名前に、ひと言の関係と返事を添える。</h2><p>{learn.tip}</p></div><div className="greetings-recap"><div><span className="section-kicker">自分で使う</span><p>Hey, I&apos;m … · I don&apos;t think we&apos;ve met. · You can call me …</p></div><div><span className="section-kicker">返せるようにする</span><p>Lovely to meet you. · Great to meet you! · You, too!</p></div></div><p className="greetings-next-cue">Practiceで声を重ねる →</p></section>
        </div>
        <ResponsiveOutline className="greetings-outline" ariaLabel="このページの項目">
          {outline.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setActiveSection(id)}>{label}</a>)}
        </ResponsiveOutline>
      </div>
    </div>
  )
}

export function IntroductionsInteractivePracticeView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const learn = lesson.learn || {}
  const sections = useMemo(() => [
    { ...learn.informal, id: 'intro-informal', sourceKey: 'informal' },
    { ...learn.formal, id: 'intro-formal', sourceKey: 'formal' },
    { ...learn.others, id: 'intro-others', sourceKey: 'others' },
    { id: 'intro-more', sourceKey: 'more', title: 'More phrases', intro: '人間関係や役割を添える表現です。', phrases: learn.more || [] },
  ], [learn.formal, learn.informal, learn.more, learn.others])
  const [track, setTrack] = useState('vocabulary')
  const [selectedSection, setSelectedSection] = useState(0)
  const active = sections[selectedSection] || sections[0]
  return (
    <div className="practice-page greetings-practice-page greetings-interactive-practice introductions-interactive-practice">
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title="自己紹介を整理して、会話で使う" ja="原書の語句と会話だけを使って、覚え方を自分に合わせます。" />
      <div className="greetings-track-switch" role="tablist" aria-label="練習内容"><button type="button" role="tab" aria-selected={track === 'vocabulary'} className={track === 'vocabulary' ? 'active' : ''} onClick={() => setTrack('vocabulary')}><span>語彙・フレーズ<small>Vocabulary</small></span></button><button type="button" role="tab" aria-selected={track === 'conversation'} className={track === 'conversation' ? 'active' : ''} onClick={() => setTrack('conversation')}><span>会話<small>Conversation</small></span></button></div>
      {track === 'vocabulary' ? <section className="greetings-practice-section greetings-learning-panel"><div className="greetings-section-heading"><span className="section-kicker">Vocabulary mastery</span><h2>今、集中したい表現だけを見る。</h2><p>「難しい・学習中・覚えた」に整理した結果は、このブラウザーに保存されます。</p></div><div className="greetings-dialogue-tabs" role="tablist">{sections.map((section, index) => <button key={section.id} type="button" role="tab" aria-selected={selectedSection === index} className={selectedSection === index ? 'active' : ''} onClick={() => setSelectedSection(index)}>{section.title}</button>)}</div>{active && <VocabularyMasteryBoard lesson={lesson} section={active} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />}</section> : <section className="greetings-practice-section greetings-conversation-section"><div className="greetings-section-heading"><span className="section-kicker">Conversation studio</span><h2>全文・一行ずつ・役割練習。</h2><p>会話文は原書の2つのやり取りから変えていません。</p></div><ConversationPracticeStudio dialogues={learn.dialogues || []} speech={speech} PlayIcon={PlayIcon} /></section>}
    </div>
  )
}

function ConversationPracticeStudio({ dialogues, speech, PlayIcon }) {
  const [mode, setMode] = useState('full')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [revealedCount, setRevealedCount] = useState(1)
  const [role, setRole] = useState('A')
  const [revealedOwnLines, setRevealedOwnLines] = useState({})
  const active = dialogues[dialogueIndex] || dialogues[0]

  useEffect(() => {
    setRevealedCount(1)
    setRevealedOwnLines({})
  }, [dialogueIndex, mode, role])

  if (!active) return null

  return (
    <div className="greetings-conversation-studio">
      <div className="greetings-studio-modes" role="tablist" aria-label="会話練習モード">
        {[
          ['full', '全文', 'Full dialogue'],
          ['interactive', '一行ずつ', 'Interactive'],
          ['roleplay', '役を選ぶ', 'Role-play'],
        ].map(([value, ja, en]) => <button key={value} type="button" role="tab" aria-selected={mode === value} className={mode === value ? 'active' : ''} onClick={() => setMode(value)}><span>{ja}<small>{en}</small></span></button>)}
      </div>

      {mode === 'full' ? (
        <div className="greetings-conversation-grid">{dialogues.map((dialogue) => <ConversationCard key={dialogue.id} dialogue={dialogue} speech={speech} PlayIcon={PlayIcon} />)}</div>
      ) : (
        <>
          <div className="greetings-dialogue-tabs" role="tablist">
            {dialogues.map((dialogue, index) => <button key={dialogue.id} type="button" role="tab" aria-selected={dialogueIndex === index} className={dialogueIndex === index ? 'active' : ''} onClick={() => setDialogueIndex(index)}>{dialogue.title}</button>)}
          </div>
          <article className="greetings-practice-conversation-card">
            <ConversationSceneSVG variant={active.id} />
            {mode === 'interactive' && (
              <div className="greetings-interactive-lines">
                {active.lines.slice(0, revealedCount).map((line, index) => (
                  <button key={`${active.id}-${index}`} type="button" className={`speaker-${String(line.speaker).toLowerCase()}`} onClick={() => speech.play(`practice:${active.id}:${index}`, [line.en], 0.9)}><span>{line.speaker}</span><strong>{line.en}</strong><small>{line.ja}</small><PlayGlyph PlayIcon={PlayIcon} /></button>
                ))}
                <button type="button" className="greetings-next-line" onClick={() => setRevealedCount((count) => count >= active.lines.length ? 1 : count + 1)}>{revealedCount >= active.lines.length ? '最初から見る' : '次の発話を表示'}</button>
              </div>
            )}
            {mode === 'roleplay' && (
              <div className="greetings-roleplay-panel">
                <div className="greetings-role-choice" role="group" aria-label="練習する役">
                  {['A', 'B'].map((speaker) => <button key={speaker} type="button" className={role === speaker ? 'active' : ''} aria-pressed={role === speaker} onClick={() => setRole(speaker)}>{speaker} を練習</button>)}
                </div>
                {active.lines.map((line, index) => {
                  const isOwnLine = line.speaker === role
                  const lineId = `${active.id}:${index}`
                  const isRevealed = revealedOwnLines[lineId]
                  if (isOwnLine && !isRevealed) return <button key={lineId} type="button" className="greetings-roleplay-hidden" onClick={() => setRevealedOwnLines((current) => ({ ...current, [lineId]: true }))}><span>{role}</span><strong>あなたの番です</strong><small>タップして原文を確認</small></button>
                  return <button key={lineId} type="button" className={`greetings-roleplay-line ${isOwnLine ? 'is-own-line' : ''}`} onClick={() => speech.play(`role:${lineId}`, [line.en], 0.88)}><span>{line.speaker}</span><strong>{line.en}</strong>{!isOwnLine && <small>{line.ja}</small>}<PlayGlyph PlayIcon={PlayIcon} /></button>
                })}
              </div>
            )}
          </article>
        </>
      )}
    </div>
  )
}

export function GreetingsInteractivePracticeView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const sections = (lesson.learn?.sections || []).filter((section) => ['informal', 'formal'].includes(section.sourceKey))
  const dialogues = lesson.learn?.dialogues || []
  const [track, setTrack] = useState('vocabulary')
  const [selectedSection, setSelectedSection] = useState(0)
  const active = sections[selectedSection] || sections[0]

  return (
    <div className="practice-page greetings-practice-page greetings-interactive-practice">
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title="あいさつを整理して、会話で使う" ja="原書の語句と会話だけを使って、覚え方を自分に合わせます。" />
      <div className="greetings-track-switch" role="tablist" aria-label="練習内容">
        <button type="button" role="tab" aria-selected={track === 'vocabulary'} className={track === 'vocabulary' ? 'active' : ''} onClick={() => setTrack('vocabulary')}><span>語彙・フレーズ<small>Vocabulary</small></span></button>
        <button type="button" role="tab" aria-selected={track === 'conversation'} className={track === 'conversation' ? 'active' : ''} onClick={() => setTrack('conversation')}><span>会話<small>Conversation</small></span></button>
      </div>

      {track === 'vocabulary' ? (
        <section className="greetings-practice-section greetings-learning-panel">
          <div className="greetings-section-heading"><span className="section-kicker">Vocabulary mastery</span><h2>今、集中したい表現だけを見る。</h2><p>「難しい・学習中・覚えた」に整理した結果は、このブラウザーに保存されます。</p></div>
          <div className="greetings-dialogue-tabs" role="tablist">
            {sections.map((section, index) => <button key={section.id} type="button" role="tab" aria-selected={selectedSection === index} className={selectedSection === index ? 'active' : ''} onClick={() => setSelectedSection(index)}>{section.title}</button>)}
          </div>
          {active && <VocabularyMasteryBoard lesson={lesson} section={active} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />}
        </section>
      ) : (
        <section className="greetings-practice-section greetings-conversation-section">
          <div className="greetings-section-heading"><span className="section-kicker">Conversation studio</span><h2>全文・一行ずつ・役割練習。</h2><p>会話文は原書の2つのやり取りから変えていません。</p></div>
          <ConversationPracticeStudio dialogues={dialogues} speech={speech} PlayIcon={PlayIcon} />
        </section>
      )}
    </div>
  )
}

/*
 * The source-book chapters share the same learning contract, but their
 * vocabulary is not limited to greetings.  These generic panels intentionally
 * keep the source phrase as the hero while Japanese remains visible beside it
 * and in the detail dialog.  The artwork is decorative only: it never invents
 * a new English example or replaces source content.
 */
function SourceBookSceneArtwork({ phraseCount = 2 }) {
  const accent = phraseCount > 8 ? '#588157' : '#753cf2'
  return (
    <svg className="greetings-scene-artwork source-book-scene-artwork" viewBox="0 0 760 390" role="img" aria-label="表現を場面で確認するイラスト">
      <rect width="760" height="390" fill="#fff" />
      <path d="M0 314 Q190 280 380 314 T760 314 V390 H0Z" fill="#f3f7f2" />
      <rect x="256" y="72" width="248" height="140" rx="10" fill="#f7faf6" stroke="#d4e4cf" strokeWidth="4" />
      <path d="M288 112 H470 M288 145 H430 M288 178 H454" stroke="#b4c7ae" strokeLinecap="round" strokeWidth="10" />
      <circle cx="323" cy="247" r="17" fill={accent} />
      <circle cx="438" cy="247" r="17" fill="#5e7c8b" />
      <path d="M323 266 V313 M438 266 V313" stroke={accent} strokeLinecap="round" strokeWidth="9" />
      <path d="M307 279 L282 307 M339 279 L363 307 M422 279 L398 307 M454 279 L479 307" stroke={accent} strokeLinecap="round" strokeWidth="8" />
      <path d="M342 262 Q380 229 418 262" fill="none" stroke="#d39b46" strokeDasharray="7 8" strokeLinecap="round" strokeWidth="5" />
      <circle cx="380" cy="242" r="7" fill="#d39b46" />
      <g transform="translate(120 292)"><circle r="30" fill="#dce8d8" /><path d="M-12-3 Q0-17 12-3 V15 H-12Z" fill="#588157" /><circle cy="-19" r="8" fill="#588157" /></g>
      <g transform="translate(640 292)"><circle r="30" fill="#e7edf2" /><path d="M-12-3 Q0-17 12-3 V15 H-12Z" fill="#5e7c8b" /><circle cy="-19" r="8" fill="#5e7c8b" /></g>
    </svg>
  )
}

function SourceBookDetailDialog({ item, status, onStatus, onClose, onPlay, isPlaying, PlayIcon }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === '1') onStatus('difficult')
      if (event.key === '2') onStatus('learning')
      if (event.key === '3') onStatus('known')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onStatus])
  return (
    <div className="greetings-detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="greetings-detail-dialog source-book-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="source-book-detail-title">
        <button type="button" className="greetings-detail-close" onClick={onClose} aria-label="閉じる">×</button>
        <div className="source-book-detail-artwork"><SourceBookSceneArtwork phraseCount={String(item.phrase || '').length} /></div>
        <span className="section-kicker">原書の語句 · Source phrase</span>
        <h2 id="source-book-detail-title" lang="en">{item.phrase}</h2>
        <p className="greetings-detail-meaning" lang="ja">{item.meaning}</p>
        <p className="greetings-detail-context" lang="ja">使う場面：{item.context || '原書の表現'}</p>
        <button type="button" className={`greetings-detail-listen ${isPlaying ? 'is-playing' : ''}`} onClick={onPlay}><PlayGlyph PlayIcon={PlayIcon} /> {isPlaying ? '停止する' : '英語を聞く'}</button>
        <div className="greetings-classify-block">
          <div><span className="section-kicker">How well do you know this?</span><h3>この表現を整理する</h3></div>
          <div className="greetings-classify-options">
            {CLASSIFY_ORDER.map((value, index) => <button key={value} type="button" className={`status-${value}`} aria-pressed={status === value} onClick={() => onStatus(value)}><b>{index + 1}</b><span>{STATUS_META[value].ja}<small>{STATUS_META[value].en}</small></span></button>)}
          </div>
          {status !== 'unsorted' && <button type="button" className="greetings-reset-status" onClick={() => onStatus('unsorted')}>未整理に戻す</button>}
          <p>キーボードでは 1・2・3 でも選べます。</p>
        </div>
      </section>
    </div>
  )
}

function SourceBookPhraseRow({ item, selected, isPlaying, onClick }) {
  return (
    <button type="button" className={`greetings-vocabulary-more-item ${selected ? 'is-selected' : ''}`} onClick={onClick} aria-label={`${item.phrase}（${item.meaning}）を聞く`}>
      <span><strong lang="en">{item.phrase}</strong><small lang="ja">{item.meaning}</small></span>
      <span className={isPlaying ? 'is-playing' : ''}><SoundGlyph /></span>
    </button>
  )
}

function SourceBookInteractiveSection({ lesson, section, index, mastery, speech, PlayIcon }) {
  const phrases = useMemo(() => normalizeVocabularySection(lesson, section), [lesson, section])
  const sceneItems = phrases.slice(0, phrases.length <= 4 ? phrases.length : 3)
  const moreItems = phrases.slice(sceneItems.length)
  const [selectedItem, setSelectedItem] = useState(sceneItems[0] || moreItems[0] || null)
  const [detailOpen, setDetailOpen] = useState(false)
  useEffect(() => {
    if (!selectedItem || !phrases.some((item) => item.id === selectedItem.id)) setSelectedItem(sceneItems[0] || moreItems[0] || null)
  }, [moreItems, phrases, sceneItems, selectedItem])
  const playItem = useCallback((item) => {
    if (!item) return
    setSelectedItem(item)
    speech.play(item.id, [item.phrase], 0.9)
  }, [speech])
  const playAllId = `${section.id}:source-all`
  const sectionNumber = `${lesson.number}.${index + 1}`
  const allItems = [...sceneItems, ...moreItems]
  const heading = section.enTitle || 'Source phrases'
  return (
    <section id={section.id} className="greetings-vocabulary-section source-book-interactive-section" aria-labelledby={`${section.id}-heading`}>
      <div className="greetings-vocabulary-scene-panel">
        <header className="greetings-vocabulary-panel-header">
          <div><div className="greetings-vocabulary-panel-title"><span className="greetings-vocabulary-panel-number">{sectionNumber}</span><h2 id={`${section.id}-heading`}>{heading}</h2></div><p lang="ja">{section.title} · {section.intro}</p></div>
          <span className="greetings-vocabulary-tone-pill source-book-tone-pill">Source · 原書</span>
        </header>
        <div className="greetings-vocabulary-stage">
          <SourceBookSceneArtwork phraseCount={phrases.length} />
          <div className="greetings-scene-bubbles">
            {sceneItems.map((item, itemIndex) => <ScenePhraseBubble key={item.id} item={item} tone="informal" position={INFORMAL_BUBBLE_POSITIONS[itemIndex] || 'middle-center'} selected={selectedItem?.id === item.id} isPlaying={speech.playingId === item.id} onClick={() => playItem(item)} />)}
          </div>
          <button type="button" className={`greetings-vocabulary-stage-play ${speech.playingId === playAllId ? 'is-playing' : ''}`} onClick={() => speech.play(playAllId, allItems.map((item) => item.phrase), 0.88)} disabled={!allItems.length} aria-label={speech.playingId === playAllId ? 'このセクションを停止' : 'このセクションをすべて聞く'}>{speech.playingId === playAllId ? <span aria-hidden="true">■</span> : <SoundGlyph />}</button>
        </div>
        {selectedItem && <div className="greetings-vocabulary-selected" aria-live="polite"><div><span className="section-kicker">Selected phrase · 選択中の表現</span><strong lang="en">{selectedItem.phrase}</strong><p lang="ja">{selectedItem.meaning}</p><small lang="ja">使う場面：{selectedItem.context || '原書の表現'}</small></div><div className="greetings-vocabulary-selected-actions"><button type="button" className={speech.playingId === selectedItem.id ? 'is-playing' : ''} onClick={() => playItem(selectedItem)}><SoundGlyph /> {speech.playingId === selectedItem.id ? '停止' : '聞く'}</button><button type="button" onClick={() => setDetailOpen(true)}>詳細・整理</button></div></div>}
      </div>
      <aside className="greetings-vocabulary-more" aria-label={`${section.title}の追加表現`}>
        <header className="greetings-vocabulary-panel-header greetings-vocabulary-more-header"><div className="greetings-vocabulary-panel-title"><span className="greetings-vocabulary-panel-number">{sectionNumber}</span><h2>MORE PHRASES</h2></div><p lang="ja">{moreItems.length ? '追加表現 · 英語を押すと音声と意味を確認できます。' : 'このセクションの原書表現を確認できます。'}</p></header>
        <div className="greetings-vocabulary-more-list">{moreItems.length ? moreItems.map((item) => <SourceBookPhraseRow key={item.id} item={item} selected={selectedItem?.id === item.id} isPlaying={speech.playingId === item.id} onClick={() => playItem(item)} />) : <p className="source-book-more-empty" lang="ja">このセクションの表現は左のパネルに表示しています。</p>}</div>
      </aside>
      {detailOpen && selectedItem && <SourceBookDetailDialog item={selectedItem} status={mastery.statusFor(selectedItem.id)} onStatus={(status) => mastery.setStatus(selectedItem.id, status)} onClose={() => setDetailOpen(false)} onPlay={() => playItem(selectedItem)} isPlaying={speech.playingId === selectedItem.id} PlayIcon={PlayIcon} />}
    </section>
  )
}

export function SourceBookInteractiveLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const learn = lesson.learn || {}
  const sections = learn.sections || []
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const outline = useMemo(() => sections.map((section) => [section.id, section.title]), [sections])
  useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined
    const nodes = sections.map((section) => document.getElementById(section.id)).filter(Boolean)
    if (!nodes.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [sections])
  return (
    <div className="lesson-page greetings-page source-book-page greetings-interactive-page source-book-interactive-page">
      <LessonTitle eyebrow={`Social Fluency · ${lesson.number}`} title={lesson.title} ja={lesson.ja} />
      <div className="greetings-reader"><div className="greetings-reader-main">
        <section className="greetings-interactive-hero greetings-content-section source-book-intro"><div className="greetings-hero-copy"><span className="section-kicker">原書に沿って学ぶ · Source book</span><h2>{lesson.enTitle}</h2>{learn.intro?.map((paragraph) => <p key={paragraph} lang="ja">{paragraph}</p>)}</div><SourceBookSceneArtwork phraseCount={sections.reduce((total, section) => total + (section.phrases?.length || 0), 0)} /></section>
        {learn.functions?.length > 0 && <div className="greetings-signal-strip source-book-functions" aria-label="学習項目">{learn.functions.map(([number, label]) => <div key={number} className="greetings-signal-item"><span>{number}</span><strong>{label}</strong></div>)}</div>}
        {sections.map((section, index) => <SourceBookInteractiveSection key={section.id} lesson={lesson} section={section} index={index} mastery={mastery} speech={speech} PlayIcon={PlayIcon} />)}
        {learn.dialogues?.length > 0 && <section className="greetings-content-section source-book-dialogues"><div className="greetings-section-heading"><span className="section-kicker">Source dialogues</span><h2>原書の会話</h2><p>原書に掲載された会話を確認します。</p></div><div className="greetings-dialogue-grid">{learn.dialogues.map((dialogue) => <ConversationCard key={dialogue.id || dialogue.title} dialogue={dialogue} speech={speech} PlayIcon={PlayIcon} />)}</div></section>}
        {learn.tip && <section className="greetings-content-section source-book-tip source-book-good-to-know"><span className="section-kicker">Good to know · 原書のポイント</span><h2>学習メモ</h2><p lang="ja">{learn.tip}</p></section>}
      </div><ResponsiveOutline className="greetings-outline" ariaLabel="このページの項目">
        {outline.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setActiveSection(id)}>{label}</a>)}
      </ResponsiveOutline></div>
    </div>
  )
}

export function SourceBookInteractivePracticeView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  const mastery = useVocabularyMastery()
  const speech = useSpeechQueue(speakWithBrowser)
  const sections = lesson.learn?.sections || []
  const dialogues = lesson.learn?.dialogues || []
  const [track, setTrack] = useState('vocabulary')
  const [selectedSection, setSelectedSection] = useState(0)
  const active = sections[selectedSection] || sections[0]
  return (
    <div className="practice-page greetings-practice-page source-book-practice-page source-book-interactive-practice">
      <LessonTitle eyebrow={`Social Fluency Practice · ${lesson.number}`} title={lesson.practice?.title || lesson.title} ja={lesson.practice?.instructions} />
      <div className="greetings-practice-flow" aria-label="Practice flow"><div><b>01</b><span>Listen</span><small>まず聞く</small></div><i aria-hidden="true">→</i><div><b>02</b><span>Read</span><small>意味を確認する</small></div><i aria-hidden="true">→</i><div><b>03</b><span>Repeat</span><small>声に出す</small></div></div>
      {dialogues.length > 0 && <div className="greetings-track-switch" role="tablist" aria-label="練習内容"><button type="button" role="tab" aria-selected={track === 'vocabulary'} className={track === 'vocabulary' ? 'active' : ''} onClick={() => setTrack('vocabulary')}><span>語彙・フレーズ<small>Vocabulary</small></span></button><button type="button" role="tab" aria-selected={track === 'conversation'} className={track === 'conversation' ? 'active' : ''} onClick={() => setTrack('conversation')}><span>会話<small>Conversation</small></span></button></div>}
      {track === 'vocabulary' ? <section className="greetings-practice-section greetings-learning-panel"><div className="greetings-section-heading"><span className="section-kicker">Vocabulary mastery · 原書の語彙</span><h2>今、集中したい表現だけを見る。</h2><p>英語を聞き、日本語の意味を確認して、「難しい・学習中・覚えた」に整理できます。</p></div><div className="greetings-dialogue-tabs" role="tablist">{sections.map((section, index) => <button key={section.id} type="button" role="tab" aria-selected={selectedSection === index} className={selectedSection === index ? 'active' : ''} onClick={() => setSelectedSection(index)}>{section.title}</button>)}</div>{active && <VocabularyMasteryBoard lesson={lesson} section={active} mastery={mastery} speech={speech} PlayIcon={PlayIcon} artwork="source" />}</section> : <section className="greetings-practice-section greetings-conversation-section"><div className="greetings-section-heading"><span className="section-kicker">Conversation studio · 原書の会話</span><h2>全文・一行ずつ・役割練習。</h2><p>原書の会話を、日本語の意味を残して練習します。</p></div><ConversationPracticeStudio dialogues={dialogues} speech={speech} PlayIcon={PlayIcon} /></section>}
      {lesson.learn?.tip && <div className="greetings-finish-card source-book-good-to-know"><span className="section-kicker">Good to know · 原書のポイント</span><p lang="ja">{lesson.learn.tip}</p></div>}
    </div>
  )
}
