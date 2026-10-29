import { useEffect, useRef, useState } from 'react'
import './vocabulary-body-motion.css'

// One coherent character, with separately articulated eyelids, head, torso,
// shoulders, forearms and hands. These are learning demonstrations, not GIFs.
export const bodyMotionTerms = [
  'blink', 'blush (action)', 'bow (gesture)', 'clap', 'cry', 'frown',
  'grin', 'laugh', 'lick', 'nod', 'shake your head', 'shrug', 'smile', 'suck',
  'breathe', 'hold your breath', 'cough', 'shiver', 'sigh',
  'sneeze', 'snore', 'sweat / perspire (formal verb)',
]
const known = new Set(bodyMotionTerms)
export function vocabularyBodyMotion(term, chapter) {
  const key = String(term).toLowerCase().trim()
  return chapter === 14 && known.has(key) ? {type:'body-motion', term:key} : null
}

const ink = '#27272b'
const skin = '#ffedc8'
const sleeve = '#8bbbd6'
const green = '#91be50'
const blush = '#e99792'
const stroke = {stroke:ink, strokeWidth:4.2, strokeLinecap:'round', strokeLinejoin:'round'}

function Eye({x, y, animated=false}) {
  return <g transform={'translate('+x+' '+y+')'}>
    <path d="M-16 0 Q0 -13 16 0 Q0 14 -16 0Z" fill="white" {...stroke}/>
    <circle r="8.4" fill={green} stroke={ink} strokeWidth="2"/>
    <circle r="4.8" fill={ink}/>
    <circle cx="2.5" cy="-3" r="2.1" fill="white"/>
    <path d="M-16 -1 Q0 -16 16 -1" fill="none" {...stroke}/>
    {animated && <g className="bm-upper-eyelid">
      <path d="M-17 -25 Q0 -34 17 -25 L17 0 Q0 -13 -17 0Z" fill={skin}/>
      <path d="M-17 0 Q0 -13 17 0" fill="none" {...stroke}/>
      <path d="M-13 -2 l-3 -5 M0 -10 l-1 -6 M13 -2 l4 -5" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
    </g>}
  </g>
}
function Face({term}) {
  const blink = term === 'blink' || term === 'sneeze'
  const sad = term === 'frown' || term === 'cry'
  const grin = term === 'grin'
  const laugh = term === 'laugh'
  const open = ['laugh','cough','sneeze','sigh','suck'].includes(term)
  const tongue = term === 'lick'
  return <g className="bm-head" >
    <path d="M147 129 L147 147 L173 147 L173 129" fill={skin} {...stroke}/>
    <path d="M116 82 C112 51 132 30 161 30 C197 30 208 55 205 89 L200 112 Q187 139 160 140 Q133 139 119 113Z"
      fill={skin} {...stroke}/>
    <path d="M116 82 Q110 38 151 30 Q191 21 205 63 Q183 56 171 43 Q153 64 117 68Z" fill="#4c5663"/>
    <g className={sad?'bm-sad-brows':'bm-brows'} fill="none" {...stroke}>
      <path d="M127 70 Q138 64 148 68 M174 68 Q186 64 197 70"/>
    </g>
    <Eye x={140} y={91} animated={blink}/>
    <Eye x={180} y={91} animated={blink}/>
    <path d="M158 95 L155 109 Q162 113 168 108" fill="none" {...stroke} strokeWidth="2.7"/>
    {sad ? <path className="bm-mouth" d="M145 124 Q160 112 176 124" fill="none" {...stroke}/> :
    grin ? <g className="bm-mouth"><path d="M138 119 Q159 147 183 119Z" fill="#fff" {...stroke}/><path d="M144 129 L178 129" stroke={ink} strokeWidth="2"/></g> :
    open ? <ellipse className="bm-mouth" cx="161" cy="126" rx={laugh?15:7} ry={laugh?15:9} fill="#a85e63" {...stroke}/> :
    tongue ? <g>
      <path d="M146 121 Q160 130 175 121" fill="none" {...stroke}/>
      <path className="bm-tongue" d="M160 125 Q166 130 171 124 L173 137 Q169 146 162 140Z" fill="#e58a89" stroke={ink} strokeWidth="2"/>
    </g> :
    <path className="bm-mouth" d="M146 119 Q161 135 176 119" fill="none" {...stroke}/>}
    {(term==='blush (action)' || term==='cry' || term==='laugh') &&
      <g className="bm-cheeks" fill={blush}>
        <ellipse cx="123" cy="112" rx="10" ry="6"/>
        <ellipse cx="198" cy="112" rx="10" ry="6"/>
      </g>}
    {term==='cry' && <g className="bm-tears" fill="#74b5df">
      <path d="M134 100 Q128 117 134 124 Q141 118 134 100Z"/>
      <path d="M186 100 Q180 117 186 124 Q193 118 186 100Z"/>
    </g>}
  </g>
}
function Torso({term}) {
  return <g>
    <g className="bm-breath-torso">
      <path d="M132 143 Q141 136 148 139 L172 139 Q180 136 189 143
               Q204 149 209 170 L214 203 L106 203 L111 170 Q116 149 132 143Z"
        fill={sleeve} {...stroke}/>
      <path d="M146 141 Q161 157 175 141" fill="none" stroke="#608fae" strokeWidth="3"/>
    </g>
    {term==='breathe' && <g className="bm-chest-marks" fill="none" stroke="#6b9bbb" strokeLinecap="round" strokeWidth="2.6">
      <path d="M119 164 Q109 173 120 183 M201 164 Q211 173 200 183"/>
    </g>}
    <Face term={term}/>
    {term==='hold your breath' && <>
      <g className="bm-cover-mouth" fill={skin} {...stroke}>
        <path d="M196 168 Q205 150 185 125 L173 113 Q168 109 164 115 L172 130 Q183 153 186 173Z"/>
        <ellipse cx="168" cy="116" rx="10" ry="8" />
      </g>
      <g className="bm-held-cheeks" fill={blush} opacity=".55">
        <ellipse cx="124" cy="115" rx="13" ry="10"/><ellipse cx="198" cy="115" rx="13" ry="10"/>
      </g>
    </>}
    {term==='sweat / perspire (formal verb)' && <g className="bm-sweat" fill="#74b9df">
      <path d="M213 73 Q199 93 213 100 Q227 94 213 73Z"/>
      <path d="M107 100 Q96 114 107 120 Q119 115 107 100Z"/>
    </g>}
    {term==='sigh' && <g className="bm-air" fill="none" stroke="#6b9dbb" strokeWidth="3" strokeLinecap="round">
      <path d="M203 123 Q221 109 239 123 T279 123"/>
      <path d="M213 136 Q232 150 252 135"/>
    </g>}
    {term==='sneeze' && <g className="bm-burst" fill="none" stroke="#d98d7a" strokeWidth="3.6" strokeLinecap="round">
      <path d="M211 106 L242 96 M214 120 L251 120 M209 135 L241 147"/>
    </g>}
    {term==='cough' && <g className="bm-cough-arm" >
      <path d="M196 162 Q214 152 204 137 L186 120" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round"/>
      <path d="M180 116 Q179 108 184 106 L198 107 Q205 115 197 125 Q191 131 184 125Z"
        fill={skin} {...stroke}/>
    </g>}
    {term==='shiver' && <g className="bm-shiver-marks" fill="none" stroke="#7a9fbd" strokeWidth="3" strokeLinecap="round">
      <path d="M96 145 l-8 8 8 7 -8 8 M222 145 l8 8 -8 7 8 8"/>
    </g>}
  </g>
}
function Clap() {
  return <g>
    <Torso term="clap"/>
    <g className="bm-clap-left">
      <path d="M126 151 L104 166 L107 130 L112 111" fill="none" stroke={skin} strokeWidth="16" strokeLinecap="round"/>
      <path d="M126 151 L104 166 L107 130 L112 111" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      <ellipse cx="112" cy="111" rx="10" ry="16" fill={skin} {...stroke}/>
    </g>
    <g className="bm-clap-right">
      <path d="M194 151 L216 166 L213 130 L208 111" fill="none" stroke={skin} strokeWidth="16" strokeLinecap="round"/>
      <path d="M194 151 L216 166 L213 130 L208 111" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      <ellipse cx="208" cy="111" rx="10" ry="16" fill={skin} {...stroke}/>
    </g>
    <g className="bm-clap-lines" stroke="#d79c66" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M160 66 V55 M143 75 L134 68 M176 75 L186 68"/>
    </g>
  </g>
}
function Shrug() {
  return <g>
    <Torso term="shrug"/>
    <g className="bm-shrug-left">
      <path d="M120 148 L94 152 L77 130" fill="none" stroke={skin} strokeWidth="17" strokeLinecap="round"/>
      <path d="M64 126 Q76 115 89 128 Q91 140 76 142Z" fill={skin} {...stroke}/>
    </g>
    <g className="bm-shrug-right">
      <path d="M201 148 L227 152 L244 130" fill="none" stroke={skin} strokeWidth="17" strokeLinecap="round"/>
      <path d="M231 128 Q244 115 256 126 L246 142 Q230 140 231 128Z" fill={skin} {...stroke}/>
    </g>
  </g>
}
function Bow() {
  return <g>
    <path d="M143 135 L149 198 M177 135 L181 198" fill="none" stroke="#6d8ea8" strokeWidth="24" strokeLinecap="round"/>
    <path d="M135 196 L163 196 M170 196 L196 196" stroke={ink} strokeWidth="8" strokeLinecap="round"/>
    <path d="M140 125 L179 125 L184 151 L136 151Z" fill="#617f9c" {...stroke}/>
    <g className="bm-bow-upper">
      <path d="M139 141 Q127 109 135 84 L134 66 Q152 55 175 66 L182 111 L181 141Z"
        fill={sleeve} {...stroke}/>
      <path d="M139 91 L126 117 L129 154" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round"/>
      <path d="M180 90 L194 120 L194 155" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round"/>
      <path d="M149 67 L149 57 L171 57 L171 67" fill={skin} {...stroke}/>
      <path d="M135 38 Q135 17 158 17 Q182 17 185 41 L198 49 L186 54 L187 67 Q177 85 158 78 Q140 71 135 55Z"
        fill={skin} {...stroke}/>
      <path d="M137 38 Q135 16 160 15 Q181 14 186 37 L166 32 Q154 42 137 38Z" fill="#4c5663"/>
      <path d="M181 45 L188 44" stroke={ink} strokeWidth="3" strokeLinecap="round"/>
    </g>
  </g>
}
function Drink() {
  return <g>
    <Torso term="suck"/>
    <path d="M216 149 L249 149 L241 201 L223 201Z" fill="#a5d4e6" {...stroke}/>
    <path d="M220 174 L244 174 L239 198 L224 198Z" fill="#e9b56f" opacity=".85"/>
    <path d="M230 151 L216 110 L174 112" fill="none" stroke="#d88f80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="bm-drink-arm"><path d="M199 167 Q217 154 225 172" fill="none" stroke={skin} strokeWidth="15" strokeLinecap="round"/></g>
  </g>
}
function Sleep() {
  return <g>
    <path d="M42 128 L42 202 M40 194 L287 194 L287 209" stroke={ink} strokeWidth="7" fill="none" strokeLinecap="round"/>
    <rect x="57" y="139" width="228" height="54" rx="11" fill="#a9c7d9" {...stroke}/>
    <rect x="63" y="111" width="83" height="49" rx="13" fill="white" {...stroke}/>
    <g className="bm-snore-head">
      <ellipse cx="133" cy="127" rx="42" ry="31" fill={skin} {...stroke}/>
      <path d="M97 118 Q107 93 133 94 Q157 93 171 116" fill="#4c5663"/>
      <path d="M121 130 Q130 136 138 130 M149 131 Q156 135 164 130" fill="none" {...stroke} strokeWidth="2.5"/>
      <path d="M139 147 Q147 151 154 147" fill="none" {...stroke} strokeWidth="2.5"/>
    </g>
    <path className="bm-blanket" d="M171 139 Q216 117 269 143 L282 187 L164 187Z" fill="#83b6d5" {...stroke}/>
    <g className="bm-zeds" fontFamily="sans-serif" fontWeight="700" fill="#5f8fb5">
      <text x="187" y="99" fontSize="19">z</text><text x="211" y="71" fontSize="27">z</text><text x="239" y="43" fontSize="34">Z</text>
    </g>
  </g>
}

function Stage({term,playing,onDone}) {
  const scene = term==='bow (gesture)' ? <Bow/> :
    term==='clap' ? <Clap/> : term==='shrug' ? <Shrug/> :
    term==='suck' ? <Drink/> : term==='snore' ? <Sleep/> : <Torso term={term}/>
  return <svg viewBox="0 0 320 212" preserveAspectRatio="xMidYMid meet"
    className={'bm-scene'+(playing?' is-playing':'')} data-action={term}
    aria-hidden="true" focusable="false" onAnimationEnd={e=>{
      if(e.animationName==='bm-complete')onDone()
    }}>
    <path d="M15 204 H305" fill="none" stroke="#edf0f2" strokeWidth="1.5"/>
    {scene}
    <rect className="bm-animation-clock" x="0" y="0" width="1" height="1" opacity="0" />
  </svg>
}

export default function VocabularyBodyMotion({term, practice=false, japanese=false}) {
  const host=useRef(null)
  const started=useRef(false)
  const [playing,setPlaying]=useState(false)
  const [cycle,setCycle]=useState(0)
  const play=()=>{setCycle(n=>n+1);setPlaying(true)}
  useEffect(()=>{
    const node=host.current
    if(!node || started.current || typeof IntersectionObserver==='undefined')return
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting && entry.intersectionRatio>=.35)){
        started.current=true
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)play()
        observer.disconnect()
      }
    },{threshold:[.35]})
    observer.observe(node)
    return ()=>observer.disconnect()
  },[])
  return <span ref={host} className="bm-motion-frame">
    <Stage key={cycle} term={term} playing={playing} onDone={()=>setPlaying(false)}/>
    {!practice && <button type="button" className="bm-replay" onClick={play}
      aria-label={(japanese?'もう一度再生: ':'Replay animation: ')+term}
      title={japanese?'もう一度再生':'Replay animation'}>
      <span aria-hidden="true">↻</span>
    </button>}
  </span>
}
