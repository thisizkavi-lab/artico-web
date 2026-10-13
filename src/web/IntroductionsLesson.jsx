import { useLanguage } from './Language'
import { japaneseIntroduction } from '../course/locales/ja/introductions'
import LessonExperience from './LessonExperience'
import {
  introductionAliases,
  introductionPhrases,
  introductionScenarios,
  introductionSections,
} from '../course/introductions'
const model = {
  id: '02',
  title: 'Making introductions',
  subtitle: 'A name, a connection, and a way to keep talking.',
  aliases: introductionAliases,
  phrases: introductionPhrases,
  scenarios: introductionScenarios,
  sections: introductionSections,
}
const japaneseModel = japaneseIntroduction(model)
export default function IntroductionsLesson(props) {
  const { language } = useLanguage()
  return <LessonExperience model={language === 'ja' ? japaneseModel : model} {...props} />
}
