import { everydayAudioByChapter } from './everydayAudioCatalog.js'

/*
 * Source-book lesson data for chapters 80–96.
 *
 * These chapters intentionally keep the English text limited to the lines and
 * vocabulary printed in English for Everyone: Everyday English.  Japanese
 * notes explain the source material, but do not introduce additional English
 * examples.
 */

const p = (phrase, meaning, audio) => ({ phrase, meaning, context: '原書の表現', register: 'neutral', audio })
const v = (phrase, meaning, audio) => ({ phrase, meaning, context: '原書の語彙', register: 'neutral', audio })
const section = (id, title, enTitle, phrases, audioFiles = []) => ({ id, title, enTitle, intro: '原書の英文を、意味と音声とともに確認します。', phrases, recognition: [], audioFiles })

const audio = (file) => file

const sourceLesson = ({ id, number, title, enTitle, ja, cando, intro, functions, sections, tip, dialogues = [] }) => ({
  id,
  kind: 'source-book',
  number: String(number),
  title,
  enTitle,
  ja,
  cando,
  learn: { intro, functions, sections, tip, dialogues },
  practice: {
    title: `${enTitle} · 原書フレーズ練習`,
    instructions: '原書にある英文を聞き、意味を確認して声に出します。',
    corePhrases: sections.flatMap((item) => item.phrases).map((item) => ({ ...item, rate: item.phrase.length > 70 ? 0.78 : 0.86 })),
    dialogues,
    natural: [],
  },
})

export const sourceBookLessons = {
  'social-80': sourceLesson({
    id: 'health-medicine', number: 80, enTitle: 'Health and medicine',
    title: '第80章に入る前に：なぜ「健康や医療で使う英語」を学ぶのでしょうか？',
    ja: '人体、医療専門職、病気とけが、緊急事態・診断・治療の語彙を学びます。',
    cando: '体の部位、医療者、症状、検査、治療に関する原書の語彙を理解できる。',
    intro: ['体調が悪いときは、普段よりも正確に自分の状態を伝える必要があります。どこが痛いのか、どんな症状があるのか、いつから続いているのかによって、相手の対応も変わります。', '大切なのは、自分の症状や必要な薬・処置を、できるだけ具体的に伝えることです。', 'この章では、原書に掲載されている人体、医療専門職、病気とけが、緊急事態・診断・治療の語彙を、日本語の説明とともに確認します。'],
    functions: [['01', '人体の部位を確認する'], ['02', '医療専門職を確認する'], ['03', '病気とけがを確認する'], ['04', '緊急事態・診断・治療を確認する']],
    sections: [
      section('80-1', '人体', 'The human body', [
        v('head', '頭', audio('ee_80_1_head_us.mp3')), v('shoulder', '肩', audio('ee_80_1_shoulder_us.mp3')), v('neck', '首', audio('ee_80_1_neck_us.mp3')), v('heart', '心臓', audio('ee_80_1_heart_us.mp3')), v('nipple', '乳首', audio('ee_80_1_nipple_us.mp3')), v('chest', '胸', audio('ee_80_1_chest_us.mp3')), v('armpit', '脇の下', audio('ee_80_1_armpit_us.mp3')), v('arm', '腕', audio('ee_80_1_arm_us.mp3')), v('lung', '肺', audio('ee_80_1_lung_us.mp3')), v('breast', '乳房・胸', audio('ee_80_1_breast_us.mp3')), v('elbow', 'ひじ', audio('ee_80_1_elbow_us.mp3')), v('liver', '肝臓', audio('ee_80_1_liver_us.mp3')), v('stomach', '胃', audio('ee_80_1_stomach_us.mp3')), v('waist', '腰', audio('ee_80_1_waist_us.mp3')), v('forearm', '前腕', audio('ee_80_1_forearm_us.mp3')), v('abdomen', '腹部', audio('ee_80_1_abdomen_us.mp3')), v('kidney', '腎臓', audio('ee_80_1_kidney_us.mp3')), v('wrist', '手首', audio('ee_80_1_wrist_us.mp3')), v('finger', '指', audio('ee_80_1_finger_us.mp3')), v('hand', '手', audio('ee_80_1_hand_us.mp3')), v('hip', '腰・尻', audio('ee_80_1_hip_us.mp3')), v('vagina', '膣', audio('ee_80_1_vagina_us.mp3')), v('groin', '鼠径部', audio('ee_80_1_groin_us.mp3')), v('navel', 'へそ', audio('ee_80_1_navel_us.mp3')), v('thigh', '太もも', audio('ee_80_1_thigh_us.mp3')), v('penis', '陰茎', audio('ee_80_1_penis_us.mp3')), v('knee', 'ひざ', audio('ee_80_1_knee_us.mp3')), v('bone', '骨', audio('ee_80_1_bone_us.mp3')), v('calf', 'ふくらはぎ', audio('ee_80_1_calf_us.mp3')), v('leg', '脚', audio('ee_80_1_leg_us.mp3')), v('shin', 'すね', audio('ee_80_1_shin_us.mp3')), v('toe', '足の指', audio('ee_80_1_toe_us.mp3')), v('ankle', '足首', audio('ee_80_1_ankle_us.mp3')), v('foot', '足', audio('ee_80_1_foot_us.mp3')), v('heel', 'かかと', audio('ee_80_1_heel_us.mp3'))
      ], ['ee_80_1_humanbody_us.mp3']),
      section('80-2', '医療専門職', 'Medical professionals', [
        v('nurse', '看護師', audio('ee_80_2_nurse_us.mp3')), v('surgeon', '外科医', audio('ee_80_2_surgeon_us.mp3')), v('anaesthetist', '麻酔科医', audio('ee_80_2_anesthesiologist_us.mp3')), v('paramedic', '救急救命士', audio('ee_80_2_paramedic_us.mp3')), v('pharmacist', '薬剤師', audio('ee_80_2_pharmacist_us.mp3')), v('midwife', '助産師', audio('ee_80_2_midwife_us.mp3')), v('paediatrician', '小児科医', audio('ee_80_2_pediatrician_us.mp3')), v('optician', '眼鏡技師・検眼士', audio('ee_80_2_optician_us.mp3')), v('physiotherapist', '理学療法士', audio('ee_80_2_physicaltherapist_us.mp3')), v('dentist', '歯科医', audio('ee_80_2_dentist_us.mp3')), v('therapist', 'セラピスト・療法士', audio('ee_80_2_therapist_us.mp3'))
      ], ['ee_80_2_medicalprofessionals_us.mp3']),
      section('80-3', '病気とけが', 'Illnesses and injuries', [
        v('cough', 'せき', audio('ee_80_3_cough_us.mp3')), v('runny nose', '鼻水', audio('ee_80_3_runnynose_us.mp3')), v('virus', 'ウイルス', audio('ee_80_3_virus_us.mp3')), v('fever', '発熱・熱', audio('ee_80_3_fever_us.mp3')), v('sore throat', 'のどの痛み', audio('ee_80_3_sorethroat_us.mp3')), v('infection', '感染症', audio('ee_80_3_infection_us.mp3')), v('allergy', 'アレルギー', audio('ee_80_3_allergy_us.mp3')), v('headache', '頭痛', audio('ee_80_3_headache_us.mp3')), v('earache', '耳痛', audio('ee_80_3_earache_us.mp3')), v('nausea', '吐き気', audio('ee_80_3_nausea_us.mp3')), v('diarrhoea', '下痢', audio('ee_80_3_diarrhea_us.mp3')), v('food poisoning', '食中毒', audio('ee_80_3_foodpoisoning_us.mp3')), v('upset stomach', '胃の不調・腹痛', audio('ee_80_3_upsetstomach_us.mp3')), v('rash', '発疹', audio('ee_80_3_rash_us.mp3')), v('graze', '擦り傷', audio('ee_80_3_scrape_us.mp3')), v('bruise', 'あざ', audio('ee_80_3_bruise_us.mp3')), v('bump', 'こぶ・腫れ', audio('ee_80_3_swelling_us.mp3')), v('burn', 'やけど', audio('ee_80_3_burn_us.mp3')), v('bite', 'かみ傷・虫刺され', audio('ee_80_3_bite_us.mp3')), v('cramp', 'けいれん・こむら返り', audio('ee_80_3_cramp_us.mp3')), v('sprain', '捻挫', audio('ee_80_3_sprain_us.mp3')), v('broken bone', '骨折', audio('ee_80_3_brokenbone_us.mp3'))
      ], ['ee_80_3_illnessesandinjuries_us.mp3']),
      section('80-4', '緊急事態・診断・治療', 'Emergencies, diagnoses, and treatment', [
        v('ambulance', '救急車', audio('ee_80_4_ambulance_us.mp3')), v('hospital', '病院', audio('ee_80_4_hospital_us.mp3')), v('A&E (accident and emergency)', '救急外来', audio('ee_80_4_er_us.mp3')), v('emergency', '緊急事態', audio('ee_80_4_emergency_us.mp3')), v('accident', '事故', audio('ee_80_4_accident_us.mp3')), v('hospital porter', '病院内の搬送係', audio('ee_80_4_hospitalporter_us.mp3')), v('temperature', '体温・熱', audio('ee_80_4_temperature_us.mp3')), v('blood pressure', '血圧', audio('ee_80_4_bloodpressure_us.mp3')), v('blood test', '血液検査', audio('ee_80_4_bloodwork_us.mp3')), v('heart rate', '心拍数', audio('ee_80_4_heartrate_us.mp3')), v('X-ray', 'X線・レントゲン', audio('ee_80_4_xray_us.mp3')), v('scan', 'スキャン・画像検査', audio('ee_80_4_scan_us.mp3')), v('check-up', '健康診断・検診', audio('ee_80_4_checkup_us.mp3')), v('bandage', '包帯', audio('ee_80_4_dressing_us.mp3')), v('stitches', '縫合・縫い目', audio('ee_80_4_stitches_us.mp3')), v('injection/jab', '注射', audio('ee_80_4_injection_us.mp3')), v('medication', '薬・薬剤', audio('ee_80_4_medication_us.mp3')), v('antibiotics', '抗生物質', audio('ee_80_4_antibiotics_us.mp3'))
      ], ['ee_80_4_emergencies_us.mp3']),
    ],
    tip: '原書はイギリス英語の語彙を掲載しています。音声フォルダーにはアメリカ英語の表記・発音を含む補助音声もありますが、画面に表示する英文は原書の綴りを保っています。',
  }),

  'social-81': sourceLesson({
    id: 'pharmacy', number: 81, enTitle: 'At the pharmacy', title: '第81章に入る前に：なぜ「薬局で使う英語」を学ぶのでしょうか？',
    ja: '症状、アレルギー、薬の用法、処方箋について薬剤師とやり取りする表現を学びます。',
    cando: '薬局で症状を説明し、薬の飲み方や副作用を確認できる。',
    intro: ['薬局では、薬を受け取るだけでなく、自分の症状やアレルギー、服用している薬について伝えたり、飲み方や副作用を確認したりすることがあります。', '大切なのは、自分の体の状態と薬に関する情報を正確に伝え、分からないことをきちんと確認することです。', 'この章では、原書の処方箋の受け取り、症状の相談、市販薬、薬の使い方に関する表現を、日本語の説明とともに確認します。'],
    functions: [['01', '症状を説明する'], ['02', '薬剤師の質問に答える'], ['03', '薬の用法と副作用を確認する'], ['04', '処方箋を受け取る']],
    sections: [
      section('81-1', '症状を説明する', 'Describing your symptoms', [p('I have a really sore eye.', '目が本当に痛いです。'), p('I have an itchy rash on my arm.', '腕にかゆい発疹があります。')], ['ee_81_1_us.mp3']),
      section('81-2', 'その他の表現', 'More phrases', [p('My knee really hurts.', 'ひざが本当に痛いです。'), p('I have a really bad headache.', 'ひどい頭痛がします。'), p('My back is killing me.', '背中・腰がものすごく痛いです。')], ['ee_81_2_us.mp3']),
      section('81-3', '薬局で聞かれる質問', 'Questions you may hear', [
        p('Do you have any other symptoms?', 'ほかに症状はありますか？'), p('Yes, I also have a runny nose.', 'はい、鼻水も出ています。'), p('It could be an infection.', '感染症かもしれません。'), p('Do you have any allergies?', 'アレルギーはありますか？'), p('Hmm... It looks like an allergy.', 'うーん、アレルギーのようですね。'), p('Really? What do you recommend?', '本当ですか？何をおすすめしますか？'), p('This ointment should help.', 'この軟膏が効くはずです。'), p("Yes, I'm allergic to aspirin.", 'はい、アスピリンにアレルギーがあります。'), p('Are you taking any other medication?', 'ほかに薬を服用していますか？'), p("Yes, I'm taking antibiotics.", 'はい、抗生物質を服用しています。'), p('How long have you had symptoms?', '症状はどのくらい続いていますか？'), p('For about a week.', '1週間ほどです。')
      ], ['ee_81_3_us.mp3']),
      section('81-6', 'チャートで文を作る', 'Create sentences', [p('I have a really sore throat.', '本当にのどが痛いです。'), p('I have a really bad headache.', 'ひどい頭痛がします。'), p('I have an itchy rash.', 'かゆい発疹があります。'), p('I have a really sore ear.', '耳が本当に痛いです。'), p('I have a really itchy eye.', '目がとてもかゆいです。')], ['ee_81_6_us.mp3']),
      section('81-7', '治療と用量', 'Treatment and dosage', [p('This cough syrup should do the trick.', 'このせき止めシロップが効くはずです。'), p('How often should I take it?', 'どのくらいの頻度で服用すればよいですか？'), p('Take these tablets twice a day for one week.', 'この錠剤を1日2回、1週間服用してください。'), p('Are there any side effects?', '副作用はありますか？')], ['ee_81_7_us.mp3']),
      section('81-8', '処方箋', 'Prescriptions', [p("I've come to pick up a prescription.", '処方箋の薬を受け取りに来ました。'), p("Please take a seat and we'll let you know when it's ready.", 'お掛けになってお待ちください。準備ができたらお知らせします。'), p("I'm here to collect my repeat prescription.", '繰り返し処方の薬を受け取りに来ました。'), p('Here you go. Do you pay for your prescriptions?', 'はい、どうぞ。処方薬は有料ですか？')], ['ee_81_8_us.mp3']),
      section('81-9', '薬局の語彙', 'Vocabulary in a pharmacy', [v('plasters', 'ばんそうこう'), v('painkillers', '痛み止め'), v('sleeping pills', '睡眠薬'), v('consulting room', '診察室'), v('contact lens', 'コンタクトレンズ'), v('incontinence pads', '失禁用パッド'), v('solution', '溶液'), v('pregnancy test', '妊娠検査薬'), v('tampons', 'タンポン'), v('sanitary towels', '生理用ナプキン'), v('laxatives', '下剤'), v('baby formula', '乳児用ミルク'), v('antiseptic', '消毒薬'), v('vitamins', 'ビタミン剤'), v('pharmacist', '薬剤師'), v('prescription', '処方箋'), v('sunscreen', '日焼け止め'), v('nappies', 'おむつ'), v('baby food', 'ベビーフード')], ['ee_81_9_inapharmacy_us.mp3']),
      section('81-12', '練習文', 'Say the sentences out loud', [p('I also have a runny nose.', '鼻水も出ています。'), p('My knee really hurts.', 'ひざが本当に痛いです。'), p('My back is killing me.', '背中・腰がものすごく痛いです。'), p('How long have you had symptoms?', '症状はどのくらい続いていますか？'), p('Are there any side effects?', '副作用はありますか？')], ['ee_81_12_1_us.mp3', 'ee_81_12_2_us.mp3', 'ee_81_12_3_us.mp3', 'ee_81_12_4_us.mp3', 'ee_81_12_5_us.mp3']),
    ],
    tip: 'really は very に似て、話し言葉で強調や驚きを表します。This cough syrup should do the trick. は、薬が効くはずだという意味の原書表現です。',
  }),

  'social-82': sourceLesson({
    id: 'booking-appointment', number: 82, enTitle: 'Booking an appointment', title: '第82章に入る前に：なぜ「診察の予約で使う英語」を学ぶのでしょうか？',
    ja: '診療所、歯科、緊急予約で、空き枠・予約変更・受診理由を伝える表現を学びます。',
    cando: '診察や歯科の予約を取り、空き枠や緊急対応を確認できる。',
    intro: ['病院やクリニックでは、診察を受ける前に、まず自分の都合と病院の空き時間を合わせる必要があります。急いでいるのか、いつなら行けるのかを伝えることも大切です。', '大切なのは、必要な診察を、必要なタイミングで受けられるように予定を調整することです。', 'この章では、原書の診察予約、歯科予約、緊急予約、予約変更に関する表現を、日本語の説明とともに確認します。'],
    functions: [['01', '診療所の予約を取る'], ['02', '歯科の予約を取る'], ['03', '緊急予約について尋ねる'], ['04', '予約を変更・キャンセルする']],
    sections: [
      section('82-1', '診療所で', "At the doctor's surgery", [p("Hi there, I'd like to book an appointment with Doctor Cole.", 'こんにちは、コール先生の診察予約を取りたいのですが。'), p("Can I ask what it's about?", 'どのようなご用件か伺ってもよいですか？'), p('I need to see the nurse.', '看護師に診てもらいたいです。'), p("When's the next available slot?", '次に空いている枠はいつですか？'), p('Have you got anything sooner?', 'もっと早い時間はありますか？'), p('I think I might have a chest infection.', '胸の感染症かもしれません。'), p('We could squeeze you in later at 4.30?', 'あとで4時30分に何とか入れられます。'), p('Can I reschedule my appointment?', '予約を変更できますか？'), p("That's great, thanks.", 'それは助かります、ありがとう。'), p('Can I book an appointment for my daughter?', '娘の予約を取れますか？')], ['ee_82_1_us.mp3']),
      section('82-3', '歯科で', 'At the dentist', [p("I'd like to book a check-up, please.", '検診の予約を取りたいのですが。'), p("I've got really bad toothache.", 'ひどい歯痛があります。'), p('Have you been with us before?', '以前、当院に来たことがありますか？'), p("No, I haven't.", 'いいえ、ありません。'), p("We've got a slot in half an hour if that's any good?", '30分後に空きがありますが、ご都合はいかがですか？'), p("I've got an appointment next week but I need to cancel it.", '来週予約がありますが、キャンセルする必要があります。'), p('No problem, can I take your name?', '問題ありません。お名前を伺えますか？')], ['ee_82_3_us.mp3']),
      section('82-4', '緊急予約', 'Emergency appointments', [p('I need an emergency appointment.', '緊急の診察予約が必要です。'), p("I'm afraid we're not taking on new patients.", '申し訳ありませんが、新しい患者は受け付けていません。'), p("If you need an urgent appointment, we'll place you on the triage list...", '緊急の予約が必要なら、トリアージリストに載せます…'), p('... and the doctor will call you back as soon as possible.', '…医師ができるだけ早く折り返し電話します。')], ['ee_82_4_us.mp3']),
      section('82-7', '文を作る練習', 'Create sentences', [p("I'd like to book an appointment with the doctor.", '医師の診察予約を取りたいのですが。'), p('I’d like to book an appointment with the nurse.', '看護師の予約を取りたいのですが。'), p('I’d like to book a check-up with the dentist.', '歯科医の検診予約を取りたいのですが。'), p('I’d like to reschedule my appointment.', '予約を変更したいのですが。'), p('I’d like to cancel my appointment.', '予約をキャンセルしたいのですが。')], ['ee_82_7_us.mp3']),
    ],
    tip: "squeeze you in は、予定がいっぱいでも何とか予約を入れるという意味です。",
  }),

  'social-83': sourceLesson({
    id: 'seeing-doctor', number: 83, enTitle: 'Seeing the doctor', title: '第83章：医師の診察',
    ja: '症状、診察、検査、処置、診断、アドバイスについて話す表現を学びます。',
    cando: '症状の経過を説明し、検査や治療について確認できる。',
    intro: ['医師に症状を説明し、必要な検査や処置、診断、アドバイスを理解します。', '原書の診察場面にある英文だけを使って練習します。'],
    functions: [['01', '症状と経過を説明する'], ['02', '診察・処置について話す'], ['03', '診断とアドバイスを理解する']],
    sections: [
      section('83-1', '症状を説明する', 'Describing symptoms', [p('What seems to be the problem?', 'どうされましたか？'), p("I've had a bad cough for a week and it's getting worse.", '1週間ひどいせきが続き、悪化しています。'), p('My shoulder has been hurting.', '肩が痛み続けています。'), p('Okay, let me listen to your chest.', 'わかりました。胸の音を聞かせてください。'), p('I keep getting splitting headaches.', '割れるような頭痛が何度もします。'), p("I've been under the weather.", '体調がすぐれません。'), p("I've found a lump in my breast.", '乳房にしこりを見つけました。')], ['ee_83_1_us.mp3']),
      section('83-2', 'その他の表現', 'More phrases', [p("I've been throwing up all night.", '一晩中吐いていました。'), p("My son's got a fever.", '息子に熱があります。')], ['ee_83_2_us.mp3', 'ee_83_2_us_F1-15.mp3']),
      section('83-3', '一般的なケア', 'General care', [p('It seems to be healing up nicely...', '順調に治っているようです…'), p("... I'll just change your bandage.", '…包帯を替えますね。'), p("I'll refer you for some tests.", '検査を受けるよう紹介します。'), p('Which arm would you like the injection in?', 'どちらの腕に注射しますか？'), p('Right, please!', '右腕でお願いします！'), p("I'm left-handed.", '私は左利きです。')], ['ee_83_3_us.mp3']),
      section('83-4', 'その他の表現', 'More phrases', [p('Can I book a flu jab?', 'インフルエンザの予防接種を予約できますか？'), p("Let's take your temperature.", '体温を測りましょう。'), p("I'd like a repeat prescription.", '繰り返し処方をお願いします。'), p("I'm due a check-up.", '検診を受ける時期です。')], ['ee_83_4_us.mp3']),
      section('83-5', 'アドバイスと診断', 'Advice and diagnosis', [p('What do you advise?', 'どのようなアドバイスをしますか？'), p('You need to rest and drink plenty of fluids.', '休んで、水分を十分に取る必要があります。'), p('It looks like a mild infection.', '軽い感染症のようです。'), p("Come back in two weeks and we'll see how it's looking.", '2週間後に戻ってきて、経過を見ましょう。'), p('Will I need antibiotics?', '抗生物質が必要ですか？')], ['ee_83_5_us.mp3']),
      section('83-8', '文を組み合わせる練習', 'Match the sentences', [p('My shoulder has been hurting.', '肩が痛み続けています。'), p("I've had a bad cough for a week and it's getting worse.", '1週間ひどいせきが続き、悪化しています。'), p("I've been throwing up all night.", '一晩中吐いていました。'), p("I'm due a check-up.", '検診を受ける時期です。'), p("I've been under the weather.", '体調がすぐれません。')], ['ee_83_8_1_us.mp3', 'ee_83_8_2_us.mp3', 'ee_83_8_3_us.mp3', 'ee_83_8_4_us.mp3']),
    ],
    tip: '原書では、症状の経過を現在完了形や keep -ing で表し、診察・処置・アドバイスへ会話を進めます。',
  }),

  'social-84': sourceLesson({
    id: 'injuries-emergencies', number: 84, enTitle: 'Injuries and emergencies', title: '第84章：けがと緊急事態',
    ja: '救急要請、軽いけが、重いけがの状態を説明する表現を学びます。',
    cando: '事故やけがの状態を伝え、救急対応や処置を求められる。',
    intro: ['緊急時は、何が起きたか、どのようなけがか、どの助けが必要かを短く伝えます。', '原書の救急・けがの英文を確認します。'],
    functions: [['01', '緊急事態を伝える'], ['02', '軽いけがを説明する'], ['03', '重いけがを説明する']],
    sections: [
      section('84-1', '緊急時', 'In an emergency', [p('Which service do you require?', 'どのサービスが必要ですか？'), p('I need an ambulance.', '救急車が必要です。'), p("What's the emergency?", '緊急事態は何ですか？'), p('My husband has severe chest pains.', '夫に激しい胸の痛みがあります。'), p("I'll send an ambulance for you right away.", 'すぐに救急車を向かわせます。')], ['ee_84_1_us.mp3']),
      section('84-2', 'その他の表現', 'More phrases', [p("I've had an accident.", '事故に遭いました。'), p('Please come quickly!', '早く来てください！'), p("She's had a fall.", '彼女が転びました。'), p('I need a doctor urgently.', '至急、医師が必要です。'), p("He's having a fit.", '彼が発作を起こしています。')], ['ee_84_2_us.mp3']),
      section('84-3', '軽いけが', 'Minor injuries', [p("Dad, my knee's bleeding!", 'お父さん、ひざから血が出ている！'), p("That's a nasty graze. Let me clean it, then I'll get a plaster.", 'ひどい擦り傷です。洗ってから、ばんそうこうを持ってきます。'), p('I just banged my shoulder! It really hurts!', '肩をぶつけた！本当に痛い！'), p('Hold this cold pack over the bump.', 'この冷却パックをこぶに当ててください。'), p("I've got a nosebleed.", '鼻血が出ています。'), p("I'll grab some tissues.", 'ティッシュを取ってきます。')], ['ee_84_3_us.mp3']),
      section('84-4', 'より重いけが', 'More serious injuries', [p('Is my ankle broken or just sprained?', '足首は骨折ですか、それとも捻挫ですか？'), p("Not sure... I'm sending you for an X-ray.", 'はっきりしません…X線検査を受けてもらいます。'), p("My daughter's gashed her arm.", '娘が腕を深く切りました。'), p('It looks like she may need stitches.', '縫合が必要かもしれません。'), p("I burned my hand on the stove. It's really painful.", 'コンロで手をやけどしました。本当に痛いです。'), p('Let me take a look.', '見せてください。')], ['ee_84_4_us.mp3']),
      section('84-7', '音声に答える練習', 'Respond out loud', [p("My daughter's gashed her arm.", '娘が腕を深く切りました。'), p('It looks like she may need stitches.', '縫合が必要かもしれません。'), p('I just banged my shoulder! It really hurts!', '肩をぶつけた！本当に痛い！'), p('Hold this cold pack over the bump.', 'この冷却パックをこぶに当ててください。'), p("Dad, my knee's bleeding!", 'お父さん、ひざから血が出ている！'), p("That's a nasty graze.", 'ひどい擦り傷です。'), p('My husband has severe chest pains.', '夫に激しい胸の痛みがあります。')], ['ee_84_7_1_us.mp3', 'ee_84_7_2_us.mp3', 'ee_84_7_3_us.mp3', 'ee_84_7_4_us.mp3']),
    ],
    tip: 'emergency、urgently、quickly などで緊急度を伝え、injury の種類を具体的に説明します。',
  }),

  'social-85': sourceLesson({
    id: 'the-hospital', number: 85, enTitle: 'The hospital', title: '第85章：病院',
    ja: '病院での受付、検査、入院、手術、治療後の回復について話す表現を学びます。',
    cando: '病院で症状・アレルギー・検査・入院・手術について説明できる。',
    intro: ['病院では、受付で必要な情報を伝え、検査や入院、手術について確認します。', '原書の病院での会話と治療語彙をまとめます。'],
    functions: [['01', '病院の受付で情報を伝える'], ['02', '検査と入院について話す'], ['03', '手術前後の表現を理解する']],
    sections: [
      section('85-1', '病院で', 'At the hospital', [p("I've got a check-up with the nurse at 4.30.", '4時30分に看護師の検診があります。'), p('I need to see someone urgently.', '至急、誰かに診てもらう必要があります。'), p('Okay, could I see your appointment letter, please?', 'わかりました。予約通知書を見せていただけますか？'), p("I'll take your details so we can get you seen.", '診察できるよう詳細を伺います。'), p('Are you allergic to anything?', '何かアレルギーはありますか？'), p("Yes, I'm allergic to penicillin.", 'はい、ペニシリンにアレルギーがあります。'), p('Do I need to have an operation?', '手術を受ける必要がありますか？'), p('We need to keep you overnight for observation.', '経過観察のため一晩入院してもらう必要があります。')], ['ee_85_1_us.mp3']),
      section('85-2', 'その他の表現', 'More phrases', [p('How long have you been feeling like this?', 'このような状態はどのくらい続いていますか？'), p('The pain started about two hours ago.', '痛みは約2時間前に始まりました。'), p('We have a medical emergency.', '医療上の緊急事態です。'), p("Okay, I'm going to take a blood test.", 'わかりました。血液検査をします。'), p('Are you taking any regular medications?', '普段、薬を服用していますか？'), p("Have you got someone you'd like to call?", '電話したい人はいますか？'), p("We'll follow up in three months.", '3か月後に経過を確認します。'), p("Good news! I've got the all clear!", 'よい知らせです。問題ないという確認をもらいました！'), p("I'm going to need to examine you.", '診察する必要があります。'), p("I'm here for my scan.", 'スキャン検査を受けに来ました。'), p('How soon will I be seen by a doctor?', 'いつ医師に診てもらえますか？'), p("We'll move you to another ward for observation.", '経過観察のため別の病棟へ移します。'), p("That's such a relief!", '本当にほっとしました！')], ['ee_85_2_us.mp3']),
      section('85-6', '手術を受ける', 'Having an operation', [p("I'll just check your temperature and pulse...", '体温と脈拍を確認します…'), p("... and then we'll prep you for the operation.", '…それから手術の準備をします。'), p('How long will I be under for?', '麻酔が効いている時間はどのくらいですか？'), p('The operation will last about an hour.', '手術は約1時間かかります。'), p('You may feel light-headed as the anaesthetic takes effect.', '麻酔が効くと、ふらつくかもしれません。'), p('Now count backwards from 5...', 'では5から逆に数えてください…'), p('5, 4...', '5、4…')], ['ee_85_6_us.mp3']),
      section('85-7', '治療から回復する', 'Recovering from treatment', [p('The operation was a success.', '手術は成功しました。'), p('There were no complications.', '合併症はありませんでした。'), p('Can you give me something for the pain?', '痛み止めを何かもらえますか？'), p("Yes, of course. I'll just take your blood pressure first.", 'もちろんです。まず血圧を測ります。'), p('How are you feeling?', '気分はいかがですか？'), p('Still a bit groggy.', 'まだ少しぼんやりしています。'), p("Don't worry. We'll have you up and about in no time.", '心配しないでください。すぐに動けるようになります。')], ['ee_85_7_us.mp3']),
      section('85-8', '病院での治療の語彙', 'Vocabulary: hospital treatment', [v('operation', '手術'), v('operating theatre', '手術室'), v('anaesthetic', '麻酔薬・麻酔'), v('ward', '病棟'), v('intensive care unit', '集中治療室'), v('visiting hours', '面会時間')], ['ee_85_8_hospitaltreatment_us.mp3']),
      section('85-11', '手術後の練習文', 'Say the sentences out loud', [p("I'll just take your blood pressure first.", 'まず血圧を測ります。'), p('You may feel light-headed as the anaesthetic takes effect.', '麻酔が効くと、ふらつくかもしれません。'), p('Still a bit groggy.', 'まだ少しぼんやりしています。'), p('How long will I be under for?', '麻酔が効いている時間はどのくらいですか？'), p("Don't worry. We'll have you up and about in no time.", '心配しないでください。すぐに動けるようになります。'), p("I'll just check your temperature and pulse...", '体温と脈拍を確認します…'), p('There were no complications.', '合併症はありませんでした。')], ['ee_85_11_1_us.mp3', 'ee_85_11_2_us.mp3', 'ee_85_11_3_us.mp3', 'ee_85_11_4_us.mp3', 'ee_85_11_5_us.mp3', 'ee_85_11_6_us.mp3', 'ee_85_11_7_us.mp3', 'ee_85_11_8_us.mp3']),
    ],
    tip: '原書では hospital、ward、operating theatre など、イギリス英語の病院語彙を使います。',
  }),

  'social-86': sourceLesson({
    id: 'dental-care', number: 86, enTitle: 'Dental care', title: '第86章：歯科',
    ja: '歯科で症状、診察、治療、口腔ケアについて話す表現を学びます。',
    cando: '歯の症状を説明し、歯科医の助言や治療内容を理解できる。',
    intro: ['歯科では、痛みや治療歴を伝え、診断とケアの指示を確認します。', '原書の歯科の会話と語彙を確認します。'],
    functions: [['01', '歯の症状を説明する'], ['02', '治療や診断を理解する'], ['03', '口腔ケアの助言を受ける']],
    sections: [
      section('86-1', '歯科医と話す', 'Talking to the dentist', [p('Can I have my teeth whitened?', '歯をホワイトニングできますか？'), p("I've got bad toothache.", 'ひどい歯痛があります。'), p('I brush my teeth twice a day.', '1日に2回歯を磨きます。'), p('Do I need braces?', '矯正装置が必要ですか？'), p('I need to see the hygienist.', '歯科衛生士に診てもらう必要があります。'), p('I think my crown has come loose.', 'クラウンが外れかけていると思います。'), p("My son's first teeth are coming through.", '息子の乳歯が生えてきています。'), p('My filling has come out.', '詰め物が取れました。')], ['ee_86_1_us.mp3']),
      section('86-2', 'その他の表現', 'More phrases', [p('Open a bit wider for me, please.', 'もう少し口を大きく開けてください。')], ['ee_86_2_us.mp3']),
      section('86-3', '助言と診断', 'Advice and diagnosis', [p('Remember to floss regularly.', '定期的にフロスを使うことを忘れないでください。'), p("You've got a build-up of plaque.", '歯垢がたまっています。'), p('It looks like you need a small filling.', '小さな詰め物が必要なようです。'), p('Would you like to rinse your mouth out?', '口をすすぎますか？'), p("You'll need this tooth taken out.", 'この歯は抜く必要があります。'), p("Make sure you don't brush too hard.", '強く磨きすぎないようにしてください。'), p('Let me know if you feel any pain.', '痛みを感じたら教えてください。'), p("You've got a small cavity.", '小さな虫歯があります。')], ['ee_86_3_us.mp3']),
      section('86-5', '歯科の語彙', 'Vocabulary at the dentist', [v('dentist', '歯科医'), v('whitening', 'ホワイトニング'), v('toothache', '歯痛'), v('to floss', 'フロスを使う'), v('to brush', '歯を磨く'), v('to rinse', 'すすぐ'), v('cavity', '虫歯'), v('filling', '詰め物'), v('plaque', '歯垢'), v('crown', 'クラウン・歯冠'), v('toothbrush', '歯ブラシ'), v('braces', '歯列矯正装置')], ['ee_86_5_atthedentist_us.mp3']),
    ],
    tip: 'toothache、cavity、filling、crown など、歯科で使う具体的な語彙を整理します。',
  }),

  'social-87': sourceLesson({
    id: 'mental-health-support', number: 87, enTitle: 'Mental health support', title: '第87章：メンタルヘルスの支援',
    ja: '相談、セラピー、グループ支援で気持ちや困りごとを伝える表現を学びます。',
    cando: '気持ちや困りごとを説明し、支援の場で質問や返答ができる。',
    intro: ['ここでは、助けを求める表現、セラピーでの質問、グループで気持ちを話す表現を学びます。', '原書の英文を、相手の気持ちを尊重する形で練習します。'],
    functions: [['01', '支援を求める'], ['02', 'セラピーの質問を理解する'], ['03', 'グループで気持ちを話す']],
    sections: [
      section('87-1', 'セラピーを求める', 'Asking for therapy', [p("I'm having a really tough time. Can I talk to you?", 'とてもつらい時期です。話を聞いてもらえますか？'), p("I'm finding it hard to cope.", '対処するのが難しいと感じています。'), p('Can I see someone face-to-face?', '対面で誰かに会えますか？'), p("I'm feeling very low.", 'とても落ち込んでいます。'), p('We have a drop-in centre near you.', '近くに予約なしで利用できるセンターがあります。'), p("You don't have to go through this alone.", '一人でこれを乗り越えなくてもよいのです。')], ['ee_87_1_us.mp3']),
      section('87-2', 'セラピーでの質問', 'Therapy questions', [p('How did that make you feel?', 'それでどのように感じましたか？'), p('How is this affecting you?', 'これはあなたにどのような影響を与えていますか？'), p("So, what you're saying is...", 'つまり、あなたが言っているのは…'), p('Can we explore this more?', 'これについてもう少し掘り下げられますか？')], ['ee_87_2_us.mp3']),
      section('87-3', 'グループセラピー', 'Group therapy', [p("Let's go round the group and say how we're feeling.", '順番に、今の気持ちを話しましょう。'), p("I've been a bit up and down.", '気分が少し上がったり下がったりしています。'), p("I'm doing better this week.", '今週は調子がよくなっています。'), p('These sessions are really helping me.', 'このセッションが本当に助けになっています。'), p("I'm anxious all the time.", 'いつも不安です。')], ['ee_87_3_us.mp3']),
      section('87-4', 'その他の表現', 'More phrases', [p('How are you feeling today?', '今日はどのように感じていますか？'), p("That's a real trigger for me.", 'それは私にとって本当の引き金です。'), p('Your feelings are valid.', 'あなたの気持ちは正当です。'), p('Talking about it really helps.', 'それについて話すことが本当に助けになります。')], ['ee_87_4_us.mp3']),
      section('87-5', '感情の語彙', 'Vocabulary: emotions', [v('happy', '幸せな'), v('calm', '落ち着いた'), v('anxious', '不安な'), v('depressed', '落ち込んだ・うつ状態の'), v('stressed', 'ストレスを感じた'), v('angry', '怒った')], ['ee_87_5_emotions_us.mp3']),
      section('87-7', '気持ちを表す文', 'Create sentences', [p("I've been feeling a bit low this week.", '今週は少し落ち込んでいます。'), p("I've been feeling very anxious this week.", '今週はとても不安を感じています。'), p("I've been feeling really depressed this week.", '今週はとても落ち込んでいます。'), p("I've been feeling a bit up and down this week.", '今週は気分が少し上がったり下がったりしています。')], ['ee_87_7_us.mp3']),
    ],
    tip: 'cope、affect、trigger、valid など、気持ちや支援について話すときの表現を原書の文脈で確認します。',
  }),

  'social-88': sourceLesson({
    id: 'media-communications', number: 88, enTitle: 'Media and communications', title: '第88章：メディアとコミュニケーション',
    ja: '電話、メッセージ、端末、インターネット、SNS、読書に関する基本語彙を学びます。',
    cando: '日常の通信機器・オンライン活動・メディアの基本語彙を理解できる。',
    intro: ['電話や端末、インターネット、SNS、読書に関する原書の語彙を整理します。', '端末のラベルと短いメッセージ例も確認します。'],
    functions: [['01', '電話とメッセージの語彙を知る'], ['02', '端末とインターネットの語彙を知る'], ['03', 'SNSと読書の語彙を知る']],
    sections: [
      section('88-1', '電話・メッセージ・メール', 'Phone calls, texts, and emails', [v('to call', '電話をかける'), v('to leave a voicemail', 'ボイスメールを残す'), v('to take a message', '伝言を受ける'), v('to put on hold', '保留にする'), v('to transfer a call', '電話を転送する'), v('to put on speaker', 'スピーカーにする'), v('text/message', 'テキスト・メッセージ'), v('video call', 'ビデオ通話'), v('email', 'メール'), v('email address', 'メールアドレス'), v('to click', 'クリックする'), v('to tap', 'タップする')], ['ee_88_1_phonecallstextsemails_us.mp3']),
      section('88-2', '端末', 'Devices', [v('desktop computer', 'デスクトップパソコン'), v('webcam', 'ウェブカメラ'), v('screen', '画面'), v('mouse mat', 'マウスパッド'), v('keyboard', 'キーボード'), v('mouse', 'マウス'), v('laptop', 'ノートパソコン'), v('tablet', 'タブレット'), v('smartwatch', 'スマートウォッチ'), v('router', 'ルーター'), v('signal', '電波・信号'), v('battery level', 'バッテリー残量'), v('mobile phone', '携帯電話'), v('message', 'メッセージ'), v('reply', '返信'), v('abbreviation', '略語'), v('emoji', '絵文字'), v('charging cable', '充電ケーブル'), p('Great to see you last night!', '昨夜会えてよかった！'), p('You too!', 'あなたもね！'), p('BTW can you send me those pics?', 'ところで、その写真を送ってくれる？')], ['ee_88_2_devices_us.mp3', 'ee_88_2_priyanka_us.mp3']),
      section('88-3', 'インターネット', 'The internet', [v('website', 'ウェブサイト'), v('Wi-Fi', 'Wi-Fi'), v('broadband', 'ブロードバンド'), v('internet provider', 'インターネット接続業者'), v('data', 'データ通信量'), v('account', 'アカウント'), v('settings', '設定'), v('network', 'ネットワーク'), v('signal', '電波・信号'), v('hotspot', 'ホットスポット'), v('virus', 'ウイルス'), v('password', 'パスワード'), v('menu', 'メニュー'), v('app', 'アプリ'), v('cookies', 'クッキー'), v('link', 'リンク'), v('to browse', '閲覧する'), v('to stream', 'ストリーミングする')], ['ee_88_3_theinternet_us.mp3']),
      section('88-4', 'ソーシャルメディア', 'Social media', [v('to follow', 'フォローする'), v('to like', '「いいね」をする'), v('to go viral', '急速に広まる'), v('to trend', 'トレンドになる'), v('to DM someone', '誰かにDMを送る'), v('to livestream', 'ライブ配信する'), v('to troll', '荒らす'), v('to scroll', 'スクロールする'), v('to share', '共有する'), v('to block', 'ブロックする'), v('podcast', 'ポッドキャスト'), v('post', '投稿'), v('influencer', 'インフルエンサー'), v('follower', 'フォロワー'), v('hashtag', 'ハッシュタグ'), v('selfie', '自撮り')], ['ee_88_4_socialmedia_us.mp3']),
      section('88-5', '読書', 'Reading', [v('book', '本'), v('e-reader', '電子書籍リーダー'), v('magazine', '雑誌'), v('subscription', '定期購読'), v('article', '記事'), v('headline', '見出し'), v('newspaper', '新聞'), p('GIRL RAISES MONEY FOR CHARITY', '少女がチャリティーのために資金を集める')], ['ee_88_5_reading_us.mp3']),
    ],
    tip: '端末名だけでなく、call、message、reply、link、share など、操作を表す語も一緒に覚えます。',
  }),

  'social-89': sourceLesson({
    id: 'formal-phone-calls', number: 89, enTitle: 'Formal phone calls', title: '第89章：フォーマルな電話',
    ja: '電話をかけ、用件を伝え、伝言を残し、折り返しや通話終了を表現します。',
    cando: '仕事やサービスの電話で、用件・伝言・折り返しを明確に伝えられる。',
    intro: ['フォーマルな電話では、相手に取り次いでもらい、用件を説明し、必要なら伝言を残します。', '原書の電話表現を順番に練習します。'],
    functions: [['01', '電話の用件を切り出す'], ['02', 'カスタマーサービスに電話する'], ['03', '伝言と折り返しを頼む'], ['04', '丁寧に電話を終える']],
    sections: [
      section('89-1', '電話をかける', 'Making a call', [p('Hi, could I speak to...?', 'こんにちは、…さんとお話しできますか？'), p('Hello, I wonder if you can help me...', 'こんにちは、お力をお借りできるかと思いまして…'), p("I'm calling about...", '…についてお電話しています。'), p("I'm calling you regarding....", '…についてお電話しています。')], ['ee_89_1_us.mp3']),
      section('89-2', 'カスタマーサービスに電話する', 'Calling customer service', [p('Hello, customer service, how can I help?', 'こんにちは、カスタマーサービスです。どのようなご用件ですか？'), p("I'll just put you on hold while I transfer you.", '転送する間、保留にします。'), p('Thank you for waiting.', 'お待たせしました。'), p('Thanks for calling.', 'お電話ありがとうございます。')], ['ee_89_2_us.mp3']),
      section('89-3', '伝言を残して折り返す', 'Leaving messages and calling back', [p("Janos isn't available right now. Can I take a message?", 'ヤノスは今、席を外しています。伝言を承りましょうか？'), p('Yes. Please ask him to call Ash at ABC Tech as soon as possible.', 'はい。できるだけ早くABC Techのアッシュに電話するよう伝えてください。')], ['ee_89_3_us.mp3']),
      section('89-4', 'その他の表現', 'More phrases', [p('Can I leave a message?', '伝言を残せますか？'), p('He knows where to reach me.', '彼は私への連絡先を知っています。'), p("She'll call you back shortly.", '彼女はすぐに折り返します。'), p("We'll need to check our system and get back to you.", 'システムを確認して折り返す必要があります。')], ['ee_89_4_us.mp3']),
      section('89-5', '電話を終える', 'Ending a call', [p('Is there anything else I can help with?', 'ほかにお手伝いできることはありますか？'), p("No, that's all. Thanks for your help. Goodbye.", 'いいえ、それだけです。助けていただきありがとうございます。さようなら。')], ['ee_89_5_us.mp3']),
      section('89-6', 'その他の表現', 'More phrases', [p('Thanks for your call.', 'お電話ありがとうございます。'), p('Thank you so much for calling.', 'お電話いただき本当にありがとうございます。'), p("Let's speak again soon.", 'また近いうちに話しましょう。'), p("You've been a great help.", 'とても助かりました。'), p('Have a nice evening.', 'よい夕方をお過ごしください。'), p('I appreciate the call, thank you.', 'お電話に感謝します、ありがとうございます。'), p('My pleasure.', 'どういたしまして。')], ['ee_89_6_us.mp3']),
      section('89-9', '文を組み合わせる練習', 'Match the sentences', [p('Hello, customer service, how can I help?', 'こんにちは、カスタマーサービスです。どのようなご用件ですか？'), p("We'll need to check our system and get back to you.", 'システムを確認して折り返す必要があります。'), p('Is there anything else I can help with?', 'ほかにお手伝いできることはありますか？'), p('He knows where to reach me.', '彼は私への連絡先を知っています。'), p('Hello, I wonder if you can help me...', 'こんにちは、お力をお借りできるかと思いまして…'), p('Thank you so much for calling.', 'お電話いただき本当にありがとうございます。')], ['ee_89_9_1_us.mp3', 'ee_89_9_2_us.mp3']),
    ],
    tip: 'could、I wonder、I appreciate などのクッション表現で、フォーマルな電話を丁寧に進めます。',
  }),

  'social-90': sourceLesson({
    id: 'informal-phone-calls', number: 90, enTitle: 'Informal phone calls', title: '第90章：カジュアルな電話',
    ja: '家族や友人との電話、通話トラブル、予定確認に使う表現を学びます。',
    cando: 'カジュアルな電話で近況、場所、予定、端末トラブルを伝えられる。',
    intro: ['親しい人との電話では、短い挨拶や近況確認、予定の確認を自然に行います。', '音声や端末のトラブルを伝える原書表現も学びます。'],
    functions: [['01', '電話で近況を尋ねる'], ['02', '通話トラブルを伝える'], ['03', '予定を確認して電話を終える']],
    sections: [
      section('90-1', '電話をかける・受ける', 'Making and receiving calls', [p("Hi, Mum. How's it going?", 'やあ、ママ。調子はどう？'), p("Good, thank you. I'm just checking in about tonight.", '元気よ、ありがとう。今夜のことを確認しているの。'), p('Hey mate, whereabouts are you?', 'やあ、どこにいるの？'), p("Hiya, I'm right here!", 'やあ、ここにいるよ！')], ['ee_90_1_us.mp3']),
      section('90-2', 'その他の表現', 'More phrases', [p('You okay?', '大丈夫？'), p('Lovely to hear from you!', '声が聞けてうれしい！'), p("Sorry, I can't talk now.", 'ごめん、今は話せない。'), p("I'll message you back.", 'あとでメッセージを返すね。'), p("I'll put you on speaker.", 'スピーカーにするね。')], ['ee_90_2_us.mp3']),
      section('90-3', '電話のトラブル', 'Phone problems', [p('Dad? Can you hear me?', 'パパ？聞こえる？'), p("Hello? You're breaking up - the signal is terrible.", 'もしもし？声が途切れているよ。電波がひどい。'), p('I dropped my phone and the screen is cracked.', '携帯を落として画面にひびが入った。'), p('Okay. We can fix it for you.', 'わかりました。修理できます。')], ['ee_90_3_us.mp3']),
      section('90-4', 'その他の表現', 'More phrases', [p("I'm out of data - I'll text.", 'データ通信量を使い切ったので、テキストするね。'), p('My phone has died.', '携帯の電池が切れた。'), p('My screen has frozen.', '画面がフリーズした。'), p("I can't remember my PIN.", 'PINを思い出せない。'), p("I've been locked out.", '締め出されてログインできない。')], ['ee_90_4_us.mp3']),
      section('90-5', '電話を終える', 'Ending a call', [p('I need to go now. My bus is here.', 'もう行かないと。バスが来た。'), p('Okay, see you later!', 'わかった、またね！'), p('Have you got time for a chat?', '話す時間ある？'), p("Afraid not, sorry. I'm only on 5 per cent battery.", 'ごめん、無理そう。バッテリーが5％しかない。'), p("So I'll see you at 8.30?", 'じゃあ8時30分に会う？'), p('Sounds perfect. Catch you then!', 'いいね。そのとき会おう！')], ['ee_90_5_us.mp3']),
      section('90-7', '練習文', 'Say the sentences out loud', [p("I can't remember my PIN.", 'PINを思い出せない。'), p("I'll message you back.", 'あとでメッセージを返すね。'), p("I've been locked out.", '締め出されてログインできない。'), p('My screen has frozen.', '画面がフリーズした。'), p('My phone has died.', '携帯の電池が切れた。'), p("I'll put you on speaker.", 'スピーカーにするね。')], ['ee_90_7_1_us.mp3', 'ee_90_7_2_us.mp3', 'ee_90_7_3_us.mp3', 'ee_90_7_4_us.mp3', 'ee_90_7_5_us.mp3', 'ee_90_7_6_us.mp3', 'ee_90_7_7_us.mp3']),
    ],
    tip: 'whereabouts、Hiya、Catch you then など、親しい相手との電話で使われるカジュアルな表現を確認します。',
  }),

  'social-91': sourceLesson({
    id: 'using-internet', number: 91, enTitle: 'Using the internet', title: '第91章：インターネットを使う',
    ja: 'Wi-Fiへの接続、安全設定、オンラインの日常作業、仕事や余暇で使う表現を学びます。',
    cando: '接続方法や安全設定を確認し、オンライン作業の予定を説明できる。',
    intro: ['インターネットの接続、個人情報の安全、日常のオンライン作業を説明します。', '仕事・学習・余暇のオンライン活動も原書表現で確認します。'],
    functions: [['01', 'Wi-Fiとネットワークに接続する'], ['02', 'オンラインで安全に行動する'], ['03', 'オンライン作業を説明する']],
    sections: [
      section('91-1', 'Wi-Fiに接続する', 'Accessing Wi-Fi', [p('Is it okay if I use your Wi-Fi?', 'あなたのWi-Fiを使ってもいい？'), p("Sure, the code's on the router.", 'もちろん、コードはルーターに書いてあるよ。'), p('How do I connect to the internet?', 'インターネットにはどう接続するの？'), p('Choose "free Wi-Fi" from the menu, then fill in the form.', 'メニューから「free Wi-Fi」を選び、フォームに記入します。'), p("I can't get a signal!", '電波が届かない！'), p('You can join my hotspot if you like.', 'よければ私のホットスポットに接続できるよ。'), p('Thanks!', 'ありがとう！')], ['ee_91_1_us.mp3']),
      section('91-2', '安全に使う', 'Staying safe', [p("Molly's just got her first mobile. How do I set up parental controls?", 'モリーが初めて携帯を持ったの。保護者による制限はどう設定する？'), p('Go to "settings", then tap "security".', '「settings」に進み、「security」をタップします。'), p('Should I click this link? It looks a bit weird.', 'このリンクをクリックしていい？少し変に見える。'), p("Yeah, that URL seems dodgy, let's try another site.", 'うん、そのURLは怪しそうだから、別のサイトを試そう。')], ['ee_91_2_us.mp3']),
      section('91-3', 'その他の表現', 'More phrases', [p('How do I set up a broadband contract?', 'ブロードバンド契約はどう設定するの？'), p('Which internet provider should I go with?', 'どのインターネット接続業者を選べばいい？'), p('How do I turn on the router?', 'ルーターはどうやって電源を入れるの？'), p("Don't share any personal details.", '個人情報を共有しないで。'), p('You should change your password.', 'パスワードを変えたほうがいい。'), p('Which network do I join?', 'どのネットワークに接続するの？'), p('We need to boost the signal in the kitchen.', 'キッチンの電波を強くする必要がある。')], ['ee_91_3_us.mp3']),
      section('91-7', '日常の作業', 'Everyday tasks', [p("Hey, what's going on?", 'ねえ、何をしているの？'), p("I'm setting up an online account for our energy bills.", '光熱費のオンラインアカウントを設定している。'), p("I'm looking up some recipes for lunch.", '昼食のレシピを調べている。'), p("I'm tracking the grocery delivery.", '食料品の配達を追跡している。')], ['ee_91_7_us.mp3']),
      section('91-8', 'その他の表現', 'More phrases', [p("I'm booking a doctor's appointment.", '医師の予約を取っている。'), p("I'm ordering more cat food.", '猫の餌を追加注文している。'), p("I'm renewing my driving licence.", '運転免許証を更新している。'), p("I'm cancelling my gym membership.", 'ジムの会員登録を解約している。'), p("I'm transferring some money.", 'お金を送金している。')], ['ee_91_8_us.mp3']),
      section('91-9', '仕事と学習', 'Work and study', [p("So, what's on your agenda for today?", 'それで、今日は何をする予定？'), p("Let's see... I need to check my emails...", 'ええと、メールを確認しないと…'), p('... catch up on the latest research...', '…最新の研究を把握して…'), p('... watch the company livestream...', '…会社のライブ配信を見て…'), p("...then I've got a webinar this afternoon.", '…その後、午後にウェビナーがある。'), p("How's it going?", '調子はどう？'), p("Not too bad, thanks. I'm just uploading my essay...", 'まあまあ、ありがとう。ちょうどエッセイをアップロードしている…'), p('... and sign up for that online training course.', '…そしてそのオンライン研修コースに申し込む。')], ['ee_91_9_us.mp3']),
      section('91-10', '楽しむ', 'Having fun', [p("What are you all up to?", 'みんな何をしているの？'), p("I'm putting some new tunes on my party playlist.", 'パーティーのプレイリストに新しい曲を入れている。'), p("I'm messaging my friend.", '友達にメッセージを送っている。'), p("... I'll share yours with you on our group chat.", '…あなたのものをグループチャットで共有するね。'), p("We're gaming!", 'ゲームをしているよ！'), p("I'm streaming a new series.", '新しいシリーズをストリーミングしている。'), p("I'm scrolling through my socials.", 'SNSをスクロールしている。'), p("I'm downloading our tickets for today...", '今日のチケットをダウンロードしている…')], ['ee_91_10_us.mp3']),
      section('91-12', '練習文', 'Say the sentences out loud', [p("I'm booking a doctor's appointment.", '医師の予約を取っている。'), p('I need to check my emails...', 'メールを確認しないと…'), p("I've got a webinar this afternoon.", '午後にウェビナーがある。'), p("I'm streaming a new series.", '新しいシリーズをストリーミングしている。'), p("I'm ordering more cat food.", '猫の餌を追加注文している。'), p("I'm scrolling through my socials.", 'SNSをスクロールしている。'), p("I'm just tracking the grocery delivery.", '食料品の配達を追跡している。')], ['ee_91_12_1_us.mp3', 'ee_91_12_2_us.mp3', 'ee_91_12_3_us.mp3', 'ee_91_12_4_us.mp3', 'ee_91_12_5_us.mp3', 'ee_91_12_6_us.mp3', 'ee_91_12_7_us.mp3', 'ee_91_12_8_us.mp3']),
    ],
    tip: 'set up、sign up、look up、track、stream、scroll など、オンライン作業の動詞を文の中で確認します。',
  }),

  'social-92': sourceLesson({
    id: 'digital-problems', number: 92, enTitle: 'Digital problems', title: '第92章：デジタルのトラブル',
    ja: '接続不良、端末のフリーズ、ネットワーク、詐欺や認証の問題を説明する表現を学びます。',
    cando: 'オンラインのトラブルを説明し、基本的な対処法を理解できる。',
    intro: ['オンラインでは、音声・映像・接続・安全に関するトラブルが起こります。', '原書の問題説明と対処法を、そのまま確認します。'],
    functions: [['01', '接続の問題を説明する'], ['02', 'トラブルシューティングを行う'], ['03', 'デジタルセキュリティの問題を伝える']],
    sections: [
      section('92-1', '接続の問題', 'Connection issues', [p("We can't hear you - you're breaking up!", '聞こえません。声が途切れています！'), p('Yeah, my internet is really laggy today.', 'そうだね、今日はインターネットがとても遅い。'), p("It says the TV's not connected to the internet!", 'テレビがインターネットに接続されていないと表示される！'), p('I think the network is down again.', 'またネットワークが落ちていると思う。'), p("I'm trying to get tickets but the website keeps crashing.", 'チケットを取ろうとしているけれど、ウェブサイトが何度も落ちる。'), p("Oh no! I hope we don't miss out...", '困った！機会を逃さないといいけど…'), p("There's too much traffic.", '通信が混雑しすぎている。')], ['ee_92_1_us.mp3']),
      section('92-2', 'トラブルシューティング', 'Troubleshooting', [p('My screen has completely frozen.', '画面が完全にフリーズした。'), p('You could try restarting the computer...', 'コンピューターを再起動してみてもいい…'), p('... or you could connect from a different device?', '…または別の端末から接続してみる？'), p('The internet is really playing up.', 'インターネットの調子が本当に悪い。'), p('Switching it off and on again might help...', '電源を切って入れ直すとよいかもしれない…'), p('... or just move closer to the router?', '…またはルーターに近づいてみる？')], ['ee_92_2_us.mp3']),
      section('92-3', 'デジタルセキュリティ', 'Digital security', [p('I got scammed! Someone stole my bank details online.', '詐欺に遭った！誰かがオンラインで銀行情報を盗んだ。'), p('No way! Have you cancelled everything?', 'まさか！全部キャンセルした？'), p("It's asking me to set up authentication on my account.", 'アカウントに認証を設定するよう求められている。'), p('Have you got your phone? I can show you how to do it.', '携帯を持っている？やり方を見せられるよ。'), p("Yes, the bank helped me. It's all sorted.", 'うん、銀行が助けてくれた。すべて解決した。')], ['ee_92_3_us.mp3']),
      section('92-6', '文を組み合わせる練習', 'Match the sentences', [p('Someone stole my bank details online.', '誰かがオンラインで銀行情報を盗んだ。'), p('It’s asking me to set up authentication on my account.', 'アカウントに認証を設定するよう求められている。'), p("I'm trying to get tickets but the website keeps crashing.", 'チケットを取ろうとしているけれど、ウェブサイトが何度も落ちる。'), p('My screen has completely frozen.', '画面が完全にフリーズした。'), p('You could try restarting the computer...', 'コンピューターを再起動してみてもいい…'), p('... or you could connect from a different device?', '…または別の端末から接続してみる？')], ['ee_92_6_1_us.mp3', 'ee_92_6_2_us.mp3', 'ee_92_6_3_us.mp3', 'ee_92_6_4_us.mp3', 'ee_92_6_5_us.mp3']),
    ],
    tip: 'breaking up、laggy、down、crashing、frozen、playing up は、デジタル機器や接続の不具合を伝える表現です。',
  }),

  'social-93': sourceLesson({
    id: 'emails', number: 93, enTitle: 'Emails', title: '第93章：メール',
    ja: 'メールの送受信、添付ファイル、迷惑メール、メール操作に関する表現を学びます。',
    cando: 'メールの状態や添付ファイル、返信・転送・削除について説明できる。',
    intro: ['メールを受け取ったか確認し、添付ファイルや迷惑メールなどの問題に対応します。', '原書のメール会話と操作語彙を確認します。'],
    functions: [['01', 'メールの送受信を確認する'], ['02', '添付ファイルを扱う'], ['03', '迷惑メールや削除済みメールを確認する']],
    sections: [
      section('93-1', '送受信する', 'Sending and receiving', [p('Did you get my email?', '私のメールを受け取りましたか？'), p("I did, thanks. Sorry I haven't got back to you.", '受け取りました、ありがとう。返信していなくてごめんなさい。'), p('Has Anna sent you the trip details?', 'アンナは旅行の詳細を送りましたか？'), p("Yeah, I'll forward you her message.", 'うん、彼女のメッセージを転送するね。')], ['ee_93_1_us.mp3']),
      section('93-2', 'その他の表現', 'More phrases', [p('Your email went to my junk folder.', 'あなたのメールは迷惑メールフォルダーに入っていました。'), p("I've sent the file as an attachment.", 'ファイルを添付で送りました。'), p('Can you check this draft email?', 'この下書きメールを確認してくれる？'), p("I'm just updating my email signature.", 'メールの署名を更新しているところです。'), p('How do I unsubscribe from updates?', '更新通知の配信を停止するにはどうすればいい？')], ['ee_93_2_us.mp3']),
      section('93-3', 'メールの問題', 'Email issues', [p('Does this attachment look okay to you?', 'この添付ファイルは大丈夫そう？'), p("It looks suspicious - I wouldn't download it.", '怪しそうです。ダウンロードしないほうがいい。'), p("I'm getting so much junk mail!", '迷惑メールがたくさん来る！'), p("Okay, let's have a look at your filters.", 'わかりました。フィルターを見てみましょう。'), p('I think I deleted the email with the concert tickets!', 'コンサートチケットのメールを削除したみたい！'), p("Check your trash. Maybe it's still there.", 'ゴミ箱を確認して。まだそこにあるかも。')], ['ee_93_3_us.mp3']),
      section('93-4', 'メール送信の語彙', 'Vocabulary: sending emails', [v('inbox', '受信トレイ'), v('outbox', '送信トレイ'), v('junk / spam mail', '迷惑メール'), v('trash', 'ゴミ箱'), v('contact', '連絡先'), v('draft', '下書き'), v('to send', '送信する'), v('to forward', '転送する'), v('to delete', '削除する'), v('to reply', '返信する'), v('to reply all', '全員に返信する'), v('to download', 'ダウンロードする'), v('to upload', 'アップロードする'), v('attachment', '添付ファイル')], ['ee_93_4_sendingemails_us.mp3']),
      section('93-7', '音声に答える練習', 'Respond out loud', [p('Check your trash.', 'ゴミ箱を確認して。'), p("Okay, let's have a look at your filters.", 'わかりました。フィルターを見てみましょう。'), p("Yeah, I'll forward you her message.", 'うん、彼女のメッセージを転送するね。'), p("It looks suspicious - I wouldn't download it.", '怪しそうです。ダウンロードしないほうがいい。')], ['ee_93_7_1_us.mp3', 'ee_93_7_2_us.mp3', 'ee_93_7_3_us.mp3', 'ee_93_7_4_us.mp3']),
    ],
    tip: 'inbox、draft、attachment、forward、reply all など、メール画面で頻繁に見る語彙を整理します。',
  }),

  'social-94': sourceLesson({
    id: 'messaging-video-calls', number: 94, enTitle: 'Messaging and video calls', title: '第94章：メッセージとビデオ通話',
    ja: 'テキストメッセージ、略語、グループチャット、ビデオ通話で使う表現を学びます。',
    cando: 'メッセージやビデオ通話で、予定・リンク・略語を理解して伝えられる。',
    intro: ['メッセージでは短い表現や略語が使われ、ビデオ通話では画面の見え方を確認します。', '原書のメッセージとビデオ通話の文を練習します。'],
    functions: [['01', 'テキストで予定を伝える'], ['02', 'リンクやグループチャットを扱う'], ['03', '略語とビデオ通話を理解する']],
    sections: [
      section('94-1', 'テキストとメッセージ', 'Texting and messaging', [p("This traffic is awful. We're going to be late for lunch!", 'この渋滞はひどい。昼食に遅れそう！'), p("Okay, I'll text and tell them to start without us.", 'わかった。先に始めてもらうようテキストするね。'), p('I found a great campsite. I messaged you the link.', 'すごいキャンプ場を見つけた。リンクをメッセージで送ったよ。'), p("I'm just clicking on it now.", '今クリックしているところ。'), p("This is Magda, she's just joined the choir.", 'こちらはマグダ。合唱団に入ったばかりです。'), p("Hi Magda, I'll add you to the group chat!", 'こんにちはマグダ。グループチャットに追加するね！')], ['ee_94_1_us.mp3']),
      section('94-2', 'テキスト略語', 'Text speak', [p('OMG, that video is hilarious!', 'OMG、その動画は大笑いするほど面白い！'), p('I know, right? LOL', '本当だよね。LOL'), p('BTW, RU coming out with us tonight?', 'ところで、今夜一緒に出かける？'), p('IDK, will have to see how I feel TBH', '正直、どう感じるか見てみないとわからない。')], ['ee_94_2_us.mp3']),
      section('94-3', '略語', 'Abbreviations', [v('OMG = oh my god', 'なんてこと・驚き'), v('LOL = laughing out loud', '大笑いしている'), v('BTW = by the way', 'ところで'), v('RU = are you', 'あなたは〜ですか'), v("IDK = I don't know", 'わからない'), v('TBH = to be honest', '正直に言うと')], ['ee_94_3_us.mp3']),
      section('94-4', 'ビデオ通話', 'Video calls', [p('Hey, Mum. Can you see me okay?', 'ねえ、ママ。ちゃんと見える？'), p('I can, darling! Can you see me?', '見えるわ、ダーリン！あなたには私が見える？'), p("I can only see the top of your head! Try moving your tablet.", '頭のてっぺんしか見えない！タブレットを動かしてみて。')], ['ee_94_4_us.mp3']),
      section('94-7', '音声に答える練習', 'Respond out loud', [p("I'm just clicking on it now.", '今クリックしているところ。'), p('BTW, RU coming out with us tonight?', 'ところで、今夜一緒に出かける？'), p('I messaged you the link.', 'リンクをメッセージで送ったよ。'), p('I know, right? LOL', '本当だよね。LOL'), p('Hey, Mum. Can you see me okay?', 'ねえ、ママ。ちゃんと見える？')], ['ee_94_7_1_us.mp3', 'ee_94_7_2_us.mp3', 'ee_94_7_3_us.mp3', 'ee_94_7_4_us.mp3']),
    ],
    tip: 'メッセージでは句読点を省略したり、OMG、BTW、IDK などの略語を使ったりします。',
  }),

  'social-95': sourceLesson({
    id: 'social-media', number: 95, enTitle: 'Social media', title: '第95章：ソーシャルメディア',
    ja: '写真、フォロー、DM、拡散、投稿、インフルエンサーなどSNSで使う表現を学びます。',
    cando: 'SNSで写真や投稿、フォロー、ブロック、拡散について話せる。',
    intro: ['SNSでは、写真やプロフィール、フォロー、DM、投稿の反応について話します。', '原書のSNS会話とビジネス表現を確認します。'],
    functions: [['01', '写真とプロフィールについて話す'], ['02', 'フォロー・DM・ブロックを説明する'], ['03', '投稿を広め、SNSビジネスを考える']],
    sections: [
      section('95-1', 'SNSを使う', 'Using social media', [p('Did you get any good photos on your trip?', '旅行でいい写真を撮った？'), p("They're all up on my profile...", '全部プロフィールに載っているよ…'), p('... check out this selfie I took at the Taj Mahal!', '…タージ・マハルで撮ったこの自撮りを見て！'), p("I've just given you a follow so we can stay in touch.", '連絡を取り続けられるよう、今フォローしたよ。'), p('Cool, I can see you in my notifications.', 'いいね、通知にあなたが表示されている。'), p('Oh no! That boy I met just DM’d me.', '困った！会った男の子がDMしてきた。'), p('Not him! Just block him.', 'あの人はだめ！ブロックして。')], ['ee_95_1_us.mp3']),
      section('95-2', '拡散される', 'Going viral', [p('My dog-grooming videos have gone viral!', '犬のグルーミング動画が拡散された！'), p("You've got loads of followers!", 'フォロワーがたくさんいるね！'), p("I saw! I think you've won the internet.", '見たよ！ネットを制したと思う。'), p("Yeah, a few big accounts have been sharing my posts.", 'うん、いくつかの大きなアカウントが私の投稿を共有している。'), p('Did you see that reel of Usha making a massive cake?', 'ウシャが巨大なケーキを作るリールを見た？'), p("It's adorable, right? It's got hundreds of \"likes\"!", 'かわいいよね？何百もの「いいね」がついている！')], ['ee_95_2_us.mp3']),
      section('95-3', 'ビジネスを築く', 'Building a business', [p('So, we need to grow our social reach.', 'それで、SNSでのリーチを伸ばす必要がある。'), p('More video content would help.', '動画コンテンツを増やすと役に立つ。'), p('Maybe hook up with an influencer...', 'インフルエンサーと組むのもいいかも…'), p('We could livestream the launch party.', '発売パーティーをライブ配信できる。')], ['ee_95_3_us.mp3']),
      section('95-4', 'その他の表現', 'More phrases', [p('There are loads of comments on my post!', '私の投稿にたくさんコメントがある！'), p("That's just a troll, I'm blocking them.", 'ただの荒らしだから、ブロックする。'), p('Click the follow button to get all our updates!', 'フォローボタンをクリックして、更新をすべて受け取って！'), p('Or how about a monthly podcast?', 'それとも月刊ポッドキャストはどう？')], ['ee_95_4_us.mp3']),
      section('95-7', '文を完成させる練習', 'Say the sentences out loud', [p('Or how about a monthly podcast?', 'それとも月刊ポッドキャストはどう？'), p('There are loads of comments on my post!', '私の投稿にたくさんコメントがある！'), p("That's just a troll, I'm blocking them.", 'ただの荒らしだから、ブロックする。'), p("They're all up on my profile.", '全部プロフィールに載っているよ。'), p("I saw! I think you've won the internet.", '見たよ！ネットを制したと思う。'), p('More video content would help.', '動画コンテンツを増やすと役に立つ。')], ['ee_95_7_1_us.mp3', 'ee_95_7_2_us.mp3', 'ee_95_7_3_us.mp3', 'ee_95_7_4_us.mp3', 'ee_95_7_5_us.mp3', 'ee_95_7_6_us.mp3']),
    ],
    tip: 'go viral、loads of followers、DM、troll、social reach など、SNS特有の表現を文脈とともに覚えます。',
  }),

  'social-96': sourceLesson({
    id: 'reading', number: 96, enTitle: 'Reading', title: '第96章：読書',
    ja: '本の感想、書店での質問、雑誌や新聞、定期購読について話す表現を学びます。',
    cando: '本の感想を伝え、書店で本を探し、雑誌・新聞・購読について話せる。',
    intro: ['本の感想を伝えたり、書店でおすすめや在庫を尋ねたりします。', '雑誌、新聞、定期購読に関する原書表現も確認します。'],
    functions: [['01', '本の感想を話す'], ['02', '書店で本を探す'], ['03', '雑誌・新聞・購読について話す']],
    sections: [
      section('96-1', '本について話す', 'Discussing books', [p("It's the best book I've read in ages.", 'こんなに長い間で読んだ最高の本です。'), p("I agree. I couldn't put it down!", '同感です。夢中で読み続けました！'), p("Yeah, it had me on the edge of my seat!", 'そう、手に汗を握って読んだよ！'), p('The ending was a bit of a letdown.', '結末は少しがっかりでした。'), p('I found it quite hard-going, actually.', '実際、かなり読みにくいと思いました。')], ['ee_96_1_us.mp3']),
      section('96-2', '書店で', 'At the bookshop', [p('Can you recommend a good holiday read?', '休暇に読むよい本をおすすめしてくれますか？'), p('Yes, this one is a real page-turner.', 'はい、これは本当に夢中になって読める本です。'), p('Can I help at all?', '何かお手伝いできますか？'), p("No, thanks. I'm just browsing.", 'いいえ、ありがとう。見ているだけです。'), p("I'm afraid that book's out of stock.", '申し訳ありません、その本は在庫切れです。'), p('Okay, could you order it in for me, please?', 'わかりました。取り寄せてもらえますか？')], ['ee_96_2_us.mp3']),
      section('96-3', '雑誌と新聞', 'Magazines and newspapers', [p('Want a flick through Fashion Monthly?', 'Fashion Monthlyをざっと見てみる？'), p("Yes, please, if you've finished with it.", 'はい、あなたが読み終わっていればお願いします。'), p("Have you seen today's headlines?", '今日の見出しを見た？'), p("No, what's been going on?", 'いいえ、何が起きているの？'), p('Did you renew our subscription to World Weekly?', 'World Weeklyの定期購読を更新した？'), p("Sorry, not yet - I'll do it now!", 'ごめん、まだ。今やるね！')], ['ee_96_3_us.mp3']),
      section('96-6', '文を組み合わせる練習', 'Match the sentences', [p('Did you renew our subscription to World Weekly?', 'World Weeklyの定期購読を更新した？'), p('Can you recommend a good holiday read?', '休暇に読むよい本をおすすめしてくれますか？'), p("It's the best book I've read in ages.", 'こんなに長い間で読んだ最高の本です。'), p('I found it quite hard-going, actually.', '実際、かなり読みにくいと思いました。'), p("Yeah, it had me on the edge of my seat!", 'そう、手に汗を握って読んだよ！'), p('Want a flick through Fashion Monthly?', 'Fashion Monthlyをざっと見てみる？')], ['ee_96_6_1_us.mp3', 'ee_96_6_2_us.mp3', 'ee_96_6_3_us.mp3', 'ee_96_6_4_us.mp3', 'ee_96_6_5_us.mp3']),
      section('96-idioms', '本の感想に出る表現', 'Book idioms', [v('a bit of a letdown', '少しがっかりなもの'), v('on the edge of my seat', '手に汗を握って'), v('hard-going', '読むのが大変な'), v('page-turner', '夢中で読み進める本')], ['ee_96_1_us.mp3']),
    ],
    tip: 'a bit of a letdown、on the edge of my seat、hard-going、page-turner は、原書が紹介する本の感想の表現です。',
  }),
}

const compactAudioKey = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '')

// The recordings use American labels for a few British spellings in the
// printed book (plasters/bandages, nappies/diapers, etc.).  Attach those
// named vocabulary recordings where the source folder provides one.  Dialogue
// entries keep their section recording, which is the book's combined track.
const vocabularyAudioAliases = {
  fivepast: 'fiveafter',
  quarterpast: 'quarterafter',
  tenpast: 'tenafter',
  twentypast: 'twentyafter',
  twentyfivepast: 'twentyfiveafter',
  whitecoffee: 'coffeewithmilk',
  skimmedmilk: 'skimmilk',
  soyamilk: 'soymilk',
  cafetiere: 'frenchpress',
  measuringjug: 'measuringcup',
  scales: 'scale',
  takeaway: 'takeout',
  takeawaymeals: 'takeoutmeals',
  playingfootball: 'playingsoccer',
  funfair: 'goingfair',
  playground: 'goingplayground',
  horseriding: 'horsebackriding',
  skipping: 'jumpingrope',
  theatre: 'theater',
  cinema: 'movietheater',
  workout: 'workout',
  citycentre: 'citycenter',
  coffeeshop: 'coffeeshop',
  gardencentre: 'gardencenter',
  petrolstation: 'gasstation',
  shoppingcentre: 'mall',
  cashmachine: 'atm',
  contactlesspayment: 'contactless',
  paymoneyinto: 'depositmoney',
  withdrawmoney: 'withdrawmoney',
  transfermoney: 'transfermoney',
  boxofeggs: 'cartonofeggs',
  kiloofpotatoes: 'poundofpotatoes',
  singleticket: 'onewayticket',
  returnticket: 'roundtripticket',
  railcard: 'railpass',
  drivinglicence: 'driverslicense',
  aeroplane: 'airplane',
  carpark: 'parkinglot',
  lorry: 'truck',
  taxirank: 'taxistand',
  campsite: 'campground',
  campervan: 'camper',
  traveladaptor: 'traveladapter',
  holiday: 'vacation',
  goonholiday: 'goonvacation',
  hirecar: 'rentacar',
  snorkelling: 'snorkeling',
  touristmap: 'tourismmap',
  touristoffice: 'tourismoffice',
  waterskiing: 'waterskiing',
  pedalo: 'paddleboat',
  spade: 'shovel',
  deckchair: 'beachchair',
  windscreen: 'windshield',
  bonnet: 'hood',
  boot: 'trunk',
  tyre: 'tire',
  clockin: 'clockin',
  clockout: 'clockout',
  plasters: 'bandages',
  bandage: 'dressing',
  consultingroom: 'consultationroom',
  contactlens: 'contactlenssolution',
  solution: 'contactlenssolution',
  sanitarytowels: 'sanitarypads',
  nappies: 'diapers',
  operation: 'surgery',
  operatingtheatre: 'operatingtheater',
  anaesthetic: 'anesthetic',
  toothache: 'toothache',
  tofloss: 'floss',
  tobrush: 'brush',
  torinse: 'rinse',
  textmessage: 'textmessage',
  videocall: 'videocall',
  mobilephone: 'cellphone',
  mousemat: 'mousepad',
  junkspam: 'junk',
  junkspammail: 'junk',
  tosend: 'send',
  toforward: 'forward',
  todelete: 'delete',
  toreply: 'reply',
  toreplyall: 'replyall',
  todownload: 'download',
  toupload: 'upload',
}

function attachNamedVocabularyAudio() {
  Object.values(sourceBookLessons).forEach((lesson) => {
    const files = everydayAudioByChapter[String(Number(lesson.number))] || []
    lesson.learn.sections.forEach((item) => {
      item.phrases.forEach((phrase) => {
        if (phrase.audio || phrase.context !== '原書の語彙') return
        const key = compactAudioKey(phrase.phrase)
        const target = vocabularyAudioAliases[key] || key
        const matches = files.map((candidate) => {
          const stem = compactAudioKey(candidate.replace(/^ee_\d+_\d+(?:_\d+)?_/, '').replace(/\.mp3$/, '').replace(/us(?:f\d+\-?\d*)?$/, ''))
          if (!stem || stem.length < 3) return null
          if (stem !== target && !stem.includes(target) && !target.includes(stem)) return null
          const exact = stem === target ? 10000 : 0
          return { candidate, score: exact + stem.length }
        }).filter(Boolean).sort((a, b) => b.score - a.score)
        const file = matches[0]?.candidate
        if (file) phrase.audio = file
      })
    })
  })
}

attachNamedVocabularyAudio()

export const sourceBookLessonList = Object.values(sourceBookLessons)
