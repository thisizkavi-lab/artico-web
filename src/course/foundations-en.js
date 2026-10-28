// English guidance for the existing foundation curriculum. The original
// Japanese sources remain available for a future language edition.
const section = (id, title, paragraphs, extra = {}) => ({ id, title, paragraphs, ...extra })
export const orientation = [
  section('orientation-language', 'Why does language matter?', [
    'Other people cannot read your mind. **Language** helps you share your thoughts, ask questions, make plans, and build relationships.',
    'We do not always understand each other. **Communication** also means listening, asking questions, and explaining things again.',
  ]),
  section('orientation-english', 'Why English?', [
    'Your own language already connects you to people. English gives you another way to reach people, information, and opportunities.',
    'People use English across borders, including in science, work, travel, and online communication. Its **wide use** makes English useful, not better than other languages.',
  ]),
  section('orientation-answer', 'Why do you want to learn?', [
    'English is a **tool**, not a measure of intelligence.',
    'What would you like to understand, say, or do in English? Your reason might be personal, practical, or simply curiosity.',
    '**Start with your own reason.** It can change over time.',
  ]),
]

export const howItWorks = [
  section('how-philosophy', 'Our philosophy.', [
    '**Make learning simple, not superficial.**',
    'Artico provides clear explanations, useful language, and meaningful practice. We remove **unnecessary complexity**, not the effort that helps you learn.',
    'The goal is not to finish lessons or collect points. **The goal is to understand English and use it in your life.**',
  ]),
  section('how-start-line', 'Choose where to begin.', [
    'Artico has three learning areas. Choose the one that helps you now:',
  ], {
    items: [
      'Level Zero — letters, sounds, pronunciation, and rhythm.',
      'Social Fluency — everyday conversations and vocabulary.',
      'Application — practical goals, such as interviews, presentations, academic work, reading, and writing.',
    ],
  }),
  section('how-two-by-two', 'Study and Practice.', [
    'Most lessons have two modes.',
    '**Study** helps you understand. See the situation, learn useful expressions, and understand when and why people use them.',
    '**Practice** helps you use what you learned. Listen when audio is available. Speak aloud, recall expressions, change details, and respond to situations.',
  ]),
  section('how-chapter-loop', 'How learning happens.', [
    '**Understand → Practise → Recall → Use → Review.**',
    'Reading about English is not the same as using English. You need repeated practice, feedback, and real opportunities to communicate.',
    'Artico provides the material and practice tools. You decide how to use them, at your own pace.',
  ]),
]

export const foundationReading = {
  orientation: {
    title: 'The big picture',
    subtitle: 'Your reason to learn. Your way forward.',
    sections: orientation,
  },
  'how-it-works': {
    title: 'How Artico works',
    subtitle: 'A little understanding. A lot of meaningful practice.',
    sections: howItWorks,
  },
  letters: {
    title: 'The Alphabet',
    subtitle: 'Meet the 26 letters. See them, hear them, and give them a try.',
    sections: [
      section('letters-start', 'Welcome to the very start of English.', [
        'Every word you write in English is built from just 26 letters. That’s it. Twenty-six symbols, two shapes each — capital and small.',
        'These letters weren’t born in England. They traveled. The English alphabet came through Latin, which developed from earlier alphabets, including Greek and Phoenician. Every time you write a letter, you’re using a piece of history passed down for thousands of years.',
        'Think of letters like bricks. Alone, they’re small and simple. Put them together, and you can build anything — names, jokes, songs, stories, even entire worlds.',
        'Today, we’ll start with the 26 letters of English. You’ll see them, hear their names, say them, and get to know their shapes. Once they feel familiar, the rest will be easier to explore.',
        '**Let’s meet them all first…**',
      ]),
      section('letters-board', 'Meet all 26 letters.', [
        'Each letter has an uppercase (capital) and a lowercase (small) form. Select any letter to hear its name. The sound comes from your device’s English voice.',
      ], { widget: 'alphabet' }),
      section('letters-try', 'Watch. Say. Write.', [
        'You have met the letters. Now give them a try in three simple steps.',
        'A letter’s name is not always the sound it makes inside a word. We’ll explore those sounds later.',
      ], {
        video: [
          'MgmIHtp-ZQM',
          'The Alphabet Song | Lower Case Letters | Super Simple ABCs',
          'Super Simple ABCs / Super Simple Songs',
          20,
        ],
        items: [
          'Watch — Play the alphabet song and follow A to Z with your eyes.',
          'Say — Watch again, sing or speak along, then try a few letters without the video.',
          'Write — On paper, copy a few capital and small letters. Look away and try them once more.',
        ],
      }),
    ],
  },
  write: {
    title: 'Write the alphabet',
    subtitle: 'Give the shapes a little time on paper.',
    sections: [
      section('write-start', 'Let your hand learn the shape.', [
        'Listening and singing can help you recognize the alphabet. Writing makes you look closely at where a line begins, which direction it moves, and how a letter is formed.',
        'The aim is a clear, familiar shape. You do not need beautiful handwriting or speed. Use a pencil, an eraser, and lined paper; a guide sheet can help.',
      ]),
      section(
        'write-model',
        'Watch. Trace. Try it yourself.',
        [
          'Watch how the letters are formed, then try them on paper. Trace a letter a few times, copy it, and finally write it without looking. Practice uppercase and lowercase forms.',
        ],
        {
          items: [
            'Trace the shape a few times.',
            'Write it from memory and compare.',
            'Try both uppercase and lowercase.',
            'Add a familiar word: A, a, apple.',
          ],
        },
      ),
      section('write-names', 'Write names that mean something to you.', [
        'Begin with your own name. Names usually start with capital letters. Name order differs between languages and contexts; learn to recognize the forms you will use.',
        'Next, write a few family members’ names and the names of three to five friends. Say each name and spell it letter by letter.',
        'These are words you will use in introductions, reservations, forms, and accounts. Your letters are already doing something useful.',
      ]),
      section(
        'write-materials',
        'Keep it simple.',
        [
          'A pencil makes corrections easy. Lined paper or a beginner’s guide sheet helps you judge size and position. Typing and tapping do not replace this particular handwriting exercise.',
          'Focus on ordinary print letters first. Cursive connects letters in a flowing style, but it is optional and can come later.',
          'Do not rush toward a fixed deadline. Return for short sessions and aim for clear, recognizable forms.',
          'In Practice, you can open Artico’s own printable A–Z, letter tracing, and word writing worksheets. Print at 100% on A4 paper.',
        ],
      ),
    ],
  },
  sounds: {
    title: 'Letters & sounds',
    subtitle: 'What you see and what you hear are connected in different ways.',
    sections: [
      section(
        'sounds-difference',
        'A letter is not a sound.',
        [
          'English has 26 letters. Speech uses a wider set of sound distinctions. Different accents and descriptions group those sounds differently, so there is no single sound count you need to memorize.',
          'The same letter can represent different sounds. Several letters can represent one sound. A written letter can also be silent.',
        ],
        {
          examples: [
            ['know', 'The initial k is normally silent.'],
            ['knife', 'Again, you write k without a separate k sound.'],
          ],
        },
      ),
      section(
        'sounds-listen',
        'Begin by noticing.',
        [
          'Watch this introduction to English sounds. Listen, choose a sound, and try imitating it. You do not need to learn every symbol or pronunciation rule at once.',
        ],
        {
          video: [
            'JwTDPu2TE6k',
            'An introduction to English speech sounds',
            'YouTube / sound introduction',
            0,
          ],
        },
      ),
      section(
        'sounds-ipa',
        'A map for pronunciation.',
        [
          'The International Phonetic Alphabet, or IPA, uses symbols for sounds. Letters such as a, b, and c belong to a writing system; symbols such as /æ/, /ʃ/, and /θ/ describe speech sounds.',
          'A pronunciation entry can help when spelling alone is unclear. For example, /kæt/ shows the sounds in cat.',
          'You can use the map without learning every part of it today.',
        ],
        { link: ['https://www.ipachart.com', 'Explore the interactive IPA chart'] },
      ),
      section('sounds-routine', 'Look. Listen. Try. Return.', [
        'Watch the model, listen carefully, and imitate a short part. Return to a sound or a song when you want another try.',
        'For now, the useful discovery is that English spelling and sound are not a one-to-one match. The next lessons help you practice the movements more deliberately.',
      ]),
    ],
  },
  'tongue-intro': {
    title: 'Why tongue twisters?',
    subtitle: 'Short phrases. Careful movements. Clearer speech.',
    sections: [
      section('tongue-purpose', 'Practice one difficult movement.', [
        'A tongue twister puts similar or difficult sounds close together. That gives your tongue, lips, jaw, and airflow a repeated coordination task.',
        'A short, clear repetition is more useful than racing through a blurred sentence. These exercises support pronunciation; they do not replace listening and conversation.',
      ]),
      section(
        'tongue-contrasts',
        'Let your ear and mouth notice the difference.',
        [
          'Some contrasts may be unfamiliar in your first language. Right and light, road and load, or rice and lice can initially sound or feel alike.',
          'Give the difference time and attention. This course also includes S / SH, TH / F, word endings, consonant clusters, and rhythm.',
        ],
        {
          examples: [
            ['right / light', 'Two different initial sounds.'],
            ['road / load', 'Notice where your tongue goes.'],
            ['rice / lice', 'Keep the contrast clear before speeding up.'],
          ],
        },
      ),
      section(
        'tongue-collection',
        'A small, purposeful collection.',
        [
          'Each phrase has a target. Listen to the existing sample, notice that target, and try the phrase once or twice. You can use Practice to build it in smaller steps.',
        ],
        { widget: 'twisters' },
      ),
      section('tongue-transfer', 'Bring the movement back to everyday words.', [
        'You do not need hundreds of tongue twisters. Return to a few useful patterns and then use their movements in ordinary phrases.',
        'Listen, notice, and try. When you feel comfortable, practice L and R in one short sentence in the next lesson.',
      ]),
    ],
  },
}
export const twisterGuidance = {
  'red-lorry': [
    'Keep R and L distinct.',
    'For L, touch the ridge behind your upper front teeth. For American R, keep the tongue tip from tapping that ridge.',
  ],
  seashells: [
    'Switch between S and SH.',
    'For S, keep a narrow stream of air. For SH, draw the tongue slightly back and round the lips a little.',
  ],
  'free-throws': [
    'Move between TH and F.',
    'For TH, bring the tongue to the teeth. For F, lightly touch the lower lip to the upper teeth.',
  ],
  'peter-piper': [
    'Make a clear P without an extra vowel.',
    'Close the lips and release them. Keep the word ending short and clear.',
  ],
  'big-black-bug': [
    'Keep B and the word endings clear.',
    'Use your voice as the lips open for B. Notice where each final consonant ends.',
  ],
  'two-witches': [
    'Keep W and CH clear through a longer phrase.',
    'Round your lips for W. Release CH as a short stop followed by friction.',
  ],
  'ice-cream': [
    'Connect the consonants in SCR.',
    'Move from S to K and directly into R, without adding a vowel between them.',
  ],
  'slippery-snails': [
    'Join S to L or N.',
    'Pass straight from the S airflow into the next consonant. Keep the cluster together.',
  ],
  'fresh-flesh': [
    'Keep FR and FL distinct.',
    'Move from F into R without a tongue-tip tap; move from F into L with tongue-tip contact.',
  ],
  'betty-botter': [
    'Notice changing vowels and stronger beats.',
    'Give the important words clear stress. Let shorter words fit between them.',
  ],
  woodchuck: [
    'Fit repeated sounds into a steady rhythm.',
    'Notice the stronger content words and let the shorter connecting words stay light.',
  ],
  'unique-new-york': [
    'Move clearly from the end of unique to new.',
    'Keep the K closure, then move into N without inserting an extra vowel.',
  ],
}
