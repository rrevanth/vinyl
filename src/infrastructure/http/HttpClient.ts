import { NotFoundError, UnauthorizedError } from '../../domain/errors'
import type { ILoggingService } from '../../domain/services/ILoggingService'
import { NetworkError } from '../errors'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axiosRetry from 'axios-retry'

/**
 * HTTP client with interceptors and retry logic
 *
 * Features:
 * - Automatic authentication token injection
 * - Request/response logging (dev mode)
 * - HTTP error mapping to domain errors
 * - Automatic retry with exponential backoff
 * - 10-second timeout
 */
export class HttpClient {
  private client!: AxiosInstance

  constructor(
    private baseURL: string | undefined,
    private getAuthToken: () => string | null,
    private logger?: ILoggingService,
    private additionalHeaders?: Record<string, string>
  ) {
    this.setupAxios()
  }

  /**
   * Configure Axios instance with interceptors and retry logic
   */
  private setupAxios(): void {
    // Create Axios instance with base configuration
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
        ...this.additionalHeaders,
      },
    })

    // Request interceptor: Add authentication token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Log request in development mode
        if (__DEV__ && this.logger) {
          this.logger.debug('HTTP Request', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            headers: config.headers,
          })
        }

        return config
      },
      (error) => {
        if (this.logger) {
          this.logger.error('Request interceptor error', error)
        }
        return Promise.reject(error)
      }
    )

    // Response interceptor: Map HTTP errors to domain errors
    this.client.interceptors.response.use(
      (response) => {
        // Log successful response in development mode
        if (__DEV__ && this.logger) {
          this.logger.debug('HTTP Response', {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            data: response.data,
          })
        }
        return response
      },
      (error: AxiosError) => {
        // Map HTTP errors to domain errors
        const mappedError = this.mapError(error)

        // Log error
        if (this.logger) {
          this.logger.error('HTTP Error', mappedError, {
            url: error.config?.url,
            method: error.config?.method?.toUpperCase(),
            status: error.response?.status,
          })
        }

        return Promise.reject(mappedError)
      }
    )

    // Configure retry logic
    axiosRetry(this.client, {
      retries: 3,
      // eslint-disable-next-line import/no-named-as-default-member
      retryDelay: axiosRetry.exponentialDelay, // Exponential backoff
      retryCondition: (error) => {
        // Retry on network errors and 5xx server errors
        // Don't retry 4xx client errors
        return (
          // eslint-disable-next-line import/no-named-as-default-member
          axiosRetry.isNetworkError(error) ||
          // eslint-disable-next-line import/no-named-as-default-member
          axiosRetry.isRetryableError(error) ||
          (error.response?.status !== undefined && error.response.status >= 500)
        )
      },
      onRetry: (retryCount, error, requestConfig) => {
        if (this.logger) {
          this.logger.warn('Retrying HTTP request', {
            retryCount,
            url: requestConfig.url,
            method: requestConfig.method?.toUpperCase(),
            error: error.message,
          })
        }
      },
    })
  }

  /**
   * Map Axios errors to domain errors
   */
  private mapError(error: AxiosError): Error {
    const status = error.response?.status
    const url = error.config?.url || 'unknown'

    // Map specific HTTP status codes to domain errors
    if (status === 401) {
      return new UnauthorizedError('Authentication required')
    }

    if (status === 404) {
      return new NotFoundError(`Resource not found: ${url}`)
    }

    // Wrap all other errors as NetworkError
    return new NetworkError(error.message || 'Network request failed', status, url)
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(endpoint, config)
    return response.data
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(endpoint, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config)
    return response.data
  }
}
