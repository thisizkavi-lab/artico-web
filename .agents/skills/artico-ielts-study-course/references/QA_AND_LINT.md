# Automated Verification, ASE Linter & Test Gate (`artico-ielts-study-v1`)

A worker model must **never** ship unverified prose, truncated tables, stubbed diagrams, or broken Practice routes. Every requirement in this course is enforced automatically by two files you will create in **Batch 1 (Foundation & Harness)**:

1. `scripts/check-ielts-study.mjs` — CLI Audit & Progress Reporter (runnable anytime during authoring to inspect unit-by-unit ASE warnings, word counts, and remaining unbuilt units).
2. `src/web/ieltsStudy.test.js` — Node `node:test` suite wired into `package.json` `"test"` script (must pass 100% alongside all existing repo tests before the final commit).

---

## 1. Structural & Coverage Gates (`COV01`–`COV08`)

| Gate ID | Exact Assertion | Why It Exists |
|---|---|---|
| `COV01` | `ALL_STUDY_UNITS.length === 85`, and the set of `unit.id` values matches all **85 `unitId`s** in `COURSE_CURRICULUM_MAP.md` (`21` overview + `11` listening + `14` reading + `29` writing + `10` speaking). | Prevents skipping units or inventing drifted slugs that break cross-links. |
| `COV02` | Reads `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/SECTION_INDEX.md` (all **173** numbered IDs `1.1`..`A.4`) plus `'Preamble'`, and asserts **every single one** appears in `unit.sourceSections` of at least one unit, with zero unknown IDs. | Guarantees 100% source fidelity across all 12 chapters and Appendix A. |
| `COV03` | Exact reference table counts in `src/web/ielts-study/wordBanks.js`:<br>• `commonConcepts50.length === 50` (`#1 People`..`#50 More`)<br>• `vocabPatterns59.length === 59` (`#1 Viable`..`#59 Unwind`)<br>• `topicPhrases16.length === 16`<br>• `optionalIdioms18.length === 18`<br>• `registerExpressions10.length === 10` (+ informal/slang boundary note)<br>• `grammarRepairs19.length === 19`<br>• `commonClaims29.length === 29`<br>• `officialReferences19.length === 19` (all `https://` URLs) | Prevents lazy `// ... remaining items` truncation of the reference tables. |
| `COV04` | Every unit has:<br>• `blocks[0].type === 'lead'` with non-empty `summary`, `whyItMatters`, `whatYouWillDo`<br>• `blocks.length >= 6`<br>• At least **2** non-prose structured blocks (`callout`, `steps`, `comparisonTable`, `trackCompare`, `annotatedSpecimen`, `contrastPair`, `decisionTree`, `svgDiagram`, `mediaSlot`, `wordBank`, `mythBuster`, `diagnosticCheck`, `selfCheck`)<br>• Instructional prose word count (excluding large `wordBank` data arrays) **between `320` and `1,150` words** (error if `< 280` or `> 1,500`) | Eliminates shallow 80-word stubs AND prevents bloated walls of text. |
| `COV05` | Track separation check:<br>• Every unit's `track` is `'academic'`, `'shared'`, or `'gt'`.<br>• Exactly **4** units have `track === 'gt'` (`r-gt-reading-comparison`, `w-gt-purpose-reader-register`, `w-gt-structure-openings-details`, `w-gt-conventions-informal-check`).<br>• Every `'gt'` unit renders the `[GT]` separation banner with a working link back to the corresponding Academic unit. | Guarantees General Training is complete yet strictly separated from Academic. |
| `COV06` | Prerequisite DAG check: Every `id` in `unit.needs` exists in `STUDY_UNIT_BY_ID` and has a strictly smaller global index in `ALL_STUDY_UNITS` than `unit` itself. | Ensures no unit relies on a concept taught only later in the sequence without an inline definition. |
| `COV07` | Internal link check: Every `[...](unit:<targetId>)` inline link and `trackCompare.generalTraining.linkUnit` resolves to an existing `unitId` in `STUDY_UNIT_BY_ID`. | Zero dead internal links. |
| `COV08` | Restraint check on `workbookPrompt`: Total `workbookPrompt` blocks across all 85 units is between `5` and `10`, and every `noteId` matches `/^study-[a-z0-9-]{3,60}$/` (valid key for `sanitiseIelts` in `src/web/ieltsState.js`). | Avoids turning every reading page into busywork form-filling while keeping persisted notes compatible with `ieltsState.js`. |

---

## 2. Artico Study English (ASE) Linter Rules (`ASE01`–`ASE14`)

Run on all **instructional explanation text** (`lead`, `section.title`, `prose.paragraphs`, `callout.body`, `steps.items`, `annotatedSpecimen.segments[].note`, `contrastPair.weak.whyItFails`, `contrastPair.controlled.whyItWorks`, `decisionTree.branches`, `diagnosticCheck.options[].rationale`, `selfCheck.items`).

**Exempt from sentence/contraction checks** (because they represent authentic exam/candidate English or deliberate error specimens):
- `annotatedSpecimen.segments[].text`
- `contrastPair.weak.text` and `contrastPair.controlled.text`
- `mediaManifest` spoken dialogue turns
- `wordBanks.js` example sentences and idiom strings
- `diagnosticCheck.prompt` when quoting a passage/statement
- Any block carrying an explicit `aseOverride: '<specific reason>'` field (use sparingly, max 10 across the entire course).

| Rule ID | Exact Check | Threshold |
|---|---|---|
| `ASE01` | Sentence word count (split on `[.!?]+(?:\s+|$)`, ignoring decimals like `6.5` and URLs) | `steps.items[].action`: warn `> 20`, **error `> 25`**<br>Other explanation text: warn `> 26`, **error `> 32`** |
| `ASE02` | Sentences per paragraph in `prose.paragraphs` | Warn `> 4`, **error `> 5`** |
| `ASE03` | Banned filler, hype, metaphor & abbreviation regex (case-insensitive word boundaries):<br>`\b(simply|obviously|of course|trick|tricks|hack|hacks|secret|secrets|magic|supercharge|skyrocket|delve|realm|tapestry|unlock|streak|streaks|xp|leaderboard|congrats|congratulations|awesome)\b` and `\b(e\.g\.|i\.e\.|etc\.|vs\.|cf\.)` | **Error** (Note: allow `mythBuster.items[].claim` to quote a myth like `"One general trick solves every question"`, never in `reality` or `prose`!) |
| `ASE04` | Contractions in explanation text: `\b(don't|doesn't|didn't|won't|can't|couldn't|shouldn't|wouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|it's|that's|there's|what's|who's|you're|we're|they're|I'm|you've|we've|they've|you'll|we'll|they'll)\b` | **Error** (write `do not`, `it is`, `cannot`, etc. in ASE prose) |
| `ASE05` | Em-dash `—` overuse in `prose.paragraphs` (`> 1` per unit) | Warn (prefer two short sentences with a full stop) |
| `ASE06` | Uncontrolled synonym drift in `prose` (`test-taker` instead of `you`/`candidate`; `rubric` instead of `criteria`) | Warn |
| `ASE07` | Glossary coverage: Every `**term**` matching `/^\*\*[a-z][a-z -]{2,28}\*\*$/i` used as a standalone defined term either resolves in `glossary.js` (`definition` ≤ 25 words) or is an intentional list lead-in | Check `Object.keys(GLOSSARY).length >= 35` covering all 17 terms in `1.7` plus core task terms (`chunking`, `percentage point`, `overview`, `topic sentence`, `qualifier`, `concession`, `comma splice`, `connected speech`, `shadowing`, `micro-listening`, etc.) |
| `ASE08` | Visual rhythm: Consecutive `prose` blocks without a structural/visual block in between | Warn `=== 3`, **error `>= 4`** (target `<= 2`) |
| `ASE09` | Callout brevity: `callout.body` word count | Warn `> 65`, **error `> 95`** |
| `ASE10` | Guarantee / false-promise ban anywhere in UI or prose: `/\b(guarantee[sd]?|guaranteed band|will get band [0-9]|100% band|instant band)\b/i` | **Error** |

---

## 3. Anti-Gamification Gate (`NOGAME01`–`NOGAME03`)

1. **`NOGAME01`:** Scan all source files in `src/web/ielts-study/**/*.{js,jsx,css}` for banned gamification UI patterns:
   - No streak state keys (`streak`, `dailyGoal`, `xp`, `points`, `confetti`, `trophy`, `unlockLesson`).
   - No locked-unit logic (`disabled` on TOC unit links).
   - No patronizing feedback strings (`Great job!`, `Awesome!`, `Well done! 🎉`, `Keep your streak`).
2. **`NOGAME02`:** Verify every `diagnosticCheck` block has `2` to `4` options, exactly `1` option with `correct: true`, and **every** option (both correct and incorrect!) has a non-empty analytical `rationale` (`>= 10` words).
3. **`NOGAME03`:** Verify `home/study` does **not** render a course-completion percentage bar or points counter.

---

## 4. Diagram, Media Slot & SSR Render Gates (`VIS01`–`VIS04`)

1. **`VIS01` (All 23 Constructive SVG Diagrams):**
   - Assert `DIAGRAM_IDS` exports all **23** exact IDs from `SVG_AND_MEDIA_SLOTS.md`.
   - Render each diagram via `renderToStaticMarkup(createElement(IeltsStudyDiagram, { diagramId, title: 'Test', caption: 'Test', alt: 'Test' }))`:
     - Must include `<svg`, `viewBox="0 0 720 `, and `role="img"`.
     - Must contain at least **8** geometric vector elements (`<(?:rect|path|line|circle|ellipse|polygon|polyline)\b/g`) — proving real constructive geometry, not a 1-box placeholder!
     - Must **not** contain `#000000`, `#000`, `rgb(`, or duplicate `id="..."` attributes when all 23 diagrams are rendered together on one test page!
2. **`VIS02` (Visual Inspection of Rendered Diagrams via Python `resvg_py`):**
   - Include a helper command in `scripts/check-ielts-study.mjs --render-diagrams` (using `/Users/kavi/Documents/kyoto/.venv/bin/python3` + `resvg_py` + `Pillow`, storing PNG contact sheets in `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/review/diagrams-sheet-1.png` and `diagrams-sheet-2.png` — add `work/ielts-study/review/` to `.gitignore`!).
   - Visually inspect both contact sheets with `read_file` to catch any overlapping labels, clipped boxes, or misaligned arrows!
3. **`VIS03` (All 10 Media Slots):**
   - Assert `MEDIA_SLOTS` contains all **10** `slotId`s from `SVG_AND_MEDIA_SLOTS.md`.
   - For `status === 'ready'` slots (`slot-l-correction`, `slot-s-part1-direct`), assert `public/<src>` exists on disk!
   - For all 10 slots, assert `title`, `teachingFocus`, `durationLabel`, `voices`, and `script` (`turns.length >= 1`) are non-empty, and `<MediaSlotBlock>` renders cleanly with `data-media-slot="<slotId>"`.
4. **`VIS04` (Full SSR Smoke Test Across All 85 Units + Practice Non-Regression):**
   - Render `IeltsCourse` via Vite SSR (`renderToStaticMarkup`) across:
     - `#/application/tests`
     - `#/application/tests/ielts/home/study` and `#/application/tests/ielts/home/practice`
     - All 5 `<area>/study` default routes (`overview`, `listening`, `reading`, `writing`, `speaking`)
     - **All 85 `#/application/tests/ielts/<area>/study?unit=<unitId>` routes**!
     - Existing Practice routes (`speaking/practice`, `writing/practice`, `guided/study`, `mocks/practice`, `simulation/practice`, plus active workbook `?task=r-tool-library`)
   - Assert zero thrown errors, non-empty HTML on every route, and exact preservation of all assertions in `src/web/ielts.test.js` and `scripts/application-render.test.mjs`!
