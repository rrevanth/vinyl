import { observable } from '@legendapp/state'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'

export const continueWatching$ = observable<{
  items: ContinueWatchingItem[]
  isLoading: boolean
  lastUpdated?: Date
}>({
  items: [],
  isLoading: false,
})

// Helper to find by media ID
export const findContinueWatchingByMediaId = (mediaId: string) => {
  const items = continueWatching$.items.get()
  return items.find((item) => item.media.stableId === mediaId)
}

// Helper to get count
export const getContinueWatchingCount = () => {
  return continueWatching$.items.get().length
}
