# IELTS course UI research and recommendation

**Prepared:** 30 October 2026  
**Scope:** Product structure and learning UI for Artico’s IELTS course; no app changes made.

## Recommendation

Keep the Artico shell and build the IELTS course as a clear progression from **orientation → learn a method → guided practice → independent practice → test rehearsal → review and repair**. Do not make every learner take a full mock before they can learn. The current Artico IELTS area already has the right top-level pieces: an IELTS overview, a Study/Practice switch, four skill areas, guided sets, individual skill mocks, and full simulations. Keep that structure and make the relationship between those pieces unmistakable.

IELTS belongs under **Application → English Tests → IELTS**, which fits the existing app. The course landing screen should let learners either continue their recommended next activity or choose a skill. Put short practice, timed sets, skill mocks, and full simulations inside the course’s **Practice** mode. Treat a mock as a kind of practice with test conditions, not as a third global navigation tab.

## Proposed course map

```text
Application
└── English Tests
    └── IELTS
        ├── Start here: understand the test and set a goal
        ├── Listening
        ├── Reading
        ├── Writing
        ├── Speaking
        ├── Guided sets
        ├── Individual skill mocks
        └── Full test simulation
```

Use the current IELTS landing screen as the course map. Keep **Study | Practice** visible and persistent. In Study, show the sequence of instruction and examples. In Practice, keep the same skill map but offer short drills, guided sets, timed practice, mocks, and review. This preserves context as learners switch modes instead of making them relearn a separate navigation system.

### Test type and delivery

IELTS Academic and General Training share Listening and Speaking, while Reading and Writing differ. A course that supports both should reuse the shared skill lessons and branch only where the actual tasks differ. The current public Artico page presents Academic as the first course; keep that scope explicit until the General Training path is ready. When it is ready, add the Academic/General Training choice at the IELTS entry point and make the branch visible in Writing Task 1 and Reading.

Test delivery guidance needs to remain current. IELTS announced that paper-based delivery would be phased out from mid-2026, with market-specific timing; selected markets offer Writing on Paper as an option within computer delivery. For simulation settings, show the learner’s local delivery options only after checking the current local provider. Avoid a universal paper-versus-computer switch that could be wrong for a learner’s market. [IELTS test types](https://www.ielts.org/take-a-test/test-types) · [IELTS delivery update](https://ielts.org/news-and-insights/updates-to-ielts-test-delivery) · [Writing on Paper](https://ielts.org/take-a-test/test-types/ielts-on-computer-writing-on-paper)

## Screen-by-screen structure

### 1. Start here: orientation and plan

Keep this short enough that learners can start practising in the first visit. The current **Everything about IELTS** lesson already introduces the test, explains Academic versus General Training, describes the four skills, and distinguishes studying from test practice. The companion workbook asks about the learner’s goal, deadline, and current evidence. Preserve this content.

Recommended order:

1. **Why are you taking IELTS?** Ask for the receiving organisation or purpose and remind the learner to verify its required test type and minimum scores.
2. **Which test are you preparing for?** Start with Academic if that is the course being shipped; offer General Training when its path is complete.
3. **What is your deadline and realistic weekly study time?** Make both optional and editable.
4. **Choose a starting point.** Offer a short sample activity in each skill or skip straight to the course. Do not force a full exam as the entry gate.
5. **Show a next step.** Give one specific lesson or practice activity, plus its approximate time.

Call a short baseline a **starting snapshot**, not an IELTS band score. If you later offer estimated bands, label them as estimates and explain their basis. Official IELTS Ready also separates shorter mock formats from full tests and offers progress tools; IDP describes 5–15 minute activities, 20–30 minute modules, and longer web-based test practice. Those are useful interface patterns for different amounts of available time, not evidence that any specific duration is optimal. [British Council IELTS Ready](https://takeielts.britishcouncil.org/prepare/ielts-ready) · [IDP study plan and session lengths](https://ielts.idp.com/prepare/article-use-idp-ielts-app-to-create-daily-study-plan)

### 2. IELTS course home

Keep the visual language and sidebar of Artico. On the course page, make the first screen answer three questions: **Where am I? What should I do next? How long will it take?**

- A single **Continue** card with course, skill, lesson, and an honest time estimate.
- A visible goal or test date, if the learner set one.
- Four skill cards with a short purpose statement and a link to the skill’s lessons.
- A Practice area with clear choices: **Quick practice**, **Guided sets**, **Timed practice**, **Skill mock**, **Full simulation**.
- A small progress summary by skill or task type, with an obvious route to review errors.

Avoid placing every feature, score, course resource, and marketing message on the home screen. The next action should be the visual focus; the complete map can remain directly below it.

### 3. Skill lesson and annotations

Use one repeatable lesson pattern across the four skills:

1. **Learn the task:** what it asks, what a good response must do, and the relevant timing or word limit.
2. **See a worked example:** reveal the reasoning and evidence step by step.
3. **Try with support:** offer a hint or scaffold, then let the learner answer.
4. **Try a fresh item:** gradually remove the help.
5. **Review and repair:** explain why the answer works, identify the likely error type, and offer one related retry.

Attach annotations to the task the learner is doing rather than creating a separate general-purpose annotation section. Useful controls include highlight, add a short note, bookmark, and mark “unsure.” Keep the annotation tied to its passage, prompt, answer, or audio point.

- **Reading:** highlight the exact sentence or paragraph that supports an answer; compare it with the wording in the question.
- **Listening:** save a note or bookmark with the relevant audio timestamp; show the transcript only during review or when the lesson calls for it.
- **Writing:** let learners mark prompt demands, outline ideas, and compare a revision with the original. Put rubric feedback beside the relevant part of the response.
- **Speaking:** provide cue-card planning notes, recording/replay, and a short reflection on fluency, clarity, or pronunciation.

For every scored practice item, show the answer, a concise explanation, and the evidence or rule behind it. Magoosh’s public IELTS course describes video explanations for each practice question; this is a useful standard for closing the “why was that wrong?” gap. [Magoosh IELTS Basic](https://ielts.magoosh.com/basic)

### 4. Practice sets

Separate practice by **support** and **conditions**, not just by content title:

| Mode | Help and timing | Best use |
|---|---|---|
| Guided set | Worked example, prompts or hints, untimed or flexible | Learn a question type and practise the method |
| Quick practice | A few focused items with immediate feedback | Short session or targeted review |
| Timed set | Clear timer and fewer prompts | Build pacing after the method is understood |
| Skill mock | Representative section with realistic timing and navigation | Check one skill’s readiness |
| Full simulation | Linked exam rehearsal with no teaching interruptions | Rehearse test-day stamina and workflow |

Give quick practice a visible route from **mistake → explanation → retry → related lesson**. IDP’s quiz design groups short activities by topic and difficulty, gives feedback after questions, and suggests a next step; Duolingo’s Practice tab groups mistakes, vocabulary, speaking, and listening for on-demand review. Adapt the targeted review and next-step idea, not the decorative game mechanics. [IDP quizzes](https://ielts.idp.com/prepare/article-prepare-smarter-with-our-ielts-quizzes) · [Duolingo Practice tab](https://blog.duolingo.com/guide-to-duolingo-practice-hub/)

### 5. Familiarisation, mock, and full simulation

These serve different jobs and deserve different entry labels:

- **Computer familiarisation:** optional and untimed. Let learners try the controls, question navigation, answer entry, highlighting, and notes before adding pressure. IDP’s computer familiarisation test is untimed and lets learners check answers after finishing. [IDP computer familiarisation](https://ielts.idp.com/about/ielts-familiarisation-tests)
- **Skill mock:** a realistic Listening, Reading, Writing, or Speaking section. Show the task, time, conditions, and what feedback will be available before starting.
- **Full simulation:** a separate, clearly labelled longer session. No hints or instructional explanations during the attempt; save the review until submission. IELTS lists a total of 2 hours 45 minutes for the four skills, with Speaking potentially scheduled separately, so the UI should explain what this simulation includes rather than implying every real test session is identical. [IELTS Academic format](https://ielts.org/take-a-test/test-types/ielts-academic-test)

During test mode, keep the question number, section progress, timer, flag-for-review control, and submit action visible. Add a start confirmation that names the conditions. After submission, open the review rather than ending on a single overall score.

Score Listening and Reading answers where the key is defensible. For Writing and Speaking, show criterion-linked observations and a careful estimate only when the scoring method is validated; do not imply certification or guarantee an official band. E2’s own mock-test help page explicitly cautions that a mock score is not a real test score, a useful model for transparent result language. [E2 IELTS mock test](https://support.e2language.com/en/article/how-accurate-is-the-e2-ielts-mock-test-7azx7/)

### 6. Results and progress

Make review the bridge back to learning. Show:

- Correct/incorrect answers and time for objective items.
- The evidence or rubric criterion connected to each response.
- A small number of error patterns, such as missed paraphrase, unsupported inference, incomplete task response, or grammar control.
- One recommended repair lesson and one fresh retry.
- Separate records for objective practice outcomes, estimates, and learner self-reflection.

Do not turn every activity into a projected band. Progress is more useful when it shows what the learner can do now and what to practise next. Keep the existing Artico self-assessment and saved-item surfaces alongside objective results, clearly labelled as different kinds of evidence.

## Inspiration reviewed

| Product | Observed pattern | Adapt for Artico |
|---|---|---|
| [British Council IELTS Ready](https://takeielts.britishcouncil.org/prepare/ielts-ready) | Familiarisation, short and full mocks, skill courses, progress tracking, and a personalised study guide | Graduated readiness steps and a next-action plan |
| [IDP IELTS app](https://ielts.idp.com/prepare/article-everything-you-need-ielts-by-idp-app) | Courses, videos, articles, quizzes, self-assessment, and suggested resources | Offer both short mobile activities and longer course/test sessions |
| [Official IELTS resources](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test) | Sample tasks and format guidance, plus official scoring and test-type information | Link out for authoritative examples and verify format claims |
| [Duolingo Practice tab](https://blog.duolingo.com/guide-to-duolingo-practice-hub/) | On-demand practice by mistakes, vocabulary, speaking, and listening | Build a targeted review queue from the learner’s errors |
| [Magoosh IELTS](https://ielts.magoosh.com/basic) | Practice questions with explanations and a progress dashboard | Give every practice answer a meaningful explanation |
| [E2 IELTS](https://support.e2language.com/en/article/how-accurate-is-the-e2-ielts-mock-test-7azx7/) | Timed mock with detailed feedback and an explicit score caveat | Separate rehearsal from score claims and route results to repair |

These pages show what the products currently offer; they are not independent evidence that a design feature improves learning. Use them as patterns to compare, then use learner feedback and course activity to decide what works for Artico.

## Suggested build order

1. **Tighten the course map and orientation:** clear course scope, test-type guidance, target, and next action.
2. **Complete one end-to-end lesson loop for each skill:** explanation, annotation, guided attempt, independent attempt, feedback, and repair.
3. **Add quick and timed task-type sets:** ensure answer explanations and useful error tags exist first.
4. **Add untimed computer familiarisation and individual skill mocks:** match current delivery conditions and make results transparent.
5. **Add full simulation and cross-skill progress:** after the skill content, review, and test-mode interactions are ready.

This sequence builds the learning and review loop before asking learners to spend several hours on a full rehearsal. It also matches Artico’s existing editorial course design and the structure already visible in the IELTS prototype.

## References checked

- [IELTS Academic and General Training test types](https://www.ielts.org/take-a-test/test-types)
- [IELTS test delivery update](https://ielts.org/news-and-insights/updates-to-ielts-test-delivery)
- [IELTS Academic format](https://ielts.org/take-a-test/test-types/ielts-academic-test)
- [IELTS sample questions](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)
- [British Council IELTS Ready](https://takeielts.britishcouncil.org/prepare/ielts-ready)
- [IDP study plan and activity lengths](https://ielts.idp.com/prepare/article-use-idp-ielts-app-to-create-daily-study-plan)
- [IDP quizzes](https://ielts.idp.com/prepare/article-prepare-smarter-with-our-ielts-quizzes)
- [IDP familiarisation test](https://ielts.idp.com/about/ielts-familiarisation-tests)
- [Duolingo Practice tab](https://blog.duolingo.com/guide-to-duolingo-practice-hub/)
- [Magoosh IELTS question explanations](https://ielts.magoosh.com/basic)
- [E2 mock-score caveat](https://support.e2language.com/en/article/how-accurate-is-the-e2-ielts-mock-test-7azx7/)
