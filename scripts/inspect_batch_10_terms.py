import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
organized = json.load(open(ROOT / "src/web/vocabularyOrganized.json"))

target_lids = [46, 51, 58, 63, 64, 65, 66]

for lid in target_lids:
    l = [x for x in organized["lessons"] if x["sourceLesson"] == lid][0]
    print(f"\n--- Lesson {lid} ({l['title']}) ---")
    for g in l["groups"]:
        print(f"  [{g['title']}]: {[item[0] for item in g['items']]}")
