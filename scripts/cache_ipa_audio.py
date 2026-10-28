"""Cache openly licensed US-English word samples for Artico IPA reference.

Wikimedia Commons is the copyright and provenance authority for each recording.
The app provides an attribution/individual-license link for every source.
Failures are nonfatal: the browser has a remote-source/device-voice fallback.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
import re
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "audio" / "ipa"
SOURCE = (ROOT / "src" / "web" / "ipaSounds.js").read_text(encoding="utf-8")
FILES = sorted(set(re.findall(r"En-us-[A-Za-z-]+\.ogg", SOURCE)))
DEST.mkdir(parents=True, exist_ok=True)

def fetch(filename):
    target = DEST / filename
    if target.exists() and target.stat().st_size >= 1500:
        return True
    uri = "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + quote(filename)
    for attempt in range(2):
        try:
            request = Request(uri, headers={"User-Agent": "ArticoEducationalIPA/1.0 (https://github.com/thisizkavi-lab/artico-web; noncommercial cache)","Accept": "audio/ogg,*/*"})
            with urlopen(request, timeout=7) as response:
                body = response.read(300_000)
            if not body.startswith(b"OggS"):
                raise ValueError("Expected Ogg Vorbis audio; received another format")
            target.write_bytes(body)
            return True
        except Exception as err:
            print(f"Could not cache {filename} (attempt {attempt+1}): {err}")

    return False

if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=7) as pool:
        results = list(pool.map(fetch, FILES))
    cached = [name for name, ok in zip(FILES, results) if ok]
    print(f"Artico IPA audio: cached {len(cached)} of {len(FILES)} verified source recordings")
