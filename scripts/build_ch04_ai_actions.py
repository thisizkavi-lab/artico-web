#!/usr/bin/env python3
"""Produce sixteen original scene illustrations for the Artico Daily Routines cards.

Source atlases are locally stored, original AI-generated artwork. Each panel
is cropped into a PNG with a stable local URL. No external image requests.
"""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'public/vocabulary-ai'
OUTPUT=SOURCE/'ch04'
ROWS=[
  ('ch04-commute-atlas.webp',('arrive-late','catch-the-bus','catch-the-train','commute')),
  ('ch04-work-atlas.webp',('drive','go-to-school','go-to-work','start-work')),
  ('ch04-evening-atlas.webp',('finish-work','leave-work','work-from-home','overtime')),
  ('ch04-home-atlas.webp',('do-homework','have-a-break','leave-the-house','go-home')),
]

def main():
    OUTPUT.mkdir(parents=True,exist_ok=True)
    done=[]
    for atlas,names in ROWS:
        source=SOURCE/atlas
        if not source.is_file():
            raise RuntimeError('Missing locally committed scene atlas: '+str(source))
        with Image.open(source) as frame:
            if frame.size != (440,80):
                raise RuntimeError(f'Unexpected four-panel atlas dimensions: {atlas}: {frame.size}')
            for index,name in enumerate(names):
                image=frame.crop((index*110,0,(index+1)*110,80)).convert('RGB')
                image=image.resize((330,240),Image.Resampling.LANCZOS)
                target=OUTPUT/(name+'.png')
                image.save(target,format='PNG',optimize=True)
                with Image.open(target) as check:
                    check.verify()
                if target.stat().st_size < 1000:
                    raise RuntimeError('Illustration failed validation: '+str(target))
                done.append(name)
    if len(done)!=16 or len(set(done))!=16:
        raise RuntimeError('Expected 16 unique vocabulary scenes, got '+str(len(done)))
    print('Original illustrated vocabulary scenes validated:',', '.join(done))

if __name__=='__main__':
    main()
