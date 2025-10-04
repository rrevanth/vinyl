import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { StremioManifest } from './types'

/**
 * Parsed capability information from a Stremio manifest
 */
export interface ParsedCapabilities {
  capabilities: CapabilityType[]
  supportedTypes: string[]
  supportedIdPrefixes: string[]
  catalogCount: number
  hasConfiguration: boolean
  requiresConfiguration: boolean
  isAdultContent: boolean
  supportsP2P: boolean
}

/**
 * Validation result for a Stremio manifest
 */
export interface ManifestValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  capabilities: ParsedCapabilities | null
}

/**
 * Parser for Stremio addon manifests with smart capability detection
 *
 * Provides robust parsing with multiple detection strategies and fallbacks
 * for incomplete or non-standard manifests. Handles capability detection,
 * validation, and normalization of Stremio addon metadata.
 */
export class StremioManifestParser {
  /**
   * Parse and validate a Stremio manifest
   *
   * @param manifest Raw manifest object
   * @returns Validation result with parsed capabilities or errors
   */
  static parseManifest(manifest: unknown): ManifestValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Basic structure validation
    if (!this.isValidManifestStructure(manifest)) {
      errors.push('Invalid manifest structure: missing required fields')
      return { isValid: false, errors, warnings, capabilities: null }
    }

    const typedManifest = manifest as StremioManifest

    // Validate required fields
    const requiredFields = this.validateRequiredFields(typedManifest)
    errors.push(...requiredFields.errors)
    warnings.push(...requiredFields.warnings)

    if (errors.length > 0) {
      return { isValid: false, errors, warnings, capabilities: null }
    }

    // Parse capabilities with fallback detection
    const capabilities = this.detectCapabilities(typedManifest)

    // Additional validation warnings
    const additionalWarnings = this.generateWarnings(typedManifest, capabilities)
    warnings.push(...additionalWarnings)

    return {
      isValid: true,
      errors,
      warnings,
      capabilities,
    }
  }

  /**
   * Detect capabilities from manifest using multiple strategies
   */
  static detectCapabilities(manifest: StremioManifest): ParsedCapabilities {
    const capabilities: CapabilityType[] = []
    let catalogCount = 0

    // Strategy 1: Primary detection from resources array
    if (manifest.resources?.length) {
      manifest.resources.forEach((resource) => {
        const resourceName = typeof resource === 'string' ? resource : resource.name

        switch (resourceName) {
          case 'catalog':
            capabilities.push(CapabilityType.MEDIA_CATALOG)
            break
          case 'meta':
            capabilities.push(CapabilityType.MEDIA_METADATA)
            break
          case 'stream':
            capabilities.push(CapabilityType.MEDIA_STREAMS)
            break
          case 'addon_catalog':
            capabilities.push(CapabilityType.STREMIO_ADDON_CATALOG)
            break
          case 'subtitles':
            capabilities.push(CapabilityType.MEDIA_SUBTITLES)
            break
          default:
            // Unknown resource type, skip silently
            break
        }
      })
    }

    // Strategy 2: Fallback detection from manifest properties
    if (capabilities.length === 0) {
      // Check for catalog capability
      if (manifest.catalogs?.length) {
        capabilities.push(CapabilityType.MEDIA_CATALOG)
        catalogCount = manifest.catalogs.length
      }

      // Basic assumptions for addons with types and idPrefixes
      if (manifest.types?.length && manifest.idPrefixes?.length) {
        if (!capabilities.includes(CapabilityType.MEDIA_METADATA)) {
          capabilities.push(CapabilityType.MEDIA_METADATA)
        }
        if (!capabilities.includes(CapabilityType.MEDIA_STREAMS)) {
          capabilities.push(CapabilityType.MEDIA_STREAMS)
        }
      }
    } else {
      // Count catalogs for primary detection
      catalogCount = manifest.catalogs?.length || 0
    }

    // Extract other metadata
    const supportedTypes = manifest.types || []
    const supportedIdPrefixes = manifest.idPrefixes || []

    // Check configuration status
    const hasConfiguration = Boolean(manifest.config?.length)
    const requiresConfiguration = manifest.behaviorHints?.configurationRequired || false

    // Check content flags
    const isAdultContent = manifest.behaviorHints?.adult || false
    const supportsP2P = manifest.behaviorHints?.p2p || false

    return {
      capabilities: [...new Set(capabilities)], // Remove duplicates
      supportedTypes,
      supportedIdPrefixes,
      catalogCount,
      hasConfiguration,
      requiresConfiguration,
      isAdultContent,
      supportsP2P,
    }
  }

  /**
   * Validate basic manifest structure
   */
  private static isValidManifestStructure(manifest: unknown): boolean {
    if (!manifest || typeof manifest !== 'object') {
      return false
    }

    const obj = manifest as Record<string, unknown>
    return Boolean(obj.id && obj.name)
  }

  /**
   * Validate required manifest fields
   */
  private static validateRequiredFields(manifest: StremioManifest): {
    errors: string[]
    warnings: string[]
  } {
    const errors: string[] = []
    const warnings: string[] = []

    // Required fields
    if (!manifest.id) {
      errors.push('Manifest missing required field: id')
    }

    if (!manifest.name) {
      errors.push('Manifest missing required field: name')
    }

    // Validate ID format
    if (manifest.id && !/^[a-zA-Z0-9._-]+$/.test(manifest.id)) {
      errors.push(
        'Invalid addon ID format: must contain only alphanumeric characters, dots, underscores, and hyphens'
      )
    }

    // Version validation
    if (!manifest.version) {
      warnings.push('Manifest missing version field, defaulting to 1.0.0')
    }

    // Resource validation
    if (!manifest.resources?.length && !manifest.catalogs?.length) {
      errors.push('Manifest must specify resources or catalogs')
    }

    // Types validation for content addons
    const hasContentResources = manifest.resources?.some((r) => {
      const resourceName = typeof r === 'string' ? r : r.name
      return ['catalog', 'meta', 'stream', 'subtitles'].includes(resourceName)
    })

    if (hasContentResources && (!manifest.types?.length || !manifest.idPrefixes?.length)) {
      warnings.push('Content addons should specify supported types and idPrefixes')
    }

    return { errors, warnings }
  }

  /**
   * Generate additional warnings for common issues
   */
  private static generateWarnings(
    manifest: StremioManifest,
    capabilities: ParsedCapabilities
  ): string[] {
    const warnings: string[] = []

    // Check for description
    if (!manifest.description) {
      warnings.push('Manifest missing description field')
    }

    // Check for logo/background
    if (!manifest.logo && !manifest.background) {
      warnings.push('Addon missing visual assets (logo/background)')
    }

    // Check configuration consistency
    if (capabilities.requiresConfiguration && !capabilities.hasConfiguration) {
      warnings.push('Addon requires configuration but no config schema provided')
    }

    // Check catalog configuration
    if (
      capabilities.capabilities.includes(CapabilityType.MEDIA_CATALOG) &&
      capabilities.catalogCount === 0
    ) {
      warnings.push('Addon provides catalog capability but no catalogs defined')
    }

    // Check P2P content warning
    if (capabilities.supportsP2P && !capabilities.isAdultContent) {
      warnings.push('P2P addon detected - ensure compliance with local laws')
    }

    return warnings
  }

  /**
   * Get capability summary for debugging
   */
  static getCapabilitySummary(capabilities: ParsedCapabilities): string {
    const parts = [
      `Capabilities: ${capabilities.capabilities.join(', ')}`,
      `Types: ${capabilities.supportedTypes.join(', ') || 'none'}`,
      `ID Prefixes: ${capabilities.supportedIdPrefixes.join(', ') || 'none'}`,
      `Catalogs: ${capabilities.catalogCount}`,
      `Configuration: ${capabilities.requiresConfiguration ? 'required' : capabilities.hasConfiguration ? 'optional' : 'none'}`,
    ]

    if (capabilities.isAdultContent) parts.push('Adult Content')
    if (capabilities.supportsP2P) parts.push('P2P')

    return parts.join(' | ')
  }

  /**
   * Check if addon is compatible with the application
   */
  static isAddonCompatible(capabilities: ParsedCapabilities): boolean {
    // Must have at least one supported capability
    if (capabilities.capabilities.length === 0) {
      return false
    }

    // Must have types for content addons
    const hasContentCapabilities = capabilities.capabilities.some((cap) =>
      [
        CapabilityType.MEDIA_CATALOG,
        CapabilityType.MEDIA_METADATA,
        CapabilityType.MEDIA_STREAMS,
        CapabilityType.MEDIA_SUBTITLES,
      ].includes(cap)
    )

    if (hasContentCapabilities && capabilities.supportedTypes.length === 0) {
      return false
    }

    return true
  }
}
