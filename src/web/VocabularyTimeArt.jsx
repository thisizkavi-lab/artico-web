// Illustrated calendar, frequency and time-of-day diagrams for Lesson 03.
const months=['January','February','March','April','May','June','July','August','September','October','November','December']
const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const seasons=['spring','summer','fall (season) / autumn','winter']
const frequency={'always':7,'usually':6,'often':5,'sometimes':3,'rarely / seldom':1,'never':0,'daily / every day':7,'every other day':4,'once a week':1,'twice a week':2,'three times a week':3,'weekly / every week':1}
const dayTimes=['morning / in the morning','noon','midday','afternoon / in the afternoon','evening / in the evening','night / at night','midnight','a.m.','p.m.','dawn','sunrise','sunset','dusk','time',"What time is it?","o'clock"]
const clockTerms=['time','What time is it?',"o'clock",'a.m.','p.m.']
const spanTimes=['second','minute','hour','day','week','two weeks / a fortnight','month','year','decade','century','millennium / millennia']
export function timeIllustration(term, chapter) {
 if(chapter!==3)return null
 const d=days.findIndex(x=>x.toLowerCase()===term.toLowerCase())
 if(d>=0)return {type:'calendar-day',index:d}
 const m=months.findIndex(x=>x.toLowerCase()===term.toLowerCase())
 if(m>=0)return {type:'calendar-month',index:m}
 if(term==='weekday'||term==='weekend')return {type:'calendar-range',index:term==='weekday'?0:1}
 const s=seasons.indexOf(term)
 if(s>=0)return {type:'season',index:s}
 if(frequency[term]!==undefined)return {type:'frequency',count:frequency[term],term}
 if(clockTerms.includes(term))return {type:'clock',term}
 if(dayTimes.includes(term))return {type:'daytime',term}
 if(spanTimes.includes(term))return {type:'duration',term}
 if(['yesterday / today / tomorrow','earlier / later','before / after','now / right now','ago','soon','on time / late / early'].includes(term))return {type:'timeline',term}
 if(term==='calendar'||term==='date'||term==='schedule')return {type:'calendar-month',index:0}
 return null
}
const bg='#f8fafd',stroke='#b3c8df',ink='#3c628e',active='#377ac7'
function Frame({children}){return <svg className="vlt-time-art" viewBox="0 0 152 96" role="img" aria-label="Time diagram"><rect x="1" y="1" width="150" height="94" rx="10" fill={bg} stroke="#e2ebf4"/>{children}</svg>}
function CalendarWeek({highlight,range=false,masked=false}){
 return <Frame>
  <rect x="11" y="13" width="130" height="72" rx="7" fill="#fff" stroke={stroke}/>
  <rect x="11" y="13" width="130" height="13" rx="5" fill="#e6eef8"/>
  <path d="M18 18V9M134 18V9" stroke={ink} strokeWidth="3" strokeLinecap="round"/>
  {days.map((day,i)=><g key={day} transform={'translate('+(17+i*18.1)+' 36)'}>
   <rect width="15" height="29" rx="3" fill={(range?(highlight===0?i<5:i>=5):highlight===i)?'#b9d6f1':'#edf3f9'} stroke={(range?(highlight===0?i<5:i>=5):highlight===i)?active:'#d8e4f0'}/>
   <text x="7.5" y="12" fontSize="8" fontWeight="700" textAnchor="middle" fill={ink}>{masked?'·':day.slice(0,2).toUpperCase()}</text>
   <circle cx="7.5" cy="22" r="3.5" fill={(range?(highlight===0?i<5:i>=5):highlight===i)?active:'#c8d6e7'}/>
  </g>)}
  <path d="M18 75H134" stroke="#e4edf5"/>
 </Frame>
}
function CalendarMonth({index,masked=false}) {
 const year=2026,start=(new Date(Date.UTC(year,index,1)).getUTCDay()+6)%7;
 const length=new Date(Date.UTC(year,index+1,0)).getUTCDate()
 return <Frame>
 <rect x="19" y="8" width="114" height="80" rx="6" fill="#fff" stroke={stroke}/>
 <rect x="19" y="8" width="114" height="18" rx="5" fill="#dbe9fa"/>
 <path d="M29 12v-8M123 12v-8" stroke={ink} strokeWidth="3" strokeLinecap="round"/>
 <text x="76" y="20" fontSize="9.5" textAnchor="middle" fill="#2c5b97" fontWeight="800">{masked ? String(index+1).padStart(2,'0')+' / 2026' : months[index]+' 2026'}</text>
 {days.map((x,i)=><text key={i} x={29+i*15.7} y="35" fontSize="6" textAnchor="middle" fill="#6b81a1">{x[0]}</text>)}
 {Array.from({length:length},(_,i)=>{let pos=i+start,row=Math.floor(pos/7),col=pos%7;return <g key={i}><rect x={21.8+col*15.7} y={39+row*8.7} width="13.6" height="8" rx="1.8" fill={i===0?'#d2e5f8':row%2?'#fafcff':'#eef4fa'}/><text x={28.8+col*15.7} y={45.5+row*8.7} fontSize="5.8" textAnchor="middle" fill={ink}>{i+1}</text></g>})}
 </Frame>
}
function Frequency({count=3,term}){
 const hourly=term?.startsWith('hourly')
 return <Frame>
 <text x="76" y="20" fontSize="8" textAnchor="middle" fill="#536d92" fontWeight="700">{hourly?'EVERY HOUR':'EXAMPLE WEEK'}</text>
 {Array.from({length:hourly?12:7},(_,i)=>{
  const x=hourly?12+i*11.3:17+i*18.1,lit=hourly||[0,2,4,1,5,3,6].slice(0,count).includes(i)
  return <g key={i}><rect x={x} y={38} width={hourly?8:14} height="32" rx="3" fill={lit?'#b1d5f6':'#e4eaf1'} stroke={lit?active:'#cbd6e4'}/>
   {!hourly&&<text x={x+7} y="32" fontSize="8" textAnchor="middle" fill="#68809b">{'MTWTFSS'[i]}</text>}
   <circle cx={x+(hourly?4:7)} cy="55" r="3.2" fill={lit?active:'#c5d1df'}/></g>
 })}
 </Frame>
}
function Daytime({term}){
 const sunset=['sunset','dusk','evening / in the evening'].includes(term)
 const night=['night / at night','midnight','p.m.'].includes(term)
 return <Frame>
 <path d="M8 67H144" stroke="#a0b8cd" strokeWidth="2"/>
 <path d="M17 68Q76 2 135 68" fill="none" stroke="#c3d2e5" strokeWidth="2" strokeDasharray="4 4"/>
 <circle cx={sunset?123:night?14:term==='noon'||term==='midday'?76:37} cy={sunset?62:night?59:term==='noon'||term==='midday'?19:37} r="15" fill={night?'#b4c4e5':'#eed18d'}/>
 {night&&<circle cx="19" cy="55" r="13" fill={bg}/>}
 <path d="M15 77H137" stroke="#a3bdd6" strokeWidth="3" strokeLinecap="round"/>
 <text x="17" y="89" fontSize="7" fill={ink}>00:00</text><text x="118" y="89" fontSize="7" fill={ink}>24:00</text>
 </Frame>
}
function Season({index}){
 const palette=['#b4d9b1','#f4d888','#cfa77d','#b9d2e9'][index]
 return <Frame><circle cx="110" cy="24" r="13" fill={index===3?'#d9e8f4':'#f0ce84'}/>
 <path d="M8 75Q69 54 144 76V93H8Z" fill={palette}/>
 <path d="M65 72V30M65 41l-15-13M65 51l18-15" stroke="#816d60" strokeWidth="5" strokeLinecap="round"/>
 {index===0&&<g><circle cx="49" cy="27" r="13" fill="#a5dba8"/><circle cx="77" cy="36" r="14" fill="#9fcb9e"/><circle cx="82" cy="45" r="4" fill="#e99da7"/><circle cx="49" cy="19" r="4" fill="#e99da7"/></g>}
 {index===1&&<g><circle cx="49" cy="27" r="16" fill="#87c795"/><circle cx="78" cy="34" r="19" fill="#72b787"/></g>}
 {index===2&&<g><circle cx="50" cy="26" r="15" fill="#d9a577"/><circle cx="79" cy="31" r="17" fill="#d98c67"/><path d="M45 65l-8 9M95 59l6 8" stroke="#be855d" strokeWidth="5"/></g>}
 {index===3&&<g fill="#fff" stroke="#b1c7d9"><circle cx="27" cy="50" r="4"/><circle cx="97" cy="40" r="4"/><circle cx="128" cy="64" r="4"/><circle cx="105" cy="77" r="4"/></g>}
 </Frame>
}
function ClockFace({term}){
 const isAM=term==='a.m.'
 const isPM=term==='p.m.'
 return <Frame>
  <circle cx="76" cy="48" r="35" fill="#fff" stroke="#93b1d0" strokeWidth="3"/>
  {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <circle key={i} cx={76+28*Math.sin(a)} cy={48-28*Math.cos(a)} r="2" fill="#819ab6"/>})}
  <path d="M76 48V25M76 48L96 59" stroke="#466e9d" strokeWidth="4" strokeLinecap="round"/>
  <circle cx="76" cy="48" r="4" fill="#466e9d"/>
  {(isAM||isPM)&&<text x="76" y="89" fontSize="9" textAnchor="middle" fontWeight="800" fill="#466e9d">{isAM?'BEFORE NOON':'AFTER NOON'}</text>}
 </Frame>
}
function Duration({term}){
 const data={'second':['1','SEC'],'minute':['60','SEC'],'hour':['60','MIN'],'day':['24','HOURS'],'week':['7','DAYS'],'two weeks / a fortnight':['14','DAYS'],'month':['28–31','DAYS'],'year':['12','MONTHS'],'decade':['10','YEARS'],'century':['100','YEARS'],'millennium / millennia':['1,000','YEARS']}
 const [amount,label]=data[term]||['1','UNIT']
 return <Frame>
 <path d="M20 72h112" stroke="#9bb6d7" strokeWidth="2.5"/>
 <circle cx="76" cy="44" r="34" fill="#deebf9" stroke="#aecae7"/>
 <text x="76" y="47" textAnchor="middle" fontSize={amount.length>3?18:26} fontWeight="800" fill="#3768a3">{amount}</text>
 <text x="76" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fill="#51759f">{label}</text>
 </Frame>
}
function Timeline({term}){
 const now=term==='now / right now'
 return <Frame>
 <path d="M17 55h118" stroke="#89a9cc" strokeWidth="3" strokeLinecap="round"/>
 {[0,1,2].map(i=><g key={i}><circle cx={30+46*i} cy="55" r={i===1?9:6} fill={i===1?'#5488c6':'#becfe3'}/><path d={'M'+(30+46*i)+' 66v8'} stroke="#96aecc" strokeWidth="1.5"/></g>)}
 <text x="30" y="32" textAnchor="middle" fontSize="8" fill={ink}>{term.startsWith('yesterday')?'−1 DAY':'BEFORE'}</text>
 <text x="76" y="28" textAnchor="middle" fontSize="8" fill={ink}>NOW</text>
 <text x="122" y="32" textAnchor="middle" fontSize="8" fill={ink}>{term.startsWith('yesterday')?'+1 DAY':'AFTER'}</text>
 </Frame>
}
export default function VocabularyTimeArt({visual,masked=false}){
 switch(visual.type) {
 case 'calendar-day':return <CalendarWeek highlight={visual.index} masked={masked}/>
 case 'calendar-range':return <CalendarWeek highlight={visual.index} range masked={masked}/>
 case 'calendar-month':return <CalendarMonth index={visual.index} masked={masked}/>
 case 'season':return <Season index={visual.index}/>
 case 'frequency':return <Frequency count={visual.count} term={visual.term}/>
 case 'daytime':return <Daytime term={visual.term}/>
 case 'clock':return <ClockFace term={visual.term}/>
 case 'duration':return <Duration term={visual.term}/>
 case 'timeline':return <Timeline term={visual.term}/>
 default:return null
 }
}
