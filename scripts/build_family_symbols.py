#!/usr/bin/env python3
"""Original relationship and life-stage diagrams for the Social Fluency atlas."""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/course/family-symbols'
OUT.mkdir(parents=True,exist_ok=True)
INK,BLUE,SAGE,ROSE,GOLD,QUIET='#586d7e','#7fabc3','#9cb798','#d7a397','#d8b775','#d9dfe2'

def p(d,fill='none',stroke=INK,width=1.8):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'

def r(x,y,w,h,fill,rx=3):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{INK}" stroke-width="1.5"/>'

def c(x,y,radius,fill):
    return f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}" stroke="{INK}" stroke-width="1.4"/>'

def person(x,y,s=1,color=BLUE,kind='adult',pose='rest',quiet=False):
    hair='#abb1ae' if kind in ('older','senior') else '#75685e'
    skin='#ebc7aa' if not quiet else '#e1d9d0'
    color=QUIET if quiet else color
    a=p('M10 35Q20 28 30 35L34 63H6Z',color)+p('M13 62 11 91M27 62 29 91',stroke='#8b9eb0' if not quiet else QUIET,width=7)+p('M6 94H15M26 94H35',stroke=INK,width=4)
    arm='M9 38 2 60M31 38 38 60' if pose=='rest' else 'M9 38-1 24-2 13M31 38 42 26'
    a+=p(arm,stroke=color,width=6)+p('M17 28V35H23V28',skin,skin)
    a+=f'<ellipse cx="20" cy="18" rx="11" ry="13" fill="{skin}" stroke="#ac9887" stroke-width="1.1"/>'
    a+=p('M9 20Q4 1 18 3Q36-1 32 20L27 10Q18 14 13 9Z',hair,hair)
    if kind in ('woman','girl'): a+=p('M9 12 7 29M31 12 33 29',stroke=hair,width=4)
    a+=p('M16 19v1M24 19v1',stroke='#5c5f60',width=1.3)+p('M17 26Q20 28 24 25',stroke='#b38f7c',width=1)
    if kind in ('older','senior'):
        a+=p('M11 18H18V23H11ZM22 18H29V23H22ZM18 20H22',stroke=INK,width=.9)
    if kind=='teen': a+=p('M7 14Q20-5 33 14M7 14V24M33 14V24',stroke='#667e94',width=3)
    return f'<g transform="translate({x} {y}) scale({s})">{a}</g>'

def heart(x,y,s=1):
    return f'<g transform="translate({x} {y}) scale({s})">'+p('M10 20 1 10C-5-1 8-4 10 4C15-4 27 1 19 11Z',ROSE,ROSE)+'</g>'

def rings(x,y):
    return f'<g transform="translate({x} {y})">{c(0,0,9,GOLD)}{c(12,1,9,GOLD)}{c(0,0,5,"#fbfaf5")}{c(12,1,5,"#fbfaf5")}</g>'

def house(x,y,s=1):
    return f'<g transform="translate({x} {y}) scale({s})">'+p('M3 30 33 5 63 30',ROSE)+r(10,29,47,46,'#e7e9de')+r(29,48,12,27,BLUE)+r(15,38,10,12,GOLD)+r(45,38,8,12,GOLD)+'</g>'

def family_role(term):
    a=p('M62 26H98M80 26V51M45 51H115M45 51V55M80 51V55M115 51V55',stroke='#aabcc2',width=1.5)
    is_parent=term=='parents'
    a+=person(50,1,.34,BLUE,quiet=not is_parent)+person(88,1,.34,SAGE,kind='woman',quiet=not is_parent)
    selected={'oldest child':0,'middle child':1,'youngest child':2}.get(term)
    for i,(x,scale) in enumerate([(32,.55),(69,.45),(106,.35)]):
        a+=person(x,55,scale,[BLUE,ROSE,SAGE][i],quiet=is_parent or selected is not None and selected!=i)
        if selected==i: a+=p(f'M{x+3} 109h22',stroke=GOLD,width=3)
    return a

def baby(x=45,y=41):
    return f'<g transform="translate({x} {y})">'+p('M0 27Q31-7 68 27L61 54Q24 67 5 44Z','#c3d7e0')+c(20,17,11,'#ebc7aa')+p('M14 17h1M24 17h1M17 23q4 3 7-1',width=1)+p('M30 20 48 46M35 12 58 35',stroke='#91adbd')+'</g>'

art={}
art['siblings']=p('M53 16H106M80 16V34M48 34H111M48 34V43M111 34V43',stroke='#a7b8be')+person(31,44,.65,BLUE)+person(95,51,.55,SAGE,kind='girl')
art['twins']=p('M48 19H111M80 19V37M48 37H111M48 37V44M111 37V44',stroke='#a7b8be')+person(31,43,.66,ROSE,kind='girl')+person(95,43,.66,ROSE,kind='girl')
art['only child']=person(53,2,.32,BLUE,quiet=True)+person(92,2,.32,SAGE,quiet=True)+p('M67 28H108M85 28V49',stroke='#a7b8be')+person(66,49,.6,ROSE)
for term in ['oldest child','middle child','youngest child','parents','children']: art[term]=family_role(term)
for term in ['grandparents','grandchildren']:
    focus=term=='grandparents'
    art[term]=person(32,5,.73,BLUE,kind='older',quiet=not focus)+person(97,5,.73,SAGE,kind='older',quiet=not focus)+p('M58 80H112M84 80V87M58 87H112',stroke='#a7b8be')+person(51,82,.28,ROSE,quiet=focus)+person(101,82,.28,GOLD,quiet=focus)
art['single parent']=person(41,9,.95,BLUE,kind='woman')+person(102,51,.52,SAGE)+p('M77 64 100 75',stroke='#d9b594',width=4)
art['partner']=person(28,14,.92,BLUE)+person(101,14,.92,SAGE,kind='woman')+heart(72,10,.65)+p('M61 74H100',stroke=ROSE,width=2)
for term in ['spouse','married','husband','wife','engaged']:
    a=person(28,17,.88,BLUE,quiet=term=='wife')+person(99,17,.88,ROSE,kind='woman',quiet=term=='husband')+rings(74,63)
    if term=='engaged': a+=p('M68 36H94',stroke='#a7b8be',width=1.5)+p('M83 41 91 36 83 31',stroke='#a7b8be')
    else: a+=p('M60 37H100',stroke='#a7b8be',width=1.5)
    art[term]=a
art['single']=person(62,10,1,SAGE)
for term in ['divorced','ex-husband','ex-wife','divorce']:
    art[term]=person(20,14,.92,BLUE,quiet=term=='ex-wife')+person(113,14,.92,ROSE,kind='woman',quiet=term=='ex-husband')+p('M65 47H73M87 47H95',stroke='#a7b8be')+p('M80 25V91',stroke='#b7c0c4',width=1)
art['colleague']=person(25,5,.72,BLUE)+person(109,5,.72,SAGE)+r(11,70,139,8,'#c5b29a')+p('M26 78V108M136 78V108')+r(59,49,40,26,'#e3eaf0')+p('M78 76V83M65 84H93')
art['friend']=person(28,17,.9,BLUE,pose='wave')+person(101,17,.9,SAGE,pose='wave')+p('M72 29 78 22M84 26 88 17',stroke=GOLD)
art['neighbour / neighbor']=house(4,9,.83)+house(98,9,.83)+person(57,47,.62,BLUE)+person(91,47,.62,SAGE)+p('M74 47V108',stroke='#c6b99f',width=2)

art['birth']=baby()+person(22,5,.42,SAGE,kind='woman')+person(110,5,.42,BLUE)
art['birthday']=person(7,25,.75,BLUE)+person(124,25,.75,ROSE)+r(58,69,46,24,'#efd5bc')+p('M55 94H109M62 78H100M69 68V54M82 68V50M94 68V55',stroke=INK)+c(69,51,3,GOLD)+c(82,47,3,GOLD)+c(94,52,3,GOLD)
art['graduation']=person(57,13,1,BLUE)+p('M52 16 77 5 104 16 77 27Z',INK)+p('M98 20V38',stroke=GOLD,width=2)+r(98,64,30,11,'#eee3cd')+p('M113 64V75',stroke=ROSE,width=3)
art['first job']=person(45,9,1,SAGE)+r(92,66,39,27,'#c1aa88')+p('M104 65V59H120V65M93 78H130M107 75H117V82H107Z')
art['promotion']=p('M13 104V88H40V70H68V51H96V104Z','#c9d9df')+person(103,9,.94,BLUE)+p('M21 63 70 18M54 18H70V35',stroke=SAGE,width=3)
art['falling in love']=person(28,17,.92,BLUE)+person(101,17,.92,ROSE,kind='woman')+heart(68,6,1.15)
art['wedding']=p('M15 105V34Q15 5 80 5Q145 5 145 34V105',stroke=SAGE,width=4)+person(40,23,.84,BLUE)+person(91,23,.84,ROSE,kind='woman')+rings(73,68)+c(18,25,6,GOLD)+c(142,25,6,GOLD)
art['holiday / vacation']=person(16,14,.95,SAGE)+r(55,73,28,29,GOLD)+p('M64 73V63H73V73')+p('M119 46 112 105',stroke='#aa8c67',width=5)+p('M118 48Q93 24 83 38Q102 31 118 48M119 46Q132 20 145 31Q133 29 119 46M120 47Q138 41 150 59Q133 49 120 47',SAGE)+c(139,13,10,GOLD)
art['new home']=house(81,12,1.04)+person(19,12,.98,BLUE)+c(74,74,7,GOLD)+p('M74 81V99M74 91H82M74 97H80',stroke='#b89e63',width=3)
art['retirement']=person(40,13,.98,SAGE,kind='older')+r(85,59,48,23,'#e7dcc6')+p('M109 60V82M90 64H102M115 65H128')+p('M98 100V91H132V100',stroke='#a9b49d',width=2)
art['funeral']=r(56,8,48,57,'#d5dadd')+person(66,15,.51,'#b4bdc3',quiet=True)+p('M92 10 102 20',stroke=INK,width=3)+p('M45 64 65 105H96L116 64Z','#d3dbc9')+''.join(p(f'M80 97 {x} {y}',stroke=SAGE)+c(x,y,8,'#f0e4cf') for x,y in [(48,61),(72,58),(96,60),(111,69)])

art['baby']=baby(44,28)
art['toddler']=person(61,45,.62,GOLD,pose='wave')
art['child']=person(59,32,.77,SAGE)
art['girl']=person(59,32,.77,ROSE,kind='girl')
art['boy']=person(59,32,.77,BLUE)
art['teenager']=person(58,19,.91,BLUE,kind='teen')+r(88,50,17,30,SAGE)
art['adult']=person(58,9,1.02,SAGE)
art['woman']=person(58,9,1.02,ROSE,kind='woman')
art['man']=person(58,9,1.02,BLUE)
art['older adult']=person(58,9,1.02,SAGE,kind='older')
art['senior citizen']=person(31,12,.98,BLUE,kind='senior')+person(96,12,.98,ROSE,kind='senior')

expected=['siblings','twins','only child','oldest child','middle child','youngest child','parents','children','grandparents','grandchildren','single parent','partner','spouse','engaged','married','single','divorced','husband','wife','ex-husband','ex-wife','colleague','friend','neighbour / neighbor','birth','birthday','graduation','first job','promotion','falling in love','wedding','holiday / vacation','divorce','new home','retirement','funeral','baby','toddler','child','girl','boy','teenager','adult','woman','man','older adult','senior citizen']
assert set(art)==set(expected)
for term,drawing in art.items():
    slug=re.sub('[^a-z0-9]+','-',term.lower()).strip('-')
    (OUT/f'{slug}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112" width="160" height="112" role="img"><title>{term}</title>{drawing}</svg>\n')
print(f'Prepared {len(art)} relationship, life-event and age illustrations.')
