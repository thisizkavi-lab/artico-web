/**
 * Artico IELTS Study Course · Module 4A: Writing Foundations (4 Units)
 *
 * Source coverage:
 *   - Part 4.1: §5.1, §5.2, §5.3, §5.4, §5.5, §5.6, §5.7, §5.8, §5.9, §5.10 (4 units:
 *       w-purposes-and-criteria, w-coherence-vs-cohesion,
 *       w-words-and-grammar-for-meaning, w-process-timing-length-review)
 * Total: 4 units
 */

export const writingFoundationsUnits = [
  // 1. w-purposes-and-criteria (§5.1, §5.2)
  {
    id: 'w-purposes-and-criteria',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-1',
    partTitle: 'Part 4.1 · Writing Foundations & Scoring Criteria',
    title: 'Three writing tasks and the four criteria',
    minutes: 7,
    sourceSections: ['5.1', '5.2'],
    needs: ['ov-format-and-timing'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS Writing requires distinct rhetorical modes across its three tasks. Success depends on understanding task purposes and applying the four official assessment criteria during drafting and review.',
        whyItMatters: 'Writing an argumentative essay when a factual report is required, or failing to address an instruction prompt, severely limits your band score regardless of vocabulary sophistication.',
        whatYouWillDo: 'Compare the three writing tasks, analyze the four assessment criteria, understand task weighting, and evaluate official band descriptors.',
      },
      {
        type: 'trackCompare',
        title: 'Comparing the Three IELTS Writing Tasks',
        academic: {
          points: [
            'Academic Task 1: Objective factual report of supplied visual data (charts, graphs, maps, diagrams).',
            'Minimum length: 150 words. Recommended timing: approximately 20 minutes.',
            'Strictly non-argumentative: zero personal opinion, speculation, or external causation permitted.',
          ],
        },
        generalTraining: {
          points: [
            'General Training Task 1: Practical letter answering three bullet points for a specified situation and reader.',
            'Task 2 (Shared across both tracks): Formal discursive essay evaluating a specific social, educational, or environmental issue.',
            'Task 2 minimum length: 250 words. Recommended timing: approximately 40 minutes.',
          ],
        },
      },
      {
        type: 'comparisonTable',
        caption: 'The Four IELTS Writing Assessment Criteria',
        headers: ['Assessment Criterion', 'Primary Focus of Criterion', 'Core Review Question to Ask Yourself'],
        rows: [
          ['Task Achievement (Task 1) / Task Response (Task 2)', 'Fulfilling prompt instructions, selecting main features, and sustaining a clear position.', 'Did I answer every part of the prompt with accurate, relevant, and fully developed evidence?'],
          ['Coherence and Cohesion', 'Logical progression of paragraphs, clarity of central topics, and natural sentence reference.', 'Can the examiner follow the logical flow of my arguments and paragraph transitions effortlessly?'],
          ['Lexical Resource', 'Range and precision of vocabulary, collocation awareness, and minimal spelling errors.', 'Do my word choices convey exact shades of meaning without awkward or distorted synonyms?'],
          ['Grammatical Range and Accuracy', 'Mix of complex sentence structures, clause control, and frequency of error-free sentences.', 'Do I control complex grammatical structures accurately without recurring agreement errors?'],
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Task 2 Carries Double Weight',
        body: 'The four criteria carry equal weight within each task. However, Task 2 contributes twice as much as Task 1 toward your final overall Writing band score. Both tasks must be completed to achieve a competitive score.',
        link: { url: 'https://ielts.org/cdn/Guides/ielts-writing-key-assessment-criteria.pdf', text: 'Official IELTS Writing Key Assessment Criteria PDF' },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Vocabulary Cannot Rescue an Unanswered Prompt',
        body: 'Advanced lexical resource cannot repair an unanswered prompt demand. Omitting an overview in Task 1 or leaving prompt questions unanswered in Task 2 strictly caps your band score.',
      },
      {
        type: 'selfCheck',
        title: 'Writing Architecture Verification',
        items: [
          'I distinguish the reporting mode of Task 1 from the argumentative mode of Task 2.',
          'I allocate approximately 40 minutes to Task 2 to reflect its double weighting.',
          'I evaluate my drafts against all four criteria rather than focusing only on vocabulary.',
          'I ensure every prompt question receives explicit, balanced development.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-criteria-plan',
        label: 'Identify which of the four assessment criteria represents your primary area for improvement.',
      },
    ],
  },

  // 2. w-coherence-vs-cohesion (§5.3)
  {
    id: 'w-coherence-vs-cohesion',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-1',
    partTitle: 'Part 4.1 · Writing Foundations & Scoring Criteria',
    title: 'Separate coherence from cohesion',
    minutes: 7,
    sourceSections: ['5.3'],
    needs: ['w-purposes-and-criteria'],
    blocks: [
      {
        type: 'lead',
        summary: 'Coherence is the underlying logical architecture of your response, while cohesion is the linguistic glue that connects sentences. Separating the two prevents the mechanical overuse of transition linkers.',
        whyItMatters: 'Many candidates believe that opening every sentence with words like "Moreover" or "Furthermore" produces a high score. Mechanical linking irritates examiners and lowers Coherence and Cohesion.',
        whatYouWillDo: 'Distinguish macro-coherence from micro-cohesion, analyze reference tools, study an annotated contrast pair, and eliminate connective clutter.',
      },
      {
        type: 'comparisonTable',
        caption: 'Coherence versus Cohesion in Academic Writing',
        headers: ['Dimension', 'Coherence (Macro Organization)', 'Cohesion (Micro Linguistic Binding)'],
        rows: [
          ['Definition', 'The logical organization and thematic clarity of the message.', 'The grammatical and lexical devices that connect sentences.'],
          ['Structural level', 'Whole text and paragraph level.', 'Sentence-to-sentence and clause-to-clause level.'],
          ['Primary components', 'Clear central topic per paragraph, logical sequencing, and reasoned conclusions.', 'Pronouns, demonstratives, lexical repetition, synonyms, and conjunctions.'],
          ['Diagnostic question', 'Does this paragraph have a clear job that develops the overall thesis?', 'Does this sentence connect smoothly to the preceding idea?'],
          ['Examiner warning', 'Random paragraphing and contradictory arguments undermine coherence.', 'Overusing mechanical transition words lowers cohesion scores.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Mechanical Transition Overuse versus Natural Reference',
        weak: {
          text: 'Public transport should be subsidized. Moreover, buses reduce carbon emissions. Furthermore, trains carry more passengers. Therefore, cities become cleaner. Consequently, traffic congestion decreases.',
          whyItFails: 'Every sentence begins mechanically with a rigid transition word. The text reads like a disjointed list rather than connected prose.',
        },
        controlled: {
          text: 'Subsidizing public transport delivers substantial environmental benefits. Expanding electric bus networks directly curtails urban emissions, while high-capacity trains remove private vehicles from arterial roads. As a result, cities achieve cleaner air and reduced congestion.',
          whyItWorks: 'Uses grammatical subordination, precise nominal phrases, and pronouns to establish natural logical flow with minimal connective friction.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Transitions Do Not Create Logic',
        body: 'Writing "moreover" does not create a logical addition. Writing "therefore" does not prove a causal relationship. Logic must exist in the relationship between your ideas before a transition word is added.',
      },
      {
        type: 'steps',
        title: 'Four Natural Cohesion Tools',
        items: [
          { action: 'Use pronouns with unambiguous antecedents (it, they, these).', condition: 'Tool 1 of 4', why: 'Carries subject continuity without repeating long noun phrases.' },
          { action: 'Use demonstrative noun phrases (this policy, these findings).', condition: 'Tool 2 of 4', why: 'Summarizes a previous clause into a concise grammatical subject.' },
          { action: 'Repeat key technical terms deliberately when accuracy demands it.', condition: 'Tool 3 of 4', why: 'Prevents distorted synonym substitutions that confuse reader understanding.' },
          { action: 'Vary sentence openings using adverbial clauses and participles.', condition: 'Tool 4 of 4', why: 'Eliminates repetitive linker patterns at sentence boundaries.' },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Coherence and Cohesion Checklist',
        items: [
          'I give each paragraph a distinct, unmixed logical job.',
          'I avoid opening consecutive sentences with transition linkers.',
          'I verify that every pronoun has a clear antecedent noun.',
          'I let grammatical structure carry logical relationships naturally.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-cohesion-check',
        label: 'Audit a recent essay paragraph and replace two mechanical linkers with demonstratives or pronouns.',
      },
    ],
  },

  // 3. w-words-and-grammar-for-meaning (§5.4, §5.5)
  {
    id: 'w-words-and-grammar-for-meaning',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-1',
    partTitle: 'Part 4.1 · Writing Foundations & Scoring Criteria',
    title: 'Choose words and build grammar through meaning',
    minutes: 7,
    sourceSections: ['5.4', '5.5'],
    needs: ['w-coherence-vs-cohesion'],
    blocks: [
      {
        type: 'lead',
        summary: 'Lexical resource and grammatical range reward precision and meaning control, not memorized rare words or convoluted clauses. Writing clearly requires choosing words by function and deploying purposeful grammar.',
        whyItMatters: 'Using obscure synonyms out of context or writing endless sentences packed with passive verbs creates confusion and lowers both vocabulary and grammar bands.',
        whatYouWillDo: 'Execute a 5-point lexical check, eliminate distorted synonyms, examine six functional clause structures, and debunk grammar myths.',
      },
      {
        type: 'steps',
        title: 'The 5-Point Lexical Quality Check',
        items: [
          { action: 'Does this word mean exactly what I intend in this context?', condition: 'Check 1 of 5', why: 'Ensures conceptual accuracy over superficial vocabulary display.' },
          { action: 'Does this word fit the surrounding sentence syntax?', condition: 'Check 2 of 5', why: 'Verifies correct part of speech and complementation patterns.' },
          { action: 'Does this word combine naturally with neighboring words?', condition: 'Check 3 of 5', why: 'Enforces natural English collocation patterns and prepositions.' },
          { action: 'Does this word match the formal academic register of the task?', condition: 'Check 4 of 5', why: 'Eliminates conversational slang, idioms, or informal abbreviations.' },
          { action: 'Can I spell this word accurately and consistently?', condition: 'Check 5 of 5', why: 'Prevents frequent spelling slips from capping your Lexical Resource band.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Exact Repetition versus Distorted Synonym Insertion',
        weak: {
          text: 'The report compares four kingdoms. Furthermore, citizens consumed water from artificial containers.',
          whyItFails: 'Replaces "countries" with "kingdoms" (factually inaccurate) and "plastic bottles" with "artificial containers" (bizarre paraphrase).',
        },
        controlled: {
          text: 'The report compares four countries. In two of these nations, residents consumed drinking water primarily from plastic bottles.',
          whyItWorks: 'Uses accurate equivalents ("nations", "residents") while repeating exact material terms ("countries", "plastic bottles") appropriately.',
        },
      },
      {
        type: 'comparisonTable',
        caption: 'Six Functional Clause Structures Serving Meaning',
        headers: ['Clause Structure', 'Rhetorical Function Served', 'Example of Purposeful Usage'],
        rows: [
          ['Simple sentence', 'State a crisp, authoritative main claim.', '"Renewable energy costs have declined significantly."'],
          ['Subordinate causal clause', 'Provide immediate logical justification.', '"A shorter commute reduces stress because workers spend less time travelling."'],
          ['Defining relative clause', 'Specify the exact subgroup or condition.', '"Employees who work remotely report higher job satisfaction."'],
          ['Comparative structure', 'Contrast two magnitudes or rates accurately.', '"Solar capacity expanded twice as rapidly as wind generation."'],
          ['Passive construction', 'Focus attention on the material, process, or result.', '"Hazardous waste is neutralised before being stored safely."'],
          ['Modal qualification', 'Express calibrated certainty or obligation.', '"Investing in public healthcare may mitigate future economic shocks."'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Complexity Means Clause Control, Not Word Density',
        body: 'Grammatical complexity means controlling clause relationships (reasons, conditions, contrasts). It does not mean a run-on sentence stuffed with obscure words. Judge every structure by whether it makes your meaning clearer.',
      },
      {
        type: 'selfCheck',
        title: 'Lexical and Grammatical Control Checklist',
        items: [
          'I select words for semantic precision rather than showing off rare vocabulary.',
          'I repeat precise topic terms when alternative synonyms would alter meaning.',
          'I combine simple and complex sentences to create purposeful rhetorical rhythm.',
          'I check that every subordinate clause is attached to a complete main clause.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-lexical-grammar',
        label: 'Identify a sentence from your recent writing that felt awkward and revise it using one of the six clause structures.',
      },
    ],
  },

  // 4. w-process-timing-length-review (§5.6, §5.7, §5.8, §5.9, §5.10)
  {
    id: 'w-process-timing-length-review',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-1',
    partTitle: 'Part 4.1 · Writing Foundations & Scoring Criteria',
    title: 'Plan, draft, manage the shared hour, and review',
    minutes: 8,
    sourceSections: ['5.6', '5.7', '5.8', '5.9', '5.10'],
    needs: ['w-words-and-grammar-for-meaning'],
    blocks: [
      {
        type: 'lead',
        summary: 'A disciplined three-stage production process—Plan, Draft, and Review—protects your pacing across the shared 60-minute Writing hour. Reviewing from macro-meaning down to micro-grammar catches critical errors before submission.',
        whyItMatters: 'Candidates who begin writing without a plan frequently run out of time or produce rambling, unstructured text. Rushing through the hour without a final review leaves avoidable spelling and agreement errors.',
        whatYouWillDo: 'Master the 3-stage writing process, budget the 60-minute shared clock, understand word count thresholds, and execute the 5-step review funnel.',
      },
      {
        type: 'steps',
        title: 'The 3-Stage Writing Production Process',
        items: [
          { action: 'Plan the meaning: decode prompt, brainstorm points, and establish structure.', condition: 'Stage 1: Planning', why: 'Separates the cognitive burden of idea generation from sentence drafting.' },
          { action: 'Draft the response: write connected paragraphs following your plan.', condition: 'Stage 2: Drafting', why: 'Maintains momentum and produces fluent, connected prose without mid-sentence stalls.' },
          { action: 'Review the text: audit task completion, coherence, and grammar accuracy.', condition: 'Stage 3: Reviewing', why: 'Eliminates careless slips in spelling, agreement, articles, and punctuation.' },
        ],
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Managing the Shared 60 Minutes',
        body: 'A standard working allocation is 20 minutes for Task 1 and 40 minutes for Task 2. Attempting Task 2 first is an option that protects time for the double-weighted essay. Test both orders in practice to discover which yields greater control.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Word Count Minimums and Margins',
        body: 'Task 1 requires at least 150 words; Task 2 requires at least 250 words. Teacher guidelines such as 160–200 words for Task 1 and 260–300 words for Task 2 provide safety margins, but they are not official maximums. Write enough to develop the task fully.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Connected Prose Only: No Bullet Lists',
        body: 'Your responses must be written in connected prose. Never submit bullet lists, outline fragments, or disconnected notes. Responses containing bullet points are severely penalised under Coherence and Cohesion.',
      },
      {
        type: 'steps',
        title: 'The 5-Step Top-Down Review Funnel',
        items: [
          { action: 'Check Task Fulfillment: Did I satisfy all instructions and prompt demands?', condition: 'Step 1: Task', why: 'Ensures foundational Task Achievement and Task Response requirements are met.' },
          { action: 'Check Whole Response: Is my overarching message and position clear throughout?', condition: 'Step 2: Whole Response', why: 'Verifies consistent stance and eliminates contradictory statements.' },
          { action: 'Check Paragraphs: Does each body paragraph have a clear, developed focus?', condition: 'Step 3: Paragraphs', why: 'Ensures topic sentences and supporting explanations remain unified.' },
          { action: 'Check Sentences: Are clause connections and transitions clear and logical?', condition: 'Step 4: Sentences', why: 'Removes run-on sentences, comma splices, and ambiguous pronoun references.' },
          { action: 'Check Language Details: Verify spelling, verb tenses, subject-verb agreement, and articles.', condition: 'Step 5: Language Detail', why: 'Catches recurring mechanical slips identified in your personal error log.' },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Production and Review Checklist',
        items: [
          'I spend at least 3 to 5 minutes planning before writing my first sentence.',
          'I write connected paragraphs and never use bullet points or outline lists.',
          'I verify that my word count exceeds the 150-word and 250-word thresholds.',
          'I reserve 3 to 5 minutes at the end of each task to execute the review funnel.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-review-funnel',
        label: 'Write down your personal time allocation for planning, drafting, and checking Task 1 and Task 2.',
      },
    ],
  },
]
