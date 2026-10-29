#!/usr/bin/env python3
"""Harvest Batch 4: Clothes (15), Accessories (16), Appearance (17)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 15: Clothes
    (15, "clothes", "Clothing", "clothes", False),
    (15, "leggings", "Leggings", "leggings", False),
    (15, "shirt", "Dress shirt", "shirt", False),
    (15, "suit (clothing)", "Suit", "suit", False),
    (15, "sweater", "Sweater", "sweater", False),
    (15, "uniform", "Uniform", "uniform", False),
    (15, "bathrobe", "Bathrobe", "bathrobe", False),
    (15, "jockey shorts", "Briefs", "jockey-shorts", False),
    (15, "pajamas / pyjamas (uk spelling)", "Pajamas", "pajamas", False),
    (15, "panties", "Panties", "panties", False),
    (15, "pantyhose", "Pantyhose", "pantyhose", False),
    (15, "underwear", "Undergarment", "underwear", False),
    (15, "collar (shirt)", "Collar (clothing)", "collar", False),
    (15, "cuff", "Cuff", "cuff", False),
    (15, "hood (clothing)", "Hood (headgear)", "hood", False),
    (15, "sleeve", "Sleeve", "sleeve", False),
    (15, "tie (clothing)", "Necktie", "tie", False),
    (15, "sneakers", "Sneakers", "sneakers", False),
    (15, "checked / checkered", "Gingham", "checkered", False),
    (15, "cotton", "Cotton", "cotton", False),
    (15, "denim", "Denim", "denim", False),
    (15, "leather", "Leather", "leather", False),
    (15, "polka dot", "Polka dot", "polka-dot", False),
    (15, "silk", "Silk", "silk", False),

    # Lesson 16: Accessories
    (16, "handkerchief", "Handkerchief", "handkerchief", False),
    (16, "rucksack", "Backpack", "rucksack", False),
    (16, "badge", "Badge", "badge", False),
    (16, "cufflinks", "Cufflink", "cufflinks", False),
    (16, "jewelry", "Jewellery", "jewelry", False),
    (16, "pin", "Lapel pin", "pin", False),
    (16, "ring", "Ring (jewellery)", "ring", False),
    (16, "watch", "Wristwatch", "watch", False),
    (16, "flip-flops", "Flip-flops", "flip-flops", False),
    (16, "hat", "Hat", "hat", False),
    (16, "high heels", "High-heeled shoe", "high-heels", False),
    (16, "shoes", "Shoe", "shoes", False),
    (16, "sneakers", "Sneakers", "sneakers", False),
    (16, "blush / blusher (make-up)", "Rouge (cosmetics)", "blush", False),
    (16, "eyeliner", "Eye liner", "eyeliner", False),
    (16, "eyeshadow", "Eye shadow", "eyeshadow", False),
    (16, "foundation", "Foundation (cosmetics)", "foundation", False),
    (16, "makeup", "Cosmetics", "makeup", False),
    (16, "moisturizer", "Moisturizer", "moisturizer", False),
    (16, "Alice band", "Headband", "alice-band", False),
    (16, "hair band", "Hair tie", "hair-band", False),
    (16, "hair gel", "Hair gel", "hair-gel", False),
    (16, "hair spray", "Hair spray", "hair-spray", False),

    # Lesson 17: Appearance
    (17, "ponytail", "Ponytail", "ponytail", False),
    (17, "bald", "Baldness", "bald", False),
    (17, "beard", "Beard", "beard", False),
    (17, "goatee", "Goatee", "goatee", False),
    (17, "mustache / moustache (also UK spelling)", "Moustache", "mustache", False),
    (17, "sideburns", "Sideburns", "sideburns", False),
    (17, "blue eyes", "Eye color", "blue-eyes", False),
    (17, "mole (skin)", "Melanocytic nevus", "mole", False),
    (17, "muscular", "Bodybuilding", "muscular", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 4 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
