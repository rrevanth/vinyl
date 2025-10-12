import { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Request queue configuration per API client
 */
interface QueueConfig {
  lastApiCall: number
  requestQueue: (() => Promise<unknown>)[]
  isProcessingQueue: boolean
}

/**
 * Generic request queue service for rate-limiting API calls
 *
 * Manages multiple named queues (one per API client) to ensure sequential
 * request processing with enforced minimum intervals between requests.
 *
 * Based on nuvio's proven implementation for handling rate limits.
 *
 * @example Basic usage in API client
 * ```typescript
 * class TMDBClient {
 *   constructor(
 *     private httpClient: HttpClient,
 *     private queueService: RequestQueueService
 *   ) {}
 *
 *   async getMovie(id: string): Promise<Movie> {
 *     return this.queueService.enqueue('tmdb', async () => {
 *       return this.httpClient.get<Movie>(`/movie/${id}`)
 *     })
 *   }
 * }
 * ```
 *
 * @example Multiple queues for different API clients
 * ```typescript
 * // TMDB queue (processes independently)
 * await queueService.enqueue('tmdb', () => tmdbClient.getMovie(id))
 *
 * // Trakt queue (processes independently)
 * await queueService.enqueue('trakt', () => traktClient.getUser())
 *
 * // MDBList queue (processes independently)
 * await queueService.enqueue('mdblist', () => mdblistClient.getRating(id))
 * ```
 */
export class RequestQueueService {
  private readonly MIN_API_INTERVAL = 100 // 100ms between requests (10x faster than before)
  private readonly queues: Map<string, QueueConfig> = new Map()

  constructor(private readonly logger: ILoggingService) {}

  /**
   * Enqueues a request for sequential processing with rate limiting
   *
   * @param queueName - Identifier for the API client queue (e.g., 'tmdb', 'trakt')
   * @param request - Async function to execute
   * @returns Promise that resolves with the request result
   *
   * @example
   * const result = await queueService.enqueue<User>('trakt', async () => {
   *   return traktClient.getUser()
   * })
   */
  async enqueue<T>(queueName: string, request: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const queue = this.getOrCreateQueue(queueName)

      // Add wrapped request to queue
      queue.requestQueue.push(async () => {
        try {
          const result = await request()
          resolve(result)
        } catch (error) {
          this.logger.error(
            'Request queue execution failed',
            error instanceof Error ? error : new Error(String(error)),
            { queueName }
          )
          reject(error)
        }
      })

      // Start processing queue
      void this.processQueue(queueName)
    })
  }

  /**
   * Gets existing queue or creates new one for the API client
   */
  private getOrCreateQueue(queueName: string): QueueConfig {
    let queue = this.queues.get(queueName)

    if (!queue) {
      queue = {
        lastApiCall: 0,
        requestQueue: [],
        isProcessingQueue: false,
      }
      this.queues.set(queueName, queue)
      this.logger.debug('Created new request queue', { queueName })
    }

    return queue
  }

  /**
   * Processes requests sequentially with rate limiting
   *
   * Ensures MIN_API_INTERVAL between consecutive requests in the same queue.
   * Multiple queues process independently in parallel.
   */
  private async processQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName)

    if (!queue) {
      this.logger.warn('Queue not found during processing', { queueName })
      return
    }

    // Prevent concurrent processing of same queue
    if (queue.isProcessingQueue || queue.requestQueue.length === 0) {
      return
    }

    queue.isProcessingQueue = true

    this.logger.debug('Starting queue processing', {
      queueName,
      queueLength: queue.requestQueue.length,
    })

    while (queue.requestQueue.length > 0) {
      const request = queue.requestQueue.shift()

      if (request) {
        // Execute request
        await request()

        // Update last call timestamp
        queue.lastApiCall = Date.now()

        // Wait minimum interval before next request (if queue has more items)
        if (queue.requestQueue.length > 0) {
          this.logger.debug('Waiting for rate limit interval', {
            queueName,
            intervalMs: this.MIN_API_INTERVAL,
            remainingRequests: queue.requestQueue.length,
          })

          await new Promise((resolve) =>
            setTimeout(resolve, this.MIN_API_INTERVAL)
          )
        }
      }
    }

    queue.isProcessingQueue = false

    this.logger.debug('Queue processing complete', { queueName })
  }

  /**
   * Gets current queue length for monitoring/debugging
   *
   * @param queueName - Queue identifier
   * @returns Number of pending requests in queue
   */
  getQueueLength(queueName: string): number {
    const queue = this.queues.get(queueName)
    return queue?.requestQueue.length ?? 0
  }

  /**
   * Checks if queue is currently processing requests
   *
   * @param queueName - Queue identifier
   * @returns True if queue is actively processing
   */
  isProcessing(queueName: string): boolean {
    const queue = this.queues.get(queueName)
    return queue?.isProcessingQueue ?? false
  }

  /**
   * Clears all pending requests from a specific queue
   *
   * Useful for cleanup or cancellation scenarios
   *
   * @param queueName - Queue identifier
   */
  clearQueue(queueName: string): void {
    const queue = this.queues.get(queueName)

    if (queue) {
      const clearedCount = queue.requestQueue.length
      queue.requestQueue = []

      this.logger.info('Queue cleared', {
        queueName,
        clearedRequests: clearedCount,
      })
    }
  }

  /**
   * Clears all queues
   *
   * Useful for app-wide cleanup
   */
  clearAllQueues(): void {
    const queueNames = Array.from(this.queues.keys())

    for (const queueName of queueNames) {
      this.clearQueue(queueName)
    }

    this.logger.info('All queues cleared', {
      clearedQueues: queueNames.length,
    })
  }
}
