import { DomainError } from './DomainError'

/**
 * Error for when a requested resource doesn't exist
 * Includes optional resource type and identifier context
 */
export class NotFoundError extends DomainError {
  constructor(
    message: string,
    public readonly resource?: string,
    public readonly id?: string
  ) {
    super(message)
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}