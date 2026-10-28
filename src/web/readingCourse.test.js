import test from 'node:test'
import assert from 'node:assert/strict'
import { readingCollections, readingTexts, readingTextById, readingTiers } from './readingContent.js'
import { parseRoute, visit, emptyLearning } from './learning.js'

test('Reading library has six populated collections, unique routes and checked question keys',()=>{
  assert.equal(readingCollections.length,6)
  assert.equal(new Set(readingCollections.map(c=>c.id)).size,6)
  assert.ok(readingTexts.length>=18)
  assert.equal(new Set(readingTexts.map(t=>t.id)).size,readingTexts.length)
  for(const col of readingCollections)assert.ok(readingTexts.filter(t=>t.collection===col.id).length>=3,col.id)
  for(const text of readingTexts){
    assert.ok(readingTextById[text.id]===text)
    assert.ok(readingTiers.includes(text.tier))
    assert.ok(text.paragraphs.length>0)
    assert.ok(text.paragraphs.every(p=>typeof p==='string'&&p.trim().length>0))
    assert.ok(Object.keys(text.glossary).length>=3)
    assert.equal(text.questions.length,2)
    for(const q of text.questions){
      assert.ok(q.q.length>5 && q.why.length>8)
      assert.equal(q.options.length,3)
      assert.ok(q.options.every(Boolean))
      assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length)
    }
  }
})
test('Reading Study and Practice deep links resolve and preserve last visits',()=>{
  for(const mode of ['study','practice']){
    const route=parseRoute('#/application/reading/stories/'+mode+'?text=future-letter')
    assert.equal(route.page,'application')
    assert.equal(route.id,'reading')
    assert.equal(route.collection,'stories')
    assert.equal(route.text,'future-letter')
    assert.equal(route.view,mode)
    const state=visit({...emptyLearning},route.path)
    assert.equal(state.last,route.path)
    if(mode==='practice')assert.equal(state.lastPractice,route.path)
  }
})
test('Invalid reading deep links cannot choose arbitrary sections or external paths',()=>{
  assert.equal(parseRoute('#/application/reading/unknown/practice').path,'/application')
  assert.equal(parseRoute('#/application/reading/short/study?text=bad%2Fpath').text,undefined)
  assert.equal(parseRoute('#/application/reading/short/study/extra').path,'/application/reading')
})
