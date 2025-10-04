/**
 * Provider operational status
 */
export enum ProviderStatus {
  ENABLED = 'enabled', // Provider is active
  DISABLED = 'disabled', // User disabled
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
