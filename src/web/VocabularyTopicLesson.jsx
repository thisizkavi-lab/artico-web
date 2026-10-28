import { useMemo, useState } from 'react'
import organized from './vocabularyOrganized.json'
import { vocabularyGroupJapanese, vocabularyJapanese } from './vocabularySupport'
import { vocabularyVisual } from './vocabularyVisual'
import { organizeVocabularyGroup } from './vocabularyDedup'
import VocabularySceneArt from './VocabularySceneArt'
import VocabularyTimeArt from './VocabularyTimeArt'
import VocabularyFoodArt from './VocabularyFoodArt'
import { DimensionArt, MaterialArt, WeatherArt, DirectionArt } from './VocabularyDiagramArt'
import './vocabulary-topic.css'

const lessons = new Map(organized.lessons.map(lesson => [lesson.sourceLesson, lesson]))

function Visual({visual,masked=false}) {
 if (!visual) return null
 if (visual.type==='png') return <img className="vlt-png" src={visual.src} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
 if (visual.type==='color') return <span className="vlt-color" style={{backgroundColor:visual.value}} aria-hidden="true"/>
 if (visual.type==='scene') return <VocabularySceneArt scene={visual.scene}/>
 if (visual.type==='food') return <VocabularyFoodArt kind={visual.kind}/>
 if (['calendar-day','calendar-month','calendar-range','season','frequency','daytime','clock','duration','timeline'].includes(visual.type))
   return <VocabularyTimeArt visual={visual} masked={masked}/>
 if (visual.type==='size') return <DimensionArt value={visual.value}/>
 if (visual.type==='material') return <MaterialArt value={visual.value}/>
 if (visual.type==='weather') return <WeatherArt value={visual.value}/>
 if (visual.type==='direction') return <DirectionArt value={visual.value}/>
 return null
}

function VocabCard({ entry, lesson, practice, revealed, onReveal, japanese }) {
  const [term, note] = entry
  const ja = vocabularyJapanese(term, lesson)
  const visual = vocabularyVisual(term, lesson)
  const canPractice = Boolean(ja || visual)
  const answerHidden = practice && !revealed && canPractice
  const body = (
    <>
      {visual && <span className="vlt-visual"><Visual visual={visual} masked={answerHidden} /></span>}
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
