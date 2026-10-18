import SwiftUI
import ArticoCore

struct LessonWidget: View {
    let kind: String
    var body: some View {
        switch kind {
        case "alphabet": AlphabetBoard()
        case "twisters": TwisterCollection()
        case "family": FamilyDiagram()
        case "calendar": CalendarDiagram()
        case "sequence": IllustratedSequence(home: false)
        case "home": IllustratedSequence(home: true)
        case "presentation": PresentationDiagram()
        case "directions": DirectionsDiagram()
        case "body": BodyDiagram()
        default: EmptyView()
        }
    }
}

struct FamilyDiagram: View {
    @Environment(LearningStore.self) private var learning
    @State private var stepFamily = false
    var body: some View {
        ArticoCard(color: ArticoTheme.sage) {
            VStack(alignment: .leading, spacing: 18) {
                Text(learning.text("Follow the family connection.", "家族のつながりを見てみましょう。")) .font(.headline)
                branch("Rae + Kim", child: "Sam")
                branch(stepFamily ? learning.text("Lee + an earlier partner", "Lee + 以前のパートナー") : "Rae + Lee", child: stepFamily ? "Ava" : "Noah")
                Text(learning.text("Rae and Lee later married. Ava is Lee’s daughter from an earlier relationship.", "RaeとLeeは後に結婚しました。AvaはLeeと以前のパートナーの娘です。")) .font(.subheadline).foregroundStyle(ArticoTheme.muted)
                Picker(learning.text("Compare relationships", "関係を比べる"), selection: $stepFamily) {
                    Text("Half-brother").tag(false); Text("Stepsister").tag(true)
                }.pickerStyle(.segmented)
                Text(stepFamily ? "Ava is Sam’s stepsister." : "Noah is Sam’s half-brother.").font(.title3.weight(.medium))
                Text(stepFamily ? learning.text("Ava is the daughter of Sam’s stepparent, Lee.", "Avaは、Samの継親であるLeeの娘です。") : learning.text("Sam and Noah share one birth parent, Rae.", "SamとNoahには、Raeという共通の実親が一人います。")) .font(.subheadline)
            }
        }
    }
    private func branch(_ parents: String, child: String) -> some View {
        VStack(spacing: 6) {
            Text(learning.text("Birth parents", "実親")).font(.caption).foregroundStyle(ArticoTheme.muted)
            Text(parents).font(.headline).multilineTextAlignment(.center)
            Image(systemName: "arrow.down").foregroundStyle(ArticoTheme.muted)
            Text(child).font(.title3.weight(.semibold)).padding(.vertical, 8).padding(.horizontal, 22).background(ArticoTheme.surface, in: Capsule())
        }.frame(maxWidth: .infinity).padding(12)
    }
}

struct CalendarDiagram: View {
    @Environment(LearningStore.self) private var learning
    var body: some View {
        ArticoCard {
            VStack(alignment: .leading, spacing: 20) {
                Kicker(text: "APRIL 2027 · ART CLASS")
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 7), spacing: 10) {
                    ForEach(Array(["M", "T", "W", "T", "F", "S", "S"].enumerated()), id: \.offset) { _, day in Text(day).font(.caption).foregroundStyle(ArticoTheme.muted) }
                    ForEach(0..<33) { index in
                        Text(index < 3 ? "" : "\(index - 2)").font(.subheadline.monospacedDigit()).frame(maxWidth: .infinity, minHeight: 32)
                            .background(index == 9 ? ArticoTheme.blueWash : Color.clear, in: Circle())
                            .accessibilityLabel(index == 9 ? "April 7, art class" : (index < 3 ? "" : "April \(index - 2)"))
                    }
                }
                Text("April seventh, twenty twenty-seven.").font(.title3.weight(.medium))
                detail(learning.text("Start", "開始"), "6:15 p.m.", "Starts at 6:15 p.m.")
                detail(learning.text("Duration", "長さ"), "90 minutes", "An hour and a half.")
                detail(learning.text("Frequency", "頻度"), "Twice a week", "Two times each week.")
            }
        }
    }
    private func detail(_ title: String, _ value: String, _ note: String) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            Text(title).font(.caption).foregroundStyle(ArticoTheme.muted)
            Text(value).font(.headline)
            Text(note).font(.subheadline)
        }
    }
}

struct IllustratedSequence: View {
    @Environment(LearningStore.self) private var learning
    let home: Bool
    private var items: [(String, String, String)] {
        home ? [("bed", "Bedroom", "寝室"), ("kitchen", "Kitchen", "台所"), ("sofa", "Living room", "居間")] : [("knife", "Chop the vegetables.", "野菜を切ります。"), ("whisk", "Whisk the dressing.", "ドレッシングを混ぜます。"), ("plate", "Add the dressing.", "ドレッシングを加えます。")]
    }
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                ArticoCard {
                    VStack(alignment: .leading, spacing: 12) {
                        if !home { Kicker(text: "0\(index + 1)") }
                        CourseArtwork(name: "word-\(item.0).svg").frame(maxHeight: 160)
                        Text(item.1).font(.title3.weight(.medium))
                        if learning.language == .japanese { Text(item.2).font(.subheadline).foregroundStyle(ArticoTheme.muted) }
                    }
                }
            }
            if home { Text("It has a balcony, but no garage.").font(.title3) }
        }
    }
}

struct PresentationDiagram: View {
    @Environment(LearningStore.self) private var learning
    private let items = [("Purpose", "目的", "Organize shared documents."), ("Problem", "問題", "People open older versions."), ("Proposal", "提案", "Drafts / Approved + an owner."), ("Trial", "試行", "One project. One week."), ("Feedback", "意見", "What still causes confusion?")]
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                HStack(alignment: .top, spacing: 18) {
                    Text("\(index + 1)").font(.headline).frame(width: 36, height: 36).background(ArticoTheme.blueWash, in: Circle())
                    VStack(alignment: .leading, spacing: 6) {
                        Kicker(text: learning.text(item.0, item.1))
                        Text(item.2).font(.title3).fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        }
    }
}

private enum MapDestination: String, CaseIterable { case clinic = "Clinic", cafe = "Cafe", station = "Bus station" }
struct DirectionsDiagram: View {
    @Environment(LearningStore.self) private var learning
    @State private var destination = MapDestination.clinic
    @State private var expanded = false
    private var phrase: String {
        switch destination { case .clinic: return "Go straight. Go past Pine."; case .cafe: return "Turn right at Pine. Half a block."; case .station: return "Two blocks to Cedar. Then turn left." }
    }
    var body: some View {
        ArticoCard(color: ArticoTheme.sage) {
            VStack(alignment: .leading, spacing: 16) {
                Text(learning.text("Start at Main and Oak, facing north.", "MainとOakの交差点から、北を向いて出発します。")) .font(.subheadline)
                StreetMap(destination: destination).aspectRatio(1.5, contentMode: .fit)
                Button(learning.text("Enlarge map", "地図を拡大")) { expanded = true }.frame(minHeight: 44)
                Picker(learning.text("Destination", "目的地"), selection: $destination) { ForEach(MapDestination.allCases, id: \.self) { Text($0.rawValue).tag($0) } }.pickerStyle(.menu)
                Text(phrase).font(.title3.weight(.medium))
            }
        }.sheet(isPresented: $expanded) {
            MapDetail(destination: destination, phrase: phrase)
        }
    }
}

private struct StreetMap: View {
    let destination: MapDestination
    var body: some View {
        Canvas { context, size in
            let sx = size.width / 560, sy = size.height / 360
            func point(_ x: Double, _ y: Double) -> CGPoint { CGPoint(x: x * sx, y: y * sy) }
            var roads = Path()
            roads.move(to: point(300, 10)); roads.addLine(to: point(300, 335))
            for y in [80.0, 180.0, 280.0] { roads.move(to: point(15, y)); roads.addLine(to: point(545, y)) }
            context.stroke(roads, with: .color(ArticoTheme.surface), lineWidth: 27 * sx)
            func label(_ string: String, _ x: Double, _ y: Double, bold: Bool = false) {
                context.draw(Text(string).font(.system(size: (bold ? 20 : 17) * sx, weight: bold ? .semibold : .regular)).foregroundStyle(ArticoTheme.ink), at: point(x, y))
            }
            label("Cedar Street", 100, 110); label("Pine Street", 100, 210); label("Oak Street", 100, 310); label("Main", 350, 245)
            label("N ↑", 515, 30, bold: true)
            label("Bus station", 125, 44, bold: true); label("Clinic", 223, 142, bold: true); label("Cafe", 425, 143, bold: true)
            var route = Path(); route.move(to: point(300, 280))
            switch destination {
            case .clinic: route.addLine(to: point(300, 135))
            case .cafe: route.addLine(to: point(300, 180)); route.addLine(to: point(425, 180))
            case .station: route.addLine(to: point(300, 80)); route.addLine(to: point(125, 80))
            }
            context.stroke(route, with: .color(ArticoTheme.blue), style: StrokeStyle(lineWidth: 6 * sx, lineCap: .round, lineJoin: .round))
            context.fill(Path(ellipseIn: CGRect(x: 291 * sx, y: 271 * sy, width: 18 * sx, height: 18 * sy)), with: .color(ArticoTheme.ink))
            label("START", 378, 310, bold: true)
        }.accessibilityElement().accessibilityLabel("Map: Main Street runs north from Oak, crossing Pine and then Cedar. Clinic is past Pine. Cafe is to the right on Pine. Bus station is to the left on Cedar.")
    }
}
private struct MapDetail: View {
    @Environment(LearningStore.self) private var learning
    @Environment(\.dismiss) private var dismiss
    let destination: MapDestination
    let phrase: String
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 20) {
                Text(learning.text("Scroll sideways to explore.", "左右にスクロールして確認できます。"))
                ScrollView(.horizontal) { StreetMap(destination: destination).frame(width: 680, height: 438).background(ArticoTheme.sage) }
                Text(phrase).font(.title3)
            }.padding(20).navigationTitle(learning.text("Follow the route", "道順をたどる")).inlineTitle()
                .toolbar { ToolbarItem(placement: .confirmationAction) { Button(learning.text("Done", "完了")) { dismiss() } } }
        }
    }
}

struct BodyDiagram: View {
    @Environment(LearningStore.self) private var learning
    @State private var part = "shoulder"
    private let parts = ["shoulder", "arm", "knee", "ankle"]
    var body: some View {
        ArticoCard(color: ArticoTheme.yellow) {
            VStack(alignment: .leading, spacing: 18) {
                HStack(alignment: .center, spacing: 24) {
                    Image(systemName: "figure.stand").font(.system(size: 120)).foregroundStyle(ArticoTheme.ink).accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(parts, id: \.self) { name in
                            Button { part = name } label: { Text(name).font(.body.weight(part == name ? .bold : .regular)).frame(minHeight: 44).padding(.horizontal, 12).background(part == name ? ArticoTheme.surface : Color.clear, in: Capsule()) }
                                .accessibilityAddTraits(part == name ? .isSelected : [])
                        }
                    }
                }
                Text("My \(part) hurts.").font(.title3.weight(.medium))
                Text(learning.text("Name where you feel discomfort. These words describe a location, not a diagnosis.", "痛む場所を伝えます。部位の名前は診断ではありません。")) .font(.subheadline).foregroundStyle(ArticoTheme.muted)
            }
        }
    }
}
