# Artico Everyday Fluency — corrective implementation pass

Edit the existing implementation in `src/EverydayFluency.jsx`, `src/App.jsx`, `src/data.js`, and `src/styles.css`. Preserve all existing Foundation Learn and Foundation Practice behavior. Do not change dependencies.

## Product corrections

1. Remove every test/scoring mechanic from Everyday Fluency.
   - Delete `correct`, `incorrect`, `正解`, and answer-feedback behavior.
   - A real-world mission is an open speaking role-play, never a multiple-choice question.
   - Each mission should have: the Japanese scenario, one concise Japanese “Your turn” instruction, 2–3 useful English response starters, and an optional model response that the learner can reveal.
   - Response starters may be selected and spoken with browser speech, but never judged.
   - Add `modelResponse` and `prompt` fields to every Module 1 lesson mission in `src/data.js` and convert existing options to plain starter strings.

2. Reset the learning loop intentionally.
   - When a Module 1 lesson changes, reset Learn to `context` and Practice to `substitute`.
   - When switching global mode, show the first step of that mode for Everyday Fluency.

3. Accessibility/state semantics.
   - Add `aria-pressed` to LayerNav buttons, Learn/Practice step buttons, selectable substitute frames, and selectable mission starters.
   - Add `aria-current="page"` to the active Everyday module and `aria-current="step"` to the active Everyday lesson.
   - Make the optional model-answer reveal use `aria-expanded` and an associated region id.

4. Simplify status styling and language.
   - Remove decorative Ready/Next/Can-do Outcome/Listen & Notice/Listen + Breakdown/Imitate & Shadow/Substitute/Personalize/Real-world Mission/Spaced Return pills.
   - Use a restrained `.section-kicker` plain-text label inside content cards.
   - For sidebar and overview module status, show Module 1 as small plain text `Available` and Modules 2–8 as small plain text `Coming next`; do not style as rounded badges.
   - Coming modules may be clicked to view the complete overview, but must not imply that lessons are already usable. Keep the behavior intentional and use no fake locks.
   - Replace pill-like lesson tags in the overview with a simple vertical lesson list.

5. Fix content copy.
   - `会顔` → `再会`
   - `発答` → `声に出して答えて`
   - `発唱` → `発話`
   - Keep Japanese learner-facing guidance concise and natural.

6. CSS and responsive quality.
   - Add missing base styles for `.everyday-module-btn`, its number/title/status children, active/hover/focus-visible states, and overview rail elements used in the JSX.
   - Move all repeated inline layout styles in `EverydayFluency.jsx` into named CSS classes.
   - Remove obsolete correct/incorrect/feedback styles.
   - Add a `max-width: 760px` layout: Everyday sidebar becomes a compact top section; module buttons remain readable; lesson rail can scroll horizontally; step selector scrolls horizontally instead of wrapping into tiny pills; phrase/imitate/substitute/mission rows stack; cards reduce padding; all controls remain at least 44px tall.
   - Preserve the minimal cream/ink/olive visual language already used by Artico.

7. Self-review before reporting.
   - Search the whole `src` directory and confirm Everyday Fluency contains no `correct`, `incorrect`, `正解`, scoring, test, points, or streak behavior.
   - Run the production build with the available project runtime if possible.
   - Report the files changed and the build result.

