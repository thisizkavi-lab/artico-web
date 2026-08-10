import { GreetingsInteractiveLearnView, GreetingsInteractivePracticeView, SourceBookInteractiveLearnView, SourceBookInteractivePracticeView } from './greetingsInteractive'

export function SourceBookLearnView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (Number(lesson?.number) === 1) return <GreetingsInteractiveLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  return <SourceBookInteractiveLearnView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
}

export function SourceBookPracticeView({ lesson, speakWithBrowser, PlayIcon, LessonTitle }) {
  if (Number(lesson?.number) === 1) return <GreetingsInteractivePracticeView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
  return <SourceBookInteractivePracticeView lesson={lesson} speakWithBrowser={speakWithBrowser} PlayIcon={PlayIcon} LessonTitle={LessonTitle} />
}
