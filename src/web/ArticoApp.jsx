import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useLanguage } from './Language'
import { shouldShowLanding } from './learning'
import Landing from './Landing'
import './english-shell.css'

const LearningApp = lazy(() => import('./ArticoWeb'))

function readEntry() {
  return { landing: shouldShowLanding(window.location.hash) }
}

export default function ArticoApp() {
  const [entry, setEntry] = useState(readEntry)
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
