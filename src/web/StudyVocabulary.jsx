import { useLanguage } from './Language'
import Glyph from './Glyph'
import { approvedAudio } from './components'
import objects from './studyObjectArt.json'
import { normalizeStudyText } from './socialStudyLayout'

const aliases = {
  'cell phone': 'phone', 'smartphone': 'phone', 'phone / cell phone / smartphone': 'phone',
  'desktop computer': 'desktop', 'computer': 'desktop', 'wi-fi': 'wifi',
  'make a video call': 'video', 'video call': 'video', 'email': 'envelope', 'text': 'chat',
  'call': 'phone', 'post': 'post', 'keyboard': 'keyboard', 'headphones': 'headset',
  'saucepan': 'pot', 'frying pan': 'pan', 'cutting board': 'board', 'board game': 'game',
  'painting': 'brush', 'gardening': 'plant', 'knitting': 'yarn', 'photography': 'camera',
  'playing the guitar': 'guitar', 'swimming': 'swim', 'weight training': 'weight',
  'biking': 'bike', 'cycling': 'bike', 'camping': 'tent', 'black coffee': 'coffee', 'reusable cup': 'cup',
  'movie': 'film', 'movie theater': 'film', 'concert': 'guitar', 'theater': 'stage',
  'bookstore': 'books', 'florist': 'flowers', 'supermarket': 'cart', 'bank': 'bank',
  'credit card': 'card', 'cash machine / atm': 'atm', 'price tag': 'price',
  'refrigerator': 'fridge', 'refrigerator, often fridge': 'fridge', 'fridge': 'fridge',
  'apartment': 'building', 'house': 'home',
  'front door': 'door', 'bookshelf': 'shelf', 'dining table': 'table', 'armchair': 'chair',
  'airplane': 'plane', 'bicycle': 'bike', 'a bus': 'bus',
  'passport': 'passport', 'boarding pass': 'ticket', 'one-way ticket': 'ticket',
  'departure board': 'timetable', 'bus stop': 'sign', 'train station': 'platform',
  'bandage': 'bandage', 'medication': 'pill',
  'newspaper': 'newspaper', 'book': 'book', 'attachment': 'attachment',
}
// Only exact, reviewed word-to-picture matches appear in the atlas. Unpictured
// vocabulary stays in the complete reference table beneath it.
export function vocabularyPictures(section, byId) {
  const seen = new Set()
  const byText = new Map(Object.values(byId).map((item) => [normalizeStudyText(item.en), item]))
  return section.blocks.flatMap((block) => block.source?.type === 'table' ? block.source.rows : [])
    .flatMap((row) => {
      const en = row[0].map((run) => run.text).join('').trim()
      const normalized = normalizeStudyText(en)
      const key = aliases[normalized] ?? normalized
      // Semicolons and slashes sometimes group several independently named
      // objects in one source row. Give those pictures their own exact label.
      const candidates = objects[key] ? [en] : en.split(/\s*[;/]\s*/)
      return candidates.flatMap((label) => {
        const normalizedLabel = normalizeStudyText(label)
        const object = section.id.startsWith('88-') && normalizedLabel === 'menu'
          ? 'appmenu' : aliases[normalizedLabel] ?? normalizedLabel
        if (!objects[object] || seen.has(object)) return []
        seen.add(object)
        return [{ en: label, item: byText.get(normalizedLabel), file: objects[object] }]
      })
    }).slice(0, 12)
}

export default function StudyVocabulary({ pictures, audioProps }) {
  const { language, t } = useLanguage()
  return <ul className="ar-study-word-atlas" aria-label={language === 'ja' ? '絵で見る語彙' : 'Picture vocabulary'}>
    {pictures.map(({ en, item, file }) => <li key={en}>
      <img src={`${import.meta.env.BASE_URL}assets/course/${file}`} alt="" aria-hidden="true" width="180" height="150" loading="lazy" />
      <div className="ar-study-word-label"><strong lang="en">{en}</strong>
        {item && approvedAudio[item.id] && <button className="ar-study-inline-audio" type="button"
          onClick={() => audioProps.onPlay(item.id)} aria-label={t('Listen to: {phrase}', { phrase: en })}>
          <Glyph name={audioProps.activeId === item.id && audioProps.audio.playing ? 'pause' : 'speaker'} size={14} />
        </button>}
      </div>
      {language === 'ja' && item?.ja && <small lang="ja">{item.ja}</small>}
    </li>)}
  </ul>
}
