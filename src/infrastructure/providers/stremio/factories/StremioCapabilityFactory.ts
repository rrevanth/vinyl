import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioMediaCatalogCapability } from '@/src/infrastructure/providers/stremio/capabilities/StremioMediaCatalogCapability'
import { StremioMediaMetadataCapability } from '@/src/infrastructure/providers/stremio/capabilities/StremioMediaMetadataCapability'
import { StremioMediaStreamsCapability } from '@/src/infrastructure/providers/stremio/capabilities/StremioMediaStreamsCapability'
import { StremioMediaSubtitlesCapability } from '@/src/infrastructure/providers/stremio/capabilities/StremioMediaSubtitlesCapability'

/**
 * Factory for creating Stremio capability instances
 *
 * Provides automatic capability registration through a declarative map,
 * eliminating manual if-checks and making new capability additions automatic.
 */
export class StremioCapabilityFactory {
  /**
   * Map of capability types to their constructor implementations
   * Single source of truth for capability registration
   */
  private static readonly capabilityMap = new Map<
    CapabilityType,
    new (
      addon: StremioAddon,
      client: StremioAddonClient,
      logger: ILoggingService
    ) => unknown
  >([
    [CapabilityType.MEDIA_CATALOG, StremioMediaCatalogCapability],
    [CapabilityType.MEDIA_METADATA, StremioMediaMetadataCapability],
    [CapabilityType.MEDIA_STREAMS, StremioMediaStreamsCapability],
    [CapabilityType.MEDIA_SUBTITLES, StremioMediaSubtitlesCapability],
  ])

  /**
   * Create a capability instance for the given type
   *
   * @param type - Capability type to create
   * @param addon - Stremio addon providing the capability
   * @param client - HTTP client for addon communication
   * @param logger - Logging service
   * @returns Capability instance or null if type not supported
   */
  static createCapability(
    type: CapabilityType,
    addon: StremioAddon,
    client: StremioAddonClient,
    logger: ILoggingService
  ): unknown | null {
    const Constructor = this.capabilityMap.get(type)
    if (!Constructor) {
      logger.debug('Capability type not supported by factory', {
        capabilityType: type,
        addonId: addon.id,
      })
      return null
    }

    return new Constructor(addon, client, logger)
  }

  /**
   * Get all capability types supported by this factory
   *
   * @returns Array of supported capability types
   */
  static getSupportedCapabilities(): CapabilityType[] {
    return Array.from(this.capabilityMap.keys())
  }

  /**
   * Check if a capability type is supported
   *
   * @param type - Capability type to check
   * @returns True if capability is supported
   */
  static isSupported(type: CapabilityType): boolean {
    return this.capabilityMap.has(type)
  }
}
