# Antigravity implementation task — Everyday Fluency pass 1

Execute this implementation pass now in `/Users/kavi/Documents/Codex/2026-07-22/fi`. Do not return a plan or ask for approval.

First read:

- `work/artico-everyday-fluency.md` — source of truth synthesized from the user's Irodori NotebookLM sources and chats
- `src/App.jsx`
- `src/data.js`
- `src/styles.css`

## Goal

Add the Everyday Fluency course layer after Foundation while preserving all existing landing, Foundation Learn, and Tongue Twister Practice behavior and approved styling.

## Architecture

- Add course-layer state owned by `CourseApp`: `foundation | fluency`.
- Keep the top Learn / Practice switch as the activity mode, not the course-layer switch.
- Add restrained course-layer navigation in the existing left rail: **Foundation** and **Everyday Fluency**. It must match the existing visual system and must not resemble gamification.
- Foundation + Learn renders exactly the current Learn flow.
- Foundation + Practice renders exactly the current tongue-twister flow.
- Fluency + Learn renders the Everyday Fluency overview and Module 1 lessons.
- Fluency + Practice renders a focused Module 1 practice workspace.
- Prefer a focused new `src/EverydayFluency.jsx` component module. Put curriculum data in `src/data.js`. Keep `App.jsx` as integration/composition rather than appending another monolith.

## Learn UI

- Overview: an ordered, open vertical rail/list of the eight modules from `work/artico-everyday-fluency.md`. Do not use a generic card grid or game map.
- Show each module's Japanese title, English title, and one Can-do outcome.
- Module 1 is available and opens to four lessons: Natural check-in, Smooth introductions, Never freeze again, Keep the ball rolling.
- Modules 2–8 show future curriculum using a concise “Coming next” treatment; no fake locks, progress percentages, or completion claims.
- Each Module 1 lesson follows **Context → Notice → Listen + breakdown → Imitate**.
- Use the exact example language and Japanese guidance from the brief.
- Optional model audio may call a passed `speakWithBrowser` callback only.

## Practice UI

- Four Module 1 practice lessons, tied to the selected Learn lesson.
- Each has **Substitute → Personalize → Real-world mission → Spaced return**.
- Controls and step selection must update real React state and have correct `aria-pressed` / `aria-current` semantics.
- Provide model/play controls only as browser speech-synthesis fallback.
- Do not claim to record, score, analyze, or evaluate the learner's voice.
- No timers, XP, streaks, tests, points, lives, confetti, or fake AI chat.

## Visual and responsive requirements

- Reuse the current Artico palette, typography, header, spacing, radii, focus treatments, and open-layout/container discipline.
- Keep visible copy Japanese-first where the current app is Japanese-first.
- Desktop must preserve the header/sidebar composition; mobile must collapse cleanly without horizontal overflow or clipped controls.
- Do not invent claims, testimonials, payment UI, login behavior, or unrelated pages.

## Boundaries

- You may edit `src/App.jsx`, `src/data.js`, `src/styles.css` and create `src/EverydayFluency.jsx`.
- Do not edit `package.json`, `pnpm-lock.yaml`, `vite.config.js`, `index.html`, `node_modules`, `dist`, or anything in `work`.
- Do not install dependencies or deploy.
- Do not change dependency versions or build tooling.

Before reporting completion, self-review for:

- Existing flows unchanged
- Course-layer navigation works
- All eight modules present
- All four Module 1 Learn lessons present
- All four Practice lessons interactive
- No inert controls
- Correct accessibility state
- Responsive CSS

Report exact files changed and any remaining limitation.

