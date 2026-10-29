#!/usr/bin/env python3
"""Harvest Batch 9: Daily Life, Tools, Body, Baby Equipment (Lessons 10, 11, 12, 14, 22)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 10: Kitchen implements & toiletries
    (10, "corkscrew", "Corkscrew", "corkscrew", False),
    (10, "mortar", "Mortar and pestle", "mortar", False),
    (10, "pestle", "Mortar and pestle", "pestle", False),
    (10, "bowl / bowl (container) (same sense)", "Bowl", "bowl", False),
    (10, "cutlery", "Cutlery", "cutlery", False),
    (10, "conditioner", "Hair conditioner", "conditioner", False),
    (10, "toilet paper", "Toilet paper", "toilet-paper", False),

    # Lesson 11: Chores and cleaning
    (11, "mop the floor", "Mop", "mop", False),
    (11, "sweep the floor", "Broom", "sweep", False),
    (11, "vacuum the carpet", "Vacuum cleaner", "vacuum", False),
    (11, "laundry detergent", "Laundry detergent", "laundry-detergent", False),
    (11, "clothes line", "Clothes line", "clothes-line", False),
    (11, "peg", "Clothespin", "peg", False),
    (11, "tumble dryer", "Clothes dryer", "tumble-dryer", False),
    (11, "bin liner", "Bin bag", "bin-liner", False),
    (11, "sponge", "Sponge (tool)", "sponge", False),
    (11, "duster", "Feather duster", "duster", False),
    (11, "rubber gloves", "Rubber glove", "rubber-gloves", False),

    # Lesson 12: Tools and gardening
    (12, "ax / axe", "Axe", "axe", False),
    (12, "file", "File (tool)", "file", False),
    (12, "nuts", "Nut (hardware)", "nuts", False),
    (12, "lawn mower", "Lawn mower", "lawn-mower", False),

    # Lesson 14: The body
    (14, "face", "Human face", "face", False),
    (14, "forehead", "Forehead", "forehead", False),
    (14, "eyelashes", "Eyelash", "eyelashes", False),
    (14, "nose", "Human nose", "nose", False),
    (14, "mouth", "Human mouth", "mouth", False),
    (14, "cheek", "Cheek", "cheek", False),
    (14, "chin", "Chin", "chin", False),
    (14, "neck", "Neck", "neck", False),
    (14, "shoulder (body)", "Shoulder", "shoulder", False),
    (14, "chest", "Thorax", "chest", False),
    (14, "stomach", "Abdomen", "stomach", False),
    (14, "waist", "Waist", "waist", False),
    (14, "hip", "Hip", "hip", False),
    (14, "arm", "Arm", "arm", False),
    (14, "wrist", "Wrist", "wrist", False),
    (14, "hand", "Hand", "hand", False),
    (14, "finger", "Index finger", "finger", False),
    (14, "thumb", "Thumb", "thumb", False),
    (14, "leg", "Human leg", "leg", False),
    (14, "knee", "Knee", "knee", False),
    (14, "ankle", "Ankle", "ankle", False),
    (14, "foot", "Foot", "foot", False),
    (14, "toe", "Toe", "toe", False),

    # Lesson 22: Baby equipment & toys
    (22, "diaper", "Diaper", "diaper", False),
    (22, "pacifier", "Pacifier", "pacifier", False),
    (22, "crib", "Infant bed", "crib", False),
    (22, "stroller / buggy (often uk)", "Stroller", "stroller", False),
    (22, "board games", "Board game", "board-games", False),
    (22, "building blocks", "Toy block", "building-blocks", False),
    (22, "dollhouse / doll’s house", "Dollhouse", "dollhouse", False),
    (22, "rattle", "Baby rattle", "rattle", False),
    (22, "soft toy", "Stuffed toy", "soft-toy", False),
    (22, "spinning top", "Top", "spinning-top", False),
    (22, "train set", "Toy train", "train-set", False),
    (22, "playground", "Playground", "playground", False),
    (22, "sandbox / sandpit (uk)", "Sandpit", "sandbox", False),
    (22, "seesaw", "Seesaw", "seesaw", False),
    (22, "swings", "Swing (seat)", "swings", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 9 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
