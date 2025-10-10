import { DomainError } from './DomainError'
import { NotFoundError } from './NotFoundError'
import { ValidationError } from './ValidationError'
import { UnauthorizedError } from './UnauthorizedError'
import { ForbiddenError } from './ForbiddenError'
import { ConflictError } from './ConflictError'
import { ProviderUnavailableError } from './ProviderUnavailableError'
import { ProviderConfigurationError } from './ProviderConfigurationError'
import { CapabilityNotSupportedError } from './CapabilityNotSupportedError'
import { ExternalIdResolutionError } from './ExternalIdResolutionError'
import { MediaNotFoundError } from './MediaNotFoundError'
import { InvalidMediaTypeError } from './InvalidMediaTypeError'
import { MediaEnrichmentError } from './MediaEnrichmentError'
import { UserNotFoundError } from './UserNotFoundError'
import { InvalidPreferencesError } from './InvalidPreferencesError'
import { UserAuthenticationError } from './UserAuthenticationError'
import { NetworkError } from '@/src/infrastructure/errors/NetworkError'

/**
 * Type guard to check if error is a DomainError
 *
 * @example
 * if (isDomainError(error)) {
 *   console.log(error.code)
 * }
 */
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError
}

/**
 * Type guard to check if error is a NotFoundError
 *
 * @example
 * if (isNotFoundError(error)) {
 *   console.log(`Resource ${error.resource} with ID ${error.id} not found`)
 * }
 */
export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError
}

/**
 * Type guard to check if error is a ValidationError
 *
 * @example
 * if (isValidationError(error)) {
 *   console.log(`Validation failed for field: ${error.field}`)
 * }
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}

/**
 * Type guard to check if error is an UnauthorizedError
 */
export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return error instanceof UnauthorizedError
}

/**
 * Type guard to check if error is a ForbiddenError
 */
export function isForbiddenError(error: unknown): error is ForbiddenError {
  return error instanceof ForbiddenError
}

/**
 * Type guard to check if error is a ConflictError
 */
export function isConflictError(error: unknown): error is ConflictError {
  return error instanceof ConflictError
}

/**
 * Type guard to check if error is provider-related
 * Returns true for any provider error (unavailable, configuration, capability)
 *
 * @example
 * if (isProviderError(error)) {
 *   console.log(`Provider ${error.providerId} has an issue`)
 * }
 */
export function isProviderError(
  error: unknown
): error is ProviderUnavailableError | ProviderConfigurationError | CapabilityNotSupportedError {
  return (
    error instanceof ProviderUnavailableError ||
    error instanceof ProviderConfigurationError ||
    error instanceof CapabilityNotSupportedError
  )
}

/**
 * Type guard to check if error is a ProviderUnavailableError
 */
export function isProviderUnavailableError(error: unknown): error is ProviderUnavailableError {
  return error instanceof ProviderUnavailableError
}

/**
 * Type guard to check if error is a ProviderConfigurationError
 */
export function isProviderConfigurationError(error: unknown): error is ProviderConfigurationError {
  return error instanceof ProviderConfigurationError
}

/**
 * Type guard to check if error is a CapabilityNotSupportedError
 */
export function isCapabilityNotSupportedError(error: unknown): error is CapabilityNotSupportedError {
  return error instanceof CapabilityNotSupportedError
}

/**
 * Type guard to check if error is an ExternalIdResolutionError
 */
export function isExternalIdResolutionError(error: unknown): error is ExternalIdResolutionError {
  return error instanceof ExternalIdResolutionError
}

/**
 * Type guard to check if error is media-related
 * Returns true for any media error (not found, invalid type, enrichment)
 *
 * @example
 * if (isMediaError(error)) {
 *   // Handle media-specific error
 * }
 */
export function isMediaError(
  error: unknown
): error is MediaNotFoundError | InvalidMediaTypeError | MediaEnrichmentError {
  return (
    error instanceof MediaNotFoundError ||
    error instanceof InvalidMediaTypeError ||
    error instanceof MediaEnrichmentError
  )
}

/**
 * Type guard to check if error is a MediaNotFoundError
 */
export function isMediaNotFoundError(error: unknown): error is MediaNotFoundError {
  return error instanceof MediaNotFoundError
}

/**
 * Type guard to check if error is an InvalidMediaTypeError
 */
export function isInvalidMediaTypeError(error: unknown): error is InvalidMediaTypeError {
  return error instanceof InvalidMediaTypeError
}

/**
 * Type guard to check if error is a MediaEnrichmentError
 */
export function isMediaEnrichmentError(error: unknown): error is MediaEnrichmentError {
  return error instanceof MediaEnrichmentError
}

/**
 * Type guard to check if error is user-related
 * Returns true for any user error (not found, invalid preferences, authentication)
 */
export function isUserError(
  error: unknown
): error is UserNotFoundError | InvalidPreferencesError | UserAuthenticationError {
  return (
    error instanceof UserNotFoundError ||
    error instanceof InvalidPreferencesError ||
    error instanceof UserAuthenticationError
  )
}

/**
 * Type guard to check if error is a UserNotFoundError
 */
export function isUserNotFoundError(error: unknown): error is UserNotFoundError {
  return error instanceof UserNotFoundError
}

/**
 * Type guard to check if error is an InvalidPreferencesError
 */
export function isInvalidPreferencesError(error: unknown): error is InvalidPreferencesError {
  return error instanceof InvalidPreferencesError
}

/**
 * Type guard to check if error is a UserAuthenticationError
 */
export function isUserAuthenticationError(error: unknown): error is UserAuthenticationError {
  return error instanceof UserAuthenticationError
}

/**
 * Convert domain error to user-friendly message
 * Uses error code for i18n if available, otherwise returns message
 * NetworkErrors get special handling with user-friendly HTTPS guidance
 *
 * @param error - Domain error or infrastructure error to convert
 * @param t - Optional translation function (i18n)
 * @returns User-friendly error message
 *
 * @example
 * const message = toUserFriendlyMessage(error, t)
 * toast.error(message)
 */
export function toUserFriendlyMessage(
  error: DomainError | Error,
  t?: (key: string) => string
): string {
  // Check for NetworkError with user-friendly message support
  if (error instanceof NetworkError) {
    return error.getUserFriendlyMessage()
  }

  // Use i18n translation if available and error has code
  if (error instanceof DomainError && t && error.code) {
    const translated = t(error.code)
    // Return translation if it's different from the key (i.e., translation exists)
    if (translated !== error.code) {
      return translated
    }
  }

  // Fallback to error message
  return error.message
}

/**
 * Get error severity level for logging and UI display
 *
 * @param error - Error to assess
 * @returns Severity level: 'critical' | 'error' | 'warning' | 'info'
 *
 * @example
 * const severity = getErrorSeverity(error)
 * logger[severity](error.message)
 */
export function getErrorSeverity(
  error: unknown
): 'critical' | 'error' | 'warning' | 'info' {
  if (error instanceof UserAuthenticationError || error instanceof ForbiddenError) {
    return 'critical'
  }

  if (
    error instanceof MediaEnrichmentError ||
    error instanceof ProviderConfigurationError ||
    error instanceof ExternalIdResolutionError
  ) {
    return 'error'
  }

  if (
    error instanceof ProviderUnavailableError ||
    error instanceof CapabilityNotSupportedError
  ) {
    return 'warning'
  }

  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return 'info'
  }

  // Unknown error type
  return 'error'
}

/**
 * Check if error is retryable (temporary failure)
 *
 * @param error - Error to check
 * @returns true if error is likely temporary and should be retried
 *
 * @example
 * if (isRetryableError(error)) {
 *   await retry(() => operation())
 * }
 */
export function isRetryableError(error: unknown): boolean {
  // Provider unavailable errors are often temporary (rate limits, downtime)
  if (error instanceof ProviderUnavailableError) {
    return true
  }

  // Some external ID resolution errors might be temporary
  if (error instanceof ExternalIdResolutionError) {
    return true
  }

  // Domain errors are usually not retryable (business logic failures)
  if (error instanceof DomainError) {
    return false
  }

  // Unknown errors - assume not retryable to be safe
  return false
}
