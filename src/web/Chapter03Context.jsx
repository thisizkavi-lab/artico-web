import { useLanguage } from './Language'
import Glyph from './Glyph'
import { approvedAudio } from './components'
import { RichText } from './ContentBlocks'
import { emphasizeNoteRuns } from './studyTextPresentation'
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

// The extended exchanges are always visible. Each target phrase has a
// conversational reason to appear, rather than being recited in a list.
const concert = [
  ['Ari', 'Did you enjoy the concert?', ''],
  ['Lee', 'Well, the music was great. The room was just too crowded.', 'Well'],
  ['Ari', 'Oh, right.', ''],
  ['Lee', "I mean, I enjoyed it, but I wouldn't choose that venue again.", 'I mean,'],
  ['Ari', 'Was that the show on Friday?', ''],
  ['Lee', 'Actually, it was on Thursday.', 'Actually'],
  ['Ari', 'Would you go again?', ''],
  ['Lee', 'I guess I would, just not at that venue.', 'I guess'],
  ['Ari', 'So, should we look for a smaller place next time?', 'So'],
  ['Lee', "Okay, let's do that.", 'Okay'],
]

const casualStory = [
  ['Ari', 'Are you coming to the meetup tonight?', ''],
  ['Lee', "I'm kind of tired.", 'kind of'],
  ['Ari', "It's only an hour. Why not come?", ''],
  ['Lee', "To be honest, I've had a long day.", 'To be honest'],
  ['Ari', 'What happened?', ''],
  ['Lee', 'The train was, like, twenty minutes late.', 'like'],
  ['Ari', 'Again? What did you do?', ''],
  ['Lee', "I was like, “Seriously? Not again!”", 'was like'],
  ['Ari', 'Sounds like a rough commute.', ''],
  ['Lee', 'You know, just one of those days.', 'You know'],
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

// Context-specific Japanese support stays subordinate to the English models.
// Do not turn discourse markers into one-to-one dictionary equivalents.
const cardJapanese = {
  "Well": {
    "word": "そうですね／うーん",
    "a": "映画、楽しめた？",
    "b": "うーん、終わり方はよかったけど、最初のほうは退屈だった。"
  },
  "So": {
    "word": "じゃあ／それで",
    "a": "選択肢は全部検討したね。",
    "b": "じゃあ、次はどうしようか？"
  },
  "Okay": {
    "word": "わかった／いいよ",
    "a": "今、そのメッセージを送ってくれる？",
    "b": "わかった、メッセージを送るね。"
  },
  "I mean": {
    "word": "というか／つまり",
    "a": "高かった？",
    "b": "高かったよ。というか、思っていたより高かった。"
  },
  "Actually": {
    "word": "いや、実は／実際は",
    "a": "会議は金曜日だよね？",
    "b": "いや、会議は木曜日だよ。"
  },
  "I guess": {
    "word": "〜かな／たぶん",
    "a": "映画どうだった？",
    "b": "まあまあだったかな。"
  },
  "kind of": {
    "word": "ちょっと／まあまあ",
    "a": "気に入った？",
    "b": "まあ、ちょっと気に入ったかな。"
  },
  "to be honest": {
    "word": "正直に言うと",
    "a": "今夜来る？",
    "b": "正直に言うと、疲れすぎて行けないんだ。"
  },
  "like": {
    "word": "だいたい／〜くらい",
    "a": "どれくらいかかった？",
    "b": "20分くらいかかったよ。"
  },
  "was like": {
    "word": "〜って思った／〜って感じだった",
    "a": "着いたとき、どう思った？",
    "b": "「ここで合ってる？」って思った。"
  },
  "you know": {
    "word": "ほら／〜だよね",
    "a": "大変な一日だったみたいだね。",
    "b": "そういう日ってあるよね。"
  },
  "Uh-huh.": {
    "word": "うんうん",
    "a": "海岸まで電車で行ったんだ。",
    "b": "うんうん。"
  },
  "Really?": {
    "word": "本当に？",
    "a": "採用されたよ！",
    "b": "本当に？"
  },
  "Wow!": {
    "word": "わあ、すごい！",
    "a": "チケットが2枚当たったんだ。",
    "b": "わあ、すごい！"
  },
  "Oh no!": {
    "word": "えっ、それは大変！",
    "a": "それで、バスに乗り遅れちゃった。",
    "b": "うわ、それは大変！"
  },
  "That sounds fun.": {
    "word": "楽しそうだね",
    "a": "今週末、キャンプに行くんだ。",
    "b": "楽しそうだね。"
  }
}

const dialogueJapanese = {
  "Did you enjoy the concert?": "コンサート、楽しめた？",
  "Well, the music was great. The room was just too crowded.": "うん、音楽は最高だったけど、会場が混みすぎてた。",
  "Oh, right.": "ああ、そうなんだ。",
  "I mean, I enjoyed it, but I wouldn't choose that venue again.": "というか、楽しかったけど、あの会場にはもう行かないかな。",
  "Was that the show on Friday?": "金曜日の公演だった？",
  "Actually, it was on Thursday.": "いや、木曜日だったよ。",
  "Would you go again?": "また行きたい？",
  "I guess I would, just not at that venue.": "行きたいとは思うけど、あの会場は避けたいかな。",
  "So, should we look for a smaller place next time?": "じゃあ、次はもっと小さい会場を探そうか？",
  "Okay, let's do that.": "うん、そうしよう。",
  "Are you coming to the meetup tonight?": "今夜の集まり、来る？",
  "I'm kind of tired.": "ちょっと疲れてるんだ。",
  "It's only an hour. Why not come?": "たった1時間だよ。来ない？",
  "To be honest, I've had a long day.": "正直、今日は長い一日だったんだ。",
  "What happened?": "何があったの？",
  "The train was, like, twenty minutes late.": "電車が20分くらい遅れたんだ。",
  "Again? What did you do?": "また？ それでどうしたの？",
  "I was like, “Seriously? Not again!”": "「うそでしょ？ またなの？」って感じだった。",
  "Sounds like a rough commute.": "大変な通勤だったね。",
  "You know, just one of those days.": "ほら、そういう日ってあるよね。",
  "We took the train to the coast.": "海岸まで電車で行ったんだ。",
  "Uh-huh.": "うんうん。",
  "But we got off at the wrong station.": "でも、違う駅で降りちゃったんだ。",
  "Oh no! What happened next?": "えっ、大変！ それでどうなったの？",
  "We walked to the beach. It was only ten minutes away.": "浜辺まで歩いたよ。そこから10分しかかからなかったんだ。",
  "Oh, that's good.": "ああ、それならよかった。"
}

const checkJapanese = {
  "The class starts at six,": {
    "question": "授業は6時に始まるよね？",
    "yes": "うん、そうだよ。",
    "no": "違うよ、7時からだよ。"
  },
  "You're coming tomorrow,": {
    "question": "明日来るんだよね？",
    "yes": "うん、行くよ。",
    "no": "いや、行けないんだ。"
  },
  "You haven't seen my bag,": {
    "question": "私のバッグ、見てないよね？",
    "yes": "うん、ドアのそばにあるよ。",
    "no": "ううん、見てないよ。"
  }
}

function Highlight({ text, match }) {
  const index = text.toLowerCase().indexOf(match.toLowerCase())
  if (index < 0) return text
  return <>{text.slice(0,index)}<mark className="ar-c03-mark">{text.slice(index,index + match.length)}</mark>{text.slice(index + match.length)}</>
}

const portrait = (speaker) => `${import.meta.env.BASE_URL}assets/course/portrait-${speaker === 'A' ? '274641' : '284805'}.svg`

function Speak({ lines, audioProps, kind = 'exchange' }) {
  const { language } = useLanguage()
  // Future clips should be registered by phrase ID in approvedAudio.
  // Until then, no device-generated speech is used in Social Fluency.
  const phrase = lines.join(' ')
  const matchingId = Object.keys(audioProps?.byId ?? {}).find(id => audioProps.byId[id]?.en === phrase)
  const ready = Boolean(matchingId && approvedAudio[matchingId])
  return <button type="button" className={kind === 'word' ? 'ar-c03-sound' : `ar-c03-listen${kind === 'compact' ? ' ar-c03-listen-compact' : ''}`}
    disabled={!ready}
    onClick={() => { if (ready) audioProps?.onPlay?.(matchingId) }}
    title={ready
      ? (kind === 'word' ? (language === 'ja' ? '表現だけを聞く' : 'Hear the expression') : (language === 'ja' ? '会話を聞く' : 'Play the exchange'))
      : (language === 'ja' ? '録音は準備中です' : 'Recording coming soon')}
    aria-label={ready ? (kind === 'word' ? `Hear ${phrase}` : 'Play the exchange') : (language === 'ja' ? '録音は準備中です' : 'Recording coming soon')}>
    {kind === 'word'
      ? <Glyph name="speaker" size={18}/>
      : <svg className="ar-c03-play-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor"/>
        </svg>}

  </button>
}

function ChatTurn({ speaker, text, mark, japanese, language }) {
  return <div className={`ar-c03-chat-turn ar-c03-chat-${speaker === 'A' ? 'incoming' : 'outgoing'}`}>
    <img className="ar-c03-avatar" src={portrait(speaker)} width="35" height="35" alt={speaker === 'A' ? 'First speaker' : 'Second speaker'} loading="lazy"/>
    <div className="ar-c03-chat-bubble">
      <p lang="en">{mark ? <Highlight text={text} match={mark}/> : text}</p>
      {language === 'ja' && japanese && <p className="ar-c03-chat-ja" lang="ja">{japanese}</p>}
    </div>
  </div>
}

function ContextCard({ item, audioProps, language }) {
  const mark = item.mark || item.word
  const japanese = cardJapanese[item.word]
  return <article className="ar-c03-card">
    <div className="ar-c03-card-top">
      <div className="ar-c03-title-sound">
        <div className="ar-c03-heading-copy">
          <h3 lang="en">{item.word}</h3>
          {language === 'ja' && japanese?.word && <span className="ar-c03-word-ja" lang="ja">{japanese.word}</span>}
        </div>
        <Speak lines={[item.word]} audioProps={audioProps} kind="word"/>
      </div>
    </div>
    <div className="ar-c03-exchange">
      <div className="ar-c03-exchange-audio">
        <Speak lines={[item.a, item.b]} audioProps={audioProps} kind="compact"/>
      </div>
      <ChatTurn speaker="A" text={item.a} japanese={japanese?.a} language={language}/>
      <ChatTurn speaker="B" text={item.b} mark={mark} japanese={japanese?.b} language={language}/>
    </div>
    <div className="ar-c03-idea">
      <strong>Note</strong>
      <p><RichText runs={emphasizeNoteRuns([{ text: language === 'ja' ? item.ja : item.en }], {}, [item.word])} /></p>
    </div>
  </article>
}

function Dialogue({ rows, audioProps, label }) {
  const { language } = useLanguage()
  return <section className="ar-c03-dialogue" aria-label={label}>
    <div className="ar-c03-dialogue-panel">
      <div className="ar-c03-dialogue-header">
        <div>
          <span className="ar-c03-dialogue-eyebrow">{language === 'ja' ? '長い会話の中では' : 'In a longer conversation'}</span>
          <h3>{label}</h3>
        </div>
        <Speak lines={rows.map(row => row[1])} audioProps={audioProps} kind="compact"/>
      </div>
      <div className="ar-c03-transcript">
        {rows.map(([who, line, focus], i) =>
          <div className="ar-c03-transcript-line" key={i}>
            <img className="ar-c03-transcript-avatar"
              src={portrait(who === 'Lee' ? 'B' : 'A')}
              width="26" height="26" alt={who} title={who} loading="lazy"/>
            <div className="ar-c03-transcript-copy">
              <p lang="en">{focus ? <Highlight text={line} match={focus}/> : line}</p>
              {language === 'ja' && dialogueJapanese[line] && <p className="ar-c03-transcript-ja" lang="ja">{dialogueJapanese[line]}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
}

function SectionIntro({ children }) { return <p className="ar-c03-intro">{children}</p> }

export default function Chapter03StudySection({ sectionIndex, audioProps }) {
  const { language } = useLanguage()
  if (sectionIndex === 0) return <div className="ar-c03 ar-c03-section-0">
    <SectionIntro>{language === 'ja'
      ? '相手の言葉を読んでから、返事の中で短い表現が何をしているか見てみましょう。'
      : 'Read the first message, then notice the highlighted expression in the reply.'}</SectionIntro>
    <div className="ar-c03-grid">
      {opening.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
    <Dialogue rows={concert} audioProps={audioProps} label={language === 'ja' ? 'コンサートの感想を話す' : 'Talking about a concert'}/>
  </div>
  if (sectionIndex === 1) return <div className="ar-c03 ar-c03-section-1">
    <SectionIntro>{language === 'ja'
      ? '短い表現で、言い方や意味合いがどう変わるかを確かめましょう。'
      : 'See how these expressions change what the speaker means.'}</SectionIntro>
    <div className="ar-c03-grid">
      {adjusting.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
    <Dialogue rows={casualStory} audioProps={audioProps} label={language === 'ja' ? '大変だった一日について話す' : 'Talking about a long day'}/>
  </div>
  if (sectionIndex === 2) return <div className="ar-c03 ar-c03-section-2">
    <SectionIntro>{language === 'ja'
      ? '相手の出来事に合う短い反応を選びましょう。'
      : 'A short reaction should match what the other person just said.'}</SectionIntro>
    <div className="ar-c03-grid">
      {reactions.map(item => <ContextCard key={item.word} item={item} audioProps={audioProps} language={language}/>)}
    </div>
    <Dialogue rows={story} audioProps={audioProps} label={language === 'ja' ? '旅行の話に反応する' : 'Reacting to a travel story'}/>
    <div className="ar-c03-lesson-tip">
      <strong>{language === 'ja' ? '聞くことと賛成することは別' : 'Listening is not agreeing'}</strong>
      <p>{language === 'ja' ? 'Uh-huh は「聞いているよ」という合図です。相手の判断に賛成しているとは限りません。' : 'Uh-huh shows that you are following the story. It does not automatically mean you agree.'}</p>
    </div>
  </div>
  if (sectionIndex === 3) return <div className="ar-c03 ar-c03-tag-study ar-c03-section-3">
    <SectionIntro>{language === 'ja'
      ? '付加疑問（tag question）は、文のあとに短い確認の質問をつなげる形です。上の問いかけから矢印に沿って、状況に合った返事へ進んでみましょう。'
      : 'A tag question adds a short check to a statement. Follow each question down to the possible replies. The answer depends on what is true, not on how the question is phrased.'}</SectionIntro>
    <div className="ar-c03-flows">
      {checks.map((item, i) => {
        const question = item.statement + ' ' + item.tag
        const japanese = checkJapanese[item.statement]
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
              {language === 'ja' && japanese?.question && <p className="ar-c03-check-ja" lang="ja">{japanese.question}</p>}
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
                {language === 'ja' && japanese?.yes && <p className="ar-c03-check-ja" lang="ja">{japanese.yes}</p>}
                <Speak lines={[question, item.yes]} audioProps={audioProps}/>
              </div>
              <div className="ar-c03-response-path">
                <span className="ar-c03-response-label">{language === 'ja' ? 'いいえ' : 'No'}</span>
                <p lang="en">{item.no}</p>
                {language === 'ja' && japanese?.no && <p className="ar-c03-check-ja" lang="ja">{japanese.no}</p>}
                <Speak lines={[question, item.no]} audioProps={audioProps}/>
              </div>
            </div>
          </div>
          <p className="ar-c03-flow-explanation">{language === 'ja' ? item.ja : item.en}</p>
        </article>
      })}
    </div>
    <div className="ar-c03-lesson-tip"><strong>{language === 'ja' ? 'もっと簡単に聞いてもよい' : 'A simpler alternative'}</strong><p><RichText runs={emphasizeNoteRuns([{ text: language === 'ja' ? '付加疑問が難しければ、Does the class start at six? のように普通の質問でも確認できます。相手に合わせるより、事実を正しく答えることが大切です。' : 'If the tag feels difficult, ask a full question: “Does the class start at six?” Answer with the correct information even if the question suggests something else.' }], {}, ['Does the class start at six?'])} /></p></div>
  </div>
  return null
}
