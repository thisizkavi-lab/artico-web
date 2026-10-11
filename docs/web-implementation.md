# Illustrated web implementation

## Scope

Implements the twelve approved web frames from Figma V3: Home, Courses, Practice library, two-person and three-person Study, Words, Phrases, two-person and three-person Shadowing, L/R Study, chunk practice, and whole-sentence practice. Individual phrase practice and saved expressions reuse the same visual system.

All 96 English review manuscripts are available through a shared reader. Each chapter loads on demand. The original foundation lessons also load separately, without importing the old complete course app.

## Fidelity record

| Element | Figma target | Web implementation |
| --- | --- | --- |
| Desktop frame | 1440 × 1040 | Checked at these viewport dimensions |
| Navigation | 220px sidebar, 72px top bar | Same dimensions at desktop size |
| Content | 1140px inside 40px side padding | Same measured content width |
| Palette | Paper #f8f5ef, forest #213b35, terracotta #a64732 | Shared CSS tokens |
| Typography | Newsreader headings, Hanken Grotesk English/UI, Noto Sans JP support | Same font families and weights |
| Language hierarchy | English heading 44/50; Japanese 14/24 at 78% opacity | Same desktop hierarchy |
| Study scene | 390 × 195; conversation column 718px | Same measured dimensions |
| Conversation | 48px portrait + 12px gap + 658px bubble | Same measured geometry; 204px first two-line bubble |
| Word illustrations | Four 238 × 145.444 images inside 270px cards | Measured 238 × 145.4375 and 270px cards |
| Artwork | Original illustrations, portraits, and icons | 39 local SVG assets, original root geometry preserved |

## Deliberate behavior differences

- First visits invite the learner to start; resume wording and phrase counts appear after an actual visit. No seeded completion statistics are shown.
- Saved-expression totals reflect real local bookmarks.
- Sync and new course audio are clearly marked as pending, rather than simulating working services.
- All 96 chapters are navigable. Catalog titles follow the reviewed English manuscript where it differs from the older Figma example labels.
- Extra book reading, scenario practice, and bookmark actions appear after the illustrated lesson content.
- Small web viewports stack study columns and use bottom navigation. Phone practice keeps a compact scene so the phrase and transport controls can fit together. Native iPhone/iPad applications are outside this web implementation.

## Validation

- `pnpm test`: five tests covering persisted guest state, unavailable/corrupt storage, all chapter routes, reversible bookmarks, and complete manuscript inventory.
- `pnpm build`: production build with the `/artico-web/` deployment base.
- In-app browser: desktop 1440 × 1040, phone 402 × 874, and tablet 834 × 1194.
- Visually reviewed the Figma study reference and rendered screens. Checked vocabulary illustration loading and intrinsic aspect ratios.
- Exercised course groups and Chapter 96, Study/Practice navigation, two-/three-person scenes, saved expressions, alphabet inventory, chunk/whole-sentence navigation, speed changes, audio-readiness feedback, and guest profile behavior.
- Verified persisted sound speed after a reload and no horizontal overflow in the checked phone/tablet layouts.

## Content and audio handoff

`src/course/chapters` contains the original English review drafts. Editorial local-file navigation was removed; chapter navigation is provided by the app. Remaining Japanese explanations and illustrations should be reviewed chapter by chapter before recordings are attached.

Keep stable audio IDs for each scenario, speaker, and utterance. The static recording manifest is currently empty. No Google credit, Figma AI credit, audio generation, or generation API is used by this implementation.
