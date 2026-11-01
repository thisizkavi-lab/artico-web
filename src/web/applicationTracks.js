// Application is goal-led: learners choose what they want to accomplish in
// English. These are original starter exercises, not official exam questions.
export const applicationTracks = [
  {
    id:'other-half', icon:'book', en:'The Other Half of English', ja:'英語のもう半分',
    enSummary:'A field guide to real American English beyond textbooks. Recognition first; no speaking drills.',
    jaSummary:'教科書では扱われにくい、実際のアメリカ英語を理解するためのガイド。',
    tasks:[], // A recognition-first reference course, not a speaking or test track.
  },
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
    enSummary:'Understand everyday social connection. Learn to begin, respond, and finish naturally.',
    jaSummary:'人と自然につながる会話の仕組みを学び、始め方・返し方・終え方を練習する。',
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
    enSummary:'Plan and deliver talks for research, business, teaching and real-world situations.',
    jaSummary:'研究・ビジネス・教育など、目的に合う発表を組み立てて伝える。',
    tasks:[], // Routed to the dedicated research-informed 18-lesson PresentationCourse.
  },
  {
    id:'academic', icon:'school', en:'Academic & Research Writing', ja:'学術・研究ライティング',
    enSummary:'Six stages: read evidence, write manuscripts and revise academic work.',
    jaSummary:'文献の読解から研究論文の執筆・推敲まで、６ステージで学ぶ。',
    tasks:[], // Routed to the dedicated 33-lesson AcademicCourse.
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
    enSummary:'A graded library of stories, real-world documents, news and literature.',
    jaSummary:'物語・日常文書・ニュース・文学を読む、難易度別のライブラリー。',
    tasks:[], // Routed to the dedicated ReadingCourse; old generic drills have been replaced.
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
