# Artico MVP App Logic

## Core model

Artico has two independent dimensions.

### Curriculum stages

- **Foundation** — Orientation, Alphabets & Sounds, and the introduction to Tongue Twisters.
- **Social Fluency** — high-frequency everyday situations, dialogues, phrases, and social choices.

Foundation is designed for beginners but is not a gate. A learner can start it, preview it, skip it for now, or return later without taking a placement test.

### Global modes

- **Learn** — understand a concept through short Japanese explanations, demonstrations, and examples.
- **Practice** — speak aloud through explicit, repeatable instructions. The first practice category is Tongue Twisters.

Learn and Practice run across both curriculum stages. Tongue-twister practice begins in Foundation and continues while the learner moves through Social Fluency.

The interface must never use scores, streaks, lives, leaderboards, placement gates, or fluency-in-X-days promises.

## First-use path

1. User chooses **Get Started**.
2. User chooses Japanese, English, or bilingual guidance. This can be changed later.
3. User enters **Start Here → Orientation**.
4. Orientation explains:
   - what Artico trains;
   - the Foundation and Social Fluency stages;
   - the difference between Learn and Practice;
   - how to prepare a quiet speaking space;
   - how to listen, repeat, pause, and return;
   - that accuracy comes before speed.
5. Orientation ends with three calm routes:
   - **Start Foundation**;
   - **Preview Foundation**;
   - **Go to Social Fluency**.
6. The free Foundation remains available whether it was started or skipped.
7. The Practice tab becomes useful at Tongue Twisters and remains globally available after that point.

Orientation is a book-shaped opening, not a test. Its final screen can provide a short operating summary, but the manuscript does not have an arbitrary runtime target. It remains accessible from the sidebar.

## Learn information architecture

```text
Start Here
└── Orientation
    ├── Why language?
    ├── Why English?
    ├── How Artico works
    ├── Foundation and Social Fluency
    ├── Learn and Practice
    ├── Prepare your space
    ├── Listen and repeat
    └── Your first session

Foundation
├── Alphabets & Sounds
│   ├── Introduction
│   ├── Alphabet and letter names
│   ├── English sound map
│   ├── Mouth and tongue positions
│   ├── Rhythm basics
│   ├── Guided Try
│   └── Review
│
└── Tongue Twisters
    ├── Why they work
    ├── Slow and accurate
    ├── Build speed
    ├── Stress and rhythm
    ├── Transfer into real phrases
    └── Review

Social Fluency
├── Greetings and openings
├── Everyday responses
├── Emotion and tone
├── Conversation patterns
└── Stories and connection
```

A learner does not need to complete every Foundation lesson before opening Social Fluency. The interface should remember the current location in each stage independently.

Use **Guided Try**, not **Practice**, inside Learn lessons. “Practice” is reserved for the global Practice mode.

## Practice information architecture

```text
Tongue Twisters
├── Introduction
├── Slow Precision
├── Build Speed
├── Stress and Rhythm
└── Real Phrases

Sound Contrasts
Rhythm and Stress
Connected Speech
Social Speaking Patterns
```

## Practice session loop

Every practice session follows the same calm sequence:

1. **Prepare** — quiet place, headphones, water, permission to speak imperfectly.
2. **Listen** — hear the complete model once.
3. **Notice** — one specific mouth, tongue, sound, or rhythm cue in Japanese.
4. **Repeat slowly** — three deliberate repetitions.
5. **Build rhythm** — three repetitions with the model.
6. **Make it useful** — transfer the sound pattern into one ordinary phrase.
7. **Return** — a plain instruction for when to repeat the session; no points or streak.

## Social Fluency chapter loop

Every chapter moves through the same system:

1. **Situation** — a Can-do action, people, place, and reason to speak.
2. **Theory** — Japanese, English, or bilingual explanation using zoom out → zoom in → zoom out.
3. **Natural audio** — believable speech with normal rhythm, reductions, and emotion.
4. **Notice** — one phrase, social choice, sound change, or rhythm target.
5. **Shadowing** — separately directed practice audio with clear thought groups and progressive support.
6. **Retrieve and vary** — remove text support and change one contextual detail.
7. **Mission** — one small action that can be carried into life in Japan.
8. **Return cue** — a specific time or session for revisiting the target.

Each chapter is self-contained at lesson level: explanation, examples, transcript, audio, required visual support, instructions, and return cue appear together. “Self-contained” does not mean claiming to contain the entire English language.

## MVP scope

- Orientation
- Alphabets & Sounds learning content
- Tongue Twisters as the first speaking practice
- Foundation review
- Initial Social Fluency modules

Advanced communication and real-world application layers remain outside the MVP.
