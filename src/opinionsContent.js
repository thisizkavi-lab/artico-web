/** Chapter 05 · Opinions and preferences. */
export const opinionsLesson = {
  id: 'opinions',
  kind: 'opinions',
  number: '05',
  title: 'なぜ「意見や好み」を伝えるのでしょうか？',
  enTitle: 'Opinions and preferences',
  ja: '好き・嫌い、意見、選び方を、場面に合う強さと丁寧さで伝えます。',
  cando: '自分の好き嫌いや意見を、強さと場面に合わせて自然に伝えられる。',
  learn: {
    intro: [
      '会話では、事実を伝えるだけでなく、自分がどう思うか、何が好きかを伝えることも大切です。意見や好みを伝えることで、相手は私たちの考え方や価値観を少しずつ知ることができます。',
      'ただし、大切なのは「何を言うか」だけではありません。どのくらい強く言うか、どのくらい丁寧に言うかも、相手や場面によって変わります。',
      'この章では、好き・嫌いを伝える表現、意見を述べる表現、そして自分の好みや選択を伝える方法を学びます。',
    ],
    functions: [
      ['01', '好きの強さを伝える'],
      ['02', '苦手をやわらげて伝える'],
      ['03', '丁寧に意見を述べる'],
      ['04', '選ぶ・こだわらない'],
    ],
    likes: {
      title: '好きなものを伝える',
      enTitle: 'Saying what you like',
      intro: 'like だけでなく、どれくらい好きなのか、今ハマっているのか、昔から好きなのかを言い分けてみましょう。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'I absolutely love them!', meaning: 'それ、すっごく気に入った！', context: 'とても強い「好き」', register: 'casual' },
        { phrase: "Yeah, it's pretty good!", meaning: 'うん、かなりいいね！', context: 'かなり良いと伝える', register: 'neutral' },
        { phrase: "Yes, I'm really into it at the moment!", meaning: 'ええ、今それにすごくハマっているんです！', context: '今ハマっている', register: 'casual' },
        { phrase: "I'm a big fan!", meaning: '大ファンなんです！／すごく好きなんです！', context: 'ファンだと伝える', register: 'casual' },
        { phrase: "It's so my thing!", meaning: 'まさに私好みです！', context: '自分の好みにぴったり', register: 'casual' },
        { phrase: "I've always loved it.", meaning: '昔からずっと好きなんです。', context: '長く好きでいる', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'be into ~', meaning: '〜にハマっている／夢中である。', note: '今の関心や熱中を、カジュアルに伝えます。' },
      ],
    },
    dislikes: {
      title: '好きではないと伝える',
      enTitle: "Saying what you don't like",
      intro: 'I don’t like をいつも直接使う必要はありません。少し遠回しにしたり、強い拒否として言ったり、気持ちの強さを選べます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: "I'm not much of a curry fan.", meaning: 'カレーはそれほど好きじゃないんです。', context: 'やわらかく苦手を伝える', register: 'neutral' },
        { phrase: "Skateboarding isn't really my thing.", meaning: 'スケートボードは私にはちょっと合わないかな。', context: '好みではない', register: 'casual' },
        { phrase: "I'm just not really into it.", meaning: 'ただ、あまり興味がないんです。', context: '関心があまりない', register: 'casual' },
        { phrase: "I'm not that keen on it.", meaning: 'それほど熱中していません／気が進みません。', context: '強く言わずに断る', register: 'neutral' },
        { phrase: "No way! I can't stand them.", meaning: '絶対に無理！我慢できないくらい嫌い。', context: '強い拒否・嫌悪', register: 'casual' },
        { phrase: "I couldn't think of anything worse!", meaning: 'これ以上最悪なものはないよ！＝絶対に嫌だ！', context: '強い拒否を強調する', register: 'casual' },
      ],
      recognition: [
        { phrase: "can't stand ~", meaning: '〜が耐えられない／大嫌い。', note: '強い表現なので、相手や場面を選びます。' },
      ],
    },
    formal: {
      title: 'フォーマルに意見を言う',
      enTitle: 'Giving opinions formally',
      intro: '職場や会議では、好き嫌いの勢いよりも、考えを整理して丁寧に述べる表現が役立ちます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: "I'd say it's a great idea.", meaning: '素晴らしいアイデアだと思います。', context: '前向きな意見を述べる', register: 'polite' },
        { phrase: "In my opinion, it's the right way to go.", meaning: '私の意見では、それが正しい方向性です。', context: '自分の見解を示す', register: 'polite' },
        { phrase: "As I see it, this isn't the best approach.", meaning: '私が見る限り、これは最善のアプローチではありません。', context: '丁寧に異なる意見を出す', register: 'polite' },
      ],
      recognition: [
        { phrase: "I'd say...", meaning: '〜だと思います。', note: '断定を少しやわらげながら、自分の考えを始められます。' },
      ],
    },
    questions: {
      title: '相手の意見を尋ねる',
      enTitle: 'Asking for someone’s view',
      intro: '自分の意見だけで終わらず、相手の考えや気持ちも尋ねると、会話が一方通行になりません。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "What's your view?", meaning: 'あなたの見解はどうですか？', context: '見解を尋ねる', register: 'polite' },
        { phrase: "What's your opinion on this?", meaning: 'これについてあなたのご意見は？', context: '話題への意見を尋ねる', register: 'polite' },
        { phrase: 'How do you feel about it?', meaning: 'これについてどう感じますか？', context: '気持ちや反応を尋ねる', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'What do you think?', meaning: 'どう思いますか？', note: '幅広い場面で使える、基本の聞き方です。' },
      ],
    },
    preferences: {
      title: '好みや「どちらでもいい」を伝える',
      enTitle: 'Expressing preferences & indifference',
      intro: '選択肢があるときは、どちらがいいかをはっきり選んでも、こだわりがないと伝えても大丈夫です。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "I'd prefer sushi to pizza.", meaning: 'ピザよりもお寿司がいいです。', context: '一方を選ぶ', register: 'polite' },
        { phrase: "I'd much rather have sushi.", meaning: '断然お寿司のほうがいいな。', context: '強くこちらを選ぶ', register: 'neutral' },
        { phrase: "I'd definitely go for pizza.", meaning: '間違いなくピザにするね。', context: '選択をはっきり伝える', register: 'neutral' },
        { phrase: "I don't really mind.", meaning: '特に気にしないよ／どっちでもいいよ。', context: 'こだわりがない', register: 'neutral' },
        { phrase: 'Happy either way.', meaning: 'どっちでも嬉しいよ。', context: 'どちらでも前向き', register: 'casual' },
        { phrase: "I'm not fussed.", meaning: 'こだわりはないよ。', context: '気にしない・英国でよく聞く', register: 'casual' },
        { phrase: 'Both are okay with me.', meaning: '私としては両方ともOKだよ。', context: '両方を受け入れる', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'What do you fancy?', meaning: '何がいい？／何を選びたい？', note: 'カジュアルに好みを尋ねる表現です。' },
      ],
    },
    dialogues: [
      {
        id: 'strong-like',
        label: 'Pattern A · Say how much you like it',
        title: '好きの強さを伝える',
        lines: [
          { speaker: 'A', en: 'Do you like this band?', ja: 'このバンドが好きですか？' },
          { speaker: 'B', en: "Yes, I'm really into it at the moment!", ja: 'ええ、今すごくハマっているんです！' },
        ],
      },
      {
        id: 'preference-choice',
        label: 'Pattern B · Choose between two options',
        title: '好みを選んで伝える',
        lines: [
          { speaker: 'A', en: 'What do you fancy? Pizza or sushi?', ja: '何がいい？ ピザ、それともお寿司？' },
          { speaker: 'B', en: "I'd much rather have sushi.", ja: '断然お寿司のほうがいいな。' },
        ],
      },
      {
        id: 'formal-opinion',
        label: 'Pattern C · Share a considered view',
        title: '丁寧に意見を述べる',
        lines: [
          { speaker: 'A', en: "What's your opinion on this?", ja: 'これについてあなたのご意見は？' },
          { speaker: 'B', en: "In my opinion, it's the right way to go.", ja: '私の意見では、それが正しい方向性です。' },
        ],
      },
    ],
    tip: 'No way! は、強い拒絶（ありえない！／絶対嫌だ！）を表すときによく使います。たとえば “Do you like eggs?” に “No way! They’re gross!” と返せます。一方で、驚きを表す「まさか！」としても使えます。 “No way! I can’t believe he said that!” のように、日本語の「うそでしょ！？」に近いニュアンスになることもあります。',
  },
  practice: {
    title: '意見と好みを、自分の言葉にする',
    instructions: '日本語の説明はここまで。好きの強さ、苦手のやわらげ方、選び方を英語のリズムで声に重ねます。',
    coreHeading: 'まずは、気持ちの強さを声にする。',
    dialogueHeading: '選び、答え、相手にも尋ねる。',
    dialogueDescription: '相手の声のあとに、自分の好みや意見を短く返します。',
    finishTitle: '明日、ひとつの好みを理由つきで伝えてみましょう。',
    corePhrases: [
      { phrase: 'I absolutely love it!', context: '強く好きだと伝える', rate: 0.86 },
      { phrase: "I'm really into it at the moment.", context: '今ハマっている', rate: 0.8 },
      { phrase: "It's not really my thing.", context: '苦手をやわらげる', rate: 0.82 },
      { phrase: "I'm not that keen on it.", context: '気が進まない', rate: 0.82 },
      { phrase: "I'd say it's a great idea.", context: '丁寧に意見を述べる', rate: 0.84 },
      { phrase: "I'd much rather have sushi.", context: '好みを選ぶ', rate: 0.82 },
      { phrase: "I don't really mind.", context: 'どちらでもいい', rate: 0.84 },
      { phrase: 'Happy either way.', context: 'どちらでも前向き', rate: 0.86 },
    ],
    dialogues: [
      { title: 'Say how much you like it', lines: ['Do you like this band?', "Yes, I'm really into it at the moment!"] },
      { title: 'Choose between two options', lines: ['What do you fancy? Pizza or sushi?', "I'd much rather have sushi."] },
      { title: 'Share a considered view', lines: ["What's your opinion on this?", "In my opinion, it's the right way to go."] },
    ],
    natural: [
      { full: 'I do not like it very much.', natural: "It's not really my thing." },
      { full: 'I prefer sushi.', natural: "I'd much rather have sushi." },
      { full: 'I have no preference.', natural: "I don't really mind." },
    ],
  },
}
