import { useLanguage } from './Language'
import CurriculumIcon from './CurriculumIcon'
import './home.css'

const startingPoints = [
  {
    id:'orientation',
    icon:'compass',
    label:'Orientation',
    ja:'はじめに',
    description:'Get to know Artico.',
    descriptionJa:'Articoの使い方を知る。',
    href:'#/foundation/orientation/study',
  },
  {
    id:'foundation',
    icon:'abc',
    label:'Foundations',
    ja:'基礎',
    description:'Start with letters and sounds.',
    descriptionJa:'文字と音から始める。',
    href:'#/courses?foundation',
  },
  {
    id:'social',
    icon:'messages',
    label:'Social Fluency',
    ja:'日常会話',
    description:'Speak naturally in everyday situations.',
    descriptionJa:'日常の会話を練習する。',
    href:'#/courses?social',
  },
  {
    id:'application',
    icon:'globe',
    label:'Application',
    ja:'実践',
    description:'Use English for your own goals.',
    descriptionJa:'自分の目的に英語を使う。',
    href:'#/application',
  },
]

export default function Home() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  return (
    <div className="aw-page aw-library-page ah-page">
      <header className="ah-heading">
        <p className="ah-eyebrow">ARTICO · YOUR STARTING POINT</p>
        <h1>{ja ? 'どこから始める？' : 'Pick your starting point.'}</h1>
        <p>{ja ? '今の自分に合うところから始めましょう。' : 'Choose the path that fits you today.'}</p>
      </header>
      <div className="ah-options">
        {startingPoints.map(point => (
          <section className={'ah-option ah-option--' + point.id} key={point.id}>
            <span className="ah-illustration" aria-hidden="true">
              <CurriculumIcon name={point.icon} size={44} />
            </span>
            <div className="ah-copy">
              <h2 lang="en">{point.label}</h2>
              <p>{ja ? point.descriptionJa : point.description}</p>
            </div>
            {point.href ? (
              <a className="ah-action" href={point.href}>
                {ja ? '始める' : 'Start'} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span className="ah-coming">{ja ? '準備中' : 'Coming later'}</span>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
