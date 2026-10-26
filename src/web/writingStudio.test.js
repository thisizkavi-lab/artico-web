import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  WRITING_DRAFT_PREFIX,
  WRITING_DRAFT_LIMIT,
  readWritingDraft,
  saveWritingDraft,
  listWritingDraftIds,
  writingWordCount,
} from './writingDrafts.js'

const data=JSON.parse(readFileSync(new URL('./writingPrompts.json',import.meta.url),'utf8'))

function memoryStorage() {
  const entries=new Map()
  return {
    getItem:key => entries.has(key) ? entries.get(key) : null,
    setItem:(key,value) => {entries.set(key,String(value))},
    removeItem:key => {entries.delete(key)},
    get size(){return entries.size},
  }
}

test('Writing preserves all 215 source prompts within the original 14 categories',()=>{
  assert.equal(data.count,215)
  assert.equal(data.prompts.length,215)
  assert.equal(data.categories.length,14)
  assert.deepEqual(data.categories.map(cat=>cat.count),[22,22,18,26,13,9,13,10,17,7,19,21,17,1])
  assert.equal(new Set(data.prompts.map(p=>p.id)).size,215)
  assert.ok(data.categories.every(cat=>cat.ja && cat.title))
  const seen=new Set(data.categories.map(cat=>cat.id))
  assert.ok(data.prompts.every(p=>seen.has(p.category) && p.title && p.prompt))
  for(const cat of data.categories){
    const prompts=data.prompts.filter(p=>p.category===cat.id)
    assert.equal(prompts.length,cat.count)
    assert.deepEqual(prompts.map((p,i)=>p.id),prompts.map((_,i)=>cat.id+'-'+String(i+1).padStart(3,'0')))
  }
  assert.equal(data.prompts.filter(p=>p.section==='Personal letters').length,12)
  assert.equal(data.prompts.filter(p=>p.section==='Formal and practical letters').length,9)
  assert.match(data.prompts[0].prompt,/introduction to yourself/)
  assert.match(data.prompts.at(-1).prompt,/everyday object/)
})

test('writing drafts are independent, persistent, editable and removable',()=>{
  const store=memoryStorage()
  const first='c01-001',second='c12-003'
  assert.equal(readWritingDraft(store,first),'')
  assert.equal(saveWritingDraft(store,first,'My own introduction.'),true)
  assert.equal(saveWritingDraft(store,second,'Dear friend,'),true)
  assert.equal(readWritingDraft(store,first),'My own introduction.')
  assert.equal(readWritingDraft(store,second),'Dear friend,')
  assert.deepEqual([...listWritingDraftIds(store,[first,second])],[first,second])
  assert.equal(saveWritingDraft(store,first,'My revised introduction.'),true)
  assert.equal(readWritingDraft(store,first),'My revised introduction.')
  assert.equal(saveWritingDraft(store,first,''),true)
  assert.equal(readWritingDraft(store,first),'')
  assert.deepEqual([...listWritingDraftIds(store,[first,second])],[second])
  assert.equal(store.getItem(WRITING_DRAFT_PREFIX+first),null)
})

test('writing storage rejects unknown keys, oversized drafts and unavailable storage',()=>{
  const store=memoryStorage()
  assert.equal(saveWritingDraft(store,'__proto__','invalid'),false)
  assert.equal(saveWritingDraft(store,'c20-001','invalid'),false)
  assert.equal(saveWritingDraft(store,'c01-001','a'.repeat(WRITING_DRAFT_LIMIT+1)),false)
  assert.equal(store.size,0)
  assert.equal(writingWordCount(''),0)
  assert.equal(writingWordCount('One  two\nthree'),3)
  const unavailable={
    getItem:()=>{throw Error('private mode')},
    setItem:()=>{throw Error('quota')},
    removeItem:()=>{throw Error('private mode')},
  }
  assert.equal(readWritingDraft(unavailable,'c01-001'),'')
  assert.equal(saveWritingDraft(unavailable,'c01-001','hello'),false)
  assert.deepEqual([...listWritingDraftIds(unavailable,['c01-001'])],[])
})

test('Writing uses a searchable, bilingual and responsive editor rather than two stub tasks',()=>{
  const application=readFileSync(new URL('./Application.jsx',import.meta.url),'utf8')
  const ui=readFileSync(new URL('./WritingStudio.jsx',import.meta.url),'utf8')
  const css=readFileSync(new URL('./writing-studio.css',import.meta.url),'utf8')
  assert.match(application,/route\.id === 'writing'\) return <WritingStudio/)
  assert.match(ui,/writingData\.json|writingPrompts\.json/)
  assert.match(ui,/categories\.map\(c =>/)
  assert.match(ui,/visible\.map\(\(prompt,index\) =>/)
  assert.match(ui,/setCategory\('all'\)/)
  assert.match(ui,/saveWritingDraft\(window\.localStorage, prompt\.id, text\)/)
  assert.match(ui,/key=\{selected\.id\}/)
  assert.match(ui,/writingWordCount\(draft\)/)
  assert.match(ui,/navigator\.clipboard\.writeText\(draft\)/)
  assert.match(ui,/maxLength=\{WRITING_DRAFT_LIMIT\}/)
  assert.match(css,/@media\(max-width:800px\)/)
  assert.doesNotMatch(ui,/AI grading|score prediction|locked/i)
})
