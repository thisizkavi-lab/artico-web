import { useLanguage } from './Language'
import { getLearningStage, learningStages } from './pathway'
import CurriculumIcon, { stageIcon } from './CurriculumIcon'
export function StageNavigation({ active }) {
  const { t, language } = useLanguage()
  return (
    <nav className="rl-stage-tabs" aria-label={t("Learning stages")}>
      {learningStages.map((stage) => (
        <a
          key={stage.id}
          href={`#${stage.overview}`}
          aria-current={stage.id === active ? 'page' : undefined}
        >
          <CurriculumIcon name={stageIcon(stage.id)} size={18} />
          {t(stage.title)}
        </a>
      ))}
    </nav>
  )
}
export default function StudyMap({ learning }) {
  const { t, language } = useLanguage()
  const current = getLearningStage(learning.last)?.id
  return (
    <section className="rl-study-map" id="aw-study-map" aria-labelledby="learning-path-title">
      <header>
        <div>
          <p className="rl-kicker">{t("THE PATH AHEAD")}</p>
          <h2 id="learning-path-title">{t("Your learning path.")}</h2>
        </div>
        <span>{t("Start at the beginning, or find what you need.")}</span>
      </header>
      <ol>
        {learningStages.map((stage, index) => (
          <li key={stage.id} className={current === stage.id ? 'is-current' : ''}>
            <span className="rl-stage-number"><CurriculumIcon name={stageIcon(stage.id)} size={21} /></span>
            <div>
              <div className="rl-stage-title">
                <h3>{t(stage.title)}</h3>
                {current === stage.id && <small>{t("YOU ARE HERE")}</small>}
              </div>
              <p>{t(stage.description)}</p>
              <span className="rl-topics">{stage.topics.map((topic) => t(topic)).join(' · ')}</span>
            </div>
            <a href={`#${stage.overview}`} aria-label={t(stage.action)}>
              <span>{t(stage.count)}</span>
              <strong>{t("Explore →")}</strong>
            </a>
          </li>
        ))}
      </ol>
      <p className="rl-map-note"> {t("Already know the basics? Move ahead. You can always return to a sound or an explanation.")} </p>
    </section>
  )
}
