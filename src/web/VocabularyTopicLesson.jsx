import { useEffect, useMemo, useState } from 'react'
import organized from './vocabularyOrganized.json'
import { vocabularyGroupJapanese, vocabularyJapanese } from './vocabularySupport'
import { vocabularyVisual } from './vocabularyVisual'
import VocabularyBodyArt from './VocabularyBodyArt'
import KokoroSpeakButton from './KokoroSpeakButton'
import { prefetchKokoroSpeech, warmKokoroSpeech } from './kokoroSpeech'
import VocabularyBodyMotion from './VocabularyBodyMotion'
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
                  <KokoroSpeakButton text={day.name} japanese={japanese} />
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
                <KokoroSpeakButton text={month.name} japanese={japanese} />
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
                <KokoroSpeakButton text={term} japanese={japanese} />
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

function Visual({visual, practice, japanese}) {
  if (visual?.type === 'body-motion') return <VocabularyBodyMotion term={visual.term} practice={practice} japanese={japanese} />
  if (visual?.type === 'body-sprite') {
    const col = visual.index % 8
    const row = Math.floor(visual.index / 8)
    return <span className="vlt-body-sprite" aria-hidden="true" style={{
      backgroundImage: 'url("' + visual.src + '")',
      backgroundPosition: (col * 100 / 7) + '% ' + (row * 100 / 3) + '%',
    }} />
  }
  if (visual?.type === 'body-art') return <VocabularyBodyArt term={visual.term} />
  if (!visual || (visual.type !== 'png' && visual.type !== 'library-png')) return null
  return <img className={'vlt-png' + (visual.type === 'library-png' ? ' vlt-library-png' : '')}
    src={visual.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
}


const relativeFrequency = [
  {term:'always', label:'Always', width:'100%', bg:'#d95462', ink:'#ffffff'},
  {term:'usually', label:'Usually', width:'90%', bg:'#f0c044', ink:'#2e3545'},
  {term:'often', label:'Often', width:'78%', bg:'#91b278', ink:'#263d3c'},
  {term:'sometimes', label:'Sometimes', width:'65%', bg:'#efa657', ink:'#303849'},
  {term:'rarely / seldom', label:'Rarely / seldom', width:'52%', bg:'#8678c8', ink:'#ffffff'},
  {term:'never', label:'Never', width:'35%', bg:'#7094b3', ink:'#ffffff'},
]

function FrequencyScale({items,japanese}) {
  const terms = new Set(items.map(([term])=>term))
  const levels = relativeFrequency.filter(level=>terms.has(level.term))
  const intervals = items.filter(([term])=>!relativeFrequency.some(level=>level.term===term))
  return (
    <div className="vlt-frequency-study">
      <section className="vlt-frequency-scale" aria-label={japanese?'頻度の目安':'Relative frequency of common adverbs'}>
        <header className="vlt-frequency-scale-header">
          <span className="vlt-frequency-eyebrow">{japanese?'頻度を表す言葉':'ADVERBS OF FREQUENCY'}</span>
          <h4>{japanese?'どのくらいよく起こる？':'How often does it happen?'}</h4>
          <p>{japanese?'上ほど頻度が高く、下ほど低くなります。':'From most frequent to least frequent.'}</p>
        </header>
        <ol className="vlt-frequency-bars">
          {levels.map(level=>(
            <li key={level.term}>
              <div className="vlt-frequency-bar" style={{
                '--vlt-frequency-width':level.width,
                '--vlt-frequency-background':level.bg,
                '--vlt-frequency-foreground':level.ink,
              }}>
                <span lang="en">{level.label}</span>
                <KokoroSpeakButton text={level.label} japanese={japanese} />
                {japanese&&<small lang="ja">{vocabularyJapanese(level.term,3)}</small>}
              </div>
            </li>
          ))}
        </ol>
        <p className="vlt-frequency-note">{japanese
          ? 'これは大まかな順序です。usually、often、sometimes などに決まった割合はありません。never は「一度もない」という意味です。'
          : 'This is a general guide, not a percentage scale. “Usually,” “often,” and “sometimes” have no fixed percentages; “never” means not at all.'}</p>
      </section>
      {intervals.length>0&&(
        <section className="vlt-frequency-intervals" aria-label={japanese?'具体的な頻度':'Specific intervals'}>
          <div className="vlt-frequency-interval-heading">
            <h4>{japanese?'具体的な頻度':'Specific intervals'}</h4>
            <p>{japanese?'「毎日」「週に1回」など、回数や間隔をはっきり伝える表現。':'Use these when you can name the interval or number of times.'}</p>
          </div>
          <div className="vlt-grid">
            {intervals.map((entry,index)=>(
              <VocabCard key={index} entry={entry} lesson={3} practice={false} japanese={japanese}/>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function VocabCard({ entry, lesson, practice, revealed, onReveal, japanese, upcoming = [] }) {
  const [term, note] = entry
  const ja = vocabularyJapanese(term, lesson)
  const visual = vocabularyVisual(term, lesson)
  const canPractice = Boolean(ja || visual)
  const answerHidden = practice && !revealed && canPractice
  const body = (
    <>
      {visual && <span className="vlt-visual"><Visual visual={visual} practice={practice} japanese={japanese} /></span>}
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
  const cardType = visual ? ' vlt-image-card' : ' vlt-text-card'
  // Keep "reveal" and "listen" as separate controls: never nest two buttons.
  // The small speaker stays at the lower left in both Study and Practice.
  return practice && canPractice
    ? <div className="vlt-recall-container">
        <button type="button"
          className={'vlt-card vlt-recall-card' + (revealed ? ' is-revealed' : '') + cardType}
          onClick={onReveal}
          aria-label={(ja || (japanese ? '絵のカード' : 'Picture card')) + (revealed ? ': ' + term : (japanese ? '。答えを表示する' : '. Reveal answer'))}
          aria-expanded={Boolean(revealed)}>
          {body}
        </button>
        <KokoroSpeakButton text={term} japanese={japanese} upcoming={upcoming} />
      </div>
    : <article className={'vlt-card' + cardType}>
        {body}
        <KokoroSpeakButton text={term} japanese={japanese} upcoming={upcoming} />
      </article>
}

export default function VocabularyTopicLesson({ topic, japanese }) {
  const lesson = lessons.get(topic.sourceLesson)
  const [groupIndex, setGroupIndex] = useState(-1)
  const [mode, setMode] = useState('study')
  const [revealed, setRevealed] = useState(() => new Set())
  // Source stays intact for editorial traceability; this heading is not a word.
  const groups = useMemo(() => (lesson?.groups || []).map((group, index) =>
    topic.sourceLesson === 14 && index === 0
      ? { ...group, items: group.items.filter(([term]) => term !== 'body, parts of')
          .flatMap(entry => entry[0] === 'eyelashes'
            ? [entry, ['eyelid'], ['pupil'], ['iris']] : [entry]) }
      : group), [lesson, topic.sourceLesson])
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
  useEffect(() => {
    if (mode !== 'study') return
    warmKokoroSpeech()
    // Only the first few visible terms. Do not synthesize an entire lesson.
    const first = shownGroups.flatMap(group =>
      organizeVocabularyGroup(group.items, topic.sourceLesson).fresh
        .slice(0, 3).map(entry => entry[0])).slice(0, 3)
    prefetchKokoroSpeech(first)
  }, [topic.sourceLesson, groupIndex, mode])


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
          const bodyNote = topic.sourceLesson === 14 && mode === 'study' ? ([
            japanese ? 'head（頭）の前側が face（顔）です。額、目、鼻、口は顔の部位です。' : 'Your face is the front of your head. Your forehead, eyes, nose, and mouth are parts of your face.',
            japanese ? '腕は手首から手につながります。指と親指は手の一部です。' : 'Your arm connects to your hand at the wrist. Fingers and the thumb are parts of your hand.',
            japanese ? '脚には太もも、ひざ、すねがあります。足首の下が foot（足）で、その先に toe（足の指）があります。' : 'Your leg has a thigh, knee, and shin. Below the ankle is the foot, which has toes.',
          ][group.index] || null) : null
          const isDaysChart = topic.sourceLesson === 3 && group.index === 1
          const isMonthsChart = topic.sourceLesson === 3 && group.index === 2
          const isTimeSpansTable = topic.sourceLesson === 3 && group.index === 4
          const isFrequencyScale = topic.sourceLesson === 3 && group.index === 5
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
              {bodyNote && <p className="vlt-body-note">{bodyNote}</p>}
              {cards.length > 0
                ? (isDaysChart && mode === 'study'
                  ? <WeekDaysChart japanese={japanese} />
                  : isMonthsChart && mode === 'study'
                    ? <MonthsOfYearChart japanese={japanese} />
                    : isTimeSpansTable && mode === 'study'
                      ? <TimeSpansTable items={cards} japanese={japanese} />
                      : isFrequencyScale && mode === 'study'
                        ? <FrequencyScale items={cards} japanese={japanese} />
                        : <div className="vlt-grid">
                    {cards.map((entry, index) => {
                      const key = group.index + '-' + index
                      return <VocabCard key={key} entry={entry} lesson={topic.sourceLesson}
                        practice={mode === 'practice'} revealed={revealed.has(key)}
                        onReveal={() => toggleReveal(key)} japanese={japanese}
                         upcoming={cards.slice(index + 1, index + 3).map(item => item[0])} />
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
