function Frame({children}){return <svg className="vlt-diagram" viewBox="0 0 152 96" role="img" aria-label="Illustrated comparison"><rect x="1" y="1" width="150" height="94" rx="10" fill="#f7fafd" stroke="#e2eaf5"/>{children}</svg>}
export function DimensionArt({value}) {
 const short=['little','small','short','thin','low','near','shallow','light','loose'].includes(value)
 const pair=(a,b)=> <><rect x={26} y={68-a} width="34" height={a} rx="4" fill="#b6cce3" stroke="#90abc8"/><rect x={90} y={68-b} width="34" height={b} rx="4" fill="#6f9ed1" stroke="#527fb1"/></>
 return <Frame>
 <path d="M13 75H138" stroke="#afc3dc" strokeWidth="2.5"/>
 {['big','little','small'].includes(value)&&<><circle cx="45" cy="47" r={short?21:12} fill={short?'#b7c9de':'#b7c9de'}/><circle cx="108" cy="47" r={short?12:21} fill="#78a4d3"/></>}
 {['long','short','narrow'].includes(value)&&<><rect x="15" y="25" width={short?100:42} height={value==='narrow'?8:14} rx="5" fill="#a5bfdc"/><rect x="15" y="51" width={short?43:100} height={value==='narrow'?8:14} rx="5" fill="#6998cb"/></>}
 {['thick','thin'].includes(value)&&<><rect x="30" y="20" width="34" height={short?9:43} rx="4" fill="#a3bbd5"/><rect x="82" y="20" width="34" height={short?43:9} rx="4" fill="#719acf"/></>}
 {['high','low'].includes(value)&&pair(short?48:20,short?19:50)}
 {['near','far'].includes(value)&&<><circle cx="37" cy="49" r={short?18:8} fill="#a0b9d2"/><circle cx="111" cy="49" r={short?8:18} fill="#729bca"/><path d="M37 60H111" stroke="#8ba9ce" strokeDasharray="4 5" strokeWidth="2"/></>}
 {['deep','shallow'].includes(value)&&<><path d="M12 34V71Q35 68 54 71V34" fill="#e7f1fa" stroke="#7799bb" strokeWidth="3"/><path d="M81 34V71Q102 68 139 71V34" fill="#e7f1fa" stroke="#7799bb" strokeWidth="3"/><rect x="16" y={value==='deep'?40:60} width="34" height={value==='deep'?27:7} fill="#97cce3"/><rect x="85" y={value==='deep'?60:40} width="50" height={value==='deep'?7:27} fill="#97cce3"/></>}
 {['heavy','light'].includes(value)&&<><path d="M76 14V77M45 29h62M43 74h66" stroke="#697f9c" strokeWidth="3"/><path d={value==='heavy'?'M46 33l-10 24h20zM106 33L96 60h20z':'M46 33l-10 27h20zM106 33L96 57h20z'} fill="#bfd1e1" stroke="#7896b6"/><circle cx="44" cy="28" r="4" fill="#496c93"/><rect x="94" y="20" width="22" height="12" rx="3" fill="#91aecb"/></>}
 {['tight','loose'].includes(value)&&<><path d="M35 18h80v47H35z" fill="#d8e2f0" stroke="#8fa8c2"/><path d="M23 42q53-10 103 0" stroke={short?'#ab93a2':'#537da8'} strokeWidth={short?8:4} fill="none"/><path d={short?'M29 44q20 20 40 1':'M40 44h44'} stroke="#7296ba" strokeWidth="3" fill="none"/></>}
 </Frame>
}
export function MaterialArt({value}) {
 return <Frame>
 {value==='glass'&&<><path d="M50 16h52l-7 61q-19 9-38 0z" fill="#d3f0f3" fillOpacity=".5" stroke="#75aaba" strokeWidth="3"/><path d="M57 53q20 6 38 0" fill="none" stroke="#8cc8d2" strokeWidth="3"/><path d="M64 23l-3 43" stroke="#fff" strokeWidth="5"/></>}
 {value==='paper'&&<><path d="M48 14h47l15 15v52H48z" fill="white" stroke="#a3b6cf" strokeWidth="2"/><path d="M95 14v15h15M58 43h41M58 51h41M58 59h28" stroke="#bccddd" strokeWidth="2"/></>}
 {value==='metal'&&<><rect x="39" y="28" width="76" height="43" rx="5" fill="#bccbd6" stroke="#728fa6" strokeWidth="2"/><path d="M45 36h62" stroke="#fff" strokeOpacity=".8" strokeWidth="5"/><path d="M56 58h48" stroke="#839eaf" strokeWidth="2"/></>}
 {value==='denim'&&<><path d="M42 14h68l-10 69H53Z" fill="#6089b7" stroke="#476f9b" strokeWidth="2"/><path d="M65 18v54M88 18v54M49 32h52" stroke="#d5e6f5" strokeWidth="2" strokeDasharray="3 5"/></>}
 {value==='leather'&&<><path d="M27 30q26-16 58-9l29 12-9 43q-45 9-76-6z" fill="#ae7a5f" stroke="#835c4a" strokeWidth="2"/><path d="M40 40q23-7 50-1M40 48q22-7 50-1" fill="none" stroke="#deb9a3" strokeWidth="1.4" strokeDasharray="2 4"/></>}
 {value==='silk'&&<><path d="M28 19q34 17 58 0t40 11q-10 15-8 38T72 79Q47 52 24 76z" fill="#d2b3d5" stroke="#b18eb6" strokeWidth="2"/><path d="M31 28q32 16 56 5t33 5" stroke="#eee0f1" strokeWidth="3" fill="none"/></>}
 {value==='fabric'&&<><rect x="30" y="22" width="90" height="55" rx="6" fill="#bed6c8" stroke="#92b6a2"/>{Array.from({length:9},(_,i)=><path key={i} d={'M'+(33+i*10)+' 23v50'} stroke="#f2fff5" strokeWidth="1.5"/>) }{Array.from({length:6},(_,i)=><path key={i} d={'M33 '+(27+i*9)+'h85'} stroke="#8db6a2" strokeWidth="1.2"/>)}</>}
 {value==='plastic'&&<><path d="M65 17h22v14l13 13-7 33H58l-7-33 14-13z" fill="#c2e8ee" stroke="#8dbec7" strokeWidth="2"/><path d="M62 50h33M62 57h33" stroke="#fff" strokeWidth="3"/><rect x="63" y="12" width="26" height="9" rx="2" fill="#78b7c7"/></>}
 </Frame>
}
export function WeatherArt({value}){
 const rain=value==='rain',snow=value==='snow',storm=value==='storm',wind=value==='wind',cloudy=['cloudy','rain','snow','storm','fog'].includes(value)
 return <Frame>
 <path d="M5 75Q50 57 75 75Q120 59 147 75V93H5Z" fill="#c2dac2"/>
 {!cloudy&&<circle cx="117" cy="25" r="16" fill="#f0ca72"/>}
 {cloudy&&<g fill={storm?'#9ba9bd':'#c4d9e8'}><ellipse cx="55" cy="30" rx="24" ry="12"/><ellipse cx="74" cy="25" rx="20" ry="15"/><ellipse cx="90" cy="34" rx="24" ry="11"/></g>}
 {(rain||storm)&&[35,55,75,95].map(x=><path key={x} d={'M'+x+' 53l-5 13'} stroke="#6eadd5" strokeWidth="3" strokeLinecap="round"/>)}
 {snow&&[36,55,75,100,115].map((x,i)=><g key={i} stroke="#82a6cd" strokeWidth="2"><path d={'M'+x+' '+(55+i%2*12)+'l5 5m-5 0l5-5m-3-3v10'}/></g>)}
 {storm&&<path d="M78 42l-9 17h10l-9 18 24-28H83l7-7z" fill="#e6b965" stroke="#b68c54"/>}
 {wind&&[20,33,46].map((y,i)=><path key={i} d={'M12 '+y+'h'+(50+i*9)+'q20 0 10-11'} fill="none" stroke="#8bb2d2" strokeWidth="3" strokeLinecap="round"/>)}
 {value==='rainbow'&&[20,15,10].map((offset,i)=><path key={i} d={'M'+(12+offset)+' 75Q76 '+(-30+offset)+' '+(140-offset)+' 75'} fill="none" stroke={['#d9877f','#efc175','#83bfc9'][i]} strokeWidth="6"/>)}
 {value==='fog'&&[40,50,60].map(y=><path key={y} d={'M13 '+y+'h124'} stroke="#a7bacb" strokeWidth="5" strokeLinecap="round" opacity=".65"/>)}
 </Frame>
}
export function DirectionArt({value}){
 const dirs={north:[76,20],south:[76,76],east:[125,48],west:[26,48],left:[26,48],right:[125,48],forward:[76,15]}
 const target=dirs[value]||[76,20];
 return <Frame>
 <path d="M76 6V90M8 48h136" stroke="#bdcfe1" strokeWidth="20"/>
 <path d="M76 6V90M8 48h136" stroke="#fff" strokeWidth="1.8" strokeDasharray="6 5"/>
 <circle cx="76" cy="48" r="9" fill="#fff" stroke="#6b8fb8" strokeWidth="2"/>
 <path d={'M76 48L'+target[0]+' '+target[1]} stroke="#4378bc" strokeWidth="5" strokeLinecap="round"/>
 <circle cx={target[0]} cy={target[1]} r="6" fill="#377ac7" stroke="white" strokeWidth="2"/>
 </Frame>
}
