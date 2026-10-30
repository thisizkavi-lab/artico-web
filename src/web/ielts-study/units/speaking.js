/**
 * Artico IELTS Study Course · Module 5: Speaking (Parts 5.1–5.4)
 * Covers source sections §9.1 through §9.24.
 * Ten comprehensive units covering interview architecture, criteria, procedural questions,
 * Part 1 answering, Part 2 task card decoding, 1-minute notes, long-turn execution,
 * Part 3 abstract thinking operations, response frameworks, unfamiliar questions,
 * pause diagnostics, natural spoken phrases, 9 sentence functions, pronunciation,
 * listener impact, stress, intonation, pace, selective self-correction, 4-pass audio review,
 * shadowing, AI feedback limits, and official score myths.
 */

export const speakingUnits = [
  // 30. s-interview-and-criteria (§9.1, §9.2)
  {
    id: 's-interview-and-criteria',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-1',
    partTitle: 'Part 5.1 · Interview Architecture & Criteria',
    title: 'How the Speaking interview works and what is assessed',
    minutes: 8,
    sourceSections: ['9.1', '9.2'],
    needs: ['w-process-timing-length-review'],
    blocks: [
      {
        type: 'lead',
        summary: 'The IELTS Speaking interview lasts between 11 and 14 minutes across three distinct parts that progressively increase in cognitive abstraction. Assessment rests equally upon four published criteria rather than examiner impression or personal style.',
        whyItMatters: 'Believing popular internet myths about smiling, formal clothing, or memorizing native idioms distracts from the four criteria, leading candidates to neglect grammatical accuracy and pronunciation clarity.',
        whatYouWillDo: 'Study the Speaking 3-part progression SVG diagram, analyze the four equal-weight criteria, and eliminate misconceptions about physical performance.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-speaking-3parts',
        title: 'The Three-Part Speaking Interview Progression',
        caption: 'Progression through 11–14 minutes: Part 1 Familiar Everyday Topics (4–5 min) → Part 2 Individual Long Turn from Cue Card (3–4 min total) → Part 3 Two-Way Abstract Discussion (4–5 min).',
        alt: 'Timeline diagram showing the three stages of the IELTS Speaking interview from personal experience to abstract discussion.',
      },
      {
        type: 'comparisonTable',
        caption: 'The Four Equal-Weight Speaking Assessment Criteria (25% Each)',
        headers: ['Criterion', 'Weight', 'What the Examiner Evaluates', 'Official Band Benchmark'],
        rows: [
          ['Fluency and Coherence (FC)', '25%', 'Speech rate, flow continuity, logical sequencing, and appropriate use of discourse markers.', 'Sustains speech without noticeable effort or loss of coherence.'],
          ['Lexical Resource (LR)', '25%', 'Vocabulary range, accuracy of word choice, natural collocations, and effective paraphrasing.', 'Uses vocabulary resource flexibly to discuss a variety of topics.'],
          ['Grammatical Range and Accuracy (GRA)', '25%', 'Range of sentence structures, clause subordination, and proportion of error-free utterances.', 'Uses a mix of simple and complex structures with good control.'],
          ['Pronunciation (P)', '25%', 'Phonemic accuracy, word stress, sentence focus, intonation contours, and effortless intelligibility.', 'Uses a range of pronunciation features with precision and clarity.'],
        ],
      },
      {
        type: 'section',
        id: 'the-three-parts-in-detail',
        title: 'Three Distinct Interactive Environments',
        bridge: 'Recognize how the interactive demand changes across the three stages of the interview.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Part 1 consists of comfortable questions about familiar everyday topics, such as your neighborhood, daily routines, or personal interests. It establishes your baseline communicative fluency in an informal question-and-answer format.',
          'Part 2 provides a task card, paper, and pencil. You receive exactly one minute to prepare notes before speaking uninterrupted for one to two minutes on a specified experience.',
          'Part 3 transitions into a two-way discussion exploring broader social, cultural, and philosophical issues connected to the Part 2 topic. The examiner asks probing questions that require analytical explanation and evaluation.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Communication Is the Goal, Not a Fifth Criterion',
        body: 'Effective communication is the practical purpose of speech, not a separate fifth grading category. Zero marks are awarded for smiling, eye contact, body language, formal attire, or prestige accents. Focus entirely on the four published criteria.',
      },
      {
        type: 'selfCheck',
        title: 'Speaking Architecture and Criteria Checklist',
        items: [
          'I recognize that all four criteria carry an equal 25% weighting.',
          'I understand that Part 1 is personal, Part 2 is an individual talk, and Part 3 is abstract.',
          'I focus on language production rather than theatrical physical gestures.',
          'I know that examiners evaluate intelligibility rather than native accents.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-criteria-audit',
        label: 'Review the four official Speaking criteria and identify which area represents your primary diagnostic weakness.',
      },
    ],
  },

  // 31. s-procedural-and-part1 (§9.3, §9.4, §9.5)
  {
    id: 's-procedural-and-part1',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-2',
    partTitle: 'Part 5.2 · Three-Part Delivery & Strategy',
    title: 'Procedural questions, Part 1 answers, and scope',
    minutes: 8,
    sourceSections: ['9.3', '9.4', '9.5'],
    needs: ['s-interview-and-criteria'],
    blocks: [
      {
        type: 'lead',
        summary: 'Procedural identity questions require direct, brief responses without rehearsed speeches. Part 1 questions succeed by providing the direct answer first, followed by one or two relevant supporting details that match the scope of the inquiry.',
        whyItMatters: 'Delivering a memorized biography when asked for your passport signals memorization to the examiner. Answering Part 1 questions with a single word fails to demonstrate grammatical range.',
        whatYouWillDo: 'Handle administrative questions cleanly, apply the Answer First plus Detail formula, listen to an authentic audio specimen, and avoid listing catalogs of preferences.',
      },
      {
        type: 'contrastPair',
        title: 'Procedural Check: Direct Verification versus Rehearsed Biography',
        weak: {
          text: 'Examiner: "Can you tell me your full name, please?" Candidate: "Yes, my name is Alex Chen, but my friends call me Alex. I was born in a beautiful small village in China and I recently graduated in finance."',
          whyItFails: 'Recites an irrelevant memorized life history during a simple administrative passport verification check.',
        },
        controlled: {
          text: 'Examiner: "Can you tell me your full name, please?" Candidate: "Yes, my full name is Alex Chen."',
          whyItWorks: 'Directly answers the procedural question without unnecessary elaboration or artificial rehearsed speeches.',
        },
      },
      {
        type: 'steps',
        title: 'The "Answer First, Then Add Detail" Protocol',
        items: [
          { action: 'Listen for the primary question trigger (e.g. How often, Which, Do you prefer, Why).', condition: 'Step 1: Identify Trigger', why: 'Ensures your opening phrase delivers the precise information requested.' },
          { action: 'State your direct response immediately in the first clause.', condition: 'Step 2: Direct Answer', why: 'Satisfies the question immediately without beating around the bush.' },
          { action: 'Add one supporting reason, concrete detail, or personal elaboration.', condition: 'Step 3: Relevant Detail', why: 'Demonstrates conversational fluency and grammatical subordination naturally.' },
          { action: 'Stop talking calmly once you have answered; do not ramble into unrelated topics.', condition: 'Step 4: Controlled Finish', why: 'Prevents repetitive filler and signals confidence to the examiner.' },
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-s-interview-part1',
        title: 'Part 1 Authentic Audio Model: Walking Routine',
        caption: 'Listen to a candidate answering a Part 1 prompt on daily habits using the Answer First plus Detail formula.',
        transcript: 'Examiner: Do you usually walk or take public transport to work? Candidate: I usually walk to work. It takes about fifteen minutes, and the route runs beside a quiet park, which helps me clear my mind before meetings begin.',
      },
      {
        type: 'comparisonTable',
        caption: 'Five Common Part 1 Triggers and Natural Openings',
        headers: ['Question Trigger', 'Direct Opening Formula', 'Example Natural Response'],
        rows: [
          ['How often... (Frequency)', 'I usually / I tend to / Rarely, if ever', '"I tend to cook at home most weeknights, though I dine out on Saturdays."'],
          ['Do you prefer A or B? (Choice)', 'I definitely prefer A because...', '"I definitely prefer reading physical books because digital screens cause eye fatigue."'],
          ['Where do you... (Location)', 'Mainly in / Near my...', '"Mainly in the central library, as it offers quiet study desks."'],
          ['Why do you... (Causal reason)', 'Principally because / The main reason is...', '"Principally because it allows me to commute without dealing with traffic jams."'],
          ['Did you... as a child? (Past habit)', 'When I was younger, I used to...', '"When I was younger, I used to play football in the local park every afternoon."'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Match the Scope: Avoid the Laundry List',
        body: 'If the examiner asks: "What is your favorite type of music?", name one genre and explain why you enjoy it. Do not recite a catalog of five genres and six artists. Selecting one item gives you something concrete to explain.',
      },
      {
        type: 'selfCheck',
        title: 'Part 1 Delivery Checklist',
        items: [
          'I answer identity checks directly without reciting personal background speeches.',
          'I provide the direct answer in sentence one, followed by one or two relevant details.',
          'I stop speaking once my point is made rather than rambling endlessly.',
          'I select one favorite item when asked for a preference rather than listing many.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-part1-practice',
        label: 'Answer three common Part 1 questions using the Answer First plus Detail formula.',
      },
    ],
  },

  // 32. s-part2-decode-and-prepare (§9.6, §9.7)
  {
    id: 's-part2-decode-and-prepare',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-2',
    partTitle: 'Part 5.2 · Three-Part Delivery & Strategy',
    title: 'Part 2: decode the task card and use the 1-minute prep',
    minutes: 8,
    sourceSections: ['9.6', '9.7'],
    needs: ['s-procedural-and-part1'],
    blocks: [
      {
        type: 'lead',
        summary: 'Part 2 requires choosing a valid topic within ten seconds and using the preparation minute to write concise keywords rather than full sentences. The task card cue points serve as a helpful narrative guide rather than a rigid mandatory checklist.',
        whyItMatters: 'Wasting the preparation minute trying to write complete sentences leaves you with an unfinished script that you cannot read while speaking, causing hesitation and anxiety.',
        whatYouWillDo: 'Decode task card parameters rapidly, construct a 12-word keyword note card, analyze an annotated note card specimen, and avoid topic mismatches.',
      },
      {
        type: 'steps',
        title: '5-Point Task Card Decoding Protocol',
        items: [
          { action: 'Identify the exact core category (person, place, object, event, or experience).', condition: 'Point 1: Core Subject', why: 'Prevents confusing an event with an object or a person with an organization.' },
          { action: 'Check every category restriction (e.g. "a famous person" vs "someone you know").', condition: 'Point 2: Restriction', why: 'Selecting a local family member for a card asking for a famous person fails the task.' },
          { action: 'Note the primary temporal status (past experience, current habit, or future aspiration).', condition: 'Point 3: Time Frame', why: 'Governs your predominant verb tenses throughout the 2-minute talk.' },
          { action: 'Scan all three bullet cues to understand the expected narrative progression.', condition: 'Point 4: Cue Points', why: 'Helps structure the beginning, middle, and peak of your spoken account.' },
          { action: 'Read the final prompt line (e.g. "and explain why this was memorable").', condition: 'Point 5: The Climax', why: 'Represents the most important analytical component where you develop deep meaning.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'note-card',
        title: 'Keyword Note Card versus Doomed Script',
        segments: [
          { text: 'Setting: Kyoto, ancient temple garden, autumn 2022', note: 'Keywords 1–3: Anchors time and spatial setting without full sentences.' },
          { text: 'Visual: stone pathways, vivid red maple foliage, pond reflection', note: 'Keywords 4–6: Triggers rich descriptive sensory vocabulary during speech.' },
          { text: 'Action: early morning walk, silence, wooden pavilion tea', note: 'Keywords 7–9: Provides sequential verbs for the narrative middle.' },
          { text: 'Impact: profound stillness, mental recovery after thesis deadline', note: 'Keywords 10–12: Supplies emotional and psychological reflection for the final explanation prompt.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Preparation Minute Strategy: Keywords versus Scripting',
        weak: {
          text: 'Candidate attempts a full script: "I would like to describe a memorable trip to Kyoto two years ago with my friend Sarah because we wanted to..."',
          whyItFails: 'Runs out of time after writing one incomplete sentence. Candidate has no notes for the remaining three cue points and gets stuck looking at the paper.',
        },
        controlled: {
          text: 'Candidate writes 12 keywords organized into 4 vertical rows corresponding to setting, visual atmosphere, narrative action, and personal significance.',
          whyItWorks: 'Uses glanceable bullet prompts that guide memory while allowing natural eye contact and spontaneous grammatical construction.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Do Not Divide Time Rigidly Across Cue Points',
        body: 'You are not required to speak for exactly 30 seconds on each bullet point. Establish the setting briefly in the opening 30 seconds. Then dedicate the remaining time to the story and why the experience was meaningful.',
      },
      {
        type: 'selfCheck',
        title: 'Part 2 Preparation Checklist',
        items: [
          'I choose a topic that strictly fits the card restriction within 10 seconds.',
          'I write brief keywords rather than attempting full sentences.',
          'My notes include sensory vocabulary and psychological reflection keywords.',
          'I plan to spend substantial time on the final "and explain why" prompt.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-note-card',
        label: 'Take a practice Part 2 task card and write a 12-keyword note card in exactly 60 seconds.',
      },
    ],
  },

  // 33. s-part2-long-turn-and-timeframes (§9.8, §9.9)
  {
    id: 's-part2-long-turn-and-timeframes',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-2',
    partTitle: 'Part 5.2 · Three-Part Delivery & Strategy',
    title: 'Give a connected long turn and control time frames',
    minutes: 8,
    sourceSections: ['9.8', '9.9'],
    needs: ['s-part2-decode-and-prepare'],
    blocks: [
      {
        type: 'lead',
        summary: 'Delivering a successful Part 2 talk requires sustaining speech for between one and two minutes until the examiner stops you. Organizing your talk around an authentic chronological or descriptive sequence allows natural transitions between time frames.',
        whyItMatters: 'Rushing through all cue points in 45 seconds creates awkward silence. Forcing past, present, and future tenses into a card about a single past event produces unnatural, disjointed storytelling.',
        whatYouWillDo: 'Deploy seven rich detail sources, sustain speech calmly until interrupted, align tenses to real time frames, and listen to a reserved cue-card media slot.',
      },
      {
        type: 'steps',
        title: 'Seven Rich Detail Sources for Part 2 Expansion',
        items: [
          { action: 'Physical Appearance: Describe physical dimensions, colors, architecture, or materials.', condition: 'Source 1: Sensory', why: 'Evokes vivid imagery and demonstrates high-level descriptive vocabulary.' },
          { action: 'Setting & Background: Explain what prompted the event or how you obtained the item.', condition: 'Source 2: Origin', why: 'Establishes clear narrative context before detailing the main experience.' },
          { action: 'Action Sequence: Detail two or three sequential steps that occurred.', condition: 'Source 3: Sequence', why: 'Provides narrative momentum and natural temporal transition markers.' },
          { action: 'Memorable Dialogue: Recall a brief interaction or comment made by someone present.', condition: 'Source 4: Interaction', why: 'Adds authentic human color and conversational authenticity to the account.' },
          { action: 'An Obstacle or Challenge: Mention a minor problem encountered and how it was resolved.', condition: 'Source 5: Complication', why: 'Creates authentic narrative interest and extends the duration of the talk.' },
          { action: 'Emotional Impact: Explain how your mood shifted before, during, and after.', condition: 'Source 6: Emotion', why: 'Directly addresses the final prompt requirement for personal reflection.' },
          { action: 'Lasting Consequence: Reflect on how this experience influences you today.', condition: 'Source 7: Reflection', why: 'Bridges past experience with present reality naturally when appropriate.' },
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-s-part2-cuecard',
        title: 'Part 2 Cue Card Long Turn Model: Community Project',
        caption: 'Model demonstration of a candidate delivering a connected 110-second talk from keyword notes.',
        transcript: 'I would like to talk about a community clean-up project that took place in my hometown two summers ago. The initiative was organized by a local neighborhood association after our community park had suffered from neglected maintenance over the winter...',
      },
      {
        type: 'comparisonTable',
        caption: 'Grammatical Tense Selection by Narrative Meaning',
        headers: ['Temporal Meaning', 'Appropriate Spoken Verb Form', 'Example Application'],
        rows: [
          ['Single completed historical action', 'Past Simple', '"We gathered at the pavilion at eight in the morning."'],
          ['Background action in progress in the past', 'Past Continuous', '"While volunteers were clearing overgrown shrubs, others were painting fences."'],
          ['Prior past action completed before another event', 'Past Perfect', '"The council had already delivered several industrial recycling bins."'],
          ['Continuing habit or present relevance', 'Present Simple / Perfect', '"I still visit that park weekly, and the community garden has flourished."'],
          ['Future anticipation or intention', 'Modal / Future Expression', '"If another project is organized next spring, I certainly intend to participate."'],
        ],
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Use Past-Present-Future Only When Relevant',
        body: 'Do not force past, present, and future tenses onto every card. If the topic asks about a memorable meal, focus on that past meal. Only transition to the present or future if there is an authentic reason, such as whether you still cook that dish today.',
      },
      {
        type: 'selfCheck',
        title: 'Part 2 Long Turn Delivery Checklist',
        items: [
          'I speak at a steady, measured pace without sprinting through my notes.',
          'I draw upon sensory details, complications, and emotional reflections.',
          'I continue speaking calmly until the examiner politely stops me.',
          'My verb tenses match the actual timeline of the events described.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-long-turn',
        label: 'Record yourself giving a 2-minute Part 2 talk and check whether you sustained speech calmly for at least 100 seconds.',
      },
    ],
  },

  // 34. s-part3-operations-and-development (§9.10, §9.11)
  {
    id: 's-part3-operations-and-development',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-2',
    partTitle: 'Part 5.2 · Three-Part Delivery & Strategy',
    title: 'Part 3: match the thinking operation and develop views',
    minutes: 8,
    sourceSections: ['9.10', '9.11'],
    needs: ['s-part2-long-turn-and-timeframes'],
    blocks: [
      {
        type: 'lead',
        summary: 'Part 3 shifts from personal storytelling to abstract societal discussion. Success requires identifying the cognitive thinking operation demanded by the examiner question and developing your answer through a 4-move analytical chain.',
        whyItMatters: 'Answering an abstract question about urban development with personal stories about your brother violates the expected register, keeping your score trapped at Band 5 or 6.',
        whatYouWillDo: 'Identify seven Part 3 cognitive thinking operations, execute the 4-move development chain, analyze an annotated remote-work specimen, and listen to a reserved abstract audio slot.',
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Part 3 Thinking Operations and Question Triggers',
        headers: ['Cognitive Operation', 'Typical Examiner Question Trigger', 'Required Analytical Response Job'],
        rows: [
          ['Explain Why (Causality)', '"Why do many young people prefer urban living?"', 'Identify underlying economic, cultural, or social mechanisms.'],
          ['Compare (Contrast)', '"How do shopping habits today differ from the past?"', 'Highlight systemic contrasts between generations or historical eras.'],
          ['Evaluate (Pros and Cons)', '"What are the drawbacks of international tourism?"', 'Weigh positive economic revenue against environmental or cultural strains.'],
          ['Responsibility (Governance)', '"Should governments or individuals finance green energy?"', 'Analyze institutional capabilities, taxation, and individual ethics.'],
          ['Suggest (Problem Solving)', '"How can cities reduce plastic waste effectively?"', 'Propose practical policy interventions or economic incentives.'],
          ['Predict (Future Forecast)', '"How will artificial intelligence impact employment?"', 'Project plausible future scenarios using calibrated modal expressions.'],
          ['Condition / Exception', '"Is remote learning suitable for all students?"', 'Identify boundaries, age differences, and special educational needs.'],
        ],
      },
      {
        type: 'steps',
        title: 'The 4-Move Spoken Development Chain',
        items: [
          { action: 'Move 1: State your direct analytical viewpoint in the opening sentence.', condition: 'Move 1: Direct View', why: 'Establishes clear position and answers the examiner question immediately.' },
          { action: 'Move 2: Explain the underlying societal mechanism or reason.', condition: 'Move 2: Mechanism', why: 'Provides depth and avoids superficial assertions.' },
          { action: 'Move 3: Offer a concrete, broad real-world scenario as evidence.', condition: 'Move 3: Evidence', why: 'Grounds the theoretical principle in observable social reality.' },
          { action: 'Move 4: Add a nuanced qualification, limitation, or alternative perspective.', condition: 'Move 4: Qualification', why: 'Demonstrates analytical maturity and high-level complex grammar.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'transcript',
        title: 'Annotated Part 3 Development: Remote Employment',
        segments: [
          { text: 'In my view, widespread remote work fundamentally benefits regional communities by decentralizing economic activity.', note: 'Move 1 (Direct View): States an explicit, abstract societal perspective.' },
          { text: 'When professionals are not required to commute daily to capital cities, their disposable income is spent on local services, cafes, and housing in smaller towns.', note: 'Move 2 (Mechanism): Explains the economic mechanism of regional wealth distribution.' },
          { text: 'For example, many coastal villages have experienced commercial revitalization over the past three years as remote workers relocated.', note: 'Move 3 (Evidence): Provides a plausible societal observation without personal trivia.' },
          { text: 'However, this development can also inflate local property prices, making housing less affordable for traditional residents.', note: 'Move 4 (Qualification): Adds a critical, balanced economic caveat.' },
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-s-part3-abstract',
        title: 'Part 3 Abstract Discussion Model: Automation & Society',
        caption: 'Audio demonstration of a candidate responding to a high-level Part 3 question on technological disruption.',
        transcript: 'Examiner: Some people believe that automation will eliminate more jobs than it creates. What is your view on this? Candidate: While technological transitions inevitably cause temporary dislocations in manufacturing and clerical sectors, historical precedent suggests that automation ultimately creates higher-value specialized industries...',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Do Not Fall Back into Personal Anecdotes',
        body: 'In Part 3, avoid responding with "Well, in my family, my cousin always does this...". While a brief personal illustration is acceptable, immediately link it back to the general societal principle. Part 3 measures your ability to discuss abstract ideas.',
      },
      {
        type: 'selfCheck',
        title: 'Part 3 Analytical Development Checklist',
        items: [
          'I identify whether the question asks me to explain, compare, evaluate, or predict.',
          'I maintain an abstract, societal register rather than telling personal stories.',
          'I support my direct view with an underlying causal mechanism.',
          'I qualify my claims by acknowledging conditions or potential trade-offs.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-part3-development',
        label: 'Deliver a 4-move response to a Part 3 question on whether governments should subsidize electric vehicles.',
      },
    ],
  },

  // 35. s-frameworks-unfamiliar-pauses (§9.12, §9.13, §9.14)
  {
    id: 's-frameworks-unfamiliar-pauses',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-2',
    partTitle: 'Part 5.2 · Three-Part Delivery & Strategy',
    title: 'Optional frameworks, unfamiliar questions, and pauses',
    minutes: 8,
    sourceSections: ['9.12', '9.13', '9.14'],
    needs: ['s-part3-operations-and-development'],
    blocks: [
      {
        type: 'lead',
        summary: 'Structured response frameworks act as flexible planning scaffolds rather than rigid recitation templates. Handling unfamiliar questions requires distinguishing between hearing difficulties and lack of experience, while pause diagnostics resolve the root cause of hesitation.',
        whyItMatters: 'Panicking when asked about an unfamiliar hobby causes silence. Treating all pauses as catastrophic leads candidates to speak frantically, resulting in dropped word endings and unintelligible pronunciation.',
        whatYouWillDo: 'Compare four optional response frameworks, master polite clarification techniques, diagnose five distinct causes of pauses, and prevent speed-induced stammering.',
      },
      {
        type: 'comparisonTable',
        caption: 'Four Optional Spoken Planning Frameworks',
        headers: ['Framework', 'Structural Flow', 'Optimal Application'],
        rows: [
          ['Answer, Detail, Example', 'Direct Answer → Practical Detail → Illustrative Instance', 'Part 1 questions and straightforward Part 3 prompts.'],
          ['Point, Explain, Link', 'Core View → Causal Mechanism → Prompt Link', 'Extended Part 3 arguments requiring logical depth.'],
          ['Two Perspectives + Verdict', 'Perspective A Rationale → Perspective B Rationale → Personal Position', 'Controversial policy prompts requiring comparative evaluation.'],
          ['Past, Present, Future', 'Historical Context → Current Status → Future Trend', 'Prompts addressing ongoing technological or cultural shifts.'],
        ],
      },
      {
        type: 'steps',
        title: 'Protocol for Unfamiliar or Challenging Questions',
        items: [
          { action: 'Did not hear the question: Ask politely for repetition without embarrassment.', condition: 'Condition 1: Acoustic Miss', why: 'Official guidelines permit asking: "Could you repeat the question, please?" without penalty.' },
          { action: 'Did not understand a word: Ask for polite clarification of the specific term.', condition: 'Condition 2: Vocabulary Gap', why: 'In Part 3, examiners can rephrase questions: "Could you explain what you mean by that term?"' },
          { action: 'No personal experience: State the limitation briefly and provide a plausible view.', condition: 'Condition 3: Zero Experience', why: 'Saying "I have never played golf, but I imagine people enjoy it for outdoor exercise..." works well.' },
          { action: 'Need thinking time: Use a natural filler phrase while assembling your thoughts.', condition: 'Condition 4: Planning Pause', why: 'Natural phrases like "That is an interesting question; I suppose..." maintain continuity.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Diagnostic Table: Five Distinct Causes of Pauses',
        headers: ['Cause of Pause', 'What Is Happening Cognitively', 'Effective Pedagogical Remedy'],
        rows: [
          ['Planning content', 'Searching for a viable idea or opinion.', 'Pick the first plausible idea immediately; do not search for perfection.'],
          ['Searching for words', 'Stuck trying to remember an obscure word.', 'Paraphrase immediately using ordinary words you control.'],
          ['Selecting grammar', 'Hesitating over complex clause architecture.', 'Default to two clean simple sentences rather than stalling.'],
          ['Misunderstanding', 'Confused about the examiner meaning.', 'Ask for clarification immediately rather than guessing in silence.'],
          ['Anxiety / Panic', 'Excessive adrenaline disrupting speech rhythm.', 'Breathe out slowly, lower your speaking pace, and focus on physical clarity.'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Speed Is Not Fluency',
        body: 'Fluency measures the natural, smooth flow of ideas, not how many words you can utter per second. Rushing speech causes dropped syllables, missing past tense markers, and vocal stammering. A calm, measured pace produces far higher scores.',
      },
      {
        type: 'selfCheck',
        title: 'Frameworks and Pause Control Checklist',
        items: [
          'I use frameworks as cognitive scaffolds rather than memorized scripts.',
          'I ask politely for repetition if I fail to hear a question clearly.',
          'If I lack direct experience, I acknowledge it and discuss a plausible hypothetical.',
          'I maintain a steady, comfortable pace rather than rushing frantically.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-unfamiliar-prompts',
        label: 'Practice responding to a question about an activity you have never done using a cautious hypothetical.',
      },
    ],
  },

  // 36. s-natural-language-and-functions (§9.15, §9.16)
  {
    id: 's-natural-language-and-functions',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-3',
    partTitle: 'Part 5.3 · Language Range, Phonology & Fluency',
    title: 'Natural spoken phrases and nine sentence functions',
    minutes: 8,
    sourceSections: ['9.15', '9.16'],
    needs: ['s-frameworks-unfamiliar-pauses'],
    blocks: [
      {
        type: 'lead',
        summary: 'High lexical scores in Speaking stem from natural conversational collocations and topic-appropriate vocabulary rather than forced archaic idioms. Controlling nine essential spoken sentence functions provides the grammatical flexibility needed across all three parts.',
        whyItMatters: 'Shoehorning colorful proverbs ("every cloud has a silver lining") into technical answers sounds artificial and unacademic. Grammatical errors in common functions like expressing duration cap your score.',
        whatYouWillDo: 'Deploy six natural spoken discourse frames, master the 9-row sentence function table, distinguish completed stays from continuing residence, and eliminate forced proverbs.',
      },
      {
        type: 'comparisonTable',
        caption: 'Six Natural Spoken Discourse Frames',
        headers: ['Discourse Frame', 'Spoken Function', 'Authentic Contextual Application'],
        rows: [
          ['"I tend to..."', 'Expressing typical habits or tendencies.', '"I tend to study in the evenings when the house is quiet."'],
          ['"What I appreciate about it is..."', 'Highlighting a specific positive quality.', '"What I appreciate about my neighborhood is its proximity to the station."'],
          ['"It really depends on..."', 'Introducing nuanced situational conditions.', '"It really depends on the weather and how much free time I have."'],
          ['"From what I have observed..."', 'Framing broader social observations in Part 3.', '"From what I have observed, younger generations prioritize work-life balance."'],
          ['"To put it another way..."', 'Paraphrasing an idea for greater precision.', '"To put it another way, convenience often outweighs environmental concerns."'],
          ['"I would not go so far as to say..."', 'Calibrating a qualified objection.', '"I would not go so far as to say that physical books will disappear entirely."'],
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'The Nine Core Spoken Sentence Functions and Grammatical Checks',
        headers: ['Sentence Function', 'Example Spoken Construction', 'Critical Grammatical Check'],
        rows: [
          ['State a role', '"I am an accountant." / "I study biology."', 'Use the indefinite article (a/an) before singular professions.'],
          ['State geographic origin', '"I am originally from Busan in South Korea."', 'Answer the location question directly without long prologues.'],
          ['State a habit or preference', '"I normally commute by bicycle."', 'Use present simple combined with natural frequency adverbs.'],
          ['Describe a completed event', '"I visited my grandparents last weekend."', 'Use past simple; ensure final past tense markers (-ed) are audible.'],
          ['Express continuing duration', '"I have lived here for four years."', 'Use present perfect to show residence continuing to the present day.'],
          ['Describe an emotional reaction', '"I felt tremendously relieved after the exam."', 'Pair accurate emotive adjectives with realistic explanatory causes.'],
          ['State a qualified position', '"I agree up to a point, but there are exceptions."', 'Specify the exact degree of agreement or disagreement.'],
          ['Provide a causal reason', '"Principally because it reduces travel overheads..."', 'Complete the dependent clause without creating broken fragments.'],
          ['Illustrate with evidence', '"For instance, during the recent heatwave..."', 'Ensure the concrete scenario directly supports the preceding premise.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Duration Precision: Continuing Residence versus Completed Stay',
        weak: {
          text: 'Candidate says: "I live here for three years." Or: "I went to London for three years" (when meaning they currently live in London).',
          whyItFails: 'Uses present simple for continuing duration, or uses past simple which indicates that the residency has already ended.',
        },
        controlled: {
          text: 'Candidate says: "I have lived in London for three years." (Continuing) Or: "I lived in London for three years before moving to Manchester." (Completed)',
          whyItWorks: 'Correctly selects the present perfect for ongoing residence and past simple for completed historical periods.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Forced Idiom Quota Trap',
        body: 'There is no requirement to use idioms like "raining cats and dogs" or "burning the midnight oil". In modern English, natural phrasal verbs ("figure out", "catch up on") and topic-specific collocations ("housing bubble", "carbon footprint") count as idiomatic language.',
      },
      {
        type: 'selfCheck',
        title: 'Spoken Language and Functions Checklist',
        items: [
          'I use present perfect ("have lived") for continuing duration and past simple for finished events.',
          'I deploy natural spoken frames ("I tend to", "It depends on") without overusing them.',
          'I use precise topic collocations rather than forced clichéd proverbs.',
          'I ensure singular profession nouns include an article ("I am an engineer").',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-sentence-functions',
        label: 'Record yourself producing six of the nine sentence functions using accurate grammar.',
      },
    ],
  },

  // 37. s-pronunciation-stress-pace (§9.17, §9.18, §9.19)
  {
    id: 's-pronunciation-stress-pace',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-3',
    partTitle: 'Part 5.3 · Language Range, Phonology & Fluency',
    title: 'Develop pronunciation through listener impact, stress, and pace',
    minutes: 8,
    sourceSections: ['9.17', '9.18', '9.19'],
    needs: ['s-natural-language-and-functions'],
    blocks: [
      {
        type: 'lead',
        summary: 'Pronunciation assessment focuses on overall intelligibility and natural phonological features rather than imitating a British or American accent. Controlling word stress, sentence focus, thought-group chunking, and measured pace ensures your message is understood without strain.',
        whyItMatters: 'Shifting word stress (such as saying "PHO-to-graph" versus "pho-TO-gra-pher") can obscure meaning completely. Speaking too fast causes final consonant clusters to disappear, damaging pronunciation marks.',
        whatYouWillDo: 'Study the stress contrast SVG diagram, master thought-group chunking, control syllable stress, and adjust speaking tempo for maximum listener ease.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-speaking-stress-contrast',
        title: 'Word Stress, Sentence Focus, and Intonation Contours',
        caption: 'Phonological architecture: Syllable stress shifts (ECON-omy vs eco-NOM-ic), sentence focus stress highlighting new information, and thought-group chunking with terminal intonation falls.',
        alt: 'Acoustic diagram showing pitch contours, syllable stress peaks, and thought-group pauses in connected speech.',
      },
      {
        type: 'steps',
        title: 'Four Core Phonological Pillars in IELTS Pronunciation',
        items: [
          { action: 'Individual Sound Clarity: Pronounce vowel and consonant contrasts distinctly.', condition: 'Pillar 1: Sounds', why: 'Prevents confusing minimal pairs like "ship" and "sheep" or "tree" and "three".' },
          { action: 'Word Stress: Place emphasis on the correct syllable within multi-syllable words.', condition: 'Pillar 2: Syllable Stress', why: 'Incorrect syllable stress forces the listener to decode words with difficulty.' },
          { action: 'Sentence Focus Stress: Emphasize the core content word carrying new information.', condition: 'Pillar 3: Sentence Focus', why: 'Signals contrast and key meaning (e.g. "I wanted the RED folder, not the blue one").' },
          { action: 'Thought-Group Chunking: Pause at natural grammatical boundaries between clauses.', condition: 'Pillar 4: Chunking', why: 'Divides speech into digestible meaning units rather than breathless rambling.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Syllable Stress Shifts in English Word Families',
        headers: ['Root Noun / Concept', 'Primary Stress on Syllable 1', 'Primary Stress on Syllable 2 or 3'],
        rows: [
          ['Photography', 'PHO-to-graph (Noun)', 'pho-TOG-ra-phy (Activity) / pho-to-GRAPH-ic (Adjective)'],
          ['Economy', 'E-con-o-my (System)', 'e-co-NOM-ic (Adjective) / e-co-NOM-i-cal (Thrifty)'],
          ['Record', 'REC-ord (Noun: sports record)', 're-CORD (Verb: to record audio)'],
          ['Present', 'PRES-ent (Noun: gift)', 'pre-SENT (Verb: to present data)'],
          ['Technology', 'TECH-no-crat (Person)', 'tech-NOL-o-gy (Discipline) / tech-no-LOG-i-cal (Adjective)'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Breathless Rambling versus Thought-Group Chunking',
        weak: {
          text: 'BecauseIwenttotheuniversitiesinSydneyIreallyenjoyedtheculturallifebecauseitwasveryopenanddiverse.',
          whyItFails: 'Runs all words together at high speed without pausing, flattening pitch contours and dropping word endings.',
        },
        controlled: {
          text: 'Because I studied in Sydney // I really enjoyed the cultural environment // principally because it was exceptionally welcoming // and diverse.',
          whyItWorks: 'Inserts brief micromomentary pauses at logical clause boundaries (//), allowing pitch variation and crisp consonant articulation.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Accent Is Not Pronunciation',
        body: 'You do not need an authentic BBC or Hollywood accent. An international accent is completely acceptable provided that sounds are clear, stress is accurate, and listeners can follow your words effortlessly. Focus on clarity, not accent mimicry.',
      },
      {
        type: 'selfCheck',
        title: 'Pronunciation and Pace Checklist',
        items: [
          'I check the correct syllable stress on multi-syllable academic words.',
          'I pronounce final consonant clusters (-ts, -ds, -ped) clearly.',
          'I pause briefly at natural grammatical boundaries between clauses.',
          'I speak loudly and clearly at a controlled, comfortable tempo.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-pronunciation-drills',
        label: 'Read a paragraph aloud focusing on pausing at clause boundaries and placing stress on contrasting content words.',
      },
    ],
  },

  // 38. s-self-correction-and-review (§9.20, §9.21)
  {
    id: 's-self-correction-and-review',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-4',
    partTitle: 'Part 5.4 · Diagnosis, Training & Repertoire',
    title: 'Self-correct selectively and review recordings in four passes',
    minutes: 8,
    sourceSections: ['9.20', '9.21'],
    needs: ['s-pronunciation-stress-pace'],
    blocks: [
      {
        type: 'lead',
        summary: 'Effective self-correction repairs high-impact meaning errors quickly without disrupting the natural flow of speech. Accelerating Speaking performance requires recording your practice responses on a smartphone and conducting a disciplined 4-pass diagnostic review.',
        whyItMatters: 'Constantly restarting sentences to fix minor article slips destroys Fluency and Coherence. Practicing without recording yourself reinforces unnoticed grammar slips and pronunciation gaps.',
        whatYouWillDo: 'Master selective self-correction boundaries, execute the 4-pass audio recording review protocol, log recurring speech errors, and eliminate compulsive restarting.',
      },
      {
        type: 'steps',
        title: 'The Rules of Selective Self-Correction',
        items: [
          { action: 'Error alters meaning: Correct immediately in one brief repair move.', condition: 'Rule 1: Meaning Shift', why: 'If you said "fifteen" instead of "fifty", repair it cleanly: "fifty, I mean" and proceed.' },
          { action: 'Immediate grammar slip: Repair only if the correct form is immediately available.', condition: 'Rule 2: Instant Slip', why: 'A quick slip ("she go... she goes") is acceptable if it does not stall speech continuity.' },
          { action: 'Minor article or preposition slip: Keep going without rewinding.', condition: 'Rule 3: Minor Slips', why: 'Stammering back over an omitted "the" costs far more in fluency than the slip itself.' },
          { action: 'Lost train of thought: Summarize your previous sentence and conclude.', condition: 'Rule 4: Train of Thought', why: 'Prevents long awkward silences while trying to reconstruct a forgotten point.' },
        ],
      },
      {
        type: 'steps',
        title: 'The 4-Pass Audio Recording Review Protocol',
        items: [
          { action: 'Pass 1 (Task & Relevance): Did you answer the exact prompt directly and completely?', condition: 'Pass 1: Task', why: 'Verifies whether your ideas addressed the topic without wandering off on tangents.' },
          { action: 'Pass 2 (Coherence & Flow): Listen for unnatural pauses, hesitation, and repetition.', condition: 'Pass 2: Fluency', why: 'Reveals where idea-search friction or vocabulary shortages caused speech breakdowns.' },
          { action: 'Pass 3 (Grammar & Vocabulary): Transcribe 60 seconds; check tenses, articles, and word choice.', condition: 'Pass 3: Language', why: 'Converts fleeting spoken sounds into visible text for objective grammatical audit.' },
          { action: 'Pass 4 (Phonology & Clarity): Listen with eyes closed; audit sounds, stress, and pace.', condition: 'Pass 4: Audio', why: 'Evaluates pure acoustic intelligibility and identifies muddled consonant clusters.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Compulsive Restarting versus Clean Continuity',
        weak: {
          text: 'Candidate says: "I went to... I mean, I go to... no, I went to the shopping mall... the big shopping mall... and I buy... bought some new shoes."',
          whyItFails: 'Constantly rewinds and interrupts their own speech to correct minor verb tenses, destroying fluency marks.',
        },
        controlled: {
          text: 'Candidate says: "Last Saturday I visited the new shopping district downtown, where I bought a pair of running shoes."',
          whyItWorks: 'Maintains steady forward momentum, speaking in complete, connected thought groups.',
        },
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Smartphone Recording Routine',
        body: 'Always record practice speaking tasks using the voice recorder on your smartphone. Listen to the recording 20 minutes later. You will notice pronunciation slips and hesitation patterns that you were completely unaware of while speaking.',
      },
      {
        type: 'selfCheck',
        title: 'Self-Correction and Audio Review Checklist',
        items: [
          'I correct slips only when they affect meaning and can be repaired instantly.',
          'I avoid restarting sentences repeatedly to fix minor article slips.',
          'I record my practice responses and audit them across all four passes.',
          'I transcribe short excerpts to identify recurring grammatical patterns.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-audio-review',
        label: 'Record a Part 2 talk on your phone, transcribe the first 60 seconds, and log two language improvements.',
      },
    ],
  },

  // 39. s-models-shadowing-ai-myths (§9.22, §9.23, §9.24)
  {
    id: 's-models-shadowing-ai-myths',
    area: 'speaking',
    track: 'shared',
    partId: 's-part-5-4',
    partTitle: 'Part 5.4 · Diagnosis, Training & Repertoire',
    title: 'Active shadowing, AI feedback, and Speaking myths',
    minutes: 8,
    sourceSections: ['9.22', '9.23', '9.24'],
    needs: ['s-self-correction-and-review'],
    blocks: [
      {
        type: 'lead',
        summary: 'Active shadowing trains rhythm and connected speech when used on short, well-understood passages. Understanding the capabilities and limitations of AI speech tools preserves realistic expectations, while debunking persistent examiner score myths protects exam confidence.',
        whyItMatters: 'Relying uncritically on AI band score predictions creates false confidence or needless despair. Believing that examiner interruptions indicate a failing performance causes candidates to lose composure.',
        whatYouWillDo: 'Execute the active shadowing protocol, leverage AI speech tools within safe boundaries, and debunk six major Speaking score myths.',
      },
      {
        type: 'steps',
        title: 'The 4-Step Active Shadowing Protocol',
        items: [
          { action: 'Select a 30-to-45-second audio model spoken by an articulate speaker.', condition: 'Step 1: Selection', why: 'Keeps the phonological target manageable without cognitive overload.' },
          { action: 'Read and understand the transcript thoroughly before attempting speech.', condition: 'Step 2: Comprehension', why: 'Prevents parrot-like repetition without understanding the underlying meaning.' },
          { action: 'Speak simultaneously along with the audio, matching rhythm and pauses.', condition: 'Step 3: Shadowing', why: 'Trains physical speech organs to produce natural chunking and intonation contours.' },
          { action: 'Turn off the audio model and answer a fresh, related prompt spontaneously.', condition: 'Step 4: Transfer', why: 'Ensures that shadowing develops authentic speaking competence rather than mere mimicry.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Limits of AI Speech Scoring',
        body: 'Speech recognition software and AI chatbots are useful for generating practice prompts and checking written transcripts. However, current AI tools cannot accurately evaluate IELTS pronunciation or interactive discourse coherence. Do not treat AI band predictions as official results.',
      },
      {
        type: 'mythBuster',
        title: 'Speaking Myths versus Official Realities',
        items: [
          {
            claim: 'If the examiner interrupts you, you are doing poorly.',
            verdict: 'Myth',
            reality: 'Examiners operate on strict timing schedules. They interrupt candidates to ensure all test components are covered within 14 minutes. Interruptions are completely normal.',
          },
          {
            claim: 'You must speak with a British or American accent to get Band 8.',
            verdict: 'Myth',
            reality: 'IELTS is an international English test. Clear pronunciation in your own accent achieves Band 8 and 9 provided speech is effortlessly intelligible.',
          },
          {
            claim: 'You must use complex idioms in every answer.',
            verdict: 'Myth',
            reality: 'Forced idioms like "once in a blue moon" sound comical. Natural collocations and topic-specific vocabulary satisfy the Lexical Resource criterion.',
          },
          {
            claim: 'Smiling, dressing formally, and making eye contact increases your score.',
            verdict: 'Myth',
            reality: 'Examiners grade only language performance against the four published criteria. Physical appearance, posture, and facial expressions carry zero marks.',
          },
          {
            claim: 'Fluency represents 75 percent of the total Speaking band.',
            verdict: 'Myth',
            reality: 'All four criteria (Fluency, Lexicon, Grammar, Pronunciation) carry an equal 25 percent weight. Speaking fast with broken grammar results in a low band.',
          },
          {
            claim: 'You can memorize entire model answers before test day.',
            verdict: 'Myth',
            reality: 'Examiners are trained to detect rehearsed speeches instantly. When memorized text is identified, examiners change the topic immediately or penalize Task Response.',
          },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Speaking Preparation Final Quality Checklist',
        items: [
          'I use shadowing to train connected speech and thought-group chunking.',
          'I treat AI as a practice prompt tool rather than an official scoring authority.',
          'I remain calm if the examiner interrupts me during the interview.',
          'I focus my preparation on the four official criteria rather than exam myths.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-s-final-sprint',
        label: 'Conduct a complete 14-minute simulated interview, recording all three parts without pausing.',
      },
    ],
  },
]
