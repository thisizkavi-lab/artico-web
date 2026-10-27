import { useState } from 'react'
import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import { applicationTracks, applicationTrack, applicationResponseKey } from './applicationTracks'
import WritingStudio from './WritingStudio'
import JobsCourse from './JobsCourse'
import './application.css'

function TrackCard({ track, language, index }) {
  return (
    <a className="ap-track" href={'#/application/' + track.id}>
      <span className="ap-track-icon" aria-hidden="true"><CurriculumIcon name={track.icon} size={26} /></span>
      <span className="ap-track-copy">
        <span className="ap-track-number">{String(index + 1).padStart(2, '0')}</span>
        <strong lang="en">{track.en}</strong>
        <small>{language === 'ja' ? track.jaSummary : track.enSummary}</small>
      </span>
      <span className="ap-arrow" aria-hidden="true">›</span>
    </a>
  )
}

function TrackOverview({ language }) {
  const ja = language === 'ja'
  return (
    <div className="aw-page ap-page">
      <header className="ap-header">
        <p className="ap-eyebrow">APPLICATION</p>
        <h1>{ja ? '英語で、何をしたい？' : 'What do you want to do in English?'}</h1>
        <p>{ja ? '目的を選んで、実際に使う練習を始めましょう。' : 'Choose a goal. Practise doing it in English.'}</p>
      </header>
      <div className="ap-tracks">
        {applicationTracks.map((track, index) =>
          <TrackCard key={track.id} track={track} index={index} language={language} />
        )}
      </div>
    </div>
  )
}

function TrackExercise({ track, language, learning, update }) {
  const ja = language === 'ja'
  const [selected, setSelected] = useState(0)
  const task = track.tasks[selected]
  const key = applicationResponseKey(track.id, selected)
  const draft = learning.responses?.[key] ?? ''
  const changes = (value) => update(prev => ({
    ...prev, responses:{ ...prev.responses, [key]:value },
  }))
  const steps = ja ? task.checkpointsJa : task.checkpointsEn

  return (
    <div className="aw-page ap-page">
      <a className="ap-back" href="#/application">← {ja ? 'すべての目的' : 'All application tracks'}</a>
      <header className="ap-header">
        <p className="ap-eyebrow">APPLICATION / {track.en.toUpperCase()}</p>
        <h1 lang="en">{track.en}</h1>
        <p>{ja ? track.jaSummary : track.enSummary}</p>
      </header>

      <div className="ap-exercise-tabs" role="group" aria-label={ja ? '練習を選ぶ' : 'Choose an exercise'}>
        {track.tasks.map((option,i) =>
          <button key={option.en} type="button" className={selected===i ? 'is-selected' : ''}
            aria-pressed={selected===i} onClick={() => setSelected(i)}>
            {String(i+1).padStart(2,'0')} · {ja ? option.ja : option.en}
          </button>
        )}
      </div>

      <section className="ap-exercise" aria-label={ja ? task.ja : task.en}>
        <span className="ap-mode">
          {task.kind === 'speaking' ? (ja ? '話す練習' : 'Speaking') :
           task.kind === 'reading' ? (ja ? '読む練習' : 'Reading') :
           (ja ? '書く練習' : 'Writing')}
        </span>
        <h2>{ja ? task.ja : task.en}</h2>
        <p className="ap-prompt">{ja ? task.promptJa : task.promptEn}</p>
        <div className="ap-example">
          <span>{task.kind==='reading' ? (ja ? '読む文章' : 'Read this passage') : (ja ? '使える表現' : 'Try this language')}</span>
          <p lang="en">{task.example}</p>
        </div>
        <h3>{ja ? '練習するときのポイント' : 'What to practise'}</h3>
        <ul className="ap-checklist">
          {steps.map(step => <li key={step}>{step}</li>)}
        </ul>
        <label className="ap-draft-label" htmlFor={'ap-draft-'+key}>
          {ja ? '自分の答え・話すときのメモ' : 'Your answer or speaking notes'}
        </label>
        <textarea id={'ap-draft-'+key} className="ap-draft"
          placeholder={ja ? 'ここに自分の言葉で書いてみましょう。声に出して練習するだけでも大丈夫です。' :
            'Try it in your own words. For speaking tasks, a short outline is enough.'}
          value={draft} onChange={e=>changes(e.target.value)} maxLength={1900} rows={5}/>
        <small className="ap-storage">
          {ja ? '入力した内容は、この端末に自動保存されます。' : 'Your notes are saved on this device as you type.'}
        </small>
      </section>
      <a href="#/application" className="ap-back ap-back-bottom">
        ← {ja ? '別の目的を選ぶ' : 'Choose another goal'}
      </a>
    </div>
  )
}

export default function Application({ route, learning, update }) {
  const { language } = useLanguage()
  if (!route.id) return <TrackOverview language={language}/>
  if (route.id === 'writing') return <WritingStudio />
  if (route.id === 'interviews') return <JobsCourse learning={learning} update={update} />
  const track = applicationTrack(route.id)
  if (!track) return <TrackOverview language={language}/>
  return <TrackExercise key={track.id} track={track} language={language}
    learning={learning} update={update}/>
}
