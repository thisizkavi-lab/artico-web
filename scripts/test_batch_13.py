import json
from pathlib import Path
from harvest_wikipedia_art import fetch_wikipedia_image, fetch_commons_file

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))

valid_terms = {}
for l in org["lessons"]:
    lid = l["sourceLesson"]
    valid_terms[lid] = set()
    for g in l["groups"]:
        for item in g["items"]:
            valid_terms[lid].add(item[0].lower().strip())

candidates = [
    # Lesson 23: Education
    (23, "campus", "Campus", "campus", False),
    (23, "classroom", "Classroom", "classroom", False),
    (23, "college", "College", "college", False),
    (23, "laboratory", "Laboratory", "laboratory", False),
    (23, "lecture", "Lecture", "lecture", False),
    (23, "library", "Library", "library", False),
    (23, "professor", "Professor", "professor", False),
    (23, "student", "Student", "student", False),
    (23, "university", "University", "university", False),
    (23, "diploma", "Diploma", "diploma", False),
    (23, "essay", "Essay", "essay", False),
    (23, "exam", "Examination", "exam", False),
    (23, "exercise book", "Exercise book", "exercise-book", False),
    (23, "homework", "Homework", "homework", False),
    (23, "textbook", "Textbook", "textbook", False),
    (23, "thesis", "Thesis", "thesis", False),

    # Lesson 24: Studying
    (24, "presentation", "Presentation", "presentation", False),
    (24, "take notes", "Note-taking", "take-notes", False),
    (24, "degree (qualification)", "Academic degree", "degree-qualification", False),

    # Lesson 27: Crime and the law
    (27, "graffiti", "Graffiti", "graffiti", False),
    (27, "vandalism", "Vandalism", "vandalism", False),
    (27, "speeding", "Speed limit", "speeding", False),
    (27, "police officer", "Police officer", "police-officer", False),
    (27, "court", "Courtroom", "court", False),
    (27, "law court", "Courthouse", "law-court", False),
    (27, "lawyer", "Lawyer", "lawyer", False),
    (27, "judge", "Judge", "judge", False),
    (27, "jury", "Jury", "jury", False),
    (27, "prison", "Prison", "prison", False),
]

print("=== Validating terms against vocabularyOrganized.json ===")
errors = 0
for lid, term, query, slug, is_file in candidates:
    if term.lower().strip() not in valid_terms[lid]:
        print(f"ERROR: '{term}' not in lesson {lid}!")
        errors += 1
if errors == 0:
    print(f"All {len(candidates)} candidate terms are VALID vocabulary items!")

print("\n=== Testing Wikimedia API lookups ===")
missing_images = 0
for lid, term, query, slug, is_file in candidates:
    res = fetch_commons_file(query) if is_file else fetch_wikipedia_image(query)
    if not res or not res.get("url"):
        print(f"MISSING: {lid}:{term} -> {query}")
        missing_images += 1
    else:
        print(f"OK: {lid}:{term} -> {res.get('page_title')} ({res.get('width')}x{res.get('height')})")

print(f"\nMissing images: {missing_images}/{len(candidates)}")
