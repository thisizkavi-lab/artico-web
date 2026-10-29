# Tongue-twister recordings — ga-v01

The user's generated set is integrated as **generated AI audio**, not falsely marked as listening-approved. Model: Gemini 3.8 Flash TTS; voice: Kore; delivery prompts: General American English. Technical checks passed; transcript, phonetic and voice-consistency listening review remain pending in the manifest.

## Placement

- Study: 24 complete, natural readings, one per existing card.
- Practice: 92 careful step bindings (68 build-up recordings and 24 complete readings).
- Final Practice step: Careful and Natural choices. Natural reuses the matching Study file rather than creating a duplicate recording.
- Practice focus: 118 word/short-phrase bindings; 15 deliberately reuse matching careful steps.
- Practice transfer: 48 natural readings of the two existing everyday examples per card.

These 330 control references use **267 unique static MP3 files**. Course texts, Japanese explanations, card order, and build-step order are unchanged. No live synthesis, credentials, API calls, or browser TTS are needed.

`src/web/twisterAudioManifest.json` records exact texts, stable relative paths, byte counts, SHA-256 hashes, provenance and honest review status. Files live under `public/audio/tongue-twisters/ga-v01/`. All URLs use Vite's base URL so development and GitHub Pages' `/artico-web/` prefix both work.

Focus/transfer taps select their own visible text and start the existing shared player. Repeated taps replay from the beginning. Back to practice step, next/previous, changing the delivery, changing cards, and leaving the page stop the old clip. Rate, seek, replay and loop controls remain available; careful audio is already careful at 1.0x.

The offline `scripts/import-twister-audio.mjs` imports a complete, technically verified review bundle. It never generates audio and must not invent review approvals. Do not commit raw provider responses, ledgers, credentials or WAV working originals with the web assets. Old legacy files are retained for other consumers and rollback.
