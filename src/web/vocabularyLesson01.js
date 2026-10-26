// Lesson 1 follows the user's organized General American vocabulary list.
// Transcontinental countries can appear under more than one region filter.
export const regions = [
  { id: 'all', en: 'All regions', ja: 'すべて' },
  { id: 'americas', en: 'Americas', ja: '南北アメリカ' },
  { id: 'europe', en: 'Europe', ja: 'ヨーロッパ' },
  { id: 'africa', en: 'Africa', ja: 'アフリカ' },
  { id: 'asia', en: 'Asia', ja: 'アジア' },
  { id: 'oceania', en: 'Oceania', ja: 'オセアニア' },
]

export const countries = [
  { code: 'ar', country: 'Argentina', ja: 'アルゼンチン', nationality: 'Argentinian / Argentine', nationalityJa: 'アルゼンチン人', regions: ['americas'] },
  { code: 'au', country: 'Australia', ja: 'オーストラリア', nationality: 'Australian', nationalityJa: 'オーストラリア人', regions: ['oceania'] },
  { code: 'br', country: 'Brazil', ja: 'ブラジル', nationality: 'Brazilian', nationalityJa: 'ブラジル人', regions: ['americas'] },
  { code: 'ca', country: 'Canada', ja: 'カナダ', nationality: 'Canadian', nationalityJa: 'カナダ人', regions: ['americas'] },
  { code: 'cn', country: 'China', ja: '中国', nationality: 'Chinese', nationalityJa: '中国人', regions: ['asia'] },
  { code: 'cz', country: 'Czech Republic / Czechia', ja: 'チェコ', nationality: 'Czech', nationalityJa: 'チェコ人', regions: ['europe'] },
  { code: 'eg', country: 'Egypt', ja: 'エジプト', nationality: 'Egyptian', nationalityJa: 'エジプト人', regions: ['africa'] },
  { code: 'fr', country: 'France', ja: 'フランス', nationality: 'French', nationalityJa: 'フランス人', regions: ['europe'] },
  { code: 'de', country: 'Germany', ja: 'ドイツ', nationality: 'German', nationalityJa: 'ドイツ人', regions: ['europe'] },
  { code: 'gr', country: 'Greece', ja: 'ギリシャ', nationality: 'Greek', nationalityJa: 'ギリシャ人', regions: ['europe'] },
  { code: 'in', country: 'India', ja: 'インド', nationality: 'Indian', nationalityJa: 'インド人', regions: ['asia'] },
  { code: 'id', country: 'Indonesia', ja: 'インドネシア', nationality: 'Indonesian', nationalityJa: 'インドネシア人', regions: ['asia'] },
  { code: 'jp', country: 'Japan', ja: '日本', nationality: 'Japanese', nationalityJa: '日本人', regions: ['asia'] },
  { code: 'mx', country: 'Mexico', ja: 'メキシコ', nationality: 'Mexican', nationalityJa: 'メキシコ人', regions: ['americas'] },
  { code: 'mn', country: 'Mongolia', ja: 'モンゴル', nationality: 'Mongolian', nationalityJa: 'モンゴル人', regions: ['asia'] },
  { code: 'np', country: 'Nepal', ja: 'ネパール', nationality: 'Nepali', nationalityJa: 'ネパール人', regions: ['asia'] },
  { code: 'nl', country: 'the Netherlands', ja: 'オランダ', nationality: 'Dutch', nationalityJa: 'オランダ人', regions: ['europe'] },
  { code: 'nz', country: 'New Zealand', ja: 'ニュージーランド', nationality: 'New Zealander', nationalityJa: 'ニュージーランド人', regions: ['oceania'] },
  { code: 'pk', country: 'Pakistan', ja: 'パキスタン', nationality: 'Pakistani', nationalityJa: 'パキスタン人', regions: ['asia'] },
  { code: 'ph', country: 'the Philippines', ja: 'フィリピン', nationality: 'Filipino', nationalityJa: 'フィリピン人', regions: ['asia'] },
  { code: 'pl', country: 'Poland', ja: 'ポーランド', nationality: 'Polish', nationalityJa: 'ポーランド人', regions: ['europe'] },
  { code: 'pt', country: 'Portugal', ja: 'ポルトガル', nationality: 'Portuguese', nationalityJa: 'ポルトガル人', regions: ['europe'] },
  { code: 'ie', country: 'Republic of Ireland / ROI', ja: 'アイルランド共和国', nationality: 'Irish', nationalityJa: 'アイルランド人', regions: ['europe'] },
  { code: 'ru', country: 'Russia', ja: 'ロシア', nationality: 'Russian', nationalityJa: 'ロシア人', regions: ['europe', 'asia'] },
  { code: 'sg', country: 'Singapore', ja: 'シンガポール', nationality: 'Singaporean', nationalityJa: 'シンガポール人', regions: ['asia'] },
  { code: 'sk', country: 'Slovakia', ja: 'スロバキア', nationality: 'Slovak', nationalityJa: 'スロバキア人', regions: ['europe'] },
  { code: 'za', country: 'South Africa', ja: '南アフリカ', nationality: 'South African', nationalityJa: '南アフリカ人', regions: ['africa'] },
  { code: 'kr', country: 'South Korea', ja: '韓国', nationality: 'South Korean', nationalityJa: '韓国人', regions: ['asia'] },
  { code: 'es', country: 'Spain', ja: 'スペイン', nationality: 'Spanish', nationalityJa: 'スペイン人', regions: ['europe'] },
  { code: 'th', country: 'Thailand', ja: 'タイ', nationality: 'Thai', nationalityJa: 'タイ人', regions: ['asia'] },
  { code: 'tr', country: 'Turkey', ja: 'トルコ', nationality: 'Turkish', nationalityJa: 'トルコ人', regions: ['europe', 'asia'] },
  { code: 'ae', country: 'the United Arab Emirates / UAE', ja: 'アラブ首長国連邦', nationality: 'Emirati', nationalityJa: 'アラブ首長国連邦の人', regions: ['asia'] },
  { code: 'gb', country: 'the United Kingdom / UK', ja: 'イギリス', nationality: 'British', nationalityJa: 'イギリス人', regions: ['europe'] },
  { code: 'us', country: 'the United States of America / United States / US / USA', ja: 'アメリカ合衆国', nationality: 'American', nationalityJa: 'アメリカ人', regions: ['americas'] },
]

export const placeWords = [
  { en: 'country / countries', ja: '国（単数形／複数形）' },
  { en: 'nationality / nationalities', ja: '国籍（単数形／複数形）' },
  { en: 'city', ja: '市・都市' },
  { en: 'hometown', ja: '出身地・故郷' },
  { en: 'state', ja: '州（アメリカなど）' },
  { en: 'ZIP code', ja: 'アメリカの郵便番号' },
]

export const placePhrases = [
  { en: 'Where are you from?', ja: 'どちらのご出身ですか？' },
  { en: "I'm from ...", ja: '私は……出身です。' },
]
