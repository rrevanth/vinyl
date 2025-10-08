import AsyncStorage from '@react-native-async-storage/async-storage'
import { container } from '../../di/Container'
import { TOKENS } from '../../di/tokens'
import type { StremioAddonRegistry } from './StremioAddonRegistry'
import type { StremioAddonStorage } from './storage/StremioAddonStorage'
import type { ILoggingService } from '../../../domain/services/ILoggingService'

/**
 * @deprecated This file is deprecated. Use StremioInitializationService instead.
 *
 * The initialization logic has been moved to:
 * - Service: src/infrastructure/services/StremioInitializationService.ts
 * - Hook: src/presentation/shared/hooks/useStremioInitialization.ts
 * - DI Registration: src/infrastructure/di/initializeContainer.ts
 *
 * This file is kept for backward compatibility but should not be imported.
 * It will be removed in a future version.
 */

/**
 * @deprecated Use StremioInitializationService.initialize() instead
 * Initialize Stremio addon system
 * This should be called once at app startup after DI container is initialized
 *
 * Performs:
 * 1. Cleanup legacy Legend State persistence data
 * 2. Cleanup invalid addons from storage
 * 3. Initialize StremioAddonRegistry for current user
 */
export async function initializeStremio(userId: string): Promise<void> {
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)

  try {
    logger.info('Initializing Stremio addon system', { userId })

    // 1. Clean up legacy Legend State persistence (from old implementation)
    try {
      await AsyncStorage.removeItem('stremioAddons')
      logger.debug('Removed legacy Legend State persistence data')
    } catch (error) {
      logger.warn('Failed to remove legacy persistence data', error as Error)
    }

    // 2. Clean up invalid addons (localhost URLs, invalid data, etc.)
    try {
      const addonStorage = container.resolve<StremioAddonStorage>(TOKENS.StremioAddonStorage)
      const removedCount = await addonStorage.cleanupInvalidAddons(userId)

      if (removedCount > 0) {
        logger.info(`Cleaned up ${removedCount} invalid addon(s)`, { userId })
      }
    } catch (error) {
      logger.warn('Failed to cleanup invalid addons', error as Error)
    }

    // 3. Initialize StremioAddonRegistry (loads user's installed addons and creates providers)
    try {
      const addonRegistry = container.resolve<StremioAddonRegistry>(TOKENS.StremioAddonRegistry)
      await addonRegistry.initialize(userId)

      logger.info('StremioAddonRegistry initialized successfully', { userId })
    } catch (error) {
      logger.error('Failed to initialize StremioAddonRegistry', error as Error, { userId })
      // Don't throw - app can still work without Stremio
    }

    logger.info('Stremio addon system initialized successfully', { userId })
  } catch (error) {
    logger.error('Failed to initialize Stremio addon system', error as Error, { userId })
    // Don't throw - app should continue even if Stremio init fails
  }
}

/**
 * @deprecated Use StremioInitializationService.shutdown() instead
 * Shutdown Stremio addon system
 * Call this when user logs out or app is shutting down
 */
export async function shutdownStremio(): Promise<void> {
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)

  try {
    const addonRegistry = container.resolve<StremioAddonRegistry>(TOKENS.StremioAddonRegistry)
    await addonRegistry.shutdown()

    logger.info('Stremio addon system shutdown successfully')
  } catch (error) {
    logger.error('Failed to shutdown Stremio addon system', error as Error)
  }
}
