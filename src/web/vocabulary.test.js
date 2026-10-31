import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parseRoute } from './learning.js'
import { getLessonNavigation } from './pathway.js'
import { countries, placePhrases, placeWords, regions } from './vocabularyLesson01.js'
import { numberGroups } from './vocabularyLesson02.js'
import { vocabularySpokenText } from './vocabularySpokenText.js'

const source=JSON.parse(readFileSync(new URL('./vocabularyCatalog.json',import.meta.url),'utf8'))
const topics=JSON.parse(readFileSync(new URL('./vocabularyTopics.json',import.meta.url),'utf8'))
const japaneseAM=JSON.parse(readFileSync(new URL('./vocabularyJapaneseAM.json',import.meta.url),'utf8'))
const japaneseNZ=JSON.parse(readFileSync(new URL('./vocabularyJapaneseNZ.json',import.meta.url),'utf8'))
const overrides=JSON.parse(readFileSync(new URL('./vocabularyJapaneseOverrides.json',import.meta.url),'utf8'))
const translated={...japaneseAM,...japaneseNZ,...overrides}

test('Vocabulary chapter 98 preserves all 78 source topics and term types',()=>{
  assert.equal(source.chapter,98)
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

test('Lesson 98 supports a directory and direct routes for all 78 lesson pages',()=>{
  assert.deepEqual(parseRoute('#/lesson/98/study'),{path:'/lesson/98/study',page:'vocabulary',id:'98'})
  assert.equal(parseRoute('#/vocabulary').page,'vocabulary')
  for (let n=1;n<=78;n++) {
    const topic=String(n).padStart(2,'0')
    assert.deepEqual(parseRoute(`#/lesson/98/study/${topic}`),{
      path:`/lesson/98/study/${topic}`,page:'vocabulary',id:'98',topic,
    })
  }
  assert.deepEqual(parseRoute('#/lesson/98/study/1'),{
    path:'/lesson/98/study/01',page:'vocabulary',id:'98',topic:'01',
  })
  assert.deepEqual(parseRoute('#/vocabulary/78'),{
    path:'/lesson/98/study/78',page:'vocabulary',id:'98',topic:'78',
  })
  for (const invalid of ['00','79','100','not-a-lesson'])
    assert.deepEqual(parseRoute(`#/lesson/98/study/${invalid}`),{
      path:'/lesson/98/study',page:'vocabulary',id:'98',
    })
  assert.equal(parseRoute('#/lesson/96/study').page,'lesson')
  assert.equal(getLessonNavigation({page:'lesson',id:'97'}).next,'/lesson/98/study')
  const shell=readFileSync(new URL('./ArticoWeb.jsx',import.meta.url),'utf8')
  const learn=readFileSync(new URL('./Library.jsx',import.meta.url),'utf8')
  const ui=readFileSync(new URL('./Vocabulary.jsx',import.meta.url),'utf8')
  const css=readFileSync(new URL('./vocabulary.css',import.meta.url),'utf8')
  assert.match(shell,/lazy\(\(\) => import\('\.\/Vocabulary'\)\)/)
  assert.match(shell,/route\.page === 'vocabulary'/)
  assert.match(shell,/<Vocabulary route=\{route\}/)
  assert.match(learn,/href="#\/lesson\/98\/study"/)
  assert.match(learn,/78 topics/)
  assert.match(ui,/vocabularyTopics\.json/)
  assert.match(ui,/topics\.map/)
  assert.doesNotMatch(ui,/This lesson is being prepared/)
  assert.match(ui,/<VocabularyTopicLesson key=\{topic\.sourceLesson\}/)
  assert.match(ui,/topicHref\(next\.sourceLesson\)/)
  assert.match(ui,/topic\.sourceLesson === 1/)
  assert.match(ui,/topic\.sourceLesson === 2/)
  assert.match(ui,/VocabularyCountriesLesson/)
  assert.match(ui,/VocabularyNumbersLesson/)
  assert.match(ui,/lazy\(\(\) => import\('\.\/VocabularyTopicLesson'\)\)/)
  assert.match(ui,/lazy\(\(\) => import\('\.\/VocabularyCountriesLesson'\)\)/)
  assert.match(ui,/lazy\(\(\) => import\('\.\/VocabularyNumbersLesson'\)\)/)
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
  assert.match(ui,/NumberTable group=\{group\}/)
  assert.match(ui,/VocabularyNumberVisual/)
  assert.match(ui,/答えを見る/)
  assert.match(ui,/aria-pressed=\{practice\}/)
  assert.doesNotMatch(ui,/vl02-card-grid/)
  const illustrations=readFileSync(new URL('./VocabularyNumberVisual.jsx',import.meta.url),'utf8')
  assert.match(illustrations,/FractionDisc/)
  assert.match(illustrations,/PercentGrid/)
  assert.match(illustrations,/ComparisonLine/)
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


test('Grouped source vocabulary covers every remaining lesson with the original topic order',()=>{
  const grouped=JSON.parse(readFileSync(new URL('./vocabularyOrganized.json',import.meta.url),'utf8'))
  assert.deepEqual(grouped.lessons.map(lesson=>lesson.sourceLesson),Array.from({length:76},(_,i)=>i+3))
  assert.ok(grouped.lessons.every(lesson=>lesson.groups.length>0))
  assert.ok(grouped.lessons.every(lesson=>lesson.groups.every(group=>group.title && group.items.length>0)))
  const items=grouped.lessons.flatMap(lesson=>lesson.groups.flatMap(group=>group.items))
  assert.ok(items.length>=3900)
  assert.ok(items.every(entry=>typeof entry[0]==='string'&&entry[0].trim()))
  assert.ok(!items.some(entry=>entry[0].includes('](https://')))
  assert.deepEqual(grouped.lessons[0].groups[0].items.slice(0,3).map(x=>x[0]),['morning / in the morning','noon','midday'])
  assert.ok(grouped.lessons.find(lesson=>lesson.sourceLesson===78).groups.some(group=>group.items.some(entry=>entry[0]==='genetic engineering')))
  const view=readFileSync(new URL('./VocabularyTopicLesson.jsx',import.meta.url),'utf8')
  const style=readFileSync(new URL('./vocabulary-topic.css',import.meta.url),'utf8')
  assert.match(view,/vocabularyVisual\(term, lesson\)/)
  assert.match(view,/aria-pressed=\{mode === 'study'\}/)
  assert.match(view,/aria-pressed=\{mode === 'practice'\}/)
  assert.match(style,/@media\(max-width:620px\)/)
})


test('Lesson 03 groups weekdays and weekend with their written abbreviations', () => {
  const lesson = JSON.parse(readFileSync(new URL('./vocabularyOrganized.json', import.meta.url), 'utf8'))
    .lessons.find(item => item.sourceLesson === 3)
  assert.deepEqual(lesson.groups[1].items.map(item => item[0]), [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday', 'Sunday', 'weekday', 'weekend',
  ])
  const view = readFileSync(new URL('./VocabularyTopicLesson.jsx', import.meta.url), 'utf8')
  for (const [day, short] of [
    ['Monday', 'Mon'], ['Tuesday', 'Tue'], ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'], ['Friday', 'Fri'], ['Saturday', 'Sat'], ['Sunday', 'Sun'],
  ]) assert.ok(view.includes(`name: '${day}', short: '${short}'`))
  assert.match(view, /topic\.sourceLesson === 3 && group\.index === 1/)
  assert.match(view, /isDaysChart && mode === 'study'/)
  assert.match(view, /WeekDaysChart japanese=\{japanese\}/)
  assert.match(view, /vlt-week-day-short/)
  const style = readFileSync(new URL('./vocabulary-topic.css', import.meta.url), 'utf8')
  assert.match(style, /vlt-week-section\.is-weekend/)
  assert.match(style, /@media\(max-width:620px\)/)
})


test('Lesson 03 displays twelve months with their written abbreviations but no day counts', () => {
  const lesson = JSON.parse(readFileSync(new URL('./vocabularyOrganized.json', import.meta.url), 'utf8'))
    .lessons.find(item => item.sourceLesson === 3)
  const months = lesson.groups[2].items.map(([name]) => name)
  assert.deepEqual(months, [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ])
  const view = readFileSync(new URL('./VocabularyTopicLesson.jsx', import.meta.url), 'utf8')
  const chart = view.slice(view.indexOf('const yearMonths'), view.indexOf('const timeSpanEquivalents'))
  for (const [name, short] of [
    ['January', 'Jan.'], ['February', 'Feb.'], ['March', 'Mar.'],
    ['April', 'Apr.'], ['May', 'May'], ['June', 'Jun.'],
    ['July', 'Jul.'], ['August', 'Aug.'], ['September', 'Sep.'],
    ['October', 'Oct.'], ['November', 'Nov.'], ['December', 'Dec.'],
  ]) assert.ok(chart.includes(`name: '${name}', short: '${short}'`))
  assert.match(chart, /<th scope="col">#<\/th>/)
  assert.match(chart, /<MonthsOfYearChart|function MonthsOfYearChart/)
  assert.doesNotMatch(chart, /daysInMonth|daysPerMonth|28\/29|31 days|30 days/)
  assert.match(view, /isMonthsChart && mode === 'study'/)
  const style = readFileSync(new URL('./vocabulary-topic.css', import.meta.url), 'utf8')
  assert.match(style, /vlt-month-table/)
  assert.match(style, /@media\(max-width:620px\)/)
})


test('Lesson 03 displays every original time span as a coherent equivalence table', () => {
  const lesson = JSON.parse(readFileSync(new URL('./vocabularyOrganized.json', import.meta.url), 'utf8'))
    .lessons.find(item => item.sourceLesson === 3)
  const terms = lesson.groups[4].items.map(([term]) => term)
  assert.deepEqual(terms, [
    'second', 'minute', 'hour', 'day', 'week',
    'two weeks / a fortnight', 'month', 'year', 'decade',
    'century', 'millennium / millennia',
  ])
  const view = readFileSync(new URL('./VocabularyTopicLesson.jsx', import.meta.url), 'utf8')
  const table = view.slice(view.indexOf('const timeSpanEquivalents'), view.indexOf('function Visual({visual})'))
  for (const term of terms) assert.ok(table.includes(term), 'Missing unit: ' + term)
  for (const equivalent of ['60 seconds', '60 minutes', '24 hours', '7 days',
    '14 days', '28–31 days', '12 months', '10 years', '100 years', '1,000 years',
  ]) assert.ok(table.includes(equivalent), 'Missing equivalence: ' + equivalent)
  assert.match(table, /items\.map\(\(\[term\]\)/)
  assert.match(table, /<th scope="row"/)
  assert.match(view, /isTimeSpansTable && mode === 'study'/)
  assert.match(view, /<TimeSpansTable items=\{cards\} japanese=\{japanese\}/)
  const style = readFileSync(new URL('./vocabulary-topic.css', import.meta.url), 'utf8')
  assert.match(style, /vlt-span-table/)
  assert.match(style, /@media\(max-width:620px\)/)
})


test('Lesson 03 uses an ordered frequency chart and keeps specific-interval cards',()=>{
  const lesson=JSON.parse(readFileSync(new URL('./vocabularyOrganized.json',import.meta.url),'utf8'))
    .lessons.find(item=>item.sourceLesson===3)
  const terms=lesson.groups[5].items.map(([term])=>term)
  const relative=['always','usually','often','sometimes','rarely / seldom','never']
  assert.deepEqual(terms.slice(0,6),relative)
  assert.equal(terms.length,15)
  const view=readFileSync(new URL('./VocabularyTopicLesson.jsx',import.meta.url),'utf8')
  const chart=view.slice(view.indexOf('const relativeFrequency'),view.indexOf('function VocabCard('))
  for(const term of relative) assert.ok(chart.includes("term:'"+term+"'"),'Missing frequency: '+term)
  assert.match(chart,/From most frequent to least frequent/)
  assert.match(chart,/not a percentage scale/)
  assert.match(chart,/intervals\.map/)
  assert.match(chart,/<VocabCard/)
  assert.match(chart,/<span lang="en">\{level\.label\}<\/span>/)
  assert.match(view,/isFrequencyScale && mode === 'study'/)
  assert.match(view,/<FrequencyScale items=\{cards\} japanese=\{japanese\}/)
  const style=readFileSync(new URL('./vocabulary-topic.css',import.meta.url),'utf8')
  assert.match(style,/\.vlt-frequency-bars/)
  assert.match(style,/@media\(max-width:620px\)/)
})


test('vocabulary pronunciation reads alternatives, never visual punctuation or editorial notes', () => {
  assert.equal(vocabularySpokenText('U.S./USA, America'), 'U S. U S A. America.')
  assert.equal(vocabularySpokenText('U.S./USA'), 'U S. U S A.')
  assert.equal(vocabularySpokenText('U.S.'), 'U S.')
  assert.equal(vocabularySpokenText('morning / in the morning'), 'morning. in the morning')
  assert.equal(vocabularySpokenText('take a shower / have a shower (also common in UK)'), 'take a shower. have a shower')
  assert.equal(vocabularySpokenText('Human Resources / HR (department)'), 'Human Resources. H R')
  assert.equal(vocabularySpokenText('bowl / bowl (container) (same sense)'), 'bowl')
  assert.equal(vocabularySpokenText('yesterday / today / tomorrow'), 'yesterday. today. tomorrow')
  assert.equal(vocabularySpokenText('1/2'), 'one half')
  assert.equal(vocabularySpokenText('Hello!'), 'Hello!')
})
test('Social Fluency uses only owned recordings; Kokoro is confined to vocabulary', () => {
  for (const name of ['components.jsx', 'LessonExperience.jsx', 'ReferencePhraseShelf.jsx', 'GreetingsReferenceStudy.jsx', 'Chapter03Context.jsx']) {
    const source = readFileSync(new URL('./' + name, import.meta.url), 'utf8')
    assert.ok(!source.includes('kokoroSpeech'), name + ' must not import Kokoro')
    assert.ok(!source.includes('speakKokoroSpeech'), name + ' must not synthesize speech')
  }
  const socialAudio = readFileSync(new URL('./components.jsx', import.meta.url), 'utf8')
  assert.match(socialAudio, /approvedAudio\[id\]/)
  const speaker = readFileSync(new URL('./KokoroSpeakButton.jsx', import.meta.url), 'utf8')
  assert.match(speaker, /vocabularySpokenText\(text\)/)
  assert.match(speaker, /preferDevice/)
})

test('tea remains a vocabulary word and Kokoro is the default playback', () => {
  assert.equal(vocabularySpokenText('Tea'), 'Tea')
  assert.equal(vocabularySpokenText('tea'), 'tea')
  const button = readFileSync(new URL('./KokoroSpeakButton.jsx', import.meta.url), 'utf8')
  assert.match(button, /preferKokoro: !useDeviceVoice/)
  assert.doesNotMatch(button, /vocabularyPrefersDeviceVoice/)
})

test('Kokoro uses GPU first, CPU fallback, and never downloads on lesson entry', () => {
  const source = readFileSync(new URL('./kokoroSpeech.js', import.meta.url), 'utf8')
  const topicView = readFileSync(new URL('./VocabularyTopicLesson.jsx', import.meta.url), 'utf8')
  const app = readFileSync(new URL('./ArticoWeb.jsx', import.meta.url), 'utf8')
  assert.match(source, /device: 'webgpu', dtype: 'fp32'/)
  assert.match(source, /device: 'wasm', dtype: 'q8'/)
  assert.match(source, /preferKokoro = false/)
  assert.match(source, /if \(!blob && !preferKokoro && hasDeviceVoice\(\)\)/)
  assert.doesNotMatch(source, /tuneKokoroAfterUserAudio/)
  assert.doesNotMatch(topicView, /warmKokoroSpeech|prefetchKokoroSpeech/)
  assert.match(app, /const Home = lazy\(/)
  assert.match(app, /const Progress = lazy\(/)
  assert.match(app, /const Courses = lazy\(/)
})

test('Kokoro is the default; system voice is opt-in for Vocabulary only', () => {
  const view = readFileSync(new URL('./Vocabulary.jsx', import.meta.url), 'utf8')
  const button = readFileSync(new URL('./KokoroSpeakButton.jsx', import.meta.url), 'utf8')
  const pref = readFileSync(new URL('./vocabularyVoiceMode.js', import.meta.url), 'utf8')
  assert.match(view, /<VoiceSettings japanese=\{japanese\}/)
  assert.match(view, /<option value="kokoro">/)
  assert.match(view, /<option value="device">/)
  assert.match(pref, /=== 'device' \? 'device' : 'kokoro'/)
  assert.match(button, /readVocabularyVoiceMode\(\) === 'device'/)
  assert.match(button, /preferKokoro: !useDeviceVoice/)
  assert.doesNotMatch(button, /forceModel: useOfflineVoice/)
  assert.match(button, /Test speaker/)
})

test('Vocabulary topics and group headings have pronunciation controls', () => {
  const topicUi=readFileSync(new URL('./VocabularyTopicLesson.jsx',import.meta.url),'utf8')
  const overviewUi=readFileSync(new URL('./Vocabulary.jsx',import.meta.url),'utf8')
  const numbersUi=readFileSync(new URL('./VocabularyNumbersLesson.jsx',import.meta.url),'utf8')
  const countriesUi=readFileSync(new URL('./VocabularyCountriesLesson.jsx',import.meta.url),'utf8')
  const groupJapanese=JSON.parse(readFileSync(new URL('./vocabularyGroupJapanese.json',import.meta.url),'utf8'))
  assert.equal(groupJapanese['5'][0],'色')
  assert.match(topicUi,/term !== 'colors'/)
  assert.match(topicUi,/KokoroSpeakButton text=\{group\.title\}/)
  assert.match(topicUi,/lang="ja">色<\/p>/)
  assert.match(overviewUi,/KokoroSpeakButton text=\{topic\.topic\}/)
  assert.match(numbersUi,/KokoroSpeakButton text=\{group\.en\}/)
  assert.match(countriesUi,/KokoroSpeakButton text="Countries and nationalities"/)
})


test('Lesson 05 colors use reference-style SVG swatches only in the color group', () => {
  const organized = JSON.parse(readFileSync(new URL('./vocabularyOrganized.json', import.meta.url), 'utf8'))
  const colors = organized.lessons.find(lesson => lesson.sourceLesson === 5).groups[0].items
  assert.ok(colors.some(([term]) => term === 'yellow'), 'yellow is included in the core color vocabulary')
  const visual = readFileSync(new URL('./vocabularyVisual.js', import.meta.url), 'utf8')
  const swatch = readFileSync(new URL('./VocabularyColorSwatch.jsx', import.meta.url), 'utf8')
  const topic = readFileSync(new URL('./VocabularyTopicLesson.jsx', import.meta.url), 'utf8')
  const support = readFileSync(new URL('./vocabularySupport.js', import.meta.url), 'utf8')
  const style = readFileSync(new URL('./vocabulary-topic.css', import.meta.url), 'utf8')
  assert.match(visual, /chapter === 5 && colorSwatches\[term\]/)
  assert.match(visual, /type: 'color-swatch'/)
  assert.match(swatch, /<svg[\s\S]*viewBox="0 0 240 200"/)
  assert.doesNotMatch(swatch, /<text/)
  assert.match(topic, /<VocabularyColorSwatch color=\{visual\.color\} variant=\{visual\.variant\} \/>/)
  assert.match(topic, /className="vlt-grid"/)
  assert.match(support, /'5:yellow':'黄色'/)
  assert.match(style, /\.vlt-color-swatch\{display:block;width:100%;height:100%\}/)
})
