import { DomainError } from './DomainError'

/**
 * Error for validation failures with field information
 * Captures field name and invalid value for debugging
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value?: any
  ) {
    super(message)
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}