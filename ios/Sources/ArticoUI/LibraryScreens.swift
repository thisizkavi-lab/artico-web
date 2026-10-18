import SwiftUI
import ArticoCore

struct HomeScreen: View {
    @Environment(LearningStore.self) private var learning
    let manifest: CourseManifest
    private var resume: LessonSummary { manifest.lessons.first { $0.id == learning.state.lastLesson } ?? manifest.lessons[0] }
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {
                VStack(alignment: .leading, spacing: 8) {
                    Kicker(text: learning.text("ONE LANGUAGE. INFINITE POSSIBILITIES.", "ひとつの言葉から、広がる可能性。"))
                    Text(learning.text("A little understanding.\nA little practice.", "わかることから、\n話せることへ。"))
                        .font(.system(.largeTitle, design: .serif)).fixedSize(horizontal: false, vertical: true)
                }.padding(.top, 8)
                ArticoCard {
                    VStack(alignment: .leading, spacing: 16) {
                        Kicker(text: learning.text(learning.state.lastLesson == nil ? "START HERE" : "CONTINUE LEARNING", learning.state.lastLesson == nil ? "ここから始める" : "前回の続き"))
                        Text(resume.title).font(.title2.weight(.semibold)).fixedSize(horizontal: false, vertical: true)
                        Text(resume.goal(in: learning.language)).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                        NavigationLink(value: LessonRoute(id: resume.id, mode: learning.state.lastLesson == nil ? .study : learning.state.lastMode)) {
                            HStack { Text(learning.text(learning.state.lastLesson == nil ? "Begin learning" : "Continue", learning.state.lastLesson == nil ? "学習を始める" : "続きを学ぶ")); Spacer(); Image(systemName: "arrow.right") }
                        }.buttonStyle(PrimaryButton()).accessibilityIdentifier("home-resume")
                    }
                }
                VStack(alignment: .leading, spacing: 18) {
                    Text(learning.text("Your learning path", "学習の道順")).font(.title2.weight(.semibold))
                    ForEach(Array(["orientation", "foundation", "social"].enumerated()), id: \.element) { index, stage in
                        let first = manifest.lessons.first { $0.stage == stage }!
                        NavigationLink(value: LessonRoute(id: first.id)) {
                            HStack(alignment: .top, spacing: 16) {
                                Text(String(format: "%02d", index + 1)).font(.headline.monospacedDigit()).frame(width: 42, height: 42)
                                    .background(stage == "orientation" ? ArticoTheme.lilac : stage == "foundation" ? ArticoTheme.yellow : ArticoTheme.sage, in: Circle())
                                VStack(alignment: .leading, spacing: 5) {
                                    Text(stageTitle(stage, learning.language)).font(.headline)
                                    Text(stageDescription(stage, learning.language)).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                                }
                                Spacer(minLength: 0); Image(systemName: "chevron.right").font(.caption.weight(.semibold)).padding(.top, 12)
                            }.padding(.vertical, 10).contentShape(Rectangle())
                        }.buttonStyle(.plain)
                    }
                }
                NavigationLink(value: LessonRoute(id: "01")) {
                    VStack(alignment: .leading, spacing: 14) {
                        CourseArtwork(name: "ch01-scene-0.svg")
                        HStack { VStack(alignment: .leading, spacing: 4) {
                            Kicker(text: learning.text("YOUR FIRST CONVERSATION", "最初の会話"))
                            Text("Good morning.").font(.title2.weight(.medium))
                        }; Spacer(); Image(systemName: "arrow.up.right") }
                    }.padding(16).background(ArticoTheme.surface, in: RoundedRectangle(cornerRadius: 20))
                }.buttonStyle(.plain)
                Label(learning.text("Saved on this device. Learn at your own pace.", "この端末に保存。自分のペースで進めましょう。"), systemImage: "checkmark.circle")
                    .font(.footnote).foregroundStyle(ArticoTheme.muted)
            }.padding(20).frame(maxWidth: 680)
        }.readingCanvas()
    }
}

func stageTitle(_ stage: String, _ language: ExplanationLanguage) -> String {
    switch stage {
    case "orientation": return language.text("Orientation", "はじめに")
    case "foundation": return language.text("Foundations", "文字・音・リズム")
    default: return language.text("Social Fluency", "日常のやりとり")
    }
}
func stageDescription(_ stage: String, _ language: ExplanationLanguage) -> String {
    switch stage {
    case "orientation": return language.text("Find your reason. Learn how Artico works.", "学ぶ理由と、Articoの進め方を知る。")
    case "foundation": return language.text("Get comfortable with letters, sounds, and rhythm.", "文字を知り、耳で聞き、口を動かす。")
    default: return language.text("96 chapters. Bring English into everyday life.", "全96章。場面を学び、自分の言葉で試す。")
    }
}

struct CourseScreen: View {
    @Environment(LearningStore.self) private var learning
    let manifest: CourseManifest
    @State private var search = ""
    private var filtered: [LessonSummary] {
        let query = search.trimmingCharacters(in: .whitespacesAndNewlines)
        return query.isEmpty ? manifest.lessons : manifest.lessons.filter { "\($0.title) \($0.titleJa) \($0.goal) \($0.goalJa) \($0.id)".localizedCaseInsensitiveContains(query) }
    }
    private var groups: [String] { filtered.reduce(into: []) { if !$0.contains($1.group) { $0.append($1.group) } } }
    var body: some View {
        List {
            if filtered.isEmpty {
                ContentUnavailableView.search(text: search)
            } else {
                ForEach(groups, id: \.self) { group in
                    let lessons = filtered.filter { $0.group == group }
                    Section(lessons.first?.group(in: learning.language) ?? group) {
                        ForEach(lessons) { lesson in
                            NavigationLink(value: LessonRoute(id: lesson.id)) { LessonRow(lesson: lesson) }
                                .accessibilityIdentifier("lesson-\(lesson.id)")
                                .listRowBackground(ArticoTheme.surface)
                        }
                    }
                }
            }
        }.courseSearch(text: $search, prompt: learning.text("Find a lesson or situation", "レッスンや場面を探す"))
            .scrollContentBackground(.hidden).readingCanvas()
    }
}

struct LessonRow: View {
    @Environment(LearningStore.self) private var learning
    let lesson: LessonSummary
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Group {
                if learning.state.completedLessons.contains(lesson.id) { Image(systemName: "checkmark.circle.fill").foregroundStyle(ArticoTheme.blue) }
                else { Text(String(format: "%02d", lesson.stage == "social" ? Int(lesson.id)! : lesson.ordinal)).foregroundStyle(ArticoTheme.muted) }
            }.font(.subheadline.monospacedDigit()).frame(width: 28).padding(.top, 2)
            VStack(alignment: .leading, spacing: 5) {
                Text(lesson.title).font(.body.weight(.medium)).foregroundStyle(ArticoTheme.ink).fixedSize(horizontal: false, vertical: true)
                if learning.language == .japanese { Text(lesson.titleJa).font(.subheadline).foregroundStyle(ArticoTheme.muted).fixedSize(horizontal: false, vertical: true) }
            }
        }.padding(.vertical, 8)
    }
}

struct ProgressScreen: View {
    @Environment(LearningStore.self) private var learning
    let manifest: CourseManifest
    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 12) {
                    Text(learning.text("A record of your practice.", "少しずつ、積み重ねる。"))
                        .font(.system(.title2, design: .serif))
                    HStack(alignment: .firstTextBaseline) {
                        Text("\(learning.state.completedLessons.count)").font(.largeTitle.weight(.semibold))
                        Text(learning.text("lessons marked complete", "レッスンを完了")).foregroundStyle(ArticoTheme.muted)
                    }
                    Text(learning.text("This is your learning history, not a fluency score.", "これは学習の記録です。英語力の点数ではありません。"))
                        .font(.subheadline).foregroundStyle(ArticoTheme.muted)
                }.padding(.vertical, 10)
            }.listRowBackground(ArticoTheme.surface)
            Section {
                NavigationLink { SavedPhrasesScreen(manifest: manifest) } label: {
                    Label(learning.text("Saved expressions", "保存した表現"), systemImage: "bookmark")
                    Spacer(); Text("\(learning.state.savedPhrases.count)").foregroundStyle(ArticoTheme.muted)
                }
            }.listRowBackground(ArticoTheme.surface)
            Section(learning.text("Recently opened", "最近の学習")) {
                if learning.state.visitedLessons.isEmpty {
                    Text(learning.text("Open a lesson to begin. Your place will be saved here.", "レッスンを開くと、学習の続きがここに保存されます。"))
                        .foregroundStyle(ArticoTheme.muted).padding(.vertical, 10)
                }
                ForEach(learning.state.visitedLessons.compactMap { id in manifest.lessons.first { $0.id == id } }) { lesson in
                    NavigationLink(value: LessonRoute(id: lesson.id)) { LessonRow(lesson: lesson) }
                }
            }.listRowBackground(ArticoTheme.surface)
        }.scrollContentBackground(.hidden).readingCanvas()
    }
}

struct SavedPhrasesScreen: View {
    @Environment(LearningStore.self) private var learning
    let manifest: CourseManifest
    @State private var items: [SavedPhrase] = []
    private struct SavedPhrase: Identifiable { let lesson: String; let phrase: Phrase; var id: String { phrase.id } }
    var body: some View {
        List {
            if learning.state.savedPhrases.isEmpty {
                ContentUnavailableView(learning.text("Keep a useful expression", "役立つ表現を保存"), systemImage: "bookmark", description: Text(learning.text("Tap the bookmark while studying or practicing.", "学習・練習中にブックマークを押すと、ここに保存されます。")))
            }
            ForEach(items.filter { learning.state.savedPhrases.contains($0.id) }) { item in
                NavigationLink(value: LessonRoute(id: item.lesson, section: item.phrase.section == "words" ? "\(item.lesson)-words" : item.phrase.section)) {
                    VStack(alignment: .leading, spacing: 6) {
                        Text(item.phrase.en).font(.title3)
                        if let context = item.phrase.context { Text(context).font(.subheadline).foregroundStyle(ArticoTheme.muted) }
                    }.padding(.vertical, 8)
                }
            }
        }.navigationTitle(learning.text("Saved expressions", "保存した表現")).inlineTitle().scrollContentBackground(.hidden).readingCanvas()
            .task(id: learning.language) {
                var saved: [SavedPhrase] = []
                for summary in manifest.lessons {
                    if let lesson = try? CourseResources.lesson(summary.id, language: learning.language) {
                        var seen = Set<String>()
                        saved += (lesson.phrases + lesson.studyPhrases).filter { learning.state.savedPhrases.contains($0.id) && seen.insert($0.id).inserted }.map { SavedPhrase(lesson: summary.id, phrase: $0) }
                    }
                }
                items = saved
            }
    }
}
