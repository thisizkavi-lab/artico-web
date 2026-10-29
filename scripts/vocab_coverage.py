import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
inv = json.loads((ROOT / "work/vocab-art/inventory.json").read_text())
course_art = json.loads((ROOT / "src/web/vocabularyCourseArt.json").read_text())["entries"]
mulberry = json.loads((ROOT / "src/web/vocabularyMulberryManifest.json").read_text())["entries"]
openmoji = json.loads((ROOT / "src/web/vocabularyOpenmojiManifest.json").read_text())["entries"]
original_13 = json.loads((ROOT / "src/web/vocabularyOriginalScenes.json").read_text())["entries"]
personality_18 = json.loads((ROOT / "src/web/vocabularyPersonalityScenes.json").read_text())["entries"]

lessons = {}
for item in inv:
    l = item["lesson"]
    if l not in lessons:
        lessons[l] = {"total": 0, "course_art": 0, "mulberry": 0, "openmoji": 0, "special": 0, "none": 0}
    lessons[l]["total"] += 1
    term_clean = item["term"].lower().strip()
    key = f"{l}:{term_clean}"
    if key in course_art:
        lessons[l]["course_art"] += 1
    elif key in mulberry:
        lessons[l]["mulberry"] += 1
    elif key in openmoji:
        lessons[l]["openmoji"] += 1
    elif l == 3:
        lessons[l]["special"] += 1
    elif l == 13 and key in original_13:
        lessons[l]["special"] += 1
    elif l == 18 and key in personality_18:
        lessons[l]["special"] += 1
    else:
        lessons[l]["none"] += 1

total_inv = len(inv)
covered = sum(l["total"] - l["none"] for l in lessons.values())
c_art = sum(l["course_art"] for l in lessons.values())
c_mul = sum(l["mulberry"] for l in lessons.values())
c_emoji = sum(l["openmoji"] for l in lessons.values())
c_spec = sum(l["special"] for l in lessons.values())
uncovered = sum(l["none"] for l in lessons.values())

print(f"Total items in inventory: {total_inv}")
print(f"Total covered: {covered}/{total_inv} ({covered*100/total_inv:.1f}%)")
print(f"Course Art (high-res photo/illustration): {c_art}")
print(f"Mulberry symbols: {c_mul}")
print(f"OpenMoji symbols: {c_emoji}")
print(f"Special scenes (L03 time, L13 rent, L18 personality): {c_spec}")
print(f"Uncovered: {uncovered}")

print("\nBreakdown by Lesson (top uncovered):")
sorted_lessons = sorted(lessons.items(), key=lambda x: x[1]["none"], reverse=True)
for l, data in sorted_lessons[:30]:
    t = data["total"]
    cov = t - data["none"]
    unc = data["none"]
    art = data["course_art"]
    mul = data["mulberry"]
    emo = data["openmoji"]
    spc = data["special"]
    print(f"Lesson {l:2d}: total={t:2d}, covered={cov:2d}, uncovered={unc:2d} (art={art}, mul={mul}, emoji={emo}, spec={spc})")
