import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mul = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]
openmoji = json.load(open(ROOT / "src/web/vocabularyOpenmojiManifest.json", encoding="utf-8"))["entries"]

uncovered = []
for l in org["lessons"]:
    lid = l["sourceLesson"]
    if lid in (3, 13, 18):
        continue
    for g in l["groups"]:
        for item in g["items"]:
            t = item[0]
            k = f"{lid}:{t.lower().strip()}"
            if k not in course_art and k not in mul and k not in openmoji:
                uncovered.append((lid, l["title"], g["title"], t))

print(f"Total uncovered items to analyze: {len(uncovered)}")

# Lessons that are fundamentally abstract/idiomatic
abstract_lessons = {
    6: "Describing things: opinions",
    8: "Common English idioms",
    19: "Feelings and moods",
    26: "Communication and beliefs",
    35: "Working conditions",
    39: "Working",
    41: "Work and business idioms",
    42: "Applying for a job",
    43: "Workplace skills and abilities",
    59: "Abilities and actions",
}

abstract_count = sum(1 for lid, lt, gt, t in uncovered if lid in abstract_lessons)
print(f"Items in purely abstract/idiomatic lessons: {abstract_count}")

# Check remaining items outside those lessons
remaining = [x for x in uncovered if x[0] not in abstract_lessons]
print(f"Items in mixed lessons: {len(remaining)}")

# Sample the mixed lessons
by_lesson = {}
for lid, lt, gt, t in remaining:
    by_lesson.setdefault((lid, lt), []).append((gt, t))

for (lid, lt), items in sorted(by_lesson.items(), key=lambda x: len(x[1]), reverse=True)[:10]:
    print(f"\nLesson {lid} ({lt}) - {len(items)} items:")
    for gt, t in items[:5]:
        print(f"   [{gt}] {t}")
