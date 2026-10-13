import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ja from './locales/ja'
import { DEFAULT_LANGUAGE, LANGUAGE_KEY, isLanguage, languages, readLanguage, translate } from './locale'
import './language.css'

const LanguageContext = createContext({ language: DEFAULT_LANGUAGE, t: (key) => key })
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => readLanguage({ getItem: (key) => window.localStorage.getItem(key) }))
  const [persistent, setPersistent] = useState(true)
  const chooseLanguage = useCallback((value) => {
    if (!isLanguage(value)) return
    setLanguage(value)
    try {
      window.localStorage.setItem(LANGUAGE_KEY, value)
      setPersistent(true)
    } catch {
      setPersistent(false)
    }
  }, [])
  useEffect(() => {
    document.documentElement.lang = language
    const sync = (event) => {
      if (event.key === LANGUAGE_KEY || event.key === null)
        setLanguage(isLanguage(event.newValue) ? event.newValue : DEFAULT_LANGUAGE)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [language])
  const value = useMemo(() => ({
    language,
    setLanguage: chooseLanguage,
    persistent,
    t: (key, values) => translate(language === 'ja' ? ja : {}, key, values),
  }), [language, chooseLanguage, persistent])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export const useLanguage = () => useContext(LanguageContext)

export function LanguageSelector({ profile = false }) {
  const { language, setLanguage, t, persistent } = useLanguage()
  return (
    <label className={`aw-language ${profile ? 'aw-language-profile' : ''}`}>
      {profile ? <span>{t('Explanation language')}</span> : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" />
        </svg>
      )}
      <select aria-label={t('Explanation language')} value={language} onChange={(event) => setLanguage(event.target.value)}>
        {languages.map((item) => <option key={item.id} value={item.id} lang={item.id}>{item.label}</option>)}
      </select>
      {profile && <small>{t('English phrases stay in English. Choose the language for explanations and menus.')}</small>}
      {profile && !persistent && <small role="status">{t('Your language choice is saved for this visit only.')}</small>}
    </label>
  )
}
