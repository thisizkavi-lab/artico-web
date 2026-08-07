export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const learnSteps = [
  { id: 'orientation', label: 'Orientation', ja: '学び方を知る' },
  { id: 'letters', label: 'Meet the 26 letters', ja: '26文字に出会う' },
  { id: 'hear', label: 'Hear the Alphabet', ja: '文字の名前を聞く' },
  { id: 'write', label: 'Write the Alphabet', ja: '紙に書く' },
  { id: 'sounds', label: 'Letters & sounds', ja: '文字と音の違い' },
  { id: 'tongue-intro', label: 'Tongue Twisters', ja: '口の動きを整える' },
]

export const tongueGroups = [
  {
    id: 'contrasts',
    number: '01',
    title: 'Japanese-priority contrasts',
    ja: '日本語話者が迷いやすい音を、短い切り替えで感じる',
    items: [
      {
        id: 'red-lorry',
        phrase: 'Red lorry, yellow lorry.',
        target: 'R / L',
        duration: '6–8 min',
        why: '日本語ではR/Lを一つのカテゴリーとして聞きやすいため、英語では切り替えが難しくなります。',
        cue: 'Rでは舌先を上につけない。Lでは舌先を上の歯ぐきにつけて離します。',
        transfer: ['I really like it.', 'Turn left at the light.'],
      },
      {
        id: 'seashells',
        phrase: 'She sells seashells by the seashore.',
        target: 'S / SH',
        duration: '6–8 min',
        why: '細いSの息と、少し広いSHの息を、単語の中で切り替える練習です。',
        cue: 'Sは舌を前に、SHは唇を少し丸めて、息の通り道を変えます。',
        transfer: ['She said so.', 'Show me the shop.'],
      },
      {
        id: 'free-throws',
        phrase: 'Three free throws.',
        target: 'TH / F',
        duration: '5–7 min',
        why: 'THとFを同じ音にせず、舌と唇の位置を素早く切り替えます。',
        cue: 'THは舌先を歯の間へ。Fは下唇を上の歯に軽く触れます。',
        transfer: ['Three friends.', 'Feel the difference.'],
      },
    ],
  },
  {
    id: 'consonants',
    number: '02',
    title: 'Clean consonants',
    ja: '破裂と語尾を、余分な母音なしで出す',
    items: [
      { id: 'peter-piper', phrase: 'Peter Piper picked a peck of pickled peppers.', target: 'P', duration: '6–8 min', why: 'Pの息を明確に出しながら、音の後に余分な母音を足さない練習です。', cue: '唇を閉じ、短く息を解放します。強く吹きすぎないでください。', transfer: ['Pick a paper.', 'Please pass the pepper.'] },
      { id: 'big-black-bug', phrase: 'A big black bug bit a big black bear.', target: 'B + END', duration: '6–8 min', why: 'Bの閉鎖、短い母音、聞こえる語尾を一つの流れで整えます。', cue: 'Bは声を出しながら唇を開き、語尾の子音で止めます。', transfer: ['A big blue bag.', 'Bob bought a book.'] },
      { id: 'two-witches', phrase: 'If two witches were watching two watches, which witch would watch which watch?', target: 'W / CH', duration: '8–10 min', why: '丸いWと鋭いCHを、長い英語のリズムの中で保ちます。', cue: 'Wは唇を丸め、CHは舌の後ろにためた空気を短く出します。', transfer: ['Which way?', 'Watch this.'] },
    ],
  },
  {
    id: 'clusters',
    number: '03',
    title: 'Clusters without extra vowels',
    ja: '子音のかたまりを、分解せずにつなぐ',
    items: [
      { id: 'ice-cream', phrase: 'I scream, you scream, we all scream for ice cream.', target: 'SCR', duration: '6–8 min', why: 'SCRを一つの動きとして出し、子音の間に母音を挟まない練習です。', cue: 'Sの息を止めずにKへ移り、そのままRへつなげます。', transfer: ['The screen is bright.', 'Scratch the surface.'] },
      { id: 'slippery-snails', phrase: 'Six slippery snails slid slowly seaward.', target: 'SL / SN', duration: '6–8 min', why: 'SLとSNを分解せず、Sの息を次の子音へ渡します。', cue: 'Sを言った後、母音を入れずにLまたはNへ直接移ります。', transfer: ['Sleep slowly.', 'Snow is falling.'] },
      { id: 'fresh-flesh', phrase: 'Freshly fried fresh flesh.', target: 'FR / FL', duration: '5–7 min', why: 'R/Lの違いを、より難しい子音クラスターの中で練習します。', cue: 'Fの息を保ったまま、Rでは触れず、Lでは舌先を触れます。', transfer: ['Fresh flowers.', 'A friendly place.'] },
    ],
  },
  {
    id: 'rhythm',
    number: '04',
    title: 'Rhythm + vowel movement',
    ja: '同じ拍の中で、母音と強弱を切り替える',
    items: [
      { id: 'betty-botter', phrase: 'Betty Botter bought some butter.', target: 'B / T', duration: '6–8 min', why: '子音の骨格を保ちながら、変化する母音と英語の強弱を感じます。', cue: 'すべての単語を同じ強さにせず、名前と動詞をはっきり置きます。', transfer: ['Better butter.', 'Betty bought it.'] },
      { id: 'woodchuck', phrase: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', target: 'W / CH', duration: '8–10 min', why: '繰り返す音を、強い拍と弱い拍の流れに乗せます。', cue: '内容語に拍を置き、その間の短い語は軽く通過します。', transfer: ['What would you choose?', 'How much could it cost?'] },
      { id: 'unique-new-york', phrase: 'Unique New York.', target: 'YOO / K·N', duration: '5–7 min', why: '母音から語尾のK、次のNへ、境目を曖昧にせず切り替えます。', cue: 'UniqueのKを消さず、短く閉じてからNewのNへ移ります。', transfer: ['A unique name.', 'New York at night.'] },
    ],
  },
]

export const allTwisters = tongueGroups.flatMap((group) => group.items.map((item) => ({ ...item, groupId: group.id, groupTitle: group.title })))

// Legacy lesson prototypes retained for the detailed lesson renderer. The
// 96-chapter Social Fluency syllabus is generated from the book map in
// src/socialFluencyCurriculum.js; promote chapters here only when their theory
// has been curated into a complete lesson.
export const socialFluencyModules = [
  {
    id: 'icebreakers',
    number: '01',
    title: 'アイスブレイクと会話のサバイバル',
    enTitle: 'Icebreakers & Survival',
    cando: 'I can begin a first encounter, recover when I miss something, and show active interest.',
    status: 'interactive',
    lessons: [
      {
        id: 'check-in',
        number: '1.1',
        title: '1.1 The natural check-in',
        ja: '自然なあいさつと近況のやり取り',
        cando: '関係性と時間の空き方に応じて、自然なあいさつと返答を選ぶことができる。',
        learn: {
          context: '「How are you? — I\'m fine.」だけに固定しない。初対面とひさしぶりの再会で言葉を使い分けます。',
          notice: [
            { text: 'How are you doing?', note: 'カジュアルな日常の問いかけ' },
            { text: 'I\'m good. How\'ve you been?', note: '「ひさしぶり」を含んだ返し' },
            { text: 'It\'s a pleasure to meet you.', note: '丁寧な初対面の挨拶' },
          ],
          breakdown: [
            { phrase: 'How are you doing?', ja: 'How are you? より自然で広く使われるカジュアルな挨拶。' },
            { phrase: 'How\'ve you been?', ja: 'How have you been? の短縮形。前に会ってから今日までの近況を尋ねる。' },
            { phrase: 'Nice / Pleasure to meet you.', ja: '初対面でのみ使う。すでに知っている相手には Nice to see you. を選ぶ。' },
          ],
          imitate: [
            'How are you doing?',
            'I\'m good, thanks. How\'ve you been?',
            'It\'s a pleasure to meet you.',
          ],
        },
        practice: {
          substitute: {
            label: 'Register & situation frames',
            options: [
              { phrase: 'How\'ve you been?', note: '再会 · カジュアル' },
              { phrase: 'How is everything going?', note: '近況 · フォーマル' },
              { phrase: 'Great to see you again.', note: '再会 · 暖かい表現' },
            ],
          },
          personalize: '最近の出来事（仕事・趣味・体調など）を1文で添えて声に出してみましょう。',
          mission: {
            scenario: '同僚と数週間ぶりにエレベーターで会いました。',
            prompt: '自然な再会の挨拶を声に出して答えてみましょう。',
            starters: [
              "How've you been?",
              "Great to see you again!",
              "Good to see you! How is everything going?"
            ],
            modelResponse: "Hey! Good to see you! How've you been?",
          },
          spaced: 'この近況確認の動きは、Module 7（新しい職場と人間関係）で再び応用します。',
        },
      },
      {
        id: 'introductions',
        number: '1.2',
        title: '1.2 Smooth introductions',
        ja: '自分と他人のスムーズな紹介',
        cando: '唐突にならず、自分から自己紹介を始めたり、知り合いを互いに紹介できる。',
        learn: {
          context: '名乗り出る時の「柔らかい入口」と、自分以外の誰かを間に立ってつなぐフレーズです。',
          notice: [
            { text: 'I don\'t think we\'ve met. I\'m Ken.', note: '自分から名乗る柔らかい切り出し' },
            { text: 'I\'d like to introduce you to Sarah.', note: 'フォーマルな紹介' },
            { text: 'This is my colleague, Maya.', note: 'カジュアルな紹介' },
          ],
          breakdown: [
            { phrase: 'I don\'t think we\'ve met.', ja: 'いきなり名前を言う前に挟むことで、押しつけがましくない印象を与える。' },
            { phrase: 'I\'d like to introduce you to...', ja: 'ビジネスやフォーマルな場で第三者を引き合わせる基本型。' },
            { phrase: 'This is my [relationship], [Name].', ja: '関係性（同僚・友人など）を添えて紹介する最も使いやすい型。' },
          ],
          imitate: [
            'I don\'t think we\'ve met. I\'m Ken.',
            'I\'d like to introduce you to Sarah.',
            'This is my colleague, Maya.',
          ],
        },
        practice: {
          substitute: {
            label: 'Relationship slot substitution',
            options: [
              { phrase: 'This is my colleague, ___.', note: '職場・同僚' },
              { phrase: 'This is my teammate, ___.', note: 'プロジェクト仲間' },
              { phrase: 'This is my friend, ___.', note: '友人' },
            ],
          },
          personalize: 'あなたの身近な人（同僚や友人）の名前を入れて、「This is my...」と声に出してみましょう。',
          mission: {
            scenario: '立ち話をしている場に新しい同僚が加わりました。',
            prompt: '同僚を相手に紹介する言葉を声に出して答えてみましょう。',
            starters: [
              "I don't think you two have met. This is Maya.",
              "I'd like to introduce you to Maya.",
              "This is my colleague, Maya."
            ],
            modelResponse: "I don't think you two have met. This is my colleague, Maya.",
          },
          spaced: '自己紹介と他者紹介は、Module 7（職場での立ち回り）と8（会議の進行）でも使います。',
        },
      },
      {
        id: 'repair',
        number: '1.3',
        title: '1.3 Never freeze again',
        ja: '聞き返しと会話のリカバリー',
        cando: '聞き取れなかった時に固まらず、必要な助けを相手に求めて会話を維持できる。',
        learn: {
          context: '「What?」と単に聞き返すのではなく、どこが聞き取れなかったかを伝えて会話を止めない技術です。',
          notice: [
            { text: 'Sorry, I didn\'t catch that.', note: '最も汎用的な聞き返し' },
            { text: 'Could you say that again, please?', note: '丁寧な再発話リクエスト' },
            { text: 'What does "venue" mean?', note: '単語の意味を尋ねる' },
            { text: 'Do you mean the 3rd floor?', note: '認識の確認' },
          ],
          breakdown: [
            { phrase: 'I didn\'t catch that.', ja: '「耳で捕まえきれなかった」というニュアンス。自分の能力ではなく速度や音の問題として伝える。' },
            { phrase: 'What does ___ mean?', ja: '知らない単語が出た時に即座に止めて確認する安全ネット。' },
            { phrase: 'Do you mean...?', ja: '自分の理解が合っているかを短く確かめる確認フレーズ。' },
          ],
          imitate: [
            'Sorry, I didn\'t catch that.',
            'Could you say that again slowly?',
            'What does that word mean?',
          ],
        },
        practice: {
          substitute: {
            label: 'Repair phrase selection',
            options: [
              { phrase: 'Sorry, I didn\'t catch the last word.', note: '部分的な聞き取り不可' },
              { phrase: 'Could you slow down a little bit?', note: 'スピード調整の依頼' },
              { phrase: 'Just to clarify, do you mean tomorrow?', note: '意図の確認' },
            ],
          },
          personalize: '自分が会話で一番焦りやすい瞬間を思い浮かべ、お気に入りのリペアフレーズを1つ決めて発話します。',
          mission: {
            scenario: '相手が早口で予定を伝えてきました。',
            prompt: '丁寧かつ具体的にスピード調整をリクエストする言葉を声に出して答えてみましょう。',
            starters: [
              "Could you say that again a bit more slowly?",
              "Sorry, I didn't catch that. Could you slow down?",
              "Just to clarify, could you repeat that slowly?"
            ],
            modelResponse: "Sorry, I didn't catch that. Could you say that again a bit more slowly, please?",
          },
          spaced: 'リペアフレーズは、全8モジュールのすべての会話練習で自由に使えるセーフティネットです。',
        },
      },
      {
        id: 'backchanneling',
        number: '1.4',
        title: '1.4 Keep the ball rolling',
        ja: '相槌・クッション言語・次の問いかけ',
        cando: '英語らしいリアクション、つなぎ言葉（つなぎ息）、質問返しを使って会話を継続できる。',
        learn: {
          context: '無言で頷くだけや「Un-huh」の連投を卒業し、感情に合う短い反応と follow-up 質問を返します。',
          notice: [
            { text: 'Well... let me think.', note: '考える時間を買うフィラー' },
            { text: 'Oh, really? That\'s amazing!', note: '感情をのせるリアクション' },
            { text: 'How about you?', note: 'ボールを相手に打ち返す質問' },
          ],
          breakdown: [
            { phrase: 'Well... / Let me see...', ja: '黙り込まずに「今答えを考えている」ことを知らせる信号。' },
            { phrase: 'Really? / That sounds great!', ja: '日本語の「へえ〜」「そうなんですね」に相当する感情に応じた相槌。' },
            { phrase: 'How about you? / What about yourself?', ja: '自分の回答の直後に必ず添えて会話のキャッチボールを渡す。' },
          ],
          imitate: [
            'Well... let me think.',
            'Oh, really? That\'s interesting!',
            'I\'m good. How about you?',
          ],
        },
        practice: {
          substitute: {
            label: 'Reaction & filler bank',
            options: [
              { phrase: 'That sounds like a great idea.', note: '好意的な同意' },
              { phrase: 'Oh no, I\'m sorry to hear that.', note: '共感·お悔やみ' },
              { phrase: 'That\'s a good question...', note: '考える時間を買う' },
            ],
          },
          personalize: '「Well... let me think.」を使って、自分の好きな週末の過ごし方を3文以内で話してみましょう。',
          mission: {
            scenario: '相手が「週末に新しいカフェに行ったんだ」と言いました。',
            prompt: '共感のリアクションと次の質問を声に出して答えてみましょう。',
            starters: [
              "Oh, really? How was it?",
              "That sounds great! Which café did you go to?",
              "Nice! Was it crowded?"
            ],
            modelResponse: "Oh, really? That sounds great! How was it?",
          },
          spaced: '相槌と質問返しは、今後の日常会話・ビジネス会話すべての基礎ループとなります。',
        },
      },
    ],
  },
  {
    id: 'opinions',
    number: '02',
    title: '意見と好みの伝え方',
    enTitle: 'Opinions & Preferences',
    cando: 'I can state preferences and agree or disagree without sounding blunt.',
    status: 'coming_soon',
  },
  {
    id: 'plans',
    number: '03',
    title: '誘いと約束',
    enTitle: 'Making Plans & Arrangements',
    cando: 'I can invite someone, accept, decline politely, and negotiate another time.',
    status: 'coming_soon',
  },
  {
    id: 'dining',
    number: '04',
    title: 'カフェとレストランでのやり取り',
    enTitle: 'Cafes & Dining Out',
    cando: 'I can order, ask about options, customize, and handle the bill.',
    status: 'coming_soon',
  },
  {
    id: 'shopping',
    number: '05',
    title: '買い物とトラブル解決',
    enTitle: 'Shopping & Troubleshooting',
    cando: 'I can find an item, ask about size or stock, and resolve a return or exchange.',
    status: 'coming_soon',
  },
  {
    id: 'gratitude',
    number: '06',
    title: '感謝と謝罪のニュアンス',
    enTitle: 'Gratitude & Apologies',
    cando: 'I can match thanks and apologies to the seriousness of the situation.',
    status: 'coming_soon',
  },
  {
    id: 'workplace',
    number: '07',
    title: '新しい職場と人間関係',
    enTitle: 'Navigating New Workplaces',
    cando: 'I can introduce myself, ask colleagues for help, and navigate a new workplace.',
    status: 'coming_soon',
  },
  {
    id: 'meetings',
    number: '08',
    title: '会議とコラボレーション',
    enTitle: 'Meetings & Collaboration',
    cando: 'I can enter a discussion, clarify a point, summarize, and stay connected.',
    status: 'coming_soon',
  },
]

// Temporary compatibility alias for any older lesson tooling.
export const everydayModules = socialFluencyModules
