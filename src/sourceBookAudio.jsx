const basePath = () => (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/'

export const everydayAudioSrc = (file) => `${basePath()}audio/everyday/${encodeURIComponent(file)}`

export function SourceBookAudio({ file, label = '原書音声' }) {
  if (!file) return null
  return (
    <div className="source-book-audio">
      <span>{label}</span>
      <audio controls preload="none" src={everydayAudioSrc(file)} />
    </div>
  )
}
