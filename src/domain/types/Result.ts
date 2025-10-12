/**
 * Result type for capability methods
 * Provides explicit success/failure information for provider fallback
 */
export type Result<T, E = Error> = Success<T> | Failure<E>

export interface Success<T> {
  success: true
  data: T
  providerId: string
  metadata?: {
    cached?: boolean
    timestamp?: Date
    [key: string]: any
  }
}

export interface Failure<E = Error> {
  success: false
  error: E
  providerId: string
  reason: 'missing_id' | 'api_error' | 'network_error' | 'not_found' | 'unsupported' | 'missing_credentials' | 'invalid_input'
}

// Helper functions
export const ok = <T>(data: T, providerId: string, metadata?: any): Success<T> => ({
  success: true,
  data,
  providerId,
  metadata,
})

export const fail = <E = Error>(error: E, providerId: string, reason: Failure['reason']): Failure<E> => ({
  success: false,
  error,
  providerId,
  reason,
})
