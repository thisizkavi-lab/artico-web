// Original illustrated food objects. Each key is an identifiable ingredient or
// dish; we do not assign an arbitrary food symbol to an unknown word.
const foodByTerm = {
 'apple':'apple','apricot':'apricot','avocado':'avocado','avocados':'avocado',
 'banana':'banana','blackberries':'berries','blackcurrants':'berries',
 'blueberry / blueberries':'berries','cranberries':'berries','currant':'berries',
 'gooseberries':'berries','raspberries':'berries','redcurrants':'berries',
 'strawberry / strawberries':'strawberry',
 'grape / grapes':'grapes','cherries':'cherry','coconut':'coconut',
 'fig':'fig','golden raisin':'raisins','raisin':'raisins','sultana':'raisins',
 'grapefruit':'grapefruit','lemon':'lemon','lime':'lime','mandarin':'orange',
 'orange (fruit)':'orange','peach':'peach','nectarine':'peach',
 'pear':'pear','plum':'plum','pomegranate':'pomegranate',
 'kiwi fruit':'kiwi','mango':'mango','melon':'melon',
 'papaya':'papaya','pineapple':'pineapple','watermelon':'watermelon',
 'cashew nut':'nuts','hazelnut':'nuts','peanut':'nuts','pistachio':'nuts','walnut':'nuts',
 'carrot / carrots':'carrot','tomato / tomatoes':'tomato','potato / potatoes':'potato',
 'sweet potatoes':'potato','onion / onions':'onion','garlic':'garlic',
 'corn / sweetcorn':'corn','corn / sweetcorn (mainly uk, for the vegetable)':'corn',
 'eggplants':'eggplant','pepper / peppers':'pepper','cucumber / cucumbers':'cucumber',
 'zucchini':'cucumber','mushrooms':'mushroom','broccoli':'broccoli','cauliflower':'cauliflower',
 'cabbage':'cabbage','lettuce':'lettuce','spinach':'lettuce','peas':'peas',
 'bread':'bread','toast':'bread','bagel':'bagel','croissant':'croissant',
 'rice':'rice','pasta':'pasta','spaghetti':'pasta','noodles':'pasta',
 'cheese':'cheese','butter':'butter','milk':'milk','yogurt':'yogurt',
 'egg / eggs':'egg','egg / eggs (plural)':'egg',
 'boiled egg':'egg','fried egg':'fried-egg','poached egg':'fried-egg','scrambled eggs':'fried-egg',
 'pizza':'pizza','burger':'burger','sandwich':'sandwich',
 'cake':'cake','cheesecake':'cake','cupcake':'cupcake','cookie':'cookie',
 'ice cream':'ice-cream','chocolate':'chocolate','candy':'candy',
 'salad':'salad','soup':'soup','sushi':'sushi',
 'fish':'fish','salmon':'fish','cod':'fish','mackerel':'fish','sardines':'fish',
 'shrimp':'shrimp','prawn':'shrimp','crab':'crab',
 'hot dog':'hot-dog','fries':'fries','chips':'chips',
 'bottle':'bottle','glass':'glass','bowl (container)':'bowl',
}
export function foodIllustration(term,chapter) {
 if(![28,29,30,31,32].includes(chapter))return null
 const direct=foodByTerm[term.toLowerCase()]
 return direct ? {type:'food',kind:direct} : null
}
const palettes={
 apple:'#cf615d',orange:'#f1a341',lemon:'#ebce64',lime:'#99bd72',peach:'#e99e88',plum:'#8b6fa5',
 mango:'#eab75e',tomato:'#d96861',potato:'#bf9d72',pear:'#b3c976',
 fig:'#ab81a3',kiwi:'#9bb76f',pomegranate:'#c96c69',
 berries:'#6d76b6',grapes:'#9477aa',cherry:'#d7606b',strawberry:'#d95360',
}
const outline='#6f8094'
const leaves=<path d="M78 24q12-13 23-7-8 15-23 13Z" fill="#81aa79" stroke="#668a75" strokeWidth="1.5"/>
function RoundFruit({kind}) {
 const color=palettes[kind]||'#dfac81'
 const pear=kind==='pear'
 return <g>
 {pear?<path d="M68 35q13-10 9-19q-6 4-13 0q-10 15-5 20q-24 19-14 41q12 19 33 15q26-6 27-28q-1-17-22-29Z" fill={color} stroke={outline} strokeWidth="2"/>:
  <path d="M76 31q-17-12-30 5q-16 17-4 37q13 25 34 13q25 15 39-14q8-19-7-35q-13-15-32-6Z" fill={color} stroke={outline} strokeWidth="2"/>}
 <path d="M76 32q-3-12 1-19" stroke="#866e59" strokeWidth="3" strokeLinecap="round"/>
 {leaves}
 {['orange','lemon','lime','grapefruit'].includes(kind) && Array.from({length:5},(_,i)=><circle key={i} cx={56+i*11} cy={58+((i%2)*9)} r="1.5" fill="#f6d39d"/>)}
 {['peach','mango'].includes(kind)&&<path d="M84 37q20 19 3 44" fill="none" stroke="#bf8270" strokeWidth="2"/>}
 </g>
}
function Dish({kind}) {
 if(kind==='pizza') return <g><path d="M34 23q46-20 91 0l-47 64z" fill="#f5c879" stroke="#b7895a" strokeWidth="2.5"/><path d="M34 23Q78 5 125 23" stroke="#c6965c" strokeWidth="9" fill="none"/>{[[68,38],[86,52],[63,63],[101,30]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6" fill="#ca6f5f"/>)}</g>
 if(kind==='burger')return <g><path d="M35 45q0-34 43-32q45 0 45 32z" fill="#edc185" stroke="#ac8e69" strokeWidth="2"/><path d="M36 48h87" stroke="#6da679" strokeWidth="9"/><path d="M36 59h88" stroke="#9a5b49" strokeWidth="10"/><path d="M35 69h90v10q-48 13-90 0z" fill="#efc58c" stroke="#ac8e69" strokeWidth="2"/>{[50,75,100].map(x=><ellipse key={x} cx={x} cy="28" rx="4" ry="2" fill="#fff1d6"/>)}</g>
 if(kind==='sandwich')return <g><path d="M24 64L80 18L135 64Z" fill="#e8c58f" stroke="#b79a76" strokeWidth="3"/><path d="M35 64L80 30L122 64" fill="none" stroke="#8faf79" strokeWidth="8"/><path d="M33 74h95" stroke="#b79a76" strokeWidth="11"/></g>
 if(kind==='cake'||kind==='cupcake')return <g><path d="M40 42L112 42L124 79H28z" fill="#e7b6a6" stroke="#b98981" strokeWidth="2"/><path d="M40 42q-9-16 6-17q9-14 22-3q13-15 27 0q23-6 17 20Z" fill="#fbf2e8" stroke="#c5a6a4" strokeWidth="2"/><circle cx="78" cy="21" r="6" fill="#d16d79"/></g>
 if(kind==='ice-cream')return <g><path d="M59 50l18 38 20-38z" fill="#eacb91" stroke="#b89c70" strokeWidth="2"/><path d="M60 49q-13-25 6-28q4-18 19-7q19-4 17 19q11 15-5 19Z" fill="#f3bfc6" stroke="#ce94a1" strokeWidth="2"/></g>
 if(kind==='soup'||kind==='salad'||kind==='rice')return <g><ellipse cx="77" cy="44" rx="53" ry="20" fill="#e6eaf0" stroke="#91a7bd" strokeWidth="2.5"/><ellipse cx="77" cy="42" rx="44" ry="13" fill={kind==='soup'?'#d6a569':kind==='salad'?'#82b48c':'#f8f6ed'}/><path d="M24 44q2 41 53 41t53-41" fill="#f8fafd" stroke="#91a7bd" strokeWidth="2"/>{kind==='salad'&&[45,63,89,105].map((x,i)=><circle key={x} cx={x} cy={40+i%2*5} r="7" fill={i%2?'#a4cc7b':'#6f9c79'}/>)}</g>
 if(kind==='fries')return <g><path d="M48 37l-8-26M61 37l-2-26M76 37l4-26M92 37l10-26M107 37l14-21" stroke="#efc56e" strokeWidth="9" strokeLinecap="round"/><path d="M37 32h82l-15 54H52Z" fill="#db7064" stroke="#a95652" strokeWidth="2"/></g>
 if(kind==='hot-dog')return <g><path d="M27 59q3-23 22-22h61q22 3 17 22q-3 17-22 17H48Q31 74 27 59Z" fill="#efd0a0" stroke="#c19c76" strokeWidth="2"/><path d="M39 55h78" stroke="#a96c56" strokeWidth="13" strokeLinecap="round"/><path d="M45 53q23-10 47 1t21-1" fill="none" stroke="#f0c65d" strokeWidth="3"/></g>
 if(kind==='sushi')return <g>{[44,77,110].map((x,i)=><g key={i}><rect x={x-15} y="42" width="28" height="25" rx="7" fill="#f3f1e5" stroke="#9ba1a9" strokeWidth="1.5"/><rect x={x-17} y="35" width="32" height="13" rx="6" fill={i===1?'#e7a28a':'#efaa8c'} stroke="#bf8174"/></g>)}</g>
 return <g><ellipse cx="77" cy="62" rx="50" ry="13" fill="#e5ecf3" stroke="#97abc4" strokeWidth="2"/><circle cx="76" cy="47" r="23" fill="#dfb47e"/></g>
}
export default function VocabularyFoodArt({kind}) {
 const round=['apple','orange','lemon','lime','peach','plum','tomato','pear','apricot'].includes(kind)
 return <svg className="vlt-food-art" viewBox="0 0 152 96" role="img" aria-label="Illustrated food">
  <rect x="1" y="1" width="150" height="94" rx="10" fill="#fcf9f3" stroke="#efe6da"/>
  <ellipse cx="77" cy="84" rx="46" ry="5" fill="#e2d6c8" fillOpacity=".65"/>
  {round&&<RoundFruit kind={kind}/>}
  {kind==='grapefruit'&&<g><circle cx="77" cy="52" r="34" fill="#e6c47c" stroke="#c2a36e" strokeWidth="2"/><circle cx="77" cy="52" r="28" fill="#e9a4a5" stroke="#f4e2c8" strokeWidth="3"/>{Array.from({length:9},(_,i)=>{const a=i*Math.PI*2/9;return <path key={i} d={'M77 52L'+(77+28*Math.cos(a))+' '+(52+28*Math.sin(a))} stroke="#f9d6d6" strokeWidth="2"/>})}</g>}
  {kind==='kiwi'&&<g><circle cx="77" cy="52" r="35" fill="#b48c69" stroke="#99785f" strokeWidth="2"/><circle cx="77" cy="52" r="30" fill="#a0bb77"/><circle cx="77" cy="52" r="11" fill="#e9e7cc"/>{Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <ellipse key={i} cx={77+17*Math.cos(a)} cy={52+17*Math.sin(a)} rx="2" ry="3.5" transform={'rotate('+(i*30)+' '+(77+17*Math.cos(a))+' '+(52+17*Math.sin(a))+')'} fill="#676757"/>})}</g>}
  {kind==='mango'&&<g><path d="M46 62q-10-31 31-46q42-8 42 30q-8 40-44 43q-24-2-29-27Z" fill="#edbd72" stroke="#b58c5e" strokeWidth="2.5"/><path d="M83 22q10-14 25-12" stroke="#7d9e6e" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M103 22Q79 58 62 82" fill="none" stroke="#e6a36c" strokeWidth="3"/></g>}
  {kind==='papaya'&&<g><ellipse cx="77" cy="52" rx="35" ry="44" fill="#e8ae66" stroke="#b88c57" strokeWidth="2"/><ellipse cx="77" cy="52" rx="26" ry="35" fill="#f4cc8c"/><ellipse cx="77" cy="52" rx="13" ry="24" fill="#c98a61"/>{[[72,39],[82,44],[70,51],[83,59],[76,68],[76,54]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#6e5951"/>)}</g>}
  {kind==='fig'&&<g><path d="M77 12q-5 14-20 26Q33 70 56 85q22 13 42-2q24-17-2-46Q82 22 77 12Z" fill="#9376a1" stroke="#715d80" strokeWidth="2.5"/><path d="M77 14l4-9" stroke="#73946d" strokeWidth="4"/></g>}
  {kind==='pomegranate'&&<g><path d="M56 25l7-15 14 11 14-11 6 15" fill="#b75b60" stroke="#934d57" strokeWidth="2"/><circle cx="77" cy="58" r="34" fill="#c96c69" stroke="#984f55" strokeWidth="2.5"/><path d="M77 24v-8" stroke="#a8585a" strokeWidth="4"/></g>}
  {kind==='melon'&&<g><ellipse cx="77" cy="53" rx="40" ry="34" fill="#b6c88c" stroke="#849b6c" strokeWidth="2.5"/>{[-20,-10,0,10,20].map(x=><path key={x} d={'M'+(77+x)+' 21q-15 30 0 64'} stroke="#9bb47a" strokeWidth="2" fill="none"/>)}</g>}
  {kind==='chips'&&<g><ellipse cx="77" cy="70" rx="56" ry="19" fill="#fff" stroke="#a2b3c5" strokeWidth="2"/>{[[52,56],[73,45],[92,61],[111,51],[66,67]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="14" ry="8" transform={'rotate('+(i*22-30)+' '+x+' '+y+')'} fill="#e8c383" stroke="#bf9e68" strokeWidth="1.7"/>)}</g>}
  {kind==='banana'&&<path d="M25 39Q56 92 128 34Q106 91 54 82Q35 75 25 39Z" fill="#eed270" stroke="#b79b5b" strokeWidth="2.5"/>}
  {kind==='strawberry'&&<g><path d="M47 33q28-14 57 0q14 31-29 59Q37 67 47 33Z" fill="#d15d6b" stroke="#a04f62" strokeWidth="2"/><path d="M49 32l-12-9 25 4 14-17 6 18 25-7-10 13Z" fill="#82aa79"/>{Array.from({length:12},(_,i)=><ellipse key={i} cx={49+i%4*14} cy={45+Math.floor(i/4)*12} rx="2" ry="3" fill="#f0d491"/>)}</g>}
  {kind==='grapes'&&<g><path d="M76 12v22" stroke="#8a7f64" strokeWidth="3"/>{[[68,40],[84,40],[58,55],[75,55],[92,55],[67,69],[84,69],[76,82]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="10" fill={i%2?'#9a7fb6':'#8770a8'} stroke="#756592" strokeWidth="1.5"/>)}</g>}
  {kind==='berries'&&<g>{[[50,62],[63,47],[77,64],[89,47],[105,63],[77,32]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="12" fill={['#6573ac','#7372b5','#8a79a8'][i%3]} stroke="#525d8e"/>)}<path d="M76 22l5-14" stroke="#72946d" strokeWidth="3"/></g>}
  {kind==='cherry'&&<g><path d="M58 62Q54 32 78 13M98 62Q103 33 78 13" stroke="#85956a" strokeWidth="3" fill="none"/><circle cx="56" cy="66" r="17" fill="#d95e69" stroke="#a65260"/><circle cx="100" cy="66" r="17" fill="#d95e69" stroke="#a65260"/></g>}
  {kind==='watermelon'&&<g><path d="M27 70L77 12L127 70Z" fill="#e57b77" stroke="#bc5f66" strokeWidth="2"/><path d="M27 70H127" stroke="#7ea47b" strokeWidth="10"/>{[[77,40],[66,52],[88,54]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="2.5" ry="4" fill="#77595d"/>)}</g>}
  {kind==='pineapple'&&<g><path d="M77 27l-16-23 17 15 13-16-4 25" fill="#75a076" stroke="#587e61" strokeWidth="2"/><path d="M49 32q29-16 56 0q11 39-29 58q-40-19-27-58Z" fill="#d6b66d" stroke="#a68b55" strokeWidth="2"/>{[43,57,71].map(y=><path key={y} d={'M49 '+y+'h54'} stroke="#ae945e" strokeWidth="2"/>)}</g>}
  {kind==='avocado'&&<g><path d="M77 17q-32 17-31 48q4 26 31 25q29-1 29-25q0-31-29-48Z" fill="#8db773" stroke="#628a61" strokeWidth="2.5"/><path d="M77 25q-22 18-20 41q2 19 20 18q19-1 19-19q0-24-19-40Z" fill="#dce3a6"/><circle cx="78" cy="62" r="14" fill="#b88960" stroke="#996e50"/></g>}
  {kind==='carrot'&&<g><path d="M59 30l19 55 24-56Z" fill="#e1a268" stroke="#b9794d" strokeWidth="2"/><path d="M78 32l-8-25M79 32l10-25M79 32V5" stroke="#7caf79" strokeWidth="5" strokeLinecap="round"/></g>}
  {kind==='eggplant'&&<g><path d="M92 31q25 17 8 44q-16 22-39 8q-18-17-6-37q10-18 37-15Z" fill="#7b77ad" stroke="#635c91" strokeWidth="2"/><path d="M88 32l-17-16-11 17 18-5 3 14 9-11Z" fill="#7aa078" stroke="#658f70"/></g>}
  {kind==='pepper'&&<g><path d="M76 30q-24-13-32 12q-8 32 13 46q11 4 20-5q15 12 26 3q18-28 3-46q-12-19-30-10Z" fill="#de746e" stroke="#aa5d5d" strokeWidth="2"/><path d="M76 31q-4-17 11-21" fill="none" stroke="#779a67" strokeWidth="4"/></g>}
  {kind==='corn'&&<g><rect x="56" y="18" width="42" height="67" rx="20" fill="#eaca70" stroke="#a99251" strokeWidth="2"/>{[28,39,50,61,72].map(y=>[64,75,86].map(x=><circle key={x+'-'+y} cx={x} cy={y} r="4" fill="#f4df94"/>))}<path d="M58 82Q40 47 44 33q8 19 32 28M93 82q26-40 14-51q-7 29-24 35" fill="#83ac75" stroke="#719269" strokeWidth="2"/></g>}
  {kind==='broccoli'||kind==='cauliflower'?<g><path d="M66 54h26l-3 33H69Z" fill="#b6c796"/><circle cx="59" cy="43" r="21" fill={kind==='broccoli'?'#679d75':'#e7dec2'} stroke="#779d79"/><circle cx="88" cy="35" r="21" fill={kind==='broccoli'?'#75aa79':'#eae1cd'} stroke="#779d79"/><circle cx="101" cy="51" r="19" fill={kind==='broccoli'?'#609a6f':'#e9e0c9'} stroke="#779d79"/></g>:null}
  {kind==='mushroom'&&<g><path d="M65 46h28l-7 40H72Z" fill="#ebd5b6" stroke="#b49c82" strokeWidth="2"/><path d="M41 51Q41 10 78 15Q113 15 115 51Z" fill="#c48976" stroke="#946d67" strokeWidth="2"/>{[59,82,103].map(x=><circle key={x} cx={x} cy="35" r="4" fill="#f3dfcb"/>)}</g>}
  {['onion','garlic','potato'].includes(kind)&&<g><path d="M76 22q-29 22-24 50q5 18 25 17q25 2 28-18q1-25-29-49Z" fill={kind==='garlic'?'#f0e5d3':kind==='onion'?'#c7a986':'#be9a73'} stroke="#aa8b71" strokeWidth="2"/><path d="M76 20V9" stroke="#719d6f" strokeWidth="4"/></g>}
  {kind==='cucumber'&&<g><rect x="38" y="43" width="84" height="28" rx="14" fill="#7cb08b" stroke="#5e946b" strokeWidth="2"/><path d="M45 57h70" stroke="#a3c99e" strokeWidth="4"/></g>}
  {kind==='peas'&&<g><path d="M25 44q30-29 100 0q-29 34-100 0Z" fill="#82b27a" stroke="#5e966e" strokeWidth="2"/>{[49,69,88,107].map(x=><circle key={x} cx={x} cy="44" r="8" fill="#a9ca8e" stroke="#749e6b"/>)}</g>}
  {['lettuce','cabbage'].includes(kind)&&<g><circle cx="76" cy="52" r="35" fill="#a4cb8d" stroke="#6ea374" strokeWidth="2"/><path d="M49 46q29-31 55 0q-40 0-36 26Q87 61 99 58" fill="none" stroke="#72a671" strokeWidth="3"/></g>}
  {kind==='coconut'&&<g><ellipse cx="77" cy="55" rx="35" ry="31" fill="#9d7a5e" stroke="#795b4e" strokeWidth="2.5"/><path d="M44 53q32-20 63 0M51 71q27-16 51 0" fill="none" stroke="#c4a184" strokeWidth="2"/><circle cx="65" cy="44" r="3" fill="#745748"/><circle cx="86" cy="44" r="3" fill="#745748"/></g>}
  {kind==='raisins'&&<g>{[[52,43],[66,33],[79,43],[92,38],[105,52],[61,61],[83,63],[94,72]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="9" ry="12" fill="#a17b68" stroke="#806253" strokeWidth="1.5"/>)}</g>}
  {kind==='nuts'&&<g>{[[53,55],[78,43],[105,59]].map(([x,y],i)=><g key={i}><ellipse cx={x} cy={y} rx="14" ry="20" transform={'rotate('+(i*24-15)+' '+x+' '+y+')'} fill="#d2b184" stroke="#9d815e" strokeWidth="2"/><path d={'M'+(x-6)+' '+y+'q6-8 12 0'} fill="none" stroke="#af906b" strokeWidth="1.5"/></g>)}</g>}
  {kind==='butter'&&<g><path d="M34 47l48-19 42 17-44 24Z" fill="#f6d88d" stroke="#c9ae74" strokeWidth="2"/><path d="M34 47v18l46 20V69M124 45v18L80 85" fill="#e9c97e" stroke="#c9ae74" strokeWidth="2"/></g>}
  {kind==='bottle'&&<g><path d="M63 17h29v16l9 13v37H54V46l9-13Z" fill="#bcdfec" fillOpacity=".8" stroke="#83acc1" strokeWidth="2.5"/><path d="M65 13h25" stroke="#669cb6" strokeWidth="7"/><path d="M60 54h36v22H60Z" fill="#e5f1f6"/></g>}
  {kind==='glass'&&<g><path d="M45 20h65l-9 62q-23 8-47 0Z" fill="#d8eef2" fillOpacity=".65" stroke="#8eb2c0" strokeWidth="2.5"/><path d="M50 55q26 8 55 0" fill="none" stroke="#74b8d0" strokeWidth="3"/></g>}
  {kind==='bowl'&&<g><ellipse cx="77" cy="42" rx="49" ry="17" fill="#eef5fa" stroke="#8eabc7" strokeWidth="2.5"/><path d="M28 42q2 42 49 42t49-42" fill="#e3edf5" stroke="#8eabc7" strokeWidth="2.5"/></g>}
  {kind==='egg'&&<ellipse cx="77" cy="52" rx="25" ry="34" fill="#f5f2e7" stroke="#c3b8a7" strokeWidth="2"/>}
  {kind==='fried-egg'&&<g><path d="M35 54q-8-21 18-27q14-15 35 1q38-7 40 23q2 31-29 30q-17 14-36 0q-32 5-28-27Z" fill="#fffdf2" stroke="#ddd0b9" strokeWidth="2"/><circle cx="79" cy="52" r="18" fill="#f1c06f"/></g>}
  {kind==='fish'&&<g><path d="M32 54Q65 16 111 54Q66 87 32 54Z" fill="#88b3c0" stroke="#577e97" strokeWidth="2"/><path d="M109 53l28-22v44Z" fill="#85adb6" stroke="#577e97" strokeWidth="2"/><circle cx="49" cy="50" r="3" fill="#4f6270"/></g>}
  {kind==='shrimp'&&<g><path d="M38 40Q72 12 108 41Q130 64 100 79Q85 86 70 72" fill="none" stroke="#de9d88" strokeWidth="17" strokeLinecap="round"/><path d="M46 45l-19 18M49 45l-26-4" stroke="#a36f68" strokeWidth="3"/></g>}
  {kind==='crab'&&<g><ellipse cx="76" cy="55" rx="31" ry="21" fill="#d58d79" stroke="#a46a60" strokeWidth="2"/><path d="M47 55L23 34M105 55l25-21M47 66L25 82M105 66l24 16" stroke="#bc7a6f" strokeWidth="6" strokeLinecap="round"/><circle cx="66" cy="48" r="3" fill="#49586a"/><circle cx="89" cy="48" r="3" fill="#49586a"/></g>}
  {kind==='bread'&&<g><path d="M41 34q-4-22 19-24q14-15 31-1q28 0 22 26v48H41Z" fill="#ddb886" stroke="#b48f67" strokeWidth="3"/><path d="M48 39q-3-18 18-22q14-10 24 0q17 1 15 22v36H48Z" fill="#f5e7c5"/></g>}
  {kind==='croissant'&&<g><path d="M20 56q25-41 42-12q14-18 31-4q19-16 39 15q-25 25-49 9Q42 85 20 56Z" fill="#dcb376" stroke="#a78661" strokeWidth="2"/><path d="M61 44q-8 12-8 26M93 40q-11 16-7 27" stroke="#b68b59" strokeWidth="3"/></g>}
  {kind==='bagel'&&<g><circle cx="77" cy="51" r="35" fill="#d5ab74" stroke="#a88055" strokeWidth="2"/><circle cx="77" cy="51" r="15" fill="#fcf9f3" stroke="#b28e64" strokeWidth="2"/></g>}
  {kind==='pasta'&&<g><ellipse cx="77" cy="61" rx="54" ry="21" fill="#fff" stroke="#9daec5" strokeWidth="2"/>{[0,1,2,3].map(i=><path key={i} d={'M'+(35+i*17)+' 57q25-24 56 4'} fill="none" stroke="#e6c67b" strokeWidth="4" strokeLinecap="round"/>)}</g>}
  {kind==='cheese'&&<g><path d="M39 63l68-42 17 60H39Z" fill="#ecc76f" stroke="#b69c5c" strokeWidth="2"/><circle cx="89" cy="65" r="8" fill="#f9e6a0"/><circle cx="112" cy="73" r="4" fill="#f9e6a0"/></g>}
  {kind==='milk'&&<g><path d="M59 28l8-15h23l9 15v57H59Z" fill="#fff" stroke="#a6b9cc" strokeWidth="2"/><path d="M59 42h40v34H59Z" fill="#d7e9f5"/><path d="M68 13h22" stroke="#9cb7c8" strokeWidth="4"/></g>}
  {kind==='yogurt'&&<g><path d="M42 36h70l-9 47H51Z" fill="#d9e7ef" stroke="#97adc0" strokeWidth="2"/><path d="M42 36h70" stroke="#8ca6bd" strokeWidth="7"/><circle cx="77" cy="60" r="11" fill="#e6a3ac"/></g>}
  {kind==='cookie'&&<g><circle cx="77" cy="52" r="35" fill="#dfbb8e" stroke="#b69570" strokeWidth="2"/>{[[59,38],[85,35],[96,59],[71,68],[52,61]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill="#9b7465"/>)}</g>}
  {kind==='chocolate'&&<g><rect x="42" y="27" width="71" height="51" rx="4" fill="#895f53" stroke="#694c48" strokeWidth="2"/>{[0,1].flatMap(y=>[0,1,2].map(x=><rect key={x+'-'+y} x={45+x*22} y={31+y*22} width="18" height="18" rx="2" fill="#a77966" stroke="#79564e"/>))}</g>}
  {['pizza','burger','sandwich','cake','cupcake','ice-cream','soup','salad','rice','fries','hot-dog','sushi'].includes(kind)&&<Dish kind={kind}/>}
 </svg>
}
