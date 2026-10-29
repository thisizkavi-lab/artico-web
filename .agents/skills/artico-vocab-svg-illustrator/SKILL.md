---
name: artico-vocab-svg-illustrator
description: Senior editorial SVG illustration craft, constructive geometry workflow, palette tokens, triage judgment, and visual QA loop for illustrating Artico's 3,950 English vocabulary cards (Lessons 3–78) locally via SVG-to-WebP without external APIs or scraped photos. Activate whenever creating, fixing, triaging, or reviewing vocabulary illustrations in artico-web.
---

# Artico Editorial SVG Illustrator Skill (`artico-editorial-svg-v1`)

This skill encodes **how a senior frontend & vector illustrator thinks, plans coordinates, constructs layered `<svg>` geometry, triages abstract words, and critiques rendered output** so a fast worker model (e.g. **Gemini 3.8 Flash High**) produces textbook-grade illustrations consistently across all ~3,950 Artico vocabulary items — with **zero external image APIs** and **zero scraped third-party photos**.

Before writing any SVG, also load as needed:
- `references/PALETTE_AND_RIGS.md` — Full 18-material color triad table + copy-pasteable SVG structural templates (Character Bust Rig, Part-of-Whole `<clipPath>` Rig, Contrast Pair Rig, Action Tool Rig, Material Swatch Rig).
- `references/TRIAGE_AND_POLYSEMY.md` — Complete 4,000-word `ILLUSTRATE` vs. `TEXT_ONLY` decision matrix + lesson-by-lesson polysemy traps (`date`, `bat`, `polish`, `second`, `court`, `mole`, `cream`, etc.).
- Live gold-standard `.svg` exemplars in `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/svg/` (`29/pomegranate.svg`, `54/kitten.svg`, `14/elbow.svg`, `15/collar.svg`, `68/fever.svg`, `34/chef.svg`, `11/sweep-the-floor.svg`, `46/turn-left.svg`).

---

## 1. Architecture Reality Check (Why SVG Source → WebP Output)

1. **React cards NEVER render inline `<svg>` in Lessons 3–78.** `src/web/vocabularyIllustrations.test.js` strictly asserts `!view.includes('<svg')` and requires `public/vocabulary-course/<NN>/<slug>.webp` (`608×384`, `<= 80 KB`).
2. **Never hand-edit `src/web/vocabularyCourseArt.json`.** Author clean `.svg` source files in `work/vocab-art/svg/<NN>/<slug>.svg` with `viewBox="0 0 304 192"` and `data-vocab-key="<lesson>:<term>"` on the root `<svg>`, then compile them with:
   ```bash
   cd /Users/kavi/Documents/kyoto/artico-web
   /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py build --lesson <NN> --debug-grid
   ```
   The compiler lints XML + palette + shape complexity, supersamples at `4×` (`1216×768`) via `resvg_py`, Lanczos-downsamples to crisp `608×384` `.webp`, updates `src/web/vocabularyCourseArt.json`, and outputs `work/vocab-art/review/lesson-<NN>-grid.png` for visual inspection via `read_file`.

---

## 2. How I Think Before Writing a Single Line of `<svg>` (The 5-Step Mental Model)

Untrained models jump straight from an English word (`"collar"`, `"fever"`, `"sweep"`) into guessing `<circle>` and `<rect>` coordinates. That produces unrecognizable "primitive soup". Follow this exact 5-step mental sequence before touching XML:

### Step A — Pin the Exact Sense via Japanese Gloss & Siblings
Run `plan --lesson <NN>` first. Read **both** the Japanese gloss (`ja`) and every `sibling` in the same group:
- `"29:date"` (`デーツ`) in *Fruit* = shriveled sweet brown palm fruit + pit, **NEVER** a calendar page.
- `"15:collar (shirt)"` (`えり`) alongside `"sleeve"`, `"pocket"`, `"button"` = if you draw a whole colored shirt, a learner guesses `"shirt"`. You **must** ghost the shirt in muted slate-grey and light up **only** the collar.
- `"11:sweep the floor"` alongside `"mop the floor"` and `"vacuum"` = broom + dry dust bunnies + dustpan on dry wood planks, **never** water puddles or a generic person holding a stick.

### Step B — Honest Triage: Does This Word Deserve a Picture?
Not all 3,950 words should be illustrated! A forced charade teaches the **wrong** meaning.
- **Illustrate (`SVG`):** Concrete objects, foods, animals, anatomy/parts, garments, tools, rooms/places, vehicles, weather, distinct physical actions/chores, professions, spatial prepositions/directions, concrete measurable contrasts (`heavy`, `deep`, `empty`), and primary emotions.
- **Suppress (`TEXT_ONLY` via `svg_vocab_compiler.py mark-text`):**
  - `FUNCTION`: Discourse markers, conjunctions, time-linkers, hedges (`furthermore`, `on the other hand`, `apparently`, `by the way`, `in my opinion`).
  - `ABSTRACT`: Non-visual abstract nouns/verbs/adjectives (`assumption`, `factor`, `aspect`, `tendency`, `inevitable`, `relevant`).
  - `IDIOM`: Idioms whose situational meaning cannot be distinguished from a generic conversation (`to tell the truth`, `as a matter of fact`). *(Note: visual idioms with a vivid real-life scene like `break the ice` or `spill the beans` = illustrate the **real human meaning**, never literal ice cubes or beans!)*
  - `SENSE`: Near-synonyms within the same group where a drawing would look identical to a sibling (`glad` vs `pleased` when `happy` is already illustrated, unless a clear intensity/context cue differentiates them).
  - `SENSITIVE`: Graphic crime, gore, or explicit trauma terms where any literal drawing violates safety.

### Step C — Silhouette & 60% Scale Budget on the `304 × 192` Stage
Mentally divide `viewBox="0 0 304 192"` (center `(152, 96)`):
- **Safe Zone:** Keep all essential subject contours inside `x ∈ [28, 276]`, `y ∈ [18, 174]`. CSS `object-fit: cover` clips outer edges on narrow viewports, and the compiler warns if dark ink touches the outer `6px` border.
- **Scale Target:** The primary subject should span **110–145px tall** (`~60–75%` of `192px` height) or **140–210px wide**. Cards render as `~150px`-wide thumbnails on mobile: tiny details (`< 3px`) vanish; bold silhouettes win.
- **Squint / Black-Fill Test:** Imagine filling your main subject solid black. Could someone still tell a *teapot* from a *mug*, a *kitten* from a *dog*, a *broom* from a *mop*? Put defining handles, spouts, ears, crowns, brims, and bristles **on the outer silhouette**, not hidden inside flat rectangles.

### Step D — Pick ONE of the 7 Studio Composition Archetypes
Never invent an ad-hoc layout. Every illustratable vocabulary item belongs to one of these 7 archetypes:

| # | Archetype | When to Use | Mandatory Visual Formula | Gold Exemplar |
|---|---|---|---|---|
| 1 | **Hero Object (+ Cross-Section / Scale Cue)** | Foods, tools, garments, animals, instruments | 3/4 view centered on `#FAF8F3` paper + elliptical ground shadow (`#EAE3D5`/`#DDD4C3`). Add cut wedge if interior defines it (`pomegranate`, `avocado`, `kiwi`), or scale prop for baby/giant items (`kitten` + oversized yarn ball). | `29/pomegranate.svg`, `54/kitten.svg` |
| 2 | **Part-of-Whole Focus Callout** | Body parts, clothing parts, house/car parts (`elbow`, `ankle`, `collar`, `cuff`, `roof`, `windshield`) | Whole context object in **Muted Neutral** (`#E3E8F0` fill, `#64748B` stroke) + **Golden Focus Halo** (`#FEF3C7` circle/oval + `#D97706` dashed ring) + **target part ONLY** in full rich color + `#1E2A3B` `2.6px` contour + **Artico Blue pointer arrow** (`#4A72B2`). | `14/elbow.svg`, `15/collar.svg` |
| 3 | **Expressive Bust (Symptom / Emotion / Role)** | Sickness symptoms, feelings, professions (`fever`, `headache`, `nervous`, `chef`, `surgeon`) | Bust anchored cleanly at bottom (`y=164..178`), expressive brows/eyes/mouth, unmistakable uniform or symptom prop + 1 secondary visual cue (e.g. thermometer gauge badge, steaming pot, sweat drop). Gentle & empathetic — **never** bloody or clinical! | `68/fever.svg`, `34/chef.svg` |
| 4 | **Peak-Moment Action + Tool** | Chores, cooking verbs, physical actions (`sweep`, `chop`, `pour`, `iron`) | Close-up 3/4 view of the **specific tool + hands/arm mid-action** acting on the target surface + crisp `#4A72B2` motion arcs + physical before/after state (dust pile, sliced pieces, wet sheen). | `11/sweep-the-floor.svg` |
| 5 | **Spatial / Direction Diagram** | Prepositions, map directions, traffic (`turn left`, `across from`, `between`, `corner`) | Clean top-down or angled architectural street/room diagram + **Artico Blue (`#4A72B2`)** path arrow or marker haloed in `#FAF8F3` + `#1E2A3B` for instant contrast. | `46/turn-left.svg` |
| 6 | **Contrast / Reference Pair** | Relative adjectives (`heavy`, `deep`, `tall`, `empty`, `narrow`) | Either an exaggerated physical reaction (`heavy` = bent knees, sweat drop, bowing barbell) OR side-by-side comparison where the **reference item is ghosted muted grey (`#E3E8F0`)** on left and the **target item is full saturated color** on right with `#4A72B2` indicator. | See `PALETTE_AND_RIGS.md` |
| 7 | **Draped Material / Swatch** | Fabrics, patterns, surface textures, color words (`denim`, `silk`, `striped`, `polka-dot`, `cream (color)`) | Softly waved fabric swatch or folded textile corner (`x=72..232, y=34..158`) with clipped weave/pattern/seam detail + specular sheen. **Never** draw food (`cream`, `peach`, `olive`) when the group teaches colors! | See `PALETTE_AND_RIGS.md` |

---

## 3. My 6 Constructive SVG Geometry Laws (Why My SVGs Look Crisp Instead of AI-Slop)

### Law 1: `<defs>` + `<clipPath>` + `<use>` Is Mandatory for Shading & Patterns
Amateur LLM SVGs try to draw shadow paths manually along curved edges — the shadow misses the curve, pokes outside the stroke, or leaves ugly gaps.
**Always build primary forms in 3 layers:**
```xml
<defs>
  <path id="apple-shape" d="M 152 56 C 122 44, 88 68, 92 108 C 96 144, 126 162, 152 156 C 178 162, 208 144, 212 108 C 216 68, 182 44, 152 56 Z"/>
  <clipPath id="apple-clip"><use href="#apple-shape"/></clipPath>
</defs>

<!-- 1. Clipped interior fills: Base -> Crescent Shadow -> Specular Highlight -->
<g clip-path="url(#apple-clip)">
  <rect x="84" y="40" width="140" height="130" fill="#D94854"/>
  <path d="M 170 42 C 190 82, 184 132, 126 154 L 224 168 L 224 42 Z" fill="#A62B38"/>
  <ellipse cx="118" cy="84" rx="12" ry="20" transform="rotate(-22 118 84)" fill="#F0808A" opacity="0.75"/>
  <ellipse cx="114" cy="77" rx="5" ry="9" transform="rotate(-22 114 77)" fill="#FDE2E4"/>
</g>
<!-- 2. Crisp outer contour stamped LAST so fills never bleed over the ink line! -->
<use href="#apple-shape" fill="none" stroke="#1E2A3B" stroke-width="2.6" stroke-linejoin="round"/>
```

### Law 2: Volume Over Stick Lines (Zero Stick Figures!)
- **NEVER** draw arms, legs, fingers, brooms, or necks as single thin `<line stroke-width="2">` stick segments.
- Every limb, handle, strap, or stem must either be a **closed `<path>` with real thickness (`10–24px` for arms/legs, `5–8px` for tool shafts)** OR a **double-stroked capsule** (outer `#1E2A3B` stroke at `width = W + 4.4`, inner fill-color stroke at `width = W`, both `stroke-linecap="round"`):
  ```xml
  <!-- Crisp volumetric wooden broom shaft in 2 lines -->
  <path d="M 244 18 L 180 98" stroke="#1E2A3B" stroke-width="10.5" stroke-linecap="round"/>
  <path d="M 244 18 L 180 98" stroke="#C88242" stroke-width="6.5" stroke-linecap="round"/>
  ```

### Law 3: Strict 3-Weight Ink Hierarchy & Studio Palette (No `#000000` or Neon RGB)
- **Ink Color:** Always Deep Slate Navy **`#1E2A3B`** (muted context ink: **`#64748B`** or **`#7B8A9E`**). Pure `#000000` and raw CSS colors (`red`, `blue`, `#ff0000`, `#00ff00`) are **blocked by the compiler**.
- **Stroke Hierarchy:**
  - `2.5–2.8px`: Primary outer silhouette contour (`stroke-linecap="round" stroke-linejoin="round"`).
  - `1.8–2.1px`: Secondary internal overlap (lapels, cuffs, ear rims, facial features).
  - `1.2–1.5px`: Surface texture (wood grain, stitching, whiskers, thermometer ticks).
- **Lighting Direction:** Consistent **top-left sun (`~10:30 o'clock`)**. Specular highlights go upper-left; crescent form shadows go lower-right; elliptical contact shadows sit directly underneath grounded objects on `#FAF8F3` paper (`#EAE3D5` outer wash + `#DDD4C3` core contact shadow).

### Law 4: Smooth Cubic/Quadratic Béziers — No Jagged Polygons on Organic Forms
- Fruits, faces, shoulders, hair, leaves, pillows, clouds, and animals must use smooth `C` / `Q` curves or `rx`/`ry` rounded rects — never sharp polygon corners unless depicting cut crystal, paper sheets, cardboard boxes, or rooftops.
- At smooth curve joins, keep control handles collinear across the anchor point (`(x - dx, y - dy)` → `(x, y)` → `(x + dx, y + dy)`) so silhouettes don't kink.

### Law 5: Absolute Zero Text / Letters / Numerals
- `<text>`, `<tspan>`, `<image>`, and `<foreignObject>` are **hard-banned by `svg_vocab_compiler.py`**.
- Never draw hand-traced letters (`A`, `B`, `EXIT`, `SALE`, `38°C`, `$`) with `<path>` either, unless the vocabulary word itself literally requires a symbol (`+` medical cross for `pharmacy`/`hospital`, `?` for `question`, `%` in math). Clock faces use ticks + hands without numbers; thermometers use high/low red mercury + tick lines without numbers; price tags use tag silhouette + string hole + horizontal squiggle bars.

### Law 6: Layer Back-to-Front Explicitly
Every SVG file should read cleanly in 5 commented Z-layers:
1. `<!-- 1. Stage Canvas & Ground Shadow -->` (`<rect width="304" height="192" fill="#FAF8F3"/>` + floor plane/contact ellipse)
2. `<!-- 2. Background Context / Muted Whole / Halo -->`
3. `<!-- 3. Primary Subject Silhouettes & Clipped 3-Tone Shading -->`
4. `<!-- 4. Foreground Props, Faces & Crisp Surface Details -->`
5. `<!-- 5. Directional Arrows / Motion Lines / Callout Rings -->`

---

## 4. Bad vs. Good: Why Naive LLM SVGs Fail

- **BAD (`collar`):** Draws a blue rectangle torso with two triangle flaps and `<circle>` buttons. Learner guesses `"shirt"`.
- **GOOD (`15/collar.svg`):** Ghosts the shirt torso/sleeves/pocket in low-contrast cool grey (`#E6ECF2` / `#7B8A9E`), places a warm `#FEF3C7` halo + `#D97706` dashed ellipse behind the neck, renders **only** the pointed collar wings + neckband in rich `#5479AC` with white tailor stitching, and aims an Artico Blue `#4A72B2` arrow at the collar wing. Learner guesses `"collar"` 100% of the time.
- **BAD (`fever`):** Scrapes a gross clinical photo or draws a stick-circle face with `<text>39°C</text>`.
- **GOOD (`68/fever.svg`):** Draws an empathetic character wrapped in a sage blanket with flushed cheeks, cooling forehead gel patch, sweat drop, oral thermometer in mouth, wavy heat lines, and a crisp geometric mercury gauge filled to the top in `#E11D48`.

---

## 5. Mandatory Execution & Visual Critique Loop (Never Ship Blind!)

You have multimodal vision via `read_file`. **Never commit an SVG you have not visually inspected after rendering.**

For every lesson `<NN>`:
1. **Plan & Triage Together:**
   ```bash
   cd /Users/kavi/Documents/kyoto/artico-web
   /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py plan --lesson <NN>
   ```
   Review every group as a set so confusable siblings (`sweep` vs `mop`, `ankle` vs `heel`, `annoyed` vs `furious`) get distinct poses/tools/intensities. Mark unpicturable items immediately with `mark-text`.
2. **Author SVGs in Micro-Batches of 8–15 Files:**
   Write `work/vocab-art/svg/<NN>/<slug>.svg` with exact `data-vocab-key="<NN>:<term>"`. Do **not** generate 60 identical Python boilerplate dolls in a blind loop — craft genuine silhouettes per word, reusing clean helper defs/rigs from `references/PALETTE_AND_RIGS.md` only where structurally appropriate.
3. **Compile with `--debug-grid` & Visually Inspect via `read_file`:**
   ```bash
   /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py build --lesson <NN> --debug-grid
   ```
   Immediately call `read_file` on `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/review/lesson-<NN>-grid.png`.
4. **Score Every Tile Against the 6-Point Studio Gate:**
   - [ ] **1. Blind Guess Test:** Cover the caption mentally — does the picture unmistakably teach *this exact word* (matching its Japanese `ja` gloss) and NOT a sibling or hypernym?
   - [ ] **2. Geometry & Alignment Check:** Use the `0..304 × 0..192` debug grid lines on the image to spot floating hats, detached hands, off-center eyes, misaligned shadows, or awkward Bezier kinks, and edit exact `(x, y)` coordinates to fix them.
   - [ ] **3. Safe-Zone Check:** Is all critical visual meaning comfortably inside the amber `[24,16]–[280,176]` safe-zone rectangle?
   - [ ] **4. Zero-Text / Zero-Artifact Check:** No letters, numbers, stray lines, or paint bleeding outside outlines.
   - [ ] **5. Thumbnail Squint Check:** Would every shape still read clearly shrunk to `152×96` px on a phone?
   - [ ] **6. Course Cohesion Check:** Does it look like the exact same illustrator who drew `work/vocab-art/review/gold-showcase.png`?
5. **Re-render Clean Sheet & Verify Repo Tests:**
   ```bash
   /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py build --lesson <NN>
   export PATH="/Users/kavi/.local/node/bin:$PATH"
   npm test && npm run build
   ```
   Only commit on branch `vocab-art` once every tile in `lesson-<NN>.png` passes visual inspection and all tests pass. **Never push to `main`.**
