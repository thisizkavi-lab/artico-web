/**
 * Artico IELTS Study Course · Module 4: Writing Task 2 (Part 4.3)
 * Covers source sections §8.1 through §8.22.
 * Ten comprehensive units covering prompt decoding, question families, idea generation,
 * planning, introductions, body paragraph chains, evidence, conclusions, cohesion, and review.
 */

export const writingTask2Units = [
  // 17. w-t2-prompt-layers-and-plan (§8.1, §8.2)
  {
    id: 'w-t2-prompt-layers-and-plan',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Analyse the three layers of a Task 2 prompt',
    minutes: 8,
    sourceSections: ['8.1', '8.2'],
    needs: ['w-process-timing-length-review'],
    blocks: [
      {
        type: 'lead',
        summary: 'Every Task 2 prompt consists of three distinct layers: broad topic, specific focus, and explicit instruction. Converting a prompt into an actionable response plan requires identifying the exact analytical job requested.',
        whyItMatters: 'Writing eloquently about the general topic while ignoring the specific focus or limiting qualifiers results in an off-topic response, capping Task Response at Band 5.',
        whatYouWillDo: 'Study prompt layer and essay structure diagrams, identify limiting qualifiers, convert prompts into analytical jobs, and evaluate an off-topic contrast pair.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task2-3layers',
        title: 'The Three Layers of a Task 2 Prompt',
        caption: 'Anatomy of a prompt: Layer 1 Broad Topic (such as Higher education) → Layer 2 Specific Focus (such as Government funding for adult tuition) → Layer 3 Instruction & Limiting Qualifiers.',
        alt: 'Diagram showing three concentric layers of a Task 2 prompt from general theme to exact analytical instruction.',
      },
      {
        type: 'steps',
        title: '3-Layer Prompt Decoding Routine',
        items: [
          { action: 'Identify the broad subject theme (such as healthcare, transport, or education).', condition: 'Layer 1: Topic', why: 'Establishes the broad topical domain of the discussion.' },
          { action: 'Isolate the specific controversial assertion or policy under debate.', condition: 'Layer 2: Focus', why: 'Prevents writing a generic topical essay that fails to address the exact debate.' },
          { action: 'Check every limiting qualifier (for instance, "children", "in cities", or "the main reason").', condition: 'Qualifiers', why: 'Limits the scope of relevant evidence and prevents over-generalized claims.' },
          { action: 'Determine the exact instructional task requested by the final sentence.', condition: 'Layer 3: Instruction', why: 'Governs the overarching structural architecture and thesis of your essay.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Topic Drift versus Exact Focus Discipline',
        weak: {
          text: 'Education is essential for economic growth. Universities provide vital research, and schools teach children fundamental literacy and mathematics.',
          whyItFails: 'Writes generally about the value of education, ignoring the specific prompt focus on whether governments should pay university tuition for adults.',
        },
        controlled: {
          text: 'State funding should cover adult university tuition because retraining mature workers fills critical industrial labor shortages during technological transitions.',
          whyItWorks: 'Directly addresses the specific focus (state-funded adult tuition) with an explicit explanatory mechanism.',
        },
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task2-essay-structures',
        title: 'Four Standard Essay Structural Blueprints',
        caption: 'Structural layout of the four primary essay formats: 1 Opinion (Single side), 2 Discussion (Both views + personal view), 3 Problem/Solution, and 4 Two-part direct questions.',
        alt: 'Comparison diagram of four essay structural models showing paragraph functions from introduction to conclusion.',
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Task 2 Response Jobs and Required Output',
        headers: ['Prompt Family', 'Instruction Wording', 'Exact Response Job'],
        rows: [
          ['Opinion', '"To what extent do you agree or disagree?"', 'Establish a clear position and justify that position consistently.'],
          ['Discussion', '"Discuss both views and give your opinion."', 'Examine both sides fairly, then present and support your own judgment.'],
          ['Advantages Outweigh', '"Do the advantages outweigh the disadvantages?"', 'Analyze positive and negative effects, then evaluate which side carries greater significance.'],
          ['Causes and Solutions', '"What are the causes and what solutions can be offered?"', 'Explain contributing root factors and propose practical mitigation mechanisms.'],
          ['Problems and Measures', '"What problems does this cause and how can they be solved?"', 'Detail concrete negative outcomes and connect targeted remedies to them.'],
          ['Direct Questions', 'Two distinct interrogative sentences.', 'Provide direct answers and developed explanations for both questions.'],
          ['Trend Evaluation', '"Is this a positive or negative development?"', 'Evaluate whether the overall social or economic consequences are beneficial.'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Beware of Subconscious Keyword Anchoring',
        body: 'Do not seize on a single familiar keyword like "technology" and write a pre-memorized essay about smartphones. Always verify that your draft addresses the exact policy, demographic group, and condition specified in the prompt.',
      },
      {
        type: 'selfCheck',
        title: 'Prompt Decoding Checklist',
        items: [
          'I identify the broad topic, the specific focus, and the instructional command.',
          'I note all limiting qualifiers such as target populations or geographic settings.',
          'I verify that my planned response answers the precise question asked.',
          'I choose an essay structure that matches the prompt family.',
        ],
      },
    ],
  },

  // 18. w-t2-opinion-and-discussion (§8.3, §8.4)
  {
    id: 'w-t2-opinion-and-discussion',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Opinion and discussion question types',
    minutes: 8,
    sourceSections: ['8.3', '8.4'],
    needs: ['w-t2-prompt-layers-and-plan'],
    blocks: [
      {
        type: 'lead',
        summary: 'Opinion essays require taking a firm, consistent stance, whereas discussion tasks demand fair examination of two opposing viewpoints alongside your own judgment. Conflating these two question families undermines Task Response.',
        whyItMatters: 'Adding an opposite-side paragraph to an agree-or-disagree essay out of a false belief in "balance" confuses your position. Conversely, neglecting one side in a discussion essay leaves the task incomplete.',
        whatYouWillDo: 'Distinguish opinion tasks from discussion tasks, master the 3-obligation discussion blueprint, eliminate false balance, and evaluate worked contrast pairs.',
      },
      {
        type: 'comparisonTable',
        caption: 'Opinion Essays versus Discussion Essays',
        headers: ['Feature', 'Opinion / Extent Prompt', 'Discussion Prompt ("Discuss both views...")'],
        rows: [
          ['Instruction phrasing', '"To what extent do you agree or disagree?"', '"Discuss both views and give your opinion."'],
          ['Core obligation', 'Present and justify your personal stance.', 'Examine both perspectives objectively and state your own view.'],
          ['Paragraph 2 function', 'First supporting reason for your position.', 'Explain View A fairly, including its supporting rationale.'],
          ['Paragraph 3 function', 'Second supporting reason for your position.', 'Explain View B fairly, and state your reasoned evaluation.'],
          ['Need for opposite side', 'Unnecessary unless used as a qualified counterargument.', 'Mandatory. Both perspectives must receive thorough discussion.'],
          ['Clarity of position', 'Explicit in introduction, body, and conclusion.', 'Clear throughout, often resolved decisively in Body 2 or conclusion.'],
        ],
      },
      {
        type: 'section',
        id: 'the-three-discussion-obligations',
        title: 'The Three Obligations of a Discussion Prompt',
        bridge: 'When a prompt asks you to discuss both views and give your opinion, complete all three obligations.',
      },
      {
        type: 'prose',
        paragraphs: [
          'First, explain why reasonable people support the first perspective. Provide their rationale and concrete mechanism without dismissing their point prematurely.',
          'Second, explain the reasoning behind the second perspective with equal thoroughness and analytical seriousness. A one-sentence dismissal of one perspective fails official Task Response standards.',
          'Third, state your own position clearly. You can endorse one side, synthesize elements of both, or establish a qualified middle ground. Ensure the reader understands your verdict.',
        ],
      },
      {
        type: 'contrastPair',
        title: 'Discussion Integrity versus Dismissive Treatment',
        weak: {
          text: 'Some people think space exploration is valuable, but they are completely wrong because money should be spent on hospitals. Therefore, space travel is a waste.',
          whyItFails: 'Dismisses View A immediately without explaining why supporters value scientific advancement and satellite infrastructure.',
        },
        controlled: {
          text: 'Proponents of space exploration argue that satellite investments yield crucial atmospheric data for climate monitoring and global navigation systems.',
          whyItWorks: 'Presents the rationale for the first view fairly before evaluating competing domestic spending priorities.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The False "Balance" Myth in Opinion Essays',
        body: 'In an "agree or disagree" essay, you are never required to present both sides. If you completely agree that public transport should be free, write two strong paragraphs explaining why. Fabricating an artificial counter-argument risks creating logical contradictions.',
      },
      {
        type: 'selfCheck',
        title: 'Opinion and Discussion Mastery Checklist',
        items: [
          'I verify whether the prompt requires an opinion or a two-sided discussion.',
          'I avoid adding unwanted counter-arguments to single-position opinion essays.',
          'In discussion essays, I explain both perspectives thoroughly before judging.',
          'I ensure my personal position remains consistent from introduction to conclusion.',
        ],
      },
    ],
  },

  // 19. w-t2-advantages-and-evaluations (§8.5)
  {
    id: 'w-t2-advantages-and-evaluations',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Advantages, outweigh, and evaluative essays',
    minutes: 8,
    sourceSections: ['8.5'],
    needs: ['w-t2-opinion-and-discussion'],
    blocks: [
      {
        type: 'lead',
        summary: 'Prompts addressing advantages and disadvantages fall into two distinct categories: descriptive listings and comparative evaluations. Succeeding with evaluative prompts requires qualitative weighting rather than simple numerical tallying.',
        whyItMatters: 'Counting two advantages and one disadvantage does not prove that advantages outweigh disadvantages. A single severe environmental catastrophe outweighs minor economic conveniences.',
        whatYouWillDo: 'Master the 5 criteria for weighing advantages against disadvantages, evaluate positive/negative development prompts, and eliminate crude headcount arguments.',
      },
      {
        type: 'comparisonTable',
        caption: 'Three Types of Evaluative Prompts',
        headers: ['Prompt Type', 'Core Analytical Question', 'Required Paragraph Architecture'],
        rows: [
          ['Plain Advantages / Disadvantages', 'What are the positive and negative consequences?', 'Body 1: Principal advantages. Body 2: Principal disadvantages. No verdict required.'],
          ['Outweigh Evaluation', 'Which side carries greater significance or severity?', 'Body 1: Minor side (acknowledged). Body 2: Dominant side. Clear comparative judgment.'],
          ['Development Evaluation', 'Is this historical trend beneficial or harmful overall?', 'Body 1: Evidence of positive impacts. Body 2: Evidence of harms, concluding with overall evaluation.'],
        ],
      },
      {
        type: 'steps',
        title: 'Five Criteria for Qualitative Outweighing',
        items: [
          { action: 'Evaluate the intrinsic importance and fundamental human necessity of each effect.', condition: 'Criterion 1: Importance', why: 'Essential healthcare and safety naturally outweigh aesthetic or lifestyle conveniences.' },
          { action: 'Assess demographic reach: how many citizens or communities are affected.', condition: 'Criterion 2: Reach', why: 'Benefits enjoyed by entire societies outweigh inconveniences felt by narrow interest groups.' },
          { action: 'Consider temporal duration: whether consequences are temporary or permanent.', condition: 'Criterion 3: Duration', why: 'Permanent environmental degradation outweighs short-term economic gains during construction.' },
          { action: 'Determine the severity of potential harms or risks.', condition: 'Criterion 4: Severity', why: 'Irreversible risks require greater analytical weight than minor, manageable disruptions.' },
          { action: 'Examine mitigability: whether drawbacks can be resolved through regulation.', condition: 'Criterion 5: Mitigability', why: 'If a disadvantage can be mitigated through policy, its net negative impact decreases.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Crude Numerical Tallying versus Qualitative Weighting',
        weak: {
          text: 'Working from home has two advantages, such as saving commute time and flexible hours, but only one disadvantage, which is social isolation. Therefore, the advantages outweigh the disadvantages because two is more than one.',
          whyItFails: 'Relies on a primitive arithmetic headcount instead of evaluating the psychological and institutional depth of the issues.',
        },
        controlled: {
          text: 'Although remote work introduces feelings of professional isolation, the substantial reductions in daily commuting stress and regional traffic emissions represent far more enduring societal benefits.',
          whyItWorks: 'Directly compares temporal duration and public welfare to demonstrate why benefits carry greater overall weight.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Positive or Negative Development Means Evaluation',
        body: 'When asked whether a trend is a "positive or negative development", do not merely describe historical causes. The prompt requires an evaluative judgment regarding the net consequence of the change for individuals or society.',
      },
      {
        type: 'selfCheck',
        title: 'Advantages and Evaluative Essays Checklist',
        items: [
          'I check whether the task requires a descriptive report or an outweigh verdict.',
          'I weigh advantages against disadvantages using severity, reach, and permanence.',
          'I avoid simplistic arithmetic arguments ("two pros beat one con").',
          'I state an explicit evaluative position in the introduction and conclusion.',
        ],
      },
    ],
  },

  // 20. w-t2-causes-solutions-two-part (§8.6, §8.7)
  {
    id: 'w-t2-causes-solutions-two-part',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Causes, solutions, and two-part direct questions',
    minutes: 8,
    sourceSections: ['8.6', '8.7'],
    needs: ['w-t2-advantages-and-evaluations'],
    blocks: [
      {
        type: 'lead',
        summary: 'Problem-solving essays require precise conceptual separation between causes, problems, and solutions. Two-part direct questions demand balanced paragraph allocation and direct answers to both queries.',
        whyItMatters: 'Confusing causes with negative consequences distorts the first body paragraph. Proposing vague moral solutions ("people should be educated") without institutional mechanisms lowers Task Response.',
        whatYouWillDo: 'Differentiate the four core analytical terms, apply the solution mechanism test, balance two-part direct questions, and evaluate a concrete solution contrast pair.',
      },
      {
        type: 'comparisonTable',
        caption: 'Four Core Analytical Concepts in Problem Essays',
        headers: ['Concept', 'Analytical Definition', 'Example (Urban Traffic Congestion)'],
        rows: [
          ['Cause', 'Underlying factor or origin contributing to the situation.', 'Rapid urban population growth combined with inadequate suburban rail networks.'],
          ['Problem', 'The undesirable condition or operational failure itself.', 'Excessive vehicle volume gridlocking central urban roadways during peak hours.'],
          ['Effect', 'The negative consequences resulting from the problem.', 'Elevated air pollution levels, wasted productivity, and heightened commuter stress.'],
          ['Solution', 'A targeted intervention designed to mitigate the cause or problem.', 'Municipal investment in dedicated bus rapid transit lanes and congestion pricing zones.'],
        ],
      },
      {
        type: 'steps',
        title: 'The 3-Part Solution Mechanism Test',
        items: [
          { action: 'Identify the specific institution or actor responsible for taking action.', condition: 'Part 1: The Actor', why: 'Replaces vague passive claims like "something must be done" with accountable agents.' },
          { action: 'Describe the concrete policy, investment, or technological intervention.', condition: 'Part 2: The Action', why: 'Provides an authentic, practical measure rather than empty moral preaching.' },
          { action: 'Explain step by step how that intervention mitigates the primary cause.', condition: 'Part 3: The Mechanism', why: 'Demonstrates logical causation and proves how the solution resolves the issue.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Vague Moralizing versus Concrete Institutional Mechanism',
        weak: {
          text: 'To solve traffic problems, governments should educate drivers. People need to realize that pollution is bad and change their bad driving habits.',
          whyItFails: 'Relies on vague moral appeals without providing any practical mechanism that alters commuter incentives.',
        },
        controlled: {
          text: 'City authorities can implement congestion charges on private vehicles entering central districts during morning peak hours. This financial disincentive encourages commuters to switch to electric commuter rail lines, directly reducing vehicular volume.',
          whyItWorks: 'Names the actor (city authorities), the action (congestion charges), and the direct mechanism that changes behavior.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Balancing Two-Part Direct Questions',
        body: 'When answering two direct questions, allocate one body paragraph to each question. Do not let an easy first question occupy three-quarters of your essay while leaving the second question answered in two hasty sentences. Address both questions fully.',
      },
      {
        type: 'selfCheck',
        title: 'Causes, Solutions, and Two-Part Checklist',
        items: [
          'I distinguish between root causes and downstream negative effects.',
          'I name specific institutional actors (governments, schools, corporations) in solutions.',
          'I explain the exact causal mechanism connecting my solution to the problem.',
          'In two-part tasks, I allocate balanced paragraph space to both questions.',
        ],
      },
    ],
  },

  // 21. w-t2-generate-and-select-ideas (§8.8, §8.9)
  {
    id: 'w-t2-generate-and-select-ideas',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Generate manageable ideas and select fewer',
    minutes: 7,
    sourceSections: ['8.8', '8.9'],
    needs: ['w-t2-causes-solutions-two-part'],
    blocks: [
      {
        type: 'lead',
        summary: 'Successful essay writing requires generating plausible, explainable ideas rather than original academic theories. Selecting two manageable points and developing them thoroughly produces far higher scores than compiling a superficial list of claims.',
        whyItMatters: 'Listing five undeveloped reasons creates a breathless shopping list that Examiner descriptors penalize under Task Response. Deep development of two points demonstrates analytical maturity.',
        whatYouWillDo: 'Apply two practical idea-generation prompts, screen candidate ideas against five depth questions, and eliminate the shopping-list trap.',
      },
      {
        type: 'section',
        id: 'two-idea-generation-prompts',
        title: 'Two Practical Idea-Generation Prompts',
        bridge: 'Use these cognitive prompts to generate relevant ideas within two minutes.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Consider the conversation prompt. How would you explain this issue to a sensible colleague during a coffee break? This prompt strips away artificial exam anxiety and surfaces natural reasoning.',
          'The familiar-answer prompt asks: "What is the most widely recognized, credible reason that directly addresses this prompt?" Testing examiners do not reward obscure theories. They reward clear, supportable arguments developed with precision.',
        ],
      },
      {
        type: 'steps',
        title: 'The 5-Question Idea Screening Protocol',
        items: [
          { action: 'State the core claim in a single declarative sentence.', condition: 'Question 1: Point', why: 'Ensures the central argument is sharp, concise, and focused.' },
          { action: 'Explain why this claim is logically sound or widely observable.', condition: 'Question 2: Plausibility', why: 'Validates that the argument reflects credible human behavior or economics.' },
          { action: 'Trace the underlying cause-and-effect mechanism step by step.', condition: 'Question 3: Mechanism', why: 'Provides the critical analytical bridge between premise and conclusion.' },
          { action: 'Identify an ordinary, realistic scenario that exemplifies the point.', condition: 'Question 4: Evidence', why: 'Grounds the theoretical explanation in a concrete real-world context.' },
          { action: 'Verify how this idea directly fulfills the prompt instructional task.', condition: 'Question 5: Task Fit', why: 'Ensures that the point answers the prompt rather than drifting.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'The Undeveloped Shopping List versus Deep Development',
        weak: {
          text: 'Fast food is harmful because it contains excessive fat. It also leads to heart disease, causes diabetes, costs healthcare systems money, and makes children lazy.',
          whyItFails: 'Presents five separate claims in a breathless catalogue without explaining the physiological or behavioral mechanism for any of them.',
        },
        controlled: {
          text: 'Regular consumption of heavily processed fast food accelerates cardiovascular disease. These products contain elevated levels of saturated fats and refined sodium, which elevate arterial cholesterol and blood pressure over time. Consequently, individuals face heightened risks of chronic hypertension.',
          whyItWorks: 'Selects one primary health consequence and traces the explicit physiological mechanism through to its clinical conclusion.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Avoid Obscure or Over-Complicated Ideas',
        body: 'Do not choose an impressive philosophical idea that exceeds your English vocabulary. If you cannot explain the mechanism clearly using words you control, discard the idea. Simple, plausible reasons explained thoroughly achieve Band 8 and 9.',
      },
      {
        type: 'selfCheck',
        title: 'Idea Generation and Selection Checklist',
        items: [
          'I choose ideas that answer the prompt rather than general themes.',
          'I select only one or two central points per body paragraph.',
          'I test whether I can explain the complete mechanism in English I control.',
          'I avoid assembling lists of superficial claims without supporting explanation.',
        ],
      },
    ],
  },

  // 22. w-t2-plan-and-introduction (§8.10, §8.11)
  {
    id: 'w-t2-plan-and-introduction',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Make a keyword plan and write a direct introduction',
    minutes: 8,
    sourceSections: ['8.10', '8.11'],
    needs: ['w-t2-generate-and-select-ideas'],
    blocks: [
      {
        type: 'lead',
        summary: 'A concise keyword plan establishes the logical backbone of an essay before drafting begins. An effective academic introduction restates the controversy accurately and presents an explicit thesis statement without decorative filler.',
        whyItMatters: 'Drafting without a plan leads to mid-essay contradictions and rambling arguments. Adding grandiose clichés ("Since the dawn of human civilization...") wastes valuable time and weakens academic tone.',
        whatYouWillDo: 'Construct a 6-line keyword plan, master the 2-sentence direct introduction formula, evaluate an introductory contrast pair, and eliminate memorized clichés.',
      },
      {
        type: 'section',
        id: 'the-6-line-keyword-plan',
        title: 'The 6-Line Keyword Planning Blueprint',
        bridge: 'Spend five minutes writing concise keywords for each essay component before writing.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Line 1: Direct thesis position (for instance, state funding justified for critical retraining).',
          'Line 2: Body 1 main point (economic mechanism: addressing industrial skill shortages).',
          'Line 3: Body 1 concrete support (adults switching from manufacturing to software).',
          'Line 4: Body 2 main point (social equity: preventing middle-aged unemployment).',
          'Line 5: Body 2 concrete support (tax revenue gains exceeding initial tuition outlays).',
          'Line 6: Concluding summary keywords (state investment returns via productivity).',
        ],
      },
      {
        type: 'steps',
        title: 'The 2-Sentence Introduction Protocol',
        items: [
          { action: 'Sentence 1: Paraphrase the prompt statement using precise academic synonyms.', condition: 'Step 1: Background', why: 'Frames the overarching debate for the reader without copying original text.' },
          { action: 'Sentence 2: State your explicit answer, position, or essay direction directly.', condition: 'Step 2: Thesis', why: 'Fulfills the Task Response requirement for a clear position throughout the response.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Grandiose Clichés versus Direct Academic Paraphrasing',
        weak: {
          text: 'Since the dawn of history, education has been the most important weapon for humanity. In this modern world full of controversy, many people hold diverse opinions about this burning issue. This essay will examine both sides and give my opinion.',
          whyItFails: 'Uses hollow memorized clichés without defining the specific topic or stating an actual thesis position.',
        },
        controlled: {
          text: 'Whether national governments should subsidize university tuition for mature students remains a subject of ongoing debate. In my view, public funding is fully justified because continuous workforce reskilling is essential for modern economic resilience.',
          whyItWorks: 'Paraphrases the debate accurately in Sentence 1 and presents a definitive, reasoned thesis in Sentence 2.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Never Copy Prompt Strings Verbatim',
        body: 'Examiners discard strings of words copied directly from the prompt when calculating your total word count. Paraphrase by reorganizing clause structures and substituting accurate synonyms, while retaining technical terms that have no natural equivalents.',
      },
      {
        type: 'selfCheck',
        title: 'Planning and Introduction Checklist',
        items: [
          'I prepare a keyword plan covering both body paragraphs before drafting.',
          'I avoid formulaic opening clichés ("Since ancient times", "In the modern era").',
          'My introduction states an explicit thesis position in response to the task.',
          'I paraphrase the prompt parameters accurately without altering meaning.',
        ],
      },
    ],
  },

  // 23. w-t2-body-paragraphs-and-mechanisms (§8.12, §8.13)
  {
    id: 'w-t2-body-paragraphs-and-mechanisms',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Build body paragraphs with explicit mechanisms',
    minutes: 8,
    sourceSections: ['8.12', '8.13'],
    needs: ['w-t2-plan-and-introduction'],
    blocks: [
      {
        type: 'lead',
        summary: 'Body paragraphs form the analytical core of an essay. Constructing a cohesive paragraph requires an explicit causal chain. Start with a clear topic sentence, explain the mechanism, and illustrate it with concrete evidence.',
        whyItMatters: 'Jumping from premise to conclusion without explaining intermediate steps forces examiners to guess your logic. Circular statements ("it is beneficial because it helps") score poorly under Task Response.',
        whatYouWillDo: 'Study the paragraph reasoning chain SVG diagram, analyze an annotated bus transport specimen, eliminate missing logical links, and avoid circular reasoning.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task2-paragraph-chain',
        title: 'The 4-Sentence Body Paragraph Reasoning Chain',
        caption: 'Sequential paragraph structure: 1 Topic Sentence (Core claim) → 2 Explanation Mechanism (Why/How it operates) → 3 Concrete Evidence (Real-world case) → 4 Impact & Concluding Check.',
        alt: 'Flowchart illustrating the four sequential stages of a fully developed Task 2 body paragraph.',
      },
      {
        type: 'section',
        id: 'four-sequential-moves',
        title: 'Four Sequential Moves in Paragraph Development',
        bridge: 'Follow these four sequential moves to construct a fully developed argument.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Move one establishes the central claim through a clear topic sentence. Move two explains the underlying cause, revealing why the claim holds true under ordinary conditions.',
          'Move three grounds the explanation in a concrete real-world scenario. Move four links the example back to the prompt, confirming its direct analytical relevance to the overarching task.',
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'essay',
        title: 'Annotated Body Paragraph: Municipal Public Transport',
        provenance: 'Original instructional specimen authored for Artico IELTS Study.',
        segments: [
          { id: '1', label: 'Topic Sentence', text: 'Expanding municipal bus networks allows lower-income workers to access employment opportunities across wider geographic areas.', note: 'Topic Sentence: Establishes a focused, supportable central claim immediately.' },
          { id: '2', label: 'Mechanism', text: 'Frequent and reliable services eliminate uncertainty regarding arrival schedules, making longer daily commutes viable for individuals without private automobiles.', note: 'Mechanism: Explains how schedule reliability alters practical commuting possibilities.' },
          { id: '3', label: 'Concrete Support', text: 'For example, a shift worker living in an outer suburb can accept manufacturing employment in an industrial zone if early morning bus connections are established.', note: 'Concrete Support: Provides a realistic, plausible scenario illustrating the mechanism.' },
          { id: '4', label: 'Impact & Relevance', text: 'Consequently, investment in transport infrastructure directly reduces geographic barriers to employment.', note: 'Impact & Relevance: Ties the concrete illustration back to the overarching topic sentence.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Missing Logical Step versus Complete Causal Chain',
        weak: {
          text: 'Online courses are convenient. Therefore, they improve educational quality for all students.',
          whyItFails: 'Makes a huge logical leap from personal convenience to institutional academic quality without showing any mechanism.',
        },
        controlled: {
          text: 'Online courses eliminate the need for physical travel to campus. This flexibility allows working adults with limited discretionary time to attend lectures consistently. More consistent attendance, in turn, supports better academic outcomes.',
          whyItWorks: 'Constructs a transparent three-step causal bridge linking travel reduction to attendance, and attendance to achievement.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Avoid Circular Explanations',
        body: 'Circular reasoning repeats the premise using different words: "Public transport is effective because it works well." This adds zero analytical content. Always answer the question: "By what specific mechanism does this outcome occur?"',
      },
      {
        type: 'selfCheck',
        title: 'Body Paragraph Construction Checklist',
        items: [
          'My topic sentence clearly announces the central focus of the paragraph.',
          'I explain the step-by-step mechanism connecting cause to effect.',
          'My example illustrates the mechanism rather than introducing an unrelated point.',
          'I verify that no missing logical leaps remain between sentences.',
        ],
      },
    ],
  },

  // 24. w-t2-examples-position-qualification (§8.14, §8.15, §8.16)
  {
    id: 'w-t2-examples-position-qualification',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Plausible examples, consistent position, and qualification',
    minutes: 8,
    sourceSections: ['8.14', '8.15', '8.16'],
    needs: ['w-t2-body-paragraphs-and-mechanisms'],
    blocks: [
      {
        type: 'lead',
        summary: 'Effective supporting examples illustrate mechanisms through plausible, ordinary scenarios rather than fabricated academic statistics. A strong essay maintains an uncompromised, consistent position and uses calibrated qualification markers.',
        whyItMatters: 'Inventing fake university studies ("A 2021 Oxford survey showed 84.7%...") damages credibility. Shifting your stance between paragraphs or making sweeping generalizations lowers Task Response.',
        whatYouWillDo: 'Deploy three legitimate sources of evidence, eliminate fabricated research studies, audit position consistency across paragraphs, and master five qualification tools.',
      },
      {
        type: 'steps',
        title: 'Three Legitimate Sources of Task 2 Evidence',
        items: [
          { action: 'Describe widely observable social realities or common public patterns.', condition: 'Source 1: Observation', why: 'Draws upon shared human experience without requiring technical citations.' },
          { action: 'Construct a plausible, realistic scenario that exemplifies the point.', condition: 'Source 2: Plausible Case', why: 'Demonstrates how a policy operates in the daily life of an ordinary citizen.' },
          { action: 'Reference well-documented municipal policies or historical precedents.', condition: 'Source 3: Known Precedent', why: 'Provides authentic historical grounding (for instance, congestion pricing in London).' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Fabricated Academic Statistics versus Plausible Real-World Scenarios',
        weak: {
          text: 'According to a recent study conducted by Harvard University in 2022, exactly 78.4% of employees who work remotely are 45% more productive than office workers.',
          whyItFails: 'Fabricates precise statistics and academic institutions to simulate authority, which examiners instantly recognize as artificial.',
        },
        controlled: {
          text: 'In many technology firms, remote software developers report higher output because working from home eliminates open-plan office distractions and disruptive commuting fatigue.',
          whyItWorks: 'Draws upon a credible, observable workplace dynamic without resorting to fraudulent data.',
        },
      },
      {
        type: 'comparisonTable',
        caption: 'Five Precision Qualification Tools',
        headers: ['Category', 'Calibrated Language Forms', 'Example Application'],
        rows: [
          ['Scope limitation', 'Some, many, a considerable proportion of', '"Many suburban commuters rely on rail networks."'],
          ['Probability / Modality', 'Can, may, tend to, are likely to', '"Prolonged screen exposure can lead to eye fatigue."'],
          ['Contextual condition', 'In certain circumstances, under specific regulatory frameworks', '"Under well-enforced regulations, privatization can foster efficiency."'],
          ['Demographic focus', 'For individuals with limited mobility, among mature learners', '"For elderly citizens, digital banking interfaces can present barriers."'],
          ['Conditional dependency', 'Provided that adequate safeguards exist', '"Remote work succeeds provided that communication channels remain open."'],
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Unresolved Contradiction Trap',
        body: 'Do not write that you completely agree with a total ban in your introduction if you later defend rural driving in Body 2. Either qualify your thesis from the start or remove the contradictory exception.',
      },
      {
        type: 'selfCheck',
        title: 'Evidence, Position, and Qualification Checklist',
        items: [
          'I use plausible real-world scenarios rather than invented university statistics.',
          'My position remains consistent across introduction, body, and conclusion.',
          'I replace absolute claims ("always", "all people") with qualified language ("often", "many").',
          'I avoid cultural, national, or generational stereotypes in my explanations.',
        ],
      },
    ],
  },

  // 25. w-t2-conclusion-and-cohesion (§8.17, §8.18)
  {
    id: 'w-t2-conclusion-and-cohesion',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Write the conclusion and control cohesion',
    minutes: 8,
    sourceSections: ['8.17', '8.18'],
    needs: ['w-t2-examples-position-qualification'],
    blocks: [
      {
        type: 'lead',
        summary: 'A conclusion brings the essay to a logical close by restating the central thesis and synthesizing the core supporting reasons. Cohesion functions through natural grammatical relationships and sentence boundaries rather than mechanical connector displays.',
        whyItMatters: 'Introducing new arguments in the conclusion confuses the reader. Overusing formulaic connectors ("Furthermore", "Moreover") at the start of every sentence degrades Coherence and Cohesion.',
        whatYouWillDo: 'Execute the 4-step conclusion protocol, master seven logical relationship connectors, eliminate comma splices, and evaluate a cohesive contrast pair.',
      },
      {
        type: 'steps',
        title: 'The 4-Step Logical Conclusion Protocol',
        items: [
          { action: 'Signal the final summary using a standard phrase (for example, "In conclusion,").', condition: 'Step 1: Signpost', why: 'Alerts the reader that the essay has reached its final synthesis.' },
          { action: 'Restate your overarching thesis position in fresh language.', condition: 'Step 2: Thesis Restatement', why: 'Confirms that your position has remained constant throughout the essay.' },
          { action: 'Synthesize the primary reasoning points from both body paragraphs.', condition: 'Step 3: Synthesis', why: 'Unifies your supporting arguments into a coherent concluding summary.' },
          { action: 'Verify that no unannounced arguments or generic slogans are included.', condition: 'Step 4: Boundary Check', why: 'Maintains strict relevance and prevents distracting loose ends.' },
        ],
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Logical Connective Relationships and Grammatical Checks',
        headers: ['Relationship', 'Appropriate Connectors', 'Grammatical and Punctuation Check'],
        rows: [
          ['Addition', 'Furthermore, in addition, additionally', 'Use only to add a genuinely distinct point. Punctuate with a following comma.'],
          ['Contrast', 'However, in contrast, whereas, by contrast', 'Do not connect two independent clauses with a comma before "however".'],
          ['Concession', 'Although, despite, while', '"Although" introduces a clause; "despite" requires a noun phrase or -ing form.'],
          ['Causal reason', 'Because, since, given that', 'Introduces the explanatory clause directly; avoid sentence fragments.'],
          ['Consequence / Result', 'Therefore, as a result, consequently', 'Ensures that the stated consequence follows logically from the premise.'],
          ['Exemplification', 'For example, for instance, specifically', 'Must be followed by a concrete instance illustrating the preceding sentence.'],
          ['Condition', 'If, provided that, unless', 'Specifies the necessary operational boundary for a claim to hold true.'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'Mechanical Connector Stacking versus Natural Reference Flow',
        weak: {
          text: 'Furthermore, public transport is cheap. Moreover, buses are clean. Therefore, people should use them. However, some people drive cars.',
          whyItFails: 'Begins every single sentence with a formulaic linker, creating robotic, disjointed prose.',
        },
        controlled: {
          text: 'Affordable fares and clean carriages encourage commuters to choose public transport over private automobiles. While some drivers still prefer the autonomy of personal vehicles, reliable transit networks significantly reduce congestion.',
          whyItWorks: 'Uses subject-verb variety, noun phrases, and subordinate clauses ("While...") to achieve natural cohesion.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The Comma Splice with "However"',
        body: 'Never join two complete independent clauses using a comma before "however". Write: "The policy is costly; however, it works." Alternatively, use a subordinating conjunction: "Although the policy is costly, it works." Proper punctuation prevents comma splices.',
      },
      {
        type: 'selfCheck',
        title: 'Conclusion and Cohesion Checklist',
        items: [
          'My conclusion restates my thesis and summarizes both body arguments.',
          'I refrain from introducing new evidence or moral preaching in the conclusion.',
          'I vary my sentence structures rather than starting every sentence with a linker.',
          'I verify that connectors like "however" and "therefore" are punctuated properly.',
        ],
      },
    ],
  },

  // 26. w-t2-review-models-feedback-myths (§8.19, §8.20, §8.21, §8.22)
  {
    id: 'w-t2-review-models-feedback-myths',
    area: 'writing',
    track: 'shared',
    partId: 'w-part-4-3',
    partTitle: 'Part 4.3 · Task 2: Academic & General Training Essays',
    title: 'Priority review, sample essays, feedback, and myths',
    minutes: 8,
    sourceSections: ['8.19', '8.20', '8.21', '8.22'],
    needs: ['w-t2-conclusion-and-cohesion'],
    blocks: [
      {
        type: 'lead',
        summary: 'A disciplined top-down review protocol catches high-impact task and structural errors before minor spelling slips. Learning actively from model essays and transforming diagnostic feedback into targeted grammar repairs accelerates writing progress.',
        whyItMatters: 'Spending precious final minutes polishing vocabulary while leaving half of a prompt unanswered causes severe score penalties. Believing internet myths about memorized templates wastes preparation effort.',
        whatYouWillDo: 'Execute the 3-tier priority review funnel, learn from models actively, apply the 5-step feedback repair cycle, and debunk six widespread Task 2 myths.',
      },
      {
        type: 'steps',
        title: 'The 3-Tier Top-Down Review Funnel',
        items: [
          { action: 'Verify that every prompt instruction and limiting qualifier is directly addressed.', condition: 'Tier 1: Task', why: 'An unanswered task component permanently limits Task Response.' },
          { action: 'Check paragraph jobs, position consistency, and logical transitions.', condition: 'Tier 2: Argument', why: 'Ensures that arguments follow a clear line of progression without contradictions.' },
          { action: 'Audit verb tenses, subject-verb agreement, articles, plurals, and spelling.', condition: 'Tier 3: Language', why: 'Eliminates slips and secures high Grammatical Range and Lexical Resource bands.' },
        ],
      },
      {
        type: 'steps',
        title: '5-Step Feedback-to-Repair Routine',
        items: [
          { action: 'Identify the exact error and diagnose why the phrasing or logic failed.', condition: 'Step 1: Diagnose', why: 'Pinpoints whether the breakdown was a grammar slip, task misunderstanding, or lexical misuse.' },
          { action: 'Restate the intended meaning in plain, clear English without decorative fluff.', condition: 'Step 2: Restate', why: 'Ensures conceptual clarity before attempting advanced grammar structures.' },
          { action: 'Rewrite the faulty sentence using an accurate, controlled construction.', condition: 'Step 3: Rewrite', why: 'Builds positive neuromuscular memory for correct sentence patterns.' },
          { action: 'Compose three original practice sentences applying the same repaired pattern.', condition: 'Step 4: Drill', why: 'Consolidates mastery of the target structure through deliberate practice.' },
          { action: 'Deploy the repaired pattern under timed conditions in a fresh response.', condition: 'Step 5: Transfer', why: 'Confirms authentic transfer of skill to unfamiliar prompt contexts.' },
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Study Models as Blueprints, Never Scripts',
        body: 'Treat band 9 sample essays as architectural specimens to analyze, not scripts to memorize. Trace how the writer transitions between claims and evidence. Never copy whole paragraphs into test responses; examiners detect memorized chunks instantly.',
      },
      {
        type: 'mythBuster',
        title: 'Task 2 Myths versus Official Reality',
        items: [
          {
            claim: 'Longer essays automatically achieve higher band scores.',
            verdict: 'Myth',
            reality: 'Writing 400 words often introduces grammatical errors and repetition. A tightly argued essay of 260 to 290 words satisfies all criteria for Band 9.',
          },
          {
            claim: 'You must always write a balanced essay presenting both viewpoints.',
            verdict: 'Myth',
            reality: 'In an "agree or disagree" essay, taking a strong single position is completely acceptable. Only "Discuss both views" prompts require balanced two-sided coverage.',
          },
          {
            claim: 'Using complex vocabulary words from a thesaurus produces Band 8.',
            verdict: 'Myth',
            reality: 'Misusing obscure words out of context ruins precision. Natural collocations and accurate academic vocabulary achieve high lexical scores.',
          },
          {
            claim: 'Every essay must follow a rigid 4-paragraph template.',
            verdict: 'Myth',
            reality: 'While four paragraphs is standard and effective, five paragraphs (for instance, addressing causes, effects, and solutions separately) is equally valid when logic requires it.',
          },
          {
            claim: 'You must cite famous research studies or university percentages.',
            verdict: 'Myth',
            reality: 'IELTS tests English writing proficiency, not general knowledge. Plausible everyday scenarios and logical mechanisms are completely sufficient.',
          },
          {
            claim: 'Complex grammar means writing sentences with forty or fifty words.',
            verdict: 'Myth',
            reality: 'Overly long sentences lead to punctuation breakdowns and comma splices. Effective complex sentences combine two or three tight clauses in 20 to 25 words.',
          },
        ],
      },
      {
        type: 'selfCheck',
        title: 'Task 2 Final Quality Checklist',
        items: [
          'I review my draft top-down: task completion first, argument second, language third.',
          'I ensure my word count exceeds the mandatory 250-word minimum.',
          'I analyze model essays to understand structural methods rather than memorizing scripts.',
          'I turn feedback corrections into deliberate three-sentence drills.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-review-routine',
        label: 'Take a completed practice essay and audit it against the 3-tier top-down review funnel.',
      },
    ],
  },
]
