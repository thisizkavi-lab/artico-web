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
    <div className={`aw-language ${profile ? 'aw-language-profile' : ''}`}>
      {profile && <span className="aw-language-label">{t('Explanation language')}</span>}
      <div className="aw-language-toggle" role="group" aria-label={t('Explanation language')}>
        {[...languages].reverse().map((item) => (
          <button
            key={item.id}
            type="button"
            lang={item.id}
            className="aw-language-option"
            aria-pressed={language === item.id}
            onClick={() => setLanguage(item.id)}
          >
            {item.id === 'en' ? 'EN' : item.label}
          </button>
        ))}
      </div>
      {profile && <small>{t('English phrases stay in English. Choose the language for explanations and menus.')}</small>}
      {profile && !persistent && <small role="status">{t('Your language choice is saved for this visit only.')}</small>}
    </div>
  )
}
