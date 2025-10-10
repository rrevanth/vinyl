/**
 * Audio track metadata for video playback
 * Represents an individual audio stream in a video file
 */
export interface AudioTrack {
  /**
   * Unique identifier for the audio track
   */
  readonly id: number

  /**
   * Display name for the audio track
   * Example: "English 5.1", "Spanish Stereo"
   */
  readonly name: string

  /**
   * ISO 639-1 language code (optional)
   * Example: "en", "es", "fr"
   */
  readonly language?: string

  /**
   * Audio codec identifier (optional)
   * Example: "aac", "ac3", "mp3", "opus"
   */
  readonly codec?: string
}
