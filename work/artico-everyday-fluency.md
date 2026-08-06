# Artico — Everyday Fluency Layer

Source-grounded product brief synthesized from the Google NotebookLM notebook **Irodori Japanese Grammar Guide** on 2026-07-22.

## Source roles

- **Irodori Starter / Elementary 1 / Elementary 2**: pedagogical structure — real-world Can-do outcomes, situation-first sequencing, listening before explanation, contextual grammar, and task-based practice.
- **Irodori Grammar and word lists**: concise Japanese explanation and controlled vocabulary.
- **English for Everyone: Everyday English**: target English situations, dialogues, flexible sentence frames, and phrase bank.
- **Existing NotebookLM discussion**: Japanese-language explanations of the Everyday English chapters and cultural notes.

## Product principles

1. **Can-do before grammar.** Every lesson begins with something the learner will be able to do in a real interaction.
2. **Repair before perfection.** Clarification phrases appear in Module 1 so a missed word never ends the conversation.
3. **Flexible frames before phrase lists.** Teach a small sentence frame that can accept the learner's own information.
4. **English backchanneling.** Explicitly teach reactions, fillers, follow-up questions, and turn-taking—the English equivalent of aizuchi.
5. **Listen, notice, then explain.** Natural dialogue comes first; the Japanese explanation is short and functional.

## Curriculum — eight core modules

### 1. アイスブレイクと会話のサバイバル — Icebreakers & Survival

**Can-do:** I can begin a first encounter, recover when I miss something, and show active interest.

Functions: casual/formal greetings; introducing oneself and others; asking for repetition; asking for clarification; buying thinking time; reacting naturally.

Japanese learner friction: freezing after one missed word, textbook-only greetings, silence while formulating a perfect answer.

Source support: *Everyday English* chapters 1–4; Irodori's Can-do and listening-first lesson structure.

### 2. 意見と好みの伝え方 — Opinions & Preferences

**Can-do:** I can state preferences and agree or disagree without sounding blunt.

Functions: asking for a view; stating an opinion; softening certainty; preference; indifference; polite disagreement.

Source support: *Everyday English* chapters 5–6.

### 3. 誘いと約束 — Making Plans & Arrangements

**Can-do:** I can invite someone, accept, decline politely, and negotiate another time.

Functions: suggestions; accepting; soft refusal; alternatives; dates and times; confirming arrangements.

Source support: *Everyday English* chapters 7, 12, 18; Irodori contextual grammar for invitations and refusal.

### 4. カフェとレストランでのやり取り — Cafes & Dining Out

**Can-do:** I can order, ask about options, customize, and handle the bill.

Functions: ordering; recommendations; modifications; missing items; payment; splitting the bill.

Source support: *Everyday English* chapters 21 and 24.

### 5. 買い物とトラブル解決 — Shopping & Troubleshooting

**Can-do:** I can find an item, ask about size or stock, and resolve a return or exchange.

Functions: asking for items; sizes; trying on; stock; explaining faults; refund/exchange.

Source support: *Everyday English* chapters 36, 39, and 40.

### 6. 感謝と謝罪のニュアンス — Gratitude & Apologies

**Can-do:** I can match thanks and apologies to the seriousness of the situation.

Functions: quick thanks; deeper gratitude; small apology; taking responsibility; accepting an apology; repair.

Source support: *Everyday English* chapters 8–9.

### 7. 新しい職場と人間関係 — Navigating New Workplaces

**Can-do:** I can introduce myself, ask colleagues for help, and navigate a new workplace.

Functions: first-day introductions; asking where/how; checking routines; asking for help; progress updates; joining lunch.

Source support: *Everyday English* chapters 51–52.

### 8. 会議とコラボレーション — Meetings & Collaboration

**Can-do:** I can enter a discussion, clarify a point, summarize, and stay connected.

Functions: agenda; polite interruption; clarification; agreement/disagreement; summary; follow-up/networking.

Source support: *Everyday English* chapters 53–54.

## Reusable lesson loop

### Learn mode

1. **Context** — one relatable situation and one Can-do outcome.
2. **Notice** — listen once without reading a rule.
3. **Listen + breakdown** — isolate two or three high-mileage chunks; explain them briefly in natural Japanese.
4. **Imitate** — shadow stress, rhythm, reductions, and intonation.

### Practice mode

5. **Substitute** — replace one slot while keeping the frame and rhythm.
6. **Personalize** — answer with true information about the learner.
7. **Real-world mission** — complete a short role-play or real interaction outcome.
8. **Spaced return** — reuse the same function in a later module and on a later day.

## Module 1 lesson map

### 1.1 The natural check-in

**Context:** a casual reunion versus greeting someone for the first time.

Core language:

- “How are you doing?”
- “I'm good. How've you been?”
- “It's a pleasure to meet you.”

Japanese guidance: `How are you? — I'm fine.` だけに固定しない。関係性と時間の空き方で自然な問いかけを選ぶ。

Practice: hear a scenario, choose the register, reply aloud, then give one true detail.

### 1.2 Smooth introductions

Core language:

- “I don't think we've met. I'm ___.”
- “I'd like to introduce you to ___.”
- “This is my friend / partner / colleague, ___.”

Japanese guidance: `I don't think we've met.` は唐突にならずに自分から自己紹介を始められる柔らかい入口。

Practice: substitute relationship and name; then introduce a real person from the learner's life.

### 1.3 Never freeze again

Core language:

- “Sorry, I didn't catch that.”
- “Could you say that again, please?”
- “What does ___ mean?”
- “Do you mean ___?”

Japanese guidance: 聞き返すことは失敗ではなく、会話を続ける技術。`What?` だけより、何が必要かを伝える。

Practice: a deliberately fast or unclear prompt; learner selects and speaks the repair phrase; the second playback is clearer.

### 1.4 Keep the ball rolling

Core language:

- “Well...” / “Let me think...”
- “Really?” / “That sounds good.” / “Oh no.”
- “How about you?”

Japanese guidance: 日本語の相槌を単純に直訳せず、感情に合う反応と一つの follow-up を返す。

Practice: reaction matching, timed filler practice, and a 30-second mini-conversation that must include a reaction and follow-up.

## MVP boundaries

- No grammar terminology or grammar chapter navigation.
- No travel-only airport, hotel, customs, car-rental, or sightseeing module.
- No hyper-specific vocabulary inventories.
- No advanced presentations, negotiations, job interviews, or formal business writing yet.
- No tests, scores, XP, streaks, gems, leaderboards, or artificial rewards.
- No open-ended AI chat in the MVP.
- No reading/writing course inside this layer; reading supports speaking only.

## UI direction for the first implementation

- Add **Everyday Fluency** as the next course layer after Foundation.
- Preserve the existing Artico header, left navigation, green/cream/charcoal palette, generous spacing, and Learn / Practice mental model.
- The overview shows the eight modules as an ordered open list/rail, not a game map or a grid of generic cards.
- Only Module 1 is interactive in this pass. Modules 2–8 show their Can-do outcome and “Coming next,” without fake progress.
- Module 1 exposes four lessons. Each lesson has one Learn state and one Practice state following the shared loop.
- Use browser speech synthesis only as an optional model-audio fallback; never imply a recording was evaluated.

