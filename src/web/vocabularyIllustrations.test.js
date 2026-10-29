import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'

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

test('Vocabulary Lessons 3–78 render raster images only, never inline SVG art',()=>{
  for(const component of ['VocabularyTimeArt','VocabularySceneArt','VocabularyFoodArt','DimensionArt','MaterialArt','WeatherArt','DirectionArt','CurriculumIcon'])
    assert.ok(!view.includes(component),'Old inline vector in vocabulary renderer: '+component)
  assert.ok(!view.includes('<svg'),'Vocabulary card must not render inline SVG')
  assert.ok(view.includes('<img className='))
  assert.ok(!visual.includes('timeIllustration('))
  assert.ok(!visual.includes('routineScene('))
  assert.ok(!visual.includes('foodIllustration('))
  assert.ok(visual.includes('vocabularyTimePng(term, chapter)'))
  assert.ok(visual.includes('vocabularyPngIllustration(term, chapter)'))
  assert.ok(visual.includes('vocabularyOriginalScene(term, chapter)'))
  assert.ok(visual.includes('vocabularyLibraryIllustration(term, chapter)'))
})

test('Lesson 3 has an original raster time-diagram image for all 82 terms',()=>{
  const lesson=source.lessons.find(l=>l.sourceLesson===3)
  const words=lesson.groups.flatMap(g=>g.items.map(x=>x[0]))
  assert.equal(words.length,82)
  assert.equal(new Set(words).size,82)
  const map=load('vocabularyTimePng.js')
  assert.ok(map.includes('index.has(term)'))
  assert.ok(map.includes("'vocabulary-ai/ch03/03-'"))
  const renderer=readFileSync(new URL('../../scripts/build_vocab_time_png.py',import.meta.url),'utf8')
  for(const pattern of ['ImageDraw','weekday(d','month(d','clock(d','season(d','freq(d','timeline(d','globe(d'])
    assert.ok(renderer.includes(pattern),'Time diagram capability missing: '+pattern)
  assert.ok(!renderer.includes('cairosvg'),'Time pictures must be native raster drawings')
})

test('pinned Mulberry and OpenMoji artwork maps only to known vocabulary terms',()=>{
  const manifest=JSON.parse(load('vocabularyMulberryManifest.json'))
  const openmoji=JSON.parse(load('vocabularyOpenmojiManifest.json'))
  assert.equal(manifest.license,'CC-BY-SA-4.0')
  assert.equal(manifest.version,'v3.6.1')
  assert.equal(manifest.sourceCommit,'9cbab9f400c5de44e2bc58839cca07294aadb086')
  assert.equal(openmoji.license,'CC-BY-SA-4.0')
  const terms=new Set(source.lessons.flatMap(l=>l.groups.flatMap(g=>
    g.items.map(item=>l.sourceLesson+':'+item[0].toLowerCase().trim()))))
  assert.ok(Object.keys(manifest.entries).length>=700)
  assert.ok(Object.keys(openmoji.entries).length>=100)
  for(const [term,svg] of Object.entries(manifest.entries)){
    assert.ok(terms.has(term),'Missing vocabulary for artwork: '+term)
    assert.ok(svg.endsWith('.svg'),'Incorrect SVG extension: '+svg)
    assert.ok([...svg].every(ch=>/[A-Za-z0-9_,.\-]/.test(ch)),'Unsafe SVG source path: '+svg)
  }
  for(const [term,code] of Object.entries(openmoji.entries)){
    assert.ok(terms.has(term),'Missing vocabulary for OpenMoji artwork: '+term)
    assert.ok([...code].every(ch=>'0123456789ABCDEF-'.includes(ch)),'Unsafe codepoint: '+code)
  }
  const client=load('vocabularyLibraryArtwork.js')
  assert.ok(client.includes('import.meta.env.BASE_URL'))
  assert.ok(client.includes('vocabulary-symbols/mulberry/'))
  assert.ok(client.includes('vocabulary-symbols/openmoji/'))
  assert.ok(visual.includes('vocabularyLibraryIllustration'))
  assert.ok(view.includes('library-png'))
  assert.ok(!client.includes('http://')&&!client.includes('https://'),'No externally hosted artwork at runtime')
})

test('original chapter 13 PNG scene pipeline covers each moving-and-renting entry',()=>{
  const manifest=JSON.parse(load('vocabularyOriginalScenes.json'))
  const lesson=source.lessons.find(x=>x.sourceLesson===13)
  const expected=lesson.groups.flatMap(g=>g.items.map(x=>'13:'+x[0]))
  assert.equal(expected.length,50)
  assert.deepEqual(new Set(Object.keys(manifest.entries)),new Set(expected))
  const files=Object.values(manifest.entries).map(x=>'13-'+x.kind+'-'+x.scene+'.png')
  assert.equal(new Set(files).size,50,'Every target requires an intentional distinct scene')
  const renderer=readFileSync(new URL('../../scripts/build_vocabulary_original_scenes.py',import.meta.url),'utf8')
  assert.ok(renderer.includes('cairosvg.svg2png'))
  assert.ok(renderer.includes('Unusually small scene'))
  assert.ok(load('vocabularyVisual.js').includes('vocabularyOriginalScene(term, chapter)'))
})

test('original chapter 18 personality PNG scenes cover each trait',()=>{
  const manifest=JSON.parse(load('vocabularyPersonalityScenes.json'))
  const lesson=source.lessons.find(x=>x.sourceLesson===18)
  const expected=lesson.groups.flatMap(g=>g.items.map(x=>'18:'+x[0]))
  assert.equal(expected.length,53)
  assert.deepEqual(new Set(Object.keys(manifest.entries)),new Set(expected))
  const files=Object.values(manifest.entries).map(x=>'18-'+x.scene+'.png')
  assert.equal(new Set(files).size,53)
  const renderer=readFileSync(new URL('../../scripts/build_vocabulary_personality_scenes.py',import.meta.url),'utf8')
  assert.ok(renderer.includes('cairosvg.svg2png'))
  assert.ok(renderer.includes('No reviewed personality illustration concept'))
})

test('new commute illustrations and merged equivalent expression pictures stay connected',()=>{
  const source=load('vocabularyActionPng.js')
  for(const term of ["arrive late","catch the bus","catch the train","commute","drive","go to school","go to work","start work","finish work","leave work","work from home","overtime","do homework","have a break","leave the house","go home"])
    assert.ok(source.includes("'"+term+"'"),'Missing original scene: '+term)
  const renderer=readFileSync(new URL('../../scripts/build_ch04_ai_actions.py',import.meta.url),'utf8')
  for(const atlas of ['commute','work','evening','home'])
    assert.ok(renderer.includes('ch04-'+atlas+'-atlas.webp'),'Missing scene sheet: '+atlas)
  assert.ok(renderer.includes("Image.Resampling.LANCZOS"))
  assert.ok(renderer.includes("with Image.open(target) as check"))
  assert.ok(load('vocabularyVisual.js').includes("combinedVocabulary"))
  assert.ok(load('vocabularyVisual.js').includes("combined === term"))
})

test('dedicated vocabulary course art manifest entries are valid and verified',()=>{
  const manifest=JSON.parse(load('vocabularyCourseArt.json'))
  assert.equal(manifest.schema,1)
  assert.ok(typeof manifest.style==='string')
  const validTerms=new Set(source.lessons.flatMap(l=>l.groups.flatMap(g=>
    g.items.map(item=>l.sourceLesson+':'+item[0].toLowerCase().trim()))))
  const filesByLesson=new Map()

  for(const [key,slug] of Object.entries(manifest.entries)){
    assert.ok(validTerms.has(key),'Key not in vocabulary: '+key)
    const [lessonStr]=key.split(':')
    if(!filesByLesson.has(lessonStr)) filesByLesson.set(lessonStr,new Set())
    assert.ok(!filesByLesson.get(lessonStr).has(slug),'Duplicate slug in lesson '+lessonStr+': '+slug)
    filesByLesson.get(lessonStr).add(slug)

    const filePath=new URL('../../public/vocabulary-course/'+slug+'.webp',import.meta.url)
    assert.ok(existsSync(filePath),'Course art file missing: '+slug)
    const stat=statSync(filePath)
    assert.ok(stat.size<=80*1024,'Course art file exceeds 80 KB: '+slug+' ('+stat.size+' B)')
  }
  assert.ok(load('vocabularyVisual.js').includes('vocabularyCourseArt(term, chapter)'))
})

