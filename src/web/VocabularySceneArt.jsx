// Small original editorial scenes. Nothing here is a generic icon, an emoji,
// or a third-party picture: each drawing has a subject and a visible action.
const normalize = value => value.toLowerCase().replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim()
const aliases = {
 'alarm goes off':'alarm','wake up':'wake','get up':'wake','get ready':'dress','get dressed':'dress',
 'brush your hair':'hair','dry your hair':'hair','brush your teeth':'teeth',
 'put on make-up':'mirror','shave':'mirror',
 'bath':'bath','shower':'shower','take a bath / have a bath':'bath','take a shower / have a shower':'shower',
 'breakfast':'breakfast','eat breakfast':'breakfast','have breakfast':'breakfast',
 'eat breakfast / have breakfast':'breakfast',
 'lunch':'lunch','eat lunch':'lunch','have lunch':'lunch',
 'eat lunch / have lunch':'lunch',
 'dinner':'dinner','eat dinner':'dinner','have dinner':'dinner',
 'eat dinner / have dinner':'dinner',
 'coffee':'coffee','tea':'tea','drink tea or coffee':'coffee','have tea or coffee':'coffee','drink tea or coffee / have tea or coffee':'coffee',
 'make breakfast':'cook','cook dinner':'cook',
 'arrive late':'late','catch the bus':'bus','catch the train':'train','commute':'bus',
 'drive':'drive','go to school':'school','school':'school','go to work':'office',
 'start work':'office','finish work':'office','leave work':'office',
 'work from home':'laptop','overtime':'night-work','do homework':'homework','homework':'homework',
 'have a break':'break','leave the house':'door','go home':'door',
 'buy groceries':'shopping','run errands':'shopping',
 'clear the table':'clean','dishes':'dishes','do the dishes':'dishes','wash the dishes':'dishes','do the dishes / wash the dishes':'dishes',
 'do the housework':'broom','housework':'broom','iron a shirt':'iron','make the bed':'make-bed',
 'take out the trash':'trash','feed the cat':'cat','feed the dog':'dog','walk the dog':'walk-dog',
 'café':'cafe','go to a café':'cafe','friends':'friends','call a friend':'phone',
 'call your family':'phone','check your emails':'laptop','check email':'laptop','check your emails / check email':'laptop',
 'go out':'door','listen to the radio':'radio','read a newspaper':'read',
 'bed':'bed','go to bed':'bed','put the children to bed':'bed'
}
const travelActions = {
 'get on a bus':'bus','get off a bus':'bus','catch a train':'train',
 'miss a train':'train','get in a taxi':'drive','get out of a taxi':'drive',
 'drive a car':'drive','go to school':'school','ride a bike':'bike',
}
export const routineScene = (term,chapter) => chapter===4
 ? aliases[normalize(term)] || null
 : travelActions[normalize(term)] || null

function Person({ x = 29, y = 17, sitting = false, waving = false, hair = '#4b506a', shirt = '#e6a874' }) {
  return <g transform={'translate('+x+' '+y+')'}>
    <ellipse cx="12" cy="11" rx="8" ry="9" fill="#f3c0a2" stroke="#52617a" strokeWidth="1.1"/>
    <path d="M4 10Q3 1 11 1Q20 1 20 11L17 6Q11 8 7 6Z" fill={hair}/>
    <circle cx="15" cy="12" r="1" fill="#455064"/>
    <path d="M13 15q3 2 5-1" fill="none" stroke="#7d4d52" strokeWidth="1"/>
    <path d="M8 21L18 21L24 43L1 43Z" fill={shirt} stroke="#52617a" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d={waving?'M20 26L32 10':'M20 25L28 38'} stroke="#dca784" strokeWidth="5" strokeLinecap="round"/>
    <path d="M5 26L-1 38" stroke="#dca784" strokeWidth="5" strokeLinecap="round"/>
    {sitting ? <path d="M8 43L24 49L36 49M14 43L13 51" stroke="#51658e" strokeWidth="6" strokeLinecap="round" fill="none" /> :
    <path d="M8 43L7 57M19 43L24 57" stroke="#51658e" strokeWidth="6" strokeLinecap="round"/>}
  </g>
}
function Plate({x=89,y=59,food='#75a881'}) {return <g transform={'translate('+x+' '+y+')'}><ellipse rx="24" ry="9" fill="#fff" stroke="#8fa9c4" strokeWidth="1.8"/><ellipse rx="18" ry="5" fill="#edf3fb"/><path d="M-11-2Q-3-12 4-2Q10-10 13-1" fill={food} stroke="#75a881" strokeWidth="2"/></g>}
function Table(){return <g><path d="M57 65H125M64 65V87M120 65V87" stroke="#98765c" strokeWidth="5" strokeLinecap="round"/></g>}
function Bed({neat=false}){return <g><path d="M24 58H126V77H24Z" fill="#d1e2f5" stroke="#526f95" strokeWidth="2"/><path d="M23 48v33M126 57v24" stroke="#856f71" strokeWidth="5"/><rect x="30" y="49" width="31" height="12" rx="6" fill="#fff" stroke="#9cb4d4"/><path d="M62 58H124V75H62Z" fill={neat?'#92b2d5':'#b3b9df'} /><path d="M73 62H114" stroke="#fff" strokeOpacity=".6" strokeWidth="3"/></g>}
function Clock({x=117,y=24,late=false}){return <g transform={'translate('+x+' '+y+')'}><circle r="15" fill="#fff" stroke={late?'#d37c65':'#9ab2d1'} strokeWidth="2"/><path d="M0-10V0L7 4" stroke="#405c84" strokeWidth="2.2" fill="none" strokeLinecap="round"/><circle r="1.6" fill="#405c84"/></g>}
function Bus({train=false}){return <g><rect x="53" y="25" width="91" height="52" rx={train?7:12} fill={train?'#87b5cb':'#efc67c'} stroke="#607e9d" strokeWidth="2"/><rect x="64" y="34" width="22" height="20" rx="2" fill="#d9f0f2" stroke="#607e9d"/><rect x="90" y="34" width="22" height="20" rx="2" fill="#d9f0f2" stroke="#607e9d"/><rect x="116" y="34" width="19" height="32" rx="2" fill="#eff7fa" stroke="#607e9d"/><path d="M116 54H135" stroke="#607e9d" strokeWidth="1.5"/><circle cx="77" cy="78" r="8" fill="#4f617c"/><circle cx="125" cy="78" r="8" fill="#4f617c"/>{train&&<path d="M51 89h97" stroke="#6989a4" strokeWidth="3"/>}</g>}
function Dog({cat=false}){return <g transform="translate(92 46)"><ellipse cx="16" cy="22" rx="17" ry="11" fill={cat?'#a9abb9':'#caa37f'} stroke="#61738a"/><circle cx="3" cy="16" r="11" fill={cat?'#b8b8ca':'#d5b08b'} stroke="#61738a"/><path d={cat?'M-3 9L-4 1L2 6M8 5L13 1L13 11':'M-7 13L-12 3L0 9'} fill="#bca58e" stroke="#61738a"/><circle cx="0" cy="16" r="1.4" fill="#3d4c5e"/><path d="M22 29v8M8 29v8M31 18q10-4 7-13" fill="none" stroke="#61738a" strokeWidth="3" strokeLinecap="round"/></g>}
function Computer(){return <g><rect x="67" y="37" width="61" height="37" rx="3" fill="#486a90"/><rect x="72" y="42" width="51" height="27" fill="#daeff0"/><path d="M63 76h69l4 5H58Z" fill="#839ebf"/><path d="M75 48h26M75 55h38" stroke="#8ab0c9" strokeWidth="2"/></g>}
function Sink({dishes=false}){return <g><path d="M67 68H135V78H67Z" fill="#abc1d7" stroke="#5a799c" strokeWidth="1.6"/><path d="M89 66v-17q0-13 13-13t13 13" fill="none" stroke="#6789ab" strokeWidth="4"/><path d="M115 53v11" stroke="#73bfdc" strokeWidth="3"/>{dishes&&<g><ellipse cx="82" cy="62" rx="14" ry="4" fill="#fdfdfd" stroke="#66829f"/><ellipse cx="86" cy="57" rx="13" ry="4" fill="#fdfdfd" stroke="#66829f"/><circle cx="106" cy="60" r="3" fill="#c4e6ee"/><circle cx="112" cy="55" r="4" fill="#c4e6ee"/></g>}</g>}
function Stove(){return <g><rect x="76" y="48" width="54" height="39" rx="4" fill="#d6dfea" stroke="#7892ad"/><rect x="79" y="54" width="48" height="9" rx="3" fill="#8da5bd"/><path d="M89 63v22M118 63v22" stroke="#9bafc5" strokeWidth="2"/><path d="M84 46h40" stroke="#5a6980" strokeWidth="3"/><path d="M89 43q-5-8 0-13M101 43q-5-8 0-13" stroke="#80a9b5" strokeWidth="2.5" fill="none"/></g>}
export default function VocabularySceneArt({scene}) {
 const meal=['breakfast','lunch','dinner'].includes(scene)
 const transit=['bus','train'].includes(scene)
 const isNight=['dinner','bed','night-work'].includes(scene)
 const desk=['office','laptop','homework','night-work'].includes(scene)
 const pet=['cat','dog','walk-dog'].includes(scene)
 return <svg className="vlt-scene" viewBox="0 0 152 94" role="img" aria-label={scene.replace(/-/g,' ')} focusable="false">
 <rect x="1" y="1" width="150" height="92" rx="10" fill={isNight?'#e4ebf6':'#eef5fc'}/>
 <path d="M1 87H151" stroke="#c5d7e6" strokeWidth="2"/>
 {isNight ? <><circle cx="132" cy="14" r="9" fill="#c2cee3"/><circle cx="136" cy="10" r="8" fill="#e4ebf6"/></> :
  <><circle cx="134" cy="14" r="8" fill="#f0cf83"/><path d="M9 17H39" stroke="#d8e7f2" strokeWidth="3"/></>}
 {meal&&<><Person x={15} y={12} sitting/><Table/><Plate food={scene==='breakfast'?'#e9c976':scene==='lunch'?'#88b68f':'#de9c75'}/></>}
 {['coffee','tea','break'].includes(scene)&&<><Person x={22} y={12} sitting/><Table/><path d="M80 48h22v16q-11 9-22 0z" fill="#fcfaf4" stroke="#7c98b7" strokeWidth="2"/><path d="M102 52q15 0 0 10M83 44q-4-5 0-10M92 44q-4-5 0-10" stroke="#86aab7" strokeWidth="2" fill="none"/></>}
 {transit&&<><Bus train={scene==='train'}/><Person x={23} y={19} waving/><path d="M53 65l9-5-5-5" fill="none" stroke="#b77a62" strokeWidth="2.5" strokeLinecap="round"/></>}
 {scene==='bike'&&<><Person x={24} y={10}/><circle cx="82" cy="70" r="16" fill="none" stroke="#607f9f" strokeWidth="4"/><circle cx="132" cy="70" r="16" fill="none" stroke="#607f9f" strokeWidth="4"/><path d="M82 70l25-23 25 23h-50l17-34h12" fill="none" stroke="#7e9fbd" strokeWidth="3" strokeLinejoin="round"/><path d="M48 57l26 5" stroke="#607f9f" strokeWidth="3"/></>}
 {scene==='late'&&<><Clock late/><Person x={25} y={14}/><path d="M13 74l-9 4M22 81l-12 4M50 66l12-4" stroke="#dd937b" strokeWidth="2.5" strokeLinecap="round"/><path d="M117 51v13" stroke="#db7d6d" strokeWidth="4"/><circle cx="117" cy="69" r="2" fill="#db7d6d"/></>}
 {desk&&<><Person x={13} y={12} sitting/><path d="M55 78H138M61 78v10M129 78v10" stroke="#a48468" strokeWidth="4"/><Computer/>{scene==='night-work'&&<Clock x={127} y={20}/>}</>}
 {scene==='drive'&&<><rect x="61" y="47" width="81" height="30" rx="10" fill="#91b9d8" stroke="#617f9f" strokeWidth="2"/><path d="M79 47l13-15h28l15 15" fill="#c1deee" stroke="#617f9f" strokeWidth="2"/><circle cx="82" cy="76" r="9" fill="#51617d"/><circle cx="125" cy="76" r="9" fill="#51617d"/><Person x={84} y={26} /></>}
 {['school','office'].includes(scene)&&!desk&&<><Person x={24} y={13}/><rect x="77" y="33" width="52" height="46" fill="#d7e2f0" stroke="#7390b0"/><path d="M89 35v43M113 35v43M78 52h51" stroke="#7390b0" strokeWidth="1.5"/></>}
 {['bed','wake','alarm','make-bed'].includes(scene)&&<><Bed neat={scene==='make-bed'}/>{scene==='wake'&&<Person x={45} y={15} sitting/>}{scene==='alarm'&&<Clock x={115} y={37}/>}</>}
 {['dress','hair','teeth','mirror','shower','bath'].includes(scene)&&<><rect x="81" y="13" width="49" height="63" rx="7" fill="#d4e8f4" stroke="#80a1bf"/><Person x={28} y={12}/>
 {scene==='teeth'&&<path d="M46 34l14 4M60 38l2-6" stroke="#75bad0" strokeWidth="3" strokeLinecap="round"/>}
 {scene==='hair'&&<path d="M35 25q15-16 30 0M59 25l10 5" fill="none" stroke="#987d74" strokeWidth="5"/>}
 {scene==='dress'&&<path d="M94 34l5-6 5 3 7-3 8 9-7 4-2 22H98l-3-22-6-4Z" fill="#d5a3b5" stroke="#8a7490"/>}
 {['shower','bath'].includes(scene)&&<path d="M89 26h26M91 31l-3 9M101 31l-3 12M111 31l-2 9" stroke="#76b8dd" strokeWidth="2" strokeLinecap="round"/>}
 {scene==='mirror'&&<path d="M91 21v48" stroke="#fff" strokeWidth="3"/>}
 </>}
 {['dishes','clean'].includes(scene)&&<><Person x={18} y={12}/><Sink dishes={scene==='dishes'}/></>}
 {scene==='cook'&&<><Person x={16} y={11}/><Stove/></>}
 {scene==='iron'&&<><Person x={19} y={12}/><path d="M63 58h71M88 58L79 87M108 58l9 29" stroke="#748fac" strokeWidth="5"/><path d="M82 55h31l-7-13H93Z" fill="#ccd5e2" stroke="#7891aa" strokeWidth="1.8"/></>}
 {scene==='broom'&&<><Person x={21} y={10}/><path d="M88 28L111 73M101 64l22-10 11 19-25 10Z" fill="#c6aa78" stroke="#7f876d" strokeWidth="2"/></>}
 {scene==='trash'&&<><Person x={23} y={12}/><path d="M88 53q11-8 23 0l7 28H82Z" fill="#6a7f96" stroke="#445874"/><path d="M96 51q5-6 9 0" stroke="#445874" strokeWidth="3" fill="none"/></>}
 {pet&&<><Person x={16} y={12}/><Dog cat={scene==='cat'}/>{scene==='walk-dog'&&<path d="M49 49q19 1 41 11" stroke="#957b78" strokeWidth="2" fill="none"/>}{scene!=='walk-dog'&&<ellipse cx="118" cy="83" rx="19" ry="5" fill="#e3b4a0" stroke="#957b78"/>}</>}
 {scene==='shopping'&&<><Person x={17} y={13}/><path d="M74 47h59l-7 28H83L74 47M82 75l3 9h41" stroke="#6787a6" strokeWidth="3" fill="none"/><circle cx="95" cy="85" r="4" fill="#657f9d"/><circle cx="121" cy="85" r="4" fill="#657f9d"/><circle cx="96" cy="58" r="10" fill="#9ac18a"/><circle cx="113" cy="60" r="8" fill="#e5a083"/></>}
 {['phone','radio','read'].includes(scene)&&<><Person x={21} y={12} sitting/><rect x="74" y="35" width="53" height="42" rx="5" fill="#d4e3ef" stroke="#8ca6c4" strokeWidth="2"/>
 {scene==='phone'?<><rect x="94" y="41" width="19" height="30" rx="3" fill="#6b89ad"/><rect x="97" y="45" width="13" height="19" fill="#d6f0f0"/></>:scene==='radio'?<><circle cx="111" cy="55" r="9" fill="#8ba5bf"/><path d="M80 49h16M80 56h16" stroke="#7390ad" strokeWidth="3"/></>:<><path d="M83 42h34M83 49h34M83 56h28M83 63h30" stroke="#a2b1c4" strokeWidth="3"/></>}
 </>}
 {['door','cafe'].includes(scene)&&<><Person x={15} y={13} waving/><rect x="81" y="23" width="53" height="63" fill={scene==='cafe'?'#d7e8e7':'#d8b99d'} stroke="#6b819e" strokeWidth="2"/><circle cx="124" cy="56" r="2.6" fill="#71849d"/>{scene==='cafe'&&<><path d="M82 27h51" stroke="#e2ad81" strokeWidth="7"/><path d="M98 44h19v17H98Z" fill="#a1c6d5"/></>}</>}
 {scene==='friends'&&<><Person x={21} y={15}/><Person x={89} y={15} shirt="#9db9d4" hair="#9b7268"/><path d="M62 36h27" stroke="#b6b9cf" strokeWidth="3" strokeDasharray="3 5"/></>}
 </svg>
}
