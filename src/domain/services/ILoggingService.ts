/**
 * Structured logging interface with severity levels
 *
 * Provides abstraction for logging operations with contextual information.
 * Implementation can use console, Sentry, LogRocket, or custom logging solutions.
 */
export interface ILoggingService {
  /**
   * Logs debug-level messages (development only)
   * @param message Log message
   * @param context Optional contextual data
   */
  debug(message: string, context?: object): void

  /**
   * Logs informational messages
   * @param message Log message
   * @param context Optional contextual data
   */
  info(message: string, context?: object): void

  /**
   * Logs warning messages
   * @param message Log message
   * @param context Optional contextual data
   */
  warn(message: string, context?: object): void

  /**
   * Logs error messages with error object
   * @param message Error description
   * @param error Error object
   * @param context Optional contextual data
   */
  error(message: string, error: Error, context?: object): void

  /**
   * Sets user context for all subsequent logs
   * @param userId User identifier
   * @param email Optional user email
   */
  setUserContext(userId: string, email?: string): void
}