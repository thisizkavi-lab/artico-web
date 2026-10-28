// Pilot only: direct links to University of Hamburg's publicly accessible
// American English phoneme recordings. No files are copied into Artico.
// Source: https://englishexplorations.check.uni-hamburg.de/basic-concepts-of-english-phonetics-and-pronunciation/
// The university lists the first (July 2019) vowel recording as American,
// and the second (April 2019) as Irish. These are not licensed Artico assets.
export const HAMBURG_SOURCE = 'https://englishexplorations.check.uni-hamburg.de/basic-concepts-of-english-phonetics-and-pronunciation/'
const MEDIA_ROOT = 'https://englishexplorations.check.uni-hamburg.de/wp-content/uploads/2019/07/'

export const hamburgAmericanSamples = [
  { ipa: 'p', example: 'play', file: 'p.mp3', category: 'consonant' },
  { ipa: 'θ', example: 'thing', file: 'thing.mp3', category: 'consonant' },
  { ipa: 'ʃ', example: 'sure', file: 'sh.mp3', category: 'consonant' },
  { ipa: 'ɹ', example: 'read', file: 'r.mp3', category: 'consonant' },
  { ipa: 'i', example: 'sea', file: 'i.mp3', category: 'vowel' },
  { ipa: 'ɪ', example: 'sit', file: 'sit.mp3', category: 'vowel' },
  { ipa: 'æ', example: 'mad', file: 'ae.mp3', category: 'vowel' },
  { ipa: 'ə', example: 'about', file: 'schwa.mp3', category: 'vowel' },
  { ipa: 'eɪ', example: 'name', file: 'ei.mp3', category: 'vowel glide' },
  { ipa: 'aʊ', example: 'now', file: 'au.mp3', category: 'vowel glide' },
].map(item => ({ ...item, url: MEDIA_ROOT + item.file }))
