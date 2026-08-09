/** Chapter 16 · Life events. */
export const lifeEventsLesson = {
  id: 'life-events',
  kind: 'life-events',
  number: '16',
  title: 'なぜ「人生の出来事」に使う表現を学ぶのでしょうか？',
  enTitle: 'Life events',
  ja: '人生の節目に合わせて、喜びや思いやりを自然に伝える表現を学びます。',
  cando: 'お祝い、節目、お悔やみなど、状況に合った言葉を選んで伝えられる。',
  learn: {
    intro: [
      '人生には、誕生日、卒業、結婚、昇進、退職など、さまざまな大切な節目があります。また、悲しい出来事やつらい経験をすることもあります。',
      'こうした場面では、何を言うかだけでなく、その状況に合った言葉を選ぶことが大切です。一緒に喜ぶこともあれば、励ましたり、相手を思いやる気持ちを伝えたりすることもあります。',
      'この章では、人生のさまざまな出来事に対して、自然で適切な言葉を伝える方法を学びます。',
    ],
    functions: [
      ['01', '喜びを伝える'],
      ['02', '節目を祝う'],
      ['03', '思いやりを示す'],
      ['04', '場面に合う言葉を選ぶ'],
    ],
    celebrations: {
      title: 'お祝い事',
      enTitle: 'Celebrations',
      intro: '誕生日、昇進、結婚など、嬉しい知らせを聞いたときに、相手と喜びを分かち合います。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Happy birthday!', meaning: 'お誕生日おめでとう！', context: '誕生日を祝う', register: 'casual' },
        { phrase: 'What presents did you get?', meaning: 'どんなプレゼントをもらったの？', context: '誕生日の話を続ける', register: 'casual' },
        { phrase: 'I hear congratulations are in order?', meaning: 'お祝いを言わなきゃいけないみたいだね？', context: '良い知らせを聞いて祝う', register: 'neutral' },
        { phrase: 'Yes, I got the promotion!', meaning: 'ええ、昇進したんです！', context: '昇進を知らせる', register: 'casual' },
        { phrase: "Here's to the newlyweds!", meaning: '新婚さんに乾杯！', context: '新婚の二人を祝う', register: 'casual' },
        { phrase: 'Thanks, everyone!', meaning: 'みんな、ありがとう！', context: 'お祝いへの返事', register: 'casual' },
      ],
      recognition: [
        { phrase: 'Congratulations are in order', meaning: 'お祝いするのにふさわしい状況ですね。', note: '昇進、結婚、妊娠などの良い知らせへの少し大人っぽい表現です。' },
      ],
    },
    milestones: {
      title: '人生の節目・記念すべき出来事',
      enTitle: 'Milestones',
      intro: '出産、卒業、新居など、人生の大きなステップを迎えた人にかける言葉です。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: 'Congrats on the birth of your baby boy!', meaning: '男の子の誕生、おめでとう！', context: '赤ちゃんの誕生を祝う', register: 'casual' },
        { phrase: "Isn't he beautiful!", meaning: '本当にかわいいでしょ！', context: '赤ちゃんについて返す', register: 'casual' },
        { phrase: 'Well done! / Happy graduation!', meaning: 'よくやったね！／卒業おめでとう！', context: '卒業を祝う', register: 'casual' },
        { phrase: "We're really proud of you!", meaning: '私たちは本当にあなたを誇りに思うよ！', context: '努力をたたえる', register: 'neutral' },
        { phrase: 'Welcome to my new home!', meaning: '私の新居へようこそ！', context: '新居に人を招く', register: 'casual' },
        { phrase: 'Your very own place at last!', meaning: 'ついにあなた自身の家を持ったんだね！', context: '新居を喜ぶ', register: 'casual' },
      ],
      recognition: [
        { phrase: 'Congrats', meaning: 'Congratulations のカジュアルな省略。', note: '友人同士の会話やメッセージでよく使われます。' },
      ],
    },
    otherEvents: {
      title: 'その他の出来事・お悔やみ',
      enTitle: 'Other events',
      intro: '記念日や退職を祝う場面と、悲しい知らせに寄り添う場面では、声のかけ方が大きく変わります。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "Happy anniversary! Here's to another 30 years!", meaning: '記念日おめでとう！これからの30年にも乾杯！', context: '記念日を祝う', register: 'casual' },
        { phrase: "Oh, they're gorgeous! Thank you!", meaning: 'まあ、とても素敵！ありがとう！', context: '贈り物に返す', register: 'casual' },
        { phrase: 'All the best for your retirement.', meaning: '退職後のご多幸をお祈りします。', context: '退職を祝う', register: 'polite' },
        { phrase: "I'll miss you all!", meaning: 'みんなと会えなくなるのが寂しいよ！', context: '別れの気持ちを伝える', register: 'casual' },
        { phrase: "I'm so sorry for your loss.", meaning: 'この度はご愁傷様です。', context: 'お悔やみを伝える', register: 'polite' },
        { phrase: "Let me know if there's anything I can do.", meaning: '私にできることがあったら言ってね。', context: '支える気持ちを伝える', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'for your loss', meaning: 'あなたの大切な人を失ったことについて。', note: "I'm sorry for your loss. は、家族や親しい人を亡くした相手への決まり文句です。" },
      ],
    },
    dialogues: [
      {
        id: 'celebration',
        label: 'Pattern A · Celebrate good news',
        title: '良い知らせを祝う',
        lines: [
          { speaker: 'A', en: 'I hear congratulations are in order?', ja: 'お祝いを言わなきゃいけないみたいだね？' },
          { speaker: 'B', en: 'Yes, I got the promotion!', ja: 'ええ、昇進したんです！' },
        ],
      },
      {
        id: 'milestone',
        label: 'Pattern B · Celebrate a milestone',
        title: '人生の節目を祝う',
        lines: [
          { speaker: 'A', en: 'Congrats on the birth of your baby boy!', ja: '男の子の誕生、おめでとう！' },
          { speaker: 'B', en: "Isn't he beautiful!", ja: '本当にかわいいでしょ！' },
        ],
      },
      {
        id: 'sympathy',
        label: 'Pattern C · Show sympathy',
        title: '思いやりを伝える',
        lines: [
          { speaker: 'A', en: "I'm so sorry for your loss.", ja: 'この度はご愁傷様です。' },
          { speaker: 'B', en: "Thank you. Let me know if there's anything I can do.", ja: 'ありがとう。何かできることがあれば言ってください。' },
        ],
      },
    ],
    tip: 'Here’s to ~ は、グラスを掲げて「〜に乾杯しよう！」と言う定番フレーズです。Here’s to the newlyweds!、Here’s to us!、Here’s to your new job! のように、祝いたい人や出来事を後ろに置きます。',
  },
  practice: {
    title: '人生の出来事に、ふさわしい言葉を返す',
    instructions: '日本語の説明はここまで。喜び、節目、お悔やみの場面に合わせて、英語の声を重ねます。',
    coreHeading: 'まずは、お祝いと気づかいのまとまりを声にする。',
    dialogueHeading: '場面に合わせて、喜びや思いやりを返す。',
    dialogueDescription: '良い知らせ、人生の節目、お悔やみの3つの場面を英語だけで練習します。',
    finishTitle: '次に誰かの節目を聞いたら、ひとつ言葉をかけてみましょう。',
    corePhrases: [
      { phrase: 'Happy birthday!', context: '誕生日を祝う', rate: 0.88 },
      { phrase: 'Congratulations!', context: '良い知らせを祝う', rate: 0.86 },
      { phrase: 'I got the promotion!', context: '昇進を知らせる', rate: 0.82 },
      { phrase: "Here's to the newlyweds!", context: '新婚の二人を祝う', rate: 0.78 },
      { phrase: 'Congrats on the birth of your baby boy!', context: '誕生を祝う', rate: 0.76 },
      { phrase: "We're really proud of you!", context: '努力をたたえる', rate: 0.8 },
      { phrase: 'All the best for your retirement.', context: '退職を祝う', rate: 0.76 },
      { phrase: "I'm so sorry for your loss.", context: 'お悔やみを伝える', rate: 0.78 },
      { phrase: "Let me know if there's anything I can do.", context: '支える気持ちを伝える', rate: 0.74 },
      { phrase: "Here's to us!", context: '自分たちに乾杯する', rate: 0.86 },
    ],
    dialogues: [
      { title: 'Celebrate good news', lines: ['I hear congratulations are in order?', 'Yes, I got the promotion!'] },
      { title: 'Celebrate a milestone', lines: ['Congrats on the birth of your baby boy!', "Isn't he beautiful!"] },
      { title: 'Show sympathy', lines: ["I'm so sorry for your loss.", "Thank you. Let me know if there's anything I can do."] },
    ],
    natural: [
      { full: 'Congratulations on your new job.', natural: "Here's to your new job!" },
      { full: 'I am very proud of you.', natural: "We're really proud of you!" },
      { full: 'Please tell me if I can help in any way.', natural: "Let me know if there's anything I can do." },
    ],
  },
}
