import SwiftUI
import AVFoundation
import ArticoCore
#if os(iOS)
import MediaPlayer
#endif

@MainActor @Observable
final class AudioController: NSObject, AVAudioPlayerDelegate {
    private(set) var activeSource: String?
    private(set) var playing = false
    private(set) var error: String?
    var speed: Float = 1 { didSet { player?.rate = speed } }
    var repeatPhrase = false
    var responsePause: Double = 2
    @ObservationIgnored private var player: AVAudioPlayer?
    @ObservationIgnored private var replayTask: Task<Void, Never>?
    @ObservationIgnored private var speech = AVSpeechSynthesizer()
    @ObservationIgnored private var interruptionObserver: NSObjectProtocol?
    @ObservationIgnored private var routeObserver: NSObjectProtocol?

    override init() {
        super.init()
        #if os(iOS)
        interruptionObserver = NotificationCenter.default.addObserver(forName: AVAudioSession.interruptionNotification, object: nil, queue: .main) { [weak self] _ in Task { @MainActor in self?.pause() } }
        routeObserver = NotificationCenter.default.addObserver(forName: AVAudioSession.routeChangeNotification, object: nil, queue: .main) { [weak self] notification in
            if notification.userInfo?[AVAudioSessionRouteChangeReasonKey] as? UInt == AVAudioSession.RouteChangeReason.oldDeviceUnavailable.rawValue { Task { @MainActor in self?.pause() } }
        }
        MPRemoteCommandCenter.shared().pauseCommand.addTarget { [weak self] _ in Task { @MainActor in self?.pause() }; return .success }
        MPRemoteCommandCenter.shared().playCommand.addTarget { [weak self] _ in Task { @MainActor in self?.resume() }; return .success }
        #endif
    }
    deinit {
        if let interruptionObserver { NotificationCenter.default.removeObserver(interruptionObserver) }
        if let routeObserver { NotificationCenter.default.removeObserver(routeObserver) }
    }
    func play(_ source: String, title: String, restart: Bool = false) {
        if source == activeSource, !restart, player != nil { playing ? pause() : resume(); return }
        stop()
        guard let url = CourseResources.audio(source) else { error = "Recording unavailable"; return }
        do {
            #if os(iOS)
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio)
            try AVAudioSession.sharedInstance().setActive(true)
            #endif
            player = try AVAudioPlayer(contentsOf: url)
            player?.enableRate = true; player?.rate = speed; player?.delegate = self
            activeSource = source; error = nil
            playing = player?.play() ?? false
            #if os(iOS)
            MPNowPlayingInfoCenter.default().nowPlayingInfo = [MPMediaItemPropertyTitle: title, MPMediaItemPropertyArtist: "Artico", MPMediaItemPropertyPlaybackDuration: player?.duration ?? 0, MPNowPlayingInfoPropertyPlaybackRate: speed]
            #endif
        } catch { self.error = "Recording unavailable"; playing = false }
    }
    func pause() {
        replayTask?.cancel(); replayTask = nil; player?.pause(); speech.stopSpeaking(at: .immediate); playing = false
        #if os(iOS)
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyPlaybackRate] = 0
        #endif
    }
    func resume() {
        replayTask?.cancel(); replayTask = nil
        guard let player else { return }
        if player.currentTime >= player.duration { player.currentTime = 0 }
        playing = player.play()
        #if os(iOS)
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyPlaybackRate] = speed
        #endif
    }
    func stop() {
        pause(); player?.stop(); player = nil; activeSource = nil
        #if os(iOS)
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
        #endif
    }
    func speakLetter(_ letter: String) {
        stop()
        let utterance = AVSpeechUtterance(string: letter)
        #if os(iOS)
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio)
        try? AVAudioSession.sharedInstance().setActive(true)
        #endif
        utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
        utterance.rate = 0.42
        speech.speak(utterance)
    }
    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        Task { @MainActor [weak self] in
            guard let self, self.player === player else { return }
            self.playing = false
            guard self.repeatPhrase, flag else { return }
            self.replayTask = Task { @MainActor [weak self] in
                guard let self else { return }
                do { try await Task.sleep(for: .seconds(self.responsePause)) } catch { return }
                guard !Task.isCancelled else { return }
                self.player?.currentTime = 0; self.resume()
            }
        }
    }
}

struct AudioControls: View {
    @Environment(AudioController.self) private var audio
    @Environment(LearningStore.self) private var learning
    let source: String?
    let phrase: String
    var compact = false
    var body: some View {
        if let source, CourseResources.audio(source) != nil {
            HStack(spacing: 16) {
                Button { audio.play(source, title: phrase) } label: {
                    Label(learning.text(audio.playing && audio.activeSource == source ? "Pause" : "Listen", audio.playing && audio.activeSource == source ? "一時停止" : "聞く"), systemImage: audio.playing && audio.activeSource == source ? "pause.fill" : "play.fill")
                        .frame(minHeight: 44)
                }.buttonStyle(.borderedProminent).accessibilityIdentifier("listen-button")
                if !compact {
                    Button { audio.play(source, title: phrase, restart: true) } label: { Image(systemName: "arrow.counterclockwise").frame(width: 44, height: 44) }
                        .accessibilityLabel(learning.text("Replay", "もう一度聞く"))
                }
            }
            if audio.error != nil { Text(learning.text("This recording could not be played.", "この音声を再生できませんでした。")).font(.caption).foregroundStyle(ArticoTheme.muted) }
        } else if !compact {
            Label(learning.text("Recording coming soon. Try saying it aloud.", "音声は準備中です。声に出して練習できます。"), systemImage: "headphones")
                .font(.footnote).foregroundStyle(ArticoTheme.muted).fixedSize(horizontal: false, vertical: true)
        }
    }
}
