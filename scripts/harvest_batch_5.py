#!/usr/bin/env python3
"""Harvest Batch 5: Transportation & Travel (Lessons 44, 45, 47, 49)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 44: Transportation
    (44, "coach", "Coach (bus)", "coach", False),
    (44, "motorbike / motorcycle", "Motorcycle", "motorcycle", False),
    (44, "truck", "Truck", "truck", False),
    (44, "subway", "Rapid transit", "subway", False),
    (44, "airplane / plane", "Airplane", "airplane", False),
    (44, "airport", "Airport", "airport", False),
    (44, "cockpit", "Cockpit", "cockpit", False),
    (44, "platform", "Railway platform", "platform", False),
    (44, "train station", "Train station", "train-station", False),
    (44, "ticket", "Ticket (admission)", "ticket", False),
    (44, "ride a bike", "Bicycle", "ride-a-bike", False),
    (44, "ride a horse", "Equestrianism", "ride-a-horse", False),

    # Lesson 45: Driving a car
    (45, "brakes", "Disc brake", "brakes", False),
    (45, "headlight", "Headlamp", "headlight", False),
    (45, "hood (car)", "Hood (car)", "hood", False),
    (45, "seatbelt", "Seat belt", "seatbelt", False),
    (45, "steering wheel", "Steering wheel", "steering-wheel", False),
    (45, "tire", "Tire", "tire", False),
    (45, "trunk (car)", "Trunk (car)", "trunk", False),
    (45, "windshield", "Windshield", "windshield", False),
    (45, "car wash", "Car wash", "car-wash", False),
    (45, "auto repair shop", "Automobile repair shop", "auto-repair-shop", False),
    (45, "gas station / petrol station (uk)", "Filling station", "gas-station", False),

    # Lesson 47: Travel and accommodation
    (47, "bed and breakfast / b and b", "Bed and breakfast", "bed-and-breakfast", False),
    (47, "campsite", "Campsite", "campsite", False),
    (47, "chalet", "Chalet", "chalet", False),
    (47, "guest house", "Guest house", "guest-house", False),
    (47, "hostel", "Hostel", "hostel", False),
    (47, "hotel", "Hotel", "hotel", False),
    (47, "motel", "Motel", "motel", False),
    (47, "resort", "Resort", "resort", False),
    (47, "reception", "Front desk", "reception", False),
    (47, "luggage", "Baggage", "luggage", False),
    (47, "passport", "Passport", "passport", False),
    (47, "boarding pass", "Boarding pass", "boarding-pass", False),

    # Lesson 49: Camping and cycling
    (49, "tent", "Tent", "tent", False),
    (49, "sleeping bag", "Sleeping bag", "sleeping-bag", False),
    (49, "rv / travel trailer", "Recreational vehicle", "rv", False),
    (49, "air mattress / air bed (mainly uk)", "Air mattress", "air-mattress", False),
    (49, "barbecue", "Barbecue grill", "barbecue", False),
    (49, "campfire", "Campfire", "campfire", False),
    (49, "camp stove / camping stove", "Portable stove", "camp-stove", False),
    (49, "cooler", "Cooler", "cooler", False),
    (49, "flask", "Vacuum flask", "flask", False),
    (49, "folding chair", "Folding chair", "folding-chair", False),
    (49, "folding table", "Folding table", "folding-table", False),
    (49, "water bottle", "Water bottle", "water-bottle", False),
    (49, "walking boots", "Hiking boot", "walking-boots", False),
    (49, "mountain bike", "Mountain bike", "mountain-bike", False),
    (49, "racing bike", "Racing bicycle", "racing-bike", False),
    (49, "tandem", "Tandem bicycle", "tandem", False),
    (49, "unicycle", "Unicycle", "unicycle", False),
    (49, "cycling helmet", "Bicycle helmet", "cycling-helmet", False),
    (49, "cycle pump", "Bicycle pump", "cycle-pump", False),
    (49, "chain", "Bicycle chain", "chain", False),
    (49, "handlebar", "Bicycle handlebar", "handlebar", False),
    (49, "pedal", "Bicycle pedal", "pedal", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 5 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
