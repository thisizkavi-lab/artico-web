# Artico Review — memory engine v1

## Purpose
Artico Review is an **internal Artico feature**, not an Anki integration.
Course content stays in Artico. Learner state and review logs stay in this
browser's IndexedDB. This feature requires neither an Anki account nor a
server API.

## Scheduling
`src/web/reviewEngine.js` is the only code that talks to
`ts-fsrs@5.4.2`. This pins the implementation and its npm integrity hash.

- Target retention: 90% (a model target, **not a guarantee**).
- Short-term learning steps: 1 and 10 minutes.
- Relearning step: 10 minutes.
- Maximum interval: 36,500 days.
- Fuzzing disabled to keep review outcomes deterministic in tests.
- Four self-assessed ratings: Again, Hard, Good, Easy.
- No implicit grade is awarded for opening a lesson, playing audio,
  selecting a practice item, or marking it familiar.

A saved item begins **unreviewed**. Its first grade initializes FSRS memory
state. Later grades update that state and produce a next due timestamp.
Due reviews are prioritized before new items. The review screen includes
up to 10 *new* items in each queue; this is **not** yet a per-calendar-day
limit. Missed short-term items reappear when their due timestamp arrives.

## Content identities and review prompt quality
Current scope: the 96 original Social Fluency source lessons **and all 78 vocabulary topics**. Public chapter numbers can shift when chapters are inserted; each review item stores both its stable source chapter and its current public chapter path.
`buildPracticeCatalog` already resolves multiple source occurrences into
practicable items, and each card retains the exact practice ID plus the
original Study anchor. The review record stores a small content snapshot
so a review can still be shown after navigating away from a chapter.
Re-saving an item updates its presentation without resetting memory state.

Review v1 tests **recognition / meaning / appropriate usage**. It shows the
English item first, hides the lesson context until Reveal, and asks the
learner to judge actual recall. Context is not presented as an authoritative
translation, and there is no automatic speaking assessment.

**Included:** the dedicated 78-topic vocabulary library, with Japanese-to-English
recall for items with a usable Japanese cue. Chapters 1 and 2 use country/
nationality relations and number terms; the other 76 topics use the existing
organized card data and deduplication. The first saved meaning retains its
FSRS history if the same normalized, sense-aware term is added again.
**Not yet covered:** independently graded production cards, audio-based recall,
manual review of uncertain semantic aliases, automatic translations,
account sync, and backup. Don't claim
these capabilities until their respective content and tests are ready.

## Persistence and safety
`src/web/reviewStore.js` opens IndexedDB `artico.review.v1`:

- `items`: one active/suspended card state per stable practice ID.
- `logs`: append-only grade events per item, with review timestamp,
  prior/new due date, FSRS model version, and whether the item was new.

One IndexedDB read-write transaction updates the card and appends its log,
so partial writes do not turn into phantom reviews. A stale tab cannot
submit another grade for an already-advanced repetition count. Suspending
a card does **not** discard its scheduling state or review history.

All writes surface storage errors rather than silently claiming success.
Content ID changes need explicit aliases/migrations rather than rewriting
stored IDs. Clearing site/browser storage loses this device's progress.
Account sync and user-initiated backup are future features.

## Validation
The new unit tests cover valid IDs, new-card state, JSON serialization,
all four ratings, repeated reviews, preserving history on content edits,
invalid inputs, clock rollback, queue priority and new-item limits.

The PR verification workflow runs `pnpm install --frozen-lockfile`,
`pnpm test`, and `pnpm run build`. Browser-level IndexedDB and accessible
mobile UI still need a manual test before merging into `main`.

## Manual acceptance test
1. Enter Chapter 01 Practice and start a phrase session.
2. Add a phrase to Review; repeat the action to suspend and re-add it.
3. Open Practice > Your Review. Confirm the phrase is shown exactly once.
4. Reveal meaning/usage and select Good. Confirm the item leaves today's
   queue and reappears when due.
5. Reload the page and inspect Review; its progress must persist.
6. Open a second tab, load the same item, review it in the first tab,
   then try grading the stale copy in the second tab; the second grade
   must be rejected.
7. Switch language; check that the same identity/history is retained.
8. Test mobile keyboard navigation, screen readers, and storage denied
   or storage full. Error messages should be visible.


## Vocabulary identity and non-destructive cleanup
`vocabularyIdentity.js` owns stable content keys. `vocabularyDedup.js`
consumes the same normalization and explicit polysemy map, including
Polish/polish, date, ticket, fish, chicken, and bat. Plain spellings are
deduplicated across lessons **only when they mean the same thing**.
A country/nationality *relationship* has its own identity.

In the populated source audit, 348 normalized expressions occurred in
multiple topics. This is not 348 proven content mistakes: recurring concepts
may reinforce a lesson, and some spellings encode different senses.
Do not delete source entries or collapse the editorial examples to "clean"
a review deck. Review records are separate from the immutable lesson content.

Vocab review currently requires an explicit Japanese cue; picture-only items
without a Japanese meaning do not create unsupported native recall prompts.
The vocabulary card toggle uses one membership query per topic page, not a
separate IndexedDB query for every item. This stage does not attempt automatic
cross-curriculum phrase-vocabulary synonym reconciliation.
