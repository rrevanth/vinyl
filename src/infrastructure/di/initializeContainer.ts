// Initialize and register all services
import { container } from './Container'
import { TOKENS } from './tokens'
import { StorageService } from '../services/StorageService'
import { LoggingService } from '../services/LoggingService'
import { UserService } from '../services/UserService'
import { EnvironmentService } from '../services/EnvironmentService'
import { HttpClient } from '../http/HttpClient'
import { QueryClient } from '@tanstack/react-query'
import { TMDBConfigFactory } from '../factories/TMDBConfigFactory'
import { TMDBClient } from '../api/tmdb/TMDBClient'
import { TMDBProvider } from '../providers/tmdb/TMDBProvider'
import { TraktConfigFactory } from '../factories/TraktConfigFactory'
import { TraktClient } from '../api/trakt/TraktClient'
import { TraktProvider } from '../providers/trakt/TraktProvider'
import { StremioConfigFactory } from '../factories/StremioConfigFactory'
import { StremioAddonStorage } from '../providers/stremio/storage/StremioAddonStorage'
import { StremioAddonRegistry } from '../providers/stremio/StremioAddonRegistry'
import { ProviderRegistry } from '../providers/ProviderRegistry'
import type { IStorageService } from '../../domain/services/IStorageService'
import type { ILoggingService } from '../../domain/services/ILoggingService'
import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import type { IProviderRegistry } from '../../domain/providers/IProviderRegistry'

export function initializeContainer(): void {
  // Register core services
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())
  container.register(TOKENS.EnvironmentService, () => new EnvironmentService())

  // Register services with dependencies
  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
  const environment = container.resolve<IEnvironmentService>(TOKENS.EnvironmentService)

  container.register(TOKENS.UserService, () => new UserService())

  // Register Stremio-specific HTTP Client (no baseURL for absolute URLs)
  container.register(
    TOKENS.StremioHttpClient,
    () =>
      new HttpClient(
        undefined, // No baseURL - allows absolute URLs to work correctly
        () => null, // Stremio addons don't use auth
        logger
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
  const traktProvider = container.resolve<TraktProvider>(TOKENS.TraktProvider)
  providerRegistry.registerProvider(traktProvider)

  // Register Stremio services
  container.register(TOKENS.StremioConfigFactory, () => new StremioConfigFactory())
  container.register(TOKENS.StremioAddonStorage, () => new StremioAddonStorage(storage))

  const stremioConfigFactory = container.resolve<StremioConfigFactory>(TOKENS.StremioConfigFactory)
  const stremioHttpClient = container.resolve<HttpClient>(TOKENS.StremioHttpClient)

  container.register(
    TOKENS.StremioAddonRegistry,
    () =>
      new StremioAddonRegistry(
        stremioConfigFactory,
        providerRegistry,
        stremioHttpClient,
        storage,
        queryClient,
        logger
      )
  )
}

// Auto-initialize on import (optional, can call manually in _layout.tsx)
initializeContainer()
