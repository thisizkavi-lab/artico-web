// Original ARTICO Storytelling curriculum. English stories with Japanese study support.
// Each lesson separates a model story, a principle, understanding check and open production.
export const storytellingUnits = [
  {
    "id": "01",
    "title": "Understanding stories",
    "ja": "ストーリーを理解する",
    "description": "Notice what makes an experience worth telling.",
    "jaDescription": "体験を話にする意味と構造を見つける。"
  },
  {
    "id": "02",
    "title": "Building a story",
    "ja": "ストーリーを組み立てる",
    "description": "Give listeners just enough context, movement, and meaning.",
    "jaDescription": "場面、展開、結末を分かりやすく伝える。"
  },
  {
    "id": "03",
    "title": "Natural storytelling English",
    "ja": "自然な英語で語る",
    "description": "Use the language, rhythm, and detail of everyday stories.",
    "jaDescription": "時制、会話、描写を自然に使う。"
  },
  {
    "id": "04",
    "title": "Stories for different situations",
    "ja": "場面に合わせて語る",
    "description": "Change your story to fit the listener and purpose.",
    "jaDescription": "相手と目的に合わせて語り方を変える。"
  },
  {
    "id": "05",
    "title": "Finding your own voice",
    "ja": "自分の語り方を育てる",
    "description": "Tell, revisit, adapt, and improve without a script.",
    "jaDescription": "暗記に頼らず、自分の言葉で話し直す。"
  }
]

export const storytellingLessons = [
  {
    "id": "01",
    "unit": "01",
    "title": "What makes something a story?",
    "jaTitle": "何がストーリーになる？",
    "goal": "Tell the difference between listing facts and describing an experience.",
    "jaGoal": "事実を並べることと、出来事を語ることの違いを理解する。",
    "story": "I went to the library yesterday. It was raining, and I had forgotten my umbrella. On my way out, a stranger offered to share theirs. We walked to the bus stop, talking about books. I never learned their name, but I went home in a much better mood.",
    "sceneJa": "雨の日、図書館の帰りに見知らぬ人と傘を分け合った話。小さな出来事でも、変化があるとストーリーになる。",
    "beats": [
      [
        "Where we begin",
        "始まり",
        "A rainy walk home from the library.",
        "雨の日の図書館帰り。"
      ],
      [
        "What happened",
        "出来事",
        "A stranger shares an umbrella; a conversation begins.",
        "知らない人が傘に入れてくれ、会話が始まる。"
      ],
      [
        "What stayed with me",
        "残ったもの",
        "The narrator's mood changes.",
        "話し手の気持ちが変わる。"
      ]
    ],
    "principle": "A story connects events so the listener can understand an experience. It does not need danger, drama, or a surprise ending. Even a quiet moment can have movement: something happens, or someone sees something differently.",
    "principleJa": "ストーリーは、出来事をつなぎ、相手が体験を理解できるようにするものです。劇的な事件は必要ありません。小さな心の変化でも十分です。",
    "language": [
      "On my way out, …",
      "We ended up talking about …",
      "I went home feeling …"
    ],
    "watch": "Not every explanation needs to become a story. Use one when the sequence of events helps your listener.",
    "watchJa": "どんな説明もストーリーにする必要はありません。出来事の順番が理解に役立つときに使います。",
    "task": "Describe an ordinary event from the last few days. What happened, and why do you remember it?",
    "taskJa": "最近の何気ない出来事を一つ話してください。何が起き、なぜ覚えていますか？",
    "cues": [
      "Where were you?",
      "What happened next?",
      "Why did the moment stay with you?"
    ],
    "check": {
      "q": "Which version is more like a story?",
      "options": [
        "I went to the library. It rained. I got home.",
        "Someone shared an umbrella with me, and an ordinary trip home became memorable."
      ],
      "correct": 1,
      "why": "The second connects events to a change in the narrator's experience.",
      "jaWhy": "二つ目は、出来事が話し手に起こした変化を伝えています。"
    }
  },
  {
    "id": "02",
    "unit": "01",
    "title": "Why is this worth telling?",
    "jaTitle": "なぜこの話をするの？",
    "goal": "Find the one moment or idea your listener should remember.",
    "jaGoal": "聞き手に残したい場面や気づきを一つ選ぶ。",
    "story": "Last month, I tried to bake bread for the first time. I followed every step carefully, or so I thought. When I took it out of the oven, it looked like a brick. My sister tasted a piece and said, 'Well, you've invented a new building material.' We ordered dinner instead. I learned two things: check the yeast, and don't take yourself too seriously.",
    "sceneJa": "初めてパンを焼いたら失敗。妹の一言で、失敗談が笑える思い出になった。",
    "beats": [
      [
        "Situation",
        "状況",
        "A first attempt at baking bread.",
        "初めてパンを焼く。"
      ],
      [
        "Standout moment",
        "印象的な瞬間",
        "The bread fails; the sister makes a joke.",
        "パンは失敗し、妹が冗談を言う。"
      ],
      [
        "Point",
        "伝えたいこと",
        "The narrator learns to laugh at mistakes.",
        "失敗を笑って受け止める。"
      ]
    ],
    "principle": "Before telling a story, privately answer: 'Why am I telling this?' Your answer may be 'because it was funny,' 'because it changed my mind,' or simply 'because it shows what that day felt like.' The point does not need to be a moral.",
    "principleJa": "話す前に「なぜこれを話したいのか」と考えます。面白かったから、考えが変わったから、あの日の雰囲気を伝えたいから。必ずしも教訓は必要ありません。",
    "language": [
      "The funny part was …",
      "What I remember most is …",
      "Looking back, I think …"
    ],
    "watch": "Don't explain the lesson before the story unless the situation calls for it. Sometimes discovery is part of the pleasure.",
    "watchJa": "最初から結論を全部説明する必要はありません。聞き手が一緒に気づく楽しさもあります。",
    "task": "Choose an experience and write a single sentence about why it is worth telling. Then tell the story without announcing that sentence.",
    "taskJa": "出来事を一つ選び、話す理由を一文にまとめます。その一文を読み上げずに、話を語ってみましょう。",
    "cues": [
      "What stayed with you?",
      "What would interest this listener?",
      "What could you leave out?"
    ],
    "check": {
      "q": "What must every story have?",
      "options": [
        "A clear reason to tell it in this context.",
        "A dramatic twist and a moral."
      ],
      "correct": 0,
      "why": "The significance can be small and personal; drama and morals are optional.",
      "jaWhy": "小さな意味でも十分です。劇的な展開や教訓は必須ではありません。"
    }
  },
  {
    "id": "03",
    "unit": "01",
    "title": "Make the story easy to follow",
    "jaTitle": "分かりやすい順番で話す",
    "goal": "Choose the information the listener needs, and leave out distractions.",
    "jaGoal": "必要な情報を選び、余分な説明を減らす。",
    "story": "I was supposed to meet Maya outside the station at six. My phone was almost dead, so I waited by the main entrance. At six fifteen, I borrowed a charger from a café. There were three messages from Maya: she'd been waiting at the north entrance the whole time. We were less than a minute apart.",
    "sceneJa": "駅で友人と待ち合わせたのに会えない。理由は別々の出口で待っていたからだった。",
    "beats": [
      [
        "Who and where",
        "誰とどこで",
        "Two friends agree to meet at a station.",
        "駅で友人と待ち合わせ。"
      ],
      [
        "Problem",
        "問題",
        "Low battery keeps them from coordinating.",
        "充電不足で連絡できない。"
      ],
      [
        "Explanation",
        "理由",
        "They waited at different entrances.",
        "違う出口で待っていた。"
      ]
    ],
    "principle": "Clarity comes from selecting details, not adding more of them. Tell your listener who is involved, what they expect, what gets in the way, and how it unfolds. A side detail is useful only if it helps the listener follow or feel the story.",
    "principleJa": "分かりやすさは説明の量ではなく、情報の選び方で決まります。誰が、何を予想し、何が問題となり、どうなったかを伝えます。",
    "language": [
      "I was supposed to meet …",
      "The problem was …",
      "It turned out that …"
    ],
    "watch": "If your listener gets lost, supply the missing context. More detail is not always the answer.",
    "watchJa": "相手が混乱したら、不足している前提を補います。細部を増やせばよいわけではありません。",
    "task": "Explain a misunderstanding that happened because someone lacked a piece of information. Tell it in under a minute.",
    "taskJa": "情報不足で起きた行き違いを、1分以内で説明してください。",
    "cues": [
      "What did each person believe?",
      "What information was missing?",
      "What cleared it up?"
    ],
    "check": {
      "q": "Which detail is essential to this story?",
      "options": [
        "The color of the café chairs.",
        "The friends waited at different station entrances."
      ],
      "correct": 1,
      "why": "The different entrances explain the misunderstanding.",
      "jaWhy": "別々の出口という情報が行き違いの理由を説明します。"
    }
  },
  {
    "id": "04",
    "unit": "02",
    "title": "Set the scene without overexplaining",
    "jaTitle": "場面を簡潔に伝える",
    "goal": "Start with enough who, where, and when to orient your listener.",
    "jaGoal": "誰が、どこで、いつを必要なだけ伝える。",
    "story": "On my first day at a new job, I was standing behind the counter when a customer asked me a question in English. I knew the answer, but I froze for a second. Then my coworker smiled and said, 'Take your time.' That small sentence helped me get through the rest of the shift.",
    "sceneJa": "新しい職場の初日。英語で質問されて固まったが、同僚の一言に助けられる。",
    "beats": [
      [
        "Time and place",
        "時と場所",
        "First day, behind the counter.",
        "初日、カウンターの中。"
      ],
      [
        "Immediate situation",
        "目の前の状況",
        "A customer asks a question.",
        "客に質問される。"
      ],
      [
        "What matters",
        "重要な出来事",
        "A coworker reassures the narrator.",
        "同僚が安心させてくれる。"
      ]
    ],
    "principle": "An opening is an orientation, not a full biography. Begin at the latest point where the listener can still understand the event. You can add background later, when it becomes relevant.",
    "principleJa": "冒頭は長い自己紹介ではありません。相手が理解できる最小限の背景から始めます。必要な事情は後から加えて構いません。",
    "language": [
      "On my first day …",
      "I was just about to …",
      "I was standing there when …"
    ],
    "watch": "Avoid spending thirty seconds on background before anything happens.",
    "watchJa": "出来事が始まる前の背景説明だけで長くならないようにします。",
    "task": "Start the same story in two ways: a long version with too much background, then a concise version with only essential context.",
    "taskJa": "同じ話を、背景が多すぎる始め方と必要な情報だけの始め方で比べてください。",
    "cues": [
      "Who is involved?",
      "Where does the action begin?",
      "What background can wait?"
    ],
    "check": {
      "q": "Which is the stronger opening for a casual story?",
      "options": [
        "I have always been interested in how workplaces operate, ever since I was little …",
        "On my first day at work, a customer asked me a question I wasn't ready for."
      ],
      "correct": 1,
      "why": "It gives context and begins the relevant event quickly.",
      "jaWhy": "必要な背景を示し、すぐに中心となる出来事に入っています。"
    }
  },
  {
    "id": "05",
    "unit": "02",
    "title": "When the story changes",
    "jaTitle": "予想外の展開を伝える",
    "goal": "Show what someone expected and what actually happened.",
    "jaGoal": "予想と実際の出来事の違いを伝える。",
    "story": "I walked into a classroom and took a seat. Everyone seemed to know one another, but I didn't recognize anybody. Then the lecturer started talking about urban farming. I was supposed to be in a physics lecture. I looked at the room number again. Wrong room. I quietly packed my bag and left.",
    "sceneJa": "授業の教室に座ったが、講義内容が全然違う。教室を間違えていたと気づく。",
    "beats": [
      [
        "Expectation",
        "予想",
        "The narrator expects a physics lecture.",
        "物理の授業だと思って入室。"
      ],
      [
        "Clue",
        "手がかり",
        "The lecturer talks about urban farming.",
        "都市農業の講義が始まる。"
      ],
      [
        "Realization",
        "気づき",
        "The narrator is in the wrong room.",
        "教室を間違えたと分かる。"
      ]
    ],
    "principle": "A turning point is a meaningful change in what the person knows, wants, or faces. It can be a dramatic event, a small realization, or an unexpected reaction. Let listeners see the expectation before the change.",
    "principleJa": "転機とは、知っていること、望み、状況のどれかが変わる瞬間です。大事件でなくても、小さな気づきで十分です。まず予想を伝えると変化が分かりやすくなります。",
    "language": [
      "I thought I was in …",
      "Then I realized …",
      "It turned out I had …"
    ],
    "watch": "Don't invent a twist. If nothing surprising happened, the story can still be about a feeling or discovery.",
    "watchJa": "無理にどんでん返しを作らないでください。驚きがなくても、気持ちや発見を語れます。",
    "task": "Tell a story about something that didn't go as expected. Let the listener understand your expectation before the reveal.",
    "taskJa": "予想と違った出来事を一つ語りましょう。結果を話す前に、何を予想していたか伝えてください。",
    "cues": [
      "What did you expect?",
      "What clue first changed your mind?",
      "When did you understand?"
    ],
    "check": {
      "q": "What makes the final line meaningful?",
      "options": [
        "The listener already knows the narrator expected a physics class.",
        "It contains the longest sentence."
      ],
      "correct": 0,
      "why": "The earlier expectation makes the realization understandable and amusing.",
      "jaWhy": "最初に物理の授業だと思っていたことが、最後の気づきを印象的にしています。"
    }
  },
  {
    "id": "06",
    "unit": "02",
    "title": "How to end a story",
    "jaTitle": "話を自然に終える",
    "goal": "End when the listener understands the outcome or significance.",
    "jaGoal": "結果や意味が伝わったところで自然に終える。",
    "story": "I spent an hour trying to fix the printer before my presentation. Nothing worked. Eventually, I gave up and presented without the handouts. Afterward, two people told me it was easier to follow because they were actually listening instead of reading. I still prefer a working printer, but now I know I can manage without one.",
    "sceneJa": "プレゼン前にプリンターが壊れる。資料なしで発表した結果、思いがけない感想をもらった。",
    "beats": [
      [
        "Problem",
        "問題",
        "The printer refuses to work.",
        "プリンターが使えない。"
      ],
      [
        "Outcome",
        "結果",
        "The presentation happens without handouts.",
        "配布資料なしで発表する。"
      ],
      [
        "Meaning",
        "意味",
        "The narrator gains confidence in adapting.",
        "柔軟に対応できる自信がつく。"
      ]
    ],
    "principle": "A good ending isn't necessarily a life lesson. It can be a result, a funny final image, a feeling, or a question that remains open. Once the listener has the point, stop. Explaining the ending again usually weakens it.",
    "principleJa": "結末は立派な教訓でなくても構いません。結果、面白い一言、感情、残った疑問でもよいのです。伝わったらそこで終えます。",
    "language": [
      "In the end, …",
      "Looking back, …",
      "Ever since then, …"
    ],
    "watch": "Don't add 'and that's my story' or explain the punchline unless the situation actually calls for it.",
    "watchJa": "必要がないのに落ちを説明し直したり、無理に締めの言葉を付けたりしないようにします。",
    "task": "Tell a short story with two possible endings: one based on what happened, and one based on how it changed your thinking.",
    "taskJa": "一つの話に、結果を中心にした結末と、考えの変化を中心にした結末を付けてみましょう。",
    "cues": [
      "What happened in the end?",
      "What did you feel?",
      "Where should you stop?"
    ],
    "check": {
      "q": "When should you end a casual story?",
      "options": [
        "After the listener can understand the outcome or why it mattered.",
        "Only after stating an explicit moral."
      ],
      "correct": 0,
      "why": "An ending should feel complete, not artificially profound.",
      "jaWhy": "教訓を付けるより、伝えたい結果や意味が伝わったところで終えます。"
    }
  },
  {
    "id": "07",
    "unit": "03",
    "title": "Make time clear",
    "jaTitle": "時制と順序を整理する",
    "goal": "Use past tenses and time markers without making a story sound like a grammar drill.",
    "jaGoal": "過去形や時間表現で順序を自然に伝える。",
    "story": "I was waiting for a train when I realized I'd left my notebook at the café. I'd been writing in it all morning. I ran back, but the café had already closed for lunch. Luckily, the owner spotted me through the window and brought it out. I made the train just in time.",
    "sceneJa": "電車を待っている途中でノートの忘れ物に気づく。前に何をしていたかが、時制で分かる。",
    "beats": [
      [
        "Background action",
        "背景の動作",
        "I was waiting for a train.",
        "電車を待っていた。"
      ],
      [
        "Earlier event",
        "それ以前の出来事",
        "I had left my notebook at a café.",
        "カフェにノートを置いてきた。"
      ],
      [
        "Sequence",
        "その後の流れ",
        "I returned, recovered it, and caught the train.",
        "戻ってノートを受け取り、電車に間に合う。"
      ]
    ],
    "principle": "Use simple past for the main events, past continuous for an action in progress, and past perfect when you need to show that something happened earlier. Don't use a complex tense if a simple time phrase would be clearer.",
    "principleJa": "出来事の流れは過去形、進行中だった動作は過去進行形、さらに前に起きたことは過去完了で表せます。ただし、分かりやすい時間表現で足りるなら難しい時制は不要です。",
    "language": [
      "I was … when …",
      "I'd left …",
      "By the time I got back, …"
    ],
    "watch": "'I had went' is not standard; say 'I had gone.' More important: don't lose the listener in needless tense switches.",
    "watchJa": "過去完了は had + 過去分詞です。時制を切り替えすぎて聞き手を混乱させないことも大切です。",
    "task": "Tell a story about forgetting something. Include one action in progress and one earlier event.",
    "taskJa": "忘れ物の話をしましょう。進行中だった動作と、それ以前の出来事を一つずつ入れてください。",
    "cues": [
      "What were you doing?",
      "What had happened earlier?",
      "What did you do next?"
    ],
    "check": {
      "q": "Which sentence makes the order clearest?",
      "options": [
        "I waited for the train when I leave my bag.",
        "I was waiting for the train when I realized I'd left my bag."
      ],
      "correct": 1,
      "why": "The tenses show the ongoing wait and the earlier mistake.",
      "jaWhy": "待っていた動作と、それより前の忘れ物を区別できています。"
    }
  },
  {
    "id": "08",
    "unit": "03",
    "title": "Bring thoughts and dialogue into the story",
    "jaTitle": "考えや会話を入れる",
    "goal": "Use short quotations or reported thoughts to bring listeners closer to a moment.",
    "jaGoal": "短い会話や心の声で、その場の感覚を伝える。",
    "story": "My friend asked if I'd ever tried rock climbing. I said, 'Sure, how hard can it be?' Twenty minutes later, I was halfway up the wall, holding on for dear life. In my head, I was thinking, 'Why did I say that?' When I finally reached the top, my friend just smiled and said, 'So, easy?'",
    "sceneJa": "クライミングを簡単だと思ったら大違い。短いセリフが期待と現実の違いを伝える。",
    "beats": [
      [
        "Spoken confidence",
        "自信のある一言",
        "How hard can it be?",
        "どれほど難しいの？"
      ],
      [
        "Private reaction",
        "心の声",
        "Why did I say that?",
        "なんであんなことを言ったんだろう。"
      ],
      [
        "Final reply",
        "最後の返し",
        "So, easy?",
        "それで、簡単だった？"
      ]
    ],
    "principle": "A line of dialogue can show personality or tension without lengthy explanation. Quote exact words only when you remember them. Otherwise use 'something like' or report the meaning. A story should not need a full transcript.",
    "principleJa": "短い会話で人物や場面を伝えられます。ただし正確な言葉を覚えていないときは、引用したふりをせず「こんなことを言った」と説明します。会話を全部再現する必要はありません。",
    "language": [
      "I was like, '…' (casual)",
      "I remember thinking, '…'",
      "She said something like, '…'"
    ],
    "watch": "'I was like' is common in informal speech, but use 'I said' or 'I thought' in formal settings.",
    "watchJa": "I was like は日常会話でよく使いますが、改まった場面では I said / I thought を選びます。",
    "task": "Retell a small awkward or exciting moment using one spoken line and one thought. Paraphrase if you do not remember the exact words.",
    "taskJa": "少し気まずかった、またはワクワクした場面を、会話一つと心の声一つを使って話しましょう。",
    "cues": [
      "What did somebody say?",
      "What were you thinking?",
      "Did their words change the moment?"
    ],
    "check": {
      "q": "You can't remember someone's exact words. What is safest?",
      "options": [
        "Invent a direct quotation and present it as exact.",
        "Say 'They said something like …' or paraphrase."
      ],
      "correct": 1,
      "why": "Paraphrasing honestly preserves the story without inventing a precise quote.",
      "jaWhy": "正確に覚えていない発言は、要約か「こんな感じのことを言った」で伝えます。"
    }
  },
  {
    "id": "09",
    "unit": "03",
    "title": "Details, emphasis, and pacing",
    "jaTitle": "描写・強調・間の取り方",
    "goal": "Choose one vivid detail and give the listener room to follow.",
    "jaGoal": "意味のある描写を選び、聞き取りやすい速さと間で話す。",
    "story": "I opened the apartment door and noticed something was wrong. The place was silent. Then I heard a faint scratching noise from the kitchen. I walked over, opened the cupboard … and found my cat sitting inside, completely pleased with herself. She'd somehow shut the door.",
    "sceneJa": "静かな部屋と小さな物音。少し間を置いた後、戸棚の中の猫が見つかる。",
    "beats": [
      [
        "Relevant detail",
        "意味のある描写",
        "The apartment is unusually quiet.",
        "部屋がいつもより静か。"
      ],
      [
        "Build-up",
        "展開",
        "A scratching sound comes from the kitchen.",
        "台所から引っかく音。"
      ],
      [
        "Reveal",
        "明らかになること",
        "The cat is trapped in a cupboard.",
        "猫が戸棚に入っていた。"
      ]
    ],
    "principle": "Specific details can make a moment easier to imagine, but sensory adjectives are not a requirement. Choose details that contribute to the story. Slow down briefly before an important reveal; allow a natural pause rather than performing every sentence.",
    "principleJa": "具体的な描写は想像を助けますが、形容詞を増やせばよいわけではありません。話に必要な描写だけ選び、重要な場面の前では自然に間を取ります。",
    "language": [
      "Something felt off.",
      "That's when I heard …",
      "And there she was …"
    ],
    "watch": "Too many adjectives or exaggerated pauses can make an ordinary story sound performed. Keep your natural voice.",
    "watchJa": "形容詞や大げさな間を入れすぎず、自分の自然な話し方を保ちます。",
    "task": "Tell a short surprising story twice. First, speak naturally. Then add one meaningful detail and one short pause. Compare which version feels clearer.",
    "taskJa": "短い驚きの話を二度語りましょう。二度目は具体的な描写を一つ、短い間を一つ加えて比較します。",
    "cues": [
      "What did you notice first?",
      "Which detail matters?",
      "Where would a natural pause help?"
    ],
    "check": {
      "q": "Which detail is most useful to this cat story?",
      "options": [
        "The narrator's favorite color.",
        "The faint scratching sound from the kitchen."
      ],
      "correct": 1,
      "why": "The sound directs attention toward the eventual discovery.",
      "jaWhy": "小さな音が、最後の発見につながっています。"
    }
  },
  {
    "id": "10",
    "unit": "04",
    "title": "Tell a story to a friend",
    "jaTitle": "友人への自然な話し方",
    "goal": "Use an informal opening, respond to listeners, and avoid sounding rehearsed.",
    "jaGoal": "友人に自然に話しかけ、反応に合わせて続ける。",
    "story": "Oh, you won't believe what happened on the bus this morning. I was half asleep when someone tapped my shoulder. I thought I'd dropped my wallet, so I panicked. But the guy just wanted to tell me I'd forgotten to zip my backpack. Honestly, he saved me from losing half my stuff.",
    "sceneJa": "朝のバスで肩をたたかれて慌てる。実はリュックのファスナーが開いていたことを教えてくれた。",
    "beats": [
      [
        "Conversational opening",
        "自然な始まり",
        "You won't believe what happened …",
        "ちょっと聞いて、という話し始め。"
      ],
      [
        "Reaction",
        "反応",
        "I panicked.",
        "慌てた。"
      ],
      [
        "Resolution",
        "解決",
        "A passenger was trying to help.",
        "乗客が助けようとしていた。"
      ]
    ],
    "principle": "A story to a friend can be loose and conversational. Start where their interest begins, explain your reactions, and make room for interruptions. You don't need a polished introduction or a moral.",
    "principleJa": "友人への話は自然な会話です。興味を引くところから始め、気持ちを伝え、相手の反応も受け入れます。きれいな導入や教訓は不要です。",
    "language": [
      "Guess what happened.",
      "So, I was …",
      "Honestly, I thought …"
    ],
    "watch": "'You won't believe this' is common casual emphasis. Don't use it when the event is serious or a listener needs a direct answer.",
    "watchJa": "You won't believe this は砕けた強調です。深刻な話や事務的な説明では避けます。",
    "task": "Tell a friend about a recent inconvenience. Keep it conversational and imagine they interrupt with 'Wait, what happened next?'",
    "taskJa": "最近のちょっとした困りごとを友人に話しましょう。相手に「それで？」と聞かれたら自然に続けます。",
    "cues": [
      "How would you begin with a friend?",
      "What did you think in that moment?",
      "What follow-up might they ask?"
    ],
    "check": {
      "q": "What is most natural in a casual story?",
      "options": [
        "Allowing a friend to ask a follow-up question.",
        "Reciting a fixed five-paragraph script."
      ],
      "correct": 0,
      "why": "Everyday storytelling is part of a conversation, not a monologue competition.",
      "jaWhy": "日常の語りは会話の一部です。暗記した原稿を披露する場ではありません。"
    }
  },
  {
    "id": "11",
    "unit": "04",
    "title": "Funny, awkward, and surprising stories",
    "jaTitle": "面白い・気まずい・驚いた話",
    "goal": "Create gentle contrast without forcing jokes or humiliating someone.",
    "jaGoal": "無理な笑いを作らず、予想と現実の違いを伝える。",
    "story": "I arrived at the gym feeling extremely organized. Water bottle, headphones, towel—everything. I got on the treadmill, put my music on, and started running. About a minute later, I realized I was wearing my slippers. Not running shoes. Actual house slippers. I went home before anyone noticed. At least, I hope nobody noticed.",
    "sceneJa": "準備万端でジムへ行ったつもりが、靴だけ家のスリッパだった。",
    "beats": [
      [
        "Expectation",
        "予想",
        "The narrator feels well prepared.",
        "準備万端のつもり。"
      ],
      [
        "Contrast",
        "対比",
        "They're wearing house slippers.",
        "靴がスリッパだった。"
      ],
      [
        "Small afterthought",
        "最後の一言",
        "I hope nobody noticed.",
        "誰にも見られていないといいけれど。"
      ]
    ],
    "principle": "Many funny stories work because reality breaks an expectation. The listener needs to know the expectation first. A short final line is often better than explaining why it's funny. Humor is optional; the goal is to tell the experience clearly.",
    "principleJa": "笑える話には、予想と現実のズレがよくあります。先に予想を伝え、最後を短くすると自然です。無理に面白くする必要はありません。",
    "language": [
      "I was feeling so confident.",
      "Turns out, …",
      "At least, that's what I thought."
    ],
    "watch": "Use judgment about relationships and privacy. Being funny is not worth exposing or embarrassing someone else.",
    "watchJa": "他人を傷つけたり、私的な話を勝手に公開したりしないようにします。",
    "task": "Tell a harmless funny story about yourself. Start with what you expected, then reveal the difference. Try not to explain the punchline.",
    "taskJa": "自分のちょっとした失敗談を話しましょう。予想を伝えてから違いを明かし、オチを説明しすぎないようにします。",
    "cues": [
      "What was your confident assumption?",
      "What actually happened?",
      "Can you finish in one short line?"
    ],
    "check": {
      "q": "What often makes a humorous anecdote land?",
      "options": [
        "Explaining in detail why everyone should laugh.",
        "A clear difference between expectation and reality."
      ],
      "correct": 1,
      "why": "Contrast gives the listener the opportunity to notice the humor.",
      "jaWhy": "予想と現実の差が、聞き手自身に面白さを見つける余地を作ります。"
    }
  },
  {
    "id": "12",
    "unit": "04",
    "title": "Stories in study and professional life",
    "jaTitle": "学業や仕事で経験を語る",
    "goal": "Explain a real decision or discovery without overstating what it proves.",
    "jaGoal": "判断や発見を、事実と解釈を分けて伝える。",
    "story": "During a class project, our group kept getting different results from the same experiment. We initially assumed the equipment was faulty. I suggested checking the timing of each measurement. We discovered that two of us had started the stopwatch at different points. Once we agreed on one procedure, the results became more consistent. It didn't solve every problem, but it showed us why a shared protocol mattered.",
    "sceneJa": "実験結果がそろわない原因を調べ、測定タイミングの違いを見つけた経験。結論を言いすぎない。",
    "beats": [
      [
        "Question",
        "問題",
        "Why are results inconsistent?",
        "結果がばらつくのはなぜ？"
      ],
      [
        "Action",
        "行動",
        "The group checks measurement timing.",
        "測定時刻を確認。"
      ],
      [
        "Evidence and limit",
        "結果と限界",
        "Consistency improves, but other problems remain.",
        "ばらつきは減るが、全て解決したわけではない。"
      ]
    ],
    "principle": "In professional or academic settings, a story can clarify a problem, decision, action, and outcome. Make your personal contribution explicit, distinguish observation from interpretation, and name uncertainty when it matters. A useful narrative does not replace evidence.",
    "principleJa": "学業や仕事では、問題、判断、行動、結果をつなげます。自分が何をしたかを明確にし、観察と解釈を分け、必要なら限界も述べます。ストーリーは証拠の代わりにはなりません。",
    "language": [
      "We initially assumed …",
      "I suggested checking …",
      "This helped us realize …"
    ],
    "watch": "Do not turn correlation into causation, claim sole credit for team work, or invent results to make the story compelling.",
    "watchJa": "相関を因果と決めつけたり、チームの成果を独り占めしたり、結果を創作したりしてはいけません。",
    "task": "Explain one problem you worked on, your specific action, what happened, and one thing the outcome does not establish.",
    "taskJa": "取り組んだ問題、自分の行動、結果、そしてその結果だけでは言えないことを一つ説明しましょう。",
    "cues": [
      "What was the actual problem?",
      "What did you do?",
      "What did the outcome show—and not show?"
    ],
    "check": {
      "q": "Which account is more credible?",
      "options": [
        "My idea fixed everything and proved the method was perfect.",
        "After we changed the timing procedure, our results became more consistent, though other sources of variation remained."
      ],
      "correct": 1,
      "why": "It reports an observation and its limits rather than exaggerating.",
      "jaWhy": "観察された結果と限界を区別しているため信頼できます。"
    }
  },
  {
    "id": "13",
    "unit": "05",
    "title": "Tell it without memorizing a script",
    "jaTitle": "原稿を暗記せずに話す",
    "goal": "Use three story cues instead of writing every sentence.",
    "jaGoal": "全ての文を暗記せず、三つの手がかりから話す。",
    "story": "I missed the last bus after a late shift. My phone had almost no battery, and I didn't know the neighborhood. I saw a small convenience store that was still open and asked the clerk where the nearest station was. They drew a quick map on a receipt. I still have it somewhere. I remember how relieved I felt.",
    "sceneJa": "仕事帰りに最終バスを逃すが、店員がレシートの裏に地図を書いて助けてくれた。",
    "beats": [
      [
        "Cue 1",
        "手がかり1",
        "Missed the last bus.",
        "終バスを逃す。"
      ],
      [
        "Cue 2",
        "手がかり2",
        "Asked for directions at a store.",
        "お店で道を聞く。"
      ],
      [
        "Cue 3",
        "手がかり3",
        "Received a hand-drawn map.",
        "手書きの地図をもらう。"
      ]
    ],
    "principle": "Memorizing full sentences can make you panic when a word disappears. Keep a few anchors: where you started, what changed, and where you ended up. Then speak naturally between them. Each retelling may sound different.",
    "principleJa": "全文暗記だと、一語忘れただけで止まりやすくなります。始まり、変化、結末の三つを覚えて、自分の言葉でつなぎましょう。毎回同じ言い方でなくても大丈夫です。",
    "language": [
      "So I found myself …",
      "I wasn't sure what to do, so …",
      "What I remember is …"
    ],
    "watch": "Do not mistake fluency for speed. Pauses are normal; clarity comes first.",
    "watchJa": "流暢さは早口のことではありません。自然な間は問題ありません。",
    "task": "Read only your three cue words, then tell a 45–90-second story. Repeat it with the notes hidden.",
    "taskJa": "三つのキーワードだけを見て45〜90秒話し、次はメモを隠して繰り返してください。",
    "cues": [
      "Beginning",
      "Change",
      "Ending"
    ],
    "check": {
      "q": "What's the purpose of three cue words?",
      "options": [
        "To keep the sequence while allowing natural language.",
        "To force the same sentence word-for-word every time."
      ],
      "correct": 0,
      "why": "Cues support memory without requiring a rigid script.",
      "jaWhy": "手がかりは順番を支え、言葉は自由に選べるようにするためです。"
    }
  },
  {
    "id": "14",
    "unit": "05",
    "title": "Tell the same event to different people",
    "jaTitle": "相手に合わせて伝える",
    "goal": "Change detail and tone while keeping the facts consistent.",
    "jaGoal": "事実を変えずに、詳しさと口調を調整する。",
    "story": "To a friend: 'You know that report I was worried about? I sent the wrong version. Total panic. Luckily, I caught it five minutes later.' To a supervisor: 'I noticed I had sent an outdated draft. I immediately sent the corrected file, explained the change, and checked that the recipient had received it.' Same event, different details and purpose.",
    "sceneJa": "同じ報告書の送信ミスでも、友人には気持ちを、上司には対処を中心に話す。",
    "beats": [
      [
        "Shared event",
        "共通の事実",
        "The wrong file was sent.",
        "間違ったファイルを送った。"
      ],
      [
        "Friend's interest",
        "友人が知りたいこと",
        "What did it feel like?",
        "どんな気持ちだった？"
      ],
      [
        "Supervisor's interest",
        "上司が知りたいこと",
        "What did you do to correct it?",
        "どう対処した？"
      ]
    ],
    "principle": "Audience adaptation means selecting relevant details, not changing the truth. A friend may care about your feelings; a supervisor may need consequences and actions. Adjust wording, length, and focus while keeping the core event intact.",
    "principleJa": "相手に合わせるとは、事実を変えることではなく、必要な情報を選ぶことです。友人には気持ち、上司には影響や対応が大切なことがあります。",
    "language": [
      "You'll never guess … (casual)",
      "I wanted to let you know … (professional)",
      "Here's what I did next …"
    ],
    "watch": "Do not confuse sounding professional with using unnecessarily complicated vocabulary.",
    "watchJa": "丁寧さは難しい単語を多用することではありません。",
    "task": "Tell the same genuine incident to a close friend and then to a supervisor or teacher. Keep the facts identical, but change your focus.",
    "taskJa": "同じ出来事を友人向けと先生・上司向けに話しましょう。事実は変えず、強調する部分だけ変えます。",
    "cues": [
      "What happened?",
      "What does a friend want to know?",
      "What does a supervisor need to know?"
    ],
    "check": {
      "q": "What may change across audiences?",
      "options": [
        "The true sequence of events.",
        "Tone, detail, length, and what you emphasize."
      ],
      "correct": 1,
      "why": "Adapt presentation to the listener without altering factual claims.",
      "jaWhy": "事実は保ちながら、口調、長さ、情報の選び方を調整します。"
    }
  },
  {
    "id": "15",
    "unit": "05",
    "title": "Retell, reflect, and improve",
    "jaTitle": "話し直して改善する",
    "goal": "Practice one story twice and improve a specific, observable part.",
    "jaGoal": "同じ話を二度語り、一つの具体的な点を改善する。",
    "story": "First telling: 'I did a talk. My slides stopped working. It was bad, but it was okay.' Second telling: 'Two minutes into my talk, the screen went black. I had no backup slides, so I drew the main idea on the whiteboard. Afterward, someone said the drawing made the idea easier to understand. I was embarrassed at first, but it taught me to prepare a backup.'",
    "sceneJa": "同じ発表トラブルの話でも、二度目は状況、行動、結果が分かりやすい。",
    "beats": [
      [
        "First attempt",
        "一度目",
        "The outline is vague.",
        "何が起きたか曖昧。"
      ],
      [
        "Targeted change",
        "改善する一点",
        "Add one clear action and result.",
        "行動と結果を具体化。"
      ],
      [
        "Second attempt",
        "二度目",
        "The listener can understand the experience.",
        "体験の流れが分かる。"
      ]
    ],
    "principle": "Improvement rarely means making every sentence more elaborate. Listen for one problem: missing context, confusing order, unnatural language, or excessive detail. Change that one thing and try again. Your goal is understandable, adaptable speech—not a perfect performance.",
    "principleJa": "上達は、全ての文を複雑にすることではありません。背景不足、順序の混乱、不自然な表現、不要な細部のうち一つを直して語り直します。完璧さより、伝わることを重視します。",
    "language": [
      "Let me put that another way.",
      "What I meant was …",
      "The important part is …"
    ],
    "watch": "Self-ratings are reflections, not objective proof of speaking ability. Ask a listener for feedback when possible.",
    "watchJa": "自己評価は振り返りであり、能力の客観的な証明ではありません。可能なら他者の意見も聞きましょう。",
    "task": "Choose a genuine story. Tell it, identify one unclear moment, and retell it with that specific improvement. Explain what you changed.",
    "taskJa": "実体験を一つ選んで語り、不明瞭な点を一つ直してもう一度語ります。何を変えたか説明してください。",
    "cues": [
      "What did your listener need?",
      "What one change would help?",
      "Can you retell without reading?"
    ],
    "check": {
      "q": "What is the best focus for a second telling?",
      "options": [
        "Add as many impressive adjectives as possible.",
        "Fix one specific thing that made the story hard to follow."
      ],
      "correct": 1,
      "why": "A targeted, meaningful change is easier to evaluate and transfer.",
      "jaWhy": "具体的な問題を一つ直す方が、変化を確認でき、別の話にも応用しやすくなります。"
    }
  }
]
