import test from 'node:test'
import assert from 'node:assert/strict'
import { academicStages, academicLessons, academicGuidedActivities } from './academicCourseData.js'
import { academicJapanese } from './academicCourseJa.js'
import { readAcademicDraft, saveAcademicDraft, ACADEMIC_DRAFT_LIMIT } from './academicDrafts.js'
import { sanitizeLearning } from './learning.js'

test('academic course has six ordered stages and 33 unique complete lessons',()=>{
  assert.equal(academicStages.length,6)
  assert.equal(academicLessons.length,33)
  assert.equal(new Set(academicLessons.map(l=>l.id)).size,33)
  assert.deepEqual(academicStages.map(s=>s.id),['01','02','03','04','05','06'])
  for(const l of academicLessons){
    assert.match(l.id,/^0[1-6]\.\d{2}$/)
    assert.equal(l.stage,l.id.slice(0,2))
    for(const name of ['title','ja','question','idea','example','language','caution','task','model']){
      assert.ok(l[name]?.length>15,l.id+' missing '+name)
    }
    assert.equal(l.criteria.length,3)
    assert.ok(l.criteria.every(s=>s.length>8))
    assert.ok(academicJapanese[l.id]?.summary?.length>15,l.id+' Japanese explanation')
    assert.ok(academicJapanese[l.id]?.task?.length>15,l.id+' Japanese practice prompt')
  }
})
test('guided activities have reachable and valid answers',()=>{
  for(const [id,activity] of Object.entries(academicGuidedActivities)){
    assert.ok(academicLessons.find(l=>l.id===id),id+' orphan')
    if(activity.kind==='choice'){
      assert.ok(activity.options.length>=2)
      assert.ok(activity.correct>=0 && activity.correct<activity.options.length)
    } else if(activity.kind==='order') {
      assert.deepEqual([...activity.correct].sort((a,b)=>a-b),activity.items.map((_,i)=>i))
    } else assert.fail('unexpected guided activity '+activity.kind)
    assert.ok(activity.why.length>15)
  }
})
test('long drafts remain separate, persistent and validated',()=>{
  const saved=new Map()
  const storage={
    getItem:key=>saved.has(key)?saved.get(key):null,
    setItem:(key,value)=>saved.set(key,value),
    removeItem:key=>saved.delete(key)
  }
  assert.equal(saveAcademicDraft(storage,'01.01','draft 1'),true)
  assert.equal(saveAcademicDraft(storage,'01.02','draft 2'),true)
  assert.equal(readAcademicDraft(storage,'01.01'),'draft 1')
  assert.equal(readAcademicDraft(storage,'01.02'),'draft 2')
  assert.equal(saveAcademicDraft(storage,'01.01',''),true)
  assert.equal(readAcademicDraft(storage,'01.01'),'')
  assert.equal(readAcademicDraft(storage,'missing'),'')
  assert.equal(saveAcademicDraft(storage,'01.01','x'.repeat(ACADEMIC_DRAFT_LIMIT+1)),false)
  assert.equal(saveAcademicDraft({setItem(){throw Error('quota')}},'01.01','a'),false)
})
test('learning state keeps academic location and completion, rejects invalid keys',()=>{
  const s=sanitizeLearning({version:1,responses:{
    'application-academic-location':'05.03',
    'application-academic-done-05.03':'1',
    'application-academic-done-09.99':'1',
    'application-academic-done-05.03-extraneous':'1',
    'application-academic-0':'legacy'
  }})
  assert.equal(s.responses['application-academic-location'],'05.03')
  assert.equal(s.responses['application-academic-done-05.03'],'1')
  assert.equal(s.responses['application-academic-0'],'legacy')
  assert.equal(s.responses['application-academic-done-09.99'],undefined)
  assert.equal(s.responses['application-academic-done-05.03-extraneous'],undefined)
})
