#!/usr/bin/env python3
"""Build original high-resolution PNG illustrations for Chapter 02 vocabulary.

No third-party image hosts or runtime SVG placeholders. The four scenes are
drawn as resolution-independent artwork and rasterized before the site build.
"""
from pathlib import Path
import cairosvg

ROOT = Path("public/assets/course")
W, H = 760, 460

def scene(content, bg):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
      <rect x="10" y="20" width="740" height="420" rx="42" fill="{bg}"/>
      <path d="M57 403 Q379 422 704 403" fill="none" stroke="#B6C6BA"
            stroke-width="4" stroke-linecap="round" opacity=".7"/>
      {content}</svg>'''

def person(x, y, shirt, hair, scale=.77, raised=False, right=False):
    left = (f'<path d="M-54 201 C-80 173 -102 143 -111 128" fill="none" stroke="{shirt}" stroke-width="30" stroke-linecap="round"/><path d="M-111 128 l-8 -25 m8 25 l8 -30 m-8 30 l19 -16" stroke="#E3A477" stroke-width="12" fill="none" stroke-linecap="round"/>'
            if raised else f'<path d="M-57 194 L-77 264" stroke="{shirt}" stroke-width="29" stroke-linecap="round"/>')
    arm = (f'<path d="M57 201 C79 157 100 138 107 119" fill="none" stroke="{shirt}" stroke-width="30" stroke-linecap="round"/><path d="M107 119 l-18 -15 m18 15 l-7 -29 m7 29 l12 -29" stroke="#E3A477" stroke-width="11" fill="none" stroke-linecap="round"/>'
           if right else f'<path d="M57 194 L74 260" stroke="{shirt}" stroke-width="29" stroke-linecap="round"/>')
    return f'''<g transform="translate({x} {y}) scale({scale})" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-52 294 L-51 388 M52 294 L53 388" fill="none" stroke="#384E65" stroke-width="41"/>
      <path d="M-59 394 l-19 0 M48 394 h27" stroke="#253D47" stroke-width="23"/>
      <path d="M-66 189 Q0 150 67 189 L65 309 Q2 325 -65 309Z" fill="{shirt}" stroke="#29424A" stroke-width="6"/>
      {left}{arm}
      <rect x="-18" y="147" width="37" height="40" rx="13" fill="#E3A477"/>
      <ellipse cx="0" cy="88" rx="66" ry="81" fill="#E3A477" stroke="#3C3535" stroke-width="6"/>
      <path d="M-68 88 Q-78 10 -7 5 Q52 -9 75 60 Q72 89 62 97 Q53 42 28 51 Q-12 85 -41 49 Q-53 70 -68 88Z" fill="{hair}" stroke="#3F302D" stroke-width="6"/>
      <path d="M-42 100 Q-29 89 -18 97 M18 97 Q32 89 44 100" stroke="#50372C" stroke-width="5" fill="none"/>
      <ellipse cx="-27" cy="105" rx="6" ry="10" fill="#293841"/>
      <ellipse cx="28" cy="105" rx="6" ry="10" fill="#293841"/>
      <path d="M-17 133 Q0 151 21 129" fill="none" stroke="#823E3A" stroke-width="6"/>
      <circle cx="-50" cy="122" r="9" fill="#DF8E75" opacity=".5"/>
      <circle cx="49" cy="122" r="9" fill="#DF8E75" opacity=".5"/>
    </g>'''

def friend():
    rays = '''<path d="M304 155 l12 -21 M324 163 l22 -8 M451 155 l-12 -21 M433 166 l-22 -8"
                    fill="none" stroke="#DDA334" stroke-width="8" stroke-linecap="round"/>'''
    return scene(rays+person(229,50,"#4F8767","#79503A",raised=True)+
                 person(533,50,"#3D7EAB","#45302C",right=True), "#F0F5EA")

def colleague():
    backdrop='''<rect x="70" y="85" width="135" height="95" rx="10" fill="#F4F9FC" stroke="#A5C4CC" stroke-width="6"/>
    <path d="M95 112 h82 M95 132 h66 M95 152 h77" stroke="#A3BAC3" stroke-width="6" stroke-linecap="round"/>
    <rect x="564" y="79" width="118" height="101" rx="11" fill="#FFFFFF" stroke="#A5C4CC" stroke-width="6"/>
    <path d="M586 109 h66 M586 128 h56 M586 147 h65" stroke="#A3BAC3" stroke-width="6" stroke-linecap="round"/>'''
    desk='''<rect x="78" y="312" width="612" height="80" rx="8" fill="#C6A58D"/>
    <path d="M78 336 H690" stroke="#9B7459" stroke-width="24" stroke-linecap="round"/>
    <path d="M126 347 V418 M643 347 V418" stroke="#9B7459" stroke-width="17" stroke-linecap="round"/>
    <rect x="310" y="246" width="174" height="98" rx="11" fill="#556F7C" stroke="#273E49" stroke-width="7"/>
    <rect x="326" y="261" width="141" height="70" rx="5" fill="#C5DEE8"/>
    <circle cx="397" cy="299" r="12" fill="#8FAEBF"/>
    <path d="M292 347 H506" stroke="#273E49" stroke-width="12" stroke-linecap="round"/>'''
    return scene(backdrop + person(213,94,"#B96B4C","#403433",scale=.58) +
                 person(563,88,"#6B8796","#4D4039",scale=.58) + desk, "#EDF5F6")

def name_tag():
    body='''<ellipse cx="379" cy="228" rx="269" ry="142" fill="#F3E8C5"/>
    <path d="M315 104 V77 Q314 41 349 41 H411 Q446 41 445 77 V104" fill="none" stroke="#374B4E" stroke-width="11"/>
    <rect x="161" y="111" width="438" height="283" rx="27" fill="#FFFEF9" stroke="#273F43" stroke-width="11"/>
    <path d="M161 138 Q161 111 188 111 H573 Q599 111 599 138 V194 H161Z" fill="#B55742" stroke="#273F43" stroke-width="11"/>
    <rect x="337" y="126" width="85" height="16" rx="8" fill="#F1DDB5" stroke="#273F43" stroke-width="5"/>
    <text x="380" y="304" fill="#2B4148" font-family="DejaVu Sans, sans-serif" font-size="84" font-weight="700" text-anchor="middle">Alex</text>
    <path d="M273 340 H487" stroke="#B4BEC0" stroke-width="7" stroke-linecap="round"/>'''
    return scene(body,"#FBF7EB")

def photography_class():
    body='''<path d="M522 104 H683 Q701 104 701 124 V233 Q701 250 683 250 H522 Q504 250 504 233 V124 Q504 104 522 104Z"
            fill="#FCFEFC" stroke="#688D91" stroke-width="7"/>
    <path d="M526 221 l50 -59 35 31 39 -45 37 73Z" fill="#A0C0B0"/>
    <circle cx="646" cy="137" r="15" fill="#E7BD6F"/>
    <path d="M180 142 Q158 105 216 92 Q284 80 297 136Z" fill="#6C4B3C" stroke="#44342C" stroke-width="6"/>
    <path d="M172 158 Q178 98 235 102 Q285 104 284 164" fill="#E2A479" stroke="#403333" stroke-width="7"/>
    <path d="M189 196 Q232 179 280 198 L328 334 L160 334Z" fill="#4F81A2" stroke="#2E4854" stroke-width="8"/>
    <path d="M191 244 L133 290 M298 240 L340 290" fill="none" stroke="#4F81A2" stroke-width="27" stroke-linecap="round"/>
    <path d="M182 206 Q214 169 242 192" fill="none" stroke="#E2A479" stroke-width="24" stroke-linecap="round"/>
    <rect x="204" y="181" width="244" height="160" rx="30" fill="#304D4B" stroke="#233E40" stroke-width="11"/>
    <path d="M249 182 l27 -32 h88 l24 32" fill="#304D4B" stroke="#233E40" stroke-width="11"/>
    <circle cx="325" cy="260" r="69" fill="#A7C4BF" stroke="#152F35" stroke-width="12"/>
    <circle cx="325" cy="260" r="47" fill="#365C63" stroke="#1F3940" stroke-width="10"/>
    <circle cx="325" cy="260" r="25" fill="#223940"/>
    <circle cx="310" cy="243" r="11" fill="#ECF3F0"/>
    <rect x="397" y="208" width="28" height="13" rx="5" fill="#D5D9B8"/>
    <path d="M465 175 l21 -13 M470 198 l25 -1 M451 153 l13 -20" stroke="#DFA640" stroke-width="9" stroke-linecap="round"/>'''
    return scene(body,"#EFF4EC")

def main():
    ROOT.mkdir(parents=True,exist_ok=True)
    for title,draw in [("friend",friend),("colleague",colleague),
                       ("name",name_tag),("photography-class",photography_class)]:
        dest=ROOT / f"ch02-{title}.png"
        cairosvg.svg2png(bytestring=draw().encode("utf-8"),
                         write_to=str(dest),output_width=760,output_height=460)
        assert dest.is_file() and dest.stat().st_size>7000, dest
        print("Generated", dest, dest.stat().st_size)

if __name__=="__main__":
    main()
