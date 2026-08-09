/** Chapter 08 · Saying thank you. */
export const thanksLesson = {
  id: 'thanks',
  kind: 'thanks',
  number: '08',
  title: 'なぜ「ありがとう」と言うのでしょうか？',
  enTitle: 'Saying thank you',
  ja: '相手の親切に気づき、場面に合う深さで感謝を伝えます。',
  cando: '軽いお礼から深い感謝まで、相手や場面に合う表現を選べる。',
  learn: {
    intro: [
      '誰かが助けてくれたり、何かをしてくれたり、親切にしてくれたとき、私たちはその気持ちに応えようとします。',
      '“Thank you” は、ただの礼儀ではありません。相手がしてくれたことに気づき、「その行動をありがたく思っています」と伝える表現です。',
      'ただし、感謝の伝え方は場面によって変わります。軽い “Thanks” で十分なこともあれば、もっと丁寧に、深く感謝を伝える必要があることもあります。この章では、さまざまな感謝の表現と、それに対する自然な返し方を学びます。',
    ],
    functions: [
      ['01', '軽いお礼を伝える'],
      ['02', '深い感謝を強調する'],
      ['03', '場面に合わせて言う'],
      ['04', '自然に返す'],
    ],
    basics: {
      title: '感謝を伝える基本と強調の表現',
      enTitle: 'Ways to thank people',
      intro: '日常の軽いお礼から、とても助かったときの深い感謝まで、気持ちの度合いに合わせて表現を選びます。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: 'Thanks! / Thanks a lot.', meaning: 'ありがとう！／本当にありがとう。', context: '日常の軽いお礼', register: 'casual' },
        { phrase: 'Thank you so much!', meaning: '本当にありがとうございます！', context: '強めの感謝を伝える', register: 'neutral' },
        { phrase: "I can't thank you enough!", meaning: '感謝してもしきれません！', context: '深く助けられたとき', register: 'polite' },
        { phrase: 'Thanks a million!', meaning: '本当にありがとう！', context: 'カジュアルに大きく感謝する', register: 'casual' },
        { phrase: 'Thank you, I really appreciate it.', meaning: 'ありがとうございます。本当に感謝しています。', context: '丁寧で心のこもった感謝', register: 'polite' },
        { phrase: 'Cheers.', meaning: 'ありがとう。', context: '英国英語のカジュアルなお礼', register: 'casual' },
      ],
      recognition: [
        { phrase: 'I really appreciate it', meaning: '本当に感謝しています。', note: '仕事やフォーマルな場でも使える、大人の感謝表現です。' },
      ],
    },
    situations: {
      title: '特定のシチュエーションで使う感謝フレーズ',
      enTitle: 'More phrases',
      intro: '場面ごとに丸ごと覚えておくと、必要なときに自然に出てきます。',
      image: '/assets/illustrations/greeting-online-wishes.svg',
      phrases: [
        { phrase: "That's so kind!", meaning: 'ご親切にどうも！', context: '思いやりに感謝する', register: 'neutral' },
        { phrase: 'I owe you one!', meaning: '一つ借りができたよ！／恩に着るよ！', context: '友人の助けに返す', register: 'casual' },
        { phrase: 'Thanks for having me over!', meaning: '今日は招いてくれてありがとう！', context: '家に招待された帰り際', register: 'casual' },
        { phrase: "You shouldn't have!", meaning: 'そんな、気を使わなくてよかったのに！', context: 'プレゼントやおもてなしに', register: 'neutral' },
      ],
      recognition: [
        { phrase: 'have me over', meaning: '家に招く。', note: '食事やパーティーに招待されたときの定番表現です。' },
      ],
    },
    replies: {
      title: '「どういたしまして」の様々な返し方',
      enTitle: 'Replying to “Thank you”',
      intro: '“You’re welcome” 以外にも、相手に負担を感じさせない、場面に合う返し方があります。',
      image: '/assets/illustrations/greeting-casual-chat.svg',
      phrases: [
        { phrase: "You're welcome!", meaning: 'どういたしまして！', context: '基本の返し方', register: 'neutral' },
        { phrase: 'No problem. / No worries!', meaning: '問題ないよ！／気にしないで！', context: '友人同士の気軽な返事', register: 'casual' },
        { phrase: "That's okay.", meaning: 'いいんだよ。／大丈夫だよ。', context: '相手を安心させる', register: 'neutral' },
        { phrase: "Don't mention it.", meaning: 'お礼なんていいですよ。', context: '謙遜したスマートな返し', register: 'polite' },
        { phrase: 'My pleasure!', meaning: 'どういたしまして。／こちらこそ嬉しいです。', context: '喜んでやったと伝える', register: 'polite' },
        { phrase: 'Any time!', meaning: 'いつでもどうぞ！', context: 'また頼ってほしいと伝える', register: 'casual' },
      ],
      recognition: [
        { phrase: 'My pleasure', meaning: '喜んで／こちらこそ嬉しいです。', note: '丁寧で温かい返し方です。' },
      ],
    },
    dialogues: [
      {
        id: 'help',
        label: 'Pattern A · Thank someone for help',
        title: '助けてもらったとき',
        lines: [
          { speaker: 'A', en: 'Thanks for your help!', ja: '手伝ってくれてありがとう！' },
          { speaker: 'B', en: 'No worries!', ja: '気にしないで！' },
        ],
      },
      {
        id: 'gift',
        label: 'Pattern B · Respond to a thoughtful gift',
        title: 'プレゼントをもらったとき',
        lines: [
          { speaker: 'A', en: "You shouldn't have! It's lovely.", ja: 'そんな、気を使わなくてよかったのに！素敵だね。' },
          { speaker: 'B', en: 'My pleasure!', ja: 'どういたしまして！' },
        ],
      },
      {
        id: 'compliment',
        label: 'Pattern C · Return a kind compliment',
        title: '褒め言葉に返す',
        lines: [
          { speaker: 'A', en: "You're looking well!", ja: '元気そうだね！' },
          { speaker: 'B', en: 'Thanks, so are you!', ja: 'ありがとう、あなたもね！' },
        ],
      },
    ],
    tip: '相手から “You’re looking well!” と褒められたら、“Thanks, so are you!” と返すと自然な会話のキャッチボールになります。まず感謝を示し、相手にも同じ気持ちを返してみましょう。',
  },
  practice: {
    title: '感謝を伝えて、自然に返す',
    instructions: '日本語の説明はここまで。感謝の深さと、相手への自然な返事を英語のリズムで声に重ねます。',
    coreHeading: 'まずは、感謝の深さを声にする。',
    dialogueHeading: 'ありがとうを受けて、返事を返す。',
    dialogueDescription: '相手の言葉を聞いたあと、感謝するか、自然に受け止めるかを返します。',
    finishTitle: '明日、誰かに一つ心からの “Thank you” を伝えてみましょう。',
    corePhrases: [
      { phrase: 'Thanks a lot.', context: '日常のありがとう', rate: 0.86 },
      { phrase: 'Thank you so much!', context: '強く感謝する', rate: 0.84 },
      { phrase: 'I really appreciate it.', context: '丁寧に感謝する', rate: 0.82 },
      { phrase: "That's so kind!", context: '親切に感謝する', rate: 0.84 },
      { phrase: 'I owe you one!', context: '助けへのカジュアルなお礼', rate: 0.84 },
      { phrase: "You're welcome!", context: '基本の返事', rate: 0.86 },
      { phrase: 'No worries!', context: '気軽な返事', rate: 0.86 },
      { phrase: 'My pleasure!', context: '丁寧で温かい返事', rate: 0.82 },
      { phrase: 'Any time!', context: 'また頼ってほしいと伝える', rate: 0.86 },
    ],
    dialogues: [
      { title: 'Thank someone for help', lines: ['Thanks for your help!', 'No worries!'] },
      { title: 'Respond to a thoughtful gift', lines: ["You shouldn't have! It's lovely.", 'My pleasure!'] },
      { title: 'Return a kind compliment', lines: ["You're looking well!", 'Thanks, so are you!'] },
    ],
    natural: [
      { full: 'Thank you very much.', natural: 'Thanks a lot.' },
      { full: 'I am grateful for your help.', natural: 'I really appreciate it.' },
      { full: 'You do not need to worry about it.', natural: 'No worries!' },
    ],
  },
}
