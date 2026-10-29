import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
inv = json.loads((ROOT / "work/vocab-art/inventory.json").read_text(encoding="utf-8"))
course_art = json.loads((ROOT / "src/web/vocabularyCourseArt.json").read_text(encoding="utf-8")).get("entries", {})
mulberry_manifest = json.loads((ROOT / "src/web/vocabularyMulberryManifest.json").read_text(encoding="utf-8")).get("entries", {})
openmoji_manifest = json.loads((ROOT / "src/web/vocabularyOpenmojiManifest.json").read_text(encoding="utf-8")).get("entries", {})

mulberry_files = [p.name for p in (ROOT / "work/vocab-art/upstream/mulberry/EN").glob("*.svg")]
mulberry_map = {}
for fn in mulberry_files:
    base = fn[:-4].lower()
    norm = base.replace("_", " ").replace("-", " ")
    mulberry_map[norm] = fn
    clean = re.sub(r"\s*\(.*?\)", "", norm).strip()
    if clean not in mulberry_map:
        mulberry_map[clean] = fn
    mulberry_map[base] = fn

openmoji_data = json.load(open(ROOT / "work/vocab-art/upstream/openmoji.json", encoding="utf-8"))
openmoji_map = {}
for entry in openmoji_data:
    hexcode = entry["hexcode"]
    ann = entry["annotation"].lower().strip()
    openmoji_map[ann] = hexcode

# Words with ambiguous senses that must not be automatically matched
POLYSEMY_RISK = {
    "date", "second", "spring", "can", "glasses", "bark", "light", "court",
    "match", "fall", "nail", "iron", "fan", "bank", "letter", "board",
    "ruler", "ring", "seal", "trunk", "tie", "bow", "arm", "chest",
    "sole", "jam", "toast", "roll", "scale", "pound", "bill", "check",
    "club", "coach", "park", "plant", "row", "wave", "present", "star",
    "play", "mouse", "bat", "cricket", "strike", "foul", "fever", "catch",
    "run", "fly", "drop", "stick", "file", "rock", "saw", "safe", "fair",
    "fine", "flat", "mean", "right", "left", "well", "mine", "point", "yard"
}

uncovered = []
for item in inv:
    lesson = item["lesson"]
    term = item["term"]
    key = f"{lesson}:{term.lower().strip()}"
    if key in course_art or key in mulberry_manifest or key in openmoji_manifest:
        continue
    if lesson in (3, 13, 18):
        continue
    uncovered.append(item)

print(f"Total uncovered items: {len(uncovered)}")

matches = []
for item in uncovered:
    lesson = item["lesson"]
    term = item["term"]
    ja = item.get("ja", "")
    key = f"{lesson}:{term.lower().strip()}"
    clean = term.lower().strip()
    # Strip qualifiers like (shirt), / dad, etc.
    variants = [
        clean,
        re.sub(r"\s*\(.*?\)", "", clean).strip(),
        clean.split(" / ")[0].strip(),
        clean.split(",")[0].strip(),
    ]
    seen = set()
    unique_vars = [v for v in variants if v and not (v in seen or seen.add(v))]
    
    if any(v in POLYSEMY_RISK for v in unique_vars):
        continue
        
    # Check mulberry
    m_match = None
    for v in unique_vars:
        if v in mulberry_map:
            m_match = mulberry_map[v]
            break
        v_u = v.replace(" ", "_")
        if v_u in mulberry_map:
            m_match = mulberry_map[v_u]
            break
            
    if m_match:
        matches.append({
            "key": key, "lesson": lesson, "term": term, "ja": ja,
            "source": "mulberry", "file": m_match
        })
        continue

    # Check openmoji
    o_match = None
    for v in unique_vars:
        if v in openmoji_map:
            o_match = openmoji_map[v]
            break
    if o_match:
        matches.append({
            "key": key, "lesson": lesson, "term": term, "ja": ja,
            "source": "openmoji", "file": o_match
        })

print(f"Safe matched items: {len(matches)}")
mul_count = sum(1 for m in matches if m["source"] == "mulberry")
emoji_count = sum(1 for m in matches if m["source"] == "openmoji")
print(f"  Mulberry: {mul_count}")
print(f"  OpenMoji: {emoji_count}")

# Save candidate list
out_path = ROOT / "work/vocab-art/open_symbol_candidates.json"
out_path.write_text(json.dumps(matches, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Saved to {out_path}")
