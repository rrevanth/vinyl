// Symbol tokens for all services
export const TOKENS = {
  // Core services
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  UserService: Symbol('UserService'),
  EnvironmentService: Symbol('EnvironmentService'),
  PreferencesService: Symbol('PreferencesService'),
  RequestQueueService: Symbol('RequestQueueService'),

  // Repositories
  UserPreferencesRepository: Symbol('UserPreferencesRepository'),
  CatalogRepository: Symbol('CatalogRepository'),
  MediaRepository: Symbol('MediaRepository'),

  // HTTP
  HttpClient: Symbol('HttpClient'),
  StremioHttpClient: Symbol('StremioHttpClient'),

  // Query Client
  QueryClient: Symbol('QueryClient'),
  QueryPersister: Symbol('QueryPersister'),

  // API Cache Services
  TMDBAPICache: Symbol('TMDBAPICache'),
  TraktAPICache: Symbol('TraktAPICache'),
  MDBListAPICache: Symbol('MDBListAPICache'),
  FanartAPICache: Symbol('FanartAPICache'),

  // TMDB Services
  TMDBConfigFactory: Symbol('TMDBConfigFactory'),
  TMDBClient: Symbol('TMDBClient'),
  TMDBProvider: Symbol('TMDBProvider'),

  // Trakt Services
  TraktConfigFactory: Symbol('TraktConfigFactory'),
  TraktClient: Symbol('TraktClient'),
  TraktProvider: Symbol('TraktProvider'),

  // MDBList Services
  MDBListConfigFactory: Symbol('MDBListConfigFactory'),
  MDBListClient: Symbol('MDBListClient'),
  MDBListProvider: Symbol('MDBListProvider'),

  // Fanart Services
  FanartConfigFactory: Symbol('FanartConfigFactory'),
  FanartClient: Symbol('FanartClient'),
  FanartProvider: Symbol('FanartProvider'),

  // Stremio Services
  StremioConfigFactory: Symbol('StremioConfigFactory'),
  StremioAddonStorage: Symbol('StremioAddonStorage'),
  StremioAddonRegistry: Symbol('StremioAddonRegistry'),
  StremioInitializationService: Symbol('StremioInitializationService'),

  // Provider Registry
  ProviderRegistry: Symbol('ProviderRegistry'),

  // Homescreen use cases
  GetHeroItemsUseCase: Symbol('GetHeroItemsUseCase'),
  GetHomescreenDataUseCase: Symbol('GetHomescreenDataUseCase'),
  GetAvailableCatalogsUseCase: Symbol('GetAvailableCatalogsUseCase'),
  LoadMoreCatalogItemsUseCase: Symbol('LoadMoreCatalogItemsUseCase'),
  ManageCatalogUseCase: Symbol('ManageCatalogUseCase'),
  UpdateHomescreenPreferencesUseCase: Symbol('UpdateHomescreenPreferencesUseCase'),
  UpdateCatalogPreferencesUseCase: Symbol('UpdateCatalogPreferencesUseCase'),
  RefreshHomescreenUseCase: Symbol('RefreshHomescreenUseCase'),

  // Media detail use cases
  ResolveExternalIdsUseCase: Symbol('ResolveExternalIdsUseCase'),
  EnrichMediaUseCase: Symbol('EnrichMediaUseCase'),
  GetWatchProgressUseCase: Symbol('GetWatchProgressUseCase'),
  GetMediaDetailUseCase: Symbol('GetMediaDetailUseCase'),
  GetMediaEnrichmentsUseCase: Symbol('GetMediaEnrichmentsUseCase'),
  GetMediaStreamsUseCase: Symbol('GetMediaStreamsUseCase'),
  LoadMoreRecommendationsUseCase: Symbol('LoadMoreRecommendationsUseCase'),

  // People detail use cases
  ResolvePersonExternalIdsUseCase: Symbol('ResolvePersonExternalIdsUseCase'),
  GetPersonDetailUseCase: Symbol('GetPersonDetailUseCase'),

  // Provider management use cases
  GetEnabledProvidersForCapabilityUseCase: Symbol('GetEnabledProvidersForCapabilityUseCase'),
  SaveProviderPrioritiesUseCase: Symbol('SaveProviderPrioritiesUseCase'),
  GetAllProvidersWithCapabilitiesUseCase: Symbol('GetAllProvidersWithCapabilitiesUseCase'),
  UpdateProviderCapabilitiesUseCase: Symbol('UpdateProviderCapabilitiesUseCase'),

  // Player use cases
  GetVideoPlayerUseCase: Symbol('GetVideoPlayerUseCase'),
  ScrobbleMediaUseCase: Symbol('ScrobbleMediaUseCase'),

  // Add more as needed
} as const
