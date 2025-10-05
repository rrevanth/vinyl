import enTranslations from './locales/en.json'
import esTranslations from './locales/es.json'

export type SupportedLocale = 'en' | 'es'

interface Translations {
  navigation: {
    home: string
    search: string
    library: string
    settings: string
  }
  home: {
    title: string
    subtitle: string
    description: string
  }
  search: {
    title: string
    subtitle: string
  }
  library: {
    title: string
  }
  settings: {
    title: string
    appearance: {
      title: string
      theme: string
      theme_light: string
      theme_dark: string
      theme_system: string
    }
    display: {
      title: string
      app_language: string
      grid_view_mode: string
      grid_compact: string
      grid_comfortable: string
      grid_cozy: string
      autoplay_trailers: string
    }
    accounts: {
      title: string
      tmdb: {
        title: string
        description: string
        api_configuration: string
        api_configuration_footer: string
        api_key: string
        base_url: string
        image_base_url: string
        preferences: string
        preferences_footer: string
        language: string
        region: string
        test_connection: string
        testing_connection: string
        test_connection_description: string
        connection_success: string
        connection_success_message: string
        connection_failed: string
        connection_failed_message: string
        using_default_api_key: string
        using_custom_api_key: string
        using_default: string
        custom_api_key: string
        custom_base_url: string
        custom_image_base_url: string
        validate_and_save: string
        validating: string
        validation_success: string
        validation_error: string
        unsaved_changes: string
      }
      trakt: {
        title: string
        username: string
        user_id: string
        account_info: string
        connect_title: string
        connect_footer: string
        sign_in: string
        disconnect: string
        disconnect_description: string
        disconnect_confirm_title: string
        disconnect_confirm_message: string
        cancel: string
        disconnected: string
        disconnected_message: string
        disconnect_failed: string
        connection_failed: string
      }
    }
    about: {
      title: string
      version: string
      powered_by: string
      clear_cache: string
      cache_size: string
      attributions: string
    }
  }
}

const translations: Record<SupportedLocale, Translations> = {
  en: enTranslations as Translations,
  es: esTranslations as Translations,
}

export { translations }
export type { Translations }
