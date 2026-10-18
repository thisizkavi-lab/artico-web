import SwiftUI
import ArticoCore

struct StudySectionView: View {
    @Environment(LearningStore.self) private var learning
    let section: LessonSection
    let lesson: Lesson
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text(section.title).font(.title2.weight(.semibold)).fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader).accessibilityIdentifier("section-heading-\(section.id)")
            ForEach(section.blocks) { block in StudyBlockView(block: block, lesson: lesson) }
            if let widget = section.widget { LessonWidget(kind: widget) }
            if let string = section.videoURL, let url = URL(string: string) {
                Link(destination: url) { Label(section.videoTitle ?? learning.text("Watch the lesson", "動画を見る"), systemImage: "play.rectangle").font(.subheadline).frame(minHeight: 44) }
                Text(learning.text("Opens the original video. Internet connection required.", "元の動画を開きます。インターネット接続が必要です。")).font(.caption).foregroundStyle(ArticoTheme.muted)
            }
            if let string = section.linkURL, let url = URL(string: string) {
                Link(destination: url) { Label(section.linkTitle ?? learning.text("Open resource", "資料を開く"), systemImage: "arrow.up.right.square").font(.subheadline).frame(minHeight: 44) }
            }
        }.padding(.vertical, 8)
    }
}

struct StudyBlockView: View {
    @Environment(LearningStore.self) private var learning
    let block: ContentBlock
    let lesson: Lesson
    var examples = true
    private var phrases: [Phrase] { (block.phraseIds ?? []).compactMap { id in lesson.studyPhrases.first { $0.id == id } } }
    private var isPhraseTable: Bool {
        block.type == "table" && !phrases.isEmpty && block.phraseCells?.allSatisfy { row in row.contains { id in id.map { block.phraseIds?.contains($0) == true } ?? false } } == true
    }
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            switch block.type {
            case "illustration":
                if let art = block.art { CourseArtwork(name: art, label: block.caption ?? "").frame(maxHeight: 240) }
            case "conversation":
                ConversationView(block: block)
            case "vocabulary":
                ForEach(phrases) { phrase in PhraseStudyCard(phrase: phrase) }
            case "table":
                if isPhraseTable && examples {
                    ForEach(phrases) { phrase in PhraseStudyCard(phrase: phrase) }
                } else { TableCards(block: block) }
            case "twisterReference":
                TwisterReferenceView(id: block.id)
                if let details = block.blocks {
                    DisclosureGroup(learning.text("Meaning and pronunciation notes", "意味と発音のポイント")) {
                        VStack(alignment: .leading, spacing: 14) {
                            ForEach(details) { child in StudyBlockView(block: child, lesson: lesson, examples: false) }
                        }.padding(.top, 12)
                    }
                }
            default:
                if let paragraphs = block.paragraphs {
                    ArticoCard(color: block.type == "example" ? ArticoTheme.blueWash : ArticoTheme.surface) {
                        VStack(alignment: .leading, spacing: 14) {
                            if block.type == "email" { Kicker(text: learning.text("EXAMPLE EMAIL", "メールの例")) }
                            ForEach(Array(paragraphs.enumerated()), id: \.offset) { index, runs in
                                RichText(runs: runs).font(block.type == "example" && index == 0 ? .title3 : .body)
                            }
                        }
                    }
                } else if let items = block.items {
                    VStack(alignment: .leading, spacing: 14) {
                        ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                            HStack(alignment: .top, spacing: 10) {
                                Text(block.ordered == true ? "\(item.number ?? index + 1)." : "•").foregroundStyle(ArticoTheme.muted)
                                RichText(runs: item.runs).font(.body).lineSpacing(5)
                            }
                        }
                    }
                } else if let runs = block.runs {
                    RichText(runs: runs).font(block.type == "answerHeading" ? .headline : .body).lineSpacing(5).foregroundStyle(ArticoTheme.ink)
                }
                if examples { ForEach(phrases) { phrase in PhraseStudyCard(phrase: phrase) } }
            }
        }
    }
}

struct PhraseStudyCard: View {
    @Environment(LearningStore.self) private var learning
    let phrase: Phrase
    var body: some View {
        ArticoCard {
            VStack(alignment: .leading, spacing: 12) {
                if let art = phrase.art { CourseArtwork(name: art).frame(maxHeight: 180) }
                HStack(alignment: .top, spacing: 14) {
                    Text(phrase.en).font(.title3.weight(.medium)).fixedSize(horizontal: false, vertical: true)
                    Spacer(minLength: 0)
                    Button { learning.toggleSaved(phrase.id) } label: {
                        Image(systemName: learning.state.savedPhrases.contains(phrase.id) ? "bookmark.fill" : "bookmark").frame(width: 44, height: 44)
                    }.accessibilityLabel(learning.text("Save expression", "表現を保存"))
                        .accessibilityValue(learning.state.savedPhrases.contains(phrase.id) ? learning.text("Saved", "保存済み") : "")
                }
                if let context = phrase.context, !context.isEmpty { Text(context).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(4).fixedSize(horizontal: false, vertical: true) }
                AudioControls(source: phrase.audio, phrase: phrase.en, compact: true)
            }
        }.id(phrase.id)
    }
}

struct ConversationView: View {
    @Environment(LearningStore.self) private var learning
    let block: ContentBlock
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            if let art = block.art { CourseArtwork(name: art, label: block.caption ?? "").frame(maxHeight: 240) }
            ForEach(block.turns ?? []) { turn in
                HStack(alignment: .top, spacing: 12) {
                    if let portrait = turn.portrait { CourseArtwork(name: portrait).frame(width: 34, height: 34).clipShape(Circle()) }
                    VStack(alignment: .leading, spacing: 7) {
                        Text(turn.speaker).font(.caption.weight(.semibold)).foregroundStyle(ArticoTheme.muted)
                        Text(turn.en).font(.title3).fixedSize(horizontal: false, vertical: true)
                        if learning.language == .japanese, let ja = turn.ja, !ja.isEmpty {
                            Text(ja).font(.subheadline).foregroundStyle(ArticoTheme.muted).lineSpacing(3)
                        }
                    }.frame(maxWidth: .infinity, alignment: .leading).padding(16)
                        .background(turn.speaker == block.turns?.first?.speaker ? ArticoTheme.blueWash : ArticoTheme.surface, in: RoundedRectangle(cornerRadius: 17))
                }.id(turn.id)
            }
        }
    }
}

struct TableCards: View {
    let block: ContentBlock
    var body: some View {
        VStack(spacing: 12) {
            ForEach(Array((block.rows ?? []).enumerated()), id: \.offset) { _, row in
                ArticoCard {
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(Array(row.enumerated()), id: \.offset) { index, cell in
                            VStack(alignment: .leading, spacing: 5) {
                                if let header = block.header, header.indices.contains(index) {
                                    RichText(runs: header[index]).font(.caption.weight(.semibold)).foregroundStyle(ArticoTheme.muted)
                                }
                                RichText(runs: cell).font(index == 0 ? .headline : .subheadline).lineSpacing(4)
                            }
                        }
                    }
                }
            }
        }
    }
}
