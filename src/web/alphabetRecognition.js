// Short recognition checks: one visual letter or one letter name spoken aloud.
// Each group of three rounds covers all 26 letters, with four repeated.
const ORDER = 'BDPQGAELIMNUVWYRSCO TFHJKXZ'.replace(/\s/g, '').split('')
const SIMILAR = {
  A: ['H', 'V'], B: ['D', 'P'], C: ['G', 'O'], D: ['B', 'P'],
  E: ['F', 'C'], F: ['E', 'T'], G: ['Q', 'C'], H: ['N', 'A'],
  I: ['L', 'J'], J: ['I', 'L'], K: ['R', 'H'], L: ['I', 'T'],
  M: ['N', 'W'], N: ['M', 'H'], O: ['Q', 'C'], P: ['B', 'R'],
  Q: ['O', 'G'], R: ['P', 'K'], S: ['C', 'Z'], T: ['F', 'I'],
  U: ['V', 'N'], V: ['U', 'Y'], W: ['M', 'V'], X: ['Y', 'K'],
  Y: ['V', 'X'], Z: ['S', 'N'],
}
export const LETTERS_PER_CHECK = 10
export function makeAlphabetRecognitionCards(round = 0) {
  const number = Number.isSafeInteger(round) && round >= 0 ? round : 0
  return Array.from({ length: LETTERS_PER_CHECK }, (_, index) => {
    const letter = ORDER[(number * LETTERS_PER_CHECK + index) % ORDER.length]
    const media = index % 3 === 2 ? 'audio' : 'visual'
    // Audio questions test the spoken letter name, not letter case.
    const direction = media === 'audio' ? 'upper' : index % 2 === 0 ? 'lower' : 'upper'
    const convert = direction === 'lower' ? value => value.toLowerCase() : value => value.toUpperCase()
    const answer = convert(letter)
    const distractors = SIMILAR[letter].map(convert)
    const target = (index + number) % 3
    const choices = [...distractors]
    choices.splice(target, 0, answer)
    return {
      id: `${number}-${index}-${letter}`,
      letter,
      media,
      // Never render a visible letter on an audio-only card.
      shown: media === 'visual' ? (direction === 'lower' ? letter : letter.toLowerCase()) : null,
      answer,
      choices,
      direction,
      pair: `${letter} · ${letter.toLowerCase()}`,
    }
  })
}
