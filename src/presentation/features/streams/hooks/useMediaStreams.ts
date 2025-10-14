import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { ProviderInfo } from '@/src/domain/capabilities/IMediaStreamsCapability'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetMediaStreamsUseCase } from '@/src/domain/use-cases/media/GetMediaStreamsUseCase'
import { logger } from '@/src/presentation/shared/utils/logger'
import {
  streamUI$,
  resetStreamingState,
  addProviderStreams,
  markProviderFailed,
  completeStreaming,
} from '../stores/streamUI.store'

/**
 * Hook for fetching and observing media streams with progressive loading
 * Streams appear in real-time as each provider completes
 */
export const useMediaStreams = (
  media: Media,
  seasonNumber?: number,
  episodeNumber?: number
) => {
  const getMediaStreamsUseCase = useService<GetMediaStreamsUseCase>(TOKENS.GetMediaStreamsUseCase)
  const queryClient = useQueryClient()

  useEffect(() => {
    // Ensure media is properly cached in TanStack Query
    // This allows other components (like player) to access it reliably
    queryClient.setQueryData(['media-detail', media.stableId], media)
    
    // Log media details including externalIds to verify enrichment
    logger.debug('[useMediaStreams] Starting stream fetch', { 
      stableId: media.stableId, 
      title: media.title,
      type: media.type,
      hasImdb: !!media.externalIds.imdb,
      hasTmdb: !!media.externalIds.tmdb,
      hasTrakt: !!media.externalIds.trakt,
      hasStremio: !!media.externalIds.stremio,
      seasonNumber,
      episodeNumber
    })

    // Reset state on mount/param change
    resetStreamingState()

    // Define callback for progressive updates
    const onProviderComplete = (provider: ProviderInfo, streams: Stream[], error?: Error) => {
      if (error) {
        markProviderFailed(provider.id)
      } else {
        addProviderStreams(provider, streams)
      }
    }

    // Start fetching streams
    const fetchStreams = async () => {
      try {
        if (seasonNumber !== undefined && episodeNumber !== undefined) {
          await getMediaStreamsUseCase.executeForEpisode(
            media,
            seasonNumber,
            episodeNumber,
            onProviderComplete
          )
        } else {
          await getMediaStreamsUseCase.execute(media, onProviderComplete)
        }
      } finally {
        // Mark loading complete when all providers finished
        completeStreaming()
      }
    }

    fetchStreams()
  }, [media, seasonNumber, episodeNumber, getMediaStreamsUseCase, queryClient])

  // Return observables directly for reactivity (components must use observer)
  // Accessing .get() here would snapshot the value and not react to changes
  return {
    streams: streamUI$.streamResults,
    providers: streamUI$.completedProviders,
    isLoading: streamUI$.isLoadingStreams,
    failedProviders: streamUI$.failedProviders,
  }
}
