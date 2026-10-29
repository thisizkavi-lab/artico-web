#!/usr/bin/env python3
"""Original, chapter-specific illustrated PNGs for Artico vocabulary.

All drawings are composed locally from original SVG scene geometry (not generic
Unicode emoji or third-party symbols), then rasterized to reusable PNG files.
They illustrate the particular vocabulary sense, not just the category.
"""
import io
import json
from pathlib import Path
from html import escape
from PIL import Image
try:
    import resvg_py
    def _render_svg(svg_text, width=640, height=397):
        return resvg_py.svg_to_bytes(svg_text, width=width, height=height)
except ImportError:
    import cairosvg
    def _render_svg(svg_text, width=640, height=397):
        # cairosvg.svg2png fallback
        return cairosvg.svg2png(bytestring=svg_text.encode(), output_width=width, output_height=height)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'src/web/vocabularyOriginalScenes.json').read_text())
OUTPUT = ROOT / 'public/vocabulary-symbols/original'
NAVY = '#314b69'
BLUE = '#74a7d8'
ROOF = '#b87969'
WOOD = '#a77f63'
CREAM = '#f7f0e3'
SKIN = '#f1c19d'


def rect(x,y,w,h,fill,rx=0,stroke='none',sw=1):
    return f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='{rx}' fill='{fill}' stroke='{stroke}' stroke-width='{sw}'/>"

def circle(x,y,r,fill,stroke='none',sw=1):
    return f"<circle cx='{x}' cy='{y}' r='{r}' fill='{fill}' stroke='{stroke}' stroke-width='{sw}'/>"

def path(d,fill='none',stroke='none',sw=2):
    return f"<path d='{d}' fill='{fill}' stroke='{stroke}' stroke-width='{sw}' stroke-linecap='round' stroke-linejoin='round'/>"

def line(x1,y1,x2,y2,color=NAVY,sw=2):
    return path(f'M{x1} {y1}L{x2} {y2}',stroke=color,sw=sw)

def label(x,y,content,size=13,color=NAVY,weight='700'):
    return f"<text x='{x}' y='{y}' font-family='Arial,sans-serif' font-size='{size}' font-weight='{weight}' fill='{color}' text-anchor='middle'>{escape(str(content))}</text>"

def group(items,x=0,y=0,scale=1):
    return f"<g transform='translate({x} {y}) scale({scale})'>" + ''.join(items) + '</g>'

def person(x=0,y=0,scale=1,shirt='#587cba',arm='right',pose='standing',face='smile'):
    z=[circle(0,0,18,SKIN,NAVY,2.3),
       path('M-17 -6Q-23 -31 -1 -28Q18 -29 19 -7L12 -15Q-3 -9 -12 -15Z','#464456'),
       circle(-5,1,1.5,NAVY),circle(6,1,1.5,NAVY)]
    if face=='sad': z.append(path('M-6 12Q0 6 7 12',stroke='#a15f61',sw=1.8))
    elif face=='surprised': z.append(circle(1,11,3,'#b56f75'))
    else: z.append(path('M-6 10Q0 16 7 10',stroke='#a15f61',sw=1.8))
    z.extend([rect(-19,19,38,54,shirt,10,NAVY,1.7),
       path('M-11 74L-12 106M11 74L13 106',stroke=NAVY,sw=9)])
    if pose=='sitting':
        z[-1]=path('M-12 74L18 84L27 84M11 73L8 95',stroke=NAVY,sw=9)
    if arm=='right': z.append(path('M18 34L37 12M-18 32L-25 56',stroke=SKIN,sw=10))
    elif arm=='left': z.append(path('M-18 33L-35 14M18 33L24 56',stroke=SKIN,sw=10))
    elif arm=='forward': z.append(path('M-18 32L30 44M18 35L45 44',stroke=SKIN,sw=10))
    elif arm=='down': z.append(path('M-18 30L-23 60M18 30L23 60',stroke=SKIN,sw=10))
    return group(z,x,y,scale)

def house(x=0,y=0,s=1,roof=ROOF,body='#f8e5cf',floors=1,doors=True,chimney=False):
    w=118;h=72+(floors-1)*46
    yb=70-h
    parts=[rect(0,yb,w,h,body,2,NAVY,2),
      path(f'M-11 {yb}L59 {yb-48}L129 {yb}',roof,NAVY,2)]
    if chimney:
        parts.append(rect(91,yb-46,14,30,'#a87971',0,NAVY,1.6))
    for floor in range(floors):
        wy=yb+18+floor*43
        for wx in (12,85):
            parts.extend([rect(wx,wy,20,25,'#d3e8f5',2,NAVY,1.8),
                          line(wx+10,wy,wx+10,wy+25,'#87b4d3',1.5)])
    if doors:
        parts.extend([rect(47,19 if floors==1 else 19,25,51,WOOD,3,NAVY,2),
                      circle(65,49,2,'#f2e7c8')])
    return group(parts,x,y,s)

def apartments(x=0,y=0,s=1,levels=3):
    h=42*levels+21
    p=[rect(0,0,150,h,'#d5e5e4',3,NAVY,2)]
    for floor in range(levels):
        for col in range(3):
            xx=14+46*col;yy=12+38*floor
            p.extend([rect(xx,yy,28,26,'#c8eafa',1,NAVY,1.4),
                      line(xx+14,yy,xx+14,yy+26,'#84aac8',1.5)])
    p.append(rect(64,h-27,22,27,WOOD,2,NAVY,1.5))
    return group(p,x,y,s)

def tree(x,y,s=1):
    p=[path('M0 60V15M0 36L-16 22M0 28L16 12',stroke='#806b59',sw=7),
       circle(-11,10,19,'#9acaa7'),circle(13,2,22,'#8ec69e'),circle(0,-9,24,'#b1d8ad')]
    return group(p,x,y,s)

def key(x=0,y=0,s=1):
    p=[circle(0,0,14,'#f1cb68',NAVY,2.5),circle(0,0,6,'#fdf5db'),
       path('M12 4L65 4L65 17L53 17L53 11L43 11L43 18L32 18L32 4Z','#e6b959',NAVY,2.2)]
    return group(p,x,y,s)

def document(x=0,y=0,s=1,kind='contract'):
    p=[rect(0,0,91,117,'#fffdf8',6,NAVY,2)]
    for i in range(4):
        p.append(rect(13,19+i*16,65-(i%2)*13,3,'#afbfcc',1))
    if kind in ('lease','tenancy','notice','reference'):
        p.extend([path('M15 92Q25 75 41 92Q52 81 61 90',stroke='#547fb0',sw=3),
                  line(13,103,77,103,'#b4c4d1',1.6)])
    if kind=='bills': p.extend([label(48,96,'¥',28,'#397da8'),rect(15,6,61,6,'#efbf97',2)])
    if kind=='maintenance':p.extend([circle(44,91,14,'#f7d887'),path('M39 83L49 96M49 83L39 96',stroke=NAVY,sw=4)])
    if kind=='reference':p.extend([circle(68,90,10,'#9bcfa4'),path('M63 90L67 94L74 85',stroke='#3f8051',sw=3)])
    return group(p,x,y,s)

def coin(x,y,s=1):
    return group([circle(0,0,25,'#efc867',NAVY,2.5),circle(0,0,18,'none','#d2a64d',1.6),
                  label(0,9,'¥',25,'#97743b')],x,y,s)

def box(x=0,y=0,s=1,open_top=False):
    p=[rect(0,8,77,57,'#ddb784',3,NAVY,2),
       path('M0 9L39 -4L77 9L39 22Z','#f3d4a0',NAVY,1.8),
       line(39,22,39,65,'#ad855b',2)]
    if open_top:
        p.append(path('M-14 0L26 -23L40 -4L1 13Z','#f5d3a0',NAVY,2))
        p.append(path('M40 -4L78 -21L94 2L77 10Z','#efc88d',NAVY,2))
    return group(p,x,y,s)

def truck(x=0,y=0,s=1,load=False):
    p=[rect(0,14,157,83,'#dfecf4',6,NAVY,2.8),
       rect(159,35,74,62,'#7ca9d4',9,NAVY,2.8),
       path('M175 40H210L224 65H175Z','#e0f3fb',NAVY,2),
       circle(43,103,16,'#46516a'),circle(184,103,16,'#46516a'),
       circle(43,103,7,'#b9c6d2'),circle(184,103,7,'#b9c6d2'),
       rect(171,77,21,5,'#e6ecf3',1)]
    if load:
        p.extend([rect(8,23,136,65,'#ecc897',4,'#b18869',1.5),
                  line(70,23,70,88,'#b38b60',2)])
    return group(p,x,y,s)

def furniture(x,y,s=1,empty=False):
    if empty:
        return group([line(0,79,151,79,'#9c968e',3),
                      path('M18 77V-4M18 -4H151',stroke='#c4d7dc',sw=2)],x,y,s)
    p=[rect(6,45,65,34,'#8cb1cd',7,NAVY,2),rect(12,22,53,35,'#b9d6e5',5,NAVY,2),
       rect(73,57,62,6,WOOD,2,NAVY,1.5),
       line(82,65,82,86,WOOD,5),line(127,65,127,86,WOOD,5),
       rect(120,2,17,50,'#e7c89a',4,NAVY,2),circle(128,1,18,'#fae2a8'),
       rect(2,78,145,3,'#9b887c',1)]
    return group(p,x,y,s)

def sparkle(x,y,s=1):
    return group([path('M0 -13L4 -4L13 0L4 4L0 13L-4 4L-13 0L-4 -4Z','#f5c569')],x,y,s)

def arrow(x,y,reverse=False,color='#cd8259'):
    return group([path('M0 0H58M44 -14L60 0L44 14',stroke=color,sw=6)],x,y,-1 if reverse else 1)

def calendar(x,y,s=1,day=15):
    p=[rect(0,0,91,95,'#fffdf7',6,NAVY,2),rect(0,0,91,26,'#d1e5f4',6),
       path('M18 -7V10M73 -7V10',stroke='#557797',sw=5),
       label(45,72,day,41,'#38618e')]
    return group(p,x,y,s)

def speech(x,y,s=1,style='dots'):
    p=[rect(0,0,84,49,'#fff',18,'#91adc8',1.8),
       path('M14 46L12 64L29 46','#fff','#91adc8',1.6)]
    if style=='dots':
        p += [circle(26,24,5,'#80a4c3'),circle(43,24,5,'#80a4c3'),circle(60,24,5,'#80a4c3')]
    elif style=='key':
        p.append(key(19,22,.45))
    elif style=='money':
        p.append(label(40,34,'¥',28,'#d19b4d'))
    return group(p,x,y,s)


def backdrop(accent='#f1f7fc',evening=False):
    sky='#e4e7f1' if evening else '#edf7fb'
    return [rect(0,0,400,248,sky,12),
            circle(337,37,20,'#f8dea4' if not evening else '#d5d4e8'),
            path('M0 190Q118 173 230 188T400 185V248H0Z',accent),
            line(0,220,400,220,'#c4d8cf',2)]

def architecture(scene):
    p=backdrop()
    if scene=='hotel':
        p += [apartments(124,42,.92,3),rect(177,160,36,16,'#dbab73',5),
              label(196,173,'H',13,'#fff'),tree(53,131,.65)]
    elif scene=='apartments':
        p += [apartments(58,37,.98,4),apartments(226,65,.67,3)]
    elif scene=='bungalow':
        p += [house(126,107,1.17),tree(49,118,.68),tree(327,119,.6)]
    elif scene=='cottage':
        p += [house(126,104,1.1,roof='#b98d71',body='#f5dbb8',chimney=True),
              path('M102 212Q190 177 286 211',stroke='#cca992',sw=8),tree(56,111,.75)]
    elif scene=='detached':
        p += [house(132,109,1.12),tree(42,120,.75),tree(342,117,.7)]
    elif scene=='duplex':
        p += [house(71,111,.93,body='#e9e0d3'),house(207,111,.93,body='#dfd5e9'),
              line(200,66,200,208,'#afbac6',3)]
    elif scene=='furnished':
        p += [rect(65,35,271,158,'#f9f3e9',11,'#b8c8d3',2),furniture(95,85,1.35),
              sparkle(316,61,.6)]
    elif scene=='neighborhood' or scene=='residential':
        p += [house(40,111,.65),house(154,111,.68,roof='#98acc6'),
              house(270,111,.65,roof='#d6b781'),tree(125,144,.5),tree(347,147,.45)]
        if scene=='neighborhood':p.append(person(222,152,.5))
    elif scene=='openplan':
        p += [rect(30,52,341,151,'#f9f0e1',12,'#adc3d5',2),
              furniture(51,95,1.12),rect(259,114,72,57,'#e3b77d',6,NAVY,2),
              rect(271,126,48,6,'#a7c1c7',1),line(246,58,246,179,'#dedfd8',1)]
    elif scene=='parking':
        p += [house(45,108,.84),rect(189,175,162,39,'#9ca5b2',4),
              path('M231 173H313L327 198H207Z','#82b0d3',NAVY,2),
              circle(230,202,11,'#465770'),circle(308,202,11,'#465770'),
              path('M193 176L198 162M345 176L351 162',stroke='#fff',sw=3)]
    elif scene=='property':
        p += [house(133,100,1.13),rect(285,139,72,48,'#fffdf3',3,NAVY,2),
              path('M293 150L321 133L350 150',stroke='#86b0c8',sw=4)]
    elif scene=='ranch':
        p += [house(95,121,1.5,roof='#bb886b',body='#efcfaf'),tree(34,136,.58),
              path('M26 216H376',stroke='#bca88d',sw=3)]
    elif scene=='row':
        for j in range(4):p.append(house(11+96*j,120,.65,roof=['#ce9579','#a9b8d6','#d3b280','#bd958d'][j]))
    elif scene=='semi':
        p += [house(83,108,1,body='#e9d5bf'),house(201,108,1,body='#dce8e5'),
              line(201,52,201,209,'#5e7995',2)]
    elif scene=='storage':
        p += [rect(42,61,315,133,'#dce7e9',6,NAVY,2),
              box(77,92,.9),box(184,88,1.25),box(273,128,.72)]
    elif scene=='unfurnished':
        p += [rect(48,37,302,171,'#f8f3e9',10,'#bccbd2',2),
              furniture(119,99,1.35,empty=True),
              rect(80,70,67,75,'#d9ecf5',3,NAVY,2)]
    return p

def people(scene):
    p=backdrop('#e5f1e9')
    p.append(house(202,93,1.05))
    if scene=='agent' or scene=='realtor' or scene=='realtor-business':
        p += [person(81,87,.9,shirt='#7296c4',arm='right'),
              person(315,118,.68,shirt='#b78993',arm='left'),
              key(126,137,.47)]
        if scene=='realtor-business':
            p.append(rect(20,178,144,39,'#f9f3e9',6,NAVY,1.7))
            p.append(label(91,204,'HOME',19,'#557899'))
    elif scene in ('housemate','roommate','roomer','lodger'):
        p += [person(74,91,.85,shirt='#7097bb'),person(164,97,.83,shirt='#d49b88'),
              sparkle(146,64,.6)]
        if scene=='housemate':p.append(key(91,190,.48))
        if scene=='roommate':p += [furniture(239,158,.5),path('M236 181H370',stroke='#be9985',sw=2)]
        if scene=='roomer':p += [rect(269,159,67,52,'#f7eedc',3,NAVY,1.6),key(304,179,.28)]
        if scene=='lodger':p += [box(298,184,.7),key(279,143,.27)]
    elif scene=='landlord':
        p += [person(80,95,.9,shirt='#8e9ab7',arm='right'),
              person(296,125,.66,shirt='#d9a891',arm='forward'),
              key(133,147,.52),speech(49,37,.6,'key')]
    elif scene=='tenant':
        p += [person(254,88,.9,shirt='#81aeab',arm='forward'),
              person(65,131,.66,shirt='#d7a38c',arm='right'),
              key(206,167,.45),sparkle(326,52,.5)]
    return p

def agreement(scene):
    p=backdrop('#e8f0eb')
    if scene in ('bills','lease','notice','maintenance','reference','tenancy'):
        p += [document(133,43,1.3,scene),person(59,130,.55,shirt='#7d9fbd',arm='right')]
        if scene=='bills':p += [coin(304,171,.75),coin(325,198,.55)]
        if scene=='lease' or scene=='tenancy':p += [key(275,172,.65)]
        if scene=='notice':p += [arrow(301,178,True),house(304,90,.5)]
        if scene=='maintenance':p += [path('M319 160l24-33 11 10-23 34',fill='#7c91a0',stroke=NAVY,sw=2)]
        if scene=='reference':p += [circle(313,161,22,'#a3cfa5'),path('M300 162L311 175L328 149',stroke='#fff',sw=6)]
    elif scene in ('deposit','security','rent','renting'):
        p += [house(215,101,.88),person(69,105,.75,shirt='#799dbc',arm='forward'),
              coin(163,159,.62),key(225,195,.55)]
        if scene=='security':
            p += [rect(155,91,45,48,'#e4b86e',4,NAVY,2),
                  path('M165 94V82Q176 57 191 82V94',stroke=NAVY,sw=4)]
        if scene=='deposit':p += [coin(166,212,.4)]
        if scene=='renting':p += [arrow(245,76,True)]
    elif scene=='utilities' or scene=='utilities-included':
        p += [house(47,108,.83),rect(196,63,161,137,'#fff9ed',6,NAVY,2),
              circle(248,112,18,'#f8d480'),path('M248 92V83M229 112H221M270 112H278',stroke='#d1a45d',sw=3),
              path('M290 95L279 123H292L282 152',stroke='#daac5e',sw=6)]
        if scene=='utilities-included':
            p += [circle(341,177,23,'#91c8a1'),path('M328 177l10 10 16-22',stroke='#fff',sw=5)]
    elif scene=='view':
        p += [house(183,87,1.05),person(48,103,.9,shirt='#7d9cbd',arm='right'),
              person(324,121,.62,shirt='#cf957e',arm='left'),sparkle(249,40,.55)]
    return p

def moving(scene):
    p=backdrop('#e6efe8')
    if scene in ('boxes','pack','unpack'):
        p += [box(56,119,1.08,open_top=scene!='boxes'),
              box(165,127,1.05,open_top=scene=='unpack'),
              box(277,137,.81)]
        if scene=='pack':p += [person(313,84,.65,arm='forward'),arrow(159,94,True)]
        if scene=='unpack':p += [person(276,65,.65,arm='left'),sparkle(97,62,.65)]
    elif scene=='party':
        p += [house(209,91,.9),person(68,123,.65,shirt='#d38f88',arm='left'),
              person(154,129,.65,shirt='#76a2cd',arm='right'),
              person(315,125,.63,shirt='#a4bb8d',arm='left')]
        for x,y in [(75,55),(145,49),(231,39),(319,55)]:
            p.append(path(f'M{x} {y}L{x-8} {y-21}L{x+8} {y-20}Z','#f1b967'))
    elif scene=='keys':
        p += [key(105,113,1.75),person(311,109,.65,arm='right'),sparkle(261,65,.8)]
    elif scene in ('movein','moveout','moving'):
        p += [house(238,98,.87),person(83,111,.75,arm='forward'),
              box(153,151,.68,open_top=False),
              arrow(199,135,reverse=(scene=='moveout'))]
        if scene=='moving':p.append(truck(24,149,.42,load=True))
    elif scene=='move-date':
        p += [house(226,103,.85),calendar(54,78,1.16,day=1),key(195,182,.56)]
    elif scene=='moving-truck' or scene=='removal':
        p += [truck(56,99,1.25,load=True),box(18,180,.5),person(342,91,.6,arm='left')]
    return p


def make_svg(kind,scene):
    chunks = {
        'architecture':architecture,'person':people,'agreement':agreement,'moving':moving
    }[kind](scene)
    # A paper-like frame is consistent with Artico cards and leaves the art itself text-free.
    return ("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='248' viewBox='0 0 400 248'>"
            "<rect x='0' y='0' width='400' height='248' rx='14' fill='#fff'/>"
            +''.join(chunks)+"</svg>")


def build():
    source = json.loads((ROOT / 'src/web/vocabularyOrganized.json').read_text(encoding='utf-8'))
    words = {f"{lesson['sourceLesson']}:{term}" for lesson in source['lessons']
             for group in lesson['groups'] for term,*_ in group['items']}
    planned = MANIFEST['entries']
    chapter = next(lesson for lesson in source['lessons'] if lesson['sourceLesson']==13)
    expected = {f"13:{term}" for group in chapter['groups'] for term,*_ in group['items']}
    if set(planned) != expected:
        raise RuntimeError(f'Lesson 13 coverage mismatch: missing={expected-set(planned)}, extra={set(planned)-expected}')
    OUTPUT.mkdir(parents=True,exist_ok=True)
    count = 0
    for term,info in planned.items():
        if term not in words:
            raise ValueError('Unknown vocabulary: '+term)
        filename = '13-'+info['kind']+'-'+info['scene']+'.png'
        target = OUTPUT / filename
        if not target.exists():
            data = _render_svg(make_svg(info['kind'],info['scene']), width=640, height=397)
            rgba = Image.open(io.BytesIO(data)).convert('RGBA')
            rgba.quantize(colors=220,method=Image.Quantize.FASTOCTREE).save(target,'PNG',optimize=True)
        with Image.open(target) as image:
            image.verify()
        if target.stat().st_size < 1500:
            raise RuntimeError(f'Unusually small scene: {filename}')
        count += 1
    print(f'Original Artico scene art: {count} PNGs for all {len(expected)} Lesson 13 entries.')


if __name__ == '__main__':
    build()
