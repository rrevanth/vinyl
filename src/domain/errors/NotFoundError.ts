import { DomainError } from './DomainError'

/**
 * Error for when a requested resource doesn't exist
 * Includes optional resource type and identifier context
 *
 * @example
 * throw new NotFoundError('User not found', 'user', '123', 'error.not_found.user')
 */
export class NotFoundError extends DomainError {
  constructor(
    message: string,
    public readonly resource?: string,
    public readonly id?: string,
    code?: string
  ) {
    super(message, code)
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}