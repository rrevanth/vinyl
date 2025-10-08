import type { StremioSubtitle } from '@/src/infrastructure/providers/stremio/types/responses'
import type { Subtitle } from '@/src/domain/entities/Stream'

/**
 * Maps Stremio subtitle responses to Subtitle domain entities
 */
export class StremioSubtitleMapper {
  /**
   * Generate stable ID for subtitle using simple hash
   */
  private static generateSubtitleId(
    mediaStableId: string,
    providerId: string,
    language: string,
    index: number
  ): string {
    const input = `${mediaStableId}:${providerId}:${language}:${index}`
    const hash = this.simpleHash(input)
    return `subtitle-${hash}`
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
   * Transform array of Stremio subtitles to domain Subtitle entities
   */
  static toSubtitles(
    stremioSubtitles: StremioSubtitle[],
    providerId: string,
    mediaStableId: string
  ): Subtitle[] {
    return stremioSubtitles
      .map((subtitle, index) => this.toSubtitle(subtitle, providerId, mediaStableId, index))
      .filter((subtitle): subtitle is Subtitle => subtitle !== null)
  }

  /**
   * Transform single Stremio subtitle to domain Subtitle entity
   */
  static toSubtitle(
    stremioSubtitle: StremioSubtitle,
    providerId: string,
    mediaStableId: string,
    index: number
  ): Subtitle | null {
    if (!stremioSubtitle.url || !stremioSubtitle.lang) {
      return null
    }

    // Generate stable ID
    const subtitleId = this.generateSubtitleId(
      mediaStableId,
      providerId,
      stremioSubtitle.lang,
      index
    )

    // Detect format from URL
    const format = this.detectFormat(stremioSubtitle.url)

    return {
      id: subtitleId,
      url: stremioSubtitle.url,
      language: stremioSubtitle.lang.toLowerCase(), // Normalize to lowercase
      format,
      provider: providerId,
    }
  }

  /**
   * Detect subtitle format from URL extension
   */
  private static detectFormat(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase()

    switch (extension) {
      case 'srt':
        return 'srt'
      case 'vtt':
        return 'vtt'
      case 'ass':
      case 'ssa':
        return 'ass'
      case 'sub':
        return 'sub'
      default:
        return 'srt' // Default fallback
    }
  }
}
