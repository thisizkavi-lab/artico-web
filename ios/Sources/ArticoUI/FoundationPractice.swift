import SwiftUI
import ArticoCore

struct AlphabetBoard: View {
    @Environment(LearningStore.self) private var learning
    @Environment(AudioController.self) private var audio
    @State private var selected: String?
    private let letters = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(String.init)
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 64), spacing: 10)], spacing: 10) {
                ForEach(letters, id: \.self) { letter in
                    Button { selected = letter; audio.speakLetter(letter) } label: {
                        Text("\(letter) \(letter.lowercased())").font(.title3.weight(.medium)).frame(maxWidth: .infinity, minHeight: 60)
                            .background(selected == letter ? ArticoTheme.blueWash : ArticoTheme.surface, in: RoundedRectangle(cornerRadius: 14))
                            .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(selected == letter ? ArticoTheme.blue : ArticoTheme.line))
                    }.buttonStyle(.plain).accessibilityLabel(learning.text("Hear the letter \(letter)", "\(letter)の名前を聞く"))
                }
            }
            Text(learning.text("Letter names · your device’s American English voice. A letter’s name is different from its sounds in words.", "文字の名前を、端末のアメリカ英語の音声で読みます。文字の名前と、単語の中での音は別のものです。"))
                .font(.footnote).foregroundStyle(ArticoTheme.muted)
        }
    }
}

struct FoundationPracticeView: View {
    @Environment(LearningStore.self) private var learning
    let lesson: Lesson
    var body: some View {
        VStack(alignment: .leading, spacing: 22) {
            switch lesson.id {
            case "letters", "hear":
                Text(learning.text("Listen, then say the name.", "聞いてから、文字の名前を言いましょう。")) .font(.title2.weight(.semibold))
                AlphabetBoard()
                practiceNote("Choose a few letters. Look away and say them again. Then spell your own name.", "いくつか選んで聞き、画面を見ないで言ってみます。次に、自分の名前を一文字ずつ言ってみましょう。")
            case "tongue-intro":
                TwisterPracticeView()
            case "write":
                Text(learning.text("Make the shapes your own.", "自分の手で、文字を書いてみましょう。")) .font(.title2.weight(.semibold))
                practiceNote("Use a pen and paper. Choose five letters and write both forms. Say each letter’s name, then write your name or a short word.", "紙とペンを用意します。文字を5つ選び、大文字と小文字を書いてみましょう。名前を言いながら書き、最後に自分の名前や短い単語を書いてみます。")
                Text("Aa   Bb   Cc   Dd   Ee").font(.system(.largeTitle, design: .serif)).fixedSize(horizontal: false, vertical: true)
                reflection("What would you like to practice next?", "次に練習したい文字は？")
            case "sounds":
                Text(learning.text("Notice a sound, then use it.", "音に気づいて、言ってみましょう。")) .font(.title2.weight(.semibold))
                practiceNote("Read these words. The initial K is silent. In knife, F is the last consonant you say; the final E has no separate sound.", "最初のkは発音しません。knifeでは、最後に言う子音はfです。最後のeは、それだけの音にはなりません。")
                ForEach(["know", "knee", "knife"], id: \.self) { word in ArticoCard { Text(word).font(.title) } }
                practiceNote("Return to the video in Study if you need a model. Then use one word in a short phrase: “I know.”", "音の見本が必要なら、学習モードの動画に戻りましょう。次に「I know.」のような短い表現で使ってみます。")
                NavigationLink(value: LessonRoute(id: "tongue-intro", mode: .practice)) { Label(learning.text("Try a recorded sound exercise", "音声つきの練習へ"), systemImage: "waveform") }.buttonStyle(PrimaryButton())
            default:
                Text(learning.text(lesson.id == "orientation" ? "Make it personal." : "Choose one small action.", lesson.id == "orientation" ? "自分の理由を見つける。" : "小さな行動を一つ選ぶ。")) .font(.title2.weight(.semibold))
                practiceNote("Think of one real person or situation. What would you like to understand or say in English? A short, concrete answer is enough.", "実際の人や場面を一つ思い浮かべます。英語で何を理解したいですか。何を伝えたいですか。短く、具体的な答えで十分です。")
                reflection("I’d like to be able to…", "英語でできるようになりたいこと…")
                NavigationLink(value: LessonRoute(id: "01")) { Label(learning.text("Start with greetings", "あいさつから始める"), systemImage: "arrow.right") }.buttonStyle(PrimaryButton())
            }
        }
    }
    private func practiceNote(_ en: String, _ ja: String) -> some View { Text(learning.text(en, ja)).font(.body).lineSpacing(5).foregroundStyle(ArticoTheme.muted) }
    private func reflection(_ en: String, _ ja: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            TextField(learning.text(en, ja), text: Binding(get: { learning.state.notes["foundation-\(lesson.id)"] ?? "" }, set: { learning.setNote($0, id: "foundation-\(lesson.id)") }), axis: .vertical)
                .lineLimit(4...8).textFieldStyle(.roundedBorder)
            Text(learning.text("Optional · saved on this device", "任意・この端末に保存されます")).font(.caption).foregroundStyle(ArticoTheme.muted)
        }
    }
}

struct TwisterReferenceView: View {
    @Environment(LearningStore.self) private var learning
    let id: String
    @State private var item: TongueTwister?
    var body: some View {
        Group {
            if let item {
                ArticoCard {
                    VStack(alignment: .leading, spacing: 14) {
                        Kicker(text: item.target)
                        Text(item.phrase).font(.title3.weight(.medium)).fixedSize(horizontal: false, vertical: true)
                        Text(learning.text(item.guidance, item.cue)).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(4)
                        AudioControls(source: item.audio, phrase: item.phrase)
                    }
                }
            }
        }.task(id: id) { item = try? CourseResources.twisters().first { $0.id == id || id.hasSuffix($0.id) } }
    }
}

struct TwisterCollection: View {
    @State private var items: [TongueTwister] = []
    var body: some View {
        VStack(spacing: 16) { ForEach(items) { TwisterReferenceView(id: $0.id) } }
            .task { items = (try? CourseResources.twisters()) ?? [] }
    }
}

struct TwisterPracticeView: View {
    @Environment(LearningStore.self) private var learning
    @Environment(AudioController.self) private var audio
    @State private var items: [TongueTwister] = []
    @State private var selected = "red-lorry"
    @State private var step = 0
    @State private var finished = false
    private var item: TongueTwister? { items.first { $0.id == selected } }
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text(learning.text("Clarity before speed.", "速さより、明瞭さ。")) .font(.title2.weight(.semibold))
            Picker(learning.text("Sound exercise", "音の練習"), selection: $selected) {
                ForEach(items) { Text($0.phrase).tag($0.id) }
            }.pickerStyle(.menu).accessibilityIdentifier("twister-picker")
            if let item {
                if finished {
                    ArticoCard(color: ArticoTheme.blueWash) {
                        VStack(alignment: .leading, spacing: 16) {
                            Label(learning.text("Now use the movement.", "その動きを、日常の表現へ。"), systemImage: "checkmark.circle").font(.headline)
                            ForEach(item.transfer, id: \.self) { Text($0).font(.title3) }
                            Button(learning.text("Practice this exercise again", "この練習をもう一度")) { step = 0; finished = false }.buttonStyle(PrimaryButton())
                        }
                    }
                } else {
                    ArticoCard {
                        VStack(alignment: .leading, spacing: 18) {
                            Kicker(text: item.target)
                            Text(learning.text("Step \(step + 1) of \(item.buildSteps.count)", "\(item.buildSteps.count)ステップ中の\(step + 1)")) .font(.subheadline).foregroundStyle(ArticoTheme.muted)
                            Text(item.buildSteps[step]).font(.title.weight(.medium)).fixedSize(horizontal: false, vertical: true)
                            Text(learning.text(item.guidance, item.cue)).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(4)
                            AudioControls(source: item.chunkAudio[step], phrase: item.buildSteps[step])
                        }
                    }
                    AudioPracticeSettings()
                    HStack(spacing: 16) {
                        Button { step = max(0, step - 1) } label: { Image(systemName: "arrow.left").frame(width: 44, height: 44) }
                            .buttonStyle(.bordered).disabled(step == 0).accessibilityLabel(learning.text("Previous chunk", "前の部分へ"))
                        Button(learning.text(step + 1 == item.buildSteps.count ? "Try everyday phrases" : "Next chunk", step + 1 == item.buildSteps.count ? "日常の表現で試す" : "次の部分へ")) {
                            audio.stop()
                            if step + 1 < item.buildSteps.count { step += 1 } else { finished = true }
                        }.buttonStyle(PrimaryButton())
                    }
                }
            }
        }.task {
            items = (try? CourseResources.twisters()) ?? []
            let saved = learning.state.notes["twister-choice"] ?? "red-lorry"
            if items.contains(where: { $0.id == saved }) { selected = saved }
        }
        .onChange(of: selected) { _, value in step = 0; finished = false; audio.stop(); learning.setNote(value, id: "twister-choice") }
        .onChange(of: step) { _, _ in audio.stop() }
        .onDisappear { audio.stop(); audio.repeatPhrase = false }
    }
}

struct AudioPracticeSettings: View {
    @Environment(AudioController.self) private var audio
    @Environment(LearningStore.self) private var learning
    var body: some View {
        @Bindable var audio = audio
        VStack(alignment: .leading, spacing: 16) {
            Picker(learning.text("Playback speed", "再生速度"), selection: $audio.speed) {
                Text("0.75×").tag(Float(0.75)); Text("1×").tag(Float(1)); Text("1.1×").tag(Float(1.1))
            }.pickerStyle(.segmented)
            Toggle(learning.text("Repeat with a pause", "間をあけて繰り返す"), isOn: $audio.repeatPhrase)
            if audio.repeatPhrase {
                HStack { Text(learning.text("Time to speak", "自分で言う時間")); Spacer(); Text("\(Int(audio.responsePause)) s").monospacedDigit() }.font(.subheadline)
                Slider(value: $audio.responsePause, in: 1...8, step: 1).accessibilityLabel(learning.text("Pause between repetitions", "繰り返しの間隔"))
            }
            Text(learning.text("This changes playback speed. Start with clear movements, and return to 1× when ready.", "再生速度を変えます。まず動きを明確にして、慣れたら1倍速に戻しましょう。")) .font(.caption).foregroundStyle(ArticoTheme.muted)
        }
    }
}
