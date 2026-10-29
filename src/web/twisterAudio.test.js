import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { createTwisterAudioResolver } from './twisterAudioResolver.js'
import { twisterCards, twisterAudioSource, twisterAudioGroups } from './twisterCollection.js'

const manifest = JSON.parse(readFileSync(new URL('./twisterAudioManifest.json', import.meta.url)))
const publicRoot = new URL('../../public/', import.meta.url)
const hash = input => createHash('sha256').update(input).digest('hex')
const audio = createTwisterAudioResolver(manifest, '/artico-web/')

test('all 24 teaching cards, Japanese explanations, levels and exact build steps are unchanged', () => {
  assert.equal(twisterCards.length, 24)
  // Semantic snapshot taken from main 12f3d4b before audio-only integration.
  assert.equal(hash(JSON.stringify(twisterCards)), 'ac74c2c29fa25fc9160149847418234c7aa1c17298c9acaa768f295fc35dfef7')
})

test('all 267 published MP3s match real bytes, hashes, exact texts and honest review status', () => {
  assert.equal(Object.keys(manifest.assets).length, 267)
  assert.equal(manifest.listeningReview, 'pending')
  assert.equal(manifest.model, 'gemini-3.8-flash-tts')
  const paths = new Set()
  for (const [id, asset] of Object.entries(manifest.assets)) {
    assert.match(asset.path, /^audio\/tongue-twisters\/ga-v01\/tt-[a-z0-9-]+\.mp3$/, id)
    const bytes = readFileSync(new URL(asset.path, publicRoot))
    assert.equal(bytes.length, asset.bytes, id)
    assert.equal(hash(bytes), asset.sha256, id)
    assert.equal(hash(asset.text), asset.textSha256, id)
    assert.match(asset.promptSha256, /^[a-f0-9]{64}$/, id)
    assert.ok(bytes.length > 1000, id)
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 255 && (bytes[1] & 224) === 224), id)
    assert.ok(Number.isFinite(asset.durationSeconds) && asset.durationSeconds > 0, id)
    assert.equal(asset.status, 'generated-unreviewed', id)
    assert.equal(asset.review.technical, 'pass', id)
    for (const field of ['transcript', 'phonetic', 'voiceConsistency']) assert.equal(asset.review[field], 'pending', id)
    assert.equal(asset.review.reviewer, null, id)
    assert.equal(asset.review.reviewedAt, null, id)
    paths.add(asset.path)
  }
  assert.equal(paths.size, 267)
  assert.equal(readdirSync(new URL('audio/tongue-twisters/ga-v01/', publicRoot)).filter(file => file.endsWith('.mp3')).length, 267)
  assert.doesNotMatch(JSON.stringify(manifest), /access_token|refresh_token|projectId|sourceWavPath|Bearer |\.private\//)
})

test('every Study, careful step, final-natural, focus and transfer binding resolves to its exact text', () => {
  let steps = 0, focus = 0, transfers = 0, aliases = 0
  const used = new Set()
  for (const card of twisterCards) {
    const study = audio.clip(card)
    assert.equal(study.text, card.phrase, card.id)
    assert.equal(study.delivery, 'natural', card.id)
    used.add(study.assetId)
    for (let step = 0; step < card.buildSteps.length; step++) {
      const clip = audio.clip(card, { kind: 'practice', step })
      assert.equal(clip.text, card.buildSteps[step], `${card.id} step ${step}`)
      assert.equal(clip.delivery, 'careful')
      assert.notEqual(clip.assetId, study.assetId)
      used.add(clip.assetId)
      steps++
    }
    assert.deepEqual(audio.clip(card, { kind: 'practice', step: card.buildSteps.length - 1, delivery: 'natural' }), study)
    const groups = audio.groups(card)
    groups.focusUnits.forEach((unit, index) => {
      const clip = audio.clip(card, { kind: 'focus', index })
      assert.equal(clip.text, unit.text)
      assert.equal(clip.delivery, 'careful')
      if (unit.reusesExistingStep) {
        assert.ok(manifest.cards[card.id].practiceStepAssetIds.includes(clip.assetId))
        aliases++
      }
      used.add(clip.assetId)
      focus++
    })
    groups.transfer.forEach((unit, index) => {
      const clip = audio.clip(card, { kind: 'transfer', index })
      assert.equal(clip.text, card.transfer[index])
      assert.equal(clip.text, unit.text)
      assert.equal(clip.delivery, 'natural')
      used.add(clip.assetId)
      transfers++
    })
    assert.ok(twisterAudioSource(card))
    assert.deepEqual(twisterAudioGroups(card), groups)
  }
  assert.deepEqual({ steps, focus, transfers, aliases, files: used.size }, { steps: 92, focus: 118, transfers: 48, aliases: 15, files: 267 })
})

test('development and GitHub Pages URL bases resolve without hardcoded hosts or root audio paths', () => {
  const card = twisterCards[0]
  const dev = createTwisterAudioResolver(manifest, '/')
  assert.match(dev.source(card), /^\/audio\/tongue-twisters\/ga-v01\//)
  assert.match(audio.source(card), /^\/artico-web\/audio\/tongue-twisters\/ga-v01\//)
  assert.equal(audio.source(card, 0), audio.clip(card, { kind: 'practice', step: 0 }).src)
  assert.throws(() => createTwisterAudioResolver(manifest, '/artico-web'))
})

test('stale card data, wrong indices and non-final natural selections never fall back to a different recording', () => {
  const card = twisterCards[0]
  for (const changed of [
    { ...card, id: 'missing' }, { ...card, number: '02' }, { ...card, phrase: 'Changed.' },
    { ...card, buildSteps: ['Changed.', ...card.buildSteps.slice(1)] }, { ...card, transfer: ['Changed.'] },
  ]) {
    assert.equal(audio.source(changed), null)
    assert.deepEqual(audio.groups(changed), { focusUnits: [], transfer: [] })
  }
  for (const kind of ['practice', 'focus', 'transfer']) for (const index of [-1, 1.5, '0', 1000]) {
    assert.equal(audio.clip(card, { kind, step: index, index }), null)
  }
  assert.equal(audio.clip(card, { kind: 'practice', step: 0, delivery: 'natural' }), null)
  assert.equal(audio.clip(card, { kind: 'practice', step: 0, delivery: 'fast' }), null)
  assert.equal(audio.clip(card, { kind: 'unknown' }), null)
  assert.equal(audio.clip(card, null), null)
})

test('missing, rejected, unverified, unsafe or mismatched metadata is not playable', () => {
  const card = twisterCards[0]
  const id = manifest.cards[card.id].studyFullAssetId
  for (const patch of [
    { status: 'output-rejected' }, { text: 'Different words.' }, { delivery: 'careful' },
    { path: 'audio/tongue-twisters/ga-v01/../outside.mp3' }, { path: 'https://example.com/clip.mp3' },
    { sha256: 'wrong' }, { durationSeconds: 0 }, { bytes: 0 },
    { review: { technical: 'pending' } }, { status: 'approved' },
  ]) {
    const changed = structuredClone(manifest)
    Object.assign(changed.assets[id], patch)
    assert.equal(createTwisterAudioResolver(changed, '/').source(card), null, JSON.stringify(patch))
  }
  const missing = structuredClone(manifest)
  delete missing.assets[id]
  assert.equal(createTwisterAudioResolver(missing, '/').source(card), null)
})
