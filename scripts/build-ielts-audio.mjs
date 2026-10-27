// Optional macOS authoring step. Committed audio is used by the website; CI does not run this.
// Original scripts + an explicitly labelled synthetic voice. No service or API key.
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { listeningScript, skillInfo } from '../src/web/ieltsContent.js'
const scratch = mkdtempSync(join(tmpdir(), 'artico-ielts-audio-'))
const destination = new URL('../public/audio/ielts/', import.meta.url)
mkdirSync(destination, { recursive: true })
const scripts = {
  workshop: 'You will hear the final arrangements for a community workshop. Read the five questions before playing this recording. ' + listeningScript.map((part) => part.text).join(' '),
  'speaking-example': skillInfo.speaking.model.question + ' [[slnc 1500]] ' + skillInfo.speaking.model.segments.map((part) => part[1]).join(' '),
}
for (const [name, script] of Object.entries(scripts)) {
  const raw = join(scratch, name + '.aiff')
  const spoken = spawnSync('/usr/bin/say', ['-v', 'Samantha (English (US))', '-r', '148', '-o', raw, script], { stdio: 'inherit' })
  if (spoken.status !== 0) throw new Error('Speech rendering failed: ' + name)
  const encoded = spawnSync('/usr/bin/afconvert', ['-f', 'WAVE', '-d', 'LEI16@22050', '-c', '1', raw, new URL(name + '.wav', destination).pathname], { stdio: 'inherit' })
  if (encoded.status !== 0) throw new Error('Audio encoding failed: ' + name)
  process.stdout.write(`Created ${name}.wav (synthetic training voice)\n`)
}
