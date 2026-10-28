// General American reference inventory. Symbols are phonemes rather than
// English letters. Example recordings are specifically licensed source files.
// Where audioFile is omitted the UI labels browser-generated speech explicitly.
// Wikimedia Commons original file pages: https://commons.wikimedia.org/wiki/File:<filename>
const c = (ipa, word, clue, ja, audioFile = null) => ({ipa, word, clue, ja, audioFile})
export const ipaGroups = [
  {
    id: 'consonants', title: 'Consonants', ja: '子音',
    sounds: [
      c('p','pen','Lips close, then release air.','唇を閉じ、息を出す。','En-us-pen.ogg'),
      c('b','ball','Like /p/, with your voice on.','/p/ と似ているが声を出す。'),
      c('t','tea','Tongue touches the ridge behind your teeth.','舌先を上の歯ぐきにつける。'),
      c('d','day','Like /t/, with your voice on.','/t/ と似ているが声を出す。'),
      c('k','cat','Back of the tongue releases air.','舌の奥で息を止めて離す。','En-us-cat.ogg'),
      c('g','go','Like /k/, with your voice on.','/k/ と似ているが声を出す。'),
      c('m','moon','Lips together; air goes through the nose.','唇を閉じ、鼻から息を出す。'),
      c('n','no','Tongue touches upper ridge; air through nose.','舌先を上の歯ぐきにつけ、鼻から息を出す。'),
      c('ŋ','sing','Nasal sound at the back of the mouth.','舌の奥で作る鼻音。'),
      c('tʃ','chair','The “ch” sound.','「ch」の音。'),
      c('dʒ','jump','The “j” sound.','「j」の音。'),
      c('f','fish','Upper teeth lightly touch lower lip.','上の歯を下唇に軽く当てる。'),
      c('v','van','Like /f/, with your voice on.','/f/ と似ているが声を出す。'),
      c('θ','thin','Air passes between tongue and teeth.','舌を歯に近づけて息を通す。','En-us-thin.ogg'),
      c('ð','feather','Like /θ/, but voiced.','/θ/ と似ているが声を出す。','En-us-feather.ogg'),
      c('s','sun','Hissing sound; voice off.','息を細く出す。声は使わない。'),
      c('z','zoo','Like /s/, but voiced.','/s/ と似ているが声を出す。'),
      c('ʃ','ship','The “sh” sound.','「sh」の音。','En-us-ship.ogg'),
      c('ʒ','vision','The voiced sound in “vision.”','「vision」にある有声音。'),
      c('h','hat','A breath before the vowel.','母音の前に息を出す。'),
      c('w','we','Round your lips, then move into the vowel.','唇を丸めて母音へ移る。'),
      c('j','yes','The consonant at the start of “yes.”','「yes」の最初の子音。'),
      c('ɹ','red','American English r; tongue does not tap.','米語の r。舌をはじかない。'),
      c('l','leaf','Tongue touches the ridge behind the teeth.','舌先を上の歯ぐきにつける。'),
    ],
  },
  {
    id: 'vowels', title: 'Vowels', ja: '母音',
    sounds: [
      c('i','seat','Compare with /ɪ/ in sit.','sit の /ɪ/ と聞き比べる。','En-us-seat.ogg'),
      c('ɪ','sit','Compare with /i/ in seat.','seat の /i/ と聞き比べる。','En-us-sit.ogg'),
      c('ɛ','bed','The vowel in “bed.”','「bed」の母音。'),
      c('æ','cat','Open front vowel.','口を開けた前寄りの母音。','En-us-cat.ogg'),
      c('ʌ','cup','Stressed vowel in “cup.”','「cup」の強勢がある母音。'),
      c('ə','about','Schwa: an unstressed, reduced vowel.','シュワ。強勢のない弱い母音。'),
      c('u','food','Compare with /ʊ/ in foot.','foot の /ʊ/ と聞き比べる。'),
      c('ʊ','foot','Compare with /u/ in food.','food の /u/ と聞き比べる。'),
      c('ɑ','father','A low back vowel; also cot for many speakers.','後ろ寄りの低い母音。cot にも使う話者が多い。'),
      c('ɔ','caught','Some speakers merge this with /ɑ/.','/ɑ/ と区別しない話者も多い。'),
      c('ɝ','bird','Stressed r-colored vowel.','強勢のある r の響きを含む母音。'),
      c('ɚ','teacher','Unstressed r-colored vowel.','強勢のない r の響きを含む母音。'),
    ],
  },
  {
    id: 'diphthongs', title: 'Vowel glides', ja: '二重母音',
    sounds: [
      c('eɪ','A','This letter name also contains the vowel in “day.”','文字 A の名前。「day」と同じ母音。','En-us-A.ogg'),
      c('oʊ','go','A rounded vowel glide.','唇を丸める方向へ動く。'),
      c('aɪ','I','The sound in “my” and “I.”','「my」「I」の音。','En-us-I.ogg'),
      c('aʊ','house','The sound in “now.”','「now」の音。'),
      c('ɔɪ','boy','The sound in “boy.”','「boy」の音。'),
    ],
  },
]
export const allIpaSounds = ipaGroups.flatMap(group => group.sounds.map(sound => ({...sound, group:group.id})))
export const getIpaSound = symbol => allIpaSounds.find(sound=>sound.ipa===symbol)
export const IPA_SOURCE_BASE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'
export const IPA_LICENSE_NOTE = 'Some linked U.S.-English word recordings are hosted by Wikimedia Commons under their individual file licenses (public domain or CC BY-SA/GFDL).'
