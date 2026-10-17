// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Artico",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "ArticoCore", targets: ["ArticoCore"]),
        .library(name: "ArticoUI", targets: ["ArticoUI"]),
        .executable(name: "ArticoPreview", targets: ["ArticoPreview"])
    ],
    targets: [
        .target(name: "ArticoCore", resources: [.copy("Resources/Content")]),
        .target(name: "ArticoUI", dependencies: ["ArticoCore"]),
        .executableTarget(name: "ArticoPreview", dependencies: ["ArticoUI"]),
        .testTarget(name: "ArticoCoreTests", dependencies: ["ArticoCore"])
    ]
)
