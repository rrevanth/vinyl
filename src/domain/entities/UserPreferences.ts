import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { StremioUserPreferences } from '@/src/domain/preferences/StremioPreferences'
import { getDefaultStremioPreferences } from '@/src/domain/preferences/StremioPreferences'
import { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'

// ============================================================================
// Merged Account Interfaces (Auth + Settings)
// ============================================================================

/**
 * Merged Trakt account combining authentication tokens and settings
 */
export interface TraktAccount {
  // Authentication fields (required when authenticated)
  readonly username: string
  readonly userId: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number

  // API Configuration (optional)
  readonly clientId?: string
  readonly clientSecret?: string
  readonly redirectUri?: string
  readonly baseUrl?: string

  // Core Settings (optional)
  readonly language?: string
  readonly country?: string

  // Feature Settings (optional)
  readonly calendarSettings?: TraktCalendarSettings
  readonly contentSettings?: TraktContentSettings
  readonly advancedSettings?: TraktAdvancedSettings
}

export interface TraktCalendarSettings {
  readonly timeZone?: string
  readonly daysToShow?: number
  readonly showFinales?: boolean
  readonly showPremieres?: boolean
}

export interface TraktContentSettings {
  readonly includeAdult?: boolean
  readonly hideWatched?: boolean
  readonly autoMarkWatched?: boolean
}

export interface TraktAdvancedSettings {
  readonly autoScrobble?: boolean
  readonly extendedInfoDefault?: readonly ('images' | 'full' | 'metadata')[]
  readonly cacheTimeout?: number
}

/**
 * Merged TMDB account combining authentication and settings
 */
export interface TMDBAccount {
  // Authentication fields (optional, future-ready)
  readonly sessionId?: string
  readonly accountId?: string

  // Settings (required)
  readonly apiKey: string
  readonly baseURL: string
  readonly imageBaseURL: string
  readonly language: string
  readonly region: string
}

/**
 * Stremio account (references existing StremioUserPreferences)
 */
export type StremioAccount = StremioUserPreferences

/**
 * MDBList account (simple API key authentication)
 */
export interface MDBListAccount {
  readonly apiKey: string
  readonly baseURL?: string
}

/**
 * Fanart.tv account (API key authentication with optional client key)
 */
export interface FanartAccount {
  readonly apiKey: string
  readonly clientKey?: string
}

// ============================================================================
// User Preferences
// ============================================================================

/**
 * Preferences for individual catalogs
 */
export interface CatalogPreferences {
  readonly order: number          // Display order (1, 2, 3...)
  readonly customName?: string    // Optional user-defined name override
}

export interface ProviderPriorities {
  // Existing
  readonly metadata: readonly ('tmdb' | 'trakt' | 'stremio')[]
  readonly streams: readonly ('stremio' | 'torrent' | 'direct')[]

  // NEW - Media Enrichment Capabilities
  readonly external_ids: readonly string[]
  readonly videos: readonly string[]
  readonly people: readonly string[]
  readonly seasons: readonly string[]
  readonly ratings: readonly string[]
  readonly reviews: readonly string[]
  readonly images: readonly string[]
  readonly recommendations: readonly string[]
  readonly watch_progress: readonly string[]
}

/**
 * Provider settings - user control over which providers and capabilities are enabled
 */
export interface ProviderSettings {
  // Granular capability control per provider
  // providerId -> enabled capabilities for that provider
  readonly enabledCapabilitiesByProvider: Readonly<Record<string, readonly CapabilityType[]>>

  // Priority order for each domain capability
  readonly priorities: ProviderPriorities
}

export interface UIPreferences {
  readonly theme: 'light' | 'dark' | 'system'
  readonly locale: string
  readonly contentLanguage: string
  readonly autoplayTrailers: boolean
  readonly showAdultContent: boolean
  readonly gridViewMode: 'compact' | 'comfortable' | 'cozy'
}

export interface PlaybackPreferences {
  readonly autoplay: boolean
  readonly subtitleLanguage: string
  readonly subtitleSize: 'small' | 'medium' | 'large'
  readonly playbackQuality: 'auto' | '720p' | '1080p' | '4k'
  readonly skipIntroEnabled: boolean
  readonly preferredVideoPlayer: VideoPlayerType
}

export interface HomescreenPreferences {
  // Hero Section
  readonly heroEnabled: boolean
  readonly heroStyle: 'carousel' | 'featured' | 'stack'
  readonly heroAutoRotate: boolean
  readonly heroRotationInterval: number

  // Layout
  readonly itemsPerRow: number
  readonly showContinueWatching: boolean
  readonly compactMode: boolean
}

export interface UserPreferences {
  readonly version: number
  readonly updatedAt: number
  readonly accounts: {
    readonly trakt?: TraktAccount
    readonly tmdb?: TMDBAccount
    readonly stremio?: StremioAccount
    readonly mdblist?: MDBListAccount
    readonly fanart?: FanartAccount
  }
  readonly providers: ProviderSettings
  readonly ui: UIPreferences
  readonly playback: PlaybackPreferences
  readonly homescreen: HomescreenPreferences
  readonly catalogPreferences: Readonly<Record<string, CatalogPreferences>>
}

// ============================================================================
// Default Creators
// ============================================================================

export const createDefaultTMDBAccount = (): TMDBAccount => ({
  apiKey: '', // To be configured by user
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL: 'https://image.tmdb.org/t/p/',
  language: 'en-US',
  region: 'US',
})

export const createDefaultTraktAccount = (
  authData: {
    username: string
    userId: string
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
): TraktAccount => ({
  // Authentication (required)
  ...authData,

  // API Configuration
  clientId: '',
  clientSecret: '',
  redirectUri: '',
  baseUrl: 'https://api.trakt.tv',

  // Core Settings
  language: 'en-US',
  country: 'US',

  // Feature Settings
  calendarSettings: {
    daysToShow: 7,
    showFinales: true,
    showPremieres: true,
  },
  contentSettings: {
    includeAdult: false,
    hideWatched: false,
    autoMarkWatched: true,
  },
  advancedSettings: {
    autoScrobble: true,
    extendedInfoDefault: ['full'],
    cacheTimeout: 300, // 5 minutes
  },
})

export const createDefaultProviderPriorities = (): ProviderPriorities => ({
  metadata: ['tmdb', 'trakt', 'stremio'],
  streams: ['stremio', 'torrent', 'direct'],
  external_ids: ['tmdb', 'trakt', 'stremio'],
  videos: ['tmdb', 'trakt'],
  people: ['tmdb', 'trakt'],
  seasons: ['tmdb', 'trakt'],
  ratings: ['trakt', 'tmdb'],
  reviews: ['tmdb', 'trakt'],
  images: ['tmdb', 'trakt'],
  recommendations: ['tmdb', 'trakt'],
  watch_progress: ['trakt'],
})

export const createDefaultProviderSettings = (): ProviderSettings => ({
  enabledCapabilitiesByProvider: {
    // TMDB - Enable all common capabilities by default
    'tmdb': [
      CapabilityType.MEDIA_METADATA,
      CapabilityType.MEDIA_EXTERNAL_IDS,
      CapabilityType.MEDIA_IMAGES,
      CapabilityType.MEDIA_VIDEOS,
      CapabilityType.MEDIA_PEOPLE,
      CapabilityType.MEDIA_SEASONS,
      CapabilityType.MEDIA_RECOMMENDATIONS,
      CapabilityType.MEDIA_REVIEWS,
      CapabilityType.MEDIA_SEARCH,
      CapabilityType.MEDIA_CATALOG,
    ],
    // Trakt - Enable all common capabilities by default
    'trakt': [
      CapabilityType.MEDIA_METADATA,
      CapabilityType.MEDIA_EXTERNAL_IDS,
      CapabilityType.MEDIA_RATINGS,
      CapabilityType.MEDIA_WATCH_PROGRESS,
      CapabilityType.MEDIA_RECOMMENDATIONS,
      CapabilityType.MEDIA_SEARCH,
      CapabilityType.MEDIA_PEOPLE,
      CapabilityType.MEDIA_CONTINUE_WATCHING,
      CapabilityType.MEDIA_WATCHLIST,
      CapabilityType.MEDIA_CATALOG,
    ],
    // Stremio providers will be added dynamically when addons are installed
  },
  priorities: createDefaultProviderPriorities(),
})

export const createDefaultUIPreferences = (): UIPreferences => ({
  theme: 'system',
  locale: 'en',
  contentLanguage: 'en-US',
  autoplayTrailers: true,
  showAdultContent: false,
  gridViewMode: 'comfortable',
})

export const createDefaultPlaybackPreferences = (): PlaybackPreferences => ({
  autoplay: false,
  subtitleLanguage: 'en',
  subtitleSize: 'medium',
  playbackQuality: 'auto',
  skipIntroEnabled: true,
  preferredVideoPlayer: VideoPlayerType.RN_VLC,
})

export const createDefaultHomescreenPreferences = (): HomescreenPreferences => ({
  // Hero Section
  heroEnabled: true,
  heroStyle: 'carousel',
  heroAutoRotate: true,
  heroRotationInterval: 5000, // 5 seconds

  // Layout
  itemsPerRow: 3,
  showContinueWatching: true,
  compactMode: false,
})

export const createDefaultUserPreferences = (): UserPreferences => ({
  version: 1,
  updatedAt: Date.now(),
  accounts: {
    tmdb: createDefaultTMDBAccount(),
    stremio: getDefaultStremioPreferences(),
    // trakt is optional, only added when user authenticates
  },
  providers: createDefaultProviderSettings(),
  ui: createDefaultUIPreferences(),
  playback: createDefaultPlaybackPreferences(),
  homescreen: createDefaultHomescreenPreferences(),
  catalogPreferences: {},
})

export const updateUserPreferences = (
  current: UserPreferences,
  updates: Partial<UserPreferences>
): UserPreferences => ({
  ...current,
  ...updates,
  updatedAt: Date.now(),
})
