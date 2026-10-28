export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const WORDS = {
  A: ['apple', 'ant', 'airplane'],
  B: ['ball', 'bird', 'banana'],
  C: ['cat', 'car', 'cup'],
  D: ['dog', 'duck', 'door'],
  E: ['egg', 'elephant', 'ear'],
  F: ['fish', 'frog', 'flower'],
  G: ['goat', 'grape', 'guitar'],
  H: ['hat', 'house', 'hand'],
  I: ['igloo', 'insect', 'ink'],
  J: ['jam', 'jar', 'juice'],
  K: ['kite', 'key', 'king'],
  L: ['lion', 'leaf', 'lamp'],
  M: ['moon', 'mouse', 'milk'],
  N: ['nest', 'nose', 'net'],
  O: ['orange', 'owl', 'octopus'],
  P: ['pen', 'pig', 'pizza'],
  Q: ['queen', 'quilt', 'quiz'],
  R: ['rabbit', 'rain', 'robot'],
  S: ['sun', 'sock', 'star'],
  T: ['tree', 'tiger', 'turtle'],
  U: ['umbrella', 'uncle', 'up'],
  V: ['van', 'vase', 'violin'],
  W: ['whale', 'window', 'watch'],
  X: ['x-ray', 'xylophone', 'box'],
  Y: ['yak', 'yo-yo', 'yarn'],
  Z: ['zebra', 'zero', 'zipper'],
}

export const worksheetName = (type, letter) => {
  if (type === 'overview') return '00_Alphabet_A-Z_Uppercase_and_Lowercase.pdf'
  if (type === 'upper') return '00A_Alphabet_A-Z_Capitals.pdf'
  if (type === 'lower') return '00B_Alphabet_a-z_Small_Letters.pdf'
  if (type === 'trace' && LETTERS.includes(letter)) return `Letter_${letter}_Trace.pdf`
  if (type === 'words' && LETTERS.includes(letter)) return `Words_${letter}_Write.pdf`
  if (type === 'complete') return 'Artico_Complete_Handwriting_Workbook.pdf'
  if (type === 'tracing-book') return 'Artico_Letter_Tracing_Book_A-Z.pdf'
  if (type === 'word-book') return 'Artico_Word_Writing_Book_A-Z.pdf'
  if (type === 'zip') return 'Artico_Handwriting_PDF_Collection.zip'
  return null
}
