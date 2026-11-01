import { useEffect, useState } from 'react'
import { useLanguage } from './Language'
import './chapter14-visual.css'

// Chapter 14 is a picture dictionary: the labels belong on the pictures,
// not in a second vocabulary table beneath them. English always stays visible;
// 日本語 adds a compact translation immediately below each English word.
const married = 'M'
const divorce = 'D'

const familyNodes = [
  [330, 28, 'grandfather', '祖父', 'man'],
  [465, 28, 'grandmother', '祖母', 'woman'],
  [700, 28, 'grandfather', '祖父', 'man'],
  [835, 28, 'grandmother', '祖母', 'woman'],
  [270, 182, 'uncle', 'おじ', 'man'],
  [430, 182, 'mother / mom', '母／お母さん', 'woman'],
  [665, 182, 'father / dad', '父／お父さん', 'man'],
  [845, 182, 'aunt', 'おば', 'woman'],
  [190, 338, 'wife', '妻', 'woman'],
  [390, 338, 'me', '私', 'me'],
  [580, 338, 'brother', '兄／弟', 'man'],
  [730, 338, 'sister', '姉／妹', 'woman'],
  [895, 338, 'cousin', 'いとこ', 'person'],
  [300, 490, 'son', '息子', 'man'],
  [480, 490, 'daughter', '娘', 'woman'],
  [680, 490, 'nephew', '甥', 'man'],
  [810, 490, 'niece', '姪', 'woman'],
  [410, 630, 'grandson', '孫息子', 'man'],
  [560, 630, 'granddaughter', '孫娘', 'woman'],
]
const familyLines = [
  'M 330 62 H 465 M 397 62 V 153 H 270 V 177 M 397 153 H 430 V 177',
  'M 700 62 H 835 M 767 62 V 153 H 665 V 177 M 767 153 H 845 V 177',
  'M 430 219 H 665 M 548 219 V 307 H 390 V 333 M 548 307 H 580 V 333 M 548 307 H 730 V 333',
  'M 845 219 V 307 H 895 V 333',
  'M 190 373 H 390 M 290 373 V 462 H 300 V 485 M 290 462 H 480 V 485',
  'M 730 373 V 462 H 680 V 485 M 730 462 H 810 V 485',
  'M 480 526 V 607 H 410 V 625 M 480 607 H 560 V 625',
]
const familyHearts = [[398,62,'♥'],[768,62,'♥'],[548,219,'♥'],[290,373,'♥']]

const relatives = [
  ['parents','両親'], ['children','子どもたち'], ['siblings','兄弟姉妹'],
  ['grandparents','祖父母'], ['grandchildren','孫たち'], ['spouse','配偶者'],
  ['father-in-law','義父'], ['mother-in-law','義母'], ['brother-in-law','義兄／義弟'],
  ['sister-in-law','義姉／義妹'], ['son-in-law','娘の夫'], ['daughter-in-law','息子の妻'],
]

const relationshipTerms = [
  ['siblings','兄弟姉妹','👫'],['twins','双子','👭'],['only child','一人っ子','🧒'],
  ['oldest child','長子／一番上の子','🥇'],['middle child','真ん中の子','🧒'],['youngest child','末っ子','🍼'],
  ['parents','両親','👨‍👩‍👧'],['single parent','ひとり親','👩‍👧'],['partner','パートナー','💞'],
  ['engaged','婚約している','💍'],['married','結婚している','💒'],['single','独身／交際相手がいない','🧍'],
  ['divorced','離婚している','💔'],['husband','夫','🧑'],['wife','妻','👩'],
  ['ex-husband','元夫','🧍'],['ex-wife','元妻','🧍‍♀️'],['colleague','同僚','🧑‍💼'],
  ['friend','友人','🤝'],['neighbour / neighbor','近所の人','🏠'],
]
const lifeTerms = [
  ['birth','誕生','👶'],['birthday','誕生日','🎂'],['graduation','卒業','🎓'],
  ['first job','初めての仕事','💼'],['promotion','昇進','📈'],['falling in love','恋に落ちること','💕'],
  ['wedding','結婚式','💐'],['holiday / vacation','休暇／旅行','🏖️'],['divorce','離婚','💔'],
  ['new home','新居','🏡'],['retirement','退職／引退','🌿'],['funeral','葬儀','🕊️'],
]
const ageTerms = [
  ['baby','赤ちゃん','👶'],['toddler','よちよち歩きの幼児','🚼'],
  ['children','子どもたち','🧒👧'],['teenagers','10代の若者','🧑‍🤝‍🧑'],
  ['adults','大人','🧑👩'],['senior citizens','高齢者','👵👴'],
]
const stepTerms = [
  ['stepparent','継親'],['stepmother / stepmom','継母／お母さん'],['stepfather / stepdad','継父／お父さん'],
  ['stepbrother','義理の兄弟（継親の子）'],['stepsister','義理の姉妹（継親の子）'],
  ['half-brother','異父兄弟／異母兄弟'],['half-sister','異父姉妹／異母姉妹'],
  ['ex-husband','元夫'],['ex-wife','元妻'],
]

function Figure({ kind = 'person', color = '#9264ad' }) {
  const female = kind === 'woman'
  const active = kind === 'me'
  return (
    <svg className="ar-f14-figure" viewBox="0 0 38 58" fill="none" aria-hidden="true">
      <circle cx="19" cy="9" r="6.6" fill={active ? '#ef6544' : color} />
      {female
        ? <path d="M14 19h10l8 26H6l8-26Z" fill={color} />
        : <path d="M13 19h12v24H13z" fill={active ? '#ef6544' : color} />}
      <path d="M14 23 7 38M24 23l7 15M16 42l-2 13M22 42l2 13"
        stroke={active ? '#ef6544' : color} strokeWidth="5.2" strokeLinecap="round" />
    </svg>
  )
}

function speakEnglish(word, onError) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError()
    return
  }
  const speech = window.speechSynthesis
  speech.cancel()
  const utterance = new SpeechSynthesisUtterance(word.replace(' / ', ', '))
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  utterance.voice = speech.getVoices().find(v => /^en[-_]US$/i.test(v.lang)) || null
  try { speech.speak(utterance) } catch { onError() }
}
function Word({ en, ja, language, onSpeak, className = '', children }) {
  return (
    <button type="button" className={'ar-f14-word ' + className}
      title={'Listen to ' + en} aria-label={'Listen to ' + en}
      onClick={() => onSpeak(en.split(' / ')[0])}>
      {children}
      <span className="ar-f14-label" lang="en">{en}</span>
      {language === 'ja' && <span className="ar-f14-japanese" lang="ja">{ja}</span>}
    </button>
  )
}
function TreeNode({ item, language, onSpeak }) {
  const [x,y,en,ja,kind] = item
  return (
    <div className="ar-f14-tree-node" style={{left:x,top:y}}>
      <Word en={en} ja={ja} language={language} onSpeak={onSpeak}>
        <Figure kind={kind} color={kind === 'me' ? '#ef6544' : '#9661ad'} />
      </Word>
    </div>
  )
}
function Board({ number, en, ja, language, children, tone = 'blue', className = '' }) {
  return (
    <section className={'ar-f14-board ar-f14-' + tone + ' ' + className}>
      <header className="ar-f14-board-title">
        <span>{number}</span>
        <h3>{en}</h3>
        {language === 'ja' && <small lang="ja">{ja}</small>}
      </header>
      {children}
    </section>
  )
}
function FamilyTree({ language, onSpeak }) {
  return (
    <Board number="14.1" en="MY FAMILY" ja="私の家族" language={language} tone="purple">
      <div className="ar-f14-scroll" role="region" tabIndex={0} aria-label={language === 'ja' ? '家系図、横方向にスクロールできます' : 'Family tree, scroll sideways if necessary'}>
        <div className="ar-f14-tree-stage">
          <svg className="ar-f14-tree-lines" viewBox="0 0 1080 710" aria-hidden="true">
            {familyLines.map((line, i) => <path d={line} key={i} />)}
            {familyHearts.map(([x,y]) => <text x={x} y={y+7} key={x+'-'+y} className="ar-f14-heart">♥</text>)}
          </svg>
          {familyNodes.map((item,i) => <TreeNode key={i} item={item} language={language} onSpeak={onSpeak}/>)}
        </div>
      </div>
      <div className="ar-f14-legend">
        <span><i className="ar-f14-line-key"/> {language === 'ja' ? '親子のつながり' : 'Parent–child connection'}</span>
        <span><b className="ar-f14-heart-key">♥</b> {language === 'ja' ? '結婚' : 'married'}</span>
        <span><b className="ar-f14-person-key">●</b> {language === 'ja' ? '中心となる人' : 'me (reference person)'}</span>
      </div>
      <p className="ar-f14-hint">{language === 'ja' ? '家系図は「私」から見た関係の例です。現実の家族の形はさまざまです。' : 'An example family tree, described from “me.” Families can take many forms.'}</p>
      <div className="ar-f14-relative-strip">
        <h4>{language === 'ja' ? '関連する家族の言葉' : 'Family and in-law words'}</h4>
        <div className="ar-f14-chip-list">
          {relatives.map(([en,ja]) => <Word key={en} en={en} ja={ja} language={language} onSpeak={onSpeak} className="ar-f14-chip" />)}
        </div>
      </div>
    </Board>
  )
}

function StepFamily({ language, onSpeak }) {
  return (
    <Board number="14.2" en="MY STEPFAMILY" ja="私のステップファミリー" language={language} tone="purple">
      <div className="ar-f14-scroll" role="region" tabIndex={0} aria-label="Example stepfamily diagram">
        <div className="ar-f14-step-stage">
          <svg className="ar-f14-tree-lines" viewBox="0 0 1020 310" aria-hidden="true">
            <path d="M155 73 H345 M250 73 V180 H208 V196 M345 73 H580 M462 73 V179 H500 V196 M580 73 H845 M712 73 V180 H795 V196"/>
            <text x="250" y="80" className="ar-f14-broken">💔</text>
            <text x="462" y="80" className="ar-f14-heart">♥</text>
            <text x="712" y="80" className="ar-f14-broken">💔</text>
          </svg>
          {[
            [155,23,'Kim · former partner','キム・以前のパートナー','person'],
            [345,23,'Rae · parent','レイ・親','person'],
            [580,23,'Lee · stepparent','リー・継親','person'],
            [845,23,'Morgan · former partner','モーガン・以前のパートナー','person'],
            [208,196,'Sam · me','サム・私','me'],
            [500,196,'Noah · half-brother','ノア・異父／異母兄弟','man'],
            [795,196,'Ava · stepsister','エイヴァ・継姉妹','woman'],
          ].map((item,i) => <TreeNode item={item} language={language} onSpeak={onSpeak} key={i}/>)}
        </div>
      </div>
      <p className="ar-f14-hint">
        {language === 'ja' ? 'この架空の家族では、SamとNoahはRaeという親を共有するので half-brothers。Avaは継親Leeの子なので Samの stepsister です。'
          : 'Sam and Noah share one parent, Rae: half-brothers. Ava is Lee’s daughter from an earlier relationship: Sam’s stepsister.'}
      </p>
      <div className="ar-f14-chip-list">
        {stepTerms.map(([en,ja]) => <Word key={en} en={en} ja={ja} language={language} onSpeak={onSpeak} className="ar-f14-chip" />)}
      </div>
      <p className="ar-f14-subnote">{language === 'ja'
        ? 'step- は親の再婚などによる関係、half- は生みの親を一人共有する関係を表します。'
        : 'Step- describes a relationship through a parent’s partner; half- means sharing one birth parent.'}</p>
    </Board>
  )
}

function PictureGrid({ terms, language, onSpeak, tone }) {
  return (
    <div className={'ar-f14-picture-grid ar-f14-picture-' + tone}>
      {terms.map(([en,ja,icon]) =>
        <Word key={en} en={en} ja={ja} language={language} onSpeak={onSpeak} className="ar-f14-picture-word">
          <span className="ar-f14-picture-icon" aria-hidden="true">{icon}</span>
        </Word>
      )}
    </div>
  )
}
function RelationshipOverview({ language, onSpeak }) {
  return (
    <div className="ar-f14-last-section">
      <div className="ar-f14-side-by-side">
        <Board number="14.3" en="RELATIONSHIPS" ja="人間関係" language={language} tone="orange">
          <PictureGrid terms={relationshipTerms} language={language} onSpeak={onSpeak} tone="orange"/>
        </Board>
        <Board number="14.4" en="LIFE EVENTS" ja="人生の出来事" language={language} tone="green">
          <PictureGrid terms={lifeTerms} language={language} onSpeak={onSpeak} tone="green"/>
        </Board>
      </div>
      <Board number="14.5" en="GROWING UP" ja="成長と年齢" language={language} tone="red">
        <PictureGrid terms={ageTerms} language={language} onSpeak={onSpeak} tone="red"/>
        <p className="ar-f14-hint">{language === 'ja'
          ? '英語の child は「子ども」のほか、親との関係を表すときには成人した息子・娘にも使います。'
          : 'Child can mean a young person, or someone’s son or daughter at any age.'}</p>
      </Board>
    </div>
  )
}
export default function Chapter14VisualBoard({ sectionIndex, Diagram }) {
  const { language } = useLanguage()
  const [speechError,setSpeechError] = useState(false)
  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
  }, [])
  const speak = (word) => {
    setSpeechError(false)
    speakEnglish(word, () => setSpeechError(true))
  }
  return (
    <div className="ar-f14-atlas">
      {sectionIndex === 0 && <FamilyTree language={language} onSpeak={speak}/>}
      {sectionIndex === 1 && <div className="ar-f14-example">
        {Diagram && <Diagram type="family"/>}
      </div>}
      {sectionIndex === 2 && <StepFamily language={language} onSpeak={speak}/>}
      {sectionIndex === 3 && <RelationshipOverview language={language} onSpeak={speak}/>}
      {sectionIndex !== 1 && <p className="ar-f14-audio-hint">
        {language === 'ja' ? '英語のラベルを押すと発音が聞けます。' : 'Click or tap a label to hear its English pronunciation.'}
      </p>}
      {speechError && <p role="status" className="ar-f14-error">{language === 'ja' ? 'この端末では音声を利用できません。' : 'Speech is not available on this device.'}</p>}
    </div>
  )
}
