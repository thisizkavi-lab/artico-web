#!/usr/bin/env python3
"""Crop, resize to 608x384 (152:96) and export optimized WebP (<80KB)."""
import sys
from pathlib import Path
from PIL import Image

def process_image(src_path, dest_path, target_w=608, target_h=384, max_kb=80):
    src_path = Path(src_path)
    dest_path = Path(dest_path)
    dest_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        target_ratio = target_w / target_h
        current_ratio = w / h

        if current_ratio > target_ratio:
            # Source is wider, crop width
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            im_cropped = im.crop((left, 0, left + new_w, h))
        else:
            # Source is taller, crop height
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            im_cropped = im.crop((0, top, w, top + new_h))

        im_resized = im_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Optimize WebP export under max_kb
        quality = 82
        while quality >= 60:
            im_resized.save(dest_path, "WEBP", quality=quality, method=6)
            size_kb = dest_path.stat().st_size / 1024
            if size_kb <= max_kb:
                break
            quality -= 5

        print(f"Exported {dest_path.name}: {target_w}x{target_h}, {dest_path.stat().st_size/1024:.1f} KB (q={quality})")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 crop_and_export_art.py <src> <dest>")
        sys.exit(1)
    process_image(sys.argv[1], sys.argv[2])
