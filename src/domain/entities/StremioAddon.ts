import type { CapabilityType } from '../capabilities/CapabilityType'
import type {
  StremioManifest,
  StremioTransportUrl,
} from '../../infrastructure/providers/stremio/types'

/**
 * Rich Stremio addon entity that combines manifest data with runtime metadata
 * This represents a Stremio addon from the addon_catalog with installation state
 */
export class StremioAddon {
  // Core identification from manifest
  public readonly id: string
  public readonly name: string
  public readonly version: string
  public readonly description?: string

  // Visual elements
  public readonly logo?: string
  public readonly background?: string

  // Technical metadata
  public readonly transportUrl: StremioTransportUrl
  public readonly transportName: string
  public readonly manifest: StremioManifest

  // Processed capabilities (computed from manifest)
  public readonly capabilities: CapabilityType[]
  public readonly supportedTypes: string[]
  public readonly supportedIdPrefixes: string[]

  // Addon features
  public readonly isConfigurable: boolean
  public readonly configurationRequired: boolean
  public readonly hasAdultContent: boolean
  public readonly supportsP2P: boolean

  // Installation metadata (runtime state)
  public readonly isInstalled: boolean
  public readonly isEnabled: boolean
  public readonly installedAt?: Date
  public readonly lastUpdated?: Date

  // User customizations
  public readonly userPriority?: number
  public readonly userCategories?: string[]
  public readonly userNotes?: string
  public readonly customName?: string

  constructor(data: {
    // Core manifest data
    manifest: StremioManifest
    transportUrl: StremioTransportUrl
    transportName?: string

    // Processed capabilities
    capabilities: CapabilityType[]

    // Installation state (optional)
    isInstalled?: boolean
    isEnabled?: boolean
    installedAt?: Date
    lastUpdated?: Date

    // User customizations (optional)
    userPriority?: number
    userCategories?: string[]
    userNotes?: string
    customName?: string
  }) {
    // Core identification
    this.id = data.manifest.id
    this.name = data.customName || data.manifest.name
    this.version = data.manifest.version || '1.0.0'
    this.description = data.manifest.description

    // Visual elements
    this.logo = data.manifest.logo
    this.background = data.manifest.background

    // Technical metadata
    this.transportUrl = data.transportUrl
    this.transportName = data.transportName || 'http'
    this.manifest = data.manifest

    // Processed capabilities
    this.capabilities = data.capabilities
    this.supportedTypes = data.manifest.types || []
    this.supportedIdPrefixes = data.manifest.idPrefixes || []

    // Addon features (from behaviorHints)
    this.isConfigurable = data.manifest.behaviorHints?.configurable || false
    this.configurationRequired = data.manifest.behaviorHints?.configurationRequired || false
    this.hasAdultContent = data.manifest.behaviorHints?.adult || false
    this.supportsP2P = data.manifest.behaviorHints?.p2p || false

    // Installation metadata
    this.isInstalled = data.isInstalled || false
    this.isEnabled = data.isEnabled || false
    this.installedAt = data.installedAt
    this.lastUpdated = data.lastUpdated

    // User customizations
    this.userPriority = data.userPriority
    this.userCategories = data.userCategories
    this.userNotes = data.userNotes
    this.customName = data.customName
  }

  /**
   * Create StremioAddon from addon catalog response entry
   */
  static fromAddonCatalogEntry(
    entry: {
      transportUrl: string
      transportName: string
      manifest: StremioManifest
    },
    capabilities: CapabilityType[]
  ): StremioAddon {
    return new StremioAddon({
      manifest: entry.manifest,
      transportUrl: entry.transportUrl,
      transportName: entry.transportName,
      capabilities,
      isInstalled: false,
      isEnabled: false,
    })
  }

  /**
   * Create StremioAddon from user's installed addon
   */
  static fromInstalledAddon(
    installedAddon: {
      addonId: string
      name: string
      version: string
      transportUrl: string
      installedAt: Date
      lastUpdated: Date
      isEnabled: boolean
      capabilities: CapabilityType[]
      supportedTypes: string[]
      supportedIdPrefixes: string[]
      userConfig: {
        customName?: string
        priority: number
        categories: string[]
        notes?: string
      }
    },
    manifest: StremioManifest
  ): StremioAddon {
    return new StremioAddon({
      manifest,
      transportUrl: installedAddon.transportUrl,
      capabilities: installedAddon.capabilities,
      isInstalled: true,
      isEnabled: installedAddon.isEnabled,
      installedAt: installedAddon.installedAt,
      lastUpdated: installedAddon.lastUpdated,
      userPriority: installedAddon.userConfig.priority,
      userCategories: installedAddon.userConfig.categories,
      userNotes: installedAddon.userConfig.notes,
      customName: installedAddon.userConfig.customName,
    })
  }

  /**
   * Check if addon has specific capability
   */
  hasCapability(capability: CapabilityType): boolean {
    return this.capabilities.includes(capability)
  }

  /**
   * Check if addon supports specific media type
   */
  supportsType(mediaType: string): boolean {
    return this.supportedTypes.includes(mediaType)
  }

  /**
   * Check if addon supports specific ID prefix
   */
  supportsIdPrefix(prefix: string): boolean {
    return this.supportedIdPrefixes.includes(prefix)
  }

  /**
   * Get addon category for display purposes
   */
  getCategory(): string {
    if (this.userCategories?.length) {
      return this.userCategories[0] // Primary category
    }

    // Infer category from addon characteristics
    if (this.hasAdultContent) return 'adult'
    if (this.supportsP2P) return 'p2p'
    if (this.isConfigurable) return 'configurable'

    return 'general'
  }

  /**
   * Get effective name (user custom name or manifest name)
   */
  getDisplayName(): string {
    return this.customName || this.name
  }

  /**
   * Check if addon is ready to use
   */
  isReadyToUse(): boolean {
    return (
      this.isInstalled && this.isEnabled && (!this.configurationRequired || this.isConfigurable)
    )
  }

  /**
   * Get total catalog count (content catalogs + addon catalogs)
   * This includes both manifest.catalogs and manifest.addonCatalogs
   */
  getTotalCatalogCount(): number {
    const contentCatalogsCount = this.manifest.catalogs?.length || 0
    const addonCatalogsCount = this.manifest.addonCatalogs?.length || 0
    return contentCatalogsCount + addonCatalogsCount
  }

  /**
   * Create a copy with updated installation state
   */
  withInstallationState(updates: {
    isInstalled?: boolean
    isEnabled?: boolean
    installedAt?: Date
    lastUpdated?: Date
    userPriority?: number
    userCategories?: string[]
    userNotes?: string
    customName?: string
  }): StremioAddon {
    return new StremioAddon({
      manifest: this.manifest,
      transportUrl: this.transportUrl,
      transportName: this.transportName,
      capabilities: this.capabilities,
      isInstalled: updates.isInstalled ?? this.isInstalled,
      isEnabled: updates.isEnabled ?? this.isEnabled,
      installedAt: updates.installedAt ?? this.installedAt,
      lastUpdated: updates.lastUpdated ?? this.lastUpdated,
      userPriority: updates.userPriority ?? this.userPriority,
      userCategories: updates.userCategories ?? this.userCategories,
      userNotes: updates.userNotes ?? this.userNotes,
      customName: updates.customName ?? this.customName,
    })
  }

  /**
   * Serialize to JSON (for storage/transmission)
   * This ensures proper serialization if StremioAddon instances ever get persisted
   */
  toJSON() {
    return {
      manifest: this.manifest,
      transportUrl: this.transportUrl,
      transportName: this.transportName,
      capabilities: this.capabilities,
      isInstalled: this.isInstalled,
      isEnabled: this.isEnabled,
      installedAt: this.installedAt?.toISOString(),
      lastUpdated: this.lastUpdated?.toISOString(),
      userPriority: this.userPriority,
      userCategories: this.userCategories,
      userNotes: this.userNotes,
      customName: this.customName,
    }
  }

  /**
   * Deserialize from JSON (restore class instance with methods)
   * This ensures proper deserialization if StremioAddon instances were persisted as JSON
   */
  static fromJSON(data: any): StremioAddon {
    return new StremioAddon({
      manifest: data.manifest,
      transportUrl: data.transportUrl,
      transportName: data.transportName,
      capabilities: data.capabilities || [],
      isInstalled: data.isInstalled ?? false,
      isEnabled: data.isEnabled ?? false,
      installedAt: data.installedAt ? new Date(data.installedAt) : undefined,
      lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : undefined,
      userPriority: data.userPriority,
      userCategories: data.userCategories,
      userNotes: data.userNotes,
      customName: data.customName,
    })
  }
}
