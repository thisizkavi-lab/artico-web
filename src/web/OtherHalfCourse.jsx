import { CourseContents } from './ApplicationCourseShell'
import ApplicationPractice from './ApplicationPractice'
import { otherHalfPractice } from './otherHalfPractice'
import { applicationMode } from './applicationNavigation'
import { CourseIndex, CourseDirectory, CourseTree } from './CourseNavigation'
import { useMemo, useState } from 'react'
import { otherHalfChapters, otherHalfGroups, otherHalfIntro, otherHalfTopics } from './otherHalfContent'
import './other-half-course.css'

const root = '#/application/other-half'
const chapterPath = (number) => root + '/' + String(number).padStart(2, '0')
const availableChapters = otherHalfChapters.filter(chapter => !chapter.missing)

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function inline(text) {
  const tokens = String(text).split(/(\*\*[^*]+\*\*|\*[^*]+\*|\x60[^\x60]+\x60|\[[^\]]+\]\([^)]+\))/g)
  return tokens.map((token, index) => {
    if (!token) return null
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={index}>{token.slice(2, -2)}</strong>
    if (token.startsWith('*') && token.endsWith('*')) return <em key={index}>{token.slice(1, -1)}</em>
    if (token.charCodeAt(0) === 96) return <code key={index}>{token.slice(1, -1)}</code>
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a key={index} href={link[2]} target={link[2].startsWith('http') ? '_blank' : undefined} rel={link[2].startsWith('http') ? 'noopener noreferrer' : undefined}>{link[1]}</a>
    return token
  })
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())
}

function parseBlocks(markdown) {
  const lines = String(markdown || '').replace(/\r/g, '').split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed || /^---+$/.test(trimmed)) { i++; continue }
    if (/^\*\*End of (?:document|list)\.\*\*$/.test(trimmed) || /^\*\*End of complete course materials\.\*\*$/.test(trimmed)) { i++; continue }
    if (/^# /.test(trimmed)) { i++; continue }
    if (/^## /.test(trimmed)) {
      blocks.push({ type:'h2', text:trimmed.replace(/^##\s+/, '') })
      i++
      continue
    }
    if (/^### /.test(trimmed)) {
      blocks.push({ type:'h3', text:trimmed.replace(/^###\s+/, '') })
      i++
      continue
    }
    if (trimmed.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = splitTableRow(lines[i])
        const separator = cells.every(cell => /^:?-{3,}:?$/.test(cell))
        if (!separator) rows.push(cells)
        i++
      }
      if (rows.length > 1) blocks.push({ type:'table', headers:rows[0], rows:rows.slice(1) })
      continue
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line)
      const marker = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/
      const items = []
      while (i < lines.length) {
        const current = lines[i]
        if (marker.test(current)) {
          items.push(current.replace(marker, '').trim())
          i++
        } else if (/^\s{2,}\S/.test(current) && items.length) {
          items[items.length - 1] += ' ' + current.trim()
          i++
        } else break
      }
      blocks.push({ type:'list', ordered, items })
      continue
    }
    if (trimmed.startsWith('>')) {
      const quote = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push({ type:'quote', text:quote.join(' ') })
      continue
    }
    const paragraph = []
    while (i < lines.length) {
      const current = lines[i]
      const currentTrimmed = current.trim()
      if (!currentTrimmed || /^---+$/.test(currentTrimmed) || /^# /.test(currentTrimmed) || /^## /.test(currentTrimmed) || /^### /.test(currentTrimmed) || currentTrimmed.startsWith('|') || /^\s*[-*]\s+/.test(current) || /^\s*\d+\.\s+/.test(current) || currentTrimmed.startsWith('>')) break
      if (/^\*\*End of (?:document|list)\.\*\*$/.test(currentTrimmed) || /^\*\*End of complete course materials\.\*\*$/.test(currentTrimmed)) break
      paragraph.push(currentTrimmed)
      i++
    }
    if (paragraph.length) blocks.push({ type:'paragraph', text:paragraph.join(' ') })
    else i++
  }
  return blocks
}

function parseDocument(markdown) {
  const blocks = parseBlocks(markdown)
  const intro = []
  const sections = []
  let current = null
  blocks.forEach(block => {
    if (block.type === 'h2') {
      current = { title:block.text, id:slugify(block.text), blocks:[] }
      sections.push(current)
    } else if (current) current.blocks.push(block)
    else intro.push(block)
  })
  return { intro, sections }
}

function MarkdownTable({ block, searchable, query }) {
  const headers = block.headers || []
  const rows = block.rows || []
  const filtered = searchable && query
    ? rows.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase()))
    : rows
  if (searchable && headers.length > 1) {
    return <div className="oh-glossary-grid">
      {filtered.map((row, index) => <article className="oh-glossary-card" key={index}>
        <strong className="oh-glossary-term">{inline(row[0] || '')}</strong>
        <div className="oh-glossary-fields">
          {row.slice(1).map((cell, cellIndex) => <div className="oh-glossary-field" key={cellIndex}>
            <small>{headers[cellIndex + 1] || 'Note'}</small>
            <span>{inline(cell)}</span>
          </div>)}
        </div>
      </article>)}
      {!filtered.length && <p className="oh-no-results">No matching entries in this section.</p>}
    </div>
  }
  return <div className="oh-table-scroll"><table className="oh-table">
    <thead><tr>{headers.map((header, index) => <th key={index}>{inline(header)}</th>)}</tr></thead>
    <tbody>{filtered.map((row, index) => <tr key={index}>{headers.map((header, cellIndex) => <td key={cellIndex}>{inline(row[cellIndex] || '')}</td>)}</tr>)}</tbody>
  </table></div>
}

function MarkdownBlock({ block, searchable, query }) {
  if (block.type === 'h3') return <h3 className="oh-subheading">{inline(block.text)}</h3>
  if (block.type === 'table') return <MarkdownTable block={block} searchable={searchable} query={query}/>
  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul'
    return <List className={block.ordered ? 'oh-list oh-list-numbered' : 'oh-list'}>{block.items.map((item, index) => <li key={index}>{inline(item)}</li>)}</List>
  }
  if (block.type === 'quote') return <blockquote className="oh-quote">{inline(block.text)}</blockquote>
  if (block.type === 'paragraph') {
    const note = /\*\*(?:Important note|Important|Practical recommendation|Advice for Non-Native Speakers|Usage Guidance)/i.test(block.text)
    const example = /^\*\*(?:Example|Situation|Casual positive|Social|Critical)/i.test(block.text)
    return <p className={note ? 'oh-paragraph oh-note' : example ? 'oh-paragraph oh-example' : 'oh-paragraph'}>{inline(block.text)}</p>
  }
  return null
}

const chapterVisuals = {
  1: { type:'flow', eyebrow:'HOW SLANG TRAVELS', title:'A word moves through people.', description:'A common path from a small group into wider use.', items:['Small group','Local or subculture use','Music, film, and social media','Mainstream adoption','Dies, becomes outdated, or enters standard English'] },
  4: { type:'scale', eyebrow:'THE FORMALITY SCALE', title:'Formality is continuous, not binary.', description:'The same message can move across five levels.', items:['Very formal','Formal','Neutral','Informal','Very informal'] },
  5: { type:'flow', eyebrow:'MEANING BEYOND WORDS', title:'The words are only the starting point.', description:'Listeners combine what was said with the situation and what they already know.', items:['Literal words','Context and relationship','Shared knowledge','Implied meaning'] },
  6: { type:'cards', eyebrow:'THE CONVERSATION TOOLKIT', title:'Speech has its own organizing patterns.', description:'These features help speakers plan, connect ideas, and manage turns.', items:[['Discourse markers','Connect ideas and organize talk.'],['Fillers','Hold the floor while the speaker plans.'],['Spoken grammar','Fragments, ellipsis, repetition, and repair.'],['Backchannels','Show that the listener is following.'],['Turn-taking','Hold, yield, or take the floor.']] },
  7: { type:'cards', eyebrow:'NON-LITERAL LANGUAGE', title:'Humor has more than one shape.', description:'Recognize the form before deciding how to respond.', items:[['Teasing','Playful criticism between people with an established relationship.'],['Self-deprecation','Humor directed at oneself.'],['Exaggeration','A deliberately extreme statement.'],['Understatement','A deliberately reduced description.'],['Irony and sarcasm','The literal words differ from the intended meaning.'],['Playfulness','A light, non-serious attitude.']] },
  8: { type:'cards', eyebrow:'FUNCTION BEFORE WORD', title:'Swearing does different jobs.', description:'The function changes how listeners interpret the same taboo word.', items:[['Emotional release','A reaction to pain, surprise, frustration, or anger.'],['Emphasis','A word strengthens the force of a statement.'],['Solidarity','Shared use can mark closeness among peers.'],['Humor','Shock or incongruity can create a comic effect.'],['Insult or aggression','A word is directed at a person to attack or demean.'],['Catharsis','Swearing can affect pain response in some situations.']] },
  9: { type:'flow', eyebrow:'SHARED KNOWLEDGE', title:'A short reference carries a larger meaning.', description:'The speaker often leaves the background unstated.', items:['A reference is made','The listener recognizes the source','Associated knowledge is retrieved','The knowledge is applied to the situation'] },
  11: { type:'cards', eyebrow:'LANGUAGE INSIDE GROUPS', title:'Different domains develop different language.', description:'Specialized words are efficient for insiders and opaque for outsiders.', items:[['Work and professions','Healthcare, law, finance, software, hospitality, and more.'],['Academic research','Claims, evidence, citation, and discipline-specific terms.'],['Sports and activities','Actions, positions, strategies, and equipment.'],['Gaming and online groups','Mechanics, roles, platform shorthand, and fast-changing terms.'],['Creative scenes','Techniques, aesthetics, equipment, and social roles.'],['Hobbies','Cooking, photography, fitness, collecting, and other interests.']] },
  12: { type:'flow', eyebrow:'LANGUAGE CHANGE', title:'New forms move through social networks.', description:'Some forms stabilize. Others disappear or remain limited to a group.', items:['Innovation','Adoption','Diffusion','Stabilization or loss'] },
  13: { type:'columns', eyebrow:'TWO CHANNELS, ONE INTERACTION', title:'Meaning is carried by voice and body.', description:'Words work together with vocal and visible signals.', columns:[['VOICE',[ 'Pitch','Intonation','Volume','Speed','Pause and silence','Voice quality' ]],['VISIBLE SIGNALS',[ 'Facial expression','Eye contact','Gesture','Posture and orientation','Physical distance','Touch' ]]] },
}

function ChapterVisual({ chapter }) {
  const visual = chapterVisuals[chapter.number]
  if (!visual) return null
  return <section className={'oh-visual oh-visual-kind-' + visual.type} aria-label={visual.title}>
    <div className="oh-visual-heading">
      <span>{visual.eyebrow}</span>
      <h2>{visual.title}</h2>
      <p>{visual.description}</p>
    </div>
    {visual.type === 'flow' && <div className="oh-flow">
      {visual.items.map((item, index) => <div className="oh-flow-step" key={item}>
        <span className="oh-flow-number">{String(index + 1).padStart(2, '0')}</span>
        <strong>{item}</strong>
        {index < visual.items.length - 1 && <span className="oh-flow-arrow" aria-hidden="true">→</span>}
      </div>)}
    </div>}
    {visual.type === 'scale' && <div className="oh-scale">
      {visual.items.map((item, index) => <div className={index === 2 ? 'oh-scale-step is-neutral' : 'oh-scale-step'} key={item}>
        <small>0{index + 1}</small><strong>{item}</strong>
      </div>)}
    </div>}
    {visual.type === 'cards' && <div className="oh-visual-cards">
      {visual.items.map(([title, description], index) => <article key={title}>
        <small>{String(index + 1).padStart(2, '0')}</small><strong>{title}</strong><p>{description}</p>
      </article>)}
    </div>}
    {visual.type === 'columns' && <div className="oh-visual-columns">
      {visual.columns.map(([title, items]) => <article key={title}>
        <span>{title}</span><div>{items.map(item => <b key={item}>{item}</b>)}</div>
      </article>)}
    </div>}
  </section>
}

function CourseGuide({ mode }) {
  return <div className="aw-page oh-page">
    <a className="oh-back" href={root + '/home/' + mode}>← The Other Half of English</a>
    <header className="oh-chapter-header"><h1>About this guide</h1></header>
    <section className="oh-intro-section">
      <div className="oh-section-title">
        <span>THE IDEA</span>
        <h2>Knowing the words is only half the picture.</h2>
        <p>The original course introduction, arranged as a field guide rather than a block of book text.</p>
      </div>
      <div className="oh-intro-grid">
        {otherHalfIntro.map((block, index) => <article className={'oh-intro-card oh-intro-card-' + (index + 1)} key={block.label}>
          <span>{block.label}</span>
          <h3>{block.title}</h3>
          {block.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        </article>)}
      </div>
    </section>

    <section className="oh-topics-section">
      <div className="oh-section-title">
        <span>WHAT BECOMES VISIBLE</span>
        <h2>The parts ordinary materials leave out.</h2>
      </div>
      <div className="oh-topic-grid">
        {otherHalfTopics.map(([title, description], index) => <article key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className="oh-reading-method">
      <div><span>HOW TO USE IT</span><h2>Notice more. Assume less.</h2><p>This is a recognition-first reference. You do not need to imitate every word or style you encounter.</p></div>
      <div className="oh-reading-steps">
        <article><small>01</small><strong>Notice the form.</strong><p>What word, pattern, or signal did you encounter?</p></article>
        <article><small>02</small><strong>Read the situation.</strong><p>Who is speaking, to whom, where, and for what purpose?</p></article>
        <article><small>03</small><strong>Interpret the effect.</strong><p>What is the language doing beyond its literal meaning?</p></article>
        <article><small>04</small><strong>Choose deliberately.</strong><p>Understanding a form does not mean you need to use it.</p></article>
      </div>
    </section>
  </div>
}

function CourseOverview({ mode }) {
  return <CourseIndex title="The Other Half of English">
    <CourseDirectory label="Guide introduction" items={[{ id:'introduction', title:'About this guide', summary:'How to read the other half of English.', icon:'compass', wide:true, href:root + '/introduction/' + mode }]}/>
    <CourseTree label="The Other Half of English chapters" groups={otherHalfGroups.map((group, index) => ({
      id:group.id, title:group.title, icon:['messages','users','message','globe','lightbulb'][index], open:index === 0,
      items:otherHalfChapters.filter(chapter => chapter.group === group.id).map(chapter => ({
        id:chapter.number, number:String(chapter.number).padStart(2,'0'), title:chapter.title,
        href:chapterPath(chapter.number) + '/' + mode, status:chapter.missing ? 'Chapter text not supplied' : undefined,
      })),
    }))}/>
  </CourseIndex>
}

function ChapterContents({ sections }) {
  return <details className="oh-contents" onKeyDown={event => {
    if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary').focus() }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false }}>

    <summary>In this chapter <span aria-hidden="true">⌄</span></summary>
    <nav aria-label="In this chapter">{sections.map(section => <button type="button" key={section.id} onClick={event => {
      event.currentTarget.closest('details').open = false
      const target = document.getElementById(section.id)
      target?.focus({ preventScroll:true })
      target?.scrollIntoView({ behavior:'instant', block:'start' })
    }}>{inline(section.title)}</button>)}</nav>
  </details>
}

function MissingChapter({ chapter, mode }) {
  return <div className="aw-page oh-page">
    <a className="oh-back" href={root + '/home/' + mode}>← The Other Half of English</a>
    <section className="oh-missing-page">
      <span>CHAPTER {String(chapter.number).padStart(2, '0')} / 13</span>
      <h1>{chapter.title}</h1>
      <p>{chapter.takeaway}</p>
      <div className="oh-source-gap"><strong>Source gap.</strong> The supplied master document includes this chapter in its table of contents, but its chapter text is absent. This page does not invent or substitute content.</div>
      <div className="oh-missing-links"><a href={chapterPath(9) + '/' + mode}>← Chapter 09 · Cultural references</a><a href={chapterPath(11) + '/' + mode}>Continue to Chapter 11 →</a></div>
    </section>
  </div>
}

function ChapterPage({ chapter, mode }) {
  const [query, setQuery] = useState('')
  const parsed = useMemo(() => parseDocument(chapter.markdown), [chapter.markdown])
  const currentIndex = availableChapters.findIndex(item => item.number === chapter.number)
  const previous = currentIndex > 0 ? availableChapters[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < availableChapters.length - 1 ? availableChapters[currentIndex + 1] : null
  const searchable = chapter.number <= 3
  const chapterTag = chapter.tag || 'RECOGNITION · REFERENCE'

  return <div className="aw-page oh-page oh-chapter-page">
    <div className="oh-layout oh-reader-layout">
      <article className="oh-chapter-main">
        <header className="oh-chapter-header">
          <span>{chapter.group.toUpperCase()} · CHAPTER {String(chapter.number).padStart(2, '0')} / 13</span>
          <h1>{chapter.title}</h1>
          <p>{chapter.subtitle}</p>
          <div className="oh-chapter-meta"><span>{chapterTag}</span></div>
          <CourseContents id={chapter.number}><ChapterContents sections={parsed.sections}/></CourseContents>
        </header>

        {chapter.number === 3 && <aside className="oh-caution"><strong>Adult language · recognition first.</strong><p>This reference includes vulgar and sexual slang. The source emphasizes that context, relationship, and social setting determine acceptability. Understanding a term does not require using it.</p></aside>}
        {chapter.number === 8 && <aside className="oh-caution"><strong>Context changes the force.</strong><p>The source distinguishes emotional release and emphasis from language directed at another person. The same word can have very different social effects.</p></aside>}

        <ChapterVisual chapter={chapter}/>

        {searchable && <label className="oh-search">
          <span>SEARCH THE REFERENCE</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a word, meaning, origin, or note…" aria-label="Search this chapter"/>
          <small>{chapter.number === 3 ? 'Search the adult and explicit reference.' : 'Search the chapter’s reference tables.'}</small>
        </label>}

        {parsed.intro.length > 0 && <div className="oh-chapter-lead">
          {parsed.intro.map((block, index) => <MarkdownBlock block={block} searchable={searchable} query={query} key={index}/>)}
        </div>}

        <div className="oh-sections">
          {parsed.sections.map((section, index) => <section className="oh-content-section" id={section.id} tabIndex={-1} key={section.id}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><h2>{inline(section.title)}</h2></header>
            <div className="oh-section-content">
              {section.blocks.map((block, blockIndex) => <MarkdownBlock block={block} searchable={searchable} query={query} key={blockIndex}/>)}
            </div>
          </section>)}
        </div>

        <section className="oh-chapter-takeaway">
          <span>THE POINT TO KEEP</span><p>{chapter.takeaway}</p>
        </section>
        <nav className="oh-chapter-pagination" aria-label="Previous and next chapters">
          {previous ? <a href={chapterPath(previous.number) + '/' + mode}><small>PREVIOUS</small><strong>← {previous.title}</strong></a> : <a href={root + '/home/' + mode}><small>OVERVIEW</small><strong>← All chapters</strong></a>}
          {next ? <a href={chapterPath(next.number) + '/' + mode}><small>NEXT</small><strong>{next.title} →</strong></a> : <a href={root + '/home/' + mode}><small>FINISH</small><strong>Return to the course overview ↗</strong></a>}
        </nav>
      </article>
    </div>
  </div>
}

export default function OtherHalfCourse({ route }) {
  const mode = applicationMode(route)
  if (!route.chapter) return <CourseOverview mode={mode}/>
  const chapter = otherHalfChapters.find(item => item.number === Number(route.chapter))
  if (chapter?.missing) return <MissingChapter chapter={chapter} mode={mode}/>
  if (mode === 'practice') {
    const practice = otherHalfPractice[route.chapter]
    return practice ? <ApplicationPractice {...practice} title={chapter?.title || practice.title} topic={chapter ? 'Chapter ' + String(chapter.number).padStart(2,'0') : undefined}/> : <CourseOverview mode={mode}/>
  }
  if (route.chapter === 'introduction') return <CourseGuide mode={mode}/>
  return chapter ? <ChapterPage chapter={chapter} mode={mode}/> : <CourseOverview mode={mode}/>
}
