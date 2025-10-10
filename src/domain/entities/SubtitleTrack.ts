/**
 * Subtitle track metadata for video playback
 * Represents an individual subtitle/caption stream
 */
export interface SubtitleTrack {
  /**
   * Unique identifier for the subtitle track
   */
  readonly id: number

  /**
   * Display name for the subtitle track
   * Example: "English", "Spanish (Latin America)", "English [CC]"
   */
  readonly name: string

  /**
   * ISO 639-1 language code (optional)
   * Example: "en", "es", "fr"
   */
  readonly language?: string

  /**
   * Subtitle format (optional)
   * Common formats: 'srt', 'vtt', 'ass', 'ssa', 'sub'
   */
  readonly format?: string

  /**
   * External subtitle URL (optional)
   * Used for external subtitle files that need to be loaded separately
   */
  readonly url?: string
}
