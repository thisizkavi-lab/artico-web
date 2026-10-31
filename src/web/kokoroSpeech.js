// Artico's shared, local-first speech player.
// Audio starts instantly with the system voice on old hardware.
// On capable GPUs, natural Kokoro speech is an optional on-demand upgrade.
const MODULE_URL = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js'
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'
const CACHE_LIMIT = 96
const DECODED_LIMIT = 24
const PREFETCH_LIMIT = 3
// Uncached audio should not make the learner wait for expensive inference.
const FIRST_SOUND_BUDGET_MS = 1000

let modelPromise = null
let engine = 'unknown'
let currentAudio = null
let currentSource = null
let audioContext = null
let currentUrl = null
let currentUtterance = null
let nativeStartTimer = null
let nativeRetryTimer = null
let nativeVoicesListener = null
let currentCallbacks = null
let requestId = 0
let runningJobs = false
let jobSequence = 0
let gpuProbe = null
let nativeMode = true
let autoTuneStarted = false
let gpuAdapter = null
let slowClickCount = 0
let fastGenerationObserved = false
let modelReady = false
const clipCache = new Map()
const decodedCache = new Map()
const pendingJobs = new Map()
const jobQueue = []

function hasDeviceVoice() {
  return typeof window !== 'undefined' &&
    Boolean(window.speechSynthesis?.speak && window.SpeechSynthesisUtterance)
}

function probeGpu() {
  if (!gpuProbe) {
    gpuProbe = (async () => {
      if (typeof navigator === 'undefined' || !navigator.gpu || navigator.connection?.saveData) return false
      try {
        const adapter = await navigator.gpu.requestAdapter()
        if (!adapter || adapter.isFallbackAdapter) return false
        gpuAdapter = adapter
        return true
      } catch {
        return false
      }
    })()
  }
  return gpuProbe
}

async function loadKokoro() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const { KokoroTTS } = await import(/* @vite-ignore */ MODULE_URL)
      // Only reached after the learner clicks audio and passes capability checks.
      if (await probeGpu()) {
        try {
          const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
            device: 'webgpu', dtype: 'fp32',
          })
          engine = 'webgpu'
          modelReady = true
          return tts
        } catch (error) {
          console.warn('Artico: WebGPU speech unavailable.', error)
        }
      }
      if (hasDeviceVoice()) {
        nativeMode = true
        throw new Error('WebGPU unavailable; prefer immediate device speech.')
      }
      // Only run CPU inference if the device has no usable system voice.
      const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
        device: 'wasm', dtype: 'q8',
      })
      engine = 'wasm'
      modelReady = true
      return tts
    })().catch((error) => {
      modelPromise = null // Allow a later tap to retry the download.
      engine = 'unknown'
      modelReady = false
      throw error
    })
  }
  return modelPromise
}

// The model must NEVER load on page entry. Probe only after a learner has
// deliberately played audio. Cheap device signals can reject older hardware;
// a short real inference checks the remaining candidates before Kokoro is used.
function tuneKokoroAfterUserAudio() {
  if (autoTuneStarted || typeof window === 'undefined') return
  autoTuneStarted = true
  const memory = Number(navigator.deviceMemory) || 0
  const cores = Number(navigator.hardwareConcurrency) || 0
  const connection = navigator.connection
  if (!navigator.gpu || connection?.saveData ||
      /^(slow-2g|2g|3g)$/.test(connection?.effectiveType || '') ||
      (memory > 0 && memory < 8) || (cores > 0 && cores < 8)) return

  const evaluate = async () => {
    if (document.visibilityState === 'hidden') return
    if (!(await probeGpu())) return
    // Many older laptops advertise WebGPU but only have slow Intel iGPUs.
    // Do not download a large model automatically for those machines.
    const vendor = (gpuAdapter?.info?.vendor || '').toLowerCase()
    if (!vendor || /intel/i.test(vendor)) return
    try {
      const tts = await loadKokoro()
      const started = performance.now()
      const result = await tts.generate('Hello.', { voice: 'af_heart' })
      const elapsed = performance.now() - started
      if (elapsed > FIRST_SOUND_BUDGET_MS) {
        nativeMode = true
        return
      }
      cachePut(clipCache, CACHE_LIMIT, clipKey('af_heart', 'Hello.'), result.toBlob())
      fastGenerationObserved = true
      nativeMode = false
    } catch (error) {
      nativeMode = true
      console.warn('Artico: automatic natural voice unavailable; staying with fast voice.', error)
    }
  }
  const defer = () => {
    if ('requestIdleCallback' in window)
      window.requestIdleCallback(() => { void evaluate() })
    else window.setTimeout(() => { void evaluate() }, 600)
  }
  // The first audio response starts immediately; only then may model
  // initialization run during idle time on promising hardware.
  defer()
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
    // Enqueue only on actual click, or prefetch after a proven fast GPU.
    const tts = await loadKokoro()
    while (jobQueue.length) {
      jobQueue.sort((a, b) => b.priority - a.priority || a.sequence - b.sequence)
      const job = jobQueue.shift()
      if (nativeMode && job.priority === 0) {
        pendingJobs.delete(job.key)
        job.reject(new Error('Prefetch skipped in fast-speech mode.'))
        continue
      }
      try {
        const start = performance.now()
        const result = await tts.generate(job.text, { voice: job.voice })
        if (job.text.length <= 100 && performance.now() - start <= FIRST_SOUND_BUDGET_MS) fastGenerationObserved = true
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
  if (typeof window === 'undefined' || nativeMode || !modelReady || !fastGenerationObserved || navigator.connection?.saveData) return
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

function clearNativeTimers() {
  if (nativeStartTimer !== null) clearTimeout(nativeStartTimer)
  if (nativeRetryTimer !== null) clearTimeout(nativeRetryTimer)
  nativeStartTimer = null
  nativeRetryTimer = null
  if (nativeVoicesListener && typeof window !== 'undefined') {
    window.speechSynthesis?.removeEventListener?.('voiceschanged', nativeVoicesListener)
    nativeVoicesListener = null
  }
}

export function stopKokoroSpeech() {
  requestId += 1
  const callbacks = currentCallbacks
  currentCallbacks = null
  clearAudio()
  clearNativeTimers()
  const utterance = currentUtterance
  currentUtterance = null
  if (utterance) {
    utterance.onstart = null
    utterance.onboundary = null
    utterance.onend = null
    utterance.onerror = null
    // Do NOT call cancel() on first click: some browser engines leave the
    // freshly enqueued utterance silent after cancel() + speak() in one tick.
    try { window.speechSynthesis?.cancel() } catch {}
  }
  callbacks?.onCancel?.()
}

function fallbackSpeech(text, rate, callbacks) {
  const synth = window.speechSynthesis
  if (!synth?.speak || !window.SpeechSynthesisUtterance) {
    callbacks.onError?.(new Error('No browser speech engine is available.'))
    return false
  }
  callbacks.onLoading?.()
  // The first call must stay inside the original user click (autoplay rules).
  // The second attempt runs only when the browser did not start speaking.
  const MAX_ATTEMPTS = 3
  const START_TIMEOUT_MS = 1900
  const cleanUtterance = (utterance) => {
    utterance.onstart = null
    utterance.onboundary = null
    utterance.onend = null
    utterance.onerror = null
  }
  function finish(utterance, success, error) {
    if (currentUtterance !== utterance) return
    clearNativeTimers()
    cleanUtterance(utterance)
    currentUtterance = null
    currentCallbacks = null
    if (success) callbacks.onEnd?.()
    else callbacks.onError?.(error || new Error('The browser did not start speaking.'))
  }
  function scheduleRetry(utterance, attempt) {
    if (currentUtterance !== utterance) return
    clearNativeTimers()
    cleanUtterance(utterance)
    if (attempt >= MAX_ATTEMPTS) {
      finish(utterance, false, new Error('No voice started. Check that English speech voices are installed.'))
      return
    }
    // Clear a stalled native queue before retrying. A brief gap matters on
    // Chrome/Windows; never do cancel() immediately before the next speak().
    try { synth.cancel() } catch {}
    nativeRetryTimer = setTimeout(() => {
      nativeRetryTimer = null
      if (currentUtterance === utterance) startAttempt(attempt + 1)
    }, 120)
  }
  function startAttempt(attempt) {
    if (currentCallbacks !== callbacks) return
    const utterance = new window.SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.volume = 1
    let voices = []
    try { voices = synth.getVoices?.() || [] } catch {}
    const localUS = voices.filter(v => /^en[-_]US$/i.test(v.lang) && v.localService)
    const allUS = voices.filter(v => /^en[-_]US$/i.test(v.lang))
    const english = voices.filter(v => /^en(?:[-_]|$)/i.test(v.lang))
    const choices = [...new Set([...localUS, ...allUS, ...english])]
    // On retry, try another English voice; finally let the OS pick its default.
    const selected = attempt === MAX_ATTEMPTS ? null : choices[attempt - 1] || null
    if (selected) utterance.voice = selected
    currentUtterance = utterance
    let started = false
    const confirmStart = () => {
      if (currentUtterance !== utterance || started) return
      started = true
      clearNativeTimers()
      callbacks.onStart?.('device')
    }
    utterance.onstart = confirmStart
    utterance.onboundary = confirmStart
    utterance.onend = () => {
      if (!started) confirmStart()
      finish(utterance, true)
    }
    utterance.onerror = (event) => {
      if (currentUtterance !== utterance) return
      if (started || event?.error === 'not-allowed') finish(utterance, false, event)
      else scheduleRetry(utterance, attempt)
    }
    if (!voices.length && typeof synth.addEventListener === 'function') {
      nativeVoicesListener = () => {
        if (currentUtterance === utterance && !started) scheduleRetry(utterance, attempt)
      }
      synth.addEventListener('voiceschanged', nativeVoicesListener)
    }
    try {
      if (synth.paused) synth.resume?.()
      synth.speak(utterance)
    } catch (error) {
      scheduleRetry(utterance, attempt)
      return
    }
    nativeStartTimer = setTimeout(() => {
      if (currentUtterance === utterance && !started) scheduleRetry(utterance, attempt)
    }, START_TIMEOUT_MS)
  }
  startAttempt(1)
  return true
}

export async function speakKokoroSpeech(text, options = {}) {
  const phrase = String(text ?? '').trim()
  if (!phrase || typeof window === 'undefined') return false

  const { voice = 'af_heart', rate = 1, preferDevice = false, ...callbacks } = options
  stopKokoroSpeech()
  const key = clipKey(voice, phrase)
  const cached = clipCache.has(key)
  // A saved Kokoro clip is instantaneous even on old hardware. For an
  // uncached phrase, let a slow machine use its native voice immediately.
  if ((preferDevice || (nativeMode && !cached) ||
      (!navigator.gpu && !cached)) && hasDeviceVoice()) {
    const nativeCallbacks = {
      ...callbacks,
      onStart: (source) => {
        callbacks.onStart?.(source)
        // Only start GPU probing after audible speech actually begins.
        if (!preferDevice) tuneKokoroAfterUserAudio()
      },
    }
    currentCallbacks = nativeCallbacks
    return fallbackSpeech(phrase, rate, nativeCallbacks)
  }
  const context = unlockAudio()
  const mine = requestId
  const started = performance.now()
  currentCallbacks = callbacks
  callbacks.onLoading?.()

  try {
    let blob = clipCache.get(key)
    if (!blob && hasDeviceVoice()) {
      // Keep generation running to fill the cache, but switch to instant
      // device pronunciation rather than trapping the learner in a spinner.
      const generated = getClip(phrase, voice, 2)
      const outcome = await Promise.race([
        generated.then(value => ({ blob: value })),
        new Promise(resolve => setTimeout(() => resolve({ delayed: true }), FIRST_SOUND_BUDGET_MS)),
      ])
      if (mine !== requestId) return false
      if (outcome.delayed) {
        // A first-time model download is not evidence of slow hardware.
        // Only classify warmed-up inference on short expressions.
        if (modelReady && phrase.length <= 100) slowClickCount += 1
        if (slowClickCount >= 2) nativeMode = true
        return fallbackSpeech(phrase, rate, callbacks)
      }
      blob = outcome.blob
    } else if (!blob) {
      blob = await getClip(phrase, voice, 2)
    }
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
