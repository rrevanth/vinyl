import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'

/**
 * Fanart.tv configuration with all required settings
 */
export interface FanartConfig {
  readonly apiKey: string
  readonly clientKey?: string
  readonly baseURL: string
  readonly timeout: number
}

/**
 * Factory for creating Fanart.tv configuration
 *
 * Implements configuration hierarchy: User Settings > Environment Variables > Defaults
 * Provides complete configuration for Fanart.tv API client.
 */
export class FanartConfigFactory {
  constructor(private readonly envService: IEnvironmentService) {}

  /**
   * Create Fanart.tv configuration
   *
   * Configuration priority:
   * 1. User provided values (apiKey, clientKey)
   * 2. Environment Variables (EXPO_PUBLIC_FANART_*)
   * 3. Default Values (hardcoded fallbacks)
   *
   * @param userApiKey Optional user API key
   * @param userClientKey Optional user client key (personal API key)
   * @returns Complete Fanart.tv configuration
   */
  createConfig(userApiKey?: string, userClientKey?: string): FanartConfig {
    const apiKey = userApiKey || this.envService.getFanartApiKey()
    const clientKey = userClientKey || this.envService.getFanartClientKey() || undefined
    const baseURL = this.envService.getFanartBaseURL()

    return {
      apiKey,
      clientKey,
      baseURL,
      timeout: 10000, // 10 seconds timeout
    }
  }

  /**
   * Validate that configuration has required fields
   */
  validateConfig(config: FanartConfig): void {
    if (!config.apiKey) {
      throw new Error('Fanart.tv API key is required')
    }

    if (!config.baseURL) {
      throw new Error('Fanart.tv base URL is required')
    }
  }
}
