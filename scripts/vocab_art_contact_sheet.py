#!/usr/bin/env python3
"""Build review contact sheets for Artico vocabulary illustrations.

Usage:
  python3 scripts/vocab_art_contact_sheet.py --lesson 19
  python3 scripts/vocab_art_contact_sheet.py --sample 30 --batch 1
  python3 scripts/vocab_art_contact_sheet.py --bakeoff A
"""
import argparse
import json
import os
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
INVENTORY_PATH = ROOT / "work/vocab-art/inventory.json"
COURSE_ART_PATH = ROOT / "src/web/vocabularyCourseArt.json"
REVIEW_DIR = ROOT / "work/vocab-art/review"
BAKEOFF_DIR = ROOT / "work/vocab-art/bakeoff"

FONT_PATHS = [
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
]

def get_font(size):
    for fp in FONT_PATHS:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                pass
    return ImageFont.load_default()

FONT_HEADER = get_font(18)
FONT_TERM = get_font(14)
FONT_JA = get_font(12)
FONT_TAG = get_font(11)

def truncate_text(text, max_len=28):
    if not text:
        return ""
    return text if len(text) <= max_len else text[:max_len-1] + "…"

def render_sheet(cards, title, output_path, cols=6):
    """Render a list of card dictionaries into a single grid image."""
    cell_w = 260
    card_img_w = 240
    card_img_h = 152 # 152:96 aspect ratio scaled
    cell_h = 245
    pad = 12

    rows_count = (len(cards) + cols - 1) // cols
    header_h = 50
    total_w = cols * (cell_w + pad) + pad
    total_h = header_h + rows_count * (cell_h + pad) + pad

    canvas = Image.new("RGB", (total_w, total_h), (251, 250, 247)) # Artico paper #fbfaf7
    draw = ImageDraw.Draw(canvas)

    # Title header
    draw.text((pad, 14), title, font=FONT_HEADER, fill=(35, 45, 60))

    for idx, card in enumerate(cards):
        r = idx // cols
        c = idx % cols
        x = pad + c * (cell_w + pad)
        y = header_h + r * (cell_h + pad)

        # Card container background
        draw.rounded_rectangle([x, y, x + cell_w, y + cell_h], radius=8, fill=(255, 255, 255), outline=(226, 234, 245), width=1)

        # Border highlight if needs review
        if card.get("needs_review"):
            draw.rounded_rectangle([x, y, x + cell_w, y + cell_h], radius=8, outline=(220, 50, 50), width=3)

        img_x = x + (cell_w - card_img_w) // 2
        img_y = y + 8

        # Image or text-only placeholder
        img_path = card.get("image_path")
        if img_path and os.path.exists(img_path):
            try:
                with Image.open(img_path) as im:
                    im_rgb = im.convert("RGB").resize((card_img_w, card_img_h), Image.Resampling.LANCZOS)
                    canvas.paste(im_rgb, (img_x, img_y))
            except Exception as e:
                draw.rectangle([img_x, img_y, img_x + card_img_w, img_y + card_img_h], fill=(235, 235, 235))
                draw.text((img_x + 10, img_y + 60), f"Error loading image", font=FONT_TAG, fill=(180, 50, 50))
        else:
            reason = card.get("text_reason", "TEXT-ONLY")
            draw.rectangle([img_x, img_y, img_x + card_img_w, img_y + card_img_h], fill=(240, 242, 246))
            draw.text((img_x + 20, img_y + 55), f"[TEXT ONLY]", font=FONT_TERM, fill=(120, 130, 145))
            draw.text((img_x + 20, img_y + 75), f"Reason: {reason}", font=FONT_JA, fill=(150, 160, 175))

        # Text labels below image
        term_text = truncate_text(card.get("term", ""))
        ja_text = truncate_text(card.get("ja", ""))
        test_badge = card.get("test_badge", "") # ✓, ✗, ?

        text_y = img_y + card_img_h + 8
        draw.text((img_x, text_y), term_text, font=FONT_TERM, fill=(30, 40, 55))
        draw.text((img_x, text_y + 20), ja_text, font=FONT_JA, fill=(84, 121, 172)) # Artico blue

        # Source / badge
        badge_color = (40, 150, 40) if test_badge == "✓" else (200, 40, 40) if test_badge == "✗" else (120, 120, 120)
        source_tag = card.get("source_tag", "AI")
        draw.text((img_x + card_img_w - 40, text_y), f"{source_tag} {test_badge}", font=FONT_TAG, fill=badge_color)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, "PNG", optimize=True)
    print(f"Contact sheet saved to {output_path} ({len(cards)} items)")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--lesson", type=int, help="Lesson number to render (e.g. 19)")
    parser.add_argument("--bakeoff", type=str, help="Style identifier for bakeoff (A, B, or C)")
    parser.add_argument("--sample", type=int, help="Sample N images across finished lessons")
    parser.add_argument("--batch", type=int, default=1, help="Batch number for drift sheet")
    args = parser.parse_args()

    if args.lesson:
        if not INVENTORY_PATH.exists():
            print("Run scripts/vocab_art_inventory.mjs first!")
            return
        with open(INVENTORY_PATH, "r", encoding="utf-8") as f:
            inventory = json.load(f)

        lesson_items = [item for item in inventory if item["lesson"] == args.lesson]
        if not lesson_items:
            print(f"No items found for lesson {args.lesson}")
            return

        with open(COURSE_ART_PATH, "r", encoding="utf-8") as f:
            course_art = json.load(f)

        qa_file = ROOT / f"work/vocab-art/qa/lesson-{args.lesson:02d}.json"
        qa_data = {}
        if qa_file.exists():
            with open(qa_file, "r", encoding="utf-8") as f:
                qa_data = json.load(f)

        triage_file = ROOT / f"work/vocab-art/triage/lesson-{args.lesson:02d}.json"
        triage_data = {}
        if triage_file.exists():
            with open(triage_file, "r", encoding="utf-8") as f:
                triage_data = {t["key"]: t for t in json.load(f)}

        cards = []
        for item in lesson_items:
            key = item["key"]
            slug = course_art.get("entries", {}).get(key)
            img_path = None
            if slug:
                candidate = ROOT / f"public/vocabulary-course/{slug}.webp"
                if candidate.exists():
                    img_path = str(candidate)

            qa_entry = qa_data.get(key, {})
            pass_status = qa_entry.get("pass")
            test_badge = "✓" if pass_status is True else "✗" if pass_status is False else "?"
            triage_item = triage_data.get(key, {})

            cards.append({
                "term": item["term"],
                "ja": item["ja"],
                "image_path": img_path,
                "text_reason": triage_item.get("reason", "TEXT"),
                "test_badge": test_badge,
                "needs_review": qa_entry.get("needs_review", False),
                "source_tag": "GEN" if img_path else "TXT"
            })

        out_file = REVIEW_DIR / f"lesson-{args.lesson:02d}.png"
        render_sheet(cards, f"Lesson {args.lesson:02d}: {lesson_items[0]['lessonTitle']}", out_file)

    elif args.bakeoff:
        style = args.bakeoff.upper()
        bakeoff_dir = BAKEOFF_DIR / f"style_{style.lower()}"
        bakeoff_json = BAKEOFF_DIR / f"style_{style.lower()}_results.json"
        if not bakeoff_json.exists():
            print(f"Bakeoff results file {bakeoff_json} not found.")
            return
        with open(bakeoff_json, "r", encoding="utf-8") as f:
            results = json.load(f)

        cards = []
        for res in results:
            cards.append({
                "term": res["term"],
                "ja": res["ja"],
                "image_path": res["image_path"],
                "test_badge": "✓" if res.get("pass") else "✗",
                "needs_review": not res.get("pass"),
                "source_tag": f"Style {style}"
            })
        out_file = BAKEOFF_DIR / f"style-{style}.png"
        render_sheet(cards, f"Benchmark Bakeoff - Style {style}", out_file, cols=5)

if __name__ == "__main__":
    main()
