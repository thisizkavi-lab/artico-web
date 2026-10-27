import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { sanitizeLearning, emptyLearning } from './learning.js'

const dir = dirname(fileURLToPath(import.meta.url))
const load = name => JSON.parse(readFileSync(join(dir, name),'utf8'))
const source=load('jobsCourseOutline.json')
const en=Object.assign({},...['jobsCopy01.json','jobsCopy02.json','jobsCopy03.json','jobsCopy04.json','jobsCopy05.json'].map(load))
const ja=load('jobsCopyJa.json')

test('Jobs course has eight stages and 61 unique, ordered lessons',()=>{
  assert.equal(source.units.length,8)
  assert.equal(source.lessons.length,61)
  assert.equal(new Set(source.lessons.map(x=>x.id)).size,61)
  const flattened=source.units.flatMap(u=>source.lessons.filter(l=>l.unit_id===u.id).map(l=>l.id))
  assert.deepEqual(flattened,source.lessons.map(l=>l.id))
})

test('All Jobs lessons have original content and workbook instructions',()=>{
  for(const l of source.lessons){
    assert.ok(en[l.id],'Missing English '+l.id)
    assert.ok(ja[l.id],'Missing Japanese '+l.id)
    for(const field of ['intro','example','language','watch'])assert.ok(en[l.id][field].trim(),l.id+' '+field)
    for(const field of ['question','action','artifact','outcome'])assert.ok(l[field].trim(),l.id+' '+field)
  }
  assert.equal(Object.keys(en).length,61)
  assert.equal(Object.keys(ja).length,61)
})

test('Saved Jobs drafts and capstone choices survive sanitization',()=>{
  const responses={
    'application-jobs-location':'8.3',
    'application-jobs-role':'developer',
    'application-jobs-note-3.7':'A'.repeat(4900),
    'application-jobs-done-3.7':'1',
    'application-jobs-note-9.1':'invalid extra',
  }
  const cleaned=sanitizeLearning({...emptyLearning,responses})
  assert.equal(cleaned.responses['application-jobs-location'],'8.3')
  assert.equal(cleaned.responses['application-jobs-role'],'developer')
  assert.equal(cleaned.responses['application-jobs-note-3.7'].length,4900)
  assert.equal(cleaned.responses['application-jobs-done-3.7'],'1')
  assert.equal(cleaned.responses['application-jobs-note-9.1'],undefined)
})
