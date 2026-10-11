import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Icon, IconButton, Modal } from './components'
import { Courses, Home, PracticeLibrary, Saved } from './Library'
import { PhrasePractice, Shadow, Study, Twister, Vocabulary } from './Lesson'
import { chapterById, foundationSteps } from './content'
import { loadLearning, parseRoute, STORAGE_KEY, toggleSaved, visit } from './learning'
import Foundation from './Foundation'
import { getLearningStage, learningStages } from './pathway'

const Reader = lazy(() => import('./Reader'))
const destinations = [
  { id: 'home', label: 'ホーム', icon: 'home' },
  { id: 'courses', label: 'コース', icon: 'book' },
  { id: 'practice', label: '練習室', icon: 'audio' },
]

function readLearning() {
  try {
    return loadLearning(window.localStorage)
  } catch {
    return loadLearning({ getItem: () => null })
  }
}
function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  useEffect(() => {
    const change = () => setRoute(parseRoute(window.location.hash))
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
          <h1>このページを読み込めませんでした。</h1>
          <Button onClick={() => window.location.reload()}>もう一度読み込む</Button>
        </div>
      )
    return this.props.children
  }
}

export default function ArticoWeb() {
  const route = useRoute()
  const [learning, update] = useState(readLearning)
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState('')
  const mainRef = useRef(null)
  const contentRef = useRef(null)
  const learningRef = useRef(learning)
  const scrollTimer = useRef(null)
  const pendingScroll = useRef(null)
  learningRef.current = learning
  const notify = (message) => setToast(message)
  const save = (id) =>
    update((previous) => ({
      ...previous,
      saved: toggleSaved(previous.saved, id),
    }))
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
    const chapter = chapterById[route.id]
    const foundation = foundationSteps.find((step) => step.id === route.id)
    document.title = `${chapter?.title ?? foundation?.en ?? (route.page === 'courses' ? 'Courses' : route.page === 'practice' ? 'Practice' : route.page === 'saved' ? 'Saved phrases' : 'Your learning space')} · Artico`
    return stopRestoring
  }, [route.path])
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
    : route.page === 'saved'
      ? 'practice'
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
      ? `コース   /   Social Fluency   /   Chapter ${route.id}`
      : route.page === 'foundation'
        ? `コース   /   ${getLearningStage(route.path)?.title ?? 'Foundations'}`
        : route.page === 'courses'
          ? `コース   /   ${courseStage.title}`
          : ['practice', 'saved'].includes(route.page)
            ? '練習室'
            : 'ホーム'
  let screen
  if (route.page === 'courses')
    screen = <Courses learning={learning} route={route} key={route.path} />
  else if (route.page === 'practice') screen = <PracticeLibrary learning={learning} />
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
        <Foundation route={route} />
      )
  else if (route.page === 'lesson') {
    if (route.id === '02' && route.view === 'study')
      screen = <Study route={route} learning={learning} save={save} notify={notify} />
    else if (route.id === '02' && ['words', 'phrases'].includes(route.view))
      screen = <Vocabulary route={route} learning={learning} save={save} notify={notify} />
    else if (route.id === '02' && route.phrase)
      screen = (
        <PhrasePractice
          key={route.path}
          route={route}
          learning={learning}
          update={update}
          notify={notify}
        />
      )
    else if (route.id === '02' && route.view === 'practice')
      screen = (
        <Shadow
          key={route.path}
          route={route}
          learning={learning}
          update={update}
          notify={notify}
        />
      )
    else
      screen = (
        <Suspense
          fallback={
            <div className="aw-page" role="status">
              Loading the chapter…
            </div>
          }
        >
          <Reader route={route} />
        </Suspense>
      )
  } else
    screen = (
      <Home learning={learning} storageAvailable={storageAvailable} sync={() => setModal(true)} />
    )
  return (
    <div className="aw-app">
      <a
        className="aw-skip"
        href="#aw-content"
        onClick={(event) => {
          event.preventDefault()
          mainRef.current.focus()
        }}
      >
        本文へ
      </a>
      <aside className="aw-sidebar">
        <a className="aw-wordmark" href="#/home" aria-label="Artico home">
          artico
        </a>
        <p className="aw-tagline">言葉を、毎日の会話へ。</p>
        <nav className="aw-destinations" aria-label="Main navigation">
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={`#/${destination.id}`}
              className={activeNav === destination.id ? 'is-active' : ''}
              aria-current={activeNav === destination.id ? 'page' : undefined}
            >
              <Icon name={destination.icon} />
              <span>{destination.label}</span>
            </a>
          ))}
        </nav>
        <div className="aw-divider" />
        <p className="aw-my-course">MY COURSE</p>
        <a className="aw-course-name" href={`#${lastStage.overview}`} lang="en">
          {lastStage.title}
        </a>
        <p className="aw-course-status">
          {lastChapter
            ? `${lastChapter.ja}を${learning.last.includes('/practice') ? '練習' : '学習'}中`
            : lastFoundation
              ? `${lastFoundation.ja} · ${/\/(chunks|whole)(\/|$)/.test(learning.last) ? '練習中' : '学習中'}`
              : '自分のペースで、はじめよう'}
        </p>
        <button className="aw-sync" type="button" onClick={() => setModal(true)}>
          <Icon name="cloud" />
          <strong>ほかの端末でも続ける</strong>
          <span>この端末に保存 · 同期は準備中</span>
        </button>
      </aside>
      <div className="aw-main">
        <header className="aw-topbar">
          <p>{crumb}</p>
          <span>{storageAvailable ? 'この端末に保存' : 'このタブで学習中'}</span>
          <IconButton name="user" label="Your guest profile" onClick={() => setModal(true)} />
        </header>
        <main
          ref={mainRef}
          id="aw-content"
          tabIndex={-1}
          className="aw-viewport"
          onScroll={recordScroll}
        >
          <div ref={contentRef}>
            <LearningBoundary key={route.path}>{screen}</LearningBoundary>
          </div>
        </main>
        <nav className="aw-mobile-nav" aria-label="Mobile navigation">
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={`#/${destination.id}`}
              className={activeNav === destination.id ? 'is-active' : ''}
              aria-current={activeNav === destination.id ? 'page' : undefined}
            >
              <Icon name={destination.icon} />
              <span>{destination.label}</span>
            </a>
          ))}
        </nav>
      </div>
      {toast && (
        <div className="aw-toast" role="status">
          <span>{toast}</span>
          <button type="button" aria-label="Dismiss message" onClick={() => setToast('')}>
            ×
          </button>
        </div>
      )}
      {modal && (
        <Modal title="ゲストで、すぐに学べます。" onClose={() => setModal(false)}>
          <p>学習の続きと保存した表現は、この端末のブラウザに保存されます。</p>
          <p>端末間の同期は準備中です。今はアカウントを作らずに、コースと練習を進められます。</p>
          {!storageAvailable && (
            <p>ブラウザの保存機能が使えないため、このタブを閉じると学習の続きが失われます。</p>
          )}
        </Modal>
      )}
    </div>
  )
}
