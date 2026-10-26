import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parseRoute } from './learning.js'
import { getLessonNavigation } from './pathway.js'
import { countries, placePhrases, placeWords, regions } from './vocabularyLesson01.js'
import { numberGroups } from './vocabularyLesson02.js'

const source=JSON.parse(readFileSync(new URL('./vocabularyCatalog.json',import.meta.url),'utf8'))
const topics=JSON.parse(readFileSync(new URL('./vocabularyTopics.json',import.meta.url),'utf8'))
const japaneseAM=JSON.parse(readFileSync(new URL('./vocabularyJapaneseAM.json',import.meta.url),'utf8'))
const japaneseNZ=JSON.parse(readFileSync(new URL('./vocabularyJapaneseNZ.json',import.meta.url),'utf8'))
const overrides=JSON.parse(readFileSync(new URL('./vocabularyJapaneseOverrides.json',import.meta.url),'utf8'))
const translated={...japaneseAM,...japaneseNZ,...overrides}

test('Vocabulary chapter 97 preserves all 78 source topics and term types',()=>{
  assert.equal(source.chapter,97)
  assert.equal(source.topics.length,78)
  assert.deepEqual(source.topics.map(x=>x.sourceLesson),Array.from({length:78},(_,i)=>i+1))
  assert.ok(source.topics.every(x=>x.topic&&x.ja))
  assert.equal(source.topics.reduce((n,x)=>n+x.core.length,0),3562)
  assert.equal(source.topics.reduce((n,x)=>n+x.extra.length,0),649)
  assert.equal(source.topics.reduce((n,x)=>n+x.variants.length,0),102)
  assert.equal(source.coreCount+source.extraCount,4211)
  assert.equal(source.topics[0].topic,'Countries and nationalities')
  assert.equal(source.topics[77].topic,'Science')
})

test('Japanese equivalents are grounded in CC0 dictionary or curated phrase translations',()=>{
  const words=new Set(source.topics.flatMap(x=>x.core.concat(x.extra)))
  assert.ok(words.size>=3750)
  const translatedWords=[...words].filter(x=>typeof translated[x]==='string'&&translated[x].trim())
  assert.ok(translatedWords.length>=2400, 'Expected substantial English–Japanese dictionary coverage')
  assert.match(overrides['break the ice'],/緊張/)
  assert.match(overrides['go to bed'],/寝る/)
  assert.match(overrides['in my opinion'],/考え/)
  assert.equal(typeof translated['scientist'],'string')
  assert.ok(source.topics.some(t=>t.extra.includes('time zone')))
})

test('Vocabulary directory metadata matches all 78 existing topic titles without including lesson words',()=>{
  assert.deepEqual(topics,source.topics.map(({sourceLesson,topic,ja})=>({sourceLesson,topic,ja})))
  assert.equal(topics.length,78)
  assert.ok(topics.every(topic=>Object.keys(topic).sort().join(',')==='ja,sourceLesson,topic'))
})

test('Lesson 97 supports a directory and direct routes for all 78 lesson pages',()=>{
  assert.deepEqual(parseRoute('#/lesson/97/study'),{path:'/lesson/97/study',page:'vocabulary',id:'97'})
  assert.equal(parseRoute('#/vocabulary').page,'vocabulary')
  for (let n=1;n<=78;n++) {
    const topic=String(n).padStart(2,'0')
    assert.deepEqual(parseRoute(`#/lesson/97/study/${topic}`),{
      path:`/lesson/97/study/${topic}`,page:'vocabulary',id:'97',topic,
    })
  }
  assert.deepEqual(parseRoute('#/lesson/97/study/1'),{
    path:'/lesson/97/study/01',page:'vocabulary',id:'97',topic:'01',
  })
  assert.deepEqual(parseRoute('#/vocabulary/78'),{
    path:'/lesson/97/study/78',page:'vocabulary',id:'97',topic:'78',
  })
  for (const invalid of ['00','79','100','not-a-lesson'])
    assert.deepEqual(parseRoute(`#/lesson/97/study/${invalid}`),{
      path:'/lesson/97/study',page:'vocabulary',id:'97',
    })
  assert.equal(parseRoute('#/lesson/96/study').page,'lesson')
  assert.equal(getLessonNavigation({page:'lesson',id:'96'}).next,'/lesson/97/study')
  const shell=readFileSync(new URL('./ArticoWeb.jsx',import.meta.url),'utf8')
  const learn=readFileSync(new URL('./Library.jsx',import.meta.url),'utf8')
  const ui=readFileSync(new URL('./Vocabulary.jsx',import.meta.url),'utf8')
  const css=readFileSync(new URL('./vocabulary.css',import.meta.url),'utf8')
  assert.match(shell,/lazy\(\(\) => import\('\.\/Vocabulary'\)\)/)
  assert.match(shell,/route\.page === 'vocabulary'/)
  assert.match(shell,/<Vocabulary route=\{route\}/)
  assert.match(learn,/href="#\/lesson\/97\/study"/)
  assert.match(learn,/78 topics/)
  assert.match(ui,/vocabularyTopics\.json/)
  assert.match(ui,/topics\.map/)
  assert.match(ui,/This lesson is being prepared/)
  assert.match(ui,/topicHref\(next\.sourceLesson\)/)
  assert.match(ui,/topic\.sourceLesson === 1/)
  assert.match(ui,/topic\.sourceLesson === 2/)
  assert.match(ui,/VocabularyCountriesLesson/)
  assert.match(ui,/VocabularyNumbersLesson/)
  assert.doesNotMatch(ui,/vocabularyCatalog\.json|vocabularyJapaneseAM|vocabularyJapaneseNZ|vocabularyJapaneseOverrides/)
  assert.match(css,/@media \(max-width: 620px\)/)
})

test('Lesson 2 presents the complete everyday-number categories with Japanese clues',()=>{
  assert.deepEqual(numberGroups.map(group=>group.id),[
    'counting','tens','large','ordinals','fractions','decimals','percent','everyday',
  ])
  assert.equal(numberGroups.reduce((total,group)=>total+group.items.length,0),110)
  const counting=numberGroups.find(group=>group.id==='counting')
  assert.equal(counting.items.length,21)
  assert.deepEqual(counting.items.map(item=>item.cue),Array.from({length:21},(_,i)=>String(i)))
  const terms=new Set(numberGroups.flatMap(group=>group.items.map(item=>item.term)))
  for (const term of [
    'twenty-one','twenty-two','thirty-four','fifty-six','ninety-nine',
    'ten thousand','one hundred thousand / a hundred thousand',
    'quadrillion / one quadrillion / a quadrillion','twenty-first','one hundredth',
    'one and a half','half a dozen','one point two five','zero point five percent',
    'at least','no more than','phone number','nineteen dollars and ninety-nine cents / nineteen ninety-nine',
    '1.2 million','3.5 billion dollars',
  ]) assert.ok(terms.has(term),`Missing lesson 2 term: ${term}`)
  assert.ok(numberGroups.every(group=>group.ja&&group.intro.ja&&group.items.every(item=>item.ja)))
  assert.match(numberGroups.find(group=>group.id==='large').note.ja,/hundred/)
  assert.match(numberGroups.find(group=>group.id==='decimals').intro.ja,/一桁ずつ/)
  const ui=readFileSync(new URL('./VocabularyNumbersLesson.jsx',import.meta.url),'utf8')
  assert.match(ui,/Practice recall/)
  assert.match(ui,/タップして答えを確認/)
  assert.match(ui,/aria-pressed=\{practice\}/)
})

test('Lesson 1 preserves the organized country, nationality and place vocabulary',()=>{
  assert.equal(countries.length,34)
  assert.equal(new Set(countries.map(item=>item.code)).size,34)
  assert.deepEqual(countries.map(item=>item.country),[
    'Argentina','Australia','Brazil','Canada','China','Czech Republic / Czechia','Egypt','France','Germany','Greece',
    'India','Indonesia','Japan','Mexico','Mongolia','Nepal','the Netherlands','New Zealand','Pakistan','the Philippines',
    'Poland','Portugal','Republic of Ireland / ROI','Russia','Singapore','Slovakia','South Africa','South Korea','Spain',
    'Thailand','Turkey','the United Arab Emirates / UAE','the United Kingdom / UK',
    'the United States of America / United States / US / USA',
  ])
  assert.deepEqual(countries.map(item=>item.nationality),[
    'Argentinian / Argentine','Australian','Brazilian','Canadian','Chinese','Czech','Egyptian','French','German','Greek',
    'Indian','Indonesian','Japanese','Mexican','Mongolian','Nepali','Dutch','New Zealander','Pakistani','Filipino',
    'Polish','Portuguese','Irish','Russian','Singaporean','Slovak','South African','South Korean','Spanish','Thai',
    'Turkish','Emirati','British','American',
  ])
  assert.ok(countries.every(item=>item.nationality && item.ja && item.nationalityJa && item.regions.length))
  assert.equal(countries.find(item=>item.code==='nl').nationality,'Dutch')
  assert.equal(countries.find(item=>item.code==='np').nationality,'Nepali')
  assert.equal(countries.find(item=>item.code==='kr').nationality,'South Korean')
  assert.equal(countries.find(item=>item.code==='ie').nationality,'Irish')
  assert.ok(countries.filter(item=>['ru','tr'].includes(item.code)).every(item=>item.regions.includes('europe')&&item.regions.includes('asia')))
  assert.ok(countries.every(item=>item.regions.every(region=>regions.some(entry=>entry.id===region))))
  assert.deepEqual(placeWords.map(item=>item.en),['country / countries','nationality / nationalities','city','hometown','state','ZIP code'])
  assert.deepEqual(placePhrases.map(item=>item.en),['Where are you from?',"I'm from ..."])
  for (const item of countries) {
    const svg=readFileSync(new URL(`../../public/assets/vocabulary/flags/${item.code}.svg`,import.meta.url),'utf8')
    assert.match(svg,/<svg/)
  }
  assert.match(readFileSync(new URL('../../public/assets/vocabulary/flags/LICENSE',import.meta.url),'utf8'),/MIT License/)
})
