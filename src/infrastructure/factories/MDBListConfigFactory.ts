import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'
import type { MDBListAccount } from '@/src/domain/entities/UserPreferences'

/**
 * Effective MDBList configuration with resolved values
 * Extends base MDBListAccount with metadata about configuration source
 */
export interface EffectiveMDBListConfig extends MDBListAccount {
  readonly effectiveApiKey: string
  readonly effectiveBaseURL: string
  readonly configSource: 'user' | 'env' | 'default'
  readonly hasValidApiKey: boolean
}

/**
 * Factory for creating effective MDBList configuration
 *
 * Implements configuration hierarchy: User Account > Environment Variables > Defaults
 * Provides fallback configuration to ensure MDBList client always has valid settings.
 *
 * MDBList uses simple API key authentication via query parameter or header.
 */
export class MDBListConfigFactory {
  constructor(private readonly envService: IEnvironmentService) {}

  /**
   * Create effective MDBList configuration from user account
   *
   * Configuration priority:
   * 1. User Account (if configured in UserPreferences.accounts.mdblist)
   * 2. Environment Variables (EXPO_PUBLIC_MDBLIST_*)
   * 3. Default Values (basic functionality with user's own key)
   *
   * @param userAccount Optional user account configuration
   * @returns Complete MDBList configuration with all required values
   */
  createEffectiveConfig(userAccount?: MDBListAccount): EffectiveMDBListConfig {
    // Resolve API key with priority hierarchy
    const effectiveApiKey = this.resolveApiKey(userAccount?.apiKey)

    // Resolve base URL with fallback
    const effectiveBaseURL = this.resolveBaseURL(userAccount?.baseURL)

    // Determine primary configuration source
    const configSource = this.determineConfigSource(userAccount)

    // Check if API key is valid (non-empty)
    const hasValidApiKey = Boolean(effectiveApiKey && effectiveApiKey.trim().length > 0)

    return {
      // Original MDBListAccount interface for backward compatibility
      apiKey: effectiveApiKey,
      baseURL: effectiveBaseURL,

      // Extended interface with metadata
      effectiveApiKey,
      effectiveBaseURL,
      configSource,
      hasValidApiKey,
    }
  }

  /**
   * Resolve API key with fallback hierarchy
   * Priority: User Account > Environment Variable > Empty string
   */
  private resolveApiKey(userApiKey?: string): string {
    if (userApiKey) return userApiKey

    // Check environment variable
    const envKey = this.envService.get<string>('MDBLIST_API_KEY', '')
    if (envKey) return envKey

    // Return empty string if no key found
    return ''
  }

  /**
   * Resolve base URL with fallback hierarchy
   * Priority: User Account > Environment Variable > Default
   */
  private resolveBaseURL(userBaseURL?: string): string {
    if (userBaseURL) return userBaseURL

    // Check environment variable
    const envBaseURL = this.envService.get<string>('MDBLIST_BASE_URL', '')
    if (envBaseURL) return envBaseURL

    // Default to official MDBList API URL
    return 'https://api.mdblist.com'
  }

  /**
   * Determine the primary configuration source for debugging
   */
  private determineConfigSource(userAccount?: MDBListAccount): 'user' | 'env' | 'default' {
    // Check if user has provided API key
    if (userAccount?.apiKey) {
      return 'user'
    }

    // Check if environment variable is set
    if (this.envService.get<string>('MDBLIST_API_KEY', '')) {
      return 'env'
    }

    return 'default'
  }

  /**
   * Validate that the effective configuration is complete and valid
   * Throws descriptive errors for missing or invalid configuration
   */
  validateConfig(config: EffectiveMDBListConfig): void {
    if (!config.effectiveApiKey) {
      throw new Error(
        'MDBList API key is required. Set EXPO_PUBLIC_MDBLIST_API_KEY environment variable or configure in user preferences.'
      )
    }

    if (!config.effectiveBaseURL) {
      throw new Error('MDBList base URL is required')
    }

    // Validate URL format
    try {
      new URL(config.effectiveBaseURL)
    } catch {
      throw new Error(`Invalid MDBList base URL: ${config.effectiveBaseURL}`)
    }
  }

  /**
   * Check if API key is configured
   * Returns true if a valid API key exists
   */
  isConfigured(account?: MDBListAccount): boolean {
    const effective = this.createEffectiveConfig(account)
    return effective.hasValidApiKey
  }
}
