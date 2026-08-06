# Artico — Alphabet Foundations UI

## Product decision

This is a short, free **foundation sequence**, not a complete pronunciation course. Artico owns the order, the Japanese guidance, and the learner actions. YouTube supplies selected examples only.

The learner should always know three things:

1. what to notice;
2. what to do after the video;
3. where the lesson goes next.

## Course hierarchy

```text
Foundation
└── Alphabets & Sounds · Free
    ├── 01 Welcome
    ├── 02 Meet the 26 letters
    ├── 03 Hear the Alphabet
    ├── 04 Write the Alphabet
    ├── 05 Side note: letters and sounds
    ├── 06 Guided Try
    └── 07 Review

Next in Practice: Tongue Twisters
```

The lesson-level action is called **Guided Try**. The word **Practice** stays reserved for the global Practice mode, which begins with Tongue Twisters.

## Shared lesson shell

- Desktop frame: 2048 × 1152.
- Header: Artico logo, Learn / Practice switch, user profile.
- Left rail: module title, seven steps, small “Free foundation” label, progress shown only as the current step (no points, score, or streak).
- Main area: one clear learning job per screen.
- Footer controls: quiet Previous link and one primary Continue button.
- Latin/UI type: Poppins. Japanese guidance: Noto Sans JP / Hiragino Sans.
- Palette: white and warm white, olive `#3A503F`, brand olive `#706B08`, neutral surface `#F1F2F0`, pale note `#FCFFDA`.

## Screen 01 — Meet the 26 letters

Purpose: give context without making the learner read an essay.

### Content

- Eyebrow: `ALPHABETS & SOUNDS · 01 / 07`
- Heading: `Meet the 26 letters`
- Japanese summary: `英語のすべては、26文字から始まります。まずは大文字と小文字の形・名前に慣れましょう。`
- Concept card: `26 letters · 2 forms` with one short sentence: `大文字と小文字は、同じ文字の二つの形です。`
- Alphabet board: paired cells such as `A a`, `B b`, through `Z z`.
- Quiet note: `歴史の説明は「もっと知る」に折りたたむ。最初の画面では読ませすぎない。`

### Why this replaces the draft

The historical introduction can be good book content, but four centered paragraphs make the first app screen feel like a textbook. The app keeps only the context needed to act; optional depth belongs in an expandable note.

## Screen 02 — Hear the Alphabet

Purpose: use the alphabet song as a sound model, not as the course itself.

### Video reference card

- Badge: `YOUTUBE REFERENCE`
- Title: `The Alphabet Song · lowercase letters`
- Creator: visible below the title.
- 16:9 player area with normal YouTube controls.
- Caption below player: `外部の音声をお手本として使います。動画のあとにArticoの手順を続けてください。`

### Artico learning loop

1. `Listen` — `まず一度、歌わずに聴く。リズムだけを感じます。`
2. `Join` — `次に音声と一緒に5回。口を止めずにAからZまで。`
3. `Recall` — `最後に音声なしで一度。止まった文字だけ確認します。`

Completion is a plain checkbox: `音声なしでA–Zを言えた`. It is not scored.

## Screen 03 — Write the Alphabet

Purpose: connect visual recognition to hand movement without forcing an on-screen tracing feature in the MVP.

### Layout

- Left: YouTube handwriting reference card.
- Right: Artico-owned `Today’s paper task` card.
- Required items: pencil, eraser, lined notebook.
- Optional resource chip: `Alphabet worksheet ↗`; never show a raw URL inside the lesson.

### Paper task

1. Trace the uppercase and lowercase letter five times.
2. Write both forms once without tracing.
3. Add three small words that begin with the letter.

The task changes by letter/set later, but the UI component stays identical.

## Screen 04 — Side note: letters are not sounds

Purpose: prevent confusion without turning IPA into a prerequisite.

### Positioning

- Label: `SIDE NOTE · ABOUT 2 MIN`
- Question heading: `Why can one letter sound different?`
- Big comparison: `26 LETTERS ≠ ~44 SOUNDS`
- Japanese explanation: `文字は綴りを、IPAは音を表します。今は記号を暗記したり書いたりする必要はありません。`
- Small two-row comparison:
  - Alphabet → letters → `a, b, c`
  - IPA → sounds → `/æ/, /b/, /k/`

Use “around 44” because the teaching count depends on the accent and the phonological analysis.

### References

Two compact optional cards, not two dominant embeds:

- `Understand the English sound map · 8 min`
- `IPA sound song · Short`

Each card opens into the same 16:9 player component. The learner can skip both and continue.

### Exit

- Reassurance: `今日は「文字と音は同じではない」と分かれば十分です。`
- Primary CTA: `Continue to Tongue Twisters`
- Secondary: `Review alphabet`

## YouTube implementation rules

- Treat every embed as an external reference and show the creator/title.
- Use a responsive 16:9 container; YouTube recommends at least 480 × 270 when controls are present.
- Do not autoplay. Playback should begin only after the learner chooses it.
- Keep normal player controls and never place custom UI on top of the player.
- On the website, use privacy-enhanced mode with `youtube-nocookie.com`.
- Use `playsinline=1` on mobile. If the IFrame API is enabled, pass the site origin.
- Do not rely on `modestbranding`; it is deprecated.
- Do not promise that `rel=0` removes related videos; it only limits them to the same channel.
- Provide a plain `Open on YouTube ↗` fallback when embedding is disabled or playback fails.

Suggested web embed shape:

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID?playsinline=1&hl=ja"
  title="Alphabet song reference video"
  loading="lazy"
  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

## Content rule

Every screen follows the same rhythm:

```text
Short Japanese context
→ one example or reference
→ one explicit learner action
→ one calm continuation
```

This is the product value. The videos are useful, but the sequence and instructions make them teachable.
