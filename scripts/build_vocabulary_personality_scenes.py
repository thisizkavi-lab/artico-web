#!/usr/bin/env python3
"""Generate original behavior-based educational illustrations for Chapter 18."""
import io
import json
from pathlib import Path
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
from build_vocabulary_original_scenes import (
    ROOT, rect, circle, path, line, label, group, person, document,
    box, coin, house, key, calendar, speech, sparkle, arrow,
    NAVY, SKIN,
)

MANIFEST = json.loads((ROOT / 'src/web/vocabularyPersonalityScenes.json').read_text())
OUTPUT = ROOT / 'public/vocabulary-symbols/original'
PAIR='#d3948b'
TEAL='#7eb4a6'
PURPLE='#8b90bd'


def heart(x,y,s=1):
    return group([path('M0 10C-32 -18 -43 13 0 49C43 13 32 -18 0 10Z','#e58f96',NAVY,1.7)],x,y,s)

def star(x,y,s=1):
    return group([path('M0 -22L7 -6L24 -4L12 9L15 25L0 17L-15 25L-12 9L-24 -4L-7 -6Z','#f7d57e',NAVY,1.4)],x,y,s)

def cloud(x,y,s=1):
    return group([circle(11,18,16,'#c4d6e5'),circle(28,8,20,'#c4d6e5'),
                  circle(49,20,17,'#c4d6e5'),rect(7,17,47,23,'#c4d6e5',8)],x,y,s)

def gift(x,y,s=1):
    return group([rect(0,18,63,43,'#f3bf9a',4,NAVY,2),rect(-6,11,75,13,'#e8a58b',3,NAVY,2),
                  rect(27,14,9,47,'#90b7d2'),path('M30 10C-3 -15 0 11 30 10C67 -15 65 12 30 10',stroke='#90b7d2',sw=5)],x,y,s)

def desk(x,y,s=1,messy=False):
    p=[rect(0,55,125,8,'#ab8b72',2,NAVY,1.5),line(11,65,11,100,'#94765f',4),
       line(116,65,116,100,'#94765f',4)]
    if messy:
        p += [rect(12,25,45,13,'#f4bca7',2,NAVY,1.4),
              rect(63,11,47,14,'#eacb8b',1,NAVY,1.4),
              path('M6 49L25 25L51 45L80 37',stroke='#ba91a0',sw=3),
              circle(96,33,5,'#7bafd0')]
    else:
        p += [rect(7,43,45,10,'#f1bb91',2,NAVY,1.4),rect(7,35,45,7,'#9dbed2',1,NAVY,1.3),
              rect(78,19,31,31,'#cfe8df',3,NAVY,1.5),
              path('M82 35L90 42L105 25',stroke='#65a57b',sw=3)]
    return group(p,x,y,s)

def podium(x,y,s=1):
    p=[path('M0 0H71L59 90H13Z','#c5a287',NAVY,2),rect(-9,-8,87,14,'#e6c29a',3,NAVY,2),
       line(33,-9,33,-24,NAVY,3),circle(33,-26,5,'#4d738e')]
    return group(p,x,y,s)

def clock(x,y,s=1,late=False):
    p=[circle(0,0,27,'#fff',NAVY,2),line(0,0,0,-18,NAVY,3),
       line(0,0,13,8,NAVY,3)]
    if late:p += [path('M-22 -27L-32 -38M22 -27L32 -38',stroke='#d48374',sw=4)]
    return group(p,x,y,s)

def book(x,y,s=1):
    return group([path('M0 0Q27 -9 49 3V53Q23 39 0 48Z','#fffdf7',NAVY,2),
                  path('M0 0Q-27 -9 -49 3V53Q-23 39 0 48Z','#e6f0f7',NAVY,2),
                  line(-33,13,-12,11,'#b2bdc6',2),line(12,11,33,13,'#b2bdc6',2)],x,y,s)

def bubbles(x,y,s=1):
    return group([speech(0,0,.84),speech(56,28,.65)],x,y,s)

def lightning(x,y,s=1):
    return group([path('M-8 -29L15 -24L1 -5L20 -3L-16 32L-6 4L-22 3Z','#f0bd71',NAVY,1.6)],x,y,s)

def target(x,y,s=1):
    return group([circle(0,0,33,'#eab8a5',NAVY,2),circle(0,0,24,'#fff7ed'),
                  circle(0,0,14,'#eab8a5'),circle(0,0,5,'#fff'),path('M-50 17L0 0',stroke=NAVY,sw=3)],x,y,s)

def scene_for(term):
    t=term.lower()
    p=[rect(0,0,400,248,'#eef5fa',11),
       path('M0 201Q140 183 239 198T400 197V248H0Z','#e2efe9'),
       circle(352,44,21,'#f9dfa7')]
    # Composed scenes are intentionally contextual; every term retains its own
    # image and is not assigned a generic adjective icon.
    if t in ('approachable','friendly','outgoing','talkative'):
        p += [person(90,90,.82,shirt=TEAL,arm='right'),
              person(276,100,.78,shirt=PAIR,arm='left'),
              bubbles(159,29,.62)]
        if t=='outgoing':p.append(person(185,140,.5,shirt=PURPLE,arm='right'))
        elif t=='talkative':p += [speech(191,9,.7),speech(271,35,.5)]
        elif t=='friendly':p.append(heart(179,147,.46))
        else:p.append(sparkle(180,144,.7))
    elif t in ('unapproachable','unfriendly','secretive'):
        p += [person(92,97,.85,shirt='#6f91a7',arm='forward',face='sad'),
              person(295,100,.75,shirt=PAIR,arm='down',face='sad')]
        if t=='secretive':p += [rect(191,70,54,77,'#8494b0',5,NAVY,2),circle(227,109,5,'#e9bc76')]
        elif t=='unapproachable':p += [rect(187,65,10,121,'#b4c4d3',2),path('M196 79L215 62',stroke='#b3c4d3',sw=4)]
        else:p += [path('M166 121L231 122',stroke='#dca7a1',sw=5),circle(198,120,16,'#f7dfda')]
    elif t in ('generous','selfish','caring','considerate','kind','mean','insensitive','supportive','unkind','sensitive'):
        p += [person(93,97,.83,shirt=TEAL,arm='forward'),
              person(290,106,.75,shirt=PAIR,arm='left',
                     face='sad' if t in ('mean','unkind','insensitive','sensitive') else 'smile')]
        if t=='generous':p.append(gift(156,142,.69))
        elif t=='selfish':p += [gift(61,163,.67),arrow(242,138,True)]
        elif t in ('caring','kind','supportive','considerate'):p.append(heart(177,153,.63))
        elif t in ('insensitive','mean','unkind'):p += [lightning(201,126,.67),cloud(255,40,.65)]
        else:p += [heart(269,71,.48),cloud(122,37,.45)]
    elif t in ('polite','rude','honest','dishonest'):
        p += [person(91,112,.76,shirt=TEAL,arm='forward'),
              person(300,111,.76,shirt=PAIR,arm='left')]
        if t=='polite':p += [heart(198,142,.5),speech(180,55,.65)]
        elif t=='rude':p += [lightning(191,111,.83),speech(162,50,.61)]
        elif t=='honest':p += [key(173,163,.52),circle(277,42,20,'#9bceac'),
                                  path('M267 41L275 50L289 33',stroke='#fff',sw=4)]
        else:p += [key(70,185,.48),cloud(188,54,.5),lightning(227,120,.52)]
    elif t in ('assertive','confident','nervous','shy','arrogant','public speaking'):
        p += [podium(194,147,1.03),
              person(189,80,.75,shirt='#86aad3',
                     face='sad' if t in ('nervous','shy') else 'smile',
                     arm='right'),
              person(49,153,.52,shirt=PAIR,arm='down'),
              person(333,154,.52,shirt=TEAL,arm='down')]
        if t=='nervous':p += [path('M145 59l-9 -17m18 13l0 -17',stroke='#d0937f',sw=4)]
        elif t=='shy':p.append(cloud(138,42,.52))
        elif t=='arrogant':p.append(star(211,34,.8))
        else:p.append(sparkle(291,65,.7))
    elif t in ('patient / patient (personality trait) (adjective)','impatient','cautious','impulsive','calm','easygoing','laid-back','lazy'):
        p += [person(127,98,.96,shirt=TEAL,arm='down',
                     face='sad' if t in ('impatient',) else 'smile'),
              clock(296,91,1.2,late=(t=='impatient'))]
        if t=='impatient':p += [lightning(215,114,.75),path('M83 75l-15 -10m13 22l-24 2',stroke='#d58979',sw=4)]
        elif t=='impulsive':p += [arrow(196,168),lightning(283,175,.58)]
        elif t=='cautious':p += [rect(247,161,80,29,'#f5d58e',4,NAVY,1.7),label(285,180,'!',20,'#956b5e')]
        elif t=='calm':p += [cloud(176,40,.58),sparkle(242,164,.7)]
        elif t=='lazy':p += [rect(75,196,109,17,'#a1bdd8',7,NAVY,1),cloud(197,54,.5)]
        else:p.append(heart(215,168,.5))
    elif t in ('mature','immature','reasonable','unreasonable','reliable','unreliable','organized'):
        p += [person(96,100,.77,shirt=TEAL,arm='forward'),
              person(297,112,.67,shirt=PAIR,arm='left'),
              desk(178,165,.73,messy=t in ('immature','unreasonable','unreliable'))]
        if t=='reliable':p += [clock(209,51,.57),circle(311,57,17,'#9fceae')]
        elif t=='unreliable':p += [clock(206,50,.55,True),lightning(303,64,.55)]
        elif t=='organized':p.append(star(253,66,.48))
        elif t in ('immature','unreasonable'):p.append(lightning(228,53,.62))
        else:p.append(heart(216,55,.5))
    elif t in ('brave','ambitious','determined','enthusiastic','passionate','motivated','energetic','optimistic'):
        p += [person(95,101,.81,shirt=TEAL,arm='right'),target(276,111,1)]
        if t=='brave':p += [path('M233 178l10-61 26 8-10 51Z','#eab58b',NAVY,2),star(199,54,.58)]
        elif t in ('passionate','enthusiastic'):p += [heart(191,109,.7),star(321,39,.62)]
        else:p += [arrow(192,144),sparkle(308,49,.6)]
    elif t in ('intelligent','talented','creative','eccentric','critical','serious','funny','silly'):
        p += [person(103,106,.85,shirt=TEAL,arm='right'),person(310,143,.54,shirt=PAIR,arm='down')]
        if t=='intelligent':p += [book(222,143,.87),star(274,50,.55)]
        elif t=='talented':p += [star(211,98,1),star(275,56,.65)]
        elif t=='critical':p += [document(199,62,.83),circle(314,72,13,'#f6ca91')]
        elif t=='serious':p += [book(205,143,.8),clock(304,79,.62)]
        elif t in ('funny','silly'):p += [speech(176,40,.77),star(312,83,.6)]
        else:p += [star(212,103,.8),sparkle(280,49,.65)]
    elif t=='personality traits':
        p += [person(84,108,.71,shirt=TEAL,arm='right'),
              person(194,109,.71,shirt=PAIR,arm='left'),
              person(306,108,.71,shirt=PURPLE,arm='right'),
              heart(139,69,.37),star(250,57,.4)]
    else:
        # Refuse to silently make an unrelated image for an unreviewed term.
        raise ValueError('No reviewed personality illustration concept: '+repr(term))
    return ("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='248' viewBox='0 0 400 248'>"
            +''.join(p)+"</svg>")


def build():
    source = json.loads((ROOT / 'src/web/vocabularyOrganized.json').read_text(encoding='utf8'))
    lesson = next(x for x in source['lessons'] if x['sourceLesson']==18)
    expected = {'18:'+term for group in lesson['groups'] for term,*_ in group['items']}
    if set(MANIFEST['entries'])!=expected:
        raise RuntimeError(f'Chapter 18 inventory mismatch: {expected-set(MANIFEST["entries"])}')
    OUTPUT.mkdir(exist_ok=True,parents=True)
    for full,info in MANIFEST['entries'].items():
        term=full.split(':',1)[1]
        target=OUTPUT/('18-'+info['scene']+'.png')
        if not target.is_file():
            svg=scene_for(term)
            png=_render_svg(svg,width=640,height=397)
            photo=Image.open(io.BytesIO(png)).convert('RGBA')
            photo.quantize(colors=220,method=Image.Quantize.FASTOCTREE).save(target,'PNG',optimize=True)
        with Image.open(target) as check:
            check.verify()
        if target.stat().st_size<1500:raise RuntimeError('Invalid generated illustration: '+str(target))
    print('Generated and verified 53 original Chapter 18 personality scene PNGs')


if __name__=='__main__':
    build()
