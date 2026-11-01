// Original Artico teaching content informed by the research synthesis in docs/presentations-research-synthesis.md.

// Synthetic numerical examples are explicitly labelled. External course transcripts and worksheets are linked, not reproduced.

export const presentationLessons = [
  {
    "id": "01",
    "part": "FRAME",
    "title": "What makes a talk effective?",
    "goal": "Define success by what the audience needs from the occasion.",
    "rule": "A good talk is not a performance of confidence; it is a useful exchange with an audience.",
    "teach": "A presentation is a planned act of communication. It may inform, teach, persuade, coordinate, demonstrate, celebrate or invite discussion. Success depends on the task: a research seminar must let people judge a contribution; a class must help learners understand and use an idea; a briefing must support a decision; a toast must honour a person. Slides, humour and charisma are tools, not the goal. First name the audience outcome.",
    "before": "I want to give an impressive presentation about my research.",
    "after": "I want the lab to understand why the result changes our next experiment, and what remains uncertain.",
    "note": "The same subject can require different talks. A 5-minute lab update is not a shortened thesis defence; it has a different job.",
    "contrast": "A lecture is judged by what learners can explain afterwards. A proposal is judged by whether its reasoning supports a decision.",
    "question": "What is the strongest definition of a successful presentation?",
    "options": [
      "The speaker appears confident and uses polished slides",
      "The audience can do what the occasion requires: understand, judge, decide, learn or recognise",
      "The talk includes every fact the speaker knows"
    ],
    "answer": 1,
    "reason": "The communication outcome determines what belongs in the talk. Polish matters only when it helps that outcome.",
    "practice": "Choose one real or imagined occasion. Write one sentence describing what listeners should understand, decide, do or feel by the end.",
    "field": "purpose",
    "criteria": [
      "Name the occasion",
      "State an observable audience outcome",
      "Do not confuse polish with success"
    ],
    "say": "By the end, I want you to be able to…",
    "sourceBasis": "iBiology's definition of an effective research talk; general public-speaking curricula on speech purpose and audience."
  },
  {
    "id": "02",
    "part": "FRAME",
    "title": "Read the room",
    "goal": "Research the audience and the conditions before choosing content.",
    "rule": "Do not prepare for an average audience. Prepare for the people who will actually be there.",
    "teach": "Audience analysis is practical research, not guessing from age or job title. Find out what listeners already know, what they need, why they are present, what decision or question matters to them, and what they may challenge. Ask the organiser; inspect the event programme; consider disciplines represented, language, venue, time, remote access and accessibility. Avoid demographic stereotypes. Write down what is known, what is assumed, and how to check each assumption.",
    "before": "My audience is scientists, so I can use technical language.",
    "after": "Most listeners know cell biology but not molecular simulation. I will define the ensemble idea, then use the technical vocabulary needed to assess the result.",
    "note": "More information alone does not guarantee agreement or action. The National Academies cautions against treating every audience as an uninformed group that only needs facts translated.",
    "contrast": "A domain expert may need controls and sampling diagnostics. A funder may need the research gap, potential value and risks. A student may need a concrete mental model.",
    "question": "Which is the best first audience question?",
    "options": [
      "What font do the attendees prefer?",
      "What do these listeners already know, and what must they do with this information?",
      "How can I make every person agree with me?"
    ],
    "answer": 1,
    "reason": "Prior knowledge and the audience's task determine the explanation, evidence and vocabulary.",
    "practice": "Describe your audience in three columns: known facts, assumptions, and questions you need to ask the organiser or a representative listener.",
    "field": "audience",
    "criteria": [
      "Separate evidence from assumptions",
      "Identify prior knowledge and motivation",
      "Name one way to verify your assumptions"
    ],
    "say": "You may already know… The part I want to examine today is…",
    "sourceBasis": "iBiology audience framework; Stanford and general public-speaking audience-analysis guidance. National Academies (2017) on goals, trust, values, context and the limits of the deficit model."
  },
  {
    "id": "03",
    "part": "FRAME",
    "title": "Goal, message and the so what",
    "goal": "Separate the desired outcome from the claim and its relevance.",
    "rule": "A topic names the subject. A goal names the change. A message names the takeaway.",
    "teach": "These three are related but not interchangeable. Topic: protein conformational dynamics. Goal: help a mixed-discipline group assess whether one simulation supports a claim about sampled states. Message: this trajectory samples several conformational clusters, but convergence is not established. The so what explains why that message matters to this audience: it changes what analysis or experiment should come next. Limit yourself to one primary goal and one central message; supporting points can be many.",
    "before": "My topic is artificial intelligence in biology. I want to cover everything.",
    "after": "Goal: help the lab decide whether this model is useful for prioritising experiments. Message: it narrows candidates, but does not establish function. So what: we should validate the top predictions before investing in a larger screen.",
    "note": "A strong message is not necessarily a bold claim. It may be a precise statement of what remains unknown.",
    "contrast": "In a wedding toast, the goal is to honour the couple; the message might be that their generosity makes others feel included. There is no scientific result to prove.",
    "question": "Which statement is a core message rather than a topic?",
    "options": [
      "Protein dynamics",
      "A static structure misses alternative conformations sampled under these conditions",
      "A 20-minute seminar"
    ],
    "answer": 1,
    "reason": "It expresses a complete, potentially testable takeaway rather than a subject or logistical detail.",
    "practice": "Write four separate lines: topic, audience, primary goal, core message. Add one sentence explaining why this audience should care.",
    "field": "message",
    "criteria": [
      "One primary goal",
      "One defensible central message",
      "Audience-specific relevance"
    ],
    "say": "The point I want you to leave with is…",
    "sourceBasis": "iBiology's audience + goal + message framework; OpenStax purpose and topic distinctions."
  },
  {
    "id": "04",
    "part": "FRAME",
    "title": "Discover the message; find your voice",
    "goal": "Distil the idea without turning nuance into a slogan.",
    "rule": "Compression should reveal what matters, not erase what makes the claim true.",
    "teach": "The Half-Life Your Message exercise asks you to speak about the same idea for 60, 30, 15 and 8 seconds, with short transitions between attempts. It is a discovery exercise: it can expose the real centre of the idea or show that you began in the wrong place. Afterwards, ask whether the short version is accurate for this audience and goal, what qualification must be restored, and which supporting ideas remain necessary. Then explore a speaking style that feels natural to you. Clear and reserved can be as effective as animated and humorous.",
    "before": "Our new method proves that the protein has three functional states.",
    "after": "In this trajectory, we observed three structural clusters. Their functional roles and sampling convergence remain to be tested.",
    "note": "Aurbach et al. describe Half-Life as message discovery, not sound-bite production. The 8-second version is not automatically the final scientific claim.",
    "contrast": "An executive may need a short decision statement. A specialist may need a longer version that names assumptions and uncertainty.",
    "question": "What should you do if the 8-second version becomes misleading?",
    "options": [
      "Keep it because shorter is always better",
      "Speak faster to fit more detail",
      "Restore the qualification or choose a longer accurate version"
    ],
    "answer": 2,
    "reason": "The exercise helps discover priorities; it does not authorise distortion.",
    "practice": "Speak the same idea in 60, 30, 15 and 8 seconds. Record each version. Then write what was lost, what stayed, and what must be restored.",
    "field": "message",
    "criteria": [
      "Keep the same central idea across versions",
      "Preserve important qualifications",
      "Choose a speaking style that feels sustainable"
    ],
    "say": "The short version is… The important qualification is…",
    "sourceBasis": "Aurbach et al. (2018), an experience-based teaching tool; iBiology message-distillation and speaking-style lessons."
  },
  {
    "id": "05",
    "part": "ARCHITECT",
    "title": "A talk is not a paper",
    "goal": "Select what listeners need without hiding relevant evidence.",
    "rule": "A paper is built for inspection over time. A talk is built for understanding in real time.",
    "teach": "A paper can include exhaustive methods, supplementary figures and details that readers revisit. A live talk cannot. Select the information needed to understand the central claim and evaluate its strength. This does not mean hiding inconvenient controls, negative findings or limitations. Summarise methods at the level the audience needs; direct interested listeners to the paper or backup material for detail. Reorder content when it improves understanding. The aim is disciplined selection, not selective reporting.",
    "before": "I will present the paper section by section and include every figure.",
    "after": "I will show the question, the method detail needed to judge it, the two results that support the message, the limitation, and the next experiment.",
    "note": "Cutting detail is not permission to conceal evidence that could change the conclusion.",
    "contrast": "A manuscript preserves a reproducible record. A five-minute talk should make the central reasoning visible and point to the full record.",
    "question": "Which item should not be omitted merely to keep the talk short?",
    "options": [
      "A control that could change how the main result is interpreted",
      "A secondary detail unrelated to the claim",
      "A decorative image that adds no information"
    ],
    "answer": 0,
    "reason": "Essential controls and limitations are part of honest interpretation, not optional decoration.",
    "practice": "Take one paper or project. Mark each section as essential for understanding, needed to judge validity, useful backup, or omit. Explain each decision.",
    "field": "evidence",
    "criteria": [
      "Select for the audience's task",
      "Retain validity-critical evidence",
      "Separate main talk from backup detail"
    ],
    "say": "I will focus on the evidence needed to judge this claim.",
    "sourceBasis": "iBiology lesson 'Talks Are Not Papers'; Stanford spoken-versus-written guidance; ethics of evidence."
  },
  {
    "id": "06",
    "part": "ARCHITECT",
    "title": "Build the reasoning path",
    "goal": "Choose a logical structure that matches the communication task.",
    "rule": "Structure is the order in which the audience needs to understand things.",
    "teach": "An outline is a thinking tool, not a fixed template. Try question → investigation → answer; problem → evidence → recommendation; comparison → criteria → decision; demonstration → observation → explanation; or concept → example → practice. For research, a narrative can follow the question and how evidence changed the interpretation. Build the body first if that reveals what background the introduction needs. Check every transition: why does this part come next?",
    "before": "Introduction, three unrelated findings, and a conclusion.",
    "after": "Question → why current models are insufficient → sampling method → evidence for multiple clusters → limits of sampling → next test.",
    "note": "A story arc is a useful model for causal progression. It is not a demand for a dramatic climax or a happy ending.",
    "contrast": "A product demonstration needs a user journey. A journal club needs a critical argument about evidence. A toast needs a human memory, not a methods section.",
    "question": "Which outline best fits a briefing that must recommend a supplier?",
    "options": [
      "A chronology of how the team discovered each supplier",
      "Criteria → comparison → trade-offs → recommendation",
      "A personal story followed by unrelated product facts"
    ],
    "answer": 1,
    "reason": "The structure follows the decision the audience must make.",
    "practice": "Draft a 5–7 line outline. For every line, write why the audience needs it and how it advances the central message.",
    "field": "structure",
    "criteria": [
      "Use one coherent organising logic",
      "Make each transition necessary",
      "Allow the order to change during revision"
    ],
    "say": "To answer that question, we need to look at…",
    "sourceBasis": "iBiology outline/story lessons; OpenStax organisation and outlining; Duarte's audience-journey approach as a practitioner framework."
  },
  {
    "id": "07",
    "part": "ARCHITECT",
    "title": "Make the body carry the claim",
    "goal": "Connect each result to its method, evidence and interpretation.",
    "rule": "A result is not self-explanatory. Show what was done, what appeared, and what can be inferred.",
    "teach": "For each important result, use a compact reasoning unit: question or claim; why this method addresses it; what the visual actually shows; what the result supports; what it does not support; and what follows. Separate observation from interpretation. In a scientific talk, include the controls and sampling information needed to judge the result. In a business briefing, show baseline, denominator and alternative explanations. Do not show a chart without telling listeners what comparison matters.",
    "before": "Here is the PCA. You can see that the protein is active.",
    "after": "Each point is one sampled frame; colour denotes a cluster. The trajectory visits three regions of this projection. This supports structural heterogeneity in the sampled trajectory, not a claim that each region is a distinct functional state.",
    "note": "A visual pattern is an observation. Its mechanism or meaning is an interpretation that needs additional evidence.",
    "contrast": "A business chart may show higher sales after a campaign. It does not by itself show the campaign caused the increase.",
    "question": "A result shows a difference between two groups. What should you explain next?",
    "options": [
      "Only that the p-value is below 0.05",
      "The comparison, uncertainty, study design and what causal conclusion is justified",
      "That the difference proves the preferred explanation"
    ],
    "answer": 1,
    "reason": "The audience needs to evaluate the inference, not merely hear a statistical label.",
    "practice": "Choose two findings. For each, write: question, method rationale, observed result, interpretation, limitation and next step.",
    "field": "evidence",
    "criteria": [
      "Separate observation from interpretation",
      "Include validity-critical controls",
      "State what the evidence cannot establish"
    ],
    "say": "What we observed was… This supports… It does not yet show…",
    "sourceBasis": "iBiology body-of-talk workflow; Alley assertion-evidence; ASA statistical integrity guidance."
  },
  {
    "id": "08",
    "part": "ARCHITECT",
    "title": "Open with relevance",
    "goal": "Help listeners understand why the question matters and what they need to follow.",
    "rule": "A strong opening creates orientation before it creates excitement.",
    "teach": "An opening can begin with a question, a concrete situation, a surprising but verified fact, a short story, or a direct statement. A hook is optional. It must lead into the actual question rather than distract from it. State why the subject matters to this audience, then provide only the background needed to understand the body. The best introduction may become clearer after you have chosen the results and argument. Do not use a dramatic statistic if you cannot verify its source or explain its relevance.",
    "before": "Today I will talk about my research. First, here is a long history of the field.",
    "after": "A single protein structure is useful, but it cannot show how often other conformations appear. Today I will explain how we sample those alternatives and what the current data can support.",
    "note": "The opening is not a contest to surprise people. A direct question can be stronger than a theatrical hook.",
    "contrast": "A proposal can open with the unmet need. A toast can open with a truthful memory. A technical update may simply state the decision required.",
    "question": "Which opening is most trustworthy?",
    "options": [
      "A dramatic statistic with no source because it grabs attention",
      "A question or fact that is accurate, relevant and leads to the talk's real purpose",
      "A joke unrelated to the audience's reason for attending"
    ],
    "answer": 1,
    "reason": "Attention is useful only when it is connected to the message and the occasion.",
    "practice": "Write two possible openings: one direct and one using a hook. For each, explain how it leads to your core message.",
    "field": "opening",
    "criteria": [
      "Establish relevance",
      "Ask or state the real question",
      "Include only necessary background"
    ],
    "say": "The question we need to answer is…",
    "sourceBasis": "iBiology introduction, hook and 'so what' lessons; Stanford content guidance."
  },
  {
    "id": "09",
    "part": "ARCHITECT",
    "title": "Close and title the talk",
    "goal": "Make the takeaway and next step unmistakable.",
    "rule": "The ending should resolve the audience's question, not introduce a new one.",
    "teach": "A useful conclusion restates the core message, summarises the findings that support it, and names implications or next steps when appropriate. It can leave an open scientific question open. A title should help the right audience understand why the talk is relevant; accuracy comes before cleverness. Short titles are often easier to scan, but there is no universal word-count law. A call to action belongs when the occasion genuinely asks for one.",
    "before": "That's all. Any questions? The title was 'Amazing new discoveries'.",
    "after": "We sampled three structural clusters, but convergence remains unresolved. The next step is independent trajectories and a comparison with experimental data. This is what the present evidence supports.",
    "note": "iBiology cites the peak–end experiment by Kahneman et al., which studied painful cold-water experiences—not presentation memory. Treat it as an analogy, not direct proof of a talk-ending effect.",
    "contrast": "A project update ends with owner, decision and date. A research talk may end with the result and an unresolved question. A toast ends with recognition or a wish.",
    "question": "Which conclusion is appropriate when evidence is incomplete?",
    "options": [
      "Claim the proposed mechanism is proven to sound decisive",
      "Restate what the data support, name the limitation and identify the next test",
      "Introduce a new result that was not discussed"
    ],
    "answer": 1,
    "reason": "A strong ending can be decisive about uncertainty. It does not need a false resolution.",
    "practice": "Draft a 3-sentence conclusion: core message, supporting findings, implication or next question. Write two accurate titles.",
    "field": "ending",
    "criteria": [
      "Return to the core message",
      "Summarise the evidence honestly",
      "Give a relevant implication or next step"
    ],
    "say": "The central finding is… The next question is…",
    "sourceBasis": "iBiology ending/title lessons; Kahneman peak–end study used with an explicit transfer caveat."
  },
  {
    "id": "10",
    "part": "RENDER",
    "title": "Slides that make a point",
    "goal": "Use visual material to support reasoning rather than compete with speech.",
    "rule": "A slide should make one useful part of the argument easier to see.",
    "teach": "A strong technical-slide default is assertion–evidence: write the takeaway as a sentence, then show the graph, image, diagram or comparison that supports it. Avoid a vague heading plus a dense bullet list when a labelled visual would be clearer. This is not a ban on words: definitions, equations, quotations, tables and accessible notes can be appropriate. Keep labels close to the relevant visual, use consistent hierarchy, and remove decoration that competes with the point. Some talks need no slides.",
    "before": "RESULTS. Five bullets, a screenshot of a paper figure, a decorative stock photo and a paragraph of explanation.",
    "after": "Title: 'The sampled trajectory visits three structural regions'. One clearly labelled projection, the sampling unit, the colour key and a brief caveat.",
    "note": "Garner and Alley tested a combined slide-design package with 110 engineering students. It supports the approach in that context; it does not prove one slide template is right for every talk.",
    "contrast": "A scientific talk may need a detailed plot. A wedding toast may need no slide. A product demo should show the real product, not a slogan-filled deck.",
    "question": "What is the strongest improvement to a technical slide?",
    "options": [
      "Add more decorative elements",
      "Use a sentence that states the point and a visual that lets the audience inspect the evidence",
      "Remove every word, including axes and labels"
    ],
    "answer": 1,
    "reason": "A visual is only useful when the audience can interpret it and connect it to the claim.",
    "practice": "Redesign one dense slide. Give it a message title, one primary visual, necessary labels and a small note about uncertainty or source.",
    "field": "visuals",
    "criteria": [
      "Make the slide's job clear",
      "Keep labels and evidence readable",
      "Remove only nonessential material"
    ],
    "say": "The title states the point. Look at the comparison here…",
    "sourceBasis": "Garner & Alley 2013; Mayer 2017 and 2025 meta-analysis; Garr Reynolds as practitioner design guidance."
  },
  {
    "id": "11",
    "part": "RENDER",
    "title": "Data people can inspect",
    "goal": "Explain quantitative evidence without misleading the audience.",
    "rule": "A clean chart is not enough. The audience must be able to judge what it measures.",
    "teach": "Name the axes, units, sample, denominator, time window and comparison. Explain what error bars represent; do not assume the audience knows. Distinguish percentage points from percent change. Report effect size and uncertainty when relevant. A p-value is not the probability that a hypothesis is true, and statistical significance is not effect size or importance. Avoid truncated or inconsistent scales that exaggerate differences. State whether the data are observed, simulated or illustrative.",
    "before": "The p-value is 0.03, so the treatment definitely works.",
    "after": "The estimated difference is 8 percentage points in this sample. The confidence interval is wide, and the study was not designed to establish long-term effects.",
    "note": "Training examples must label synthetic data. Do not let a made-up chart look like a real published result.",
    "contrast": "A protein trajectory's cluster frequency is a sampling summary, not automatically an equilibrium population. A business conversion rate needs its denominator and period.",
    "question": "A rate rises from 40% to 50%. What is the absolute change?",
    "options": [
      "10 percentage points",
      "10 percent",
      "50 percentage points"
    ],
    "answer": 0,
    "reason": "50% − 40% = 10 percentage points. Relative to 40%, the increase is 25%.",
    "practice": "Choose a figure. Write a spoken explanation in four parts: orientation, visible pattern, interpretation, uncertainty. Check all units and denominators.",
    "field": "visuals",
    "criteria": [
      "Identify sample and units",
      "Describe before interpreting",
      "Represent uncertainty and scale honestly"
    ],
    "say": "The horizontal axis shows… The vertical axis measures… The comparison is…",
    "sourceBasis": "ASA 2016 p-value statement; W3C accessibility; scientific data-communication practice."
  },
  {
    "id": "12",
    "part": "RENDER",
    "title": "Words that travel",
    "goal": "Make spoken explanations precise and understandable in real time.",
    "rule": "Use the simplest words that preserve the exact meaning.",
    "teach": "A listener cannot pause your sentence to look up an acronym. Define essential terms at the moment they become necessary. Use a concrete example before an abstract explanation when that helps. An analogy is a bridge, not proof; explain where it stops working. Keep spoken sentences short enough to follow, signpost transitions, and repeat a key term when it helps listeners track the argument. Avoid removing necessary technical language from an expert talk.",
    "before": "The ensemble exhibits conformational heterogeneity due to metastable basins in a multidimensional free-energy landscape.",
    "after": "The protein samples more than one shape. Some shapes appear more often than others under these conditions. The simulation suggests several structural groups, but we have not shown that each group has a distinct function.",
    "note": "Plain language is not vague language. Keep the scientific term when it is the most precise term, and define it.",
    "contrast": "For a specialist, define the exact statistical model. For a public audience, explain what the model helps us predict and what it cannot predict.",
    "question": "What should you do with an essential technical term?",
    "options": [
      "Avoid it even if it is the precise term",
      "Use it without explanation because the audience should know",
      "Introduce it, define it briefly, then use it consistently"
    ],
    "answer": 2,
    "reason": "The goal is access to precise meaning, not the removal of expertise.",
    "practice": "Choose three terms from your field. Write an expert definition, a plain-language explanation and an analogy with its limit.",
    "field": "language",
    "criteria": [
      "Define essential jargon",
      "Use examples without distorting meaning",
      "Make transitions audible"
    ],
    "say": "In this talk, when I say… I mean…",
    "sourceBasis": "iBiology connection/jargon lessons; Stanford spoken communication guidance; AGU Watch Your Words toolkit."
  },
  {
    "id": "13",
    "part": "RENDER",
    "title": "Story, attention and ethical persuasion",
    "goal": "Use narrative to create relevance while keeping evidence and audience agency intact.",
    "rule": "A story can help people care. Evidence must still show what is true.",
    "teach": "Narrative can organise information around a question, a change in understanding or a human consequence. A short vignette may make a research process tangible. A persuasive talk can use contrast between the current state and a possible alternative, but it must treat objections fairly and make its sources visible. In science communication, do not assume that a listener who disagrees simply lacks information: values, trust, lived experience and the decision context can shape how evidence is received. Meta-analyses find modest narrative effects on beliefs, attitudes and intentions; comparisons of statistical and narrative evidence suggest that their influence depends on the outcome. Do not invent suspense, overstate impact or hide counterevidence.",
    "before": "I will tell a dramatic story and use it to prove that our intervention works.",
    "after": "I will use one real user example to explain the problem, then show the study data and limitations needed to judge whether the intervention helps.",
    "note": "The National Academies rejects a simple one-way deficit model of science communication. More facts are not always enough; listen for the audience's actual concern and distinguish evidence questions from value or policy disagreements.",
    "contrast": "A research seminar uses a narrative to explain the investigation. A proposal uses a fair argument to support a decision. A toast uses a truthful memory to honour someone.",
    "question": "Which combination is most responsible in a persuasive presentation?",
    "options": [
      "A compelling anecdote treated as proof",
      "A verified story or example, representative evidence, fair treatment of objections and a clear request",
      "Only emotional language, because facts reduce engagement"
    ],
    "answer": 1,
    "reason": "Narrative and evidence do different jobs. Ethical persuasion respects the audience's ability to judge.",
    "practice": "Write one true vignette and one evidence-based claim. Explain what the vignette illustrates and what the evidence must establish.",
    "field": "story",
    "criteria": [
      "Use only truthful examples",
      "Separate illustration from evidence",
      "Represent counterarguments fairly"
    ],
    "say": "Here is one example of the problem. The broader evidence shows…",
    "sourceBasis": "Braddock & Dillard 2016; Zebregs et al. 2015; OpenStax ethics; Duarte as a practitioner framework. National Academies (2017) on bidirectional science communication and audience context."
  },
  {
    "id": "14",
    "part": "DELIVER & LEARN",
    "title": "Speak so people can follow",
    "goal": "Make the spoken experience clear while keeping a sustainable personal style.",
    "rule": "Presence is not a personality type. It is the listener's ability to follow you.",
    "teach": "Speak to the room rather than to the screen. Check that people can hear you. Use pauses around a new idea or important visual. Word-rate is not the same as idea-pace: a sentence can be spoken quickly but still be hard to process. Vary emphasis to show relationships. Use gestures if they help; avoid rigid rules about eye contact, movement or smiling. Cultural context, disability, neurodivergence and individual style all matter.",
    "before": "I must move around, make eye contact with everyone and speak loudly to look confident.",
    "after": "I will speak clearly, pause before the main comparison, face the audience when possible, and use the delivery style that lets me explain the idea accurately.",
    "note": "There is no single body-language recipe for effective speaking. Adapt to the room and to what is comfortable and accessible.",
    "contrast": "In a large room, use a microphone and allow time for slide reading. Online, verbalise visual references and check that remote listeners can follow.",
    "question": "What is the most useful delivery target?",
    "options": [
      "Copy the gestures of a famous speaker",
      "Make the message easy to hear and follow, using a style that suits the speaker and setting",
      "Speak as quickly as possible to fit more information"
    ],
    "answer": 1,
    "reason": "Delivery techniques are means of supporting comprehension, not a performance costume.",
    "practice": "Record a 60-second explanation. Listen for audibility, idea-pace, pauses, filler words and whether your main point is clear. Choose one change.",
    "field": "delivery",
    "criteria": [
      "Audible and followable speech",
      "Meaningful pauses and signposts",
      "Authentic, context-appropriate delivery"
    ],
    "say": "Let me pause here. This is the important comparison…",
    "sourceBasis": "Stanford delivery guidance; iBiology speaking style; general communication teaching."
  },
  {
    "id": "15",
    "part": "DELIVER & LEARN",
    "title": "Rehearse and use feedback",
    "goal": "Improve the talk through targeted practice and useful external feedback.",
    "rule": "Practice is most useful when each run tests something specific.",
    "teach": "Start by rehearsing the argument without slides. Then rehearse with the actual visuals and time limit. Record one section if useful. Ask a listener to identify the main message, where they became confused, and which evidence they found hard to interpret. Give the reviewer a small rubric rather than asking whether the talk was 'good'. Seek feedback from someone who resembles the intended audience and, when needed, a subject expert. Revise and test again.",
    "before": "I will read my script several times and ask if people liked it.",
    "after": "I will run a timed version, ask a labmate to explain my main claim, ask a non-specialist where they got lost, revise the figure explanation, and repeat the section.",
    "note": "Studies show that structured feedback can help, but not every feedback tool or vague comment improves performance. Specificity and context matter.",
    "contrast": "A scientific talk may need both subject-expert and non-specialist feedback. A product demo needs a user to attempt the actual task.",
    "question": "Which feedback is most actionable?",
    "options": [
      "Be more confident",
      "The audience did not know what the y-axis measured before the comparison",
      "Great job"
    ],
    "answer": 1,
    "reason": "It identifies a concrete comprehension problem that can be fixed and retested.",
    "practice": "Plan two rehearsal runs. For each, specify the target, observer, timing and one question you will ask for feedback.",
    "field": "feedback",
    "criteria": [
      "Rehearse under realistic conditions",
      "Ask observable feedback questions",
      "Revise and retest"
    ],
    "say": "What did you think the main point was? Where did you lose the thread?",
    "sourceBasis": "Heiman et al. 2012; Kim et al. 2005; feedback RCT 2014; Ochoa & Dominguez 2020."
  },
  {
    "id": "16",
    "part": "DELIVER & LEARN",
    "title": "Nerves, stagecraft and contingencies",
    "goal": "Prepare for the conditions of delivery and recover when something goes wrong.",
    "rule": "Preparation is not the promise that nothing will go wrong; it is knowing what to do next.",
    "teach": "Some speakers feel anxious; others do not. Anxiety varies and can be reduced by different approaches, including gradual exposure and cognitive strategies. This course can suggest low-stakes practice, realistic rehearsal, and preparation of the opening and transitions; it is not treatment. Check room, screen, microphone, remote setup, time limit and accessibility needs. Bring a PDF backup. Decide what you will cut if time is shortened and how to continue if a visual or live demo fails.",
    "before": "If the projector fails, my presentation is over.",
    "after": "I will test the setup, keep a PDF backup, prepare a spoken explanation of the key figure, and know which details to omit if time is cut.",
    "note": "For severe or life-limiting anxiety, a presentation course is not a substitute for appropriate professional support.",
    "contrast": "For a remote talk, test screen sharing and captions. For a live demo, prepare a clearly labelled fallback that does not pretend a failed action succeeded.",
    "question": "Your 15-minute slot becomes six minutes. What should you do?",
    "options": [
      "Speak 2.5 times faster",
      "Keep the core message and essential evidence; cut secondary detail",
      "Skip all limitations so the talk sounds stronger"
    ],
    "answer": 1,
    "reason": "Good compression protects the message and honesty rather than increasing speed or hiding risk.",
    "practice": "Make a stage checklist and a six-minute version of your talk. Identify one technical failure and one recovery plan.",
    "field": "contingency",
    "criteria": [
      "Check room and technology",
      "Prepare a realistic time-cut version",
      "Choose a recovery plan"
    ],
    "say": "We have less time, so I will focus on the finding and what it means.",
    "sourceBasis": "McWilliam et al. 2025 PSA intervention review; Stanford speech-anxiety guidance; iBiology stage preparation."
  },
  {
    "id": "17",
    "part": "DELIVER & LEARN",
    "title": "Q&A as dialogue",
    "goal": "Answer questions directly, accurately and without bluffing.",
    "rule": "A good answer helps the questioner understand what is known and what remains open.",
    "teach": "Listen to the full question. Identify whether it asks for clarification, evidence, method, implication, an alternative explanation or something you did not measure. If it is unclear, ask for clarification. Answer the direct question first, then explain the evidence. Distinguish your result from your interpretation. If you do not know, say so and identify what would be needed to find out. A challenge is not automatically an attack.",
    "before": "Yes, our model definitely generalises to every condition.",
    "after": "We tested two conditions, so I cannot claim generalisation beyond them. The next test would compare independent conditions and measure the relevant outcome.",
    "note": "Do not promise future work you cannot commit to. A clear boundary is better than a confident invention.",
    "contrast": "In a business briefing, clarify the assumption behind an objection. In a research seminar, distinguish an unmeasured outcome from a negative result.",
    "question": "Someone asks about an outcome you did not measure. What is the best response?",
    "options": [
      "It probably improved too",
      "We did not measure that outcome, so I cannot infer it from these data",
      "Change the subject"
    ],
    "answer": 1,
    "reason": "An honest limit preserves trust and shows what the evidence can actually support.",
    "practice": "Prepare answers to three questions: one about methods, one challenging an assumption, and one outside your evidence. Practise clarifying before answering.",
    "field": "questions",
    "criteria": [
      "Listen and clarify",
      "Answer from evidence",
      "State unknowns honestly"
    ],
    "say": "We did not measure that directly. What our data support is…",
    "sourceBasis": "iBiology Q&A lesson; Stanford Q&A and oral communication guidance."
  },
  {
    "id": "18",
    "part": "DELIVER & LEARN",
    "title": "Build, present and revise",
    "goal": "Complete a talk that fits a real audience and purpose.",
    "rule": "A finished presentation is a tested explanation, not a full slide deck.",
    "teach": "Choose one context from the case library or use your own. Complete the presentation plan, build a short version, and rehearse it aloud. Use the rubric to collect feedback. Revise at least one substantive feature: the claim, structure, explanation, evidence or visual. Then present again. You may submit an outline instead of a recording; Artico does not automatically judge voice, charisma or scientific validity.",
    "before": "I made the slides and memorised them, so the presentation is finished.",
    "after": "My listener misunderstood the comparison. I clarified the axes, changed the title to state the finding and tested the explanation again.",
    "note": "A presentation is ready when it serves its actual audience and purpose—not when every slide is decorated.",
    "contrast": "A scientific capstone is judged by defensible reasoning. A toast by sincerity and fit. The rubric changes with the occasion.",
    "question": "What is the strongest evidence that your presentation improved?",
    "options": [
      "It has more slides and animations",
      "A listener can now state the main point and evaluate the evidence after a specific revision",
      "The speaker memorised every sentence"
    ],
    "answer": 1,
    "reason": "Improvement should be visible in the audience's experience and in the quality of the reasoning.",
    "practice": "Deliver a 3–5 minute version. Ask one target listener to state the takeaway and one confusing moment. Revise, then deliver it again.",
    "field": "revision",
    "criteria": [
      "Fit the occasion and audience",
      "Support the core message honestly",
      "Use feedback to make a meaningful revision"
    ],
    "say": "The key message is… The evidence supports… The limitation is… The next step is…",
    "sourceBasis": "iBiology's cumulative My Talk Plan; structured feedback research; Artico's integrated framework."
  }
]

export const presentationCases = [
  {
    "id": "science",
    "type": "Scientific conference talk",
    "title": "What does one protein structure leave out?",
    "audience": "Interdisciplinary life scientists",
    "purpose": "Explain why conformational ensembles matter and let listeners judge an exploratory result",
    "message": "A single structure cannot describe all conformations sampled by a protein under specified conditions.",
    "logic": [
      "Open with the limits of one structural snapshot",
      "Define conformations and ensembles",
      "Show a clearly labelled synthetic sampling example",
      "Interpret only what the sampled trajectory supports",
      "State sampling and functional limitations",
      "Give the next validation step"
    ],
    "opening": "A protein structure is a snapshot. What changes when we ask how many other shapes the molecule samples?",
    "evidence": "SYNTHETIC TEACHING DATA ONLY: 100 sampled frames are grouped into three structural clusters. Counts describe this example trajectory, not experimentally established populations.",
    "visual": "A three-bar chart labelled cluster A, B and C; axis says 'share of 100 sampled frames'. Add a visible note that these are synthetic training data and not equilibrium probabilities.",
    "limits": "One trajectory may undersample rare states. Cluster identity does not establish function. Independent runs and experimental comparison are needed.",
    "ending": "One structure is useful for a structural description; an ensemble asks which alternatives appear under the sampled conditions. Their biological roles remain a separate question.",
    "question": "'How do you know these populations are converged?' → 'We do not from one trajectory. We need independent runs and sampling diagnostics before treating them as stable estimates.'",
    "revise": "Weak: 'We proved three functional states.' Improved: 'This synthetic trajectory example contains three structural clusters; their functional roles are not established.'",
    "style": "QUESTION → EXPLANATION → EVIDENCE → LIMITATION → NEXT TEST"
  },
  {
    "id": "lab",
    "type": "Lab meeting / project update",
    "title": "What should the lab test next?",
    "audience": "Collaborators who know the project",
    "purpose": "Decide whether to repeat, extend or redirect an experiment",
    "message": "The current result narrows the next experiment, but one unresolved control still affects interpretation.",
    "logic": [
      "State the decision needed today",
      "Show the most relevant result",
      "Explain the control and unresolved issue",
      "Offer two next-step options",
      "Recommend one action and owner"
    ],
    "opening": "I need a decision about the next experiment. The result narrows the options, but one control is still missing.",
    "evidence": "Use the actual project result and include the control status. Do not invent sample sizes or effect estimates for this example.",
    "visual": "One result figure, a small status table for completed/missing controls, and the proposed next-step decision.",
    "limits": "A project update should not present an unfinished analysis as a confirmed finding. Mark preliminary data explicitly.",
    "ending": "I recommend repeating the measurement with the missing control before scaling up. The decision today is whether to allocate the next two weeks to that test.",
    "question": "'Why not proceed directly to the larger experiment?' → 'Because the unresolved control could change the interpretation; the smaller test reduces that uncertainty first.'",
    "revise": "Weak: 'The experiment worked.' Improved: 'The signal is present, but we have not yet ruled out the control explanation.'",
    "style": "DECISION → RESULT → UNCERTAINTY → NEXT ACTION"
  },
  {
    "id": "defense",
    "type": "Thesis defence / research job talk",
    "title": "Show how you think as a researcher",
    "audience": "A mixed committee of specialists and adjacent experts",
    "purpose": "Demonstrate the significance, independence and limits of the research contribution",
    "message": "The work answers one defined question and creates a defensible basis for the next research question.",
    "logic": [
      "Frame the scientific problem and gap",
      "State the question and why it matters",
      "Explain the design choices",
      "Show the decisive evidence and alternatives",
      "Defend the interpretation and limitations",
      "Explain independent next steps"
    ],
    "opening": "The field can describe the structure, but we still need to understand how the system moves between states. That is the question this work addresses.",
    "evidence": "Use actual thesis evidence, methods, controls and uncertainty. Keep additional analyses ready as backup material.",
    "visual": "A clear research question, a logic diagram, decisive figures and one final contribution/limitations slide.",
    "limits": "Do not claim independence or generality beyond what the work demonstrates. Distinguish completed work from future plans.",
    "ending": "The thesis establishes these findings, leaves these questions open, and suggests this next test. Thank you; I welcome questions about the reasoning and evidence.",
    "question": "'Why did you choose this method rather than the alternative?' → 'The choice follows from the question and the measurement it permits. The trade-off is…'",
    "revise": "Weak: 'This project solved the problem.' Improved: 'This project resolves one part of the problem and establishes a method to investigate the next part.'",
    "style": "QUESTION → DESIGN → EVIDENCE → CONTRIBUTION → OPEN QUESTIONS"
  },
  {
    "id": "business",
    "type": "Business decision briefing",
    "title": "Should the team run a two-week staffing trial?",
    "audience": "Operations managers",
    "purpose": "Approve or reject a reversible trial using explicit criteria",
    "message": "A limited trial is more defensible than a permanent schedule change based on one short observation.",
    "logic": [
      "State the decision required",
      "Show baseline and period",
      "Compare alternatives against criteria",
      "Name costs and risks",
      "Recommend a reversible trial",
      "Set a review date and success measure"
    ],
    "opening": "We need to decide whether afternoon coverage deserves a two-week trial, not whether to make a permanent staffing change today.",
    "evidence": "ILLUSTRATIVE CASE ONLY: the figures used in a training slide must be labelled synthetic. A real briefing needs actual ticket counts, time windows, denominators and staffing costs.",
    "visual": "Hourly arrival chart with labelled days and total tickets; separate response-time comparison; a small table of trial cost and success criteria.",
    "limits": "One day cannot establish a recurring pattern. Workload, case complexity and staffing levels may explain the observed difference.",
    "ending": "Approve a two-week trial with a predefined response-time target and review the results before any permanent change.",
    "question": "'Why not hire now?' → 'We have not established a stable pattern. A reversible trial tests the assumption before committing to recurring cost.'",
    "revise": "Weak: 'Afternoons are always overloaded.' Improved: 'This sample shows an afternoon peak; we need comparable days to establish whether it is typical.'",
    "style": "DECISION → BASELINE → OPTIONS → RISKS → TEST"
  },
  {
    "id": "product",
    "type": "Product demonstration",
    "title": "Show the real booking workflow",
    "audience": "Clinic administrators evaluating a prototype",
    "purpose": "Let users judge whether a workflow reduces repeated work",
    "message": "The prototype removes one repeated entry step, but usability and reliability still need testing.",
    "logic": [
      "Name the user's task",
      "Show the starting state",
      "Complete the real workflow",
      "Show the result",
      "State what is and is not implemented",
      "Ask users to test the next task"
    ],
    "opening": "A receptionist currently enters the same patient detail twice. Let's see whether this prototype removes that step.",
    "evidence": "Demonstrate a real working prototype using sample records. Time the task only if a baseline has actually been measured.",
    "visual": "Actual interface with clear cursor focus, task labels and a visible prototype disclaimer.",
    "limits": "A successful demo does not prove reliability, usability or clinical compliance. State failure modes and what is not built.",
    "ending": "The prototype looks promising for this task. The next step is usability testing with reception staff and a reliability review.",
    "question": "'What if the server fails?' → 'Offline booking is not implemented. We need to define and test a safe fallback before deployment.'",
    "revise": "Weak: 'This is effortless and revolutionary.' Improved: 'This prototype removes one repeated entry step; user testing will tell us whether it improves the task.'",
    "style": "USER NEED → LIVE TASK → RESULT → LIMIT → USER TEST"
  },
  {
    "id": "teaching",
    "type": "Classroom explanation",
    "title": "Explain diffusion without losing the science",
    "audience": "Secondary-school learners",
    "purpose": "Build a usable mental model of random motion and net spread",
    "message": "Random particle motion can produce a net spread from a region of higher concentration to lower concentration.",
    "logic": [
      "Show a simple phenomenon",
      "Ask what learners observe",
      "Explain random motion and concentration",
      "Use a labelled diagram",
      "Check a new prediction",
      "Clarify where the analogy stops"
    ],
    "opening": "Imagine dropping one small amount of food colouring into still water. What happens before anyone stirs it?",
    "evidence": "Use a classroom demonstration or a clearly labelled simulation. Do not claim a result was measured if it is only a drawing.",
    "visual": "Three sequential diagrams of particles spreading; label high and low concentration and show that individual movement is random.",
    "limits": "The analogy does not explain every transport process. Active transport and membrane-specific processes need separate explanations.",
    "ending": "The particles do not know where to go. Their motion is random, but the overall distribution changes because of the concentration difference. What if both sides started equally concentrated?",
    "question": "'Do particles know which way to move?' → 'No. Each moves randomly; the net pattern comes from the distribution of many particles.'",
    "revise": "Weak: 'Diffusion is when particles want to spread out.' Improved: 'Particles move randomly; a concentration difference creates net movement across the population.'",
    "style": "OBSERVE → EXPLAIN → MODEL → CHECK"
  },
  {
    "id": "proposal",
    "type": "Community proposal",
    "title": "Test later library hours before making them permanent",
    "audience": "Library board and local residents",
    "purpose": "Approve a limited pilot and agree how it will be evaluated",
    "message": "A four-week pilot can establish demand and cost before a permanent schedule change.",
    "logic": [
      "Describe the unmet need",
      "Separate reports from measured demand",
      "Show the proposed pilot",
      "State staffing, safety and cost trade-offs",
      "Set evaluation criteria",
      "Make a clear request"
    ],
    "opening": "Residents have asked for a quiet place to study after 6 p.m. We can test demand without committing to year-round hours.",
    "evidence": "Use real visitor counts, staffing costs and resident feedback when available. This training case contains no verified demand estimate.",
    "visual": "A simple proposed timetable, cost categories and a small evaluation plan.",
    "limits": "Demand, budget impact and staff availability are unknown in this hypothetical example. Do not claim universal support.",
    "ending": "I request a four-week pilot and a public review of attendance, cost and staff feedback before a permanent decision.",
    "question": "'What if hardly anyone comes?' → 'Then the pilot gives us evidence to stop or change the plan. We should agree on the threshold before starting.'",
    "revise": "Weak: 'Everyone wants later hours.' Improved: 'Some residents have requested later hours; a pilot can test whether demand justifies the cost.'",
    "style": "NEED → PILOT → TRADE-OFFS → EVALUATION → REQUEST"
  },
  {
    "id": "toast",
    "type": "Special-occasion speech",
    "title": "A farewell that honours a real person",
    "audience": "Colleagues, friends and the person being recognised",
    "purpose": "Recognise a contribution with sincerity and respect",
    "message": "A specific act of kindness can show the lasting effect a colleague has had on a team.",
    "logic": [
      "Name the occasion",
      "Share one truthful, appropriate memory",
      "Explain what it reveals",
      "Recognise the person's contribution",
      "Offer thanks or a wish"
    ],
    "opening": "On my first day here, I forgot almost every name. Mina noticed and quietly introduced everyone again.",
    "evidence": "Use a real memory that the speaker has permission to share. Do not invent achievements or disclose private details.",
    "visual": "No slides are needed. Use a photo only with permission and only if it supports the occasion.",
    "limits": "Avoid embarrassing jokes, private information or exaggerated praise that sounds insincere.",
    "ending": "Mina, thank you for making it easier for other people to belong here. We will miss you.",
    "question": "'What if you are asked to speak unexpectedly?' → 'Choose one true observation, say what it meant, and offer a sincere thank-you. Do not invent a story.'",
    "revise": "Weak: 'Mina is the best colleague ever.' Improved: 'When I was new, Mina made sure I felt included. That small act shaped my first months here.'",
    "style": "OCCASION → MEMORY → MEANING → RECOGNITION"
  }
]

export const presentationSituations = [
  [
    "Conference talk",
    "Specialists and peers",
    "Evaluate a contribution",
    "Question → methods → evidence → interpretation",
    "Controls, limitations and uncertainty"
  ],
  [
    "Lab meeting",
    "Collaborators",
    "Choose the next experiment",
    "Progress → result → obstacle → decision",
    "Negative results and unresolved controls"
  ],
  [
    "Thesis defence",
    "Mixed committee",
    "Assess the candidate's reasoning",
    "Question → design → evidence → contribution",
    "Defensible claims and independent reasoning"
  ],
  [
    "Job talk",
    "Hiring committee",
    "Assess research vision and fit",
    "Research programme → key result → future direction",
    "Depth, independence and realistic plans"
  ],
  [
    "Business briefing",
    "Managers",
    "Make a decision",
    "Decision → baseline → options → risks",
    "Costs, assumptions and denominators"
  ],
  [
    "Product demo",
    "Users or buyers",
    "Judge a workflow",
    "User task → real demo → outcome → limit",
    "Actual product behaviour and failure modes"
  ],
  [
    "Classroom",
    "Learners",
    "Understand and apply a concept",
    "Phenomenon → explanation → practice → check",
    "Prerequisites and comprehension"
  ],
  [
    "Community proposal",
    "Public board",
    "Evaluate a proposed change",
    "Need → evidence → trade-offs → request",
    "Evidence quality and audience agency"
  ],
  [
    "Toast / ceremony",
    "Friends and colleagues",
    "Recognise a person or occasion",
    "Memory → meaning → recognition",
    "Truth, privacy and sincerity"
  ],
  [
    "Poster session",
    "Individual visitors",
    "Explore a finding through dialogue",
    "Short orientation → selected figure → discussion",
    "Readable hierarchy and adaptable depth"
  ],
  [
    "Online talk",
    "Remote audience",
    "Follow the argument remotely",
    "Verbal signposts → visual support → checks",
    "Captions, audio, screen sharing and backup"
  ],
  [
    "Investor / funding pitch",
    "Funders",
    "Assess opportunity and risk",
    "Problem → evidence → model → risks → ask",
    "Separate traction from assumptions"
  ]
]

export const presentationPhrases = [
  [
    "State the point",
    "The main finding is…",
    "Research / briefing",
    "Use a claim that the evidence can support."
  ],
  [
    "Introduce the question",
    "The question we need to answer is…",
    "Any analytical talk",
    "Give listeners a reason to follow the next section."
  ],
  [
    "Orient a figure",
    "The horizontal axis shows…",
    "Research / business",
    "Name units, sample and comparison."
  ],
  [
    "Separate observation",
    "What we observed was…",
    "Research",
    "Do not smuggle interpretation into the description."
  ],
  [
    "Mark an inference",
    "This suggests…, but it does not establish…",
    "Research",
    "State the evidence boundary."
  ],
  [
    "Explain a term",
    "In this talk, when I say…, I mean…",
    "Mixed audience",
    "Define the term at the point it becomes necessary."
  ],
  [
    "Transition",
    "That raises a second question…",
    "Any talk",
    "Make the relationship between sections audible."
  ],
  [
    "Handle uncertainty",
    "We have not tested that yet.",
    "Research / product",
    "Do not turn missing evidence into a positive result."
  ],
  [
    "Request a decision",
    "Today I am asking for approval to…",
    "Briefing / proposal",
    "Name the actual choice and the trade-off."
  ],
  [
    "Invite a question",
    "Which assumption would you like me to unpack?",
    "Q&A",
    "Make discussion concrete rather than defensive."
  ],
  [
    "Recover your place",
    "Let me return to the main question.",
    "Any talk",
    "Pause and continue without repeated apologies."
  ],
  [
    "Finish clearly",
    "The next step is…",
    "Update / proposal",
    "End with an appropriate implication or action."
  ]
]

export const presentationSources = [
  {
    "title": "iBiology · Share Your Research: How to Give a Good Talk",
    "url": "https://www.ibiology.org/educators-resources/online-course/share-your-research/",
    "kind": "Full source curriculum",
    "summary": "Four modules, 22 core videos, 26 assessment prompts and a cumulative My Talk Plan. Strongest source for research-talk workflow.",
    "use": "Scientific talk backbone; audience, goal, message, story, data, slides, delivery, feedback and Q&A.",
    "limit": "Designed for research talks. Original course materials are CC BY-NC-ND 3.0; Artico links to them rather than copying or adapting them."
  },
  {
    "title": "Stand Up, Speak Out · The Practice and Ethics of Public Speaking",
    "url": "https://open.umn.edu/opentextbooks/textbooks/stand-up-speak-out-the-practice-and-ethics-of-public-speaking",
    "kind": "Open public-speaking textbook",
    "summary": "Covers ethics, listening, audience, purpose, research, argument, speech organisation, language, delivery and informative/persuasive/ceremonial genres.",
    "use": "Broadens the course beyond research seminars.",
    "limit": "Foundational open textbook, not the final word on current digital design or accessibility. CC BY-NC-SA 3.0."
  },
  {
    "title": "Stanford Oral Communication Program",
    "url": "https://oralcommprogram.stanford.edu/",
    "kind": "University teaching guidance",
    "summary": "Practical guidance on content, spoken structure, scientific talks, visuals, delivery, anxiety and rehearsal.",
    "use": "Translate written logic into a followable live argument.",
    "limit": "Professional teaching guidance; not every page is primary experimental research."
  },
  {
    "title": "Garner & Alley (2013) · Assertion–Evidence slide study",
    "url": "https://www.ijee.ie/articles/Vol29-6/23_ijee2791ns.pdf",
    "kind": "Peer-reviewed study",
    "summary": "A comparison involving 110 engineering students found better comprehension, fewer misconceptions, lower cognitive load and stronger delayed recall for an assertion–evidence slide package.",
    "use": "Teach sentence-claim headlines supported by inspectable visual evidence.",
    "limit": "The intervention bundled assertion–evidence with multimedia principles; one engineering-education context."
  },
  {
    "title": "Mayer (2017) · Using multimedia for e-learning",
    "url": "https://doi.org/10.1111/jcal.12197",
    "kind": "Research review",
    "summary": "Reviews 12 research-based principles for instructional multimedia and the cognitive processes they aim to support.",
    "use": "Coherence, signalling, contiguity, segmentation, pre-training and generative learning.",
    "limit": "Research is about multimedia learning, not a universal rulebook for live talks."
  },
  {
    "title": "Cromley & Chen (2025) · Meta-analysis of Mayer's multimedia research",
    "url": "https://doi.org/10.1016/j.edurev.2025.100730",
    "kind": "Peer-reviewed meta-analysis",
    "summary": "92 Mayer-authored articles, 181 studies and 591 effects; overall g=.37 with substantial moderation by design, medium, learner and outcome.",
    "use": "Apply design principles with attention to boundary conditions and active learning.",
    "limit": "Analyses Mayer's own published corpus through 2022; not a meta-analysis of all live presentation designs."
  },
  {
    "title": "Aurbach et al. (2018) · Half-Life Your Message",
    "url": "https://doi.org/10.1177/1075547018781917",
    "kind": "Open-access practice article",
    "summary": "Describes a 60/30/15/8-second message-discovery exercise and the need for reflection afterwards.",
    "use": "Message discovery and prioritisation.",
    "limit": "An experience-based teaching tool, not a randomized efficacy trial or sound-bite formula."
  },
  {
    "title": "Braddock & Dillard (2016) · Narrative persuasion meta-analysis",
    "url": "https://doi.org/10.1080/03637751.2015.1128555",
    "kind": "Peer-reviewed meta-analysis",
    "summary": "Found small positive associations between narrative exposure and narrative-consistent beliefs, attitudes, intentions and behaviours.",
    "use": "Explain why narrative can create relevance and engagement.",
    "limit": "Effects are modest; narrative is not a substitute for factual evidence."
  },
  {
    "title": "Zebregs et al. (2015) · Statistical versus narrative evidence",
    "url": "https://doi.org/10.1080/10410236.2013.842528",
    "kind": "Peer-reviewed meta-analysis",
    "summary": "In health communication studies, statistical evidence had stronger effects on beliefs and attitudes; narrative evidence had stronger effects on intentions.",
    "use": "Match the type of support to the outcome sought.",
    "limit": "Specific to the studies and outcomes included; do not generalise mechanically to every presentation."
  },
  {
    "title": "McWilliam et al. (2025) · Public-speaking-anxiety interventions",
    "url": "https://doi.org/10.1080/00223980.2025.2459662",
    "kind": "Systematic review and meta-analysis",
    "summary": "26 studies and 2,253 participants; psychological interventions showed a positive average effect, with high heterogeneity.",
    "use": "Support gradual practice and evidence-informed anxiety strategies.",
    "limit": "A presentation course is not therapy; intervention effects vary by person and method."
  },
  {
    "title": "Heiman et al. (2012) · Deliberate practice for oral presentations",
    "url": "https://doi.org/10.3109/0142159X.2012.714879",
    "kind": "Randomized educational study",
    "summary": "Evaluated online instruction and deliberate practice for medical students' oral case presentation skills.",
    "use": "Practice tasks should target specific skills and include realistic performance.",
    "limit": "Clinical case presentations are a specific domain, not all public speaking."
  },
  {
    "title": "Kim et al. (2005) · Feedback-card randomized trial",
    "url": "https://doi.org/10.1111/j.1525-1497.2005.0140.x",
    "kind": "Randomized controlled study",
    "summary": "Feedback cards were feasible, but did not significantly improve the summative presentation score in that study.",
    "use": "Show why the existence of a rubric does not guarantee improvement.",
    "limit": "Single medical-school setting and study design."
  },
  {
    "title": "Feedback on oral presentations (2014) · Randomized trial",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25349316/",
    "kind": "Randomized controlled study",
    "summary": "Detailed faculty feedback was associated with better later presentations than no formal feedback; a simple single-item condition did not show the same significant effect.",
    "use": "Teach feedback that identifies observable behaviours.",
    "limit": "Medical clerkship context; do not assume effect sizes transfer to all audiences."
  },
  {
    "title": "Ochoa & Dominguez (2020) · Multimodal feedback tool",
    "url": "https://doi.org/10.1111/bjet.12987",
    "kind": "Randomized educational study",
    "summary": "A semester-long study of 180 students found a small statistically significant effect on subsequent expert evaluation.",
    "use": "Treat automated feedback as supplementary, not a replacement for human judgement.",
    "limit": "Effects differed across dimensions of presentation skill."
  },
  {
    "title": "Wasserstein & Lazar (2016) · ASA statement on p-values",
    "url": "https://doi.org/10.1080/00031305.2016.1154108",
    "kind": "Professional statistical statement",
    "summary": "A p-value is not the probability that a hypothesis is true and does not measure effect size or importance.",
    "use": "Teach honest interpretation of statistical evidence.",
    "limit": "Statistical guidance, not a complete guide to every research design."
  },
  {
    "title": "W3C · Web Content Accessibility Guidelines 2.2",
    "url": "https://www.w3.org/TR/wcag/",
    "kind": "Web standard",
    "summary": "Includes requirements for colour use, contrast and captions for prerecorded synchronized media.",
    "use": "Build accessible slides, online materials and video alternatives.",
    "limit": "WCAG covers web content; live venue access also needs practical planning."
  },
  {
    "title": "Garr Reynolds · Presentation Zen",
    "url": "https://www.garrreynolds.com/tips",
    "kind": "Practitioner framework",
    "summary": "Restraint in preparation, simplicity in design and naturalness in delivery.",
    "use": "Question whether each visual element helps the audience.",
    "limit": "Professional design philosophy, not a controlled research model."
  },
  {
    "title": "Nancy Duarte · Resonate",
    "url": "https://www.wiley.com/en-us/resonate-present-visual-stories-that-transform-audiences-p-9781118008935",
    "kind": "Practitioner framework",
    "summary": "Audience-centred persuasive storytelling, contrast between current and possible states, and a clear call to action.",
    "use": "Persuasive and change-oriented talks.",
    "limit": "Not a universal story formula for science updates, teaching or ceremonial speaking."
  },
  {
    "title": "National Academies (2017) · Communicating Science Effectively",
    "url": "https://doi.org/10.17226/23674",
    "kind": "Consensus study report",
    "summary": "A multidisciplinary consensus report rejects the simple deficit model: science communication depends on goals, audience knowledge, values, trust, social context and two-way engagement.",
    "use": "Audience analysis beyond jargon level; science communication that helps people understand evidence in context.",
    "limit": "Focused particularly on public science communication and contentious issues; not a slide-design manual."
  },
  {
    "title": "Michael Alley · The Craft of Scientific Presentations (2nd ed.)",
    "url": "https://doi.org/10.1007/978-1-4419-8279-7",
    "kind": "Practitioner / technical textbook",
    "summary": "A full technical-presentation guide that develops assertion–evidence slides, conference-talk planning, confidence and public science communication.",
    "use": "Deeper practical reference for technical and research presentations.",
    "limit": "Professional textbook; its advice should be distinguished from experimental findings and adapted to the occasion."
  },
  {
    "title": "Ebrahimi et al. (2019) · Psychological interventions for fear of public speaking",
    "url": "https://doi.org/10.3389/fpsyg.2019.00488",
    "kind": "Peer-reviewed meta-analysis of RCTs",
    "summary": "30 randomized trials with 1,355 participants and 62 interventions; pooled Hedges g=.74 (95% CI .61–.87), with low-to-moderate heterogeneity.",
    "use": "Evidence that psychological interventions can reduce fear of public speaking.",
    "limit": "Effects were larger on self-report than physiological or behavioural outcomes; this is not evidence that slide tips or one breathing trick treat anxiety."
  }
]

export const presentationSourceVideos = [
  {
    "module": "01",
    "title": "What Is a Good Research Talk?",
    "video": "https://www.youtube.com/watch?v=AknZHQHaQic",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_what_is_a_good_research_talk.txt"
  },
  {
    "module": "01",
    "title": "The First Step in Building a Research Talk",
    "video": "https://www.youtube.com/watch?v=CNcj2y03naE",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_first_step_in_building_a_research_talk.txt"
  },
  {
    "module": "01",
    "title": "Know Your Audience",
    "video": "https://www.youtube.com/watch?v=F2GW150UJ4E",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_know_your_audience.txt"
  },
  {
    "module": "01",
    "title": "Know Your Goal",
    "video": "https://www.youtube.com/watch?v=ydSxq0okuSM",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_know_your_goal.txt"
  },
  {
    "module": "01",
    "title": "Know and Distill Your Message",
    "video": "https://www.youtube.com/watch?v=Nk62hE7xG_A",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_know_and_distill_your_message.txt"
  },
  {
    "module": "01",
    "title": "Know Your Speaking Style",
    "video": "https://www.youtube.com/watch?v=uZctRI3tH3M",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_know_your_speaking_style.txt"
  },
  {
    "module": "02",
    "title": "Talks Are Not Papers",
    "video": "https://www.youtube.com/watch?v=8QxaUvdes1E",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_talks_are_not_papers.txt"
  },
  {
    "module": "02",
    "title": "Your Talk as a Story",
    "video": "https://www.youtube.com/watch?v=A5h7fF7gxjk",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_your_talk_as_a_story.txt"
  },
  {
    "module": "02",
    "title": "Storytelling Techniques",
    "video": "https://www.youtube.com/watch?v=aKvq1rRjTgs",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_storytelling_techniques.txt"
  },
  {
    "module": "02",
    "title": "Starting to Build Your Slides",
    "video": "https://www.youtube.com/watch?v=cA1Vvs-nMCo",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_starting_to_build_your_slides.txt"
  },
  {
    "module": "02",
    "title": "Building Effective Slides",
    "video": "https://www.youtube.com/watch?v=J2uDiHeV-ZQ",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_building_effective_slides.txt"
  },
  {
    "module": "02",
    "title": "Body of the Talk",
    "video": "https://www.youtube.com/watch?v=yDM4pc4RPkw",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_body_of_the_talk.txt"
  },
  {
    "module": "03",
    "title": "Introduction",
    "video": "https://www.youtube.com/watch?v=-RrNaR2yHlA",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_introduction.txt"
  },
  {
    "module": "03",
    "title": "The Hook",
    "video": "https://www.youtube.com/watch?v=EvtE-sVHHSw",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_the_hook.txt"
  },
  {
    "module": "03",
    "title": "So What?",
    "video": "https://www.youtube.com/watch?v=iQVT8r3Gl6k",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_so_what.txt"
  },
  {
    "module": "03",
    "title": "Ending",
    "video": "https://www.youtube.com/watch?v=pR_dNU-uAt4",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_ending.txt"
  },
  {
    "module": "03",
    "title": "Talk Titles",
    "video": "https://www.youtube.com/watch?v=OD6dkKhBUf8",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_talk_titles.txt"
  },
  {
    "module": "04",
    "title": "Connecting With Your Audience",
    "video": "https://www.youtube.com/watch?v=OOMamCrNNNg",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_connecting_with_your_audience.txt"
  },
  {
    "module": "04",
    "title": "Practice, Practice, Practice",
    "video": "https://www.youtube.com/watch?v=-XAraXi_ZxU",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_practice_practice_practice.txt"
  },
  {
    "module": "04",
    "title": "Before Taking the Stage",
    "video": "https://www.youtube.com/watch?v=2ameK6uoRMU",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_before_taking_the_stage.txt"
  },
  {
    "module": "04",
    "title": "Lessening the Nerves",
    "video": "https://www.youtube.com/watch?v=CEEB6gDos8o",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_lessening_the_nerves.txt"
  },
  {
    "module": "04",
    "title": "Dealing with the Q&A",
    "video": "https://www.youtube.com/watch?v=9cvHkV7z-nA",
    "transcript": "https://www.ibiology.org/educator-resources/syr/resources_dealing_with_the_q_and_a.txt"
  }
]

export const presentationWorksheets = [
  {
    "title": "Distilling Your Message",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/worksheet-distill-your-core-message.pdf",
    "role": "Module 1 · message discovery"
  },
  {
    "title": "Narrative Elements of Your Talk",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/handout-narrative-elements-of-your-talk.pdf",
    "role": "Module 2 · research narrative"
  },
  {
    "title": "Storytelling Techniques",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/handout-storytelling-techniques.pdf",
    "role": "Module 2 · optional story vignettes"
  },
  {
    "title": "Do's and Don'ts of Slide Design",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/handout-dos-and-donts-of-slide-design.pdf",
    "role": "Module 2 · slide design"
  },
  {
    "title": "Strategies to Connect with Your Audience",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/handout-strategies-to-connect-with-your-audience.pdf",
    "role": "Module 4 · audience connection"
  },
  {
    "title": "AGU Watch Your Words Toolkit",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/AGU-toolkit-watch-your-words-jargon.pdf",
    "role": "Module 4 · jargon and language"
  },
  {
    "title": "Getting Feedback Checklist",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/worksheet-checklist-for-getting-feedback.pdf",
    "role": "Module 4 · rehearsal and feedback"
  },
  {
    "title": "My Talk Plan Worksheet",
    "url": "https://ibio-v2.s3-us-west-1.amazonaws.com/media/course/SYR/2020/worksheet-my-talk-plan.pdf",
    "role": "Cumulative planning worksheet"
  }
]

export const presentationParts = ['FRAME','ARCHITECT','RENDER','DELIVER & LEARN']

export const presentationBlueprintFields = [
  [
    "occasion",
    "Occasion, format and time limit"
  ],
  [
    "audience",
    "Audience profile and prior knowledge"
  ],
  [
    "audienceNeeds",
    "Audience interests, concerns and likely objections"
  ],
  [
    "constraints",
    "Accessibility, venue and technology constraints"
  ],
  [
    "goal",
    "One or two presentation goals"
  ],
  [
    "message",
    "Core message — one defensible sentence"
  ],
  [
    "soWhat",
    "Why this audience should care"
  ],
  [
    "evidence",
    "Evidence that supports the message"
  ],
  [
    "limits",
    "Evidence limitations and open questions"
  ],
  [
    "structure",
    "Chosen structure and logical sequence"
  ],
  [
    "narrative",
    "Research narrative or explanatory path"
  ],
  [
    "vignette",
    "Optional story vignette or hook"
  ],
  [
    "opening",
    "Introduction and necessary background"
  ],
  [
    "body",
    "Body sections: claim, evidence, explanation, implication"
  ],
  [
    "ending",
    "Conclusion and next step"
  ],
  [
    "title",
    "Talk title"
  ],
  [
    "visuals",
    "Slide and visual plan"
  ],
  [
    "dataCheck",
    "Data-figure integrity checklist"
  ],
  [
    "language",
    "Jargon, definitions and analogies"
  ],
  [
    "delivery",
    "Delivery and speaking-style priorities"
  ],
  [
    "rehearsal",
    "Rehearsal plan"
  ],
  [
    "feedback",
    "Feedback observers and evaluation questions"
  ],
  [
    "questions",
    "Likely Q&A and evidence-based responses"
  ],
  [
    "fallback",
    "Venue and technology fallback"
  ],
  [
    "review",
    "Feedback received"
  ],
  [
    "revision",
    "Revisions made and next presentation goal"
  ]
]

