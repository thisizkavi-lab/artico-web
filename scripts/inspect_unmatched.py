import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
inv = json.loads((ROOT / "work/vocab-art/inventory.json").read_text(encoding="utf-8"))
course_art = json.loads((ROOT / "src/web/vocabularyCourseArt.json").read_text(encoding="utf-8")).get("entries", {})
mulberry_manifest = json.loads((ROOT / "src/web/vocabularyMulberryManifest.json").read_text(encoding="utf-8")).get("entries", {})
openmoji_manifest = json.loads((ROOT / "src/web/vocabularyOpenmojiManifest.json").read_text(encoding="utf-8")).get("entries", {})

mulberry_dir = ROOT / "work/vocab-art/upstream/mulberry/EN"
mulberry_files = [p.name for p in mulberry_dir.glob("*.svg")]

mulberry_map = {}
for fn in mulberry_files:
    stem = fn[:-4].lower()
    norm = stem.replace("_", " ").replace("-", " ")
    mulberry_map[norm] = fn
    clean = re.sub(r"\s*\(.*?\)", "", norm).strip()
    if clean not in mulberry_map:
        mulberry_map[clean] = fn
    mulberry_map[stem] = fn

openmoji_data = json.load(open(ROOT / "work/vocab-art/upstream/openmoji.json", encoding="utf-8"))
openmoji_map = {}
for entry in openmoji_data:
    hexcode = entry["hexcode"]
    ann = entry["annotation"].lower().strip()
    openmoji_map[ann] = hexcode

# Print sample unmatched items per lesson
unmatched_by_lesson = {}
for item in inv:
    l = item["lesson"]
    t = item["term"]
    k = f"{l}:{t.lower().strip()}"
    if k in course_art or k in mulberry_manifest or k in openmoji_manifest:
        continue
    if l in (3, 13, 18):
        continue
    if l not in unmatched_by_lesson:
        unmatched_by_lesson[l] = []
    unmatched_by_lesson[l].append(item)

print(f"Total unmatched items across lessons: {sum(len(v) for v in unmatched_by_lesson.values())}")
for l in sorted(unmatched_by_lesson.keys())[:15]:
    items = unmatched_by_lesson[l]
    sample = [x["term"] for x in items[:5]]
    print(f"Lesson {l:2d} ({len(items)} unmatched): {sample}")
