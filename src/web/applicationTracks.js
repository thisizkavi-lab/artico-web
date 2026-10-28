// Application is goal-led: learners choose what they want to accomplish in
// English. These are original starter exercises, not official exam questions.
export const applicationTracks = [
  {
    id:'tests', icon:'school', en:'English Tests', ja:'英語試験',
    enSummary:'IELTS, TOEFL, TOEIC, EIKEN and other tests.',
    jaSummary:'IELTS・TOEFL・TOEIC・英検など。',
    tasks:[
      { en:'Speak about a familiar place', ja:'身近な場所を説明する',
        kind:'speaking',
        promptEn:'Choose a place you know well. Explain where it is, what you do there, and why it matters to you. Speak for about one minute.',
        promptJa:'よく知っている場所を一つ選びます。場所、そこで何をするか、好きな理由を約1分で話しましょう。',
        example:'One place I enjoy visiting is ... I go there because ...',
        checkpointsEn:['Name the place.','Describe one detail.','Give a reason.'],
        checkpointsJa:['場所を伝える。','具体的な特徴を一つ話す。','理由を一つ添える。'] },
      { en:'Write a short opinion', ja:'短い意見文を書く',
        kind:'writing',
        promptEn:'Write 120–180 words: Is it better to study alone or with other people? Explain your choice and give an example.',
        promptJa:'120〜180語で書きましょう。一人で勉強する方がよいか、誰かと勉強する方がよいか。理由と例を添えます。',
        example:'I prefer studying ... because ... For example, ...',
        checkpointsEn:['State your position.','Support it with a reason.','Give a concrete example.'],
        checkpointsJa:['自分の立場を書く。','理由を述べる。','具体例を挙げる。'] },
    ],
  },
  {
    id:'smalltalk', icon:'messages', en:'Small Talk', ja:'ちょっとした会話',
    enSummary:'Start a casual chat, find common ground and keep it going.',
    jaSummary:'気軽に話しかけて、自然に会話を続ける。',
    tasks:[], // Routed to the dedicated SmallTalkCourse. Old notes remain readable.
  },
  {
    id:'interviews', icon:'briefcase', en:'Jobs & Interviews', ja:'仕事・面接',
    enSummary:'Explore the full hiring journey, from finding a job to interviews and offers.',
    jaSummary:'仕事探しから履歴書・面接・採用結果まで、順を追って学ぶ。',
    tasks:[], // Routed to the dedicated eight-stage JobsCourse.
  },
  {
    id:'presentations', icon:'presentation', en:'Presentations & Public Speaking', ja:'発表・人前で話す',
    enSummary:'Explain ideas clearly and speak to an audience.',
    jaSummary:'アイデアを整理して、人前で伝える。',
    tasks:[
      { en:'Explain an idea in three minutes', ja:'アイデアを3分で説明する', kind:'speaking',
        promptEn:'Choose one idea. Explain what it is, why it matters, give one example, and finish with a clear takeaway.',
        promptJa:'アイデアを一つ選びます。内容、重要な理由、例、結論を3分で説明しましょう。',
        example:'Today I want to talk about ... This matters because ... For example, ...',
        checkpointsEn:['Open with the topic.','Give one clear example.','End with a takeaway.'],
        checkpointsJa:['テーマを最初に伝える。','具体例を一つ示す。','結論で締める。'] },
      { en:'Handle a question from the audience', ja:'質問に答える', kind:'speaking',
        promptEn:'Imagine someone asks: “What is the main limitation of your idea?” Acknowledge the question, answer directly, and explain one limitation.',
        promptJa:'「そのアイデアの主な限界は何ですか？」と聞かれた場面です。質問に答え、限界を一つ説明しましょう。',
        example:'That is an important question. One limitation is ...',
        checkpointsEn:['Acknowledge the question.','Give the answer first.','Add one reason or example.'],
        checkpointsJa:['質問を受け止める。','答えを先に言う。','理由か例を添える。'] },
    ],
  },
  {
    id:'academic', icon:'school', en:'Academic & Research Writing', ja:'学術・研究ライティング',
    enSummary:'Six stages: read evidence, write manuscripts and revise academic work.',
    jaSummary:'文献の読解から研究論文の執筆・推敲まで、６ステージで学ぶ。',
    tasks:[], // Routed to the dedicated 33-lesson AcademicCourse.
  },
  {
    id:'storytelling', icon:'book', en:'Storytelling', ja:'ストーリーテリング',
    enSummary:'Tell engaging stories and share personal experiences.',
    jaSummary:'経験や感情を、伝わる物語にする。',
    tasks:[], // Dedicated Storytelling course. Old response keys remain readable for migration.
  },
  {
    id:'writing', icon:'pencil', en:'Writing', ja:'ライティング',
    enSummary:'Write emails, essays, reports and thoughtful messages.',
    jaSummary:'メール・作文・レポートをわかりやすく書く。',
    tasks:[
      { en:'Write a polite request', ja:'丁寧な依頼メールを書く', kind:'writing',
        promptEn:'Write a short email asking a teacher or colleague for 15 minutes to discuss an idea. Include a clear subject, reason and polite closing.',
        promptJa:'先生や同僚に、アイデアについて15分相談したいと伝えるメールを書きましょう。件名、理由、結びを入れます。',
        example:'Subject: Quick question about ... Would you have 15 minutes to ...?',
        checkpointsEn:['Make the request clear.','Explain why.','Use a respectful closing.'],
        checkpointsJa:['依頼を明確にする。','理由を述べる。','丁寧に締めくくる。'] },
      { en:'Turn notes into a clear paragraph', ja:'メモから段落を作る', kind:'writing',
        promptEn:'Use these three notes to write one paragraph: “new skill / hard at first / daily practice helped”. Connect the ideas naturally.',
        promptJa:'「新しいスキル」「最初は難しかった」「毎日の練習が役立った」の3つのメモを、自然な1段落にしましょう。',
        example:'Learning ... was difficult at first. However, ...',
        checkpointsEn:['Use a topic sentence.','Connect the ideas.','Finish with a clear point.'],
        checkpointsJa:['最初の文で話題を示す。','文同士をつなぐ。','最後に要点をまとめる。'] },
    ],
  },
  {
    id:'reading', icon:'book', en:'Reading & Understanding', ja:'読解・理解',
    enSummary:'Read books, articles and arguments with confidence.',
    jaSummary:'記事や本を読み、内容や論理をつかむ。',
    tasks:[
      { en:'Find the main idea', ja:'文章の主張を見つける', kind:'reading',
        promptEn:'Read the passage. Write its main idea in one sentence, then list one detail that supports it.',
        promptJa:'文章を読み、主張を一文でまとめましょう。根拠となる具体例も一つ書きます。',
        example:'Many people believe learning a language requires talent. In reality, regular practice and useful feedback matter more than early confidence. Short conversations, repeated over time, can help learners build skills they can use outside the classroom.',
        checkpointsEn:['Find the central claim.','Separate the example from the claim.','Write a one-sentence summary.'],
        checkpointsJa:['主張を見つける。','主張と例を区別する。','一文で要約する。'] },
      { en:'Check what a statement actually supports', ja:'根拠を読み分ける', kind:'reading',
        promptEn:'Read the passage. What is the claim, and what evidence would you need before accepting it?',
        promptJa:'文章の主張を見つけ、それを確かめるにはどんな証拠が必要か考えましょう。',
        example:'A company reports that most users feel more confident after one week with its app. The survey did not measure language performance, and only people who finished the week responded.',
        checkpointsEn:['Identify what was measured.','Notice what was not measured.','Suggest better evidence.'],
        checkpointsJa:['何を測ったか確認する。','測っていないものに気づく。','必要な証拠を考える。'] },
    ],
  },
  {
    id:'ideas', icon:'lightbulb', en:'Ideas & Expression', ja:'アイデア・表現',
    enSummary:'Explore, refine, and express your own thinking in clear English.',
    jaSummary:'考えを深め、論理を整え、自分の言葉で英語で伝える。',
    tasks:[], // Dedicated eight-lesson IdeasCourse. Legacy saved drafts remain untouched.

  },
]
export const applicationIds=applicationTracks.map(track=>track.id)
export function applicationTrack(id){return applicationTracks.find(track=>track.id===id)??null}
export const applicationResponseKey=(trackId, taskIndex)=>'application-'+trackId+'-'+taskIndex
