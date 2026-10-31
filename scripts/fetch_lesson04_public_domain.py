#!/usr/bin/env python3
"""Install original AI illustrations and verify licensed Pexels photos for Lesson 04.

The source catalog contains the photographer's original photo-page URL, the
Pexels asset ID, the matching headword and the intended visual meaning.
Images are served locally by Artico; no external runtime hotlinks.
"""
import io
import json
import hashlib
import zipfile
import pathlib
import time
import urllib.error
import urllib.request
from PIL import Image, ImageOps, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
catalog = json.loads((root / "src/web/vocabularyDailyRoutineSources.json").read_text(encoding="utf-8"))
target = root / "public/vocabulary-curated-04"
target.mkdir(parents=True, exist_ok=True)
# The ten approved illustrated Meal & Drinks scenes are packaged as a binary
# archive in the repository. Hydrate them before validating the original
# artwork or fetching unrelated Pexels photographs.
art_archive = target / "generated-meals-hd.zip"
expected_hash = "6c38991a42f3911999693cee7da36483a5fee00a1ee9af6ccea905478710777c"
if not art_archive.is_file() or hashlib.sha256(art_archive.read_bytes()).hexdigest() != expected_hash:
    raise RuntimeError("Generated meals archive is missing or its contents changed")
meal_scenes = {
    e["file"] + ".webp"
    for e in catalog["entries"].values()
    if e.get("assetType") == "original-ai-generated" and e.get("section", "").startswith("02") and e.get("illustrationBatch") != "work-02"
}
assert len(meal_scenes) == 10, meal_scenes
with zipfile.ZipFile(art_archive) as z:
    assert set(z.namelist()) == meal_scenes, "Generated image assets do not match the manifest"
    for name in sorted(meal_scenes):
        image_bytes = z.read(name)
        with Image.open(io.BytesIO(image_bytes)) as asset:
            asset.verify()
        with Image.open(io.BytesIO(image_bytes)) as asset:
            assert asset.format == "WEBP" and asset.size == (608, 384), (name, asset.size, asset.format)
        (target / name).write_bytes(image_bytes)
        assert len(image_bytes) > 4000, name
print("Installed and validated", len(meal_scenes), "original Artico meal illustrations")

# Second approved batch: ten original Artico action/object scenes from
# 'leave work' through 'buy groceries'. Extract before normal card validation.
work_archive = target / "generated-work-errands-hd.zip"
work_expected_hash = "812a448dfa427a573b22b97cb213f0527f2aaaa92031028312dfe04637270d39"
if not work_archive.is_file() or hashlib.sha256(work_archive.read_bytes()).hexdigest() != work_expected_hash:
    raise RuntimeError("Generated Work/School/Home illustrations archive missing or corrupt")
work_terms = ["leave work","work from home","overtime","school","do homework","homework","have a break","leave the house","go home","buy groceries"]
work_scenes = {catalog["entries"][term]["file"] + ".webp" for term in work_terms}
assert len(work_scenes) == 10
with zipfile.ZipFile(work_archive) as z:
    bundle_manifest = json.loads(z.read("manifest.json"))
    assert bundle_manifest["terms"] == work_terms
    assert set(z.namelist()) == work_scenes | {"manifest.json"}, "Unexpected names in Work/School/Home archive"
    for name in sorted(work_scenes):
        image_bytes = z.read(name)
        with Image.open(io.BytesIO(image_bytes)) as scene:
            scene.verify()
        with Image.open(io.BytesIO(image_bytes)) as scene:
            assert scene.format == "WEBP" and scene.size == (608, 384), (name,scene.size,scene.format)
        assert len(image_bytes)>4000,(name,len(image_bytes))
        (target / name).write_bytes(image_bytes)
print("Installed and validated", len(work_scenes), "original Artico Work/School/Home illustrations")


# Batch 02: tea/coffee + nine Work/School/Commuting scenes. All are
# 608x384, full landscape illustrations in the same art direction.
work_archive = target / "generated-work-02.zip"
work_sha256 = "a8e9191a852e2c10fcd0aa31ac2433b7b7ca893c3da4958668b82a32f443b5ce"
if not work_archive.is_file() or hashlib.sha256(work_archive.read_bytes()).hexdigest() != work_sha256:
    raise RuntimeError("Generated work-and-commute archive missing or SHA256 mismatch")
work_scenes = {
    e["file"] + ".webp"
    for e in catalog["entries"].values()
    if e.get("illustrationBatch") == "work-02"
}
assert len(work_scenes) == 10, work_scenes
assert "drink-tea-or-coffee.webp" in work_scenes
assert "finish-work.webp" in work_scenes
with zipfile.ZipFile(work_archive) as z:
    assert set(z.namelist()) == work_scenes, "Wrong files in generated-work-02.zip"
    for name in sorted(work_scenes):
        image_bytes = z.read(name)
        with Image.open(io.BytesIO(image_bytes)) as image:
            image.verify()
        with Image.open(io.BytesIO(image_bytes)) as image:
            assert image.format == "WEBP" and image.size == (608, 384), (name, image.size)
        assert len(image_bytes) > 4000, name
        (target / name).write_bytes(image_bytes)
print("Installed and validated", len(work_scenes), "Artico drink/work/commute illustrations")

assert catalog["schema"] == 2 and catalog["source"].startswith("Pexels")
assert len(catalog["entries"]) >= 58, "Photo catalog is incomplete"
pexels_entries = [v for v in catalog["entries"].values() if v.get("assetType") != "original-ai-generated"]
assert len({v["pexelsId"] for v in pexels_entries}) == len(pexels_entries), "Repeated Pexels photo for distinct words"
for term, item in catalog["entries"].items():
    p = target / (item["file"] + ".webp")
    assert "/" not in item["file"] and ".." not in item["file"]
    if item.get("assetType") == "original-ai-generated":
        # Original generated scene is committed to GitHub as a binary asset.
        # Never fetch it from Pexels or misattribute it to a photographer.
        if not p.is_file() or p.stat().st_size < 4000:
            raise RuntimeError(f"Original generated image missing from repository: {term}")
        with Image.open(p) as generated:
            generated.verify()
        print(f"Verified original generated scene: {term}")
        continue
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
            # Landscape cards always have a 608:384 horizontal frame.
            # Crop genuinely horizontal source photos edge-to-edge. For very
            # tall portraits, retain the full subject against a soft
            # photographic backdrop to avoid cutting off the taught action.
            size = (608, 384)
            ratio = image.width / image.height
            crop_focus = (float(item.get("focusX", .5)), float(item.get("focusY", .5)))
            if ratio >= 1.08 or item.get("fitMode") == "cover":
                output = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=crop_focus)
            else:
                backdrop = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)
                backdrop = backdrop.filter(ImageFilter.GaussianBlur(18)).convert("RGBA")
                white = Image.new("RGBA", size, (250, 248, 245, 100))
                backdrop.alpha_composite(white)
                foreground = ImageOps.contain(image, size, method=Image.Resampling.LANCZOS)
                offset = ((608 - foreground.width) // 2, (384 - foreground.height) // 2)
                backdrop.alpha_composite(foreground.convert("RGBA"), offset)
                output = backdrop.convert("RGB")
            output.save(p, "WEBP", quality=88, method=6)
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
print(f"Verified {len(catalog['entries'])} source-matched original scenes and real photographs")
