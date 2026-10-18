import Foundation

public enum ExplanationLanguage: String, Codable, CaseIterable, Sendable {
    case japanese = "ja", english = "en"
    public var title: String { self == .japanese ? "日本語" : "English" }
    public func text(_ english: String, _ japanese: String) -> String { self == .japanese ? japanese : english }
}

public enum LessonMode: String, Codable, CaseIterable, Sendable { case study, practice }

public struct CourseManifest: Decodable, Sendable {
    public let schemaVersion: Int
    public let contentVersion: String
    public let lessons: [LessonSummary]
    public func adjacent(to id: String, offset: Int) -> LessonSummary? {
        guard let index = lessons.firstIndex(where: { $0.id == id }), lessons.indices.contains(index + offset) else { return nil }
        return lessons[index + offset]
    }
}

public struct LessonSummary: Decodable, Identifiable, Hashable, Sendable {
    public let id: String
    public let title: String
    public let titleJa: String
    public let goal: String
    public let goalJa: String
    public let stage: String
    public let group: String
    public let groupJa: String
    public let hero: String?
    public let ordinal: Int
    public func goal(in language: ExplanationLanguage) -> String { language.text(goal, goalJa) }
    public func group(in language: ExplanationLanguage) -> String { language.text(group, groupJa) }
}

public struct Lesson: Decodable, Identifiable, Sendable {
    public let id: String
    public let title: String
    public let goal: String
    public let language: String
    public let stage: String
    public let study: [LessonSection]
    public let practice: [LessonSection]
    public let practiceGuidance: [ContentBlock]?
    public let phrases: [Phrase]
    public let studyPhrases: [Phrase]
    public let starterIds: [String]
    public let hero: String?
    public var isSocial: Bool { stage == "social" }
    public func phrase(_ id: String) -> Phrase? { phrases.first { $0.id == id } ?? studyPhrases.first { $0.id == id } }
}

public struct TextRun: Decodable, Hashable, Sendable {
    public let text: String
    public let emphasis: Bool?
    public let italic: Bool?
    public let href: String?
}

public struct LessonSection: Decodable, Identifiable, Sendable {
    public let id: String
    public let title: String
    public let blocks: [ContentBlock]
    public let answers: [ContentBlock]?
    public let widget: String?
    public let linkURL: String?
    public let linkTitle: String?
    public let videoURL: String?
    public let videoTitle: String?
}

public struct ContentBlock: Decodable, Identifiable, Sendable {
    public let id: String
    public let type: String
    public let runs: [TextRun]?
    public let paragraphs: [[TextRun]]?
    public let items: [ContentItem]?
    public let ordered: Bool?
    public let header: [[TextRun]]?
    public let rows: [[[TextRun]]]?
    public let turns: [ConversationTurn]?
    public let art: String?
    public let caption: String?
    public let phraseIds: [String]?
    public let phraseCells: [[String?]]?
    public let blocks: [ContentBlock]?
}

public struct ContentItem: Decodable, Sendable {
    public let id: String?
    public let number: Int?
    public let runs: [TextRun]
    public let sample: [TextRun]?
}

public struct ConversationTurn: Decodable, Identifiable, Sendable {
    public let id: String
    public let speaker: String
    public let en: String
    public let ja: String?
    public let portrait: String?
}

public struct Phrase: Decodable, Identifiable, Sendable {
    public let id: String
    public let en: String
    public let context: String?
    public let ja: String?
    public let speaker: String?
    public let section: String
    public let studyId: String?
    public let kind: String?
    public let art: String?
    public let portrait: String?
    public let audio: String?
    public var studyAnchor: String { studyId ?? id }
}

public struct TongueTwister: Decodable, Identifiable, Sendable {
    public let id: String
    public let phrase: String
    public let target: String
    public let cue: String
    public let guidance: String
    public let transfer: [String]
    public let buildSteps: [String]
    public let audio: String
    public let chunkAudio: [String?]
}

public enum CourseResources {
    public static func file(_ name: String, folder: String = "") -> URL? {
        guard !name.contains(".."), !name.hasPrefix("/") else { return nil }
        return Bundle.module.url(forResource: name, withExtension: nil, subdirectory: "Content" + (folder.isEmpty ? "" : "/\(folder)"))
    }
    public static func manifest() throws -> CourseManifest { try decode("manifest.json") }
    public static func lesson(_ id: String, language: ExplanationLanguage) throws -> Lesson {
        try decode("\(id).json", folder: language.rawValue)
    }
    public static func twisters() throws -> [TongueTwister] { try decode("twisters.json") }
    public static func image(_ name: String) -> URL? { file(name.replacingOccurrences(of: ".svg", with: ".png"), folder: "art") }
    public static func audio(_ name: String) -> URL? { file(name, folder: "audio") }
    private static func decode<T: Decodable>(_ name: String, folder: String = "") throws -> T {
        guard let url = file(name, folder: folder) else { throw CocoaError(.fileNoSuchFile) }
        return try JSONDecoder().decode(T.self, from: Data(contentsOf: url))
    }
}
