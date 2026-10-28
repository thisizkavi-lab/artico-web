// Artico original stroke guides. Each SVG path represents one pen stroke,
// authored in writing order rather than auto-traced from a font outline.
// Four guidelines in this coordinate system: top 18, x-height 60,
// baseline 102, descender line 144. Capitals reach 18..102;
// lowercase x-height letters reach 60..102; descenders extend to 144.
export const GUIDES = [18, 60, 102, 144]
export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// These are one consistent, simple, unjoined PRINT handwriting style.
// A path is a single pen-down stroke. Separate paths mean lift the pencil.
export const CAPITAL_STROKES = {
  A: ['M30 102 L77 18 L124 102', 'M46 75 L108 75'],
  B: ['M34 18 L34 102', 'M34 18 L73 18 C127 18 127 60 75 60 L34 60', 'M34 60 L78 60 C133 60 130 102 74 102 L34 102'],
  C: ['M121 29 C91 11 34 16 31 59 C27 105 88 119 121 91'],
  D: ['M34 18 L34 102', 'M34 18 L68 18 C132 18 134 102 68 102 L34 102'],
  E: ['M37 18 L37 102', 'M37 18 L117 18', 'M37 60 L103 60', 'M37 102 L117 102'],
  F: ['M37 18 L37 102', 'M37 18 L117 18', 'M37 60 L103 60'],
  G: ['M120 28 C92 10 34 16 31 58 C28 106 88 117 120 90 L120 65 L85 65'],
  H: ['M36 18 L36 102', 'M118 18 L118 102', 'M36 61 L118 61'],
  I: ['M41 18 L113 18', 'M77 18 L77 102', 'M41 102 L113 102'],
  J: ['M42 18 L116 18', 'M100 18 L100 78 C100 111 49 113 35 85'],
  K: ['M38 18 L38 102', 'M121 18 L38 73', 'M70 52 L125 102'],
  L: ['M37 18 L37 102 L119 102'],
  M: ['M26 102 L26 18 L77 67 L128 18 L128 102'],
  N: ['M32 102 L32 18 L122 102 L122 18'],
  O: ['M77 18 C18 18 18 102 77 102 C136 102 136 18 77 18 Z'],
  P: ['M35 102 L35 18 L77 18 C133 18 132 67 77 67 L35 67'],
  Q: ['M75 18 C19 18 19 102 75 102 C132 102 132 18 75 18 Z', 'M83 85 L129 116'],
  R: ['M35 102 L35 18 L78 18 C131 18 130 66 77 66 L35 66', 'M75 66 L125 102'],
  S: ['M117 31 C93 11 36 14 37 48 C38 66 64 67 86 72 C138 83 114 113 68 103 C53 101 44 97 34 87'],
  T: ['M28 18 L124 18', 'M76 18 L76 102'],
  U: ['M35 18 L35 75 C35 114 118 114 118 75 L118 18'],
  V: ['M29 18 L77 102 L125 18'],
  W: ['M24 18 L48 102 L76 45 L105 102 L130 18'],
  X: ['M33 18 L120 102', 'M120 18 L33 102'],
  Y: ['M29 18 L77 66 L125 18', 'M77 66 L77 102'],
  Z: ['M31 18 L123 18 L31 102 L123 102'],
}

export const SMALL_STROKES = {
  a: ['M95 70 C80 53 48 55 40 77 C32 99 64 111 84 98 C91 93 95 86 95 79', 'M95 60 L95 102'],
  b: ['M38 18 L38 102', 'M38 76 C47 57 69 55 85 63 C111 78 103 105 78 105 C57 105 44 97 38 87'],
  c: ['M101 68 C81 53 48 55 39 78 C30 106 74 115 101 96'],
  d: ['M100 76 C90 57 66 56 52 64 C31 76 35 106 62 106 C80 106 95 95 100 82', 'M100 18 L100 102'],
  e: ['M38 83 L100 83 C98 56 54 52 41 72 C22 105 68 117 100 96'],
  f: ['M91 25 C67 15 53 31 53 55 L53 102', 'M30 61 L88 61'],
  g: ['M99 73 C90 57 67 55 53 64 C33 76 35 105 62 105 C81 105 94 94 99 81', 'M99 60 L99 120 C99 153 56 149 39 133'],
  h: ['M38 18 L38 102', 'M38 83 C42 60 64 56 83 65 C95 71 98 82 98 102'],
  i: ['M68 60 L68 102', 'M68 36 L68 37'],
  j: ['M86 60 L86 121 C86 145 59 151 43 133', 'M86 37 L86 38'],
  k: ['M38 18 L38 102', 'M102 60 L39 88', 'M67 77 L105 102'],
  l: ['M68 18 L68 102'],
  m: ['M31 60 L31 102', 'M31 81 C37 61 52 56 64 65 C71 71 71 82 71 102', 'M71 81 C77 61 93 56 107 66 C115 72 115 83 115 102'],
  n: ['M38 60 L38 102', 'M38 82 C45 60 69 54 85 65 C96 72 98 82 98 102'],
  o: ['M74 60 C24 60 24 103 74 103 C125 103 125 60 74 60 Z'],
  p: ['M40 60 L40 143', 'M40 74 C49 58 70 56 87 64 C112 78 104 106 78 105 C58 105 46 96 40 87'],
  q: ['M100 75 C92 57 68 56 53 64 C31 76 35 105 62 105 C81 105 95 94 100 82', 'M100 60 L100 143'],
  r: ['M42 60 L42 102', 'M42 83 C47 63 62 55 82 62'],
  s: ['M99 68 C74 55 39 57 43 76 C45 87 88 83 98 95 C111 111 56 111 37 96'],
  t: ['M70 25 L70 87 C70 101 77 106 94 100', 'M46 60 L95 60'],
  u: ['M39 60 L39 88 C39 113 80 109 97 84', 'M97 60 L97 102'],
  v: ['M35 60 L75 103 L115 60'],
  w: ['M24 60 L44 102 L72 72 L100 102 L128 60'],
  x: ['M42 60 L106 102', 'M105 60 L42 102'],
  y: ['M36 60 L72 102 L109 60', 'M72 102 L62 128 C56 141 47 145 36 140'],
  z: ['M39 60 L106 60 L39 102 L106 102'],
}

export function getLetterStrokes(letter, form = 'capital') {
  const normalized = typeof letter === 'string' && /^[A-Za-z]$/.test(letter)
    ? letter.toUpperCase()
    : 'A'
  return form === 'small'
    ? SMALL_STROKES[normalized.toLowerCase()]
    : CAPITAL_STROKES[normalized]
}

export function getStartPosition(d) {
  const found = d.match(/^M\s*([\d.]+)\s+([\d.]+)/)
  return found ? [Number(found[1]), Number(found[2])] : [0, 0]
}
