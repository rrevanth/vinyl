/**
 * Convenience wrapper for centralized logging
 * Provides easy access to LoggingService without DI in every file
 * 
 * Usage:
 * import { logger } from '@/src/presentation/shared/utils/logger'
 * logger.info('Message', { context: 'data' })
 * logger.error('Error occurred', error, { context: 'data' })
 */
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

let loggerInstance: ILoggingService | null = null

const getLogger = (): ILoggingService => {
  if (!loggerInstance) {
    loggerInstance = container.resolve<ILoggingService>(TOKENS.LoggingService)
  }
  return loggerInstance
}

export const logger = {
  debug: (message: string, context?: object) => {
    getLogger().debug(message, context)
  },
  info: (message: string, context?: object) => {
    getLogger().info(message, context)
  },
  warn: (message: string, context?: object) => {
    getLogger().warn(message, context)
  },
  error: (message: string, error: Error, context?: object) => {
    getLogger().error(message, error, context)
  }
}
