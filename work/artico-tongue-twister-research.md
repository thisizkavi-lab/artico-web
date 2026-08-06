# Artico tongue-twister module

## Product decision

Artico should launch with **12 classic tongue twisters**, grouped into four training purposes. Twelve is large enough to cover the main sound transitions Japanese learners need, but small enough to repeat until the movements become familiar.

The module is not a speed contest and it is not a 30-day pronunciation promise. It is a reusable articulation routine:

1. hear an accurate model;
2. notice the target transition;
3. say it slowly and clearly;
4. repeat it with rhythm;
5. use the same movement in a normal phrase;
6. return to it in a later session.

## Why this structure

- Japanese learners' English pronunciation needs are broader than `/r/` and `/l/`. Research also identifies consonant clusters, vowel insertion, weak vowels, stress, and rhythm as important areas.
- English clusters are especially useful here because Japanese listeners and speakers can perceive or produce an extra vowel between consonants.
- `/r/` and `/l/` remain a priority. Research on Japanese learners reports particular difficulty with these sounds, including prevocalic clusters.
- Speech-motor research comparing practice schedules found that random practice and a blocked-to-random sequence produced stronger end-of-acquisition accuracy and one-week retention than blocked practice alone. The Artico routine therefore begins with a focused sound family and gradually mixes the set.
- British Council teaching guidance follows a useful progression: listen, rehearse silently, say the line slowly, and only then increase speed. Artico keeps that sequence but ends with a normal phrase so the movement transfers beyond the tongue twister.

## The core 12

### 1. Japanese-priority contrasts

| Classic | Primary target | Why it earns a place |
| --- | --- | --- |
| **Red lorry, yellow lorry.** | `/r/` ↔ `/l/` | Repeated switching between the two liquid sounds; short enough to diagnose the movement clearly. |
| **She sells seashells by the seashore.** | `/s/` ↔ `/ʃ/` | Trains a narrow sound contrast and clean sibilants across several word positions. |
| **Three free throws.** | `/θ/` ↔ `/f/` | A compact contrast between the dental fricative and the lip-and-teeth sound, plus a difficult initial cluster. |

### 2. Clean consonants

| Classic | Primary target | Why it earns a place |
| --- | --- | --- |
| **Peter Piper picked a peck of pickled peppers.** | `/p/` and plosive release | Trains crisp initial consonants and controlled breath without adding a vowel after the consonant. |
| **A big black bug bit a big black bear.** | `/b/`, short vowels, word endings | Repeats voiced lip closure while the vowel changes; useful for keeping final consonants audible. |
| **If two witches were watching two watches, which witch would watch which watch?** | `/w/` and `/tʃ/` | Trains rounded starts, the `ch` release, and clear word boundaries in a longer rhythmic line. |

### 3. Clusters without extra vowels

| Classic | Primary target | Why it earns a place |
| --- | --- | --- |
| **I scream, you scream, we all scream for ice cream.** | `/skr/` and linking | A familiar way to keep three consonants together and hear the boundary shift between *ice cream* and *I scream*. |
| **Six slippery snails slid slowly seaward.** | `/sl/` and `/sn/` | Repeated initial clusters with no inserted vowel; also develops steady airflow for `/s/`. |
| **Freshly fried fresh flesh.** | `/fr/` ↔ `/fl/` | Places `/r/` and `/l/` inside clusters, where the contrast is harder and more useful than isolated sounds alone. |

### 4. Rhythm and vowel movement

| Classic | Primary target | Why it earns a place |
| --- | --- | --- |
| **Betty Botter bought some butter.** | `/b/`, `/t/`, changing vowels | Keeps the consonant frame stable while the stressed vowel changes. Use the short line, not the entire poem, in the core set. |
| **How much wood would a woodchuck chuck if a woodchuck could chuck wood?** | `/w/`, `/ʊ/`, `/tʃ/`, stress | Combines repeated sounds with a strong beat, making it useful for rhythm as well as articulation. |
| **Unique New York.** | `/juː/`, final `/k/` → initial `/n/` | A classic actor warm-up for crisp word boundaries and quick vowel/consonant transitions. |

## Keep outside the MVP

These are useful classics, but they duplicate a core purpose or make the first release unnecessarily long:

- Red leather, yellow leather — another strong `/r/` and `/l/` drill.
- Toy boat — useful for diphthong switching.
- Eleven benevolent elephants — useful for `/v/` and `/l/`.
- A proper cup of coffee from a proper copper coffee pot — useful for `/p/`, `/k/`, and vowel switching.

They can appear later under **More classics**, never as an endless AI-generated feed.

## Learn-mode information architecture

The Learn page should be short and Japanese-first.

### Screen 1 — Why tongue twisters?

Headline: **Train transitions, not speed.**

Japanese explanation:

> 早口で言う競争ではありません。英語の音から次の音へ、正確に切り替える練習です。Articoでは、定番の12本だけを繰り返します。

Show four training groups and a clear boundary:

- Tongue twisters help control selected sound transitions, clusters, and rhythm.
- They do not replace conversation practice or promise a different accent.

### Screen 2 — How to practise

Use the same six-step loop everywhere:

1. **Listen once** — do not speak yet.
2. **Notice** — look at the target sound and mouth cue.
3. **Slow ×3** — pause between chunks; keep every sound clear.
4. **Rhythm ×3** — keep clarity while removing the pauses.
5. **Transfer ×2** — say two ordinary phrases with the same movement.
6. **Return later** — practise it again in another session.

## Practice-mode information architecture

### Classic Set library

- Group the 12 cards by training purpose, not alphabetically.
- Every card shows the classic line, sound badges, one-line purpose, and approximate session length.
- Use no score, stars, XP, streak, or artificial difficulty ladder.
- The default first card is **Red lorry, yellow lorry** because it directly addresses a high-priority Japanese learner contrast and makes the drill format obvious.

### Individual drill

Each drill contains:

- the classic phrase in large type;
- target-sound badges;
- a short Japanese explanation of why it matters;
- one physical mouth cue;
- three reusable audio controls: **Model**, **Slow**, and **Natural**;
- a guided sequence: listen once, slow ×3, rhythm ×3, transfer ×2;
- two normal transfer phrases;
- a neutral **Return next session** action rather than a score.

## Audio plan for later

Do not call a text-to-speech API at lesson time. Generate and review reusable files before release.

For each classic, prepare:

1. **Model** — one accurate natural-speed recording.
2. **Slow** — chunked speech with audible space between transitions, not unnaturally stretched phonemes.
3. **Natural + beat** — normal speech with subtle visual beat markers in the UI; the audio itself can remain clean.

Reuse the same approved assets in Learn and Practice. Record transfer phrases separately. The UI should always expose the transcript and target sounds, so the learner is not dependent on audio alone.

## Suggested four-week rotation

Four weeks is a teaching structure, not an outcome claim.

- **Week 1 — Contrasts:** practise the three Japanese-priority cards in focused blocks.
- **Week 2 — Clean consonants:** add the three consonant cards; mix one Week 1 card into each session.
- **Week 3 — Clusters:** focus on the three cluster cards; finish with two mixed cards.
- **Week 4 — Rhythm and mixed review:** practise the final three cards, then rotate cards from all four groups.

A normal session is **8–10 minutes, five days per week**:

- prepare and listen: 1 minute;
- one focus card: 4 minutes;
- two mixed cards: 3 minutes;
- one transfer phrase: 1–2 minutes.

Learners may repeat a week. There is no streak penalty and no requirement to “complete” pronunciation in a month.

## Evidence and wording sources

- British Council, *Tongue twisters*: teaching sequence and examples for `/θ/`–`/f/`, vowels, `/w/`, `/s/`–`/ʃ/`, `/tʃ/`–`/ʃ/`, `/r/`–`/l/`, and consonant clusters: https://africa.teachingenglish.org.uk/classroom/pronunciation/tongue-twisters
- Sasisekaran et al., speech-motor practice schedules and retention: https://pubmed.ncbi.nlm.nih.gov/26595190/
- Flege et al., acquisition of English `/r/` and `/l/` by Japanese learners: https://www.cambridge.org/core/journals/applied-psycholinguistics/article/abs/acquisition-of-r-and-l-by-japanese-learners-of-english-evidence-that-speech-production-can-precede-speech-perception/2AA96D62D2FCE297EA9F5E7A24D6B111
- Aoyama & Flege, Japanese learners' English `/r/` and `/l/`: https://www.jstage.jst.go.jp/article/onseikenkyu/15/3/15_KJ00008126457/_article/-char/en
- Hino, pronunciation evaluation for Japanese university students: https://www.jstage.jst.go.jp/article/onseikenkyu/22/2/22_39/_article/-char/en
- Dupoux et al., vowel insertion in English consonant clusters by Japanese speakers: https://www.jstage.jst.go.jp/article/ast/31/5/31_5_320/_article
- Tajima, rhythm practice and Japanese learners' English pronunciation: https://www.jstage.jst.go.jp/article/let/46/0/46_KJ00007022275/_article/-char/en
- New York Film Academy, actor voice exercises including classic articulation warm-ups: https://www.nyfa.edu/student-resources/voice-exercises-for-actors/
- Backstage, classic actor/singer warm-ups including *Unique New York*: https://www.backstage.com/magazine/article/literal-tongue-twister-warmup-singers-6879/
- Colby College CogBlog, *Freshly fried fresh flesh* example: https://web.colby.edu/cogblog/2014/11/24/difficulty-of-tongue-twisters/

## Editorial guardrails

- Use the exact reviewed wording stored in the course content; do not generate variants at runtime.
- Say **classic set**, not “the only tongue twisters you will ever need.”
- Say **suggested four-week rotation**, not “master pronunciation in 30 days.”
- Say **accuracy before speed** on every drill.
- Do not claim tongue twisters alone produce fluency or a native accent.
- Explain the exercise in Japanese; keep the practice phrase and audio in English.
