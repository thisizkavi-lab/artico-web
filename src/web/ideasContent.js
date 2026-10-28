// Original Artico course material. Express a thought; don't memorise a script.
export const IDEAS_BASE = '/application/ideas'
export const ideasPath = (lesson = 'home', mode = 'study', task) =>
  IDEAS_BASE + '/' + lesson + '/' + mode + (task ? '?task=' + encodeURIComponent(task) : '')

export const ideasLessons = [
  {
    id:'01', title:'What Is an Idea?', summary:'Notice the difference between an observation, a question, and a claim.',
    goal:'Find something specific enough to think about.',
    intro:'An idea is not necessarily a finished opinion. It might begin as a question, a surprising observation, a connection, or a doubt. You do not need to force a conclusion before you understand the question.',
    principles:[
      {title:'Start with what you noticed', body:'“People seem quiet in meetings” describes an observation. “People are afraid to speak” offers one possible explanation. Keep those apart until you have evidence.'},
      {title:'Find the question underneath', body:'Ask: What surprised me? What does this depend on? What am I assuming? A productive question can be more useful than an impressive-sounding claim.'},
      {title:'Make the idea small enough to examine', body:'“Technology is bad” is broad. “Notifications interrupt my reading even when I never open them” gives you something you can investigate.'}
    ],
    example:{question:'Why do I remember ideas better after discussing them?',raw:'Talking is good for understanding, I guess.',
      steps:[
        {name:'Observation',text:'I often notice a gap in my understanding when I explain a topic aloud.',why:'This describes an experience without pretending to explain its cause.'},
        {name:'Question',text:'What is it about explaining that reveals the gap?',why:'A question creates room to investigate instead of jumping to a conclusion.'},
        {name:'Tentative idea',text:'Explaining may force me to connect steps that felt clear when I only read them.',why:'A testable interpretation replaces an unsupported generalisation.'}
      ],final:'Explaining an idea can expose gaps that passive familiarity hides.'},
    frames:['I noticed that…','What I find surprising is…','One possible explanation is…'],
    tasks:[
      {id:'01-a',title:'Notice before you conclude',kind:'write',prompt:'Recall an everyday situation that surprised, annoyed, or interested you. Write one observation, one question, and one possible explanation.',starting:'I noticed… / I wonder whether… / One explanation might be…',checks:['Is the observation separate from the explanation?','Is the question specific?','Have I avoided claiming more than I know?']},
      {id:'01-b',title:'Three angles, one subject',kind:'speak',seconds:60,prompt:'Choose an ordinary subject such as commuting, reading, food, or friendship. Speak about it as an observation, a question, and an opinion.',starting:'Something I have noticed… / I keep wondering… / My current view is…',checks:['Did I distinguish a fact from an interpretation?','Did each angle add something new?','Could a listener identify the central topic?']}
    ]
  },
  {
    id:'02', title:'Getting Thoughts Out', summary:'Write, sketch, or speak messily before you begin to judge.',
    goal:'Generate material without pretending the first draft is the final answer.',
    intro:'Thinking is often incomplete and nonlinear. A blank page can become useful when you stop asking it to look finished. Use fragments, questions, voice notes, lists, or freewriting. The goal of this stage is to make thoughts visible.',
    principles:[
      {title:'Separate generating from editing',body:'If every sentence must be good, you may stop producing sentences. Give yourself a short period to collect thoughts before choosing what deserves attention.'},
      {title:'Use the medium that gets you moving',body:'Type, speak aloud, or jot a mind map. Transcription can capture a spoken draft, but check it: transcription errors can silently change your meaning.'},
      {title:'Keep the contradictions',body:'When two claims clash, write both. “I value independence” and “I want more guidance” might reveal a real tension worth exploring.'}
    ],
    example:{question:'Do I prefer working alone or with others?',raw:'Alone is faster. Actually conversations help. Groups waste time. Sometimes I get stuck alone. I like freedom. Maybe it depends.',
      steps:[
        {name:'Keep the fragments',text:'Alone: focus, freedom. Together: new perspectives, feedback. Problem: interruptions.',why:'The raw notes give you something to work with.'},
        {name:'Mark a tension',text:'I want uninterrupted focus, but I also need another person to challenge me.',why:'The conflict is part of the idea, not a mistake to erase.'},
        {name:'Choose a direction',text:'Maybe I need different ways of working at different stages.',why:'A tentative synthesis emerges from the tension.'}
      ],final:'I work best alone when developing a draft, but with others when testing it.'},
    frames:['Let me think out loud…','I may be contradicting myself, but…','I have two competing thoughts…'],
    tasks:[
      {id:'02-a',title:'Two-minute freewrite',kind:'write',prompt:'Write continuously about a question you care about. Fragments are fine. Do not edit or erase. Afterwards, underline the one sentence you want to explore.',starting:'The question I keep coming back to is…',checks:['Did I generate rather than polish?','Did a contradiction or question appear?','Did I identify a promising thread?']},
      {id:'02-b',title:'Think aloud, without a script',kind:'speak',seconds:120,prompt:'Talk through a decision you have not fully made. You may change your mind while talking. At the end, name the strongest tension you noticed.',starting:'At first I thought… / But there is another side…',checks:['Did I allow uncertainty?','Did I identify the competing considerations?','Can I state the core question now?']}
    ]
  },
  {
    id:'03', title:'Finding What You Mean', summary:'Find the central thought hiding in the first draft.',
    goal:'Turn scattered material into a precise claim or question.',
    intro:'A first draft often contains several ideas. Before improving the English, ask what the draft is really about. Clarify key words, distinguish the main point from supporting detail, and find what you have not yet worked out.',
    principles:[
      {title:'Use the one-sentence test',body:'Complete this sentence: “What I am trying to say is…” If you cannot do it yet, that is information. You may still be exploring several questions.'},
      {title:'Interrogate vague words',body:'Words such as better, freedom, success, and meaningful can hide disagreement. Ask: better for whom, in what way, under which conditions?'},
      {title:'Cut without losing the discovery',body:'A clear point may need one useful distinction rather than five similar sentences. Save interesting side thoughts for later rather than forcing all of them into one answer.'}
    ],
    example:{question:'Why does advice sometimes bother me?',raw:'Advice is annoying. People are trying to help but it feels like pressure. I want to decide for myself. I still ask for advice.',
      steps:[
        {name:'Possible main point',text:'I do not dislike advice itself.',why:'This removes an overstatement in the raw draft.'},
        {name:'Useful distinction',text:'I dislike advice delivered as an instruction instead of an option.',why:'The distinction makes the position intelligible.'},
        {name:'Clear statement',text:'Helpful advice protects the other person’s freedom to decide.',why:'The idea now expresses an underlying principle.'}
      ],final:'What bothers me is not advice, but advice that leaves no room for my own judgment.'},
    frames:['What I am really trying to say is…','The distinction is between… and…','More precisely…'],
    tasks:[
      {id:'03-a',title:'Distil the messy paragraph',kind:'write',prompt:'Read this thought: “There is so much online. Some people learn things, other people just scroll. Reading is useful, but I feel like too much information does not really stay with us. It is not necessarily bad.” Write its strongest possible central point and one unresolved question.',starting:'The central point could be… / I still need to know…',checks:['Is the point specific?','Have I retained important nuance?','Is the unresolved question real?']},
      {id:'03-b',title:'Explain one important word',kind:'speak',seconds:60,prompt:'Choose one: success, confidence, freedom, or intelligence. Explain what you mean by it and what you do not mean.',starting:'When I say “___”, I mean… / I do not mean…',checks:['Did I give a concrete definition?','Did I distinguish it from a similar concept?','Could someone disagree with this definition intelligently?']}
    ]
  },
  {
    id:'04', title:'Reasoning & Challenging Ideas', summary:'Connect claims to reasons; test them against real objections.',
    goal:'Make an idea stronger—or change it when the reasoning fails.',
    intro:'A reason explains why a claim might be true. An example illustrates; it does not automatically prove. Evidence supports a claim, but its strength depends on how it was collected and how well it bears on the question. Research is useful when a factual assumption matters.',
    principles:[
      {title:'Ask what makes the reason relevant',body:'“Remote work is better because I like it” gives a preference, not a general argument. “Remote work removes a two-hour commute” identifies a possible benefit, but you still need to say who benefits and what is lost.'},
      {title:'Look for a serious counterexample',body:'Do not invent a weak opponent just to win. Ask what would make a reasonable person disagree and what observation would change your mind.'},
      {title:'Match confidence to evidence',body:'Use “may”, “often”, “under these conditions”, or “I am not sure” when the support is limited. Accuracy matters more than sounding certain.'}
    ],
    example:{question:'Does working from home improve productivity?',raw:'Working from home always increases productivity because there are fewer distractions.',
      steps:[
        {name:'Test the reason',text:'Some people have fewer interruptions at home; others have more.',why:'The same condition can affect people differently.'},
        {name:'Find the missing evidence',text:'We would need a clear definition of productivity and comparable work outcomes.',why:'Preference or anecdotes alone cannot establish a general effect.'},
        {name:'Revise the claim',text:'Remote work may improve focused work when home conditions are suitable, but coordination can become harder.',why:'The revised claim states the conditions and trade-off.'}
      ],final:'Whether remote work improves productivity depends on the work, the environment, and how teams coordinate.'},
    frames:['My reason is…','That example shows…, but it does not establish…','A serious objection would be…','I would change my mind if…'],
    tasks:[
      {id:'04-a',title:'Claim → reason → evidence',kind:'write',prompt:'Evaluate: “Schools should ban smartphones because they distract students.” State the claim, give its strongest reason, identify a plausible objection, and describe evidence that could settle part of the disagreement.',starting:'The claim is… / The strongest reason is… / However… / We would need to know…',checks:['Does the reason actually support the claim?','Is the objection fair?','Have I named evidence rather than merely another opinion?']},
      {id:'04-b',title:'Argue against your first answer',kind:'speak',seconds:90,prompt:'Choose a belief you hold about study, work, friendship, or technology. Defend it briefly. Then offer the strongest reasonable argument against it.',starting:'My view is… / Someone might reasonably object that… / My revised view is…',checks:['Did I explain the connection between reason and claim?','Was the objection serious?','Did my final confidence fit the evidence?']}
    ]
  },
  {
    id:'05', title:'Organizing Your Ideas', summary:'Choose a structure that fits the meaning, not a compulsory formula.',
    goal:'Guide your listener from a starting point to a clear takeaway.',
    intro:'Good organization makes the relationship between thoughts visible. Point → support → implication is a useful starting structure for an opinion. But explaining a process, comparing options, and exploring a question require different shapes.',
    principles:[
      {title:'Choose the right shape',body:'For an opinion: point, reason, example, implication. For an explanation: what it is, how it works, why it matters. For a decision: options, criteria, trade-offs, conclusion.'},
      {title:'Connect the logic, not just the sentences',body:'“Furthermore” does not repair a missing reason. Explain why one sentence leads to the next. Use transitions only where they express a real relationship.'},
      {title:'End where the argument leads',body:'A takeaway should answer “so what?” It should not merely repeat the introduction with grander words.'}
    ],
    example:{question:'Should meetings always have an agenda?',raw:'Meetings waste time. Agendas help. Sometimes brainstorming is better without one. People should prepare.',
      steps:[
        {name:'Point',text:'Most decision-making meetings benefit from a short agenda.',why:'The claim is modest enough to defend.'},
        {name:'Support',text:'An agenda identifies the decision and information needed, so participants can prepare.',why:'The reason describes the mechanism.'},
        {name:'Qualification',text:'An exploratory conversation may need only a broad question.',why:'The exception prevents an unnecessary absolute.'},
        {name:'Implication',text:'Choose meeting structure according to what the group needs to accomplish.',why:'The conclusion gives the listener a practical principle.'}
      ],final:'Meeting structure should follow the purpose: use a clear agenda for decisions, and more flexibility for exploration.'},
    frames:['My main point is…','The reason is…','For example…','The implication is…','That said…'],
    tasks:[
      {id:'05-a',title:'Organize scattered notes',kind:'write',prompt:'Organize these notes into one argument: “Public libraries are free spaces / people need a place to work / libraries also provide books and internet / not everyone has a quiet home / funding matters.” State a point, support it, and end with an implication.',starting:'Point → Reason → Example → Why it matters',checks:['Does each sentence serve the main point?','Is the example doing useful work?','Is the ending earned?']},
      {id:'05-b',title:'Choose a different structure',kind:'speak',seconds:90,prompt:'Explain how you learned a difficult skill. Use a process structure (starting point → obstacle → change → result), not point → reason → implication.',starting:'When I started… / I struggled with… / What helped was… / Now…',checks:['Did the sequence make sense?','Were the turning points clear?','Did I avoid forcing an argument template onto a process?']}
    ]
  },
  {
    id:'06', title:'Expressing Thoughts in English', summary:'Say the same thought naturally in different situations.',
    goal:'Build flexible language instead of memorizing whole speeches.',
    intro:'Once you know what you mean, you need language to express it. A strong speaker can clarify, disagree, qualify, ask a better question, and repair a sentence mid-thought. Natural English is often simpler than the first translation that comes to mind.',
    principles:[
      {title:'Match the expression to the situation',body:'“I am not convinced” can work in discussion. “I see it differently” may sound softer in a casual conversation. Neither is always the best choice; intention and relationship matter.'},
      {title:'Qualify without becoming vague',body:'“In some cases”, “as far as I can tell”, and “I may be wrong, but…” specify uncertainty. Avoid filling every sentence with hesitation.'},
      {title:'Repair in real time',body:'Native and proficient speakers regularly restart and reformulate. “Actually, let me put that differently…” is useful language, not a failure.'}
    ],
    example:{question:'How can I disagree about learning methods?',raw:'That is wrong. Everybody learns differently.',
      steps:[
        {name:'Casual',text:'I see what you mean, but that would not work for everyone.',why:'Direct but cooperative, suitable for a friend.'},
        {name:'Neutral',text:'I would question whether one method suits every learner.',why:'Focuses criticism on the claim, not the person.'},
        {name:'Qualified',text:'Some shared principles may help, but people differ in their needs and circumstances.',why:'Leaves room for a more defensible position.'}
      ],final:'I would question whether a single learning method works for everyone.'},
    frames:['What I mean is…','I see your point, but…','As far as I can tell…','Let me put that another way…','Would it be fair to say…?'],
    tasks:[
      {id:'06-a',title:'Three registers, one idea',kind:'write',prompt:'Express this thought in three ways—friendly, neutral, and formal: “I think our plan has a problem because nobody has checked the costs.” Keep the underlying idea unchanged.',starting:'To a friend: … / To a colleague: … / In a report: …',checks:['Is the meaning consistent?','Does each version fit its audience?','Did I avoid needless complexity?']},
      {id:'06-b',title:'Clarify yourself in conversation',kind:'speak',seconds:75,prompt:'Start by explaining why learning another language matters to you. Halfway through, deliberately say “Actually, let me put that differently” and express the thought more precisely.',starting:'For me… / Actually, let me put that differently… / What matters is…',checks:['Did the reformulation improve the idea?','Did my speech remain natural?','Could I finish without memorizing exact wording?']}
    ]
  },
  {
    id:'07', title:'Writing, Revising & Editing', summary:'Improve the thinking first; polish the sentences second.',
    goal:'Revise without losing your own voice.',
    intro:'Revision is not the same as correcting grammar. First repair meaning, reasoning, order, and unnecessary claims. Then remove repetition and improve sentence-level precision. Keep the rough version so you can see what changed.',
    principles:[
      {title:'Make a structural pass',body:'Ask whether the point is clear, the reasons fit, objections are handled, and every paragraph earns its place. It is often easier to move or delete a section than to improve every sentence inside it.'},
      {title:'Make a language pass',body:'Replace vague wording, trim duplication, choose appropriate tone, and check grammar. Prefer a straightforward sentence to one that merely sounds academic.'},
      {title:'Know when to stop',body:'A stronger draft meets its purpose with fewer distractions. More editing does not always produce more clarity; use a specific criterion for each pass.'}
    ],
    example:{question:'Should students make mistakes when practicing?',raw:'I personally think that it is very important and really necessary for students to be able to make errors and mistakes during their process of learning because errors and mistakes can help them learn better and also because sometimes people are afraid.',
      steps:[
        {name:'Find the idea',text:'Fear of mistakes can prevent students from practicing.',why:'The causal idea is more specific than “mistakes are important”.'},
        {name:'Add the missing condition',text:'Mistakes help when learners receive useful feedback and try again.',why:'Errors alone do not guarantee learning.'},
        {name:'Cut repetition',text:'Students need room to make mistakes, receive feedback, and try again.',why:'The revised sentence is shorter and more informative.'}
      ],final:'Students need room to make mistakes. What matters is noticing the error, receiving useful feedback, and trying again.'},
    frames:['The real point is…','A more precise version would be…','This sentence adds nothing because…'],
    tasks:[
      {id:'07-a',title:'Revise an inflated argument',kind:'write',prompt:'Revise: “In today’s modern society, it is extremely important to take into consideration the fact that everybody should perhaps have some time for thinking about things because it is a very valuable activity.” First identify the missing meaning; then make it direct without inventing evidence.',starting:'Weakness: … / Revised version: … / What remains unsupported: …',checks:['Did I repair meaning before grammar?','Did I remove repetition?','Did I avoid adding unsupported claims?']},
      {id:'07-b',title:'Your two-pass revision',kind:'write',prompt:'Take a paragraph from your own recent writing (or the idea you saved above). Draft it, then use the separate Revision box: first improve the reasoning, then edit for clarity and concision.',starting:'First draft → structural changes → clearer final version',checks:['Did the point become more precise?','Can I name one meaningful change?','Does the final version still sound like me?']}
    ]
  },
  {
    id:'08', title:'Thinking & Speaking on the Spot', summary:'Speak from a thought, not from a memorized script.',
    goal:'Produce a coherent answer while managing uncertainty and time.',
    intro:'Impromptu speech tests whether you can quickly choose a point, support it, and conclude. A short pause is fine. You can begin with a provisional answer, explain your reason, and adjust when needed. Progress comes from trying, listening, and repeating with a new prompt.',
    principles:[
      {title:'Take a few seconds to choose a direction',body:'Ask yourself: What is my answer? What one reason makes sense? What example do I actually know? A small, clear answer beats five unfinished points.'},
      {title:'Use a lightweight frame',body:'Try answer → reason → example → takeaway for a short opinion. For a genuine uncertainty, try what I know → what I do not know → what I would need to decide.'},
      {title:'Reflect on evidence, not feelings',body:'After speaking, check whether your main point was understandable and where you lost the thread. Re-record with one purposeful change. Then try another question without notes.'}
    ],
    example:{question:'Is it better to be curious or confident?',raw:'Confidence is important, curiosity is also important, I do not know.',
      steps:[
        {name:'Choose a tentative answer',text:'I would choose curiosity, at least when learning something new.',why:'The answer is direct without pretending to apply everywhere.'},
        {name:'Add a reason',text:'Curiosity makes me ask questions even when I do not yet understand.',why:'The reason explains the choice.'},
        {name:'Qualify',text:'Confidence still matters when you need to act on what you know.',why:'The thought remains open to context.'}
      ],final:'For learning, I would choose curiosity. It pushes me to ask questions instead of pretending I understand. But when it is time to act, confidence matters too.'},
    frames:['My first thought is…','The main reason is…','One example would be…','So I would say…','Let me rephrase that…'],
    tasks:[
      {id:'08-a',title:'30-second answer',kind:'speak',seconds:30,prompt:'Do people learn more from success or failure? Give a position, one reason, and a short takeaway.',starting:'I would say… because… So…',checks:['Was my position clear?','Did I offer a reason?','Did I finish rather than trail off?']},
      {id:'08-b',title:'One-minute impromptu',kind:'speak',seconds:60,prompt:'Should we always follow our interests when choosing what to study? Give one reason, an example, and a qualification.',starting:'Generally… / For example… / However…',checks:['Did I choose one central line of reasoning?','Was the example relevant?','Did I recognize a reasonable exception?']},
      {id:'08-c',title:'Two-minute thoughtful answer',kind:'speak',seconds:120,prompt:'What is one belief you changed your mind about? Explain your earlier view, what challenged it, and what you think now. Use your own experience; no invented drama.',starting:'I used to think… / Then I noticed… / Now I think…',checks:['Could a listener follow the change?','Did I explain what caused it?','Did I finish with a genuine conclusion?']}
    ]
  }
]
export const ideasLesson = (id) => ideasLessons.find((lesson) => lesson.id === id)
export const ideasTask = (id) => ideasLessons.flatMap((lesson) => lesson.tasks).find((task) => task.id === id)
