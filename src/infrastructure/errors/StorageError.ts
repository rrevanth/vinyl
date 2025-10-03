// Error for storage operation failures
import { InfrastructureError } from './InfrastructureError'

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