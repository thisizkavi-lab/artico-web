import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const load=(file)=>readFileSync(new URL('./'+file,import.meta.url),'utf8')
const source=JSON.parse(load('vocabularyOrganized.json'))
const catalog=JSON.parse(load('vocabularyCatalog.json'))
const view=load('VocabularyTopicLesson.jsx')
const scenes=load('VocabularySceneArt.jsx')
const time=load('VocabularyTimeArt.jsx')
const food=load('VocabularyFoodArt.jsx')
const visual=load('vocabularyVisual.js')
const dedup=load('vocabularyDedup.js')
const japanese=load('vocabularySupport.js')

test('all 78 vocabulary sources remain intact after non-destructive deduplication',()=>{
  assert.equal(catalog.topics.length,78)
  assert.equal(source.lessons.length,76)
  assert.deepEqual(source.lessons.map(x=>x.sourceLesson),Array.from({length:76},(_,i)=>i+3))
  const rawEntries=source.lessons.flatMap(l=>l.groups.flatMap(g=>g.items))
  assert.equal(rawEntries.length,3950)
  assert.ok(source.lessons.every(l=>l.groups.every(g=>g.items.length>0)))
  assert.ok(rawEntries.every(x=>x[0]&&typeof x[0]==='string'))
  assert.ok(!rawEntries.some(x=>x[0].includes('](https://')))
  assert.match(view,/organizeVocabularyGroup\(group\.items/)
  assert.match(view,/Previously learned/)
  assert.match(view,/firstChapter/)
  assert.match(dedup,/mergeLessonSynonyms/)
})

test('polysemy is protected rather than deleting different concepts',()=>{
  for(const spelling of ['polish','turkey','second','date','chicken','fish','crab','nuts','light','burn','bat','court','ticket','interview','mean','record','train','leg'])
    assert.match(dedup,new RegExp('\\b'+spelling+':\\s*\\{'),spelling+' needs a sense review')
  assert.match(japanese,/'55:bat':'コウモリ'/)
  assert.match(japanese,/'62:bat':'バット/)
  assert.match(japanese,/'29:date':'デーツ/)
  assert.match(japanese,/'11:polish':'磨く/)
  assert.match(japanese,/'44:train':'電車/)
})

test('visual cards draw semantic concepts instead of repeating generic icons',()=>{
  assert.doesNotMatch(view,/CurriculumIcon/)
  assert.match(view,/<VocabularyTimeArt/)
  assert.match(view,/<VocabularySceneArt/)
  assert.match(view,/<VocabularyFoodArt/)
  assert.match(view,/<DimensionArt/)
  assert.match(visual,/timeIllustration\(term,chapter\)/)
  assert.match(visual,/routineScene\(term,chapter\)/)
  assert.match(visual,/foodIllustration\(term,chapter\)/)
  assert.doesNotMatch(visual,/icon:|type:'icon'/)
  assert.match(scenes,/'catch the bus':'bus'/)
  assert.match(scenes,/'eat dinner':'dinner'/)
  assert.match(scenes,/'do the dishes':'dishes'/)
  assert.match(view,/masked=\{answerHidden\}/)
})

test('calendar and time diagrams cover all weekday and month names',()=>{
  for(const day of ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
    assert.ok(time.includes(day),day)
  for(const month of ['January','February','March','April','May','June','July','August','September','October','November','December'])
    assert.ok(time.includes(month),month)
  assert.match(time,/calendar-day/)
  assert.match(time,/calendar-month/)
  assert.match(time,/calendar-range/)
  assert.match(time,/frequency/)
  assert.match(time,/clock/)
  assert.match(time,/season/)
  assert.match(time,/masked/)
})

test('every mapped food kind has a rendering branch',()=>{
  const mapSection=food.split('const foodByTerm = {')[1].split('\n}')[0]
  const kinds=[...new Set([...mapSection.matchAll(/'[^']+'\s*:\s*'([^']+)'/g)].map(x=>x[1]))]
  const rendered=new Set()
  const round=food.match(/const round=\[(.*?)\]\.includes\(kind\)/s)?.[1]||''
  for(const [,word] of round.matchAll(/'([^']+)'/g))rendered.add(word)
  for(const [,word] of food.matchAll(/kind==='([^']+)'/g))rendered.add(word)
  for(const [,words] of food.matchAll(/\[((?:'[^']+'[,]?)+)\]\.includes\(kind\)/g))
    for(const [,word] of words.matchAll(/'([^']+)'/g))rendered.add(word)
  assert.ok(kinds.length>=65)
  assert.deepEqual(kinds.filter(kind=>!rendered.has(kind)),[],'No concept may render as a blank illustration')
  assert.ok(!food.includes("'chips':'fries'"),'U.S. potato chips must not be pictured as fries')
})


test('pinned Mulberry artwork is license-safe and maps only known vocabulary entries',()=>{
  const manifest=JSON.parse(load('vocabularyMulberryManifest.json'))
  assert.equal(manifest.license,'CC-BY-SA-4.0')
  assert.equal(manifest.version,'v3.6.1')
  assert.equal(manifest.sourceCommit,'9cbab9f400c5de44e2bc58839cca07294aadb086')
  const terms=new Set(source.lessons.flatMap(l=>l.groups.flatMap(g=>g.items.map(i=>l.sourceLesson+':'+i[0].toLowerCase().trim()))))
  const entries=Object.entries(manifest.entries)
  assert.ok(entries.length>=700,'Do not silently reduce the curated illustration inventory')
  for(const [term,svg] of entries){
    assert.ok(terms.has(term),'Missing vocabulary for artwork: '+term)
    assert.match(svg,/^[a-zA-Z0-9_,-]+\\.svg$/,'Invalid or unsafe source path: '+svg)
  }
  const openmoji=JSON.parse(load('vocabularyOpenmojiManifest.json'))
  assert.equal(openmoji.license,'CC-BY-SA-4.0')
  assert.ok(Object.keys(openmoji.entries).length>=100)
  for(const [term,code] of Object.entries(openmoji.entries)){
    assert.ok(terms.has(term),'Missing vocabulary for OpenMoji artwork: '+term)
    assert.match(code,/^[0-9A-F-]+$/)
  }
  const client=load('vocabularyLibraryArtwork.js')
  assert.match(client,/import\\.meta\\.env\\.BASE_URL/)
  assert.match(client,/vocabulary-symbols\\/mulberry\\//)
  assert.match(visual,/vocabularyLibraryIllustration/)
  assert.match(view,/library-png/)
  assert.doesNotMatch(client,/https?:\\/\\//,'Runtime must not hotlink external images')
})
