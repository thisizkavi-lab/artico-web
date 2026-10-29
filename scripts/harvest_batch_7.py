#!/usr/bin/env python3
"""Harvest Batch 7: Sports & Venues (Lessons 60, 61, 62)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 60: Sports
    (60, "hockey", "Ice hockey", "hockey", False),
    (60, "rugby", "Rugby union", "rugby", False),
    (60, "soccer", "Association football", "soccer", False),
    (60, "table tennis", "Table tennis", "table-tennis", False),
    (60, "boxing", "Boxing", "boxing", False),
    (60, "gymnastics", "Gymnastics", "gymnastics", False),
    (60, "high jump", "High jump", "high-jump", False),
    (60, "javelin", "Javelin throw", "javelin", False),
    (60, "long jump", "Long jump", "long-jump", False),
    (60, "canoeing", "Canoeing", "canoeing", False),
    (60, "diving", "Diving (sport)", "diving", False),
    (60, "kayaking", "Kayaking", "kayaking", False),
    (60, "rowing", "Rowing (sport)", "rowing", False),
    (60, "sailing", "Sailing (sport)", "sailing", False),
    (60, "scuba diving", "Scuba diving", "scuba-diving", False),
    (60, "surfing", "Surfing", "surfing", False),
    (60, "swimming", "Swimming (sport)", "swimming", False),
    (60, "bungee jumping", "Bungee jumping", "bungee-jumping", False),
    (60, "skateboarding", "Skateboarding", "skateboarding", False),
    (60, "skiing", "Skiing", "skiing", False),
    (60, "snowboarding", "Snowboarding", "snowboarding", False),

    # Lesson 61: Soccer
    (61, "cleats", "Cleat (shoe)", "cleats", False),
    (61, "goalpost", "Goal (sports)", "goalpost", False),
    (61, "goalkeeper / goalie (informal)", "Goalkeeper (association football)", "goalkeeper", False),
    (61, "referee", "Referee (association football)", "referee", False),
    (61, "penalty", "Penalty kick (association football)", "penalty", False),
    (61, "penalty spot", "Penalty kick (association football)", "penalty-spot", False),
    (61, "red card", "Penalty card", "red-card", False),
    (61, "corner kick", "Corner kick", "corner-kick", False),
    (61, "free kick", "Free kick (association football)", "free-kick", False),
    (61, "jersey", "Kit (association football)", "jersey", False),

    # Lesson 62: Sports equipment and venues
    (62, "bat", "Baseball bat", "bat", False),
    (62, "hockey stick", "Ice hockey stick", "hockey-stick", False),
    (62, "hurdles", "Hurdles", "hurdles", False),
    (62, "pool cue", "Cue stick", "pool-cue", False),
    (62, "tennis racket", "Racket (sports)", "tennis-racket", False),
    (62, "diving board", "Diving board", "diving-board", False),
    (62, "flippers", "Swimfin", "flippers", False),
    (62, "lifejacket", "Personal flotation device", "lifejacket", False),
    (62, "oars", "Oar (watercraft)", "oars", False),
    (62, "paddle", "Paddle", "paddle", False),
    (62, "snowboard", "Snowboard", "snowboard", False),
    (62, "arrow", "Arrow", "arrow", False),
    (62, "bow (archery)", "Bow and arrow", "bow", False),
    (62, "boxing gloves", "Boxing glove", "boxing-gloves", False),
    (62, "fishing rod", "Fishing rod", "fishing-rod", False),
    (62, "harness", "Climbing harness", "harness", False),
    (62, "boxing ring", "Boxing ring", "boxing-ring", False),
    (62, "golf course", "Golf course", "golf-course", False),
    (62, "ice rink", "Ice rink", "ice-rink", False),
    (62, "running track", "Running track", "running-track", False),
    (62, "ski slope", "Piste", "ski-slope", False),
    (62, "swimming pool", "Swimming pool", "swimming-pool", False),
    (62, "tennis court", "Tennis court", "tennis-court", False),
    (62, "ice skates", "Ice skate", "ice-skates", False),
    (62, "roller skates", "Roller skates", "roller-skates", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 7 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
