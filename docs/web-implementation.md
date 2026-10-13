# Artico web implementation

## Current design

The approved Chapter 02 reading and practice experience is now the shared design for the web app. It uses an English interface, a warm near-white page (#fbfaf7), white surfaces, blue actions (#285bcc), Newsreader headings, and Hanken Grotesk body text. Original manuscripts, original foundation sources, and Figma designs are preserved.

Home, Learn, Progress, saved phrases, all 96 Social Fluency chapters, and all eight Orientation/Foundation lessons use this theme. Desktop has a sidebar; tablet uses a compact navigation rail; phone uses bottom navigation. Lessons share the same title scale, readable text width, restrained section spacing, rounded phrase cards, and floating Study / Practice switch.

The current scope is the responsive web app. Account sync, new course recordings, and native iPhone/iPad applications remain separate work.

## Shared lesson experience

- `src/web/LessonExperience.jsx` owns continuous Study, compact illustrated conversations, phrase cards, vocabulary cards, contents navigation, the practice checklist, practice rounds, and the transition to response scenarios.
- `src/web/IntroductionsLesson.jsx` supplies the approved Chapter 02 model unchanged: 26 speaking examples, four illustrated vocabulary items, five sections, and five response scenarios. Its explicit legacy aliases remain supported.
- `src/web/ChapterLesson.jsx` adapts each other compiled chapter to that same experience. It retains full explanations, all actual speaker turns, lists, tables, email examples, diagrams, practice prompts, and sample responses. Chapter data loads on demand and is cached between modes.
- Explicit examples inside explanations also appear as separate speaking cards. Semantic vocabulary and phrase tables become cards that retain the original supporting information. Other tables retain their row/column structure and can scroll horizontally within their own region.
- Original illustrations remain in the lesson. Every conversation keeps its actual two-, three-, or four-person cast. Vocabulary illustrations supplement words where an existing relevant object or scene is available.
- Practice opens with all source-derived speaking items, grouped by their Study section. Learners can search, select/unselect, filter by familiarity, and begin a chosen set. Selection and self-rating are independent; changing a rating never removes a phrase from the active round.
- A round snapshots its queue. Previous/Next cycle within it, and returning to the chooser offers a resume action. Each item can be hidden, revealed, saved, and opened at its exact Study location. Scenarios follow phrase rehearsal; sample responses stay collapsed until requested.
- Study/Practice scroll positions, choices, ratings, notes, bookmarks, and active practice positions use the existing version-one guest store. Older saved phrase IDs still resolve. An older chapter rehearsal index becomes a resumable set by phrase identity, so inserting new examples does not shift its place.

## Orientation and Foundations

`src/course/foundations-en.js` supplies English guidance for Orientation, How Artico works, letters, hearing the alphabet, writing, speech sounds, and the tongue-twister introduction. It follows the original lesson structure while describing the current web behavior. The original Japanese sources are retained for future localization and editorial comparison.

`src/web/Foundation.jsx` shares the reading shell and gives each lesson an appropriate Practice activity: a reflection, choosing a starting point, letter listening, paper-based writing, noticing a sound, or working through a tongue twister. Theory lessons do not manufacture phrase counts or completion scores.

All 52 uppercase/lowercase letter controls remain available. They use the device’s existing English speech voice and label it as such. Existing alphabet, writing, and pronunciation videos remain embedded without autoplay. The existing 12 tongue-twister recordings and their recorded build-up chunks retain playback, actual elapsed time, repeat, and speed controls.

`src/web/SoundLesson.jsx` keeps the illustrated L/R example and its three chunks in the same reading/practice shell. It preserves the saved chunk index, text hiding, and whole-sentence navigation. This specific sentence has no approved recording yet; its audio controls say so, with a link to the existing recorded tongue-twister exercises.

## Navigation and progress

Home presents the real resume destination and the sequence Orientation → Foundations → Social Fluency. A new guest starts at Orientation. All stages remain accessible.

Learn exposes two Orientation lessons, six Foundation lessons, and all 96 Social Fluency chapters. Search spans all chapter titles, goals, and numbers. Progress lists the lessons actually opened and aggregates the learner’s own phrase ratings across chapters. These ratings are not a mastery or test score. Saved phrases link to their exact practice item.

Guest progress stays in the current browser. Storage failures are handled without preventing learning; the interface explains when progress will last only for the current visit. Sign-in and device sync are not simulated.

## Content maintenance

1. Edit original English manuscripts in `src/course/chapters`; do not hand-edit generated lesson JSON.
2. `src/course/chapter-designs.js` supplies the existing visual plans, scene assignments, vocabulary, and optional teaching diagrams.
3. `pnpm lessons` compiles all chapters, refreshes the catalog and `lesson-design-audit.json`, and recreates the existing local SVG assets. It also runs before development and production builds. No generation service is involved.
4. `scripts/lesson-parser.mjs` records every source block and its source span. Only top-level Study/Practice headings change mode; a subsection that discusses practice stays in Study.
5. `scripts/phrase-bank.mjs` collects explicit source examples and speaker turns. `scripts/term-art.mjs` connects short terms to existing relevant illustrations. Study cards and Practice use the same IDs.
6. New example IDs derive from the section and phrase text; unrelated preceding examples do not change them. Existing dialogue, vocabulary, and presentation IDs are retained. Structural manuscript changes can still change source section/line IDs, so review bookmark and future audio mappings when editing those structures.

The shared layout rollout does not replace the planned chapter-by-chapter language and recording review. Grouped source vocabulary remains grouped where that is how the manuscript presents it.

## Audio handoff

New Social Fluency recordings are not attached yet. The approved static audio manifest is empty, and playback controls clearly indicate unavailable recordings. Existing foundation recordings and device letter playback remain usable. No Google credit, Figma AI credit, audio generation, or generation API is used by this rollout.

Keep the stable phrase IDs when attaching approved files. The final content and context should be reviewed before audio generation.

## Validation status

`pnpm test` passes 22 checks covering guest persistence, route/stage boundaries, bookmarks, selection/rating independence, empty and active practice sets, legacy position migration, all 96 manuscript sources, actual conversation casts, illustration availability, one Study anchor per practice record, foundation guidance, and existing sound files.

The new source coverage check also caught and fixed Chapter 40’s nested “Practice with a complete fictional policy” heading incorrectly switching the rest of its teaching examples out of Study.

`pnpm build` passes with the existing `/artico-web/` deployment base; `git diff --check` also passes. The running local development preview is `http://localhost:5173/#/home`.

Final visual and interaction verification for this full rollout is pending. The in-app browser retained a connection-error page after the development server restarted; its browser URL policy blocks control of that error page. The user has been asked to reopen the normal app page. Passing source tests and a production build do not establish rendered fidelity. Desktop/tablet/phone screenshots, sticky mode switching, real media playback, and end-to-end practice interaction checks should be completed on that reopened page before claiming visual QA passed.

## Japanese explanations and language selection

Japanese is the default supporting language. A compact native selector sits beside the guest profile on desktop, tablet and phone; the same setting is available in the profile dialog. English remains available for reviewing the original edition. The preference is stored separately from learning progress under `artico.explanation-language.v1`, with a safe Japanese fallback when storage is unavailable or invalid.

Orientation, Foundations, the 12 existing tongue-twister exercises, all 96 Social Fluency chapters, and the hand-composed introduction pilot have Japanese explanations. English teaching examples retain their original text and recording/progress IDs. The chapter compiler keeps the existing cast, illustrations, phrase cards, study anchors and practice choices. Japanese supports the larger English expressions at a smaller readable size; the white/blue theme and responsive layout are shared.

Sources and generated data live in `src/course/locales/ja`. `pnpm lessons`, `predev` and `prebuild` compile both editions. Japanese and English chapter data load per chapter. There are no runtime translation or generation API calls. Chinese, Korean and Nepali have not been added as empty menu choices.

Validation includes shared-identity tests across all 96 chapters, all eight foundation/orientation lessons, persisted preferences, invalid/blocked storage and the custom introduction model. Browser checks exercise all 96 Study and Practice routes in both languages, plus desktop (1440×1000), tablet (1024×900) and phone (390×844) layouts. Switching languages preserves selected phrases, ratings and the current practice item through reload. Japanese chapter search and the two synchronized language controls are exercised as well.
