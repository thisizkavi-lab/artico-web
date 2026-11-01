// Reviewed Japanese equivalents for Chapter 04 phrase chips, full table
// examples, and conversation lines. The English target remains prominent.
export const chapter04Japanese = {
  "Sorry?": "すみません、もう一度お願いします。",
  "Sorry, I didn't catch that.": "すみません、聞き取れませんでした。",
  "Could you say that again?": "もう一度言っていただけますか？",
  "Did you say ...?": "〜と言いましたか？",
  "What does ... mean?": "〜はどういう意味ですか？",
  "I don't understand.": "分かりません。",
  "Oh, I see.": "ああ、なるほど。",
  "Could you slow down a little?": "もう少しゆっくり話していただけますか？",
  "Could you explain that again?": "もう一度説明していただけますか？",
  "Could you say that another way?": "別の言い方で説明していただけますか？",
  "Could you give me an example?": "例を挙げていただけますか？",
  "Sorry, I didn't catch your name.": "すみません、お名前が聞き取れませんでした。",
  "Could you say that again, please?": "もう一度言っていただけますか？",
  "Did you say eight?": "8時と言いましたか？",
  "What does \"hang out\" mean?": "「hang out」はどういう意味ですか？",
  "Sorry, I don't understand this word.": "すみません、この単語の意味が分かりません。",
  "Oh, I see. Thanks!": "ああ、なるほど。ありがとう！",
  "Could you slow down a little, please?": "もう少しゆっくり話していただけますか？",
  "Could you explain that again, please?": "もう一度説明していただけますか？",
  "Could you say that another way, please?": "別の言い方で説明していただけますか？",
  "Could you give me an example, please?": "例を挙げていただけますか？",
  "The class starts at eight.": "授業は8時からだよ。",
  "Sorry, did you say eight?": "ごめん、8時って言った？",
  "Yes, eight.": "うん、8時。",
  "Okay, thanks.": "分かった、ありがとう。",
  "Let's hang out after class.": "授業のあと、一緒に遊ぼうよ。",
  "Spend time together.": "一緒に時間を過ごすことだよ。",
  "Oh, I see!": "ああ、なるほど！",
  "Take the second left.": "2つ目の角を左に曲がって。",
  "Sorry, could you say that another way?": "ごめん、別の言い方で説明してくれる？",
  "Turn left at the second street.": "2つ目の通りを左に曲がって。",
  "Oh, okay. Thanks.": "ああ、分かった。ありがとう。"
};

export function chapter04JapaneseFor(english) {
  if (typeof english !== 'string') return '';
  const key = english.replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, ' ').trim();
  return chapter04Japanese[key] ||
    chapter04Japanese[key.replace(/[.!?]+$/, '')] ||
    chapter04Japanese[key + '.'] || '';
}
