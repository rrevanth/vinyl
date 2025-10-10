import { InfrastructureError } from './InfrastructureError'

/**
 * Error for cache operation failures
 * Used for cache read, write, and invalidation errors
 *
 * @example
 * throw new CacheError('Cache write failed', 'write', 'media:123', cacheError)
 */
export class CacheError extends InfrastructureError {
  constructor(
    message: string,
    public readonly operation: 'read' | 'write' | 'invalidate' | 'clear',
    public readonly key?: string,
    cause?: Error
  ) {
    super(message, cause)
    this.name = 'CacheError'
    Object.setPrototypeOf(this, CacheError.prototype)
  }
}
