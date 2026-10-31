// Artico's shared, local-first speech player.
// Prefer GPU inference on compatible browsers. CPU/WASM remains a fallback.
// Cache clips and prepare the next words while the learner listens.
const MODULE_URL = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js'
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'
const CACHE_LIMIT = 96
const DECODED_LIMIT = 24
const PREFETCH_LIMIT = 3

let modelPromise = null
let engine = 'unknown'
let currentAudio = null
let currentSource = null
let audioContext = null
let currentUrl = null
let currentUtterance = null
let currentCallbacks = null
let requestId = 0
let runningJobs = false
let jobSequence = 0
const clipCache = new Map()
const decodedCache = new Map()
const pendingJobs = new Map()
const jobQueue = []

async function loadKokoro() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const { KokoroTTS } = await import(/* @vite-ignore */ MODULE_URL)
      // GPU inference is much faster for uncached expressions. It requires
      // a larger one-time model download than CPU q8.
      if (typeof navigator !== 'undefined' && navigator.gpu && !navigator.connection?.saveData) {
        let adapter = null
        try { adapter = await navigator.gpu.requestAdapter() } catch { /* no usable adapter */ }
        if (adapter) {
          try {
            const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
              device: 'webgpu', dtype: 'fp32',
            })
            engine = 'webgpu'
            return tts
          } catch (error) {
            console.warn('Artico: GPU speech unavailable; using CPU.', error)
          }
        }
      }
      const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
        device: 'wasm', dtype: 'q8',
      })
      engine = 'wasm'
      return tts
    })().catch((error) => {
      modelPromise = null // Allow a later tap to retry the download.
      engine = 'unknown'
      throw error
    })
  }
  return modelPromise
}

// Model loading begins on vocabulary/lesson entry, not on the first speaker tap.
// Call this when a lesson is displayed, not on the landing page.
export function warmKokoroSpeech() {
  if (typeof window !== 'undefined' && !navigator.connection?.saveData) {
    void loadKokoro().catch(() => {})
  }
}

function cachePut(cache, limit, key, value) {
  cache.delete(key)
  cache.set(key, value)
  if (cache.size > limit) cache.delete(cache.keys().next().value)
}

function clipKey(voice, text) {
  return voice + ':' + text.trim()
}

async function processJobs() {
  if (runningJobs) return
  runningJobs = true
  try {
    // Wait for initialization before selecting a job. A user click arriving
    // during startup can then jump ahead of background prefetch jobs.
    const tts = await loadKokoro()
    while (jobQueue.length) {
      jobQueue.sort((a, b) => b.priority - a.priority || a.sequence - b.sequence)
      const job = jobQueue.shift()
      try {
        const result = await tts.generate(job.text, { voice: job.voice })
        const blob = result.toBlob()
        cachePut(clipCache, CACHE_LIMIT, job.key, blob)
        job.resolve(blob)
      } catch (error) {
        job.reject(error)
      } finally {
        pendingJobs.delete(job.key)
      }
    }
  } catch (error) {
    // Fail all queued jobs if the model cannot load. Individual play actions
    // will fall back to the device's speech synthesis.
    for (const job of jobQueue.splice(0)) {
      pendingJobs.delete(job.key)
      job.reject(error)
    }
  } finally {
    runningJobs = false
    if (jobQueue.length) void processJobs()
  }
}

function getClip(text, voice, priority = 1) {
  const key = clipKey(voice, text)
  if (clipCache.has(key)) {
    const cached = clipCache.get(key)
    cachePut(clipCache, CACHE_LIMIT, key, cached)
    return Promise.resolve(cached)
  }
  const existing = pendingJobs.get(key)
  if (existing) {
    existing.priority = Math.max(existing.priority, priority)
    return existing.promise
  }
  const job = { key, text, voice, priority, sequence: jobSequence++ }
  job.promise = new Promise((resolve, reject) => {
    job.resolve = resolve
    job.reject = reject
  })
  pendingJobs.set(key, job)
  jobQueue.push(job)
  void processJobs()
  return job.promise
}

// Prepare at most a few likely next phrases. Playback requests have higher
// priority and can jump in front of queued prefetch jobs.
export function prefetchKokoroSpeech(texts, { voice = 'af_heart' } = {}) {
  if (typeof window === 'undefined' || navigator.connection?.saveData) return
  const phrases = [...new Set((Array.isArray(texts) ? texts : [texts])
    .filter((text) => typeof text === 'string' && text.trim())
    .map((text) => text.trim()))].slice(0, PREFETCH_LIMIT)
  for (const phrase of phrases) {
    const key = clipKey(voice, phrase)
    if (clipCache.has(key) || pendingJobs.has(key)) continue
    // Avoid flooding the queue as the user moves the mouse through many cards.
    if (jobQueue.filter((job) => job.priority === 0).length >= PREFETCH_LIMIT) break
    void getClip(phrase, voice, 0).catch(() => {})
  }
}

function unlockAudio() {
  try {
    const Context = window.AudioContext || window.webkitAudioContext
    if (!Context) return null
    if (!audioContext) audioContext = new Context()
    // Resume within the original click gesture, before asynchronous inference.
    if (audioContext.state === 'suspended') void audioContext.resume().catch(() => {})
    return audioContext
  } catch {
    return null
  }
}

function clearAudio() {
  if (currentSource) {
    currentSource.onended = null
    try { currentSource.stop() } catch { /* already stopped */ }
    currentSource.disconnect()
    currentSource = null
  }
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

function fallbackSpeech(text, rate, callbacks) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    callbacks.onError?.(new Error('Speech synthesis is unavailable on this device.'))
    return false
  }
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  const voice = window.speechSynthesis.getVoices().find((item) => /^en[-_]US$/i.test(item.lang))
  if (voice) utterance.voice = voice
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

export async function speakKokoroSpeech(text, options = {}) {
  const phrase = String(text ?? '').trim()
  if (!phrase || typeof window === 'undefined') return false

  const { voice = 'af_heart', rate = 1, ...callbacks } = options
  stopKokoroSpeech()
  const context = unlockAudio()
  const mine = requestId
  const key = clipKey(voice, phrase)
  const cached = clipCache.has(key)
  const started = performance.now()
  currentCallbacks = callbacks
  callbacks.onLoading?.()

  try {
    const blob = await getClip(phrase, voice, 2)
    if (mine !== requestId) return false
    if (context) {
      let buffer = decodedCache.get(key)
      if (!buffer) {
        buffer = await context.decodeAudioData(await blob.arrayBuffer())
        cachePut(decodedCache, DECODED_LIMIT, key, buffer)
      }
      if (mine !== requestId) return false
      await context.resume()
      if (mine !== requestId) return false
      const source = context.createBufferSource()
      source.buffer = buffer
      source.playbackRate.value = rate
      source.connect(context.destination)
      currentSource = source
      source.onended = () => {
        if (mine !== requestId) return
        clearAudio()
        currentCallbacks = null
        callbacks.onEnd?.()
      }
      source.start()
    } else {
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
    }
    // Useful for inspecting actual device latency without logging every click.
    if (typeof window.CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('artico:voice-latency', {
        detail: { ms: Math.round(performance.now() - started), cached, engine },
      }))
    }
    callbacks.onStart?.('kokoro')
    return true
  } catch (error) {
    if (mine !== requestId) return false
    clearAudio()
    console.warn('Artico: local speech unavailable; trying device voice.', error)
    return fallbackSpeech(phrase, rate, callbacks)
  }
}
