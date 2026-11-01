// Original Artico teaching content. Scientific and business numbers in cases are expressly illustrative.

export const presentationLessons = [
  {
    "id": "01",
    "part": "FOUNDATIONS",
    "title": "What a presentation actually does",
    "goal": "Distinguish purpose from performance.",
    "rule": "A talk succeeds when the audience can use what they heard—not when the speaker looks impressive.",
    "teach": "Public speaking is communicating aloud to people gathered for a purpose. A presentation is a prepared, structured instance of that activity; a speech may be ceremonial, and a lab update may be conversational. Speaking is temporary: listeners cannot reread your last sentence while following your next. Give a clear path, explain prerequisites, and signal changes.",
    "before": "A good presentation has exciting slides and a memorable story.",
    "after": "A good presentation lets this audience understand an idea, judge evidence, make a decision, learn a procedure, or appreciate a moment.",
    "note": "A thesis defense needs justified claims. A toast needs sincere recognition. Neither requires the other's structure.",
    "contrast": "Research seminar: show how evidence changes what we know. Retirement toast: honor one person's contribution with a precise memory.",
    "question": "What counts as success in a lab meeting?",
    "options": [
      "Every slide looks polished",
      "Colleagues can assess the finding and decide the next experiment",
      "The speaker never pauses"
    ],
    "answer": 1,
    "reason": "The meeting exists to examine research and plan action, not reward polish.",
    "practice": "Describe an occasion when people need to hear from you. State what they should understand, decide, or feel when you finish.",
    "field": "purpose",
    "criteria": [
      "Specify an audience benefit",
      "Make success observable"
    ],
    "say": "The main thing I want you to take away is…"
  },
  {
    "id": "02",
    "part": "FRAME",
    "title": "Audience, occasion, purpose",
    "goal": "Plan for actual listeners rather than an imaginary average person.",
    "rule": "Audience is who listens. Purpose is why the talk exists. Message is what remains.",
    "teach": "Investigate what listeners already know, what they need, what they might question, and why they are present. Check the room, platform, time, and accessibility needs. Set an attainable outcome: understanding a method, choosing a policy, or identifying an unresolved question. A topic is not a goal.",
    "before": "Topic: machine learning. Audience: everyone. Goal: cover the subject.",
    "after": "Audience: wet-lab graduate students. Goal: explain when a protein prediction is informative and what it cannot establish. Occasion: a 10-minute research-group introduction.",
    "note": "Ask the organizer what the audience knows. Do not assume an interdisciplinary scientist is a beginner.",
    "contrast": "A CFO needs a decision with costs and risks; a first-year class needs a mental model and checks for understanding.",
    "question": "Which question is most useful before a ten-minute talk?",
    "options": [
      "How many animations should I use?",
      "What will these listeners need to do with this information?",
      "How do I sound more charismatic?"
    ],
    "answer": 1,
    "reason": "Purpose controls scope, proof, vocabulary and structure.",
    "practice": "Write two descriptions of your audience: what they already know, and what they need from this occasion.",
    "field": "audience",
    "criteria": [
      "Name a real audience",
      "Identify prior knowledge",
      "State why they are present"
    ],
    "say": "You may already know that… The new part is…"
  },
  {
    "id": "03",
    "part": "FRAME",
    "title": "Find the core message",
    "goal": "Keep the essential claim without pretending all complexity disappears.",
    "rule": "A core message is a defensible takeaway, not a topic label.",
    "teach": "Write a complete, meaningful sentence describing what changes for the audience. Keep necessary qualifiers. Distill aloud at 60, 30, 15 and about 8 seconds: remove less-essential background rather than speaking faster. If the eight-second form becomes misleading, preserve the qualification and use a longer version.",
    "before": "Today's talk is about app onboarding.",
    "after": "Most trial users drop out before completing setup, so the first three steps deserve our attention.",
    "note": "The takeaway must fit the evidence. 'This treatment works' is not a valid summary of an underpowered pilot.",
    "contrast": "Expert: 'The estimated effect is uncertain after adjustment.' Public: 'We saw a possible difference, but the study is too small to trust it yet.'",
    "question": "Which is the safer distilled message for a small pilot?",
    "options": [
      "Our method is proven superior",
      "In this pilot, the method looked promising; a larger test is needed",
      "The new technology will transform everything"
    ],
    "answer": 1,
    "reason": "Distillation should preserve uncertainty, not delete it.",
    "practice": "Say your message in 60, then 30, 15, and 8 seconds. Write down what you removed and whether the result remains true.",
    "field": "message",
    "criteria": [
      "Use one complete sentence",
      "Preserve the crucial qualification",
      "Make it relevant to this audience"
    ],
    "say": "Here is the key result—and what it does not tell us."
  },
  {
    "id": "04",
    "part": "FRAME",
    "title": "Choose evidence, not everything you know",
    "goal": "Separate necessary support from interesting detail.",
    "rule": "Every detail should earn its place by doing a job.",
    "teach": "Build a claim–evidence–reasoning chain. Select what listeners must know to evaluate the message. Distinguish observation from interpretation and both from speculation. Give denominators, baselines, units, and limitations when they matter. Extra data can move to a handout, backup slide, or Q&A.",
    "before": "We measured 24 variables; I'll show every plot.",
    "after": "The decision depends on completion rate and time-to-first-value; I will show those two measures, their baselines, and the missing-data caveat.",
    "note": "Omission becomes distortion when it hides evidence that could reverse the conclusion.",
    "contrast": "Conference: include the methods needed to judge validity. Project update: foreground a risk and the decision needed today.",
    "question": "What should stay in a five-minute research talk?",
    "options": [
      "Every available experiment",
      "Only the most positive outcome",
      "The result, essential controls, and a relevant limitation"
    ],
    "answer": 2,
    "reason": "The audience needs enough evidence to evaluate the finding, not a data dump or selected success story.",
    "practice": "For your message, identify two necessary pieces of evidence, one limitation, and one interesting detail to cut.",
    "field": "evidence",
    "criteria": [
      "Connect each item to a claim",
      "Name a meaningful limitation",
      "Avoid selective evidence"
    ],
    "say": "The evidence for that is… A limitation is…"
  },
  {
    "id": "05",
    "part": "BUILD",
    "title": "Choose a structure that fits the task",
    "goal": "Organize ideas in a causal or logical order.",
    "rule": "Structure follows the work the audience must do.",
    "teach": "Choose among question → investigation → answer; problem → evidence → recommendation; comparison → criteria → decision; demonstration → observation → explanation; context → challenge → response → outcome. Give prerequisites before dependent ideas. A paper can be reread; a talk needs an immediately traceable path.",
    "before": "Introduction → three unrelated facts → thank you.",
    "after": "Problem: delayed setup → evidence: where users stop → recommendation: simplify the form → test: compare completion next week.",
    "note": "A dramatic story is optional. A precise research methods update may be clearest as question → method → finding → uncertainty.",
    "contrast": "Thesis defense: question, rationale, design, evidence, interpretation. Product demo: user task, actual workflow, result, limits.",
    "question": "Best structure for choosing between two suppliers?",
    "options": [
      "Chronological autobiography",
      "Comparison → criteria → evaluation → decision",
      "Problem → a surprise joke → closing"
    ],
    "answer": 1,
    "reason": "Decision-makers must see the trade-offs against explicit criteria.",
    "practice": "Write your talk as 4–6 one-line steps. Remove or reorder anything that does not advance the audience's task.",
    "field": "structure",
    "criteria": [
      "Use one clear organizing logic",
      "Explain the connection between steps",
      "Place prerequisites first"
    ],
    "say": "To answer that, we need to look at two things."
  },
  {
    "id": "06",
    "part": "BUILD",
    "title": "Explain something difficult",
    "goal": "Make a precise idea easier without making it false.",
    "rule": "Remove unnecessary difficulty, not necessary truth.",
    "teach": "Start with the problem the concept solves. Identify the one prerequisite the audience lacks; define it once. Move from a concrete case to the abstract rule. An analogy is a bridge, not evidence: say where it stops working. Use a simple diagram when spatial relationships or processes matter.",
    "before": "A conformational ensemble is a Boltzmann-distributed measure over a multidimensional free-energy landscape.",
    "after": "A protein does not have just one shape. It moves among many shapes. An ensemble describes which shapes appear and how often under specified conditions; temperature and interactions affect those frequencies.",
    "note": "Avoid 'a protein chooses its favorite shape': the metaphor gives molecules intentions.",
    "contrast": "Business: define 'conversion rate' with numerator and denominator. Science: distinguish a model-predicted structure from measured dynamics.",
    "question": "Which explanation is both clear and accurate?",
    "options": [
      "Proteins intentionally choose their shapes",
      "Proteins have one permanent shape",
      "A protein samples many shapes, and conditions influence how often each occurs"
    ],
    "answer": 2,
    "reason": "It is simple while preserving the key concept.",
    "practice": "Explain one technical concept in three versions: expert, adjacent expert, general audience. Label what you simplified and what you retained.",
    "field": "explanation",
    "criteria": [
      "Define one prerequisite",
      "Use a concrete example",
      "State the limit of an analogy"
    ],
    "say": "In plain terms, that means… The analogy breaks down when…"
  },
  {
    "id": "07",
    "part": "BUILD",
    "title": "Open, guide, and close",
    "goal": "Help listeners stay oriented throughout.",
    "rule": "Start with relevance; show the route; finish with the point.",
    "teach": "In an opening, state the real question or situation and why it matters now. Preview the path only when helpful. Signpost the logic—not each slide number. At the end, give the answer or practical next step; avoid introducing a new argument. A question, simple fact, or direct statement often beats a theatrical hook.",
    "before": "Good afternoon. I have 42 slides and I'll go through all of them.",
    "after": "Our sample turnaround has doubled. I'll show where time is lost, the likely cause, and the test we propose.",
    "note": "No universal opening formula. A solemn occasion should not begin like a startup pitch.",
    "contrast": "Conference: 'Why do these simulations disagree with the experiment?' Toast: 'When I joined this team, Maya was the first person to help me.'",
    "question": "What is the strongest closing for an operational update?",
    "options": [
      "And that's my last slide",
      "So we propose one two-week test; today we need approval for it",
      "As you can see, presentations are important"
    ],
    "answer": 1,
    "reason": "It states the implication and what should happen next.",
    "practice": "Write an opening that introduces a real question, two logical transitions, and a conclusion that answers it.",
    "field": "opening",
    "criteria": [
      "Establish relevance",
      "Show where the talk is going",
      "Close without a new argument"
    ],
    "say": "That brings us to the central question… So the decision today is…"
  },
  {
    "id": "08",
    "part": "BUILD",
    "title": "Explain a figure without reading it",
    "goal": "Turn data into an accurate spoken observation.",
    "rule": "Tell people where to look before telling them what it means.",
    "teach": "Identify the axes, units, groups, and time frame. Pause for the audience to find the comparison. Describe the visible pattern first, then interpretation, then uncertainty. Never imply causation from correlation alone. For percentages, report the denominator; for changes, give the baseline.",
    "before": "This chart clearly proves that our intervention was successful.",
    "after": "The horizontal axis shows weeks; the vertical axis shows completed tasks per day. The pilot team's median increased from 18 to 23. This comparison alone cannot separate the intervention from workload changes.",
    "note": "A truncated axis can make a modest change look enormous. Error bars and sample size may change the conclusion.",
    "contrast": "Scientific figure: show controls and uncertainty. Business chart: show denominator, period, and whether the change affects a decision.",
    "question": "A line rises from 40% to 50%. Which is accurate?",
    "options": [
      "It rose by 10 percentage points",
      "It rose by 10 percent",
      "It doubled"
    ],
    "answer": 0,
    "reason": "40% to 50% is +10 percentage points, or a 25% relative increase.",
    "practice": "Take a chart. Say one sentence for orientation, one for observation, one for uncertainty, and one for implication.",
    "field": "visuals",
    "criteria": [
      "Identify units and groups",
      "Describe before interpreting",
      "Preserve uncertainty"
    ],
    "say": "Start with the horizontal axis… What you can see is…"
  },
  {
    "id": "09",
    "part": "BUILD",
    "title": "Make slides that support thought",
    "goal": "Decide what to show, say, and leave off.",
    "rule": "A slide is a visual aid—not an autocue and not the presentation itself.",
    "teach": "Give a slide one communicative job. Replace a wall of text with a claim plus evidence or a labeled diagram. Use readable contrast, accessible type sizes, and direct labels. Reveal a complex process in stages if that reduces confusion. Never hide material qualifications to create a cleaner slide. Notes, accessible handouts, and captions may contain more detail.",
    "before": "Slide title: Results. Bullets: Methodology, Findings, Discussion, Limitations, Conclusions.",
    "after": "Slide title: 'Completion fell at the identity-check step'. Show a labeled four-step funnel; discuss uncertainty aloud and provide full numbers in an accessible handout.",
    "note": "Short labels near graphics can improve comprehension; 'never put words on slides' is not a rule.",
    "contrast": "Data conference: annotate a figure's critical comparison. Software demo: show the real workflow, not product slogans.",
    "question": "What most improves a hard-to-read result slide?",
    "options": [
      "Add a decorative stock photograph",
      "Replace axes with animations",
      "Give the graph a clear takeaway title and label the relevant comparison"
    ],
    "answer": 2,
    "reason": "Useful cues guide attention without replacing the evidence.",
    "practice": "Redesign a dense slide. Decide what appears, what you speak, and what becomes a handout.",
    "field": "visuals",
    "criteria": [
      "One clear visual job",
      "Readable labels and honest scales",
      "Speech and slide support each other"
    ],
    "say": "Focus on the blue line at the right. Here's why it matters."
  },
  {
    "id": "10",
    "part": "DELIVER",
    "title": "Speak naturally and deliberately",
    "goal": "Make the spoken explanation followable.",
    "rule": "Clear speech is a sequence of understandable decisions, not a performance of confidence.",
    "teach": "Prefer sentences you can say in one breath. Stress the important contrast, use pauses for meaning, and allow time for the audience to inspect visuals. Gestures can guide attention; fixed gestures, continuous motion, and forced eye contact are not universal rules. Adapt to remote settings with clear verbal references and captions.",
    "before": "It should be noted that the aforementioned results are indicative of a potentially substantial divergence.",
    "after": "The two groups behaved differently. The difference is still uncertain.",
    "note": "The clearest words depend on the room. An expert audience may prefer a precise technical term over a long paraphrase.",
    "contrast": "Boardroom: state the proposed decision early. Seminar: slow down when introducing an unfamiliar method.",
    "question": "A complicated chart appears. What next?",
    "options": [
      "Keep speaking while everyone reads",
      "Name the axes, pause, then explain the comparison",
      "Read every value aloud"
    ],
    "answer": 1,
    "reason": "A brief orientation and pause help align what people see and hear.",
    "practice": "Deliver 60 seconds aloud. Mark where a pause improves meaning. Say it again with simpler sentences.",
    "field": "delivery",
    "criteria": [
      "Audible main point",
      "Meaningful pauses",
      "Natural, precise wording"
    ],
    "say": "Here's the part to pay attention to… [pause]"
  },
  {
    "id": "11",
    "part": "DELIVER",
    "title": "Rehearse, receive feedback, revise",
    "goal": "Improve specific behavior with evidence.",
    "rule": "Practise the whole task, not just the script.",
    "teach": "First rehearse the logic without slides. Then time a realistic run with visuals and transitions. Ask a listener what the main point was, when they got lost, and which figure was hard to read. Revise one thing, retest, then prepare backup explanations and a shorter version. Memorizing every word can make recovery harder.",
    "before": "I practised the first slide eight times. I hope the rest works.",
    "after": "I delivered a timed run. A colleague misunderstood the control group, so I rewrote the figure introduction and tested it again.",
    "note": "'You seemed confident' gives less direction than 'The axes were not introduced before the trend.'",
    "contrast": "Scientific defense: rehearse methodological challenges. Product demo: rehearse the actual clicks and a fallback.",
    "question": "Which feedback is actionable?",
    "options": [
      "Be more engaging",
      "The purpose was unclear until minute four",
      "You are a natural"
    ],
    "answer": 1,
    "reason": "It identifies an observable problem that can be revised.",
    "practice": "Run a 3-minute version. Ask a listener for the takeaway and one confusing moment. Write one concrete change.",
    "field": "feedback",
    "criteria": [
      "Do a timed run",
      "Collect observable feedback",
      "Change and retest one feature"
    ],
    "say": "Which part was difficult to follow, and what did you think my main point was?"
  },
  {
    "id": "12",
    "part": "DELIVER",
    "title": "Nerves, time pressure, and recovery",
    "goal": "Keep the message intact when conditions change.",
    "rule": "Recovery is part of competence.",
    "teach": "Prepare the opening, navigation, and final takeaway especially well; do not promise yourself zero nerves. If you lose your place, pause, find the last completed point, and continue. If a 15-minute slot becomes six, keep the message and essential evidence; remove secondary detail. If the projector fails, explain the result with words or a handout rather than inventing what a slide would show.",
    "before": "I'm sorry, I completely forgot everything. Let me start again.",
    "after": "Let me return to the question: did the new workflow reduce waiting time? The key comparison is…",
    "note": "Some speaking anxiety benefits from structured practice or professional support; this course does not diagnose or treat it.",
    "contrast": "Online: keep a downloadable summary and a non-video fallback. Live product demo: state when the product has failed, then show a saved verified result if available.",
    "question": "Your 15-minute talk is reduced to six. What do you do?",
    "options": [
      "Speak 2.5 times faster",
      "Keep the core claim and critical evidence; cut the rest",
      "Skip every limitation"
    ],
    "answer": 1,
    "reason": "Compression is a decision about content, not delivery speed or honesty.",
    "practice": "Prepare a six-minute and a one-minute route through the same presentation.",
    "field": "contingency",
    "criteria": [
      "Preserve the essential point",
      "Keep a meaningful limitation",
      "Practise one technical fallback"
    ],
    "say": "We have less time, so I'll focus on the finding and what it means."
  },
  {
    "id": "13",
    "part": "RESPOND",
    "title": "Answer questions without bluffing",
    "goal": "Listen, clarify and reason with the audience.",
    "rule": "An honest boundary is a good answer.",
    "teach": "Let the question finish. Restate it if ambiguous. Give the answer first, cite the evidence, and acknowledge what you do not know. Separate disagreement about facts from disagreement about priorities. You can offer to investigate later without claiming proof or promising nonexistent work.",
    "before": "Yes, the model definitely generalizes to every condition.",
    "after": "We tested two conditions, so I cannot claim it generalizes beyond them. The next test would be…",
    "note": "A question may reveal a real flaw. The correct outcome may be revising the claim.",
    "contrast": "Research: distinguish measured outcome from proposed mechanism. Business: distinguish a disputed assumption from a different risk tolerance.",
    "question": "An audience member asks about an unmeasured outcome. Best reply?",
    "options": [
      "That outcome probably improved too",
      "We didn't measure it, so I can't say; here is what we did measure",
      "Avoid the question"
    ],
    "answer": 1,
    "reason": "It preserves credibility and makes the evidence boundary explicit.",
    "practice": "Write and speak a reply to a hostile question, an unclear question, and one you cannot answer.",
    "field": "questions",
    "criteria": [
      "Answer or clarify directly",
      "Mark evidence limits",
      "Avoid fake certainty"
    ],
    "say": "We didn't test that directly. What our data support is…"
  },
  {
    "id": "14",
    "part": "TRANSFER",
    "title": "Same principle, different room",
    "goal": "Adapt a method rather than copy a formula.",
    "rule": "Keep the communication job. Change the way you do it.",
    "teach": "Compare a conference talk, lab meeting, business briefing, product demo, classroom, investor pitch, poster, community address, remote meeting, and toast. The shared questions are: whom is this for, what change matters, what support is appropriate? The evidence, tone, structure and length then diverge.",
    "before": "I'll open every talk with a surprising statistic and close with three takeaways.",
    "after": "For the lab meeting, show an unresolved control; for the pitch, state the opportunity and assumptions; for a toast, share a concrete memory and conclude with thanks.",
    "note": "A scientific talk may legitimately conclude 'we do not yet know.' A ceremonial speech may need no slide or argument.",
    "contrast": "Investor pitch: testable assumptions, opportunity and risks. Classroom: explanations in stages and checks for understanding.",
    "question": "Which rule transfers across all presentation types?",
    "options": [
      "Always tell a personal story",
      "Always use slides",
      "Give the audience what they need for the occasion"
    ],
    "answer": 2,
    "reason": "The principle transfers. The technique changes.",
    "practice": "Choose one topic and explain it to a specialist, a decision-maker, and a non-specialist. Compare what changed.",
    "field": "context",
    "criteria": [
      "Adapt vocabulary and evidence",
      "Adapt structure to purpose",
      "Avoid a fixed formula"
    ],
    "say": "For this audience, the important part is…"
  },
  {
    "id": "15",
    "part": "APPLY",
    "title": "Build, give, and improve your talk",
    "goal": "Complete a presentation that fits a real occasion.",
    "rule": "A finished talk is a tested explanation, not a filled-in template.",
    "teach": "Choose a case below or use your own. Complete the blueprint. Build a one-minute version, a full version, and two potential Q&A responses. Deliver aloud to someone; ask them what they understood. Assess the result using the audience's actual task, revise, and present again.",
    "before": "I wrote my script and learned it by heart, so I am finished.",
    "after": "My listener got the main claim but missed the baseline. I changed the visual, explained the comparison earlier, and confirmed they now understood.",
    "note": "Assessment is context-specific: scientific evidence and uncertainty; business decision and risk; teaching comprehension; ceremony sincerity.",
    "contrast": "Research capstone: justify data interpretation. Product capstone: demonstrate a real user outcome and failure condition.",
    "question": "What best demonstrates improvement?",
    "options": [
      "A greater number of slides",
      "A clearer audience takeaway after a specific revision",
      "A more complicated vocabulary"
    ],
    "answer": 1,
    "reason": "Evidence of improved comprehension beats decorative sophistication.",
    "practice": "Record or deliver your complete talk. Then document audience feedback and one revision in your blueprint.",
    "field": "revision",
    "criteria": [
      "Fit audience and occasion",
      "Support key claims",
      "Handle uncertainty and questions",
      "Demonstrate one revision"
    ],
    "say": "The finding is… The evidence is… The limitation is… The next step is…"
  }
]

export const presentationCases = [
  {
    "id": "science",
    "type": "Scientific conference · illustrative research",
    "title": "A protein does not have only one shape",
    "audience": "Interdisciplinary scientists",
    "purpose": "Understand why ensembles matter and evaluate one exploratory result",
    "message": "One static protein structure cannot describe all the conformations a molecule may sample.",
    "logic": [
      "Ask why one structure can be misleading",
      "Introduce conformations and populations",
      "Compare illustrative ensemble populations",
      "Explain uncertainty and implication"
    ],
    "opening": "A protein structure is a snapshot. But if the molecule moves, what does one snapshot miss?",
    "evidence": "ILLUSTRATIVE DATA, not a real experiment: in 100 simulated snapshots, conformation A appears 62 times, B 27 times, and C 11 times. These proportions describe this simulation only.",
    "visual": "A three-bar chart labeled A 62%, B 27%, C 11%; y-axis: share of sampled snapshots. State that the bars are not experimentally validated equilibrium probabilities.",
    "limits": "The simulation may undersample rare states; the model and sampling protocol affect observed frequencies. Do not claim experimental confirmation.",
    "ending": "One structure is useful; an ensemble asks a different question—what other shapes appear, and how often under these conditions?",
    "question": "'How do you know the proportions are converged?' → 'I don't from one run. I would compare independent runs and sampling diagnostics before claiming convergence.'",
    "revise": "Weak: 'We proved three functional states.' Improved: 'Our illustrative trajectory sampled three structural clusters; their function remains unknown.'",
    "style": "QUESTION → EXPLANATION → ILLUSTRATIVE EVIDENCE → LIMITATION"
  },
  {
    "id": "business",
    "type": "Business performance review · illustrative metrics",
    "title": "Reduce support backlog without hiding trade-offs",
    "audience": "Operations leadership",
    "purpose": "Choose a two-week staffing trial",
    "message": "A limited afternoon shift trial is more justified than a permanent schedule change.",
    "logic": [
      "Decision needed",
      "Evidence and baseline",
      "Alternative explanations",
      "Trial and success criteria"
    ],
    "opening": "We need to decide whether afternoon coverage deserves a two-week trial.",
    "evidence": "ILLUSTRATIVE DATA: 200 Monday tickets, 70 received 2–5 p.m.; 35 of those missed the 24-hour response target. Compare with earlier Mondays before extrapolating.",
    "visual": "Hourly arrival bars with day and denominator; separate response-time chart with 24-hour target.",
    "limits": "One Monday cannot establish a stable trend. Ticket complexity and staffing may confound the apparent peak.",
    "ending": "Approve a limited trial with a predefined target, then decide using two weeks of comparable observations.",
    "question": "'Why not hire now?' → 'We have one day of data. A reversible trial tests the pattern before a lasting cost.'",
    "revise": "Weak: 'Afternoons are always overloaded.' Improved: 'This Monday's afternoon tickets were disproportionately late; we need more days to verify the pattern.'",
    "style": "DECISION → EVIDENCE → RISKS → RECOMMENDATION"
  },
  {
    "id": "product",
    "type": "Product demonstration",
    "title": "Show a better appointment-booking flow",
    "audience": "Clinic administrators",
    "purpose": "See whether the interface solves a real scheduling problem",
    "message": "The proposed workflow can reduce repeated manual entry, pending validation with clinic users.",
    "logic": [
      "User's current difficulty",
      "Live workflow from start to confirmation",
      "Observed result",
      "Limits and next test"
    ],
    "opening": "A receptionist currently re-enters the same patient details twice. Let's try the task in the prototype.",
    "evidence": "Demonstrate creating and confirming one appointment. Use sample records; time the task against a defined baseline only if actually measured.",
    "visual": "Real task screens; a small progress label; a clearly indicated sample record.",
    "limits": "One smooth demonstration does not prove usability, reliability or clinical compliance. State what is a prototype.",
    "ending": "The workflow is promising; next we need usability tests with reception staff and a safety review.",
    "question": "'What if the server fails?' → 'The prototype currently fails without offline booking; we won't claim otherwise. Here is the manual fallback.'",
    "revise": "Weak: 'Revolutionary and effortless.' Improved: 'This removes one repeated entry step in the prototype; user testing will tell us whether it helps.'",
    "style": "USER TASK → REAL DEMO → RESULT → LIMIT"
  },
  {
    "id": "teaching",
    "type": "Classroom teaching",
    "title": "Explain diffusion with something familiar",
    "audience": "Secondary-school learners",
    "purpose": "Understand the difference between particle motion and net spread",
    "message": "Random movement can produce a predictable net spread from high to low concentration.",
    "logic": [
      "Observe dye spreading in still water",
      "Notice random motion",
      "Explain concentration difference",
      "Check with a new situation"
    ],
    "opening": "Drop one small bit of food coloring into still water. What happens before anyone stirs?",
    "evidence": "Describe a controlled classroom demonstration and a drawing with many particles on one side; no invented experiment results.",
    "visual": "Three frames showing particles dispersing; labels: high concentration, low concentration, net movement.",
    "limits": "The analogy does not describe every transport process; cells can also use energy-driven transport.",
    "ending": "Individual motion is random, but a concentration difference explains the net spread. Now predict what happens if both sides start equal.",
    "question": "'Do particles know where to go?' → 'No. They move randomly; more start on the crowded side, so more leave it overall.'",
    "revise": "Weak: 'Diffusion is when things want equilibrium.' Improved: 'Particles move randomly; net movement reflects how many particles start in each region.'",
    "style": "OBSERVE → EXPLAIN → CHECK"
  },
  {
    "id": "proposal",
    "type": "Persuasive community proposal",
    "title": "Extend library hours on exam weeks",
    "audience": "Town library board",
    "purpose": "Authorize a reversible four-week pilot",
    "message": "Try two extra evening hours during exam weeks and measure actual use before permanent expansion.",
    "logic": [
      "Whose need is unmet",
      "Evidence to collect",
      "Pilot cost and safeguards",
      "Decision and evaluation"
    ],
    "opening": "Students report needing a quiet place after 6 p.m. The board can test this without committing to year-round expansion.",
    "evidence": "Use actual visitor counts, staffing costs and resident feedback when available. No number here represents a verified demand estimate.",
    "visual": "A simple pilot timetable and cost table; separate assumptions from measured demand.",
    "limits": "Demand and budget impact are not established in this hypothetical case; discuss staff safety and accessibility.",
    "ending": "I request a four-week pilot, with a public review of visits, costs and staff feedback.",
    "question": "'What if only five people come?' → 'Then the pilot gives us grounds not to extend it; we should agree on a threshold first.'",
    "revise": "Weak: 'Everyone wants later hours.' Improved: 'Some residents report a need; a pilot can tell us whether it is widespread enough to justify the cost.'",
    "style": "NEED → PROPOSAL → TRADE-OFFS → REQUEST"
  },
  {
    "id": "toast",
    "type": "Ceremonial speech",
    "title": "A farewell that sounds like a person",
    "audience": "A colleague's friends and coworkers",
    "purpose": "Honor a colleague sincerely",
    "message": "We appreciate the patience and practical kindness Mina brought to the team.",
    "logic": [
      "Set the occasion",
      "Tell one specific, respectful story",
      "Name what the story shows",
      "Offer thanks and a wish"
    ],
    "opening": "On my first day here, I forgot almost every name. Mina noticed and quietly introduced everyone again.",
    "evidence": "One truthful, permitted memory, not invented achievements or private details.",
    "visual": "No slides needed; one photo only with the person's permission.",
    "limits": "Keep private stories private. Avoid teasing that could embarrass the person being honored.",
    "ending": "Mina, thank you for making it easier for other people to belong here. We're going to miss you.",
    "question": "If asked to speak unexpectedly: use one true observation and a sincere thank you; do not invent a dramatic anecdote.",
    "revise": "Weak: 'Mina is the best employee ever.' Improved: a specific example of how Mina helped a newcomer.",
    "style": "MEMORY → MEANING → GRATITUDE"
  }
]

export const presentationSituations = [
  [
    "Conference",
    "Experts",
    "Evaluate a contribution",
    "Question → method → evidence → interpretation",
    "Controls and uncertainty; avoid overclaiming"
  ],
  [
    "Lab meeting",
    "Collaborators",
    "Decide what to test next",
    "Problem → attempt → outcome → obstacle",
    "Show negative results and unresolved issues"
  ],
  [
    "Journal club",
    "Research peers",
    "Critically examine published work",
    "Question → design → findings → critique",
    "Separate authors' claims from your evaluation"
  ],
  [
    "Business briefing",
    "Managers",
    "Make a decision",
    "Decision → baseline → evidence → options",
    "State assumptions and trade-offs"
  ],
  [
    "Product demo",
    "Users or buyers",
    "Assess a workflow",
    "User need → task → outcome → limit",
    "Use a real prototype, not slogans"
  ],
  [
    "Investor pitch",
    "Investors",
    "Assess opportunity and risks",
    "Need → evidence → business model → ask",
    "Assumptions are not traction"
  ],
  [
    "Classroom",
    "Students",
    "Build understanding",
    "Observe → explain → practise → check",
    "Teach prerequisites first"
  ],
  [
    "Project update",
    "Team",
    "Coordinate next action",
    "Progress → risk → decision → owner",
    "Raise blockers early"
  ],
  [
    "Community speech",
    "Mixed public",
    "Understand an issue or proposal",
    "Shared issue → evidence → choices",
    "Accessible terms, no invented consensus"
  ],
  [
    "Online talk",
    "Remote participants",
    "Comprehend without the room",
    "Explicit verbal structure → visuals → checks",
    "Caption, read labels, plan for failure"
  ],
  [
    "Poster",
    "Individual visitor",
    "Explore a finding in dialogue",
    "Visitor question → relevant figure → discussion",
    "Adapt depth as interest emerges"
  ],
  [
    "Toast",
    "Friends and colleagues",
    "Honor a person or occasion",
    "Specific memory → significance → thanks",
    "Respect privacy; slides rarely necessary"
  ]
]

export const presentationPhrases = [
  [
    "State the point",
    "The main finding is…",
    "Research",
    "Do not use 'proves' unless the design really warrants it."
  ],
  [
    "Move the logic",
    "That raises a second question…",
    "Any analytical talk",
    "A transition should connect ideas, not just announce a slide."
  ],
  [
    "Orient a chart",
    "The vertical axis shows…",
    "Research / business",
    "Include units and what is being counted."
  ],
  [
    "Distinguish evidence",
    "What we observed was… One interpretation is…",
    "Research",
    "Separate results from explanation."
  ],
  [
    "Admit limits",
    "We have not tested that yet.",
    "Research / product",
    "Do not turn missing evidence into a positive claim."
  ],
  [
    "Request a decision",
    "Today I'm asking for approval to…",
    "Business / proposal",
    "Name the actual choice."
  ],
  [
    "Invite correction",
    "Is there an assumption I'm missing?",
    "Lab meeting",
    "Make criticism useful rather than defensive."
  ],
  [
    "Check understanding",
    "How would this change if…?",
    "Teaching",
    "Check application, not only recall."
  ],
  [
    "Recover your place",
    "Let me return to the main question.",
    "Any talk",
    "Pause and continue without apologizing repeatedly."
  ],
  [
    "Handle disagreement",
    "Which assumption do you disagree with?",
    "Business / Q&A",
    "Find the disputed premise before rebutting."
  ],
  [
    "Decline to bluff",
    "I don't know. Here's what we could check.",
    "Any Q&A",
    "An honest answer is useful."
  ],
  [
    "Finish clearly",
    "So our next step is…",
    "Project / business",
    "Do not add a new claim after the conclusion."
  ]
]

export const presentationSources = [
  {
    "title": "Science Communication Lab · Share Your Research",
    "url": "https://sciencecommunicationlab.org/research-skills/presentation-on-science/",
    "principle": "Framing a scientific talk: audience, goals, central message; outlining, delivery, practice and questions.",
    "use": "Adapted as original exercises across many types of speaking.",
    "limit": "Course-specific worksheets and copyrighted graphics are not reproduced."
  },
  {
    "title": "iBiology · Public transcripts and educator materials",
    "url": "https://www.ibiology.org/educators-resources/online-course/share-your-research/",
    "principle": "Public transcript examples distinguish goal from message and demonstrate progressive message distillation.",
    "use": "Artico's independent 60/30/15/8-second exercise follows the general idea.",
    "limit": "Full course document, inaccessible login-only exercises and some downloads were not verified."
  },
  {
    "title": "Stanford Oral Communication Program · Presentation Content",
    "url": "https://oralcommprogram.stanford.edu/presentation-and-delivery/presentation-content",
    "principle": "Audience, goal, environment and a coherent spoken structure.",
    "use": "Planning questions and contrasting contexts.",
    "limit": "The commonly suggested three main points are a heuristic, not a natural law."
  },
  {
    "title": "Stanford Oral Communication Program · Scientific Presentation",
    "url": "https://oralcommprogram.stanford.edu/tutoring/scientific-presentation",
    "principle": "Develop a narrative around evidence with varying depths of technical detail.",
    "use": "Scientific example, audience adaptation and explanation.",
    "limit": "Not every scientific talk needs a story-shaped arc."
  },
  {
    "title": "Richard Mayer · Using Multimedia for E-learning (2017)",
    "url": "https://doi.org/10.1111/jcal.12197",
    "principle": "Signaling, coherence, contiguity, segmentation and other tested multimedia-learning principles.",
    "use": "Direct visual labels, legible slides, and less irrelevant decoration.",
    "limit": "Most findings arise in learning materials; effects depend on learners and setting."
  }
]

export const presentationParts = ['FOUNDATIONS','FRAME','BUILD','DELIVER','RESPOND','TRANSFER','APPLY']

export const presentationBlueprintFields = [

 ['type','Presentation type'], ['audience','Audience and occasion'], ['purpose','Purpose and success'], ['message','Core message'],

 ['background','Necessary background'],['structure','Logical structure'],['evidence','Claims, evidence, limitations'],

 ['explanation','Difficult idea explained'], ['visuals','Slide or visual plan'], ['opening','Opening, transitions, closing'],

 ['delivery','Delivery notes'], ['questions','Anticipated questions'], ['contingency','Time and technical fallback'],

 ['feedback','Rehearsal feedback'], ['revision','Revisions and next run']

]
