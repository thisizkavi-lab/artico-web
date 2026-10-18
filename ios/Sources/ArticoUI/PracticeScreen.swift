import SwiftUI
import ArticoCore

struct PracticeScreen: View {
    @Environment(LearningStore.self) private var learning
    @Environment(AudioController.self) private var audio
    let lesson: Lesson
    let goToSituations: () -> Void
    let viewStudy: (String) -> Void
    @Binding var showingSession: Bool
    @State private var selector: PracticeSheet?
    @State private var hidden = false
    @State private var situationSelected = false
    private var session: PracticeSession { learning.session(for: lesson.id) }
    private var starter: [Phrase] { lesson.starterIds.compactMap(lesson.phrase) }
    private var validIDs: Set<String> { Set(lesson.phrases.map(\.id)) }
    var body: some View {
        VStack(alignment: .leading, spacing: 28) {
            if showingSession, session.completed { completion }
            else if showingSession, let id = session.currentID, let phrase = lesson.phrase(id) { focusedPhrase(phrase) }
            else { entry }
            if !lesson.practice.isEmpty && (!showingSession || session.completed) {
                VStack(alignment: .leading, spacing: 12) {
                    Kicker(text: learning.text("02 / PUT IT INTO WORDS", "02 / 自分の言葉で伝える"))
                    Text(learning.text("When the phrases feel familiar.", "表現に慣れてきたら。")) .font(.title2.weight(.semibold))
                    Text(learning.text("Try a situation aloud. Open a sample response when you need support.", "場面に合わせて声に出します。迷ったら、返答例を参考にしてください。")).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                }.id("practice-situations")
                ForEach(lesson.practice) { section in ScenarioSectionView(section: section, lesson: lesson, expandFirst: situationSelected) }
            }
        }
        .sheet(item: $selector) { _ in PhraseSelectionSheet(lesson: lesson) { ids in start(ids) } }
        .task(id: lesson.id) { learning.updateSession(lesson.id) { $0.reconcile(validIDs: validIDs) } }
        .onChange(of: session.currentID) { _, _ in hidden = false; audio.stop() }
        .onDisappear { audio.stop() }
    }
    private func start(_ ids: [String]) {
        audio.stop()
        learning.updateSession(lesson.id) { $0.start(ids, validIDs: validIDs) }
        showingSession = !ids.isEmpty; hidden = false
    }
    private var entry: some View {
        VStack(spacing: 16) {
            ArticoCard {
                VStack(alignment: .leading, spacing: 18) {
                    Kicker(text: learning.text("01 / SAY IT AGAIN", "01 / 繰り返し声に出す"))
                    Text(learning.text("Start with a short set.", "まずは、短いセットから。")) .font(.title2.weight(.semibold))
                    Text(learning.text("Say each expression aloud. Repeat the ones you need.", "一つずつ声に出しましょう。必要な表現を繰り返します。")).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                    Button(learning.text("Practice \(starter.count) expressions", "\(starter.count)個の表現を練習")) { start(lesson.starterIds) }
                        .buttonStyle(PrimaryButton()).disabled(starter.isEmpty).accessibilityIdentifier("start-practice")
                    if !session.queue.isEmpty {
                        Button(learning.text(session.completed ? "Repeat your previous set" : "Resume your previous set", session.completed ? "前回のセットをもう一度" : "前回の練習を続ける")) {
                            if session.completed { start(session.queue) } else { showingSession = true }
                        }.font(.subheadline).frame(minHeight: 44).accessibilityIdentifier("resume-practice")
                    }
                    DisclosureGroup(learning.text("Preview the expressions", "練習する表現を見る")) {
                        VStack(alignment: .leading, spacing: 14) {
                            ForEach(starter) { phrase in
                                Text(phrase.en).font(.body.weight(.medium)).fixedSize(horizontal: false, vertical: true)
                            }
                        }.padding(.top, 12)
                    }.font(.subheadline)
                }
            }
            Button { selector = .phrases } label: {
                HStack { VStack(alignment: .leading, spacing: 6) {
                    Text(learning.text("Choose your own expressions", "練習する表現を自分で選ぶ")).font(.headline)
                    Text(learning.text("\(lesson.phrases.count) available · your choices stay saved", "全\(lesson.phrases.count)項目・選択は保存されます")).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                }; Spacer(); Image(systemName: "slider.horizontal.3") }.padding(18).frame(maxWidth: .infinity, alignment: .leading)
                    .background(ArticoTheme.surface, in: RoundedRectangle(cornerRadius: 16))
            }.buttonStyle(.plain).accessibilityIdentifier("choose-expressions")
        }
    }
    private func focusedPhrase(_ phrase: Phrase) -> some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack {
                Button(learning.text("Change set", "セットを変える")) { showingSession = false; audio.stop() }.font(.subheadline)
                Spacer()
                Text("\(session.index + 1) / \(session.queue.count)").font(.subheadline.monospacedDigit()).foregroundStyle(ArticoTheme.muted).accessibilityIdentifier("practice-position")
            }
            ProgressView(value: Double(session.index + 1), total: Double(session.queue.count)).accessibilityLabel(learning.text("Position in practice set", "練習セットの進み具合"))
            ArticoCard {
                VStack(alignment: .leading, spacing: 20) {
                    HStack { if let speaker = phrase.speaker { Kicker(text: speaker) }; Spacer()
                        Button { learning.toggleSaved(phrase.id) } label: { Image(systemName: learning.state.savedPhrases.contains(phrase.id) ? "bookmark.fill" : "bookmark").frame(width: 44, height: 44) }
                            .accessibilityLabel(learning.text("Save expression", "表現を保存"))
                    }
                    if let art = phrase.art { CourseArtwork(name: art).frame(maxHeight: 170) }
                    if let context = phrase.context, !context.isEmpty { Text(context).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(4) }
                    if hidden { Text(learning.text("Try it from memory.", "見ないで言ってみましょう。")) .font(.title2).foregroundStyle(ArticoTheme.muted).frame(minHeight: 64) }
                    else { Text(phrase.en).font(.system(.title, design: .default, weight: .medium)).fixedSize(horizontal: false, vertical: true).frame(minHeight: 64, alignment: .leading).accessibilityIdentifier("practice-phrase") }
                    Button(learning.text(hidden ? "Show phrase" : "Hide phrase", hidden ? "表現を表示" : "表現を隠す")) { hidden.toggle() }.font(.subheadline).frame(minHeight: 44)
                    AudioControls(source: phrase.audio, phrase: phrase.en)
                }
            }
            VStack(alignment: .leading, spacing: 10) {
                Text(learning.text("How does it feel to say?", "声に出してみて、どうですか？")).font(.subheadline)
                ViewThatFits(in: .horizontal) {
                    HStack { ratingButtons(phrase) }
                    VStack(alignment: .leading) { ratingButtons(phrase) }
                }
                Text(learning.text("Your own reflection. It stays in this set.", "自分の感覚で選びます。表現はこのセットに残ります。")).font(.caption).foregroundStyle(ArticoTheme.muted)
            }
            Button(learning.text("View in Study", "学習で確認する")) { viewStudy(phrase.section == "words" ? "\(lesson.id)-words" : phrase.section) }.font(.subheadline).frame(minHeight: 44)
        }
    }
    @ViewBuilder private func ratingButtons(_ phrase: Phrase) -> some View {
        ForEach(Familiarity.allCases, id: \.self) { rating in
            Button { learning.updateSession(lesson.id) { $0.ratings[phrase.id] = rating } } label: {
                Text(ratingLabel(rating, learning.language)).font(.subheadline.weight(.medium)).padding(.horizontal, 10).frame(minHeight: 44)
                    .background(session.ratings[phrase.id] == rating ? ArticoTheme.blueWash : ArticoTheme.surface, in: Capsule())
                    .overlay(Capsule().strokeBorder(session.ratings[phrase.id] == rating ? ArticoTheme.blue : ArticoTheme.line))
            }.buttonStyle(.plain).accessibilityAddTraits(session.ratings[phrase.id] == rating ? .isSelected : [])
        }
    }
    private var completion: some View {
        ArticoCard(color: ArticoTheme.blueWash) {
            VStack(alignment: .leading, spacing: 18) {
                Image(systemName: "checkmark.circle").font(.largeTitle).foregroundStyle(ArticoTheme.blue)
                Kicker(text: learning.text("SET FINISHED", "セットを終えました"))
                Text(learning.text("Now make it your own.", "次は、自分の言葉で。")) .font(.title2.weight(.semibold)).accessibilityIdentifier("practice-complete")
                Text(learning.text("You reached the end of \(session.queue.count) expressions.", "\(session.queue.count)個の表現を最後まで練習しました。")).font(.subheadline)
                if !lesson.practice.isEmpty {
                    Button(learning.text("Try a situation", "場面練習に挑戦")) { situationSelected = true; goToSituations() }.buttonStyle(PrimaryButton())
                }
                let needsWork = session.queue.filter { session.ratings[$0] == .needsWork }
                if !needsWork.isEmpty { Button(learning.text("Repeat the expressions that need work", "もう少し練習したい表現を繰り返す")) { start(needsWork) }.frame(minHeight: 44) }
                Button(learning.text("Repeat this set", "このセットをもう一度")) { start(session.queue) }.frame(minHeight: 44)
                Button(learning.text("Choose another set", "別のセットを選ぶ")) { showingSession = false }.frame(minHeight: 44)
                Text(learning.text("Your ratings are your own reflection, not a test score.", "評価は、自分で振り返るためのものです。テストの点数ではありません。")).font(.caption).foregroundStyle(ArticoTheme.muted)
            }
        }
    }
}

struct PracticeNavigationBar: View {
    @Environment(LearningStore.self) private var learning
    @Environment(AudioController.self) private var audio
    let lessonID: String
    private var session: PracticeSession { learning.session(for: lessonID) }
    var body: some View {
        HStack(spacing: 16) {
            Button { learning.updateSession(lessonID) { $0.previous() }; audio.stop() } label: { Image(systemName: "arrow.left").frame(width: 48, height: 48) }
                .buttonStyle(.bordered).disabled(session.index == 0).accessibilityLabel(learning.text("Previous phrase", "前の表現"))
            Button(learning.text(session.index == session.queue.count - 1 ? "Finish set" : "Next phrase", session.index == session.queue.count - 1 ? "セットを終える" : "次の表現")) {
                learning.updateSession(lessonID) { $0.next() }; audio.stop()
            }.buttonStyle(PrimaryButton()).accessibilityIdentifier("next-phrase")
        }.padding(.horizontal, 20).padding(.vertical, 10).background(.regularMaterial)
    }
}

func ratingLabel(_ rating: Familiarity, _ language: ExplanationLanguage) -> String {
    switch rating {
    case .needsWork: return language.text("Needs work", "重点的に")
    case .practicing: return language.text("Practicing", "練習中")
    case .familiar: return language.text("Familiar", "慣れてきた")
    }
}
enum PracticeSheet: String, Identifiable { case phrases; var id: String { rawValue } }

struct PhraseSelectionSheet: View {
    @Environment(LearningStore.self) private var learning
    @Environment(\.dismiss) private var dismiss
    let lesson: Lesson
    let start: ([String]) -> Void
    @State private var query = ""
    @State private var filter: Familiarity?
    private var session: PracticeSession { learning.session(for: lesson.id) }
    private var selected: Set<String> { Set(session.selectedIDs ?? lesson.starterIds) }
    private var visible: [Phrase] { lesson.phrases.filter { phrase in
        (filter == nil || session.ratings[phrase.id] == filter) && (query.isEmpty || "\(phrase.en) \(phrase.context ?? "")".localizedCaseInsensitiveContains(query))
    } }
    var body: some View {
        NavigationStack {
            List {
                Section {
                    Picker(learning.text("Show", "表示"), selection: $filter) {
                        Text(learning.text("All expressions", "すべての表現")).tag(Optional<Familiarity>.none)
                        ForEach(Familiarity.allCases, id: \.self) { Text(ratingLabel($0, learning.language)).tag(Optional($0)) }
                    }
                    HStack {
                        Button(learning.text("Select shown", "表示中を選択")) { setSelection(selected.union(visible.map(\.id))) }
                        Spacer()
                        Button(learning.text("Clear all", "すべて外す")) { setSelection([]) }
                    }.font(.subheadline).frame(minHeight: 36).buttonStyle(.borderless)
                }
                ForEach(visible) { phrase in
                    Button {
                        var ids = selected
                        if ids.contains(phrase.id) { ids.remove(phrase.id) } else { ids.insert(phrase.id) }
                        setSelection(ids)
                    } label: {
                        HStack(alignment: .top, spacing: 14) {
                            Image(systemName: selected.contains(phrase.id) ? "checkmark.circle.fill" : "circle").font(.title3).foregroundStyle(selected.contains(phrase.id) ? ArticoTheme.blue : ArticoTheme.muted).padding(.top, 2)
                            VStack(alignment: .leading, spacing: 6) {
                                Text(phrase.en).font(.body.weight(.medium)).foregroundStyle(ArticoTheme.ink)
                                if let context = phrase.context { Text(context).font(.subheadline).foregroundStyle(ArticoTheme.muted) }
                            }.fixedSize(horizontal: false, vertical: true)
                        }.padding(.vertical, 8)
                    }.buttonStyle(.plain).accessibilityAddTraits(selected.contains(phrase.id) ? .isSelected : [])
                }
                if visible.isEmpty { ContentUnavailableView.search(text: query) }
            }.courseSearch(text: $query, prompt: learning.text("Find an expression", "表現を探す"))
                .navigationTitle(learning.text("Your practice set", "練習する表現")).inlineTitle()
                .toolbar { ToolbarItem(placement: .confirmationAction) { Button(learning.text("Done", "完了")) { dismiss() } } }
                .safeAreaInset(edge: .bottom) {
                    VStack(spacing: 8) {
                        Text(learning.text("\(selected.count) selected", "\(selected.count)個を選択中")).font(.subheadline)
                        Button(learning.text("Practice selected", "選んだ表現を練習")) {
                            start(lesson.phrases.filter { selected.contains($0.id) }.map(\.id)); dismiss()
                        }.buttonStyle(PrimaryButton()).disabled(selected.isEmpty).accessibilityIdentifier("practice-selected")
                    }.padding(16).background(.regularMaterial)
                }
        }
    }
    private func setSelection(_ ids: Set<String>) { learning.updateSession(lesson.id) { $0.selectedIDs = lesson.phrases.filter { ids.contains($0.id) }.map(\.id) } }
}

struct ScenarioSectionView: View {
    @Environment(LearningStore.self) private var learning
    let section: LessonSection
    let lesson: Lesson
    let expandFirst: Bool
    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text(section.title).font(.headline)
            ForEach(section.blocks) { block in
                if block.type == "list", block.ordered == true {
                    ForEach(Array((block.items ?? []).enumerated()), id: \.offset) { index, item in
                        ScenarioCard(item: item, noteID: "\(lesson.id)-\(section.id)-q\(item.number ?? index + 1)", requestedOpen: expandFirst && index == 0)
                    }
                } else { StudyBlockView(block: block, lesson: lesson, examples: false) }
            }
            if let answers = section.answers, !answers.isEmpty {
                DisclosureGroup(learning.text("More guidance and sample responses", "補足と返答例")) {
                    VStack(alignment: .leading, spacing: 16) { ForEach(answers) { block in StudyBlockView(block: block, lesson: lesson, examples: false) } }.padding(.top, 14)
                }.font(.subheadline)
            }
        }
    }
}

struct ScenarioCard: View {
    @Environment(LearningStore.self) private var learning
    let item: ContentItem
    let noteID: String
    let requestedOpen: Bool
    @State private var expanded = false
    var body: some View {
        ArticoCard {
            DisclosureGroup(isExpanded: $expanded) {
                VStack(alignment: .leading, spacing: 18) {
                    if let sample = item.sample {
                        DisclosureGroup(learning.text("Show a sample response", "返答例を見る")) {
                            RichText(runs: sample).font(.body).lineSpacing(4).padding(.top, 12)
                        }
                    }
                    TextField(learning.text("Optional notes", "メモ（任意）"), text: Binding(get: { learning.state.notes[noteID] ?? "" }, set: { learning.setNote($0, id: noteID) }), axis: .vertical)
                        .lineLimit(3...8).textFieldStyle(.roundedBorder)
                }.padding(.top, 16)
            } label: {
                RichText(runs: item.runs).font(.body).foregroundStyle(ArticoTheme.ink).padding(.vertical, 5)
            }
        }.onChange(of: requestedOpen, initial: true) { _, value in if value { expanded = true } }
    }
}
