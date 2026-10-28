import { useMemo, useState } from 'react'
import { CurriculumIcon } from './CurriculumIcon'
import organized from './vocabularyOrganized.json'
import { vocabularyGroupJapanese, vocabularyJapanese } from './vocabularySupport'
import { vocabularyTopicArt, vocabularyVisual } from './vocabularyVisual'
import './vocabulary-topic.css'

const lessons = new Map(organized.lessons.map(lesson => [lesson.sourceLesson, lesson]))

function Visual({ visual }) {
  if (!visual) return null
  if (visual.type === 'color') {
    return <span className="vlt-color" style={{ backgroundColor: visual.value }} aria-hidden="true" />
  }
  if (visual.type === 'time') {
    const isNight = ['night', 'midnight'].includes(visual.value)
    const isLow = ['dawn', 'sunrise', 'sunset', 'dusk'].includes(visual.value)
    return (
      <svg className="vlt-drawing" viewBox="0 0 68 54" aria-hidden="true" focusable="false">
        <path d="M3 43H65" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.6" />
        <circle cx="35" cy={isLow ? 41 : 23} r={isNight ? 9 : 13} fill={isNight ? '#b2bfd1' : '#f1c774'} stroke="#7893b7" strokeWidth="1.2" />
        {isNight && <circle cx="40" cy="18" r="9" fill="#eff4fb" />}
        <path d="M8 50H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 43h50" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5"/>
      </svg>
    )
  }
  if (visual.type === 'size') {
    const value = visual.value
    const narrow = ['thin', 'small', 'little', 'short', 'low', 'near'].includes(value)
    const vertical = ['high','low'].includes(value)
    const length = narrow ? 23 : 47
    return <svg className="vlt-drawing" viewBox="0 0 68 54" aria-hidden="true" focusable="false">
      <rect x={vertical ? 24 : (68-length)/2} y={vertical ? (narrow ? 29 : 8) : 19}
        width={vertical ? 20 : length} height={vertical ? (narrow ? 16 : 37) : (value === 'thick' ? 18 : value === 'thin' ? 5 : 14)}
        rx="4" fill="#719bd2"/>
      <path d="M8 49H60" stroke="#c2cee0" strokeWidth="1.5"/>
    </svg>
  }
  return <CurriculumIcon name={visual.value} size={36} />
}

function VocabCard({ entry, lesson, practice, revealed, onReveal, japanese }) {
  const [term, note] = entry
  const ja = vocabularyJapanese(term, lesson)
  const visual = vocabularyVisual(term, lesson)
  const canPractice = Boolean(ja || visual)
  const answerHidden = practice && !revealed && canPractice
  const body = (
    <>
      {visual && <span className="vlt-visual"><Visual visual={visual} /></span>}
      <span className="vlt-card-copy">
        {practice && canPractice && <span className="vlt-card-kicker">{japanese ? '英語で何と言う？' : 'SAY IT IN ENGLISH'}</span>}
        {ja && <span className={'vlt-meaning' + (practice ? ' is-prompt' : '')} lang="ja">{ja}</span>}
        {!ja && practice && visual && <span className="vlt-meaning">{japanese ? '絵を見て答える' : 'Name what you see'}</span>}
        {!answerHidden
          ? <strong className="vlt-term" lang="en">{term}</strong>
          : <span className="vlt-hidden-term" aria-hidden="true">{japanese ? 'タップして答えを見る' : 'Tap to reveal'}</span>}
        {!practice && note && <span className="vlt-source-note" lang="en">{note}</span>}
        {practice && revealed && <span className="vlt-reveal-note">{japanese ? 'タップで隠す' : 'Tap to hide'}</span>}
      </span>
    </>
  )
  return practice && canPractice
    ? <button type="button" className={'vlt-card vlt-recall-card' + (revealed ? ' is-revealed' : '') + (!visual ? ' vlt-text-card' : '')}
        onClick={onReveal} aria-label={(ja || (japanese ? '絵のカード' : 'Picture card')) + (revealed ? ': ' + term : (japanese ? '。答えを表示する' : '. Reveal answer'))}
        aria-expanded={Boolean(revealed)}>
        {body}
      </button>
    : <article className={'vlt-card' + (!visual ? ' vlt-text-card' : '')}>{body}</article>
}

export default function VocabularyTopicLesson({ topic, japanese }) {
  const lesson = lessons.get(topic.sourceLesson)
  const [groupIndex, setGroupIndex] = useState(-1)
  const [mode, setMode] = useState('study')
  const [revealed, setRevealed] = useState(() => new Set())
  const groups = lesson?.groups || []
  const itemCount = useMemo(() => groups.reduce((sum, group) => sum + group.items.length, 0), [groups])
  const shownGroups = groupIndex === -1 ? groups.map((group, index) => ({ ...group, index }))
    : groups[groupIndex] ? [{ ...groups[groupIndex], index: groupIndex }] : []
  const canRecall = (term) => Boolean(vocabularyJapanese(term, topic.sourceLesson) || vocabularyVisual(term, topic.sourceLesson))

  function chooseGroup(index) {
    setGroupIndex(index)
    setRevealed(new Set())
  }
  function chooseMode(value) {
    setMode(value)
    setRevealed(new Set())
  }
  function toggleReveal(key) {
    setRevealed(current => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }
  if (!lesson) return null

  return (
    <div className="vlt-lesson">
      <section className="vlt-hero" aria-label={japanese ? 'レッスンの概要' : 'Lesson overview'}>
        <div className="vlt-hero-copy">
          <p className="vl01-kicker">EXPLORE · LEARN · RECALL</p>
          <h2>{japanese ? '言葉を、意味と一緒に覚える。' : 'Words that make sense in context.'}</h2>
          <p>{japanese
            ? 'テーマ別に言葉を見て、必要なものから覚えましょう。'
            : 'Explore vocabulary in small, meaningful groups. Practice what you want to remember.'}</p>
          <p className="vlt-hero-count"><strong>{itemCount}</strong> {japanese ? 'の語と表現' : 'words and expressions'} <span aria-hidden="true">·</span> {groups.length} {japanese ? 'グループ' : 'groups'}</p>
        </div>
        <div className="vlt-hero-art" aria-hidden="true">
          <div className="vlt-hero-halo" />
          <CurriculumIcon name={vocabularyTopicArt(topic.sourceLesson)} size={82} />
          <span className="vlt-hero-corner vlt-corner-one" />
          <span className="vlt-hero-corner vlt-corner-two" />
        </div>
      </section>
      <div className="vlt-toolbar">
        <div className="vlt-modes" role="group" aria-label={japanese ? '学習モード' : 'Study mode'}>
          <button type="button" aria-pressed={mode === 'study'} onClick={() => chooseMode('study')}>
            {japanese ? '学ぶ' : 'Study'}
          </button>
          <button type="button" aria-pressed={mode === 'practice'} onClick={() => chooseMode('practice')}>
            {japanese ? '練習' : 'Practice'}
          </button>
        </div>
        <span className="vlt-mode-label">{mode === 'practice'
          ? (japanese ? 'カードをタップして答えを確認' : 'Tap a card to reveal the answer')
          : (japanese ? '単語と意味を確認' : 'Explore the words')}</span>
      </div>
      <nav className="vlt-filters" aria-label={japanese ? '語彙グループを選ぶ' : 'Choose a vocabulary group'}>
        <button type="button" aria-pressed={groupIndex === -1} onClick={() => chooseGroup(-1)}>
          {japanese ? 'すべて' : 'All'}
        </button>
        {groups.map((group, index) =>
          <button type="button" key={index} aria-pressed={groupIndex === index}
            onClick={() => chooseGroup(index)}>
            {vocabularyGroupJapanese(topic.sourceLesson, index) && japanese
              ? vocabularyGroupJapanese(topic.sourceLesson, index) : group.title}
          </button>)}
      </nav>
      <div className="vlt-groups">
        {shownGroups.map(group => {
          const cards = mode === 'study' ? group.items : group.items.filter(([term]) => canRecall(term))
          return (
            <section key={group.index} className="vlt-group" aria-labelledby={'vlt-group-' + topic.sourceLesson + '-' + group.index}>
              <div className="vlt-group-heading">
                <span className="vlt-group-index">{String(group.index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 id={'vlt-group-' + topic.sourceLesson + '-' + group.index}>
                    {japanese && vocabularyGroupJapanese(topic.sourceLesson, group.index)
                      ? vocabularyGroupJapanese(topic.sourceLesson, group.index) : group.title}
                  </h3>
                  {japanese && vocabularyGroupJapanese(topic.sourceLesson, group.index)
                    ? <p lang="en">{group.title}</p> : null}
                </div>
                <span className="vlt-group-count">{cards.length}</span>
              </div>
              {cards.length > 0
                ? <div className="vlt-grid">
                    {cards.map((entry, index) => {
                      const key = group.index + '-' + index
                      return <VocabCard key={key} entry={entry} lesson={topic.sourceLesson}
                        practice={mode === 'practice'} revealed={revealed.has(key)}
                        onReveal={() => toggleReveal(key)} japanese={japanese} />
                    })}
                  </div>
                : <p className="vlt-empty">{japanese
                  ? 'このグループは学習用のカードで確認できます。'
                  : 'Explore these words in Study mode.'}</p>}
            </section>
          )
        })}
      </div>
    </div>
  )
}
