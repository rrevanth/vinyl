// Initialize and register all services
import { container } from './Container'
import { TOKENS } from './tokens'
import { StorageService } from '../services/StorageService'
import { LoggingService } from '../services/LoggingService'
import { ThemeService } from '../services/ThemeService'
import { I18nService } from '../services/I18nService'
import { UserService } from '../services/UserService'
import { EnvironmentService } from '../services/EnvironmentService'
import { HttpClient } from '../http/HttpClient'
import { TMDBConfigFactory } from '../factories/TMDBConfigFactory'
import { TMDBClient } from '../api/tmdb/TMDBClient'
import { TraktConfigFactory } from '../factories/TraktConfigFactory'
import { TraktClient } from '../api/trakt/TraktClient'
import { StremioConfigFactory } from '../factories/StremioConfigFactory'
import { StremioAddonStorage } from '../providers/stremio/storage/StremioAddonStorage'
import { StremioManifestCache } from '../providers/stremio/storage/StremioManifestCache'
import type { IStorageService } from '../../domain/services/IStorageService'
import type { ILoggingService } from '../../domain/services/ILoggingService'
import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'

export function initializeContainer(): void {
  // Register core services
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())
  container.register(TOKENS.EnvironmentService, () => new EnvironmentService())

  // Register services with dependencies
  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
  const environment = container.resolve<IEnvironmentService>(TOKENS.EnvironmentService)

  container.register(TOKENS.ThemeService, () => new ThemeService(storage))
  container.register(TOKENS.I18nService, () => new I18nService(storage))
  container.register(TOKENS.UserService, () => new UserService())

  // Register HTTP client (placeholder baseURL, update in your app)
  container.register(
    TOKENS.HttpClient,
    () =>
      new HttpClient(
        'https://api.example.com', // TODO: Update with actual API URL
        () => null, // TODO: Implement token retrieval
        logger
      )
  )

  const httpClient = container.resolve<HttpClient>(TOKENS.HttpClient)

  // Register TMDB services
  container.register(TOKENS.TMDBConfigFactory, () => new TMDBConfigFactory(environment))

  const tmdbConfigFactory = container.resolve<TMDBConfigFactory>(TOKENS.TMDBConfigFactory)
  container.register(TOKENS.TMDBClient, () => new TMDBClient(tmdbConfigFactory, logger))

  // Register Trakt services
  container.register(TOKENS.TraktConfigFactory, () => new TraktConfigFactory(environment))

  const traktConfigFactory = container.resolve<TraktConfigFactory>(TOKENS.TraktConfigFactory)
  container.register(TOKENS.TraktClient, () => new TraktClient(traktConfigFactory, logger))

  // Register Stremio services
  container.register(TOKENS.StremioConfigFactory, () => new StremioConfigFactory())
  container.register(TOKENS.StremioAddonStorage, () => new StremioAddonStorage(storage))
  container.register(
    TOKENS.StremioManifestCache,
    () => new StremioManifestCache(storage, httpClient)
  )

  // Note: StremioAddonRegistry requires IProviderRegistry which may not be available yet
  // Will need to be registered later in the initialization sequence when provider registry is available
}

// Auto-initialize on import (optional, can call manually in _layout.tsx)
initializeContainer()
