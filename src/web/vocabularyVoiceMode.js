// Per-device recovery when a browser reports working system speech but stays silent.
export const VOCAB_VOICE_MODE_KEY = 'artico.vocabulary.voice-mode.v1'

export function readVocabularyVoiceMode() {
  try {
    return window.localStorage.getItem(VOCAB_VOICE_MODE_KEY) === 'offline' ? 'offline' : 'auto'
  } catch {
    return 'auto'
  }
}

export function writeVocabularyVoiceMode(mode) {
  try { window.localStorage.setItem(VOCAB_VOICE_MODE_KEY, mode === 'offline' ? 'offline' : 'auto') } catch {}
}
