# Illustrated web implementation

## Scope

Implements the twelve approved web frames from Figma V3: Home, Courses, Practice library, two-person and three-person Study, Words, Phrases, two-person and three-person Shadowing, L/R Study, chunk practice, and whole-sentence practice. Individual phrase practice and saved expressions reuse the same visual system.

All 96 English review manuscripts are available in the lesson view. Each chapter loads on demand. The illustrated chapter continues into its explanations as the learner scrolls; shadowing continues into the practice scenarios. The original foundation lessons also load separately, without importing the old complete course app.

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
- Home now presents the requested sequence, Orientation → Foundations → Social Fluency, as a connected study map. The three cards reuse the lilac, warm yellow, and sage palette. The current stage and its Continue link come from the learner's actual last visit; every stage remains accessible.
- New guests start at Orientation. Course categories follow the same order, with two Orientation lessons, six Foundations lessons, and 96 Social Fluency chapters. Stage navigation, category breadcrumbs, and lesson footers connect the entire route into Chapter 01.
- Orientation and Foundations use the shared English headings, smaller Japanese support, paper surfaces, rounded cards, and Artico buttons. Orientation explanations use a numbered book layout with a sticky desktop contents list and collapsible contents on smaller screens. The web edition's navigation explanation uses the current stage names and Study/Practice wording; original book sources remain intact.
- Saved-expression totals reflect real local bookmarks.
- Sync and new course audio are clearly marked as pending, rather than simulating working services.
- All 96 chapters are navigable. Catalog titles follow the reviewed English manuscript where it differs from the older Figma example labels.
- The full study content and practice scenarios follow the illustrated content in one continuous scroll. The already illustrated opening dialogue is not repeated in the explanations. There is no separate full-chapter step.
- The Study / Practice switch stays floating at the top of the scrolling lesson on desktop, tablet, and phone, including vocabulary and L/R practice. Switching modes preserves the scene and each mode's reading position. Legacy reader links open Study.
- Small web viewports stack study columns and use bottom navigation. Phone practice keeps a compact scene so the phrase and transport controls can fit together. Native iPhone/iPad applications are outside this web implementation.

## Validation

- `pnpm test`: seven tests covering persisted guest state, unavailable/corrupt storage, all chapter routes, reversible bookmarks, complete manuscript inventory, transitions between learning stages, and new/returning guest stage selection.
- `pnpm build`: production build with the `/artico-web/` deployment base.
- In-app browser: desktop 1440 × 1040, phone 402 × 874, and tablet 834 × 1194.
- Visually reviewed the Figma study reference and rendered screens. Checked vocabulary illustration loading and intrinsic aspect ratios.
- Exercised course groups and Chapter 96, Study/Practice navigation, two-/three-person scenes, saved expressions, alphabet inventory, chunk/whole-sentence navigation, speed changes, audio-readiness feedback, and guest profile behavior.
- Verified persisted sound speed after a reload and no horizontal overflow in the checked phone/tablet layouts.
- Continuous lesson update: checked the floating mode switch at desktop 1440 × 1040, phone 402 × 874, and the default tablet-sized browser view. Study explanations and Practice scenarios stay on their respective lesson pages, without the extra reader/scenario links.
- Scrolled Study → floating Practice → floating Study restores the same reading position. A reload also restores the position after the chapter loads. Sample answers open inline in Practice; the browser console is clear.
- Study map update: reviewed the connected desktop map at 1440 × 1040 and vertical phone layout at 402 × 874. Checked stage order, original resume destination, guest Orientation entry, the map shortcut, course category ordering, and Foundations resume on an 834 × 1194 tablet viewport.
- Compared the map and lesson layouts with the existing UI: retained paper/forest/terracotta colors, Newsreader headings, Hanken English and Noto Japanese type, 20px card corners, and the English/Japanese size hierarchy. Existing illustrations and the floating Study/Practice switch are preserved.
- Exercised Orientation contents navigation on desktop and phone, Orientation → Foundations, tongue-twister introduction → L/R, and L/R → Social Fluency. All 52 alphabet controls remain available with at least 44px height. Checked phone/tablet overflow and the browser console; no errors or warnings were recorded.

## Content and audio handoff

`src/course/chapters` contains the original English review drafts. Editorial local-file navigation was removed; chapter navigation is provided by the app. Remaining Japanese explanations and illustrations should be reviewed chapter by chapter before recordings are attached.

Keep stable audio IDs for each scenario, speaker, and utterance. The static recording manifest is currently empty. No Google credit, Figma AI credit, audio generation, or generation API is used by this implementation.
