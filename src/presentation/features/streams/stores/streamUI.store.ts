import { observable } from '@legendapp/state'
import type { Stream } from '@/src/domain/entities/Stream'
import type { ProviderInfo } from '@/src/domain/capabilities/IMediaStreamsCapability'

/**
 * UI state for streams screen with progressive loading support
 */
export const streamUI$ = observable({
  selectedProvider: 'all' as string, // 'all' or provider ID for filtering

  // Progressive streaming state
  streamResults: [] as Stream[],
  completedProviders: [] as ProviderInfo[],
  failedProviders: [] as string[],
  isLoadingStreams: false,
  totalProviders: 0,
})

/**
 * Reset streaming state for new fetch
 */
export function resetStreamingState() {
  streamUI$.streamResults.set([])
  streamUI$.completedProviders.set([])
  streamUI$.failedProviders.set([])
  streamUI$.isLoadingStreams.set(true)
  streamUI$.totalProviders.set(0)
}

/**
 * Add streams from a provider as they arrive
 */
export function addProviderStreams(providerInfo: ProviderInfo, streams: Stream[]) {
  streamUI$.streamResults.set([...streamUI$.streamResults.get(), ...streams])
  streamUI$.completedProviders.set([...streamUI$.completedProviders.get(), providerInfo])
}

/**
 * Mark a provider as failed
 */
export function markProviderFailed(providerId: string) {
  streamUI$.failedProviders.set([...streamUI$.failedProviders.get(), providerId])
}

/**
 * Complete streaming (all providers done)
 */
export function completeStreaming() {
  streamUI$.isLoadingStreams.set(false)
}

