import { NotFoundError } from './NotFoundError'

/**
 * Specialized error for user not found
 * Extends NotFoundError with user-specific context
 *
 * @example
 * throw new UserNotFoundError('user-123', 'error.user.not_found')
 */
export class UserNotFoundError extends NotFoundError {
  constructor(
    userId: string,
    code?: string
  ) {
    super('User not found', 'user', userId, code)
    this.name = 'UserNotFoundError'
    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
