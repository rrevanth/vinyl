import { DomainError } from './DomainError'

/**
 * Error during media enrichment process
 * Used when media data enrichment from multiple providers fails
 *
 * @example
 * throw new MediaEnrichmentError('tt1234567', 'Failed to fetch metadata from all providers', 'error.media.enrichment_failed')
 */
export class MediaEnrichmentError extends DomainError {
  constructor(
    public readonly mediaId: string,
    message: string,
    code?: string
  ) {
    super(`Media enrichment failed for ${mediaId}: ${message}`, code)
    this.name = 'MediaEnrichmentError'
    Object.setPrototypeOf(this, MediaEnrichmentError.prototype)
  }
}
