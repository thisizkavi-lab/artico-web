import SwiftUI
import ArticoCore
#if os(iOS)
import UIKit
#else
import AppKit
#endif

enum ArticoTheme {
    static let blue = adaptive(0x285BCC, 0x8CAFFF)
    static let paper = adaptive(0xFBFAF7, 0x172020)
    static let surface = adaptive(0xFFFFFF, 0x223030)
    static let ink = adaptive(0x263B3B, 0xF0F3F0)
    static let muted = adaptive(0x657273, 0xB2C0BE)
    static let line = adaptive(0xE2E6E5, 0x3A4C4A)
    static let blueWash = adaptive(0xEAF0FC, 0x263B59)
    static let sage = adaptive(0xE7EEE5, 0x2D4138)
    static let yellow = adaptive(0xF2E8C9, 0x49422D)
    static let lilac = adaptive(0xEDE9F5, 0x3C354A)
    private static func adaptive(_ light: UInt, _ dark: UInt) -> Color {
        #if os(iOS)
        return Color(uiColor: UIColor { trait in
            let hex = trait.userInterfaceStyle == .dark ? dark : light
            return UIColor(red: Double((hex >> 16) & 255) / 255, green: Double((hex >> 8) & 255) / 255, blue: Double(hex & 255) / 255, alpha: 1)
        })
        #else
        return Color(nsColor: NSColor(name: nil) { appearance in
            let hex = appearance.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua ? dark : light
            return NSColor(red: Double((hex >> 16) & 255) / 255, green: Double((hex >> 8) & 255) / 255, blue: Double(hex & 255) / 255, alpha: 1)
        })
        #endif
    }
}

struct ArticoCard<Content: View>: View {
    var color: Color = ArticoTheme.surface
    @ViewBuilder var content: Content
    var body: some View {
        content.frame(maxWidth: .infinity, alignment: .leading).padding(20)
            .background(color, in: RoundedRectangle(cornerRadius: 20))
            .overlay(RoundedRectangle(cornerRadius: 20).strokeBorder(ArticoTheme.line, lineWidth: 0.7))
    }
}

struct PrimaryButton: ButtonStyle {
    @Environment(\.isEnabled) private var enabled
    func makeBody(configuration: Configuration) -> some View {
        configuration.label.font(.headline).frame(maxWidth: .infinity, minHeight: 26).padding(.vertical, 13).padding(.horizontal, 18)
            .foregroundStyle(enabled ? Color.white : ArticoTheme.muted)
            .background(enabled ? Color(red: 0.157, green: 0.357, blue: 0.8).opacity(configuration.isPressed ? 0.8 : 1) : ArticoTheme.line, in: RoundedRectangle(cornerRadius: 14))
            .contentShape(Rectangle())
    }
}

struct Kicker: View {
    let text: String
    var body: some View { Text(text).font(.caption.weight(.semibold)).tracking(1.2).foregroundStyle(ArticoTheme.muted).fixedSize(horizontal: false, vertical: true) }
}

struct RichText: View {
    let runs: [TextRun]
    var body: some View {
        Text(runs.reduce(AttributedString()) { result, run in
            var text = AttributedString(run.text)
            if run.emphasis == true { text.inlinePresentationIntent = .stronglyEmphasized }
            if run.italic == true { text.inlinePresentationIntent = .emphasized }
            if let href = run.href, href.hasPrefix("https://"), let url = URL(string: href) { text.link = url }
            return result + text
        }).fixedSize(horizontal: false, vertical: true)
    }
}

@MainActor private enum ArtworkCache {
    #if os(iOS)
    static let cache = NSCache<NSString, UIImage>()
    #else
    static let cache = NSCache<NSString, NSImage>()
    #endif
    static func image(_ name: String) -> Image? {
        cache.totalCostLimit = 32 * 1024 * 1024
        #if os(iOS)
        if let image = cache.object(forKey: name as NSString) { return Image(uiImage: image) }
        guard let url = CourseResources.image(name), let image = UIImage(contentsOfFile: url.path) else { return nil }
        cache.setObject(image, forKey: name as NSString, cost: Int(image.size.width * image.size.height * 4))
        return Image(uiImage: image)
        #else
        if let image = cache.object(forKey: name as NSString) { return Image(nsImage: image) }
        guard let url = CourseResources.image(name), let image = NSImage(contentsOf: url) else { return nil }
        cache.setObject(image, forKey: name as NSString, cost: Int(image.size.width * image.size.height * 4))
        return Image(nsImage: image)
        #endif
    }
}

struct CourseArtwork: View {
    let name: String
    var label: String = ""
    var body: some View {
        if let image = ArtworkCache.image(name) {
            image.resizable().scaledToFit().clipShape(RoundedRectangle(cornerRadius: 14))
                .accessibilityLabel(label).accessibilityHidden(label.isEmpty)
        }
    }
}

extension View {
    @ViewBuilder func inlineTitle() -> some View {
        #if os(iOS)
        navigationBarTitleDisplayMode(.inline)
        #else
        self
        #endif
    }
    func readingCanvas() -> some View { self.background(ArticoTheme.paper).foregroundStyle(ArticoTheme.ink) }
}
