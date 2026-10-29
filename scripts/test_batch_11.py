import json
from pathlib import Path
from harvest_wikipedia_art import fetch_wikipedia_image, fetch_commons_file

ROOT = Path(__file__).resolve().parents[1]
org = json.load(open(ROOT / "src/web/vocabularyOrganized.json", encoding="utf-8"))

# Build index of valid terms per lesson
valid_terms = {}
for l in org["lessons"]:
    lid = l["sourceLesson"]
    valid_terms[lid] = set()
    for g in l["groups"]:
        for item in g["items"]:
            valid_terms[lid].add(item[0].lower().strip())

# Proposed candidates for Batch 11: (lesson, term, query_or_file, slug, is_file)
candidates = [
    # Lesson 68: Sickness & Symptoms
    (68, "cough", "Cough", "cough", False),
    (68, "fever", "Fever", "fever", False),
    (68, "runny nose", "Rhinorrhea", "runny-nose", False),
    (68, "sneeze", "Sneezing", "sneeze", False),
    (68, "sore throat", "Sore throat", "sore-throat", False),
    (68, "accident", "Traffic collision", "accident", False),
    (68, "bruise", "Bruise", "bruise", False),
    (68, "burn", "Burn", "burn", False),
    (68, "cut (wound)", "Laceration", "cut-wound", False),
    (68, "nosebleed", "Epistaxis", "nosebleed", False),
    (68, "splinter", "Splinter", "splinter", False),
    (68, "sprain", "Sprain", "sprain", False),
    (68, "allergies", "Allergy", "allergies", False),
    (68, "asthma", "Asthma", "asthma", False),
    (68, "chickenpox", "Chickenpox", "chickenpox", False),
    (68, "eczema", "Eczema", "eczema", False),
    (68, "measles", "Measles", "measles", False),
    (68, "mumps", "Mumps", "mumps", False),
    (68, "tonsillitis", "Tonsillitis", "tonsillitis", False),
    (68, "virus", "Virus", "virus", False),
    (68, "ER", "Emergency department", "er", False),
    (68, "urgent care", "Urgent care", "urgent-care", False),

    # Lesson 69: Medicine and treatment
    (69, "clinic", "Clinic", "clinic", False),
    (69, "hospital", "Hospital", "hospital", False),
    (69, "patient (hospital)", "Patient", "patient", False),
    (69, "pharmacist", "Pharmacist", "pharmacist", False),
    (69, "pharmacy", "Pharmacy", "pharmacy", False),
    (69, "waiting room", "Waiting room", "waiting-room", False),
    (69, "blood test", "Venipuncture", "blood-test", False),
    (69, "injection", "Injection (medicine)", "injection", False),
    (69, "physical therapy / physiotherapy", "Physical therapy", "physical-therapy", False),
    (69, "prescription", "Medical prescription", "prescription", False),
    (69, "stitches", "Surgical suture", "stitches", False),
    (69, "vaccine", "Vaccine", "vaccine", False),
    (69, "antiseptic", "Antiseptic", "antiseptic", False),
    (69, "ointment", "Ointment", "ointment", False),
    (69, "painkillers", "Analgesic", "painkillers", False),
    (69, "pill / pills (tablets)", "Pill", "pill", False),
    (69, "tablet", "Tablet (pharmacy)", "tablet", False),
    (69, "adhesive bandage", "Adhesive bandage", "adhesive-bandage", False),
    (69, "bandage", "Bandage", "bandage", False),
    (69, "cotton wool", "Cotton ball", "cotton-wool", False),
    (69, "first aid kit", "First aid kit", "first-aid-kit", False),
    (69, "scales (measure)", "Weighing scale", "scales-measure", False),
    (69, "tweezers", "Tweezers", "tweezers", False),

    # Lesson 70: Healthy eating
    (70, "dairy", "Dairy product", "dairy", False),
    (70, "legumes", "Legume", "legumes", False),
    (70, "pulses", "Pulse (legume)", "pulses", False),
    (70, "superfoods", "Superfood", "superfoods", False),
    (70, "convenience food", "Convenience food", "convenience-food", False),
    (70, "processed food", "Ultra-processed food", "processed-food", False),
    (70, "whole grains", "Whole grain", "whole-grains", False),
    (70, "balanced diet", "Healthy diet", "balanced-diet", False),
    (70, "vegan", "Veganism", "vegan", False),
    (70, "vegetarian", "Vegetarianism", "vegetarian", False),

    # Lesson 71: Fitness and well-being
    (71, "aerobics", "Aerobic exercise", "aerobics", False),
    (71, "Pilates", "Pilates", "pilates", False),
    (71, "push-up / press-up (often UK)", "Push-up", "push-up", False),
    (71, "sit-up", "Sit-up", "sit-up", False),
    (71, "squat", "Squat (exercise)", "squat", False),
    (71, "workout", "Physical fitness", "workout", False),
    (71, "yoga", "Yoga", "yoga", False),
    (71, "exercise bike", "Stationary bicycle", "exercise-bike", False),
    (71, "exercise mat", "Mat", "exercise-mat", False),
    (71, "lockers", "Locker", "lockers", False),
    (71, "rowing machine", "Indoor rower", "rowing-machine", False),
    (71, "skipping rope", "Jump rope", "skipping-rope", False),
    (71, "treadmill", "Treadmill", "treadmill", False),
    (71, "acupuncture", "Acupuncture", "acupuncture", False),
    (71, "hot tub", "Hot tub", "hot-tub", False),
    (71, "massage", "Massage", "massage", False),
    (71, "meditate", "Meditation", "meditate", False),
    (71, "sauna", "Sauna", "sauna", False),
    (71, "spa", "Spa", "spa", False),
    (71, "steam room", "Steam room", "steam-room", False),
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
