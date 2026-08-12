export function SidebarToggle({ collapsed, expanded, onToggle, className = '' }) {
  const isExpanded = typeof expanded === 'boolean' ? expanded : !collapsed

  return (
    <button
      type="button"
      className={`sidebar-toggle${className ? ` ${className}` : ''}`}
      aria-label={isExpanded ? 'Collapse course navigation' : 'Expand course navigation'}
      aria-expanded={isExpanded}
      title={isExpanded ? 'Collapse course navigation' : 'Expand course navigation'}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="7" height="14" rx="1" />
        <path d="M13 5h6v14h-6" />
      </svg>
    </button>
  )
}
