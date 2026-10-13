// Extends Artico's approved, original Figma vector language. Shared linework,
// characters and palette keep scenes coherent; objects carry actual meaning.
const ink = '#253C38',
  paper = '#F8F5EF',
  sage = '#E7EEE5',
  rose = '#F3E1D8',
  gold = '#F2E8C9'
const green = '#7A927B',
  rust = '#A64732',
  sand = '#C4974F',
  blue = '#5C8077'
const path = (d, fill = 'none', extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`
const rect = (x, y, w, h, fill = paper, r = 8, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`
const circle = (x, y, r, fill = paper, extra = '') =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`
const text = (x, y, value, size = 15, extra = '') =>
  `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" ${extra.includes('fill=') ? '' : `fill="${ink}"`} stroke="none" ${extra}>${escape(value)}</text>`
const group = (content, x = 0, y = 0, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${content}</g>`
const escape = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
export const hashName = (name) =>
  [...name].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
export const portraitName = (name, chapterId) =>
  String(hashName(['A', 'B', 'You', 'Friend'].includes(name) ? `${chapterId}:${name}` : name))
export function svg(width, height, body, label = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">${label ? `<title>${escape(label)}</title>` : ''}<g stroke="${ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`
}
const approved = {
  Maya: { skin: '#D79773', hair: '#333633', shirt: rust, kind: 'bob' },
  Eli: { skin: '#B97958', hair: '#353632', shirt: blue, kind: 'short', glasses: true },
  Jordan: { skin: '#E9B896', hair: '#493A30', shirt: sand, kind: 'curl' },
  Lily: { skin: '#E7B592', hair: '#4B3931', shirt: green, kind: 'long' },
}
export function characterStyle(name, id = '') {
  if (approved[name]) return approved[name]
  const h = hashName(`${id}:${name}`)
  return {
    skin: ['#E9B896', '#B97958', '#D79773', '#A36C51'][h % 4],
    hair: ['#493A30', '#333633', '#5C483B'][h % 3],
    shirt: /Pharmacist|Clinician|Dentist|Nurse/.test(name)
      ? paper
      : [blue, rust, sand, green][(h >>> 3) % 4],
    kind: ['short', 'bob', 'curl', 'long'][(h >>> 5) % 4],
    glasses: h % 7 === 0,
  }
}
export function person(name, x = 0, y = 0, s = 1, gesture = false, id = '', mood = 'warm') {
  const p = characterStyle(name, id)
  return group(
    path('M39 164L34 219L48 220L62 164M63 164L71 220L86 219L84 160', ink) +
      path('M30 221h21v5H27q-3-4 3-5M69 221h20l5 5H70Z', paper) +
      path('M35 92Q59 76 83 92L93 158Q70 171 26 157Z', p.shirt) +
      path('M48 81v16q12 13 24 0V79', p.skin) +
      (p.kind === 'long' || p.kind === 'bob'
        ? path(`M34 40Q32 11 63 10Q94 10 93 46L96 ${p.kind === 'long' ? 104 : 84}H30Z`, p.hair)
        : '') +
      path('M36 45Q30 29 46 19Q68 10 85 31L86 60Q82 85 62 87Q38 82 36 60Z', p.skin) +
      (p.kind === 'short'
        ? path('M35 49Q26 18 47 12Q68 4 86 23L88 45L81 34Q60 43 43 31Z', p.hair)
        : p.kind === 'curl'
          ? path(
              'M35 44Q24 36 32 26Q23 18 39 12Q45 0 58 9Q72-1 81 11Q98 12 89 30Q99 37 86 49L81 33Q59 43 42 32Z',
              p.hair,
            )
          : path('M36 46Q34 20 55 17Q79 11 89 39Q70 41 57 27Q51 42 36 46Z', p.hair)) +
      path('M46 51h4m21 0h4M61 54l-3 9h5') +
      path(mood === 'warm' ? 'M53 71q10 7 19-1' : 'M54 74h16') +
      (p.glasses
        ? rect(39, 44, 20, 15, 'none', 6) + rect(65, 44, 20, 15, 'none', 6) + path('M59 49h6')
        : '') +
      (gesture
        ? path('M32 98L16 128L-2 103', 'none', `stroke="${p.shirt}" stroke-width="16"`) +
          path('M-3 102l-7-8m7 8l2-13m-2 13l8-7', 'none', `stroke="${p.skin}" stroke-width="7"`) +
          path('M85 99l20 29 14-19', 'none', `stroke="${p.shirt}" stroke-width="15"`) +
          path('M118 110l9-11m-8 11l13-4', 'none', `stroke="${p.skin}" stroke-width="7"`)
        : path(
            'M33 97L16 131L39 143M85 99L100 136L82 146',
            'none',
            `stroke="${p.shirt}" stroke-width="15"`,
          ) + path('M38 143l11 3M81 145l-9 2', 'none', `stroke="${p.skin}" stroke-width="9"`)) +
      path('M44 94l13 16 17-16M36 135l-4 20', 'none', 'opacity=".4"'),
    x,
    y,
    s,
  )
}
export function portraitSvg(name, id) {
  return svg(
    120,
    120,
    circle(60, 60, 59, [rose, sage, gold][hashName(name) % 3], 'stroke="none"') +
      group(person(name, 0, 0, 1, false, id), -3, 5, 1.04),
    name,
  )
}
const plant = () =>
  path('M80 111V27') +
  path('M80 72Q28 56 49 29Q77 30 80 72M80 58Q120 8 138 33Q129 70 80 77', green) +
  path('M47 107h66l-9 44H57Z', sand)
const coffee = () =>
  `<ellipse cx="76" cy="135" rx="64" ry="14" fill="${paper}"/>` +
  path('M27 60h97v39q-3 35-49 35q-48-2-48-36Z', paper) +
  `<ellipse cx="76" cy="60" rx="48" ry="11" fill="#B88967"/>` +
  path('M126 70q32-6 30 16q-1 19-38 18M53 37q-12-9 2-19M77 33q-11-10 2-20M101 37q-9-9 1-18')
const book = () =>
  path('M29 21h90q13 0 13 13v100H39q-17-1-17-15V33q0-12 7-12Z', green) +
  path('M38 21v92h94M39 114q-18 0-17 12q0 12 17 12h96V27') +
  path('M54 43h56M54 53h43M52 129h64') +
  rect(84, 21, 14, 47, rust, 0, 'stroke="none"')
const phone = () =>
  rect(44, 10, 75, 143, ink, 13) +
  rect(51, 23, 61, 109, paper, 4) +
  path('M69 17h23', 'none', `stroke="${paper}"`) +
  circle(81, 142, 3, paper) +
  rect(59, 35, 45, 22, sage, 6) +
  path('M67 43h25M67 49h16') +
  rect(59, 65, 45, 34, rose, 6) +
  path('M67 75h26M67 83h21M67 91h15')
const laptop = () =>
  rect(19, 22, 121, 88, ink, 8) +
  rect(26, 29, 107, 72, sage, 3) +
  path('M19 111L8 133q-1 7 6 8h130q7-1 5-8l-9-22Z', paper) +
  path('M55 115h49l7 11H48Z', sage) +
  path('M37 46h34M37 57h61M37 68h52M37 83h27')
const document = () =>
  path('M37 12h71l22 23v113H37Z', paper) +
  path('M108 12v25h22', gold) +
  path('M54 48h57M54 65h45M54 82h57M54 99h36M54 126h27')
const ticket = () =>
  path('M19 36h127v31q-17 0-17 13q0 14 17 14v31H19V94q17 0 17-14q0-13-17-13Z', gold) +
  path('M111 41v78', 'none', 'stroke-dasharray="5 6"') +
  path('M50 56h38M50 69h30M50 101h39')
const car = () =>
  path('M20 71l18-32h72l25 32l17 9v39H9V82Z', sand) +
  path('M49 46h24v31H31ZM81 46h24l23 31H81Z', sage) +
  path('M13 94h17m105 0h12') +
  circle(41, 120, 16, ink) +
  circle(121, 120, 16, ink) +
  circle(41, 120, 7, paper) +
  circle(121, 120, 7, paper) +
  path('M71 84h12')
const bike = () =>
  circle(34, 110, 28, 'none') +
  circle(130, 110, 28, 'none') +
  path('M34 110l29-56 33 56H34l36-40h44l16 40M109 43l20-8M113 70l-9-34M57 48h20M96 110l13 11') +
  circle(96, 110, 6, paper)
const house = () =>
  path('M13 69L80 15l67 54H13Z', rust) +
  rect(27, 68, 106, 82, paper, 0) +
  rect(64, 102, 30, 48, sage, 0) +
  rect(38, 83, 18, 25, gold, 1) +
  rect(104, 83, 18, 25, gold, 1) +
  path('M47 84v24M113 84v24M34 149h101') +
  circle(87, 128, 2, ink)
const clock = () =>
  circle(81, 81, 63, paper) +
  circle(81, 81, 55, gold, 'stroke="none"') +
  path('M81 31v7M81 123v7M30 81h7M124 81h7M81 81V52M81 81h35') +
  circle(81, 81, 4, ink)
const calendar = () =>
  rect(20, 24, 125, 126, paper, 9) +
  rect(20, 24, 125, 30, rust, 9) +
  path('M20 52h125M48 13v28M117 13v28') +
  [44, 78, 112].map((x) => [74, 103, 132].map((y) => circle(x, y, 3, ink)).join('')).join('') +
  circle(78, 103, 15, 'none', `stroke="${rust}"`)
const suitcase = () =>
  rect(48, 11, 65, 26, 'none', 9) +
  rect(28, 35, 105, 112, sand, 14) +
  rect(38, 44, 85, 94, paper, 9) +
  path('M53 51v78M108 51v78M55 33v12M105 33v12') +
  circle(47, 153, 5, ink) +
  circle(118, 153, 5, ink) +
  rect(61, 70, 39, 23, sage, 3)
const bed = () =>
  path('M12 145V44h19v48h111v53M15 118h132', sand) +
  rect(28, 67, 118, 54, paper, 6) +
  rect(34, 76, 41, 25, gold, 6) +
  path('M86 68v51', rose) +
  path('M22 141v14M137 141v14')
const box = () =>
  path('M20 45l62-27 62 27v80l-62 28-62-28Z', sand) +
  path('M20 45l62 29 62-29M82 74v79') +
  path('M49 32l63 30v38l-14-4V70L36 39Z', gold) +
  path('M32 99l31 14M32 110l21 9')
const medicine = () =>
  rect(45, 42, 78, 105, paper, 10) +
  rect(40, 26, 89, 21, green, 4) +
  rect(54, 76, 60, 46, gold, 2) +
  path('M84 87v23M73 99h23', 'none', `stroke="${rust}" stroke-width="6"`) +
  path('M49 35h71')
const body = () =>
  circle(80, 25, 17, '#D79773') +
  path('M59 46h41l26 48-15 7-13-24v72H85l-5-43-5 43H62V77L48 100l-13-7Z', sage) +
  path('M53 64h56M61 103h37') +
  circle(108, 63, 7, rose) +
  circle(62, 139, 7, gold)
const tooth = () =>
  path(
    'M39 27Q22 45 38 85l8 58q8 21 19 0l15-43 16 43q11 21 20 0l7-58q16-40-1-58q-18-17-42-3q-22-14-41 3Z',
    paper,
  ) + path('M57 42q22-12 43 0M79 99q9-18 16-29', 'none', `stroke="${blue}"`)
const plate = () =>
  `<ellipse cx="82" cy="83" rx="65" ry="53" fill="${paper}"/><ellipse cx="82" cy="83" rx="48" ry="36" fill="${sage}"/>` +
  path('M18 30v23M9 30v23M26 30v23M9 53q9 12 17 0M18 61v82M148 29q-18 19-10 55h10v60M148 29v115') +
  circle(75, 74, 15, '#C4974F') +
  path('M64 99q10-21 29-20q25 5 13 28Z', green)
const umbrella = () =>
  path('M14 68Q79-15 146 68H14Z', rust) +
  path('M79 25q-31 6-38 43M79 25q31 7 39 43M80 24v-9M80 68v64q0 27-23 24q-18-4-14-18')
const camera = () =>
  rect(13, 41, 139, 101, ink, 13) +
  path('M49 41l9-19h48l10 19', paper) +
  circle(86, 91, 38, paper) +
  circle(86, 91, 26, blue) +
  circle(86, 91, 12, ink) +
  circle(77, 82, 5, paper) +
  rect(23, 53, 22, 11, gold, 3) +
  path('M132 33h12v8')
const icons = {
  coffee: coffee(),
  book: book(),
  phone: phone(),
  laptop: laptop(),
  tablet:
    rect(9, 25, 146, 112, ink, 12) +
    rect(22, 34, 114, 94, paper, 4) +
    circle(145, 82, 3, paper) +
    rect(33, 45, 92, 60, sage, 2) +
    path('M45 115h58M67 61l24 15-24 15Z', blue),
  document: document(),
  letter: rect(15, 38, 139, 95, paper, 5) + path('M16 40l68 49 69-49M16 132l46-43M153 132l-45-43'),
  email:
    rect(15, 38, 139, 95, paper, 5) +
    path('M16 40l68 49 69-49') +
    circle(133, 32, 19, rust) +
    text(126, 39, '1', 21, 'fill="#F8F5EF"'),
  ticket: ticket(),
  car: car(),
  bike: bike(),
  house: house(),
  clock: clock(),
  calendar: calendar(),
  suitcase: suitcase(),
  bed: bed(),
  box: box(),
  package: box(),
  medicine: medicine(),
  body: body(),
  tooth: tooth(),
  plate: plate(),
  umbrella: umbrella(),
  camera: camera(),
  plant: plant(),
  pot:
    path('M27 63h111l-15 82H43Z', sand) +
    path('M19 53h127v20H19Z', paper) +
    path('M43 80l9 55M66 80v56M102 80v56M126 80l-9 55'),
  milk:
    path('M42 47l24-27h52l14 27v105H42Z', paper) +
    path('M42 47h90M66 20v27M103 21v26') +
    rect(52, 76, 70, 47, sage, 0) +
    path('M83 82q-30 30 0 35q29-5 0-35Z', paper),
  water:
    path('M50 20h65l-8 125H59Z', paper) +
    path('M53 64q28 12 59 0l-6 79H59Z', blue, 'opacity=".45"') +
    path('M61 28h43M77 93l-4 9M97 103l-4 8'),
  bottle:
    rect(53, 37, 61, 117, blue, 13) +
    path('M63 37V15h39v22', paper) +
    rect(65, 5, 35, 13, ink, 4) +
    rect(60, 76, 47, 46, paper, 2),
  gift:
    rect(20, 62, 125, 85, rose, 4) +
    rect(14, 49, 138, 23, gold, 4) +
    path('M72 50v98h22V50', rust) +
    path('M81 49q-58-5-43-29q12-17 43 29q31-46 43-29q15 24-43 29Z', rust),
  receipt:
    path('M37 12h91v140l-12-8-12 8-12-8-12 8-12-8-12 8-19-8Z', paper) +
    path('M54 33h56M54 50h32M104 50h10M54 65h37M106 65h8M54 84h61M54 110h27M100 110h14'),
  card:
    rect(12, 34, 143, 99, gold, 11) +
    rect(13, 55, 141, 21, ink, 0) +
    rect(26, 87, 25, 18, sand, 3) +
    path('M65 93h29M112 93h27M26 118h41'),
  'name-tag':
    path('M66 35Q54-2 83 5q27-8 19 30') +
    rect(16, 35, 134, 117, paper, 11) +
    rect(16, 35, 134, 30, rust, 11) +
    path('M34 83h98M34 105h71M34 128h44') +
    rect(68, 41, 30, 5, paper, 2),
  sun:
    circle(80, 81, 36, gold) +
    [0, 45, 90, 135, 180, 225, 270, 315]
      .map((a) => `<g transform="rotate(${a} 80 81)">${path('M80 17v16')}</g>`)
      .join(''),
  cloud: path(
    'M36 116q-34-10-23-37q7-16 28-15q3-31 35-36q37-5 50 32q30-2 34 27q4 28-26 29Z',
    paper,
  ),
  rain:
    path('M31 95q-28-8-19-31q7-13 24-12q3-26 30-29q31-4 42 27q27-1 30 23q4 22-23 22Z', paper) +
    path(
      'M35 114l-7 17M64 112l-9 23M94 114l-7 17M123 112l-9 23',
      'none',
      `stroke="${blue}" stroke-width="5"`,
    ),
  wind: path('M15 65h91q35 0 29-27q-7-25-27-9M15 88h131M15 111h69q29 0 27 22q-6 22-24 9'),
  knife:
    rect(14, 108, 139, 37, sand, 6) +
    path('M33 50l68 39-11 15q-43-13-61-43Z', paper) +
    path('M102 88l38 22-8 15-41-21Z', ink) +
    circle(52, 117, 14, rust) +
    circle(82, 129, 10, rust) +
    path('M58 111l-5 20'),
  whisk:
    rect(28, 110, 107, 32, paper, 4) +
    path(
      'M34 110q49-12 94 0M40 91l14-39q14-16 30-5q18 8 7 25L63 102q-17 9-23-11ZM49 93l17-40M61 93l15-39M88 56l29-37',
      'none',
      `stroke="${blue}" stroke-width="3"`,
    ),
  pan:
    `<ellipse cx="68" cy="95" rx="54" ry="40" fill="${ink}"/><ellipse cx="68" cy="94" rx="44" ry="31" fill="${paper}"/>` +
    path('M112 72l34-39 13 12-37 40Z', sand) +
    circle(65, 89, 17, gold, 'stroke="none"') +
    path('M38 112q19-12 39 3', green),
  sink:
    rect(15, 83, 137, 65, paper, 5) +
    rect(28, 92, 109, 42, sage, 9) +
    path('M42 84V39q1-27 34-27q35 2 33 36v17H96V48q2-22-20-22q-19-1-19 13v45') +
    circle(83, 112, 5, ink) +
    path('M106 70v12', 'none', `stroke="${blue}" stroke-width="4"`),
  cart:
    path('M13 22h19l19 91h85l17-62H39', paper) +
    path('M60 51l7 49M87 51v49M115 51l-7 49M46 79h95M52 113l-3 15h83') +
    circle(65, 142, 10, ink) +
    circle(123, 142, 10, ink),
  strawberry:
    path('M32 65q6-31 47-17q43-16 52 17q0 34-48 81q-51-35-51-81Z', rust) +
    path('M77 47l-26-25 30 9 20-18-6 26 22 6-31 14Z', green) +
    path(
      'M52 75l3 5M80 72l3 5M109 74l3 5M62 98l3 5M96 99l3 5M80 123l3 5',
      'none',
      `stroke="${gold}"`,
    ),
  lamp:
    path('M41 18h80l25 64H17Z', gold) +
    path('M82 84v58M53 143h61') +
    `<ellipse cx="82" cy="146" rx="36" ry="7" fill="${sand}"/>` +
    path('M106 84v28') +
    circle(106, 116, 4, sand),
  hammer:
    path('M55 39l22 12-37 96-21-10Z', sand) +
    path('M29 17h65l28 24-16 17-29-18H29Z', ink) +
    path('M20 131l20 9'),
  paint:
    rect(27, 47, 84, 98, paper, 6) +
    path('M27 57h84M25 61q-36-51 43-50q70 0 45 49') +
    rect(36, 83, 65, 36, green, 1) +
    path('M134 48v88M122 10h25v42h-25Z', sand) +
    path('M122 10v16h25', rust),
  jacket:
    path('M56 20l25 15 26-15 28 18 20 59-23 10-16-37v76H46V70l-16 37-23-10 20-59Z', blue) +
    path('M55 20l-9 30 23 13 12-28 14 28 23-13-11-30', paper) +
    path('M81 37v105M52 108h18M95 108h16'),
  shoe:
    path('M16 62h45l12 37 36 7 35 19q12 8 6 21H14Z', paper) +
    path('M16 135h133M74 110l17-14M88 116l17-14M102 122l17-14M17 99h40', blue) +
    path('M22 72h30v19H22Z', gold),
  scissors:
    circle(42, 121, 23, 'none') +
    circle(116, 121, 23, 'none') +
    path('M57 103L111 20l10 2-29 85M101 103L48 20l-10 2 30 85', paper) +
    circle(80, 82, 6, sand),
  guitar:
    path(
      'M81 69q-34-24-43 1q-6 14 8 23q-35 24-19 48q24 34 59 8q31-23 10-49q-13-7-4-25L119 24l-14-8Z',
      sand,
    ) +
    circle(68, 112, 15, ink) +
    path('M58 134L114 30M53 136L109 27M91 135h-42M109 13l13 7-3 19-19-10Z', paper),
  game:
    rect(11, 23, 140, 129, paper, 6) +
    [0, 1, 2, 3]
      .map((x) =>
        [0, 1, 2, 3]
          .map((y) =>
            rect(19 + x * 32, 31 + y * 28, 32, 28, (x + y) % 2 ? gold : sage, 0, 'stroke="none"'),
          )
          .join(''),
      )
      .join('') +
    circle(66, 69, 11, rust) +
    circle(95, 125, 11, blue) +
    rect(110, 47, 32, 32, paper, 5) +
    circle(120, 56, 2, ink) +
    circle(133, 70, 2, ink),
  basketball:
    circle(80, 82, 63, sand) + path('M17 82h126M80 19v126M35 38q71 15 80 88M35 126q71-15 80-88'),
  tennis:
    circle(43, 116, 27, green) +
    path('M22 96q15 10 15 42M61 98q-15 14-11 44', 'none', `stroke="${paper}"`) +
    `<ellipse cx="103" cy="53" rx="34" ry="44" fill="${paper}"/>` +
    path('M102 15v78M84 21v65M121 22v63M74 38h59M69 57h68M75 74h57M94 96l-6 58h21l-4-58', sand),
  dumbbell:
    rect(13, 51, 25, 58, ink, 4) +
    rect(38, 37, 22, 86, blue, 3) +
    rect(101, 37, 22, 86, blue, 3) +
    rect(123, 51, 25, 58, ink, 4) +
    rect(60, 72, 41, 16, sand, 0),
  tent:
    path('M17 135L80 26l65 109H17Z', sand) +
    path('M82 28l-11 107h57L82 28Z', paper) +
    path('M81 87l-1 47h26Z', ink) +
    path('M18 134l-9 16M145 134l10 16M12 151h20M140 151h19'),
  stage:
    rect(12, 22, 143, 117, ink, 0) +
    path('M12 22h71L57 93 12 116ZM155 22H83l25 71 47 23Z', rust) +
    rect(10, 133, 147, 14, sand, 1) +
    path('M28 37l14 46M138 37l-13 46') +
    circle(81, 68, 11, paper) +
    path('M81 79v38M70 90h23M82 113l-12 19M82 113l12 19', 'none', `stroke="${paper}"`),
  headphones:
    path('M24 95V78q0-61 57-61q60 0 60 62v22') +
    path('M36 60q5-30 45-30q41 0 46 31', 'none', `stroke="${sand}" stroke-width="8"`) +
    rect(20, 76, 28, 61, blue, 12) +
    rect(114, 76, 28, 61, blue, 12),
  wifi:
    path(
      'M14 51q66-56 135 0M34 77q47-37 94 0M57 99q23-17 47 0',
      'none',
      `stroke="${blue}" stroke-width="10"`,
    ) + circle(81, 123, 9, ink),
  cable:
    rect(20, 26, 26, 45, ink, 3) +
    path('M23 26V13h20v13', paper) +
    path('M34 73v49q0 36 43 27q18-4 18-26V55q0-31 34-30') +
    rect(128, 15, 27, 32, green, 3) +
    path('M131 14V4h20v10', paper),
  message:
    rect(15, 24, 136, 91, sage, 16) +
    path('M33 112v24l34-21', sage) +
    path('M35 49h94M35 69h70M35 89h49'),
  photo:
    rect(14, 23, 140, 123, paper, 8) +
    rect(24, 33, 120, 94, gold, 1) +
    path('M25 124l34-47 23 21 23-30 38 56Z', green) +
    circle(51, 55, 12, paper) +
    path('M62 138h41'),
  folder:
    path('M12 34h57l16 17h67v91H12Z', sand) +
    path('M12 59h140v83H12Z', gold) +
    path('M31 83h51M31 100h87'),
  cap:
    path('M10 52l72-35 72 35-72 35Z', ink) +
    path('M42 69v34q40 26 78 0V69', green) +
    path('M148 52v57') +
    path('M143 107h10l5 24h-20Z', sand),
  tv:
    rect(10, 25, 145, 99, ink, 9) +
    rect(18, 33, 129, 82, sage, 2) +
    path('M59 143h49M82 125v18') +
    path('M65 58l37 18-37 20Z', paper),
  sofa:
    rect(18, 44, 126, 62, green, 16) +
    rect(10, 85, 145, 60, green, 8) +
    rect(18, 95, 61, 33, sage, 6) +
    rect(83, 95, 61, 33, sage, 6) +
    path('M26 144v12M136 144v12'),
  laundry:
    rect(24, 17, 116, 135, paper, 7) +
    rect(24, 17, 116, 30, sage, 7) +
    circle(83, 94, 39, ink) +
    circle(83, 94, 31, blue) +
    path('M57 94q19-18 31 4q9 18 21-2', paper) +
    circle(114, 33, 5, rust) +
    path('M39 32h28'),
  key:
    circle(49, 48, 30, gold) +
    circle(49, 48, 11, paper) +
    path('M69 69l77 76-16 15-15-15 10-10-16-16-11 11-14-15 10-9-34-28Z', sand),
  bus:
    rect(17, 36, 136, 97, gold, 10) +
    rect(28, 45, 37, 41, sage, 2) +
    rect(71, 45, 32, 41, sage, 2) +
    rect(110, 45, 31, 71, sage, 2) +
    path('M27 99h73M127 87v29') +
    circle(46, 133, 16, ink) +
    circle(124, 133, 16, ink) +
    circle(46, 133, 6, paper) +
    circle(124, 133, 6, paper),
  train:
    rect(38, 13, 87, 128, paper, 17) +
    rect(48, 25, 67, 40, blue, 6) +
    path('M49 91h66M52 142l-14 15M111 142l14 15M29 152h106') +
    circle(56, 116, 9, gold) +
    circle(107, 116, 9, gold) +
    path('M58 76h45'),
  plane:
    path(
      'M80 12q-9 0-11 17v34L12 107v14l58-17v32l-15 16h51l-15-16v-32l58 17v-14L91 63V29q-2-17-11-17Z',
      paper,
    ) + path('M69 42h22M75 17v20M84 17v20M20 119l50-8M140 119l-49-8', blue),
  passport:
    rect(30, 13, 105, 139, blue, 8) +
    circle(82, 80, 32, paper) +
    path('M50 80h64M82 48v64M73 51q-20 29 0 58M93 51q20 29 0 58') +
    path('M50 32h62M57 135h48', 'none', `stroke="${paper}"`),
  hotel:
    rect(22, 13, 121, 138, paper, 2) +
    rect(69, 116, 29, 35, sage, 0) +
    [39, 73, 107]
      .map((x) => [34, 64, 94].map((y) => rect(x, y, 19, 17, gold, 1)).join(''))
      .join('') +
    path('M83 118v32'),
  flashlight:
    path('M18 110l74-73 22 22-73 74Z', blue) +
    path('M80 43l14-22 39 39-24 13Z', sand) +
    path('M105 10l30-3 22 24-4 29Z', gold, 'stroke="none"') +
    path('M37 112l10 10'),
  map:
    path('M10 39l43-21 58 19 45-21v112l-45 23-58-19-43 20Z', paper) +
    path('M53 18v114M111 37v114') +
    path('M20 87l32-29 28 56 29-38 34 14', 'none', `stroke="${blue}" stroke-dasharray="6 6"`) +
    circle(80, 80, 17, rust) +
    path('M80 105l-11-20h22Z', rust) +
    circle(80, 79, 5, paper),
  directions: path(
    'M80 151V20M56 45l24-26 24 26M14 89h136M39 64L14 89l25 25M125 64l25 25-25 25',
    'none',
    `stroke="${blue}" stroke-width="8"`,
  ),
  thermometer:
    path('M68 20q0-20 21-9q9 5 9 16v78q23 19 12 41q-16 22-42 9q-21-15-6-43l6-7Z', paper) +
    path('M82 42v78', 'none', `stroke="${rust}" stroke-width="7"`) +
    circle(83, 133, 14, rust) +
    path('M97 44h9M97 65h9M97 86h9'),
  profile:
    circle(82, 80, 64, sage) +
    circle(82, 61, 22, '#D79773') +
    path('M41 124q0-42 41-42q42 0 42 42', blue) +
    path('M60 56q-5-30 23-26q26 4 19 26q-30-1-27-13Z', ink),
  bookmark:
    path('M42 15h82v137l-41-27-41 27Z', rust) +
    path('M57 33h51M57 48h37', 'none', `stroke="${paper}"`),
  menu:
    rect(26, 16, 117, 135, paper, 5) +
    text(49, 41, 'MENU', 18) +
    path('M43 60h66M43 80h46M119 80h8M43 99h60M119 99h8M43 119h50M119 119h8'),
  chart:
    rect(14, 21, 137, 111, paper, 2) +
    path('M31 112V68h19v44M68 112V52h19v60M106 112V37h19v75', green) +
    path('M34 143h99M83 133v10'),
}
icons.cat =
  path(
    'M37 49L29 14l36 22q20-10 39 0l34-22-9 38q24 24 4 49q-27 28-61 10q-35-6-42-28q-7-20 7-34Z',
    sand,
  ) +
  path('M43 64h10M108 64h10M75 77l11 1-5 8Z', ink) +
  path('M81 85v13M81 97l-9 5M81 97l11 3M17 81l31 6M117 85l31-6') +
  path('M61 112q-37 31-8 42h64q37-22 28-55M119 149q32 0 34-26')
icons.dog =
  path('M43 47q-13-28-33-13L24 99q16 10 29-26M113 47q13-28 33-13l-14 65q-16 10-29-26', sand) +
  path('M43 46q37-25 73 0l11 59q-41 33-93 0Z', paper) +
  path('M52 65h8M99 65h8M73 79h18l-9 12Z', ink) +
  path('M81 90v12M68 100q13 18 28 0') +
  path('M41 110l-8 43h100l-13-44', blue)
icons.beach =
  path('M11 128q33-14 62 0q32 13 82-1v27H11Z', sand) +
  path(
    'M10 96q22-14 44 0q23 15 44 0q25-13 58 0M10 111q22-14 44 0q23 15 44 0q25-13 58 0',
    'none',
    `stroke="${blue}"`,
  ) +
  circle(32, 32, 16, gold) +
  group(umbrella(), 51, -4, 0.68)
icons.kitchen =
  group(icons.sink, 0, 8, 0.72) + group(icons.pan, 72, 24, 0.55) + path('M8 152h146M118 142v11')
icons['medium-jacket'] = icons.jacket + text(71, 117, 'M', 18, 'fill="#F8F5EF"')

export const objectNames = new Set(Object.keys(icons))
const abstractThemes = new Set([
  'friend',
  'coworker',
  'family',
  'greeting',
  'listening',
  'support',
  'choice',
  'agreement',
  'discussion',
  'invitation',
  'thanks',
  'apology',
  'goodbye',
  'arrangement',
  'date',
  'sports',
  'clothes',
  'salon',
  'bank',
  'reception',
  'school',
  'clinic',
  'pharmacy',
  'museum',
  'service-call',
  'chat',
])
export function objectSvg(name) {
  if (abstractThemes.has(name)) {
    const family = name === 'family',
      settings =
        name === 'coworker'
          ? 'office'
          : name === 'salon'
            ? 'salon'
            : name === 'bank'
              ? 'bank'
              : name === 'school'
                ? 'school'
                : name === 'clinic'
                  ? 'clinic'
                  : name === 'museum'
                    ? 'museum'
                    : name === 'service-call'
                      ? 'phone'
                      : name
    return sceneSvg(
      settings,
      family
        ? ['Rae', 'Sam', 'Noah']
        : name === 'pharmacy'
          ? ['Customer', 'Pharmacist']
          : name === 'school'
            ? ['Teacher', 'Student']
            : ['Maya', 'Eli'],
      '',
      name,
    )
  }
  if (!icons[name]) throw new Error(`Missing object illustration: ${name}`)
  return svg(
    360,
    220,
    `<rect x="10" y="16" width="340" height="188" rx="${hashName(name) % 2 ? 70 : 38}" fill="${[rose, sage, gold][hashName(name) % 3]}" stroke="none"/>` +
      group(icons[name], 83, 20, 1.25),
    name,
  )
}
const item = (name, x, y, s = 1) => group(icons[name], x, y, s)
const shelf = (x, y, objects) =>
  path(`M${x} ${y + 58}h154`, sand, 'stroke-width="5"') +
  objects.map((name, i) => item(name, x + i * 52, y, 0.34)).join('')
const window = () =>
  path('M359 144V68a52 52 0 0 1 104 0v76Z', paper, 'stroke="none"') +
  path('M411 18v126M359 89h104', 'none', 'opacity=".16"')
const backdrop = (theme) => {
  const home = [
    'meeting',
    'introducing',
    'social',
    'family-chat',
    'greeting',
    'goodbye',
    'date',
    'thanks',
    'support',
    'apology',
    'discussion',
    'choice',
    'invitation',
    'celebration',
    'neighbors',
    'hobby-chat',
    'listening',
  ].includes(theme)
  let body =
    rect(
      0,
      0,
      560,
      280,
      ['apology', 'support', 'counseling', 'clinic', 'hospital', 'emergency'].includes(theme)
        ? sage
        : home
          ? gold
          : sage,
      22,
      'stroke="none"',
    ) + path('M28 243h504', 'none', 'opacity=".18"')
  if (home)
    body += window() + shelf(25, 42, ['book', 'book', 'plant']) + item('plant', 473, 148, 0.62)
  const objectMap = {
    cafe: ['coffee', 'milk', 'menu'],
    delivery: ['package', 'receipt', 'phone'],
    bar: ['bottle', 'water', 'menu'],
    restaurant: ['plate', 'menu', 'coffee'],
    kitchen: ['whisk', 'knife', 'pan'],
    'food-vocabulary': ['coffee', 'whisk', 'pan'],
    'hobbies-vocabulary': ['camera', 'guitar', 'game'],
    calendar: ['calendar', 'clock', 'cloud'],
    arrangement: ['calendar', 'clock', 'phone'],
    weather: ['sun', 'cloud', 'rain'],
    cinema: ['ticket', 'tv', 'clock'],
    theater: ['ticket', 'stage', 'clock'],
    festival: ['stage', 'ticket', 'tent'],
    gym: ['dumbbell', 'bike', 'bottle'],
    sports: ['basketball', 'tennis', 'ticket'],
    stadium: ['basketball', 'ticket', 'calendar'],
    shops: ['cart', 'letter', 'card'],
    market: ['strawberry', 'cart', 'lamp'],
    supermarket: ['milk', 'cart', 'receipt'],
    garden: ['plant', 'pot', 'water'],
    hardware: ['hammer', 'paint', 'house'],
    clothes: ['jacket', 'shoe', 'name-tag'],
    returns: ['jacket', 'receipt', 'card'],
    salon: ['scissors', 'calendar', 'phone'],
    post: ['package', 'letter', 'receipt'],
    bank: ['card', 'receipt', 'document'],
    library: ['book', 'card', 'tablet'],
    'work-vocabulary': ['document', 'laptop', 'cap'],
    school: ['book', 'document', 'cap'],
    college: ['cap', 'book', 'calendar'],
    'job-search': ['document', 'calendar', 'laptop'],
    application: ['document', 'letter', 'laptop'],
    interview: ['document', 'clock', 'book'],
    office: ['laptop', 'document', 'plant'],
    workplace: ['laptop', 'calendar', 'receipt'],
    presentation: ['chart', 'folder', 'document'],
    'work-meeting': ['document', 'calendar', 'laptop'],
    video: ['laptop', 'headphones', 'clock'],
    'home-vocabulary': ['bed', 'sofa', 'laundry'],
    housing: ['house', 'key', 'document'],
    moving: ['box', 'box', 'key'],
    chores: ['laundry', 'sink', 'calendar'],
    renovation: ['paint', 'hammer', 'house'],
    pets: ['cat', 'dog', 'document'],
    'home-problem': ['sink', 'phone', 'water'],
    'living-room': ['tv', 'game', 'tablet'],
    'transport-vocabulary': ['bus', 'train', 'plane'],
    'bus-stop': ['bus', 'map', 'ticket'],
    station: ['train', 'ticket', 'clock'],
    airport: ['plane', 'suitcase', 'ticket'],
    'bike-shop': ['bike', 'hammer', 'bottle'],
    taxi: ['car', 'map', 'phone'],
    garage: ['car', 'hammer', 'receipt'],
    'travel-vocabulary': ['suitcase', 'passport', 'tent'],
    'travel-desk': ['hotel', 'plane', 'document'],
    hotel: ['key', 'bed', 'clock'],
    museum: ['photo', 'ticket', 'map'],
    camping: ['tent', 'flashlight', 'bottle'],
    beach: ['beach', 'umbrella', 'water'],
    directions: ['map', 'house', 'bus'],
    'travel-problem': ['suitcase', 'plane', 'document'],
    'health-vocabulary': ['body', 'thermometer', 'medicine'],
    pharmacy: ['medicine', 'document', 'thermometer'],
    'health-booking': ['phone', 'calendar', 'clock'],
    clinic: ['thermometer', 'body', 'document'],
    emergency: ['phone', 'map', 'body'],
    hospital: ['bed', 'document', 'medicine'],
    dentist: ['tooth', 'document', 'clock'],
    counseling: ['plant', 'phone', 'book'],
    'media-vocabulary': ['headphones', 'wifi', 'message'],
    'service-call': ['phone', 'document', 'email'],
    phone: ['phone', 'clock', 'cable'],
    internet: ['wifi', 'laptop', 'document'],
    'tech-support': ['laptop', 'headphones', 'message'],
    email: ['email', 'document', 'laptop'],
    chat: ['message', 'phone', 'tablet'],
    'social-media': ['photo', 'phone', 'message'],
    bookshop: ['book', 'book', 'tablet'],
  }
  const objects = objectMap[theme]
  if (objects) {
    if (['station', 'airport', 'bus-stop', 'taxi', 'garage'].includes(theme)) {
      body += item(objects[0], 280, 93, 1.45) + shelf(28, 26, objects.slice(1))
    } else if (['garden', 'camping', 'beach', 'pets'].includes(theme)) {
      body +=
        item(objects[0], 335, 87, 1.1) +
        item(objects[1], 465, 165, 0.55) +
        item(objects[2], 45, 39, 0.5)
    } else {
      body += shelf(339, 23, objects) + item(objects[0], 24, 19, 0.55)
    }
  }
  return body
}
export function sceneSvg(theme, people, id, label = '') {
  const names = [...new Set(people)]
  if (names.length > 4)
    throw new Error('A scene needs an explicit layout for more than four people')
  let body = backdrop(theme)
  const serious = [
    'apology',
    'support',
    'counseling',
    'clinic',
    'hospital',
    'emergency',
    'home-problem',
    'travel-problem',
  ].includes(theme)
  const transport = [
    'station',
    'airport',
    'bus-stop',
    'taxi',
    'garage',
    'garden',
    'camping',
    'beach',
    'pets',
  ].includes(theme)
  const positions =
    names.length === 4
      ? [25, 158, 290, 423]
      : names.length === 3
        ? [65, 225, 380]
        : transport
          ? [62, 197]
          : [88, 292]
  names.forEach((name, index) => {
    const child = theme === 'school' && name === 'Student'
    body += person(
      name,
      positions[index],
      child ? 101 : names.length === 4 ? 54 : 42,
      child ? 0.58 : names.length === 4 ? 0.78 : 0.84,
      index === 0 && !serious,
      id,
      serious ? 'neutral' : 'warm',
    )
  })
  if (
    [
      'cafe',
      'bar',
      'restaurant',
      'delivery',
      'post',
      'bank',
      'reception',
      'pharmacy',
      'library',
      'interview',
      'office',
      'workplace',
      'college',
      'school',
      'hotel',
      'application',
      'job-search',
      'hardware',
      'returns',
      'supermarket',
      'clothes',
      'bookshop',
    ].includes(theme)
  ) {
    body += rect(237, 173, 254, 13, sand, 1) + path('M256 187v53M471 187v53')
    const prop = {
      cafe: 'coffee',
      bar: 'bottle',
      restaurant: 'menu',
      delivery: 'package',
      post: 'package',
      bank: 'document',
      reception: 'document',
      pharmacy: 'medicine',
      library: 'book',
      interview: 'document',
      office: 'laptop',
      workplace: 'laptop',
      college: 'book',
      school: 'book',
      hotel: 'key',
      application: 'document',
      'job-search': 'document',
      hardware: 'hammer',
      returns: 'jacket',
      supermarket: 'milk',
      clothes: 'jacket',
      bookshop: 'book',
    }[theme]
    body += item(prop, 330, 113, 0.39)
  } else if (
    [
      'meeting',
      'introducing',
      'social',
      'date',
      'thanks',
      'listening',
      'family-chat',
      'hobby-chat',
      'choice',
      'discussion',
      'invitation',
      'arrangement',
    ].includes(theme)
  ) {
    body +=
      `<ellipse cx="267" cy="199" rx="45" ry="8" fill="${paper}"/>` +
      path('M233 205v34M301 205v34') +
      item(
        theme === 'thanks' ? 'gift' : theme === 'hobby-chat' ? 'camera' : 'coffee',
        247,
        156,
        0.28,
      )
  }
  return svg(560, 280, body, label)
}
