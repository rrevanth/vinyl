import { DomainError } from './DomainError'

/**
 * Error for validation failures with field information
 * Captures field name and invalid value for debugging
 *
 * @example
 * throw new ValidationError('Invalid email format', 'email', 'invalid@', 'error.validation.email')
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value?: any,
    code?: string
  ) {
    super(message, code)
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}