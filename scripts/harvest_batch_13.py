#!/usr/bin/env python3
"""Batch 13 harvester: Education, Studying & Crime (Lessons 23, 24, 27)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
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
    (23, "exam", "File:Test-986769 640.jpg", "exam", True),
    (23, "exercise book", "Exercise book", "exercise-book", False),
    (23, "homework", "Homework", "homework", False),
    (23, "textbook", "Textbook", "textbook", False),
    (23, "thesis", "Thesis", "thesis", False),

    # Lesson 24: Studying
    (24, "presentation", "Presentation", "presentation", False),
    (24, "take notes", "Note-taking", "take-notes", False),
    (24, "degree (qualification)", "File:Graduation diploma, graduation cap and senior ring of Robert Paul Rowan (10009396).jpg", "degree-qualification", True),

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

if __name__ == "__main__":
    print(f"Starting harvest of Batch 13 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
