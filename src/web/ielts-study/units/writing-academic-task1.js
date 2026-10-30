/**
 * Artico IELTS Study Course · Module 4A: Academic Writing Task 1 (12 Units)
 *
 * Source coverage:
 *   - Part 4.2: §6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7, §6.8, §6.9, §6.10,
 *       §6.11, §6.12, §6.13, §6.14, §6.15, §6.16, §6.17, §6.18, §6.19, §6.20, §6.21 (12 units)
 * Total: 12 units
 */

export const writingAcademicTask1Units = [
  // 5. w-a1-reporting-principle-and-jobs (§6.1, §6.2)
  {
    id: 'w-a1-reporting-principle-and-jobs',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'The reporting principle and visual jobs',
    minutes: 7,
    sourceSections: ['6.1', '6.2'],
    needs: ['w-process-timing-length-review'],
    blocks: [
      {
        type: 'lead',
        summary: 'Academic Writing Task 1 is an objective information-transfer task. You must report what the visual explicitly shows, select significant features, and support them with accurate data and comparisons.',
        whyItMatters: 'Inventing external reasons for trends, expressing personal opinions, or speculating about causes violates Task Achievement and lowers your band score.',
        whatYouWillDo: 'Master the fundamental reporting question, identify five forbidden inventions, classify seven visual families into four functional jobs, and establish strict objective reporting boundaries.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'The Golden Reporting Rule',
        body: 'Always ask: "Can the supplied visual support this exact sentence?" If the graphic shows sales rising in 2020, you can state that sales increased. You cannot claim that sales grew because of marketing campaigns.',
        link: { url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing', text: 'Official IELTS Academic Writing Format' },
      },
      {
        type: 'comparisonTable',
        caption: 'The Four Functional Visual Jobs in Academic Task 1',
        headers: ['Functional Job', 'Temporal/Spatial Mode', 'Typical Visual Formats', 'Primary Reporting Demand'],
        rows: [
          ['Dynamic', 'Shows change over time across dates or years.', 'Line graphs, multi-year bar charts, pie chart pairs, time tables.', 'Describe trends, phases of movement, rates of change, and crossing points.'],
          ['Static', 'Compares categories at one fixed point in time.', 'Single-year bar charts, single pie charts, static comparison tables.', 'Compare relative shares, rankings, extremes, and percentage proportions.'],
          ['Sequential', 'Illustrates ordered procedural stages or natural cycles.', 'Linear manufacturing flows, biological life cycles, recycling loops.', 'Describe stages in sequence, transformations, inputs, and cyclical loops.'],
          ['Spatial', 'Depicts physical layouts, geographical maps, or building plans.', 'Past vs present maps, proposed redevelopment site plans.', 'Report physical additions, removals, relocations, conversions, and directions.'],
        ],
      },
      {
        type: 'section',
        id: 'five-forbidden-inventions',
        title: 'Five Forbidden Inventions in Task 1',
        bridge: 'Never include these five types of unstated speculation in your report.',
      },
      {
        type: 'prose',
        paragraphs: [
          'First, never invent external causes not explicitly stated on the graphic. Second, omit personal opinions about whether an observed trend is beneficial or regrettable.',
          'Third, avoid adding political or geographic groupings not provided in the prompt. Fourth, never state exact values that a grid cannot support. Fifth, do not describe benefits that a diagram does not show.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Visual Label Does Not Equal Visual Job',
        body: 'Do not decide your reporting method based on the visual label alone. A bar chart can be dynamic if it tracks years, or static if it compares categories in one year. Identify the visual job before writing.',
      },
      {
        type: 'selfCheck',
        title: 'Reporting Principle Checklist',
        items: [
          'I report only data directly depicted on the graphic.',
          'I exclude personal opinions, speculation, and external real-world causes.',
          'I determine whether the graphic is dynamic, static, sequential, or spatial.',
          'I verify that every sentence can be proven from the graphic.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-reporting-principle',
        label: 'Inspect a Task 1 prompt and verify that no sentence in your draft speculates about causes.',
      },
    ],
  },

  // 6. w-a1-decode-and-main-features (§6.3, §6.4)
  {
    id: 'w-a1-decode-and-main-features',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Decode the visual and select main features',
    minutes: 7,
    sourceSections: ['6.3', '6.4'],
    needs: ['w-a1-reporting-principle-and-jobs'],
    blocks: [
      {
        type: 'lead',
        summary: 'Carefully decoding graphic axes, units, timeframes, and population definitions prevents catastrophic misreadings. Finding main features requires stepping back from individual figures to identify broad patterns.',
        whyItMatters: 'Misinterpreting a negative measure or confusing percentage points with total headcounts distorts the entire report, capping your Task Achievement band at 5.',
        whatYouWillDo: 'Execute a 9-item pre-draft visual decoding routine, evaluate negative measures on a contrast pair, and master eight macro-feature questions.',
      },
      {
        type: 'steps',
        title: 'The 9-Item Pre-Draft Decoding Routine',
        items: [
          { action: 'Read the task prompt statement to identify the core subject.', condition: 'Step 1 of 9', why: 'Defines the overarching research topic and primary comparison.' },
          { action: 'Inspect the chart title and any explanatory subtitles.', condition: 'Step 2 of 9', why: 'Clarifies the specific metric or population surveyed.' },
          { action: 'Check the subject or population group.', condition: 'Step 3 of 9', why: 'Differentiates working adults from households, students, or patients.' },
          { action: 'Examine both horizontal and vertical axes and scales.', condition: 'Step 4 of 9', why: 'Identifies whether scales start at zero or use truncated intervals.' },
          { action: 'Verify exact measurement units (percentages, millions, tonnes).', condition: 'Step 5 of 9', why: 'Prevents confusing shares with absolute numerical headcounts.' },
          { action: 'Audit the legend or key and associate each symbol with its line.', condition: 'Step 6 of 9', why: 'Prevents attributing the trend of one category to another.' },
          { action: 'Confirm start dates, end dates, and total timeframe.', condition: 'Step 7 of 9', why: 'Determines the appropriate grammatical tenses for the report.' },
          { action: 'Count the categories and observe how they are grouped.', condition: 'Step 8 of 9', why: 'Informs how you will divide details between the two body paragraphs.' },
          { action: 'Read footnotes, asterisk notes, projections, or caveats.', condition: 'Step 9 of 9', why: 'Flags future estimates that require modal verbs like "is projected to".' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Decoding Negative Measures and Inverted Axes',
        weak: {
          text: 'The percentage of adults unable to access dental treatment increased from 15% to 35%. Therefore, dental access improved over the decade.',
          whyItFails: 'Misinterprets a negative measure: a rise in people UNABLE to access treatment means healthcare accessibility deteriorated, not improved.',
        },
        controlled: {
          text: 'The percentage of adults unable to access dental treatment rose from 15% to 35%, indicating worsening barriers to oral healthcare.',
          whyItWorks: 'Correctly interprets the direction of the negative indicator without inverting factual reality.',
        },
      },
      {
        type: 'section',
        id: 'eight-macro-questions',
        title: 'Eight Macro-Feature Discovery Questions',
        bridge: 'Ask these eight questions to identify the overarching patterns for your overview.',
      },
      {
        type: 'prose',
        paragraphs: [
          'What is the broad overall direction of each series? Which categories represent the highest and lowest values across the period? Which groups behave similarly, and which category represents a noticeable exception?',
          'Does the relative ranking change between the start and end years? Is there a major turning point or structural phase shift? Do categories converge over time, or do they diverge? Finally, is remarkable stability itself a prominent feature?',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Superlative Precision Check',
        body: 'Check every superlative carefully. "Highest" requires a defined measure and timeframe. "Largest increase" requires comparing changes across intervals, rather than picking the line with the highest final value.',
      },
      {
        type: 'selfCheck',
        title: 'Decoding and Feature Selection Checklist',
        items: [
          'I verify units (percentages vs headcounts vs currency amounts).',
          'I check whether the timeline includes historical facts or projected estimates.',
          'I identify broad trends rather than focusing on isolated data points.',
          'I distinguish the highest final value from the largest net increase.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-decode-features',
        label: 'Audit a chart and write answers to the eight macro-feature discovery questions.',
      },
    ],
  },

  // 7. w-a1-plan-and-introduction (§6.5, §6.6)
  {
    id: 'w-a1-plan-and-introduction',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Plan the report and write the introduction',
    minutes: 7,
    sourceSections: ['6.5', '6.6'],
    needs: ['w-a1-decode-and-main-features'],
    blocks: [
      {
        type: 'lead',
        summary: 'A standard four-part blueprint organizes Academic Task 1 into a clear, logical report. The introduction states what the visual presents by paraphrasing the prompt without distorting factual parameters.',
        whyItMatters: 'Copying the prompt word for word results in examiners discounting those words from your word count. Omitting crucial parameters like units or dates makes your introduction incomplete.',
        whatYouWillDo: 'Study the 4-part report blueprint SVG diagram, identify five essential introduction components, evaluate reporting verbs, and write accurate opening sentences.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-4part-blueprint',
        title: 'Academic Task 1 Four-Part Blueprint',
        caption: 'Standard structural organization: 1 Introduction (Paraphrase prompt) → 2 Overview (2–3 main features) → 3 Detail Group 1 → 4 Detail Group 2.',
        alt: 'Structural diagram illustrating the four parts of an Academic Task 1 report with word count distributions.',
      },
      {
        type: 'steps',
        title: 'Five Essential Introduction Components',
        items: [
          { action: 'Identify the visual graphic type (e.g. line graph, bar chart, table).', condition: 'Component 1', why: 'Establishes the exact media format being analyzed.' },
          { action: 'Select a natural reporting verb (e.g. compares, illustrates, shows).', condition: 'Component 2', why: 'Specifies the informational purpose of the visual presentation.' },
          { action: 'Define the measured subject and metric (e.g. proportion of households).', condition: 'Component 3', why: 'Ensures the reader understands what data values represent.' },
          { action: 'Name the geographic location or surveyed groups.', condition: 'Component 4', why: 'Anchors the data to its specific institutional or national boundary.' },
          { action: 'State the precise temporal timeframe (e.g. between 2010 and 2020).', condition: 'Component 5', why: 'Establishes the chronological window and governs report tenses.' },
        ],
      },
      {
        type: 'contrastPair',
        title: 'Prompt Paraphrasing: Exact Endpoints versus Loose Phrasing',
        weak: {
          text: 'The chart gives information about cars during the last decade in four areas.',
          whyItFails: '"During the last decade" is unanchored and vague. "Gives information about cars" fails to specify whether production, sales, or emissions were measured.',
        },
        controlled: {
          text: 'The bar chart compares the number of electric cars manufactured in four European countries from 2012 to 2022.',
          whyItWorks: 'Accurately paraphrases the prompt while preserving precise metrics, countries, and historical calendar endpoints.',
        },
      },
      {
        type: 'section',
        id: 'reporting-verbs-selection',
        title: 'Calibrated Reporting Verbs',
        bridge: 'Select reporting verbs that match the analytical function of the visual presentation.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Choose your introductory reporting verb according to the visual job. Use "compares" when the visual contrasts multiple categories, countries, or demographics. Use "illustrates" or "shows" for general trends or multi-stage processes.',
          'Use "breaks down" when analyzing proportional distributions or expenditure categories. Avoid informal verbs such as "gives a picture of" or "talks about". Precision in your opening sentence establishes an academic tone immediately.',
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'No Opinion Conclusion Needed',
        body: 'A separate opinion-style conclusion is unnecessary in Task 1. The overview already summarizes the main features of the visual. Once you have reported and grouped your details, conclude your response.',
      },
      {
        type: 'selfCheck',
        title: 'Introduction Construction Checklist',
        items: [
          'I state the visual format, reporting verb, subject, location, and dates.',
          'I paraphrase the prompt rather than copying strings of original words.',
          'I preserve exact calendar endpoints ("between 2010 and 2020").',
          'I recognize that an overview replaces the need for an essay conclusion.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-intro-draft',
        label: 'Write an introduction for a Task 1 prompt using all five essential components.',
      },
    ],
  },

  // 8. w-a1-accurate-overview (§6.7)
  {
    id: 'w-a1-accurate-overview',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Write an accurate overview',
    minutes: 7,
    sourceSections: ['6.7'],
    needs: ['w-a1-plan-and-introduction'],
    blocks: [
      {
        type: 'lead',
        summary: 'The overview is the single most vital paragraph in Academic Task 1. It synthesizes the visual broad headline message without becoming bogged down in individual numerical values.',
        whyItMatters: 'Under official band descriptors, omitting an overview caps Task Achievement at Band 5. This restriction applies regardless of how well remaining paragraphs are written.',
        whatYouWillDo: 'Apply the headline selection question, compare overview strategies across four visual types, avoid raw number dumps, and evaluate a worked overview contrast pair.',
      },
      {
        type: 'callout',
        variant: 'requirement',
        title: 'Mandatory Requirement for Band 6 and Above',
        body: 'The IELTS Task Achievement descriptor states that to achieve Band 6 or higher, the candidate must "present an overview with information appropriately selected". Omission of an overview caps your Task Achievement at Band 5.',
      },
      {
        type: 'comparisonTable',
        caption: 'What an Overview Selects Across Four Visual Formats',
        headers: ['Visual Format', 'Primary Headline Features to Extract', 'Example Overview Sentence Framing'],
        rows: [
          ['Time-series chart', 'Overall growth or decline, contrasting outliers, and ranking changes.', '"Overall, while wind and solar generation expanded, coal consumption declined."'],
          ['Static chart', 'Dominant categories, significant contrasts, and smallest shares.', '"Overall, manufacturing accounted for the largest share of GDP across all four regions."'],
          ['Map or layout', 'Major expansions, new facilities, and primary unchanged areas.', '"Overall, the western sector underwent extensive commercial redevelopment, while the park remained intact."'],
          ['Process diagram', 'Total transformation, number of stages, and linear vs cyclical shape.', '"Overall, the process comprises eight distinct stages, forming a closed recycling loop."'],
        ],
      },
      {
        type: 'contrastPair',
        title: 'True Overview Synthesis versus Raw Number Listing',
        weak: {
          text: 'Overall, car sales were 12,000 in 2010, then rose to 15,000 in 2015, while bus sales were 8,000 in 2010 and fell to 5,000.',
          whyItFails: 'Merely writing "Overall," before a list of individual data points does not make an overview. It lacks broad conceptual synthesis.',
        },
        controlled: {
          text: 'Overall, private vehicle sales grew steadily over the decade, whereas public bus registrations experienced a moderate decline.',
          whyItWorks: 'Synthesizes broad macro-movements without cluttering the summary with individual figures.',
        },
      },
      {
        type: 'callout',
        variant: 'option',
        title: 'Omitting Numbers from the Overview',
        body: 'Omitting numerical figures from the overview is a helpful pedagogical technique that prevents you from writing a premature detail list. However, including an occasional prominent benchmark figure is permitted if it supports broad synthesis.',
      },
      {
        type: 'selfCheck',
        title: 'Overview Mastery Checklist',
        items: [
          'I place my overview either immediately after the introduction or at the end.',
          'I identify two or three broad macro-features that summarize the entire visual.',
          'I avoid turning my overview into a dense list of individual statistics.',
          'I verify that the overarching trends stated in my overview are factually correct.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-overview-draft',
        label: 'Write an overview for a multi-line graph without writing a single numerical digit.',
      },
    ],
  },

  // 9. w-a1-grouping-and-chunking (§6.8, §6.9)
  {
    id: 'w-a1-grouping-and-chunking',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Group details for the reader and chunk phases',
    minutes: 7,
    sourceSections: ['6.8', '6.9'],
    needs: ['w-a1-accurate-overview'],
    blocks: [
      {
        type: 'lead',
        summary: 'Reporting data in two structured detail paragraphs requires choosing a logical grouping principle. Dynamic time-series graphs are chunked into chronological phases at real turning points.',
        whyItMatters: 'Listing data mechanically year by year or following legend order creates disjointed text. Chunking by real turning points allows clear comparisons across categories.',
        whatYouWillDo: 'Study the line phases SVG diagram, master seven grouping logics, apply the 5-step chunking routine, and eliminate the misuse of "fluctuated".',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-line-phases',
        title: 'Chunking Time-Series Data at Real Turning Points',
        caption: 'Line graph partitioned into distinct phases: Phase 1 (2010–2014 initial expansion), Phase 2 (2014–2018 plateau and peak), and Phase 3 (2018–2022 sharp contraction).',
        alt: 'Line graph divided into three distinct chronological phases showing rise, plateau, and decline with marked turning points.',
      },
      {
        type: 'comparisonTable',
        caption: 'Seven Logical Detail Grouping Strategies',
        headers: ['Grouping Principle', 'Best Suited Visuals', 'How Details Are Divided'],
        rows: [
          ['Similar vs opposing trends', 'Multi-line graphs with divergent lines.', 'Body 1: Increasing categories. Body 2: Decreasing or stable categories.'],
          ['High vs low magnitudes', 'Bar charts or tables with wide ranges.', 'Body 1: Dominant market leaders. Body 2: Minor niche contributors.'],
          ['Earlier vs later phases', 'Time-series graphs spanning decades.', 'Body 1: Initial growth era. Body 2: Post-peak contraction era.'],
          ['Visual 1 vs Visual 2', 'Two combined charts (e.g. bar + table).', 'Body 1: Full report on Visual 1. Body 2: Related metrics from Visual 2.'],
          ['Input vs output stages', 'Multi-stage manufacturing flow charts.', 'Body 1: Raw material preparation. Body 2: Fabrication and packaging.'],
          ['Geographic / spatial sectors', 'Redevelopment maps and site layouts.', 'Body 1: Northern commercial zone. Body 2: Southern recreational facilities.'],
          ['Core vs exception category', 'Datasets where one group behaves unusually.', 'Body 1: Standard parallel groups. Body 2: The single divergent outlier.'],
        ],
      },
      {
        type: 'steps',
        title: '5-Step Time-Series Chunking Protocol',
        items: [
          { action: 'Inspect the line graph to identify where rates of change shift materially.', condition: 'Step 1 of 5', why: 'Locates authentic inflection points rather than arbitrary calendar midpoints.' },
          { action: 'Partition the overall timeline into two or three distinct phases.', condition: 'Step 2 of 5', why: 'Creates manageable narrative chapters for your body paragraphs.' },
          { action: 'State the broad direction and character of movement for each phase.', condition: 'Step 3 of 5', why: 'Provides interpretive context before reporting specific values.' },
          { action: 'Anchor the movement with selected start, peak, and endpoint figures.', condition: 'Step 4 of 5', why: 'Validates the descriptive narrative with precise quantitative evidence.' },
          { action: 'Compare the secondary series against the primary series in each phase.', condition: 'Step 5 of 5', why: 'Satisfies the instruction requirement to "make comparisons where relevant".' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Misusing the Word "Fluctuated"',
        body: 'Do not describe a line as "fluctuating" if it rises once and falls once without repeated oscillation. Fluctuation means repeated movements up and down across an average level. A single rise and fall represents a peak, not a fluctuation.',
      },
      {
        type: 'selfCheck',
        title: 'Grouping and Chunking Checklist',
        items: [
          'I select an explicit grouping logic before drafting body paragraphs.',
          'I divide time-series lines at genuine turning points rather than arbitrary dates.',
          'I report start, peak, trough, and endpoint values rather than every point.',
          'I reserve the word "fluctuated" for repeated, erratic ups and downs.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-chunking-practice',
        label: 'Partition a 20-year line graph into distinct phases and note the exact turning point years.',
      },
    ],
  },

  // 10. w-a1-numbers-and-percentages (§6.10, §6.11)
  {
    id: 'w-a1-numbers-and-percentages',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Values, approximations, and percentage points',
    minutes: 7,
    sourceSections: ['6.10', '6.11'],
    needs: ['w-a1-grouping-and-chunking'],
    blocks: [
      {
        type: 'lead',
        summary: 'Reporting quantitative data accurately requires distinguishing percentages from percentage points and using calibrated approximation qualifiers. Decimal precision must reflect the resolution of the supplied graphic.',
        whyItMatters: 'Confusing a 10 percentage point increase with a 10 percent increase is a mathematical error that undermines Task Achievement. Inventing fake decimals damages data credibility.',
        whatYouWillDo: 'Study the percentages vs percentage points SVG diagram, master approximation qualifiers, complete a diagnostic check, and use "respectively" correctly.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-pct-vs-points',
        title: 'Percentages versus Percentage Points',
        caption: 'Mathematical breakdown contrasting absolute percentage point differences from relative percentage change: 60% to 40% represents a 20 percentage point fall (33.3% relative decline).',
        alt: 'Diagram illustrating the mathematical difference between percentage point differences and relative percentage changes.',
      },
      {
        type: 'comparisonTable',
        caption: 'Percentages, Percentage Points, and Relative Change',
        headers: ['Initial Value', 'Final Value', 'Percentage Point Difference', 'Relative Percentage Change'],
        rows: [
          ['60%', '40%', 'Fell by 20 percentage points (60 - 40).', 'Relative fall of 33.3% (20 ÷ 60 × 100).'],
          ['20%', '30%', 'Rose by 10 percentage points (30 - 20).', 'Relative rise of 50.0% (10 ÷ 20 × 100).'],
          ['10%', '15%', 'Rose by 5 percentage points (15 - 10).', 'Relative rise of 50.0% (5 ÷ 10 × 100).'],
          ['50%', '25%', 'Fell by 25 percentage points (50 - 25).', 'Relative fall of 50.0% (25 ÷ 50 × 100).'],
        ],
      },
      {
        type: 'diagnosticCheck',
        title: 'Diagnostic Check: Percentage Point Precision',
        prompt: 'In 2010, 20% of households owned solar panels. By 2020, this share reached 30%. How should this change be reported?',
        options: [
          { text: 'Solar panel ownership increased by 10%.', correct: false, rationale: 'Incorrect: A change from 20% to 30% is a 50% relative increase, not a 10% increase.' },
          { text: 'Solar panel ownership rose by 10 percentage points.', correct: true, rationale: 'Correct: The difference between 30% and 20% is exactly 10 percentage points.' },
          { text: 'Solar panel ownership grew by 30 percent.', correct: false, rationale: 'Incorrect: 30% is the final level, not the amount of change.' },
        ],
      },
      {
        type: 'section',
        id: 'approximation-qualifiers',
        title: 'Calibrated Approximation Qualifiers',
        bridge: 'When a chart grid does not provide exact digits, use these precise qualifiers.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Use "just under", "nearly", or "almost" when the plotted data point sits slightly below a gridline (for instance, 48% can be described as "just under half").',
          'Use "just over" or "slightly above" when the point exceeds a gridline (for example, 52% is "just over half"). Use "approximately", "around", or "roughly" for values near an intermediate level. Avoid inventing fake decimals like "48.36%" when the y-axis only shows increments of ten.',
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'Using "Respectively" Without Confusion',
        body: 'Use "respectively" only when pairing two lists in identical order. For example, write: "France and Germany recorded 12% and 18%, respectively." This pairs France with 12% and Germany with 18%. Avoid pairing more than three items at once.',
      },
      {
        type: 'selfCheck',
        title: 'Quantitative Reporting Checklist',
        items: [
          'I distinguish percentage point differences from relative percentage changes.',
          'I avoid inventing decimal precision not supported by the chart grid.',
          'I use "just under" for values below benchmarks and "just over" for values above.',
          'I verify that pairs connected by "respectively" match order precisely.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-math-precision',
        label: 'Calculate the percentage point change and relative percentage change for two data points from a practice chart.',
      },
    ],
  },

  // 11. w-a1-trend-and-comparison-grammar (§6.12, §6.13)
  {
    id: 'w-a1-trend-and-comparison-grammar',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Trend grammar, prepositions, and comparisons',
    minutes: 7,
    sourceSections: ['6.12', '6.13'],
    needs: ['w-a1-numbers-and-percentages'],
    blocks: [
      {
        type: 'lead',
        summary: 'Reporting movements and comparisons requires controlling two grammatical systems: verb-adverb versus adjective-noun trend patterns, and exact spatial prepositions. Precise comparisons compare like with like.',
        whyItMatters: 'Confusing "rose by" with "rose to" inverts numbers and changes meaning completely. Using ungrammatical comparison forms like "twice higher" degrades Grammatical Range and Accuracy.',
        whatYouWillDo: 'Master verb and noun trend patterns, control four key trend prepositions, execute like-with-like comparisons, and verify the grammatical conditions for "overtook".',
      },
      {
        type: 'comparisonTable',
        caption: 'Verb-Adverb versus Adjective-Noun Trend Patterns',
        headers: ['Trend Movement', 'Verb + Adverb Construction', 'Adjective + Noun Construction'],
        rows: [
          ['Sharp increase', 'Sales rose sharply over the period.', 'There was a sharp rise in sales over the period.'],
          ['Gradual decrease', 'Consumption declined steadily after 2015.', 'Consumption experienced a steady decline after 2015.'],
          ['Stability', 'Output remained stable throughout the decade.', 'Output showed little change throughout the decade.'],
          ['Peak', 'Production peaked at 80,000 tonnes in 2018.', 'Production reached a peak of 80,000 tonnes in 2018.'],
          ['Erratic movement', 'Revenues fluctuated widely between quarters.', 'Revenues exhibited wide fluctuations between quarters.'],
        ],
      },
      {
        type: 'section',
        id: 'preposition-precision',
        title: 'Preposition Precision: To, By, At, and From',
        bridge: 'Master the distinct mathematical functions of these four essential prepositions.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Use "to" to mark the final level reached. For example, "sales rose to 30 million" indicates that 30 million was the endpoint. Use "by" to show the margin of difference. For instance, "sales rose by 10 million" means the net change was 10 million.',
          'Use "at" to mark a level, plateau, or peak. For example, unemployment remained stable at 5%. Use "from and to" to state starting and ending figures across a period. For instance, revenue grew from 10 million to 30 million.',
        ],
      },
      {
        type: 'contrastPair',
        title: 'Comparative Precision: Like with Like',
        weak: {
          text: 'The car production in Japan was twice higher than Germany.',
          whyItFails: 'Uses awkward phrasing ("twice higher") and compares an activity ("car production") directly to a country ("Germany").',
        },
        controlled: {
          text: 'Car production in Japan was twice as high as that of Germany.',
          whyItWorks: 'Uses the standard comparative formula ("twice as high as") and uses pronoun reference ("that of") to compare production with production.',
        },
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'The "Overtook" Requirement',
        body: 'A category can "overtake" another category only if its relative ranking changes during the timeframe. Do not use "overtook" to describe a category that was already larger throughout the entire period.',
      },
      {
        type: 'selfCheck',
        title: 'Trend and Comparison Grammar Checklist',
        items: [
          'I use adjectives with nouns and adverbs with verbs in trend sentences.',
          'I distinguish "rose to" (final level) from "rose by" (margin of difference).',
          'I compare like with like using pronouns like "that of" or "those of".',
          'I verify that "overtook" is used only when an actual change in rank occurred.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-trend-grammar',
        label: 'Write two sentences describing the same trend, one using a verb pattern and one using a noun pattern.',
      },
    ],
  },

  // 12. w-a1-line-bar-table (§6.14, §6.15)
  {
    id: 'w-a1-line-bar-table',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Line graphs, bar charts, and tables',
    minutes: 8,
    sourceSections: ['6.14', '6.15'],
    needs: ['w-a1-trend-and-comparison-grammar'],
    blocks: [
      {
        type: 'lead',
        summary: 'Line graphs, bar charts, and multi-column tables represent the most frequent visual formats in IELTS Academic Writing. Succeeding with these formats requires anchor value selection and synthesizing tabular totals.',
        whyItMatters: 'Translating every single number into a sentence creates exhausting, unreadable reports. Failing to notice truncated bar chart axes or misinterpreting table total rows leads to distorted reporting.',
        whatYouWillDo: 'Study the truncated bar and table SVG diagram, select anchor values for line graphs, navigate tabular total rows, and evaluate an annotated report specimen.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-bar-static-dynamic',
        title: 'Bar Chart and Multi-Column Table Architecture',
        caption: 'Visual anatomy illustrating a truncated-axis bar chart comparing static categories alongside a multi-column table featuring subgroup rows and an integrated total row.',
        alt: 'Technical diagram showing a bar chart with truncated baseline and a complex table with highlighted total row.',
      },
      {
        type: 'steps',
        title: 'Anchor-Value Selection on Multi-Line Graphs',
        items: [
          { action: 'Record the starting value for each line in the initial year.', condition: 'Anchor 1: Start', why: 'Establishes baseline rankings and initial numerical separation.' },
          { action: 'Identify major turning points, peaks, troughs, or crossing intersections.', condition: 'Anchor 2: Turning points', why: 'Captures the critical structural dynamics that define the graph.' },
          { action: 'Record the final value for each line in the concluding year.', condition: 'Anchor 3: End', why: 'Demonstrates the overall cumulative outcome across the period.' },
          { action: 'Omit intermediate points that merely continue an established trajectory.', condition: 'Filtering rule', why: 'Prevents data clutter and keeps the word count tightly controlled.' },
        ],
      },
      {
        type: 'annotatedSpecimen',
        kind: 'report',
        title: 'Annotated Table Synthesis Excerpt',
        segments: [
          { text: 'Across all four educational sectors, funding expanded substantially over the five-year period.', note: 'Synthesizes the overall direction before detailing individual rows.' },
          { text: 'Secondary education received the largest allocation, rising from £45 million to £62 million.', note: 'Selects the dominant row and supports it with start and end figures.' },
          { text: 'In contrast, vocational training recorded the lowest investment throughout, remaining under £15 million annually.', note: 'Contrasts the dominant category with the lowest outlier without reporting every single cell.' },
        ],
      },
      {
        type: 'section',
        id: 'crossing-points-and-rankings',
        title: 'Reporting Crossing Points and Category Rankings',
        bridge: 'Capture pivotal moments where trajectories intersect or category ranks shift.',
      },
      {
        type: 'prose',
        paragraphs: [
          'On multi-line graphs, note the exact calendar year where two lines intersect. An intersection indicates that one category overtook another in market share or volume. Identifying crossing points demonstrates analytical synthesis.',
          'For static bar charts and tables without a timeline, organize your reporting by descending magnitude. Begin with the leading category, describe intermediate contributors, and conclude with the smallest contributor. This logical order guides the reader clearly.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Never Treat a "Total" Row as an Independent Category',
        body: 'When a table includes an overall "Total" row or column, do not report it as if it were another independent category alongside subgroups. Total figures represent the mathematical sum of the rows above.',
      },
      {
        type: 'selfCheck',
        title: 'Line, Bar, and Table Reporting Checklist',
        items: [
          'I select three or four anchor values per line rather than reporting every year.',
          'I check whether bar chart axes start at zero or use truncated scales.',
          'I group table figures into logical patterns rather than reporting cell by cell.',
          'I distinguish total summary rows from individual component subgroups.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-line-bar-table',
        label: 'Select five anchor figures from a complex table that adequately summarize its core patterns.',
      },
    ],
  },

  // 13. w-a1-pie-and-multiple-visuals (§6.16, §6.17)
  {
    id: 'w-a1-pie-and-multiple-visuals',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Pie charts and multiple visuals',
    minutes: 8,
    sourceSections: ['6.16', '6.17'],
    needs: ['w-a1-line-bar-table'],
    blocks: [
      {
        type: 'lead',
        summary: 'Pie charts represent proportional compositions of a whole, while dual-visual tasks combine two different graphics. Succeeding with multiple visuals requires balanced coverage and avoiding false causal links.',
        whyItMatters: 'Candidates frequently describe the first chart in exhaustive detail and rush the second chart in two sentences. Inventing causal connections between separate graphics damages Task Achievement.',
        whatYouWillDo: 'Examine pie chart pair and dual-visual SVG diagrams, group proportional slices, balance attention across two graphics, and eliminate invented causality.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-pie-pair',
        title: 'Comparative Pie Chart Pair (2015 vs 2025)',
        caption: 'Two pie charts showing shifts in energy generation market share: Renewable share expands from 22% to 41%, while Coal contracts from 48% to 26%.',
        alt: 'Pair of pie charts comparing energy source market shares in 2015 and 2025 with highlighted shifts.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-dual-visual',
        title: 'Dual-Visual Task: Visitor Numbers Bar Chart and Spending Table',
        caption: 'Integrated dual visual: Top bar chart presents annual visitor counts across three national parks; bottom table displays average tourist expenditure per category.',
        alt: 'Dual visual layout showing an annual visitor bar chart above an expenditure categories data table.',
      },
      {
        type: 'steps',
        title: 'Dual-Visual Balanced Execution Routine',
        items: [
          { action: 'Read and decode each visual independently before looking for links.', condition: 'Step 1 of 5', why: 'Ensures accurate comprehension of different units, metrics, and subjects.' },
          { action: 'Identify common parameters that link the two graphics (dates, places).', condition: 'Step 2 of 5', why: 'Establishes how the two informational sources relate contextually.' },
          { action: 'Draft an integrated overview that captures the main feature of BOTH visuals.', condition: 'Step 3 of 5', why: 'Omitting one visual from your overview lowers your Task Achievement band.' },
          { action: 'Dedicate Body Paragraph 1 to the first graphic with key data.', condition: 'Step 4 of 5', why: 'Provides thorough, structured coverage of the primary visual.' },
          { action: 'Dedicate Body Paragraph 2 to the second graphic, noting cross-relationships.', condition: 'Step 5 of 5', why: 'Maintains balanced reporting across both informational sources.' },
        ],
      },
      {
        type: 'section',
        id: 'pie-chart-slice-grouping',
        title: 'Grouping Proportional Slices and Managing Small Categories',
        bridge: 'Group minor slices together to maintain clear narrative focus and avoid clutter.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Pie charts depict proportions that sum to 100 percent. When a pie chart displays six or more slices, avoid listing every small segment in isolation. Instead, identify the two dominant sectors, then cluster minor contributors into a combined summary statement.',
          'For example, state that four minor categories together constituted less than 15 percent of total spending. When comparing two pie charts separated by a decade, highlight major expansions, major contractions, and any sector whose share remained unchanged.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Never Invent Causality Between Dual Visuals',
        body: 'If Chart 1 shows visitor numbers rising and Table 2 shows hotel spending increasing, report both facts accurately. Do not assert that visitor growth caused hotel revenue to rise unless the prompt explicitly confirms that relationship.',
      },
      {
        type: 'selfCheck',
        title: 'Pie and Dual Visual Checklist',
        items: [
          'I verify what each pie chart represents (for instance, total energy generation).',
          'I ensure my overview synthesizes main features from BOTH supplied graphics.',
          'I allocate balanced paragraph space to both visuals in the body.',
          'I refrain from claiming that a trend in Visual 1 caused a trend in Visual 2.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-dual-visuals',
        label: 'Write an integrated overview sentence covering both a bar chart and a table from a practice task.',
      },
    ],
  },

  // 14. w-a1-maps-and-plans (§6.18)
  {
    id: 'w-a1-maps-and-plans',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Maps and site plans',
    minutes: 7,
    sourceSections: ['6.18'],
    needs: ['w-a1-pie-and-multiple-visuals'],
    blocks: [
      {
        type: 'lead',
        summary: 'Map and plan tasks illustrate spatial transformations across historical periods or proposed future developments. Success requires matching verb tenses to time status and deploying rich spatial vocabulary.',
        whyItMatters: 'Describing a proposed future redevelopment in the past tense, or failing to report major unchanged zones, creates significant confusion and lowers Task Achievement.',
        whatYouWillDo: 'Study the before-and-after map SVG diagram, master six types of spatial development, align verb tenses to layout status, and apply compass orientation rules.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-map-before-after',
        title: 'Bellford Park: 2005 Layout versus Proposed Redevelopment',
        caption: 'Comparative site map with compass rose: 2005 pastoral layout (woodland, lake, gravel path) contrasted with proposed redevelopment (sports complex, car park, paved road).',
        alt: 'Before and after site redevelopment map showing historical 2005 park layout alongside future modernization plan.',
      },
      {
        type: 'comparisonTable',
        caption: 'Six Types of Spatial Transformation and Precision Phrasing',
        headers: ['Type of Change', 'Passive Verb Constructions', 'Example Academic Application'],
        rows: [
          ['Construction / Addition', 'was built, was erected, was constructed', '"A modern sports complex was built on the eastern grassland."'],
          ['Demolition / Removal', 'was demolished, was knocked down, was removed', '"The old administration cabins were demolished."'],
          ['Replacement', 'was replaced by, was superseded by', '"The gravel footpath was replaced by a paved two-lane access road."'],
          ['Expansion / Extension', 'was expanded, was enlarged, was extended', '"The southern car park was extended to accommodate 200 vehicles."'],
          ['Conversion / Repurposing', 'was converted into, was transformed into', '"The disused warehouse was converted into a community art gallery."'],
          ['Relocation', 'was relocated to, was moved to', '"The children play area was relocated to the northern park boundary."'],
        ],
      },
      {
        type: 'section',
        id: 'tense-and-status-alignment',
        title: 'Aligning Verb Tenses to Time Status',
        bridge: 'Grammatical tense must strictly match the temporal status of each map layout.',
      },
      {
        type: 'prose',
        paragraphs: [
          'When comparing two past layouts, use the past simple passive. For example, write that woodland was cleared and a hotel was constructed.',
          'When comparing a past or present layout with a proposed plan, use future passive structures. For example, state that a new car park is proposed for the western boundary. Alternatively, state that tennis courts are scheduled to be replaced. Never describe a planned proposal as a completed action.',
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Never Invent Compass Directions',
        body: 'Only use cardinal directions (north, south, east, west) if the map explicitly includes a compass rose. If no compass indicator appears, use relative spatial descriptions: "in the top left corner", "along the southern boundary", or "adjacent to the entrance".',
      },
      {
        type: 'selfCheck',
        title: 'Map and Plan Checklist',
        items: [
          'I check whether the map compares two past years or a current layout with a proposal.',
          'I use future or speculative passives when describing proposed redevelopments.',
          'I report both major newly developed areas and important unchanged zones.',
          'I verify compass bearings against the supplied north arrow before writing.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-map-tenses',
        label: 'Write two sentences describing a map transformation, one in past passive and one in future passive.',
      },
    ],
  },

  // 15. w-a1-process-diagrams (§6.19)
  {
    id: 'w-a1-process-diagrams',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Linear and cyclical process diagrams',
    minutes: 8,
    sourceSections: ['6.19'],
    needs: ['w-a1-maps-and-plans'],
    blocks: [
      {
        type: 'lead',
        summary: 'Process diagrams depict ordered industrial operations, manufacturing sequences, or biological life cycles. Success requires identifying whether the process is linear or cyclical, and using passive voice to describe mechanical actions.',
        whyItMatters: 'Describing a cyclical process as if it ends permanently at the final step is a fundamental structural error. Inventing unseen human workers distracts from objective operational reporting.',
        whatYouWillDo: 'Study the container recycling cycle SVG diagram, contrast linear and cyclical overviews, master sequence markers, and avoid speculative technical inventions.',
      },
      {
        type: 'svgDiagram',
        diagramId: 'diag-task1-process-cycle',
        title: 'Industrial Container Recycling Cycle',
        caption: 'Eight-stage closed manufacturing loop: Collection → Sorting → Crushing → Melting → Pelletizing → Moulding → Distribution → Consumer return.',
        alt: 'Cyclical process diagram illustrating the eight sequential stages of container recycling with return arrow.',
      },
      {
        type: 'comparisonTable',
        caption: 'Linear Processes versus Cyclical Processes',
        headers: ['Process Architecture', 'Structural Character', 'Overview Formulation Strategy'],
        rows: [
          ['Linear process', 'Clear starting raw material and a distinct, final finished product.', 'State total stage count, the initial raw ingredient, and the final finished item.'],
          ['Cyclical process', 'Returns continuously to an earlier stage with no permanent endpoint.', 'State that the process forms a continuous closed cycle returning to collection.'],
        ],
      },
      {
        type: 'steps',
        title: 'Organizing and Drafting a Process Report',
        items: [
          { action: 'Trace arrows from beginning to end to verify all branches.', condition: 'Step 1 of 5', why: 'Ensures no stage, byproduct, or secondary feedback loop is omitted.' },
          { action: 'Formulate an overview stating broad transformation and process shape.', condition: 'Step 2 of 5', why: 'Fulfills Task Achievement by summarizing the overarching manufacturing operation.' },
          { action: 'Divide the stages logically between two body paragraphs.', condition: 'Step 3 of 5', why: 'E.g. Body 1: collection, sorting, and cleaning; Body 2: processing and distribution.' },
          { action: 'Deploy present simple passive voice for mechanical actions.', condition: 'Step 4 of 5', why: 'Focuses objective attention on the materials ("bottles are washed, crushed, and melted").' },
          { action: 'Connect sequential stages with varied chronological discourse markers.', condition: 'Step 5 of 5', why: 'Uses "initially", "following this", "subsequently", and "after being heated".' },
        ],
      },
      {
        type: 'callout',
        variant: 'trap',
        title: 'Do Not Guess Technical Equipment or Add Environmental Essays',
        body: 'Do not speculate about unlabelled machinery or guess chemical names. If a vat contains liquid, describe it as liquid rather than water. Never add an argumentative conclusion discussing the environmental benefits of recycling.',
      },
      {
        type: 'selfCheck',
        title: 'Process Diagram Checklist',
        items: [
          'I identify whether the process is linear (finished good) or cyclical (closed loop).',
          'I use present simple passive verbs when describing industrial operations.',
          'I divide stages into two balanced paragraphs at a natural operational milestone.',
          'I refrain from inventing unshown human agents or technical machinery names.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-process-steps',
        label: 'Write an overview sentence and the first two body stages for a recycling or manufacturing diagram.',
      },
    ],
  },

  // 16. w-a1-review-and-subskills (§6.20, §6.21)
  {
    id: 'w-a1-review-and-subskills',
    area: 'writing',
    track: 'academic',
    partId: 'w-part-4-2',
    partTitle: 'Part 4.2 · Academic Task 1: Reporting Visuals',
    title: 'Review a Task 1 report and practise subskills',
    minutes: 7,
    sourceSections: ['6.20', '6.21'],
    needs: ['w-a1-process-diagrams'],
    blocks: [
      {
        type: 'lead',
        summary: 'Refining Task 1 performance requires a structured content and language review protocol before submission. Practicing isolated subskills accelerates mastery more effectively than repeatedly writing full reports under pressure.',
        whyItMatters: 'Submitting a report without verifying numbers against the original visual leads to careless data errors. Developing specific subskills like overview drafting builds automatic exam routines.',
        whatYouWillDo: 'Execute a 13-point Task 1 review protocol, learn the "circle every number" verification method, and practice eight targeted subskill exercises.',
      },
      {
        type: 'section',
        id: 'review-protocol',
        title: 'The 13-Point Task 1 Review Protocol',
        bridge: 'Audit your draft systematically across these seven content checks and six language checks.',
      },
      {
        type: 'prose',
        paragraphs: [
          'Content checks audit four areas. Does the introduction identify the correct visual type, subject, and measures? Does the overview state accurate main features without raw data clutter? Do the body details directly support the overview while covering all supplied graphics?',
          'Confirm that key comparisons are included between categories. Ensure all figures, dates, units, and category labels are correct. Verify that every stated claim is supported by the graphic.',
          'Language checks address grammatical accuracy and minimum length. Are verb tenses consistent across the report? Are comparative sentences and prepositions accurate? Does the finished draft reach the 150-word minimum?',
        ],
      },
      {
        type: 'callout',
        variant: 'method',
        title: 'The "Circle Every Number" Verification Drill',
        body: 'During practice review, circle every number in your written report with your pencil. Then find and verify that exact number on the supplied visual. This tactile check catches transposed digits, wrong units, and misread axes instantly.',
      },
      {
        type: 'comparisonTable',
        caption: 'Eight Targeted Subskill Drills for Task 1 Improvement',
        headers: ['Subskill Drill', 'Focused Training Activity', 'Core Skill Developed'],
        rows: [
          ['Identify visual job', 'Examine a graphic for 30 seconds; state if it is dynamic, static, sequential, or spatial.', 'Rapid cognitive orientation.'],
          ['Introduction sprint', 'Write a complete 1-sentence introduction from a prompt in under 2 minutes.', 'Prompt paraphrasing fluency.'],
          ['Overview isolation', 'Draft an overview without looking at any model answers or writing body details.', 'Macro-feature synthesis.'],
          ['Grouping comparison', 'Write down two competing ways to divide a chart details into two paragraphs.', 'Logical coherence planning.'],
          ['Conversion precision', 'Convert two raw data points into an accurate comparative sentence.', 'Mathematical grammar control.'],
          ['Percentage correction', 'Fix deliberate percentage vs percentage point errors in flawed sample sentences.', 'Quantitative accuracy.'],
          ['Phase chunking', 'Partition a complex multi-line graph into three chronological movement phases.', 'Trend chunking mastery.'],
          ['Inference scrubbing', 'Review a sample report and delete all unproven causal speculations.', 'Objective reporting discipline.'],
        ],
      },
      {
        type: 'selfCheck',
        title: 'Task 1 Review and Subskills Checklist',
        items: [
          'I verify every written number against the original visual graphic.',
          'I check that my report meets or exceeds the 150-word requirement.',
          'I practice standalone overview and introduction sprints between full test runs.',
          'I confirm that all prepositions (to, by, at, from) match mathematical facts.',
        ],
      },
      {
        type: 'workbookPrompt',
        noteId: 'study-w-subskill-drills',
        label: 'Select two of the eight subskill drills above and complete a 5-minute timed sprint.',
      },
    ],
  },
]
