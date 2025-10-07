import type { StremioUserPreferences } from '@/src/domain/preferences/StremioPreferences'
import { getDefaultStremioPreferences } from '@/src/domain/preferences/StremioPreferences'

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

// ============================================================================
// User Preferences
// ============================================================================

export interface ProviderPriorities {
  readonly metadata: readonly ('tmdb' | 'trakt' | 'stremio')[]
  readonly streams: readonly ('stremio' | 'torrent' | 'direct')[]
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
}

export interface UserPreferences {
  readonly version: number
  readonly updatedAt: number
  readonly accounts: {
    readonly trakt?: TraktAccount
    readonly tmdb?: TMDBAccount
    readonly stremio?: StremioAccount
  }
  readonly providerPriorities: ProviderPriorities
  readonly ui: UIPreferences
  readonly playback: PlaybackPreferences
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
})

export const createDefaultUserPreferences = (): UserPreferences => ({
  version: 1,
  updatedAt: Date.now(),
  accounts: {
    tmdb: createDefaultTMDBAccount(),
    stremio: getDefaultStremioPreferences(),
    // trakt is optional, only added when user authenticates
  },
  providerPriorities: createDefaultProviderPriorities(),
  ui: createDefaultUIPreferences(),
  playback: createDefaultPlaybackPreferences(),
})

export const updateUserPreferences = (
  current: UserPreferences,
  updates: Partial<UserPreferences>
): UserPreferences => ({
  ...current,
  ...updates,
  updatedAt: Date.now(),
})
