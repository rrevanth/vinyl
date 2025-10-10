import { DomainError } from './DomainError'

/**
 * Error when external ID resolution fails
 * Used when cannot resolve IDs between different provider systems
 *
 * @example
 * throw new ExternalIdResolutionError('tmdb', 'trakt', 'Movie not found in Trakt', 'error.external_id.resolution_failed')
 */
export class ExternalIdResolutionError extends DomainError {
  constructor(
    public readonly fromProvider: string,
    public readonly toProvider: string,
    message: string,
    code?: string
  ) {
    super(`Failed to resolve ID from ${fromProvider} to ${toProvider}: ${message}`, code)
    this.name = 'ExternalIdResolutionError'
    Object.setPrototypeOf(this, ExternalIdResolutionError.prototype)
  }
}
