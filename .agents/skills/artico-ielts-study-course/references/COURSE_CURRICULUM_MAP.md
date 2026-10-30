# IELTS Study Course Curriculum Map (`artico-ielts-study-v1`)

This document is the **canonical, 100%-coverage content architecture** for the IELTS Study Mode in `artico-web`.

Every single one of the **173 numbered sections** (`1.1` through `12.3` and `A.1` through `A.4`) plus the opening `How to read these notes` preamble in `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/source/IELTS-Complete-Study-Notes.md` is mapped below to an exact `unitId` across **5 Modules (85 Study Units)**.

---

## 1. Non-Negotiable Curriculum Rules

1. **Zero Omissions, Zero Compression into Stubs:**
   - Do **not** summarize away the concrete mechanics, edge cases, examples, tables, or caveats from `IELTS-Complete-Study-Notes.md` (or its companion files in `work/ielts-study/source/source-notes/` when clarifying a teaching point).
   - Every unit must teach its assigned source sections **completely**, rewritten into crisp **Artico Study English (ASE)** (`STE_WRITING_GUIDE.md`) and structured with rich visual blocks (`UX_UI_AND_COMPONENTS.md`).
   - All reference counts in Chapter 10 and Chapter 12 are **strictly audited by tests**:
     - `10.2`: **50** common concepts with alternatives and limits
     - `10.4`: **59** vocabulary entries with grammatical patterns and original examples
     - `10.5`: **16** topic phrase groups
     - `10.6`: **18** optional idioms with usage limits
     - `10.7`: **10** fixed conversational expressions + informal/slang register notes
     - `10.8`: **19** recurring grammar repairs
     - `12.2`: **29** common claims vs. accurate working notes
     - `A.4`: **19** official IELTS reference URLs

2. **Academic Primary, General Training Cleanly Separated:**
   - Every unit carries an explicit `track` property:
     - `'academic'` — Specific to IELTS Academic (e.g., Academic Task 1 visual reports, Academic Reading overview).
     - `'shared'` — Applies equally to Academic and General Training (Listening, Speaking, Writing Foundations, Writing Task 2, Study & Language Systems).
     - `'gt'` — Specific to IELTS General Training (`r-gt-reading-comparison`, `w-gt-purpose-reader-register`, `w-gt-structure-openings-details`, `w-gt-conventions-informal-check`).
   - Where both tracks are compared directly (`ov-choose-correct-test`, `ov-format-and-timing`, `ov-scores-and-raw-marks`, `w-purposes-and-criteria`), use the side-by-side `trackCompare` block.
   - Where General Training has its own task mechanics (GT Reading text profile; GT Writing Task 1 Letters `7.1–7.9`), keep those units inside a **visually separated `[GT] General Training Comparison` group** at the bottom of the Reading and Writing outlines, with an unmistakable top-of-page track banner so Academic learners never mix letter rules into visual reports.

3. **Study Sequence Order on Course Home (`#/application/tests/ielts/home/study`):**
   - Present the 5 Study Modules in this exact learner sequence:
     1. `overview` — **01 · Everything about IELTS** *(Format, Scores, Study System, Language Reference & Test Day — 21 units)*
     2. `listening` — **02 · Listening** *(Four Contexts, Distractors, Question Families, Maps & Micro-Listening — 11 units)*
     3. `reading` — **03 · Reading** *(Five Operations, Claims, All 12 Question Families & Pacing + GT Comparison — 14 units)*
     4. `writing` — **04 · Writing** *(Foundations, Academic Task 1 Visuals, Task 2 Essays + GT Task 1 Letters — 29 units)*
     5. `speaking` — **05 · Speaking** *(Interview Mechanics, Parts 1–3, Fluency, Pronunciation & Review — 10 units)*
   - Preserve `ieltsAreas` (length 8) in `src/web/ieltsNavigation.js` untouched so all Practice Mode routes and `src/web/ielts.test.js` continue passing without modification.

---

## 2. Module 1: Everything about IELTS (`area: 'overview'`, 21 Units)

Data files:
- `src/web/ielts-study/units/overview-basics.js` (Parts 1.1 & 1.2)
- `src/web/ielts-study/units/overview-language.js` (Part 1.3)
- `src/web/ielts-study/units/overview-plan.js` (Part 1.4)

### Part 1.1 — How IELTS Works
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 1 | `ov-how-to-read` | `shared` | How this study manual works | `Preamble` (*How to read these notes*) | `lead`; `callout` showcase demonstrating all 4 labels (`requirement`, `method`, `option`, `trap`); `comparisonTable` (Study Mode = understand mechanics & decode specimens vs. Practice Mode = timed/untimed execution); ASE style note explaining why clear instruction sentences do not mean using basic grammar in your own exam responses. |
| 2 | `ov-what-ielts-measures` | `shared` | What IELTS measures: language and task | `1.1` | `lead`; 4-skill list; `contrastPair` (**Language problem** vs. **Task problem**, plus a combined failure case); `callout(trap)` (knowing a strategy ≠ executing under time pressure). `diagnosticCheck` classifying a sample learner failure. |
| 3 | `ov-choose-correct-test` | `shared` | Choose the right test: Academic and General Training | `1.2` | `trackCompare` (**Academic** vs. **General Training** + **Shared Listening & Speaking** footer); `steps` (6 items to verify with the receiving organization); `callout(requirement)` covering IELTS for UKVI and IELTS Life Skills + official link; `workbookPrompt` (`study-target-org`: record receiving body, required version, overall + skill minimums, delivery rule, deadline). |
| 4 | `ov-format-and-timing` | `shared` | Test format, timing, and task weights | `1.3` | `comparisonTable` (5 rows: Listening, Academic Reading, GT Reading, Writing, Speaking with work & time rules); `callout(requirement)` (150w Task 1, 250w Task 2, Task 2 = 2× Task 1 weight, LRW together vs. Speaking booking); `callout(trap)` (one strong Task 2 essay cannot replace an omitted Task 1). |
| 5 | `ov-delivery-modes-2026` | `shared` | Delivery modes in 2026: computer and Writing on Paper | `1.4` | `callout(requirement)` (mid-2026 move away from fully paper-based delivery; market variation; Writing on Paper option on computer-delivered tests + official links); `comparisonTable` (Full Computer vs. Computer + Writing on Paper); `steps` (6 practical interface actions to rehearse before test day). |
| 6 | `ov-scores-and-raw-marks` | `shared` | Band scores, rounding, and raw marks | `1.5`, `1.6` | `svgDiagram('diag-score-rounding')` (`6.25 → 6.5`, `6.75 → 7.0`, `6.125 → 6.0`); `callout(trap)` (overall target vs. skill minimum; 2-year validity rule); `svgDiagram('diag-raw-to-band')` + official raw-score average table (Listening, Academic Reading, GT Reading); `callout(method)` (no negative marking — never leave blanks); `callout(trap)` (1 spelling error = 1 item mark lost, not a fixed band deduction; never scale a 10-item drill to a band). |
| 7 | `ov-assessment-terms` | `shared` | Core assessment terms | `1.7` | Grouped `comparisonTable` covering **all 17 terms** (`Task`, `Scope`, `Evidence`, `Paraphrase`, `Gist`, `Inference`, `Criterion`, `Coherence`, `Cohesion`, `Lexical resource`, `Collocation`, `Register`, `Intelligibility`, `Baseline`, `Transfer`, `Diagnostic`, `Distractor`) with concrete 1-line IELTS micro-examples for each. |

### Part 1.2 — Universal Study, Vocabulary & Grammar System
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 8 | `ov-preparation-cycle` | `shared` | Use one 9-step preparation cycle | `2.1` | `svgDiagram('diag-9step-cycle')`; `steps` (all 9 steps); `comparisonTable` (Untimed/Assisted Learning vs. Timed/Independent Performance; Retake vs. Fresh Task). |
| 9 | `ov-diagnose-and-error-log` | `shared` | Diagnose before adding volume and log errors | `2.2`, `2.3` | 11-item failed-operation checklist; `callout(method)` (treat first diagnosis as a hypothesis across multiple items); 8-field Error Record `comparisonTable`; `contrastPair` (vague `"I am bad at Reading"` vs. observable `"I treated missing information as False"`); rule to store revisions separately from original attempts. |
| 10 | `ov-usable-vocabulary` | `shared` | Build usable vocabulary and word records | `2.4`, `2.5`, `2.6` | Receptive vs. productive vocabulary distinction; `steps` (8-step contextual acquisition cycle); broad sustainable input topics (`callout(trap)`: topics build language, they are not exam predictions); `annotatedSpecimen` showing the complete 9-element word record for **`allocate`**; 7-method retrieval review list; `callout(trap)` against rigid daily word-count quotas. |
| 11 | `ov-synonym-checks` | `shared` | Check five things before changing a word | `2.7` | `svgDiagram('diag-synonym-5gate')` (`Meaning`, `Scope`, `Grammar`, `Collocation`, `Register`); `contrastPair` cards for all 6 source pairs (`residents/citizens`, `adolescents/children`, `household/family`, `revenue/profit`, `address/solve`); `callout(method)` (repeat a precise word when any replacement distorts meaning). |
| 12 | `ov-grammar-and-clear-meaning` | `shared` | Grammatical control and clear relationships | `2.8`, `2.9` | 10 common grammar repair targets; `steps` (5-step grammar repair sequence); `contrastPair` (weakly chained multi-idea sentence vs. cleanly split/subordinated sentences; active vs. passive chosen by information focus); `callout(trap)` (neither force complexity into every sentence nor strip necessary subordinate clauses). |

### Part 1.3 — Language Reference & Word Banks
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 13 | `ov-lang-50-concepts` | `shared` | 50 common concepts: alternatives and limits | `10.1`, `10.2` | `steps` (7-step study routine for reference entries; `callout(trap)`: never insert a fixed word quota); searchable & category-filterable `wordBank` containing **all 50 concepts (`#1 People` to `#50 More`)** verbatim in sense and limits. |
| 14 | `ov-lang-precision-distinctions` | `shared` | Word distinctions that prevent meaning errors | `10.3` | 6 structured `comparisonTable` / `contrastPair` groups covering **every distinction in `10.3`**: Population (`resident`, `citizen`, `local`, `native`, `men`), Age (`teenager`, `adolescence`, `minor`, `infant`, `toddler`, `youth`), Business (`manufacturer`, `agency`, `organization`, `firm`), Family (`guardian`, `ancestors`, `sire`), Intensity (`substantial/immense`, `paramount`, `intricate/detailed`, `simple/easy`, `broke/poor`, `bizarre/elated/excruciating/spotless`), and Time/Forms (`presently`, `improve/better`, `data/datum` vs. caption error `datam`). |
| 15 | `ov-lang-59-patterns` | `shared` | 59 vocabulary items with grammar patterns | `10.4` | Searchable & filterable `wordBank` (filter by Part of Speech & Preposition Pattern) containing **all 59 items (`#1 Viable` to `#59 Unwind`, including `#17 Affluent / affluence`)** with meaning, grammatical pattern, and original example. |
| 16 | `ov-lang-phrases-idioms-register` | `shared` | Topic phrases, 18 optional idioms, and register | `10.5`, `10.6`, `10.7` | **All 16** topic phrase rows (`detached house` through `act rashly` vs. caption error `acted on a rash`); `callout(option)` + `callout(trap)` on idioms (conversational/proverbial — never default style for Academic Task 1); **all 18** optional idioms table (`Bite the bullet` through `When in Rome`, plus `midnight oil` vs. `candle at both ends` note); **all 10** fixed expressions + informal/slang register boundaries (`piss me off`, `I'm dead`, `rizz/slay/yapping`). |
| 17 | `ov-lang-grammar-repairs-editing` | `shared` | 19 recurring grammar repairs and sentence editing | `10.8`, `10.9` | **All 19** problem-to-controlled-form rows (`more easier` through confused apostrophes) grouped by category; `steps` (**8-step sentence-level editing procedure**); `annotatedSpecimen` walking one dense, flawed sentence through all 8 editing steps without stripping necessary precision. |

### Part 1.4 — Study Plan, Readiness & Claims Reference
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 18 | `ov-targets-evidence-cycle` | `shared` | Targets, evidence types, and error categories | `11.1`, `11.2`, `11.3`, `11.4`, `11.5` | Score + behaviour target setting; `comparisonTable` (**Learning evidence** with support vs. **Performance evidence** unassisted under test conditions); `steps` (8-step diagnosis-and-repair cycle; smallest supported repair); 9-row practical error categories table; `contrastPair` (`"Listening concentration bad"` vs. specific `"actually"`-correction log entry). |
| 19 | `ov-patterns-practice-input` | `shared` | Diagnostic patterns, effort balance, and input-to-output | `11.6`, `11.7`, `11.8`, `11.9`, `11.10` | 7 cross-skill diagnostic pattern cards (and `callout(trap)` against diagnosing by nationality/profession/personality); focused drills + full runs pairing; weakness-led effort allocation (start Writing/Speaking early; daily essay counts are stories, not quotas); `steps` (6-step input-to-output bridge) + 4-direction vocabulary retrieval. |
| 20 | `ov-materials-stress-readiness-testday` | `shared` | Materials, pressure, readiness, and test day | `11.11`, `11.12`, `11.13`, `11.14` | 6-question resource evaluation checklist + official sample link; trigger-to-practical-adjustment table (`callout(option)`: breathing/settling is optional; NLP/english-only days/deleting apps are not required); 7-evidence readiness audit (`callout(option)` on the "3 consecutive +0.5" heuristic); complete `selfCheck` for test-day verification (original ID rule, venue audio check, calm mid-test recovery). |
| 21 | `ov-claims-checklists-sources` | `shared` | Retain the method, reject the false rule | `12.1`, `12.2`, `12.3`, `A.1`, `A.2`, `A.3`, `A.4` | 8 cross-course core principles; filterable `mythBuster` table containing **all 29 claims and accurate working notes** (`12.2`); **all 6 final skill checklists** (`12.3`); **all 19 official IELTS reference links** (`A.4`); collapsible `<details>` **Source Basis & Editorial Scope Note** faithfully preserving `A.1–A.3` (421 vs 428 archive note, 11h export boundary, independent examples policy, and the 39-note provenance summary). |

---

## 3. Module 2: Listening (`area: 'listening'`, 11 Units)

Data file: `src/web/ielts-study/units/listening.js`

### Part 2.1 — Contexts, Preview & Distractors
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 1 | `l-four-contexts` | `shared` | The four Listening parts and delivery rules | `3.1` | 4-part context & demand `comparisonTable`; `callout(requirement)` (40 questions, once-only playback, ~30 min, computer 2-minute review vs. legacy paper 10-minute transfer + official links); question order vs. option-letter order rule. |
| 2 | `l-preview-period` | `shared` | Use the preview period before audio starts | `3.2` | `steps` (9-step preview sequence); grammatical slot prediction specimen (article/plural cues before a gap); `callout(trap)` (predictions direct attention, never pre-decide the answer; do not waste preview time writing long synonym lists). |
| 3 | `l-complete-message-paraphrase` | `shared` | Follow the complete message and paraphrase | `3.3`, `3.4` | `svgDiagram('diag-listening-timeline')` (`Room 14` → `"projector is broken"` → `Room 18`); 8 live-tracking shifts list; 5-row paraphrase `comparisonTable`; `mediaSlot('slot-l-correction')` (uses existing `public/audio/ielts/workshop.wav` or dedicated segment + annotated transcript). |
| 4 | `l-eight-distractors` | `shared` | Separate the eight distractor patterns | `3.5` | Full 8-row distractor `comparisonTable` (`Changed arrangement`, `Similar options`, `Singular/plural`, `Unusual name`, `Similar sounds`, `Negative`, `Quoted view`, `Current vs future`); `mediaSlot('slot-l-distractors')` (reserved audio specimen contrasting 3 distractor exchanges); `diagnosticCheck`. |

### Part 2.2 — Question Families & Context Demands
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 5 | `l-forms-notes-tables-summaries` | `shared` | Forms, notes, summaries, tables, and flow charts | `3.6`, `3.7` | 6 common form detail categories; `annotatedSpecimen` showing pre-printed currency/unit/article outside a gap (`£ [ ___ ]` vs. `12 pounds` word-limit check); structural reading rules for tables, summaries, and flow charts (avoiding true-but-wrong-row placement). |
| 6 | `l-sentences-short-answers` | `shared` | Sentence completion and short-answer questions | `3.8` | `steps` (5-step sentence completion + 3-step short-answer procedure); `contrastPair` (answering with a *reason* when the question word asks *where*; adding unnecessary wrapper words that break the word limit). |
| 7 | `l-multiple-choice-matching` | `shared` | Multiple choice and matching | `3.9`, `3.10` | `steps` (8-step MC routine); 4 critical MC scope distinctions list; `callout(trap)` (all 3 options are often mentioned in the recording — mention ≠ support; check 1-answer vs. 2-answer instructions); 4+4 pre/live matching steps + option-reuse & unused-option rules. |
| 8 | `l-maps-plans-diagrams` | `shared` | Maps, plans, and route tracking | `3.11` | `svgDiagram('diag-listening-map-bellford')` (architectural plan with `You are here` entrance, compass rose, paths, landmarks, `A–F` lettered rooms, moved/proposed feature); `steps` (6 pre-listening + 6 live-listening actions); 9 spatial preposition groups; `callout(trap)` (left/right follows the route's direction of travel; write the letter `D`, never the room name, when a letter is required); `mediaSlot('slot-l-map-route')`. |
| 9 | `l-discussions-and-lectures` | `shared` | Part 3 discussions and Part 4 lectures | `3.12`, `3.13` | Part 3 tracking list (proposal → reason → response → partial agreement → revised plan; separating reported views from speaker's own view; tutor criticising *part* ≠ rejecting *all*; why intonation alone is unreliable); Part 4 lecture heading & 8 discourse signposts list (example ≠ main idea; handling unknown non-essential technical terms); `mediaSlot('slot-l-part3-attribution')` & `mediaSlot('slot-l-part4-signposts')`. |

### Part 2.3 — Accuracy, Recovery & Diagnosis
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 10 | `l-entry-and-recovery` | `shared` | Enter answers accurately and recover after a miss | `3.14`, `3.15` | 7-point entry check; `callout(requirement)` (articles/prepositions count as words; hyphenated `check-in` = 1 word + official link); `callout(option)` (all-caps is a personal consistency option, not a magic rule — spelling always counts); `steps` (5-step recovery sequence after a missed item). |
| 11 | `l-diagnosis-microlistening-pitfalls` | `shared` | Diagnose errors, micro-listen, and build stamina | `3.16`, `3.17`, `3.18`, `3.19` | Full 9-row Listening diagnostic `comparisonTable`; `steps` (8-step micro-listening routine + speed-reduction caveat); `callout(option)` (5→7→10→15→30 min focus ladder, 4 official accent varieties, optional breathing settle); `selfCheck` covering all **14 Listening pitfalls** (`3.19`). |

---

## 4. Module 3: Reading (`area: 'reading'`, 14 Units)

Data file: `src/web/ielts-study/units/reading.js`

### Part 3.1 — Reading Architecture & Claim Logic
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 1 | `r-task-and-five-operations` | `academic` | How Academic Reading works and the five operations | `4.1`, `4.2` | `callout(requirement)` (3 sections, 40 questions, 60 minutes *including* answer entry — zero extra transfer minutes + official link); `svgDiagram('diag-reading-5ops')` (`Decode → Skim → Scan → Read closely → Decide`); `callout(trap)` (skimming & scanning locate — close reading decides); cross-link to `[GT]` unit `r-gt-reading-comparison`. |
| 2 | `r-passage-map` | `shared` | Build a passage map by paragraph function | `4.3` | Topic vs. function distinction; 7 functional paragraph labels; `annotatedSpecimen` showing a 4-paragraph passage where 2 paragraphs share the same topic word but perform opposite functions (`Describes old method` vs. `Explains limitation`), with 4-word margin labels. |
| 3 | `r-full-claim-anatomy` | `shared` | Identify all six parts of a claim | `4.4` | `svgDiagram('diag-claim-anatomy')` (`Who/What`, `Action/Condition`, `Time`, `Place/Group`, `Strength`, `Relationship`); worked breakdown of *"Some adults used the service after its price fell"* showing 3 unsupported leaps (`all adults`, `price caused it`, `never used before`); `diagnosticCheck`. |

### Part 3.2 — Truth, Writer Views & Matching Families
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 4 | `r-true-false-not-given` | `shared` | True, False, and Not Given | `4.5` | `svgDiagram('diag-tfng-logic')`; `steps` (6-step procedure); `annotatedSpecimen` on the 1998 / 50,000-visitors museum passage contrasting `True`, `False`, and `Not Given`; `callout(trap)` (missing comparison = Not Given, not False; outside knowledge banned; no guaranteed quota of all three labels). |
| 5 | `r-yes-no-not-given` | `shared` | Yes, No, and Not Given: writer views | `4.6` | `comparisonTable` (`TFNG` = factual information vs. `YNNG` = writer's views/claims, plus exact label entry warning); `annotatedSpecimen` tracking attribution (`"Some critics argue..."` vs. `"This argument is unconvincing..."` vs. `"The evidence suggests..."`); certainty check (`could help` ≠ `will solve`). |
| 6 | `r-matching-headings` | `shared` | Matching headings: gist and paragraph job | `4.7` | `steps` (6-step gist-first procedure: summarize paragraph *before* checking options); `callout(trap)` (first/last sentence pivot trap; shared rare-word trap; example-detail vs. what examples jointly show; unused options & no reuse; preserve any printed example). |
| 7 | `r-matching-information` | `shared` | Matching information to paragraphs | `4.8` | `comparisonTable` (**Matching Headings** = whole-paragraph purpose vs. **Matching Information** = specific detail inside a paragraph); 6 detail types; reuse & non-passage-order rules; `callout(option)` on sequencing this family later after mapping the passage. |
| 8 | `r-matching-features-and-endings` | `shared` | Matching features, names, and sentence endings | `4.9`, `4.10` | `steps` (6-step feature/name matching + pronoun/opinion-shift tracking; `callout(option)` on starting with a single-occurrence name; study-author vs. study-critic trap); `steps` (5-step sentence endings + `contrastPair` showing two grammatically valid endings where only one matches passage scope/causation). |

### Part 3.3 — Completion, Visuals, Multiple Choice & Navigation
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 9 | `r-sentence-summary-completion` | `shared` | Sentence, summary, and note completion | `4.11`, `4.12` | Grammar prediction vs. passage proof; `comparisonTable` contrasting the **two summary completion modes** (Mode A: exact words from passage within limit — never substitute synonyms! vs. Mode B: select from supplied option bank — paraphrase allowed); 5-point entry & hyphen check. |
| 10 | `r-tables-flowcharts-diagrams` | `shared` | Tables, flow charts, and diagram labels | `4.13`, `4.14` | Row/column header & stage-arrow reading; `callout(trap)` (earlier in sequence ≠ cause); 5-point diagram inspection (`annotatedSpecimen` showing arrow pointing to a component vs. whole-object trap; zero outside technical invention). |
| 11 | `r-short-answers-multiple-choice` | `shared` | Short-answer questions and multiple choice | `4.15`, `4.16` | 5 question-word targets (`Who`, `Where`, `When`, `What`, `How many/much`); `steps` (6-step MC stem + restriction check); 6-item Reading MC distractor table; multi-selection (`Choose TWO letters`) check. |
| 12 | `r-order-and-unfamiliar-words` | `shared` | Passage order and unfamiliar vocabulary | `4.17`, `4.18` | `comparisonTable` (Families that commonly follow passage order vs. Global/Matching families vs. Clustered completion/diagram families; new question set resets search range); `decisionTree` for unknown words (`Essential to answer?` → `No: Continue` / `Yes: 6 contextual inference tools`); study-time vs. timed-work dictionary rule. |

### Part 3.4 — Pacing, Error Repair & General Training Comparison
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 13 | `r-pacing-diagnosis-speed` | `shared` | Manage the hour, diagnose errors, and build speed | `4.19`, `4.20`, `4.21`, `4.22` | 4-part hour budget (`callout(option)`: 30–35 min for first two sections); 5 post-attempt diagnostic questions; 8-row evidence-to-repair `comparisonTable`; graduated timer ladder (`90 → 80 → 70 → 60 min` only after untimed accuracy is solid; audiobook speed myth debunked); `selfCheck` of all **14 Reading pitfalls** (`4.22`). |
| 14 | `r-gt-reading-comparison` | `gt` | [GT] General Training Reading: text profile and scoring | `4.1` (GT), `1.6` (GT) | Top `[GT]` Track Banner; `trackCompare` (**Academic Reading** 3 extended academic/analytical passages vs. **General Training Reading** Section 1 everyday notices, Section 2 workplace documents, Section 3 longer general text); raw-score comparison (`Band 6: 23 AC vs 30 GT`; `Band 7: 30 AC vs 35 GT`); confirmation that all 5 operations and question-type methods (`r-passage-map` through `r-pacing-diagnosis-speed`) apply directly. |

---

## 5. Module 4: Writing (`area: 'writing'`, 29 Units)

Data files:
- `src/web/ielts-study/units/writing-foundations.js` (Part 4.1 — 4 units)
- `src/web/ielts-study/units/writing-academic-task1.js` (Part 4.2 — 12 units)
- `src/web/ielts-study/units/writing-task2.js` (Part 4.3 — 10 units)
- `src/web/ielts-study/units/writing-gt-task1.js` (Part 4.4 — 3 `[GT]` units)

### Part 4.1 — Writing Foundations (`shared`)
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 1 | `w-purposes-and-criteria` | `shared` | Three writing tasks and the four criteria | `5.1`, `5.2` | `trackCompare` (Academic Task 1 visual report vs. GT Task 1 situational letter vs. Shared Task 2 essay); 4 equal-weight criteria `comparisonTable` + official PDF link; `callout(requirement)` & `callout(trap)` (Task 2 = 2× weight; lowest criterion does not automatically become total band, yet unanswered instructions cap Task Achievement/Response). |
| 2 | `w-coherence-vs-cohesion` | `shared` | Separate coherence from cohesion | `5.3` | Side-by-side `comparisonTable` (**Coherence** = logical paragraph job & order vs. **Cohesion** = pronouns, key-term repetition, accurate synonyms, demonstratives + antecedents, real conjunctions); `contrastPair` (linker-stuffed paragraph starting every sentence with *Moreover / Furthermore / Therefore* vs. natural reference-driven paragraph). |
| 3 | `w-words-and-grammar-for-meaning` | `shared` | Choose words and build grammar through meaning | `5.4`, `5.5` | 5-point lexical check (`contrastPair`: repeating `"countries"` / `"plastic bottles"` vs. distorted `"kingdoms"` / `"artificial containers"`); 6 functional clause structures table; `annotatedSpecimen` showing clause complexity serving meaning (`"because workers spend less time travelling"`), debunking bans on passive voice or repetition. |
| 4 | `w-process-timing-length-review` | `shared` | Plan, draft, manage the shared hour, and review | `5.6`, `5.7`, `5.8`, `5.9`, `5.10` | 3-stage process (`Plan → Draft → Check`); `callout(option)` on `~20 / 40 min`, Task-2-first order, and `10 / 25 / 5 min` Task 2 split; `callout(requirement)` & `callout(trap)` on 150w / 250w minimums vs. `160–200 / 260–300` teacher margins (not maximums!); connected prose rule (no bullet lists in essays/reports/letters); **5-step top-down review funnel** (`Task → Whole response → Paragraph → Sentence → Language detail`). |

### Part 4.2 — Academic Task 1: Reporting Visuals (`academic` Primary Track)
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 5 | `w-a1-reporting-principle-and-jobs` | `academic` | The reporting principle and visual jobs | `6.1`, `6.2` | Core evidence rule: *"Can the supplied visual support this exact sentence?"*; 5 forbidden inventions list; 7 visual families × 4 functional categories (`Dynamic`, `Static`, `Sequential`, `Spatial`), explaining why a bar chart or pie pair can be dynamic OR static. |
| 6 | `w-a1-decode-and-main-features` | `academic` | Decode the visual and select main features | `6.3`, `6.4` | `steps` (9-item pre-draft visual check); `contrastPair` on negative measures (`"% of adults unable to obtain treatment"` rising = worse access, not more patients treated!); 8 macro-feature questions + superlative check (`highest final value` vs. `largest increase`). |
| 7 | `w-a1-plan-and-introduction` | `academic` | Plan the report and write the introduction | `6.5`, `6.6` | `svgDiagram('diag-task1-4part-blueprint')` (`1 Introduction → 2 Overview → 3 Detail Group 1 → 4 Detail Group 2`; why no opinion conclusion is needed); 5 introduction components; `contrastPair` (`"from 2010 to 2020"` = exact vs. `"during the last decade"` = unanchored; choosing `shows / compares / illustrates`). |
| 8 | `w-a1-accurate-overview` | `academic` | Write an accurate overview | `6.7` | The headline selection question; 4-row `comparisonTable` showing what an overview selects for Time-series, Static charts, Maps, and Processes; `callout(option)` & `callout(trap)` (2–3 features and omitting figures are helpful scaffolds, not rigid laws; writing `"Overall,"` before a raw number list fails the overview's purpose); `contrastPair`. |
| 9 | `w-a1-grouping-and-chunking` | `academic` | Group details for the reader and chunk phases | `6.8`, `6.9` | 7 grouping logics (rejecting mechanical legend-order or year-by-year lists); `svgDiagram('diag-task1-line-phases')` illustrating **chunking** at real turning points (`Phase 1 rise → Phase 2 plateau → Phase 3 decline`); `steps` (5-step chunking routine); `callout(trap)` on misusing `"fluctuated"` for a single rise-and-fall. |
| 10 | `w-a1-numbers-and-percentages` | `academic` | Values, approximations, and percentage points | `6.10`, `6.11` | Approximation qualifiers (`just under / nearly` < value < `just over`; no fake `23.74` grid decimals; clear `"respectively"` pairing); `svgDiagram('diag-pct-vs-points')` showing `60% → 40%` (`20 percentage points` vs. `33.3% relative fall`), `20% → 30%` (`10 percentage points` vs. `50% relative rise`), and why a falling share can still mean a rising headcount if the total grew; useful fraction equivalents; `diagnosticCheck`. |
| 11 | `w-a1-trend-and-comparison-grammar` | `academic` | Trend grammar, prepositions, and comparisons | `6.12`, `6.13` | 5-row verb-vs-noun trend construction table; preposition precision cards (`rose to 30` vs. `rose by 10` vs. `remained at 30` vs. `from 20 to 30`); adjective+noun vs. verb+adverb check; like-with-like comparison checklist; `"twice as high as"` vs. `"twice higher"`; accurate `"overtook"` condition. |
| 12 | `w-a1-line-bar-table` | `academic` | Line graphs, bar charts, and tables | `6.14`, `6.15` | `svgDiagram('diag-task1-bar-static-dynamic')` (truncated-scale bar chart + multi-column table with total row); anchor-value selection on multi-line graphs (`start`, `turning point`, `end`, `crossing`); avoiding cell-by-cell table lists and never treating a `Total` row as an independent category; `annotatedSpecimen` report excerpt. |
| 13 | `w-a1-pie-and-multiple-visuals` | `academic` | Pie charts and multiple visuals | `6.16`, `6.17` | `svgDiagram('diag-task1-pie-pair')` (2015 vs. 2025 shares) + `svgDiagram('diag-task1-dual-visual')` (visitor numbers bar + spending table); balanced grouping check; `callout(trap)` on multiple visuals: cover *both* visuals, never equate `%` with headcount, and **never invent causation** merely because two charts both rise! |
| 14 | `w-a1-maps-and-plans` | `academic` | Maps and site plans | `6.18` | `svgDiagram('diag-task1-map-before-after')` (Bellford Park 2005 vs. Proposed Redevelopment, with compass rose); time-status tense matching (`was replaced by` vs. `is proposed for`); 6 spatial change types; `callout(trap)` (never invent compass points when none are drawn; never claim a proposed road `"reduces congestion"`). |
| 15 | `w-a1-process-diagrams` | `academic` | Linear and cyclical process diagrams | `6.19` | `svgDiagram('diag-task1-process-cycle')` (8-stage container recycling loop with sorting branch and return arrow); linear vs. cyclical overview framing; stage-transition body split; active vs. passive voice rule (never invent unseen human agents); sequence markers without hiding a continuing cycle; `callout(trap)` against guessing unknown liquids/machinery or adding an environmental-benefits essay paragraph. |
| 16 | `w-a1-review-and-subskills` | `academic` | Review a Task 1 report and practise subskills | `6.20`, `6.21` | `selfCheck` (7 Content checks + 6 Language checks + circle-every-number verification); 8 focused subskill practice drills + optional peer "overview-only sketch" check. |

### Part 4.3 — Writing Task 2: Essays (`shared` Track)
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 17 | `w-t2-prompt-layers-and-plan` | `shared` | Analyse the three layers of a Task 2 prompt | `8.1`, `8.2` | `svgDiagram('diag-task2-3layers')` (`Topic` → `Specific Focus` → `Instruction`, plus limiting words `children / in cities / main / to what extent`); 7 response-job overview table (`svgDiagram('diag-task2-essay-structures')`); `contrastPair` (writing generally about "benefits of education" vs. answering "should governments pay adult tuition fees"). |
| 18 | `w-t2-opinion-and-discussion` | `shared` | Opinion, extent, and discussion questions | `8.3`, `8.4` | Opinion & `to what extent` boundary setting (why adding an opposite-side paragraph out of false "balance" weakens a single-position essay; how to handle a qualifying counterargument cleanly); `Discuss both views and give your own opinion` 3-obligation blueprint (fair development of both views + integrated/explicit own judgment). |
| 19 | `w-t2-advantages-and-evaluations` | `shared` | Advantages, outweigh, and positive/negative prompts | `8.5` | 3-way `comparisonTable`: Plain `advantages and disadvantages` vs. `outweigh` comparative judgment vs. `positive or negative development` evaluation; `callout(trap)` (2 benefits vs. 1 drawback by count does NOT prove outweighing — compare importance, reach, duration, severity, or mitigability). |
| 20 | `w-t2-causes-solutions-two-part` | `shared` | Causes, problems, solutions, and two direct questions | `8.6`, `8.7` | 4-term precision table (`Cause`, `Problem`, `Effect`, `Solution`); mechanism + actor rule (`What changes → How it reduces the problem → Who acts`, vs. vague `"something should be done"`); two-direct-questions planning check (separate pre-draft answers, sub-questions, balanced space, both included in conclusion). |
| 21 | `w-t2-generate-and-select-ideas` | `shared` | Generate manageable ideas and select fewer | `8.8`, `8.9` | 3 properties of a usable idea (answers exact task, supportable, expressible in controlled English); `callout(option)` (Coffee-shop conversation prompt & Familiar-answer prompt, screened against exact focus); 5-question depth check (`contrastPair`: 5-reason shopping list vs. 2 fully explained mechanisms). |
| 22 | `w-t2-plan-and-introduction` | `shared` | Make a keyword plan and write a direct introduction | `8.10`, `8.11` | 6-line keyword plan specimen + 5-question pre-draft check (`callout(trap)`: prompt analysis precedes structure — never force a prompt into a memorised template); 3-step direct introduction; `contrastPair` (bloated "history of humanity" / memorised quote vs. crisp 2-sentence restatement + position; note on `"this essay will discuss"`). |
| 23 | `w-t2-body-paragraphs-and-mechanisms` | `shared` | Build body paragraphs with explicit mechanisms | `8.12`, `8.13` | `svgDiagram('diag-task2-paragraph-chain')` (`Point → Explanation/Mechanism → Concrete Support → Relevance`); `annotatedSpecimen` dissecting the reliable-bus-service paragraph; `contrastPair` exposing a missing logical step (`"Online courses are convenient → improve education"` vs. explicit 3-link chain) and circular `"beneficial because it has benefits"` phrasing. |
| 24 | `w-t2-examples-position-qualification` | `shared` | Plausible examples, consistent position, and qualification | `8.14`, `8.15`, `8.16` | Ordinary/plausible scenario examples + **hard `callout(trap)` against inventing fake university studies or survey percentages**; checking position consistency across Intro / Body 1 / Body 2 / Conclusion (`contrastPair`: explained concession vs. unresolved `"entirely ineffective"` contradiction; `"completely agree"` mismatch); 5 qualification tools without stereotypes. |
| 25 | `w-t2-conclusion-and-cohesion` | `shared` | Write the conclusion and control cohesion | `8.17`, `8.18` | 4-step logical conclusion (`callout(trap)`: no unannounced new arguments, no generic slogans); 7-row relationship-to-connector `comparisonTable` (`Addition`, `Contrast`, `Concession`, `Reason`, `Result`, `Example`, `Condition`) with grammar rules (`although` + clause vs. `despite` + noun/`-ing`; `. However,` vs. comma-splice `, however,`). |
| 26 | `w-t2-review-models-feedback-myths` | `shared` | Priority review, sample essays, feedback, and myths | `8.19`, `8.20`, `8.21`, `8.22` | 3-tier priority review checklist (`Task → Argument → Language`); `steps` (8-step active sample-essay analysis + 5 targeted model investigations; why band labels in video/blog titles are not proof); 5-step feedback-to-repair cycle; `mythBuster` / `selfCheck` covering all **15 Task 2 pitfalls and false shortcuts** (`8.22`). |

### Part 4.4 — General Training Track: Task 1 Letters (`track: 'gt'`, Separated)
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 27 | `w-gt-purpose-reader-register` | `gt` | [GT] Task 1 Letters: purpose, bullets, and register | `7.1`, `7.2` | Top `[GT]` Track Banner (with quick link back to Academic Task 1); `steps` (6 items to decode in a letter prompt, including compound bullets like *"describe the problem and explain how it affected you"* and plural *"reasons"*); `svgDiagram('diag-gt-letter-registers')` + 3-register `comparisonTable` (`Personal/Informal`, `Semi-formal`, `Formal`). |
| 28 | `w-gt-structure-openings-details` | `gt` | [GT] Plan each function, open clearly, and add detail | `7.3`, `7.4`, `7.5` | 4-part letter blueprint (1 paragraph per bullet scaffold); 5 functional openings; 5-genre detail matrix (`Complaint`, `Apology`, `Invitation`, `Request`, `Recommendation/Review`); `annotatedSpecimen` pairing a Formal Complaint excerpt against a Personal Invitation excerpt. |
| 29 | `w-gt-conventions-informal-check` | `gt` | [GT] Greetings, closings, informal boundaries, and check | `7.6`, `7.7`, `7.8`, `7.9` | Conventional greeting/sign-off pairing table (`Dear Sir or Madam → Yours faithfully`, `Dear Ms Patel → Yours sincerely`, `Dear Sam → Best wishes`, `Kind regards`, no postal addresses); informal control list (contractions & natural phrasal verbs OK; texting slang, emojis, obscure jokes, P.S. banned; no universal ban on phrasal verbs in formal contexts); length & comma-splice check (`40–60w/bullet` scaffold, `150w` minimum); 10-point final letter `selfCheck`. |

---

## 6. Module 5: Speaking (`area: 'speaking'`, 10 Units)

Data file: `src/web/ielts-study/units/speaking.js`

### Part 5.1 — Interview Mechanics & Part 1
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 1 | `s-interview-and-criteria` | `shared` | How the Speaking interview works and what is assessed | `9.1`, `9.2` | `svgDiagram('diag-speaking-3parts')` (11–14 min, Parts 1–3 shift in abstraction); 4 equal-weight criteria `comparisonTable` + official PDF link; `callout(trap)` (communication is the practical aim, not a 5th criterion; zero marks for smiling, outfits, eye contact, or prestige accents). |
| 2 | `s-procedural-and-part1` | `shared` | Procedural questions, Part 1 answers, and scope | `9.3`, `9.4`, `9.5` | Direct procedural answers (`contrastPair`: simple name/ID answer vs. rehearsed biography speech); 5 Part 1 question-word triggers + `Answer first → Relevant detail` specimen (`walk to work` +existing `public/audio/ielts/speaking-example.wav` + `mediaSlot('slot-s-part1-direct')`); matching scope (one developed favourite > laundry list; personal `"I find walking relaxing"` ≠ `"everyone finds walking relaxing"`). |

### Part 5.2 — Part 2 Long Turn & Part 3 Discussion
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 3 | `s-part2-decode-and-prepare` | `shared` | Part 2: decode the task card and use the 1-minute prep | `9.6`, `9.7` | 5-point task-card check (`callout(trap)`: category fit — local uncle ≠ *famous* business person; fast topic choice); `annotatedSpecimen` comparing a **Keyword Note Card** (5 categories, 12 words total) against a doomed full-sentence script; covering cue points naturally without rigid equal-time splits. |
| 4 | `s-part2-long-turn-and-timeframes` | `shared` | Give a connected long turn and control time frames | `9.8`, `9.9` | Event sequence vs. object sequence; 7 detail sources list; sustaining 1–2 minutes calmly until stopped; `callout(option)` on `Past–Present–Future` (only when a timeline genuinely fits — never force 3 tenses onto a single completed past event!) + 5 meaning-to-tense mappings; `mediaSlot('slot-s-part2-longturn')`. |
| 5 | `s-part3-operations-and-development` | `shared` | Part 3: match the thinking operation and develop views | `9.10`, `9.11` | 7 Part 3 thinking operations table (`explain why`, `compare`, `evaluate`, `responsibility`, `suggest`, `predict`, `condition`); 4-move flexible development chain (`Direct view → Mechanism → Concrete example → Qualification`); `annotatedSpecimen` on remote-work qualification; `mediaSlot('slot-s-part3-chain')`. |
| 6 | `s-frameworks-unfamiliar-pauses` | `shared` | Optional frameworks, unfamiliar questions, and pauses | `9.12`, `9.13`, `9.14` | 4-framework `comparisonTable` (`Answer-detail-example`, `Point-explain-link`, `Two perspectives + judgment`, `Past-Present-Future` as planning scaffolds, never recitation scripts); `decisionTree` for hard questions (`Didn't hear/understand → Polite clarification` + British Council link vs. `No experience → Brief honest statement + cautious reason/hypothetical`); 5-cause pause diagnostic table (why frantic speed ruins endings and coherence). |

### Part 5.3 — Spoken Language, Pronunciation & Honest Review
| # | `unitId` | Track | Title | Source Sections | Required Visuals, Tables & Blocks |
|---:|---|---|---|---|---|
| 7 | `s-natural-language-and-functions` | `shared` | Natural spoken phrases and nine sentence functions | `9.15`, `9.16` | 6 natural spoken frames; idiomatic collocations vs. forced proverb quotas; full **9-row sentence-function `comparisonTable`** (`State role`, `State origin`, `Habit/preference`, `Completed event`, `Continuing duration: I've lived here for 3 years vs. completed stay I went to London for 3 years`, `Feeling`, `Position`, `Reason`, `Support/contrast`, qualifying unverified frequency claims). |
| 8 | `s-pronunciation-stress-pace` | `shared` | Pronunciation, stress, intonation, and pace | `9.17`, `9.18`, `9.19` | 8 listener-impact pronunciation targets (working from actual audio, never nationality stereotypes); `svgDiagram('diag-speaking-stress-contrast')` (`I wanted the BLUE folder`); connected speech vs. dropped final consonants; pace & volume calibration (ASR phone dictation limits, decibel myth); `mediaSlot('slot-s-stress-contrast')` & `mediaSlot('slot-s-pacing-chunks')`. |
| 9 | `s-self-correction-and-review` | `shared` | Selective self-correction and 4-pass recording review | `9.20`, `9.21` | Brief meaning repair vs. constant sentence restarting; occasional slip vs. recurring gap (e.g., systematic article omission); `steps` (**4-pass recording review**: `1 Task → 2 Content → 3 Language → 4 Audio`, verifying auto-captions against real audio, then testing transfer on a fresh question). |
| 10 | `s-models-shadowing-ai-myths` | `shared` | Models, shadowing, AI feedback, and Speaking myths | `9.22`, `9.23`, `9.24` | Attempt-before-model comparison; shadowing procedure for rhythm/stress without copying biography or accent; `comparisonTable` on AI vs. calibrated human feedback (text-only AI cannot hear pronunciation; band estimates are uncalibrated; paid former-examiner coaching is optional, not compulsory); `mythBuster` / `selfCheck` covering all **19 Speaking pitfalls and score myths** (`9.24`). |
