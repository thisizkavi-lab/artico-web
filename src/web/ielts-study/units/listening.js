/**
 * Artico IELTS Study Course · Module 2: Listening (11 Units)
 *
 * Source coverage:
 *   - Part 2.1: §3.1, §3.2 (2 units: l-four-contexts, l-preview-period)
 *   - Part 2.2: §3.3, §3.4, §3.5 (2 units: l-complete-message-paraphrase, l-eight-distractors)
 *   - Part 2.3: §3.6, §3.7, §3.8, §3.9, §3.10, §3.11, §3.12, §3.13 (5 units:
 *       l-forms-notes-tables-summaries, l-sentences-short-answers,
 *       l-multiple-choice-matching, l-maps-plans-diagrams, l-discussions-and-lectures)
 *   - Part 2.4: §3.14, §3.15, §3.16, §3.17, §3.18, §3.19 (2 units:
 *       l-entry-and-recovery, l-diagnosis-microlistening-pitfalls)
 * Total: 11 units
 */

export const listeningUnits = [
  // 1. l-four-contexts (§3.1)
  {
    id: 'l-four-contexts',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-1',
    partTitle: 'Part 2.1 · Listening Architecture & Conditions',
    title: 'The four Listening parts and delivery rules',
    minutes: 6,
    sourceSections: ['3.1'],
    needs: ['ov-format-and-timing'],
    blocks: [
      {
        type: 'lead',
        summary: 'The IELTS Listening test consists of 4 parts and 40 questions heard once only. The recording sets the pace across everyday social exchanges, monologues, and academic discussions.',
        whyItMatters: 'Unlike Reading, you cannot control the speed or return to replay audio. Understanding how each part increases in complexity allows you to adjust your focus before each recording starts.',
        whatYouWillDo: 'Analyze the four spoken contexts, distinguish computer entry rules from legacy paper transfer, and understand why question sequence follows audio time.',
      },
      {
        type: 'comparisonTable',
        caption: 'The Four IELTS Spoken Contexts and Cognitive Demands',
        headers: ['Part', 'Spoken Context', 'Speaker Format', 'Primary Listening Demand'],
        rows: [
          ['Part 1', 'Everyday social context', 'Two-speaker dialogue', 'Extracting factual details such as names, dates, phone numbers, and prices.'],
          ['Part 2', 'Everyday social context', 'One-speaker monologue', 'Following spatial explanations, event orientations, local services, or maps.'],
          ['Part 3', 'Educational or training context', 'Multi-speaker discussion (up to 4 speakers)', 'Tracking student-tutor proposals, conflicting views, reasons, and revised plans.'],
          ['Part 4', 'Academic subject context', 'One-speaker lecture', 'Following a continuous academic lecture, logical classifications, and cause-effect chains.'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Single Playback and Computer Answer Entry',
        body: 'The recording is played once only. On computer-delivered IELTS, enter answers directly as you listen. You receive two minutes at the end of the test to review answers. Do not expect the older paper test transfer period of ten minutes.',
        link: { url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening', text: 'Official IELTS Listening Test Format' },
      },
      {
        type: 'section',
        id: 'audio-progression',
        title: 'Audio Progression and Order of Information',
        bridge: 'Questions follow the chronological progression of the recording.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Questions always follow the chronological order of the information spoken on the audio track. If you hear the information for question 4, you know that question 3 has already passed.',
          'While question stems follow chronological order, option letters inside multiple-choice or matching tasks do not. You must evaluate options based on meaning rather than letter order.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Pacing Trap',
        body: 'You cannot manage time in Listening as you do in Reading. The recording controls the clock. If you hesitate over one uncertain detail, you risk missing the next two questions.',
      },
      {
        type: 'selfCheck',
        title: 'Four Contexts Verification',
        items: [
          'I know that each part contains ten questions for a total of 40 questions.',
          'I understand that computer delivery provides two minutes to review, not ten minutes to transfer.',
          'I know that questions follow chronological audio sequence, while answer options may not.',
          'I recognize that Part 3 features multiple speakers discussing academic tasks, while Part 4 is a formal monologue.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-contexts-plan',
        label: 'Record your planned delivery mode (computer or paper) and note the exact answer entry window.',
      },
    ],
  },

  // 2. l-preview-period (§3.2)
  {
    id: 'l-preview-period',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-1',
    partTitle: 'Part 2.1 · Listening Architecture & Conditions',
    title: 'Use the preview period before audio starts',
    minutes: 6,
    sourceSections: ['3.2'],
    needs: ['l-four-contexts'],
    blocks: [
      {
        type: 'lead',
        summary: 'Every section of the Listening test provides a 30 to 60 second preview period before the recording plays. Efficient previewing identifies grammatical categories, word constraints, and deciding details.',
        whyItMatters: 'Candidates who read passively during preview hear words without knowing where they fit. Structured preview primes your working memory to recognize target answers as they are spoken.',
        whatYouWillDo: 'Master a 9-step preview sequence, predict grammatical slots in question gaps, and avoid wasting preview time writing long synonym lists.',
      },
      {
        type: 'steps',
        title: 'The 9-Step Preview Sequence',
        items: [
          { action: 'Read the instruction heading carefully.', condition: 'Before scanning question stems', why: 'Establishes the exact task type and response requirements.' },
          { action: 'Check the word and number limit.', condition: 'Before reading individual items', why: 'Prevents disqualification from writing excess words like articles or prepositions.' },
          { action: 'Check the number of required answers.', condition: 'When multiple options appear', why: 'Clarifies whether you must choose one, two, or three options.' },
          { action: 'Read the title and subheadings.', condition: 'When reading forms, tables, or notes', why: 'Establishes the overall scenario, topic domain, and expected chronology.' },
          { action: 'Identify the situation and likely sequence of dialogue.', condition: 'Before predicting words', why: 'Frames who is speaking and what their respective roles are.' },
          { action: 'Predict the general information category for each gap.', condition: 'For completion items', why: 'Alerts you to listen for a person, location, time, price, quantity, or reason.' },
          { action: 'Inspect surrounding grammar for slot constraints.', condition: 'When examining sentence gaps', why: 'A gap following an article requires a noun; plural modifiers require plural forms.' },
          { action: 'Compare supplied options to spot critical differences.', condition: 'For multiple choice and matching', why: 'Identifies the precise discriminating words before spoken audio distracts you.' },
          { action: 'Underline key deciding words.', condition: 'In the final seconds before audio plays', why: 'Anchors your eyes on the distinguishing features between options.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'prompt',
        title: 'Grammatical Slot Prediction Specimen',
        segments: [
          { text: 'Conference registration fee: £ [ _________ ] per participant.', note: 'Pre-printed pound symbol means write only the numeric value. Do not write pounds.' },
          { text: 'Workshops take place in the [ _________ ] building.', note: 'Requires a noun or adjective naming a specific building on campus.' },
          { text: 'Attendees must present two official [ _________ ] on arrival.', note: 'Plural cue two requires a plural countable noun such as documents or cards.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Predictions Direct Attention, Not Fixed Answers',
        body: 'A preview prediction directs your listening attention. It never determines the answer before the recording plays. Do not spend preview time writing long synonym lists. Use a few likely meaning cues.',
      },
      {
        type: 'contrastPair',
        title: 'Preview Strategy Comparison',
        weak: {
          text: 'Writing exhaustive lists of possible synonyms for every word in the questions during the 30-second window.',
          whyItFails: 'Consumes critical preview seconds and clutters working memory with unverified word guesses.',
        },
        controlled: {
          text: 'Scanning the headings, marking word limits, and predicting the grammatical category of each gap.',
          whyItWorks: 'Directs sensory focus to notice target data types instantly during single-pass audio playback.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Preview Procedure Verification',
        items: [
          'I always verify the word limit before reading the prompt questions.',
          'I check whether pre-printed units, symbols, or prepositions sit outside the gap.',
          'I use grammar cues such as articles and quantifiers to predict noun number.',
          'I focus on discriminating differences between options rather than writing long synonym lists.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-preview-checklist',
        label: 'Write your 3-point quick scan routine for the opening 15 seconds of any preview window.',
      },
    ],
  },

  // 3. l-complete-message-paraphrase (§3.3, §3.4)
  {
    id: 'l-complete-message-paraphrase',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-2',
    partTitle: 'Part 2.2 · The Core Listening Operations',
    title: 'Follow the complete message and paraphrase',
    minutes: 7,
    sourceSections: ['3.3', '3.4'],
    needs: ['l-preview-period'],
    blocks: [
      {
        type: 'lead',
        summary: 'Speakers in IELTS Listening frequently modify their initial statements, correct misunderstandings, or rephrase ideas using natural synonyms. Listening for the complete message prevents premature answer entry.',
        whyItMatters: 'Test writers intentionally place early plausible options right before a pivot word like however, actually, or but. Entering the first word you recognize leads directly into distractor traps.',
        whatYouWillDo: 'Study spoken timeline shifts, recognize 8 live-tracking pivot signals, analyze paraphrase mappings, and evaluate a verified audio correction specimen.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-listening-timeline',
        title: 'Spoken Correction Timeline',
        caption: 'Initial proposal is superseded by a correction signal: Room 14 is abandoned when the projector failure is announced, making Room 18 the target answer.',
        alt: 'Diagram showing chronological audio timeline from initial proposal Room 14, to pivot signal projector broken, to final verified destination Room 18.',
      },
      {
        type: 'section',
        id: 'eight-tracking-shifts',
        title: 'Eight Live-Tracking Shifts in Spoken English',
        bridge: 'Monitor the audio stream for these recurring shift patterns.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Spoken English does not deliver information in isolated static sentences. Speakers propose ideas, reconsider constraints, correct minor slips, and refine agreements during the dialogue.',
          'To track the true message, keep your pencil or cursor steady until the exchange concludes. Watch for an original plan followed by a correction, a suggestion followed by rejection, or a price followed by a conditional exception.',
        ],
      },
      {
        type: 'steps',
        title: 'How to Track Spoken Pivot Signals',
        items: [
          { action: 'Listen through the initial statement without writing immediately.', condition: 'When a candidate answer is first spoken', why: 'Early statements in IELTS often represent preliminary proposals or outdated plans.' },
          { action: 'Spot contrastive discourse markers like however, actually, or although.', condition: 'When the speaker pauses or pivots', why: 'Discourse markers alert you that the preceding information is being altered or cancelled.' },
          { action: 'Identify the revised detail replacing the earlier statement.', condition: 'Following the pivot marker', why: 'The corrected detail represents the speaker confirmed arrangement.' },
          { action: 'Verify whether both speakers agree on the revised arrangement.', condition: 'In multi-speaker dialogues', why: 'One speaker may suggest a change that the other speaker explicitly rejects.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Question Wording versus Spoken Paraphrase Realizations',
        headers: ['Question Wording', 'Spoken Paraphrase Realization', 'Underlying Meaning Relationship'],
        rows: [
          ['Total cost', 'The full amount you need to pay', 'Noun phrase replaced by descriptive nominal clause.'],
          ['Main difficulty', 'The problem that caused the most trouble', 'Superlative adjective matched to relative clause with superlative quantifier.'],
          ['Current location', 'Where the facility is situated right now', 'Temporal adjective replaced by time adverbial phrase.'],
          ['Reason for choosing', 'Why the committee decided on that option', 'Gerund phrase converted to causal subordinate clause.'],
          ['Chief disadvantage', 'A significant drawback we encountered', 'Formal synonym with parallel negative evaluation.'],
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-l-correction',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Compare Propositions, Not Isolated Keywords',
        body: 'Paraphrase tables show examples of meaning relationships, not mechanical word substitutions. Compare the whole spoken proposition against the question. A familiar keyword often appears inside a rejected distractor.',
      },
      {
        type: 'selfCheck',
        title: 'Complete Message Verification',
        items: [
          'I refrain from recording answers upon hearing the first plausible keyword.',
          'I listen for pivot words like however, but, and actually that signal corrections.',
          'I evaluate whether an option is accepted, rejected, or modified by the speakers.',
          'I recognize that paraphrase replaces grammatical forms while preserving precise meaning.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-message-tracking',
        label: 'Note down three pivot markers you have missed in recent listening drills and their corrected outcomes.',
      },
    ],
  },

  // 4. l-eight-distractors (§3.5)
  {
    id: 'l-eight-distractors',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-2',
    partTitle: 'Part 2.2 · The Core Listening Operations',
    title: 'Separate the eight distractor patterns',
    minutes: 7,
    sourceSections: ['3.5'],
    needs: ['l-complete-message-paraphrase'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS Listening tests use eight systematic distractor patterns. Recognizing how distractors operate allows you to separate incorrect options from supported answers with calm accuracy.',
        whyItMatters: 'Unprepared candidates believe that any word they recognize on the recording must be the correct answer. Distractors deliberately repeat option words in non-matching contexts.',
        whatYouWillDo: 'Inspect the full 8-row distractor taxonomy, study spoken examples of number and facility traps, and complete an interactive diagnostic check.',
      },
      {
        type: 'comparisonTable',
        caption: 'The Eight IELTS Spoken Distractor Patterns',
        headers: ['Distractor Pattern', 'Candidate Risk', 'Systematic Decision Method'],
        rows: [
          ['Changed arrangement', 'Recording the initial proposal before the speaker updates it.', 'Follow the final confirmed decision after all pivot words.'],
          ['Similar options', 'Selecting an option without verifying qualifying conditions.', 'Compare person, reason, timeframe, condition, or attitude.'],
          ['Singular vs plural', 'Recognizing the lexical base but missing the inflectional ending.', 'Listen carefully for plural -s and verify surrounding article syntax.'],
          ['Unusual spelling', 'Substituting a familiar common spelling for an unfamiliar name.', 'Write the exact letters dictated by the speaker letter by letter.'],
          ['Similar acoustic sounds', 'Confusing phonetically close numbers or vowels like fifteen and fifty.', 'Attend to syllable stress patterns and numerical context.'],
          ['Negative qualifier', 'Failing to catch soft negative markers like barely, rarely, or except.', 'Check what the speaker explicitly excludes, denies, or restricts.'],
          ['Quoted viewpoint', 'Attributing a third-party opinion to the speaker himself.', 'Track attribution carefully to determine who actually holds the view.'],
          ['Current versus future', 'Selecting a planned or historical facility instead of current state.', 'Identify the exact tense and temporal status specified in the question.'],
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-l-distractors',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Meaning Checks, Not Paranoia',
        body: 'Treat distractor categories as practical meaning checks. Do not assume every spoken sentence contains a distractor. Most sentences provide direct information. Use distractor checks to verify ambiguous details.',
      },
      {
        type: 'diagnosticCheck',
        title: 'Diagnostic Check: Distractor Identification',
        prompt: 'Listen to the prompt: "The committee originally selected the Riverside Hall for the reception, but catering costs there were prohibitive. We settled on the Guildhall instead, though next year we hope to try the Castle." What is the venue for this year reception?',
        options: [
          { text: 'The Riverside Hall', correct: false, rationale: 'The Riverside Hall was the original choice but was rejected because catering costs were prohibitive.' },
          { text: 'The Guildhall', correct: true, rationale: 'The Guildhall is the confirmed settlement for this year after rejecting Riverside Hall.' },
          { text: 'The Castle', correct: false, rationale: 'The Castle is a future hope for next year, not the confirmed venue for this year.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Handling Distractors in Real Time',
        weak: {
          text: 'Jumping to circle Riverside Hall as soon as the speaker says "originally selected the Riverside Hall".',
          whyItFails: 'Fails to process the contrastive conjunction "but" and records an abandoned arrangement.',
        },
        controlled: {
          text: 'Tracking through the contrastive marker "but" and identifying "settled on the Guildhall" as the final agreement.',
          whyItWorks: 'Evaluates the completed message and selects the option that matches the question timeframe.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Distractor Mastery Checklist',
        items: [
          'I distinguish initial proposals from final confirmed agreements.',
          'I verify noun number by listening for plural morphemes and checking articles.',
          'I distinguish historical features and future proposals from current operations.',
          'I track speaker attribution to separate quoted opinions from personal consensus.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-distractor-log',
        label: 'Record the distractor pattern that most frequently misled you in your recent listening error log.',
      },
    ],
  },

  // 5. l-forms-notes-tables-summaries (§3.6, §3.7)
  {
    id: 'l-forms-notes-tables-summaries',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-3',
    partTitle: 'Part 2.3 · Question Families',
    title: 'Forms, notes, summaries, tables, and flow charts',
    minutes: 7,
    sourceSections: ['3.6', '3.7'],
    needs: ['l-eight-distractors'],
    blocks: [
      {
        type: 'lead',
        summary: 'Completion tasks organize spoken facts into visual frameworks: forms, structured notes, summaries, tables, and procedural flow charts. Success depends on using layout headers to anticipate data categories.',
        whyItMatters: 'Candidates often hear a correct fact but write it in the wrong table row. Failing to notice pre-printed units also causes disqualification.',
        whatYouWillDo: 'Analyze six common form categories, audit pre-printed currency and unit rules on an annotated specimen, and master structural reading for tables and flow charts.',
      },
      {
        type: 'section',
        id: 'six-form-categories',
        title: 'Six Common Form Detail Categories',
        bridge: 'Forms in Part 1 routinely request specific factual data across these categories.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Part 1 forms and customer enquiry notes follow predictable transactional scripts. When previewing a form, scan the printed labels on the left margin to predict the category of detail required in each blank.',
          'Common details include names, postal addresses, telephone numbers, dates, and times. Forms also request prices, quantities, materials, or required follow-up actions.',
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'prompt',
        title: 'Pre-Printed Units and Word Limits Specimen',
        segments: [
          { text: 'Registration deposit: £ [ _________ ]', note: 'Pre-printed pound sign outside gap. Write only the numeric value (e.g. 25). Writing "£25" or "25 pounds" violates formatting rules.' },
          { text: 'Course duration: [ _________ ] weeks', note: 'Pre-printed unit "weeks" sits outside gap. Write only the number (e.g. 6 or six). Do not write "six weeks".' },
          { text: 'Preferred accommodation: [ _________ ]', note: 'Instruction states NO MORE THAN TWO WORDS. An answer like "a private family home" has 4 words and receives zero marks.' },
        ],
      },
      {
        type: 'steps',
        title: 'Structural Reading for Tables, Summaries, and Flow Charts',
        items: [
          { action: 'Read column and row headers to establish data coordinates.', condition: 'When analyzing a completion table', why: 'Headers determine the exact category intersection where the target answer belongs.' },
          { action: 'Follow the chronological progression arrows from step to step.', condition: 'When previewing a flow chart', why: 'Flow charts depict sequential procedures; answers follow the sequence arrows strictly.' },
          { action: 'Read the title and skim connecting sentences for overarching context.', condition: 'When analyzing a summary completion', why: 'Summaries condense spoken arguments into cohesive academic prose.' },
          { action: 'Inspect printed sample rows or completed steps.', condition: 'Before listening starts', why: 'Completed cells demonstrate the expected grammatical form, capitalization, and phrasing.' },
          { action: 'Verify that the heard detail belongs to the active row or stage.', condition: 'While the recording is playing', why: 'A true spoken fact may belong to an adjacent row or earlier stage of the process.' },
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Copying the Exact Spoken Form',
        body: 'If the task instruction specifies NO MORE THAN ONE WORD, write only the single word heard on the audio. Do not add descriptive adjectives or explanations. Copy the required lexical item accurately.',
      },
      {
        type: 'contrastPair',
        title: 'Table and Flow Chart Completion Accuracy',
        weak: {
          text: 'Hearing the speaker mention "laboratory safety glasses" and writing "safety glasses" when the instruction specifies ONE WORD ONLY.',
          whyItFails: 'Violates the explicit word limit and results in zero marks regardless of conceptual relevance.',
        },
        controlled: {
          text: 'Writing "glasses" or identifying whether "goggles" was the exact single word spoken by the lecturer.',
          whyItWorks: 'Complies strictly with word count constraints while capturing the target noun accurately.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Completion Task Checklist',
        items: [
          'I check whether currency symbols, measurement units, or articles are pre-printed.',
          'I align my attention to row and column headers when completing tables.',
          'I follow sequential flow chart arrows rather than jumping across stages.',
          'I verify that my final answer strictly obeys the stated word and number limit.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-completion-checks',
        label: 'Review your last table completion drill and identify any answer where a pre-printed unit was duplicated.',
      },
    ],
  },

  // 6. l-sentences-short-answers (§3.8)
  {
    id: 'l-sentences-short-answers',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-3',
    partTitle: 'Part 2.3 · Question Families',
    title: 'Sentence completion and short-answer questions',
    minutes: 6,
    sourceSections: ['3.8'],
    needs: ['l-forms-notes-tables-summaries'],
    blocks: [
      {
        type: 'lead',
        summary: 'Sentence completion requires inserting exact spoken words into grammatically coherent statements. Short-answer questions require extracting specific informational units without unnecessary phrasing.',
        whyItMatters: 'Violating sentence syntax results in lost marks. Answering a "Where" question with a "Why" explanation also fails, even if you understood the audio.',
        whatYouWillDo: 'Execute a 5-step sentence completion procedure, master a 3-step short-answer routine, and eliminate wrapper words that breach limits.',
      },
      {
        type: 'steps',
        title: '5-Step Sentence Completion Procedure',
        items: [
          { action: 'Read the incomplete sentence completely.', condition: 'During the preview period', why: 'Establishes the grammatical environment and logical context of the missing item.' },
          { action: 'Predict the word class and semantic field of the gap.', condition: 'Before audio playback', why: 'Determines whether the gap requires a singular noun, plural noun, verb, or adjective.' },
          { action: 'Track the audio until you hear the sentence paraphrase.', condition: 'While the speaker speaks', why: 'Sentence completion items always rephrase prompt text using spoken equivalents.' },
          { action: 'Extract the exact word or words spoken in the audio.', condition: 'As the target detail is uttered', why: 'You must not change the form of the word heard on the recording.' },
          { action: 'Read back the completed sentence silently.', condition: 'During the post-section pause', why: 'Confirms that the inserted words make complete, correct grammatical sense in the carrier sentence.' },
        ],
      },
      {
        type: 'steps',
        title: '3-Step Short-Answer Question Procedure',
        items: [
          { action: 'Identify the question interrogative word.', condition: 'During preview', why: 'Question words like Who, Where, When, What, or Which define the exact information target.' },
          { action: 'Listen specifically for the target entity or circumstance.', condition: 'During playback', why: 'Filters out background contextual explanations to capture the specific target datum.' },
          { action: 'Record the isolated detail within the word limit.', condition: 'Upon hearing the answer', why: 'Omits unnecessary carrier phrases that cause word-limit penalties.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Short Answer Precision',
        weak: {
          text: 'Question: "Where will the exhibition be held?" Candidate writes: "Because the main gallery is under renovation, in the north pavilion."',
          whyItFails: 'Gives an unsolicited causal reason when the question word asks Where, and drastically exceeds the word limit.',
        },
        controlled: {
          text: 'Candidate writes: "North pavilion" or "The north pavilion".',
          whyItWorks: 'Directly answers the spatial question word within the two-word limit without conversational padding.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Unnecessary Wrapper Words',
        body: 'Do not add conversational wrapper words around a correct detail. If the question asks what equipment students must bring and the answer is "ruler", do not write "they must bring a ruler". Writing wrapper words breaches word limits and forfeits the mark.',
      },
      {
        type: 'selfCheck',
        title: 'Sentence and Short Answer Checklist',
        items: [
          'I read the completed sentence to confirm that the inserted word produces correct grammar.',
          'I match short answers strictly to the question interrogative (Who, Where, When, What).',
          'I strip unnecessary wrapper words to remain strictly within the word limit.',
          'I preserve the exact grammatical form spoken on the recording without alteration.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-short-answers',
        label: 'Write down two sentence completion items from recent practice and verify their grammatical fit.',
      },
    ],
  },

  // 7. l-multiple-choice-matching (§3.9, §3.10)
  {
    id: 'l-multiple-choice-matching',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-3',
    partTitle: 'Part 2.3 · Question Families',
    title: 'Multiple choice and matching',
    minutes: 7,
    sourceSections: ['3.9', '3.10'],
    needs: ['l-sentences-short-answers'],
    blocks: [
      {
        type: 'lead',
        summary: 'Multiple-choice and matching questions evaluate your ability to track subtle qualifications, speaker consensus, and attitude shifts across competing alternatives.',
        whyItMatters: 'Test writers mention almost every option letter in the recording. Candidates who choose an option merely because they heard its keywords will consistently fall into distractor traps.',
        whatYouWillDo: 'Execute an 8-step multiple-choice routine, analyze four critical scope distinctions, and apply pre- and live-listening matching protocols.',
      },
      {
        type: 'steps',
        title: '8-Step Multiple-Choice Execution Routine',
        items: [
          { action: 'Read the question stem carefully to establish its exact scope.', condition: 'During preview', why: 'The stem defines whether you need a reason, a consequence, a shared decision, or a single view.' },
          { action: 'Identify how many answers are required.', condition: 'Before reading options', why: 'Some tasks require choosing ONE letter; others require choosing TWO letters from five options.' },
          { action: 'Compare the supplied options to isolate distinguishing differences.', condition: 'During preview', why: 'Options often share topics but differ in degree, agent, timing, or certainty.' },
          { action: 'Restate the difference between options in plain language.', condition: 'Before audio starts', why: 'Reduces cognitive load when matching fast-paced spoken ideas in real time.' },
          { action: 'Listen through the entire relevant spoken exchange.', condition: 'During playback', why: 'Speakers frequently mention an option only to qualify, reject, or postpone it.' },
          { action: 'Eliminate options that the recording contradicts or dismisses.', condition: 'As audio progresses', why: 'Systematic elimination narrows the viable candidates to the supported answer.' },
          { action: 'Select the option supported by the full proposition.', condition: 'Once the exchange concludes', why: 'Ensures your selection matches the confirmed outcome of the dialogue.' },
          { action: 'Immediately switch focus to the next question stem.', condition: 'After marking your choice', why: 'Prevents lingering on completed items and missing the opening words of the next prompt.' },
        ],
      },
      {
        type: 'section',
        id: 'four-scope-distinctions',
        title: 'Four Critical Multiple-Choice Scope Distinctions',
        bridge: 'Master these four discriminating dimensions to eliminate plausible distractors.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Multiple-choice distractors are constructed by shifting one specific element of a proposition. You must track what one individual speaker thinks versus what both speakers mutually agree on.',
          'Similarly, separate a mentioned benefit from the main reason why a final decision was adopted. An option describing an earlier historical opinion must not be confused with the final confirmed opinion. Finally, distinguish a factual statement about a facility from the specific reason that facility was selected.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Mention Does Not Equal Support',
        body: 'The recording will typically mention every option letter. Mere mention does not make an option correct. Verify whether the speaker endorses, refutes, or modifies the option before selecting it.',
      },
      {
        type: 'steps',
        title: 'Pre- and Live-Listening Matching Procedure',
        items: [
          { action: 'Read the option list and assign a short meaning keyword to each option.', condition: 'Pre-listening', why: 'Allows instant visual scanning while your ears track continuous speech.' },
          { action: 'Check whether options can be used more than once.', condition: 'Pre-listening', why: 'Instructions indicating "You may use any letter more than once" change elimination logic.' },
          { action: 'Check whether the answer requires a letter or words.', condition: 'Pre-listening', why: 'Entering full words when a letter is required results in automatic zero credit.' },
          { action: 'Anchor your attention on the numbered stem items.', condition: 'Live listening', why: 'Numbered items are discussed in strict chronological sequence in the recording.' },
          { action: 'Track the complete description or argument for each numbered item.', condition: 'Live listening', why: 'The speaker will often mention features of several options before confirming the match.' },
          { action: 'Record the matching letter and prepare for the next stem.', condition: 'Live listening', why: 'Do not assume the last remaining option must match the final stem; unused options are common.' },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Multiple Choice and Matching Verification',
        items: [
          'I check whether the question requires choosing one letter or multiple letters.',
          'I distinguish what one speaker suggests from what both speakers jointly accept.',
          'I recognize that hearing a keyword from an option does not make that option correct.',
          'I remember that matching tasks often leave some options completely unused.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-mc-matching',
        label: 'Audit a recent multiple-choice drill and identify an option that was mentioned in audio but rejected by context.',
      },
    ],
  },

  // 8. l-maps-plans-diagrams (§3.11)
  {
    id: 'l-maps-plans-diagrams',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-3',
    partTitle: 'Part 2.3 · Question Families',
    title: 'Maps, plans, and route tracking',
    minutes: 7,
    sourceSections: ['3.11'],
    needs: ['l-multiple-choice-matching'],
    blocks: [
      {
        type: 'lead',
        summary: 'Map, plan, and diagram tasks require following spatial navigation and sequential physical layouts. Success requires establishing starting orientation and tracking direction of travel.',
        whyItMatters: 'Words like left and right are determined by the speaker direction of travel along a route, not your static view from the desk. Missing a turn causes every subsequent location to be misidentified.',
        whatYouWillDo: 'Study the Bellford Centre architectural layout diagram, master pre- and live-listening route steps, review nine spatial preposition groups, and evaluate a verified navigation audio tour.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-listening-map-bellford',
        title: 'Bellford Study Centre Layout',
        caption: 'Architectural floor plan illustrating Main Entrance, Courtyard Garden, Cafe, corridors, and rooms A through F with compass orientation.',
        alt: 'Architectural floor plan of Bellford Study Centre with labelled rooms A to F, entrance, garden, cafe, and north compass arrow.',
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-l-map-route',
      },
      {
        type: 'steps',
        title: 'Pre-Listening Map and Plan Protocol',
        items: [
          { action: 'Identify the required response format (letters A–F or descriptive words).', condition: 'Step 1 of 6', why: 'Entering room names when letters are required invalidates the answer.' },
          { action: 'Locate the entrance, reception, or starting position ("You are here").', condition: 'Step 2 of 6', why: 'The speaker always begins route narration from an explicit physical anchor.' },
          { action: 'Check the orientation or compass rose (North, South, East, West).', condition: 'Step 3 of 6', why: 'Guides navigation when speakers use cardinal directions rather than relative turns.' },
          { action: 'Identify permanent named landmarks (corridors, courtyard, cafe, stairs).', condition: 'Step 4 of 6', why: 'Permanent landmarks act as spatial waypoints during live narration.' },
          { action: 'Trace prospective route corridors branching from the start.', condition: 'Step 5 of 6', why: 'Pre-traces the physical paths the speaker can follow through the building.' },
          { action: 'Anticipate location prepositions relevant to the layout.', condition: 'Step 6 of 6', why: 'Primes your ears to catch prepositional phrases like opposite, adjacent to, or past.' },
        ],
      },
      {
        type: 'steps',
        title: 'Live Route Tracking Actions',
        items: [
          { action: 'Place your cursor or pencil tip physically on the starting position.', condition: 'When audio narration begins', why: 'Physical tracking keeps your visual attention synchronized with spoken movement.' },
          { action: 'Follow each turn along the direction of travel.', condition: 'As directions are given', why: 'Left and right correspond to the speaker facing forward along the path.' },
          { action: 'Use named landmarks to confirm that you have not drifted.', condition: 'At intermediate waypoints', why: 'Re-verifies your current position on the map before the target room is named.' },
          { action: 'Distinguish current rooms from closed, former, or proposed rooms.', condition: 'When locations are described', why: 'Speakers frequently mention former or planned functions as distractors.' },
          { action: 'Confirm the final target position and record its letter.', condition: 'When the speaker confirms the location', why: 'Ensures you record the letter representing the requested facility.' },
          { action: 'Reset your pencil or cursor to the primary junction for the next item.', condition: 'Immediately after marking the letter', why: 'The speaker may describe the next location from the main junction or entrance.' },
        ],
      },
      {
        type: 'section',
        id: 'nine-spatial-groups',
        title: 'Nine Essential Spatial Preposition Groups',
        bridge: 'Master these spatial relational phrases commonly spoken during map tours.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Spatial questions rely on standard prepositional pairings. Examples include "next to", "beside", "opposite", "across from", "between", "beyond", and "at the far end of" a corridor.',
          'Speakers also use "on the corner of", "inside", "outside", and cardinal directions like "to the north". Directional turns follow the route direction of travel.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Write the Letter, Never the Name',
        body: 'When a map instruction requires selecting letters (A–F), write only the single capital letter in your answer. Never write the room name or descriptive phrase. Writing "Room D" or "IT Workshop" when "D" is required forfeits the mark.',
      },
      {
        type: 'selfCheck',
        title: 'Map and Plan Navigation Checklist',
        items: [
          'I find the starting entrance or "You are here" marker before audio begins.',
          'I check the compass rose for North, South, East, and West orientations.',
          'I follow left and right relative to the direction of travel, not my desk.',
          'I write the requested option letter (A–F) rather than writing out the room name.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-map-practice',
        label: 'Trace a corridor route from recent map practice and verify whether any turn was confused by desk orientation.',
      },
    ],
  },

  // 9. l-discussions-and-lectures (§3.12, §3.13)
  {
    id: 'l-discussions-and-lectures',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-3',
    partTitle: 'Part 2.3 · Question Families',
    title: 'Part 3 discussions and Part 4 lectures',
    minutes: 8,
    sourceSections: ['3.12', '3.13'],
    needs: ['l-maps-plans-diagrams'],
    blocks: [
      {
        type: 'lead',
        summary: 'Part 3 features collaborative academic discussions with multiple speakers, while Part 4 features an uninterrupted academic lecture. Succeeding in these advanced parts requires tracking argument evolution and discourse signposts.',
        whyItMatters: 'Part 3 questions test who holds what view after debate, not just who spoke first. Part 4 tests sustained concentration through academic classification without audio pauses.',
        whatYouWillDo: 'Track multi-speaker discussions, analyze tutor feedback nuances, interpret lecture macro-signposts, and study two authentic academic audio blueprints.',
      },
      {
        type: 'section',
        id: 'part3-argument-tracking',
        title: 'Part 3: Tracking Developing Academic Arguments',
        bridge: 'Follow this 7-stage progression when listening to university tutorials.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Part 3 typically involves two students discussing an assignment or research project with a tutor or professor. The discussion does not present static facts; ideas evolve through proposal, critique, and revision.',
          'To follow the exchange, track the specific issue under discussion and identify who makes a proposal. Next, note partial agreements or objections, and record the final revised consensus.',
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-l-part3-attribution',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Tutor Criticism of Part Does Not Reject All',
        body: 'When a tutor criticizes one specific aspect of a student proposal (such as sample size), do not assume the entire project is rejected. Listen carefully to identify which elements are approved and which require revision.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Intonation Alone Is Unreliable',
        body: 'Use spoken wording and grammatical delivery together to interpret a speaker attitude. Spoken intonation alone is not a reliable shortcut. An enthusiastic tone may introduce an idea that the speaker subsequently qualifies or abandons.',
      },
      {
        type: 'section',
        id: 'part4-lecture-structure',
        title: 'Part 4: Following Continuous Academic Lectures',
        bridge: 'Lectures run without an internal break. Use headings to navigate major structural shifts.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Part 4 presents a sustained monologue on an academic topic such as urban planning, marine biology, or industrial design. There is no pause between question 35 and 36, requiring continuous focused tracking.',
          'Lecturers signal their logical architecture through explicit discourse markers: definitions, classifications, temporal sequences, causal links, comparative analyses, illustrative examples, topic shifts, and final summaries.',
        ],
      },
      {
        type: 'mediaSlot',
        slotId: 'slot-l-part4-signposts',
      },
      {
        type: 'contrastPair',
        title: 'Illustrative Example versus Main Academic Concept',
        weak: {
          text: 'Recording the specific example "central Tokyo heat in August" as the overarching cause of urban heat retention.',
          whyItFails: 'Confuses a concrete illustrative case study with the primary conceptual category being taught.',
        },
        controlled: {
          text: 'Recording "thermal properties of building materials" as the category and noting Tokyo as supporting evidence.',
          whyItWorks: 'Separates structural lecture points from illustrative examples and answers the specific prompt accurately.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Discussions and Lectures Checklist',
        items: [
          'I track speaker attribution in Part 3 to distinguish student proposals from tutor advice.',
          'I recognize that a critique of one detail does not mean total rejection of a plan.',
          'I use lecture headings to anchor my progress across all 10 continuous Part 4 items.',
          'I distinguish primary lecture concepts from temporary illustrative examples.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-academic-tracking',
        label: 'Note the discourse signposts that signaled major transitions in your last Part 4 practice test.',
      },
    ],
  },

  // 10. l-entry-and-recovery (§3.14, §3.15)
  {
    id: 'l-entry-and-recovery',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-4',
    partTitle: 'Part 2.4 · Execution, Error Recovery & Diagnosis',
    title: 'Enter answers accurately and recover after a miss',
    minutes: 6,
    sourceSections: ['3.14', '3.15'],
    needs: ['l-discussions-and-lectures'],
    blocks: [
      {
        type: 'lead',
        summary: 'Correctly understanding spoken information earns marks only if entered with exact spelling, grammatical agreement, and adherence to instructions. If a question is missed, immediate psychological recovery protects the remaining test.',
        whyItMatters: 'A single spelling error or an added article that exceeds the word limit turns a correct comprehension into zero marks. Lingering on a missed question causes a cascade of multiple missed answers.',
        whatYouWillDo: 'Execute a 7-point answer entry check, learn official hyphenation and word count rules, and implement a 5-step recovery sequence after a missed item.',
      },
      {
        type: 'section',
        id: 'seven-point-entry-check',
        title: 'The 7-Point Answer Entry Check',
        bridge: 'Verify every entered answer against these seven quality dimensions.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Every answer you enter on screen or paper must satisfy strict mechanical and grammatical conditions before you finalize the test.',
          'Check the stated word limit, the number limit, exact English spelling, and singular or plural noun endings. Also check pre-printed units outside the blank and whether the task mandates a letter.',
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Articles, Prepositions, and Hyphenated Words',
        body: 'Articles (a, an, the) and prepositions count as individual words toward word limits. Official IELTS guidelines treat hyphenated words such as "check-in" or "part-time" as single words. Follow the task instructions strictly.',
        link: { url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening', text: 'Official IELTS Listening Test Completion Guidelines' },
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Capitalization Options in Listening',
        body: 'You may write your answers entirely in UPPER CASE or in lower case. Writing in all capitals can prevent ambiguity regarding proper nouns, but it is an optional personal choice. All-caps does not protect against spelling errors.',
      },
      {
        type: 'steps',
        title: '5-Step Immediate Recovery Sequence After a Missed Answer',
        items: [
          { action: 'Acknowledge immediately that one question has passed.', condition: 'When you realize audio has moved ahead', why: 'Denial or panic wastes valuable cognitive resources while the recording continues.' },
          { action: 'Enter your best plausible guess instantly if possible.', condition: 'If any partial impression remains', why: 'There is no negative marking in IELTS; an educated guess may secure the mark.' },
          { action: 'Cease all mental reconstruction of the missed sentence.', condition: 'Immediately upon guessing', why: 'Trying to replay missed sounds blocks your ears from processing incoming speech.' },
          { action: 'Scan ahead to identify the next question keyword or topic.', condition: 'Before the speaker speaks further', why: 'Re-anchors your eyes on the upcoming section of the question sheet.' },
          { action: 'Re-synchronize your listening with the active audio stream.', condition: 'As new speech is heard', why: 'Protects the remaining items in the section from cascading error chains.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Handling a Missed Item in Real Time',
        weak: {
          text: 'Panicking after missing Question 14, staring at the blank, and trying to recall what the clerk said about dates while Question 15 and 16 play.',
          whyItFails: 'Turning one missed mark into three missed marks through cognitive freeze.',
        },
        controlled: {
          text: 'Entering a fast guess for Question 14, immediately reading Question 15, and listening for its opening signpost.',
          whyItWorks: 'Isolates the lost mark to Question 14 and preserves full concentration for Questions 15 and 16.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Answer Entry and Recovery Checklist',
        items: [
          'I verify that pre-printed currency symbols or units are not repeated in my answer.',
          'I count articles and prepositions as independent words when checking limits.',
          'I know that hyphenated compounds like "first-aid" count as single words.',
          'I cut my losses instantly on a missed item to protect the next questions.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-recovery-rule',
        label: 'Write down your personal 3-second reset action for recovering when you lose track of the audio.',
      },
    ],
  },

  // 11. l-diagnosis-microlistening-pitfalls (§3.16, §3.17, §3.18, §3.19)
  {
    id: 'l-diagnosis-microlistening-pitfalls',
    area: 'listening',
    track: 'shared',
    partId: 'l-part-2-4',
    partTitle: 'Part 2.4 · Execution, Error Recovery & Diagnosis',
    title: 'Diagnose errors, micro-listen, and build stamina',
    minutes: 8,
    sourceSections: ['3.16', '3.17', '3.18', '3.19'],
    needs: ['l-entry-and-recovery'],
    blocks: [
      {
        type: 'lead',
        summary: 'Improving Listening band scores requires targeted diagnostic inspection rather than passive test repetition. Micro-listening trains recognition of connected speech, while stamina ladders build sustained concentration.',
        whyItMatters: 'Candidates who repeat practice tests without diagnosis make the same phonetic and distractor errors indefinitely. Diagnosing the exact cause of each error turns mistakes into permanent skill gains.',
        whatYouWillDo: 'Analyze the 9-row Listening diagnostic matrix, execute an 8-step micro-listening drill, structure a stamina ladder, and audit all 14 official Listening pitfalls.',
      },
      {
        type: 'comparisonTable',
        caption: 'The 9-Row Listening Error Diagnostic Matrix',
        headers: ['Diagnostic Observation', 'Probable Underlying Cause', 'Evidence to Inspect in Review', 'Targeted Remedial Action'],
        rows: [
          ['Answer clear in transcript but missed in audio', 'Connected speech features (elision, weak forms, linking)', 'Inspect the exact phrase boundaries and reduced vowels', 'Micro-listening transcription drills on the specific 5-second audio clip.'],
          ['Transcript contains unknown vocabulary or grammar', 'Lexical or syntactic gap', 'Underline unfamiliar headwords and clause structures', 'Contextual vocabulary study and sentence pattern recording.'],
          ['Selected an old or preliminary piece of information', 'Missed pivot word or correction signal', 'Examine the timeline: original statement → pivot marker → revision', 'Map spoken timelines and practice tracking discourse signals.'],
          ['Correct fact was heard but marked wrong', 'Spelling error, number error, or instruction breach', 'Compare entered answer character by character against key', 'Targeted spelling drills on silent letters and double consonants.'],
          ['Repeated errors clustered in one question family', 'Flawed task execution method', 'Review question prompt directions and your preview steps', 'Study worked specimens and procedural steps for that specific family.'],
          ['Discussion items in Part 3 fail repeatedly', 'Speaker attribution or argument tracking failure', 'Map who proposed each idea and who agreed or disagreed', 'Summarize each speaker perspective in two-column tutorial notes.'],
          ['Lecture items in Part 4 fail repeatedly', 'Lost lecture structure or overwhelmed by academic density', 'Inspect heading alignment and discourse signposts in transcript', 'Outline short academic lectures by topic, category, and example.'],
          ['Errors increase sharply in later sections', 'Multiple potential factors: vocabulary, pace, or fatigue', 'Check whether earlier sections also had borderline uncertainty', 'Isolate whether language level or stamina caused the late breakdown.'],
          ['Errors appear randomly scattered across all parts', 'Inconsistent attention, acoustic slips, or task confusion', 'Inspect the exact moment of each missed item', 'Evaluate each error independently rather than assuming one general flaw.'],
        ],
      },
      {
        type: 'steps',
        title: 'The 8-Step Micro-Listening Routine',
        items: [
          { action: 'Select the specific sentence or phrase that caused the error.', condition: 'Step 1 of 8', why: 'Isolates the exact acoustic boundary where comprehension broke down.' },
          { action: 'Listen to the 5-second audio segment with transcript closed.', condition: 'Step 2 of 8', why: 'Forces your auditory processing to attend to sound patterns without visual support.' },
          { action: 'Transcribe every sound, syllable, and word you can identify.', condition: 'Step 3 of 8', why: 'Externalizes your auditory perception to reveal exact perceptual gaps.' },
          { action: 'Replay the segment to inspect unclear acoustic boundaries.', condition: 'Step 4 of 8', why: 'Helps locate elided consonants, linking sounds, or reduced vowels.' },
          { action: 'Open the official transcript to check the actual wording.', condition: 'Step 5 of 8', why: 'Resolves acoustic ambiguity by confirming authentic English orthography.' },
          { action: 'Analyze why the spoken sound differed from your expectation.', condition: 'Step 6 of 8', why: 'Connects phonological theory to practical perception.' },
          { action: 'Listen again while reading the transcript silently.', condition: 'Step 7 of 8', why: 'Binds the visual orthography to the native spoken acoustic pattern.' },
          { action: 'Listen once more with the transcript closed to verify clarity.', condition: 'Step 8 of 8', why: 'Confirms that your brain now parses the connected speech sequence automatically.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Speed Reduction Caveat',
        body: 'Slowing down audio playback to 0.75x can assist initial diagnostic inspection of unclear sounds. However, always return to 1.0x normal speed once the phrase boundaries are identified. Practicing exclusively at reduced speed impairs examination readiness.',
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Concentration Stamina Ladder and Accents',
        body: 'Build listening stamina gradually using a ladder: 5, 7, 10, 15, and finally 30 minutes of continuous focus. Familiarize yourself with the four primary official IELTS accent varieties: British, Australian, New Zealand, and North American English.',
      },
      {
        type: 'selfCheck',
        title: 'The 14 Official Listening Pitfalls Audit',
        items: [
          'Selecting the first familiar word before the full exchange concludes.',
          'Ignoring a spoken correction, contrastive pivot, or soft negative marker.',
          'Confusing arrival or departure times with event start times.',
          'Confusing an included service with an optional or excluded service.',
          'Assigning a proposed view to the wrong speaker in tutorial discussions.',
          'Ignoring singular or plural noun inflectional endings (-s / -es).',
          'Entering more words than permitted by the explicit task instructions.',
          'Writing a full location name when the question explicitly requires a letter.',
          'Allowing one uncertain or missed item to consume attention for the next item.',
          'Treating every unfamiliar technical word as essential to answering the question.',
          'Attributing every late error to poor concentration rather than lexical gaps.',
          'Using repeated audio replays as false proof of unassisted exam readiness.',
          'Assuming that a minor spelling error results in a fixed band deduction.',
          'Assuming that a preferred delivery mode ensures an improved score.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-l-pitfalls-audit',
        label: 'Select three of the 14 pitfalls above that have occurred in your practice and record your corrective action.',
      },
    ],
  },
]
