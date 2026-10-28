import { timeIllustration } from './VocabularyTimeArt'
import { routineScene } from './VocabularySceneArt'

// Deliberately avoid generic topic symbols for meaning cards. A misleading
// illustration is worse than a clear bilingual text card.
export const visualColor = {
 black:'#212734',blue:'#327bdd',brown:'#936544',cream:'#f5edcc',
 'dark green':'#1e6044',gray:'#9199a7',green:'#58a56d',
 'navy blue':'#203e73',orange:'#fa982b','pale green':'#b9ddbd',
 pink:'#e9a1c2',purple:'#9464bd',red:'#d95754',white:'#fff',
 yellow:'#efcb45','orange (color)':'#fa982b','cream (color)':'#f5edcc',
}
const dimensions = new Set(['big','little','small','long','short','thick','thin',
  'high','low','near','far','deep','shallow','narrow','heavy','light','tight','loose'])
const materials = new Set(['denim','fabric','glass','leather','metal','paper','plastic','silk'])
const weather = {
 'sun':'sunny','sunny':'sunny','cloud':'cloudy','cloudy':'cloudy',
 'overcast':'cloudy','fog':'fog','foggy':'fog',
 'rain':'rain','rainy':'rain','downpour':'rain','raindrop':'rain',
 'snow':'snow','snowy':'snow','snowflake':'snow','snowstorm':'snow',
 'thunder':'storm','storm':'storm','stormy':'storm','lightning':'storm',
 'windy':'wind','wind':'wind','rainbow':'rainbow','frost':'snow',
}
const directions = {
 north:'north',south:'south',east:'east',west:'west',
 'left':'left','right':'right','straight ahead':'forward',
 'turn left':'left','turn right':'right','go straight':'forward',
}
export function vocabularyVisual(term,chapter) {
 const time=timeIllustration(term,chapter)
 if(time)return time
 const scene=routineScene(term,chapter)
 if(scene)return {type:'scene',scene}
 const normalized=term.toLowerCase().replace(/\s*\([^)]*\)/g,'').split(' / ')[0].trim()
 if(chapter===5) {
  if(visualColor[normalized])return {type:'color',value:visualColor[normalized]}
  if(dimensions.has(normalized))return {type:'size',value:normalized}
  if(materials.has(normalized))return {type:'material',value:normalized}
 }
 if(chapter===51&&weather[normalized])return {type:'weather',value:weather[normalized]}
 if(chapter===46&&directions[normalized])return {type:'direction',value:directions[normalized]}
 return null
}
