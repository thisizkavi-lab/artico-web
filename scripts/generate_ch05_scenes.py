#!/usr/bin/env python3
"""Original, chapter-specific transparent PNG scene illustrations for Artico CH05.

Outputs are deterministic and intentionally carry no text or opaque background.
The four figures correspond to the four lesson study sections, in order.
"""
from pathlib import Path
import cairosvg

OUT = Path(__file__).resolve().parents[1] / "public/assets/course"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#4b4b4a"
SKIN = "#e8ba96"

def person(who, x, y, scale=1, mood="happy", gesture="open", mirror=False):
    """Consistent recurring Dev, Riley and Morgan, waist-up."""
    if who == "Dev":
        shirt, hair, skin, style = "#83aeb0", "#393d45", "#c99978", "short"
    elif who == "Riley":
        shirt, hair, skin, style = "#e5a4a0", "#765149", "#efc5a4", "bob"
    else:
        shirt, hair, skin, style = "#a4b79a", "#4b4240", "#b98969", "curly"

    arms = {
        "open": f'''
          <path d="M-77 190 Q-113 199 -128 226" fill="none" stroke="{shirt}" stroke-width="27"/>
          <path d="M78 190 Q115 197 130 220" fill="none" stroke="{shirt}" stroke-width="27"/>
          <path d="M-128 227 l-12 -11 m10 8 l-1 -18" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>
          <path d="M130 221 l17 -12 m-16 10 l2 -18" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>''',
        "offer": f'''
          <path d="M-76 190 Q-98 226 -77 279" fill="none" stroke="{shirt}" stroke-width="26"/>
          <path d="M77 190 Q112 210 140 171" fill="none" stroke="{shirt}" stroke-width="26"/>
          <path d="M-77 279 q-15 10 -21 -9" stroke="{skin}" stroke-width="13" fill="none" stroke-linecap="round"/>
          <path d="M140 171 l32 -13 m-32 13 l8 -22" stroke="{skin}" stroke-width="9" fill="none" stroke-linecap="round"/>''',
        "decline": f'''
          <path d="M-78 190 Q-107 204 -124 155" stroke="{shirt}" stroke-width="28" fill="none"/>
          <path d="M-124 155 q-4 -15 -5 -38 m10 33 l8 -32 m-17 39 l-16 -17" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>
          <path d="M78 190 Q103 242 69 287" stroke="{shirt}" stroke-width="27" fill="none"/>
          <path d="M69 287 q-17 11 -25 -4" stroke="{skin}" stroke-width="12" fill="none" stroke-linecap="round"/>''',
        "surprised": f'''
          <path d="M-78 191 Q-118 148 -91 103" stroke="{shirt}" stroke-width="28" fill="none"/>
          <path d="M77 191 Q116 150 94 103" stroke="{shirt}" stroke-width="28" fill="none"/>
          <path d="M-91 103 l-5 -29 m5 29 l-21 -14 m21 14 l9 -25" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>
          <path d="M94 103 l7 -29 m-7 29 l22 -13 m-22 13 l-9 -24" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>''',
        "consider": f'''
          <path d="M-78 191 Q-101 242 -62 281" stroke="{shirt}" stroke-width="28" fill="none"/>
          <path d="M78 191 Q125 200 100 137" stroke="{shirt}" stroke-width="28" fill="none"/>
          <path d="M100 137 Q78 113 56 139" stroke="{skin}" stroke-width="14" fill="none" stroke-linecap="round"/>
          <path d="M-62 281 q-12 14 -25 -3" stroke="{skin}" stroke-width="12" fill="none" stroke-linecap="round"/>''',
    }[gesture]
    if style == "short":
        back_hair = ""
        front_hair = f'''<path d="M-54 60 Q-78 5 -29 -10 Q13 -36 49 -3 Q70 16 56 55
                     Q35 28 6 32 Q-23 40 -43 25Z" fill="{hair}" stroke="{INK}"/>'''
    elif style == "bob":
        back_hair = f'''<path d="M-64 52 Q-71 -21 6 -24 Q76 -20 65 62 L70 140 Q37 156 18 143
                      L-53 143 Q-76 116 -64 52Z" fill="{hair}" stroke="{INK}"/>'''
        front_hair = f'''<path d="M-59 52 Q-58 -5 -9 -17 Q39 -21 56 21
                        Q40 41 15 15 Q-5 39 -42 44Z" fill="{hair}" stroke="{INK}"/>'''
    else:
        back_hair = ""
        front_hair = f'''<g fill="{hair}" stroke="{INK}" stroke-width="2">
           <circle cx="-48" cy="24" r="24"/><circle cx="-29" cy="0" r="26"/>
           <circle cx="-3" cy="-7" r="27"/><circle cx="26" cy="0" r="26"/>
           <circle cx="48" cy="25" r="25"/></g>'''
    mouth = ('<ellipse cx="3" cy="123" rx="11" ry="14" fill="#a76062" stroke="#684c4a"/>'
             if mood == "surprise" else
             '<path d="M-15 119 Q0 138 20 118" fill="none" stroke="#805a54" stroke-width="3"/>'
             if mood == "happy" else
             '<path d="M-14 124 Q2 116 19 123" fill="none" stroke="#805a54" stroke-width="3"/>')
    reflections = '<ellipse cx="-36" cy="105" rx="9" ry="5" fill="#df9794" opacity=".35"/><ellipse cx="34" cy="105" rx="9" ry="5" fill="#df9794" opacity=".35"/>'
    flip = "scale(-1 1)" if mirror else ""
    return f'''<g transform="translate({x} {y}) scale({scale}) {flip}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
      {back_hair}
      <path d="M-103 354 L-95 228 Q-98 158 -43 146 L40 146 Q97 158 95 228 L103 354Z" fill="{shirt}" stroke="{INK}"/>
      <path d="M-26 145 l26 39 l25 -39Z" fill="#fff9f2" stroke="{INK}"/>
      <path d="M-22 125 v37 q22 17 42 0 v-37Z" fill="{skin}" stroke="{INK}"/>
      <ellipse cx="0" cy="77" rx="54" ry="65" fill="{skin}" stroke="{INK}"/>
      {front_hair}
      <path d="M-30 64 q12 -6 22 0 M11 63 q12 -6 21 1" fill="none" stroke="#50423e" stroke-width="2.4"/>
      <ellipse cx="-18" cy="83" rx="3.5" ry="6" fill="#444047"/>
      <ellipse cx="21" cy="83" rx="3.5" ry="6" fill="#444047"/>
      <path d="M3 88 l-4 16 l6 1" fill="none" stroke="#a77c67" stroke-width="2"/>
      {mouth}{reflections}
      {arms}
      <path d="M-33 148 l31 36 l31 -36 M0 187 v153 M-59 251 q-9 34 1 46 M57 261 q11 33 3 51" fill="none" stroke="{INK}" stroke-width="2" opacity=".48"/>
    </g>'''

def camera(x, y, scale=1):
    return f'''<g transform="translate({x} {y}) scale({scale})" stroke="{INK}" stroke-linejoin="round" stroke-linecap="round" stroke-width="3">
      <path d="M-64 -25 Q-93 -71 -121 -35" fill="none" stroke-width="5"/>
      <rect x="-72" y="-38" width="145" height="98" rx="16" fill="#5b7180"/>
      <rect x="-41" y="-53" width="58" height="19" rx="6" fill="#526b7b"/>
      <circle cx="8" cy="11" r="40" fill="#f4f0e5"/>
      <circle cx="8" cy="11" r="27" fill="#759ba3"/>
      <circle cx="8" cy="11" r="15" fill="#4a5d65"/>
      <circle cx="-2" cy="0" r="6" fill="#fffefa"/>
      <rect x="-56" y="-19" width="24" height="14" rx="3" fill="#f3c36b"/>
    </g>'''

def plant(x,y,s=1):
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-width="3" stroke-linejoin="round">
    <path d="M0 30 V-101 M0 -48 Q-58 -68 -47 -113 M0 -65 Q46 -111 57 -89 M0 -14 Q-57 -9 -54 -61 M0 -21 Q52 -58 62 -27" fill="none" stroke="#6d927b" stroke-width="7"/>
    <ellipse cx="-42" cy="-107" rx="33" ry="16" transform="rotate(30 -42 -107)" fill="#a9cba4"/>
    <ellipse cx="47" cy="-93" rx="35" ry="17" transform="rotate(-30 47 -93)" fill="#88ae90"/>
    <ellipse cx="-47" cy="-55" rx="31" ry="17" transform="rotate(25 -47 -55)" fill="#b2c9a2"/>
    <ellipse cx="47" cy="-32" rx="32" ry="18" transform="rotate(-35 47 -32)" fill="#91b295"/>
    <path d="M-42 24 H42 L31 99 H-30Z" fill="#dcb8a1"/>
    <path d="M-36 41 H36" fill="none" stroke="#ad8f81"/>
    </g>'''

def puzzle_door(x,y,s=1):
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-linejoin="round" stroke-width="3.5">
     <path d="M-90 134 V-140 Q-90 -155 -74 -155 H74 Q90 -155 90 -140 V134Z" fill="#e5d2b5"/>
     <path d="M-70 135 V-131 H70 V135Z" fill="#f9f3e8"/>
     <rect x="-45" y="-53" width="90" height="105" rx="9" fill="#bed7d5"/>
     <path d="M-23 -20 h18 q-5 -28 14 -24 q20 8 1 27 h22 v21 h-28 q-7 -22 -21 -10 q-13 9 0 24 h-24Z" fill="#e4aa92"/>
     <circle cx="54" cy="18" r="6" fill="#ba9276"/>
     <path d="M-71 134 H70" stroke-width="3"/>
    </g>'''

def plan(x,y,s=1):
    seats_left = "".join(f'<circle cx="{-112 + i%2*63}" cy="{-69 + (i//2)*32}" r="7" fill="#a4bba3"/>' for i in range(8))
    seats_right = "".join(f'<circle cx="{19 + i%5*26}" cy="{-70 + (i//5)*34}" r="5.3" fill="#e5a4a0"/>' for i in range(20))
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-width="2.5">
      <rect x="-156" y="-102" width="318" height="212" rx="9" fill="#fffaf2"/>
      <rect x="-137" y="-83" width="127" height="155" fill="#d5e6e0"/>
      <rect x="1" y="-83" width="144" height="155" fill="#f7e7dc"/>
      <path d="M-6 -83 V72 M-140 90 H147" fill="none" stroke="#786f69" stroke-width="3"/>
      {seats_left}{seats_right}
      <path d="M-46 103 l12 11 19 -25" fill="none" stroke="#88aa8e" stroke-width="5"/>
    </g>'''

def table(x,y,s=1):
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-width="3">
      <ellipse cx="0" cy="0" rx="128" ry="25" fill="#e3c39c"/>
      <path d="M-17 18 H17 V134 H-17Z" fill="#d0ab80"/>
      <ellipse cx="0" cy="134" rx="70" ry="12" fill="#c6a57c"/>
      <ellipse cx="-27" cy="-5" rx="36" ry="14" fill="#fff9f2"/>
      <ellipse cx="-27" cy="-6" rx="19" ry="8" fill="#dfbd77"/>
      <path d="M53 -8 h28 M63 -13 v-27 h18 v28" stroke="#acbfb7" fill="none"/>
    </g>'''

def takeout(x,y,s=1):
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-width="3" stroke-linejoin="round">
      <path d="M-67 -56 H68 L54 116 H-54Z" fill="#d7b581"/>
      <path d="M-38 -56 V-84 Q-35 -110 0 -110 Q36 -110 38 -84 V-56" fill="none" stroke="#7f6654" stroke-width="6"/>
      <circle cx="0" cy="20" r="30" fill="#fdf4e0" stroke="none"/>
      <path d="M-19 23 Q-1 -2 20 23 M-13 12 Q0 29 14 12" stroke="#a4ba91" stroke-width="5" fill="none"/>
      <path d="M-58 89 H59" stroke="#b4956d" fill="none"/>
    </g>'''

def winner(x,y,s=1):
    return f'''<g transform="translate({x} {y}) scale({s})" stroke="{INK}" stroke-width="3" stroke-linejoin="round">
      <rect x="-113" y="-96" width="226" height="180" rx="11" fill="#eedcc1"/>
      <rect x="-96" y="-80" width="192" height="131" rx="5" fill="#c2dee0"/>
      <circle cx="54" cy="-51" r="18" fill="#efc96f" stroke="none"/>
      <path d="M-96 51 L-27 -33 L20 51Z" fill="#a6b9a0" stroke="none"/>
      <path d="M-32 51 L44 -31 L97 51Z" fill="#8fa8a1" stroke="none"/>
      <path d="M-42 -9 L-27 -33 L-5 -8" stroke="#f4f7f1" stroke-width="5" fill="none"/>
      <circle cx="76" cy="69" r="26" fill="#f0c76c"/>
      <path d="M64 89 L56 130 L79 115 L104 132 L89 88Z" fill="#e1aaa0"/>
      <path d="M76 50 L82 62 L95 63 L85 73 L88 85 L76 79 L64 85 L66 72 L57 63 L70 62Z" fill="#fff7d6" stroke="none"/>
    </g>'''

def scene(n):
    common_start = '''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 960 600">
      <g stroke-linejoin="round" stroke-linecap="round">'''
    common_end = '</g></svg>'
    if n == 0:
        content = (puzzle_door(461,320,.83) +
                   person("Dev",205,99,1.12,"happy","offer") +
                   person("Riley",743,95,1.12,"happy","decline") +
                   camera(764,502,.67) + plant(869,469,.67))
    elif n == 1:
        content = (person("Dev",180,76,.91,"happy","offer") +
                   person("Riley",469,75,.91,"serious","consider") +
                   person("Morgan",766,76,.91,"happy","open") +
                   plan(468,484,.88))
    elif n == 2:
        content = (person("Dev",234,88,1.10,"happy","open") +
                   person("Riley",739,88,1.10,"happy","offer",mirror=True) +
                   table(439,473,.90) + takeout(693,457,.80))
    else:
        content = (person("Dev",214,92,1.11,"happy","offer") +
                   person("Riley",742,84,1.12,"surprise","surprised") +
                   winner(474,325,1.04) + camera(458,539,.45))
    return common_start + content + common_end

# Native, chapter-specific PNGs checked into the repository take precedence.
# Regenerate the legacy placeholder only when its PNG is absent, e.g. on a fresh
# checkout that has not yet received an approved original illustration.
from PIL import Image

for index in range(4):
    target = OUT / f"ch05-scene-{index}.png"
    if target.is_file():
        with Image.open(target) as im:
            assert im.format == "PNG" and im.mode == "RGBA", target
            assert im.width >= 1000 and im.height >= 600, target
            assert im.getchannel("A").getextrema()[0] == 0, target
        print(f"{target.name}: preserved existing transparent PNG ({target.stat().st_size} bytes)")
        continue
    cairosvg.svg2png(bytestring=scene(index).encode("utf-8"),
                    write_to=str(target), output_width=1280, output_height=800)
    with Image.open(target) as im:
        assert im.mode == "RGBA" and im.size == (1280,800), target
        assert im.getextrema()[3][0] == 0 and im.getextrema()[3][1] == 255, target
    print(f"{target.name}: 1280x800 transparent PNG ({target.stat().st_size} bytes)")
