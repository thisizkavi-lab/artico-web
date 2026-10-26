import { useMemo, useState } from 'react'
import { useLanguage } from './Language'
import catalog from './vocabularyCatalog.json'
import japaneseAM from './vocabularyJapaneseAM.json'
import japaneseNZ from './vocabularyJapaneseNZ.json'
import overrides from './vocabularyJapaneseOverrides.json'
import './vocabulary.css'

const translations = { ...japaneseAM, ...japaneseNZ, ...overrides }
const normalizedTranslations = new Map(Object.entries(translations).map(([en, jp]) => [en.toLowerCase(), jp]))
const topics = catalog.topics

export function japaneseFor(word) {
  const direct = translations[word] ?? normalizedTranslations.get(word.toLowerCase())
  if (direct) return direct
  const normalized = word.trim().toLowerCase()
  if (/^[a-z-]+s$/.test(normalized)) {
    const singular = normalized.endsWith('ies') ? normalized.slice(0, -3) + 'y'
      : normalized.endsWith('ses') ? normalized.slice(0, -2) : normalized.slice(0, -1)
    return normalizedTranslations.get(singular) ?? null
  }
  return null
}
export function displayGloss(word) {
  const gloss = japaneseFor(word)
  if (!gloss) return ''
  // Retain dictionary headwords, omitting potentially outdated side notes.
  const simple = gloss.match(/^([^()（]{2,65})[\(（]/)?.[1]?.trim()
  return simple && /[ぁ-んァ-ン一-龯]/u.test(simple) ? simple : gloss
}

export default function Vocabulary() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const [topic, setTopic] = useState(0)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [limit, setLimit] = useState(120)
  const [showVariants, setShowVariants] = useState(false)
  const activeTopic = topics[topic]
  const searching = !!query.trim()
  const rows = useMemo(() => {
    const selected = searching ? topics : [activeTopic]
    const results = []
    const term = query.toLocaleLowerCase().trim()
    for (const section of selected) {
      for (const kind of ['core', 'extra']) {
        if (filter !== 'all' && filter !== kind) continue
        for (const en of section[kind]) {
          const translated = displayGloss(en)
          if (term && ![en, translated, section.topic, section.ja].some(value =>
            value.toLocaleLowerCase().includes(term))) continue
          results.push({ en, ja: translated, kind, section })
        }
      }
    }
    return results
  }, [query, topic, filter])
  const renderRows = rows.slice(0, limit)
  const selectTopic = value => { setTopic(Number(value)); setQuery(''); setLimit(120); setShowVariants(false) }
  const setSearch = value => { setQuery(value); setLimit(120); setShowVariants(false) }
  const changeFilter = value => { setFilter(value); setLimit(120) }
  return (
    <div className="aw-page vl-page">
      <a className="vl-back" href="#/courses?social">← {ja ? '学習コースへ' : 'Back to Learn'}</a>
      <header className="vl-heading">
        <p className="vl-eyebrow">CHAPTER 97 · VOCABULARY</p>
        <h1>{ja ? '英語の語彙' : 'Vocabulary'}</h1>
        <p>{ja ? 'アメリカ英語の単語と表現を、テーマ別に学びましょう。'
          : 'Everyday American English, organized by topic.'}</p>
        <small>{topics.length} {ja ? 'テーマ' : 'topics'} · {catalog.coreCount + catalog.extraCount} {ja ? '語句' : 'words and phrases'}</small>
      </header>
      <div className="vl-toolbar">
        <label className="vl-field vl-topic">
          <span>{ja ? 'テーマ' : 'Topic'}</span>
          <select value={topic} onChange={event => selectTopic(event.target.value)}>
            {topics.map((section, i) =>
              <option key={section.sourceLesson} value={i}>
                {String(i + 1).padStart(2, '0')} · {ja ? section.ja : section.topic}
              </option>)}
          </select>
        </label>
        <label className="vl-field vl-search">
          <span>{ja ? '語句を検索' : 'Find a word or phrase'}</span>
          <input type="search" value={query} onChange={event => setSearch(event.target.value)}
            placeholder={ja ? '英語・日本語で検索…' : 'Search English or Japanese…'} />
        </label>
      </div>
      <div className="vl-content-header">
        <div>
          <h2>{searching ? (ja ? '検索結果' : 'Search results') : (ja ? activeTopic.ja : activeTopic.topic)}</h2>
          <small>{searching ? (ja ? 'すべてのテーマから検索' : 'Across all topics')
            : (ja ? activeTopic.topic : activeTopic.ja)}</small>
        </div>
        <div className="vl-filters" role="group" aria-label={ja ? '種類で絞り込む' : 'Filter vocabulary type'}>
          {[['all', ja ? 'すべて' : 'All'], ['core', ja ? '基本' : 'Core'], ['extra', ja ? '追加' : 'Practical']].map(([id, label]) =>
            <button key={id} type="button" className={filter === id ? 'is-active' : ''}
              aria-pressed={filter === id} onClick={() => changeFilter(id)}>{label}</button>)}
        </div>
      </div>
      <div className="vl-table" role="list" aria-label={ja ? '英語と日本語の語彙' : 'English and Japanese vocabulary'}>
        <div className="vl-table-heading" aria-hidden="true">
          <span>ENGLISH</span><span>日本語</span>
        </div>
        {renderRows.map((item, i) => (
          <div className="vl-row" key={item.section.sourceLesson + '-' + item.kind + '-' + i} role="listitem">
            <div className="vl-english" lang="en">
              <strong>{item.en}</strong>
              {item.kind === 'extra' && <span className="vl-extra" title={ja ? '実用的な追加表現' : 'Practical addition'}>+</span>}
              {searching && <small>{ja ? item.section.ja : item.section.topic}</small>}
            </div>
            <div className="vl-japanese" lang="ja">
              {item.ja || <a href={'https://jisho.org/search/' + encodeURIComponent(item.en)}
                target="_blank" rel="noopener noreferrer" className="vl-unmatched"
                aria-label={(ja ? '辞書で意味を確認する: ' : 'Check in dictionary: ') + item.en}>
                {ja ? '辞書で確認 ↗' : 'Look up ↗'}
              </a>}
            </div>
          </div>
        ))}
        {!rows.length && <p className="vl-empty">{ja ? '一致する語句がありません。' : 'No matching words or phrases.'}</p>}
      </div>
      <div className="vl-after-list">
        <span>{rows.length} {ja ? '件' : 'entries'}
          {rows.length > limit ? ' · ' + limit + (ja ? '件表示' : ' shown') : ''}</span>
        {rows.length > limit && <button type="button" onClick={() => setLimit(n => n + 120)}>
          {ja ? 'さらに表示' : 'Show more'}</button>}
      </div>
      {!searching && activeTopic.variants.length > 0 && (
        <div className="vl-variants">
          <button type="button" aria-expanded={showVariants} onClick={() => setShowVariants(v => !v)}>
            {ja ? 'イギリス英語・別表現' : 'British English and other variants'} ({activeTopic.variants.length})
            <span aria-hidden="true">{showVariants ? ' −' : ' +'}</span>
          </button>
          {showVariants && <ul>{activeTopic.variants.map((variant, i) =>
            <li key={i}><strong>{variant.from}</strong>{variant.to ? ' → ' + variant.to : ''}
              {variant.note && <span> · {variant.note}</span>}</li>)}</ul>}
        </div>
      )}
      <footer className="vl-source">
        <p>{ja ? '訳語は参考用です。文脈によって意味が変わります。訳語が未確認の語句は辞書へのリンクを表示します。'
          : 'Japanese glosses are reference meanings. Context may change the translation. Unmatched phrases link to a dictionary.'}</p>
        <p>{ja ? '英語リスト: 提供された GA 版 · 日本語訳: ' : 'Vocabulary: supplied General American edition · Japanese glosses: '}
          <a href="https://github.com/kujirahand/EJDict" target="_blank" rel="noopener noreferrer">EJDict (CC0)</a>
          {ja ? ' および確認済みの訳語。' : ' and curated equivalents.'}</p>
      </footer>
      <nav className="vl-bottom-nav" aria-label={ja ? '学習ナビゲーション' : 'Learning navigation'}>
        <a href="#/lesson/96/study">← {ja ? '第96課' : 'Chapter 96'}</a>
        <a href="#/progress">{ja ? '進捗を見る' : 'My Progress'} →</a>
      </nav>
    </div>
  )
}
