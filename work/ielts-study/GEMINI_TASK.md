# IELTS Study Course: Worker Execution Playbook (`artico-ielts-study-v1`)

You are **executing**, not re-architecting. A senior curriculum & frontend architect has already designed the entire 85-unit curriculum, 16-block UI system, Artico Study English (ASE) prose standard, 23 constructive `<svg>` diagrams, 10 audio/media slots, Academic-vs-General-Training separation, and automated QA gates.

Follow every specification below **religiously**. Do not skip sections, do not compress rich explanations into shallow 3-sentence stubs, do not add gamification, and **never touch Practice Mode**.

---

## 0. Mandatory Startup Sequence (Run at the Start of Every Session)

1. **Read ALL Five Skill Documents in Full Before Writing Any Code:**
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/SKILL.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/references/STE_WRITING_GUIDE.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/references/COURSE_CURRICULUM_MAP.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/references/UX_UI_AND_COMPONENTS.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/references/SVG_AND_MEDIA_SLOTS.md`
   - `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/references/QA_AND_LINT.md`
2. **Inspect Current Progress & Git State:**
   - Read `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/PROGRESS.md`.
   - Check git status in `/Users/kavi/Documents/kyoto/artico-web` (stay on local branch `vocab-art` unless the user specifies another branch; **NEVER push to `main`** and never push any branch unless explicitly asked).
   - If `scripts/check-ielts-study.mjs` already exists, run:
     ```bash
     export PATH="/Users/kavi/.local/node/bin:$PATH"
     cd /Users/kavi/Documents/kyoto/artico-web && node scripts/check-ielts-study.mjs --status
     ```
3. **Resume from the First Incomplete Batch** in Section 2 below.

---

## 1. Hard Engineering & Content Invariants

- **Runtimes (`AGENTS.md`):**
  - Python: `/Users/kavi/Documents/kyoto/.venv/bin/python3` (`resvg_py` & `Pillow` installed for diagram PNG review sheets).
  - Node / npm: Always prefix shell commands with `export PATH="/Users/kavi/.local/node/bin:$PATH"`.
- **Zero Gamification:**
  - Never add streaks, flame icons, XP, points, badges, confetti, course-completion percentage bars on `home/study`, locked units, or patronizing praise (`"Great job!"`, `"Awesome!"`).
- **Practice Mode Quarantine:**
  - **DO NOT EDIT** `src/web/IeltsWorkspace.jsx`, `src/web/ieltsContent.js`, or `src/web/ieltsState.js`.
  - Keep `ieltsAreas` (all 8 items) in `src/web/ieltsNavigation.js` untouched; only add `ieltsStudyPath(area, unit)`.
  - In `src/web/learning.js`, store `?unit=<slug>` on **`route.unit`** — **never** overwrite `route.page` (`'application'`)!
- **Source Fidelity (Zero Truncation):**
  - Before writing any unit, read its exact line range in `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/IELTS-Complete-Study-Notes.md` (using `SECTION_INDEX.md` for line numbers).
  - Every unit must have `blocks[0].type === 'lead'`, `>= 6` blocks, `<= 2` consecutive `prose` blocks, and `320–1,150` words of crisp ASE explanation (excluding `wordBank` array data).
  - Never write `// TODO` or truncate `wordBanks.js` tables: all **50** concepts, **59** patterns, **16** topic phrases, **18** idioms, **10** register items, **19** grammar repairs, **29** claims, and **19** official URLs must be present 100%.

---

## 2. Eight-Batch Execution Schedule

Execute in strict order. Complete, lint, verify, update `PROGRESS.md`, and commit each batch locally before starting the next batch.

### Batch 1 — Core Engine, Reference Banks, 23 SVG Diagrams, 10 Media Slots & Linter Harness
1. Add `work/ielts-study/review/` to `/Users/kavi/Documents/kyoto/artico-web/.gitignore`.
2. Update `src/web/learning.js` (allow `'unit'` query param → `route.unit`) and `src/web/ieltsNavigation.js` (export `ieltsStudyPath`).
3. Create `src/web/ielts-study/schema.js` and `src/web/ielts-study/glossary.js` (`>= 40` headwords with `<= 25`-word plain ASE definitions, including all 17 terms from `§1.7`).
4. Create `src/web/ielts-study/wordBanks.js` by parsing/transcribing **100% of all entries** from `§10.2` (50), `§10.4` (59), `§10.5` (16), `§10.6` (18), `§10.7` (10 + informal/slang note), `§10.8` (19), `§12.2` (29), and `§A.4` (19). Verify exact array lengths immediately!
5. Create `src/web/ielts-study/mediaManifest.js` with all **10** slots (`2` `ready` pointing to existing `audio/ielts/workshop.wav` and `audio/ielts/speaking-example.wav`, plus `8` `reserved` with complete multi-turn original scripts, `==stress/signal highlights==`, and `teachingFocus`).
6. Create `src/web/ielts-study/IeltsStudyDiagrams.jsx` implementing **all 23 constructive `<svg>` diagrams** specified in `SVG_AND_MEDIA_SLOTS.md` (`viewBox="0 0 720 H"`, unique `<defs>` prefixes `d01-`..`d23-`, `>= 8` vector primitives each, Artico warm-paper/slate/blue/amber/green palette).
7. Create `src/web/ielts-study/IeltsStudyBlocks.jsx`, `src/web/ielts-study/IeltsStudyView.jsx`, `src/web/ielts-study/ielts-study.css`, and `src/web/ielts-study/units/index.js` (wired to per-module arrays), and connect `route.view === 'study'` inside `src/web/IeltsCourse.jsx` (preserving all SSR `<h1>` strings required by `scripts/application-render.test.mjs`!).
8. Create `scripts/check-ielts-study.mjs` implementing all `COV`, `ASE`, `NOGAME`, and `VIS` checks PLUS `--render-diagrams` (using `/Users/kavi/Documents/kyoto/.venv/bin/python3` + `resvg_py` + `Pillow` to render all 23 SVGs into contact sheets `work/ielts-study/review/diagrams-sheet-1.png` and `diagrams-sheet-2.png`).
9. **Mandatory Visual Diagram Gate:** Run `--render-diagrams`, call `read_file` on **both** `diagrams-sheet-1.png` and `diagrams-sheet-2.png`, inspect every single diagram for text overlap, clipped boxes, or misaligned arrows, and fix exact coordinates in `IeltsStudyDiagrams.jsx` until all 23 diagrams read cleanly!
10. Run `npm test && npm run build` to prove zero Practice/SSR regressions, update `work/ielts-study/PROGRESS.md`, and commit Batch 1 locally.

---

### Batch 2 — Module 1A: Everything about IELTS · Parts 1.1 & 1.2 (`12 Units`)
- File: `src/web/ielts-study/units/overview-basics.js`
- Units (`12`): `ov-how-to-read`, `ov-what-ielts-measures`, `ov-choose-correct-test`, `ov-format-and-timing`, `ov-delivery-modes-2026`, `ov-scores-and-raw-marks`, `ov-assessment-terms`, `ov-preparation-cycle`, `ov-diagnose-and-error-log`, `ov-usable-vocabulary`, `ov-synonym-checks`, `ov-grammar-and-clear-meaning`.
- Source sections: `Preamble`, `1.1–1.7`, `2.1–2.9`.
- Verify: `node scripts/check-ielts-study.mjs --area overview` (0 ASE/NOGAME/VIS errors on authored units) + `npm test`, update `PROGRESS.md`, commit Batch 2.

---

### Batch 3 — Module 1B: Everything about IELTS · Parts 1.3 & 1.4 (`9 Units`)
- Files: `src/web/ielts-study/units/overview-language.js` (`5` units) & `src/web/ielts-study/units/overview-plan.js` (`4` units).
- Units (`9`): `ov-lang-50-concepts`, `ov-lang-precision-distinctions`, `ov-lang-59-patterns`, `ov-lang-phrases-idioms-register`, `ov-lang-grammar-repairs-editing`, `ov-targets-evidence-cycle`, `ov-patterns-practice-input`, `ov-materials-stress-readiness-testday`, `ov-claims-checklists-sources`.
- Source sections: `10.1–10.9`, `11.1–11.14`, `12.1–12.3`, `A.1–A.4`.
- Verify: All 21 `overview` units pass `check-ielts-study.mjs` with zero errors + `npm test`, update `PROGRESS.md`, commit Batch 3.

---

### Batch 4 — Module 2: Listening (`11 Units`)
- File: `src/web/ielts-study/units/listening.js`
- Units (`11`): `l-four-contexts`, `l-preview-period`, `l-complete-message-paraphrase`, `l-eight-distractors`, `l-forms-notes-tables-summaries`, `l-sentences-short-answers`, `l-multiple-choice-matching`, `l-maps-plans-diagrams`, `l-discussions-and-lectures`, `l-entry-and-recovery`, `l-diagnosis-microlistening-pitfalls`.
- Source sections: `3.1–3.19`.
- Verify: All 11 `listening` units pass `check-ielts-study.mjs` (including `diag-listening-timeline`, `diag-listening-map-bellford`, and slots `slot-l-correction`..`slot-l-part4-signposts`) + `npm test`, update `PROGRESS.md`, commit Batch 4.

---

### Batch 5 — Module 3: Reading (`14 Units`, Academic Primary + Separated `[GT]`)
- File: `src/web/ielts-study/units/reading.js`
- Units (`14`): `r-task-and-five-operations`, `r-passage-map`, `r-full-claim-anatomy`, `r-true-false-not-given`, `r-yes-no-not-given`, `r-matching-headings`, `r-matching-information`, `r-matching-features-and-endings`, `r-sentence-summary-completion`, `r-tables-flowcharts-diagrams`, `r-short-answers-multiple-choice`, `r-order-and-unfamiliar-words`, `r-pacing-diagnosis-speed`, plus separated `[GT]` unit `r-gt-reading-comparison`.
- Source sections: `4.1–4.22` (+ GT `4.1` & `1.6` comparison).
- Verify: All 14 `reading` units pass `check-ielts-study.mjs` + `npm test`, update `PROGRESS.md`, commit Batch 5.

---

### Batch 6 — Module 4A: Writing Foundations & Academic Task 1 (`16 Units`)
- Files: `src/web/ielts-study/units/writing-foundations.js` (`4` units) & `src/web/ielts-study/units/writing-academic-task1.js` (`12` units).
- Units (`16`): `w-purposes-and-criteria`..`w-process-timing-length-review` (`4`) + `w-a1-reporting-principle-and-jobs`..`w-a1-review-and-subskills` (`12`).
- Source sections: `5.1–5.10`, `6.1–6.21`.
- Verify: All 16 units pass `check-ielts-study.mjs` (including all 8 Task 1 diagrams `diag-task1-*` and `diag-pct-vs-points`) + `npm test`, update `PROGRESS.md`, commit Batch 6.

---

### Batch 7 — Module 4B: Writing Task 2 Essays & Separated `[GT]` Task 1 Letters (`13 Units`)
- Files: `src/web/ielts-study/units/writing-task2.js` (`10` units) & `src/web/ielts-study/units/writing-gt-task1.js` (`3` separated `[GT]` units).
- Units (`13`): `w-t2-prompt-layers-and-plan`..`w-t2-review-models-feedback-myths` (`10`) + `w-gt-purpose-reader-register`, `w-gt-structure-openings-details`, `w-gt-conventions-informal-check` (`3`).
- Source sections: `8.1–8.22`, `7.1–7.9`.
- Verify: All 29 `writing` units pass `check-ielts-study.mjs` + `[GT]` separation banner verified + `npm test`, update `PROGRESS.md`, commit Batch 7.

---

### Batch 8 — Module 5: Speaking (`10 Units`) + Full Test Gate & Production Build
- File: `src/web/ielts-study/units/speaking.js`
- Units (`10`): `s-interview-and-criteria`, `s-procedural-and-part1`, `s-part2-decode-and-prepare`, `s-part2-long-turn-and-timeframes`, `s-part3-operations-and-development`, `s-frameworks-unfamiliar-pauses`, `s-natural-language-and-functions`, `s-pronunciation-stress-pace`, `s-self-correction-and-review`, `s-models-shadowing-ai-myths`.
- Source sections: `9.1–9.24`.
- **Final Verification Gate:**
  1. Create `src/web/ieltsStudy.test.js` enforcing **100% of `COV01–COV08`, `ASE01–ASE10`, `NOGAME01–NOGAME03`, and `VIS01–VIS04`** (including SSR rendering all **85** Study units + all 5 Study hubs + Practice routes) and register `src/web/ieltsStudy.test.js` inside `package.json` `"scripts.test"`.
  2. Run:
     ```bash
     export PATH="/Users/kavi/.local/node/bin:$PATH"
     cd /Users/kavi/Documents/kyoto/artico-web
     node scripts/check-ielts-study.mjs --strict
     npm test
     npm run build
     ```
  3. Update `docs/ielts-academic.md` and `work/ielts-study/PROGRESS.md` (`85/85` units, `173/173` source sections, `23/23` inspected SVG diagrams, `10/10` media slots), and commit Batch 8 locally. **Do NOT push unless explicitly asked.**
