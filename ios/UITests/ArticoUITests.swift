import XCTest

final class ArticoUITests: XCTestCase {
    private var app: XCUIApplication!
    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--ui-testing", "--reset-ui-testing", "--english"]
        app.launch()
        XCTAssertTrue(app.buttons["home-resume"].waitForExistence(timeout: 15))
    }
    private func screenshot(_ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name; attachment.lifetime = .keepAlways; add(attachment)
    }
    private func reveal(_ element: XCUIElement, limit: Int = 12) {
        for _ in 0..<limit {
            if element.exists && element.isHittable { return }
            app.swipeUp()
        }
        XCTAssertTrue(element.exists && element.isHittable, "Could not reach \(element)")
    }
    private func openLesson(_ id: String) {
        app.tabBars.buttons["Learn"].tap()
        let search = app.searchFields.firstMatch
        if !search.isHittable { app.swipeDown() }
        XCTAssertTrue(search.waitForExistence(timeout: 5))
        search.tap(); search.typeText(id)
        let row = app.buttons["lesson-\(id)"]
        XCTAssertTrue(row.waitForExistence(timeout: 5)); row.tap()
        XCTAssertTrue(app.staticTexts["lesson-title"].waitForExistence(timeout: 8))
    }
    func testJapaneseDefaultAndLanguagePersistence() {
        app.terminate()
        app.launchArguments = ["--ui-testing", "--reset-ui-testing"]
        app.launch()
        XCTAssertTrue(app.tabBars.buttons["ホーム"].waitForExistence(timeout: 10))
        screenshot("01-home-japanese")
        app.buttons["profile-button"].tap()
        app.buttons["language-en"].tap()
        app.buttons["Done"].tap()
        XCTAssertTrue(app.tabBars.buttons["Learn"].exists)
        screenshot("02-home-english")
        app.terminate(); app.launchArguments = ["--ui-testing"]; app.launch()
        XCTAssertTrue(app.tabBars.buttons["Learn"].waitForExistence(timeout: 10))
    }
    func testStudyPracticeSelectionAndSavedSession() {
        openLesson("01")
        screenshot("03-study-greetings")
        app.segmentedControls["lesson-mode"].buttons["Practice"].tap()
        let start = app.buttons["start-practice"]
        reveal(start); start.tap()
        XCTAssertTrue(app.staticTexts["practice-phrase"].waitForExistence(timeout: 5))
        screenshot("04-practice-phrase")
        let next = app.buttons["next-phrase"]
        reveal(next); next.tap()
        XCTAssertTrue(app.staticTexts["practice-position"].label.hasPrefix("2 /"))
        app.terminate(); app.launchArguments = ["--ui-testing"]; app.launch()
        app.buttons["home-resume"].tap()
        let resume = app.buttons["resume-practice"]
        reveal(resume); resume.tap()
        XCTAssertTrue(app.staticTexts["practice-position"].label.hasPrefix("2 /"))
        for _ in 0..<8 {
            if app.staticTexts["practice-complete"].exists { break }
            reveal(app.buttons["next-phrase"]); app.buttons["next-phrase"].tap()
        }
        XCTAssertTrue(app.staticTexts["practice-complete"].exists)
        screenshot("05-practice-complete")
    }
    func testCustomSelectionCannotStartEmpty() {
        openLesson("02")
        app.segmentedControls["lesson-mode"].buttons["Practice"].tap()
        let choose = app.buttons["choose-expressions"]; reveal(choose); choose.tap()
        app.buttons["Clear all"].tap()
        XCTAssertFalse(app.buttons["practice-selected"].isEnabled)
        app.buttons["Select shown"].tap()
        XCTAssertTrue(app.buttons["practice-selected"].isEnabled)
        screenshot("06-expression-selection")
        app.buttons["practice-selected"].tap()
        XCTAssertTrue(app.staticTexts["practice-phrase"].waitForExistence(timeout: 5))
    }
    func testOrientationNavigationAndRecordedPractice() {
        app.buttons["home-resume"].tap()
        app.segmentedControls["lesson-mode"].buttons["Practice"].tap()
        let next = app.buttons["next-lesson"]; reveal(next); next.tap()
        XCTAssertTrue(app.staticTexts["lesson-title"].waitForExistence(timeout: 5))
        XCTAssertEqual(app.staticTexts["lesson-title"].label, "How Artico works")
        XCTAssertTrue(app.segmentedControls["lesson-mode"].buttons["Study"].isSelected)
        // Return to the independent Learn tab; Home retains its own navigation stack.
        openLesson("tongue-intro")
        app.segmentedControls["lesson-mode"].buttons["Practice"].tap()
        let listen = app.buttons["listen-button"]; reveal(listen); listen.tap()
        XCTAssertTrue(listen.label == "Pause" || listen.label == "Listen")
        screenshot("07-tongue-twister")
    }
    func testFinalChapterHasPreviousButNoNext() {
        openLesson("96")
        app.segmentedControls["lesson-mode"].buttons["Practice"].tap()
        reveal(app.buttons["previous-lesson"], limit: 40)
        XCTAssertFalse(app.buttons["next-lesson"].exists)
        app.buttons["previous-lesson"].tap()
        XCTAssertTrue(app.staticTexts["lesson-title"].waitForExistence(timeout: 5))
        XCTAssertTrue(app.navigationBars["Chapter 95"].exists)
    }
}
