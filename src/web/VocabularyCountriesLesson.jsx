import { useState } from 'react'
import { countries, placePhrases, placeWords, regions } from './vocabularyLesson01'
import { toNationalityReviewContent, toVocabularyReviewContent } from './vocabularyReview'
import { ReviewToggle, useReviewCollection } from './ReviewToggle'

const asset = (path) => `${import.meta.env.BASE_URL}assets/vocabulary/${path}`

function CountryCard({ item, revealed, onToggle, japanese, collection }) {
  const description = revealed
    ? (japanese ? `${item.nationality}、${item.nationalityJa}。タップして隠す` : `${item.nationality}. Click to hide`)
    : (japanese ? '国籍の言い方を表示' : 'Show nationality')

  return (
    <li className="vl01-card-item">
      <button className="vl01-country-card" type="button" onClick={onToggle}
        aria-expanded={revealed} aria-controls={`vl01-nationality-${item.code}`}
        aria-label={`${item.country}、${item.ja}。${description}`}>
        <span className="vl01-card-top">
          <img className="vl01-flag" src={asset(`flags/${item.code}.svg`)} alt="" loading="lazy" />
          <span className="vl01-country-name">
            <strong lang="en">{item.country}</strong>
            <small lang="ja">{item.ja}</small>
          </span>
        </span>
        <span className="vl01-card-bottom">
          <span className="vl01-card-label">NATIONALITY <span lang="ja">· 国籍</span></span>
          <span id={`vl01-nationality-${item.code}`} className="vl01-nationality" hidden={!revealed}>
            <strong lang="en">{item.nationality}</strong>
            <small lang="ja">{item.nationalityJa}</small>
          </span>
          {!revealed && <span className="vl01-reveal">{japanese ? 'タップして確認' : 'Tap to reveal'} <span aria-hidden="true">↗</span></span>}
        </span>
      </button>
      <div className="ar-country-action"><ReviewToggle content={toNationalityReviewContent(item)} collection={collection} japanese={japanese} /></div>
    </li>
  )
}

export default function VocabularyCountriesLesson({ japanese }) {
  const collection = useReviewCollection()
  const [region, setRegion] = useState('all')
  const [hiddenCountries, setHiddenCountries] = useState(() => new Set())
  const visible = region === 'all' ? countries : countries.filter((item) => item.regions.includes(region))
  const someHidden = hiddenCountries.size > 0

  function toggleCountry(code) {
    setHiddenCountries((current) => {
      const next = new Set(current)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  function toggleAll() {
    setHiddenCountries(someHidden ? new Set() : new Set(countries.map((item) => item.code)))
  }

  return (
    <div className="vl01-lesson">
      <section className="vl01-hero" aria-labelledby="vl01-hero-title">
        <div className="vl01-hero-copy">
          <p className="vl01-kicker">EXPLORE THE WORLD <span aria-hidden="true">✦</span></p>
          <h2 id="vl01-hero-title">{japanese ? '世界の国々を、ことばで旅しよう。' : 'Explore the world, one word at a time.'}</h2>
          <p>{japanese
            ? '国の名前と、その国の人を表す言い方を、国旗と一緒に学びましょう。'
            : 'Learn country names and the words for people from those countries, alongside their flags.'}</p>
          <div className="vl01-hero-meta"><strong>{countries.length}</strong> {japanese ? 'の国と国籍' : 'countries and nationalities'} <span aria-hidden="true">•</span> {japanese ? '地域別に探せます' : 'explore by region'}</div>
        </div>
        <div className="vl01-map" aria-hidden="true">
          <img src={asset('world-land.svg')} alt="" />
          <span className="vl01-map-label vl01-map-americas">AMERICAS</span>
          <span className="vl01-map-label vl01-map-europe">EUROPE</span>
          <span className="vl01-map-label vl01-map-africa">AFRICA</span>
          <span className="vl01-map-label vl01-map-asia">ASIA</span>
          <span className="vl01-map-label vl01-map-oceania">OCEANIA</span>
        </div>
      </section>

      <aside className="vl01-note" aria-label={japanese ? '学習のポイント' : 'Learning note'}>
        <span className="vl01-note-icon" aria-hidden="true">✦</span>
        <div>
          <strong>{japanese ? '国名と国籍の言い方' : 'Country and nationality'}</strong>
          <p>{japanese
            ? '国名と、その国の人を表す語は異なることがあります。国籍・民族・言語は、必ずしも同じではありません。'
            : 'A country name and the word for a person from that country can differ. Nationality, ethnicity, and language are not always the same.'}</p>
        </div>
        <div className="vl01-note-example"><span>COUNTRY <span aria-hidden="true">→</span> NATIONALITY</span><strong>Japan <span aria-hidden="true">→</span> Japanese</strong><small lang="ja">日本 → 日本人</small></div>
      </aside>

      {collection.error && <p role="alert" className="ar-collection-error">{collection.error}</p>}
      <section className="vl01-countries" aria-labelledby="vl01-countries-heading">
        <div className="vl01-section-heading">
          <div>
            <p className="vl01-kicker">01 · COUNTRIES &amp; NATIONALITIES</p>
            <h2 id="vl01-countries-heading">{japanese ? '国と国籍' : 'Countries & nationalities'}</h2>
            <p>{japanese ? 'カードをタップして、国籍の言い方を隠したり、確認したりできます。' : 'Select a card to hide or reveal the nationality.'}</p>
          </div>
          <button type="button" className="vl01-hide-button" onClick={toggleAll}>
            {someHidden ? (japanese ? 'すべて表示' : 'Show all') : (japanese ? '国籍をすべて隠す' : 'Hide nationalities')}
          </button>
        </div>
        <div className="vl01-filters" role="group" aria-label={japanese ? '地域で絞り込む' : 'Filter by region'}>
          {regions.map((option) => (
            <button type="button" key={option.id} aria-pressed={region === option.id}
              onClick={() => setRegion(option.id)}>{japanese ? option.ja : option.en}</button>
          ))}
        </div>
        <p className="vl01-results" role="status" aria-live="polite">
          {japanese ? `${visible.length}か国を表示` : `Showing ${visible.length} ${visible.length === 1 ? 'country' : 'countries'}`}
        </p>
        <ul className="vl01-cards">
          {visible.map((item) => <CountryCard key={item.code} item={item} revealed={!hiddenCountries.has(item.code)}
            onToggle={() => toggleCountry(item.code)} japanese={japanese} collection={collection} />)}
        </ul>
        <p className="vl01-region-note">{japanese
          ? 'ロシアとトルコは、ヨーロッパとアジアの両方に表示されます。'
          : 'Russia and Turkey appear in both Europe and Asia.'}</p>
      </section>

      <section className="vl01-words" aria-labelledby="vl01-words-heading">
        <div className="vl01-section-heading">
          <div>
            <p className="vl01-kicker">02 · TALKING ABOUT WHERE YOU ARE FROM</p>
            <h2 id="vl01-words-heading">{japanese ? '出身地について話す' : 'Talking about where you are from'}</h2>
            <p>{japanese ? '場所や出身を伝えるときに使う言葉です。' : 'Words and phrases for talking about places and where you are from.'}</p>
          </div>
        </div>
        <dl className="vl01-word-grid">
          {placeWords.map((word) => <div key={word.en}><dt lang="en">{word.en}</dt><dd lang="ja">{word.ja}</dd><ReviewToggle content={toVocabularyReviewContent(word.en,1,word.ja)} collection={collection} japanese={japanese} /></div>)}
        </dl>
        <div className="vl01-phrase-grid">
          {placePhrases.map((phrase) => <div key={phrase.en}><strong lang="en">{phrase.en}</strong><p lang="ja">{phrase.ja}</p><ReviewToggle content={toVocabularyReviewContent(phrase.en,1,phrase.ja)} collection={collection} japanese={japanese} /></div>)}
        </div>
      </section>
    </div>
  )
}
