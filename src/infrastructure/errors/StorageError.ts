import { InfrastructureError } from './InfrastructureError'

/**
 * Error for storage operation failures
 * Captures operation type and key for debugging
 *
 * @example
 * throw new StorageError('Failed to read user data', 'read', 'user:123', ioError)
 */
export class StorageError extends InfrastructureError {
  constructor(
    message: string,
    public readonly operation: 'read' | 'write' | 'delete' | 'clear',
    public readonly key?: string,
    cause?: Error
  ) {
    super(message, cause)
    this.name = 'StorageError'
    Object.setPrototypeOf(this, StorageError.prototype)
  }
}
