const blobShapes = [
  'M116 12 C140 8 159 17 173 34 C189 51 207 67 205 91 C203 113 203 136 186 151 C170 166 147 168 124 166 C100 164 77 168 59 153 C42 139 31 117 32 93 C33 70 45 50 60 33 C76 16 95 13 116 12Z',
  'M118 10 C143 8 163 19 179 37 C195 54 207 74 204 97 C202 119 198 140 180 152 C164 164 142 164 120 167 C97 168 74 161 57 146 C41 130 32 109 35 86 C38 64 48 43 66 28 C82 16 98 11 118 10Z',
  'M105 14 C129 10 153 19 172 36 C191 52 208 72 207 95 C206 117 191 137 176 151 C160 166 137 168 114 167 C91 166 69 168 53 151 C38 135 31 112 34 88 C36 67 49 48 62 30 C73 16 88 14 105 14Z',
  'M115 17 C138 11 160 17 177 30 C194 44 202 62 202 84 C201 107 202 130 187 149 C173 166 148 171 125 168 C101 165 79 159 62 144 C46 129 37 109 35 87 C33 65 46 49 63 35 C79 22 94 18 115 17Z',
]

export default function VocabularyColorSwatch({ term, color, variant = 0, showLabel = true }) {
  const label = term
  return (
    <svg className="vlt-color-swatch" viewBox="0 0 240 200" role="img"
      aria-label={showLabel ? label : 'Color swatch'}>
      <path d={blobShapes[variant % blobShapes.length]} fill={color} />
      {showLabel && (
        <text x="120" y="187" textAnchor="middle" fill="#a6a6a6"
          fontSize="20" fontWeight="400" fontFamily="Arial, Helvetica, sans-serif">
          {label}
        </text>
      )}
    </svg>
  )
}
