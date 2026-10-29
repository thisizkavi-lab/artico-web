#!/usr/bin/env python3
"""Blind QA recognition test payload builder and evaluator."""
import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INVENTORY_PATH = ROOT / "work/vocab-art/inventory.json"

def get_blind_prompt(key, image_path):
    with open(INVENTORY_PATH, "r", encoding="utf-8") as f:
        inventory = json.load(f)

    match = [x for x in inventory if x["key"] == key]
    if not match:
        raise ValueError(f"Key {key} not found in inventory")
    item = match[0]

    # Select up to 5 shuffled siblings for the forced choice
    siblings = list(item["siblings"])
    random.seed(42) # Deterministic shuffle for reproducibility
    sampled_siblings = random.sample(siblings, min(5, len(siblings)))
    options = sampled_siblings + [item["term"]]
    random.shuffle(options)

    prompt = f"""You are an educational evaluator performing a blind visual recognition test.
You are given an image that teaches an English vocabulary term from the lesson topic: "{item['lessonTitle']}".
Image path: {image_path}

Please evaluate the image:
1. Open guess: Based ONLY on the visual content of the image, what English word or short phrase is this illustration teaching? List your top 3 guesses.
2. Forced choice: Which ONE of the following vocabulary options does this illustration depict?
{json.dumps(options, indent=2)}

Answer strictly in JSON format:
{{
  "open_guesses": ["guess1", "guess2", "guess3"],
  "forced_choice": "your_selected_option",
  "visual_clarity_rating": "1-5",
  "reasoning": "brief explanation of how the visual communicates the concept"
}}
"""
    return prompt, item["term"], options

if __name__ == "__main__":
    import sys
    key = sys.argv[1] if len(sys.argv) > 1 else "29:pomegranate"
    img = sys.argv[2] if len(sys.argv) > 2 else "/Users/kavi/Documents/kyoto/artico-web/work/vocab-art/bakeoff/style_a/29_pomegranate.webp"
    p, term, opts = get_blind_prompt(key, img)
    print(p)
