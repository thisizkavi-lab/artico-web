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
    # Lesson 46: Maps and directions
    (46, "avenue", "Avenue", "avenue", False),
    (46, "freeway", "Freeway", "freeway", False),
    (46, "footpath", "Trail", "footpath", False),
    (46, "one-way street", "One-way traffic", "one-way-street", False),
    (46, "pedestrianized street", "Pedestrian zone", "pedestrianized-street", False),
    (46, "roadmap", "Road map", "roadmap", False),
    (46, "street map", "Street map", "street-map", False),

    # Lesson 47: Travel and accommodation
    (47, "cabin", "Log cabin", "cabin", False),
    (47, "dorm", "Dormitory", "dorm", False),
    (47, "villa", "Villa", "villa", False),
    (47, "key card", "Keycard", "key-card", False),
    (47, "safe", "Safe", "safe", False),
    (47, "front desk", "Receptionist", "front-desk", False),
    (47, "rental car", "Car rental", "rental-car", False),
    (47, "departure gate", "Gate (airport)", "departure-gate", False),
    (47, "guidebook", "Guide book", "guidebook", False),
    (47, "phrasebook", "Phrasebook", "phrasebook", False),

    # Lesson 58: Free time activities
    (58, "collect stamps", "Stamp collecting", "collect-stamps", False),
    (58, "musical instrument", "Musical instrument", "musical-instrument", False),
    (58, "podcast", "Podcasting", "podcast", False),
    (58, "gardening", "Gardening", "gardening", False),
    (58, "foraging", "Foraging", "foraging", False),
    (58, "jogging", "Jogging", "jogging", False),

    # Lesson 65: Movies and plays
    (65, "opera", "Opera", "opera", False),
    (65, "box office", "Box office", "box-office", False),
    (65, "movie theater / cinema (also used in the U.S.)", "Movie theater", "movie-theater", False),
    (65, "opera house", "Opera house", "opera-house", False),
    (65, "orchestra pit", "Orchestra pit", "orchestra-pit", False),
    (65, "props", "Theatrical property", "props", False),
    (65, "special effects", "Special effect", "special-effects", False),
    (65, "stunt", "Stunt performer", "stunt", False),

    # Lesson 66: TV
    (66, "cooking show", "Cooking show", "cooking-show", False),
    (66, "game show", "Game show", "game-show", False),
    (66, "nature documentary", "Nature documentary", "nature-documentary", False),
    (66, "news anchor", "News presenter", "news-anchor", False),
    (66, "satellite TV", "Satellite television", "satellite-tv", False),

    # Lesson 67: Media and celebrity
    (67, "paparazzi", "Paparazzi", "paparazzi", False),
    (67, "red carpet", "Red carpet", "red-carpet", False),
    (67, "newspaper headline", "Headline", "newspaper-headline", False),
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
