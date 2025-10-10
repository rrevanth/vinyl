import { DomainError } from './DomainError'

/**
 * Error when a provider is temporarily unavailable
 * Used for network issues, rate limiting, or provider downtime
 *
 * @example
 * throw new ProviderUnavailableError('TMDB', 'Rate limit exceeded', 'error.provider.rate_limit')
 */
export class ProviderUnavailableError extends DomainError {
  constructor(
    public readonly providerId: string,
    message: string,
    code?: string
  ) {
    super(`Provider ${providerId} unavailable: ${message}`, code)
    this.name = 'ProviderUnavailableError'
    Object.setPrototypeOf(this, ProviderUnavailableError.prototype)
  }
}
