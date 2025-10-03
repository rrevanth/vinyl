import { DomainError } from './DomainError'

/**
 * Error for unauthorized access attempts
 * Used for both authentication and authorization failures
 */
export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Authentication required') {
    super(message)
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}