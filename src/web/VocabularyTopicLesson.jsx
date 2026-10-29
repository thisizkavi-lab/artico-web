import { useMemo, useState } from 'react'
import organized from './vocabularyOrganized.json'
import { vocabularyGroupJapanese, vocabularyJapanese } from './vocabularySupport'
import { vocabularyVisual } from './vocabularyVisual'
import { organizeVocabularyGroup } from './vocabularyDedup'
import './vocabulary-topic.css'

const lessons = new Map(organized.lessons.map(lesson => [lesson.sourceLesson, lesson]))

const weekDays = [
  { name: 'Monday', short: 'Mon' },
  { name: 'Tuesday', short: 'Tue' },
  { name: 'Wednesday', short: 'Wed' },
  { name: 'Thursday', short: 'Thu' },
  { name: 'Friday', short: 'Fri' },
  { name: 'Saturday', short: 'Sat' },
  { name: 'Sunday', short: 'Sun' },
]

function WeekDaysChart({ japanese }) {
  const sections = [
    { key: 'weekday', title: 'weekdays', japanese: '平日', days: weekDays.slice(0, 5) },
    { key: 'weekend', title: 'weekend', japanese: '週末', days: weekDays.slice(5) },
  ]

  return (
    <div className="vlt-week-chart" role="group" aria-label={japanese ? '一週間の曜日と略語' : 'Days of the week and abbreviations'}>
      <header className="vlt-week-chart-header">
        <div>
          <span className="vlt-week-chart-overline">{japanese ? '1週間 · 7日間' : 'ONE WEEK · 7 DAYS'}</span>
          <h4 lang="en">Days of the week</h4>
        </div>
        <span className="vlt-week-chart-legend">{japanese ? '正式名 → 略語' : 'FULL NAME → SHORT FORM'}</span>
      </header>
      <div className="vlt-week-chart-body">
        {sections.map(section => (
          <section key={section.key} className={'vlt-week-section is-' + section.key} aria-label={section.title}>
            <div className="vlt-week-section-label">
              <div>
                <strong lang="en">{section.title}</strong>
                {japanese && <span lang="ja">{section.japanese}</span>}
              </div>
              <span className="vlt-week-count">{section.days.length} {japanese ? '日' : 'days'}</span>
            </div>
            <ol className="vlt-week-days">
              {section.days.map(day => (
                <li key={day.name}>
                  <span className="vlt-week-day-name">
                    <strong lang="en">{day.name}</strong>
                    {japanese && <small lang="ja">{vocabularyJapanese(day.name, 3)}</small>}
                  </span>
                  <abbr className="vlt-week-day-short" title={day.name} lang="en">{day.short}</abbr>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <p className="vlt-week-chart-footnote">
        {japanese
          ? '略語はカレンダーや予定表などで使います。Tues.（Tuesday）、Thurs.（Thursday）という形もあります。話すときは曜日の名前を省略せずに読みます。'
          : 'These short forms appear in calendars and schedules. You may also see Tues. (Tuesday) and Thurs. (Thursday). When speaking, say the full day names.'}
      </p>
    </div>
  )
}


const yearMonths = [
  { name: 'January', short: 'Jan.', ja: '1月' },
  { name: 'February', short: 'Feb.', ja: '2月' },
  { name: 'March', short: 'Mar.', ja: '3月' },
  { name: 'April', short: 'Apr.', ja: '4月' },
  { name: 'May', short: 'May', ja: '5月' },
  { name: 'June', short: 'Jun.', ja: '6月' },
  { name: 'July', short: 'Jul.', ja: '7月' },
  { name: 'August', short: 'Aug.', ja: '8月' },
  { name: 'September', short: 'Sep.', ja: '9月' },
  { name: 'October', short: 'Oct.', ja: '10月' },
  { name: 'November', short: 'Nov.', ja: '11月' },
  { name: 'December', short: 'Dec.', ja: '12月' },
]

function MonthsOfYearChart({ japanese }) {
  return (
    <section className="vlt-month-chart" aria-label={japanese ? '12か月の英語名と略語' : 'Months of the year and abbreviations'}>
      <header className="vlt-month-chart-header">
        <div>
          <span className="vlt-month-chart-overline">{japanese ? '1年 · 12か月' : 'ONE YEAR · 12 MONTHS'}</span>
          <h4 lang="en">Months of the year</h4>
        </div>
        <span className="vlt-month-chart-hint">{japanese ? '正式名と短縮形' : 'FULL NAME & SHORT FORM'}</span>
      </header>
      <table className="vlt-month-table">
        <colgroup>
          <col className="vlt-month-number-column" />
          <col className="vlt-month-name-column" />
          <col className="vlt-month-short-column" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{japanese ? '月の名前' : 'Month'}</th>
            <th scope="col">{japanese ? '略語' : 'Short form'}</th>
          </tr>
        </thead>
        <tbody>
          {yearMonths.map((month, index) => (
            <tr key={month.name}>
              <td className="vlt-month-number">{index + 1}</td>
              <th scope="row" className="vlt-month-name">
                <strong lang="en">{month.name}</strong>
                {japanese && <small lang="ja">{month.ja}</small>}
              </th>
              <td className="vlt-month-abbreviation">
                <abbr title={month.name} lang="en">{month.short}</abbr>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="vlt-month-chart-footnote">
        {japanese
          ? 'May は通常短くしません。September は Sept. とも書きます。カレンダーなどではピリオドを省くこともあります。'
          : 'May is usually written in full. Sept. is also common for September. Calendars sometimes omit the periods.'}
      </p>
    </section>
  )
}


const timeSpanEquivalents = {
  second: '1/60 of a minute',
  minute: '60 seconds',
  hour: '60 minutes',
  day: '24 hours',
  week: '7 days',
  'two weeks / a fortnight': '14 days',
  month: '28–31 days',
  year: '12 months',
  decade: '10 years',
  century: '100 years',
  'millennium / millennia': '1,000 years',
}

function TimeSpansTable({ items, japanese }) {
  return (
    <section className="vlt-span-chart" aria-label={japanese ? '時間の単位と長さの一覧' : 'Units and spans of time'}>
      <header className="vlt-span-chart-header">
        <div>
          <span className="vlt-span-chart-overline">{japanese ? '秒から千年紀まで' : 'FROM SECONDS TO MILLENNIA'}</span>
          <h4 lang="en">Units and spans of time</h4>
        </div>
      </header>
      <table className="vlt-span-table">
        <thead>
          <tr>
            <th scope="col">{japanese ? '時間の単位' : 'Unit or span'}</th>
            <th scope="col">{japanese ? '長さ・意味' : 'How long?'}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(([term]) => (
            <tr key={term}>
              <th scope="row" className="vlt-span-name">
                <strong lang="en">{term}</strong>
                {japanese && <small lang="ja">{vocabularyJapanese(term, 3)}</small>}
              </th>
              <td className="vlt-span-equivalent" lang="en">{timeSpanEquivalents[term]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="vlt-span-footnote">{japanese
        ? '月の日数は28～31日です。fortnight は「2週間」の意味ですが、日常のアメリカ英語では two weeks のほうが一般的です。millennia は millennium の複数形です。'
        : 'Months vary from 28 to 31 days. In everyday American English, “two weeks” is more common than “a fortnight.” “Millennia” is the plural of “millennium.”'}</p>
    </section>
  )
}

function Visual({visual}) {
  if (!visual || (visual.type !== 'png' && visual.type !== 'library-png')) return null
  return <img className={'vlt-png' + (visual.type === 'library-png' ? ' vlt-library-png' : '')}
    src={visual.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
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
    ? <button type="button" className={'vlt-card vlt-recall-card' + (revealed ? ' is-revealed' : '') + (visual ? ' vlt-image-card' : ' vlt-text-card')}
        onClick={onReveal} aria-label={(ja || (japanese ? '絵のカード' : 'Picture card')) + (revealed ? ': ' + term : (japanese ? '。答えを表示する' : '. Reveal answer'))}
        aria-expanded={Boolean(revealed)}>
        {body}
      </button>
    : <article className={'vlt-card' + (visual ? ' vlt-image-card' : ' vlt-text-card')}>{body}</article>
}

export default function VocabularyTopicLesson({ topic, japanese }) {
  const lesson = lessons.get(topic.sourceLesson)
  const [groupIndex, setGroupIndex] = useState(-1)
  const [mode, setMode] = useState('study')
  const [revealed, setRevealed] = useState(() => new Set())
  const groups = lesson?.groups || []
  const activeGroups = groups.map((group,index)=>({...group,index}))
    .filter(group=>organizeVocabularyGroup(group.items,topic.sourceLesson).fresh.length>0)
  const counts = useMemo(() => groups.reduce((acc,group) => {
    const result=organizeVocabularyGroup(group.items,topic.sourceLesson)
    acc.fresh += result.fresh.length
    acc.revisited += result.revisited.length
    return acc
  }, {fresh:0,revisited:0}), [groups,topic.sourceLesson])
  const shownGroups = groupIndex === -1 ? activeGroups : activeGroups.filter(group=>group.index===groupIndex)
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
  const sample = groups.flatMap(group => organizeVocabularyGroup(group.items,topic.sourceLesson).fresh)
    .map(([term]) => ({term,visual:vocabularyVisual(term,topic.sourceLesson)}))
    .filter(item => item.visual).slice(0,2)
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
          <p className="vlt-hero-count"><strong>{counts.fresh}</strong> {japanese ? '新しい語と表現' : 'new words and expressions'} <span aria-hidden="true">·</span> {counts.revisited} {japanese ? '復習語' : 'review words'}</p>
        </div>
        <div className="vlt-hero-art" aria-hidden="true">
          {sample.length>0
            ? sample.map(({term,visual},index)=><div key={term} className={'vlt-hero-preview vlt-hero-preview-'+index}><Visual visual={visual}/></div>)
            : <div className="vlt-hero-monogram">{String(topic.sourceLesson).padStart(2,'0')}</div>}
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
        {activeGroups.map((group) =>
          <button type="button" key={group.index} aria-pressed={groupIndex === group.index}
            onClick={() => chooseGroup(group.index)}>
            {vocabularyGroupJapanese(topic.sourceLesson, group.index) && japanese
              ? vocabularyGroupJapanese(topic.sourceLesson, group.index) : group.title}
          </button>)}
      </nav>
      <div className="vlt-groups">
        {shownGroups.map(group => {
          const {fresh,revisited} = organizeVocabularyGroup(group.items, topic.sourceLesson)
          const cards = mode === 'study' ? fresh : fresh.filter(([term]) => canRecall(term))
          const isDaysChart = topic.sourceLesson === 3 && group.index === 1
          const isMonthsChart = topic.sourceLesson === 3 && group.index === 2
          const isTimeSpansTable = topic.sourceLesson === 3 && group.index === 4
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
                ? (isDaysChart && mode === 'study'
                  ? <WeekDaysChart japanese={japanese} />
                  : isMonthsChart && mode === 'study'
                    ? <MonthsOfYearChart japanese={japanese} />
                    : isTimeSpansTable && mode === 'study'
                      ? <TimeSpansTable items={cards} japanese={japanese} />
                      : <div className="vlt-grid">
                    {cards.map((entry, index) => {
                      const key = group.index + '-' + index
                      return <VocabCard key={key} entry={entry} lesson={topic.sourceLesson}
                        practice={mode === 'practice'} revealed={revealed.has(key)}
                        onReveal={() => toggleReveal(key)} japanese={japanese} />
                    })}
                  </div>)
                : <p className="vlt-empty">{japanese
                  ? 'このグループは学習用のカードで確認できます。'
                  : 'Explore these words in Study mode.'}</p>}
              {revisited.length > 0 && <details className="vlt-revisited">
                <summary>{japanese ? '以前に学んだ言葉' : 'Previously learned'} <span>({revisited.length})</span></summary>
                <div className="vlt-review-list">
                  {revisited.map(({term,firstChapter},index) =>
                    <a key={index} href={'#/lesson/98/study/'+String(firstChapter).padStart(2,'0')}>
                      <span lang="en">{term}</span>
                      <small>{japanese ? 'レッスン' : 'Lesson'} {String(firstChapter).padStart(2,'0')}</small>
                    </a>)}
                </div>
              </details>}
            </section>
          )
        })}
      </div>
    </div>
  )
}
