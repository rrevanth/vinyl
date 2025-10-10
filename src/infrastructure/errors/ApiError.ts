import { InfrastructureError } from './InfrastructureError'

/**
 * Error for API-specific failures
 * Used for API client errors, rate limiting, and service-specific issues
 *
 * @example
 * throw new ApiError('Rate limit exceeded', 'TMDB', 429, retryAfter, originalError)
 */
export class ApiError extends InfrastructureError {
  constructor(
    message: string,
    public readonly apiName: string,
    public readonly statusCode?: number,
    public readonly retryAfter?: number,
    cause?: Error
  ) {
    super(message, cause)
    this.name = 'ApiError'
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
