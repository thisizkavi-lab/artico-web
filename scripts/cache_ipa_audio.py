"""Cache openly licensed US-English word samples for Artico IPA reference.

Wikimedia Commons is the copyright and provenance authority for each recording.
The app provides an attribution/individual-license link for every source.
Failures are nonfatal: the browser has a remote-source/device-voice fallback.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from hashlib import md5
from urllib.error import HTTPError
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
    digest = md5(filename.encode("utf-8")).hexdigest()
    # Upload host avoids a redirect and is less expensive for Wikimedia.
    uri = f"https://upload.wikimedia.org/wikipedia/commons/{digest[0]}/{digest[:2]}/{quote(filename)}"
    try:
        request = Request(uri, headers={
            "User-Agent": "ArticoIPA/1.0 (https://github.com/thisizkavi-lab/artico-web; licensed audio cache)",
            "Accept": "audio/ogg,*/*",
        })
        with urlopen(request, timeout=8) as response:
            body = response.read(300_000)
        if not body.startswith(b"OggS"):
            raise ValueError("Expected an Ogg file")
        target.write_bytes(body)
        return True
    except HTTPError as err:
        # Wikimedia's rate limits should be respected, not retried.
        print(f"Could not cache {filename}: HTTP {err.code}")
    except Exception as err:
        print(f"Could not cache {filename}: {err}")
    return False

if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(fetch, FILES))
    cached = [name for name, ok in zip(FILES, results) if ok]
    print(f"Artico IPA audio: cached {len(cached)} of {len(FILES)} verified source recordings")
