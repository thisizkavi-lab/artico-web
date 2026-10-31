# Artico Lesson 04 — image sources and provenance

The ten **Meals and drinks** illustrations (breakfast, lunch, dinner, coffee, tea, eat breakfast, eat lunch, eat dinner, make breakfast, cook dinner) were generated specifically for Artico using OpenAI image generation. They match the flat, clean cartoon look of the lesson's “Waking up and getting ready” artwork. They are preserved as high-resolution 608 × 384 WebP images in `public/vocabulary-curated-04/generated-meals-hd.zip`. Equivalent verbs like **have breakfast / eat breakfast** use the same headword image.

**Put the children to bed** also uses an original generated scene stored separately. All other Lesson 04 vocabulary illustrations remain sourced photographs from [Pexels](https://www.pexels.com/) under the [Pexels License](https://www.pexels.com/license/). Every Pexels photo's source page, asset ID and intended meaning are documented in [the illustration manifest](../../src/web/vocabularyDailyRoutineSources.json).

The site build verifies the binary archive checksum, all ten file names and image dimensions, and confirms every vocabulary card has a non-empty local image.

## Original scenes, batch 02 — October 31, 2026

Another ten horizontal (608 × 384) original illustrations in the same character-and-line style as the Waking Up section replace the old photographs for: **drink tea or coffee / have tea or coffee**, **arrive late**, **catch the bus**, **catch the train**, **commute**, **drive**, **go to school**, **go to work**, **start work**, and **finish work**.

The generated WebP assets are stored in `public/vocabulary-curated-04/generated-work-02.zip` and extracted during the GitHub Pages build, with explicit file-name, size, dimension, and SHA-256 checks. Other vocabulary cards and the original English/Japanese lesson text are unchanged. Only the older, still-photographic cards continue to require Pexels attribution.

