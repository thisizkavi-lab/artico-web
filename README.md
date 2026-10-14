# Artico web prototype

A responsive React/Vite prototype for Artico, implementing the approved illustrated Figma web design. English leads the lesson content; smaller Japanese text supports understanding.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://127.0.0.1:5173/`.

```bash
pnpm test
pnpm build
```

## GitHub Pages

The `main` branch deploys automatically through GitHub Actions. Once the first
deployment completes, the site is available at:

`https://thisizkavi-lab.github.io/artico-web/`

## Included in this prototype

- A bilingual landing page with the original slogan, illustrated Study/Practice previews, and a short entrance animation that respects reduced motion
- First-time visitors enter through the landing page; returning learners go to Home. `#/landing` always opens the landing page for review. Start learning opens the existing Orientation; no separate onboarding is required.
- Guest learning home, resume cards, course browsing, and practice library
- A shared lesson footer across Orientation, Foundations, and all 96 chapters: Go to Practice above Previous/Next on Study pages, with Previous/Next also available in Practice. Chapter 96 leads to Progress.
- All 96 original General American English review chapters, loaded individually
- Illustrated Chapter 02 with two- and three-person conversations
- Four illustrated vocabulary words and two phrase scenes
- Listen, Repeat, and Shadow modes, phrase selection, and playback speed controls
- Illustrated L/R sound lesson, three chunks, and whole-sentence practice
- Saved expressions, last study/practice locations, and reading positions stored locally
- Existing orientation, alphabet, writing, sound-awareness, and tongue-twister explanations
- Responsive web layouts for desktop, tablet, and phone

## Prototype boundaries

- Dedicated new course recordings are pending. The audio controls show a clear readiness message; no audio generation service or API is called.
- `approvedAudio` in `src/web/components.jsx` is the attachment point for reviewed static recordings. Asset paths are relative to the Vite deployment base.
- The original Foundation material keeps its existing recordings, browser pronunciation preview, and credited video references. These are separate from the new course recordings.
- Progress is local to this browser. The guest profile explains that account sign-in and cross-device synchronization are pending.
- English and Japanese explanations are available throughout Orientation, Foundations, and all 96 chapters. Spoken English, phrase identities, and illustrations stay consistent between languages.
- The illustrated introduction of Jordan is a separate scenario from the full chapter's introduction of colleague Sam. Keep scene text and audio identities distinct during recording review.
- The previous app source, content, and assets remain in the repository. Earlier Figma designs are preserved alongside the new landing page.

## Design reference

The source is the `04 · Illustrated learning / V3` page in [Artico — Web, iPad & iPhone](https://www.figma.com/design/UpOjDYloonXEyU5m6fcnWz/Artico?node-id=79-353).

The landing page uses the separate [05 · Landing / Blue & Paper](https://www.figma.com/design/UpOjDYloonXEyU5m6fcnWz/Artico?node-id=182-415) design. Its English/Japanese layouts adapt to desktop, tablet, and phone. The live hero uses the Figma entrance timings once; the Study and Practice examples remain visible while learners read and try the checkboxes.

The implementation uses plain CSS and reusable React components. Exported artwork lives in `public/assets/figma/`; no full-screen design screenshot is used as app content. See [web implementation notes](docs/web-implementation.md) for the fidelity and validation record.
