#!/usr/bin/env python3
"""Crop source AI scene atlas into separately cacheable local Artico PNG cards."""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
ATLAS=ROOT/'public/vocabulary-ai/ch04-commute-atlas.webp'
TARGET=ROOT/'public/vocabulary-ai/ch04'
NAMES=('arrive-late','catch-the-bus','catch-the-train','commute')

def main():
    if not ATLAS.is_file():
        raise RuntimeError('Missing AI-illustrated commute atlas: '+str(ATLAS))
    with Image.open(ATLAS) as source:
        if source.size != (440,80):
            raise RuntimeError(f'Unexpected scene grid size: {source.size}')
        TARGET.mkdir(parents=True,exist_ok=True)
        for i,name in enumerate(NAMES):
            tile=source.crop((i*110,0,(i+1)*110,80)).convert('RGB')
            tile=tile.resize((330,240),Image.Resampling.LANCZOS)
            out=TARGET/(name+'.png')
            tile.save(out,'PNG',optimize=True)
            with Image.open(out) as verify:
                verify.verify()
            if out.stat().st_size<1000:raise RuntimeError('Blank illustration: '+name)
            print('Verified original scene:',out.relative_to(ROOT))
if __name__=='__main__':main()
