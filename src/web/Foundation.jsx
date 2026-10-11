import { lazy, Suspense } from 'react'
import { Button } from './components'
import { foundationSteps } from './content'
import { getFoundationNavigation } from './pathway'
import { StageNavigation } from './StudyMap'

const foundationNames = {
  orientation: 'Orientation',
  'how-it-works': 'HowArticoWorksLesson',
  letters: 'LettersLesson',
  hear: 'HearLesson',
  write: 'WriteLesson',
  sounds: 'SoundsLesson',
  'tongue-intro': 'TongueIntro',
}
const foundations = Object.fromEntries(
  Object.entries(foundationNames).map(([id, name]) => [
    id,
    lazy(() => import('./FoundationContent').then((module) => ({ default: module[name] }))),
  ]),
)

export default function Foundation({ route }) {
  const Lesson = foundations[route.id]
  const navigation = getFoundationNavigation(route.id)
  const previousId = navigation.previous.match(/\/foundation\/([^/]+)/)?.[1]
  const previous = foundationSteps.find((step) => step.id === previousId)
  const go = (path) => {
    window.location.hash = path
  }
  return (
    <div className="aw-page aw-legacy aw-foundation-page">
      <StageNavigation active={navigation.stage.id} />
      <div className="aw-foundation-meta">
        <Button variant="quiet" href={navigation.stage.overview}>
          ← {navigation.stage.title}
        </Button>
        <span>
          LESSON {String(navigation.index + 1).padStart(2, '0')} /{' '}
          {String(navigation.stage.lessonIds.length).padStart(2, '0')}
        </span>
      </div>
      <Suspense fallback={<p role="status">Loading the lesson…</p>}>
        <Lesson
          onPrevious={() => go(navigation.previous)}
          previousLabel={previous?.en ?? navigation.stage.title}
          onNext={() => go(navigation.next)}
          onPractice={() => go(navigation.next)}
        />
      </Suspense>
    </div>
  )
}
