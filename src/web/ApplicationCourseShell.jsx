import { useLanguage } from './Language'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Glyph from './Glyph'
import { applicationMode, applicationPath } from './applicationNavigation'
import './application-course-shell.css'

const CourseControls = createContext(null)

export function useCourseLocation(location) {
  const controls = useContext(CourseControls)
  const key = JSON.stringify(location)
  useEffect(() => { controls?.setOverride({ sourcePath:location.path, location }) }, [controls, key])
}

export function CourseContents({ id, children }) {
  const controls = useContext(CourseControls)
  useEffect(() => {
    controls?.setContents(children)
    return () => controls?.setContents(null)
  }, [controls, id])
  return controls ? null : children
}

export function ApplicationModeBar({ route, disabled = false, onChange, children }) {
  const { t, language } = useLanguage()
  const mode = applicationMode(route)
  const current = route.chapter || route.lesson || route.collection || route.category || route.area || 'home'
  return <div className="ac-mode-bar">
    <nav className="ac-mode-switch" aria-label={t('Lesson mode')}>
      {['study','practice'].map(value => {
        const label = <><Glyph name={value === 'study' ? 'book' : 'headphones'} size={18}/>{t(value === 'study' ? 'Study' : 'Practice')}</>
        return onChange || disabled
          ? <button key={value} type="button" disabled={disabled} aria-pressed={mode === value} onClick={() => onChange?.(value)}>{label}</button>
          : <a key={value} href={'#' + applicationPath(route, value)} aria-current={mode === value ? 'page' : undefined}>{label}</a>
      })}
    </nav>
    <div className="ac-mode-trailing">{children ?? (current !== 'home' && <a href={'#' + applicationPath(route, mode, { home:true })}>{language === 'ja' ? 'コース一覧' : 'Course contents'}</a>)}</div>
  </div>
}

export default function ApplicationCourseShell({ route, children, disabled, onChange, trailing }) {
  const [override, setOverride] = useState(null)
  const [contents, setContents] = useState(null)
  const controls = useMemo(() => ({ setOverride, setContents }), [])
  const location = override?.sourcePath === route.path ? override.location : route
  return <div className="ac-course-shell" data-course={route.exam || route.id} data-mode={applicationMode(route)}>
    <ApplicationModeBar route={location} disabled={disabled} onChange={onChange}>{trailing ?? contents}</ApplicationModeBar>
    <CourseControls.Provider value={controls}>{children}</CourseControls.Provider>
  </div>
}
