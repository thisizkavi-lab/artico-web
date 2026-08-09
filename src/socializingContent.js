/** Chapter 17 · Socializing. */
export const socializingLesson = {
  id: 'socializing',
  kind: 'socializing',
  number: '17',
  title: 'なぜ「社交の会話」をするのでしょうか？',
  enTitle: 'Socializing',
  ja: '社交の場で自然に会話を始め、共通点を見つけ、つながりを続けます。',
  cando: 'パーティーや集まりで、再会のあいさつから自然に会話を広げられる。',
  learn: {
    intro: [
      '人と社交の場で会うとき、いつも重要な話題があるとは限りません。多くの場合、最初の目的は、相手との間に自然で心地よいつながりを作ることです。',
      '近況を聞いたり、共通点を見つけたり、相手の話に反応したり、褒めたりすることで、会話は少しずつ広がっていきます。',
      'スモールトークは一見すると重要ではないように見えますが、人との距離を縮め、会話を続けるための大切な役割があります。この章では、社交の場で自然に会話を始め、続けるための表現を学びます。',
    ],
    functions: [
      ['01', '偶然の再会を喜ぶ'],
      ['02', 'つながりを見つける'],
      ['03', '相手を褒める'],
      ['04', '近況を聞いて続ける'],
    ],
    party: {
      title: '偶然の再会と近況報告',
      enTitle: 'At a party',
      intro: '会場で知り合いにばったり会ったとき、驚きと喜びを短い言葉で伝えます。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Hey, fancy seeing you here!', meaning: 'こんなところで会うなんて奇遇だね！', context: '偶然の再会を喜ぶ', register: 'casual' },
        { phrase: "I didn't know you were coming!", meaning: 'あなたが来るなんて知らなかったよ！', context: '予想外の再会に返す', register: 'casual' },
        { phrase: 'Great to see you, how are you doing?', meaning: '会えて嬉しいよ、調子はどう？', context: '再会して近況を聞く', register: 'casual' },
        { phrase: "I'm good! How are things with you?", meaning: '元気だよ！そっちの状況はどう？', context: '近況を返して聞き返す', register: 'casual' },
      ],
      recognition: [
        { phrase: 'Fancy seeing you here!', meaning: 'まさかここで会うなんて！', note: '思いがけない場所で知り合いに会ったときの親しみある表現です。' },
      ],
    },
    connections: {
      title: 'つながりや職業について尋ねる',
      enTitle: 'Making connections',
      intro: '主催者とどう知り合ったか、どんな仕事をしているかを聞くと、初対面でも自然に話を始められます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: 'So, how do you know Gemma?', meaning: 'ジェマとはどういう知り合いなんですか？', context: '主催者との関係を聞く', register: 'neutral' },
        { phrase: "We're old school friends.", meaning: '昔の学生時代からの友人です。', context: '昔からの関係を答える', register: 'neutral' },
        { phrase: 'I work with her. What about you?', meaning: '彼女と一緒に働いています。あなたは？', context: '仕事のつながりを答える', register: 'neutral' },
        { phrase: 'This is Rick. He went to the same college as you.', meaning: 'こちらはリック。あなたと同じ大学に行っていたのよ。', context: '人を紹介して共通点を出す', register: 'neutral' },
        { phrase: 'No way! When were you there?', meaning: 'まさか！いつ大学にいたの？', context: '共通点に驚いて聞く', register: 'casual' },
        { phrase: 'So, what do you do?', meaning: 'それで、お仕事は何をされていますか？', context: '職業を聞く', register: 'neutral' },
        { phrase: "I'm an English teacher. How about you?", meaning: '英語の教師です。あなたは？', context: '職業を答えて聞き返す', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'What do you do?', meaning: 'お仕事は何をしていますか？', note: '社交の場では、職業を自然に尋ねる定番の質問です。' },
      ],
    },
    compliments: {
      title: '服装や持ち物を褒める',
      enTitle: 'Complimenting',
      intro: '相手の服装や持ち物に気づいて褒めると、会話を広げるきっかけになります。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "I love your dress! Where'd you get it?", meaning: 'そのドレス、すごく素敵！どこで買ったの？', context: '服を褒めて質問する', register: 'casual' },
        { phrase: 'At a charity shop — for 10 quid!', meaning: 'チャリティーショップで、たった10ポンドだったの！', context: '買った場所と値段を答える', register: 'casual' },
      ],
      recognition: [
        { phrase: 'quid', meaning: 'ポンド（£）を指すイギリス英語のスラング。', note: '10 quid は £10、つまり10ポンドという意味です。' },
      ],
    },
    more: {
      title: '近況を尋ねる・答える',
      enTitle: 'More phrases',
      intro: '話題を一つで終わらせず、近況や過去のつながりを聞いて会話を続けます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: "How have you been? / How's it going?", meaning: '最近どうしてた？／調子はどう？', context: '近況を尋ねる', register: 'casual' },
        { phrase: 'What have you been up to?', meaning: '最近何してたの？', context: '最近の活動を尋ねる', register: 'casual' },
        { phrase: 'Not bad, how are you?', meaning: '悪くないよ、あなたはどう？', context: '短く返して聞き返す', register: 'casual' },
        { phrase: "I'm really well!", meaning: 'すごく元気だよ！', context: '元気だと答える', register: 'casual' },
        { phrase: 'Long time, no see!', meaning: '久しぶり！', context: '久しぶりに会う', register: 'casual' },
        { phrase: 'You look well!', meaning: '元気そうだね！', context: '相手の様子を褒める', register: 'casual' },
        { phrase: 'We used to work together.', meaning: '私たちは以前、一緒に働いていたんです。', context: '過去のつながりを話す', register: 'neutral' },
        { phrase: 'Thanks so much for coming!', meaning: '今日は来てくれて本当にありがとう！', context: '主催者がゲストに言う', register: 'casual' },
      ],
      recognition: [
        { phrase: 'used to', meaning: '以前は〜していた。', note: '今は違う過去の習慣や関係を説明します。' },
      ],
    },
    dialogues: [
      {
        id: 'party',
        label: 'Pattern A · At a party',
        title: '偶然の再会から始める',
        lines: [
          { speaker: 'A', en: 'Hey, fancy seeing you here!', ja: 'やあ、こんなところで会うなんて奇遇だね！' },
          { speaker: 'B', en: "I didn't know you were coming!", ja: 'あなたが来るなんて知らなかったよ！' },
        ],
      },
      {
        id: 'connection',
        label: 'Pattern B · Make a connection',
        title: 'つながりを見つける',
        lines: [
          { speaker: 'A', en: 'So, how do you know Gemma?', ja: 'ジェマとはどういう知り合いなんですか？' },
          { speaker: 'B', en: 'We’re old school friends. What about you?', ja: '昔の学生時代からの友人です。あなたは？' },
        ],
      },
      {
        id: 'compliment',
        label: 'Pattern C · Compliment',
        title: '褒め言葉から続ける',
        lines: [
          { speaker: 'A', en: 'I love your dress! Where’d you get it?', ja: 'そのドレス、素敵！どこで買ったの？' },
          { speaker: 'B', en: 'At a charity shop — for 10 quid!', ja: 'チャリティーショップで、たった10ポンドだったの！' },
        ],
      },
    ],
    tip: 'Fancy seeing you here! は、思いがけない場所で知り合いに会ったときの親しみある驚きです。quid はイギリス英語でポンドを表すスラングなので、10 quid は £10 のことです。',
  },
  practice: {
    title: '社交の場で、会話を自然に広げる',
    instructions: '日本語の説明はここまで。再会、つながり、褒め言葉、近況の質問を英語だけで声に重ねます。',
    coreHeading: 'まずは、会話を始める短いまとまりを声にする。',
    dialogueHeading: '一言で終わらず、次の質問につなげる。',
    dialogueDescription: 'パーティーでの再会、共通点探し、褒め言葉の3場面を英語だけで練習します。',
    finishTitle: '次の集まりで、相手に一つ質問を返してみましょう。',
    corePhrases: [
      { phrase: 'Fancy seeing you here!', context: '偶然の再会を喜ぶ', rate: 0.82 },
      { phrase: "I didn't know you were coming!", context: '再会に返す', rate: 0.78 },
      { phrase: 'How are things with you?', context: '近況を聞く', rate: 0.84 },
      { phrase: 'How do you know Gemma?', context: 'つながりを聞く', rate: 0.82 },
      { phrase: 'What do you do?', context: '職業を聞く', rate: 0.86 },
      { phrase: 'What have you been up to?', context: '最近の活動を聞く', rate: 0.78 },
      { phrase: 'I love your dress!', context: '相手を褒める', rate: 0.86 },
      { phrase: "Where'd you get it?", context: '褒めて質問する', rate: 0.82 },
      { phrase: 'Long time, no see!', context: '久しぶりに会う', rate: 0.84 },
      { phrase: 'Thanks so much for coming!', context: '主催者として迎える', rate: 0.76 },
    ],
    dialogues: [
      { title: 'At a party', lines: ['Hey, fancy seeing you here!', "I didn't know you were coming!"] },
      { title: 'Make a connection', lines: ['So, how do you know Gemma?', 'We’re old school friends. What about you?'] },
      { title: 'Compliment', lines: ['I love your dress! Where’d you get it?', 'At a charity shop — for 10 quid!'] },
    ],
    natural: [
      { full: 'Where did you get it?', natural: "Where'd you get it?" },
      { full: 'What have you been doing recently?', natural: 'What have you been up to?' },
      { full: 'We worked together in the past.', natural: 'We used to work together.' },
    ],
  },
}
