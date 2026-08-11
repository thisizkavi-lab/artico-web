export function SidebarToggle({ collapsed, onToggle }) {
  return (
    <div className="sidebar-toggle-row">
      <button
        type="button"
        className="sidebar-toggle"
        aria-label={collapsed ? 'Expand course navigation' : 'Collapse course navigation'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expand course navigation' : 'Collapse course navigation'}
        onClick={onToggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <span>Course navigation</span>
      </button>
    </div>
  )
}
