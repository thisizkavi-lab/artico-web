#!/usr/bin/env python3
"""Export 24 approved generated tongue-twister scenes as individual PNGs.

Artworks are packed as a WebP atlas in Git to reduce binary file count;
the live application receives independent PNGs, not the atlas.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ATLAS = ROOT / 'assets' / 'twisters' / 'artico-ai-atlas.webp'
OUT = ROOT / 'public' / 'assets' / 'illustrations' / 'twisters'
IDS = [
    'ice-cream', 'big-black-bug', 'seashells', 'buggy-bumpers',
    'unique-new-york', 'red-lorry', 'red-leather', 'toy-boat',
    'elephants', 'oyster', 'free-throws', 'slippery-snails',
    'fresh-flesh', 'rural-repeater', 'clam-cream-can', 'coffee-cup',
    'bear-rhyme', 'two-witches', 'menagerie', 'thursday-challenge',
    'weather-verse', 'peter-piper', 'woodchuck', 'betty-botter',
]
COLUMNS, TILE_W, TILE_H = 4, 440, 290

def main():
    assert len(IDS) == len(set(IDS)) == 24
    with Image.open(ATLAS) as original:
        original.load()
        expected = (COLUMNS * TILE_W, 6 * TILE_H)
        if original.size != expected:
            raise ValueError(f'Expected atlas {expected}, got {original.size}')
        OUT.mkdir(parents=True, exist_ok=True)
        for index, ident in enumerate(IDS):
            x, y = (index % COLUMNS) * TILE_W, (index // COLUMNS) * TILE_H
            artwork = original.crop((x, y, x + TILE_W, y + TILE_H)).convert('RGB')
            dest = OUT / f'{ident}.png'
            artwork.save(dest, format='PNG', optimize=True)
            if dest.stat().st_size < 2000:
                raise ValueError(f'Empty artwork file: {dest}')
    print(f'Published {len(IDS)} original Artico teaching PNGs')

if __name__ == '__main__':
    main()
