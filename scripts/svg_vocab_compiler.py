#!/usr/bin/env python3
"""Artico Studio SVG -> WebP Compiler, Linter & Contact Sheet QA Tool.

Always run with the workspace Python virtualenv:
  /Users/kavi/Documents/kyoto/.venv/bin/python3 scripts/svg_vocab_compiler.py <subcommand> [options]

Subcommands:
  plan --lesson 68
      Print every vocabulary entry in Lesson 68 with group title, Japanese gloss,
      siblings, suggested SVG path, and current status (SVG / TEXT / TODO).

  build --lesson 68 [--debug-grid]
  build --svg work/vocab-art/svg/68/fever.svg [--debug-grid]
  build --all [--showcase] [--debug-grid]
      Lint SVG source(s), supersample-render at 1216x768 via resvg_py, downsample
      with Lanczos to 608x384 WebP (<= 80 KB), register in src/web/vocabularyCourseArt.json,
      and generate visual QA contact sheets in work/vocab-art/review/.

  mark-text --reason FUNCTION "75:furthermore" "75:on the other hand"
  mark-text --from-triage --lesson 75
      Register unpicturable vocabulary entries in src/web/vocabularyCourseArt.json["textOnly"]
      so legacy Mulberry/OpenAI fallback images are cleanly suppressed.

  status
      Print course-wide progress across all 76 lessons (3,950 entries) by batch.
"""
from __future__ import annotations

import argparse
import io
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from PIL import Image, ImageDraw, ImageFont
import resvg_py

ROOT = Path(__file__).resolve().parents[1]
INVENTORY_PATH = ROOT / "work/vocab-art/inventory.json"
ORGANIZED_PATH = ROOT / "src/web/vocabularyOrganized.json"
COURSE_ART_PATH = ROOT / "src/web/vocabularyCourseArt.json"
SVG_ROOT = ROOT / "work/vocab-art/svg"
PUBLIC_COURSE_DIR = ROOT / "public/vocabulary-course"
REVIEW_DIR = ROOT / "work/vocab-art/review"
TRIAGE_DIR = ROOT / "work/vocab-art/triage"

CANONICAL_VIEWBOX = "0 0 304 192"
RENDER_W, RENDER_H = 1216, 768   # 4x supersampling of 304x192
TARGET_W, TARGET_H = 608, 384    # 2x retina card resolution (152:96)
MAX_WEBP_BYTES = 80 * 1024
ALLOWED_TEXT_REASONS = {"ABSTRACT", "FUNCTION", "IDIOM", "SENSE", "SENSITIVE"}

BANNED_TAGS = {"text", "tspan", "image", "foreignObject", "script"}
VISIBLE_SHAPE_TAGS = {"path", "rect", "circle", "ellipse", "polygon", "polyline", "line", "use"}
BANNED_RAW_COLORS = {
    "#000", "#000000", "black",
    "#ff0000", "#f00", "red",
    "#00ff00", "#0f0", "lime",
    "#0000ff", "#00f", "blue",
    "#ffff00", "#ff0", "yellow",
    "#ff00ff", "#f0f", "magenta", "fuchsia",
    "#00ffff", "#0ff", "cyan", "aqua",
}

BATCH_GROUPS = [
    ("Batch 1 (Pilot)", [19, 29, 54, 15]),
    ("Batch 2 (Concrete Objects)", [9, 10, 12, 16, 22, 28, 30, 31, 37, 55, 56, 57, 62, 74]),
    ("Batch 3 (Body & Health)", [14, 17, 68, 69, 70, 71]),
    ("Batch 4 (Daily Life & Town)", [4, 11, 32, 33, 72, 73]),
    ("Batch 5 (Travel & Weather)", [44, 45, 46, 47, 48, 49, 50, 51, 52]),
    ("Batch 6 (Work & Career)", [34, 35, 36, 38, 39, 40, 42, 43]),
    ("Batch 7 (People, Ed & Media)", [13, 18, 20, 21, 23, 24, 25, 26, 27]),
    ("Batch 8 (Free Time & Sports)", [58, 59, 60, 61, 63, 64, 65, 66, 67]),
    ("Batch 9 (Abstract & Idioms)", [3, 5, 6, 7, 8, 41, 53, 75, 76, 77, 78]),
]

FONT_PATHS = [
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
]


def get_font(size: int) -> ImageFont.FreeTypeFont:
    for fp in FONT_PATHS:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                pass
    return ImageFont.load_default()


def slugify_term(term: str) -> str:
    base = term.split(" / ")[0].strip().lower()
    base = re.sub(r"\([^)]*\)", "", base).strip()
    slug = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return slug or "item"


def load_inventory() -> Tuple[List[dict], Dict[str, dict]]:
    if not INVENTORY_PATH.exists():
        raise FileNotFoundError(
            f"Missing {INVENTORY_PATH}. Run `node scripts/vocab_art_inventory.mjs` first."
        )
    items = json.loads(INVENTORY_PATH.read_text(encoding="utf-8"))
    by_key = {item["key"]: item for item in items}
    return items, by_key


def load_course_art() -> dict:
    if COURSE_ART_PATH.exists():
        data = json.loads(COURSE_ART_PATH.read_text(encoding="utf-8"))
    else:
        data = {"schema": 1, "style": "artico-editorial-svg-v1", "entries": {}, "textOnly": {}}
    data.setdefault("schema", 1)
    data["style"] = "artico-editorial-svg-v1"
    data.setdefault("entries", {})
    data.setdefault("textOnly", {})
    return data


def save_course_art(data: dict) -> None:
    def sort_key(k: str) -> Tuple[int, str]:
        lesson_str, rest = k.split(":", 1)
        return (int(lesson_str), rest)

    ordered = {
        "schema": 1,
        "style": data.get("style", "artico-editorial-svg-v1"),
        "entries": {k: data["entries"][k] for k in sorted(data["entries"], key=sort_key)},
        "textOnly": {k: data["textOnly"][k] for k in sorted(data["textOnly"], key=sort_key)},
    }
    COURSE_ART_PATH.write_text(
        json.dumps(ordered, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def local_tag(tag: str) -> str:
    return tag.split("}", 1)[-1] if "}" in tag else tag


def extract_style_colors(elem: ET.Element) -> List[str]:
    colors = []
    for attr in ("fill", "stroke", "stop-color"):
        val = elem.attrib.get(attr)
        if val:
            colors.append(val.strip().lower())
    style = elem.attrib.get("style", "")
    for m in re.finditer(r"(?:fill|stroke|stop-color)\s*:\s*([^;]+)", style, flags=re.I):
        colors.append(m.group(1).strip().lower())
    return colors


def lint_svg(svg_path: Path, valid_keys: Dict[str, dict]) -> Tuple[str, List[str], List[str]]:
    """Validate SVG XML, Studio Rules, vocabulary key, and constructive richness.

    Returns (vocab_key, errors, warnings).
    """
    errors: List[str] = []
    warnings: List[str] = []

    raw = svg_path.read_text(encoding="utf-8")
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        return "", [f"XML syntax error in {svg_path.name}: {exc}"], []

    if local_tag(root.tag) != "svg":
        errors.append(f"Root element must be <svg>, got <{local_tag(root.tag)}>")

    viewbox = root.attrib.get("viewBox", "").strip()
    if viewbox != CANONICAL_VIEWBOX:
        errors.append(f"viewBox must be '{CANONICAL_VIEWBOX}', got '{viewbox}'")

    vocab_key = root.attrib.get("data-vocab-key", "").strip()
    if not vocab_key:
        errors.append(
            "Missing required root attribute data-vocab-key=\"<lesson>:<term>\" on <svg>"
        )
    elif vocab_key not in valid_keys:
        lesson_prefix = vocab_key.split(":", 1)[0] if ":" in vocab_key else ""
        candidates = [
            k for k in valid_keys
            if k.startswith(f"{lesson_prefix}:") and vocab_key.split(":", 1)[-1] in k
        ][:4]
        hint = f" Closest keys in lesson {lesson_prefix}: {candidates}" if candidates else ""
        errors.append(f"data-vocab-key '{vocab_key}' is not in vocabularyOrganized.json.{hint}")
    else:
        lesson_num = int(vocab_key.split(":", 1)[0])
        expected_folder = f"{lesson_num:02d}"
        if svg_path.parent.name != expected_folder:
            errors.append(
                f"Folder mismatch: key '{vocab_key}' belongs in svg/{expected_folder}/, "
                f"found in svg/{svg_path.parent.name}/"
            )

    inside_defs = False
    visible_shapes = 0
    path_count = 0

    def walk(node: ET.Element, in_defs: bool) -> None:
        nonlocal visible_shapes, path_count
        tag = local_tag(node.tag)
        if tag in BANNED_TAGS:
            errors.append(
                f"Banned <{tag}> element detected. Never put text, fonts, or raster images in vocabulary SVGs."
            )

        now_in_defs = in_defs or tag in {"defs", "clipPath", "mask", "pattern", "linearGradient", "radialGradient"}

        for c in extract_style_colors(node):
            if c in BANNED_RAW_COLORS:
                errors.append(
                    f"Banned raw color '{c}' on <{tag}>. Use Artico Slate Ink (#1E2A3B) and studio palette tokens."
                )

        if not now_in_defs and tag in VISIBLE_SHAPE_TAGS:
            is_bg_rect = (
                tag == "rect"
                and node.attrib.get("width") in {"304", "100%"}
                and node.attrib.get("height") in {"192", "100%"}
            )
            if not is_bg_rect:
                visible_shapes += 1
                if tag == "path":
                    path_count += 1

        for child in list(node):
            walk(child, now_in_defs)

    walk(root, inside_defs)

    if visible_shapes < 6:
        errors.append(
            f"Too few constructive shapes ({visible_shapes} found, minimum 6). "
            "Avoid simplistic 3-primitive stick drawings; build layered silhouettes, shading, and details."
        )
    if path_count < 2:
        errors.append(
            f"Too few <path> elements ({path_count} found, minimum 2). "
            "Use expressive Bezier <path> contours rather than raw boxes and circles alone."
        )

    return vocab_key, errors, warnings


def measure_framing(img: Image.Image) -> Tuple[float, Optional[Tuple[int, int, int, int]], List[str]]:
    """Measure non-background subject occupancy and check for accidental edge clipping."""
    warnings: List[str] = []
    w, h = img.size
    px = img.load()
    # Sample top-left & top-right corners to estimate base canvas paper color
    c1 = px[4, 4]
    c2 = px[w - 5, 4]
    bg = ((c1[0] + c2[0]) // 2, (c1[1] + c2[1]) // 2, (c1[2] + c2[2]) // 2)

    fg_pixels = 0
    dark_edge_pixels = 0
    min_x, min_y, max_x, max_y = w, h, -1, -1

    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y]
            diff = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            if diff > 16:
                fg_pixels += 1
                if x < min_x:
                    min_x = x
                if x > max_x:
                    max_x = x
                if y < min_y:
                    min_y = y
                if y > max_y:
                    max_y = y
            # Detect dark ink lines (#1E2A3B has luma ~42) touching top/left/right outer 4px border
            if (r + g + b) < 240 and (y < 6 or x < 6 or x >= w - 6):
                dark_edge_pixels += 1

    sampled_total = (w // 2) * (h // 2)
    ratio = fg_pixels / max(1, sampled_total)
    bbox = (min_x, min_y, max_x, max_y) if max_x >= min_x else None

    if ratio < 0.08:
        warnings.append(
            f"Low visual occupancy ({ratio:.1%}). Scale the hero subject to fill ~55-72% of the frame."
        )
    if dark_edge_pixels > 18:
        warnings.append(
            "Dark ink strokes touch the top/left/right outer 6px edge (risk of CSS object-fit crop)."
        )

    return ratio, bbox, warnings


def compile_single_svg(svg_path: Path, valid_keys: Dict[str, dict]) -> dict:
    vocab_key, errors, warnings = lint_svg(svg_path, valid_keys)
    if errors:
        return {"svg_path": svg_path, "key": vocab_key, "ok": False, "errors": errors, "warnings": warnings}

    raw_svg = svg_path.read_text(encoding="utf-8")
    try:
        png_bytes = resvg_py.svg_to_bytes(svg_string=raw_svg, width=RENDER_W, height=RENDER_H)
    except Exception as exc:
        return {
            "svg_path": svg_path,
            "key": vocab_key,
            "ok": False,
            "errors": [f"resvg_py render failed: {exc}"],
            "warnings": warnings,
        }

    with Image.open(io.BytesIO(png_bytes)) as rendered:
        rgba = rendered.convert("RGBA")
        paper = Image.new("RGBA", rgba.size, (250, 248, 243, 255))  # #FAF8F3 fallback
        composited = Image.alpha_composite(paper, rgba).convert("RGB")
        card_img = composited.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

    ratio, bbox, frame_warnings = measure_framing(card_img)
    warnings.extend(frame_warnings)
    if ratio < 0.035:
        return {
            "svg_path": svg_path,
            "key": vocab_key,
            "ok": False,
            "errors": [f"Rendered image is nearly blank (occupancy {ratio:.1%})."],
            "warnings": warnings,
        }

    lesson_num = int(vocab_key.split(":", 1)[0])
    rel_slug = f"{lesson_num:02d}/{svg_path.stem}"
    out_webp = PUBLIC_COURSE_DIR / f"{rel_slug}.webp"
    out_webp.parent.mkdir(parents=True, exist_ok=True)

    webp_bytes = b""
    for quality in (90, 84, 78, 70):
        buf = io.BytesIO()
        card_img.save(buf, format="WEBP", quality=quality, method=6)
        webp_bytes = buf.getvalue()
        if len(webp_bytes) <= MAX_WEBP_BYTES:
            break

    if len(webp_bytes) > MAX_WEBP_BYTES:
        return {
            "svg_path": svg_path,
            "key": vocab_key,
            "ok": False,
            "errors": [f"Encoded WebP exceeds 80 KB ({len(webp_bytes)} B)."],
            "warnings": warnings,
        }

    out_webp.write_bytes(webp_bytes)
    return {
        "svg_path": svg_path,
        "webp_path": out_webp,
        "key": vocab_key,
        "rel_slug": rel_slug,
        "bytes": len(webp_bytes),
        "occupancy": ratio,
        "ok": True,
        "errors": [],
        "warnings": warnings,
    }


def draw_debug_grid(tile: Image.Image) -> Image.Image:
    """Overlay a subtle 304x192 SVG-coordinate ruler and [24,16]-[280,176] safe-zone box."""
    overlay = tile.convert("RGBA")
    grid = Image.new("RGBA", overlay.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(grid)
    w, h = overlay.size
    sx = w / 304.0
    sy = h / 192.0
    tiny_font = get_font(9)

    for gx in (40, 80, 120, 152, 184, 224, 264):
        px = int(round(gx * sx))
        col = (74, 114, 178, 85) if gx == 152 else (30, 42, 59, 42)
        d.line([(px, 0), (px, h)], fill=col, width=1)
        d.text((px + 2, 2), str(gx), font=tiny_font, fill=(30, 42, 59, 145))

    for gy in (32, 64, 96, 128, 160):
        py = int(round(gy * sy))
        col = (74, 114, 178, 85) if gy == 96 else (30, 42, 59, 42)
        d.line([(0, py), (w, py)], fill=col, width=1)
        d.text((2, py + 1), str(gy), font=tiny_font, fill=(30, 42, 59, 145))

    # Safe zone [24, 16] -> [280, 176]
    d.rectangle(
        [int(24 * sx), int(16 * sy), int(280 * sx), int(176 * sy)],
        outline=(217, 119, 6, 120),
        width=1,
    )
    return Image.alpha_composite(overlay, grid).convert("RGB")


def render_contact_sheet(
    items: List[dict],
    course_art: dict,
    title: str,
    out_path: Path,
    debug_grid: bool = False,
    cols: int = 4,
) -> None:
    """Render high-clarity contact sheet PNG for multimodal visual QA via read_file."""
    card_w, card_h = 304, 192  # Exact 1:1 with SVG viewBox 304x192!
    cell_w = card_w + 20
    cell_h = card_h + 76
    pad = 16
    header_h = 54

    cols = min(cols, max(1, len(items)))
    rows = (len(items) + cols - 1) // cols
    total_w = pad + cols * (cell_w + pad)
    total_h = header_h + rows * (cell_h + pad) + pad

    canvas = Image.new("RGB", (total_w, total_h), (246, 244, 238))
    draw = ImageDraw.Draw(canvas)

    f_title = get_font(19)
    f_term = get_font(14)
    f_ja = get_font(12)
    f_meta = get_font(11)

    draw.text((pad, 15), title, font=f_title, fill=(30, 42, 59))

    entries = course_art.get("entries", {})
    text_only = course_art.get("textOnly", {})

    for idx, item in enumerate(items):
        r, c = divmod(idx, cols)
        x = pad + c * (cell_w + pad)
        y = header_h + r * (cell_h + pad)
        key = item["key"]
        slug = entries.get(key)
        t_reason = text_only.get(key)

        draw.rounded_rectangle(
            [x, y, x + cell_w, y + cell_h],
            radius=10,
            fill=(255, 255, 255),
            outline=(218, 225, 235),
            width=1,
        )

        ix, iy = x + 10, y + 10
        if slug and (PUBLIC_COURSE_DIR / f"{slug}.webp").exists():
            with Image.open(PUBLIC_COURSE_DIR / f"{slug}.webp") as im:
                tile = im.convert("RGB").resize((card_w, card_h), Image.Resampling.LANCZOS)
                if debug_grid:
                    tile = draw_debug_grid(tile)
                canvas.paste(tile, (ix, iy))
            draw.rounded_rectangle(
                [ix, iy, ix + card_w, iy + card_h],
                radius=6,
                outline=(226, 232, 240),
                width=1,
            )
            badge, badge_col = "SVG OK", (22, 128, 60)
        elif t_reason:
            draw.rounded_rectangle(
                [ix, iy, ix + card_w, iy + card_h],
                radius=6,
                fill=(241, 245, 249),
                outline=(203, 213, 225),
                width=1,
            )
            draw.text((ix + 22, iy + 70), f"TEXT-ONLY ({t_reason})", font=f_term, fill=(71, 85, 105))
            draw.text((ix + 22, iy + 96), "Legacy fallback suppressed", font=f_meta, fill=(100, 116, 139))
            badge, badge_col = f"TXT:{t_reason}", (71, 85, 105)
        else:
            draw.rounded_rectangle(
                [ix, iy, ix + card_w, iy + card_h],
                radius=6,
                fill=(254, 242, 242),
                outline=(252, 165, 165),
                width=1,
            )
            draw.text((ix + 22, iy + 82), "TODO — UNCOVERED", font=f_term, fill=(185, 28, 28))
            badge, badge_col = "TODO", (185, 28, 28)

        ty = iy + card_h + 8
        term_str = item["term"] if len(item["term"]) <= 30 else item["term"][:29] + "…"
        ja_str = (item.get("ja") or "")[:26]
        grp_str = (item.get("group") or "")[:28]

        draw.text((ix, ty), term_str, font=f_term, fill=(30, 42, 59))
        draw.text((ix, ty + 20), ja_str, font=f_ja, fill=(74, 114, 178))
        draw.text((ix, ty + 39), f"[{item['key'].split(':')[0]}] {grp_str}", font=f_meta, fill=(120, 130, 145))
        draw.text((ix + card_w - 72, ty + 39), badge, font=f_meta, fill=badge_col)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out_path, format="PNG", optimize=True)
    print(f"Saved contact sheet -> {out_path} ({len(items)} cards, {total_w}x{total_h}px)")


def cmd_plan(args: argparse.Namespace) -> int:
    inventory, _ = load_inventory()
    course_art = load_course_art()
    lesson_items = [it for it in inventory if it["lesson"] == args.lesson]
    if not lesson_items:
        print(f"No vocabulary entries found for lesson {args.lesson}.", file=sys.stderr)
        return 1

    entries = course_art["entries"]
    text_only = course_art["textOnly"]
    svg_done = sum(1 for it in lesson_items if it["key"] in entries)
    txt_done = sum(1 for it in lesson_items if it["key"] in text_only)
    todo = len(lesson_items) - svg_done - txt_done

    print(f"# Lesson {args.lesson:02d}: {lesson_items[0]['lessonTitle']}")
    print(f"Total: {len(lesson_items)} | SVG: {svg_done} | TEXT_ONLY: {txt_done} | TODO: {todo}\n")

    current_group = None
    for it in lesson_items:
        if it["group"] != current_group:
            current_group = it["group"]
            print(f"\n## Group: {current_group}")
        key = it["key"]
        sug_slug = slugify_term(it["term"])
        if key in entries:
            st = f"SVG ({entries[key]}.webp)"
        elif key in text_only:
            st = f"TEXT_ONLY ({text_only[key]})"
        else:
            st = f"TODO -> work/vocab-art/svg/{args.lesson:02d}/{sug_slug}.svg"
        print(f"- `{key}` | JA: `{it['ja']}` | {st}")
    return 0


def cmd_build(args: argparse.Namespace) -> int:
    inventory, valid_keys = load_inventory()
    course_art = load_course_art()

    svg_files: List[Path] = []
    if args.svg:
        p = Path(args.svg)
        if not p.is_absolute():
            p = (ROOT / p).resolve()
        svg_files = [p]
    elif args.lesson:
        folder = SVG_ROOT / f"{args.lesson:02d}"
        if folder.exists():
            svg_files = sorted(folder.glob("*.svg"))
        if not svg_files:
            print(f"No .svg files found in {folder}", file=sys.stderr)
            return 1
    elif args.all:
        svg_files = sorted(SVG_ROOT.glob("*/*.svg"))
        if not svg_files:
            print(f"No .svg files found under {SVG_ROOT}", file=sys.stderr)
            return 1
    else:
        print("Specify --lesson NN, --svg <path>, or --all", file=sys.stderr)
        return 1

    results = [compile_single_svg(f, valid_keys) for f in svg_files]
    failed = [r for r in results if not r["ok"]]

    for r in results:
        rel = r["svg_path"].relative_to(ROOT)
        if r["ok"]:
            course_art["entries"][r["key"]] = r["rel_slug"]
            course_art["textOnly"].pop(r["key"], None)
            warn_str = f" [WARN: {'; '.join(r['warnings'])}]" if r["warnings"] else ""
            print(
                f"OK   {r['key']:28s} -> {r['rel_slug']}.webp "
                f"({r['bytes'] / 1024:.1f} KB, occ {r['occupancy']:.0%}){warn_str}"
            )
        else:
            print(f"FAIL {rel}:", file=sys.stderr)
            for err in r["errors"]:
                print(f"     - {err}", file=sys.stderr)

    if failed:
        print(f"\nBuild failed on {len(failed)}/{len(results)} SVG file(s). Fix lint errors above.", file=sys.stderr)
        return 1

    save_course_art(course_art)

    if args.lesson:
        lesson_items = [it for it in inventory if it["lesson"] == args.lesson]
        suffix = "-grid" if args.debug_grid else ""
        out_sheet = REVIEW_DIR / f"lesson-{args.lesson:02d}{suffix}.png"
        render_contact_sheet(
            lesson_items,
            course_art,
            f"Lesson {args.lesson:02d}: {lesson_items[0]['lessonTitle']}" + (" [DEBUG GRID]" if args.debug_grid else ""),
            out_sheet,
            debug_grid=args.debug_grid,
            cols=4,
        )
    elif args.showcase or (args.all and len(results) <= 40):
        built_keys = [r["key"] for r in results]
        showcase_items = [valid_keys[k] for k in built_keys]
        suffix = "-grid" if args.debug_grid else ""
        out_sheet = REVIEW_DIR / f"gold-showcase{suffix}.png"
        render_contact_sheet(
            showcase_items,
            course_art,
            "Artico Editorial SVG Gold Showcase" + (" [304x192 DEBUG GRID]" if args.debug_grid else ""),
            out_sheet,
            debug_grid=args.debug_grid,
            cols=4,
        )

    return 0


def cmd_mark_text(args: argparse.Namespace) -> int:
    _, valid_keys = load_inventory()
    course_art = load_course_art()
    updates: List[Tuple[str, str]] = []

    if args.from_triage:
        if not args.lesson:
            print("--from-triage requires --lesson NN", file=sys.stderr)
            return 1
        triage_file = TRIAGE_DIR / f"lesson-{args.lesson:02d}.json"
        if not triage_file.exists():
            print(f"Missing triage file {triage_file}", file=sys.stderr)
            return 1
        records = json.loads(triage_file.read_text(encoding="utf-8"))
        for rec in records:
            if rec.get("treatment") == "TEXT":
                updates.append((rec["key"], rec.get("reason", "ABSTRACT")))
    else:
        if not args.reason or args.reason not in ALLOWED_TEXT_REASONS:
            print(f"--reason must be one of {sorted(ALLOWED_TEXT_REASONS)}", file=sys.stderr)
            return 1
        for k in args.keys:
            updates.append((k.strip(), args.reason))

    for key, reason in updates:
        if key not in valid_keys:
            print(f"Invalid vocabulary key: '{key}'", file=sys.stderr)
            return 1
        if reason not in ALLOWED_TEXT_REASONS:
            print(f"Invalid TEXT_ONLY reason '{reason}' for {key}", file=sys.stderr)
            return 1
        old_slug = course_art["entries"].pop(key, None)
        if old_slug:
            webp = PUBLIC_COURSE_DIR / f"{old_slug}.webp"
            if webp.exists():
                webp.unlink()
        course_art["textOnly"][key] = reason
        print(f"TEXT_ONLY  {key} -> {reason}")

    save_course_art(course_art)
    return 0


def cmd_status(_args: argparse.Namespace) -> int:
    inventory, _ = load_inventory()
    course_art = load_course_art()
    entries = course_art["entries"]
    text_only = course_art["textOnly"]

    total = len(inventory)
    svg_n = sum(1 for it in inventory if it["key"] in entries)
    txt_n = sum(1 for it in inventory if it["key"] in text_only)
    todo_n = total - svg_n - txt_n

    print(f"=== Artico Vocabulary SVG Course Status ===")
    print(f"Total entries (Lessons 3-78): {total}")
    print(f"  Illustrated (SVG -> WebP):  {svg_n:4d} ({svg_n / total:.1%})")
    print(f"  Intentional TEXT_ONLY:      {txt_n:4d} ({txt_n / total:.1%})")
    print(f"  Remaining TODO:             {todo_n:4d} ({todo_n / total:.1%})\n")

    for label, lessons in BATCH_GROUPS:
        b_items = [it for it in inventory if it["lesson"] in lessons]
        b_svg = sum(1 for it in b_items if it["key"] in entries)
        b_txt = sum(1 for it in b_items if it["key"] in text_only)
        b_todo = len(b_items) - b_svg - b_txt
        done_pct = (b_svg + b_txt) / max(1, len(b_items))
        print(
            f"{label:30s} | Lessons {str(lessons):46s} | "
            f"{b_svg:3d} SVG + {b_txt:3d} TXT / {len(b_items):3d} ({done_pct:5.1%}) | TODO: {b_todo:3d}"
        )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Artico SVG Vocabulary Compiler & QA")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_plan = sub.add_parser("plan", help="Inspect all entries & status for a lesson")
    p_plan.add_argument("--lesson", type=int, required=True)
    p_plan.set_defaults(func=cmd_plan)

    p_build = sub.add_parser("build", help="Lint & compile SVGs into 608x384 WebP + contact sheet")
    p_build.add_argument("--lesson", type=int, help="Compile all SVGs in work/vocab-art/svg/<NN>/")
    p_build.add_argument("--svg", type=str, help="Compile a single SVG file")
    p_build.add_argument("--all", action="store_true", help="Compile all SVGs under work/vocab-art/svg/")
    p_build.add_argument("--showcase", action="store_true", help="Render gold-showcase.png contact sheet")
    p_build.add_argument("--debug-grid", action="store_true", help="Overlay 304x192 coordinate ruler on contact sheet")
    p_build.set_defaults(func=cmd_build)

    p_text = sub.add_parser("mark-text", help="Mark entries as intentional TEXT_ONLY")
    p_text.add_argument("--reason", type=str, help="ABSTRACT | FUNCTION | IDIOM | SENSE | SENSITIVE")
    p_text.add_argument("--from-triage", action="store_true", help="Import TEXT entries from work/vocab-art/triage/lesson-NN.json")
    p_text.add_argument("--lesson", type=int, help="Lesson number for --from-triage")
    p_text.add_argument("keys", nargs="*", help="Vocabulary keys like '75:furthermore'")
    p_text.set_defaults(func=cmd_mark_text)

    p_status = sub.add_parser("status", help="Show course-wide batch progress")
    p_status.set_defaults(func=cmd_status)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
