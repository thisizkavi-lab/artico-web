/**
 * Artico IELTS Study Course · Module 4: General Training Task 1 Letters (Part 4.4)
 * Covers source sections §7.1 through §7.9.
 * Strictly separated [GT] track covering purpose, recipient, register, letter blueprints,
 * functional openings, detail development, conventional greetings/closings, informal control,
 * and comprehensive final review.
 */

export const writingGtTask1Units = [
  // 27. w-gt-purpose-reader-register (§7.1, §7.2)
  {
    id: 'w-gt-purpose-reader-register',
    area: 'writing',
    track: 'gt',
    partId: 'w-part-4-4',
    partTitle: 'Part 4.4 · [GT] General Training Task 1: Letters',
    title: '[GT] Task 1 Letters: purpose, bullets, and register',
    minutes: 8,
    sourceSections: ['7.1', '7.2'],
    needs: ['w-purposes-and-criteria'],
    blocks: [
      {
        type: 'lead',
        summary: 'General Training Writing Task 1 requires writing a practical letter of at least 150 words in response to a simulated situation. Success depends on identifying the recipient relationship and maintaining an appropriate register throughout.',
        whyItMatters: 'Using an inappropriate tone undermines Task Achievement and lowers your band score. For example, avoid writing casually to an unknown manager or using legalistic jargon with a friend.',
        whatYouWillDo: 'Study the letter register spectrum SVG diagram, apply the 6-step prompt decoding routine, master three functional registers, and audit compound bullet requirements.',
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'General Training Track Focus',
        body: 'This unit belongs to the General Training track. If you are preparing for IELTS Academic, your Task 1 is a visual data report (covered in Part 4.2). General Training candidates write a 150-word letter based on a real-world scenario.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-gt-letter-registers',
        title: 'General Training Letter Register Spectrum',
        caption: 'Three distinct register levels: 1 Personal / Informal (Close friends, family) → 2 Semi-Formal (Colleagues, landlords, teachers) → 3 Formal (Unknown officials, corporate complaints).',
        alt: 'Diagram showing three letter register classifications from personal informal to institutional formal.',
      },
      {
        type: 'steps',
        title: '6-Item Letter Prompt Decoding Routine',
        items: [
          { action: 'Identify the designated recipient and your exact relationship to them.', condition: 'Item 1: Recipient', why: 'Dictates whether your greeting and tone should be formal, semi-formal, or personal.' },
          { action: 'Determine the primary objective of the correspondence.', condition: 'Item 2: Core Purpose', why: 'Governs your opening sentence (for example, to complain, apologize, or request information).' },
          { action: 'Inspect every bullet point for compound sub-instructions.', condition: 'Item 3: Sub-Tasks', why: 'Prompts frequently combine two demands in one bullet (such as "describe the problem and explain the effect").' },
          { action: 'Check for plural requirements (such as "give reasons" or "suggest solutions").', condition: 'Item 4: Plurals', why: 'Supplying only one reason when the prompt asks for plural reasons caps Task Achievement.' },
          { action: 'Verify whether a mandatory opening greeting is provided in the task prompt.', condition: 'Item 5: Supplied Salutation', why: 'If the task specifies "Dear Sir or Madam", you must use that exact salutation.' },
          { action: 'Establish the concrete remedy or next step requested from the reader.', condition: 'Item 6: Requested Action', why: 'Ensures the letter concludes with an actionable, purposeful outcome.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'The Three Practical Registers in General Training Letters',
        headers: ['Register Level', 'Typical Recipient Relationship', 'Tone Characteristics and Phrasing'],
        rows: [
          ['Personal / Informal', 'A close friend, neighbor, or family member.', 'Warm, conversational phrasing; natural idioms; contractions permitted; friendly sign-off.'],
          ['Semi-Formal', 'A known manager, landlord, college tutor, or colleague.', 'Polite, professional, and respectful; clear purpose; contractions generally avoided.'],
          ['Formal', 'An unknown manager, company official, or public authority.', 'Impersonal, precise, and courteous; conventional institutional salutations and closings.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Register Consistency in a Formal Complaint',
        weak: {
          text: 'Dear Sir, I am writing because your train service was super annoying yesterday. The wifi was totally broken and I missed a mega meeting. Fix this ASAP!',
          whyItFails: 'Uses inappropriate slang ("super annoying", "mega meeting", "ASAP!") that violates the courteous tone required for a formal business complaint.',
        },
        controlled: {
          text: 'Dear Sir or Madam, I am writing to express my dissatisfaction with the 08:15 service from Manchester yesterday. The delay caused me to miss an important client presentation.',
          whyItWorks: 'Maintains an objective, courteous, and precise formal register appropriate for corporate correspondence.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Watch Out for Compound Bullets',
        body: 'Carefully inspect bullet instructions with the word "and". For instance, "describe the problem and explain how it affected you" contains two separate jobs. If you only describe the problem, you leave half the bullet unfulfilled.',
      },
      {
        type: 'selfCheck',
        title: 'Letter Prompt Decoding Checklist',
        items: [
          'I identify the recipient and select the correct register before drafting.',
          'I verify whether each bullet contains one or two specific sub-tasks.',
          'I ensure plural demands ("give reasons") receive at least two distinct points.',
          'I maintain a consistent tone throughout the entire response.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-gt-prompt-decode',
        label: 'Analyze a General Training Task 1 prompt and note the recipient, register, and all bullet sub-tasks.',
      },
    ],
  },

  // 28. w-gt-structure-openings-details (§7.3, §7.4, §7.5)
  {
    id: 'w-gt-structure-openings-details',
    area: 'writing',
    track: 'gt',
    partId: 'w-part-4-4',
    partTitle: 'Part 4.4 · [GT] General Training Task 1: Letters',
    title: '[GT] Plan each function, open clearly, and add detail',
    minutes: 8,
    sourceSections: ['7.3', '7.4', '7.5'],
    needs: ['w-gt-purpose-reader-register'],
    blocks: [
      {
        type: 'lead',
        summary: 'A standard 4-part letter structure provides clear functional organization and visible bullet coverage. The letter must state its communicative purpose immediately in the opening sentence and develop realistic supporting details.',
        whyItMatters: 'Delaying the main purpose or producing a vague letter without concrete details forces the examiner to search for your meaning, lowering Coherence and Task Achievement.',
        whatYouWillDo: 'Master the 4-part letter blueprint, select functional opening sentences across five letter genres, develop supporting details, and evaluate an annotated specimen.',
      },
      {
        type: 'steps',
        title: 'The 4-Part Letter Blueprint',
        items: [
          { action: 'Salutation: Address the recipient using conventional register markers.', condition: 'Part 1: Greeting', why: 'Establishes the social and professional relationship immediately.' },
          { action: 'Opening Statement: State the explicit purpose of your letter in sentence one.', condition: 'Part 2: Purpose', why: 'Ensures the reader understands why the letter exists without hesitation.' },
          { action: 'Body Paragraphs: Dedicate one distinct paragraph to each prompt bullet.', condition: 'Part 3: Bullet Details', why: 'Ensures visible, transparent coverage of every required functional task.' },
          { action: 'Closing and Sign-off: Conclude with an appropriate sign-off and your name.', condition: 'Part 4: Sign-off', why: 'Brings the practical correspondence to a polite, conventional conclusion.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Functional Opening Sentences Across Five Letter Genres',
        headers: ['Letter Genre', 'Standard Formal Opening Formula', 'Standard Personal Opening Formula'],
        rows: [
          ['Complaint', '"I am writing to express my dissatisfaction with..."', '"I am writing to let you know about a problem with..."'],
          ['Apology', '"I am writing to offer my sincere apologies for..."', '"I am so sorry that I could not make it to..."'],
          ['Request / Inquiry', '"I am writing to inquire about the availability of..."', '"I am writing to ask if you could help me with..."'],
          ['Invitation', '"I would be delighted if you could attend our..."', '"I would love it if you could come over to..."'],
          ['Recommendation', '"I am writing to recommend Mr. Davies for the position of..."', '"I wanted to tell you about a fantastic restaurant I visited..."'],
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'letter',
        title: 'Annotated Excerpt: Formal Complaint Letter',
        segments: [
          { text: 'Dear Sir or Madam,', note: 'Salutation: Conventional opening for an unnamed formal corporate recipient.' },
          { text: 'I am writing to lodge a formal complaint regarding the substandard accommodation provided during my stay at the Grand Hotel on 14 October.', note: 'Immediate Purpose: States the core complaint, location, and date clearly.' },
          { text: 'Upon checking into room 312, I discovered that the central heating unit was non-operational and the hot water supply was disconnected.', note: 'Bullet 1 Detail: Provides concrete, realistic factual evidence of the failure.' },
          { text: 'Although I alerted the reception desk twice, no maintenance staff arrived, forcing me to spend the night in an unheated room.', note: 'Bullet 2 Detail: Explains the personal practical impact and failed remediation.' },
          { text: 'Under these circumstances, I request a full refund of the accommodation fee.', note: 'Actionable Remedy: States the exact commercial resolution expected.' },
          { text: 'Yours faithfully,\nJane Miller', note: 'Formal Closing: Paired correctly with "Dear Sir or Madam".' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'The One-Paragraph-Per-Bullet Scaffold',
        body: 'Allocating one paragraph to each bullet point provides an easy visual checklist for both you and the examiner. It prevents you from accidentally omitting an instruction and ensures balanced development across the letter.',
      },
      {
        type: 'selfCheck',
        title: 'Letter Blueprint and Detail Checklist',
        items: [
          'My opening sentence states the purpose of the letter directly.',
          'I allocate one structured paragraph to each bullet point from the prompt.',
          'I provide realistic, ordinary details (dates, room numbers, specific problems).',
          'I conclude with a polite, actionable request or next step.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-gt-openings',
        label: 'Write an opening sentence for each of the five letter genres: complaint, apology, request, invitation, and recommendation.',
      },
    ],
  },

  // 29. w-gt-conventions-informal-check (§7.6, §7.7, §7.8, §7.9)
  {
    id: 'w-gt-conventions-informal-check',
    area: 'writing',
    track: 'gt',
    partId: 'w-part-4-4',
    partTitle: 'Part 4.4 · [GT] General Training Task 1: Letters',
    title: '[GT] Greetings, closings, informal boundaries, and check',
    minutes: 8,
    sourceSections: ['7.6', '7.7', '7.8', '7.9'],
    needs: ['w-gt-structure-openings-details'],
    blocks: [
      {
        type: 'lead',
        summary: 'Conventional letter writing requires strict pairing between salutations and sign-offs. In personal letters, informal language must remain grammatically controlled, avoiding text-message abbreviations, emojis, and sentence boundary errors.',
        whyItMatters: 'Mismatching greetings and closings (such as pairing "Dear Sir" with "Yours sincerely") is a noticeable convention error. Informal writing does not excuse sloppy grammar or comma splices.',
        whatYouWillDo: 'Master salutation and sign-off pairings, define informal language boundaries, execute the 10-point final letter audit, and eliminate comma splices.',
      },
      {
        type: 'comparisonTable',
        caption: 'Conventional Greeting and Sign-off Pairings',
        headers: ['Recipient Type', 'Conventional Greeting', 'Mandatory Closing Sign-off'],
        rows: [
          ['Formal (Unnamed recipient)', 'Dear Sir or Madam, / Dear Sir / Madam,', 'Yours faithfully,\n[Your Full Name]'],
          ['Formal (Named recipient)', 'Dear Mr. Henderson, / Dear Ms. Patel,', 'Yours sincerely,\n[Your Full Name]'],
          ['Semi-Formal (Professional acquaintance)', 'Dear Dr. Aris, / Dear Robert,', 'Kind regards, / Warm regards,\n[Your Name]'],
          ['Personal / Informal (Friend or relative)', 'Dear Sam, / Hi Clara,', 'Best wishes, / All the best,\n[Your First Name]'],
        ],
      },
      {
        type: 'section',
        id: 'informal-language-boundaries',
        title: 'Boundaries of Informal Language',
        bridge: 'In personal letters, understand what is natural and what is strictly forbidden.',
      },
      {
        type: 'prose',
        paragraphs: [
          'In informal letters to friends, conversational wording and familiar phrasal verbs are completely appropriate. For instance, verbs like catch up, drop by, or look forward to create a natural, friendly tone.',
          'However, informal does not mean careless. Avoid text-messaging abbreviations, internet emojis, and local slang that obscures meaning. Never insert postscripts as an afterthought.',
        ],
      },
      {
        type: 'contrastPair',
        title: 'Conventional Closing Pairings',
        weak: {
          text: 'Dear Sir or Madam,\n...\nYours sincerely,\nDavid Smith',
          whyItFails: 'Mismatches conventions: "Yours sincerely" should only be paired with a named person, whereas an unnamed recipient requires "Yours faithfully".',
        },
        controlled: {
          text: 'Dear Sir or Madam,\n...\nYours faithfully,\nDavid Smith',
          whyItWorks: 'Pairs "Dear Sir or Madam" with "Yours faithfully" according to standard British and international English letter conventions.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'No Postal Addresses Needed',
        body: 'Do not write postal addresses, dates, or contact telephone numbers at the top of your IELTS letter. IELTS tests letter composition, not postal envelope formatting. Adding addresses wastes valuable exam time.',
      },
      {
        type: 'steps',
        title: 'The 10-Point Final Letter Audit Routine',
        items: [
          { action: 'Confirm that your opening clearly states the purpose of the letter.', condition: 'Check 1: Purpose', why: 'Ensures the reader grasps the core objective immediately.' },
          { action: 'Verify that every bullet point receives distinct, developed coverage.', condition: 'Check 2: Bullets', why: 'Prevents leaving any required prompt component unanswered.' },
          { action: 'Audit compound bullets to ensure both sub-tasks are answered.', condition: 'Check 3: Sub-Tasks', why: 'Ensures complete Task Achievement score fulfillment.' },
          { action: 'Check that plural demands ("give reasons") contain multiple details.', condition: 'Check 4: Plurals', why: 'Avoids capping marks on prompt technicalities.' },
          { action: 'Verify that register remains consistent from start to finish.', condition: 'Check 5: Tone', why: 'Prevents awkward shifts between colloquial and formal styles.' },
          { action: 'Ensure salutation matches the closing sign-off exactly.', condition: 'Check 6: Sign-off', why: 'Validates adherence to standard written English conventions.' },
          { action: 'Confirm that the total response contains at least 150 words.', condition: 'Check 7: Length', why: 'Prevents automatic under-length word count penalties.' },
          { action: 'Check sentence boundaries and eliminate comma splices.', condition: 'Check 8: Punctuation', why: 'Ensures independent clauses are joined with appropriate conjunctions.' },
          { action: 'Verify verb tenses, subject-verb agreement, and articles.', condition: 'Check 9: Grammar', why: 'Eliminates slips and protects your Grammatical Range score.' },
          { action: 'Confirm that handwriting or typed paragraph breaks are distinct.', condition: 'Check 10: Layout', why: 'Presents a clean, readable visual structure to the examiner.' },
        ],
      },
      {
        type: 'selfCheck',
        title: 'General Training Letter Final Checklist',
        items: [
          'I pair "Dear Sir or Madam" with "Yours faithfully".',
          'I pair named salutations ("Dear Ms. Patel") with "Yours sincerely".',
          'I avoid postal addresses, text-message abbreviations, and emojis.',
          'My letter contains at least 150 words divided into clear paragraphs.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-gt-final-check',
        label: 'Audit a practice General Training letter against the 10-point audit routine.',
      },
    ],
  },
]
