import { useEffect } from 'react'
import { useLanguage } from './Language'
import Glyph from './Glyph'
import './chapter03-context.css'

// Chapter 03 teaches discourse functions through the preceding turn.
// Keep the original model sentences intact; add only the context needed
// to explain why each expression is being used.
const opening = [
  {
    word: 'Well', mark: 'Well',
    a: 'Did you enjoy the movie?',
    b: 'Well, I liked the ending, but the beginning was slow.',
    en: 'Lee liked the ending but not the beginning. Well helps introduce that mixed answer.',
    ja: 'よかった点と気になる点の両方を答える前に、Well を使っています。',
    purposeEn: 'A qualified answer', purposeJa: '考えながら答える',
  },
  {
    word: 'So', mark: 'So',
    a: "We've looked at all the options.",
    b: 'So, what should we do next?',
    en: 'They have discussed the options. So moves the conversation to the next step.',
    ja: '選択肢を話し合った後、So で次の行動へ進みます。',
    purposeEn: 'Move to the next step', purposeJa: '次の段階へ進む',
  },
  {
    word: 'Okay', mark: 'Okay',
    a: 'Could you send the message now?',
    b: "Okay, I'll send the message.",
    en: 'Lee acknowledges the request and says what they will do next.',
    ja: '頼まれたことを受け止め、次にすることを伝えています。',
    purposeEn: 'Acknowledge and act', purposeJa: '受け止めて行動する',
  },
  {
    word: 'I mean', mark: 'I mean',
    a: 'Was it expensive?',
    b: 'It was expensive. I mean, more than I expected.',
    en: 'Lee explains what expensive means here: more than expected.',
    ja: '「高かった」を「予想より高かった」と具体的に言い直しています。',
    purposeEn: 'Clarify a thought', purposeJa: '言い方を明確にする',
  },
  {
    word: 'Actually', mark: 'Actually',
    a: 'The meeting is on Friday, right?',
    b: 'Actually, the meeting is on Thursday.',
    en: 'The other person has the wrong day. Actually introduces the correction.',
    ja: '相手の曜日の間違いを Actually で訂正しています。',
    purposeEn: 'Correct information', purposeJa: '情報を訂正する',
  },
  {
    word: 'I guess', mark: 'I guess',
    a: 'How was the movie?',
    b: 'The movie was okay, I guess.',
    en: 'Lee is unsure how strongly they liked the movie.',
    ja: '映画について、強く言い切らずに感想を伝えています。',
    purposeEn: 'Make a judgment less certain', purposeJa: '断定を弱める',
  },
]

const adjusting = [
  {
    word: 'kind of', mark: 'kind of',
    a: 'Did you like it?', b: 'I kind of liked it.',
    en: 'The opinion is positive, but not strongly positive.',
    ja: '「すごく好き」とまでは言わず、評価を少し曖昧にしています。',
    purposeEn: 'Soften an evaluation', purposeJa: '評価をやわらげる',
  },
  {
    word: 'to be honest', mark: 'to be honest',
    a: 'Are you coming tonight?', b: "I'm too tired to go, to be honest.",
    en: 'The speaker gives a direct, honest reason for not going.',
    ja: '率直な気持ちを伝える合図です。ただし、この表現だけで断り方が優しくなるわけではありません。',
    purposeEn: 'Signal a candid answer', purposeJa: '率直な気持ちを伝える',
  },
  {
    word: 'like', mark: 'like',
    a: 'How long did it take?', b: 'It took, like, twenty minutes.',
    en: 'Twenty minutes is an approximate amount, not an exact one.',
    ja: 'この like は、数字が正確ではなく「だいたい」という意味合いを出します。くだけた話し方です。',
    purposeEn: 'Give an approximation', purposeJa: 'おおよその数字を言う',
  },
  {
    word: 'was like', mark: 'was like',
    a: 'What did you think when you arrived?', b: 'I was like, “Are we at the right place?”',
    en: 'The speaker retells their reaction, not necessarily their exact words.',
    ja: 'そのときの考えや反応を再現しています。一字一句そのまま言った言葉とは限りません。',
    purposeEn: 'Retell a reaction', purposeJa: 'そのときの反応を再現する',
  },
  {
    word: 'you know', mark: 'you know',
    a: 'Sounds like a difficult day.', b: 'It was one of those days, you know?',
    en: 'The speaker invites the listener to relate to that feeling.',
    ja: '「こういう日ってあるよね」と共感を求めています。ただし、相手が同じ経験を知っているとは限りません。',
    purposeEn: 'Invite shared understanding', purposeJa: '相手の共感を求める',
  },
]

const reactions = [
  {word:'Uh-huh.', a:'We took the train to the coast.', b:'Uh-huh.', en:'I am following. Keep going.', ja:'聞いているよ。話を続けて。'},
  {word:'Really?', a:'I got the job!', b:'Really?', en:'That is interesting or surprising.', ja:'興味や驚きを示す。'},
  {word:'Wow!', a:'We won two tickets.', b:'Wow!', en:'That is striking or exciting.', ja:'驚きや感動を示す。'},
  {word:'Oh no!', a:'Then we missed the bus.', b:'Oh no!', en:'Something unfortunate happened.', ja:'残念な出来事に反応する。'},
  {word:'That sounds fun.', a:'We are going camping this weekend.', b:'That sounds fun.', en:'That activity sounds enjoyable.', ja:'相手の予定を楽しそうだと感じている。'},
]

const story = [
  ['Lee', 'We took the train to the coast.', ''],
  ['Ari', 'Uh-huh.', 'Uh-huh.'],
  ['Lee', 'But we got off at the wrong station.', ''],
  ['Ari', 'Oh no! What happened next?', 'Oh no!'],
  ['Lee', 'We walked to the beach. It was only ten minutes away.', ''],
  ['Ari', "Oh, that's good.", "Oh, that's good."],
]

const concert = [
  ['Ari', 'Did you enjoy the concert?', ''],
  ['Lee', 'Well, the music was great. The room was just too crowded.', 'Well'],
  ['Ari', 'Oh, right.', 'Oh, right.'],
  ['Lee', "I mean, I enjoyed it, but I wouldn't choose that venue again.", 'I mean,'],
]

const checks = [
  {
    statement: 'The class starts at six,', tag: "doesn't it?",
    yes: 'Yes, it does.', no: 'No, it starts at seven.',
    en: 'Confirm a positive statement about the start time.',
    ja: '授業の開始時刻を確認します。違う場合は正しい時刻を伝えます。',
  },
  {
    statement: "You're coming tomorrow,", tag: "aren't you?",
    yes: 'Yes, I am.', no: "No, I can't.",
    en: 'Check an expectation about tomorrow.',
    ja: '相手が明日来る予定かを確かめます。来られなければそう伝えます。',
  },
  {
    statement: "You haven't seen my bag,", tag: 'have you?',
    yes: "Yes, it's by the door.", no: "No, I haven't.",
    en: 'A negative statement takes a positive tag here. Answer according to the facts.',
    ja: '否定の文の後に肯定形の短い質問を付けます。答えは実際の状況に合わせます。',
  },
]

function Highlight({ text, match }) {
  const index = text.toLowerCase().indexOf(match.toLowerCase())
  if (index < 0) return text
  return <>{text.slice(0,index)}<mark className="ar-c03-mark">{text.slice(index,index + match.length)}</mark>{text.slice(index + match.length)}</>
}

const portrait = (speaker) => `${import.meta.env.BASE_URL}assets/course/portrait-${speaker === 'A' ? '274641' : '284805'}.svg`

function Speak({ lines, audioProps, kind = 'exchange' }) {
  const { language } = useLanguage()
  function play() {
    if (typeof window === 'undefined' || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return
    audioProps?.audio?.stop?.()
    window.speechSynthesis.cancel()
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase() === 'en-us')
      || window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('en'))
    for (const line of lines) {
      const utterance = new window.SpeechSynthesisUtterance(line)
      utterance.lang = 'en-US'
      utterance.rate = kind === 'word' ? 0.82 : 0.89
      if (voice) utterance.voice = voice
      window.speechSynthesis.speak(utterance)
    }
  }
  return <button type="button" className={kind === 'word' ? 'ar-c03-sound' : 'ar-c03-listen'}
    onClick={play}
    title={kind === 'word' ? (language === 'ja' ? '表現だけを聞く' : 'Hear the expression') : (language === 'ja' ? '会話を聞く' : 'Play the exchange')}
    aria-label={kind === 'word'
      ? (language === 'ja' ? `${lines.join(' ')} の発音を聞く` : `Hear ${lines.join(' ')}`)
      : (language === 'ja' ? '会話を再生する' : 'Play the exchange')}>
    <Glyph name={kind === 'word' ? 'speaker' : 'play'} size={kind === 'word' ? 18 : 17}/>
  </button>
}

function ChatTurn({ speaker, text, mark }) {
  return <div className={`ar-c03-chat-turn ar-c03-chat-${speaker === 'A' ? 'incoming' : 'outgoing'}`}>
    <img className="ar-c03-avatar" src={portrait(speaker)} width="35" height="35" alt={speaker === 'A' ? 'First speaker' : 'Second speaker'} loading="lazy"/>
    <div className="ar-c03-chat-bubble">
      <p lang="en">{mark ? <Highlight text={text} match={mark}/> : text}</p>
    </div>
  </div>
}

function ContextCard({ item, audioProps, language }) {
  const mark = item.mark || item.word
  return <article className="ar-c03-card">
    <div className="ar-c03-card-top">
      <div className="ar-c03-title-sound">
        <h3 lang="en">{item.word}</h3>
        <Speak lines={[item.word]} audioProps={audioProps} kind="word"/>
      </div>
      <Speak lines={[item.a, item.b]} audioProps={audioProps}/>
    </div>
    <div className="ar-c03-exchange">
      <ChatTurn speaker="A" text={item.a}/>
      <ChatTurn speaker="B" text={item.b} mark={mark}/>
    </div>
    <div className="ar-c03-idea">
      <strong>Note</strong>
      <p>{language === 'ja' ? item.ja : item.en}</p>
    </div>
  </article>
}

function Dialogue({ rows, audioProps, label }) {
  return <div className="ar-c03-dialogue">
    <div className="ar-c03-dialogue-header">
      <h3>{label}</h3>
      <Speak lines={rows.map(row => row[1])} audioProps={audioProps}/>
    </div>
    <div className="ar-c03-story">
      {rows.map(([who,line,focus], i) =>
        <ChatTurn key={i} speaker={who === 'Lee' ? 'B' : 'A'} text={line} mark={focus || undefined}/>
      )}
    </div>
  </div>
}

function SectionIntro({ children }) { return <p className="ar-c03-intro">{children}</p> }

export default function Chapter03StudySection({ sectionIndex, audioProps }) {
  const { language } = useLanguage()
  useEffect(() => () => {
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  }, [])
  if (sectionIndex === 0) return <div className="ar-c03 ar-c03-section-0">
    <SectionIntro>{language === 'ja'
      ? '相手の言葉を読んでから、返事の中で短い表現が何をしているか見てみましょう。'
      : 'Read the first message, then notice the highlighted expression in the reply.'}</SectionIntro>
    <div className="ar-c03-grid">
      {opening.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
    <details className="ar-c03-extra">
      <summary>{language === 'ja' ? '会話全体でも見てみる' : 'See the expressions in a longer conversation'}</summary>
      <Dialogue rows={concert} audioProps={audioProps} label={language === 'ja' ? 'コンサートの感想を話す' : 'Talking about a concert'}/>
    </details>
  </div>
  if (sectionIndex === 1) return <div className="ar-c03 ar-c03-section-1">
    <SectionIntro>{language === 'ja'
      ? '短い表現で、言い方や意味合いがどう変わるかを確かめましょう。'
      : 'See how these expressions change what the speaker means.'}</SectionIntro>
    <div className="ar-c03-grid">
      {adjusting.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
  </div>
  if (sectionIndex === 2) return <div className="ar-c03 ar-c03-section-2">
    <SectionIntro>{language === 'ja'
      ? '相手の出来事に合う短い反応を選びましょう。'
      : 'A short reaction should match what the other person just said.'}</SectionIntro>
    <div className="ar-c03-grid">
      {reactions.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
    <details className="ar-c03-extra">
      <summary>{language === 'ja' ? '会話全体でも見てみる' : 'Follow a whole story'}</summary>
      <Dialogue rows={story} audioProps={audioProps} label={language === 'ja' ? '旅行の話に反応する' : 'Reacting to a travel story'}/>
      <div className="ar-c03-lesson-tip">
        <strong>{language === 'ja' ? '聞くことと賛成することは別' : 'Listening is not agreeing'}</strong>
        <p>{language === 'ja' ? 'Uh-huh は「聞いているよ」という合図です。相手の判断に賛成しているとは限りません。' : 'Uh-huh shows that you are following the story. It does not automatically mean you agree.'}</p>
      </div>
    </details>
  </div>
  if (sectionIndex === 3) return <div className="ar-c03 ar-c03-tag-study ar-c03-section-3">
    <SectionIntro>{language === 'ja'
      ? '付加疑問（tag question）は、文のあとに短い確認の質問をつなげる形です。上の問いかけから矢印に沿って、状況に合った返事へ進んでみましょう。'
      : 'A tag question adds a short check to a statement. Follow each question down to the possible replies. The answer depends on what is true, not on how the question is phrased.'}</SectionIntro>
    <div className="ar-c03-flows">
      {checks.map((item, i) => {
        const question = item.statement + ' ' + item.tag
        const positiveStatement = i !== 2
        return <article className="ar-c03-flow" key={i} aria-label={question}>
          <div className="ar-c03-flow-head">
            <span className="ar-c03-flow-index">{String(i+1).padStart(2,'0')}</span>
            <span className="ar-c03-polarity">{positiveStatement
              ? (language === 'ja' ? '肯定文 → 否定の確認' : 'Positive statement → negative tag')
              : (language === 'ja' ? '否定文 → 肯定の確認' : 'Negative statement → positive tag')}</span>
          </div>
          <div className="ar-c03-question-wrap">
            <div className="ar-c03-question-bubble">
              <div className="ar-c03-bubble-head">
                <img className="ar-c03-bubble-avatar" src={portrait('A')} width="27" height="27" alt={language === 'ja' ? '質問する人' : 'Asking speaker'}/>
                <span className="ar-c03-bubble-caption">{language === 'ja' ? '確認する' : 'Check'}</span>
                <Speak lines={[question]} audioProps={audioProps}/>
              </div>
              <p lang="en" className="ar-c03-question-text">{item.statement} <mark className="ar-c03-mark">{item.tag}</mark></p>
            </div>
          </div>
          <div className="ar-c03-flow-arrow" aria-hidden="true"/>
          <div className="ar-c03-response-bubble">
            <div className="ar-c03-bubble-head ar-c03-response-head">
              <img className="ar-c03-bubble-avatar" src={portrait('B')} width="27" height="27" alt={language === 'ja' ? '答える人' : 'Replying speaker'}/>
              <span className="ar-c03-bubble-caption">{language === 'ja' ? '実際の状況に合わせて答える' : 'Reply according to the facts'}</span>
            </div>
            <div className="ar-c03-response-paths">
              <div className="ar-c03-response-path">
                <span className="ar-c03-response-label">{language === 'ja' ? 'はい' : 'Yes'}</span>
                <p lang="en">{item.yes}</p>
                <Speak lines={[question, item.yes]} audioProps={audioProps}/>
              </div>
              <div className="ar-c03-response-path">
                <span className="ar-c03-response-label">{language === 'ja' ? 'いいえ' : 'No'}</span>
                <p lang="en">{item.no}</p>
                <Speak lines={[question, item.no]} audioProps={audioProps}/>
              </div>
            </div>
          </div>
          <p className="ar-c03-flow-explanation">{language === 'ja' ? item.ja : item.en}</p>
        </article>
      })}
    </div>
    <div className="ar-c03-lesson-tip"><strong>{language === 'ja' ? 'もっと簡単に聞いてもよい' : 'A simpler alternative'}</strong><p>{language === 'ja' ? '付加疑問が難しければ、Does the class start at six? のように普通の質問でも確認できます。相手に合わせるより、事実を正しく答えることが大切です。' : 'If the tag feels difficult, ask a full question: “Does the class start at six?” Answer with the correct information even if the question suggests something else.'}</p></div>
  </div>
  return null
}
