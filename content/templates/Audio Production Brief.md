---
type: audio-brief
project: Artico
layer: social-fluency
chapter_id: NN
slug: ""
status: "Brief | Generated | Edited | Approved"
theory_file: ""
shadowing_file: ""
voice_a: ""
voice_b: ""
tags:
  - artico
  - audio
---

# Audio Brief — Chapter NN

## Principle

Every chapter gets two related but different recordings:

1. **Theory / natural audio:** how people normally speak in the situation. This is for listening, noticing rhythm, and hearing the social meaning in context.
2. **Practice / shadowing audio:** the same language made easier to imitate. This is for the learner’s mouth: clear chunking, controlled speed, intentional pauses, and repeatable loops.

The shadowing version must sound like a patient human speaker, not like a robot reading punctuation.

## Source script

Link the approved chapter dialogue and phrase list here:

- Chapter: 
- Dialogue: 
- Target phrases: 
- Japanese explanation: 

## Natural theory pass

### Google AI Studio prompt

```text
Create a natural, realistic English conversation for an English-learning lesson.

Situation: [one concrete situation from the chapter]
Relationship: [friend / colleague / staff member / neighbour / doctor / etc.]
English variety: [neutral international English or a deliberate regional variety]
Voices: Voice A is [role, approximate age, attitude]. Voice B is [role, approximate age, attitude].

Read the dialogue exactly as written. Do not add words, narration, sound effects, music, or an explanation.
Speak as people normally speak in this situation: natural reductions and connected speech are welcome,
but keep every target phrase intelligible. Use realistic turn-taking, brief overlap only when marked,
and an emotionally appropriate tone. Do not overact and do not sound like a language-learning robot.

Dialogue:
A: [line]
B: [line]
A: [line]
B: [line]
```

## Shadowing practice pass

### Google AI Studio prompt

```text
Create a shadowing-practice version of the approved dialogue below.

Use the same speakers and emotional intention as the natural version, but make the delivery easy to imitate.
Keep the English natural. Do not exaggerate every syllable and do not use a strange classroom voice.
Speak one thought-group at a time. Put a short pause after each line so a learner can repeat it.
For target phrases, keep the normal connected pronunciation but make the stressed words slightly clearer.
Use a moderate first pass and a slower second pass. Do not add music, sound effects, narration, or extra words.

Output order:
1. Natural practice pass
2. Slower shadowing pass

Dialogue:
A: [line]
B: [line]
A: [line]
B: [line]
```

If Google AI Studio cannot produce both passes reliably in one generation, generate two files with the same voice settings and name them `theory` and `shadowing`.

## Post-production — Audacity

Use Audacity only to make a good take more usable; do not make a bad performance sound artificial.

1. Trim silence and mistakes without cutting natural consonants.
2. Apply light noise reduction only if room noise is audible.
3. Use gentle compression so quiet words remain intelligible.
4. Normalize consistently across the course; target a comfortable spoken-web level rather than maximum loudness.
5. Export lossless WAV for the source archive and a small AAC/MP3 derivative for the app if required.
6. Keep the raw generated take. Never overwrite it with the edited file.

## File naming

```text
sf-NNN-short-title-theory.wav
sf-NNN-short-title-shadowing.wav
sf-NNN-short-title-theory.mp3
sf-NNN-short-title-shadowing.mp3
```

## QA checklist

- [ ] The natural version sounds like a real interaction.
- [ ] Every target phrase is intelligible in context.
- [ ] The shadowing version has usable thought-group pauses.
- [ ] The same voice identity is used across the pair.
- [ ] There are no invented lines, music, or sound effects.
- [ ] The final file has been listened to on headphones and a phone speaker.
