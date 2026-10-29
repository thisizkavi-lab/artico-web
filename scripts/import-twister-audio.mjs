// One-time, offline import of already generated audio. Never calls a synthesis API.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const input = process.argv[2]
assert(input, 'Usage: node scripts/import-twister-audio.mjs /absolute/path/to/completed-review-bundle')
const folder = resolve(input)
const candidate = JSON.parse(readFileSync(join(folder, 'candidate-audio-manifest.json'), 'utf8'))
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
assert.equal(candidate.bundleId, 'ga-v01')
assert.equal(Object.keys(candidate.cards).length, 24)
assert.equal(Object.keys(candidate.assets).length, 267)
assert.equal(candidate.missing.length, 0)

const assets = {}
for (const [id, asset] of Object.entries(candidate.assets)) {
  assert.match(asset.path, /^media\/mp3\/tt-[a-z0-9-]+\.mp3$/)
  assert.match(asset.plannedPublishedPath, /^audio\/tongue-twisters\/ga-v01\/tt-[a-z0-9-]+\.mp3$/)
  assert.equal(asset.status, 'generated-unreviewed')
  assert.equal(asset.review.technical, 'pass')
  assert.equal(digest(asset.text), asset.textSha256)
  const bytes = readFileSync(join(folder, asset.path))
  assert.equal(bytes.length, asset.bytes)
  assert.equal(digest(bytes), asset.sha256)
  const destination = join(root, 'public', asset.plannedPublishedPath)
  mkdirSync(dirname(destination), { recursive: true })
  if (existsSync(destination)) assert.equal(digest(readFileSync(destination)), asset.sha256)
  else copyFileSync(join(folder, asset.path), destination)
  assets[id] = {
    path: asset.plannedPublishedPath, text: asset.text, delivery: asset.delivery,
    textSha256: asset.textSha256, promptSha256: asset.promptSha256,
    sha256: asset.sha256, bytes: asset.bytes, durationSeconds: asset.durationSeconds,
    status: asset.status, review: asset.review,
  }
}

const manifest = {
  schemaVersion: 1, bundleId: candidate.bundleId,
  // The user requested integration of the generated set. Do not invent listening approval.
  releaseStatus: 'generated-audio', model: candidate.model, voice: candidate.voice,
  language: 'en-US', sourceRevision: candidate.sourceRevision,
  courseFingerprint: candidate.courseFingerprint,
  jobSetSha256: candidate.migratedJobSetSha256, generatedAt: candidate.generatedAt,
  listeningReview: 'pending', cards: candidate.cards, assets,
}
writeFileSync(join(root, 'src/web/twisterAudioManifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Imported ${Object.keys(assets).length} verified MP3s; listening review remains pending.`)
