import { observable } from '@legendapp/state'

/**
 * Watch progress for series/shows
 */
export interface SeriesProgress {
  aired: number
  completed: number
  nextEpisode?: {
    season: number
    number: number
  }
  seasons: {
    number: number
    aired: number
    completed: number
    episodes: {
      number: number
      completed: boolean
      lastWatchedAt?: Date
    }[]
  }[]
}

/**
 * Watch progress for movies
 */
export interface MovieProgress {
  watched: boolean
  lastWatchedAt?: Date
}

/**
 * Complete watch progress for a media item
 */
export interface WatchProgress {
  series?: SeriesProgress
  movie?: MovieProgress
}

// Map: mediaId → WatchProgress
export const watchProgress$ = observable<Record<string, WatchProgress>>({})

// Helper: Check if episode is watched
export const isEpisodeWatched = (
  mediaId: string,
  season: number,
  episode: number
): boolean => {
  const progress = watchProgress$[mediaId].series?.get()
  if (!progress) return false

  const seasonData = progress.seasons.find((s) => s.number === season)
  const episodeData = seasonData?.episodes.find((e) => e.number === episode)
  return episodeData?.completed ?? false
}

// Helper: Get next episode
export const getNextEpisode = (mediaId: string) => {
  return watchProgress$[mediaId].series?.nextEpisode.get()
}

// Helper: Get season completion percentage
export const getSeasonCompletion = (mediaId: string, seasonNumber: number) => {
  const progress = watchProgress$[mediaId].series?.get()
  const seasonData = progress?.seasons.find((s) => s.number === seasonNumber)
  if (!seasonData) return { completed: 0, aired: 0, percentage: 0 }

  return {
    completed: seasonData.completed,
    aired: seasonData.aired,
    percentage: Math.round((seasonData.completed / seasonData.aired) * 100),
  }
}

// Helper: Is movie watched
export const isMovieWatched = (mediaId: string): boolean => {
  return watchProgress$[mediaId].movie?.watched.get() ?? false
}
