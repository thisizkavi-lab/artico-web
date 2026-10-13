import { useLanguage } from './Language'
import { useState } from 'react'
import { Artwork, approvedAudio, useAudio } from './components'
import { chunks, twister } from './content'
import japaneseFoundation from '../course/locales/ja/foundations.json'
import { SourceContent } from './ContentBlocks'
import { FoundationShell, Reading } from './Foundation'
import { Glyph } from './LessonExperience'

const notes = [
  'Let the tongue tip touch the ridge for L.',
  'Move from R into L without adding an extra vowel.',
  'Keep the R sounds clear and finish the last consonant.',
]
const sections = [
  { id: 'lr-notice', title: 'Notice the movement.' },
  { id: 'lr-parts', title: 'Build it in three parts.' },
  { id: 'lr-everyday', title: 'Use it naturally.' },
]
export function Twister({ route, learning, update, notify }) {
  const { t, language } = useLanguage()
  const isStudy = route.view === 'study',
    whole = route.view === 'whole'
  const index = learning.indices.lr ?? 0
  const audio = useAudio(notify)
  const [covered, setCovered] = useState(false)
  const item = whole ? twister : chunks[index]
  const select = (index) => {
    audio.stop()
    setCovered(false)
    update((previous) => ({ ...previous, indices: { ...previous.indices, lr: index } }))
  }
  return (
    <FoundationShell
      route={route}
      title="L & R, in rhythm."
      subtitle={t("Clear movements first. A natural rhythm follows.")}
      sections={language === 'ja' ? japaneseFoundation.lr.sections : sections}
      practicePath={`/foundation/lr/${whole ? 'whole' : 'chunks'}`}
    >
      {isStudy ? (language === 'ja' ? <><div className="rf-lr-scene"><Artwork file="a97bc.svg" width={540} height={270} alt={language === 'ja' ? '赤いバラのそばにいるLily。' : 'Lily beside red roses'} /></div><Reading model={japaneseFoundation.lr} /></> :
        <div className="ip-reading">
          <section className="ip-section" id="lr-notice">
            <div className="ip-section-heading">
              <span>01</span>
              <h2>{t("Notice the movement.")}</h2>
            </div>
            <div className="rf-lr-scene">
              <Artwork file="a97bc.svg" width={540} height={270} alt={language === 'ja' ? '赤いバラのそばにいるLily。' : 'Lily beside red roses'} />
              <div>
                <p className="rf-spoken">{twister.en}</p>
                <p className="ip-prose"> {t("For L, let the tongue tip touch the ridge behind the upper front teeth. For American R, keep it from tapping that ridge. Begin slowly enough to notice the difference.")} </p>
                <span className="ip-register">L /l/ · R /ɹ/</span>
              </div>
            </div>
          </section>
          <section className="ip-section" id="lr-parts">
            <div className="ip-section-heading">
              <span>02</span>
              <h2>{t("Build it in three parts.")}</h2>
            </div>
            <div className="ip-phrase-grid">
              {chunks.map((chunk, i) => (
                <article className="ip-phrase" key={chunk.id}>
                  <div className="ip-phrase-copy">
                    <p className="ip-phrase-text">{chunk.en}</p>
                    <p className="ip-context">{t(notes[i])}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="ip-prose"> {t("Make each part clear. Then connect the three parts without adding an extra vowel between consonants.")} </p>
            <a className="ip-primary" href="#/foundation/lr/chunks"> {t("Practice the sounds")} <Glyph name="arrow" />
            </a>
          </section>
          <section className="ip-section" id="lr-everyday">
            <div className="ip-section-heading">
              <span>03</span>
              <h2>{t("Use it naturally.")}</h2>
            </div>
            <article className="ip-phrase">
              <div className="ip-phrase-copy">
                <p className="ip-phrase-text">I really like roses.</p>
                <p className="ip-context">{t("Use the same movements in an everyday sentence.")}</p>
              </div>
            </article>
          </section>
        </div>
      ) : (
        <section className="rf-practice">
          {language === 'ja' && japaneseFoundation.lr.practice.map((block) => <SourceContent key={block.id} block={block} examples={false} />)}
          <p className="ip-kicker">{whole ? t("BRING IT TOGETHER") : t("ONE CLEAR CHUNK")}</p>
          <h2>{whole ? t("Connect the sentence.") : t("Give one part your attention.")}</h2>
          <div className="rf-chunk-choices" role="group" aria-label={t("Sentence chunks")}>
            {chunks.map((chunk, i) => (
              <button
                type="button"
                key={chunk.id}
                aria-pressed={!whole && index === i}
                onClick={() => {
                  select(i)
                  if (whole) window.location.hash = '/foundation/lr/chunks'
                }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {chunk.en}
              </button>
            ))}
          </div>
          <div className="rf-focus">
            <span className="ip-register">
              {whole ? t("WHOLE SENTENCE") : `${language === 'ja' ? '部分' : 'CHUNK'} ${index + 1} / 3`}
            </span>
            <h3 aria-live="polite">{covered ? t("Say it from memory.") : item.en}</h3>
            <p>{whole ? t("Keep the movements clear as you connect the parts.") : t(notes[index])}</p>
            <button
              className="ip-text-button"
              type="button"
              aria-pressed={covered}
              onClick={() => setCovered((value) => !value)}
            >
              {covered ? t("Show phrase") : t("Hide phrase")}
            </button>
            <div className="ip-session-audio">
              <button
                type="button"
                className="ip-listen"
                disabled={!approvedAudio[item.id]}
                onClick={() => audio.play(item.id, learning.soundSpeed)}
              >
                <Glyph name="play" /> {t("Listen")} </button>
              <button
                className="ip-secondary"
                type="button"
                disabled={!approvedAudio[item.id]}
                onClick={() => audio.play(item.id, learning.soundSpeed, true)}
              >
                <Glyph name="repeat" /> {t("Replay")} </button>
            </div>
            <p className="ip-audio-note"> {t("Recording coming soon for this sentence. Read aloud, or use the existing samples in the tongue-twister collection.")} </p>
          </div>
          <div className="ip-session-nav">
            <button
              className="ip-secondary"
              type="button"
              onClick={() => select((index + 2) % 3)}
              disabled={whole}
            >
              <Glyph name="back" /> {t("Previous chunk")} </button>
            <button
              className="ip-primary"
              type="button"
              onClick={() => {
                if (whole) window.location.hash = '/foundation/lr/chunks'
                else select((index + 1) % 3)
              }}
            >
              {whole ? t("Return to chunks") : t("Next chunk")}
              <Glyph name="arrow" />
            </button>
          </div>
          <div className="rf-lr-links">
            <a href={`#/foundation/lr/${whole ? 'chunks' : 'whole'}`}>
              {whole ? t("Practice a short chunk") : t("Try the whole sentence")} →
            </a>
            <a href="#/foundation/tongue-intro/practice">{t("Explore the recorded exercises →")}</a>
          </div>
        </section>
      )}
    </FoundationShell>
  )
}
