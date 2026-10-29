#!/usr/bin/env python3
"""Generate locally hosted US-English example-word audio for the Artico IPA chart.

A single Piper voice is used for the entire chart. Files are complete-word
synthesis, not verified isolated phoneme pronunciations, particularly for
borrowed words such as loch and challah.
"""
from pathlib import Path
import json
import re
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/web/ipaSounds.js"
DEST = ROOT / "public/audio/ipa-one-voice"
EXAMPLES = ROOT / "src/web/ipaExamples.json"
MODEL = "en_US-ljspeech-medium"
ENTRY = re.compile(r"\bc\('([^']+)','([A-Za-z]+)'")
EXPECTED_ENTRIES = 41


def audio_key(word):
    key = re.sub(r"[^a-z]", "", word.lower())
    if not key:
        raise RuntimeError(f"Invalid audio filename for {word!r}")
    return key


def clean_example(marked):
    if not isinstance(marked, str):
        raise RuntimeError(f"Invalid example {marked!r}")
    if not re.fullmatch(r"(?:[a-z]|\[[a-z]+\])+", marked):
        if marked not in ("uh-oh", "a’a"):
            raise RuntimeError(f"Invalid highlighted example {marked!r}")
    return marked.replace("[", "").replace("]", "")


def inventory():
    text = SOURCE.read_text(encoding="utf-8")
    entries = ENTRY.findall(text)
    if len(entries) != EXPECTED_ENTRIES or len({ipa for ipa, _ in entries}) != EXPECTED_ENTRIES:
        raise RuntimeError(f"Expected {EXPECTED_ENTRIES} unique IPA sound entries; found {len(entries)}")

    examples = json.loads(EXAMPLES.read_text(encoding="utf-8"))
    expected_symbols = {ipa for ipa, _ in entries} | {"x", "ʔ"}
    if set(examples) != expected_symbols:
        raise RuntimeError(f"IPA example symbols differ: {sorted(set(examples) ^ expected_symbols)}")

    # Include original study words even when a reference table uses different words.
    words = {audio_key(word): word.lower() for _, word in entries}
    annotated = {}
    for ipa, marked_words in examples.items():
        if not isinstance(marked_words, list) or not (2 <= len(marked_words) <= 4):
            raise RuntimeError(f"Expected 2–4 examples for /{ipa}/")
        resolved = []
        for marked in marked_words:
            word = clean_example(marked)
            key = audio_key(word)
            if key in words and words[key] != word:
                raise RuntimeError(f"Audio filename collision: {words[key]} vs {word}")
            words[key] = word
            resolved.append(word)
        annotated[ipa] = resolved
    return entries, words, annotated


def main():
    if len(sys.argv) != 2:
        raise SystemExit("usage: python scripts/generate_ipa_single_voice.py /path/to/en_US-ljspeech-medium.onnx")
    from piper import PiperVoice
    entries, words, examples = inventory()
    voice = PiperVoice.load(sys.argv[1])
    DEST.mkdir(parents=True, exist_ok=True)
    for old in DEST.glob("*.wav"):
        if old.stem not in words:
            old.unlink()
    durations = {}
    for name, spoken_word in sorted(words.items()):
        path = DEST / f"{name}.wav"
        if not path.exists() or path.stat().st_size < 8000:
            with wave.open(str(path), "wb") as out:
                voice.synthesize_wav(spoken_word + ".", out)
        with wave.open(str(path), "rb") as audio:
            sample_rate, frames, channels = audio.getframerate(), audio.getnframes(), audio.getnchannels()
            if channels != 1 or sample_rate < 16000 or frames < 3000:
                raise RuntimeError(f"Invalid WAV: {path.name}")
            durations[name] = round(frames / sample_rate, 3)
    manifest = {
        "model": MODEL,
        "voice": "One US-English synthetic voice for all examples",
        "model_source": "https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium",
        "training_dataset": "https://keithito.com/LJ-Speech-Dataset/",
        "note": "Whole-word synthesized speech; rare loanword and glottal-stop examples require pronunciation review.",
        "entries": [{"ipa": ipa, "word": word, "file": f"{audio_key(word)}.wav"} for ipa, word in entries],
        "examples": {ipa: [{"word": word, "file": f"{audio_key(word)}.wav"} for word in sounds] for ipa, sounds in examples.items()},
        "unique_audio_count": len(words),
        "durations_seconds": durations,
    }
    (DEST / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Artico IPA: {len(entries)} original entries, {len(examples)} chart rows, {len(words)} WAV files")


if __name__ == "__main__":
    main()
