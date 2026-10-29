import json
from pathlib import Path
from harvest_wikipedia_art import fetch_wikipedia_image, fetch_commons_file

queries = [
    (68, "runny nose", "Nasal congestion"),
    (68, "sneeze", "Sneeze"),
    (68, "cut (wound)", "Wound"),
    (68, "nosebleed", "Nosebleed"),
    (68, "sprain", "Ankle sprain"),
    (68, "eczema", "Atopic dermatitis"),
    (68, "urgent care", "Urgent care center"),
    (69, "patient (hospital)", "File:Patient in hospital bed.jpg"),
    (69, "ointment", "Topical medication"),
    (69, "pill / pills (tablets)", "File:Pills.jpg"),
    (69, "cotton wool", "Cotton pad"),
    (70, "pulses", "File:Lentils and pulses.jpg"),
    (70, "superfoods", "File:Healthy foods.jpg"),
    (71, "push-up / press-up (often UK)", "File:Pushups 300.jpg"),
    (71, "skipping rope", "Skipping rope"),
    (71, "meditate", "Mindfulness"),
    (71, "steam room", "Steam bath"),
]

for lid, term, q in queries:
    is_f = q.startswith("File:")
    res = fetch_commons_file(q) if is_f else fetch_wikipedia_image(q)
    status = "OK" if res and res.get("url") else "FAIL"
    print(f"{status}: {lid}:{term} ({q}) -> {res.get('url') if res else 'None'}")
