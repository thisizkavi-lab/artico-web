export const LANGUAGE_KEY = 'artico.explanation-language.v1'
export const DEFAULT_LANGUAGE = 'ja'
export const languages = [
  { id: 'ja', label: '日本語' },
  { id: 'en', label: 'English' },
]
export const isLanguage = (value) => languages.some((language) => language.id === value)

export function readLanguage(storage) {
  try {
    const value = storage.getItem(LANGUAGE_KEY)
    return isLanguage(value) ? value : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function translate(messages, key, values = {}) {
  return (messages[key] ?? key ?? '').replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match)
}
