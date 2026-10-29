import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mul = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]

for lid in [46, 47, 58, 65, 66, 67]:
    l = [x for x in org["lessons"] if x["sourceLesson"] == lid][0]
    print(f"\n=== Lesson {lid}: {l['title']} ===")
    for g in l["groups"]:
        print(f"  -- {g['title']} --")
        for item in g["items"]:
            t = item[0]
            k = f"{lid}:{t.lower().strip()}"
            if k not in course_art and k not in mul:
                print(f"     {t}")
