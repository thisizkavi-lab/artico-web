// Single source of truth for the merged Tongue Twisters Study and Practice.
// Selected classic texts and order: Artico revised collection, 29 October 2026.
import { allTwisters as legacyTwisters } from '../data'

const originals = new Map(legacyTwisters.map(item => [item.id, item]))
const selected = [
  {
    "id": "ice-cream",
    "title": "Ice cream",
    "level": 1,
    "phrase": "I scream, you scream, we all scream for ice cream.",
    "meaningJa": "私も叫ぶ、あなたも叫ぶ、みんなアイスクリームがほしくて叫ぶ。",
    "tipJa": "I scream と ice cream は、つなげると似た音になります。言葉の区切りを意識しましょう。",
    "tipEn": "Notice how the word boundaries change the meaning.",
    "target": "S / CR",
    "transfer": [
      "The screen is bright.",
      "Scratch the surface."
    ],
    "number": "01",
    "optional": false
  },
  {
    "id": "big-black-bug",
    "title": "Big black bug",
    "level": 1,
    "phrase": "A big black bug bit a big black bear.",
    "meaningJa": "大きな黒い虫が、大きな黒いクマをかみました。",
    "tipJa": "big、black、bug の最初の音をそろえながら、後ろの音ははっきり変えましょう。",
    "tipEn": "Keep the B sounds and word endings clear.",
    "target": "B / BL",
    "transfer": [
      "A big blue bag.",
      "Bob bought a book."
    ],
    "number": "02",
    "optional": false
  },
  {
    "id": "seashells",
    "title": "Seashells",
    "level": 1,
    "phrase": "She sells seashells by the seashore.",
    "meaningJa": "彼女は海辺で貝殻を売っています。",
    "tipJa": "s と sh が交互に出てきます。sells と shells の違いを聞いてみましょう。",
    "tipEn": "Switch clearly between S and SH.",
    "target": "S / SH",
    "transfer": [
      "She said so.",
      "Show me the shop."
    ],
    "number": "03",
    "optional": false
  },
  {
    "id": "buggy-bumpers",
    "title": "Buggy bumpers",
    "level": 2,
    "phrase": "Rubber baby buggy bumpers.",
    "meaningJa": "ベビーカーのゴム製バンパー。",
    "tipJa": "似た形の言葉が続きます。順番を保ちながら、一つずつはっきり言ってみましょう。",
    "tipEn": "Keep the similar words in the right order.",
    "target": "R / B",
    "transfer": [
      "Rubber boots.",
      "A baby buggy."
    ],
    "number": "04",
    "optional": false
  },
  {
    "id": "unique-new-york",
    "title": "Unique New York",
    "level": 2,
    "phrase": "Unique New York.",
    "meaningJa": "独特なニューヨーク。",
    "tipJa": "短い三つの言葉を、最後の音を消さずにつなげてみましょう。",
    "tipEn": "Keep the word endings clear.",
    "target": "Y / N",
    "transfer": [
      "A unique name.",
      "New York at night."
    ],
    "number": "05",
    "optional": false
  },
  {
    "id": "red-lorry",
    "title": "Red lorry",
    "level": 2,
    "phrase": "Red lorry, yellow lorry.",
    "meaningJa": "赤いトラック、黄色いトラック。",
    "tipJa": "r と l を切り替える練習です。lorry は主にイギリス英語で「トラック」という意味です。",
    "tipEn": "Switch R and L. Lorry is mainly British English.",
    "target": "R / L",
    "transfer": [
      "I really like it.",
      "Turn left at the light."
    ],
    "number": "06",
    "optional": true
  },
  {
    "id": "red-leather",
    "title": "Red leather",
    "level": 2,
    "phrase": "Red leather, yellow leather.",
    "meaningJa": "赤い革、黄色い革。",
    "tipJa": "r、l、th の音が近くにあります。急がず、切り替えるところに気づきましょう。",
    "tipEn": "Notice R, L, and the sound in leather.",
    "target": "R / L / TH",
    "transfer": [
      "A leather jacket.",
      "The red light."
    ],
    "number": "07",
    "optional": false
  },
  {
    "id": "toy-boat",
    "title": "Toy boat",
    "level": 2,
    "phrase": "Toy boat.",
    "meaningJa": "おもちゃのボート。",
    "tipJa": "toy と boat の母音の動きは違います。繰り返しても、混ざらないようにしましょう。",
    "tipEn": "Keep the two changing vowel sounds distinct.",
    "target": "VOWELS",
    "transfer": [
      "My toy boat.",
      "Enjoy the show."
    ],
    "number": "08",
    "optional": false
  },
  {
    "id": "elephants",
    "title": "Elephants",
    "level": 2,
    "phrase": "Eleven benevolent elephants.",
    "meaningJa": "11頭の心優しいゾウ。",
    "tipJa": "長い単語の中で、強く読む部分と軽く読む部分を聞いてみましょう。",
    "tipEn": "Listen for the strong and light parts of the words.",
    "target": "V / F",
    "transfer": [
      "Very friendly.",
      "Eleven people."
    ],
    "number": "09",
    "optional": false
  },
  {
    "id": "oyster",
    "title": "Oyster",
    "level": 2,
    "phrase": "A noisy noise annoys an oyster.",
    "meaningJa": "うるさい音が、カキをいらいらさせます。",
    "tipJa": "noisy、noise、annoys の似た音を、順番どおりに言ってみましょう。",
    "tipEn": "Keep the similar-sounding words in order.",
    "target": "OY / Z",
    "transfer": [
      "That noise annoys me.",
      "A noisy room."
    ],
    "number": "10",
    "optional": false
  },
  {
    "id": "free-throws",
    "title": "Free throws",
    "level": 3,
    "phrase": "Three free throws.",
    "meaningJa": "3本のフリースロー。",
    "tipJa": "three と free の最初の音を聞き比べ、ゆっくり切り替えましょう。",
    "tipEn": "Switch the first sounds in three and free.",
    "target": "TH / F",
    "transfer": [
      "Three friends.",
      "Feel the difference."
    ],
    "number": "11",
    "optional": false
  },
  {
    "id": "slippery-snails",
    "title": "Slippery snails",
    "level": 3,
    "phrase": "Six slippery snails slid slowly seaward.",
    "meaningJa": "6匹のつるつるしたカタツムリが、ゆっくりと海の方へ滑っていきました。",
    "tipJa": "sl、sn の途中に余分な母音を入れず、次の音へつなげましょう。",
    "tipEn": "Connect the consonants without adding an extra vowel.",
    "target": "SL / SN",
    "transfer": [
      "Sleep slowly.",
      "Snow is falling."
    ],
    "number": "12",
    "optional": false
  },
  {
    "id": "fresh-flesh",
    "title": "Fresh flesh",
    "level": 3,
    "phrase": "Freshly fried fresh flesh.",
    "meaningJa": "揚げたばかりの新鮮な肉、という音遊びの表現。",
    "tipJa": "fr と fl を切り替える練習です。最後の sh の音まで忘れずに。",
    "tipEn": "Switch from FR to FL and finish each word.",
    "target": "FR / FL",
    "transfer": [
      "Fresh flowers.",
      "A friendly place."
    ],
    "number": "13",
    "optional": true
  },
  {
    "id": "rural-repeater",
    "title": "Rural repeater",
    "level": 3,
    "phrase": "Truly rural.",
    "meaningJa": "本当に田舎らしい。",
    "tipJa": "r と l が近くに出てきます。自分に合うゆっくりした速さで言いましょう。",
    "tipEn": "Keep R and L distinct at a comfortable speed.",
    "target": "R / L",
    "transfer": [
      "A rural road.",
      "I really like it."
    ],
    "number": "14",
    "optional": true
  },
  {
    "id": "clam-cream-can",
    "title": "Clam and cream can",
    "level": 3,
    "phrase": "How can a clam cram in a clean cream can?",
    "meaningJa": "貝がどうやって、きれいなクリームの缶に入り込めるのでしょう。",
    "tipJa": "clam と cram、clean と cream の音を入れ替えないようにしましょう。",
    "tipEn": "Distinguish CL from CR.",
    "target": "CL / CR",
    "transfer": [
      "A clean room.",
      "A cream cake."
    ],
    "number": "15",
    "optional": false
  },
  {
    "id": "coffee-cup",
    "title": "Coffee cup",
    "level": 3,
    "phrase": "Give papa a cup of proper coffee in a copper coffee cup.",
    "meaningJa": "お父さんに、銅のコーヒーカップに入ったコーヒーを1杯あげて。",
    "tipJa": "proper と copper の最初の音の違いに気づきましょう。",
    "tipEn": "Notice the changing P and C sounds.",
    "target": "P / C",
    "transfer": [
      "A proper cup.",
      "Coffee, please."
    ],
    "number": "16",
    "optional": false
  },
  {
    "id": "bear-rhyme",
    "title": "The bear rhyme",
    "level": 4,
    "phrase": "Fuzzy Wuzzy was a bear.\nFuzzy Wuzzy had no hair.\nFuzzy Wuzzy wasn't very fuzzy, was he?",
    "meaningJa": "ファジー・ワジーというクマは、名前と違って毛がなかったという言葉遊び。",
    "tipJa": "f、w、z の音と三つの文のリズムを意識しましょう。",
    "tipEn": "Keep the repeated sounds and the three-line rhythm.",
    "target": "F / W / Z",
    "transfer": [
      "A fuzzy sweater.",
      "Was he there?"
    ],
    "number": "17",
    "optional": true
  },
  {
    "id": "two-witches",
    "title": "Witches and watches",
    "level": 4,
    "phrase": "If two witches were watching two watches, which witch would watch which watch?",
    "meaningJa": "2人の魔女が2個の時計を見ていたら、どちらがどちらを見るのでしょう。",
    "tipJa": "witch、watch、which を間違えずにつなげてみましょう。",
    "tipEn": "Keep witch, watch, and which in order.",
    "target": "W / CH",
    "transfer": [
      "Which way?",
      "Watch this."
    ],
    "number": "18",
    "optional": false
  },
  {
    "id": "menagerie",
    "title": "Menagerie",
    "level": 4,
    "phrase": "Imagine an imaginary menagerie manager managing an imaginary menagerie.",
    "meaningJa": "架空の動物の集まりを管理する、架空の管理人を想像してみてください。",
    "tipJa": "似た形の長い言葉が続きます。意味と順番を確認してから言いましょう。",
    "tipEn": "Listen for stress as the similar words change.",
    "target": "LONG WORDS",
    "transfer": [
      "Imagine that.",
      "A good manager."
    ],
    "number": "19",
    "optional": true
  },
  {
    "id": "thursday-challenge",
    "title": "Thursday challenge",
    "level": 4,
    "phrase": "The thirty-three thieves thought that they thrilled the throne throughout Thursday.",
    "meaningJa": "33人の泥棒は、木曜日じゅう王座をわくわくさせたと思いました。",
    "tipJa": "th の音が何度も登場します。声を出す音と、息だけの音を聞いてみましょう。",
    "tipEn": "Notice the two kinds of TH sounds.",
    "target": "TH",
    "transfer": [
      "Three things.",
      "On Thursday."
    ],
    "number": "20",
    "optional": true
  },
  {
    "id": "weather-verse",
    "title": "Weather verse",
    "level": 4,
    "phrase": "Whether the weather is cold, or whether the weather is hot,\nwe'll be together whatever the weather, whether we like it or not.",
    "meaningJa": "寒くても暑くても、どんな天気でも一緒にいる、という言葉遊び。",
    "tipJa": "whether、weather、whatever を聞き分け、意味のまとまりで話しましょう。",
    "tipEn": "Keep the repeated words clear and follow the meaning.",
    "target": "W / TH",
    "transfer": [
      "Whatever the weather.",
      "We're together."
    ],
    "number": "21",
    "optional": false
  },
  {
    "id": "peter-piper",
    "title": "Peter Piper",
    "level": 4,
    "phrase": "Peter Piper picked a peck of pickled peppers:\nDid Peter Piper pick a peck of pickled peppers?\nIf Peter Piper picked a peck of pickled peppers,\nWhere's the peck of pickled peppers Peter Piper picked?",
    "meaningJa": "ピーター・パイパーは酢漬けのトウガラシを摘んだのでしょうか。摘んだなら、どこにあるのでしょう。",
    "tipJa": "p で始まる言葉が続きます。語尾を落とさず、一行ずつ練習しましょう。",
    "tipEn": "Keep the P sounds and endings clear, one line at a time.",
    "target": "P",
    "transfer": [
      "Please pass the pepper.",
      "Pick a paper."
    ],
    "number": "22",
    "optional": false
  },
  {
    "id": "woodchuck",
    "title": "Woodchuck",
    "level": 4,
    "phrase": "How much wood would a woodchuck chuck\nIf a woodchuck would chuck wood?\nHe would chuck as much wood as a woodchuck could\nIf a woodchuck could chuck wood.",
    "meaningJa": "ウッドチャックが木を投げられるなら、どれだけ投げるでしょう。投げられるだけ投げる、という言葉遊び。",
    "tipJa": "wood、would、could の似た音を意識し、質問と答えに分けて練習しましょう。",
    "tipEn": "Practice the question and answer as separate parts.",
    "target": "W / CH",
    "transfer": [
      "What would you choose?",
      "How much could it cost?"
    ],
    "number": "23",
    "optional": false
  },
  {
    "id": "betty-botter",
    "title": "Betty Botter",
    "level": 4,
    "phrase": "Betty Botter bought some butter;\n'But,' said she, 'this butter's bitter.\nIf I put it in my batter,\nIt will make my batter bitter.'\nSo she bought a bit of butter,\nBetter than her bitter butter,\nMade her bitter batter better.\nThen 'twas better Betty Botter\nBought a bit of better butter.",
    "meaningJa": "ベティは苦いバターの代わりに、もっとよいバターを買い、生地をおいしくしました。",
    "tipJa": "butter、bitter、batter、better の音の違いとリズムを意識しましょう。",
    "tipEn": "Notice the different vowels in butter, bitter, batter and better.",
    "target": "B / VOWELS",
    "transfer": [
      "Better butter.",
      "Betty bought it."
    ],
    "number": "24",
    "optional": false
  }
]

export const twisterLevels = [
  { number: 1, en: 'Start with short sentences', ja: '短い文から始めよう' },
  { number: 2, en: 'Phrase control', ja: '似た音をつなげよう' },
  { number: 3, en: 'Sound challenges', ja: '少し難しい音に挑戦' },
  { number: 4, en: 'Longer challenges', ja: '長い早口言葉に挑戦' },
]

const newBuilds = {
  'buggy-bumpers': ['buggy bumpers', 'baby buggy bumpers', 'Rubber baby buggy bumpers.'],
  'red-leather': ['leather', 'yellow leather', 'Red leather, yellow leather.'],
  'toy-boat': ['boat', 'Toy boat.'],
  elephants: ['elephants', 'benevolent elephants', 'Eleven benevolent elephants.'],
  oyster: ['noise', 'a noisy noise', 'annoys an oyster', 'A noisy noise annoys an oyster.'],
  'rural-repeater': ['rural', 'Truly rural.'],
  'clam-cream-can': ['a clean cream can', 'a clam cram', 'How can a clam cram in a clean cream can?'],
  'coffee-cup': ['copper coffee cup', 'in a copper coffee cup', 'a cup of proper coffee', 'Give papa a cup of proper coffee in a copper coffee cup.'],
  'bear-rhyme': ['Fuzzy Wuzzy was a bear.', 'Fuzzy Wuzzy was a bear.\nFuzzy Wuzzy had no hair.', selected[16].phrase],
  menagerie: ['imaginary menagerie', 'menagerie manager', 'manager managing an imaginary menagerie', selected[18].phrase],
  'thursday-challenge': ['thirty-three thieves', 'thought that they thrilled the throne', selected[19].phrase],
  'weather-verse': [selected[20].phrase.split('\n')[0], selected[20].phrase],
  'peter-piper': selected[21].phrase.split('\n').map((_,i,arr)=>arr.slice(0,i+1).join('\n')),
  woodchuck: selected[22].phrase.split('\n').map((_,i,arr)=>arr.slice(0,i+1).join('\n')),
  'betty-botter': selected[23].phrase.split('\n').map((_,i,arr)=>arr.slice(0,i+1).join('\n')),
}

const recordedWhole = new Set(['ice-cream','big-black-bug','seashells','unique-new-york','red-lorry','free-throws','slippery-snails','fresh-flesh','two-witches'])

// Plain-language context shown next to the complete line in Study.
// These explain what the learner can notice; they don't promise fluency from repetition.
const practiceReasons = {
  "ice-cream": {
    "en": "**“I scream” / “ice cream”** can blur together. This helps you say the **word boundaries** clearly.",
    "ja": "**「I scream」と「ice cream」** は、続けると似た音になります。言葉の **区切り** をはっきり言う練習です。"
  },
  "big-black-bug": {
    "en": "Repeated **B sounds** can make words run together. Practice keeping **big / black / bug** clear.",
    "ja": "**b の音** が続くと、言葉が混ざりやすくなります。**big / black / bug** をはっきり言う練習です。"
  },
  "seashells": {
    "en": "Many learners mix up **S and SH**, as in **see / she**. This helps you say them differently.",
    "ja": "**s と sh** を同じように言いやすい人向けです。**see / she** のような音の違いを練習できます。"
  },
  "buggy-bumpers": {
    "en": "Switching quickly between **B and R** can be tricky. This helps keep **baby / rubber** distinct.",
    "ja": "**b と r** を続けて言うと口がもつれやすくなります。**baby / rubber** の音を切り替える練習です。"
  },
  "unique-new-york": {
    "en": "The end of **unique** may disappear before **New York**. Practice finishing each word clearly.",
    "ja": "**unique** の最後の音が、次の **New York** につながると消えがちです。言葉の終わりをはっきり出す練習です。"
  },
  "red-lorry": {
    "en": "If **R and L** sound alike to you, this helps with common words like **right / light**.",
    "ja": "**r と l** の違いが難しい人向けです。**right / light** などの音を言い分ける練習です。"
  },
  "red-leather": {
    "en": "**R, L and TH** can get tangled together. Practice switching, as in **red / leather**.",
    "ja": "**r・l・th** が続くと混ざりやすくなります。**red / leather** の音を切り替える練習です。"
  },
  "toy-boat": {
    "en": "The vowels in **toy / boat** change differently as you speak. Practice saying both clearly.",
    "ja": "**toy / boat** は母音の変わり方が違います。両方をはっきり言う練習です。"
  },
  "elephants": {
    "en": "**V and F** can be difficult to tell apart. Practice the difference you hear in **very / ferry**.",
    "ja": "**v と f** の違いが難しい人向けです。**very / ferry** のような音を言い分ける練習です。"
  },
  "oyster": {
    "en": "**Noisy / noise / annoys** sound similar. Practice saying each word without getting them mixed up.",
    "ja": "**noisy / noise / annoys** は似ていて、続けると混ざりやすい言葉です。一つずつはっきり言う練習です。"
  },
  "free-throws": {
    "en": "Learners sometimes mix up **TH and F**. Practice **three / free** clearly.",
    "ja": "**th と f** を同じ音にしてしまう人向けです。**three / free** の最初の音を言い分ける練習です。"
  },
  "slippery-snails": {
    "en": "Some learners add an extra vowel in **sleep / snow**. Practice saying **S + L/N** together.",
    "ja": "**sleep / snow** の途中に「ウ」を入れやすい人向けです。**s と l / n** を直接つなぐ練習です。"
  },
  "fresh-flesh": {
    "en": "**FR and FL** are easy to mix up. Practice **fresh / flesh** clearly.",
    "ja": "**fr と fl** が混ざりやすい人向けです。**fresh / flesh** の違いをはっきり言う練習です。"
  },
  "rural-repeater": {
    "en": "**R and L** keep switching here. Practice saying everyday words like **really / rural** more clearly.",
    "ja": "**r と l** が続けて出てきます。**really / rural** などで音を混ぜずに言う練習です。"
  },
  "clam-cream-can": {
    "en": "**CL and CR** can get tangled. Practice the difference in **clean / cream**.",
    "ja": "**cl と cr** が混ざりやすい人向けです。**clean / cream** を言い分ける練習です。"
  },
  "coffee-cup": {
    "en": "**P and K** come close together. Practice keeping **proper / copper** distinct.",
    "ja": "**p と k** が続くと、言い間違えやすくなります。**proper / copper** を取り違えない練習です。"
  },
  "bear-rhyme": {
    "en": "**F, W and Z** keep repeating. Practice switching them while keeping a natural **rhythm**.",
    "ja": "**f・w・z** の音が何度も出てきます。音を切り替えながら、自然な **リズム** で話す練習です。"
  },
  "two-witches": {
    "en": "**Witch / watch / watches** can get mixed up. Practice their vowels and **W / CH** sounds.",
    "ja": "**witch / watch / watches** は似ていて混ざりやすい言葉です。母音と **w / ch** の音を練習します。"
  },
  "menagerie": {
    "en": "Similar long words such as **imagine / imaginary** can get tangled. Practice saying them with a clear **rhythm**.",
    "ja": "**imagine / imaginary** のような長い言葉は、途中で混ざりがちです。自然な **リズム** で言う練習です。"
  },
  "thursday-challenge": {
    "en": "The **TH** in **three** differs from the TH in **that**. Practice switching between them.",
    "ja": "**three** と **that** の th は違う音です。二つの音を切り替える練習です。"
  },
  "weather-verse": {
    "en": "Long sentences with **W and TH** can get tangled. Practice keeping the sounds clear and a steady **rhythm**.",
    "ja": "長い文では **w と th** が混ざりやすくなります。音をはっきり出し、自然な **リズム** で話す練習です。"
  },
  "peter-piper": {
    "en": "**Pick / peck** differ in the middle vowel. Practice that difference while keeping **P** clear.",
    "ja": "**pick / peck** は真ん中の母音が違います。**p の音** を保ちながら言い分ける練習です。"
  },
  "woodchuck": {
    "en": "**Wood / would** sound the same, and **could** has a similar vowel. Practice keeping repeated words clear.",
    "ja": "**wood / would** は同じ音で、**could** にも似た母音があります。似た言葉を続けてもはっきり言う練習です。"
  },
  "betty-botter": {
    "en": "**Butter / bitter / batter / better** have different middle vowels. Mixing them can change the word; practice saying each **vowel** clearly.",
    "ja": "**butter / bitter / batter / better** は、真ん中の母音が違うと別の言葉になります。**母音を言い分ける** 練習です。"
  }
}

export const twisterCards = selected.map(item => {
  const old = originals.get(item.id)
  const buildSteps = newBuilds[item.id] || (old && old.phrase === item.phrase ? old.buildSteps : [item.phrase])
  return { ...item, whyEn: practiceReasons[item.id].en, whyJa: practiceReasons[item.id].ja, buildSteps, hasFullAudio: recordedWhole.has(item.id), hasChunkAudio: Boolean(old && old.phrase === item.phrase && recordedWhole.has(item.id)) }
})

export function twisterAudioSource(item, step = null) {
  if (step === null || step === item.buildSteps.length - 1)
    return item.hasFullAudio ? `${import.meta.env.BASE_URL}audio/${item.id}.wav` : null
  return item.hasChunkAudio ? `${import.meta.env.BASE_URL}audio/segments/${item.id}-${step+1}.wav` : null
}
