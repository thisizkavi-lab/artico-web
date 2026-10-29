import { useState } from 'react'
import { useLanguage } from './Language'
import { TheoryAudioSample } from './FoundationContent'
import { Glyph } from './LessonExperience'
import { twisterCards, twisterLevels, twisterAudioSource } from './twisterCollection'

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
                    {twisterAudioSource(item) && (
                      <TheoryAudioSample phrase={item.phrase} target={item.title} src={twisterAudioSource(item)} compact />
                    )}
                    <p className="tt-why">{ja ? item.whyJa : item.whyEn}</p>
                  </div>
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
  const [id, setId] = useState(initialId || twisterCards[0].id)
  const [step, setStep] = useState(0)
  const item = twisterCards.find(card => card.id === id) || twisterCards[0]
  const phrase = item.buildSteps[step] ?? item.phrase
  const whole = step === item.buildSteps.length - 1
  const src = twisterAudioSource(item, step)
  return (
    <section className="rf-practice tt-practice">
      <p className="ip-kicker">ONE MOVEMENT AT A TIME</p>
      <h2>{ja ? '短く分けて、少しずつつなげよう。' : 'Build a clear phrase.'}</h2>
      <p className="ip-prose">{ja ? '聞いて、言って、次を足してみましょう。速さよりも、はっきり言うことが大切です。' : 'Listen, say one short part, then add the next when it feels clear.'}</p>
      <label className="rf-select">
        {ja ? '早口言葉を選ぶ' : 'Choose a tongue twister'}
        <select value={id} onChange={event => { setId(event.target.value); setStep(0) }}>
          {twisterCards.map(card => <option key={card.id} value={card.id}>{card.number} · {card.title}</option>)}
        </select>
      </label>
      <div className="rf-focus">
        <span className="ip-register">{item.target} · {step + 1} / {item.buildSteps.length}</span>
        <h3 lang="en">{phrase}</h3>
        {ja && <p className="tt-practice-meaning">{item.meaningJa}</p>}
        <p>{ja ? item.tipJa : item.tipEn}</p>
        {src && <TheoryAudioSample key={`${id}-${step}`} phrase={phrase} target={item.target} src={src} compact />}
      </div>
      <div className="ip-session-nav">
        <button className="ip-secondary" type="button" disabled={step === 0} onClick={() => setStep(n => n - 1)}>
          <Glyph name="back" /> {ja ? '前に戻る' : 'Previous chunk'}
        </button>
        <button className="ip-primary" type="button" onClick={() => setStep(n => (n + 1) % item.buildSteps.length)}>
          {whole ? (ja ? '最初から' : 'Start again') : (ja ? '次を足す' : 'Add the next part')} <Glyph name="arrow" />
        </button>
      </div>
      <aside className="ip-note">
        <strong>{ja ? '今度は普段の英語で試してみよう。' : 'Now, try an everyday phrase.'}</strong>
        <p>{item.transfer.join(' / ')}</p>
        <p>{ja ? '速さより、はっきり言うことを大切に。' : 'Keep the same movement. Clarity comes before speed.'}</p>
      </aside>
    </section>
  )
}
