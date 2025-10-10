import { DomainError } from './DomainError'

/**
 * Error for forbidden access attempts
 * Used for authorization failures (user authenticated but lacks permission)
 *
 * @example
 * throw new ForbiddenError('Insufficient permissions', 'error.auth.forbidden')
 */
export class ForbiddenError extends DomainError {
  constructor(
    message: string = 'Access forbidden',
    code?: string
  ) {
    super(message, code)
    this.name = 'ForbiddenError'
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}
