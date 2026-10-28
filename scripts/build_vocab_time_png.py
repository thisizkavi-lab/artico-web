#!/usr/bin/env python3
"""Original raster calendar, clock, and time-learning PNGs, no inline SVG.

One checked lesson-3 term per local asset. These are educational diagrams rather
than photographs; action and scene illustrations are produced separately.
"""
from pathlib import Path
import json, math, random
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
SOURCE=json.loads((ROOT/'src/web/vocabularyOrganized.json').read_text())
LESSON=next(x for x in SOURCE['lessons'] if x['sourceLesson']==3)
OUT=ROOT/'public/vocabulary-ai/ch03'
W,H=480,300
INK='#2c4466'; PALE='#f7f9fc'; BLUE='#4684c0'; DUST='#dbeaf6'
RED='#e99481'; GOLD='#eac67d'; GREEN='#92ba98'; DARK='#182c52'
FONTS=['/usr/share/fonts/truetype/lato/Lato-Bold.ttf',
       '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']

def font(size):
    for f in FONTS:
        if Path(f).exists(): return ImageFont.truetype(f,size)
    return ImageFont.load_default()

def rgb(s): return tuple(int(s[i:i+2],16) for i in (1,3,5))
def fresh(bg=PALE):
    im=Image.new('RGB',(W,H),bg)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((7,7,W-8,H-8),22,outline='#e0e8f0',width=2)
    return im,d

def center(d,x,y,text,size=36,color=INK):
    d.text((x,y),str(text),font=font(size),fill=color,anchor='mm')

def sun(d,x,y,r=34,sky=False):
    d.ellipse((x-r,y-r,x+r,y+r),fill=GOLD)
    for a in range(0,360,45):
        v=math.radians(a)
        d.line((x+math.cos(v)*(r+9),y+math.sin(v)*(r+9),
                x+math.cos(v)*(r+20),y+math.sin(v)*(r+20)),fill='#d9a763',width=5)

def moon(d,x,y,r=30):
    d.ellipse((x-r,y-r,x+r,y+r),fill='#e8e7c2')
    d.ellipse((x-r//2,y-r-9,x+r+4,y+r-15),fill='#233f6d')

def clock(d, cx=240,cy=153,r=94,hour=10,minute=10):
    d.ellipse((cx-r-5,cy-r-5,cx+r+5,cy+r+5),fill='#fdfcf8',outline='#bdcee2',width=7)
    for h in range(12):
        a=h*math.pi/6-math.pi/2
        d.ellipse((cx+(r-17)*math.cos(a)-3,cy+(r-17)*math.sin(a)-3,
                   cx+(r-17)*math.cos(a)+3,cy+(r-17)*math.sin(a)+3),fill='#6382a1')
    m=minute*math.pi/30-math.pi/2
    h=(hour%12+minute/60)*math.pi/6-math.pi/2
    d.line((cx,cy,cx+49*math.cos(h),cy+49*math.sin(h)),fill=INK,width=8)
    d.line((cx,cy,cx+74*math.cos(m),cy+74*math.sin(m)),fill=BLUE,width=5)
    d.ellipse((cx-7,cy-7,cx+7,cy+7),fill=INK)

def horizon(d,moment):
    shades={'morning':('#e9f3f7','#cfdfef',90),'dawn':('#f8ebe4','#e6d8df',150),
            'sunrise':('#f8eed5','#e8cfb3',181),'afternoon':('#e5f1f5','#dce6f1',66),
            'evening':('#eedce1','#d4d7e5',152),'sunset':('#fae8d5','#e3c1c4',177),
            'dusk':('#c9d2e8','#aab2d3',185),'night':('#35496f','#253658',90),
            'midnight':('#253858','#1c2c48',90)}
    top,ground,y=shades.get(moment,shades['morning'])
    d.rounded_rectangle((44,34,436,263),18,fill=top)
    d.ellipse((210,y-35,280,y+35),fill=GOLD if moment not in ('night','midnight') else '#e8e6c6')
    d.polygon([(44,230),(105,201),(165,230),(236,205),(318,228),(403,199),(436,224),(436,263),(44,263)],fill=ground)
    if moment in ('night','midnight'):
        for x,y0 in [(84,74),(135,111),(358,83),(391,138),(312,47),(190,67)]:
            d.ellipse((x-3,y0-3,x+3,y0+3),fill='#f1eacb')

def weekday(d, day=None, variant=None):
    d.rounded_rectangle((39,43,441,258),18,fill='#ffffff',outline='#d4dfeb',width=3)
    d.rounded_rectangle((39,43,441,92),16,fill='#d6e8f5')
    d.line((79,31,79,63),fill=INK,width=8)
    d.line((400,31,400,63),fill=INK,width=8)
    cols=7
    for i in range(cols):
        x=59+i*55
        highlighted=(day is not None and day==i) or (variant=='weekend' and i>=5) or (variant=='weekday' and i<5)
        d.rounded_rectangle((x,113,x+45,227),11,fill='#8abbe3' if highlighted else '#ecf2f7',outline='#acc0d4',width=2)
        center(d,x+22,141,('M','T','W','T','F','S','S')[i],20,'#24466a' if highlighted else '#8095a7')
        d.ellipse((x+12,178,x+33,199),fill='#3977b6' if highlighted else '#c6d7e6')
    if variant=='week':
        d.line((70,243,410,243),fill='#78a5cd',width=5)

def month(d,selected=0):
    d.rounded_rectangle((32,35,448,262),17,fill='#fffdfa',outline='#d4dfeb',width=2)
    for i in range(12):
        c=i%4; r=i//4
        x=55+c*96; y=57+r*68
        active=i==selected
        d.rounded_rectangle((x,y,x+80,y+55),10,fill='#8fbce5' if active else '#eff5f9',outline='#cadce7',width=2)
        center(d,x+40,y+27,f'{i+1:02}',25,'#fff' if active else '#809ab4')

def season(d,t):
    skies={'spring':'#e8f2ed','summer':'#f4ecdb','autumn':'#f5e9df','winter':'#e1e8ef'}
    d.rounded_rectangle((28,24,452,276),19,fill=skies[t])
    d.ellipse((340,44,399,103),fill=GOLD if t!='winter' else '#dfe6ee')
    d.polygon([(28,220),(105,187),(235,225),(365,180),(452,229),(452,276),(28,276)],fill='#add2b3' if t in ('spring','summer') else '#d4c3ad' if t=='autumn' else '#d0dae6')
    d.line((185,214,187,95),fill='#846b5e',width=15)
    for x,y in [(139,109),(179,77),(226,104),(181,124)]:
        if t=='spring':
            d.ellipse((x-32,y-28,x+32,y+28),fill='#c7dcbf')
            for xx,yy in [(x-15,y+5),(x+15,y-7)]:
                d.ellipse((xx-6,yy-6,xx+6,yy+6),fill='#e8a2ad')
        elif t=='summer': d.ellipse((x-31,y-31,x+31,y+31),fill='#82bd98')
        elif t=='autumn': d.ellipse((x-29,y-29,x+29,y+29),fill=['#dbb07b','#d38f6e','#cba169'][abs(x)%3])
        else:
            for dx,dy in [(0,0),(55,30),(-52,45)]:
                d.line((x+dx-8,y+dy,x+dx+8,y+dy),fill='#fff',width=3)
    if t=='winter':
        d.arc((150,90,209,159),0,360,fill='#cedceb',width=2)
        for px,py in [(49,44),(97,101),(270,52),(356,160)]:
            center(d,px,py,'*',20,'#fff')

def freq(d,count,variant='week'):
    weekday(d)
    # Add checks in an example seven-day span with no English answer text.
    sequence=[0,2,4,1,5,3,6]
    if variant=='daily': count=7
    if variant=='every-other':sequence=[0,2,4,6];count=4
    for n in range(count):
        i=sequence[n];cx=59+i*55+23
        d.rounded_rectangle((cx-16,160,cx+16,210),8,fill='#8bbbe4')
        d.line((cx-10,186,cx-2,194,cx+12,174),fill='#fff',width=5,joint='curve')

def timeline(d,which):
    d.line((55,158,418,158),fill='#9eafc5',width=8)
    for i,x in enumerate((95,239,383)):
        d.ellipse((x-15,143,x+15,173),fill='#77a8d2' if i==(0 if which=='past' else 2 if which=='future' else 1) else '#d8e4ed')
    d.polygon([(418,142),(442,158),(418,174)],fill=BLUE)
    if which in ('sequence','before-after'):
        d.arc((72,85,408,226),192,344,fill=RED,width=6)
    elif which=='past':
        d.polygon([(67,121),(47,158),(67,193)],fill=RED)
    elif which=='future':
        d.polygon([(415,121),(438,158),(415,193)],fill=GOLD)

def globe(d):
    d.ellipse((70,54,222,235),fill='#b4d6e5',outline='#5f89af',width=5)
    d.arc((100,56,193,234),90,270,fill='#6394bc',width=4)
    d.arc((100,56,193,234),270,90,fill='#6394bc',width=4)
    d.line((77,145,216,145),fill='#6394bc',width=4)
    d.arc((70,85,222,201),0,180,fill='#6394bc',width=4)
    clock(d,328,142,76,hour=3,minute=0)

def generic_calendar(d):
    d.rounded_rectangle((76,39,403,259),15,fill='#fffdf9',outline='#b1c6d9',width=3)
    d.rounded_rectangle((76,39,403,84),14,fill=DUST)
    for row in range(4):
        for col in range(7):
            x=103+col*40;y=109+row*33
            d.rounded_rectangle((x,y,x+28,y+22),4,fill='#e1ecf4' if (row+col)%3 else '#8fbce5')

def draw(index,group,term):
    im,d=fresh()
    t=term.lower()
    if group==0:
        if t in ('noon','midday'):clock(d,hour=12,minute=0)
        elif t=='midnight':horizon(d,'midnight')
        elif t in ('time',"what time is it?","o'clock",'a.m.','p.m.'):clock(d,hour=9 if t=='a.m.' else 15 if t=='p.m.' else 3,minute=0)
        else:
            which='night' if 'night' in t else 'morning' if 'morning' in t else 'afternoon' if 'afternoon' in t else 'evening' if 'evening' in t else t
            horizon(d,which)
    elif group==1:
        days=['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        if t in days:weekday(d,day=days.index(t))
        else:weekday(d,variant=t)
    elif group==2:
        months=['january','february','march','april','may','june','july','august','september','october','november','december']
        month(d,months.index(t))
    elif group==3:
        season(d,'spring' if 'spring' in t else 'summer' if 'summer' in t else 'autumn' if 'fall' in t or 'autumn' in t else 'winter' if 'winter' in t else 'spring')
    elif group==4:
        if t=='second':clock(d,hour=12,minute=0)
        elif t in ('minute','hour'):clock(d,hour=3,minute=0 if t=='hour' else 1)
        elif t in ('day','week','two weeks / a fortnight','month','year'):
            if t in ('day','week','two weeks / a fortnight'):weekday(d,day=0 if t=='day' else None,variant='week' if t!='day' else None)
            else:month(d)
        else:
            d.rounded_rectangle((53,68,427,225),20,fill='#e2edf7')
            number={'decade':'10','century':'100','millennium / millennia':'1000'}.get(t,'1')
            center(d,240,143,number,87,'#4775a8')
            d.line((111,205,369,205),fill='#b2c9df',width=5)
    elif group==5:
        if 'hourly' in t:clock(d,hour=2,minute=0)
        elif 'monthly' in t:month(d)
        elif 'yearly' in t:month(d)
        else:
            if t=='never': count=0
            elif t=='always' or t.startswith('daily') or t.startswith('weekly'):count=7 if t!='weekly / every week' else 1
            elif t=='often':count=5
            elif t=='usually':count=6
            elif t=='sometimes':count=3
            elif t.startswith('rarely'):count=1
            elif t.startswith('twice'):count=2
            elif t.startswith('three'):count=3
            elif t.startswith('once'):count=1
            else:count=4
            freq(d,count,'every-other' if t=='every other day' else 'week')
    elif group==6:
        if 'tonight' in t: horizon(d,'night')
        elif 'morning' in t or 'afternoon' in t: horizon(d,'morning')
        elif 'soon' in t or 'later' in t or 'tomorrow' in t:timeline(d,'future')
        elif 'ago' in t or 'earlier' in t or 'yesterday' in t:timeline(d,'past')
        else:timeline(d,'before-after' if 'before' in t else 'present')
    else:
        if t=='time zone':globe(d)
        elif t=='on time / late / early':clock(d,hour=9,minute=0)
        else:generic_calendar(d)
    # Subtle consistent detail without writing the English answer in the image.
    d.rounded_rectangle((22,22,35,35),5,fill=RED)
    return im

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    count=0
    for g_index,g in enumerate(LESSON['groups']):
        for term,*_ in g['items']:
            filename=f"03-{count:03d}.png"
            target=OUT/filename
            if not target.is_file():
                picture=draw(count,g_index,term)
                picture.resize((400,250),Image.Resampling.LANCZOS).quantize(colors=96,method=Image.Quantize.FASTOCTREE).save(target,optimize=True)
            with Image.open(target) as check: check.verify()
            count+=1
    if count!=82: raise RuntimeError(f'Expected 82 time terms, got {count}')
    print(f'Generated {count} original local PNG time diagrams for Vocabulary Lesson 3.')

if __name__=='__main__': main()
