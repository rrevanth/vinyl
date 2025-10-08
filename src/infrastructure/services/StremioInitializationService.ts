import AsyncStorage from '@react-native-async-storage/async-storage'
import type { IStorageService } from '@/src/domain/services/IStorageService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddonRegistry } from '@/src/infrastructure/providers/stremio/StremioAddonRegistry'
import type { StremioAddonStorage } from '@/src/infrastructure/providers/stremio/storage/StremioAddonStorage'
import { markStepComplete } from '@/src/presentation/shared/stores/initialization.store'

/**
 * Service to manage Stremio system initialization lifecycle
 *
 * Handles:
 * - One-time initialization per user session
 * - Cleanup of legacy data
 * - Addon registry initialization
 * - Proper error handling and recovery
 */
export class StremioInitializationService {
  private initializedUsers = new Set<string>()
  private initializationPromises = new Map<string, Promise<void>>()

  constructor(
    private storage: IStorageService,
    private logger: ILoggingService,
    private addonRegistry: StremioAddonRegistry,
    private addonStorage: StremioAddonStorage
  ) {}

  /**
   * Initialize Stremio system for a user
   * Ensures initialization happens only once per user session
   * Multiple calls for same user will wait for the same initialization promise
   */
  async initialize(userId: string): Promise<void> {
    // If already initialized for this user, return immediately
    if (this.initializedUsers.has(userId)) {
      this.logger.debug('Stremio already initialized for user', { userId })
      return
    }

    // If initialization is in progress, wait for it
    const existingPromise = this.initializationPromises.get(userId)
    if (existingPromise) {
      this.logger.debug('Waiting for existing initialization', { userId })
      return existingPromise
    }

    // Start new initialization
    const initPromise = this.performInitialization(userId)
    this.initializationPromises.set(userId, initPromise)

    try {
      await initPromise
      this.initializedUsers.add(userId)
    } finally {
      this.initializationPromises.delete(userId)
    }
  }

  private async performInitialization(userId: string): Promise<void> {
    this.logger.info('Initializing Stremio addon system', { userId })

    try {
      // 1. Clean up legacy Legend State persistence (from old implementation)
      await this.cleanupLegacyData()

      // 2. Clean up invalid addons (localhost URLs, invalid data, etc.)
      await this.cleanupInvalidAddons(userId)

      // 3. Initialize StremioAddonRegistry (loads user's installed addons and creates providers)
      await this.initializeRegistry(userId)

      this.logger.info('Stremio addon system initialized successfully', { userId })

      // Mark initialization step complete
      markStepComplete('stremio', 'Stremio addons loaded')
    } catch (error) {
      this.logger.error('Failed to initialize Stremio addon system', error as Error, { userId })
      // Don't throw - app should continue even if Stremio init fails
    }
  }

  private async cleanupLegacyData(): Promise<void> {
    try {
      await AsyncStorage.removeItem('stremioAddons')
      this.logger.debug('Removed legacy Legend State persistence data')
    } catch (error) {
      this.logger.warn('Failed to remove legacy persistence data', error as Error)
    }
  }

  private async cleanupInvalidAddons(userId: string): Promise<void> {
    try {
      const removedCount = await this.addonStorage.cleanupInvalidAddons(userId)

      if (removedCount > 0) {
        this.logger.info(`Cleaned up ${removedCount} invalid addon(s)`, { userId })
      }
    } catch (error) {
      this.logger.warn('Failed to cleanup invalid addons', error as Error)
    }
  }

  private async initializeRegistry(userId: string): Promise<void> {
    try {
      await this.addonRegistry.initialize(userId)
      this.logger.info('StremioAddonRegistry initialized successfully', { userId })
    } catch (error) {
      this.logger.error('Failed to initialize StremioAddonRegistry', error as Error, { userId })
      // Don't throw - app can still work without Stremio
    }
  }

  /**
   * Shutdown Stremio system for a user
   * Call this when user logs out or app is shutting down
   */
  async shutdown(userId?: string): Promise<void> {
    this.logger.info('Shutting down Stremio addon system', { userId })

    try {
      await this.addonRegistry.shutdown()

      if (userId) {
        this.initializedUsers.delete(userId)
      } else {
        this.initializedUsers.clear()
      }

      this.logger.info('Stremio addon system shutdown successfully')
    } catch (error) {
      this.logger.error('Failed to shutdown Stremio addon system', error as Error)
    }
  }

  /**
   * Check if Stremio is initialized for a user
   */
  isInitialized(userId: string): boolean {
    return this.initializedUsers.has(userId)
  }

  /**
   * Reset initialization state (for testing or manual reset)
   */
  reset(): void {
    this.initializedUsers.clear()
    this.initializationPromises.clear()
    this.logger.info('Stremio initialization state reset')
  }
}
