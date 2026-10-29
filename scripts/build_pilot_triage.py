#!/usr/bin/env python3
"""Build structured triage specifications for pilot lessons 19, 29, 54, 15."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INVENTORY_PATH = ROOT / "work/vocab-art/inventory.json"
TRIAGE_DIR = ROOT / "work/vocab-art/triage"
TRIAGE_DIR.mkdir(parents=True, exist_ok=True)

with open(INVENTORY_PATH, "r", encoding="utf-8") as f:
    inventory = json.load(f)

PILOT_LESSONS = [19, 29, 54, 15]

# Pre-defined visual concept mappings for specific terms
CONCEPTS = {
    # 29: Fruit and nuts
    "29:pomegranate": {"treatment": "OBJECT", "concept": "Whole pomegranate with calyx and sliced half showing ruby seeds", "differsFrom": "apple, peach"},
    "29:grapefruit": {"treatment": "OBJECT", "concept": "Large yellow-pink citrus cut in half revealing pink pulp segments", "differsFrom": "orange, lemon"},
    "29:lemon": {"treatment": "OBJECT", "concept": "Bright yellow oval citrus with pointed ends and a yellow sliced wheel", "differsFrom": "lime, orange"},
    "29:lime": {"treatment": "OBJECT", "concept": "Vibrant green citrus fruit and sliced wedge revealing translucent green flesh", "differsFrom": "lemon"},
    "29:mandarin": {"treatment": "OBJECT", "concept": "Small orange citrus partly peeled showing easy-peel loose skin and segments", "differsFrom": "orange, grapefruit"},
    "29:orange (fruit)": {"treatment": "OBJECT", "concept": "Round bright orange fruit and neat half cut showing juicy orange wedges", "differsFrom": "mandarin, grapefruit"},
    "29:apple": {"treatment": "OBJECT", "concept": "Crisp red apple with green leaf on stem and vertical sliced half showing star core", "differsFrom": "peach, pear"},
    "29:pear": {"treatment": "OBJECT", "concept": "Classic teardrop-shaped green-yellow European pear with slender neck", "differsFrom": "apple, quince"},
    "29:banana": {"treatment": "OBJECT", "concept": "Bunch of yellow bananas with one partially peeled banana ready to eat", "differsFrom": "plantain"},
    "29:strawberry / strawberries": {"treatment": "OBJECT", "concept": "Bright red heart-shaped berries with textured surface seeds and green leafy cap", "differsFrom": "raspberries, cherries"},
    "29:watermelon": {"treatment": "OBJECT", "concept": "Large green-striped round melon and a triangular slice with black seeds", "differsFrom": "melon"},

    # 54: Pets and farm animals
    "54:kitten": {"treatment": "ANIMAL", "concept": "Fluffy baby calico kitten with large round eyes playing with a yarn ball", "differsFrom": "cat"},
    "54:cat": {"treatment": "ANIMAL", "concept": "Sleek domestic adult cat sitting gracefully with tail wrapped around paws", "differsFrom": "kitten, dog"},
    "54:puppy": {"treatment": "ANIMAL", "concept": "Chubby little golden puppy with floppy ears and wagging tail", "differsFrom": "dog"},
    "54:dog": {"treatment": "ANIMAL", "concept": "Friendly adult Labrador retriever standing proudly wearing a collar", "differsFrom": "puppy, wolf"},
    "54:parrot": {"treatment": "ANIMAL", "concept": "Colorful scarlet macaw parrot perched on a branch with vivid red, yellow, and blue feathers", "differsFrom": "bird"},
    "54:rabbit": {"treatment": "ANIMAL", "concept": "Soft brown bunny with long upright ears twitching nose next to clover", "differsFrom": "guinea pig, hamster"},
    "54:horse": {"treatment": "ANIMAL", "concept": "Strong chestnut riding horse with flowing mane standing in a green paddock", "differsFrom": "donkey, llama"},
    "54:cow": {"treatment": "ANIMAL", "concept": "Black-and-white spotted dairy cow grazing peacefully in a pasture", "differsFrom": "bull"},

    # 19: Feelings and moods
    "19:nervous": {"treatment": "FEELING", "concept": "Ren sitting outside an interview room, fidgeting with fingers, wide anxious eyes and anime sweat drop", "differsFrom": "anxious, scared"},
    "19:frustrated": {"treatment": "FEELING", "concept": "Character gritting teeth and clutching hair over a tangled knot with subtle anger mark", "differsFrom": "angry, annoyed"},
    "19:cheerful": {"treatment": "FEELING", "concept": "Mia bouncing on her step with a broad radiant smile and sparkling background cues", "differsFrom": "happy, delighted"},
    "19:angry": {"treatment": "FEELING", "concept": "Character with furrowed brows, clenched teeth, and red cheeks scowling forward", "differsFrom": "furious, annoyed"},
    "19:lonely": {"treatment": "FEELING", "concept": "Person sitting alone by a rainy window holding a warm mug, looking out wistfully", "differsFrom": "sad, depressed"},

    # 15: Clothes
    "15:jacket": {"treatment": "GARMENT", "concept": "Stylish zip-up casual denim/cotton jacket on display with collar and pockets", "differsFrom": "coat, sweater"},
    "15:coat": {"treatment": "GARMENT", "concept": "Long warm wool trench coat reaching below knees with double-breasted buttons", "differsFrom": "jacket, raincoat"},
    "15:raincoat": {"treatment": "GARMENT", "concept": "Bright yellow hooded waterproof coat with rain droplets sliding off surface", "differsFrom": "coat, jacket"},
    "15:sneakers": {"treatment": "GARMENT", "concept": "Pair of modern athletic running shoes with crisp rubber soles and laces", "differsFrom": "shoes, boots"},
    "15:sweater": {"treatment": "GARMENT", "concept": "Cozy knit cable-patterned crewneck pullover sweater", "differsFrom": "cardigan, sweatshirt"},
}

for lesson in PILOT_LESSONS:
    items = [x for x in inventory if x["lesson"] == lesson]
    triage_list = []
    for item in items:
        key = item["key"]
        custom = CONCEPTS.get(key, {})
        treatment = custom.get("treatment", "OBJECT" if lesson in [29, 54, 15] else "FEELING")
        concept = custom.get("concept", f"Clear illustration depicting {item['term']} with distinct visual cues")
        differsFrom = custom.get("differsFrom", ", ".join(item["siblings"][:3]))

        triage_list.append({
            "key": key,
            "term": item["term"],
            "ja": item["ja"],
            "sense": f"Standard American English everyday usage of {item['term']}",
            "treatment": treatment,
            "concept": concept,
            "differsFrom": differsFrom
        })

    out_file = TRIAGE_DIR / f"lesson-{lesson:02d}.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(triage_list, f, indent=2, ensure_ascii=False)
    print(f"Generated triage for Lesson {lesson:02d}: {len(triage_list)} items -> {out_file.name}")
