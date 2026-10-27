# IELTS Academic application track

Entry: `#/application/tests` → `#/application/tests/ielts/home/study`.

## Released structure

Eight directories reuse Artico’s existing visual system: Overview, Speaking,
Writing, Listening, Reading, Guided Sets, Individual Skill Mocks, Full Simulations.
The IELTS Study / Practice control and all instructional content are English-only.
Other courses retain their existing explanation language.

## Content in this release

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

`pnpm test` includes `src/web/ielts.test.js`: deep links, content/evidence references,
asset existence, storage round trips, exposure, deadlines, pauses, shared Writing time,
post-deadline answer rejection, and idempotent completion. `pnpm run build` verifies
the production GitHub Pages base path. Browser QA covers the actual interaction loop.

Official sources are linked from Overview and Skill Mocks. Provider examples stay
on their own sites; book pages, proprietary question banks, and private research
screenshots are not included in this repository.
