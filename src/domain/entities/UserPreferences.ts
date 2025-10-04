export interface TMDBConfig {
  readonly apiKey: string
  readonly baseURL: string
  readonly imageBaseURL: string
  readonly language: string
  readonly region: string
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

export interface TraktConfig {
  // API Configuration
  readonly clientId?: string
  readonly clientSecret?: string
  readonly redirectUri?: string
  readonly baseUrl?: string

  // Authentication (managed automatically)
  readonly accessToken?: string
  readonly refreshToken?: string
  readonly tokenExpiresAt?: string

  // Core Settings
  readonly language?: string
  readonly country?: string

  // Feature Settings
  readonly calendarSettings?: TraktCalendarSettings
  readonly contentSettings?: TraktContentSettings
  readonly advancedSettings?: TraktAdvancedSettings
}

export interface StremioConfig {
  readonly enabledAddons: readonly string[]
  readonly addonTimeout: number
  readonly maxConcurrentRequests: number
  readonly fallbackEnabled: boolean
}

export interface ProviderPriorities {
  readonly metadata: readonly ('tmdb' | 'trakt' | 'stremio')[]
  readonly streams: readonly ('stremio' | 'torrent' | 'direct')[]
}

export interface UIPreferences {
  readonly theme: 'light' | 'dark' | 'system'
  readonly language: string
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
  readonly tmdb: TMDBConfig
  readonly trakt: TraktConfig
  readonly stremio: StremioConfig
  readonly providerPriorities: ProviderPriorities
  readonly ui: UIPreferences
  readonly playback: PlaybackPreferences
}

export const createDefaultTMDBConfig = (): TMDBConfig => ({
  apiKey: '', // To be configured by user
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL: 'https://image.tmdb.org/t/p/',
  language: 'en-US',
  region: 'US',
})

export const createDefaultTraktConfig = (): TraktConfig => ({
  // API Configuration - will be filled from environment
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

export const createDefaultStremioConfig = (): StremioConfig => ({
  enabledAddons: [],
  addonTimeout: 10000, // 10 seconds
  maxConcurrentRequests: 5,
  fallbackEnabled: true,
})

export const createDefaultProviderPriorities = (): ProviderPriorities => ({
  metadata: ['tmdb', 'trakt', 'stremio'],
  streams: ['stremio', 'torrent', 'direct'],
})

export const createDefaultUIPreferences = (): UIPreferences => ({
  theme: 'system',
  language: 'en',
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
  tmdb: createDefaultTMDBConfig(),
  trakt: createDefaultTraktConfig(),
  stremio: createDefaultStremioConfig(),
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
