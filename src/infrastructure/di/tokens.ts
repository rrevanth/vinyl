// Symbol tokens for all services
export const TOKENS = {
  // Core services
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  UserService: Symbol('UserService'),
  EnvironmentService: Symbol('EnvironmentService'),

  // HTTP
  HttpClient: Symbol('HttpClient'),

  // Query Client
  QueryClient: Symbol('QueryClient'),

  // TMDB Services
  TMDBConfigFactory: Symbol('TMDBConfigFactory'),
  TMDBClient: Symbol('TMDBClient'),
  TMDBProvider: Symbol('TMDBProvider'),

  // Trakt Services
  TraktConfigFactory: Symbol('TraktConfigFactory'),
  TraktClient: Symbol('TraktClient'),

  // Stremio Services
  StremioConfigFactory: Symbol('StremioConfigFactory'),
  StremioAddonStorage: Symbol('StremioAddonStorage'),
  StremioAddonRegistry: Symbol('StremioAddonRegistry'),

  // Add more as needed
} as const
