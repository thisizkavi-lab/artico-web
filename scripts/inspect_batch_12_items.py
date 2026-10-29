import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mul = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]

for lid in [34, 37, 38, 76, 77, 78]:
    l = [x for x in org["lessons"] if x["sourceLesson"] == lid][0]
    title = l["title"]
    print(f"=== Lesson {lid}: {title} ===")
    for g in l["groups"]:
        gtitle = g["title"]
        print(f"  -- Group: {gtitle} --")
        for item in g["items"]:
            t = item[0]
            k = f"{lid}:{t.lower().strip()}"
            cov = "ART" if k in course_art else ("MUL" if k in mul else "---")
            print(f"    [{cov}] {t}")
