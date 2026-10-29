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
            src={`${import.meta.env.BASE_URL}landing-hero-background.svg`}
            width="2048"
            height="996"
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
              <h2 id="al-why-title">{copy.whyTitle}</h2>
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
              <svg className="al-route-art" viewBox="0 0 780 640" role="img"
                aria-label={copy.journeyAria}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M140 476 C224 470 232 387 304 365 S399 290 470 257 S555 188 635 152"
                  fill="none" stroke="#3c4541" strokeWidth="5" strokeLinecap="round" strokeDasharray="11 13" />
                <g transform="translate(140 476)">
                  <circle r="84" fill="#e4edf4" stroke="#adc5d7" strokeWidth="2"/>
                  <circle r="67" fill="#f9fcff" opacity=".6"/>
                  <path d="M-43 29V-17q23-12 43 0v46q-20-12-43 0Zm43 0v-46q20-12 43 0v46q-23-12-43 0Z"
                    fill="#fff9df" stroke="#394b57" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M0-16V30M-34-7h25M9-7h25" stroke="#b8b2a2" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="-49" y="-59" width="32" height="31" rx="5" fill="#f4ce73" stroke="#374a54" strokeWidth="2"/>
                  <text x="-33" y="-37" textAnchor="middle" fontSize="20" fontWeight="700" fill="#35475a">A</text>
                  <rect x="-12" y="-68" width="32" height="31" rx="5" fill="#afd5c1" stroke="#374a54" strokeWidth="2"/>
                  <text x="4" y="-46" textAnchor="middle" fontSize="20" fontWeight="700" fill="#35475a">B</text>
                  <rect x="25" y="-59" width="32" height="31" rx="5" fill="#b1cdeb" stroke="#374a54" strokeWidth="2"/>
                  <text x="41" y="-37" textAnchor="middle" fontSize="20" fontWeight="700" fill="#35475a">C</text>
                  <rect x="-100" y="94" width="200" height="38" rx="19" fill="#fffefa" stroke="#d9d8cf" strokeWidth="1.5"/>
                  <text x="0" y="119" textAnchor="middle" fontSize="17" fontWeight="700" fill="#273637">{copy.illustrationLabels[0]}</text>
                </g>
                <g transform="translate(305 364)">
                  <circle r="84" fill="#e4f1e8" stroke="#b4d5c4" strokeWidth="2"/>
                  <circle r="67" fill="#fafffb" opacity=".65"/>
                  <path d="M-53-60h48q11 0 11 11v23q0 11-11 11h-19l-13 13v-13h-16q-10 0-10-11v-23q0-11 10-11Z"
                    fill="#c0e3d2" stroke="#49675b" strokeWidth="2.3"/>
                  <path d="M19-75h40q11 0 11 11v21q0 10-11 10H44l-13 13v-13H19q-10 0-10-10v-21q0-11 10-11Z"
                    fill="#d1e4fa" stroke="#49675b" strokeWidth="2.3"/>
                  <path d="M-47-36h32M25-52h29M32-61h22" stroke="#6d9889" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M-59 56v-15q0-30 28-32 29 2 29 32v15Z" fill="#5c9b8d"/>
                  <circle cx="-31" cy="-13" r="23" fill="#d9ac89"/>
                  <path d="M-53-15q-4-25 19-28 25-4 26 27-14-5-22-15-10 12-23 16Z" fill="#40332e"/>
                  <path d="M5 56v-15q0-30 28-32 29 2 29 32v15Z" fill="#6d89b4"/>
                  <circle cx="33" cy="-13" r="23" fill="#e7bb96"/>
                  <path d="M11-16q0-28 23-29 26 0 25 30-15-6-22-17-12 13-26 16Z" fill="#383333"/>
                  <path d="M-40-10h2m13 0h2m45 0h2m13 0h2" stroke="#3b3d39" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M-39 1q8 7 15 0M24 1q8 7 15 0" stroke="#734f42" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <rect x="-100" y="94" width="200" height="38" rx="19" fill="#fffefa" stroke="#d9d8cf" strokeWidth="1.5"/>
                  <text x="0" y="119" textAnchor="middle" fontSize="17" fontWeight="700" fill="#273637">{copy.illustrationLabels[1]}</text>
                </g>
                <g transform="translate(470 257)">
                  <circle r="84" fill="#fff0d8" stroke="#e5ca9d" strokeWidth="2"/>
                  <circle r="67" fill="#fffbf3" opacity=".7"/>
                  <rect x="22" y="-10" width="42" height="41" rx="6" fill="#b7cadd" stroke="#4f6476" strokeWidth="2.5"/>
                  <path d="M32 3h23M32 13h18M32 23h13" stroke="#718da7" strokeWidth="2.4" strokeLinecap="round"/>
                  <path d="M-53 64v-28q0-34 29-43l18 13L12-7q31 9 31 43v28Z" fill="#7185a5" stroke="#465469" strokeWidth="2"/>
                  <path d="M-16 7l11 15L5 7l-4-12h-13Z" fill="#fff"/>
                  <path d="M-5 22-12 54h15Z" fill="#e9ac67"/>
                  <circle cx="-6" cy="-34" r="26" fill="#ebbc94"/>
                  <path d="M-30-36q-5-29 26-31 28 1 26 33-15-4-23-18-11 12-29 16Z" fill="#43352e"/>
                  <path d="M-16-29h2m18 0h2m-14 12q6 5 13 0" stroke="#44362f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <rect x="22" y="40" width="42" height="32" rx="5" fill="#8d6d4e" stroke="#564431" strokeWidth="2.5"/>
                  <path d="M32 40v-8q10-11 20 0v8" stroke="#564431" strokeWidth="3" fill="none"/>
                  <rect x="-100" y="94" width="200" height="38" rx="19" fill="#fffefa" stroke="#d9d8cf" strokeWidth="1.5"/>
                  <text x="0" y="119" textAnchor="middle" fontSize="17" fontWeight="700" fill="#273637">{copy.illustrationLabels[2]}</text>
                </g>
                <g transform="translate(635 152)">
                  <circle r="84" fill="#e9e7f4" stroke="#cec6e5" strokeWidth="2"/>
                  <circle r="67" fill="#fdfbff" opacity=".7"/>
                  <path d="M-51 63v-20q2-33 37-38h29q35 5 37 38v20Z" fill="#eebf63" stroke="#856b3d" strokeWidth="2"/>
                  <circle cx="0" cy="-29" r="30" fill="#e9bd97"/>
                  <path d="M-29-31q-2-37 31-37 34 1 30 37-14-7-22-20-14 14-39 20Z" fill="#3c322e"/>
                  <path d="M-30-30q-11-29 8-43M29-73q20 14 11 43" fill="none" stroke="#52596a" strokeWidth="8" strokeLinecap="round"/>
                  <rect x="-38" y="-35" width="14" height="35" rx="6" fill="#52596a"/>
                  <rect x="24" y="-35" width="14" height="35" rx="6" fill="#52596a"/>
                  <path d="M30-3q-2 15-23 18" fill="none" stroke="#52596a" strokeWidth="3.5"/>
                  <circle cx="7" cy="15" r="4" fill="#52596a"/>
                  <path d="M-11-25h3m18 0h3m-17 12q9 7 17 0" stroke="#5b4339" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M-55-10h-14V23h26V-10h-12ZM-56 23v24m-17 0h34" fill="#5c6570" stroke="#343b45" strokeWidth="2.5" strokeLinecap="round"/>
                  <rect x="-100" y="94" width="200" height="38" rx="19" fill="#fffefa" stroke="#d9d8cf" strokeWidth="1.5"/>
                  <text x="0" y="119" textAnchor="middle" fontSize="17" fontWeight="700" fill="#273637">{copy.illustrationLabels[3]}</text>
                </g>
              </svg>
            </div>
            <div className="al-journey-cards">
              {copy.stages.map((stage, index) => (
                <div key={index} className={`al-journey-card${stage.note ? ' al-journey-card-future' : ''}`}>
                  <h3>{stage.title}</h3>
                  <p className="al-journey-tagline">{stage.tagline}</p>
                  <p>{stage.description}</p>
                  {stage.note && <span className="al-journey-vision">{stage.note}</span>}
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
