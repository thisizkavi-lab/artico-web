// A lightweight, permission-free Google Calendar event composer for a study routine.
// All date and recurrence calculations use the learner's device-local time.
export const CALENDAR_RESPONSE_KEY = 'progress-calendar-schedule'
export const WEEKDAYS = Object.freeze(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])
const TIME_FORMAT = /^([01]\d|2[0-3]):[0-5]\d$/
export const DEFAULT_START_TIME = '19:00'

export function defaultCalendarSchedule(plannedDays = 5) {
  const days = plannedDays === 7 ? [...WEEKDAYS]
    : plannedDays === 3 ? ['MO', 'WE', 'FR']
    : ['MO', 'TU', 'WE', 'TH', 'FR']
  return { days, time: DEFAULT_START_TIME }
}

export function normalizeCalendarSchedule(input, plannedDays = 5) {
  const fallback = defaultCalendarSchedule(plannedDays)
  if (!input || typeof input !== 'object') return fallback
  const days = Array.isArray(input.days)
    ? WEEKDAYS.filter(day => input.days.includes(day))
    : fallback.days
  return {
    days: days.length ? days : fallback.days,
    time: typeof input.time === 'string' && TIME_FORMAT.test(input.time)
      ? input.time : fallback.time,
  }
}

export function readCalendarSchedule(raw, plannedDays = 5) {
  if (typeof raw !== 'string' || raw.length > 1000) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed?.v === 1 ? normalizeCalendarSchedule(parsed, plannedDays) : null
  } catch { return null }
}

export function serializeCalendarSchedule(input, plannedDays = 5) {
  return JSON.stringify({ v: 1, ...normalizeCalendarSchedule(input, plannedDays) })
}

// Find the next occurrence strictly after now, including today's slot when it
// has not yet started. Date's local constructor handles month/year rollover.
export function nextCalendarSession(input, now = new Date()) {
  const schedule = normalizeCalendarSchedule(input)
  const [hour, minute] = schedule.time.split(':').map(Number)
  for (let offset = 0; offset <= 7; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, hour, minute, 0)
    const day = WEEKDAYS[(date.getDay() + 6) % 7]
    if (schedule.days.includes(day) && date.getTime() > now.getTime()) return date
  }
  return null
}

const pad = value => String(value).padStart(2, '0')
const calendarStamp = date =>
  String(date.getFullYear()) + pad(date.getMonth() + 1) + pad(date.getDate()) +
  'T' + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds())

// Google opens a prefilled, editable event. No event is created until the
// learner clicks Save in Google Calendar, and no Google account is connected.
export function googleCalendarScheduleUrl(input, plan, language = 'en', now = new Date(), timeZone) {
  if (!input || !Array.isArray(input.days) || !input.days.length) return null
  const schedule = normalizeCalendarSchedule(input)
  const minutes = Number.isInteger(plan?.minutes) && plan.minutes >= 15 && plan.minutes <= 180
    ? plan.minutes : 30
  const start = nextCalendarSession(schedule, now)
  if (!start) return null
  const end = new Date(start.getTime() + minutes * 60000)
  const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  const study = Number.isFinite(plan?.studyMinutes) ? plan.studyMinutes : Math.round(minutes / 3)
  const practice = Number.isFinite(plan?.practiceMinutes) ? plan.practiceMinutes : minutes - study
  const isJapanese = language === 'ja'
  const summary = isJapanese ? 'Artico — 英語の学習と練習' : 'Artico — English study & speaking practice'
  const details = isJapanese
    ? '学習 ' + study + ' 分 ＋ 声に出す練習 ' + practice + ' 分。\nArtico: https://thisizkavi-lab.github.io/artico-web/#/progress\n12週間の予定です。変更・削除はGoogleカレンダーで行ってください。'
    : 'Study ' + study + ' min + speaking practice ' + practice + ' min.\nArtico: https://thisizkavi-lab.github.io/artico-web/#/progress\n12-week routine. Change or remove recurring events in Google Calendar.'
  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', summary)
  url.searchParams.set('dates', calendarStamp(start) + '/' + calendarStamp(end))
  url.searchParams.set('ctz', zone)
  url.searchParams.set('details', details)
  url.searchParams.set('recur', 'RRULE:FREQ=WEEKLY;BYDAY=' + schedule.days.join(',') +
    ';COUNT=' + String(schedule.days.length * 12))
  return url.toString()
}
