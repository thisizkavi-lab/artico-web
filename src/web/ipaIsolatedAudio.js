// Direct playback of the IPA audio provided for Artico's prototype.
// Source URLs match vocabulary_ipa_audio/manifest.csv from the supplied ZIP.
// 41 IPA labels; /ʌ/ and /ə/ share the same source recording.
const IPA_AUDIO_ROOT = 'https://cdn.vocabulary.com/media/dictionary/ipa/'
const clips = {
  "p": "consonants/p-1it7yor.mp3",
  "b": "consonants/b-1r9c1qm.mp3",
  "t": "consonants/t-1ygqg9g.mp3",
  "d": "consonants/d-9gcnn8.mp3",
  "k": "consonants/k-19h13fx.mp3",
  "g": "consonants/g-yfu8hw.mp3",
  "m": "consonants/m-guw48u.mp3",
  "n": "consonants/n-1smc314.mp3",
  "ŋ": "consonants/eng-k596t3.mp3",
  "tʃ": "consonants/voiceless_affricate-1athyop.mp3",
  "dʒ": "consonants/voiced_affricate-1f87c12.mp3",
  "f": "consonants/f-1o300yb.mp3",
  "v": "consonants/v-1byjed.mp3",
  "θ": "consonants/theta-ip7r5s.mp3",
  "ð": "consonants/eth-icm6j7.mp3",
  "s": "consonants/s-uozw9d.mp3",
  "z": "consonants/z-4qicum.mp3",
  "ʃ": "consonants/sh-fpj6ik.mp3",
  "ʒ": "consonants/zh-fy90bw.mp3",
  "h": "consonants/h-1mgl9zt.mp3",
  "w": "consonants/w-1dz44nh.mp3",
  "j": "consonants/j-x57k1g.mp3",
  "ɹ": "consonants/r-1xq1912.mp3",
  "l": "consonants/l-1o1w14c.mp3",
  "i": "vowels/i-gvz91l.mp3",
  "ɪ": "vowels/small_cap_i-p6cj9p.mp3",
  "eɪ": "vowels/e-qxx7n8.mp3",
  "ɛ": "vowels/epsilon-yoyztd.mp3",
  "æ": "vowels/ash-qgmo8e.mp3",
  "ʌ": "vowels/mid_central-gqxn5h.mp3",
  "ə": "vowels/mid_central-gqxn5h.mp3",
  "u": "vowels/u-1mr7xyn.mp3",
  "ʊ": "vowels/horseshoe-1inthj0.mp3",
  "oʊ": "vowels/o-c3q2rv.mp3",
  "ɔ": "vowels/open_o-1olavce.mp3",
  "ɑ": "vowels/ah-1f3x3pk.mp3",
  "aɪ": "vowels/ai-vmgin8.mp3",
  "aʊ": "vowels/ow-mmmc8y.mp3",
  "ɔɪ": "vowels/oi-15ych4z.mp3",
  "x": "less-common-sounds/x-1rkf9v4.mp3",
  "ʔ": "less-common-sounds/glottal_stop-f5amoj.mp3"
}

export const ipaIsolatedAudio = Object.fromEntries(
  Object.entries(clips).map(([symbol, filename]) => [symbol, IPA_AUDIO_ROOT + filename])
)
