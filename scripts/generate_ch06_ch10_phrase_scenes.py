from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "course"

SCENES = [
    ("ch06-01-agree-with-the-idea.svg", "Agree with the idea", "Two friends agree while reviewing a seating plan for a larger room", "seating", "point", "agree", "#d9e8d9"),
    ("ch06-02-understand-without-agreeing.svg", "Understand without agreeing", "One friend listens empathetically while the other explains a concern about the cost of a larger room", "budget", "listen", "open", "#e6e4f2"),
    ("ch06-03-disagree-or-qualify.svg", "Disagree or qualify", "Two friends compare opinions about a film while a movie screen and popcorn sit between them", "movie", "think", "point", "#f4e2cf"),
    ("ch06-04-continue-or-close-the-disagreement.svg", "Continue or close the disagreement", "Two friends calmly discuss information at a cafe table and decide whether to continue the discussion", "discussion", "open", "handheart", "#dcebf0"),
    ("ch07-01-put-forward-an-idea.svg", "Put forward an idea", "Two friends consider a lunch suggestion after class, with a menu and meal between them", "lunch", "point", "agree", "#f5e4c9"),
    ("ch07-02-invite-a-person.svg", "Invite a person", "One friend offers an invitation to a small game night and the other happily accepts", "invite", "offer", "agree", "#e5e0f3"),
    ("ch07-03-decline-or-keep-the-answer-open.svg", "Decline or keep the answer open", "One friend politely checks a calendar and suggests another day while responding to an invitation", "calendar", "phone", "open", "#dceaf5"),
    ("ch08-01-name-what-you-appreciate.svg", "Name what you appreciate", "A friend lends an umbrella and the other thanks them warmly", "umbrella", "offer", "handheart", "#dceaf0"),
    ("ch08-02-respond-to-thanks.svg", "Respond to thanks", "A host welcomes a guest after dinner and responds warmly to their thanks", "dinner", "open", "handheart", "#f2e4cf"),
    ("ch08-03-gifts-and-compliments.svg", "Gifts and compliments", "One friend gives a birthday present while the other reacts with delighted surprise", "gift", "offer", "excited", "#f5e0d9"),
    ("ch08-04-same-words-different-intention.svg", "The same words, a different intention", "A person looks frustrated after being left without notice, showing how thanks can sound sarcastic", "missed", "leave", "frustrated", "#e9e3e1"),
    ("ch09-01-say-what-happened.svg", "Say what happened", "A friend apologizes for forgetting to send an address and shows the corrected map on a phone", "map", "apologize", "listen", "#e1eee4"),
    ("ch09-02-informal-responsibility-and-stronger-apologies.svg", "Informal responsibility and stronger apologies", "A friend acknowledges a wrong meeting time and corrects it on a phone calendar", "clock", "apologize", "point", "#f3e7d7"),
    ("ch09-03-receive-an-apology.svg", "Receive an apology", "One friend apologizes for borrowing a charger without asking while the other calmly sets a boundary", "charger", "apologize", "open", "#e4e9f3"),
    ("ch09-04-sympathy-is-a-different-use.svg", "Sympathy is a different use", "A friend comforts someone who is grieving, offering a tissue and a supportive hand on the shoulder", "comfort", "comfort", "sad", "#e8e5f1"),
    ("ch10-01-signal-that-you-are-leaving.svg", "Signal that you are leaving", "A guest picks up a bag at the doorway while a friend waves goodbye", "door", "wave", "wave", "#e6eee8"),
    ("ch10-02-choose-a-closing.svg", "Choose a closing", "Two people finish a professional meeting with a handshake and a document on the table", "meeting", "offer", "agree", "#e3eaf2"),
    ("ch10-03-future-contact-specific-or-open.svg", "Future contact can be specific or open", "Two friends arrange a future meeting on a phone calendar before saying goodbye", "phonecalendar", "phone", "agree", "#e4edf2"),
    ("ch10-04-familiar-closings.svg", "Familiar closings", "Two friends casually wave goodbye on a city street with their backpacks", "street", "casual", "wave", "#f1e6d8"),
]

DEFS = """<defs>
<linearGradient id="skin" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffd9bd"/><stop offset="1" stop-color="#eaa17e"/></linearGradient>
<linearGradient id="hair" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#684333"/><stop offset="1" stop-color="#2e201d"/></linearGradient>
<linearGradient id="green" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#789c78"/><stop offset="1" stop-color="#3d674f"/></linearGradient>
<linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#78a6ce"/><stop offset="1" stop-color="#365e89"/></linearGradient>
<linearGradient id="cream" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fffaf0"/><stop offset="1" stop-color="#e9dfcf"/></linearGradient>
<filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="12"/><feOffset dy="12"/><feComponentTransfer><feFuncA type="linear" slope=".16"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>"""

def character(x, gender, pose, mood, mirror=False):
    jacket = "url(#green)" if gender == "woman" else "url(#blue)"
    if gender == "woman":
        hair = """<circle cx="194" cy="52" r="55" fill="url(#hair)" stroke="#38251f" stroke-width="7"/>
        <path d="M88 174C65 96 99 31 165 35c23-35 78-25 94 4 57 4 76 67 47 135-21-28-45-41-80-42-48-1-83 25-138 42Z" fill="url(#hair)" stroke="#38251f" stroke-width="8"/>
        <path d="M102 130c22-47 58-67 99-64 34 2 61 21 86 51-37-16-66-13-92 3-28 17-59 21-93 10Z" fill="#81553b" opacity=".55"/>"""
    else:
        hair = """<path d="M88 166c-28-60-4-119 42-125 10-40 61-43 83-15 37-23 82 6 76 48 38 23 33 73 7 99-29-25-51-31-105-29-46 2-75 12-103 22Z" fill="url(#hair)" stroke="#38251f" stroke-width="8"/>
        <g fill="#684333"><circle cx="111" cy="82" r="34"/><circle cx="151" cy="47" r="34"/><circle cx="197" cy="39" r="34"/><circle cx="239" cy="53" r="32"/><circle cx="275" cy="89" r="30"/></g>"""
    mouths = {
        "smile": "M162 251Q195 286 231 251",
        "sad": "M165 265Q195 239 225 265",
        "concerned": "M165 263Q195 252 225 263",
        "excited": "M160 247Q195 300 231 247Z",
        "neutral": "M168 262Q195 267 222 262",
    }
    mouth = mouths.get(mood, mouths["smile"])
    arm_templates = {
        "open": """<path d="M115 350C72 366 54 410 21 432M280 350C326 362 341 401 365 421" stroke="JACKET" stroke-width="49" stroke-linecap="round" fill="none"/><circle cx="20" cy="435" r="24" fill="url(#skin)"/><circle cx="368" cy="424" r="24" fill="url(#skin)"/>""",
        "point": """<path d="M282 350C324 360 346 367 375 350" stroke="JACKET" stroke-width="49" stroke-linecap="round" fill="none"/><path d="M375 350l31-4" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/><path d="M112 355C82 389 83 428 92 450" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="92" cy="454" r="23" fill="url(#skin)"/>""",
        "agree": """<path d="M280 350C318 335 334 294 333 263" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="333" cy="247" r="23" fill="url(#skin)"/><path d="M111 355C82 388 82 425 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="453" r="23" fill="url(#skin)"/>""",
        "listen": """<path d="M113 350C72 325 74 271 91 242" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="94" cy="231" r="24" fill="url(#skin)"/><path d="M281 350C316 380 312 422 293 446" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="291" cy="451" r="23" fill="url(#skin)"/>""",
        "think": """<path d="M280 350C323 365 313 410 272 423" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="263" cy="414" r="24" fill="url(#skin)"/><path d="M112 350C82 384 83 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "handheart": """<path d="M280 350C312 372 277 403 221 405" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="210" cy="405" r="23" fill="url(#skin)"/><path d="M112 350C80 383 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "wave": """<path d="M280 350C320 327 333 274 344 224" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="348" cy="209" r="25" fill="url(#skin)"/><path d="M112 350C80 385 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "apologize": """<path d="M112 350C89 382 125 413 171 419M280 350C304 382 266 413 220 419" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="183" cy="420" r="22" fill="url(#skin)"/><circle cx="208" cy="420" r="22" fill="url(#skin)"/>""",
        "comfort": """<path d="M280 350C329 362 355 392 385 393" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="390" cy="393" r="23" fill="url(#skin)"/><path d="M112 350C80 382 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "offer": """<path d="M112 350C74 370 45 406 27 430M280 350C321 370 347 405 366 430" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="24" cy="433" r="24" fill="url(#skin)"/><circle cx="369" cy="433" r="24" fill="url(#skin)"/>""",
        "phone": """<path d="M280 350C316 372 309 408 278 430" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="274" cy="438" r="23" fill="url(#skin)"/><path d="M112 350C80 385 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "leave": """<path d="M280 350C324 366 344 412 353 454" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="354" cy="459" r="23" fill="url(#skin)"/><path d="M112 350C80 384 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "excited": """<path d="M112 350C72 322 68 270 80 230M280 350C322 318 333 271 343 233" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="80" cy="218" r="24" fill="url(#skin)"/><circle cx="347" cy="220" r="24" fill="url(#skin)"/>""",
        "sad": """<path d="M112 350C80 384 82 422 95 449M280 350C316 380 312 422 293 446" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/><circle cx="291" cy="451" r="23" fill="url(#skin)"/>""",
        "casual": """<path d="M280 350C324 342 346 313 354 282" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="357" cy="270" r="24" fill="url(#skin)"/><path d="M112 350C80 385 82 422 95 449" stroke="JACKET" stroke-width="48" stroke-linecap="round" fill="none"/><circle cx="95" cy="454" r="23" fill="url(#skin)"/>""",
        "frustrated": """<path d="M112 350C165 385 225 385 280 350" stroke="JACKET" stroke-width="52" stroke-linecap="round" fill="none"/><path d="M112 350C165 315 225 315 280 350" stroke="JACKET" stroke-width="52" stroke-linecap="round" fill="none"/>""",
    }
    arms = arm_templates.get(pose, arm_templates["open"]).replace("JACKET", jacket)
    mirror_transform = "translate(360 0) scale(-1 1)" if mirror else ""
    return f"""<g transform="translate({x} 190) {mirror_transform}" filter="url(#shadow)">
    <ellipse cx="190" cy="585" rx="160" ry="22" fill="#34434b" opacity=".10"/>
    {arms}
    <path d="M91 319Q192 285 291 319Q337 360 351 592H30Q43 365 91 319Z" fill="{jacket}" stroke="#34434b" stroke-width="8"/>
    <path d="M151 316L190 363L229 316L242 590H139Z" fill="url(#cream)" stroke="#c9bdac" stroke-width="5"/>
    <path d="M145 315L188 364L151 420L105 340Z" fill="#365d66" opacity=".75"/><path d="M235 315L190 364L229 420L280 340Z" fill="#365d66" opacity=".75"/>
    <rect x="155" y="250" width="72" height="92" rx="30" fill="url(#skin)"/>
    <ellipse cx="190" cy="174" rx="102" ry="119" fill="url(#skin)" stroke="#7e5140" stroke-width="5"/>
    <ellipse cx="92" cy="190" rx="19" ry="29" fill="url(#skin)"/><ellipse cx="288" cy="190" rx="19" ry="29" fill="url(#skin)"/>
    <ellipse cx="151" cy="190" rx="19" ry="27" fill="#fff"/><ellipse cx="230" cy="190" rx="19" ry="27" fill="#fff"/>
    <circle cx="157" cy="193" r="10" fill="#3b302d"/><circle cx="236" cy="193" r="10" fill="#3b302d"/>
    <circle cx="160" cy="188" r="4" fill="#fff"/><circle cx="239" cy="188" r="4" fill="#fff"/>
    <path d="M132 156q17-10 34 0M218 156q17-10 34 0" stroke="#51362d" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M190 205q-12 17 1 23" stroke="#bd8065" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="130" cy="235" rx="17" ry="9" fill="#e9897b" opacity=".35"/><ellipse cx="250" cy="235" rx="17" ry="9" fill="#e9897b" opacity=".35"/>
    <path d="{mouth}" stroke="#8c4d46" stroke-width="8" fill="none" stroke-linecap="round"/>
    {hair}
    </g>"""

PROPS = {
"seating": """<g transform="translate(670 260)" filter="url(#shadow)"><rect width="430" height="350" rx="28" fill="#fff" stroke="#6e8278" stroke-width="9"/><rect x="30" y="30" width="370" height="290" rx="18" fill="#eaf2e9"/><rect x="118" y="100" width="190" height="120" rx="20" fill="#d8c4a2" stroke="#8e7654" stroke-width="7"/><g fill="#7d9c7e" stroke="#fff" stroke-width="6"><rect x="62" y="85" width="45" height="45" rx="12"/><rect x="325" y="85" width="45" height="45" rx="12"/><rect x="62" y="220" width="45" height="45" rx="12"/><rect x="325" y="220" width="45" height="45" rx="12"/></g><path d="M345 43l18 19 30-38" fill="none" stroke="#4e9667" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>""",
"budget": """<g transform="translate(675 280)" filter="url(#shadow)"><rect width="420" height="300" rx="25" fill="#fff" stroke="#72847c" stroke-width="9"/><rect x="30" y="30" width="360" height="240" rx="16" fill="#edf1eb"/><path d="M60 92h300M60 172h300M180 50v200" stroke="#c6d0c6" stroke-width="8"/><rect x="205" y="65" width="135" height="80" rx="12" fill="#d7e5d7" stroke="#78957d" stroke-width="6"/><g fill="#e8c16c" stroke="#aa8545" stroke-width="6"><circle cx="95" cy="220" r="29"/><circle cx="145" cy="220" r="29"/></g></g>""",
"movie": """<g transform="translate(670 270)" filter="url(#shadow)"><rect width="430" height="260" rx="24" fill="#26364c" stroke="#fff" stroke-width="12"/><rect x="28" y="25" width="374" height="205" rx="12" fill="#b9d4e6"/><path d="M28 190l100-85 90 70 78-100 106 100v55H28Z" fill="#7897a7"/><circle cx="320" cy="75" r="28" fill="#f7d88b"/><path d="M115 290h200M135 310h160" stroke="#526477" stroke-width="16" stroke-linecap="round"/><path d="M320 275l12-48h70l14 48Z" fill="#e9b45d" stroke="#a66f3d" stroke-width="6"/></g>""",
"discussion": """<g transform="translate(660 315)" filter="url(#shadow)"><path d="M20 120Q210 55 410 120L380 250H55Z" fill="#c18b5f" stroke="#8d6346" stroke-width="8"/><rect x="165" y="0" width="180" height="125" rx="14" fill="#fff" stroke="#7a8e83" stroke-width="7" transform="rotate(5 255 60)"/><path d="M195 40h110M195 65h90M195 90h110" stroke="#b6c3bb" stroke-width="8" stroke-linecap="round"/><circle cx="85" cy="65" r="40" fill="#e5bd6e"/><path d="M85 42v46M62 65h46" stroke="#fff6d9" stroke-width="7"/></g>""",
"lunch": """<g transform="translate(670 315)" filter="url(#shadow)"><rect width="405" height="250" rx="24" fill="#fff" stroke="#9b7d5e" stroke-width="8"/><rect x="28" y="28" width="150" height="195" rx="16" fill="#edf2e9"/><path d="M55 68h96M55 100h80M55 132h90M55 164h66" stroke="#9aaf9d" stroke-width="9" stroke-linecap="round"/><circle cx="285" cy="130" r="82" fill="#f6f0e4" stroke="#c4b79f" stroke-width="9"/><circle cx="285" cy="130" r="53" fill="#e5a46b"/><path d="M255 125q30-40 60 0q-30 44-60 0" fill="#70925f"/></g>""",
"invite": """<g transform="translate(690 270)" filter="url(#shadow)"><rect x="20" y="10" width="390" height="320" rx="26" fill="#fff" stroke="#7e7193" stroke-width="9"/><rect x="48" y="38" width="334" height="264" rx="16" fill="#f0eaf7"/><path d="M95 115c0-35 48-35 48 0 0 27-24 43-24 43s-24-16-24-43Z" fill="#e98a88"/><path d="M260 82l20 35 40 8-29 28 7 40-38-19-36 19 7-40-30-28 40-8Z" fill="#e6bf66"/><path d="M115 220h235M115 255h175" stroke="#c1b4cf" stroke-width="10" stroke-linecap="round"/></g>""",
"calendar": """<g transform="translate(690 280)" filter="url(#shadow)"><rect x="40" width="330" height="340" rx="35" fill="#27384a" stroke="#fff" stroke-width="10"/><rect x="65" y="35" width="280" height="275" rx="20" fill="#f7f7f1"/><rect x="65" y="35" width="280" height="62" rx="18" fill="#6d8eae"/><g stroke="#d1d8d4" stroke-width="6"><path d="M110 120v155M165 120v155M220 120v155M275 120v155M85 170h240M85 220h240"/></g><circle cx="220" cy="195" r="22" fill="#6fa77b"/><path d="M208 195l10 10 18-23" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></g>""",
"umbrella": """<g transform="translate(675 290)" filter="url(#shadow)"><path d="M210 20C95 20 20 110 20 175q45-35 95 0 45-35 95 0 45-35 95 0 45-35 95 0C400 110 325 20 210 20Z" fill="#6e9ab7" stroke="#3e647f" stroke-width="9"/><path d="M210 20v235q0 48 38 48 35 0 35-38" fill="none" stroke="#8c6549" stroke-width="13" stroke-linecap="round"/><path d="M210 20L115 175M210 20l95 155" stroke="#d7e9f2" stroke-width="6"/><path d="M60 20l-14 28M360 10l-13 27M420 95l-26 10" stroke="#74a9d1" stroke-width="9" stroke-linecap="round"/></g>""",
"dinner": """<g transform="translate(660 350)" filter="url(#shadow)"><path d="M0 110Q210 45 420 110L385 225H35Z" fill="#b97f57" stroke="#855c42" stroke-width="8"/><ellipse cx="210" cy="110" rx="112" ry="66" fill="#f7f2e9" stroke="#c5bcae" stroke-width="8"/><ellipse cx="210" cy="110" rx="75" ry="42" fill="#e7a46c"/><path d="M175 110q35-40 70 0q-35 38-70 0" fill="#78945f"/><path d="M320 30v78q0 30 22 30t22-30V30" stroke="#7798ad" stroke-width="14" fill="none" stroke-linecap="round"/></g>""",
"gift": """<g transform="translate(690 300)" filter="url(#shadow)"><rect x="20" y="95" width="360" height="235" rx="18" fill="#d96f66" stroke="#9b4f50" stroke-width="8"/><rect y="70" width="400" height="70" rx="15" fill="#e98b7d" stroke="#9b4f50" stroke-width="8"/><path d="M200 70v260" stroke="#f5d27b" stroke-width="38"/><path d="M200 70c-90-20-115-85-60-85 40 0 60 85 60 85Zm0 0c90-20 115-85 60-85-40 0-60 85-60 85Z" fill="#f1c86c" stroke="#a77d43" stroke-width="7"/></g>""",
"missed": """<g transform="translate(680 280)" filter="url(#shadow)"><rect x="20" y="10" width="190" height="330" rx="30" fill="#293a4b" stroke="#fff" stroke-width="9"/><rect x="42" y="42" width="146" height="255" rx="16" fill="#f5f3ed"/><circle cx="115" cy="95" r="32" fill="#d87971"/><path d="M98 95h34M115 78v34" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M65 165h100M65 195h80M65 225h95" stroke="#c7cfc9" stroke-width="9" stroke-linecap="round"/><path d="M275 55v260h145V55" fill="#c5a27e" stroke="#896c50" stroke-width="9"/><circle cx="390" cy="190" r="8" fill="#805f45"/></g>""",
"map": """<g transform="translate(685 280)" filter="url(#shadow)"><rect x="40" width="330" height="350" rx="34" fill="#26384b" stroke="#fff" stroke-width="10"/><rect x="65" y="35" width="280" height="285" rx="18" fill="#eaf0e8"/><path d="M75 95l90-45 90 60 80-30M75 235l85-75 90 50 90-45" stroke="#b7c9b6" stroke-width="18" fill="none"/><path d="M205 90c-45 0-70 34-70 70 0 55 70 120 70 120s70-65 70-120c0-36-25-70-70-70Z" fill="#e27b6f" stroke="#a44d49" stroke-width="7"/><circle cx="205" cy="160" r="22" fill="#fff"/></g>""",
"clock": """<g transform="translate(680 280)" filter="url(#shadow)"><circle cx="210" cy="170" r="170" fill="#fff" stroke="#6c8391" stroke-width="12"/><circle cx="210" cy="170" r="145" fill="#f4f5ef" stroke="#d0d8d5" stroke-width="6"/><g stroke="#71818a" stroke-width="8" stroke-linecap="round"><path d="M210 55v22M210 263v22M95 170h22M303 170h22"/></g><path d="M210 170V85M210 170l70 48" stroke="#496478" stroke-width="13" stroke-linecap="round"/><circle cx="210" cy="170" r="15" fill="#496478"/></g>""",
"charger": """<g transform="translate(675 290)" filter="url(#shadow)"><rect x="35" y="20" width="145" height="240" rx="24" fill="#e8edf1" stroke="#667a8b" stroke-width="8"/><rect x="65" y="48" width="85" height="165" rx="12" fill="#fff"/><path d="M105 260v50q0 50 55 50h95q50 0 50-50v-55" stroke="#6f8597" stroke-width="18" fill="none" stroke-linecap="round"/><rect x="285" y="225" width="65" height="60" rx="10" fill="#8ba0b1" stroke="#526b7e" stroke-width="7"/><path d="M302 225v-18M333 225v-18" stroke="#526b7e" stroke-width="9" stroke-linecap="round"/></g>""",
"comfort": """<g transform="translate(680 300)" filter="url(#shadow)"><path d="M80 80q0-55 55-55 34 0 55 40 21-40 55-40 55 0 55 55 0 85-110 155Q80 165 80 80Z" fill="#e58d88" stroke="#a95c61" stroke-width="8"/><rect x="10" y="230" width="110" height="80" rx="16" fill="#fff" stroke="#c7cbd1" stroke-width="7" transform="rotate(-8 65 270)"/><path d="M32 260q25-18 48 0M32 282q25-18 48 0" stroke="#d6dbe1" stroke-width="7" fill="none"/></g>""",
"door": """<g transform="translate(675 270)" filter="url(#shadow)"><rect x="110" width="240" height="360" rx="12" fill="#c69a70" stroke="#8b6649" stroke-width="10"/><rect x="135" y="25" width="190" height="310" rx="6" fill="#e5c29a" stroke="#9a7453" stroke-width="6"/><circle cx="295" cy="190" r="12" fill="#8b6649"/><rect y="255" width="95" height="90" rx="16" fill="#526d85" stroke="#344c65" stroke-width="7"/><path d="M22 255v-35q25-30 50 0v35" fill="none" stroke="#344c65" stroke-width="9"/></g>""",
"meeting": """<g transform="translate(660 320)" filter="url(#shadow)"><path d="M0 130Q210 55 420 130L385 245H35Z" fill="#b98b68" stroke="#866448" stroke-width="8"/><rect x="105" y="25" width="210" height="130" rx="14" fill="#fff" stroke="#7d8b8b" stroke-width="7"/><path d="M135 65h145M135 95h120" stroke="#c2cbc8" stroke-width="9" stroke-linecap="round"/><path d="M305 180l50-35 50 35-50 36Z" fill="#6f9bb7" stroke="#456d88" stroke-width="7"/><circle cx="355" cy="180" r="18" fill="#f1c36f"/></g>""",
"phonecalendar": """<g transform="translate(690 270)" filter="url(#shadow)"><rect x="50" width="300" height="370" rx="34" fill="#27394b" stroke="#fff" stroke-width="10"/><rect x="75" y="40" width="250" height="285" rx="18" fill="#f6f6ef"/><rect x="75" y="40" width="250" height="65" rx="18" fill="#7193ad"/><g stroke="#d0d8d5" stroke-width="7"><path d="M125 130v155M175 130v155M225 130v155M275 130v155M95 180h210M95 230h210"/></g><circle cx="225" cy="205" r="20" fill="#e58c70"/></g>""",
"street": """<g transform="translate(665 300)" filter="url(#shadow)"><path d="M0 300h430" stroke="#879b90" stroke-width="12" stroke-linecap="round"/><path d="M60 40v260M60 40h80v90H60M325 40v260M325 40h80v90h-80" stroke="#6f8491" stroke-width="13" fill="none"/><rect x="175" y="160" width="80" height="140" rx="18" fill="#e4b46e"/><path d="M175 190h80" stroke="#fff0cf" stroke-width="9"/><circle cx="215" cy="125" r="38" fill="#e9d59b"/></g>""",
}

def render_scene(scene):
    filename, title, alt, prop, left_pose, right_pose, accent = scene
    left = character(105, "man", left_pose, "concerned" if left_pose == "apologize" else "smile")
    right_mood = "concerned" if right_pose == "frustrated" else "sad" if right_pose == "sad" else "excited" if right_pose == "excited" else "smile"
    right = character(1300, "woman", right_pose, right_mood, True)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1774" height="887" viewBox="0 0 1774 887" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title><desc id="desc">{escape(alt)}</desc>{DEFS}
<circle cx="885" cy="430" r="310" fill="{accent}" opacity=".62"/><circle cx="885" cy="430" r="235" fill="#fff" opacity=".34"/>
<path d="M240 760Q885 815 1535 760" stroke="{accent}" stroke-width="20" opacity=".32" fill="none" stroke-linecap="round"/>
<ellipse cx="300" cy="790" rx="200" ry="24" fill="#34434b" opacity=".10"/><ellipse cx="1470" cy="790" rx="200" ry="24" fill="#34434b" opacity=".10"/>
{left}{right}{PROPS[prop]}
<g fill="#e7b85e" opacity=".9"><path d="M590 220l13 31 31 13-31 13-13 31-13-31-31-13 31-13Z"/><circle cx="1185" cy="250" r="12"/><path d="M1210 580l9 22 22 9-22 9-9 22-9-22-22-9 22-9Z"/></g>
</svg>"""

def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    for scene in SCENES:
        filename = scene[0]
        (ROOT / filename).write_text(render_scene(scene), encoding="utf-8")
    print(f"Generated {len(SCENES)} original vector scenes in {ROOT}")

if __name__ == "__main__":
    main()
