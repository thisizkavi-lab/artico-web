# Vocabulary artwork licenses

## Mulberry Symbols

The vocabulary cards use selected images from **Mulberry Symbols**, by Steve Lee and contributors: https://mulberrysymbols.org/.

- Original graphics: **Creative Commons Attribution–ShareAlike 4.0 International (CC BY-SA 4.0)**.
- License text: https://creativecommons.org/licenses/by-sa/4.0/
- Pinned upstream release: v3.6.1, commit `9cbab9f400c5de44e2bc58839cca07294aadb086`.
- Every illustrated term is mapped to an exact upstream SVG in `src/web/vocabularyMulberryManifest.json`.
- The deployed site contains locally generated PNG renditions. They are the same artwork, converted and resized; the converted images and any adaptations remain available under **CC BY-SA 4.0**. The underlying Artico course text and code are not relicensed by this file.
- When redistributing the imagery, retain attribution and the CC BY-SA license link. Do not sell the Mulberry symbols as a standalone set.

## OpenMoji

A smaller set of exact-match pictures of objects, animals, food and places comes from **OpenMoji**, by the OpenMoji Contributors: https://openmoji.org/.

- Original graphics and converted PNGs: **CC BY-SA 4.0**; license https://creativecommons.org/licenses/by-sa/4.0/.
- Pinned source commit: `aeb8bb3a59e2de39c754ac79180c8131c906acea`.
- Source for each selected file: `color/svg/<HEXCODE>.svg`, listed in `src/web/vocabularyOpenmojiManifest.json`.
- Converted and resized to optimized local PNGs by the build script; no remote URL loads at runtime.
- The OpenMoji source project has no affiliation with or endorsement of Artico.

## Original Artico illustrations

The pre-existing PNG scenes and original educational SVG diagrams are Artico's own artwork. They take precedence over the pictogram matches.

## Artico course illustrations

Original AI-assisted educational artwork developed specifically for Artico vocabulary cards. These illustrations are owned by Artico and contain no third-party assets or external dependencies. All assets are compiled to static local WebP files and loaded directly from the course deployment.

## Explicitly excluded sources

OpenSymbols mixes commercial and noncommercial licenses and requires an API credential. ARASAAC CC BY-NC-SA and Sclera CC BY-NC graphics are **not** imported. No Irodori graphics are copied. Openclipart assets with uncertain provenance or pending review are not automatically imported. Open Peeps CC0 may be considered for later original scene compositions.
