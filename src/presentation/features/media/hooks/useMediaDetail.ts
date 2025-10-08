import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type {
  WatchProgress,
  IMediaWatchProgressCapability,
} from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import type {
  Season,
  IMediaSeasonsCapability,
} from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { IMediaMetadataCapability } from '@/src/domain/capabilities/IMediaMetadataCapability'
import type { IMediaExternalIdsCapability } from '@/src/domain/capabilities/IMediaExternalIdsCapability'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import {
  setExternalIds,
  setEnrichedData,
  setWatchProgress,
  setSeasons,
  setLoadingState,
  setError,
} from '../stores/mediaDetail.store'

/**
 * Progressive loading pattern for media detail screen
 *
 * Phase 1: Resolve external IDs (blocking)
 * Phase 2: Fetch metadata (depends on IDs)
 * Phase 3: Fetch watch progress (depends on IDs)
 * Phase 4: Fetch seasons/cast/videos (parallel, depends on metadata)
 */
export const useMediaDetail = (media: Media) => {
  const providerRegistry = container.resolve<IProviderRegistry>(TOKENS.ProviderRegistry)

  // Phase 1: Resolve external IDs (blocking - needed for all other queries)
  const externalIdsQuery = useQuery({
    queryKey: ['media-external-ids', media.stableId],
    queryFn: async (): Promise<ExternalIds> => {
      setLoadingState('isResolvingIds', true)
      setError(null)

      try {
        const capabilities = providerRegistry.getCapabilitiesForType<IMediaExternalIdsCapability>(
          CapabilityType.MEDIA_EXTERNAL_IDS
        )

        if (capabilities.length === 0) {
          // No external ID providers - use existing IDs from media
          return media.externalIds
        }

        // Try first capable provider
        const resolvedIds = await capabilities[0].getExternalIds(media)
        return resolvedIds
      } catch (error) {
        setError(`Failed to resolve external IDs: ${(error as Error).message}`)
        // Fallback to existing IDs
        return media.externalIds
      } finally {
        setLoadingState('isResolvingIds', false)
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 1000, // 1 hour
  })

  // Phase 2: Fetch metadata (depends on external IDs)
  const metadataQuery = useQuery({
    queryKey: ['media-metadata', media.stableId, externalIdsQuery.data],
    queryFn: async (): Promise<EnrichedMedia> => {
      setLoadingState('isLoadingMetadata', true)
      setError(null)

      try {
        const capabilities = providerRegistry.getCapabilitiesForType<IMediaMetadataCapability>(
          CapabilityType.MEDIA_METADATA
        )

        if (capabilities.length === 0) {
          throw new Error('No metadata providers available')
        }

        // Create media with resolved IDs
        const mediaWithIds = media.update({})
        const enrichedMedia = await capabilities[0].enrichMedia(mediaWithIds)
        return enrichedMedia
      } catch (error) {
        const errorMessage = `Failed to load metadata: ${(error as Error).message}`
        setError(errorMessage)
        throw error
      } finally {
        setLoadingState('isLoadingMetadata', false)
      }
    },
    enabled: !!externalIdsQuery.data && !externalIdsQuery.isLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  // Phase 3: Fetch watch progress (depends on external IDs, parallel with metadata)
  const watchProgressQuery = useQuery({
    queryKey: ['media-watch-progress', media.stableId, externalIdsQuery.data],
    queryFn: async (): Promise<WatchProgress | null> => {
      setLoadingState('isLoadingProgress', true)

      try {
        const capabilities = providerRegistry.getCapabilitiesForType<IMediaWatchProgressCapability>(
          CapabilityType.MEDIA_WATCH_PROGRESS
        )

        if (capabilities.length === 0) {
          // No watch progress providers - return null
          return null
        }

        const progress = await capabilities[0].getProgress(media)
        return progress
      } catch (error) {
        // Watch progress is optional - don't throw, just log
        console.warn('Failed to load watch progress:', error)
        return null
      } finally {
        setLoadingState('isLoadingProgress', false)
      }
    },
    enabled: !!externalIdsQuery.data && !externalIdsQuery.isLoading,
    staleTime: 60 * 1000, // 1 minute (watch progress changes frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  })

  // Phase 4: Fetch seasons (depends on metadata, only for series)
  const seasonsQuery = useQuery({
    queryKey: ['media-seasons', media.stableId, metadataQuery.data],
    queryFn: async (): Promise<Season[]> => {
      setLoadingState('isLoadingSeasons', true)

      try {
        const capabilities = providerRegistry.getCapabilitiesForType<IMediaSeasonsCapability>(
          CapabilityType.MEDIA_SEASONS
        )

        if (capabilities.length === 0) {
          return []
        }

        const seasons = await capabilities[0].getSeasons(media)
        return seasons
      } catch (error) {
        console.error('Failed to load seasons:', error)
        return []
      } finally {
        setLoadingState('isLoadingSeasons', false)
      }
    },
    enabled:
      media.isSeries() && !!metadataQuery.data && !metadataQuery.isLoading,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })

  // Update Legend State store as data arrives
  useEffect(() => {
    if (externalIdsQuery.data) {
      setExternalIds(externalIdsQuery.data)
    }
  }, [externalIdsQuery.data])

  useEffect(() => {
    if (metadataQuery.data) {
      setEnrichedData(metadataQuery.data)
    }
  }, [metadataQuery.data])

  useEffect(() => {
    if (watchProgressQuery.data) {
      setWatchProgress(watchProgressQuery.data)
    }
  }, [watchProgressQuery.data])

  useEffect(() => {
    if (seasonsQuery.data) {
      setSeasons(seasonsQuery.data)
    }
  }, [seasonsQuery.data])

  // Aggregate loading state
  const isLoading =
    externalIdsQuery.isLoading || metadataQuery.isLoading

  // Aggregate error state (only from critical queries)
  const error =
    externalIdsQuery.error || metadataQuery.error

  return {
    // Data
    externalIds: externalIdsQuery.data,
    enrichedData: metadataQuery.data,
    watchProgress: watchProgressQuery.data,
    seasons: seasonsQuery.data,

    // Loading states (per phase)
    isResolvingIds: externalIdsQuery.isLoading,
    isLoadingMetadata: metadataQuery.isLoading,
    isLoadingProgress: watchProgressQuery.isLoading,
    isLoadingSeasons: seasonsQuery.isLoading,

    // Aggregate states
    isLoading,
    error: error ? (error as Error).message : null,

    // Refetch functions
    refetchMetadata: metadataQuery.refetch,
    refetchProgress: watchProgressQuery.refetch,
    refetchSeasons: seasonsQuery.refetch,
  }
}