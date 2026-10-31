#!/usr/bin/env python3
"""One-time import of user-approved Artico chapter 02 illustrations.

The source images were generated for Artico and staged in the user's design assets.
Canva's temporary signed media URLs are used only for this one-time commit.
The final website loads the committed PNGs directly from its own repository.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlsplit, urlunsplit
from PIL import Image, ImageFilter
from io import BytesIO

IMAGE_URLS = {
  "gathering" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2Fa0a7bded-4f62-476b-a7c6-6eb7867b5527/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAB-AMS9gWXNVS4Z-LZyte9SD_aSoIVcZ6xtROd3ctQkw&exp=1793427555&osig=AAAAAAAAAAAAAAAAAAAAAD0eBj_8nuorHzL__6chAomAs__gXfgt-E8cYXy1H4Di&signer=media-rpc&token=AAIAAU0AJGEwYTdiZGVkLTRmNjItNDc2Yi1hN2M2LTZlYjc4NjdiNTUyNwAAAAABoZCcwri0pAKs1hAFB2uvjjeLrMD3TonI5s6C9cHYa6opvjI6SA&x-canva-quality=thumbnail",
  "project-meeting" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2Fe580a9d1-904e-4bf1-b3ec-2924d726c687/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAFNfbJt-3AdhQXJexR5xGgmEfrYxTl-2mnsD8GYLLi04&exp=1793426602&osig=AAAAAAAAAAAAAAAAAAAAAL4KBIPV_FRvs2NhjR6Gmo4lU7igtsCxQfpJqNzMQSQt&signer=media-rpc&token=AAIAAU0AJGU1ODBhOWQxLTkwNGUtNGJmMS1iM2VjLTI5MjRkNzI2YzY4NwAAAAABoZCOOBC0pSO_IitgiVsGPTR2ZhEWLlRaRfZQd1eaFQ3tZ9kEjg&x-canva-quality=thumbnail",
  "self-introduction" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F2b9a3eca-9e23-492b-bc47-a97381dd8c6a/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAAKw20aXFKaQDNq_sjtwR9LQ2HccK2OIxb8WN77orrgp&exp=1793427097&osig=AAAAAAAAAAAAAAAAAAAAAAqSwygy_CmmUa4npBIrMsDP_NJUbW0wwqQLPI-cWOLm&signer=media-rpc&token=AAIAAU0AJDJiOWEzZWNhLTllMjMtNDkyYi1iYzQ3LWE5NzM4MWRkOGM2YQAAAAABoZCVxagffLldCf9x83kmpFJVcZQ95kbLb5R4PJMMDmw64H1obQ&x-canva-quality=thumbnail",
  "formal-meeting" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2Ffb1f5c2c-c266-48fd-be5c-4b72862e1a81/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAAL_eRDHqjklSxOwAmyqAg-ij_S9DGUJIjb1e3mmZUf_&exp=1793428403&osig=AAAAAAAAAAAAAAAAAAAAALBSh1RiokmrQRwy97liELmS7giVAF2fwRfw5LRHosRX&signer=media-rpc&token=AAIAAU0AJGZiMWY1YzJjLWMyNjYtNDhmZC1iZTVjLTRiNzI4NjJlMWE4MQAAAAABoZCpszhX8N4FoBv5Lblw5wT37V8-5mndJgt5GH0_BBy1ylFteg&x-canva-quality=thumbnail",
  "introduce-others" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F670dcd17-9b85-4ec2-a0b2-7775adf92b2b/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAHra0xSBmqt2uweq4nNLL78Yn_fZkhelEmiPVPEPahVf&exp=1793428358&osig=AAAAAAAAAAAAAAAAAAAAAF5ddsU3sV3SafJL3PlylsNjeU49zq-3ALrY2Pc25aPe&signer=media-rpc&token=AAIAAU0AJDY3MGRjZDE3LTliODUtNGVjMi1hMGIyLTc3NzVhZGY5MmIyYgAAAAABoZCpA3ALxiSWO5h2pHaA2UzNMxPk-EbgXiOa9zJ7HCLZL5SxNQ&x-canva-quality=thumbnail",
  "online-to-person" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F15fb1b09-bae9-4cdc-b257-1694a7b7d001/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAABb2c7oaNmhPtwHovDed1N1CcBV5u4S2JxQJVz7BHEF9&exp=1793427715&osig=AAAAAAAAAAAAAAAAAAAAACuEVp7u-bAeXqNZ8acD_HlRWBxgMUK_ddAm-Ut7Ol5r&signer=media-rpc&token=AAIAAU0AJDE1ZmIxYjA5LWJhZTktNGNkYy1iMjU3LTE2OTRhN2I3ZDAwMQAAAAABoZCfM7j947g5yDVTX4BlNtoCpJPuLSIZJRMxBmsbhfhH5D9QbQ&x-canva-quality=thumbnail",
  "office-handshake" : "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F18954e1c-01d2-421f-b448-6e80246f8bfb/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAANaOQyY0octy2uM08htmlgS5ggy2FszJmak8FGJQn6K4&exp=1793427728&osig=AAAAAAAAAAAAAAAAAAAAAMSfZwAP5615jgEE21G0ZTDGf8HRdqGNy50e5a-IfCk8&signer=media-rpc&token=AAIAAU0AJDE4OTU0ZTFjLTAxZDItNDIxZi1iNDQ4LTZlODAyNDZmOGJmYgAAAAABoZCfZoDfty5rNHtrd50avlXquy167nrW7wnIyyuc_hPYpG-GqQ&x-canva-quality=thumbnail"
}
ROOT = Path("public/assets/course")
ROOT.mkdir(parents=True,exist_ok=True)

for key,url in IMAGE_URLS.items():
    # Signed URLs may restrict resizing, so try the original signed URL first.
    req=Request(url,headers={"User-Agent":"Artico-asset-import/1.0"})
    with urlopen(req, timeout=40) as response:
        payload=response.read()
    picture=Image.open(BytesIO(payload)).convert("RGBA")
    if picture.width<150 or picture.height<90:
        raise RuntimeError(f"Asset too small: {key}={picture.size}")
    # The original illustrations are 1586x992. Their staged thumbnails
    # are enlarged for display with a soft sharpening pass.
    picture=picture.resize((760,476),Image.Resampling.LANCZOS)
    picture=picture.filter(ImageFilter.UnsharpMask(radius=1.0,percent=105,threshold=4))
    out=ROOT/f"ch02-scene-{key}.png"
    picture.save(out,format="PNG",optimize=True)
    assert out.stat().st_size>5000,(key,out.stat().st_size)
    print(key,picture.size,out.stat().st_size,out)
