/**
 * Artico IELTS Study Course · Module 3: Reading (14 Units)
 *
 * Source coverage:
 *   - Part 3.1: §4.1, §4.2, §4.3 (2 units in Part 3.1: r-task-and-five-operations, r-passage-map)
 *   - Part 3.2: §4.4, §4.5, §4.6, §4.7, §4.8, §4.9, §4.10 (6 units in Part 3.2:
 *       r-full-claim-anatomy, r-true-false-not-given, r-yes-no-not-given,
 *       r-matching-headings, r-matching-information, r-matching-features-and-endings)
 *   - Part 3.3: §4.11, §4.12, §4.13, §4.14, §4.15, §4.16, §4.17, §4.18, §4.19, §4.20, §4.21, §4.22 (5 units in Part 3.3:
 *       r-sentence-summary-completion, r-tables-flowcharts-diagrams,
 *       r-short-answers-multiple-choice, r-order-and-unfamiliar-words, r-pacing-diagnosis-speed)
 *   - Part 3.4: §4.1 [GT], §1.6 [GT] (1 unit in Part 3.4: r-gt-reading-comparison)
 * Total: 14 units
 */

export const readingUnits = [
  // 1. r-task-and-five-operations (§4.1, §4.2)
  {
    id: 'r-task-and-five-operations',
    area: 'reading',
    track: 'academic',
    partId: 'r-part-3-1',
    partTitle: 'Part 3.1 · Reading Architecture & Core Operations',
    title: 'How Academic Reading works and the five operations',
    minutes: 7,
    sourceSections: ['4.1', '4.2'],
    needs: ['ov-format-and-timing'],
    blocks: [
      {
        type: 'lead',
        summary: 'Academic Reading evaluates your ability to understand complex informational texts under a strict 60-minute limit. Five distinct reading operations replace one uniform reading speed.',
        whyItMatters: 'Reading an entire academic passage slowly word by word causes candidates to run out of time. Skimming alone causes missed qualifications and false conclusions.',
        whatYouWillDo: 'Analyze test architecture, study the 5-operation cycle, examine the five operations SVG diagram, and cross-reference General Training Reading differences.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Zero Separate Transfer Time',
        body: 'Academic Reading contains 3 sections and 40 questions in exactly 60 minutes. This total time includes entering all answers on your screen or paper sheet. There is zero extra transfer time at the end.',
        sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
        sourceLabel: 'Official IELTS Academic Reading Format',
      },
      {
        type: 'section',
        id: 'academic-text-profiles',
        title: 'Academic Reading Text Characteristics and Discipline Scope',
        bridge: 'Texts are drawn from authentic academic and professional publications.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Passages in Academic Reading are taken from books, journals, magazines, and newspapers written for non-specialist educated readers. Topics range across descriptive science, historical analysis, biography, environmental theory, and technology.',
          'You do not need prior specialist knowledge in the academic discipline. All questions can be resolved using information explicitly presented within the passage text and standard English inference.',
        ],
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-reading-5ops',
        title: 'The Five Reading Operations',
        caption: 'Hierarchical workflow showing progression from Decode Question to Skim Structure, Scan Anchor, Read Closely, and Decide from Evidence.',
        alt: 'Flowchart diagram illustrating the five reading operations: Decode, Skim, Scan, Read Closely, and Decide.',
      },
      {
        type: 'steps',
        title: 'The Five Standard Reading Operations',
        items: [
          { action: 'Decode the question stem and required response form.', condition: 'Step 1 of 5', why: 'Clarifies what entity or relationship must be proven from text evidence.' },
          { action: 'Skim the passage for macro-structure and paragraph purpose.', condition: 'Step 2 of 5', why: 'Builds a mental map of where topics and arguments reside in the text.' },
          { action: 'Scan for specific locational anchors like names and dates.', condition: 'Step 3 of 5', why: 'Takes you directly to the relevant sentences without rereading entire pages.' },
          { action: 'Read closely around the identified evidence window.', condition: 'Step 4 of 5', why: 'Parses qualifiers, negative particles, conditions, and causal linkages.' },
          { action: 'Decide the answer by strictly matching proposition to question.', condition: 'Step 5 of 5', why: 'Ensures that every part of the question claim is verified by the passage.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Locating versus Deciding',
        body: 'Skimming and scanning only locate information. They do not decide the answer. Close reading decides the answer when meaning depends on subtle qualifications or negative markers.',
      },
      {
        type: 'selfCheck',
        title: 'Reading Operations Verification',
        items: [
          'I understand that 60 minutes must include all answer entry.',
          'I know that skimming and scanning locate text but do not decide answers.',
          'I apply close reading to the sentences surrounding an anchor keyword.',
          'I recognize that Academic Reading uses longer analytical texts than General Training.',
        ],
      },
    ],
  },

  // 2. r-passage-map (§4.3)
  {
    id: 'r-passage-map',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-1',
    partTitle: 'Part 3.1 · Reading Architecture & Core Operations',
    title: 'Build a passage map by paragraph function',
    minutes: 6,
    sourceSections: ['4.3'],
    needs: ['r-task-and-five-operations'],
    blocks: [
      {
        type: 'lead',
        summary: 'A passage map records what each paragraph does, not just what it mentions. Mapping paragraph functions allows you to locate answers in seconds without rereading passages.',
        whyItMatters: 'Two consecutive paragraphs may discuss the same topic word while performing opposite logical functions. Mapping prevents searching in the wrong paragraph.',
        whatYouWillDo: 'Distinguish topic from function, learn seven standard functional labels, and study an annotated specimen showing 4-word margin annotations.',
      },
      {
        type: 'section',
        id: 'topic-vs-function',
        title: 'Topic versus Function',
        bridge: 'Every academic paragraph possesses both a subject topic and an argumentative job.',
      },
      {
        type: 'prose',
        paragraphs: [
          'A paragraph topic is the subject noun discussed, such as "subsurface aquifers" or "medieval agricultural mills". A paragraph function is the job the paragraph performs in the author argument.',
          'Two paragraphs can share the same topic word while serving opposite functions. For instance, Paragraph B may describe the initial success of a method, while Paragraph C analyzes its economic failure.',
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Standard Functional Paragraph Labels',
        headers: ['Functional Label', 'Paragraph Purpose', 'Typical Lexical Signals'],
        rows: [
          ['Introduces the problem', 'Defines an unsolved challenge or societal puzzle.', '"Historically", "Despite early efforts", "An enduring paradox".'],
          ['Describes old method', 'Outlines previous scientific techniques or conventional beliefs.', '"Initially", "The traditional approach", "Early researchers assumed".'],
          ['Explains the experiment', 'Details research methodology, test apparatus, or sample cohorts.', '"To test this hypothesis", "Subjects were divided", "Measurements recorded".'],
          ['Gives a counterargument', 'Introduces contrary perspectives or conflicting findings.', '"Conversely", "Critics have questioned", "Other scholars contend".'],
          ['Compares explanations', 'Weighs competing models side by side.', '"While Model A emphasizes", "In contrast", "A parallel theory argues".'],
          ['Reports the result', 'Presents primary experimental data or statistical outcomes.', '"The results revealed", "Statistical analysis demonstrated", "Findings confirm".'],
          ['Describes a limitation', 'Identifies boundaries, flaws, or future research requirements.', '"These findings apply only to", "A major caveat", "Further research needed".'],
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'passage',
        title: 'Passage Mapping Specimen with Functional Margin Labels',
        provenance: 'Original instructional specimen authored for Artico IELTS Study.',
        segments: [
          { id: '1', label: 'Problem Introduction', text: 'Paragraph A: For decades, municipal planners struggled with urban water drainage in coastal lowlands.', note: 'Margin label: "Introduces drainage problem"' },
          { id: '2', label: 'Conventional Method', text: 'Paragraph B: The conventional solution involved constructing concrete culverts to divert stormwater directly into estuaries.', note: 'Margin label: "Describes old method"' },
          { id: '3', label: 'Ecological Limitation', text: 'Paragraph C: However, these rigid culverts prevented natural sediment filtration and destroyed estuarine oyster habitats.', note: 'Margin label: "Explains ecological limitation"' },
          { id: '4', label: 'New Trial', text: 'Paragraph D: In 2018, engineers evaluated permeable pavement swales across four trial districts.', note: 'Margin label: "Evaluates new trial"' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Four-Word Maximum Margin Labels',
        body: 'Do not write long narrative summaries while the exam clock runs. Record three to four words per paragraph in the margin or scratchpad. Brief functional labels allow you to navigate straight to the correct paragraph.',
      },
      {
        type: 'selfCheck',
        title: 'Passage Mapping Checklist',
        items: [
          'I separate the topic noun of a paragraph from its rhetorical function.',
          'I recognize that two paragraphs sharing keywords can perform opposite jobs.',
          'I keep margin notes strictly concise to preserve examination time.',
          'I use paragraph functional maps to accelerate heading and information matching.',
        ],
      },
    ],
  },

  // 3. r-full-claim-anatomy (§4.4)
  {
    id: 'r-full-claim-anatomy',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'Identify all six parts of a claim',
    minutes: 7,
    sourceSections: ['4.4'],
    needs: ['r-passage-map'],
    blocks: [
      {
        type: 'lead',
        summary: 'Statements in True / False / Not Given and Yes / No / Not Given are multi-part propositions. Identifying all six anatomical parts prevents falling into scope and qualification traps.',
        whyItMatters: 'A statement may match the passage in topic, time, and action, yet fail on a single word of strength such as "all" versus "some". Ignoring claim anatomy leads directly to false answers.',
        whatYouWillDo: 'Study the claim anatomy SVG diagram, analyze a worked breakdown showing three unsupported leaps, and verify claim boundaries with a diagnostic check.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-claim-anatomy',
        title: 'The Six Anatomical Parts of a Claim',
        caption: 'Deconstruction of an academic claim into Agent (Who/What), Condition (Action/State), Temporal Anchor (Time), Scope (Place/Group), Modality (Strength), and Logical Relationship.',
        alt: 'Diagram illustrating the six parts of a claim: Who or What, Action or Condition, Time, Place or Group, Strength, and Relationship.',
      },
      {
        type: 'section',
        id: 'worked-claim-breakdown',
        title: 'Worked Breakdown: Three Unsupported Leaps',
        bridge: 'Examine this worked example from the source reference.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Consider this original text from an academic passage: "Some adults used the service after its price fell."',
          'Now compare that evidence with three common distorted candidate claims. Claim A asserts that all adults used the service. Claim B asserts that the price reduction caused adults to adopt the service. Claim C asserts that these adults had never used the service before.',
          'Notice that none of these three claims are supported by the passage. Claim A alters the strength from "some" to "all". Claim B invents a causal relationship where only chronological sequence was stated. Claim C asserts historical absence without evidence.',
        ],
      },
      {
        type: 'diagnosticCheck',
        title: 'Diagnostic Check: Claim Anatomy Verification',
        prompt: 'Passage: Trials showed timber multi-storey buildings withstood sub-zero temperatures. Statement: Timber buildings are the most reliable method for cold climates. What is the status?',
        options: [
          { label: 'True', correct: false, rationale: 'The passage only confirms that timber buildings could withstand sub-zero temperatures, not that they are the most reliable method.' },
          { label: 'False', correct: false, rationale: 'The passage does not state that timber buildings are unreliable or that another method is superior.' },
          { label: 'Not Given', correct: true, rationale: 'The passage reports that timber withstood cold temperatures in trial conditions. It makes no comparative claim regarding whether it is the "most reliable" method.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'A Shared Keyword Is Not a Shared Claim',
        body: 'An answer can be completely wrong because of one altered qualifier. A shared keyword like "sub-zero temperatures" does not make the whole claim correct. Verify every component of the proposition.',
      },
      {
        type: 'selfCheck',
        title: 'Claim Anatomy Checklist',
        items: [
          'I check the subject scope (all versus some, one group versus entire population).',
          'I check the strength modal (must versus may, always versus often).',
          'I check whether causality is explicitly stated or merely assumed from sequence.',
          'I verify that comparative superlatives (most, best) have direct textual support.',
        ],
      },
    ],
  },

  // 4. r-true-false-not-given (§4.5)
  {
    id: 'r-true-false-not-given',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'True, False, and Not Given',
    minutes: 8,
    sourceSections: ['4.5'],
    needs: ['r-full-claim-anatomy'],
    blocks: [
      {
        type: 'lead',
        summary: 'True / False / Not Given tasks evaluate factual claims against passage text. True means the text proves the claim, False means the text contradicts it, and Not Given means evidence is insufficient.',
        whyItMatters: 'Candidates frequently confuse False with Not Given. Believing that absent information is "false" or using outside world knowledge destroys candidate accuracy.',
        whatYouWillDo: 'Study the TFNG logic SVG diagram, execute a 6-step verification procedure, analyze the 1998 museum worked specimen, and avoid quota myths.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-tfng-logic',
        title: 'True, False, and Not Given Decision Matrix',
        caption: 'Logical flowchart distinguishing Direct Textual Agreement (True), Direct Factual Contradiction (False), and Missing Textual Proof (Not Given).',
        alt: 'Flowchart diagram explaining True, False, and Not Given logic with decision gates.',
      },
      {
        type: 'steps',
        title: 'The 6-Step TFNG Decision Procedure',
        items: [
          { action: 'Read the statement as a complete, unified claim.', condition: 'Step 1 of 6', why: 'Isolates the exact proposition rather than scattered keywords.' },
          { action: 'Scan for locational anchors to find the evidence window.', condition: 'Step 2 of 6', why: 'Directs your attention to the exact paragraphs containing the relevant facts.' },
          { action: 'Read before and after the identified evidence sentence.', condition: 'Step 3 of 6', why: 'Captures surrounding context, qualifying clauses, and contrasting transitions.' },
          { action: 'Isolate the specific claim element that decides the question.', condition: 'Step 4 of 6', why: 'Pins down whether the critical issue is a number, date, agent, or direction.' },
          { action: 'Evaluate support, contradiction, or insufficiency.', condition: 'Step 5 of 6', why: 'Applies the three-way logical test objectively against text evidence alone.' },
          { action: 'Enter the exact label requested (TRUE, FALSE, or NOT GIVEN).', condition: 'Step 6 of 6', why: 'Writing YES instead of TRUE on a TFNG task can forfeit credit.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'passage',
        title: 'The 1998 Museum Worked Specimen',
        provenance: 'Original instructional specimen authored for Artico IELTS Study.',
        segments: [
          { id: '1', label: 'Passage Evidence', text: 'Passage: "The museum opened in 1998. It now receives about 50,000 visitors each year."', note: 'Source evidence establishes two facts: opening year (1998) and current annual attendance (about 50,000).' },
          { id: '2', label: 'Supported (True)', text: 'Statement 1: "The museum opened before 2000." → TRUE', note: 'Supported: 1998 is chronologically before 2000.' },
          { id: '3', label: 'Contradicted (False)', text: 'Statement 2: "The museum opened in 2001." → FALSE', note: 'Contradicted: the text directly asserts opening in 1998, which is incompatible with 2001.' },
          { id: '4', label: 'Insufficient (Not Given)', text: 'Statement 3: "The museum received 50,000 visitors in its first year." → NOT GIVEN', note: 'Insufficient: the text reports 50,000 visitors now, but provides zero information about attendance in 1998.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Outside Knowledge Banned & No Label Quotas',
        body: 'Never use outside personal knowledge to answer. Rely strictly on text evidence. Do not assume every question set must contain all three labels. There is no fixed quota of True, False, or Not Given answers.',
      },
      {
        type: 'selfCheck',
        title: 'TFNG Verification Checklist',
        items: [
          'I remember that False requires an incompatible statement in the text.',
          'I treat missing information as Not Given, never as False.',
          'I evaluate comparisons by checking whether the comparison itself is proven.',
          'I write TRUE, FALSE, or NOT GIVEN without substituting YES, NO, or NOT GIVEN.',
        ],
      },
    ],
  },

  // 5. r-yes-no-not-given (§4.6)
  {
    id: 'r-yes-no-not-given',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'Yes, No, and Not Given: writer views',
    minutes: 7,
    sourceSections: ['4.6'],
    needs: ['r-true-false-not-given'],
    blocks: [
      {
        type: 'lead',
        summary: 'Yes / No / Not Given tasks evaluate whether statements match the writer personal opinions or arguments. Yes means the view agrees with the writer, No means it contradicts the writer, and Not Given means the writer position is undetermined.',
        whyItMatters: 'Academic writers frequently cite other scholars opinions only to refute them. Mistaking a quoted researcher view for the author own conclusion produces wrong answers.',
        whatYouWillDo: 'Distinguish TFNG from YNNG, track three levels of authorial attribution, analyze certainty modals, and prevent label confusion.',
      },
      {
        type: 'comparisonTable',
        caption: 'True/False/Not Given versus Yes/No/Not Given',
        headers: ['Dimension', 'True / False / Not Given (TFNG)', 'Yes / No / Not Given (YNNG)'],
        rows: [
          ['Focus of assessment', 'Objective facts, dates, quantities, and experimental data.', 'The writer personal claims, interpretations, evaluations, and stances.'],
          ['Target of agreement', 'Does the statement agree with factual reality stated in the passage?', 'Does the statement agree with the personal opinion argued by the writer?'],
          ['Handling third-party quotes', 'Reports what occurred or what was observed by researchers.', 'Must separate opinions cited by the writer from opinions held by the writer.'],
          ['Label entry requirement', 'Must write TRUE, FALSE, or NOT GIVEN.', 'Must write YES, NO, or NOT GIVEN.'],
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'passage',
        title: 'Tracking Three Levels of Authorial Attribution',
        provenance: 'Original instructional specimen authored for Artico IELTS Study.',
        segments: [
          { id: '1', label: 'Cited Third-Party View', text: '"Some critics argue that electric vehicle subsidies unfairly benefit wealthier households."', note: 'Attribution Level 1: Reports a cited third-party view ("Some critics argue"). Does not reflect the author stance.' },
          { id: '2', label: 'Author Rejection', text: '"However, this argument is unconvincing when long-term public health dividends are calculated."', note: 'Attribution Level 2: Author explicitly evaluates and rejects the cited view ("unconvincing").' },
          { id: '3', label: 'Author Conclusion', text: '"The empirical evidence suggests that clean transport infrastructure benefits all urban residents."', note: 'Attribution Level 3: Author states a qualified personal conclusion ("The empirical evidence suggests").' },
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Preserve Degrees of Certainty',
        body: 'Academic writers carefully calibrate certainty. "Could help" does not mean "will solve". "Suggests" does not mean "proves". An answer that escalates tentative academic hypotheses into absolute claims must be evaluated as No.',
      },
      {
        type: 'contrastPair',
        title: 'Attribution in Authorial Claims',
        weak: {
          text: 'Concluding that the author opposes EV subsidies because the text says "Some critics argue that electric vehicle subsidies unfairly benefit wealthier households".',
          whyItFails: 'Fails to track attribution and mistakes a cited counterargument for the author own stance.',
        },
        controlled: {
          text: 'Reading through to "However, this argument is unconvincing" to identify the author true position.',
          whyItWorks: 'Tracks how the author evaluates the cited argument and determines the authentic viewpoint.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Yes/No/Not Given Verification',
        items: [
          'I distinguish quoted opinions from the writer own evaluated position.',
          'I check degrees of certainty between tentative modals and definitive claims.',
          'I write YES, NO, or NOT GIVEN as requested by task instructions.',
          'I confirm that the writer actually expresses a stance before ruling out Not Given.',
        ],
      },
    ],
  },

  // 6. r-matching-headings (§4.7)
  {
    id: 'r-matching-headings',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'Matching headings: gist and paragraph job',
    minutes: 8,
    sourceSections: ['4.7'],
    needs: ['r-passage-map'],
    blocks: [
      {
        type: 'lead',
        summary: 'Matching headings requires connecting a Roman numeral heading to the central idea or primary purpose of a paragraph. A valid heading represents the entire paragraph rather than a single interesting detail.',
        whyItMatters: 'Test writers design attractive distractor headings that repeat prominent keywords or name specific examples from the paragraph. Choosing a heading based on keyword matching leads to frequent errors.',
        whatYouWillDo: 'Execute a 6-step gist-first procedure, recognize first/last sentence pivot traps, analyze shared rare-word traps, and handle unused options.',
      },
      {
        type: 'steps',
        title: 'The 6-Step Gist-First Heading Procedure',
        items: [
          { action: 'Read the target paragraph completely before consulting the heading list.', condition: 'Step 1 of 6', why: 'Prevents distractor headings from biasing your interpretation of the text.' },
          { action: 'Summarize the paragraph primary job in a few plain words.', condition: 'Step 2 of 6', why: 'Formulates an independent understanding of the paragraph central idea.' },
          { action: 'Distinguish the overarching argument from supporting examples.', condition: 'Step 3 of 6', why: 'Headings represent what examples jointly prove, not the examples themselves.' },
          { action: 'Compare your independent summary against the list of headings.', condition: 'Step 4 of 6', why: 'Quickly identifies the heading that shares the same functional scope.' },
          { action: 'Eliminate headings that are too narrow, too broad, or misplaced.', condition: 'Step 5 of 6', why: 'Weeds out distractors based on isolated sentences or adjacent paragraphs.' },
          { action: 'Verify the closest heading against the whole paragraph.', condition: 'Step 6 of 6', why: 'Confirms that every section of the paragraph fits under the selected heading.' },
        ],
      },
      {
        type: 'section',
        id: 'heading-traps',
        title: 'Two Critical Heading Traps',
        bridge: 'Avoid these recurring distractor mechanisms in Academic Reading.',
      },
      {
        type: 'prose',
        paragraphs: [
          'The first or last sentence of a paragraph can provide helpful clues, but neither position always contains the main idea. Academic writers often begin a paragraph with a conventional view or previous finding, only to pivot mid-paragraph with words like "However" or "In contrast".',
          'Similarly, beware of headings that share an unusual technical word with the paragraph. If three headings contain the word "desalination", compare their rhetorical functions. "Why early desalination failed" differs completely from "How modern membranes were developed".',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Unused Options and No Heading Reuse',
        body: 'There are always more heading options than paragraphs. Several headings will remain completely unused. Never use the same Roman numeral heading twice. If an example heading is pre-completed in the instructions, mark it off immediately.',
      },
      {
        type: 'contrastPair',
        title: 'Selecting a Heading: Example versus Main Job',
        weak: {
          text: 'Selecting "The failure of the 1994 Thames flood barriers" because the paragraph discusses the 1994 Thames barrier event in sentences 3 and 4.',
          whyItFails: 'Mistakes an illustrative historical example for the paragraph central thesis.',
        },
        controlled: {
          text: 'Selecting "Limitations of static flood defence infrastructure" which encompasses the Thames event, the Rhine data, and the concluding engineering summary.',
          whyItWorks: 'Captures what all paragraph examples jointly demonstrate under one unified heading.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Matching Headings Checklist',
        items: [
          'I read the paragraph and form my own summary before reading the heading list.',
          'I avoid choosing headings based solely on the first sentence when a pivot occurs.',
          'I check whether a heading describes a single detail rather than the whole paragraph.',
          'I verify that I do not reuse any Roman numeral heading across paragraphs.',
        ],
      },
    ],
  },

  // 7. r-matching-information (§4.8)
  {
    id: 'r-matching-information',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'Matching information to paragraphs',
    minutes: 7,
    sourceSections: ['4.8'],
    needs: ['r-matching-headings'],
    blocks: [
      {
        type: 'lead',
        summary: 'Matching information asks where a specific detail, reason, or comparison appears across a lettered text. Unlike matching headings, the target is often a minor detail inside a paragraph whose main idea is broader.',
        whyItMatters: 'Matching information does not follow passage order. Searching blindly for every question can consume half your exam hour on a single question set.',
        whatYouWillDo: 'Distinguish matching headings from matching information, analyze six common detail types, apply paragraph reuse rules, and test optional sequencing strategies.',
      },
      {
        type: 'comparisonTable',
        caption: 'Matching Headings versus Matching Information',
        headers: ['Dimension', 'Matching Headings', 'Matching Information'],
        rows: [
          ['Target of task', 'The central theme or primary purpose of the entire paragraph.', 'A specific detail, fact, reason, or example located inside a paragraph.'],
          ['Scope in text', 'Must cover the whole paragraph from opening to conclusion.', 'Can be a single sentence or clause within a broader discussion.'],
          ['Passage order', 'Headings follow paragraph sequence (Paragraph A, B, C...).', 'Information questions do NOT follow passage order.'],
          ['Option reuse', 'Headings are never reused; some headings remain unused.', 'Paragraph letters can be reused IF instructions state "NB You may use any letter more than once".'],
        ],
      },
      {
        type: 'section',
        id: 'six-detail-types',
        title: 'Six Common Information Detail Types',
        bridge: 'Look for the grammatical and functional markers of these six detail categories.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Questions in this family commonly start with phrases such as "a reference to", "an explanation of", or "a comparison between".',
          'Common targets include a reason for a failure, an animal behavior example, or a technical mechanism. Tasks also ask for historical comparisons, references to problems, or unexpected experimental results.',
        ],
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Optional Sequencing Strategy',
        body: 'Many experienced candidates leave matching information tasks until after they have completed the other question sets for that passage. Completing summary or True/False questions first familiarizes you with the text, making information matching much faster.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Paragraph Reuse Rule',
        body: 'Check the instructions carefully. Only reuse a paragraph letter if the prompt contains the explicit instruction: "NB You may use any letter more than once". Without that notice, each paragraph is matched at most once.',
      },
      {
        type: 'selfCheck',
        title: 'Matching Information Checklist',
        items: [
          'I recognize that matching information items do not follow passage order.',
          'I look for specific detail types such as reasons, comparisons, or examples.',
          'I check the prompt for the "NB You may use any letter more than once" instruction.',
          'I consider completing detail matching after mapping the passage through other tasks.',
        ],
      },
    ],
  },

  // 8. r-matching-features-and-endings (§4.9, §4.10)
  {
    id: 'r-matching-features-and-endings',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-2',
    partTitle: 'Part 3.2 · Truth, Views & Matching',
    title: 'Matching features, names, and sentence endings',
    minutes: 7,
    sourceSections: ['4.9', '4.10'],
    needs: ['r-matching-information'],
    blocks: [
      {
        type: 'lead',
        summary: 'Feature matching connects statements to researchers, historical eras, or geographic regions. Sentence ending matching requires completing sentence stems so they satisfy both grammatical syntax and passage truth.',
        whyItMatters: 'Researchers often appear multiple times across a text, and their final stance may reverse an early quote. For sentence endings, options may be grammatically perfect while conveying an unproven claim.',
        whatYouWillDo: 'Execute a 6-step feature matching routine, apply a 5-step sentence endings sequence, and analyze a worked contrast pair.',
      },
      {
        type: 'steps',
        title: '6-Step Feature and Name Matching Routine',
        items: [
          { action: 'Scan the passage and highlight all appearances of each name or feature.', condition: 'Step 1 of 6', why: 'Locates all potential evidence windows before reading question claims.' },
          { action: 'Start with names that appear in only one single paragraph.', condition: 'Step 2 of 6', why: 'Restricts the search range to a single paragraph, securing fast early answers.' },
          { action: 'Read the full text attributed to each person across all appearances.', condition: 'Step 3 of 6', why: 'A researcher early comment may be modified by their later conclusions.' },
          { action: 'Track pronouns and reporting verbs across sentence boundaries.', condition: 'Step 4 of 6', why: 'Attribution often extends across several sentences using "She added" or "They argued".' },
          { action: 'Distinguish the researcher who did a study from a critic who evaluated it.', condition: 'Step 5 of 6', why: 'Prevents confusing experimental findings with commentary made by external critics.' },
          { action: 'Verify option reuse rules in the task instructions.', condition: 'Step 6 of 6', why: 'Confirms whether one researcher can be matched to multiple statement items.' },
        ],
      },
      {
        type: 'steps',
        title: '5-Step Sentence Endings Execution Procedure',
        items: [
          { action: 'Read the sentence stem and identify its subject and main verb.', condition: 'Step 1 of 5', why: 'Establishes the core proposition that requires completion.' },
          { action: 'Predict the grammatical form and semantic role of the missing ending.', condition: 'Step 2 of 5', why: 'Narrows the option list by eliminating grammatically incompatible endings.' },
          { action: 'Locate the evidence window in the passage using stem keywords.', condition: 'Step 3 of 5', why: 'Sentence endings questions almost always follow passage order.' },
          { action: 'Compare grammatically viable endings against the text evidence.', condition: 'Step 4 of 5', why: 'Determines which grammatically correct ending is actually supported by the passage.' },
          { action: 'Read the completed composite sentence to verify overall coherence.', condition: 'Step 5 of 5', why: 'Ensures the combined sentence is grammatically natural and factually true.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Grammatical Fit versus Factual Truth in Sentence Endings',
        weak: {
          text: 'Stem: "Early solar cells had limited industrial use..." Selected ending: "...because modern silicon wafers were manufactured in large volumes."',
          whyItFails: 'Grammatically sound, but logically absurd and contradicted by passage chronology: modern silicon wafers did not exist in the early solar era.',
        },
        controlled: {
          text: 'Stem: "Early solar cells had limited industrial use..." Selected ending: "...because energy conversion efficiencies rarely exceeded two percent."',
          whyItWorks: 'Satisfies grammatical syntax and matches the exact causal explanation documented in the passage.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Grammar Eliminates, but Text Proves',
        body: 'Grammatical fit eliminates impossible endings, but it cannot prove the correct answer. Test writers design multiple endings that fit the stem grammatically. Always verify the factual claim against passage text.',
      },
      {
        type: 'selfCheck',
        title: 'Features and Endings Checklist',
        items: [
          'I scan and locate all appearances of a name before matching statements.',
          'I separate a study author from an external researcher who critiqued the findings.',
          'I use sentence ending grammar to eliminate options, but text evidence to decide.',
          'I read back the completed sentence to confirm logic, causality, and syntax.',
        ],
      },
    ],
  },

  // 9. r-sentence-summary-completion (§4.11, §4.12)
  {
    id: 'r-sentence-summary-completion',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-3',
    partTitle: 'Part 3.3 · Completion, Tables & Diagrams',
    title: 'Sentence, summary, and note completion',
    minutes: 7,
    sourceSections: ['4.11', '4.12'],
    needs: ['r-matching-features-and-endings'],
    blocks: [
      {
        type: 'lead',
        summary: 'Completion tasks require filling gaps in continuous text using either exact words from the passage or items from a supplied box of options. Success depends on understanding which completion mode applies.',
        whyItMatters: 'Using your own synonym when the task mandates words from the passage results in zero marks. In summary completion, misunderstanding the mode leads to invalid responses.',
        whatYouWillDo: 'Contrast the two summary completion modes, apply grammar prediction rules, audit hyphenation constraints, and verify completed summaries for coherence.',
      },
      {
        type: 'comparisonTable',
        caption: 'The Two Summary Completion Modes in IELTS Reading',
        headers: ['Dimension', 'Mode A: Words from the Passage', 'Mode B: Supplied Option Bank'],
        rows: [
          ['Instruction wording', '"Choose NO MORE THAN TWO WORDS from the passage for each answer."', '"Choose the correct letter, A–G, from the list of options below."'],
          ['Word selection rule', 'Must copy the EXACT words found in the passage text.', 'Must select a letter representing a paraphrased synonym from the box.'],
          ['Synonym substitution', 'Strictly forbidden. Writing a synonym results in automatic zero credit.', 'Mandatory. Words in the box are almost always synonyms of passage words.'],
          ['Grammatical form', 'Must preserve the exact inflectional form from the text.', 'Selected option must integrate smoothly into the summary syntax.'],
          ['Answer entry', 'Write the actual English words on your answer sheet.', 'Write only the single capital letter (A, B, C...) on your answer sheet.'],
        ],
      },
      {
        type: 'steps',
        title: 'Step-by-Step Summary Completion Protocol',
        items: [
          { action: 'Identify which section of the passage the summary covers.', condition: 'Step 1 of 5', why: 'Summaries usually draw on a clustered range of 2 to 4 consecutive paragraphs.' }
          ,{ action: 'Read the complete summary quickly for overall logical flow.', condition: 'Step 2 of 5', why: 'Builds context and clarifies the sequence of arguments across all blanks.' },
          { action: 'Predict the grammatical class and meaning for each gap.', condition: 'Step 3 of 5', why: 'Articles, prepositions, and adjectives establish strict slot constraints.' },
          { action: 'Locate the corresponding sentence in the passage and extract the answer.', condition: 'Step 4 of 5', why: 'Pins down the exact textual evidence matching the summarized proposition.' },
          { action: 'Read the completed summary to verify syntax, spelling, and sense.', condition: 'Step 5 of 5', why: 'Ensures that every inserted word creates natural, correct English sentences.' },
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Exact Words and Hyphen Rules',
        body: 'When instructions specify words from the passage, copy the exact form without modification. Official guidelines treat hyphenated words (such as "long-term") as single words. Do not insert artificial hyphens to bypass word limits.',
      },
      {
        type: 'contrastPair',
        title: 'Preserving Exact Words in Mode A Completion',
        weak: {
          text: 'Passage says: "The survey documented considerable financial hardship." Instruction: ONE WORD ONLY FROM PASSAGE. Candidate writes: "poverty".',
          whyItFails: 'Substitutes an unapproved synonym when the instruction demands exact words from the text.',
        },
        controlled: {
          text: 'Candidate writes: "hardship".',
          whyItWorks: 'Copies the exact noun from the passage text within the one-word limit.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Sentence and Summary Completion Checklist',
        items: [
          'I identify whether the task uses Mode A (passage words) or Mode B (option box).',
          'I never substitute my own synonyms when passage words are required.',
          'I check whether articles or prepositions are already printed outside the gap.',
          'I read back the completed sentence to confirm grammatical agreement.',
        ],
      },
    ],
  },

  // 10. r-tables-flowcharts-diagrams (§4.13, §4.14)
  {
    id: 'r-tables-flowcharts-diagrams',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-3',
    partTitle: 'Part 3.3 · Completion, Tables & Diagrams',
    title: 'Tables, flow charts, and diagram labels',
    minutes: 7,
    sourceSections: ['4.13', '4.14'],
    needs: ['r-sentence-summary-completion'],
    blocks: [
      {
        type: 'lead',
        summary: 'Tables, flow charts, and technical diagram labels translate passage information into structured visual formats. Successful completion requires understanding row/column intersections, procedural sequence, and anatomical endpoints.',
        whyItMatters: 'Candidates often name an entire machine when an arrow points to a single component. Placing a valid fact into the wrong table row also loses marks.',
        whatYouWillDo: 'Analyze table headers and flow-chart dependency arrows, execute a 5-point diagram inspection routine, and prevent whole-object naming errors.',
      },
      {
        type: 'section',
        id: 'table-flowchart-logic',
        title: 'Table Coordinates and Sequential Dependencies',
        bridge: 'Visual layouts define logical relationships before you consult the passage.',
      },
      {
        type: 'prose',
        paragraphs: [
          'A table organizes data through column categories and row entries. Before searching the passage, read the headers to understand what each row compares. An entry must fit both its horizontal row condition and its vertical column category.',
          'In a flow chart, arrows depict chronological or procedural sequence. A gap may represent an input, a mechanical action, a chemical byproduct, or a conditional outcome. Remember that an event occurring earlier in sequence is not automatically a cause.',
        ],
      },
      {
        type: 'steps',
        title: '5-Point Diagram Label Inspection Routine',
        items: [
          { action: 'Identify the overall object, device, or natural mechanism depicted.', condition: 'Step 1 of 5', why: 'Establishes the subject domain and locates the relevant passage section.' },
          { action: 'Inspect label leader lines and arrow endpoints with precision.', condition: 'Step 2 of 5', why: 'Determines whether the arrow points to an external casing, an internal part, or a direction of flow.' },
          { action: 'Examine existing pre-printed labels for vocabulary clues.', condition: 'Step 3 of 5', why: 'Pre-printed labels show how the passage describes different physical components.' },
          { action: 'Locate the descriptive paragraph in the passage.', condition: 'Step 4 of 5', why: 'Passages usually describe diagrams in spatial or operational sequence.' },
          { action: 'Extract the exact component name within the stated word limit.', condition: 'Step 5 of 5', why: 'Ensures the label names the specific part indicated by the pointer line.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'prompt',
        title: 'Diagram Pointer Line Precision Specimen',
        provenance: 'Original instructional specimen authored for Artico IELTS Study.',
        segments: [
          { id: '1', label: 'Apparatus Context', text: 'Diagram: Cross-section of a wave-power generator.', note: 'Whole apparatus: wave-power generator.' },
          { id: '2', label: 'Component Pointer 1', text: 'Pointer arrow 1 points directly to the rotating curved blades inside the chamber.', note: 'Correct label: "turbine" or "blades". Trap: writing "generator" labels the whole apparatus rather than the component.' },
          { id: '3', label: 'Component Pointer 2', text: 'Pointer arrow 2 points to the oscillating water column below the chamber.', note: 'Correct label: "water column". Pre-printed label below confirms fluid dynamics terminology.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'No External Specialist Knowledge Required',
        body: 'You never need specialist technical or engineering knowledge to label a diagram. Every label is derived directly from passage descriptions and task instructions. Rely strictly on text evidence.',
      },
      {
        type: 'selfCheck',
        title: 'Visual Completion Checklist',
        items: [
          'I inspect row and column headers to verify table coordinates.',
          'I follow sequential flow chart arrows to maintain chronological order.',
          'I verify that diagram labels name the specific component indicated by arrow lines.',
          'I copy exact words from the passage without adding external technical jargon.',
        ],
      },
    ],
  },

  // 11. r-short-answers-multiple-choice (§4.15, §4.16)
  {
    id: 'r-short-answers-multiple-choice',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-3',
    partTitle: 'Part 3.3 · Completion, Tables & Diagrams',
    title: 'Short-answers and multiple choice',
    minutes: 7,
    sourceSections: ['4.15', '4.16'],
    needs: ['r-tables-flowcharts-diagrams'],
    blocks: [
      {
        type: 'lead',
        summary: 'Short-answer questions require extracting specific informational units within strict word limits. Multiple-choice questions require selecting the option supported by full passage evidence while rejecting six recurring distractor types.',
        whyItMatters: 'Writing unnecessary conversational padding invalidates short answers. In multiple choice, eliminating options without evidence causes candidates to guess based on superficial familiarity.',
        whatYouWillDo: 'Map five question-word interrogatives, execute a 6-step multiple-choice routine, analyze the 6-item reading distractor table, and verify multi-selection tasks.',
      },
      {
        type: 'comparisonTable',
        caption: 'The Five Short-Answer Interrogatives and Target Data',
        headers: ['Question Interrogative', 'Target Information Category', 'Example Response Constraint'],
        rows: [
          ['Who', 'Person, professional title, committee, or research group.', '"marine biologists" (not an explanation of their method).'],
          ['Where', 'Specific geographic location, building, or habitat.', '"subsurface caves" (not why they gathered there).'],
          ['When', 'Calendar year, historical era, or temporal stage.', '"nineteenth century" (not duration of study).'],
          ['What', 'Specific physical object, legal term, or phenomenon.', '"thermal insulation" (isolated noun phrase).'],
          ['How many / How much', 'Specific numeric quantity, percentage, or currency figure.', '"350 tonnes" (exact quantity without narrative wrapper).'],
        ],
      },
      {
        type: 'steps',
        title: '6-Step Reading Multiple-Choice Routine',
        items: [
          { action: 'Read the question stem and highlight restrictive scope words.', condition: 'Step 1 of 6', why: 'Words like "main reason", "in 1920", or "according to author" restrict valid answers.' },
          { action: 'Locate the relevant evidence section in the passage.', condition: 'Step 2 of 6', why: 'Multiple-choice questions follow passage order, making location predictable.' },
          { action: 'Read the evidence sentences closely before reading the options.', condition: 'Step 3 of 6', why: 'Forms an unbiased understanding of what the text actually asserts.' },
          { action: 'Compare each option against the passage evidence.', condition: 'Step 4 of 6', why: 'Systematically tests every option against the full proposition in the text.' },
          { action: 'Eliminate options based on explicit textual contradictions.', condition: 'Step 5 of 6', why: 'Removes distractors using documented reasons rather than intuition.' },
          { action: 'Select the option that directly answers the stem.', condition: 'Step 6 of 6', why: 'Confirms that the chosen option satisfies both text evidence and stem conditions.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'The Six Reading Multiple-Choice Distractor Mechanisms',
        headers: ['Distractor Mechanism', 'How It Misleads Candidates', 'How to Disqualify It'],
        rows: [
          ['True statement, wrong answer', 'States a fact from the text that does not answer the specific stem.', 'Verify that the statement answers the exact question asked.'],
          ['Half-true statement', 'Combines one accurate clause with an unsupported or false clause.', 'Check every clause in the option; all parts must be supported.'],
          ['Overstated strength', 'Escalates "often" to "always", or "some" to "all".', 'Check modality and quantifiers against passage phrasing.'],
          ['Minor reason as main reason', 'Mentions a secondary contributing factor instead of primary cause.', 'Look for author emphasis markers like "chiefly" or "primarily".'],
          ['Misattributed viewpoint', 'Attributes a cited critic argument to the study author.', 'Track author attribution and reporting verbs.'],
          ['Reversed relationship', 'Inverts cause and effect or reverses a comparative direction.', 'Verify which entity caused which and which quantity is greater.'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Multi-Selection Tasks: Check Answer Count',
        body: 'Some multiple-choice tasks instruct: "Choose TWO letters, A–E" or "Choose THREE letters, A–F". Check the instructions carefully. Enter each selected letter in its dedicated answer space. Do not write multiple letters into a single blank.',
      },
      {
        type: 'selfCheck',
        title: 'Short Answer and Multiple Choice Checklist',
        items: [
          'I answer short-answer questions with isolated data, omitting conversational wrappers.',
          'I read the evidence sentences before reading multiple-choice options.',
          'I disqualify distractors that state true facts but fail to answer the stem.',
          'I verify whether multiple-choice items require choosing one, two, or three letters.',
        ],
      },
    ],
  },

  // 12. r-order-and-unfamiliar-words (§4.17, §4.18)
  {
    id: 'r-order-and-unfamiliar-words',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-3',
    partTitle: 'Part 3.3 · Completion, Tables & Diagrams',
    title: 'Passage order and unfamiliar vocabulary',
    minutes: 7,
    sourceSections: ['4.17', '4.18'],
    needs: ['r-short-answers-multiple-choice'],
    blocks: [
      {
        type: 'lead',
        summary: 'Understanding which question families follow passage order allows you to navigate text efficiently. When unfamiliar vocabulary appears, systematic contextual tools extract necessary meaning without dictionary panic.',
        whyItMatters: 'Assuming all questions follow an uninterrupted timeline causes candidates to search in the wrong paragraphs when a new question set starts. Freezing over unknown words wastes valuable reading time.',
        whatYouWillDo: 'Compare sequential versus non-sequential question families, apply the unknown word decision tree, and master six contextual inference tools.',
      },
      {
        type: 'comparisonTable',
        caption: 'Question Families and Passage Order Characteristics',
        headers: ['Order Characteristic', 'Question Families Included', 'Search Navigation Rule'],
        rows: [
          ['Strictly sequential (follow passage order)', 'Multiple choice, True/False/Not Given, Yes/No/Not Given, Sentence completion, Short answers.', 'Answers appear in chronological order through the passage. Question 3 follows Question 2.'],
          ['Non-sequential (global search across text)', 'Matching headings, Matching information to paragraphs, Matching features/names.', 'Answers do NOT follow passage order. Search requires scanning across the entire text or map.'],
          ['Clustered / Localized sequence', 'Summary completion, Table completion, Flow-chart completion, Diagram labels.', 'Draws heavily on one compact section (1–3 paragraphs). Sequence within cluster may vary slightly.'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'New Question Set Resets the Search Range',
        body: 'Do not assume that all question sets jointly form one single uninterrupted timeline. When Question Set 1 ends at Question 5, Question Set 2 (Questions 6–10) frequently resets back to the beginning or middle of the passage. Always re-anchor.',
      },
      {
        type: 'decisionTree',
        title: 'Decision Tree: Handling Unfamiliar Vocabulary',
        question: 'You encounter an unfamiliar word in the passage. What should you do?',
        branches: [
          { condition: 'The word does NOT appear in the question stem or candidate evidence sentences.', outcome: 'Continue reading immediately without stopping.', detail: 'Most unfamiliar words in academic texts are non-essential technical descriptors. Ignoring them preserves pacing.' },
          { condition: 'The word sits inside the decisive evidence clause and affects the claim meaning.', outcome: 'Apply the six contextual inference tools.', detail: 'Use grammatical role, nearby restatements, examples, contrasts, root families, and paragraph gist to deduce meaning.' },
        ],
      },
      {
        type: 'section',
        id: 'six-inference-tools',
        title: 'Six Contextual Inference Tools',
        bridge: 'Use these six textual signals to deduce the meaning of an essential unfamiliar word.',
      },
      {
        type: 'prose',
        paragraphs: [
          'When an unknown word governs the answer, examine its grammatical part of speech first: is it a noun, an action verb, or an evaluative adjective? Next, check for immediate punctuation restatements such as parentheses, dashes, or the phrase "that is to say".',
          'Authors frequently follow a technical term with a concrete illustrative example introduced by "such as" or "for instance". You can also look for contrastive markers like "unlike" or "rather than" that define the word by its opposite. Finally, analyze familiar prefixes, suffixes, and Latin roots, or infer general polarity from paragraph gist.',
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Study Time versus Timed Exam Dictionary Rule',
        body: 'During timed exam practice, never look up unknown words until after the 60-minute test concludes. Looking up words mid-test distorts authentic pacing. During post-test review, verify essential words in a dictionary and log them in your error record.',
      },
      {
        type: 'selfCheck',
        title: 'Passage Order and Vocabulary Checklist',
        items: [
          'I know which question types follow passage order and which require global searching.',
          'I remember that starting a new question set resets my search location.',
          'I ignore unfamiliar words that do not affect the decisive answer clause.',
          'I use surrounding context, examples, and contrast markers to infer essential vocabulary.',
        ],
      },
    ],
  },

  // 13. r-pacing-diagnosis-speed (§4.19, §4.20, §4.21, §4.22)
  {
    id: 'r-pacing-diagnosis-speed',
    area: 'reading',
    track: 'shared',
    partId: 'r-part-3-3',
    partTitle: 'Part 3.3 · Completion, Tables & Diagrams',
    title: 'Manage the hour, diagnose errors, and build speed',
    minutes: 8,
    sourceSections: ['4.19', '4.20', '4.21', '4.22'],
    needs: ['r-order-and-unfamiliar-words'],
    blocks: [
      {
        type: 'lead',
        summary: 'Managing the 60-minute Reading hour requires disciplined pacing across all three passages. Speed is developed by establishing accurate operations first, followed by gradual reduction of available time.',
        whyItMatters: 'Candidates who spend 30 minutes on Passage 1 inevitably rush Passage 3, sacrificing easy marks. Increasing speed before accuracy is solid accelerates the rate of making mistakes.',
        whatYouWillDo: 'Budget the 60-minute test hour, master 5 post-test diagnostic questions, inspect the 8-row evidence-to-repair matrix, and audit all 14 official Reading pitfalls.',
      },
      {
        type: 'section',
        id: 'four-part-budget',
        title: 'Four-Part Hour Budget',
        bridge: 'Structure your 60-minute clock to ensure every question receives attention.',
      },
      {
        type: 'prose',
        paragraphs: [
          'A practical reading budget allocates 17 minutes to Passage 1, 19 minutes to Passage 2, and 20 minutes to Passage 3. This leaves 4 minutes for checking blanks.',
          'Passages increase in linguistic complexity. Allocating roughly 30 to 35 minutes across the first two sections protects sufficient time to navigate the dense arguments of Passage 3. When progress halts on a difficult item, make a provisional mark and advance. Never allow one question to consume three minutes.',
        ],
      },
      {
        type: 'steps',
        title: 'Five Post-Attempt Diagnostic Questions',
        items: [
          { action: 'What did I think the question required?', condition: 'Question 1 of 5', why: 'Identifies whether you misunderstood the question stem, word limit, or scope.' },
          { action: 'Where did I look in the passage?', condition: 'Question 2 of 5', why: 'Evaluates whether your passage mapping and anchor scanning were accurate.' },
          { action: 'Which exact words support the correct answer?', condition: 'Question 3 of 5', why: 'Locates the objective evidence in the text that validates the answer key.' },
          { action: 'Why did my selected answer fail?', condition: 'Question 4 of 5', why: 'Pins down the specific distractor mechanism or misinterpretation that misled you.' },
          { action: 'Which reading operation needs targeted repair?', condition: 'Question 5 of 5', why: 'Directs remediation toward decoding, skimming, scanning, or close reading.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'The 8-Row Reading Evidence-to-Repair Diagnostic Matrix',
        headers: ['Diagnostic Evidence from Attempt', 'Underlying Operational Weakness', 'Targeted Remedial Action'],
        rows: [
          ['Sentence could not be understood even untimed', 'Grammatical complexity or lexical deficiency', 'Study sentence clause relationships, reference markers, and core vocabulary.'],
          ['Sentence understood, but wrong label selected', 'Flawed question-type decision logic', 'Review worked specimens and decision trees for that specific family (such as True/False/Not Given).'],
          ['Correct fact identified, but exceeded word limit', 'Inattention to explicit task instructions', 'Drill strict adherence to word limits and strip conversational wrapper words.'],
          ['Searched repeatedly in the wrong paragraphs', 'Ineffective passage mapping or weak anchor selection', 'Practice 3-word functional paragraph mapping and scanning for invariant nouns.'],
          ['Found specific detail, but missed paragraph point', 'Confusing illustrative detail with central gist', 'Practice summarizing paragraph arguments before consulting heading options.'],
          ['High accuracy untimed, but ran out of time', 'Slow decoding, subvocalization, or excessive rereading', 'Implement gradual timer reduction: 90 → 80 → 70 → 60 minutes over several weeks.'],
          ['Errors concentrated heavily in one question family', 'Task-specific operational breakdown', 'Complete targeted drills on that single family using fresh Cambridge passages.'],
          ['Changed a correct answer to a wrong answer', 'Second-guessing without textual evidence', 'Establish a rule: never change an answer without explicit contradictory text proof.'],
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'The Gradual Speed Ladder',
        body: 'Build speed only after untimed accuracy exceeds 80%. A candidate who scores 32/40 in 85 minutes should practice next at 75 minutes, then 68, and finally 60 minutes. Running a fast timer on inaccurate reading reinforces flawed guessing habits.',
      },
      {
        type: 'selfCheck',
        title: 'The 14 Official Reading Pitfalls Audit',
        items: [
          'Using outside personal knowledge instead of strict passage text evidence.',
          'Treating absent or unmentioned information as a contradiction (False).',
          'Ignoring scope qualifiers such as "some", "only", "primarily", or "before".',
          'Selecting a paragraph heading based on an illustrative example.',
          'Matching a single keyword without verifying the surrounding proposition.',
          'Assuming that all matching tasks follow chronological passage order.',
          'Assuming an option cannot be reused without reading the instructions.',
          'Copying words in a grammatical form that breaks sentence syntax.',
          'Failing to reserve time within the 60 minutes for entering answers.',
          'Reading every section of an academic passage equally slowly.',
          'Skimming quickly through a decisive sentence that demands close reading.',
          'Repeating practice test sets without analyzing the exact causes of errors.',
          'Measuring examination readiness using tests with remembered answers.',
          'Adopting unverified shortcuts before understanding the underlying task.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-r-pacing-pitfalls',
        label: 'Select three pitfalls from the 14-item audit that impacted your last reading score and write your repair plan.',
      },
    ],
  },

  // 14. r-gt-reading-comparison (§4.1 [GT], §1.6 [GT])
  {
    id: 'r-gt-reading-comparison',
    area: 'reading',
    track: 'gt',
    partId: 'r-part-3-4',
    partTitle: 'Part 3.4 · [GT] General Training Reading Differences',
    title: '[GT] General Training Reading: text profile and scoring',
    minutes: 6,
    sourceSections: ['4.1', '1.6'],
    needs: ['r-pacing-diagnosis-speed'],
    blocks: [
      {
        type: 'lead',
        summary: 'General Training Reading tests practical English across workplace and everyday social contexts. While question formats and core reading operations are identical to Academic, text profiles and raw score conversions differ significantly.',
        whyItMatters: 'Because the texts are shorter, the raw mark requirement for high bands is stricter. Band 7 requires 35/40 in GT versus 30/40 in Academic.',
        whatYouWillDo: 'Analyze text profiles across Sections 1, 2, and 3, compare raw-to-band conversions, and verify that the 5 operations apply directly to GT.',
      },
      {
        type: 'trackCompare',
        title: 'Academic Reading versus General Training Reading Text Profiles',
        academic: {
          label: 'IELTS Academic Reading',
          points: [
            'Contains 3 extended, dense academic passages (700–900 words each).',
            'Texts sourced from academic journals, research reports, books, and scientific magazines.',
            'Topics explore descriptive science, historical analysis, sociology, environmental theory, and technology.',
            'Raw score requirement: Band 6 requires approximately 23/40; Band 7 requires approximately 30/40.',
          ],
        },
        generalTraining: {
          label: 'IELTS General Training Reading',
          points: [
            'Section 1 contains two or three short factual texts related to everyday social survival (notices, advertisements, timetables).',
            'Section 2 contains two workplace texts (staff handbooks, safety protocols, job descriptions, employee contracts).',
            'Section 3 contains one extended, more complex text on a general-interest topic (history, nature, biography).',
            'Raw score requirement: Band 6 requires approximately 30/40; Band 7 requires approximately 35/40.',
          ],
          linkUnit: 'w-gt-purpose-reader-register',
        },
      },
      {
        type: 'comparisonTable',
        caption: 'Official Average Raw Score Comparison: Academic versus General Training',
        headers: ['Band Target', 'Academic Reading Raw Score (out of 40)', 'General Training Reading Raw Score (out of 40)'],
        rows: [
          ['Band 5.0', '15 correct answers', '23 correct answers'],
          ['Band 6.0', '23 correct answers', '30 correct answers'],
          ['Band 7.0', '30 correct answers', '35 correct answers'],
          ['Band 8.0', '35 correct answers', '38 correct answers (estimated)'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Stricter Margin for Error in General Training',
        body: 'In General Training Reading, you can afford only 5 mistakes across all 40 questions to secure Band 7.0 (35/40). In Academic Reading, you can afford 10 mistakes (30/40). Precision on everyday notices and workplace texts in Sections 1 and 2 is non-negotiable.',
        sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-general-training-test/ielts-general-training-format-reading',
        sourceLabel: 'Official IELTS General Training Reading Format',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'All Five Operations Apply to General Training',
        body: 'All 5 reading operations apply directly to General Training Reading. True/False/Not Given, Matching Information, and completion procedures use the exact same systematic methods.',
      },
      {
        type: 'selfCheck',
        title: 'General Training Reading Verification',
        items: [
          'I know that Section 1 tests everyday social texts and Section 2 tests workplace documents.',
          'I recognize that Band 7 requires 35/40 in General Training versus 30/40 in Academic.',
          'I apply the same 5-operation cycle and question-type decision procedures to GT texts.',
          'I treat Section 1 and 2 notices with high accuracy to protect my margin for Section 3.',
        ],
      },
    ],
  },
]
