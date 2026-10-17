# Artico for iPhone

Native SwiftUI companion to Artico web. iOS 17+, built with the current Xcode SDK. The website remains the publishing and content-editing source. No live AI service is used.

## Product decisions

- Keep Home, Learn, Progress, and the two lesson modes: Study and Practice.
- Preserve the paper background, blue actions, generous English phrases, smaller readable explanation text, illustrations, and continuous reading.
- Use native navigation, sheets, segmented controls, Dynamic Type, accessibility labels, and system tab bars. Glass belongs to navigation, not the reading surface.
- Bundle all 104 lessons, both explanation languages, existing art, and existing foundation recordings. Videos and external references still need a connection.
- Start as a guest in Japanese. Language, reading position, selected phrases, ratings, practice position, notes, and completion persist on this device.
- Cross-device sync, new Social Fluency recordings, pronunciation scoring, subscriptions, and a dedicated iPad layout are later work. Never show a functional audio control without an available recording.

## Architecture

`scripts/export-ios-content.mjs` reads the same compiled course files and practice-catalog logic as the web app. It emits a versioned offline bundle with stable phrase and section IDs. Do not hand-edit generated content under `Sources/ArticoCore/Resources/Content`.

- `ArticoCore`: content decoding, local repository, practice sessions, progress persistence; unit-testable without an iOS SDK.
- `ArticoUI`: shared SwiftUI components and app screens; native audio playback for existing recordings.
- `App/ArticoApp.swift`: iPhone app entry point.
- `Artico.xcodeproj`: app and UI-test targets, with a local Swift package dependency.
- `ArticoPreview`: a macOS development host for checking shared view compilation when an iPhone simulator is unavailable. It is not an iOS simulator and does not validate iOS-specific behavior.

## Build

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm run ios:content
cd ios
swift test
open Artico.xcodeproj
```

In Xcode, choose the **Artico** scheme and an iPhone simulator, then Run. For a physical iPhone, select your development team in Signing & Capabilities. No team or credentials are embedded in the project.

Command-line simulator build:

```sh
xcodebuild -project Artico.xcodeproj -scheme Artico \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /tmp/ArticoDerivedData CODE_SIGNING_ALLOWED=NO build
```

Content edits flow from the existing web sources through `pnpm run lessons` and `pnpm run ios:content`. The native renderer keeps explanations, conversation turns, vocabulary, tables, and examples separate. The practice catalog uses the web's canonical choices and ordered starters.

Keep command-line build products and test result bundles outside `ios/`. This directory is also a local Swift package; build output inside it can repeatedly trigger Xcode's package watcher. Xcode's normal, default Derived Data location is suitable.

## Validation priorities

1. Decode both languages for all lessons; verify stable navigation, phrase IDs, and local assets.
2. Exercise selection, finite practice sessions, ratings, completion, and persistence without network access.
3. Build the iPhone target; test language switching, full chapter reading, practice, next/previous lessons, and restored progress.
4. Inspect small-screen and accessibility text sizes, keyboard avoidance, VoiceOver, existing audio playback, interruptions, and reduced motion on actual iOS before release.
