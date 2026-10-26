import { useMemo, useRef, useState } from 'react'
import { useLanguage } from './Language'
import writingData from './writingPrompts.json'
import { listWritingDraftIds, readWritingDraft, saveWritingDraft, writingWordCount, WRITING_DRAFT_LIMIT } from './writingDrafts'
import './writing-studio.css'

const { prompts, categories } = writingData
const categoryById = Object.fromEntries(categories.map(category => [category.id, category]))

function DraftEditor({ prompt, locale, position, total, previous, next, onDraftChange }) {
  const ja = locale === 'ja'
  const [draft, setDraft] = useState(() => readWritingDraft(window.localStorage, prompt.id))
  const [saved, setSaved] = useState(true)
  const [copyState, setCopyState] = useState('')
  const words = writingWordCount(draft)
  const update = text => {
    setDraft(text)
    const success = saveWritingDraft(window.localStorage, prompt.id, text)
    setSaved(success)
    onDraftChange(prompt.id, !!text.trim() && success)
    setCopyState('')
  }
  const copyDraft = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(draft)
      setCopyState(ja ? 'コピーしました' : 'Copied')
    } catch {
      setCopyState(ja ? 'コピーできませんでした' : 'Could not copy')
    }
  }
  const group = categoryById[prompt.category]
  return (
    <section className="ws-editor" aria-label={ja ? 'ライティングスペース' : 'Writing space'}>
      <div className="ws-editor-top">
        <span>{ja ? group.ja : group.title}</span>
        <span>{String(position + 1).padStart(2, '0')} / {total}</span>
      </div>
      <div className="ws-prompt-block">
        {prompt.section && <p className="ws-section-label">{prompt.section}</p>}
        <h2 lang="en">{prompt.prompt}</h2>
        <p className="ws-optional">{ja
          ? 'あなた自身の言葉で書いてみましょう。答えたくないテーマは飛ばしても大丈夫です。'
          : 'Write in your own words. Feel free to skip a topic that feels too personal.'}</p>
      </div>

      <div className="ws-writing-guide">
        <span>{ja ? '書き方のヒント' : 'A simple approach'}</span>
        <p>{ja
          ? 'まず考えを整理し、具体的な例を加えてから、わかりやすさを見直しましょう。'
          : 'Think of your main point, add a concrete detail, then revise for clarity.'}</p>
      </div>

      <label className="ws-writing-label" htmlFor={'ws-draft-' + prompt.id}>
        {ja ? 'あなたの文章' : 'Your writing'}
      </label>
      <textarea id={'ws-draft-' + prompt.id} lang="en"
        className="ws-textarea"
        value={draft}
        onChange={event => update(event.target.value)}
        maxLength={WRITING_DRAFT_LIMIT} rows={12}
        placeholder={ja ? '英語で書き始めましょう…' : 'Start writing in English…'}/>
      <div className="ws-editor-footer">
        <div className="ws-draft-info" role="status" aria-live="polite">
          <span>{words} {ja ? '語' : words === 1 ? 'word' : 'words'}</span>
          <span aria-hidden="true">·</span>
          <span>{!saved
            ? (ja ? '保存できません。コピーして保管してください。' : 'Could not save. Copy your text to keep it.')
            : draft.trim()
              ? (ja ? 'この端末に保存済み' : 'Saved on this device')
              : (ja ? '書き始めると自動保存されます' : 'Autosaves as you write')}</span>
        </div>
        <button className="ws-copy" type="button" onClick={copyDraft} disabled={!draft}>
          {ja ? '文章をコピー' : 'Copy writing'}
        </button>
      </div>
      {copyState && <p className="ws-copy-status" role="status">{copyState}</p>}
      <div className="ws-next-row">
        <button type="button" disabled={!previous} onClick={previous}>
          ← {ja ? '前のテーマ' : 'Previous'}
        </button>
        <button type="button" disabled={!next} onClick={next}>
          {ja ? '次のテーマ' : 'Next prompt'} →
        </button>
      </div>
    </section>
  )
}

export default function WritingStudio() {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const [category, setCategory] = useState('c01')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(prompts[0].id)
  const [draftIds, setDraftIds] = useState(() => listWritingDraftIds(window.localStorage))
  const editorRef = useRef(null)

  const visible = useMemo(() => prompts.filter(prompt => {
    if (category === 'drafts' && !draftIds.has(prompt.id)) return false
    if (category !== 'drafts' && category !== 'all' && prompt.category !== category) return false
    const q = query.trim().toLocaleLowerCase()
    if (!q) return true
    return [prompt.title, prompt.prompt, prompt.section || '',
      categoryById[prompt.category].title, categoryById[prompt.category].ja]
      .some(value => value.toLocaleLowerCase().includes(q))
  }), [category, query, draftIds])

  const selected = visible.find(prompt => prompt.id === selectedId) ?? visible[0] ?? null
  const position = selected ? visible.findIndex(prompt => prompt.id === selected.id) : -1
  const go = id => {
    setSelectedId(id)
    if (window.matchMedia?.('(max-width: 800px)').matches)
      window.requestAnimationFrame(() => editorRef.current?.scrollIntoView({ block:'start', behavior:'smooth' }))
  }
  const recordDraft = (id, hasDraft) => {
    setDraftIds(previous => {
      if (previous.has(id) === hasDraft) return previous
      const next = new Set(previous)
      if (hasDraft) next.add(id)
      else next.delete(id)
      return next
    })
  }
  const search = value => {
    setQuery(value)
    if (value) setCategory('all')
  }
  return (
    <div className="aw-page ws-page">
      <a className="ws-back" href="#/application">← {ja ? 'Applicationに戻る' : 'Back to Application'}</a>
      <header className="ws-heading">
        <p className="ws-eyebrow">APPLICATION / WRITING</p>
        <h1>{ja ? '英語で書く' : 'Writing'}</h1>
        <p>{ja ? 'テーマを選び、自分の考えを英語で表現しましょう。' :
          'Choose a topic and put your thoughts into words.'}</p>
        <span className="ws-source-count">{categories.length} {ja ? 'カテゴリー' : 'categories'} · {prompts.length} {ja ? 'テーマ' : 'prompts'} · {draftIds.size} {ja ? '保存した下書き' : 'drafts'}</span>
      </header>
      <div className="ws-layout">
        <aside className="ws-browser" aria-label={ja ? '書くテーマを選ぶ' : 'Browse writing prompts'}>
          <div className="ws-browser-controls">
            <label htmlFor="ws-category">{ja ? 'カテゴリー' : 'Category'}</label>
            <select id="ws-category" value={category} onChange={event => setCategory(event.target.value)}>
              <option value="all">{ja ? 'すべてのカテゴリー' : 'All categories'} ({prompts.length})</option>
              <option value="drafts">{ja ? '自分の下書き' : 'My drafts'} ({draftIds.size})</option>
              {categories.map(c => <option key={c.id} value={c.id}>
                {ja ? c.ja : c.title} ({c.count})
              </option>)}
            </select>
            <label htmlFor="ws-search">{ja ? 'テーマを検索' : 'Search prompts'}</label>
            <input id="ws-search" type="search" value={query}
              onChange={event => search(event.target.value)}
              placeholder={ja ? 'キーワードで検索…' : 'Search all 215 prompts…'}/>
            <span className="ws-results">{visible.length} {ja ? '件' : 'prompts'}</span>
          </div>
          <div className="ws-prompt-list">
            {visible.map((prompt,index) => (
              <button type="button" key={prompt.id}
                className={'ws-prompt-item' + (selected?.id === prompt.id ? ' is-selected' : '')}
                aria-current={selected?.id === prompt.id ? 'true' : undefined}
                onClick={() => go(prompt.id)}>
                <span className="ws-prompt-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="ws-prompt-item-text">
                  <strong lang="en">{prompt.title}</strong>
                  {(category === 'all' || category === 'drafts') &&
                    <small>{ja ? categoryById[prompt.category].ja : categoryById[prompt.category].title}</small>}
                </span>
                {draftIds.has(prompt.id) && <span className="ws-drafted" aria-label={ja ? '下書きあり' : 'Has a draft'} />}
              </button>
            ))}
            {!visible.length && <p className="ws-empty">{ja
              ? '該当するテーマがありません。カテゴリーや検索語を変更してください。'
              : 'No matching prompts. Try another category or search.'}</p>}
          </div>
        </aside>
        <div className="ws-workspace" ref={editorRef}>
          {selected ? <DraftEditor key={selected.id} prompt={selected} locale={language}
            position={position} total={visible.length}
            previous={position > 0 ? () => go(visible[position - 1].id) : null}
            next={position < visible.length - 1 ? () => go(visible[position + 1].id) : null}
            onDraftChange={recordDraft}/> :
            <p className="ws-workspace-empty">{ja
              ? '別のカテゴリーまたは検索語を選んでください。'
              : 'Select another category or search to choose a prompt.'}</p>}
        </div>
      </div>
    </div>
  )
}
