import { DomainError } from './DomainError'

/**
 * Error for unauthorized access attempts
 * Used for authentication failures
 *
 * @example
 * throw new UnauthorizedError('Token expired', 'error.auth.token_expired')
 */
export class UnauthorizedError extends DomainError {
  constructor(
    message: string = 'Authentication required',
    code?: string
  ) {
    super(message, code)
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}