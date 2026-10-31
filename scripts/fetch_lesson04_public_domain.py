#!/usr/bin/env python3
"""Fetch and verify individually curated licensed Pexels photos for Lesson 04.

The source catalog contains the photographer's original photo-page URL, the
Pexels asset ID, the matching headword and the intended visual meaning.
Images are served locally by Artico; no external runtime hotlinks.
"""
import io
import json
import pathlib
import time
import urllib.error
import urllib.request
from PIL import Image, ImageOps, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
catalog = json.loads((root / "src/web/vocabularyDailyRoutineSources.json").read_text(encoding="utf-8"))
target = root / "public/vocabulary-curated-04"
target.mkdir(parents=True, exist_ok=True)
assert catalog["schema"] == 2 and catalog["source"].startswith("Pexels")
assert len(catalog["entries"]) >= 58, "Photo catalog is incomplete"
assert len({v["pexelsId"] for v in catalog["entries"].values()}) == len(catalog["entries"]), "Repeated photo for distinct words"
for term, item in catalog["entries"].items():
    p = target / (item["file"] + ".webp")
    assert "/" not in item["file"] and ".." not in item["file"]
    if p.is_file() and p.stat().st_size > 4000:
        try:
            with Image.open(p) as existing:
                existing.verify()
            continue
        except Exception:
            p.unlink()
    photo_id = int(item["pexelsId"])
    source = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=1400"
    assert item["sourcePage"].startswith("https://www.pexels.com/photo/")
    error = None
    for attempt in range(4):
        try:
            request = urllib.request.Request(source, headers={
                "User-Agent": "Mozilla/5.0 (compatible; ArticoLessonPhotos/2.0)",
                "Accept": "image/avif,image/webp,image/jpeg,image/*",
            })
            with urllib.request.urlopen(request, timeout=35) as response:
                raw = response.read(10_000_000)
                ctype = response.headers.get("Content-Type", "")
                if not ctype.startswith("image/"):
                    raise ValueError(f"Non-image response: {ctype}")
            with Image.open(io.BytesIO(raw)) as original:
                original.load()
                if original.width < 500 or original.height < 500:
                    raise ValueError(f"Too small ({original.size})")
                image = ImageOps.exif_transpose(original).convert("RGB")
            # Preserve the full subject on vertical photos; no chopped faces,
            # hands, shower heads or actions. A low-contrast photographic fill
            # replaces empty bars while the real scene is kept intact.
            size = (608, 384)
            backdrop = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)
            backdrop = backdrop.filter(ImageFilter.GaussianBlur(22)).convert("RGBA")
            white = Image.new("RGBA", size, (250, 248, 245, 90))
            backdrop.alpha_composite(white)
            foreground = ImageOps.contain(image, size, method=Image.Resampling.LANCZOS)
            if foreground.width < 608:
                foreground.thumbnail((584, 376), Image.Resampling.LANCZOS)
            offset = ((608 - foreground.width) // 2, (384 - foreground.height) // 2)
            backdrop.alpha_composite(foreground.convert("RGBA"), offset)
            backdrop.convert("RGB").save(p, "WEBP", quality=88, method=6)
            if p.stat().st_size < 4000:
                raise ValueError("Small/corrupted output")
            with Image.open(p) as output:
                output.verify()
            print(f"{term:43} {photo_id} -> {p.stat().st_size} bytes")
            break
        except Exception as exc:
            error = exc
            if p.exists():
                p.unlink()
            if attempt < 3:
                time.sleep(attempt + 1)
    else:
        raise RuntimeError(f"Missing or invalid Pexels photo for {term}: {source}: {error}")
print(f"Verified {len(catalog['entries'])} source-matched real photographs")
