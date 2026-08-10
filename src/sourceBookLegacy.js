import { sourceBookCorpus } from './sourceBookCorpus.js'
import { everydayAudioByChapter } from './everydayAudioCatalog.js'
import { sourceBookSupplements } from './sourceBookSupplements.js'

const normalize = (value) => String(value || '')
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ')

const compact = (value) => normalize(value).replace(/ /g, '')

function isSourceEnglish(value, number) {
  if (typeof value !== 'string' || !/[A-Za-z]{2}/.test(value)) return false
  const query = normalize(value)
  if (query.length < 2 || query.length > 190) return false
  const source = sourceBookCorpus[String(Number(number))] || ''
  const sourceCompact = compact(source)
  const queryCompact = compact(query)
  if (queryCompact && sourceCompact.includes(queryCompact)) return true

  // OCR sometimes interleaves two columns. A high token match keeps source
  // lines whose words are present while rejecting newly invented examples.
  const sourceWords = new Set(normalize(source).split(' '))
  const words = query.split(' ').filter(Boolean)
  if (words.length < 3) return false
  const score = words.filter((word) => sourceWords.has(word)).length / words.length
  return score >= 0.80
}

// Several early lesson files kept a row of source-book vocabulary in one
// slash-separated string (for example, "1st / 2nd / 3rd" or
// "What time does it start? / At 6pm.").  The printed book presents these as
// separate entries, so expand them before filtering/deduplicating.  This is a
// mechanical presentation fix only; every resulting item still has to occur
// in the chapter's OCR source text.
function splitSourceEntry(value, meaning) {
  if (typeof value !== 'string' || !value.includes('/')) return [{ value, meaning }]
  const values = value.split('/').map((item) => item.trim()).filter(Boolean)
  if (values.length < 2) return [{ value, meaning }]
  const meanings = typeof meaning === 'string' && meaning.includes('/')
    ? meaning.split('/').map((item) => item.trim()).filter(Boolean)
    : []
  return values.map((item, index) => ({
    value: item,
    meaning: meanings.length === values.length ? meanings[index] : meaning,
  }))
}

function addSourceEntry(value, meaning, metadata, number, out, seen) {
  splitSourceEntry(value, meaning).forEach(({ value: phrase, meaning: itemMeaning }) => {
    if (typeof phrase !== 'string' || !isSourceEnglish(phrase, number)) return
    const key = normalize(phrase)
    if (seen.has(key)) return
    seen.add(key)
    out.push({
      phrase,
      meaning: itemMeaning || '原書の表現です。',
      context: metadata.context || '原書の表現',
      register: metadata.register || 'neutral',
    })
  })
}

function collectEnglishItems(value, number, out, seen) {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) {
    value.forEach((item) => collectEnglishItems(item, number, out, seen))
    return
  }
  if (typeof value.phrase === 'string') {
    addSourceEntry(
      value.phrase,
      value.meaning || value.ja,
      { context: value.context || '原書の表現', register: value.register || 'neutral' },
      number,
      out,
      seen,
    )
  }
  if (typeof value.en === 'string') {
    addSourceEntry(
      value.en,
      value.ja,
      { context: '原書の会話', register: 'neutral' },
      number,
      out,
      seen,
    )
  }
  Object.entries(value).forEach(([key, child]) => {
    // Practice data is regenerated from the source phrases below. Skipping it
    // prevents older creative role-play lines from leaking into the source view.
    if (key === 'practice' || key === 'naturalSpeech' || key === 'natural' || key === 'recognition') return
    collectEnglishItems(child, number, out, seen)
  })
}

function phraseAudio(phrase, number) {
  const files = everydayAudioByChapter[String(Number(number))] || []
  const raw = compact(phrase)
  const middle = compact(String(phrase).replace(/\bto\b/gi, ' '))
  const slug = compact(String(phrase).replace(/\b(to|a|an|the)\b/gi, ' '))
  if (!slug) return undefined
  const aliases = {
    fivepast: 'fiveafter', quarterpast: 'quarterafter', tenpast: 'tenafter',
    twentypast: 'twentyafter', twentyfivepast: 'twentyfiveafter',
    whitecoffee: 'coffeewithmilk', skimmedmilk: 'skimmilk', soyamilk: 'soymilk',
    cafetiere: 'frenchpress', measuringjug: 'measuringcup', scales: 'scale',
    appetizer: 'starter', starter: 'appetizer', entree: 'maincourse', maincourse: 'entree',
    check: 'bill', bill: 'check', dessert: 'dessert', pudding: 'dessert',
    casseroledish: 'dutchoven', splitthebill: 'splitthecheck',
    booktable: 'bookatable',
    takeaway: 'takeout', takeawaymeals: 'takeoutmeals',
    flyingakite: 'flyingakite', playingfootball: 'playingsoccer', skipping: 'jumpingrope',
    funfair: 'goingfair', playground: 'goingplayground', horseriding: 'horsebackriding',
    theatre: 'theater', cinema: 'movietheater', hiphop: 'hiphop',
    personaltrainer: 'personaltrainer', workout: 'workout',
    citycentre: 'citycenter', coffeeshop: 'coffeeshop', gardencentre: 'gardencenter',
    petrolstation: 'gasstation', shoppingcentre: 'mall', cashmachine: 'atm',
    banknotes: 'bills', contactlesspayment: 'contactless',
    football: 'soccer', constructionworker: 'constructionworker', togoonmaternityleave: 'maternityleave',
    physicaleducation: 'pe', paymoneyinto: 'depositmoney',
    towithdrawmoney: 'withdrawmoney', totransfermoney: 'transfermoney',
    boxofeggs: 'cartonofeggs', kiloofpotatoes: 'poundofpotatoes',
    punnetofstrawberries: 'punnetofstrawberries',
    singleticket: 'onewayticket', returnticket: 'roundtripticket', railcard: 'railpass',
    luggagestorage: 'luggagestore', ticketbarrier: 'turnstile',
    drivinglicence: 'driverslicense', aeroplane: 'airplane', carpark: 'parkinglot',
    lorry: 'truck', taxirank: 'taxistand',
    campsite: 'campground', campervan: 'camper', removalvan: 'movingvan', traveladaptor: 'traveladapter',
    bookpitch: 'bookcampsite',
    holiday: 'vacation', goonholiday: 'goonvacation', hirecar: 'rentacar',
    touristmap: 'tourismmap', touristoffice: 'tourismoffice', waterskiing: 'waterskiing',
    pedalo: 'paddleboat', spade: 'shovel', deckchair: 'beachchair',
    windscreen: 'windshield', bonnet: 'hood', boot: 'trunk', tyre: 'tire',
    overheadlocker: 'overheadbin',
    paintadoor: 'paintadoor', grouttiles: 'grouttiles', stripthewalls: 'stripthewalls',
    fillacrack: 'fillacrack', rewirethehouse: 'rewirethehouse', fixafence: 'fixafence',
    putupshelves: 'putupshelves', fitacarpet: 'fitacarpet', makecurtains: 'makecurtains',
    buildanextension: 'buildanextension',
    clockin: 'clockin', clockout: 'clockout',
    dothewashingup: 'washdishes', cleanthebath: 'cleanthebathtub', puttherubbishout: 'putthetrashout',
    emptythedishwasher: 'emptydishwasher', makethebed: 'makethebed',
  }
  const targets = [...new Set([slug, middle, raw, aliases[slug], aliases[middle], aliases[raw]])].filter(Boolean)
  const matches = files.map((file) => {
    const stem = compact(file
      .replace(/^ee_\d+_\d+(?:_\d+)?_/, '')
      .replace(/\.mp3$/i, '')
      .replace(/_?us(?:f\d+[-]?\d*)?$/i, ''))
    if (!stem || stem === 'us' || stem.length < 3) return null
    const target = targets.find((item) => stem === item) || targets.find((item) => stem.includes(item) || item.includes(stem))
    if (!target) return null
    const exact = stem === target ? 100000 : 0
    const containment = Math.min(stem.length, target.length)
    return { file, score: exact + containment }
  }).filter(Boolean).sort((a, b) => b.score - a.score)
  return matches[0]?.file
}

function audioSectionNumber(file, chapter) {
  const match = String(file || '').match(new RegExp(`^ee_${Number(chapter)}_(\\d+)_`))
  return match ? Number(match[1]) : null
}

function refreshSectionAudio(section, number) {
  const chapterAudio = everydayAudioByChapter[String(Number(number))] || []
  const inferredNumbers = [...new Set((section.phrases || []).map((item) => audioSectionNumber(item.audio, number)).filter(Boolean))]
  if (!inferredNumbers.length) return
  const files = chapterAudio.filter((file) => inferredNumbers.some((sectionNumber) => file.startsWith(`ee_${Number(number)}_${sectionNumber}_`)))
  if (files.length) section.audioFiles = files
}

// For these printed vocabulary panels, the supplement arrays are complete
// source-book lists.  Use them both to remove legacy extras and to restore the
// exact left-to-right order after any missing labels are merged in.
const strictSourceSections = {
  11: ['dates', 'time', 'weather'],
  14: ['family', 'inlaws', 'relationships', 'lifeEvents'],
  23: ['vocabulary'],
  24: ['vocabulary'],
  26: ['outdoor', 'games', 'creative', 'entertainment'],
  31: ['vocabulary'],
  34: ['city', 'types', 'money'],
  35: ['units'],
  36: ['vocabulary'],
  37: ['vocabulary'],
  38: ['vocabulary'],
  41: ['vocabulary'],
  43: ['vocabulary'],
  45: ['work'],
  46: ['subjects'],
  47: ['vocabulary'],
  52: ['vocabulary'],
  56: ['homes', 'rooms', 'improvements', 'vocabulary'],
  57: ['vocabulary'],
  58: ['vocabulary'],
  60: ['vocabulary'],
  62: ['vocabulary'],
  63: ['vocabulary'],
  64: ['vocabulary'],
  65: ['transport', 'verbs', 'essentials'],
  67: ['vocabulary'],
  68: ['vocabulary'],
  69: ['parts'],
  71: ['parts'],
  72: ['accommodation', 'essentials', 'verbs', 'activities', 'sightseeing'],
  73: ['types'],
  74: ['vocabulary'],
}

function childSections(lesson) {
  const learn = lesson.learn || {}
  const sections = []
  const droppedKeys = {
    // These legacy lesson files kept an extra teaching-only vocabulary block;
    // the printed source chapters do not contain a corresponding panel.
    11: ['frequency'],
    45: ['vocabulary'],
    46: ['vocabulary'],
    65: ['vocabulary'],
    73: ['terms', 'vocabulary'],
  }[Number(lesson.number)] || []
  const candidates = Object.entries(learn).filter(([key, value]) => value && typeof value === 'object' && !Array.isArray(value) && !['why', 'relationship', 'intro', 'functions'].includes(key) && !droppedKeys.includes(key))
  candidates.forEach(([key, value], index) => {
    const phrases = []
    collectEnglishItems(value, lesson.number, phrases, new Set())
    const chapterSupplements = sourceBookSupplements[String(Number(lesson.number))] || sourceBookSupplements[Number(lesson.number)] || {}
    const strictKeys = strictSourceSections[Number(lesson.number)] || []
    if (strictKeys.includes(key) && chapterSupplements[key]?.length) {
      const sourceOrder = chapterSupplements[key].flatMap((item) => splitSourceEntry(item.phrase, item.meaning).map(({ value: phrase }) => normalize(phrase)))
      const allowed = new Set(sourceOrder)
      for (let index = phrases.length - 1; index >= 0; index -= 1) {
        if (!allowed.has(normalize(phrases[index].phrase))) phrases.splice(index, 1)
      }
      const rank = new Map(sourceOrder.map((phrase, index) => [phrase, index]))
      phrases.sort((a, b) => (rank.get(normalize(a.phrase)) ?? sourceOrder.length) - (rank.get(normalize(b.phrase)) ?? sourceOrder.length))
    }
    // Chapter 72 prints holiday essentials as its own vocabulary block.
    // Older lesson data kept those words inside the accommodation block as
    // well, so remove that duplicated presentation before adding the exact
    // source-book essentials section below.
    if (Number(lesson.number) === 72 && key === 'accommodation') {
      const holidayEssentials = new Set([
        'passport', 'tickets', 'boarding pass', 'currency', 'travel adaptor',
        'charger', 'phrasebook', 'sunscreen',
      ])
      for (let index = phrases.length - 1; index >= 0; index -= 1) {
        if (holidayEssentials.has(normalize(phrases[index].phrase))) phrases.splice(index, 1)
      }
    }
    // The printed 45.3 list contains the action "to go on maternity leave";
    // it does not contain a separate noun-only "maternity leave" entry.
    if (Number(lesson.number) === 45 && key === 'work') {
      for (let index = phrases.length - 1; index >= 0; index -= 1) {
        if (normalize(phrases[index].phrase) === 'maternity leave') phrases.splice(index, 1)
      }
    }
    if (!phrases.length && !chapterSupplements[key]?.length) return
    phrases.forEach((item) => {
      const itemAudio = phraseAudio(item.phrase, lesson.number)
      if (itemAudio) item.audio = itemAudio
    })
    const chapterAudio = everydayAudioByChapter[String(Number(lesson.number))] || []
    const inferredNumbers = [...new Set(phrases.map((item) => audioSectionNumber(item.audio, lesson.number)).filter(Boolean))]
    const sectionNumbers = inferredNumbers.length ? inferredNumbers : [index + 1]
    const audioFiles = chapterAudio.filter((file) => sectionNumbers.some((sectionNumber) => file.startsWith(`ee_${Number(lesson.number)}_${sectionNumber}_`)))
    sections.push({
      id: `source-${lesson.number}-${key}`,
      sourceKey: key,
      title: value.title || key,
      enTitle: value.enTitle || key,
      intro: value.intro || '原書の英文を、意味とともに確認します。',
      phrases,
      recognition: [],
      audioFiles: audioFiles.length ? audioFiles : (chapterAudio[0] ? [chapterAudio[0]] : []),
    })
  })
  return sections
}

function reorderSections(sections, number) {
  const preferred = {
    14: ['family', 'inlaws', 'relationships', 'lifeEvents', 'growingUp'],
    22: ['pickup', 'delivery', 'vocabulary'],
    26: ['outdoor', 'games', 'creative', 'entertainment', 'musicGenres'],
    31: ['team', 'centre', 'vocabulary'],
    34: ['city', 'types', 'money'],
    43: ['bank', 'vocabulary', 'currency', 'payments'],
    72: ['accommodation', 'essentials', 'verbs', 'activities', 'sightseeing'],
    74: ['checkin', 'requests', 'problems', 'vocabulary', 'breakfast', 'checkout'],
  }[Number(number)]
  if (!preferred) return sections
  const rank = new Map(preferred.map((key, index) => [key, index]))
  return [...sections].sort((a, b) => {
    const aRank = rank.has(a.sourceKey) ? rank.get(a.sourceKey) : preferred.length
    const bRank = rank.has(b.sourceKey) ? rank.get(b.sourceKey) : preferred.length
    return aRank - bRank
  })
}

function mergeSourceSupplements(sections, number) {
  const supplements = sourceBookSupplements[String(Number(number))] || sourceBookSupplements[Number(number)]
  if (!supplements) return sections
  Object.entries(supplements).forEach(([sectionKey, additions]) => {
    let section = sections.find((item) => item.sourceKey === sectionKey)
    if (!section) {
      const chapterAudio = everydayAudioByChapter[String(Number(number))] || []
      section = {
        id: `source-${number}-${sectionKey}`,
        sourceKey: sectionKey,
        title: '原書の語彙',
        enTitle: sectionKey,
        intro: '原書に掲載された語彙を、意味と音声とともに確認します。',
        phrases: [],
        recognition: [],
        audioFiles: chapterAudio[0] ? [chapterAudio[0]] : [],
      }
      sections.push(section)
    }
    const seen = new Set(section.phrases.map((item) => normalize(item.phrase)))
    additions.forEach((item) => {
      splitSourceEntry(item.phrase, item.meaning).forEach(({ value: phrase, meaning }) => {
        // These entries are hand-checked against the printed vocabulary list
        // above.  Do not run the OCR heuristic here: OCR can glue words such
        // as "failan exam/a test" together and would otherwise drop a real
        // source item.
        const key = normalize(phrase)
        if (seen.has(key)) return
        seen.add(key)
        const sourceItem = {
          phrase,
          meaning: meaning || '原書の語彙です。',
          context: item.context || '原書の語彙',
          register: item.register || 'neutral',
        }
        const itemAudio = item.audio || phraseAudio(phrase, number)
        if (itemAudio) sourceItem.audio = itemAudio
        section.phrases.push(sourceItem)
      })
    })
    if (strictSourceSections[Number(number)]?.includes(sectionKey)) {
      const sourceOrder = additions.flatMap((item) => splitSourceEntry(item.phrase, item.meaning).map(({ value: phrase }) => normalize(phrase)))
      const rank = new Map(sourceOrder.map((phrase, index) => [phrase, index]))
      section.phrases.sort((a, b) => (rank.get(normalize(a.phrase)) ?? sourceOrder.length) - (rank.get(normalize(b.phrase)) ?? sourceOrder.length))
    }
    refreshSectionAudio(section, number)
  })
  return sections
}

export function makeSourceBookLesson(lesson) {
  if (!lesson || lesson.kind === 'source-book') return lesson
  const sections = reorderSections(mergeSourceSupplements(childSections(lesson), lesson.number), lesson.number)
  // Greetings keeps two small source panels beside the main phrases: the
  // printed "more phrases" / recognition lists.  The legacy section builder
  // only flattened `phrases`, so restore those entries here before the
  // Chapter 1 interactive reader consumes the source-book lesson.  Keeping
  // them in the normalized lesson prevents a visual redesign from silently
  // dropping source material (and preserves each Japanese explanation).
  if (Number(lesson.number) === 1) {
    sections.forEach((section) => {
      const sourceSection = lesson.learn?.[section.sourceKey]
      if (Array.isArray(sourceSection?.recognition)) {
        section.recognition = sourceSection.recognition.map((item) => ({ ...item }))
      }
    })
  }
  const intro = lesson.learn?.intro || lesson.learn?.why || []
  const functions = lesson.learn?.functions || []
  const allPhrases = sections.flatMap((item) => item.phrases)
  const isGreetingsChapter = Number(lesson.number) === 1
  const sourceDialogues = isGreetingsChapter
    ? (lesson.learn?.exchanges?.patterns || [])
      .map((pattern) => ({
        id: pattern.id,
        label: pattern.label,
        title: pattern.title,
        lines: (pattern.lines || [])
          .filter((line) => isSourceEnglish(line.en, lesson.number))
          .map((line) => ({ speaker: line.speaker, en: line.en, ja: line.ja })),
      }))
      .filter((pattern) => pattern.lines.length > 1)
    : []
  return {
    ...lesson,
    kind: 'source-book',
    learn: {
      intro,
      background: isGreetingsChapter
        ? [...(lesson.learn?.why || []), ...(lesson.learn?.relationship || [])]
        : intro,
      functions,
      sections,
      dialogues: sourceDialogues,
      naturalSpeech: isGreetingsChapter ? (lesson.learn?.naturalSpeech || []) : [],
      tip: lesson.learn?.tip || '原書の英文と語彙を、原書の順序に沿って確認します。',
    },
    practice: {
      title: `${lesson.enTitle || lesson.title} · 原書フレーズ練習`,
      instructions: '原書にある英文を聞き、意味を確認して声に出します。',
      corePhrases: allPhrases.map((item) => ({ ...item, rate: item.phrase.length > 70 ? 0.78 : 0.86 })),
      dialogues: sourceDialogues,
      natural: [],
    },
  }
}
