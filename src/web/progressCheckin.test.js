import test from 'node:test'
import assert from 'node:assert/strict'
import { CHECKIN_RESPONSE_KEY, parseCheckins, saveCheckin } from './progressCheckin.js'

test('self-assessment uses a separate response key and preserves repeatable check-ins', () => {
  assert.equal(CHECKIN_RESPONSE_KEY, 'progress-self-check')
  const first = { date: '2026-10-20', challenge: 'thinker', rating: 'with-help' }
  const latest = { date: '2026-10-29', challenge: 'thinker', rating: 'on-my-own' }
  assert.deepEqual(saveCheckin([first], latest), [first, latest])
  assert.deepEqual(parseCheckins(JSON.stringify({ v: 1, history: [first, latest] })), [first, latest])
})

test('a second answer on the same day updates the check-in rather than inflating history', () => {
  const before = { date: '2026-10-29', challenge: 'starter', rating: 'not-yet' }
  assert.deepEqual(saveCheckin([before], { ...before, rating: 'with-help' }),
    [{ ...before, rating: 'with-help' }])
})

test('invalid or unsafe saved responses are ignored', () => {
  assert.deepEqual(parseCheckins('bad json'), [])
  assert.deepEqual(parseCheckins('{}'), [])
  assert.deepEqual(parseCheckins('x'.repeat(5001)), [])
  const bad = [
    { date: '2026-02-30', challenge: 'thinker', rating: 'with-help' },
    { date: '2026-10-20', challenge: '__proto__', rating: 'with-help' },
    { date: '2026-10-20', challenge: 'thinker', rating: 'perfect' },
  ]
  assert.deepEqual(parseCheckins(JSON.stringify({ v: 1, history: bad })), [])
  assert.equal(saveCheckin([], { date: '2026-10-29', challenge: 'starter', rating: 'not-yet' }).length, 1)
})
