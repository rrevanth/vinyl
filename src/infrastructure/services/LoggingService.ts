/**
 * Console + Sentry logging implementation of ILoggingService
 *
 * Provides structured logging with severity levels.
 * Development: Formatted console output
 * Production: Error tracking via Sentry
 */
import * as Sentry from '@sentry/react-native'
import { ILoggingService } from '@/src/domain/services/ILoggingService'

export class LoggingService implements ILoggingService {
  private readonly isDevelopment = __DEV__

  /**
   * Formats log message with context for console output
   */
  private formatMessage(level: string, message: string, context?: object): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  /**
   * Logs debug-level messages (development only)
   */
  debug(message: string, context?: object): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, context))

      // Add breadcrumb for Sentry context
      Sentry.addBreadcrumb({
        level: 'debug',
        message,
        data: context,
      })
    }
  }

  /**
   * Logs informational messages
   */
  info(message: string, context?: object): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message, context))
    }

    // Add breadcrumb for Sentry context
    Sentry.addBreadcrumb({
      level: 'info',
      message,
      data: context,
    })
  }

  /**
   * Logs warning messages
   */
  warn(message: string, context?: object): void {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message, context))
    }

    // Add breadcrumb for Sentry context
    Sentry.addBreadcrumb({
      level: 'warning',
      message,
      data: context,
    })
  }

  /**
   * Logs error messages with error object
   */
  error(message: string, error: Error, context?: object): void {
    // Always log errors to console
    console.error(this.formatMessage('error', message, context))
    console.error(error)

    // Send to Sentry in all environments
    Sentry.captureException(error, {
      extra: {
        message,
        ...context,
      },
    })
  }

  /**
   * Sets user context for all subsequent logs
   */
  setUserContext(userId: string, email?: string): void {
    Sentry.setUser({
      id: userId,
      email,
    })

    if (this.isDevelopment) {
      console.info(this.formatMessage('info', `User context set: ${userId}`, { email }))
    }
  }
}