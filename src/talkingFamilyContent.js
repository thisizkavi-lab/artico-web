/** Chapter 15 · Talking about family. */
export const talkingFamilyLesson = {
  id: 'talking-family',
  kind: 'talking-family',
  number: '15',
  title: 'なぜ「家族について話す」のでしょうか？',
  enTitle: 'Talking about family',
  ja: '家族との関係や、身近な人たちの生活について自然に話します。',
  cando: '家族について尋ね、自分のきょうだい構成や家族との関係を説明できる。',
  learn: {
    intro: [
      '前の章では、家族や親戚を表す基本的な言葉を学びました。この章では、その言葉を使って、自分の生活や、自分にとって大切な人たちについて話す練習をします。',
      '家族について話すということは、単に「誰が家族なのか」を伝えるだけではありません。きょうだいが何人いるのか、家族とどのくらい親しいのか、どこに住んでいるのかなど、家族との関係についても話します。',
      'この章では、相手の家族について自然に尋ねる方法と、自分の家族について説明する方法を学びます。',
    ],
    functions: [
      ['01', 'きょうだいをたずねる'],
      ['02', '自分の立ち位置を話す'],
      ['03', '家族との距離を伝える'],
      ['04', '親戚の話を続ける'],
    ],
    immediate: {
      title: 'きょうだいや自分の立ち位置',
      enTitle: 'Immediate family',
      intro: 'きょうだいがいるか、自分が一番上・真ん中・一番下のどこにいるかを、会話の中で伝えます。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Have you got any brothers or sisters?', meaning: 'きょうだいはいますか？', context: 'きょうだいをたずねる', register: 'casual' },
        { phrase: "Yes, I've got a brother and two stepsisters.", meaning: '兄弟が1人と、義理の姉妹が2人います。', context: 'きょうだいを答える', register: 'casual' },
        { phrase: "I'm the oldest.", meaning: '私が一番上です。', context: '長子だと伝える', register: 'neutral' },
        { phrase: "I'm the middle child.", meaning: '私が真ん中の子です。', context: '真ん中の子だと伝える', register: 'neutral' },
        { phrase: "I'm the youngest.", meaning: '私が一番下です。', context: '末っ子だと伝える', register: 'neutral' },
        { phrase: "I'm an only child.", meaning: '私は一人っ子です。', context: '一人っ子だと伝える', register: 'neutral' },
        { phrase: "I've got two younger sisters.", meaning: '妹が2人います。', context: 'きょうだいの人数と順番', register: 'neutral' },
        { phrase: 'We grew up in Birmingham.', meaning: '私たちはバーミンガムで育ちました。', context: '育った場所を話す', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'Have you got...? / Do you have...?', meaning: '〜はありますか？／いますか？', note: 'Have you got...? はイギリス英語の日常会話でよく使われます。' },
      ],
    },
    closeness: {
      title: '家族との関係や、子どもについて話す',
      enTitle: 'Family relationships',
      intro: '家族とどのくらい親しいか、子どもがいるかを、相手への関心を示しながらたずねます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: 'Are you close to your family?', meaning: 'ご家族とは仲がいいですか？', context: '家族との距離をたずねる', register: 'neutral' },
        { phrase: 'Yeah, I speak to my parents nearly every day.', meaning: 'ええ、両親とはほぼ毎日話します。', context: '親しさを具体的に答える', register: 'neutral' },
        { phrase: "But I don't see my sister much. She's moved to India.", meaning: 'でも姉／妹とはあまり会いません。インドに引っ越しました。', context: '会う頻度と理由を伝える', register: 'neutral' },
        { phrase: 'So, have you got any kids?', meaning: 'それで、お子さんはいますか？', context: '子どもについてたずねる', register: 'casual' },
        { phrase: 'Yes, two daughters. How about you?', meaning: 'はい、娘が2人います。あなたは？', context: '子どもの人数を答えて返す', register: 'neutral' },
        { phrase: "I've got a toddler, and baby number two on the way!", meaning: 'よちよち歩きの子が1人と、もうすぐ2人目が生まれます！', context: '子どもと妊娠を伝える', register: 'casual' },
      ],
      recognition: [
        { phrase: 'on the way', meaning: '（赤ちゃんが）もうすぐ生まれる／お腹にいる。', note: 'baby number two on the way のように、自然で温かい言い方です。' },
      ],
    },
    extended: {
      title: '親戚について話す',
      enTitle: 'Extended family',
      intro: '祖父母、いとこ、おじ・おばの話を、予定や思い出と一緒に続けます。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "Don't forget we're visiting Grandma today.", meaning: '今日、おばあちゃんを訪ねるのを忘れないでね。', context: '家族の予定を思い出させる', register: 'casual' },
        { phrase: 'Auntie Dot will be there, too. Oh, and cousin Henry!', meaning: 'ドットおばさんも来るよ。それに、いとこのヘンリーも！', context: '来る親戚を付け足す', register: 'casual' },
        { phrase: 'How many grandchildren have you got?', meaning: 'お孫さんは何人いますか？', context: '孫の人数をたずねる', register: 'neutral' },
        { phrase: 'Two grandsons and a granddaughter. I adore them!', meaning: '孫息子が2人と、孫娘が1人です。とても可愛がっています。', context: '孫の人数と気持ちを答える', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'Auntie / Grandma', meaning: 'おばさん／おばあちゃん。', note: '家族の呼び名に親しみを込めた形です。' },
      ],
    },
    dialogues: [
      {
        id: 'immediate',
        label: 'Pattern A · Immediate family',
        title: 'きょうだい構成を話す',
        lines: [
          { speaker: 'A', en: 'Have you got any brothers or sisters?', ja: 'きょうだいはいますか？' },
          { speaker: 'B', en: "Yes, I've got a brother and two stepsisters.", ja: '兄弟が1人と、義理の姉妹が2人います。' },
        ],
      },
      {
        id: 'closeness',
        label: 'Pattern B · Family relationships',
        title: '家族との距離を話す',
        lines: [
          { speaker: 'A', en: 'Are you close to your family?', ja: 'ご家族とは仲がいいですか？' },
          { speaker: 'B', en: 'Yeah, I speak to my parents nearly every day.', ja: 'ええ、両親とはほぼ毎日話します。' },
        ],
      },
      {
        id: 'extended',
        label: 'Pattern C · Extended family',
        title: '親戚の話を続ける',
        lines: [
          { speaker: 'A', en: "How many grandchildren have you got?", ja: 'お孫さんは何人いますか？' },
          { speaker: 'B', en: 'Two grandsons and a granddaughter. I adore them!', ja: '孫息子が2人と、孫娘が1人です。とても可愛がっています。' },
        ],
      },
    ],
    tip: '英語圏では、地域によって親の呼び方が少し変わります。イギリスでは Mum、アメリカでは Mom、北部やウェールズなどでは Mam を聞くことがあります。映画やドラマで家族の呼び方に注目すると、地域の違いにも気づけます。',
  },
  practice: {
    title: '家族の話を、会話の中で自然に続ける',
    instructions: '日本語の説明はここまで。自分の家族を思い浮かべ、英語だけで質問と返答を練習します。',
    coreHeading: 'まずは、家族について話すまとまりを声にする。',
    dialogueHeading: 'たずねて、答えて、もう一つ聞き返す。',
    dialogueDescription: 'きょうだい、家族との距離、親戚について英語だけで練習します。',
    finishTitle: '次に家族の話になったら、ひとつ質問してみましょう。',
    corePhrases: [
      { phrase: 'Have you got any brothers or sisters?', context: 'きょうだいをたずねる', rate: 0.8 },
      { phrase: "I've got two younger sisters.", context: 'きょうだいを答える', rate: 0.82 },
      { phrase: "I'm the oldest.", context: '一番上だと伝える', rate: 0.86 },
      { phrase: "I'm an only child.", context: '一人っ子だと伝える', rate: 0.84 },
      { phrase: 'We grew up in Birmingham.', context: '育った場所を話す', rate: 0.8 },
      { phrase: 'Are you close to your family?', context: '親しさをたずねる', rate: 0.8 },
      { phrase: 'I speak to my parents nearly every day.', context: '家族との頻度を話す', rate: 0.76 },
      { phrase: 'Have you got any kids?', context: '子どもをたずねる', rate: 0.84 },
      { phrase: 'Baby number two on the way!', context: 'もうすぐ生まれると伝える', rate: 0.8 },
      { phrase: 'I adore them!', context: '家族への気持ちを伝える', rate: 0.86 },
    ],
    dialogues: [
      { title: 'Immediate family', lines: ['Have you got any brothers or sisters?', "Yes, I've got a brother and two stepsisters."] },
      { title: 'Family relationships', lines: ['Are you close to your family?', 'Yeah, I speak to my parents nearly every day.'] },
      { title: 'Extended family', lines: ['How many grandchildren have you got?', 'Two grandsons and a granddaughter. I adore them!'] },
    ],
    natural: [
      { full: 'Do you have brothers or sisters?', natural: 'Have you got any brothers or sisters?' },
      { full: 'The second baby is going to be born soon.', natural: 'Baby number two on the way!' },
      { full: 'I speak with my parents almost every day.', natural: 'I speak to my parents nearly every day.' },
    ],
  },
}
