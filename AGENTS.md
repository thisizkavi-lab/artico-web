# Artico Workspace Rules (`AGENTS.md`)

1. **Repository context:**
   - The main checkout is `/Users/kavi/Documents/kyoto/artico-web`. Work in the active checkout and check its current branch rather than assuming a fixed branch name.
   - Updates to `main` automatically deploy to GitHub Pages.

2. **Runtimes:**
   - **Python:** Always run `/Users/kavi/Documents/kyoto/.venv/bin/python3` (`resvg_py`, `Pillow`, `requests` installed; system `python3` lacks them).
   - **Node / npm:** Always prefix shell commands with `export PATH="/Users/kavi/.local/node/bin:$PATH"`.

3. **Vocabulary Illustration System (`artico-editorial-svg-v1`):**
   - Whenever working on Lesson 98 vocabulary illustrations (`Lessons 3–78`), you **MUST** first read:
     1. `/Users/kavi/Documents/kyoto/.agents/skills/artico-vocab-svg-illustrator/SKILL.md`
     2. `/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/GEMINI_TASK.md`
   - **Never** scrape Wikipedia/Wikimedia/Unsplash photos or call external image generation APIs.
   - Author clean constructive `.svg` files in `artico-web/work/vocab-art/svg/<NN>/<slug>.svg`, compile them via `scripts/svg_vocab_compiler.py`, and **visually inspect** every rendered `work/vocab-art/review/lesson-<NN>-grid.png` sheet with `read_file` before committing.

4. **IELTS Study Course System (`artico-ielts-study-v1`):**
   - Whenever working on the IELTS Study Mode (`#/application/tests/ielts/*/study` or `src/web/ielts-study/`), you **MUST** first read:
     1. `/Users/kavi/Documents/kyoto/.agents/skills/artico-ielts-study-course/SKILL.md` (and all 4 files in its `references/` folder)
     2. `/Users/kavi/Documents/kyoto/artico-web/work/ielts-study/GEMINI_TASK.md`
   - **Zero gamification** (no streaks, XP, points, badges, confetti, locked units, or patronizing praise).
   - **Never modify Practice Mode** (`src/web/IeltsWorkspace.jsx`, `src/web/ieltsContent.js`, `src/web/ieltsState.js`). Keep General Training (`[GT]`) sections complete and explicitly separated from the primary Academic track.
