import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  ORIENTATION_RESPONSE_KEY,
  buildOrientationResult,
  choices,
  canAdvanceOrientation,
  nextOrientationStep,
  orientationComplete,
  parseOrientationAnswers,
  normalizeOrientationAnswers,
  roles,
} from './orientationProfile.js'
import { emptyLearning, sanitizeLearning } from './learning.js'
import { getPersonaConfetti, getPersonaConfettiPieces, personaConfettiThemes } from './personaConfetti.js'

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

test('Orientation navigation has a reliable Next action at all four steps', () => {
  const blank = normalizeOrientationAnswers(null)
  for (let step = 0; step < 4; step++) {
    assert.equal(canAdvanceOrientation(blank, step), false)
    assert.equal(nextOrientationStep(blank, step), step)
  }

  // Step 1: choosing a context enables Next.
  const afterContext = { ...blank, context:['friends'] }
  assert.equal(canAdvanceOrientation(afterContext, 0), true)
  assert.equal(nextOrientationStep(afterContext, 0), 1)
  assert.equal(canAdvanceOrientation(afterContext, 1), false)

  // Step 2: choosing a conversation goal enables Next, but nothing
  // advances automatically when an option is first selected.
  const afterGoal = { ...afterContext, goal:'connect' }
  assert.equal(canAdvanceOrientation(afterGoal, 1), true)
  assert.equal(nextOrientationStep(afterGoal, 1), 2)
  assert.equal(nextOrientationStep(afterGoal, 2), 2)

  // Step 3: learner chooses their preferred speaking style.
  const afterVoice = { ...afterGoal, voice:'warm' }
  assert.equal(canAdvanceOrientation(afterVoice, 2), true)
  assert.equal(nextOrientationStep(afterVoice, 2), 3)
  assert.equal(canAdvanceOrientation(afterVoice, 3), false)

  // Step 4: last answer explicitly unlocks the results screen.
  const done = { ...afterVoice, friction:'confidence' }
  assert.equal(orientationComplete(done), true)
  assert.equal(canAdvanceOrientation(done, 3), true)
  assert.equal(nextOrientationStep(done, 3), 4)
  assert.equal(canAdvanceOrientation(done, 4), false)
  assert.equal(nextOrientationStep(done, 4), 4)

  // Going back to any previously answered step leaves its Next usable.
  for (let step = 0; step < 4; step++) {
    assert.equal(canAdvanceOrientation(done, step), true)
    assert.equal(nextOrientationStep(done, step), step + 1)
  }

  // Re-evaluating an answer does not skip a step, nor bypass an
  // earlier empty question in manually corrupted saved progress.
  assert.equal(nextOrientationStep({ ...done, goal:null }, 1), 1)
  assert.equal(nextOrientationStep({ ...done, goal:null }, 3), 3)
  assert.equal(nextOrientationStep({ ...done, context:[] }, 3), 3)
  assert.equal(nextOrientationStep(done, -1), -1)
});

test('each imagined English self has a distinct confetti shape and palette', () => {
  const names = Object.keys(roles)
  assert.deepEqual(Object.keys(personaConfettiThemes), names)
  assert.equal(new Set(names.map(id => getPersonaConfetti(id).shape)).size, names.length)
  assert.equal(new Set(names.map(id => getPersonaConfetti(id).colors.join(','))).size, names.length)
  for (const id of names) {
    const pieces = getPersonaConfettiPieces(id)
    const theme = getPersonaConfetti(id)
    assert.equal(pieces.length, 34)
    assert.deepEqual(getPersonaConfettiPieces(id), pieces) // deterministic, no random jitter
    assert.ok(pieces.every(p => theme.colors.includes(p.color)))
    assert.ok(pieces.every(p => p.drift.endsWith('vw') && p.fall.endsWith('px')))
    assert.ok(pieces.every(p => p.delay.endsWith('ms') && p.duration.endsWith('ms')))
  }
})

test('the redundant Orientation result footer is removed but the final reveal remains', () => {
  const jsx = readFileSync(new URL('./OrientationPractice.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('./orientation-practice.css', import.meta.url), 'utf8')
  assert.doesNotMatch(jsx, /rf-persona-next|rf-persona-footer|rf-persona-note/)
  assert.doesNotMatch(css, /\\.rf-persona-next|\\.rf-persona-footer|\\.rf-persona-note/)
  assert.match(jsx, /<PersonaConfetti/)
  assert.match(jsx, /celebrate\\(chosenRole\\)/)
  assert.match(jsx, /celebrate\\(id\\)/)
  assert.match(css, /prefers-reduced-motion/)
})
