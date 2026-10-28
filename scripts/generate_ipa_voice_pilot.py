"""Build a small *review-only* US English TTS sample set using one local Piper voice.

The model was trained on the public-domain LJ Speech dataset.
The samples use whole English words; they are NOT isolated phoneme recordings.
The model is used offline at build time, not shipped to the website.
"""
from pathlib import Path
import json
import sys
import wave

WORDS = [
    ("seat", "i", "seat"),
    ("sit", "ɪ", "sit"),
    ("thin", "θ", "thin"),
    ("this", "ð", "this"),
    ("ship", "ʃ", "ship"),
    ("vision", "ʒ", "vision"),
    ("cat", "æ", "cat"),
    ("cup", "ʌ", "cup"),
    ("bird", "ɝ", "bird"),
    ("teacher", "ɚ", "teacher"),
    ("go", "oʊ", "go"),
    ("boy", "ɔɪ", "boy"),
]
MODEL = "en_US-ljspeech-medium"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "audio" / "ipa-voice-pilot"

def main():
    if len(sys.argv) != 2:
        raise SystemExit("usage: python scripts/generate_ipa_voice_pilot.py /path/to/en_US-ljspeech-medium.onnx")
    from piper import PiperVoice
    voice = PiperVoice.load(sys.argv[1])
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for basename, ipa, word in WORDS:
        path = OUTPUT / (basename + ".wav")
        with wave.open(str(path), "wb") as out:
            voice.synthesize_wav(word + ".", out)
        with wave.open(str(path), "rb") as audio:
            if audio.getnframes() < 4000 or audio.getframerate() < 16000:
                raise RuntimeError(f"Generated invalid/too-short audio for {word}")
            seconds = round(audio.getnframes()/audio.getframerate(), 3)
        manifest.append({"ipa": ipa, "word": word, "file": basename+".wav", "seconds": seconds})
        print(f"{word}: /{ipa}/ — {seconds}s")
    (OUTPUT / "manifest.json").write_text(json.dumps({
        "model": MODEL,
        "source": "https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium",
        "dataset": "https://keithito.com/LJ-Speech-Dataset/",
        "note": "Single-speaker General American TTS pilot. Example words, not individual phonemes. Human pronunciation review required.",
        "samples": manifest,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Created {len(manifest)} samples in {OUTPUT}")

if __name__ == "__main__":
    main()
