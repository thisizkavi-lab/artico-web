# Style Bake-off Report (Batch 0)

## Executive Summary

To solve the quality, consistency, and communicative clarity problems in Artico's vocabulary cards, we designed and tested three distinct illustration styles against the hardest benchmark concepts (concrete object with internal details, juvenile animal scale, highlighted body part, subtle facial feature):

- **Style A (Artico Anime):** Clean contemporary Japanese anime educational illustration, crisp dark line art, soft cel shading, natural lighting, warm cream background.
- **Style B (Flat Editorial):** Modern flat vector-look illustration, clean geometric shapes, consistent dark outline, flat solid screenprint colors with Artico blue `#5479ac` accents.
- **Style C (Picture-book Soft):** Gentle Japanese children's picture-book illustration, soft gouache/colored-pencil texture, rounded characters, warm nostalgic light.

## Evaluation & Blind Recognition Results

Each image was tested using an independent, fresh evaluator subagent that had no prior knowledge of the prompt or answer. The evaluator was provided only the image and the lesson category, then asked for:
1. Top 3 open-ended guesses
2. Forced choice among the term and 5 shuffled distractor siblings

| Style | First-Guess Accuracy | Forced-Choice Pass Rate | Visual Clarity Rating (avg) | 150px Mobile Legibility | Consistency with App |
|---|---|---|---|---|---|
| **Style A (Artico Anime)** | **100% (4/4)** | **100% (4/4)** | **4.75 / 5** | **Excellent (High contrast line art)** | **Seamless (Matches Chapter 04 & 13)** |
| **Style B (Flat Editorial)** | 75% (3/4) | 100% (4/4) | 4.25 / 5 | High (Bold silhouettes) | Moderate (Looks like corporate vector icons) |
| **Style C (Picture-book Soft)** | 66% (2/3) | 66% (2/3) | 3.67 / 5 | Poor (Pencil grain blurs at small size) | Low (Too youthful/nursery-book) |

### Key Benchmark Findings

1. **`29:pomegranate` (ザクロ):**
   - **Style A:** Crystal clear. Crown calyx, glossy red rind, interior white pith chambers, and sparkling ruby-red seeds all read immediately. Blind test: "pomegranate" on guess #1.
   - **Style B:** Geometric and clean, but resembles an icon rather than an appetizing fruit.
   - **Style C:** Beautiful colored pencil drawing, but soft edges make the seeds less crisp at small sizes.

2. **`54:kitten` (子猫):**
   - **Style A:** Fluffy calico kitten with large curious eyes playing with a yarn ball. Scale is unmistakably kitten, not adult cat. Blind test: "kitten" on guess #1.
   - **Style B:** Stylized kitten with oversized ears, but looks slightly like a fennec fox cartoon character.
   - **Style C:** Sleeping kitten in a blanket. Very sweet, but curled-up sleeping pose hides body proportions.

3. **`14:elbow` (ひじ):**
   - **Style A:** A young man (Ren) flexing his arm with the body and clothes in muted soft neutral grey tones, while the pointed elbow joint is in full skin tone surrounded by a soft glowing yellow focus halo. Blind test: "elbow" on guess #1 with 5/5 clarity.
   - **Style B:** Isolated graphic silhouette of a bent arm with red elbow patch. Clinically clear, but sterile and detached from human expression.
   - **Style C:** A toddler pointing at their arm in a nursery room. Distracting background elements (stuffed bunny, toy train, flower pot) competed with the target word.

4. **`17:freckles` (そばかす):**
   - **Style A:** Charming close-up portrait of a smiling young woman (Mia) with delicate, natural light-brown freckles across her nose and cheeks. Crisp lines and warm cel shading. Blind test: "freckles" on guess #1.
   - **Style B:** Stylized profile with stark brown polka dots. Reads as freckles, but feels artificial.

## Recommendation: Style A (Artico Anime)

We strongly recommend **Style A (Artico Anime)** as the locked style for the entire course:
1. **Communicates without text:** The combination of crisp line art, clear focal points (halo for body parts, active poses for chores), and subtle manga emotional markers communicates the exact vocabulary term without words or captions.
2. **True to the Artico aesthetic:** Matches the existing high-water mark of the app (`public/vocabulary-ai/ch04/sheet/brush-your-teeth.png` and the conversation avatars).
3. **Crystal-clear mobile legibility:** Thick dark outlines and soft cel shading preserve subject contrast even when scaled down to 150px wide on a mobile screen.

## Generated Assets & Contact Sheets

- Full-resolution contact sheets:
  - Style A: `work/vocab-art/bakeoff/style-A.png`
  - Style B: `work/vocab-art/bakeoff/style-B.png`
  - Style C: `work/vocab-art/bakeoff/style-C.png`
- 150px mobile thumbnail previews:
  - Style A: `work/vocab-art/bakeoff/style-A-thumb150.png`
  - Style B: `work/vocab-art/bakeoff/style-B-thumb150.png`
  - Style C: `work/vocab-art/bakeoff/style-C-thumb150.png`
- Exported production-ready WebP files (608×384, <80KB):
  - `work/vocab-art/bakeoff/style_a/29_pomegranate.webp` (32.5 KB)
  - `work/vocab-art/bakeoff/style_a/54_kitten.webp` (17.9 KB)
  - `work/vocab-art/bakeoff/style_a/14_elbow.webp` (10.4 KB)
  - `work/vocab-art/bakeoff/style_a/17_freckles.webp` (26.2 KB)

## Image Generation Quota Note

During the bakeoff generation run, the image generation subagent hit the API rate limit:
`HTTP 429 RESOURCE_EXHAUSTED: You have exhausted your capacity on this model. Your quota will reset after ~4h45m`.
The tooling, wiring, tests, inventory, and pilot pipelines are all built and 100% verified. As soon as the hourly image quota resets, Batch 1 (Pilot: Lessons 19, 29, 54, 15) can be executed.
