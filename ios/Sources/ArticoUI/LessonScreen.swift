import SwiftUI
import ArticoCore

struct LessonScreen: View {
    @Environment(LearningStore.self) private var learning
    @Environment(AudioController.self) private var audio
    let route: LessonRoute
    let manifest: CourseManifest
    let moveToLesson: (String) -> Void
    @State private var lesson: Lesson?
    @State private var loadError = false
    @State private var mode: LessonMode
    @State private var readingSection: String?
    @State private var contents: ContentsDestination?
    @State private var practiceActive = false

    init(route: LessonRoute, manifest: CourseManifest, moveToLesson: @escaping (String) -> Void) {
        self.route = route; self.manifest = manifest; self.moveToLesson = moveToLesson
        _mode = State(initialValue: route.mode)
    }
    var body: some View {
        Group {
            if let lesson {
                ScrollViewReader { proxy in
                    ScrollView {
                        LazyVStack(alignment: .leading, spacing: 28) {
                            if mode == .study || !practiceActive { lessonHeader(lesson).id("lesson-top") }
                            else { Color.clear.frame(height: 1).id("lesson-top") }
                            if mode == .study {
                                if lesson.stage == "orientation" { OrientationStartCard() }
                                ForEach(lesson.study) { section in
                                    StudySectionView(section: section, lesson: lesson).id(section.id)
                                }
                                ArticoCard(color: ArticoTheme.blueWash) {
                                    VStack(alignment: .leading, spacing: 12) {
                                        Text(learning.text("Give it a try.", "声に出して、試してみましょう。")) .font(.title2.weight(.semibold))
                                        Text(learning.text("Practice what you learned in this lesson.", "このレッスンで学んだことを練習します。")).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                                        Button(learning.text("Go to Practice", "練習へ進む")) { mode = .practice; proxy.scrollTo("lesson-top", anchor: .top) }.buttonStyle(PrimaryButton())
                                    }
                                }
                            } else if lesson.stage != "social", lesson.id != "lr" {
                                foundationGuidance(lesson)
                                FoundationPracticeView(lesson: lesson)
                            } else {
                                foundationGuidance(lesson)
                                PracticeScreen(lesson: lesson, goToSituations: { proxy.scrollTo("practice-situations", anchor: .top) }, viewStudy: { section in
                                    readingSection = section; mode = .study
                                }, showingSession: $practiceActive)
                            }
                            if mode == .study || !practiceActive || learning.session(for: lesson.id).completed {
                                LessonEndNavigation(lesson: lesson, manifest: manifest, moveToLesson: moveToLesson)
                            }
                        }.scrollTargetLayout().padding(20).frame(maxWidth: 680)
                    }
                    .scrollPosition(id: mode == .study ? $readingSection : .constant(nil), anchor: .top)
                    .safeAreaInset(edge: .top, spacing: 0) { modeBar(lesson) }
                    .safeAreaInset(edge: .bottom, spacing: 0) {
                        if mode == .practice && practiceActive && learning.session(for: lesson.id).isActive {
                            PracticeNavigationBar(lessonID: lesson.id)
                        }
                    }
                    .onChange(of: practiceActive) { _, _ in proxy.scrollTo("lesson-top", anchor: .top) }
                    .onChange(of: learning.session(for: lesson.id).index) { _, _ in
                        if mode == .practice { proxy.scrollTo("lesson-top", anchor: .top) }
                    }
                    .onChange(of: learning.session(for: lesson.id).completed) { _, _ in
                        if mode == .practice { proxy.scrollTo("lesson-top", anchor: .top) }
                    }
                    .onChange(of: mode) { _, newMode in
                        audio.stop(); learning.visit(lesson.id, mode: newMode)
                        if newMode == .practice { proxy.scrollTo("lesson-top", anchor: .top) }
                    }
                    .onChange(of: readingSection) { _, section in
                        if mode == .study, let section, lesson.study.contains(where: { $0.id == section }) { learning.setReadingSection(section, lesson: lesson.id) }
                    }
                    .sheet(item: $contents) { _ in
                        LessonContentsSheet(lesson: lesson) { section in readingSection = section }
                    }
                }
            } else if loadError {
                ContentUnavailableView(learning.text("Unable to open this lesson", "レッスンを開けませんでした"), systemImage: "book.closed")
            } else { ProgressView(learning.text("Opening lesson…", "レッスンを開いています…")) }
        }
        .readingCanvas().navigationTitle(route.id.count == 2 ? learning.text("Chapter \(route.id)", "第\(route.id)章") : learning.text("Learn", "学ぶ")).inlineTitle()
        .task(id: "\(route.id)-\(learning.language.rawValue)") {
            do {
                let id = route.id, language = learning.language
                let loaded = try await Task.detached(priority: .userInitiated) { try CourseResources.lesson(id, language: language) }.value
                guard !Task.isCancelled else { return }
                if lesson == nil, route.mode == .practice { practiceActive = learning.session(for: id).isActive }
                lesson = loaded; loadError = false
                learning.visit(id, mode: mode)
                let savedSection = route.section ?? readingSection ?? learning.state.readingSections[id]
                readingSection = loaded.study.contains(where: { $0.id == savedSection }) ? savedSection : nil
            } catch { loadError = true }
        }
        .onDisappear { audio.stop() }
    }

    @ViewBuilder private func foundationGuidance(_ lesson: Lesson) -> some View {
        if let guidance = lesson.practiceGuidance, !guidance.isEmpty {
            DisclosureGroup(learning.text("How to practice", "練習の進め方")) {
                VStack(alignment: .leading, spacing: 14) {
                    ForEach(guidance) { StudyBlockView(block: $0, lesson: lesson, examples: false) }
                }.padding(.top, 12)
            }
        }
    }

    private func lessonHeader(_ lesson: Lesson) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Kicker(text: stageTitle(lesson.stage, learning.language))
            Text(lesson.title).font(.system(.largeTitle, design: .serif)).fixedSize(horizontal: false, vertical: true).accessibilityIdentifier("lesson-title")
            Text(lesson.goal).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(4).fixedSize(horizontal: false, vertical: true)
        }.padding(.top, 8)
    }
    private func modeBar(_ lesson: Lesson) -> some View {
        HStack(spacing: 10) {
            Picker(learning.text("Lesson mode", "学習・練習の切り替え"), selection: $mode) {
                Text(learning.text("Study", "学習")).tag(LessonMode.study)
                Text(learning.text("Practice", "練習")).tag(LessonMode.practice)
            }.pickerStyle(.segmented).accessibilityIdentifier("lesson-mode")
            if mode == .study {
                Button { contents = .chapters } label: { Image(systemName: "list.bullet").frame(width: 44, height: 44) }
                    .accessibilityLabel(learning.text("Lesson contents", "レッスンの目次")).accessibilityIdentifier("lesson-contents")
            }
        }.padding(.horizontal, 20).padding(.vertical, 8).background(.regularMaterial)
    }
}

enum ContentsDestination: String, Identifiable { case chapters; var id: String { rawValue } }
struct LessonContentsSheet: View {
    @Environment(LearningStore.self) private var learning
    @Environment(\.dismiss) private var dismiss
    let lesson: Lesson
    let choose: (String) -> Void
    var body: some View {
        NavigationStack {
            List(Array(lesson.study.enumerated()), id: \.element.id) { index, section in
                Button { choose(section.id); dismiss() } label: {
                    HStack(alignment: .top, spacing: 16) {
                        Text(String(format: "%02d", index + 1)).font(.subheadline.monospacedDigit()).foregroundStyle(ArticoTheme.muted)
                        Text(section.title).foregroundStyle(ArticoTheme.ink)
                    }.padding(.vertical, 8)
                }
            }.navigationTitle(learning.text("In this lesson", "このレッスンの内容")).inlineTitle()
                .toolbar { ToolbarItem(placement: .confirmationAction) { Button(learning.text("Done", "完了")) { dismiss() } } }
        }.presentationDetents([.medium, .large]).presentationDragIndicator(.visible)
    }
}

struct LessonEndNavigation: View {
    @Environment(LearningStore.self) private var learning
    let lesson: Lesson
    let manifest: CourseManifest
    let moveToLesson: (String) -> Void
    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Divider().overlay(ArticoTheme.line)
            Button {
                learning.setCompleted(lesson.id, completed: !learning.state.completedLessons.contains(lesson.id))
            } label: {
                Label(learning.state.completedLessons.contains(lesson.id) ? learning.text("Marked complete", "完了にしました") : learning.text("Mark this lesson complete", "このレッスンを完了にする"), systemImage: learning.state.completedLessons.contains(lesson.id) ? "checkmark.circle.fill" : "checkmark.circle").frame(minHeight: 44)
            }.accessibilityIdentifier("mark-complete")
            if let next = manifest.adjacent(to: lesson.id, offset: 1) {
                Button { moveToLesson(next.id) } label: {
                    HStack { VStack(alignment: .leading, spacing: 4) { Text(learning.text("Next lesson", "次のレッスン")).font(.caption); Text(next.title).font(.headline) }; Spacer(); Image(systemName: "arrow.right") }
                }.buttonStyle(PrimaryButton()).accessibilityIdentifier("next-lesson")
            } else { Text(learning.text("You have reached the final chapter. Return to any lesson whenever you need it.", "最後の章まで来ました。必要なときに、いつでも好きなレッスンに戻れます。")).font(.subheadline) }
            if let previous = manifest.adjacent(to: lesson.id, offset: -1) {
                Button { moveToLesson(previous.id) } label: {
                    Label(learning.text("Previous: ", "前へ：") + previous.title, systemImage: "arrow.left").font(.subheadline).frame(minHeight: 44)
                }.accessibilityIdentifier("previous-lesson")
            }
            if let error = learning.saveError { Text(error).font(.footnote).foregroundStyle(.red) }
        }.padding(.vertical, 12)
    }
}

struct OrientationStartCard: View {
    @Environment(LearningStore.self) private var learning
    var body: some View {
        ArticoCard(color: ArticoTheme.blueWash) {
            VStack(alignment: .leading, spacing: 14) {
                Kicker(text: learning.text("A SIMPLE WAY TO BEGIN", "学び方はシンプル"))
                Text(learning.text("Understand it. Then say it.", "わかってから、声に出す。")) .font(.title2.weight(.semibold))
                Text("Good morning.").font(.title2.weight(.medium))
                Text(learning.text("A greeting when you meet someone in the morning. Say it aloud, then look away and try again.", "朝、人に会ったときのあいさつです。声に出してから、見ないでもう一度言ってみましょう。")).font(.subheadline).foregroundStyle(ArticoTheme.muted)
                NavigationLink(value: LessonRoute(id: "01")) { Label(learning.text("Try the first conversation", "最初の会話へ"), systemImage: "arrow.right") }.buttonStyle(PrimaryButton())
            }
        }
    }
}
