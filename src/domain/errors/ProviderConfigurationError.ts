import { DomainError } from './DomainError'

/**
 * Error for provider configuration issues
 * Used when provider setup is invalid or incomplete
 *
 * @example
 * throw new ProviderConfigurationError('TMDB', 'Missing API key', 'error.provider.config.missing_key')
 */
export class ProviderConfigurationError extends DomainError {
  constructor(
    public readonly providerId: string,
    message: string,
    code?: string
  ) {
    super(`Provider ${providerId} configuration error: ${message}`, code)
    this.name = 'ProviderConfigurationError'
    Object.setPrototypeOf(this, ProviderConfigurationError.prototype)
  }
}
