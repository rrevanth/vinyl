# Generic API Cache Service

Generic API-level caching service using TanStack Query for type-safe, efficient data caching with configurable strategies.

## Features

- **Type-safe generic implementation** - Works with any data type
- **Per-endpoint cache configuration** - Predefined strategies for common use cases
- **Request deduplication** - Automatic deduplication of concurrent requests
- **Auth-aware cache keys** - Separate caches for authenticated vs public requests
- **Configurable stale/gc times** - Per endpoint type or custom configuration
- **Automatic retry** - Exponential backoff for failed requests
- **Memory efficient** - Automatic cleanup with garbage collection

## Cache Strategies

| Strategy | Stale Time | GC Time | Use Case |
|----------|-----------|---------|----------|
| `catalog-metadata` | 30 min | 2 hours | Addon catalogs, static metadata |
| `catalog-items` | 5 min | 30 min | Catalog content lists |
| `continue-watching` | 1 min | 5 min | User progress data |
| `media-details` | 1 hour | 4 hours | Movie/show details |
| `search` | 5 min | 15 min | Search results |

## Usage Examples

### Basic Usage with Predefined Strategy

```typescript
import { GenericAPICache } from '@/src/infrastructure/cache/GenericAPICache'
import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

// Initialize cache service
const cache = new GenericAPICache(queryClient, logger)

// Fetch with predefined strategy
const movieDetails = await cache.fetchWithStrategy(
  ['movies', 'details', movieId],
  () => apiClient.getMovieDetails(movieId),
  'media-details',
  isAuthenticated
)
```

### Custom Cache Configuration

```typescript
// Fetch with custom options
const searchResults = await cache.fetchWithCache(
  ['search', 'movies', query],
  () => apiClient.search(query),
  {
    staleTime: 10 * 60 * 1000,  // 10 minutes
    gcTime: 30 * 60 * 1000,      // 30 minutes
    retry: 3,
  },
  isAuthenticated
)
```

### Prefetching for Performance

```typescript
// Prefetch data optimistically
await cache.prefetchWithStrategy(
  ['movies', 'details', nextMovieId],
  () => apiClient.getMovieDetails(nextMovieId),
  'media-details',
  isAuthenticated
)
```

### Cache Invalidation

```typescript
// Invalidate specific cache entry
await cache.invalidate(['movies', 'details', movieId])

// Invalidate all movie details (partial match)
await cache.invalidate(['movies', 'details'], false)

// Invalidate all authenticated caches (e.g., on logout)
await cache.invalidateAuthenticatedCaches()

// Clear all caches
await cache.clearAll()
```

### Cache Statistics

```typescript
const stats = cache.getCacheStats()
console.log('Total queries:', stats.totalQueries)
console.log('Auth queries:', stats.authQueries)
console.log('Public queries:', stats.publicQueries)
console.log('Media details cached:', stats.strategies['media-details'])
```

## Integration with Repository Pattern

### Repository Implementation

```typescript
export class MovieRepository implements IMovieRepository {
  constructor(
    private readonly apiClient: HttpClient,
    private readonly cache: GenericAPICache,
    private readonly logger: ILoggingService
  ) {}

  async getDetails(movieId: string): Promise<Movie> {
    // Fetch with caching
    const data = await this.cache.fetchWithStrategy(
      ['movies', 'details', movieId],
      () => this.apiClient.get<MovieAPIResponse>(`/movies/${movieId}`),
      'media-details',
      this.apiClient.isAuthenticated()
    )

    return this.mapToDomain(data)
  }

  async search(query: string): Promise<Movie[]> {
    const data = await this.cache.fetchWithStrategy(
      ['movies', 'search', query],
      () => this.apiClient.get<MovieAPIResponse[]>(`/search?q=${query}`),
      'search',
      false // Public search
    )

    return data.map(this.mapToDomain)
  }

  async invalidateCache(movieId?: string): Promise<void> {
    if (movieId) {
      await this.cache.invalidate(['movies', 'details', movieId])
    } else {
      await this.cache.invalidate(['movies'])
    }
  }
}
```

## DI Container Registration

```typescript
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { GenericAPICache } from '@/src/infrastructure/cache/GenericAPICache'

export function initializeContainer(): void {
  // ... other registrations

  // Register QueryClient
  container.register(TOKENS.QueryClient, () => new QueryClient())

  // Register GenericAPICache
  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)
  const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
  container.register(TOKENS.GenericAPICache, () => new GenericAPICache(queryClient, logger))

  // Register repositories with cache
  const cache = container.resolve<GenericAPICache>(TOKENS.GenericAPICache)
  const apiClient = container.resolve<HttpClient>(TOKENS.HttpClient)
  container.register(TOKENS.MovieRepository, () => new MovieRepository(apiClient, cache, logger))
}
```

## Best Practices

### 1. Choose the Right Strategy

```typescript
// ✅ CORRECT - Use media-details for infrequently changing data
await cache.fetchWithStrategy(
  ['movies', 'details', id],
  fetchFn,
  'media-details',
  isAuth
)

// ❌ WRONG - Using continue-watching for media details (too short TTL)
await cache.fetchWithStrategy(
  ['movies', 'details', id],
  fetchFn,
  'continue-watching',
  isAuth
)
```

### 2. Always Include Auth Status

```typescript
// ✅ CORRECT - Auth-aware caching
await cache.fetchWithStrategy(
  ['user', 'watchlist'],
  fetchFn,
  'catalog-items',
  true  // isAuthenticated
)

// ❌ WRONG - Missing auth parameter (defaults to false)
await cache.fetchWithStrategy(
  ['user', 'watchlist'],
  fetchFn,
  'catalog-items'
)
```

### 3. Structure Query Keys Consistently

```typescript
// ✅ CORRECT - Hierarchical query keys
['movies', 'details', movieId]
['tv', 'details', showId, 'season', seasonNum]
['search', 'movies', query, 'page', pageNum]

// ❌ WRONG - Flat or inconsistent keys
['movie_details_123']
['movieId', '123', 'details']
```

### 4. Invalidate Related Caches

```typescript
// ✅ CORRECT - Invalidate related caches after mutation
async updateUserRating(movieId: string, rating: number): Promise<void> {
  await this.apiClient.post(`/ratings/${movieId}`, { rating })

  // Invalidate related caches
  await this.cache.invalidate(['movies', 'details', movieId])
  await this.cache.invalidate(['user', 'ratings'])
}
```

### 5. Use Prefetching for Performance

```typescript
// ✅ CORRECT - Prefetch when user hovers/focuses
function onMovieCardFocus(movieId: string) {
  cache.prefetchWithStrategy(
    ['movies', 'details', movieId],
    () => apiClient.getMovieDetails(movieId),
    'media-details',
    isAuthenticated
  )
}
```

## Performance Considerations

- **Stale Time**: How long data is considered fresh (no refetch during this time)
- **GC Time**: How long unused data stays in memory (cleanup after this time)
- **Auth-Aware Keys**: Prevents cache collision between authenticated/public data
- **Request Deduplication**: Multiple concurrent requests deduplicated automatically
- **Memory Management**: Old entries garbage collected based on gcTime

## Lifecycle Management

```typescript
// Initialize on app start
await cache.initialize()

// Shutdown on app close (optional, for cleanup)
await cache.shutdown()

// Clear on logout
await cache.invalidateAuthenticatedCaches()
```
