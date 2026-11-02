import { vocabularyChapters } from './socialStudyLayout.js'

const plain = (runs = []) => runs.map((run) => run.text).join('')
const run = (text, emphasis = false) => [{ text, emphasis }]
const labels = (language, vocabulary = false) => (language === 'ja'
  ? [vocabulary ? '語句' : '表現', '意味・使い方']
  : [vocabulary ? 'Term' : 'Expression', 'Meaning / use']).map((text) => run(text))
const lines = (value) => value.trim().split('\n').map((line) => line.split('|'))

// Reviewed rewrites of the marked reference paragraphs. English targets stay
// beside their meaning; Japanese changes the explanation, not the target.
const media = {
  '88-study-1': lines(`
call|Make a phone call.|電話をかける。
text|Send a text message.|テキストメッセージを送る。
email|Send an email.|メールを送る。
make a video call|Talk using sound and video.|映像と音声で通話する。
voicemail|A recorded message left for someone.|相手に残す録音メッセージ。
take a message|Record information to pass to another person.|別の人へ伝えるために伝言を預かる。
put someone on hold|Keep the call connected while the person waits.|電話をつないだまま保留にする。
transfer a call|Connect a call to another person or place.|電話を別の相手や接続先へつなぐ。
speakerphone|Play the call through a speaker.|通話の音をスピーカーから聞く機能。
reply|Answer a message.|受け取ったメッセージに答える。
forward|Send received content to someone else.|受け取った内容を別の相手へ送る。`),
  '88-study-2': lines(`
desktop|A computer that usually stays at a desk.|通常は机に置いて使うコンピューター。
laptop|A portable computer.|持ち運びのできるコンピューター。
tablet|A device with a flat touch screen.|平らなタッチ画面のある機器。
phone / cell phone / smartphone|A handheld communication device; smartphone emphasizes computing functions.|手で持って使う通信機器。smartphoneはコンピューター機能にも注目した呼び方。
smartwatch|A watch with digital functions.|デジタル機能のある腕時計。
keyboard|Keys for entering information.|情報を入力するキーのある道具。
mouse|A device for controlling a pointer.|画面のポインターを動かす道具。
mouse pad|A surface used beneath a mouse.|マウスの下に置く面。
webcam|A camera used with a computer or similar device.|コンピューターなどと使うカメラ。
charging cable|A cable connecting a device for charging.|充電のために機器をつなぐケーブル。
battery level|The amount of charge remaining.|電池の残りの充電量。
signal|The reception available to a device.|電波などの受信の状態。
router|A device that directs network traffic.|ネットワーク上のデータの流れを振り分ける機器。
Wi-Fi|Wireless networking; it does not by itself guarantee internet access.|無線ネットワーク。つながってもインターネットが使えるとは限らない。
internet provider|A business supplying internet service.|インターネットのサービスを提供する事業者。
hotspot|A connection point for devices.|機器が接続する地点を提供するもの。`),
  '88-study-3': lines(`
account|A user's access or record with a service.|サービスでの利用者のアクセスや記録。
settings|Controls for available options.|利用できる機能などを調整する設定。
menu|A display of choices.|選択肢を並べて見せるもの。
password|Secret information used for access.|アクセスに使う秘密の情報。
link|A reference to another online location.|オンラインの別の場所を指すもの。
click|Select using a pointer.|ポインターで選ぶ。
tap|Select by touch.|触れて選ぶ。
browse|Look through pages.|ページを見て回る。
download|Receive data on your device.|データを自分の機器へ受け取る。
upload|Send data from your device.|自分の機器からデータを送る。
stream|Use content as it is delivered.|送られてくる内容を、その流れに合わせて利用する。
cookies|Data a website stores through a browser; not the same as passwords or computer viruses.|ウェブサイトがブラウザーを通じて保存するデータ。パスワードやウイルスと同じものではない。`),
  '88-study-4': lines(`
post|Published content.|公開された内容。
follower|Someone who follows an account.|アカウントをフォローする人。
like|A reaction to a particular item.|一つの内容に対する「いいね」の反応。
share|Pass content on to others.|内容をほかの人へ渡す。
comment|A response other people can see.|ほかの人にも見える返事やコメント。
DM / direct message|A message through a private channel.|個別の経路で送るメッセージ。
livestream|A live online broadcast.|オンラインの生中継。
scroll|Move through displayed content.|表示している内容を動かして見ていく。
block|Restrict interaction under the platform's rules.|サービスの規則に従ってやり取りを制限する。
troll|Someone deliberately provoking others.|わざとほかの人を挑発する人。
hashtag|A label beginning with #.|#で始まるラベル。
selfie|A photo you take of yourself.|自分を自分で撮った写真。
influencer|Someone whose online presence can influence an audience.|オンラインの活動を通じて、見る人へ影響を与えられる人。
viral|Spreading widely and quickly online.|オンラインで広く急速に広まること。医療でのウイルスとは別の使い方。
podcast|An episode-based media program.|回ごとに配信されるメディア番組。
headline|The title of a news item.|ニュースの見出し。
article|A piece of writing.|一つの文章や記事。
magazine|A periodical publication.|雑誌。
newspaper|A publication carrying news.|新聞。
book|A written publication.|本。
e-reader|A device for reading electronic publications.|電子出版物を読むための機器。
subscription|Ongoing access or delivery under stated terms.|示された条件で継続的に利用や配送を受ける仕組み。
emoji|A small graphic symbol.|小さな画像の記号。
abbreviation|A shortened form.|短くした形、略語。`),
}

const plans = [
  ['89-study-0', ['ch89-b0'], ['ja-89-study-0-0'], false, `
I'm calling about…|State the subject of the call.|電話の用件を伝える。
I'm calling regarding…|State the subject in a more formal style.|用件をやや改まって伝える。
Could I speak with…?|Ask to speak to a particular person.|話したい相手につないでもらう。
Hi / Hello|Either can open a professional call. Give your identity and purpose.|仕事の電話でも使える。必要な名前や所属、用件を添える。`],
  ['90-study-0', ['ch90-b0'], ['ja-90-study-0-0'], false, `
Can you talk for a minute?|Check whether the person can talk now.|今、少し話せるかを確認する。
Is now a bad time?|Check whether the call is inconvenient.|今は都合が悪いかを聞く。`],
  ['90-study-3', ['ch90-b8'], ['ja-90-study-3-4'], false, `
My screen is frozen.|The screen is not responding.|画面が操作に反応しない。
I cracked the screen.|Report physical damage.|画面にひびを入れてしまった。
I've forgotten my PIN.|Report that you cannot remember the access number.|アクセス用の個人識別番号を忘れた。
I'm locked out.|Report an access problem.|アクセスできない状態を伝える。
PIN|A personal identification number used for access.|アクセスに使う個人識別番号。`],
  ['91-study-0', ['ch91-b0'], ['ja-91-study-0-0', 'ja-91-study-0-1'], true, `
network|A system connecting devices.|機器をつなぐ仕組み。
hotspot|A connection point for devices.|機器が接続する地点を提供するもの。
internet service|Internet access supplied by a provider.|事業者が提供するインターネットへのアクセス。
Wi-Fi|Wireless networking; a connection does not necessarily mean internet access works.|無線ネットワーク。接続してもインターネットが正常に使えるとは限らない。
account|A user's access or record with a service.|サービス上の利用者のアクセスや記録。
form|Fields for entering information.|情報を記入するフォーム。
upload|Send data from your device.|自分の機器からデータを送る。
download|Receive data on your device.|自分の機器へデータを受け取る。
confirmation|A message confirming a status or arrangement.|状態や取り決めを確認する通知。`],
  ['91-study-2', ['ch91-b3'], ['ja-91-study-2-0', 'ja-91-study-2-1', 'ja-91-study-2-2'], false, `
I'm booking an appointment.|Arrange an appointment.|予約を取っている。
I'm ordering groceries.|Place an order for food and household supplies.|食料品などを注文している。
I'm tracking a delivery.|Check a delivery's progress.|配達状況を確認している。
I'm paying a bill.|Make a payment for a bill.|請求の支払いをしている。
I'm checking renewal information for my driver's license.|Look up renewal information.|運転免許証の更新情報を調べている。
I'm looking up recipes.|Search for cooking recipes.|料理の作り方を調べている。`],
  ['91-study-2', ['ch91-b5'], ['ja-91-study-2-5', 'ja-91-study-2-6'], false, `
How's it going?|Here, ask how a task is progressing.|ここでは、作業の進み具合を聞く。
webinar|An online seminar.|オンラインのセミナー。
sign up|Register for something.|何かに登録する。
livestream|A live broadcast.|生中継。
I'm making a playlist.|Put together a list of things to play.|再生する曲などの一覧を作っている。
I'm downloading the tickets.|Receive the ticket data on your device.|チケットのデータを機器へ受け取っている。
I'm checking my socials.|Check social-media accounts or activity.|ソーシャルメディアのアカウントや活動を確認している。`],
  ['92-study-0', ['ch92-b0'], ['ja-92-study-0-0'], true, `
frozen|Not responding in the situation described.|この状況で、操作に反応しない。
crash|Software stops working unexpectedly.|ソフトが予期せず動作を停止する。
laggy|Slow or delayed in responding.|反応が遅れる。
down|A service is unavailable.|サービスが使えない状態。
error message|Displayed information about a failure.|不具合について画面に表示される情報。`],
  ['92-study-2', ['ch92-b5'], ['ja-92-study-2-3'], false, `
Try restarting.|A suggestion to restart; clarify what should be restarted.|再起動の提案。何を再起動するのか確認する。
Check the connection.|A suggestion to check the connection.|接続を確認するよう提案する。
Do you mean the app, the device, or the router?|Clarify which object the instruction refers to.|アプリ、機器、ルーターのどれを指すかを確認する。
I've already tried that.|Give useful history about what you tried.|すでに試したことを伝える。`],
  ['93-study-0', ['ch93-b0', 'ch93-b1'], ['ja-93-study-0-0', 'ja-93-study-0-1', 'ja-93-study-0-2'], true, `
inbox|Received messages.|受信したメッセージの場所。
draft|A message saved without sending.|送信せずに保存したメッセージ。
spam / junk|Messages treated as unwanted by the service.|サービスが不要と扱うメールのフォルダー。
trash|Deleted messages; recovery depends on the service and settings.|削除したメッセージ。戻せるかはサービスや設定による。
outbox|Messages waiting to be sent.|送信を待つメッセージの場所。
contact|A saved person or address you can message.|メッセージを送れる人やアドレスを保存したもの。
attachment|A file sent with a message.|メッセージと一緒に送るファイル。
forward|Send a received message to someone else.|受け取ったメールを別の人へ送る。
reply|Answer the sender.|送り手に答える。
reply all|Answer the sender and other recipients included in the reply. Check the recipients first.|返信に含まれるほかの受信者にも答える。先に宛先を確かめる。
signature|Saved closing text, such as your name and contact details.|名前や連絡先など、最後に付ける保存済みの定型文。`],
  ['95-study-0', ['ch95-b0'], ['ja-95-study-0-0'], true, `
follow|Receive or find an account's updates through the platform.|サービスを通じてアカウントの更新内容を受け取ったり見つけたりする。
share|Pass content on.|内容をほかの人へ渡す。
comment|Respond where other people can see it.|ほかの人にも見える場所で答える。
DM / direct message|Use a private messaging channel. This does not guarantee the recipient will keep the content secret.|個別のメッセージ経路を使う。受け手が秘密にしておく保証ではない。`],
  ['95-study-1', ['ch95-b3'], ['ja-95-study-1-0', 'ja-95-study-1-1'], true, `
goes viral|Spreads widely and quickly; there is no single required number.|広く速く広まること。一つの決まった数値はない。
followers|People who follow an account.|アカウントをフォローする人。
likes|Reactions to a particular item.|一つの内容への反応。
reach|How many people content gets to; followers, reach, and likes are different measures.|内容が何人に届くか。フォロワー数や反応の数とは別の指標。`],
  ['95-study-2', ['ch95-b7'], ['ja-95-study-2-1', 'ja-95-study-2-2'], false, `
What do you mean by that?|Ask for clarification.|意味を確かめる。
I don't agree, but I see your point.|Continue a discussion while expressing disagreement.|意見の違いと相手への理解を伝える。
Please stop messaging me.|Set a direct boundary.|メッセージをやめてほしいとはっきり伝える。
I'm going to block that account.|Describe your choice to stop contact; functions depend on the platform.|連絡を止める選択を伝える。機能はサービスによる。`],
  ['96-study-0', ['ch96-b2'], ['ja-96-study-0-3', 'ja-96-study-0-4'], true, `
novel|A long work of fiction.|長い創作の作品、小説。
mystery|A story centered on something to be explained, often a crime.|説明されるべき謎を中心とする物語。犯罪を題材にすることが多い。
biography|An account of a person's life.|ある人の生涯を描く伝記。
autobiography|An account of a person's life written by that person.|本人が自分の生涯を書いた自伝。
fiction|Invented stories.|作られた物語。
nonfiction|Writing on factual subjects; a writer's claims can still be questioned.|事実に関する題材を扱う文章。書き手の主張には疑問を持つこともできる。`],
  ['96-study-2', ['ch96-b9'], ['ja-96-study-2-0', 'ja-96-study-2-1'], false, `
I skim the headlines first.|Read quickly for the main points.|見出しをさっと読み、主な点をつかむ。
I flip through the magazine.|Look through its pages without necessarily reading everything.|雑誌のページを見ていく。すべて読むとは限らない。
subscription|Continuing access or delivery under stated terms.|示された条件で継続的に利用や配送を受ける仕組み。
renew|Continue for a new period.|期間を新しく続ける。
How much would it cost to renew?|Ask about the renewal cost.|更新の費用を尋ねる。`],
].map(([section, en, ja, vocabulary, value]) => ({ section, en, ja, vocabulary, rows: lines(value) }))

function tableFor(blocks, rows, language, vocabulary = false) {
  const [first] = blocks
  return { ...first, source: {
    ...first.source, type: 'table', presentation: 'expression-meaning', teachingNote: undefined,
    runs: undefined, items: undefined,
    sourceBlockIds: blocks.flatMap((block) => block.source.sourceBlockIds ?? [block.id]),
    phraseIds: [...new Set(blocks.flatMap((block) => block.source.phraseIds ?? []))],
    header: labels(language, vocabulary),
    rows: rows.map(([term, en, ja]) => [run(term, true), run(language === 'ja' ? ja : en)]),
    editorialRewrite: true,
  } }
}

// Definition paragraphs elsewhere use the source's own emphasized terms and
// wording. A list of adjacent terms with a shared meaning remains one row.
export function definitionTable(source, language, vocabulary = false) {
  if (source.type !== 'explanation' || (source.teachingNote && !vocabulary) || !source.runs) return null
  const text = plain(source.runs)
  let offset = 0
  const markers = []
  for (const r of source.runs) {
    if (r.emphasis && /[a-z]/i.test(r.text) && r.text.trim().length < 145) markers.push({ start: offset, end: offset + r.text.length })
    offset += r.text.length
  }
  if (markers.length < 2) return null
  const groups = []
  for (const marker of markers) {
    const previous = groups.at(-1)
    const between = previous && text.slice(previous.end, marker.start)
    if (previous && /^(?:\s|[,/、]|and|or|often|a|an|the|と|や|または|・)*$/i.test(between)) previous.end = marker.end
    else groups.push({ ...marker })
  }
  if (groups.length < 2) return null
  // Narrative uses of highlighted words are not definitions.
  const definition = language === 'ja'
    ? (value) => /^\s*(?:は|、|を|が|に)/.test(value)
    : (value) => /^\s*(?:is |are |means? |describes? |names? |refers? |can (?:be|refer|describe)|may offer|usually |shows? |covers? |has |have |keeps? |lets? |connects? |controls? |reports? |directs? |supplies? |provides? |gives? |documents? |works? |assesses? |helps? |performs? |specializes? |fits? |buys? |handles? |hires? |freezes? |cooks? |washes? |excludes? |offers? |serves? |combines? |asks? |requests? |expresses? |identifies? |states? |tells? |checks? |invites? |adds? |opens? |begins? |seeks? |acknowledges? |indicates? |accepts? |declines? |confirms? |marks? |free from)/i.test(value)
  const descriptions = groups.map((group, index) => text.slice(group.end, groups[index + 1]?.start ?? text.length)
    .replace(/(?:[.;]\s*|\s+)(?:a|an|the|to)\s*$/i, (match) => match.trim().match(/^[.;]/)?.[0] ?? '')
    .replace(/\s+(?:and|while|to identify an object,)\s*$/i, '')
    .replace(/^[,;]\s*/, '').trim())
  if (descriptions.filter(definition).length < Math.max(2, Math.ceil(groups.length * .65))) return null
  if (descriptions.slice(0, -1).some((description) => !description)) return null
  const prefix = text.slice(0, groups[0].start).trim()
  const contextualPrefix = prefix && !/^(?:a|an|the|to|here|the following)$/i.test(prefix)
  if (contextualPrefix && !vocabulary) return null
  return { ...source, type: 'table', presentation: 'expression-meaning', runs: undefined,
    teachingNote: undefined,
    referencePreface: contextualPrefix ? prefix : undefined,
    header: labels(language, vocabulary),
    rows: groups.flatMap((group, index) => {
      const term = text.slice(group.start, group.end)
      if (!descriptions[index]) return []
      const trailingExample = index === groups.length - 2 && !descriptions[index + 1]
        ? ' ' + text.slice(groups[index + 1].start) : ''
      return [[run(term, true), run(descriptions[index] + trailingExample)]]
    }),
    // These grammatical joins are intentionally removed, with every definition
    // and target retained. Tests check the row contents rather than raw prose.
    reformattedDefinition: true,
  }
}

export function referenceStudyPresentation(section, blocks, chapterId, language) {
  let result = blocks
  const sectionPlans = plans.filter((plan) => plan.section === section.id)
  if (media[section.id]) sectionPlans.push({
    en: result.filter((b) => b.source?.runs).map((b) => b.id),
    ja: result.filter((b) => b.source?.runs).map((b) => b.id), rows: media[section.id], vocabulary: true,
  })
  for (const plan of sectionPlans) {
    const selected = result.filter((block) => plan[language].includes(block.id))
    if (!selected.length) continue
    const replacement = tableFor(selected, plan.rows, language, plan.vocabulary)
    result = result.flatMap((block) => block === selected[0] ? [replacement] : selected.includes(block) ? [] : [block])
  }
  return result.map((block) => {
    if (!block.source) return block
    if (section.id === '96-study-0' && ['ch96-b0', 'ja-96-study-0-0'].includes(block.id)) {
      return { ...block, source: { ...block.source, runs: [], presentation: 'anchor-only', editorialRewrite: true } }
    }
    if (section.id === '88-study-0') return { ...block, source: { ...block.source, editorialRewrite: true,
      runs: run(language === 'ja'
        ? '電話で話す、メッセージを送る、投稿を共有する、ニュースを読む。メディアと通信は毎日の生活に身近です。まず、自分がよく使う機器や行動の言葉から見ていきましょう。'
        : 'We use media and communication every day: calling friends, sending messages, sharing posts, and reading the news. Start with the devices and actions you use most.') } }
    if (section.id === '93-study-1' && block.source.paragraphs) return { ...block, source: { ...block.source,
      presentation: block.source.type === 'email' ? 'email-anatomy' : 'email-reply' } }
    if (section.id === '93-study-1' && ['ch93-b6', 'ch93-b9', 'ja-93-study-1-1', 'ja-93-study-1-5'].includes(block.id)) return { ...block,
      source: { ...block.source, runs: [], presentation: 'anchor-only', editorialRewrite: true } }
    if (section.id === '93-study-1' && block.source.runs) return { ...block,
      source: { ...block.source, teachingNote: 'Note' } }
    if (section.id === '91-study-3' && ['ch91-b6', 'ja-91-study-3-1'].includes(block.id)) return { ...block,
      source: { ...block.source, presentation: 'sample-form', editorialRewrite: true } }
    if (section.id === '91-study-3' && ['ja-91-study-3-0', 'ja-91-study-3-2'].includes(block.id)) return { ...block,
      source: { ...block.source, teachingNote: 'Note' } }
    if (section.id === '93-study-2' && ['ch93-b12', 'ja-93-study-2-0'].includes(block.id)) return { ...block,
      source: { ...block.source, teachingNote: 'Note', editorialRewrite: true, runs: [
        { text: "I wasn't expecting this file. Did you send it?", emphasis: true },
        { text: language === 'ja' ? ' 本物と分かっている連絡先で、予期しない依頼を確認します。' : ' Confirm an unexpected request through contact details you already know are genuine.' },
      ] } }
    const source = definitionTable(block.source, language, vocabularyChapters.has(chapterId))
    return source ? { ...block, source } : block
  })
}
