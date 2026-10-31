// One shared audio lane for Artico's locally generated speech.
// Kokoro is loaded only when a learner first presses a speaker button.
// Generation happens in the learner's browser; no text is sent to our server.
const MODULE_URL = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js'
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'
const CACHE_LIMIT = 32

let modelPromise = null
let generationQueue = Promise.resolve()
let currentAudio = null
let currentUrl = null
let currentUtterance = null
let currentCallbacks = null
let requestId = 0
const clipCache = new Map()

async function loadKokoro() {
  if (!modelPromise) {
    modelPromise = import(/* @vite-ignore */ MODULE_URL)
      .then(({ KokoroTTS }) => KokoroTTS.from_pretrained(MODEL_ID, {
        dtype: 'q8',
        device: 'wasm',
      }))
      .catch((error) => {
        modelPromise = null // A later click may retry a failed download.
        throw error
      })
  }
  return modelPromise
}

function clearAudio() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.onended = null
    currentAudio.onerror = null
    currentAudio.removeAttribute('src')
    currentAudio = null
  }
  if (currentUrl) {
    URL.revokeObjectURL(currentUrl)
    currentUrl = null
  }
}

export function stopKokoroSpeech() {
  requestId += 1
  const callbacks = currentCallbacks
  currentCallbacks = null
  clearAudio()
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  currentUtterance = null
  callbacks?.onCancel?.()
}

function storeClip(key, blob) {
  if (clipCache.has(key)) clipCache.delete(key)
  clipCache.set(key, blob)
  if (clipCache.size > CACHE_LIMIT) clipCache.delete(clipCache.keys().next().value)
}

function fallbackSpeech(text, rate, callbacks) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    callbacks.onError?.(new Error('Speech synthesis is unavailable on this device.'))
    return false
  }
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  const voices = window.speechSynthesis.getVoices()
  const american = voices.find((voice) => /^en[-_]US$/i.test(voice.lang))
  if (american) utterance.voice = american
  currentUtterance = utterance
  utterance.onend = () => {
    if (currentUtterance !== utterance) return
    currentUtterance = null
    currentCallbacks = null
    callbacks.onEnd?.()
  }
  utterance.onerror = (error) => {
    if (currentUtterance !== utterance) return
    currentUtterance = null
    currentCallbacks = null
    callbacks.onError?.(error)
  }
  window.speechSynthesis.speak(utterance)
  callbacks.onStart?.('device')
  return true
}

/**
 * Play American English with Kokoro (on-device after first download).
 * Falls back to the device voice when Kokoro cannot initialize.
 * Callbacks: onLoading, onStart(engine), onEnd, onCancel, onError.
 */
export async function speakKokoroSpeech(text, options = {}) {
  const phrase = String(text ?? '').trim()
  if (!phrase || typeof window === 'undefined') return false

  const { voice = 'af_heart', rate = 1, ...callbacks } = options
  stopKokoroSpeech()
  const mine = requestId
  currentCallbacks = callbacks
  callbacks.onLoading?.()

  try {
    const cacheKey = voice + ':' + phrase
    let blob = clipCache.get(cacheKey)
    if (!blob) {
      const tts = await loadKokoro()
      if (mine !== requestId) return false
      // Keep inference sequential to avoid competing for the same WASM session.
      const next = generationQueue.catch(() => {}).then(() => tts.generate(phrase, { voice }))
      generationQueue = next
      const result = await next
      if (mine !== requestId) return false
      blob = result.toBlob()
      storeClip(cacheKey, blob)
    }
    if (mine !== requestId) return false
    currentUrl = URL.createObjectURL(blob)
    const audio = new Audio(currentUrl)
    currentAudio = audio
    audio.playbackRate = rate
    audio.preservesPitch = true
    audio.onended = () => {
      if (mine !== requestId) return
      clearAudio()
      currentCallbacks = null
      callbacks.onEnd?.()
    }
    audio.onerror = () => {
      if (mine !== requestId) return
      clearAudio()
      currentCallbacks = null
      callbacks.onError?.(new Error('Could not play generated audio.'))
    }
    await audio.play()
    if (mine !== requestId) return false
    callbacks.onStart?.('kokoro')
    return true
  } catch (error) {
    if (mine !== requestId) return false
    clearAudio()
    console.warn('Artico: Kokoro unavailable; using device speech.', error)
    return fallbackSpeech(phrase, rate, callbacks)
  }
}
