import { useLanguage } from './Language'

// These are inline editorial figures, not an onboarding card or a second
// explanation of the lesson. They are attached to stable section IDs so
// Japanese and English editions can share the same artwork.
export const orientationFigures = {
  'orientation-language': { kind: 'meaning', afterJa: 2, afterEn: 2,
    ja: ['ことばのしくみ', '音だけでは、意味は決まりません。', '同じものを、異なる言葉で指すことができます。'],
    en: ['HOW LANGUAGE WORKS', 'Sound alone is not meaning.', 'Different words can point to the same thing.'] },
  'orientation-distance': { kind: 'bridge', afterJa: 4, afterEn: 2,
    ja: ['伝わるまでのやりとり', '伝わらなければ、確かめて言い直せます。', '会話は、一人ではなく二人でつくります。'],
    en: ['UNDERSTANDING EACH OTHER', 'When words miss, ask and try again.', 'Understanding is something we build together.'] },
  'orientation-another-language': { kind: 'possibilities', afterJa: 3, afterEn: 3,
    ja: ['もう一つの言語で', '新しい言葉は、選べる行動を増やします。', '旅行、仕事、人とのつながり。目的は人によって違います。'],
    en: ['ANOTHER LANGUAGE', 'More words can open more choices.', 'Travel, work, friendship: your reason can be your own.'] },
  'how-start-line': { kind: 'choice', afterJa: 1, afterEn: 1,
    ja: ['学び方を選ぶ', '入口は、ひとつではありません。', '必要なところから始めて、必要なときに戻れます。'],
    en: ['YOUR OWN ROUTE', 'There is more than one place to start.', 'Begin where it helps, and return whenever you need.'] },
  'how-chapter-loop': { kind: 'lesson', afterJa: 0, afterEn: 0,
    ja: ['レッスンの流れ', '場面を見て、理解して、声に出す。', '少し時間をおいて、もう一度使ってみましょう。'],
    en: ['INSIDE A LESSON', 'See the scene. Understand. Say it.', 'Return after some time and try it again.'] },
  'how-audio': { kind: 'audio', afterJa: 2, afterEn: 1,
    ja: ['音声の使い分け', '聞くことと、声に出すことは別の練習です。', 'リピートは聞いたあとに。シャドーイングは音を追いかけます。'],
    en: ['LISTEN AND RESPOND', 'Listening and speaking train different skills.', 'Repeat after a phrase, or follow a voice as it continues.'] },
  'how-start': { kind: 'save', afterJa: 2, afterEn: 2,
    ja: ['学習の記録', '記録は、このブラウザーに保存されます。', '同じブラウザーから再開できます。端末間の同期はまだありません。'],
    en: ['YOUR LEARNING RECORD', 'Progress is saved in this browser.', 'Return in the same browser. Device-to-device sync is not available yet.'] },
}

function Learner({ x, y, shirt = '#6d9386', skin = '#d5a37c', flip = false }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ') scale(' + (flip ? '-1' : '1') + ' 1)'}>
      <ellipse cx="3" cy="91" rx="36" ry="6" fill="#cddfd5" opacity=".8" />
      <path d="M-33 86V59Q-32 39-13 33L11 33Q32 38 34 59V86Z" fill={shirt} />
      <path d="M-12 86v14M15 86v14" stroke="#596b69" strokeWidth="9" strokeLinecap="round" />
      <rect x="-7" y="26" width="15" height="16" rx="6" fill={skin} />
      <ellipse cx="0" cy="6" rx="23" ry="27" fill={skin} />
      <path d="M-23 6Q-27-27 1-25Q26-25 23 9Q15-5 3-9Q-9 4-23 6Z" fill="#394b47" />
      <circle cx="9" cy="9" r="1.4" fill="#3b4641" />
      <path d="M4 21q5 3 9-1" fill="none" stroke="#8f5d4c" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}

function Speech({ x, y, width = 95, children, color = '#fff' }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect width={width} height="43" rx="18" fill={color} stroke="#d4e1d7" strokeWidth="1.3" />
      <path d="M23 42l-6 12 22-12" fill={color} stroke="#d4e1d7" strokeWidth="1.3" strokeLinejoin="round" />
      <g fontFamily="Georgia, 'Times New Roman', serif" fontSize="18" fill="#334f46" textAnchor="middle">{children}</g>
    </g>
  )
}

function ArtScene({ kind }) {
  const ink = '#38564c'
  const cream = '#f6f7ef'
  const muted = '#90ac9c'
  let scene
  switch (kind) {
    case 'meaning':
      scene = <>
        <Learner x={58} y={93} shirt="#8bafa3" />
        <Learner x={275} y={93} shirt="#bda897" skin="#bd896e" flip />
        <Speech x={93} y={35} width={99}><text x="49" y="27">water</text></Speech>
        <path d="M106 110q25-18 52 0t50 0" stroke={muted} strokeWidth="3" fill="none" strokeDasharray="4 7" />
        <g transform="translate(154 109)">
          <path d="M-19-22h39l-5 45h-29Z" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
          <path d="M-15 2q17-6 30 0l-3 17h-24Z" fill="#bbd7de" opacity=".9" />
          <path d="M-12-12h24" stroke="#dbe5e2" strokeWidth="2" />
        </g>
        <path d="M221 104l12 0m-6-6 6 6-6 6" stroke="#87a398" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>; break
    case 'bridge':
      scene = <>
        <path d="M148 184q22-68 49 0" fill="none" stroke="#d2dfd6" strokeWidth="22" />
        <path d="M112 182Q170 139 231 182" fill="none" stroke="#8fb5a1" strokeWidth="5" strokeLinecap="round" />
        <path d="M112 192Q170 150 231 192" fill="none" stroke="#b9d1c1" strokeWidth="2" strokeDasharray="5 5" />
        <Learner x={69} y={93} shirt="#99b4a3" />
        <Learner x={277} y={93} shirt="#bfa89e" skin="#ba8c6b" flip />
        <Speech x={107} y={30} width={100}><text x="50" y="27">...?</text></Speech>
        <circle cx="227" cy="92" r="19" fill="#f1ddc1" />
        <path d="M219 92l6 6 11-14" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>; break
    case 'possibilities':
      scene = <>
        <Learner x={172} y={107} shirt="#86a897" />
        <path d="M170 82V25M170 44H70M170 44h97M170 73H98M170 73h78" fill="none" stroke="#89a89a" strokeWidth="3" strokeLinecap="round"/>
        <rect x="30" y="20" width="81" height="49" rx="10" fill="#fff" stroke="#d5e1d6" />
        <g transform="translate(61 31)" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"><rect x="0" y="8" width="24" height="23" rx="4"/><path d="M6 8V4h12v4M12 12v9"/></g>
        <rect x="225" y="20" width="84" height="49" rx="10" fill="#fff" stroke="#d5e1d6" />
        <g transform="translate(241 28)" fill="none" stroke={ink} strokeWidth="2" strokeLinejoin="round"><path d="M3 9h43v28H16l-13 7V9Z"/><path d="M13 21h23M13 29h16"/></g>
        <rect x="245" y="76" width="75" height="45" rx="10" fill="#fff" stroke="#d5e1d6" />
        <g transform="translate(259 81)" fill="none" stroke={ink} strokeWidth="2"><path d="M5 12h35v22H5zM14 12V6h16v6M5 21h35"/></g>
        <path d="M106 167h133" stroke="#d0dfd4" strokeWidth="3" strokeLinecap="round"/>
      </>; break
    case 'choice':
      scene = <>
        <Learner x={57} y={98} shirt="#8daf9e" />
        <path d="M93 164H133Q151 164 154 147V112q0-16 20-16h19M154 136h39M154 161h39" fill="none" stroke="#a8c3b2" strokeWidth="3" strokeLinecap="round" />
        <g fill="#fff" stroke="#d6e2d9" strokeWidth="1.5">
          <rect x="197" y="43" width="112" height="34" rx="10"/><rect x="197" y="92" width="112" height="34" rx="10"/><rect x="197" y="141" width="112" height="34" rx="10"/>
        </g>
        <g fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"><circle cx="216" cy="60" r="7"/><path d="m216 56 0 8m-4-4h8M210 109h14m-11-5v10M210 158h14m-7-7v14"/></g>
        <g fill="#60776b" fontFamily="system-ui,sans-serif" fontWeight="600" fontSize="10">
          <text x="233" y="64">START</text><text x="233" y="113">REVISIT</text><text x="233" y="162">EXPLORE</text>
        </g>
      </>; break
    case 'lesson':
      scene = <>
        <rect x="12" y="38" width="110" height="123" rx="13" fill="#fff" stroke="#d2dfd6" />
        <rect x="136" y="38" width="90" height="123" rx="13" fill="#fff" stroke="#d2dfd6"/>
        <rect x="240" y="38" width="90" height="123" rx="13" fill="#fff" stroke="#d2dfd6"/>
        <Learner x={47} y={51} shirt="#8aa99a"/>
        <Learner x={94} y={51} shirt="#b6a18e" skin="#bd9073" flip/>
        <path d="M55 68h24" stroke="#b5cfc1" strokeWidth="3" strokeDasharray="3 4"/>
        <g fontFamily="Georgia,serif" fill={ink} textAnchor="middle"><text x="181" y="86" fontSize="23">Hi.</text><text x="285" y="86" fontSize="22">Hi!</text></g>
        <g stroke="#9eb8a6" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M165 113h32M165 121h23M165 129h27"/><path d="M260 113q15-17 30 0t29 0" /><path d="M122 105h14m-6-5 6 5-6 5M226 105h14m-6-5 6 5-6 5" /></g>
        <g fill="#819f90" fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600" textAnchor="middle"><text x="67" y="179">SCENE</text><text x="181" y="179">STUDY</text><text x="285" y="179">PRACTICE</text></g>
      </>; break
    case 'audio':
      scene = <>
        <Learner x={79} y={93} shirt="#91b2a2" />
        <path d="M50 103V89a29 29 0 0 1 58 0v14" stroke={ink} fill="none" strokeWidth="5" />
        <rect x="44" y="100" width="12" height="25" rx="5" fill="#d5e2db" stroke={ink} strokeWidth="2"/>
        <rect x="102" y="100" width="12" height="25" rx="5" fill="#d5e2db" stroke={ink} strokeWidth="2"/>
        <path d="M139 104h15l7-17 11 35 12-22 8 14 7-10h13" fill="none" stroke="#789f93" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
        <Learner x={277} y={93} shirt="#b2a5ad" skin="#c79575" flip />
        <Speech x={206} y={22} width={114}><text x="57" y="28">Hello!</text></Speech>
        <path d="M211 148q16-10 32 0" stroke="#c4d9ca" strokeWidth="2" fill="none" />
      </>; break
    case 'save':
      scene = <>
        <rect x="48" y="35" width="246" height="149" rx="13" fill="#fff" stroke="#8eada0" strokeWidth="3"/>
        <path d="M48 61h246" stroke="#d7e5da" strokeWidth="2"/>
        <circle cx="64" cy="48" r="3" fill="#cf8579"/><circle cx="76" cy="48" r="3" fill="#e5c48f"/><circle cx="88" cy="48" r="3" fill="#8eb29b"/>
        <rect x="72" y="80" width="92" height="74" rx="9" fill="#e9f2e9"/>
        <g stroke={ink} strokeWidth="2" fill="none"><path d="M91 105h53M91 118h43M91 131h35"/></g>
        <rect x="183" y="78" width="84" height="24" rx="7" fill="#e4eee9"/>
        <rect x="183" y="112" width="66" height="9" rx="4" fill="#d1dfd5"/>
        <rect x="183" y="130" width="55" height="9" rx="4" fill="#d1dfd5"/>
        <circle cx="246" cy="143" r="25" fill="#f1dec1" stroke="#d9e2d7" strokeWidth="2"/>
        <path d="m232 143 9 9 18-19" stroke={ink} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </>; break
    default: scene = null
  }
  return (
    <svg viewBox="0 0 344 210" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="344" height="210" rx="15" fill={cream} />
      <circle cx="294" cy="35" r="46" fill="#e9efe7" opacity=".8" />
      <path d="M0 194q85-18 172 0t172 0v16H0Z" fill="#ebf1e9" />
      {scene}
    </svg>
  )
}

export default function OrientationFigure({ config }) {
  const { language } = useLanguage()
  const [kicker, title, caption] = language === 'ja' ? config.ja : config.en
  return (
    <figure className="rf-editorial-figure">
      <div className="rf-editorial-art"><ArtScene kind={config.kind} /></div>
      <figcaption className="rf-editorial-caption">
        <span className="rf-editorial-kicker">{kicker}</span>
        <strong>{title}</strong>
        <span className="rf-editorial-detail">{caption}</span>
      </figcaption>
    </figure>
  )
}
