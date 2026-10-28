// Quick recognition checks after speaking practice.
// The first two chapters have hand-authored situations; other chapters
// build checkable questions from their own taught phrases and meaning notes.
const authored = {
  '01': [
    {
      prompt: 'A colleague says “Good morning.” Which reply fits?',
      promptJa: '同僚から「Good morning.」と言われました。自然な返答はどれですか？',
      options: ['Good morning.', 'Good night.', 'How have you been?'],
      answer: 0,
      why: '“Morning.” also works as a shorter, friendly reply.',
      whyJa: '親しい相手なら、短く「Morning.」と返しても自然です。',
    },
    {
      prompt: 'Someone says “Pretty good. You?” You are doing well. What do you say?',
      promptJa: '相手が「Pretty good. You?」と聞き返しました。あなたも元気です。どう答えますか？',
      options: ['It’s been a while.', 'Good, thanks.', 'Good evening.'],
      answer: 1,
      why: 'They returned the question, so answer how you are doing.',
      whyJa: '相手がこちらの調子を聞いているので、自分の調子を答えます。',
    },
    {
      prompt: 'It is a difficult day. You want to answer “How are you?” briefly and honestly.',
      promptJa: '今日は大変な一日です。「How are you?」に短く正直に答えるなら？',
      options: ['Pretty good!', 'Not great.', 'Couldn’t be better!'],
      answer: 1,
      why: '“Not great.” shares how you are without requiring an explanation.',
      whyJa: '「Not great.」なら、詳しく説明せずに調子がよくないと伝えられます。',
    },
    {
      prompt: 'You meet an acquaintance after several months. Which question asks about the time apart?',
      promptJa: '数か月ぶりに知り合いに会いました。会っていなかった間の様子を尋ねる表現は？',
      options: ['What’s your name?', 'How have you been?', 'How do you spell that?'],
      answer: 1,
      why: '“How have you been?” asks about the period since you last met.',
      whyJa: '「How have you been?」は、前に会ってから今までの様子を尋ねます。',
    },
    {
      prompt: 'You greet an unfamiliar work contact in the afternoon. Which opening suits the situation?',
      promptJa: '午後、初めて接する仕事の相手にあいさつします。どれが合いますか？',
      options: ['Yo!', 'Good night.', 'Good afternoon.'],
      answer: 2,
      why: '“Good afternoon.” suits this setting; “Hello.” would work too.',
      whyJa: 'この場面では「Good afternoon.」が合います。「Hello.」でも自然です。',
    },
    {
      prompt: 'You are opening an evening meeting with a group. Which greeting fits?',
      promptJa: '夕方以降にグループの会議を始めます。最初のあいさつは？',
      options: ['Good evening, everyone.', 'Good night, everyone.', 'How have you been?'],
      answer: 0,
      why: '“Good evening” opens a meeting. “Good night” usually closes an interaction.',
      whyJa: '会議を始めるなら「Good evening.」。「Good night.」は通常、別れ際に使います。',
    },
  ],
  '02': [
    {
      prompt: 'You are Avery, a friend of Taylor. Which line introduces you to Morgan?',
      promptJa: 'あなたはTaylorの友人、Averyです。Morganへの自己紹介として合うのは？',
      options: ["Hi, I'm Avery. I'm a friend of Taylor's.", "I'm Morgan. Nice to meet you.", 'Have we met before?'],
      answer: 0,
      why: 'Give your name and a relevant connection.',
      whyJa: '自分の名前と、相手に伝わりやすいつながりを話します。',
    },
    {
      prompt: 'Someone asks, “What should I call you?” You prefer Taylor. What is your reply?',
      promptJa: '「What should I call you?」と聞かれ、Taylorと呼んでほしいときは？',
      options: ["I'm on the design team.", 'Please call me Taylor.', 'Could you spell your name?'],
      answer: 1,
      why: 'Answer with the name you want the other person to use.',
      whyJa: '相手に使ってほしい名前を伝えます。',
    },
    {
      prompt: 'You want Morgan and Avery to meet each other. Which introduction works?',
      promptJa: 'MorganとAveryを互いに紹介します。自然なのはどれですか？',
      options: ['How do you know Taylor?', "I'm Morgan.", 'Morgan, this is Avery. Avery, this is Morgan.'],
      answer: 2,
      why: 'Naming both people makes the introduction mutual.',
      whyJa: '二人の名前を伝えると、双方をきちんと紹介できます。',
    },
    {
      prompt: 'Morgan reminds you that you met at a workshop. You remember now. What do you say?',
      promptJa: 'Morganに「前にワークショップで会った」と言われ、思い出しました。何と言いますか？',
      options: ['Nice to meet you for the first time.', 'Oh, yes. Good to see you again.', 'How do you spell that?'],
      answer: 1,
      why: 'Acknowledge the earlier meeting instead of treating it as the first.',
      whyJa: '初対面のように答えず、以前会ったことを受け止めます。',
    },
    {
      prompt: 'You did not catch the name someone just said. Which request is polite and useful?',
      promptJa: '相手の名前を聞き取れませんでした。丁寧に聞き直すには？',
      options: ['Could you say your name again?', 'Why are you here?', 'I know your name.'],
      answer: 0,
      why: 'Asking again is better than pretending you heard.',
      whyJa: '聞こえたふりをせず、もう一度言ってもらいましょう。',
    },
  ],
}

export function questionsForPilot(id, language = 'en') {
  return (authored[id] ?? []).map((item, index) => ({
    id: id + '-quiz-' + index,
    prompt: language === 'ja' ? item.promptJa : item.prompt,
    options: item.options,
    answer: item.answer,
    explanation: language === 'ja' ? item.whyJa : item.why,
  }))
}

const normalize = (value) => String(value ?? '')
  .toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
  .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, ' ').trim()

const tooGeneric = /^(?:start here|practice|use this|common|example|word|phrase|greeting|answer|try again|at work|everyday|other|optional|review|general)$/i
const goodItem = (item) => {
  const context = String(item.context ?? '').trim()
  const expression = String(item.en ?? '').trim()
  const minimumClueLength = /[\u3040-\u30ff\u3400-\u9fff]/.test(context) ? 4 : 18
  if (!expression || expression.length > 115 || context.length < minimumClueLength || context.length > 240) return false
  if (tooGeneric.test(context) || /^ch\d{2}-(?:b|p|line|v)/.test(expression)) return false
  // Do not put the literal answer in its description.
  if (normalize(expression).length >= 3 && normalize(context).includes(normalize(expression))) return false
  return true
}

// The correct option is always drawn from the chapter's own phrase bank.
// The distractors are distinct taught expressions with different meanings.
export function contextQuestions(items, language = 'en', limit = 6) {
  const unique = []
  const seen = new Set()
  for (const item of items ?? []) {
    const expression = normalize(item.en)
    const clue = normalize(item.context)
    if (!goodItem(item) || seen.has(clue) || !expression) continue
    seen.add(clue)
    unique.push({ ...item, clue, expression })
  }
  if (unique.length < 3) return []
  const groups = new Map()
  for (const item of unique) {
    if (!groups.has(item.section)) groups.set(item.section, [])
    groups.get(item.section).push(item)
  }
  const targets = []
  for (let round = 0; round < 3 && targets.length < limit; round++) {
    for (const group of groups.values()) {
      if (group[round] && targets.length < limit) targets.push(group[round])
    }
  }
  return targets.flatMap((item, index) => {
    const distractors = unique.filter((other) =>
      other.id !== item.id &&
      other.clue !== item.clue &&
      other.expression !== item.expression &&
      !item.expression.includes(other.expression) &&
      !other.expression.includes(item.expression),
    )
    // Contrast within the same topic when possible.
    distractors.sort((a, b) =>
      Number(b.section === item.section) - Number(a.section === item.section))
    const chosen = []
    for (const other of distractors) {
      if (chosen.some((prior) =>
        prior.expression === other.expression ||
        prior.expression.includes(other.expression) ||
        other.expression.includes(prior.expression) ||
        prior.clue === other.clue)) continue
      chosen.push(other)
      if (chosen.length === 2) break
    }
    if (chosen.length < 2) return []
    const options = [item.en, ...chosen.map((other) => other.en)]
    const offset = (index + 1) % 3
    const rotated = options.map((_, i) => options[(i + offset) % 3])
    return [{
      id: item.id + '-quiz',
      prompt: language === 'ja'
        ? '次の説明に合う英語の表現はどれですか？'
        : 'Which English expression matches this description?',
      detail: item.context,
      options: rotated,
      answer: rotated.indexOf(item.en),
      explanation: language === 'ja'
        ? 'この説明に合う表現を確認しましょう。'
        : 'This expression matches the meaning or situation described.',
    }]
  })
}

export function makeScenarioQuiz(model, language = 'en') {
  if (authored[model.id]) return questionsForPilot(model.id, language)
  return contextQuestions(model.phrases, language)
}
