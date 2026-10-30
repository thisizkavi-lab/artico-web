# UX, UI, Block Schema & Component Specification (`artico-ielts-study-v1`)

This reference defines the exact **editorial UX, visual hierarchy, anti-gamification laws, routing integration, CSS layout system, and 16-block data schema** for the IELTS Study Mode in `artico-web`.

Follow these specifications literally. Do **not** invent ad-hoc card wrappers, raw HTML strings, or gamified widgets.

---

## 1. Design North Star & Anti-Gamification Laws

The target reader is a **serious adult or university/professional candidate** preparing for a high-stakes examination. Treat their attention and intelligence with respect.

### Hard UI & UX Prohibitions (Tested in `src/web/ieltsStudy.test.js`)
1. **ZERO Gamification:**
   - No streaks, flame icons, daily check-in counters, XP, points, badges, trophies, confetti, or celebratory animations.
   - No overall "Course 14% Complete" nagging progress bar on the IELTS Study Home.
   - No locked or gated units: every one of the 85 Study units is immediately clickable in any order.
   - No patronizing feedback copy (`"Great job!"`, `"Awesome!"`, `"You nailed it!"`, `"Oops, try again!"`). On `diagnosticCheck` blocks, use factual analytical labels: **`Correct — supported by the rule`** or **`Not supported — check the distinction`**, followed immediately by the explanation.
2. **ZERO Hidden-by-Default Essential Teaching:**
   - Do **not** hide core explanations or specimen annotations behind closed accordions that force the learner to click 5 buttons per page just to read the lesson.
   - In `annotatedSpecimen`, render **both** the marked specimen text **and** its numbered margin explanations visibly side-by-side on desktop (stacked cleanly below on mobile), with hover/click highlighting the paired `[n]` span and note.
   - Use `<details>` **only** for genuinely secondary material:
     1. Mobile table-of-contents drawer (`< 880px`).
     2. Appendix A provenance note on `ov-claims-checklists-sources`.
     3. Optional audio transcript toggle when a live audio file is being tested on first listen.
3. **ZERO Practice Mode Breakage:**
   - Do **not** alter `src/web/IeltsWorkspace.jsx`, `src/web/ieltsContent.js`, `src/web/ieltsState.js`, or any `route.view === 'practice'` screen.
   - Preserve `ieltsAreas` (all 8 items) in `src/web/ieltsNavigation.js` and add `ieltsStudyPath(area, unit)` alongside `ieltsPath`.

---

## 2. Routing & Existing-Test Compatibility Contract

### 2.1 Exact Route Extension (`src/web/learning.js` & `src/web/ieltsNavigation.js`)
In `src/web/learning.js` inside `if (id === 'tests' && view === 'ielts')`:
- **CRITICAL:** Never overwrite `route.page` (which is `'application'`). Store the Study unit slug on **`route.unit`**!
- Extend the query parameter allowlist from `['task', 'attempt']` to `['task', 'attempt', 'unit']`:
  ```js
  for (const key of ['task', 'attempt', 'unit']) {
    if (/^[a-zA-Z0-9-]{1,100}$/.test(input.get(key) ?? '')) query.set(key, input.get(key))
  }
  return {
    path: `/application/tests/ielts/${area}/${mode}${query.size ? `?${query}` : ''}`,
    page: 'application', id: 'tests', exam: 'ielts', area, view: mode,
    ...(query.has('task') ? { task: query.get('task') } : {}),
    ...(query.has('attempt') ? { attempt: query.get('attempt') } : {}),
    ...(query.has('unit') ? { unit: query.get('unit') } : {}),
  }
  ```
- In `src/web/ieltsNavigation.js`, keep `ieltsAreas`, `ieltsArea`, and `ieltsPath` intact, and export:
  ```js
  export function ieltsStudyPath(area = 'overview', unit) {
    return `${IELTS_BASE}/${area}/study${unit ? `?unit=${encodeURIComponent(unit)}` : ''}`
  }
  ```

### 2.2 Mandatory SSR Headings (`scripts/application-render.test.mjs` Compatibility)
`scripts/application-render.test.mjs` server-renders IELTS routes and asserts exact heading strings. Make sure:
- `#/application/tests/ielts/home/study` renders `<h1>IELTS Academic</h1>` in its masthead.
- `#/application/tests/ielts/overview/study` renders the module masthead containing `Everything about IELTS` (and defaults to the first unit `ov-how-to-read` when `route.unit` is omitted or invalid).
- `#/application/tests/ielts/listening/study`, `.../reading/study`, `.../writing/study`, and `.../speaking/study` each render their module header (`Listening`, `Reading`, `Writing`, `Speaking`) above the two-column Study Reader and default to that module's first unit when `route.unit` is omitted.

---

## 3. Screen-by-Screen UX Flow

### 3.1 Screen A: IELTS Study Home (`#/application/tests/ielts/home/study`)
Replaces the old flat 8-card Study directory (while `home/practice` keeps the Practice hub!) with a calm, structured **5-Module Study Manual Index**:

1. **Editorial Masthead:**
   - `<h1>IELTS Academic</h1>`
   - Lead in ASE: *"A complete technical reference for IELTS Academic, with General Training differences marked side by side. Read in order or open the exact skill you need."*
   - Track Key Strip (quiet inline legend):
     - `[Academic]` Primary track · `[Shared]` Both Academic & General Training · `[GT]` Separated General Training sections
2. **Quiet Bookmark Strip (Conditional — Only if `store.state.notes['study-last-unit']` resolves to a valid unit):**
   - Single bordered paper bar: `Last opened: [Module] · [Unit Title]` with `Continue reading →` link. Zero streaks, zero percentages.
3. **The 5-Module Study Spine (In Exact Pedagogical Order):**
   Render 5 structured editorial module cards (`overview` → `listening` → `reading` → `writing` → `speaking`):
   - Module number (`01`–`05`), `CurriculumIcon`, Module Title, concise 1-sentence ASE scope, official exam fact badge (e.g., `4 parts · 40 questions · ~30 min`), and **grouped Part links** inside the card so a learner can either click **`Start module →`** (unit 1) OR jump directly into a specific Part (e.g., *Part 4.2 · Academic Task 1: Reporting Visuals (12 units)* or *Part 4.4 · [GT] Task 1 Letters (3 units)*).
4. **Practice Handoff Footer:**
   - Quiet secondary notice at bottom: *"Ready to test an operation under a clock? Switch to Practice mode above for guided sets, skill rehearsals, and workbooks."*

### 3.2 Screen B: Two-Column Skill Study Reader (`#/application/tests/ielts/<area>/study?unit=<unitId>`)
Width: `min(100%, 1140px)` (`ie-page-wide` container).

1. **Compact Module Header Bar:**
   - Module icon + Module title (`Everything about IELTS` / `Listening` / `Reading` / `Writing` / `Speaking`) + official timing/task spec strip (`ie-facts`).
2. **Two-Column Grid (`260px` Sticky Outline + `minmax(0, 820px)` Main Article):**
   - **Left Column — Study Outline (`<nav aria-label="Module study units">`):**
     - Sticky on desktop (`position: sticky; top: 112px; max-height: calc(100vh - 132px); overflow-y: auto`).
     - On screens `< 880px`, collapses cleanly into a `<details className="ies-mobile-toc">` bar directly above the unit header (`Contents · Unit 4 of 14: True, False, and Not Given`).
     - Quick filter input (`<input type="search" placeholder="Filter units…" aria-label="Filter units in this module" />`) for modules with ≥ 10 units.
     - Grouped by **Part** (`Part 3.1 · Reading Architecture`, `Part 3.2 · Truth, Views & Matching`, etc.).
     - General Training parts (`Part 3.4`'s GT unit and `Part 4.4` GT Letters) carry a subtle **`GT`** pill badge (`className="ies-badge ies-badge-gt"`) and a top rule separating them visually from the Academic spine.
     - Active unit highlighted with `--ie-tint` background, `3px` `--ie-accent` left border, and `aria-current="page"`. Units marked read by the learner show a quiet muted `✓` (`aria-label="Marked read"`).
   - **Right Column — Main Editorial Unit (`<article className="ies-article">`):**
     - **Unit Header:**
       - Overline kicker: `PART 4.2 · ACADEMIC TASK 1 · UNIT 10 OF 29` + estimated study duration (`~6 min study`) + Track Badge (`Academic` | `Shared` | `General Training`).
       - If `unit.track === 'gt'`, render a dedicated **General Training Separation Banner** right above the title:
         > **General Training Track.** This unit covers General Training Task 1 (situational letters). Preparing for IELTS Academic? [Go to Academic Task 1: Reporting Visuals →](#/application/tests/ielts/writing/study?unit=w-a1-reporting-principle-and-jobs)
       - Unit Title (`<h2>` or semantic heading scaled as editorial `clamp(28px, 3.4vw, 38px)` in `Newsreader` serif so the module `<h1>` stays unique per page!).
       - Source provenance tag (subtle muted metadata: `Covers §6.10–6.11`).
     - **Structured Content Blocks** (rendered from `unit.blocks`, max `66ch` on prose, full `820px` available for two-column specimens, tables, and diagrams).
     - **Unit Footer (`ies-unit-footer`):**
       - Optional quiet checkbox button: `[ ] Mark unit as read` (toggles `store.state.notes['study-read-' + unit.id]`, zero fanfare).
       - Previous Unit (`← Previous: ...`) and Next Unit (`Next: ... →`) cards. At the end of a module, `Next` links cleanly to Unit 1 of the next module in the 5-Module Study Spine (e.g., end of `Listening` → Unit 1 of `Reading`), plus a secondary `Practise this skill →` link.

---

## 4. Inline Emphasis, Highlight & Glossary System

Never use random bolding, ALL CAPS shouting, or multi-sentence yellow highlights. Every inline mark has **one specific job** parsed cleanly by `<StudyRichText text={...} />`:

| Markup in JS String | Rendered Element & CSS | Exact Rule for When to Use |
|---|---|---|
| `**term**` (matching an entry in `glossary.js`) | `<GlossaryTerm id="term">` — bold text with `1px dotted` bottom underline + accessible click/focus definition popover | First occurrence of an approved technical term in a unit (`distractor`, `scope`, `paraphrase`, `coherence`, `percentage point`, `register`, `chunking`). |
| `**phrase**` (not a glossary headword) | `<strong>` (`font-weight: 650; color: var(--ie-ink)`) | Short structural lead-in inside a list item or contrast label (max 5 words). Never bold a whole sentence. |
| `==pivot word==` | `<mark className="ies-mark">` (`background: #fef0c7; padding: 1px 5px; border-radius: 3px; font-weight: 600`) | **Only** for 1–4 words that decide a question or trap (`==some==`, `==not==`, `==Room 18==`, `==20 percentage points==`, `==unable to==`). |
| `` `exact entry` `` | `<code className="ies-literal">` (`background: #f1f3f2; border: 1px solid #dfe3e2; padding: 1px 6px; border-radius: 4px; font-family: inherit; font-weight: 600`) | Exact answer strings, word-limit instructions (`ONE WORD AND/OR A NUMBER`), or grammatical patterns (`prone to + noun`). |
| `[link text](https://...)` | External `<a>` (`target="_blank" rel="noreferrer"`) | Official IELTS / British Council / IDP verification links only. |
| `[link text](unit:w-a1-overview)` | Internal `<a>` via `ieltsStudyPath(...)` | Cross-referencing a related Study unit (e.g., linking from Writing vocabulary to `ov-lang-50-concepts`). |

---

## 5. Complete 16-Block Schema (`src/web/ielts-study/schema.js`)

Every unit in `src/web/ielts-study/units/*.js` is a plain JS object validated by `validateUnit(unit)`:

```js
{
  id: 'w-a1-numbers-and-percentages',        // Unique kebab-case slug
  area: 'writing',                           // 'overview' | 'listening' | 'reading' | 'writing' | 'speaking'
  partId: 'w-part-a1',                       // Group ID within the module TOC
  partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
  track: 'academic',                         // 'academic' | 'shared' | 'gt'
  title: 'Values, approximations, and percentage points',
  minutes: 6,                                // Honest study reading estimate (integer 4..10)
  sourceSections: ['6.10', '6.11'],          // Exact IDs from SECTION_INDEX.md (or ['Preamble'])
  needs: ['ov-assessment-terms', 'w-a1-decode-and-main-features'], // Prerequisite unitIds earlier in spine
  blocks: [ /* Array of typed blocks from the 16 types below */ ]
}
```

### Visual Rhythm Rule (Enforced by Linter `ASE08`)
Never place more than **2 `prose` blocks in a row**. Every concept must alternate crisp ASE prose with a concrete structured artifact (`callout`, `steps`, `comparisonTable`, `trackCompare`, `annotatedSpecimen`, `contrastPair`, `decisionTree`, `svgDiagram`, `mediaSlot`, or `diagnosticCheck`).

### The 16 Block Types & Exact Data Shapes

1. **`lead`** — *(Required as `blocks[0]` on every unit)*
   ```js
   { type: 'lead', summary: '...', whyItMatters: '...', whatYouWillDo: '...' }
   ```
   Opens the unit from the meta view: 1–2 sentences on what this unit covers, 1 sentence on why candidates lose marks without it, and 1 sentence on what operation you will control by the end.

2. **`section`** — *(Semantic H3 subheading + optional 1-sentence bridge from previous section)*
   ```js
   { type: 'section', id: 'pct-vs-points', title: 'How do percentages and percentage points differ?' }
   ```
   Title should read as a clear learner question or direct action (`STE_WRITING_GUIDE.md` Rule 6.1).

3. **`prose`** — *(1–3 short ASE paragraphs; max 4 sentences per paragraph)*
   ```js
   { type: 'prose', paragraphs: ['First short ASE paragraph.', 'Second short ASE paragraph with bridge.'] }
   ```

4. **`callout`** — *(The 4 official epistemic labels)*
   ```js
   {
     type: 'callout',
     variant: 'requirement', // 'requirement' | 'method' | 'option' | 'trap'
     title: 'Minimum word counts are fixed',
     body: 'Task 1 requires at least `150` words. Task 2 requires at least `250` words.',
     sourceLabel: 'Official Academic Writing format', // optional
     sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing' // optional
   }
   ```
   - `requirement`: `#eaf0fc` tint, `3px solid #285bcc` left border, `Requirement` pill.
   - `method`: `#f4f5f2` tint, `3px solid #263b3b` left border, `Method` pill.
   - `option`: `#fbfaf7` paper, `1.5px dashed #657273` border, `Option` pill.
   - `trap`: `#fff6ee` tint, `3px solid #b84a14` left border, `Trap` pill.

5. **`steps`** — *(Numbered procedural routine; 1 imperative action per step, condition first)*
   ```js
   {
     type: 'steps',
     title: 'Six-step procedure for True / False / Not Given',
     items: [
       { condition: 'Before scanning the passage', action: 'Read the statement as one complete claim.', why: 'Scanning a single noun misses qualifiers like "only" or "before".' },
       { action: 'Locate the relevant section of the passage.' },
     ]
   }
   ```

6. **`comparisonTable`** — *(Structured multi-column matrix)*
   ```js
   {
     type: 'comparisonTable',
     caption: 'Trend constructions: verb phrase against noun phrase',
     headers: ['Function', 'Verb construction', 'Noun construction'],
     rows: [
       ['Increase', 'Sales ==rose sharply==.', 'There was a ==sharp rise== in sales.'],
     ]
   }
   ```

7. **`trackCompare`** — *(Side-by-side Academic vs. General Training split card)*
   ```js
   {
     type: 'trackCompare',
     title: 'Writing Task 1: Academic against General Training',
     academic: { label: 'IELTS Academic (Primary)', points: ['Report visual information (chart, table, map, or process).', 'At least `150` words; neutral objective register; zero personal opinion.'] },
     generalTraining: { label: 'IELTS General Training', points: ['Write a letter for a given situation and recipient.', 'At least `150` words; personal, semi-formal, or formal register.'], linkUnit: 'w-gt-purpose-reader-register', linkLabel: 'Open GT Letter units' },
     shared: 'Both versions share the same 60-minute clock with Task 2, and Task 2 carries twice the weight of Task 1 in both.'
   }
   ```

8. **`annotatedSpecimen`** — *(Passage, transcript, prompt, report, letter, or essay with gutter margin callouts)*
   ```js
   {
     type: 'annotatedSpecimen',
     kind: 'report', // 'passage' | 'transcript' | 'prompt' | 'report' | 'letter' | 'essay' | 'word-record' | 'note-card'
     title: 'Annotated body paragraph: explicit mechanism and example',
     provenance: 'Original instructional specimen · not a memorised script or certified band score',
     segments: [
       { id: 1, text: 'A reliable bus service can help workers accept jobs farther from home.', label: 'Main point', note: 'States one clear claim in plain English and qualifies certainty with "can".' },
       { id: 2, text: 'Frequent services make arrival times more predictable, so a longer commute becomes practical.', label: 'Mechanism', note: 'Explains how reliability changes worker decisions instead of jumping straight to the conclusion.' },
       { id: 3, text: 'For example, a shift worker without a car can take an early factory role if a bus arrives before the shift starts.', label: 'Concrete support', note: 'Illustrates the exact mechanism with one realistic scenario — no invented statistics.' },
     ]
   }
   ```

9. **`contrastPair`** — *(Weak / Misleading vs. Controlled / Accurate side-by-side card)*
   ```js
   {
     type: 'contrastPair',
     title: 'Missing logical step against explicit causal chain',
     weak: { tag: 'Missing step', text: 'Online courses are convenient. Therefore, they improve education.', whyItFails: '"Therefore" asserts a result without explaining how convenience leads to learning.' },
     controlled: { tag: 'Explicit chain', text: 'Online courses remove travel time. This allows working adults to attend lessons consistently, which can support steady progress.', whyItWorks: 'Each sentence supplies the mechanism for the next, and "can support" avoids overclaiming.' }
   }
   ```

10. **`decisionTree`** — *(Structured conditional branching guide)*
    ```js
    {
      type: 'decisionTree',
      title: 'How to handle an unfamiliar word during Reading',
      question: 'Does the answer to the current question depend on this exact word?',
      branches: [
        { condition: 'No — the word is a side detail or example', outcome: 'Leave it and keep moving.', detail: 'Do not spend timed minutes decoding vocabulary that does not affect an answer.' },
        { condition: 'Yes — the claim turns on this word', outcome: 'Infer its role from six context signals.', detail: 'Check part of speech, nearby definitions, examples, contrasts ("unlike", "however"), word roots, and paragraph gist.' }
      ]
    }
    ```

11. **`svgDiagram`** — *(Constructive inline editorial SVG figure from `IeltsStudyDiagrams.jsx`)*
    ```js
    {
      type: 'svgDiagram',
      diagramId: 'diag-pct-vs-points',
      title: 'Percentage-point drop against relative percentage drop',
      caption: 'Falling from 60% to 40% is a 20-percentage-point drop, which equals one-third (33.3%) of the starting 60% share. Practice data, invented.',
      alt: 'Comparison bar diagram showing 60 percent dropping to 40 percent: absolute difference is 20 percentage points, relative decrease is 33.3 percent.'
    }
    ```

12. **`mediaSlot`** — *(Ready `<audio>` OR Dignified Reserved Audio/Visual Blueprint Card)*
    ```js
    {
      type: 'mediaSlot',
      slotId: 'slot-l-correction', // Must exist in src/web/ielts-study/mediaManifest.js
    }
    ```
    See `SVG_AND_MEDIA_SLOTS.md` for exact `mediaManifest.js` rendering rules so reserved slots look intentional, editorial, and immediately educational even before audio WAV/MP3 files are generated!

13. **`wordBank`** — *(Searchable, category-filterable reference bank for Chapter 10)*
    ```js
    {
      type: 'wordBank',
      bankId: 'common-50-concepts', // 'common-50-concepts' | 'vocab-59-patterns' | 'topic-16-phrases' | 'idioms-18-optional' | 'grammar-19-repairs'
      title: '50 common concepts: alternatives and limits',
      instructions: 'Filter by category or search a headword. Check meaning, grammar, and scope before replacing any word.'
    }
    ```

14. **`mythBuster`** — *(Claim vs. Accurate Working Reality list/table)*
    ```js
    {
      type: 'mythBuster',
      title: 'Common claims and their limits',
      filterable: true, // true on Unit ov-claims-checklists-sources (29 items); false for 3–5 inline items
      items: [
        { category: 'Writing', claim: '200 words is a Task 1 maximum.', reality: 'The official instruction is a minimum of 150 words. There is no 200-word ceiling, though irrelevant padding wastes time.' }
      ]
    }
    ```

15. **`diagnosticCheck`** — *(Ungamified analytical check — 1 to 2 items testing a real distinction)*
    ```js
    {
      type: 'diagnosticCheck',
      title: 'Check the distinction',
      prompt: 'Passage: "The museum opened in 1998. It now receives about 50,000 visitors each year." Statement: "The museum received 50,000 visitors in its first year." Which label applies?',
      options: [
        { label: 'TRUE', correct: false, rationale: '50,000 visitors describes "now", not 1998.' },
        { label: 'FALSE', correct: false, rationale: 'The passage does not state a different 1998 figure; missing evidence is not a contradiction.' },
        { label: 'NOT GIVEN', correct: true, rationale: 'The passage gives the opening year (1998) and current visitors ("now"), but gives no figure for 1998.' }
      ]
    }
    ```
    When the learner selects any option, reveal **that option's analytical rationale** calmly (and let them inspect the other options). Zero points, zero streaks, zero celebratory icons.

16. **`selfCheck` & `workbookPrompt`** — *(Actionable verification list & sparse personal note)*
    ```js
    { type: 'selfCheck', title: 'Before moving to timed Reading sets', items: ['I check whether missing information is Not Given rather than False.', '...'] }
    ```
    ```js
    {
      type: 'workbookPrompt',
      noteId: 'study-target-org', // Stored in store.state.notes['study-target-org']
      label: 'Record your receiving organisation, required test version, overall band, and skill minimums',
      placeholder: 'Example: University of ... · IELTS Academic · 7.0 overall, minimum 6.5 in Writing and Speaking · Deadline: ...'
    }
    ```
    **Restraint rule:** Include `workbookPrompt` on **at most 8–10 units across the entire 85-unit course** where recording personal data genuinely helps (`ov-choose-correct-test`, `ov-diagnose-and-error-log`, `ov-targets-evidence-cycle`, `l-diagnosis-microlistening-pitfalls`, `r-pacing-diagnosis-speed`, `w-process-timing-length-review`, `s-self-correction-and-review`). Never paste empty textareas onto every unit!

---

## 6. File Organization (`src/web/ielts-study/`)

Keep files clean, modular, and under ~450 lines per component file:
- `src/web/ielts-study/schema.js` — Block validators, unit index helpers, prerequisite order checker.
- `src/web/ielts-study/glossary.js` — All approved ASE/IELTS headwords with ≤25-word plain definitions.
- `src/web/ielts-study/mediaManifest.js` — Ready + reserved audio/specimen slot definitions (`slotId`, status, voice spec, stress-marked script, teaching focus).
- `src/web/ielts-study/wordBanks.js` — Exact structured tables for `10.2` (50 concepts), `10.4` (59 patterns), `10.5` (16 phrase groups), `10.6` (18 idioms), `10.7` (10 register expressions + slang), `10.8` (19 grammar repairs), and `12.2` (29 claims).
- `src/web/ielts-study/IeltsStudyDiagrams.jsx` — All 22 constructive inline `<svg>` diagrams (`SVG_AND_MEDIA_SLOTS.md`).
- `src/web/ielts-study/IeltsStudyBlocks.jsx` — Clean, accessible React renderers for all 16 block types + `<StudyRichText />` + `<GlossaryTerm />`.
- `src/web/ielts-study/IeltsStudyView.jsx` — Study Home (`home/study`) + Two-Column Skill Study Reader (`<area>/study`).
- `src/web/ielts-study/ielts-study.css` — Scoped `.ies-*` editorial stylesheet using Artico's warm paper tokens and responsive mobile rules (`@media (max-width: 880px)` and `@media (max-width: 640px)`).
- `src/web/ielts-study/units/` — Modular unit content files (`overview-basics.js`, `overview-language.js`, `overview-plan.js`, `listening.js`, `reading.js`, `writing-foundations.js`, `writing-academic-task1.js`, `writing-task2.js`, `writing-gt-task1.js`, `speaking.js`, plus `index.js` exporting `STUDY_MODULES`, `ALL_STUDY_UNITS`, `STUDY_UNIT_BY_ID`).
