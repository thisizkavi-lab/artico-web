// Pure, exact-text lookup. File hashes are independently checked by the build tests.
export function createTwisterAudioResolver(manifest, baseUrl) {
  if (typeof baseUrl !== 'string' || !baseUrl.endsWith('/')) throw new Error('Audio base URL must end in /')
  const hex = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)
  const safePath = value => typeof value === 'string'
    && /^audio\/tongue-twisters\/ga-v01\/tt-[a-z0-9-]+\.mp3$/.test(value)

  function bindingFor(item) {
    if (manifest?.schemaVersion !== 1 || manifest.bundleId !== 'ga-v01'
      || manifest.releaseStatus !== 'generated-audio' || !item?.id) return null
    const binding = manifest.cards?.[item.id]
    if (!binding || binding.number !== item.number || binding.phrase !== item.phrase) return null
    if (JSON.stringify(binding.buildSteps) !== JSON.stringify(item.buildSteps)) return null
    if (JSON.stringify((binding.transfer ?? []).map(unit => unit.text)) !== JSON.stringify(item.transfer)) return null
    return binding
  }

  function recording(assetId, text, delivery) {
    const asset = manifest.assets?.[assetId]
    if (!asset || !['generated-unreviewed', 'approved'].includes(asset.status)
      || asset.review?.technical !== 'pass' || asset.text !== text || asset.delivery !== delivery) return null
    if (asset.status === 'approved' && (!asset.review.reviewer || !asset.review.reviewedAt
      || !['transcript', 'phonetic', 'voiceConsistency'].every(field => asset.review[field] === 'pass'))) return null
    if (!safePath(asset.path) || !hex(asset.sha256) || !hex(asset.textSha256) || !hex(asset.promptSha256)) return null
    if (!Number.isFinite(asset.durationSeconds) || asset.durationSeconds <= 0 || !(asset.bytes > 0)) return null
    return { assetId, src: `${baseUrl}${asset.path}`, text: asset.text, delivery: asset.delivery, status: asset.status }
  }

  function clip(item, selection = { kind: 'study' }) {
    const binding = bindingFor(item)
    if (!binding || !selection) return null
    if (selection.kind === 'study') return recording(binding.studyFullAssetId, item.phrase, 'natural')
    if (selection.kind === 'practice') {
      const step = selection.step
      if (!Number.isInteger(step) || step < 0 || step >= item.buildSteps.length) return null
      if (selection.delivery != null && !['careful', 'natural'].includes(selection.delivery)) return null
      const full = step === item.buildSteps.length - 1
      if (selection.delivery === 'natural') return full ? recording(binding.practiceFullNaturalAssetId, item.phrase, 'natural') : null
      return recording(binding.practiceStepAssetIds[step], item.buildSteps[step], 'careful')
    }
    if (selection.kind === 'focus' || selection.kind === 'transfer') {
      if (!Number.isInteger(selection.index) || selection.index < 0) return null
      const unit = (selection.kind === 'focus' ? binding.focusUnits : binding.transfer)?.[selection.index]
      return unit ? recording(unit.assetId, unit.text, selection.kind === 'focus' ? 'careful' : 'natural') : null
    }
    return null
  }

  function source(item, step = null, delivery = 'careful') {
    return clip(item, step === null ? { kind: 'study' } : { kind: 'practice', step, delivery })?.src ?? null
  }
  function groups(item) {
    const binding = bindingFor(item)
    return binding ? { focusUnits: binding.focusUnits, transfer: binding.transfer } : { focusUnits: [], transfer: [] }
  }
  return { clip, source, groups }
}
