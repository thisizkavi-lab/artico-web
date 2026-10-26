import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ORIENTATION_RESPONSE_KEY,
  buildOrientationResult,
  choices,
  orientationComplete,
  parseOrientationAnswers,
  normalizeOrientationAnswers,
  roles,
} from './orientationProfile.js'
import { emptyLearning, sanitizeLearning } from './learning.js'

const sample = {
  v:1, context:['friends','ideas'], goal:'exchange',
  voice:'curious', friction:'words',
}
test('orientation answers are validated, not treated as a psychological score', () => {
  assert.equal(orientationComplete(parseOrientationAnswers('not json')), false)
  assert.equal(orientationComplete(normalizeOrientationAnswers(sample)), true)
  assert.deepEqual(
    normalizeOrientationAnswers({ ...sample, context:['friends','friends','malicious','travel','work'], goal:'unknown' }).context,
    ['friends','travel']
  )
  assert.equal(normalizeOrientationAnswers({ ...sample, goal:'unknown' }).goal, null)
  assert.equal(normalizeOrientationAnswers({ ...sample, voice:'unknown' }).voice, null)
  assert.equal(buildOrientationResult({ ...sample, friction:null }), null)
})
test('all input options yield legitimate, actionable future-self output', () => {
  for(const goal of choices.goal) {
    for(const voice of choices.voice) {
      const result = buildOrientationResult({ ...sample, goal:goal.id, voice:voice.id })
      assert.ok(roles[result.roleId])
      assert.equal(result.titleEn, result.role.en)
      assert.ok(result.tentativeWhyJa.length > 8)
      assert.ok(result.tentativeWhyEn.length > 8)
      assert.ok(result.role.line)
      assert.ok(result.role.reply)
      assert.ok(result.nextPath.startsWith('/'))
    }
  }
  for(const friction of choices.friction) {
    const result = buildOrientationResult({ ...sample, friction:friction.id })
    assert.equal(result.nextPath, friction.practice)
    assert.ok(result.actionJa)
  }
})
test('orientation profile survives reload; older reflection notes remain intact', () => {
  const raw = JSON.stringify(sample)
  const data = sanitizeLearning({
    ...emptyLearning,
    responses: {
      'foundation-orientation': 'I want to meet people.',
      [ORIENTATION_RESPONSE_KEY]: raw,
      'not-allowed-profile': raw,
    },
  })
  assert.equal(data.responses[ORIENTATION_RESPONSE_KEY], raw)
  assert.equal(data.responses['foundation-orientation'], 'I want to meet people.')
  assert.equal(data.responses['not-allowed-profile'], undefined)
  assert.equal(parseOrientationAnswers(data.responses[ORIENTATION_RESPONSE_KEY]).goal, 'exchange')
})

test('the learner can choose a different imagined self without changing why they learn', () => {
  const suggested = buildOrientationResult(sample)
  const chosen = buildOrientationResult({ ...sample, roleOverride:'storyteller' })
  assert.equal(chosen.roleId, 'storyteller')
  assert.equal(chosen.suggestedRole, suggested.suggestedRole)
  assert.equal(chosen.tentativeWhyJa, suggested.tentativeWhyJa)
  assert.equal(normalizeOrientationAnswers({ ...sample, roleOverride:'invalid' }).roleOverride, null)
  assert.equal(parseOrientationAnswers(JSON.stringify({ ...sample, roleOverride:'explorer' })).roleOverride,'explorer')
})

test('future English selves use parallel actions, not personality labels', () => {
  assert.equal(roles.collaborator.en, 'Make Plans Together')
  assert.equal(roles.thinker.en, 'Exchange Ideas')
  for (const goal of choices.goal) {
    for (const voice of choices.voice) {
      const result = buildOrientationResult({ ...sample, goal:goal.id, voice:voice.id })
      assert.equal(result.titleEn, result.role.en)
      assert.equal(result.styleEn, voice.en)
      assert.equal(result.styleJa, voice.ja)
    }
  }
})
