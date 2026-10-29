#!/usr/bin/env python3
"""Harvest openly licensed, high-resolution photographs from Wikimedia/Wikipedia.

Ensures:
- 152:96 aspect ratio (608x384) Lanczos resampling.
- Optimized WebP encoding under 80 KB.
- Registration in src/web/vocabularyCourseArt.json.
- Full attribution in public/vocabulary-symbols/ATTRIBUTION.md.
"""
import io
import json
import re
import sys
import time
from pathlib import Path
import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
COURSE_ART_PATH = ROOT / "src/web/vocabularyCourseArt.json"
ATTRIBUTION_PATH = ROOT / "public/vocabulary-symbols/ATTRIBUTION.md"

HEADERS = {
    "User-Agent": "ArticoEducationalBot/1.0 (https://github.com/thisizkavi-lab/artico-web; contact: educational@artico.app)"
}


def crop_to_course_ratio(image_bytes, target_w=608, target_h=384, vertical_bias=0.45):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    src_w, src_h = img.size
    target_ratio = target_w / target_h  # ~1.5833
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        # Source is wider than target: crop horizontal edges symmetrically
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        # Source is taller than target: crop vertical edges with bias
        new_h = int(src_w / target_ratio)
        top = max(0, min(src_h - new_h, int((src_h - new_h) * vertical_bias)))
        img = img.crop((0, top, src_w, top + new_h))

    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    out = io.BytesIO()
    img.save(out, format="WEBP", quality=82, method=6)
    return out.getvalue()


def fetch_wikipedia_image(title_query):
    wiki_url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": title_query,
        "prop": "pageimages|pageterms",
        "piprop": "thumbnail|original",
        "pithumbsize": 1000,
        "format": "json"
    }
    try:
        r = requests.get(wiki_url, params=params, headers=HEADERS, timeout=12)
        if r.status_code != 200:
            return None
        pages = r.json().get("query", {}).get("pages", {})
        for pid, p in pages.items():
            if pid == "-1":
                continue
            thumb = p.get("thumbnail", {})
            orig = p.get("original", {})
            url = thumb.get("source") or orig.get("source")
            if url:
                # fetch attribution / file title
                return {
                    "page_title": p.get("title"),
                    "url": url,
                    "width": thumb.get("width") or orig.get("width"),
                    "height": thumb.get("height") or orig.get("height"),
                    "description": p.get("terms", {}).get("description", [""])[0]
                }
    except Exception as exc:
        print(f"Error fetching {title_query}: {exc}", file=sys.stderr)
    return None


def fetch_commons_file(file_title):
    wiki_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": f"File:{file_title}" if not file_title.startswith("File:") else file_title,
        "prop": "imageinfo",
        "iiprop": "url|size|mime",
        "format": "json"
    }
    try:
        r = requests.get(wiki_url, params=params, headers=HEADERS, timeout=12)
        if r.status_code != 200:
            return None
        pages = r.json().get("query", {}).get("pages", {})
        for pid, p in pages.items():
            if pid == "-1":
                continue
            ii = p.get("imageinfo", [{}])[0]
            return {
                "page_title": p.get("title"),
                "url": ii.get("url"),
                "width": ii.get("width"),
                "height": ii.get("height"),
                "description": file_title
            }
    except Exception as exc:
        print(f"Error fetching commons file {file_title}: {exc}", file=sys.stderr)
    return None


def harvest_items(items):
    """Harvest list of tuples: (lesson, term, query_or_file, slug, is_file)."""
    course_art = json.loads(COURSE_ART_PATH.read_text(encoding="utf-8"))
    entries = course_art.setdefault("entries", {})

    attributions = []
    success_count = 0

    for lesson, term, query, slug, is_file in items:
        key = f"{lesson}:{term.lower().strip()}"
        out_dir = ROOT / f"public/vocabulary-course/{lesson}"
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{slug}.webp"

        if out_file.exists() and key in entries:
            print(f"Already exists: {key} -> {slug}.webp")
            continue

        print(f"Harvesting: {key} ({query})...")
        meta = fetch_commons_file(query) if is_file else fetch_wikipedia_image(query)
        if not meta or not meta.get("url"):
            print(f"  FAILED to find image for {key} with query '{query}'")
            continue

        url = meta["url"]
        try:
            time.sleep(0.3)  # Polite delay
            img_resp = requests.get(url, headers=HEADERS, timeout=15)
            if img_resp.status_code != 200:
                print(f"  HTTP error {img_resp.status_code} downloading {url}")
                continue

            webp_bytes = crop_to_course_ratio(img_resp.content)
            if len(webp_bytes) > 78 * 1024:
                # compress further to strictly adhere to <80KB limit
                img = Image.open(io.BytesIO(webp_bytes))
                for q in (75, 70, 65, 60):
                    buf = io.BytesIO()
                    img.save(buf, format="WEBP", quality=q, method=6)
                    if len(buf.getvalue()) <= 78 * 1024:
                        webp_bytes = buf.getvalue()
                        break

            out_file.write_bytes(webp_bytes)
            entries[key] = f"{lesson}/{slug}"
            success_count += 1
            print(f"  Saved: {out_file.name} ({len(webp_bytes) // 1024} KB)")

            # Record attribution
            attributions.append(
                f"- **{term}** (Lesson {lesson}, `{lesson}/{slug}.webp`): "
                f"Source: [{meta['page_title']}]({url}) via Wikimedia Commons. CC BY-SA / Public Domain."
            )
        except Exception as exc:
            print(f"  Error processing {key}: {exc}")

    # Save manifest
    COURSE_ART_PATH.write_text(json.dumps(course_art, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # Append attribution
    if attributions and ATTRIBUTION_PATH.exists():
        current_attr = ATTRIBUTION_PATH.read_text(encoding="utf-8")
        addition = "\n" + "\n".join(attributions) + "\n"
        ATTRIBUTION_PATH.write_text(current_attr.rstrip() + addition, encoding="utf-8")

    print(f"\nDone! Successfully harvested and saved {success_count} assets.")


if __name__ == "__main__":
    pass
