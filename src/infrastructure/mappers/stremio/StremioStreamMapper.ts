import type { Stream } from '../../../domain/entities/Stream'
import type { StremioStream } from '../../providers/stremio/types/responses'

/**
 * Mapper for converting Stremio streams to domain Stream entities
 */
export class StremioStreamMapper {
  /**
   * Generate stable ID for stream using simple hash
   */
  private static generateStreamId(
    mediaStableId: string,
    addonId: string,
    streamUrl: string,
    index: number
  ): string {
    const input = `${mediaStableId}:${addonId}:${streamUrl}:${index}`
    const hash = this.simpleHash(input)
    return `stream-${hash}`
  }

  /**
   * Simple hash function for generating stable IDs
   */
  private static simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 16)
  }
  /**
   * Convert Stremio stream to domain Stream entity
   */
  static fromStremioStream(
    stremioStream: StremioStream,
    addonId: string,
    mediaStableId?: string,
    index?: number
  ): Stream {
    // Determine stream source and URL
    let streamSource = 'external'
    let streamUrl = ''

    if (stremioStream.url) {
      streamSource = 'direct'
      streamUrl = stremioStream.url
    } else if (stremioStream.infoHash) {
      streamSource = 'torrent'
      // Create magnet link with trackers
      streamUrl = this.createMagnetLink(stremioStream.infoHash, stremioStream.sources)
    } else if (stremioStream.externalUrl) {
      streamSource = 'external'
      streamUrl = stremioStream.externalUrl
    } else if (stremioStream.ytId) {
      streamSource = 'youtube'
      streamUrl = `https://www.youtube.com/watch?v=${stremioStream.ytId}`
    }

    // Generate stable ID
    const streamId =
      mediaStableId && index !== undefined
        ? this.generateStreamId(mediaStableId, addonId, streamUrl, index)
        : stremioStream.infoHash || stremioStream.url || Math.random().toString(36)

    // Extract quality from name
    const quality = this.extractQuality(stremioStream)

    // Extract language (heuristic-based)
    const language = this.extractLanguage(stremioStream)

    return {
      id: streamId,
      url: streamUrl,
      source: streamSource,
      quality,
      provider: addonId,
      name: stremioStream.name,
      description: stremioStream.description || stremioStream.title,
      size: stremioStream.behaviorHints?.videoSize,
      language: language || 'en',
      infoHash: stremioStream.infoHash,
      fileIndex: stremioStream.fileIdx,
      headers: stremioStream.behaviorHints?.proxyHeaders?.request,
    }
  }

  /**
   * Create magnet link from info hash with trackers
   */
  private static createMagnetLink(infoHash: string, sources?: string[]): string {
    let magnet = `magnet:?xt=urn:btih:${infoHash}`

    // Add trackers if available
    if (sources && sources.length > 0) {
      sources.forEach((tracker) => {
        magnet += `&tr=${encodeURIComponent(tracker)}`
      })
    }

    return magnet
  }

  /**
   * Extract quality from stream name or description
   */
  private static extractQuality(stream: StremioStream): string {
    const text = stream.name || stream.description || stream.title || ''

    // Common quality patterns
    const qualityPatterns = [
      /(\d+p)/i, // 1080p, 720p, etc.
      /(4K|UHD)/i,
      /(CAM|TS|TC|HDCAM)/i,
      /(WEB-?DL|WEBRip|BluRay|BRRip|DVDRip)/i,
    ]

    for (const pattern of qualityPatterns) {
      const match = text.match(pattern)
      if (match) {
        return match[1].toUpperCase()
      }
    }

    // Fallback: use the name itself or 'Unknown'
    return stream.name || 'Unknown'
  }

  /**
   * Extract language from stream name (heuristic-based)
   */
  private static extractLanguage(stream: StremioStream): string | undefined {
    const text = stream.name || stream.description || stream.title || ''

    // Common language indicators
    const languagePatterns: Record<string, RegExp> = {
      en: /\b(english|eng)\b/i,
      es: /\b(spanish|español|esp)\b/i,
      fr: /\b(french|français|fre)\b/i,
      de: /\b(german|deutsch|ger)\b/i,
      it: /\b(italian|italiano|ita)\b/i,
      pt: /\b(portuguese|português|por)\b/i,
      ru: /\b(russian|русский|rus)\b/i,
      ja: /\b(japanese|日本語|jpn)\b/i,
      ko: /\b(korean|한국어|kor)\b/i,
      zh: /\b(chinese|中文|chi)\b/i,
    }

    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(text)) {
        return lang
      }
    }

    return undefined
  }

  /**
   * Convert array of Stremio streams to domain Stream entities
   */
  static fromStremioStreamArray(
    stremioStreams: StremioStream[],
    addonId: string,
    mediaStableId?: string
  ): Stream[] {
    return stremioStreams.map((stream: StremioStream, index: number) =>
      this.fromStremioStream(stream, addonId, mediaStableId, index)
    )
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
