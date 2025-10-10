import { DomainError } from './DomainError'

/**
 * Error when a provider doesn't support requested capability
 * Used when attempting unsupported operations on providers
 *
 * @example
 * throw new CapabilityNotSupportedError('Stremio', 'MEDIA_METADATA', 'error.provider.capability_not_supported')
 */
export class CapabilityNotSupportedError extends DomainError {
  constructor(
    public readonly providerId: string,
    public readonly capability: string,
    code?: string
  ) {
    super(`Provider ${providerId} does not support capability: ${capability}`, code)
    this.name = 'CapabilityNotSupportedError'
    Object.setPrototypeOf(this, CapabilityNotSupportedError.prototype)
  }
}
