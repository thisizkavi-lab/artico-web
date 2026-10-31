# Lesson 07 SVG source bundles

These five small gzip tar archives contain the 41 hand-authored SVG source files for Vocabulary 07 — Sharing Information. They are split only to keep repository uploads manageable; together they contain the complete illustration set.

The Pages workflow extracts them to `work/vocab-art/svg/07/`, then runs:

```sh
python3 -m pip install --quiet resvg-py pillow
python3 scripts/svg_vocab_compiler.py build --lesson 7 --debug-grid
```

The build verifies 41 rendered WebP files at 608 × 384, each under 80 KB. Eight non-visual or ambiguous entries are deliberately listed in `src/web/vocabularyCourseArt.json` as text-only.
