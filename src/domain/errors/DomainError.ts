/**
 * Base class for all domain errors
 * Provides proper error handling, instanceof checks, and i18n support
 *
 * @example
 * throw new DomainError('Operation failed', 'error.domain.operation_failed')
 */
export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'DomainError'
    Object.setPrototypeOf(this, DomainError.prototype)
  }
}