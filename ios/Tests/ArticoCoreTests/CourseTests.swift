import XCTest
@testable import ArticoCore

final class CourseTests: XCTestCase {
    func testEveryLessonDecodesAndReferencesBundledResources() throws {
        let manifest = try CourseResources.manifest()
        XCTAssertEqual(manifest.lessons.count, 104)
        XCTAssertEqual(Set(manifest.lessons.map(\.id)).count, 104)
        for language in ExplanationLanguage.allCases {
            for summary in manifest.lessons {
                let lesson = try CourseResources.lesson(summary.id, language: language)
                XCTAssertFalse(lesson.study.isEmpty, summary.id)
                let ids = Set(lesson.phrases.map(\.id))
                XCTAssertEqual(ids.count, lesson.phrases.count, summary.id)
                XCTAssertTrue(Set(lesson.starterIds).isSubset(of: ids), summary.id)
                XCTAssertLessThanOrEqual(lesson.starterIds.count, 8)
                for phrase in lesson.phrases + lesson.studyPhrases {
                    if let art = phrase.art { XCTAssertNotNil(CourseResources.image(art), art) }
                }
                for block in lesson.study.flatMap(\.blocks) {
                    if let art = block.art { XCTAssertNotNil(CourseResources.image(art), art) }
                }
            }
        }
    }
    func testLanguagesKeepSpeakingTargetsAndStartersIdentical() throws {
        for summary in try CourseResources.manifest().lessons {
            let english = try CourseResources.lesson(summary.id, language: .english)
            let japanese = try CourseResources.lesson(summary.id, language: .japanese)
            XCTAssertEqual(english.phrases.map(\.id), japanese.phrases.map(\.id), summary.id)
            XCTAssertEqual(english.phrases.map(\.en), japanese.phrases.map(\.en), summary.id)
            XCTAssertEqual(english.starterIds, japanese.starterIds, summary.id)
        }
    }
    func testPathCrossesStageBoundariesAndStopsAtEnd() throws {
        let manifest = try CourseResources.manifest()
        XCTAssertNil(manifest.adjacent(to: "orientation", offset: -1))
        XCTAssertEqual(manifest.adjacent(to: "how-it-works", offset: 1)?.id, "letters")
        XCTAssertEqual(manifest.adjacent(to: "lr", offset: 1)?.id, "01")
        XCTAssertEqual(manifest.adjacent(to: "01", offset: -1)?.id, "lr")
        XCTAssertNil(manifest.adjacent(to: "96", offset: 1))
        XCTAssertEqual(manifest.adjacent(to: "95", offset: 1)?.id, "96")
    }
    func testExistingAudioAndAllAvailableChunksAreBundled() throws {
        let twisters = try CourseResources.twisters()
        XCTAssertEqual(twisters.count, 12)
        for item in twisters {
            XCTAssertNotNil(CourseResources.audio(item.audio))
            XCTAssertEqual(item.buildSteps.count, item.chunkAudio.count)
            for audio in item.chunkAudio.compactMap({ $0 }) { XCTAssertNotNil(CourseResources.audio(audio), audio) }
        }
    }
    func testFinitePracticePreservesOrderAndDoesNotChangeSelection() {
        var session = PracticeSession()
        session.selectedIDs = ["c"]
        session.start(["b", "a", "b", "missing"], validIDs: ["a", "b", "c"])
        XCTAssertEqual(session.queue, ["b", "a"])
        XCTAssertEqual(session.selectedIDs, ["c"])
        session.previous(); XCTAssertEqual(session.index, 0)
        session.next(); XCTAssertEqual(session.currentID, "a")
        session.next(); XCTAssertTrue(session.completed)
        XCTAssertEqual(session.currentID, "a")
        session.start(session.queue, validIDs: ["a", "b", "c"])
        XCTAssertFalse(session.completed); XCTAssertEqual(session.currentID, "b")
    }
    func testReconcileKeepsCurrentItemAndAnExplicitlyEmptySelection() {
        var session = PracticeSession()
        session.selectedIDs = []
        session.start(["old", "b", "c"], validIDs: ["old", "b", "c"])
        session.next()
        session.reconcile(validIDs: ["b", "c"])
        XCTAssertEqual(session.currentID, "b")
        XCTAssertEqual(session.selectedIDs, [])
    }
    @MainActor func testProgressRoundTripAndCorruptRecovery() throws {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: dir) }
        let url = dir.appendingPathComponent("progress.json")
        let store = LearningStore(fileURL: url)
        XCTAssertEqual(store.language, .japanese)
        store.setLanguage(.english); store.visit("01", mode: .practice)
        store.setNote("Morning", id: "01-q1"); store.toggleSaved("hello")
        store.setCompleted("01", completed: true)
        store.updateSession("01") { $0.selectedIDs = []; $0.start(["hi"], validIDs: ["hi"]); $0.ratings["hi"] = .familiar; $0.next() }
        let restored = LearningStore(fileURL: url)
        XCTAssertEqual(restored.language, .english)
        XCTAssertEqual(restored.state.lastMode, .practice)
        XCTAssertEqual(restored.state.notes["01-q1"], "Morning")
        XCTAssertTrue(restored.state.savedPhrases.contains("hello"))
        XCTAssertTrue(restored.session(for: "01").completed)
        XCTAssertEqual(restored.session(for: "01").selectedIDs, [])
        try Data("broken".utf8).write(to: url)
        let recovered = LearningStore(fileURL: url)
        XCTAssertTrue(recovered.recoveryNotice)
        XCTAssertTrue(try FileManager.default.contentsOfDirectory(atPath: dir.path).contains { $0.contains("recovery-") })
    }
}
