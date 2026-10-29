import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useLanguage } from './Language'
import { shouldShowLanding } from './learning'
import Landing from './Landing'
import './english-shell.css'

const LearningApp = lazy(() => import('./ArticoWeb'))

function readEntry() {
  return { landing: shouldShowLanding(window.location.hash) }
}

// A bookmarked Home URL should still introduce the public landing page on a
// fresh visit. In-app navigation to #/home remains unchanged.
function readInitialEntry() {
  if (/^#\\/home\\/?(?:\\?.*)?$/.test(window.location.hash)) {
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}#/landing`,
    )
  }
  return readEntry()
}

export default function ArticoApp() {
  const [entry, setEntry] = useState(readInitialEntry)
  const { t } = useLanguage()
  useEffect(() => {
    const change = () => setEntry(readEntry())
    window.addEventListener('hashchange', change)
    window.addEventListener('popstate', change)
    return () => {
      window.removeEventListener('hashchange', change)
      window.removeEventListener('popstate', change)
    }
  }, [])
  useLayoutEffect(() => {
    // The landing page uses document scrolling; lessons keep their own viewport.
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [entry.landing])
  if (entry.landing) return <Landing />
  return (
    <Suspense fallback={<div className="aw-landing al-loading" role="status">{t('Loading your lesson…')}</div>}>
      <LearningApp />
    </Suspense>
  )
}
