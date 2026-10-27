// Artico's curriculum icon system. A single lightweight, inline SVG family.
// All icons are decorative: nearby text always supplies the accessible name.
const iconPaths = {
  smile: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8 10h.01M16 10h.01M7.5 15c2.8 4 6.2 4 9 0',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM16.5 7.5l-3 6-6 3 3-6 6-3Z',
  book: 'M12 7C9 5 6 4 3 5v14c3-1 6 0 9 2 3-2 6-3 9-2V5c-3-1-6 0-9 2ZM12 7v14',
  messages: 'M21 11.5a8 8 0 0 1-8 8H7l-4 2v-6a8 8 0 0 1 6-11.8M12 2.5h3a7 7 0 0 1 7 7v1l-3 2',
  message: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 2v-6a8.5 8.5 0 1 1 18-4.5Z',
  greeting: 'M4 21v-6a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v6M10.5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 4l2-2M19 8h3M18 12l2 2',
  users: 'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-2a4 4 0 0 0-3-3.87M16 2.13a4 4 0 0 1 0 7.75',
  user: 'M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  badge: 'M4 4h16v16H4zM8 9a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM6.5 16a4 4 0 0 1 7 0M15 9h3M15 13h3',
  ellipsis: 'M4 6h16v12H8l-4 3V6ZM8 12h.01M12 12h.01M16 12h.01',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2.5-2.5 4M12 17h.01',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  scales: 'M12 3v18M5 7h14M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7ZM8 21h8',
  calendar: 'M3 6h18v15H3zM7 3v6M17 3v6M3 11h18M7 15h.01M12 15h.01M17 15h.01',
  calendarCheck: 'M3 6h18v15H3zM7 3v6M17 3v6M3 11h18m-12 5 2 2 4-4',
  lightbulb: 'M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.8c1 .7 1.5 1.7 1.5 3.2h5c0-1.5.5-2.5 1.5-3.2A7 7 0 0 0 12 2Z',
  thumbsUp: 'M7 10v11H3V10h4ZM7 10l4-8c2 0 2 2 1 5h6a3 3 0 0 1 3 3l-2 8a3 3 0 0 1-3 3H7',
  gift: 'M3 10h18v11H3zM2 7h20v4H2zM12 7v14M12 7C3 7 5 1 9 2c2 1 3 5 3 5ZM12 7c9 0 7-6 3-5-2 1-3 5-3 5Z',
  apology: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8 10h.01M16 10h.01M8 17q4-3 8 0',
  door: 'M5 3h14v18H5zM9 3v18M15 12h.01M19 21h3',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2',
  sunCloud: 'M12 2v2M4.9 4.9l1.5 1.5M2 12h2M19 4.9l-1.5 1.5M16 10a5 5 0 1 0-9.6 2M5 20h14a3 3 0 0 0 0-6h-1a6 6 0 0 0-11-2 4 4 0 0 0-2 8Z',
  cloudSun: 'M12 3v2M4.9 5l1.4 1.4M3 12h2M19 5l-1.4 1.4M16 12a5 5 0 0 0-9-3M4 19h15a3 3 0 0 0 0-6h-1a6 6 0 0 0-11-2 4 4 0 0 0-3 8Z',
  family: 'M2 21v-3a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v3M8.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17 14a5 5 0 0 1 5 5v2h-5',
  milestone: 'M5 22V3m0 1h14l-3 5 3 5H5M2 22h6',
  party: 'M4 21 11 3l10 10L4 21ZM12 5l7 7M17 3h.01M20 6h.01M15 19h.01M21 19h.01',
  handshake: 'M2 9l5-5 5 2 2-1 3 2 5-1v8l-5 5-4-1-3 2-5-4-3-3V9ZM8 10l4 4 3-2M16 15l2 2M12 17l2 2',
  utensils: 'M4 2v7a3 3 0 0 0 6 0V2M7 2v20M18 22V2c-4 3-5 8-5 12h5',
  coffee: 'M3 9h14v5a7 7 0 0 1-14 0V9ZM17 10h2a3 3 0 0 1 0 6h-2M2 22h17M7 2v3M12 2v3',
  bag: 'M4 8h16l-1 13H5L4 8ZM9 9V6a3 3 0 0 1 6 0v3',
  beer: 'M5 3h12l-1 18H7L5 3ZM17 7h3a3 3 0 0 1 0 6h-4M5.5 7h11M9 10v7M13 10v7',
  chef: 'M5 10a4 4 0 0 1-1-8 5 5 0 0 1 8 1 5 5 0 0 1 8 5 4 4 0 0 1-3 2v9H5v-9ZM5 22h12',
  cooking: 'M4 10h16v3a8 8 0 0 1-16 0v-3ZM2 10h20M7 6l2-3M12 7l2-4M17 7l2-3M8 22h8',
  film: 'M3 4h18v16H3zM8 4v16M16 4v16M3 9h5M16 9h5M3 15h5M16 15h5',
  theater: 'M4 3h16v12H4zM8 7q2 2 4 0M14 7q2 2 4 0M5 18l-3 3M19 18l3 3M3 16h18',
  music: 'M9 18V5l12-2v13M9 7l12-2M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  dumbbell: 'M2 10v4M5 7v10M8 9v6M16 9v6M19 7v10M22 10v4M8 12h8',
  ball: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 2v20M2 12h20M5 5q14 7 0 14M19 5q-14 7 0 14',
  trophy: 'M7 3h10v8a5 5 0 0 1-10 0V3ZM7 5H3v4a4 4 0 0 0 4 4M17 5h4v4a4 4 0 0 1-4 4M12 16v5M8 21h8',
  palette: 'M12 2a10 10 0 0 0 0 20h2a2 2 0 0 0 1-4c-2-1-1-3 1-3h3a3 3 0 0 0 3-3A10 10 0 0 0 12 2ZM7 9h.01M12 6h.01M17 9h.01M7 15h.01',
  storefront: 'M3 10l2-7h14l2 7v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0v-2ZM5 15v6h14v-6M10 21v-6h5v6',
  basket: 'M3 10h18l-2 11H5L3 10ZM7 10l5-8 5 8M8 14v4M12 14v4M16 14v4',
  leaf: 'M21 3c-10 0-17 4-17 12a6 6 0 0 0 6 6c8 0 12-7 11-18ZM5 19c4-6 8-9 13-12',
  hammer: 'M2 21l10-10M9 5l4-4 8 8-4 4-8-8ZM5 8l4 4',
  shirt: 'M8 3 4 5 2 11l5 2v8h10v-8l5-2-2-6-4-2a4 4 0 0 1-8 0Z',
  undo: 'M3 8v6h6M3 14a9 9 0 1 1 3 5',
  scissors: 'M4 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 6l14 13M7 18 21 5',
  package: 'M3 7 12 2l9 5v10l-9 5-9-5V7ZM3 7l9 5 9-5M12 12v10M7 5l9 5',
  wallet: 'M3 6h17v15H3zM3 6V4a2 2 0 0 1 2-2h13M14 11h8v6h-8a3 3 0 0 1 0-6ZM17 14h.01',
  library: 'M3 3h5v18H3zM10 3h5v18h-5zM17 5l4-1 2 16-4 1-2-16Z',
  briefcase: 'M3 7h18v14H3zM9 7V4h6v3M3 13h18M10 13v2h4v-2',
  school: 'M2 10 12 3l10 7-10 7-10-7ZM6 13v5c4 3 8 3 12 0v-5M22 10v8',
  graduation: 'M2 9l10-5 10 5-10 5L2 9ZM6 12v6c4 3 8 3 12 0v-6M22 9v8',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM17 17l5 5',
  file: 'M6 2h8l5 5v15H6zM14 2v6h5M9 12h7M9 16h7',
  interview: 'M3 21v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 10h4M18 14h4M18 18h4',
  presentation: 'M3 3h18v13H3zM12 16v5M8 21h8M7 12l4-4 3 2 3-4',
  video: 'M3 6h13v12H3zM16 10l5-3v10l-5-3',
  house: 'M2 11 12 3l10 8M5 10v11h14V10M9 21v-7h6v7',
  key: 'M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM11 11l11 11M17 17l2-2M19 19l2-2',
  truck: 'M2 6h12v12H2zM14 10h5l3 4v4h-8M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  broom: 'M5 21l7-7M12 14l8-8M16 10l4 4-8 8-4-4ZM4 22h6',
  wrench: 'M21 5a7 7 0 0 1-9 9L5 21l-3-3 7-7a7 7 0 0 1 9-9l-4 4 4 4 3-5Z',
  paw: 'M7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 13c-2 0-7 5-5 8 2 3 4-1 5-1s3 4 5 1c2-3-3-8-5-8Z',
  alert: 'M12 3 2 21h20L12 3ZM12 9v5M12 18h.01',
  tv: 'M3 6h18v14H3zM8 3l4 3 4-3M9 12h6M9 16h4',
  route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 13V9a5 5 0 0 1 5-5h4M9 19h8a4 4 0 0 0 0-8h-3',
  bus: 'M5 4h14v14H5zM5 11h14M8 18v3M16 18v3M8 15h.01M16 15h.01M8 4V2h8v2',
  train: 'M5 3h14v15H5zM5 11h14M8 15h.01M16 15h.01M7 22l3-4M17 22l-3-4',
  plane: 'M22 2 9 12l-5 0-2 3 9 3 3 4 2-1-1-8 7-11Z',
  bike: 'M6 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 15l5-9h5l2 9h-7l-5-9M8 6h3',
  car: 'M5 17h14l2-5-2-6H5l-2 6 2 5ZM5 17v3M19 17v3M3 12h18M7 15h.01M17 15h.01',
  suitcase: 'M3 7h18v14H3zM9 7V3h6v4M3 13h18M10 13v2h4v-2',
  bed: 'M3 4v17M3 17h18v4M6 10h7a3 3 0 0 1 3 3v4M3 13h18v4',
  landmark: 'M2 9l10-6 10 6H2ZM4 21h16M6 10v9M10 10v9M14 10v9M18 10v9M2 22h20',
  tent: 'M12 3 2 21h20L12 3ZM12 3v18M8 21l4-8 4 8',
  waves: 'M2 9q3-4 6 0t6 0t6 0M2 15q3-4 6 0t6 0t6 0M2 21q3-4 6 0t6 0t6 0',
  mapPin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  firstAid: 'M3 7h18v14H3zM9 7V4h6v3M12 11v7M8.5 14.5h7',
  pill: 'M5 19a5 5 0 0 1 0-7L12 5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7 0ZM9 8l7 7',
  stethoscope: 'M6 3v8a5 5 0 0 0 10 0V3M3 3h6M13 3h6M11 16a5 5 0 0 0 10 0v-2M21 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  activity: 'M2 12h5l3-7 4 14 3-7h5',
  hospital: 'M4 22V4h16v18M2 22h20M10 9h4M12 7v4M9 22v-6h6v6',
  tooth: 'M12 5c-4-4-10-3-9 4 1 6 3 13 6 13 2 0 1-7 3-7s1 7 3 7c3 0 5-7 6-13 1-7-5-8-9-4Z',
  brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-2 6 4 4 0 0 0 3 6 4 4 0 0 0 6 2V4ZM12 4a4 4 0 0 1 7 3 4 4 0 0 1 2 6 4 4 0 0 1-3 6 4 4 0 0 1-6 2M8 9l2 2M16 9l-2 2M8 16l2-1M16 16l-2-1',
  newspaper: 'M3 4h15v17H6a3 3 0 0 1-3-3V4ZM18 8h3v10a3 3 0 0 1-3 3M6 8h9M6 12h4M12 12h3M6 16h9',
  phone: 'M7 2h10v20H7zM11 18h2M10 5h4',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2c-6 6-6 14 0 20M12 2c6 6 6 14 0 20',
  laptop: 'M4 4h16v13H4zM2 20h20l-2-3H4l-2 3Z',
  mail: 'M2 5h20v14H2zM2 6l10 8 10-8',
  camera: 'M3 7h4l2-3h6l2 3h4v14H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  bookmark: 'M6 3h12v19l-6-4-6 4V3Z',
  abc: 'M2 19l5-14 5 14M4 14h6M15 5h4a3 3 0 0 1 0 6h-4V5ZM15 11h5a4 4 0 0 1 0 8h-5v-8Z',
  ear: 'M7 10a5 5 0 1 1 10 0c0 5-5 5-5 9a3 3 0 0 1-6 0M12 13a3 3 0 0 0 1-6',
  pencil: 'M3 17 17 3l4 4L7 21H3v-4ZM14 6l4 4M4 17l3 3',
  audio: 'M2 9v6h4l5 5V4L6 9H2ZM15 9a5 5 0 0 1 0 6M18 5a10 10 0 0 1 0 14',
  microphone: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v4M8 22h8',
  repeat: 'M20 7V3l-3 3-3 1M4 17v4l3-3 3-1M5 8a8 8 0 0 1 13-2M19 16a8 8 0 0 1-13 2',
};

const stageMap = { orientation: 'compass', foundation: 'levelZero', social: 'socialDuo' };
const groupMap = {
  1: 'messages', 11: 'calendar', 20: 'utensils', 26: 'palette',
  35: 'storefront', 46: 'briefcase', 57: 'house', 66: 'route',
  81: 'firstAid', 89: 'newspaper',
};
const foundationMap = {
  orientation: 'compass', 'how-it-works': 'book', letters: 'abc', hear: 'ear',
  write: 'pencil', sounds: 'audio', 'tongue-intro': 'microphone', lr: 'repeat',
};
// Explicit coverage for all 96 Social Fluency chapters. Topics may share an
// icon when the semantic distinction is made by the lesson title.
const chapters = [
  'greeting','badge','ellipsis','help','heart','scales','calendar','gift','apology','door',
  'clock','calendarCheck','cloudSun','family','users','milestone','party','heart','handshake',
  'utensils','coffee','bag','beer','chef','cooking',
  'palette','film','theater','music','dumbbell','ball','trophy','palette',
  'storefront','basket','basket','leaf','hammer','shirt','undo','scissors','package','wallet','library',
  'briefcase','school','graduation','search','file','interview','badge','briefcase','presentation','users','video',
  'house','key','truck','users','broom','hammer','paw','alert','tv',
  'route','bus','train','plane','bike','car','wrench','suitcase','calendar','bed','landmark','tent','waves','mapPin','alert',
  'firstAid','pill','calendarCheck','stethoscope','activity','hospital','tooth','brain',
  'newspaper','phone','phone','globe','laptop','mail','video','camera','book',
];

export const stageIcon = (id) => stageMap[id] ?? 'book';
export const groupIcon = (start) => groupMap[Number(start)] ?? 'book';
export const foundationIcon = (id) => foundationMap[id] ?? 'book';
export const chapterIcon = (id) => Number(id) === 34 ? 'smile' : chapters[Number(id) > 34 ? Number(id) - 2 : Number(id) - 1] ?? 'book';

export function CurriculumIcon({ name, size = 24, className = '' }) {
  if (name === 'socialDuo') {
    // Two distinct illustrated people in conversation rather than a generic
    // people glyph. Simple silhouettes and thick outlines read at icon sizes.
    return (
      <svg
        className={`curriculum-icon curriculum-icon--social-duo ${className}`.trim()}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 92 62"
        fill="none"
        stroke="#272238"
        strokeLinejoin="round"
        strokeLinecap="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M6 57 Q7 41 16 38 L33 38 Q40 42 41 57 Z" fill="#399fda" strokeWidth="2.7" />
        <path d="M17 38 L24 46 L31 38" stroke="#277ca8" strokeWidth="2" />
        <path d="M19 35 V40 Q24 44 29 40 V34 Z" fill="#e5a779" strokeWidth="2.3" />
        <path d="M13 21 Q13 8 25 8 Q36 8 36 21 L35 30 Q32 38 24 38 Q16 37 14 30 Z" fill="#f5bc8d" strokeWidth="2.5" />
        <path d="M12 25 Q9 15 17 10 Q20 5 28 7 Q37 7 39 17 L36 24 L32 16 Q24 19 17 16 L14 28 Z" fill="#3c344e" strokeWidth="2.4" />
        <circle cx="29" cy="26" r="1.2" fill="#272238" stroke="none" />
        <path d="M28 32 Q30 34 32 32" strokeWidth="1.5" />
        <path d="M51 57 Q52 42 60 38 L77 38 Q85 43 86 57 Z" fill="#f2bd43" strokeWidth="2.7" />
        <path d="M64 38 L69 44 L75 38" stroke="#d9902f" strokeWidth="2" />
        <path d="M54 19 Q53 5 68 5 Q81 5 82 19 L81 38 Q78 41 74 39 L60 39 Q53 40 53 33 Z" fill="#6d4258" strokeWidth="2.5" />
        <path d="M63 34 V41 Q69 44 74 40 V34" fill="#b97150" strokeWidth="2.2" />
        <path d="M57 20 Q58 10 69 10 Q79 10 79 22 V29 Q77 38 68 38 Q59 38 57 30 Z" fill="#d99068" strokeWidth="2.5" />
        <path d="M55 22 Q53 9 64 7 Q78 3 82 16 L79 27 L75 17 Q66 20 58 18 L57 27 Z" fill="#6d4258" strokeWidth="2.4" />
        <circle cx="63" cy="27" r="1.2" fill="#272238" stroke="none" />
        <path d="M60 32 Q62 34 64 32" strokeWidth="1.5" />
        <path d="M43 15 L46 12 M46 23 H49 M43 30 L46 33" stroke="#ed735d" strokeWidth="2.4" />
      </svg>
    );
  }
  if (name === 'levelZero') {
    // Compact hand-drawn A/B/C mark, modeled as vector geometry so it stays
    // sharp and transparent in both the Home circle and small course tree.
    return (
      <svg
        className={`curriculum-icon curriculum-icon--level-zero ${className}`.trim()}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 90 58"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <g stroke="#26223c" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <path fill="#b92842" d="M2 50 L11 13 L18 8 L26 49 L18 52 L16 39 L13 39 L11 52 Z" />
          <path fill="#218bbc" d="M30 10 L37 6 L46 7 Q59 7 59 20 Q59 26 55 28 Q62 32 61 40 Q59 51 45 53 L30 52 Z" />
          <path fill="#d69c21" d="M83 14 L87 19 L85 26 Q77 23 72 27 Q66 32 67 37 Q74 45 86 38 L86 46 Q76 54 65 51 Q50 47 53 29 Q56 6 74 8 Q81 9 83 14Z" />
          <path
            fill="#f34955"
            fillRule="evenodd"
            d="M5 46 L15 9 Q16 6 19 6 L20 6 Q23 6 24 10 L35 46 L25 46 L22 36 L13 36 L11 46 Z M15.6 29 L20 29 L17.8 19 Z"
          />
          <path
            fill="#42b9e3"
            fillRule="evenodd"
            d="M33 8 L43 7 Q57 7 57 18 Q57 25 51 27 Q59 29 59 37 Q59 47 45 47 L33 47 Z M42 16 L42 23 L45 23 Q49 23 49 19.5 Q49 16 45 16 Z M42 32 L42 39 L46 39 Q51 39 51 35.5 Q51 32 46 32 Z"
          />
          <path
            fill="#ffcb30"
            d="M83 13 L81 23 Q76 19 72 19 Q64 19 64 28 Q64 37 73 37 Q78 37 83 33 L85 43 Q79 49 69 49 Q55 49 55 28 Q55 7 71 7 Q79 7 83 13 Z"
          />
        </g>
      </svg>
    );
  }
  return (
    <svg
      className={`curriculum-icon ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path d={iconPaths[name] ?? iconPaths.book} />
    </svg>
  );
}

export default CurriculumIcon;
