import { Button, Icon } from './components'
import { getLearningStage, learningStages } from './pathway'

export function StageNavigation({ active }) {
  return (
    <nav className="aw-stage-nav" aria-label="Learning path">
      {learningStages.map((stage, index) => (
        <a
          key={stage.id}
          href={`#${stage.overview}`}
          className={active === stage.id ? `aw-tone-${stage.tone}` : ''}
          aria-current={active === stage.id ? 'step' : undefined}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong lang="en">{stage.title}</strong>
        </a>
      ))}
    </nav>
  )
}

export default function StudyMap({ learning }) {
  const current = getLearningStage(learning.last)
  return (
    <section className="aw-study-map" id="aw-study-map" aria-labelledby="aw-map-heading">
      <header className="aw-map-heading">
        <div>
          <h2 id="aw-map-heading" lang="en">
            Your learning path.
          </h2>
          <p className="aw-jp" lang="ja">
            迷ったら、この順番で。途中からでも、いつでも戻れます。
          </p>
        </div>
        <Button href="/courses" variant="quiet">
          コース一覧 <Icon name="next" />
        </Button>
      </header>
      <ol className="aw-map-stages">
        {learningStages.map((stage, index) => {
          const isCurrent = current?.id === stage.id
          return (
            <li
              className={isCurrent ? 'is-current' : ''}
              aria-current={isCurrent ? 'step' : undefined}
              key={stage.id}
            >
              <div className="aw-map-stop">
                <span className="aw-map-number" aria-label={`Stage ${index + 1}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {isCurrent && (
                  <span className="aw-map-current" lang="ja">
                    学習中
                  </span>
                )}
              </div>
              <article className={`aw-map-card aw-tone-${stage.tone}`}>
                <div className="aw-map-card-title">
                  <h3 lang="en">
                    <a href={`#${stage.overview}`}>{stage.title}</a>
                  </h3>
                  <p className="aw-jp" lang="ja">
                    {stage.ja}
                  </p>
                </div>
                <p className="aw-map-description" lang="en">
                  {stage.description}
                </p>
                <p className="aw-jp" lang="ja">
                  {stage.support}
                </p>
                <ul className="aw-map-topics" lang="en">
                  {stage.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <footer>
                  <span>{stage.count}</span>
                  <Button
                    href={isCurrent ? learning.last : stage.start}
                    variant="quiet"
                    aria-label={isCurrent ? `Continue ${stage.title}` : `Start ${stage.title}`}
                  >
                    {isCurrent ? '続きを学ぶ' : stage.action}
                    <Icon name="next" />
                  </Button>
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
      <p className="aw-map-note" lang="ja">
        基礎を知っているところは、飛ばして大丈夫。気になる音は、会話を学びながら何度でも。
      </p>
    </section>
  )
}
