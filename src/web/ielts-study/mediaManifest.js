/**
 * Artico IELTS Media & Audio Manifest (`artico-ielts-study-v1`)
 * Catalogs 2 ready audio recordings and 8 reserved audio blueprints.
 * Every reserved slot provides a complete spoken script with stress/signal
 * highlights and analytical notes, ensuring full instructional value.
 */

export const MEDIA_SLOTS = {
  'slot-l-correction': {
    id: 'slot-l-correction',
    unitId: 'l-complete-message-paraphrase',
    status: 'ready',
    src: 'audio/ielts/workshop.wav',
    title: 'Bellford Community Workshop: Live Corrections and Exclusions',
    durationLabel: '1:08',
    voices: 'Workshop Coordinator (Synthetic US English training voice)',
    teachingFocus:
      'Listen to how advertised times, rooms, equipment plans, and fees are updated or qualified mid-announcement. Wait for the confirmed arrangement rather than entering the first number or noun you hear.',
    script: {
      turns: [
        {
          speaker: 'Instructions',
          text: 'You will hear the final arrangements for a community workshop. Read the five questions before playing this recording.',
          note: 'Spoken framing line at 0:00 before the announcement begins.',
        },
        {
          speaker: 'Coordinator',
          text: 'Welcome to the Bellford community workshop. Here are the final arrangements for Saturday. The session was advertised for ==ten o’clock==, ==but== we have changed the start to ==ten thirty==. Please arrive ==ten minutes before== that so we can check everyone in. We originally booked ==Room fourteen==. ==However==, the projector there is being repaired, so please come to ==Room eighteen== instead.',
          note: 'Time distractor 10:00 is replaced by start time 10:30 (while arrival is 10:20). Pivot "However" cancels Room 14 in favour of Room 18.',
        },
        {
          speaker: 'Coordinator',
          text: 'You do not need to bring any tools. We will provide them, together with safety glasses. Please ==bring a notebook== if you want to take notes. We ==first considered== asking everyone to bring their own gloves, ==but that is no longer necessary==. Gloves will be available at the workshop.',
          note: 'Tools, safety glasses, and gloves are supplied; an abandoned plan ("first considered... no longer necessary") leaves "a notebook" as the item to bring.',
        },
        {
          speaker: 'Coordinator',
          text: 'The standard fee is twelve pounds. That includes the materials and a hot drink, ==but not lunch==. Payment is by card at reception. There is no car park at the centre. The nearest bus stop is on ==Market Street, not Station Road==. If you cycle, you can leave your bike behind the building. We look forward to seeing you on Saturday.',
          note: 'Explicit exclusions ("but not lunch", "not Station Road") separate included items and valid transport stops from distractors.',
        },
      ],
    },
  },

  'slot-l-distractors': {
    id: 'slot-l-distractors',
    unitId: 'l-eight-distractors',
    status: 'reserved',
    src: 'audio/ielts/study/l-distractors.mp3',
    title: 'Three Micro-Exchanges: Numbers, Spellings, and Planned Facilities',
    durationLabel: '0:50',
    voices: 'Two dialogue speakers (British and Australian accents)',
    teachingFocus:
      'Track subtle phonetic and grammatical traps: singular versus plural nouns, unusual letter sequences, and existing versus proposed facilities.',
    script: {
      turns: [
        {
          speaker: 'Speaker A',
          text: 'Could you give me the application form for the ==parking permit==?',
        },
        {
          speaker: 'Speaker B',
          text: 'Do you mean the general parking permit, or the ==student permits==? If you have two vehicles on campus, you must register both ==permits==.',
          note: 'Target requires plural "permits" when qualifying conditions apply.',
        },
        {
          speaker: 'Speaker A',
          text: 'And what is the supervisor\'s surname?',
        },
        {
          speaker: 'Speaker B',
          text: 'It is Dr Braithwaite. Let me spell that: ==B-R-A-I-T-H-W-A-I-T-E==. Notice the "H" after the "T".',
          note: 'Silent and cluster letters must match letter by letter.',
        },
        {
          speaker: 'Speaker A',
          text: 'Where does the seminar meet for lunch?',
        },
        {
          speaker: 'Speaker B',
          text: 'The brochure mentions the new roof garden, but that ==will open next spring==. For this term, everyone gathers in the ==courtyard==.',
          note: 'Future facility (roof garden) rejected; current facility (courtyard) is the target.',
        },
      ],
    },
  },

  'slot-l-map-route': {
    id: 'slot-l-map-route',
    unitId: 'l-maps-plans-diagrams',
    status: 'reserved',
    src: 'audio/ielts/study/l-map-route.mp3',
    title: 'Bellford Study Centre: Spatial Orientation Tour',
    durationLabel: '0:55',
    voices: 'Reception Guide (British English)',
    teachingFocus:
      'Follow the spoken compass and turn directions step by step from the Main Entrance. Watch for renamed or repurposed rooms.',
    script: {
      turns: [
        {
          speaker: 'Guide',
          text: 'Welcome to the Bellford Study Centre. As you stand here at the ==Main Entrance== facing north, the ==Reception desk== is directly ahead of you across the foyer.',
          note: 'Establishes starting anchor and orientation.',
        },
        {
          speaker: 'Guide',
          text: 'If you take the corridor to your left, you reach Room A on your immediate right. Continue along that passage to find Room B at the far western corner.',
        },
        {
          speaker: 'Guide',
          text: 'Now, returning to the centre: just behind Reception lies the open-air ==Courtyard Garden==, with ==Seminar Room D== stretching along its northern edge. To the north-west of the garden was the ==former bookshop==, labelled C on your plan. That space is now closed for storage.',
          note: 'Historical label distractor: Room C was the bookshop, now closed; Seminar Room D borders the north side of the garden.',
        },
        {
          speaker: 'Guide',
          text: 'Walk along the eastern corridor past the ==Café, labelled F== on your right. Just past the Café on the north-east corner sits ==Room E==, which is where the IT workshops run.',
          note: 'Target location Room E placed relative to Café F and the north-east corner.',
        },
      ],
    },
  },

  'slot-l-part3-attribution': {
    id: 'slot-l-part3-attribution',
    unitId: 'l-discussions-and-lectures',
    status: 'reserved',
    src: 'audio/ielts/study/l-part3-attribution.mp3',
    title: 'Research Methodology Tutorial: Attribution and Sample Sizes',
    durationLabel: '0:48',
    voices: 'Tutor, Maya, and Leo (Academic tutorial group)',
    teachingFocus:
      'Listen for who holds which view. Separate an idea proposed by one student from the recommendation confirmed by the tutor.',
    script: {
      turns: [
        {
          speaker: 'Leo',
          text: 'Dr Chen, Maya and I read Professor Patel\'s paper on suburban bus usage. He claims fare cuts alone increase ridership permanently.',
        },
        {
          speaker: 'Maya',
          text: '==I am not convinced by that==. The data in Table 3 shows ridership dropped again once fuel prices stabilized.',
          note: 'Maya expresses explicit disagreement with the author\'s conclusion.',
        },
        {
          speaker: 'Tutor',
          text: 'Maya makes a valid point. For your own seminar project, your proposed interview topic is strong. ==However==, your sample size of ==12 interviews== is far too small.',
        },
        {
          speaker: 'Leo',
          text: 'Should we aim for 50 participants then?',
        },
        {
          speaker: 'Tutor',
          text: 'Fifty is unrealistic within three weeks. You need at least ==30 completed surveys== to identify meaningful patterns.',
          note: 'Target requirement is 30 surveys; 12 and 50 are distractors.',
        },
      ],
    },
  },

  'slot-l-part4-signposts': {
    id: 'slot-l-part4-signposts',
    unitId: 'l-discussions-and-lectures',
    status: 'reserved',
    src: 'audio/ielts/study/l-part4-signposts.mp3',
    title: 'Urban Climatology Lecture: Macro Signposts in Monologue',
    durationLabel: '0:50',
    voices: 'University Lecturer (Australian English)',
    teachingFocus:
      'Identify discourse signposts that signal a definition, a categorization, an example, or a transition to the next lecture section.',
    script: {
      turns: [
        {
          speaker: 'Lecturer',
          text: 'Good afternoon. Today we examine the ==urban heat island effect==. ==To begin with a formal definition==, this describes an urban area that experiences substantially warmer temperatures than surrounding rural districts.',
          note: 'Signpost introduces foundational definition.',
        },
        {
          speaker: 'Lecturer',
          text: '==Environmental engineers divide the causes into two broad categories==. First, thermal properties of dark building materials. Second, the reduction of evaporative cooling from vegetation.',
          note: 'Signpost introduces two-part structural classification.',
        },
        {
          speaker: 'Lecturer',
          text: '==A clear illustration of this== can be observed in central Tokyo during August, where nighttime heat retention exceeds surrounding suburbs by up to four degrees Celsius.',
          note: 'Signpost flags concrete evidentiary example.',
        },
        {
          speaker: 'Lecturer',
          text: '==Now let us turn to the primary counter-measure==: reflective roof coatings.',
          note: 'Signpost signals transition to the solutions section.',
        },
      ],
    },
  },

  'slot-s-part1-direct': {
    id: 'slot-s-part1-direct',
    unitId: 's-procedural-and-part1',
    status: 'ready',
    src: 'audio/ielts/speaking-example.wav',
    title: 'Speaking Part 1: Direct Answer and Three-Sentence Neighbourhood Detail',
    durationLabel: '0:16',
    voices: 'Examiner & Candidate (Synthetic US English training voice)',
    teachingFocus:
      'Notice the natural three-sentence structure: direct answer first, a relevant reason explaining the choice, and one concrete everyday detail without memorised filler.',
    script: {
      turns: [
        {
          speaker: 'Examiner',
          text: 'Is there a place in your neighbourhood you enjoy visiting?',
        },
        {
          speaker: 'Candidate',
          text: '==Yes, there is a small park near my apartment.== I usually go there after work ==because it is quieter than the main street==. Even a short walk around the pond helps me switch out of work mode.',
          note: 'Sentence 1 answers directly; Sentence 2 gives the reason; Sentence 3 adds one specific detail.',
        },
      ],
    },
  },

  'slot-s-part2-longturn': {
    id: 'slot-s-part2-longturn',
    unitId: 's-part2-long-turn-and-timeframes',
    status: 'reserved',
    src: 'audio/ielts/study/s-part2-longturn.mp3',
    title: 'Speaking Part 2: Long Turn Delivered from Twelve-Word Keyword Notes',
    durationLabel: '1:45',
    voices: 'Candidate (Individual Long Turn)',
    teachingFocus:
      'Notice how the speaker uses brief keyword notes to stay on track across past, present, and future timeframes without reading full memorised sentences.',
    script: {
      turns: [
        {
          speaker: 'Candidate',
          text: 'I would like to describe a practical skill that took me several months to learn, which was ==touch-typing without looking at the keyboard==.',
          note: 'Clear opening directly addressing cue card topic.',
        },
        {
          speaker: 'Candidate',
          text: 'I started learning it about two years ago when I began writing longer essays for university. At first, my typing speed dropped dramatically, and I made frequent spelling errors. I had to practice for fifteen minutes every evening on a simple web application.',
          note: 'Past timeframe: context, challenge, and concrete habit.',
        },
        {
          speaker: 'Candidate',
          text: 'Nowadays, it has become second nature. I can type lecture notes quickly while looking at the whiteboard, which saves me a great deal of revision time.',
          note: 'Present timeframe: current competence and everyday benefit.',
        },
        {
          speaker: 'Candidate',
          text: 'Looking ahead, I plan to learn shorthand notation next year because accurate note-taking will be essential in my future role as a legal researcher.',
          note: 'Future timeframe: extension to upcoming goals.',
        },
      ],
    },
  },

  'slot-s-part3-chain': {
    id: 'slot-s-part3-chain',
    unitId: 's-part3-operations-and-development',
    status: 'reserved',
    src: 'audio/ielts/study/s-part3-chain.mp3',
    title: 'Speaking Part 3: Abstract Explanation with Explicit Mechanism',
    durationLabel: '0:45',
    voices: 'Examiner & Candidate',
    teachingFocus:
      'Notice how the candidate moves beyond personal anecdote to answer a broader societal question using a clear causal chain and reasonable hedge.',
    script: {
      turns: [
        {
          speaker: 'Examiner',
          text: 'Why do you think some working adults find it difficult to learn new practical skills?',
        },
        {
          speaker: 'Candidate',
          text: 'I think the primary obstacle is ==cognitive fatigue combined with inflexible working hours==. After completing a demanding eight-hour shift, most adults have limited mental energy to absorb unfamiliar procedures.',
          note: 'Direct abstract claim followed by the physiological/mental mechanism.',
        },
        {
          speaker: 'Candidate',
          text: 'For instance, someone working full-time in healthcare may find it almost impossible to attend regular evening language classes.',
          note: 'Representative professional scenario illustrating the mechanism.',
        },
        {
          speaker: 'Candidate',
          text: '==That said==, when employers provide dedicated training hours during the working week, adult skill acquisition tends to be much more successful.',
          note: 'Concession and counter-condition demonstrating grammatical range.',
        },
      ],
    },
  },

  'slot-s-stress-contrast': {
    id: 'slot-s-stress-contrast',
    unitId: 's-pronunciation-stress-pace',
    status: 'reserved',
    src: 'audio/ielts/study/s-stress-contrast.mp3',
    title: 'Pronunciation: Contrastive Sentence Stress and Final Consonant Pairs',
    durationLabel: '0:40',
    voices: 'Pronunciation Coach',
    teachingFocus:
      'Listen to how moving stress from an adjective to a noun shifts the contrastive meaning, and notice how clear word-final consonants prevent misunderstandings.',
    script: {
      turns: [
        {
          speaker: 'Coach',
          text: 'Listen to these two sentences with contrastive stress.',
        },
        {
          speaker: 'Coach',
          text: 'Sentence 1: "I wanted the ==BLUE== folder." Here the stress indicates colour: I wanted the blue one, not the green one.',
          note: 'Stressing "BLUE" contrasts the colour attribute.',
        },
        {
          speaker: 'Coach',
          text: 'Sentence 2: "I wanted the blue ==FOLDER==." Here the stress indicates item: I wanted the folder, not the notebook.',
          note: 'Stressing "FOLDER" contrasts the noun item.',
        },
        {
          speaker: 'Coach',
          text: 'Now notice word-final consonants: distinguish "past" from "passed", and ensure final /t/ and /d/ sounds are distinct in phrases like "helped the patient" versus "help the patient".',
          note: 'Consonant cluster precision supports grammatical accuracy in speaking.',
        },
      ],
    },
  },

  'slot-s-pacing-chunks': {
    id: 'slot-s-pacing-chunks',
    unitId: 's-pronunciation-stress-pace',
    status: 'reserved',
    src: 'audio/ielts/study/s-pacing-chunks.mp3',
    title: 'Pronunciation: Breath Groups, Meaning Chunks, and Cadence',
    durationLabel: '0:45',
    voices: 'Two candidate comparison recordings',
    teachingFocus:
      'Compare Version A (unbroken rushing that runs out of breath) with Version B (measured grammatical chunks with falling completion pitch).',
    script: {
      turns: [
        {
          speaker: 'Narrator',
          text: 'First, listen to Version A, delivered with unnatural speed and blurred pauses.',
        },
        {
          speaker: 'Candidate A',
          text: 'Inmyopinioneducationisessentialforlocaleconomicgrowthespeciallyinyouthunemploymentbecausepeopleneedskills.',
          note: 'Lacks breath boundaries; intelligibility suffers despite high speed.',
        },
        {
          speaker: 'Narrator',
          text: 'Now listen to Version B, structured into four clear phrasing chunks.',
        },
        {
          speaker: 'Candidate B',
          text: 'In my opinion / education is essential for local economic growth / especially in areas with youth unemployment // because young adults need adaptable workplace skills //',
          note: 'Single slashes indicate short phrasing breath; double slashes indicate terminal pitch fall.',
        },
      ],
    },
  },
}

export const ALL_MEDIA_SLOTS = Object.values(MEDIA_SLOTS)

export function getMediaSlot(slotId) {
  if (!slotId) return null
  return MEDIA_SLOTS[slotId] ?? null
}
