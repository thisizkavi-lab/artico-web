#!/usr/bin/env python3
"""Crop a four-row AI illustration sheet into 24 reusable, locally hosted PNGs.

The original coherent artwork is committed as JPEG strips under artwork/sheets.
Each row is a six-panel educational picture sheet; cells are cut by fixed
coordinates and mapped to vocabulary meaning rather than guessed filenames.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "artwork" / "sheets" / "food-and-vegetables"
OUTPUT = ROOT / "public" / "vocabulary-ai" / "food"
OUTPUT.mkdir(parents=True,exist_ok=True)

WORDS = [
    "rice","bread","pasta","noodles","meat","fish",
    "chicken","egg","milk","cheese","yogurt","butter",
    "vegetables","fruit","potato","onion","garlic","ginger",
    "tomato","cucumber","lettuce","carrot","pepper","eggplant",
]
X = [(1,202),(216,412),(427,627),(639,836),(850,1051),(1064,1271)]
if len(WORDS) != 24: raise SystemExit("24-cell picture inventory is incomplete")
for row in range(4):
    source = SOURCE / f"row-{row}.jpg"
    if not source.exists(): raise RuntimeError(f"Missing original AI picture sheet: {source}")
    im = Image.open(source).convert("RGB")
    if im.width != 1273 or not (130 <= im.height <= 145):
        raise ValueError(f"Invalid sheet dimensions: {source} {im.size}")
    for col,(x0,x1) in enumerate(X):
        word=WORDS[row*6+col]
        crop=im.crop((x0,0,x1,im.height))
        crop=crop.resize((360,222),Image.Resampling.LANCZOS)
        out=OUTPUT/(word+".png")
        crop.quantize(colors=128,method=Image.Quantize.FASTOCTREE).save(out,"PNG",optimize=True)
        with Image.open(out) as picture:
            picture.verify()
        if out.stat().st_size < 1800:
            raise RuntimeError("Empty/broken illustrated picture: "+str(out))
print(f"Successfully generated {len(WORDS)} AI-painted food vocabulary PNGs")
