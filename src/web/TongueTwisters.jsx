import { useRef, useState } from 'react'
import { useLanguage } from './Language'
import { TheoryAudioSample } from './FoundationContent'
import { twisterCards, twisterLevels, twisterAudioSource, twisterAudioClip, twisterAudioGroups } from './twisterCollection'

function AudioChoice({ text, active, disabled, onClick, listenLabel }) {
  return <button type="button" className="tt-audio-choice" aria-pressed={active} disabled={disabled} onClick={onClick} aria-label={listenLabel}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m11 5-6 4H2v6h3l6 4V5Z" /><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
    </svg>
    <span lang="en">{text}</span>
  </button>
}

// Carefully authored **keyword** emphasis, rendered as React text (never HTML injection).
function emphasizeReason(copy) {
  return copy.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  )
}

// Preserve the original teaching copy; highlight only the authored key expressions.
// Quoted expressions get separate background marks, not a different text color.
function highlightStudyReason(copy) {
  return copy.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
    if (!part.startsWith('**') || !part.endsWith('**')) return part
    const highlighted = part.slice(2, -2)
    const quotedParts = highlighted.split(/(“[^”]+”|「[^」]+」)/g)
    const hasQuotes = quotedParts.some((piece) => piece.startsWith('“') || piece.startsWith('「'))
    if (!hasQuotes) return <mark className="tt-reader-mark" key={index}>{highlighted}</mark>
    return <span key={index}>{quotedParts.map((piece, pieceIndex) =>
      piece.startsWith('“') || piece.startsWith('「')
        ? <mark className="tt-reader-mark" key={pieceIndex}>{piece}</mark>
        : piece
    )}</span>
  })
}

// A readable, actual tongue twister serves as the title, not an arbitrary nickname.
// Long rhymes use their opening line; long one-line twisters use the first clause.
function twisterHeading(phrase) {
  const firstLine = phrase.trim().split('\n')[0].trim()
  if (firstLine.length <= 76) return firstLine
  const comma = firstLine.indexOf(',')
  if (comma > 18 && comma <= 76) return firstLine.slice(0, comma + 1)
  const words = firstLine.slice(0, 76)
  return words.replace(/\s+\S*$/, '') + '…'
}

export function TongueTwisterStudy() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  return (
    <div className="tt-study">
      <section className="tt-intro" id="tt-intro">
        <img className="tt-hero-art" src={`${import.meta.env.BASE_URL}assets/illustrations/tongue-twister-warmup.svg`} alt={ja ? '早口言葉を練習している人のイラスト' : 'A playful tongue-twister illustration'} />
        <div className="tt-copy">
          {ja ? <>
            <p>英語を話すとき、似た音が続くと急に言いにくくなることはありませんか？ たとえば <strong>right</strong> と <strong>light</strong>、<strong>three</strong> と <strong>free</strong>。一つずつなら言えても、続けると口がもつれることがあります。</p>
            <p><strong>早口言葉（tongue twister）</strong>は、そんな言いにくい音をわざと並べた、ちょっとおかしな文です。いわば、話すための小さなウォームアップ。俳優や歌手、英語を学ぶ人も、はっきり話す練習に使います。</p>
            <p><strong>大切なのは速さではなく、はっきり言うこと。</strong> ゆっくり言って、どこでつまずくかを知り、もう一度試す。その繰り返しで、苦手な音のつなぎ方に少しずつ慣れていきます。そして、普段の会話でも試してみましょう。</p>
            <p>全部覚える必要はありません。Articoではいろいろな言いにくさを試せる <strong>24の早口言葉</strong>を選びました。ここでは全文を聞いてみましょう。短く分ける練習は <strong>Practice</strong> で。</p>
          </> : <>
            <p>Ever find that English words become harder to say when similar sounds come one after another? Think of <strong>right</strong> and <strong>light</strong>, or <strong>three</strong> and <strong>free</strong>. They may be easy alone but tricky together.</p>
            <p>A <strong>tongue twister</strong> is a playful line that puts difficult sounds close together. Think of it as a little warm-up for speaking. Actors, singers and language learners use them to practice speaking clearly.</p>
            <p><strong>The goal isn't speed. It's clarity.</strong> Start slowly, notice where you get stuck, and try again. Then see if you can use those sounds in everyday speech, too.</p>
            <p>You don't need to memorize every tongue twister. We've chosen <strong>24 classics</strong> with different challenges. Listen to each complete one here; in <strong>Practice</strong>, you'll build it piece by piece.</p>
          </>}
        </div>
      </section>
      <section className="tt-library" id="tt-collection">
        <h2>{ja ? '早口言葉' : 'Tongue Twisters'}</h2>
        {twisterLevels.map(level => (
          <section className="tt-level" key={level.number}>
            <header className="tt-level-heading">
              <span>LEVEL {level.number}</span>
              <h3>{ja ? level.ja : level.en}</h3>
            </header>
            <div className="tt-reader-list">
              {twisterCards.filter(item => item.level === level.number).map(item => (
                <article key={item.id} className={`tt-reader-entry${item.phrase.length > 165 ? ' tt-reader-long' : ''}`}>
                  <div className="tt-reader-entry-meta">
                    <span className="tt-reader-number">{item.number}</span>
                    <span className="tt-reader-rule" aria-hidden="true" />
                    <span className="tt-reader-target" lang="en">{item.target}</span>
                  </div>
                  <h4 className="tt-reader-phrase" lang="en">{item.phrase}</h4>
                  <TheoryAudioSample phrase={item.phrase} target={item.title} src={twisterAudioSource(item)} readerControls preload="none" />
                  <aside className="tt-reader-notice" aria-label={ja ? '発音のヒント' : 'Pronunciation note'}>
                    <div className="tt-reader-notice-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 18h6M10 21h4M9 14c-1.8-1.2-3-3.1-3-5a6 6 0 0 1 12 0c0 1.9-1.2 3.8-3 5-.7.5-1 1.3-1 2h-4c0-.7-.3-1.5-1-2Z" />
                      </svg>
                      <span>{ja ? 'ここに注目' : 'Notice'}</span>
                    </div>
                    <p>{highlightStudyReason(ja ? item.whyJa : item.whyEn)}</p>
                  </aside>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  )
}

export function TongueTwisterPractice({ initialId }) {
  const { language, t } = useLanguage()
  const ja = language === 'ja'
  const [index, setIndex] = useState(Math.max(0, twisterCards.findIndex(card => card.id === initialId)))
  const [chunkIndex, setChunkIndex] = useState(0)
  const [delivery, setDelivery] = useState('careful')
  const [extraSelection, setExtraSelection] = useState(null)
  const [playRequest, setPlayRequest] = useState(0)
  const requestSequence = useRef(0)
  const item = twisterCards[index]
  const chunk = item.buildSteps[chunkIndex] || item.phrase
  const selection = extraSelection ?? { kind: 'practice', step: chunkIndex, delivery }
  const clip = twisterAudioClip(item, selection)
  const groups = twisterAudioGroups(item)
  const currentText = clip?.text ?? chunk
  const finalStep = chunkIndex === item.buildSteps.length - 1
  const selectionKey = `${item.id}:${selection.kind}:${selection.index ?? chunkIndex}:${selection.delivery ?? ''}`

  const selectStep = (step) => {
    setChunkIndex(step)
    setDelivery('careful')
    setExtraSelection(null)
    setPlayRequest(0)
  }

  const playExtra = (kind, extraIndex) => {
    setExtraSelection({ kind, index: extraIndex })
    setPlayRequest(++requestSequence.current)
  }

  // Two independent layers of navigation: chunks inside the current twister,
  // and full tongue twisters in the collection.
  const changeTwister = (delta) => {
    setIndex(current => Math.max(0, Math.min(twisterCards.length - 1, current + delta)))
    setChunkIndex(0)
    setDelivery('careful')
    setExtraSelection(null)
    setPlayRequest(0)
  }

  return (
    <section className="rf-practice tt-practice tt-practice-gallery">
      <nav className="tt-practice-topline" aria-label={ja ? '早口言葉の切り替え' : 'Browse tongue twisters'}>
        <button type="button" className="tt-top-previous" disabled={index === 0}
          onClick={() => changeTwister(-1)}>
          <span aria-hidden="true">←</span> <span>{ja ? '前へ' : 'Previous'}</span>
        </button>
        <span className="tt-collection-count" aria-label={ja ? `${twisterCards.length}個中${index + 1}個目` : `${index + 1} of ${twisterCards.length}`}>
          {index + 1} <span aria-hidden="true">/</span> {twisterCards.length}
        </span>
        <button type="button" className="tt-top-next" disabled={index === twisterCards.length - 1}
          onClick={() => changeTwister(1)}>
          <span>{ja ? '次へ' : 'Next'}</span> <span aria-hidden="true">→</span>
        </button>
      </nav>

      <div className="tt-practice-center" key={item.id}>
        <h2 className={`tt-practice-name${twisterHeading(item.phrase).length > 65 ? ' tt-title-long' : ''}`} lang="en">
          {twisterHeading(item.phrase)}
        </h2>
        <img
          className="tt-practice-illustration"
          src={`${import.meta.env.BASE_URL}assets/illustrations/twisters/${item.id}.png`}
          alt={ja ? item.meaningJa : `Illustration of ${item.title}`}
          loading="eager"
        />
        <div className="tt-chunk-steps" role="group" aria-label={ja ? '練習の進み具合' : 'Practice steps'}>
          {item.buildSteps.map((_, step) => (
            <button
              type="button"
              key={step}
              className={step <= chunkIndex ? 'is-complete' : ''}
              aria-current={step === chunkIndex ? 'step' : undefined}
              aria-label={ja ? `部分${step + 1} / ${item.buildSteps.length}` : `Part ${step + 1} of ${item.buildSteps.length}`}
              title={ja ? `部分${step + 1}` : `Part ${step + 1}`}
              onClick={() => selectStep(step)}
            />
          ))}
        </div>
        <div className="tt-chunk-current" aria-live="polite">
          {extraSelection && <span className="tt-current-kind">{extraSelection.kind === 'focus'
            ? (ja ? '単語・短いフレーズ' : 'Focus word or phrase')
            : (ja ? '日常のフレーズ' : 'Everyday example')}</span>}
          <p className={currentText.length > 160 ? 'tt-chunk-long' : undefined} lang="en">{currentText}</p>
        </div>
        {extraSelection ? <button type="button" className="tt-return-step" onClick={() => {
          setExtraSelection(null)
          setPlayRequest(0)
        }}>{ja ? '部分の練習に戻る' : 'Back to practice step'}</button> : finalStep && (
          <div className="tt-delivery-choices" role="group" aria-label={ja ? '全文の読み方' : 'Full recording delivery'}>
            {['careful', 'natural'].map(value => <button type="button" key={value} aria-pressed={delivery === value} onClick={() => {
              setDelivery(value)
              setPlayRequest(0)
            }}>{value === 'careful' ? (ja ? 'ゆっくり' : 'Careful') : (ja ? '自然な速さ' : 'Natural')}</button>)}
          </div>
        )}
        <TheoryAudioSample
          key={item.id}
          phrase={currentText}
          target={item.target}
          src={clip?.src ?? null}
          selectionKey={selectionKey}
          playRequest={playRequest}
          compact
          navigation={{
            previousDisabled: chunkIndex === 0,
            onPrevious: () => selectStep(Math.max(0, chunkIndex - 1)),
            onNext: () => selectStep((chunkIndex + 1) % item.buildSteps.length),
            nextLabel: chunkIndex === item.buildSteps.length - 1 ? (ja ? '最初から' : 'Start again') : (ja ? '次の部分' : 'Next chunk'),
            labelType: 'chunk'
          }}
        />
      </div>

      <aside className="tt-practice-idea" aria-label={ja ? '発音のヒント' : 'Pronunciation tip'}>
        <span className="tt-idea-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 21h4M9 14c-1.8-1.2-3-3.1-3-5a6 6 0 0 1 12 0c0 1.9-1.2 3.8-3 5-.7.5-1 1.3-1 2h-4c0-.7-.3-1.5-1-2Z" />
          </svg>
        </span>
        <p>{emphasizeReason(ja ? item.whyJa : item.whyEn)}</p>
      </aside>
      <div className="tt-extra-audio">
        <section aria-labelledby="tt-focus-title">
          <h3 id="tt-focus-title">{ja ? '単語・短いフレーズから練習' : 'Practice the words and short phrases'}</h3>
          <div className="tt-audio-choices">
            {groups.focusUnits.map((unit, extraIndex) => <AudioChoice
              key={unit.assetId} text={unit.text}
              active={extraSelection?.kind === 'focus' && extraSelection.index === extraIndex}
              disabled={!twisterAudioClip(item, { kind: 'focus', index: extraIndex })}
              listenLabel={t('Listen to: {phrase}', { phrase: unit.text })}
              onClick={() => playExtra('focus', extraIndex)}
            />)}
          </div>
        </section>
        <section aria-labelledby="tt-transfer-title">
          <h3 id="tt-transfer-title">{ja ? '日常のフレーズで試そう' : 'Try the sounds in everyday phrases'}</h3>
          <div className="tt-audio-choices tt-transfer-choices">
            {groups.transfer.map((unit, extraIndex) => <AudioChoice
              key={unit.assetId} text={unit.text}
              active={extraSelection?.kind === 'transfer' && extraSelection.index === extraIndex}
              disabled={!twisterAudioClip(item, { kind: 'transfer', index: extraIndex })}
              listenLabel={t('Listen to: {phrase}', { phrase: unit.text })}
              onClick={() => playExtra('transfer', extraIndex)}
            />)}
          </div>
        </section>
      </div>
    </section>
  )
}
