---
name: artico-ielts-study-course
description: Senior instructional architecture, Artico Study English (ASE) technical writing craft, editorial UI/UX block system, Academic-vs-General-Training separation, constructive technical SVG diagrams, reserved audio slots, and automated QA gates for building Artico's complete 85-unit IELTS Study Course (covering all 173 source sections of the 25,825-word IELTS reference) without gamification or Practice-mode regressions. Activate whenever planning, authoring, styling, auditing, or updating IELTS Study Mode in artico-web.
---

# Artico IELTS Study Course Skill (`artico-ielts-study-v1`)

This skill encodes **how a senior instructional designer, technical editor, and frontend architect turns a 25,825-word IELTS reference into an effortless, high-clarity, ungamified 85-unit Study Course** inside `/Users/kavi/Documents/kyoto/artico-web` — so any execution model produces textbook-grade teaching, zero logical gaps, crisp constructive `<svg>` diagrams, dignified reserved audio slots, and 100% automated test verification.

Before authoring or editing any IELTS Study code or content, load these four companion references in `references/`:
1. **`references/STE_WRITING_GUIDE.md`** — Artico Study English (ASE) writing rules (inspired by ASD-STE100 aerospace technical English), sentence/paragraph budgets, approved terminology, banned hype/gamification words, and `Requirement` / `Method` / `Option` / `Trap` epistemic labels.
2. **`references/COURSE_CURRICULUM_MAP.md`** — The exact **85-unit curriculum blueprint** across all 5 Study Modules (`01 Everything about IELTS`, `02 Listening`, `03 Reading`, `04 Writing`, `05 Speaking`), mapping **100% of all 173 numbered sections (`1.1`–`12.3` + `A.1`–`A.4`) + Preamble** and specifying Academic vs. General Training (`[GT]`) separation.
3. **`references/UX_UI_AND_COMPONENTS.md`** — Routing contract (`route.unit`), anti-gamification laws, two-column editorial reader UX, inline highlight/glossary syntax, and the **16 typed block schemas** (`src/web/ielts-study/`).
4. **`references/SVG_AND_MEDIA_SLOTS.md`** & **`references/QA_AND_LINT.md`** — Exact blueprints for **all 23 constructive `<svg>` diagrams**, **all 10 audio/media slots**, and the `COV` / `ASE` / `NOGAME` / `VIS` automated test & visual inspection gates.

Canonical source material on disk:
- `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/IELTS-Complete-Study-Notes.md` (25,825 words, 173 numbered sections)
- `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/SECTION_INDEX.md` (line-number index of all 173 section IDs)
- `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/source-notes/` (39 detailed upstream research notes for checking nuances)

---

## 1. Core Product & Pedagogical Laws (Never Violate These)

1. **Study Mode Only — Leave Practice Mode 100% Intact:**
   - Only build and route **Study Mode** (`route.view === 'study'` on `home`, `overview`, `listening`, `reading`, `writing`, `speaking`).
   - Do **not** modify `src/web/IeltsWorkspace.jsx`, `src/web/ieltsContent.js`, `src/web/ieltsState.js`, or any Practice/Guided/Mocks/Simulation flow. All existing assertions in `src/web/ielts.test.js` and `scripts/application-render.test.mjs` must stay green.
2. **Serious Adult Reference — Zero Gamification:**
   - IELTS candidates are serious learners with real university, career, or migration deadlines.
   - **Never** add streaks, flame icons, XP, points, badges, confetti, nagging course-completion percentage bars, locked units, or patronizing quiz praise (`"Awesome!"`, `"Great job!"`).
   - Every one of the 85 units is open for immediate reading in any order, with a quiet optional `[ ] Mark unit as read` reference tick and a single-line `Last opened` bookmark strip on `home/study`.
3. **Meta-to-Micro Flow — Never Leave the Reader Lost:**
   - Start every unit from the **meta view** (`lead`: what this is, why marks are lost here, what operation you will control).
   - State **official fixed facts (`Requirement`)** before coaching procedures (`Method`), and mark personal strategies explicitly as testable choices (`Option`) or common errors (`Trap`).
   - Define every technical term **at the exact sentence it first appears** (`**term**` linked to `glossary.js`), and end multi-part sections with a 1-sentence logical bridge to the next section.
4. **Academic Primary, General Training Cleanly Separated:**
   - Academic IELTS is the primary spine.
   - Compare Academic and General Training side-by-side (`trackCompare` block) where candidates choose a test or compare scoring/format (`1.2`, `1.3`, `1.6`, `5.1`).
   - Keep General Training Reading (`r-gt-reading-comparison`) and General Training Writing Task 1 Letters (`w-gt-purpose-reader-register`, `w-gt-structure-openings-details`, `w-gt-conventions-informal-check`) in **explicitly badged `[GT]` separated sections** with top-of-page track banners linking back to Academic, so Academic learners never confuse letter rules with visual-reporting rules.
5. **No Truncation or Shallow Stubs:**
   - Do **not** compress 400 words of rich operational distinctions from `IELTS-Complete-Study-Notes.md` into three generic sentences. Retain every concrete example, edge case, table row, preposition pattern, and caveat — rewritten into clean, rhythmic ASE blocks (`320–1,150` prose words + structured tables/specimens/diagrams per unit).
6. **Git & Runtime Safety (`AGENTS.md`):**
   - Work in `/Users/kavi/Documents/kyoto/artico-web` on branch `vocab-art` (unless instructed otherwise). **NEVER push to `main`** and never push any branch unless explicitly asked.
   - Python: `/Users/kavi/Documents/kyoto/.venv/bin/python3`
   - Node / npm: `export PATH="/Users/kavi/.local/node/bin:$PATH"`

---

## 2. The 7-Step Mental Model for Authoring Each Study Unit

Never write a unit from memory! Follow this exact sequence for every single unit in `COURSE_CURRICULUM_MAP.md`:

1. **Read the Exact Source Lines First:**
   Look up the unit's `sourceSections` line numbers in `work/ielts-study/source/SECTION_INDEX.md` and read every line of those sections in `IELTS-Complete-Study-Notes.md` (plus the matching file in `source-notes/` if an example needs context). List every distinct teaching point, distinction, list item, and caveat so **zero points are dropped**.
2. **Establish the Meta Frame (`lead`):**
   Write 3 crisp ASE fields: `summary` (what this operation is in the whole exam), `whyItMatters` (the exact failure that costs marks without it), and `whatYouWillDo` (the concrete decision skill gained).
3. **Separate Epistemic Status (`Requirement` → `Method` → `Option` → `Trap`):**
   Pull official numbers, timing, word minimums, and scoring facts into a `callout(variant: 'requirement')` with official `https://ielts.org/...` citation. Never disguise a teacher heuristic (`160–200 words`, `Task 2 first`, `all capitals`, `3 features in an overview`) as an official rule — wrap it in `callout(variant: 'option')` or debunk false ceilings in `callout(variant: 'trap')`.
4. **Choose the Visual & Structural Rhythm (Max 2 Consecutive `prose` Blocks):**
   Pair every explanation with the exact visual instrument that makes the idea effortless to grasp:
   - Spatial / quantitative / flow relationship → `svgDiagram` (from the 23 blueprints in `SVG_AND_MEDIA_SLOTS.md`).
   - Procedural sequence → `steps` (1 imperative verb per step; `condition` badge before `action`).
   - Multi-column distinction → `comparisonTable` or `trackCompare`.
   - Real passage / prompt / report / essay / letter mechanics → `annotatedSpecimen` with **visible right-margin explanations** (`[1]`, `[2]`, `[3]`).
   - Subtle error vs. accurate fix → `contrastPair` (`weak` with failure tag vs. `controlled` with mechanism tag).
   - Live audio / spoken prosody / distractor shift → `mediaSlot` (using committed WAV where `ready`, or rich spoken script blueprint where `reserved`).
5. **Enforce ASE Sentence Discipline (`STE_WRITING_GUIDE.md`):**
   Check every explanation sentence: active voice, present tense for rules, zero contractions (`do not`, `it is`, `cannot`), ≤ 20 words target (hard max 32), ≤ 4 sentences per paragraph, `==pivot highlights==` only on 1–4 decisive words, and `**glossary**` tags on first-use technical terms.
6. **Add One Sharp Analytical Check (`diagnosticCheck`):**
   Write a realistic micro-scenario testing the hardest trap in the unit (for example, missing comparison = `NOT GIVEN` vs. contradiction = `FALSE`; `20 percentage points` vs. `20%`; study author vs. study critic). Provide calm, factual rationales on **every** option.
7. **Run the Linter & Visual Check Immediately:**
   Run `node scripts/check-ielts-study.mjs` after each batch of units to catch any `COV`, `ASE`, `NOGAME`, or `VIS` violation immediately while context is fresh.

---

## 3. Gold-Standard Unit Exemplar (Match This Exact Craft Level)

```js
{
  id: 'w-a1-numbers-and-percentages',
  area: 'writing',
  partId: 'w-part-a1',
  partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
  track: 'academic',
  title: 'Values, approximations, and percentage points',
  minutes: 6,
  sourceSections: ['6.10', '6.11'],
  needs: ['ov-assessment-terms', 'w-a1-decode-and-main-features'],
  blocks: [
    {
      type: 'lead',
      summary: 'Academic Task 1 visuals mix exact numbers, plotted estimates, and percentage shares.',
      whyItMatters: 'Confusing a percentage-point shift with a relative percentage change makes an otherwise fluent sentence factually wrong.',
      whatYouWillDo: 'Report exact and approximate values honestly, preserve units, and separate percentage points from relative change.'
    },
    {
      type: 'section',
      id: 'approximations-and-units',
      title: 'How do I report plotted values and units accurately?'
    },
    {
      type: 'prose',
      paragraphs: [
        'If a table or label states an exact figure, report that figure directly. If a point sits between two gridlines on a chart, add an **approximation** word so you do not claim false precision.',
        'Match the qualifier to the position of the point. Words such as ==nearly== and ==just under== sit below the gridline. ==Just over== sits slightly above it. ==About==, ==around==, and ==approximately== work on either side.'
      ]
    },
    {
      type: 'callout',
      variant: 'trap',
      title: 'Do not invent decimal precision or drop the unit',
      body: 'A chart grid running in steps of `10` cannot support a reading like `23.74`. Report `just under 24`. Always check the axis scale: `30` on an axis labelled `in thousands` means `30,000` people, not `30` people.'
    },
    {
      type: 'contrastPair',
      title: 'Using "respectively" clearly against overloading a list',
      weak: {
        tag: 'Hard to track',
        text: 'Rail, bus, cycling, walking, and ferry recorded 42, 31, 14, 9, and 4 percent, respectively.',
        whyItFails: 'Five items force the reader to count backward across the sentence to pair each mode with its figure.'
      },
      controlled: {
        tag: 'Clear pairing',
        text: 'Rail and bus accounted for `42%` and `31%` of trips, respectively, while the remaining three modes each stayed below `15%`.',
        whyItWorks: 'Pairs two items cleanly with "respectively" and groups the minor categories meaningfully.'
      }
    },
    {
      type: 'section',
      id: 'percentage-points',
      title: 'What is the difference between percentages and percentage points?'
    },
    {
      type: 'prose',
      paragraphs: [
        'A **percentage** expresses a part out of `100`. A **percentage point** is the arithmetic difference between two percentage figures. A **relative percentage change** compares that difference against the starting value.',
        'Read the visual below to see how the same shift from `60%` to `40%` produces two different numbers.'
      ]
    },
    {
      type: 'svgDiagram',
      diagramId: 'diag-pct-vs-points',
      title: 'Percentage-point change against relative change (60% to 40%)',
      caption: 'A move from 60% to 40% is a 20-percentage-point fall, or a 33.3% relative fall (20 ÷ 60 × 100). If total visits doubled, 40% can represent more people than 60% did earlier. Practice data, invented.',
      alt: 'Bar comparison showing 60 percent in 2015 and 40 percent in 2025: 20 percentage points difference versus 33.3 percent relative decrease, plus headcount total inset.'
    },
    {
      type: 'comparisonTable',
      caption: 'Two worked examples and useful fraction equivalents',
      headers: ['Movement on chart', 'Percentage-point change', 'Relative percentage change', 'Clear fraction alternative'],
      rows: [
        ['`60%` down to `40%`', 'Fell by ==20 percentage points==', 'Fell by ==33.3%== (`20 ÷ 60 × 100`)', 'Fell by ==one-third=='],
        ['`20%` up to `30%`', 'Rose by ==10 percentage points==', 'Rose by ==50%== (`10 ÷ 20 × 100`)', 'Rose by ==half=='],
        ['`24%` share in one year', 'Not a change measure', 'Not a change measure', '==Just under a quarter== (`25%`)']
      ]
    },
    {
      type: 'callout',
      variant: 'trap',
      title: 'A falling share does not prove a falling total number',
      body: 'A category share can fall from `60%` to `40%` while the actual number of users rises, if the overall population grew fast enough. Do not claim that user numbers fell unless the visual supplies total headcounts.'
    },
    {
      type: 'diagnosticCheck',
      title: 'Check the distinction',
      prompt: 'A pie chart shows that online sales rose from 20% of a shop’s revenue in 2018 to 30% in 2024. Total revenue is not given. Which sentence is supported?',
      options: [
        { label: 'Online sales revenue was 10% higher in 2024 than in 2018.', correct: false, rationale: 'Confuses percentage points with relative growth AND claims total money rose without total revenue data.' },
        { label: 'The share of revenue from online sales increased by 10 percentage points, or 50% in relative terms.', correct: true, rationale: 'Reports "share of revenue" accurately and distinguishes the 10-point difference from the 50% relative increase (10 ÷ 20).' },
        { label: 'In-store sales earned less money in 2024 than in 2018.', correct: false, rationale: 'In-store share fell from 80% to 70%, but without total revenue figures you cannot know whether total money fell.' }
      ]
    }
  ]
}
```
