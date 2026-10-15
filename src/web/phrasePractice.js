export const familiarityOptions = [
  { value: 'needs-work', label: 'Needs work' },
  { value: 'practicing', label: 'Practicing' },
  { value: 'familiar', label: 'Familiar' },
]
const ratings = new Set(familiarityOptions.map((item) => item.value))
const phraseId = /^ch(?:0[1-9]|[1-8]\d|9[0-6])-(?:p|v|line|b)\d+$/
const cleanIds = (input, allowed) =>
  Array.isArray(input)
    ? [...new Set(input.filter((id) => typeof id === 'string' && allowed(id)))].slice(0, 500)
    : []

export function sanitizePracticeSets(input) {
  if (!input || typeof input !== 'object') return {}
  return Object.fromEntries(
    Object.entries(input)
      .filter(
        ([id, set]) => /^(?:0[1-9]|[1-8]\d|9[0-6])$/.test(id) && set && typeof set === 'object',
      )
      .map(([id, set]) => {
        const allowed = (value) => phraseId.test(value) && value.startsWith(`ch${id}-`)
        const queue = cleanIds(set.session?.ids, allowed)
        return [
          id,
          {
            ...(Array.isArray(set.selected) ? { selected: cleanIds(set.selected, allowed) } : {}),
            ratings: Object.fromEntries(
              Object.entries(set.ratings ?? {}).filter(
                ([key, value]) => allowed(key) && ratings.has(value),
              ),
            ),
            filter: ['all', ...ratings].includes(set.filter) ? set.filter : 'all',
            search: typeof set.search === 'string' ? set.search.slice(0, 100) : '',
            session: {
              ids: queue,
              index:
                Number.isInteger(set.session?.index) &&
                set.session.index >= 0 &&
                set.session.index < queue.length
                  ? set.session.index
                  : 0,
              active: set.session?.active === true && queue.length > 0,
              completed: set.session?.completed === true && queue.length > 0,
            },
          },
        ]
      }),
  )
}

export function getPracticeSet(stored, items, legacy, catalog = {}) {
  const ids = items.map((item) => item.id)
  const allowed = new Set(ids)
  const resolve = (id) => (catalog.aliases?.[id] ?? [id]).filter((value) => allowed.has(value))
  const migrate = (values) => [...new Set((values ?? []).flatMap(resolve))]
  // Preserve the old rehearsal position by identity when the course gains
  // additional examples. It appears as a resumable set in the new chooser.
  const previousSession =
    !stored && Number.isInteger(legacy?.index)
      ? { ids: legacy.ids, index: legacy.index, active: false }
      : stored?.session
  const queue = migrate(previousSession?.ids)
  const current = previousSession?.ids?.[previousSession.index]
  return {
    selected: stored?.selected ? migrate(stored.selected) : (catalog.starterIds ?? ids),
    ratings: Object.fromEntries(Object.entries(stored?.ratings ?? {}).flatMap(([id, rating]) =>
      resolve(id).map((target) => [target, stored?.ratings?.[target] ?? rating]))),
    filter: stored?.filter ?? 'all',
    search: stored?.search ?? '',
    session: {
      ids: queue,
      index: Math.max(0, queue.indexOf(resolve(current)[0])),
      active: Boolean(previousSession?.active && queue.length),
      completed: Boolean(previousSession?.completed && queue.length),
    },
  }
}

export function startPractice(set, items, orderedIds) {
  // Snapshot in lesson order. Later ratings and checklist edits do not change this round.
  const allowed = new Set(items.map((item) => item.id))
  const ids = orderedIds
    ? [...new Set(orderedIds)].filter((id) => allowed.has(id))
    : items.filter((item) => set.selected.includes(item.id)).map((item) => item.id)
  return { ...set, session: { ids, index: 0, active: ids.length > 0, completed: false } }
}

export function stepPractice(set, direction) {
  const count = set.session.ids.length
  if (!count) return set
  return {
    ...set,
    session: { ...set.session,
      index: Math.min(count - 1, Math.max(0, set.session.index + direction)),
      completed: direction > 0 && set.session.index === count - 1,
    },
  }
}

export function togglePracticePhrase(set, id) {
  return {
    ...set,
    selected: set.selected.includes(id)
      ? set.selected.filter((value) => value !== id)
      : [...set.selected, id],
  }
}

export function filterPracticePhrases(items, set) {
  const query = set.search.trim().toLowerCase().replaceAll('’', "'")
  return items.filter(
    (item) =>
      (set.filter === 'all' || set.ratings[item.id] === set.filter) &&
      `${item.en} ${item.context}`.toLowerCase().replaceAll('’', "'").includes(query),
  )
}
