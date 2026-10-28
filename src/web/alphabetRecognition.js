// A short recognition check, not a score or a test of pronunciation.
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
    const direction = index % 2 === 0 ? 'lower' : 'upper'
    const convert = direction === 'lower' ? value => value.toLowerCase() : value => value.toUpperCase()
    const answer = convert(letter)
    const options = [answer, ...SIMILAR[letter].map(convert)]
    const target = (index + number) % 3
    const choices = [...options.slice(1)]
    choices.splice(target, 0, answer)
    return {
      id: `${number}-${index}-${letter}`,
      shown: direction === 'lower' ? letter : letter.toLowerCase(),
      answer,
      choices,
      direction,
      pair: `${letter} · ${letter.toLowerCase()}`,
    }
  })
}
