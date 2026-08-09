/** Chapter 09 · Saying sorry. */
export const sorryLesson = {
  id: 'sorry',
  kind: 'sorry',
  number: '09',
  title: 'なぜ「Sorry」と言うのでしょうか？',
  enTitle: 'Saying sorry',
  ja: '謝罪、受け入れ、同情を場面に合わせて伝えます。',
  cando: '自分のミスを謝り、謝罪を受け入れ、相手に思いやりを示せる。',
  learn: {
    intro: [
      'コミュニケーションでは、間違いや気まずい場面を完全に避けることはできません。自分が何か悪いことをしたとき、“Sorry” はその状況や人間関係を修復するために使われます。',
      '一方で、“Sorry” は謝罪だけではありません。相手が病気になったり、大変な経験をしたりしたときに、同情や思いやりを示すためにも使います。',
      'つまり、“Sorry” は「自分のミスを認める言葉」であると同時に、「相手の気持ちを理解しています」と伝える言葉でもあります。この章では、謝り方、謝罪への返し方、そして相手に同情やお悔やみを伝える表現を学びます。',
    ],
    functions: [
      ['01', '小さなミスを謝る'],
      ['02', '謝罪を受け入れる'],
      ['03', '真剣に謝る'],
      ['04', '同情と思いやりを示す'],
    ],
    apologies: {
      title: '謝罪する・謝罪を受け入れる',
      enTitle: 'Making and accepting apologies',
      intro: '日常のちょっとした失敗には短く謝り、相手も「気にしないで」と自然に返します。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Oops! Sorry!', meaning: 'おっと！ごめん！', context: '小さなミスをすぐに謝る', register: 'casual' },
        { phrase: "I'm really sorry I forgot your birthday!", meaning: '誕生日を忘れていて、本当にごめんなさい！', context: '忘れたことを強く謝る', register: 'neutral' },
        { phrase: "Oh no, your top! I've messed up, sorry!", meaning: 'ああ、あなたの服！やっちゃった、ごめん！', context: '相手の物を汚した・壊した', register: 'casual' },
        { phrase: 'No worries!', meaning: '気にしないで！', context: '軽い謝罪を受け入れる', register: 'casual' },
        { phrase: 'No big deal!', meaning: '大したことないよ！', context: '相手を安心させる', register: 'casual' },
        { phrase: "It's okay, it'll come out in the wash.", meaning: '大丈夫、洗えば落ちるよ。', context: '汚れや小さなトラブルを許す', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'come out in the wash', meaning: '洗えば落ちる／大丈夫になる。', note: '服の汚れなどを気にしなくていいと伝える定番表現です。' },
      ],
    },
    more: {
      title: 'その他の便利な謝罪・返答フレーズ',
      enTitle: 'More phrases',
      intro: '状況の深刻さや相手との関係に合わせて、カジュアルな表現と真剣な表現を使い分けます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: 'My bad!', meaning: '私のミスだ！／ごめん！', context: '親しい友人にカジュアルに謝る', register: 'casual' },
        { phrase: "I'm sorry to bother you.", meaning: 'お手数をおかけしてすみません。', context: '邪魔や手間を詫びる', register: 'polite' },
        { phrase: 'I owe you an apology.', meaning: 'あなたには謝らなければなりません。', context: '改まって真剣に謝る', register: 'polite' },
        { phrase: 'I feel awful.', meaning: '本当に申し訳なく思っています。', context: '自分の行動を深く後悔する', register: 'neutral' },
        { phrase: "That's okay, it was nothing.", meaning: '大丈夫、大したことじゃないですよ。', context: '謝罪を受け入れる', register: 'polite' },
        { phrase: "No problem, I'm happy to help.", meaning: '問題ないですよ、喜んで手伝います。', context: '相手を安心させる', register: 'polite' },
        { phrase: "You don't have to apologize!", meaning: '謝る必要なんてないですよ！', context: '相手の謝罪をやさしく止める', register: 'neutral' },
        { phrase: 'Thank you, that means a lot.', meaning: 'ありがとう、そう言ってもらえて本当に救われます。', context: '思いやりを受け取る', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'I owe you an apology', meaning: 'あなたに謝らなければならない。', note: '少し改まった真剣な謝罪の始め方です。' },
      ],
    },
    sympathy: {
      title: '同情やお悔やみを伝える',
      enTitle: 'Expressing sympathy',
      intro: '“Sorry” は、自分が悪いときだけでなく、相手の病気や不幸に寄り添うときにも使います。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "I was sorry to hear you've been in hospital.", meaning: '入院されていたと聞いて、心配していました。', context: '病気や大変な経験に寄り添う', register: 'polite' },
        { phrase: "Thank you. I'm feeling much better now.", meaning: 'ありがとう。今はだいぶ良くなりました。', context: '心配への返事', register: 'neutral' },
        { phrase: "I'm sorry for your loss.", meaning: 'この度はご愁傷様です。／お悔やみ申し上げます。', context: '大切な人を亡くした相手へ', register: 'polite' },
        { phrase: 'Thanks, I appreciate you saying that.', meaning: 'ありがとう、そう言っていただけて感謝します。', context: 'お悔やみへの返事', register: 'polite' },
      ],
      recognition: [
        { phrase: "I'm sorry for your loss", meaning: 'お悔やみ申し上げます。', note: '家族や親しい人を亡くした人にかける決まり文句です。' },
      ],
    },
    dialogues: [
      {
        id: 'mistake',
        label: 'Pattern A · Repair a small mistake',
        title: '小さなミスを修復する',
        lines: [
          { speaker: 'A', en: 'Oops! Sorry!', ja: 'おっと！ごめん！' },
          { speaker: 'B', en: 'No worries!', ja: '気にしないで！' },
        ],
      },
      {
        id: 'spill',
        label: 'Pattern B · Accept an everyday apology',
        title: '日常のトラブルを許す',
        lines: [
          { speaker: 'A', en: "Oh no, your top! I've messed up, sorry!", ja: 'ああ、あなたの服！やっちゃった、ごめん！' },
          { speaker: 'B', en: "It's okay, it'll come out in the wash.", ja: '大丈夫、洗えば落ちるよ。' },
        ],
      },
      {
        id: 'sympathy',
        label: 'Pattern C · Show sympathy',
        title: '相手の大変な経験に寄り添う',
        lines: [
          { speaker: 'A', en: "I was sorry to hear you've been in hospital.", ja: '入院されていたと聞いて、心配していました。' },
          { speaker: 'B', en: "Thank you. I'm feeling much better now.", ja: 'ありがとう。今はだいぶ良くなりました。' },
        ],
      },
    ],
    tip: '特にイギリス英語では、“Sorry” を “Excuse me” のように使うことがあります。人にぶつかったとき、道を空けてほしいとき、聞き返すときにも使える便利な言葉です。',
  },
  practice: {
    title: '謝って、受け止めて、寄り添う',
    instructions: '日本語の説明はここまで。小さな謝罪、真剣な謝罪、同情と返事を英語のリズムで声に重ねます。',
    coreHeading: 'まずは、謝罪の強さを声にする。',
    dialogueHeading: '謝罪や思いやりを、会話の中で返す。',
    dialogueDescription: '相手の言葉を聞いたあと、許す、安心させる、感謝を返す表現を練習します。',
    finishTitle: '明日、必要なときに短く “Sorry” と言ってみましょう。',
    corePhrases: [
      { phrase: 'Oops! Sorry!', context: '小さなミスを謝る', rate: 0.86 },
      { phrase: 'My bad!', context: 'カジュアルに謝る', rate: 0.86 },
      { phrase: "I'm really sorry I forgot your birthday!", context: '忘れたことを深く謝る', rate: 0.78 },
      { phrase: "I'm sorry to bother you.", context: '手間を詫びる', rate: 0.82 },
      { phrase: 'I owe you an apology.', context: '真剣に謝る', rate: 0.8 },
      { phrase: 'No worries!', context: '軽く受け入れる', rate: 0.86 },
      { phrase: 'No big deal!', context: '相手を安心させる', rate: 0.86 },
      { phrase: "You don't have to apologize!", context: '謝罪をやさしく止める', rate: 0.8 },
      { phrase: "I'm sorry for your loss.", context: 'お悔やみを伝える', rate: 0.78 },
      { phrase: 'Thanks, I appreciate you saying that.', context: '思いやりへの返事', rate: 0.78 },
    ],
    dialogues: [
      { title: 'Repair a small mistake', lines: ['Oops! Sorry!', 'No worries!'] },
      { title: 'Accept an everyday apology', lines: ["Oh no, your top! I've messed up, sorry!", "It's okay, it'll come out in the wash."] },
      { title: 'Show sympathy', lines: ["I was sorry to hear you've been in hospital.", "Thank you. I'm feeling much better now."] },
    ],
    natural: [
      { full: 'I am sorry.', natural: 'Sorry!' },
      { full: 'It was my mistake.', natural: 'My bad!' },
      { full: 'There is no need to apologize.', natural: "You don't have to apologize!" },
    ],
  },
}
