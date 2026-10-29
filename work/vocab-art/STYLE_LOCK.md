# Artico Vocabulary Illustration Style Lock: Style A (Artico Anime)

## 1. Style Specification

- **Style Identifier:** `artico-anime-v1`
- **Aesthetic:** Clean, contemporary Japanese anime educational illustration with crisp dark lines, soft cel shading, natural daylight, and warm, friendly colors.
- **Tone:** Educational, clear, human, welcoming.
- **Reference Anchors:**
  - `work/vocab-art/bakeoff/style_a/29_pomegranate.webp` (Fruit / Object detailing)
  - `work/vocab-art/bakeoff/style_a/54_kitten.webp` (Animal juvenile scale)
  - `work/vocab-art/bakeoff/style_a/14_elbow.webp` (Body part focus halo)
  - `work/vocab-art/bakeoff/style_a/17_freckles.webp` (Facial feature close-up)
  - `public/vocabulary-ai/ch04/sheet/brush-your-teeth.png` (Character action)

## 2. Master Prompt Template

```text
Clean contemporary Japanese anime educational illustration for an English vocabulary card.
[SCENE DESCRIPTION: One clear subject, centered, filling 65-75% of the frame; uncluttered background supporting the meaning.]
Crisp dark line art, soft cel shading, bright natural daylight, warm friendly palette with soft blues, creams, and warm accents.
Landscape 16:10 aspect ratio.
CRITICAL NEGATIVE CONSTRAINTS: Absolutely no text, letters, words, numbers, captions, speech bubbles, logos, brand names, or watermarks.
```

## 3. Visual Grammar & Rules

1. **Object / Food / Animal / Tool:**
   - Single item, 3/4 perspective, centered on warm off-white `#fbfaf7` background with a soft ground shadow.
   - For items with inner structure (e.g. pomegranate, citrus, melon), show both whole fruit and a clean cross-section.
   - For baby animals (e.g. kitten, puppy), use juvenile proportions and scale cues (e.g. ball of yarn) so they are never confused with adult animals.

2. **Body Parts:**
   - Render the figure or limb in soft, muted neutral grey tones.
   - Highlight the target joint/part in full warm color encircled by a subtle, soft glowing golden focus halo (`#f7d57e`).

3. **Actions & Chores:**
   - Depict a recurring cast character mid-action at the peak communicative moment.
   - Sibling actions must be distinguished by tool AND pose (e.g. broom + pile of dust for *sweep*; string mop + bucket + wet shiny floor streaks for *mop*).

4. **Feelings & Emotions:**
   - Facial expression + posture + relatable situational context.
   - Standard anime emotional indicators (sweat drop for *nervous*, gritted teeth and tangled object for *frustrated*).

5. **Directions & Positions:**
   - High-angle isometric view with the signature Artico blue arrow (`#5479ac`) as the only symbolic device.

6. **Idioms:**
   - Illustrate the **situational meaning**, NEVER the literal metaphor (e.g. *break the ice* = strangers laughing and connecting warmly over coffee, never actual ice).

## 4. Technical Constraints

- **Aspect Ratio:** Landscape 152:96 (crop/resize to 608×384).
- **Format:** Static `.webp`, quality 82, maximum file size ≤ 80 KB.
- **Safety Margin:** Keep all key subjects within the central 85% safe area to prevent clipping by CSS `object-fit: cover`.
