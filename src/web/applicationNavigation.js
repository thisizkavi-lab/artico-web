import { ieltsPath } from './ieltsNavigation'

export const applicationMode = route => route.view === 'practice' || route.mode === 'practice' || (route.lesson === 'blueprint' && !route.mode) ? 'practice' : 'study'

export function applicationPath(route, mode = applicationMode(route), { home = false } = {}) {
  const base = '/application/' + route.id
  if (route.exam === 'ielts') {
    const area = home ? 'home' : route.area || 'home'
    if (mode === 'study' && ['mock','mocks','simulation'].includes(area)) return ieltsPath('home', mode)
    return ieltsPath(area, mode, !home && (mode === 'practice' || area === 'guided') ? route.task : undefined,
      !home && mode === 'practice' ? route.attempt : undefined)
  }
  if (route.exam === 'toeic') return base + '/toeic/' + (home ? 'home' : route.area || 'home') + '/' + mode
  if (route.id === 'reading') return base + '/' + (home ? 'home' : route.collection || 'home') + '/' + mode + (!home && route.text ? '?text=' + encodeURIComponent(route.text) : '')
  if (route.id === 'writing') {
    const query = new URLSearchParams()
    if (!home && route.prompt) query.set('prompt', route.prompt)
    if (!home && route.search) query.set('q', route.search)
    return base + '/' + (home ? 'home' : route.category || 'home') + '/' + mode + (query.size ? '?' + query : '')
  }
  const item = home ? 'home' : route.chapter || route.lesson || 'home'
  return base + '/' + item + '/' + mode + (!home && route.task && mode === 'practice' ? '?task=' + encodeURIComponent(route.task) : '')
}
