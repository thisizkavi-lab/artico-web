#!/usr/bin/env python3
"""Harvest Batch 8: Food & Drink (Lessons 28, 31, 32, 33)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from harvest_wikipedia_art import harvest_items

ITEMS = [
    # Lesson 28: Meat, fish, dairy, snacks
    (28, "chicken", "Roast chicken", "chicken", False),
    (28, "pork", "Pork", "pork", False),
    (28, "cod", "Cod as food", "cod", False),
    (28, "crab", "Crab meat", "crab", False),
    (28, "lobster", "Lobster", "lobster", False),
    (28, "mackerel", "Mackerel as food", "mackerel", False),
    (28, "octopus", "Octopus as food", "octopus", False),
    (28, "salmon", "Salmon as food", "salmon", False),
    (28, "sardines", "Sardines as food", "sardines", False),
    (28, "scallops", "Scallop", "scallops", False),
    (28, "squid", "Squid as food", "squid", False),
    (28, "cream (dairy)", "Cream", "cream", False),
    (28, "boiled egg", "Boiled egg", "boiled-egg", False),
    (28, "fried egg", "Fried egg", "fried-egg", False),
    (28, "omelet", "Omelette", "omelet", False),
    (28, "poached egg", "Poached egg", "poached-egg", False),
    (28, "scrambled eggs", "Scrambled eggs", "scrambled-eggs", False),
    (28, "burger", "Hamburger", "burger", False),
    (28, "fast food", "Fast food", "fast-food", False),
    (28, "fries", "French fries", "fries", False),
    (28, "tofu", "Tofu", "tofu", False),
    (28, "bacon", "Bacon", "bacon", False),
    (28, "beef", "Beef", "beef", False),
    (28, "ham", "Ham", "ham", False),
    (28, "lamb", "Lamb and mutton", "lamb", False),
    (28, "sausages", "Sausage", "sausage", False),

    # Lesson 31: Bread, desserts, condiments
    (31, "dumplings", "Dumpling", "dumplings", False),
    (31, "flour", "Flour", "flour", False),
    (31, "roll (bread)", "Bread roll", "roll", False),
    (31, "cheesecake", "Cheesecake", "cheesecake", False),
    (31, "fruit salad", "Fruit salad", "fruit-salad", False),
    (31, "meringue", "Meringue", "meringue", False),
    (31, "mousse", "Mousse", "mousse", False),
    (31, "sorbet", "Sorbet", "sorbet", False),
    (31, "basil", "Basil", "basil", False),
    (31, "chives", "Chives", "chives", False),
    (31, "cilantro", "Coriander", "cilantro", False),
    (31, "ginger", "Ginger", "ginger", False),
    (31, "lemongrass", "Cymbopogon", "lemongrass", False),
    (31, "mint", "Spearmint", "mint", False),
    (31, "parsley", "Parsley", "parsley", False),
    (31, "bagel", "Bagel", "bagel", False),
    (31, "croissant", "Croissant", "croissant", False),
    (31, "noodles", "Noodle", "noodles", False),
    (31, "pancakes", "Pancake", "pancakes", False),
    (31, "pasta", "Pasta", "pasta", False),
    (31, "rice", "Cooked rice", "rice", False),
    (31, "toast", "Toast (food)", "toast", False),
    (31, "cake", "Cake", "cake", False),
    (31, "candy", "Candy", "candy", False),
    (31, "cookie", "Cookie", "cookie", False),
    (31, "cupcake", "Cupcake", "cupcake", False),
    (31, "ice cream", "Ice cream", "ice-cream", False),
    (31, "pie", "Pie", "pie", False),

    # Lesson 32: Drinks & containers
    (32, "coffee", "Coffee", "coffee", False),
    (32, "tea", "Tea", "tea", False),
    (32, "iced tea / ice tea", "Iced tea", "iced-tea", False),
    (32, "hot chocolate", "Hot chocolate", "hot-chocolate", False),
    (32, "wine", "Wine", "wine", False),
    (32, "beer", "Beer", "beer", False),
    (32, "bottle", "Bottle", "bottle", False),
    (32, "can / tin (uk, for a can)", "Beverage can", "can", False),
    (32, "bowl (container)", "Bowl", "bowl", False),
    (32, "glass", "Drinkware", "glass", False),

    # Lesson 33: Eating in and eating out
    (33, "chef", "Chef", "chef", False),
    (33, "restaurant", "Restaurant", "restaurant", False),
    (33, "appetizer", "Hors d'oeuvre", "appetizer", False),
    (33, "buffet", "Buffet (meal)", "buffet", False),
    (33, "napkin", "Napkin", "napkin", False),
    (33, "takeout", "Take-out", "takeout", False),
]

if __name__ == "__main__":
    print(f"Starting harvest for Batch 8 ({len(ITEMS)} items)...")
    harvest_items(ITEMS)
