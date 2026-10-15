const numberOf = (item) => item.number ?? Number(item.runs.map((run) => run.text).join('').match(/^(\d+)[：:.]\s*/)?.[1])

// Match only explicitly numbered, one-to-one lists. Keep unstructured samples
// together rather than guessing which situation they answer.
export function pairScenarioResponses(prompts, answers) {
  const questions = prompts.filter((block) => block.type === 'list' && block.ordered)
  const samples = answers.filter((block) => block.type === 'list')
  if (questions.length !== 1 || samples.length !== 1) return null
  const question = questions[0], sample = samples[0]
  if (question.items.length !== sample.items.length ||
    !question.items.every((item, index) => numberOf(item) === numberOf(sample.items[index]))) return null
  return { block: sample, responses: sample.items.map((item) => item.runs.map((run, index) =>
    index === 0 && !item.number ? { ...run, text: run.text.replace(/^\d+[：:.]\s*/, '') } : run)) }
}
