#!/usr/bin/env python3
"""Generate the entire Artico General American example-word audio library.

The ONE speaker is Piper en_US-ljspeech-medium, based on LJ Speech.
This is offline build-time inference; the app hosts generated WAV files,
not a voice model, and never uses device/remote audio. Audio is unreviewed
synthetic example-word speech, not isolated phonemes.
"""
from pathlib import Path
import json
import re
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/web/ipaSounds.js"
DEST = ROOT / "public/audio/ipa-one-voice"
MODEL = "en_US-ljspeech-medium"
# These are the source entries in the curriculum: don't guess phoneme count.
ENTRY = re.compile(r"\bc\('([^']+)','([A-Za-z]+)'")
EXPECTED_ENTRIES = 41

def inventory():
    text = SOURCE.read_text(encoding="utf-8")
    entries = ENTRY.findall(text)
    if len(entries) != EXPECTED_ENTRIES or len(set(ipa for ipa, _ in entries)) != len(entries):
        raise RuntimeError(f"Expected {EXPECTED_ENTRIES} unique IPA entries; found {len(entries)}")
    words = sorted({word.lower() for _, word in entries})
    return entries, words

def main():
    if len(sys.argv) != 2:
        raise SystemExit("usage: python scripts/generate_ipa_single_voice.py /path/to/en_US-ljspeech-medium.onnx")
    from piper import PiperVoice
    entries, words = inventory()
    voice = PiperVoice.load(sys.argv[1])
    DEST.mkdir(parents=True, exist_ok=True)
    for old in DEST.glob("*.wav"):
        if old.stem not in words:
            old.unlink()
    durations = {}
    for word in words:
        path = DEST / f"{word}.wav"
        if not path.exists() or path.stat().st_size < 8000:
            with wave.open(str(path), "wb") as out:
                voice.synthesize_wav(word + ".", out)
        with wave.open(str(path), "rb") as audio:
            sample_rate, frames, channels = audio.getframerate(), audio.getnframes(), audio.getnchannels()
            if channels != 1 or sample_rate < 16000 or frames < 3000:
                raise RuntimeError(f"Invalid WAV: {path.name}")
            durations[word] = round(frames / sample_rate, 3)
    manifest = {
        "model": MODEL,
        "voice": "One US-English synthetic voice for all examples",
        "model_source": "https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium",
        "training_dataset": "https://keithito.com/LJ-Speech-Dataset/",
        "note": "Word recordings, not isolated phonemes. Review vowel distinctions and pronunciation before release as authoritative phonetics.",
        "entries": [{"ipa": ipa, "word": word, "file": f"{word.lower()}.wav"} for ipa, word in entries],
        "unique_audio_count": len(words),
        "durations_seconds": durations,
    }
    (DEST / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Artico consistent US voice: {len(entries)} IPA entries, {len(words)} local WAV files")
    for ipa, word in entries:
        print(f"/{ipa}/ — {word}: {word.lower()}.wav")

if __name__ == "__main__":
    main()
