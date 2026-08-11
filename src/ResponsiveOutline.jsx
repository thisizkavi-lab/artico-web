import { useState } from 'react'

/**
 * A shared page outline that stays quiet on desktop and becomes an
 * accessible disclosure on narrow screens. The link markup remains inside a
 * real nav so the course scroll/highlight controller can treat every lesson
 * outline the same way.
 */
export function ResponsiveOutline({ className, ariaLabel, label = 'On this page', children }) {
  const [open, setOpen] = useState(false)

  return (
    <aside className={className} aria-label={ariaLabel}>
      <button
        type="button"
        className="responsive-outline-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <span className="responsive-outline-toggle-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <span className="responsive-outline-desktop-label">{label}</span>
      <nav className={`responsive-outline-nav${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
        {children}
      </nav>
    </aside>
  )
}
