// Chapter 02 is a hand-curated lesson model. These IDs are permanent recording,
// progress, saved-phrase and deep-link keys. Keep Study and Practice on the same records.
const phrase = (number, en, context, section, extra = {}) => ({
  id: 'ch02-p' + number,
  en,
  context,
  section,
  kind: 'phrase',
  ...extra,
})

export const introductionPhrases = [
  phrase(1, "Hi, I'm Alex. I'm a friend of Cassie's.", 'Give your name and explain how you know the host.', 'introduce', {
    speaker: 'Alex', portrait: 'portrait-ch02-alex.svg',
  }),
  phrase(2, "I'm Anna. Nice to meet you.", 'Give your name and greet the person you have just met.', 'introduce', {
    speaker: 'Anna', portrait: 'portrait-ch02-anna.svg',
  }),
  phrase(3, 'You too.', 'A short, natural reply to “Nice to meet you.”', 'introduce', {
    speaker: 'Alex', portrait: 'portrait-ch02-alex.svg',
  }),
  phrase(4, 'Hello, my name is Alex.', 'A clear, slightly more formal way to introduce yourself.', 'introduce'),
  phrase(5, 'Nice to meet you too.', 'A fuller reply to “Nice to meet you.”', 'introduce'),
  phrase(6, 'I work with Cassie.', 'Explain that you and Cassie are colleagues.', 'introduce'),
  phrase(7, "I'm on the design team.", 'Identify the team you belong to.', 'introduce'),
  phrase(8, "I'm a teacher.", 'Identify your job.', 'introduce'),
  phrase(9, "I'm here for the workshop.", 'Explain why you are at the event.', 'introduce'),
  phrase(10, "I don't think we've met. I'm Alex.", 'Start an introduction when you are unsure whether you have met before.', 'introduce'),
  phrase(11, "Hello, I'm Satoshi. I'm the project manager.", 'Give your name and role at a project meeting.', 'work', {
    speaker: 'Satoshi', portrait: 'portrait-ch02-satoshi.svg',
  }),
  phrase(12, "Daniel Reed. I go by Dan. It's a pleasure to meet you.", 'Give your full name, explain the name you normally use, and greet the other person.', 'work', {
    speaker: 'Daniel', portrait: 'portrait-ch02-daniel.svg',
  }),
  phrase(13, 'Likewise. Please call me Satoshi.', 'Return the greeting and tell the other person your preferred name.', 'work', {
    speaker: 'Satoshi', portrait: 'portrait-ch02-satoshi.svg',
  }),
  phrase(14, "Thanks, Satoshi. I'm on the research team.", 'Acknowledge the name Satoshi uses and identify your team.', 'work', {
    speaker: 'Daniel', portrait: 'portrait-ch02-daniel.svg',
  }),
  phrase(15, 'I go by Dan.', 'Tell someone the name you normally use, often after giving your full name.', 'work'),
  phrase(16, 'How do you do?', 'A traditional formal greeting, usually answered with the same greeting.', 'work', {
    register: 'Optional · formal',
  }),
  phrase(17, 'Anna, this is my colleague, Sam. Sam, this is Anna.', 'Introduce both people to each other.', 'connect', {
    speaker: 'Alex', portrait: 'portrait-ch02-alex.svg',
  }),
  phrase(18, 'Nice to meet you, Sam.', 'Greet the person you have just been introduced to.', 'connect', {
    speaker: 'Anna', portrait: 'portrait-ch02-anna.svg',
  }),
  phrase(19, 'You too. How do you know Alex?', 'Return the greeting, then ask about a shared connection.', 'connect', {
    speaker: 'Sam', portrait: 'portrait-ch02-sam.svg',
  }),
  phrase(20, 'We take a photography class together.', 'Explain a shared activity.', 'connect', {
    speaker: 'Anna', portrait: 'portrait-ch02-anna.svg',
  }),
  phrase(21, "I'd like you to meet Sam.", 'Introduce someone by saying that you want the other person to meet them.', 'connect'),
  phrase(22, 'Have you met Sam?', 'Check whether two people already know each other.', 'connect', {
    speaker: 'Alex', portrait: 'portrait-ch02-alex.svg',
  }),
  phrase(23, 'Yes, we met at the last workshop. Good to see you again, Sam.', 'Acknowledge a previous meeting and greet the person again.', 'connect', {
    speaker: 'Anna', portrait: 'portrait-ch02-anna.svg',
  }),
  phrase(24, "It's nice to finally meet you in person.", 'Meet face to face after talking online.', 'connect'),
  phrase(25, 'Could you say your name again?', 'Ask someone to repeat a name you did not catch.', 'introduce'),
  phrase(26, 'How do you spell it?', 'Ask which letters are in a name.', 'introduce'),
  phrase(27, "Hi, I'm Alex.", 'A casual, natural way to give your name.', 'introduce', {
    speaker: 'Alex', portrait: 'portrait-ch02-alex.svg',
  }),
  phrase(29, "I'm a friend of Cassie's.", 'Explain your connection to the host: Cassie is your friend.', 'introduce'),
  phrase(30, 'Nice to meet you.', 'A common greeting when you are introduced to someone for the first time.', 'introduce'),
  phrase(31, "It's a pleasure to meet you.", 'A more formal way to say “Nice to meet you.”', 'work'),
  phrase(32, 'Likewise.', 'A concise way to say you feel the same way.', 'work'),
  phrase(33, 'Please call me Satoshi.', 'Tell someone which name you prefer them to use. Replace Satoshi with your own name.', 'work'),
  phrase(35, 'Hello, everyone. This is Alex.', 'Introduce another person to a group so everyone knows who they are.', 'connect'),
  phrase(36, 'Let me introduce Alex.', 'A clear way to introduce someone before adding a little more detail.', 'connect'),
  phrase(38, "Hello, everyone. I'm Alex.", 'Introduce yourself to a group.', 'introduce'),
  phrase(37, 'What should I call you?', 'Ask someone which name they prefer you to use.', 'work'),
  {
    id: 'ch02-v0',
    en: 'friend',
    context: 'Someone you know well and like.',
    section: 'words',
    kind: 'word',
    art: 'ch02-friend.png',
  },
  {
    id: 'ch02-v1',
    en: 'colleague',
    context: 'Someone you work with.',
    section: 'words',
    kind: 'word',
    art: 'ch02-colleague.png',
  },
  {
    id: 'ch02-v2',
    en: 'name',
    context: 'What someone is called.',
    section: 'words',
    kind: 'word',
    art: 'ch02-name.png',
  },
  {
    id: 'ch02-v3',
    en: 'photography class',
    context: 'A class where you learn to take photographs.',
    section: 'words',
    kind: 'word',
    art: 'ch02-photography-class.png',
  },
]

export const introductionById = Object.fromEntries(
  introductionPhrases.map((item) => [item.id, item]),
)

const ids = (...numbers) => numbers.map((number) => 'ch02-p' + number)
const phraseShelf = (numbers, title, sceneArt, note) => ({
  type: 'phrases',
  phrases: ids(...numbers),
  title,
  sceneArt,
  ...(note ? { note } : {}),
})
const conversation = (title, numbers, art, alt, replyAlternatives) => ({
  type: 'conversation',
  title,
  phrases: ids(...numbers),
  art,
  alt,
  ...(replyAlternatives ? { replyAlternatives } : {}),
})

const situationalExamples = (title, examples) => ({
  type: 'situations',
  title,
  examples: examples.map(({ label, hint, numbers }) => ({
    label,
    hint,
    phrases: ids(...numbers),
  })),
})

export const introductionSections = [
  {
    id: 'introduce',
    title: 'Introduce yourself',
    short: 'Introduce yourself',
    blocks: [
      {
        type: 'text',
        text: 'Start with your name. Listen to how the other person responds, then return the greeting. This simple exchange works in most everyday first meetings.',
      },
      conversation(
        'A natural first introduction',
        [27, 2, 3],
        'ch02-scene-self-introduction.webp',
        'Alex and Anna meeting for the first time.',
        {
          title: 'Other natural replies',
          promptId: 'ch02-p30',
          choices: [
            { id: 'ch02-p3', label: 'Short' },
            { id: 'ch02-p5', label: 'Fuller' },
          ],
        },
      ),
      phraseShelf([4, 38], 'Other ways to begin'),
      situationalExamples('When the situation changes what you say', [
        {
          label: 'At a friend’s gathering',
          hint: 'If Cassie is your connection, say whether you are her friend or coworker.',
          numbers: [1, 29, 6],
        },
        {
          label: 'At a workshop',
          hint: 'Mention why you are there when it helps the conversation.',
          numbers: [9],
        },
        {
          label: 'Not sure you have met before',
          hint: 'This can replace your usual opening.',
          numbers: [10],
        },
        {
          label: 'You did not catch their name',
          hint: 'Ask them to repeat it or spell it.',
          numbers: [25, 26],
        },
      ]),
    ],
  },
  {
    id: 'work',
    title: 'Meet someone at work',
    short: 'At work',
    blocks: [
      {
        type: 'text',
        text: 'In a project meeting, people often give their name and role. The same everyday greetings still work; the setting does not require formal language.',
      },
      conversation(
        'At the start of a project meeting',
        [11, 12, 13, 14],
        'ch02-scene-project-meeting.webp',
        'Satoshi and Daniel introducing themselves at a project meeting.',
      ),
      phraseShelf([15, 31, 32, 33, 37], 'Other ways to greet and use names'),
      situationalExamples('When your work is relevant', [
        {
          label: 'When your team matters',
          hint: 'Tell the person which team you belong to.',
          numbers: [7],
        },
        {
          label: 'When someone asks what you do',
          hint: 'Give your occupation, not your entire background.',
          numbers: [8],
        },
      ]),
      phraseShelf([16], 'A traditional formal greeting', undefined, {
        text: '“How do you do?” is uncommon in everyday American English. Recognize it, but do not treat it as a required introduction.',
      }),
    ],
  },
  {
    id: 'connect',
    title: 'Introduce two people',
    short: 'Introduce others',
    blocks: [
      {
        type: 'text',
        text: 'Say both names so neither person is left out. A shared connection can help them start talking, but it is not required.',
      },
      conversation(
        'Introducing a colleague to a friend',
        [17, 18, 19, 20],
        'ch02-scene-introduce-others.webp',
        'Alex introducing her colleague Sam to Anna.',
      ),
      phraseShelf([21, 35, 36], 'Other ways to introduce someone'),
      {
        type: 'text',
        text: 'If the two people might already know one another, check before introducing them as strangers.',
      },
      conversation(
        'They have met before',
        [22, 23],
        'ch02-scene-reconnect.webp',
        'Alex checks whether Anna has met Sam before; Anna greets Sam again.',
      ),
      phraseShelf([24], 'After meeting online', undefined, {
        text: 'Use this when you are meeting face to face after talking online.',
      }),
    ],
  },
]

// Migrate old rehearsal IDs, saved phrases, and links to the stable curated records.
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
  'ch02-p112965777075329': 'ch02-p27',
  'ch02-p244176047606341': 'ch02-p4',
  'ch02-p28': 'ch02-p4',
  'ch02-p9762649518440': 'ch02-p29',
  'ch02-p113457497400069': 'ch02-p30',
  'ch02-p183395905865867': 'ch02-p3',
  'ch02-p257606337646854': 'ch02-p5',
  'ch02-p225668934901400': 'ch02-p6',
  'ch02-p242254682004102': 'ch02-p7',
  'ch02-p165814197450760': 'ch02-p8',
  'ch02-p53930551993502': 'ch02-p9',
  'ch02-p40546209141201': 'ch02-p10',
  'ch02-p89377836719809': 'ch02-p31',
  'ch02-p103546877069472': 'ch02-p32',
  'ch02-p167978653676711': 'ch02-p33',
  'ch02-p194692436570439': 'ch02-p15',
  'ch02-p36675863763213': 'ch02-p27',
  'ch02-p34': 'ch02-p27',
  'ch02-p252636359137330': 'ch02-p30',
  'ch02-p158049194780759': 'ch02-p16',
  'ch02-p162843841720073': 'ch02-p35',
  'ch02-p54316637154125': 'ch02-p36',
  'ch02-p258819075097130': 'ch02-p22',
  'ch02-p263898734650894': 'ch02-p24',
  'ch02-p88747932635278': 'ch02-p25',
  'ch02-p245678920191676': 'ch02-p26',
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
    prompt: 'You are Avery, a friend of Taylor’s. Introduce yourself to Morgan at a gathering. When Morgan says “Nice to meet you,” try both natural replies in separate attempts.',
    sample: "Hi, I'm Avery. I'm a friend of Taylor's. — I'm Morgan. Nice to meet you. — You too.",
  },
  {
    id: 'ch02-b20-1',
    prompt: 'You are Daniel Reed, a researcher. You normally go by Dan. Meet Satoshi, a project manager. Introduce yourself, explain the name you use, and mention your team.',
    sample: "Daniel Reed. I go by Dan. It's a pleasure to meet you. — Likewise. Please call me Satoshi. — Thanks, Satoshi. I'm on the research team.",
  },
  {
    id: 'ch02-b20-2',
    prompt: 'Introduce Morgan, a researcher, and Avery to each other. Avery asks how Morgan knows Taylor. They work together.',
    sample: 'Morgan, this is Avery. Avery, this is my colleague Morgan. — Nice to meet you. How do you know Taylor? — We work together.',
  },
  {
    id: 'ch02-b20-3',
    prompt: 'Morgan tells you that you met before, at a workshop. Acknowledge that and continue.',
    sample: 'Oh, yes. Good to see you again.',
  },
  {
    id: 'ch02-b20-4',
    prompt: 'Put the examples away. Make a three-turn introduction using your own name or an invented identity. Ask for the name again if needed.',
    sample: 'Many answers work. Check: did the other person learn who you are and how you are connected? Did you respond to what they said?',
  },
]
