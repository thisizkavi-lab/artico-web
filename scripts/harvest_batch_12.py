#!/usr/bin/env python3
"""Batch 12 harvester: Work, Office, Technology & Science (Lessons 34, 37, 38, 76, 77, 78)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 34: Jobs
    (34, "firefighter", "Firefighter", "firefighter", False),
    (34, "judge", "Judge", "judge", False),
    (34, "lawyer", "Lawyer", "lawyer", False),
    (34, "librarian", "Librarian", "librarian", False),
    (34, "police officer", "Police officer", "police-officer", False),
    (34, "security guard", "Security guard", "security-guard", False),
    (34, "surgeon", "Surgeon", "surgeon", False),
    (34, "vet", "Veterinarian", "vet", False),
    (34, "architect", "Architect", "architect", False),
    (34, "construction worker", "Construction worker", "construction-worker", False),
    (34, "electrician", "Electrician", "electrician", False),
    (34, "engineer", "Engineer", "engineer", False),
    (34, "mechanic", "Auto mechanic", "mechanic", False),
    (34, "plumber", "Plumber", "plumber", False),
    (34, "actor", "File:LEFTOVER- Theater Performance from Garage Theater Company 34.jpg", "actor", True),
    (34, "artist", "Artist", "artist", False),
    (34, "designer", "Designer", "designer", False),
    (34, "journalist", "Journalist", "journalist", False),
    (34, "photographer", "Photographer", "photographer", False),
    (34, "chef", "Chef", "chef", False),
    (34, "flight attendant", "Flight attendant", "flight-attendant", False),
    (34, "hairdresser", "Hairdresser", "hairdresser", False),
    (34, "receptionist", "Receptionist", "receptionist", False),
    (34, "tour guide", "Tour guide", "tour-guide", False),
    (34, "train driver", "Train driver", "train-driver", False),
    (34, "scientist", "Scientist", "scientist", False),

    # Lesson 37: Office equipment
    (37, "keyboard", "Computer keyboard", "keyboard", False),
    (37, "monitor", "Computer monitor", "monitor", False),
    (37, "projector", "Projector", "projector", False),
    (37, "scanner", "Image scanner", "scanner", False),
    (37, "shredder", "Paper shredder", "shredder", False),
    (37, "sticky notes", "Post-it note", "sticky-notes", False),
    (37, "binder clip", "Binder clip", "binder-clip", False),
    (37, "highlighter", "File:Highlighter pen -photocopied text-9Mar2009.jpg", "highlighter", True),
    (37, "paper clips", "Paper clip", "paper-clips", False),
    (37, "rubber band", "Rubber band", "rubber-band", False),
    (37, "ruler", "Ruler", "ruler", False),
    (37, "staples", "Staple (fastener)", "staples", False),

    # Lesson 38: Money and finance
    (38, "cash", "Banknote", "cash", False),
    (38, "coins", "Coin", "coins", False),
    (38, "credit card", "Credit card", "credit-card", False),
    (38, "debit card", "Debit card", "debit-card", False),
    (38, "ATM / cash machine", "File:BS S-Cash-Point.JPG", "atm", True),
    (38, "check (payment) / cheque (UK spelling)", "Cheque", "cheque", False),
    (38, "stock exchange", "Stock exchange", "stock-exchange", False),

    # Lesson 76: Technology and gadgets
    (76, "desktop computer", "Desktop computer", "desktop-computer", False),
    (76, "earphones", "Headphones", "earphones", False),
    (76, "smartphone", "Smartphone", "smartphone", False),
    (76, "smartwatch", "Smartwatch", "smartwatch", False),
    (76, "tablet (gadget)", "Tablet computer", "tablet-gadget", False),
    (76, "hard drive", "Hard disk drive", "hard-drive", False),
    (76, "USB drive", "USB flash drive", "usb-drive", False),
    (76, "router", "Wireless router", "router", False),

    # Lesson 77: Future tech
    (77, "3D printer", "3D printing", "3d-printer", False),
    (77, "electric vehicle", "Electric car", "electric-vehicle", False),
    (77, "robot", "Robot", "robot", False),
    (77, "virtual reality", "Virtual reality headset", "virtual-reality", False),
    (77, "renewable energy", "Renewable energy", "renewable-energy", False),

    # Lesson 78: Science
    (78, "Bunsen burner", "Bunsen burner", "bunsen-burner", False),
    (78, "laboratory / lab", "Laboratory", "laboratory", False),
    (78, "test tubes", "Test tube", "test-tubes", False),
    (78, "cell / cells", "Cell (biology)", "cell", False),
    (78, "molecule / molecules", "Molecule", "molecule", False),
    (78, "crystals", "Crystal", "crystals", False),
]

if __name__ == "__main__":
    print(f"Starting harvest of Batch 12 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
