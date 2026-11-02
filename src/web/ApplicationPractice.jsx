import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { APPLICATION_PRACTICE_KEY, readApplicationPractice } from './applicationPracticeState'
import './application-practice.css'

export function PracticeText({ text = '' }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => part.startsWith('**') ? <strong key={index}>{part.slice(2,-2)}</strong> : part)
}

export function PracticePicture() {
  return <svg className="ac-practice-picture" viewBox="0 0 480 210" role="img" aria-label="A woman sitting at a desk, reading a document beside a laptop"><rect x="40" y="35" width="400" height="160" rx="18" fill="#eaf1ed"/><path d="M65 153h350M105 153v43m280-43v43" stroke="#6b807b" strokeWidth="5"/><path d="m160 127 26-38h43l25 38" fill="#9aada2" stroke="#526b65" strokeWidth="3"/><circle cx="208" cy="63" r="23" fill="#e1b8a1"/><path d="M184 63c-5-38 51-39 49 0l-9-15h-32Z" fill="#5d5550"/><path d="m187 101-22 24 29 10m35-33 27 22-24 12" fill="none" stroke="#526b65" strokeWidth="7" strokeLinecap="round"/><path d="m190 114 35-9 14 36-36 8Z" fill="#fffdf5" stroke="#7b8d87" strokeWidth="2"/><path d="m299 113 50 0 8 37h-65Z" fill="#b9cad1" stroke="#6b807b" strokeWidth="3"/><path d="M291 151h68" stroke="#6b807b" strokeWidth="4"/></svg>
}

function Question({ question, value, change, index, ja }) {
  const [speaking, setSpeaking] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const audio = useRef(null)
  useEffect(() => () => { if (audio.current && typeof window !== 'undefined') window.speechSynthesis?.cancel() }, [])
  const listen = () => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { setVoiceError(ja ? '音声は利用できません。下のスクリプトを読んで練習できます。' : 'Device audio is unavailable. You can use the transcript below.'); return }
    window.speechSynthesis.cancel()
    const utterance = new window.SpeechSynthesisUtterance(question.audio)
    utterance.lang = 'en-US'; utterance.rate = .9
    const voice = window.speechSynthesis.getVoices().find(voice => /^en-US/i.test(voice.lang))
    if (voice) utterance.voice = voice
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => { setSpeaking(false); setVoiceError(ja ? '下のスクリプトで練習できます。' : 'Use the transcript below if device audio cannot play.') }
    audio.current = utterance; setSpeaking(true); window.speechSynthesis.speak(utterance)
  }
  const checked = value?.checked && value.choice < question.options.length
  return <form className="ac-practice-question" onSubmit={event => { event.preventDefault(); if (value && value.choice < question.options.length) change({ ...value, checked:true }) }}>
    <fieldset>
      <legend><small>{String(index + 1).padStart(2,'0')}{question.part ? ' · ' + question.part : ''}</small><span><PracticeText text={question.prompt}/></span></legend>
      {question.context && <p className="ac-practice-context"><PracticeText text={question.context}/></p>}
      {question.picture === 'office' && <PracticePicture/>}
      {question.audio && <div className="ac-practice-audio"><button type="button" onClick={listen}>{speaking ? (ja ? 'もう一度聞く' : 'Replay audio') : (ja ? '聞く' : 'Listen')}</button><small>{ja ? '端末の合成音声' : 'Device voice · original practice audio'}</small><details><summary>{ja ? 'スクリプトを読む' : 'Read the transcript'}</summary><p>{question.audio}</p></details>{voiceError && <p role="status">{voiceError}</p>}</div>}
      <div className="ac-practice-options">{question.options.map((option, optionIndex) => <label key={optionIndex}>
        <input type="radio" name={question.id} value={optionIndex} checked={value?.choice === optionIndex} onChange={() => change({ choice:optionIndex, checked:false })}/>
        <span><PracticeText text={option}/></span>
      </label>)}</div>
    </fieldset>
    <button className="ac-practice-check" type="submit" disabled={!value || value.choice >= question.options.length}>{ja ? '答えを確認' : 'Check answer'}</button>
    {checked && <aside className="ac-practice-feedback" role="status"><strong>{value.choice === question.answer ? (ja ? 'その通りです。' : 'That fits this situation.') : (ja ? '例と比べてみましょう。' : 'Compare the choices.')}</strong><p><strong>{question.options[question.answer].replace(/\*\*/g,'')}</strong> — <PracticeText text={question.explanation}/></p><button type="button" className="ac-practice-retry" onClick={() => change(undefined)}>{ja ? 'もう一度試す' : 'Try again'}</button></aside>}
  </form>
}

export default function ApplicationPractice({ id, title, intro, questions, reflection, topic }) {
  const { language } = useLanguage(), ja = language === 'ja'
  const [state, setState] = useState(() => { try { return readApplicationPractice(window.localStorage) } catch { return readApplicationPractice(null) } })
  const latest = useRef(state)
  const [stored, setStored] = useState(true)
  const update = fn => {
    const next = fn(latest.current); latest.current = next; setState(next)
    try { window.localStorage.setItem(APPLICATION_PRACTICE_KEY, JSON.stringify(next)); setStored(true) } catch { setStored(false) }
  }
  return <div className="ac-practice">
    <header className="ac-practice-heading"><p>{ja ? '練習' : 'PRACTICE'}{topic ? ' · ' + topic : ''}</p><h1>{title}</h1><p>{intro}</p></header>
    {questions.map((question, index) => <Question key={question.id} question={question} index={index} ja={ja} value={state.answers[question.id]} change={answer => update(previous => ({ ...previous, answers:{ ...previous.answers, [question.id]:answer } }))}/>)}
    {reflection && <section className="ac-practice-transfer"><h2>{ja ? '自分の場面で使う' : 'Try it in your own situation'}</h2><label htmlFor={'practice-note-' + id}>{reflection}</label><textarea id={'practice-note-' + id} rows={5} maxLength={6000} value={state.notes[id] || ''} onChange={event => { const value = event.target.value; update(previous => ({ ...previous, notes:{ ...previous.notes, [id]:value } })) }}/><small role="status">{stored ? (ja ? 'メモはこの端末に保存されます。' : 'Your notes are saved on this device.') : (ja ? '保存できません。移動前にメモをコピーしてください。' : 'Storage is unavailable. Copy your notes before leaving.')}</small></section>}
  </div>
}
