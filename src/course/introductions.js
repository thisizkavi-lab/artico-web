// Chapter 02 pilot. IDs are permanent recording/progress keys, not manuscript line numbers.
// The Study blocks and Practice collection refer to these same records.
const phrase = (number, en, context, section, extra = {}) => ({
  id: `ch02-p${number}`,
  en,
  context,
  section,
  kind: 'phrase',
  ...extra,
})

export const introductionPhrases = [
  phrase(
    1,
    "Hi, I'm Maya. I'm a friend of Jordan's.",
    'Give your name and a connection at a gathering.',
    'introduce',
    { speaker: 'Maya' },
  ),
  phrase(
    2,
    "I'm Eli. Nice to meet you.",
    'Introduce yourself and acknowledge the other person.',
    'introduce',
    { speaker: 'Eli' },
  ),
  phrase(3, 'You too.', 'Return the feeling after “Nice to meet you.”', 'introduce', {
    speaker: 'Maya',
  }),
  phrase(4, 'My name is Maya.', 'Another way to give your name.', 'introduce'),
  phrase(5, 'Nice to meet you too.', 'A fuller reply to “Nice to meet you.”', 'introduce'),
  phrase(6, 'I work with Jordan.', 'Explain that you are colleagues.', 'introduce'),
  phrase(7, "I'm on the design team.", 'Identify your team.', 'introduce'),
  phrase(8, "I'm a teacher.", 'Identify your job.', 'introduce'),
  phrase(9, "I'm here for the workshop.", 'Explain why you are there.', 'introduce'),
  phrase(
    10,
    "I don't think we've met. I'm Maya.",
    'Open an introduction when you are unsure whether you have met.',
    'introduce',
  ),
  phrase(
    11,
    "Hello, I'm Priya Shah. I'm the project manager.",
    'Give your full name and role at a project meeting.',
    'work',
    { speaker: 'Priya' },
  ),
  phrase(12, "Daniel Reed. It's a pleasure to meet you.", 'A more formal introduction.', 'work', {
    speaker: 'Daniel',
  }),
  phrase(
    13,
    'Likewise. Please call me Priya.',
    'Return the feeling and give your preferred name.',
    'work',
    { speaker: 'Priya' },
  ),
  phrase(
    14,
    "Thanks, Priya. I'm on the research team.",
    'Acknowledge the preferred name and explain your role.',
    'work',
    { speaker: 'Daniel' },
  ),
  phrase(15, 'I go by Dan.', 'Tell someone the name you normally use.', 'work'),
  phrase(
    16,
    'How do you do?',
    'A traditional formal greeting, usually answered with the same greeting.',
    'work',
    { register: 'Optional · formal' },
  ),
  phrase(
    17,
    'Eli, this is my colleague, Sam. Sam, this is Eli.',
    'Introduce both people to each other.',
    'connect',
    { speaker: 'Maya' },
  ),
  phrase(
    18,
    'Nice to meet you, Sam.',
    'Greet the person you have just been introduced to.',
    'connect',
    { speaker: 'Eli' },
  ),
  phrase(
    19,
    'You too. How do you know Maya?',
    'Return the greeting, then ask about a shared connection.',
    'connect',
    { speaker: 'Sam' },
  ),
  phrase(20, 'We take a photography class together.', 'Explain a shared activity.', 'connect', {
    speaker: 'Eli',
  }),
  phrase(21, "I'd like you to meet Sam.", 'Another way to introduce someone.', 'connect'),
  phrase(22, 'Have you met Sam?', 'Check whether two people already know each other.', 'connect', {
    speaker: 'Maya',
  }),
  phrase(
    23,
    'Yes, we met at the last workshop. Good to see you again, Sam.',
    'Acknowledge a previous meeting.',
    'connect',
    { speaker: 'Eli' },
  ),
  phrase(
    24,
    "It's nice to finally meet in person.",
    'Meet face to face after talking online.',
    'connect',
  ),
  phrase(25, 'Could you say your name again?', 'Ask to hear a name again.', 'names'),
  phrase(26, 'How do you spell it?', 'Ask for the letters in a name.', 'names'),
  {
    id: 'ch02-v0',
    en: 'friend',
    context: 'Someone you know well and like.',
    section: 'words',
    kind: 'word',
    art: 'word-friend.svg',
  },
  {
    id: 'ch02-v1',
    en: 'colleague',
    context: 'Someone you work with.',
    section: 'words',
    kind: 'word',
    art: 'word-coworker.svg',
  },
  {
    id: 'ch02-v2',
    en: 'name',
    context: 'What someone is called.',
    section: 'words',
    kind: 'word',
    art: 'word-name-tag.svg',
  },
  {
    id: 'ch02-v3',
    en: 'photography class',
    context: 'A class where you learn to take photographs.',
    section: 'words',
    kind: 'word',
    art: 'word-camera.svg',
  },
]

export const introductionById = Object.fromEntries(
  introductionPhrases.map((item) => [item.id, item]),
)
const ids = (...numbers) => numbers.map((number) => `ch02-p${number}`)
export const introductionSections = [
  {
    id: 'introduce',
    title: 'Say who you are',
    short: 'Introduce yourself',
    blocks: [
      {
        type: 'text',
        text: 'Start with your name. Then add one detail that helps the other person place you: a friend in common, your role, or why you are there. You do not need to give your whole background.',
      },
      {
        type: 'conversation',
        title: 'At a friend’s gathering',
        art: 'ch02-scene-0.svg',
        alt: 'Maya and Eli talking at a friend’s gathering.',
        phrases: ids(1, 2, 3),
      },
      {
        type: 'text',
        text: 'Maya connects her name to someone Eli may know. Eli acknowledges the introduction, and Maya returns the feeling with a short reply.',
      },
      { type: 'label', text: 'Two useful alternatives' },
      { type: 'phrases', phrases: ids(4, 5) },
      { type: 'label', text: 'Choose one detail that fits' },
      { type: 'phrases', phrases: ids(6, 7, 8, 9) },
      {
        type: 'text',
        text: 'Not sure whether you have met before? Leave room for the other person to recognize you.',
      },
      { type: 'phrases', phrases: ids(10) },
    ],
  },
  {
    id: 'work',
    title: 'Meet someone at work',
    short: 'At work',
    blocks: [
      {
        type: 'text',
        text: 'A full name and a role can be useful at a first meeting. Let the situation and the other person guide how formal you sound.',
      },
      {
        type: 'conversation',
        title: 'At the start of a project meeting',
        art: 'ch02-scene-1.svg',
        alt: 'Priya and Daniel introducing themselves at a project meeting.',
        phrases: ids(11, 12, 13, 14),
      },
      {
        type: 'text',
        text: 'Daniel’s greeting is a little more ceremonious. Priya returns the feeling, then tells him which name to use. Using her preferred name shows that he listened.',
      },
      { type: 'label', text: 'Give the name you use' },
      { type: 'phrases', phrases: ids(15) },
      {
        type: 'note',
        title: 'Professional can still be friendly.',
        text: 'The everyday greeting from the first scene also works in many workplaces. Respect someone’s preferred name or title; the location alone does not decide the level of formality.',
      },
      { type: 'label', text: 'One formal greeting you may hear' },
      { type: 'phrases', phrases: ids(16) },
      {
        type: 'text',
        text: 'This is a greeting, not a question about your job. You can reply with the same greeting. It is useful to recognize, but you do not need it for every introduction.',
      },
    ],
  },
  {
    id: 'connect',
    title: 'Connect two people',
    short: 'Introduce others',
    blocks: [
      {
        type: 'text',
        text: 'Say both names so neither person is left out. A small detail about the connection gives them somewhere to take the conversation.',
      },
      {
        type: 'conversation',
        title: 'Introducing a colleague to a friend',
        art: 'ch02-scene-2.svg',
        alt: 'Maya introducing her colleague Sam to Eli.',
        phrases: ids(17, 18, 19, 20),
      },
      {
        type: 'text',
        text: 'The same introduction frame works for a friend, partner, relative, or colleague. Here is another way to begin.',
      },
      { type: 'phrases', phrases: ids(21) },
      {
        type: 'text',
        text: 'If they might already know each other, check first. Respond to what the other person actually says.',
      },
      { type: 'conversation', title: 'They have met before', phrases: ids(22, 23) },
      {
        type: 'note',
        title: 'Give the conversation room.',
        text: 'A shared activity is one way to continue. You do not have to ask a personal question immediately after an introduction.',
      },
      { type: 'label', text: 'From online to in person' },
      { type: 'phrases', phrases: ids(24) },
      {
        type: 'text',
        text: 'Use this when you have spoken online and are now meeting face to face. Meeting and seeing expressions are flexible; they are not a rigid test of whether you have ever had contact before.',
      },
    ],
  },
  {
    id: 'names',
    title: 'Make sure you catch the name',
    short: 'Catch a name',
    blocks: [
      {
        type: 'text',
        text: 'You do not need to pretend you heard everything. Ask for the name again, or ask for its spelling. Chapter 04 develops these repair skills further.',
      },
      { type: 'phrases', phrases: ids(25, 26) },
    ],
  },
]

// Keep existing saved phrases and shared links useful when entering the pilot.
export const introductionAliases = {
  'ch02-line10': 'ch02-p1',
  'ch02-line11': 'ch02-p2',
  'ch02-line12': 'ch02-p3',
  'ch02-line29': 'ch02-p11',
  'ch02-line30': 'ch02-p12',
  'ch02-line31': 'ch02-p13',
  'ch02-line32': 'ch02-p14',
  'ch02-line42': 'ch02-p17',
  'ch02-line43': 'ch02-p18',
  'ch02-line44': 'ch02-p19',
  'ch02-line45': 'ch02-p20',
  'ch02-line49': 'ch02-p22',
  'ch02-line50': 'ch02-p23',
  'ch02-v4': 'ch02-p6',
  'phrase-friend': 'ch02-p1',
  'phrase-coworker': 'ch02-p6',
  'first-0': 'ch02-p1',
  'first-1': 'ch02-p2',
  'first-2': 'ch02-p3',
  'friend-0': 'ch02-p17',
  'friend-1': 'ch02-p18',
  'friend-2': 'ch02-p19',
}

export const introductionScenarios = [
  {
    id: 'ch02-b20-0',
    prompt:
      'You are Avery, a friend of Taylor’s. Introduce yourself to Morgan at a gathering. Speak both sides of the conversation.',
    sample: "Hi, I'm Avery. I'm a friend of Taylor's. — I'm Morgan. Nice to meet you. — You too.",
  },
  {
    id: 'ch02-b20-1',
    prompt:
      'You are Taylor Brooks, on the design team. Introduce yourself at a project meeting. Morgan asks what to call you. Give your preferred name.',
    sample:
      "I'm Taylor Brooks. I'm on the design team. — What should I call you? — Please call me Taylor.",
  },
  {
    id: 'ch02-b20-2',
    prompt:
      'Introduce Morgan, a researcher, and Avery to each other. Avery asks how Morgan knows Taylor. They work together.',
    sample:
      'Morgan, this is Avery. Avery, this is my colleague Morgan. — Nice to meet you. How do you know Taylor? — We work together.',
  },
  {
    id: 'ch02-b20-3',
    prompt: 'Morgan tells you that you met before, at a workshop. Acknowledge that and continue.',
    sample: 'Oh, yes. Good to see you again.',
  },
  {
    id: 'ch02-b20-4',
    prompt:
      'Put the examples away. Make a three-turn introduction using your own name or an invented identity. Ask for the name again if needed.',
    sample:
      'Many answers work. Check: did the other person learn who you are and how you are connected? Did you respond to what they said?',
  },
]
