// Error for network and HTTP failures
import { InfrastructureError } from './InfrastructureError'

export class NetworkError extends InfrastructureError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly url?: string,
    cause?: Error
  ) {
    super(message, cause)
    this.name = 'NetworkError'
    Object.setPrototypeOf(this, NetworkError.prototype)
  }
}