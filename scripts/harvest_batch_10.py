#!/usr/bin/env python3
"""Harvest Batch 10: Nature, Weather, Free Time, Media, Books, Music (Lessons 46, 51, 58, 63, 64, 65, 66)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 46: Maps and directions
    (46, "compass", "Compass", "compass", False),
    (46, "highway", "Highway", "highway", False),
    (46, "traffic light", "Traffic light", "traffic-light", False),
    (46, "crosswalk", "Pedestrian crossing", "crosswalk", False),
    (46, "intersection", "Intersection", "intersection", False),
    (46, "crossroads", "Intersection", "crossroads", False),
    (46, "sidewalk", "Sidewalk", "sidewalk", False),
    (46, "avenue", "Avenue", "avenue", False),
    (46, "freeway", "Freeway", "freeway", False),

    # Lesson 51: Weather and climate
    (51, "cloud", "Cloud", "cloud", False),
    (51, "fog", "Fog", "fog", False),
    (51, "smog", "Smog", "smog", False),
    (51, "sun", "Sun", "sun", False),
    (51, "drought", "Drought", "drought", False),
    (51, "flood", "Flood", "flood", False),
    (51, "puddle", "Puddle", "puddle", False),
    (51, "rain", "Rain", "rain", False),
    (51, "rainbow", "Rainbow", "rainbow", False),
    (51, "raindrop", "Drop (liquid)", "raindrop", False),
    (51, "blizzard", "Blizzard", "blizzard", False),
    (51, "frost", "Frost", "frost", False),
    (51, "snowflake", "Snowflake", "snowflake", False),
    (51, "snowstorm", "Winter storm", "snowstorm", False),
    (51, "hailstone", "Hail", "hailstone", False),
    (51, "ice", "Ice", "ice", False),
    (51, "snow", "Snow", "snow", False),
    (51, "heatwave", "Heat wave", "heatwave", False),
    (51, "hurricane", "Tropical cyclone", "hurricane", False),
    (51, "lightning", "Lightning", "lightning", False),
    (51, "sandstorm", "Dust storm", "sandstorm", False),
    (51, "storm", "Storm", "storm", False),
    (51, "tornado", "Tornado", "tornado", False),
    (51, "hot air balloon", "Hot air balloon", "hot-air-balloon", False),

    # Lesson 58: Free time activities
    (58, "baking", "Baking", "baking", False),
    (58, "cooking", "Cooking", "cooking", False),
    (58, "pottery", "Pottery", "pottery", False),
    (58, "photography", "Photography", "photography", False),
    (58, "chess", "Chess", "chess", False),
    (58, "video games", "Video game", "video-games", False),
    (58, "karaoke", "Karaoke", "karaoke", False),
    (58, "gym", "Gym", "gym", False),
    (58, "birdwatching", "Birdwatching", "birdwatching", False),
    (58, "camping", "Camping", "camping", False),
    (58, "hiking", "Hiking", "hiking", False),
    (58, "fly a kite", "Kite", "fly-a-kite", False),
    (58, "beach", "Beach", "beach", False),
    (58, "picnic", "Picnic", "picnic", False),

    # Lesson 63: Books and reading
    (63, "novel", "Novel", "novel", False),
    (63, "comic", "Comic book", "comic", False),
    (63, "cookbook", "Cookbook", "cookbook", False),
    (63, "dictionary", "Dictionary", "dictionary", False),
    (63, "encyclopedia", "Encyclopedia", "encyclopedia", False),
    (63, "newspaper", "Newspaper", "newspaper", False),
    (63, "textbook", "Textbook", "textbook", False),
    (63, "e-reader", "E-reader", "e-reader", False),
    (63, "audiobook", "Audiobook", "audiobook", False),
    (63, "illustration", "Illustration", "illustration", False),

    # Lesson 64: Music
    (64, "guitar player", "Guitarist", "guitar-player", False),
    (64, "conductor", "Conducting", "conductor", False),
    (64, "composer", "Composer", "composer", False),
    (64, "band", "Musical ensemble", "band", False),
    (64, "album", "Album", "album", False),
    (64, "festival", "Music festival", "festival", False),
    (64, "headphones", "Headphones", "headphones", False),
    (64, "microphone", "Microphone", "microphone", False),

    # Lesson 65: Movies and plays & Lesson 66: TV
    (65, "ballet", "Ballet", "ballet", False),
    (65, "popcorn", "Popcorn", "popcorn", False),
    (65, "curtain", "Front curtain", "curtain", False),
    (65, "costumes", "Costume", "costumes", False),
    (65, "stage", "Stage (theatre)", "stage", False),
    (66, "remote", "Remote control", "remote", False),
    (66, "tv set", "Television set", "tv-set", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 10 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
