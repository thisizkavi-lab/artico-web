import { useState } from 'react'
import { Button, Heading, Icon } from './components'
import StudyMap from './StudyMap'
import { getLearningStage, learningStages } from './pathway'
import {
  catalog,
  chapterById,
  foundationSteps,
  groups,
  phrases,
  savedItems,
  scenes,
} from './content'

export function Collection({ title, description, footer, tone = 'green', href }) {
  return (
    <a className={`aw-collection aw-tone-${tone}`} href={`#${href}`}>
      <Icon name="audio" />
      <h3>{title}</h3>
      <p lang="ja">{description}</p>
      <small>{footer}</small>
    </a>
  )
}

export function Home({ learning, sync, storageAvailable }) {
  const last = learning.last
  const chapterId = last?.match(/\/lesson\/(\d+)/)?.[1] ?? '02'
  const chapter = chapterById[chapterId]
  const scene = last?.endsWith('/friend') ? 'friend' : 'first'
  const index = learning.indices[scene] ?? 0
  const turn = scenes[scene].turns[index]
  const isPractice = /\/(practice|chunks|whole)(\/|$|\?)/.test(last ?? '')
  const isFoundation = last?.startsWith('/foundation')
  const stage = getLearningStage(last) ?? learningStages[0]
  const resume = last ?? learningStages[0].start
  const foundation = foundationSteps.find((step) => last?.startsWith(`/foundation/${step.id}/`))
  const phrase = phrases.find((item) => last?.endsWith(`?phrase=${item.id}`))
  const remembered = !last
    ? 'Understand.\nThen say it.'
    : isFoundation
      ? (foundation?.en ?? 'Sounds & rhythm')
      : phrase
        ? `“${phrase.en}”`
        : chapterId === '02'
          ? `“${turn.focus ?? turn.en}”`
          : chapter.goal
  const studyPath = !last
    ? learningStages[0].start
    : isFoundation
      ? `/foundation/${foundation?.id ?? 'lr'}/study`
      : `/lesson/${chapterId}/study${chapterId === '02' ? `/${scene}` : ''}`
  const sceneLabel =
    chapterId === '02'
      ? phrase
        ? 'つながりを伝える表現'
        : scene === 'first'
          ? '友人の集まりで'
          : '友人を紹介する'
      : chapter.ja
  return (
    <div className="aw-page aw-library-page">
      <Heading
        eyebrow="YOUR LEARNING SPACE"
        title={last ? 'また、ここから。' : '自分のペースで、はじめよう。'}
        ja={last ? '今日は、ひとつの会話を声に。' : '学び方を知り、音に慣れ、会話へ。'}
        japanese
      />
      <section className="aw-resume">
        <div className="aw-resume-copy">
          <p className="aw-caption">
            {last ? '前回の続き' : '最初の一歩'} /{' '}
            {!last
              ? 'ORIENTATION'
              : isFoundation
                ? stage.title.toUpperCase()
                : `CHAPTER ${chapterId}`}
          </p>
          <h2 lang="en">
            {!last ? 'A good place to begin.' : isFoundation ? foundation?.en : chapter.title}
          </h2>
          <p className="aw-resume-ja" lang="ja">
            {!last ? 'まずは、学び方の地図から。' : isFoundation ? foundation?.ja : chapter.ja}
          </p>
          <p className="aw-resume-location" lang="ja">
            {!last
              ? '英語を学ぶ理由と、Articoの使い方を知る。'
              : isFoundation
                ? stage.id === 'orientation'
                  ? 'はじめに — 理由と学び方を知る。'
                  : '文字と音から、少しずつ。'
                : isPractice
                  ? `練習 — ${sceneLabel}`
                  : '解説 — 場面から、英語を知る。'}
            <br />
            {isPractice && chapterId === '02'
              ? phrase
                ? 'ひとつの表現を、何度でも。'
                : `前回はフレーズ ${index + 1} / 3 まで`
              : last
                ? '自分のペースで、続きをどうぞ。'
                : '急がず、自分に合う始め方を見つけましょう。'}
          </p>
          <div className="aw-resume-actions">
            <Button href={resume} variant="paper" className="aw-resume-primary">
              {last ? (isPractice ? '練習を再開' : '学習を再開') : 'はじめに進む'}
            </Button>
            {last ? (
              <Button href={studyPath} variant="light">
                解説を読む
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={() =>
                  document
                    .getElementById('aw-study-map')
                    ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
                }
              >
                学習マップを見る
              </Button>
            )}
          </div>
        </div>
        <div
          className={`aw-remember ${!last || chapterId !== '02' || isFoundation ? 'aw-remember-goal' : ''}`}
        >
          <p className="aw-eyebrow">
            {last && chapterId === '02' && !isFoundation
              ? phrase
                ? phrase.id === 'phrase-friend'
                  ? 'MAYA'
                  : 'ELI'
                : turn.speaker.toUpperCase()
              : !last
                ? 'HOW WE LEARN'
                : 'YOUR NEXT STEP'}
          </p>
          <p lang="en">{remembered}</p>
          <span lang="ja">
            {last && chapterId === '02' && !isFoundation
              ? '相手に少し遅れて、重ねて話す。'
              : 'わかったことを、少しずつ声に。'}
          </span>
        </div>
      </section>
      <div className="aw-local">
        <Icon name="check" />
        <span>{storageAvailable ? 'この端末に保存済み' : 'このタブで学習中'}</span>
        <button type="button" onClick={sync}>
          ほかの端末でも続ける ↗
        </button>
      </div>
      <StudyMap learning={learning} />
      <div className="aw-divider" />
      <div className="aw-revisit">
        <span>もう一度、声にしてみる</span>
        <Button variant="quiet" href="/lesson/01/practice">
          Chapter 01 · あいさつ →
        </Button>
      </div>
    </div>
  )
}

const courseTabs = learningStages.map((stage) => ({
  value: stage.id,
  label: `${stage.title} · ${stage.id === 'social' ? '96章' : stage.ja}`,
  tone: stage.tone,
}))
export function Courses({ learning, route }) {
  const [category, setCategory] = useState(
    route.path.includes('?foundation')
      ? 'foundation'
      : route.path.includes('?orientation')
        ? 'orientation'
        : route.path.includes('?social')
          ? 'social'
          : (getLearningStage(learning.last)?.id ?? 'orientation'),
  )
  const [groupIndex, setGroupIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const group = groups[groupIndex]
  const chapterList = catalog.filter(
    (chapter) => Number(chapter.id) >= group.start && Number(chapter.id) <= group.end,
  )
  const currentId = learning.last?.match(/\/lesson\/(\d+)/)?.[1]
  return (
    <div className="aw-page aw-library-page">
      <Heading eyebrow="YOUR COURSES" title="学ぶことを選ぶ。" japanese />
      <div className="aw-course-tabs" role="group" aria-label="Course categories">
        {courseTabs.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`aw-tone-${item.tone}`}
            aria-pressed={category === item.value}
            onClick={() => {
              setCategory(item.value)
              window.location.hash = `/courses?${item.value}`
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {category === 'social' ? (
        <>
          <div className="aw-course-heading">
            <h2 lang="en">Social Fluency</h2>
            <p lang="ja">日常の場面から、会話の流れをつくる。</p>
          </div>
          <div className="aw-course-grid">
            <aside className="aw-groups">
              <h3>{group.heading ?? group.title}</h3>
              {groups.map((item, index) => (
                <button
                  type="button"
                  key={item.start}
                  className={index === groupIndex ? 'is-active' : ''}
                  aria-pressed={index === groupIndex}
                  onClick={() => {
                    setGroupIndex(index)
                    setExpanded(false)
                  }}
                >
                  {String(item.start).padStart(2, '0')}–{item.end}{' '}
                  {index === groupIndex ? ' · ' : '　'} {item.title}
                </button>
              ))}
              <small>
                自分のペースで、
                <br />
                どの章からでも。
              </small>
            </aside>
            <div className="aw-chapters">
              <p className="aw-group-heading">
                {String(group.start).padStart(2, '0')}–{group.end} · {group.heading ?? group.title}
              </p>
              {(expanded ? chapterList : chapterList.slice(0, 5)).map((chapter) => (
                <a
                  className={`aw-chapter ${chapter.id === currentId ? 'is-current' : ''}`}
                  key={chapter.id}
                  href={`#/lesson/${chapter.id}/study${chapter.id === '02' ? '/first' : ''}`}
                >
                  <span className="aw-chapter-number">{chapter.id}</span>
                  <span>
                    <strong lang="ja">{chapter.ja}</strong>
                    <small lang="en">{chapter.title}</small>
                  </span>
                  <Icon name="next" />
                </a>
              ))}
              <Button
                variant="quiet"
                className="aw-full"
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded ? '少なく表示する' : 'このグループの続きを見る'}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <FoundationList category={category} learning={learning} />
      )}
    </div>
  )
}

function FoundationList({ category, learning }) {
  const stage = learningStages.find((item) => item.id === category)
  const steps = stage.lessonIds.map((id) => foundationSteps.find((step) => step.id === id))
  return (
    <>
      <div className="aw-course-heading">
        <h2 lang="en">{stage.title}</h2>
        <p lang="ja">{stage.support}</p>
      </div>
      <div className="aw-foundation-list">
        {steps.map((step, index) => (
          <a
            className={`aw-chapter ${learning.last?.startsWith(`/foundation/${step.id}/`) ? 'is-current' : ''}`}
            href={`#/foundation/${step.id}/study`}
            key={step.id}
          >
            <span className="aw-chapter-number">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <strong lang="en">{step.en}</strong>
              <small lang="ja">{step.ja}</small>
            </span>
            <Icon name="next" />
          </a>
        ))}
      </div>
    </>
  )
}

export function PracticeLibrary({ learning }) {
  const resume = learning.lastPractice
  const chapter = chapterById[resume?.match(/\/lesson\/(\d+)/)?.[1] ?? '02']
  const isSound = resume?.startsWith('/foundation')
  const title = isSound
    ? 'L & R — 音とリズム'
    : chapter.id === '02'
      ? `自己紹介 — ${resume?.endsWith('/friend') ? '友人を紹介する' : '友人の集まりで'}`
      : chapter.ja
  const selectedPhrase = phrases.find((item) => resume?.endsWith(`?phrase=${item.id}`))
  const detail = selectedPhrase
    ? '1フレーズ · 聞く / リピート / シャドーイング'
    : isSound
      ? '区切ってまねる / 文全体をつなげる'
      : chapter.id === '02'
        ? '3フレーズ · 聞く / リピート / シャドーイング'
        : '声にする / 場面を試す'
  return (
    <div className="aw-page aw-library-page">
      <Heading
        eyebrow="PRACTICE LIBRARY"
        title="今日は、何を声にする？"
        ja="前の会話も、気になる音も。ここから何度でも。"
        japanese
      />
      <section className="aw-practice-resume">
        <div>
          <p className="aw-caption">{resume ? '最近の練習' : 'はじめの練習'}</p>
          <h2>{title}</h2>
          <p>{detail}</p>
        </div>
        <Button href={resume ?? '/lesson/02/practice/first'} variant="paper">
          {resume ? '練習を再開' : '練習を始める'}
        </Button>
      </section>
      <h2 className="aw-jp-section">練習を選ぶ</h2>
      <div className="aw-collections aw-collections-three">
        <Collection
          title="会話のフレーズ"
          description="場面を思い出して、声にする。"
          footer="Social Fluency"
          href="/courses"
        />
        <Collection
          title="音と早口言葉"
          description="ゆっくり、一つの音から。"
          footer="Foundation · 無料"
          tone="yellow"
          href="/foundation/lr/chunks"
        />
        <Collection
          title="保存した表現"
          description="もう一度言いたい言葉を集める。"
          footer={`${learning.saved.filter((id) => savedItems[id]).length}つの表現`}
          tone="lilac"
          href="/saved"
        />
      </div>
      <div className="aw-divider" />
      <section className="aw-practice-note">
        <h2>練習のはじめは、音を聞くことから。</h2>
        <p>聞く → 区切ってまねる → 少し遅れて重ねる。</p>
        <p>言いやすくなったら、場面の中で自分の言葉を試してみましょう。</p>
      </section>
    </div>
  )
}

export function Saved({ learning, save, notify }) {
  const items = learning.saved.map((id) => savedItems[id]).filter(Boolean)
  return (
    <div className="aw-page">
      <Heading
        eyebrow="YOUR PHRASES"
        title="Keep a useful phrase."
        ja="もう一度言いたい表現を、ここに。"
      />
      {items.length ? (
        <div className="aw-saved-list">
          {items.map((item) => (
            <article key={item.id}>
              <p lang="en">{item.en}</p>
              <p className="aw-jp">{item.ja}</p>
              <div className="aw-actions">
                <Button
                  variant="outline"
                  onClick={() => notify('音声は準備中です。専用の録音を追加してから再生できます。')}
                >
                  Listen
                </Button>
                <Button variant="quiet" onClick={() => save(item.id)}>
                  保存から外す
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="aw-empty">
          <h2>まだ保存した表現はありません。</h2>
          <p>会話やフレーズのページで、覚えておきたい表現を保存できます。</p>
          <Button href="/lesson/02/phrases/first">表現を見てみる</Button>
        </div>
      )}
    </div>
  )
}
