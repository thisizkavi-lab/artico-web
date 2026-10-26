import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  PLAN_RESPONSE_KEY, DEFAULT_PLAN, FOCUSES, STARTS, MINUTE_OPTIONS, DAY_OPTIONS,
  normalizeStudyPlan, readStudyPlan, serializeStudyPlan, buildStudyPlan,
} from './studyPlan.js'
import { emptyLearning, sanitizeLearning } from './learning.js'

test('study and speaking time always add to each selected daily budget', () => {
  for (const minutes of MINUTE_OPTIONS) {
    for (const days of DAY_OPTIONS) {
      for (const focus of Object.keys(FOCUSES)) {
        const plan = buildStudyPlan({ minutes, days, focus, start:'conversation' })
        assert.equal(plan.studyMinutes + plan.practiceMinutes, minutes)
        assert.ok(plan.studyMinutes >= 5)
        assert.ok(plan.practiceMinutes >= 5)
        assert.equal(plan.studyMinutes % 5, 0)
        assert.equal(plan.practiceMinutes % 5, 0)
        assert.deepEqual(plan.milestones.map(x => x.weeks), [4,8,12])
        assert.deepEqual(plan.milestones.map(x => x.sessions), [days * 4, days * 8, days * 12])
        for (const mark of plan.milestones) {
          const expected = Math.round(minutes * days * mark.weeks / 60 * 10) / 10
          assert.equal(mark.totalHours, expected)
          assert.ok(mark.challengeJa && mark.challengeEn)
          assert.ok(mark.practiceHours >= 0)
          assert.ok(mark.studyHours >= 0)
        }
        assert.equal(plan.totalHours, plan.milestones[2].totalHours)
        assert.ok(plan.milestones[0].totalHours <= plan.milestones[1].totalHours)
        assert.ok(plan.milestones[1].totalHours <= plan.milestones[2].totalHours)
      }
    }
  }
})
test('90 minutes over five days splits into 30 minutes study and 60 minutes practice', () => {
  const plan = buildStudyPlan({ minutes:90, days:5, focus:'speaking', start:'conversation' })
  assert.deepEqual([plan.studyMinutes, plan.practiceMinutes, plan.weeklyHours, plan.totalHours], [30,60,7.5,90])
  assert.deepEqual(plan.milestones.map(m=>m.totalHours),[30,60,90])
  assert.equal(plan.milestones[2].practiceHours, 60)
})
test('conservative defaults and inputs are validated; all start choices point at valid lessons', () => {
  assert.deepEqual(normalizeStudyPlan(null),DEFAULT_PLAN)
  assert.deepEqual(normalizeStudyPlan({ minutes:0,days:99,focus:'invalid',start:'__proto__' }),DEFAULT_PLAN)
  assert.equal(readStudyPlan('bad json'),null)
  assert.equal(readStudyPlan(JSON.stringify({ v:2 })),null)
  assert.equal(readStudyPlan(null),null)
  for(const [key,value] of Object.entries(STARTS)) {
    assert.ok(value.path.startsWith('/foundation/') || value.path.startsWith('/lesson/'))
    const plan = buildStudyPlan({ ...DEFAULT_PLAN,start:key })
    assert.equal(plan.route,value.path)
  }
})
test('saving a study plan survives Artico learning-state sanitization and reload', () => {
  const plan = { minutes:45,days:3,focus:'balanced',start:'sounds' }
  const raw = serializeStudyPlan(plan)
  const learning = sanitizeLearning({ ...emptyLearning,responses:{
    [PLAN_RESPONSE_KEY]:raw,
    'foundation-orientation-profile':'{"v":1}',
    'bad-unrelated-key':raw,
  } })
  assert.equal(learning.responses[PLAN_RESPONSE_KEY],raw)
  assert.deepEqual(readStudyPlan(learning.responses[PLAN_RESPONSE_KEY]),plan)
  assert.equal(learning.responses['bad-unrelated-key'],undefined)
  assert.equal(serializeStudyPlan(readStudyPlan(raw)),raw)
})
test('How Artico Works practice renders calculator, saves plan, and has working lesson launch', () => {
  const f=readFileSync(new URL('./Foundation.jsx',import.meta.url),'utf8')
  const jsx=readFileSync(new URL('./StudyPlan.jsx',import.meta.url),'utf8')
  assert.match(f,/id === 'how-it-works'\) return <StudyPlan learning={learning} update={update} \/>/)
  assert.doesNotMatch(f,/<div className="rf-start-options">/)
  assert.match(jsx,/onClick={save}/)
  assert.match(jsx,/href={'#' \+ plan.route}/)
  assert.match(jsx,/\[PLAN_RESPONSE_KEY\]:currentSerialized/)
  assert.match(jsx,/plan.milestones.map/)
  assert.match(jsx,/plan.studyMinutes/)
  assert.match(jsx,/plan.practiceMinutes/)
})
