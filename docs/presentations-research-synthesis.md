# Presentations & Public Speaking — editorial research synthesis

Updated: 2026-11-01. This is an implementation record, not a claim to have audited every inaccessible resource.

## Course thesis

A presentation is successful to the extent that it enables *these listeners, on this occasion*, to understand an idea, assess evidence, learn a process, decide what to do, or appreciate a person or event. The design sequence is **Frame → Build → Deliver → Respond and revise**. In the application these are broken into 15 teachable competencies and adapted to different contexts. This is an Artico instructional synthesis, not a measured universal law.

## Source extraction: iBiology / Science Communication Lab

Primary syllabus and resource list: https://www.ibiology.org/educators-resources/online-course/share-your-research/

Official course: https://courses.ibiology.org/research-skills/presentation-on-science/

Video playlist: https://www.youtube.com/playlist?list=PL5zi65Byv2hj3D0TYhy508qPwsTruwLUm

| Source module | Principle and problem solved | Original Artico demonstration and practice | Scientific specialization | Transfer and caveat |
|---|---|---|---|---|
| **1. Framing Your Talk** | Audience, goal and message must be separated before making slides; avoid a topic with no audience outcome | Lesson 02 five-audience interactive explanation; Lesson 03 progressively shorter versions; editable Blueprint | Expert prerequisites, claims precise enough to remain defensible | Reframe for a business decision, student comprehension or a ceremony; an eight-second scientific summary is not always adequate |
| **2. Start Building Your Talk** | A talk is not a paper spoken aloud. Prioritize evidence and organize it for real-time listening | Lessons 04–06 evidence selection, structural comparisons and technical explanation; case-library slides and outlines | Methods–controls–results–interpretation boundaries; no selected-only positive findings | A demo benefits from task→interaction→result; a business review from decision→baseline→risk; storytelling remains optional |
| **3. Rounding Out a Strong Talk** | The introduction establishes relevance, the ending answers “so what?”, and structure makes the path followable | Lesson 07 alternative openings, transitions and closing; six distinct actual spoken examples | Research question, novelty, implication and measured limitations | A ceremonial opening may use a truthful memory, not a numerical hook; no compulsory dramatic opening |
| **4. Giving Your Talk** | Connect clearly, rehearse realistically, use specific feedback, prepare for nerves and Q&A | Lessons 10–13 delivery, timed rehearsal, contingency, and four-branch Q&A lab | Methodological challenges, convergence questions, unresolved questions | Business Q&A tests assumptions and trade-offs; a failed product demo must not be hidden |

### Directly inspected public transcript examples

- **“The First Step in Building a Research Talk”**: https://www.ibiology.org/educator-resources/syr/resources_first_step_in_building_a_research_talk.txt — emphasizes the work before making slides.
- **“Know and Distill Your Message”**: https://www.ibiology.org/educator-resources/syr/resources_know_and_distill_your_message.txt — message distillation and the difference between a topic and a takeaway.
- **“What Is a Good Research Talk?”**: https://www.ibiology.org/educator-resources/syr/resources_what_is_a_good_research_talk.txt — frames effectiveness and the audience.

The public educator index lists additional video transcripts, worksheets, four module descriptions and assessments. The original full-course Google Doc and some download/registration-dependent materials were not comprehensively accessible in this work. Therefore the research record does **not** claim a full transcript-by-transcript examination or a verified review of every resource.

### Transfer examples

- “Why does it matter?” in a scientific conference talk = what knowledge changed, supported by what data, with what uncertainty.
- In a manager's review = what decision or risk the data inform; include period, baseline and denominator.
- In a product demonstration = how a real user completes a task; show the actual working interaction and failure conditions.
- In teaching = what new mental model a student can construct and apply.
- In a toast = what this person or occasion means; use true, respectful specifics.

## Additional sources, classified carefully

| Source | Relevant claim | Classification | Operational choice |
|---|---|---|---|
| Stanford Oral Communication Program, “Presentation Content”: https://oralcommprogram.stanford.edu/presentation-and-delivery/presentation-content | Consider audience, goal and environment when planning; make spoken organization traceable | Institutional professional guidance | Audience/occasion check and clear opening/transitions, without mandatory three-point talks |
| Stanford scientific presentation guidance: https://oralcommprogram.stanford.edu/tutoring/scientific-presentation | Scientific narrative should adapt evidence and depth to context | Professional instructional guidance | Multiple levels of technical explanation; preserve data and controls |
| R. E. Mayer (2017), “Using multimedia for e-learning”: https://doi.org/10.1111/jcal.12197 | Experimental evidence supports signaling, coherence and contiguity in multimedia learning with important boundary conditions | Research synthesis; mostly learning-media evidence, not a universal rule for live talks | Direct graph labels, remove irrelevant decoration, preview visual comparisons |
| iBiology's “Share Your Research”: https://www.ibiology.org/educators-resources/online-course/share-your-research/ | A practical educational model built around research-talk construction | Source curriculum and expert practice, not a universal scientific law | Original Artico exercises, new scenarios, cumulative blueprint |
| Artico's four-stage planning model | A teachable abstraction connecting context to performance | **Original instructional synthesis** | Use only as a decision tool, not a guaranteed formula |

## Editorial safeguards

- Do not teach unsupported precise “ideal” slide counts, fixed attention spans, body-language ratios, specific eye-contact intervals or a universal speaking pace.
- A compelling story is not evidence; a beautiful slide cannot rescue misleading data.
- For science, preserve unit, sample size, control, uncertainty, observation vs interpretation. For business, preserve baseline, denominator, decision context and assumptions.
- Examples in the course that use quantitative figures clearly say **illustrative data**; there is no pretense of verified research findings.
- No copied iBiology transcripts, worksheets, figures or slides. External links are optional; the main lessons are self-contained.
- Multiple-choice interactions explain judgment but do not claim to assess live pronunciation, charisma, persuasion, confidence or the scientific correctness of original content.

## Software map

- \`src/web/presentationCourseData.js\`: original lessons, cases, contexts, phrases, cited resource registry and Blueprint fields.
- \`src/web/PresentationCourse.jsx\`: overview, Study/Practice, five-audience switcher, side-by-side improvement, source links, scenario exercises, visuals, case library and Blueprint.
- \`src/web/presentation-course.css\`: course-specific responsive editorial style and print layout.
- \`src/web/Application.jsx\`: route entry; \`src/web/learning.js\`: route parsing and saved responses.
- \`src/web/presentationCourse.test.js\` and \`scripts/application-render.test.mjs\`: structure, routing, persistence and rendered-page checks.

**Persistence:** Drafts remain only in the existing client-device localStorage and can be exported as Markdown or printed. No server sync, automatic speech scoring, third-party audio retention or proof of scientific correctness is offered. Progress is user-marked and editable. Saving many long drafts remains subject to localStorage limits.
