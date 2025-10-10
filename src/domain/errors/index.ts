/**
 * Domain Error Hierarchy
 *
 * This module exports all domain-level errors and helper functions.
 * Domain errors represent business logic failures and should be used
 * throughout the domain and application layers.
 *
 * Error Categories:
 * - Base: DomainError (all domain errors extend this)
 * - HTTP-style: NotFoundError, UnauthorizedError, ForbiddenError, ConflictError
 * - Validation: ValidationError, InvalidMediaTypeError, InvalidPreferencesError
 * - Provider: ProviderUnavailableError, ProviderConfigurationError, CapabilityNotSupportedError
 * - Media: MediaNotFoundError, InvalidMediaTypeError, MediaEnrichmentError
 * - User: UserNotFoundError, InvalidPreferencesError, UserAuthenticationError
 * - External: ExternalIdResolutionError
 *
 * @module domain/errors
 */

// Base error
export * from './DomainError'

// HTTP-style errors
export * from './NotFoundError'
export * from './ValidationError'
export * from './UnauthorizedError'
export * from './ForbiddenError'
export * from './ConflictError'

// Provider-related errors
export * from './ProviderUnavailableError'
export * from './ProviderConfigurationError'
export * from './CapabilityNotSupportedError'
export * from './ExternalIdResolutionError'

// Media-related errors
export * from './MediaNotFoundError'
export * from './InvalidMediaTypeError'
export * from './MediaEnrichmentError'

// User-related errors
export * from './UserNotFoundError'
export * from './InvalidPreferencesError'
export * from './UserAuthenticationError'

// Error helpers and type guards
export * from './errorHelpers'
