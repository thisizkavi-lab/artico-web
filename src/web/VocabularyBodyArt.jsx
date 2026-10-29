import './vocabulary-body-art.css'

// One deliberately literal drawing per body concept. Motion stays in CSS so
// reduced-motion preferences and the Study/Practice layouts work identically.
const headTerms = new Set(['face', 'forehead', 'eyelashes', 'nose', 'nostrils'])
const bodyTerms = new Set(['shoulder (body)', 'chest', 'waist', 'arm', 'hand', 'leg', 'toe'])
const gestureTerms = new Set([
  'blink', 'blush (action)', 'bow (gesture)', 'clap', 'cry', 'frown',
  'grin', 'laugh', 'lick', 'nod', 'shake your head', 'shrug', 'smile', 'suck',
])
const functionTerms = new Set([
  'breathe', 'hold your breath', 'cough', 'shiver', 'sigh',
  'sneeze', 'snore', 'sweat / perspire (formal verb)',
])
const symptomTerms = new Set(['bruise', 'burn', 'cut', 'scrape', 'sore', 'swelling'])

export const bodyIllustrationTerms = new Set([
  ...headTerms, ...bodyTerms, ...gestureTerms, ...functionTerms, ...symptomTerms,
])
export function vocabularyBodyIllustration(term, lesson) {
  const key = term.trim().toLowerCase()
  return lesson === 14 && bodyIllustrationTerms.has(key) ? { type: 'body-art', term: key } : null
}

const ink = '#334b69'
const skin = '#f3ccb0'
const accent = '#dd725b'

function HeadArt({ part }) {
  return <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M93 175 C95 145 104 140 124 135 L196 135 C215 141 226 154 228 175Z" fill="#90b9ce" stroke={ink} strokeWidth="3"/>
    <path d="M103 78 Q99 28 159 24 Q222 27 217 87 L214 125 Q205 164 161 168 Q117 163 107 124Z"
      fill={part === 'face' ? '#f9e4b2' : skin} stroke={ink} strokeWidth="3"/>
    <path d="M104 79 Q97 26 150 21 Q207 13 219 65 Q195 58 181 41 Q152 72 104 79Z" fill="#495d71"/>
    <path d="M125 102 Q140 97 151 103 M173 103 Q185 97 198 102" fill="none" stroke={ink} strokeWidth="2.8"/>
    <ellipse cx="139" cy="111" rx="4.5" ry="5.5" fill={ink}/>
    <ellipse cx="186" cy="111" rx="4.5" ry="5.5" fill={ink}/>
    <path d="M163 108 L158 129 Q162 135 171 130" fill="none" stroke={ink} strokeWidth="2.8"/>
    <path d="M143 145 Q160 154 180 145" fill="none" stroke={ink} strokeWidth="3"/>
    {part === 'face' && <path d="M118 89 Q116 144 159 158 Q202 150 205 86" fill="none" stroke={accent} strokeWidth="4" strokeDasharray="5 6"/>}
    {part === 'forehead' && <path d="M128 76 Q160 66 193 77 L190 93 Q161 87 131 94Z" fill="#f2a88d" opacity=".9" stroke={accent} strokeWidth="2"/>}
    {part === 'eyelashes' && <g stroke={accent} strokeWidth="3.5">
      <path d="M128 107 l-7 -8 M136 104 l-2 -10 M146 106 l4 -9 M176 106 l-4 -9 M186 104 l1 -10 M196 107 l7 -8"/>
    </g>}
    {part === 'nose' && <path d="M161 103 L156 130 Q164 138 174 130" fill="none" stroke={accent} strokeWidth="5"/>}
    {part === 'nostrils' && <g fill={accent}><ellipse cx="157" cy="132" rx="4" ry="2.8"/><ellipse cx="170" cy="132" rx="4" ry="2.8"/></g>}
  </g>
}

function WholeBodyArt({ part }) {
  const active = (name) => part === name ? accent : '#84aeca'
  if (part === 'hand') return <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
    <path d="M124 168 L118 119 Q116 109 121 105 Q131 102 137 111 L134 67 Q133 55 143 54 Q153 54 154 65 L156 103 L155 52 Q156 40 167 41 Q178 41 177 53 L178 103 L181 61 Q183 51 192 54 Q200 56 199 66 L199 113 Q207 99 217 101 Q229 107 218 124 L204 164 Q191 177 170 179 L147 179Z"
      fill="#f3ccb0"/>
    <path d="M136 112 L149 143 M155 112 L159 139 M177 109 L175 139 M200 119 L193 140" fill="none" stroke="#c79475" strokeWidth="2.2"/>
    <path d="M134 156 Q168 166 204 154" fill="none" stroke={accent} strokeWidth="5"/>
  </g>
  if (part === 'toe') return <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
    <path d="M93 143 Q101 104 138 104 Q172 104 185 125 L230 135 Q247 140 243 154 Q236 171 204 171 L110 169 Q92 165 93 143Z" fill={skin}/>
    <path d="M185 125 Q205 116 211 133 M201 128 Q219 117 225 136 M215 136 Q234 126 238 144" fill="none"/>
    <g fill={accent} stroke="#bb594f"><circle cx="238" cy="147" r="7"/><circle cx="222" cy="141" r="6"/><circle cx="208" cy="137" r="5"/><circle cx="196" cy="134" r="4"/></g>
    <path d="M75 173 H252" stroke="#e1e9ef"/>
  </g>
  return <g strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="163" cy="31" rx="21" ry="24" fill={skin} stroke={ink} strokeWidth="3"/>
    <path d="M143 24 Q149 1 165 7 Q185 8 182 27" fill="#4e6172"/>
    <path d="M128 65 Q142 56 160 57 Q186 56 199 66 L190 119 L201 130 L125 130 L137 116Z"
      fill={part === 'chest' ? '#e8aa96' : '#b8d3df'} stroke={ink} strokeWidth="3"/>
    <path d="M131 70 L109 109 L88 131 M199 70 L221 109 L242 131" fill="none" stroke={ink} strokeWidth="19"/>
    <path d="M131 70 L109 109 L88 131 M199 70 L221 109 L242 131" fill="none" stroke={part === 'arm' ? accent : skin} strokeWidth="13"/>
    <ellipse cx="88" cy="136" rx="10" ry="13" fill={skin} stroke={ink} strokeWidth="2.5"/>
    <ellipse cx="242" cy="136" rx="10" ry="13" fill={skin} stroke={ink} strokeWidth="2.5"/>
    <path d="M124 127 L201 127 L196 145 L127 145Z" fill="#6d8ba3" stroke={ink} strokeWidth="3"/>
    <path d="M144 145 L133 181 M183 145 L196 181" fill="none" stroke={ink} strokeWidth="19"/>
    <path d="M144 145 L133 181 M183 145 L196 181" fill="none" stroke={part === 'leg' ? accent : '#7e9aaf'} strokeWidth="13"/>
    {part === 'shoulder (body)' && <ellipse cx="126" cy="72" rx="16" ry="12" fill={active('shoulder (body)')} stroke={accent} strokeWidth="3"/>}
    {part === 'chest' && <ellipse cx="164" cy="91" rx="31" ry="22" fill="none" stroke={accent} strokeWidth="4"/>}
    {part === 'waist' && <path d="M133 116 Q161 121 194 116" fill="none" stroke={accent} strokeWidth="9"/>}
    <path d="M114 184 L153 184 M176 184 L211 184" stroke={ink} strokeWidth="5"/>
  </g>
}

function PersonFace({ action, breathing = false }) {
  const closed = action === 'blink'
  const sad = action === 'cry' || action === 'frown'
  const grin = action === 'grin'
  const laugh = action === 'laugh'
  const sneeze = action === 'sneeze' || action === 'cough'
  const smile = ['smile','grin','laugh','nod','blush (action)','bow (gesture)','clap','shrug'].includes(action)
  return <g>
    <ellipse cx="160" cy="83" rx="45" ry="54" fill={skin} stroke={ink} strokeWidth="3"/>
    <path d="M116 74 Q107 33 145 27 Q184 10 205 53 L205 67 Q182 57 171 42 Q145 66 116 74Z" fill="#526678"/>
    <g stroke={ink} strokeWidth="3" strokeLinecap="round">
      <path d={sad ? 'M131 69 L146 65 M176 65 L190 69' : 'M131 65 L146 65 M176 65 L190 65'} fill="none"/>
    </g>
    <g className={closed ? 'bv-eyes-blink' : ''} fill={ink}>
      <ellipse cx="139" cy="80" rx="4.4" ry="5.4"/>
      <ellipse cx="182" cy="80" rx="4.4" ry="5.4"/>
    </g>
    <path d="M159 84 L156 101 L166 103" fill="none" stroke={ink} strokeWidth="2.7" strokeLinecap="round"/>
    {grin && <path d="M138 111 Q161 140 185 111Z" fill="white" stroke={ink} strokeWidth="3"/>}
    {laugh && <ellipse cx="162" cy="122" rx="18" ry="16" fill="#8e4c52" stroke={ink} strokeWidth="3"/>}
    {!grin && !laugh && <path d={
      sad ? 'M145 127 Q161 114 178 127' :
      sneeze ? 'M156 116 Q162 111 168 116 Q174 123 166 131 Q155 132 156 116Z' :
      action === 'lick' ? 'M145 115 Q161 120 178 115' :
      smile ? 'M143 114 Q162 134 181 114' :
      'M149 116 Q162 122 174 116'
    } fill={sneeze ? '#985e63' : 'none'} stroke={ink} strokeWidth="3" strokeLinecap="round"/>}
    {action === 'blush (action)' && <g className="bv-blush" fill="#e58388" opacity=".7">
      <ellipse cx="123" cy="105" rx="12" ry="7"/><ellipse cx="198" cy="105" rx="12" ry="7"/>
    </g>}
    {action === 'cry' && <g className="bv-tears" fill="#63a9db">
      <path d="M133 91 Q125 106 133 112 Q141 106 133 91Z"/><path d="M184 91 Q176 106 184 112 Q192 106 184 91Z"/>
    </g>}
    {action === 'lick' && <path className="bv-tongue" d="M157 117 Q163 126 169 117 L169 142 Q162 155 157 142Z" fill="#df827e" stroke="#a95e61" strokeWidth="2"/>}
  </g>
}

function MotionPerson({ action }) {
  const bow = action === 'bow (gesture)'
  const clap = action === 'clap'
  const shrug = action === 'shrug'
  return <g className={bow ? 'bv-bow' : action === 'shiver' ? 'bv-shiver' : ''}>
    <path d="M127 142 Q127 135 142 135 L179 135 Q194 138 197 155 L210 194 L112 194Z" fill="#88b7cb" stroke={ink} strokeWidth="3"/>
    {clap ? <>
      <g className="bv-clap-left"><path d="M126 153 L107 147 L111 120" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round"/><ellipse cx="111" cy="119" rx="9" ry="12" fill={skin} stroke={ink} strokeWidth="2"/></g>
      <g className="bv-clap-right"><path d="M195 153 L214 147 L210 120" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round"/><ellipse cx="210" cy="119" rx="9" ry="12" fill={skin} stroke={ink} strokeWidth="2"/></g>
    </> : shrug ? <>
      <g className="bv-shrug-arms" strokeLinecap="round">
        <path d="M128 149 L102 143 L88 132 M194 149 L220 143 L235 132" fill="none" stroke={skin} strokeWidth="13"/>
        <path d="M78 132 L89 128 L100 132 M223 132 L236 128 L248 132" fill="none" stroke={ink} strokeWidth="2.5"/>
      </g>
    </> : <g stroke={skin} strokeWidth="13" strokeLinecap="round">
      <path d="M128 151 L108 177 M194 151 L216 177"/>
    </g>}
    <g className={action === 'nod' ? 'bv-nod' : action === 'shake your head' ? 'bv-shake' : ''}>
      <PersonFace action={action}/>
    </g>
    {action === 'suck' && <g>
      <path d="M199 126 L221 126 L214 166 L205 166Z" fill="#9ac7de" stroke={ink} strokeWidth="2"/>
      <path className="bv-straw" d="M210 130 L188 108 L176 110" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round"/>
    </g>}
    {action === 'sweat / perspire (formal verb)' && <g className="bv-sweat" fill="#66b0da">
      <path d="M212 64 Q201 86 212 90 Q226 86 212 64Z"/><path d="M106 105 Q98 119 106 122 Q116 118 106 105Z"/>
    </g>}
    {action === 'sneeze' && <g className="bv-burst" stroke={accent} strokeWidth="4" strokeLinecap="round">
      <path d="M208 108 L233 102 M206 118 L240 120 M207 128 L230 138"/>
    </g>}
    {action === 'cough' && <g className="bv-cough" stroke={accent} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M206 111 Q229 109 236 96 M210 122 Q242 131 250 117"/>
    </g>}
    {action === 'sigh' && <path className="bv-sigh" d="M204 120 Q219 109 231 120 T259 120" fill="none" stroke="#7aa8c6" strokeWidth="4" strokeLinecap="round"/>}
    {action === 'breathe' && <g className="bv-breath-lines" stroke="#72b4d4" fill="none" strokeWidth="4" strokeLinecap="round">
      <path d="M204 114 Q222 101 240 114"/><path d="M208 125 Q231 138 248 125"/>
    </g>}
    {action === 'hold your breath' && <g className="bv-hold" stroke="#7aa8c6" fill="none" strokeWidth="3">
      <circle cx="239" cy="118" r="16"/><path d="M233 118 L245 118"/>
    </g>}
    {action === 'snore' && <g className="bv-snore" fill="#5e85af" fontSize="21" fontWeight="700" fontFamily="sans-serif">
      <text x="210" y="99">z</text><text x="230" y="72" fontSize="28">z</text><text x="254" y="41" fontSize="34">Z</text>
    </g>}
    {action === 'shiver' && <g stroke="#719cc7" fill="none" strokeWidth="3" strokeLinecap="round">
      <path d="M99 139 l-7 7 7 7 -7 7 M223 139 l7 7 -7 7 7 7"/>
    </g>}
  </g>
}

function SymptomArt({ type }) {
  return <g strokeLinecap="round" strokeLinejoin="round">
    <rect x="64" y="66" width="190" height="86" rx="43" fill={skin} stroke={ink} strokeWidth="3"/>
    <path d="M76 114 Q137 125 243 104" stroke="#dba88a" fill="none" strokeWidth="2" opacity=".6"/>
    {type === 'bruise' && <g><ellipse cx="163" cy="109" rx="34" ry="26" fill="#ae8aab"/><ellipse cx="160" cy="106" rx="17" ry="14" fill="#7f709e" opacity=".85"/></g>}
    {type === 'burn' && <g><path d="M128 114 Q127 86 146 96 Q156 76 169 95 Q186 86 192 115 Q178 135 153 131 Q136 133 128 114Z" fill="#f19c8d" stroke="#dc7167" strokeWidth="3"/><path d="M154 88 Q160 77 156 64 M174 86 Q181 75 177 63" fill="none" stroke={accent} strokeWidth="2.5"/></g>}
    {type === 'cut' && <g><path d="M132 125 L151 99 L161 115 L184 89" fill="none" stroke="#ba5056" strokeWidth="5"/><path d="M143 92 L136 98 M173 122 L179 129" stroke="#e89b8f" strokeWidth="3"/></g>}
    {type === 'scrape' && <g stroke="#b35a58" strokeWidth="3"><path d="M137 95 l44 25 M131 108 l35 21 M154 91 l39 23 M140 130 l48 -27" fill="none"/><ellipse cx="162" cy="110" rx="35" ry="25" fill="#dd807a" opacity=".15" stroke="none"/></g>}
    {type === 'sore' && <g><ellipse cx="158" cy="112" rx="30" ry="27" fill="#f0a58c" opacity=".6" stroke={accent} strokeDasharray="4 5" strokeWidth="2"/><path d="M156 95 Q143 106 155 119 L146 136" fill="none" stroke={accent} strokeWidth="4"/><path d="M195 82 L208 69 M208 92 L230 85" stroke={accent} strokeWidth="3"/></g>}
    {type === 'swelling' && <g><ellipse cx="162" cy="97" rx="32" ry="22" fill="#e8a88d" stroke={accent} strokeWidth="3"/><path d="M134 102 Q159 74 191 101" fill="none" stroke="#f6d6bc" strokeWidth="4"/></g>}
  </g>
}

export default function VocabularyBodyArt({ term }) {
  const isHead = headTerms.has(term)
  const isBody = bodyTerms.has(term)
  const isSymptom = symptomTerms.has(term)
  return <svg className="bv-scene" data-term={term} viewBox="0 0 320 190"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect width="320" height="190" fill="#f4f8fb"/>
    <path d="M22 177 H298" stroke="#e1eaf2" strokeWidth="2"/>
    {isHead ? <HeadArt part={term}/> : isBody ? <WholeBodyArt part={term}/> :
      isSymptom ? <SymptomArt type={term}/> : <MotionPerson action={term}/>}
  </svg>
}
