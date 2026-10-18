import Foundation
import Observation

public enum Familiarity: String, Codable, CaseIterable, Sendable { case needsWork, practicing, familiar }

public struct PracticeSession: Codable, Equatable, Sendable {
    public var selectedIDs: [String]?
    public private(set) var queue: [String] = []
    public private(set) var index = 0
    public private(set) var completed = false
    public var ratings: [String: Familiarity] = [:]
    public init() {}
    public var currentID: String? { queue.indices.contains(index) ? queue[index] : nil }
    public var isActive: Bool { !queue.isEmpty && !completed }
    public mutating func start(_ ids: [String], validIDs: Set<String>) {
        var seen = Set<String>()
        queue = ids.filter { validIDs.contains($0) && seen.insert($0).inserted }
        index = 0
        completed = false
    }
    public mutating func next() {
        guard !queue.isEmpty else { return }
        if index + 1 < queue.count { index += 1 } else { completed = true }
    }
    public mutating func previous() { index = max(0, index - 1); completed = false }
    public mutating func reconcile(validIDs: Set<String>) {
        let current = currentID
        queue = queue.filter { validIDs.contains($0) }
        index = current.flatMap { queue.firstIndex(of: $0) } ?? min(index, max(0, queue.count - 1))
        selectedIDs = selectedIDs.map { $0.filter { validIDs.contains($0) } }
        ratings = ratings.filter { validIDs.contains($0.key) }
        if queue.isEmpty { completed = false }
    }
}

public struct LearningState: Codable, Sendable {
    public var schemaVersion = 1
    public var language: ExplanationLanguage = .japanese
    public var lastLesson: String?
    public var lastMode: LessonMode = .study
    public var readingSections: [String: String] = [:]
    public var completedLessons: Set<String> = []
    public var visitedLessons: [String] = []
    public var savedPhrases: Set<String> = []
    public var sessions: [String: PracticeSession] = [:]
    public var notes: [String: String] = [:]
    public init() {}
}

@MainActor @Observable
public final class LearningStore {
    public private(set) var state: LearningState
    public private(set) var saveError: String?
    public private(set) var recoveryNotice = false
    @ObservationIgnored private let fileURL: URL
    @ObservationIgnored private var preservesUnreadableFile = false

    public init(fileURL: URL? = nil) {
        self.fileURL = fileURL ?? Self.defaultURL
        do {
            if FileManager.default.fileExists(atPath: self.fileURL.path) {
                let data = try Data(contentsOf: self.fileURL)
                state = try JSONDecoder().decode(LearningState.self, from: data)
                if state.schemaVersion != 1 { throw CocoaError(.fileReadUnknown) }
            } else { state = LearningState() }
        } catch {
            state = LearningState()
            recoveryNotice = true
            // Preserve the original for recovery; never silently overwrite it.
            let backup = self.fileURL.deletingPathExtension().appendingPathExtension("recovery-\(UUID().uuidString).json")
            do { try FileManager.default.copyItem(at: self.fileURL, to: backup) }
            catch { saveError = "Your previous progress could not be backed up."; preservesUnreadableFile = true }
        }
    }

    public static var defaultURL: URL {
        FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("Artico", isDirectory: true).appendingPathComponent("learning-v1.json")
    }
    public var language: ExplanationLanguage { state.language }
    public func text(_ english: String, _ japanese: String) -> String { state.language.text(english, japanese) }
    public func setLanguage(_ language: ExplanationLanguage) { mutate { $0.language = language } }
    public func visit(_ id: String, mode: LessonMode) {
        guard state.lastLesson != id || state.lastMode != mode else { return }
        mutate {
            $0.lastLesson = id; $0.lastMode = mode
            $0.visitedLessons.removeAll { $0 == id }; $0.visitedLessons.insert(id, at: 0)
        }
    }
    public func setReadingSection(_ section: String, lesson: String) {
        guard state.readingSections[lesson] != section else { return }
        mutate { $0.readingSections[lesson] = section }
    }
    public func session(for id: String) -> PracticeSession { state.sessions[id] ?? PracticeSession() }
    public func updateSession(_ id: String, _ change: (inout PracticeSession) -> Void) {
        mutate { state in var session = state.sessions[id] ?? PracticeSession(); change(&session); state.sessions[id] = session }
    }
    public func toggleSaved(_ id: String) { mutate { if $0.savedPhrases.contains(id) { $0.savedPhrases.remove(id) } else { $0.savedPhrases.insert(id) } } }
    public func setCompleted(_ id: String, completed: Bool) { mutate { if completed { $0.completedLessons.insert(id) } else { $0.completedLessons.remove(id) } } }
    public func setNote(_ text: String, id: String) { mutate { $0.notes[id] = String(text.prefix(2000)) } }
    private func mutate(_ change: (inout LearningState) -> Void) { change(&state); save() }
    public func save() {
        guard !preservesUnreadableFile else { return }
        do {
            try FileManager.default.createDirectory(at: fileURL.deletingLastPathComponent(), withIntermediateDirectories: true)
            let data = try JSONEncoder().encode(state)
            try data.write(to: fileURL, options: .atomic)
            saveError = nil
        } catch { saveError = text("Progress could not be saved. Your current session is still open.", "学習内容を保存できませんでした。現在のセッションは続けられます。") }
    }
}
