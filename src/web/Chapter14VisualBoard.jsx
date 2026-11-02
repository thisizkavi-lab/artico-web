import { useEffect, useState } from 'react'
import { useLanguage } from './Language'
import Glyph from './Glyph'
import './chapter14-visual.css'

const familyNodes = [
  [280, 12, 'grandfather', '祖父', 'man'],
  [440, 12, 'grandmother', '祖母', 'woman'],
  [700, 12, 'grandfather', '祖父', 'man'],
  [860, 12, 'grandmother', '祖母', 'woman'],
  [350, 135, 'uncle', 'おじ（叔父／伯父）', 'man'],
  [500, 135, 'mother / mom', '母／お母さん', 'woman'],
  [700, 135, 'father / dad', '父／お父さん', 'man'],
  [900, 135, 'aunt', 'おば（叔母／伯母）', 'woman'],
  [1060, 135, 'uncle', 'おじ（叔父／伯父）', 'man'],
  [80, 135, 'father-in-law', '義父', 'man'],
  [220, 135, 'mother-in-law', '義母', 'woman'],
  [360, 260, 'wife', '妻', 'woman'],
  [500, 260, 'sister-in-law', '義姉／義妹', 'woman'],
  [640, 260, 'me', '私', 'me'],
  [780, 260, 'brother', '兄／弟', 'man'],
  [920, 260, 'sister', '姉／妹', 'woman'],
  [1060, 260, 'brother-in-law', '義兄／義弟', 'man'],
  [410, 390, 'daughter-in-law', '息子の妻', 'woman'],
  [550, 390, 'son', '息子', 'man'],
  [720, 390, 'daughter', '娘', 'woman'],
  [860, 390, 'son-in-law', '娘の夫', 'man'],
  [1080, 390, 'cousin', 'いとこ', 'person'],
  [850, 520, 'nephew', '甥', 'man'],
  [1010, 520, 'niece', '姪', 'woman'],
  [550, 650, 'grandson', '孫息子', 'man'],
  [720, 650, 'granddaughter', '孫娘', 'woman'],
]

const familyLines = [
  'M 280 58 H 440 M 360 58 V 105 H 350 V 125 M 360 105 H 500 V 125',
  'M 700 58 H 860 M 780 58 V 105 H 700 V 125 M 780 105 H 900 V 125',
  'M 900 180 H 1060 M 980 180 V 345 H 1080 V 375',
  'M 500 180 H 700 M 600 180 V 225 H 640 V 245 M 600 225 H 780 V 245 M 600 225 H 920 V 245',
  'M 80 180 H 220 M 150 180 V 225 H 360 V 245 M 150 225 H 500 V 245',
  'M 360 305 H 640 M 500 305 V 355 H 550 V 375 M 500 355 H 720 V 375',
  'M 920 305 H 1060 M 990 305 V 475 H 850 V 505 M 990 475 H 1010 V 505',
  'M 410 435 H 550 M 480 435 V 605 H 550 V 635 M 480 605 H 720 V 635',
  'M 720 435 H 860',
]
const familyHearts = [[360,58],[780,58],[980,180],[600,180],[150,180],[500,305],[990,305],[480,435],[790,435]]

const relationshipTerms = [
  ['siblings','兄弟姉妹'], ['twins','双子'], ['only child','一人っ子'],
  ['oldest child','一番上の子'], ['middle child','真ん中の子'], ['youngest child','末っ子'],
  ['parents','両親'], ['children','子どもたち'], ['grandparents','祖父母'],
  ['grandchildren','孫たち'], ['single parent','ひとり親'], ['partner','パートナー'],
  ['spouse','配偶者'], ['engaged','婚約している'], ['married','結婚している'],
  ['single','独身／交際相手がいない'], ['divorced','離婚している'],
  ['husband','夫'], ['wife','妻'], ['ex-husband','元夫'],
  ['ex-wife','元妻'], ['colleague','同僚'], ['friend','友人'],
  ['neighbour / neighbor','近所の人'],
]
const lifeTerms = [
  ['birth','誕生'], ['birthday','誕生日'], ['graduation','卒業'],
  ['first job','初めての仕事'], ['promotion','昇進'], ['falling in love','恋に落ちること'],
  ['wedding','結婚式'], ['holiday / vacation','休暇／旅行'], ['divorce','離婚'],
  ['new home','新居'], ['retirement','退職／引退'], ['funeral','葬儀'],
]
const ageTerms = [
  ['baby','赤ちゃん'], ['toddler','歩き始めた幼児'],
  ['child','子ども'], ['girl','女の子'], ['boy','男の子'],
  ['teenager','10代の若者'], ['adult','大人'], ['woman','女性'],
  ['man','男性'], ['older adult','高齢の成人'], ['senior citizen','高齢者'],
]
const stepTerms = [
  ['stepparent','継親'], ['stepmother / stepmom','継母'],
  ['stepfather / stepdad','継父'], ['stepbrother','義理の兄／弟（継親の子）'],
  ['stepsister','義理の姉／妹（継親の子）'],
  ['half-brother','異父兄弟／異母兄弟'], ['half-sister','異父姉妹／異母姉妹'],
  ['ex-husband','元夫'], ['ex-wife','元妻'],
]

function Figure({ kind = 'person', color = '#9264ad' }) {
  const female = kind === 'woman'
  const active = kind === 'me'
  const fill = active ? '#ef6544' : color
  return (
    <svg className="ar-f14-figure" viewBox="0 0 38 58" fill="none" aria-hidden="true">
      <circle cx="19" cy="9" r="6.6" fill={fill} />
      {female
        ? <path d="M14 19h10l8 26H6l8-26Z" fill={fill} />
        : <path d="M13 19h12v24H13z" fill={fill} />}
      <path d="M14 23 7 38M24 23l7 15M16 42l-2 13M22 42l2 13"
        stroke={fill} strokeWidth="5.2" strokeLinecap="round" />
    </svg>
  )
}

function speakEnglish(word, onError) {
  if (typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
    onError()
    return
  }
  const speech = window.speechSynthesis
  speech.cancel()
  const utterance = new SpeechSynthesisUtterance(word.replace(/\s\/\s/g, ', '))
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  utterance.voice = speech.getVoices().find((voice) => /^en[-_]US$/i.test(voice.lang)) || null
  try { speech.speak(utterance) } catch { onError() }
}

function Word({ en, ja, language, onSpeak, className = '', children }) {
  return (
    <div className={'ar-f14-word ' + className}>
      {children && <div className="ar-f14-word-art">{children}</div>}
      <div className="ar-f14-word-line">
        <span className="ar-f14-label" lang="en">{en}</span>
        <button
          type="button"
          className="ar-f14-sound"
          title={'Listen to ' + en}
          aria-label={language === 'ja' ? en + 'の発音を聞く' : 'Listen to ' + en}
          onClick={() => onSpeak(en)}
        >
          <Glyph name="speaker" size={15} />
        </button>
      </div>
      {language === 'ja' && <span className="ar-f14-japanese" lang="ja">{ja}</span>}
    </div>
  )
}

function TreeNode({ item, language, onSpeak }) {
  const [x, y, en, ja, kind] = item
  return (
    <div className="ar-f14-tree-node" style={{ left: (x / 1200 * 100) + '%', top: (y / 740 * 100) + '%' }}>
      <Word en={en} ja={ja} language={language} onSpeak={onSpeak}>
        <Figure kind={kind} color={kind === 'me' ? '#ef6544' : '#9661ad'} />
      </Word>
    </div>
  )
}

function Board({ en, ja, language, children, tone = 'blue' }) {
  return (
    <section className={'ar-f14-board ar-f14-' + tone}>
      <header className="ar-f14-board-title">
        <h2>{en}</h2>
        {language === 'ja' && <span lang="ja">{ja}</span>}
      </header>
      {children}
    </section>
  )
}

function FamilyTree({ language, onSpeak }) {
  return (
    <Board en="MY FAMILY" ja="私の家族" language={language} tone="purple">
      <div className="ar-f14-tree-stage">
        <svg className="ar-f14-tree-lines" viewBox="0 0 1200 740" preserveAspectRatio="none" aria-hidden="true">
          {familyLines.map((line, index) => <path d={line} key={index} />)}
          {familyHearts.map(([x,y]) => <text x={x} y={y + 8} key={x + '-' + y} className="ar-f14-heart">♥</text>)}
        </svg>
        {familyNodes.map((item, index) => <TreeNode key={item[2] + '-' + index} item={item} language={language} onSpeak={onSpeak} />)}
      </div>
      <p className="ar-f14-hint">
        {language === 'ja'
          ? '♥ は結婚、線は親子関係を表します。オレンジ色の人物が「私」です。'
          : '♥ means married. Lines show parent–child relationships. The orange figure is “me.”'}
      </p>
    </Board>
  )
}

function MiniFamilyNode({ en, ja, language, onSpeak, kind = 'person' }) {
  return <Word en={en} ja={ja} language={language} onSpeak={onSpeak}><Figure kind={kind} /></Word>
}

function StepFamily({ language, onSpeak }) {
  return (
    <Board en="MY STEPFAMILY" ja="ステップファミリー" language={language} tone="purple">
      <div className="ar-f14-step-panels">
        <article className="ar-f14-step-panel">
          <h3>{language === 'ja' ? 'HALF- の関係' : 'HALF- RELATIONSHIP'}</h3>
          <div className="ar-f14-mini-tree">
            <MiniFamilyNode en="shared birth parent" ja="共通の実親" language={language} onSpeak={onSpeak} />
            <span className="ar-f14-mini-stem" />
            <div className="ar-f14-mini-children">
              <MiniFamilyNode en="you" ja="あなた" language={language} onSpeak={onSpeak} kind="me" />
              <MiniFamilyNode en="half-brother / half-sister" ja="異父／異母兄弟姉妹" language={language} onSpeak={onSpeak} />
            </div>
          </div>
        </article>
        <article className="ar-f14-step-panel">
          <h3>{language === 'ja' ? 'STEP- の関係' : 'STEP- RELATIONSHIP'}</h3>
          <div className="ar-f14-mini-tree">
            <div className="ar-f14-mini-parents">
              <MiniFamilyNode en="your parent" ja="あなたの親" language={language} onSpeak={onSpeak} />
              <span className="ar-f14-mini-heart">♥</span>
              <MiniFamilyNode en="stepparent" ja="継親" language={language} onSpeak={onSpeak} />
            </div>
            <div className="ar-f14-step-children">
              <div className="ar-f14-step-child">
                <MiniFamilyNode en="you" ja="あなた" language={language} onSpeak={onSpeak} kind="me" />
                <small>{language === 'ja' ? 'あなたの親の子' : 'your parent’s child'}</small>
              </div>
              <span className="ar-f14-step-link">{language === 'ja' ? '義理の兄弟姉妹' : 'step-siblings'}</span>
              <div className="ar-f14-step-child">
                <MiniFamilyNode en="stepparent’s child" ja="継親の子" language={language} onSpeak={onSpeak} />
                <small>{language === 'ja' ? '以前の関係で生まれた子' : 'from an earlier relationship'}</small>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="ar-f14-step-vocabulary">
        {stepTerms.map(([en, ja]) => <Word key={en} en={en} ja={ja} language={language} onSpeak={onSpeak} className="ar-f14-chip" />)}
      </div>
      <p className="ar-f14-subnote">
        {language === 'ja'
          ? 'step- は継親を通じた関係、half- は生みの親を一人共有する関係を表します。'
          : 'Step- describes a family connection through a stepparent. Half- means sharing one birth parent.'}
      </p>
    </Board>
  )
}

function PictureGrid({ terms, language, onSpeak, variant = '' }) {
  return (
    <div className={'ar-f14-picture-grid ' + variant}>
      {terms.map(([en, ja]) => (
        <Word key={en} en={en} ja={ja} language={language} onSpeak={onSpeak} className="ar-f14-picture-word">
          <img className="ar-f14-picture-art" aria-hidden="true" alt="" width="160" height="112" loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/course/family-symbols/${en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.svg`} />
        </Word>
      ))}
    </div>
  )
}

function VocabularySections({ language, onSpeak }) {
  return (
    <div className="ar-f14-vocabulary-sections">
      <Board en="RELATIONSHIPS" ja="人間関係" language={language} tone="orange">
        <PictureGrid terms={relationshipTerms} language={language} onSpeak={onSpeak} variant="ar-f14-relationships-grid" />
      </Board>
      <Board en="LIFE EVENTS" ja="人生の出来事" language={language} tone="green">
        <PictureGrid terms={lifeTerms} language={language} onSpeak={onSpeak} variant="ar-f14-life-grid" />
      </Board>
      <Board en="GROWING UP" ja="成長と年齢" language={language} onSpeak={onSpeak} tone="red">
        <PictureGrid terms={ageTerms} language={language} onSpeak={onSpeak} variant="ar-f14-growing-grid" />
        <p className="ar-f14-hint">
          {language === 'ja'
            ? 'child は「子ども」を表すほか、親との関係では成人した息子や娘にも使います。'
            : 'Child can mean a young person, or someone’s son or daughter at any age.'}
        </p>
      </Board>
    </div>
  )
}

export default function Chapter14VisualBoard() {
  const { language } = useLanguage()
  const [speechError, setSpeechError] = useState(false)
  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
  }, [])
  const speak = (word) => {
    setSpeechError(false)
    speakEnglish(word, () => setSpeechError(true))
  }
  return (
    <div className="ar-f14-atlas">
      <FamilyTree language={language} onSpeak={speak} />
      <StepFamily language={language} onSpeak={speak} />
      <VocabularySections language={language} onSpeak={speak} />
      {speechError && <p role="status" className="ar-f14-error">{language === 'ja' ? 'この端末では音声を利用できません。' : 'Audio is not available on this device.'}</p>}
    </div>
  )
}
