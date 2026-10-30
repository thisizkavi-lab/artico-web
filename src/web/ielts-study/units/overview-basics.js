/**
 * Artico IELTS Study Course · Module 1A: Everything about IELTS (Parts 1.1 & 1.2)
 *
 * Source coverage:
 *   - Part 1.1: Preamble, §1.1, §1.2, §1.3, §1.4, §1.5, §1.6, §1.7 (7 units)
 *   - Part 1.2: §2.1, §2.2, §2.3, §2.4, §2.5, §2.6, §2.7, §2.8, §2.9 (5 units)
 * Total: 12 units
 */

export const overviewBasicsUnits = [
  // 1. ov-how-to-read (Preamble)
  {
    id: 'ov-how-to-read',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'How this study manual works',
    minutes: 7,
    sourceSections: ['Preamble'],
    needs: [],
    blocks: [
      {
        type: 'lead',
        summary: 'This study manual uses a plain technical style inspired by Simplified Technical English. Sentences are short, terms remain consistent, and advice separates official requirements from coaching options.',
        whyItMatters: 'Understanding how the manual is written ensures you extract exact test requirements without confusing them with optional coaching choices.',
        whatYouWillDo: 'Learn the three advisory labels, distinguish Study Mode from Practice Mode, and establish your core study routine.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Requirement: Official Rule',
        body: 'A requirement marks a test instruction, format condition, or official assessment criterion from Cambridge, IDP, or the British Council. You must satisfy every requirement to secure your target band.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Method: Standard Operating Procedure',
        body: 'A method provides a reliable step sequence for completing a task under timed examination conditions. Follow the method until it operates automatically.',
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Option: Coaching Choice',
        body: 'An option offers an alternative technique that suits particular candidate strengths. Test the option during unassisted practice to verify whether it improves your pacing or accuracy.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Trap: A Method Is Not a Band Guarantee',
        body: 'A method is useful only when it helps you produce an accurate, well-supported response. No examination strategy can replace active grammatical control and precise vocabulary.',
      },
      {
        type: 'comparisonTable',
        caption: 'How Study Mode Differs from Practice Mode in Artico',
        headers: ['Dimension', 'Study Mode (This Manual)', 'Practice Mode (Exam Simulator)'],
        rows: [
          ['Primary objective', 'Deconstruct task anatomy and examiner assessment criteria.', 'Rehearse end-to-end execution under strict examination conditions.'],
          ['Pacing & assistance', 'Untimed; worked specimens, annotations, and references unlocked.', 'Strictly timed; zero external assistance or notes.'],
          ['Skill development', 'Build verified word patterns, grammar repairs, and error logs.', 'Measure baseline stamina and verify skill transfer on unseen tests.'],
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'How to Progress Through Each Unit',
        body: 'Work through the blocks in sequence. Study the lead block to understand the core objective. Examine the structured tables and specimens before attempting practice. Finally, verify your understanding using the self-check list.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Language Range in Your Own Work',
        body: 'The concise technical style of this study manual explains mechanics clearly. It does not replace the requirement for grammatical range and varied vocabulary in your own IELTS writing and speaking responses.',
      },
      {
        type: 'selfCheck',
        title: 'Study Manual Orientation Check',
        items: [
          'I can distinguish an official Requirement from a coaching Method or Option.',
          'I understand that memorizing templates cannot replace underlying language proficiency.',
          'I will use Study Mode to build skills before testing them under timed Practice conditions.',
          'I will record recurring errors in an error log rather than completing endless blind tests.',
        ],
      },
    ],
  },

  // 2. ov-what-ielts-measures (§1.1)
  {
    id: 'ov-what-ielts-measures',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'What IELTS measures: language and task',
    minutes: 8,
    sourceSections: ['1.1'],
    needs: ['ov-how-to-read'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS measures communicative English proficiency across Listening, Reading, Writing, and Speaking. Every failed question stems from either a language deficit, a task management failure, or both.',
        whyItMatters: 'If you mistake a language weakness for a technique problem, you will practice the wrong repair and your score will remain stagnant.',
        whatYouWillDo: 'Differentiate language problems from task problems, analyze a concrete failure specimen, and classify test errors accurately.',
      },
      {
        type: 'contrastPair',
        title: 'Diagnosing the Underlying Cause of Lost Marks',
        weak: {
          label: 'Language Problem',
          text: 'The candidate cannot understand the recording due to unrecognized connected speech, or cannot write an essay because of limited vocabulary and unstable sentence structures.',
          whyItFails: 'Practicing superficial test strategies will not resolve missing vocabulary or faulty syntax.',
        },
        controlled: {
          label: 'Task Problem',
          text: 'The candidate possesses strong English skills but exceeds the word limit, ignores a bullet point in the prompt, or spends 35 minutes on Reading Passage 1.',
          whyItWorks: 'Targeted procedural discipline and strict time allocation instantly eliminate task errors.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Combined Breakdown Case',
        body: 'Both problems often occur together. A candidate may misread a qualifying adjective like "predominantly" (language problem) and subsequently write an absolute claim that contradicts the passage (task problem).',
      },
      {
        type: 'steps',
        title: 'Four-Step Error Classification Routine',
        items: [
          { action: 'Inspect the failed test item', why: 'Locates the exact question number and reveals your recorded answer.' },
          { action: 'Audit language comprehension', why: 'Verifies whether you understood all words, qualifiers, and grammatical links in the text or audio script.' },
          { action: 'Audit task compliance', why: 'Checks whether your answer observed all instruction limits, word counts, and format rules.' },
          { action: 'Assign the targeted repair', why: 'Chooses vocabulary retrieval drills for language gaps, or pacing drills for task failures.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Balancing Language Input with Task Rehearsal',
        body: 'With a Band 5.5 baseline and a Band 7.0 target, spend 70 percent of study time building core language. Allocate the remaining 30 percent to task familiarization and timed execution.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Knowledge Versus Execution Under Pressure',
        body: 'Knowing a strategy does not prove that you can use it. Understanding a lesson does not prove that you can perform under strict time pressure. Performance evidence on fresh material is the only valid test.',
      },
      {
        type: 'diagnosticCheck',
        title: 'Error Diagnostic Check',
        prompt: 'A capable candidate scores Band 6.0 in Writing because their 380-word essay lacks a conclusion after running out of time. What is the primary breakdown?',
        options: [
          {
            label: 'Task problem: poor time allocation and lack of paragraph planning.',
            correct: true,
            rationale: 'The candidate has sufficient English but failed to control time, resulting in an incomplete response structure.',
          },
          {
            label: 'Language problem: insufficient lexical resource to write quickly.',
            correct: false,
            rationale: 'Writing 380 words proves high lexical output. The failure was structural and procedural.',
          },
          {
            label: 'Assessment error: examiners penalize essays longer than 250 words.',
            correct: false,
            rationale: 'There is no upper word limit penalty in IELTS. The penalty resulted from an omitted conclusion.',
          },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Understanding Test Demands',
        items: [
          'I can determine whether a mistake resulted from unknown English or poor task execution.',
          'I recognize that memorizing tips cannot compensate for inadequate grammar or vocabulary.',
          'I understand that timed performance evidence is distinct from untimed comprehension.',
        ],
      },
    ],
  },

  // 3. ov-choose-correct-test (§1.2)
  {
    id: 'ov-choose-correct-test',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'Choose the right test: Academic and General Training',
    minutes: 8,
    sourceSections: ['1.2'],
    needs: ['ov-what-ielts-measures'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS is offered in two primary versions: Academic and General Training. The receiving university, employer, or immigration authority determines which version you must submit.',
        whyItMatters: 'Submitting a General Training result for university admission will lead to automatic rejection. Preparing with the wrong reading materials distorts your test readiness.',
        whatYouWillDo: 'Compare the two test versions across all four skills, verify six essential institutional requirements, and audit your target profile.',
      },
      {
        type: 'trackCompare',
        title: 'Academic versus General Training Comparison',
        academic: {
          title: 'IELTS Academic',
          points: [
            'Reading: 3 long academic texts sourced from journals, books, and research reports.',
            'Writing Task 1: 150-word objective factual report on a chart, table, graph, map, or process.',
            'Writing Task 2: 250-word formal discursive essay on an academic or societal issue.',
            'Listening & Speaking: Shared identical format with General Training.',
            'Target audience: Higher education admissions and professional registration in medicine, engineering, and law.',
          ],
        },
        generalTraining: {
          title: 'IELTS General Training',
          points: [
            'Reading: 3 sections featuring everyday notices, workplace handbooks, and general interest articles.',
            'Writing Task 1: 150-word letter written in a personal, semi-formal, or formal register.',
            'Writing Task 2: 250-word discursive essay on a topic of general personal or social interest.',
            'Listening & Speaking: Shared identical format with Academic.',
            'Target audience: Migration, secondary education, vocational training, and employment visas.',
          ],
        },
      },
      {
        type: 'steps',
        title: 'Six Items to Verify with Your Receiving Organization',
        items: [
          { action: 'Verify accepted version', why: 'Confirms whether the institution requires Academic or General Training.' },
          { action: 'Check overall band requirement', why: 'Records the exact required overall band score, such as Band 7.0.' },
          { action: 'Check individual skill minimums', why: 'Verifies the minimum score for each sub-test, such as no sub-score below 6.5.' },
          { action: 'Check delivery arrangements', why: 'Confirms whether the institution accepts computer-delivered, paper, or remote scores.' },
          { action: 'Verify application deadlines', why: 'Ensures your test session occurs at least six weeks before the institutional deadline.' },
          { action: 'Check route-specific rules', why: 'Confirms whether immigration authorities mandate specific test center credentials.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Documenting Institutional Requirements',
        body: 'Create an official requirement dossier before beginning preparation. Record the specific test title, required overall band, individual section minimums, acceptable test centers, and delivery mode. Keep this record in your preparation folder to guide your target scores.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'IELTS for UKVI and Life Skills',
        body: 'IELTS for UKVI has identical test questions and scoring to standard IELTS, but uses administrative video logging approved by UK Visas and Immigration. IELTS Life Skills is a completely different, shorter speaking and listening test for family and settlement visas. Do not mistake IELTS Life Skills for the four-skill test.',
        sourceUrl: 'https://ielts.org/take-a-test/test-types',
        sourceLabel: 'Official IELTS test types',
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-target-org',
        label: 'Record your target institution, required test version, overall band score, and individual sub-skill minimums.',
      },
      {
        type: 'selfCheck',
        title: 'Test Selection Audit',
        items: [
          'I have confirmed the exact IELTS version demanded by my target organization.',
          'I have recorded the individual skill minimums, not merely the overall band score.',
          'I know whether my application requires a UKVI-accredited test session.',
        ],
      },
    ],
  },

  // 4. ov-format-and-timing (§1.3)
  {
    id: 'ov-format-and-timing',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'Test format, timing, and task weights',
    minutes: 8,
    sourceSections: ['1.3'],
    needs: ['ov-choose-correct-test'],
    blocks: [
      {
        type: 'lead',
        summary: 'The IELTS test assesses four skills under strict standardized timing. Listening, Reading, and Writing take place together in a single 2 hour 45 minute sitting without scheduled breaks.',
        whyItMatters: 'Writing Task 2 carries twice the scoring weight of Task 1. Mismanaging your 60-minute writing period can destroy an otherwise strong examination performance.',
        whatYouWillDo: 'Review standard time allocations across all components, understand task weighting, and master the ideal time distribution for test day.',
      },
      {
        type: 'comparisonTable',
        caption: 'Standard Test Component Timing and Structure',
        headers: ['Skill', 'Structure', 'Standard Time Condition'],
        rows: [
          ['Listening', '4 recorded parts; 40 questions total. Audio is played once only.', 'Approximately 30 minutes, plus answer entry or review time.'],
          ['Academic Reading', '3 long texts; 40 questions total.', '60 minutes total, including direct answer entry. No extra transfer time.'],
          ['General Training Reading', '3 sections (multiple short and longer texts); 40 questions total.', '60 minutes total, including direct answer entry. No extra transfer time.'],
          ['Writing', '2 tasks: Task 1 (150 words min) and Task 2 (250 words min).', '60 minutes shared between both tasks. Candidates manage their own time.'],
          ['Speaking', '3 parts: familiar interview, individual long turn, and abstract discussion.', '11 to 14 minutes face-to-face or via high-definition video call.'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Task 2 Carries Double Weight',
        body: 'Writing Task 2 contributes twice as much to your overall Writing score as Task 1. Allocate approximately 40 minutes to Task 2 and 20 minutes to Task 1.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Task 1 Cannot Be Omitted',
        body: 'One excellent Task 2 essay cannot replace a missing or incomplete Task 1 response. Leaving Task 1 unfinished caps your overall Writing score at Band 5.0 or lower regardless of Task 2 quality.',
      },
      {
        type: 'steps',
        title: 'Standard Examination Time Allocation Plan',
        items: [
          { action: 'Reading pacing: 20 minutes per passage', why: 'Spend 17 minutes reading and answering, and 3 minutes transferring answers directly to the sheet or screen.' },
          { action: 'Writing Task 1 pacing: 20 minutes total', why: 'Spend 3 to 5 minutes analyzing data and planning, 12 minutes writing, and 3 minutes checking numbers and grammar.' },
          { action: 'Writing Task 2 pacing: 40 minutes total', why: 'Spend 5 to 7 minutes analyzing the prompt and structuring main ideas, 30 minutes writing, and 3 to 5 minutes editing.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Speaking Component Scheduling',
        body: 'The Speaking test can occur on the same day as the written components or within seven days before or after. Check your official confirmation slip for the exact venue and reporting time.',
        sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-academic-test',
        sourceLabel: 'Official Academic Test Format',
      },
      {
        type: 'selfCheck',
        title: 'Format and Timing Review',
        items: [
          'I remember that Reading provides no additional transfer time at the end of the hour.',
          'I understand that Writing Task 2 is worth twice as many marks as Writing Task 1.',
          'I have practiced completing Reading and Writing sections in single unbroken sittings.',
        ],
      },
    ],
  },

  // 5. ov-delivery-modes-2026 (§1.4)
  {
    id: 'ov-delivery-modes-2026',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'Delivery modes in 2026: computer and Writing on Paper',
    minutes: 8,
    sourceSections: ['1.4'],
    needs: ['ov-format-and-timing'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS delivery has transitioned toward computer-delivered testing across global venues. From mid-2026, fully paper-based testing is being phased out in many markets, while hybrid delivery options remain available in select regions.',
        whyItMatters: 'Using an old paper answer-transfer strategy on a computer test will cause you to run out of time during Listening and Reading.',
        whatYouWillDo: 'Compare full computer, hybrid Writing on Paper, and IELTS Online delivery, and practice six vital digital interface actions.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Writing on Paper Delivery Option',
        body: 'Selected markets offer a "Writing on Paper" option within computer-delivered IELTS. Candidates read test passages and essay prompts on a screen, but write their Task 1 and Task 2 answers by hand on official paper sheets.',
        sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-on-computer-writing-on-paper',
        sourceLabel: 'IELTS Writing on Paper details',
      },
      {
        type: 'comparisonTable',
        caption: 'Comparison of Current IELTS Delivery Options',
        headers: ['Feature', 'IELTS on Computer', 'Computer with Writing on Paper', 'IELTS Online (At Home)'],
        rows: [
          ['Listening setup', 'Headphones provided; type answers or click options directly.', 'Headphones provided; type answers or click options directly.', 'Own computer and private quiet room required.'],
          ['Reading interface', 'Split-screen display; passage on left, questions on right.', 'Split-screen display; passage on left, questions on right.', 'Split-screen display on candidate computer monitor.'],
          ['Writing input', 'Typed on keyboard; live automatic word count displayed.', 'Handwritten with pencil on official paper answer booklets.', 'Typed on keyboard; live automatic word count displayed.'],
          ['Results release', 'Available online within 1 to 5 calendar days.', 'Available online within 1 to 5 calendar days.', 'Available in 3 to 6 days; restricted institutional acceptance.'],
          ['Answer transfer', '2 minutes at end of Listening to review entries.', '2 minutes at end of Listening to review entries.', '2 minutes at end of Listening to review entries.'],
        ],
      },
      {
        type: 'steps',
        title: 'Six Digital Interface Actions to Rehearse Before Test Day',
        items: [
          { action: 'Build on-screen reading stamina', why: 'Helps you read 900-word academic articles on a computer monitor without eye strain.' },
          { action: 'Develop typing speed and accuracy', why: 'Ensures you can type at least 30 clean words per minute on a physical external keyboard.' },
          { action: 'Master digital navigation', why: 'Allows rapid movement through the bottom question navigation palette and review flags.' },
          { action: 'Practice split-screen text highlighting', why: 'Enables quick selection of text anchors and insertion of digital notes.' },
          { action: 'Perform the pre-test audio check', why: 'Verifies headphone operation and allows volume adjustment before the test starts.' },
          { action: 'Enter answers directly', why: 'Prevents rushing because computer tests provide only 2 minutes to review Listening answers.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Verify Acceptance of IELTS Online',
        body: 'IELTS Online is taken remotely from home, but many universities, medical boards, and immigration departments do not accept remote at-home results. Always verify acceptance with your receiving institution before booking.',
      },
      {
        type: 'selfCheck',
        title: 'Delivery Mode Preparedness',
        items: [
          'I know whether my local test center offers computer delivery or Writing on Paper.',
          'I have practiced reading long academic passages on a computer display.',
          'I understand that computer-delivered Listening provides only 2 minutes to check answers.',
        ],
      },
    ],
  },

  // 6. ov-scores-and-raw-marks (§1.5, §1.6)
  {
    id: 'ov-scores-and-raw-marks',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'Band scores, rounding, and raw marks',
    minutes: 10,
    sourceSections: ['1.5', '1.6'],
    needs: ['ov-format-and-timing'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS reports results on a 9-band scale. Candidates receive an individual score from 1.0 to 9.0 for each of the four skills. They also receive an overall band calculated as the arithmetic average of all four components, rounded to the nearest whole or half band.',
        whyItMatters: 'A high Listening score cannot compensate for an unmet Writing minimum. Knowing the exact raw-mark benchmarks tells you how many correct answers you need on test day.',
        whatYouWillDo: 'Master the official band rounding rule, examine raw mark conversion benchmarks, and understand the General Training raw mark differential.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-score-rounding',
        title: 'Overall Band Score Rounding Rule',
        caption: 'The arithmetic average of the four skill scores rounds to the nearest whole or half band. A fraction of .25 rounds up to .5; a fraction of .75 rounds up to the next whole band.',
        alt: 'Diagram showing IELTS rounding rules: 6.25 rounds up to 6.5, 6.75 rounds up to 7.0, and 6.125 rounds down to 6.0.',
      },
      {
        type: 'comparisonTable',
        caption: 'Official Overall Band Calculation and Rounding Examples',
        headers: ['Listening', 'Reading', 'Writing', 'Speaking', 'Average', 'Final Band', 'Official Rounding Logic'],
        rows: [
          ['6.5', '6.5', '6.0', '6.0', '6.25', '6.5', 'Fraction ends in .25; rounds up to the next half band.'],
          ['7.0', '6.5', '6.5', '7.0', '6.75', '7.0', 'Fraction ends in .75; rounds up to the next whole band.'],
          ['6.5', '6.0', '6.0', '6.0', '6.125', '6.0', 'Fraction is below .25; rounds down to the nearest whole band.'],
          ['7.5', '7.0', '6.5', '7.0', '7.0', '7.0', 'Exact whole number; remains unchanged.'],
        ],
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-raw-to-band',
        title: 'Raw Marks Required for Key Bands (Out of 40)',
        caption: 'Listening and Academic Reading require roughly 30 correct answers out of 40 for Band 7.0. General Training Reading requires 35 correct answers for Band 7.0 due to simpler texts.',
        alt: 'Line chart comparing raw marks needed for Bands 5 to 8 across Listening, Academic Reading, and General Training Reading.',
      },
      {
        type: 'comparisonTable',
        caption: 'Official Indicative Raw Mark Benchmarks (Out of 40)',
        headers: ['Band Score', 'Listening Raw Marks', 'Academic Reading Raw Marks', 'General Training Reading Raw Marks'],
        rows: [
          ['Band 5.0', '16 / 40', '15 / 40', '23 / 40'],
          ['Band 6.0', '23 / 40', '23 / 40', '30 / 40'],
          ['Band 7.0', '30 / 40', '30 / 40', '35 / 40'],
          ['Band 8.0', '35 / 40', '35 / 40', '38 / 40'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'General Training Reading Raw Mark Gap',
        body: 'General Training Reading texts use everyday workplace materials. Therefore, candidates must score 35 out of 40 for Band 7.0, compared to 30 out of 40 in Academic Reading. The margin for error is significantly tighter in General Training.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Zero Negative Marking: Never Leave Blanks',
        body: 'Incorrect answers do not deduct marks from your correct responses. When uncertain, make your best-supported inference before moving to the next item. Never leave an answer space blank.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Spelling Penalties and Proportion Fallacy',
        body: 'A spelling mistake loses that specific question mark; it does not trigger an automatic overall band deduction. Furthermore, never convert a short 10-question practice exercise into an estimated band score by simple proportion. Band conversions are calibrated across full 40-item tests.',
      },
      {
        type: 'selfCheck',
        title: 'Scoring and Raw Mark Mastery',
        items: [
          'I can calculate my overall band score from the four component scores using the rounding rule.',
          'I know how many correct answers out of 40 I need to reach my target band in Listening and Reading.',
          'I understand why General Training Reading requires 5 more raw marks for Band 7.0 than Academic Reading.',
        ],
      },
    ],
  },

  // 7. ov-assessment-terms (§1.7)
  {
    id: 'ov-assessment-terms',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-1',
    partTitle: 'Part 1.1 · Test Architecture & Conditions',
    title: 'Core assessment terms',
    minutes: 9,
    sourceSections: ['1.7'],
    needs: ['ov-scores-and-raw-marks'],
    blocks: [
      {
        type: 'lead',
        summary: 'Effective preparation requires shared understanding of technical assessment terms. These 17 foundational terms define the criteria, evidence types, and operational concepts used by IELTS examiners.',
        whyItMatters: 'If you misunderstand technical terms like Coherence, Cohesion, or Scope, you will focus on the wrong features in your writing and speaking responses.',
        whatYouWillDo: 'Study the precise definitions and concrete IELTS application examples for all 17 foundational assessment terms.',
      },
      {
        type: 'comparisonTable',
        caption: 'The 17 Foundational Assessment Terms and Their IELTS Application',
        headers: ['Term', 'Technical Definition', 'IELTS Application Example'],
        rows: [
          ['Task', 'The exact work specified by the prompt instructions.', 'Summarizing main features of a chart or writing a 250-word balanced opinion essay.'],
          ['Scope', 'The boundary conditions of an argument: group, frequency, time, and degree.', 'Recognizing that "some urban residents" cannot be paraphrased as "all citizens".'],
          ['Evidence', 'Observable facts, audio excerpts, text lines, or data supporting a claim.', 'Quoting the exact text phrase that validates a True / False / Not Given question.'],
          ['Paraphrase', 'Expressing identical meaning using different words and grammatical structures.', 'Transforming "the price increased significantly" into "there was a marked rise in cost".'],
          ['Gist', 'The general overall meaning of an entire paragraph or spoken section.', 'Identifying that a paragraph discusses funding challenges without memorizing each figure.'],
          ['Inference', 'A logical deduction supported by text facts when the exact statement is absent.', 'Concluding that a species is endangered because its natural forest habitat was destroyed.'],
          ['Criterion', 'One official assessment area against which candidate performance is scored.', 'Task Achievement, Coherence and Cohesion, Lexical Resource, or Grammatical Range.'],
          ['Coherence', 'The logical arrangement, progression, and clarity of ideas across a response.', 'Structuring an essay so that each paragraph explores one clear central topic.'],
          ['Cohesion', 'The specific linguistic devices and reference words that bind sentences together.', 'Using pronouns, conjunctions, and discourse markers without over-mechanical repetition.'],
          ['Lexical Resource', 'The range, precision, and collocation control of candidate vocabulary.', 'Using precise topic vocabulary rather than repetitive common synonyms.'],
          ['Collocation', 'Words that naturally and conventionally occur together in native speech and text.', 'Saying "conduct research" or "take an exam" rather than "make an exam".'],
          ['Register', 'The level of formality suited to the communicative purpose and audience.', 'Using objective formal style in Task 2 and reserve informal idiom for Speaking Part 1.'],
          ['Intelligibility', 'The ease with which a listener can understand spoken words and intended message.', 'Clear pronunciation, word stress, and natural rhythm that require minimal listener effort.'],
          ['Baseline', 'Documented evidence of current performance before targeted intervention.', 'Scoring 24/40 on an unassisted practice test to establish current skill level.'],
          ['Transfer', 'The successful application of a learned skill to a completely fresh task.', 'Using the overview-selection method on an unfamiliar pie chart without coaching.'],
          ['Diagnostic', 'Analysis that pinpoints the exact operational reason for a test failure.', 'Determining whether a reading error was caused by unknown vocabulary or poor scanning.'],
          ['Distractor', 'Plausible but incorrect information intended to test candidate precision.', 'A speaker mentioning "Room 14" before immediately correcting the location to "Room 18".'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Vague Descriptions versus Technical Precision',
        weak: {
          label: 'Vague Impressionistic Description',
          text: '"The essay sounded nice and used some advanced words, but the ideas seemed a bit messy."',
          whyItFails: 'Uses subjective impressions that cannot guide revisions or identify specific criterion criteria.',
        },
        controlled: {
          label: 'Criterion-Referenced Diagnostic Analysis',
          text: '"The essay demonstrates good Lexical Resource with topic-specific vocabulary. However, it lacks Coherence because body paragraphs omit topic sentences."',
          whyItWorks: 'Uses official assessment terms to pinpoint the exact structural weakness requiring repair.',
        },
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Using Assessment Terms in Your Error Log',
        body: 'Always use technical assessment terms in your error records. Writing "overlooked scope qualifier" or "failed collocation" identifies an exact linguistic fault. Vague labels like "careless mistake" prevent targeted skill improvement.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Anchored in Official Public Band Descriptors',
        body: 'These 17 definitions align directly with the official public band descriptors published by Cambridge English and IDP. Master these concepts to evaluate your own practice responses accurately.',
      },
      {
        type: 'selfCheck',
        title: 'Assessment Term Self-Check',
        items: [
          'I can explain the difference between Coherence (flow of ideas) and Cohesion (connective words).',
          'I understand why Lexical Resource rewards precise word choice over obscure synonyms.',
          'I know how to identify distractors before locking in an answer in Listening and Reading.',
          'I can locate the scope qualifiers in any Reading or Task 2 prompt.',
        ],
      },
    ],
  },

  // 8. ov-preparation-cycle (§2.1)
  {
    id: 'ov-preparation-cycle',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-2',
    partTitle: 'Part 1.2 · Universal Study, Vocabulary & Grammar System',
    title: 'Use one 9-step preparation cycle',
    minutes: 10,
    sourceSections: ['2.1'],
    needs: ['ov-assessment-terms'],
    blocks: [
      {
        type: 'lead',
        summary: 'Effective test preparation follows an intentional nine-step progression divided into three phases: build skills, test control, and repair and transfer. Completing random tests without diagnosis produces fatigue without score improvement.',
        whyItMatters: 'A skill is truly mastered only when it functions reliably on fresh, unseen test material under examination conditions.',
        whatYouWillDo: 'Study the three preparation phases, understand the nine steps, and apply the strict transfer check rule.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-9step-cycle',
        title: 'The Nine-Step Preparation Cycle',
        caption: 'Phase A builds foundational competence with worked examples and assisted tasks. Phase B measures independent test performance under time pressure. Phase C isolates weaknesses and tests repairs on fresh material.',
        alt: 'Flowchart showing Phase A (understand, observe, explain, apply with support), Phase B (timed attempt, review evidence), and Phase C (isolate weakness, smallest repair, transfer check).',
      },
      {
        type: 'steps',
        title: 'The Nine Consecutive Steps in the Cycle',
        items: [
          { action: 'Step 1: Understand the task', why: 'Prevents procedural errors and misread constraints.' },
          { action: 'Step 2: Observe a worked example', why: 'Demonstrates how a skilled writer handles the prompt.' },
          { action: 'Step 3: Explain the method aloud', why: 'Verifies conceptual understanding before writing.' },
          { action: 'Step 4: Apply with full support', why: 'Builds muscle memory using notes and reference models.' },
          { action: 'Step 5: First fresh timed attempt', why: 'Exposes actual operational performance under time limits.' },
          { action: 'Step 6: Review objective evidence', why: 'Compares your actual output against official answer keys.' },
          { action: 'Step 7: Isolate one specific weakness', why: 'Pinpoints the single cognitive breakdown that cost marks.' },
          { action: 'Step 8: Practise the smallest useful repair', why: 'Corrects the exact linguistic or task defect.' },
          { action: 'Step 9: Transfer check on fresh material', why: 'Proves the repair functions on completely new tasks.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Pacing the Transition from Learning to Testing',
        body: 'Spend adequate time in Phase A before attempting timed tasks. Rushing into timed practice tests before mastering the method produces anxiety and embeds error patterns. Consolidate your technique under untimed conditions first.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Transfer Rule',
        body: 'If Step 9 fails on fresh material, do not advance to a new topic. Loop back to Step 5 and re-diagnose. A skill is mastered only when it transfers cleanly to an unfamiliar task.',
      },
      {
        type: 'comparisonTable',
        caption: 'Learning Evidence versus Performance Evidence',
        headers: ['Dimension', 'Phase A: Assisted Learning (Steps 1–4)', 'Phase B & C: Independent Performance (Steps 5–9)'],
        rows: [
          ['Timing condition', 'Untimed; pause audio or check dictionaries whenever helpful.', 'Strict examination timing; continuous execution without pauses.'],
          ['Assistance level', 'Hints, templates, and teacher corrections permitted.', 'Zero external assistance; simulates actual examination environment.'],
          ['Primary objective', 'Acquire procedural competence and build language patterns.', 'Test operational reliability and expose points of failure under stress.'],
          ['Evidence provided', 'Learning evidence: reveals what you can achieve with support.', 'Performance evidence: reveals what you can achieve independently.'],
        ],
      },
      {
        type: 'selfCheck',
        title: 'Preparation Cycle Implementation',
        items: [
          'I explain the task method before attempting the exercise.',
          'I keep assisted learning sessions separate from timed baseline evaluations.',
          'I isolate one micro-skill at a time during Step 8 repairs.',
          'I always verify repairs with fresh, unseen test material before moving forward.',
        ],
      },
    ],
  },

  // 9. ov-diagnose-and-error-log (§2.2, §2.3)
  {
    id: 'ov-diagnose-and-error-log',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-2',
    partTitle: 'Part 1.2 · Universal Study, Vocabulary & Grammar System',
    title: 'Diagnose before adding volume and log errors',
    minutes: 10,
    sourceSections: ['2.2', '2.3'],
    needs: ['ov-preparation-cycle'],
    blocks: [
      {
        type: 'lead',
        summary: 'A practice test score identifies a result; it does not reveal the operational cause of failure. Doing more practice tests without diagnosing root causes only entrenches bad habits. You must inspect the actual failed operation behind every lost mark.',
        whyItMatters: 'Recording vague complaints like "I am bad at Reading" provides zero guidance. Documenting exact operational breakdowns enables immediate, measurable repairs.',
        whatYouWillDo: 'Identify the eleven primary causes of test errors, implement an eight-field error log, and apply the preservation rule.',
      },
      {
        type: 'steps',
        title: 'The Eleven Primary Root Causes of Test Errors',
        items: [
          { action: '1. Missed instruction', why: 'Overlooking word limits, such as writing three words when instructed "NO MORE THAN TWO WORDS".' },
          { action: '2. Wrong information located', why: 'Scanning for the wrong keyword and searching an irrelevant paragraph.' },
          { action: '3. Misunderstood evidence', why: 'Locating the correct sentence but misinterpreting its core grammatical meaning.' },
          { action: '4. Overlooked qualifier', why: 'Failing to notice limiting words like "rarely", "predominantly", or "allegedly".' },
          { action: '5. Unknown vocabulary', why: 'Encountering a critical keyword that is absent from your active lexicon.' },
          { action: '6. Unrecognized connected speech', why: 'Failing to catch weak forms, elision, or linking sounds in the audio recording.' },
          { action: '7. Incorrect answer entry', why: 'Misspelling an answer, transposing digits, or recording the answer in the wrong slot.' },
          { action: '8. Underdeveloped idea', why: 'Stating a claim in Writing Task 2 without explaining the causal mechanism or evidence.' },
          { action: '9. Uncovered prompt element', why: 'Addressing only one part of a multi-part essay prompt or omitting an overview in Task 1.' },
          { action: '10. Grammar or pronunciation error', why: 'Recurring structural slips that distort message clarity or impede comprehension.' },
          { action: '11. Time mismanagement', why: 'Spending 35 minutes on Reading Passage 1 and running out of time on Passage 3.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'The Eight Mandatory Fields in Your Personal Error Log',
        headers: ['Field', 'What to Record', 'Concrete Example'],
        rows: [
          ['1. Work', 'Skill, specific task family, and test date.', 'Academic Reading, Matching Headings, 14 Nov.'],
          ['2. Conditions', 'Timing, assistance level, and environment.', 'Timed 20 minutes, zero assistance, quiet room.'],
          ['3. Original response', 'Your exact recorded answer.', 'Selected Heading iv ("New transport policy").'],
          ['4. Correct evidence', 'The exact text line, audio timestamp, or criterion.', 'Paragraph C lines 4–6: discusses freight logistics, not public transport.'],
          ['5. Cause', 'The precise operational failure.', 'Scanned for "transport" and matched single word without reading paragraph theme.'],
          ['6. Repair', 'Smallest actionable corrective drill.', 'Read topic sentence and concluding sentence before checking heading list.'],
          ['7. Transfer check', 'Fresh material used to verify the repair.', 'Cambridge 18 Test 2 Reading Passage 2 matching headings.'],
          ['8. Result', 'Observable outcome on fresh material.', 'Matched 5 of 5 headings correctly without keyword traps.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Vague Complaint versus Actionable Error Log Entry',
        weak: {
          label: 'Vague Emotional Complaint',
          text: '"I am terrible at Reading True / False / Not Given. I ran out of time and guessed everything."',
          whyItFails: 'Expresses frustration but identifies zero operational causes and offers no corrective action.',
        },
        controlled: {
          label: 'Actionable Operational Diagnosis',
          text: '"Question 7: I marked True because the passage mentioned solar panels, but the prompt asserted they were subsidized. The passage never confirmed subsidies. Cause: overlooked scope qualifier. Repair: verify both subject and predicate before choosing True."',
          whyItWorks: 'Isolates the exact cognitive error and defines a verifiable rule for future questions.',
        },
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'The Preservation Rule',
        body: 'Always preserve your original incorrect response alongside your revision. If you overwrite your original draft, you cannot analyze the linguistic shift that produced the improvement.',
      },
      {
        type: 'selfCheck',
        title: 'Error Logging Discipline',
        items: [
          'I record every error in an eight-field log instead of merely tallying my score.',
          'I formulate actionable repairs that can be tested on fresh material.',
          'I keep my original attempts visible to track progress over time.',
        ],
      },
    ],
  },

  // 10. ov-usable-vocabulary (§2.4, §2.5, §2.6)
  {
    id: 'ov-usable-vocabulary',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-2',
    partTitle: 'Part 1.2 · Universal Study, Vocabulary & Grammar System',
    title: 'Build usable vocabulary and word records',
    minutes: 10,
    sourceSections: ['2.4', '2.5', '2.6'],
    needs: ['ov-diagnose-and-error-log'],
    blocks: [
      {
        type: 'lead',
        summary: 'Vocabulary supports every section of the IELTS test. However, recognizing a word in a reading passage is fundamentally different from retrieving it accurately while writing or speaking under examination pressure.',
        whyItMatters: 'Learning long lists of isolated dictionary definitions creates passive knowledge that collapses under exam conditions. You must build active, productive vocabulary with verified grammatical patterns.',
        whatYouWillDo: 'Differentiate receptive from productive vocabulary, execute an 8-step acquisition cycle, create a complete 9-element word record, and review via retrieval.',
      },
      {
        type: 'contrastPair',
        title: 'Receptive versus Productive Vocabulary',
        weak: {
          label: 'Passive / Receptive Vocabulary',
          text: 'You understand the general meaning when reading or listening, but you cannot use the word with correct grammar, prepositions, or collocations in your own sentences.',
          whyItFails: 'Passive recognition fails during Writing and Speaking when you must generate sentences independently.',
        },
        controlled: {
          label: 'Active / Productive Mastery',
          text: 'You retrieve the word instantly, pronounce it with correct word stress, pair it with natural collocations, and embed it in a controlled grammatical structure.',
          whyItWorks: 'Active mastery satisfies Lexical Resource criteria across both productive exam papers.',
        },
      },
      {
        type: 'steps',
        title: 'Eight-Step Contextual Acquisition Cycle',
        items: [
          { action: '1. Sustainable input', why: 'Reads and listens to quality English material suited to your comprehension level.' },
          { action: '2. Notice useful items', why: 'Identifies recurring words, dependent prepositions, and functional phrases in context.' },
          { action: '3. Infer meaning', why: 'Deduces probable meaning from sentence clues before opening a dictionary.' },
          { action: '4. Verify in a dictionary', why: 'Checks definition, word class, and pronunciation in an authoritative learner dictionary.' },
          { action: '5. Record patterns', why: 'Notes prepositions, dependent clauses, and standard word partnerships.' },
          { action: '6. Active retrieval', why: 'Tests your memory after 24 hours without looking at your notebook.' },
          { action: '7. Controlled sentence production', why: 'Applies the word in an original academic or IELTS context sentence.' },
          { action: '8. Check and correct', why: 'Verifies grammar and reviews the sentence against authoritative models.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'word-record',
        title: 'Sample Complete Word Record: "allocate"',
        segments: [
          { text: 'Word: allocate (verb)', note: 'Headword and grammatical part of speech' },
          { text: 'Pronunciation: /ˈæləkeɪt/ (stress on first syllable)', note: 'Phonemic transcription with primary stress marker' },
          { text: 'Meaning: to officially give resources, funds, or time to a specific purpose', note: 'Precise contextual definition in simple English' },
          { text: 'Collocations: allocate resources, allocate funds, allocate sufficient time', note: 'High-frequency verb-noun pairings' },
          { text: 'Preposition pattern: allocate [something] to [someone/something]; allocate [resources] for [a project]', note: 'Essential dependent preposition structures' },
          { text: 'Related forms: allocation (noun), allocated (adjective)', note: 'Word family derivatives for grammatical flexibility' },
          { text: 'Model sentence: The local government allocated substantial funding to public transport modernization.', note: 'Original controlled specimen sentence' },
          { text: 'Common error trap: Do not say "allocate for maintenance of roads" without specifying the resource given.', note: 'Warning against frequent learner mistake' },
          { text: 'Personal translation: (optional native language equivalent)', note: 'Optional memory bridge' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Seven Active Retrieval Methods',
        body: 'Review vocabulary by testing recall. Read a definition and recall the word. Match words to contextual examples. Group words by topic or sound. Write a short paragraph using three target words. Never rely solely on passive rereading of word lists.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Reject Daily Word Quotas',
        body: 'There is no universal quota of new words that every candidate must memorize daily. Learning five words deeply with verified collocations and grammar patterns is vastly superior to memorizing 30 isolated definitions.',
      },
      {
        type: 'selfCheck',
        title: 'Vocabulary Learning Audit',
        items: [
          'My vocabulary notebook includes collocations and preposition patterns, not just single words.',
          'I write original sentences to move receptive words into my active productive lexicon.',
          'I test retrieval by covering definitions rather than passively re-reading lists.',
        ],
      },
    ],
  },

  // 11. ov-synonym-checks (§2.7)
  {
    id: 'ov-synonym-checks',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-2',
    partTitle: 'Part 1.2 · Universal Study, Vocabulary & Grammar System',
    title: 'Check five things before changing a word',
    minutes: 9,
    sourceSections: ['2.7'],
    needs: ['ov-usable-vocabulary'],
    blocks: [
      {
        type: 'lead',
        summary: 'Paraphrasing is essential in IELTS, but reckless synonym replacement destroys precision. Swapping words merely to avoid repetition frequently introduces factual inaccuracies and grammatical errors.',
        whyItMatters: 'Using an inappropriate synonym changes the scope of an argument or creates an unnatural collocation, immediately dropping your Lexical Resource score to Band 5.0 or 6.0.',
        whatYouWillDo: 'Apply the Five-Gate Synonym Verification Filter, inspect six common false synonym traps, and learn when to repeat the original word.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-synonym-5gate',
        title: 'The Five-Gate Synonym Verification Filter',
        caption: 'Before replacing any word, verify Meaning, Scope, Grammar, Collocation, and Register. If a proposed substitute fails any gate, retain the original word.',
        alt: 'Flowchart showing five verification gates: Meaning, Scope, Grammar, Collocation, and Register leading to either Use replacement or Keep original.',
      },
      {
        type: 'steps',
        title: 'The Five Verification Gates Explained',
        items: [
          { action: 'Gate 1: Meaning', why: 'Checks whether the substitute word shares the exact core definition in this specific context.' },
          { action: 'Gate 2: Scope', why: 'Verifies whether the substitute applies to the same group, time, intensity, and geographical boundary.' },
          { action: 'Gate 3: Grammar', why: 'Ensures the substitute fits the same grammatical structure, countability, and clause pattern.' },
          { action: 'Gate 4: Collocation', why: 'Confirms that the substitute partners naturally with neighboring nouns, verbs, and prepositions.' },
          { action: 'Gate 5: Register', why: 'Verifies that the substitute is appropriate for formal academic writing or objective reporting.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Six High-Frequency Synonym Traps and Their Scope Distinctions',
        headers: ['Proposed Replacement', 'Why the Substitution Fails', 'Correct Controlled Usage'],
        rows: [
          ['Residents → Citizens', 'Residents live in a location; they may be foreign workers or students without citizenship.', 'Use "residents" for local municipal services; use "citizens" for legal rights.'],
          ['Children → Adolescents', 'Adolescents refers specifically to teenagers (ages 10–19), not young infants or toddlers.', 'Use "children" for broad youth demographics; use "adolescents" only for teenagers.'],
          ['Family → Household', 'A household consists of all people residing in one housing unit, including unrelated flatmates.', 'Use "household" for domestic utility statistics; use "family" for kinship relations.'],
          ['Revenue → Profit', 'Revenue is gross income before deducting operating expenses, wages, and taxes.', 'Never use "profit" when reporting gross earnings in Academic Task 1.'],
          ['Discuss → Solve', '"To address a problem" means to examine or respond to it; it does not mean the problem was solved.', 'Do not claim an issue was "solved" unless the source text explicitly confirms a solution.'],
          ['Important → Pivotal', 'Pivotal means a crucial turning point upon which everything depends; it is not a general synonym.', 'Reserve "pivotal" for decisive historical or structural turning points.'],
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'The Repetition Rule',
        body: 'Repeat a precise word when any replacement would distort meaning or create unnatural phrasing. Examiners value accuracy and precision far above flawed variety.',
      },
      {
        type: 'selfCheck',
        title: 'Synonym Verification Self-Check',
        items: [
          'I test proposed synonyms against all five gates before writing them in essays.',
          'I never substitute words merely to avoid repeating a term if the substitute changes the scope.',
          'I understand the critical distinctions between citizens/residents and revenue/profit.',
        ],
      },
    ],
  },

  // 12. ov-grammar-and-clear-meaning (§2.8, §2.9)
  {
    id: 'ov-grammar-and-clear-meaning',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-2',
    partTitle: 'Part 1.2 · Universal Study, Vocabulary & Grammar System',
    title: 'Grammatical control and clear relationships',
    minutes: 10,
    sourceSections: ['2.8', '2.9'],
    needs: ['ov-synonym-checks'],
    blocks: [
      {
        type: 'lead',
        summary: 'Grammar is not an ornamental checklist of complex structures. In IELTS, grammar functions as a precision tool to express logical relationships between ideas clearly on the first reading.',
        whyItMatters: 'Attempting convoluted, error-filled sentences reduces your Grammatical Range and Accuracy score. Examiners look for a high proportion of error-free sentences.',
        whatYouWillDo: 'Review the top six recurring error targets, execute the 5-step grammar repair sequence, and balance active and passive voice.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Meaning Over Fake Complexity',
        body: 'Do not force artificial complexity into every sentence. A convoluted, error-filled sentence reduces your Grammatical Range and Accuracy score. Balance simple, compound, and complex sentences with consistent control.',
      },
      {
        type: 'steps',
        title: 'Top Six Recurring Grammar Error Targets',
        items: [
          { action: '1. Subject-verb agreement', why: 'Ensures the verb agrees with the true subject, especially when prepositional phrases intervene.' },
          { action: '2. Definite and indefinite articles', why: 'Controls the use of "the" with specific nouns, and "a/an" with singular countable nouns.' },
          { action: '3. Countable and uncountable nouns', why: 'Recognizes nouns that cannot take plural forms (information, advice, research, equipment).' },
          { action: '4. Tense consistency', why: 'Matches verb tenses to the chronological time frames specified by prompts and data axes.' },
          { action: '5. Prepositional collocations', why: 'Pairs verbs and adjectives with their conventional prepositions (participate in, contribute to).' },
          { action: '6. Comma splices and boundaries', why: 'Avoids joining two independent clauses with only a comma without a conjunction.' },
        ],
      },
      {
        type: 'steps',
        title: 'The Five-Step Grammar Repair Sequence',
        items: [
          { action: 'Step 1: Identify intended meaning', why: 'States precisely what relationship between ideas you intended to express.' },
          { action: 'Step 2: Correct the original sentence', why: 'Rewrites the flawed sentence so that it communicates the message cleanly.' },
          { action: 'Step 3: Articulate the grammatical rule', why: 'Writes down the exact structural principle governing the correction.' },
          { action: 'Step 4: Generate a new sentence', why: 'Constructs a fresh sentence on a different topic using the identical grammatical pattern.' },
          { action: 'Step 5: Verify on fresh work', why: 'Checks your next written or spoken practice for that specific error pattern.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Overloaded Pseudo-Complexity versus Controlled Precision',
        weak: {
          label: 'Overloaded Clause Chain',
          text: '"Due to the fact that globalization which is increasing rapidly happens, therefore many local cultures are losing their heritage because of economic reasons."',
          whyItFails: 'Uses redundant connectives ("due to the fact", "therefore") and clumsy relative clauses that obscure meaning.',
        },
        controlled: {
          label: 'Controlled Complex Sentence',
          text: '"As globalization accelerates, many regional communities struggle to preserve their cultural heritage against commercial pressures."',
          whyItWorks: 'Uses an introductory adverbial clause ("As globalization accelerates") to state cause and effect cleanly.',
        },
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Developing the Habit of Proofreading',
        body: 'Reserve three to five minutes at the end of every writing task specifically for sentence-level editing. Systematically check subject-verb agreement, noun countability, and article usage. Catching four minor slips can raise your grammatical accuracy score by an entire band.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Active versus Passive Voice Selection',
        body: 'Use active voice when the agent performing the action is significant. Use passive voice in process diagrams or scientific contexts where the process or result matters more than the actor.',
      },
      {
        type: 'selfCheck',
        title: 'Grammatical Control Review',
        items: [
          'Every subject matches its corresponding verb in number and person.',
          'Uncountable nouns appear without plural endings or improper articles.',
          'Tenses reflect the actual timeframe indicated in the task.',
          'Sentences use subordination to show cause, condition, or contrast naturally.',
        ],
      },
    ],
  },
]
