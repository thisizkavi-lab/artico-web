#!/usr/bin/env python3
"""Download the vetted CC0 Lesson 04 illustration manifest during the site build."""
import io, json, pathlib, time, urllib.request
from PIL import Image
root=pathlib.Path(__file__).resolve().parent.parent
j=json.loads((root/'src/web/vocabularyDailyRoutineSources.json').read_text())
dest=root/'public/vocabulary-curated-04'
dest.mkdir(parents=True,exist_ok=True)
for term,e in j['entries'].items():
    path=dest/(e['file']+'.webp')
    if path.is_file() and path.stat().st_size>2500: continue
    url=e['sourceImage']
    assert url.startswith('https://freesvg.org/img/')
    last=None
    for i in range(3):
        try:
            request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; ArticoCourse/1.0)','Referer':'https://freesvg.org/'})
            with urllib.request.urlopen(request,timeout=35) as r: data=r.read(9_000_000)
            with Image.open(io.BytesIO(data)) as original:
                original.load()
                assert original.width>=200 and original.height>=200,(term,original.size)
                art=original.convert('RGBA')
            art.thumbnail((555,335),Image.Resampling.LANCZOS)
            canvas=Image.new('RGBA',(608,384),'#FAF8F3')
            canvas.alpha_composite(art,((608-art.width)//2,(384-art.height)//2))
            canvas.convert('RGB').save(path,'WEBP',quality=91,method=5)
            assert path.stat().st_size>2500,(term,path.stat().st_size)
            print(term, '->', path.name, original.size)
            break
        except Exception as ex:
            last=ex
            if i<2: time.sleep(i+1)
    else:
        raise RuntimeError('Could not fetch required vetted illustration '+term+' '+url+': '+str(last))
print('Verified',len(j['entries']),'self-hosted CC0 images')
