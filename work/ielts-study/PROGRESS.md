# IELTS Study Course Build Ledger (`PROGRESS.md`)

**Spec Version:** `artico-ielts-study-v1`
**Master Skill:** `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/SKILL.md`
**Playbook:** `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/GEMINI_TASK.md`

Update checkboxes immediately after verifying each batch with `node scripts/check-ielts-study.mjs` and `npm test`.

---

## Batch Summary

- [x] **Batch 1 — Core Engine, Reference Banks (`8`), SVG Diagrams (`23`), Media Slots (`10`), Reader UI & Linter**
- [x] **Batch 2 — Module 1A: Everything about IELTS · Parts 1.1 & 1.2 (`12` units · `Preamble`, `§1.1–1.7`, `§2.1–2.9`)**
- [x] **Batch 3 — Module 1B: Everything about IELTS · Parts 1.3 & 1.4 (`9` units · `§10.1–10.9`, `§11.1–11.14`, `§12.1–12.3`, `§A.1–A.4`)**
- [x] **Batch 4 — Module 2: Listening (`11` units · `§3.1–3.19`)**
- [x] **Batch 5 — Module 3: Reading (`14` units · `§4.1–4.22` + `[GT]` Reading Comparison)**
- [ ] **Batch 6 — Module 4A: Writing Foundations & Academic Task 1 (`16` units · `§5.1–5.10`, `§6.1–6.21`)**
- [ ] **Batch 7 — Module 4B: Writing Task 2 Essays & Separated `[GT]` Task 1 Letters (`13` units · `§8.1–8.22`, `§7.1–7.9`)**
- [ ] **Batch 8 — Module 5: Speaking (`10` units · `§9.1–9.24`) + `ieltsStudy.test.js` + Full `npm test && npm run build`**

---

## Batch 1 Artifacts Checklist

### Infrastructure & Reference Banks
- [x] `learning.js` (`route.unit`) & `ieltsNavigation.js` (`ieltsStudyPath`)
- [x] `schema.js` & `glossary.js` (`>= 40` ASE definitions)
- [x] `wordBanks.js`: `commonConcepts50` (`50`), `vocabPatterns59` (`59`), `topicPhrases16` (`16`), `optionalIdioms18` (`18`), `registerExpressions10` (`10`), `grammarRepairs19` (`19`), `commonClaims29` (`29`), `officialReferences19` (`19`)
- [x] `mediaManifest.js` (`10` slots: `2` `ready` + `8` `reserved` with full original scripts)
- [x] `IeltsStudyDiagrams.jsx` (`23` constructive `<svg>` diagrams, visually inspected via `diagrams-sheet-1.png` & `diagrams-sheet-2.png`)
- [x] `IeltsStudyBlocks.jsx`, `IeltsStudyView.jsx`, `ielts-study.css`, & `IeltsCourse.jsx` Study hookup
- [x] `scripts/check-ielts-study.mjs` (`COV`, `ASE`, `NOGAME`, `VIS`, `--render-diagrams`)

---

## All 85 Study Units Checklist

### Module 1 · `overview` (`21` units)
- [x] `ov-how-to-read` (`Preamble`)
- [x] `ov-what-ielts-measures` (`1.1`)
- [x] `ov-choose-correct-test` (`1.2`)
- [x] `ov-format-and-timing` (`1.3`)
- [x] `ov-delivery-modes-2026` (`1.4`)
- [x] `ov-scores-and-raw-marks` (`1.5`, `1.6`)
- [x] `ov-assessment-terms` (`1.7`)
- [x] `ov-preparation-cycle` (`2.1`)
- [x] `ov-diagnose-and-error-log` (`2.2`, `2.3`)
- [x] `ov-usable-vocabulary` (`2.4`, `2.5`, `2.6`)
- [x] `ov-synonym-checks` (`2.7`)
- [x] `ov-grammar-and-clear-meaning` (`2.8`, `2.9`)
- [x] `ov-lang-50-concepts` (`10.1`, `10.2`)
- [x] `ov-lang-precision-distinctions` (`10.3`)
- [x] `ov-lang-59-patterns` (`10.4`)
- [x] `ov-lang-phrases-idioms-register` (`10.5`, `10.6`, `10.7`)
- [x] `ov-lang-grammar-repairs-editing` (`10.8`, `10.9`)
- [x] `ov-targets-evidence-cycle` (`11.1`, `11.2`, `11.3`, `11.4`, `11.5`)
- [x] `ov-patterns-practice-input` (`11.6`, `11.7`, `11.8`, `11.9`, `11.10`)
- [x] `ov-materials-stress-readiness-testday` (`11.11`, `11.12`, `11.13`, `11.14`)
- [x] `ov-claims-checklists-sources` (`12.1`, `12.2`, `12.3`, `A.1`, `A.2`, `A.3`, `A.4`)

### Module 2 · `listening` (`11` units)
- [x] `l-four-contexts` (`3.1`)
- [x] `l-preview-period` (`3.2`)
- [x] `l-complete-message-paraphrase` (`3.3`, `3.4`)
- [x] `l-eight-distractors` (`3.5`)
- [x] `l-forms-notes-tables-summaries` (`3.6`, `3.7`)
- [x] `l-sentences-short-answers` (`3.8`)
- [x] `l-multiple-choice-matching` (`3.9`, `3.10`)
- [x] `l-maps-plans-diagrams` (`3.11`)
- [x] `l-discussions-and-lectures` (`3.12`, `3.13`)
- [x] `l-entry-and-recovery` (`3.14`, `3.15`)
- [x] `l-diagnosis-microlistening-pitfalls` (`3.16`, `3.17`, `3.18`, `3.19`)

### Module 3 · `reading` (`14` units)
- [x] `r-task-and-five-operations` (`4.1`, `4.2`)
- [x] `r-passage-map` (`4.3`)
- [x] `r-full-claim-anatomy` (`4.4`)
- [x] `r-true-false-not-given` (`4.5`)
- [x] `r-yes-no-not-given` (`4.6`)
- [x] `r-matching-headings` (`4.7`)
- [x] `r-matching-information` (`4.8`)
- [x] `r-matching-features-and-endings` (`4.9`, `4.10`)
- [x] `r-sentence-summary-completion` (`4.11`, `4.12`)
- [x] `r-tables-flowcharts-diagrams` (`4.13`, `4.14`)
- [x] `r-short-answers-multiple-choice` (`4.15`, `4.16`)
- [x] `r-order-and-unfamiliar-words` (`4.17`, `4.18`)
- [x] `r-pacing-diagnosis-speed` (`4.19`, `4.20`, `4.21`, `4.22`)
- [x] `r-gt-reading-comparison` (`[GT]`, `4.1`, `1.6`)

### Module 4 · `writing` (`29` units)
- [ ] `w-purposes-and-criteria` (`5.1`, `5.2`)
- [ ] `w-coherence-vs-cohesion` (`5.3`)
- [ ] `w-words-and-grammar-for-meaning` (`5.4`, `5.5`)
- [ ] `w-process-timing-length-review` (`5.6`, `5.7`, `5.8`, `5.9`, `5.10`)
- [ ] `w-a1-reporting-principle-and-jobs` (`6.1`, `6.2`)
- [ ] `w-a1-decode-and-main-features` (`6.3`, `6.4`)
- [ ] `w-a1-plan-and-introduction` (`6.5`, `6.6`)
- [ ] `w-a1-accurate-overview` (`6.7`)
- [ ] `w-a1-grouping-and-chunking` (`6.8`, `6.9`)
- [ ] `w-a1-numbers-and-percentages` (`6.10`, `6.11`)
- [ ] `w-a1-trend-and-comparison-grammar` (`6.12`, `6.13`)
- [ ] `w-a1-line-bar-table` (`6.14`, `6.15`)
- [ ] `w-a1-pie-and-multiple-visuals` (`6.16`, `6.17`)
- [ ] `w-a1-maps-and-plans` (`6.18`)
- [ ] `w-a1-process-diagrams` (`6.19`)
- [ ] `w-a1-review-and-subskills` (`6.20`, `6.21`)
- [ ] `w-t2-prompt-layers-and-plan` (`8.1`, `8.2`)
- [ ] `w-t2-opinion-and-discussion` (`8.3`, `8.4`)
- [ ] `w-t2-advantages-and-evaluations` (`8.5`)
- [ ] `w-t2-causes-solutions-two-part` (`8.6`, `8.7`)
- [ ] `w-t2-generate-and-select-ideas` (`8.8`, `8.9`)
- [ ] `w-t2-plan-and-introduction` (`8.10`, `8.11`)
- [ ] `w-t2-body-paragraphs-and-mechanisms` (`8.12`, `8.13`)
- [ ] `w-t2-examples-position-qualification` (`8.14`, `8.15`, `8.16`)
- [ ] `w-t2-conclusion-and-cohesion` (`8.17`, `8.18`)
- [ ] `w-t2-review-models-feedback-myths` (`8.19`, `8.20`, `8.21`, `8.22`)
- [ ] `w-gt-purpose-reader-register` (`[GT]`, `7.1`, `7.2`)
- [ ] `w-gt-structure-openings-details` (`[GT]`, `7.3`, `7.4`, `7.5`)
- [ ] `w-gt-conventions-informal-check` (`[GT]`, `7.6`, `7.7`, `7.8`, `7.9`)

### Module 5 · `speaking` (`10` units)
- [ ] `s-interview-and-criteria` (`9.1`, `9.2`)
- [ ] `s-procedural-and-part1` (`9.3`, `9.4`, `9.5`)
- [ ] `s-part2-decode-and-prepare` (`9.6`, `9.7`)
- [ ] `s-part2-long-turn-and-timeframes` (`9.8`, `9.9`)
- [ ] `s-part3-operations-and-development` (`9.10`, `9.11`)
- [ ] `s-frameworks-unfamiliar-pauses` (`9.12`, `9.13`, `9.14`)
- [ ] `s-natural-language-and-functions` (`9.15`, `9.16`)
- [ ] `s-pronunciation-stress-pace` (`9.17`, `9.18`, `9.19`)
- [ ] `s-self-correction-and-review` (`9.20`, `9.21`)
- [ ] `s-models-shadowing-ai-myths` (`9.22`, `9.23`, `9.24`)
