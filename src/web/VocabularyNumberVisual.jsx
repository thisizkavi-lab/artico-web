import React from 'react'

// Pure SVG diagrams: all shapes stay sharp at any screen resolution.
const ink = '#3265b8'
const pale = '#e8eff9'
const edge = '#a9bdd8'

function point(cx, cy, r, degrees) {
  const angle = degrees * Math.PI / 180
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
}

function sector(cx, cy, r, start, end) {
  const [x1, y1] = point(cx, cy, r, start)
  const [x2, y2] = point(cx, cy, r, end)
  return 'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r
    + ' 0 ' + (end - start > 180 ? 1 : 0) + ' 1 ' + x2 + ' ' + y2 + ' Z'
}

function FractionDisc({ x, y = 24, r = 18, numerator, denominator }) {
  return <g>
    <circle cx={x} cy={y} r={r} fill={pale} />
    {denominator === 1
      ? <circle cx={x} cy={y} r={r} fill={numerator ? ink : pale} />
      : Array.from({ length: denominator }, (_, i) => {
        const start = -90 + (360 * i / denominator)
        const end = start + 360 / denominator
        return <path key={i} d={sector(x, y, r, start, end)}
          fill={i < numerator ? ink : pale} stroke="#fff" strokeWidth="1.4" />
      })}
    <circle cx={x} cy={y} r={r} fill="none" stroke={edge} strokeWidth="1.3" />
  </g>
}

function Dots({ count }) {
  const columns = count === 12 ? 4 : 3
  const spacing = 17
  const width = (columns - 1) * spacing
  const rows = Math.ceil(count / columns)
  const startY = 24 - ((rows - 1) * spacing) / 2
  return <g>
    {Array.from({ length: count }, (_, i) =>
      <circle key={i} cx={64 - width / 2 + (i % columns) * spacing}
        cy={startY + Math.floor(i / columns) * spacing} r="6"
        fill={ink} stroke="#fff" strokeWidth="1.3" />
    )}
  </g>
}

function Fractions({ term }) {
  const diagrams = {
    'whole / a whole': { label: 'One complete, shaded circle', parts: [[64, 1, 1]] },
    'fractions / a fraction': { label: 'A circle divided into two equal parts', parts: [[64, 1, 2]] },
    'half / a half / one half': { label: 'One of two equal parts is shaded', parts: [[64, 1, 2]] },
    'a third / one third': { label: 'One of three equal parts is shaded', parts: [[64, 1, 3]] },
    'two thirds': { label: 'Two of three equal parts are shaded', parts: [[64, 2, 3]] },
    'quarter / a quarter / one quarter / one fourth': { label: 'One of four equal parts is shaded', parts: [[64, 1, 4]] },
    'three quarters / three fourths': { label: 'Three of four equal parts are shaded', parts: [[64, 3, 4]] },
    'one and a half': { label: 'One complete circle plus a half circle', parts: [[43, 1, 1], [85, 1, 2]] },
    'two and a half': { label: 'Two complete circles plus a half circle', parts: [[27, 1, 1], [64, 1, 1], [101, 1, 2]], radius: 15 },
  }
  if (term === 'full') {
    return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img" aria-label="A container filled to the top">
      <rect x="45" y="5" width="38" height="38" rx="5" fill="#f7f9fc" />
      <rect x="48" y="8" width="32" height="32" rx="2" fill={ink} opacity=".9" />
      <path d="M45 5 V40 Q45 44 49 44 H79 Q83 44 83 40 V5"
        fill="none" stroke={edge} strokeWidth="2" strokeLinecap="round" />
    </svg>
  }
  if (term === 'dozen / a dozen' || term === 'half a dozen') {
    const count = term === 'half a dozen' ? 6 : 12
    return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img"
      aria-label={count + ' individual dots'}>
      <Dots count={count} />
    </svg>
  }
  const diagram = diagrams[term]
  if (!diagram) return null
  return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img" aria-label={diagram.label}>
    {diagram.parts.map(([x, numerator, denominator], i) =>
      <FractionDisc key={i} x={x} numerator={numerator} denominator={denominator}
        r={diagram.radius || 18} />)}
  </svg>
}

function PercentGrid({ value }) {
  const total = 100
  return <g>
    {Array.from({ length: total }, (_, i) => {
      const fraction = Math.max(0, Math.min(1, value - i))
      const x = 38 + (i % 10) * 5.4
      const y = 0.4 + Math.floor(i / 10) * 4.65
      return <g key={i}>
        <rect x={x} y={y} width="4.4" height="3.7" rx=".55" fill={pale} />
        {fraction > 0 && <rect x={x} y={y} width={4.4 * fraction}
          height="3.7" rx={fraction === 1 ? .55 : 0} fill={ink} />}
      </g>
    })}
  </g>
}

function ComparisonLine({ cue }) {
  const include = cue === '≥' || cue === '≤'
  const leftward = cue === '<' || cue === '≤'
  const a = leftward ? 25 : 64
  const b = leftward ? 64 : 103
  return <svg className="vl02-number-svg" viewBox="0 0 128 48"
    role="img" aria-label={(include ? 'Including ' : 'Excluding ') + 'five, all values ' + (leftward ? 'to the left, below five' : 'to the right, above five')}>
    <path d="M21 24 H107" stroke={edge} strokeWidth="2" strokeLinecap="round" />
    <path d={'M' + a + ' 24 H' + b} stroke={ink} strokeWidth="4" strokeLinecap="round" />
    <path d={leftward ? 'M28 18 L18 24 L28 30' : 'M100 18 L110 24 L100 30'}
      fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="64" cy="24" r="5.8" fill={include ? ink : '#fff'} stroke={ink} strokeWidth="2" />
    <text x="64" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#566c87">5</text>
  </svg>
}

function Approximation() {
  return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img"
    aria-label="A range of values near an approximate center">
    <rect x="37" y="9" width="54" height="26" rx="13" fill={pale} />
    <path d="M15 22 H113" stroke={edge} strokeWidth="1.5" strokeLinecap="round" />
    {[37, 52, 64, 76, 91].map((x, i) => <circle key={x} cx={x} cy="22"
      r={i === 2 ? 5.6 : 3.7} fill={ink} opacity={i === 2 ? 1 : .55} />)}
    <path d="M57 5 Q64 0 71 5" fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
}

function Percentages({ cue }) {
  if (cue === '≈') return <Approximation />
  if (['>', '<', '≥', '≤'].includes(cue)) return <ComparisonLine cue={cue} />
  if (cue === '%') {
    return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img" aria-label="Percent means out of one hundred">
      <text x="64" y="36" textAnchor="middle" fontSize="36" fontWeight="750" fill={ink}>%</text>
    </svg>
  }
  const value = Number.parseFloat(cue)
  if (!Number.isFinite(value)) return null
  return <svg className="vl02-number-svg" viewBox="0 0 128 48" role="img"
    aria-label={cue + ': this portion of a one hundred-square grid is shaded'}>
    <PercentGrid value={value} />
  </svg>
}

export default function VocabularyNumberVisual({ groupId, term, cue }) {
  if (groupId === 'fractions') return <Fractions term={term} />
  if (groupId === 'percent') return <Percentages cue={cue} />
  return null
}
