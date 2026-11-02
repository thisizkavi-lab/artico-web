import CurriculumIcon from './CurriculumIcon'
import './course-navigation.css'

const tones = ['blue', 'green', 'purple', 'warm']

export function scrollCourseTop() {
  window.requestAnimationFrame(() => document.getElementById('aw-content')?.scrollTo({ top:0, behavior:'instant' }))
}

function Chevron({ down = false }) {
  return <svg className={'cn-chevron' + (down ? ' cn-chevron-down' : '')} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
}

export function CourseIndex({ title, children, className = '' }) {
  return <div className={'aw-page cn-index ' + className}>
    <h1 className="cn-sr-only">{title}</h1>
    {children}
  </div>
}

export function CourseDirectory({ items, label }) {
  return <nav className="cn-directory" aria-label={label}>{items.map((item, index) => {
    const body = <>
      <span className="cn-icon" aria-hidden="true"><CurriculumIcon name={item.icon || 'book'} size={25}/></span>
      <span className="cn-copy"><strong>{item.title}</strong>{item.summary && <span>{item.summary}</span>}</span>
      <Chevron/>
    </>
    const props = { className: `cn-card cn-${item.tone || tones[index % tones.length]}${item.wide ? ' cn-wide' : ''}` }
    return item.onClick
      ? <button {...props} type="button" key={item.id} onClick={item.onClick}>{body}</button>
      : <a {...props} key={item.id} href={item.href}>{body}</a>
  })}</nav>
}

export function CourseTree({ groups, label }) {
  return <nav className="cn-tree" aria-label={label}>{groups.map((group, index) => <details key={group.id} className={`cn-group cn-${group.tone || tones[index % tones.length]}`} open={group.open || undefined}>
    <summary>
      <span className="cn-group-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className="cn-icon" aria-hidden="true"><CurriculumIcon name={group.icon || 'book'} size={25}/></span>
      <span className="cn-copy"><strong>{group.title}</strong>{group.summary && <span>{group.summary}</span>}</span>
      <Chevron down/>
    </summary>
    <ol className="cn-branches">{group.items.map((item, itemIndex) => <li key={item.id}>
      {item.onClick ? <button type="button" onClick={item.onClick}><Branch item={item} index={itemIndex}/></button>
        : <a href={item.href}><Branch item={item} index={itemIndex}/></a>}
    </li>)}</ol>
  </details>)}</nav>
}

function Branch({ item, index }) {
  return <><span className="cn-branch-number">{item.number || String(index + 1).padStart(2, '0')}</span><span className="cn-branch-copy"><strong>{item.title}</strong>{item.status && <small>{item.status}</small>}</span><Chevron/></>
}
