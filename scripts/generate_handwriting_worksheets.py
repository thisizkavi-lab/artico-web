"""Generate Artico's printable A4 handwriting collection for GitHub Pages.

Build-time only: the deployed site serves ordinary static PDFs. No user data,
backend, or third-party worksheet hosting is required.
"""
from __future__ import annotations
import math
import os
import random
import zipfile
from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from skimage.morphology import skeletonize

OUT = Path(__file__).resolve().parents[1] / "public" / "worksheets"
OUT.mkdir(parents=True, exist_ok=True)

def find_font(*paths):
    for value in paths:
        if Path(value).is_file():
            return value
    raise FileNotFoundError("Andika/Lato fonts not installed; see GitHub Actions setup")

HAND = find_font("/usr/share/fonts/truetype/andika/Andika-Regular.ttf",
                 "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
HAND_BOLD = find_font("/usr/share/fonts/truetype/andika/Andika-Bold.ttf",
                      "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
SANS = find_font("/usr/share/fonts/truetype/lato/Lato-Regular.ttf",
                 "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
SANS_BOLD = find_font("/usr/share/fonts/truetype/lato/Lato-Bold.ttf",
                      "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
for name, fontfile in (("Andika", HAND), ("AndikaBold", HAND_BOLD),
                       ("Lato", SANS), ("LatoBold", SANS_BOLD)):
    pdfmetrics.registerFont(TTFont(name, fontfile))

W, H = A4
INK = HexColor("#253c38")
MUTED = HexColor("#6a7977")
GREEN = HexColor("#386f67")
OUTER = HexColor("#8c9897")
INNER = HexColor("#a8bdc0")
TRACE = HexColor("#8f9da0")
LIGHT = HexColor("#e7eae8")
WORDS = {
    "A": ["apple", "ant", "airplane"], "B": ["ball", "bird", "banana"],
    "C": ["cat", "car", "cup"], "D": ["dog", "duck", "door"],
    "E": ["egg", "elephant", "ear"], "F": ["fish", "frog", "flower"],
    "G": ["goat", "grape", "guitar"], "H": ["hat", "house", "hand"],
    "I": ["igloo", "insect", "ink"], "J": ["jam", "jar", "juice"],
    "K": ["kite", "key", "king"], "L": ["lion", "leaf", "lamp"],
    "M": ["moon", "mouse", "milk"], "N": ["nest", "nose", "net"],
    "O": ["orange", "owl", "octopus"], "P": ["pen", "pig", "pizza"],
    "Q": ["queen", "quilt", "quiz"], "R": ["rabbit", "rain", "robot"],
    "S": ["sun", "sock", "star"], "T": ["tree", "tiger", "turtle"],
    "U": ["umbrella", "uncle", "up"], "V": ["van", "vase", "violin"],
    "W": ["whale", "window", "watch"], "X": ["x-ray", "xylophone", "box"],
    "Y": ["yak", "yo-yo", "yarn"], "Z": ["zebra", "zero", "zipper"],
}
FONT_SIZE = 520
font = ImageFont.truetype(HAND, FONT_SIZE)
ASCENDERS = set("bdfhklt")
DESCENDERS = set("gpqy")
TALL_DESCENDERS = {"j"}

@lru_cache(maxsize=100)
def skeleton_points(char):
    # Real tracing dots follow the CENTER of a letter stroke, not its outline.
    image = Image.new("L", (1000, 1000), 0)
    ImageDraw.Draw(image).text((210, 650), char, font=font, fill=255, anchor="ls")
    mask = skeletonize(np.array(image) > 80)
    iy, ix = np.nonzero(mask)
    if not len(ix):
        raise ValueError("Empty glyph " + char)
    return (np.column_stack((ix - ix.min(), iy - 650)).astype(np.float32),
            float(ix.max() - ix.min()), float(max(1, 650 - iy.min())),
            float(max(0, iy.max() - 650)))

@lru_cache(maxsize=220)
def dotted_points(char, step, spacing):
    coords, width, above, below = skeleton_points(char)
    if char.isupper():
        high, low = step * 2, (step * .26 if char == "Q" else 0)
    elif char in TALL_DESCENDERS:
        high, low = step * 2, step
    elif char in DESCENDERS:
        high, low = step, step
    elif char in ASCENDERS:
        high, low = step * 2, 0
    else:
        high, low = step, 0
    sx = high / above
    xs = coords[:, 0] * sx
    if below > 0 and low > 0:
        ys = np.where(coords[:, 1] < 0, -coords[:, 1] / above * high,
                      -coords[:, 1] / below * low)
    else:
        ys = np.maximum(-coords[:, 1] / above * high, 0)
    pts = np.column_stack((xs, ys))
    rng = np.random.default_rng(ord(char) * 17 + int(step * 31) + int(spacing * 100))
    order = rng.permutation(len(pts))
    bins, chosen = {}, []
    min_dist2 = (spacing * .92) ** 2
    for idx in order:
        x, y = map(float, pts[idx])
        a, b = int(math.floor(x / spacing)), int(math.floor(y / spacing))
        near = (point for dx in (-1, 0, 1) for dy in (-1, 0, 1)
                for point in bins.get((a + dx, b + dy), ()))
        if all((x - px) ** 2 + (y - py) ** 2 >= min_dist2 for px, py in near):
            chosen.append((x, y))
            bins.setdefault((a, b), []).append((x, y))
    return chosen, float(width * sx)

def guidelines(pdf, left, right, baseline, step):
    # Four lines: TOP solid, x-height dotted, baseline dotted, BOTTOM solid.
    pdf.saveState()
    for row, y in enumerate([baseline + 2*step, baseline + step, baseline, baseline - step]):
        pdf.setStrokeColor(OUTER if row in (0, 3) else INNER)
        pdf.setLineWidth(.78 if row in (0, 3) else .72)
        if row in (1, 2):
            pdf.setDash(1.1, 3.25)
            pdf._code.append("1 J")
        else:
            pdf.setDash()
        pdf.line(left, y, right, y)
    pdf.restoreState()

def dotted_text(pdf, text, x, baseline, step, spacing=3.1, radius=.67, maxwidth=None):
    chars = list(text)
    charspacing = max(2.0, step*.15)
    def widths_for(size, gap):
        return [size*.46 if ch == " " else size*.48 if ch == "-" else dotted_points(ch, size, gap)[1]
                for ch in chars]
    widths = widths_for(step, spacing)
    total = sum(widths) + max(0, len(widths)-1)*charspacing
    if maxwidth and total > maxwidth:
        scale = maxwidth / total
        step *= scale
        spacing = max(1.7, spacing*scale)
        radius = max(.36, radius*scale)
        charspacing *= scale
        widths = widths_for(step, spacing)
    pdf.saveState()
    pdf.setFillColor(TRACE)
    position = x
    for ch, cw in zip(chars, widths):
        if ch not in (" ", "-"):
            points, _ = dotted_points(ch, step, spacing)
            for dx, dy in points:
                pdf.circle(position+dx, baseline+dy, radius, stroke=0, fill=1)
        elif ch == "-":
            for i in range(4):
                pdf.circle(position+cw*(i+1)/5, baseline+step*.47, radius, stroke=0, fill=1)
        position += cw+charspacing
    pdf.restoreState()

def brand(pdf, section, number=None):
    pdf.saveState()
    pdf.setFillColor(GREEN)
    pdf.setFont("LatoBold", 10)
    pdf.drawString(42, H-43, "artico")
    pdf.setFillColor(HexColor("#bf4939"))
    pdf.circle(79, H-40, 2, stroke=0, fill=1)
    pdf.setFillColor(MUTED)
    pdf.setFont("Lato", 9)
    pdf.drawRightString(W-42, H-43, section.upper())
    pdf.setStrokeColor(LIGHT)
    pdf.line(42, H-54, W-42, H-54)
    pdf.line(42, 49, W-42, 49)
    pdf.setFont("Lato", 8)
    pdf.drawString(42, 37, "ARTICO / LEVEL ZERO / HANDWRITING")
    if number:
        pdf.drawRightString(W-42, 37, number)
    pdf.restoreState()

def title(pdf, text, subtitle):
    pdf.setFillColor(INK)
    pdf.setFont("AndikaBold", 27)
    pdf.drawString(42, H-95, text)
    pdf.setFillColor(MUTED)
    pdf.setFont("Lato", 10.5)
    pdf.drawString(42, H-117, subtitle)

def caption(pdf, text, y):
    pdf.setFillColor(GREEN)
    pdf.setFont("LatoBold", 10)
    pdf.drawString(42, y, text.upper())

def letter_sheet(pdf, letter):
    low = letter.lower()
    brand(pdf, "Letter tracing", f"{ord(letter)-64:02d} / 26")
    title(pdf, f"Letter {letter} {low}", "Trace the dotted letters. Then write on the blank lines.")
    left, right, step = 42, W-42, 25
    caption(pdf, "01  Capital letter", H-159)
    caption(pdf, "02  Small letter", H-286)
    caption(pdf, "03  Capital and small together", H-412)
    for baseline, text in ((H-229, letter*4), (H-356, low*5), (H-482, (letter+low)*3)):
        guidelines(pdf, left, right, baseline, step)
        dotted_text(pdf, text, left+16, baseline, step, spacing=3.25, radius=.68,
                    maxwidth=right-left-35)
    caption(pdf, "04  Now write without dots", H-530)
    for baseline in (H-596, H-665):
        guidelines(pdf, left, right, baseline, step)
    pdf.setFillColor(MUTED)
    pdf.setFont("LatoBold", 9)
    pdf.drawString(42, 103, "WORD IDEAS")
    pdf.setFillColor(INK)
    pdf.setFont("Andika", 12)
    pdf.drawString(42, 82, "  /  ".join(WORDS[letter]))
    pdf.showPage()

def word_sheet(pdf, letter):
    low = letter.lower()
    brand(pdf, "Word tracing", f"{ord(letter)-64:02d} / 26")
    title(pdf, f"Words with {letter} {low}", "Look at each word. Trace it. Then write on the next line.")
    step = 21
    for i, word in enumerate(WORDS[letter]):
        top = H-164-i*227
        caption(pdf, f"{i+1:02d}  {word}", top)
        baseline = top-80
        guidelines(pdf, 42, W-42, baseline, step)
        dotted_text(pdf, word, 54, baseline, step, spacing=2.95, radius=.64,
                    maxwidth=W-108)
        guidelines(pdf, 42, W-42, baseline-75, step)
    if letter == "X":
        pdf.setFillColor(MUTED)
        pdf.setFont("Lato", 8.8)
        pdf.drawString(42, 65, "Note: the x in box is at the end of the word.")
    pdf.showPage()

def overview_page(pdf, letters, mode, page):
    section = {"both":"Alphabet A-Z", "upper":"Capital A-Z", "lower":"Small a-z"}[mode]
    brand(pdf, "Complete alphabet", f"PAGE {page} / 2")
    title(pdf, section, "Four lines: solid top and bottom; dotted middle guides.")
    step = 10.8
    for i, letter in enumerate(letters):
        baseline = H-172-i*49
        guidelines(pdf, 42, W-42, baseline, step)
        low = letter.lower()
        text = (f"{letter} {low}  {letter} {low}" if mode=="both" else
                f"{letter}  {letter}  {letter}  {letter}" if mode=="upper" else
                f"{low}  {low}  {low}  {low}")
        dotted_text(pdf, text, 58, baseline, step, spacing=1.65, radius=.43,
                    maxwidth=W-130)
        pdf.saveState()
        pdf.setFont("LatoBold", 9)
        pdf.setFillColor(MUTED)
        pdf.drawRightString(W-49, baseline+12, letter)
        pdf.restoreState()
    pdf.showPage()

def create_pdf(path, kind, letters=None):
    pdf = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    pdf.setTitle("Artico | " + path.stem.replace("_", " "))
    pdf.setAuthor("Artico")
    pdf.setSubject("Four-line handwriting practice with dotted tracing letters")
    if kind == "letter":
        for letter in letters:
            letter_sheet(pdf, letter)
    elif kind == "word":
        for letter in letters:
            word_sheet(pdf, letter)
    elif kind == "overview":
        for page, group in enumerate(("ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"), 1):
            overview_page(pdf, group, letters, page)
    elif kind == "complete":
        for page, group in enumerate(("ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"), 1):
            overview_page(pdf, group, "both", page)
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            letter_sheet(pdf, letter)
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            word_sheet(pdf, letter)
    pdf.save()

def main():
    create_pdf(OUT / "00_Alphabet_A-Z_Uppercase_and_Lowercase.pdf", "overview", "both")
    create_pdf(OUT / "00A_Alphabet_A-Z_Capitals.pdf", "overview", "upper")
    create_pdf(OUT / "00B_Alphabet_a-z_Small_Letters.pdf", "overview", "lower")
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        create_pdf(OUT / f"Letter_{letter}_Trace.pdf", "letter", letter)
        create_pdf(OUT / f"Words_{letter}_Write.pdf", "word", letter)
    create_pdf(OUT / "Artico_Letter_Tracing_Book_A-Z.pdf", "letter", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    create_pdf(OUT / "Artico_Word_Writing_Book_A-Z.pdf", "word", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    create_pdf(OUT / "Artico_Complete_Handwriting_Workbook.pdf", "complete")
    documents = sorted(OUT.glob("*.pdf"))
    with zipfile.ZipFile(OUT / "Artico_Handwriting_PDF_Collection.zip", "w",
                         compression=zipfile.ZIP_DEFLATED, compresslevel=7) as z:
        for document in documents:
            z.write(document, arcname=document.name)
    assert len(documents) == 58, f"Expected 58 PDFs, found {len(documents)}"
    print(f"Generated {len(documents)} printable PDFs and complete ZIP in {OUT}")

if __name__ == "__main__":
    main()
