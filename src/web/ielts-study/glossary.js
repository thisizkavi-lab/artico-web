/**
 * Artico IELTS Study Glossary (`artico-ielts-study-v1`)
 * Plain technical definitions in Artico Study English.
 * Rule: Maximum 25 words per definition.
 */

export const GLOSSARY = {
  // Official §1.7 Assessment terms
  task: {
    term: 'Task',
    definition: 'The work the question tells you to do.',
  },
  scope: {
    term: 'Scope',
    definition: 'The group, time, place, condition, and strength of a claim.',
  },
  evidence: {
    term: 'Evidence',
    definition: 'The text, audio, data, or response feature that supports a decision.',
  },
  paraphrase: {
    term: 'Paraphrase',
    definition: 'The same meaning expressed in different words or structures.',
  },
  gist: {
    term: 'Gist',
    definition: 'The main idea of a paragraph or passage.',
  },
  inference: {
    term: 'Inference',
    definition: 'A conclusion supported by information, even when the exact sentence is absent.',
  },
  criterion: {
    term: 'Criterion',
    definition: 'One area used to assess performance.',
  },
  coherence: {
    term: 'Coherence',
    definition: 'Clear organisation and progression of meaning.',
  },
  cohesion: {
    term: 'Cohesion',
    definition: 'Language and references that connect ideas.',
  },
  'lexical resource': {
    term: 'Lexical resource',
    definition: 'The range and control of vocabulary.',
  },
  collocation: {
    term: 'Collocation',
    definition: 'Words that commonly occur together.',
  },
  register: {
    term: 'Register',
    definition: 'Language suited to the audience, purpose, and situation.',
  },
  intelligibility: {
    term: 'Intelligibility',
    definition: 'How easily a listener can understand speech.',
  },
  baseline: {
    term: 'Baseline',
    definition: 'Evidence of current performance before a planned change.',
  },
  transfer: {
    term: 'Transfer',
    definition: 'Use of a learned skill with fresh material.',
  },
  diagnostic: {
    term: 'Diagnostic',
    definition: 'Work used to identify a specific weakness.',
  },
  distractor: {
    term: 'Distractor',
    definition: 'A plausible option or detail that does not answer the actual question.',
  },

  // Scoring & Framework Terms
  'raw mark': {
    term: 'Raw mark',
    definition: 'The count of correct points scored on Listening or Reading before conversion to a band score.',
  },
  band: {
    term: 'Band',
    definition: 'A scaled score from 0 to 9 that describes your measured language performance level.',
  },
  anchor: {
    term: 'Anchor',
    definition: 'A stable word or fact used to find the right part of a text or recording.',
  },
  target: {
    term: 'Target',
    definition: 'The exact information or word form required to complete a question correctly.',
  },

  // IELTS Criteria
  'task achievement': {
    term: 'Task achievement',
    definition: 'The Writing Task 1 criterion assessing whether you fulfilled every requirement and reported main trends accurately.',
  },
  'task response': {
    term: 'Task response',
    definition: 'The Writing Task 2 criterion assessing how fully and relevantly you addressed the question.',
  },
  'grammatical range and accuracy': {
    term: 'Grammatical range and accuracy',
    definition: 'The assessment criterion judging sentence variety, structural control, and error frequency.',
  },
  'fluency and coherence': {
    term: 'Fluency and coherence',
    definition: 'The speaking criterion assessing speech continuity, natural pace, and clear idea progression.',
  },
  pronunciation: {
    term: 'Pronunciation',
    definition: 'The speaking criterion assessing how clearly sounds, stress, and intonation communicate meaning.',
  },

  // Task & Method Terms
  chunking: {
    term: 'Chunking',
    definition: 'Grouping words into meaningful spoken or written phrasing units.',
  },
  'percentage point': {
    term: 'Percentage point',
    definition: 'The absolute difference between two percentages, distinct from a relative percentage change.',
  },
  overview: {
    term: 'Overview',
    definition: 'A summary of main trends, stages, or overall differences without unnecessary detail.',
  },
  'topic sentence': {
    term: 'Topic sentence',
    definition: 'A sentence that introduces the main idea and focus of a paragraph.',
  },
  qualifier: {
    term: 'Qualifier',
    definition: 'A word that limits the certainty, frequency, or scope of a statement.',
  },
  concession: {
    term: 'Concession',
    definition: 'Acknowledging a counterpoint or limitation before explaining your main argument.',
  },
  'comma splice': {
    term: 'Comma splice',
    definition: 'The error of joining two independent clauses with only a comma.',
  },
  'connected speech': {
    term: 'Connected speech',
    definition: 'The natural linking, reduction, and assimilation of words in continuous spoken English.',
  },
  shadowing: {
    term: 'Shadowing',
    definition: 'Speaking simultaneously with a recorded model to train rhythm and stress.',
  },
  'micro-listening': {
    term: 'Micro-listening',
    definition: 'Transcribing short audio segments word for word to detect missed weak forms.',
  },
  stress: {
    term: 'Stress',
    definition: 'Extra vocal emphasis placed on a specific syllable or key information word.',
  },
  rhythm: {
    term: 'Rhythm',
    definition: 'The patterned timing of stressed and unstressed syllables across spoken phrases.',
  },
  intonation: {
    term: 'Intonation',
    definition: 'The rise and fall of pitch in spoken sentences indicating meaning or completion.',
  },
  hedging: {
    term: 'Hedging',
    definition: 'Using cautious language to avoid making absolute or unsupported claims.',
  },
  nominalisation: {
    term: 'Nominalisation',
    definition: 'Turning verbs or adjectives into nouns, often used in academic writing.',
  },
  'run-on sentence': {
    term: 'Run-on sentence',
    definition: 'Two independent clauses joined without correct punctuation or a coordinating conjunction.',
  },
  'parallel structure': {
    term: 'Parallel structure',
    definition: 'Using identical grammatical forms for coordinated items in a series.',
  },
  'discourse marker': {
    term: 'Discourse marker',
    definition: 'A word or phrase that signals how ideas connect or how a talk is structured.',
  },
  specimen: {
    term: 'Specimen',
    definition: 'A concrete example text, dialogue, or essay used for study and analysis.',
  },
  signposting: {
    term: 'Signposting',
    definition: 'Spoken or written phrases that guide the listener or reader through your points.',
  },
  overclaiming: {
    term: 'Overclaiming',
    definition: 'Stating an argument or conclusion with more absolute certainty than the evidence supports.',
  },
  skimming: {
    term: 'Skimming',
    definition: 'Reading quickly to understand the main idea and structure of a text.',
  },
  scanning: {
    term: 'Scanning',
    definition: 'Searching a text quickly for a specific word, date, or factual anchor.',
  },
}

export function getGlossaryTerm(rawTerm) {
  if (!rawTerm || typeof rawTerm !== 'string') return null
  const key = rawTerm.toLowerCase().trim()
  return GLOSSARY[key] ?? null
}
