/**
 * Artico IELTS Study Course · Module 1B: Everything about IELTS (Part 1.4)
 * Diagnosis, Plan, Readiness & Quality Control
 *
 * Units:
 *   - ov-targets-evidence-cycle (11.1–11.5)
 *   - ov-patterns-practice-input (11.6–11.10)
 *   - ov-materials-stress-readiness-testday (11.11–11.14)
 *   - ov-claims-checklists-sources (12.1–12.3, A.1–A.4)
 */

import { WORD_BANKS } from '../wordBanks.js'

export const overviewPlanUnits = [
  // 18. ov-targets-evidence-cycle (11.1–11.5)
  {
    id: 'ov-targets-evidence-cycle',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-4',
    partTitle: 'Part 1.4 · Diagnosis, Plan & Quality Control',
    title: 'Targets, evidence types, and error categories',
    minutes: 10,
    sourceSections: ['11.1', '11.2', '11.3', '11.4', '11.5'],
    needs: ['ov-lang-grammar-repairs-editing'],
    blocks: [
      {
        type: 'lead',
        summary: 'Setting an effective IELTS study target requires defining measurable behaviors, not merely a numerical band score. You must distinguish assisted learning evidence from independent performance evidence, and classify failures using practical error categories.',
        whyItMatters: 'Confusing supported practice with independent exam readiness leads to false confidence and unexpected score drops on test day.',
        whatYouWillDo: 'Establish behavior-based targets, differentiate learning from performance evidence, and execute an 8-step diagnosis-and-repair cycle.',
      },
      {
        type: 'comparisonTable',
        caption: 'Learning Evidence versus Performance Evidence',
        headers: ['Evidence Type', 'Conditions & Support Level', 'What It Proves'],
        rows: [
          ['Learning evidence', 'Untimed; audio pausing allowed, reference dictionaries consulted, teacher feedback provided.', 'Demonstrates what you can understand and construct with assistance.'],
          ['Performance evidence', 'Strictly timed; unfamiliar material, zero preview, unassisted execution under actual delivery format.', 'Demonstrates what you can reliably deliver under examination pressure.'],
          ['Retention evidence', 'Completing a previously seen practice test or re-answering known items.', 'Demonstrates memory recall; does not prove ability to solve fresh tasks.'],
        ],
      },
      {
        type: 'steps',
        title: 'The Eight-Step Diagnosis and Repair Cycle',
        items: [
          { action: '1. Attempt a relevant task', why: 'Generates observable baseline work under test conditions.' },
          { action: '2. Preserve original work', why: 'Ensures unedited attempts remain available for inspection.' },
          { action: '3. Identify exact failure', why: 'Pinpoints specific questions or paragraphs where marks were lost.' },
          { action: '4. Locate supporting evidence', why: 'Examines the audio script, text line, or official scoring rubric.' },
          { action: '5. Classify failed operation', why: 'Assigns the error to one of nine practical failure categories.' },
          { action: '6. Execute focused repair', why: 'Practices the smallest corrective drill targeted at that operation.' },
          { action: '7. Attempt fresh material', why: 'Tests the repair on an unseen task requiring the same skill.' },
          { action: '8. Verify transfer', why: 'Confirms the improvement functions without coaching or notes.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'The Smallest Supported Repair',
        body: 'Do not overhaul your entire study plan after one low score. Diagnose the specific operational fault and apply the smallest targeted drill supported by the evidence.',
      },
      {
        type: 'comparisonTable',
        caption: 'Nine Practical Error Categories and Targeted Repairs',
        headers: ['Category', 'What Failed', 'Targeted Actionable Repair'],
        rows: [
          ['Instructions', 'Response violated task conditions or word counts.', 'Decode limits and required answer form before reading or writing.'],
          ['Language recognition', 'A word, sound, or sentence relation was missed.', 'Work with short contextual audio or text and verify meaning.'],
          ['Location or tracking', 'The relevant passage section or audio speaker was lost.', 'Practice tracking text anchors, maps, sequences, or speakers.'],
          ['Decision rule', 'Evidence was located but classified incorrectly.', 'Practice specific task decision logic with written explanations.'],
          ['Content development', 'A point lacked explanation, mechanism, or evidence.', 'Plan and fully explain one main point before adding another.'],
          ['Organization', 'Ideas existed but progression or relationships were unclear.', 'Assign each paragraph one clear functional role.'],
          ['Language production', 'Intended meaning was clear but grammar or vocabulary failed.', 'Correct the recurring error pattern and apply on fresh sentences.'],
          ['Answer entry', 'Spelling, number, label, or transfer format was wrong.', 'Add a dedicated checking routine during transfer periods.'],
          ['Attention or pacing', 'Focus or available time expired at a specific point.', 'Practice section pacing and calm recovery drills.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Vague Blame versus Concrete Error Record',
        weak: {
          label: 'Vague Reaction',
          text: '"My Listening concentration was terrible today. I missed several numbers in Section 1."',
          whyItFails: 'Blames general concentration without identifying what cognitive cue was missed.',
        },
        controlled: {
          label: 'Actionable Diagnostic Entry',
          text: '"I heard the initial appointment time (2:30) but missed the correction after the pivot word "actually" (3:15). Repair: track replacement information, not merely the first number mentioned."',
          whyItWorks: 'Identifies the precise distractor mechanism and defines a clear rule for future tasks.',
        },
      },
      {
        type: 'selfCheck',
        title: 'Target and Evidence Audit',
        items: [
          'My study targets include observable behaviors as well as band scores.',
          'I separate assisted learning scores from independent performance scores.',
          'I classify recurring errors using the nine practical categories.',
        ],
      },
    ],
  },

  // 19. ov-patterns-practice-input (11.6–11.10)
  {
    id: 'ov-patterns-practice-input',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-4',
    partTitle: 'Part 1.4 · Diagnosis, Plan & Quality Control',
    title: 'Diagnostic patterns, effort balance, and input-to-output',
    minutes: 10,
    sourceSections: ['11.6', '11.7', '11.8', '11.9', '11.10'],
    needs: ['ov-targets-evidence-cycle'],
    blocks: [
      {
        type: 'lead',
        summary: 'Diagnosing test performance requires recognizing skill-specific patterns without turning them into rigid rules. Balance focused micro-drills with complete mock tests, allocate effort based on demonstrated gaps, and bridge input to output systematically.',
        whyItMatters: 'Spending equal time on all four skills when Writing is Band 5.5 and Reading is Band 8.0 wastes valuable study hours. Allocating effort to your weakest skill produces the fastest overall band improvement.',
        whatYouWillDo: 'Analyze seven diagnostic error patterns, balance micro-practice with full tests, and link sustainable input with active output.',
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Cross-Skill Diagnostic Patterns and Their True Causes',
        headers: ['Skill & Observed Pattern', 'Common False Assumption', 'Actual Operational Diagnosis'],
        rows: [
          ['Listening: errors in discussions', 'Needs more general podcasts', 'Speaker confusion or inability to process options while tracking audio.'],
          ['Reading: one question type repeatedly wrong', 'Candidate is bad at Reading', 'Method for that specific family (such as headings or True/False/Not Given) is misunderstood.'],
          ['Reading: accurate untimed, incomplete timed', 'Needs to read faster', 'Spends excessive time searching blindly or continually changing answers.'],
          ['Writing: strong vocabulary, weak score', 'Needs more advanced C2 words', 'Fails task coverage or prompt analysis; ideas are superficial.'],
          ['Writing: relevant points, low band', 'Needs more ideas', 'Points lack causal mechanisms or supporting examples.'],
          ['Speaking: fluent on familiar, halts on unfamiliar', 'Candidate lacks personality', 'Vocabulary retrieval friction or lack of content-planning routines.'],
          ['Speaking: rapid speech with unclear endings', 'Needs to talk faster', 'Phonological slip: missing word endings and blurred syllable stress.'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Avoid Subjective Diagnostic Stereotypes',
        body: 'A learner\'s nationality, native language, profession, or personality is not a diagnostic explanation. Always inspect the objective evidence in the candidate\'s actual recording or essay.',
      },
      {
        type: 'comparisonTable',
        caption: 'Focused Practice versus Complete Performance',
        headers: ['Dimension', 'Focused Practice (Micro-Drills)', 'Complete Performance (Full Simulation)'],
        rows: [
          ['Scope', 'Isolates one specific operation (such as writing a Task 1 overview or tracking map directions).', 'Integrates all operations across a complete section or full examination.'],
          ['Feedback speed', 'Immediate review after completing 3 to 5 items.', 'Reviewed after completing a full 40-item paper or 60-minute task.'],
          ['Best use', 'Repairing an isolated operational weakness.', 'Evaluating pacing, stamina, and multi-skill execution.'],
        ],
      },
      {
        type: 'steps',
        title: 'Six-Step Input-to-Output Bridge',
        items: [
          { action: '1. Read or listen for core meaning', why: 'Ensures complete comprehension of authentic English input.' },
          { action: '2. Notice a useful combination', why: 'Identifies natural collocations and structural transitions in context.' },
          { action: '3. Verify meaning and pattern', why: 'Confirms definition and grammar in a reliable learner dictionary.' },
          { action: '4. Summarize in your own words', why: 'Forces active processing without copying original phrases.' },
          { action: '5. Discuss or write on related topic', why: 'Transfers the newly acquired language into productive output.' },
          { action: '6. Check accuracy', why: 'Audits grammar, prepositions, and spelling in your response.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Four Directions of Vocabulary Retrieval',
        body: 'Review vocabulary across multiple pathways: word to meaning, meaning to word, word to original phrase, and phrase to connected spoken or written response. Group items by topic or grammar rather than random alphabetical lists.',
      },
      {
        type: 'selfCheck',
        title: 'Study Balance Review',
        items: [
          'I allocate more time to my weakest skill rather than dividing time equally.',
          'I combine focused micro-drills with complete timed practice simulations.',
          'I turn receptive reading and listening into active speaking and writing output.',
        ],
      },
    ],
  },

  // 20. ov-materials-stress-readiness-testday (11.11–11.14)
  {
    id: 'ov-materials-stress-readiness-testday',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-4',
    partTitle: 'Part 1.4 · Diagnosis, Plan & Quality Control',
    title: 'Materials, pressure, readiness, and test day',
    minutes: 10,
    sourceSections: ['11.11', '11.12', '11.13', '11.14'],
    needs: ['ov-patterns-practice-input'],
    blocks: [
      {
        type: 'lead',
        summary: 'Preparation success depends on selecting dependable learning materials, managing stress with practical adjustments, evaluating readiness realistically across all four skills, and executing a calm test-day routine.',
        whyItMatters: 'Practicing with inaccurate unofficial tests creates distorted expectations, while last-minute panic or identity document errors can invalidate your test booking.',
        whatYouWillDo: 'Evaluate study materials with six diagnostic questions, apply practical stress adjustments, audit readiness evidence, and prepare for test day.',
      },
      {
        type: 'steps',
        title: 'Six Questions to Evaluate Preparation Materials',
        items: [
          { action: '1. Check task conditions', why: 'Confirms whether the material uses authentic IELTS formats, timing, and word limits.' },
          { action: '2. Verify instruction clarity', why: 'Ensures prompts are unambiguous and mirror official examination styles.' },
          { action: '3. Test answer key defensibility', why: 'Verifies that every answer is provable directly from the passage or audio script.' },
          { action: '4. Check criterion-based scoring', why: 'Ensures displayed band scores are supported by published descriptor rationale.' },
          { action: '5. Distinguish rules from preferences', why: 'Confirms whether the guide separates mandatory rules from coaching suggestions.' },
          { action: '6. Check current official alignment', why: 'Ensures advice matches the current 2026 test delivery guidelines.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Practical Stress Triggers and Actionable Adjustments',
        headers: ['Stress Trigger', 'What It Feels Like', 'Actionable Practical Adjustment'],
        rows: [
          ['Unclear task prompt', 'Confusion and anxiety before starting.', 'Deconstruct prompt keywords into topic, focus, and instruction.'],
          ['Visible countdown clock', 'Panic and rushed writing.', 'Hide the screen timer during initial drafts; practice untimed before timed.'],
          ['Slow idea generation', 'Staring at a blank page.', 'Use standard idea scaffolds (benefits, drawbacks, immediate stakeholders).'],
          ['Fear of making an error', 'Hesitation and over-monitoring.', 'Accept that Band 7.0 and 8.0 allow minor errors; maintain forward momentum.'],
          ['Unfamiliar equipment', 'Keyboard or screen discomfort.', 'Practice on a standard external desktop keyboard and monitor.'],
          ['Previous disappointing score', 'Doubt about current preparation.', 'Rely on fresh diagnostic error logs rather than past results.'],
        ],
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Practical Adjustments Over Mindset Fads',
        body: 'Adopt practical calming routines like controlled breathing or a short planning pause. Deleting social apps, following NLP rituals, or enforcing English-only days are optional personal choices. They are not causal requirements for high band scores.',
      },
      {
        type: 'steps',
        title: 'Seven Evidence Sources for Real-World Readiness',
        items: [
          { action: '1. Fresh Listening and Reading runs', why: 'Scores from previously unseen tests provide reliable baseline evidence.' },
          { action: '2. Complete 60-minute Writing tests', why: 'Writing both Task 1 and Task 2 together in one hour measures real stamina.' },
          { action: '3. Full 3-part Speaking interviews', why: 'Speaking across both familiar and abstract topics evaluates fluency.' },
          { action: '4. Low recurrence in error logs', why: 'Verifies that previously identified mistakes have stopped repeating.' },
          { action: '5. Objective feedback review', why: 'Evaluates your work against published public band descriptors.' },
          { action: '6. Delivery interface familiarity', why: 'Ensures typing speed, screen reading, and navigation are effortless.' },
          { action: '7. Sub-skill minimum compliance', why: 'Confirms that your lowest skill meets your receiving body\'s requirement.' },
        ],
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Mandatory Test-Day Requirements',
        body: 'Bring the exact physical identification document used during registration. A phone photograph or photocopy will result in immediate disqualification. Arrive early, test headphones immediately, and report any equipment defect before the recording starts.',
        sourceUrl: 'https://ielts.org/take-a-test/preparation-resources/on-test-day',
        sourceLabel: 'Official IELTS test-day guidance',
      },
      {
        type: 'selfCheck',
        title: 'Readiness and Test-Day Audit',
        items: [
          'I evaluate my test readiness using fresh, unfamiliar test performance evidence.',
          'I have my original physical identification document ready for test day.',
          'I know how to report an audio or equipment issue to test center staff immediately.',
        ],
      },
    ],
  },

  // 21. ov-claims-checklists-sources (12.1–12.3, A.1–A.4)
  {
    id: 'ov-claims-checklists-sources',
    area: 'overview',
    track: 'shared',
    partId: 'ov-part-1-4',
    partTitle: 'Part 1.4 · Diagnosis, Plan & Quality Control',
    title: 'Retain the method, reject the false rule',
    minutes: 12,
    sourceSections: ['12.1', '12.2', '12.3', 'A.1', 'A.2', 'A.3', 'A.4'],
    needs: ['ov-materials-stress-readiness-testday'],
    blocks: [
      {
        type: 'lead',
        summary: 'IELTS preparation is clouded by rigid internet myths and false rules. High scores come from applying core communicative principles, using evidence-based methods, and rejecting arbitrary dogmas that restrict your natural language.',
        whyItMatters: 'Believing false rules like "never repeat a word" or "every essay must have four paragraphs" distorts your writing and creates artificial errors under examination conditions.',
        whatYouWillDo: 'Review eight core preparation principles, consult the complete 29-claim myth buster, audit final skill checklists, and explore official references.',
      },
      {
        type: 'steps',
        title: 'Eight Core Principles Across the Entire Course',
        items: [
          { action: '1. Understand the exact task', why: 'Decodes word limits, question anatomy, and prompt conditions before acting.' },
          { action: '2. Base decisions on evidence', why: 'Locates exact passage lines, audio cues, or data points before choosing an answer.' },
          { action: '3. Develop ideas with clear support', why: 'Explains causal mechanisms and concrete reasons rather than listing points.' },
          { action: '4. Choose language for meaning and context', why: 'Prioritizes precision, collocations, and natural register over obscure synonyms.' },
          { action: '5. Build grammatical range with control', why: 'Balances simple, compound, and complex sentences without error-filled convolution.' },
          { action: '6. Practice the failed operation directly', why: 'Isolates the exact micro-skill that caused marks to be lost.' },
          { action: '7. Verify improvements on fresh material', why: 'Ensures learned skills transfer to unseen tests under timed conditions.' },
          { action: '8. Follow current official delivery instructions', why: 'Aligns preparation with modern computer and Writing on Paper formats.' },
        ],
      },
      {
        type: 'mythBuster',
        title: 'Twenty-Nine Common IELTS Claims and Their Working Limits',
        items: WORD_BANKS.commonClaims29.data.map((item) => ({
          claim: item.claim,
          reality: item.reality,
          takeaway: 'Retain the method; reject the false rule.',
        })),
      },
      {
        type: 'comparisonTable',
        caption: 'Final Skill Checklists Across All Four Modules',
        headers: ['Skill Module', 'Core Operational Checklist'],
        rows: [
          ['Listening', 'Decode instructions; preview form and meaning; follow recording; track self-corrections and speaker attribution; recover after a missed item; check entry spelling.'],
          ['Reading', 'Identify question operation; locate text zone; read the full claim; verify against passage evidence; observe word counts; protect direct answer entry time.'],
          ['Academic Writing Task 1', 'Decode the visual; select 2 to 3 main features; write a clear overview without numbers; group details logically; compare and quantify accurately; omit personal opinions.'],
          ['General Training Writing Task 1', 'Identify recipient and purpose; adopt consistent register; cover all bullet points and sub-actions fully; organize with standard letter conventions.'],
          ['Writing Task 2', 'Analyze prompt topic, focus, and instruction; form a clear thesis; plan 2 main ideas with mechanisms and examples; maintain coherent progression; check grammar.'],
          ['Speaking', 'Answer questions directly; develop relevant ideas; use 1-minute cue card notes flexibly; explain broader societal views in Part 3; speak intelligibly with natural rhythm.'],
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Nineteen Official IELTS References and Research Provenance',
        headers: ['Official Resource', 'Official URL', 'Core Test Information Verified'],
        rows: WORD_BANKS.officialReferences19.data.map((item) => [item.title, item.url, item.description]),
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Editorial Scope and Research Provenance (Appendix A)',
        body: 'This study manual consolidates 39 detailed source research syntheses covering 421 video archive entries and official Cambridge, IDP, and British Council guidelines. Examples throughout this manual are independently phrased to teach methods and will not appear verbatim on your examination.',
      },
      {
        type: 'selfCheck',
        title: 'Course Completion Self-Check',
        items: [
          'I base my preparation on official assessment criteria rather than commercial score promises.',
          'I reject dogmatic rules like word quotas, mandatory four-paragraph templates, or accent mimicry.',
          'I use the final skill checklists to verify my technique before taking practice tests.',
        ],
      },
    ],
  },
]
