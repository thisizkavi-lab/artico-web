import { useLanguage } from './Language'
import { greetingsModel } from '../course/greetings'
import { localizeGreetings } from '../course/locales/ja/greetings'
import LessonExperience from './LessonExperience'

export default function GreetingsLesson(props) {
  const { language } = useLanguage()
  return (
    <LessonExperience
      model={language === 'ja' ? localizeGreetings(greetingsModel) : greetingsModel}
      {...props}
    />
  )
}
