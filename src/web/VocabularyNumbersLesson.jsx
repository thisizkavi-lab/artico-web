import { useMemo, useState } from 'react'
import { numberGroups, numberLessonNotes } from './vocabularyLesson02'
import { toVocabularyReviewContent } from './vocabularyReview'
import { ReviewToggle, useReviewCollection } from './ReviewToggle'

function NumberCard({ item, groupId, japanese, practice, revealed, onReveal }) {
  const titleId = `vl02-${groupId}-${item.cue.replace(/[^a-zA-Z0-9]/g, '-')}`
  const englishHidden = practice && !revealed
  const content = (
    <>
      <span className="vl02-card-cue" aria-hidden="true">{item.cue}</span>
      <span className="vl02-card-copy">
        <span className="vl02-card-overline">{japanese ? 'EN · 英語' : 'ENGLISH'}</span>
        <strong id={titleId} className="vl02-card-term" lang="en" hidden={englishHidden}>{item.term}</strong>
        {englishHidden && <span className="vl02-card-prompt">{japanese ? 'タップして答えを確認' : 'Tap to reveal the English'}</span>}
        <span className="vl02-card-meaning" lang="ja">{item.ja}</span>
      </span>
      {practice && <span className="vl02-card-action" aria-hidden="true">{revealed ? '✓' : '↗'}</span>}
    </>
  )

  return practice ? (
    <button className={`vl02-term-card vl02-practice-card${revealed ? ' is-revealed' : ''}`} type="button"
      onClick={onReveal} aria-expanded={revealed}
      aria-controls={titleId}
      aria-label={revealed
        ? `${item.ja}: ${item.term}. ${japanese ? 'タップして答えを隠す' : 'Tap to hide the answer'}`
        : `${item.ja}. ${japanese ? 'タップして英語の答えを表示' : 'Tap to reveal the English answer'}`}>
      {content}
    </button>
  ) : (
    <article className="vl02-term-card">
      {content}
    </article>
  )
}

function LessonNote({ note, japanese, label }) {
  if (!note) return null
  return (
    <aside className="vl02-note">
      <span className="vl02-note-mark" aria-hidden="true">i</span>
      <div>
        <strong>{label}</strong>
        <p>{japanese ? note.ja : note.en}</p>
      </div>
    </aside>
  )
}

export default function VocabularyNumbersLesson({ japanese }) {
  const collection = useReviewCollection()
  const [activeGroup, setActiveGroup] = useState('all')
  const [practice, setPractice] = useState(false)
  const [revealed, setRevealed] = useState(() => new Set())
  const visibleGroups = useMemo(
    () => activeGroup === 'all' ? numberGroups : numberGroups.filter((group) => group.id === activeGroup),
    [activeGroup],
  )
  const totalItems = numberGroups.reduce((total, group) => total + group.items.length, 0)

  function togglePractice() {
    setPractice((enabled) => !enabled)
    setRevealed(new Set())
  }

  function revealTerm(id) {
    setRevealed((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="vl02-lesson">
      <section className="vl02-hero" aria-labelledby="vl02-hero-title">
        <div className="vl02-hero-copy">
          <p className="vl01-kicker">NUMBER SENSE <span aria-hidden="true">✦</span></p>
          <h2 id="vl02-hero-title">{japanese ? '数字を、日常で使う英語に。' : 'Numbers you use every day.'}</h2>
          <p>{japanese
            ? '数えるところから、値段・割合・大きな数字の読み方まで。数字を実際の場面と結び付けて学びます。'
            : 'From counting to prices, portions, percentages, and big figures—learn numbers through the ways people use them.'}</p>
          <div className="vl02-hero-meta"><strong>{totalItems}</strong> {japanese ? 'の表現' : 'number words and expressions'} <span aria-hidden="true">•</span> {japanese ? '8つのテーマ' : '8 everyday themes'}</div>
        </div>
        <div className="vl02-hero-visual" aria-label={japanese ? '数字の読み方の例' : 'Examples of number readings'}>
          <div className="vl02-visual-orbit" aria-hidden="true" />
          <div className="vl02-visual-example vl02-example-count">
            <span className="vl02-visual-cue">21</span>
            <span className="vl02-visual-word" lang="en">twenty-one</span>
            <span className="vl02-visual-ja" lang="ja">21</span>
          </div>
          <div className="vl02-visual-example vl02-example-decimal">
            <span className="vl02-visual-cue">1.25</span>
            <span className="vl02-visual-word" lang="en">one point two five</span>
            <span className="vl02-visual-ja" lang="ja">1.25</span>
          </div>
          <div className="vl02-visual-example vl02-example-percent">
            <span className="vl02-visual-cue">50%</span>
            <span className="vl02-visual-word" lang="en">fifty percent</span>
            <span className="vl02-visual-ja" lang="ja">50パーセント</span>
          </div>
          <span className="vl02-visual-dot vl02-dot-one" aria-hidden="true">1</span>
          <span className="vl02-visual-dot vl02-dot-zero" aria-hidden="true">0</span>
          <span className="vl02-visual-dot vl02-dot-point" aria-hidden="true">.</span>
        </div>
      </section>

      <aside className="vl02-intro-note" aria-label={japanese ? '学習のポイント' : 'Learning note'}>
        <span className="vl02-note-mark" aria-hidden="true">✦</span>
        <div>
          <strong>{japanese ? '数字は「読み方」と「使う場面」をセットで' : 'Learn the reading and the context together'}</strong>
          <p>{japanese ? numberLessonNotes.ja : numberLessonNotes.en}</p>
        </div>
        <div className="vl02-note-example">
          <span>{japanese ? '数字 → 英語' : 'FIGURE → SPOKEN ENGLISH'}</span>
          <strong>1.25 <span aria-hidden="true">→</span> one point two five</strong>
          <small lang="ja">小数点の後は一桁ずつ読む</small>
        </div>
      </aside>

      <section className="vl02-study" aria-labelledby="vl02-study-heading">
        <div className="vl01-section-heading vl02-section-heading">
          <div>
            <p className="vl01-kicker">01 · NUMBER VOCABULARY</p>
            <h2 id="vl02-study-heading">{japanese ? 'テーマ別に数字を学ぶ' : 'Explore numbers by theme'}</h2>
            <p>{japanese ? 'テーマを選んで、必要な表現に集中できます。' : 'Choose a theme to focus on the expressions you need.'}</p>
          </div>
          <button type="button" className={`vl02-practice-toggle${practice ? ' is-active' : ''}`} onClick={togglePractice}
            aria-pressed={practice}>
            <span aria-hidden="true">{practice ? '✓' : '↗'}</span>
            {practice
              ? (japanese ? '練習を終了' : 'Exit practice')
              : (japanese ? '英語を思い出す練習' : 'Practice recall')}
          </button>
        </div>

        <div className="vl02-filters" role="group" aria-label={japanese ? '数字のテーマを選択' : 'Choose a number theme'}>
          <button type="button" aria-pressed={activeGroup === 'all'} onClick={() => setActiveGroup('all')}>
            {japanese ? 'すべて' : 'All themes'} <span>{totalItems}</span>
          </button>
          {numberGroups.map((group) => (
            <button key={group.id} type="button" aria-pressed={activeGroup === group.id} onClick={() => setActiveGroup(group.id)}>
              {japanese ? group.ja : group.en} <span>{group.items.length}</span>
            </button>
          ))}
        </div>

        {practice && <p className="vl02-practice-hint" role="status">{japanese
          ? '日本語の意味を見て英語を思い出し、カードをタップして答えを確認しましょう。'
          : 'Use the Japanese meaning to recall the English, then tap a card to reveal the answer.'}</p>}

        {collection.error && <p role="alert" className="ar-collection-error">{collection.error}</p>}
        <div className="vl02-groups">
          {visibleGroups.map((group) => (
            <section className="vl02-group" key={group.id} aria-labelledby={`vl02-group-${group.id}`}>
              <div className="vl02-group-heading">
                <span className="vl02-group-number">{String(numberGroups.indexOf(group) + 1).padStart(2, '0')}</span>
                <div>
                  <h3 id={`vl02-group-${group.id}`}>{japanese ? group.ja : group.en}</h3>
                  <p>{japanese ? group.intro.ja : group.intro.en}</p>
                </div>
                <span className="vl02-group-count">{group.items.length}</span>
              </div>

              {group.id === 'counting' && <div className="vl02-counting-track" aria-hidden="true">
                <span>0</span><i /><span>5</span><i /><span>10</span><i /><span>15</span><i /><span>20</span>
              </div>}

              <div className={`vl02-card-grid vl02-grid-${group.id}`}>
                {group.items.map((item, itemIndex) => {
                  const key = `${group.id}-${itemIndex}`
                  return <div className="ar-reviewable" key={key}>
                    <NumberCard item={item} groupId={`${group.id}-${itemIndex}`} japanese={japanese}
                      practice={practice} revealed={revealed.has(key)} onReveal={() => revealTerm(key)} />
                    <ReviewToggle content={toVocabularyReviewContent(item.term, 2, item.ja, group.en)}
                      collection={collection} japanese={japanese} />
                  </div>
                })}
              </div>

              {(group.note || group.example) && <div className="vl02-group-notes">
                <LessonNote note={group.note} japanese={japanese} label={japanese ? '使い方のポイント' : 'Usage note'} />
                <LessonNote note={group.example} japanese={japanese} label={japanese ? '読み方の例' : 'Reading example'} />
              </div>}
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
