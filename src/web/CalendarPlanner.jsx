import { useState } from 'react'
import { useLanguage } from './Language'
import {
  CALENDAR_RESPONSE_KEY, WEEKDAYS, defaultCalendarSchedule,
  readCalendarSchedule, serializeCalendarSchedule, googleCalendarScheduleUrl,
} from './calendarSchedule'
import { DEFAULT_PLAN, buildStudyPlan } from './studyPlan'

const labels = {
  en: {
    heading: 'Make time for English',
    lead: 'Choose when you can actually learn. Add your routine to Google Calendar in one step.',
    days: 'Study days', time: 'Start time', minutes: 'Each session',
    add: 'Open Google Calendar', notes: 'A repeating event for 12 weeks. Review it and press Save in Google Calendar.',
    mismatch: 'Your study goal is {goal} days/week; this schedule has {actual}.',
    timezone: 'Times use your device time zone', saved: 'Your preferred time is saved in this browser.',
    planned: 'A scheduled session is not proof of completed study.',
    plan: 'Adjust session length', noDays: 'Select at least one day.',
  },
  ja: {
    heading: '英語の学習時間を決める',
    lead: '続けやすい曜日と時間を選んで、Googleカレンダーに登録しましょう。',
    days: '学習する曜日', time: '開始時間', minutes: '1回の学習時間',
    add: 'Googleカレンダーで開く', notes: '12週間の繰り返し予定です。Googleカレンダーで内容を確認して「保存」してください。',
    mismatch: '学習目標は週{goal}日ですが、ここでは週{actual}日を選んでいます。',
    timezone: '端末のタイムゾーンを使用', saved: 'この端末に学習予定を保存しました。',
    planned: '予定は、実際に学習した記録ではありません。',
    plan: '学習時間を変更', noDays: '曜日を1つ以上選んでください。',
  },
}
const dayNames = {
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ja: ['月', '火', '水', '木', '金', '土', '日'],
}
const fullDayNames = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ja: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
}

export default function CalendarPlanner({ learning, update, plan }) {
  const { language } = useLanguage()
  const l = labels[language] ?? labels.en
  const effectivePlan = plan ?? buildStudyPlan(DEFAULT_PLAN)
  const raw = learning.responses?.[CALENDAR_RESPONSE_KEY]
  const stored = readCalendarSchedule(raw, effectivePlan.days)
  const [draft, setDraft] = useState(() => stored ?? defaultCalendarSchedule(effectivePlan.days))
  const [justSaved, setJustSaved] = useState(false)
  const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  const link = googleCalendarScheduleUrl(draft, effectivePlan, language, new Date(), deviceZone)
  const count = draft.days.length
  const mismatch = plan && count !== plan.days
  const toggleDay = day => {
    setDraft(current => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter(item => item !== day)
        : WEEKDAYS.filter(item => current.days.includes(item) || item === day),
    }))
    setJustSaved(false)
  }
  const store = () => {
    if (!draft.days.length) return
    update(current => ({
      ...current,
      responses: {
        ...current.responses,
        [CALENDAR_RESPONSE_KEY]: serializeCalendarSchedule(draft, effectivePlan.days),
      },
    }))
    setJustSaved(true)
  }

  return (
    <div className="aw-calendar-planner" id="aw-progress-calendar-editor">
      <div className="aw-calendar-planner-heading">
        <div>
          <h3>{l.heading}</h3>
          <p>{l.lead}</p>
        </div>
        <span className="aw-calendar-planner-length">{effectivePlan.minutes} min</span>
      </div>
      <div className="aw-calendar-planner-fields">
        <div className="aw-calendar-planner-days">
          <span className="aw-calendar-label">{l.days}</span>
          <div className="aw-calendar-days" role="group" aria-label={l.days}>
            {WEEKDAYS.map((day, index) => (
              <button key={day} type="button" className={draft.days.includes(day) ? 'is-active' : ''}
                aria-label={fullDayNames[language][index]} aria-pressed={draft.days.includes(day)}
                onClick={() => toggleDay(day)}>
                {dayNames[language][index]}
              </button>
            ))}
          </div>
        </div>
        <label className="aw-calendar-time">
          <span className="aw-calendar-label">{l.time}</span>
          <input type="time" value={draft.time}
            onChange={event => { setDraft(current => ({ ...current, time: event.target.value })); setJustSaved(false) }} />
        </label>
      </div>
      <div className="aw-calendar-plan-hint">
        <span>{l.minutes}: <strong>{effectivePlan.minutes} min</strong></span>
        <a href="#/foundation/how-it-works/practice">{l.plan} →</a>
      </div>
      {mismatch && <p className="aw-calendar-hint">
        {l.mismatch.replace('{goal}', String(plan.days)).replace('{actual}', String(count))}
      </p>}
      {!count && <p className="aw-calendar-hint" role="alert">{l.noDays}</p>}
      <div className="aw-calendar-planner-footer">
        <a className={'aw-calendar-google' + (!link ? ' is-disabled' : '')}
          href={link ?? undefined} target="_blank" rel="noopener noreferrer"
          aria-disabled={!link} tabIndex={link ? 0 : -1}
          onClick={event => { if (!link) event.preventDefault(); else store() }}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
            <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M3 10h18M8 3v4m8-4v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 13v5m-2.5-2.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          {l.add} <span aria-hidden="true">↗</span>
        </a>
        <span className="aw-calendar-note">{l.notes}</span>
      </div>
      {justSaved && <p className="aw-calendar-saved" role="status">{l.saved}</p>}
      <p className="aw-calendar-footer-note">{l.timezone}: {deviceZone}. {l.planned}</p>
    </div>
  )
}
