import SwiftUI
import ArticoUI

@main struct ArticoPreviewApp: App {
    var body: some Scene {
        WindowGroup("Artico · native view preview") { ArticoRoot().frame(minWidth: 390, idealWidth: 430, minHeight: 760, idealHeight: 900) }
        .defaultSize(width: 430, height: 900)
    }
}
