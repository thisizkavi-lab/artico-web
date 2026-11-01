# Chapter 06 study UI pilot

Status: implemented for Chapter 06; ready for Kavi's visual review. These are candidate decisions, not an approved course-wide standard. Chapters 01–05 and 07–96 retain their existing lesson presentation.

## Reading hierarchy

The English expression is the focal point. Supporting explanations, Japanese glosses, speaker names, and notes should help the reader interpret it without competing with it.

| Role | Pilot treatment |
| --- | --- |
| Expressions beside an illustration | 15px, weight 650, dark blue-grey; 14px on phones |
| Expression column and reply forms | 14px, weight 600; 13px on phones |
| Conversation | 15px, weight 450, line height 1.65; 14px on phones |
| Table explanations / introductory prose | 12px, muted blue-grey |
| Japanese glosses / row explanations | 11px, muted blue-grey, generous line height |
| Notes | 11.5px, muted warm grey, line height 1.8 |
| Note label | 9.5px; one simple “Note” / “メモ” label |
| Speaker / example labels | 10.5px, muted grey |

Primary expressions retain their source wording. Dimness comes from explicit text colors and type size, rather than lowering the opacity of an entire component and fading its phrases and controls together.

## Surfaces and illustrations

Each section keeps its existing blue, green, lavender, or warm-paper tint. The inner illustration board and tables use a mix of 66% section tint and 34% white. Phrase pills use 38% section tint and 62% white. Borders use a 17% accent mix. This makes the inner surface slightly brighter without introducing a separate white panel.

Chapter 06's four existing transparent illustrations fit their topics and are retained. Images use `object-fit: contain`, a transparent stage, and a bounded height: 190–255px on larger screens, 175px on phones. They must remain uncropped and undistorted. Image generation is reserved for a specific missing or misleading teaching illustration, after reviewing each chapter's content.

The conversation uses consistent left/right positions for Nico and Harper, small names above each bubble, and related incoming/outgoing section tints. Quiet speaker initials replace old portraits that did not match the illustrated people. Audio controls retain their actual availability and behavior.

Notes use a restrained yellow surface (`#fbf8ed`), subtle border, and no large heading or repeated “Good to know” prefix.

## Requested annotations

| Comment | Chapter 06 result |
| --- | --- |
| 1 | Remove the redundant “Planning a workshop” card in English and Japanese. Keep the conversation. |
| 2 | Replace the three statement/reply bullets with a “You hear” / “You can say” table. Keep all alternatives. |
| 3 | Make the following caution a smaller, dimmer yellow note. |
| 4 | Remove the redundant “Discussing a movie” card in both languages. Keep the conversation. |
| 5 | Replace the four continue/close bullets with an expression/purpose table. |
| 6 | Put the final agree-to-disagree caveat in a small yellow note. |
| 7 | Smooth the shared EN / 日本語 selector with a sliding thumb, keyboard focus, pressed states, and reduced-motion support. |
| 8 | Replace the shared profile symbol with a consistent outlined user-circle icon. |
| 9 | Replace the Progress checkmark with an outlined ascending-bar icon. |
| 10 | Tint Chapter 06's illustration boards and phrase cards from their parent section. |
| 11 | Refine Chapter 06's conversations with compact bubbles, quieter speaker labels, stable sides, and aligned audio. |
| 12 | Put the reason/direct-disagreement guidance in a smaller yellow note. |
| 13 | Match Chapter 06's table surfaces to their parent section tint. |

The Japanese source splits the reply examples into three lists, each followed by an explanation. The pilot combines these into one table and keeps each explanation beside the corresponding reply. No Japanese teaching content is dropped.

The remaining interpretive paragraphs following conversations receive the same quiet note treatment. In the first section, the reply pairs move out of the illustration's phrase pills and into their comparison table, avoiding long repeated pills. Phrase IDs, conversation turn IDs, and deep links remain available.

Only the language selector and the two requested shell icons are shared across the application. Lesson structure, tables, notes, tint adjustments, and chat changes are scoped to Chapter 06. Practice and progress data are unchanged.

## Carrying this forward after review

Review each chapter individually in order. Identify whether each block teaches vocabulary, phrases, conversation, or a note; choose its presentation based on that purpose. Use a table for a comparison or expression/meaning relationship, and a conversation for contextual use. Remove an empty scene label only when the scene is already clear. Never remove substantive teaching content to tidy the screen.

Before creating artwork, inspect the existing illustration for meaning, character consistency, transparency, proportion, and its relationship to the surrounding phrases. Keep a working illustration when it teaches the right thing. Use a simple SVG diagram where relationships or categories matter; generate a new illustration when a scene genuinely helps understanding.

Check English and Japanese, every section, and mobile wrapping before calling a chapter ready. Record exceptions to these candidate values and bring the next chapter back for review until the visual rules are settled.

## Validation

- `npm run test:chapter06-pilot`: source preservation in English/Japanese, all three reply pairs, all four continuation expressions, retained Japanese row explanations, conversations, notes, and unique phrase anchors; existing conversation-layout checks.
- `node --test src/web/learning.test.js scripts/chapter06-pilot.test.mjs scripts/conversation-layout.test.mjs`: all 40 relevant shell, pilot, and conversation checks pass, including the updated sliding-toggle styling check.
- `npm exec vite build`: production build.
- Browser review at 978×901 and 390×844; all four illustrations load; tables fit without horizontal overflow; English/Japanese switching, keyboard operation, saved preference, profile control, and Progress navigation.
- Spot-check Chapters 04 and 05 to confirm the pilot content layout stays scoped to Chapter 06.

The production build retains the repository's existing large-chunk advisory. This pilot does not change bundling strategy.

Running the broader locale suite directly against the committed generated JSON reports an existing Chapter 04 asset-reference mismatch: its English conversations point to `.png`, while Japanese points to `.svg`. The same mismatch is present in the unchanged base commit. The deployment pipeline recompiles lesson data before testing, and the broader locale check passes with that regenerated data. Chapter 04's content is outside this pilot and has not been changed.
