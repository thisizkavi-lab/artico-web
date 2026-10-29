# Vocabulary illustrations: Gemini execution brief (v2)

You are executing, not planning. Work in `/Users/kavi/Documents/kyoto/artico-web` on a local git branch `vocab-art` (create it from `main` if missing). Never push to `main` (it auto-deploys to GitHub Pages). Don't push any branch unless the user asks.

**Every run starts with:** read this file → read `work/vocab-art/STYLE_LOCK.md` if it exists → read every file in `work/vocab-art/corrections/` and apply the unapplied ones first (log them in `PROGRESS.md`) → read `work/vocab-art/PROGRESS.md` → do the next unfinished batch → write the batch report → **stop**.

---

## 1. The goal

Lesson 98 (`#/lesson/98/study/NN`) is a course of 78 vocabulary topics. Lessons 3–78 have 3,950 entries (`src/web/vocabularyOrganized.json` → `lessons[].groups[].items[][0]`). The current pictures come from a mix of sources: OpenAI-generated scenes, Mulberry/OpenMoji pictograms, and programmatic SVG→PNG scenes. Together they look **inconsistent**, and many pictures are filler that doesn't teach the word.

Build **one consistent illustration system for the whole course** that replaces all of it:

1. **Communicates alone.** Strip away the word, the Japanese, and the layout. The picture alone must make a learner think of this word (or a true synonym), and not its neighbours.
2. **Consistent.** Every image in every lesson looks like it came from the same illustrator, the same cast, and the same visual rules. One generator only: your Gemini image model. Never mix in library icons, old art, or other generators.
3. **Honest.** If a word cannot be pictured clearly, it stays text-only. A wrong or vague picture is worse than none.

Out of scope: lessons 1 and 2 (bespoke UI). **Everything else is replaced, including lessons 3, 4, 13 and 18 and every existing OpenAI/Mulberry/OpenMoji/SVG image.**

## 2. How the app picks images

- `src/web/vocabularyVisual.js` → `artworkFor(term, chapter)` is a priority chain of resolvers. `src/web/VocabularyTopicLesson.jsx` renders `<img class="vlt-png">` in a box with `aspect-ratio: 152/96` and `object-fit: cover`. Cards with no image use the supported `vlt-text-card` layout.
- Sense of a word = its Japanese gloss: `vocabularyJapanese(term, lesson)` in `src/web/vocabularySupport.js`. Polysemy guards: `src/web/vocabularyDedup.js`. Merged synonym cards: `combinedVocabulary` (already handled by `vocabularyVisual`).
- Tests: `npm test` (notably `src/web/vocabularyIllustrations.test.js`, `src/web/vocabulary.test.js`). Never weaken or delete an existing assertion.
- **Wiring for the new system (build once in Batch 0):**
  - Manifest `src/web/vocabularyCourseArt.json`: `{ "schema":1, "style":"<id from STYLE_LOCK>", "entries": { "<lesson>:<term.toLowerCase().trim()>": "<lesson 2-digit>/<slug>" } }`.
  - Resolver `src/web/vocabularyCourseArt.js` returns `{ type:'png', src: import.meta.env.BASE_URL + 'vocabulary-course/' + value + '.webp' }`.
  - Call it as the **first** line of `artworkFor`, so new art overrides every old source as each lesson is finished. Leave the old resolvers in place until the cleanup batch (existing tests assert on them).
  - New test: every key exists in the vocabulary; every file exists, is `.webp`, 608×384, ≤ 80 KB; no duplicate file within a lesson.
  - Add an "Artico course illustrations" section to `public/vocabulary-symbols/ATTRIBUTION.md`: original AI-assisted Artico artwork, no third-party assets.

## 3. Tooling (Batch 0)

1. `scripts/vocab_art_inventory.mjs` → `work/vocab-art/inventory.json`, one record per entry: `{ key, lesson, lessonTitle, group, siblings[], term, ja, newArt: bool }`. `siblings` = other terms in the same group.
2. `scripts/vocab_art_contact_sheet.py` (Pillow) → `work/vocab-art/review/lesson-NN.png`: cards in lesson/group order, each showing the image (or a grey "TEXT: <reason>" box), term, JA gloss, blind-test result (✓ / ✗ / ?), and a red border if `NEEDS-REVIEW`. Max 6 columns, cells ~260px wide, group names as row headers. Also `--sample N` mode: N random images from **all finished lessons** in one sheet → `review/drift-batch-NN.png`, for checking that style stays consistent across batches.
3. **Blind recognition harness.** For each image, start a **fresh** subagent that sees only the image and the lesson title (never the term, JA, or prompt):
   - **Open guess:** "What English word or short phrase is this picture teaching? Give your top 3 guesses."
   - **Forced choice:** "Which ONE of these does the picture show?" + the term and its siblings, shuffled.
   - **Pass** = forced choice correct **and** at least one open guess is the term, a true synonym, or matches the JA sense. Store results in `work/vocab-art/qa/lesson-NN.json` (`key, guesses, choice, pass, attempts`).
4. `.gitignore`: add `work/vocab-art/raw/`.
5. `work/vocab-art/PROGRESS.md`: batch table and corrections log.

## 4. Visual grammar (the rules that make it both clear and consistent)

Choose one treatment per entry, in triage:

| Category | Treatment |
|---|---|
| Object, food, animal, garment, tool | The single item, 3/4 view, isolated on the paper background with a soft ground shadow. Show the most typical form. If it's easily confused (lime/lemon, kitten/cat), add a scale or context cue: a hand, the cut-open fruit, a size comparison with a muted object. |
| Part of something (body part, collar, cuff, handle) | Whole object/person in muted tones. **Target part in full colour with the focus halo.** |
| Action / chore / verb phrase | A cast member mid-action at the most recognizable moment. Tool and motion obvious. Sibling actions (sweep vs mop vs vacuum) differ by tool *and* pose. |
| Feeling / personality | Face + body language + situational cue. Use manga emotion marks Japanese learners read instantly (sweat drop, anger vein, sparkle, gloom lines) consistently. Sibling feelings must differ in intensity/cause (annoyed < angry < furious). |
| Adjective / comparison | Prefer one exaggerated scene (heavy = straining to lift a box). Use a **contrast pair** only if needed (big/small, near/far, deep/shallow): target in full colour, comparison item muted. |
| Person / job / role | Cast member or role character in a recognizable uniform/setting, doing the job. |
| Place / building | Establishing view with the one feature that identifies it (pharmacy = counter with medicine shelves and the green-cross-style sign shape, no text). |
| Direction / position / motion | Simple scene + the **Artico blue arrow** as the only symbolic device. |
| Weather / nature | Landscape or a person reacting (shivering, sweating, umbrella). |
| Idiom | The **meaning** as a real situation ("break the ice" = strangers at a party starting to laugh together). Never the literal image. |
| Unpicturable | `TEXT`, with reason `ABSTRACT`, `FUNCTION`, `IDIOM`, `SENSE` (can't be distinguished from a sibling), or `SENSITIVE`. Expect this to be rare outside lessons 3, 5–8, 41, 75–78. |

**Allowed graphic devices (and nothing else):** Artico blue arrow, soft yellow focus halo, motion lines, manga emotion marks, muted/greyed comparison items. **Never:** text, letters, numerals (clock hands without numbers are fine), logos, brands, flags (unless the word is a flag), speech bubbles with content, watermarks, real people.

**Framing:** landscape 152:96. Keep everything that matters inside the central 85% because `object-fit: cover` crops edges. The subject fills ~60–75% of the frame. It must still read as a ~150px-wide thumbnail on a phone, so favour bold, simple shapes over detail.

**Safety:** crime, sickness, and medicine are gentle and non-graphic (no blood, injuries, weapons aimed at people, or needles in skin). No cultural stereotypes.

## 5. Batches

Run one batch per session. Each batch ends with section 6 and a stop.

### Batch 0: tooling + style bake-off → STOP for the user's choice

Build section 2 wiring and section 3 tooling (wire the resolver with an empty manifest; tests green). Then generate the **benchmark set** in **three candidate styles**:

- **A. Artico Anime:** clean contemporary Japanese anime illustration, crisp dark line art, soft cel shading, simplified backgrounds. Reference: `public/vocabulary-ai/ch04/sheet/brush-your-teeth.png`.
- **B. Flat Editorial:** flat vector-look shapes, one consistent medium-weight dark outline, no gradients, limited palette built around Artico blue `#5479ac` and paper `#fbfaf7`, plus warm accents.
- **C. Picture-book Soft:** gentle gouache/coloured-pencil texture, rounded friendly characters, warm light, still clean and uncluttered.

Benchmark entries (exact keys; they test every hard category):
`29:pomegranate`, `54:kitten`, `14:elbow`, `17:freckles`, `11:sweep the floor`, `11:mop the floor`, `19:nervous`, `19:frustrated`, `5:heavy`, `72:pharmacy`, `34:plumber`, `46:turn left`, `51:foggy`, `8:break the ice`.

Output `work/vocab-art/bakeoff/style-{A,B,C}.png` (one contact sheet per style, run through the blind harness) and `bakeoff/REPORT.md`: blind pass rate per style, average attempts, legibility at 150px (also render each sheet at thumbnail size), and your recommendation. **Stop.** The user and the reviewer pick the style.

### Batch 1: style lock + cast + pilot → STOP for review

1. Write `work/vocab-art/STYLE_LOCK.md`: the chosen style id, the exact master prompt, palette hexes, line/shading rules, background, and framing. Choose **6–8 approved anchor images** (from the bake-off or regenerated) and save them to `work/vocab-art/anchors/`. Pass these anchors as style references with **every** generation from now on. Never use old art as a reference.
2. **Cast sheets** in the locked style, saved to `work/vocab-art/anchors/cast-*.png`. Each shows front/side/expressions:
   - **Ren**: young Japanese man, short messy black hair, navy T-shirt.
   - **Mia**: young woman, shoulder-length brown hair, cream cardigan.
   - **Sam**: man in his 30s, light-brown skin, glasses, light-blue shirt.
   - **Grace**: woman in her 60s, grey bob, green cardigan.
   - **Kai**: child of about 8, yellow T-shirt.

   Use the cast for generic people. Job/role characters are designed once and reused. Pass the relevant cast sheet as a reference whenever a cast member appears.
3. Pilot lessons, fully done: **19 Feelings and moods, 29 Fruit and nuts, 54 Pets and farm animals, 15 Clothes.**

### Later batches (after pilot corrections exist or the user says "pilot approved")

| Batch | Lessons |
|---|---|
| 2 | 9, 10, 12, 16, 22, 28, 30, 31, 37, 55, 56, 57, 62, 74 |
| 3 | 14, 17, 68, 69, 70, 71 |
| 4 | 4, 11, 32, 33, 72, 73 |
| 5 | 44, 45, 46, 47, 48, 49, 50, 51, 52 |
| 6 | 34, 35, 36, 38, 39, 40, 42, 43 |
| 7 | 13, 18, 20, 21, 23, 24, 25, 26, 27 |
| 8 | 58, 59, 60, 61, 63, 64, 65, 66, 67 |
| 9 | 3, 5, 6, 7, 8, 41, 53, 75, 76, 77, 78 |
| 10 | Cleanup, **only when the user approves**: remove the old resolvers/manifests/assets that are no longer referenced, update the tests that asserted them, and update ATTRIBUTION. |

If a batch exceeds ~300 images, split it at a lesson boundary and record that in `PROGRESS.md`.

## 6. Per-lesson procedure (every batch)

1. **Triage** → `work/vocab-art/triage/lesson-NN.json`, one record per entry: `{ key, term, ja, sense, treatment, concept, differsFrom, reason? }`.
   - `sense`: one sentence that pins the meaning and agrees with `ja`.
   - `concept`: exactly what will be drawn.
   - `differsFrom`: how it is visually distinct from each confusable sibling.
   - Plan the whole group together before generating, so siblings are designed as a set.
2. **Generate** with the STYLE_LOCK master prompt + concept + anchors (+ cast sheet). Raw outputs go to `work/vocab-art/raw/` (gitignored).
3. **Self-check by looking at the image:** no text or garbled glyphs, correct anatomy and hands, style matches the anchors, correct sense, framing safe.
4. **Blind test.** On fail, revise the concept (not only the seed) and regenerate. Maximum 4 attempts, then `TEXT` + `NEEDS-REVIEW`.
5. **Export** WebP 608×384, quality ~80, ≤ 80 KB → `public/vocabulary-course/<NN>/<slug>.webp`. Add the entry to `vocabularyCourseArt.json`.
6. Commit per lesson: `vocab-art: lesson NN — X images, Y text-only, blind pass Z%`.

## 7. Batch report → `work/vocab-art/reports/batch-NN.md`

- Per lesson: total entries, images, TEXT (by reason), NEEDS-REVIEW, first-try blind pass %, final blind pass %, average attempts.
- Contact sheet paths and the cross-batch drift sheet path.
- NEEDS-REVIEW list: key, what's wrong, what you tried.
- TEXT list: key → reason (one line each).
- Any style drift you noticed, and anchor/prompt adjustments you propose (don't change STYLE_LOCK yourself after Batch 1; propose changes only).
- Exact `npm test` and `npm run build` results. Both must pass.
- Update `PROGRESS.md`, then **stop** and give the user the report path.

## 8. Hard rules

- The picture alone must teach the word. Wrong or vague < none.
- One style, one generator, the same anchors and cast for the whole course.
- The JA gloss decides the sense. Siblings are designed together and must be visually distinguishable.
- No text, numerals, logos, or brands in images. No third-party or downloaded images. No remote URLs at runtime.
- Don't change lesson content, glosses, CSS/layout, or unrelated code.
- Tests and build stay green without weakening assertions. Stay on branch `vocab-art`, commit per lesson, never push `main`.
