import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

inv = json.loads((ROOT / "work/vocab-art/inventory.json").read_text(encoding="utf-8"))
course_art = json.loads((ROOT / "src/web/vocabularyCourseArt.json").read_text(encoding="utf-8")).get("entries", {})
mulberry_manifest = json.loads((ROOT / "src/web/vocabularyMulberryManifest.json").read_text(encoding="utf-8")).get("entries", {})
openmoji_manifest = json.loads((ROOT / "src/web/vocabularyOpenmojiManifest.json").read_text(encoding="utf-8")).get("entries", {})

# Gather all mulberry file names
mulberry_files = [p.name for p in (ROOT / "work/vocab-art/upstream/mulberry/EN").glob("*.svg")]
mulberry_name_map = {}
for fn in mulberry_files:
    base = fn[:-4].lower()
    # Normalize: underscores and hyphens to spaces
    norm = base.replace("_", " ").replace("-", " ")
    mulberry_name_map[norm] = fn
    # Also strip parentheses or trailing qualifiers
    clean = re.sub(r"\s*\(.*?\)", "", norm).strip()
    if clean not in mulberry_name_map:
        mulberry_name_map[clean] = fn
    mulberry_name_map[base] = fn

print(f"Loaded {len(mulberry_files)} Mulberry files.")

# Gather openmoji
openmoji_data = json.load(open(ROOT / "work/vocab-art/upstream/openmoji.json", encoding="utf-8"))
openmoji_map = {}
for entry in openmoji_data:
    hexcode = entry["hexcode"]
    ann = entry["annotation"].lower().strip()
    openmoji_map[ann] = hexcode
    # Also tags
    tags = [t.strip().lower() for t in entry.get("tags", "").split(",") if t.strip()]
    for t in tags:
        if t not in openmoji_map:
            openmoji_map[t] = hexcode

print(f"Loaded {len(openmoji_data)} OpenMoji entries.")

# Check polysemy guards: blacklist of terms where literal string match is risky
POLYSEMY_RISK = {
    "date", "second", "spring", "can", "glasses", "bark", "light", "court",
    "match", "fall", "nail", "iron", "fan", "bank", "letter", "board",
    "ruler", "ring", "seal", "trunk", "tie", "bow", "arm", "chest",
    "sole", "jam", "toast", "roll", "scale", "pound", "bill", "check",
    "club", "coach", "park", "plant", "row", "wave", "present", "star",
    "play", "mouse", "bat", "cricket", "strike", "foul", "fever", "catch",
    "run", "fly", "drop", "stick", "file", "rock", "saw", "safe", "fair",
    "fine", "flat", "mean", "right", "left", "well", "mine", "point"
}

# Find new candidate matches among uncovered items
uncovered = []
for item in inv:
    lesson = item["lesson"]
    term = item["term"]
    key = f"{lesson}:{term.lower().strip()}"
    if key in course_art or key in mulberry_manifest or key in openmoji_manifest:
        continue
    # Lesson 3 time and lesson 13 / 18 have dedicated pipelines
    if lesson in (3, 13, 18):
        continue
    uncovered.append(item)

print(f"Items to consider for new open art: {len(uncovered)}")

matches_mulberry = []
matches_openmoji = []

for item in uncovered:
    lesson = item["lesson"]
    term = item["term"]
    ja = item.get("ja", "")
    key = f"{lesson}:{term.lower().strip()}"
    clean_term = term.lower().strip()
    
    # Try singular / canonical forms
    variants = [
        clean_term,
        clean_term.replace("the ", ""),
        clean_term.split(" / ")[0].strip(),
        clean_term.split(",")[0].strip(),
        re.sub(r"\s*\(.*?\)", "", clean_term).strip(),
    ]
    # Remove duplicates preserving order
    unique_variants = []
    for v in variants:
        if v and v not in unique_variants:
            unique_variants.append(v)
            
    is_risky = any(v in POLYSEMY_RISK for v in unique_variants)
    
    # Check mulberry
    m_found = None
    for v in unique_variants:
        if v in mulberry_name_map:
            m_found = mulberry_name_map[v]
            matched_var = v
            break
        # Try with commas/underscores
        v_under = v.replace(" ", "_")
        if v_under in mulberry_name_map:
            m_found = mulberry_name_map[v_under]
            matched_var = v
            break
            
    if m_found:
        matches_mulberry.append({
            "key": key,
            "lesson": lesson,
            "term": term,
            "ja": ja,
            "svg": m_found,
            "variant": matched_var,
            "risky": is_risky
        })
        continue

    # Check openmoji
    o_found = None
    for v in unique_variants:
        if v in openmoji_map:
            o_found = openmoji_map[v]
            matched_var = v
            break
    if o_found:
        matches_openmoji.append({
            "key": key,
            "lesson": lesson,
            "term": term,
            "ja": ja,
            "hexcode": o_found,
            "variant": matched_var,
            "risky": is_risky
        })

print(f"Found Mulberry matches: {len(matches_mulberry)} (safe: {len([m for m in matches_mulberry if not m['risky']])})")
print(f"Found OpenMoji matches: {len(matches_openmoji)} (safe: {len([m for m in matches_openmoji if not m['risky']])})")

