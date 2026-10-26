// Lesson 2 follows the user's organized General American vocabulary list.
// The groups preserve its everyday-number categories and examples.
const makeItems = (rows) => rows.map(([cue, term, ja]) => ({ cue, term, ja }))

export const numberGroups = [
  {
    id: 'counting',
    en: 'Counting: zero to twenty',
    ja: '数える：0から20まで',
    intro: {
      en: 'Build a solid foundation for prices, ages, dates, and everyday quantities.',
      ja: '値段・年齢・日付・数量など、日常で使う数の基本です。',
    },
    items: makeItems([
      ['0', 'zero', 'ゼロ、零'], ['1', 'one', '1、ひとつ'], ['2', 'two', '2、ふたつ'],
      ['3', 'three', '3、みっつ'], ['4', 'four', '4、よっつ'], ['5', 'five', '5、いつつ'],
      ['6', 'six', '6、むっつ'], ['7', 'seven', '7、ななつ'], ['8', 'eight', '8、やっつ'],
      ['9', 'nine', '9、ここのつ'], ['10', 'ten', '10'], ['11', 'eleven', '11'],
      ['12', 'twelve', '12'], ['13', 'thirteen', '13'], ['14', 'fourteen', '14'],
      ['15', 'fifteen', '15'], ['16', 'sixteen', '16'], ['17', 'seventeen', '17'],
      ['18', 'eighteen', '18'], ['19', 'nineteen', '19'], ['20', 'twenty', '20'],
    ]),
  },
  {
    id: 'tens',
    en: 'Tens and numbers between them',
    ja: '十の位と、その間の数',
    intro: {
      en: 'Combine a tens word with the next number to say numbers such as thirty-four and fifty-six.',
      ja: '30や50などの十の位の語に一の位を続けると、thirty-four（34）、fifty-six（56）のように言えます。',
    },
    note: {
      en: 'Written numbers from 21 to 99 usually use a hyphen when they are not a multiple of ten.',
      ja: '21から99までの数は、10の倍数でない場合、通常ハイフンでつなぎます。',
    },
    items: makeItems([
      ['21', 'twenty-one', '21'], ['22', 'twenty-two', '22'], ['30', 'thirty', '30'],
      ['34', 'thirty-four', '34'], ['40', 'forty', '40'], ['50', 'fifty', '50'],
      ['56', 'fifty-six', '56'], ['60', 'sixty', '60'], ['70', 'seventy', '70'],
      ['80', 'eighty', '80'], ['90', 'ninety', '90'], ['99', 'ninety-nine', '99'],
    ]),
  },
  {
    id: 'large',
    en: 'Hundreds, thousands, and larger numbers',
    ja: '百・千からさらに大きな数まで',
    intro: {
      en: 'Recognize the scale of larger quantities, prices, populations, and figures in the news.',
      ja: '数量・価格・人口・ニュースの数字などを理解するための、大きな数の単位です。',
    },
    note: {
      en: 'These values use the American short scale. For a specific quantity, say “two hundred people,” not “two hundreds people.” Use “hundreds of people” for an unspecific large number.',
      ja: 'ここではアメリカ英語で一般的な short scale（ショートスケール）を使っています。具体的な数には two hundred people（200人）のように hundred を複数形にしません。具体的な数を示さず「何百人もの」と言う場合は hundreds of people です。',
    },
    example: {
      en: '115 = “one hundred fifteen” · 1,234 = “one thousand two hundred thirty-four.” Some speakers also include “and,” as in “one hundred and fifteen.”',
      ja: '115は one hundred fifteen、1,234は one thousand two hundred thirty-four と読みます。one hundred and fifteen のように and を入れる人もいます。',
    },
    items: makeItems([
      ['100', 'hundred / one hundred / a hundred', '100、百'],
      ['200', 'two hundred', '200、二百'],
      ['1,000', 'thousand / one thousand / a thousand', '1,000、千'],
      ['10,000', 'ten thousand', '10,000、一万'],
      ['100,000', 'one hundred thousand / a hundred thousand', '100,000、十万'],
      ['1,000,000', 'million / one million / a million', '1,000,000、百万'],
      ['10,000,000', 'ten million', '10,000,000、一千万'],
      ['100,000,000', 'one hundred million / a hundred million', '100,000,000、一億'],
      ['1,000,000,000', 'billion / one billion / a billion', '1,000,000,000、十億'],
      ['10,000,000,000', 'ten billion', '10,000,000,000、百億'],
      ['100,000,000,000', 'one hundred billion / a hundred billion', '100,000,000,000、一千億'],
      ['1,000,000,000,000', 'trillion / one trillion / a trillion', '1,000,000,000,000、一兆'],
      ['10,000,000,000,000', 'ten trillion', '10,000,000,000,000、十兆'],
      ['100,000,000,000,000', 'one hundred trillion / a hundred trillion', '100,000,000,000,000、百兆'],
      ['1,000,000,000,000,000', 'quadrillion / one quadrillion / a quadrillion', '1,000,000,000,000,000、千兆（quadrillion）'],
    ]),
  },
  {
    id: 'ordinals',
    en: 'Ordinal numbers: order and dates',
    ja: '序数：順番と日付',
    intro: {
      en: 'Ordinal numbers tell us position or order. They are also used when saying dates.',
      ja: '序数は順番や位置を表し、日付を読むときにも使います。',
    },
    example: {
      en: '“the first floor” · “my twenty-first birthday” · “May fifth”',
      ja: 'the first floor（1階）・my twenty-first birthday（21歳の誕生日）・May fifth（5月5日）のように使います。',
    },
    items: makeItems([
      ['1st', 'first', '第1の、最初の'], ['2nd', 'second', '第2の'], ['3rd', 'third', '第3の'],
      ['4th', 'fourth', '第4の'], ['5th', 'fifth', '第5の'], ['6th', 'sixth', '第6の'],
      ['7th', 'seventh', '第7の'], ['8th', 'eighth', '第8の'], ['9th', 'ninth', '第9の'],
      ['10th', 'tenth', '第10の'], ['11th', 'eleventh', '第11の'], ['12th', 'twelfth', '第12の'],
      ['13th', 'thirteenth', '第13の'], ['14th', 'fourteenth', '第14の'], ['15th', 'fifteenth', '第15の'],
      ['16th', 'sixteenth', '第16の'], ['17th', 'seventeenth', '第17の'], ['18th', 'eighteenth', '第18の'],
      ['19th', 'nineteenth', '第19の'], ['20th', 'twentieth', '第20の'], ['21st', 'twenty-first', '第21の'],
      ['22nd', 'twenty-second', '第22の'], ['23rd', 'twenty-third', '第23の'], ['30th', 'thirtieth', '第30の'],
      ['100th', 'one hundredth', '第100の'],
    ]),
  },
  {
    id: 'fractions',
    en: 'Whole amounts, fractions, and common portions',
    ja: '全体・分数・よく使う割合',
    intro: {
      en: 'Use these words for portions of food, quantities, and everyday measurements.',
      ja: '食べ物の取り分や数量、日常の計量で使う表現です。',
    },
    note: {
      en: '“Whole” means complete; “full” means filled to capacity. A quarter can also mean 15 minutes or a U.S. coin worth 25 cents—the context tells you which meaning is intended.',
      ja: 'whole は「全体で欠けていない」、full は「容量いっぱい」という意味です。a quarter は「4分の1」のほか「15分」や「25セント硬貨」を表すこともあり、文脈で判断します。',
    },
    items: makeItems([
      ['1 whole', 'whole / a whole', '全体の、丸ごとの'], ['full', 'full', '満杯の、容量いっぱいの'],
      ['½', 'fractions / a fraction', '分数、分数の一部'], ['½', 'half / a half / one half', '半分、2分の1'],
      ['⅓', 'a third / one third', '3分の1'], ['⅔', 'two thirds', '3分の2'],
      ['¼', 'quarter / a quarter / one quarter / one fourth', '4分の1'],
      ['¾', 'three quarters / three fourths', '4分の3'], ['1½', 'one and a half', '1と2分の1'],
      ['2½', 'two and a half', '2と2分の1'], ['12', 'dozen / a dozen', 'ダース、12個'],
      ['6', 'half a dozen', '半ダース、6個'],
    ]),
  },
  {
    id: 'decimals',
    en: 'Decimals',
    ja: '小数',
    intro: {
      en: 'Say “point,” then read each digit after the decimal point individually.',
      ja: '小数点は point と読み、小数点以下の数字は一桁ずつ読みます。',
    },
    note: {
      en: 'Read 1.25 as “one point two five.” “Nought point five” is a British variant; “zero point five” is the everyday American reading.',
      ja: '1.25は one point two five と読みます。nought point five はイギリス英語の言い方で、アメリカ英語の日常会話では zero point five が一般的です。',
    },
    items: makeItems([
      ['0.0', 'decimals / a decimal', '小数、小数の'], ['.', 'decimal point', '小数点'],
      ['0.5', 'zero point five / point five', '0.5（ゼロ・ポイント・ファイブ）'],
      ['1.7', 'one point seven', '1.7（ワン・ポイント・セブン）'],
      ['1.25', 'one point two five', '1.25（ワン・ポイント・ツー・ファイブ）'],
      ['2.05', 'two point zero five', '2.05（ツー・ポイント・ゼロ・ファイブ）'],
    ]),
  },
  {
    id: 'percent',
    en: 'Percentages and approximate amounts',
    ja: 'パーセントと概数',
    intro: {
      en: 'Talk about rates, discounts, changes, and estimates without doing a math exercise.',
      ja: '計算問題ではなく、割合・割引・変化・おおよその数を伝える表現です。',
    },
    items: makeItems([
      ['%', 'percentages / percentage / percent', 'パーセンテージ、百分率、パーセント'],
      ['1%', 'one percent', '1パーセント'], ['50%', 'fifty percent', '50パーセント'],
      ['99%', 'ninety-nine percent', '99パーセント'], ['0.5%', 'zero point five percent', '0.5パーセント'],
      ['≈', 'about / around / approximately', '約、およそ'], ['>', 'more than', '〜より多い'],
      ['<', 'less than', '〜より少ない'], ['≥', 'at least', '少なくとも'],
      ['≤', 'no more than', '多くても、〜以下'],
    ]),
  },
  {
    id: 'everyday',
    en: 'Numbers in everyday situations',
    ja: '日常生活で使う数字',
    intro: {
      en: 'Use number vocabulary for amounts, prices, phone numbers, and large figures.',
      ja: '数量・値段・電話番号・大きな金額などを伝えるときに使います。',
    },
    note: {
      en: 'Phone numbers are often said digit by digit. For example, 555-0102 can be read “five five five, zero one zero two.” A number below zero such as −5 can be read “negative five” or “minus five.”',
      ja: '電話番号は一桁ずつ読むことがよくあります。たとえば555-0102は five five five, zero one zero two と読めます。−5のような0より小さい数は negative five または minus five と読めます。',
    },
    items: makeItems([
      ['#', 'numbers / a number', '数字、数'], ['0–9', 'digit', '一桁の数字（0から9）'],
      ['∑', 'amount', '量、金額'], ['$', 'price', '値段、価格'],
      ['−5', 'negative / minus', '負の数、マイナス'], ['555-0102', 'phone number', '電話番号'],
      ['$19.99', 'nineteen dollars and ninety-nine cents / nineteen ninety-nine', '19ドル99セント'],
      ['1.2M', '1.2 million', '120万'], ['3.5B', '3.5 billion dollars', '35億ドル'],
    ]),
    example: {
      en: '“$19.99” is “nineteen dollars and ninety-nine cents,” or “nineteen ninety-nine” when the price is clear from context.',
      ja: '「$19.99」は nineteen dollars and ninety-nine cents と読みます。値段の話だと分かる文脈では、nineteen ninety-nine と短く言うこともあります。',
    },
  },
]

export const numberLessonNotes = {
  en: 'Numbers are easier to learn when you connect the written figure to how people say it: count, compare, estimate, and recognize the context.',
  ja: '数字は、表記だけでなく、実際の読み方と使う場面を結び付けると覚えやすくなります。数える・比べる・概算する・文脈から意味を判断する練習をしましょう。',
}
