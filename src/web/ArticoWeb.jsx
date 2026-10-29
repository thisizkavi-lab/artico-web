import { LanguageSelector, useLanguage } from './Language'
import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Icon, IconButton, Modal } from './components'
import { Courses, PracticeLibrary, Saved } from './Library'
import Home from './Home'
import { chapterById, foundationSteps } from './content'
import { loadLearning, parseRoute, STORAGE_KEY, toggleSaved, visit } from './learning'
import Progress from './Progress'
import './english-shell.css'
import { getLearningStage, learningStages } from './pathway'
import { ieltsArea } from './ieltsNavigation'
import { isStaleAssetFailure, shouldRefreshStaleAssets } from './routeRecovery.js'

const Foundation = lazy(() => import('./Foundation'))
const Application = lazy(() => import('./Application'))
const Vocabulary = lazy(() => import('./Vocabulary'))
const ChapterLesson = lazy(() => import('./ChapterLesson'))
const HumorLesson = lazy(() => import('./HumorLesson'))
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
const RELOAD_MARKER = 'artico.stale-assets-reload-at'
class LearningBoundary extends Component {
  state = { failed: false, staleAssets: false }
  static getDerivedStateFromError(error) {
    return { failed: true, staleAssets: isStaleAssetFailure(error) }
  }
  componentDidCatch(error, info) {
    // Keep the real exception visible for debugging genuine render failures.
    console.error('Artico page error:', error, info?.componentStack ?? '')
    if (!isStaleAssetFailure(error)) return
    try {
      const lastReload = window.sessionStorage.getItem(RELOAD_MARKER)
      if (shouldRefreshStaleAssets(error, lastReload)) {
        window.sessionStorage.setItem(RELOAD_MARKER, String(Date.now()))
        // Reload the new build; preserve the URL/hash and local learning data.
        window.location.reload()
      }
    } catch {
      // Blocked session storage: leave the manual reload action available.
    }
  }
  render() {
    if (this.state.failed)
      return (
        <div className="aw-page aw-empty">
          <h1>{this.props.t(this.state.staleAssets
            ? 'Artico was updated while this page was open.'
            : 'This page could not be loaded.')}</h1>
          {this.state.staleAssets && <p>{this.props.t('Reload to open the newest version. Your saved learning stays on this device.')}</p>}
          <Button onClick={() => window.location.reload()}>{this.props.t(this.state.staleAssets ? 'Reload latest version' : 'Try again')}</Button>
        </div>
      )
    return this.props.children
  }
}

export default function ArticoWeb() {
  const { t, language } = useLanguage()
  const mainRef = useRef(null)
  const pendingScroll = useRef(null)
  const vocabularyPositions = useRef({})
  const route = useRoute((outgoing) => {
    const viewport = mainRef.current
    if (!viewport) return
    if (['lesson', 'foundation'].includes(outgoing.page))
      pendingScroll.current = { path: outgoing.path, top: viewport.scrollTop }
    if (outgoing.page === 'vocabulary')
      vocabularyPositions.current[outgoing.path] = viewport.scrollTop
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
    const target = route.page === 'vocabulary'
      ? vocabularyPositions.current[route.path] ?? 0
      : learningRef.current.positions[route.path] ?? 0
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
    if (route.page === 'application' && route.id === 'ideas') {
      document.title = 'Ideas & Expression · Artico'
      return
    }
    if (route.page === 'application' && route.id === 'tests') {
      document.title = `${route.exam === 'ielts' ? `${ieltsArea(route.area)?.title ?? 'IELTS Academic'} · IELTS` : 'English Tests'} · Artico`
      return
    }
    if (route.page === 'vocabulary') {
      const lesson = route.topic ? (language === 'ja' ? `レッスン${Number(route.topic)} · ` : `Lesson ${Number(route.topic)} · `) : ''
      document.title = `${lesson}${language === 'ja' ? '語彙' : 'Vocabulary'} · Artico`
      return
    }
    const chapter = chapterById[route.id]
    const foundation = foundationSteps.find((step) => step.id === route.id)
    const pageName = { home: 'Home', courses: 'Courses', practice: 'Practice', progress: 'Your progress', saved: 'Saved phrases' }[route.page]
    document.title = `${(language === 'ja' ? chapter?.ja : chapter?.title) ?? (language === 'ja' ? foundation?.ja : foundation?.en) ?? t(pageName ?? 'Courses')} · Artico`
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
  const activeNav = route.page === 'vocabulary' ? 'courses' : route.page === 'application'
    ? 'courses'
    : route.page === 'foundation' && ['orientation', 'how-it-works'].includes(route.id)
    ? 'home'
    : ['lesson', 'foundation'].includes(route.page)
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
  const crumb =
    route.page === 'vocabulary' ? `${language === 'ja' ? '学ぶ / 語彙' : 'Learn / Vocabulary'}${route.topic ? ` / ${route.topic}` : ''}` : route.page === 'lesson'
      ? `${t('Learn')} / ${t('Social Fluency')} / ${route.id}`
      : route.page === 'application'
        ? route.id === 'tests' ? `Application / English Tests${route.exam === 'ielts' ? ' / IELTS' : ''}` : `${t('Learn')} / ${language === 'ja' ? '実践' : 'Application'}`
        : route.page === 'foundation'
          ? `${t(['orientation', 'how-it-works'].includes(route.id) ? 'Home' : 'Learn')} / ${t(getLearningStage(route.path)?.title ?? 'Level Zero')}`
        : route.page === 'courses'
          ? t('Learn')
          : ['practice', 'saved'].includes(route.page)
            ? route.page === 'saved'
              ? `${t('Progress')} / ${t('Saved phrases')}`
              : t("Practice")
            : route.page === 'progress'
              ? t("Progress")
              : route.page === 'home'
                ? t("Home")
                : t("Learn")
  let screen
  if (route.page === 'home') screen = <Home />
  else if (route.page === 'courses')
    screen = <Courses learning={learning} route={route} key={route.path} />
  else if (route.page === 'vocabulary')
    screen = <Suspense fallback={<div className="aw-page" role="status">{t('Loading the chapter…')}</div>}><Vocabulary route={route} /></Suspense>
  else if (route.page === 'application')
    screen = (
      <Suspense fallback={<div className="aw-page" role="status">{t('Loading the chapter…')}</div>}>
        <Application route={route} learning={learning} update={update} />
      </Suspense>
    )
  else if (route.page === 'practice') screen = <PracticeLibrary learning={learning} />
  else if (route.page === 'progress') screen = <Progress learning={learning} />
  else if (route.page === 'saved')
    screen = <Saved learning={learning} save={save} notify={notify} />
  else if (route.page === 'foundation')
    screen = <Foundation key={route.path} route={route} learning={learning} update={update} />
  else if (route.page === 'lesson') {
    const Lesson =
      route.id === '01'
        ? GreetingsLesson
        : route.id === '02'
          ? IntroductionsLesson
          : route.id === '34'
            ? HumorLesson
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
  } else {
    screen = <Home />
  }
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
        <a className="aw-wordmark artico-wordmark" href="#/home" aria-label={t("Home")}>
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
        <a className="aw-course-name" href={`#${lastStage.id === 'orientation' ? '/home' : lastStage.overview}`}>
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
            <LearningBoundary key={route.exam === 'ielts' ? 'ielts' : route.path} t={t}><Suspense fallback={<div className="aw-page" role="status">{t('Loading your lesson…')}</div>}>{screen}</Suspense></LearningBoundary>
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
        <Modal title={language === 'ja' ? 'あなたのプロフィール' : 'Your profile'} onClose={() => setModal(false)}>
          <div className="aw-profile-simple">
            <div className="aw-profile-account">
              <span className="aw-profile-avatar" aria-hidden="true"><Icon name="user" /></span>
              <div>
                <strong>{language === 'ja' ? 'ゲスト' : 'Guest'}</strong>
                <p>{storageAvailable
                  ? (language === 'ja' ? '学習内容は、この端末に保存されます。' : 'Your learning is saved on this device.')
                  : (language === 'ja' ? '保存できません。ブラウザを閉じると学習記録が失われる場合があります。' : 'Storage is unavailable. Progress may be lost when you close this tab.')}</p>
              </div>
            </div>
            <hr className="aw-profile-divider" />
            <LanguageSelector profile />
            <hr className="aw-profile-divider" />
            <section className="aw-profile-connect-section">
              <h3>{language === 'ja' ? '学習パートナーを探す' : 'Find a learning partner'}</h3>
              <p>{language === 'ja'
                ? 'Artico Connectで学習パートナーを探せます。別のログインが必要です。'
                : 'Meet other learners on Artico Connect. A separate login is required.'}</p>
              <a className="aw-profile-connect-link"
                href="https://artico-connect.discourse.group/c/fina-a-learning-partner/5"
                target="_blank" rel="noopener noreferrer">
                <span>Artico Connect</span><span aria-hidden="true">↗</span>
              </a>
            </section>
          </div>
        </Modal>
      )}
    </div>
  )
}
