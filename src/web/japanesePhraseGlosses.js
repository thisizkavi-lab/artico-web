// Editorial Japanese equivalents for Social Fluency. English is always the study target.
import reviewedWords from './vocabularyJapaneseOverrides.json'
import commonWords from './vocabularyJapaneseCommon.json'
import { moreJapaneseGlosses } from './japanesePhraseGlosses07to10.js'
import { openingJapaneseGlosses } from './japanesePhraseGlosses01to03.js'
import { chapter05JapaneseFor } from './chapter05Japanese.js'
// A gloss is a natural equivalent in context, not a word-for-word translation.
export const japanesePhraseGlosses = {
  "04": {
    "Sorry, I didn't catch that.": "すみません、聞き取れませんでした。",
    "What does “deadline” mean?": "「deadline」はどういう意味ですか？",
    "I'm not sure what you mean.": "おっしゃっている意味がよく分かりません。",
    "Could you say that more slowly?": "もう少しゆっくり言っていただけますか？",
    "Could you walk me through it again?": "もう一度、手順を順番に説明していただけますか？",
    "Did you say Tuesday or Thursday?": "火曜日と言いましたか、それとも木曜日ですか？",
    "Catch": "聞き取る／理解する",
    "Walk me through it": "手順を順番に説明して",
    "I don't understand": "分かりません",
    "Please turn in the form at the front desk by three.": "3時までに受付に書類を提出してください。",
    "Sorry, I didn't catch the time. Did you say three?": "すみません、時間が聞き取れませんでした。3時とおっしゃいましたか？",
    "Yes, three o'clock.": "はい、3時です。",
    "Okay, by three. Thank you.": "分かりました。3時までですね。ありがとうございます。",
    "By three": "3時までに",
    "Please turn in the form at the front desk.": "受付で書類を提出してください。",
    "What does “turn in” mean?": "「turn in」はどういう意味ですか？",
    "Give the completed form to the person at the desk.": "記入済みの書類を受付の人に渡してください。",
    "Got it. I give it to the person at the desk.": "分かりました。受付の人に渡すんですね。",
    "Got it": "分かりました／なるほど",
    "I'm still not sure. Could you show me?": "まだよく分かりません。見せていただけますか？",
    "Excuse me?": "すみません、もう一度お願いします。",
    "Sorry?": "すみません、何とおっしゃいましたか？",
    "What was that?": "今、何て言った？",
    "What?": "えっ、何？",
    "Let's meet behind the building.": "建物の裏で会おう。",
    "Wait, what? Behind it?": "えっ、ちょっと待って。建物の裏？",
    "Yes, by the back entrance.": "うん、裏口のそばだよ。",
    "Oh, okay. The back entrance.": "ああ、分かった。裏口ね。",
    "Could you say that again?": "もう一度言っていただけますか？",
    "Could you write it down?": "書いていただけますか？",
    "How do you spell that?": "それはどうつづりますか？",
    "Could you give me an example?": "例を挙げていただけますか？",
    "Do you mean the blue folder?": "青いフォルダーのことですか？",
    "I didn’t catch that.": "聞き取れませんでした。",
    "What does it mean?": "それはどういう意味ですか？",
    "More slowly, please.": "もっとゆっくりお願いします。",
    "Did you say three?": "3時と言いましたか？"
  },
  "05": {
    "I like it.": "それが好きです。",
    "I really like it. / I love it.": "とても好きです／大好きです。",
    "I'm into photography.": "写真を撮ることに夢中です。",
    "I'm not really into it.": "あまり興味がないんです。",
    "It's not my thing.": "私の好みではありません。",
    "I can't stand it.": "どうしても耐えられません。",
    "Do you like escape rooms?": "脱出ゲームは好き？",
    "Not really. They're not my thing.": "そうでもないかな。あまり好みじゃないんだ。",
    "What are you into?": "何にハマってるの？",
    "I'm into photography. I'd rather go for a walk and take pictures.": "写真にハマってるんだ。散歩しながら写真を撮る方がいいな。",
    "I can't stand them": "どうしても好きになれない",
    "I'm good": "大丈夫です／結構です（場面による）",
    "How are you?": "元気ですか？",
    "No, I'm good, thanks": "いいえ、大丈夫です。ありがとう。",
    "What do you think of it?": "それについてどう思う？",
    "How do you feel about the plan?": "その計画についてどう思う？",
    "I think the smaller room would work better.": "小さい方の部屋がよいと思います。",
    "In my opinion, we need more time.": "私の考えでは、もう少し時間が必要です。",
    "As I see it, the main problem is the cost.": "私の見る限り、いちばんの問題は費用です。",
    "I like the idea, but I'm worried about the price.": "いい案だと思うけど、値段が心配です。",
    "What do you think of the room?": "その部屋、どう思う？",
    "I like the location, but I think it's too small.": "場所は気に入ったけど、狭すぎると思う。",
    "What's your view, Morgan?": "モーガンはどう思う？",
    "As I see it, we need a bigger space. We expect twenty people.": "私としては、もっと広い場所が必要だと思う。20人来る予定だから。",
    "I think": "〜だと思います",
    "Prefer": "〜の方が好き／〜を選びたい",
    "would rather": "どちらかといえば〜したい",
    "I prefer tea to coffee.": "コーヒーより紅茶の方が好きです。",
    "I'd prefer the earlier train.": "早い方の電車がいいです。",
    "I'd rather leave at six.": "できれば6時に出発したいです。",
    "rather": "どちらかといえば",
    "leave": "出発する／去る",
    "to leave": "出発すること／去ること",
    "I'd rather not go tonight.": "今夜は行かない方がいいです。",
    "Would you rather eat here or take the food home?": "ここで食べる？ それとも持ち帰る方がいい？",
    "I'd rather take it home. It's quieter there.": "持ち帰りたいな。家の方が静かだから。",
    "That works for me.": "それで大丈夫だよ。",
    "Either is fine": "どちらでも大丈夫",
    "Both work for me": "どちらでも構いません",
    "I don't have a preference": "特に希望はありません",
    "I don't mind": "どちらでも気にしません",
    "I don't care": "どっちでもいい（素っ気なく聞こえる場合あり）",
    "No way!": "まさか！／絶対いや！",
    "No way! I'm not paying that much": "ありえない！ そんなに払わないよ。",
    "You won? No way! That's amazing": "勝ったの？ まさか！ すごいね！",
    "I’m into photography.": "写真に夢中です。",
    "It’s not my thing.": "私の好みではありません。",
    "I’d rather take it home.": "持ち帰る方がいいです。",
    "Either is fine.": "どちらでも大丈夫です。"
  },
  "06": {
    "I agree.": "賛成です。",
    "Exactly.": "そのとおりです。",
    "Absolutely. / I totally agree.": "まったくそのとおりです／全面的に賛成です。",
    "That's a good point.": "なるほど、それはいい指摘ですね。",
    "I couldn't agree more.": "まったく同感です。",
    "We need a room with more seats.": "もっと席のある部屋が必要だね。",
    "I agree. Twelve people won't fit comfortably in the small room.": "そうだね。小さい部屋では12人がゆったり座れないよ。",
    "And we should check the price first.": "それと、まず料金を確認した方がいいね。",
    "Absolutely.": "まったくそのとおり。",
    "I love this song. — Me too. / So do I.": "この曲大好き。— 私も。／私もそうです。",
    "I don't like crowded rooms. — Me neither. / Neither do I.": "混んでいる部屋は苦手。— 私も。／私もそうです。",
    "I don't think this is a good plan. — I don't think so either.": "これはよい計画だとは思わない。— 私もそう思わない。",
    "I don't think so either": "私もそうは思いません",
    "I hear you": "言いたいことは分かるよ",
    "I know what you mean": "言いたいことは分かります",
    "I'm worried the bigger room costs too much.": "広い部屋は高すぎるんじゃないかと心配なんだ。",
    "I hear you. But I still think we need the extra space.": "言いたいことは分かる。でもやっぱり広さが必要だと思う。",
    "I'm not sure about that.": "それはどうかなと思います。",
    "I see it differently.": "私は違う見方をしています。",
    "I agree about the location, but not the price.": "場所には賛成ですが、値段には賛成できません。",
    "I'm not convinced.": "まだ納得できません。",
    "No, that's not right.": "いいえ、それは違います。",
    "That was the best part of the movie.": "そこが映画でいちばんよかったところだよ。",
    "I see it differently. I thought the ending was better.": "私は違う見方だな。結末の方がよかったと思った。",
    "Really? I thought the ending was too easy.": "本当に？ 結末があっさりしすぎだと思ったよ。",
    "Fair enough. We liked different things.": "そういう見方もあるね。好きなところが違ったんだね。",
    "Fair enough": "なるほど、それも分かる",
    "Nah, it wasn't for me": "いや、私には合わなかった",
    "No way": "まさか／絶対にいや",
    "What makes you think that?": "どうしてそう思うの？",
    "Let's check the information.": "情報を確認しよう。",
    "We may have to agree to disagree.": "意見が違うままで仕方ないかもしれないね。",
    "Let's leave it there.": "この話はここまでにしよう。",
    "I hear you.": "言いたいことは分かるよ。",
    "Fair enough.": "なるほど、それも分かります。"
  }
};

export function japaneseGlossFor(item, lessonId) {
  if (!item || !item.en) return '';
  if (typeof item.ja === 'string' && item.ja.trim()) return item.ja.trim();
  if (String(lessonId).padStart(2, '0') === '05') {
    const reviewed = chapter05JapaneseFor(item.en);
    if (reviewed) return reviewed;
  }
  const id = String(lessonId).padStart(2,'0');
  const map = openingJapaneseGlosses[id] ?? japanesePhraseGlosses[id] ?? moreJapaneseGlosses[id];
  if (map?.[item.en]) return map[item.en];
  // The existing local vocabulary dictionary supplies reliable short noun/word
  // equivalents throughout Chapters 01–96. Exclude common polysemous words:
  // their sense must be reviewed in each chapter rather than guessed.
  const ambiguous = new Set([
    'date','light','right','left','fine','mean','close','open','present','issue',
    'case','work','play','spring','fall','ring','bank','charge','draft','watch',
    'record','note','kind','fit','run','drop','turn','order','check','change',
    'point','line','book','plant','match','take','set','still','well',
    'second','minute','hard','fair','lie','sound','matter','trip',
  ]);
  if (item.kind === 'word' && /^[A-Za-z][A-Za-z -]*$/.test(item.en) &&
      !ambiguous.has(item.en.toLowerCase().trim())) {
    const curated = {
      oil: '油', 'olive oil': 'オリーブオイル', novel: '小説',
      mystery: 'ミステリー／推理小説', biography: '伝記',
      autobiography: '自伝', fiction: 'フィクション／小説',
      nonfiction: 'ノンフィクション', paperback: '文庫本／ペーパーバック',
      hardcover: 'ハードカバー', subscription: '定期購読',
      'out of stock': '品切れ', whisk: '泡立て器',
    };
    return curated[item.en.toLowerCase().trim()] ||
      reviewedWords[item.en] || commonWords[item.en] || '';
  }
  return '';
}
