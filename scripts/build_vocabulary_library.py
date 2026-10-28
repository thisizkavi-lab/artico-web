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



def build_openmoji():
    """Fetch only pinned CC BY-SA OpenMoji SVGs used for concrete terms."""
    from concurrent.futures import ThreadPoolExecutor
    from urllib.request import Request, urlopen
    from PIL import Image
    import cairosvg

    manifest = json.loads((ROOT / "src/web/vocabularyOpenmojiManifest.json").read_text(encoding="utf-8"))
    if manifest["license"] != "CC-BY-SA-4.0":
        raise RuntimeError("Unreviewed OpenMoji license")
    codes = sorted(set(manifest["entries"].values()))
    if not all(len(code) <= 30 and all(ch in "0123456789ABCDEF-" for ch in code) for code in codes):
        raise RuntimeError("Unsafe OpenMoji codepoint path")
    output = ROOT / "public/vocabulary-symbols/openmoji"
    output.mkdir(parents=True, exist_ok=True)
    pending = [code for code in codes if not (output / (code + ".png")).is_file()]
    print(f"OpenMoji: {len(codes) - len(pending)} cached, {len(pending)} to render")

    def generate(code):
        target = output / (code + ".png")
        url = ("https://raw.githubusercontent.com/hfg-gmuend/openmoji/"
               + manifest["sourceCommit"] + "/color/svg/" + code + ".svg")
        last_error = None
        for attempt in range(3):
            try:
                req = Request(url, headers={"User-Agent": "ArticoVocabularyBuilder/1.0"})
                with urlopen(req, timeout=30) as response:
                    svg = response.read()
                if b"<svg" not in svg[:2500]:
                    raise ValueError("Expected SVG source")
                png = cairosvg.svg2png(bytestring=svg, output_width=320)
                picture = Image.open(io.BytesIO(png)).convert("RGBA")
                picture.thumbnail((320, 220), Image.Resampling.LANCZOS)
                picture.quantize(colors=160, method=Image.Quantize.FASTOCTREE).save(target, "PNG", optimize=True)
                if target.stat().st_size < 100:
                    raise ValueError("Output PNG too small")
                return code, None
            except Exception as exc:
                target.unlink(missing_ok=True)
                last_error = str(exc)
        return code, last_error

    with ThreadPoolExecutor(max_workers=8) as pool:
        failures = [f"{code}: {err}" for code, err in pool.map(generate, pending) if err]
    if failures:
        raise RuntimeError("OpenMoji generation failed: " + " | ".join(failures[:12]))
    print(f"Verified {len(codes)} local OpenMoji PNGs for {len(manifest['entries'])} vocabulary entries")


if __name__ == "__main__":
    try:
        build()
        build_openmoji()
    except Exception as exc:
        print("ERROR:", exc, file=sys.stderr)
        sys.exit(1)
