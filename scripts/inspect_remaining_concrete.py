import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mulberry = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]
openmoji = json.load(open(ROOT / "src/web/vocabularyOpenmojiManifest.json", encoding="utf-8"))["entries"]

lessons_to_check = [4, 36, 46, 47, 58, 65, 66, 67]

for lid in lessons_to_check:
    l = [x for x in org["lessons"] if x["sourceLesson"] == lid][0]
    uncovered = []
    for g in l["groups"]:
        for item in g["items"]:
            t = item[0]
            k = f"{lid}:{t.lower().strip()}"
            if k not in course_art and k not in mulberry and k not in openmoji:
                uncovered.append((t, g["title"]))
    print(f"\n=== Lesson {lid}: {l['title']} ({len(uncovered)} uncovered) ===")
    for t, g in uncovered:
        print(f"  {t:35s} | {g}")
