#!/usr/bin/env python3
"""Batch 11 harvester: Health, Medicine & Fitness (Lessons 68, 69, 70, 71)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 68: Sickness & Symptoms
    (68, "cough", "Cough", "cough", False),
    (68, "fever", "Fever", "fever", False),
    (68, "runny nose", "Nasal congestion", "runny-nose", False),
    (68, "sneeze", "Sneeze", "sneeze", False),
    (68, "sore throat", "Sore throat", "sore-throat", False),
    (68, "accident", "Traffic collision", "accident", False),
    (68, "bruise", "Bruise", "bruise", False),
    (68, "burn", "Burn", "burn", False),
    (68, "cut (wound)", "Wound", "cut-wound", False),
    (68, "nosebleed", "Nosebleed", "nosebleed", False),
    (68, "splinter", "Splinter", "splinter", False),
    (68, "sprain", "File:Sprained ankle 30min.jpg", "sprain", True),
    (68, "allergies", "Allergy", "allergies", False),
    (68, "asthma", "Asthma", "asthma", False),
    (68, "chickenpox", "Chickenpox", "chickenpox", False),
    (68, "eczema", "Atopic dermatitis", "eczema", False),
    (68, "measles", "Measles", "measles", False),
    (68, "mumps", "Mumps", "mumps", False),
    (68, "tonsillitis", "Tonsillitis", "tonsillitis", False),
    (68, "virus", "Virus", "virus", False),
    (68, "ER", "Emergency department", "er", False),
    (68, "urgent care", "Urgent care center", "urgent-care", False),

    # Lesson 69: Medicine and treatment
    (69, "clinic", "Clinic", "clinic", False),
    (69, "hospital", "Hospital", "hospital", False),
    (69, "patient (hospital)", "File:Hospital bed for patients.jpg", "patient", True),
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
    (69, "ointment", "Topical medication", "ointment", False),
    (69, "painkillers", "Analgesic", "painkillers", False),
    (69, "pill / pills (tablets)", "File:Pills.jpg", "pill", True),
    (69, "tablet", "Tablet (pharmacy)", "tablet", False),
    (69, "adhesive bandage", "Adhesive bandage", "adhesive-bandage", False),
    (69, "bandage", "Bandage", "bandage", False),
    (69, "cotton wool", "Cotton pad", "cotton-wool", False),
    (69, "first aid kit", "First aid kit", "first-aid-kit", False),
    (69, "scales (measure)", "Weighing scale", "scales-measure", False),
    (69, "tweezers", "Tweezers", "tweezers", False),

    # Lesson 70: Healthy eating
    (70, "dairy", "Dairy product", "dairy", False),
    (70, "legumes", "Legume", "legumes", False),
    (70, "pulses", "Lentil", "pulses", False),
    (70, "superfoods", "File:Healthy foods.jpg", "superfoods", True),
    (70, "convenience food", "Convenience food", "convenience-food", False),
    (70, "processed food", "Ultra-processed food", "processed-food", False),
    (70, "whole grains", "Whole grain", "whole-grains", False),
    (70, "balanced diet", "Healthy diet", "balanced-diet", False),
    (70, "vegan", "Veganism", "vegan", False),
    (70, "vegetarian", "Vegetarianism", "vegetarian", False),

    # Lesson 71: Fitness and well-being
    (71, "aerobics", "Aerobic exercise", "aerobics", False),
    (71, "Pilates", "Pilates", "pilates", False),
    (71, "push-up / press-up (often UK)", "File:Push-up bars.jpg", "push-up", True),
    (71, "sit-up", "Sit-up", "sit-up", False),
    (71, "squat", "Squat (exercise)", "squat", False),
    (71, "workout", "Physical fitness", "workout", False),
    (71, "yoga", "Yoga", "yoga", False),
    (71, "exercise bike", "Stationary bicycle", "exercise-bike", False),
    (71, "exercise mat", "Mat", "exercise-mat", False),
    (71, "lockers", "Locker", "lockers", False),
    (71, "rowing machine", "Indoor rower", "rowing-machine", False),
    (71, "skipping rope", "Skipping rope", "skipping-rope", False),
    (71, "treadmill", "Treadmill", "treadmill", False),
    (71, "acupuncture", "Acupuncture", "acupuncture", False),
    (71, "hot tub", "Hot tub", "hot-tub", False),
    (71, "massage", "Massage", "massage", False),
    (71, "meditate", "File:Padmasana feminino.jpg", "meditate", True),
    (71, "sauna", "Sauna", "sauna", False),
    (71, "spa", "Spa", "spa", False),
    (71, "steam room", "Steam bath", "steam-room", False),
]

if __name__ == "__main__":
    print(f"Starting harvest of Batch 11 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
