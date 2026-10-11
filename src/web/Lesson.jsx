import { lazy, Suspense } from 'react'
import {
  Artwork,
  Button,
  Cast,
  Heading,
  IconButton,
  LessonMode,
  Player,
  Portrait,
  Segments,
  Turn,
  useAudio,
} from './components'
import { chunks, phrases, scenes, twister, words } from './content'

const ChapterContent = lazy(() =>
  import('./Reader').then((module) => ({ default: module.ChapterContent })),
)
const sceneTabs = [
  { value: 'first', label: 'First meeting' },
  { value: 'friend', label: 'Introduce a friend' },
]
const wordTabs = [
  { value: 'words', label: 'Words · 4' },
  { value: 'phrases', label: 'Phrases · 2' },
]
const practiceTabs = [
  { value: 'listen', label: 'Listen' },
  { value: 'repeat', label: 'Repeat' },
  { value: 'shadow', label: 'Shadow' },
]
export const lessonPath = (view, scene = 'first') => `/lesson/02/${view}/${scene}`
const go = (path) => {
  window.location.hash = path
}

export function Study({ route, notify, learning, save }) {
  const scene = scenes[route.scene]
  return (
    <div className="aw-page aw-study-page">
      <Heading eyebrow="SOCIAL FLUENCY / CHAPTER 02" title={scene.title} ja={scene.ja} />
      <LessonMode
        active="study"
        study={lessonPath('study', route.scene)}
        practice={lessonPath('practice', route.scene)}
      >
        <IconButton
          name="book"
          label="Open words and phrases"
          onClick={() => go(lessonPath('words', route.scene))}
        />
      </LessonMode>
      <div className="aw-study-grid">
        <aside className="aw-study-context">
          <Artwork
            file={scene.art}
            width={390}
            height={195}
            alt={
              route.scene === 'first'
                ? 'Maya and Eli meeting at Jordan’s home'
                : 'Maya introducing Jordan to Eli'
            }
          />
          <Cast people={scene.people} />
          <p className="aw-jp" lang="ja">
            {scene.caption}
          </p>
          <Segments
            items={sceneTabs}
            active={route.scene}
            onChange={(value) => go(lessonPath('study', value))}
            label="Conversation scene"
          />
          <div className="aw-divider" />
          <h2 className="aw-section-title" lang="en">
            {scene.detail}
          </h2>
          <p className="aw-jp aw-jp-explanation" lang="ja">
            {scene.explanation}
          </p>
          <Button href={lessonPath('words', route.scene)} variant="outline" className="aw-full">
            Words & phrases
          </Button>
        </aside>
        <section className="aw-conversation" aria-label="Conversation">
          {scene.turns.map((turn, index) => (
            <Turn
              key={turn.id}
              turn={turn}
              index={index}
              onListen={() => notify('音声は準備中です。会話ごとの専用録音を追加します。')}
            />
          ))}
          <Button href={lessonPath('practice', route.scene)} className="aw-listen-practice">
            Listen & practice
          </Button>
        </section>
      </div>
      <div className="aw-chapter-continuation">
        <Suspense fallback={<p role="status">Loading the lesson…</p>}>
          <ChapterContent chapterId="02" illustratedScene={route.scene === 'first'} />
        </Suspense>
      </div>
      <section className="aw-lesson-extra">
        <div className="aw-divider" />
        <h2 className="aw-section-title">Keep a useful line.</h2>
        <div className="aw-save-lines">
          {scene.turns.map((turn) => (
            <div key={turn.id}>
              <span lang="en">{turn.en.replaceAll('\n', ' ')}</span>
              <Button
                variant="quiet"
                onClick={() => {
                  save(turn.id)
                  notify(
                    learning.saved.includes(turn.id)
                      ? '保存から外しました。'
                      : '練習室の「保存した表現」に追加しました。',
                  )
                }}
                aria-pressed={learning.saved.includes(turn.id)}
              >
                {learning.saved.includes(turn.id) ? '保存済み ✓' : '表現を保存'}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function Vocabulary({ route, notify, learning, save }) {
  const isWords = route.view === 'words'
  return (
    <div className="aw-page">
      <Heading
        eyebrow="CHAPTER 02 / WORDS & PHRASES"
        title={isWords ? 'People & small talk.' : 'Say it in a scene.'}
        ja={isWords ? '絵を見て、意味と音をつなげる。' : '場面といっしょに、表現を覚える。'}
      />
      <LessonMode
        active="study"
        study={lessonPath('study', route.scene)}
        practice={lessonPath('practice', route.scene)}
      />
      <Segments
        items={wordTabs}
        active={route.view}
        className="aw-word-tabs"
        onChange={(view) => go(lessonPath(view, route.scene))}
        label="Words or phrases"
      />
      {isWords ? (
        <>
          <div className="aw-word-grid">
            {words.map((word) => (
              <article className="aw-word-card" key={word.id}>
                <Artwork
                  file={word.art}
                  width={238}
                  height={145.444}
                  alt={`Illustration of ${word.en}`}
                />
                <h2 lang="en">{word.en}</h2>
                <p className="aw-jp" lang="ja">
                  {word.ja}
                </p>
                <IconButton
                  name="play"
                  label={`Listen to ${word.en}`}
                  onClick={() => notify('音声は準備中です。単語ごとの専用録音を追加します。')}
                />
              </article>
            ))}
          </div>
          <aside className="aw-vocab-note">
            <h2 className="aw-section-title" lang="en">
              Put a word to work.
            </h2>
            <p className="aw-jp aw-jp-explanation" lang="ja">
              単語を確認したら、短いフレーズの中で声にしてみましょう。
            </p>
            <Button href={lessonPath('phrases', route.scene)}>Try these words in phrases</Button>
          </aside>
        </>
      ) : (
        <div className="aw-phrase-grid">
          {phrases.map((phrase) => (
            <article className="aw-phrase-card" key={phrase.id}>
              <Artwork file={phrase.art} width={520} height={317.778} alt={phrase.caption} />
              <p className="aw-caption">{phrase.caption}</p>
              <h2 lang="en">{phrase.en}</h2>
              <p className="aw-jp" lang="ja">
                {phrase.ja}
              </p>
              <div className="aw-actions">
                <Button
                  variant="outline"
                  onClick={() => notify('音声は準備中です。フレーズの録音を追加します。')}
                >
                  Listen
                </Button>
                <Button
                  onClick={() => go(`${lessonPath('practice', 'first')}?phrase=${phrase.id}`)}
                >
                  Practice
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Button href={lessonPath('study', route.scene)} variant="quiet" className="aw-back">
        Back to the conversation
      </Button>
      {!isWords && (
        <div className="aw-lesson-extra aw-save-lines">
          {phrases.map((phrase) => (
            <div key={phrase.id}>
              <span lang="en">{phrase.en}</span>
              <Button
                variant="quiet"
                aria-pressed={learning.saved.includes(phrase.id)}
                onClick={() => save(phrase.id)}
              >
                {learning.saved.includes(phrase.id) ? '保存済み ✓' : '表現を保存'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Shadow({ route, learning, update, notify }) {
  const scene = scenes[route.scene]
  const index = learning.indices[route.scene] ?? 0
  const turn = scene.turns[index]
  const next = scene.turns[(index + 1) % scene.turns.length]
  const audio = useAudio(notify)
  const select = (value) =>
    update((previous) => ({
      ...previous,
      indices: { ...previous.indices, [route.scene]: value },
    }))
  const setMode = (value) => {
    audio.stop()
    update((previous) => ({ ...previous, mode: value }))
  }
  const mode = learning.mode
  const instructions = {
    listen: 'まずは、場面を思い浮かべながら聞く。',
    repeat: '聞いたあとに、区切ってまねて話す。',
    shadow: '聞いた英語に、少し遅れて重ねて話す。',
  }
  return (
    <div className="aw-page aw-shadow-page">
      <Heading
        eyebrow={`CHAPTER 02 / ${mode === 'shadow' ? 'SHADOWING' : mode.toUpperCase()}`}
        title={`Say it with ${turn.speaker}.`}
        ja={instructions[mode]}
      />
      <LessonMode
        active="practice"
        study={lessonPath('study', route.scene)}
        practice={lessonPath('practice', route.scene)}
      />
      <div className="aw-shadow-grid">
        <aside className="aw-shadow-context">
          <Artwork
            file={scene.practiceArt}
            width={414}
            height={207}
            alt={
              route.scene === 'first'
                ? 'Maya and Eli talking at Jordan’s home'
                : 'Maya, Jordan and Eli in conversation'
            }
          />
          <Cast people={scene.people} />
          {scene.turns.map((item, itemIndex) => (
            <Turn
              key={item.id}
              turn={item}
              index={itemIndex}
              compact
              selected={itemIndex === index}
              onSelect={() => select(itemIndex)}
              onListen={() => {
                select(itemIndex)
                notify('音声は準備中です。この表現の録音を追加してから再生できます。')
              }}
            />
          ))}
        </aside>
        <section className="aw-rehearsal">
          <Segments
            items={practiceTabs}
            active={mode}
            onChange={setMode}
            label="Practice technique"
          />
          <article className="aw-focus">
            <div className="aw-focus-speaker">
              <Portrait name={turn.speaker} size={48} />
              <span>{turn.speaker.toUpperCase()}</span>
              <small>{String(index + 1).padStart(2, '0')} / 03</small>
            </div>
            <p className="aw-focus-en" lang="en">
              {turn.focus ?? turn.en}
            </p>
            <p className="aw-jp" lang="ja">
              {turn.ja}
            </p>
          </article>
          <button className="aw-next-turn" type="button" onClick={() => select((index + 1) % 3)}>
            <Portrait name={next.speaker} size={32} />
            <span lang="en">Next: “{next.en.replaceAll('\n', ' ')}”</span>
          </button>
          <Player
            item={turn}
            label={`PHRASE ${String(index + 1).padStart(2, '0')} / 03`}
            speed={learning.speed}
            setSpeed={(speed) => update((previous) => ({ ...previous, speed }))}
            next={() => select((index + 1) % 3)}
            audio={audio}
          />
          <Button href={lessonPath('study', route.scene)} variant="outline" className="aw-full">
            Back to the conversation
          </Button>
          <p className="aw-jp" lang="ja">
            音に慣れたら、相手の番を聞いて自分で返してみましょう。
          </p>
        </section>
      </div>
      <div className="aw-chapter-continuation">
        <Suspense fallback={<p role="status">Loading the practice…</p>}>
          <ChapterContent chapterId="02" mode="practice" />
        </Suspense>
      </div>
    </div>
  )
}

export function PhrasePractice({ route, learning, update, notify }) {
  const phraseIndex = phrases.findIndex((item) => item.id === route.phrase)
  const phrase = phrases[phraseIndex]
  const speaker = phraseIndex === 0 ? 'Maya' : 'Eli'
  const audio = useAudio(notify)
  const mode = learning.mode
  return (
    <div className="aw-page aw-shadow-page">
      <Heading
        eyebrow="CHAPTER 02 / PHRASE PRACTICE"
        title={`Say it with ${speaker}.`}
        ja="場面を思い浮かべて、ひとつの表現を声に。"
      />
      <LessonMode
        active="practice"
        study={lessonPath('phrases', route.scene)}
        practice={route.path}
      />
      <div className="aw-shadow-grid">
        <aside className="aw-shadow-context">
          <Artwork file={phrase.art} width={520} height={317.778} alt={phrase.caption} />
          <Cast people={[speaker, 'Jordan']} />
          <p className="aw-caption">{phrase.caption}</p>
          <p className="aw-jp">同じ言葉を、相手や場面を思い浮かべて練習しましょう。</p>
        </aside>
        <section className="aw-rehearsal">
          <Segments
            items={practiceTabs}
            active={mode}
            label="Phrase practice technique"
            onChange={(value) => {
              audio.stop()
              update((previous) => ({ ...previous, mode: value }))
            }}
          />
          <article className="aw-focus">
            <div className="aw-focus-speaker">
              <Portrait name={speaker} size={48} />
              <span>{speaker.toUpperCase()}</span>
              <small>01 / 01</small>
            </div>
            <p className="aw-focus-en" lang="en">
              {phrase.en}
            </p>
            <p className="aw-jp" lang="ja">
              {phrase.ja}
            </p>
          </article>
          <Player
            item={phrase}
            label="PHRASE 01 / 01"
            speed={learning.speed}
            setSpeed={(speed) => update((previous) => ({ ...previous, speed }))}
            next={() =>
              go(
                `${lessonPath('practice', 'first')}?phrase=${phrases[(phraseIndex + 1) % phrases.length].id}`,
              )
            }
            audio={audio}
          />
          <Button variant="outline" className="aw-full" href={lessonPath('phrases', route.scene)}>
            Back to the phrases
          </Button>
          <p className="aw-jp">音に慣れたら、名前を変えて自分のつながりを話してみましょう。</p>
        </section>
      </div>
    </div>
  )
}

export function Twister({ route, learning, update, notify }) {
  const isStudy = route.view === 'study'
  const isWhole = route.view === 'whole'
  const index = learning.indices.lr ?? 1
  const audio = useAudio(notify)
  const select = (value) =>
    update((previous) => ({
      ...previous,
      indices: { ...previous.indices, lr: value },
    }))
  const item = isWhole ? twister : chunks[index]
  const [title, support] = isStudy
    ? ['L & R, in rhythm.', '早口より、はっきり言えることから。']
    : isWhole
      ? ['Bring it together.', 'かたまりをつなげて、ひとつの文に。']
      : ['One clear chunk.', '音声を聞いて、区切ってまねる。']
  return (
    <div className="aw-page aw-twister-page">
      <Heading
        eyebrow={isStudy ? 'FOUNDATION / TONGUE TWISTERS' : 'FOUNDATION / L & R'}
        title={title}
        ja={support}
      />
      <LessonMode
        active={isStudy ? 'study' : 'practice'}
        study="/foundation/lr/study"
        practice={`/foundation/lr/${isWhole ? 'whole' : 'chunks'}`}
      />
      <div className={`aw-twister-grid ${isStudy ? 'aw-twister-study' : 'aw-twister-practice'}`}>
        <aside className="aw-twister-context">
          <Artwork
            file={isStudy ? 'a97bc.svg' : isWhole ? 'c915c.svg' : '5eaaa.svg'}
            width={isStudy ? 540 : 500}
            height={isStudy ? 270 : 250}
            alt="Lily standing beside red roses"
          />
          <p className={isStudy ? 'aw-focus-en' : 'aw-turn-en'} lang="en">
            {twister.en}
          </p>
          <p className="aw-jp" lang="ja">
            {twister.ja}
          </p>
          {isStudy ? (
            <div className="aw-sound-chips">
              <span>L /l/</span>
              <span>R /ɹ/</span>
            </div>
          ) : (
            <p className="aw-jp aw-twister-reminder">今は、速さよりも音の違いを意識します。</p>
          )}
        </aside>
        {isStudy ? (
          <section className="aw-twister-guide">
            <h2 className="aw-section-title" lang="en">
              Build it in three parts.
            </h2>
            <ol className="aw-chunk-rows">
              {chunks.map((chunk, chunkIndex) => (
                <li key={chunk.id}>
                  <span>{String(chunkIndex + 1).padStart(2, '0')}</span>
                  <div>
                    <strong lang="en">{chunk.en}</strong>
                    <p className="aw-jp" lang="ja">
                      {chunk.ja}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="aw-jp aw-jp-explanation">
              はじめは、ひとかたまりずつ。言いやすくなったら、文全体をゆっくりつなげます。
            </p>
            <Button href="/foundation/lr/chunks">Practice the sounds</Button>
            <div className="aw-divider" />
            <h2 className="aw-section-title" lang="en">
              Then use it naturally.
            </h2>
            <p className="aw-turn-en" lang="en">
              I really like roses.
            </p>
            <p className="aw-jp aw-jp-explanation">
              最後は、ふだんの会話で使える文でも試してみましょう。
            </p>
          </section>
        ) : (
          <section className="aw-rehearsal">
            <div className="aw-chunk-tabs" role="group" aria-label="Sentence chunks">
              {chunks.map((chunk, chunkIndex) => (
                <button
                  key={chunk.id}
                  type="button"
                  className={isWhole || chunkIndex === index ? 'is-active' : ''}
                  aria-pressed={isWhole || chunkIndex === index}
                  onClick={() => {
                    select(chunkIndex)
                    if (isWhole) go('/foundation/lr/chunks')
                  }}
                >
                  <small>{String(chunkIndex + 1).padStart(2, '0')}</small>
                  <span lang="en">{chunk.en}</span>
                </button>
              ))}
            </div>
            <article className="aw-focus aw-tone-yellow">
              <p className="aw-caption">{isWhole ? 'THE WHOLE SENTENCE' : 'LISTEN → YOUR TURN'}</p>
              <p className="aw-focus-en" lang="en">
                {item.en}
              </p>
              <p className="aw-jp" lang="ja">
                {isWhole
                  ? twister.ja
                  : (item.instruction ?? `「${item.ja}」の部分を、ひとかたまりで。`)}
              </p>
            </article>
            <p className="aw-jp">
              {isWhole
                ? 'ゆっくり、同じリズムでつなげます。'
                : '聞く → 間をあける → 声にする。何度戻っても大丈夫。'}
            </p>
            <Player
              item={item}
              label={
                isWhole ? 'WHOLE SENTENCE' : `CHUNK ${String(index + 1).padStart(2, '0')} / 03`
              }
              speed={learning.soundSpeed ?? 0.75}
              setSpeed={(soundSpeed) => update((previous) => ({ ...previous, soundSpeed }))}
              next={() => (isWhole ? go('/foundation/lr/chunks') : select((index + 1) % 3))}
              audio={audio}
            />
            <Button
              variant="outline"
              className="aw-full"
              href={`/foundation/lr/${isWhole ? 'chunks' : 'whole'}`}
            >
              {isWhole ? 'Back to chunks' : 'Try the whole sentence'}
            </Button>
            <Button variant="quiet" className="aw-full" href="/foundation/lr/study">
              Sound notes
            </Button>
          </section>
        )}
      </div>
    </div>
  )
}
