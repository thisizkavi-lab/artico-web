import { useLanguage } from './Language'

// Freely reusable CC0 PNG artwork by Pablo Stanley, Open Doodles.
// Source and license: https://www.opendoodles.com/about
// Assets are referenced from the creator's public PNG download URLs.
// Do not mix these editorial pictures with Artico's interface icon system.
const base = 'https://opendoodles.s3-us-west-1.amazonaws.com/'
export const orientationFigures = {
  'orientation-language': {
    image: 'reading.png', side: 'right', afterJa: 0, afterEn: 0,
    altJa: '本を読んでいる人のイラスト',
    altEn: 'Illustration of a person reading',
  },
  'orientation-english': {
    image: 'strolling.png', side: 'left', afterJa: 0, afterEn: 0,
    altJa: '歩いている人のイラスト',
    altEn: 'Illustration of a person walking',
  },
  'how-start-line': {
    image: 'sitting-reading.png', side: 'right', afterJa: 0, afterEn: 0,
    altJa: '座って本を読んでいる学習者のイラスト',
    altEn: 'Illustration of a learner reading',
  },
  'how-two-by-two': {
    image: 'coffee.png', side: 'left', afterJa: 0, afterEn: 0,
    altJa: 'コーヒーを持っている人のイラスト',
    altEn: 'Illustration of a person with coffee',
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
