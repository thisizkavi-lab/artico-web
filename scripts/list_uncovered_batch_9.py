import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
organized = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mulberry = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]
openmoji = json.load(open(ROOT / "src/web/vocabularyOpenmojiManifest.json", encoding="utf-8"))["entries"]

for lid in [10, 11, 12, 14, 22]:
    lesson = [l for l in organized["lessons"] if l["sourceLesson"] == lid][0]
    uncovered = []
    for g in lesson["groups"]:
        for item in g["items"]:
            term = item[0]
            ja = item[1] if len(item) > 1 else ""
            k = f"{lid}:{term.lower().strip()}"
            if k not in course_art and k not in mulberry and k not in openmoji:
                uncovered.append((term, ja, g["title"]))
    print(f"\nLesson {lid} ({lesson['title']}) - {len(uncovered)} uncovered:")
    for t, j, g in uncovered:
        print(f"  {t:35s} | {j:25s} | {g}")
