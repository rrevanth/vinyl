import { DomainError } from './DomainError'

/**
 * Error for resource conflicts
 * Used when operation conflicts with current state (e.g., duplicate entries)
 *
 * @example
 * throw new ConflictError('User already exists', 'email', 'error.conflict.user_exists')
 */
export class ConflictError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
    code?: string
  ) {
    super(message, code)
    this.name = 'ConflictError'
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}
