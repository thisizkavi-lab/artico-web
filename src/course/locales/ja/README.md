# Japanese explanation edition

The learner's target language remains General American English. Japanese is the supporting language for explanations and interface labels. English is available from the same language selector; phrase, chapter, and progress IDs are shared.

- `chapters/*.md`: the 96 chapter manuscripts, copied from the reviewed Japanese explanation package. English examples and original-heading markers are retained.
- `00-*.md` through `03-*.md`: Orientation and Foundations, including all 12 existing tongue twisters and the L/R lesson.
- `introductions.js`: the Japanese support text for the composed Chapter 02 pilot. Its layout and permanent phrase IDs come from `src/course/introductions.js`.
- `lessons/*.json`, `catalog.json`, `foundations.json`: generated application data. Edit the source manuscripts, then run `pnpm lessons`.

The compiler reuses the English phrase bank, casts and artwork. It checks conversation identity rather than creating new recording or progress keys from translated line numbers. Course content is prepared at build time. No translation API, speech generation, or paid credit is involved.

`src/web/locales/ja.js` contains the interface copy. `src/web/locale.js` declares the available languages and the versioned preference key. Only Japanese and English are selectable. Further language editions need their own reviewed content and shared-identity tests before they are added to that list.

Validation: `pnpm test` checks Japanese coverage and identity alongside the English course and saved-progress tests.
