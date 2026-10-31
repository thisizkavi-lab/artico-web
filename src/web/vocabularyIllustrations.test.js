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
  assert.equal(rawEntries.length,3951)
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

test('Vocabulary artwork uses raster images except dedicated Lesson 05 SVG color swatches',()=>{
  for(const component of ['VocabularyTimeArt','VocabularySceneArt','VocabularyFoodArt','DimensionArt','MaterialArt','WeatherArt','DirectionArt','CurriculumIcon'])
    assert.ok(!view.includes(component),'Old inline vector in vocabulary renderer: '+component)
  assert.ok(!view.includes('<svg'),'The shared vocabulary renderer must not contain inline SVG artwork')
  assert.ok(view.includes('<img className='))
  assert.ok(visual.includes("chapter === 5 && colorSwatches[term]"),'SVG swatches are reserved for Lesson 05 colors')
  assert.ok(visual.includes("type: 'color-swatch'"))
  const colorSwatch=load('VocabularyColorSwatch.jsx')
  assert.ok(colorSwatch.includes('<svg className="vlt-color-swatch"'))
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
  const allowedReasons=new Set(['ABSTRACT','FUNCTION','IDIOM','SENSE','SENSITIVE'])
  for(const [key,reason] of Object.entries(manifest.textOnly||{})){
    assert.ok(validTerms.has(key),'Text-only key not in vocabulary: '+key)
    assert.ok(!manifest.entries[key],'Key cannot be both illustrated and textOnly: '+key)
    assert.ok(allowedReasons.has(reason),'Invalid textOnly reason for '+key+': '+reason)
  }
  assert.ok(load('vocabularyVisual.js').includes('vocabularyCourseArt(term, chapter)'))
  assert.ok(load('vocabularyVisual.js').includes('vocabularyCourseTextOnly(term, chapter)'))
})

test('Lesson 14 body vocabulary has intentional art for every previously unillustrated concept',()=>{
  const lesson=source.lessons.find(l=>l.sourceLesson===14)
  const words=lesson.groups.flatMap(g=>g.items.map(item=>item[0]))
  assert.equal(words.length,62,'Keep the editorial source corpus intact')
  assert.ok(words.includes('body, parts of'))
  assert.match(view,/term !== 'body, parts of'/,'Do not show a category heading as a flashcard')
  assert.match(view,/vlt-body-note/,'Explain whole-part relationships for head, hand and leg')

  const report=JSON.parse(readFileSync(new URL('../../reports/vocabulary-static-png-coverage.json',import.meta.url),'utf8'))
  const missing=report.entries_without_static_png['14']
  assert.equal(missing.length,38)
  const art=load('VocabularyBodyArt.jsx')
  const motion=load('vocabulary-body-art.css')
  const actual=missing.filter(term=>term!=='body, parts of')
  assert.equal(actual.length,37)
  for(const term of actual)
    assert.ok(art.includes("'"+term+"'"),'Missing lesson 14 drawing: '+term)
  for(const term of ['blink','nod','smile'])
    assert.ok(art.includes("'"+term+"'"),'Existing static art should also move: '+term)
  const userPhoto = new URL('../../public/vocabulary-course/05/plastic-containers.webp', import.meta.url)
  assert.ok(existsSync(userPhoto), 'Use the supplied real-world plastic containers photograph')
  assert.ok(statSync(userPhoto).size > 10000, 'Keep the locally bundled plastic photograph intact')
  assert.ok(material.includes('vocabulary-course/05/plastic-containers.webp'))
  assert.match(visual,/vocabularyBodyIllustration\(term, chapter\)/)
  assert.match(view,/visual\?\.type === 'body-art'/)
  assert.match(motion,/@media\(prefers-reduced-motion:reduce\)/)
  assert.match(motion,/@keyframes bv-blink/)
  assert.match(motion,/@keyframes bv-breath/)
  assert.match(motion,/@keyframes bv-shiver/)
  assert.match(motion,/@keyframes bv-bow/)
})

test('Lesson 14 uses approved raster body art and keeps eye anatomy precise',()=>{
  const sprite=load('vocabularyBodySprite.js')
  const names=["head","face","forehead","eyes","eyebrow","eyelashes","eyelid","pupil","iris","nose","nostrils","cheek","mouth","lips","chin","tooth / teeth (plural)","neck","shoulder (body)","arm","elbow","wrist","hand","finger","thumb","leg","thigh","knee","shin","ankle","foot","toe"]
  for(const word of names)
    assert.ok(sprite.includes(JSON.stringify(word)),'Missing curated asset mapping: '+word)
  assert.match(visual,/vocabularyBodySprite\(term, chapter\)/)
  assert.match(view,/visual\?\.type === 'body-sprite'/)
  assert.match(view,/\['eyelid'\], \['pupil'\], \['iris'\]/)
  assert.match(japanese,/'14:pupil':'瞳孔'/)
  assert.match(japanese,/'14:iris':'虹彩'/)
  const file=readFileSync(new URL('../../public/vocabulary-art/body-14-hd.webp',import.meta.url))
  assert.ok(file.length > 180000, 'Lesson 14 must not use the old low-quality sprite')
  assert.equal(file.subarray(0,4).toString(),'RIFF')
  assert.equal(file.subarray(8,12).toString(),'WEBP')
  assert.equal(file.subarray(12,16).toString(),'VP8 ')
  assert.equal(file.readUInt16LE(26) & 0x3fff,3264, 'HD sprite width')
  assert.equal(file.readUInt16LE(28) & 0x3fff,1016, 'HD sprite height')
})


test('reviewed relative-time illustrations are available locally for all nine expressions',()=>{
  const lesson=source.lessons.find(x=>x.sourceLesson===3)
  const expressions=lesson.groups[6].items.map(([term])=>term)
  assert.deepEqual(expressions,[
    'now / right now',
    'earlier / later',
    'before / after',
    'yesterday / today / tomorrow',
    'this morning / this afternoon / this evening',
    'tonight',
    'last week / this week / next week',
    'ago',
    'soon',
  ])
  const expected=[
    'now-right-now',
    'earlier-later',
    'before-after',
    'yesterday-today-tomorrow',
    'this-morning-this-afternoon-this-evening',
    'tonight',
    'last-week-this-week-next-week',
    'ago',
    'soon',
  ]
  const client=load('vocabularyTimePng.js')
  assert.match(client,/const relativeTimeArt/)
  for(const slug of expected){
    assert.ok(client.includes("'"+slug+"'"),'Missing artwork mapping for '+slug)
    const file=readFileSync(new URL('../../public/vocabulary-ai/ch03/relative-time/'+slug+'.webp',import.meta.url))
    assert.ok(file.length>12000,'Undersized illustration: '+slug)
    assert.equal(file.toString('ascii',0,4),'RIFF')
    assert.equal(file.toString('ascii',8,12),'WEBP')
  }
  assert.match(client,/relativeTimeArt\[term\]/)
})


test('Lesson 14 animates all actions using distinct motion rigs and accessible playback',()=>{
  const motion=load('VocabularyBodyMotion.jsx')
  const css=load('vocabulary-body-motion.css')
  const terms=[
    'blink','blush (action)','bow (gesture)','clap','cry','frown','grin',
    'laugh','lick','nod','shake your head','shrug','smile','suck',
    'breathe','hold your breath','cough','shiver','sigh',
    'sneeze','snore','sweat / perspire (formal verb)',
  ]
  for(const term of terms)assert.ok(motion.includes("'"+term+"'"),'Missing body motion: '+term)
  assert.match(visual,/vocabularyBodyMotion\(term, chapter\)/)
  assert.ok(visual.indexOf('vocabularyBodyMotion(term, chapter)')<visual.indexOf('vocabularyCourseArt(term, chapter)'),
    'Moving actions must not be overridden by static artwork')
  assert.match(view,/visual\?\.type === 'body-motion'/)
  assert.match(view,/practice=\{practice\}/)
  assert.match(motion,/!practice && <button/, 'Practice cards must not nest a button')
  assert.match(motion,/IntersectionObserver/, 'Autoplay only after the picture is in view')
  assert.match(motion,/prefers-reduced-motion/, 'Respect reduced motion preferences')
  assert.match(css,/@media \(prefers-reduced-motion:reduce\)/)
  assert.match(css,/@keyframes bm-blink/)
  assert.match(css,/@keyframes bm-bow/)
  assert.match(css,/@keyframes bm-clap-l/)
  assert.match(css,/@keyframes bm-breathe/)
  assert.match(css,/@keyframes bm-sneeze-head/)
  assert.match(css,/@keyframes bm-sleep-breath/)
  assert.match(motion,/onAnimationEnd/, 'Replay animations must stop, not loop forever')
  assert.ok(!css.includes('infinite'),'Body motion should not loop endlessly')
})


test('Chapter 98 has independent, bottom-right sound controls in every card layout', () => {
  const countries = load('VocabularyCountriesLesson.jsx')
  const numbers = load('VocabularyNumbersLesson.jsx')
  const speech = load('KokoroSpeakButton.jsx')
  const css = load('kokoro-speech.css')

  // A single renderer covers all 76 general vocabulary topics.
  assert.match(view, /return practice && canPractice/)
  assert.match(view, /className="vlt-recall-container"/)
  assert.match(view, /<KokoroSpeakButton text=\{term\} japanese=\{japanese\} upcoming=\{upcoming\}/)
  assert.match(view, /<article className=\{'vlt-card'/)
  assert.match(css, /\.vlt-lesson \.vlt-recall-container > \.artico-speak/)
  assert.match(css, /bottom: 7px;\s*right: 7px;/)
  // The same speaker is available on both sides of Study/Practice.
  assert.match(numbers, /<KokoroSpeakButton text=\{item\.term\}/)
  assert.match(countries, /className="vl01-country-audio"/)
  assert.match(countries, /<KokoroSpeakButton text=\{word\.en\}/)
  assert.match(countries, /<KokoroSpeakButton text=\{phrase\.en\}/)
  assert.match(speech, /speakKokoroSpeech\(spoken,/)
})


test('Lesson 05 SVG swatches are image-only and use the standard vocabulary card layout',()=>{
  const colorSwatch=load('VocabularyColorSwatch.jsx')
  assert.ok(colorSwatch.includes('<svg className="vlt-color-swatch"'))
  assert.ok(colorSwatch.includes('<path d={blobShapes[variant % blobShapes.length]} fill={color} />'))
  assert.ok(!colorSwatch.includes('<text'),'The color name belongs in the normal card text, not inside the SVG')
  assert.ok(!colorSwatch.includes('showLabel'))
  assert.ok(colorSwatch.includes('aria-hidden="true"'))
  assert.ok(!view.includes('isColorSwatch'))
  assert.ok(!view.includes('vlt-color-card'))
  assert.ok(!view.includes('vlt-color-grid'))
  assert.ok(view.includes("const cardType = visual ? ' vlt-image-card' : ' vlt-text-card'"))
  assert.ok(view.includes('{!answerHidden\n          ? <strong className="vlt-term" lang="en">{term}</strong>'))
  assert.ok(!load('vocabulary-topic.css').includes('vlt-color-card'))
  assert.ok(!load('vocabulary-topic.css').includes('vlt-color-grid'))
})


test('All 20 dimension cards use self-contained, text-free Kitbitz SVG artwork',()=>{
  const words=["big","little","small","deep","shallow","high","low","long","short","narrow","thick","thin","heavy","light","far","near","height","size","weight","shape"]
  const mapping=load('vocabularyDimensionsArt.js')
  const visual=load('vocabularyVisual.js')
  assert.ok(visual.includes('vocabularyDimensionsArt(term, chapter)'))
  for(const term of words){
    const file=load('../../public/vocabulary-dimensions/05/'+term+'.svg')
    assert.ok(file.includes('viewBox="0 0 304 192"'),term)
    assert.ok(file.includes('data-vocab-key="5:'+term+'"'),term)
    assert.ok(file.includes('data-source="Kitbitz CC0'),term)
    assert.ok(!/<text\b|<image\b/.test(file),term)
    assert.ok(mapping.includes('"'+term+'"'),term)
  }
})


test('Lesson 05 little shows a kitten beside an adult cat, not a repeated mug',()=>{
  const little=load('../../public/vocabulary-dimensions/05/little.svg')
  assert.match(little,/data-cat-role="kitten"/)
  assert.match(little,/data-cat-role="adult-cat"/)
  assert.equal((little.match(/data-cat-role=/g)||[]).length,2)
  assert.match(little,/Black cat SVG/)
  assert.ok(!little.includes('mug'), 'The little illustration must not reuse the mug comparison')
  assert.ok(!/<text\b|<image\b/.test(little), 'Keep labels in the standard vocabulary card')
})


test('Lesson 05 materials and fabrics use nine reviewed CC0 internet images',()=>{
  const material=load('vocabularyMaterialArt.js')
  const visual=load('vocabularyVisual.js')
  const terms=['material / materials (plural)','denim','fabric','glass','leather','metal','paper','plastic','silk']
  for(const term of terms)assert.ok(material.includes(term), 'Missing material image: '+term)
  for(const url of [
    'https://www.publicdomainpictures.net/pictures/780000/velka/material-texture-collage-1776848321uoZ.jpg',
    'https://cdn.meshy.ai/landing-assets/textures/fabric/washed-blue-denim/washed-blue-denim-2k.jpg',
    'https://cdn.meshy.ai/landing-assets/textures/fabric/natural-linen-weave/natural-linen-weave-2k.jpg',
    'https://www.svgrepo.com/download/166157/drink-in-transparent-glass-bottle.svg',
    'https://cdn.meshy.ai/landing-assets/textures/leather/brown-leather/brown-leather-2k.jpg',
    'https://cdn.meshy.ai/landing-assets/textures/metal/brushed-stainless-steel/brushed-stainless-steel-2k.jpg',
    'https://cdn.meshy.ai/landing-assets/textures/paper/crumpled-white-paper/crumpled-white-paper-2k.jpg',
    'https://www.publicdomainpictures.net/pictures/620000/velka/textil-seide-hintergrund-textur-1717793189VVB.jpg',
  ])assert.ok(material.includes(url), 'Missing source URL: '+url)
  assert.match(visual,/vocabularyMaterialArt\(term, chapter\)/)
  assert.ok(visual.indexOf('vocabularyMaterialArt(term, chapter)')<visual.indexOf('vocabularyDimensionsArt(term, chapter)'),
    'Material images must override legacy Mulberry symbols before fallback artwork')
})
