/**
 * Artico IELTS Study Course · Module 1B: Everything about IELTS (Part 1.3)
 * Reference Language Banks
 *
 * Units:
 *   - ov-lang-50-concepts (10.1, 10.2)
 *   - ov-lang-precision-distinctions (10.3)
 *   - ov-lang-59-patterns (10.4)
 *   - ov-lang-phrases-idioms-register (10.5, 10.6, 10.7)
 *   - ov-lang-grammar-repairs-editing (10.8, 10.9)
 */

export const overviewLanguageUnits = [
  // 13. ov-lang-50-concepts (10.1, 10.2)
  {
    id: 'ov-lang-50-concepts',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-3',
    partTitle: 'Part 1.3 · Reference Language Banks',
    title: '50 common concepts: alternatives and limits',
    minutes: 10,
    sourceSections: ['10.1', '10.2'],
    needs: ['ov-synonym-checks'],
    blocks: [
      {
        type: 'lead',
        summary: 'This reference bank provides precision alternatives for 50 common English concepts taught across the reference material. Each entry explains when a substitute narrows or strengthens meaning, and when the original word should be retained.',
        whyItMatters: 'Carelessly substituting a high-level word can alter the factual scope of your response or introduce an ungrammatical construction.',
        whatYouWillDo: 'Study the 7-step reference acquisition routine, consult the 50-concept bank, and apply the substitution limit rules.',
      },
      {
        type: 'steps',
        title: 'Seven-Step Reference Study Routine',
        items: [
          { action: '1. Learn meaning in context', why: 'Ensures you grasp how the alternative functions in actual usage.' },
          { action: '2. Check grammatical pattern', why: 'Verifies whether the word requires a specific preposition or clause structure.' },
          { action: '3. Check pronunciation and stress', why: 'Builds spoken accuracy and avoids misplacing syllable stress.' },
          { action: '4. Learn one natural collocation', why: 'Ensures the word pairs naturally with adjacent verbs or nouns.' },
          { action: '5. Produce an original example', why: 'Tests active generation in writing or speech.' },
          { action: '6. Retrieve without looking', why: 'Strengthens recall after a 24-hour delay.' },
          { action: '7. Verify on fresh work', why: 'Confirms reliable skill transfer under timed conditions.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Appropriate Alternative versus Distorted Scope',
        weak: {
          label: 'Distorted Scope Substitution',
          text: '"The government should provide free schooling for all adolescents."',
          whyItFails: 'Limits free education to teenagers aged 10–19, accidentally excluding younger primary pupils.',
        },
        controlled: {
          label: 'Controlled Scope Alternative',
          text: '"The state authorities should ensure free schooling for all young learners."',
          whyItWorks: 'Uses state authorities and young learners accurately without excluding primary school children.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Reject Forced Word Quotas',
        body: 'Choose a few relevant items at a time during study. Never force a memorized quota of high-level words into an essay or speaking answer. Natural precision always outperforms forced complexity.',
      },
      {
        type: 'wordBank',
        bankId: 'commonConcepts50',
        title: 'Fifty Common Concepts: Alternatives and Precise Limits',
        instructions: 'Search for any concept below. Inspect the usage limits before adopting an alternative.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Alternatives Narrow or Strengthen Meaning',
        body: 'An alternative is not a pure duplicate. Words like "crucial" and "vital" are stronger than "important." "Cultivate" implies patient care, whereas "foster" means encourage. If that specific nuance is not intended, retain the standard word.',
      },
      {
        type: 'selfCheck',
        title: 'Reference Application Self-Check',
        items: [
          'I understand that "individuals" emphasizes separate persons, while "the public" refers to a collective.',
          'I check whether my proposed alternative requires different grammar before inserting it.',
          'I choose words that match the exact strength of my argument without artificial exaggeration.',
        ],
      },
    ],
  },

  // 14. ov-lang-precision-distinctions (10.3)
  {
    id: 'ov-lang-precision-distinctions',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-3',
    partTitle: 'Part 1.3 · Reference Language Banks',
    title: 'Word distinctions that prevent meaning errors',
    minutes: 10,
    sourceSections: ['10.3'],
    needs: ['ov-lang-50-concepts'],
    blocks: [
      {
        type: 'lead',
        summary: 'Minor vocabulary distinctions frequently cause serious meaning errors in IELTS. Distinguishing precise categories of population, age, business, family, intensity, and time prevents lost marks in Reading and Writing.',
        whyItMatters: 'Confusing a resident with a citizen, or revenue with profit, distorts facts and caps Task Achievement at Band 5.0 or 6.0.',
        whatYouWillDo: 'Examine six structured distinction tables and eliminate common category confusion from your active vocabulary.',
      },
      {
        type: 'comparisonTable',
        caption: 'Population and Demographic Distinctions',
        headers: ['Label', 'Precise Definition', 'Boundary Condition'],
        rows: [
          ['Resident', 'A person who currently lives in a specified place.', 'Does not require legal citizenship or voting rights.'],
          ['Citizen', 'A legally recognized national of a sovereign state.', 'Not all residents are citizens.'],
          ['Local', 'A person living in or connected to a nearby community.', 'Informal or conversational in certain uses.'],
          ['Native', 'A person associated with a place by birth.', 'Can carry context-sensitive historical implications.'],
          ['Men', 'Adult male human beings.', 'Never use "men" to represent a general population containing women and children.'],
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Age Category Distinctions',
        headers: ['Label', 'Specific Age or Developmental Range', 'Usage Limit'],
        rows: [
          ['Infant', 'A baby in the first year of life.', 'Cannot be used for children who can walk or speak.'],
          ['Toddler', 'A child who is learning to walk, typically aged 1 to 3.', 'Narrow developmental window.'],
          ['Child', 'A young human below the age of physical maturity.', 'Broad generic term.'],
          ['Adolescent', 'A person in the transition between childhood and adulthood (ages 10–19).', 'Preserve the teenage focus; not equivalent to young children.'],
          ['Minor', 'A person under the legal age of full responsibility.', 'Jurisdiction-dependent legal label; avoid using as a generic synonym.'],
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Business, Family, and Intensity Distinctions',
        headers: ['Category', 'Distinction', 'Controlled Usage Rule'],
        rows: [
          ['Business', 'Manufacturer makes goods; an agency provides services; an organization may be non-profit.', 'Do not label every business a corporation.'],
          ['Family', 'A guardian cares for a child legally; ancestors belong to earlier generations.', 'Never use the archaic word "sire" in an IELTS response.'],
          ['Intensity', 'Substantial means considerable; immense means extremely large; paramount means of greatest importance.', 'Do not use an extreme adjective when the intended degree is moderate.'],
          ['Difficulty', 'Simple means not complicated in structure; easy means requiring little effort.', 'A process can be conceptually simple yet physically exhausting.'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Time and Word Form Traps: "Data" and "Datum"',
        body: 'In contemporary English, "data" functions as either an uncountable mass noun ("the data is clear") or a plural noun ("the data are clear"). Be consistent throughout your response. The technical singular form is "datum." Never write the caption error "datam."',
      },
      {
        type: 'selfCheck',
        title: 'Precision Distinctions Review',
        items: [
          'I differentiate residents from citizens when discussing municipal services and legal rights.',
          'I use age labels that reflect the actual demographic cohort shown in charts.',
          'I never use extreme adjectives like "immense" or "paramount" for modest trends.',
        ],
      },
    ],
  },

  // 15. ov-lang-59-patterns (10.4)
  {
    id: 'ov-lang-59-patterns',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-3',
    partTitle: 'Part 1.3 · Reference Language Banks',
    title: '59 vocabulary items with grammar patterns',
    minutes: 10,
    sourceSections: ['10.4'],
    needs: ['ov-lang-50-concepts'],
    blocks: [
      {
        type: 'lead',
        summary: 'High-level vocabulary produces marks only when paired with correct dependent prepositions, parts of speech, and clause structures. This bank consolidates 59 core academic vocabulary items with their verified patterns and authentic examples.',
        whyItMatters: 'Examiners look for accurate word partnerships. Writing "prone of" instead of "prone to", or "detrimental for" instead of "detrimental to", reveals imperfect lexical control.',
        whatYouWillDo: 'Explore the searchable 59-item pattern bank, study preposition pairings, and practice transforming grammatical forms.',
      },
      {
        type: 'contrastPair',
        title: 'Preposition Slip versus Controlled Academic Pattern',
        weak: {
          label: 'Incorrect Dependent Preposition',
          text: '"Excessive screen time is detrimental for children and makes them prone of headaches."',
          whyItFails: 'Uses wrong prepositions ("detrimental for", "prone of") that violate conventional academic collocations.',
        },
        controlled: {
          label: 'Controlled Preposition Structure',
          text: '"Excessive screen exposure is detrimental to young learners and makes them prone to persistent fatigue."',
          whyItWorks: 'Pairs adjectives with their correct dependent prepositions ("detrimental to", "prone to").',
        },
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Consolidated Academic Repertoire',
        body: 'This reference consolidates the vocabulary lessons from the reference material. It includes word families such as the adjective "affluent" and the noun "affluence" under entry number 17. Learning related nouns and adjectives expands your grammatical flexibility.',
      },
      {
        type: 'wordBank',
        bankId: 'vocabPatterns59',
        title: 'Fifty-Nine Academic Vocabulary Items with Grammatical Patterns',
        instructions: 'Filter by keyword to examine word forms, dependent prepositions, and original model sentences.',
      },
      {
        type: 'steps',
        title: 'Four-Step Grammatical Pattern Integration',
        items: [
          { action: '1. Isolate the headword', why: 'Identifies the word and its exact part of speech.' },
          { action: '2. Check the dependent preposition', why: 'Confirms whether the word requires "to", "for", "in", or "of".' },
          { action: '3. Construct an original clause', why: 'Embeds the collocation into a complete, balanced sentence.' },
          { action: '4. Audit argument alignment', why: 'Verifies that the sentence supports the main idea of your paragraph.' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Examples Demonstrate Language, Not World Facts',
        body: 'The model sentences in this reference demonstrate grammatical patterns. They do not constitute scientific evidence or statistical proof for general societal arguments. Use them to understand syntactic structure.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Active Preposition Auditing',
        body: 'When recording new academic vocabulary, never copy an isolated headword. Always record the headword paired with its dependent preposition in a complete prepositional phrase. For instance, memorize "accountable for actions" and "accountable to superiors" as distinct grammatical units.',
      },
      {
        type: 'selfCheck',
        title: 'Grammar Pattern Self-Check',
        items: [
          'I know which adjectives require "to", including "prone to", "detrimental to", and "fundamental to".',
          'I can distinguish transitive verbs like "exceed" from prepositional verbs.',
          'I practice forming sentences with both noun and adjective forms of key words.',
        ],
      },
    ],
  },

  // 16. ov-lang-phrases-idioms-register (10.5, 10.6, 10.7)
  {
    id: 'ov-lang-phrases-idioms-register',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-3',
    partTitle: 'Part 1.3 · Reference Language Banks',
    title: 'Topic phrases, 18 optional idioms, and register',
    minutes: 10,
    sourceSections: ['10.5', '10.6', '10.7'],
    needs: ['ov-lang-59-patterns'],
    blocks: [
      {
        type: 'lead',
        summary: 'Vocabulary suitability depends entirely on communicative register. While topic phrases enhance precision across all papers, idioms belong primarily in conversational Speaking, and informal slang must be excluded from formal writing.',
        whyItMatters: 'Inserting colloquial idioms like "rain cats and dogs" or conversational filler into an Academic Task 1 report damages your Academic register and lowers your band score.',
        whatYouWillDo: 'Master 16 topic phrases, examine 18 optional idioms with their usage limits, and navigate formal versus informal register boundaries.',
      },
      {
        type: 'contrastPair',
        title: 'Register Choice: Formal Writing versus Natural Speaking',
        weak: {
          label: 'Inappropriate Colloquialism in Writing Task 1',
          text: '"The price of fuel went through the roof, causing commuters to throw in the towel."',
          whyItFails: 'Uses informal spoken idioms in an objective academic report, violating Task Achievement register criteria.',
        },
        controlled: {
          label: 'Controlled Objective Reporting',
          text: '"Fuel prices escalated sharply, leading many suburban travelers to abandon private vehicle use."',
          whyItWorks: 'Uses precise factual verbs and nouns suited to formal academic reporting.',
        },
      },
      {
        type: 'wordBank',
        bankId: 'topicPhrases16',
        title: 'Sixteen High-Utility Topic Phrases from Short Lessons',
        instructions: 'Examine natural collocations for housing, transport, technology, and personal habits.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Explain Claims with Exact Precision',
        body: 'A precise adjective is useful only when you explain why it applies. Do not describe an activity as "therapeutic" or "addictive" without supporting your claim. Note also: use "act on impulse" or "act rashly", never the caption error "acted on a rash."',
      },
      {
        type: 'wordBank',
        bankId: 'optionalIdioms18',
        title: 'Eighteen Optional Idioms with Specific Usage Limits',
        instructions: 'Idioms are conversational. Reserve them for Speaking Parts 1 and 2 where natural informal expression is rewarded.',
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Idioms Are Strictly Optional',
        body: 'Idioms are never required to achieve a high score. Use an idiom only when its meaning, grammar, and tone fit naturally. Note the distinction: "burn the midnight oil" means working late, while "burn the candle at both ends" means an unsustainable combination of excessive demands.',
      },
      {
        type: 'wordBank',
        bankId: 'registerExpressions10',
        title: 'Ten Fixed Conversational Expressions and Register Boundaries',
        instructions: 'Distinguish standard spoken discourse markers from highly informal colloquialisms and temporary slang.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Exclude Informal Slang from Formal Tests',
        body: 'Expressions such as "piss me off" and figurative "I am dead" are highly informal. Internet slang like "rizz", "slay", and "yapping" changes rapidly across communities. Recognizing register is helpful, but memorizing internet slang is never an IELTS preparation requirement.',
      },
      {
        type: 'selfCheck',
        title: 'Register and Idiom Audit',
        items: [
          'I keep colloquial idioms out of Academic Task 1 reports and Task 2 essays.',
          'I know the distinct meanings of "burn the midnight oil" versus "burn the candle at both ends".',
          'I use topic phrases to express concrete facts clearly in both writing and speaking.',
        ],
      },
    ],
  },

  // 17. ov-lang-grammar-repairs-editing (10.8, 10.9)
  {
    id: 'ov-lang-grammar-repairs-editing',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-3',
    partTitle: 'Part 1.3 · Reference Language Banks',
    title: '19 recurring grammar repairs and sentence editing',
    minutes: 10,
    sourceSections: ['10.8', '10.9'],
    needs: ['ov-lang-phrases-idioms-register'],
    blocks: [
      {
        type: 'lead',
        summary: 'High band performance in Grammatical Range and Accuracy requires eliminating frequent structural errors. This reference presents 19 recurrent grammar problems and an 8-step sentence-level editing procedure to audit your work.',
        whyItMatters: 'Examiners look for a high proportion of completely error-free sentences for Band 7.0 and above. Eliminating recurring slips directly raises your score.',
        whatYouWillDo: 'Review the 19 high-frequency grammar repairs, master the 8-step sentence-editing sequence, and analyze an annotated revision specimen.',
      },
      {
        type: 'wordBank',
        bankId: 'grammarRepairs19',
        title: 'Nineteen Recurring Grammar Repairs and Controlled Forms',
        instructions: 'Inspect common learner mistakes alongside their controlled grammatical decisions.',
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Learn the Structural Rule Behind Each Repair',
        body: 'Understand why each repair is required. Memorizing one corrected sentence does not fix every occurrence of the underlying pattern. Focus on the grammatical principle.',
      },
      {
        type: 'steps',
        title: 'The Eight-Step Sentence-Level Editing Procedure',
        items: [
          { action: '1. State intended meaning plainly', why: 'Clarifies what relationship you want to convey.' },
          { action: '2. Identify subject and main verb', why: 'Confirms that the clause contains a complete core structure.' },
          { action: '3. Verify time and number', why: 'Checks tense consistency and subject-verb agreement.' },
          { action: '4. Check articles and noun forms', why: 'Validates countability, plurals, and definite articles.' },
          { action: '5. Audit prepositions and collocations', why: 'Verifies natural word combinations.' },
          { action: '6. Check clause connections', why: 'Ensures conjunctions connect clauses without comma splices.' },
          { action: '7. Remove redundant wording', why: 'Eliminates filler and wordiness that cloud meaning.' },
          { action: '8. Confirm no meaning was lost', why: 'Confirms that the edited sentence retains necessary precision.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'essay',
        title: 'Eight-Step Sentence Editing Walkthrough',
        segments: [
          { text: 'Flawed draft: In recent years, more easier access to the internet have resulted in that most of people spends less time on reading books.', note: 'Contains multiple comparative, agreement, preposition, and quantifier errors.' },
          { text: 'Step 1 & 2: Identify core meaning: Increased internet access has reduced the time people spend reading books.', note: 'Simplifies the core proposition into a single clear active clause.' },
          { text: 'Step 3 & 4: Correct agreement and quantifiers: "easier" replaces "more easier"; "has resulted" matches singular subject; "most people" replaces "most of people".', note: 'Fixes double comparative, verb number, and non-specific quantifier.' },
          { text: 'Step 5 & 6: Refine prepositions and clauses: "spending less time on reading" becomes "spending less time reading books".', note: 'Applies natural verb-gerund pattern without redundant prepositions.' },
          { text: 'Final edited sentence: In recent years, easier access to digital media has led most people to spend less time reading books.', note: 'Polished, completely error-free complex sentence preserving original scope.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Systematic Three-Minute Proofreading Window',
        body: 'Dedicate the final three minutes of every writing session exclusively to the 8-step editing checklist. Scanning specifically for subject-verb agreement, noun plurals, and article omission catches four to five careless slips per essay.',
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Preserve Necessary Precision',
        body: 'When editing a dense sentence, first simplify the proposition. Then restore any necessary condition, comparison, or qualification. Do not remove useful precision merely to make a sentence shorter.',
      },
      {
        type: 'selfCheck',
        title: 'Sentence Editing Checklist',
        items: [
          'I check for double comparatives like "more easier" before submitting an essay.',
          'I know when to use "most people" versus "most of the people".',
          'I follow the 8-step procedure during my 3-minute writing review window.',
        ],
      },
    ],
  },
]
