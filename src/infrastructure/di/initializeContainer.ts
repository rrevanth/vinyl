// Initialize and register all services
import { GetAvailableCatalogsUseCase } from '@/src/domain/use-cases/homescreen/GetAvailableCatalogsUseCase'
import { GetHeroItemsUseCase } from '@/src/domain/use-cases/homescreen/GetHeroItemsUseCase'
import { GetHomescreenDataUseCase } from '@/src/domain/use-cases/homescreen/GetHomescreenDataUseCase'
import { LoadMoreCatalogItemsUseCase } from '@/src/domain/use-cases/homescreen/LoadMoreCatalogItemsUseCase'
import { ManageCatalogUseCase } from '@/src/domain/use-cases/homescreen/ManageCatalogUseCase'
import { RefreshHomescreenUseCase } from '@/src/domain/use-cases/homescreen/RefreshHomescreenUseCase'
import { UpdateCatalogPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateCatalogPreferencesUseCase'
import { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'
import { EnrichMediaUseCase } from '@/src/domain/use-cases/media/EnrichMediaUseCase'
import { GetMediaDetailUseCase } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { GetMediaStreamsUseCase } from '@/src/domain/use-cases/media/GetMediaStreamsUseCase'
import { GetWatchProgressUseCase } from '@/src/domain/use-cases/media/GetWatchProgressUseCase'
import { ResolveExternalIdsUseCase } from '@/src/domain/use-cases/media/ResolveExternalIdsUseCase'
import { GetVideoPlayerUseCase } from '@/src/domain/use-cases/player/GetVideoPlayerUseCase'
import { ScrobbleMediaUseCase } from '@/src/domain/use-cases/media/ScrobbleMediaUseCase'
import { GetPersonDetailUseCase } from '@/src/domain/use-cases/people/GetPersonDetailUseCase'
import { ResolvePersonExternalIdsUseCase } from '@/src/domain/use-cases/people/ResolvePersonExternalIdsUseCase'
import { GetAllProvidersWithCapabilitiesUseCase } from '@/src/domain/use-cases/providers/GetAllProvidersWithCapabilitiesUseCase'
import { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import { SaveProviderPrioritiesUseCase } from '@/src/domain/use-cases/providers/SaveProviderPrioritiesUseCase'
import { UpdateProviderCapabilitiesUseCase } from '@/src/domain/use-cases/providers/UpdateProviderCapabilitiesUseCase'
import { markStepComplete } from '@/src/presentation/shared/stores/initialization.store'
import { QueryClient } from '@tanstack/react-query'
import type { IProviderRegistry } from '../../domain/providers/IProviderRegistry'
import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import type { ILoggingService } from '../../domain/services/ILoggingService'
import type { IPreferencesService } from '../../domain/services/IPreferencesService'
import type { IStorageService } from '../../domain/services/IStorageService'
import type { IUserService } from '../../domain/services/IUserService'
import { TMDBClient } from '../api/tmdb/TMDBClient'
import { TraktClient } from '../api/trakt/TraktClient'
import { StremioConfigFactory } from '../factories/StremioConfigFactory'
import { TMDBConfigFactory } from '../factories/TMDBConfigFactory'
import { TraktConfigFactory } from '../factories/TraktConfigFactory'
import { HttpClient } from '../http/HttpClient'
import { ProviderRegistry } from '../providers/ProviderRegistry'
import { StremioAddonStorage } from '../providers/stremio/storage/StremioAddonStorage'
import { StremioAddonRegistry } from '../providers/stremio/StremioAddonRegistry'
import { TMDBProvider } from '../providers/tmdb/TMDBProvider'
import { TraktProvider } from '../providers/trakt/TraktProvider'
import { CatalogRepository } from '../repositories/CatalogRepository'
import { MediaRepository } from '../repositories/MediaRepository'
import { UserPreferencesRepository } from '../repositories/UserPreferencesRepository'
import { EnvironmentService } from '../services/EnvironmentService'
import { LoggingService } from '../services/LoggingService'
import { PreferencesService } from '../services/PreferencesService'
import { StorageService } from '../services/StorageService'
import { StremioInitializationService } from '../services/StremioInitializationService'
import { UserService } from '../services/UserService'
import { container } from './Container'
import { TOKENS } from './tokens'

export async function initializeContainer(): Promise<void> {
  // Register core services
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())
  container.register(TOKENS.EnvironmentService, () => new EnvironmentService())
  container.register(TOKENS.PreferencesService, () => new PreferencesService())

  // Register repositories
  container.register(TOKENS.UserPreferencesRepository, () => new UserPreferencesRepository())
  container.register(TOKENS.CatalogRepository, () => new CatalogRepository())
  container.register(TOKENS.MediaRepository, () => new MediaRepository())

  // Register services with dependencies
  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
  const environment = container.resolve<IEnvironmentService>(TOKENS.EnvironmentService)

  container.register(TOKENS.UserService, () => new UserService())
  const userService = container.resolve<IUserService>(TOKENS.UserService)

  // Initialize user FIRST to get userId for Stremio
  await userService.initializeUser()

  // Register Stremio-specific HTTP Client (no baseURL for absolute URLs)
  container.register(
    TOKENS.StremioHttpClient,
    () =>
      new HttpClient(
        undefined, // No baseURL - allows absolute URLs to work correctly
        () => null, // Stremio addons don't use auth
        logger,
        undefined, // No additional headers
        60000 // 60 second timeout for slow addons
      )
  )

  // Register QueryClient for TanStack Query
  container.register(
    TOKENS.QueryClient,
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2,
          },
        },
      })
  )

  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)

  // Register TMDB services
  container.register(TOKENS.TMDBConfigFactory, () => new TMDBConfigFactory(environment))

  const tmdbConfigFactory = container.resolve<TMDBConfigFactory>(TOKENS.TMDBConfigFactory)
  container.register(TOKENS.TMDBClient, () => new TMDBClient(tmdbConfigFactory, logger))

  // Register TMDB Provider with all its dependencies
  const tmdbClient = container.resolve<TMDBClient>(TOKENS.TMDBClient)
  container.register(TOKENS.TMDBProvider, () => new TMDBProvider(tmdbClient, queryClient, logger))

  // Register Trakt services
  container.register(TOKENS.TraktConfigFactory, () => new TraktConfigFactory(environment))

  const traktConfigFactory = container.resolve<TraktConfigFactory>(TOKENS.TraktConfigFactory)
  container.register(TOKENS.TraktClient, () => new TraktClient(traktConfigFactory, logger))

  // Register Trakt Provider with all its dependencies
  const traktClient = container.resolve<TraktClient>(TOKENS.TraktClient)
  container.register(TOKENS.TraktProvider, () => new TraktProvider(traktClient, queryClient, logger))

  // Register Provider Registry
  container.register(TOKENS.ProviderRegistry, () => new ProviderRegistry())

  const providerRegistry = container.resolve<IProviderRegistry>(TOKENS.ProviderRegistry)

  // Register TMDB provider with registry
  const tmdbProvider = container.resolve<TMDBProvider>(TOKENS.TMDBProvider)
  providerRegistry.registerProvider(tmdbProvider)

  // Register Trakt provider with registry
  // Temporarily disabled per user request
  // const traktProvider = container.resolve<TraktProvider>(TOKENS.TraktProvider)
  // providerRegistry.registerProvider(traktProvider)

  // Register Stremio services
  container.register(TOKENS.StremioConfigFactory, () => new StremioConfigFactory())

  const userPreferencesRepo = container.resolve<UserPreferencesRepository>(TOKENS.UserPreferencesRepository)
  container.register(TOKENS.StremioAddonStorage, () => new StremioAddonStorage(userPreferencesRepo, logger))

  const stremioConfigFactory = container.resolve<StremioConfigFactory>(TOKENS.StremioConfigFactory)
  const stremioHttpClient = container.resolve<HttpClient>(TOKENS.StremioHttpClient)
  const stremioAddonStorage = container.resolve<StremioAddonStorage>(TOKENS.StremioAddonStorage)

  container.register(
    TOKENS.StremioAddonRegistry,
    () =>
      new StremioAddonRegistry(
        stremioConfigFactory,
        providerRegistry,
        stremioHttpClient,
        stremioAddonStorage,
        storage,
        queryClient,
        logger
      )
  )

  // Register Stremio Initialization Service
  const stremioAddonRegistry = container.resolve<StremioAddonRegistry>(TOKENS.StremioAddonRegistry)
  container.register(
    TOKENS.StremioInitializationService,
    () => new StremioInitializationService(storage, logger, stremioAddonRegistry, stremioAddonStorage)
  )

  // Provider management use cases (register FIRST - other use cases depend on this)
  container.register(
    TOKENS.GetEnabledProvidersForCapabilityUseCase,
    () => new GetEnabledProvidersForCapabilityUseCase(providerRegistry, userService, logger)
  )

  container.register(
    TOKENS.SaveProviderPrioritiesUseCase,
    () => new SaveProviderPrioritiesUseCase(userService, logger)
  )

  container.register(
    TOKENS.GetAllProvidersWithCapabilitiesUseCase,
    () => new GetAllProvidersWithCapabilitiesUseCase(providerRegistry, userService, logger)
  )

  container.register(
    TOKENS.UpdateProviderCapabilitiesUseCase,
    () => new UpdateProviderCapabilitiesUseCase(userService, providerRegistry, logger)
  )

  // Homescreen use cases (depend on GetEnabledProvidersForCapabilityUseCase)
  container.register(TOKENS.GetHeroItemsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetHeroItemsUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.GetHomescreenDataUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetHomescreenDataUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.GetAvailableCatalogsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetAvailableCatalogsUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.LoadMoreCatalogItemsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new LoadMoreCatalogItemsUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.ManageCatalogUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new ManageCatalogUseCase(userService, providerRegistry, logger, getEnabledProvidersUseCase)
  })

  container.register(
    TOKENS.UpdateHomescreenPreferencesUseCase,
    () => new UpdateHomescreenPreferencesUseCase(userService, logger)
  )

  container.register(
    TOKENS.UpdateCatalogPreferencesUseCase,
    () => new UpdateCatalogPreferencesUseCase(userService, logger)
  )

  container.register(TOKENS.RefreshHomescreenUseCase, () => {
    const getHomescreenDataUseCase = container.resolve<GetHomescreenDataUseCase>(
      TOKENS.GetHomescreenDataUseCase
    )
    return new RefreshHomescreenUseCase(getHomescreenDataUseCase, userService, logger)
  })

  // Media detail use cases (depend on GetEnabledProvidersForCapabilityUseCase)
  container.register(TOKENS.ResolveExternalIdsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new ResolveExternalIdsUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.EnrichMediaUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new EnrichMediaUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.GetWatchProgressUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetWatchProgressUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  // GetMediaDetailUseCase orchestrates the three use cases above
  container.register(TOKENS.GetMediaDetailUseCase, () => {
    const resolveExternalIdsUseCase = container.resolve<ResolveExternalIdsUseCase>(
      TOKENS.ResolveExternalIdsUseCase
    )
    const enrichMediaUseCase = container.resolve<EnrichMediaUseCase>(TOKENS.EnrichMediaUseCase)
    const getWatchProgressUseCase = container.resolve<GetWatchProgressUseCase>(
      TOKENS.GetWatchProgressUseCase
    )
    return new GetMediaDetailUseCase(
      resolveExternalIdsUseCase,
      enrichMediaUseCase,
      getWatchProgressUseCase,
      logger
    )
  })

  // GetMediaStreamsUseCase aggregates streams from all enabled providers
  container.register(TOKENS.GetMediaStreamsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetMediaStreamsUseCase(getEnabledProvidersUseCase, logger)
  })

  // People detail use cases
  container.register(TOKENS.ResolvePersonExternalIdsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new ResolvePersonExternalIdsUseCase(providerRegistry, userService, logger, getEnabledProvidersUseCase)
  })

  container.register(TOKENS.GetPersonDetailUseCase, () => {
    const resolvePersonExternalIdsUseCase = container.resolve<ResolvePersonExternalIdsUseCase>(
      TOKENS.ResolvePersonExternalIdsUseCase
    )
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new GetPersonDetailUseCase(resolvePersonExternalIdsUseCase, getEnabledProvidersUseCase, logger)
  })

  // Player use cases
  container.register(TOKENS.GetVideoPlayerUseCase, () => {
    const preferencesService = container.resolve<IPreferencesService>(TOKENS.PreferencesService)
    return new GetVideoPlayerUseCase(preferencesService, logger)
  })

  container.register(TOKENS.ScrobbleMediaUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new ScrobbleMediaUseCase(getEnabledProvidersUseCase, logger)
  })

  // Mark container and providers initialization complete
  markStepComplete('container', 'DI container ready')
  markStepComplete('providers', 'Providers registered')

  // Initialize Stremio addon system asynchronously
  const currentUser = userService.getCurrentUser()
  const stremioInitService = container.resolve<StremioInitializationService>(
    TOKENS.StremioInitializationService
  )
  await stremioInitService.initialize(currentUser.id)

  logger.info('Container initialization complete', { userId: currentUser.id })
}
