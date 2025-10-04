export interface TMDBConfig {
  readonly apiKey: string
  readonly baseURL: string
  readonly imageBaseURL: string
  readonly language: string
  readonly region: string
}

export interface TraktConfig {
  readonly clientId: string
  readonly clientSecret: string
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
  clientId: '', // To be configured by user
  clientSecret: '', // To be configured by user
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
