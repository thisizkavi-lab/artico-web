// Chapter 20 is a vocabulary atlas: each useful term has its own card.
// Keep this list independent from the manuscript tables so the Study UI can
// present one word per card while the original source remains available to Practice.
const card = (id, en, ja, definition, jaDefinition, kind = 'word') => ({
  id, en, ja, definition, jaDefinition, kind,
})

export const chapter20VocabularySections = [
  {
    id: '20-study-0',
    groups: [
      {
        title: 'Drinks',
        jaTitle: '飲み物',
        items: [
          card('ch20-v0', 'black coffee', 'ブラックコーヒー', 'Coffee without added milk or cream.', '牛乳やクリームを加えていないコーヒー。'),
          card('ch20-atlas-coffee-with-milk', 'coffee with milk', 'ミルク入りコーヒー', 'Coffee served with milk.', '牛乳を加えたコーヒー。'),
          card('ch20-atlas-coffee-with-cream', 'coffee with cream', 'クリーム入りコーヒー', 'Coffee served with cream.', 'クリームを加えたコーヒー。'),
          card('ch20-atlas-espresso', 'espresso', 'エスプレッソ', 'Strong coffee made by forcing hot water through ground coffee.', '挽いたコーヒーに熱湯を圧力で通して作る、濃いコーヒー。'),
          card('ch20-atlas-latte', 'latte', 'カフェラテ', 'Espresso mixed with steamed milk.', 'エスプレッソにスチームミルクを加えた飲み物。'),
          card('ch20-atlas-cappuccino', 'cappuccino', 'カプチーノ', 'Espresso with steamed milk and a layer of milk foam.', 'エスプレッソにスチームミルクと泡立てたミルクを加えた飲み物。'),
          card('ch20-atlas-iced-coffee', 'iced coffee', 'アイスコーヒー', 'Coffee served cold, usually with ice.', '冷たくして出すコーヒー。通常は氷が入る。'),
          card('ch20-atlas-iced-tea', 'iced tea', 'アイスティー', 'Tea served cold, usually with ice.', '冷たくして出すお茶。通常は氷が入る。'),
          card('ch20-atlas-herbal-tea', 'herbal tea', 'ハーブティー', 'A drink made by infusing herbs or other plants.', 'ハーブなどの植物を湯に浸して作る飲み物。'),
          card('ch20-atlas-hot-chocolate', 'hot chocolate', 'ホットチョコレート', 'A warm drink made with chocolate.', 'チョコレートを使った温かい飲み物。'),
          card('ch20-atlas-milkshake', 'milkshake', 'ミルクシェイク', 'A thick, cold drink often made with milk and ice cream.', '牛乳やアイスクリームなどを混ぜた、冷たく濃厚な飲み物。'),
          card('ch20-atlas-juice', 'juice', 'ジュース', 'Liquid from fruit or vegetables.', '果物や野菜から取った液体。'),
          card('ch20-atlas-soda', 'soda', 'ソーダ／炭酸飲料', 'A fizzy soft drink.', '泡のある清涼飲料。'),
          card('ch20-atlas-sparkling-water', 'sparkling water', '炭酸水', 'Water containing bubbles of carbon dioxide.', '二酸化炭素の泡が入った水。'),
        ],
      },
      {
        title: 'Milk choices',
        jaTitle: '牛乳・植物性ミルク',
        items: [
          card('ch20-atlas-whole-milk', 'whole milk', '全乳／成分無調整牛乳', 'Milk with its natural fat content.', '脂肪分を取り除いていない牛乳。'),
          card('ch20-atlas-skim-milk', 'skim milk', '脱脂乳', 'Milk with most of its fat removed.', '脂肪分の大部分を取り除いた牛乳。'),
          card('ch20-atlas-oat-milk', 'oat milk', 'オーツミルク', 'A plant-based drink made from oats.', 'オーツ麦から作られる植物性の飲み物。'),
          card('ch20-atlas-soy-milk', 'soy milk', '豆乳', 'A plant-based drink made from soybeans.', '大豆から作られる植物性の飲み物。'),
          card('ch20-atlas-almond-milk', 'almond milk', 'アーモンドミルク', 'A plant-based drink made from almonds.', 'アーモンドから作られる植物性の飲み物。'),
        ],
      },
      {
        title: 'Order details & cups',
        jaTitle: '注文の希望・カップ',
        items: [
          card('ch20-v1', 'reusable cup', '繰り返し使えるカップ', 'A cup designed to be used more than once.', '何度も繰り返し使えるように作られたカップ。'),
          card('ch20-p5062270939475', 'no sugar', '砂糖なし', 'Without added sugar.', '砂糖を加えないこと。', 'phrase'),
          card('ch20-p150193828440383', 'with milk', 'ミルク入り', 'Served with milk.', 'ミルクを加えて出すこと。', 'phrase'),
          card('ch20-p274860317030883', 'without ice', '氷なし', 'Served without ice.', '氷を入れずに出すこと。', 'phrase'),
        ],
      },
    ],
  },
  {
    id: '20-study-1',
    groups: [
      {
        title: 'Tools',
        jaTitle: '道具',
        items: [
          card('ch20-atlas-knife', 'knife', '包丁', 'A tool with a blade for cutting food.', '食材を切るための刃物。'),
          card('ch20-atlas-cutting-board', 'cutting board', 'まな板', 'A flat board used as a surface for cutting food.', '食材を切るときに使う板。'),
          card('ch20-atlas-peeler', 'peeler', '皮むき器', 'A tool for removing the skin of fruit or vegetables.', '果物や野菜の皮をむく道具。'),
          card('ch20-atlas-grater', 'grater', 'おろし器', 'A tool that shreds food into small pieces.', '食材を細かくおろす道具。'),
          card('ch20-atlas-mixing-bowl', 'mixing bowl', 'ボウル', 'A bowl used to combine ingredients.', '材料を混ぜ合わせるためのボウル。'),
          card('ch20-atlas-spoon', 'spoon', 'スプーン', 'A utensil used for stirring, mixing or serving.', '混ぜたり、すくったり、取り分けたりする道具。'),
          card('ch20-v2', 'whisk', '泡立て器', 'A wire tool for beating or blending ingredients; also the action.', '材料を混ぜたり泡立てたりする針金状の道具。動作を表す動詞にもなる。'),
          card('ch20-atlas-measuring-cup', 'measuring cup', '計量カップ', 'A cup marked for measuring ingredients by volume.', '材料の容量を量るための目盛り付きカップ。'),
          card('ch20-atlas-kitchen-scale', 'kitchen scale', 'キッチンスケール／料理用はかり', 'A device for measuring the weight of ingredients.', '材料の重さを量るためのはかり。'),
          card('ch20-atlas-colander', 'colander', '水切りざる', 'A bowl with holes used to drain food.', '穴の開いた、水切り用のボウル状のざる。'),
          card('ch20-atlas-strainer', 'strainer', 'こし器', 'A tool used to separate solids from liquids.', '液体と固形物を分けるための道具。'),
          card('ch20-v3', 'skillet', 'スキレット／浅いフライパン', 'A relatively shallow pan used for cooking.', '比較的浅い調理用のフライパン。'),
          card('ch20-atlas-frying-pan', 'frying pan', 'フライパン', 'A shallow pan used for frying or cooking food.', '食材を炒めたり焼いたりする浅い鍋。'),
          card('ch20-atlas-saucepan', 'saucepan', '片手鍋', 'A deeper pan, often used for liquids or sauces.', '液体やソースなどを調理する深めの鍋。'),
          card('ch20-atlas-blender', 'blender', 'ブレンダー', 'A machine with blades that blend food.', '刃で食材を細かく混ぜる機械。'),
          card('ch20-atlas-mixer', 'mixer', 'ミキサー', 'A machine that mixes ingredients together.', '材料を混ぜ合わせる機械。'),
          card('ch20-atlas-baking-dish', 'baking dish', '耐熱皿／オーブン皿', 'An oven-safe dish used for baking.', 'オーブンで調理するときに使う耐熱皿。'),
          card('ch20-atlas-microwave', 'microwave', '電子レンジ', 'An appliance that heats food using microwaves.', 'マイクロ波で食べ物を温める電化製品。'),
          card('ch20-atlas-toaster', 'toaster', 'トースター', 'An appliance used to toast bread.', 'パンを焼くための電化製品。'),
          card('ch20-p61159132942234', 'French press', 'フレンチプレス', 'A coffee maker with a plunger that separates grounds from the drink.', '押し下げる部品でコーヒーの粉と飲み物を分ける器具。'),
        ],
      },
      {
        title: 'Actions',
        jaTitle: '動作',
        items: [
          card('ch20-atlas-slice', 'slice', '薄く切る', 'Cut food into thin pieces.', '食材を薄い部分に切る。'),
          card('ch20-atlas-chop', 'chop', '刻む／小さく切る', 'Cut food into pieces.', '食材を小さな部分に切る。'),
          card('ch20-atlas-peel-verb', 'peel', '皮をむく', 'Remove the outer skin of fruit or vegetables.', '果物や野菜の外側の皮を取り除く。'),
          card('ch20-atlas-grate-verb', 'grate', 'すりおろす', 'Shred food into small pieces.', '食材を細かな断片になるようにおろす。'),
          card('ch20-atlas-mix-verb', 'mix', '混ぜる', 'Combine two or more ingredients.', '二つ以上の材料を一緒にする。'),
          card('ch20-atlas-stir', 'stir', 'かき混ぜる', 'Move ingredients around, often in a circular motion.', '円を描くように材料を動かして混ぜる。'),
          card('ch20-atlas-measure', 'measure', '量る／測る', 'Find the amount or volume of something.', '物の量や容量を調べる。'),
          card('ch20-atlas-weigh', 'weigh', '重さを量る', 'Measure how heavy something is.', '物の重さを調べる。'),
          card('ch20-atlas-drain', 'drain', '水を切る', 'Remove liquid from food.', '食材から液体を取り除く。'),
          card('ch20-atlas-blend', 'blend', 'なめらかになるまで混ぜる', 'Mix ingredients until smooth.', '材料がなめらかになるまで混ぜる。'),
          card('ch20-p165492869605220', 'pour', '注ぐ', 'Make liquid flow into a container.', '液体を容器などに流し入れる。'),
          card('ch20-p101607893681287', 'roll out', '生地を伸ばす', 'Flatten dough with a rolling pin.', 'めん棒などを使って生地を平らに伸ばす。'),
          card('ch20-p4397906018824', 'burn', '焦がす', 'Damage food by applying too much heat.', '火を通しすぎて食材を焦がす。'),
        ],
      },
    ],
  },
  {
    id: '20-study-2',
    groups: [
      {
        title: 'Cooking & preparation methods',
        jaTitle: '調理・下ごしらえの方法',
        items: [
          card('ch20-p43501266964968', 'baked', 'オーブンで焼いた', 'Cooked in an oven.', 'オーブンの中で加熱して調理した。'),
          card('ch20-p277311040112382', 'roasted', 'ローストした／オーブンで焼いた', 'Cooked with dry heat, usually in an oven.', '通常はオーブンで、乾いた熱を使って調理した。'),
          card('ch20-p198597246865785', 'grilled', 'グリルで焼いた', 'Cooked on a grill using direct heat.', 'グリルの上で直接熱を当てて調理した。'),
          card('ch20-p255077661947611', 'broiled', '上火で焼いた', 'Cooked by direct radiant heat, often from above.', '主に上からの放射熱を直接当てて調理した。'),
          card('ch20-p123510243056896', 'fried', '油で調理した', 'Cooked in hot fat or oil.', '熱した油や脂を使って調理した。'),
          card('ch20-p31665357450384', 'stir-fried', '炒めた', 'Cooked quickly in a little oil while being moved around.', '少量の油で、食材を動かしながら手早く炒めた。'),
          card('ch20-p197941710233947', 'deep-fried', '油で揚げた', 'Cooked while completely submerged in hot oil.', '熱い油に完全に沈めて調理した。'),
          card('ch20-p238904086670093', 'boiled', 'ゆでた', 'Cooked in liquid that is boiling.', '沸騰した液体の中で調理した。'),
          card('ch20-p278705757636955', 'poached', '弱火の液体で静かに火を通した', 'Cooked gently in hot liquid below a full boil.', '沸騰させない熱い液体の中で、静かに火を通した。'),
          card('ch20-p101288901568736', 'stewed', '煮込んだ', 'Cooked slowly in liquid.', '液体の中で時間をかけてゆっくり調理した。'),
          card('ch20-p135767272981666', 'steamed', '蒸した', 'Cooked using steam rather than direct contact with water.', '水に直接浸さず、蒸気を使って調理した。'),
          card('ch20-p1903753091834', 'marinated', '漬け込んだ', 'Left in a seasoned liquid before cooking or serving.', '調理や提供の前に、味付けした液体に浸しておいた。'),
          card('ch20-p171289081376640', 'smoked', '燻製にした', 'Treated or cooked using smoke.', '煙を使って風味を付けたり、調理・保存したりした。'),
          card('ch20-p90038313019597', 'Is it baked or fried?', 'オーブン焼きですか、それとも油で揚げたものですか？', 'A useful question when you want to know how food was cooked.', '料理の調理方法を知りたいときに使える質問。', 'phrase'),
        ],
      },
    ],
  },
  {
    id: '20-study-3',
    groups: [
      {
        title: 'Menu & payment',
        jaTitle: 'メニュー・会計',
        items: [
          card('ch20-atlas-appetizer', 'appetizer', '前菜', 'A small dish served before the main course.', 'メイン料理の前に出される小さな料理。'),
          card('ch20-atlas-starter', 'starter', '前菜', 'The first course of a meal.', '食事の最初に出される料理。'),
          card('ch20-atlas-main-course', 'main course', 'メイン料理', 'The principal dish in a meal.', '食事の中心となる料理。'),
          card('ch20-atlas-entree', 'entrée', 'メイン料理（米語）', 'In US restaurant English, the main course.', 'アメリカのレストラン英語では、メイン料理を指す。'),
          card('ch20-atlas-side', 'side', '付け合わせ', 'Food served alongside the main course.', 'メイン料理に添えて出される料理。'),
          card('ch20-atlas-side-dish', 'side dish', '付け合わせの料理', 'An additional dish served with the main course.', 'メイン料理と一緒に出される追加の一品。'),
          card('ch20-atlas-dessert', 'dessert', 'デザート', 'A sweet dish or course at the end of a meal.', '食事の最後に出される甘い料理。'),
          card('ch20-p182627730865307', 'pudding', 'プディング／デザート（主に英）', 'In British English, a dessert or a particular sweet dish.', 'イギリス英語では、デザート全般または特定の甘い料理を指す。'),
          card('ch20-atlas-reservation', 'reservation', '予約', 'An arrangement to hold a table at a restaurant.', 'レストランの席を事前に確保すること。'),
          card('ch20-atlas-check', 'check', '会計伝票（米語）', 'In US English, the statement showing what you owe.', 'アメリカ英語で、支払う金額が記された伝票。'),
          card('ch20-atlas-bill', 'bill', '会計伝票／勘定', 'The statement of what you owe at a restaurant.', 'レストランで支払う金額が記された伝票。'),
          card('ch20-atlas-split-the-check', 'split the check', '会計を割り勘にする', 'Divide the total bill between two or more people.', '合計金額を二人以上で分けて支払う。', 'phrase'),
        ],
      },
      {
        title: 'Dietary choices',
        jaTitle: '食事の条件',
        items: [
          card('ch20-p83725282103968', 'vegetarian', 'ベジタリアン', 'Describes food that excludes meat and fish.', '肉や魚を使わない食事を表す。'),
          card('ch20-p37876039706014', 'vegan', 'ヴィーガン', 'Describes food with no animal-derived ingredients.', '動物由来の食材を使わない食事を表す。'),
          card('ch20-p118053332228537', 'dairy-free', '乳製品不使用', 'Made without milk or other dairy products.', '牛乳やその他の乳製品を使っていない。'),
          card('ch20-p234765972321340', 'gluten-free', 'グルテンフリー', 'Made without gluten; this does not mean free of every allergen.', 'グルテンを含まないこと。他のすべてのアレルゲンも含まないという意味ではない。'),
        ],
      },
    ],
  },
]

export const chapter20VocabularyCount = chapter20VocabularySections
  .flatMap((section) => section.groups)
  .reduce((total, group) => total + group.items.length, 0)
