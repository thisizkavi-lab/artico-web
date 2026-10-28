// A GitHub Pages deployment replaces hashed JavaScript/CSS assets. A tab
// opened before deployment may still reference chunks that no longer exist.
// Only recover automatically for a recognisable module/CSS loading failure.
export function isStaleAssetFailure(error) {
  const message = String(error?.message ?? error ?? '')
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (?:CSS )?chunk [^\n]* failed|ChunkLoadError|Unable to preload CSS|Failed to load module script/i.test(message)
}
export function shouldRefreshStaleAssets(error, lastReload, now = Date.now()) {
  const previous = Number(lastReload)
  return isStaleAssetFailure(error) && (!Number.isFinite(previous) || previous <= 0 || now - previous > 60000)
}
