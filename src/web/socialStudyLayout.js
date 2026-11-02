import sectionArt from './studySectionArt.json' with { type: 'json' }

// Presentation decisions only. Source wording, phrase IDs, and practice data stay
// in the compiled course so both explanation languages use the same structure.
export const vocabularyChapters = new Set(['20', '26', '34', '45', '56', '65', '72', '80', '88'])

export const usesSharedStudyLayout = (id) => Number(id) >= 13 && Number(id) <= 96 && id !== '14'

export const normalizeStudyText = (value = '') => value
  .normalize('NFKC')
  .replace(/[‘’]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/[.:;]+$/, '')
  .toLowerCase()

export function studyPhraseAnchors(sections) {
  const owners = {}
  for (const section of sections) {
    for (const block of section.blocks) {
      if (block.type !== 'source') continue
      for (const id of block.source.phraseIds ?? []) owners[id] ??= block.id
    }
  }
  return owners
}

export function studyExpressions(section, byId) {
  if (section.blocks.some((block) => block.source?.presentation === 'occasion-response')) return []
  const tableIds = new Set(section.blocks.flatMap((block) =>
    block.type === 'source' && block.source.type === 'table' ? (block.source.phraseIds ?? []).filter((id) => {
      const target = normalizeStudyText(byId[id]?.en)
      return target && block.source.rows.some((row) => row.some((cell) => normalizeStudyText(cell.map((run) => run.text).join('')).includes(target)))
    }) : []))
  const ids = section.blocks.flatMap((block) => block.type === 'source' ? block.source.phraseIds ?? [] : [])
  return [...new Set(ids)].map((id) => byId[id]).filter((item) =>
    item && item.kind !== 'word' && !tableIds.has(item.id) && !/-line\d+$/.test(item.id))
}

export function isStudyIntroduction(section) {
  return /-study-0$/.test(section.id) && section.blocks.length === 1 &&
    section.blocks[0].type === 'source' && section.blocks[0].source.type === 'explanation' &&
    !section.blocks[0].source.teachingNote &&
    !(section.blocks[0].source.phraseIds?.length)
}

export const studyIllustrations = {
  ...sectionArt,
  '20-study-0': { file: 'study-drinks.webp', width: 960, height: 341, en: 'Black coffee, a latte, iced tea, and a reusable cup', ja: 'ブラックコーヒー、ラテ、アイスティー、繰り返し使えるカップ' },
  '20-study-1': { file: 'study-kitchen.webp', width: 960, height: 550, en: 'A knife and cutting board, a whisk and bowl, a colander, and a saucepan', ja: '包丁とまな板、泡立て器とボウル、ざる、片手鍋' },
  '26-study-0': { file: 'study-hobbies.webp', width: 960, height: 513, en: 'A camera, a plant pot and paintbrushes, a yoga mat, and a chessboard', ja: 'カメラ、植木鉢と絵筆、ヨガマット、チェス盤' },
  '34-study-0': { file: 'study-shops.webp', width: 960, height: 388, en: 'A bakery, a florist, and a hardware store', ja: 'パン屋、花屋、金物店' },
  '45-study-1': { file: 'study-work.webp', width: 960, height: 1325, en: 'A mechanic with a wrench and a teacher holding a book', ja: 'レンチを持つ整備士と、本を持つ教師' },
  '56-study-2': { file: 'study-home.webp', width: 960, height: 769, en: 'A cutaway home with a bedroom, a kitchen, and a living room', ja: '寝室、キッチン、リビングが見える家の断面図' },
  '65-study-1': { file: 'study-transport.webp', width: 960, height: 259, en: 'A bus, a train, a bicycle, and a taxi', ja: 'バス、電車、自転車、タクシー' },
  '72-study-2': { file: 'study-travel.webp', width: 960, height: 655, en: 'A suitcase, a passport, a map, and sunscreen', ja: 'スーツケース、パスポート、地図、日焼け止め' },
  '80-study-3': { file: 'study-health.webp', width: 960, height: 633, en: 'Bandages, a thermometer, and a stethoscope', ja: '包帯、絆創膏、体温計、聴診器' },
  '88-study-2': { file: 'study-devices.webp', width: 960, height: 471, en: 'A laptop, a phone, a Wi-Fi router, and a charging cable', ja: 'ノートパソコン、スマートフォン、Wi-Fiルーター、充電ケーブル' },
}
