# Social Fluency study UI notes

Status: Chapters 06–08 supply the current chapter-specific examples. Compact notes and section-tinted inner surfaces apply across Social Fluency, including the separate Humor chapter, following Kavi's review. Chapter 07's review also authorizes applying the same structural patterns throughout the course. Continue reviewing each chapter's content and illustrations individually.

## Reading hierarchy

The English expression is the focal point. Supporting explanations, Japanese glosses, speaker names, and notes should help the reader interpret it without competing with it.

| Role | Pilot treatment |
| --- | --- |
| Expressions beside an illustration | 15px, weight 650, dark blue-grey; 14px on phones |
| Expression column and reply forms | 14px, weight 600; 13px on phones |
| Conversation | 15px, weight 450, line height 1.65; 14px on phones |
| Table explanations / introductory prose | 12px, muted blue-grey |
| Japanese glosses / row explanations | 11px, muted blue-grey, generous line height |
| Notes | 10px, existing muted note color, line height 1.5; box padding 6px 9px |
| Note label | 9px; one simple “Note” / “メモ” label |
| Speaker / example labels | 10.5px, muted grey |

Primary expressions retain their source wording. Dimness comes from explicit text colors and type size, rather than lowering the opacity of an entire component and fading its phrases and controls together.

## Surfaces and illustrations

Each section keeps its existing blue, green, lavender, or warm-paper tint. Inner cards and tables use a mix of 66% section tint and 34% white. Phrase pills and conversation bubbles use 38% section tint and 62% white. Borders use a 17% accent mix. This makes the inner surface slightly brighter without introducing a separate white panel. `social-study-surfaces.css` applies this family to Chapters 01–03, illustrated phrase chapters, later shared lessons, and Humor. The purpose-built family atlas derives its inner surface from its existing neutral parent color. Selected phrase controls keep a visible selected state.

Chapter 06's four existing transparent illustrations fit their topics and are retained. Images use `object-fit: contain`, a transparent stage, and a bounded height: 190–255px on larger screens, 175px on phones. They must remain uncropped and undistorted. Image generation is reserved for a specific missing or misleading teaching illustration, after reviewing each chapter's content.

The conversation uses consistent left/right positions for Nico and Harper, small names above each bubble, related incoming/outgoing section tints, and the original portrait images. Use the existing image icons rather than speaker initials. Audio controls retain their actual availability and behavior.

Notes use a restrained yellow surface (`#fbf8ed`), subtle border, and no large heading or repeated “Good to know” prefix.

Across the course, `social-study-notes.css` supplies the compact typography and padding for the different existing note components. It includes the custom notes in Chapters 01–03, phrase notes in early chapters, shared teaching notes in later chapters, and the family-board subnote. Chapter 03's already small card annotations use 4px 7px padding. Note colors and placement remain appropriate to each layout. Vocabulary boards whose class names contain “notes” still present primary learning content and retain their normal type size.

The separate Humor chapter uses the same 10px text, 1.5 line height, and 6px 9px padding in its own note styles. Learners' editable personal notes remain normal input text.

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

The language selector and two requested shell icons are shared across the application. Note sizing and section-derived inner surfaces are shared across Social Fluency. Lesson structure and note placement remain chapter-specific. Practice and progress data are unchanged.

## Chapters 08 and 10, and shared refinements

| Review request | Implementation |
| --- | --- |
| Nested “Keep in mind” / Note boxes | Render each explanation as one compact teaching-note box, with no outer wrapper. This covers both existing Chapter 04 and 05 renderers. Supporting text and emphasis use a muted warm grey. |
| White inner cards | Derive cards, phrase pills, conversations, and tables from their parent section tint across all chapter layouts. Keep illustrations uncropped and note boxes yellow. |
| Chapter 08 artwork | Four new transparent PNG scenes: borrowing an umbrella, responding to thanks after dinner, appreciating a birthday gift, and reacting to someone leaving without notice. Keep the same characters across all four scenes. |
| Chapter 08 expressions list | A five-row expression/meaning table. Primary English is 14px on desktop and 13px on mobile; explanations are dimmer at 12px / 11.5px. |
| Chapter 08 scene labels | “A practical favor” and the dinner scene label become their conversation headings, rather than separate cards before an “Example conversation” heading. Japanese scene labels are preserved. |
| Chapter 08 grammar guidance | Put the existing “After for…” explanation in one small note below the table. Grammar fragments stay in the note instead of becoming primary phrase pills. Their phrase anchors remain available. |
| Chapter 08 optional interpretation | Put the existing English paragraph, and both Japanese paragraphs, below the illustration and phrases as quiet notes. |
| Chapter 10 leaving expressions | Convert the four marked expressions and meanings to a reference table, preserving all wording and practice identities. |

The exact prompts, filenames, and built-in Image Gen method are recorded in `docs/ch08-illustration-prompts.json`. The four project assets are `public/assets/course/ch08-01-practical-favor-ai.png`, `ch08-02-responding-to-thanks-ai.png`, `ch08-03-gift-appreciation-ai.png`, and `ch08-04-different-intention-ai.png`. Each is a native RGBA PNG with alpha ranging from 0 to 255. Sibling filenames keep the build-time procedural generator from overwriting these images. The deployment pipeline checks the actual published files, dimensions, and alpha.

These presentation transformations retain the original English/Japanese source data. The tests check table wording, scene labels, note placement, and the four distinct PNG assets. Browser review checks all four Chapter 08 sections, desktop/mobile wrapping, Japanese explanations, and phrase selection in Chapter 01.

## Chapter 07 and matching patterns across the course

The scene label belongs to its conversation. A short, standalone bold label immediately before a conversation becomes that conversation's heading; it no longer needs a separate large card followed by “Example conversation.” Preserve its English or Japanese wording. Chapter 06's explicitly removed labels remain removed.

In Chapter 07, the headings are “Choosing what to do,” “An invitation and an alternative,” and “A clearer boundary.” The six refusal/uncertainty bullets become an expression/meaning table. The invitation explanation follows the illustration and phrases, immediately above its conversation. The acceptance, alternative-plan, and Good idea / Sounds good explanations use compact notes. Remove the marked final directness commentary, including its Japanese counterpart; keep every conversation turn.

Apply the table pattern only to unordered lists with multiple rows that each begin with an emphasized expression or term and continue with an explanation. Preserve every run of text and all phrase IDs. Keep instructions, examples without definitions, and ordered sequences in their existing formats. Converted tables use semantic row/column headers and the existing section tint; explanations are smaller and dimmer than the English expression. Shared-layout tables stack their rows on phones.

Treat concise interpretive paragraphs following conversations as supporting notes. Keep the introduction above the illustration when it introduces the section. A term's first definition retains normal reading size; check its phrase-bank type and earlier section content before demoting an explanation. This also protects the vocabulary chapters' primary learning content. The approved custom layouts in Chapters 01–03, 06, 11, and 14 keep their own presentation logic.

Against the regenerated production lessons, this pass adds 26 English and 27 Japanese contextual conversation headings, and 22 English and 48 Japanese comparison tables beyond the preceding Chapter 08/10 work. The Japanese source contains additional definition lists and conversation explanations. The chapter-by-chapter audit records 88 English and 502 Japanese supporting paragraphs newly assigned a note role. These are presentation changes; the source lesson files, practice data, and stable identifiers remain unchanged. The committed JSON snapshots for Chapters 04/05 differ from their canonical Markdown, so the production audit is run after the same compilation step used by deployment.

## Carrying this forward after review

Review each chapter individually in order. Identify whether each block teaches vocabulary, phrases, conversation, or a note; choose its presentation based on that purpose. Use a table for a comparison or expression/meaning relationship, and a conversation for contextual use. Remove an empty scene label only when the scene is already clear. Never remove substantive teaching content to tidy the screen.

## Illustrated teaching cards and reference cleanup, November 2026

The next pass covers the shared Social Fluency study chapters from 13 through the final reading chapter. Source IDs after 33 are one lower than the public chapter number because Humor occupies public Chapter 34. Practice content, conversation turns, approved recordings, and permanent phrase IDs remain unchanged.

- Give each teaching card a relevant visual introduction. Chapter 13 and Chapters 15–16 use eleven new transparent PNG scenes generated with the built-in image tool. The later cards use an explicit, section-by-section native SVG plan in `scripts/study-visual-plans.mjs`, reusing reviewed objects from this repository and newly drawn diagrams. Genuine borderless introductions do not need another hero. An annotated email or sample form can itself be the teaching visual.
- Keep conversations to words, speaker portraits, and audio. Remove their repeated setting illustration at presentation time, while preserving the underlying source art and all conversation identities.
- Vocabulary chapters use labeled picture groups where exact, reviewed word-to-picture matches exist, followed by complete reference tables. Several terms in one source row can become separately labeled pictures. Do not substitute an approximate object for an unpictured word. Existing curated illustrations remain useful where a group or relationship teaches more than isolated objects.
- Match the sense as well as the spelling: software menu and restaurant menu need separate drawings, just as a cooking pot and flowerpot do. Keep these choices explicit in the artwork plan or the chapter's vocabulary mapping.
- Replace definition paragraphs with semantic term/meaning rows when the source supplies clear definitions. Keep contextual qualifications with the relevant row. The marked Media and Communication chapter has four reviewed bilingual tables, including one combined device-and-connection glossary. The marked email-folder paragraphs also become one combined glossary. Tables inherit the parent card tint and stack their rows on phones.
- A note stays small and dim; the phrase being explained is bold. Preserve source emphasis, emphasize quoted English expressions in either explanation language, and recognize plain definition subjects such as “Breaking up.” Avoid bolding an ordinary mention of a vocabulary word elsewhere in a sentence. Remove redundant “What to notice” and nested “Keep in mind” headings.
- Custom notes follow the same rule: Chapter 03 supplies its known discourse word explicitly, including short words such as So, and the family atlas emphasizes Step-, Half-, and Child in their explanations. Note-heading styles apply only to the heading so an explained word stays inline in its sentence.
- The email lesson presents the complete original email with annotations for subject, greeting, update, attachment/request, and closing/name, followed by the complete reply. The internet lesson presents the supplied form as a read-only example with labeled fields, Submit, and the exact post-submission message. These are learning examples, not working message or registration forms.
- Chapter 14's 47 emoji placeholders become native relationship, life-event, and age figures. Birth-order diagrams highlight different children. Remove only the two specifically marked half-/step-family captions; preserve the family diagrams, labels, and pronunciation controls.
- Home starting-point cards are single full-card links with keyboard focus. Remove their separate Start buttons. Tongue Twisters receives a quiet Recommended label beside its title in either explanation language.

The late-course reference edits are reviewed bilingual data in `studyReferencePresentation.js`. Merged tables retain the provenance of each original source block and the union of its phrase IDs. The selected first reading explanation and redundant document lead-ins are removed from display; their practice targets remain available. The unexpected-attachment explanation is shortened to the requested small note. The exact image prompts, dimensions, alpha checks, and final hashes are in `docs/section-illustration-prompts.json`; vector origins are in `docs/study-vector-origins.json`.

Verification for this pass: 229 course/application tests passed against regenerated production lessons; the production build passed. The shared renderer was exercised for all 83 applicable chapters in English and Japanese with unique deep links and source provenance. Browser checks covered all 83 shared English routes at 1063×903, 19 representative routes at 390×844, and Japanese switching in eight representative chapters. No horizontal overflow, blank lesson, framework overlay, visible broken image, or repeated conversation setting was found. Keyboard activation of a Home card opened Level Zero, and the recommendation label appeared beside Tongue Twisters. Review screenshots are kept outside the repository in the task's outputs folder.

Before creating artwork, inspect the existing illustration for meaning, character consistency, transparency, proportion, and its relationship to the surrounding phrases. Keep a working illustration when it teaches the right thing. Use a simple SVG diagram where relationships or categories matter; generate a new illustration when a scene genuinely helps understanding.

Check English and Japanese, every section, and mobile wrapping before calling a chapter ready. Record exceptions to these candidate values and bring the next chapter back for review until the visual rules are settled.

## Validation

- `npm run test:chapter06-pilot`: source preservation in English/Japanese, all three reply pairs, all four continuation expressions, retained Japanese row explanations, conversations, notes, and unique phrase anchors; existing conversation-layout checks.
- The focused learning-shell, Chapter 06, illustrated-study presentation, shared-study, conversation, and Humor tests pass all 53 checks. The shared-study render test checks every shared chapter in both languages, including the transformed tables, source labels retained as headings, complete source wording, and unique phrase anchors. Course-wide model checks also cover the early custom renderers, idempotence, and protection for first-use vocabulary definitions.
- `npm exec vite build`: production build.
- Browser review of the current changes at 825×903 and 390×844; all four new illustrations load, tables fit without horizontal overflow, Japanese explanations remain present, the final interpretation sits below the illustration, and Chapter 01 phrase selection still updates its selected state.
- Review shared surfaces in Chapters 01–03, 05, 08, 10, 13, and Humor. Chapter 07's structural patterns now apply to matching content elsewhere, while chapter-specific removals stay scoped to the marked lesson.

The production build retains the repository's existing large-chunk advisory. This pilot does not change bundling strategy.

Running the broader locale suite directly against the committed generated JSON reports an existing Chapter 04 asset-reference mismatch: its English conversations point to `.png`, while Japanese points to `.svg`. The same mismatch is present in the unchanged base commit. The deployment pipeline recompiles lesson data before testing, and the broader locale check passes with that regenerated data. Chapter 04's content is outside this pilot and has not been changed.
