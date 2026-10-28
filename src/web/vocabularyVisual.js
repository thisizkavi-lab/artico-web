// Reuse Artico's existing vector illustrations. Only use a visual when it
// represents the actual meaning; abstract words remain deliberately text-first.
const topicArt = {
  3:'clock',4:'sunCloud',5:'palette',6:'thumbsUp',7:'mail',8:'messages',
  9:'house',10:'utensils',11:'broom',12:'hammer',13:'key',14:'user',
  15:'shirt',16:'bag',17:'user',18:'users',19:'heart',20:'family',
  21:'handshake',22:'gift',23:'school',24:'book',25:'messages',
  26:'message',27:'scales',28:'utensils',29:'leaf',30:'leaf',31:'cooking',
  32:'coffee',33:'chef',34:'briefcase',35:'calendar',36:'briefcase',
  37:'laptop',38:'wallet',39:'briefcase',40:'presentation',41:'messages',
  42:'interview',43:'badge',44:'bus',45:'car',46:'compass',47:'suitcase',
  48:'mapPin',49:'tent',50:'waves',51:'sunCloud',52:'landmark',
  53:'leaf',54:'paw',55:'paw',56:'paw',57:'waves',58:'music',
  59:'activity',60:'ball',61:'ball',62:'trophy',63:'book',64:'music',
  65:'film',66:'tv',67:'newspaper',68:'firstAid',69:'stethoscope',
  70:'leaf',71:'dumbbell',72:'storefront',73:'bag',74:'basket',
  75:'house',76:'laptop',77:'lightbulb',78:'scales',
};
export const vocabularyTopicArt = (number) => topicArt[number] || 'book';

const wordGroups = {
  clock:'clock|alarm|watch|noon|midnight|time zone|schedule|hour|minute',
  calendar:'calendar|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|weekend|weekday',
  sunCloud:'morning|afternoon|evening|sunrise|sunset|dawn|dusk|sun|sunny|cloud|cloudy|weather|forecast',
  house:'house|home|apartment|cottage|bedroom|living room|kitchen|roof|porch|building',
  bed:'bed|go to bed|make the bed|sleep|sleep well|pillow|crib',
  tooth:'tooth|teeth|brush your teeth|toothbrush|toothpaste|dentist',
  coffee:'coffee|tea|cup|mug|kettle|drink tea or coffee|have tea or coffee|cafe|café',
  cooking:'cook dinner|cooking|bake|fry|boil|stove|oven|saucepan|frying pan|prepare food|microwave|food',
  utensils:'lunch|dinner|breakfast|spoon|fork|knife|plate|bowl|chopsticks|restaurant|eat breakfast|eat lunch|eat dinner|have breakfast|have lunch|have dinner',
  bus:'bus|bus stop|catch the bus|take the bus',
  train:'train|train station|catch the train|take the train',
  car:'car|drive|taxi|gas station|parking lot|truck',
  plane:'plane|airplane|airport|flight|helicopter',
  bike:'bike|bicycle|cycling|ride a bike',
  mail:'email|email address|mail|send|reply|reply all|inbox|outbox|letter|envelope|forward (email action)|attachment|text message',
  phone:'phone|cell phone|cell phone number|phone call|mobile number|smartphone|voicemail',
  laptop:'computer|laptop|keyboard|website|internet|technology|spreadsheet',
  camera:'camera|take photos|photography|photographer|photo',
  bag:'bag|backpack|handbag|suitcase|purse|shopping bag',
  basket:'basket|shopping cart|groceries|buy groceries|supermarket|shopping',
  book:'book|read|reading|textbook|novel|dictionary|library|newspaper|magazine',
  pencil:'pencil|pen|writing|write|draft|note|memo|signature',
  calendarCheck:'on time|deadline|appointment|meet a deadline',
  heart:'love|happy|kind|caring|grateful|favorite',
  smile:'smile|laugh|cheerful|funny|amused|good|great|nice',
  thumbsUp:'amazing|brilliant|excellent|fantastic|wonderful|outstanding|superb',
  alert:'warning|emergency|danger|accident|risk|shocking',
  users:'friends|friend|family|people|neighbor|coworker|roommate|team',
  user:'person|man|woman|girl|boy|face|head|body',
  handshake:'meet friends|hang out|introduce yourself|exchange business cards|relationship',
  shirt:'shirt|sweater|jacket|coat|dress|jeans|pants|clothes|t-shirt',
  key:'key|keys|lock|password|move in|move out|rent',
  broom:'broom|sweep|sweep the floor|vacuum|mop|cleaning|dust',
  hammer:'hammer|drill|screwdriver|nail|wrench|repair|tools',
  leaf:'plant|tree|fruit|vegetables|garden|green|environment',
  paw:'animal|dog|cat|kitten|puppy|pet|puppy|rabbit|cow|horse',
  waves:'ocean|sea|water|lake|river|beach|swimming|surfing',
  mountain:'mountain',
  briefcase:'job|work|workplace|career|office|company|salary',
  school:'student|school|teacher|university|college|education',
  graduation:'graduate|degree|diploma|graduation',
  firstAid:'sick|ill|fever|cough|headache|medicine|pain|painful|injury|first aid kit',
  stethoscope:'doctor|nurse|hospital|clinic|pharmacist|medical',
  pill:'pill|medication|prescription|painkiller|vaccine',
  dumbbell:'gym|exercise|fitness|workout|strength|weight',
  ball:'soccer|football|basketball|tennis|volleyball|sport|ball',
  music:'music|song|guitar|piano|violin|concert|sing|singer|musician',
  film:'movie|film|theater|cinema|screen|actor',
  tv:'tv|television|show|episode|series',
  palette:'art|artist|paint|painting|colors',
  globe:'world|country|international|travel|abroad',
  mapPin:'map|direction|location|street|address|city|hometown',
  lightbulb:'idea|innovation|future|creative|science',
  scales:'law|court|justice|legal|judge|lawyer',
  compass:'north|south|east|west|compass|route',
};
const wordArt = Object.fromEntries(
  Object.entries(wordGroups).flatMap(([icon, words]) => words.split('|').map(word => [word, icon])),
);
export const visualColor = {
  black:'#212734',blue:'#327bdd',brown:'#936544',cream:'#f5edcc','dark green':'#1e6044',
  gray:'#9199a7',green:'#58a56d','navy blue':'#203e73',orange:'#fa982b','pale green':'#b9ddbd',
  pink:'#e9a1c2',purple:'#9464bd',red:'#d95754',white:'#fff',yellow:'#efcb45',
  'black (color)':'#212734','orange (color)':'#fa982b','cream (color)':'#f5edcc',
};
const timePhases = new Set(['dawn','sunrise','morning','afternoon','evening','sunset','dusk','night','midnight']);
export function vocabularyVisual(term, number) {
  if (number === 5 && visualColor[term.toLowerCase()]) return {type:'color',value:visualColor[term.toLowerCase()]};
  const normalized=term.toLowerCase().replace(/\s*\([^)]*\)/g,'').split(' / ')[0].trim();
  if (number === 3 && timePhases.has(normalized)) return {type:'time',value:normalized};
  if (number === 5 && ['big','little','small','long','short','thick','thin','high','low','near','far'].includes(normalized))
    return {type:'size',value:normalized};
  const icon=wordArt[normalized];
  return icon ? {type:'icon',value:icon} : null;
}
