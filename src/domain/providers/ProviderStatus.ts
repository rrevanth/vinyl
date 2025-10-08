/**
 * Provider operational status
 * Represents the runtime/health state of a provider, NOT user preferences
 */
export enum ProviderStatus {
  READY = 'ready', // Provider initialized and working
  ERROR = 'error', // Provider is failing
  INITIALIZING = 'initializing', // Provider is being set up
}

/**
 * Provider health information
 */
export interface ProviderHealth {
  status: ProviderStatus
  lastChecked: Date
  errorCount: number
  lastError?: string
  responseTime?: number // Average response time in ms
}
