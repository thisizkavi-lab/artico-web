# Artico Studio Palette Tokens & Structural SVG Rigs

All vocabulary illustrations in `artico-editorial-svg-v1` use this locked palette and constructive rig library on `viewBox="0 0 304 192"`.

---

## 1. Locked Color Token Table

**NEVER** use `#000000`, `black`, `#ff0000`, `#00ff00`, `#0000ff`, or named CSS primaries. Always pull 3-value triads (`Base` + `Shadow` + `Highlight`) from this studio palette:

| Token Family | Base | Shadow | Highlight | Typical Usage |
|---|---|---|---|---|
| **Stage Paper (Default)** | `#FAF8F3` | `#EAE3D5` (floor/wash) | `#DDD4C3` (contact shadow) | Universal card stage & grounded shadows |
| **Sky / Weather Stage** | `#EEF4FA` | `#DAE6F2` | `#FFFFFF` | Outdoor weather, sky, aviation scenes |
| **Park / Ground Stage** | `#DCEAD6` | `#C3DAB9` | `#EFECE4` (sidewalk) | Maps, streets, parks, outdoor sports |
| **Studio Ink (Contours)** | `#1E2A3B` | `#27364B` (dark fill) | `#64748B` (muted ink) | `2.6px` outer, `1.8px` seam, `1.3px` detail |
| **Muted Context (Ghost)** | `#E5E9F0` | `#CFD6E2` | `#F4F6FA` | Whole body/object in Part-of-Whole & Contrast cards |
| **Artico Signature Blue** | `#5479AC` | `#3D5F91` | `#8EB0DE` | Arrows (`#4A72B2`), denim, shirts, water, tech |
| **Focus Halo Gold** | `#FEF3C7` | `#D97706` (ring) | `#FDE68A` | Part-of-Whole callout halo behind target part |
| **Ruby / Crimson** | `#CE3D4E` | `#9E2636` | `#EA7580` | Berries, apples, tomatoes, fever mercury, alerts |
| **Warm Terracotta / Copper**| `#D97A43` | `#B55B28` | `#F2A472` | Pots, bricks, rooftops, autumn, baked crust |
| **Tangerine / Ginger** | `#F6A54C` | `#C96A1B` | `#FFD099` | Citrus, carrots, ginger cat, warm accents |
| **Golden Straw / Honey** | `#F2C14E` | `#D49B2A` | `#FCE29C` | Broom straw, cheese, bananas, grain, gold |
| **Sage / Botanical Green** | `#7FB07A` | `#568552` | `#A8D4A2` | Vegetables, leaves, trees, cozy blankets |
| **Deep Emerald** | `#3B8C6E` | `#26634C` | `#6FC2A2` | Chalkboards, pharmacies, dark foliage, bottles |
| **Plum / Berry Purple** | `#8B5CA8` | `#633B7D` | `#B792CF` | Eggplant, grapes, plums, evening cushions |
| **Warm Wood / Caramel** | `#C88446` | `#965D28` | `#E3AC77` | Furniture, handles, floorboards (`#EAD8BE`), bread |
| **Cool Metal / Glass** | `#CBD5E1` | `#94A3B8` | `#F1F5F9` | Blades, appliances, mirrors, windows (`#DCECFB`) |
| **Skin Tone A (Warm Light)**| `#F5BFA3` | `#E5A283` | `#FDE4D4` | Cast members Ren & Mia |
| **Skin Tone B (Golden Tan)**| `#D89A6C` | `#B6784B` | `#ECC09D` | Cast member Sam & diverse role characters |
| **Skin Tone C (Rich Deep)** | `#8D583C` | `#683D26` | `#AD785B` | Diverse role & action characters |

---

## 2. Recurring Cast Proportions (Bust & Half-Body Reference)

Keep recurring human characters visually consistent across Feelings (19), Daily Routines (4), Sickness (68), Chores (11), and Jobs (34):
- **Ren:** Short tousled dark slate hair (`#27364B`), Skin A (`#F5BFA3`), Artico Navy/Blue T-shirt (`#3D5F91` / `#5479AC`).
- **Mia:** Shoulder-length warm chestnut hair (`#6E473B`), Skin A (`#F5BFA3`), cream cardigan (`#F3ECE1`) over coral top (`#CE3D4E`).
- **Sam:** Short neat dark-brown hair (`#3A2E2B`), rounded glasses (`stroke="#1E2A3B" stroke-width="2"`), Skin B (`#D89A6C`), sky-blue collared shirt (`#7FA1CF`).
- **Grace:** Silver-grey bob (`#94A3B8` / `#CBD5E1`), gentle smile lines, Skin A (`#F5BFA3`), sage cardigan (`#7FB07A`).
- **Kai (Child ~8yo):** Larger head-to-shoulder ratio (`head width ~64px`, `shoulder width ~92px`), bright golden-yellow tee (`#F2C14E`).

### Standard Expressive Bust Blueprint (`center x=136`)
```xml
<!-- Shoulders/Torso anchored cleanly above bottom margin -->
<path d="M 64 176 C 70 138, 94 124, 136 124 C 178 124, 202 138, 208 176 Z"
      fill="#5479AC" stroke="#1E2A3B" stroke-width="2.6" stroke-linejoin="round"/>
<!-- Neck & Ears -->
<rect x="124" y="114" width="24" height="18" rx="6" fill="#E5A283" stroke="#1E2A3B" stroke-width="2.2"/>
<circle cx="98" cy="88" r="8.5" fill="#F5BFA3" stroke="#1E2A3B" stroke-width="2.3"/>
<circle cx="174" cy="88" r="8.5" fill="#E5A283" stroke="#1E2A3B" stroke-width="2.3"/>
<!-- Head Contour -->
<path d="M 98 64 C 98 38, 174 38, 174 64 L 172 94 C 172 116, 154 126, 136 126 C 118 126, 100 116, 100 94 Z"
      fill="#F5BFA3" stroke="#1E2A3B" stroke-width="2.6" stroke-linejoin="round"/>
```
**Emotion Marks Library (Japanese-friendly visual cues):**
- *Nervous / Anxious:* Pale blue temple sweat drop (`fill="#7CC4FA"`), raised inner eyebrows (`/` `\`), wavy tight mouth.
- *Frustrated / Annoyed:* Angled V-brows, gritted/clenched teeth or wavy scowl, crimson cross-vein mark (`4` small curved `L` strokes in `#CE3D4E`) near temple + tangible cause (tangled cord, stuck jar).
- *Exhausted / Sleepy:* Heavy half-lidded eyes (horizontal top lid line over upper iris), dark under-eye arc (`stroke="#94A3B8"`), slumped shoulders.
- *Delighted / Proud:* Happy upward curved eye arcs (`Q` curves), warm rosy cheek ovals (`#F58D82` at `opacity="0.45"`), small 4-point golden sparkle (`#F2C14E`) beside head.

---

## 3. Reusable Graphic Devices (The ONLY Symbolic Overlays Allowed)

### A. Signature Artico Blue Pointer Arrow (for Part-of-Whole & Contrast)
```xml
<g>
  <path d="M 52 154 L 84 142" fill="none" stroke="#1E2A3B" stroke-width="6.5" stroke-linecap="round"/>
  <path d="M 52 154 L 84 142" fill="none" stroke="#4A72B2" stroke-width="3.8" stroke-linecap="round"/>
  <path d="M 79 134 L 93 139 L 84 151 Z" fill="#4A72B2" stroke="#1E2A3B" stroke-width="2" stroke-linejoin="round"/>
</g>
```

### B. Golden Focus Halo + Dashed Callout Ring (for Part-of-Whole)
```xml
<!-- Place BEHIND the muted context object -->
<circle cx="126" cy="130" r="44" fill="#FEF3C7"/>
<circle cx="126" cy="130" r="35" fill="#FDE68A" opacity="0.65"/>
<!-- Place ON TOP of the clipped full-color target part -->
<circle cx="126" cy="130" r="29" fill="none" stroke="#D97706" stroke-width="2.2" stroke-dasharray="5 4"/>
```

### C. Contrast Pair Layout (for Relative Adjectives: `tall`/`short`, `deep`/`shallow`, `full`/`empty`, `wide`/`narrow`)
- **Left Zone (`x = 44..132`):** Reference comparison object rendered in **Muted Context** (`#E5E9F0` fill, `#CFD6E2` shadow, `#7B8A9E` `2.0px` stroke) — clearly recognizable as the baseline, never competing for attention.
- **Right Zone (`x = 164..262`):** Target adjective object rendered in **100% Saturated Studio Color** + `#1E2A3B` `2.6px` contour + ground shadow + optional Artico Blue indicator arrow or measurement bracket highlighting the exaggerated dimension!

### D. Draped Fabric / Pattern / Color Swatch Rig (for `denim`, `silk`, `striped`, `polka-dot`, `cream (color)`)
```xml
<defs>
  <path id="swatch-wave" d="M 74 44 C 118 32, 186 54, 230 40 C 224 84, 236 122, 224 152 C 180 164, 120 142, 76 154 C 84 114, 68 78, 74 44 Z"/>
  <clipPath id="swatch-clip"><use href="#swatch-wave"/></clipPath>
</defs>
<ellipse cx="154" cy="162" rx="82" ry="10" fill="#EAE3D5"/>
<g clip-path="url(#swatch-clip)">
  <rect x="64" y="28" width="176" height="140" fill="#5479AC"/>
  <!-- Draw stripes, polka dots, twill weave, or soft fold shadows here -->
  <path d="M 138 28 C 148 76, 134 118, 146 168 L 176 168 C 166 118, 178 76, 168 28 Z" fill="#3D5F91" opacity="0.35"/>
</g>
<use href="#swatch-wave" fill="none" stroke="#1E2A3B" stroke-width="2.6" stroke-linejoin="round"/>
```
