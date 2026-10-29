import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
organized = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))
course_art = json.load(open(ROOT / "src/web/vocabularyCourseArt.json", encoding="utf-8"))["entries"]
mulberry = json.load(open(ROOT / "src/web/vocabularyMulberryManifest.json", encoding="utf-8"))["entries"]
openmoji = json.load(open(ROOT / "src/web/vocabularyOpenmojiManifest.json", encoding="utf-8"))["entries"]

def inspect_lessons(lids):
    for lid in lids:
        matching = [l for l in organized["lessons"] if l["sourceLesson"] == lid]
        if not matching:
            continue
        lesson = matching[0]
        title = lesson["title"]
        print(f"\n=== Lesson {lid}: {title} ===")
        for g in lesson["groups"]:
            g_title = g["title"]
            print(f"  Group: {g_title}")
            for item in g["items"]:
                term = item[0]
                k = f"{lid}:{term.lower().strip()}"
                status = "COURSE_ART" if k in course_art else ("MULBERRY" if k in mulberry else ("OPENMOJI" if k in openmoji else "UNCOVERED"))
                print(f"    {term:35s} -> {status}")

if __name__ == "__main__":
    import sys
    lids = [int(x) for x in sys.argv[1:]] if len(sys.argv) > 1 else [15, 16, 17]
    inspect_lessons(lids)
