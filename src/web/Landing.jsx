import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './Language'
import { landingPageCopy } from './landingCopy'
import './landing.css'

export default function Landing() {
  const { language, setLanguage } = useLanguage()
  const copy = landingPageCopy[language]
  const pathRef = useRef(null)
  const mainRef = useRef(null)
  const languageMenuRef = useRef(null)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackStatus, setFeedbackStatus] = useState('')
  const feedbackInputRef = useRef(null)

  useEffect(() => {
    document.title = copy.pageTitle
  }, [copy.pageTitle])

  useEffect(() => {
    if (!languageOpen) return undefined
    const closeOnOutside = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) setLanguageOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false)
        languageMenuRef.current?.querySelector('.al-language-trigger')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [languageOpen])

  useEffect(() => {
    if (!feedbackOpen) return undefined
    const onEscape = (event) => {
      if (event.key === 'Escape') setFeedbackOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    feedbackInputRef.current?.focus()
    return () => document.removeEventListener('keydown', onEscape)
  }, [feedbackOpen])

  async function shareFeedback() {
    const message = feedbackText.trim()
    if (!message) return
    const body = `Artico feedback:\n\n${message}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Artico feedback', text: body })
        setFeedbackStatus(copy.feedbackShared)
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(body)
      setFeedbackStatus(copy.feedbackCopied)
    } catch {
      setFeedbackStatus(copy.feedbackCopyFailed)
      feedbackInputRef.current?.select()
    }
  }

  function chooseLanguage(next) {
    setLanguage(next)
    setLanguageOpen(false)
    languageMenuRef.current?.querySelector('.al-language-trigger')?.focus()
  }

  function scrollTo(ref) {
    const target = ref.current
    target.focus({ preventScroll: true })
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="aw-landing" data-language={language}>
      <a className="al-skip" href="#al-content" onClick={(event) => { event.preventDefault(); scrollTo(mainRef) }}>{copy.skip}</a>
      <header className="al-site-header">
        <div className="al-site-header-inner">
          <a className="al-header-logo artico-wordmark" href="#/landing"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={copy.backToLanding}>
            artico<span className="artico-wordmark-dot" aria-hidden="true">.</span>
          </a>
          <nav className="al-header-nav" aria-label={copy.navigation}>
            <button type="button" onClick={() => document.getElementById('al-why-title')?.scrollIntoView({ behavior: 'smooth' })}>{copy.whyLink}</button>
            <button type="button" onClick={() => scrollTo(pathRef)}>{copy.journeyLink}</button>
          </nav>
          <div className="al-header-actions">
            <div className="al-language-picker" ref={languageMenuRef}>
              <button className="al-language-trigger" type="button"
                aria-label={copy.languageTrigger}
                aria-expanded={languageOpen} aria-controls="al-language-options"
                onClick={() => setLanguageOpen((open) => !open)}>
                <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c-2.6 2.5-3.9 5.5-3.9 9s1.3 6.5 3.9 9M12 3c2.6 2.5 3.9 5.5 3.9 9s-1.3 6.5-3.9 9" />
                </svg>
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="m3 6 5 5 5-5" /></svg>
              </button>
              {languageOpen && (
                <div className="al-language-popover" id="al-language-options" role="group" aria-label={copy.selectLanguage}>
                  <button type="button" lang="ja" aria-pressed={language === 'ja'}
                    onClick={() => chooseLanguage('ja')}>
                    <span className="al-language-flag" aria-hidden="true">🇯🇵</span>
                    <span>日本語</span>
                    {language === 'ja' && <span className="al-language-check" aria-hidden="true">✓</span>}
                  </button>
                  <button type="button" lang="en" aria-pressed={language === 'en'}
                    onClick={() => chooseLanguage('en')}>
                    <span className="al-language-flag" aria-hidden="true">🇺🇸</span>
                    <span>English</span>
                    {language === 'en' && <span className="al-language-check" aria-hidden="true">✓</span>}
                  </button>
                </div>
              )}
            </div>
            <a className="al-header-start" href="#/home">{copy.start}</a>
          </div>
        </div>
      </header>
      <main ref={mainRef} id="al-content" tabIndex={-1}>
        <section className="al-splash" aria-labelledby="al-title">
          <img
            className="al-splash-art"
            src={`${import.meta.env.BASE_URL}assets/landing/artico-mountain-journey.webp`}
            width="1672"
            height="941"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="al-splash-content">
            <h1 className="al-splash-title" id="al-title" lang={language}>
              <span>{copy.heroTitle[0]}</span>{' '}
              <span>{copy.heroTitle[1]}</span>
            </h1>
            <p className="al-splash-description" lang={language}>{copy.heroDescription}</p>
            <a className="al-splash-cta" href="#/home">{copy.start}</a>
          </div>
        </section>
        <section className="al-why" lang={language} aria-labelledby="al-why-title">
          <div className="al-why-inner">
            <header className="al-why-heading">
              <p className="al-why-overline">{copy.whyEyebrow}</p>
              <h2 id="al-why-title">{language === 'en' && copy.whyTitle.endsWith('?')
                ? <>{copy.whyTitle.slice(0, -1)}<span className="al-why-question-mark">?</span></>
                : copy.whyTitle}</h2>
              <span className="al-why-accent" aria-hidden="true" />
            </header>
            <div className="al-why-story">
              {copy.whyParagraphs.map((paragraph, index) => (
                <p key={index} className={paragraph.kind === 'lead' ? 'al-why-lead' : paragraph.kind === 'finish' ? 'al-why-finish' : undefined}>
                  {paragraph.runs.map((run, runIndex) =>
                    typeof run === 'string' ? run : <mark key={runIndex}>{run.mark}</mark>
                  )}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="al-journey" ref={pathRef} tabIndex={-1} aria-labelledby="al-path-title">
          <h2 id="al-path-title" className="al-sr-only">{copy.journeyTitle}</h2>
          <div className="al-journey-inner">
            <div className="al-journey-illustration">
              <div className="al-route-scene" role="img" aria-label={copy.journeyAria}>
                <svg className="al-route-lines al-route-lines-desktop" viewBox="0 0 780 640" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M140 474 C206 475 239 412 305 362 S408 295 470 256 S568 185 635 151"
                    fill="none" stroke="#3e4945" strokeWidth="5" strokeLinecap="round" strokeDasharray="11 12" />
                </svg>
                <svg className="al-route-lines al-route-lines-mobile" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M156 155 H445 C535 155 545 330 445 330 H155 V452 H445"
                    fill="none" stroke="#3e4945" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 12" />
                </svg>
                {['raw-mechanics', 'social-fluency', 'application', 'apex-communicator'].map((slug, index) => (
                  <figure className={`al-route-stop al-route-stop-${index + 1}`} key={slug}>
                    <img
                      src={`${import.meta.env.BASE_URL}assets/landing/artico-${slug}.png`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="630"
                      height="630"
                    />
                    <figcaption lang={language}>{copy.illustrationLabels[index]}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="al-journey-cards">
              {copy.stages.map((stage, index) => (
                <div key={index} className={`al-journey-card${index === 3 ? ' al-journey-card-future' : ''}`}>
                  <h3>{stage.title}</h3>
                  <p className="al-journey-tagline">{stage.tagline}</p>
                  <p>{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="al-final-cta" aria-labelledby="al-closing-title">
          <div className="al-final-cta-inner">
            <h2 id="al-closing-title">{copy.closing}</h2>
            <a href="#/home" className="al-final-cta-button">{copy.start}</a>
          </div>
        </section>
      </main>
      <footer className="al-footer">
        <div className="al-footer-main">
          <div className="al-footer-brand">
            <a className="al-footer-logo artico-wordmark" href="#/landing"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={copy.backToLanding}>artico<span className="artico-wordmark-dot" aria-hidden="true">.</span></a>
            <p className="al-footer-tagline">{copy.footerTagline}</p>
          </div>
          <nav className="al-footer-directory" aria-label={copy.footerNavigation}>
            <div className="al-footer-column">
              <h3>{copy.footerAbout}</h3>
              <a href="#al-why-title" onClick={(event) => { event.preventDefault(); document.getElementById('al-why-title')?.scrollIntoView({ behavior: 'smooth' }) }}>{copy.whyLink}</a>
              <a href="#al-path-title" onClick={(event) => { event.preventDefault(); scrollTo(pathRef) }}>{copy.journeyLink}</a>
            </div>
            <div className="al-footer-column">
              <h3>{copy.footerResources}</h3>
              <a href="#/foundation/how-it-works/study">{copy.footerHowTo}</a>
              <a href="https://github.com/thisizkavi-lab/artico-web/blob/main/public/vocabulary-symbols/ATTRIBUTION.md" target="_blank" rel="noopener noreferrer">{copy.footerArtCredits}</a>
            </div>
            <div className="al-footer-column">
              <h3>{copy.footerSupport}</h3>
              <button type="button" onClick={() => { setFeedbackOpen(true); setFeedbackStatus('') }}>{copy.footerFeedback}</button>
            </div>
          </nav>
        </div>
        <div className="al-footer-bottom">
          <span>© {new Date().getFullYear()} Artico</span>
        </div>
      </footer>
      {feedbackOpen && (
        <div className="al-feedback-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFeedbackOpen(false) }}>
          <section className="al-feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="al-feedback-title" lang={language}>
            <div className="al-feedback-head">
              <h2 id="al-feedback-title">{copy.feedbackTitle}</h2>
              <button className="al-feedback-close" type="button" aria-label={copy.feedbackClose}
                onClick={() => setFeedbackOpen(false)}>×</button>
            </div>
            <p className="al-feedback-description">{copy.feedbackNote}</p>
            <label htmlFor="al-feedback-message">{copy.feedbackPrompt}</label>
            <textarea id="al-feedback-message" ref={feedbackInputRef} rows={5}
              value={feedbackText} onChange={(event) => { setFeedbackText(event.target.value); setFeedbackStatus('') }}
              placeholder={copy.feedbackPlaceholder} />
            <button type="button" className="al-feedback-share" disabled={!feedbackText.trim()}
              onClick={shareFeedback}>{copy.feedbackShare}</button>
            {feedbackStatus && <p role="status" className="al-feedback-status">{feedbackStatus}</p>}
          </section>
        </div>
      )}
    </div>
  )
}
