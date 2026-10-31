# IELTS Academic application track

Entry: `#/application/tests` → `#/application/tests/ielts/home/study`.

## Learner-facing navigation (October 2026 refresh)

The IELTS landing page has **six destinations**: Everything about IELTS,
Listening, Reading, Writing, Speaking, and Mock Tests. This matches Artico's
Social Fluency principles: understated blue/paper surfaces, quiet context text,
one clear action per card, and yellow notes beside worked examples.

- **Study** opens the full existing curriculum. The manual-orientation unit
  remains valid for old links but is not the learner's first lesson.
- **Practice** gives each skill its own interactive drills and review.
- **Mock Tests** groups **Guided test** (four short annotated workshop sets)
  and **Simulated test** (full simulation not yet released).
- The older `guided`, `mocks`, and `simulation` URLs remain reachable to
  preserve existing bookmarks, history, and attempt references.
- The two-task timed Writing rehearsal is available; Listening, Reading and
  Speaking full-length forms remain incomplete. Never label shortened sets as
  official or calibrated mocks.

The current feature branch changes presentation and navigation, not the IELTS
question pool, content grading, storage format, or running workspaces.
It does not deploy to GitHub Pages until reviewed and merged through the
repository's normal process.

## Released structure

The IELTS track provides two complementary, non-overlapping modes accessible via the top-level mode toggle:

1. **Study Mode (`artico-ielts-study-v1`):** An uncompromised, 85-unit pedagogical reference manual structured into five modules:
   - Module 1: Everything about IELTS (`overview`, 21 units) covering test structure, delivery modes, 9-band scale, language reference banks, and study planning.
   - Module 2: Listening (`listening`, 11 units) covering all 4 section contexts, question types, distractor analysis, and recovery techniques.
   - Module 3: Reading (`reading`, 14 units) covering passage mapping, claim analysis, all question types, pacing, and separated General Training reading.
   - Module 4: Writing (`writing`, 29 units) covering writing foundations, Academic Task 1 data/process/map reporting, Task 2 essay architecture, and separated General Training Task 1 letters.
   - Module 5: Speaking (`speaking`, 10 units) covering the 3-part face-to-face interview, long turn preparation, abstract discussion, pronunciation, and criteria.
   Zero gamification: no streaks, XP, points, badges, confetti, or locked units.

2. **Practice Mode:** Six visible learner destinations, with existing guided exercises, individual skill rehearsals, and a future full-simulation screen grouped under Mock Tests.

The IELTS Study / Practice control and all instructional content are English-only. Other courses retain their existing explanation language.

## Study Course Architecture (`artico-ielts-study-v1`)

- **Full Reference Coverage:** All 173 source sections (`1.1–12.3`, `A.1–A.4`, and Preamble) from the 25,825-word syllabus are faithfully authored into 85 units without simplification, truncation, or superficial summaries.
- **Artico Study English (ASE):** Every unit follows strict instructional writing standards (320–1,150 explanation words per unit, short sentences, paragraph bounds, zero hype or empty promises, clear condition-before-action methods).
- **Constructive SVG Diagrams:** 23 technical SVG diagrams (`IeltsStudyDiagrams.jsx`) illustrating band scales, score calculation, pacing timelines, essay structures, question workflows, and speaking phases, visually inspected for label clarity.
- **Media Slots:** 10 media slots (`mediaManifest.js`) including 2 active synthetic audio listening workshops and 8 reserved curriculum audio slots containing verbatim scripts.
- **Reference Word Banks:** Comprehensive reference banks in `wordBanks.js` containing 50 common concepts, 59 vocabulary patterns, 16 topic phrases, 18 optional idioms, 10 register expressions, 19 grammar repairs, a filterable 29-claim myth buster, and 19 official reference URLs.
- **General Training Separation:** General Training units are explicitly tagged (`track: 'gt'`) and quarantined from the primary Academic curriculum.

## Practice Content in this release

- Four skill introductions with criteria, working methods, decoded examples, and reflection workbooks.
- Six Speaking Part 2 workshops with general follow-up questions.
- Six Task 2 prompts, one data-based Task 1, and a shared-clock 60-minute Writing rehearsal.
- An eight-question Reading mini-set and a three-question evidence drill sharing explicitly tracked material.
- A five-question Listening workshop with an original script and a synthetic recording.
- Four guided workshop collections with decreasing support. These are not four full mock exams.
- An explicit full-simulation readiness screen. It does not start an incomplete or falsely labelled exam.

Full-length Reading, Listening, and Speaking forms, a linked full simulation,
human assessment, calibrated scores, and a larger unseen content pool remain content-production work.
No official band is inferred from shortened sets, a word count, or a transcript.

## State and timing

`artico.ielts.workbook.v1` is separate from existing course progress. Notes and
attempts are stored on the device, not an account. Writes happen before route changes.
The feature boundary stays mounted within IELTS. Existing attempts survive reload;
timed runs restore a deadline rather than receiving a new clock. Practice can pause;
the Writing rehearsal cannot. Answers arriving after the deadline are rejected.

History preserves original submissions, separate revisions, flags, reflections,
content version, assistance, seen-material status, and interruptions. Shared reading
paragraphs and Writing components count as exposure. A retake is not a fresh diagnostic.

Optional microphone recordings are never uploaded or placed in localStorage.
They remain in the tab and can be downloaded explicitly. Leaving or refreshing
discards undownloaded audio; the UI explains this before recording.

## Audio provenance

Both WAV files under `public/audio/ielts/` contain original scripts authored for this
release, rendered locally with the macOS Samantha English voice. They are labelled
synthetic, not official IELTS recordings or assessed candidate performances.
`node scripts/build-ielts-audio.mjs` is the optional macOS authoring step; deployment
uses the committed files and does not call an external speech API.

## Verification

- `npm test` runs both test suites:
  - `src/web/ielts.test.js`: Practice Mode verification (162 tests covering deep links, content/evidence references, asset existence, storage round trips, exposure, deadlines, pauses, shared Writing time, post-deadline answer rejection, and idempotent completion).
  - `src/web/ieltsStudy.test.js`: Study Mode verification (8 test suites asserting coverage COV01–06 of all 85 units, visual diagrams VIS01, media slots VIS03, anti-gamification NOGAME01–03, and routing / GT separation).
  - Total: 170 passing tests.
- `node scripts/check-ielts-study.mjs --strict`: Full static analysis enforcing schema integrity, glossary cross-references, ASE writing rules, word count boundaries, paragraph limits, and zero gamification.
- `npm run build`: Production Vite build validation.

Official sources are linked from Overview and Skill Mocks. Provider examples stay
on their own sites; book pages, proprietary question banks, and private research
screenshots are not included in this repository.
