// Vocabulary uses Kokoro by default. Device speech remains a manual fallback
// for learners who prefer speed or cannot load the model on their hardware.
export const VOCAB_VOICE_MODE_KEY = 'artico.vocabulary.voice-mode.v1'

export function readVocabularyVoiceMode() {
  try {
    // Migrate earlier "auto"/"offline" choices to Kokoro after the trial.
    return window.localStorage.getItem(VOCAB_VOICE_MODE_KEY) === 'device' ? 'device' : 'kokoro'
  } catch {
    return 'kokoro'
  }
}

export function writeVocabularyVoiceMode(mode) {
  try {
    window.localStorage.setItem(VOCAB_VOICE_MODE_KEY, mode === 'device' ? 'device' : 'kokoro')
  } catch {}
}
