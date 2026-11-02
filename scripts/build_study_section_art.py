#!/usr/bin/env python3
"""Build content-specific Social Fluency SVG illustrations from reviewed plans.

Reuse this project's existing vector focal artwork without its vocabulary-card
backdrops. New diagram primitives are native SVG. No remote media or image API.
"""
from pathlib import Path
from copy import deepcopy
from io import BytesIO
import json
import re
import subprocess
import xml.etree.ElementTree as ET
from PIL import Image
import resvg_py

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/course/study-sections'
OUT.mkdir(parents=True, exist_ok=True)
SVG = 'http://www.w3.org/2000/svg'
ET.register_namespace('', SVG)
plans = json.loads(subprocess.check_output(['node', '--input-type=module', '-e',
    "import {studyVisualPlans} from './scripts/study-visual-plans.mjs'; console.log(JSON.stringify(studyVisualPlans))"], cwd=ROOT))

INK, BLUE, SAGE, GOLD, ROSE, PAPER = '#53677b', '#9eb9d0', '#a9bca4', '#dfbd78', '#d9a89d', '#fbfaf5'

def path(d, fill='none', stroke=INK, width=2.4, extra=''):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'

def rect(x,y,w,h,fill=PAPER,rx=5,stroke=INK):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="2.2"/>'

def circle(x,y,r,fill=PAPER,stroke=INK):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2.2"/>'

def paper(kind='list'):
    art = rect(20,8,60,84,PAPER,5) + path('M32 34H68M32 44H68M32 54H62M32 64H68M32 74H55',stroke='#9badb9',width=2)
    if kind == 'cv': art += circle(39,24,7,BLUE) + path('M52 21H69M52 27H65')
    elif kind in ('contract','membership'): art += path('M36 79q5-14 9-1t11-2',stroke='#7f8da3')
    else: art += rect(30,17,39,6,BLUE,2,BLUE)
    return art

custom = {
 'apple': path('M50 29C24 11 12 45 24 72Q31 91 50 82Q72 94 81 65C94 32 68 16 50 29Z',ROSE)+path('M50 29Q48 14 57 8')+path('M56 18Q69 4 79 13Q69 25 56 18Z',SAGE),
 'alarm': circle(50,48,31,PAPER)+circle(50,48,17,BLUE)+path('M16 14 6 25M84 14 94 25M38 88H62')+circle(50,48,4,GOLD),
 'bell': path('M26 67H74L68 56V36Q66 16 50 16Q34 16 32 36L31 56Z',GOLD)+path('M16 73H84M42 83Q50 95 58 83')+circle(50,10,4,ROSE),
 'building': rect(23,10,54,82,BLUE)+''.join(rect(x,y,10,10,PAPER,1) for y in [23,43,63] for x in [33,56])+rect(44,77,12,15,SAGE,0),
 'calculator': rect(22,7,56,85,BLUE,8)+rect(30,16,40,17,PAPER,3)+''.join(rect(x,y,8,8,GOLD if x==62 else PAPER,2) for x in [30,46,62] for y in [44,60,76]),
 'chart': path('M14 14V85H91')+rect(27,56,12,26,SAGE,1)+rect(48,39,12,43,BLUE,1)+rect(69,20,12,62,GOLD,1)+path('M23 41 46 24 65 31 85 10',stroke='#b3906d'),
 'comb': rect(13,30,74,11,GOLD,4)+''.join(path(f'M{x} 40V69',stroke='#ad9063',width=4) for x in range(20,84,9)),
 'film': rect(8,18,84,66,BLUE,4)+rect(22,29,56,44,PAPER,2)+''.join(rect(x,y,6,6,INK,1,INK) for x in range(13,88,15) for y in [21,75])+path('M43 39 62 51 43 64Z',GOLD),
 'flowers': path('M25 53 49 92 76 52Z',GOLD)+''.join(path(f'M50 83 {x} {y}',stroke='#8a9d80',width=2) + circle(x,y,10,ROSE if x<50 else BLUE) + circle(x,y,3,GOLD) for x,y in [(27,30),(50,20),(73,31),(48,46)]),
 'fridge': rect(21,7,58,86,PAPER,7)+path('M22 39H78M31 21V31M31 52V67')+rect(30,46,39,37,'#e6edf0',3,'#e6edf0')+path('M31 52V67'),
 'globe': circle(50,43,31,BLUE)+path('M20 43H80M24 29H76M24 57H76M50 12Q21 43 50 74Q79 43 50 12M50 76V89M31 91H69',stroke=PAPER,width=2),
 'hanger': path('M43 21Q42 7 53 10Q69 15 56 28V39L13 67Q8 72 16 76H84Q93 73 87 67L56 46',stroke='#a7876d',width=4),
 'heart': path('M50 82 16 47C-2 20 29 2 50 26C72 2 102 21 84 47Z',ROSE),
 'leak': path('M15 14V40H64V60',stroke=BLUE,width=14)+path('M10 10H22M10 25H22M55 55H72',stroke=INK,width=3)+path('M64 68Q43 92 64 94Q84 92 64 68Z',BLUE)+path('M35 92H19M87 91H95',stroke=BLUE),
 'mirror': f'<ellipse cx="50" cy="41" rx="29" ry="35" fill="#dfeaf0" stroke="{INK}" stroke-width="4"/>'+path('M50 77V91M33 92H68M30 39 50 17M45 56 69 30',stroke='#acb5ae',width=3),
 'oven': rect(10,10,80,80,PAPER,5)+rect(18,37,64,43,BLUE,3)+rect(28,46,44,25,'#e2e8e8',3)+''.join(circle(x,23,4,GOLD) for x in [25,44,63,78])+path('M21 43H78'),
 'pause': rect(30,19,13,63,BLUE,4)+rect(57,19,13,63,SAGE,4),
 'paw': f'<ellipse cx="50" cy="67" rx="24" ry="20" fill="{SAGE}" stroke="{INK}" stroke-width="2"/>'+''.join(f'<ellipse cx="{x}" cy="{y}" rx="9" ry="13" fill="{SAGE}" stroke="{INK}" stroke-width="2"/>' for x,y in [(19,43),(38,25),(63,25),(82,43)]),
 'pitcher': path('M25 10H69L64 23V83Q42 97 22 83V23Z',BLUE)+path('M69 29Q101 26 89 63Q85 72 67 67',width=5)+path('M28 31H64M31 18H58',stroke=PAPER),
 'postbox': rect(14,22,72,55,BLUE,9)+path('M16 43H84M50 78V96')+rect(24,30,41,5,INK,1)+path('M69 21V9H87V21Z',ROSE),
 'question': path('M18 14H82Q94 14 94 26V65Q94 75 80 75H43L25 92V75H18Q6 75 6 63V26Q6 14 18 14Z',PAPER)+path('M38 32Q41 20 54 24Q74 31 52 49V55',stroke='#7799ae',width=6)+circle(51,65,3,GOLD),
 'returns': path('M20 34Q43 4 76 29Q107 59 72 83Q46 101 27 75',stroke='#829eac',width=8)+path('M20 13V35H43',stroke='#829eac',width=8),
 'road': path('M34 7 15 95H85L66 7Z',BLUE)+path('M50 17V32M50 45V61M50 75V91',stroke=PAPER,width=4),
 'search': circle(43,41,28,'#e3edf1')+path('M63 63 90 91',stroke='#9c947f',width=12)+path('M26 34Q30 23 42 22',stroke=PAPER,width=4),
 'seats': rect(12,18,29,40,BLUE,9)+rect(59,18,29,40,ROSE,9)+path('M9 62H44V77H9ZM56 62H91V77H56Z',SAGE)+path('M15 78V92M38 78V92M62 78V92M85 78V92'),
 'settings': path('M41 7H59L64 21 79 24 89 41 80 53 81 69 65 79 51 74 37 81 20 72 20 56 11 44 20 28 36 23Z',BLUE)+circle(50,45,17,PAPER),
 'shield': path('M50 6Q69 20 85 18V53Q85 78 50 95Q15 78 15 53V18Q33 20 50 6Z',SAGE)+path('M31 48 44 61 70 32',stroke=PAPER,width=7),
 'sign': path('M49 8V94',stroke='#9d886d',width=5)+path('M12 13H75L90 27 75 41H12Z',BLUE)+path('M88 50H24L9 64 24 78H88Z',GOLD),
 'soil': path('M21 41H79L71 88Q51 97 29 88Z',ROSE)+f'<ellipse cx="50" cy="41" rx="30" ry="10" fill="#9d8065" stroke="{INK}" stroke-width="2"/>'+path('M23 29 34 19M54 18 62 9M76 25 86 17',stroke='#9d8065',width=3),
 'speaker': rect(20,9,60,84,BLUE,7)+circle(50,64,20,PAPER)+circle(50,64,9,SAGE)+circle(50,28,8,GOLD),
 'stairs': path('M9 87V68H29V48H49V28H69V9H90V87Z',BLUE)+path('M14 59 73 3M72 3H55M73 3V20',stroke=SAGE,width=4),
 'timetable': rect(9,15,82,73,PAPER,5)+rect(9,15,82,19,BLUE,5)+path('M30 8V23M69 8V23M15 53H84M15 69H84M36 38V82M62 38V82')+rect(41,56,17,10,GOLD,2,GOLD),
 'tree': path('M48 47V94',stroke='#a88b68',width=8)+circle(28,40,21,SAGE)+circle(54,28,25,'#b6cba9')+circle(73,47,23,SAGE)+path('M48 72 30 55M50 63 71 48',stroke='#a88b68',width=4),
 'watering': path('M16 36H60L67 80Q45 95 22 82Z',SAGE)+path('M22 36Q5 10 33 17V36M60 48 84 22 91 28 65 67',stroke=INK,width=4)+path('M86 33 93 39M82 40 89 48M77 47 83 56',stroke=BLUE,width=3),
 'window': rect(13,9,74,82,BLUE,3)+rect(19,15,62,70,'#e1edf1',0)+path('M50 15V85M20 49H80M8 95H92')+path('M27 28 38 19M57 72 72 59',stroke=PAPER,width=4),
 'yarn': circle(48,47,31,ROSE)+path('M23 29Q71 37 72 68M17 44Q57 44 67 73M22 64Q31 28 50 16M32 76Q51 30 66 22M62 77Q92 98 95 73',stroke='#b88883',width=3),
 'whisk': path('M25 90 46 52',stroke='#ac946e',width=9)+path('M45 52C1 8 62-7 75 16Q92 43 45 52ZM45 52Q40 9 68 11M45 52Q75 28 68 11',stroke='#839eb0',width=3),
}
for key in ['cv','contract','membership','recipe','list','application']:
    custom[key] = paper(key)
custom['help'] = path('M9 68 32 48 50 53 72 36 90 48 65 74 43 81Z',SAGE)+path('M32 48 45 61 60 57M10 68 22 84M90 48 77 29',stroke=INK,width=3)
custom['people'] = circle(27,26,13,GOLD)+circle(73,26,13,BLUE)+circle(50,46,14,ROSE)+path('M7 69V51Q27 39 44 52M57 52Q74 40 94 53V72M28 89V70Q50 51 72 70V89',SAGE)

# Review overrides distinguish homonyms (PIN/pin, train/train, plane/plane)
# and keep an actual object when an older illustration's focal layer shows
# only its action or user. These are physical teaching drawings, not fallbacks.
custom.update({
 'bag': path('M21 28H79L85 91H15Z',GOLD)+path('M35 36V22Q50-1 65 22V36',stroke='#9c8c72',width=4)+path('M24 84H77',stroke='#c4a16a'),
 'basket': path('M12 41H88L77 89H23Z',GOLD)+path('M28 40Q30 3 51 6Q72 6 74 40',stroke='#ab8b60',width=4)+path('M29 54 34 77M49 52V79M69 54 64 77',stroke='#bb9b6c',width=3),
 'board': rect(12,22,76,62,'#d1b38b',9)+circle(76,34,4,PAPER)+path('M19 44H72M19 55H72M19 67H72',stroke='#bea07d',width=1),
 'bowl': f'<ellipse cx="50" cy="36" rx="40" ry="14" fill="{PAPER}" stroke="{INK}" stroke-width="2.5"/>'+path('M10 37Q14 83 50 84Q86 82 90 37Z',BLUE)+path('M23 47Q49 57 77 47',stroke=PAPER,width=2),
 'brush': path('M37 65 66 10Q72 1 79 7Q86 11 80 20L51 73Z',SAGE)+path('M29 65 48 74Q41 92 14 91Q24 84 29 65Z','#b39b7b')+path('M35 63 54 71',stroke='#9eaab2',width=7),
 'check': circle(50,50,35,SAGE)+path('M29 49 45 64 73 32',stroke=PAPER,width=7),
 'chat': path('M8 18H68Q77 18 77 27V54Q77 63 67 63H35L20 78V63H8Q1 63 1 54V27Q1 18 8 18Z',BLUE)+path('M41 38H92Q99 38 99 48V72Q99 80 90 80H81V94L65 80H41Q32 80 32 72V49Q32 38 41 38Z',SAGE)+path('M12 30H59M12 40H48M45 51H88M45 60H79',stroke=PAPER,width=2),
 'curtain': rect(7,9,86,7,'#b6a68c',2)+path('M10 16H48Q44 45 27 55L12 90Z',ROSE)+path('M90 16H52Q57 45 74 55L88 90Z',ROSE)+path('M23 22 21 50M38 22 30 47M77 22 79 50M62 22 70 47',stroke='#c08d85')+path('M12 60H28M73 60H88',stroke=GOLD,width=4),
 'fire': path('M49 7Q69 31 66 42Q82 33 81 52Q98 81 64 92Q28 104 16 74Q8 55 32 30Q29 54 42 48Q53 34 49 7Z',GOLD)+path('M50 55Q82 83 56 91Q28 94 39 72Z',ROSE),
 'game': rect(9,9,82,82,SAGE,6)+''.join(rect(x,y,18,18,PAPER if (x+y)//18%2 else BLUE,0) for x in [15,33,51,69] for y in [15,33,51,69])+circle(25,61,7,ROSE)+circle(60,28,7,GOLD),
 'help': path('M7 54 24 40 45 47 56 36 86 45 90 59 62 81 44 76 29 83 10 68Z','#e6c1a5')+path('M25 41 42 59 53 48 69 54 61 62M42 59 56 73M33 63 45 76',stroke='#a99283',width=2)+path('M3 51 14 72 25 63 15 43ZM91 42 78 64 91 72 100 51Z',BLUE),
 'knife': path('M15 16 27 8 60 54 50 65Z','#8da3b4')+path('M49 65 59 54 90 86Q96 94 85 97Z','#a89174')+path('M17 20 47 61',stroke=PAPER,width=2),
 'lock': rect(20,40,60,50,GOLD,8)+path('M32 41V28Q32 4 50 7Q69 6 69 29V41',stroke='#91a7b4',width=8)+circle(50,62,5,INK)+path('M50 68V76',stroke=INK,width=4),
 'map': path('M6 21 34 10 66 22 94 10V80L66 94 34 82 6 94Z','#e9ecda')+path('M34 12V81M66 23V92',stroke='#afc0bc',width=1.4)+path('M8 53 38 47 58 65 92 47',stroke=BLUE,width=6)+path('M56 65 72 66 81 82',stroke=GOLD,width=3)+path('M75 28Q61 14 69 7Q79-3 87 8Q95 16 75 28Z',ROSE)+circle(78,11,3,PAPER),
 'pan': f'<ellipse cx="42" cy="63" rx="35" ry="18" fill="{BLUE}" stroke="{INK}" stroke-width="3"/>'+path('M72 54 95 18',stroke=INK,width=10)+path('M72 54 95 18',stroke='#a9b6be',width=5)+f'<ellipse cx="42" cy="60" rx="28" ry="12" fill="#e8ecec" stroke="{INK}" stroke-width="1.5"/>',
 'passport': rect(18,5,64,89,BLUE,7)+circle(50,48,22,'#bfd2d9')+path('M29 48H71M50 26Q29 49 50 70Q72 49 50 26M37 35H64M37 60H63M34 81H66',stroke=INK,width=1.6),
 'pin': path('M50 94C44 77 10 49 17 26C24-7 77-5 84 29C88 48 59 78 50 94Z',ROSE)+circle(50,31,13,PAPER),
 'plate': circle(50,50,40,PAPER)+circle(50,50,31,'#eaf0ed')+path('M28 23Q47 10 67 24',stroke='#b7c9cc',width=2),
 'pool': rect(8,30,84,55,BLUE,5)+path('M30 72V16Q30 4 40 4Q50 4 50 16V72M30 25H50M30 40H50M30 55H50',stroke=PAPER,width=3)+path('M12 68Q22 61 32 68T52 68T72 68T92 68',stroke='#d4e4e7',width=2),
 'price': path('M11 31 39 8 88 58 59 89 11 41Z',GOLD)+circle(29,30,5,PAPER)+path('M39 43 65 69M46 37 73 62',stroke='#a78e66',width=3),
 'scales': rect(13,71,74,16,BLUE,4)+path('M48 72V50',stroke=INK,width=7)+circle(50,41,24,PAPER)+path('M50 41 65 28M31 41H35M50 20V25M70 41H66',stroke=INK,width=2)+path('M11 10H88V18H11Z',SAGE),
 'score': rect(8,13,84,67,BLUE,5)+rect(17,23,29,37,PAPER,2)+rect(55,23,29,37,PAPER,2)+path('M29 35H37M29 48H37M64 35H72M64 48H72M28 81V93M72 81V93',stroke='#96a9b5',width=3),
 'screen': rect(6,12,88,57,'#dfe8eb',4)+path('M47 69V88M28 91H73',stroke=INK,width=4)+path('M31 27 57 41 31 55Z',BLUE),
 'shirt': path('M34 13 20 18 4 44 21 55 31 40V91H72V40L83 55 98 44 82 18 66 13Q51 33 34 13Z',SAGE)+path('M35 13Q50 43 65 13M37 84H66',stroke='#7d9e81',width=2),
 'shop': rect(15,37,71,54,PAPER,4)+path('M9 31 21 11H81L92 31Z',BLUE)+path('M10 31V41Q18 51 27 41Q36 51 45 41Q53 51 63 41Q73 51 82 41Q89 47 92 41V31',GOLD)+rect(26,56,22,35,'#d8e5e7',1)+rect(57,57,19,19,ROSE,1),
 'stage': path('M11 13H89V79H11Z','#d7e1e5')+path('M5 77H95V89H5ZM15 90H85V97H15Z','#baa48b')+path('M14 14 40 14 26 63 15 74ZM86 14H60L74 63 85 74Z',ROSE)+path('M45 15 50 53 56 15',GOLD,GOLD,width=1),
 'stove': rect(9,11,82,79,PAPER,5)+circle(30,34,14,BLUE)+circle(70,34,14,SAGE)+circle(30,66,14,SAGE)+circle(70,66,14,BLUE)+path('M17 95H83',stroke=INK,width=2),
 'tooth': path('M49 20Q23 3 13 22Q5 34 17 55L27 88Q33 102 40 73Q50 43 59 72Q69 103 76 85L87 47Q101 11 74 12Q62 12 49 20Z',PAPER)+path('M28 27Q38 21 48 29',stroke='#b2c6cc',width=3),
 'ticket': path('M7 20H93V42Q78 50 93 58V80H7V58Q22 50 7 42Z',GOLD)+path('M63 26V34M63 40V48M63 54V62M63 68V75M26 34H50M26 47H50M27 63H45',stroke='#aa916c',width=2),
 'tv': rect(7,18,86,61,'#657d90',6)+rect(14,25,72,46,'#c8dbe2',3)+path('M33 4 49 18 68 4M50 80V91M31 93H70',stroke=INK,width=3),
 'video': rect(7,17,86,61,'#c5d8df',5)+circle(33,38,9,ROSE)+circle(68,38,9,GOLD)+path('M20 65V56Q33 44 46 56V65ZM55 65V56Q68 44 81 56V65Z',BLUE)+path('M31 79V91M70 79V91M20 93H81',stroke=INK,width=3),
})
custom['library']=rect(13,32,74,56,PAPER,2)+path('M7 31 50 5 93 31Z',BLUE)+''.join(rect(x,43,8,36,SAGE,1) for x in [23,46,69])+path('M8 91H92M15 96H85',stroke=INK,width=3)
custom['landmark']=custom['library']
custom['library']+=path('M29 62Q40 58 50 66Q61 58 73 62V82Q59 77 50 85Q39 77 29 82Z',GOLD)+path('M50 66V85',stroke=INK,width=1.5)
custom['pharmacy']=custom['shop']+rect(43,20,13,30,SAGE,1)+rect(34,29,31,12,SAGE,1)
custom['hospital']=rect(11,36,78,57,PAPER,3)+rect(31,9,39,83,'#d4e0e4',2)+rect(42,66,18,26,BLUE,1)+rect(44,17,12,30,SAGE,1)+rect(35,26,30,12,SAGE,1)+''.join(rect(x,y,9,10,BLUE,1) for x in [17,75] for y in [46,66])
custom['entrygate']=rect(8,15,14,79,BLUE,2)+rect(78,15,14,79,BLUE,2)+path('M8 15Q50-5 92 15M21 53H78',stroke='#a6b8c1',width=5)+circle(50,53,7,GOLD)+path('M50 60V85M50 60 32 79M50 60 68 79',stroke=INK,width=3)
custom['hairbrush']=rect(39,52,21,43,'#bfa989',7)+f'<ellipse cx="50" cy="31" rx="26" ry="29" fill="{ROSE}" stroke="{INK}" stroke-width="2"/>'+''.join(path(f'M{x} {y}v6',stroke=INK,width=1.5) for x in [36,46,56,66] for y in [18,30,42])
custom['fruit']=f'<g transform="translate(2 22) scale(.63)">{custom["apple"]}</g>'+circle(73,65,23,GOLD)+path('M43 45Q77 36 84 12Q92 51 51 62Z','#ead18b')+path('M72 41 80 20',stroke='#baa268',width=1.5)
custom['post']=rect(12,9,76,82,PAPER,5)+rect(20,18,60,39,'#c9dce3',2)+path('M21 54 39 34 49 45 61 29 80 55',SAGE)+circle(64,28,6,GOLD)+path('M23 68H76M23 78H61',stroke='#90a3b3',width=2)
custom['pot']=rect(22,35,56,50,BLUE,7)+path('M21 47H8V63H22M79 47H92V63H79M17 35H83M42 23H58V31',stroke=INK,width=4)+path('M24 30Q50 13 76 30Z',SAGE)+path('M31 49V72',stroke=PAPER,width=3)
custom['flowerpot']=path('M19 29H81L70 92H30Z',ROSE)+rect(15,24,70,13,GOLD,3)+path('M32 46 38 81M68 46 62 81',stroke='#bd9384',width=2)
custom['tools']=path('M19 9 34 21 29 39 84 83 76 93 20 49 9 37 11 19 21 29 29 23Z',BLUE)+path('M62 43 48 31 61 14 81 10 92 24 74 38Z',SAGE)+path('M58 45 19 87',stroke='#b19574',width=11)+path('M56 45 20 86',stroke=INK,width=2)
custom['bank']=path('M8 32 50 8 92 32Z',BLUE)+rect(14,33,72,9,PAPER,0)+''.join(rect(x,43,9,36,SAGE,1) for x in [22,46,70])+path('M10 84H90M5 92H95',stroke=INK,width=4)+circle(50,24,6,GOLD)

aliases = {
 'baggage':'luggage','brake':'brakes','cap':'@cap','body':'@body','bookmark':'@bookmark',
 'badge':'@name-tag','books':'bookcase','cat':'@cat','chat':'@chat','clock':'@clock','coin':'coins',
 'desktop':'desktop-computer','document':'@document','dog':'@dog','fruit':'fruit-salad',
 'gate':'departure-gate','home':'@house','landmark':'@museum','locker':'lockers',
 'notebook':'@book','packing':'boxes','pan':'frying-pan','parcel':'@package','plant':'@plant',
 'posting':'job-posting','pot':'@pot','pump':'cycle-pump','shelf':'shelves','shirt':'@clothes',
 'shoe':'@shoe','sofa':'@sofa','torch':'@flashlight','trainer':'personal-trainer','wave':'waves',
 'weight':'@dumbbell','wifi':'wi-fi','phone':'smartphone','card':'credit-card','board':'cutting-board',
 'bike':'@bike','plane':'44:airplane','train':'44:train','bus':'44:bus','car':'44:car',
}

index = {}
for file in sorted((ROOT/'work/vocab-art/svg').glob('*/*.svg')):
    if 'layer-focal' in file.read_text(): index.setdefault(file.stem,file)

origins = {}
cache = {}
def object_svg(name):
    if name in cache: return cache[name]
    if name in custom:
        cache[name] = ('0 0 100 100', custom[name])
        origins[name] = 'native Social Fluency diagram'
        return cache[name]
    selected = aliases.get(name,name)
    file = ROOT/f'public/assets/course/word-{selected[1:]}.svg' if selected.startswith('@') else ROOT/f'work/vocab-art/svg/{selected.replace(":", "/")}.svg' if ':' in selected else index.get(selected)
    if file is None or not file.is_file():
        raise ValueError(f'No reviewed vector for {name} ({selected})')
    original = ET.fromstring(file.read_text())
    root = ET.Element(f'{{{SVG}}}svg', {'viewBox':original.attrib.get('viewBox','0 0 304 192')})
    style = original.find(f'.//{{{SVG}}}style')
    if style is not None:
        variables = re.search(r':root\s*\{([^}]+)',style.text or '')
        if variables: root.set('style',variables[1])
    for defs in original.findall(f'{{{SVG}}}defs'): root.append(deepcopy(defs))
    focal = original.find(".//*[@id='layer-focal']")
    if name in ('bus','car','train','plane'):
        for child in original.findall(f'{{{SVG}}}g'):
            if child.get('id')!='layer-backdrop': root.append(deepcopy(child))
    elif focal is not None:
        root.append(deepcopy(focal))
    else:
        # The course's compact object drawings have one backdrop shape before
        # the object group. Copy the vector object, without that panel.
        for g in original.findall(f'{{{SVG}}}g'):
            g = deepcopy(g)
            for child in list(g):
                if child.tag.endswith('rect') and child.attrib.get('stroke') == 'none': g.remove(child)
            root.append(g)
    for node in list(root.iter()):
        for child in list(node):
            if child.tag.endswith(('text','title','desc','style')): node.remove(child)
    # Namespace all paint servers so three source drawings compose safely.
    for node in root.iter():
        for key,val in list(node.attrib.items()):
            if key=='id': node.set(key,f'{name}-{val}')
            elif 'url(#' in val: node.set(key,val.replace('url(#',f'url(#{name}-'))
            elif key.endswith('href') and val.startswith('#'): node.set(key,'#'+name+'-'+val[1:])
    raw = ET.tostring(root,encoding='unicode')
    raster = Image.open(BytesIO(resvg_py.svg_to_bytes(svg_string=raw)))
    bounds = raster.getchannel('A').getbbox()
    if not bounds: raise ValueError(f'Empty vector: {file}')
    vx,vy,vw,vh = map(float,root.get('viewBox').split())
    sx,sy=vw/raster.width,vh/raster.height
    x,y,r,b=bounds
    pad=5
    view=f'{vx+x*sx-pad:g} {vy+y*sy-pad:g} {(r-x)*sx+pad*2:g} {(b-y)*sy+pad*2:g}'
    inner=''.join(ET.tostring(c,encoding='unicode') for c in root)
    if root.get('style'): inner=f'<g style="{root.get("style")}">{inner}</g>'
    cache[name]=(view,inner)
    origins[name]=str(file.relative_to(ROOT))
    return cache[name]

def object_at(name,x,y,w=200,h=180):
    view,inner=object_svg(name)
    return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{view}">{inner}</svg>'

def person(x,y,scale=1,shirt=SAGE,hair='#6d6158',pose='open',flip=False):
    face = '#e8c3a4'
    art=path('M37 79Q55 67 73 79L86 159H25Z',shirt)+path('M33 157 25 219M70 157 78 219',stroke='#76889d',width=18)+path('M15 225H32M72 225H89',stroke='#586a7a',width=9)
    arms={'open':'M35 86 11 111-8 94M74 86 92 116 112 98','listen':'M34 86 19 130 40 150M74 86 85 124 72 147','wave':'M34 86 12 60 7 30M74 86 86 125 77 147','stop':'M34 86 13 60 6 40M74 86 87 126 70 147'}
    art+=path(arms.get(pose,arms['open']),stroke=shirt,width=17)
    for xx,yy in ([(-8,94),(112,98)] if pose=='open' else [(40,150),(72,147)] if pose=='listen' else [(7,30),(77,147)]):
        art+=circle(xx,yy,7,face,'#b49b87')
    art+=path('M47 61V78H63V61',face,face)+f'<ellipse cx="55" cy="40" rx="23" ry="28" fill="{face}" stroke="#ae9787" stroke-width="1.7"/>'
    art+=path('M31 40Q23 5 46 6Q66-4 78 16L79 43 70 25Q54 33 39 20Z',hair,hair)
    art+=path('M44 43v2M64 43v2',stroke='#5b5b5b',width=2.5)+path('M49 57Q55 62 63 56',stroke='#a87c70',width=1.5)
    art+=path('M51 82 55 96 64 82',PAPER,PAPER,width=1)+path('M56 99V149',stroke='#ffffff',width=1,extra='opacity=".35"')
    return f'<g transform="translate({x} {y}) scale({-scale if flip else scale} {scale})">{art}</g>'

def compose(mode,names,seed):
    ink = ['#d9b993','#a5bab8','#b3abc6','#c7b997'][seed%4]
    if mode in ('objects','compare','steps','route','place'):
        art=''
        for i,name in enumerate(names):
            x=78+i*(650/max(1,len(names)-1))
            art+=f'<ellipse cx="{x+90}" cy="306" rx="77" ry="7" fill="{ink}" opacity=".11"/>'
            art+=object_at(name,x-10,64,210,225)
            if mode in ('steps','route') and i<len(names)-1:
                mid=x+260
                art+=path(f'M{mid} 175h37m-9-8 9 8-9 8',stroke='#b6bfc6',width=2.5,extra='stroke-dasharray="3 6"')
        if mode=='compare' and len(names)==2: art+=path('M477 89V281',stroke='#b5bfc8',width=1.5,extra='stroke-dasharray="3 8"')
        return art
    if mode=='group':
        props=[n for n in names if n!='people']
        return person(195,95,.85,BLUE,pose='wave')+person(580,94,.85,SAGE,pose='open')+person(735,106,.8,ROSE,pose='listen',flip=True)+''.join(object_at(n,310+i*110,16,100,80) for i,n in enumerate(props))
    if mode=='call':
        channel='video' if names[0]=='video' else 'phone'
        props=[n for n in names if n not in ('phone',channel)]
        context=object_at(props[0],385,90,190,190) if len(props)==1 else ''.join(object_at(n,326+i*160,106,145,155) for i,n in enumerate(props))
        return object_at(channel,85,48,180,250)+object_at(channel,694,48,180,250)+path('M300 170Q480 72 659 170',stroke='#b3bdc7',width=3,extra='stroke-dasharray="4 10"')+context
    props=object_at(names[0],390,45,180,175)+''.join(object_at(n,385+i*108,232,95,85) for i,n in enumerate(names[1:]))
    return person(172,65,1.1,BLUE,pose='listen' if mode=='listen' else 'stop' if mode=='boundary' else 'open')+person(784,65,1.1,SAGE,pose='listen',flip=True)+props

manifest={}
curated_sections={'20-study-0','20-study-1','26-study-0','34-study-0','45-study-1','56-study-2','65-study-1','72-study-2','80-study-3','88-study-2'}
for chapter,entries in plans.items():
    lesson=json.loads((ROOT/f'src/course/lessons/{chapter}.json').read_text())
    localized=json.loads((ROOT/f'src/course/locales/ja/lessons/{chapter}.json').read_text())
    if len(entries)!=len(lesson['study']): raise ValueError(f'{chapter}: section plan count does not match source')
    for idx,section in enumerate(lesson['study']):
        # Keep an asset for every source section. The renderer decides whether
        # a section is a teaching card or a borderless introduction in the
        # current language; canonical compilation can change that metadata.
        if section['id'] in curated_sections:
            # These already have reviewed transparent object illustrations.
            unused=OUT/f'{section["id"]}.svg'
            if unused.exists(): unused.unlink()
            continue
        mode,words=entries[idx].split('|')
        names=words.split(',')
        art=compose(mode,names,int(chapter)+idx)
        name=f'{section["id"]}.svg'
        title=section['title']
        safe_title=title.replace('&','&amp;').replace('<','&lt;')
        (OUT/name).write_text(f'<svg xmlns="{SVG}" viewBox="0 0 960 360" width="960" height="360" role="img"><title>{safe_title}</title>{art}</svg>\n')
        manifest[section['id']]={'file':f'study-sections/{name}','width':960,'height':360,
          'en':f'{title}: '+', '.join(n.replace('-',' ') for n in names),
          'ja':localized['study'][idx]['title']+'の場面と関連する道具を示す図'}

# Generated raster scenes are independent assets and never overwritten here.
scene_descriptions={
 '13-study-0':('Adults experiencing sunny, windy, and rainy weather','晴れ、風、雨の天気を体験する人たち'),
 '13-study-1':('Two friends with different reactions to the same sunny weather','同じ晴れた天気について異なる好みを持つ友人二人'),
 '13-study-2':('Checking weather possibilities on a phone before making a plan','予定を立てる前にスマートフォンで天気予報を確認する様子'),
 '15-study-0':('An adult introduces her older brother and younger sister','兄と妹を紹介する女性'),
 '15-study-1':('A brother and sister stay in touch by phone from different places','離れた場所から電話で連絡を取り合う兄妹'),
 '15-study-2':('Grandparents welcome their grandchildren and adult daughter','孫たちと成人した娘を迎える祖父母'),
 '15-study-3':('One classmate sets a personal boundary while the other listens','一人が個人的な話題を断り、相手がその希望を受け止める場面'),
 '16-study-0':('Birthday wishes, congratulations, and sympathy for different news','誕生日の言葉、祝福、お悔やみを伝える三つの場面'),
 '16-study-1':('A colleague listens and responds to news of a promotion','昇進の知らせを聞き、祝福する同僚'),
 '16-study-2':('A visitor welcomes a friend to a new home among moving boxes','引っ越しの箱がある新居を訪れ、友人にお祝いを伝える様子'),
 '16-study-3':('A friend offers quiet sympathy and listens without pressing for details','詳しく尋ねずに相手の話を聞き、静かに寄り添う友人'),
}
for sid,(en,ja) in scene_descriptions.items():
    file=ROOT/f'public/assets/course/study-scenes/{sid}.png'
    im=Image.open(file)
    if im.mode!='RGBA' or im.getchannel('A').getextrema()[0]!=0: raise ValueError(f'{sid}: true transparency required')
    manifest[sid]={'file':f'study-scenes/{sid}.png','width':im.width,'height':im.height,'en':en,'ja':ja}

(ROOT/'src/web/studySectionArt.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
# The vocabulary atlas uses the same reviewed objects with visible word labels.
# Each remains an independent transparent vector with no embedded text.
object_out=ROOT/'public/assets/course/study-objects'
object_out.mkdir(parents=True,exist_ok=True)
object_svg('pot')  # Distinct from a flowerpot in the kitchen vocabulary atlas.
object_manifest={}
for key,(view,inner) in cache.items():
    file=object_out/f'{key}.svg'
    file.write_text(f'<svg xmlns="{SVG}" viewBox="{view}" width="180" height="150"><title>{key}</title>{inner}</svg>\n')
    object_manifest[key]=f'study-objects/{key}.svg'
for stale in object_out.glob('*.svg'):
    if stale.stem not in object_manifest: stale.unlink()
(ROOT/'src/web/studyObjectArt.json').write_text(json.dumps(object_manifest,ensure_ascii=False,indent=2)+'\n')
(ROOT/'docs/study-vector-origins.json').write_text(json.dumps(origins,indent=2)+'\n')
print(f'Prepared {len(manifest)} section illustrations from {len(origins)} reviewed vector objects and 11 generated scenes.')
