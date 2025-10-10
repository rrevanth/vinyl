/**
 * Infrastructure Error Hierarchy
 *
 * This module exports all infrastructure-level errors.
 * Infrastructure errors represent failures in external dependencies,
 * data access, and technical infrastructure.
 *
 * Error Categories:
 * - Base: InfrastructureError (all infrastructure errors extend this)
 * - Network: NetworkError (HTTP/network failures)
 * - Storage: StorageError (persistent storage failures)
 * - Cache: CacheError (cache operation failures)
 * - API: ApiError (external API failures)
 * - Mapping: MapperError (data transformation failures)
 *
 * @module infrastructure/errors
 */

import { NetworkError } from './NetworkError'

export * from './InfrastructureError'
export * from './NetworkError'
export * from './StorageError'
export * from './CacheError'
export * from './ApiError'
export * from './MapperError'

/**
 * Check if error is likely due to iOS HTTP blocking
 * iOS blocks HTTP requests by default due to App Transport Security
 *
 * @param error - Error to check
 * @returns true if error is likely due to iOS HTTPS requirement
 *
 * @example
 * if (isHttpsRequiredError(error)) {
 *   const httpsUrl = error.url?.replace('http://', 'https://')
 *   console.log(`Try HTTPS instead: ${httpsUrl}`)
 * }
 */
export function isHttpsRequiredError(error: unknown): boolean {
  return error instanceof NetworkError && error.isLikelyHttpsRequired()
}
