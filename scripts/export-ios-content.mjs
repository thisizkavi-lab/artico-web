import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, basename } from 'node:path'
import { createHash } from 'node:crypto'
import { Resvg } from '@resvg/resvg-js'
import { buildPracticeCatalog } from '../src/web/practiceCatalog.js'
import { pairScenarioResponses } from '../src/web/scenarioResponses.js'
import { foundationReading, twisterGuidance } from '../src/course/foundations-en.js'
import { allTwisters } from '../src/data.js'
import { learningStages } from '../src/web/pathway.js'
import { lrReading, lrChunks, lrWhole, lrNotes } from '../src/course/lr-content.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, 'ios/Sources/ArticoCore/Resources/Content')
const json = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'))
const write = async (path, data) => writeFile(resolve(output, path), JSON.stringify(data))
const run = text => [{ text }]
const artNames = new Set()
const rememberArt = value => {
  if (!value || typeof value !== 'object') return
  for (const [key, item] of Object.entries(value)) {
    if (['art', 'hero', 'portrait'].includes(key) && typeof item === 'string') artNames.add(item)
    else rememberArt(item)
  }
}
const groupRanges = [[1,10,'Conversation basics','会話の基本'],[11,19,'People & plans','人と予定'],[20,25,'Food & drink','食事と飲み物'],[26,33,'Free time & interests','余暇と興味'],[34,44,'Shopping & services','買い物とサービス'],[45,55,'Study & work','学びと仕事'],[56,64,'At home','家での暮らし'],[65,79,'Travel & getting around','旅行と移動'],[80,87,'Health & care','健康とケア'],[88,96,'Communication & media','連絡とメディア']]
await Promise.all(['en','ja','art','audio'].map(dir=>mkdir(resolve(output,dir),{recursive:true})))
const japaneseFoundation = await json('src/course/locales/ja/foundations.json')
const manifest = { schemaVersion: 1, contentVersion: '', lessons: [] }
const catalog = await json('src/course/catalog.json')
for (const meta of catalog) {
  const versions = {}
  for (const language of ['en','ja']) {
    const source = await json(`src/course/${language==='ja'?'locales/ja/':''}lessons/${meta.id}.json`)
    const model = {id:source.id, phrases:source.phraseBank, sections:source.study.map(s=>({...s,blocks:s.blocks.map(b=>({...b,phrases:b.phraseIds}))}))}
    const practice = buildPracticeCatalog(model)
    const scenarios = source.practice.map(section=> {
      let answering = false
      const prompts=[], answers=[]
      for (const block of section.blocks) {
        if (['answerHeading','answer'].includes(block.type)) answering=true
        ;(answering?answers:prompts).push(block)
      }
      const paired=pairScenarioResponses(prompts,answers)
      return {...section,blocks:prompts.map(b=>b.type==='list'&&b.ordered?{...b,items:b.items.map((item,index)=>({...item,id:`${b.id}-${index}`,sample:paired?.responses[index]}))}:b),answers:paired?answers.filter(b=>b!==paired.block&&b.type!=='answerHeading'):answers}
    })
    const study=[...source.study]
    if(meta.id==='93'&&study.length>1)study.unshift(...study.splice(1,1))
    if(source.diagram)study.splice(Math.min({calendar:2,family:1,sequence:0,presentation:2,home:2,directions:2,body:1}[source.diagram]??1,study.length),0,{id:`${meta.id}-visual`,title:language==='ja'?'見て、理解する':'Look & understand',widget:source.diagram,blocks:[]})
    study.push({id:`${meta.id}-words`,title:language==='ja'?'言葉と表現':'Words & phrases',blocks:[{id:`${meta.id}-glossary`,type:'vocabulary',phraseIds:source.phraseBank.filter(p=>p.section==='words').map(p=>p.id)}]})
    versions[language]={id:meta.id,title:source.title,goal:source.goal,language,study,practice:scenarios,phrases:practice.items,studyPhrases:source.phraseBank,starterIds:practice.starterIds,hero:source.hero,stage:'social'}
    rememberArt(versions[language]); await write(`${language}/${meta.id}.json`,versions[language])
  }
  const group=groupRanges.find(([start,end])=>Number(meta.id)>=start&&Number(meta.id)<=end)
  manifest.lessons.push({id:meta.id,title:meta.title,titleJa:versions.ja.title,goal:meta.goal,goalJa:versions.ja.goal,stage:'social',group:group[2],groupJa:group[3],hero:meta.hero,ordinal:Number(meta.id)+8})
}

function foundationSection(section) {
  if(section.blocks)return {...section,blocks:section.blocks.map(b=>b.type==='twister'?{...b,type:'twisterReference'}:b)}
  const blocks=(section.paragraphs??[]).map((text,i)=>({id:`${section.id}-p${i}`,type:'explanation',runs:run(text)}))
  if(section.items)blocks.push({id:`${section.id}-steps`,type:'list',ordered:true,items:section.items.map((text,i)=>({number:i+1,runs:run(text)}))})
  if(section.note)blocks.push({id:`${section.id}-note`,type:'quote',paragraphs:section.note.map(run)})
  for(const [i,[en,context]] of (section.examples??[]).entries())blocks.push({id:`${section.id}-ex${i}`,type:'example',paragraphs:[run(en),run(context)]})
  return {...section,blocks,linkURL:section.link?.[0],linkTitle:section.link?.[1],videoURL:section.video?`https://www.youtube.com/watch?v=${section.video[0]}&t=${section.video[3]??0}s`:undefined,videoTitle:section.video?.[1]}
}
const foundationIDs=learningStages.flatMap(stage=>stage.lessonIds)
for(const [index,id]of foundationIDs.entries()){
  const english=foundationReading[id]??lrReading
  for(const language of ['en','ja']){
    const source=language==='en'?english:japaneseFoundation[id]
    const enExtras=new Map(english.sections.map(s=>[s.id,s]))
    const study=source.sections.map(s=>{
      const extras=enExtras.get(s.id)??{}
      const normalized=foundationSection(s)
      return {...normalized,widget:normalized.blocks.some(b=>b.type==='twisterReference')?undefined:normalized.widget??extras.widget,videoURL:normalized.videoURL??(extras.video?`https://www.youtube.com/watch?v=${extras.video[0]}&t=${extras.video[3]??0}s`:undefined),videoTitle:normalized.videoTitle??extras.video?.[1],linkURL:normalized.linkURL??extras.link?.[0],linkTitle:normalized.linkTitle??extras.link?.[1]}
    })
    const phrases=id==='lr'?[...lrChunks,lrWhole].map((item,i)=>({...item,context:language==='ja'?item.ja:lrNotes[i]??'Connect the complete thought.',section:'lr-parts',studyId:'lr-parts',kind:'phrase'})):[]
    if(id==='lr'){
      study[0].blocks.unshift({id:'lr-art',type:'illustration',art:'a97bc.svg',caption:language==='ja'?'赤いバラのそばにいるLily。':'Lily beside red roses.'})
      artNames.add('a97bc.svg')
    }
    // Platform wording changes only; teaching content stays shared with the web.
    const adapted=JSON.parse(JSON.stringify(study).replaceAll('in this browser','on this device').replaceAll('このブラウザー','この端末').replaceAll('このブラウザ','この端末'))
    await write(`${language}/${id}.json`,{id,title:english.title,goal:source.subtitle,language,study:adapted,practice:[],practiceGuidance:source.practice??[],phrases,studyPhrases:phrases,starterIds:phrases.map(p=>p.id),stage:index<2?'orientation':'foundation'})
  }
  manifest.lessons.push({id,title:english.title,titleJa:japaneseFoundation[id].title,goal:english.subtitle,goalJa:japaneseFoundation[id].subtitle,stage:index<2?'orientation':'foundation',group:index<2?'Orientation':'Foundations',groupJa:index<2?'はじめに':'基礎',ordinal:index+1})
}
manifest.lessons.sort((a,b)=>a.ordinal-b.ordinal)
const twisters=await Promise.all(allTwisters.map(async item=>{
  const chunkAudio=[]
  for(let i=0;i<item.buildSteps.length;i++){
    const file=i===item.buildSteps.length-1?`${item.id}.wav`:`segments/${item.id}-${i+1}.wav`
    try{await readFile(resolve(root,'public/audio',file));chunkAudio.push(file.replaceAll('/','-'))}catch{chunkAudio.push(null)}
  }
  return {...item,guidance:twisterGuidance[item.id][1],audio:`${item.id}.wav`,chunkAudio}
}))
await write('twisters.json',twisters)
for(const dir of ['','segments']){
  for(const file of await readdir(resolve(root,'public/audio',dir))){
    if(!file.endsWith('.wav'))continue
    await copyFile(resolve(root,'public/audio',dir,file),resolve(output,'audio',dir?`${dir}-${file}`:file))
  }
}
for(const name of ['knife','whisk','plate','bed','kitchen','sofa'])artNames.add(`word-${name}.svg`)
for(const name of artNames){
  let svg
  for(const folder of ['course','figma','illustrations']){
    try{svg=await readFile(resolve(root,'public/assets',folder,name));break}catch{}
  }
  if(!svg)throw new Error(`Missing illustration: ${name}`)
  const image=new Resvg(svg,{fitTo:{mode:'width',value:name.startsWith('portrait-')?160:840}}).render().asPng()
  await writeFile(resolve(output,'art',basename(name,'.svg')+'.png'),image)
}
const hashes=[]
for(const language of ['en','ja'])for(const lesson of manifest.lessons)hashes.push(await readFile(resolve(output,language,`${lesson.id}.json`)))
manifest.contentVersion=createHash('sha256').update(Buffer.concat(hashes)).digest('hex').slice(0,16)
await write('manifest.json',manifest)
console.log(`Exported ${manifest.lessons.length} lessons × 2 languages, ${artNames.size} illustrations, and ${twisters.length} existing recordings. Version ${manifest.contentVersion}.`)
