// Local-only pronunciation test loader. The supplied ZIP contains stored MP3
// files, so we can use its recordings without publishing them to GitHub Pages.
// The user selects this ZIP once per device; it is cached only in localStorage.
const STORAGE_KEY = 'artico.ipa-test-audio-zip.v1'

export const ipaTestPaths = {
  p: 'consonants/p.mp3', b: 'consonants/b.mp3', t: 'consonants/t.mp3',
  d: 'consonants/d.mp3', k: 'consonants/k.mp3', g: 'consonants/g.mp3',
  m: 'consonants/m.mp3', n: 'consonants/n.mp3', 'ŋ': 'consonants/eng.mp3',
  'tʃ': 'consonants/tsh.mp3', 'dʒ': 'consonants/dzh.mp3',
  f: 'consonants/f.mp3', v: 'consonants/v.mp3',
  'θ': 'consonants/theta.mp3', 'ð': 'consonants/eth.mp3',
  s: 'consonants/s.mp3', z: 'consonants/z.mp3',
  'ʃ': 'consonants/esh.mp3', 'ʒ': 'consonants/ezh.mp3',
  h: 'consonants/h.mp3', w: 'consonants/w.mp3',
  j: 'consonants/yod.mp3', 'ɹ': 'consonants/r.mp3', l: 'consonants/l.mp3',
  i: 'vowels/i.mp3', 'ɪ': 'vowels/small_i.mp3',
  'eɪ': 'vowels/e_ei.mp3', 'ɛ': 'vowels/epsilon.mp3',
  'æ': 'vowels/ash.mp3', 'ʌ': 'vowels/wedge.mp3',
  'ə': 'vowels/schwa.mp3', u: 'vowels/u.mp3',
  'ʊ': 'vowels/small_u.mp3', 'oʊ': 'vowels/ou.mp3',
  'ɔ': 'vowels/open_o.mp3', 'ɑ': 'vowels/alpha.mp3',
  'aɪ': 'vowels/ai.mp3', 'aʊ': 'vowels/au.mp3', 'ɔɪ': 'vowels/oi.mp3',
  x: 'less-common-sounds/x.mp3',
  'ʔ': 'less-common-sounds/glottal_stop.mp3',
}

// Read ZIP central directory. The test archive's MP3 entries have ZIP method
// 0 (stored); we intentionally do not support compressed or encrypted content.
export function readIpaTestZip(buffer) {
  const view = new DataView(buffer)
  const bytes = new Uint8Array(buffer)
  const length = bytes.length
  let eocd = -1
  for (let i = length - 22; i >= Math.max(0, length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break }
  }
  if (eocd < 0) throw new Error('Not a ZIP archive.')
  const entries = view.getUint16(eocd + 10, true)
  let offset = view.getUint32(eocd + 16, true)
  const decoder = new TextDecoder('utf-8')
  const paths = {}
  for (let i = 0; i < entries; i++) {
    if (offset + 46 > length || view.getUint32(offset, true) !== 0x02014b50) {
      throw new Error('Invalid ZIP directory.')
    }
    const method = view.getUint16(offset + 10, true)
    const flags = view.getUint16(offset + 8, true)
    const compressedLength = view.getUint32(offset + 20, true)
    const filenameLength = view.getUint16(offset + 28, true)
    const extraLength = view.getUint16(offset + 30, true)
    const commentLength = view.getUint16(offset + 32, true)
    const localOffset = view.getUint32(offset + 42, true)
    const name = decoder.decode(bytes.subarray(offset + 46, offset + 46 + filenameLength))
    offset += 46 + filenameLength + extraLength + commentLength
    if (method !== 0 || (flags & 1)) continue
    if (localOffset + 30 > length || view.getUint32(localOffset, true) !== 0x04034b50) continue
    const dataStart = localOffset + 30 + view.getUint16(localOffset + 26, true) + view.getUint16(localOffset + 28, true)
    if (dataStart + compressedLength > length) continue
    if (!name.endsWith('.mp3')) continue
    const relativePath = name.replace(/^vocabulary_ipa_audio\//, '')
    paths[relativePath] = bytes.slice(dataStart, dataStart + compressedLength)
  }
  const objectUrls = {}
  for (const [ipa, path] of Object.entries(ipaTestPaths)) {
    if (!paths[path]) throw new Error(`Missing IPA sample for /${ipa}/: ${path}`)
    objectUrls[ipa] = URL.createObjectURL(new Blob([paths[path]], { type: 'audio/mpeg' }))
  }
  return objectUrls
}

export function discardIpaUrls(urls) {
  for (const url of Object.values(urls || {})) URL.revokeObjectURL(url)
}

export function saveIpaTestZip(buffer) {
  try {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192))
    }
    localStorage.setItem(STORAGE_KEY, btoa(binary))
    return true
  } catch {
    return false // Still playable until page reload when storage is unavailable.
  }
}

export function restoreIpaTestZip() {
  try {
    const encoded = localStorage.getItem(STORAGE_KEY)
    if (!encoded) return null
    const binary = atob(encoded)
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
    return readIpaTestZip(bytes.buffer)
  } catch { return null }
}

export function clearIpaTestZip() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* storage unavailable */ }
}
