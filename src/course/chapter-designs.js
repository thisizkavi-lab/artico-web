// Editorial visual decisions for every chapter. Concrete terms use objects;
// abstract language uses a relationship or action, never an arbitrary icon.
const designs = {}
function chapter(id, theme, ja, note, items, options = {}) {
  designs[id] = {
    theme,
    ja,
    note,
    vocabulary: items.map(([en, ja, art]) => ({ en, ja, art })),
    ...options,
  }
}

chapter(
  '01',
  'greeting',
  'あいさつから、短いやりとりへ。',
  '返事は自分の状態に合わせます。How are you? と久しぶりの How have you been? は、尋ねる期間が違います。',
  [
    ['Good morning.', '朝のあいさつ', 'greeting'],
    ['Good to see you.', 'また会えてうれしい', 'friend'],
    ['How’s it going?', '調子はどう？', 'greeting'],
    ['It’s been a while.', '久しぶりですね', 'calendar'],
  ],
)
chapter(
  '02',
  'meeting',
  '名前と、つながりを伝える。',
  '名前のあとに、ここにいる理由を一つ。仕事の場面では役割を添え、人を紹介するときは両方の人に声をかけます。',
  [
    ['friend', '友人', 'friend'],
    ['colleague', '同僚', 'coworker'],
    ['name', '名前', 'name-tag'],
    ['photography class', '写真のクラス', 'camera'],
  ],
  {
    sceneThemes: ['meeting', 'office', 'introducing', 'introducing'],
    approvedScenes: { 0: 'd5e3b.svg' },
    translations: {
      "Hi, I'm Alex. I'm a friend of Cassie's.": 'アレックスです。キャシーの友人です。',
      "I'm Anna. Nice to meet you.": 'アンナです。はじめまして。',
      'You too.': 'こちらこそ。',
      "Hello, I'm Satoshi. I'm the project manager.":
        'サトシです。プロジェクトマネージャーです。',
      "Daniel Reed. It's a pleasure to meet you.":
        'ダニエル・リードです。お会いできてうれしいです。',
      'Likewise. Please call me Satoshi.': 'こちらこそ。サトシと呼んでください。',
      "Thanks, Satoshi. I'm on the research team.": 'ありがとう、サトシ。私は調査チームにいます。',
      'Anna, this is my colleague, Sam. Sam, this is Anna.':
        'アンナ、同僚のサムです。サム、こちらはアンナです。',
      'Nice to meet you, Sam.': 'サム、はじめまして。',
      'You too. How do you know Alex?': 'こちらこそ。アレックスとはどんな知り合いですか？',
      'We take a photography class together.': '一緒に写真のクラスに通っています。',
      'Have you met Sam?': 'サムとは会ったことがありますか？',
      'Yes, we met at the last workshop. Good to see you again, Sam.':
        'はい、前のワークショップで会いました。サム、また会えてうれしいです。',
    },
  },
)
chapter(
  '03',
  'listening',
  '考える時間と、聞いているサイン。',
  'Well は考える間、Actually は情報の訂正など、言葉ごとに役割があります。相づちは相手の出来事に合うものを選びます。',
  [
    ['Well…', '考えながら話を始める', 'listening'],
    ['Actually…', '情報を訂正する', 'document'],
    ['Oh no!', '困った出来事への反応', 'support'],
    ['That sounds fun.', '楽しそうですね', 'friend'],
  ],
)
chapter(
  '04',
  'reception',
  '分からないときの聞き返し。',
  '聞き逃した部分や分からない表現を具体的に尋ね、相手の説明を自分の言葉で確かめると、会話を自然に続けられます。',
  [],
  {
    sceneThemes: ['college', 'reception', 'office'],
    translations: {
      'The workshop starts at ten thirty in Room 214.': 'ワークショップは10時30分に214号室で始まります。',
      "Sorry, I didn't catch the room number. Was that 214 or 240?": 'ごめん、部屋番号を聞き取れなかった。214？ それとも240？',
      'Room 214.': '214号室だよ。',
      "Okay, Room 214. Thanks. I'll see you there.": '分かった、214号室だね。ありがとう。じゃあ、そこで。',
      'See you then.': 'じゃあ、そのときに。',
      "You'll need to turn in the form by Friday.": 'その用紙、金曜日までに提出してね。',
      "Sorry, what does 'turn in' mean here?": 'ごめん、ここでの turn in ってどういう意味？',
      'It just means submit it—give the completed form to the office.': '提出するってこと。記入済みの用紙を事務室に渡すんだよ。',
      'Oh, so I can drop it off at the front desk?': 'じゃあ、受付に持って行けばいい？',
      'Exactly. You can hand it to the receptionist.': 'そう。受付の人に渡せばいいよ。',
      "Got it. I'll drop it off tomorrow.": '分かった。明日持って行くね。',
      'Perfect. Thanks.': 'それで大丈夫。ありがとう。',
      "To submit the request, open the portal, sign in, choose 'New request', attach the PDF, and click Submit.": '申請するには、ポータルを開いてサインインし、「New request」を選び、PDFを添付して「Submit」をクリックしてね。',
      "Sorry, could you slow down a little? I got as far as 'New request', but I lost you after that.": 'ごめん、もう少しゆっくり話してもらえる？「New request」までは分かったけど、その先を聞き逃した。',
      "Of course. After you choose 'New request', click 'Choose file' and select the PDF.": 'もちろん。「New request」を選んだら、「Choose file」をクリックしてPDFを選んでね。',
      "I'm not sure I follow—where do I find the file?": 'まだよく分からないんだけど、ファイルはどこにあるの？',
      'It should be in your Downloads folder.': 'Downloadsフォルダーにあるはずだよ。',
      'Oh, I see. Then I click Submit?': 'ああ、分かった。それから「Submit」をクリックするの？',
      "Exactly. You'll get a confirmation email.": 'そう。確認メールが届くよ。',
      "So I don't need to email the PDF separately?": 'じゃあ、PDFを別にメールで送る必要はないの？',
      "That's right. Uploading it here is enough.": 'そのとおり。ここにアップロードすれば大丈夫。',
      'Got it. Thanks for walking me through it.': '分かった。順番に説明してくれてありがとう。',
    },
  },
)
chapter(
  '05',
  'choice',
  '好みと意見を、自分の強さで。',
  'I prefer… は選択、I think… は意見。好き嫌いの強さを変えても、相手と同じ好みにする必要はありません。',
  [
    ['I’m into photography.', '写真に興味があります', 'camera'],
    ['It’s not my thing.', 'あまり自分の好みではありません', 'choice'],
    ['I’d rather take it home.', '持ち帰るほうがいいです', 'package'],
    ['Either is fine.', 'どちらでもいいです', 'choice'],
  ],
)
chapter(
  '06',
  'discussion',
  '賛成・反対を、はっきり伝える。',
  '相手の気持ちを理解することと、結論に賛成することは別です。賛成する点と違う点を分けて伝えられます。',
  [
    ['I agree.', '賛成です', 'agreement'],
    ['I hear you.', '言いたいことはわかります', 'listening'],
    ['I see it differently.', '私は違う見方をしています', 'discussion'],
    ['Fair enough.', 'そういう考えもわかります', 'agreement'],
  ],
)
chapter(
  '07',
  'invitation',
  '提案から、誘いと返事へ。',
  'Sure は受け入れ、Maybe はまだ未定です。断ったあとは代案を出すことも、そのまま断ることもできます。',
  [
    ['We could get lunch.', 'お昼を食べるのはどう？', 'plate'],
    ['Do you want to join us?', '一緒に参加しませんか？', 'invitation'],
    ['I’ll pass tonight.', '今夜はやめておきます', 'choice'],
    ['Let me check.', '確認させてください', 'calendar'],
  ],
)
chapter(
  '08',
  'thanks',
  '何に感謝するか、言葉にする。',
  'Thanks for… のあとに物事や動作を添えます。同じ言葉でも、声の調子と場面によって皮肉になることがあります。',
  [
    ['umbrella', '傘', 'umbrella'],
    ['birthday gift', '誕生日の贈り物', 'gift'],
    ['Thanks for waiting.', '待ってくれてありがとう', 'thanks'],
    ['Happy to help.', '役に立ててよかったです', 'support'],
  ],
)
chapter(
  '09',
  'apology',
  '謝罪と、気持ちをいたわる言葉。',
  '自分のミスへの謝罪と、相手のつらい出来事への共感は別の使い方です。謝罪を受ける側も、気持ちや希望を伝えられます。',
  [
    ['That was my mistake.', '私のミスでした', 'apology'],
    ['I’ll correct it.', '訂正します', 'document'],
    ['Please ask me next time.', '次は先に聞いてください', 'discussion'],
    ['I’m sorry for your loss.', 'お悔やみを伝える言葉', 'support'],
  ],
)
chapter(
  '10',
  'goodbye',
  '会話を終え、次のつながりへ。',
  'See you soon はあいさつにもなります。具体的な予定が決まったかどうかは、日時と相手の返事で確認します。',
  [
    ['I should get going.', 'そろそろ行かないと', 'goodbye'],
    ['Good talking with you.', 'お話しできてよかったです', 'phone'],
    ['Take care.', '元気でね', 'friend'],
    ['See you on Tuesday.', '火曜日に会いましょう', 'calendar'],
  ],
)
chapter(
  '11',
  'calendar',
  '日付・時刻・長さを区別する。',
  '開始時刻、所要時間、頻度は別の情報です。数字だけの日付や気温は、形式や単位も確認します。',
  [
    ['April seventh', '4月7日', 'calendar'],
    ['six fifteen p.m.', '午後6時15分', 'clock'],
    ['twice a week', '週に2回', 'calendar'],
    ['cloudy', '曇り', 'cloud'],
  ],
  { diagram: 'calendar' },
)
chapter(
  '12',
  'arrangement',
  '日時と場所を、合意まで。',
  '提案だけでは予定は確定しません。相手の返事、日時、待ち合わせ場所をそろえ、変更したときももう一度確認します。',
  [
    ['Are you free on Friday?', '金曜日は空いていますか？', 'calendar'],
    ['front entrance', '正面入口', 'house'],
    ['I’m running late.', '遅れそうです', 'clock'],
    ['Can we reschedule?', '日程を変更できますか？', 'arrangement'],
  ],
)
chapter(
  '13',
  'weather',
  '今の天気と、予報を話す。',
  '今見えている天気と、予報の可能性を分けます。Beautiful day と言われても、同じ感想を持つ必要はありません。',
  [
    ['sunny', '晴れ', 'sun'],
    ['windy', '風が強い', 'wind'],
    ['a chance of rain', '雨が降る可能性', 'rain'],
    ['forecast', '天気予報', 'calendar'],
  ],
)
chapter(
  '14',
  'family',
  '家族のつながりを、図で理解する。',
  '家族の呼び方は関係を表す言葉です。step- と half- の違いを架空の家族で確認します。親しさや気持ちは、呼び方だけではわかりません。',
  [
    ['parent', '親', 'family'],
    ['sibling', 'きょうだい', 'family'],
    ['stepsister', '継親の娘との関係', 'family'],
    ['half-brother', '一方の実親が共通の兄弟', 'family'],
  ],
  { diagram: 'family' },
)
chapter(
  '15',
  'family-chat',
  '家族について、話す範囲を選ぶ。',
  '関係と、会う頻度や親しさは別です。話したくない内容なら、無理に詳しく説明せず境界を伝えられます。',
  [
    ['older sister', '姉', 'family'],
    ['grandchildren', '孫たち', 'family'],
    ['We talk every week.', '毎週話します', 'phone'],
    ['I’d rather not talk about that.', 'そのことは話したくありません', 'discussion'],
  ],
)
chapter(
  '16',
  'celebration',
  '相手のニュースに合う返事。',
  'お祝い、応援、お悔やみは出来事と相手の気持ちに合わせます。相手が喜んでいるか、複雑な気持ちかも聞き取ります。',
  [
    ['Congratulations!', 'おめでとう！', 'gift'],
    ['Happy birthday!', '誕生日おめでとう！', 'gift'],
    ['promotion', '昇進', 'coworker'],
    ['new place', '新しい住まい', 'house'],
  ],
)
chapter(
  '17',
  'social',
  '話に入り、つながりを見つける。',
  '相手の答えから、次の質問を一つ。共通点を探しながら、話題を変えたいときや離れたいときの言葉も持っておきます。',
  [
    ['Mind if I join you?', 'ご一緒してもいいですか？', 'invitation'],
    ['So did I.', '私もそうでした', 'agreement'],
    ['cooking class', '料理のクラス', 'pan'],
    ['jacket', 'ジャケット', 'jacket'],
  ],
)
chapter(
  '18',
  'date',
  '誘いの意味と、自分の意思。',
  '予定が合わないことと、デートを望まないことは別です。誘う、確認する、断る場面で、自分と相手の意思を明確にします。',
  [
    ['Do you mean as a date?', 'デートという意味ですか？', 'date'],
    ['I’m not interested in a date.', 'デートは望んでいません', 'choice'],
    ['Not right now.', '今は望んでいません', 'discussion'],
    ['coffee', 'コーヒー', 'coffee'],
  ],
)
chapter(
  '19',
  'support',
  'まず聞き、具体的な助けを。',
  '励ましは結果の保証ではありません。話を聞くこと、荷物を手伝うことなど、できる範囲の助けを伝えます。',
  [
    ['That sounds hard.', '大変そうですね', 'support'],
    ['It’s worth a shot.', 'やってみる価値があります', 'invitation'],
    ['boxes', '箱', 'box'],
    ['Do you want to talk?', '話したいですか？', 'listening'],
  ],
)
chapter(
  '20',
  'food-vocabulary',
  '飲み物・道具・調理の言葉。',
  '全部を一度に覚える必要はありません。注文、調理、メニューを読むなど、今使いたい目的に合わせて言葉を選びます。',
  [
    ['black coffee', 'ブラックコーヒー', 'coffee'],
    ['reusable cup', '繰り返し使えるカップ', 'bottle'],
    ['whisk', '泡立て器', 'whisk'],
    ['skillet', 'フライパン', 'pan'],
  ],
)
chapter(
  '21',
  'cafe',
  '注文を、一つずつ組み立てる。',
  '飲み物、サイズ、温度、ミルク、持ち帰りか店内か。聞かれた選択肢に答え、品切れなら別の注文を選びます。',
  [
    ['iced latte', 'アイスラテ', 'coffee'],
    ['oat milk', 'オーツミルク', 'milk'],
    ['for here', '店内で', 'plate'],
    ['to go', '持ち帰りで', 'package'],
  ],
)
chapter(
  '22',
  'delivery',
  '受け取り方法と、注文内容を確認。',
  'Pickup と delivery を区別します。住所、到着予定、欠けている品を具体的に伝え、相手が提示した選択肢に答えます。',
  [
    ['pickup', '店で受け取る', 'package'],
    ['delivery address', '配達先の住所', 'house'],
    ['apartment three', '3号室', 'key'],
    ['the fries are missing', 'フライドポテトが入っていません', 'plate'],
  ],
)
chapter(
  '23',
  'bar',
  '飲み物を選び、会計まで。',
  '量や付け合わせも注文の一部です。追加注文と、開いている会計を締めることは違います。飲まない選択も伝えられます。',
  [
    ['a pint', '飲み物の量の単位', 'bottle'],
    ['mocktail', 'ノンアルコールのカクテル', 'water'],
    ['a round', 'みんなの分の飲み物', 'thanks'],
    ['close out my tab', 'まとめていた会計を済ませる', 'receipt'],
  ],
)
chapter(
  '24',
  'restaurant',
  '席・注文・困りごと・会計。',
  '食材の好みと、アレルギーについての確認は別です。間違った料理が来たら、頼んだ物と実際に来た物を分けて伝えます。',
  [
    ['reservation', '予約', 'calendar'],
    ['menu', 'メニュー', 'menu'],
    ['on the side', '別添えで', 'plate'],
    ['the check', '飲食店の会計', 'receipt'],
  ],
)
chapter(
  '25',
  'kitchen',
  '動作と順番を、見て理解する。',
  'Chop / stir などの動作と、then / while などの順序を結びつけます。同時にすることと、後からすることを区別します。',
  [
    ['chop', '切り刻む', 'knife'],
    ['whisk', '泡立て器で混ぜる', 'whisk'],
    ['set the table', '食卓を用意する', 'plate'],
    ['do the dishes', '食器を洗う', 'sink'],
  ],
  { diagram: 'sequence' },
)
chapter(
  '26',
  'hobbies-vocabulary',
  '活動の名前を、絵と結びつける。',
  '活動名だけでなく、どんなことをするかも短く説明します。自分の興味に合う言葉を選んで、声に出して使います。',
  [
    ['photography', '写真', 'camera'],
    ['pottery', '陶芸', 'pot'],
    ['board game', 'ボードゲーム', 'game'],
    ['playing the guitar', 'ギターを弾くこと', 'guitar'],
  ],
)
chapter(
  '27',
  'cinema',
  '上映回を選び、感想を伝える。',
  '作品、時間、席、必要な設備を具体的に尋ねます。見終わった感想は、よかった点と気になった点の両方を話せます。',
  [
    ['showing', '上映回', 'ticket'],
    ['two seats together', '隣り合う2席', 'stage'],
    ['captions', '字幕', 'tv'],
    ['elevator', 'エレベーター', 'house'],
  ],
)
chapter(
  '28',
  'theater',
  'チケットから、席と休憩時間へ。',
  '予約名と確認番号でチケットを特定します。Row は列、seat は席。休憩の長さと戻る時刻も別に確認します。',
  [
    ['box office', 'チケット窓口', 'ticket'],
    ['row B', 'B列', 'stage'],
    ['aisle', '通路', 'directions'],
    ['intermission', '公演の途中の休憩', 'clock'],
  ],
)
chapter(
  '29',
  'festival',
  '人が多い場所で、場所と時間を。',
  '入場時刻と演奏時刻は別です。テントの場所や待ち合わせには、目印、番号、時刻をそろえて伝えます。',
  [
    ['main stage', 'メインステージ', 'stage'],
    ['wristband', '入場用のリストバンド', 'ticket'],
    ['tent', 'テント', 'tent'],
    ['north gate', '北側のゲート', 'map'],
  ],
)
chapter(
  '30',
  'gym',
  'プランを理解し、参加を選ぶ。',
  '会員費、追加料金、自動更新を別々に確認します。体験だけにすることもできます。初めての器具は使い方を尋ねます。',
  [
    ['day pass', '1日利用券', 'ticket'],
    ['membership', '会員制度', 'card'],
    ['cycling class', '室内サイクリングのクラス', 'bike'],
    ['a workout', '運動・トレーニング', 'dumbbell'],
  ],
)
chapter(
  '31',
  'sports',
  '参加の意思と、試合中の短い声。',
  '参加する、見学する、今回は断る。それぞれを伝えます。試合中の短い呼びかけは、相手がすぐ動ける言葉です。',
  [
    ['basketball', 'バスケットボール', 'basketball'],
    ['tennis', 'テニス', 'tennis'],
    ['Pass it to me!', 'こっちにパスして！', 'sports'],
    ['a beginner', '初心者', 'invitation'],
  ],
)
chapter(
  '32',
  'stadium',
  '席と総額を確認し、観戦する。',
  '1枚の価格と、手数料を含む総額は別です。観戦場所を決める会話と、試合への反応を使い分けます。',
  [
    ['reserved seats', '指定席', 'ticket'],
    ['order fee', '購入手数料', 'receipt'],
    ['rooting for', '応援している', 'sports'],
    ['We blew that lead.', 'リードを失ってしまった', 'basketball'],
  ],
)
chapter(
  '33',
  'hobby-chat',
  '趣味の話を、次の質問へ。',
  'For は期間、since は始めた時点を示します。上手でなくても、今取り組んでいることや感想を話せます。',
  [
    ['photography', '写真', 'camera'],
    ['play guitar', 'ギターを弾く', 'guitar'],
    ['I’m still learning.', 'まだ練習中です', 'book'],
    ['for about two years', '約2年間', 'calendar'],
  ],
)
chapter(
  '34',
  'shops',
  '場所と、支払いの言葉。',
  'お店や窓口の名前は、必要なサービスを探す手がかりです。Refund は返金、exchange は交換です。',
  [
    ['grocery store', '食料品店', 'cart'],
    ['post office', '郵便局', 'letter'],
    ['receipt', 'レシート', 'receipt'],
    ['debit card', 'デビットカード', 'card'],
  ],
)
chapter(
  '35',
  'market',
  '品物・数量・価格を確かめる。',
  '1個、1かご、重さ当たり。値段の単位を確認します。値引きの希望を出しても、相手の提示を受けるかは自分で選びます。',
  [
    ['strawberries', 'いちご', 'strawberry'],
    ['a basket', 'ひとかご', 'cart'],
    ['lamp', 'ランプ', 'lamp'],
    ['How much are they?', 'いくらですか？', 'receipt'],
  ],
)
chapter(
  '36',
  'supermarket',
  '売り場から、レジでのやりとりへ。',
  'Aisle は店内の通路です。見つからなかった品、袋の希望、読み取れない商品など、実際の問題を伝えます。',
  [
    ['oat milk', 'オーツミルク', 'milk'],
    ['aisle two', '2番通路', 'cart'],
    ['cereal', 'シリアル', 'package'],
    ['It won’t scan.', '読み取れません', 'receipt'],
  ],
)
chapter(
  '37',
  'garden',
  '置く場所に合う植物を選ぶ。',
  '光、広さ、水やりの条件を説明してから選びます。見た目の好みと、育てる条件の両方を確かめます。',
  [
    ['plant', '植物', 'plant'],
    ['pot', '植木鉢', 'pot'],
    ['bright indirect light', '明るい間接光', 'sun'],
    ['watering', '水やり', 'water'],
  ],
)
chapter(
  '38',
  'hardware',
  '作業を説明して、道具を探す。',
  'どこを何のために直すのかを伝えると、必要な商品を確認しやすくなります。用途が合うか、わからない言葉も尋ねます。',
  [
    ['picture-hanging supplies', '絵を掛けるための用品', 'hammer'],
    ['paint', '塗料', 'paint'],
    ['walls', '壁', 'house'],
    ['ceiling', '天井', 'house'],
  ],
)
chapter(
  '39',
  'clothes',
  'サイズを試し、着心地を伝える。',
  'サイズの数字だけでなく、tight / loose など実際の合い方を話します。試着したあと、買うかどうかを伝えます。',
  [
    ['jacket', 'ジャケット', 'jacket'],
    ['shoes', '靴', 'shoe'],
    ['try it on', '試着する', 'clothes'],
    ['a medium', 'Mサイズ', 'medium-jacket'],
  ],
)
chapter(
  '40',
  'returns',
  '理由を伝え、返金か交換か。',
  '返したい品物、理由、希望する対応を分けます。この章の架空の返品条件を読み、使える選択肢を確認します。',
  [
    ['refund', '返金', 'card'],
    ['exchange', '交換', 'package'],
    ['receipt', 'レシート', 'receipt'],
    ['It doesn’t fit.', 'サイズが合いません', 'jacket'],
  ],
)
chapter(
  '41',
  'salon',
  '希望する仕上がりを、具体的に。',
  'Just a trim は少し整える希望です。切る量、長さ、色などを確認し、提案された内容に納得してから答えます。',
  [
    ['haircut', 'ヘアカット', 'scissors'],
    ['just a trim', '少し整えるだけ', 'salon'],
    ['keep the length', '長さを変えずに', 'salon'],
    ['appointment', '予約', 'calendar'],
  ],
)
chapter(
  '42',
  'post',
  '荷物の行き先と、届く見込み。',
  '配送先、到着の希望、追跡番号を区別します。届いていない場合は、確認できる事実と求める対応を伝えます。',
  [
    ['package', '荷物', 'package'],
    ['tracking number', '追跡番号', 'receipt'],
    ['delivery notice', '配達のお知らせ', 'letter'],
    ['postage', '郵送料', 'letter'],
  ],
)
chapter(
  '43',
  'bank',
  '口座・お金の移動・手数料。',
  'Deposit は入金、withdraw は引き出し。希望する取引と、確認したい金額や手数料を明確にします。',
  [
    ['checking account', '日常の支払い用の口座', 'card'],
    ['deposit', '入金する', 'bank'],
    ['withdraw', '引き出す', 'bank'],
    ['statement', '取引明細', 'receipt'],
  ],
)
chapter(
  '44',
  'library',
  '本を探し、借りる条件を確認。',
  '探しているテーマや形式を伝えます。Check out はここでは借りること。返却日や延長の可否も確認します。',
  [
    ['library card', '図書館の利用カード', 'card'],
    ['check out a book', '本を借りる', 'book'],
    ['renew', '貸出期間を延長する', 'calendar'],
    ['e-book', '電子書籍', 'tablet'],
  ],
)
chapter(
  '45',
  'work-vocabulary',
  '仕事と学びを表す言葉。',
  '職業、教育、働き方を分けて整理します。自分の経験や、これから尋ねたい仕事に必要な言葉を選びます。',
  [
    ['receptionist', '受付担当者', 'reception'],
    ['mechanic', '整備士', 'car'],
    ['pharmacist', '薬剤師', 'pharmacy'],
    ['freelancer', 'フリーランス', 'laptop'],
  ],
)
chapter(
  '46',
  'school',
  '学校で、子どもと先生をつなぐ。',
  '見学の質問、初日の紹介、学習についての相談は別の場面です。進歩と困っている点を、具体的な質問で聞きます。',
  [
    ['teacher', '先生', 'school'],
    ['student', '生徒', 'book'],
    ['reading', '読むこと', 'book'],
    ['math', '算数・数学', 'document'],
  ],
)
chapter(
  '47',
  'college',
  '学びの条件と、必要な支援。',
  '期間、授業日、費用を比べます。授業についていけないときは、どの部分が難しいかを伝えて支援を尋ねます。',
  [
    ['certificate', '修了証・資格課程', 'document'],
    ['degree', '学位', 'cap'],
    ['department', '学科・部門', 'house'],
    ['photography club', '写真のクラブ', 'camera'],
  ],
)
chapter(
  '48',
  'job-search',
  '希望と経験を、短く伝える。',
  '求人がまだ募集中かを確認します。働ける時間と、過去の経験を区別し、ない経験をあるように話す必要はありません。',
  [
    ['position', '募集している職種', 'document'],
    ['part-time', 'パートタイム', 'clock'],
    ['customer-service experience', '接客の経験', 'coworker'],
    ['availability', '働ける日時', 'calendar'],
  ],
)

chapter(
  '49',
  'application',
  '経験を、応募書類の情報へ。',
  '履歴書、カバーレター、応募フォームは役割が違います。架空の応募者の事実を使い、提出形式と締切を確認します。',
  [
    ['resume', '履歴書', 'document'],
    ['cover letter', '応募時の紹介文', 'letter'],
    ['deadline', '締切', 'clock'],
    ['earliest start date', '最も早く勤務を始められる日', 'calendar'],
  ],
)
chapter(
  '50',
  'interview',
  '経験と具体例で、答えをつくる。',
  '強みは具体的な経験と一緒に話します。質問が不明なら確認し、自分からも仕事や研修について尋ねます。',
  [
    ['strengths', '強み', 'coworker'],
    ['training', '研修', 'book'],
    ['pay range', '給与の範囲', 'receipt'],
    ['customer orders', 'お客様の注文', 'menu'],
  ],
)
chapter(
  '51',
  'office',
  '初日を、確認しながら進める。',
  '自己紹介のあと、場所、時刻、手順を確認します。わからないときは、理解したふりをせず必要な情報を求めます。',
  [
    ['first day', '初日', 'calendar'],
    ['orientation', '最初の説明・案内', 'book'],
    ['account', 'アカウント', 'laptop'],
    ['password requirements', 'パスワードの条件', 'key'],
  ],
  { people: { 'New employee': 'Maya', Employee: 'Maya', Coworker: 'Lee' } },
)
chapter(
  '52',
  'workplace',
  '予定・問題・次の行動を共有。',
  '自分の状況を伝え、変更の希望と次の行動を確認します。問題を報告するときは、いつ始まったか、何が起きているかを話します。',
  [
    ['staff meeting', 'スタッフの会議', 'coworker'],
    ['shift', '勤務時間帯', 'calendar'],
    ['price list', '価格表', 'receipt'],
    ['the screen keeps freezing', '画面が繰り返し固まる', 'laptop'],
  ],
)
chapter(
  '53',
  'presentation',
  '目的・二つの要点・結び。',
  'つなぎ言葉を並べるだけでなく、実際の情報を順序立てて話します。現状、提案、まだわからない結果を区別します。',
  [
    ['First…', '最初に', 'document'],
    ['Next…', '次に', 'document'],
    ['To sum up…', 'まとめると', 'chart'],
    ['a one-week trial', '1週間の試行', 'calendar'],
  ],
  { diagram: 'presentation' },
)
chapter(
  '54',
  'work-meeting',
  '発言をつなぎ、合意をまとめる。',
  '発言の順番を取り、提案を確認します。会議の最後は、誰が何をいつまでにするかをそろえます。',
  [
    ['Could I add something?', '一つ付け加えてもいいですか？', 'discussion'],
    ['Just to clarify…', '確認したいのですが', 'listening'],
    ['feedback', '意見・感想', 'message'],
    ['To recap…', '要点を振り返ると', 'document'],
  ],
)
chapter(
  '55',
  'video',
  '聞こえる？ 見える？ を具体的に。',
  '音声、映像、接続を分けて報告します。復帰したら、聞き逃した内容と次の予定を確認します。',
  [
    ['Can you hear me?', '私の声は聞こえますか？', 'headphones'],
    ['screen sharing', '画面共有', 'laptop'],
    ['Your audio is cutting out.', '音声が途切れています', 'headphones'],
    ['time zone', 'タイムゾーン', 'clock'],
  ],
)
chapter(
  '56',
  'home-vocabulary',
  '部屋・家電・家具を、場所で覚える。',
  '場所を表す言葉、家電、家具を分けます。架空の住まいを思い浮かべ、必要な言葉から使います。',
  [
    ['bedroom', '寝室', 'bed'],
    ['kitchen', 'キッチン', 'kitchen'],
    ['sofa', 'ソファ', 'sofa'],
    ['washing machine', '洗濯機', 'laundry'],
  ],
  { diagram: 'home' },
)
chapter(
  '57',
  'housing',
  '住まいの希望と、条件を比べる。',
  '間取りや設備の好みと、契約の条件は別に確認します。内覧、賃貸、購入、入居後の相談で質問を使い分けます。',
  [
    ['two bedrooms', '寝室が2部屋', 'bed'],
    ['layout', '間取り', 'house'],
    ['lease', '賃貸契約', 'document'],
    ['maintenance issue', '修理が必要な問題', 'sink'],
  ],
)
chapter(
  '58',
  'moving',
  '荷物・行き先・時刻をそろえる。',
  'どの箱をどこに置くか、いつ来るかを具体的に確認します。予定の変更がまだ確認中なら、確定したように扱いません。',
  [
    ['boxes', '箱', 'box'],
    ['packing', '荷造り', 'suitcase'],
    ['keys', '鍵', 'key'],
    ['moving service', '引っ越しサービス', 'car'],
  ],
)
chapter(
  '59',
  'neighbors',
  '近所で、紹介と小さな相談。',
  '歓迎の言葉と、誘いへの返事を交わします。共有スペースの問題は、責める前に物と状況を特定します。',
  [
    ['next door', '隣の住まい', 'house'],
    ['neighborhood', '近所・地域', 'map'],
    ['housewarming', '新居のお披露目', 'gift'],
    ['hallway', '廊下', 'house'],
  ],
  { people: { 'New neighbor': 'Tessa', Neighbor: 'Ben' } },
)
chapter(
  '60',
  'chores',
  '担当・進み具合・変更を話す。',
  'Whose turn? は担当の確認、Have you finished? は進み具合の確認です。認識が違うときは予定を一緒に確かめます。',
  [
    ['do the dishes', '食器を洗う', 'sink'],
    ['laundry', '洗濯物・洗濯', 'laundry'],
    ['chore schedule', '家事の分担表', 'calendar'],
    ['put it away', '片付ける', 'box'],
  ],
)
chapter(
  '61',
  'renovation',
  '終わった作業と、これからの作業。',
  '作業の範囲、費用、材料が含まれるかを確認します。見積もりは、どこまでの作業の金額かと一緒に読みます。',
  [
    ['paint the walls', '壁を塗る', 'paint'],
    ['wallpaper', '壁紙', 'house'],
    ['quote', '見積もり', 'document'],
    ['labor', '作業の人件費', 'hammer'],
  ],
)
chapter(
  '62',
  'pets',
  '動物の様子を、観察した言葉で。',
  '相性や体調を決めつけず、観察したことを伝えます。迎える前には、世話と記録について質問できます。',
  [
    ['cat', '猫', 'cat'],
    ['dog', '犬', 'dog'],
    ['paw', '動物の足', 'dog'],
    ['vaccination records', '予防接種の記録', 'document'],
  ],
)
chapter(
  '63',
  'home-problem',
  '何が・どこで・いつから。',
  '緊急の住まいの問題を、確認できる事実で伝えます。原因がわからなければ、推測と観察を分けます。',
  [
    ['ceiling', '天井', 'house'],
    ['faucet', '蛇口', 'sink'],
    ['dripping', '水がしたたる', 'water'],
    ['urgent help', '急ぎの助け', 'phone'],
  ],
)
chapter(
  '64',
  'living-room',
  '選んで見る、止める、調整する。',
  '映像の好み、操作、時間の合意を分けて話します。画面が反応しないときは、実際に見えている状態を説明します。',
  [
    ['episode', '番組の1話', 'tv'],
    ['volume', '音量', 'headphones'],
    ['tablet', 'タブレット', 'tablet'],
    ['a break', '休憩', 'clock'],
  ],
)
chapter(
  '65',
  'transport-vocabulary',
  '移動手段と、乗る場所。',
  '乗り物、場所、乗車券を整理します。どこへどう移動するかを、一つの短い予定として言ってみます。',
  [
    ['bus', 'バス', 'bus'],
    ['subway', '地下鉄', 'train'],
    ['ticket', '乗車券', 'ticket'],
    ['platform', 'ホーム', 'train'],
  ],
)
chapter(
  '66',
  'bus-stop',
  '乗る前に、行き先を確かめる。',
  'バスの番号、運賃、降りる場所を確認します。今目の前のバスが行く場所と、必要な別のバスを区別します。',
  [
    ['bus stop', 'バス停', 'bus'],
    ['fare', '運賃', 'receipt'],
    ['destination', '行き先', 'map'],
    ['restroom', 'トイレ', 'house'],
  ],
)
chapter(
  '67',
  'station',
  '切符・乗り換え・運行の変更。',
  'Express と local の停車駅は違います。往復か片道か、乗り換え、変更された運行を具体的に確認します。',
  [
    ['round-trip ticket', '往復切符', 'ticket'],
    ['express', '急行', 'train'],
    ['local', '各駅停車', 'train'],
    ['transfer', '乗り換え', 'map'],
  ],
)
chapter(
  '68',
  'airport',
  '空港の手順を、一場面ずつ。',
  'チェックイン、ゲート、搭乗、到着はそれぞれ別のやりとりです。便、時刻、座席など、必要な情報に焦点を当てます。',
  [
    ['boarding pass', '搭乗券', 'ticket'],
    ['gate C12', 'C12ゲート', 'plane'],
    ['seat 18C', '18Cの座席', 'name-tag'],
    ['baggage carousel', '荷物受け取りの回転台', 'suitcase'],
  ],
)
chapter(
  '69',
  'bike-shop',
  '用途を話し、借りる条件を聞く。',
  '通勤、レンタル、故障の相談では必要な情報が変わります。修理方法を決めつけず、気づいた症状を説明します。',
  [
    ['bike', '自転車', 'bike'],
    ['front tire', '前輪のタイヤ', 'bike'],
    ['brake', 'ブレーキ', 'bike'],
    ['e-bike', '電動アシスト自転車', 'bike'],
  ],
)
chapter(
  '70',
  'taxi',
  '乗車の確認と、行き先の変更。',
  '予約名、迎えの場所、行き先で乗車を確認します。途中の立ち寄りや忘れ物には、場所と時刻を添えます。',
  [
    ['pickup', '迎えに来ること', 'car'],
    ['destination', '目的地', 'map'],
    ['an extra stop', '追加の立ち寄り', 'car'],
    ['laptop', 'ノートパソコン', 'laptop'],
  ],
)
chapter(
  '71',
  'garage',
  '車の症状と、提案された作業。',
  'いつどんな音がするかなどを伝えます。作業の説明、承認した金額、請求額を区別して確認します。',
  [
    ['headlight', 'ヘッドライト', 'car'],
    ['maintenance', '点検・整備', 'hammer'],
    ['oil change', 'オイル交換', 'bottle'],
    ['bill', '請求書', 'receipt'],
  ],
)
chapter(
  '72',
  'travel-vocabulary',
  '宿泊・荷造り・旅先の活動。',
  '旅行の目的に合わせて言葉を選びます。宿の名前だけでは設備は決まらないため、必要な特徴を尋ねます。',
  [
    ['suitcase', 'スーツケース', 'suitcase'],
    ['passport', 'パスポート', 'passport'],
    ['campsite', 'キャンプサイト', 'tent'],
    ['sightseeing', '観光', 'map'],
  ],
)
chapter(
  '73',
  'travel-desk',
  '希望を伝え、条件を読んで決める。',
  '含まれる食事、費用、キャンセルの条件は別々に確認します。条件がわからないまま決めず、書面で尋ねられます。',
  [
    ['four nights', '4泊', 'hotel'],
    ['meals included', '食事が含まれる', 'plate'],
    ['room service', '部屋への飲食サービス', 'hotel'],
    ['cancellation conditions', 'キャンセルの条件', 'document'],
  ],
)
chapter(
  '74',
  'hotel',
  '到着から、部屋と会計の確認へ。',
  '予約名と泊数を確認し、サービスの時間や希望を尋ねます。困りごとは部屋番号と実際の状況を添えて伝えます。',
  [
    ['reservation', '宿泊予約', 'calendar'],
    ['pillows', '枕', 'bed'],
    ['towels', 'タオル', 'laundry'],
    ['checkout', 'チェックアウト', 'key'],
  ],
)
chapter(
  '75',
  'museum',
  '入場・見学・目の前の場所。',
  '開館時刻と最終入場は別です。見学を選ぶ前に、料金と時間を確認し、案内の位置関係を聞き取ります。',
  [
    ['admission ticket', '入場券', 'ticket'],
    ['guided tour', 'ガイド付きの見学', 'museum'],
    ['gallery', '展示室・ギャラリー', 'photo'],
    ['visitor center', '案内所', 'map'],
  ],
)
chapter(
  '76',
  'camping',
  '場所・設備・今日のルール。',
  '予約した区画と、共用設備を確認します。火の使用などは、その日の説明を聞いて返事をします。',
  [
    ['tent', 'テント', 'tent'],
    ['RV', 'キャンピングカー', 'car'],
    ['flashlight', '懐中電灯', 'flashlight'],
    ['batteries', '電池', 'cable'],
  ],
)
chapter(
  '77',
  'beach',
  '今日の状態を聞き、参加を選ぶ。',
  '泳げる状態か、活動が実施されるかを確認します。希望することと、今日できることが違えば、別の過ごし方を選びます。',
  [
    ['swimming area', '遊泳エリア', 'beach'],
    ['shade', '日陰', 'umbrella'],
    ['surfing lesson', 'サーフィンのレッスン', 'beach'],
    ['rental', 'レンタル', 'receipt'],
  ],
)
chapter(
  '78',
  'directions',
  '出発点から、曲がる場所まで。',
  'どこからどちら向きに進むかが大切です。Right は「右」だけでなく「そのとおり」の意味にもなるので、文脈を確認します。',
  [
    ['go straight', 'まっすぐ進む', 'directions'],
    ['turn right', '右に曲がる', 'directions'],
    ['one block', '一区画・交差点までの区間', 'map'],
    ['across from', '向かい側に', 'house'],
  ],
  { diagram: 'directions' },
)
chapter(
  '79',
  'travel-problem',
  'なくした物と、変更する予定。',
  '忘れ物、欠航、体調による変更を別の問題として伝えます。予約や物の情報を確認し、使える選択肢を尋ねます。',
  [
    ['missing suitcase', '届いていないスーツケース', 'suitcase'],
    ['canceled flight', '欠航した便', 'plane'],
    ['return date', '帰る日', 'calendar'],
    ['claim', '申請・請求', 'document'],
  ],
)
chapter(
  '80',
  'health-vocabulary',
  '体の場所と、感じている症状。',
  '体の部分、症状、専門職の言葉を分けます。診断名を推測するより、どこに何を感じるかを説明する言葉を使います。',
  [
    ['shoulder', '肩', 'body'],
    ['ankle', '足首', 'body'],
    ['thermometer', '体温計', 'thermometer'],
    ['prescription', '処方箋・処方', 'medicine'],
  ],
  { diagram: 'body' },
)
chapter(
  '81',
  'pharmacy',
  '薬剤師に、症状と不明点を聞く。',
  '薬の名前だけでなく、症状、期間、関係する情報を伝えます。使い方が不明なら、ラベルを一緒に確認してもらいます。',
  [
    ['pharmacist', '薬剤師', 'pharmacy'],
    ['prescription', '処方箋・処方', 'document'],
    ['label', 'ラベル', 'medicine'],
    ['rash', '発疹', 'body'],
  ],
)
chapter(
  '82',
  'health-booking',
  '予約の理由・場所・時刻。',
  '受診の理由を短く伝え、場所と日時を確認します。変更したい場合は、今ある予約と新しい希望を分けて話します。',
  [
    ['appointment', '診察などの予約', 'calendar'],
    ['reschedule', '日時を変更する', 'calendar'],
    ['receptionist', '受付担当者', 'phone'],
    ['Thursday at 3:30', '木曜日の3時30分', 'clock'],
  ],
)
chapter(
  '83',
  'clinic',
  '症状を伝え、説明を確認する。',
  '症状がいつからか、どう変わったかを話します。診察の説明や次の手順は、自分の言葉で確認できます。',
  [
    ['cough', 'せき', 'body'],
    ['temperature', '体温', 'thermometer'],
    ['examination', '診察・検査', 'clinic'],
    ['test results', '検査結果', 'document'],
  ],
)
chapter(
  '84',
  'emergency',
  '場所と、起きていることを明確に。',
  '緊急のやりとりでは、場所と確認できる事実を優先します。この章ではけがの診断ではなく、状況を伝える英語を練習します。',
  [
    ['location', '場所', 'map'],
    ['address', '住所', 'house'],
    ['ankle', '足首', 'body'],
    ['bystander', 'その場にいる人', 'support'],
  ],
)
chapter(
  '85',
  'hospital',
  '来院の目的から、退院の説明まで。',
  '症状や普段の薬について伝えます。検査、滞在、退院後の手順は、不明な点を質問して確認します。',
  [
    ['scan', '画像の検査', 'document'],
    ['overnight', '一晩', 'bed'],
    ['observation', '状態を見守ること', 'thermometer'],
    ['discharge instructions', '退院時の説明', 'document'],
  ],
)
chapter(
  '86',
  'dentist',
  '歯の場所と、痛みを伝える。',
  'どの歯か、いつ痛むかを説明します。診察中にも、不快なことや確認したい治療の選択肢を伝えられます。',
  [
    ['tooth', '歯', 'tooth'],
    ['lower left', '左下', 'tooth'],
    ['filling', '歯の詰め物', 'tooth'],
    ['examination', '診察', 'document'],
  ],
)
chapter(
  '87',
  'counseling',
  '必要な支えと、話せる範囲。',
  '今どんな支えがほしいかを伝えます。相談の場でも、今日は話したくないことや、まだ話す準備ができていないことを言えます。',
  [
    ['support', '支え・助け', 'support'],
    ['counseling', 'カウンセリング', 'listening'],
    ['concentrating', '集中すること', 'book'],
    ['video appointment', 'ビデオ通話での相談', 'laptop'],
  ],
)
chapter(
  '88',
  'media-vocabulary',
  '連絡手段・機器・オンラインの動作。',
  'Call / message などの連絡手段と、upload / download などの動作を分けます。必要な操作を短く説明します。',
  [
    ['headphones', 'ヘッドホン', 'headphones'],
    ['Wi-Fi', 'Wi-Fi', 'wifi'],
    ['upload', 'アップロードする', 'laptop'],
    ['bookmark', 'ブックマーク', 'bookmark'],
  ],
)
chapter(
  '89',
  'service-call',
  '名乗り、用件、折り返しの確認。',
  '誰が何のために電話したかを最初に伝えます。伝言には必要な連絡先を添え、最後に次の対応を確認します。',
  [
    ['callback number', '折り返しの電話番号', 'phone'],
    ['poster order', 'ポスターの注文', 'photo'],
    ['Could I speak with Dana?', 'ダナさんと話せますか？', 'service-call'],
    ['an update by email', 'メールでの続報', 'email'],
  ],
)
chapter(
  '90',
  'phone',
  '今話せる？ から、通話の終わりまで。',
  '親しい相手でも、時間があるかを確認できます。音が途切れたら聞けた部分を伝え、話せないときは無理に理由を作りません。',
  [
    ['Got a minute?', '少し時間ある？', 'clock'],
    ['You’re breaking up.', '声が途切れているよ', 'phone'],
    ['battery', 'バッテリー', 'cable'],
    ['See you at six.', '6時に会おう', 'clock'],
  ],
)
chapter(
  '91',
  'internet',
  'つながる・入力する・送るを区別。',
  'Save は保存、submit は提出など、操作の結果を確かめます。知らない要求は、内容と送り先を確認してから判断します。',
  [
    ['guest Wi-Fi', 'ゲスト用のWi-Fi', 'wifi'],
    ['upload an essay', '作文をアップロードする', 'document'],
    ['webinar', 'オンラインのセミナー', 'laptop'],
    ['Submit', '提出・送信する', 'message'],
  ],
)
chapter(
  '92',
  'tech-support',
  '起きたことと、推測を分ける。',
  '機器、ブラウザー、表示されたメッセージ、再現する動作を伝えます。操作を変える前に、入力した情報への影響も尋ねます。',
  [
    ['browser', 'ブラウザー', 'laptop'],
    ['error message', 'エラーメッセージ', 'message'],
    ['sign-in alert', 'サインインの通知', 'key'],
    ['audio cutting out', '音声が途切れること', 'headphones'],
  ],
)
chapter(
  '93',
  'email',
  '受信・添付・返信と、明確な依頼。',
  '受信したことと、読んだことは別です。メールには目的、変更点、相手にしてほしいことをそろえます。',
  [
    ['subject line', '件名', 'email'],
    ['attachment', '添付ファイル', 'document'],
    ['draft', '下書き', 'letter'],
    ['reply', '返信する', 'message'],
  ],
  { document: 'email' },
)
chapter(
  '94',
  'chat',
  '短いメッセージにも、必要な情報。',
  '遅れる時間と、待ってほしいか先に始めてほしいかを伝えます。グループへの参加と、活動への参加は別の選択です。',
  [
    ['group chat', 'グループチャット', 'message'],
    ['Can you confirm?', '確認の返事をもらえますか？', 'message'],
    ['TBH', 'To be honest の略', 'chat'],
    ['Your picture froze.', '映像が固まりました', 'tablet'],
  ],
  { sceneThemes: ['chat', 'chat', 'video'], conversationStyle: 'chat' },
)
chapter(
  '95',
  'social-media',
  '投稿を見る・共有する・反応する。',
  '見る、共有する、反応するは別の行動です。誘われても、共有しない選択を伝えられます。提案は結果の保証とは分けます。',
  [
    ['post', '投稿', 'photo'],
    ['share', '共有する', 'message'],
    ['notifications', '通知', 'phone'],
    ['followers', 'フォロワー', 'profile'],
  ],
)
chapter(
  '96',
  'bookshop',
  '感想と、選ぶ理由を伝える。',
  'Page-turner は続きが気になる本という表現です。自分の感想を具体化し、相手の好みや読む時間に合う本を尋ねます。',
  [
    ['novel', '小説', 'book'],
    ['short stories', '短編小説', 'book'],
    ['a page-turner', '続きが気になって読む手が止まらない本', 'book'],
    ['The ending was a letdown.', '結末にはがっかりしました', 'discussion'],
  ],
)

export default designs
