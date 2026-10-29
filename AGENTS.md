# Artico Workspace Rules (`AGENTS.md`)

1. **Git Repository & Branch Safety:**
   - The git repository lives in `/Users/kavi/Documents/kyoto/artico-web` on branch `vocab-art`.
   - **NEVER push to `main`** (it auto-deploys to GitHub Pages). Never push any branch unless the user explicitly asks.

2. **Runtimes:**
   - **Python:** Always run `/Users/kavi/Documents/kyoto/.venv/bin/python3` (`resvg_py`, `Pillow`, `requests` installed; system `python3` lacks them).
   - **Node / npm:** Always prefix shell commands with `export PATH="/Users/kavi/.local/node/bin:$PATH"`.

3. **Vocabulary Illustration System (`artico-editorial-svg-v1`):**
   - Whenever working on Lesson 98 vocabulary illustrations (`Lessons 3–78`), you **MUST** first read:
     1. `/Users/kavi/Documents/kyoto/.agents/skills/artico-vocab-svg-illustrator/SKILL.md`
     2. `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/GEMINI_TASK.md`
   - **Never** scrape Wikipedia/Wikimedia/Unsplash photos or call external image generation APIs.
   - Author clean constructive `.svg` files in `artico-web/work/vocab-art/svg/<NN>/<slug>.svg`, compile them via `scripts/svg_vocab_compiler.py`, and **visually inspect** every rendered `work/vocab-art/review/lesson-<NN>-grid.png` sheet with `read_file` before committing.
