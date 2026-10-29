# Vocabulary Illustrations: Gemini 3.8 Flash (High) Execution Playbook (`v3 — Studio SVG`)

You are executing, not re-architecting. Work in `/Users/kavi/Documents/kyoto/artico-web` on local git branch `vocab-art`. **NEVER push to `main`** (it auto-deploys to GitHub Pages). Do not push any branch unless the user explicitly asks.

---

## 0. Mandatory Startup Sequence (Every Session)

1. **Read the Master SVG Skill FIRST:**
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-vocab-svg-illustrator/SKILL.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-vocab-svg-illustrator/references/PALETTE_AND_RIGS.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-vocab-svg-illustrator/references/TRIAGE_AND_POLYSEMY.md`
2. **Inspect the Gold-Standard Visual Baseline:**
   - Call `read_file` on `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/review/gold-showcase.png` and read 2–3 anchor `.svg` files in `work/vocab-art/svg/` so your visual calibration is locked before drawing anything.
3. **Check Course Status & Progress:**
   - Read `work/vocab-art/PROGRESS.md` and run:
     ```bash
     cd /Users/kavi/Documents/kyoto/artico-web
     /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py status
     ```
4. **Execute the requested lesson(s) or next unfinished batch** following Section 2 below.

---

## 1. Environment & Hard Rules

- **Python CLI (ALWAYS use `.venv`):** `/Users/kavi/Documents/kyoto/.venv/bin/python3` (`resvg_py` + `Pillow` installed).
- **Node / Tests (ALWAYS prefix PATH):** `export PATH="/Users/kavi/.local/node/bin:$PATH"`
- **NO External Photos or Image APIs:** Never scrape Wikipedia, Wikimedia Commons, Unsplash, Mulberry, or OpenMoji, and never call paid/rate-limited image generation APIs. 100% of new illustrations are authored as clean `.svg` source files in `work/vocab-art/svg/<NN>/<slug>.svg` and compiled to `public/vocabulary-course/<NN>/<slug>.webp` via `scripts/svg_vocab_compiler.py`.
- **NO Inline `<svg>` in React:** Never edit `VocabularyTopicLesson.jsx` or CSS. Keep tests (`npm test` — 148 tests) and `npm run build` 100% green without weakening any assertion.
- **NO Python Stick-Figure Generators:** Do NOT write bulk scripts that stamp out 50 identical stick-arm circles with tiny icons floating next to them. Craft genuine silhouettes per word (or clean domain-specific constructive SVG builders only when every single output has unique silhouette, `<clipPath>` 3-tone shading, and passes visual `read_file` inspection!).

---

## 2. Exact Per-Lesson Execution Loop

Complete **one lesson completely** before moving to the next lesson in the batch:

### Step 1 — Inspect the Lesson & Plan Groups Together
```bash
cd /Users/kavi/Documents/kyoto/artico-web
/Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py plan --lesson <NN>
```
Read every entry's **English term**, **Japanese gloss (`ja`)**, and **group siblings**.
- Decide for each entry: **Which of the 7 Studio Archetypes (`SKILL.md` §2D)** teaches this exact word unmistakably, OR does it belong in **`TEXT_ONLY`** (`ABSTRACT`, `FUNCTION`, `IDIOM`, `SENSE`, `SENSITIVE`)?
- Check `references/TRIAGE_AND_POLYSEMY.md` so you never draw the wrong homonym (`29:date` = fruit, `55:bat` = animal, `62:bat` = sports bat, color groups = draped fabric swatch).

### Step 2 — Register Intentional `TEXT_ONLY` Items
For any item in Lesson `<NN>` that genuinely cannot be pictured clearly without guessing/charades:
```bash
/Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py mark-text --reason ABSTRACT "<NN>:<term>"
```
*(Valid reasons: `ABSTRACT`, `FUNCTION`, `IDIOM`, `SENSE`, `SENSITIVE`. This records `textOnly` in `src/web/vocabularyCourseArt.json` and suppresses legacy Mulberry/OpenAI fallbacks!)*

### Step 3 — Craft `.svg` Files in Micro-Batches of 8–15 Items
Write each SVG to `work/vocab-art/svg/<NN>/<slug>.svg` (`NN` = 2-digit zero-padded lesson, e.g. `04`, `15`, `68`):
- Root element MUST have `viewBox="0 0 304 192"` and exact `data-vocab-key="<lesson>:<term_lowercase>"` (note: `<lesson>` in `data-vocab-key` is unpadded integer matching `plan` output, e.g. `data-vocab-key="4:wake up"`, `data-vocab-key="15:collar (shirt)"`).
- Follow all **6 Constructive Geometry Laws** in `SKILL.md` §3:
  1. Warm stage `#FAF8F3` (or `#EEF4FA` sky / `#DCEAD6` street) + elliptical ground shadow (`#EAE3D5` / `#DDD4C3`).
  2. `<defs>` + `<clipPath>` + `<use>` for 3-tone cel shading (base + shadow + specular highlight) with crisp `#1E2A3B` (`2.6px`) contour stamped on top.
  3. Real closed-path volume on limbs, tools, and garments — zero stick lines.
  4. Part-of-Whole items (`elbow`, `collar`, `sleeve`, `heel`, `roof`, `trunk`) MUST ghost the whole object in `#E5E9F0` / `#64748B`, add the `#FEF3C7` + `#D97706` dashed focus halo, and color **only** the target part + `#4A72B2` pointer arrow.
  5. Zero `<text>`, `<tspan>`, letters, or numerals.

### Step 4 — Compile with `--debug-grid` & Visually Critique via `read_file` (MANDATORY!)
After each micro-batch (and when the lesson is complete), run:
```bash
/Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py build --lesson <NN> --debug-grid
```
Then **immediately call `read_file` on `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/review/lesson-<NN>-grid.png`**!
Examine EVERY card in the rendered PNG:
1. **Strip-Away-the-Text Test:** If a learner only saw this picture inside Lesson `<NN>`, would they say *this exact word* and NOT its sibling?
2. **Coordinate Alignment Check:** Use the `40, 80, 120, 152, 184, 224, 264` × `32, 64, 96, 128, 160` ruler lines to spot any misaligned hat, floating hand, awkward curve, or clipped edge, and edit the `.svg` to fix it immediately!
3. **Zero Uncovered (`TODO`) Tiles:** Every card in Lesson `<NN>` must be either `SVG OK` or an intentional `TXT:<REASON>` — zero red `TODO — UNCOVERED` tiles!

### Step 5 — Render Clean Contact Sheet, Run Tests & Commit Lesson
Once every tile in Lesson `<NN>` looks crisp and unmistakable:
```bash
cd /Users/kavi/Documents/kyoto/artico-web
/Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py build --lesson <NN>
export PATH="/Users/kavi/.local/node/bin:$PATH"
npm test
npm run build
git add work/vocab-art/svg/<NN> public/vocabulary-course/<NN> src/web/vocabularyCourseArt.json work/vocab-art/PROGRESS.md
git commit -m "vocab-art: lesson <NN> — <X> SVG illustrations, <Y> text-only"
```

---

## 3. Batch Schedule (Lessons 3–78)

| Batch | Lessons | Theme Focus |
|---|---|---|
| **Batch 1 (Pilot)** | `19, 29, 54, 15` | Feelings & moods, Fruit & nuts, Pets & farm animals, Clothes (225 items) |
| **Batch 2** | `9, 10, 12, 16, 22, 28, 30, 31, 37, 55, 56, 57, 62, 74` | Rooms, furniture, accessories, vegetables, meat/fish, wild animals, sports gear, tools (731 items) |
| **Batch 3** | `14, 17, 68, 69, 70, 71` | Body parts, appearance, sickness, injuries, medicine, fitness (335 items) |
| **Batch 4** | `4, 11, 32, 33, 72, 73` | Daily routines, chores, cooking, restaurants, town buildings, crime/law (376 items) |
| **Batch 5** | `44, 45, 46, 47, 48, 49, 50, 51, 52` | Vehicles, driving, directions, air travel, hotels, nature, weather (490 items) |
| **Batch 6** | `34, 35, 36, 38, 39, 40, 42, 43` | Jobs, office, business, money, banking, technology (372 items) |
| **Batch 7** | `13, 18, 20, 21, 23, 24, 25, 26, 27` | Moving/renting, personality, relationships, school, university, books, media (388 items) |
| **Batch 8** | `58, 59, 60, 61, 63, 64, 65, 66, 67` | Hobbies, music, movies, theater, sports actions, outdoor leisure (535 items) |
| **Batch 9** | `3, 5, 6, 7, 8, 41, 53, 75, 76, 77, 78` | Time diagrams, dimensions/adjectives, idioms, environment, discourse, science (498 items) |
| **Batch 10** | Legacy Cleanup (only after user sign-off) | Remove superseded Mulberry/OpenMoji/legacy PNG resolvers & update `ATTRIBUTION.md` |

Update `work/vocab-art/PROGRESS.md` after each completed lesson/batch so progress is resumable across any number of sessions.
