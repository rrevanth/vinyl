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
    loading: string
    refresh_label: string
    hero_label: string
    hero_card_accessibility: string
    missing_artwork: string
    continue_watching_title: string
    continue_watching_subtitle: string
    continue_watching_accessibility: string
    continue_watching_progress: string
    catalog_customize: string
    catalog_customize_accessibility: string
    catalog_load_error: string
    catalog_retry: string
    catalog_loading_more: string
    empty_state_title: string
    empty_state_subtitle: string
    no_catalogs_enabled_title: string
    no_catalogs_enabled_subtitle: string
    error_title: string
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
        oauth_in_progress: string
        retry_oauth: string
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
    providers: {
      title: string
      subtitle: string
      description: string
      management: string
      priorities: {
        title: string
        description: string
        drag_to_reorder: string
        save: string
        capability_external_ids: string
        capability_metadata: string
        capability_videos: string
        capability_people: string
        capability_seasons: string
        capability_ratings: string
        capability_reviews: string
        capability_images: string
        capability_recommendations: string
        capability_watch_progress: string
      }
      capabilities: {
        title: string
        description: string
        toggle_all: string
        save: string
        no_providers: string
      }
    }
    stremio: {
      title: string
      description: string
      browse_addons: string
      install_addon: string
      addon_details: string
      summary: {
        title: string
        installed: string
        active: string
        catalogs: string
        working: string
      }
      installed_addons: string
      installed_addons_footer: string
      no_addons_installed: string
      no_addons_installed_subtext: string
      actions: string
      install_by_url: string
      clear_cache: string
      clear_cache_confirm_title: string
      clear_cache_confirm_message: string
      clear_cache_success: string
      clear_cache_success_message: string
      clear_cache_failed: string
      clear_cache_failed_message: string
      toggle_failed: string
      toggle_failed_message: string
      configure_unavailable: string
      configure_unavailable_message: string
      configure_info_title: string
      configure_info_message: string
      configure_and_install_message: string
      configure_failed: string
      configure_failed_message: string
      uninstall_confirm_title: string
      uninstall_confirm_message: string
      uninstall_success: string
      uninstall_success_message: string
      uninstall_failed: string
      uninstall_failed_message: string
      cancel: string
      uninstall: string
      ok: string
      search_addons: string
      no_search_results: string
      no_addons_found: string
      browse_failed: string
      browse_failed_message: string
      filter_failed: string
      filter_failed_message: string
      install_success: string
      install_success_message: string
      install_failed: string
      install_failed_message: string
      manifest_url: string
      manifest_url_footer: string
      manifest_url_placeholder: string
      manifest_url_required: string
      validate_url: string
      validation_error: string
      validation_failed: string
      validation_failed_message: string
      invalid_manifest: string
      addon_preview: string
      capabilities: string
      supported_types: string
      id_prefixes: string
      catalogs: string
      configuration_required: string
      configuration_required_footer: string
      open_configuration: string
      addon_not_found: string
      go_back: string
      enabled: string
      disabled: string
      enable: string
      disable: string
      information: string
      description_label: string
      configuration: string
      configuration_footer: string
      refresh_addon: string
      uninstall_addon: string
      refresh_success: string
      refresh_success_message: string
      refresh_failed: string
      refresh_failed_message: string
      refresh_manifest: string
      provides_catalogs: string
      uninstall_quick: string
      catalog_source: string
      community_catalog: string
      content_type: string
      all_types: string
      movies: string
      series: string
      channels: string
      capability_filter: string
      available_addons: string
      available_catalogs: string
      select_catalog: string
      browsing_catalog: string
      no_catalog_sources: string
      no_catalog_sources_message: string
      pull_to_refresh: string
      loading_catalog: string
      streams_only: string
      all_capabilities: string
      filter_by_resource: string
      all_resources: string
      streams: string
      metadata: string
      subtitles: string
      loading_addons: string
      no_addons_match_filter: string
    }
    homescreen: {
      title: string
      subtitle: string
      hero_section_title: string
      hero_section_description: string
      hero_enabled_label: string
      hero_auto_rotate_label: string
      hero_auto_rotate_hint: string
      layout_section_title: string
      layout_section_description: string
      show_continue_watching_label: string
      compact_mode_label: string
      compact_mode_hint: string
      manage_catalogs_label: string
      manage_catalogs_description: string
    }
    catalogs: {
      title: string
      subtitle: string
      refresh_label: string
      loading: string
      error_title: string
      catalog_section_title: string
      catalog_section_description: string
      catalog_toggle_accessibility: string
      empty_state_title: string
      empty_state_subtitle: string
    }
  }
}

const translations: Record<SupportedLocale, Translations> = {
  en: enTranslations as Translations,
  es: esTranslations as Translations,
}

export { translations }
export type { Translations }

