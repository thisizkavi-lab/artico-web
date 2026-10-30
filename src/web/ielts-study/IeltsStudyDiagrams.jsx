/**
 * Artico IELTS Study Constructive SVG Diagrams (`artico-ielts-study-v1`)
 * All 23 constructive SVG diagrams specified in SVG_AND_MEDIA_SLOTS.md.
 * Rules:
 * - viewBox="0 0 720 H" (H between 200 and 420)
 * - Unique <defs> prefixes d01- through d23-
 * - Minimum 8 vector primitive elements per diagram
 * - Artico warm paper & slate palette (no #000000, no rgb())
 * - Minimum font size 12 (11 for minor ticks)
 */

import React from 'react'
import { DIAGRAM_IDS } from './diagramManifest.js'
export { DIAGRAM_IDS }

// 1. diag-score-rounding (720x220)
function DiagScoreRounding() {
  return (
    <svg viewBox="0 0 720 220" width="100%" role="img" aria-label="Score rounding number line from Band 6.0 to 7.0 showing rounding rules at .125, .25, and .75" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d01-arr-ink" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#263b3b" />
        </marker>
        <marker id="d01-arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#285bcc" />
        </marker>
        <marker id="d01-arr-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#275d3c" />
        </marker>
      </defs>
      <rect x="10" y="10" width="700" height="200" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="34" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Overall Band Rounding Rules (.125, .25, .75)</text>

      {/* Number line */}
      <line x1="80" y1="120" x2="640" y2="120" stroke="#263b3b" strokeWidth="2.5" />

      {/* Major ticks */}
      <line x1="80" y1="110" x2="80" y2="130" stroke="#263b3b" strokeWidth="2.5" />
      <text x="80" y="148" textAnchor="middle" fontSize="14" fontWeight="700" fill="#263b3b">Band 6.0</text>

      <line x1="360" y1="110" x2="360" y2="130" stroke="#263b3b" strokeWidth="2.5" />
      <text x="360" y="148" textAnchor="middle" fontSize="14" fontWeight="700" fill="#285bcc">Band 6.5</text>

      <line x1="640" y1="110" x2="640" y2="130" stroke="#263b3b" strokeWidth="2.5" />
      <text x="640" y="148" textAnchor="middle" fontSize="14" fontWeight="700" fill="#263b3b">Band 7.0</text>

      {/* Minor ticks */}
      <line x1="150" y1="114" x2="150" y2="126" stroke="#657273" strokeWidth="1.5" />
      <text x="150" y="106" textAnchor="middle" fontSize="11" fill="#657273">6.125</text>

      <line x1="220" y1="114" x2="220" y2="126" stroke="#285bcc" strokeWidth="1.5" />
      <text x="220" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#285bcc">6.25</text>

      <line x1="290" y1="114" x2="290" y2="126" stroke="#657273" strokeWidth="1.5" />
      <text x="290" y="106" textAnchor="middle" fontSize="11" fill="#657273">6.375</text>

      <line x1="430" y1="114" x2="430" y2="126" stroke="#657273" strokeWidth="1.5" />
      <text x="430" y="106" textAnchor="middle" fontSize="11" fill="#657273">6.625</text>

      <line x1="500" y1="114" x2="500" y2="126" stroke="#275d3c" strokeWidth="1.5" />
      <text x="500" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#275d3c">6.75</text>

      <line x1="570" y1="114" x2="570" y2="126" stroke="#657273" strokeWidth="1.5" />
      <text x="570" y="106" textAnchor="middle" fontSize="11" fill="#657273">6.875</text>

      {/* Case 1: 6.125 rounds DOWN */}
      <path d="M150,92 C140,65 105,65 85,95" fill="none" stroke="#b84a14" strokeWidth="1.5" markerEnd="url(#d01-arr-ink)" />
      <rect x="75" y="44" width="110" height="24" rx="4" fill="#fff6ee" stroke="#e5b899" strokeWidth="1" />
      <text x="130" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b84a14">6.125 → 6.0 (Down)</text>

      {/* Case 2: 6.25 rounds UP to .5 */}
      <path d="M220,92 C250,55 320,55 350,95" fill="none" stroke="#285bcc" strokeWidth="1.8" markerEnd="url(#d01-arr-blue)" />
      <rect x="245" y="44" width="125" height="24" rx="4" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1" />
      <text x="307" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#285bcc">.25 → 6.5 (Up to half)</text>

      {/* Case 3: 6.75 rounds UP to whole */}
      <path d="M500,92 C530,55 600,55 630,95" fill="none" stroke="#275d3c" strokeWidth="1.8" markerEnd="url(#d01-arr-green)" />
      <rect x="525" y="44" width="130" height="24" rx="4" fill="#eef7f1" stroke="#b6d9c2" strokeWidth="1" />
      <text x="590" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#275d3c">.75 → 7.0 (Up to whole)</text>

      {/* Explanation footnote */}
      <text x="360" y="188" textAnchor="middle" fontSize="12" fill="#657273">Rule: Average ending in .25 rounds up to the next half band; .75 rounds up to the next whole band.</text>
    </svg>
  )
}

// 2. diag-raw-to-band (720x250)
function DiagRawToBand() {
  return (
    <svg viewBox="0 0 720 250" width="100%" role="img" aria-label="Raw marks to band score comparison across Listening, Academic Reading, and General Training Reading" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="250" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="230" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Raw Marks (out of 40) Required for Key Bands</text>

      {/* Gap highlight bar at Band 7 */}
      <rect x="495" y="45" width="118" height="150" fill="#fff6ee" rx="6" stroke="#e5b899" strokeWidth="1" strokeDasharray="3 3" />
      <text x="554" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">BAND 7 RAW MARK GAP</text>

      {/* Track 1: Listening */}
      <text x="30" y="85" fontSize="12" fontWeight="600" fill="#263b3b">Listening</text>
      <line x1="145" y1="80" x2="675" y2="80" stroke="#e2e6e5" strokeWidth="6" strokeLinecap="round" />
      <circle cx="330" cy="80" r="5" fill="#5c6f7e" /><text x="330" y="71" textAnchor="middle" fontSize="11" fill="#5c6f7e">B5 (16)</text>
      <circle cx="425" cy="80" r="5" fill="#5c6f7e" /><text x="425" y="71" textAnchor="middle" fontSize="11" fill="#5c6f7e">B6 (23)</text>
      <circle cx="520" cy="80" r="6" fill="#285bcc" /><text x="520" y="71" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">B7 (30)</text>
      <circle cx="590" cy="80" r="5" fill="#275d3c" /><text x="590" y="71" textAnchor="middle" fontSize="11" fill="#275d3c">B8 (35)</text>

      {/* Track 2: Academic Reading */}
      <text x="30" y="135" fontSize="12" fontWeight="600" fill="#285bcc">Academic Reading</text>
      <line x1="145" y1="130" x2="675" y2="130" stroke="#e2e6e5" strokeWidth="6" strokeLinecap="round" />
      <circle cx="316" cy="130" r="5" fill="#5c6f7e" /><text x="316" y="121" textAnchor="middle" fontSize="11" fill="#5c6f7e">B5 (15)</text>
      <circle cx="425" cy="130" r="5" fill="#5c6f7e" /><text x="425" y="121" textAnchor="middle" fontSize="11" fill="#5c6f7e">B6 (23)</text>
      <circle cx="520" cy="130" r="6" fill="#285bcc" /><text x="520" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">B7 (30)</text>
      <circle cx="590" cy="130" r="5" fill="#275d3c" /><text x="590" y="121" textAnchor="middle" fontSize="11" fill="#275d3c">B8 (35)</text>

      {/* Track 3: GT Reading */}
      <text x="30" y="185" fontSize="12" fontWeight="600" fill="#4a3f6b">[GT] Reading</text>
      <line x1="145" y1="180" x2="675" y2="180" stroke="#e2e6e5" strokeWidth="6" strokeLinecap="round" />
      <circle cx="358" cy="180" r="5" fill="#5c6f7e" /><text x="358" y="171" textAnchor="middle" fontSize="11" fill="#5c6f7e">B5 (18)</text>
      <circle cx="478" cy="180" r="5" fill="#5c6f7e" /><text x="478" y="171" textAnchor="middle" fontSize="11" fill="#5c6f7e">B6 (27)</text>
      <circle cx="590" cy="180" r="7" fill="#b84a14" /><text x="582" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b84a14">B7 (35)</text>
      <circle cx="648" cy="180" r="5" fill="#275d3c" /><text x="652" y="171" textAnchor="middle" fontSize="11" fill="#275d3c">B8 (38)</text>

      {/* Summary note */}
      <text x="360" y="222" textAnchor="middle" fontSize="12" fill="#657273">General Training Reading requires roughly 5 more raw marks (35/40 vs 30/40) for Band 7 due to everyday texts.</text>
    </svg>
  )
}

// 3. diag-9step-cycle (720x310)
function Diag9stepCycle() {
  return (
    <svg viewBox="0 0 720 310" width="100%" role="img" aria-label="Nine-step preparation cycle organized into Build, Test, and Repair phases" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d03-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#263b3b" />
        </marker>
        <marker id="d03-arr-loop" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#b84a14" />
        </marker>
      </defs>
      <rect x="10" y="10" width="700" height="290" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">The Nine-Step Preparation Cycle</text>

      {/* Phase A: Build */}
      <rect x="25" y="46" width="210" height="175" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1" />
      <text x="130" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">Phase A · Build Skills</text>
      <text x="35" y="92" fontSize="11" fill="#263b3b">1. Understand the task</text>
      <text x="35" y="118" fontSize="11" fill="#263b3b">2. Observe worked example</text>
      <text x="35" y="144" fontSize="11" fill="#263b3b">3. Explain method in own words</text>
      <text x="35" y="170" fontSize="11" fill="#263b3b">4. Apply with support / unclocked</text>

      {/* Phase B: Test */}
      <rect x="255" y="46" width="210" height="175" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1" />
      <text x="360" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">Phase B · Test Control</text>
      <text x="265" y="92" fontSize="11" fill="#263b3b">5. Fresh timed attempt</text>
      <text x="265" y="118" fontSize="11" fill="#263b3b">6. Review evidence</text>
      <text x="265" y="144" fontSize="11" fill="#657273">(Check actual answers against</text>
      <text x="265" y="162" fontSize="11" fill="#657273">passage/recording wording)</text>

      {/* Phase C: Repair */}
      <rect x="485" y="46" width="210" height="175" rx="6" fill="#eef7f1" stroke="#275d3c" strokeWidth="1" />
      <text x="590" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#275d3c">Phase C · Repair & Transfer</text>
      <text x="495" y="92" fontSize="11" fill="#263b3b">7. Isolate one specific weakness</text>
      <text x="495" y="118" fontSize="11" fill="#263b3b">8. Practise smallest useful repair</text>
      <text x="495" y="144" fontSize="11" fill="#263b3b">9. Transfer check on fresh material</text>

      {/* Connecting arrows */}
      <line x1="235" y1="100" x2="253" y2="100" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d03-arr)" />
      <line x1="465" y1="100" x2="483" y2="100" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d03-arr)" />

      {/* Return loop if transfer fails */}
      <path d="M590,221 C590,260 360,260 360,225" fill="none" stroke="#b84a14" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#d03-arr-loop)" />
      <rect x="400" y="235" width="200" height="20" rx="4" fill="#fff6ee" />
      <text x="500" y="249" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#b84a14">If transfer fails, re-test with Step 5</text>

      <text x="360" y="284" textAnchor="middle" fontSize="11" fill="#657273">Advance to next task family only when Step 9 transfers cleanly without coaching.</text>
    </svg>
  )
}

// 4. diag-synonym-5gate (720x210)
function DiagSynonym5gate() {
  return (
    <svg viewBox="0 0 720 210" width="100%" role="img" aria-label="Five-gate synonym verification filter: Meaning, Scope, Grammar, Collocation, Register" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d04-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#263b3b" />
        </marker>
        <marker id="d04-arr-down" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#b84a14" />
        </marker>
      </defs>
      <rect x="10" y="10" width="700" height="190" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Five-Gate Synonym Verification Filter</text>

      {/* Gates */}
      <rect x="25" y="45" width="100" height="52" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
      <text x="75" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">1. Meaning</text>
      <text x="75" y="86" textAnchor="middle" fontSize="11" fill="#657273">Same sense?</text>

      <rect x="155" y="45" width="105" height="52" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
      <text x="207" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">2. Scope</text>
      <text x="207" y="86" textAnchor="middle" fontSize="11" fill="#b84a14">citizens ≠ residents</text>

      <rect x="290" y="45" width="100" height="52" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
      <text x="340" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">3. Grammar</text>
      <text x="340" y="86" textAnchor="middle" fontSize="11" fill="#657273">Fit clause?</text>

      <rect x="420" y="45" width="105" height="52" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
      <text x="472" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">4. Collocation</text>
      <text x="472" y="86" textAnchor="middle" fontSize="11" fill="#657273">Natural pair?</text>

      <rect x="555" y="45" width="95" height="52" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
      <text x="602" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">5. Register</text>
      <text x="602" y="86" textAnchor="middle" fontSize="11" fill="#657273">Formal/Neutral?</text>

      {/* Connectors */}
      <line x1="125" y1="71" x2="153" y2="71" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d04-arr)" />
      <line x1="260" y1="71" x2="288" y2="71" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d04-arr)" />
      <line x1="390" y1="71" x2="418" y2="71" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d04-arr)" />
      <line x1="525" y1="71" x2="553" y2="71" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d04-arr)" />

      {/* Success outcome */}
      <rect x="555" y="115" width="135" height="32" rx="4" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" />
      <text x="622" y="136" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">✓ Use replacement</text>

      {/* Drop down on failure */}
      <path d="M207,97 L207,145 L340,145" fill="none" stroke="#b84a14" strokeWidth="1.5" markerEnd="url(#d04-arr-down)" />
      <rect x="345" y="128" width="190" height="34" rx="4" fill="#fff6ee" stroke="#e5b899" strokeWidth="1.5" />
      <text x="440" y="149" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">Failed any gate → Keep original</text>

      <text x="360" y="185" textAnchor="middle" fontSize="12" fill="#657273">Never swap a word merely to avoid repetition if the alternative changes scope or grammar.</text>
    </svg>
  )
}

// 5. diag-listening-timeline (720x210)
function DiagListeningTimeline() {
  return (
    <svg viewBox="0 0 720 210" width="100%" role="img" aria-label="Listening audio timeline showing first mention distractor, pivot signal, and final target decision" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="210" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="190" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Audio Stream: Tracking Self-Correction and Pivot Signals</text>

      {/* Timeline track */}
      <line x1="50" y1="95" x2="670" y2="95" stroke="#263b3b" strokeWidth="3" />

      {/* Point 1: 0:18 First mention (Distractor) */}
      <circle cx="155" cy="95" r="7" fill="#b84a14" />
      <text x="155" y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b84a14">0:18</text>
      <rect x="65" y="42" width="180" height="38" rx="5" fill="#fff6ee" stroke="#b84a14" strokeWidth="1" />
      <text x="155" y="58" textAnchor="middle" fontSize="11" textDecoration="line-through" fill="#b84a14">"Originally Room 14"</text>
      <text x="155" y="73" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#b84a14">DISTRACTOR (Cancelled)</text>

      {/* Point 2: 0:21 Pivot signal */}
      <circle cx="360" cy="95" r="7" fill="#285bcc" />
      <text x="360" y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">0:21</text>
      <rect x="265" y="42" width="190" height="38" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1" />
      <text x="360" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">"However, projector repair"</text>
      <text x="360" y="73" textAnchor="middle" fontSize="10.5" fill="#285bcc">PIVOT SIGNAL (Alert)</text>

      {/* Point 3: 0:25 Final decision (Target) */}
      <circle cx="565" cy="95" r="8" fill="#275d3c" />
      <text x="565" y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill="#275d3c">0:25</text>
      <rect x="475" y="42" width="180" height="38" rx="5" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" />
      <text x="565" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">"Come to Room 18 instead"</text>
      <text x="565" y="73" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#275d3c">✓ TARGET ANSWER</text>

      <text x="360" y="155" textAnchor="middle" fontSize="12" fill="#263b3b">Do not write the first number you hear. Listen through pivot words (however, actually, instead).</text>
      <text x="360" y="175" textAnchor="middle" fontSize="11" fill="#657273">Practice data matched to the Bellford Community Workshop audio recording.</text>
    </svg>
  )
}

// 6. diag-listening-map-bellford (720x380)
function DiagListeningMapBellford() {
  return (
    <svg viewBox="0 0 720 380" width="100%" role="img" aria-label="Architectural ground plan of Bellford Study Centre with lettered rooms A through F and Compass Rose" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d06-arr-ink" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#263b3b" />
        </marker>
      </defs>
      <rect x="0" y="0" width="720" height="380" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="360" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Bellford Study Centre Ground Plan</text>

      {/* Compass Rose */}
      <g transform="translate(652, 85)">
        <circle cx="0" cy="0" r="32" fill="#fbfaf7" stroke="#657273" strokeWidth="1.2" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#263b3b" strokeWidth="1.5" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#263b3b" strokeWidth="1.5" />
        <polygon points="0,-14 -4,-6 4,-6" fill="#285bcc" />
        <text x="0" y="-18" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#285bcc">N</text>
        <text x="21" y="4" textAnchor="middle" fontSize="11" fontWeight="600" fill="#657273">E</text>
        <text x="0" y="25" textAnchor="middle" fontSize="11" fontWeight="600" fill="#657273">S</text>
        <text x="-21" y="4" textAnchor="middle" fontSize="11" fontWeight="600" fill="#657273">W</text>
      </g>

      {/* Centre Outer Wall */}
      <rect x="45" y="45" width="555" height="260" fill="#fbfaf7" stroke="#263b3b" strokeWidth="2" />

      {/* West Wing: Rooms B (north-west) & A (south-west) */}
      <rect x="60" y="60" width="108" height="72" fill="#ffffff" stroke="#263b3b" strokeWidth="1.5" />
      <text x="114" y="101" textAnchor="middle" fontSize="14" fontWeight="700" fill="#285bcc">[B]</text>

      <rect x="60" y="152" width="108" height="72" fill="#ffffff" stroke="#263b3b" strokeWidth="1.5" />
      <text x="114" y="193" textAnchor="middle" fontSize="14" fontWeight="700" fill="#285bcc">[A]</text>

      {/* Room C (Former Bookshop, closed) */}
      <rect x="180" y="60" width="58" height="72" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="209" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b84a14">[C]</text>
      <text x="209" y="114" textAnchor="middle" fontSize="10" fill="#b84a14">Closed</text>

      {/* Room D (North of Courtyard Garden) */}
      <rect x="250" y="60" width="210" height="48" fill="#ffffff" stroke="#263b3b" strokeWidth="1.5" />
      <text x="355" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#285bcc">[D] <tspan fontSize="11" fontWeight="500" fill="#657273">Seminar Room</tspan></text>

      {/* Courtyard Garden (Central) */}
      <rect x="250" y="118" width="210" height="86" rx="8" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="355" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="#275d3c">Courtyard Garden</text>
      <text x="355" y="176" textAnchor="middle" fontSize="10.5" fill="#657273">(Open to sky)</text>

      {/* East Wing: Room E (IT Workshop, north-east) & Room F (Cafe, east) */}
      <rect x="475" y="60" width="110" height="72" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.5" />
      <text x="530" y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill="#285bcc">[E]</text>
      <text x="530" y="112" textAnchor="middle" fontSize="11" fill="#285bcc">IT Workshop</text>

      <rect x="475" y="152" width="110" height="72" fill="#ffffff" stroke="#263b3b" strokeWidth="1.5" />
      <text x="530" y="184" textAnchor="middle" fontSize="12" fontWeight="600" fill="#263b3b">Café</text>
      <text x="530" y="205" textAnchor="middle" fontSize="13" fontWeight="700" fill="#285bcc">[F]</text>

      {/* Reception Desk */}
      <rect x="285" y="220" width="140" height="38" rx="4" fill="#5c6f7e" />
      <text x="355" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff">Reception Desk</text>

      {/* Main Entrance (South) */}
      <path d="M355,335 L355,310" stroke="#263b3b" strokeWidth="2.5" markerEnd="url(#d06-arr-ink)" />
      <text x="355" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#263b3b">▲ Main Entrance · You Are Here</text>

      <text x="355" y="288" textAnchor="middle" fontSize="11" fill="#657273">Foyer Corridor</text>
    </svg>
  )
}

// 7. diag-reading-5ops (720x220)
function DiagReading5ops() {
  return (
    <svg viewBox="0 0 720 220" width="100%" role="img" aria-label="Five reading operations funnel from 900-word passage to verified target answer" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="200" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">The Five Reading Operations Funnel</text>

      {/* 5 Funnel Stages */}
      <g transform="translate(25, 45)">
        <rect x="0" y="0" width="125" height="60" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.5" />
        <text x="62" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">1. Decode</text>
        <text x="62" y="42" textAnchor="middle" fontSize="11" fill="#657273">Question task</text>
      </g>
      <g transform="translate(160, 45)">
        <rect x="0" y="0" width="125" height="60" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.5" />
        <text x="62" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">2. Skim</text>
        <text x="62" y="42" textAnchor="middle" fontSize="11" fill="#657273">Passage map</text>
      </g>
      <g transform="translate(295, 45)">
        <rect x="0" y="0" width="125" height="60" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.5" />
        <text x="62" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">3. Scan</text>
        <text x="62" y="42" textAnchor="middle" fontSize="11" fill="#657273">Locate anchor</text>
      </g>
      <g transform="translate(430, 45)">
        <rect x="0" y="0" width="125" height="60" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.5" />
        <text x="62" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">4. Read Close</text>
        <text x="62" y="42" textAnchor="middle" fontSize="11" fill="#285bcc">Sentence context</text>
      </g>
      <g transform="translate(565, 45)">
        <rect x="0" y="0" width="125" height="60" rx="6" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" />
        <text x="62" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#275d3c">5. Verify</text>
        <text x="62" y="42" textAnchor="middle" fontSize="11" fill="#275d3c">Full claim limits</text>
      </g>

      {/* Bracket 1: Operations 2 & 3 */}
      <path d="M165,115 L165,125 L290,125 L290,135 L290,125 L415,125 L415,115" fill="none" stroke="#657273" strokeWidth="1.2" />
      <text x="290" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#657273">Locating Tools Only (Find the zone)</text>

      {/* Bracket 2: Operations 4 & 5 */}
      <path d="M435,115 L435,125 L560,125 L560,135 L560,125 L685,125 L685,115" fill="none" stroke="#285bcc" strokeWidth="1.2" />
      <text x="560" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">Decision Tools (Determine the answer)</text>

      <text x="360" y="188" textAnchor="middle" fontSize="12" fill="#263b3b">Never decide True/False/Not Given by scanning alone. Skim and scan locate; close reading decides.</text>
    </svg>
  )
}

// 8. diag-claim-anatomy (720x250)
function DiagClaimAnatomy() {
  return (
    <svg viewBox="0 0 720 250" width="100%" role="img" aria-label="Dissection of a full claim into Quantifier, Action, Frequency, Time, and Implied Relation" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="230" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Claim Anatomy: Why Scanning a Single Word Fails</text>

      {/* Sentence Tokens */}
      <g transform="translate(30, 48)">
        <rect x="0" y="0" width="170" height="42" rx="4" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.2" />
        <text x="85" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fill="#285bcc">"Most urban commuters"</text>
      </g>
      <g transform="translate(205, 48)">
        <rect x="0" y="0" width="150" height="42" rx="4" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="75" y="26" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">"used electric buses"</text>
      </g>
      <g transform="translate(360, 48)">
        <rect x="0" y="0" width="100" height="42" rx="4" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.2" />
        <text x="50" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b84a14">"regularly"</text>
      </g>
      <g transform="translate(465, 48)">
        <rect x="0" y="0" width="220" height="42" rx="4" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.2" />
        <text x="110" y="26" textAnchor="middle" fontSize="12" fontWeight="600" fill="#275d3c">"after fares fell in 2023"</text>
      </g>

      {/* Token Explanations */}
      <text x="115" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#285bcc">Group / Quantifier</text>
      <text x="115" y="126" textAnchor="middle" fontSize="10" fill="#657273">"Most" ≠ "All" or "Some"</text>

      <text x="280" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#263b3b">Action</text>
      <text x="280" y="126" textAnchor="middle" fontSize="10" fill="#657273">Actual vehicle used</text>

      <text x="410" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">Frequency Pivot</text>
      <text x="410" y="126" textAnchor="middle" fontSize="10" fill="#b84a14">Trap: passage may say "once"</text>

      <text x="575" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#275d3c">Time & Sequence</text>
      <text x="575" y="126" textAnchor="middle" fontSize="10" fill="#657273">Year anchor: 2023</text>

      {/* Critical causal trap banner */}
      <rect x="30" y="148" width="655" height="74" rx="5" fill="#fff6ee" stroke="#b84a14" strokeWidth="1" />
      <text x="357" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b84a14">CRITICAL CAUSAL TRAP: Sequence does NOT equal Cause</text>
      <text x="357" y="190" textAnchor="middle" fontSize="11" fill="#263b3b">"After fares fell" proves timing, not cause.</text>
      <text x="357" y="206" textAnchor="middle" fontSize="11" fill="#263b3b">If the statement asserts lower fares caused ridership, label NOT GIVEN unless cause is stated.</text>
    </svg>
  )
}

// 9. diag-tfng-logic (720x270)
function DiagTfngLogic() {
  return (
    <svg viewBox="0 0 720 270" width="100%" role="img" aria-label="Three-outcome logic tree for True, False, and Not Given questions" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d09-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#263b3b" />
        </marker>
      </defs>
      <rect x="10" y="10" width="700" height="250" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">True / False / Not Given Decision Logic</text>

      {/* Root Node */}
      <rect x="180" y="48" width="360" height="40" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.5" />
      <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">Compare full statement against passage evidence</text>

      {/* 3 Outgoing branches */}
      <line x1="260" y1="88" x2="130" y2="128" stroke="#263b3b" strokeWidth="1.5" markerEnd="url(#d09-arr)" />
      <line x1="360" y1="88" x2="360" y2="128" stroke="#263b3b" strokeWidth="1.5" markerEnd="url(#d09-arr)" />
      <line x1="460" y1="88" x2="590" y2="128" stroke="#263b3b" strokeWidth="1.5" markerEnd="url(#d09-arr)" />

      {/* Outcome 1: TRUE */}
      <rect x="30" y="130" width="200" height="70" rx="6" fill="#eef7f1" stroke="#275d3c" strokeWidth="2" />
      <text x="130" y="154" textAnchor="middle" fontSize="14" fontWeight="800" fill="#275d3c">TRUE</text>
      <text x="130" y="172" textAnchor="middle" fontSize="11" fill="#263b3b">Passage proves every</text>
      <text x="130" y="188" textAnchor="middle" fontSize="11" fill="#263b3b">part of the claim.</text>

      {/* Outcome 2: FALSE */}
      <rect x="260" y="130" width="200" height="70" rx="6" fill="#fff6ee" stroke="#b84a14" strokeWidth="2" />
      <text x="360" y="154" textAnchor="middle" fontSize="14" fontWeight="800" fill="#b84a14">FALSE</text>
      <text x="360" y="172" textAnchor="middle" fontSize="11" fill="#263b3b">Passage contradicts</text>
      <text x="360" y="188" textAnchor="middle" fontSize="11" fill="#263b3b">or proves incompatible fact.</text>

      {/* Outcome 3: NOT GIVEN */}
      <rect x="490" y="130" width="200" height="70" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="2" />
      <text x="590" y="154" textAnchor="middle" fontSize="14" fontWeight="800" fill="#285bcc">NOT GIVEN</text>
      <text x="590" y="172" textAnchor="middle" fontSize="11" fill="#263b3b">Passage is silent,</text>
      <text x="590" y="188" textAnchor="middle" fontSize="11" fill="#263b3b">or cannot be proved either way.</text>

      {/* Footnote on Silence */}
      <text x="360" y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b84a14">Silence is NOT False. If the passage does not confirm or contradict, it is Not Given.</text>
      <text x="360" y="244" textAnchor="middle" fontSize="11" fill="#657273">Do not use outside personal knowledge to supply missing evidence.</text>
    </svg>
  )
}

// 10. diag-task1-4part-blueprint (720x270)
function DiagTask14partBlueprint() {
  return (
    <svg viewBox="0 0 720 270" width="100%" role="img" aria-label="Academic Task 1 four-paragraph blueprint: Introduction, Overview, Detail Paragraph 1, Detail Paragraph 2" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="250" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="32" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Academic Task 1: Four-Paragraph Structural Blueprint</text>

      {/* Mini Visual Icon */}
      <g transform="translate(30, 48)">
        <rect x="0" y="0" width="140" height="175" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
        <text x="70" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Visual Input</text>
        <rect x="20" y="90" width="20" height="60" fill="#285bcc" />
        <rect x="48" y="60" width="20" height="90" fill="#5c6f7e" />
        <rect x="76" y="110" width="20" height="40" fill="#285bcc" />
        <rect x="104" y="45" width="20" height="105" fill="#5c6f7e" />
        <line x1="15" y1="150" x2="128" y2="150" stroke="#263b3b" strokeWidth="1" />
        <text x="70" y="166" textAnchor="middle" fontSize="10" fill="#657273">Line/Bar/Table/Map</text>
      </g>

      {/* 4 Paragraph Blocks */}
      <g transform="translate(195, 48)">
        {/* P1: Introduction */}
        <rect x="0" y="0" width="500" height="38" rx="5" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="15" y="24" fontSize="12" fontWeight="700" fill="#263b3b">Paragraph 1 · Introduction</text>
        <text x="195" y="24" fontSize="11" fill="#657273">1 sentence · Paraphrase prompt (What + Where + When)</text>

        {/* P2: Overview */}
        <rect x="0" y="44" width="500" height="42" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.8" />
        <text x="15" y="68" fontSize="12" fontWeight="700" fill="#285bcc">Paragraph 2 · Overview</text>
        <text x="195" y="68" fontSize="11" fontWeight="600" fill="#285bcc">2–3 macro features · Main trends / extremes (No data)</text>

        {/* P3: Detail A */}
        <rect x="0" y="92" width="500" height="38" rx="5" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="15" y="116" fontSize="12" fontWeight="700" fill="#263b3b">Paragraph 3 · Detail Group A</text>
        <text x="195" y="116" fontSize="11" fill="#657273">Selected figures, comparisons, and grouped categories</text>

        {/* P4: Detail B */}
        <rect x="0" y="136" width="500" height="38" rx="5" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="15" y="160" fontSize="12" fontWeight="700" fill="#263b3b">Paragraph 4 · Detail Group B</text>
        <text x="195" y="160" fontSize="11" fill="#657273">Contrasting/remaining figures, comparisons, endpoints</text>
      </g>

      {/* Crossed out ghost conclusion */}
      <text x="445" y="242" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b84a14">✕ NO OPINION CONCLUSION: Task 1 is an objective report. Never explain causes or add opinions.</text>
    </svg>
  )
}

// 11. diag-task1-line-phases (720x300)
function DiagTask1LinePhases() {
  return (
    <svg viewBox="0 0 720 300" width="100%" role="img" aria-label="Plotted line graph divided into three chronological phases: steep rise, plateau, and moderate decline" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="280" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Chunking Dynamic Data into Chronological Phases (Practice Data, Invented)</text>

      {/* Grid and Phase Shading */}
      <rect x="90" y="55" width="170" height="175" fill="#eaf0fc" opacity="0.6" />
      <rect x="260" y="55" width="170" height="175" fill="#f4f5f2" opacity="0.6" />
      <rect x="430" y="55" width="190" height="175" fill="#fff6ee" opacity="0.6" />

      {/* Phase Headings */}
      <text x="175" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">Phase 1: Steep Rise</text>
      <text x="345" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5c6f7e">Phase 2: Plateau</text>
      <text x="525" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">Phase 3: Decline</text>

      {/* Vertical phase boundary dashed lines */}
      <line x1="260" y1="55" x2="260" y2="230" stroke="#657273" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="430" y1="55" x2="430" y2="230" stroke="#657273" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Axes */}
      <line x1="90" y1="230" x2="620" y2="230" stroke="#263b3b" strokeWidth="2" />
      <line x1="90" y1="55" x2="90" y2="230" stroke="#263b3b" strokeWidth="2" />

      {/* Axis ticks */}
      <text x="80" y="234" textAnchor="end" fontSize="10" fill="#657273">0</text>
      <text x="80" y="178" textAnchor="end" fontSize="10" fill="#657273">40</text>
      <text x="80" y="122" textAnchor="end" fontSize="10" fill="#657273">70</text>
      <text x="80" y="66" textAnchor="end" fontSize="10" fill="#657273">100</text>

      <text x="90" y="248" textAnchor="middle" fontSize="11" fill="#263b3b">2010</text>
      <text x="260" y="248" textAnchor="middle" fontSize="11" fill="#263b3b">2015</text>
      <text x="430" y="248" textAnchor="middle" fontSize="11" fill="#263b3b">2020</text>
      <text x="620" y="248" textAnchor="middle" fontSize="11" fill="#263b3b">2025</text>

      {/* Series A (Blue): 22 -> 68 -> 70 -> 50 */}
      <path d="M90,198 L260,126 L430,122 L620,158" fill="none" stroke="#285bcc" strokeWidth="2.8" />
      <circle cx="90" cy="198" r="4" fill="#285bcc" />
      <circle cx="260" cy="126" r="4" fill="#285bcc" />
      <circle cx="430" cy="122" r="4" fill="#285bcc" />
      <circle cx="620" cy="158" r="4" fill="#285bcc" />

      {/* Series B (Slate): 30 -> 40 -> 50 -> 58 */}
      <path d="M90,185 L260,168 L430,150 L620,136" fill="none" stroke="#5c6f7e" strokeWidth="2.2" strokeDasharray="5 3" />
      <circle cx="90" cy="185" r="3.5" fill="#5c6f7e" />
      <circle cx="260" cy="168" r="3.5" fill="#5c6f7e" />
      <circle cx="430" cy="150" r="3.5" fill="#5c6f7e" />
      <circle cx="620" cy="136" r="3.5" fill="#5c6f7e" />

      {/* Intersection pin (Overtaking point around 2023) */}
      <circle cx="530" cy="144" r="5" fill="#b84a14" />
      <line x1="530" y1="144" x2="570" y2="105" stroke="#b84a14" strokeWidth="1.2" />
      <text x="575" y="102" fontSize="10" fontWeight="700" fill="#b84a14">Overtaking point (2023)</text>

      {/* Legend */}
      <line x1="200" y1="275" x2="230" y2="275" stroke="#285bcc" strokeWidth="2.5" />
      <text x="238" y="279" fontSize="11" fill="#263b3b">Product A (Rose steeply, peaked, then declined)</text>

      <line x1="480" y1="275" x2="510" y2="275" stroke="#5c6f7e" strokeWidth="2" strokeDasharray="5 3" />
      <text x="518" y="279" fontSize="11" fill="#263b3b">Product B (Steady growth)</text>
    </svg>
  )
}

// 12. diag-pct-vs-points (720x290)
function DiagPctVsPoints() {
  return (
    <svg viewBox="0 0 720 290" width="100%" role="img" aria-label="Comparison between absolute percentage points and relative percentage change with base population doubling" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d12-arr-amber" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#b84a14" />
        </marker>
      </defs>
      <rect x="0" y="0" width="720" height="290" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="270" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Percentages against Percentage Points (Practice Data, Invented)</text>

      {/* Bar 1: 2015 (60%) */}
      <g transform="translate(52, 68)">
        <rect x="0" y="20" width="64" height="138" rx="4" fill="#285bcc" />
        <text x="32" y="13" textAnchor="middle" fontSize="14" fontWeight="700" fill="#285bcc">60%</text>
        <text x="32" y="175" textAnchor="middle" fontSize="12" fontWeight="600" fill="#263b3b">2015</text>
      </g>

      {/* Bar 2: 2025 (40%) */}
      <g transform="translate(218, 68)">
        <rect x="0" y="66" width="64" height="92" rx="4" fill="#5c6f7e" />
        <text x="32" y="57" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5c6f7e">40%</text>
        <text x="32" y="175" textAnchor="middle" fontSize="12" fontWeight="600" fill="#263b3b">2025</text>
      </g>

      {/* Bracket 1: Percentage Points (60 - 40 = 20 pts) */}
      <path d="M122,88 L138,88 L138,111 L150,111 L138,111 L138,134 L122,134" fill="none" stroke="#285bcc" strokeWidth="2" />
      <text x="155" y="115" fontSize="11.5" fontWeight="700" fill="#285bcc">−20 pts</text>

      {/* Arc 2: Relative percentage change (20 / 60 = 33.3%) routed cleanly to left shoulder of 2025 bar */}
      <path d="M112,78 C148,46 188,52 214,130" fill="none" stroke="#b84a14" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#d12-arr-amber)" />
      <text x="168" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">−33.3% relative drop</text>

      {/* Right panel: Base doubling trap */}
      <rect x="330" y="52" width="360" height="165" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
      <text x="510" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">The Base Population Trap</text>
      <text x="350" y="100" fontSize="11" fill="#263b3b">• In 2015: 60% of 1,000 visitors = <tspan fontWeight="700">600 visitors</tspan></text>
      <text x="350" y="122" fontSize="11" fill="#263b3b">• In 2025: Total visits doubled to 2,000</text>
      <text x="350" y="144" fontSize="11" fill="#263b3b">• In 2025: 40% of 2,000 visitors = <tspan fontWeight="700" fill="#275d3c">800 visitors</tspan></text>
      <rect x="345" y="158" width="330" height="45" rx="4" fill="#fff6ee" stroke="#b84a14" strokeWidth="1" />
      <text x="510" y="174" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">A falling share does NOT mean fewer people.</text>
      <text x="510" y="191" textAnchor="middle" fontSize="10.5" fill="#b84a14">Headcount rose (600 → 800) even as percentage fell (60% → 40%).</text>

      <text x="360" y="268" textAnchor="middle" fontSize="11.5" fill="#657273">Never write "fell by 20%" when you mean "fell by 20 percentage points".</text>
    </svg>
  )
}

// 13. diag-task1-bar-static-dynamic (720x280)
function DiagTask1BarStaticDynamic() {
  return (
    <svg viewBox="0 0 720 280" width="100%" role="img" aria-label="Two visual traps: truncated y-axis exaggeration and treating Total row as a category" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="260" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Task 1 Traps: Truncated Axis & Total Rows</text>

      {/* Left Panel: Truncated axis */}
      <rect x="25" y="48" width="320" height="185" rx="6" fill="#fff6ee" stroke="#b84a14" strokeWidth="1" />
      <text x="185" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b84a14">Trap 1: Truncated Axis Starts at 50%</text>

      {/* Axis */}
      <line x1="60" y1="180" x2="290" y2="180" stroke="#263b3b" strokeWidth="1.5" />
      <line x1="60" y1="90" x2="60" y2="180" stroke="#263b3b" strokeWidth="1.5" />
      <text x="52" y="184" textAnchor="end" fontSize="10" fill="#b84a14">50%</text>
      <text x="52" y="135" textAnchor="end" fontSize="10" fill="#657273">55%</text>
      <text x="52" y="94" textAnchor="end" fontSize="10" fill="#657273">60%</text>

      {/* Bar A (54%) vs Bar B (58%) */}
      <rect x="100" y="144" width="45" height="36" fill="#5c6f7e" />
      <text x="122" y="136" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">54%</text>
      <text x="122" y="196" textAnchor="middle" fontSize="11" fill="#263b3b">Group A</text>

      <rect x="195" y="108" width="45" height="72" fill="#285bcc" />
      <text x="217" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">58%</text>
      <text x="217" y="196" textAnchor="middle" fontSize="11" fill="#263b3b">Group B</text>

      <text x="185" y="222" textAnchor="middle" fontSize="10" fill="#b84a14">Visual looks 2x taller, but gap is only 4 percentage points!</text>

      {/* Right Panel: Total row trap */}
      <rect x="365" y="48" width="330" height="185" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1" />
      <text x="530" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">Trap 2: Ranking "Total" as a Category</text>

      {/* Table specimen */}
      <g transform="translate(385, 85)">
        <rect x="0" y="0" width="290" height="24" fill="#263b3b" />
        <text x="10" y="16" fontSize="11" fontWeight="700" fill="#ffffff">Category</text>
        <text x="270" y="16" textAnchor="end" fontSize="11" fontWeight="700" fill="#ffffff">Share</text>

        <rect x="0" y="24" width="290" height="22" fill="#ffffff" stroke="#dfe3e2" />
        <text x="10" y="39" fontSize="11" fill="#263b3b">Private cars</text>
        <text x="270" y="39" textAnchor="end" fontSize="11" fill="#263b3b">52%</text>

        <rect x="0" y="46" width="290" height="22" fill="#ffffff" stroke="#dfe3e2" />
        <text x="10" y="61" fontSize="11" fill="#263b3b">Public buses</text>
        <text x="270" y="61" textAnchor="end" fontSize="11" fill="#263b3b">31%</text>

        <rect x="0" y="68" width="290" height="22" fill="#ffffff" stroke="#dfe3e2" />
        <text x="10" y="83" fontSize="11" fill="#263b3b">Walking & cycling</text>
        <text x="270" y="83" textAnchor="end" fontSize="11" fill="#263b3b">17%</text>

        {/* Total row highlighted in amber */}
        <rect x="0" y="90" width="290" height="24" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.5" />
        <text x="10" y="106" fontSize="11" fontWeight="700" fill="#b84a14">Total</text>
        <text x="270" y="106" textAnchor="end" fontSize="11" fontWeight="700" fill="#b84a14">100%</text>
      </g>
      <text x="530" y="222" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#b84a14">Never write "Total was the highest category at 100%!"</text>
    </svg>
  )
}

// 14. diag-task1-pie-pair (720x290)
function DiagTask1PiePair() {
  return (
    <svg viewBox="0 0 720 290" width="100%" role="img" aria-label="Two pie charts comparing energy mix in 2014 and 2024 with groupings for major shifts and stable shares" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="290" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="270" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Pair of Pie Charts: National Energy Mix (Practice Data, Invented)</text>

      {/* 2014 Pie (Coal 48%, Gas 30%, Renewables 12%, Other 10%; r=64) */}
      <g transform="translate(135, 128)">
        {/* Coal 48% (0 -> 172.8 deg) */}
        <path d="M0,0 L0,-64 A64,64 0 0,1 8.02,63.50 Z" fill="#263b3b" stroke="#ffffff" strokeWidth="1.5" />
        {/* Gas 30% (172.8 -> 280.8 deg) */}
        <path d="M0,0 L8.02,63.50 A64,64 0 0,1 -62.87,-11.99 Z" fill="#5c6f7e" stroke="#ffffff" strokeWidth="1.5" />
        {/* Renewables 12% (280.8 -> 324 deg) */}
        <path d="M0,0 L-62.87,-11.99 A64,64 0 0,1 -37.62,-51.78 Z" fill="#275d3c" stroke="#ffffff" strokeWidth="1.5" />
        {/* Other 10% (324 -> 360 deg) */}
        <path d="M0,0 L-37.62,-51.78 A64,64 0 0,1 0,-64 Z" fill="#c8d0cf" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="16" fill="#ffffff" />
        <text x="38" y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">48%</text>
        <text x="-30" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">30%</text>
        <text x="-40" y="-22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">12%</text>
        <text x="-15" y="-44" textAnchor="middle" fontSize="10" fontWeight="700" fill="#263b3b">10%</text>
        <text x="0" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#263b3b">2014</text>
      </g>

      {/* 2024 Pie (Coal 22%, Gas 31%, Renewables 37%, Other 10%; r=64) */}
      <g transform="translate(335, 128)">
        {/* Coal 22% (0 -> 79.2 deg) */}
        <path d="M0,0 L0,-64 A64,64 0 0,1 62.87,-11.99 Z" fill="#263b3b" stroke="#ffffff" strokeWidth="1.5" />
        {/* Gas 31% (79.2 -> 190.8 deg) */}
        <path d="M0,0 L62.87,-11.99 A64,64 0 0,1 -11.99,62.87 Z" fill="#5c6f7e" stroke="#ffffff" strokeWidth="1.5" />
        {/* Renewables 37% (190.8 -> 324 deg) */}
        <path d="M0,0 L-11.99,62.87 A64,64 0 0,1 -37.62,-51.78 Z" fill="#275d3c" stroke="#ffffff" strokeWidth="1.5" />
        {/* Other 10% (324 -> 360 deg) */}
        <path d="M0,0 L-37.62,-51.78 A64,64 0 0,1 0,-64 Z" fill="#c8d0cf" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="16" fill="#ffffff" />
        <text x="28" y="-25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">22%</text>
        <text x="26" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">31%</text>
        <text x="-38" y="8" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">37%</text>
        <text x="-15" y="-44" textAnchor="middle" fontSize="10" fontWeight="700" fill="#263b3b">10%</text>
        <text x="0" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#263b3b">2024</text>
      </g>

      {/* Legend & Grouping Card */}
      <g transform="translate(450, 50)">
        <rect x="0" y="0" width="242" height="175" rx="6" fill="#fbfaf7" stroke="#dfe3e2" strokeWidth="1" />
        <text x="121" y="20" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#263b3b">Overview Groupings</text>

        {/* Group 1: Major Shifts */}
        <rect x="10" y="30" width="222" height="62" rx="4" fill="#eaf0fc" />
        <text x="18" y="46" fontSize="11" fontWeight="700" fill="#285bcc">Group 1 · Major Shift (Rank Swap)</text>
        <circle cx="24" cy="60" r="4.5" fill="#263b3b" />
        <text x="34" y="64" fontSize="10.5" fill="#263b3b">Coal fell sharply: 48% → 22%</text>
        <circle cx="24" cy="78" r="4.5" fill="#275d3c" />
        <text x="34" y="82" fontSize="10.5" fill="#275d3c">Renewables tripled: 12% → 37%</text>

        {/* Group 2: Stable */}
        <rect x="10" y="99" width="222" height="64" rx="4" fill="#f4f5f2" />
        <text x="18" y="115" fontSize="11" fontWeight="700" fill="#5c6f7e">Group 2 · Stable Shares</text>
        <circle cx="24" cy="130" r="4.5" fill="#5c6f7e" />
        <text x="34" y="134" fontSize="10.5" fill="#263b3b">Gas barely changed: 30% → 31%</text>
        <circle cx="24" cy="148" r="4.5" fill="#c8d0cf" stroke="#657273" strokeWidth="0.8" />
        <text x="34" y="152" fontSize="10.5" fill="#263b3b">Other stayed constant: 10% → 10%</text>
      </g>

      {/* Footnote */}
      <text x="235" y="252" textAnchor="middle" fontSize="11.5" fill="#657273">Group the major rank swap against the stable components.</text>
    </svg>
  )
}

// 15. diag-task1-dual-visual (720x270)
function DiagTask1DualVisual() {
  return (
    <svg viewBox="0 0 720 270" width="100%" role="img" aria-label="Paired dual visual comparing museum visitors and cafe spend with valid independent reporting vs invalid causation" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="270" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="250" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Handling Dual Visuals: Independent Metrics vs. False Causation</text>

      {/* Visual 1: Bar Chart (Visitors) */}
      <g transform="translate(35, 50)">
        <rect x="0" y="0" width="190" height="135" rx="5" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="95" y="19" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Chart 1: Annual Visitors</text>
        <text x="95" y="32" textAnchor="middle" fontSize="10" fill="#657273">(thousands)</text>
        {/* Bars */}
        <rect x="35" y="75" width="40" height="42" fill="#285bcc" />
        <text x="55" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">120k</text>
        <text x="55" y="130" textAnchor="middle" fontSize="10" fill="#263b3b">2018</text>

        <rect x="115" y="53" width="40" height="64" fill="#285bcc" />
        <text x="135" y="46" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">190k</text>
        <text x="135" y="130" textAnchor="middle" fontSize="10" fill="#263b3b">2024</text>
      </g>

      {/* Visual 2: Table (Spend) */}
      <g transform="translate(495, 50)">
        <rect x="0" y="0" width="190" height="135" rx="5" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="95" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Table 2: Café Spend</text>
        <text x="95" y="34" textAnchor="middle" fontSize="10" fill="#657273">(average per visitor)</text>
        {/* Table Rows */}
        <rect x="15" y="50" width="160" height="26" fill="#ffffff" stroke="#dfe3e2" />
        <text x="25" y="67" fontSize="11" fill="#263b3b">2018</text>
        <text x="165" y="67" textAnchor="end" fontSize="11" fontWeight="700" fill="#263b3b">£4.20</text>

        <rect x="15" y="80" width="160" height="26" fill="#ffffff" stroke="#dfe3e2" />
        <text x="25" y="97" fontSize="11" fill="#263b3b">2024</text>
        <text x="165" y="97" textAnchor="end" fontSize="11" fontWeight="700" fill="#275d3c">£6.10</text>
      </g>

      {/* Central Connector Rules */}
      <g transform="translate(240, 50)">
        {/* Valid */}
        <rect x="0" y="5" width="240" height="55" rx="4" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.2" />
        <text x="120" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">✓ VALID APPROACH</text>
        <text x="120" y="42" textAnchor="middle" fontSize="10" fill="#263b3b">Report both upward trends</text>
        <text x="120" y="54" textAnchor="middle" fontSize="10" fill="#263b3b">in their own respective units.</text>

        {/* Invalid */}
        <rect x="0" y="70" width="240" height="60" rx="4" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.2" />
        <text x="120" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b84a14">✕ INVALID CAUSATION</text>
        <text x="120" y="106" textAnchor="middle" fontSize="10" fill="#b84a14">Do NOT claim visitor surge</text>
        <text x="120" y="120" textAnchor="middle" fontSize="10" fill="#b84a14">caused café spend to rise!</text>
      </g>

      <text x="360" y="222" textAnchor="middle" fontSize="11" fill="#657273">Two visuals with upward slopes do not prove a causal link. Confine your report to the given data.</text>
    </svg>
  )
}

// 16. diag-task1-map-before-after (720x330)
function DiagTask1MapBeforeAfter() {
  return (
    <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Side-by-side site plans of Bellford Park and Town Square in 2005 past and proposed future redevelopment" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="330" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="310" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="340" y="31" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Map Comparison: Bellford Park &amp; Square Redevelopment</text>

      {/* Compass badge */}
      <g transform="translate(656, 28)">
        <rect x="-32" y="-12" width="64" height="24" rx="12" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">▲ N · Top</text>
      </g>

      {/* Left Map: 2005 (Past) */}
      <g transform="translate(40, 52)">
        <rect x="0" y="0" width="300" height="210" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
        <text x="150" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">2005 (Past Layout)</text>

        {/* NW: Car Park */}
        <rect x="20" y="38" width="115" height="70" fill="#eef2f5" stroke="#5c6f7e" strokeWidth="1.2" />
        <text x="77" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5c6f7e">Car Park</text>

        {/* NE: Warehouse */}
        <rect x="165" y="38" width="115" height="70" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.2" />
        <text x="222" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b84a14">Old Warehouse</text>

        {/* SW: Bus Stop */}
        <rect x="20" y="130" width="115" height="60" fill="#ffffff" stroke="#263b3b" strokeWidth="1.2" />
        <text x="77" y="165" textAnchor="middle" fontSize="11" fill="#263b3b">Bus Stop</text>

        {/* SE: Small Park */}
        <rect x="165" y="130" width="115" height="60" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.2" />
        <text x="222" y="165" textAnchor="middle" fontSize="11" fill="#275d3c">Small Park</text>
      </g>

      {/* Right Map: Proposed Future */}
      <g transform="translate(380, 52)">
        <rect x="0" y="0" width="300" height="210" fill="#fbfaf7" stroke="#285bcc" strokeWidth="1.5" />
        <text x="150" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">Proposed Future Redevelopment</text>

        {/* NW: Pedestrian Plaza (Conversion) */}
        <rect x="20" y="38" width="115" height="70" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.5" />
        <text x="77" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">Pedestrian Plaza</text>
        <text x="77" y="86" textAnchor="middle" fontSize="10" fill="#285bcc">(Converted car park)</text>

        {/* NE: Community Library (Replacement) */}
        <rect x="165" y="38" width="115" height="70" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" />
        <text x="222" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">Community Library</text>
        <text x="222" y="86" textAnchor="middle" fontSize="10" fill="#275d3c">(Replaced warehouse)</text>

        {/* SW: Bus Stop (Unchanged) */}
        <rect x="20" y="130" width="115" height="60" fill="#ffffff" stroke="#263b3b" strokeWidth="1.2" />
        <text x="77" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="#263b3b">Bus Stop</text>
        <text x="77" y="175" textAnchor="middle" fontSize="10" fill="#657273">(Unchanged)</text>

        {/* SE: Expanded Park (Expansion) */}
        <rect x="160" y="130" width="128" height="60" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="224" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="#275d3c">Expanded Park</text>
        <text x="224" y="175" textAnchor="middle" fontSize="10" fill="#275d3c">(Enlarged eastwards)</text>
      </g>

      {/* Vocabulary strip */}
      <text x="360" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="#263b3b">Language: converted into · replaced by · remained unchanged · expanded eastwards</text>
      <text x="360" y="305" textAnchor="middle" fontSize="11" fill="#657273">Use directional compass words (north-west, south-east) when a north indicator is supplied.</text>
    </svg>
  )
}

// 17. diag-task1-process-cycle (720x320)
function DiagTask1ProcessCycle() {
  return (
    <svg viewBox="0 0 720 320" width="100%" role="img" aria-label="Seven-stage cyclical glass container recycling process diagram arranged in two rows with return cycle arrow" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d17-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#263b3b" />
        </marker>
        <marker id="d17-arr-cycle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#285bcc" />
        </marker>
      </defs>
      <rect x="0" y="0" width="720" height="320" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="300" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Cyclical Process: Glass Container Recycling &amp; Remanufacturing</text>

      {/* Row 1: Collection & Sorting (x=72..632) */}
      <g transform="translate(72, 50)">
        <rect x="0" y="0" width="150" height="52" rx="5" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="75" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">1. Used Bottles</text>
        <text x="75" y="39" textAnchor="middle" fontSize="10" fill="#657273">Discarded by consumers</text>

        <line x1="150" y1="26" x2="188" y2="26" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

        <rect x="195" y="0" width="150" height="52" rx="5" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="270" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">2. Collection Point</text>
        <text x="270" y="39" textAnchor="middle" fontSize="10" fill="#657273">Deposited in bottle banks</text>

        <line x1="345" y1="26" x2="383" y2="26" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

        <rect x="390" y="0" width="168" height="52" rx="5" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="474" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">3. Sorting Plant</text>
        <text x="474" y="39" textAnchor="middle" fontSize="10" fill="#657273">Branch: Clear / Green glass</text>
      </g>

      {/* Right-hand downward transition to Row 2 */}
      <path d="M630,76 L672,76 L672,158 L636,158" fill="none" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

      {/* Row 2: Remanufacturing (right to left) */}
      <g transform="translate(72, 132)">
        <rect x="418" y="0" width="140" height="52" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.2" />
        <text x="488" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">4. Crushing</text>
        <text x="488" y="39" textAnchor="middle" fontSize="10" fill="#285bcc">Broken into cullet</text>

        <line x1="418" y1="26" x2="380" y2="26" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

        <rect x="234" y="0" width="140" height="52" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.2" />
        <text x="304" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">5. Furnace</text>
        <text x="304" y="39" textAnchor="middle" fontSize="10" fill="#285bcc">Melted at high heat</text>

        <line x1="234" y1="26" x2="196" y2="26" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

        <rect x="50" y="0" width="140" height="52" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.2" />
        <text x="120" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">6. Moulding</text>
        <text x="120" y="39" textAnchor="middle" fontSize="10" fill="#285bcc">Shaped into bottles</text>
      </g>

      {/* Downward step from 6 to 7 */}
      <line x1="192" y1="184" x2="192" y2="210" stroke="#263b3b" strokeWidth="1.8" markerEnd="url(#d17-arr)" />

      {/* Stage 7: Retail */}
      <rect x="72" y="216" width="210" height="44" rx="5" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.5" />
      <text x="177" y="236" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">7. Retail Filling &amp; Sale</text>
      <text x="177" y="251" textAnchor="middle" fontSize="10" fill="#275d3c">Refilled with drinks for consumers</text>

      {/* Bold blue closed-loop return arrow along clean left channel (zero box crossings) */}
      <path d="M72,238 L34,238 L34,76 L66,76" fill="none" stroke="#285bcc" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#d17-arr-cycle)" />
      <text x="485" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">↺ Closed Loop: Consumed bottles return to Stage 1</text>

      <text x="360" y="294" textAnchor="middle" fontSize="11" fill="#657273">Use passive voice for automated industrial stages: "the glass is crushed", "cullet is melted", "bottles are filled".</text>
    </svg>
  )
}

// 18. diag-task2-3layers (720x240)
function DiagTask23layers() {
  return (
    <svg viewBox="0 0 720 240" width="100%" role="img" aria-label="Three concentric layers of a Task 2 essay prompt: Broad Topic, Specific Focus, and Instruction" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="240" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="220" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Task 2 Prompt Analysis: The Three Concentric Layers</text>

      {/* Layer 1: Broad Topic */}
      <g transform="translate(40, 48)">
        <rect x="0" y="0" width="640" height="50" rx="6" fill="#fff6ee" stroke="#b84a14" strokeWidth="1.5" />
        <text x="20" y="23" fontSize="12" fontWeight="700" fill="#b84a14">Layer 1 · Broad Topic</text>
        <text x="175" y="23" fontSize="12" fontWeight="600" fill="#263b3b">"Higher education and universities"</text>
        <text x="20" y="41" fontSize="10.5" fill="#b84a14">TRAP: Writing only about education in general misses the specific task focus.</text>
      </g>

      {/* Layer 2: Specific Focus */}
      <g transform="translate(90, 106)">
        <rect x="0" y="0" width="540" height="50" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.8" />
        <text x="20" y="23" fontSize="12" fontWeight="700" fill="#285bcc">Layer 2 · Specific Focus</text>
        <text x="175" y="23" fontSize="12" fontWeight="600" fill="#263b3b">"Government funding for <tspan fontWeight="800" fill="#285bcc">adult</tspan> university tuition"</text>
        <text x="20" y="41" fontSize="10.5" fill="#285bcc">CORE: Every body paragraph must address public funding specifically for adult learners.</text>
      </g>

      {/* Layer 3: Instruction */}
      <g transform="translate(140, 164)">
        <rect x="0" y="0" width="440" height="46" rx="6" fill="#eef7f1" stroke="#275d3c" strokeWidth="2" />
        <text x="20" y="21" fontSize="12" fontWeight="700" fill="#275d3c">Layer 3 · Instruction</text>
        <text x="155" y="21" fontSize="12" fontWeight="700" fill="#275d3c">"To what extent do you agree or disagree?"</text>
        <text x="20" y="38" fontSize="10.5" fill="#275d3c">ACTION: State a clear position in the introduction and support it throughout.</text>
      </g>
    </svg>
  )
}

// 19. diag-task2-essay-structures (720x300)
function DiagTask2EssayStructures() {
  return (
    <svg viewBox="0 0 720 300" width="100%" role="img" aria-label="Four Task 2 essay structures showing how paragraph jobs adapt to different prompt instructions" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="280" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Four Task 2 Essay Structures (Matching Job to Prompt)</text>

      {/* Col 1: Agree / Disagree */}
      <g transform="translate(25, 48)">
        <rect x="0" y="0" width="155" height="210" rx="6" fill="#fbfaf7" stroke="#285bcc" strokeWidth="1.5" />
        <text x="77" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">Agree / Disagree</text>
        <rect x="10" y="32" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="48" fontSize="10" fontWeight="700" fill="#263b3b">Intro</text>
        <text x="18" y="60" fontSize="9" fill="#657273">Thesis + clear position</text>

        <rect x="10" y="72" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="88" fontSize="10" fontWeight="700" fill="#263b3b">Body 1</text>
        <text x="18" y="102" fontSize="9" fill="#657273">Primary reason + mech.</text>

        <rect x="10" y="116" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="132" fontSize="10" fontWeight="700" fill="#263b3b">Body 2</text>
        <text x="18" y="146" fontSize="9" fill="#657273">Second reason / counter</text>

        <rect x="10" y="160" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="176" fontSize="10" fontWeight="700" fill="#263b3b">Conclusion</text>
        <text x="18" y="188" fontSize="9" fill="#657273">Restate thesis plainly</text>
      </g>

      {/* Col 2: Discuss Both Views */}
      <g transform="translate(195, 48)">
        <rect x="0" y="0" width="155" height="210" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="77" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Discuss Both Views</text>
        <rect x="10" y="32" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="48" fontSize="10" fontWeight="700" fill="#263b3b">Intro</text>
        <text x="18" y="60" fontSize="9" fill="#657273">Acknowledge both + view</text>

        <rect x="10" y="72" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="88" fontSize="10" fontWeight="700" fill="#263b3b">Body 1</text>
        <text x="18" y="102" fontSize="9" fill="#657273">Explain View A fairly</text>

        <rect x="10" y="116" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="132" fontSize="10" fontWeight="700" fill="#263b3b">Body 2</text>
        <text x="18" y="146" fontSize="9" fill="#657273">Explain View B + own view</text>

        <rect x="10" y="160" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="176" fontSize="10" fontWeight="700" fill="#263b3b">Conclusion</text>
        <text x="18" y="188" fontSize="9" fill="#657273">Summarize balance</text>
      </g>

      {/* Col 3: Advantages Outweigh */}
      <g transform="translate(365, 48)">
        <rect x="0" y="0" width="155" height="210" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="77" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Outweigh Prompt</text>
        <rect x="10" y="32" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="48" fontSize="10" fontWeight="700" fill="#263b3b">Intro</text>
        <text x="18" y="60" fontSize="9" fill="#657273">State which side wins</text>

        <rect x="10" y="72" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="88" fontSize="10" fontWeight="700" fill="#263b3b">Body 1</text>
        <text x="18" y="102" fontSize="9" fill="#657273">Acknowledge minor side</text>

        <rect x="10" y="116" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="132" fontSize="10" fontWeight="700" fill="#263b3b">Body 2</text>
        <text x="18" y="146" fontSize="9" fill="#657273">Defend weightier side</text>

        <rect x="10" y="160" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="176" fontSize="10" fontWeight="700" fill="#263b3b">Conclusion</text>
        <text x="18" y="188" fontSize="9" fill="#657273">Final weight comparison</text>
      </g>

      {/* Col 4: Causes & Solutions */}
      <g transform="translate(535, 48)">
        <rect x="0" y="0" width="155" height="210" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <text x="77" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">Problem / Solution</text>
        <rect x="10" y="32" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="48" fontSize="10" fontWeight="700" fill="#263b3b">Intro</text>
        <text x="18" y="60" fontSize="9" fill="#657273">Paraphrase issue</text>

        <rect x="10" y="72" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="88" fontSize="10" fontWeight="700" fill="#263b3b">Body 1</text>
        <text x="18" y="102" fontSize="9" fill="#657273">1–2 Main Causes</text>

        <rect x="10" y="116" width="135" height="38" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="132" fontSize="10" fontWeight="700" fill="#263b3b">Body 2</text>
        <text x="18" y="146" fontSize="9" fill="#657273">Matching Solutions</text>

        <rect x="10" y="160" width="135" height="34" rx="4" fill="#ffffff" stroke="#dfe3e2" />
        <text x="18" y="176" fontSize="10" fontWeight="700" fill="#263b3b">Conclusion</text>
        <text x="18" y="188" fontSize="9" fill="#657273">Feasible outlook</text>
      </g>

      <text x="360" y="274" textAnchor="middle" fontSize="11" fill="#657273">Never force a rigid 5-paragraph template. Adapt the paragraph jobs directly to the instruction words.</text>
    </svg>
  )
}

// 20. diag-task2-paragraph-chain (720x240)
function DiagTask2ParagraphChain() {
  return (
    <svg viewBox="0 0 720 240" width="100%" role="img" aria-label="Four-link causal development chain inside a Task 2 body paragraph showing claim, mechanism, example, and prompt link" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <defs>
        <marker id="d20-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#263b3b" />
        </marker>
        <marker id="d20-arr-jump" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M1,1 L6,3.5 L1,6 Z" fill="#b84a14" />
        </marker>
      </defs>
      <rect x="10" y="10" width="700" height="220" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Inside a Body Paragraph: The Four-Link Causal Chain</text>

      {/* 4 Connected Links */}
      <g transform="translate(25, 48)">
        <rect x="0" y="0" width="150" height="70" rx="6" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.5" />
        <text x="75" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">1. Main Claim</text>
        <text x="75" y="44" textAnchor="middle" fontSize="11" fill="#657273">What is true?</text>
        <text x="75" y="58" textAnchor="middle" fontSize="10" fill="#657273">(One clear point)</text>
      </g>
      <line x1="175" y1="83" x2="198" y2="83" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d20-arr)" />

      <g transform="translate(205, 48)">
        <rect x="0" y="0" width="150" height="70" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.8" />
        <text x="75" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">2. Mechanism</text>
        <text x="75" y="44" textAnchor="middle" fontSize="11" fill="#285bcc">How / why does</text>
        <text x="75" y="58" textAnchor="middle" fontSize="10" fill="#285bcc">A lead to B?</text>
      </g>
      <line x1="355" y1="83" x2="378" y2="83" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d20-arr)" />

      <g transform="translate(385, 48)">
        <rect x="0" y="0" width="150" height="70" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.5" />
        <text x="75" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">3. Concrete Case</text>
        <text x="75" y="44" textAnchor="middle" fontSize="11" fill="#657273">Realistic example</text>
        <text x="75" y="58" textAnchor="middle" fontSize="10" fill="#657273">(No fake statistics)</text>
      </g>
      <line x1="535" y1="83" x2="558" y2="83" stroke="#263b3b" strokeWidth="2" markerEnd="url(#d20-arr)" />

      <g transform="translate(565, 48)">
        <rect x="0" y="0" width="130" height="70" rx="6" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.8" />
        <text x="65" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#275d3c">4. Prompt Link</text>
        <text x="65" y="44" textAnchor="middle" fontSize="11" fill="#275d3c">How this answers</text>
        <text x="65" y="58" textAnchor="middle" fontSize="10" fill="#275d3c">the exact question</text>
      </g>

      {/* Jumping arc trap */}
      <path d="M100,120 C100,165 630,165 630,123" fill="none" stroke="#b84a14" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#d20-arr-jump)" />
      <rect x="105" y="148" width="510" height="24" rx="4" fill="#fff6ee" stroke="#b84a14" strokeWidth="1" />
      <text x="360" y="164" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#b84a14">TRAP: Jumping from 1 straight to 4 leaves the claim asserted rather than explained</text>

      <text x="360" y="200" textAnchor="middle" fontSize="11" fill="#657273">Explicitly explaining how and why a claim holds strengthens Task Response and logical coherence.</text>
    </svg>
  )
}

// 21. diag-gt-letter-registers (720x255)
function DiagGtLetterRegisters() {
  return (
    <svg viewBox="0 0 720 255" width="100%" role="img" aria-label="Three register bands for General Training Task 1 letters: Informal, Semi-formal, and Formal" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="0" y="0" width="720" height="255" rx="10" fill="#fbfaf7" />
      <rect x="10" y="10" width="700" height="235" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4a3f6b">[GT] General Training Task 1: The Three Letter Registers</text>

      {/* Band 1: Personal / Informal */}
      <g transform="translate(25, 46)">
        <rect x="0" y="0" width="215" height="162" rx="6" fill="#fbfaf7" stroke="#263b3b" strokeWidth="1.2" />
        <rect x="0" y="0" width="215" height="28" rx="6" fill="#f4f5f2" />
        <text x="107" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263b3b">1. Personal / Informal</text>
        <text x="14" y="48" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Recipient:</tspan> Close friend, peer</text>
        <text x="14" y="69" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Salutation:</tspan> "Dear Sam,"</text>
        <text x="14" y="90" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Contractions:</tspan> Natural ("I'm", "won't")</text>
        <text x="14" y="111" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Tone:</tspan> Warm, conversational</text>
        <text x="14" y="132" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Sign-off:</tspan> "Best wishes,"</text>
        <text x="64" y="148" fontSize="10.5" fill="#657273">or "All the best,"</text>
      </g>

      {/* Band 2: Semi-Formal */}
      <g transform="translate(250, 46)">
        <rect x="0" y="0" width="220" height="162" rx="6" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.5" />
        <rect x="0" y="0" width="220" height="28" rx="6" fill="#285bcc" />
        <text x="110" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">2. Semi-Formal</text>
        <text x="14" y="48" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Recipient:</tspan> Known landlord, manager</text>
        <text x="14" y="69" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Salutation:</tspan> "Dear Mr Tan,"</text>
        <text x="14" y="90" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Contractions:</tspan> Avoid or use sparingly</text>
        <text x="14" y="111" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Tone:</tspan> Polite, direct, respectful</text>
        <text x="14" y="132" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Sign-off:</tspan> "Kind regards,"</text>
        <text x="64" y="148" fontSize="10.5" fill="#285bcc">or "Yours sincerely,"</text>
      </g>

      {/* Band 3: Formal */}
      <g transform="translate(480, 46)">
        <rect x="0" y="0" width="215" height="162" rx="6" fill="#fbfaf7" stroke="#4a3f6b" strokeWidth="1.2" />
        <rect x="0" y="0" width="215" height="28" rx="6" fill="#4a3f6b" />
        <text x="107" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">3. Formal</text>
        <text x="14" y="48" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Recipient:</tspan> Unknown official, firm</text>
        <text x="14" y="69" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Salutation:</tspan> "Dear Sir or Madam,"</text>
        <text x="14" y="90" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Contractions:</tspan> Zero ("I cannot", "do not")</text>
        <text x="14" y="111" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Tone:</tspan> Professional, objective</text>
        <text x="14" y="132" fontSize="11" fill="#263b3b"><tspan fontWeight="700">Sign-off:</tspan> "Yours faithfully,"</text>
        <text x="64" y="148" fontSize="10.5" fill="#657273">(Unnamed addressee)</text>
      </g>

      <text x="360" y="227" textAnchor="middle" fontSize="11" fill="#657273">Rule: "Dear Sir or Madam" pairs strictly with "Yours faithfully". Named addressee "Dear Mr..." pairs with "Yours sincerely".</text>
    </svg>
  )
}

// 22. diag-speaking-3parts (720x240)
function DiagSpeaking3parts() {
  return (
    <svg viewBox="0 0 720 240" width="100%" role="img" aria-label="Three-step abstraction staircase of the IELTS Speaking test across Parts 1, 2, and 3" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="220" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Speaking: The Three-Part Abstraction Staircase (11–14 Minutes)</text>

      {/* Step 1: Part 1 */}
      <g transform="translate(30, 130)">
        <rect x="0" y="0" width="200" height="75" rx="5" fill="#f4f5f2" stroke="#263b3b" strokeWidth="1.2" />
        <text x="100" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#263b3b">Part 1 (4–5 min)</text>
        <text x="100" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#285bcc">Familiar Everyday Habits</text>
        <text x="100" y="60" textAnchor="middle" fontSize="10" fill="#657273">Direct answer + 1–2 details</text>
      </g>

      {/* Step 2: Part 2 */}
      <g transform="translate(250, 90)">
        <rect x="0" y="0" width="210" height="115" rx="5" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1.5" />
        <text x="105" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#285bcc">Part 2 (3–4 min)</text>
        <text x="105" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#285bcc">Individual Long Turn</text>
        <text x="105" y="62" textAnchor="middle" fontSize="10" fill="#263b3b">1-min preparation on paper</text>
        <text x="105" y="78" textAnchor="middle" fontSize="10" fill="#263b3b">1–2 min connected monologue</text>
        <text x="105" y="98" textAnchor="middle" fontSize="9.5" fill="#657273">Covers cue card points smoothly</text>
      </g>

      {/* Step 3: Part 3 */}
      <g transform="translate(480, 50)">
        <rect x="0" y="0" width="210" height="155" rx="5" fill="#eef7f1" stroke="#275d3c" strokeWidth="1.8" />
        <text x="105" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#275d3c">Part 3 (4–5 min)</text>
        <text x="105" y="46" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">Abstract Societal Discussion</text>
        <text x="105" y="70" textAnchor="middle" fontSize="10" fill="#263b3b">Move beyond personal self</text>
        <text x="105" y="90" textAnchor="middle" fontSize="10" fill="#263b3b">Compare groups & generations</text>
        <text x="105" y="110" textAnchor="middle" fontSize="10" fill="#263b3b">Speculate, evaluate, hedge</text>
        <text x="105" y="134" textAnchor="middle" fontSize="9.5" fill="#275d3c">Linked to Part 2 topic theme</text>
      </g>

      <text x="360" y="220" textAnchor="middle" fontSize="11" fill="#657273">Notice the rise in abstraction: from personal facts (P1), to detailed narrative (P2), to societal issues (P3).</text>
    </svg>
  )
}

// 23. diag-speaking-stress-contrast (720x220)
function DiagSpeakingStressContrast() {
  return (
    <svg viewBox="0 0 720 220" width="100%" role="img" aria-label="Contrastive sentence stress showing how shifting emphasis changes meaning, plus breath group chunks" style={{ height: 'auto', display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <rect x="10" y="10" width="700" height="200" rx="10" fill="#ffffff" stroke="#dfe3e2" strokeWidth="1.5" />
      <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="#263b3b">Pronunciation: Contrastive Stress and Phrasing Chunks</text>

      {/* Strip A: Stress on BLUE */}
      <g transform="translate(30, 48)">
        <rect x="0" y="0" width="660" height="48" rx="5" fill="#fbfaf7" stroke="#dfe3e2" />
        <text x="20" y="30" fontSize="13" fill="#657273">"I wanted the <tspan fontSize="15" fontWeight="800" fill="#285bcc">BLUE</tspan> folder."</text>
        <rect x="360" y="10" width="280" height="28" rx="4" fill="#eaf0fc" stroke="#285bcc" strokeWidth="1" />
        <text x="500" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#285bcc">Contrast: Colour (Not the red folder)</text>
      </g>

      {/* Strip B: Stress on FOLDER */}
      <g transform="translate(30, 104)">
        <rect x="0" y="0" width="660" height="48" rx="5" fill="#fbfaf7" stroke="#dfe3e2" />
        <text x="20" y="30" fontSize="13" fill="#657273">"I wanted the blue <tspan fontSize="15" fontWeight="800" fill="#275d3c">FOLDER</tspan>."</text>
        <rect x="360" y="10" width="280" height="28" rx="4" fill="#eef7f1" stroke="#275d3c" strokeWidth="1" />
        <text x="500" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#275d3c">Contrast: Item (Not the blue notebook)</text>
      </g>

      {/* Phrasing chunks */}
      <g transform="translate(30, 160)">
        <text x="20" y="20" fontSize="12" fill="#263b3b">Phrasing Chunks: <tspan fontWeight="600">"In my opinion / education is vital // because young adults need skills //"</tspan></text>
        <text x="20" y="38" fontSize="10.5" fill="#657273">Single slash ( / ) marks short phrasing breath; double slash ( // ) marks terminal falling pitch.</text>
      </g>
    </svg>
  )
}

export function IeltsStudyDiagram({ diagramId, title, caption, alt }) {
  let svgElement = null

  switch (diagramId) {
    case 'diag-score-rounding':
      svgElement = <DiagScoreRounding />
      break
    case 'diag-raw-to-band':
      svgElement = <DiagRawToBand />
      break
    case 'diag-9step-cycle':
      svgElement = <Diag9stepCycle />
      break
    case 'diag-synonym-5gate':
      svgElement = <DiagSynonym5gate />
      break
    case 'diag-listening-timeline':
      svgElement = <DiagListeningTimeline />
      break
    case 'diag-listening-map-bellford':
      svgElement = <DiagListeningMapBellford />
      break
    case 'diag-reading-5ops':
      svgElement = <DiagReading5ops />
      break
    case 'diag-claim-anatomy':
      svgElement = <DiagClaimAnatomy />
      break
    case 'diag-tfng-logic':
      svgElement = <DiagTfngLogic />
      break
    case 'diag-task1-4part-blueprint':
      svgElement = <DiagTask14partBlueprint />
      break
    case 'diag-task1-line-phases':
      svgElement = <DiagTask1LinePhases />
      break
    case 'diag-pct-vs-points':
      svgElement = <DiagPctVsPoints />
      break
    case 'diag-task1-bar-static-dynamic':
      svgElement = <DiagTask1BarStaticDynamic />
      break
    case 'diag-task1-pie-pair':
      svgElement = <DiagTask1PiePair />
      break
    case 'diag-task1-dual-visual':
      svgElement = <DiagTask1DualVisual />
      break
    case 'diag-task1-map-before-after':
      svgElement = <DiagTask1MapBeforeAfter />
      break
    case 'diag-task1-process-cycle':
      svgElement = <DiagTask1ProcessCycle />
      break
    case 'diag-task2-3layers':
      svgElement = <DiagTask23layers />
      break
    case 'diag-task2-essay-structures':
      svgElement = <DiagTask2EssayStructures />
      break
    case 'diag-task2-paragraph-chain':
      svgElement = <DiagTask2ParagraphChain />
      break
    case 'diag-gt-letter-registers':
      svgElement = <DiagGtLetterRegisters />
      break
    case 'diag-speaking-3parts':
      svgElement = <DiagSpeaking3parts />
      break
    case 'diag-speaking-stress-contrast':
      svgElement = <DiagSpeakingStressContrast />
      break
    default:
      svgElement = (
        <svg viewBox="0 0 720 200" width="100%" role="img" aria-label={alt || title}>
          <rect x="10" y="10" width="700" height="180" rx="8" fill="#f4f5f2" stroke="#dfe3e2" />
          <text x="360" y="105" textAnchor="middle" fontSize="14" fill="#657273">Diagram {diagramId} not registered.</text>
        </svg>
      )
      break
  }

  return (
    <figure className="ies-diagram" data-diagram-id={diagramId}>
      {svgElement}
      {(title || caption) && (
        <figcaption className="ies-diagram-caption">
          {title && <strong className="ies-diagram-title">{title}</strong>}
          {caption && <span className="ies-diagram-text">{caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}
