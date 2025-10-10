import { UnauthorizedError } from './UnauthorizedError'

/**
 * Specialized error for user authentication failures
 * Extends UnauthorizedError with user authentication context
 *
 * @example
 * throw new UserAuthenticationError('Invalid credentials', 'error.auth.invalid_credentials')
 */
export class UserAuthenticationError extends UnauthorizedError {
  constructor(
    message: string = 'User authentication failed',
    code?: string
  ) {
    super(message, code)
    this.name = 'UserAuthenticationError'
    Object.setPrototypeOf(this, UserAuthenticationError.prototype)
  }
}
