/** Chapter 04 · Saying you don't understand. */
export const repairLesson = {
  id: 'repair',
  kind: 'repair',
  number: '04',
  title: '理解できないとき、どうすればいいのでしょうか？',
  enTitle: "Saying you don't understand",
  ja: '分からないことを正直に伝え、聞き返し、確認する表現を学びます。',
  cando: '分からないまま黙り込まず、相手に助けを求めながら会話を続けられる。',
  learn: {
    intro: [
      'コミュニケーションは、いつも完璧に進むわけではありません。相手が速く話したり、知らない単語を使ったり、単純に声がよく聞こえなかったりして、理解できないことは誰にでもあります。',
      'そんなときに大切なのは、分かったふりをしないことです。良いコミュニケーションとは、話すことだけではなく、分からないときにきちんと止めて、聞き返し、確認することでもあります。',
      'この章では、理解できないことを伝える表現、もう一度言ってもらう表現、そしてそれを丁寧に伝える方法を学びます。',
    ],
    functions: [
      ['01', '分からないと伝える'],
      ['02', '聞こえなかったと伝える'],
      ['03', 'もう一度頼む'],
      ['04', '丁寧に会話を続ける'],
    ],
    understand: {
      title: '理解できないと伝える',
      enTitle: "Ways to say you don't understand",
      intro: '話の内容についていけないときは、短く正直に伝えて大丈夫です。自分を責めるのではなく、相手にもう少し助けてもらう入口を作ります。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: "Sorry, I'm not with you.", meaning: 'ごめんなさい、話についていけていません。', context: '話の流れを見失った', register: 'polite' },
        { phrase: "Sorry, I don't understand. My English isn't great.", meaning: 'すみません、理解できません。私の英語はそれほど得意ではありません。', context: '率直に助けを求める', register: 'polite' },
        { phrase: "I'm not quite sure what you mean.", meaning: 'おっしゃっている意味がよく分かりません。', context: '意味を丁寧に確認する', register: 'polite' },
      ],
      recognition: [
        { phrase: "I'm not with you.", meaning: '話についていけていません。', note: 'Sorry を前につけると、やわらかく伝えられます。' },
      ],
    },
    hear: {
      title: '聞こえない・聞き取れないと伝える',
      enTitle: "Saying you can't hear someone",
      intro: '周囲がうるさかったり、相手が早口だったりしたときの短い聞き返しです。まず音が届かなかったのか、意味が分からなかったのかを意識してみましょう。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Excuse me?', meaning: 'すみません、何とおっしゃいましたか？', context: '丁寧な聞き返し', register: 'polite' },
        { phrase: 'Sorry?', meaning: 'ごめんなさい、もう一度お願いします。', context: '短く聞き返す', register: 'neutral' },
        { phrase: 'Pardon?', meaning: 'もう一度よろしいですか？', context: '丁寧・やや伝統的', register: 'polite' },
        { phrase: 'What did you say?', meaning: '何て言いましたか？', context: '内容を聞き返す', register: 'neutral' },
        { phrase: 'What was that?', meaning: '今のは何と言ったのですか？', context: '直前の一言を聞き返す', register: 'casual' },
        { phrase: 'What?', meaning: 'え？／何？', context: '親しい間柄だけ', register: 'casual' },
        { phrase: "Sorry, I didn't hear that.", meaning: 'すみません、聞こえませんでした。', context: '音が届かなかった', register: 'polite' },
        { phrase: "Sorry, I didn't catch that.", meaning: 'すみません、聞き取れませんでした。', context: '音を聞き逃した', register: 'polite' },
      ],
      recognition: [
        { phrase: 'What?', meaning: 'え？／何？', note: '便利ですが、知らない相手や仕事の場ではぶっきらぼうに聞こえることがあります。' },
      ],
    },
    repeat: {
      title: 'もう一度言ってほしいとお願いする',
      enTitle: 'Asking someone to repeat',
      intro: '何をしてほしいかを具体的に伝えると、相手も助けやすくなります。「もう一度」「ゆっくり」「順を追って」など、必要なリクエストを足してみましょう。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: 'Could you say that again?', meaning: 'もう一度言っていただけますか？', context: 'もう一度お願いする', register: 'polite' },
        { phrase: 'Can you repeat that more slowly, please?', meaning: 'もう少しゆっくり繰り返してもらえますか？', context: '速度を下げてもらう', register: 'polite' },
        { phrase: 'Can you just explain that one more time?', meaning: 'もう一回だけ説明してもらえますか？', context: '説明をもう一度頼む', register: 'neutral' },
        { phrase: 'Could you talk me through that again, please?', meaning: 'もう一度、順を追って説明していただけますか？', context: '手順を確認する', register: 'polite' },
      ],
      recognition: [
        { phrase: 'more slowly, please', meaning: 'もう少しゆっくりお願いします。', note: '相手を責めずに、必要な助けを具体的に伝えます。' },
      ],
    },
    dialogues: [
      {
        id: 'meaning-check',
        label: 'Pattern A · Check the meaning',
        title: '意味が分からないとき',
        lines: [
          { speaker: 'A', en: "The deadline is next Friday.", ja: '締め切りは来週の金曜日です。' },
          { speaker: 'B', en: "I'm not quite sure what you mean. Do you mean this Friday?", ja: '意味がよく分かりません。今週の金曜日という意味ですか？' },
        ],
      },
      {
        id: 'repeat-request',
        label: 'Pattern B · Ask for another try',
        title: '聞き取れなかったとき',
        lines: [
          { speaker: 'A', en: "The meeting is in Room 4.", ja: '会議は4号室です。' },
          { speaker: 'B', en: "Sorry, I didn't catch that. Could you say that again, please?", ja: 'すみません、聞き取れませんでした。もう一度言っていただけますか？' },
        ],
      },
    ],
    tip: 'What? はシンプルで簡単ですが、特にイギリス英語では、ぶっきらぼうで失礼に聞こえることがあります。あまりよく知らない相手やビジネスの場では、Excuse me? や Sorry, I didn’t catch that. のような丁寧な表現を選びましょう。分からないときは遠慮せず、会話を続けるために聞き返して大丈夫です。',
  },
  practice: {
    title: '分からないときも、会話を止めない',
    instructions: '日本語の説明はここまで。相手の声を聞き、短く聞き返して、同じリズムで声を重ねます。',
    coreHeading: 'まずは、聞き返しの入口をつくる。',
    dialogueHeading: '丁寧に止めて、もう一度聞く。',
    dialogueDescription: '相手の声のあとに、必要な聞き返しを自分の役として重ねます。',
    finishTitle: '明日、分からないときに一度だけ聞き返してみましょう。',
    corePhrases: [
      { phrase: "Sorry, I'm not with you.", context: '理解できない', rate: 0.82 },
      { phrase: "I'm not quite sure what you mean.", context: '意味を確認する', rate: 0.8 },
      { phrase: 'Excuse me?', context: '丁寧に聞き返す', rate: 0.9 },
      { phrase: "Sorry, I didn't hear that.", context: '音が聞こえない', rate: 0.82 },
      { phrase: "Sorry, I didn't catch that.", context: '聞き取れない', rate: 0.82 },
      { phrase: 'Could you say that again?', context: 'もう一度お願いする', rate: 0.84 },
      { phrase: 'More slowly, please.', context: 'ゆっくりお願いする', rate: 0.86 },
      { phrase: 'What do you mean?', context: '意味を聞く', rate: 0.88 },
    ],
    dialogues: [
      { title: 'Check the meaning', lines: ['The deadline is next Friday.', "I'm not quite sure what you mean. Do you mean this Friday?"] },
      { title: 'Ask for another try', lines: ['The meeting is in Room 4.', "Sorry, I didn't catch that. Could you say that again, please?"] },
    ],
    natural: [
      { full: 'I did not hear that.', natural: "Sorry, I didn't catch that." },
      { full: 'Could you repeat that?', natural: 'Could you say that again?' },
      { full: 'What?', natural: 'Excuse me?' },
    ],
  },
}
