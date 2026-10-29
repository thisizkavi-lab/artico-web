# Artico Vocabulary Illustration Style Lock: `artico-editorial-svg-v1`

## 1. Style Specification

- **Style Identifier:** `artico-editorial-svg-v1`
- **Pipeline:** Constructive Studio SVG (`viewBox="0 0 304 192"`) → `4×` supersampled `resvg_py` (`1216×768`) → Lanczos `608×384` WebP (`<= 80 KB`) via `scripts/svg_vocab_compiler.py`.
- **Zero External Sources:** Never call rate-limited image APIs and **never** download or scrape Wikipedia/Wikimedia/Unsplash photos or third-party icon libraries.
- **Aesthetic:** Contemporary Japanese-editorial educational vector illustration — warm `#FAF8F3` paper stage, Deep Slate Navy (`#1E2A3B`) rounded contours (`2.6px` outer / `1.8px` seam / `1.3px` detail), `<clipPath>` 3-tone cel shading (base + lower-right shadow + top-left specular highlight), grounded contact shadows (`#EAE3D5` / `#DDD4C3`).

## 2. Gold-Standard Anchor SVGs (Live Reference Code)

Read and match the exact line quality, palette, framing, and constructive layering of these 8 live `.svg` anchors in `work/vocab-art/svg/` (rendered together in `work/vocab-art/review/gold-showcase.png`):

1. `work/vocab-art/svg/29/pomegranate.svg` — **Hero Object + Cut Cross-Section** (`29:pomegranate`)
2. `work/vocab-art/svg/54/kitten.svg` — **Living Creature + Juvenile Scale Prop** (`54:kitten`)
3. `work/vocab-art/svg/14/elbow.svg` — **Anatomy Part-of-Whole Focus Callout** (`14:elbow`)
4. `work/vocab-art/svg/15/collar.svg` — **Garment Part-of-Whole Focus Callout** (`15:collar (shirt)`)
5. `work/vocab-art/svg/68/fever.svg` — **Gentle Empathetic Medical Symptom Bust** (`68:fever`)
6. `work/vocab-art/svg/34/chef.svg` — **Role / Profession Uniform & Prop Bust** (`34:chef`)
7. `work/vocab-art/svg/11/sweep-the-floor.svg` — **Peak-Moment Action + Tool & Motion** (`11:sweep the floor`)
8. `work/vocab-art/svg/46/turn-left.svg` — **Spatial / Street Direction Diagram** (`46:turn left`)

## 3. Non-Negotiable Visual Rules

1. **Skill Required:** Always read `.agents/skills/artico-vocab-svg-illustrator/SKILL.md` (plus `references/PALETTE_AND_RIGS.md` and `references/TRIAGE_AND_POLYSEMY.md`) before writing any SVG.
2. **Zero Text / Numerals / Raster Embeds:** `<text>`, `<tspan>`, `<image>`, and `<foreignObject>` are hard-rejected by `svg_vocab_compiler.py`. Never hand-trace letters or numbers unless intrinsic (`+` pharmacy cross, `?` question mark).
3. **No Stick Figures / No Raw RGB:** Every limb, handle, and torso has closed `<path>` volume or double-stroked capsule thickness. Pure `#000000` and raw neon RGB (`#ff0000`, `#00ff00`, `#0000ff`) are banned by the linter.
4. **Safe Framing (`[24, 16]` – `[280, 176]`):** Keep critical visual cues inside the central safe zone so CSS `object-fit: cover` never clips meaning, with the primary subject filling ~55–72% of frame height.
5. **Multimodal Visual Gate:** Compile every lesson with `--debug-grid`, inspect `work/vocab-art/review/lesson-NN-grid.png` via `read_file`, fix every alignment or blind-recognition issue, then compile clean `lesson-NN.png` before committing.
