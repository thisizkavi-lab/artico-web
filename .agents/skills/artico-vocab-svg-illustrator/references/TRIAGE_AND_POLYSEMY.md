# 4,000-Word Triage Matrix & Polysemy Guardrails

Use this guide during `Step 1 (Plan & Triage)` of every lesson before drawing SVGs.

---

## 1. Expected Illustration vs. `TEXT_ONLY` Ratios by Lesson Type

Do **not** force illustrations onto unpicturable words, and do **not** lazily mark concrete words `TEXT_ONLY` just because they take effort to draw!

| Lesson Tier | Typical Lessons | Expected `SVG` % | Guidance |
|---|---|---|---|
| **Tier A: Concrete Nouns & Anatomy** | `9, 10, 12, 14, 15, 16, 17, 22, 28, 29, 30, 31, 32, 37, 44, 54, 55, 56, 57, 62, 70, 74` | **92% – 100%** | Almost every item is a concrete object, food, animal, room, garment, or body part. Only mark `TEXT_ONLY` for umbrella hypernyms that cannot be distinguished from items (`stuff`, `thing`, `type`). |
| **Tier B: Actions, Roles, Weather, Places, Health** | `4, 11, 13, 18, 19, 33, 34, 45, 46, 47, 48, 49, 50, 51, 52, 58–61, 63–69, 71, 72` | **75% – 92%** | Illustrate every specific action, role, symptom, place, sport, and weather state. Use `TEXT_ONLY` (`ABSTRACT` or `SENSE`) for pure administrative/abstract nouns (`insurance`, `policy`, `symptom` itself, `appointment` if indistinguishable). |
| **Tier C: Work, Media, Education, Crime, Environment** | `20, 21, 23–27, 35, 36, 38–40, 42, 43, 53, 73, 78` | **45% – 75%** | Illustrate concrete artifacts (`microscope`, `diploma`, `handcuffs`, `solar panel`, `receipt`, `chart`) and clear scenes (`graduate`, `interview`, `recycle`). Mark abstract business/legal/academic concepts (`economy`, `theory`, `strategy`, `legislation`) `TEXT_ONLY` (`ABSTRACT`) and graphic violent crimes `TEXT_ONLY` (`SENSITIVE`). |
| **Tier D: Time, Adjectives, Idioms, Discourse & Opinions** | `3, 5, 6, 7, 8, 41, 75, 76, 77` | **15% – 55%** | Illustrate concrete measurable adjectives (`heavy`, `deep`, `round`, `broken`), clock/calendar diagrams (`noon`, `weekend` — zero letters!), and vivid situational idioms (`break the ice`). Mark discourse markers, hedging phrases, modal expressions, and abstract evaluative adjectives (`awesome`, `awful`, `supposedly`, `furthermore`, `in conclusion`) `TEXT_ONLY` (`FUNCTION` or `ABSTRACT`). |

---

## 2. Mandatory Polysemy & Homonym Disambiguation Table

Always check `ja` in `svg_vocab_compiler.py plan --lesson <NN>`. These words appear in `src/web/vocabularyDedup.js` and **must** match their lesson-specific sense:

| Spelling | Lesson A → Draw This | Lesson B → Draw This |
|---|---|---|
| **`date`** | `29:date` (`デーツ`) → Oval wrinkled dark-amber date fruits + one halved showing elongated pit | `3` / `20` (Calendar/romance) → Calendar cell highlight or café couple |
| **`bat`** | `55:bat` (`コウモリ`) → Nocturnal winged mammal hanging/flying with leathery wings | `62:bat` (`バット`) → Wooden/metal sports bat + ball |
| **`polish`** | `11:polish` (`磨く`) → Cloth buffing a gleaming wooden table/shoe with sparkle | `1` (Nationality — out of scope) |
| **`turkey`** | `28` / `54` (`七面鳥`) → Farm turkey bird or roast poultry | `1` (Country — out of scope) |
| **`second`** | `3:second` (`秒`) → Stopwatch/clock sweep second hand arc | `2` (Ordinal — out of scope) |
| **`nuts`** | `29:nuts` (`ナッツ類`) → Assorted almonds, walnuts, hazelnuts in bowl | Slang (`crazy`) → Check `ja`! |
| **`light`** | `5` (Weight: `軽い`) → Feather / effortless one-hand lift contrasted with muted heavy weight | `9` / `10` (Lamp/brightness) → Glowing ceiling/desk lamp |
| **`burn`** | `68:burn` (`やけど`) → Gentle pink reddened patch on hand under cool running tap water (non-graphic!) | `32` / `52` (Fire/cooking) → Toast smoking or campfire flame |
| **`court`** | `62:court` (`コート`) → Tennis/basketball court markings & net | `73:court` (`裁判所`) → Judge's wooden gavel & bench |
| **`ticket`** | `44` / `47` / `60` → Boarding/cinema stub with perforated tear line | `73` (Traffic fine) → Parking windshield slip |
| **`mean`** | `18:mean` (`意地悪な`) → Unkind smirk / snatching toy away | Verb (`意味する`) → `TEXT_ONLY` (`FUNCTION`) |
| **`chest`** | `14:chest` (`胸`) → Upper torso Part-of-Whole focus halo | `9` / `10` (`たんす` / box) → Wooden chest of drawers |
| **`cream` / `peach` / `olive` / `navy`** | Color group (`クリーム色` etc.) → **Draped fabric swatch** in that exact shade | Food group (`28`–`31`) → Whipped cream pitcher / fuzzy peach fruit / olive branch |
| **`mole`** | `17:mole` (`ほくろ`) → Cheek close-up with single small dark beauty mark in focus halo | `55:mole` (`モグラ`) → Burrowing velvety mole popping out of soil mound |

---

## 3. Sibling Differentiation Checklist (Preventing Duplicate-Looking Cards)

Before drawing any group, check these classic sibling collisions:
1. **`sweep` vs `mop` vs `vacuum` vs `wipe` vs `scrub` (Lesson 11):**
   - `sweep`: Angled straw broom + dry dust bunnies + dustpan on dry wood planks.
   - `mop`: String/sponge mop + water bucket + shiny pale-blue wet floor puddles.
   - `vacuum`: Canister/upright vacuum nozzle on rug sucking a clean stripe through dusty carpet.
   - `wipe`: Folded microfiber cloth in hand wiping droplets off flat counter/window.
   - `scrub`: Stiff bristle brush held firmly with soap foam bubbles on tile.
2. **`annoyed` < `angry` < `furious` (Lesson 19):**
   - `annoyed`: Half-lidded eye roll, slight frown, single small temple vein, buzzing fly or dripping tap.
   - `angry`: Sharp V-brows, open shouting/scowling mouth, clenched fists at sides, warm pink flush.
   - `furious`: Deep crimson face flush, double steam puffs from ears/head, dramatic jagged aura, trembling raised fists.
3. **`shirt` vs `T-shirt` vs `blouse` vs `sweater` vs `jacket` (Lesson 15):**
   - `T-shirt`: Short sleeves, round crew rib-knit collar, seamless front.
   - `shirt`: Long sleeves with cuffs, pointed collar, full vertical button placket.
   - `blouse`: Soft draped neckline/bow tie collar, gathered puff cuffs, curved hem.
   - `sweater`: Thick ribbed crew neck, cuffs, and hem + visible knit cable texture lines.
   - `jacket`: Open front zipper or lapels showing inner layer underneath + structured side pockets.
4. **Medical Symptoms (`68:sore throat` vs `cough` vs `sneeze` vs `runny nose`):**
   - `sore throat`: Hand gently touching front of neck + warm crimson radiating ring/glow on throat.
   - `cough`: Hand/fist in front of open mouth + sharp dry burst puffs outward.
   - `sneeze`: Head tilted forward, eyes squeezed shut, tissue at nose + spray droplets arc.
   - `runny nose`: Reddened nose tip + clear blue droplet + box of tissues beside character.
