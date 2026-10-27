import { useLanguage } from './Language'
import { getLessonNavigation } from './pathway'
import CurriculumIcon from './CurriculumIcon'
import './humor.css'

const examples = [
  {
    id: 'teasing',
    title: 'Respond to friendly teasing',
    ja: '親しい相手の冗談に返す',
    setup: 'You arrive early. Your friend pretends not to recognize you.',
    setupJa: 'いつもより早く着きました。友人が「本物の君はどこへ行ったの？」と冗談を言います。',
    lines: [
      ['Friend', 'Who are you, and what have you done with the real you?', '本物の君はどこへ行ったの？'],
      ['You', 'I know, right? Even I’m surprised. Don’t get used to it.', 'そうだよね。自分でもびっくり。毎回こうだと思わないでね。'],
    ],
    prompt: 'Reply once with a dry, subtle line, then with a more expressive response. Do not insult your friend.',
    promptJa: '控えめな返しと、少し大げさな返しをそれぞれ言ってみましょう。相手を傷つけないことが大切です。',
    checks: ['Recognize the joke.', 'Keep your response light.', 'Match the relationship and moment.'],
    checksJa: ['冗談だと理解する。','軽く返す。','相手や場面に合わせる。'],
  },
  {
    id: 'timing',
    title: 'Tell a gently funny story',
    ja: '日常の出来事をユーモラスに話す',
    setup: 'You want to make a harmless mistake sound funny without forcing a punchline.',
    setupJa: 'ちょっとした失敗を、無理に笑わせようとせず自然に話してみます。',
    lines: [
      ['You', 'I spent ten minutes looking for my glasses.', '眼鏡を10分間探していました。'],
      ['You', 'I checked every room. Then I realized … I was wearing them.', '全部屋を探して、やっと気づいたんです……眼鏡をかけていたことに。'],
    ],
    prompt: 'Tell your own short true story. Set up what you expected, explain what actually happened, and pause briefly before the final line.',
    promptJa: '自分の実際の失敗を話しましょう。予想したことと現実の違いを示し、最後の一言の前に少し間を取ります。',
    checks: ['Create a contrast.', 'Pause before the reveal.', 'Laugh at yourself, not someone vulnerable.'],
    checksJa: ['予想と現実の違いを示す。','最後に短い間を置く。','弱い立場の人を笑いの対象にしない。'],
  },
]

const hints = [
  { en: 'Notice the invitation', ja: '冗談だというサインに気づく',
    detail: 'Tone, facial expression, your relationship, and the situation tell you whether a comment is playful.',
    detailJa: '声の調子、表情、相手との関係、場面から、冗談かどうかを判断します。' },
  { en: 'Build on the moment', ja: 'その場の流れに合わせる',
    detail: 'A short response often works better than a complicated joke. A little exaggeration is enough.',
    detailJa: '複雑なジョークより、短い返しが自然なこともあります。少し大げさに言う程度で十分です。' },
  { en: 'Use good judgment', ja: '相手と状況を考える',
    detail: 'Do not tease someone about a sensitive subject. If someone looks uncomfortable, stop and return to ordinary conversation.',
    detailJa: '相手の気にしていることをからかわないでください。相手が嫌そうならやめて、普通の会話に戻しましょう。' },
]

export default function HumorLesson({ route, learning, update }) {
  const { language } = useLanguage()
  const ja = language === 'ja'
  const practice = route.view === 'practice'
  const navigation = getLessonNavigation(route)
  const change = (index, value) => {
    const id = 'application-humor-' + index // Preserve drafts from the previous Application track.
    update(previous => ({ ...previous,
      responses: { ...previous.responses, [id]: value } }))
  }
  return (
    <div className="aw-page hm-page">
      <header className="hm-header">
        <p className="hm-eyebrow">SOCIAL FLUENCY / CHAPTER 34</p>
        <div className="hm-heading"><CurriculumIcon name="smile" size={30}/>
          <h1>Humor &amp; Banter</h1>
        </div>
        <p className="hm-ja" lang="ja">{ja ? 'ユーモア・軽い冗談' : ''}</p>
        <p>{ja ? '親しい人との軽い冗談を理解し、自然に返す練習をします。' :
          'Recognize playful moments, reply naturally, and know when not to joke.'}</p>
      </header>
      <nav className="hm-mode" aria-label={ja ? 'レッスンモード' : 'Lesson mode'}>
        <a href="#/lesson/34/study" aria-current={!practice ? 'page' : undefined}>{ja ? '学ぶ' : 'Study'}</a>
        <a href="#/lesson/34/practice" aria-current={practice ? 'page' : undefined}>{ja ? '練習' : 'Practice'}</a>
      </nav>
      {!practice ? (
        <div className="hm-body">
          <section>
            <h2>{ja ? 'ユーモアは、関係と場面で変わる' : 'Humor depends on the moment.'}</h2>
            <p>{ja ? '英語の冗談を全部暗記する必要はありません。相手が遊び心をもって話しているかを理解し、その場に合う短い返しを考えます。' :
              'You do not need to memorize jokes. Learn to recognize when someone is being playful and respond in a way that suits the situation.'}</p>
            <div className="hm-principles">
              {hints.map(item=><article key={item.en}>
                <h3>{ja ? item.ja : item.en}</h3>
                <p>{ja ? item.detailJa : item.detail}</p>
              </article>)}
            </div>
          </section>
          <section>
            <h2>{ja ? '会話の例' : 'See it in conversation.'}</h2>
            {examples.map((item,i)=><article className="hm-example" key={item.id}>
              <span className="hm-index">0{i+1}</span>
              <h3>{ja ? item.ja : item.title}</h3>
              <p>{ja ? item.setupJa : item.setup}</p>
              <div className="hm-dialogue">{item.lines.map(([who,en,jp],index)=><div key={index}>
                <span className="hm-speaker">{who}</span>
                <span lang="en">{en}</span>
                {ja && <small lang="ja">{jp}</small>}
              </div>)}</div>
            </article>)}
          </section>
        </div>
      ) : (
        <div className="hm-body">
          <h2>{ja ? '自分の言葉で練習する' : 'Try it in your own words.'}</h2>
          <p>{ja ? 'まず声に出して返しましょう。必要ならメモを残して、もう一度試します。' :
            'Say your response aloud first. Keep optional notes, then try again without reading.'}</p>
          {examples.map((item,i)=>{
            const id='application-humor-'+i
            return <section className="hm-task" key={item.id}>
              <span className="hm-index">{String(i+1).padStart(2,'0')}</span>
              <h3>{ja ? item.ja : item.title}</h3>
              <p>{ja ? item.promptJa : item.prompt}</p>
              <ul>{(ja ? item.checksJa : item.checks).map(check=><li key={check}>{check}</li>)}</ul>
              <label htmlFor={'hm-notes-'+i}>{ja ? 'あなたのメモ（任意）' : 'Your notes (optional)'}</label>
              <textarea id={'hm-notes-'+i} rows={4} maxLength={1800}
                value={learning.responses[id] ?? ''}
                onChange={event=>change(i,event.target.value)}
                placeholder={ja ? '自分の言葉で書いてみましょう…' : 'Try your own response…'}/>
              <small>{ja ? 'この端末に自動保存されます。' : 'Saved on this device as you type.'}</small>
            </section>
          })}
        </div>
      )}
      <nav className="hm-footer" aria-label={ja ? '次のステップ' : 'Chapter navigation'}>
        <a href={navigation.previous}>← {ja ? '前の章' : 'Previous chapter'}</a>
        <a href={navigation.next}>{ja ? '次の章' : 'Next chapter'} →</a>
      </nav>
    </div>
  )
}
