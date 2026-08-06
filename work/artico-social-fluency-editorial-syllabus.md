# Artico Social Fluency

## Editorial syllabus and production rules

**Status:** syllabus locked; chapter writing in progress  
**Audience:** Japanese learners of English  
**Canonical spine:** *English for Everyone: Everyday English* — 96 numbered chapters  
**Teaching model:** Irodori-style Can-do outcomes and situation-first sequencing  
**Product principle:** the book manuscript is the source of truth; the app UI is derived from the manuscript later.

## 1. What this layer is

Social Fluency is not an eight-card app module and it is not a phrase list. It is a book-length explanation of how everyday English works between people: how speakers enter a conversation, hold it, repair it, show attitude, make requests, solve practical problems, and leave the interaction naturally.

All 96 chapters remain in the syllabus. Editorial priority controls writing depth and production order; it does not delete or merge chapters.

- **Core Social Fluency** — high-depth chapters about social mechanics, interpersonal judgment, repair, rapport, and communicative control.
- **Everyday Application** — full practical chapters about recurring real-world situations.
- **Reference / Optional** — shorter but complete chapters whose main burden is vocabulary or a narrower setting.

## 2. Source hierarchy

1. **English for Everyone: Everyday English** supplies the exact 96-chapter order and topic spine.
2. **Existing NotebookLM chats** supply legacy theory, phrase breakdowns, cultural notes, and “Good to Know” material where they exist.
3. **Irodori** supplies the pedagogic method: begin with a real situation and an observable Can-do, then explain only what helps the learner act in that situation.
4. **Artico editorial judgment** supplies the original Japanese explanation, Japanese-learner friction, sequencing, dialogue, practice, and house voice.

The source book is a reference, not publishable copy. Artico prose, examples, dialogues, audio scripts, and visual briefs must be original.

## 3. Book architecture

| Part | Chapters | Title | Editorial purpose |
|---:|:---:|---|---|
| 1 | 01–13 | Conversation Skills / 会話のスキル | Build the social lubricants, repair strategies, and interpersonal basics required for fluid conversation. |
| 2 | 14–19 | Family and Relationships / 家族と人間関係 | Discuss personal connections and life events, and express interest, empathy, support, or romantic intent. |
| 3 | 20–25 | Eating and Drinking / 飲食 | Handle dining, ordering, food preferences, and shared meals naturally. |
| 4 | 26–33 | Free Time and Hobbies / 余暇と趣味 | Connect through interests, plans, entertainment, hobbies, and sport. |
| 5 | 34–44 | Shops and Services / お店とサービス | Manage transactions, requests, returns, money, delivery, and service problems. |
| 6 | 45–55 | Work and Study / 仕事と学習 | Enter professional and academic environments and participate with appropriate register. |
| 7 | 56–64 | The Home / 家 | Manage housing, neighbours, domestic responsibilities, repairs, and emergencies. |
| 8 | 65–71 | Getting Around / 移動・交通 | Use transport, confirm routes, and resolve travel problems. |
| 9 | 72–79 | On Holiday / 休日・休暇中 | Handle bookings, accommodation, sightseeing, directions, and holiday problems. |
| 10 | 80–87 | Health and Medicine / 健康と医療 | Describe symptoms, make appointments, ask for help, and respond to urgent situations. |
| 11 | 88–96 | Media and Communications / メディアと通信 | Communicate by phone, email, message, video call, social media, and public text. |

## 4. What “theory” means in Artico

Theory is a proper explanation of communicative behavior. A chapter is not finished because it lists useful English.

Every full chapter must explain:

1. **The situation** — where the learner is, who the other person is, and what is at stake.
2. **The communicative problem** — what the learner is trying to make happen between people.
3. **Why the English works** — the social logic, not only the dictionary meaning.
4. **When to use it** — relationship, setting, timing, and emotional temperature.
5. **Register and nuance** — casual, neutral, polite, formal, warm, distant, direct, or softened.
6. **Contrast** — what a Japanese learner may say instead, and why it can sound unnatural, blunt, vague, or overly formal.
7. **Culture and expectations** — the interaction pattern an English speaker is likely to expect.
8. **Transfer** — how the learner can reuse the principle in a new situation.

The Japanese explanation should be clear and substantial. Grammar terminology is allowed only when it genuinely makes the idea easier to understand.

## 5. Required chapter anatomy

```markdown
# Chapter XX: English title / 自然な日本語タイトル

**Editorial priority:** Core Social Fluency / Everyday Application / Reference  
**Source-chat status:** Full legacy theory / Partial / Missing

## Can-do
One observable Irodori-style outcome in natural Japanese.

## Opening situation
A brief concrete scene that gives the language a reason to exist.

## Theory
A proper Japanese explanation of the communicative problem, why the language works,
when it is used, its register, and the relevant contrast.

## Key patterns and nuance
Two to six reusable frames, each with meaning, register, and substitution logic.

## Dialogue
One short original dialogue that shows the theory in action, with Japanese support.

## Japanese-learner friction
The likely trap, why it happens, and the practical fix.

## Culture and use
The social expectation or cultural background that changes how the phrase lands.

## Good to know
One memorable linguistic or cultural insight.

## Practice bridge
A controlled substitution task followed by a small real-world mission.

## Audio production brief
Original Artico audio made later in Google AI Studio.

## Image brief
An image only when it makes the idea easier to understand.
```

## 6. Media rules

### Audio — Google AI Studio

Audio will be generated later from original Artico scripts. Do not depend on third-party audio or a runtime API.

Each chapter may include:

- a natural dialogue pass;
- a phrase-focus pass with clear pauses;
- a shadowing pass at controlled speed;
- a response-cue pass in which the learner must answer;
- direction for role, relationship, emotion, speed, and intonation.

Audio is instructional only when the UI tells the learner exactly what to notice and what to do with it.

### Images — ChatGPT image generator

Use an image when it can replace explanation or make an invisible distinction visible. Good uses include a social scene, object layout, sequence, mouth position, or contrast between two interpretations. Avoid decorative filler and generic stock-style characters.

### Video

Video is out of scope for this editorial pass. No production plan, Blender work, or dependency should block the book.

## 7. Writing order

1. Curate and lock all 96 chapter briefs.
2. Recover and normalize the 18 chapters that already have full NotebookLM theory.
3. Write missing **Core Social Fluency** chapters first.
4. Write remaining **Everyday Application** chapters.
5. Complete **Reference / Optional** chapters at the appropriate shorter depth.
6. Only after manuscript review, derive lessons, practice screens, audio batches, and image prompts for the app.

## 8. Definition of done

A chapter is done only when it can stand alone as a readable book chapter and can also be converted into a lesson without inventing missing theory later. A group of UI cards, isolated phrases, or a video embed does not satisfy this definition.

