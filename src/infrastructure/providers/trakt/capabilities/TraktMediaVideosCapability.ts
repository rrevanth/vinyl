import type { IMediaVideosCapability, MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import { VideoType } from '@/src/domain/capabilities/IMediaVideosCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktVideo } from '@/src/infrastructure/api/trakt/types'
import { ok, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media Videos Capability
 *
 * Fetches trailers, teasers, clips, and featurettes from Trakt API.
 * Supports both movies and TV shows.
 *
 * Response includes:
 * - YouTube, Vimeo, and other platform videos
 * - Official and fan-made content
 * - Multiple resolutions (1080p, 720p, etc.)
 * - Publish dates and language information
 */
export class TraktMediaVideosCapability implements IMediaVideosCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getVideos(media: Media): Promise<Result<MediaVideo[]>> {
    try {
      // Extract Trakt ID from media's external IDs
      const traktId = this.extractTraktId(media)
      if (!traktId) {
        this.logger.debug(`No Trakt ID found for ${media.type} media: ${media.title}`)
        return ok([], "trakt", { cached: false })
      }

      // Fetch videos based on media type
      let traktVideos: TraktVideo[] = []
      if (media.type === 'movie') {
        traktVideos = await this.traktClient.movies.getVideos(traktId)
      } else if (media.type === 'series') {
        traktVideos = await this.traktClient.shows.getVideos(traktId)
      } else {
        this.logger.warn(`Unsupported media type for videos: ${media.type}`)
        return ok([], "trakt", { cached: false })
      }

      // Map Trakt videos to domain MediaVideo type
      const videos = traktVideos
        .map((traktVideo) => this.mapTraktVideoToDomain(traktVideo))
        .filter((video): video is MediaVideo => video !== null)

      // Sort videos: official first, then by type priority, then by publish date
      const sortedVideos = this.sortVideos(videos)

      this.logger.debug(
        `Fetched ${sortedVideos.length} videos for ${media.type} ${traktId}`,
        {
          title: media.title,
          videoCount: sortedVideos.length,
        }
      )

      return ok(sortedVideos, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get videos for ${media.type}: ${media.title}`, err)
      return ok([], "trakt", { cached: false }) // Return empty array on error instead of throwing
    }
  }

  /**
   * Extract Trakt ID from media's external IDs
   */
  private extractTraktId(media: Media): string | number | null {
    if (media.externalIds.trakt?.id) {
      const id = media.externalIds.trakt.id
      this.logger.debug(`Found Trakt ID: ${id} for ${media.title}`)
      return id
    }

    this.logger.warn(`No Trakt ID found for media: ${media.title}`)
    return null
  }

  /**
   * Map Trakt video response to domain MediaVideo type
   */
  private mapTraktVideoToDomain(traktVideo: TraktVideo): MediaVideo | null {
    try {
      // Extract video key (YouTube ID) from URL
      const videoKey = this.extractVideoKey(traktVideo.url, traktVideo.site)
      if (!videoKey) {
        this.logger.debug(`Could not extract video key from URL: ${traktVideo.url}`)
        return null
      }

      // Map Trakt video type to domain VideoType enum
      const videoType = this.mapVideoType(traktVideo.type)

      return {
        id: `${traktVideo.site}-${videoKey}`,
        name: traktVideo.title,
        key: videoKey,
        site: traktVideo.site,
        type: videoType,
        size: traktVideo.size,
        language: traktVideo.language,
        official: traktVideo.official,
        publishedAt: new Date(traktVideo.published_at),
      }
    } catch (error) {
      this.logger.warn(`Failed to map Trakt video`, { traktVideo, error })
      return null
    }
  }

  /**
   * Extract video key (ID) from video URL
   */
  private extractVideoKey(url: string, site: string): string | null {
    try {
      const lowerSite = site.toLowerCase()

      if (lowerSite === 'youtube') {
        // YouTube URL patterns:
        // - https://youtube.com/watch?v=VIDEO_ID
        // - https://youtu.be/VIDEO_ID
        // - https://www.youtube.com/embed/VIDEO_ID
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
        const match = url.match(youtubeRegex)
        return match ? match[1] : null
      } else if (lowerSite === 'vimeo') {
        // Vimeo URL pattern: https://vimeo.com/VIDEO_ID
        const vimeoRegex = /vimeo\.com\/(\d+)/
        const match = url.match(vimeoRegex)
        return match ? match[1] : null
      }

      // For other sites, try to extract last path segment
      const urlObj = new URL(url)
      const pathSegments = urlObj.pathname.split('/').filter(Boolean)
      return pathSegments[pathSegments.length - 1] || null
    } catch (error) {
      this.logger.warn(`Failed to extract video key from URL: ${url}`, { error })
      return null
    }
  }

  /**
   * Map Trakt video type to domain VideoType enum
   */
  private mapVideoType(traktType: string): VideoType {
    const typeMap: Record<string, VideoType> = {
      trailer: VideoType.TRAILER,
      teaser: VideoType.TEASER,
      clip: VideoType.CLIP,
      featurette: VideoType.FEATURETTE,
      // Add fallback mappings
      behind_the_scenes: VideoType.BEHIND_THE_SCENES,
      bloopers: VideoType.BLOOPERS,
      opening_credits: VideoType.OPENING_CREDITS,
    }

    return typeMap[traktType.toLowerCase()] || VideoType.CLIP
  }

  /**
   * Sort videos by priority:
   * 1. Official videos first
   * 2. By type priority (trailers > teasers > clips > featurettes)
   * 3. By publish date (newest first)
   */
  private sortVideos(videos: MediaVideo[]): MediaVideo[] {
    const typePriority: Record<VideoType, number> = {
      [VideoType.TRAILER]: 1,
      [VideoType.TEASER]: 2,
      [VideoType.CLIP]: 3,
      [VideoType.FEATURETTE]: 4,
      [VideoType.BEHIND_THE_SCENES]: 5,
      [VideoType.BLOOPERS]: 6,
      [VideoType.OPENING_CREDITS]: 7,
    }

    return videos.sort((a, b) => {
      // Sort by official status first
      if (a.official !== b.official) {
        return a.official ? -1 : 1
      }

      // Sort by type priority
      const aPriority = typePriority[a.type] || 999
      const bPriority = typePriority[b.type] || 999
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }

      // Sort by publish date (newest first)
      if (a.publishedAt && b.publishedAt) {
        return b.publishedAt.getTime() - a.publishedAt.getTime()
      }

      return 0
    })
  }
}