import { useLanguage } from './Language'

// Freely reusable CC0 PNG artwork by Pablo Stanley, Open Doodles.
// Source and license: https://www.opendoodles.com/about
// Assets are referenced from the creator's public PNG download URLs.
// Do not mix these editorial pictures with Artico's interface icon system.
const base = 'https://opendoodles.s3-us-west-1.amazonaws.com/'
export const orientationFigures = {
  'orientation-people': {
    image: 'reading.png', side: 'right', afterJa: 1, afterEn: 1,
    altJa: '座って本を読んでいる人のイラスト',
    altEn: 'A person reading a book',
  },
  'orientation-another-language': {
    image: 'strolling.png', side: 'left', afterJa: 2, afterEn: 2,
    altJa: '歩いている人のイラスト',
    altEn: 'A person walking forward',
  },
  'how-start-line': {
    image: 'sitting-reading.png', side: 'right', afterJa: 0, afterEn: 0,
    altJa: '本を読みながら学ぶ人のイラスト',
    altEn: 'A learner reading a book',
  },
  'how-chapter-loop': {
    image: 'coffee.png', side: 'left', afterJa: 0, afterEn: 0,
    altJa: 'コーヒーカップを持つ人のイラスト',
    altEn: 'A person holding a large coffee cup',
  },
  'how-audio': {
    image: 'dancing.png', side: 'right', afterJa: 1, afterEn: 1,
    altJa: '音楽を聞いている人のイラスト',
    altEn: 'A person listening to music',
  },
  'how-start': {
    image: 'laying.png', side: 'left', afterJa: 1, afterEn: 1,
    altJa: 'スマートフォンを使っている人のイラスト',
    altEn: 'A person using a smartphone',
  },
}

export default function OrientationFigure({ config }) {
  const { language } = useLanguage()
  return (
    <figure className={`rf-open-figure rf-open-figure--${config.side}`}>
      <img
        src={base + config.image}
        alt={language === 'ja' ? config.altJa : config.altEn}
        width="300"
        height="300"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </figure>
  )
}
