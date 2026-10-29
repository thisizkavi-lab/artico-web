import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CALENDAR_RESPONSE_KEY, WEEKDAYS, defaultCalendarSchedule,
  normalizeCalendarSchedule, readCalendarSchedule, serializeCalendarSchedule,
  nextCalendarSession, googleCalendarScheduleUrl,
} from './calendarSchedule.js'
import { buildStudyPlan } from './studyPlan.js'
import { emptyLearning, sanitizeLearning } from './learning.js'

test('calendar routine has safe defaults and validates saved data', () => {
  assert.deepEqual(defaultCalendarSchedule(3).days, ['MO', 'WE', 'FR'])
  assert.deepEqual(defaultCalendarSchedule(5).days, ['MO', 'TU', 'WE', 'TH', 'FR'])
  assert.deepEqual(defaultCalendarSchedule(7).days, WEEKDAYS)
  assert.deepEqual(normalizeCalendarSchedule({
    days: ['FR', 'MO', 'FR', 'BAD'], time: '07:45',
  }), { days: ['MO', 'FR'], time: '07:45' })
  assert.deepEqual(normalizeCalendarSchedule({ days: [], time: '30:80' }), defaultCalendarSchedule())
  assert.equal(readCalendarSchedule('{"v":2}'), null)
  assert.equal(readCalendarSchedule('broken'), null)
  assert.equal(readCalendarSchedule('x'.repeat(1001)), null)
  assert.equal(readCalendarSchedule(null), null)
})

test('saved calendar preference persists through the lesson storage sanitizer', () => {
  const value = serializeCalendarSchedule({ days: ['TU', 'SA'], time: '21:00' })
  const learning = sanitizeLearning({ ...emptyLearning, responses: {
    [CALENDAR_RESPONSE_KEY]: value, 'unsafe-other-key': 'no',
  } })
  assert.equal(learning.responses[CALENDAR_RESPONSE_KEY], value)
  assert.equal(learning.responses['unsafe-other-key'], undefined)
  assert.deepEqual(readCalendarSchedule(value), { days: ['TU', 'SA'], time: '21:00' })
})

test('next session respects time of day, selected weekdays and week rollover', () => {
  const input = { days: ['TH', 'MO'], time: '19:00' }
  const before = nextCalendarSession(input, new Date(2026, 9, 29, 18, 0))
  assert.equal(before.getDay(), 4)
  assert.equal(before.getDate(), 29)
  assert.equal(before.getHours(), 19)
  const after = nextCalendarSession(input, new Date(2026, 9, 29, 20, 0))
  assert.equal(after.getDay(), 1)
  assert.equal(after.getDate(), 2)
  assert.equal(after.getMonth(), 10)
})

test('Google Calendar composer receives a recurring 12-week event and correct duration', () => {
  const schedule = { days: ['MO', 'WE', 'FR'], time: '23:45' }
  const plan = buildStudyPlan({ minutes: 90, days: 3, focus: 'speaking', level: 'new' })
  const link = googleCalendarScheduleUrl(schedule, plan, 'en', new Date(2026, 9, 29, 18, 0), 'Asia/Tokyo')
  const url = new URL(link)
  assert.equal(url.origin, 'https://calendar.google.com')
  assert.equal(url.searchParams.get('action'), 'TEMPLATE')
  assert.equal(url.searchParams.get('ctz'), 'Asia/Tokyo')
  assert.equal(url.searchParams.get('recur'), 'RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=36')
  assert.match(url.searchParams.get('dates'), /^20261030T234500\/20261031T011500$/)
  assert.match(url.searchParams.get('details'), /Study 30 min \+ speaking practice 60 min/)
  assert.equal(googleCalendarScheduleUrl({ days: [], time: '19:00' }, plan), null)
})
