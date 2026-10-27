// Original Artico teaching material. Not official IELTS questions or calibrated forms.
export const IELTS_CONTENT_VERSION = '2026-10-28.1'
export const officialResources = [
  { title: 'Official IELTS Academic format', url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test' },
  { title: 'Official sample questions, recordings, and Speaking examples', url: 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test' },
  { title: 'How IELTS is scored', url: 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail' },
  { title: 'Current test-delivery update', url: 'https://ielts.org/news-and-insights/updates-to-ielts-test-delivery' },
]

export const skillInfo = {
  speaking: {
    title: 'Speaking', duration: '11–14 minutes', structure: 'Three parts', goal: 'Answer the actual question, develop your meaning, and stay understandable.',
    intro: 'This is a conversation with an examiner, but it is still an assessment. You need to respond to the question in front of you—not deliver a speech you memorised for a similar topic.',
    sections: [
      { title: 'Know the three jobs', body: 'Part 1 asks about familiar matters. Part 2 gives you a topic, one minute to prepare, and a longer turn. Part 3 develops a more general discussion. Practise moving from a personal detail to an explanation, comparison, or qualification.' },
      { title: 'Know what is assessed', body: 'Fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation have equal weight. Speaking quickly, forcing idioms, or having a particular accent is not a substitute for communicating clearly.' },
      { title: 'Develop without memorising', body: 'Give a direct answer. Add a relevant reason, detail, or example when it helps. If the question changes, change your answer. There is no required number of sentences for every Part 1 response.' },
      { title: 'Use a recording as evidence', body: 'Listen once for meaning and organisation, then again for a specific language or intelligibility problem. Note an exact moment. Re-record one answer with one change, then answer a new question without a script.' },
    ],
    model: { question: 'Is there a place in your neighbourhood you enjoy visiting?', segments: [
      ['Direct answer', 'Yes, there is a small park near my apartment.', 'The listener immediately knows which place you mean.'],
      ['Relevant detail', 'I usually go there after work because it is quieter than the main street.', 'The reason explains your choice rather than adding an unrelated story.'],
      ['Specific example', 'Even a short walk around the pond helps me switch out of work mode.', 'One concrete detail develops the answer. This is an illustration, not a script to memorise.'],
    ] },
    check: ['Did I answer the question actually asked?', 'Which detail made my meaning clearer?', 'Where did I pause to find language or lose my thread?', 'What will I change in a fresh answer?'],
  },
  writing: {
    title: 'Writing', duration: '60 minutes', structure: 'Two tasks', goal: 'Fulfil the task accurately, develop the important points, and leave time to check.',
    intro: 'A fluent paragraph can still miss the task. Start with the instructions and the information. Your job is to select, explain, and organise—not fill a template with impressive-looking words.',
    sections: [
      { title: 'Two tasks, one clock', body: 'Academic Task 1 describes visual information in at least 150 words. Task 2 develops an essay of at least 250 words. Task 2 has twice the weight. About 20 and 40 minutes is useful planning guidance, not two separately locked timers.' },
      { title: 'Choose the important information', body: 'For Task 1, identify what the visual actually measures, the units, and the main patterns or stages. Write an overview and support it with accurate comparisons. Do not invent a cause for a change the visual does not explain.' },
      { title: 'Answer every command', body: 'For Task 2, identify every requested action. Discussing two views is not the same as only giving your own view. Develop relevant reasons and examples; a long introduction cannot replace the requested work.' },
      { title: 'Review against the criteria', body: 'Check task achievement/response, coherence and cohesion, lexical resource, and grammatical range and accuracy. First repair missing content or an unclear argument. Then make targeted language edits. More complicated wording is not automatically more precise.' },
    ],
    model: { question: 'Some people favour quiet study areas; others prefer collaborative spaces. Discuss both views and give your own opinion.', segments: [
      ['Identify the work', 'The response must discuss both views and give a clear opinion.', 'There are three obligations. A paragraph about only your favourite option leaves work undone.'],
      ['Develop one view', 'Quiet areas can protect attention when a task requires uninterrupted reading. For example, a student checking a difficult argument may need time to reread without a conversation nearby.', 'A reason is explained and illustrated, not just listed.'],
      ['Qualify the position', 'A library can serve both needs if it separates silent and collaborative areas rather than making every room follow the same rule.', 'This position can be defended across the essay. It is one possible plan, not an official model answer.'],
    ] },
    check: ['Have I fulfilled every instruction?', 'Are my data and comparisons accurate?', 'Does each paragraph do useful work?', 'Which two edits improve meaning most?'],
  },
  listening: {
    title: 'Listening', duration: 'About 30 minutes', structure: 'Four parts · 40 questions', goal: 'Understand the message on the first pass, including corrections and qualifications.',
    intro: 'Knowing all the individual words does not guarantee that you followed the message. Listen for who means what, what changes, and which details answer the question.',
    sections: [
      { title: 'Preview the demand', body: 'Read the instructions and the answer limits. Decide whether a gap needs a name, number, place, or other detail. Preview meaning without assuming the first plausible word you hear is the answer.' },
      { title: 'Follow the final information', body: 'A speaker may give an earlier plan and then correct it. A question might ask for the final arrangement. Follow the whole exchange; do not stop listening after recognising one keyword.' },
      { title: 'Match meaning, not an echo', body: 'A correct option may paraphrase the recording. An incorrect option may repeat its words. Check the relationship and the speaker’s position, not just a vocabulary match.' },
      { title: 'Use the transcript after an attempt', body: 'Compare your answer with the recording. Locate the exact evidence. Decide whether the problem was hearing, vocabulary, following an argument, or entering the answer. Replay that short section, then transfer to new audio.' },
    ],
    model: { question: 'Which room is the workshop in now?', segments: [
      ['Earlier arrangement', 'We originally booked Room 14.', 'This is an earlier plan, not automatically the final answer.'],
      ['Correction', 'However, the projector there is being repaired.', 'The contrast signals that the arrangement may change.'],
      ['Final arrangement', 'So please come to Room 18 instead.', 'The final room is 18. In an independent listening attempt, you would hear this before seeing the transcript.'],
    ] },
    check: ['Did I follow the final arrangement?', 'Which words support my answer?', 'Was the problem hearing, meaning, or answer entry?', 'Can I do it with a different recording?'],
  },
  reading: {
    title: 'Reading', duration: '60 minutes', structure: 'Three sections · 40 questions', goal: 'Find and interpret the evidence without adding information that is not there.',
    intro: 'The topic may be familiar, but your answer has to come from the passage. Everyday knowledge, a reasonable guess, and evidence in the text are different things.',
    sections: [
      { title: 'Locate, then read closely', body: 'Use headings, names, dates, and the organisation of the passage to find a likely location. Then read enough context to establish the meaning. Scanning is a locating tool, not a replacement for understanding.' },
      { title: 'Respect scope and strength', body: 'Some is not all; may is not will; an association is not proof of a cause. Small words can change the claim. Compare the question with the whole relevant statement.' },
      { title: 'Distinguish false from absent', body: 'For True/False/Not Given tasks, False needs contradictory evidence. Not Given means the text does not establish the claim or its opposite. Do not turn missing information into a contradiction.' },
      { title: 'Manage the whole hour', body: 'Reading has a shared 60-minute allowance. Check answers and enter them within that time. In practice, track where time goes, but do not force every passage into an identical time block.' },
    ],
    model: { question: 'Does the passage establish that the new hours caused more borrowing?', segments: [
      ['What was measured', 'Borrowing increased after the library extended its opening hours.', 'The sequence is stated.'],
      ['What is missing', 'The report did not compare the library with a similar branch that kept its old hours.', 'A useful comparison was not made.'],
      ['Careful conclusion', 'The passage reports an increase, but it does not establish the extended hours as its cause.', 'Do not make the evidence stronger than the text does.'],
    ] },
    check: ['Where is the exact evidence?', 'Have I changed the strength or scope of a claim?', 'Did I follow the word limit?', 'What would I do differently on a new passage?'],
  },
}

export const readingPassage = [
  { id: 'a', label: 'A', text: 'In the fictional town of Bellford, a community centre opened a tool library in 2022. Residents could borrow items they needed occasionally, such as ladders and electric drills, instead of buying them. The organisers initially expected most members to be experienced home renovators. In practice, many early members had never used some of the tools before. They wanted instructions as well as equipment.' },
  { id: 'b', label: 'B', text: 'Membership cost twenty pounds a year. The fee included borrowing, but not every item could be taken home immediately. Members had to attend a short safety session before borrowing power tools. Hand tools did not require this session. Volunteers checked each returned item and removed damaged equipment from circulation until it had been repaired. The checks sometimes delayed another loan, but the organisers treated safety as more important than speed.' },
  { id: 'c', label: 'C', text: 'For the first six months, the library opened only on Saturday mornings. A survey showed that some residents who worked at weekends could not collect equipment. The centre then added a Wednesday evening session. Loans increased during the following three months. However, the organisers also ran a publicity campaign at the same time. Their report said that the available figures could not separate the effect of the new hours from that of the campaign.' },
  { id: 'd', label: 'D', text: 'Space created an unexpected difficulty. Large items occupied shelves even when few people borrowed them. The volunteers recorded demand for each item rather than assuming that a larger collection was always better. They stopped accepting duplicate donations of rarely borrowed equipment and used the space for frequently requested tools. They did not sell the existing collection. A neighbouring centre agreed to store some of the bulky items.' },
  { id: 'e', label: 'E', text: 'Members valued different things. Some joined to reduce spending; others mentioned avoiding waste or meeting neighbours. The survey allowed people to select more than one reason. Although most respondents chose saving money, the organisers warned that the survey included only current members. It did not show why other residents had decided not to join. A further interview project was planned, but no results from it appeared in the report.' },
]
export const readingQuestions = [
  { id: 'r1', text: 'The organisers expected experienced home renovators to form most of the membership.', answer: 'TRUE', paragraph: 'a', why: 'Paragraph A explicitly states their initial expectation. The later membership pattern is a different claim.' },
  { id: 'r2', text: 'Every borrower had to attend a safety session before borrowing any item.', answer: 'FALSE', paragraph: 'b', why: 'Paragraph B distinguishes power tools from hand tools. Hand tools did not require the session.' },
  { id: 'r3', text: 'The library had more members than any other tool library in the region.', answer: 'NOT GIVEN', paragraph: 'a', why: 'There is no regional comparison. Not having a comparison is not evidence that the claim is false.' },
  { id: 'r4', text: 'The report established that longer opening hours alone caused the increase in loans.', answer: 'FALSE', paragraph: 'c', why: 'The report says the figures could not separate the hours change from the publicity campaign.' },
  { id: 'r5', text: 'The volunteers sold rarely borrowed equipment to create space.', answer: 'FALSE', paragraph: 'd', why: 'Paragraph D explicitly says they did not sell the existing collection.' },
  { id: 'r6', text: 'Survey respondents could give more than one reason for joining.', answer: 'TRUE', paragraph: 'e', why: 'Paragraph E explicitly allows multiple reasons.' },
  { id: 'r7', text: 'The planned interviews found that most non-members considered the fee too high.', answer: 'NOT GIVEN', paragraph: 'e', why: 'The interview results were not included, so neither this finding nor its opposite is established.' },
  { id: 'r8', text: 'The library introduced an additional collection session on Wednesday evenings.', answer: 'TRUE', paragraph: 'c', why: 'Paragraph C states the new session and its day.' },
]

const speakingTopics = [
  ['neighbourhood', 'Your neighbourhood', 'Describe a place near your home that you enjoy visiting.', ['Where it is', 'When you go there', 'What you do there', 'Why it matters to you'], 'How can public spaces serve people with different needs?'],
  ['learning', 'Learning a skill', 'Describe a skill you learned that took time to improve.', ['What the skill is', 'How you learned it', 'What was difficult', 'What helped you improve'], 'Why do some adults find it difficult to begin learning something new?'],
  ['journey', 'A memorable journey', 'Describe a journey that did not go exactly as planned.', ['Where you were going', 'Who you were with', 'What changed', 'How you dealt with it'], 'How might reliable transport affect a community?'],
  ['advice', 'Useful advice', 'Describe a piece of advice you found useful.', ['Who gave it', 'What the situation was', 'What the advice was', 'Why you remember it'], 'When might advice be less useful than asking questions?'],
  ['object', 'An object you value', 'Describe an everyday object that is important to you.', ['What it is', 'How you got it', 'How you use it', 'Why you value it'], 'Why do people keep objects they no longer use?'],
  ['change', 'A change in your routine', 'Describe a change you made to your daily routine.', ['What you changed', 'Why you changed it', 'How you adjusted', 'What difference it made'], 'Who should take responsibility for encouraging healthier routines?'],
]
export const speakingTasks = speakingTopics.map(([id, title, prompt, bullets, followUp]) => ({
  id: `s-${id}`, skill: 'speaking', title, kind: 'speaking', minutes: 3, label: 'Part 2 workshop · 1 minute preparation + up to 2 minutes speaking',
  prompt, bullets, followUp, objectives: ['Make a short plan, not a complete script.', 'Develop a relevant example.', 'Listen back and choose one change.'],
  review: 'This is a practice cue card, not an official test question. After your longer turn, try the general follow-up without reading a model. Use your own recording to review meaning and intelligibility.',
}))
const essayTopics = [
  ['study-spaces', 'Quiet and collaborative study', 'Some people think libraries should provide only quiet study areas. Others believe they should also provide spaces for group work. Discuss both views and give your own opinion.', 'Discuss quiet study, discuss group work, and give and support your own position.'],
  ['transport', 'Public transport', 'Some cities invest heavily in public transport, while others prioritise roads for private cars. Discuss both approaches and give your own opinion.', 'Explain each investment approach and make your own judgment clear.'],
  ['remote-work', 'Working from home', 'Working from home is becoming more common in some occupations. Do the advantages of this development outweigh the disadvantages?', 'Consider benefits and drawbacks, then make and support an outweigh judgment.'],
  ['practical-learning', 'Practical learning', 'Some people think schools should give more time to practical skills than to academic subjects. To what extent do you agree or disagree?', 'Choose a defensible extent of agreement and develop reasons relevant to the comparison.'],
  ['food-waste', 'Food waste', 'Many households throw away food that could have been eaten. Why does this happen, and what could be done to reduce it?', 'Explain causes and propose connected responses. Do not answer only one question.'],
  ['local-shops', 'Local shops', 'In some places, small local shops are being replaced by large retail centres. Is this a positive or negative development?', 'Make an evaluation and explain its basis rather than simply listing changes.'],
]
export const essayTasks = essayTopics.map(([id, title, prompt, review]) => ({
  id: `w-${id}`, skill: 'writing', title, kind: 'essay', minutes: 40, label: 'Task 2 practice · at least 250 words', prompt, minimum: 250, review,
  objectives: ['Identify every instruction.', 'Develop relevant reasons and examples.', 'Leave time to check meaning and language.'],
}))
export const taskOne = {
  id: 'w-library-data', skill: 'writing', title: 'Library visits', kind: 'data', minutes: 20, label: 'Task 1 practice · at least 150 words', minimum: 150,
  prompt: 'The table shows the percentage of visits made for three purposes at a fictional city library in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  table: { caption: 'Share of library visits by main purpose (%) · fictional practice data', headings: ['Main purpose', '2015', '2025'], rows: [['Borrowing printed books', '60', '40'], ['Independent study', '25', '35'], ['Group activities', '15', '25']] },
  objectives: ['Identify the overall shift.', 'Compare categories and years accurately.', 'Do not invent explanations for the changes.'],
  review: 'Borrowing printed books remained the largest category but fell by 20 percentage points. The other two purposes increased, with independent study reaching 35% and group activities 25%. Report percentage points carefully; a fall from 60% to 40% is not a fall of 20% of the original value.',
}
export const readingTasks = [
  { id: 'r-tool-library', materialId: 'tool-library', skill: 'reading', title: 'The community tool library', kind: 'reading', minutes: 12, label: 'Mini practice · 8 questions · not a full Reading mock',
    prompt: 'Read the passage. Decide whether each statement agrees with the information: TRUE, FALSE, or NOT GIVEN. Base every answer on this text, not on what seems likely.',
    passage: readingPassage, questions: readingQuestions, objectives: ['Distinguish contradiction from missing information.', 'Notice qualifiers and causes.', 'Find the evidence for each decision.'],
  },
  { id: 'r-library-hours', materialId: 'tool-library', skill: 'reading', title: 'Hours, publicity, and evidence', kind: 'reading', minutes: 5, label: 'Targeted drill · 3 questions',
    prompt: 'Read the extract and classify each statement as TRUE, FALSE, or NOT GIVEN.', passage: [readingPassage[2]], questions: readingQuestions.filter((q) => ['r4', 'r8'].includes(q.id)).concat({ id: 'r9', text: 'The Wednesday session was more popular than the Saturday session.', answer: 'NOT GIVEN', paragraph: 'c', why: 'The extract provides no comparison between the two sessions.' }),
    objectives: ['Separate timing from cause.', 'Do not infer a comparison without evidence.'],
  },
]
export const listeningScript = [
  { id: 'l-a', label: 'Booking', text: 'Welcome to the Bellford community workshop. Here are the final arrangements for Saturday. The session was advertised for ten o’clock, but we have changed the start to ten thirty. Please arrive ten minutes before that so we can check everyone in. We originally booked Room fourteen. However, the projector there is being repaired, so please come to Room eighteen instead.' },
  { id: 'l-b', label: 'What to bring', text: 'You do not need to bring any tools. We will provide them, together with safety glasses. Please bring a notebook if you want to take notes. We first considered asking everyone to bring their own gloves, but that is no longer necessary. Gloves will be available at the workshop.' },
  { id: 'l-c', label: 'Payment and travel', text: 'The standard fee is twelve pounds. That includes the materials and a hot drink, but not lunch. Payment is by card at reception. There is no car park at the centre. The nearest bus stop is on Market Street, not Station Road. If you cycle, you can leave your bike behind the building. We look forward to seeing you on Saturday.' },
]
export const listeningTask = {
  id: 'l-workshop', skill: 'listening', title: 'The workshop arrangements', kind: 'listening', minutes: 6,
  label: 'Short listening workshop · 5 questions · synthetic practice voice',
  prompt: 'Listen to the final workshop arrangements. Choose the correct answer for each question. The recording is computer-generated original training audio, not an official IELTS recording.',
  audio: 'audio/ielts/workshop.wav', transcript: listeningScript,
  questions: [
    { id: 'l1', text: 'When does the session start?', options: ['10:00', '10:20', '10:30'], answer: '10:30', paragraph: 'l-a', why: '10:00 was the advertised time; 10:30 is the corrected start. Arrival is ten minutes earlier.' },
    { id: 'l2', text: 'Which room will be used?', options: ['Room 12', 'Room 14', 'Room 18'], answer: 'Room 18', paragraph: 'l-a', why: 'Room 14 was the original booking, but the session moved to Room 18.' },
    { id: 'l3', text: 'What are participants invited to bring for their own use?', options: ['Tools', 'A notebook', 'Gloves'], answer: 'A notebook', paragraph: 'l-b', why: 'Tools and gloves are supplied. A notebook is suggested for taking notes.' },
    { id: 'l4', text: 'What is NOT included in the standard fee?', options: ['Materials', 'A hot drink', 'Lunch'], answer: 'Lunch', paragraph: 'l-c', why: 'The fee covers materials and a hot drink, explicitly excluding lunch.' },
    { id: 'l5', text: 'Where is the nearest bus stop?', options: ['Market Street', 'Station Road', 'Behind the building'], answer: 'Market Street', paragraph: 'l-c', why: 'Market Street is the bus stop; behind the building is bicycle parking.' },
  ], objectives: ['Follow corrected arrangements.', 'Keep arrival and starting times separate.', 'Check what is included and excluded.'],
}
export const writingMock = {
  id: 'mock-writing-one', skill: 'writing', title: 'Writing rehearsal 01', kind: 'writing-mock', minutes: 60, label: 'Two original tasks · shared 60-minute clock · self-review, no band score',
  prompt: 'Complete both tasks. Task 1 requires at least 150 words; Task 2 requires at least 250 words. Manage the shared hour yourself. This original practice form has not been calibrated as an IELTS test.',
  tasks: [taskOne, essayTasks[0]], objectives: ['Complete both tasks in one shared hour.', 'Review each response against its own requirements.'],
}
export const allIeltsTasks = [...speakingTasks, ...essayTasks, taskOne, ...readingTasks, listeningTask, writingMock]
export const taskById = Object.fromEntries(allIeltsTasks.map((task) => [task.id, task]))
export const skillTasks = (skill) => allIeltsTasks.filter((task) => task.skill === skill && task.kind !== 'writing-mock')
export const guidedSets = [
  { id: 'a', title: 'Set A · Work through it together', summary: 'See how a decision is made. Try the task, then open the coach.', taskIds: ['r-tool-library', 'l-workshop', 'w-library-data', 's-neighbourhood'], support: 'Frequent coaching and evidence explanations.' },
  { id: 'b', title: 'Set B · You try first', summary: 'Make a first attempt. Use a hint only when you need it.', taskIds: ['r-library-hours', 's-learning', 'w-practical-learning'], support: 'Hints on demand; reveal only after you have tried.' },
  { id: 'c', title: 'Set C · Work independently', summary: 'Complete a bounded task before opening the review.', taskIds: ['w-remote-work', 's-journey'], support: 'No coaching during the attempt; annotated review afterward.' },
  { id: 'd', title: 'Set D · Repair and transfer', summary: 'Choose one change, then use it with unfamiliar content.', taskIds: ['w-food-waste', 's-advice', 'w-local-shops'], support: 'Independent attempt, self-review, and a fresh follow-up.' },
]
