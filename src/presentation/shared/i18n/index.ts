import { computed } from '@legendapp/state'
import { appState$ } from '../stores/app.store'
import { translations, Translations, type SupportedLocale } from './translations'

// Computed current translations based on selected locale
export const currentTranslations$ = computed(() => {
  const locale = appState$.locale.get() as SupportedLocale
  return translations[locale]
})

// Convenience hook for accessing translations
export const useTranslations = (): Translations => {
  return currentTranslations$.get()
}

// Helper for getting specific translation keys
export const t = (key: string): string => {
  const trans = currentTranslations$.get()

  // Split the key by dots to access nested properties
  const keys = key.split('.')
  let result: any = trans

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k]
    } else {
      // Return the key itself if translation not found
      return key
    }
  }

  return typeof result === 'string' ? result : key
}

export { translations }
export const supportedLocales: SupportedLocale[] = ['en', 'es']
