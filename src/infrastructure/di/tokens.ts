// Symbol tokens for all services
export const TOKENS = {
  // Core services
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  UserService: Symbol('UserService'),
  EnvironmentService: Symbol('EnvironmentService'),

  // HTTP
  HttpClient: Symbol('HttpClient'),
  StremioHttpClient: Symbol('StremioHttpClient'),

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

  // Provider Registry
  ProviderRegistry: Symbol('ProviderRegistry'),

  // Use Cases
  TraktAccountUseCase: Symbol('TraktAccountUseCase'),
  TMDBAccountUseCase: Symbol('TMDBAccountUseCase'),
  StremioAddonsUseCase: Symbol('StremioAddonsUseCase'),
  StremioAddonCatalogUseCase: Symbol('StremioAddonCatalogUseCase'),
  SettingsUseCase: Symbol('SettingsUseCase'),

  // Add more as needed
} as const
