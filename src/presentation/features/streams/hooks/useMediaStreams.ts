import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { ProviderInfo } from '@/src/domain/capabilities/IMediaStreamsCapability'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetMediaStreamsUseCase } from '@/src/domain/use-cases/media/GetMediaStreamsUseCase'
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
    console.log('[useMediaStreams] Cached media:', { stableId: media.stableId, title: media.title })

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

  // Return observable values (reactive via Legend State)
  return {
    streams: streamUI$.streamResults.get(),
    providers: streamUI$.completedProviders.get(),
    isLoading: streamUI$.isLoadingStreams.get(),
    failedProviders: streamUI$.failedProviders.get(),
  }
}
