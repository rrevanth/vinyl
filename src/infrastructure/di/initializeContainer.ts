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
import { GetMediaEnrichmentsUseCase } from '@/src/domain/use-cases/media/GetMediaEnrichmentsUseCase'
import { GetMediaStreamsUseCase } from '@/src/domain/use-cases/media/GetMediaStreamsUseCase'
import { GetWatchProgressUseCase } from '@/src/domain/use-cases/media/GetWatchProgressUseCase'
import { LoadMoreRecommendationsUseCase } from '@/src/domain/use-cases/media/LoadMoreRecommendationsUseCase'
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
import type { Persister, PersistedClient } from '@tanstack/react-query-persist-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Media } from '@/src/domain/entities/Media'
import { Catalog } from '@/src/domain/entities/Catalog'
import { Person } from '@/src/domain/entities/Person'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { IProviderRegistry } from '../../domain/providers/IProviderRegistry'
import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import type { ILoggingService } from '../../domain/services/ILoggingService'
import type { IPreferencesService } from '../../domain/services/IPreferencesService'
import type { IStorageService } from '../../domain/services/IStorageService'
import type { IUserService } from '../../domain/services/IUserService'
import { TMDBClient } from '../api/tmdb/TMDBClient'
import { TraktClient } from '../api/trakt/TraktClient'
import { MDBListClient } from '../api/mdblist/MDBListClient'
import { FanartClient } from '../api/fanart/FanartClient'
import { StremioConfigFactory } from '../factories/StremioConfigFactory'
import { TMDBConfigFactory } from '../factories/TMDBConfigFactory'
import { TraktConfigFactory } from '../factories/TraktConfigFactory'
import { MDBListConfigFactory } from '../factories/MDBListConfigFactory'
import { FanartConfigFactory } from '../factories/FanartConfigFactory'
import { HttpClient } from '../http/HttpClient'
import { ProviderRegistry } from '../providers/ProviderRegistry'
import { StremioAddonStorage } from '../providers/stremio/storage/StremioAddonStorage'
import { StremioAddonRegistry } from '../providers/stremio/StremioAddonRegistry'
import { TMDBProvider } from '../providers/tmdb/TMDBProvider'
import { TraktProvider } from '../providers/trakt/TraktProvider'
import { MDBListProvider } from '../providers/mdblist/MDBListProvider'
import { FanartProvider } from '../providers/fanart/FanartProvider'
import { CatalogRepository } from '../repositories/CatalogRepository'
import { MediaRepository } from '../repositories/MediaRepository'
import { UserPreferencesRepository } from '../repositories/UserPreferencesRepository'
import { EnvironmentService } from '../services/EnvironmentService'
import { LoggingService } from '../services/LoggingService'
import { PreferencesService } from '../services/PreferencesService'
import { StorageService } from '../services/StorageService'
import { StremioInitializationService } from '../services/StremioInitializationService'
import { UserService } from '../services/UserService'
import { RequestQueueService } from '../services/RequestQueueService'
import { TMDBAPICache } from '../cache/TMDBAPICache'
import { TraktAPICache } from '../cache/TraktAPICache'
import { MDBListAPICache } from '../cache/MDBListAPICache'
import { FanartAPICache } from '../cache/FanartAPICache'
import { container } from './Container'
import { TOKENS } from './tokens'

export async function initializeContainer(): Promise<void> {
  // Guard: Check if already initialized by checking if a core service exists
  if (container.has(TOKENS.StorageService)) {
    console.log('[INIT] Container already initialized, skipping duplicate initialization')
    return
  }

  console.log('[INIT] Starting container initialization...')

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

  // Register RequestQueueService (used by API clients for rate limiting)
  container.register(TOKENS.RequestQueueService, () => new RequestQueueService(logger))

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

  // Create AsyncStorage persister for TanStack Query cache persistence
  const CACHE_KEY = 'VNYL_QUERY_CACHE'

  const asyncStoragePersister: Persister = {
    persistClient: async (client: PersistedClient): Promise<void> => {
      try {
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(client))
      } catch (error) {
        console.error('[CACHE] Failed to persist cache to AsyncStorage', error)
      }
    },
    restoreClient: async (): Promise<PersistedClient | undefined> => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY)
        if (!cached) return undefined

        // Custom reviver to reconstruct entity class instances
        const parsed = JSON.parse(cached, (key, value) => {
          // Skip non-objects
          if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return value
          }

          // Detect and reconstruct ContinueWatchingItem objects FIRST
          // Pattern: has playbackId, progress, pausedAt, type, media
          if (
            'playbackId' in value &&
            'progress' in value &&
            'pausedAt' in value &&
            'type' in value &&
            'media' in value
          ) {
            try {
              // Manually reconstruct nested Media object
              const reconstructedMedia = value.media ? Media.fromJSON(value.media) : value.media

              return {
                ...value,
                media: reconstructedMedia,
                pausedAt: new Date(value.pausedAt), // Convert pausedAt back to Date
              } as ContinueWatchingItem
            } catch (error) {
              console.error('[CACHE] Failed to reconstruct ContinueWatchingItem from JSON', error)
              return value
            }
          }

          // Detect and reconstruct Catalog instances SECOND
          // Pattern: has id, providerId, type, category, name, items, sourceInfo, paginationInfo
          if (
            'id' in value &&
            'providerId' in value &&
            'type' in value &&
            'category' in value &&
            'name' in value &&
            'items' in value &&
            'sourceInfo' in value &&
            'paginationInfo' in value
          ) {
            try {
              return Catalog.fromJSON(value)
            } catch (error) {
              console.error('[CACHE] Failed to reconstruct Catalog from JSON', error)
              return value
            }
          }

          // Detect and reconstruct Person instances SECOND
          // Pattern: has stableId, externalIds, name, images (but NOT title - that's Media)
          if (
            'stableId' in value &&
            'externalIds' in value &&
            'name' in value &&
            'images' in value &&
            !('title' in value) // Distinguish from Media
          ) {
            try {
              return Person.fromJSON(value)
            } catch (error) {
              console.error('[CACHE] Failed to reconstruct Person from JSON', error)
              return value
            }
          }

          // Detect and reconstruct Media instances LAST
          // Pattern: has stableId, externalIds, type, title, images
          if (
            'stableId' in value &&
            'externalIds' in value &&
            'type' in value &&
            'title' in value &&
            'images' in value
          ) {
            try {
              return Media.fromJSON(value)
            } catch (error) {
              console.error('[CACHE] Failed to reconstruct Media from JSON', error)
              return value
            }
          }

          return value
        })

        return parsed as PersistedClient
      } catch (error) {
        console.error('[CACHE] Failed to restore cache from AsyncStorage', error)
        return undefined
      }
    },
    removeClient: async (): Promise<void> => {
      try {
        await AsyncStorage.removeItem(CACHE_KEY)
      } catch (error) {
        console.error('[CACHE] Failed to remove cache from AsyncStorage', error)
      }
    },
  }

  // Register QueryClient for TanStack Query with cache persistence
  container.register(
    TOKENS.QueryClient,
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours cache retention
          },
        },
      })
  )

  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)

  // Register the persister in the container for use in _layout.tsx
  container.register(TOKENS.QueryPersister, () => asyncStoragePersister)

  // Register TMDB services
  container.register(TOKENS.TMDBConfigFactory, () => new TMDBConfigFactory(environment))

  const tmdbConfigFactory = container.resolve<TMDBConfigFactory>(TOKENS.TMDBConfigFactory)
  const requestQueueService = container.resolve<RequestQueueService>(TOKENS.RequestQueueService)

  container.register(
    TOKENS.TMDBClient,
    () => new TMDBClient(tmdbConfigFactory, logger, requestQueueService)
  )

  // Register TMDB Provider with all its dependencies
  const tmdbClient = container.resolve<TMDBClient>(TOKENS.TMDBClient)
  container.register(TOKENS.TMDBProvider, () => new TMDBProvider(tmdbClient, queryClient, logger))

  // Register Trakt services
  container.register(TOKENS.TraktConfigFactory, () => new TraktConfigFactory(environment))

  const traktConfigFactory = container.resolve<TraktConfigFactory>(TOKENS.TraktConfigFactory)
  container.register(
    TOKENS.TraktClient,
    () => new TraktClient(traktConfigFactory, logger, requestQueueService)
  )

  // Register Trakt Provider with all its dependencies
  const traktClient = container.resolve<TraktClient>(TOKENS.TraktClient)
  container.register(TOKENS.TraktProvider, () => new TraktProvider(traktClient, queryClient, logger))

  // Register MDBList services
  container.register(TOKENS.MDBListConfigFactory, () => new MDBListConfigFactory(environment))

  const mdblistConfigFactory = container.resolve<MDBListConfigFactory>(TOKENS.MDBListConfigFactory)
  container.register(
    TOKENS.MDBListClient,
    () => new MDBListClient(mdblistConfigFactory, logger, requestQueueService)
  )

  // Register MDBList Provider with all its dependencies
  const mdblistClient = container.resolve<MDBListClient>(TOKENS.MDBListClient)
  container.register(TOKENS.MDBListProvider, () => new MDBListProvider(mdblistClient, logger))

  // Register Fanart services
  container.register(TOKENS.FanartConfigFactory, () => new FanartConfigFactory(environment))

  const fanartConfigFactory = container.resolve<FanartConfigFactory>(TOKENS.FanartConfigFactory)
  container.register(
    TOKENS.FanartClient,
    () => new FanartClient(fanartConfigFactory, logger, requestQueueService)
  )

  // Register Fanart Provider with all its dependencies
  const fanartClient = container.resolve<FanartClient>(TOKENS.FanartClient)
  container.register(TOKENS.FanartProvider, () => new FanartProvider(fanartClient, logger))

  // Register Provider Registry
  container.register(TOKENS.ProviderRegistry, () => new ProviderRegistry())

  const providerRegistry = container.resolve<IProviderRegistry>(TOKENS.ProviderRegistry)

  // Register TMDB provider with registry
  const tmdbProvider = container.resolve<TMDBProvider>(TOKENS.TMDBProvider)
  providerRegistry.registerProvider(tmdbProvider)

  // Register Trakt provider with registry
  const traktProvider = container.resolve<TraktProvider>(TOKENS.TraktProvider)
  providerRegistry.registerProvider(traktProvider)

  // Register MDBList provider with registry
  const mdblistProvider = container.resolve<MDBListProvider>(TOKENS.MDBListProvider)
  providerRegistry.registerProvider(mdblistProvider)

  // Register Fanart provider with registry
  const fanartProvider = container.resolve<FanartProvider>(TOKENS.FanartProvider)
  providerRegistry.registerProvider(fanartProvider)

  // Register API Cache wrappers (after all API clients are registered)
  container.register(
    TOKENS.TMDBAPICache,
    () =>
      new TMDBAPICache(
        queryClient,
        logger,
        container.resolve<TMDBClient>(TOKENS.TMDBClient)
      )
  )

  // Inject TMDBAPICache back into TMDBClient to enable cache-first pattern
  const tmdbAPICache = container.resolve<TMDBAPICache>(TOKENS.TMDBAPICache)
  tmdbClient.setCache(tmdbAPICache)

  container.register(
    TOKENS.TraktAPICache,
    () =>
      new TraktAPICache(
        queryClient,
        logger,
        container.resolve<TraktClient>(TOKENS.TraktClient)
      )
  )

  // Inject TraktAPICache back into TraktClient to enable cache-first pattern
  const traktAPICache = container.resolve<TraktAPICache>(TOKENS.TraktAPICache)
  traktClient.setCache(traktAPICache)

  container.register(
    TOKENS.MDBListAPICache,
    () =>
      new MDBListAPICache(
        queryClient,
        logger,
        container.resolve<MDBListClient>(TOKENS.MDBListClient)
      )
  )

  // Inject MDBListAPICache back into MDBListClient to enable cache-first pattern
  const mdblistAPICache = container.resolve<MDBListAPICache>(TOKENS.MDBListAPICache)
  mdblistClient.setCache(mdblistAPICache)

  container.register(
    TOKENS.FanartAPICache,
    () =>
      new FanartAPICache(
        queryClient,
        logger,
        container.resolve<FanartClient>(TOKENS.FanartClient)
      )
  )

  // Inject FanartAPICache back into FanartClient to enable cache-first pattern
  const fanartAPICache = container.resolve<FanartAPICache>(TOKENS.FanartAPICache)
  fanartClient.setCache(fanartAPICache)

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

  // GetMediaDetailUseCase orchestrates the three use cases above (DEPRECATED - use GetMediaEnrichmentsUseCase)
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

  // GetMediaEnrichmentsUseCase - NEW PATTERN: returns only enrichments, no Media entity
  container.register(TOKENS.GetMediaEnrichmentsUseCase, () => {
    const resolveExternalIdsUseCase = container.resolve<ResolveExternalIdsUseCase>(
      TOKENS.ResolveExternalIdsUseCase
    )
    const enrichMediaUseCase = container.resolve<EnrichMediaUseCase>(TOKENS.EnrichMediaUseCase)
    const getWatchProgressUseCase = container.resolve<GetWatchProgressUseCase>(
      TOKENS.GetWatchProgressUseCase
    )
    return new GetMediaEnrichmentsUseCase(
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

  // LoadMoreRecommendationsUseCase for recommendations pagination
  container.register(TOKENS.LoadMoreRecommendationsUseCase, () => {
    const getEnabledProvidersUseCase = container.resolve<GetEnabledProvidersForCapabilityUseCase>(
      TOKENS.GetEnabledProvidersForCapabilityUseCase
    )
    return new LoadMoreRecommendationsUseCase(logger, getEnabledProvidersUseCase)
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

  logger.info('Container initialization complete (before Stremio)', { userId: userService.getCurrentUser().id })

  // Initialize Stremio addon system in background (don't await - let UI become responsive)
  const currentUser = userService.getCurrentUser()
  const stremioInitService = container.resolve<StremioInitializationService>(
    TOKENS.StremioInitializationService
  )

  // Run Stremio initialization in background without blocking
  stremioInitService.initialize(currentUser.id)
    .then(() => {
      logger.info('Stremio initialization complete (background)', { userId: currentUser.id })
    })
    .catch((error) => {
      logger.error('Stremio initialization failed (background)', error as Error, { userId: currentUser.id })
    })
}
