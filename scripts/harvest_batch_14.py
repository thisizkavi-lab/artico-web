#!/usr/bin/env python3
"""Batch 14 harvester: Maps, Travel, Free Time, Movies, TV & Media (Lessons 46, 47, 58, 65, 66, 67)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 46: Maps and directions
    (46, "avenue", "Boulevard", "avenue", False),
    (46, "freeway", "Controlled-access highway", "freeway", False),
    (46, "footpath", "Trail", "footpath", False),
    (46, "one-way street", "One-way traffic", "one-way-street", False),
    (46, "pedestrianized street", "Pedestrian zone", "pedestrianized-street", False),
    (46, "roadmap", "Road map", "roadmap", False),
    (46, "street map", "City map", "street-map", False),

    # Lesson 47: Travel and accommodation
    (47, "cabin", "Log cabin", "cabin", False),
    (47, "dorm", "Dormitory", "dorm", False),
    (47, "villa", "Villa", "villa", False),
    (47, "key card", "File:Magnetic stripe card - hotel key card.jpg", "key-card", True),
    (47, "safe", "Bank vault", "safe", False),
    (47, "front desk", "Receptionist", "front-desk", False),
    (47, "rental car", "Car rental", "rental-car", False),
    (47, "departure gate", "Gate (airport)", "departure-gate", False),
    (47, "guidebook", "Guide book", "guidebook", False),

    # Lesson 58: Free time activities
    (58, "collect stamps", "Stamp collecting", "collect-stamps", False),
    (58, "musical instrument", "Musical instrument", "musical-instrument", False),
    (58, "podcast", "File:Podcasting-wcwc.jpg", "podcast", True),
    (58, "gardening", "Gardening", "gardening", False),
    (58, "foraging", "Foraging", "foraging", False),
    (58, "jogging", "Jogging", "jogging", False),

    # Lesson 65: Movies and plays
    (65, "opera", "Opera", "opera", False),
    (65, "box office", "Box office", "box-office", False),
    (65, "movie theater / cinema (also used in the U.S.)", "Movie theater", "movie-theater", False),
    (65, "opera house", "Opera house", "opera-house", False),
    (65, "orchestra pit", "Orchestra pit", "orchestra-pit", False),
    (65, "props", "File:The Theater Prop Room (3632767321).jpg", "props", True),
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

if __name__ == "__main__":
    print(f"Starting harvest of Batch 14 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
