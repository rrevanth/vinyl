// Initialize and register all services
import { container } from './Container'
import { TOKENS } from './tokens'
import { StorageService } from '@/src/infrastructure/services/StorageService'
import { LoggingService } from '@/src/infrastructure/services/LoggingService'
import { ThemeService } from '@/src/infrastructure/services/ThemeService'
import { I18nService } from '@/src/infrastructure/services/I18nService'
import { HttpClient } from '@/src/infrastructure/http/HttpClient'
import type { IStorageService } from '@/src/domain/services/IStorageService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

export function initializeContainer(): void {
  // Register core services
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())

  // Register services with dependencies
  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  container.register(TOKENS.ThemeService, () => new ThemeService(storage))
  container.register(TOKENS.I18nService, () => new I18nService(storage))

  // Register HTTP client (placeholder baseURL, update in your app)
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
  container.register(
    TOKENS.HttpClient,
    () => new HttpClient(
      'https://api.example.com', // TODO: Update with actual API URL
      () => null, // TODO: Implement token retrieval
      logger
    )
  )
}

// Auto-initialize on import (optional, can call manually in _layout.tsx)
initializeContainer()