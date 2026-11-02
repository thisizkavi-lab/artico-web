import { breadcrumbItems } from './breadcrumbPaths'
import './breadcrumbs.css'

export default function Breadcrumbs({ route, ...context }) {
  return <nav className="aw-breadcrumbs" aria-label={context.language === 'ja' ? '現在の位置' : 'Breadcrumb'}>
    <ol>{breadcrumbItems(route, context).map((item, index) => <li key={index}>
      {index > 0 && <span className="aw-breadcrumb-separator" aria-hidden="true">/</span>}
      {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
    </li>)}</ol>
  </nav>
}
