import type { Stream } from '../../../domain/entities/Stream'
import type { StremioStream } from '../../providers/stremio/types/responses'

/**
 * Mapper for converting Stremio streams to domain Stream entities
 */
export class StremioStreamMapper {
  /**
   * Convert Stremio stream to domain Stream entity
   */
  static fromStremioStream(stremioStream: StremioStream, addonId: string): Stream {
    // Determine stream source and URL
    let streamSource = 'external'
    let streamUrl = ''

    if (stremioStream.url) {
      streamSource = 'direct'
      streamUrl = stremioStream.url
    } else if (stremioStream.infoHash) {
      streamSource = 'torrent'
      streamUrl = `magnet:?xt=urn:btih:${stremioStream.infoHash}`
    } else if (stremioStream.externalUrl) {
      streamSource = 'external'
      streamUrl = stremioStream.externalUrl
    } else if (stremioStream.ytId) {
      streamSource = 'external'
      streamUrl = `https://www.youtube.com/watch?v=${stremioStream.ytId}`
    }

    return {
      id: stremioStream.infoHash || stremioStream.url || Math.random().toString(36),
      url: streamUrl,
      source: streamSource,
      quality: stremioStream.name || 'Unknown',
      provider: addonId,
      size: stremioStream.behaviorHints?.videoSize,
      language: 'en', // Default, could be enhanced with detection
      infoHash: stremioStream.infoHash,
      fileIndex: stremioStream.fileIdx,
      headers: stremioStream.behaviorHints?.proxyHeaders?.request,
    }
  }

  /**
   * Convert array of Stremio streams to domain Stream entities
   */
  static fromStremioStreamArray(stremioStreams: StremioStream[], addonId: string): Stream[] {
    return stremioStreams.map((stream: StremioStream) => this.fromStremioStream(stream, addonId))
  }

  /**
   * Filter streams by quality preferences
   */
  static filterByQuality(
    streams: Stream[],
    preferredQualities: string[] = ['4K', '1080p', 'HD']
  ): Stream[] {
    if (preferredQualities.length === 0) return streams

    // Sort by quality preference order
    return streams.sort((a, b) => {
      const aIndex = preferredQualities.findIndex((q) =>
        a.quality.toLowerCase().includes(q.toLowerCase())
      )
      const bIndex = preferredQualities.findIndex((q) =>
        b.quality.toLowerCase().includes(q.toLowerCase())
      )

      // If both have preferred qualities, sort by preference order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // Preferred qualities come first
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1

      // No preference, maintain original order
      return 0
    })
  }
}
