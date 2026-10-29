#!/usr/bin/env python3
"""Produce 16 meaning-specific local PNGs from original AI-painted grooming sheet."""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'artwork/sheets/daily-grooming'
OUT=ROOT/'public/vocabulary-ai/grooming'
WORDS=[
 'alarm-goes-off','wake-up','get-up','get-dressed',
 'get-ready','brush-your-hair','brush-your-teeth','dry-your-hair',
 'put-on-makeup','shave','take-a-bath','take-a-shower',
 'make-breakfast','eat-breakfast','eat-lunch','eat-dinner',
]
OUT.mkdir(parents=True,exist_ok=True)
for row in range(4):
    source=SOURCE/f'row-{row}.jpg'
    if not source.exists():raise RuntimeError(f'Missing source sheet {source}')
    image=Image.open(source).convert('RGB')
    if image.size!=(1280,213):raise RuntimeError(f'Unexpected sheet size: {image.size}')
    for col in range(4):
        asset=WORDS[row*4+col]
        cropped=image.crop((col*320,0,(col+1)*320,213))
        cropped=cropped.resize((360,222),Image.Resampling.LANCZOS)
        path=OUT/(asset+'.png')
        cropped.quantize(colors=128,method=Image.Quantize.FASTOCTREE).save(path,format='PNG',optimize=True)
        with Image.open(path) as img:img.verify()
        if path.stat().st_size<1500:raise RuntimeError('Broken generated PNG '+str(path))
print(f'Generated {len(WORDS)} original AI-painted grooming PNGs')
