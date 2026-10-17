// The web reader and native export use the same L/R lesson and speaking targets.
export const lrChunks = [
  { id: 'twister-lr-0', en: 'Lily', ja: 'リリー' },
  { id: 'twister-lr-1', en: 'really likes', ja: '大好き', instruction: '「大好き」の部分を、ひとかたまりで。' },
  { id: 'twister-lr-2', en: 'red roses', ja: '赤いバラ' },
]
export const lrWhole = {
  id: 'twister-lr-whole', en: 'Lily really likes\nred roses.', ja: 'リリーは赤いバラが大好きです。',
}
export const lrNotes = [
  'Let the tongue tip touch the ridge for L.',
  'Move from R into L without adding an extra vowel.',
  'Keep the R sounds clear and finish the last consonant.',
]
export const lrReading = {
  title: 'L & R, in rhythm.',
  subtitle: 'Clear movements first. A natural rhythm follows.',
  sections: [
    { id: 'lr-notice', title: 'Notice the movement.', art: 'a97bc.svg',
      paragraphs: ['For L, let the tongue tip touch the ridge behind the upper front teeth. For American R, keep it from tapping that ridge. Begin slowly enough to notice the difference.'],
      examples: [[lrWhole.en, 'L /l/ · R /ɹ/']],
    },
    { id: 'lr-parts', title: 'Build it in three parts.',
      paragraphs: ['Make each part clear. Then connect the three parts without adding an extra vowel between consonants.'],
      examples: lrChunks.map((chunk, i) => [chunk.en, lrNotes[i]]),
    },
    { id: 'lr-everyday', title: 'Use it naturally.',
      examples: [['I really like roses.', 'Use the same movements in an everyday sentence.']],
    },
  ],
}
