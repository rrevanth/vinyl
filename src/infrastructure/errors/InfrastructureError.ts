/**
 * Base error for infrastructure layer failures
 * All infrastructure errors should extend from this class
 *
 * @example
 * throw new InfrastructureError('Database connection failed', dbError)
 */
export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = 'InfrastructureError'
    Object.setPrototypeOf(this, InfrastructureError.prototype)
  }
}
