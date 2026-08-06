---
type: system-spec
project: Artico
layer: social-fluency
status: design
tags:
  - artico
  - audio
  - google-ai-studio
  - shadowing
---

# Artico audio system

## The simple rule

One script produces two learning experiences, not one recording played twice.

### 1. Theory audio: hear the real interaction

Theory audio answers: **“What does this sound like when people actually use it?”**

It should include:

- realistic pace and connected speech;
- natural hesitation and turn-taking where appropriate;
- relationship-appropriate politeness;
- enough clarity that the learner can locate the target phrase;
- no teacher narration inside the scene.

This file belongs beside the theory. The written chapter explains the meaning; the audio lets the learner hear the explanation embodied.

### 2. Practice audio: make the interaction shadowable

Practice audio answers: **“Can my mouth follow this?”**

It should include:

- the same approved dialogue and voice identity;
- thought-group chunking rather than syllable-by-syllable robotic speech;
- short repeat windows after each line;
- a moderate-speed pass and a slower pass;
- target-word stress that is clearer, not unnatural;
- optional response cues where the learner speaks before hearing the model.

This file belongs in practice. It is not a “bad slower version”; it is a deliberately different training mode.

## Audio flow in the product

```text
Theory page
  → listen once for situation
  → listen again while reading
  → notice the target phrase and social tone

Practice page
  → listen to the chunk
  → pause and shadow
  → repeat with less support
  → respond before the model
  → return after a spacing interval
```

## Keep generation separate from editing

Google AI Studio is the voice-generation stage. Audacity is an optional cleanup and assembly stage. The manuscript remains the source of the words and the performance direction.

Do not ask the generator to solve pedagogy through unnatural pronunciation. Put the teaching instruction in the chapter and audio player, then ask the model for a believable performance.

## Consistency rules

- Keep a small recurring voice cast so the course feels like one world.
- Keep the same voice settings for the natural/shadowing pair.
- Specify relationship, setting, emotional state, and English variety in every prompt.
- Keep dialogue original and short enough to replay.
- Preserve raw files, edited masters, and app derivatives separately.
- Avoid background music and decorative sound effects during language training.

## Suggested folders

```text
content/audio/
  Audio System — Natural and Shadowing Modes.md
  Audio Production Brief.md
  briefs/
  raw/
  edited/
  exports/
```
