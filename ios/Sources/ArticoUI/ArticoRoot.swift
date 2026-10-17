import SwiftUI
import ArticoCore

public struct ArticoRoot: View {
    @State private var learning: LearningStore
    @State private var audio = AudioController()
    @State private var manifest: CourseManifest?
    @State private var error = false
    public init() {
        #if DEBUG
        let arguments = ProcessInfo.processInfo.arguments
        if arguments.contains("--ui-testing") {
            let url = LearningStore.defaultURL.deletingLastPathComponent().appendingPathComponent("ui-test-progress.json")
            if arguments.contains("--reset-ui-testing") { try? FileManager.default.removeItem(at: url) }
            _learning = State(initialValue: LearningStore(fileURL: url))
        } else { _learning = State(initialValue: LearningStore()) }
        #else
        _learning = State(initialValue: LearningStore())
        #endif
    }
    public var body: some View {
        Group {
            if let manifest {
                TabView {
                    ArticoTab(page: .home, manifest: manifest)
                        .tabItem { Label(learning.text("Home", "ホーム"), systemImage: "house") }
                    ArticoTab(page: .learn, manifest: manifest)
                        .tabItem { Label(learning.text("Learn", "学ぶ"), systemImage: "book") }
                    ArticoTab(page: .progress, manifest: manifest)
                        .tabItem { Label(learning.text("Progress", "学習の記録"), systemImage: "chart.bar") }
                }
            } else if error {
                ContentUnavailableView(learning.text("The course could not be opened", "コースを開けませんでした"), systemImage: "book.closed", description: Text(learning.text("Please reopen Artico to try again.", "Articoを開き直して、もう一度お試しください。")))
            } else { ProgressView(learning.text("Opening your course…", "コースを開いています…")) }
        }
        .environment(learning).environment(audio).tint(ArticoTheme.blue).readingCanvas()
        .environment(\.locale, Locale(identifier: learning.language.rawValue))
        .task {
            #if DEBUG
            if ProcessInfo.processInfo.arguments.contains("--english") { learning.setLanguage(.english) }
            #endif
            do { manifest = try CourseResources.manifest() } catch { self.error = true }
        }
    }
}

enum AppPage { case home, learn, progress }
struct LessonRoute: Hashable { let id: String; var mode: LessonMode = .study; var section: String? }

struct ArticoTab: View {
    @Environment(LearningStore.self) private var learning
    let page: AppPage
    let manifest: CourseManifest
    @State private var path: [LessonRoute] = []
    @State private var settings: SettingsDestination?
    private var title: String {
        switch page { case .home: return "artico"; case .learn: return learning.text("Learn", "学ぶ"); case .progress: return learning.text("Progress", "学習の記録") }
    }
    var body: some View {
        NavigationStack(path: $path) {
            Group {
                switch page {
                case .home: HomeScreen(manifest: manifest)
                case .learn: CourseScreen(manifest: manifest)
                case .progress: ProgressScreen(manifest: manifest)
                }
            }
            .navigationTitle(title)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button { settings = .profile } label: { Image(systemName: "person.crop.circle").font(.title3).frame(minWidth: 44, minHeight: 44) }
                        .accessibilityLabel(learning.text("Profile and language", "プロフィールと言語")).accessibilityIdentifier("profile-button")
                }
            }
            .navigationDestination(for: LessonRoute.self) { route in
                LessonScreen(route: route, manifest: manifest) { id in
                    if path.isEmpty { path.append(LessonRoute(id: id)) } else { path[path.count - 1] = LessonRoute(id: id) }
                }.id(route.id)
            }
        }
        .sheet(item: $settings) { _ in SettingsScreen() }
    }
}

enum SettingsDestination: String, Identifiable { case profile; var id: String { rawValue } }

struct SettingsScreen: View {
    @Environment(LearningStore.self) private var learning
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Label(learning.text("Learning as a guest", "ゲストとして学習中"), systemImage: "person.crop.circle")
                    Text(learning.text("Your progress stays on this device. You can study without an account.", "アカウントなしで学習できます。学習内容はこの端末に保存されます。")).font(.subheadline).foregroundStyle(.secondary)
                }
                Section(learning.text("Explanation language", "解説の言語")) {
                    ForEach(ExplanationLanguage.allCases, id: \.self) { language in
                        Button { learning.setLanguage(language) } label: {
                            HStack { Text(language.title); Spacer(); if learning.language == language { Image(systemName: "checkmark") } }.frame(minHeight: 32)
                        }.accessibilityIdentifier("language-\(language.rawValue)")
                    }
                    Text(learning.text("Practice phrases always stay in English.", "練習する表現は、どちらの設定でも英語です。")).font(.footnote).foregroundStyle(.secondary)
                }
                Section(learning.text("Available offline", "オフラインで使える内容")) {
                    Label(learning.text("All 104 lessons and illustrations", "全104レッスンとイラスト"), systemImage: "book.closed")
                    Label(learning.text("Existing tongue-twister recordings", "収録済みの早口言葉の音声"), systemImage: "waveform")
                    Text(learning.text("Videos and external resources need an internet connection. Conversation recordings and device sync are coming later.", "動画や外部の資料にはインターネット接続が必要です。会話の音声と端末間の同期は、今後対応予定です。")).font(.footnote).foregroundStyle(.secondary)
                }
                if let error = learning.saveError { Section { Text(error).foregroundStyle(.red) } }
                if learning.recoveryNotice { Section { Text(learning.text("A previous progress file could not be read. A recovery copy was kept when possible.", "以前の学習データを読み込めませんでした。可能な場合は復旧用のコピーを保存しています。")) } }
            }
            .navigationTitle(learning.text("Your Artico", "あなたのArtico")).inlineTitle()
            .toolbar { ToolbarItem(placement: .confirmationAction) { Button(learning.text("Done", "完了")) { dismiss() } } }
        }
    }
}
