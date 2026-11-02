import { applicationMode, applicationPath } from './applicationNavigation'
import { applicationTrack } from './applicationTracks'
import { ieltsArea } from './ieltsNavigation'

export function breadcrumbItems(route, { t = value => value, language = 'en', foundationTitle, stageTitle } = {}) {
  const ja = language === 'ja'
  const learn = { label:t('Learn'), href:'#/courses' }
  const application = { label:ja ? '実践' : 'Application', href:'#/courses?application' }
  let items
  if (route.page === 'application') {
    items = [learn, application]
    if (route.id) items.push({ label:ja ? applicationTrack(route.id)?.ja || route.id : applicationTrack(route.id)?.en || route.id, href:route.id === 'tests' ? '#/application/tests' : '#' + applicationPath(route, applicationMode(route), { home:true }) })
    if (route.exam) {
      items.push({ label:route.exam === 'ielts' ? 'IELTS Academic' : 'TOEIC Listening & Reading', href:'#' + applicationPath(route, applicationMode(route), { home:true }) })
      if (route.area && route.area !== 'home') items.push({ label:(route.exam === 'ielts' ? ieltsArea(route.area)?.title : { overview:'Everything about TOEIC', listening:'Listening', reading:'Reading', mocks:'Mock Tests' }[route.area]) || route.area, href:`#/application/tests/${route.exam}/${route.area}${route.exam === 'ielts' ? '/' + route.view : route.view ? '/' + route.view : ''}` })
      if (route.task) items.push({ label:t('Practice'), href:'#' + route.path })
    } else if (route.chapter || (route.lesson && route.lesson !== 'home')) {
      const chapter = route.chapter || route.lesson
      items.push({ label:{ introduction:'About this guide', guide:'Course guide & resources', blueprint:'Presentation blueprint', cases:'Worked presentations' }[chapter] || chapter, href:'#' + route.path })
    } else if (route.category && route.category !== 'home') {
      items.push({ label:route.category === 'drafts' ? (ja ? '自分の下書き' : 'My drafts') : route.category === 'all' ? (ja ? 'すべてのテーマ' : 'All prompts') : route.category.replace(/^c/, ''), href:'#' + route.path })
    } else if (route.collection && route.collection !== 'home') {
      items.push({ label:route.collection === 'saved' ? (ja ? '保存した単語と表現' : 'Saved words & expressions') : route.collection[0].toUpperCase() + route.collection.slice(1), href:`#/application/reading/${route.collection}/${route.view}` })
      if (route.text) items.push({ label:ja ? '読む' : 'Reading', href:'#' + route.path })
    }
  } else if (route.page === 'lesson') items = [learn, { label:t('Social Fluency'), href:'#/courses?social' }, { label:route.id, href:'#' + route.path }]
  else if (route.page === 'vocabulary') {
    items = [learn, { label:ja ? '語彙' : 'Vocabulary', href:'#/lesson/98/study' }]
    if (route.topic) items.push({ label:route.topic, href:'#' + route.path })
  } else if (route.page === 'foundation') {
    const orientation = ['orientation', 'how-it-works'].includes(route.id)
    items = [orientation ? { label:t('Home'), href:'#/home' } : learn]
    if (!orientation) items.push({ label:t(stageTitle || 'Level Zero'), href:'#/courses?foundation' })
    items.push({ label:foundationTitle || route.id, href:'#' + route.path })
  } else if (route.page === 'saved') items = [{ label:t('Progress'), href:'#/progress' }, { label:t('Saved phrases'), href:'#/saved' }]
  else items = [{ label:t({ home:'Home', courses:'Learn', progress:'Progress', practice:'Practice' }[route.page] || 'Learn'), href:'#' + route.path }]
  return items.map((item, index) => index === items.length - 1 ? { label:item.label } : item)
}
