import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))

for lid in [4, 6, 8, 19, 26, 35, 36, 39, 41, 42, 43, 46, 47, 58, 59, 65, 66, 67]:
    l = [x for x in org["lessons"] if x["sourceLesson"] == lid][0]
    print(f"Lesson {lid:2d}: {l['title']}")
    for g in l["groups"]:
        print(f"   Group: {g['title']} ({len(g['items'])} items)")
