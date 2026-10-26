import { LanguageSelector, useLanguage } from './Language'
import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Icon, IconButton, Modal } from './components'
import { Courses, Home, PracticeLibrary, Saved } from './Library'
import { chapterById, foundationSteps } from './content'
import { loadLearning, parseRoute, STORAGE_KEY, toggleSaved, visit } from './learning'
import Progress from './Progress'
import './english-shell.css'
import { getLearningStage, learningStages } from './pathway'

const Foundation = lazy(() => import('./Foundation'))
const Twister = lazy(() => import('./SoundLesson').then((module) => ({ default: module.Twister })))
const ChapterLesson = lazy(() => import('./ChapterLesson'))
const GreetingsLesson = lazy(() => import('./GreetingsLesson'))
const IntroductionsLesson = lazy(() => import('./IntroductionsLesson'))
const destinations = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'courses', label: 'Learn', icon: 'book' },
  { id: 'progress', label: 'Progress', icon: 'check' },
]

function readLearning() {
  try {
    return loadLearning(window.localStorage)
  } catch {
    return loadLearning({ getItem: () => null })
  }
}
function useRoute(beforeChange) {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  const currentRoute = useRef(route)
  const beforeChangeRef = useRef(beforeChange)
  beforeChangeRef.current = beforeChange
  useEffect(() => {
    const change = () => {
      const next = parseRoute(window.location.hash)
      if (next.path === currentRoute.current.path) return
      beforeChangeRef.current(currentRoute.current)
      currentRoute.current = next
      setRoute(next)
    }
    window.addEventListener('hashchange', change)
    window.addEventListener('popstate', change)
    return () => {
      window.removeEventListener('hashchange', change)
      window.removeEventListener('popstate', change)
    }
  }, [])
  return route
}
class LearningBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed)
      return (
        <div className="aw-page aw-empty">
          <h1>{this.props.t('This page could not be loaded.')}</h1>
          <Button onClick={() => window.location.reload()}>{this.props.t('Try again')}</Button>
        </div>
      )
    return this.props.children
  }
}

export default function ArticoWeb() {
  const { t, language } = useLanguage()
  const mainRef = useRef(null)
  const pendingScroll = useRef(null)
  const route = useRoute((outgoing) => {
    const viewport = mainRef.current
    if (!viewport) return
    if (['lesson', 'foundation'].includes(outgoing.page))
      pendingScroll.current = { path: outgoing.path, top: viewport.scrollTop }
    // Stop any section-jump animation before replacing the page. Capture the
    // outgoing position before React changes its height or the browser clamps it.
    viewport.scrollTo({ top: viewport.scrollTop, behavior: 'instant' })
  })
  const [learning, update] = useState(readLearning)
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState('')
  const contentRef = useRef(null)
  const learningRef = useRef(learning)
  const scrollTimer = useRef(null)
  learningRef.current = learning
  const notify = (message) => setToast(message)
  const save = (item) =>
    update((previous) => {
      const id = typeof item === 'string' ? item : item.id
      const saved = toggleSaved(previous.saved, id)
      const savedDetails = { ...previous.savedDetails }
      if (!saved.includes(id)) delete savedDetails[id]
      else if (typeof item !== 'string')
        savedDetails[id] = { id, en: item.en, ja: item.ja ?? '', chapter: item.chapter }
      return { ...previous, saved, savedDetails }
    })
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(learning))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }, [learning])
  useLayoutEffect(() => {
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current)
      scrollTimer.current = null
    }
    const outgoing = pendingScroll.current
    pendingScroll.current = null
    update((previous) =>
      visit(
        outgoing
          ? {
              ...previous,
              positions: {
                ...previous.positions,
                [outgoing.path]: outgoing.top,
              },
            }
          : previous,
        route.path,
      ),
    )
    const viewport = mainRef.current
    const target = learningRef.current.positions[route.path] ?? 0
    let restoring = true
    const observer = new ResizeObserver(() => {
      if (!restoring) return
      viewport.scrollTop = target
      if (Math.abs(viewport.scrollTop - target) < 1) stopRestoring()
    })
    const stopRestoring = () => {
      restoring = false
      observer.disconnect()
      viewport.removeEventListener('wheel', stopRestoring)
      viewport.removeEventListener('touchstart', stopRestoring)
      viewport.removeEventListener('pointerdown', stopRestoring)
      viewport.removeEventListener('keydown', stopRestoring)
    }
    viewport.scrollTop = target
    if (Math.abs(viewport.scrollTop - target) >= 1) {
      observer.observe(contentRef.current)
      viewport.addEventListener('wheel', stopRestoring, { passive: true })
      viewport.addEventListener('touchstart', stopRestoring, { passive: true })
      viewport.addEventListener('pointerdown', stopRestoring, {
        passive: true,
      })
      viewport.addEventListener('keydown', stopRestoring)
    } else stopRestoring()
    return stopRestoring
  }, [route.path])
  useEffect(() => {
    const chapter = chapterById[route.id]
    const foundation = foundationSteps.find((step) => step.id === route.id)
    const pageName = { courses: 'Courses', practice: 'Practice', progress: 'Your progress', saved: 'Saved phrases', home: 'Your learning space' }[route.page]
    document.title = `${(language === 'ja' ? chapter?.ja : chapter?.title) ?? (language === 'ja' ? foundation?.ja : foundation?.en) ?? t(pageName ?? 'Your learning space')} · Artico`
  }, [route.path, language, t])
  useEffect(() => () => clearTimeout(scrollTimer.current), [])
  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(''), 6500)
    return () => clearTimeout(timeout)
  }, [toast])
  const recordScroll = (event) => {
    if (!['lesson', 'foundation'].includes(route.page)) return
    const top = event.currentTarget.scrollTop
    const path = route.path
    pendingScroll.current = { path, top }
    clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(
      () =>
        update((previous) => ({
          ...previous,
          positions: { ...previous.positions, [path]: top },
        })),
      180,
    )
  }
  const activeNav = ['lesson', 'foundation'].includes(route.page)
    ? 'courses'
    : ['saved', 'practice'].includes(route.page)
      ? 'progress'
      : route.page
  const chapterId = learning.last?.match(/\/lesson\/(\d+)/)?.[1]
  const lastChapter = chapterById[chapterId]
  const lastStage = getLearningStage(learning.last) ?? learningStages[0]
  const lastFoundation = foundationSteps.find((step) =>
    learning.last?.startsWith(`/foundation/${step.id}/`),
  )
  const courseStage =
    learningStages.find((stage) => route.path.includes(`?${stage.id}`)) ?? lastStage
  const crumb =
    route.page === 'lesson'
      ? `${t('Learn')} / ${t('Social Fluency')} / ${route.id}`
      : route.page === 'foundation'
        ? `${t('Learn')} / ${t(getLearningStage(route.path)?.title ?? 'Foundations')}`
        : route.page === 'courses'
          ? `${t('Learn')} / ${t(courseStage.title)}`
          : ['practice', 'saved'].includes(route.page)
            ? route.page === 'saved'
              ? `${t('Progress')} / ${t('Saved phrases')}`
              : t("Practice")
            : route.page === 'progress'
              ? t("Progress")
              : t("Home")
  let screen
  if (route.page === 'courses')
    screen = <Courses learning={learning} route={route} key={route.path} />
  else if (route.page === 'practice') screen = <PracticeLibrary learning={learning} />
  else if (route.page === 'progress') screen = <Progress learning={learning} />
  else if (route.page === 'saved')
    screen = <Saved learning={learning} save={save} notify={notify} />
  else if (route.page === 'foundation')
    screen =
      route.id === 'lr' ? (
        <Twister
          key={route.path}
          route={route}
          learning={learning}
          update={update}
          notify={notify}
        />
      ) : (
        <Foundation key={route.path} route={route} learning={learning} update={update} />
      )
  else if (route.page === 'lesson') {
    const Lesson =
      route.id === '01'
        ? GreetingsLesson
        : route.id === '02'
          ? IntroductionsLesson
          : ChapterLesson
    screen = (
      <Suspense
        fallback={
          <div className="aw-page" role="status"> {t("Loading the chapter…")} </div>
        }
      >
        <Lesson
          key={route.path}
          route={route}
          learning={learning}
          update={update}
          save={save}
          notify={notify}
        />
      </Suspense>
    )
  } else
    screen = (
      <Home learning={learning} storageAvailable={storageAvailable} sync={() => setModal(true)} />
    )
  return (
    <div className="aw-app is-english-pilot" data-language={language}>
      <a
        className="aw-skip"
        href="#aw-content"
        onClick={(event) => {
          event.preventDefault()
          mainRef.current.focus()
        }}
      > {t("Skip to content")} </a>
      <aside className="aw-sidebar">
        <a className="aw-wordmark artico-wordmark" href="#/home" aria-label={t("Artico home")}>
          artico<span className="artico-wordmark-dot" aria-hidden="true">.</span>
        </a>
        <nav className="aw-destinations" aria-label={t("Main navigation")}>
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={`#/${destination.id}`}
              className={activeNav === destination.id ? 'is-active' : ''}
              aria-current={activeNav === destination.id ? 'page' : undefined}
            >
              <Icon name={destination.icon} />
              <span>{t(destination.label)}</span>
            </a>
          ))}
        </nav>
        <div className="aw-divider" />
        <p className="aw-my-course">{t("MY COURSE")}</p>
        <a className="aw-course-name" href={`#${lastStage.overview}`}>
          {t(lastStage.title)}
        </a>
        <p className="aw-course-status">
          {lastChapter
            ? `${t('Chapter {id}', { id: lastChapter.id })} · ${learning.last.includes('/practice') ? t("Practice") : t("Study")}`
            : lastFoundation
              ? `${language === 'ja' ? lastFoundation.ja : lastFoundation.en} · ${/\/(practice|chunks|whole)(\/|$)/.test(learning.last) ? t("Practice") : t("Study")}`
              : t("Start at your own pace.")}
        </p>
        <button
          className="aw-sync"
          type="button"
          aria-label={t("About local saving and device sync")}
          onClick={() => setModal(true)}
        >
          <Icon name="cloud" />
          <strong>{t("Your learning, saved here")}</strong>
          <span>{t("Device sync is coming later.")}</span>
        </button>
      </aside>
      <div className="aw-main">
        <header className="aw-topbar">
          <p>{crumb}</p>
          <span>{storageAvailable ? t("Saved on this device") : t("Saved for this visit")}</span>
          <LanguageSelector />
          <IconButton name="user" label={t("Your guest profile")} onClick={() => setModal(true)} />
        </header>
        <main
          ref={mainRef}
          id="aw-content"
          tabIndex={-1}
          className="aw-viewport"
          onScroll={recordScroll}
        >
          <div ref={contentRef}>
            <LearningBoundary key={route.path} t={t}><Suspense fallback={<div className="aw-page" role="status">{t('Loading your lesson…')}</div>}>{screen}</Suspense></LearningBoundary>
          </div>
        </main>
        <nav className="aw-mobile-nav" aria-label={t("Mobile navigation")}>
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={`#/${destination.id}`}
              className={activeNav === destination.id ? 'is-active' : ''}
              aria-current={activeNav === destination.id ? 'page' : undefined}
            >
              <Icon name={destination.icon} />
              <span>{t(destination.label)}</span>
            </a>
          ))}
        </nav>
      </div>
      {toast && (
        <div className="aw-toast" role="status">
          <span>{toast}</span>
          <button type="button" aria-label={t("Dismiss message")} onClick={() => setToast('')}>
            ×
          </button>
        </div>
      )}
      {modal && (
        <Modal title={t("Your own learning space.")} onClose={() => setModal(false)}>
          <LanguageSelector profile />
          <p>{t("Your place in the course, practice choices, and saved phrases stay in this browser.")}</p>
          <p>{t("You can learn as a guest. Signing in to sync between devices is coming later.")}</p>
          {!storageAvailable && (
            <p> {t("Browser storage is unavailable. Your progress will be lost when you close this tab.")} </p>
          )}
        </Modal>
      )}
    </div>
  )
}
