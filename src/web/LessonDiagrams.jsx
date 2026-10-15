import { useLanguage } from './Language'
import { useRef, useState } from 'react'
import { Segments, Modal } from './components'

const art = (name) => `${import.meta.env.BASE_URL}assets/course/word-${name}.svg`
function DiagramTitle({ title, ja }) {
  const { t, language } = useLanguage()
  return (
    <header className="aw-diagram-title">
      <span className="aw-eyebrow">{t("LOOK & UNDERSTAND")}</span>
      <h2>{t(title)}</h2>
      <p className="aw-jp" lang={language}>
        {t(ja)}
      </p>
    </header>
  )
}
function Family() {
  const { t, language } = useLanguage()
  const [relation, setRelation] = useState('half')
  return (
    <section className="aw-learning-diagram aw-family-diagram">
      <DiagramTitle
        title={t("Follow the family connection.")}
        ja={t("Who shares a birth parent in this invented family?")}
      />
      <div className="aw-family-branches">
        {[
          { parents: ['Rae', 'Kim'], child: 'Sam', active: true },
          { parents: ['Lee', t("an earlier partner")], child: 'Ava', active: relation === 'step' },
          { parents: ['Rae', 'Lee'], child: 'Noah', active: relation === 'half' },
        ].map((branch) => (
          <div
            key={branch.child}
            className={`aw-family-branch ${branch.active ? 'is-connected' : ''}`}
          >
            <span className="aw-caption">{t("Birth parents")}</span>
            <div className="aw-family-parents">
              {branch.parents.map((parent) => (
                <span key={parent}>{parent}</span>
              ))}
            </div>
            <div className="aw-family-link" />
            <span className="aw-family-child">{branch.child}</span>
          </div>
        ))}
      </div>
      <p className="aw-jp" lang={language}> {t("Rae and Lee later married. Ava is Lee’s daughter from an earlier relationship.")} </p>
      <Segments
        items={[
          { value: 'half', label: 'Half-brother' },
          { value: 'step', label: 'Stepsister' },
        ]}
        active={relation}
        onChange={setRelation}
        label={t("Compare family relationships")}
      />
      <div className="aw-diagram-answer">
        <p lang="en">
          {relation === 'half' ? 'Noah is Sam’s half-brother.' : 'Ava is Sam’s stepsister.'}
        </p>
        <span className="aw-jp" lang={language}>
          {relation === 'half'
            ? t("Sam and Noah share one birth parent, Rae.")
            : t("Ava is the daughter of Sam’s stepparent, Lee.")}
        </span>
      </div>
    </section>
  )
}
function Calendar() {
  const { t, language } = useLanguage()
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("One event. Four different details.")}
        ja={t("Notice the date, starting time, duration, and frequency separately.")}
      />
      <div className="aw-date-diagram">
        <div className="aw-calendar-example">
          <header>APRIL 2027</header>
          <div className="aw-calendar-days">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <span className="aw-calendar-weekday" key={`day${index}`}>
                {day}
              </span>
            ))}
            {Array.from({ length: 33 }, (_, index) => (
              <span key={index} className={index === 9 ? 'is-event' : ''}>
                {index >= 3 ? index - 2 : ''}
              </span>
            ))}
          </div>
        </div>
        <div className="aw-event-details">
          <span className="aw-caption">ART CLASS</span>
          <h3 lang="en">
            April seventh,
            <br />
            twenty twenty-seven.
          </h3>
          <div className="aw-clock-with-copy">
            <svg viewBox="0 0 160 160" width="92" height="92" aria-label="Clock showing 6:15 p.m.">
              <circle cx="80" cy="80" r="69" fill="#F2E8C9" stroke="#253C38" strokeWidth="2" />
              <path
                d="M80 80L76 113M80 80h48"
                fill="none"
                stroke="#253C38"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="80" cy="80" r="4" fill="#A64732" />
              <path d="M80 17v8M80 136v8M17 80h8M136 80h8" stroke="#253C38" strokeWidth="2" />
            </svg>
            <div>
              <strong>6:15 p.m.</strong>
              <span className="aw-jp" lang={language}>
                Starts at 6:15 p.m.
              </span>
            </div>
          </div>
          <dl>
            <div>
              <dt>{t("Duration")}</dt>
              <dd>
                90 minutes <span className="aw-jp">an hour and a half</span>
              </dd>
            </div>
            <div>
              <dt>{t("Frequency")}</dt>
              <dd>
                Twice a week <span className="aw-jp">two times each week</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
function Sequence() {
  const { t, language } = useLanguage()
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("See the order. Say the action.")}
        ja={t("Prepare the vegetables, mix the dressing, then combine them.")}
      />
      <div className="aw-action-sequence">
        {[
          ['knife', 'Chop the vegetables.', t("Prepare the vegetables")],
          ['whisk', 'Whisk the dressing.', t("Mix the dressing")],
          ['plate', 'Add the dressing.', t("Combine them")],
        ].map(([picture, en, ja], index) => (
          <article key={picture}>
            <span className="aw-unit-number">{String(index + 1).padStart(2, '0')}</span>
            <img src={art(picture)} alt={en} width="360" height="220" />
            <h3 lang="en">{en}</h3>
            <p className="aw-jp" lang={language}>
              {t(ja)}
            </p>
            {index < 2 && <span className="aw-sequence-then">{t("Then")}</span>}
          </article>
        ))}
      </div>
    </section>
  )
}
function Presentation() {
  const { t, language } = useLanguage()
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("Give the listener a route.")}
        ja={t("Move from a current problem to a proposal that is still open for discussion.")}
      />
      <ol className="aw-talk-outline">
        {[
          [t("Purpose"), 'Organize shared documents.', t("Introduce the purpose")],
          [t("Problem"), 'People open older versions.', t("Explain the current problem")],
          [
            t("Proposal"),
            'Drafts / Approved + an owner.',
            t("Separate folders and assign responsibility"),
          ],
          [t("Trial"), 'One project. One week.', t("Define a small trial")],
          [t("Feedback"), 'What still causes confusion?', t("Invite a response")],
        ].map(([label, en, ja]) => (
          <li key={label}>
            <span>{label}</span>
            <h3 lang="en">{en}</h3>
            <p className="aw-jp" lang={language}>
              {t(ja)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
function Home() {
  const { t, language } = useLanguage()
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("Put the words in a home.")}
        ja={t("This example is a one-bedroom apartment.")}
      />
      <div className="aw-home-plan">
        {[
          ['bed', 'Bedroom', t("A place to sleep")],
          ['kitchen', 'Kitchen', t("A place to cook")],
          ['sofa', 'Living room', t("A place to sit together")],
        ].map(([picture, en, ja]) => (
          <article key={picture}>
            <img src={art(picture)} alt={en} width="360" height="220" />
            <h3>{en}</h3>
            <p className="aw-jp" lang={language}>
              {t(ja)}
            </p>
          </article>
        ))}
      </div>
      <div className="aw-diagram-answer">
        <p lang="en">It has a balcony, but no garage.</p>
      </div>
    </section>
  )
}
function Directions() {
  const { t, language } = useLanguage()
  const [destination, setDestination] = useState('clinic')
  const [expanded, setExpanded] = useState(false)
  const enlargeButton = useRef(null)
  const closeMap = () => {
    setExpanded(false)
    requestAnimationFrame(() => enlargeButton.current?.focus({ preventScroll: true }))
  }
  const routes = { clinic: 'M300 265V125', cafe: 'M300 265V170H400', station: 'M300 265V70H130' }
  const answers = {
    clinic: ['Go straight. Go past Pine.', t("Continue along Main and pass Pine.")],
    cafe: ['Turn right at Pine. Half a block.', t("Turn onto Pine and continue half a block.")],
    station: ['Two blocks to Cedar. Then turn left.', t("Continue to Cedar, then turn left.")],
  }
  const map = (<svg
          viewBox="0 0 560 320"
          role="img"
          aria-label={`Map of Main, Oak, Pine and Cedar Streets; route to the ${destination}`}
        >
          <rect width="560" height="320" rx="14" fill="#E7EEE5" />
          <g fill="none" stroke="#F8F5EF" strokeWidth="28">
            <path d="M300 16v290M28 70h504M28 170h504M28 270h504" />
          </g>
          <g fill="#253C38" fontFamily="Hanken Grotesk,Arial,sans-serif" fontSize="14">
            <text x="27" y="99">
              Cedar Street
            </text>
            <text x="27" y="199">
              Pine Street
            </text>
            <text x="27" y="299">
              Oak Street
            </text>
            <text x="317" y="246">
              Main Street
            </text>
            <text x="503" y="40">
              N
            </text>
          </g>
          <path d="M509 63V47m-5 6 5-7 5 7" stroke="#253C38" strokeWidth="2" fill="none" />
          <g fill="#F8F5EF" stroke="#253C38" strokeWidth="1.5">
            <rect x="174" y="111" width="105" height="37" rx="6" />
            <rect x="364" y="117" width="94" height="37" rx="6" />
            <rect x="70" y="18" width="121" height="34" rx="6" />
          </g>
          <g fill="#253C38" fontFamily="Hanken Grotesk,Arial,sans-serif" fontSize="17">
            <text x="194" y="136">
              Clinic
            </text>
            <text x="383" y="143">
              Cafe
            </text>
            <text x="86" y="41">
              Bus station
            </text>
          </g>
          <path
            d={routes[destination]}
            fill="none"
            stroke="#A64732"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="300" cy="265" r="9" fill="#253C38" stroke="#F8F5EF" strokeWidth="3" />
          <g fontFamily="Hanken Grotesk,Arial,sans-serif" fontSize="16" fill="#253C38">
            <text x="324" y="294"> {t("You are here")} </text>
          </g>
        </svg>)
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("Start here. Follow the route.")}
        ja={t("You are at Main and Oak, facing north. This is the chapter’s invented map.")}
      />
      <div className="aw-direction-map">
        {map}

      </div>
      <button ref={enlargeButton} className="ip-text-button" type="button" onClick={() => setExpanded(true)}>{t('Enlarge map')}</button>
      {expanded && <Modal title={t('Follow the route')} onClose={closeMap}>
        <p className="ip-context">{t('Scroll sideways to explore the map. Start at Main and Oak, facing north.')}</p>
        <div className="aw-map-detail" role="region" tabIndex={0} aria-label={t('Enlarged map')}>{map}</div>
        <p className="aw-map-route" lang="en">{answers[destination][0]}</p>
      </Modal>}
      <Segments
        items={[
          { value: 'clinic', label: 'Clinic' },
          { value: 'cafe', label: 'Cafe' },
          { value: 'station', label: 'Bus station' },
        ]}
        active={destination}
        onChange={setDestination}
        label={t("Choose a destination")}
      />
      <div className="aw-diagram-answer">
        <p lang="en">{answers[destination][0]}</p>
        <span className="aw-jp" lang={language}>
          {answers[destination][1]}
        </span>
      </div>
    </section>
  )
}
function Body() {
  const { t, language } = useLanguage()
  const [part, setPart] = useState('shoulder')
  const parts = {
    shoulder: ['shoulder', 'shoulder', 101, 54],
    arm: ['arm', 'arm', 112, 86],
    knee: ['knee', 'knee', 91, 117],
    ankle: ['ankle', 'ankle', 93, 141],
  }
  return (
    <section className="aw-learning-diagram">
      <DiagramTitle
        title={t("Name the place you mean.")}
        ja={t("Say where you feel discomfort. These words identify a location, not a diagnosis.")}
      />
      <div className="aw-body-diagram">
        <svg
          viewBox="0 0 360 220"
          width="360"
          height="220"
          role="img"
          aria-label={`Person with the ${part} highlighted`}
        >
          <rect x="10" y="16" width="340" height="188" rx="70" fill="var(--note)" />
          <g
            transform="translate(83 20) scale(1.25)"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="80" cy="25" r="17" fill="#D79773" />
            <path
              d="M59 46h41l26 48-15 7-13-24v72H85l-5-43-5 43H62V77L48 100l-13-7Z"
              fill="var(--surface-strong)"
            />
            <path d="M53 64h56M61 103h37" fill="none" />
            <circle
              cx={parts[part][2]}
              cy={parts[part][3]}
              r="8"
              fill="var(--accent-soft)"
              stroke="var(--brand)"
            />
          </g>
        </svg>
        <div>
          <Segments
            items={Object.entries(parts).map(([key, [en]]) => ({ value: key, label: en }))}
            active={part}
            onChange={setPart}
            label={t("Body part")}
          />
          <div className="aw-diagram-answer">
            <p lang="en">My {parts[part][0]} hurts.</p>
            <span className="aw-jp" lang={language}>
              {t('Point to your {part}.', { part: t(parts[part][1]) })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
export function LessonDiagram({ type }) {
  const Component = {
    family: Family,
    calendar: Calendar,
    sequence: Sequence,
    presentation: Presentation,
    home: Home,
    directions: Directions,
    body: Body,
  }[type]
  return Component ? <Component /> : null
}
