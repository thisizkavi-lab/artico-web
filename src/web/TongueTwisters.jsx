import { useState } from 'react'
import { useLanguage } from './Language'
import { TheoryAudioSample } from './FoundationContent'
import { twisterCards, twisterLevels, twisterAudioSource } from './twisterCollection'

// Carefully authored **keyword** emphasis, rendered as React text (never HTML injection).
function emphasizeReason(copy) {
  return copy.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  )
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
        <h2>{ja ? '早口言葉を聞いてみよう' : 'Explore the tongue twisters'}</h2>
        <p>{ja ? '気になるものから聞いてみましょう。' : 'Pick one and listen.'}</p>
        {twisterLevels.map(level => (
          <section className="tt-level" key={level.number}>
            <header className="tt-level-heading"><span>LEVEL {level.number}</span><h3>{ja ? level.ja : level.en}</h3></header>
            <div className="tt-card-grid">
              {twisterCards.filter(item => item.level === level.number).map(item => (
                <article key={item.id} className={`tt-study-item${item.phrase.length > 165 ? ' tt-long' : ''}`}>
                  <header className="tt-card-label"><span>{item.number}</span><h4>{item.title}</h4></header>
                  <div className="tt-study-card">
                    <p className="tt-verse" lang="en">{item.phrase}</p>
                    <TheoryAudioSample phrase={item.phrase} target={item.title} src={twisterAudioSource(item)} compact />
                  </div>
                  <p className="tt-why">{emphasizeReason(ja ? item.whyJa : item.whyEn)}</p>
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
  const { language } = useLanguage()
  const ja = language === 'ja'
  const [index, setIndex] = useState(Math.max(0, twisterCards.findIndex(card => card.id === initialId)))
  const [chunkIndex, setChunkIndex] = useState(0)
  const item = twisterCards[index]
  const chunk = item.buildSteps[chunkIndex] || item.phrase

  // Two independent layers of navigation: chunks inside the current twister,
  // and full tongue twisters in the collection.
  const changeTwister = (delta) => {
    setIndex(current => Math.max(0, Math.min(twisterCards.length - 1, current + delta)))
    setChunkIndex(0)
  }

  return (
    <section className="rf-practice tt-practice tt-practice-gallery">
      <div className="tt-practice-topline">
        <span>{ja ? 'レベル' : 'Level'} {item.level} · {index + 1} / {twisterCards.length}</span>
        <span>{ja ? '早口言葉' : 'Tongue Twisters'}</span>
      </div>

      <div className="tt-practice-center">
        <h2 className="tt-practice-name">{item.title}</h2>
        <img
          key={item.id}
          className="tt-practice-illustration"
          src={`${import.meta.env.BASE_URL}assets/illustrations/twisters/${item.id}.png`}
          alt={ja ? item.meaningJa : `Illustration of ${item.title}`}
          loading="eager"
        />
        <p className={`tt-practice-verse${item.phrase.length > 165 ? ' tt-verse-long' : ''}`} lang="en">{item.phrase}</p>

        <div className="tt-chunk-current" aria-live="polite">
          <span>{ja ? '練習する部分' : 'Practice this part'} · {chunkIndex + 1} / {item.buildSteps.length}</span>
          <p lang="en">{chunk}</p>
        </div>
        <TheoryAudioSample
          key={item.id}
          phrase={chunk}
          target={item.target}
          src={twisterAudioSource(item, chunkIndex)}
          compact
          navigation={{
            previousDisabled: chunkIndex === 0,
            onPrevious: () => setChunkIndex(n => Math.max(0, n - 1)),
            onNext: () => setChunkIndex(n => (n + 1) % item.buildSteps.length),
            nextLabel: chunkIndex === item.buildSteps.length - 1 ? (ja ? '最初から' : 'Start again') : (ja ? '次の部分' : 'Next chunk'),
            labelType: 'chunk'
          }}
        />
      </div>

      <nav className="tt-twister-switcher" aria-label={ja ? '早口言葉を切り替える' : 'Browse tongue twisters'}>
        <button type="button" className="tt-switcher-prev" disabled={index === 0}
          onClick={() => changeTwister(-1)}>
          <span aria-hidden="true">←</span> {ja ? '前の早口言葉' : 'Previous tongue twister'}
        </button>
        <button type="button" className="tt-switcher-next" disabled={index === twisterCards.length - 1}
          onClick={() => changeTwister(1)}>
          {ja ? '次の早口言葉' : 'Next tongue twister'} <span aria-hidden="true">→</span>
        </button>
      </nav>
      <p className="tt-practice-soundnote">{emphasizeReason(ja ? item.whyJa : item.whyEn)}</p>
    </section>
  )
}
