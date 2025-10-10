import { InfrastructureError } from './InfrastructureError'

/**
 * Error for network and HTTP failures
 * Captures HTTP status codes and URLs for debugging
 *
 * @example
 * throw new NetworkError('Request timeout', 408, 'https://api.example.com/data', originalError)
 */
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

  /**
   * Check if this is likely an iOS App Transport Security block
   * iOS blocks HTTP requests by default, resulting in network error with no status code
   *
   * @returns true if this is likely an iOS HTTP blocking issue
   *
   * @example
   * if (error.isLikelyHttpsRequired()) {
   *   console.log('Use HTTPS instead')
   * }
   */
  isLikelyHttpsRequired(): boolean {
    return (
      this.statusCode === undefined &&
      this.url !== undefined &&
      this.url.startsWith('http://')
    )
  }

  /**
   * Get user-friendly error message with actionable guidance
   * Provides specific help for iOS HTTPS requirements and other common issues
   *
   * @returns User-friendly error message
   *
   * @example
   * const message = error.getUserFriendlyMessage()
   * toast.error(message)
   */
  getUserFriendlyMessage(): string {
    if (this.isLikelyHttpsRequired()) {
      const httpsUrl = this.url?.replace('http://', 'https://')
      return `Cannot connect to HTTP URL due to security restrictions. Try using HTTPS instead: ${httpsUrl}`
    }

    if (this.statusCode) {
      return `Network request failed with status ${this.statusCode}: ${this.message}`
    }

    return this.message
  }
}
