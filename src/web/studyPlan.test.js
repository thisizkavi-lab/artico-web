import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  PLAN_RESPONSE_KEY, DEFAULT_PLAN, FOCUSES, LEVELS, MINUTE_OPTIONS, DAY_OPTIONS,
  normalizeStudyPlan, readStudyPlan, serializeStudyPlan,
  buildStudyPlan, buildStudyOutlook,
} from './studyPlan.js'
import { emptyLearning, sanitizeLearning } from './learning.js'

test('all routines add up and forecast only scheduled hours', () => {
  for(const minutes of MINUTE_OPTIONS) for(const days of DAY_OPTIONS) {
    for(const focus of Object.keys(FOCUSES)) for(const level of Object.keys(LEVELS)) {
      const plan=buildStudyPlan({minutes,days,focus,level})
      assert.equal(plan.studyMinutes + plan.practiceMinutes, minutes)
      assert.ok(plan.studyMinutes >= 5 && plan.practiceMinutes >= 5)
      assert.equal(plan.studyMinutes % 5,0)
      assert.equal(plan.practiceMinutes % 5,0)
      assert.deepEqual(plan.milestones.map(m=>m.weeks),[4,8,12])
      assert.deepEqual(plan.milestones.map(m=>m.sessions),[4*days,8*days,12*days])
      for(const milestone of plan.milestones) {
        assert.equal(milestone.totalHours,Math.round(minutes*days*milestone.weeks/60*10)/10)
        assert.ok(milestone.challengeJa && milestone.challengeEn)
      }
      assert.equal(plan.totalHours,plan.milestones[2].totalHours)
      assert.equal(plan.outlook.level,level)
      assert.equal(plan.outlook.basisPracticeHours,plan.milestones[2].practiceHours)
      assert.ok(plan.outlook.ja && plan.outlook.en)
      assert.ok(plan.outlook.exampleJa && plan.outlook.exampleEn)
    }
  }
})
test('90 minutes over five days: thirty study, sixty active practice, ninety hours in 12 weeks',()=>{
  const plan=buildStudyPlan({minutes:90,days:5,focus:'speaking',level:'new'})
  assert.deepEqual([plan.studyMinutes,plan.practiceMinutes,plan.weeklyHours,plan.totalHours],[30,60,7.5,90])
  assert.deepEqual(plan.milestones.map(m=>m.totalHours),[30,60,90])
  assert.equal(plan.milestones[2].practiceHours,60)
})
test('same planned practice produces different goals based on self-described starting level',()=>{
  const results=Object.keys(LEVELS).map(level => buildStudyOutlook(level,36))
  assert.equal(new Set(results.map(result=>result.en)).size,3)
  assert.ok(results.every(result=>result.basisPracticeHours===36))
  assert.notEqual(buildStudyOutlook('new',2).en,buildStudyOutlook('new',70).en)
})
test('validate saved inputs, including existing version-one plans without a level field',()=>{
  assert.deepEqual(normalizeStudyPlan(null),DEFAULT_PLAN)
  assert.deepEqual(normalizeStudyPlan({minutes:0,days:8,focus:'INVALID',level:'__proto__'}),DEFAULT_PLAN)
  assert.equal(readStudyPlan('bad JSON'),null)
  assert.equal(readStudyPlan(JSON.stringify({v:2})),null)
  assert.equal(readStudyPlan(null),null)
  const legacy=JSON.stringify({v:1,minutes:45,days:3,focus:'balanced',start:'sounds'})
  assert.deepEqual(readStudyPlan(legacy),{minutes:45,days:3,focus:'balanced',level:'new'})
})
test('saved plan survives browser storage sanitization and retains other lesson responses',()=>{
  const settings={minutes:45,days:3,focus:'balanced',level:'basics'}
  const raw=serializeStudyPlan(settings)
  const data=sanitizeLearning({...emptyLearning,responses:{
    [PLAN_RESPONSE_KEY]:raw,'foundation-orientation-profile':'{"v":1}',
    'not-valid':raw,
  }})
  assert.equal(data.responses[PLAN_RESPONSE_KEY],raw)
  assert.deepEqual(readStudyPlan(data.responses[PLAN_RESPONSE_KEY]),settings)
  assert.equal(data.responses['not-valid'],undefined)
  assert.equal(data.responses['foundation-orientation-profile'],'{"v":1}')
  assert.equal(serializeStudyPlan(readStudyPlan(raw)),raw)
})
test('save reveals the conditional three-month outlook; no starting lesson navigation remains',()=>{
  const foundation=readFileSync(new URL('./Foundation.jsx',import.meta.url),'utf8')
  const jsx=readFileSync(new URL('./StudyPlan.jsx',import.meta.url),'utf8')
  assert.match(foundation,/import StudyPlan from '\.\/StudyPlan\.jsx'/)
  assert.match(foundation,/id === 'how-it-works'\) return <StudyPlan learning={learning} update={update} \/>/)
  assert.doesNotMatch(foundation,/className="rf-start-options"/)
  assert.doesNotMatch(jsx,/href=|STARTS|plan\.route|<a\b/)
  assert.match(jsx,/const \[showOutlook, setShowOutlook\] = useState/)
  assert.match(jsx,/setShowOutlook\(true\)/)
  assert.match(jsx,/\[PLAN_RESPONSE_KEY\]:serializeStudyPlan\(settings\)/)
  assert.match(jsx,/onClick=\{save\}/)
  assert.match(jsx,/onClick=\{\(\) => setShowOutlook\(false\)\}/)
  assert.match(jsx,/plan\.outlook\./)
  assert.match(jsx,/plan\.milestones\.map/)
  assert.match(jsx,/const \[settings, setSettings\] = useState\(\(\) => stored \?\? DEFAULT_PLAN\)/)
})
