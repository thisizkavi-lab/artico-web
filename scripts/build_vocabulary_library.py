#!/usr/bin/env python3
"""Build local, optimized vocabulary art from the pinned CC BY-SA Mulberry source.

Run before the Vite build: python3 scripts/build_vocabulary_library.py
The website never requests these illustrations from third-party servers.
"""
import hashlib
import io
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / "src/web/vocabularyMulberryManifest.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "public/vocabulary-symbols/mulberry"
REPORT = ROOT / "reports/vocabulary-illustration-library-build.json"
SYMBOLS = sorted(set(MANIFEST["entries"].values()))
SAFE_EXT = ".svg"


def build():
    from PIL import Image
    import cairosvg

    if MANIFEST["license"] != "CC-BY-SA-4.0":
        raise RuntimeError("Refusing to build assets with unreviewed license")
    if not all(s.endswith(SAFE_EXT) and
               all(c.isalnum() or c in "_,-" for c in s[:-4])
               for s in SYMBOLS):
        raise RuntimeError("Unsafe source path in manifest")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    existing = [s for s in SYMBOLS if (OUTPUT / (s[:-4] + ".png")).is_file()]
    if len(existing) == len(SYMBOLS):
        print(f"Mulberry artwork cache verified: {len(existing)} local PNG files")
        return

    with tempfile.TemporaryDirectory(prefix="artico-mulberry-") as temp:
        upstream = Path(temp) / "source"
        subprocess.run(["git", "clone", "--quiet", "--depth", "1", "--branch",
                        MANIFEST["version"],
                        "https://github.com/mulberrysymbols/mulberry-symbols.git",
                        str(upstream)], check=True)
        actual = subprocess.check_output(["git", "-C", str(upstream),
                                          "rev-parse", "HEAD"], text=True).strip()
        if actual != MANIFEST["sourceCommit"]:
            raise RuntimeError("Upstream Mulberry version changed unexpectedly: " + actual)
        failures = []
        for number, symbol in enumerate(SYMBOLS, 1):
            target = OUTPUT / (symbol[:-4] + ".png")
            if target.exists():
                continue
            source = upstream / "EN" / symbol
            if not source.is_file():
                failures.append(f"missing: {symbol}")
                continue
            try:
                img_data = cairosvg.svg2png(url=str(source), output_width=320)
                picture = Image.open(io.BytesIO(img_data)).convert("RGBA")
                picture.thumbnail((320, 220), Image.Resampling.LANCZOS)
                # Quantize with adaptive palette and retain alpha where needed.
                palette = picture.quantize(colors=160, method=Image.Quantize.FASTOCTREE)
                palette.save(target, "PNG", optimize=True)
                if target.stat().st_size < 100:
                    raise ValueError("Empty PNG")
            except Exception as exc:
                target.unlink(missing_ok=True)
                failures.append(f"{symbol}: {exc}")
            if number % 100 == 0:
                print(f"Prepared {number}/{len(SYMBOLS)} Mulberry source symbols")
        if failures:
            raise RuntimeError("Library generation incomplete: " + " | ".join(failures[:20]))
    written = [s for s in SYMBOLS if (OUTPUT / (s[:-4] + ".png")).is_file()]
    REPORT.parent.mkdir(exist_ok=True, parents=True)
    REPORT.write_text(json.dumps({
        "library": MANIFEST["library"], "license": MANIFEST["license"],
        "sourceCommit": MANIFEST["sourceCommit"],
        "mapped_vocabulary_entries": len(MANIFEST["entries"]),
        "unique_source_images": len(SYMBOLS),
        "generated_png_files": len(written),
        "png_size_bytes": sum((OUTPUT / (s[:-4] + ".png")).stat().st_size for s in written),
    }, indent=2) + "\n", encoding="utf-8")
    if len(written) != len(SYMBOLS):
        raise RuntimeError("One or more images failed local-generation check")
    print(f"Verified {len(written)} local PNGs for {len(MANIFEST['entries'])} vocabulary entries")


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print("ERROR:", exc, file=sys.stderr)
        sys.exit(1)
