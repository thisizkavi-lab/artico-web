import { CourseDirectory } from './CourseNavigation'
import { ieltsAreas, ieltsPath, ieltsStudyPath } from './ieltsNavigation'

export default function IeltsHomeDirectory({ mode = 'study' }) {
  return <>
    <h1 className="cn-sr-only">{mode === 'practice' ? 'IELTS Practice' : 'IELTS Academic'}</h1>
    <CourseDirectory label="IELTS sections" items={ieltsAreas.map(item => ({
      ...item,
      wide: ['overview', 'mock'].includes(item.id),
      tone: { reading:'green', writing:'purple', speaking:'warm' }[item.id] || 'blue',
      href: '#' + (item.id === 'overview' ? ieltsStudyPath('overview', 'ov-what-ielts-measures') : ieltsPath(item.id, item.id === 'mock' ? 'practice' : mode)),
    }))}/>
  </>
}
